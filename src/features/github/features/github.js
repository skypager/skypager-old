import Octokat from 'octokat'

export const createGetter = 'github'

export const DEFAULT_BRANCH_NAME = 'master'
export const DEFAULT_ORG_NAME =
  process.env.GITHUB_ORG ||
  process.env.GITHUB_ORGANIZATION ||
  process.env.GITHUB_ORGANIZATION_NAME ||
  process.env.GITHUB_USERNAME

export const featureMethods = [
  'lazyOcto',
  'fetchIssues',
  'fetchRepos',
  'fetchPullRequests',
  'fetchRepo',
  'fetchBranches',
  'fetchCommits',
  'fetchReleases',
  'fetchCommitsByBranch',
  'fetchEvents',
]

export function featureWasEnabled(options = {}) {
  options = {
    ...this.options,
    ...options,
  }

  const { runtime } = this

  const { token = runtime.get('argv.githubToken', process.env.GITHUB_TOKEN) } = options

  this.hide('githubToken', token)

  return true
}

export function lazyOcto() {
  const { githubToken: token } = this

  return new Octokat({ token })
}

/**
  Fetch info for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
*/
export async function fetchRepo(options = {}) {
  const { owner = DEFAULT_ORG_NAME, repo } = options
  const remote = this.octo.repos(owner, repo)

  await remote.fetch()

  return remote
}

/**
  Fetch all branch objects for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
*/
export async function fetchBranches(options = {}) {
  const repo = await this.fetchRepo(options)
  const branches = await repo.branches.fetchAll()

  return branches
}

/**
  Fetch all release objects for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
*/
export async function fetchReleases(options = {}) {
  const repo = await this.fetchRepo(options)
  const releases = await repo.releases.fetchAll()

  return releases
}

/**
  Fetch all commits for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
  @param {String} options.sha - the branch you would like to view commits against
  @param {String} options.branch - the branch you would like to view commits against
*/
export async function fetchCommits(options = {}) {
  const { owner = DEFAULT_ORG_NAME, repo, branch, sha } = options
  const target = await this.fetchRepo({ owner, repo })
  const commits = await target.commits.fetchAll({
    sha: branch || sha || DEFAULT_BRANCH_NAME,
  })

  return commits
}

export async function fetchCommitsByBranch(options = {}) {
  const { fromPairs } = this.lodash
  const { owner = DEFAULT_ORG_NAME, repo } = options
  const target = await this.fetchRepo({ owner, repo })
  const branches = await this.fetchBranches({ owner, repo })
  const branchNames = branches.map(b => b.name)
  const entries = await Promise.all(
    branchNames.map(branch =>
      this.fetchCommits({ repo, owner, branch }).then(commits => [branch, commits])
    )
  )

  return fromPairs(entries)
}

/**
  Fetch all repositories for a given user or organization.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String|RegExp} options.filter - a pattern to match against the repository name
*/
export async function fetchRepos(options = {}) {
  const { owner = DEFAULT_ORG_NAME } = options
  const repos = await this.octo.orgs(owner).repos.fetchAll()

  return options.filter ? repos.filter(repo => repo.name.match(options.filter)) : repos
}

/**
  Fetch all pullRequest objects for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
*/
export async function fetchPullRequests(options = {}) {
  const { owner = DEFAULT_ORG_NAME, repo } = options
  const remote = await this.fetchRepo({ owner, repo })

  return re, pte.pulls()
}

/**
  Fetch all issue objects for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
*/
export async function fetchIssues(options = {}) {
  const { owner = DEFAULT_ORG_NAME, repo } = options
  const remote = await this.fetchRepo({ owner, repo })

  return remote.issues()
}

/**
  Fetch all event objects for a repository.

  @param {String} options.owner - the owner of the repository. defaults to process.env.GITHUB_ORG
  @param {String} options.repo - the name of the repository
  @param {String} options.type - the type of event to see.
*/
export async function fetchEvents(options = {}) {
  const { owner = DEFAULT_ORG_NAME, repo, type } = options
  const remote = await this.fetchRepo({ owner, repo })

  const events = await remote.events.fetchAll()

  const results =
    type && type.length
      ? events.filter(event => event.type === mapEventType.call(this, type))
      : events

  // TODO Helper functions to normalize event objects based on type
  return results
}

function mapEventType(input) {
  const { get } = this.lodash

  const aliasMap = {
    push: 'PushEvent',
    tags: 'CreateEvent',
    branch: 'CreateEvent',
    branches: 'CreateEvent',
    tag: 'CreateEvent',
    pushes: 'PushEvent',
    pr: 'PullRequestEvent',
    pulls: 'PullRequestEvent',
    pullRequests: 'PullRequestEvent',
    'pull-requests': 'PullRequestEvent',
    pull_requests: 'PullRequestEvent',
    issue: 'IssueEvent',
    issues: 'IssueEvent',
  }

  // if there's an alias, use it, otherwise send what was requested
  return get(aliasMap, input, input)
}
