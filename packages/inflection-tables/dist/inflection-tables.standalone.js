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
const STR_LANG_CODE_FAS = 'fas';
const STR_LANG_CODE_PER = 'per';
const STR_LANG_CODE_FA_IR = 'fa-IR';
const STR_LANG_CODE_FA = 'fa';
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
// Classes (of pronouns in Latin)
const CLASS_PERSONAL = 'personal';
const CLASS_REFLEXIVE = 'reflexive';
const CLASS_POSSESSIVE = 'possessive';
const CLASS_DEMONSTRATIVE = 'demonstrative';
const CLASS_RELATIVE = 'relative';
const CLASS_INTERROGATIVE = 'interrogative';
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
	STR_LANG_CODE_FAS: STR_LANG_CODE_FAS,
	STR_LANG_CODE_PER: STR_LANG_CODE_PER,
	STR_LANG_CODE_FA_IR: STR_LANG_CODE_FA_IR,
	STR_LANG_CODE_FA: STR_LANG_CODE_FA,
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
	TYPE_REGULAR: TYPE_REGULAR,
	CLASS_PERSONAL: CLASS_PERSONAL,
	CLASS_REFLEXIVE: CLASS_REFLEXIVE,
	CLASS_POSSESSIVE: CLASS_POSSESSIVE,
	CLASS_DEMONSTRATIVE: CLASS_DEMONSTRATIVE,
	CLASS_RELATIVE: CLASS_RELATIVE,
	CLASS_INTERROGATIVE: CLASS_INTERROGATIVE
});

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
     * @param {String | Symbol} language - A language of a feature type.
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
    this.languageID = undefined;
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LanguageModelFactory.getLanguageAttrs(language));

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
          this[element] = new Feature(element, this.type, this.languageID);
          this._orderLookup[element] = index;
        }
      } else {
        this[value] = new Feature(value, this.type, this.languageID);
        this._orderLookup[value] = index;
      }
    }
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`);
    return this.languageCode
  }

  /**
   * test to see if this FeatureType allows unrestricted values
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue () {
    return this.orderedValues.length === 1 && this.orderedValues[0] === FeatureType.UNRESTRICTED_VALUE
  }

    /**
     * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
     * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
     * @param value
     * @param {int} sortOrder
     * @returns {Feature}
     */
  get (value, sortOrder = 1) {
    if (value) {
      return new Feature(value, this.type, this.languageID, sortOrder)
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
    return this.orderedValues.map((value) => new Feature(value, this.type, this.languageID))
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

          if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
            throw new Error(`Trying to order an element with language "${element.languageID.toString()}" that is different from "${this.languageID.toString()}"`)
          }
        }
      } else {
        if (!this.hasOwnProperty(value.value)) {
          throw new Error('Trying to order an element with "' + value.value + '" value that is not stored in a "' + this.type + '" type.')
        }

        if (value.type !== this.type) {
          throw new Error('Trying to order an element with type "' + value.type + '" that is different from "' + this.type + '".')
        }

        if (!LanguageModelFactory.compareLanguages(value.languageID, this.languageID)) {
          throw new Error(`Trying to order an element with language "${value.languageID.toString()}" that is different from "${this.languageID.toString()}"`)
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
FeatureType.UNRESTRICTED_VALUE = Symbol('unrestricted');

class InflectionGroupingKey {
  /**
   * @constructor
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {Map} extras extra property name and value pairs used in the key
   */
  constructor (infl, features, extras = {}) {
    for (let feature of features) {
      this[feature] = infl[feature];
    }
    Object.assign(this, extras);
  }

  /**
   * checks if a feature with a specific value
   * is included in the grouping key
   * @returns {boolean} true if found, false if not
   */
  hasFeatureValue (feature, value) {
    for (let f of this[feature]) {
      if (f.hasValue(value)) {
        return true
      }
    }
    return false
  }

  /**
   * Return this key as a string
   * @returns {string} string representation of the key
   */
  toString () {
    let values = [];
    for (let prop of Object.getOwnPropertyNames(this).sort()) {
      if (Array.isArray(this[prop])) {
        values.push(this[prop].map((x) => x.toString()).sort().join(','));
      } else {
        values.push(this[prop]);
      }
    }
    return values.join(' ')
  }
}

class InflectionGroup {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   */
  constructor (groupingKey, inflections = [], sortKey = null) {
    this.groupingKey = groupingKey;
    this.inflections = inflections;
  }

  /**
   * Add an Inflection or InflectionGroup to the group
   * @param {Inflection|InflectionGroup} inflection
   */
  append (inflection) {
    this.inflections.push(inflection);
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
    // some general, non-language specific grammatical features
    features[Feature.types.age] = new FeatureType(Feature.types.age,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.area] = new FeatureType(Feature.types.area,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.source] = new FeatureType(Feature.types.source,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.frequency] = new FeatureType(Feature.types.frequency,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.geo] = new FeatureType(Feature.types.geo,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.source] = new FeatureType(Feature.types.source,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.pronunciation] = new FeatureType(Feature.types.pronunciation,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.kind] = new FeatureType(Feature.types.kind,
      [FeatureType.UNRESTRICTED_VALUE], code);
    features[Feature.types.comparison] = new FeatureType(Feature.types.comparison,
      [COMP_POSITIVE, COMP_SUPERLATIVE, COMP_COMPARITIVE], code);
    return features
  }

  /**
   * Identify the morphological features which should be linked to a grammar.
   * @returns {String[]} Array of Feature types
   */
  grammarFeatures () {
    return []
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
   * Return alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns an array of alternate encodinges
   */
  alternateWordEncodings (word, preceding = null, folloiwng = null, encoding = null) {
    return []
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

  /*
  There are two types of language identificators: language IDs and language code. Language ID is a symbol constant
  defined in constants.js, such as LANG_LATIN or LANG_GREEK. Language code is a string containing (usually)
  a three-letter language codes such as 'lat' or 'la' for latin. There can be multiple language codes that identify
  the same language, but there is only one unique language ID for each language.
   */

  /**
   * Returns an array of language codes that represents the language.
   * @return {String[]} An array of language codes that matches the language.
   */
  static get codes () {
    return []
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @param {String[]} codes - Array of language codes a specific language has
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCodeInList (languageCode, codes) {
    if (LanguageModel.isLanguageCode(languageCode)) {
      return codes.includes(languageCode)
    } else {
      throw new Error(`Format of a "${languageCode}" is incorrect`)
    }
  }

  /**
   * Tests wither a provided language identificator is a language ID.
   * @param {Symbol | string} language - A language identificator, either a Symbol or a string language code.
   * @return {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID (language) {
    return (typeof language === 'symbol')
  }

  /**
   * Tests wither a provided language identificator is a language code.
   * @param {Symbol | string} language - A language identificator, either a Symbol or a string language code.
   * @return {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode (language) {
    return !LanguageModel.isLanguageID(language)
  }

  /**
   * Groups a set of inflections according to a language-specific display paradigm
   * The default groups according to the following logic:
   *   1. groups of groups with unique stem, prefix, suffix, part of speech dialect and comparison
   *     2. groups of those groups with unique
   *          number, if it's an inflection with a grammatical case
   *          tense, if it's an inflection with tense but no case (i.e. a verb)
   *          verbs without tense or case
   *          adverbs
   *          everything else
   *       3. groups of those groups with unique voice and tense
   *         4. groups of inflections with unique gender, person, mood, and sort
   */
  groupInflectionsForDisplay (inflections) {
    let grouped = new Map();

    // group inflections by part of speech
    for (let infl of inflections) {
      let groupingKey = new InflectionGroupingKey(infl,
        [Feature.types.part, Feature.types.dialect, Feature.types.comparison],
        { prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
        );
      let groupingKeyStr = groupingKey.toString();
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl);
      } else {
        grouped.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
      }
    }

    // iterate through each group key to group the inflections in that group
    for (let kv of grouped) {
      let inflgrp = new Map();
      for (let infl of kv[1].inflections) {
        let keyprop;
        let isCaseInflectionSet = false;
        if (infl[Feature.types.grmCase]) {
          // grouping on number if case is defined
          keyprop = Feature.types.number;
          isCaseInflectionSet = true;
        } else if (infl[Feature.types.tense]) {
          // grouping on tense if tense is defined but not case
          keyprop = Feature.types.tense;
        } else if (infl[Feature.types.part] === POFS_VERB) {
          // grouping on no case or tense but a verb
          keyprop = Feature.types.part;
        } else if (infl[Feature.types.part] === POFS_ADVERB) {
          keyprop = Feature.types.part;
          // grouping on adverbs without case or tense
        } else {
          keyprop = 'misc';
          // grouping on adverbs without case or tense
          // everything else
        }
        let groupingKey = new InflectionGroupingKey(infl, [keyprop], {isCaseInflectionSet: isCaseInflectionSet});
        let groupingKeyStr = groupingKey.toString();
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl);
        } else {
          inflgrp.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
        }
      }
      // inflgrp is now a map of groups of inflections grouped by
      //  inflections with number
      //  inflections without number but with tense
      //  inflections of verbs without tense
      //  inflections of adverbs
      //  everything else
      // iterate through each inflection group key to group the inflections in that group by tense and voice
      for (let kv of inflgrp) {
        let nextGroup = new Map();
        let sortOrder = new Map();
        for (let infl of kv[1].inflections) {
          let sortkey = infl[Feature.types.grmCase] ? Math.max(infl[Feature.types.grmCase].map((f) => { return f.sortOrder })) : 1;
          let groupingKey = new InflectionGroupingKey(infl, [Feature.types.tense, Feature.types.voice]);
          let groupingKeyStr = groupingKey.toString();
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl);
          } else {
            nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl], sortkey));
            sortOrder.set(groupingKeyStr, sortkey);
          }
        }
        kv[1].inflections = [];
        let sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            let orderA = sortOrder.get(a);
            let orderB = sortOrder.get(b);
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        );
        for (let groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey));
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (let kv of inflgrp) {
        let groups = kv[1];
        for (let group of groups.inflections) {
          let nextGroup = new Map();
          for (let infl of group.inflections) {
            // set key is case comp gend pers mood sort
            let groupingKey = new InflectionGroupingKey(infl,
              [Feature.types.grmCase, Feature.types.comparison, Feature.types.gender, Feature.types.number, Feature.types.person,
                Feature.types.tense, Feature.types.mood, Feature.types.sort, Feature.types.voice]);
            let groupingKeyStr = groupingKey.toString();
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl);
            } else {
              nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
            }
          }
          group.inflections = Array.from(nextGroup.values()); // now a group of inflection groups
        }
      }
      kv[1].inflections = Array.from(inflgrp.values());
    }
    return Array.from(grouped.values())
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
    this.sourceLanguage = LatinLanguageModel.sourceLanguage; // For compatibility, should use a static method instead
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_LTR;
    this.baseUnit = LANG_UNIT_WORD;
    this.codes = LatinLanguageModel.codes; // To keep compatibility with existing code
    this.features = this._initializeFeatures();
  }

  static get sourceLanguage () {
    return LANG_LATIN
  }

  static get codes () {
    return [STR_LANG_CODE_LA, STR_LANG_CODE_LAT]
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, LatinLanguageModel.codes)
  }

  _initializeFeatures () {
    let features = super._initializeFeatures();
    let code = this.toCode();
    features[Feature.types.grmClass] = new FeatureType(Feature.types.grmClass,
      [ CLASS_PERSONAL,
        CLASS_REFLEXIVE,
        CLASS_POSSESSIVE,
        CLASS_DEMONSTRATIVE,
        CLASS_RELATIVE,
        CLASS_INTERROGATIVE
      ],
      code);
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
    features[Feature.types.mood] = new FeatureType(Feature.types.mood,
      [ MOOD_INDICATIVE,
        MOOD_SUBJUNCTIVE,
        MOOD_IMPERATIVE,
        MOOD_PARTICIPLE
      ], code);
    features[Feature.types.conjugation] = new FeatureType(Feature.types.conjugation,
      [ ORD_1ST,
        ORD_2ND,
        ORD_3RD,
        ORD_4TH
      ], code);
    return features
  }

  /**
   * @override LanguageModel#grammarFeatures
   */
  grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense]
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

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return LatinLanguageModel.toCode()
  }

  static toCode () {
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
    this.sourceLanguage = GreekLanguageModel.sourceLanguage;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_LTR;
    this.baseUnit = LANG_UNIT_WORD;
    this.languageCodes = GreekLanguageModel.codes;
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

  static get sourceLanguage () {
    return LANG_GREEK
  }

  static get codes () {
    return [STR_LANG_CODE_GRC]
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, GreekLanguageModel.codes)
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return GreekLanguageModel.toCode()
  }

  static toCode () {
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
   * @override LanguageModel#grammarFeatures
   */
  grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.voice]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  normalizeWord (word) {
    // we normalize greek to NFC - Normalization Form Canonical Composition
    return word.normalize('NFC')
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // the original alpheios code used the following normalizations
    // 1. When looking up a lemma
    //    stripped vowel length
    //    stripped caps
    //    then if failed, tried again with out these
    // 2. when adding to a word list
    //    precombined unicode (vowel length/diacritics preserved)
    // 2. When looking up a verb in the verb paradigm tables
    //    it set e_normalize to false, otherwise it was true...
    // make sure it's normalized to NFC and in lower case
    let normalized = this.normalizeWord(word).toLocaleLowerCase();
    let strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug, '\u{03B1}').replace(
      /[\u{1FB8}\u{1FB9}]/ug, '\u{0391}').replace(
      /[\u{1FD0}\u{1FD1}]/ug, '\u{03B9}').replace(
      /[\u{1FD8}\u{1FD9}]/ug, '\u{0399}').replace(
      /[\u{1FE0}\u{1FE1}]/ug, '\u{03C5}').replace(
      /[\u{1FE8}\u{1FE9}]/ug, '\u{03A5}').replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug, '');
    let strippedDiaeresis = normalized.replace(
      /\u{0390}/ug, '\u{03AF}').replace(
      /\u{03AA}/ug, '\u{0399}').replace(
      /\u{03AB}/ug, '\u{03A5}').replace(
      /\u{03B0}/ug, '\u{03CD}').replace(
      /\u{03CA}/ug, '\u{03B9}').replace(
      /\u{03CB}/ug, '\u{03C5}').replace(
      /\u{1FD2}/ug, '\u{1F76}').replace(
      /\u{1FD3}/ug, '\u{1F77}').replace(
      /\u{1FD7}/ug, '\u{1FD6}').replace(
      /\u{1FE2}/ug, '\u{1F7A}').replace(
      /\u{1FE3}/ug, '\u{1F7B}').replace(
      /\u{1FE7}/ug, '\u{1FE6}').replace(
      /\u{1FC1}/ug, '\u{1FC0}').replace(
      /\u{1FED}/ug, '\u{1FEF}').replace(
      /\u{1FEE}/ug, '\u{1FFD}').replace(
      /[\u{00A8}\u{0308}]/ug, '');
    if (encoding === 'strippedDiaeresis') {
      return [strippedDiaeresis]
    } else {
      return [strippedVowelLength]
    }
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
    this.sourceLanguage = ArabicLanguageModel.sourceLanguage;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_RTL;
    this.baseUnit = LANG_UNIT_WORD;
    this.languageCodes = ArabicLanguageModel.codes;
    this._initializeFeatures();
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures();
  }

  static get sourceLanguage () {
    return LANG_ARABIC
  }

  static get codes () {
    return [STR_LANG_CODE_ARA, STR_LANG_CODE_AR]
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return ArabicLanguageModel.toCode()
  }

  static toCode () {
    return STR_LANG_CODE_ARA
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, ArabicLanguageModel.codes)
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // tanwin (& tatweel) - drop FATHATAN, DAMMATAN, KASRATAN, TATWEEL
    let tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, '');
    // hamzas - replace ALEF WITH MADDA ABOVE, ALEF WITH HAMZA ABOVE/BELOW with ALEF
    let hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, '\u{0627}');
    // harakat - drop FATHA, DAMMA, KASRA, SUPERSCRIPT ALEF, ALEF WASLA
    let harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, '');
    // shadda
    let shadda = harakat.replace(/\u{0651}/ug, '');
    // sukun
    let sukun = shadda.replace(/\u{0652}/ug, '');
    // alef
    let alef = sukun.replace(/\u{0627}/ug, '');
    let alternates = new Map([
      ['tanwin', tanwin],
      ['hamza', hamza],
      ['harakat', harakat],
      ['shadda', shadda],
      ['sukun', sukun],
      ['alef', alef]
    ]);
    if (encoding !== null && alternates.has(encoding)) {
      return [alternates.get(encoding)]
    } else {
      return Array.from(alternates.values())
    }
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
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
class PersianLanguageModel extends LanguageModel {
   /**
   * @constructor
   */
  constructor () {
    super();
    this.sourceLanguage = PersianLanguageModel.sourceLanguage;
    this.contextForward = 0;
    this.contextBackward = 0;
    this.direction = LANG_DIR_RTL;
    this.baseUnit = LANG_UNIT_WORD;
    this.languageCodes = PersianLanguageModel.codes;
    this._initializeFeatures();
  }

  _initializeFeatures () {
    this.features = super._initializeFeatures();
  }

  static get sourceLanguage () {
    return LANG_PERSIAN
  }

  static get codes () {
    return [STR_LANG_CODE_PER, STR_LANG_CODE_FAS, STR_LANG_CODE_FA, STR_LANG_CODE_FA_IR]
  }

  // For compatibility with existing code, can be replaced with a static version
  toCode () {
    return PersianLanguageModel.toCode()
  }

  static toCode () {
    return STR_LANG_CODE_PER
  }

  /**
   * Checks wither a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Wither this language code exists in a language code list
   */
  static hasCode (languageCode) {
    return LanguageModel.hasCodeInList(languageCode, PersianLanguageModel.codes)
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  canInflect (node) {
    return false
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
  [ STR_LANG_CODE_AR, ArabicLanguageModel ],
  [ STR_LANG_CODE_PER, PersianLanguageModel ]
]);

class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   * @param {String | Symbol} language - Language as a language ID (Symbol) or a language code (String)
   * @return {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    language = (typeof language === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(language) : language;
    return MODELS.has(language)
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

  /**
   * Converts an ISO 639-3 language code to a language ID
   * @param {String} languageCode - An ISO 639-3 language code
   * @return {Symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.sourceLanguage
      }
    }
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   * @param {Symbol} languageID - A language ID
   * @return {String | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.sourceLanguage === languageID) {
        return languageModel.toCode()
      }
    }
  }

  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   * @param {String | Symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @return {Object} An object with the following properties:
   *    {Symbol} languageID
   *    {String} languageCode
   */
  static getLanguageAttrs (language) {
    if (typeof language === 'symbol') {
      // `language` is a language ID
      return {
        languageID: language,
        languageCode: LanguageModelFactory.getLanguageCodeFromId(language)
      }
    } else {
      // `language` is a language code
      return {
        languageID: LanguageModelFactory.getLanguageIdFromCode(language),
        languageCode: language
      }
    }
  }

  /**
   * Compares two languages in either a language ID or a language code format. For this, does conversion of
   * language IDs to language code. Because fo this, it will work even for language IDs defined in
   * different modules
   * @param {String | Symbol} languageA - Either a language ID (a Symbol) or a language code (a String).
   * @param {String | Symbol} languageB - Either a language ID (a Symbol) or a language code (a String).
   * @return {boolean} True if languages are the same, false otherwise.
   */
  static compareLanguages (languageA, languageB) {
    languageA = (typeof languageA === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA;
    languageB = (typeof languageB === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB;
    return languageA === languageB
  }
}

/**
 * This is a temporary placeholder for an i18n library
 */
const i18n = {
  en: {
    feminine: {
      full: 'feminine',
      abbr: 'f'
    },
    masculine: {
      full: 'masculine',
      abbr: 'm'
    },
    neuter: {
      full: 'neuter',
      abbr: 'n'
    }
  }
};

/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class Feature {
    /**
     * Initializes a Feature object
     * @param {string | string[]} value - A single feature value or, if this feature could have multiple
     * values, an array of values.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {String | Symbol} language - A language of a feature, allowed values are specified in 'languages' object.
     * @param {int} sortOrder - an integer used for sorting
     */
  constructor (value, type, language, sortOrder = 1) {
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
    this.languageID = undefined;
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LanguageModelFactory.getLanguageAttrs(language));
    this.sortOrder = sortOrder;
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`);
    return this.languageCode
  }

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && LanguageModelFactory.compareLanguages(this.languageID, feature.languageID);
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      });
      return equal
    } else {
      return this.value === feature.value && this.type === feature.type && LanguageModelFactory.compareLanguages(this.languageID, feature.languageID)
    }
  }

  /**
   * examine the feature for a specific value
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values
   */
  hasValue (value) {
    if (Array.isArray(this.value)) {
      return this.value.includes(value)
    } else {
      return this.value === value
    }
  }

  /**
   * string representation of a feature
   * @return {string}
   */
  toString () {
    if (Array.isArray(this.value)) {
      return this.value.join(',')
    } else {
      return this.value
    }
  }

  /**
   * a locale-specific abbreviation for a feature's values
   * @return {string}
   */
  toLocaleStringAbbr (lang = 'en') {
    if (Array.isArray(this.value)) {
      return this.value.map((v) => this.toLocaleStringAbbr(v, lang))
    } else {
      return i18n[lang][this.value].abbr
    }
  }
}
// Should have no spaces in values in order to be used in HTML templates
Feature.types = {
  word: 'word',
  part: 'part of speech', // Part of speech
  number: 'number',
  'case': 'case',
  grmCase: 'case', // A synonym of `case`
  declension: 'declension',
  gender: 'gender',
  type: 'type',
  'class': 'class',
  grmClass: 'class', // A synonym of `class`
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
  age: 'age',
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

  /* static readObject (jsonObject) {
    if (!jsonObject._type) {
      throw new Error('Extended language data has no type information. Unable to deserialize.')
    } else if (jsonObject._type === ExtendedLanguageData.types().EXTENDED_GREEK_DATA) {
      return ExtendedGreekData.readObject(jsonObject)
    } else {
      throw new Error(`Unsupported extended language data of type "${jsonObject._type}".`)
    }
  } */
}

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} morphemeValue - A suffix text or null if suffix is empty.
   * @param {Function} constructorFunc - A constructor function of a subclass to create subclass instances.
   */
  constructor (morphemeValue, constructorFunc = Morpheme) {
    if (morphemeValue === undefined) {
      throw new Error('Morpheme value should not be empty.')
    }
    this.ConstructorFunc = constructorFunc;
    this.value = morphemeValue;
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
    let suffix = new this.ConstructorFunc(jsonObject.value);

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
    let clone = new this.ConstructorFunc(this.value);
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
   * @param {Feature[]} features - A list of features we need to match with the ones stored inside the suffix
   * @returns {string | undefined} - If provided feature is a match, returns a value of a first feature that matched.
   * If no match found, return undefined.
   */
  featureMatch (featureType, features) {
    if (features && this.features.hasOwnProperty(featureType)) {
      for (let feature of features) {
        if (feature.value === this.features[featureType]) {
          return feature.value
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
    let commonGroups = Morpheme.getCommonGroups([this, suffix]);
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
  static combine (suffixes, mergeFunction = Morpheme.merge) {
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
    let commonGroups = Morpheme.getCommonGroups([suffixA, suffixB]);
    for (let type of commonGroups) {
      // Combine values using a comma separator. Can do anything else if we need to.
      suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
    }
    return suffixA
  };
}

class Suffix extends Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
   */
  constructor (suffixValue) {
    super(suffixValue, Suffix);
  }
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
 * A return value for inflection queries
 */
class InflectionData {
  constructor (homonym) {
    this.homonym = homonym;
    this.languageID = homonym.languageID;
    this[Feature.types.part] = []; // What parts of speech are represented by this object.
  }

  static readObject (jsonObject) {
    // let homonym = Models.Homonym.readObject(jsonObject.homonym)

    let lexicalData = new InflectionData();
    lexicalData[Feature.types.part] = jsonObject[Feature.types.part];

    for (let part of lexicalData[Feature.types.part]) {
      let partData = jsonObject[part];
      lexicalData[part] = {};

      if (partData.suffixes) {
        lexicalData[part].suffixes = [];
        for (let suffix of partData.suffixes) {
          lexicalData[part].suffixes.push(Suffix.readObject(suffix));
        }
      }

      if (partData.footnotes) {
        lexicalData[part].footnotes = [];
        for (let footnote of partData.footnotes) {
          lexicalData[part].footnotes.push(Footnote.readObject(footnote));
        }
      }
    }

    return lexicalData
  }
}

/**
 * Suffix is an ending of a word with none or any grammatical features associated with it.
 * Features are stored in properties whose names are type of a grammatical feature (i.e. case, gender, etc.)
 * Each feature can have a single or multiple values associated with it (i.e. gender can be either 'masculine',
 * a single value, or 'masculine' and 'feminine'. That's why all values are stored in an array.
 */
class Form extends Morpheme {
  /**
   * Initializes a Suffix object.
   * @param {string | null} suffixValue - A suffix text or null if suffix is empty.
   */
  constructor (suffixValue) {
    super(suffixValue, Form);
  }
}

/**
 * Stores inflection language data
 */
class LanguageDataset {
  /**
   * Initializes a LanguageDataset.
   * @param {string} languageID - A language ID of a data set.
   */
  constructor (languageID) {
    if (!languageID) {
      // Language is not supported
      throw new Error('Language ID cannot be empty.')
    }

    this.languageID = languageID;
    this.suffixes = []; // An array of suffixes.
    this.forms = []; // An array of suffixes.
    this.footnotes = []; // Footnotes
  };

  /**
   * Each grammatical feature can be either a single or an array of Feature objects. The latter is the case when
   * an ending can belong to several grammatical features at once (i.e. belong to both 'masculine' and
   * 'feminine' genders
   *
   * @param {string | null} itemValue - A text of an item. It is either a string or null if there is no suffix.
   * @param {string} itemType - either LanguageDataset.FORM or LanguageDataset.SUFFIX
   * @param {Feature[]} featureValue
   * @return {Suffix} A newly added data value (Form or Suffix) (can be used to add more data to the suffix).
   */
  addItem (itemValue, itemType, featureValue, extendedLangData) {
    // TODO: implement run-time error checking
    let item;
    let store;
    if (itemType === LanguageDataset.SUFFIX) {
      item = new Suffix(itemValue);
      store = this.suffixes;
    } else if (itemType === LanguageDataset.FORM) {
      item = new Form(itemValue);
      store = this.forms;
    } else {
      throw new Error(`Unknown item type "${itemType}"`)
    }
    item.extendedLangData = extendedLangData;

    // Build all possible combinations of features
    let multiValueFeatures = [];

    // Go through all features provided
    for (let feature of featureValue) {
      // If this is a footnote. Footnotes should go in a flat array
      // because we don't need to split by them
      if (feature.type === Feature.types.footnote) {
        item[Feature.types.footnote] = item[Feature.types.footnote] || [];
        item[Feature.types.footnote].push(feature.value);
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
        item.features[feature.type] = feature.value;
      }
    }

    // Create a copy of an Suffix object for each multi-value item
    if (multiValueFeatures.length > 0) {
      for (let featureGroup of multiValueFeatures) {
        let endingItems = item.split(featureGroup.type, featureGroup.features);
        store.push(...endingItems);
      }
    } else {
      store.push(item);
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
    let result = new InflectionData(homonym);
    let inflections = {};

    // Find partial matches first, and then full among them

    // TODO: do we ever need lemmas?
    for (let lexema of homonym.lexemes) {
      for (let inflection of lexema.inflections) {
        // add the lemma to the inflection
        inflection[Feature.types.word] =
          [new Feature(lexema.lemma.word, Feature.types.word, lexema.lemma.language)];
        // Group inflections by a part of speech
        let partOfSpeech = inflection[Feature.types.part];
        if (!partOfSpeech) {
          throw new Error('Part of speech data is missing in an inflection')
        }
        if (!Array.isArray(partOfSpeech)) {
          throw new Error('Part of speech data should be in an array format')
        }
        if (partOfSpeech.length === 0 && partOfSpeech.length > 1) {
          throw new Error('Part of speech data should be an array with exactly one element')
        }
        partOfSpeech = partOfSpeech[0].value;

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
        let items = this.forms.reduce(this['reducer'].bind(this, inflectionsGroup, LanguageDataset.FORM), []);
        if (items.length === 0) {
          items = this.suffixes.reduce(this['reducer'].bind(this, inflectionsGroup, LanguageDataset.SUFFIX), []);
        }
        result[partOfSpeech].suffixes = items;
        result[partOfSpeech].footnotes = [];

        // Create a set so all footnote indexes be unique
        let footnotesIndex = new Set();
        // Scan all selected suffixes to build a unique set of footnote indexes
        for (let item of result[partOfSpeech].suffixes) {
          if (item.hasOwnProperty(Feature.types.footnote)) {
            // Footnote indexes are stored in an array
            for (let index of item[Feature.types.footnote]) {
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

  reducer (inflections, type, accumulator, item) {
    let result = this.matcher(inflections, type, item);
    if (result) {
      accumulator.push(result);
    }
    return accumulator
  }
}
LanguageDataset.SUFFIX = 'suffix';
LanguageDataset.FORM = 'form';

var nounSuffixesCSV = "Ending,Number,Case,Declension,Gender,Type,Footnote\na,singular,nominative,1st,feminine,regular,\nē,singular,nominative,1st,feminine,irregular,\nēs,singular,nominative,1st,feminine,irregular,\nā,singular,nominative,1st,feminine,irregular,7\nus,singular,nominative,2nd,masculine feminine,regular,\ner,singular,nominative,2nd,masculine feminine,regular,\nir,singular,nominative,2nd,masculine feminine,regular,\n-,singular,nominative,2nd,masculine feminine,irregular,\nos,singular,nominative,2nd,masculine feminine,irregular,1\nōs,singular,nominative,2nd,masculine feminine,irregular,\nō,singular,nominative,2nd,masculine feminine,irregular,7\num,singular,nominative,2nd,neuter,regular,\nus,singular,nominative,2nd,neuter,irregular,10\non,singular,nominative,2nd,neuter,irregular,7\n-,singular,nominative,3rd,masculine feminine,regular,\nos,singular,nominative,3rd,masculine feminine,irregular,\nōn,singular,nominative,3rd,masculine feminine,irregular,7\n-,singular,nominative,3rd,neuter,regular,\nus,singular,nominative,4th,masculine feminine,regular,\nū,singular,nominative,4th,neuter,regular,\nēs,singular,nominative,5th,feminine,regular,\nae,singular,genitive,1st,feminine,regular,\nāī,singular,genitive,1st,feminine,irregular,1\nās,singular,genitive,1st,feminine,irregular,2\nēs,singular,genitive,1st,feminine,irregular,7\nī,singular,genitive,2nd,masculine feminine,regular,\nō,singular,genitive,2nd,masculine feminine,irregular,7\nī,singular,genitive,2nd,neuter,regular,\nis,singular,genitive,3rd,masculine feminine,regular,\nis,singular,genitive,3rd,neuter,regular,\nūs,singular,genitive,4th,masculine feminine,regular,\nuis,singular,genitive,4th,masculine feminine,irregular,1\nuos,singular,genitive,4th,masculine feminine,irregular,1\nī,singular,genitive,4th,masculine feminine,irregular,15\nūs,singular,genitive,4th,neuter,regular,\nēī,singular,genitive,5th,feminine,regular,\neī,singular,genitive,5th,feminine,regular,\nī,singular,genitive,5th,feminine,irregular,\nē,singular,genitive,5th,feminine,irregular,\nēs,singular,genitive,5th,feminine,irregular,6\nae,singular,dative,1st,feminine,regular,\nāī,singular,dative,1st,feminine,irregular,1\nō,singular,dative,2nd,masculine feminine,regular,\nō,singular,dative,2nd,neuter,regular,\nī,singular,dative,3rd,masculine feminine,regular,\ne,singular,dative,3rd,masculine feminine,irregular,17\nī,singular,dative,3rd,neuter,regular,\nūī,singular,dative,4th,masculine feminine,regular,\nū,singular,dative,4th,masculine feminine,regular,\nū,singular,dative,4th,neuter,regular,\nēī,singular,dative,5th,feminine,regular,\neī,singular,dative,5th,feminine,regular,\nī,singular,dative,5th,feminine,irregular,\nē,singular,dative,5th,feminine,irregular,6\nam,singular,accusative,1st,feminine,regular,\nēn,singular,accusative,1st,feminine,irregular,\nān,singular,accusative,1st,feminine,irregular,7\num,singular,accusative,2nd,masculine feminine,regular,\nom,singular,accusative,2nd,masculine feminine,irregular,1\nōn,singular,accusative,2nd,masculine feminine,irregular,7\num,singular,accusative,2nd,neuter,regular,\nus,singular,accusative,2nd,neuter,irregular,10\non,singular,accusative,2nd,neuter,irregular,7\nem,singular,accusative,3rd,masculine feminine,regular,\nim,singular,accusative,3rd,masculine feminine,irregular,11\na,singular,accusative,3rd,masculine feminine,irregular,7\n-,singular,accusative,3rd,neuter,regular,\num,singular,accusative,4th,masculine feminine,regular,\nū,singular,accusative,4th,neuter,regular,\nem,singular,accusative,5th,feminine,regular,\nā,singular,ablative,1st,feminine,regular,\nād,singular,ablative,1st,feminine,irregular,5\nē,singular,ablative,1st,feminine,irregular,7\nō,singular,ablative,2nd,masculine feminine,regular,\nōd,singular,ablative,2nd,masculine feminine,irregular,1\nō,singular,ablative,2nd,neuter,regular,\ne,singular,ablative,3rd,masculine feminine,regular,\nī,singular,ablative,3rd,masculine feminine,irregular,11\ne,singular,ablative,3rd,neuter,regular,\nī,singular,ablative,3rd,neuter,irregular,11\nū,singular,ablative,4th,masculine feminine,regular,\nūd,singular,ablative,4th,masculine feminine,irregular,1\nū,singular,ablative,4th,neuter,regular,\nē,singular,ablative,5th,feminine,regular,\nae,singular,locative,1st,feminine,regular,\nō,singular,locative,2nd,masculine feminine,regular,\nō,singular,locative,2nd,neuter,regular,\ne,singular,locative,3rd,masculine feminine,regular,\nī,singular,locative,3rd,masculine feminine,regular,\nī,singular,locative,3rd,neuter,regular,\nū,singular,locative,4th,masculine feminine,regular,\nū,singular,locative,4th,neuter,regular,\nē,singular,locative,5th,feminine,regular,\na,singular,vocative,1st,feminine,regular,\nē,singular,vocative,1st,feminine,irregular,\nā,singular,vocative,1st,feminine,irregular,7\ne,singular,vocative,2nd,masculine feminine,regular,\ner,singular,vocative,2nd,masculine feminine,regular,\nir,singular,vocative,2nd,masculine feminine,regular,\n-,singular,vocative,2nd,masculine feminine,irregular,\nī,singular,vocative,2nd,masculine feminine,irregular,8\nōs,singular,vocative,2nd,masculine feminine,irregular,\ne,singular,vocative,2nd,masculine feminine,irregular,7\num,singular,vocative,2nd,neuter,regular,\non,singular,vocative,2nd,neuter,irregular,7\n-,singular,vocative,3rd,masculine feminine,regular,\n-,singular,vocative,3rd,neuter,regular,\nus,singular,vocative,4th,masculine feminine,regular,\nū,singular,vocative,4th,neuter,regular,\nēs,singular,vocative,5th,feminine,regular,\nae,plural,nominative,1st,feminine,regular,\nī,plural,nominative,2nd,masculine feminine,regular,\noe,plural,nominative,2nd,masculine feminine,irregular,7 9\na,plural,nominative,2nd,neuter,regular,\nēs,plural,nominative,3rd,masculine feminine,regular,\nes,plural,nominative,3rd,masculine feminine,irregular,7\na,plural,nominative,3rd,neuter,regular,\nia,plural,nominative,3rd,neuter,irregular,11\nūs,plural,nominative,4th,masculine feminine,regular,\nua,plural,nominative,4th,neuter,regular,\nēs,plural,nominative,5th,feminine,regular,\nārum,plural,genitive,1st,feminine,regular,\num,plural,genitive,1st,feminine,irregular,3\nōrum,plural,genitive,2nd,masculine feminine,regular,\num,plural,genitive,2nd,masculine feminine,irregular,\nom,plural,genitive,2nd,masculine feminine,irregular,8\nōrum,plural,genitive,2nd,neuter,regular,\num,plural,genitive,2nd,neuter,irregular,\num,plural,genitive,3rd,masculine feminine,regular,\nium,plural,genitive,3rd,masculine feminine,irregular,11\nōn,plural,genitive,3rd,masculine feminine,irregular,7\num,plural,genitive,3rd,neuter,regular,\nium,plural,genitive,3rd,neuter,irregular,11\nuum,plural,genitive,4th,masculine feminine,regular,\num,plural,genitive,4th,masculine feminine,irregular,16\nuom,plural,genitive,4th,masculine feminine,irregular,1\nuum,plural,genitive,4th,neuter,regular,\nērum,plural,genitive,5th,feminine,regular,\nīs,plural,dative,1st,feminine,regular,\nābus,plural,dative,1st,feminine,irregular,4\neis,plural,dative,1st,feminine,irregular,6\nīs,plural,dative,2nd,masculine feminine,regular,\nīs,plural,dative,2nd,neuter,regular,\nibus,plural,dative,3rd,masculine feminine,regular,\nibus,plural,dative,3rd,neuter,regular,\nibus,plural,dative,4th,masculine feminine,regular,\nubus,plural,dative,4th,masculine feminine,irregular,14\nibus,plural,dative,4th,neuter,regular,\nēbus,plural,dative,5th,feminine,regular,\nās,plural,accusative,1st,feminine,regular,\nōs,plural,accusative,2nd,masculine feminine,regular,\na,plural,accusative,2nd,neuter,regular,\nēs,plural,accusative,3rd,masculine feminine,regular,\nīs,plural,accusative,3rd,masculine feminine,irregular,11\nas,plural,accusative,3rd,masculine feminine,irregular,7\na,plural,accusative,3rd,neuter,regular,\nia,plural,accusative,3rd,neuter,irregular,11\nūs,plural,accusative,4th,masculine feminine,regular,\nua,plural,accusative,4th,neuter,regular,\nēs,plural,accusative,5th,feminine,regular,\nīs,plural,ablative,1st,feminine,regular,\nābus,plural,ablative,1st,feminine,irregular,4\neis,plural,ablative,1st,feminine,irregular,6\nīs,plural,ablative,2nd,masculine feminine,regular,\nīs,plural,ablative,2nd,neuter,regular,\nibus,plural,ablative,3rd,masculine feminine,regular,\nibus,plural,ablative,3rd,neuter,regular,\nibus,plural,ablative,4th,masculine feminine,regular,\nubus,plural,ablative,4th,masculine feminine,irregular,14\nibus,plural,ablative,4th,neuter,regular,\nēbus,plural,ablative,5th,feminine,regular,\nīs,plural,locative,1st,feminine,regular,\nīs,plural,locative,2nd,masculine feminine,regular,\nīs,plural,locative,2nd,neuter,regular,\nibus,plural,locative,3rd,masculine feminine,regular,\nibus,plural,locative,3rd,neuter,regular,\nibus,plural,locative,4th,masculine feminine,regular,\nibus,plural,locative,4th,neuter,regular,\nēbus,plural,locative,5th,feminine,regular,\nae,plural,vocative,1st,feminine,regular,\nī,plural,vocative,2nd,masculine feminine,regular,\na,plural,vocative,2nd,neuter,regular,\nēs,plural,vocative,3rd,masculine feminine,regular,\na,plural,vocative,3rd,neuter,regular,\nia,plural,vocative,3rd,neuter,irregular,11\nūs,plural,vocative,4th,masculine feminine,regular,\nua,plural,vocative,4th,neuter,regular,\nēs,plural,vocative,5th,feminine,regular,";

var nounFootnotesCSV = "Index,Text\n1,archaic (final s and m of os and om may be omitted in inscriptions)\n2,only in familiās\n3,especially in Greek patronymics and compounds in -gena and -cola.\n4,always in deābus and filiābus; rarely with other words to distinguish the female\n5,archaic\n6,rare\n7,\"may occur in words of Greek origin. The forms of many Greek nouns vary among the first, second and third declensions.\"\n8,proper names in ius and filius and genius\n9,poetic\n10,\"only pelagus, vīrus, and sometimes vulgus\"\n11,may occur with i-stems\n12,several nouns (most commonly domus) show forms of both second and fourth declensions\n13,\"some nouns also have forms from the first declension (eg materia, saevitia) or the third declension (eg requiēs, satiēs, plēbēs, famēs)\"\n14,\"Always in partus and tribus, usually in artus and lacus, sometimes in other words, eg portus and specus\"\n15,Often in names of plants and trees and in nouns ending in -tus\n16,When pronounced as one syllable\n17,early\n18,dies and meridies are masculine";

var pronounFormsCSV = "Class,Person,Number,Case,Type,Form,Alt,Footnote\npersonal,1st,singular,nominative,regular,ego,,\npersonal,1st,singular,genitive,regular,meI,,\npersonal,1st,singular,genitive,irregular,mIs,,1\npersonal,1st,singular,dative,regular,mihi,,\npersonal,1st,singular,dative,irregular,mI,,\npersonal,1st,singular,accusative,regular,mE,,\npersonal,1st,singular,accusative,irregular,mEmE,,\npersonal,1st,singular,ablative,regular,mE,,\npersonal,1st,singular,ablative,irregular,mEmE,,\npersonal,1st,singular,vocative,,,,\npersonal,2nd,singular,nominative,regular,tU,,\npersonal,2nd,singular,genitive,regular,tuI,,\npersonal,2nd,singular,genitive,irregular,tIs,,1\npersonal,2nd,singular,dative,regular,tibi,,\npersonal,2nd,singular,accusative,regular,tE,,\npersonal,2nd,singular,accusative,irregular,tEtE,,\npersonal,2nd,singular,ablative,regular,tE,,\npersonal,2nd,singular,ablative,irregular,tEtE,,\npersonal,2nd,singular,vocative,regular,tU,,\npersonal,1st,plural,nominative,regular,nOs,,\npersonal,1st,plural,genitive,regular,nostrum,,\npersonal,1st,plural,dative,regular,nObIs,,\npersonal,1st,plural,accusative,regular,nOs,,\npersonal,1st,plural,ablative,regular,nObIs,,\npersonal,1st,plural,vocative,,,,\npersonal,2nd,plural,nominative,regular,vOs,,\npersonal,2nd,plural,genitive,regular,vestrum,,\npersonal,2nd,plural,genitive,regular,vestrI,,\npersonal,2nd,plural,genitive,irregular,vostrum,,\npersonal,2nd,plural,genitive,irregular,vostrI,,\npersonal,2nd,plural,dative,regular,vObIs,,\npersonal,2nd,plural,accusative,regular,vOs,,\npersonal,2nd,plural,ablative,regular,vObIs,,\npersonal,2nd,plural,vocative,regular,vOs,,\nreflexive,3rd,singular,nominative,,,,\nreflexive,3rd,singular,genitive,regular,suI,,\nreflexive,3rd,singular,dative,regular,sibi,,\nreflexive,3rd,singular,accusative,regular,sE,,\nreflexive,3rd,singular,accusative,irregular,sEsE,,\nreflexive,3rd,singular,ablative,regular,sE,,\nreflexive,3rd,singular,ablative,irregular,sEsE,,\nreflexive,3rd,singular,vocative,,,,\nreflexive,3rd,plural,nominative,,,,\nreflexive,3rd,plural,genitive,regular,suI,,\nreflexive,3rd,plural,dative,regular,sibi,,\nreflexive,3rd,plural,accusative,regular,sE,,\nreflexive,3rd,plural,accusative,irregular,sEsE,,\nreflexive,3rd,plural,ablative,regular,sE,,\nreflexive,3rd,plural,ablative,irregular,sEsE,,\nreflexive,3rd,plural,vocative,,,,\npossessive,1st,singular,nominative,regular,meus,,\npossessive,1st,singular,genitive,regular,meI,,\npossessive,1st,singular,dative,regular,meO,,\npossessive,1st,singular,accusative,regular,meum,,\npossessive,1st,singular,ablative,regular,meO,,\npossessive,1st,singular,vocative,regular,mI,,\npossessive,1st,singular,vocative,irregular,meus,,\npossessive,1st,singular,nominative,regular,mea,,\npossessive,1st,singular,genitive,regular,meae,,\npossessive,1st,singular,dative,regular,meae,,\npossessive,1st,singular,accusative,regular,meam,,\npossessive,1st,singular,ablative,regular,meA,,\npossessive,1st,singular,vocative,regular,mea,,\npossessive,1st,singular,nominative,regular,meum,,\npossessive,1st,singular,genitive,regular,meI,,\npossessive,1st,singular,dative,regular,meO,,\npossessive,1st,singular,accusative,regular,meum,,\npossessive,1st,singular,ablative,regular,meO,,\npossessive,1st,singular,vocative,regular,meum,,\npossessive,2nd,singular,nominative,regular,tuus,,\npossessive,2nd,singular,genitive,regular,tuI,,\npossessive,2nd,singular,dative,regular,tuO,,\npossessive,2nd,singular,accusative,regular,tuum,,\npossessive,2nd,singular,ablative,regular,tuO,,\npossessive,2nd,singular,vocative,,,,\npossessive,2nd,singular,nominative,regular,tua,,\npossessive,2nd,singular,genitive,regular,tuae,,\npossessive,2nd,singular,dative,regular,tuae,,\npossessive,2nd,singular,accusative,regular,tuam,,\npossessive,2nd,singular,ablative,regular,tuA,,\npossessive,2nd,singular,vocative,,,,\npossessive,2nd,singular,nominative,regular,tuum,,\npossessive,2nd,singular,genitive,regular,tuI,,\npossessive,2nd,singular,dative,regular,tuO,,\npossessive,2nd,singular,accusative,regular,tuum,,\npossessive,2nd,singular,ablative,regular,tuO,,\npossessive,2nd,singular,vocative,,,,\npossessive,3rd,singular,nominative,regular,suus,,\npossessive,3rd,singular,genitive,regular,suI,,\npossessive,3rd,singular,dative,regular,suO,,\npossessive,3rd,singular,accusative,regular,suum,,\npossessive,3rd,singular,ablative,regular,suO,,\npossessive,3rd,singular,vocative,,,,\npossessive,3rd,singular,nominative,regular,sua,,\npossessive,3rd,singular,genitive,regular,suae,,\npossessive,3rd,singular,dative,regular,suae,,\npossessive,3rd,singular,accusative,regular,suam,,\npossessive,3rd,singular,ablative,regular,suA,,\npossessive,3rd,singular,vocative,,,,\npossessive,3rd,singular,nominative,regular,suum,,\npossessive,3rd,singular,genitive,regular,suI,,\npossessive,3rd,singular,dative,regular,suO,,\npossessive,3rd,singular,accusative,regular,suum,,\npossessive,3rd,singular,ablative,regular,suO,,\npossessive,3rd,singular,vocative,,,,\npossessive,1st,plural,nominative,regular,meI,,\npossessive,1st,plural,genitive,regular,meOrum,,\npossessive,1st,plural,dative,regular,meIs,,\npossessive,1st,plural,accusative,regular,meOs,,\npossessive,1st,plural,ablative,regular,meIs,,\npossessive,1st,plural,vocative,regular,meI,,\npossessive,1st,plural,nominative,regular,meae,,\npossessive,1st,plural,genitive,regular,meArum,,\npossessive,1st,plural,dative,,,,\npossessive,1st,plural,accusative,regular,meAs,,\npossessive,1st,plural,ablative,,,,\npossessive,1st,plural,vocative,regular,meae,,\npossessive,1st,plural,nominative,regular,mea,,\npossessive,1st,plural,genitive,regular,meOrum,,\npossessive,1st,plural,dative,,,,\npossessive,1st,plural,accusative,regular,mea,,\npossessive,1st,plural,ablative,,,,\npossessive,1st,plural,vocative,regular,mea,,\npossessive,2nd,plural,nominative,regular,tuI,,\npossessive,2nd,plural,genitive,regular,tuOrum,,\npossessive,2nd,plural,dative,regular,tuIs,,\npossessive,2nd,plural,accusative,regular,tuOs,,\npossessive,2nd,plural,ablative,regular,tuIs,,\npossessive,2nd,plural,vocative,,,,\npossessive,2nd,plural,nominative,regular,tuae,,\npossessive,2nd,plural,genitive,regular,tuArum,,\npossessive,2nd,plural,dative,,,,\npossessive,2nd,plural,accusative,regular,tuAs,,\npossessive,2nd,plural,ablative,,,,\npossessive,2nd,,vocative,,,,\npossessive,2nd,plural,nominative,regular,tua,,\npossessive,2nd,plural,genitive,regular,tuOrum,,\npossessive,2nd,plural,dative,,,,\npossessive,2nd,plural,accusative,regular,tua,,\npossessive,2nd,plural,ablative,,,,\npossessive,2nd,plural,vocative,,,,\npossessive,3rd,plural,nominative,regular,suI,,\npossessive,3rd,plural,genitive,regular,suOrum,,\npossessive,3rd,plural,dative,regular,suIs,,\npossessive,3rd,plural,accusative,regular,suOs,,\npossessive,3rd,plural,ablative,regular,suIs,,\npossessive,3rd,plural,vocative,,,,\npossessive,3rd,plural,nominative,regular,suae,,\npossessive,3rd,plural,genitive,regular,suArum,,\npossessive,3rd,plural,dative,,,,\npossessive,3rd,plural,accusative,regular,suAs,,\npossessive,3rd,plural,ablative,,,,\npossessive,3rd,plural,vocative,,,,\npossessive,3rd,plural,nominative,regular,sua,,\npossessive,3rd,plural,genitive,regular,suOrum,,\npossessive,3rd,plural,dative,,,,\npossessive,3rd,plural,accusative,regular,sua,,\npossessive,3rd,plural,ablative,,,,\npossessive,3rd,plural,vocative,,,,\npossessive,1st,singular,nominative,regular,noster,,\npossessive,1st,singular,genitive,regular,nostrI,,\npossessive,1st,singular,dative,regular,nostrO,,\npossessive,1st,singular,accusative,regular,nostrum,,\npossessive,1st,singular,ablative,regular,nostrO,,\npossessive,1st,singular,vocative,regular,noster,,\npossessive,1st,singular,nominative,regular,nostra,,\npossessive,1st,singular,genitive,regular,nostrae,,\npossessive,1st,singular,dative,regular,nostrae,,\npossessive,1st,singular,accusative,regular,nostram,,\npossessive,1st,singular,ablative,regular,nostrA,,\npossessive,1st,singular,vocative,regular,nostra,,\npossessive,1st,singular,nominative,regular,nostrum,,\npossessive,1st,singular,genitive,regular,nostrI,,\npossessive,1st,singular,dative,regular,nostrO,,\npossessive,1st,singular,accusative,regular,nostrum,,\npossessive,1st,singular,ablative,regular,nostrO,,\npossessive,1st,singular,vocative,regular,nostrum,,\npossessive,2nd,singular,nominative,regular,vester,,\npossessive,2nd,singular,genitive,regular,vestrI,,\npossessive,2nd,singular,dative,regular,vestrO,,\npossessive,2nd,singular,accusative,regular,vestrum,,\npossessive,2nd,singular,ablative,regular,vestrO,,\npossessive,2nd,singular,vocative,,,,\npossessive,2nd,singular,nominative,regular,vestra,,\npossessive,2nd,singular,genitive,regular,vestrae,,\npossessive,2nd,singular,dative,regular,vestrae,,\npossessive,2nd,singular,accusative,regular,vestram,,\npossessive,2nd,singular,ablative,regular,vestrA,,\npossessive,2nd,singular,vocative,,,,\npossessive,2nd,singular,nominative,regular,vestum,,\npossessive,2nd,singular,genitive,regular,vestrI,,\npossessive,2nd,singular,dative,regular,vestrO,,\npossessive,2nd,singular,accusative,regular,vestrum,,\npossessive,2nd,singular,ablative,regular,vestrO,,\npossessive,2nd,singular,vocative,,,,\npossessive,1st,plural,nominative,regular,nostrI,,\npossessive,1st,plural,genitive,regular,nostrOrum,,\npossessive,1st,plural,dative,regular,nostrIs,,\npossessive,1st,plural,accusative,regular,nostrOs,,\npossessive,1st,plural,ablative,regular,nostrIs,,\npossessive,1st,plural,vocative,regular,nostrI,,\npossessive,1st,plural,nominative,regular,nostrae,,\npossessive,1st,plural,genitive,regular,nostrArum,,\npossessive,1st,plural,dative,,,,\npossessive,1st,plural,accusative,regular,nostrAs,,\npossessive,1st,plural,ablative,,,,\npossessive,1st,plural,vocative,regular,nostrae,,\npossessive,1st,plural,nominative,regular,nostra,,\npossessive,1st,plural,genitive,regular,nostrOrum,,\npossessive,1st,plural,dative,,,,\npossessive,1st,plural,accusative,regular,nostra,,\npossessive,1st,plural,ablative,,,,\npossessive,1st,plural,vocative,regular,nostra,,\npossessive,2nd,plural,nominative,regular,vestrI,,\npossessive,2nd,plural,genitive,regular,vestrOrum,,\npossessive,2nd,plural,dative,regular,vestrIs,,\npossessive,2nd,plural,accusative,regular,vestrOs,,\npossessive,2nd,plural,ablative,regular,vestrIs,,\npossessive,2nd,plural,vocative,,,,\npossessive,2nd,plural,nominative,regular,vestrae,,\npossessive,2nd,plural,genitive,regular,vestrArum,,\npossessive,2nd,plural,dative,,,,\npossessive,2nd,plural,accusative,regular,vestrAs,,\npossessive,2nd,plural,ablative,,,,\npossessive,2nd,,vocative,,,,\npossessive,2nd,plural,nominative,regular,vestra,,\npossessive,2nd,plural,genitive,regular,vestrOrum,,\npossessive,2nd,plural,dative,,,,\npossessive,2nd,plural,accusative,regular,vestra,,\npossessive,2nd,plural,ablative,,,,\npossessive,2nd,plural,vocative,,,,\ndemonstrative,,singular,nominative,regular,is,,\ndemonstrative,,singular,genitive,regular,eius,,\ndemonstrative,,singular,dative,regular,eI,,\ndemonstrative,,singular,accusative,regular,eum,,\ndemonstrative,,singular,ablative,regular,eO,,\ndemonstrative,,singular,nominative,regular,ea,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,eam,,\ndemonstrative,,singular,ablative,regular,eA,,\ndemonstrative,,singular,nominative,regular,id,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,id,,\ndemonstrative,,singular,ablative,regular,eO,,\ndemonstrative,,plural,nominative,regular,eI,,\ndemonstrative,,plural,nominative,irregular,iI,,\ndemonstrative,,plural,nominative,irregular,I,,\ndemonstrative,,plural,genitive,regular,eOrum,,\ndemonstrative,,plural,dative,regular,eIs,,\ndemonstrative,,plural,dative,irregular,iIs,,\ndemonstrative,,plural,dative,irregular,Is,,\ndemonstrative,,plural,accusative,regular,eOs,,\ndemonstrative,,plural,ablative,regular,eIs,,\ndemonstrative,,plural,ablative,irregular,iIs,,\ndemonstrative,,plural,ablative,irregular,Is,,\ndemonstrative,,plural,nominative,regular,eae,,\ndemonstrative,,plural,genitive,regular,eArum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,eAs,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,nominative,regular,ea,,\ndemonstrative,,plural,genitive,regular,eOrum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,ea,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,singular,nominative,regular,ille,,\ndemonstrative,,singular,genitive,regular,illIus,,\ndemonstrative,,singular,dative,regular,illI,,\ndemonstrative,,singular,accusative,regular,illum,,\ndemonstrative,,singular,ablative,regular,illO,,\ndemonstrative,,singular,nominative,regular,illa,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,illam,,\ndemonstrative,,singular,ablative,regular,illA,,\ndemonstrative,,singular,nominative,regular,illud,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,illud,,\ndemonstrative,,singular,ablative,regular,illO,,\ndemonstrative,,plural,nominative,regular,illI,,\ndemonstrative,,plural,genitive,regular,illOrum,,\ndemonstrative,,plural,dative,regular,illIs,,\ndemonstrative,,plural,accusative,regular,illOs,,\ndemonstrative,,plural,ablative,regular,illIs,,\ndemonstrative,,plural,nominative,regular,illae,,\ndemonstrative,,plural,genitive,regular,illArum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,illAs,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,nominative,regular,Illa,,\ndemonstrative,,plural,genitive,regular,illOrum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,illa,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,singular,nominative,regular,ipse,,\ndemonstrative,,singular,genitive,regular,ipsIus,,\ndemonstrative,,singular,dative,regular,ipsI,,\ndemonstrative,,singular,accusative,regular,ipsum,,\ndemonstrative,,singular,ablative,regular,ipsO,,\ndemonstrative,,singular,nominative,regular,ipsa,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,ipsam,,\ndemonstrative,,singular,ablative,regular,ipsA,,\ndemonstrative,,singular,nominative,regular,ipsum,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,ipsum,,\ndemonstrative,,singular,ablative,regular,ipsO,,\ndemonstrative,,plural,nominative,regular,ipsI,,\ndemonstrative,,plural,genitive,regular,ipsOrum,,\ndemonstrative,,plural,dative,regular,ipsIs,,\ndemonstrative,,plural,accusative,regular,ipsOs,,\ndemonstrative,,plural,ablative,regular,ipsIs,,\ndemonstrative,,plural,nominative,regular,ipsae,,\ndemonstrative,,plural,genitive,regular,ipsArum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,ipsAs,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,nominative,regular,ipsa,,\ndemonstrative,,plural,genitive,regular,ipsOrum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,ipsa,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,singular,nominative,regular,iste,,\ndemonstrative,,singular,genitive,regular,istIus,,\ndemonstrative,,singular,dative,regular,istI,,\ndemonstrative,,singular,accusative,regular,istum,,\ndemonstrative,,singular,ablative,regular,istO,,\ndemonstrative,,singular,nominative,regular,ista,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,istam,,\ndemonstrative,,singular,ablative,regular,istA,,\ndemonstrative,,singular,nominative,regular,istud,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,istud,,\ndemonstrative,,singular,ablative,regular,istO,,\ndemonstrative,,plural,nominative,regular,istI,,\ndemonstrative,,plural,genitive,regular,istOrum,,\ndemonstrative,,plural,dative,regular,istIs,,\ndemonstrative,,plural,accusative,regular,istOs,,\ndemonstrative,,plural,ablative,regular,istIs,,\ndemonstrative,,plural,nominative,regular,istae,,\ndemonstrative,,plural,genitive,regular,istArum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,istAs,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,nominative,regular,ista,,\ndemonstrative,,plural,genitive,regular,istOrum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,ista,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,singular,nominative,,,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,,,,\ndemonstrative,,singular,ablative,,,,\ndemonstrative,,singular,vocative,,,,\ndemonstrative,,singular,nominative,,,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,,,,\ndemonstrative,,singular,ablative,,,,\ndemonstrative,,singular,nominative,,,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,,,,\ndemonstrative,,singular,ablative,,,,\ndemonstrative,,singular,vocative,,,,\ndemonstrative,,plural,nominative,,,,\ndemonstrative,,plural,genitive,,,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,,,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,vocative,,,,\ndemonstrative,,plural,nominative,,,,\ndemonstrative,,plural,genitive,,,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,,,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,vocative,,,,\ndemonstrative,,plural,nominative,,,,\ndemonstrative,,plural,genitive,,,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,,,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,vocative,,,,\ndemonstrative,,singular,nominative,regular,hIc,,\ndemonstrative,,singular,genitive,regular,huius,,\ndemonstrative,,singular,dative,regular,huic,,\ndemonstrative,,singular,accusative,regular,hunc,,\ndemonstrative,,singular,ablative,regular,hOc,,\ndemonstrative,,singular,vocative,regular,,,\ndemonstrative,,singular,nominative,regular,haec,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,hanc,,\ndemonstrative,,singular,ablative,regular,hAc,,\ndemonstrative,,singular,vocative,regular,,,\ndemonstrative,,singular,nominative,regular,hOc,,\ndemonstrative,,singular,genitive,,,,\ndemonstrative,,singular,dative,,,,\ndemonstrative,,singular,accusative,regular,hOc,,\ndemonstrative,,singular,ablative,regular,hOc,,\ndemonstrative,,singular,vocative,regular,,,\ndemonstrative,,plural,nominative,regular,hI,,\ndemonstrative,,plural,genitive,regular,hOrum,,\ndemonstrative,,plural,dative,regular,hIs,,\ndemonstrative,,plural,accusative,regular,hOs,,\ndemonstrative,,plural,ablative,regular,hIs,,\ndemonstrative,,plural,vocative,regular,,,\ndemonstrative,,plural,nominative,regular,hae,,\ndemonstrative,,plural,genitive,regular,hArum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,hAs,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,vocative,regular,,,\ndemonstrative,,plural,nominative,regular,haec,,\ndemonstrative,,plural,genitive,regular,hOrum,,\ndemonstrative,,plural,dative,,,,\ndemonstrative,,plural,accusative,regular,haec,,\ndemonstrative,,plural,ablative,,,,\ndemonstrative,,plural,vocative,regular,,,\nrelative,,singular,nominative,regular,quI,,\nrelative,,singular,genitive,regular,cuius,,\nrelative,,singular,genitive,irregular,quoius,,3\nrelative,,singular,dative,regular,cui,,\nrelative,,singular,dative,irregular,quoius,,3\nrelative,,singular,accusative,regular,quem,,\nrelative,,singular,ablative,regular,quO,,\nrelative,,singular,vocative,regular,,,\nrelative,,singular,nominative,regular,qua,,\nrelative,,singular,nominative,irregular,quae,,\nrelative,,singular,genitive,,,,\nrelative,,singular,dative,,,,\nrelative,,singular,accusative,regular,quam,,\nrelative,,singular,ablative,regular,quA,,\nrelative,,singular,vocative,regular,,,\nrelative,,singular,nominative,regular,quod,,\nrelative,,singular,genitive,,,,\nrelative,,singular,dative,,,,\nrelative,,singular,accusative,regular,quod,,\nrelative,,singular,ablative,regular,quO,,\nrelative,,singular,vocative,regular,,,\nrelative,,plural,nominative,regular,quI,,\nrelative,,plural,nominative,regular,quEs,,3\nrelative,,plural,genitive,regular,quOrum,,\nrelative,,plural,dative,regular,quibus,,\nrelative,,plural,dative,irregular,quIs,,\nrelative,,plural,accusative,regular,quOs,,\nrelative,,plural,ablative,regular,quibus,,\nrelative,,plural,ablative,irregular,quIs,,\nrelative,,plural,vocative,regular,,,\nrelative,,plural,nominative,regular,quae,,\nrelative,,plural,genitive,regular,quArum,,\nrelative,,plural,dative,,,,\nrelative,,plural,accusative,regular,quAs,,\nrelative,,plural,ablative,,,,\nrelative,,plural,vocative,regular,,,\nrelative,,plural,nominative,regular,quae,,\nrelative,,plural,genitive,regular,quorum,,\nrelative,,plural,dative,,,,\nrelative,,plural,accusative,regular,quae,,\nrelative,,plural,ablative,,,,\nrelative,,plural,vocative,regular,,,\ninterrogative,,singular,nominative,regular,quis,,\ninterrogative,,singular,genitive,regular,cuius,,\ninterrogative,,singular,dative,regular,cui,,\ninterrogative,,singular,accusative,regular,quem,,\ninterrogative,,singular,ablative,regular,quO,,\ninterrogative,,singular,vocative,regular,,,\ninterrogative,,singular,nominative,regular,quis,,\ninterrogative,,singular,genitive,regular,cuius,,\ninterrogative,,singular,dative,regular,cui,,\ninterrogative,,singular,accusative,regular,quem,,\ninterrogative,,singular,ablative,regular,quO,,\ninterrogative,,singular,vocative,regular,,,\ninterrogative,,singular,nominative,regular,quid,,\ninterrogative,,singular,genitive,,,,\ninterrogative,,singular,dative,,,,\ninterrogative,,singular,accusative,regular,quid,,\ninterrogative,,singular,ablative,regular,quO,,\ninterrogative,,singular,vocative,regular,,,\ninterrogative,,plural,nominative,regular,quI,,\ninterrogative,,plural,nominative,regular,quEs,,3\ninterrogative,,plural,genitive,regular,quOrum,,\ninterrogative,,plural,dative,regular,quibus,,\ninterrogative,,plural,dative,irregular,quIs,,\ninterrogative,,plural,accusative,regular,quOs,,\ninterrogative,,plural,ablative,regular,quibus,,\ninterrogative,,plural,ablative,irregular,quIs,,\ninterrogative,,plural,vocative,regular,,,\ninterrogative,,plural,nominative,regular,quae,,\ninterrogative,,plural,genitive,regular,quArum,,\ninterrogative,,plural,dative,,,,\ninterrogative,,plural,accusative,regular,quAs,,\ninterrogative,,plural,ablative,,,,\ninterrogative,,plural,vocative,regular,,,\ninterrogative,,plural,nominative,regular,quae,,\ninterrogative,,plural,genitive,regular,quorum,,\ninterrogative,,plural,dative,,,,\ninterrogative,,plural,accusative,regular,quae,,\ninterrogative,,plural,ablative,,,,\ninterrogative,,plural,vocative,regular,,,";

var pronounFootnotesCSV = "Index,Text\n1,\"tU is made emphatic by adding on the endings –te, –temet or –timet. \n            The other forms of the personal pronoun (with the exception of the genitive plural) \n            are made emphatic by the addition of –met to the original form. Early emphatic forms include mEpte and tEpte.\"\n2,Enclitics –ce or –c are sometimes added to forms of hic. Common examples include huiusce and hIsce.\n3,Earlier forms.\n4,The plural forms of the Interrogatives are the same as the plural forms of the Relative.";

var adjectiveSuffixesCSV = "Ending,Number,Case,Declension,Gender,Type,Footnote\na,singular,nominative,1st 2nd,feminine,regular,\nus,singular,nominative,1st 2nd,masculine,regular,\num,singular,nominative,1st 2nd,neuter,regular,\nis,singular,nominative,3rd,feminine,regular,\n-,singular,nominative,3rd,feminine,irregular,6\n-,singular,nominative,3rd,masculine,regular,\nis,singular,nominative,3rd,masculine,irregular,5\ne,singular,nominative,3rd,neuter,regular,\n-,singular,nominative,3rd,neuter,irregular,6\nae,singular,genitive,1st 2nd,feminine,regular,\nīus,singular,genitive,1st 2nd,feminine,irregular,3\nī,singular,genitive,1st 2nd,masculine,regular,\nīus,singular,genitive,1st 2nd,masculine,irregular,3\nī,singular,genitive,1st 2nd,neuter,regular,\nīus,singular,genitive,1st 2nd,neuter,irregular,3\nis,singular,genitive,3rd,feminine,regular,\nis,singular,genitive,3rd,masculine,regular,\nis,singular,genitive,3rd,neuter,regular,\nae,singular,dative,1st 2nd,feminine,regular,\nī,singular,dative,1st 2nd,feminine,irregular,3\nō,singular,dative,1st 2nd,masculine,regular,\nī,singular,dative,1st 2nd,masculine,irregular,3\nō,singular,dative,1st 2nd,neuter,regular,\nī,singular,dative,1st 2nd,neuter,irregular,3\nī,singular,dative,3rd,feminine,regular,\nī,singular,dative,3rd,masculine,regular,\nī,singular,dative,3rd,neuter,regular,\nam,singular,accusative,1st 2nd,feminine,regular,\num,singular,accusative,1st 2nd,masculine,regular,\num,singular,accusative,1st 2nd,neuter,regular,\nem,singular,accusative,3rd,feminine,regular,\nem,singular,accusative,3rd,masculine,regular,\ne,singular,accusative,3rd,neuter,regular,\n-,singular,accusative,3rd,neuter,irregular,6\nā,singular,ablative,1st 2nd,feminine,regular,\nō,singular,ablative,1st 2nd,feminine,irregular,4\nō,singular,ablative,1st 2nd,masculine,regular,\nō,singular,ablative,1st 2nd,neuter,regular,\nī,singular,ablative,3rd,feminine,regular,\ne,singular,ablative,3rd,feminine,irregular,7\nī,singular,ablative,3rd,masculine,regular,\ne,singular,ablative,3rd,masculine,irregular,7\nī,singular,ablative,3rd,neuter,regular,\nae,singular,locative,1st 2nd,feminine,regular,\nī,singular,locative,1st 2nd,masculine,regular,\nī,singular,locative,1st 2nd,neuter,regular,\nī,singular,locative,3rd,feminine,regular,\ne,singular,locative,3rd,feminine,irregular,7\nī,singular,locative,3rd,masculine,regular,\nī,singular,locative,3rd,neuter,regular,\na,singular,vocative,1st 2nd,feminine,regular,\ne,singular,vocative,1st 2nd,masculine,regular,\nī,singular,vocative,1st 2nd,masculine,irregular,\num,singular,vocative,1st 2nd,neuter,regular,\nis,singular,vocative,3rd,feminine,regular,\n-,singular,vocative,3rd,masculine,regular,\ne,singular,vocative,3rd,neuter,regular,\n-,singular,vocative,3rd,neuter,irregular,6\nae,plural,nominative,1st 2nd,feminine,regular,\nī,plural,nominative,1st 2nd,masculine,regular,\na,plural,nominative,1st 2nd,neuter,regular,\nēs,plural,nominative,3rd,feminine,regular,\nēs,plural,nominative,3rd,masculine,regular,\nia,plural,nominative,3rd,neuter,regular,\nārum,plural,genitive,1st 2nd,feminine,regular,\nōrum,plural,genitive,1st 2nd,masculine,regular,\nōrum,plural,genitive,1st 2nd,neuter,regular,\nium,plural,genitive,3rd,feminine,regular,\num,plural,genitive,3rd,feminine,irregular,8\nium,plural,genitive,3rd,masculine,regular,\num,plural,genitive,3rd,masculine,irregular,8\nium,plural,genitive,3rd,neuter,regular,\num,plural,genitive,3rd,neuter,irregular,8\nīs,plural,dative,1st 2nd,feminine,regular,\nīs,plural,dative,1st 2nd,masculine,regular,\nīs,plural,dative,1st 2nd,neuter,regular,\nibus,plural,dative,3rd,feminine,regular,\nibus,plural,dative,3rd,masculine,regular,\nibus,plural,dative,3rd,neuter,regular,\nās,plural,accusative,1st 2nd,feminine,regular,\nōs,plural,accusative,1st 2nd,masculine,regular,\na,plural,accusative,1st 2nd,neuter,regular,\nīs,plural,accusative,3rd,feminine,regular,\nēs,plural,accusative,3rd,feminine,irregular,9\nīs,plural,accusative,3rd,masculine,regular,\nēs,plural,accusative,3rd,masculine,irregular,9\nia,plural,accusative,3rd,neuter,regular,\nīs,plural,ablative,1st 2nd,feminine,regular,\nīs,plural,ablative,1st 2nd,masculine,regular,\nīs,plural,ablative,1st 2nd,neuter,regular,\nibus,plural,ablative,3rd,feminine,regular,\nibus,plural,ablative,3rd,masculine,regular,\nibus,plural,ablative,3rd,neuter,regular,\nīs,plural,locative,1st 2nd,feminine,regular,\nīs,plural,locative,1st 2nd,masculine,regular,\nīs,plural,locative,1st 2nd,neuter,regular,\nibus,plural,locative,3rd,feminine,regular,\nibus,plural,locative,3rd,masculine,regular,\nibus,plural,locative,3rd,neuter,regular,\nae,plural,vocative,1st 2nd,feminine,regular,\nī,plural,vocative,1st 2nd,masculine,regular,\na,plural,vocative,1st 2nd,neuter,regular,\nēs,plural,vocative,3rd,feminine,regular,\nēs,plural,vocative,3rd,masculine,regular,\nia,plural,vocative,3rd,neuter,regular,";

var adjectiveFootnotesCSV = "Index,Text\n1,\"Adjectives agree with the noun they modify in gender, number and case.\"\n2,Adjectives are inflected according to either\n3,\"Only nullus, sōlus, alius (alia, aliud), tōtus, ūllus, ūnus, alter, neuter (neutra,\n            neutrum) and uter (utra, utrum).\"\n4,In a few adjectives of Greek origin.\n5,\"The \"\"two-ending\"\" adjectives use \"\"-is\"\", for both masculine and feminine nominative\n            singular.\"\n6,\"The \"\"one-ending\"\" adjectives use the same consonant ending for all three genders in the\n            nominative singular and the neuter accusative and vocative singular.\"\n7,\"An ablative singular in \"\"e\"\" is common in one-ending adjectives, but is usually confined to\n            poetry in three and two-ending adjectives.\"\n8,\"In comparatives, poetry and some one-ending adjectives.\"\n9,Chiefly in comparatives.";

var verbSuffixesCSV = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Case,Type,Footnote\r\nō,1st,active,indicative,present,singular,1st,,regular,\r\nās,1st,active,indicative,present,singular,2nd,,regular,\r\nat,1st,active,indicative,present,singular,3rd,,regular,\r\nāmus,1st,active,indicative,present,plural,1st,,regular,\r\nātis,1st,active,indicative,present,plural,2nd,,regular,\r\nant,1st,active,indicative,present,plural,3rd,,regular,\r\nem,1st,active,subjunctive,present,singular,1st,,regular,\r\nēs,1st,active,subjunctive,present,singular,2nd,,regular,\r\net,1st,active,subjunctive,present,singular,3rd,,regular,\r\nēmus,1st,active,subjunctive,present,plural,1st,,regular,\r\nētis,1st,active,subjunctive,present,plural,2nd,,regular,\r\nent,1st,active,subjunctive,present,plural,3rd,,regular,\r\neō,2nd,active,indicative,present,singular,1st,,regular,\r\nēs,2nd,active,indicative,present,singular,2nd,,regular,\r\nēt,2nd,active,indicative,present,singular,3rd,,regular,\r\nēmus,2nd,active,indicative,present,plural,1st,,regular,\r\nētis,2nd,active,indicative,present,plural,2nd,,regular,\r\nent,2nd,active,indicative,present,plural,3rd,,regular,\r\neam,2nd,active,subjunctive,present,singular,1st,,regular,\r\neās,2nd,active,subjunctive,present,singular,2nd,,regular,\r\neat,2nd,active,subjunctive,present,singular,3rd,,regular,\r\neāmus,2nd,active,subjunctive,present,plural,1st,,regular,\r\neātis,2nd,active,subjunctive,present,plural,2nd,,regular,\r\neant,2nd,active,subjunctive,present,plural,3rd,,regular,\r\nō,3rd,active,indicative,present,singular,1st,,regular,\r\nis,3rd,active,indicative,present,singular,2nd,,regular,\r\nit,3rd,active,indicative,present,singular,3rd,,regular,\r\nimus,3rd,active,indicative,present,plural,1st,,regular,\r\nitis,3rd,active,indicative,present,plural,2nd,,regular,\r\nunt,3rd,active,indicative,present,plural,3rd,,regular,\r\nam,3rd,active,subjunctive,present,singular,1st,,regular,\r\nās,3rd,active,subjunctive,present,singular,2nd,,regular,\r\nat,3rd,active,subjunctive,present,singular,3rd,,regular,\r\nāmus,3rd,active,subjunctive,present,plural,1st,,regular,\r\nātis,3rd,active,subjunctive,present,plural,2nd,,regular,\r\nant,3rd,active,subjunctive,present,plural,3rd,,regular,\r\niō,4th,active,indicative,present,singular,1st,,regular,\r\nīs,4th,active,indicative,present,singular,2nd,,regular,\r\nit,4th,active,indicative,present,singular,3rd,,regular,\r\nīmus,4th,active,indicative,present,plural,1st,,regular,\r\nītis,4th,active,indicative,present,plural,2nd,,regular,\r\niunt,4th,active,indicative,present,plural,3rd,,regular,\r\niam,4th,active,subjunctive,present,singular,1st,,regular,\r\niās,4th,active,subjunctive,present,singular,2nd,,regular,\r\niat,4th,active,subjunctive,present,singular,3rd,,regular,\r\niāmus,4th,active,subjunctive,present,plural,1st,,regular,\r\niāatis,4th,active,subjunctive,present,plural,2nd,,regular,\r\niant,4th,active,subjunctive,present,plural,3rd,,regular,\r\nābam,1st,active,indicative,imperfect,singular,1st,,regular,\r\nābas,1st,active,indicative,imperfect,singular,2nd,,regular,\r\nābat,1st,active,indicative,imperfect,singular,3rd,,regular,\r\nābāmus,1st,active,indicative,imperfect,plural,1st,,regular,\r\nābātis,1st,active,indicative,imperfect,plural,2nd,,regular,\r\nābant,1st,active,indicative,imperfect,plural,3rd,,regular,\r\nārem,1st,active,subjunctive,imperfect,singular,1st,,regular,\r\nārēs,1st,active,subjunctive,imperfect,singular,2nd,,regular,\r\nāret,1st,active,subjunctive,imperfect,singular,3rd,,regular,\r\nārēmus,1st,active,subjunctive,imperfect,plural,1st,,regular,\r\nārētis,1st,active,subjunctive,imperfect,plural,2nd,,regular,\r\nārent,1st,active,subjunctive,imperfect,plural,3rd,,regular,\r\nēbam,2nd,active,indicative,imperfect,singular,1st,,regular,\r\nēbās,2nd,active,indicative,imperfect,singular,2nd,,regular,\r\nēbat,2nd,active,indicative,imperfect,singular,3rd,,regular,\r\nēbāmus,2nd,active,indicative,imperfect,plural,1st,,regular,\r\nēbātis,2nd,active,indicative,imperfect,plural,2nd,,regular,\r\nēbant,2nd,active,indicative,imperfect,plural,3rd,,regular,\r\nērem,2nd,active,subjunctive,imperfect,singular,1st,,regular,\r\nērēs,2nd,active,subjunctive,imperfect,singular,2nd,,regular,\r\nēret,2nd,active,subjunctive,imperfect,singular,3rd,,regular,\r\nērēmus,2nd,active,subjunctive,imperfect,plural,1st,,regular,\r\nērētis,2nd,active,subjunctive,imperfect,plural,2nd,,regular,\r\nērēnt,2nd,active,subjunctive,imperfect,plural,3rd,,regular,\r\nēbas,3rd,active,indicative,imperfect,singular,1st,,regular,\r\nēbāt,3rd,active,indicative,imperfect,singular,2nd,,regular,\r\nēbat,3rd,active,indicative,imperfect,singular,3rd,,regular,\r\nēbāmus,3rd,active,indicative,imperfect,plural,1st,,regular,\r\nēbātis,3rd,active,indicative,imperfect,plural,2nd,,regular,\r\nēbant,3rd,active,indicative,imperfect,plural,3rd,,regular,\r\nerem,3rd,active,subjunctive,imperfect,singular,1st,,regular,\r\nerēs,3rd,active,subjunctive,imperfect,singular,2nd,,regular,\r\neret,3rd,active,subjunctive,imperfect,singular,3rd,,regular,\r\nerēmus,3rd,active,subjunctive,imperfect,plural,1st,,regular,\r\nerētis,3rd,active,subjunctive,imperfect,plural,2nd,,regular,\r\nerent,3rd,active,subjunctive,imperfect,plural,3rd,,regular,\r\niēbam,4th,active,indicative,imperfect,singular,1st,,regular,\r\nībam,4th,active,indicative,imperfect,singular,1st,,irregular,2\r\niēbas,4th,active,indicative,imperfect,singular,2nd,,regular,\r\nības,4th,active,indicative,imperfect,singular,2nd,,irregular,\r\niēbat,4th,active,indicative,imperfect,singular,3rd,,regular,\r\nībat,4th,active,indicative,imperfect,singular,3rd,,irregular,\r\niēbāmus,4th,active,indicative,imperfect,plural,1st,,regular,\r\nībāmus,4th,active,indicative,imperfect,plural,1st,,irregular,\r\niēbātis,4th,active,indicative,imperfect,plural,2nd,,regular,\r\nībātis,4th,active,indicative,imperfect,plural,2nd,,irregular,\r\niēbant,4th,active,indicative,imperfect,plural,3rd,,regular,\r\nībant,4th,active,indicative,imperfect,plural,3rd,,irregular,\r\nīrem,4th,active,subjunctive,imperfect,singular,1st,,regular,\r\nīrēs,4th,active,subjunctive,imperfect,singular,2nd,,regular,\r\nīret,4th,active,subjunctive,imperfect,singular,3rd,,regular,\r\nīrēmus,4th,active,subjunctive,imperfect,plural,1st,,regular,\r\nīrētis,4th,active,subjunctive,imperfect,plural,2nd,,regular,\r\nīrēnt,4th,active,subjunctive,imperfect,plural,3rd,,regular,\r\nābo,1st,active,indicative,future,singular,1st,,regular,\r\nābis,1st,active,indicative,future,singular,2nd,,regular,\r\nābit,1st,active,indicative,future,singular,3rd,,regular,\r\nābimus,1st,active,indicative,future,plural,1st,,regular,\r\nābitis,1st,active,indicative,future,plural,2nd,,regular,\r\nābunt,1st,active,indicative,future,plural,3rd,,regular,\r\n,1st,active,subjunctive,future,singular,1st,,,\r\n,1st,active,subjunctive,future,singular,2nd,,,\r\n,1st,active,subjunctive,future,singular,3rd,,,\r\n,1st,active,subjunctive,future,plural,1st,,,\r\n,1st,active,subjunctive,future,plural,2nd,,,\r\n,1st,active,subjunctive,future,plural,3rd,,,\r\nēbō,2nd,active,indicative,future,singular,1st,,regular,\r\nēbis,2nd,active,indicative,future,singular,2nd,,regular,\r\nēbit,2nd,active,indicative,future,singular,3rd,,regular,\r\nēbimus,2nd,active,indicative,future,plural,1st,,regular,\r\nēbitis,2nd,active,indicative,future,plural,2nd,,regular,\r\nēbunt,2nd,active,indicative,future,plural,3rd,,regular,\r\n,2nd,active,subjunctive,future,singular,1st,,regular,\r\n,2nd,active,subjunctive,future,singular,2nd,,,\r\n,2nd,active,subjunctive,future,singular,3rd,,,\r\n,2nd,active,subjunctive,future,plural,1st,,,\r\n,2nd,active,subjunctive,future,plural,2nd,,,\r\n,2nd,active,subjunctive,future,plural,3rd,,,\r\nam,3rd,active,indicative,future,singular,1st,,regular,\r\nēs,3rd,active,indicative,future,singular,2nd,,regular,\r\net,3rd,active,indicative,future,singular,3rd,,regular,\r\nēmus,3rd,active,indicative,future,plural,1st,,regular,\r\nētis,3rd,active,indicative,future,plural,2nd,,regular,\r\nent,3rd,active,indicative,future,plural,3rd,,regular,\r\n,3rd,active,subjunctive,future,singular,1st,,,\r\n,3rd,active,subjunctive,future,singular,2nd,,,\r\n,3rd,active,subjunctive,future,singular,3rd,,,\r\n,3rd,active,subjunctive,future,plural,1st,,,\r\n,3rd,active,subjunctive,future,plural,2nd,,,\r\n,3rd,active,subjunctive,future,plural,3rd,,,\r\niam,4th,active,indicative,future,singular,1st,,regular,\r\nībō,4th,active,indicative,future,singular,1st,,irregular,2\r\niēs,4th,active,indicative,future,singular,2nd,,regular,\r\nībis,4th,active,indicative,future,singular,2nd,,irregular,\r\niet,4th,active,indicative,future,singular,3rd,,regular,\r\nībit,4th,active,indicative,future,singular,3rd,,irregular,\r\niēmus,4th,active,indicative,future,plural,1st,,regular,\r\nībimus,4th,active,indicative,future,plural,1st,,irregular,\r\niētis,4th,active,indicative,future,plural,2nd,,regular,\r\nībitis,4th,active,indicative,future,plural,2nd,,irregular,\r\nient,4th,active,indicative,future,plural,3rd,,regular,\r\nībunt,4th,active,indicative,future,plural,3rd,,irregular,\r\n,4th,active,subjunctive,future,singular,1st,,,\r\n,4th,active,subjunctive,future,singular,2nd,,,\r\n,4th,active,subjunctive,future,singular,3rd,,,\r\n,4th,active,subjunctive,future,plural,1st,,,\r\n,4th,active,subjunctive,future,plural,2nd,,,\r\n,4th,active,subjunctive,future,plural,3rd,,,\r\nāvī,1st,active,indicative,perfect,singular,1st,,regular,\r\nāvistī,1st,active,indicative,perfect,singular,2nd,,regular,\r\nāvit,1st,active,indicative,perfect,singular,3rd,,regular,\r\nāvimus,1st,active,indicative,perfect,plural,1st,,regular,\r\nāvistis,1st,active,indicative,perfect,plural,2nd,,regular,\r\nāvērunt,1st,active,indicative,perfect,plural,3rd,,regular,\r\nāvēre,1st,active,indicative,perfect,plural,3rd,,irregular,6\r\nāverim,1st,active,subjunctive,perfect,singular,1st,,regular,\r\nāveris,1st,active,subjunctive,perfect,singular,2nd,,regular,\r\nāverit,1st,active,subjunctive,perfect,singular,3rd,,regular,\r\nāverimus,1st,active,subjunctive,perfect,plural,1st,,regular,\r\nāveritis,1st,active,subjunctive,perfect,plural,2nd,,regular,\r\nāverint,1st,active,subjunctive,perfect,plural,3rd,,regular,\r\nvī,2nd,active,indicative,perfect,singular,1st,,regular,\r\nvistī,2nd,active,indicative,perfect,singular,2nd,,regular,\r\nvit,2nd,active,indicative,perfect,singular,3rd,,regular,\r\nvimus,2nd,active,indicative,perfect,plural,1st,,regular,\r\nvistis,2nd,active,indicative,perfect,plural,2nd,,regular,\r\nvērunt,2nd,active,indicative,perfect,plural,3rd,,regular,\r\nvēre,2nd,active,indicative,perfect,plural,3rd,,irregular,6\r\nverim,2nd,active,subjunctive,perfect,singular,1st,,regular,\r\nveris,2nd,active,subjunctive,perfect,singular,2nd,,regular,\r\nverit,2nd,active,subjunctive,perfect,singular,3rd,,regular,\r\nverimus,2nd,active,subjunctive,perfect,plural,1st,,regular,\r\nveritis,2nd,active,subjunctive,perfect,plural,2nd,,regular,\r\nverint,2nd,active,subjunctive,perfect,plural,3rd,,regular,\r\nī,3rd,active,indicative,perfect,singular,1st,,regular,\r\nistī,3rd,active,indicative,perfect,singular,2nd,,regular,\r\nit,3rd,active,indicative,perfect,singular,3rd,,regular,\r\nimus,3rd,active,indicative,perfect,plural,1st,,regular,\r\nistis,3rd,active,indicative,perfect,plural,2nd,,regular,\r\nērunt,3rd,active,indicative,perfect,plural,3rd,,regular,\r\nēre,3rd,active,indicative,perfect,plural,3rd,,irregular,6\r\nerim,3rd,active,subjunctive,perfect,singular,1st,,regular,\r\neris,3rd,active,subjunctive,perfect,singular,2nd,,regular,\r\nerit,3rd,active,subjunctive,perfect,singular,3rd,,regular,\r\nerimus,3rd,active,subjunctive,perfect,plural,1st,,regular,\r\neritis,3rd,active,subjunctive,perfect,plural,2nd,,regular,\r\nerint,3rd,active,subjunctive,perfect,plural,3rd,,regular,\r\nīvi,4th,active,indicative,perfect,singular,1st,,regular,\r\nīvistī,4th,active,indicative,perfect,singular,2nd,,regular,\r\nīvit,4th,active,indicative,perfect,singular,3rd,,regular,\r\nīvimus,4th,active,indicative,perfect,plural,1st,,regular,\r\nīvistis,4th,active,indicative,perfect,plural,2nd,,regular,\r\nīvērunt,4th,active,indicative,perfect,plural,3rd,,regular,\r\nīvēre,4th,active,indicative,perfect,plural,3rd,,irregular,6\r\nīverim,4th,active,subjunctive,perfect,singular,1st,,regular,\r\niveris,4th,active,subjunctive,perfect,singular,2nd,,regular,\r\nīverit,4th,active,subjunctive,perfect,singular,3rd,,regular,\r\nīverimus,4th,active,subjunctive,perfect,plural,1st,,regular,\r\nīveritis,4th,active,subjunctive,perfect,plural,2nd,,regular,\r\nīverint,4th,active,subjunctive,perfect,plural,3rd,,regular,\r\nāveram,1st,active,indicative,pluperfect,singular,1st,,regular,\r\nāverās,1st,active,indicative,pluperfect,singular,2nd,,regular,\r\nāverat,1st,active,indicative,pluperfect,singular,3rd,,regular,\r\nāverāmus,1st,active,indicative,pluperfect,plural,1st,,regular,\r\nāverātis,1st,active,indicative,pluperfect,plural,2nd,,regular,\r\nāverant,1st,active,indicative,pluperfect,plural,3rd,,regular,\r\nāvissem,1st,active,subjunctive,pluperfect,singular,1st,,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,singular,2nd,,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,singular,3rd,,regular,\r\nāvissēm,1st,active,subjunctive,pluperfect,plural,1st,,regular,\r\nāvissēs,1st,active,subjunctive,pluperfect,plural,2nd,,regular,\r\nāvisset,1st,active,subjunctive,pluperfect,plural,3rd,,regular,\r\nveram,2nd,active,indicative,pluperfect,singular,1st,,regular,\r\nverās,2nd,active,indicative,pluperfect,singular,2nd,,regular,\r\nverat,2nd,active,indicative,pluperfect,singular,3rd,,regular,\r\nverāmus,2nd,active,indicative,pluperfect,plural,1st,,regular,\r\nverātis,2nd,active,indicative,pluperfect,plural,2nd,,regular,\r\nverant,2nd,active,indicative,pluperfect,plural,3rd,,regular,\r\nvissem,2nd,active,subjunctive,pluperfect,singular,1st,,regular,\r\nvissēs,2nd,active,subjunctive,pluperfect,singular,2nd,,regular,\r\nvisset,2nd,active,subjunctive,pluperfect,singular,3rd,,regular,\r\nvissēmus,2nd,active,subjunctive,pluperfect,plural,1st,,regular,\r\nvissētis,2nd,active,subjunctive,pluperfect,plural,2nd,,regular,\r\nvissent,2nd,active,subjunctive,pluperfect,plural,3rd,,regular,\r\neram,3rd,active,indicative,pluperfect,singular,1st,,regular,\r\nerās,3rd,active,indicative,pluperfect,singular,2nd,,regular,\r\nerat,3rd,active,indicative,pluperfect,singular,3rd,,regular,\r\nerāmus,3rd,active,indicative,pluperfect,plural,1st,,regular,\r\nerātis,3rd,active,indicative,pluperfect,plural,2nd,,regular,\r\nerant,3rd,active,indicative,pluperfect,plural,3rd,,regular,\r\nissem,3rd,active,subjunctive,pluperfect,singular,1st,,regular,\r\nissēs,3rd,active,subjunctive,pluperfect,singular,2nd,,regular,\r\nisset,3rd,active,subjunctive,pluperfect,singular,3rd,,regular,\r\nissēmus,3rd,active,subjunctive,pluperfect,plural,1st,,regular,\r\nissētis,3rd,active,subjunctive,pluperfect,plural,2nd,,regular,\r\nissent,3rd,active,subjunctive,pluperfect,plural,3rd,,regular,\r\nīveram,4th,active,indicative,pluperfect,singular,1st,,regular,\r\nīverās,4th,active,indicative,pluperfect,singular,2nd,,regular,\r\nīverat,4th,active,indicative,pluperfect,singular,3rd,,regular,\r\nīverāmus,4th,active,indicative,pluperfect,plural,1st,,regular,\r\nīverātis,4th,active,indicative,pluperfect,plural,2nd,,regular,\r\nīverant,4th,active,indicative,pluperfect,plural,3rd,,regular,\r\nīvissem,4th,active,subjunctive,pluperfect,singular,1st,,regular,\r\nīvissēs,4th,active,subjunctive,pluperfect,singular,2nd,,regular,\r\nīvisset,4th,active,subjunctive,pluperfect,singular,3rd,,regular,\r\nīvissēmus,4th,active,subjunctive,pluperfect,plural,1st,,regular,\r\nīvissētis,4th,active,subjunctive,pluperfect,plural,2nd,,regular,\r\nīvissent,4th,active,subjunctive,pluperfect,plural,3rd,,regular,\r\nāverō,1st,active,indicative,future_perfect,singular,1st,,regular,\r\nāveris,1st,active,indicative,future_perfect,singular,2nd,,regular,\r\nāverit,1st,active,indicative,future_perfect,singular,3rd,,regular,\r\nāverimus,1st,active,indicative,future_perfect,plural,1st,,regular,\r\nāveritis,1st,active,indicative,future_perfect,plural,2nd,,regular,\r\nāverint,1st,active,indicative,future_perfect,plural,3rd,,regular,\r\n,1st,active,subjunctive,future_perfect,singular,1st,,,\r\n,1st,active,subjunctive,future_perfect,singular,2nd,,,\r\n,1st,active,subjunctive,future_perfect,singular,3rd,,,\r\n,1st,active,subjunctive,future_perfect,plural,1st,,,\r\n,1st,active,subjunctive,future_perfect,plural,2nd,,,\r\n,1st,active,subjunctive,future_perfect,plural,3rd,,,\r\nverō,2nd,active,indicative,future_perfect,singular,1st,,regular,\r\nvēris,2nd,active,indicative,future_perfect,singular,2nd,,regular,\r\nvērit,2nd,active,indicative,future_perfect,singular,3rd,,regular,\r\nvērimus,2nd,active,indicative,future_perfect,plural,1st,,regular,\r\nvēritis,2nd,active,indicative,future_perfect,plural,2nd,,regular,\r\nvērint,2nd,active,indicative,future_perfect,plural,3rd,,regular,\r\n,2nd,active,subjunctive,future_perfect,singular,1st,,,\r\n,2nd,active,subjunctive,future_perfect,singular,2nd,,,\r\n,2nd,active,subjunctive,future_perfect,singular,3rd,,,\r\n,2nd,active,subjunctive,future_perfect,plural,1st,,,\r\n,2nd,active,subjunctive,future_perfect,plural,2nd,,,\r\n,2nd,active,subjunctive,future_perfect,plural,3rd,,,\r\nerō,3rd,active,indicative,future_perfect,singular,1st,,regular,\r\neris,3rd,active,indicative,future_perfect,singular,2nd,,regular,\r\nerit,3rd,active,indicative,future_perfect,singular,3rd,,regular,\r\nerimus,3rd,active,indicative,future_perfect,plural,1st,,regular,\r\neritis,3rd,active,indicative,future_perfect,plural,2nd,,regular,\r\nerint,3rd,active,indicative,future_perfect,plural,3rd,,regular,\r\n,3rd,active,subjunctive,future_perfect,singular,1st,,,\r\n,3rd,active,subjunctive,future_perfect,singular,2nd,,,\r\n,3rd,active,subjunctive,future_perfect,singular,3rd,,,\r\n,3rd,active,subjunctive,future_perfect,plural,1st,,,\r\n,3rd,active,subjunctive,future_perfect,plural,2nd,,,\r\n,3rd,active,subjunctive,future_perfect,plural,3rd,,,\r\nīverō,4th,active,indicative,future_perfect,singular,1st,,regular,\r\nīveris,4th,active,indicative,future_perfect,singular,2nd,,regular,\r\nīverit,4th,active,indicative,future_perfect,singular,3rd,,regular,\r\nīverimus,4th,active,indicative,future_perfect,plural,1st,,regular,\r\nīveritis,4th,active,indicative,future_perfect,plural,2nd,,regular,\r\nīverint,4th,active,indicative,future_perfect,plural,3rd,,regular,\r\n,4th,active,subjunctive,future_perfect,singular,1st,,,\r\n,4th,active,subjunctive,future_perfect,singular,2nd,,,\r\n,4th,active,subjunctive,future_perfect,singular,3rd,,,\r\n,4th,active,subjunctive,future_perfect,plural,1st,,,\r\n,4th,active,subjunctive,future_perfect,plural,2nd,,,\r\n,4th,active,subjunctive,future_perfect,plural,3rd,,,\r\nor,1st,passive,indicative,present,singular,1st,,regular,\r\nāris,1st,passive,indicative,present,singular,2nd,,regular,\r\nāre,1st,passive,indicative,present,singular,2nd,,irregular,5\r\nātur,1st,passive,indicative,present,singular,3rd,,regular,\r\nāmur,1st,passive,indicative,present,plural,1st,,regular,\r\nāminiī,1st,passive,indicative,present,plural,2nd,,regular,\r\nantur,1st,passive,indicative,present,plural,3rd,,regular,\r\ner,1st,passive,subjunctive,present,singular,1st,,regular,\r\nēris,1st,passive,subjunctive,present,singular,2nd,,regular,\r\nēre,1st,passive,subjunctive,present,singular,2nd,,regular,\r\nētur,1st,passive,subjunctive,present,singular,3rd,,regular,\r\nēmur,1st,passive,subjunctive,present,plural,1st,,regular,\r\nēminī,1st,passive,subjunctive,present,plural,2nd,,regular,\r\nentur,1st,passive,subjunctive,present,plural,3rd,,regular,\r\neor,2nd,passive,indicative,present,singular,1st,,regular,\r\nēris,2nd,passive,indicative,present,singular,2nd,,regular,\r\nēre,2nd,passive,indicative,present,singular,2nd,,regular,\r\nētur,2nd,passive,indicative,present,singular,3rd,,regular,\r\nēmur,2nd,passive,indicative,present,plural,1st,,regular,\r\nēmini,2nd,passive,indicative,present,plural,2nd,,regular,\r\nentur,2nd,passive,indicative,present,plural,3rd,,regular,\r\near,2nd,passive,subjunctive,present,singular,1st,,regular,\r\neāris,2nd,passive,subjunctive,present,singular,2nd,,regular,\r\neāre,2nd,passive,subjunctive,present,singular,2nd,,regular,\r\neātur,2nd,passive,subjunctive,present,singular,3rd,,regular,\r\neāmur,2nd,passive,subjunctive,present,plural,1st,,regular,\r\neāminī,2nd,passive,subjunctive,present,plural,2nd,,regular,\r\neantur,2nd,passive,subjunctive,present,plural,3rd,,regular,\r\nor,3rd,passive,indicative,present,singular,1st,,regular,\r\neris,3rd,passive,indicative,present,singular,2nd,,regular,\r\nere,3rd,passive,indicative,present,singular,2nd,,regular,\r\nitur,3rd,passive,indicative,present,singular,3rd,,regular,\r\nimur,3rd,passive,indicative,present,plural,1st,,regular,\r\niminī,3rd,passive,indicative,present,plural,2nd,,regular,\r\nuntur,3rd,passive,indicative,present,plural,3rd,,regular,\r\nar,3rd,passive,subjunctive,present,singular,1st,,regular,\r\nāris,3rd,passive,subjunctive,present,singular,2nd,,regular,\r\nāre,3rd,passive,subjunctive,present,singular,2nd,,regular,\r\nātur,3rd,passive,subjunctive,present,singular,3rd,,regular,\r\nāmur,3rd,passive,subjunctive,present,plural,1st,,regular,\r\nāminī,3rd,passive,subjunctive,present,plural,2nd,,regular,\r\nantur,3rd,passive,subjunctive,present,plural,3rd,,regular,\r\nior,4th,passive,indicative,present,singular,1st,,regular,\r\nīris,4th,passive,indicative,present,singular,2nd,,regular,\r\nīre,4th,passive,indicative,present,singular,2nd,,regular,\r\nītur,4th,passive,indicative,present,singular,3rd,,regular,\r\nīmur,4th,passive,indicative,present,plural,1st,,regular,\r\nīminī,4th,passive,indicative,present,plural,2nd,,regular,\r\niuntur,4th,passive,indicative,present,plural,3rd,,regular,\r\niar,4th,passive,subjunctive,present,singular,1st,,regular,\r\niāris,4th,passive,subjunctive,present,singular,2nd,,regular,\r\niāre,4th,passive,subjunctive,present,singular,2nd,,regular,\r\niātur,4th,passive,subjunctive,present,singular,3rd,,regular,\r\niāmur,4th,passive,subjunctive,present,plural,1st,,regular,\r\niāminī,4th,passive,subjunctive,present,plural,2nd,,regular,\r\niantur,4th,passive,subjunctive,present,plural,3rd,,regular,\r\nābar,1st,passive,indicative,imperfect,singular,1st,,regular,\r\nābāaris,1st,passive,indicative,imperfect,singular,2nd,,regular,\r\nābāre,1st,passive,indicative,imperfect,singular,2nd,,regular,\r\nābātur,1st,passive,indicative,imperfect,singular,3rd,,regular,\r\nābāmur,1st,passive,indicative,imperfect,plural,1st,,regular,\r\nābāminī,1st,passive,indicative,imperfect,plural,2nd,,regular,\r\nābantur,1st,passive,indicative,imperfect,plural,3rd,,regular,\r\nārer,1st,passive,subjunctive,imperfect,singular,1st,,regular,\r\nārēris,1st,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nārēre,1st,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nārētur,1st,passive,subjunctive,imperfect,singular,3rd,,regular,\r\nārēmur,1st,passive,subjunctive,imperfect,plural,1st,,regular,\r\nārēminī,1st,passive,subjunctive,imperfect,plural,2nd,,regular,\r\nārentur,1st,passive,subjunctive,imperfect,plural,3rd,,regular,\r\nēbar,2nd,passive,indicative,imperfect,singular,1st,,regular,\r\nēbāris,2nd,passive,indicative,imperfect,singular,2nd,,regular,\r\nēbāre,2nd,passive,indicative,imperfect,singular,2nd,,regular,\r\nēbātur,2nd,passive,indicative,imperfect,singular,3rd,,regular,\r\nēbāmur,2nd,passive,indicative,imperfect,plural,1st,,regular,\r\nēbāmini,2nd,passive,indicative,imperfect,plural,2nd,,regular,\r\nēbantur,2nd,passive,indicative,imperfect,plural,3rd,,regular,\r\nērer,2nd,passive,subjunctive,imperfect,singular,1st,,regular,\r\nērēris,2nd,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nērēre,2nd,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nērētur,2nd,passive,subjunctive,imperfect,singular,3rd,,regular,\r\nērēmur,2nd,passive,subjunctive,imperfect,plural,1st,,regular,\r\nērēminī,2nd,passive,subjunctive,imperfect,plural,2nd,,regular,\r\nērentur,2nd,passive,subjunctive,imperfect,plural,3rd,,regular,\r\nēbar,3rd,passive,indicative,imperfect,singular,1st,,regular,\r\nēbāris,3rd,passive,indicative,imperfect,singular,2nd,,regular,\r\nēbāre,3rd,passive,indicative,imperfect,singular,2nd,,regular,\r\nēbatur,3rd,passive,indicative,imperfect,singular,3rd,,regular,\r\nēbāmur,3rd,passive,indicative,imperfect,plural,1st,,regular,\r\nēbāminī,3rd,passive,indicative,imperfect,plural,2nd,,regular,\r\nēbantur,3rd,passive,indicative,imperfect,plural,3rd,,regular,\r\nerer,3rd,passive,subjunctive,imperfect,singular,1st,,regular,\r\nerēris,3rd,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nerēre,3rd,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nerētur,3rd,passive,subjunctive,imperfect,singular,3rd,,regular,\r\nerēmur,3rd,passive,subjunctive,imperfect,plural,1st,,regular,\r\nerēminī,3rd,passive,subjunctive,imperfect,plural,2nd,,regular,\r\nerentur,3rd,passive,subjunctive,imperfect,plural,3rd,,regular,\r\niēbar,4th,passive,indicative,imperfect,singular,1st,,regular,\r\niēbāris,4th,passive,indicative,imperfect,singular,2nd,,regular,\r\niēbāre,4th,passive,indicative,imperfect,singular,2nd,,regular,\r\niēbātur,4th,passive,indicative,imperfect,singular,3rd,,regular,\r\niēbāmur,4th,passive,indicative,imperfect,plural,1st,,regular,\r\niēbāminī,4th,passive,indicative,imperfect,plural,2nd,,regular,\r\niēbantur,4th,passive,indicative,imperfect,plural,3rd,,regular,\r\nīrer,4th,passive,subjunctive,imperfect,singular,1st,,regular,\r\nīrēris,4th,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nīrēre,4th,passive,subjunctive,imperfect,singular,2nd,,regular,\r\nīrētur,4th,passive,subjunctive,imperfect,singular,3rd,,regular,\r\nīrēmur,4th,passive,subjunctive,imperfect,plural,1st,,regular,\r\nīrēminī,4th,passive,subjunctive,imperfect,plural,2nd,,regular,\r\nīrentur,4th,passive,subjunctive,imperfect,plural,3rd,,regular,\r\nābor,1st,passive,indicative,future,singular,1st,,regular,\r\nāberis,1st,passive,indicative,future,singular,2nd,,regular,\r\nābere,1st,passive,indicative,future,singular,2nd,,irregular,\r\nābitur,1st,passive,indicative,future,singular,3rd,,regular,\r\nābimur,1st,passive,indicative,future,plural,1st,,regular,\r\nābiminī,1st,passive,indicative,future,plural,2nd,,regular,\r\nābuntur,1st,passive,indicative,future,plural,3rd,,regular,\r\n,1st,passive,subjunctive,future,singular,1st,,,\r\n,1st,passive,subjunctive,future,singular,2nd,,,\r\n,1st,passive,subjunctive,future,singular,3rd,,,\r\n,1st,passive,subjunctive,future,plural,1st,,,\r\n,1st,passive,subjunctive,future,plural,2nd,,,\r\n,1st,passive,subjunctive,future,plural,3rd,,,\r\nēbor,2nd,passive,indicative,future,singular,1st,,regular,\r\nēberis,2nd,passive,indicative,future,singular,2nd,,regular,\r\nēbere,2nd,passive,indicative,future,singular,2nd,,regular,\r\nēbitur,2nd,passive,indicative,future,singular,3rd,,regular,\r\nēbimur,2nd,passive,indicative,future,plural,1st,,regular,\r\nēbiminī,2nd,passive,indicative,future,plural,2nd,,regular,\r\nēbuntur,2nd,passive,indicative,future,plural,3rd,,regular,\r\n,2nd,passive,subjunctive,future,singular,1st,,,\r\n,2nd,passive,subjunctive,future,singular,2nd,,,\r\n,2nd,passive,subjunctive,future,singular,3rd,,,\r\n,2nd,passive,subjunctive,future,plural,1st,,,\r\n,2nd,passive,subjunctive,future,plural,2nd,,,\r\n,2nd,passive,subjunctive,future,plural,3rd,,,\r\nar,3rd,passive,indicative,future,singular,1st,,regular,\r\nēris,3rd,passive,indicative,future,singular,2nd,,regular,\r\nēre,3rd,passive,indicative,future,singular,2nd,,irregular,\r\nētur,3rd,passive,indicative,future,singular,3rd,,regular,\r\nēmur,3rd,passive,indicative,future,plural,1st,,regular,\r\nēminī,3rd,passive,indicative,future,plural,2nd,,regular,\r\nentur,3rd,passive,indicative,future,plural,3rd,,regular,\r\n,3rd,passive,subjunctive,future,singular,1st,,,\r\n,3rd,passive,subjunctive,future,singular,2nd,,,\r\n,3rd,passive,subjunctive,future,singular,3rd,,,\r\n,3rd,passive,subjunctive,future,plural,1st,,,\r\n,3rd,passive,subjunctive,future,plural,2nd,,,\r\n,3rd,passive,subjunctive,future,plural,3rd,,,\r\niar,4th,passive,indicative,future,singular,1st,,regular,\r\niēris,4th,passive,indicative,future,singular,2nd,,regular,\r\nīēre,4th,passive,indicative,future,singular,2nd,,irregular,\r\niētur,4th,passive,indicative,future,singular,3rd,,regular,\r\niēmur,4th,passive,indicative,future,plural,1st,,regular,\r\niēminī,4th,passive,indicative,future,plural,2nd,,regular,\r\nientur,4th,passive,indicative,future,plural,3rd,,regular,\r\n,4th,passive,subjunctive,future,singular,1st,,,\r\n,4th,passive,subjunctive,future,singular,2nd,,,\r\n,4th,passive,subjunctive,future,singular,3rd,,,\r\n,4th,passive,subjunctive,future,plural,1st,,,\r\n,4th,passive,subjunctive,future,plural,2nd,,,\r\n,4th,passive,subjunctive,future,plural,3rd,,,\r\nātus sum,1st,passive,indicative,perfect,singular,1st,,regular,\r\nātus fui,1st,passive,indicative,perfect,singular,1st,,regular,\r\nātus es,1st,passive,indicative,perfect,singular,2nd,,regular,\r\nātus fuisti,1st,passive,indicative,perfect,singular,2nd,,regular,\r\nātus est,1st,passive,indicative,perfect,singular,3rd,,regular,\r\nātus fuit,1st,passive,indicative,perfect,singular,3rd,,regular,\r\nāti sumus,1st,passive,indicative,perfect,plural,1st,,regular,\r\nāti fuimus,1st,passive,indicative,perfect,plural,1st,,irregular,\r\nāti estis,1st,passive,indicative,perfect,plural,2nd,,regular,\r\nāti fuistis,1st,passive,indicative,perfect,plural,2nd,,irregular,\r\nāti sunt,1st,passive,indicative,perfect,plural,3rd,,regular,\r\nāti fuerunt,1st,passive,indicative,perfect,plural,3rd,,irregular,\r\nātus sim,1st,passive,subjunctive,perfect,singular,1st,,regular,\r\nātus fuerim,1st,passive,subjunctive,perfect,singular,1st,,irregular,\r\nātus sis,1st,passive,subjunctive,perfect,singular,2nd,,regular,\r\nātus fueris,1st,passive,subjunctive,perfect,singular,2nd,,irregular,\r\nātus sit,1st,passive,subjunctive,perfect,singular,3rd,,regular,\r\nātus fuerit,1st,passive,subjunctive,perfect,singular,3rd,,regular,\r\nāti sīmus,1st,passive,subjunctive,perfect,plural,1st,,regular,\r\nāti fuerimus,1st,passive,subjunctive,perfect,plural,1st,,irregular,\r\nāti sītis,1st,passive,subjunctive,perfect,plural,2nd,,regular,\r\nāti fueritis,1st,passive,subjunctive,perfect,plural,2nd,,irregular,\r\nāti sint,1st,passive,subjunctive,perfect,plural,3rd,,regular,\r\nāti fuerint,1st,passive,subjunctive,perfect,plural,3rd,,irregular,\r\nitus sum,2nd,passive,indicative,perfect,singular,1st,,regular,\r\nitus es,2nd,passive,indicative,perfect,singular,2nd,,regular,\r\nitus est,2nd,passive,indicative,perfect,singular,3rd,,regular,\r\nitī sumus,2nd,passive,indicative,perfect,plural,1st,,regular,\r\nitī estis,2nd,passive,indicative,perfect,plural,2nd,,regular,\r\nitī sunt,2nd,passive,indicative,perfect,plural,3rd,,regular,\r\nitus sim,2nd,passive,subjunctive,perfect,singular,1st,,regular,\r\nitus sīs,2nd,passive,subjunctive,perfect,singular,2nd,,regular,\r\nitus sit,2nd,passive,subjunctive,perfect,singular,3rd,,regular,\r\nitī sīmus,2nd,passive,subjunctive,perfect,plural,1st,,regular,\r\nitī sītis,2nd,passive,subjunctive,perfect,plural,2nd,,regular,\r\nitī sint,2nd,passive,subjunctive,perfect,plural,3rd,,regular,\r\nus sum,3rd,passive,indicative,perfect,singular,1st,,regular,\r\nus es,3rd,passive,indicative,perfect,singular,2nd,,regular,\r\nus est,3rd,passive,indicative,perfect,singular,3rd,,regular,\r\nī sumus,3rd,passive,indicative,perfect,plural,1st,,regular,\r\nī estis,3rd,passive,indicative,perfect,plural,2nd,,regular,\r\nī sunt,3rd,passive,indicative,perfect,plural,3rd,,regular,\r\nus sim,3rd,passive,subjunctive,perfect,singular,1st,,regular,\r\nus sīs,3rd,passive,subjunctive,perfect,singular,2nd,,regular,\r\nus sit,3rd,passive,subjunctive,perfect,singular,3rd,,regular,\r\nus sīmus,3rd,passive,subjunctive,perfect,plural,1st,,regular,\r\nus sītis,3rd,passive,subjunctive,perfect,plural,2nd,,regular,\r\nus sint,3rd,passive,subjunctive,perfect,plural,3rd,,regular,\r\nītus sum,4th,passive,indicative,perfect,singular,1st,,regular,\r\nītus es,4th,passive,indicative,perfect,singular,2nd,,regular,\r\nītus est,4th,passive,indicative,perfect,singular,3rd,,regular,\r\nītī sumus,4th,passive,indicative,perfect,plural,1st,,regular,\r\nīti estis,4th,passive,indicative,perfect,plural,2nd,,regular,\r\nīti sunt,4th,passive,indicative,perfect,plural,3rd,,regular,\r\nītus sim,4th,passive,subjunctive,perfect,singular,1st,,regular,\r\nītus sīs,4th,passive,subjunctive,perfect,singular,2nd,,regular,\r\nītus sit,4th,passive,subjunctive,perfect,singular,3rd,,regular,\r\nītī sīmus,4th,passive,subjunctive,perfect,plural,1st,,regular,\r\nīti sītis,4th,passive,subjunctive,perfect,plural,2nd,,regular,\r\nīti sint,4th,passive,subjunctive,perfect,plural,3rd,,regular,\r\nātus eram,1st,passive,indicative,pluperfect,singular,1st,,regular,\r\nātus fueram,1st,passive,indicative,pluperfect,singular,1st,,irregular,\r\nātus eras,1st,passive,indicative,pluperfect,singular,2nd,,regular,\r\nātus fueras,1st,passive,indicative,pluperfect,singular,2nd,,irregular,\r\nātus erat,1st,passive,indicative,pluperfect,singular,3rd,,regular,\r\nātus fuerat,1st,passive,indicative,pluperfect,singular,3rd,,irregular,\r\nātī erāmus,1st,passive,indicative,pluperfect,plural,1st,,regular,\r\nātī fueramus,1st,passive,indicative,pluperfect,plural,1st,,irregular,\r\nātī erātis,1st,passive,indicative,pluperfect,plural,2nd,,regular,\r\nātī fueratis,1st,passive,indicative,pluperfect,plural,2nd,,irregular,\r\nātī erant,1st,passive,indicative,pluperfect,plural,3rd,,regular,\r\nātī fuerant,1st,passive,indicative,pluperfect,plural,3rd,,irregular,\r\nātus essem,1st,passive,subjunctive,pluperfect,singular,1st,,regular,\r\nātus fuissem,1st,passive,subjunctive,pluperfect,singular,1st,,irregular,\r\nātus esses,1st,passive,subjunctive,pluperfect,singular,2nd,,regular,\r\nātus fuissēs,1st,passive,subjunctive,pluperfect,singular,2nd,,irregular,\r\nātus esset,1st,passive,subjunctive,pluperfect,singular,3rd,,regular,\r\nātus fuisset,1st,passive,subjunctive,pluperfect,singular,3rd,,irregular,\r\nāti essēmus,1st,passive,subjunctive,pluperfect,plural,1st,,regular,\r\nāti fuissēmus,1st,passive,subjunctive,pluperfect,plural,1st,,irregular,\r\nāti essētis,1st,passive,subjunctive,pluperfect,plural,2nd,,regular,\r\nāti fuissētis,1st,passive,subjunctive,pluperfect,plural,2nd,,regular,\r\nāti essent,1st,passive,subjunctive,pluperfect,plural,3rd,,regular,\r\nāti fuissent,1st,passive,subjunctive,pluperfect,plural,3rd,,regular,\r\nitus eram,2nd,passive,indicative,pluperfect,singular,1st,,regular,\r\nitus erās,2nd,passive,indicative,pluperfect,singular,2nd,,regular,\r\nitus erat,2nd,passive,indicative,pluperfect,singular,3rd,,regular,\r\nitī erāmus,2nd,passive,indicative,pluperfect,plural,1st,,regular,\r\nitī erātis,2nd,passive,indicative,pluperfect,plural,2nd,,regular,\r\nitī erant,2nd,passive,indicative,pluperfect,plural,3rd,,regular,\r\nitus essem,2nd,passive,subjunctive,pluperfect,singular,1st,,regular,\r\nitus essēs,2nd,passive,subjunctive,pluperfect,singular,2nd,,regular,\r\nitus esset,2nd,passive,subjunctive,pluperfect,singular,3rd,,regular,\r\nitī essēmus,2nd,passive,subjunctive,pluperfect,plural,1st,,regular,\r\nīti essētis,2nd,passive,subjunctive,pluperfect,plural,2nd,,regular,\r\nīti essent,2nd,passive,subjunctive,pluperfect,plural,3rd,,regular,\r\nus eram,3rd,passive,indicative,pluperfect,singular,1st,,regular,\r\nus erās,3rd,passive,indicative,pluperfect,singular,2nd,,regular,\r\nus erat,3rd,passive,indicative,pluperfect,singular,3rd,,regular,\r\nī erāmus,3rd,passive,indicative,pluperfect,plural,1st,,regular,\r\nī erātis,3rd,passive,indicative,pluperfect,plural,2nd,,regular,\r\nī erant,3rd,passive,indicative,pluperfect,plural,3rd,,regular,\r\nus essem,3rd,passive,subjunctive,pluperfect,singular,1st,,regular,\r\nus essēs,3rd,passive,subjunctive,pluperfect,singular,2nd,,regular,\r\nus esset,3rd,passive,subjunctive,pluperfect,singular,3rd,,regular,\r\nī essēmus,3rd,passive,subjunctive,pluperfect,plural,1st,,regular,\r\nī essētis,3rd,passive,subjunctive,pluperfect,plural,2nd,,regular,\r\nī essent,3rd,passive,subjunctive,pluperfect,plural,3rd,,regular,\r\nītus eram,4th,passive,indicative,pluperfect,singular,1st,,regular,\r\nītus erās,4th,passive,indicative,pluperfect,singular,2nd,,regular,\r\nītus erat,4th,passive,indicative,pluperfect,singular,3rd,,regular,\r\nītī erāmus,4th,passive,indicative,pluperfect,plural,1st,,regular,\r\nīti erātis,4th,passive,indicative,pluperfect,plural,2nd,,regular,\r\nītī erant,4th,passive,indicative,pluperfect,plural,3rd,,regular,\r\nītus essem,4th,passive,subjunctive,pluperfect,singular,1st,,regular,\r\nītus essēs,4th,passive,subjunctive,pluperfect,singular,2nd,,regular,\r\nītus esset,4th,passive,subjunctive,pluperfect,singular,3rd,,regular,\r\nītī essēmus,4th,passive,subjunctive,pluperfect,plural,1st,,regular,\r\nīti essētis,4th,passive,subjunctive,pluperfect,plural,2nd,,regular,\r\nīti essent,4th,passive,subjunctive,pluperfect,plural,3rd,,regular,\r\nātus erō,1st,passive,indicative,future_perfect,singular,1st,,regular,\r\nātus eris,1st,passive,indicative,future_perfect,singular,2nd,,regular,\r\nātus erit,1st,passive,indicative,future_perfect,singular,3rd,,regular,\r\nāti erimus,1st,passive,indicative,future_perfect,plural,1st,,regular,\r\nāti eritis,1st,passive,indicative,future_perfect,plural,2nd,,regular,\r\nāti erunt,1st,passive,indicative,future_perfect,plural,3rd,,regular,\r\n,1st,passive,subjunctive,future_perfect,singular,1st,,,\r\n,1st,passive,subjunctive,future_perfect,singular,2nd,,,\r\n,1st,passive,subjunctive,future_perfect,singular,3rd,,,\r\n,1st,passive,subjunctive,future_perfect,plural,1st,,,\r\n,1st,passive,subjunctive,future_perfect,plural,2nd,,,\r\n,1st,passive,subjunctive,future_perfect,plural,3rd,,,\r\nitus erō,2nd,passive,indicative,future_perfect,singular,1st,,regular,\r\nitus eris,2nd,passive,indicative,future_perfect,singular,2nd,,regular,\r\nitus erit,2nd,passive,indicative,future_perfect,singular,3rd,,regular,\r\nitī erimus,2nd,passive,indicative,future_perfect,plural,1st,,regular,\r\nitī eritis,2nd,passive,indicative,future_perfect,plural,2nd,,regular,\r\nitī erunt,2nd,passive,indicative,future_perfect,plural,3rd,,regular,\r\n,2nd,passive,subjunctive,future_perfect,singular,1st,,,\r\n,2nd,passive,subjunctive,future_perfect,singular,2nd,,,\r\n,2nd,passive,subjunctive,future_perfect,singular,3rd,,,\r\n,2nd,passive,subjunctive,future_perfect,plural,1st,,,\r\n,2nd,passive,subjunctive,future_perfect,plural,2nd,,,\r\n,2nd,passive,subjunctive,future_perfect,plural,3rd,,,\r\nus erō,3rd,passive,indicative,future_perfect,singular,1st,,regular,\r\nus eris,3rd,passive,indicative,future_perfect,singular,2nd,,regular,\r\nus erit,3rd,passive,indicative,future_perfect,singular,3rd,,regular,\r\nī erimus,3rd,passive,indicative,future_perfect,plural,1st,,regular,\r\nī eritis,3rd,passive,indicative,future_perfect,plural,2nd,,regular,\r\nī erunt,3rd,passive,indicative,future_perfect,plural,3rd,,regular,\r\n,3rd,passive,subjunctive,future_perfect,singular,1st,,,\r\n,3rd,passive,subjunctive,future_perfect,singular,2nd,,,\r\n,3rd,passive,subjunctive,future_perfect,singular,3rd,,,\r\n,3rd,passive,subjunctive,future_perfect,plural,1st,,,\r\n,3rd,passive,subjunctive,future_perfect,plural,2nd,,,\r\n,3rd,passive,subjunctive,future_perfect,plural,3rd,,,\r\nītus erō,4th,passive,indicative,future_perfect,singular,1st,,regular,\r\nītus eris,4th,passive,indicative,future_perfect,singular,2nd,,regular,\r\nītus erit,4th,passive,indicative,future_perfect,singular,3rd,,regular,\r\nītī erimus,4th,passive,indicative,future_perfect,plural,1st,,regular,\r\nītī eritis,4th,passive,indicative,future_perfect,plural,2nd,,regular,\r\nītī erunt,4th,passive,indicative,future_perfect,plural,3rd,,regular,\r\n,4th,passive,subjunctive,future_perfect,singular,1st,,,\r\n,4th,passive,subjunctive,future_perfect,singular,2nd,,,\r\n,4th,passive,subjunctive,future_perfect,singular,3rd,,,\r\n,4th,passive,subjunctive,future_perfect,plural,1st,,,\r\n,4th,passive,subjunctive,future_perfect,plural,2nd,,,\r\n,4th,passive,subjunctive,future_perfect,plural,3rd,,,\r\nā,1st,active,imperative,present,singular,2nd,,regular,3\r\nāte,1st,active,imperative,present,plural,2nd,,regular,\r\nāre,1st,passive,imperative,present,singular,2nd,,regular,\r\nāminī,1st,passive,imperative,present,plural,2nd,,regular,\r\nē,2nd,active,imperative,present,singular,2nd,,regular,3\r\nēte,2nd,active,imperative,present,plural,2nd,,regular,\r\nēre,2nd,passive,imperative,present,singular,2nd,,regular,\r\nēminī,2nd,passive,imperative,present,plural,2nd,,regular,\r\ne,3rd,active,imperative,present,singular,2nd,,regular,3\r\nīte,3rd,active,imperative,present,plural,2nd,,regular,\r\nere,3rd,passive,imperative,present,singular,2nd,,regular,\r\niminī,3rd,passive,imperative,present,plural,2nd,,regular,\r\nī,4th,active,imperative,present,singular,2nd,,regular,3\r\nīte,4th,active,imperative,present,plural,2nd,,regular,\r\nīre,4th,passive,imperative,present,singular,2nd,,regular,\r\nīminī,4th,passive,imperative,present,plural,2nd,,regular,\r\nātō,1st,active,imperative,future,singular,2nd,,regular,\r\nātō,1st,active,imperative,future,singular,3rd,,regular,\r\nātote,1st,active,imperative,future,plural,2nd,,regular,\r\nantō,1st,active,imperative,future,plural,3rd,,regular,\r\nātōr,1st,passive,imperative,future,singular,2nd,,regular,\r\n,1st,passive,imperative,future,singular,3rd,,,\r\nātor,1st,passive,imperative,future,plural,2nd,,regular,\r\namantor,1st,passive,imperative,future,plural,3rd,,regular,\r\nētō,2nd,active,imperative,future,singular,2nd,,regular,\r\nētō,2nd,active,imperative,future,singular,3rd,,regular,\r\nētōte,2nd,active,imperative,future,plural,2nd,,regular,\r\nentō,2nd,active,imperative,future,plural,3rd,,regular,\r\nētor,2nd,passive,imperative,future,singular,2nd,,regular,\r\n,2nd,passive,imperative,future,singular,3rd,,,\r\nētor,2nd,passive,imperative,future,plural,2nd,,regular,\r\nentor,2nd,passive,imperative,future,plural,3rd,,regular,\r\nitō,3rd,active,imperative,future,singular,2nd,,regular,\r\nitō,3rd,active,imperative,future,singular,3rd,,regular,\r\nitōte,3rd,active,imperative,future,plural,2nd,,regular,\r\nuntō,3rd,active,imperative,future,plural,3rd,,regular,\r\nitor,3rd,passive,imperative,future,singular,2nd,,regular,\r\n,3rd,passive,imperative,future,singular,3rd,,,\r\nitor,3rd,passive,imperative,future,plural,2nd,,regular,\r\nuntor,3rd,passive,imperative,future,plural,3rd,,regular,\r\nītō,4th,active,imperative,future,singular,2nd,,regular,\r\nītō,4th,active,imperative,future,singular,3rd,,regular,\r\nītōte,4th,active,imperative,future,plural,2nd,,regular,\r\niuntō,4th,active,imperative,future,plural,3rd,,regular,\r\nītor,4th,passive,imperative,future,singular,2nd,,regular,\r\n,4th,passive,imperative,future,singular,3rd,,,\r\nītor,4th,passive,imperative,future,plural,2nd,,regular,\r\niuntor,4th,passive,imperative,future,plural,3rd,,regular,\r\nāre,1st,active,infinitive,present,,,,regular,\r\nēre,2nd,active,infinitive,present,,,,regular,\r\nere,3rd,active,infinitive,present,,,,regular,\r\nīre,4th,active,infinitive,present,,,,regular,\r\nāvisse,1st,active,infinitive,perfect,,,,regular,\r\nvisse,2nd,active,infinitive,perfect,,,,regular,\r\nisse,3rd,active,infinitive,perfect,,,,regular,\r\nīvisse,4th,active,infinitive,perfect,,,,regular,\r\nāturus esse,1st,active,infinitive,future,,,,regular,\r\ntūrus esse,2nd,active,infinitive,future,,,,regular,\r\ntūrus esse,3rd,active,infinitive,future,,,,regular,\r\nītūrus esse,4th,active,infinitive,future,,,,regular,\r\nārī,1st,passive,infinitive,present,,,,regular,\r\nērī,2nd,passive,infinitive,present,,,,regular,\r\nī,3rd,passive,infinitive,present,,,,regular,\r\nīrī,4th,passive,infinitive,present,,,,regular,\r\nāus esse,1st,passive,infinitive,perfect,,,,regular,\r\nitus esse,2nd,passive,infinitive,perfect,,,,regular,\r\ntus esse,3rd,passive,infinitive,perfect,,,,regular,\r\nītus esse,4th,passive,infinitive,perfect,,,,regular,\r\nātum īrī,1st,passive,infinitive,future,,,,regular,\r\nitum īrī,2nd,passive,infinitive,future,,,,regular,\r\ntum īri,3rd,passive,infinitive,future,,,,regular,\r\nītum īrī,4th,passive,infinitive,future,,,,regular,\r\nandī,1st,active,gerundive,,,,genitive,regular,\r\nendī,2nd,active,gerundive,,,,genitive,regular,\r\nendī,3rd,active,gerundive,,,,genitive,regular,\r\niendī,4th,active,gerundive,,,,genitive,regular,\r\nandō,1st,active,gerundive,,,,dative,regular,\r\nendō,2nd,active,gerundive,,,,dative,regular,\r\nendō,3rd,active,gerundive,,,,dative,regular,\r\niendō,4th,active,gerundive,,,,dative,regular,\r\nandum,1st,active,gerundive,,,,accusative,regular,\r\nendum,2nd,active,gerundive,,,,accusative,regular,\r\nendum,3rd,active,gerundive,,,,accusative,regular,\r\niendum,4th,active,gerundive,,,,accusative,regular,\r\nandō,1st,active,gerundive,,,,ablative,regular,\r\nendō,2nd,active,gerundive,,,,ablative,regular,\r\nendō,3rd,active,gerundive,,,,ablative,regular,\r\niendō,4th,active,gerundive,,,,ablative,regular,\r\n,1st,passive,gerundive,,,,genitive,,\r\n,2nd,passive,gerundive,,,,genitive,,\r\n,3rd,passive,gerundive,,,,genitive,,\r\n,4th,passive,gerundive,,,,genitive,,\r\n,1st,passive,gerundive,,,,dative,,\r\n,2nd,passive,gerundive,,,,dative,,\r\n,3rd,passive,gerundive,,,,dative,,\r\n,4th,passive,gerundive,,,,dative,,\r\n,1st,passive,gerundive,,,,accusative,,\r\n,2nd,passive,gerundive,,,,accusative,,\r\n,3rd,passive,gerundive,,,,accusative,,\r\n,4th,passive,gerundive,,,,accusative,,\r\n,1st,passive,gerundive,,,,ablative,,\r\n,2nd,passive,gerundive,,,,ablative,,\r\n,3rd,passive,gerundive,,,,ablative,,\r\n,4th,passive,gerundive,,,,ablative,,\r\n";

var verbFootnotesCSV = "Index,Text\r\n2,Chiefly in poetry.\r\n3,\"In tenses based on the perfect stem (the perfect, pluperfect and future perfect of the Active voice) a v between two vowels is often lost with contraction of the two vowels, thus āvī to ā, ēvī to ē, ōvi to ō. Perfects in īvī often omit the v but rarely contract the vowels, except before ss or st, and sometimes in the third person. In addition to the use of v or u, the Active perfect stem can also be formed in a number of other ways, such as the addition of s to the root (eg carpsi), reduplication of the root (eg cecidi from cado), and simple lengthening of the vowel (eg vidī from video or legī from lego).\"\r\n4,\"Dic, duc, fac, and fer lack a final vowel in the imperative in classical Latin. The singular imperative of the verb sciō is always scītō, and the plural is usually scītōte.\"\r\n5,Common in epic poetry.\r\n6,Present in early Latin but chiefly confined to popular use until Livy and later writers.\r\n7,The verb fīō is a 4th conjugation verb that is irregular in only two forms: the present infinitive fierī and the imperfect subjunctive fierem.";

var verbFormsCSV = "Lemma,PrincipalParts,Form,Voice,Mood,Tense,Number,Person,Footnote\r\nsum,esse_fui_futurus,sum,,indicative,present,singular,1st,\r\nsum,esse_fui_futurus,es,,indicative,present,singular,2nd,\r\nsum,esse_fui_futurus,est,,indicative,present,singular,3rd,\r\nsum,esse_fui_futurus,sumus,,indicative,present,plural,1st,\r\nsum,esse_fui_futurus,estis,,indicative,present,plural,2nd,\r\nsum,esse_fui_futurus,sunt,,indicative,present,plural,3rd,\r\nsum,esse_fui_futurus,sim,,subjunctive,present,singular,1st,\r\nsum,esse_fui_futurus,siem,,subjunctive,present,singular,1st,1\r\nsum,esse_fui_futurus,fuam,,subjunctive,present,singular,1st,1\r\nsum,esse_fui_futurus,sīs,,subjunctive,present,singular,2nd,\r\nsum,esse_fui_futurus,siēs,,subjunctive,present,singular,2nd,1\r\nsum,esse_fui_futurus,fuās,,subjunctive,present,singular,2nd,1\r\nsum,esse_fui_futurus,sit,,subjunctive,present,singular,3rd,\r\nsum,esse_fui_futurus,siet,,subjunctive,present,singular,3rd,1\r\nsum,esse_fui_futurus,fuat,,subjunctive,present,singular,3rd,1\r\nsum,esse_fui_futurus,sīmus,,subjunctive,present,plural,1st,\r\nsum,esse_fui_futurus,sītis,,subjunctive,present,plural,2nd,\r\nsum,esse_fui_futurus,sint,,subjunctive,present,plural,3rd,\r\nsum,esse_fui_futurus,sient,,subjunctive,present,plural,3rd,1\r\nsum,esse_fui_futurus,fuant,,subjunctive,present,plural,3rd,1\r\nsum,esse_fui_futurus,es,,imperative,present,singular,2nd,\r\nsum,esse_fui_futurus,este,,imperative,present,plural,2nd,\r\nsum,esse_fui_futurus,esse,,infinitive,present,,,\r\nsum,esse_fui_futurus,eram,,indicative,imperfect,singular,1st,\r\nsum,esse_fui_futurus,erās,,indicative,imperfect,singular,2nd,\r\nsum,esse_fui_futurus,erat,,indicative,imperfect,singular,3rd,\r\nsum,esse_fui_futurus,erāmus,,indicative,imperfect,plural,1st,\r\nsum,esse_fui_futurus,erātis,,indicative,imperfect,plural,2nd,\r\nsum,esse_fui_futurus,erant,,indicative,imperfect,plural,3rd,\r\nsum,esse_fui_futurus,essem,,subjunctive,imperfect,singular,1st,\r\nsum,esse_fui_futurus,forem,,subjunctive,imperfect,singular,1st,2\r\nsum,esse_fui_futurus,essēs,,subjunctive,imperfect,singular,2nd,\r\nsum,esse_fui_futurus,forēs,,subjunctive,imperfect,singular,2nd,2\r\nsum,esse_fui_futurus,esset,,subjunctive,imperfect,singular,3rd,\r\nsum,esse_fui_futurus,foret,,subjunctive,imperfect,singular,3rd,2\r\nsum,esse_fui_futurus,essēmus,,subjunctive,imperfect,plural,1st,\r\nsum,esse_fui_futurus,forēmus,,subjunctive,imperfect,plural,1st,2\r\nsum,esse_fui_futurus,essētis,,subjunctive,imperfect,plural,2nd,\r\nsum,esse_fui_futurus,forētis,,subjunctive,imperfect,plural,2nd,2\r\nsum,esse_fui_futurus,essent,,subjunctive,imperfect,plural,3rd,\r\nsum,esse_fui_futurus,forent,,subjunctive,imperfect,plural,3rd,2\r\nsum,esse_fui_futurus,erō,,indicative,future,singular,1st,\r\nsum,esse_fui_futurus,eris,,indicative,future,singular,2nd,\r\nsum,esse_fui_futurus,erit,,indicative,future,singular,3rd,\r\nsum,esse_fui_futurus,escit,,indicative,future,singular,3rd,1\r\nsum,esse_fui_futurus,erimus,,indicative,future,plural,1st,\r\nsum,esse_fui_futurus,eritis,,indicative,future,plural,2nd,\r\nsum,esse_fui_futurus,erunt,,indicative,future,plural,3rd,\r\nsum,esse_fui_futurus,escunt,,indicative,future,plural,3rd,1\r\nsum,esse_fui_futurus,estō,,imperative,future,singular,2nd,\r\nsum,esse_fui_futurus,estō,,imperative,future,singular,3rd,\r\nsum,esse_fui_futurus,estōte,,imperative,future,plural,2nd,\r\nsum,esse_fui_futurus,suntō,,imperative,future,plural,3rd,\r\nsum,esse_fui_futurus,futūrus esse,,infinitive,future,,,\r\nsum,esse_fui_futurus,fore,,infinitive,future,,,\r\nsum,esse_fui_futurus,futūrus,,verb_participle,future,,,\r\nsum,esse_fui_futurus,-a,,verb_participle,future,,,\r\nsum,esse_fui_futurus,-um,,verb_participle,future,,,\r\nsum,esse_fui_futurus,fuī,,indicative,perfect,singular,1st,\r\nsum,esse_fui_futurus,fuistī,,indicative,perfect,singular,2nd,\r\nsum,esse_fui_futurus,fuit,,indicative,perfect,singular,3rd,\r\nsum,esse_fui_futurus,fuimus,,indicative,perfect,plural,1st,\r\nsum,esse_fui_futurus,fuistis,,indicative,perfect,plural,2nd,\r\nsum,esse_fui_futurus,fuērunt,,indicative,perfect,plural,3rd,\r\nsum,esse_fui_futurus,fuēre,,indicative,perfect,plural,3rd,\r\nsum,esse_fui_futurus,fuerim,,subjunctive,perfect,singular,1st,\r\nsum,esse_fui_futurus,fueris,,subjunctive,perfect,singular,2nd,\r\nsum,esse_fui_futurus,fuerit,,subjunctive,perfect,singular,3rd,\r\nsum,esse_fui_futurus,fuerimus,,subjunctive,perfect,plural,1st,\r\nsum,esse_fui_futurus,fūvimus,,subjunctive,perfect,plural,1st,\r\nsum,esse_fui_futurus,fueritis,,subjunctive,perfect,plural,2nd,\r\nsum,esse_fui_futurus,fuerint,,subjunctive,perfect,plural,3rd,\r\nsum,esse_fui_futurus,fuisse,,infinitive,perfect,,,\r\nsum,esse_fui_futurus,fueram,,indicative,pluperfect,singular,1st,\r\nsum,esse_fui_futurus,fuerās,,indicative,pluperfect,singular,2nd,\r\nsum,esse_fui_futurus,fuerat,,indicative,pluperfect,singular,3rd,\r\nsum,esse_fui_futurus,fuerāmus,,indicative,pluperfect,plural,1st,\r\nsum,esse_fui_futurus,fuerātis,,indicative,pluperfect,plural,2nd,\r\nsum,esse_fui_futurus,fuerant,,indicative,pluperfect,plural,3rd,\r\nsum,esse_fui_futurus,fuissem,,subjunctive,pluperfect,singular,1st,\r\nsum,esse_fui_futurus,fuissēs,,subjunctive,pluperfect,singular,2nd,\r\nsum,esse_fui_futurus,fuisset,,subjunctive,pluperfect,singular,3rd,\r\nsum,esse_fui_futurus,fūvisset,,subjunctive,pluperfect,singular,3rd,\r\nsum,esse_fui_futurus,fuissēmus,,subjunctive,pluperfect,plural,1st,\r\nsum,esse_fui_futurus,fuissētis,,subjunctive,pluperfect,plural,2nd,\r\nsum,esse_fui_futurus,fuissent,,subjunctive,pluperfect,plural,3rd,\r\nsum,esse_fui_futurus,fuerō,,indicative,future_perfect,singular,1st,\r\nsum,esse_fui_futurus,fueris,,indicative,future_perfect,singular,2nd,\r\nsum,esse_fui_futurus,fuerit,,indicative,future_perfect,singular,3rd,\r\nsum,esse_fui_futurus,fuerimus,,indicative,future_perfect,plural,1st,\r\nsum,esse_fui_futurus,fueritis,,indicative,future_perfect,plural,2nd,\r\nsum,esse_fui_futurus,fuerint,,indicative,future_perfect,plural,3rd,\r\nfero,ferre_tuli_latus,ferō,active,indicative,present,singular,1st,\r\nfero,ferre_tuli_latus,fers,active,indicative,present,singular,2nd,\r\nfero,ferre_tuli_latus,fert,active,indicative,present,singular,3rd,\r\nfero,ferre_tuli_latus,ferimus,active,indicative,present,plural,1st,\r\nfero,ferre_tuli_latus,fertis,active,indicative,present,plural,2nd,\r\nfero,ferre_tuli_latus,ferunt,active,indicative,present,plural,3rd,\r\nfero,ferre_tuli_latus,feram,active,subjunctive,present,singular,1st,\r\nfero,ferre_tuli_latus,ferās,active,subjunctive,present,singular,2nd,\r\nfero,ferre_tuli_latus,ferat,active,subjunctive,present,singular,3rd,\r\nfero,ferre_tuli_latus,ferāmus,active,subjunctive,present,plural,1st,\r\nfero,ferre_tuli_latus,ferātis,active,subjunctive,present,plural,2nd,\r\nfero,ferre_tuli_latus,ferant,active,subjunctive,present,plural,3rd,\r\nfero,ferre_tuli_latus,fer,active,imperative,present,singular,2nd,\r\nfero,ferre_tuli_latus,ferte,active,imperative,present,plural,2nd,\r\nfero,ferre_tuli_latus,ferre,active,infinitive,present,,,3\r\nfero,ferre_tuli_latus,feror,passive,indicative,present,singular,1st,\r\nfero,ferre_tuli_latus,ferris,passive,indicative,present,singular,2nd,\r\nfero,ferre_tuli_latus,ferre,passive,indicative,present,singular,2nd,\r\nfero,ferre_tuli_latus,fertur,passive,indicative,present,singular,3rd,\r\nfero,ferre_tuli_latus,ferimur,passive,indicative,present,plural,1st,\r\nfero,ferre_tuli_latus,feriminī,passive,indicative,present,plural,2nd,\r\nfero,ferre_tuli_latus,feruntur,passive,indicative,present,plural,3rd,\r\nfero,ferre_tuli_latus,ferar,passive,subjunctive,present,singular,1st,\r\nfero,ferre_tuli_latus,ferāris,passive,subjunctive,present,singular,2nd,\r\nfero,ferre_tuli_latus,ferāre,passive,subjunctive,present,singular,2nd,\r\nfero,ferre_tuli_latus,ferātur,passive,subjunctive,present,singular,3rd,\r\nfero,ferre_tuli_latus,ferāmur,passive,subjunctive,present,plural,1st,\r\nfero,ferre_tuli_latus,ferāminī,passive,subjunctive,present,plural,2nd,\r\nfero,ferre_tuli_latus,ferantur,passive,subjunctive,present,plural,3rd,\r\nfero,ferre_tuli_latus,ferre,passive,imperative,present,singular,2nd,\r\nfero,ferre_tuli_latus,feriminī,passive,imperative,present,plural,2nd,\r\nfero,ferre_tuli_latus,ferrī,passive,infinitive,present,,,\r\nfero,ferre_tuli_latus,ferēns,active,verb_participle,present,,,\r\nfero,ferre_tuli_latus,-entis,active,verb_participle,present,,,\r\nfero,ferre_tuli_latus,ferēbam,active,indicative,imperfect,singular,1st,\r\nfero,ferre_tuli_latus,ferēbās,active,indicative,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferēbat,active,indicative,imperfect,singular,3rd,\r\nfero,ferre_tuli_latus,ferēbāmus,active,indicative,imperfect,plural,1st,\r\nfero,ferre_tuli_latus,ferēbātis,active,indicative,imperfect,plural,2nd,\r\nfero,ferre_tuli_latus,ferēbant,active,indicative,imperfect,plural,3rd,\r\nfero,ferre_tuli_latus,ferrem,active,subjunctive,imperfect,singular,1st,3\r\nfero,ferre_tuli_latus,ferrēs,active,subjunctive,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferret,active,subjunctive,imperfect,singular,3rd,\r\nfero,ferre_tuli_latus,ferrēmus,active,subjunctive,imperfect,plural,1st,\r\nfero,ferre_tuli_latus,ferrētis,active,subjunctive,imperfect,plural,2nd,\r\nfero,ferre_tuli_latus,ferrent,active,subjunctive,imperfect,plural,3rd,\r\nfero,ferre_tuli_latus,ferēbar,passive,indicative,imperfect,singular,1st,\r\nfero,ferre_tuli_latus,ferēbāris,passive,indicative,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferēbāre,passive,indicative,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferēbātur,passive,indicative,imperfect,singular,3rd,\r\nfero,ferre_tuli_latus,ferēbāmur,passive,indicative,imperfect,plural,1st,\r\nfero,ferre_tuli_latus,ferēbāminī,passive,indicative,imperfect,plural,2nd,\r\nfero,ferre_tuli_latus,ferēbantur,passive,indicative,imperfect,plural,3rd,\r\nfero,ferre_tuli_latus,ferrer,passive,subjunctive,imperfect,singular,1st,\r\nfero,ferre_tuli_latus,ferrēris,passive,subjunctive,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferrēre,passive,subjunctive,imperfect,singular,2nd,\r\nfero,ferre_tuli_latus,ferrētur,passive,subjunctive,imperfect,singular,3rd,\r\nfero,ferre_tuli_latus,ferrēmur,passive,subjunctive,imperfect,plural,1st,\r\nfero,ferre_tuli_latus,ferrēminī,passive,subjunctive,imperfect,plural,2nd,\r\nfero,ferre_tuli_latus,ferrentur,passive,subjunctive,imperfect,plural,3rd,\r\nfero,ferre_tuli_latus,feram,active,indicative,future,singular,1st,\r\nfero,ferre_tuli_latus,ferēs,active,indicative,future,singular,2nd,\r\nfero,ferre_tuli_latus,feret,active,indicative,future,singular,3rd,\r\nfero,ferre_tuli_latus,ferēmus,active,indicative,future,plural,1st,\r\nfero,ferre_tuli_latus,ferētis,active,indicative,future,plural,2nd,\r\nfero,ferre_tuli_latus,ferent,active,indicative,future,plural,3rd,\r\nfero,ferre_tuli_latus,ferar,passive,indicative,future,singular,1st,\r\nfero,ferre_tuli_latus,ferēris,passive,indicative,future,singular,2nd,\r\nfero,ferre_tuli_latus,ferēre,passive,indicative,future,singular,2nd,\r\nfero,ferre_tuli_latus,ferētur,passive,indicative,future,singular,3rd,\r\nfero,ferre_tuli_latus,ferēmur,passive,indicative,future,plural,1st,\r\nfero,ferre_tuli_latus,ferēminī,passive,indicative,future,plural,2nd,\r\nfero,ferre_tuli_latus,ferentur,passive,indicative,future,plural,3rd,\r\nfero,ferre_tuli_latus,fertō,active,imperative,future,singular,2nd,\r\nfero,ferre_tuli_latus,fertōte,active,imperative,future,singular,3rd,\r\nfero,ferre_tuli_latus,fertō,active,imperative,future,plural,2nd,\r\nfero,ferre_tuli_latus,feruntō,active,imperative,future,plural,3rd,\r\nfero,ferre_tuli_latus,fertor,passive,imperative,future,singular,2nd,\r\nfero,ferre_tuli_latus,fertor,passive,imperative,future,plural,2nd,\r\nfero,ferre_tuli_latus,feruntor,passive,imperative,future,plural,3rd,\r\nfero,ferre_tuli_latus,latūrus esse,active,infinitive,future,,,\r\nfero,ferre_tuli_latus,latūm īrī,passive,infinitive,future,,,\r\nfero,ferre_tuli_latus,latūrus,active,verb_participle,future,,,\r\nfero,ferre_tuli_latus,ferundus,passive,verb_participle,future,,,4\r\nfero,ferre_tuli_latus,tulī,active,indicative,perfect,singular,1st,\r\nfero,ferre_tuli_latus,tulistī,active,indicative,perfect,singular,2nd,\r\nfero,ferre_tuli_latus,tulit,active,indicative,perfect,singular,3rd,\r\nfero,ferre_tuli_latus,tulimus,active,indicative,perfect,plural,1st,\r\nfero,ferre_tuli_latus,tulistis,active,indicative,perfect,plural,2nd,\r\nfero,ferre_tuli_latus,tulērunt,active,indicative,perfect,plural,3rd,\r\nfero,ferre_tuli_latus,tulerim,active,subjunctive,perfect,singular,1st,\r\nfero,ferre_tuli_latus,tulerīs,active,subjunctive,perfect,singular,2nd,\r\nfero,ferre_tuli_latus,tulerit,active,subjunctive,perfect,singular,3rd,\r\nfero,ferre_tuli_latus,tulerimus,active,subjunctive,perfect,plural,1st,\r\nfero,ferre_tuli_latus,tuleritis,active,subjunctive,perfect,plural,2nd,\r\nfero,ferre_tuli_latus,tulerint,active,subjunctive,perfect,plural,3rd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) sum\",passive,indicative,perfect,singular,1st,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) es\",passive,indicative,perfect,singular,2nd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) est\",passive,indicative,perfect,singular,3rd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) sumus\",passive,indicative,perfect,plural,1st,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) estis\",passive,indicative,perfect,plural,2nd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) sunt\",passive,indicative,perfect,plural,3rd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) sim\",passive,subjunctive,perfect,singular,1st,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) sīs\",passive,subjunctive,perfect,singular,2nd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um)sit\",passive,subjunctive,perfect,singular,3rd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) sīmus\",passive,subjunctive,perfect,plural,1st,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) sītis\",passive,subjunctive,perfect,plural,2nd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a)sint\",passive,subjunctive,perfect,plural,3rd,\r\nfero,ferre_tuli_latus,tulisse,active,infinitive,perfect,,,\r\nfero,ferre_tuli_latus,lātus esse,passive,infinitive,perfect,,,\r\nfero,ferre_tuli_latus,\"lātus, -ta, -tum\",passive,verb_participle,perfect,,,8\r\nfero,ferre_tuli_latus,tuleram,active,indicative,pluperfect,singular,1st,\r\nfero,ferre_tuli_latus,tulerās,active,indicative,pluperfect,singular,2nd,\r\nfero,ferre_tuli_latus,tulerat,active,indicative,pluperfect,singular,3rd,\r\nfero,ferre_tuli_latus,tulerāmus,active,indicative,pluperfect,plural,1st,\r\nfero,ferre_tuli_latus,tulerātis,active,indicative,pluperfect,plural,2nd,\r\nfero,ferre_tuli_latus,tulerant,active,indicative,pluperfect,plural,3rd,\r\nfero,ferre_tuli_latus,tulissem,active,subjunctive,pluperfect,singular,1st,\r\nfero,ferre_tuli_latus,tulissēs,active,subjunctive,pluperfect,singular,2nd,\r\nfero,ferre_tuli_latus,tulisset,active,subjunctive,pluperfect,singular,3rd,\r\nfero,ferre_tuli_latus,tulissēmus,active,subjunctive,pluperfect,plural,1st,\r\nfero,ferre_tuli_latus,tulissētis,active,subjunctive,pluperfect,plural,2nd,\r\nfero,ferre_tuli_latus,tulissent,active,subjunctive,pluperfect,plural,3rd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) eram\",passive,indicative,pluperfect,singular,1st,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) erās\",passive,indicative,pluperfect,singular,2nd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) erat\",passive,indicative,pluperfect,singular,3rd,\r\nfero,ferre_tuli_latus,\"latī (-ae, a) erāmus\",passive,indicative,pluperfect,plural,1st,\r\nfero,ferre_tuli_latus,\"latī (-ae, a) erātis\",passive,indicative,pluperfect,plural,2nd,\r\nfero,ferre_tuli_latus,\"latī (-ae, a) erant\",passive,indicative,pluperfect,plural,3rd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) essem\",passive,subjunctive,pluperfect,singular,1st,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) essēs\",passive,subjunctive,pluperfect,singular,2nd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) esset\",passive,subjunctive,pluperfect,singular,3rd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) essēmus\",passive,subjunctive,pluperfect,plural,1st,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) essētis\",passive,subjunctive,pluperfect,plural,2nd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) essent\",passive,subjunctive,pluperfect,plural,3rd,\r\nfero,ferre_tuli_latus,tulerō,active,indicative,future_perfect,singular,1st,\r\nfero,ferre_tuli_latus,tuleris,active,indicative,future_perfect,singular,2nd,\r\nfero,ferre_tuli_latus,tulerit,active,indicative,future_perfect,singular,3rd,\r\nfero,ferre_tuli_latus,tulerimus,active,indicative,future_perfect,plural,1st,\r\nfero,ferre_tuli_latus,tuleritis,active,indicative,future_perfect,plural,2nd,\r\nfero,ferre_tuli_latus,tulerint,active,indicative,future_perfect,plural,3rd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) erō\",passive,indicative,future_perfect,singular,1st,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) eris\",passive,indicative,future_perfect,singular,2nd,\r\nfero,ferre_tuli_latus,\"lātus (-a, -um) erit\",passive,indicative,future_perfect,singular,3rd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) erimus\",passive,indicative,future_perfect,plural,1st,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) ēritis\",passive,indicative,future_perfect,plural,2nd,\r\nfero,ferre_tuli_latus,\"latī (-ae, -a) ērunt\",passive,indicative,future_perfect,plural,3rd,\r\nfero,ferre_tuli_latus,ferendī,,gerundive,,,,5\r\nfero,ferre_tuli_latus,ferendō,,gerundive,,,,\r\nfero,ferre_tuli_latus,ferendum,,gerundive,,,,\r\nfero,ferre_tuli_latus,ferendō,,gerundive,,,,\r\nfero,ferre_tuli_latus,lātum,,supine,,,,5\r\nfero,ferre_tuli_latus,lātū,,supine,,,,\r\nfero,ferre_tuli_latus,lātū,,supine,,,,\r\nvolo,velle_volui_-,volō,,indicative,present,singular,1st,\r\nvolo,velle_volui_-,vīs,,indicative,present,singular,2nd,\r\nvolo,velle_volui_-,vult,,indicative,present,singular,3rd,\r\nvolo,velle_volui_-,volt,,indicative,present,singular,3rd,7\r\nvolo,velle_volui_-,volumus,,indicative,present,plural,1st,\r\nvolo,velle_volui_-,vultis,,indicative,present,plural,2nd,\r\nvolo,velle_volui_-,volunt,,indicative,present,plural,3rd,\r\nvolo,velle_volui_-,velim,,subjunctive,present,singular,1st,\r\nvolo,velle_volui_-,velīs,,subjunctive,present,singular,2nd,\r\nvolo,velle_volui_-,velit,,subjunctive,present,singular,3rd,\r\nvolo,velle_volui_-,velīmus,,subjunctive,present,plural,1st,\r\nvolo,velle_volui_-,velītis,,subjunctive,present,plural,2nd,\r\nvolo,velle_volui_-,velint,,subjunctive,present,plural,3rd,\r\nvolo,velle_volui_-,velle,,infinitive,present,,,\r\nvolo,velle_volui_-,volēns,,verb_participle,present,,,\r\nvolo,velle_volui_-,-entis,,verb_participle,present,,,\r\nvolo,velle_volui_-,volēbam,,indicative,imperfect,singular,1st,\r\nvolo,velle_volui_-,volēbās,,indicative,imperfect,singular,2nd,\r\nvolo,velle_volui_-,volēbat,,indicative,imperfect,singular,3rd,\r\nvolo,velle_volui_-,volēbāmus,,indicative,imperfect,plural,1st,\r\nvolo,velle_volui_-,volēbātis,,indicative,imperfect,plural,2nd,\r\nvolo,velle_volui_-,volēbant,,indicative,imperfect,plural,3rd,\r\nvolo,velle_volui_-,vellem,,subjunctive,imperfect,singular,1st,\r\nvolo,velle_volui_-,vellēs,,subjunctive,imperfect,singular,2nd,\r\nvolo,velle_volui_-,vellet,,subjunctive,imperfect,singular,3rd,\r\nvolo,velle_volui_-,vellēmus,,subjunctive,imperfect,plural,1st,\r\nvolo,velle_volui_-,vellētis,,subjunctive,imperfect,plural,2nd,\r\nvolo,velle_volui_-,vellent,,subjunctive,imperfect,plural,3rd,\r\nvolo,velle_volui_-,volam,,indicative,future,singular,1st,\r\nvolo,velle_volui_-,volēs,,indicative,future,singular,2nd,\r\nvolo,velle_volui_-,volet,,indicative,future,singular,3rd,\r\nvolo,velle_volui_-,volēmus,,indicative,future,plural,1st,\r\nvolo,velle_volui_-,volētis,,indicative,future,plural,2nd,\r\nvolo,velle_volui_-,volent,,indicative,future,plural,3rd,\r\nvolo,velle_volui_-,voluī,,indicative,perfect,singular,1st,\r\nvolo,velle_volui_-,voluistī,,indicative,perfect,singular,2nd,\r\nvolo,velle_volui_-,voluit,,indicative,perfect,singular,3rd,\r\nvolo,velle_volui_-,voluimus,,indicative,perfect,plural,1st,\r\nvolo,velle_volui_-,voluistis,,indicative,perfect,plural,2nd,\r\nvolo,velle_volui_-,voluērunt,,indicative,perfect,plural,3rd,\r\nvolo,velle_volui_-,voluerim,,subjunctive,perfect,singular,1st,\r\nvolo,velle_volui_-,voluerīs,,subjunctive,perfect,singular,2nd,\r\nvolo,velle_volui_-,voluerit,,subjunctive,perfect,singular,3rd,\r\nvolo,velle_volui_-,voluerīmus,,subjunctive,perfect,plural,1st,\r\nvolo,velle_volui_-,voluerītis,,subjunctive,perfect,plural,2nd,\r\nvolo,velle_volui_-,voluerint,,subjunctive,perfect,plural,3rd,\r\nvolo,velle_volui_-,voluisse,,infinitive,perfect,,,\r\nvolo,velle_volui_-,volueram,,indicative,pluperfect,singular,1st,\r\nvolo,velle_volui_-,voluerās,,indicative,pluperfect,singular,2nd,\r\nvolo,velle_volui_-,voluerat,,indicative,pluperfect,singular,3rd,\r\nvolo,velle_volui_-,voluerāmus,,indicative,pluperfect,plural,1st,\r\nvolo,velle_volui_-,voluerātis,,indicative,pluperfect,plural,2nd,\r\nvolo,velle_volui_-,voluerant,,indicative,pluperfect,plural,3rd,\r\nvolo,velle_volui_-,voluissem,,subjunctive,pluperfect,singular,1st,\r\nvolo,velle_volui_-,voluissēs,,subjunctive,pluperfect,singular,2nd,\r\nvolo,velle_volui_-,voluisset,,subjunctive,pluperfect,singular,3rd,\r\nvolo,velle_volui_-,voluissēmus,,subjunctive,pluperfect,plural,1st,\r\nvolo,velle_volui_-,voluissētis,,subjunctive,pluperfect,plural,2nd,\r\nvolo,velle_volui_-,voluissent,,subjunctive,pluperfect,plural,3rd,\r\nvolo,velle_volui_-,voluerō,,indicative,future_perfect,singular,1st,\r\nvolo,velle_volui_-,volueris,,indicative,future_perfect,singular,2nd,\r\nvolo,velle_volui_-,voluerit,,indicative,future_perfect,singular,3rd,\r\nvolo,velle_volui_-,voluerimus,,indicative,future_perfect,plural,1st,\r\nvolo,velle_volui_-,volueritis,,indicative,future_perfect,plural,2nd,\r\nvolo,velle_volui_-,voluerunt,,indicative,future_perfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,eō,,indicative,present,singular,1st,\r\neo,ire_ivi(ii)_itus,īs,,indicative,present,singular,2nd,\r\neo,ire_ivi(ii)_itus,it,,indicative,present,singular,3rd,\r\neo,ire_ivi(ii)_itus,īmus,,indicative,present,plural,1st,\r\neo,ire_ivi(ii)_itus,ītis,,indicative,present,plural,2nd,\r\neo,ire_ivi(ii)_itus,eunt,,indicative,present,plural,3rd,\r\neo,ire_ivi(ii)_itus,eam,,subjunctive,present,singular,1st,\r\neo,ire_ivi(ii)_itus,eās,,subjunctive,present,singular,2nd,\r\neo,ire_ivi(ii)_itus,eat,,subjunctive,present,singular,3rd,\r\neo,ire_ivi(ii)_itus,eāmus,,subjunctive,present,plural,1st,\r\neo,ire_ivi(ii)_itus,eātis,,subjunctive,present,plural,2nd,\r\neo,ire_ivi(ii)_itus,eant,,subjunctive,present,plural,3rd,\r\neo,ire_ivi(ii)_itus,ī,,imperative,present,singular,2nd,\r\neo,ire_ivi(ii)_itus,īte,,imperative,present,plural,2nd,\r\neo,ire_ivi(ii)_itus,īre,,infinitive,present,,,\r\neo,ire_ivi(ii)_itus,iēns,,verb_participle,present,,,\r\neo,ire_ivi(ii)_itus,euntis,,verb_participle,present,,,\r\neo,ire_ivi(ii)_itus,ībam,,indicative,imperfect,singular,1st,\r\neo,ire_ivi(ii)_itus,ības,,indicative,imperfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,ībat,,indicative,imperfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,ībāmus,,indicative,imperfect,plural,1st,\r\neo,ire_ivi(ii)_itus,ībātis,,indicative,imperfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,ībant,,indicative,imperfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,īrem,,subjunctive,imperfect,singular,1st,\r\neo,ire_ivi(ii)_itus,īrēs,,subjunctive,imperfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,īret,,subjunctive,imperfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,īrēmus,,subjunctive,imperfect,plural,1st,\r\neo,ire_ivi(ii)_itus,īrētis,,subjunctive,imperfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,īrent,,subjunctive,imperfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,ībō,,indicative,future,singular,1st,\r\neo,ire_ivi(ii)_itus,ībis,,indicative,future,singular,2nd,\r\neo,ire_ivi(ii)_itus,ībit,,indicative,future,singular,3rd,\r\neo,ire_ivi(ii)_itus,ībimus,,indicative,future,plural,1st,\r\neo,ire_ivi(ii)_itus,ībitis,,indicative,future,plural,2nd,\r\neo,ire_ivi(ii)_itus,ībunt,,indicative,future,plural,3rd,\r\neo,ire_ivi(ii)_itus,ītō,,imperative,future,singular,2nd,\r\neo,ire_ivi(ii)_itus,ītō,,imperative,future,singular,3rd,\r\neo,ire_ivi(ii)_itus,ītōte,,imperative,future,plural,2nd,\r\neo,ire_ivi(ii)_itus,euntō,,imperative,future,plural,3rd,\r\neo,ire_ivi(ii)_itus,itūrus esse,,infinitive,future,,,\r\neo,ire_ivi(ii)_itus,itūrus,,verb_participle,future,,,\r\neo,ire_ivi(ii)_itus,eundum,passive,verb_participle,future,,,4\r\neo,ire_ivi(ii)_itus,iī,,indicative,perfect,singular,1st,10\r\neo,ire_ivi(ii)_itus,īvī,,indicative,perfect,singular,1st,11\r\neo,ire_ivi(ii)_itus,īstī,,indicative,perfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,iit,,indicative,perfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,iimus,,indicative,perfect,plural,1st,\r\neo,ire_ivi(ii)_itus,īstis,,indicative,perfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,iērunt,,indicative,perfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,ierim,,subjunctive,perfect,singular,1st,\r\neo,ire_ivi(ii)_itus,ierīs,,subjunctive,perfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,ierit,,subjunctive,perfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,ierīmus,,subjunctive,perfect,plural,1st,\r\neo,ire_ivi(ii)_itus,ierītis,,subjunctive,perfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,ierint,,subjunctive,perfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,īsse,,infinitive,perfect,,,10\r\neo,ire_ivi(ii)_itus,īvisse,,infinitive,perfect,,,\r\neo,ire_ivi(ii)_itus,ieram,,indicative,pluperfect,singular,1st,\r\neo,ire_ivi(ii)_itus,īveram,,indicative,pluperfect,singular,1st,\r\neo,ire_ivi(ii)_itus,ierās,,indicative,pluperfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,ierat,,indicative,pluperfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,ierāmus,,indicative,pluperfect,plural,1st,\r\neo,ire_ivi(ii)_itus,ierātis,,indicative,pluperfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,ierant,,indicative,pluperfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,īssem,,subjunctive,pluperfect,singular,1st,\r\neo,ire_ivi(ii)_itus,īssēs,,subjunctive,pluperfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,īsset,,subjunctive,pluperfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,īssēmus,,subjunctive,pluperfect,plural,1st,\r\neo,ire_ivi(ii)_itus,īssētis,,subjunctive,pluperfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,īssent,,subjunctive,pluperfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,ierō,,indicative,future_perfect,singular,1st,\r\neo,ire_ivi(ii)_itus,īverō,,indicative,future_perfect,singular,1st,\r\neo,ire_ivi(ii)_itus,ieris,,indicative,future_perfect,singular,2nd,\r\neo,ire_ivi(ii)_itus,ierit,,indicative,future_perfect,singular,3rd,\r\neo,ire_ivi(ii)_itus,ierimus,,indicative,future_perfect,plural,1st,\r\neo,ire_ivi(ii)_itus,ieritis,,indicative,future_perfect,plural,2nd,\r\neo,ire_ivi(ii)_itus,ierunt,,indicative,future_perfect,plural,3rd,\r\neo,ire_ivi(ii)_itus,eundī,,gerundive,,,,5\r\neo,ire_ivi(ii)_itus,eundō,,gerundive,,,,\r\neo,ire_ivi(ii)_itus,eundum,,gerundive,,,,\r\neo,ire_ivi(ii)_itus,eundō,,gerundive,,,,\r\neo,ire_ivi(ii)_itus,itum,,supine,,,,5\r\neo,ire_ivi(ii)_itus,itū,,supine,,,,\r\neo,ire_ivi(ii)_itus,itū,,supine,,,,\r\npossum,posse_potui_-,possum,,indicative,present,singular,1st,\r\npossum,posse_potui_-,\"potis, -e sum\",,indicative,present,singular,1st,12\r\npossum,posse_potui_-,potes,,indicative,present,singular,2nd,\r\npossum,posse_potui_-,\"potis, -e es\",,indicative,present,singular,2nd,12\r\npossum,posse_potui_-,potest,,indicative,present,singular,3rd,\r\npossum,posse_potui_-,\"potis, -e est\",,indicative,present,singular,3rd,12\r\npossum,posse_potui_-,possumus,,indicative,present,plural,1st,\r\npossum,posse_potui_-,\"potes, -ia sumus\",,indicative,present,plural,1st,12\r\npossum,posse_potui_-,potestis,,indicative,present,plural,2nd,\r\npossum,posse_potui_-,\"potes, -ia estis\",,indicative,present,plural,2nd,12\r\npossum,posse_potui_-,possunt,,indicative,present,plural,3rd,\r\npossum,posse_potui_-,\"potes, -ia sunt\",,indicative,present,plural,3rd,12\r\npossum,posse_potui_-,possim,,subjunctive,present,singular,1st,\r\npossum,posse_potui_-,possiem,,subjunctive,present,singular,1st,12\r\npossum,posse_potui_-,possīs,,subjunctive,present,singular,2nd,\r\npossum,posse_potui_-,possiēs,,subjunctive,present,singular,2nd,\r\npossum,posse_potui_-,possit,,subjunctive,present,singular,3rd,\r\npossum,posse_potui_-,postisit,,subjunctive,present,singular,3rd,12\r\npossum,posse_potui_-,possiet,,subjunctive,present,singular,3rd,\r\npossum,posse_potui_-,possīmus,,subjunctive,present,plural,1st,\r\npossum,posse_potui_-,possiemus,,subjunctive,present,plural,1st,\r\npossum,posse_potui_-,possītis,,subjunctive,present,plural,2nd,\r\npossum,posse_potui_-,possietis,,subjunctive,present,plural,2nd,\r\npossum,posse_potui_-,possint,,subjunctive,present,plural,3rd,\r\npossum,posse_potui_-,possient,,subjunctive,present,plural,3rd,\r\npossum,posse_potui_-,posse,,infinitive,present,,,\r\npossum,posse_potui_-,potesse,,infinitive,present,,,12\r\npossum,posse_potui_-,potēns,,verb_participle,present,,,\r\npossum,posse_potui_-,poteram,,indicative,imperfect,singular,1st,\r\npossum,posse_potui_-,poterās,,indicative,imperfect,singular,2nd,\r\npossum,posse_potui_-,poterat,,indicative,imperfect,singular,3rd,\r\npossum,posse_potui_-,poterāmus,,indicative,imperfect,plural,1st,\r\npossum,posse_potui_-,poterātis,,indicative,imperfect,plural,2nd,\r\npossum,posse_potui_-,poterant,,indicative,imperfect,plural,3rd,\r\npossum,posse_potui_-,possem,,subjunctive,imperfect,singular,1st,\r\npossum,posse_potui_-,possēs,,subjunctive,imperfect,singular,2nd,\r\npossum,posse_potui_-,posset,,subjunctive,imperfect,singular,3rd,\r\npossum,posse_potui_-,possēmus,,subjunctive,imperfect,plural,1st,\r\npossum,posse_potui_-,possētis,,subjunctive,imperfect,plural,2nd,\r\npossum,posse_potui_-,possent,,subjunctive,imperfect,plural,3rd,\r\npossum,posse_potui_-,poterō,,indicative,future,singular,1st,\r\npossum,posse_potui_-,poteris,,indicative,future,singular,2nd,\r\npossum,posse_potui_-,poterit,,indicative,future,singular,3rd,\r\npossum,posse_potui_-,poterimus,,indicative,future,plural,1st,\r\npossum,posse_potui_-,poteritis,,indicative,future,plural,2nd,\r\npossum,posse_potui_-,poterunt,,indicative,future,plural,3rd,\r\npossum,posse_potui_-,poterint,,indicative,future,plural,3rd,12\r\npossum,posse_potui_-,potuī,,indicative,perfect,singular,1st,\r\npossum,posse_potui_-,potuistī,,indicative,perfect,singular,2nd,\r\npossum,posse_potui_-,potuit,,indicative,perfect,singular,3rd,\r\npossum,posse_potui_-,potuimus,,indicative,perfect,plural,1st,\r\npossum,posse_potui_-,potuistis,,indicative,perfect,plural,2nd,\r\npossum,posse_potui_-,potuērunt,,indicative,perfect,plural,3rd,\r\npossum,posse_potui_-,potuerim,,subjunctive,perfect,singular,1st,\r\npossum,posse_potui_-,potuerīs,,subjunctive,perfect,singular,2nd,\r\npossum,posse_potui_-,potuerit,,subjunctive,perfect,singular,3rd,\r\npossum,posse_potui_-,potuerīmus,,subjunctive,perfect,plural,1st,\r\npossum,posse_potui_-,potuerītis,,subjunctive,perfect,plural,2nd,\r\npossum,posse_potui_-,potuerint,,subjunctive,perfect,plural,3rd,\r\npossum,posse_potui_-,potuisse,,infinitive,perfect,,,\r\npossum,posse_potui_-,potueram,,indicative,pluperfect,singular,1st,\r\npossum,posse_potui_-,potuerās,,indicative,pluperfect,singular,2nd,\r\npossum,posse_potui_-,potuerat,,indicative,pluperfect,singular,3rd,\r\npossum,posse_potui_-,potuerāmus,,indicative,pluperfect,plural,1st,\r\npossum,posse_potui_-,potuerātis,,indicative,pluperfect,plural,2nd,\r\npossum,posse_potui_-,potuerant,,indicative,pluperfect,plural,3rd,\r\npossum,posse_potui_-,potuissem,,subjunctive,pluperfect,singular,1st,\r\npossum,posse_potui_-,potuissēs,,subjunctive,pluperfect,singular,2nd,\r\npossum,posse_potui_-,potuisset,,subjunctive,pluperfect,singular,3rd,\r\npossum,posse_potui_-,potuissēmus,,subjunctive,pluperfect,plural,1st,\r\npossum,posse_potui_-,potuissētis,,subjunctive,pluperfect,plural,2nd,\r\npossum,posse_potui_-,potuissent,,subjunctive,pluperfect,plural,3rd,\r\npossum,posse_potui_-,potuerō,,indicative,future_perfect,singular,1st,\r\npossum,posse_potui_-,potueris,,indicative,future_perfect,singular,2nd,\r\npossum,posse_potui_-,potuerit,,indicative,future_perfect,singular,3rd,\r\npossum,posse_potui_-,potuerimus,,indicative,future_perfect,plural,1st,\r\npossum,posse_potui_-,potueritis,,indicative,future_perfect,plural,2nd,\r\npossum,posse_potui_-,potuerint,,indicative,future_perfect,plural,3rd,";

var verbFormFootnotesCSV = "Index,Text\r\n1,Old forms.\r\n2,Alternate forms.\r\n3,\"The original forms of ferrem and ferre are fer-sēm and fer-se, respectively.\"\r\n4,Gerundive (Future Passive Participle)\r\n5,singular\r\n6,\"The verbs nōlō and malō are compounds of volo. They therefore attach nō- or mā- to the beginning of each verb, in place of vo- or vu-. Exceptions to this are found in the present tense: nōlō nōlumus mālō mālumus nōn vīs nōn vultis māvīs māvultis nōn vult nōlunt māvult mālunt In addition, nōlō is the only verb of the three that has present and future tense imperative forms of the verb: nōlī, nōlīte, and nōlītō, nōlītōte, respectively.\"\r\n7,An earlier form.\r\n8,\"The perfect passive participle ending will change according to its subject's gender, number and case. Endings shown here are the masculine, feminine and neuter nominative singular.\"\r\n9,A passive form of the verb that is used impersonally is itum est.\r\n10,\"While the perfect form of this verb is regular, ii usually contracts to i when it is followed by an s. Thus, īstī, īstis and īsse\"\r\n11,It is rare that the “v” appear as a form.\r\n12,Used by early writers.";

var verbParticipleSuffixesCSV = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Case,Type,Footnote\nāns,1st,active,verb participle,present,,,,regular,\nantis,1st,active,verb participle,present,,,,irregular,\nēns,2nd,active,verb participle,present,,,,regular,\nventis,2nd,active,verb participle,present,,,,irregular,\nēns,3rd,active,verb participle,present,,,,regular,\nentis,3rd,active,verb participle,present,,,,irregular,\niēns,4th,active,verb participle,present,,,,regular,\nientis,4th,active,verb participle,present,,,,irregular,\n,1st,active,verb participle,perfect,,,,,\n,2nd,active,verb participle,perfect,,,,,\n,3rd,active,verb participle,perfect,,,,,\n,4th,active,verb participle,perfect,,,,,\nātūrus,1st,active,verb participle,future,,,,regular,\na,1st,active,verb participle,future,,,,irregular,\num,1st,active,verb participle,future,,,,irregular,\ntūrus,2nd,active,verb participle,future,,,,regular,\na,2nd,active,verb participle,future,,,,irregular,\num,2nd,active,verb participle,future,,,,irregular,\ntūrus,3rd,active,verb participle,future,,,,regular,\na,3rd,active,verb participle,future,,,,irregular,\num,3rd,active,verb participle,future,,,,irregular,\nītūrus esse,4th,active,verb participle,future,,,,regular,\n,1st,passive,verb participle,present,,,,,\n,2nd,passive,verb participle,present,,,,,\n,3rd,passive,verb participle,present,,,,,\n,4th,passive,verb participle,present,,,,,\nātus,1st,passive,verb participle,perfect,,,,regular,\na,1st,passive,verb participle,perfect,,,,irregular,\num,1st,passive,verb participle,perfect,,,,irregular,\nitus,2nd,passive,verb participle,perfect,,,,regular,\na,2nd,passive,verb participle,perfect,,,,irregular,\num,2nd,passive,verb participle,perfect,,,,irregular,\ntus,3rd,passive,verb participle,perfect,,,,regular,\na,3rd,passive,verb participle,perfect,,,,irregular,\num,3rd,passive,verb participle,perfect,,,,irregular,\nītus,4th,passive,verb participle,perfect,,,,regular,\na,4th,passive,verb participle,perfect,,,,irregular,\num,4th,passive,verb participle,perfect,,,,irregular,\nandus,1st,passive,verb participle,future,,,,regular,\na,1st,passive,verb participle,future,,,,irregular,\num,1st,passive,verb participle,future,,,,irregular,\nendus,2nd,passive,verb participle,future,,,,regular,\na,2nd,passive,verb participle,future,,,,irregular,\num,2nd,passive,verb participle,future,,,,irregular,\nendus,3rd,passive,verb participle,future,,,,regular,\niendus,4th,passive,verb participle,future,,,,regular,\na,4th,passive,verb participle,future,,,,irregular,\num,4th,passive,verb participle,future,,,,irregular,\n";

var verbSupineSuffixesCSV = "Ending,Conjugation,Voice,Mood,Tense,Number,Person,Case,Type,Footnote\nātum,1st,active,supine,,,,accusative,regular,\nitum,2nd,active,supine,,,,accusative,regular,\ntum,3rd,active,supine,,,,accusative,regular,\nītum,4th,active,supine,,,,accusative,regular,\nātū,1st,active,supine,,,,ablative,regular,\nitū,2nd,active,supine,,,,ablative,regular,\ntū,3rd,active,supine,,,,ablative,regular,\nītū,4th,active,supine,,,,ablative,regular,\n,1st,passive,supine,,,,accusative,,\n,2nd,passive,supine,,,,accusative,,\n,3rd,passive,supine,,,,accusative,,\n,4th,passive,supine,,,,accusative,,\n,1st,passive,supine,,,,ablative,,\n,2nd,passive,supine,,,,ablative,,\n,3rd,passive,supine,,,,ablative,,\n,4th,passive,supine,,,,ablative,,\n";

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var papaparse = createCommonjsModule(function (module, exports) {
/*!
	Papa Parse
	v4.3.6
	https://github.com/mholt/PapaParse
	License: MIT
*/
(function(root, factory)
{
	if (typeof undefined === 'function' && undefined.amd)
	{
		// AMD. Register as an anonymous module.
		undefined([], factory);
	}
	else {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
}(this, function()
{
	'use strict';

	var global = (function () {
		// alternative method, similar to `Function('return this')()`
		// but without using `eval` (which is disabled when
		// using Content Security Policy).

		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }

		// When running tests none of the above have been defined
		return {};
	})();


	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = '\ufeff';
	Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;
	Papa.ReadableStreamStreamer = ReadableStreamStreamer;

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
								&& $(this).attr('type').toLowerCase() === 'file'
								&& global.FileReader;

				if (!supported || !this.files || this.files.length === 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length === 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action === 'abort')
						{
							error('AbortError', f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned === 'skip')
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		};
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};
		var dynamicTyping = _config.dynamicTyping || false;
		if (isFunction(dynamicTyping)) {
			_config.dynamicTypingFunction = dynamicTyping;
			// Will be filled on first row call
			dynamicTyping = {};
		}
		_config.dynamicTyping = dynamicTyping;

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
		{
			streamer = new ReadableStreamStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = '';
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length === 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) === -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;

			if (typeof _config.quoteChar === 'string')
				_quoteChar = _config.quoteChar;

			if (typeof _config.header === 'boolean')
				_writeHeader = _config.header;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader && _writeHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			str = str.toString().replace(quoteCharRegex, _quoteChar+_quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) === ' '
							|| str.charAt(str.length - 1) === ' ';

			return needsQuotes ? _quoteChar + str + _quoteChar : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = '';
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = '';

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

			if (this._handle.paused() || this._handle.aborted())
				return;

			var lastIndex = results.meta.cursor;

			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults, this._input);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();

			if (this._config.withCredentials)
			{
				xhr.withCredentials = this._config.withCredentials;
			}

			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open('GET', this._input, !IS_WORKER);
			// Headers can only be set when once the request state is OPENED
			if (this._config.downloadRequestHeaders)
			{
				var headers = this._config.downloadRequestHeaders;

				for (var headerName in headers)
				{
					xhr.setRequestHeader(headerName, headers[headerName]);
				}
			}

			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader('Range', 'bytes='+this._start+'-'+end);
				xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status === 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		};

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		};

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		};

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader('Content-Range');
			if (contentRange === null) { // no content range, then finish!
					return -1;
					}
			return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		};

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		};

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		};

		this._chunkError = function()
		{
			this._sendError(reader.error);
		};

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		};
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		};
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;


	function ReadableStreamStreamer(config)
	{
		config = config || {};

		ChunkStreamer.call(this, config);

		var queue = [];
		var parseOnData = true;

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		};

		this._nextChunk = function()
		{
			if (queue.length)
			{
				this.parseChunk(queue.shift());
			}
			else
			{
				parseOnData = true;
			}
		};

		this._streamData = bindFunction(function(chunk)
		{
			try
			{
				queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

				if (parseOnData)
				{
					parseOnData = false;
					this.parseChunk(queue.shift());
				}
			}
			catch (error)
			{
				this._streamError(error);
			}
		}, this);

		this._streamError = bindFunction(function(error)
		{
			this._streamCleanUp();
			this._sendError(error.message);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			this._finished = true;
			this._streamData('');
		}, this);

		this._streamCleanUp = bindFunction(function()
		{
			this._input.removeListener('data', this._streamData);
			this._input.removeListener('end', this._streamEnd);
			this._input.removeListener('error', this._streamError);
		}, this);
	}
	ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
	ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;	// Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length === 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}
			else if(isFunction(_config.delimiter))
			{
				_config.delimiter = _config.delimiter(input);
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function ()
		{
			return _aborted;
		};

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = '';
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \''+Papa.DefaultDelimiter+'\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length === 1 && _results.data[i][0] === '')
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length === 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else
					return tryParseFloat(value);
			}
			return value;
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				for (var j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					value = parseDynamic(field, value);

					if (field === '__parsed_extra')
					{
						row[field] = row[field] || [];
						row[field].push(value);
					}
					else
						row[field] = value;
				}

				_results.data[i] = row;

				if (_config.header)
				{
					if (j > _fields.length)
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && preview.data[j].length === 1 && preview.data[j][0].length === 0) {
						emptyLinesCount++;
						continue
					}
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= (preview.data.length - emptyLinesCount);

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			var n = input.split('\n');

			var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

			if (r.length === 1 || nAppearsFirst)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] === '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;
		var quoteChar = config.quoteChar || '"';

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ',';

		// Comment character must be valid
		if (comments === delim)
			throw 'Comment character same as delimiter';
		else if (comments === true)
			comments = '#';
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw 'Input must be a string';

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = isFunction(step);

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) === comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);
			var quoteCharRegex = new RegExp(quoteChar+quoteChar, 'g');

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf(quoteChar, quoteSearch+1);

						//No other quotes are found - no other delimiters
						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: 'Quotes',
									code: 'MissingQuotes',
									message: 'Quoted field unterminated',
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						// Closing quote at EOF
						if (quoteSearch === inputLen-1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] === quoteChar)
						{
							quoteSearch++;
							continue;
						}

						// Closing quote followed by delimiter
						if (input[quoteSearch+1] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						// Closing quote followed by newline
						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}

							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}


						// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
						errors.push({
							type: 'Quotes',
							code: 'InvalidQuotes',
							message: 'Trailing quote on quoted field is malformed',
							row: data.length,	// row has yet to be inserted
							index: cursor
						});

						quoteSearch++;
						continue;

					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline === -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append 'papaworker' to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw 'Not implemented.';
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}

	return Papa;
}));
});

