/* eslint-env jest */
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import AuthModule from '@/vue/vuex-modules/data/auth-module.js'

describe('auth-module.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api
  let mockSessionAuth
  let mockAppAuth
  let mockProfile
  let mockToken
  let mockEP
  let mockWordListEP
  let mockUnAuthenticatedAppAuth
  let mockUnAuthenticatedSessionAuth

  // jest expect returns after the first Promise in a chain resolves
  // this solution is from https://github.com/facebook/jest/issues/2157#issuecomment-279171856
  function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
  }

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
    store = new Vuex.Store({
      modules: {
      }
    })

    api = {}

    mockProfile = {
      sub: 'mockUser',
      nickname: 'nickname',
    }

    mockToken = 'abcdefg'
    mockWordListEP = 'http://example.org/words'

    mockEP = {
      'wordlist': mockWordListEP
    }

    mockAppAuth = {
      loginUrl: () => { return null },
      logoutUrl: () => { return null },
      authenticate: () => { return new Promise((resolve,reject) => { resolve('success') })},
      session: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      getProfileData: () => { return new Promise((resolve,reject) => { resolve(mockProfile) })},
      getUserData: () => { return new Promise((resolve,reject) => { resolve(mockToken) })},
      getEndPoints: () => { return new Promise((resolve,reject) => { resolve(mockEP) })},
      logout: () => { return new Promise((resolve,reject) => { resolve('success') })}
    }
    mockSessionAuth = {
      loginUrl: () => { return "http://example.org/login?next={FROM_URL}"},
      logoutUrl: () => { return "http://example.org/logout?next{FROM_URL}" },
      authenticate: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      session: () => { return new Promise((resolve,reject) => { resolve(mockProfile) })},
      getProfileData: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      getUserData: () => { return new Promise((resolve,reject) => { resolve(mockToken) })},
      getEndPoints: () => { return new Promise((resolve,reject) => { resolve(mockEP) })},
      logout: () => { return new Promise((resolve,reject) => { resolve('success') })}
    }
    mockUnAuthenticatedSessionAuth = {
      loginUrl: () => { return "http://example.org/login?next={FROM_URL}"},
      logoutUrl: () => { return "http://example.org/logout?next{FROM_URL}" },
      authenticate: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      session: () => { return new Promise((resolve,reject) => { reject(new Error('not authenticated')) })},
      getProfileData: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      getUserData: () => { return new Promise((resolve,reject) => { reject('unauthenticated') })},
      getEndPoints: () => { return new Promise((resolve,reject) => { resolve(mockEP) })},
      logout: () => { return new Promise((resolve,reject) => { resolve('success') })}
    }
    mockUnAuthenticatedAppAuth = {
      loginUrl: () => { return null },
      logoutUrl: () => { return null },
      authenticate: () => { return new Promise((resolve,reject) => { reject(new Error('failed')) })},
      session: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      getProfileData: () => { return new Promise((resolve,reject) => { reject(new Error('not implemented')) })},
      getUserData: () => { return new Promise((resolve,reject) => { reject('unauthenticated') })},
      getEndPoints: () => { return new Promise((resolve,reject) => { resolve(mockEP) })},
      logout: () => { return new Promise((resolve,reject) => { resolve('success') })}
    }
  })

  afterEach(() => {
    jest.resetModules()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('AuthModule should have a correct static public name', () => {
    const modulePublicName = 'auth'
    expect(AuthModule.moduleName).toEqual(modulePublicName)
  })

  it(`AuthModule's store should be initialized with correct default values`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
    expect(store.state.auth.isAuthenticated).toEqual(false)
    expect(store.state.auth.enableLogin).toEqual(true)
    expect(store.state.auth.notification.visible).toEqual(false)
    expect(store.state.auth.notification.showLogin).toEqual(false)
    expect(store.state.auth.notification.hideLoginPrompt).toEqual(false)
    expect(store.state.auth.notification.count).toEqual(0)
    expect(store.state.auth.notification.text).toBeNull()
  })

  it(`AuthModule enableLogin state should default to false if auth not enabled`, () => {
    const authModule = new AuthModule(store, api, { auth: null })
    expect(store.state.auth.enableLogin).toBeFalsy()
  })

  it(`AuthModule's setIsAuthenticated() store mutation should update profile`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    store.commit('auth/setIsAuthenticated', mockProfile)
    expect(store.state.auth.isAuthenticated).toBeTruthy()
    expect(store.state.auth.userId).toEqual(mockProfile.sub)
    expect(store.state.auth.userNickName).toEqual(mockProfile.nickname)
  })

  it(`AuthModule's setIsNotAuthenticated() store mutation should reset profile`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    store.commit('auth/setIsNotAuthenticated')
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
  })

  it(`AuthModule's setIsNotAuthenticated() store mutation should reset profile for sessionAuth`, () => {
    const authModule = new AuthModule(store, api, { auth: mockSessionAuth })
    store.commit('auth/setIsNotAuthenticated')
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
  })

  it(`AuthModule's setNotification() store mutation should update notification state`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    let mockMessage = { text: 'mockmessage'}
    store.commit(`auth/setNotification`, mockMessage)
    expect(store.state.auth.notification.visible).toBeTruthy()
    expect(store.state.auth.notification.showLogin).toBeFalsy()
    expect(store.state.auth.notification.count).toEqual(0)
    expect(store.state.auth.notification.text).toEqual(mockMessage.text)
  })
  it(`AuthModule's setNotification() store mutation should update notification state with count and login`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    let mockMessage = { text: 'mockmessage', showLogin: true, count: 10}
    store.commit(`auth/setNotification`, mockMessage)
    expect(store.state.auth.notification.visible).toBeTruthy()
    expect(store.state.auth.notification.showLogin).toBeTruthy()
    expect(store.state.auth.notification.count).toEqual(10)
    expect(store.state.auth.notification.text).toEqual(mockMessage.text)
  })
  it(`AuthModule's setNotification() store mutation should obey hideLoginPrompt`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    store.commit('auth/setHideLoginPrompt',true)
    let mockMessage = { text: 'mockmessage', showLogin: true, count: 10}
    store.commit(`auth/setNotification`, mockMessage)
    expect(store.state.auth.notification.visible).toBeFalsy()
  })
  it(`AuthModule's resetNotification() store mutation should clear notification state`, () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    store.commit(`auth/resetNotification`)
    expect(store.state.auth.notification.visible).toBeFalsy()
    expect(store.state.auth.notification.showLogin).toBeFalsy()
    expect(store.state.auth.notification.count).toEqual(0)
    expect(store.state.auth.notification.text).toBeNull()
  })

  it('AuthModule should expose an api with a correct set of methods', () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    const methods = ['session', 'authenticate', 'logout', 'getUserData']
    expect(Object.keys(api.auth)).toEqual(expect.arrayContaining(methods))
  })

  it(`AuthModule API's session should update profile for sessionAuthenticator`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockSessionAuth })
    api.auth.session()
    await flushPromises()
    expect(store.state.auth.isAuthenticated).toBeTruthy()
    expect(store.state.auth.userId).toEqual(mockProfile.sub)
    expect(store.state.auth.userNickName).toEqual(mockProfile.nickname)
  })

  it(`AuthModule API's session should not update profile for Unauthorized sessionAuthenticator`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockUnAuthenticatedSessionAuth })
    api.auth.session()
    await flushPromises()
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
  })

  it(`AuthModule API's session should not update profile for app authenticator`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    api.auth.session()
    await flushPromises()
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
  })

  it(`AuthModule API's authenticate should not update profile and should set notification for failed app login`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockUnAuthenticatedAppAuth })
    jest.spyOn(mockUnAuthenticatedAppAuth,'authenticate')
    jest.spyOn(mockUnAuthenticatedAppAuth,'getProfileData')
    api.auth.authenticate()
    await flushPromises()
    expect(mockUnAuthenticatedAppAuth.authenticate).toHaveBeenCalled()
    expect(mockUnAuthenticatedAppAuth.getProfileData).not.toHaveBeenCalled()
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
    expect(store.state.auth.notification.text).toEqual('AUTH_LOGIN_AUTH_FAILURE_MSG')
  })

  it(`AuthModule API's authenticate should update profile and should set notification for app login`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    jest.spyOn(mockAppAuth,'authenticate')
    jest.spyOn(mockAppAuth,'getProfileData')
    api.auth.authenticate()
    await flushPromises()
    expect(mockAppAuth.authenticate).toHaveBeenCalled()
    expect(mockAppAuth.getProfileData).toHaveBeenCalled()
    expect(store.state.auth.isAuthenticated).toBeTruthy()
    expect(store.state.auth.userId).toEqual(mockProfile.sub)
    expect(store.state.auth.userNickName).toEqual(mockProfile.nickname)
    expect(store.state.auth.notification.text).toEqual('AUTH_LOGIN_SUCCESS_MSG')
  })

  it(`AuthModule API's logout should clear profile`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    api.auth.authenticate()
    await flushPromises()
    expect(store.state.auth.isAuthenticated).toBeTruthy()
    expect(store.state.auth.userId).toEqual(mockProfile.sub)
    expect(store.state.auth.userNickName).toEqual(mockProfile.nickname)
    expect(store.state.auth.notification.text).toEqual('AUTH_LOGIN_SUCCESS_MSG')
    api.auth.logout()
    await flushPromises()
    expect(store.state.auth.isAuthenticated).toBeFalsy()
    expect(store.state.auth.userId).toEqual('')
    expect(store.state.auth.userNickName).toEqual('')
    expect(store.state.auth.notification.text).toEqual('AUTH_LOGOUT_SUCCESS_MSG')
  })

  it(`AuthModule API's getUserData returns user data object`, async () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    api.auth.authenticate()
    await flushPromises()
    let result = await api.auth.getUserData()
    expect(result.accessToken).toEqual(mockToken)
    expect(result.userId).toEqual(mockProfile.sub)
    expect(result.endpoints).toEqual(mockEP)
  })
  
  it('AuthModule APIs setHideLoginPrompt updates set and closes notification', () => {
    const authModule = new AuthModule(store, api, { auth: mockAppAuth })
    let mockMessage = { text: 'mockmessage', showLogin: true, count: 10}
    store.commit(`auth/setNotification`, mockMessage)
    expect(store.state.auth.notification.visible).toBeTruthy()
    expect(store.state.auth.notification.showLogin).toBeTruthy()
    expect(store.state.auth.notification.count).toEqual(10)
    expect(store.state.auth.notification.text).toEqual(mockMessage.text)
    store.commit(`auth/setHideLoginPrompt`, true)
    expect(store.state.auth.notification.hideLoginPrompt).toBeTruthy()
    expect(store.state.auth.notification.visible).toBeFalsy()
  })
})
