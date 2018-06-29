/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import WideInflectionsSubTables from '@/vue-components/inflections-subtables-wide.vue'

describe('inflections-subtables-wide.test.js', () => {
  const rowClass = '.infl-prdgm-tbl__row'
  const cellClass = '.infl-prdgm-tbl__cell'
  const cellLabelClass = '.infl-prdgm-tbl__cell--label'
  const cellDataClass = '.infl-prdgm-tbl__cell--data'
  it('1 WideInflectionsSubTables - renders a vue instance (min requirements)', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 WideInflectionsSubTables - renders with data)', () => {
    let cmp = mount(WideInflectionsSubTables, {
      propsData: {
        view: {
          wideSubTables: [{
            rows: [
              {
                cells: [
                  {role: 'label', value: 'foolabel1'},
                  {role: 'data', value: 'foovalue1'},
                  {role: 'foo', value: 'something1'}
                ]
              },
              {
                cells: [
                  {role: 'label', value: 'foolabel2'},
                  {role: 'data', value: 'foovalue2'},
                  {role: 'foo', value: 'something1'}
                ]
              }
            ]
          }]
        }
      }
    })

    expect(cmp.findAll(rowClass).length).toEqual(2)
    expect(cmp.findAll(cellClass).length).toEqual(6)

    expect(cmp.findAll(`${cellClass}${cellLabelClass}`).length).toEqual(2)
    expect(cmp.findAll(`${cellClass}${cellLabelClass}`).at(0).text()).toEqual('foolabel1')
    expect(cmp.findAll(`${cellClass}${cellLabelClass}`).at(1).text()).toEqual('foolabel2')

    expect(cmp.findAll(`${cellClass}${cellDataClass}`).length).toEqual(2)
    expect(cmp.findAll(`${cellClass}${cellDataClass}`).at(0).text()).toEqual('foovalue1')
    expect(cmp.findAll(`${cellClass}${cellDataClass}`).at(1).text()).toEqual('foovalue2')
  })
})
