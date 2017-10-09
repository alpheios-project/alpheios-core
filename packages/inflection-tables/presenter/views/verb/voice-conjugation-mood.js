import * as LibLatin from "../../../lib/lang/latin/latin.js";
import * as Verb from "./verb";

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses = Verb.tenses.clone().setRowGroupType().setRowGroupTitleLocation();
let numbers = Verb.numbers.clone().setRowGroupType().setColumnGroupTitleLocation();
let persons = Verb.persons.clone().setRowGroupType().setColumnGroupTitleLocation();
let voices = Verb.voices.clone().setColumnGroupType().setRowGroupTitleLocation();
let conjugations = Verb.conjugations.clone().setColumnGroupType().setRowGroupTitleLocation();
let moods = Verb.moods.clone().setColumnGroupType().setRowGroupTitleLocation();

let viewOptions = {
    id: 'verbVoiceConjugationMood',
    name: 'verb voice-conjugation-mood',
    title: 'Voice-Conjugation-Mood',
    partOfSpeech: LibLatin.parts.verb.value,
    groupingFeatures: [voices, conjugations, moods, tenses, numbers, persons]
};

export default viewOptions;