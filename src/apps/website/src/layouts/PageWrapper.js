import { Container, Component, types, baseContextTypes, React } from '../globals'
import SidebarToggle from 'components/SidebarToggle'

export class PageWrapper extends Component {
  static contextTypes = baseContextTypes

  static propTypes = {
    headerTag: types.string,
    headerIcon: types.string.isRequired,
    headerSubheader: types.string,
    headerContent: types.string.isRequired,
    children: types.element.isRequired,
  }

  static defaultProps = {
    headerTag: 'h2',
    headerSubheader: '',
    headerMargin: '48px',
  }

  render() {
    const { runtime } = this.context
    const {
      headerMargin,
      children,
      headerTag,
      headerContent,
      headerIcon,
      headerSubheader,
      rightHeader,
      showHeader = true,
      containerWidth = '90%',
      containerMaxWidth = '1400px',
      containerMargins = '24px auto',
      showToggle = true,
    } = this.props

    return (
      <Dimmer.Dimmable as={Container} fluid style={{ height: '100%' }}>
        <Dimmer active={!runtime.currentState.loaded}>
          <Header as="h1" inverted>
            Skypager
          </Header>
        </Dimmer>

        {showToggle && <SidebarToggle alwaysVisible />}

        <Container
          fluid
          style={{
            width: containerWidth,
            margin: containerMargins,
            maxWidth: containerMaxWidth,
          }}
        >
          {showHeader !== false && (
            <Grid>
              <Column width={12}>
                <Header as={headerTag} style={{ marginBottom: headerMargin }}>
                  <Icon name={headerIcon} circular />
                  <Header.Content style={{ paddingLeft: '20px' }}>
                    {headerContent}
                    {headerSubheader &&
                      headerSubheader.length && (
                        <Header.Subheader> {headerSubheader} </Header.Subheader>
                      )}
                  </Header.Content>
                </Header>
              </Column>
              <Column width={4}>{rightHeader}</Column>
            </Grid>
          )}

          <div>{children}</div>
        </Container>
      </Dimmer.Dimmable>
    )
  }
}

export default PageWrapper
