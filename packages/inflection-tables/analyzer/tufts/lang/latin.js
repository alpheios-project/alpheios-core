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
    .map('noun', Latin.parts.noun)
    .map('adjective', Latin.parts.adjective)
    .map('verb', Latin.parts.verb);

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

data.addFeature(Lib.types.conjugation).importer
    .map('1st', Latin.conjugations.first)
    .map('2nd', Latin.conjugations.second)
    .map('3rd', Latin.conjugations.third)
    .map('4th', Latin.conjugations.fourth);

data.addFeature(Lib.types.tense).importer
    .map('present', Latin.tenses.present)
    .map('imperfect', Latin.tenses.imperfect)
    .map('future', Latin.tenses.future)
    .map('perfect', Latin.tenses.perfect)
    .map('pluperfect', Latin.tenses.pluperfect)
    .map('future_perfect', Latin.tenses['future perfect']);

data.addFeature(Lib.types.voice).importer
    .map('active', Latin.voices.active)
    .map('passive', Latin.voices.passive);

data.addFeature(Lib.types.mood).importer
    .map('indicative', Latin.moods.indicative)
    .map('subjunctive', Latin.moods.subjunctive);

data.addFeature(Lib.types.person).importer
    .map('1st', Latin.persons.first)
    .map('2nd', Latin.persons.second)
    .map('3rd', Latin.persons.third);
