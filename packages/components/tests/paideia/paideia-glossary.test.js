/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { Options, TempStorageArea, Constants, LanguageModelFactory, Tab } from 'alpheios-data-models'
import { ClientAdapters, RemoteError } from 'alpheios-client-adapters'
import TextSelector from '@/lib/selection/text-selector'
import ResourcesOptionsDefaults from '@comp/settings/language-options-defaults.json'
import LexicalQuery from '@comp/lib/queries/lexical-query.js'

describe('PaideaTests', () => {
  const languageCode = 'lat'
  const languageId = LanguageModelFactory.getLanguageIdFromCode(languageCode)
  const clientId = 'paideaGlossaryTests'
  const resourceOptions = new Options(ResourcesOptionsDefaults, new TempStorageArea(ResourcesOptionsDefaults.domain, null))
  const optItem = resourceOptions.items['lexiconsShort'].find(optItem => Options.parseKey(optItem.name).group === 'lat')
  optItem.setValue('https://github.com/alpheios-project/paidea-glossary')

  const words = [] // ["ob","obeō","obiciō","oblīvīscor","obscūrus","observō","occidō","ocellus","octō","oculus","ōdī","odiōsus","odor","offa","offerō","oleō","ōlim","olīva","olor","ōmen","omnīnō","omnis","opīnor","oportet","oppidum","opus","ōra","ōrātiō","ōrātor","orbis","ōrdinō","orīgō","orior","ortus","ornithologīcus","ōrnō","ōs","os","ōsculor","ōsculum","ostendō","ōtiōsus","ovis","ōvum"]
    for (let i=0; i < words.length; i++) {
      it.skip(`${i+1}. ${words[i]} Paidea Glossary`, async () => {
        const adapterMorphRes = await ClientAdapters.morphology.tufts({
          method: 'getHomonym',
          clientId,
          params: {
            languageID: languageId,
            word: words[i]
          }
        })

        const homonym = adapterMorphRes.result
        homonym.lexemes.forEach((l) => { l.meaning.clearShortDefs() })

        const params = {
          opts: { allow: 'https://github.com/alpheios-project/paidea-glossary' },
          homonym
        }
        await ClientAdapters.lexicon.alpheios({
          method: 'fetchShortDefs',
          clientId,
          params
        })

        const res = homonym.lexemes.some(lex => lex.meaning.shortDefs.length > 0)
        if (!res) {
          console.info(words[i])
        }
        expect(res).toBeTruthy()
      })
    }
})