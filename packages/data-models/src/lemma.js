/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
    /**
     * Initializes a Lemma object.
     * @param {string} word - A word.
     * @param {string} language - A language of a word.
     */
    constructor(word, language) {

        if (!word) {
            throw new Error('Word should not be empty.');
        }

        if (!language) {
            throw new Error('Langauge should not be empty.');
        }

        //if (!languages.isAllowed(language)) {
        //    throw new Error('Language "' + language + '" is not supported.');
        //}

        this.word = word;
        this.language = language;
    }

    static readObject(jsonObject) {
        return new Lemma(jsonObject.word, jsonObject.language);
    }
}
export default Lemma;
