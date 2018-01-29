import skypager from 'skypager-runtime'
import Deployment, { attach, registerHelper as register } from './helper'
import * as feature from './feature'

skypager.features.register('helpers/deployment', () => feature)

export { Deployment, attach, feature }

register()

export default Deployment
