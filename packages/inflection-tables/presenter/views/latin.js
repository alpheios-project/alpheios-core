import * as Lib from "../../lib/lib";
import * as Latin from "../../lib/lang/latin/latin";
import * as View from "../lib/view";

class LatinView extends View.View {
    constructor() {
        super();
        this.language = Lib.languages.latin;

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
        this.features = {
            numbers: new View.GroupFeatureType(Latin.numbers, 'Number'),
            cases: new View.GroupFeatureType(Latin.cases, 'Case'),
            declensions: new View.GroupFeatureType(Latin.declensions, 'Declension'),
            genders: new View.GroupFeatureType(Latin.genders, 'Gender'),
            types: new View.GroupFeatureType(Latin.types, 'Type')
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
        features.columns = [Latin.declensions, Latin.genders, Latin.types];
        features.rows = [Latin.numbers, Latin.cases];
        features.columnRowTitles = [Latin.cases];
        features.fullWidthRowTitles = [Latin.numbers];
    }
}

class NounView extends LatinView {
    constructor() {
        super();
        this.id = 'nounDeclension';
        this.name = 'noun declension';
        this.title = 'Noun declension';
        this.partOfSpeech = Latin.parts.noun.value;

        // Features that are different from base class values
        this.features.genders = new View.GroupFeatureType(Latin.genders, 'Gender',
            [[Latin.genders.masculine, Latin.genders.feminine], Latin.genders.neuter]);

        this.createTable();
    }
}

class AdjectiveView extends LatinView {
    constructor() {
        super();
        this.id = 'adjectiveDeclension';
        this.name = 'adjective declension';
        this.title = 'Adjective declension';
        this.partOfSpeech = Latin.parts.adjective.value;

        // Features that are different from base class values
        this.features.declensions = new View.GroupFeatureType(Latin.declensions, 'Declension',
            [Latin.declensions.first, Latin.declensions.second, Latin.declensions.third]);

        this.createTable();
    }
}

class VerbView extends LatinView {
    constructor() {
        super();
        this.partOfSpeech = Latin.parts.verb.value;

        this.features = {
            tenses: new View.GroupFeatureType(Latin.tenses, 'Tenses'),
            numbers: new View.GroupFeatureType(Latin.numbers, 'Number'),
            persons: new View.GroupFeatureType(Latin.persons, 'Person'),
            voices: new View.GroupFeatureType(Latin.voices, 'Voice'),
            conjugations: new View.GroupFeatureType(Latin.conjugations, 'Conjugation Stem'),
            moods: new View.GroupFeatureType(Latin.moods, 'Mood')
        };
    }
}

class VoiceConjugationMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceConjugationMood';
        this.name = 'verb voice-conjugation-mood';
        this.title = 'Voice-Conjugation-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.voices, this.features.conjugations, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.voices, Latin.conjugations, Latin.moods];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

class VoiceMoodConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbVoiceMoodConjugation';
        this.name = 'verb voice-mood-conjugation';
        this.title = 'Voice-Mood-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.voices, this.features.moods, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.voices, Latin.moods, Latin.conjugations];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

class ConjugationVoiceMoodView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationVoiceMood';
        this.name = 'verb conjugation-voice-mood';
        this.title = 'Conjugation-Voice-Mood';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.conjugations, this.features.voices, this.features.moods,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.conjugations, Latin.voices, Latin.moods];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

class ConjugationMoodVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbConjugationMoodVoice';
        this.name = 'verb conjugation-mood-voice';
        this.title = 'Conjugation-Mood-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.conjugations, this.features.moods, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.conjugations, Latin.moods, Latin.voices];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

class MoodVoiceConjugationView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodVoiceConjugation';
        this.name = 'verb mood-voice-conjugation';
        this.title = 'Mood-Voice-Conjugation';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.moods, this.features.voices, this.features.conjugations,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.moods, Latin.voices, Latin.conjugations];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

class MoodConjugationVoiceView extends VerbView {
    constructor() {
        super();
        this.id = 'verbMoodConjugationVoice';
        this.name = 'verb mood-conjugation-voice';
        this.title = 'Mood-Conjugation-Voice';

        this.createTable();
    }

    createTable() {
        this.table = new View.Table([this.features.moods, this.features.conjugations, this.features.voices,
            this.features.tenses, this.features.numbers, this.features.persons]);
        let features = this.table.features;
        features.columns = [Latin.moods, Latin.conjugations, Latin.voices];
        features.rows = [Latin.tenses, Latin.numbers, Latin.persons];
        features.columnRowTitles = [Latin.numbers, Latin.persons];
        features.fullWidthRowTitles = [Latin.tenses];
    }
}

export default [new NounView(), new AdjectiveView(),
    // Verbs
    new VoiceConjugationMoodView(), new VoiceMoodConjugationView(), new ConjugationVoiceMoodView(),
    new ConjugationMoodVoiceView(), new MoodVoiceConjugationView(), new MoodConjugationVoiceView()];