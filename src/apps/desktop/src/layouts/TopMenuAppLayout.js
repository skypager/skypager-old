import { React, types } from '../globals'

export const TopMenuAppLayout = (props = {}) => {
  const { menuItems, children } = props

  return (
    <Container fluid>
      <Menu attached="top" compact inverted>
        {menuItems.map((item, key) => <Menu.Item key={item.content || key} {...item} />)}
      </Menu>
      {children}
    </Container>
  )
}

TopMenuAppLayout.propTypes = {
  widths: types.array,
}

export default TopMenuAppLayout