/*
 * Latin language data module
 */
let languageModel = new LatinLanguageModel();
let types = Feature.types;
// Create a language data set that will keep all language-related information
let dataSet = new LanguageDataset(constants.LANG_LATIN);

// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName = 'csv';
languageModel.features[types.declension].addImporter(importerName)
    .map('1st 2nd',
  [ languageModel.features[types.declension][constants.ORD_1ST],
    languageModel.features[types.declension][constants.ORD_2ND]
  ]);
languageModel.features[types.gender].addImporter(importerName)
    .map('masculine feminine',
  [ languageModel.features[types.gender][constants.GEND_MASCULINE],
    languageModel.features[types.gender][constants.GEND_FEMININE]
  ]);
languageModel.features[types.tense].addImporter(importerName)
    .map('future_perfect', languageModel.features[types.tense][constants.TENSE_FUTURE_PERFECT]);
const footnotes = new FeatureType(types.footnote, [], dataSet.languageID);
const featureOptions = [types.grmCase, types.declension, types.gender, types.number, types.voice, types.mood, types.tense, types.person];

// endregion Definition of grammatical features

// For noun and adjectives
dataSet.addSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech,
      languageModel.features[types.number].getFromImporter('csv', data[i][1]),
      languageModel.features[types.grmCase].getFromImporter('csv', data[i][2]),
      languageModel.features[types.declension].getFromImporter('csv', data[i][3]),
      languageModel.features[types.gender].getFromImporter('csv', data[i][4]),
      languageModel.features[types.type].getFromImporter('csv', data[i][5])];
    if (data[i][6]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][6].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features);
  }
};

