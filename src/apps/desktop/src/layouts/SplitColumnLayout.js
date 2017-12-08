import { React, types, Grid, Column } from '../globals'

export const SplitColumnLayout = (props = {}) => {
  const { gridProps = {}, widths = [8, 8], children } = props

  const { 0: firstWidth, 1: secondWidth } = widths
  const { 0: firstChild, 1: secondChild } = React.Children.toArray(children)

  return (
    <Grid as="div" divided="vertical" style={{ height: '100%' }} {...gridProps}>
      <Column width={firstWidth} children={firstChild} />
      <Column width={secondWidth} children={secondChild} style={{ overflowY: 'scroll' }} />
    </Grid>
  )
}

SplitColumnLayout.propTypes = {
  widths: types.array,
}

export default SplitColumnLayout
