import GoogleSpreadsheet from 'google-spreadsheet'

export const shortcut = 'sheets'

export const featureMethods = ['load']

export const featureMixinOptions = {
  insertOptions: false,
  partial: []
}

export function featureWasEnabled(options = {}) {
  if (options.credentials) {
    this.hide('credentials', options.credentials)
  }

  this.hide('columnNames', options.columnNames || {})
}

export async function load(documentId, options = {}) {
  const { omit, mapValues } = this.lodash
  const { doc, info, firstSheet: sheet } = await loadDoc(
    documentId,
    options.credentials ||
      this.options.credentials ||
      this.credentials ||
      this.runtime.fsx.readJsonSync(
        this.runtime.join('secrets', 'service.json')
      )
  )
  const rowObjects = await loadRows(sheet, options)

  const columnNames = {
    ...(this.columnNames || {}),
    ...(options.columnNames || {})
  }

  const rows = rowObjects.map(row => {
    const sanitized = omit(
      row,
      'id',
      '_xml',
      '_links',
      'app:edited',
      'save',
      'del',
      ...(options.omit || [])
    )

    const rowData = this.lodash.mapKeys(
      mapValues(sanitized, v => v.trim()),
      (v, k) => columnNames[k] || k
    )

    if (options.mapKeys) {
      return this.lodash.mapKeys(rowData, options.mapKeys)
    } else {
      return rowData
    }
  })

  return { doc, info, rows, sheet }
}

function loadRows(worksheet, { offset = 1, ...options } = {}) {
  return new Promise((resolve, reject) => {
    worksheet.getRows({ offset, ...options }, (err, rows) => {
      err ? reject(err) : resolve(rows)
    })
  })
}

function loadDoc(id, creds) {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(id)

    doc.useServiceAccountAuth(creds, err => {
      if (err) {
        reject(err)
      } else {
        doc.getInfo((err, info) => {
          err
            ? reject(err)
            : resolve({ doc, info, firstSheet: info.worksheets[0] })
        })
      }
    })
  })
}
