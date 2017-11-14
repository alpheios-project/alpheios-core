(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/* eslint-disable no-unused-vars */
const LANG_UNIT_WORD = Symbol('word');
const LANG_UNIT_CHAR = Symbol('char');
const LANG_DIR_LTR = Symbol('ltr');
const LANG_DIR_RTL = Symbol('rtl');
const LANG_LATIN = Symbol('latin');
const LANG_GREEK = Symbol('greek');
const LANG_ARABIC = Symbol('arabic');
const LANG_PERSIAN = Symbol('persian');
const STR_LANG_CODE_LAT = 'lat';
const STR_LANG_CODE_LA = 'la';
const STR_LANG_CODE_GRC = 'grc';
const STR_LANG_CODE_ARA = 'ara';
const STR_LANG_CODE_AR = 'ar';
const STR_LANG_CODE_FAR = 'far';
const STR_LANG_CODE_PER = 'per';
// parts of speech
const POFS_ADJECTIVE = 'adjective';
const POFS_ADVERB = 'adverb';
const POFS_ADVERBIAL = 'adverbial';
const POFS_ARTICLE = 'article';
const POFS_CONJUNCTION = 'conjunction';
const POFS_EXCLAMATION = 'exclamation';
const POFS_INTERJECTION = 'interjection';
const POFS_NOUN = 'noun';
const POFS_NUMERAL = 'numeral';
const POFS_PARTICLE = 'particle';
const POFS_PREFIX = 'prefix';
const POFS_PREPOSITION = 'preposition';
const POFS_PRONOUN = 'pronoun';
const POFS_SUFFIX = 'suffix';
const POFS_SUPINE = 'supine';
const POFS_VERB = 'verb';
const POFS_VERB_PARTICIPLE = 'verb participle';
// gender
const GEND_MASCULINE = 'masculine';
const GEND_FEMININE = 'feminine';
const GEND_NEUTER = 'neuter';
const GEND_COMMON = 'common';
const GEND_ANIMATE = 'animate';
const GEND_INANIMATE = 'inanimate';
// Polish gender types
const GEND_PERSONAL_MASCULINE = 'personal masculine';
const GEND_ANIMATE_MASCULINE = 'animate masculine';
const GEND_INANIMATE_MASCULINE = 'inanimate masculine';
// comparative
const COMP_POSITIVE = 'positive';
const COMP_COMPARITIVE = 'comparative';
const COMP_SUPERLATIVE = 'superlative';
// case
const CASE_ABESSIVE = 'abessive';
const CASE_ABLATIVE = 'ablative';
const CASE_ABSOLUTIVE = 'absolutive';
const CASE_ACCUSATIVE = 'accusative';
const CASE_ADDIRECTIVE = 'addirective';
const CASE_ADELATIVE = 'adelative';
const CASE_ADESSIVE = 'adessive';
const CASE_ADVERBIAL = 'adverbial';
const CASE_ALLATIVE = 'allative';
const CASE_ANTESSIVE = 'antessive';
const CASE_APUDESSIVE = 'apudessive';
const CASE_AVERSIVE = 'aversive';
const CASE_BENEFACTIVE = 'benefactive';
const CASE_CARITIVE = 'caritive';
const CASE_CAUSAL = 'causal';
const CASE_CAUSAL_FINAL = 'causal-final';
const CASE_COMITATIVE = 'comitative';
const CASE_DATIVE = 'dative';
const CASE_DELATIVE = 'delative';
const CASE_DIRECT = 'direct';
const CASE_DISTRIBUTIVE = 'distributive';
const CASE_DISTRIBUTIVE_TEMPORAL = 'distributive-temporal';
const CASE_ELATIVE = 'elative';
const CASE_ERGATIVE = 'ergative';
const CASE_ESSIVE = 'essive';
const CASE_ESSIVE_FORMAL = 'essive-formal';
const CASE_ESSIVE_MODAL = 'essive-modal';
const CASE_EQUATIVE = 'equative';
const CASE_EVITATIVE = 'evitative';
const CASE_EXESSIVE = 'exessive';
const CASE_FINAL = 'final';
const CASE_FORMAL = 'formal';
const CASE_GENITIVE = 'genitive';
const CASE_ILLATIVE = 'illative';
const CASE_INELATIVE = 'inelative';
const CASE_INESSIVE = 'inessive';
const CASE_INSTRUCTIVE = 'instructive';
const CASE_INSTRUMENTAL = 'instrumental';
const CASE_INSTRUMENTAL_COMITATIVE = 'instrumental-comitative';
const CASE_INTRANSITIVE = 'intransitive';
const CASE_LATIVE = 'lative';
const CASE_LOCATIVE = 'locative';
const CASE_MODAL = 'modal';
const CASE_MULTIPLICATIVE = 'multiplicative';
const CASE_NOMINATIVE = 'nominative';
const CASE_PARTITIVE = 'partitive';
const CASE_PEGATIVE = 'pegative';
const CASE_PERLATIVE = 'perlative';
const CASE_POSSESSIVE = 'possessive';
const CASE_POSTELATIVE = 'postelative';
const CASE_POSTDIRECTIVE = 'postdirective';
const CASE_POSTESSIVE = 'postessive';
const CASE_POSTPOSITIONAL = 'postpositional';
const CASE_PREPOSITIONAL = 'prepositional';
const CASE_PRIVATIVE = 'privative';
const CASE_PROLATIVE = 'prolative';
const CASE_PROSECUTIVE = 'prosecutive';
const CASE_PROXIMATIVE = 'proximative';
const CASE_SEPARATIVE = 'separative';
const CASE_SOCIATIVE = 'sociative';
const CASE_SUBDIRECTIVE = 'subdirective';
const CASE_SUBESSIVE = 'subessive';
const CASE_SUBELATIVE = 'subelative';
const CASE_SUBLATIVE = 'sublative';
const CASE_SUPERDIRECTIVE = 'superdirective';
const CASE_SUPERESSIVE = 'superessive';
const CASE_SUPERLATIVE = 'superlative';
const CASE_SUPPRESSIVE = 'suppressive';
const CASE_TEMPORAL = 'temporal';
const CASE_TERMINATIVE = 'terminative';
const CASE_TRANSLATIVE = 'translative';
const CASE_VIALIS = 'vialis';
const CASE_VOCATIVE = 'vocative';
const MOOD_ADMIRATIVE = 'admirative';
const MOOD_COHORTATIVE = 'cohortative';
const MOOD_CONDITIONAL = 'conditional';
const MOOD_DECLARATIVE = 'declarative';
const MOOD_DUBITATIVE = 'dubitative';
const MOOD_ENERGETIC = 'energetic';
const MOOD_EVENTIVE = 'eventive';
const MOOD_GENERIC = 'generic';
const MOOD_GERUNDIVE = 'gerundive';
const MOOD_HYPOTHETICAL = 'hypothetical';
const MOOD_IMPERATIVE = 'imperative';
const MOOD_INDICATIVE = 'indicative';
const MOOD_INFERENTIAL = 'inferential';
const MOOD_INFINITIVE = 'infinitive';
const MOOD_INTERROGATIVE = 'interrogative';
const MOOD_JUSSIVE = 'jussive';
const MOOD_NEGATIVE = 'negative';
const MOOD_OPTATIVE = 'optative';
const MOOD_PARTICIPLE = 'participle';
const MOOD_PRESUMPTIVE = 'presumptive';
const MOOD_RENARRATIVE = 'renarrative';
const MOOD_SUBJUNCTIVE = 'subjunctive';
const MOOD_SUPINE = 'supine';
const NUM_SINGULAR = 'singular';
const NUM_PLURAL = 'plural';
const NUM_DUAL = 'dual';
const NUM_TRIAL = 'trial';
const NUM_PAUCAL = 'paucal';
const NUM_SINGULATIVE = 'singulative';
const NUM_COLLECTIVE = 'collective';
const NUM_DISTRIBUTIVE_PLURAL = 'distributive plural';
const NRL_CARDINAL = 'cardinal';
const NRL_ORDINAL = 'ordinal';
const NRL_DISTRIBUTIVE = 'distributive';
const NURL_NUMERAL_ADVERB = 'numeral adverb';
const ORD_1ST = '1st';
const ORD_2ND = '2nd';
const ORD_3RD = '3rd';
const ORD_4TH = '4th';
const ORD_5TH = '5th';
const ORD_6TH = '6th';
const ORD_7TH = '7th';
const ORD_8TH = '8th';
const ORD_9TH = '9th';
const TENSE_AORIST = 'aorist';
const TENSE_FUTURE = 'future';
const TENSE_FUTURE_PERFECT = 'future perfect';
const TENSE_IMPERFECT = 'imperfect';
const TENSE_PAST_ABSOLUTE = 'past absolute';
const TENSE_PERFECT = 'perfect';
const TENSE_PLUPERFECT = 'pluperfect';
const TENSE_PRESENT = 'present';
const VKIND_TO_BE = 'to be';
const VKIND_COMPOUNDS_OF_TO_BE = 'compounds of to be';
const VKIND_TAKING_ABLATIVE = 'taking ablative';
const VKIND_TAKING_DATIVE = 'taking dative';
const VKIND_TAKING_GENITIVE = 'taking genitive';
const VKIND_TRANSITIVE = 'transitive';
const VKIND_INTRANSITIVE = 'intransitive';
const VKIND_IMPERSONAL = 'impersonal';
const VKIND_DEPONENT = 'deponent';
const VKIND_SEMIDEPONENT = 'semideponent';
const VKIND_PERFECT_DEFINITE = 'perfect definite';
const VOICE_ACTIVE = 'active';
const VOICE_PASSIVE = 'passive';
const VOICE_MEDIOPASSIVE = 'mediopassive';
const VOICE_IMPERSONAL_PASSIVE = 'impersonal passive';
const VOICE_MIDDLE = 'middle';
const VOICE_ANTIPASSIVE = 'antipassive';
const VOICE_REFLEXIVE = 'reflexive';
const VOICE_RECIPROCAL = 'reciprocal';
const VOICE_CAUSATIVE = 'causative';
const VOICE_ADJUTATIVE = 'adjutative';
const VOICE_APPLICATIVE = 'applicative';
const VOICE_CIRCUMSTANTIAL = 'circumstantial';
const VOICE_DEPONENT = 'deponent';
const TYPE_IRREGULAR = 'irregular';
const TYPE_REGULAR = 'regular';
/* eslit-enable no-unused-vars */


var constants = Object.freeze({
	LANG_UNIT_WORD: LANG_UNIT_WORD,
	LANG_UNIT_CHAR: LANG_UNIT_CHAR,
	LANG_DIR_LTR: LANG_DIR_LTR,
	LANG_DIR_RTL: LANG_DIR_RTL,
	LANG_LATIN: LANG_LATIN,
	LANG_GREEK: LANG_GREEK,
	LANG_ARABIC: LANG_ARABIC,
	LANG_PERSIAN: LANG_PERSIAN,
	STR_LANG_CODE_LAT: STR_LANG_CODE_LAT,
	STR_LANG_CODE_LA: STR_LANG_CODE_LA,
	STR_LANG_CODE_GRC: STR_LANG_CODE_GRC,
	STR_LANG_CODE_ARA: STR_LANG_CODE_ARA,
	STR_LANG_CODE_AR: STR_LANG_CODE_AR,
	STR_LANG_CODE_FAR: STR_LANG_CODE_FAR,
	STR_LANG_CODE_PER: STR_LANG_CODE_PER,
	POFS_ADJECTIVE: POFS_ADJECTIVE,
	POFS_ADVERB: POFS_ADVERB,
	POFS_ADVERBIAL: POFS_ADVERBIAL,
	POFS_ARTICLE: POFS_ARTICLE,
	POFS_CONJUNCTION: POFS_CONJUNCTION,
	POFS_EXCLAMATION: POFS_EXCLAMATION,
	POFS_INTERJECTION: POFS_INTERJECTION,
	POFS_NOUN: POFS_NOUN,
	POFS_NUMERAL: POFS_NUMERAL,
	POFS_PARTICLE: POFS_PARTICLE,
	POFS_PREFIX: POFS_PREFIX,
	POFS_PREPOSITION: POFS_PREPOSITION,
	POFS_PRONOUN: POFS_PRONOUN,
	POFS_SUFFIX: POFS_SUFFIX,
	POFS_SUPINE: POFS_SUPINE,
	POFS_VERB: POFS_VERB,
	POFS_VERB_PARTICIPLE: POFS_VERB_PARTICIPLE,
	GEND_MASCULINE: GEND_MASCULINE,
	GEND_FEMININE: GEND_FEMININE,
	GEND_NEUTER: GEND_NEUTER,
	GEND_COMMON: GEND_COMMON,
	GEND_ANIMATE: GEND_ANIMATE,
	GEND_INANIMATE: GEND_INANIMATE,
	GEND_PERSONAL_MASCULINE: GEND_PERSONAL_MASCULINE,
	GEND_ANIMATE_MASCULINE: GEND_ANIMATE_MASCULINE,
	GEND_INANIMATE_MASCULINE: GEND_INANIMATE_MASCULINE,
	COMP_POSITIVE: COMP_POSITIVE,
	COMP_COMPARITIVE: COMP_COMPARITIVE,
	COMP_SUPERLATIVE: COMP_SUPERLATIVE,
	CASE_ABESSIVE: CASE_ABESSIVE,
	CASE_ABLATIVE: CASE_ABLATIVE,
	CASE_ABSOLUTIVE: CASE_ABSOLUTIVE,
	CASE_ACCUSATIVE: CASE_ACCUSATIVE,
	CASE_ADDIRECTIVE: CASE_ADDIRECTIVE,
	CASE_ADELATIVE: CASE_ADELATIVE,
	CASE_ADESSIVE: CASE_ADESSIVE,
	CASE_ADVERBIAL: CASE_ADVERBIAL,
	CASE_ALLATIVE: CASE_ALLATIVE,
	CASE_ANTESSIVE: CASE_ANTESSIVE,
	CASE_APUDESSIVE: CASE_APUDESSIVE,
	CASE_AVERSIVE: CASE_AVERSIVE,
	CASE_BENEFACTIVE: CASE_BENEFACTIVE,
	CASE_CARITIVE: CASE_CARITIVE,
	CASE_CAUSAL: CASE_CAUSAL,
	CASE_CAUSAL_FINAL: CASE_CAUSAL_FINAL,
	CASE_COMITATIVE: CASE_COMITATIVE,
	CASE_DATIVE: CASE_DATIVE,
	CASE_DELATIVE: CASE_DELATIVE,
	CASE_DIRECT: CASE_DIRECT,
	CASE_DISTRIBUTIVE: CASE_DISTRIBUTIVE,
	CASE_DISTRIBUTIVE_TEMPORAL: CASE_DISTRIBUTIVE_TEMPORAL,
	CASE_ELATIVE: CASE_ELATIVE,
	CASE_ERGATIVE: CASE_ERGATIVE,
	CASE_ESSIVE: CASE_ESSIVE,
	CASE_ESSIVE_FORMAL: CASE_ESSIVE_FORMAL,
	CASE_ESSIVE_MODAL: CASE_ESSIVE_MODAL,
	CASE_EQUATIVE: CASE_EQUATIVE,
	CASE_EVITATIVE: CASE_EVITATIVE,
	CASE_EXESSIVE: CASE_EXESSIVE,
	CASE_FINAL: CASE_FINAL,
	CASE_FORMAL: CASE_FORMAL,
	CASE_GENITIVE: CASE_GENITIVE,
	CASE_ILLATIVE: CASE_ILLATIVE,
	CASE_INELATIVE: CASE_INELATIVE,
	CASE_INESSIVE: CASE_INESSIVE,
	CASE_INSTRUCTIVE: CASE_INSTRUCTIVE,
	CASE_INSTRUMENTAL: CASE_INSTRUMENTAL,
	CASE_INSTRUMENTAL_COMITATIVE: CASE_INSTRUMENTAL_COMITATIVE,
	CASE_INTRANSITIVE: CASE_INTRANSITIVE,
	CASE_LATIVE: CASE_LATIVE,
	CASE_LOCATIVE: CASE_LOCATIVE,
	CASE_MODAL: CASE_MODAL,
	CASE_MULTIPLICATIVE: CASE_MULTIPLICATIVE,
	CASE_NOMINATIVE: CASE_NOMINATIVE,
	CASE_PARTITIVE: CASE_PARTITIVE,
	CASE_PEGATIVE: CASE_PEGATIVE,
	CASE_PERLATIVE: CASE_PERLATIVE,
	CASE_POSSESSIVE: CASE_POSSESSIVE,
	CASE_POSTELATIVE: CASE_POSTELATIVE,
	CASE_POSTDIRECTIVE: CASE_POSTDIRECTIVE,
	CASE_POSTESSIVE: CASE_POSTESSIVE,
	CASE_POSTPOSITIONAL: CASE_POSTPOSITIONAL,
	CASE_PREPOSITIONAL: CASE_PREPOSITIONAL,
	CASE_PRIVATIVE: CASE_PRIVATIVE,
	CASE_PROLATIVE: CASE_PROLATIVE,
	CASE_PROSECUTIVE: CASE_PROSECUTIVE,
	CASE_PROXIMATIVE: CASE_PROXIMATIVE,
	CASE_SEPARATIVE: CASE_SEPARATIVE,
	CASE_SOCIATIVE: CASE_SOCIATIVE,
	CASE_SUBDIRECTIVE: CASE_SUBDIRECTIVE,
	CASE_SUBESSIVE: CASE_SUBESSIVE,
	CASE_SUBELATIVE: CASE_SUBELATIVE,
	CASE_SUBLATIVE: CASE_SUBLATIVE,
	CASE_SUPERDIRECTIVE: CASE_SUPERDIRECTIVE,
	CASE_SUPERESSIVE: CASE_SUPERESSIVE,
	CASE_SUPERLATIVE: CASE_SUPERLATIVE,
	CASE_SUPPRESSIVE: CASE_SUPPRESSIVE,
	CASE_TEMPORAL: CASE_TEMPORAL,
	CASE_TERMINATIVE: CASE_TERMINATIVE,
	CASE_TRANSLATIVE: CASE_TRANSLATIVE,
	CASE_VIALIS: CASE_VIALIS,
	CASE_VOCATIVE: CASE_VOCATIVE,
	MOOD_ADMIRATIVE: MOOD_ADMIRATIVE,
	MOOD_COHORTATIVE: MOOD_COHORTATIVE,
	MOOD_CONDITIONAL: MOOD_CONDITIONAL,
	MOOD_DECLARATIVE: MOOD_DECLARATIVE,
	MOOD_DUBITATIVE: MOOD_DUBITATIVE,
	MOOD_ENERGETIC: MOOD_ENERGETIC,
	MOOD_EVENTIVE: MOOD_EVENTIVE,
	MOOD_GENERIC: MOOD_GENERIC,
	MOOD_GERUNDIVE: MOOD_GERUNDIVE,
	MOOD_HYPOTHETICAL: MOOD_HYPOTHETICAL,
	MOOD_IMPERATIVE: MOOD_IMPERATIVE,
	MOOD_INDICATIVE: MOOD_INDICATIVE,
	MOOD_INFERENTIAL: MOOD_INFERENTIAL,
	MOOD_INFINITIVE: MOOD_INFINITIVE,
	MOOD_INTERROGATIVE: MOOD_INTERROGATIVE,
	MOOD_JUSSIVE: MOOD_JUSSIVE,
	MOOD_NEGATIVE: MOOD_NEGATIVE,
	MOOD_OPTATIVE: MOOD_OPTATIVE,
	MOOD_PARTICIPLE: MOOD_PARTICIPLE,
	MOOD_PRESUMPTIVE: MOOD_PRESUMPTIVE,
	MOOD_RENARRATIVE: MOOD_RENARRATIVE,
	MOOD_SUBJUNCTIVE: MOOD_SUBJUNCTIVE,
	MOOD_SUPINE: MOOD_SUPINE,
	NUM_SINGULAR: NUM_SINGULAR,
	NUM_PLURAL: NUM_PLURAL,
	NUM_DUAL: NUM_DUAL,
	NUM_TRIAL: NUM_TRIAL,
	NUM_PAUCAL: NUM_PAUCAL,
	NUM_SINGULATIVE: NUM_SINGULATIVE,
	NUM_COLLECTIVE: NUM_COLLECTIVE,
	NUM_DISTRIBUTIVE_PLURAL: NUM_DISTRIBUTIVE_PLURAL,
	NRL_CARDINAL: NRL_CARDINAL,
	NRL_ORDINAL: NRL_ORDINAL,
	NRL_DISTRIBUTIVE: NRL_DISTRIBUTIVE,
	NURL_NUMERAL_ADVERB: NURL_NUMERAL_ADVERB,
	ORD_1ST: ORD_1ST,
	ORD_2ND: ORD_2ND,
	ORD_3RD: ORD_3RD,
	ORD_4TH: ORD_4TH,
	ORD_5TH: ORD_5TH,
	ORD_6TH: ORD_6TH,
	ORD_7TH: ORD_7TH,
	ORD_8TH: ORD_8TH,
	ORD_9TH: ORD_9TH,
	TENSE_AORIST: TENSE_AORIST,
	TENSE_FUTURE: TENSE_FUTURE,
	TENSE_FUTURE_PERFECT: TENSE_FUTURE_PERFECT,
	TENSE_IMPERFECT: TENSE_IMPERFECT,
	TENSE_PAST_ABSOLUTE: TENSE_PAST_ABSOLUTE,
	TENSE_PERFECT: TENSE_PERFECT,
	TENSE_PLUPERFECT: TENSE_PLUPERFECT,
	TENSE_PRESENT: TENSE_PRESENT,
	VKIND_TO_BE: VKIND_TO_BE,
	VKIND_COMPOUNDS_OF_TO_BE: VKIND_COMPOUNDS_OF_TO_BE,
	VKIND_TAKING_ABLATIVE: VKIND_TAKING_ABLATIVE,
	VKIND_TAKING_DATIVE: VKIND_TAKING_DATIVE,
	VKIND_TAKING_GENITIVE: VKIND_TAKING_GENITIVE,
	VKIND_TRANSITIVE: VKIND_TRANSITIVE,
	VKIND_INTRANSITIVE: VKIND_INTRANSITIVE,
	VKIND_IMPERSONAL: VKIND_IMPERSONAL,
	VKIND_DEPONENT: VKIND_DEPONENT,
	VKIND_SEMIDEPONENT: VKIND_SEMIDEPONENT,
	VKIND_PERFECT_DEFINITE: VKIND_PERFECT_DEFINITE,
	VOICE_ACTIVE: VOICE_ACTIVE,
	VOICE_PASSIVE: VOICE_PASSIVE,
	VOICE_MEDIOPASSIVE: VOICE_MEDIOPASSIVE,
	VOICE_IMPERSONAL_PASSIVE: VOICE_IMPERSONAL_PASSIVE,
	VOICE_MIDDLE: VOICE_MIDDLE,
	VOICE_ANTIPASSIVE: VOICE_ANTIPASSIVE,
	VOICE_REFLEXIVE: VOICE_REFLEXIVE,
	VOICE_RECIPROCAL: VOICE_RECIPROCAL,
	VOICE_CAUSATIVE: VOICE_CAUSATIVE,
	VOICE_ADJUTATIVE: VOICE_ADJUTATIVE,
	VOICE_APPLICATIVE: VOICE_APPLICATIVE,
	VOICE_CIRCUMSTANTIAL: VOICE_CIRCUMSTANTIAL,
	VOICE_DEPONENT: VOICE_DEPONENT,
	TYPE_IRREGULAR: TYPE_IRREGULAR,
	TYPE_REGULAR: TYPE_REGULAR
});

/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {
    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
  constructor (value, type, language) {
    if (!Feature.types.isAllowed(type)) {
      throw new Error('Features of "' + type + '" type are not supported.')
    }
    if (!value) {
      throw new Error('Feature should have a non-empty value.')
    }
    if (!type) {
      throw new Error('Feature should have a non-empty type.')
    }
    if (!language) {
      throw new Error('Feature constructor requires a language')
    }
    this.value = value;
    this.type = type;
    this.language = language;
  };

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && this.language === feature.language;
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      });
      return equal
    } else {
      return this.value === feature.value && this.type === feature.type && this.language === feature.language
    }
  }
}
// Should have no spaces in values in order to be used in HTML templates
Feature.types = {
  word: 'word',
  part: 'part of speech', // Part of speech
  number: 'number',
  grmCase: 'case',
  declension: 'declension',
  gender: 'gender',
  type: 'type',
  conjugation: 'conjugation',
  comparison: 'comparison',
  tense: 'tense',
  voice: 'voice',
  mood: 'mood',
  person: 'person',
  frequency: 'frequency', // How frequent this word is
  meaning: 'meaning', // Meaning of a word
  source: 'source', // Source of word definition
  footnote: 'footnote', // A footnote for a word's ending
  dialect: 'dialect', // a dialect iderntifier
  note: 'note', // a general note
  pronunciation: 'pronunciation',
  area: 'area',
  geo: 'geo', // geographical data
  kind: 'kind', // verb kind informatin
  derivtype: 'derivtype',
  stemtype: 'stemtype',
  morph: 'morph', // general morphological information
  var: 'var', // variance?
  isAllowed (value) {
    let v = `${value}`;
    return Object.values(this).includes(v)
  }
};

