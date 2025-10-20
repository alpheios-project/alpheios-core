import LexiconsConfig from '@/lexicons/config.json'
import papaparse from 'papaparse'

import GrcLsjDefs from '@/lexicons/data/json/grc-lsj-defs.json'
import GrcLsjIds from '@/lexicons/data/json/grc-lsj-ids.json'
import LatLsIds from '@/lexicons/data/json/lat-ls-ids.json'
import GrcMjpDefs from '@/lexicons/data/json/grc-mjp-defs.json'

import GrcLsjFullN69419 from '@/lexicons/data/xml/grc-lsj-full-n69419.xml'
import GrcLsjFullN69531 from '@/lexicons/data/xml/grc-lsj-full-n69531.xml'

import LatLsFullN28019 from '@/lexicons/data/xml/lat-ls-full-n28019.xml'
import LatLsFullN28116 from '@/lexicons/data/xml/lat-ls-full-n28116.xml'
import LatLsFullN6614 from '@/lexicons/data/xml/lat-ls-full-n6614.xml'


let lexFullData = {}
let lexData = {}

lexFullData['https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html&n=n69419'] = GrcLsjFullN69419
lexFullData['https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html&n=n69531'] = GrcLsjFullN69531

lexFullData['https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n28019'] = LatLsFullN28019
lexFullData['https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n28116'] = LatLsFullN28116

lexFullData['https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html&n=n6614'] = LatLsFullN6614

export default class LexiconsFixture {
  static get libUrls () {
    return [
        { url: 'https://github.com/alpheios-project/lsj', type: 'short', source: GrcLsjDefs.data },
        { url: 'https://github.com/alpheios-project/lsj', type: 'index', source: GrcLsjIds.data },
        { url: 'https://github.com/alpheios-project/ls', type: 'index', source: LatLsIds.data },
        { url: 'https://github.com/alpheios-project/majorplus', type: 'short', source: GrcMjpDefs.data }
      ]
  }

  static get fullUrls () {
    return Object.keys(lexFullData)
  }

  static get lexData () {
    if (Object.keys(lexData).length === 0) {
      this.fillLexData()
    }
    return lexData
  }

  static get lexFullData () {
    return lexFullData
  }

  static uploadFromSourceJson (data) {
    const unparsed = data.join("\n")
    const parsed = papaparse.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
    return this.fillMap(parsed.data)
  }

  static fillLexData () {
    this.libUrls.forEach(urlData => {
      lexData[LexiconsConfig[urlData.url][urlData.type]] = this.uploadFromSourceJson(urlData.source)
    })
  }

  static fillMap (rows) {
    let data = new Map() // eslint-disable-line prefer-const
    for (const row of rows) {
      const def = { field1: row[1], field2: null }
      if (row.length > 2) {
        def.field2 = row[2]
      }
      if (data.has(row[0])) {
        data.get(row[0]).push(def)
      } else {
        data.set(row[0], [def])
      }
    }
    return data
  }
}
