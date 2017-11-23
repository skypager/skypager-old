export const hostMethods = ['toggleSidebar']

export function toggleSidebar() {
  const sidebarIsVisible = !this.state.get('sidebarIsVisible')
  this.setState({ sidebarIsVisible })
}
