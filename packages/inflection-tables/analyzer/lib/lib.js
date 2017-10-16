/*
Objects of a morphology analyzer's library
 */
import * as Lib from "../../lib/lib";
export {ImportData};

/**
 * Holds all information required to transform from morphological analyzer's grammatical feature values to the
 * library standards. There is one ImportData object per language.
 */
class ImportData {
    /**
     * Creates an InmportData object for the language provided.
     * @param {string} language - A language of the import data.
     */
    constructor(language) {
        "use strict";
        this.language = language;
    }

    /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
    addFeature(featureName) {
        this[featureName] = {};
        let language = this.language;

        this[featureName].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[featureName].get = function get(providerValue) {
            "use strict";
            if (!this.importer.has(providerValue)) {
                throw new Error("Skipping an unknown value '"
                    + providerValue + "' of a grammatical feature '" + featureName + "' of " + language + " language.");
            }
            else {
                return this.importer.get(providerValue);
            }

        };

        this[featureName].importer = new Lib.Importer();

        return this[featureName];
    }
}