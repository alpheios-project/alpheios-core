/*
Objects of a morphology analyzer's library
 */
import * as Lib from "../../lib/lib";
export {ImportData};

class ImportData {
    constructor(language) {
        "use strict";
        this.language = language;
    }

    addFeature(name) {
        this[name] = {};
        let language = this.language;

        this[name].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[name].get = function get(providerValue) {
            "use strict";
            if (!this.importer.has(providerValue)) {
                throw new Error("Skipping an unknown value '"
                    + providerValue + "' of a grammatical feature '" + name + "' of " + language + " language.");
            }
            else {
                return this.importer.get(providerValue);
            }

        };

        this[name].importer = new Lib.Importer();

        return this[name];
    }
}