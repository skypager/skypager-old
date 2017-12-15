export const hostMethods = ['enforceRole', 'checkRole', 'login', 'logout']

export function featureWasEnabled(options = {}) {}

export async function logout() {
  this.setState({
    currentUser: undefined,
    loggedIn: false,
    currentUserRole: 'public'
  })
}

// since it is exported under hostMethods, this will be the host, or the runtime
export async function login(currentUser = {}) {
  this.setState({
    currentUser,
    loggedIn: !!currentUser
  })
}

export async function checkRole(currentUser = {}) {
  return { currentUserRole: 'user' }
}

export async function enforceRole(currentUser = {}) {
  return { roleEnforced: true }
}
