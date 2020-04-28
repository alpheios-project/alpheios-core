/* eslint-env jest */
/* eslint-disable no-unused-vars */
import AlpheiosLexiconTransformer from '@clAdapters/transformers/alpheios-lexicon-transformer'
import AlpheiosTuftsAdapter from '@clAdapters/adapters/tufts/adapter'
import { Constants, Homonym, Feature } from 'alpheios-data-models'
import Traces from '@clAdapters/adapters/tufts/engine/traces'
import Morpheus from '@clAdapters/adapters/tufts/engine/morpheusgrc'

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
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let transformAdapter = new AlpheiosLexiconTransformer(adapter,Traces)
    let homonym = transformAdapter.transformData(res, 'foo')

    expect(homonym.lexemes.length).toEqual(1)
    expect(homonym.lexemes[0].lemma.word).toEqual('hdwdb')
    expect(homonym.lexemes[0].inflections.length).toEqual(1)
  })

  it('2 TransformAdapter - makes sure Lemmas are strings', async () => {
    let data = `{"RDF": {"Annotation": {"about": "urn:TuftsMorphologyService:χρῆ:morpheusgrc", "creator": {"Agent": {"about": "org.perseus:tools:morpheus.v1"}}, "created": {"$": "2020-04-28T15:03:33.284871"}, "rights": {"$": "Morphology provided by Morpheus from the Perseus Digital Library at Tufts University."}, "hasTarget": {"Description": {"about": "urn:word:χρῆ"}}, "title": {}, "hasBody": [{"resource": "urn:uuid:idm139805745227880"}, {"resource": "urn:uuid:idm139805745852024"}, {"resource": "urn:uuid:idm139805741308760"}, {"resource": "urn:uuid:idm139805742955688"}], "Body": [{"about": "urn:uuid:idm139805745227880", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": 1}, "pofs": {"order": 1, "$": "verb"}}, "infl": {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}}}}, {"about": "urn:uuid:idm139805745852024", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": "χράω2"}, "pofs": {"order": 1, "$": "verb"}}, "infl": [{"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "imperative"}, "num": {"$": "singular"}, "pers": {"$": "2nd"}, "tense": {"$": "present"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic Aeolic"}, "stemtype": {"$": "ew_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic Aeolic"}, "stemtype": {"$": "ew_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}]}}}, {"about": "urn:uuid:idm139805741308760", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": "χραύω"}, "pofs": {"order": 1, "$": "verb"}}, "infl": [{"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "imperative"}, "num": {"$": "singular"}, "pers": {"$": "2nd"}, "tense": {"$": "present"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "av_stem"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "av_stem"}, "morph": {"$": "contr unaugmented poetic"}}]}}}, {"about": "urn:uuid:idm139805742955688", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": "χρῆ"}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "gend": {"$": "feminine"}}, "infl": [{"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "ῆ"}}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "case": {"order": 7, "$": "nominative"}, "gend": {"$": "feminine"}, "num": {"$": "singular"}, "dial": {"$": "epic Ionic"}, "stemtype": {"$": "eh_ehs"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "ῆ"}}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "case": {"order": 1, "$": "vocative"}, "gend": {"$": "feminine"}, "num": {"$": "singular"}, "dial": {"$": "epic Ionic"}, "stemtype": {"$": "eh_ehs"}, "morph": {"$": "contr"}}]}}}]}}}`
    let res = JSON.parse(data)
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let transformAdapter = new AlpheiosLexiconTransformer(adapter,Morpheus)
    let homonym = transformAdapter.transformData(res, 'foo')

    expect(homonym.lexemes.length).toEqual(4)
    expect(homonym.lexemes[0].lemma.word).toEqual('1')
    expect(typeof homonym.lexemes[0].lemma.word).toEqual('string')
  })

  it('3 TransformAdapter - does not create lemma undefined', async () => {
    let data = `{"RDF": {"Annotation": {"about": "urn:TuftsMorphologyService:χρῆ:morpheusgrc", "creator": {"Agent": {"about": "org.perseus:tools:morpheus.v1"}}, "created": {"$": "2020-04-28T15:03:33.284871"}, "rights": {"$": "Morphology provided by Morpheus from the Perseus Digital Library at Tufts University."}, "hasTarget": {"Description": {"about": "urn:word:χρῆ"}}, "title": {}, "hasBody": [{"resource": "urn:uuid:idm139805745227880"}, {"resource": "urn:uuid:idm139805745852024"}, {"resource": "urn:uuid:idm139805741308760"}, {"resource": "urn:uuid:idm139805742955688"}], "Body": [{"about": "urn:uuid:idm139805745227880", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc" }, "pofs": {"order": 1, "$": "verb"}}, "infl": {"term": {"lang": "grc"}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}}}}, {"about": "urn:uuid:idm139805745852024", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": ""}, "pofs": {"order": 1, "$": "verb"}}, "infl": [{"term": {"lang": "grc"}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "imperative"}, "num": {"$": "singular"}, "pers": {"$": "2nd"}, "tense": {"$": "present"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic Aeolic"}, "stemtype": {"$": "ew_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric Ionic Aeolic"}, "stemtype": {"$": "ew_pr"}, "derivtype": {"$": "a_stem"}, "morph": {"$": "contr unaugmented poetic"}}]}}}, {"about": "urn:uuid:idm139805741308760", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": "χραύω"}, "pofs": {"order": 1, "$": "verb"}}, "infl": [{"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "imperative"}, "num": {"$": "singular"}, "pers": {"$": "2nd"}, "tense": {"$": "present"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "av_stem"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "η"}}, "pofs": {"order": 1, "$": "verb"}, "mood": {"$": "indicative"}, "num": {"$": "singular"}, "pers": {"$": "3rd"}, "tense": {"$": "imperfect"}, "voice": {"$": "active"}, "dial": {"$": "Doric"}, "stemtype": {"$": "aw_pr"}, "derivtype": {"$": "av_stem"}, "morph": {"$": "contr unaugmented poetic"}}]}}}, {"about": "urn:uuid:idm139805742955688", "type": {"resource": "cnt:ContentAsXML"}, "rest": {"entry": {"uri": null, "dict": {"hdwd": {"lang": "grc", "$": "χρῆ"}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "gend": {"$": "feminine"}}, "infl": [{"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "ῆ"}}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "case": {"order": 7, "$": "nominative"}, "gend": {"$": "feminine"}, "num": {"$": "singular"}, "dial": {"$": "epic Ionic"}, "stemtype": {"$": "eh_ehs"}, "morph": {"$": "contr"}}, {"term": {"lang": "grc", "stem": {"$": "χρ"}, "suff": {"$": "ῆ"}}, "pofs": {"order": 3, "$": "noun"}, "decl": {"$": "1st"}, "case": {"order": 1, "$": "vocative"}, "gend": {"$": "feminine"}, "num": {"$": "singular"}, "dial": {"$": "epic Ionic"}, "stemtype": {"$": "eh_ehs"}, "morph": {"$": "contr"}}]}}}]}}}`
    let res = JSON.parse(data)
    let adapter = new AlpheiosTuftsAdapter({
      category: 'morphology',
      adapterName: 'tufts',
      method: 'getHomonym',
      sourceData: res
    })
    let transformAdapter = new AlpheiosLexiconTransformer(adapter,Morpheus)
    let homonym = transformAdapter.transformData(res, 'foo')

    expect(homonym.lexemes.length).toEqual(2)
    expect(homonym.lexemes[0].lemma.word).toEqual('χραύω')
    expect(homonym.lexemes[1].lemma.word).toEqual('χρῆ')
  })

})
