import { React, types, Grid, Column } from '../globals'

export const CollapsibleColumnLayout = (props = {}) => {
  const {
    left,
    right,
    children,
    showLeft = true,
    showRight = true,
    mainProps = {},
    leftProps = {},
    rightProps = {},
  } = props

  const leftWidth = !showLeft || !left ? 0 : props.leftWidth || 4
  const rightWidth = !showRight || !right ? 0 : props.rightWidth || 4
  const mainWidth = 16 - leftWidth - rightWidth

  return (
    <Grid as="div">
      {showLeft && <Column stretched width={leftWidth} {...leftProps} children={left} />}
      <Column {...mainProps} width={mainWidth} children={children} />
      {showRight && <Column stretched width={rightWidth} {...rightProps} children={right} />}
    </Grid>
  )
}

CollapsibleColumnLayout.propTypes = {
  widths: types.array,
}

export default CollapsibleColumnLayout
