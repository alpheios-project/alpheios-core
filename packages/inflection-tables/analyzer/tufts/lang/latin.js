import * as Alpheios from "../../../lib/lib.js";
import * as Service from "../../analyzer.js";
import * as Latin from '../../../lib/lang/latin/latin.js';
export {data};

let data = new Service.LanguageData(Alpheios.languages.latin);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, alpheiosValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(Alpheios.types.part)
    .add('noun', Latin.parts.noun);

data.addFeature(Alpheios.types.grmCase)
    .add('nominative', Latin.cases.nominative)
    .add('genetive', Latin.cases.genitive)
    .add('dative', Latin.cases.dative)
    .add('accusative', Latin.cases.accusative)
    .add('ablative', Latin.cases.ablative)
    .add('locative', Latin.cases.locative)
    .add('vocative', Latin.cases.vocative);

data.addFeature(Alpheios.types.declension)
    .add('1st', Latin.declensions.first)
    .add('2nd', Latin.declensions.second)
    .add('3rd', Latin.declensions.third)
    .add('4th', Latin.declensions.fourth)
    .add('5th', Latin.declensions.fifth);

data.addFeature(Alpheios.types.number)
    .add('singular', Latin.numbers.singular)
    .add('plural', Latin.numbers.plural);

data.addFeature(Alpheios.types.gender)
    .add('masculine', Latin.genders.masculine)
    .add('feminine', Latin.genders.feminine)
    .add('neuter', Latin.genders.neuter)
    .add('common', [Latin.genders.masculine, Latin.genders.feminine]);