class FeatureImporter {
  constructor (defaults = []) {
    this.hash = {};
    for (let value of defaults) {
      this.map(value, value);
    }
    return this
  }

    /**
     * Sets mapping between external imported value and one or more library standard values. If an importedValue
     * is already in a hash table, old libraryValue will be overwritten with the new one.
     * @param {string} importedValue - External value
     * @param {Object | Object[] | string | string[]} libraryValue - Library standard value
     */
  map (importedValue, libraryValue) {
    if (!importedValue) {
      throw new Error('Imported value should not be empty.')
    }

    if (!libraryValue) {
      throw new Error('Library value should not be empty.')
    }

    this.hash[importedValue] = libraryValue;
    return this
  }

    /**
     * Checks if value is in a map.
     * @param {string} importedValue - A value to test.
     * @returns {boolean} - Tru if value is in a map, false otherwise.
     */
  has (importedValue) {
    return this.hash.hasOwnProperty(importedValue)
  }

    /**
     * Returns one or more library standard values that match an external value
     * @param {string} importedValue - External value
     * @returns {Object | string} One or more of library standard values
     */
  get (importedValue) {
    if (this.has(importedValue)) {
      return this.hash[importedValue]
    } else {
      throw new Error('A value "' + importedValue + '" is not found in the importer.')
    }
  }
}

/**
 * Definition class for a (grammatical) feature. Stores type information and (optionally) all possible values of the feature.
 * It serves as a feature generator. If list of possible values is provided, it can generate a Feature object
 * each time a property that corresponds to a feature value is accessed. If no list of possible values provided,
 * a Feature object can be generated with get(value) method.
 *
 * An order of values determines a default sort and grouping order. If two values should have the same order,
 * they should be grouped within an array: value1, [value2, value3], value4. Here 'value2' and 'value3' have
 * the same priority for sorting and grouping.
 */
class FeatureType {
    // TODO: value checking
    /**
     * Creates and initializes a Feature Type object.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string[] | string[][]} values - A list of allowed values for this feature type.
     * If an empty array is provided, there will be no
     * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
     * such as footnotes).
     * @param {string} language - A language of a feature, allowed values are specified in 'languages' object.
     */
  constructor (type, values, language) {
    if (!Feature.types.isAllowed(type)) {
      throw new Error('Features of "' + type + '" type are not supported.')
    }
    if (!values || !Array.isArray(values)) {
      throw new Error('Values should be an array (or an empty array) of values.')
    }
    if (!language) {
      throw new Error('FeatureType constructor requires a language')
    }

    this.type = type;
    this.language = language;

        /*
         This is a sort order index for a grammatical feature values. It is determined by the order of values in
         a 'values' array.
         */
    this._orderIndex = [];
    this._orderLookup = {};

    for (const [index, value] of values.entries()) {
      this._orderIndex.push(value);
      if (Array.isArray(value)) {
        for (let element of value) {
          this[element] = new Feature(element, this.type, this.language);
          this._orderLookup[element] = index;
        }
      } else {
        this[value] = new Feature(value, this.type, this.language);
        this._orderLookup[value] = index;
      }
    }
  };

    /**
     * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
     * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
     * @param value
     * @returns {Feature}
     */
  get (value) {
    if (value) {
      return new Feature(value, this.type, this.language)
    } else {
      throw new Error('A non-empty value should be provided.')
    }
  }

  getFromImporter (importerName, value) {
    let mapped;
    try {
      mapped = this.importer[importerName].get(value);
    } catch (e) {
      // quietly catch not found and replace with default
      mapped = this.get(value);
    }
    return mapped
  }

    /**
     * Creates and returns a new importer with a specific name. If an importer with this name already exists,
     * an existing Importer object will be returned.
     * @param {string} name - A name of an importer object
     * @returns {Importer} A new or existing Importer object that matches a name provided
     */
  addImporter (name) {
    if (!name) {
      throw new Error('Importer should have a non-empty name.')
    }
    this.importer = this.importer || {};
    this.importer[name] = this.importer[name] || new FeatureImporter();
    return this.importer[name]
  }

