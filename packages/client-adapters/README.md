Alpheios Client Adapters Library

# Configuration files

**adapters-config.json**

category --> adapter --> methods
                     --> params
           
| Name | Type | Description |
|------|------|-------------|
| **category** | String | This is a group of adapters by aim: morphology, lexicon, lemmatranslation |
| **adapter** | String | This is an adapter inside category group |
| **methods** | [String] | This is an array with available methods for current adapter. If a given method is not registered here, than it would be ignored |
| **params** | [String : [String]] | This is an array of parameters for the given method, if parameter is not regestered here - it won't be checked |

