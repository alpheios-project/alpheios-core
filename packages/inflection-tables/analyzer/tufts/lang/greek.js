import * as Lib from "../../../lib/lib";
import * as Analyzer from "../../lib/lib";
import * as Greek from '../../../lib/lang/greek/greek';

let data = new Analyzer.ImportData(Lib.languages.greek);

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */
data.addFeature(Lib.types.part).importer
    .map('noun', Greek.parts.noun);

data.addFeature(Lib.types.grmCase).importer
    .map('nominative', Greek.cases.nominative)
    .map('genitive', Greek.cases.genitive)
    .map('dative', Greek.cases.dative)
    .map('accusative', Greek.cases.accusative)
    .map('vocative', Greek.cases.vocative);

data.addFeature(Lib.types.declension).importer
    .map('1st', Greek.declensions.first)
    .map('2nd', Greek.declensions.second)
    .map('3rd', Greek.declensions.third);

data.addFeature(Lib.types.number).importer
    .map('singular', Greek.numbers.singular)
    .map('dual', Greek.numbers.dual)
    .map('plural', Greek.numbers.plural);

data.addFeature(Lib.types.gender).importer
    .map('masculine', Greek.genders.masculine)
    .map('feminine', Greek.genders.feminine)
    .map('neuter', Greek.genders.neuter)
    .map('masculine feminine', [Greek.genders.masculine, Greek.genders.feminine]);

export default data;
