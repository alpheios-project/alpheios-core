'use strict';
// Import shared language data
import * as Alpheios from "./lib.js"
// Export for testing
export {langData};

console.log('Inflections start');

// Load Latin language data
import * as ModuleNS from './lang/latin.js';
Alpheios.inflections[ModuleNS.language] = ModuleNS.dataSet;
let langData = Alpheios.inflections[ModuleNS.language];
console.log("Latin data are ", langData);
let results = langData.getEndings(ModuleNS.types.irregular);
console.log('Results are ', results);

console.log('Inflections finish');