// For pronouns
dataSet.addPronounForms = function (partOfSpeech, data) {
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let features = [partOfSpeech];
    if (data[i][0]) {
      features.push(languageModel.features[types.grmClass].getFromImporter('csv', data[i][0]));
    }
    if (data[i][1]) {
      features.push(languageModel.features[types.person].getFromImporter('csv', data[i][1]));
    }
    if (data[i][2]) {
      features.push(languageModel.features[types.number].getFromImporter('csv', data[i][2]));
    }
    if (data[i][3]) {
      features.push(languageModel.features[types.case].getFromImporter('csv', data[i][3]));
    }
    if (data[i][4]) {
      features.push(languageModel.features[types.type].getFromImporter('csv', data[i][4]));
    }
    // TODO: Check if form and alt are there
    let form = data[i][5] ? data[i][5] : '';
    /* if (data[i][6]) {
      features.push(languageModel.features[types.alt].getFromImporter('csv', data[i][6]))
    } */

    // Footnotes
    if (data[i][7]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][7].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addItem(form, LanguageDataset.FORM, features);
  }
};

// For verbs
dataSet.addVerbSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech];
    let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type];
    columns.forEach((c, j) => {
      try {
        features.push(languageModel.features[c].getFromImporter('csv', data[i][j + 1]));
      } catch (e) {
        // ignore empty or non-parsable values
      }
    });

    let grammartype = data[i][7];
        // Type information can be empty if no ending is provided
    if (grammartype) {
      features.push(languageModel.features[types.type].getFromImporter('csv', grammartype));
    }
        // Footnotes
    if (data[i][9]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][9].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features);
  }
};

