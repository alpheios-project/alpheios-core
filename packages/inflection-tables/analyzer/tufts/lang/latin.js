import * as Lib from "../../../lib/lib.js";
import * as Service from "../../analyzer.js";
import * as Latin from '../../../lib/lang/latin/latin.js';
export {data};

let data = new Service.LanguageData(Lib.languages.latin);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(Lib.types.part).importer
    .map('noun', Latin.parts.noun);

data.addFeature(Lib.types.grmCase).importer
    .map('nominative', Latin.cases.nominative)
    .map('genetive', Latin.cases.genitive)
    .map('dative', Latin.cases.dative)
    .map('accusative', Latin.cases.accusative)
    .map('ablative', Latin.cases.ablative)
    .map('locative', Latin.cases.locative)
    .map('vocative', Latin.cases.vocative);

data.addFeature(Lib.types.declension).importer
    .map('1st', Latin.declensions.first)
    .map('2nd', Latin.declensions.second)
    .map('3rd', Latin.declensions.third)
    .map('4th', Latin.declensions.fourth)
    .map('5th', Latin.declensions.fifth);

data.addFeature(Lib.types.number).importer
    .map('singular', Latin.numbers.singular)
    .map('plural', Latin.numbers.plural);

data.addFeature(Lib.types.gender).importer
    .map('masculine', Latin.genders.masculine)
    .map('feminine', Latin.genders.feminine)
    .map('neuter', Latin.genders.neuter)
    .map('common', [Latin.genders.masculine, Latin.genders.feminine]);
