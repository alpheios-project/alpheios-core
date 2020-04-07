/* eslint-env jest */
import GreekInput from '@/lib/utility/greek-input.js'

describe('greek-input.test.js', () => {

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 Greek-Input - test', () => {
    let input = 'boule/u!hs'
    let result = GreekInput.change(input)
    
    expect(result).toEqual('βουλεύῃς')    
  })
})
