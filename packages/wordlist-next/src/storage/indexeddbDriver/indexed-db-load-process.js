import { Homonym, WordItem, Lexeme, Lemma, LanguageModelFactory as LMF } from 'alpheios-data-models'

export default class IndexedDBLoadProcess {
  /**
   * Creates WordItem with properties from json and sets currentSession = false
   * @param {Object} jsonObj - data from common segment
   * @return {WordItem} 
   */
  static loadBaseObject(jsonObj) {
    // make sure when we create from the database
    // that the currentSession flag is set to false
    jsonObj.currentSession = false
    return new WordItem(jsonObj)
  }

  /**
   * Creates TextQuoteSelectors from jsonObjs and loads them to context property of wordItem
   * @param {Object[]} jsonObjs - data from context segment
   * @param {WordItem} wordItem
   * @return {WordItem} 
   */
  static loadContext (jsonObjs, wordItem) {
    if (! Array.isArray(jsonObjs)) {
      jsonObjs = [jsonObjs]  
    }
    wordItem.context = WordItem.readContext(jsonObjs)
    return wordItem
  }

  /**
   * Creates Homonym from jsonObj and loads it to homonym property of wordItem
   *   if jsonObjs[0] has homonym property with full data from local DB, then it uses readHomonym method
   *   if jsonObjs[0] has homonym property with short data from remote DB, 
   *        it creates empty homonym with data for lexemes from lemmasList
   *   if jsonObjs[0] has empty homonym property it creates empty homonym with languageCode and targetWord only
   * @param {Object[]} jsonObjs - data from homonym segment
   * @param {WordItem} wordItem
   * @return {WordItem} 
   */
  static loadHomonym (jsonObjs, wordItem) {
    let jsonHomonym = jsonObjs[0].homonym

    if (jsonHomonym.lexemes && Array.isArray(jsonHomonym.lexemes) && jsonHomonym.lexemes.length >0) {
      wordItem.homonym = WordItem.readHomonym(jsonObjs[0])
    } else {
      let languageID = LMF.getLanguageIdFromCode(jsonObjs[0].languageCode)
      let lexemes = []

      if (jsonHomonym.lemmasList) {
        let lexemesForms = jsonHomonym.lemmasList.split(', ')
        for (let lexForm of lexemesForms) {
          lexemes.push(new Lexeme(new Lemma(lexForm, languageID), []))
        }
      } else {
        lexemes = [new Lexeme(new Lemma(jsonObjs[0].targetWord, languageID), [])]
      }
      wordItem.homonym = new Homonym(lexemes, jsonHomonym.targetWord)
    }
    return wordItem
  }
}
