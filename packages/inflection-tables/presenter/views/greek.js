import * as Lib from "../../lib/lib";
import * as Greek from "../../lib/lang/greek/greek";
import * as View from "../lib/view";

class GreekView extends View.View {
    constructor() {
        super();
        this.language = Lib.languages.greek;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new View.GroupFeatureType(Greek.numbers, 'Number'),
            cases: new View.GroupFeatureType(Greek.cases, 'Case'),
            declensions: new View.GroupFeatureType(Greek.declensions, 'Declension'),
            genders: new View.GroupFeatureType(Greek.genders, 'Gender'),
            types: new View.GroupFeatureType(Greek.types, 'Type')
        };
    }

    /**
     * Creates and initializes an inflection table. Redefine this method in child objects in order to create
     * an inflection table differently.
     */
    createTable() {
        this.table = new View.Table([this.features.declensions, this.features.genders,
            this.features.types, this.features.numbers, this.features.cases]);
        let features = this.table.features;
        features.columns = [Greek.declensions, Greek.genders, Greek.types];
        features.rows = [Greek.numbers, Greek.cases];
        features.columnRowTitles = [Greek.cases];
        features.fullWidthRowTitles = [Greek.numbers];
    }
}

class NounView extends GreekView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = Greek.parts.noun.value;

        // Features that are different from base class values
        /*this.features.genders = new View.GroupFeatureType(Greek.genders, 'Gender',
            [[Greek.genders.masculine, Greek.genders.feminine], Greek.genders.neuter]);*/

        this.createTable();
    }
}

export default [new NounView()];