dataSet.addVerbParticipleSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech];
    let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type];
    columns.forEach((c, j) => {
      try {
        features.push(languageModel.features[c].getFromImporter('csv', data[i][j + 1]));
      } catch (e) {
        // ignore empty or non-parsable values
      }
    });

    let grammartype = data[i][7];
        // Type information can be empty if no ending is provided
    if (grammartype) {
      features.push(languageModel.features[types.type].getFromImporter('csv', grammartype));
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features);
  }
};

dataSet.addVerbSupineSuffixes = function (partOfSpeech, data) {
    // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

    // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
        // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech];
    let columns = [types.conjugation, types.voice, types.mood, types.tense, types.number, types.person, types.case, types.type];
    columns.forEach((c, j) => {
      try {
        features.push(languageModel.features[c].getFromImporter('csv', data[i][j + 1]));
      } catch (e) {
        // ignore empty or non-parsable values
      }
    });

    let grammartype = data[i][7];
        // Type information can be empty if no ending is provided
    if (grammartype) {
      features.push(languageModel.features[types.type].getFromImporter('csv', grammartype));
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features);
  }
};

// for Lemmas
dataSet.addVerbForms = function (partOfSpeech, data) {
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let lemma = data[i][0];
    // let principalParts = data[i][1].split(/_/)
    let form = data[i][2];

    // Lemma,PrincipalParts,Form,Voice,Mood,Tense,Number,Person,Footnote
    let features = [partOfSpeech,
      new FeatureType(types.word, [FeatureType.UNRESTRICTED_VALUE], languageModel.toCode()).getFromImporter('csv', lemma)];
    if (data[i][3]) {
      features.push(languageModel.features[types.voice].getFromImporter('csv', data[i][3]));
    }
    if (data[i][4]) {
      features.push(languageModel.features[types.mood].getFromImporter('csv', data[i][4]));
    }
    if (data[i][5]) {
      features.push(languageModel.features[types.tense].getFromImporter('csv', data[i][5]));
    }
    if (data[i][6]) {
      features.push(languageModel.features[types.number].getFromImporter('csv', data[i][6]));
    }
    if (data[i][7]) {
      features.push(languageModel.features[types.person].getFromImporter('csv', data[i][7]));
    }

    // Footnotes
    if (data[i][8]) {
            // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes.get(index)
      });
      features.push(...indexes);
    }
    this.addItem(form, LanguageDataset.FORM, features);
  }
};

