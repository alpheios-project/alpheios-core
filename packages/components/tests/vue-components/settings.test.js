/* eslint-env jest */
import { shallow } from 'vue-test-utils'
import Setting from '../../src/vue-components/setting.vue'

describe('setting.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Setting, {
      propsData: {
        data: {
          name: 'mockSetting',
          textValues: () => { return ['foo', 'bar'] },
          currentTextValue: () => { return 'foo' }
        }
      }
    }) // Create a copy of the original component
  })

  it('expects selected to be computed', () => {
    expect(cmp.vm.selected).toEqual('foo')
  })

  it('expects selected to emit a change event', () => {
    cmp.vm.selected = 'bar'
    expect(cmp.emitted('change')).toBeTruthy()
    expect(cmp.emitted('change')[0]).toEqual(['mockSetting', 'bar'])
  })

  it('expects defaults to be set', () => {
    expect(cmp.vm.showTitle).toBeTruthy()
    expect(cmp.vm.classes).toEqual(['uk-margin'])
  })

  it('expects options to be defined from data', () => {
    let options = cmp.find('div').find('select').findAll('option')
    expect(options.length).toEqual(2)
  })

  it('expects single value data to not be multiple select', () => {
    let selected = cmp.find('div').find('select')
    expect(selected.attributes().multiple).toBeFalsy()
  })

  it('expects multivalue data to force multiple select', () => {
    let myCmp = shallow(Setting, {
      propsData: {
        data: {
          name: 'mockSetting',
          multiValue: true,
          textValues: () => { return ['foo', 'bar'] },
          currentTextValue: () => { return 'foo' }
        }
      }
    })
    let selected = myCmp.find('div').find('select')
    expect(selected.attributes().multiple).toBeTruthy()
  })
})
