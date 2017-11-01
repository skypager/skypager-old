import component from './component'
import Document from 'skypager-helpers-document'
import * as docType from './docTypes/markdown'
import React from 'react'
import ReactPropTypes from 'prop-types'

export default function skypage(...args) {
  const runtime = this

  runtime.hide('React', React)
  runtime.hide('reactPropTypes', ReactPropTypes)

  require('./index').default.call(this, ...args)

  return runtime
}

window.SkypageDocumentType = skypage
