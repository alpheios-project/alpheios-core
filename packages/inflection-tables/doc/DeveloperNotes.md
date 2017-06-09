
# Original Code

The majority of the Alpheios Inflection display and quiz functionality is implemented via the XSLT transformations with Javascript driver code 
for the transformations (which includes setting of the input parameters to the XSLT transforms) and display. 

  [Greek XML](https://github.com/alpheios-project/inflections-grc-xml)
  [Latin XML](https://github.com/alpheios-project/inflections-lat-xml)
  [XSLT](https://github.com/alpheios-project/xslt) (The relevant files are all named `alph-infl-*` or `alph-verb-*`)
  [Greek Javascript Driver](https://github.com/alpheios-project/alpheios5/blob/master/scripts/lang-tool-greek.js#L142-L649)
  [Latin Javascript Driver](https://github.com/alpheios-project/ff-extension-latin/blob/master/content/alpheios-latin-langtool.js#L56-L374)
  [Test Plan]()

The above-referenced javascript code includes references to HTML element classes like 
alph-dict, alph-pofs, etc. These all are found in the Alpheios popup, and come directly from the 
morpheus output (as represented per the [Alpheios lexicon schema](https://github.com/alpheios-project/schemas/blob/master/xsd/lexicon.xsd)
and transformed via [alpheios.xsl](https://github.com/alpheios-project/xslt/blob/master/alpheios.xsl).

# References
  * [Plugin Code Map](http://alpheios.net/content/alpheios-firefox-plugins#codemap)
  * [User Guide](http://alpheios.net/content/lexicons-grammars-and-inflections)
  * [Tutorial](http://alpheios.net/alpheios-demos/inflection.htm)

