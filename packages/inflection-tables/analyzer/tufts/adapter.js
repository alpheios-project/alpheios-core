import * as Alpheios from "../../lib/lib.js";
import {Service} from "../analyzer.js";


import * as TuftsLatin from './lang/latin.js';

export {transform};

let maService = new Service('Tufts');
// Set a language conversion map for this specific service
maService.languages.add('lat', Alpheios.languages.latin);
// Load Latin language data for this specific service
maService.setLanguageData(TuftsLatin.data);


let transform = function(jsonObj) {
    "use strict";
    let lexemes = [];
    for (let lexeme of jsonObj.RDF.Annotation.Body) {
        let lemma = new Alpheios.Lemma(lexeme.rest.entry.dict.hdwd.$, maService.languages.getFrom(lexeme.rest.entry.dict.hdwd.lang));
        let inflections = [];
        for (let data of lexeme.rest.entry.infl) {
            let inflection = new Alpheios.Inflection(data.term.stem.$, data.term.suff.$, maService.languages.getFrom(lexeme.rest.entry.dict.hdwd.lang));
            inflection.feature = maService.latin[Alpheios.types.part].get(data.pofs.$);
            inflection.feature = maService.latin[Alpheios.types.grmCase].get(data.case.$);
            inflection.feature = maService.latin[Alpheios.types.declension].get(data.decl.$);
            inflection.feature = maService.latin[Alpheios.types.number].get(data.num.$);
            inflection.feature = maService.latin[Alpheios.types.gender].get(data.gend.$);
            inflections.push(inflection);
        }
        lexemes.push(new Alpheios.Lexeme(lemma, inflections));
    }
    return new Alpheios.Homonym(lexemes);
};