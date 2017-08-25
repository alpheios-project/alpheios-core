/**
 * This module is responsible for displaying different views of an inflection table. Each view is located in a separate
 * directory under /presenter/views/view-name
 */
import * as NounDeclension from "./views/noun-declension/noun-declension.js";
export {render};


let render = function render(resultSet) {
    "use strict";

    return NounDeclension.render(resultSet);
};