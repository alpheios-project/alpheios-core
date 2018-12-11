# Alpheios Client Adapters Library

## Configuration files

**adapters-config.json**

* category 
    * adapterName 
        * adapterFunc
        * methods
        * params
           
| Name | Type | Description |
|------|------|-------------|
| **category** | String | This is a group of adapters by aim: morphology, lexicon, lemmatranslation |
| **adapterName** | String | This is a adapter inside category group |
| **adapterFunc** | String | This is a method name for current adapter inside ClientAdapters |
| **methods** | [String] | This is an array with available methods for current adapter. If a given method is not registered here, than it would be ignored |
| **params** | [String : [String]] | This is an array of parameters for the given method, if parameter is not regestered here - it won't be checked |

**Example:**
```
"morphology": {
    "tufts": {
      "adapter": "maAdapter",
      "methods": [ "getHomonym" ],
      "params": {
        "getHomonym" : [ "languageID", "word" ]
      }
    }
}
```


## Morphology.tufts Adapter

This adapter retrieves morphology data for the input word (https://morph.alpheios.net/api/v1/analysis/word)

**Format of execution**

```
let result = ClientAdapters.morphology.tufts({
  method: 
  params: {
    languageID: 
    word: 
  }
})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| method | Symbol | There is only one available method - 'getHomonym' |
| languageID | Symbol | Language ID for the input word, for example - Constants.LANG_LATIN |
| word | String | Input word, for example - 'mare' |


**Result: Promise**

| Name | Type | Description |
|------|------|-------------|
| homonym | Homonym | The result of morphology analyzer |
| errors | Array | Array of AdapterError objects |


**Avalable languages:**

| Language | Engine [config.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/config.json) | Engine Js |
|------|------|-------------|
| Constants.LANG_LATIN | whitakerLat | [whitakers.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/engine/whitakers.js) |
| Constants.LANG_GREEK | morpheusgrc | [morpheusgrc.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/engine/morpheusgrc.js) |
| Constants.LANG_ARABIC | aramorph | [aramorph.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/engine/aramorph.js) |
| Constants.LANG_PERSIAN | hazm | [hazm.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/engine/hazm.js) |
| Constants.LANG_GEEZ | traces | [traces.js](https://github.com/alpheios-project/client-adapters/blob/master/src/adapters/tufts/engine/traces.js) |



## Morphology.alpheiosTreebank Adapter

This adapter retrieves morphology data for the input word reference from Treebank (http://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq)

**Format of execution**

```
let result = ClientAdapters.morphology.alpheiosTreebank({
  method: 
  params: {
    languageID: 
    wordref: 
  }
})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| method | Symbol | There is only one available method - 'getHomonym' |
| languageID | Symbol | Language ID for the input word, for example - Constants.LANG_LATIN |
| wordref | String | Reference for the input word, for example - 'phi0959.phi006.alpheios-text-lat1#1-2' |

**Result: Promise**

| Name | Type | Description |
|------|------|-------------|
| homonym | Homonym | The result of morphology analyzer |
| errors | Array | Array of AdapterError objects |



## Lexicon.alpheios Adapter

This adapter retrieves definitions data for the input word from different Dictionaries.

**Format of execution**

```
let result = ClientAdapters.lexicon.alpheios({
  method: 
  params: {
    opts: 
    homonym: 
    callBackEvtSuccess: 
    callBackEvtFailed: 
  }
})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| method | Symbol | There is two available methods - 'fetchShortDefs' and 'fetchFullDefs' |
| opts | Object | Options with allow property - array with dictionaries urls for definitions |
| homonym | Homonym | Input Homonym for getting definitions |
| callBackEvtSuccess | PsEvent | PsEvent to publish on getting definitions - for example 'LexicalQuery.evt.DEFS_READY' |
| callBackEvtFailed | PsEvent | PsEvent to publish on failing to get definitions - for example 'LexicalQuery.evt.DEFS_NOT_FOUND' |

**Result: Promise**

| Name | Type | Description |
|------|------|-------------|
| errors | Array | Array of AdapterError objects |

**Available Dictionaries**

| Language | Short | Full | Url | Description |
|------|------|------|------|-------------|
| grc | + | + | https://github.com/alpheios-project/lsj | "A Greek-English Lexicon" (Henry George Liddell, Robert Scott) |
| grc | + | + | https://github.com/alpheios-project/aut | "Autenrieth Homeric Dictionary" (Geoerge Autenrieth) |
| grc | + | + | https://github.com/alpheios-project/ml | "Middle Liddell" |
| grc | + | + | https://github.com/alpheios-project/as | "A Manual Greek Lexicon of the New Testament" |
| grc | + |   | https://github.com/alpheios-project/dod | "Dodson" |
| lat |   | + | https://github.com/alpheios-project/ls | "A Latin Dictionary" (Charlton T. Lewis, Charles Short) |
| ara |   | + | https://github.com/alpheios-project/lan | "The Arabic-English Lexicon" (Edward Lane) |
| ara |   | + | https://github.com/alpheios-project/sal | "An Advanced Learner's Arabic Dictionary" (H. Anthony Salmone) |
| per | + |   | https://github.com/alpheios-project/stg | "A Comprehensive Persian-English Dictionary" (Francis Joseph Steingass) |



## Lemmatranslation.alpheios Adapter

This adapter retrieves translations to different languages.

```
let result = ClientAdapters.lemmatranslation.alpheios({
  method: 
  params: {
    homonym: 
    browserLang: 
  }
})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| method | Symbol | There is one available methods - 'fetchTranslations' |
| homonym | Homonym | Input Homonym for getting definitions |
| browserLang | String | Available languages for translation |

**Result: Promise**

| Name | Type | Description |
|------|------|-------------|
| errors | Array | Array of AdapterError objects |

**Available languages**

| Name | Description |
|------|-------------|
| en-US | English |
| it | Italian |
| pt | Portuguese |
| ca | Catalan |
| fr | French |
| de | German |
| es | Spain |
