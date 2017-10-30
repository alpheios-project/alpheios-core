import Cupidinibus from './latin_noun_cupidinibus.json';
import Mare from './latin_noun_adj_mare.json';
import Cepit from './latin_verb_cepit.json';
import Pilsopo from './greek_noun_pilsopo.json';
export {WordTestData};

class WordTestData {
    constructor() {
        this._words = {
            'cupidinibus': Cupidinibus,
            'mare': Mare,
            'cepit': Cepit,
            'φιλόσοφος': Pilsopo
        }
    }

    get(word) {
        if (this._words.hasOwnProperty(word)) {
            return this._words[word];
        }
        throw new Error(`Word "${word}" does not exist in test data`);
    }
}