    /**
     * Return copies of all feature values as Feature objects in a sorted array, according to feature type's sort order.
     * For a similar function that returns strings instead of Feature objects see orderedValues().
     * @returns {Feature[] | Feature[][]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of Feature objects will be returned instead of a single Feature object, as for single feature values.
     */
  get orderedFeatures () {
    return this.orderedValues.map((value) => new Feature(value, this.type, this.language))
  }

    /**
     * Return all feature values as strings in a sorted array, according to feature type's sort order.
     * This is a main method that specifies a sort order of the feature type. orderedFeatures() relies
     * on this method in providing a sorted array of feature values. If you want to create
     * a custom sort order for a particular feature type that will depend on some options that are not type-related,
     * create a wrapper around this function providing it with options arguments so it will be able to decide
     * in what order those features will be based on those arguments.
     * For a similar function that returns Feature objects instead of strings see orderedValues().
     * @returns {string[]} Array of feature values sorted according to orderIndex.
     * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
     * an array of strings will be returned instead of a single strings, as for single feature values.
     */
  get orderedValues () {
    return this._orderIndex
  }

    /**
     * Returns a lookup table for type values as:
     *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
     *  their order value will be the same.
     * @returns {object}
     */
  get orderLookup () {
    return this._orderLookup
  }

    /**
     * Sets an order of grammatical feature values for a grammatical feature. Used mostly for sorting, filtering,
     * and displaying.
     *
     * @param {Feature[] | Feature[][]} values - a list of grammatical features that specify their order for
     * sorting and filtering. Some features can be grouped as [[genders.masculine, genders.feminine], LibLatin.genders.neuter].
     * It means that genders.masculine and genders.feminine belong to the same group. They will have the same index
     * and will be stored inside an _orderIndex as an array. genders.masculine and genders.feminine will be grouped together
     * during filtering and will be in the same bin during sorting.
     *
     */
  set order (values) {
    if (!values || (Array.isArray(values) && values.length === 0)) {
      throw new Error('A non-empty list of values should be provided.')
    }

        // If a single value is provided, convert it into an array
    if (!Array.isArray(values)) {
      values = [values];
    }

    for (let value of values) {
      if (Array.isArray(value)) {
        for (let element of value) {
          if (!this.hasOwnProperty(element.value)) {
            throw new Error('Trying to order an element with "' + element.value + '" value that is not stored in a "' + this.type + '" type.')
          }

          if (element.type !== this.type) {
            throw new Error('Trying to order an element with type "' + element.type + '" that is different from "' + this.type + '".')
          }

          if (element.language !== this.language) {
            throw new Error('Trying to order an element with language "' + element.language + '" that is different from "' + this.language + '".')
          }
        }
      } else {
        if (!this.hasOwnProperty(value.value)) {
          throw new Error('Trying to order an element with "' + value.value + '" value that is not stored in a "' + this.type + '" type.')
        }

        if (value.type !== this.type) {
          throw new Error('Trying to order an element with type "' + value.type + '" that is different from "' + this.type + '".')
        }

        if (value.language !== this.language) {
          throw new Error('Trying to order an element with language "' + value.language + '" that is different from "' + this.language + '".')
        }
      }
    }

        // Erase whatever sort order was set previously
    this._orderLookup = {};
    this._orderIndex = [];

        // Define a new sort order
    for (const [index, element] of values.entries()) {
      if (Array.isArray(element)) {
                // If it is an array, all values should have the same order
        let elements = [];
        for (const subElement of element) {
          this._orderLookup[subElement.value] = index;
          elements.push(subElement.value);
        }
        this._orderIndex[index] = elements;
      } else {
                // If is a single value
        this._orderLookup[element.value] = index;
        this._orderIndex[index] = element.value;
      }
    }
  }
}

/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {
    /**
     * Initializes a feature list.
     * @param {FeatureType[]} features - Features that build the list (optional, can be set later).
     */
  constructor (features = []) {
    this._features = [];
    this._types = {};
    this.add(features);
  }

  add (features) {
    if (!features || !Array.isArray(features)) {
      throw new Error('Features must be defined and must come in an array.')
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
  get items () {
    return this._features
  }

  forEach (callback) {
    this._features.forEach(callback);
  }

    /**
     * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
     */
  ofType (type) {
    if (this.hasType(type)) {
      return this._types[type]
    }
  }

    /**
     * Checks whether a feature list has a feature of a specific type.
     * @param {string} type - Feature type as defined in `types` object.
     * @return {boolean} Whether a feature list has a feature of a particular type.
     */
  hasType (type) {
    return this._types.hasOwnProperty(type)
  }
}

/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {
   /**
   */
  constructor () {
    this.sourceLanguage = null;
    this.contextForward = 0;
    this.context_backward = 0;
    this.direction = LANG_DIR_LTR;
    this.baseUnit = LANG_UNIT_WORD;
    this.codes = [];
  }

  _initializeFeatures () {
    let features = {};
    let code = this.toCode();
    features[Feature.types.part] = new FeatureType(Feature.types.part,
      [ POFS_ADVERB,
        POFS_ADVERBIAL,
        POFS_ADJECTIVE,
        POFS_ARTICLE,
        POFS_CONJUNCTION,
        POFS_EXCLAMATION,
        POFS_INTERJECTION,
        POFS_NOUN,
        POFS_NUMERAL,
        POFS_PARTICLE,
        POFS_PREFIX,
        POFS_PREPOSITION,
        POFS_PRONOUN,
        POFS_SUFFIX,
        POFS_SUPINE,
        POFS_VERB,
        POFS_VERB_PARTICIPLE ], code);
    features[Feature.types.gender] = new FeatureType(Feature.types.gender,
      [ GEND_MASCULINE, GEND_FEMININE, GEND_NEUTER ], code);
    features[Feature.types.type] = new FeatureType(Feature.types.type,
      [TYPE_REGULAR, TYPE_IRREGULAR], code);
    features[Feature.types.person] = new FeatureType(Feature.types.person,
      [ORD_1ST, ORD_2ND, ORD_3RD], code);
    return features
  }

  /**
   * Handler which can be used as the contextHander.
   * It uses language-specific configuration to identify
   * the elements from the alph-text popup which should produce links
   * to the language-specific grammar.
   * @see #contextHandler
   */
  grammarContext (doc) {
      // used to bind a click handler on the .alph-entry items in the
      // popup which retrieved the context attribute from the clicked
      // term and used that to construct a link and open the grammar
      // at the apporopriate place.
      // var links = this.getGrammarLinks();

      // for (var link_name in links)
      // {
      //   if (links.hasOwnProperty(link_name))
      //    {
              // Alph.$(".alph-entry ." + link_name,a_doc).bind('click',link_name,
              //   function(a_e)
              //    {
                        // build target inside grammar
                        // var target = a_e.data;
                        // var rngContext = Alph.$(this).attr("context");
                        // if (rngContext != null)
                        // {
                        //  target += "-" + rngContext.split(/-/)[0];
                        // }
                        // myobj.openGrammar(a_e.originaEvent,this,target);
               //   }
              // );
       //   }
      // }
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   * @param {string} code the language code
   * @returns true if supported false if not
   * @type Boolean
   */
  static supportsLanguage (code) {
    return this.codes.includes[code]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {string} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  toString () {
    return String(this.sourceLanguage)
  }

  isEqual (model) {
    return this.sourceLanguage === model.sourceLanguage
  }

  toCode () {
    return null
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends LanguageModel {
   /**
   */
  constructor () {
    super();
    this.sourceLanguage = LANG_LATIN;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_LTR;
    this.baseUnit = LANG_UNIT_WORD;
    this.codes = [STR_LANG_CODE_LA, STR_LANG_CODE_LAT];
    this.features = this._initializeFeatures();
  }

  _initializeFeatures () {
    let features = super._initializeFeatures();
    let code = this.toCode();
    features[Feature.types.number] = new FeatureType(Feature.types.number, [NUM_SINGULAR, NUM_PLURAL], code);
    features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [ CASE_NOMINATIVE,
        CASE_GENITIVE,
        CASE_DATIVE,
        CASE_ACCUSATIVE,
        CASE_ABLATIVE,
        CASE_LOCATIVE,
        CASE_VOCATIVE
      ], code);
    features[Feature.types.declension] = new FeatureType(Feature.types.declension,
      [ ORD_1ST, ORD_2ND, ORD_3RD, ORD_4TH, ORD_5TH ], code);
    features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [ TENSE_PRESENT,
        TENSE_IMPERFECT,
        TENSE_FUTURE,
        TENSE_PERFECT,
        TENSE_PLUPERFECT,
        TENSE_FUTURE_PERFECT
      ], code);
    features[Feature.types.voice] = new FeatureType(Feature.types.voice, [VOICE_PASSIVE, VOICE_ACTIVE], code);
    features[Feature.types.mood] = new FeatureType(Feature.types.mood, [MOOD_INDICATIVE, MOOD_SUBJUNCTIVE], code);
    features[Feature.types.conjugation] = new FeatureType(Feature.types.conjugation,
      [ ORD_1ST,
        ORD_2ND,
        ORD_3RD,
        ORD_4TH
      ], code);
    return features
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  toCode () {
    return STR_LANG_CODE_LAT
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super();
    this.sourceLanguage = LANG_GREEK;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_LTR;
    this.baseUnit = LANG_UNIT_WORD;
    this.languageCodes = [STR_LANG_CODE_GRC];
    this.features = this._initializeFeatures();
  }

  _initializeFeatures () {
    let features = super._initializeFeatures();
    let code = this.toCode();
    features[Feature.types.number] = new FeatureType(Feature.types.number, [NUM_SINGULAR, NUM_PLURAL, NUM_DUAL], code);
    features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [ CASE_NOMINATIVE,
        CASE_GENITIVE,
        CASE_DATIVE,
        CASE_ACCUSATIVE,
        CASE_VOCATIVE
      ], code);
    features[Feature.types.declension] = new FeatureType(Feature.types.declension,
      [ ORD_1ST, ORD_2ND, ORD_3RD ], code);
    features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [ TENSE_PRESENT,
        TENSE_IMPERFECT,
        TENSE_FUTURE,
        TENSE_PERFECT,
        TENSE_PLUPERFECT,
        TENSE_FUTURE_PERFECT,
        TENSE_AORIST
      ], code);
    features[Feature.types.voice] = new FeatureType(Feature.types.voice,
      [ VOICE_PASSIVE,
        VOICE_ACTIVE,
        VOICE_MEDIOPASSIVE,
        VOICE_MIDDLE
      ], code);
    features[Feature.types.mood] = new FeatureType(Feature.types.mood,
      [ MOOD_INDICATIVE,
        MOOD_SUBJUNCTIVE,
        MOOD_OPTATIVE,
        MOOD_IMPERATIVE
      ], code);
    // TODO full list of greek dialects
    features[Feature.types.dialect] = new FeatureType(Feature.types.dialect, ['attic', 'epic', 'doric'], code);
    return features
  }

  toCode () {
    return STR_LANG_CODE_GRC
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ArabicLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super();
    this.sourceLanguage = LANG_ARABIC;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_RTL;
    this.baseUnit = LANG_UNIT_WORD;
    this.languageCodes = [STR_LANG_CODE_ARA, STR_LANG_CODE_AR];
    this._initializeFeatures();
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures();
  }

  toCode () {
    return STR_LANG_CODE_ARA
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    // TODO
    return word
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}

const MODELS = new Map([
  [ STR_LANG_CODE_LA, LatinLanguageModel ],
  [ STR_LANG_CODE_LAT, LatinLanguageModel ],
  [ STR_LANG_CODE_GRC, GreekLanguageModel ],
  [ STR_LANG_CODE_ARA, ArabicLanguageModel ],
  [ STR_LANG_CODE_AR, ArabicLanguageModel ]
]);

class LanguageModelFactory {
  static supportsLanguage (code) {
    return MODELS.has(code)
  }

  static getLanguageForCode (code = null) {
    let Model = MODELS.get(code);
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new LanguageModel()
  }
}

/**
 * Lemma, a canonical form of a word.
 */
class Lemma {
    /**
     * Initializes a Lemma object.
     * @param {string} word - A word.
     * @param {string} language - A language of a word.
     */
  constructor (word, language) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!language) {
      throw new Error('Langauge should not be empty.')
    }

        // if (!languages.isAllowed(language)) {
        //    throw new Error('Language "' + language + '" is not supported.');
        // }

    this.word = word;
    this.language = language;
  }

  static readObject (jsonObject) {
    return new Lemma(jsonObject.word, jsonObject.language)
  }
}

/*
 Hierarchical structure of return value of a morphological analyzer:

 Homonym (a group of words that are written the same way, https://en.wikipedia.org/wiki/Homonym)
    Lexeme 1 (a unit of lexical meaning, https://en.wikipedia.org/wiki/Lexeme)
        Have a lemma and one or more inflections
        Lemma (also called a headword, a canonical form of a group of words https://en.wikipedia.org/wiki/Lemma_(morphology) )
        Inflection 1
            Stem
            Suffix (also called ending)
        Inflection 2
            Stem
            Suffix
    Lexeme 2
        Lemma
        Inflection 1
            Stem
            Suffix
 */

/**
 * Represents an inflection of a word
 */
class Inflection {
    /**
     * Initializes an Inflection object.
     * @param {string} stem - A stem of a word.
     * @param {string} language - A word's language.
     */
  constructor (stem, language) {
    if (!stem) {
      throw new Error('Stem should not be empty.')
    }

    if (!language) {
      throw new Error('Langauge should not be empty.')
    }

    if (!LanguageModelFactory.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem;
    this.language = language;

    // Suffix may not be present in every word. If missing, it will set to null.
    this.suffix = null;

    // Prefix may not be present in every word. If missing, it will set to null.
    this.prefix = null;

    // Example may not be provided
    this.example = null;
  }

  static readObject (jsonObject) {
    let inflection = new Inflection(jsonObject.stem, jsonObject.language);
    if (jsonObject.suffix) {
      inflection.suffix = jsonObject.suffix;
    }
    if (jsonObject.prefix) {
      inflection.prefix = jsonObject.prefix;
    }
    if (jsonObject.example) {
      inflection.example = jsonObject.example;
    }
    return inflection
  }

    /**
     * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
     * an array of Feature objects will be provided.
     * Values are taken from features and stored in a 'feature.type' property as an array of values.
     * @param {Feature | Feature[]} data
     */
  set feature (data) {
    if (!data) {
      throw new Error('Inflection feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data];
    }

    let type = data[0].type;
    this[type] = [];
    for (let element of data) {
      if (!(element instanceof Feature)) {
        throw new Error('Inflection feature data must be a Feature object.')
      }

      if (element.language !== this.language) {
        throw new Error('Language "' + element.language + '" of a feature does not match a language "' +
                this.language + '" of an Inflection object.')
      }

      this[type].push(element.value);
    }
  }
}

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
  constructor (lemma, inflections, meaning = '') {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    if (!(lemma instanceof Lemma)) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (let inflection of inflections) {
      if (!(inflection instanceof Inflection)) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    this.lemma = lemma;
    this.inflections = inflections;
    this.meaning = meaning;
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma);
    let inflections = [];
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection));
    }
    return new Lexeme(lemma, inflections)
  }
}

