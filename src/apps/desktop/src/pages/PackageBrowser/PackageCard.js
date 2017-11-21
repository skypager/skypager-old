export class PackageCard extends Component {
  state = {
    raised: false,
  }
  render() {
    const { isChanged, version, description, name } = this.props

    const cardProps = {}

    if (isChanged) {
      cardProps.color = 'yellow'
    }

    return (
      <Card {...cardProps} raised={this.state.raised} onClick={this.props.onClick}>
        <Card.Content>
          <Card.Header content={name} />
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>v{version}</Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

export default PackageCard
