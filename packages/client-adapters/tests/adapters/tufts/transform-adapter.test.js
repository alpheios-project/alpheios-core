/* eslint-env jest */
/* eslint-disable no-unused-vars */
import AlpheiosTuftsAdapter from '@/adapters/tufts/adapter'
import TransformAdapter from '@/adapters/tufts/transform-adapter'
import { Constants, Homonym, Feature } from 'alpheios-data-models'

describe('transform-adapter.test.js', () => {
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

  it('1 TransformAdapter - does not fail on inflection creation error', async () => {
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym'
    })

    let word = 'foo'
    let data =
    `{
      "RDF": {
          "Annotation": {
            "about": "urn:TuftsMorphologyService:test",
            "creator": {
              "Agent": {
                "about": "betamasaheft.eu:morpho.v1"
              }
            },
            "created": {
              "$": "2019-02-19T16:17:47.649221"
            },
            "rights": {
              "$": "rights"
            },
            "hasTarget": {
              "Description": {
                "about": "urn:word:foo"
              }
            },
            "title": {},
            "hasBody": [
              {
                "resource": "urn:uuid:idm140034422471680"
              },
              {
                "resource": "urn:uuid:idm140034422019008"
              }
            ],
            "Body": [
              {
                "about": "urn:uuid:idm140034422471680",
                "type": {
                  "resource": "cnt:ContentAsXML"
                },
                "rest": {
                  "entry": {
                    "dict": {
                      "hdwd": {
                        "lang": "gez",
                        "$": "hdwda"
                      }
                    },
                    "mean": {
                      "lang": "la"
                    },
                    "infl": {
                      "term": {
                        "lang": "gez",
                        "stem": {
                        }
                      },
                      "pofs": {
                        "$": "relative pronoun"
                      },
                      "mood": {},
                      "gend": {},
                      "case": {},
                      "note": {},
                      "num": {},
                      "pers": {}
                    }
                  }
                }
              },
              {
                "about": "urn:uuid:idm140034422019008",
                "type": {
                  "resource": "cnt:ContentAsXML"
                },
                "rest": {
                  "entry": {
                    "dict": {
                      "hdwd": {
                        "lang": "gez",
                        "$": "hdwdb"
                      }
                    },
                    "mean": {
                      "lang": "la",
                      "$": "servus"
                    },
                    "infl": {
                      "term": {
                        "lang": "gez",
                        "stem": {
                          "$": "stemb"
                        }
                      },
                      "pofs": {
                        "$": "common noun"
                      },
                      "mood": {},
                      "gend": {
                        "$": "masculinens"
                      },
                      "case": {
                        "$": "accusative"
                      },
                      "note": {
                        "$": "absolute state"
                      },
                      "num": {
                        "$": "singularp singulars"
                      },
                      "pers": {}
                    }
                  }
                }
              }
            ]
          }
        }
      }
    `
    let res = JSON.parse(data)
    let transformAdapter = new TransformAdapter(adapter)
    let homonym = transformAdapter.transformData(res, word)

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].lemma.word).toEqual('hdwdb')
    expect(homonym.lexemes[0].inflections.length).toEqual(1)
  })
})