class Homonym {
    /**
     * Initializes a Homonym object.
     * @param {Lexeme[]} lexemes - An array of Lexeme objects.
     * @param {string} form - the form which produces the homonyms
     */
  constructor (lexemes, form) {
    if (!lexemes) {
      throw new Error('Lexemes data should not be empty.')
    }

    if (!Array.isArray(lexemes)) {
      throw new Error('Lexeme data should be provided in an array.')
    }

    for (let lexeme of lexemes) {
      if (!(lexeme instanceof Lexeme)) {
        throw new Error('All lexeme data should be of Lexeme object type.')
      }
    }

    this.lexemes = lexemes;
    this.targetWord = form;
  }

  static readObject (jsonObject) {
    let lexemes = [];
    if (jsonObject.lexemes) {
      for (let lexeme of jsonObject.lexemes) {
        lexemes.push(Lexeme.readObject(lexeme));
      }
    }
    let homonym = new Homonym(lexemes);
    if (jsonObject.targetWord) {
      homonym.targetWord = jsonObject.targetWord;
    }
    return homonym
  }

    /**
     * Returns language of a homonym.
     * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
     * and inflections within the same homonym will have the same language, and we can determine a language
     * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
     * @returns {string} A language code, as defined in the `languages` object.
     */
  get language () {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.language) {
      return this.lexemes[0].lemma.language
    } else {
      throw new Error('Homonym has not been initialized properly. Unable to obtain language information.')
    }
  }
}

/**
 * Shared data structures and functions
 */

const languages = {
  type: 'language',
  latin: 'lat',
  greek: 'grc',
  isAllowed (language) {
    if (language === this.type) {
      return false
    } else {
      return Object.values(this).includes(language)
    }
  }
};

/**
 * Stores inflection language data
 */
class LanguageDataset {
    /**
     * Initializes a LanguageDataset.
     * @param {string} language - A language of a data set, from an allowed languages list (see 'languages' object).
     */
  constructor (language) {
    if (!language) {
            // Language is not supported
      throw new Error('Language data cannot be empty.')
    }

    if (!languages.isAllowed(language)) {
            // Language is not supported
      throw new Error('Language "' + language + '" is not supported.')
    }
    this.language = language;
    this.suffixes = []; // An array of suffixes.
    this.footnotes = []; // Footnotes
  };

    /**
     * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
     * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
     * 'feminine' genders
     *
     * @param {string | null} suffixValue - A text of a suffix. It is either a string or null if there is no suffix.
     * @param {Feature[]} featureValue
     * @return {Suffix} A newly added suffix value (can be used to add more data to the suffix).
     */
  addSuffix (suffixValue, featureValue, extendedLangData) {
        // TODO: implement run-time error checking
    let suffixItem = new Suffix(suffixValue);
    suffixItem.extendedLangData = extendedLangData;

        // Build all possible combinations of features
    let multiValueFeatures = [];

        // Go through all features provided
    for (let feature of featureValue) {
            // If this is a footnote. Footnotes should go in a flat array
            // because we don't need to split by them
      if (feature.type === Feature.types.footnote) {
        suffixItem[Feature.types.footnote] = suffixItem[Feature.types.footnote] || [];
        suffixItem[Feature.types.footnote].push(feature.value);
        continue
      }

            // If this ending has several grammatical feature values then they will be in an array
      if (Array.isArray(feature)) {
        if (feature.length > 0) {
          if (feature[0]) {
            let type = feature[0].type;
                    // Store all multi-value features to create a separate copy of a a Suffix object for each of them
            multiValueFeatures.push({type: type, features: feature});
          } else {
            console.log(feature);
          }
        } else {
                    // Array is empty
          throw new Error('An empty array is provided as a feature argument to the "addSuffix" method.')
        }
      } else {
        suffixItem.features[feature.type] = feature.value;
      }
    }

        // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = suffixItem.split(featureGroup.type, featureGroup.features);
        this.suffixes = this.suffixes.concat(endingItems);
      }
    } else {
      this.suffixes.push(suffixItem);
    }
  };

    /**
     * Stores a footnote item.
     * @param {Feature} partOfSpeech - A part of speech this footnote belongs to
     * @param {number} index - A footnote's index.
     * @param {string} text - A footnote's text.
     */
  addFootnote (partOfSpeech, index, text) {
    if (!index) {
      throw new Error('Footnote index data should not be empty.')
    }

    if (!text) {
      throw new Error('Footnote text data should not be empty.')
    }

    let footnote = new Footnote(index, text, partOfSpeech.value);
    footnote.index = index;

    this.footnotes.push(footnote);
  };

  getSuffixes (homonym) {
        // Add support for languages
    let result = new WordData(homonym);
    let inflections = {};

        // Find partial matches first, and then full among them

        // TODO: do we ever need lemmas?
    for (let lexema of homonym.lexemes) {
      for (let inflection of lexema.inflections) {
                // Group inflections by a part of speech
        let partOfSpeech = inflection[Feature.types.part];
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection.')
        }

        if (!inflections.hasOwnProperty(partOfSpeech)) {
          inflections[partOfSpeech] = [];
        }
        inflections[partOfSpeech].push(inflection);
      }
    }

        // Scan for matches for all parts of speech separately
    for (const partOfSpeech in inflections) {
      if (inflections.hasOwnProperty(partOfSpeech)) {
        let inflectionsGroup = inflections[partOfSpeech];

        result[Feature.types.part].push(partOfSpeech);
        result[partOfSpeech] = {};
        result[partOfSpeech].suffixes = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup), []);
        result[partOfSpeech].footnotes = [];

                // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set();
                // Scan all selected suffixes to build a unique set of footnote indexes
        for (let suffix of result[partOfSpeech].suffixes) {
          if (suffix.hasOwnProperty(Feature.types.footnote)) {
                        // Footnote indexes are stored in an array
            for (let index of suffix[Feature.types.footnote]) {
              footnotesIndex.add(index);
            }
          }
        }
                // Add footnote indexes and their texts to a result
        for (let index of footnotesIndex) {
          let footnote = this.footnotes.find(footnoteElement =>
                        footnoteElement.index === index && footnoteElement[Feature.types.part] === partOfSpeech
                    );
          result[partOfSpeech].footnotes.push({index: index, text: footnote.text});
        }
                // Sort footnotes according to their index numbers
        result[partOfSpeech].footnotes.sort((a, b) => parseInt(a.index) - parseInt(b.index));
      }
    }

    return result
  }

  reducer (inflections, accumulator, suffix) {
    let result = this.matcher(inflections, suffix);
    if (result) {
      accumulator.push(result);
    }
    return accumulator
  }
}

/**
 * Stores one or several language datasets, one for each language
 */
class LanguageData {
    /**
     * Combines several language datasets for different languages. Allows to abstract away language data.
     * This function is chainable.
     * @param {LanguageDataset[]} languageData - Language datasets of different languages.
     * @return {LanguageData} Self instance for chaining.
     */
  constructor (languageData) {
    this.supportedLanguages = [];

    if (languageData) {
      for (let dataset of languageData) {
        this[dataset.language] = dataset;
        this.supportedLanguages.push(dataset.language);
      }
    }
    return this
  }

    /**
     * Loads data for all data sets.
     * This function is chainable.
     * @return {LanguageData} Self instance for chaining.
     */
  loadData () {
    for (let language of this.supportedLanguages) {
      try {
        this[language].loadData();
      } catch (e) {
        console.log(e);
      }
    }
    return this
  }

