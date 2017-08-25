# Views
Views are located inside `/presenter/views/` directory, each view within its own subdirectory such as `/presenter/views/noun-declension`, where `Noun Declension` is the name of the view.

Each view has the following files:
 * `view-name.js` - a business logic of the view. Contains functions that are required to format ResultSet data into a matrix that will be used to populate a view template
 * `view-name.hbs` - a Handlebars.js template for a view
 * `view-name.css` - CSS rules that are required for a specific view

 An additional file within `/presenter/views/` directory, `views.js`, contains compiled templates of all view modules. This file is the one that is loaded into a web page that displays inflection tables. To compile templates, run `npm run buildtemplates` from the root directory of a project.