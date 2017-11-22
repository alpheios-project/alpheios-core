/* eslint-env jest */
import ResourceProvider from '../src/resource_provider.js'

describe('ResourceProvider object', () => {
  let rights, rp, translation

  beforeAll(() => {
    rights = 'This resource is provided by XYZ'
    translation = 'Cette ressource devient de XYZ'
    rp = new ResourceProvider('uuid', rights, new Map([['fre', translation]]))
  })

  test('returns default rights string properly when no locale request', () => {
    expect(rp.toString()).toEqual(rights)
  })

  test('returns locale string when requested', () => {
    expect(rp.toLocaleString('fre')).toEqual(translation)
  })

  test('returns default when unavailable locale string requested', () => {
    expect(rp.toLocaleString('deu')).toEqual(rights)
  })

  test('proxies provider', () => {
    let mockLemma = { word: 'foo' }
    let proxiedLemma = ResourceProvider.getProxy(rp, mockLemma, ['propa', 'propb'])
    expect(proxiedLemma.word).toEqual('foo')
    expect(proxiedLemma.provider).toEqual(rp)
  })

  test('same provider objects are equal', () => {
    let rp2 = new ResourceProvider('uuid', rights, new Map([['fre', translation]]))
    expect(rp2).toEqual(rp)
  })
})
