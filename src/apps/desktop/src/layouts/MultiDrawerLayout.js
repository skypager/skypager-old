import { Component, types } from '../globals'

export class MultiDrawerLayout extends Component {
  static contextTypes = {
    runtime: types.shape({
      drawers: types.shape({
        toggle: types.func,
        state: types.object,
      }).isRequired,
    }),
  }

  static propTypes = {
    rightProps: types.object,
    leftProps: types.object,
    topProps: types.object,
    bottomProps: types.object,
    showRight: types.bool,
    showLeft: types.bool,
    showTop: types.bool,
    showBottom: types.bool,
    right: types.any,
    left: types.any,
    top: types.any,
    bottom: types.any,
  }

  state = {}

  renderRightDrawer() {
    const { runtime } = this.context
    const { isFunction, isString } = runtime.lodash
    const { right = this.props.right } = this.state

    if (isString(right)) {
      const RightDrawer = runtime.drawers.lookup(right)
      return <RightDrawer runtime={runtime} drawers={runtime.drawers} />
    } else if (isFunction(right)) {
      return right({ runtime, drawers: runtime.drawers })
    } else {
      return right
    }
  }

  renderLeftDrawer() {
    const { runtime } = this.context
    const { isFunction, isString } = runtime.lodash
    const { left = this.props.left } = this.state

    if (isString(left)) {
      const LeftDrawer = runtime.drawers.lookup(left)
      return <LeftDrawer runtime={runtime} drawers={runtime.drawers} />
    } else if (isFunction(left)) {
      return left({ runtime, drawers: runtime.drawers })
    } else {
      return left
    }
  }

  renderTopDrawer() {
    const { runtime } = this.context
    const { isFunction, isString } = runtime.lodash
    const { top = this.props.top } = this.state

    if (isString(top)) {
      const TopDrawer = runtime.drawers.lookup(top)
      return <TopDrawer runtime={runtime} drawers={runtime.drawers} />
    } else if (isFunction(top)) {
      return top({ runtime, drawers: runtime.drawers })
    } else {
      return top
    }
  }

  renderBottomDrawer() {
    const { runtime } = this.context
    const { isFunction, isString } = runtime.lodash
    const { bottom = this.props.bottom } = this.state

    if (isString(bottom)) {
      const BottomDrawer = runtime.drawers.lookup(bottom)
      return <BottomDrawer runtime={runtime} drawers={runtime.drawers} />
    } else if (isFunction(bottom)) {
      return bottom({ runtime, drawers: runtime.drawers })
    } else {
      return bottom
    }
  }

  constructor(props = {}, context = {}) {
    super(props, context)

    const { runtime } = this.context
    const { pick } = runtime.lodash

    this.state = {
      ...this.state,
      ...pick(
        props,
        'showRight',
        'showLeft',
        'showBottom',
        'showTop',
        'right',
        'left',
        'top',
        'bottom',
        'rightProps',
        'leftProps',
        'topProps',
        'bottomProps'
      ),
    }
  }

  componentWillMount() {
    const { runtime } = this.context

    if (!runtime.drawers) {
      runtime.use('drawers')
    }

    this.disposer = runtime.drawers.state.observe(({ name, newValue }) => {
      this.setState({ [name]: newValue })
    })
  }

  componentWillUnmount() {
    this.disposer()
  }

  render() {
    const { children } = this.props
    const {
      rightProps = this.props.rightProps,
      leftProps = this.props.leftProps,
      topProps = this.props.topProps,
      bottomProps = this.props.bottomProps,
    } = this.state

    const showRight =
      !!(this.props.showRight || this.state.showRight) && !!(this.props.right || this.state.right)
    const showLeft =
      !!this.props.showLeft || (this.state.showLeft && !!(this.props.left || this.state.left))
    const showTop =
      !!this.props.showTop || (this.state.showTop && !!(this.props.top || this.state.top))
    const showBottom =
      !!this.props.showBottom ||
      (this.state.showBottom && !!(this.props.bottom || this.state.bottom))

    return (
      <Sidebar.Pushable
        as={Container}
        fluid
        style={{ padding: 0, margin: 0, height: '100%', overflow: 'hidden' }}
        className="MultiDrawerLayout"
      >
        <Sidebar
          visible={showTop}
          as={Segment}
          raised
          inverted
          animation="overlay"
          direction="top"
          {...topProps}
          style={{ margin: 0, padding: 0 }}
          children={this.renderTopDrawer()}
        />

        <Sidebar
          as={Segment}
          visible={showLeft}
          inverted
          animation="overlay"
          direction="left"
          {...leftProps}
          children={this.renderLeftDrawer()}
        />

        <Sidebar.Pusher style={{ margin: 0, padding: 0 }}>{children}</Sidebar.Pusher>

        <Sidebar
          visible={showRight}
          as={Segment}
          raised
          inverted
          animation="overlay"
          direction="right"
          {...rightProps}
          children={this.renderRightDrawer()}
        />

        <Sidebar
          visible={showBottom}
          as={Segment}
          raised
          inverted
          animation="overlay"
          direction="bottom"
          style={{ height: '50% !important' }}
          {...bottomProps}
          children={this.renderBottomDrawer()}
        />
      </Sidebar.Pushable>
    )
  }
}

export default MultiDrawerLayout
