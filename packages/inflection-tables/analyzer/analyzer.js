/*
 Definition of objects that are passed between morphology analysis adapters and inflection tables library
 */
export {Service, LanguageData};

class Service {
    constructor(name) {
        "use strict";

        this.name = name;

        this.languages = {
            add(providerValue, alpheiosValue) {
                "use strict";
                this[providerValue] = alpheiosValue;
            },

            getFrom(providerValue) {
                "use strict";
                return this[providerValue];
            }
        }
    }

    setLanguageData(data) {
        "use strict";

        data.serviceName = this.name;

        data.getFeatureFrom = function (providerType, providerValue) {
            "use strict";
            if (!this[providerType]) {
                console.warn("Skipping an unknown grammatical feature '" + providerType + "' for " + this.language + " language of " +
                    data.serviceName + ' morphological service');
            }
            else if (!this[providerType][providerValue]) {
                console.warn("Skipping an unknown value '" + providerValue + "' of a grammatical feature '" + providerType + "' for " + this.language + " language of " +
                    data.serviceName + ' morphological service');
            }
            else {
                return this[providerType][providerValue];
            }
        };

        this[data.language] = data;
    }
}

class LanguageData {
    constructor(language) {
        "use strict";
        this.language = language;
    }

    addFeature(name) {
        this[name] = {};
        let language = this.language;
        let serviceName = this.serviceName; // TODO: not defined when object is created

        this[name].add = function add(providerValue, alpheiosValue) {
            "use strict";
            this[providerValue] = alpheiosValue;
            return this;
        };

        this[name].get = function get(providerValue) {
            "use strict";
            if (!this[providerValue]) {
                console.warn("Skipping an unknown value '" + providerValue + "' of a grammatical feature '" + name + "' of " + language + " language of " +
                    serviceName + ' morphological service');
            }
            else {
                return this[providerValue];
            }

        };

        return this[name];
    }
}