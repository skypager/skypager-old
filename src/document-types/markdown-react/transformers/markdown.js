import remark from "remark"
import commentBlocks from "remark-comment-blocks"
import commentConfig from "remark-comment-config"
import remarkHtml from "remark-html"
import slug from "remark-slug"
import squeeze from "remark-squeeze-paragraphs"
import stringify from "remark-stringify"
import normalize from "remark-normalize-headings"
import githubReferences from "remark-github"
import toc from "remark-toc"
import autolink from "remark-autolink-headings"
import contributors from "remark-contributors"
import stripBadges from "remark-strip-badges"
import parse from "remark-parse"

/**
 * Run a remark parser profile with optional add-ons. Available profiles
 * can be found @see profiles and addOns @see addOns
 *
 * @param {Object} options - the options object
 * @param {String} options.profile - which parser profile to use?
 * @param {Array} options.addOns - which addons to include?
 */
export default (options = {}, context = {}) => {
  const { profile = "parser", addOns = [] } = options
  const unified = profiles[profile] || parser

  return addOns.reduce((memo, addon) => (addons[addOn] ? memo.use(addons[addOn]) : memo), unified(options))
}

export const applyTo = (input, options) => {
  const { method = "process", parser = "github" } = options
  return new Promise((resolve, reject) => {
    profiles[parser](options)[method](input, (err, file) => {
      err ? reject(err) : resolve(file)
    })
  })
}

export const standard = (options = {}) =>
  remark().use(commentConfig).use(normalize).use(squeeze).use(slug).use(autolink)

export const comments = (options = {}) => standard(options).use(commentBlocks)

export const parser = (options = {}) => standard(options).use(parse)

export const html = (options = {}) => standard(options).use(remarkHtml)

export const stringifier = (options = {}) => standard(options).use(stringify)

export const github = (options = {}) => standard(options).use(githubReferences).use(autolink)

export const profiles = {
  parser,
  standard,
  comments,
  github,
  html,
  stringifier,
}

export const addons = {
  contributors,
  stripBadges,
  toc,
}

export const utilLoaders = () => {
  return {
    filter: () => require("unist-util-filter"),
    findAfter: () => require("unist-util-find-after"),
    findAllAfter: () => require("unist-util-find-all-after"),
    findAllBefore: () => require("unist-util-find-all-before"),
    index: () => require("unist-util-index"),
    map: () => require("unist-util-map"),
    parents: () => require("unist-util-parents"),
    position: () => require("unist-util-position"),
    removePosition: () => require("unist-util-remove-position"),
    select: () => require("unist-util-select"),
    source: () => require("unist-util-source"),
    visit: () => require("unist-util-visit"),
    reporter: () => require("vfile-reporter"),
    docblockParser: () => require("docblock-parser"),
    toString: () => require("mdast-util-to-string"),
    headingRange: () => require("mdast-util-heading-range"),
    inject: () => require("mdast-util-inject"),
  }
}
