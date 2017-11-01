import LanguageModel from './language_model.js';

/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {

    /**
     * Initializes a feature list.
     * @param {FeatureType[]} features - Features that build the list (optional, can be set later).
     */
    constructor(features = []) {
        this._features = [];
        this._types = {};
        this.add(features);
    }

    add(features) {
        if (!features || !Array.isArray(features)) {
            throw new Error('Features must be defined and must come in an array.');
        }

        for (let feature of features) {
            this._features.push(feature);
            this._types[feature.type] = feature;
        }
    }


    /**
     * Returns an array of grouping features.
     * @returns {FeatureType[]} - An array of grouping features.
     */
    get items() {
        return this._features;
    }

    forEach(callback) {
        this._features.forEach(callback);
    }

    /**
     * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
     */
    ofType(type) {
        if (this.hasType(type)) {
            return this._types[type];
        }
    }

    /**
     * Checks whether a feature list has a feature of a specific type.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {boolean} Whether a feature list has a feature of a particular type.
     */
    hasType(type) {
        return this._types.hasOwnProperty(type);
    }
}
export default FeatureList;
