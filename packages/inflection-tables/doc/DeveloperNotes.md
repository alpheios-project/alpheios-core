
# Basic Workflow:

* user selects a word
* word is sent to a morphological analyzer 
* morphological analyzer identifies one or more possible analyses
* each analysis identifies a part of speech, the stem and suffix, and one or more possible inflections 
* inflection tables are searched for matching inflections and matching suffixes 
* table(s) are presented to user, collapsed to show only the possible matches
* tables are specific to part of speech
* if analyses included possible multiple parts of speech, user can switch between different tables
* in each table, all matching suffixes are highlighted
* suffixes which are for inflections which are an exact match are highlighted differently from those which are matching suffixes but mismatch on inflection properties
* user can expand the tables to get a full view of all inflection suffixes for that part of speech
* user can request to navigate and view all tables for all parts of speech
* inflection table components can be linked to other related resources (such as grammars)


# Summary of Original Implementation

## Preconditions
The user selected a term on the page. The javascript loaded in the Alpheios Firefox Plugin added an "alpheios-popup" html div element to the page to contain the results, and sent a request to a web service for morphological analysis.  The analyses were provided as an XML document.  The plugin javascript executed an XSLT transform to transform the XML containing the analyses and populate the alpheios-popup div with html, using css classes to encode the inflection properties.  

## Inflection Table Functionality

When the user requested inflection tables, the plugin javascript executed the following steps:

1. retrieved the inflection tables XML data source from the plugin content (access through the browser to files stored locally on the user's machine)
1. parsed the alpheios-popup element in the page for the form, stem, suffix, parts of speech and inflection properties
1. submitted this data as input parameters to an XSLT transformation
1. The XSLT transformed the inflection table into HTML tables with matches and linkable properties identified via css classes
1. The plugin javascript applied javascript handlers to the table to allow the user to expand and collapse and switch between tables
1. added links to supporting resources
1. presented the tables to the user

An alternate transform was used if the user was in "quiz" mode to present an interactive view of the table which required the user to click on the table cells containing the right inflection to uncover them.

# Requirements for New Implementation

1. The inflection table library is responsible for taking a language code, a word, along with its analyses, and returning the matching inflection tables. (See Sample morphological analysis service queries under References below for examples of analysis/inflection input data)
1. The response should be available in different formats, per client request, including as:
    1. JSON data structures 
    1. actionable, styled HTML5 views (i.e with javascript, css, etc.)
    1. possibly other still TBD formats
1. must be modular so that it could be used in variety of different scenarios 
1. must be extensible to allow for language-specific (e.g. Latin, Greek, etc.) requirements, while providing a shared base that can be reused across languages
1. should be portable to different platforms (i.e. used in a browser plugin, directly embedded in a web page, or in a mobile application)
1. should use modern data structures and libraries (i.e. eliminate reliance on dwindling browser support for XML and XSLT)
1. Should include full coverage unit tests
1. Should not have server-side dependencies (e.g. should be full executable client-side in the user's browser)

# Original Code

The majority of the Alpheios Inflection display and quiz functionality was implemented via the XSLT transformations with Javascript driver code driving the transformations (including setting of the input parameters to the XSLT transforms) and display. 

  [Greek XML](https://github.com/alpheios-project/inflections-grc-xml)
  
  [Latin XML](https://github.com/alpheios-project/inflections-lat-xml)
  
  [XSLT](https://github.com/alpheios-project/xslt) (The relevant files are all named `alph-infl-*` or `alph-verb-*`)
  
  [Greek Javascript Driver](https://github.com/alpheios-project/alpheios5/blob/master/scripts/lang-tool-greek.js#L142-L649)
  
  [Latin Javascript Driver](https://github.com/alpheios-project/ff-extension-latin/blob/master/content/alpheios-latin-langtool.js#L56-L374)
  
  [Test Plan](https://github.com/alpheios-project/inflection-tables/blob/master/doc/alpheiostestplan.pdf)

The javascript driver code includes references to HTML element classes such as `alph-dict`, `alph-pofs`, etc. These all are found in the Alpheios popup, and come directly from the morpheus output (as represented per the [Alpheios lexicon schema](https://github.com/alpheios-project/schemas/blob/master/xsd/lexicon.xsd) and transformed via [alpheios.xsl](https://github.com/alpheios-project/xslt/blob/master/alpheios.xsl).

# References
  * Morphological Analysis Service Queries:
  
     ```
     curl -H "Accept: application/json" "http://morph.perseids.org/analysis/word?lang=lat&engine=morpheuslat&word=mare"
     curl -H "Accept: application/json" "http://morph.perseids.org/analysis/word?lang=grc&engine=morpheusgrc&word=τέχνῃ"
     ```
  
  * [Plugin Code Map](http://alpheios.net/content/alpheios-firefox-plugins#codemap)
  * [User Guide](http://alpheios.net/content/lexicons-grammars-and-inflections)
  * [Tutorial](http://alpheios.net/alpheios-demos/inflection.htm)