    /**
     * Finds matching suffixes for a homonym.
     * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
     * @return {WordData} A return value of an inflection query.
     */
  getSuffixes (homonym) {
    let language = homonym.language;
    if (this.supportedLanguages.includes(language)) {
      return this[homonym.language].getSuffixes(homonym)
    } else {
      throw new Error(`"${language}" language data is missing. Unable to get suffix data.`)
    }
  }
}

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Suffix {
    /**
     * Initializes a Suffix object.
     * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
     */
  constructor (suffixValue) {
    if (suffixValue === undefined) {
      throw new Error('Suffix should not be empty.')
    }
    this.value = suffixValue;
    this.features = {};
    this.featureGroups = {};

        /*
        Extended language data stores additional suffix information that is specific for a particular language.
        It uses the following schema:
        {string} language(key): {object} extended language data. This object is specific for each language
        and is defined in a language model.
         */
    this.extendedLangData = {};
    this.match = undefined;
  }

  static readObject (jsonObject) {
    let suffix = new Suffix(jsonObject.value);

    if (jsonObject.features) {
      for (let key in jsonObject.features) {
        if (jsonObject.features.hasOwnProperty(key)) {
          suffix.features[key] = jsonObject.features[key];
        }
      }
    }

    if (jsonObject.featureGroups) {
      for (let key in jsonObject.featureGroups) {
        if (jsonObject.featureGroups.hasOwnProperty(key)) {
          suffix.featureGroups[key] = [];
          for (let value of jsonObject.featureGroups[key]) {
            suffix.featureGroups[key].push(value);
          }
        }
      }
    }

    if (jsonObject[Feature.types.footnote]) {
      suffix[Feature.types.footnote] = [];
      for (let footnote of jsonObject[Feature.types.footnote]) {
        suffix[Feature.types.footnote].push(footnote);
      }
    }

    if (jsonObject.match) {
      suffix.match = MatchData.readObject(jsonObject.match);
    }

    for (const lang in jsonObject.extendedLangData) {
      if (jsonObject.extendedLangData.hasOwnProperty(lang)) {
        suffix.extendedLangData[lang] = ExtendedLanguageData.readObject(jsonObject.extendedLangData[lang]);
      }
    }
    return suffix
  }

    /**
     * Returns a copy of itself. Used in splitting suffixes with multi-value features.
     * @returns {Suffix}
     */
  clone () {
        // TODO: do all-feature two-level cloning
    let clone = new Suffix(this.value);
    for (const key in this.features) {
      if (this.features.hasOwnProperty(key)) {
        clone.features[key] = this.features[key];
      }
    }
    for (const key in this.featureGroups) {
      if (this.featureGroups.hasOwnProperty(key)) {
        clone.featureGroups[key] = this.featureGroups[key];
      }
    }

    if (this.hasOwnProperty(Feature.types.footnote)) {
      clone[Feature.types.footnote] = this[Feature.types.footnote];
    }

    for (const lang in this.extendedLangData) {
      if (this.extendedLangData.hasOwnProperty(lang)) {
        clone.extendedLangData[lang] = this.extendedLangData[lang];
      }
    }
    return clone
  };

    /**
     * Checks if suffix has a feature that is a match to the one provided.
     * @param {string} featureType - Sets a type of a feature we need to match with the ones stored inside the suffix
     * @param {string[]} featureValues - A list of feature values we need to match with the ones stored inside the suffix
     * @returns {string | undefined} - If provided feature is a match, returns a first feature that matched.
     * If no match found, return undefined.
     */
  featureMatch (featureType, featureValues) {
    if (this.features.hasOwnProperty(featureType)) {
      for (let value of featureValues) {
        if (value === this.features[featureType]) {
          return value
        }
      }
    }
    return undefined
  }

    /**
     * Find feature groups in Suffix.featureGroups that are the same between suffixes provided
     * @param suffixes
     */
  static getCommonGroups (suffixes) {
    let features = Object.keys(suffixes[0].featureGroups);

    let commonGroups = features.filter(feature => {
      let result = true;
      for (let i = 1; i < suffixes.length; i++) {
        result = result && suffixes[i].features.hasOwnProperty(feature);
      }
      return result
    });
    return commonGroups
  }

    /**
     * Finds out if an suffix is in the same group with some other suffix. The other suffix is provided as a function argument.
     * Two suffixes are considered to be in the same group if they are:
     * a. Have at least one common group in featureGroups;
     * b. Have the same suffix
     * c. Have values of all features the same except for those that belong to a common group(s)
     * d. Values of the common group features must be complementary. Here is an example:
     * Let's say a 'gender' group can have values such as 'masculine' and 'feminine'. Then suffixes will be combined
     * only if gender value of one suffix is 'masculine' and the other value is 'feminine'. If both suffixes have the same
     * either 'masculine' or 'feminine' value, they sill not be combined as are not being complementary.
     * @param {Suffix} suffix - An other suffix that we compare this suffix with.
     * @returns {boolean} - True if both suffixes are in the same group, false otherwise.
     */
  isInSameGroupWith (suffix) {
    let commonGroups = Suffix.getCommonGroups([this, suffix]);
    if (commonGroups.length < 1) {
            // If elements do not have common groups in Suffix.featureGroups then they are not in the same group
      return false
    }

    let commonValues = {};
    commonGroups.forEach((feature) => { commonValues[feature] = new Set([this.features[feature]]); });

    let result = true;
    result = result && this.value === suffix.value;
        // If suffixes does not match don't check any further
    if (!result) {
      return false
    }

        // Check all features to be a match, except those that are possible group values
    for (let feature of Object.keys(this.features)) {
      if (commonGroups.indexOf(feature) >= 0) {
        commonValues[feature].add(suffix.features[feature]);

                // Do not compare common groups
        continue
      }
      result = result && this.features[feature] === suffix.features[feature];
            // If feature mismatch discovered, do not check any further
      if (!result) {
        return false
      }
    }

    commonGroups.forEach(feature => {
      result = result && commonValues[feature].size === 2;
    });

    return result
  }

    /**
     * Splits a suffix that has multiple values of one or more grammatical features into an array of Suffix objects
     * with each Suffix object having only a single value of those grammatical features. Initial multiple values
     * are stored in a featureGroups[featureType] property as an array of values.
     * @param {string} featureType - A type of a feature
     * @param {Feature[]} featureValues - Multiple grammatical feature values.
     * @returns {Suffix[]} - An array of suffixes.
     */
  split (featureType, featureValues) {
    let copy = this.clone();
    let values = [];
    featureValues.forEach(element => values.push(element.value));
    copy.features[featureType] = featureValues[0].value;
    copy.featureGroups[featureType] = values;
    let suffixItems = [copy];
    for (let i = 1; i < featureValues.length; i++) {
      copy = this.clone();
      copy.features[featureType] = featureValues[i].value;
      copy.featureGroups[featureType] = values;
      suffixItems.push(copy);
    }
    return suffixItems
  };

    /**
     * Combines suffixes that are in the same group together. Suffixes to be combined must have their values listed
     * in an array stored as featureGroups[featureType] property.
     * @param {Suffix[]} suffixes - An array of suffixes to be combined.
     * @param {function} mergeFunction - A function that will merge two suffixes. By default it uses Suffix.merge,
     * but provides a way to supply a presentation specific functions. Please see Suffix.merge for more
     * information on function format.
     * @returns {Suffix[]} An array of suffixes with some items possibly combined together.
     */
  static combine (suffixes, mergeFunction = Suffix.merge) {
    let matchFound = false;
    let matchIdx;

    do {
      matchFound = false;

            /*
            Go through an array of suffixes end compare each suffix with each other (two-way compare) one time. \
            If items are in the same group, merge two suffixes, break out of a loop,
            and remove one matching suffix (the second one) from an array.
            Then repeat on a modified array until no further matches found.
             */
      for (let i = 0; i < suffixes.length; i++) {
        if (matchFound) {
          continue
        }
        for (let j = i + 1; j < suffixes.length; j++) {
          if (suffixes[i].isInSameGroupWith(suffixes[j])) {
            matchIdx = j;
            matchFound = true;
            mergeFunction(suffixes[i], suffixes[j]);
          }
        }
      }

      if (matchFound) {
        suffixes.splice(matchIdx, 1);
      }
    }
    while (matchFound)
    return suffixes
  }

    /**
     * This function provide a logic of to merge data of two suffix object that were previously split together.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
  static merge (suffixA, suffixB) {
    let commonGroups = Suffix.getCommonGroups([suffixA, suffixB]);
    for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
    }
    return suffixA
  };
}

class Footnote {
  constructor (index, text, partOfSpeech) {
    this.index = index;
    this.text = text;
    this[Feature.types.part] = partOfSpeech;
  }

  static readObject (jsonObject) {
    this.index = jsonObject.index;
    this.text = jsonObject.text;
    this[Feature.types.part] = jsonObject[Feature.types.part];
    return new Footnote(jsonObject.index, jsonObject.text, jsonObject[Feature.types.part])
  }
}

/**
 * Detailed information about a match type.
 */
class MatchData {
  constructor () {
    this.suffixMatch = false; // Whether two suffixes are the same.
    this.fullMatch = false; // Whether two suffixes and all grammatical features, including part of speech, are the same.
    this.matchedFeatures = []; // How many features matches each other.
  }

  static readObject (jsonObject) {
    let matchData = new MatchData();
    matchData.suffixMatch = jsonObject.suffixMatch;
    matchData.fullMatch = jsonObject.fullMatch;
    for (let feature of jsonObject.matchedFeatures) {
      matchData.matchedFeatures.push(feature);
    }
    return matchData
  }
}

class ExtendedLanguageData {
  constructor () {
    this._type = undefined; // This is a base class
  }

  static types () {
    return {
      EXTENDED_GREEK_DATA: 'ExtendedGreekData'
    }
  }

  static readObject (jsonObject) {
    if (!jsonObject._type) {
      throw new Error('Extended language data has no type information. Unable to deserialize.')
    } else if (jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
      return ExtendedGreekData.readObject(jsonObject)
    } else {
      throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`)
    }
  }
}

class ExtendedGreekData extends ExtendedLanguageData {
  constructor () {
    super();
    this._type = ExtendedLanguageData.types().EXTENDED_GREEK_DATA; // For deserialization
    this.primary = false;
  }

  static readObject (jsonObject) {
    let data = new ExtendedGreekData();
    data.primary = jsonObject.primary;
    return data
  }

  merge (extendedGreekData) {
    if (this.primary !== extendedGreekData.primary) {
      console.log('Mismatch', this.primary, extendedGreekData.primary);
    }
    let merged = new ExtendedGreekData();
    merged.primary = this.primary;
    return merged
  }
}

/**
 * A return value for inflection queries
 */
class WordData {
  constructor (homonym) {
    this.homonym = homonym;
    this.definition = undefined;
    this[Feature.types.part] = []; // What parts of speech are represented by this object.
  }

  static readObject (jsonObject) {
    let homonym = Homonym.readObject(jsonObject.homonym);

    let wordData = new WordData(homonym);
    wordData.definition = jsonObject.definition;
    wordData[Feature.types.part] = jsonObject[Feature.types.part];

    for (let part of wordData[Feature.types.part]) {
      let partData = jsonObject[part];
      wordData[part] = {};

      if (partData.suffixes) {
        wordData[part].suffixes = [];
        for (let suffix of partData.suffixes) {
          wordData[part].suffixes.push(Suffix.readObject(suffix));
        }
      }

      if (partData.footnotes) {
        wordData[part].footnotes = [];
        for (let footnote of partData.footnotes) {
          wordData[part].footnotes.push(Footnote.readObject(footnote));
        }
      }
    }

    return wordData
  }

  get word () {
    return this.homonym.targetWord
  }

  set word (word) {
    this.homonym.targetWord = word;
  }

  get language () {
    return this.homonym.language
  }
}

let messages$1 = {
  Number: 'Number',
  Case: 'Case',
  Declension: 'Declension',
  Gender: 'Gender',
  Type: 'Type',
  Voice: 'Voice',
  'Conjugation Stem': 'Conjugation Stem',
  Mood: 'Mood',
  Person: 'Person'
};

let messages$2 = {
  Number: 'Number (GB)',
  Case: 'Case (GB)',
  Declension: 'Declension (GB)',
  Gender: 'Gender (GB)',
  Type: 'Type (GB)',
  Voice: 'Voice (GB)',
  'Conjugation Stem': 'Conjugation Stem (GB)',
  Mood: 'Mood (GB)',
  Person: 'Person (GB)'
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

function Compiler$1(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler$1.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler$1.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler$1.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler$1.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler$1.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

var parser = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements,
                    location: location()
                };
            },
        peg$c1 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c2 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText,
                    location: location()
                };
            },
        peg$c3 = /^[^ \t\n\r,.+={}#]/,
        peg$c4 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c5 = "{",
        peg$c6 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c7 = ",",
        peg$c8 = { type: "literal", value: ",", description: "\",\"" },
        peg$c9 = "}",
        peg$c10 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c11 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2],
                    location: location()
                };
            },
        peg$c12 = "number",
        peg$c13 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c14 = "date",
        peg$c15 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c16 = "time",
        peg$c17 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c18 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2],
                    location: location()
                };
            },
        peg$c19 = "plural",
        peg$c20 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c21 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                };
            },
        peg$c22 = "selectordinal",
        peg$c23 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                }
            },
        peg$c25 = "select",
        peg$c26 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c27 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options,
                    location: location()
                };
            },
        peg$c28 = "=",
        peg$c29 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c30 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern,
                    location: location()
                };
            },
        peg$c31 = "offset:",
        peg$c32 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c33 = function(number) {
                return number;
            },
        peg$c34 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options,
                    location: location()
                };
            },
        peg$c35 = { type: "other", description: "whitespace" },
        peg$c36 = /^[ \t\n\r]/,
        peg$c37 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c38 = { type: "other", description: "optionalWhitespace" },
        peg$c39 = /^[0-9]/,
        peg$c40 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c41 = /^[0-9a-f]/i,
        peg$c42 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c43 = "0",
        peg$c44 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c45 = /^[1-9]/,
        peg$c46 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c47 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c49 = { type: "class", value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]" },
        peg$c50 = "\\\\",
        peg$c51 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c52 = function() { return '\\'; },
        peg$c53 = "\\#",
        peg$c54 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c55 = function() { return '\\#'; },
        peg$c56 = "\\{",
        peg$c57 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c58 = function() { return '\u007B'; },
        peg$c59 = "\\}",
        peg$c60 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c61 = function() { return '\u007D'; },
        peg$c62 = "\\u",
        peg$c63 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c64 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c65 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c3.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c4); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c3.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c7;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c9;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c10); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s1 = peg$c14;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c9;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c10); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c30(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c36.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c37); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c39.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c41.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c50) {
          s1 = peg$c50;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c51); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c52();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c53) {
            s1 = peg$c53;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c54); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c56) {
              s1 = peg$c56;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c57); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c58();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c59) {
                s1 = peg$c59;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c60); }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c61();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c62) {
                  s1 = peg$c62;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c63); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                    s2 = input.substring(s2, peg$currPos);
                  } else {
                    s2 = s3;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c64(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c65(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
defineProperty(MessageFormat, '__localeData__', {value: objCreate(null)});
defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
defineProperty(MessageFormat, '__parse', {value: parser.parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new Compiler$1(locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = objCreate(defaults[type]);

        if (formats && hop.call(formats, type)) {
            extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

// GENERATED FILE
var defaultLocale = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

/* jslint esnext: true */

MessageFormat.__addLocaleData(defaultLocale);
MessageFormat.defaultLocale = 'en';

/**
 * Combines messages with the same locale code.
 */
class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   * @param {Object} messages - Messages for a locale in an object. Object keys are message IDss, strings that
   * are used to reference a message, and key values are message texts in a string format.
   */
  constructor (locale, messages) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!messages) {
      throw new Error('Messages data is missing')
    }

    this._locale = locale;

    for (let messageID in messages) {
      if (messages.hasOwnProperty(messageID)) {
        this[messageID] = new MessageFormat(messages[messageID], this._locale);
      }
    }
  }

  /**
   * Returns a (formatted) message for a message ID provided.
   * @param messageID - An ID of a message.
   * @param options - Options that can be used for message formatting.
   * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
   */
  get (messageID, options = undefined) {
    if (this[messageID]) {
      return this[messageID].format(options)
    } else {
      // If message with the ID provided is not in translation data, generate a warning.
      return `Not in translation data: "${messageID}"`
    }
  }

  /**
   * Returns a locale of a current message bundle.
   * @return {string} A locale of this message bundle.
   */
  get locale () {
    return this._locale
  }
}

/**
 * Combines several message bundle for different locales.
 */
class L10n {
  /**
   * Creates an object. If an array of message bundle data is provided, initializes an object with this data.
   * This function is chainable.
   * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
   * @returns {L10n} Returns a reference to self for chaining.
   */
  constructor (messageData) {
    this._locales = {};
    this._localeList = [];

    if (messageData) {
      this.addLocaleData(messageData);
    }
    return this
  }

  /**
   * Adds one or several message bundles.
   * This function is chainable.
   * @param {MessageBundle[]} messageData - An array of message bundles to be stored within.
   * @return {L10n} - Returns self for chaining.
   */
  addLocaleData (messageData) {
    for (let messageBundle of messageData) {
      this._localeList.push(messageBundle.locale);
      this._locales[messageBundle.locale] = messageBundle;
    }
    return this
  }

  /**
   * Returns a message bundle for a locale.
   * @param {string} locale - A locale code for a message bundle. IETF language tag format is recommended.
   * @returns {MessageBundle} A message bundle for a locale.
   */
  messages (locale) {
    if (!this._locales[locale]) {
      throw new Error('Locale "' + locale + '" is not found.')
    }
    return this._locales[locale]
  }

  /**
   * Returns a list of available locale codes.
   * @returns {string[]} Array of local codes.
   */
  get locales () {
    return this._localeList
  }
}

const messages = [
  new MessageBundle('en-US', messages$1),
  new MessageBundle('en-GB', messages$2)
];

let classNames = {
  cell: 'infl-cell',
  widthPrefix: 'infl-cell--sp',
  fullWidth: 'infl-cell--fw',
  header: 'infl-cell--hdr',
  highlight: 'infl-cell--hl',
  hidden: 'hidden',
  suffix: 'infl-suff',
  suffixMatch: 'infl-suff--suffix-match',
  suffixFullFeatureMatch: 'infl-suff--full-feature-match',
  inflectionTable: 'infl-table',
  wideView: 'infl-table--wide',
  narrowViewsContainer: 'infl-table-narrow-views-cont',
  narrowView: 'infl-table--narrow',
  footnotesContainer: 'infl-footnotes'
};

let wideView = {
  column: {
    width: 1,
    unit: 'fr'
  }
};

let narrowView = {
  column: {
    width: 100,
    unit: 'px'
  }
};

let footnotes = {
  id: 'inlection-table-footer'
};

let pageHeader = {
  html: `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `,
  hideEmptyColumnsBtnSel: '#hide-empty-columns',
  showEmptyColumnsBtnSel: '#show-empty-columns',
  hideNoSuffixGroupsBtnSel: '#hide-no-suffix-groups',
  showNoSuffixGroupsBtnSel: '#show-no-suffix-groups'
};

class Cell {
    /**
     * Creates a cell for an inflection table.
     * @param {Suffix[]} suffixes - A list of suffixes that belongs to this cell.
     * @param {Feature[]} features - A list of features this cell corresponds to.
     */
  constructor (suffixes, features) {
    this.suffixes = suffixes;
    if (!this.suffixes) {
      this.suffixes = [];
    }
    this.features = features;
    this.empty = (this.suffixes.length === 0);
    this.suffixMatches = !!this.suffixes.find(element => {
      if (element.match && element.match.suffixMatch) {
        return element.match.suffixMatch
      }
    });

    this.column = undefined; // A column this cell belongs to
    this.row = undefined; // A row this cell belongs to

    this._index = undefined;

    this.render();
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
    let element = document.createElement('div');
    element.classList.add(classNames.cell);
    for (let [index, suffix] of this.suffixes.entries()) {
            // Render each suffix
      let suffixElement = document.createElement('a');
      suffixElement.classList.add(classNames.suffix);
      if (suffix.match && suffix.match.suffixMatch) {
        suffixElement.classList.add(classNames.suffixMatch);
      }
      if (suffix.match && suffix.match.fullMatch) {
        suffixElement.classList.add(classNames.suffixFullFeatureMatch);
      }
      let suffixValue = suffix.value ? suffix.value : '-';
      if (suffix.footnote && suffix.footnote.length) {
        suffixValue += '[' + suffix.footnote + ']';
      }
      suffixElement.innerHTML = suffixValue;
      element.appendChild(suffixElement);
      if (index < this.suffixes.length - 1) {
        element.appendChild(document.createTextNode(',\u00A0'));
      }
    }
    this.wNode = element;
    this.nNode = element.cloneNode(true);
  }

    /**
     * Returns an HTML element for a wide view.
     * @returns {HTMLElement}
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an HTML element for a narrow view.
     * @returns {HTMLElement}
     */
  get nvNode () {
    return this.nNode
  }

    /**
     * Sets a unique index of the cell that can be used for cell identification via 'data-index' attribute.
     * @param {number} index - A unique cell index.
     */
  set index (index) {
    this._index = index;
    this.wNode.dataset.index = this._index;
    this.nNode.dataset.index = this._index;
  }

    /**
     * A proxy for adding an event listener for both wide and narrow view HTML elements.
     * @param {string} type - Listener type.
     * @param {EventListener} listener - Event listener function.
     */
  addEventListener (type, listener) {
    this.wNode.addEventListener(type, listener);
    this.nNode.addEventListener(type, listener);
  }

    /**
     * Hides an element.
     */
  hide () {
    if (!this.wNode.classList.contains(classNames.hidden)) {
      this.wNode.classList.add(classNames.hidden);
      this.nNode.classList.add(classNames.hidden);
    }
  }

    /**
     * Shows a previously hidden element.
     */
  show () {
    if (this.wNode.classList.contains(classNames.hidden)) {
      this.wNode.classList.remove(classNames.hidden);
      this.nNode.classList.remove(classNames.hidden);
    }
  }

    /**
     * Highlights a cell with color.
     */
  highlight () {
    if (!this.wNode.classList.contains(classNames.highlight)) {
      this.wNode.classList.add(classNames.highlight);
      this.nNode.classList.add(classNames.highlight);
    }
  }

    /**
     * Removes highlighting from a previously highlighted cell.
     */
  clearHighlighting () {
    if (this.wNode.classList.contains(classNames.highlight)) {
      this.wNode.classList.remove(classNames.highlight);
      this.nNode.classList.remove(classNames.highlight);
    }
  }

    /**
     * Highlights a row and a column this cell belongs to.
     */
  highlightRowAndColumn () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.highlight();
    this.row.highlight();
  }

    /**
     * Removes highlighting form a previously highlighted row and column.
     */
  clearRowAndColumnHighlighting () {
    if (!this.column) {
      throw new Error('Column is undefined.')
    }
    if (!this.row) {
      throw new Error('Row is undefined.')
    }
    this.column.clearHighlighting();
    this.row.clearHighlighting();
  }
}

/**
 * A cell that specifies a title for a row in an inflection table.
 */
class RowTitleCell {
    /**
     * Initializes a row title cell.
     * @param {string} title - A text that will be shown within the cell.
     * @param {GroupFeatureType} groupingFeature - A grouping feature that specifies a row for which a title cell
     * is created.
     * @param {number} nvGroupQty - A number of narrow view groups. Because each group will be shown separately
     * and will have its own title cells, we need to create a copy of a title cell for each such group.
     */
  constructor (title, groupingFeature, nvGroupQty) {
    this.parent = undefined;
    this.title = title;
    this.feature = groupingFeature;
    this.nvGroupQty = nvGroupQty;

    this.render();
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
        // Generate HTML representation for a wide view node
    this.wNode = document.createElement('div');
    this.wNode.classList.add(classNames.cell);
    if (this.feature.formsColumn) {
      this.wNode.classList.add(classNames.header);
    }
    if (this.feature.hasFullWidthRowTitle) {
            // This cell is taking an entire row
      this.wNode.classList.add(classNames.fullWidth);
    }
    if (this.feature.formsColumn && this.feature.groupFeatureList.titleColumnsQuantity > 1) {
      this.wNode.classList.add(classNames.widthPrefix + this.feature.groupFeatureList.titleColumnsQuantity);
    }
    this.wNode.innerHTML = this.title;

        // Copy HTML representation to all narrow view nodes (each narrow view group has its own node)
    this.nNodes = []; // Narrow nodes, one for each group
    for (let i = 0; i < this.nvGroupQty; i++) {
      this.nNodes.push(this.wNode.cloneNode(true));
    }
  }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an array HTML element for narrow view groups
     * @returns {HTMLElement[]} Array of HTML elements for narrow view group's cells.
     */
  getNvNode (index) {
    return this.nNodes[index]
  }

    /**
     * Generates an empty cell placeholder of a certain width. Useful for situation when empty title cells need to be
     * inserted into a table structure (i.e. when title cells occupy multiple columns.
     * @param {number} width - A number of columns placeholder cell will occupy.
     * @returns {HTMLElement} HTML element of a placeholder cell.
     */
  static placeholder (width = 1) {
    let placeholder = document.createElement('div');
    placeholder.classList.add(classNames.cell, classNames.widthPrefix + width);
    return placeholder
  }

    /**
     * Some table layouts require multiple title cells to be shown for a row. These could be, for example, a title
     * cell for a parent category that will follow a title cell for a category that defines a row. In such situation a
     * title cell will have a parent, which will represent a parent cell object.
     * This function returns an array of title cells for a row, starting from the topmost parent and moving down
     * tot the current title cell.
     * @returns {RowTitleCell[]} An array of title row cells representing a title cell hierarchy list.
     */
  get hierarchyList () {
    let parentCells = [];
    if (this.parent) {
      parentCells = this.parent.hierarchyList;
    }
    return parentCells.concat(this)
  }

    /**
     * Highlights this row title cell
     */
  highlight () {
    this.wNode.classList.add(classNames.highlight);
    for (let nNode of this.nNodes) {
      nNode.classList.add(classNames.highlight);
    }
  }

    /**
     * Removes highlighting from this row title cell
     */
  clearHighlighting () {
    this.wNode.classList.remove(classNames.highlight);
    for (let nNode of this.nNodes) {
      nNode.classList.remove(classNames.highlight);
    }
  }
}

/**
 * A cell in a header row, a column title cell.
 */
class HeaderCell {
    /**
     * Initializes a header cell.
     * @param {string} title - A title text that will be shown in the header cell.
     * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
     * @param {number} [span=1] - How many columns in a table this header cell forms.
     */
  constructor (title, groupingFeature, span = 1) {
    this.feature = groupingFeature;
    this.title = title;
    this.span = span;

    this.parent = undefined;
    this.children = [];
    this.columns = [];

    this.render();
  }

    /**
     * Renders an element's HTML representation.
     */
  render () {
    let element = document.createElement('div');
    element.classList.add(classNames.cell, classNames.header, classNames.widthPrefix + this.span);
    element.innerHTML = this.title;
    this.wNode = element;
    this.nNode = element.cloneNode(true);
  }

    /**
     * Returns an HTML element for a wide view
     * @returns {HTMLElement} HTML element for a wide view's cell.
     */
  get wvNode () {
    return this.wNode
  }

    /**
     * Returns an HTML element for a narrow view
     * @returns {HTMLElement} HTML element for a narrow view's cell.
     */
  get nvNode () {
    return this.nNode
  }

    /**
     * Registers a column that's being formed by this header cell. Adds column to itself and to its parent(s).
     * @param {Column} column - A column that is formed by this header cell.
     */
  addColumn (column) {
    this.columns = this.columns.concat([column]);

    if (this.parent) {
      this.parent.addColumn(column);
    }
  }

    /**
     * Temporary changes a width of a header cell. This happens when one or several columns
     * that this header forms are hidden or shown.
     * @param value
     */
  changeSpan (value) {
    let currentWidthClass = classNames.widthPrefix + this.span;
    this.span += value;
    let newWidthClass = classNames.widthPrefix + this.span;
    this.wNode.classList.replace(currentWidthClass, newWidthClass);
    this.nNode.classList.replace(currentWidthClass, newWidthClass);
  }

    /**
     * This function will notify all parents and children of a title column that some columns under this headers cell
     * changed their state (i.e. were hidden or shown). This way parents and children will be able to update their
     * states accordingly.
     */
  columnStateChange () {
    let visibleColumns = 0;
    for (let column of this.columns) {
      if (!column.hidden) {
        visibleColumns++;
      }
    }
    if (this.span !== visibleColumns) {
            // Number of visible columns has been changed
      let change = visibleColumns - this.span;
      this.changeSpan(change);

            // Notify parents and children
      if (this.children.length) {
        for (let child of this.children) {
          child.columnStateChange();
        }
      }
      if (this.parent) {
        this.parent.columnStateChange();
      }
    }
  }

    /**
     * Highlights a header cell, its parent and children
     */
  highlight () {
    if (!this.wNode.classList.contains(classNames.highlight)) {
      this.wNode.classList.add(classNames.highlight);
      this.nNode.classList.add(classNames.highlight);

      if (this.parent) {
        this.parent.highlight();
      }
    }
  }

    /**
     * Removes highlighting from a header cell, its parent and children
     */
  clearHighlighting () {
    if (this.wNode.classList.contains(classNames.highlight)) {
      this.wNode.classList.remove(classNames.highlight);
      this.nNode.classList.remove(classNames.highlight);

      if (this.parent) {
        this.parent.clearHighlighting();
      }
    }
  }
}

/**
 * Represent a column of cells in an inflection table.
 */
class Column {
    /**
     * Initializes column with a provided set of cells.
     * @param {Cell} cells - Cells that are within this column.
     */
  constructor (cells) {
    this.cells = cells;
    if (!cells) {
      this.cells = [];
    }
    this._headerCell = undefined;
    this.hidden = false;
    this.empty = this.cells.every(cell => cell.empty);
    this.suffixMatches = !!this.cells.find(cell => cell.suffixMatches);

    for (let cell of this.cells) {
      cell.column = this;
    }
  }

    /**
     * Assigns a header cell to the column.
     * @param {HeaderCell} headerCell - A header cell of this column.
     */
  set headerCell (headerCell) {
    this._headerCell = headerCell;
    headerCell.addColumn(this);
  }

    /**
     * Returns a number of cells within this column.
     * @returns {Number} A number of cells this column contains.
     */
  get length () {
    return this.cells.length
  }

    /**
     * Hides the column. Notifies a header about a state change.
     */
  hide () {
    if (!this.hidden) {
      this.hidden = true;

      for (let cell of this.cells) {
        cell.hide();
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange();
      }
    }
  }

    /**
     * Shows the column. Notifies a header about a state change.
     */
  show () {
    if (this.hidden) {
      this.hidden = false;

      for (let cell of this.cells) {
        cell.show();
      }
      if (this._headerCell) {
        this._headerCell.columnStateChange();
      }
    }
  }

    /**
     * Highlights a column and its header.
     */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight();
    }
    if (this._headerCell) {
      this._headerCell.highlight();
    }
  }

    /**
     * Removes highlighting from a column and its header.
     */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting();
    }
    if (this._headerCell) {
      this._headerCell.clearHighlighting();
    }
  }
}

/**
 * Represents a row of cells
 */
class Row {
    /**
     * Populates row with cells
     * @param {Cell[]} cells - Cells that belong to this row
     */
  constructor (cells) {
    this.cells = cells;
    if (!cells) {
      this.cells = [];
    }
    this.titleCell = undefined;

    for (let cell of this.cells) {
      cell.row = this;
    }
  }

    /**
     * Adds a cell to the row.
     * This is a chainable function.
     * @param {Cell} cell - A cell to be added to the row
     */
  add (cell) {
    cell.row = this;
    this.cells.push(cell);
    return this
  }

    /**
     * Returns a number of cells in a row
     * @returns {Number} A number of cells in a row
     */
  get length () {
    return this.cells.length
  }

    /**
     * Returns a portion of a cells array starting from `from` item and up to, but not including, `upto` element.
     * It does not create new copies of cells to populate a newly created array; this array contains references to
     * the same cells that original Row refers to. It also does not update row reference within Cell objects.
     *
     * This function presents a way to create another structure of existing table's cells.
     * It can be useful for views that have a different structure (i.e. narrow view).
     * @param {number} from
     * @param {number} upto
     */
  slice (from, upto) {
    let slice = new Row();
    if (from < 0 && from > this.cells.length) {
      throw new Error('"from" parameter is out of range.')
    }
    if (upto < 0 && upto > this.cells.length) {
      throw new Error('"upto" parameter is out of range.')
    }
    for (let index = from; index < upto; index++) {
      slice.cells.push(this.cells[index]);
    }
    slice.titleCell = this.titleCell;
    return slice
  }

    /**
     * Highlights all cells in a row, and a title cells
     */
  highlight () {
    for (let cell of this.cells) {
      cell.highlight();
    }
    if (this.titleCell) {
      this.titleCell.highlight();
    }
  }

    /**
     * Removes highlighting from all cells in a row, and from a title cell
     */
  clearHighlighting () {
    for (let cell of this.cells) {
      cell.clearHighlighting();
    }
    if (this.titleCell) {
      this.titleCell.clearHighlighting();
    }
  }
}

/**
 * This is a wrapper around a FeatureType object. When a Table object creates a
 * hierarchical tree of suffixes, it uses grammatical features as tree nodes.
 * GroupFeatureType extends a Feature object so that it'll be able to store additional information
 * that is required for that.
 */
class GroupFeatureType extends FeatureType {
    /**
     * GroupFeatureType extends FeatureType to serve as a grouping feature (i.e. a feature that forms
     * either a column or a row in an inflection table). For that, it adds some additional functionality,
     * such as custom feature orders that will allow to combine suffixes from several grammatical features
     * (i.e. masculine and feminine) into a one column of a table.
     * @param {FeatureType} featureType - A feature that defines a type of this item.
     * @param {string} titleMessageID - A message ID of a title, used to get a formatted title from a
     * language-specific message bundle.
     * @param {Feature[]} order - A custom sort order for this feature that redefines
     * a default one stored in FeatureType object (optional).
     * Use this parameter to redefine a deafult sort order for a type.
     */
  constructor (featureType, titleMessageID, order = featureType.orderedFeatures) {
    super(featureType.type, GroupFeatureType.featuresToValues(order), featureType.language);

    this.groupTitle = titleMessageID;
    this._groupType = undefined;

    this.groupFeatureList = undefined;

        // Properties below are required to store information during tree creation
    this.subgroups = []; // Each value of the feature
    this.cells = []; // All cells within this group and below
    this.parent = undefined;
    this.header = undefined;

    this._formsColumn = false;
    this._formsRow = false;
    this.hasColumnRowTitle = false; // Whether this feature has a title of a suffix row in the left-side column.
    this.hasFullWidthRowTitle = false; // Whether this feature has a title of suffix rows that spans the whole table width.
  }

    /**
     * Converts a list of Feature objects into a list of strings that represent their values. Keeps tha original
     * array structure intact (work with up two two array levels).
     * @param {Feature[] | Feature[][]} features - An array of feature objects.
     * @return {string[] | strings[][]} A matching array of strings with feature values.
     */
  static featuresToValues (features) {
    return features.map((feature) => {
      if (Array.isArray(feature)) {
        return feature.map((feature) => feature.value)
      } else {
        return feature.value
      }
    })
  }

    /**
     * This is a wrapper around orderedFeatures() that allows to set a custom feature order for particular columns.
     * @returns {Feature[] | Feature[][]} A sorted array of feature values.
     */
  getOrderedFeatures (ancestorFeatures) {
    return this.getOrderedValues(ancestorFeatures).map((value) => new Feature(value, this.type, this.language))
  }

    /**
     * This is a wrapper around orderedValues() that allows to set a custom feature order for particular columns.
     * By default it returns features in the same order that is defined in a base FeatureType class.
     * Redefine it to provide a custom grouping and sort order.
     * @returns {string[] | string[][]} A sorted array of feature values.
     */
  getOrderedValues (ancestorFeatures) {
    return this._orderIndex
  }

    /**
     * Whether this feature forms a columns group.
     * @returns {boolean} True if this feature forms a column.
     */
  get formsColumn () {
    return this._formsColumn
  }

    /**
     * Sets that this feature would form a column.
     * @param {boolean} value
     */
  set formsColumn (value) {
    this._formsColumn = value;
    this._formsRow = !value; // Can't do both
  }

    /**
     * Whether this feature forms a row group.
     * @returns {boolean} True if this feature forms a row.
     */
  get formsRow () {
    return this._formsRow
  }

    /**
     * Sets that this feature would form a row.
     * @param {boolean} value
     */
  set formsRow (value) {
    this._formsRow = value;
    this._formsColumn = !value; // Can't do both
  }

    /**
     * How many groups this feature would form.
     * @returns {Number} A number of groupes formed by this feature.
     */
  get size () {
    return this.orderedValues.length
  }

    /**
     * Checks if two grouping features are of the same type.
     * @param {GroupFeatureType} groupingFeature - A grouping feature to compare with the current one.
     * @returns {boolean} True if grouping features are of the same type.
     */
  isSameType (groupingFeature) {
    return this.type === groupingFeature.type
  }

    /**
     * Creates a title cell for a feature from the current group.
     * @param {string} title - A text that will be shown within a cell.
     * @param {number} nvGroupQty - A number of narrow view groups.
     * @returns {RowTitleCell} A created RowTitleCell object.
     */
  createTitleCell (title, nvGroupQty) {
    return new RowTitleCell(title, this, nvGroupQty)
  }
}

/**
 * Holds a list of all grouping features of a table.
 */
class GroupFeatureList extends FeatureList {
    /**
     * Initializes object with an array of grouping feature objects.
     * @param {GroupFeatureType[]} features - An array of features that form a table.
     * An order of features defines in what order a table tree would be built.
     */
  constructor (features) {
    super(features);
    this._columnFeatures = []; // Features that group cells into columns
    this._rowFeatures = []; // Features that group cells into rows

    this.forEach((feature) => { feature.groupFeatureList = this; });
  }

    /**
     * Return a list of all grouping features that form columns.
     * @returns {GroupFeatureType[]} - An array of grouping features.
     */
  get columnFeatures () {
    return this._columnFeatures
  }

    /**
     * Defines what features form columns. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form columns and what order
     * these columns would follow.
     */
  set columns (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type);
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsColumn = true;
      this._columnFeatures.push(matchingFeature);
    }
  }

    /**
     * Returns a first column feature item.
     * @returns {GroupFeatureType} A fist column feature.
     */
  get firstColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[0]
    }
  }

    /**
     * Returns a last column feature item.
     * @returns {GroupFeatureType} A last column feature.
     */
  get lastColumnFeature () {
    if (this._columnFeatures && this._columnFeatures.length) {
      return this._columnFeatures[this._columnFeatures.length - 1]
    }
  }

    /**
     * Return a list of all grouping features that form rows.
     * @returns {GroupFeatureType[]} - An array of grouping rows.
     */
  get rowFeatures () {
    return this._rowFeatures
  }

    /**
     * Defines what features form rows. An order of items specifies an order in which columns be shown.
     * @param {Feature[] | GroupingFeature[]} features - What features form rows and what order
     * these rows would follow.
     */
  set rows (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type);
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.formsRow = true;
      this._rowFeatures.push(matchingFeature);
    }
    return this
  }

    /**
     * Returns a first row feature item.
     * @returns {GroupFeatureType} A fist row feature.
     */
  get firstRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[0]
    }
  }

    /**
     * Returns a last row feature item.
     * @returns {GroupFeatureType} A last row feature.
     */
  get lastRowFeature () {
    if (this._rowFeatures && this._rowFeatures.length) {
      return this._rowFeatures[this._rowFeatures.length - 1]
    }
  }

    /**
     * Defines what are the titles of suffix cell rows within a table body.
     * The number of such items defines how many left-side title columns this table would have (default is one).
     * Full width titles (see below) does not need to be specified here.
     * @param {Feature | GroupingFeature} features - What suffix row titles this table would have.
     */
  set columnRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type);
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasColumnRowTitle = true;
    }
  }

    /**
     * In inflection tables, titles of features are usually located in left-side columns. However, some titles that
     * group several rows together may span the whole table width. This setters defines
     * what those features are.
     * @param {Feature | GroupingFeature} features - What feature titles would take a whole row
     */
  set fullWidthRowTitles (features) {
    for (let feature of features) {
      let matchingFeature = this.ofType(feature.type);
      if (!matchingFeature) {
        throw new Error(`Feature of ${feature.type} is not found.`)
      }
      matchingFeature.hasFullWidthRowTitle = true;
    }
  }

    /**
     * Returns a quantity of grouping features.
     * @returns {number} - A number of grouping features.
     */
  get length () {
    return this._features.length
  }

    /**
     * Calculate a number of title columns.
     * @returns {number} A number of title columns.
     */
  get titleColumnsQuantity () {
    let quantity = 0;
    for (let feature of this._features) {
      if (feature.hasColumnRowTitle) {
        quantity++;
      }
    }
    return quantity
  }
}

/**
 * Stores group data during feature tree construction.
 */
class NodeGroup {
    /**
     * Creates feature group data structures.
     */
  constructor () {
    this.subgroups = []; // Each value of the feature
    this.cells = []; // All cells within this group and below
    this.parent = undefined;
    this.header = undefined;

    this.groupFeatureType = undefined; // Defines a feature type that forms a tree level this node is in.
    this.ancestorFeatures = undefined; // Defines feature values of this node's parents.
  }
}

/**
 * A representation of a table that is shown on wide screens (desktops).
 */
class WideView {
    /**
     * Initializes a wide view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (columns, rows, headers, titleColumnQty) {
    this.columns = columns;
    this.rows = rows;
    this.headers = headers;
    this.titleColumnQty = titleColumnQty;
    this.nodes = document.createElement('div');
    this.nodes.classList.add(classNames.inflectionTable, classNames.wideView);
  }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
  get visibleColumnQty () {
    let qty = 0;
    for (let column of this.columns) {
      if (!column.hidden) {
        qty++;
      }
    }
    return qty
  }

    /**
     * Renders an HTML representation of a wide table view.
     * @returns {HTMLElement} A rendered HTML Element.
     */
  render () {
        // Remove any previously inserted nodes
    this.nodes.innerHTML = '';

    for (let row of this.headers) {
      this.nodes.appendChild(row.titleCell.wvNode);
      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode);
      }
    }

    for (let row of this.rows) {
      let titleCells = row.titleCell.hierarchyList;
      if (titleCells.length < this.titleColumnQty) {
        this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
      }
      for (let titleCell of titleCells) {
        this.nodes.appendChild(titleCell.wvNode);
      }

      for (let cell of row.cells) {
        this.nodes.appendChild(cell.wvNode);
      }
    }
    this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
            wideView.column.width + wideView.column.unit + ')';

    return this.nodes
  }
}

/**
 * A representation of a table that is shown on narrow screens (mobile devices).
 */
class NarrowView {
    /**
     * Initializes a narrow view.
     * @param {number} groupQty - A number of visible groups (sub tables) within a narrow view.
     * @param {Column[]} columns - Table columns.
     * @param {Row[]} rows - Table rows.
     * @param {Row[]} headers - Table headers.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (groupQty, columns, rows, headers, titleColumnQty) {
    this.columns = columns;
    this.rows = rows;
    this.headers = headers;
    this.titleColumnQty = titleColumnQty;
    this.groups = [];
    this.groupQty = groupQty;
    this.groupSize = 0;
    if (groupQty) {
      this.groupSize = this.columns.length / groupQty;
    }

    this.nodes = document.createElement('div');
    this.nodes.classList.add(classNames.narrowViewsContainer);

    for (let [index, headerCell] of this.headers[0].cells.entries()) {
      this.createGroup(index, headerCell);
    }
  }

    /**
     * Creates a group within a table.
     * @returns {NarrowViewGroup} A newly created group.
     */
  createGroup (index, headerCell) {
    let group = new NarrowViewGroup(index, this.headers, this.rows, this.titleColumnQty);
    this.nodes.appendChild(group.nodes);
    this.groups.push(group);
  }

    /**
     * Generates an HTML representation of a view.
     * @returns {HTMLElement} - HTML representation of a view.
     */
  render () {
    for (let group of this.groups) {
      group.render();
    }
    return this.nodes
  }
}

/**
 * Represents a group within a narrow view. A narrow view is split into separate sub tables
 * by values of a first grammatical feature that forms columns. Then each sub table would contain
 * a suffixes that belong to that grammatical feature value only. Each sub table becomes a
 * separated object and can be reflown on devices with narrow screens.
 */
class NarrowViewGroup {
    // TODO: Review constructor parameters

    /**
     * Initializes a narrow view group. Please note that column, rows, and headers are those of a whole table,
     * not of this particular group. NarrowViewGroup constructor will use this data to build
     * the corresponding objects of the group itself.
     * @param {number} index - An index of this group within a groups array, starting from zero.
     * @param {Row[]} headers - Table headers.
     * @param {Row[]} rows - Table rows.
     * @param {number} titleColumnQty - Number of title columns in a table.
     */
  constructor (index, headers, rows, titleColumnQty) {
    this.index = index;
    this.columns = headers[0].cells[index].columns;
    this.groupSize = this.columns.length;
    let columnsStartIndex = this.columns[0].index;
    let columnsEndIndex = this.columns[this.columns.length - 1].index;

    this.rows = [];
    for (let row of rows) {
      this.rows.push(row.slice(columnsStartIndex, columnsEndIndex + 1));
    }
    this.headers = [];
        /**
         * Since we group by the first column feature, there will be a single feature in a first header row,
         * its children in the second row, children of its children in a third row and so on.
         */
    for (let [headerIndex, headerRow] of headers.entries()) {
      let row = new Row();
      row.titleCell = headerRow.titleCell;
      if (headerIndex === 0) {
        row.cells.push(headerRow.cells[index]);
      } else {
        for (let headerCell of this.headers[headerIndex - 1].cells) {
          row.cells = row.cells.concat(headerCell.children);
        }
      }
      this.headers.push(row);
    }
    this.titleColumnQty = titleColumnQty;

    this.nodes = document.createElement('div');
    this.nodes.classList.add(classNames.inflectionTable, classNames.narrowView);
  }

    /**
     * Calculates a number of visible columns in this view.
     * @returns {number} A number of visible columns.
     */
  get visibleColumnQty () {
    let qty = 0;
    for (let column of this.columns) {
      if (!column.hidden) {
        qty++;
      }
    }
    return qty
  }

    /**
     * Renders an HTML representation of a narrow view group.
     */
  render () {
    this.nodes.innerHTML = '';

    if (this.visibleColumnQty) {
            // This group is visible
      for (let headerRow of this.headers) {
        this.nodes.appendChild(headerRow.titleCell.getNvNode(this.index));
        for (let headerCell of headerRow.cells) {
          this.nodes.appendChild(headerCell.nvNode);
        }
      }

      for (let row of this.rows) {
        let titleCells = row.titleCell.hierarchyList;
        if (titleCells.length < this.titleColumnQty) {
          this.nodes.appendChild(RowTitleCell.placeholder(this.titleColumnQty - titleCells.length));
        }
        for (let titleCell of titleCells) {
          this.nodes.appendChild(titleCell.getNvNode(this.index));
        }

        for (let cell of row.cells) {
          this.nodes.appendChild(cell.nvNode);
        }
      }
      this.nodes.classList.remove(classNames.hidden);
      this.nodes.style.gridTemplateColumns = 'repeat(' + (this.visibleColumnQty + this.titleColumnQty) + ', ' +
                narrowView.column.width + narrowView.column.unit + ')';
      this.nodes.style.width = (this.visibleColumnQty + this.titleColumnQty) * narrowView.column.width +
                narrowView.column.unit;
    } else {
            // This group is hidden
      this.nodes.classList.add(classNames.hidden);
    }
  }
}

/**
 * Represents an inflection table.
 */
class Table {
    /**
     * Initializes an inflection table.
     * @param {GroupFeatureType[]} features - An array of grouping features. An order of elements in this array
     */
  constructor (features) {
    this.features = new GroupFeatureList(features);
    this.emptyColumnsHidden = false;
    this.cells = []; // Will be populated by groupByFeature()

        /*
        This is a special filter function that, if defined will do additional filtering of suffixes within a cell.
         */
    this.suffixCellFilter = undefined;
  }

    /**
     * Creates a table tree and other data structures (columns, rows, headers).
     * This function is chainabe.
     * @param {Suffix[]} suffixes - An array of suffixes to build table from.
     * @returns {Table} Reference to self for chaining.
     */
  construct (suffixes) {
    this.suffixes = suffixes;
    this.tree = this.groupByFeature(suffixes);
    this.headers = this.constructHeaders();
    this.columns = this.constructColumns();
    this.rows = this.constructRows();
    this.emptyColumnsHidden = false;
    return this
  }

    /**
     * Builds wide and narrow views of the table.
     * This function is chainabe.
     * @returns {Table} Reference to self for chaining.
     */
  constructViews () {
    this.wideView = new WideView(this.columns, this.rows, this.headers, this.titleColumnQty);
    this.narrowView = new NarrowView(
            this.features.firstColumnFeature.size, this.columns, this.rows, this.headers, this.titleColumnQty);
    return this
  }

    /**
     * Returns a number of columns with suffix cells in a table.
     * @returns {number} A number of columns with suffix cells in a table.
     */
  get suffixColumnQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns.length
  }

    /**
     * Returns a number of columns with row titles in a table.
     * @returns {number} A number of columns with row titles.
     */
  get titleColumnQty () {
    if (!this.features) {
      throw new Error('Features are not defined.')
    }
    return this.features.titleColumnsQuantity
  }

    /**
     * Returns a number of rows with suffix cells in a table.
     * @returns {number} A number of rows with suffix cells.
     */
  get suffixRowQty () {
    if (!this.columns) {
      throw new Error('Columns are not populated yet.')
    }
    return this.columns[0].length
  }

    /**
     * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {string} featureType - a grammatical feature type we need to filter on.
     * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have.
     * @param {Suffix} suffix - an ending we need to filter out.
     * @returns {boolean} True if suffix has a value of a grammatical feature specified.
     */
  static filter (featureType, featureValues, suffix) {
    'use strict';

        // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
      featureValues = [featureValues];
    }
    for (const value of featureValues) {
      if (suffix.features[featureType] === value) {
        return true
      }
    }

    return false
  };

    /**
     * Groups all suffixes into a tree according to their grammatical features. There are several levels in this tree.
     * Each level corresponds to a one grouping feature. The order of items in GroupingFeatures List object
     * defines an order of those levels.
     * Nodes on each level are values of a grammatical feature that forms this level. An order of those values
     * is determined by the order of values within a GroupFeatureType object of each feature.
     * This is a recursive function.
     * @param {Suffix[]} suffixes - Suffixes to be grouped.
     * @param {Feature[]} ancestorFeatures - A list of feature values on levels above the current.
     * @param {number} currentLevel - At what level in a tree we are now. Used to stop recursion.
     * @returns {NodeGroup} A top level group of suffixes that contain subgroups all way down to the last group.
     */
  groupByFeature (suffixes, ancestorFeatures = [], currentLevel = 0) {
    let group = new NodeGroup();
    group.groupFeatureType = this.features.items[currentLevel];
    group.ancestorFeatures = ancestorFeatures.slice();

        // Iterate over each value of the feature
    for (const featureValue of group.groupFeatureType.getOrderedFeatures(ancestorFeatures)) {
      if (ancestorFeatures.length > 0 && ancestorFeatures[ancestorFeatures.length - 1].type === group.groupFeatureType.type) {
                // Remove previously inserted feature of the same type
        ancestorFeatures.pop();
      }
      ancestorFeatures.push(featureValue);

            // Suffixes that are selected for current combination of feature values
      let selectedSuffixes = suffixes.filter(Table.filter.bind(this, group.groupFeatureType.type, featureValue.value));

      if (currentLevel < this.features.length - 1) {
                // Divide to further groups
        let subGroup = this.groupByFeature(selectedSuffixes, ancestorFeatures, currentLevel + 1);
        group.subgroups.push(subGroup);
        group.cells = group.cells.concat(subGroup.cells);
      } else {
                // This is the last level. This represent a cell with suffixes
                // Split result has a list of suffixes in a table cell. We need to combine items with same endings.
        if (selectedSuffixes.length > 0) {
          if (this.suffixCellFilter) {
            selectedSuffixes = selectedSuffixes.filter(this.suffixCellFilter);
          }

          selectedSuffixes = Suffix.combine(selectedSuffixes);
        }

        let cell = new Cell(selectedSuffixes, ancestorFeatures.slice());
        group.subgroups.push(cell);
        group.cells.push(cell);
        this.cells.push(cell);
        cell.index = this.cells.length - 1;
      }
    }
    ancestorFeatures.pop();
    return group
  }

    /**
     * Create columns out of a suffixes organized into a tree.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Column[]} columns - An array of columns to be constructed.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} An array of columns of suffix cells.
     */
  constructColumns (tree = this.tree, columns = [], currentLevel = 0) {
    let currentFeature = this.features.items[currentLevel];

    let groups = [];
    for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
      let cellGroup = tree.subgroups[index];

            // Iterate until it is the last row feature
      if (!currentFeature.isSameType(this.features.lastRowFeature)) {
        let currentResult = this.constructColumns(cellGroup, columns, currentLevel + 1);
        if (currentFeature.formsRow) {
                    // TODO: Avoid creating extra cells

          let group = {
            titleText: featureValue,
            groups: currentResult,
            titleCell: currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size)
          };
          group.groups[0].titleCell.parent = group.titleCell;
          groups.push(group);
        } else if (currentFeature.isSameType(this.features.lastColumnFeature)) {
          let column = new Column(cellGroup.cells);
          column.groups = currentResult;
          column.header = featureValue;
          column.index = columns.length;
          columns.push(column);
          column.headerCell = this.headers[this.headers.length - 1].cells[columns.length - 1];
        }
      } else {
                // Last level
        cellGroup.titleCell = currentFeature.createTitleCell(featureValue, this.features.firstColumnFeature.size);
        let group = {
          titleText: featureValue,
          cell: cellGroup,
          titleCell: cellGroup.titleCell
        };
        groups.push(group);
      }
    }
    if (currentFeature.formsRow) {
      return groups
    }
    return columns
  }

    /**
     * Creates an array of header cell rows.
     * This is a recursive function.
     * @param {NodeGroup} tree - A tree of suffixes.
     * @param {Row[]} headers - An array of rows with header cells.
     * @param {number} currentLevel - Current recursion level.
     * @returns {Array} A two-dimensional array of header cell rows.
     */
  constructHeaders (tree = this.tree, headers = [], currentLevel = 0) {
    let currentFeature = this.features.columnFeatures[currentLevel];

    let cells = [];
    for (let [index, featureValue] of currentFeature.getOrderedValues(tree.ancestorFeatures).entries()) {
      let cellGroup = tree.subgroups[index];

            // Iterate over all column features (features that form columns)
      if (currentLevel < this.features.columnFeatures.length - 1) {
        let subCells = this.constructHeaders(cellGroup, headers, currentLevel + 1);

        let columnSpan = 0;
        for (let cell of subCells) {
          columnSpan += cell.span;
        }

        let headerCell = new HeaderCell(featureValue, currentFeature, columnSpan);
        headerCell.children = subCells;
        for (let cell of subCells) {
          cell.parent = headerCell;
        }

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row();
        }
        headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);

        headers[currentLevel].add(headerCell);
        cells.push(headerCell);
      } else {
                // Last level
        let headerCell = new HeaderCell(featureValue, currentFeature);

        if (!headers[currentLevel]) {
          headers[currentLevel] = new Row();
        }

        headers[currentLevel].add(headerCell);
        headers[currentLevel].titleCell = currentFeature.createTitleCell(
                    this.messages.get(currentFeature.groupTitle), this.features.firstColumnFeature.size);
        cells.push(headerCell);
      }
    }
    if (currentLevel === 0) {
      return headers
    } else {
      return cells
    }
  }

    /**
     * Creates an array of rows by parsing an array of columns.
     * @returns {Row[]} An array of rows.
     */
  constructRows () {
    let rows = [];
    for (let rowIndex = 0; rowIndex < this.suffixRowQty; rowIndex++) {
      rows[rowIndex] = new Row();
      rows[rowIndex].titleCell = this.columns[0].cells[rowIndex].titleCell;
      for (let columnIndex = 0; columnIndex < this.suffixColumnQty; columnIndex++) {
        rows[rowIndex].add(this.columns[columnIndex].cells[rowIndex]);
      }
    }
    return rows
  }

    /**
     * Adds event listeners to each cell object.
     */
  addEventListeners () {
    for (let cell of this.cells) {
      cell.addEventListener('mouseenter', this.highlightRowAndColumn.bind(this));
      cell.addEventListener('mouseleave', this.clearRowAndColumnHighlighting.bind(this));
    }
  }

    /**
     * Highlights a row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
  highlightRowAndColumn (event) {
    let index = event.currentTarget.dataset.index;
    this.cells[index].highlightRowAndColumn();
  }

    /**
     * Removes highlighting from row and a column this cell is in.
     * @param {Event} event - An event that triggers this function.
     */
  clearRowAndColumnHighlighting (event) {
    let index = event.currentTarget.dataset.index;
    this.cells[index].clearRowAndColumnHighlighting();
  }

    /**
     * Hides empty columns in a table.
     */
  hideEmptyColumns () {
    for (let column of this.columns) {
      if (column.empty) {
        column.hide();
      }
    }
    this.emptyColumnsHidden = true;
  }

    /**
     * Show all empty columns that were previously hidden.
     */
  showEmptyColumns () {
    for (let column of this.columns) {
      if (column.hidden) {
        column.show();
      }
    }
    this.emptyColumnsHidden = false;
  }

    /**
     * Hide groups that have no suffix matches.
     */
  hideNoSuffixGroups () {
    for (let headerCell of this.headers[0].cells) {
      let matches = !!headerCell.columns.find(column => column.suffixMatches);
      if (!matches) {
        for (let column of headerCell.columns) {
          column.hide();
        }
      }
    }
    this.suffixMatchesHidden = true;
  }

    /**
     * Show groups that have no suffix matches.
     */
  showNoSuffixGroups () {
    for (let column of this.columns) {
      column.show();
    }
    if (this.emptyColumnsHidden) {
      this.hideEmptyColumns();
    }
    this.suffixMatchesHidden = false;
  }
}

/**
 * Represents a list of footnotes.
 */
class Footnotes {
    /**
     * Initialises a Footnotes object.
     * @param {Footnote[]} footnotes - An array of footnote objects.
     */
  constructor (footnotes$$1) {
    this.footnotes = footnotes$$1;

    this.nodes = document.createElement('dl');
    this.nodes.id = footnotes.id;
    this.nodes.classList.add(classNames.footnotesContainer);
    for (let footnote of footnotes$$1) {
      let index = document.createElement('dt');
      index.innerHTML = footnote.index;
      this.nodes.appendChild(index);
      let text = document.createElement('dd');
      text.innerHTML = footnote.text;
      this.nodes.appendChild(text);
    }
  }

    /**
     * Returns an HTML representation of a Footnotes object.
     * @returns {HTMLElement} An HTML representation of a Footnotes object.
     */
  get html () {
    return this.nodes
  }
}

/**
 * Represents a single view.
 */
class View {
    /**
     * Initializes a View object with options. There is at least one view per part of speech,
     * but there could be several views for the same part of speech that show different table representation of a view.
     * @param {Object} viewOptions
     */
  constructor () {
        // this.options = viewOptions;
    this.pageHeader = {};

        // An HTML element where this view is rendered
    this.container = undefined;

        // Must be implemented in a descendant
    this.id = 'baseView';
    this.name = 'base view';
    this.title = 'Base View';
    this.language = undefined;
    this.partOfSpeech = undefined;
  }

    /**
     * Converts a WordData, returned from inflection tables library, into an HTML representation of an inflection table
     * and inserts that HTML into a `container` HTML element. `messages` provides a translation for view's texts.
     * @param {HTMLElement} container - An HTML element where this view will be inserted.
     * @param {WordData} wordData - A result set from inflection tables library.
     * @param {MessageBundle} messages - A message bundle with message translations.
     */
  render (container, wordData, messages) {
    'use strict';

    this.messages = messages;
    this.container = container;
    this.wordData = wordData;
    let selection = wordData[this.partOfSpeech];

    this.footnotes = new Footnotes(selection.footnotes);

        // this.table = new Table(selection.suffixes, this.groupingFeatures, messages);
        // this.table = new Table();
        // this.setTableData();
    this.table.messages = messages;
    this.table.construct(selection.suffixes).constructViews();
    this.display();
  }

    /**
     * Renders a view's HTML representation and inserts it into `container` HTML element.
     */
  display () {
        // Clear the container
    this.container.innerHTML = '';

    let word = document.createElement('h2');
    word.innerHTML = this.wordData.homonym.targetWord;
    this.container.appendChild(word);

    let title = document.createElement('h3');
    title.innerHTML = this.title;
    this.container.appendChild(title);

    this.pageHeader = { nodes: document.createElement('div') };
    this.pageHeader.nodes.innerHTML = pageHeader.html;
    this.pageHeader.hideEmptyColumnsBtn = this.pageHeader.nodes.querySelector(pageHeader.hideEmptyColumnsBtnSel);
    this.pageHeader.showEmptyColumnsBtn = this.pageHeader.nodes.querySelector(pageHeader.showEmptyColumnsBtnSel);
    this.pageHeader.hideNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(pageHeader.hideNoSuffixGroupsBtnSel);
    this.pageHeader.showNoSuffixGroupsBtn = this.pageHeader.nodes.querySelector(pageHeader.showNoSuffixGroupsBtnSel);
    this.container.appendChild(this.pageHeader.nodes);

        // Insert a wide view
    this.container.appendChild(this.table.wideView.render());
        // Insert narrow views
    this.container.appendChild(this.table.narrowView.render());

    this.table.addEventListeners();

    this.container.appendChild(this.footnotes.html);

    this.pageHeader.hideEmptyColumnsBtn.addEventListener('click', this.hideEmptyColumns.bind(this));
    this.pageHeader.showEmptyColumnsBtn.addEventListener('click', this.showEmptyColumns.bind(this));

    this.pageHeader.hideNoSuffixGroupsBtn.addEventListener('click', this.hideNoSuffixGroups.bind(this));
    this.pageHeader.showNoSuffixGroupsBtn.addEventListener('click', this.showNoSuffixGroups.bind(this));
  }

    /**
     * Hides all empty columns of the view.
     */
  hideEmptyColumns () {
    this.table.hideEmptyColumns();
    this.display();
    this.pageHeader.hideEmptyColumnsBtn.classList.add(classNames.hidden);
    this.pageHeader.showEmptyColumnsBtn.classList.remove(classNames.hidden);
  }

    /**
     * Displays all previously hidden columns.
     */
  showEmptyColumns () {
    this.table.showEmptyColumns();
    this.display();
    this.pageHeader.showEmptyColumnsBtn.classList.add(classNames.hidden);
    this.pageHeader.hideEmptyColumnsBtn.classList.remove(classNames.hidden);
  }

    /**
     * Hides groups (formed by first column feature) that have no suffix matches.
     */
  hideNoSuffixGroups () {
    this.table.hideNoSuffixGroups();
    this.display();
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(classNames.hidden);
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(classNames.hidden);
  }

    /**
     * Displays previously hidden groups with no suffix matches.
     */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups();
    this.display();
    this.pageHeader.hideNoSuffixGroupsBtn.classList.add(classNames.hidden);
    this.pageHeader.showNoSuffixGroupsBtn.classList.remove(classNames.hidden);
  }
}

// Import shared language data
// Reexport items for Jest
// Library
exports.languages = languages;
exports.Feature = Feature;
exports.FeatureType = FeatureType;
exports.FeatureImporter = FeatureImporter;
exports.Inflection = Inflection;
exports.Lemma = Lemma;
exports.Lexeme = Lexeme;
exports.Homonym = Homonym;
exports.Suffix = Suffix;
exports.LanguageDataset = LanguageDataset;
exports.LanguageData = LanguageData;
exports.MatchData = MatchData;
exports.Footnote = Footnote;
exports.ResultSet = WordData;

// L10n
exports.LatinLanguageModel = LatinLanguageModel;

// L10n
exports.L10n = {
  MessageBundle: MessageBundle,
  L10n: L10n
};

// Styles
exports.Styles = {
  classNames: classNames,
  wideView: wideView,
  narrowView: narrowView,
  footnotes: footnotes,
  pageHeader: pageHeader
};

// View
exports.View = {
  Cell: Cell,
  RowTitleCell: RowTitleCell,
  HeaderCell: HeaderCell,
  Column: Column,
  Row: Row,
  GroupingFeature: GroupFeatureType,
  GroupingFeatureList: GroupFeatureList,
  WideView: WideView,
  NarrowView: NarrowView,
  NarrowViewGroup: NarrowViewGroup,
  Table: Table,
  Footnotes: Footnotes,
  View: View
};

})));
