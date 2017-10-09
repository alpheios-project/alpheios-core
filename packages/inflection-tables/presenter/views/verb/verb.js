import * as Lib from "../../../lib/lib.js";
import * as View from "../../lib/view.js";
export {tenses, numbers, persons, voices, conjugations, moods}

/*
Please see VIEWS.md for a description of view options and GroupingFeature class declaration for details of
GroupingFeature options.
*/

let tenses = new View.GroupingFeature(
    Lib.types.tense,
    ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect'],
    Lib.languages.latin,
    'Tense');

let numbers = new View.GroupingFeature(
    Lib.types.number,
    ['singular', 'plural'],
    Lib.languages.latin,
    'Number');

let persons = new View.GroupingFeature(
    Lib.types.person,
    ['first', 'second', 'third'],
    Lib.languages.latin,
    'Person');

let voices = new View.GroupingFeature(
    Lib.types.voice,
    ['active', 'passive'],
    Lib.languages.latin,
    'Voice');

let conjugations = new View.GroupingFeature(
    Lib.types.conjugation,
    ['first', 'second', 'third', 'fourth'],
    Lib.languages.latin,
    'Conjugation Stem');

let moods = new View.GroupingFeature(
    Lib.types.mood,
    ['indicative', 'subjunctive'],
    Lib.languages.latin,
    'Mood');