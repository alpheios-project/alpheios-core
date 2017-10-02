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
    let annotationBody = jsonObj.RDF.Annotation.Body;
    if (!Array.isArray(annotationBody)) {
        /*
        If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
        Let's convert it to an array so we can work with it in a uniformal way.
         */
        annotationBody = [annotationBody];
    }
    for (let lexeme of annotationBody) {
        let lemma = new Lib.Lemma(lexeme.rest.entry.dict.hdwd.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));

        let inflections = [];
        let inflectionsJSON = lexeme.rest.entry.infl;
        if (!Array.isArray(inflectionsJSON)) {
            // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
            inflectionsJSON = [inflectionsJSON];
        }
        for (let inflectionJSON of inflectionsJSON) {
            let inflection = new Lib.Inflection(inflectionJSON.term.stem.$, maService.languages.importer.get(lexeme.rest.entry.dict.hdwd.lang));
            if (inflectionJSON.term.suff) {
                // Set suffix if provided by a morphological analyzer
                inflection.suffix = inflectionJSON.term.suff.$;
            }

            // Parse whatever grammatical features we're interested in
            if (inflectionJSON.pofs) {
                inflection.feature = maService.latin[Lib.types.part].get(inflectionJSON.pofs.$);
            }

            if (inflectionJSON.case) {
                inflection.feature = maService.latin[Lib.types.grmCase].get(inflectionJSON.case.$);
            }

            if (inflectionJSON.decl) {
                inflection.feature = maService.latin[Lib.types.declension].get(inflectionJSON.decl.$);
            }

            if (inflectionJSON.num) {
                inflection.feature = maService.latin[Lib.types.number].get(inflectionJSON.num.$);
            }

            if (inflectionJSON.gend) {
                inflection.feature = maService.latin[Lib.types.gender].get(inflectionJSON.gend.$);
            }

            if (inflectionJSON.conj) {
                inflection.feature = maService.latin[Lib.types.conjugation].get(inflectionJSON.conj.$);
            }

            if (inflectionJSON.tense) {
                inflection.feature = maService.latin[Lib.types.tense].get(inflectionJSON.tense.$);
            }

            if (inflectionJSON.voice) {
                inflection.feature = maService.latin[Lib.types.voice].get(inflectionJSON.voice.$);
            }

            if (inflectionJSON.mood) {
                inflection.feature = maService.latin[Lib.types.mood].get(inflectionJSON.mood.$);
            }

            if (inflectionJSON.pers) {
                inflection.feature = maService.latin[Lib.types.person].get(inflectionJSON.pers.$);
            }

            inflections.push(inflection);
        }
        lexemes.push(new Lib.Lexeme(lemma, inflections));
    }
    return new Lib.Homonym(lexemes);
};