dataSet.addFootnotes = function (partOfSpeech, data) {
    // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
  }
};

dataSet.loadData = function () {
  let partOfSpeech;
  let suffixes;
  let forms;
  let footnotes;

  // Nouns
  partOfSpeech = languageModel.features[types.part][constants.POFS_NOUN];
  suffixes = papaparse.parse(nounSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(nounFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Pronouns
  partOfSpeech = languageModel.features[types.part][constants.POFS_PRONOUN];
  forms = papaparse.parse(pronounFormsCSV, {});
  this.addPronounForms(partOfSpeech, forms.data);
  footnotes = papaparse.parse(pronounFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Adjectives
  partOfSpeech = languageModel.features[types.part][constants.POFS_ADJECTIVE];
  suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Verbs
  partOfSpeech = languageModel.features[types.part][constants.POFS_VERB];
  suffixes = papaparse.parse(verbSuffixesCSV, {});
  this.addVerbSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(verbFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);
  forms = papaparse.parse(verbFormsCSV, {});
  this.addVerbForms(partOfSpeech, forms.data);
  footnotes = papaparse.parse(verbFormFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Verb Participles
  partOfSpeech = languageModel.features[types.part][constants.POFS_VERB_PARTICIPLE];
  suffixes = papaparse.parse(verbParticipleSuffixesCSV, {});
  this.addVerbParticipleSuffixes(partOfSpeech, suffixes.data);

  // Verb Supine
  partOfSpeech = languageModel.features[types.part][constants.POFS_SUPINE];
  suffixes = papaparse.parse(verbSupineSuffixesCSV, {});
  this.addVerbSupineSuffixes(partOfSpeech, suffixes.data);
};

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - an array of inflection objects to be matched against a suffix.
 * @param {string} type - LanguageDataset.SUFFIX or LanguageDataset.FORM
 * @param {Suffix} suffix - a suffix to be matched with inflections.
 * @returns {Suffix | null} if a match is found, returns a suffix object modified with some
 * additional information about a match. if no matches found, returns null.
 */
dataSet.matcher = function (inflections, type, item) {
  'use strict';
    // All of those features must match between an inflection and an ending
  let obligatoryMatches, optionalMatches;
  // I'm not sure if we ever want to restrict what we consider optional matches
  // so this is just a placeholder for now
  let matchOptional = true;
  if (type === LanguageDataset.SUFFIX) {
    obligatoryMatches = [types.part];
  } else {
    obligatoryMatches = [types.word];
  }

    // Any of those features must match between an inflection and an ending
  let bestMatchData = null; // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
  for (let inflection of inflections) {
    let matchData = new MatchData(); // Create a match profile
    if (matchOptional) {
      optionalMatches = featureOptions.filter((f) => inflection[f]);
    } else {
      optionalMatches = [];
    }

    if (type === LanguageDataset.SUFFIX) {
      if (languageModel.normalizeWord(inflection.suffix) === languageModel.normalizeWord(item.value)) {
        matchData.suffixMatch = true;
      }
    } else {
      let form = inflection.prefix ? inflection.prefix : '';
      form = form + inflection.stem;
      form = inflection.suffix ? form + inflection.suffix : form;
      if (languageModel.normalizeWord(form) === languageModel.normalizeWord(item.value)) {
        matchData.suffixMatch = true;
      }
    }

        // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = item.featureMatch(feature, inflection[feature]);
            // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
        break
      }
            // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature);
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
      break
    }

        // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = item.featureMatch(feature, inflection[feature]);
      if (matchedValue) {
        matchData.matchedFeatures.push(feature);
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
      matchData.fullMatch = true;

            // There can be only one full match, no need to search any further
      item.match = matchData;
      return item
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData);
  }
  if (bestMatchData) {
        // There is some match found
    item.match = bestMatchData;
    return item
  }
  return null
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet.bestMatch = function (matchA, matchB) {
    // If one of the arguments is not set, return the other one
  if (!matchA && matchB) {
    return matchB
  }

  if (!matchB && matchA) {
    return matchA
  }

    // item match has a priority
  if (matchA.suffixMatch !== matchB.suffixMatch) {
    if (matchA.suffixMatch > matchB.suffixMatch) {
      return matchA
    } else {
      return matchB
    }
  }

    // If same on suffix matche, compare by how many features matched
  if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
        // Arbitrarily return matchA if matches are the same
    return matchA
  } else {
    return matchB
  }
};

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

var nounSuffixesCSV$1 = "Ending,Number,Case,Declension,Gender,Type,Primary,Footnote\nα,dual,accusative,1st,feminine,regular,primary,\nά,dual,accusative,1st,feminine,regular,,\nᾶ,dual,accusative,1st,feminine,regular,,2\nαιν,dual,dative,1st,feminine,regular,primary,\nαῖν,dual,dative,1st,feminine,regular,,\nαιιν,dual,dative,1st,feminine,irregular,,\nαιν,dual,genitive,1st,feminine,regular,primary,\nαῖν,dual,genitive,1st,feminine,regular,,\nαιιν,dual,genitive,1st,feminine,irregular,,\nα,dual,nominative,1st,feminine,regular,primary,\nά,dual,nominative,1st,feminine,regular,,\nᾶ,dual,nominative,1st,feminine,regular,,2\nα,dual,vocative,1st,feminine,regular,primary,\nά,dual,vocative,1st,feminine,regular,,\nᾶ,dual,vocative,1st,feminine,regular,,2\nα,dual,accusative,1st,masculine,regular,primary,\nά,dual,accusative,1st,masculine,regular,,\nᾶ,dual,accusative,1st,masculine,regular,,2\nαιν,dual,dative,1st,masculine,regular,primary,\nαῖν,dual,dative,1st,masculine,regular,,\nαιιν,dual,dative,1st,masculine,irregular,,\nαιν,dual,genitive,1st,masculine,regular,primary,\nαῖν,dual,genitive,1st,masculine,regular,,\nαιιν,dual,genitive,1st,masculine,irregular,,\nα,dual,nominative,1st,masculine,regular,primary,\nά,dual,nominative,1st,masculine,regular,,\nᾶ,dual,nominative,1st,masculine,regular,,2\nα,dual,vocative,1st,masculine,regular,primary,\nά,dual,vocative,1st,masculine,regular,,\nᾶ,dual,vocative,1st,masculine,regular,,2\nας,plural,accusative,1st,feminine,regular,primary,\nάς,plural,accusative,1st,feminine,regular,,\nᾶς,plural,accusative,1st,feminine,regular,,2\nανς,plural,accusative,1st,feminine,irregular,,\nαις,plural,accusative,1st,feminine,irregular,,\nαις,plural,dative,1st,feminine,regular,primary,\nαῖς,plural,dative,1st,feminine,regular,,\nῃσι,plural,dative,1st,feminine,irregular,,44\nῃσιν,plural,dative,1st,feminine,irregular,,4 44\nῃς,plural,dative,1st,feminine,irregular,,44\nαισι,plural,dative,1st,feminine,irregular,,44\nαισιν,plural,dative,1st,feminine,irregular,,4 44\nῶν,plural,genitive,1st,feminine,regular,primary,\nάων,plural,genitive,1st,feminine,irregular,,\nέων,plural,genitive,1st,feminine,irregular,,\nήων,plural,genitive,1st,feminine,irregular,,\nᾶν,plural,genitive,1st,feminine,irregular,,\nαι,plural,nominative,1st,feminine,regular,primary,\nαί,plural,nominative,1st,feminine,regular,,\nαῖ,plural,nominative,1st,feminine,regular,,2\nαι,plural,vocative,1st,feminine,regular,primary,\nαί,plural,vocative,1st,feminine,regular,,\nαῖ,plural,vocative,1st,feminine,regular,,2\nας,plural,accusative,1st,masculine,regular,primary,\nάς,plural,accusative,1st,masculine,regular,,\nᾶς,plural,accusative,1st,masculine,regular,,3\nανς,plural,accusative,1st,masculine,irregular,,\nαις,plural,accusative,1st,masculine,irregular,,\nαις,plural,dative,1st,masculine,regular,primary,\nαῖς,plural,dative,1st,masculine,regular,,\nῃσι,plural,dative,1st,masculine,irregular,,44\nῃσιν,plural,dative,1st,masculine,irregular,,4 44\nῃς,plural,dative,1st,masculine,irregular,,44\nαισι,plural,dative,1st,masculine,irregular,,44\nαισιν,plural,dative,1st,masculine,irregular,,4 44\nῶν,plural,genitive,1st,masculine,regular,primary,\nάων,plural,genitive,1st,masculine,irregular,,\nέων,plural,genitive,1st,masculine,irregular,,\nήων,plural,genitive,1st,masculine,irregular,,\nᾶν,plural,genitive,1st,masculine,irregular,,\nαι,plural,nominative,1st,masculine,regular,primary,\nαί,plural,nominative,1st,masculine,regular,,\nαῖ,plural,nominative,1st,masculine,regular,,3\nαι,plural,vocative,1st,masculine,regular,primary,\nαί,plural,vocative,1st,masculine,regular,,\nαῖ,plural,vocative,1st,masculine,regular,,3\nαν,singular,accusative,1st,feminine,regular,primary,\nην,singular,accusative,1st,feminine,regular,primary,\nήν,singular,accusative,1st,feminine,regular,,\nᾶν,singular,accusative,1st,feminine,regular,,2\nῆν,singular,accusative,1st,feminine,regular,,2\nάν,singular,accusative,1st,feminine,irregular,,63\nᾳ,singular,dative,1st,feminine,regular,primary,\nῃ,singular,dative,1st,feminine,regular,primary,\nῇ,singular,dative,1st,feminine,regular,,2\nᾷ,singular,dative,1st,feminine,regular,,2\nηφι,singular,dative,1st,feminine,irregular,,45\nηφιν,singular,dative,1st,feminine,irregular,,4 45\nῆφι,singular,dative,1st,feminine,irregular,,45\nῆφιv,singular,dative,1st,feminine,irregular,,4 45\nας,singular,genitive,1st,feminine,regular,primary,\nης,singular,genitive,1st,feminine,regular,primary,\nῆs,singular,genitive,1st,feminine,regular,,\nᾶs,singular,genitive,1st,feminine,regular,,2\nηφι,singular,genitive,1st,feminine,irregular,,45\nηφιν,singular,genitive,1st,feminine,irregular,,4 45\nῆφι,singular,genitive,1st,feminine,irregular,,45\nῆφιv,singular,genitive,1st,feminine,irregular,,4 45\nα,singular,nominative,1st,feminine,regular,primary,\nη,singular,nominative,1st,feminine,regular,primary,1\nή,singular,nominative,1st,feminine,regular,,\nᾶ,singular,nominative,1st,feminine,regular,,2\nῆ,singular,nominative,1st,feminine,regular,,2\nά,singular,nominative,1st,feminine,irregular,,63\nα,singular,vocative,1st,feminine,regular,primary,\nη,singular,vocative,1st,feminine,regular,primary,\nή,singular,vocative,1st,feminine,regular,,\nᾶ,singular,vocative,1st,feminine,regular,,2\nῆ,singular,vocative,1st,feminine,regular,,2\nά,singular,vocative,1st,feminine,irregular,,63\nαν,singular,accusative,1st,masculine,regular,primary,\nην,singular,accusative,1st,masculine,regular,primary,3\nήν,singular,accusative,1st,masculine,regular,,\nᾶν,singular,accusative,1st,masculine,regular,,3\nῆν,singular,accusative,1st,masculine,regular,,3\nεα,singular,accusative,1st,masculine,irregular,,\nᾳ,singular,dative,1st,masculine,regular,primary,\nῃ,singular,dative,1st,masculine,regular,primary,\nῇ,singular,dative,1st,masculine,regular,,\nᾷ,singular,dative,1st,masculine,regular,,3\nῆ,singular,dative,1st,masculine,regular,,3\nηφι,singular,dative,1st,masculine,irregular,,45\nηφιν,singular,dative,1st,masculine,irregular,,4 45\nῆφι,singular,dative,1st,masculine,irregular,,45\nῆφιv,singular,dative,1st,masculine,irregular,,4 45\nου,singular,genitive,1st,masculine,regular,primary,\nοῦ,singular,genitive,1st,masculine,regular,,\nαο,singular,genitive,1st,masculine,irregular,,\nεω,singular,genitive,1st,masculine,irregular,,\nηφι,singular,genitive,1st,masculine,irregular,,45\nηφιν,singular,genitive,1st,masculine,irregular,,4 45\nῆφι,singular,genitive,1st,masculine,irregular,,45\nῆφιv,singular,genitive,1st,masculine,irregular,,4 45\nω,singular,genitive,1st,masculine,irregular,,\nα,singular,genitive,1st,masculine,irregular,,\nας,singular,nominative,1st,masculine,regular,primary,\nης,singular,nominative,1st,masculine,regular,primary,\nής,singular,nominative,1st,masculine,regular,,\nᾶs,singular,nominative,1st,masculine,regular,,3\nῆs,singular,nominative,1st,masculine,regular,,3\nα,singular,vocative,1st,masculine,regular,primary,\nη,singular,vocative,1st,masculine,regular,primary,\nά,singular,vocative,1st,masculine,regular,,\nᾶ,singular,vocative,1st,masculine,regular,,3\nῆ,singular,vocative,1st,masculine,regular,,3\nω,dual,accusative,2nd,masculine feminine,regular,primary,\nώ,dual,accusative,2nd,masculine feminine,regular,,5\nοιν,dual,dative,2nd,masculine feminine,regular,primary,\nοῖν,dual,dative,2nd,masculine feminine,regular,,5\nοιιν,dual,dative,2nd,masculine feminine,irregular,,\nῴν,dual,dative,2nd,masculine feminine,irregular,,7\nοιν,dual,genitive,2nd,masculine feminine,regular,primary,\nοῖν,dual,genitive,2nd,masculine feminine,regular,,5\nοιιν,dual,genitive,2nd,masculine feminine,irregular,,\nῴν,dual,genitive,2nd,masculine feminine,irregular,,7\nω,dual,nominative,2nd,masculine feminine,regular,primary,60\nώ,dual,nominative,2nd,masculine feminine,regular,,60\nω,dual,vocative,2nd,masculine feminine,regular,primary,\nώ,dual,vocative,2nd,masculine feminine,regular,,5\nω,dual,accusative,2nd,neuter,regular,primary,\nώ,dual,accusative,2nd,neuter,regular,,6\nοιν,dual,dative,2nd,neuter,regular,primary,\nοῖν,dual,dative,2nd,neuter,regular,,6\nοιιν,dual,dative,2nd,neuter,irregular,,\nοιν,dual,genitive,2nd,neuter,regular,primary,\nοῖν,dual,genitive,2nd,neuter,regular,,6\nοιιν,dual,genitive,2nd,neuter,irregular,,\nω,dual,nominative,2nd,neuter,regular,primary,\nώ,dual,nominative,2nd,neuter,regular,,6\nω,dual,vocative,2nd,neuter,regular,primary,\nώ,dual,vocative,2nd,neuter,regular,,6\nους,plural,accusative,2nd,masculine feminine,regular,primary,\nούς,plural,accusative,2nd,masculine feminine,regular,,41\nοῦς,plural,accusative,2nd,masculine feminine,regular,,5\nονς,plural,accusative,2nd,masculine feminine,irregular,,\nος,plural,accusative,2nd,masculine feminine,irregular,,\nως,plural,accusative,2nd,masculine feminine,irregular,,\nοις,plural,accusative,2nd,masculine feminine,irregular,,\nώς,plural,accusative,2nd,masculine feminine,irregular,,7\nοις,plural,dative,2nd,masculine feminine,regular,primary,\nοῖς,plural,dative,2nd,masculine feminine,regular,,5\nοισι,plural,dative,2nd,masculine feminine,irregular,,\nοισιν,plural,dative,2nd,masculine feminine,irregular,,4\nῴς,plural,dative,2nd,masculine feminine,irregular,,7\nόφι,plural,dative,2nd,masculine feminine,irregular,,45\nόφιv,plural,dative,2nd,masculine feminine,irregular,,4 45\nων,plural,genitive,2nd,masculine feminine,regular,primary,\nῶν,plural,genitive,2nd,masculine feminine,regular,,5\nών,plural,genitive,2nd,masculine feminine,irregular,,7\nόφι,plural,genitive,2nd,masculine feminine,irregular,,45\nόφιv,plural,genitive,2nd,masculine feminine,irregular,,4 45\nοι,plural,nominative,2nd,masculine feminine,regular,primary,\nοί,plural,nominative,2nd,masculine feminine,regular,,41\nοῖ,plural,nominative,2nd,masculine feminine,regular,,5\nῴ,plural,nominative,2nd,masculine feminine,irregular,,7\nοι,plural,vocative,2nd,masculine feminine,regular,primary,\nοί,plural,vocative,2nd,masculine feminine,regular,,41\nοῖ,plural,vocative,2nd,masculine feminine,regular,,5\nα,plural,accusative,2nd,neuter,regular,primary,\nᾶ,plural,accusative,2nd,neuter,regular,,6\nοις,plural,dative,2nd,neuter,regular,primary,\nοῖς,plural,dative,2nd,neuter,regular,,6\nοισι,plural,dative,2nd,neuter,irregular,,\nοισιν,plural,dative,2nd,neuter,irregular,,4\nόφι,plural,dative,2nd,neuter,irregular,,45\nόφιv,plural,dative,2nd,neuter,irregular,,4 45\nων,plural,genitive,2nd,neuter,regular,primary,\nῶν,plural,genitive,2nd,neuter,regular,,6\nόφι,plural,genitive,2nd,neuter,irregular,,45\nόφιv,plural,genitive,2nd,neuter,irregular,,4 45\nα,plural,nominative,2nd,neuter,regular,primary,\nᾶ,plural,nominative,2nd,neuter,regular,,6\nα,plural,vocative,2nd,neuter,regular,primary,\nᾶ,plural,vocative,2nd,neuter,regular,,6\nον,singular,accusative,2nd,masculine feminine,regular,primary,\nόν,singular,accusative,2nd,masculine feminine,regular,primary,41\nουν,singular,accusative,2nd,masculine feminine,regular,,5\nοῦν,singular,accusative,2nd,masculine feminine,regular,,5\nω,singular,accusative,2nd,masculine feminine,irregular,,7 5\nωv,singular,accusative,2nd,masculine feminine,irregular,,7 59\nώ,singular,accusative,2nd,masculine feminine,irregular,,7 42 59\nών,singular,accusative,2nd,masculine feminine,irregular,,7 59\nῳ,singular,dative,2nd,masculine feminine,regular,primary,\nῷ,singular,dative,2nd,masculine feminine,regular,,5\nῴ,singular,dative,2nd,masculine feminine,irregular,,7\nόφι,singular,dative,2nd,masculine feminine,irregular,,45\nόφιv,singular,dative,2nd,masculine feminine,irregular,,4 45\nου,singular,genitive,2nd,masculine feminine,regular,primary,\nοῦ,singular,genitive,2nd,masculine feminine,regular,,5\nοιο,singular,genitive,2nd,masculine feminine,irregular,,\nοο,singular,genitive,2nd,masculine feminine,irregular,,\nω,singular,genitive,2nd,masculine feminine,irregular,,\nώ,singular,genitive,2nd,masculine feminine,irregular,,7\nόφι,singular,genitive,2nd,masculine feminine,irregular,,45\nόφιv,singular,genitive,2nd,masculine feminine,irregular,,4 45\nος,singular,nominative,2nd,masculine feminine,regular,primary,\nους,singular,nominative,2nd,masculine feminine,regular,,5\noῦς,singular,nominative,2nd,masculine feminine,regular,,5\nός,singular,nominative,2nd,masculine feminine,regular,,\nώς,singular,nominative,2nd,masculine feminine,irregular,,7 42\nως,singular,nominative,2nd,masculine feminine,irregular,,\nε,singular,vocative,2nd,masculine feminine,regular,primary,\nέ,singular,vocative,2nd,masculine feminine,regular,,\nοu,singular,vocative,2nd,masculine feminine,regular,,5\nοῦ,singular,vocative,2nd,masculine feminine,regular,,42\nός,singular,vocative,2nd,masculine feminine,irregular,,57\nον,singular,accusative,2nd,neuter,regular,primary,\nοῦν,singular,accusative,2nd,neuter,regular,,6\nῳ,singular,dative,2nd,neuter,regular,primary,\nῷ,singular,dative,2nd,neuter,regular,,6\nόφι,singular,dative,2nd,neuter,irregular,,45\nόφιv,singular,dative,2nd,neuter,irregular,,4 45\nου,singular,genitive,2nd,neuter,regular,primary,\nοῦ,singular,genitive,2nd,neuter,regular,,6\nοο,singular,genitive,2nd,neuter,irregular,,\nοιο,singular,genitive,2nd,neuter,irregular,,\nω,singular,genitive,2nd,neuter,irregular,,\nόφι,singular,genitive,2nd,neuter,irregular,,45\nόφιv,singular,genitive,2nd,neuter,irregular,,4 45\nον,singular,nominative,2nd,neuter,regular,primary,\nοῦν,singular,nominative,2nd,neuter,regular,,6\nον,singular,vocative,2nd,neuter,regular,primary,\nοῦν,singular,vocative,2nd,neuter,regular,,6\nε,dual,accusative,3rd,masculine feminine,regular,primary,\nει,dual,accusative,3rd,masculine feminine,regular,,\nῆ,dual,accusative,3rd,masculine feminine,regular,,18\nω,dual,accusative,3rd,masculine feminine,irregular,,32\nῖ,dual,accusative,3rd,masculine feminine,irregular,,33\nεε,dual,accusative,3rd,masculine feminine,irregular,,16 55 61\nοιν,dual,dative,3rd,masculine feminine,regular,primary,\nοῖν,dual,dative,3rd,masculine feminine,regular,,\nοιιν,dual,dative,3rd,masculine feminine,irregular,,54\nσι,dual,dative,3rd,masculine feminine,irregular,,33 37\nεσσι,dual,dative,3rd,masculine feminine,irregular,,33\nεσι,dual,dative,3rd,masculine feminine,irregular,,33\nέοιν,dual,dative,3rd,masculine feminine,irregular,,16 61\nῳν,dual,dative,3rd,masculine feminine,irregular,,49\nοιν,dual,genitive,3rd,masculine feminine,regular,primary,\nοῖν,dual,genitive,3rd,masculine feminine,regular,,\nοιιν,dual,genitive,3rd,masculine feminine,irregular,,54\nέοιν,dual,genitive,3rd,masculine feminine,irregular,,16 61\nῳν,dual,genitive,3rd,masculine feminine,irregular,,49\nε,dual,nominative,3rd,masculine feminine,regular,primary,\nει,dual,nominative,3rd,masculine feminine,regular,,\nῆ,dual,nominative,3rd,masculine feminine,regular,,18\nω,dual,nominative,3rd,masculine feminine,irregular,,32\nῖ,dual,nominative,3rd,masculine feminine,irregular,,33\nεε,dual,nominative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,vocative,3rd,masculine feminine,regular,primary,\nει,dual,vocative,3rd,masculine feminine,regular,,\nῆ,dual,vocative,3rd,masculine feminine,regular,,18\nω,dual,vocative,3rd,masculine feminine,irregular,,32\nῖ,dual,vocative,3rd,masculine feminine,irregular,,33\nεε,dual,vocative,3rd,masculine feminine,irregular,,16 55 61\nε,dual,accusative,3rd,neuter,regular,primary,\nει,dual,accusative,3rd,neuter,regular,,\nα,dual,accusative,3rd,neuter,regular,,\nεε,dual,accusative,3rd,neuter,irregular,,16 61\nαε,dual,accusative,3rd,neuter,irregular,,16 61\nοιν,dual,dative,3rd,neuter,regular,primary,\nῷν,dual,dative,3rd,neuter,regular,,\nοις,dual,dative,3rd,neuter,irregular,,33 38\nοισι,dual,dative,3rd,neuter,irregular,,33 38\nοισι(ν),dual,dative,3rd,neuter,irregular,,4 33 38\nοιιν,dual,dative,3rd,neuter,irregular,,\nέοιν,dual,dative,3rd,neuter,irregular,,16 61\nάοιν,dual,dative,3rd,neuter,irregular,,16 61\nοιν,dual,genitive,3rd,neuter,regular,primary,\nῷν,dual,genitive,3rd,neuter,regular,,\nων,dual,genitive,3rd,neuter,irregular,,33 38\nοιιν,dual,genitive,3rd,neuter,irregular,,\nέοιν,dual,genitive,3rd,neuter,irregular,,16 61\nάοιν,dual,genitive,3rd,neuter,irregular,,16 61\nε,dual,nominative,3rd,neuter,regular,primary,\nει,dual,nominative,3rd,neuter,regular,,\nα,dual,nominative,3rd,neuter,regular,,\nεε,dual,nominative,3rd,neuter,irregular,,16 61\nαε,dual,nominative,3rd,neuter,irregular,,16 61\nε,dual,vocative,3rd,neuter,regular,primary,\nει,dual,vocative,3rd,neuter,regular,,\nα,dual,vocative,3rd,neuter,regular,,\nεε,dual,vocative,3rd,neuter,irregular,,16 61\nαε,dual,vocative,3rd,neuter,irregular,,16 61\nας,plural,accusative,3rd,masculine feminine,regular,primary,\nεις,plural,accusative,3rd,masculine feminine,regular,,17 41\nες,plural,accusative,3rd,masculine feminine,regular,,\nς,plural,accusative,3rd,masculine feminine,regular,,\nῦς,plural,accusative,3rd,masculine feminine,regular,,17 18 48\nως,plural,accusative,3rd,masculine feminine,regular,,30\nῆς,plural,accusative,3rd,masculine feminine,irregular,,56\nέας,plural,accusative,3rd,masculine feminine,irregular,,\nέος,plural,accusative,3rd,masculine feminine,irregular,,\nῆος,plural,accusative,3rd,masculine feminine,irregular,,\nῆες,plural,accusative,3rd,masculine feminine,irregular,,\nῆας,plural,accusative,3rd,masculine feminine,irregular,,\nους,plural,accusative,3rd,masculine feminine,irregular,,32\nούς,plural,accusative,3rd,masculine feminine,irregular,,32\nεῖς,plural,accusative,3rd,masculine feminine,irregular,,31 41\nεες,plural,accusative,3rd,masculine feminine,irregular,,55 61\nις,plural,accusative,3rd,masculine feminine,irregular,,\nινς,plural,accusative,3rd,masculine feminine,irregular,,\nῶς,plural,accusative,3rd,masculine feminine,irregular,,48\nσι,plural,dative,3rd,masculine feminine,regular,primary,\nσιν,plural,dative,3rd,masculine feminine,regular,primary,4\nσί,plural,dative,3rd,masculine feminine,regular,,41\nσίν,plural,dative,3rd,masculine feminine,regular,,4 41\nεσι,plural,dative,3rd,masculine feminine,regular,,41\nεσιν,plural,dative,3rd,masculine feminine,regular,,4 41\nέσι,plural,dative,3rd,masculine feminine,regular,,\nέσιν,plural,dative,3rd,masculine feminine,regular,,4\nψι,plural,dative,3rd,masculine feminine,regular,,\nψιν,plural,dative,3rd,masculine feminine,regular,,4\nψί,plural,dative,3rd,masculine feminine,regular,,\nψίν,plural,dative,3rd,masculine feminine,regular,,4\nξι,plural,dative,3rd,masculine feminine,regular,,\nξιν,plural,dative,3rd,masculine feminine,regular,,4\nξί,plural,dative,3rd,masculine feminine,regular,,\nξίν,plural,dative,3rd,masculine feminine,regular,,4\nφι,plural,dative,3rd,masculine feminine,irregular,,45\nφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nηφι,plural,dative,3rd,masculine feminine,irregular,,45\nηφιv,plural,dative,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,dative,3rd,masculine feminine,irregular,,45\nῆφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nόφι,plural,dative,3rd,masculine feminine,irregular,,45\nόφιν,plural,dative,3rd,masculine feminine,irregular,,4 45\nαις,plural,dative,3rd,masculine feminine,irregular,,33 41\nοῖσι,plural,dative,3rd,masculine feminine,irregular,,33\nοῖσιv,plural,dative,3rd,masculine feminine,irregular,,4 33\nεσσι,plural,dative,3rd,masculine feminine,irregular,,16 61\nεσσιv,plural,dative,3rd,masculine feminine,irregular,,4 16 61\nυσσι,plural,dative,3rd,masculine feminine,irregular,,54\nυσσιv,plural,dative,3rd,masculine feminine,irregular,,4 54\nσσί,plural,dative,3rd,masculine feminine,irregular,,54\nσσίv,plural,dative,3rd,masculine feminine,irregular,,4 54\nων,plural,genitive,3rd,masculine feminine,regular,primary,\nῶν,plural,genitive,3rd,masculine feminine,regular,,\n-,plural,genitive,3rd,masculine feminine,irregular,,41\nφι,plural,genitive,3rd,masculine feminine,irregular,,45\nφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nηφι,plural,genitive,3rd,masculine feminine,irregular,,45\nηφιv,plural,genitive,3rd,masculine feminine,irregular,,4 45\nῆφι,plural,genitive,3rd,masculine feminine,irregular,,45\nῆφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nόφι,plural,genitive,3rd,masculine feminine,irregular,,45\nόφιν,plural,genitive,3rd,masculine feminine,irregular,,4 45\nέων,plural,genitive,3rd,masculine feminine,irregular,,16 61\nες,plural,nominative,3rd,masculine feminine,regular,primary,\nως,plural,nominative,3rd,masculine feminine,regular,,30\nεις,plural,nominative,3rd,masculine feminine,regular,,17\nεῖς,plural,nominative,3rd,masculine feminine,regular,,18\nοί,plural,nominative,3rd,masculine feminine,irregular,,32\nαί,plural,nominative,3rd,masculine feminine,irregular,,33\nῆς,plural,nominative,3rd,masculine feminine,irregular,,18\nῄς,plural,nominative,3rd,masculine feminine,irregular,,31 41\nεες,plural,nominative,3rd,masculine feminine,irregular,,16 55 61\nοι,plural,nominative,3rd,masculine feminine,irregular,,33\nες,plural,vocative,3rd,masculine feminine,regular,primary,\nεις,plural,vocative,3rd,masculine feminine,regular,,17\nεῖς,plural,vocative,3rd,masculine feminine,regular,,18\nῆς,plural,vocative,3rd,masculine feminine,regular,,18\nως,plural,vocative,3rd,masculine feminine,regular,,30\nεες,plural,vocative,3rd,masculine feminine,irregular,,16 55 61\nα,plural,accusative,3rd,neuter,regular,primary,\nη,plural,accusative,3rd,neuter,regular,,\nς,plural,accusative,3rd,neuter,regular,,\nά,plural,accusative,3rd,neuter,irregular,,33\nαα,plural,accusative,3rd,neuter,irregular,,16 61\nεα,plural,accusative,3rd,neuter,irregular,,16 61\nσι,plural,dative,3rd,neuter,regular,primary,\nσιν,plural,dative,3rd,neuter,regular,primary,4\nσί,plural,dative,3rd,neuter,regular,,\nσίv,plural,dative,3rd,neuter,regular,,4\nασι,plural,dative,3rd,neuter,regular,,\nασιν,plural,dative,3rd,neuter,regular,,4\nεσι,plural,dative,3rd,neuter,regular,,\nεσιν,plural,dative,3rd,neuter,regular,,4\nέσι,plural,dative,3rd,neuter,regular,,\nέσιv,plural,dative,3rd,neuter,regular,,4\nεσσι,plural,dative,3rd,neuter,irregular,,54\nεσσιν,plural,dative,3rd,neuter,irregular,,4 54\nσσί,plural,dative,3rd,neuter,irregular,,54\nσσίv,plural,dative,3rd,neuter,irregular,,4 54\nασσι,plural,dative,3rd,neuter,irregular,,54\nασσιν,plural,dative,3rd,neuter,irregular,,4 54\nφι,plural,dative,3rd,neuter,irregular,,45\nφιν,plural,dative,3rd,neuter,irregular,,4 45\nηφι,plural,dative,3rd,neuter,irregular,,45\nηφιv,plural,dative,3rd,neuter,irregular,,4 45\nῆφι,plural,dative,3rd,neuter,irregular,,45\nῆφιν,plural,dative,3rd,neuter,irregular,,4 45\nόφι,plural,dative,3rd,neuter,irregular,,45\nόφιν,plural,dative,3rd,neuter,irregular,,4 45\nων,plural,genitive,3rd,neuter,regular,primary,\nῶν,plural,genitive,3rd,neuter,regular,primary,\nφι,plural,genitive,3rd,neuter,irregular,,\nφιν,plural,genitive,3rd,neuter,irregular,,4 45\nηφι,plural,genitive,3rd,neuter,irregular,,45\nηφιv,plural,genitive,3rd,neuter,irregular,,4 45\nῆφι,plural,genitive,3rd,neuter,irregular,,45\nῆφιν,plural,genitive,3rd,neuter,irregular,,4 45\nόφι,plural,genitive,3rd,neuter,irregular,,45\nόφιν,plural,genitive,3rd,neuter,irregular,,4 45\nέων,plural,genitive,3rd,neuter,irregular,,16 61\nάων,plural,genitive,3rd,neuter,irregular,,16 61\nα,plural,nominative,3rd,neuter,regular,primary,\nη,plural,nominative,3rd,neuter,regular,,\nες,plural,nominative,3rd,neuter,regular,,\nά,plural,nominative,3rd,neuter,irregular,,33\nεα,plural,nominative,3rd,neuter,irregular,,16 61\nαα,plural,nominative,3rd,neuter,irregular,,16 61\nα,plural,vocative,3rd,neuter,regular,primary,\nη,plural,vocative,3rd,neuter,regular,,\nες,plural,vocative,3rd,neuter,regular,,\nαα,plural,vocative,3rd,neuter,irregular,,16 61\nεα,plural,vocative,3rd,neuter,irregular,,16 61\nα,singular,accusative,3rd,masculine feminine,regular,primary,\nη,singular,accusative,3rd,masculine feminine,regular,,16\nν,singular,accusative,3rd,masculine feminine,regular,,\nιν,singular,accusative,3rd,masculine feminine,regular,,41\nῦν,singular,accusative,3rd,masculine feminine,regular,,18\nῶ,singular,accusative,3rd,masculine feminine,regular,,23\nυν,singular,accusative,3rd,masculine feminine,regular,,\nῦν,singular,accusative,3rd,masculine feminine,regular,,17\nύν,singular,accusative,3rd,masculine feminine,regular,,17\nέα,singular,accusative,3rd,masculine feminine,regular,,20\nην,singular,accusative,3rd,masculine feminine,regular,,24\nώ,singular,accusative,3rd,masculine feminine,regular,,19 41\nω,singular,accusative,3rd,masculine feminine,regular,,23\nεῖν,singular,accusative,3rd,masculine feminine,irregular,,31 41\nων,singular,accusative,3rd,masculine feminine,irregular,,33 41 49\nαν,singular,accusative,3rd,masculine feminine,irregular,,33 41\nον,singular,accusative,3rd,masculine feminine,irregular,,39\nῖς,singular,accusative,3rd,masculine feminine,irregular,,33\nεα,singular,accusative,3rd,masculine feminine,irregular,,61\nι,singular,dative,3rd,masculine feminine,regular,primary,\nί,singular,dative,3rd,masculine feminine,regular,,\nϊ,singular,dative,3rd,masculine feminine,regular,,17\nΐ,singular,dative,3rd,masculine feminine,regular,,40\nει,singular,dative,3rd,masculine feminine,regular,,16 17\nεῖ,singular,dative,3rd,masculine feminine,regular,,18\nαι,singular,dative,3rd,masculine feminine,regular,,\noῖ,singular,dative,3rd,masculine feminine,regular,,28 41\nῖ,singular,dative,3rd,masculine feminine,irregular,,33 46\nῆι,singular,dative,3rd,masculine feminine,irregular,,18\nᾳ,singular,dative,3rd,masculine feminine,irregular,,25\nῳ,singular,dative,3rd,masculine feminine,irregular,,33 34\nῷ,singular,dative,3rd,masculine feminine,irregular,,33\nιί,singular,dative,3rd,masculine feminine,irregular,,62\nυί,singular,dative,3rd,masculine feminine,irregular,,62\nέϊ,singular,dative,3rd,masculine feminine,irregular,,18 61\nος,singular,genitive,3rd,masculine feminine,regular,primary,\nός,singular,genitive,3rd,masculine feminine,regular,,\nους,singular,genitive,3rd,masculine feminine,regular,,16\nοῦς,singular,genitive,3rd,masculine feminine,regular,,19 46\nως,singular,genitive,3rd,masculine feminine,regular,,17 18\nώς,singular,genitive,3rd,masculine feminine,regular,,17 18 41\nῶς,singular,genitive,3rd,masculine feminine,regular,,47\nεως,singular,genitive,3rd,masculine feminine,regular,,17\nέως,singular,genitive,3rd,masculine feminine,regular,,\nεώς,singular,genitive,3rd,masculine feminine,regular,,\nέους,singular,genitive,3rd,masculine feminine,regular,,20\nω,singular,genitive,3rd,masculine feminine,irregular,,\nεος,singular,genitive,3rd,masculine feminine,irregular,,61\nΰς,singular,genitive,3rd,masculine feminine,irregular,,41 48\nῦς,singular,genitive,3rd,masculine feminine,irregular,,48\nνος,singular,genitive,3rd,masculine feminine,irregular,,22\nοῦ,singular,genitive,3rd,masculine feminine,irregular,,33\nηος,singular,genitive,3rd,masculine feminine,irregular,,55\nιός,singular,genitive,3rd,masculine feminine,irregular,,62\nuός,singular,genitive,3rd,masculine feminine,irregular,,62\nς,singular,nominative,3rd,masculine feminine,regular,primary,\n-,singular,nominative,3rd,masculine feminine,regular,primary,\nηρ,singular,nominative,3rd,masculine feminine,regular,,41\nις,singular,nominative,3rd,masculine feminine,regular,,\nϊς,singular,nominative,3rd,masculine feminine,regular,,\nώ,singular,nominative,3rd,masculine feminine,regular,,41\nψ,singular,nominative,3rd,masculine feminine,regular,,\nξ,singular,nominative,3rd,masculine feminine,regular,,\nρ,singular,nominative,3rd,masculine feminine,regular,,\nήρ,singular,nominative,3rd,masculine feminine,regular,,\nήν,singular,nominative,3rd,masculine feminine,regular,,50\nν,singular,nominative,3rd,masculine feminine,regular,,\nωρ,singular,nominative,3rd,masculine feminine,regular,,\nων,singular,nominative,3rd,masculine feminine,regular,,\nών,singular,nominative,3rd,masculine feminine,regular,,\nης,singular,nominative,3rd,masculine feminine,regular,,\nῆς,singular,nominative,3rd,masculine feminine,regular,,\nυς,singular,nominative,3rd,masculine feminine,regular,,\nῦς,singular,nominative,3rd,masculine feminine,regular,,\nεῦς,singular,nominative,3rd,masculine feminine,regular,,\nύς,singular,nominative,3rd,masculine feminine,regular,,\nής,singular,nominative,3rd,masculine feminine,regular,,33\nας,singular,nominative,3rd,masculine feminine,irregular,,\nῴ,singular,nominative,3rd,masculine feminine,irregular,,29 41\nώς,singular,nominative,3rd,masculine feminine,irregular,,27 41\nϋς,singular,nominative,3rd,masculine feminine,irregular,,41\nῄς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῖς,singular,nominative,3rd,masculine feminine,irregular,,\nεῖς,singular,nominative,3rd,masculine feminine,irregular,,31 41\nῶς,singular,nominative,3rd,masculine feminine,irregular,,48\nος,singular,nominative,3rd,masculine feminine,irregular,,33\n-,singular,vocative,3rd,masculine feminine,regular,primary,52\nς,singular,vocative,3rd,masculine feminine,regular,,30\nι,singular,vocative,3rd,masculine feminine,regular,,41\nῦ,singular,vocative,3rd,masculine feminine,regular,,15 17 18\nοῖ,singular,vocative,3rd,masculine feminine,regular,,19 41\nψ,singular,vocative,3rd,masculine feminine,regular,,\nξ,singular,vocative,3rd,masculine feminine,regular,,\nν,singular,vocative,3rd,masculine feminine,regular,,\nρ,singular,vocative,3rd,masculine feminine,regular,,\nων,singular,vocative,3rd,masculine feminine,regular,,50\nών,singular,vocative,3rd,masculine feminine,regular,,\nήν,singular,vocative,3rd,masculine feminine,regular,,\nερ,singular,vocative,3rd,masculine feminine,regular,,\nες,singular,vocative,3rd,masculine feminine,regular,,\nί,singular,vocative,3rd,masculine feminine,regular,,\nως,singular,vocative,3rd,masculine feminine,regular,,\nἶ,singular,vocative,3rd,masculine feminine,regular,,\nούς,singular,vocative,3rd,masculine feminine,regular,,51\nύ,singular,vocative,3rd,masculine feminine,regular,,15\nυ,singular,vocative,3rd,masculine feminine,regular,,51\nεις,singular,vocative,3rd,masculine feminine,regular,,20\nαν,singular,vocative,3rd,masculine feminine,regular,,\nώς,singular,vocative,3rd,masculine feminine,irregular,,27 41 46\nον,singular,vocative,3rd,masculine feminine,irregular,,\nυς,singular,vocative,3rd,masculine feminine,irregular,,33\nα,singular,accusative,3rd,neuter,regular,primary,15\n-,singular,accusative,3rd,neuter,regular,,33\nος,singular,accusative,3rd,neuter,regular,,\nας,singular,accusative,3rd,neuter,regular,,\nαρ,singular,accusative,3rd,neuter,regular,,21\nυ,singular,accusative,3rd,neuter,regular,,\nι,singular,dative,3rd,neuter,regular,primary,\nει,singular,dative,3rd,neuter,regular,,16\nαι,singular,dative,3rd,neuter,regular,,16 21\nϊ,singular,dative,3rd,neuter,irregular,,17\nᾳ,singular,dative,3rd,neuter,irregular,,25 33\nυϊ,singular,dative,3rd,neuter,irregular,,17\nαϊ,singular,dative,3rd,neuter,irregular,,21 61\nος,singular,genitive,3rd,neuter,regular,primary,\nους,singular,genitive,3rd,neuter,regular,,16\nως,singular,genitive,3rd,neuter,regular,,16\nεως,singular,genitive,3rd,neuter,regular,,17\nυς,singular,genitive,3rd,neuter,irregular,,26\nου,singular,genitive,3rd,neuter,irregular,,33\nαος,singular,genitive,3rd,neuter,irregular,,21 61\nα,singular,nominative,3rd,neuter,regular,primary,\n-,singular,nominative,3rd,neuter,regular,,33\nος,singular,nominative,3rd,neuter,regular,,\nαρ,singular,nominative,3rd,neuter,regular,,\nας,singular,nominative,3rd,neuter,regular,,16 21\nυ,singular,nominative,3rd,neuter,regular,,\nον,singular,nominative,3rd,neuter,irregular,,33\nα,singular,vocative,3rd,neuter,regular,primary,15\n-,singular,vocative,3rd,neuter,regular,,\nος,singular,vocative,3rd,neuter,regular,,\nας,singular,vocative,3rd,neuter,regular,,\nαρ,singular,vocative,3rd,neuter,regular,,21\nυ,singular,vocative,3rd,neuter,regular,,";

var nounFootnotesCSV$1 = "Index,Text\n1,See  for Rules of variance within regular endings\n2,See  for Table of α- and ε- stem feminine 1st declension contracts\n3,See  for Table of α- and ε- stem masculine 1st declension contracts\n4,\"Previous, with (ν)\"\n5,See  for Table of o- and ε- stem masculine  2nd declension contracts\n6,See  for Table of o- and ε- stem neuter 2nd declension contracts\n7,(Attic) contracts of o-stems preceded by a long vowel\n15,\"This is not actually an “ending,” but the last letter of the “pure stem”. See\"\n16,\"See  &  for Table of Sigma (ες,ας,ος) stem contracts\"\n17,See  for Table of  ι and υ - stem contracts\n18,\"See  for Table of  ευ,αυ,and ου - stem contracts\"\n19,See  for stems in οι feminine 3rd declension contracts\n20,See  for Table of 3rd declension contracts of stems in -εσ- preceded by ε\n21,See  for Table of stems in τ and ατ neuter 3rd declension contracts\n22,\"On stem ending in ν, ν doubled in gen. Sing Aeolic (e.g. μῆνς,μῆννος...)\"\n23,Also in inscriptions and expressions of swearing\n24,(Borrowed from 1st decl) Sometimes in proper names whose nominative ends in -ης\n25,From -ας-stems (properly αι)\n26,(ε)υς instead of (ε)ος or ους (gen) for (3rd decl) words whose nominative ends in -ος\n27,In 3rd decl. Only in the words αἰδώς (Attic) and ἠώς (Homer and Ionic)\n28,Contraction of a stem in οι  and an ι-ending\n29,Stronger form of Ionic contractions of οι-stems (in the nominative)\n30,See  for Table of ω - stem contracts (masculine only)\n31,Nominative plural contraction of  -ειδ+ες  after dropping the δ (used for accusative too). See .a\n32,\"Plurals & duals occur rarely (and w/ 2nd decl endings) for 3rd decl οι-stem nouns. See .D.a,b,c\"\n33,See  for description and examples of Irreg. Decl involving 3rd decl endings\n34,(Homer)  for Attic  (ῳτ)ι\n35,(Homer) for Cretan ινς\n36,Also an irregular ending for other stem(s)\n37,In inscriptions\n38,\"Plural endings for otherwise dual noun,οσσε (eyes)\"\n39,\"“Poetical” (acc for ἔρως). See ,11\"\n40,\"Poetic for χρωτι,dat. of ὁ χρως\"\n41,No Masculine of this Form\n42,No Feminine of this Form\n44,See  D.9 and #215 regarding dialectic alternate forms of the Dative Plural\n45,\"Surviving in Homer (See ) Not truly genitive or dative, but instrumental/locative/ablative, associated with the remaining oblique cases (genitive & dative) only after being lost as cases themselves in Greek\"\n46,See Smyth # 266 for only surviving ος-stem in Attic (fem. singular of αἰδως)\n47,See  for Substantives in -εύς preceded by a vowel.\n48,\"See Smyth,  #275 D.1,2,3\"\n49,\"See , List of Principal Irregular Substantives\"\n50,\"See  for Table of stems in a Liquid (λ,ρ) or a Nasal (ν), and Note #259D for variants including Κρονίων...\"\n51,\"See  for Table of stems in a Dental (τ,δ,θ) or a Nasal (ν), and its notes including Ν.κόρυς (Voc. Κόρυ) & ὀδούς\"\n52,See  for general rule re 3rd Declension Masc/Fem Singular Vocative\n54,See  D\n55,See\n56,\"See  for other forms of endings for contracts of ευ,αυ,and ου - stems\"\n57,Nominative form used as Vocative. See\n58,\"See ,b\"\n59,\"See ,d\"\n60,This (Feminine or Masculine) Form only Masculine when derived from ε- or ο- contraction\n61,See Smyth Note 264 D.1 regarding Homer's use of Open Forms\n62,See Smyth Note 269 for alternate i-stem and u-stem endings\n63,See  D.2\n64,See  D.1";

/*
 * Latin language data module
 */
// import languages from '../../../lib/languages'
/* import adjectiveSuffixesCSV from './data/adjective/suffixes.csv';
import adjectiveFootnotesCSV from './data/adjective/footnotes.csv';
import verbSuffixesCSV from './data/verb/suffixes.csv';
import verbFootnotesCSV from './data/verb/footnotes.csv'; */
// A language of this module
// const language = languages.greek
let languageModel$1 = new GreekLanguageModel();
let ftypes = Feature.types;
// Create a language data set that will keep all language-related information
let dataSet$1 = new LanguageDataset(constants.LANG_GREEK);

const featureOptions$1 = [ftypes.grmCase, ftypes.declension, ftypes.gender, ftypes.number, ftypes.voice, ftypes.mood, ftypes.tense, ftypes.person];
// region Definition of grammatical features
/*
 Define grammatical features of a language. Those grammatical features definitions will also be used by morphological
 analyzer's language modules as well.
 */
const importerName$1 = 'csv';
const parts = new FeatureType(Feature.types.part, ['noun', 'adjective', 'verb'], dataSet$1.languageID);
const numbers = new FeatureType(Feature.types.number, ['singular', 'dual', 'plural'], dataSet$1.languageID);
numbers.addImporter(importerName$1)
    .map('singular', numbers.singular)
    .map('dual', numbers.dual)
    .map('plural', numbers.plural);
const cases = new FeatureType(Feature.types.grmCase,
  ['nominative', 'genitive', 'dative', 'accusative', 'vocative'],
  dataSet$1.languageID);
cases.addImporter(importerName$1)
    .map('nominative', cases.nominative)
    .map('genitive', cases.genitive)
    .map('dative', cases.dative)
    .map('accusative', cases.accusative)
    .map('vocative', cases.vocative);
const declensions = new FeatureType(Feature.types.declension, ['first', 'second', 'third'], dataSet$1.languageID);
declensions.addImporter(importerName$1)
    .map('1st', declensions.first)
    .map('2nd', declensions.second)
    .map('3rd', declensions.third);
const genders = new FeatureType(Feature.types.gender, ['masculine', 'feminine', 'neuter'], dataSet$1.languageID);
genders.addImporter(importerName$1)
    .map('masculine', genders.masculine)
    .map('feminine', genders.feminine)
    .map('neuter', genders.neuter)
    .map('masculine feminine', [genders.masculine, genders.feminine]);
const types$1 = new FeatureType(Feature.types.type, ['regular', 'irregular'], dataSet$1.languageID);
types$1.addImporter(importerName$1)
    .map('regular', types$1.regular)
    .map('irregular', types$1.irregular);
/*
const conjugations = new Models.FeatureType(Lib.types.conjugation, ['first', 'second', 'third', 'fourth']);
conjugations.addImporter(importerName)
    .map('1st', conjugations.first)
    .map('2nd', conjugations.second)
    .map('3rd', conjugations.third)
    .map('4th', conjugations.fourth);
const tenses = new Models.FeatureType(Lib.types.tense, ['present', 'imperfect', 'future', 'perfect', 'pluperfect', 'future perfect']);
tenses.addImporter(importerName)
    .map('present', tenses.present)
    .map('imperfect', tenses.imperfect)
    .map('future', tenses.future)
    .map('perfect', tenses.perfect)
    .map('pluperfect', tenses.pluperfect)
    .map('future_perfect', tenses['future perfect']);
const voices = new Models.FeatureType(Lib.types.voice, ['passive', 'active'],language);
voices.addImporter(importerName)
    .map('passive', voices.passive)
    .map('active', voices.active);
const moods = new Models.FeatureType(Lib.types.mood, ['indicative', 'subjunctive']);
moods.addImporter(importerName)
    .map('indicative', moods.indicative)
    .map('subjunctive', moods.subjunctive);
const persons = new Models.FeatureType(Lib.types.person, ['first', 'second', 'third']);
persons.addImporter(importerName)
    .map('1st', persons.first)
    .map('2nd', persons.second)
    .map('3rd', persons.third); */
const footnotes$1 = new FeatureType(Feature.types.footnote, [], dataSet$1.languageID);

// endregion Definition of grammatical features

// For noun and adjectives
dataSet$1.addSuffixes = function (partOfSpeech, data) {
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let dataItem = data[i];
    let suffixValue = dataItem[0];
    // Handle special suffix values
    if (suffixValue === noSuffixValue) {
      suffixValue = null;
    }

    let primary = false;
    let features = [partOfSpeech,
      numbers.importer.csv.get(dataItem[1]),
      cases.importer.csv.get(dataItem[2]),
      declensions.importer.csv.get(dataItem[3]),
      genders.importer.csv.get(dataItem[4]),
      types$1.importer.csv.get(dataItem[5])];
    if (dataItem[6] === 'primary') {
      primary = true;
    }
    if (dataItem[7]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = dataItem[7].split(' ').map(function (index) {
        return footnotes$1.get(index)
      });
      features.push(...indexes);
    }
    let extendedGreekData = new ExtendedGreekData();
    extendedGreekData.primary = primary;
    let extendedLangData = {
      [constants.LANG_GREEK]: extendedGreekData
    };
    this.addItem(suffixValue, LanguageDataset.SUFFIX, features, extendedLangData);
  }
};

// For verbs
dataSet$1.addVerbSuffixes = function (partOfSpeech, data) {
  // Some suffix values will mean a lack of suffix, they will be mapped to a null
  let noSuffixValue = '-';

  // First row are headers
  for (let i = 1; i < data.length; i++) {
    let suffix = data[i][0];
    // Handle special suffix values
    if (suffix === noSuffixValue) {
      suffix = null;
    }

    let features = [partOfSpeech
      /*
      conjugations.importer.csv.get(data[i][1]),
      voices.importer.csv.get(data[i][2]),
      moods.importer.csv.get(data[i][3]),
      tenses.importer.csv.get(data[i][4]),
      numbers.importer.csv.get(data[i][5]),
      persons.importer.csv.get(data[i][6]) */
    ];

    let grammarType = data[i][7];
    // Type information can be empty if no ending is provided
    if (grammarType) {
      features.push(types$1.importer.csv.get(grammarType));
    }
    // Footnotes
    if (data[i][8]) {
      // There can be multiple footnote indexes separated by spaces
      let indexes = data[i][8].split(' ').map(function (index) {
        return footnotes$1.get(index)
      });
      features.push(...indexes);
    }
    this.addItem(suffix, LanguageDataset.SUFFIX, features);
  }
};

dataSet$1.addFootnotes = function (partOfSpeech, data) {
  // First row are headers
  for (let i = 1; i < data.length; i++) {
    this.addFootnote(partOfSpeech, data[i][0], data[i][1]);
  }
};

dataSet$1.loadData = function () {
  // Nouns
  let partOfSpeech = parts.noun;
  let suffixes = papaparse.parse(nounSuffixesCSV$1, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  let footnotes = papaparse.parse(nounFootnotesCSV$1, {});
  this.addFootnotes(partOfSpeech, footnotes.data);

  // Adjectives
  /* partOfSpeech = parts.adjective;
  suffixes = papaparse.parse(adjectiveSuffixesCSV, {});
  this.addSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(adjectiveFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data); */

  // Verbs
  /* partOfSpeech = parts.verb;
  suffixes = papaparse.parse(verbSuffixesCSV, {});
  this.addVerbSuffixes(partOfSpeech, suffixes.data);
  footnotes = papaparse.parse(verbFootnotesCSV, {});
  this.addFootnotes(partOfSpeech, footnotes.data); */
};

/**
 * Decides whether a suffix is a match to any of inflections, and if it is, what type of match it is.
 * @param {Inflection[]} inflections - An array of Inflection objects to be matched against a suffix.
 * @param {string} type - LanguageDataset.SUFFIX or LanguageDataset.FORM
 * @param {Suffix} suffix - A suffix to be matched with inflections.
 * @returns {Suffix | null} If a match is found, returns a Suffix object modified with some
 * additional information about a match. If no matches found, returns null.
 */
dataSet$1.matcher = function (inflections, type, item) {
  'use strict';
    // All of those features must match between an inflection and an ending
  let obligatoryMatches, optionalMatches;
  // I'm not sure if we ever want to restrict what we consider optional matches
  // so this is just a placeholder for now
  let matchOptional = true;
  if (type === LanguageDataset.SUFFIX) {
    obligatoryMatches = [types$1.part];
  } else {
    obligatoryMatches = [types$1.word];
  }

    // Any of those features must match between an inflection and an ending
  let bestMatchData = null; // information about the best match we would be able to find

    /*
     There can be only one full match between an inflection and a suffix (except when suffix has multiple values?)
     But there could be multiple partial matches. So we should try to find the best match possible and return it.
     a fullFeature match is when one of inflections has all grammatical features fully matching those of a suffix
     */
  for (let inflection of inflections) {
    let matchData = new MatchData(); // Create a match profile
    if (matchOptional) {
      optionalMatches = featureOptions$1.filter((f) => inflection[f]);
    } else {
      optionalMatches = [];
    }

    if (type === LanguageDataset.SUFFIX) {
      if (languageModel$1.normalizeWord(inflection.suffix) === languageModel$1.normalizeWord(item.value)) {
        matchData.suffixMatch = true;
      }
    } else {
      let form = inflection.prefix ? inflection.prefix : '';
      form = form + inflection.stem;
      form = inflection.suffix ? form + inflection.suffix : form;
      if (languageModel$1.normalizeWord(form) === languageModel$1.normalizeWord(item.value)) {
        matchData.suffixMatch = true;
      }
    }

        // Check obligatory matches
    for (let feature of obligatoryMatches) {
      let featureMatch = item.featureMatch(feature, inflection[feature]);
            // matchFound = matchFound && featureMatch;

      if (!featureMatch) {
                // If an obligatory match is not found, there is no reason to check other items
        break
      }
            // Inflection's value of this feature is matching the one of the suffix
      matchData.matchedFeatures.push(feature);
    }

    if (matchData.matchedFeatures.length < obligatoryMatches.length) {
            // Not all obligatory matches are found, this is not a match
      break
    }

        // Check optional matches now
    for (let feature of optionalMatches) {
      let matchedValue = item.featureMatch(feature, inflection[feature]);
      if (matchedValue) {
        matchData.matchedFeatures.push(feature);
      }
    }

    if (matchData.suffixMatch && (matchData.matchedFeatures.length === obligatoryMatches.length + optionalMatches.length)) {
            // This is a full match
      matchData.fullMatch = true;

            // There can be only one full match, no need to search any further
      item.match = matchData;
      return item
    }
    bestMatchData = this.bestMatch(bestMatchData, matchData);
  }
  if (bestMatchData) {
        // There is some match found
    item.match = bestMatchData;
    return item
  }
  return null
};

/**
 * Decides whether matchA is 'better' (i.e. has more items matched) than matchB or not
 * @param {MatchData} matchA
 * @param {MatchData} matchB
 * @returns {MatchData} A best of two matches
 */
dataSet$1.bestMatch = function (matchA, matchB) {
  // If one of the arguments is not set, return the other one
  if (!matchA && matchB) {
    return matchB
  }

  if (!matchB && matchA) {
    return matchA
  }

  // Suffix match has a priority
  if (matchA.suffixMatch !== matchB.suffixMatch) {
    if (matchA.suffixMatch > matchB.suffixMatch) {
      return matchA
    } else {
      return matchB
    }
  }

  // If same on suffix matche, compare by how many features matched
  if (matchA.matchedFeatures.length >= matchB.matchedFeatures.length) {
    // Arbitrarily return matchA if matches are the same
    return matchA
  } else {
    return matchB
  }
};

/**
 * Stores one or several language datasets, one for each language
 */
class LanguageDataList {
  /**
   * Combines several language datasets for different languages. Allows to abstract away language data.
   * This function is chainable.
   * @param {LanguageDataset[]} languageData - Language datasets of different languages.
   */
  constructor (languageData = [dataSet, dataSet$1]) {
    this.sets = new Map(languageData.map(item => [item.languageID, item]));
  }

  /**
   * Loads data for all data sets.
   * This function is chainable.
   * @return {LanguageDataList} Self instance for chaining.
   */
  loadData () {
    try {
      for (let dataset of this.sets.values()) {
        dataset.loadData();
      }
    } catch (e) {
      console.log(e);
    }
    return this
  }

  /**
   * Finds matching suffixes for a homonym.
   * @param {Homonym} homonym - A homonym for which matching suffixes must be found.
   * @return {InflectionData} A return value of an inflection query.
   */
  getSuffixes (homonym) {
    if (this.sets.has(homonym.languageID)) {
      return this.sets.get(homonym.languageID).getSuffixes(homonym)
    } else {
      return new InflectionData(homonym) // Return an empty inflection data set
    }
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
    this.forms = [];
    this.table = {};
  }

  /**
   * test to see if a view is enabled for a specific set of lexemes
   * @param {Lexeme[]} lexemes
   * @return {boolean} true if the view should be shown false if not
   */
  enabledForLexemes (lexemes) {
    // default returns true
    return true
  }

  /**
   * Converts an InflectionData, returned from an inflection tables library, into an HTML representation of an inflection table.
   * `messages` provides a translation for view's texts.
   * @param {InflectionData} inflectionData - A result set from inflection tables library.
   * @param {MessageBundle} messages - A message bundle with message translations.
   */
  render (inflectionData, messages) {
    let selection = inflectionData[this.partOfSpeech];

    this.footnotes = new Map();
    if (selection.footnotes && Array.isArray(selection.footnotes)) {
      for (const footnote of selection.footnotes) {
        this.footnotes.set(footnote.index, footnote);
      }
    }

    // Table is created during view construction
    this.table.messages = messages;
    this.forms = new Set();
    for (let lexeme of inflectionData.homonym.lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection['part of speech'].filter((f) => f.hasValue(this.partOfSpeech)).length > 0) {
          let form = inflection.prefix ? `${inflection.prefix} - ` : '';
          form = form + inflection.stem;
          form = inflection.suffix ? `${form} - ${inflection.suffix}` : form;
          this.forms.add(form);
        }
      }
    }
    this.table.construct(selection.suffixes).constructViews().addEventListeners();
    return this
  }

  get wideViewNodes () {
    return this.table.wideView.render()
  }

  get narrowViewNodes () {
    return this.table.narrowView.render()
  }

  /**
   * Hides all empty columns of the view.
   */
  hideEmptyColumns () {
    this.table.hideEmptyColumns();
    return this
  }

  /**
   * Displays all previously hidden columns.
   */
  showEmptyColumns () {
    this.table.showEmptyColumns();
    return this
  }

  /**
   * Hides groups (formed by first column feature) that have no suffix matches.
   */
  hideNoSuffixGroups () {
    if (this.table.canCollapse) {
      this.table.hideNoSuffixGroups();
    }
    return this
  }

  /**
   * Displays previously hidden groups with no suffix matches.
   */
  showNoSuffixGroups () {
    this.table.showNoSuffixGroups();
    return this
  }
}

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
    super(featureType.type, GroupFeatureType.featuresToValues(order), featureType.languageID);

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
    return this.getOrderedValues(ancestorFeatures).map((value) => new Feature(value, this.type, this.languageID))
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
   * Returns a column or row title for a value of a feature provided.
   * Redefine it if you want to display custom titles instead of feature values.
   * @param {Feature} featureValue - A feature object containing a feature value
   * @return {string} - A row or column title for a table
   */
  getTitle (featureValue) {
    if (this.hasOwnProperty(featureValue)) {
      if (Array.isArray(this[featureValue])) {
        return this[featureValue].map((feature) => feature.value).join('/')
      } else {
        return this[featureValue].value
      }
    } else {
      return 'not available'
    }
  }

  /**
   * Returns true if an ending grammatical feature defined by featureType has a value that is listed in a featureValues array.
   * This function is used with Array.prototype.filter().
   * If you want to provide a custom grouping for any particular feature type, redefine this function
   * to implement a custom grouping logic.
   * @param {string | string[]} featureValues - a list of possible values of a type specified by featureType that
   * this ending should have.
   * @param {Suffix} suffix - an ending we need to filter out.
   * @returns {boolean} True if suffix has a value of a grammatical feature specified.
   */
  filter (featureValues, suffix) {
    // If not an array, convert it to array for uniformity
    if (!Array.isArray(featureValues)) {
      featureValues = [featureValues];
    }
    for (const value of featureValues) {
      if (suffix.features[this.type] === value) {
        return true
      }
    }

    return false
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
      let suffixElement = document.createElement('span');
      suffixElement.classList.add(classNames.suffix);
      if (suffix.match && suffix.match.suffixMatch) {
        suffixElement.classList.add(classNames.suffixMatch);
      }
      if (suffix.match && suffix.match.fullMatch) {
        suffixElement.classList.add(classNames.suffixFullFeatureMatch);
      }
      suffixElement.innerHTML = suffix.value ? suffix.value : '-';
      element.appendChild(suffixElement);

      if (suffix.footnote && suffix.footnote.length) {
        let footnoteElement = document.createElement('a');
        footnoteElement.innerHTML = `<sup>${suffix.footnote}</sup>`;
        footnoteElement.dataset.footnote = suffix.footnote;
        element.appendChild(footnoteElement);
      }
      if (index < this.suffixes.length - 1) {
        element.appendChild(document.createTextNode(', ')); // 00A0 is a non-breaking space
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
 * A cell in a header row, a column title cell.
 */
class HeaderCell {
  /**
   * Initializes a header cell.
   * @param {string} featureValue - A title text that will be shown in the header cell.
   * @param {GroupFeatureType} groupingFeature - A feature that defines one or several columns this header forms.
   * @param {number} [span=1] - How many columns in a table this header cell forms.
   */
  constructor (featureValue, groupingFeature, span = 1) {
    this.feature = groupingFeature;
    this.title = groupingFeature.getTitle(featureValue);
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
    this.canCollapse = this._hasAnyMatches();
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
      let selectedSuffixes = suffixes.filter(group.groupFeatureType.filter.bind(group.groupFeatureType, featureValue.value));

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
   * Check for any matched suffixes
   */
  _hasAnyMatches () {
    let hasMatches = false;
    if (this.headers.length > 0) {
      for (let headerCell of this.headers[0].cells) {
        hasMatches = !!headerCell.columns.find(column => column.suffixMatches);
        if (hasMatches) {
          break
        }
      }
    }
    return hasMatches
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

/* eslint-disable no-unused-vars */
const LANG_UNIT_WORD$1 = Symbol('word');
const LANG_UNIT_CHAR$1 = Symbol('char');
const LANG_DIR_LTR$1 = Symbol('ltr');
const LANG_DIR_RTL$1 = Symbol('rtl');
const LANG_LATIN$1 = Symbol('latin');
const LANG_GREEK$1 = Symbol('greek');
const LANG_ARABIC$1 = Symbol('arabic');
const LANG_PERSIAN$1 = Symbol('persian');
const STR_LANG_CODE_LAT$1 = 'lat';
const STR_LANG_CODE_LA$1 = 'la';
const STR_LANG_CODE_GRC$1 = 'grc';
const STR_LANG_CODE_ARA$1 = 'ara';
const STR_LANG_CODE_AR$1 = 'ar';
const STR_LANG_CODE_FAS$1 = 'fas';
const STR_LANG_CODE_PER$1 = 'per';
const STR_LANG_CODE_FA_IR$1 = 'fa-IR';
const STR_LANG_CODE_FA$1 = 'fa';
// parts of speech
const POFS_ADJECTIVE$1 = 'adjective';
const POFS_ADVERB$1 = 'adverb';
const POFS_ADVERBIAL$1 = 'adverbial';
const POFS_ARTICLE$1 = 'article';
const POFS_CONJUNCTION$1 = 'conjunction';
const POFS_EXCLAMATION$1 = 'exclamation';
const POFS_INTERJECTION$1 = 'interjection';
const POFS_NOUN$1 = 'noun';
const POFS_NUMERAL$1 = 'numeral';
const POFS_PARTICLE$1 = 'particle';
const POFS_PREFIX$1 = 'prefix';
const POFS_PREPOSITION$1 = 'preposition';
const POFS_PRONOUN$1 = 'pronoun';
const POFS_SUFFIX$1 = 'suffix';
const POFS_SUPINE$1 = 'supine';
const POFS_VERB$1 = 'verb';
const POFS_VERB_PARTICIPLE$1 = 'verb participle';
// gender
const GEND_MASCULINE$1 = 'masculine';
const GEND_FEMININE$1 = 'feminine';
const GEND_NEUTER$1 = 'neuter';
const GEND_COMMON$1 = 'common';
const GEND_ANIMATE$1 = 'animate';
const GEND_INANIMATE$1 = 'inanimate';
// Polish gender types
const GEND_PERSONAL_MASCULINE$1 = 'personal masculine';
const GEND_ANIMATE_MASCULINE$1 = 'animate masculine';
const GEND_INANIMATE_MASCULINE$1 = 'inanimate masculine';
// comparative
const COMP_POSITIVE$1 = 'positive';
const COMP_COMPARITIVE$1 = 'comparative';
const COMP_SUPERLATIVE$1 = 'superlative';
// case
const CASE_ABESSIVE$1 = 'abessive';
const CASE_ABLATIVE$1 = 'ablative';
const CASE_ABSOLUTIVE$1 = 'absolutive';
const CASE_ACCUSATIVE$1 = 'accusative';
const CASE_ADDIRECTIVE$1 = 'addirective';
const CASE_ADELATIVE$1 = 'adelative';
const CASE_ADESSIVE$1 = 'adessive';
const CASE_ADVERBIAL$1 = 'adverbial';
const CASE_ALLATIVE$1 = 'allative';
const CASE_ANTESSIVE$1 = 'antessive';
const CASE_APUDESSIVE$1 = 'apudessive';
const CASE_AVERSIVE$1 = 'aversive';
const CASE_BENEFACTIVE$1 = 'benefactive';
const CASE_CARITIVE$1 = 'caritive';
const CASE_CAUSAL$1 = 'causal';
const CASE_CAUSAL_FINAL$1 = 'causal-final';
const CASE_COMITATIVE$1 = 'comitative';
const CASE_DATIVE$1 = 'dative';
const CASE_DELATIVE$1 = 'delative';
const CASE_DIRECT$1 = 'direct';
const CASE_DISTRIBUTIVE$1 = 'distributive';
const CASE_DISTRIBUTIVE_TEMPORAL$1 = 'distributive-temporal';
const CASE_ELATIVE$1 = 'elative';
const CASE_ERGATIVE$1 = 'ergative';
const CASE_ESSIVE$1 = 'essive';
const CASE_ESSIVE_FORMAL$1 = 'essive-formal';
const CASE_ESSIVE_MODAL$1 = 'essive-modal';
const CASE_EQUATIVE$1 = 'equative';
const CASE_EVITATIVE$1 = 'evitative';
const CASE_EXESSIVE$1 = 'exessive';
const CASE_FINAL$1 = 'final';
const CASE_FORMAL$1 = 'formal';
const CASE_GENITIVE$1 = 'genitive';
const CASE_ILLATIVE$1 = 'illative';
const CASE_INELATIVE$1 = 'inelative';
const CASE_INESSIVE$1 = 'inessive';
const CASE_INSTRUCTIVE$1 = 'instructive';
const CASE_INSTRUMENTAL$1 = 'instrumental';
const CASE_INSTRUMENTAL_COMITATIVE$1 = 'instrumental-comitative';
const CASE_INTRANSITIVE$1 = 'intransitive';
const CASE_LATIVE$1 = 'lative';
const CASE_LOCATIVE$1 = 'locative';
const CASE_MODAL$1 = 'modal';
const CASE_MULTIPLICATIVE$1 = 'multiplicative';
const CASE_NOMINATIVE$1 = 'nominative';
const CASE_PARTITIVE$1 = 'partitive';
const CASE_PEGATIVE$1 = 'pegative';
const CASE_PERLATIVE$1 = 'perlative';
const CASE_POSSESSIVE$1 = 'possessive';
const CASE_POSTELATIVE$1 = 'postelative';
const CASE_POSTDIRECTIVE$1 = 'postdirective';
const CASE_POSTESSIVE$1 = 'postessive';
const CASE_POSTPOSITIONAL$1 = 'postpositional';
const CASE_PREPOSITIONAL$1 = 'prepositional';
const CASE_PRIVATIVE$1 = 'privative';
const CASE_PROLATIVE$1 = 'prolative';
const CASE_PROSECUTIVE$1 = 'prosecutive';
const CASE_PROXIMATIVE$1 = 'proximative';
const CASE_SEPARATIVE$1 = 'separative';
const CASE_SOCIATIVE$1 = 'sociative';
const CASE_SUBDIRECTIVE$1 = 'subdirective';
const CASE_SUBESSIVE$1 = 'subessive';
const CASE_SUBELATIVE$1 = 'subelative';
const CASE_SUBLATIVE$1 = 'sublative';
const CASE_SUPERDIRECTIVE$1 = 'superdirective';
const CASE_SUPERESSIVE$1 = 'superessive';
const CASE_SUPERLATIVE$1 = 'superlative';
const CASE_SUPPRESSIVE$1 = 'suppressive';
const CASE_TEMPORAL$1 = 'temporal';
const CASE_TERMINATIVE$1 = 'terminative';
const CASE_TRANSLATIVE$1 = 'translative';
const CASE_VIALIS$1 = 'vialis';
const CASE_VOCATIVE$1 = 'vocative';
const MOOD_ADMIRATIVE$1 = 'admirative';
const MOOD_COHORTATIVE$1 = 'cohortative';
const MOOD_CONDITIONAL$1 = 'conditional';
const MOOD_DECLARATIVE$1 = 'declarative';
const MOOD_DUBITATIVE$1 = 'dubitative';
const MOOD_ENERGETIC$1 = 'energetic';
const MOOD_EVENTIVE$1 = 'eventive';
const MOOD_GENERIC$1 = 'generic';
const MOOD_GERUNDIVE$1 = 'gerundive';
const MOOD_HYPOTHETICAL$1 = 'hypothetical';
const MOOD_IMPERATIVE$1 = 'imperative';
const MOOD_INDICATIVE$1 = 'indicative';
const MOOD_INFERENTIAL$1 = 'inferential';
const MOOD_INFINITIVE$1 = 'infinitive';
const MOOD_INTERROGATIVE$1 = 'interrogative';
const MOOD_JUSSIVE$1 = 'jussive';
const MOOD_NEGATIVE$1 = 'negative';
const MOOD_OPTATIVE$1 = 'optative';
const MOOD_PARTICIPLE$1 = 'participle';
const MOOD_PRESUMPTIVE$1 = 'presumptive';
const MOOD_RENARRATIVE$1 = 'renarrative';
const MOOD_SUBJUNCTIVE$1 = 'subjunctive';
const MOOD_SUPINE$1 = 'supine';
const NUM_SINGULAR$1 = 'singular';
const NUM_PLURAL$1 = 'plural';
const NUM_DUAL$1 = 'dual';
const NUM_TRIAL$1 = 'trial';
const NUM_PAUCAL$1 = 'paucal';
const NUM_SINGULATIVE$1 = 'singulative';
const NUM_COLLECTIVE$1 = 'collective';
const NUM_DISTRIBUTIVE_PLURAL$1 = 'distributive plural';
const NRL_CARDINAL$1 = 'cardinal';
const NRL_ORDINAL$1 = 'ordinal';
const NRL_DISTRIBUTIVE$1 = 'distributive';
const NURL_NUMERAL_ADVERB$1 = 'numeral adverb';
const ORD_1ST$1 = '1st';
const ORD_2ND$1 = '2nd';
const ORD_3RD$1 = '3rd';
const ORD_4TH$1 = '4th';
const ORD_5TH$1 = '5th';
const ORD_6TH$1 = '6th';
const ORD_7TH$1 = '7th';
const ORD_8TH$1 = '8th';
const ORD_9TH$1 = '9th';
const TENSE_AORIST$1 = 'aorist';
const TENSE_FUTURE$1 = 'future';
const TENSE_FUTURE_PERFECT$1 = 'future perfect';
const TENSE_IMPERFECT$1 = 'imperfect';
const TENSE_PAST_ABSOLUTE$1 = 'past absolute';
const TENSE_PERFECT$1 = 'perfect';
const TENSE_PLUPERFECT$1 = 'pluperfect';
const TENSE_PRESENT$1 = 'present';
const VKIND_TO_BE$1 = 'to be';
const VKIND_COMPOUNDS_OF_TO_BE$1 = 'compounds of to be';
const VKIND_TAKING_ABLATIVE$1 = 'taking ablative';
const VKIND_TAKING_DATIVE$1 = 'taking dative';
const VKIND_TAKING_GENITIVE$1 = 'taking genitive';
const VKIND_TRANSITIVE$1 = 'transitive';
const VKIND_INTRANSITIVE$1 = 'intransitive';
const VKIND_IMPERSONAL$1 = 'impersonal';
const VKIND_DEPONENT$1 = 'deponent';
const VKIND_SEMIDEPONENT$1 = 'semideponent';
const VKIND_PERFECT_DEFINITE$1 = 'perfect definite';
const VOICE_ACTIVE$1 = 'active';
const VOICE_PASSIVE$1 = 'passive';
const VOICE_MEDIOPASSIVE$1 = 'mediopassive';
const VOICE_IMPERSONAL_PASSIVE$1 = 'impersonal passive';
const VOICE_MIDDLE$1 = 'middle';
const VOICE_ANTIPASSIVE$1 = 'antipassive';
const VOICE_REFLEXIVE$1 = 'reflexive';
const VOICE_RECIPROCAL$1 = 'reciprocal';
const VOICE_CAUSATIVE$1 = 'causative';
const VOICE_ADJUTATIVE$1 = 'adjutative';
const VOICE_APPLICATIVE$1 = 'applicative';
const VOICE_CIRCUMSTANTIAL$1 = 'circumstantial';
const VOICE_DEPONENT$1 = 'deponent';
const TYPE_IRREGULAR$1 = 'irregular';
const TYPE_REGULAR$1 = 'regular';
// Classes (of pronouns in Latin)
const CLASS_PERSONAL$1 = 'personal';
const CLASS_REFLEXIVE$1 = 'reflexive';
const CLASS_POSSESSIVE$1 = 'possessive';
const CLASS_DEMONSTRATIVE$1 = 'demonstrative';
const CLASS_RELATIVE$1 = 'relative';
const CLASS_INTERROGATIVE$1 = 'interrogative';
/* eslit-enable no-unused-vars */


var constants$1 = Object.freeze({
	LANG_UNIT_WORD: LANG_UNIT_WORD$1,
	LANG_UNIT_CHAR: LANG_UNIT_CHAR$1,
	LANG_DIR_LTR: LANG_DIR_LTR$1,
	LANG_DIR_RTL: LANG_DIR_RTL$1,
	LANG_LATIN: LANG_LATIN$1,
	LANG_GREEK: LANG_GREEK$1,
	LANG_ARABIC: LANG_ARABIC$1,
	LANG_PERSIAN: LANG_PERSIAN$1,
	STR_LANG_CODE_LAT: STR_LANG_CODE_LAT$1,
	STR_LANG_CODE_LA: STR_LANG_CODE_LA$1,
	STR_LANG_CODE_GRC: STR_LANG_CODE_GRC$1,
	STR_LANG_CODE_ARA: STR_LANG_CODE_ARA$1,
	STR_LANG_CODE_AR: STR_LANG_CODE_AR$1,
	STR_LANG_CODE_FAS: STR_LANG_CODE_FAS$1,
	STR_LANG_CODE_PER: STR_LANG_CODE_PER$1,
	STR_LANG_CODE_FA_IR: STR_LANG_CODE_FA_IR$1,
	STR_LANG_CODE_FA: STR_LANG_CODE_FA$1,
	POFS_ADJECTIVE: POFS_ADJECTIVE$1,
	POFS_ADVERB: POFS_ADVERB$1,
	POFS_ADVERBIAL: POFS_ADVERBIAL$1,
	POFS_ARTICLE: POFS_ARTICLE$1,
	POFS_CONJUNCTION: POFS_CONJUNCTION$1,
	POFS_EXCLAMATION: POFS_EXCLAMATION$1,
	POFS_INTERJECTION: POFS_INTERJECTION$1,
	POFS_NOUN: POFS_NOUN$1,
	POFS_NUMERAL: POFS_NUMERAL$1,
	POFS_PARTICLE: POFS_PARTICLE$1,
	POFS_PREFIX: POFS_PREFIX$1,
	POFS_PREPOSITION: POFS_PREPOSITION$1,
	POFS_PRONOUN: POFS_PRONOUN$1,
	POFS_SUFFIX: POFS_SUFFIX$1,
	POFS_SUPINE: POFS_SUPINE$1,
	POFS_VERB: POFS_VERB$1,
	POFS_VERB_PARTICIPLE: POFS_VERB_PARTICIPLE$1,
	GEND_MASCULINE: GEND_MASCULINE$1,
	GEND_FEMININE: GEND_FEMININE$1,
	GEND_NEUTER: GEND_NEUTER$1,
	GEND_COMMON: GEND_COMMON$1,
	GEND_ANIMATE: GEND_ANIMATE$1,
	GEND_INANIMATE: GEND_INANIMATE$1,
	GEND_PERSONAL_MASCULINE: GEND_PERSONAL_MASCULINE$1,
	GEND_ANIMATE_MASCULINE: GEND_ANIMATE_MASCULINE$1,
	GEND_INANIMATE_MASCULINE: GEND_INANIMATE_MASCULINE$1,
	COMP_POSITIVE: COMP_POSITIVE$1,
	COMP_COMPARITIVE: COMP_COMPARITIVE$1,
	COMP_SUPERLATIVE: COMP_SUPERLATIVE$1,
	CASE_ABESSIVE: CASE_ABESSIVE$1,
	CASE_ABLATIVE: CASE_ABLATIVE$1,
	CASE_ABSOLUTIVE: CASE_ABSOLUTIVE$1,
	CASE_ACCUSATIVE: CASE_ACCUSATIVE$1,
	CASE_ADDIRECTIVE: CASE_ADDIRECTIVE$1,
	CASE_ADELATIVE: CASE_ADELATIVE$1,
	CASE_ADESSIVE: CASE_ADESSIVE$1,
	CASE_ADVERBIAL: CASE_ADVERBIAL$1,
	CASE_ALLATIVE: CASE_ALLATIVE$1,
	CASE_ANTESSIVE: CASE_ANTESSIVE$1,
	CASE_APUDESSIVE: CASE_APUDESSIVE$1,
	CASE_AVERSIVE: CASE_AVERSIVE$1,
	CASE_BENEFACTIVE: CASE_BENEFACTIVE$1,
	CASE_CARITIVE: CASE_CARITIVE$1,
	CASE_CAUSAL: CASE_CAUSAL$1,
	CASE_CAUSAL_FINAL: CASE_CAUSAL_FINAL$1,
	CASE_COMITATIVE: CASE_COMITATIVE$1,
	CASE_DATIVE: CASE_DATIVE$1,
	CASE_DELATIVE: CASE_DELATIVE$1,
	CASE_DIRECT: CASE_DIRECT$1,
	CASE_DISTRIBUTIVE: CASE_DISTRIBUTIVE$1,
	CASE_DISTRIBUTIVE_TEMPORAL: CASE_DISTRIBUTIVE_TEMPORAL$1,
	CASE_ELATIVE: CASE_ELATIVE$1,
	CASE_ERGATIVE: CASE_ERGATIVE$1,
	CASE_ESSIVE: CASE_ESSIVE$1,
	CASE_ESSIVE_FORMAL: CASE_ESSIVE_FORMAL$1,
	CASE_ESSIVE_MODAL: CASE_ESSIVE_MODAL$1,
	CASE_EQUATIVE: CASE_EQUATIVE$1,
	CASE_EVITATIVE: CASE_EVITATIVE$1,
	CASE_EXESSIVE: CASE_EXESSIVE$1,
	CASE_FINAL: CASE_FINAL$1,
	CASE_FORMAL: CASE_FORMAL$1,
	CASE_GENITIVE: CASE_GENITIVE$1,
	CASE_ILLATIVE: CASE_ILLATIVE$1,
	CASE_INELATIVE: CASE_INELATIVE$1,
	CASE_INESSIVE: CASE_INESSIVE$1,
	CASE_INSTRUCTIVE: CASE_INSTRUCTIVE$1,
	CASE_INSTRUMENTAL: CASE_INSTRUMENTAL$1,
	CASE_INSTRUMENTAL_COMITATIVE: CASE_INSTRUMENTAL_COMITATIVE$1,
	CASE_INTRANSITIVE: CASE_INTRANSITIVE$1,
	CASE_LATIVE: CASE_LATIVE$1,
	CASE_LOCATIVE: CASE_LOCATIVE$1,
	CASE_MODAL: CASE_MODAL$1,
	CASE_MULTIPLICATIVE: CASE_MULTIPLICATIVE$1,
	CASE_NOMINATIVE: CASE_NOMINATIVE$1,
	CASE_PARTITIVE: CASE_PARTITIVE$1,
	CASE_PEGATIVE: CASE_PEGATIVE$1,
	CASE_PERLATIVE: CASE_PERLATIVE$1,
	CASE_POSSESSIVE: CASE_POSSESSIVE$1,
	CASE_POSTELATIVE: CASE_POSTELATIVE$1,
	CASE_POSTDIRECTIVE: CASE_POSTDIRECTIVE$1,
	CASE_POSTESSIVE: CASE_POSTESSIVE$1,
	CASE_POSTPOSITIONAL: CASE_POSTPOSITIONAL$1,
	CASE_PREPOSITIONAL: CASE_PREPOSITIONAL$1,
	CASE_PRIVATIVE: CASE_PRIVATIVE$1,
	CASE_PROLATIVE: CASE_PROLATIVE$1,
	CASE_PROSECUTIVE: CASE_PROSECUTIVE$1,
	CASE_PROXIMATIVE: CASE_PROXIMATIVE$1,
	CASE_SEPARATIVE: CASE_SEPARATIVE$1,
	CASE_SOCIATIVE: CASE_SOCIATIVE$1,
	CASE_SUBDIRECTIVE: CASE_SUBDIRECTIVE$1,
	CASE_SUBESSIVE: CASE_SUBESSIVE$1,
	CASE_SUBELATIVE: CASE_SUBELATIVE$1,
	CASE_SUBLATIVE: CASE_SUBLATIVE$1,
	CASE_SUPERDIRECTIVE: CASE_SUPERDIRECTIVE$1,
	CASE_SUPERESSIVE: CASE_SUPERESSIVE$1,
	CASE_SUPERLATIVE: CASE_SUPERLATIVE$1,
	CASE_SUPPRESSIVE: CASE_SUPPRESSIVE$1,
	CASE_TEMPORAL: CASE_TEMPORAL$1,
	CASE_TERMINATIVE: CASE_TERMINATIVE$1,
	CASE_TRANSLATIVE: CASE_TRANSLATIVE$1,
	CASE_VIALIS: CASE_VIALIS$1,
	CASE_VOCATIVE: CASE_VOCATIVE$1,
	MOOD_ADMIRATIVE: MOOD_ADMIRATIVE$1,
	MOOD_COHORTATIVE: MOOD_COHORTATIVE$1,
	MOOD_CONDITIONAL: MOOD_CONDITIONAL$1,
	MOOD_DECLARATIVE: MOOD_DECLARATIVE$1,
	MOOD_DUBITATIVE: MOOD_DUBITATIVE$1,
	MOOD_ENERGETIC: MOOD_ENERGETIC$1,
	MOOD_EVENTIVE: MOOD_EVENTIVE$1,
	MOOD_GENERIC: MOOD_GENERIC$1,
	MOOD_GERUNDIVE: MOOD_GERUNDIVE$1,
	MOOD_HYPOTHETICAL: MOOD_HYPOTHETICAL$1,
	MOOD_IMPERATIVE: MOOD_IMPERATIVE$1,
	MOOD_INDICATIVE: MOOD_INDICATIVE$1,
	MOOD_INFERENTIAL: MOOD_INFERENTIAL$1,
	MOOD_INFINITIVE: MOOD_INFINITIVE$1,
	MOOD_INTERROGATIVE: MOOD_INTERROGATIVE$1,
	MOOD_JUSSIVE: MOOD_JUSSIVE$1,
	MOOD_NEGATIVE: MOOD_NEGATIVE$1,
	MOOD_OPTATIVE: MOOD_OPTATIVE$1,
	MOOD_PARTICIPLE: MOOD_PARTICIPLE$1,
	MOOD_PRESUMPTIVE: MOOD_PRESUMPTIVE$1,
	MOOD_RENARRATIVE: MOOD_RENARRATIVE$1,
	MOOD_SUBJUNCTIVE: MOOD_SUBJUNCTIVE$1,
	MOOD_SUPINE: MOOD_SUPINE$1,
	NUM_SINGULAR: NUM_SINGULAR$1,
	NUM_PLURAL: NUM_PLURAL$1,
	NUM_DUAL: NUM_DUAL$1,
	NUM_TRIAL: NUM_TRIAL$1,
	NUM_PAUCAL: NUM_PAUCAL$1,
	NUM_SINGULATIVE: NUM_SINGULATIVE$1,
	NUM_COLLECTIVE: NUM_COLLECTIVE$1,
	NUM_DISTRIBUTIVE_PLURAL: NUM_DISTRIBUTIVE_PLURAL$1,
	NRL_CARDINAL: NRL_CARDINAL$1,
	NRL_ORDINAL: NRL_ORDINAL$1,
	NRL_DISTRIBUTIVE: NRL_DISTRIBUTIVE$1,
	NURL_NUMERAL_ADVERB: NURL_NUMERAL_ADVERB$1,
	ORD_1ST: ORD_1ST$1,
	ORD_2ND: ORD_2ND$1,
	ORD_3RD: ORD_3RD$1,
	ORD_4TH: ORD_4TH$1,
	ORD_5TH: ORD_5TH$1,
	ORD_6TH: ORD_6TH$1,
	ORD_7TH: ORD_7TH$1,
	ORD_8TH: ORD_8TH$1,
	ORD_9TH: ORD_9TH$1,
	TENSE_AORIST: TENSE_AORIST$1,
	TENSE_FUTURE: TENSE_FUTURE$1,
	TENSE_FUTURE_PERFECT: TENSE_FUTURE_PERFECT$1,
	TENSE_IMPERFECT: TENSE_IMPERFECT$1,
	TENSE_PAST_ABSOLUTE: TENSE_PAST_ABSOLUTE$1,
	TENSE_PERFECT: TENSE_PERFECT$1,
	TENSE_PLUPERFECT: TENSE_PLUPERFECT$1,
	TENSE_PRESENT: TENSE_PRESENT$1,
	VKIND_TO_BE: VKIND_TO_BE$1,
	VKIND_COMPOUNDS_OF_TO_BE: VKIND_COMPOUNDS_OF_TO_BE$1,
	VKIND_TAKING_ABLATIVE: VKIND_TAKING_ABLATIVE$1,
	VKIND_TAKING_DATIVE: VKIND_TAKING_DATIVE$1,
	VKIND_TAKING_GENITIVE: VKIND_TAKING_GENITIVE$1,
	VKIND_TRANSITIVE: VKIND_TRANSITIVE$1,
	VKIND_INTRANSITIVE: VKIND_INTRANSITIVE$1,
	VKIND_IMPERSONAL: VKIND_IMPERSONAL$1,
	VKIND_DEPONENT: VKIND_DEPONENT$1,
	VKIND_SEMIDEPONENT: VKIND_SEMIDEPONENT$1,
	VKIND_PERFECT_DEFINITE: VKIND_PERFECT_DEFINITE$1,
	VOICE_ACTIVE: VOICE_ACTIVE$1,
	VOICE_PASSIVE: VOICE_PASSIVE$1,
	VOICE_MEDIOPASSIVE: VOICE_MEDIOPASSIVE$1,
	VOICE_IMPERSONAL_PASSIVE: VOICE_IMPERSONAL_PASSIVE$1,
	VOICE_MIDDLE: VOICE_MIDDLE$1,
	VOICE_ANTIPASSIVE: VOICE_ANTIPASSIVE$1,
	VOICE_REFLEXIVE: VOICE_REFLEXIVE$1,
	VOICE_RECIPROCAL: VOICE_RECIPROCAL$1,
	VOICE_CAUSATIVE: VOICE_CAUSATIVE$1,
	VOICE_ADJUTATIVE: VOICE_ADJUTATIVE$1,
	VOICE_APPLICATIVE: VOICE_APPLICATIVE$1,
	VOICE_CIRCUMSTANTIAL: VOICE_CIRCUMSTANTIAL$1,
	VOICE_DEPONENT: VOICE_DEPONENT$1,
	TYPE_IRREGULAR: TYPE_IRREGULAR$1,
	TYPE_REGULAR: TYPE_REGULAR$1,
	CLASS_PERSONAL: CLASS_PERSONAL$1,
	CLASS_REFLEXIVE: CLASS_REFLEXIVE$1,
	CLASS_POSSESSIVE: CLASS_POSSESSIVE$1,
	CLASS_DEMONSTRATIVE: CLASS_DEMONSTRATIVE$1,
	CLASS_RELATIVE: CLASS_RELATIVE$1,
	CLASS_INTERROGATIVE: CLASS_INTERROGATIVE$1
});

/**
 * Define declension group titles
 * @param {String} featureValue - A value of a declension
 * @return {string} - A title of a declension group, in HTML format
 */
let getDeclensionTitle = function getDeclensionTitle (featureValue) {
  if (featureValue === constants$1.ORD_1ST) { return `First` }
  if (featureValue === constants$1.ORD_2ND) { return `Second` }
  if (featureValue === constants$1.ORD_3RD) { return `Third` }
  if (featureValue === constants$1.ORD_4TH) { return `Fourth` }
  if (featureValue === constants$1.ORD_5TH) { return `Fifth` }

  if (this.hasOwnProperty(featureValue)) {
    if (Array.isArray(this[featureValue])) {
      return this[featureValue].map((feature) => feature.value).join('/')
    } else {
      return this[featureValue].value
    }
  } else {
    return 'not available'
  }
};

class LatinView extends View {
  constructor () {
    super();
    this.languageID = constants.LANG_LATIN;
    this.languageModel = new LatinLanguageModel(); // TODO: Do we really need to create it every time?
    this.language_features = this.languageModel.features;
    // limit regular verb moods
    this.language_features[Feature.types.mood] =
      new FeatureType(Feature.types.mood,
        [ constants.MOOD_INDICATIVE,
          constants.MOOD_SUBJUNCTIVE
        ], this.languageModel.toCode());

        /*
        Default grammatical features of a view. It child views need to have different feature values, redefine
        those values in child objects.
         */
    this.features = {
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      cases: new GroupFeatureType(this.language_features[Feature.types.grmCase], 'Case'),
      declensions: new GroupFeatureType(this.language_features[Feature.types.declension], 'Declension'),
      genders: new GroupFeatureType(this.language_features[Feature.types.gender], 'Gender'),
      types: new GroupFeatureType(this.language_features[Feature.types.type], 'Type')
    };
    this.features.declensions.getTitle = getDeclensionTitle;
  }

    /*
    Creates and initializes an inflection table. Redefine this method in child objects in order to create
    an inflection table differently
     */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases]);
    let features = this.table.features;
    features.columns = [this.language_features[Feature.types.declension], this.language_features[Feature.types.gender], this.language_features[Feature.types.type]];
    features.rows = [this.language_features[Feature.types.number], this.language_features[Feature.types.grmCase]];
    features.columnRowTitles = [this.language_features[Feature.types.grmCase]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.number]];
  }
}

class NounView extends LatinView {
  constructor () {
    super();
    this.id = 'nounDeclension';
    this.name = 'noun declension';
    this.title = 'Noun declension';
    this.partOfSpeech = this.language_features[Feature.types.part][constants.POFS_NOUN].value;

        // Models.Feature that are different from base class values
    this.features.genders = new GroupFeatureType(this.language_features[Feature.types.gender], 'Gender',
      [ this.language_features[Feature.types.gender][constants.GEND_MASCULINE],
        this.language_features[Feature.types.gender][constants.GEND_FEMININE],
        this.language_features[Feature.types.gender][constants.GEND_NEUTER]
      ]);
    this.createTable();
  }
}

class AdjectiveView extends LatinView {
  constructor () {
    super();
    this.id = 'adjectiveDeclension';
    this.name = 'adjective declension';
    this.title = 'Adjective declension';
    this.partOfSpeech = this.language_features[Feature.types.part].adjective.value;

        // Models.Feature that are different from base class values
    this.features.declensions = new GroupFeatureType(this.language_features[Feature.types.declension], 'Declension',
      [ this.language_features[Feature.types.declension][constants.ORD_1ST],
        this.language_features[Feature.types.declension][constants.ORD_2ND],
        this.language_features[Feature.types.declension][constants.ORD_3RD]
      ]);
    this.features.declensions.getTitle = getDeclensionTitle;

    this.createTable();
  }
}

class VerbParticipleView extends LatinView {
  constructor () {
    super();
    this.partOfSpeech = this.language_features[Feature.types.part][constants.POFS_VERB_PARTICIPLE].value;
    this.id = 'verbParticiple';
    this.name = 'participle';
    this.title = 'Participle';
    this.language_features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [constants.TENSE_PRESENT, constants.TENSE_PERFECT, constants.TENSE_FUTURE], this.languageModel.toCode());
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    };
    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]];
    features.rows = [this.language_features[Feature.types.tense]];
    features.columnRowTitles = [this.language_features[Feature.types.tense]];
    features.fullWidthRowTitles = [];
  }
}

