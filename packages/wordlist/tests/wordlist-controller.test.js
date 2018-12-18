import WordlistController from '@/controllers/wordlist-controller.js'

describe('wordlist-controller.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}  

  beforeAll(async () => {

  })
  
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
  
  it('1 WordlistController - new constructor', () => {
    let wC = new WordlistController()
    console.info('************wc', wC)
  })
})