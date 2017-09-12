import * as Lib from "../../lib/lib.js";
import {Service} from "../analyzer.js";


import * as TuftsLatin from './lang/latin.js';

export {adapter};

let maService = new Service('Tufts');
// Set a language conversion map for this specific service
maService.languages.importer.map('lat', Lib.languages.latin);
// Load Latin language data for this specific service
maService.setLanguageData(TuftsLatin.data);

let adapter = {};

/**
 * A function that maps a morphological service's specific data types and values into an inflection library standard.
 * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
 * @returns {Homonym} A library standard Homonym object.
 */
adapter.transform = function(jsonObj) {
    "use strict";
    let lexemes = [];
    for (let lexeme of jsonObj.RDF.Annotation.Body) {
        let lemma = new Lib.Lemma(lexeme.rest.entry.dict.hdwd.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));

        let inflections = [];
        let inflectionsJSON = lexeme.rest.entry.infl;
        if (!Array.isArray(inflectionsJSON)) {
            // Inflection is a single object, not an array of objects. Convert it to an array for uniformity.
            inflectionsJSON = [inflectionsJSON];
        }
        for (let inflectionJSON of inflectionsJSON) {
            let inflection = new Lib.Inflection(inflectionJSON.term.stem.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));
            if (inflectionJSON.term.suff) {
                // Set suffix if provided by a morphological analyzer
                inflection.suffix = inflectionJSON.term.suff.$;
            }
            inflection.feature = maService.latin[Lib.types.part].get(inflectionJSON.pofs.$);
            inflection.feature = maService.latin[Lib.types.grmCase].get(inflectionJSON.case.$);
            inflection.feature = maService.latin[Lib.types.declension].get(inflectionJSON.decl.$);
            inflection.feature = maService.latin[Lib.types.number].get(inflectionJSON.num.$);
            inflection.feature = maService.latin[Lib.types.gender].get(inflectionJSON.gend.$);
            inflections.push(inflection);
        }
        lexemes.push(new Lib.Lexeme(lemma, inflections));
    }
    return new Lib.Homonym(lexemes);
};