class SupineView extends LatinView {
  constructor () {
    super();
    this.partOfSpeech = this.language_features[Feature.types.part][constants.POFS_SUPINE].value;
    this.id = 'verbSupine';
    this.name = 'supine';
    this.title = 'Supine';
    this.features.moods = new GroupFeatureType(
      new FeatureType(Feature.types.mood, [constants.MOOD_SUPINE], this.languageModel.toCode()),
      'Mood');
    this.language_features[Feature.types.grmCase] = new FeatureType(Feature.types.grmCase,
      [constants.CASE_ACCUSATIVE, constants.CASE_ABLATIVE], this.languageModel.toCode());
    this.features = {
      cases: new GroupFeatureType(this.language_features[Feature.types.grmCase], 'Case'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    };
    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.cases]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]];
    features.rows = [this.language_features[Feature.types.grmCase]];
    features.columnRowTitles = [this.language_features[Feature.types.grmCase]];
    features.fullWidthRowTitles = [];
  }
}

class VerbView extends LatinView {
  constructor () {
    super();
    this.partOfSpeech = this.language_features[Feature.types.part][constants.POFS_VERB].value;

    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Feature.types.person], 'Person'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem'),
      moods: new GroupFeatureType(this.language_features[Feature.types.mood], 'Mood')
    };

    /**
     * Define conjugation group titles
     * @param {String} featureValue - A value of a conjugation feature
     * @return {string} - A title of a conjugation group, in HTML format
     */
    this.features.conjugations.getTitle = function getTitle (featureValue) {
      if (featureValue === constants$1.ORD_1ST) { return `First<br><span class="infl-cell__conj-stem">ā</span>` }
      if (featureValue === constants$1.ORD_2ND) { return `Second<br><span class="infl-cell__conj-stem">ē</span>` }
      if (featureValue === constants$1.ORD_3RD) { return `Third<br><span class="infl-cell__conj-stem">e</span>` }
      if (featureValue === constants$1.ORD_4TH) { return `Fourth<br><span class="infl-cell__conj-stem">i</span>` }

      if (this.hasOwnProperty(featureValue)) {
        if (Array.isArray(this[featureValue])) {
          return this[featureValue].map((feature) => feature.value).join('/')
        } else {
          return this[featureValue].value
        }
      } else {
        return 'not available'
      }
    };
  }
}

