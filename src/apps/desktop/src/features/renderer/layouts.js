export const hostMethods = ['toggleSidebar', 'toggleLeftSidebar', 'toggleRightSidebar']

export function toggleSidebar(direction) {
  switch (direction) {
    case 'right':
      return this.toggleRightSidebar()

    case 'left':
    default:
      return this.toggleLeftSidebar()
  }
}

export function toggleLeftSidebar() {
  const showLeftSidebar = !this.state.get('showLeftSidebar')
  this.setState({ showLeftSidebar })
}

export function toggleRightSidebar() {
  const showRightSidebar = !this.state.get('showRightSidebar')
  this.setState({ showRightSidebar })
}
