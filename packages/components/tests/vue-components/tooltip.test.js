/* eslint-env jest */
import { mount } from '@vue/test-utils'
import LemmaTranslation from '../../src/vue-components/tooltip.vue'

describe('tooltip.test.js', () => {
  let spy
  let testTooltipText = 'test tooltip text'
  let testDirection = 'bottom-right'
  let testDirectionClass = 'alph_tooltip-bottom-right'
  let testAdditionalStyles = {color: '#dd0000'}

  it('If there is an empty tooltipText - error is thrown', () => {
    spy = jest.spyOn(console, 'error')

    mount(LemmaTranslation, {})
    expect(spy).toHaveBeenCalled()
  })

  it('If there is an empty tooltipText - no tooltip is shown', () => {
    let cmp = mount(LemmaTranslation, {})
    expect(cmp.find('.alph_tooltip .tooltiptext').exists()).toBeFalsy()
  })

  it('TooltipText is printed in the tooltip span', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext').exists()).toBeTruthy()
    expect(cmp.find('.alph_tooltip .tooltiptext').text()).toEqual(testTooltipText)
  })

  it('If there is an empty tooltipDirection - tooltip is shown bottom', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-bottom').exists()).toBeTruthy()
  })

  it('If there is a not empty tooltipDirection - directionClass is calculated based on it', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: testDirection
      }
    })

    let computedDirectionClass = {}
    computedDirectionClass[testDirectionClass] = true
    expect(cmp.vm.directionClass).toEqual(computedDirectionClass)
  })

  it('If there is a not empty tooltipDirection - tooltip direction class is printed', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: testDirection
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.' + testDirectionClass).exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection = top - tooltip has class alph_tooltip-top', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'top'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-top').exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection = bottom - tooltip has class alph_tooltip-bottom', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'bottom'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-bottom').exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection = left - tooltip has class alph_tooltip-left', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'left'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-left').exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection = left - tooltip has class alph_tooltip-right', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'right'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-right').exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection = bottom-right - tooltip has class alph_tooltip-bottom-right', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'bottom-right'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-bottom-right').exists()).toBeTruthy()
  })

  it('If there is a tooltipDirection is not from available values - tooltip has class alph_tooltip-bottom', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        tooltipDirection: 'incorrect'
      }
    })
    expect(cmp.find('.alph_tooltip .tooltiptext.alph_tooltip-bottom').exists()).toBeTruthy()
  })

  it('If there is a not empty additionalStyles - tooltip span applies them', () => {
    let cmp = mount(LemmaTranslation, {
      propsData: {
        tooltipText: testTooltipText,
        additionalStyles: testAdditionalStyles
      }
    })

    let checkStyleKey = Object.keys(testAdditionalStyles)[0]
    expect(cmp.find('.alph_tooltip .tooltiptext').attributes()['style']).toContain(checkStyleKey + ':')
  })
})