class VerbMoodView extends VerbView {
  constructor () {
    super();
    this.features = {
      tenses: new GroupFeatureType(this.language_features[Feature.types.tense], 'Tenses'),
      numbers: new GroupFeatureType(this.language_features[Feature.types.number], 'Number'),
      persons: new GroupFeatureType(this.language_features[Feature.types.person], 'Person'),
      voices: new GroupFeatureType(this.language_features[Feature.types.voice], 'Voice'),
      conjugations: new GroupFeatureType(this.language_features[Feature.types.conjugation], 'Conjugation Stem')
    };
  }
}

class VoiceConjugationMoodView extends VerbView {
  constructor () {
    super();
    this.id = 'verbVoiceConjugationMood';
    this.name = 'voice-conjugation-mood';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations, this.features.moods,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation],
      this.language_features[Feature.types.mood]];
    features.rows = [
      this.language_features[Feature.types.tense],
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.columnRowTitles = [
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class VoiceMoodConjugationView extends VerbView {
  constructor () {
    super();
    this.id = 'verbVoiceMoodConjugation';
    this.name = 'voice-mood-conjugation';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.moods, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.mood],
      this.language_features[Feature.types.conjugation]];
    features.rows = [
      this.language_features[Feature.types.tense],
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.columnRowTitles = [
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class ConjugationVoiceMoodView extends VerbView {
  constructor () {
    super();
    this.id = 'verbConjugationVoiceMood';
    this.name = 'conjugation-voice-mood';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.conjugations, this.features.voices, this.features.moods,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.conjugation],
      this.language_features[Feature.types.voice], this.language_features[Feature.types.mood]];
    features.rows = [
      this.language_features[Feature.types.tense],
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.columnRowTitles = [
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class ConjugationMoodVoiceView extends VerbView {
  constructor () {
    super();
    this.id = 'verbConjugationMoodVoice';
    this.name = 'conjugation-mood-voice';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.conjugations, this.features.moods, this.features.voices,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.conjugation],
      this.language_features[Feature.types.mood],
      this.language_features[Feature.types.voice]];
    features.rows = [
      this.language_features[Feature.types.tense],
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.columnRowTitles = [
      this.language_features[Feature.types.number],
      this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class MoodVoiceConjugationView extends VerbView {
  constructor () {
    super();
    this.id = 'verbMoodVoiceConjugation';
    this.name = 'mood-voice-conjugation';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [this.language_features[Feature.types.mood], this.language_features[Feature.types.voice], this.language_features[Feature.types.conjugation]];
    features.rows = [this.language_features[Feature.types.tense], this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.columnRowTitles = [this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class MoodConjugationVoiceView extends VerbView {
  constructor () {
    super();
    this.id = 'verbMoodConjugationVoice';
    this.name = 'mood-conjugation-voice';
    this.title = 'Verb Conjugation';

    this.createTable();
  }

  createTable () {
    this.table = new Table([this.features.moods, this.features.conjugations, this.features.voices,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [this.language_features[Feature.types.mood], this.language_features[Feature.types.conjugation], this.language_features[Feature.types.voice]];
    features.rows = [this.language_features[Feature.types.tense], this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.columnRowTitles = [this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }
}

class ImperativeView extends VerbMoodView {
  constructor () {
    super();
    this.id = 'verbImperative';
    this.name = 'imperative';
    this.title = 'Imperative';
    this.features.moods = new GroupFeatureType(
      new FeatureType(Feature.types.mood, [constants.MOOD_IMPERATIVE], this.languageModel.toCode()),
      'Mood');
    this.language_features[Feature.types.person] = new FeatureType(Feature.types.person, [constants.ORD_2ND, constants.ORD_3RD], this.languageModel.toCode());
    this.features.persons = new GroupFeatureType(this.language_features[Feature.types.person], 'Person');
    this.language_features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [constants.TENSE_PRESENT, constants.TENSE_FUTURE], this.languageModel.toCode());
    this.features.tenses = new GroupFeatureType(this.language_features[Feature.types.tense], 'Tense');
    this.createTable();
    this.table.suffixCellFilter = ImperativeView.suffixCellFilter;
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses, this.features.numbers, this.features.persons]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]];
    features.rows = [this.language_features[Feature.types.tense], this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.columnRowTitles = [this.language_features[Feature.types.number], this.language_features[Feature.types.person]];
    features.fullWidthRowTitles = [this.language_features[Feature.types.tense]];
  }

  enabledForLexemes (lexemes) {
      // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Feature.types.mood] &&
          inflection[Feature.types.mood].filter((f) => f.value.includes(constants.MOOD_IMPERATIVE)).length > 0) {
          return true
        }
      }
    }
    return false
  }

  static suffixCellFilter (suffix) {
    return suffix.features[Feature.types.mood].includes(constants.MOOD_IMPERATIVE)
  }
}

class InfinitiveView extends VerbMoodView {
  constructor () {
    super();
    this.id = 'verbInfinitive';
    this.name = 'infinitive';
    this.title = 'Infinitive';
    this.features.moods = new GroupFeatureType(
      new FeatureType(Feature.types.mood, [constants.MOOD_INFINITIVE], this.languageModel.toCode()),
      'Mood');
    this.language_features[Feature.types.tense] = new FeatureType(Feature.types.tense,
      [constants.TENSE_PRESENT, constants.TENSE_PERFECT, constants.TENSE_FUTURE], this.languageModel.toCode());
    this.features.tenses = new GroupFeatureType(this.language_features[Feature.types.tense], 'Tense');
    this.createTable();
    this.table.suffixCellFilter = InfinitiveView.suffixCellFilter;
  }

  createTable () {
    this.table = new Table([this.features.voices, this.features.conjugations,
      this.features.tenses]);
    let features = this.table.features;
    features.columns = [
      this.language_features[Feature.types.voice],
      this.language_features[Feature.types.conjugation]];
    features.rows = [this.language_features[Feature.types.tense]];
    features.columnRowTitles = [this.language_features[Feature.types.tense]];
    features.fullWidthRowTitles = [];
  }

  enabledForLexemes (lexemes) {
      // default is true
    for (let lexeme of lexemes) {
      for (let inflection of lexeme.inflections) {
        if (inflection[Feature.types.mood] &&
          inflection[Feature.types.mood].filter((f) => f.value.includes(constants.MOOD_INFINITIVE)).length > 0) {
          return true
        }
      }
    }
    return false
  }

  static suffixCellFilter (suffix) {
    return suffix.features[Feature.types.mood].includes(constants.MOOD_INFINITIVE)
  }
}

var LatinViews = [new NounView(), new AdjectiveView(),
    // Verbs
  new VoiceConjugationMoodView(), new VoiceMoodConjugationView(), new ConjugationVoiceMoodView(),
  new ConjugationMoodVoiceView(), new MoodVoiceConjugationView(), new MoodConjugationVoiceView(),
  new ImperativeView(), new SupineView(), new VerbParticipleView(), new InfinitiveView()];

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

class GreekView extends View {
  constructor () {
    super();
    this.language = languages.greek;

    /*
    Default grammatical features of a View. It child views need to have different feature values, redefine
    those values in child objects.
     */
    this.features = {
      numbers: new GroupFeatureType(numbers, 'Number'),
      cases: new GroupFeatureType(cases, 'Case'),
      declensions: new GroupFeatureType(declensions, 'Declension'),
      genders: new GroupFeatureType(genders, 'Gender'),
      types: new GroupFeatureType(types$1, 'Type')
    };
  }

  /**
   * Creates and initializes an inflection table. Redefine this method in child objects in order to create
   * an inflection table differently.
   */
  createTable () {
    this.table = new Table([this.features.declensions, this.features.genders,
      this.features.types, this.features.numbers, this.features.cases]);
    let features = this.table.features;
    features.columns = [declensions, genders, types$1];
    features.rows = [numbers, cases];
    features.columnRowTitles = [cases];
    features.fullWidthRowTitles = [numbers];
  }
}

class NounView$1 extends GreekView {
  constructor () {
    super();
    this.id = 'nounDeclension';
    this.name = 'noun declension';
    this.title = 'Noun declension';
    this.partOfSpeech = parts.noun.value;

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === declensions.second.value ||
          ancestorFeatures[0].value === declensions.third.value) {
          return [[genders.masculine.value, genders.feminine.value], genders.neuter.value]
        }
      }
      return [genders.masculine.value, genders.feminine.value, genders.neuter.value]
    };

    this.createTable();
  }
}

class NounViewSimplified extends NounView$1 {
  constructor () {
    super();
    this.id = 'nounDeclensionSimplified';
    this.name = 'noun declension simplified';
    this.title = 'Noun declension (simplified)';
    this.partOfSpeech = parts.noun.value;

    this.features.genders.getOrderedValues = function getOrderedValues (ancestorFeatures) {
      if (ancestorFeatures) {
        if (ancestorFeatures[0].value === declensions.second.value) {
          return [[genders.masculine.value, genders.feminine.value], genders.neuter.value]
        }
        if (ancestorFeatures[0].value === declensions.third.value) {
          return [[genders.masculine.value, genders.feminine.value, genders.neuter.value]]
        }
      }
      return [genders.masculine.value, genders.feminine.value, genders.neuter.value]
    };

    this.createTable();

    this.table.suffixCellFilter = NounViewSimplified.suffixCellFilter;
  }

  static suffixCellFilter (suffix) {
    return suffix.extendedLangData[languages.greek].primary
  }
}

var GreekViews = [new NounView$1(), new NounViewSimplified()];

class ViewSet {
  constructor (inflectionData = undefined) {
    this.views = new Map();
    this.views.set(constants.LANG_LATIN, LatinViews);
    this.views.set(constants.LANG_GREEK, GreekViews);
    this.inflectionData = inflectionData;
    this.matchingViews = [];

    if (this.views.has(inflectionData.languageID)) {
      this.matchingViews = this.views.get(inflectionData.languageID)
        .filter(view =>
          inflectionData[Feature.types.part].includes(view.partOfSpeech) &&
          view.enabledForLexemes(inflectionData.homonym.lexemes));
    }

    this.partsOfSpeech = [];
    this.partOfSpeechViews = {};
    for (const view of this.matchingViews) {
      if (!this.partsOfSpeech.includes(view.partOfSpeech)) {
        this.partsOfSpeech.push(view.partOfSpeech);
        this.partOfSpeechViews[view.partOfSpeech] = [];
      }
      this.partOfSpeechViews[view.partOfSpeech].push(view);
    }
  }

  getViews (partOfSpeech = undefined) {
    if (this.partsOfSpeech.includes(partOfSpeech)) {
      return this.partOfSpeechViews[partOfSpeech]
    } else {
      return []
    }
  }
}

export { InflectionData, LanguageDataList, dataSet as LatinDataSet, dataSet$1 as GreekDataSet, L10n, messages as L10nMessages, LatinViews, GreekViews, ViewSet };
//# sourceMappingURL=inflection-tables.standalone.js.map
