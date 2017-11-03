import Lemma from './lemma.js';
import Inflection from './inflection.js';

/**
 * A basic unit of lexical meaning. Contains a Lemma object and one or more Inflection objects.
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     * @param {string} meaning - a short definition
     */
    constructor(lemma, inflections, meaning="") {
        if (!lemma) {
            throw new Error('Lemma should not be empty.');
        }

        if (!(lemma instanceof Lemma)) {
            throw new Error('Lemma should be of Lemma object type.');
        }

        if (!inflections) {
            throw new Error('Inflections data should not be empty.');
        }

        if (!Array.isArray(inflections)) {
            throw new Error('Inflection data should be provided in an array.');
        }

        for (let inflection of inflections) {
            if (!(inflection instanceof Inflection)) {
                throw new Error('All inflection data should be of Inflection object type.');
            }
        }

        this.lemma = lemma;
        this.inflections = inflections;
        this.meaning = meaning;
    }

    static readObject(jsonObject) {
        let lemma = Lemma.readObject(jsonObject.lemma);
        let inflections = [];
        for (let inflection of jsonObject.inflections) {
            inflections.push(Inflection.readObject(inflection));
        }
        return new Lexeme(lemma, inflections);
    }
}
export default Lexeme;
