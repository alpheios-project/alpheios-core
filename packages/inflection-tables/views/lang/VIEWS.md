# Views
Views (or, to be more precise, view definitions) are located inside `/presenter/views/` directory, within subdirectories 
grouped by part of speech. If there is only one view for a part of speech, there will be a single file that defines a view. 
Some parts of speech, such as verbs, could have multiple views. In this case in the `verbs` subdirectory there will
be multiple files; each file will define a separate view.

View files define view options. Those options are used to create a View object and build an inflection table. 

All views share the same template parts that are stored in `/presenter/templates` directory. CSS file(s) are stored
in `/presenter/styles`.

# View options
View options define the following:
* `id`: a view id is used in an HTML selector and other places where a view should be uniquely identified.
* `name`: a view name that will appear in an HTML view selector.
* `title`: a title that will be shown within a generated view representation.
* `groupingFeatures`: defines an order of grouping features that will be used to build a view tree. This sets
how a view table will be structured into rows and columns.