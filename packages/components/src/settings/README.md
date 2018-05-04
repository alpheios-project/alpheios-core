# Settings
This directory contain JSON files with values of different options. Each file contains a set of options
for a single options domain. Each option in a domain corresponds to a property of a JSON object in a file.
There can be an arbitrary number of options, but the following ones must always be present:
* `domain` - a string value of an options domain name for a set of options, e.g. `alpheios-content-options`.
It  must be unique across an application.
* `items` - an object that contains those options that are exposed to the user. This object can be empty,
but it must be present.

Each option name should be unique across all domains.

Options within an `items` object must have the following format:
```
"optionName": {
      "defaultValue": "some_value",
      "labelText": "This is option A:",
      "values": [
        {
          "value": "some_value",
          "text": "Some Value"
        },
        {
          "value": "some_other_value",
          "text": "Some Other Value"
        }
      ]
    },
```
`optionName` is an should be able to make a valid JS variable name.

`labelText` is a title (description) of an option that will be presented to the user in the options UI. 
`values` lists all possible values of an option. `value` is one of the option values that is used 
internally within a code for an option value evaluation. `text` as a description of a value that 
will be shown to the user in the front end UI (drop-down list, radio button labels, etc.).

When new options are added to the `items` object, they usually will be added to the user-exposed front end UI
automatically.
