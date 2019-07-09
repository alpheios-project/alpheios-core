/* eslint-env jest */
import RemoteAuthStorageArea from '@/lib/options/remote-auth-storage-area'
import axios from 'axios'
// import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

describe('remote-auth-storage-area.test.js', () => {
  let auth
  beforeAll(() => {
    auth  = {
      accessToken: process.env.AUTH_TOKEN || 'dummyToken',
      endpoints: {
        settings: process.env.ENDPOINT || 'https://dummy.org'
      }
    }
    // if the environment doesn't have authentication details then
    // mock the axios interface
    if (! process.env.AUTH_TOKEN) {
      axios.post = jest.fn(() => { return { status: 201 } })
      axios.get = jest.fn(() => { return { status: 200,  data:{'alpheios-feature-settings__2__mode': JSON.stringify('verbose')}} })
      axios.delete = jest.fn(() => { return { status: 200 } })
    }
    jest.spyOn(axios,'get')
    jest.spyOn(axios,'post')
    jest.spyOn(axios,'delete')
  })
  beforeEach(() => {
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('gets user settings', async() => {
    let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
    let res = await stAdapter.get()
    expect(axios.get).toHaveBeenCalled()
  })

  it('sets user settings', async() => {
    let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
    let mockSetting = { domain__version__setting: JSON.stringify('setting_value')}
    let res = await stAdapter.set(mockSetting)
    expect(axios.post).toHaveBeenCalled()
  })

  it('clears user settings', async() => {
    let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
    let res = await stAdapter.clearAll()
    expect(axios.delete).toHaveBeenCalled()
  })

  it('handles errors on get', async() => {
      expect.assertions(1);
      axios.get = jest.fn(() => { return { status: 401 } })
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
      try {
      let res = await stAdapter.get()
      } catch (e) {
        expect(e.message).toEqual('Unexpected result status from settings api: 401')
      }
  })

  it('handles errors on set', async() => {
      expect.assertions(1);
      axios.post = jest.fn(() => { return { status: 401 } })
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
      try {
      let res = await stAdapter.set({any:'any'})
      } catch (e) {
        expect(e.message).toEqual('Unexpected result status from settings api: 401')
      }
  })

  it('handles errors on clearAll', async() => {
      expect.assertions(1);
      axios.delete = jest.fn(() => { return { status: 401 } })
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
      try {
      let res = await stAdapter.clearAll()
      } catch (e) {
        expect(e.message).toEqual('Unexpected result status from settings api: 401')
      }
  })

  it('throws error if constructed without auth',() => {
    expect(() => {
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings')
    }).toThrowError(/Authentication details missing or invalid/)
  })

  it('throws error if constructed with auth missing endpoint',() => {
    expect(() => {
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',{accessToken:'abc'})
    }).toThrowError(/Authentication details missing or invalid/)
  })

  it('throws error if constructed with auth invalid endpoint',() => {
    expect(() => {
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',{accessToken:'abc', endpoint: {settings: 'abc'}})
    }).toThrowError(/Authentication details missing or invalid/)
  })

  it('throws error if constructed with auth missing access token',() => {
    expect(() => {
      let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',{endpoint: {settings: 'https://example.com'}})
    }).toThrowError(/Authentication details missing or invalid/)
  })
})
