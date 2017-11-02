import * as Lib from "../../lib/lib";
import TuftsLatinData from './lang/latin';
import TuftsGreekData from './lang/greek';
import * as TestWords from '../../tests/data/test-data';

class TuftsAdapter {
    constructor() {
        // Register importers
        this[Lib.languages.latin] = TuftsLatinData;
        this[Lib.languages.greek] = TuftsGreekData;
        this.langMap = new Lib.Importer().map('lat', Lib.languages.latin).map('grc', Lib.languages.greek);
        return this;
    }

    // Not implemented yet
    async fetch(lang, word) {
    }

    /**
     * Returns an emulated morphological analyzer's output in a JSON format.
     * This function is async to match fetch().
     * @param lang - A language code of a word requested (not needed; used to match a fetch() signature).
     * @param word - A word whose data needs to be retrieved.
     * @return {Promise.<void> | undefined} - A promise resolved with a parsed JSON object representing a word info,
     * undefined if word data is not found, or a promise rejected with an error message.
     */
    async fetchTestData(lang, word) {
        if (!this.testWordData) {
            this.testWordData = new TestWords.WordTestData();
        }
        let json = this.testWordData.get(word);
        if (json) {
            return JSON.parse(this.testWordData.get(word));
        }
        else {
            // No data is found for this word
            return undefined
        }
    }

    /**
     * A function that maps a morphological service's specific data types and values into an inflection library standard.
     * @param {object} jsonObj - A JSON data from a Morphological Analyzer.
     * @returns {Homonym} A library standard Homonym object.
     */
    transform (jsonObj) {
        "use strict";
        let lexemes = [];
        let annotationBody = jsonObj.RDF.Annotation.Body;
        if (!Array.isArray(annotationBody)) {
            /*
            If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
            Let's convert it to an array so we can work with it in the same way no matter what format it is.
             */
            annotationBody = [annotationBody];
        }
        for (let lexeme of annotationBody) {
            // Get importer based on the language
            let language = this.langMap.get(lexeme.rest.entry.dict.hdwd.lang);
            let lemma = new Lib.Lemma(lexeme.rest.entry.dict.hdwd.$, language);

            let inflections = [];
            let inflectionsJSON = lexeme.rest.entry.infl;
            if (!Array.isArray(inflectionsJSON)) {
                // If only one inflection returned, it is a single object, not an array of objects. Convert it to an array for uniformity.
                inflectionsJSON = [inflectionsJSON];
            }
            for (let inflectionJSON of inflectionsJSON) {
                let inflection = new Lib.Inflection(inflectionJSON.term.stem.$, language);
                if (inflectionJSON.term.suff) {
                    // Set suffix if provided by a morphological analyzer
                    inflection.suffix = inflectionJSON.term.suff.$;
                }

                // Parse whatever grammatical features we're interested in
                if (inflectionJSON.pofs) {
                    inflection.feature = this[language][Lib.types.part].get(inflectionJSON.pofs.$);
                }

                if (inflectionJSON.case) {
                    inflection.feature = this[language][Lib.types.grmCase].get(inflectionJSON.case.$);
                }

                if (inflectionJSON.decl) {
                    inflection.feature = this[language][Lib.types.declension].get(inflectionJSON.decl.$);
                }

                if (inflectionJSON.num) {
                    inflection.feature = this[language][Lib.types.number].get(inflectionJSON.num.$);
                }

                if (inflectionJSON.gend) {
                    inflection.feature = this[language][Lib.types.gender].get(inflectionJSON.gend.$);
                }

                if (inflectionJSON.conj) {
                    inflection.feature = this[language][Lib.types.conjugation].get(inflectionJSON.conj.$);
                }

                if (inflectionJSON.tense) {
                    inflection.feature = this[language][Lib.types.tense].get(inflectionJSON.tense.$);
                }

                if (inflectionJSON.voice) {
                    inflection.feature = this[language][Lib.types.voice].get(inflectionJSON.voice.$);
                }

                if (inflectionJSON.mood) {
                    inflection.feature = this[language][Lib.types.mood].get(inflectionJSON.mood.$);
                }

                if (inflectionJSON.pers) {
                    inflection.feature = this[language][Lib.types.person].get(inflectionJSON.pers.$);
                }

                inflections.push(inflection);
            }
            lexemes.push(new Lib.Lexeme(lemma, inflections));
        }
        return new Lib.Homonym(lexemes);
    }

    async getHomonym(lang, word) {
        let jsonObj = await this.fetch(lang, word);
        if (jsonObj) {
            let homonym = this.transform(jsonObj);
            homonym.targetWord = word;
            return homonym;
        }
        else {
            // No data found for this word
            return undefined;
        }
    }
}

export default TuftsAdapter;