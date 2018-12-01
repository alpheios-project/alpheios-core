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
