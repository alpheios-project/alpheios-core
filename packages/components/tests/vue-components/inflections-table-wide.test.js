/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import WideInflectionsTable from '@/vue-components/inflections-table-wide.vue'

describe('inflections-table-wide.test.js', () => {
  it('1 WideInflectionsTable - renders a vue instance (min requirements)', () => {
    let cmp = mount(WideInflectionsTable, {
      propsData: {
        data: false
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('1 WideInflectionsTable - renders with data)', () => {
    /*    let cmp = mount(WideInflectionsTable, {
      propsData: {
        data: {
          rows: [
            { cells: [
              { role: 'label', value: 'foolabel1' },
              { role: 'data', value: 'foovalue1' },
              { role: 'foo', value: 'something1' }
            ]
            },
            {
              cells: [
                { role: 'label', value: 'foolabel2' },
                { role: 'data', value: 'foovalue2' },
                { role: 'foo', value: 'something1' }
              ]
            }
          ]
        }
      }
    })
    expect(cmp.findAll('.infl-prdgm-tbl-row').length).toEqual(2)
    expect(cmp.findAll('.infl-prdgm-tbl-cell').length).toEqual(6)

    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--label').length).toEqual(2)
    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--label').at(0).text()).toEqual('foolabel1')
    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--label').at(1).text()).toEqual('foolabel2')

    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--data').length).toEqual(2)
    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--data').at(0).text()).toEqual('foovalue1')
    expect(cmp.findAll('.infl-prdgm-tbl-cell.infl-prdgm-tbl-cell--data').at(1).text()).toEqual('foovalue2') */
  })
})
