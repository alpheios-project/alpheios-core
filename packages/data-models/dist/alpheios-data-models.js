/* eslint-disable no-unused-vars */
const LANG_UNIT_WORD = Symbol('word');
const LANG_UNIT_CHAR = Symbol('char');
const LANG_DIR_LTR = Symbol('ltr');
const LANG_DIR_RTL = Symbol('rtl');
const LANG_UNDEFINED = Symbol('undefined');
const LANG_LATIN = Symbol('latin');
const LANG_GREEK = Symbol('greek');
const LANG_ARABIC = Symbol('arabic');
const LANG_PERSIAN = Symbol('persian');
const STR_LANG_CODE_UNDEFINED = 'undefined';
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
// Classes
const CLASS_PERSONAL = 'personal';
const CLASS_REFLEXIVE = 'reflexive';
const CLASS_POSSESSIVE = 'possessive';
const CLASS_DEMONSTRATIVE = 'demonstrative';
const CLASS_RELATIVE = 'relative';
const CLASS_INTERROGATIVE = 'interrogative';
const CLASS_GENERAL_RELATIVE = 'general relative';
const CLASS_INDEFINITE = 'indefinite';
const CLASS_INTENSIVE = 'intensive';
const CLASS_RECIPROCAL = 'reciprocal';
/* eslit-enable no-unused-vars */


var constants = Object.freeze({
	LANG_UNIT_WORD: LANG_UNIT_WORD,
	LANG_UNIT_CHAR: LANG_UNIT_CHAR,
	LANG_DIR_LTR: LANG_DIR_LTR,
	LANG_DIR_RTL: LANG_DIR_RTL,
	LANG_UNDEFINED: LANG_UNDEFINED,
	LANG_LATIN: LANG_LATIN,
	LANG_GREEK: LANG_GREEK,
	LANG_ARABIC: LANG_ARABIC,
	LANG_PERSIAN: LANG_PERSIAN,
	STR_LANG_CODE_UNDEFINED: STR_LANG_CODE_UNDEFINED,
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
	CLASS_INTERROGATIVE: CLASS_INTERROGATIVE,
	CLASS_GENERAL_RELATIVE: CLASS_GENERAL_RELATIVE,
	CLASS_INDEFINITE: CLASS_INDEFINITE,
	CLASS_INTENSIVE: CLASS_INTENSIVE,
	CLASS_RECIPROCAL: CLASS_RECIPROCAL
});

class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text;
    this.language = language;
    this.format = format;
    this.lemmaText = lemmaText;
  }

  static readObject (jsonObject) {
    return new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)
  }
}

class DefinitionSet {
  constructor (lemmaWord, languageID) {
    this.lemmaWord = lemmaWord;
    this.languageID = languageID;

    this.shortDefs = [];
    this.fullDefs = [];
  }

  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   * @param {Object} jsonObject - A JSON object representing DefinitionSet data.
   * @return {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject (jsonObject) {
    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, jsonObject.languageID);

    for (let shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(Definition.readObject(shortDef));
    }
    for (let fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(Definition.readObject(fullDef));
    }

    return definitionSet
  }

  /**
   * Check to see if the DefinitionSet is empty
   * @return {boolean} true if empty false if there is at least one definition
   */
  isEmpty () {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0
  }

  /**
   * Appends one or more definitions to a list of short definitions.
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @return {Definition[]} A list of short definitions this object has.
   */
  appendShortDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions]; }
      this.shortDefs = this.shortDefs.concat(definitions);
    }
    return this.shortDefs
  }

  /**
   * Appends one or more definitions to a list of full definitions.
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @return {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions]; }
      this.fullDefs = this.fullDefs.concat(definitions);
    }
    return this.fullDefs
  }
}

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
  constructor () {
    // This is just to avoid JavaScript Standard error on `context_backward` getter name. Don't need a constructor otherwise
    // TODO: `contextBackward` shall be used instead of `context_backward` wherever it is used
    this.context_backward = LanguageModel.contextBackward;
  }

  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return LANG_DIR_LTR }
  static get baseUnit () { return LANG_UNIT_WORD }

  /**
   * @deprecated
   */
  get contextForward () {
    console.warn(`Please use static "contextForward" instead`);
    return this.constructor.contextForward
  }

  /**
   * @deprecated
   */
  get contextBackward () {
    console.warn(`Please use static "contextBackward" instead`);
    return this.constructor.contextBackward
  }

  /**
   * @deprecated
   */
  get direction () {
    console.warn(`Please use static "direction" instead`);
    return this.constructor.direction
  }

  /**
   * @deprecated
   */
  get baseUnit () {
    console.warn(`Please use static "baseUnit" instead`);
    return this.constructor.baseUnit
  }

  /**
   * @deprecated
   */
  get features () {
    console.warn(`Please use individual "getFeatureType" or static "features" instead`);
    return this.constructor.features
  }

  static get featureNames () {
    return this.featureValues.keys()
  }

  static get features () {
    let features = {};
    for (const featureName of this.featureNames) {
      features[featureName] = this.getFeatureType(featureName);
    }
    return features
  }

  static get languageID () {
    return LANG_UNDEFINED
  }

  static get languageCode () {
    return STR_LANG_CODE_UNDEFINED
  }

  /**
   * Returns an array of language codes that represents the language.
   * @return {String[]} An array of language codes that matches the language.
   */
  static get languageCodes () {
    return []
  }

  static get codes () {
    console.warn(`Use static "languageCodes" instead`);
    return this.languageCodes
  }

  /**
   * @deprecated
   * @return {String[]}
   */
  get codes () {
    console.warn(`Please use a static version of "codes" instead`);
    return this.constructor.languageCodes
  }

  /**
   * @deprecated
   * @return {string}
   */
  toCode () {
    console.warn(`Please use a static "languageCode" instead`);
    return this.constructor.languageCode
  }

  /**
   * @deprecated
   * @return {string}
   */
  static toCode () {
    console.warn(`Please use a static "languageCode" instead`);
    return this.languageCode
  }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      [
        Feature.types.part,
        [
          POFS_ADVERB,
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
          POFS_VERB_PARTICIPLE
        ]
      ],
      [
        Feature.types.gender,
        [
          GEND_MASCULINE,
          GEND_FEMININE,
          GEND_NEUTER
        ]
      ],
      [
        Feature.types.type,
        [
          TYPE_REGULAR,
          TYPE_IRREGULAR
        ]
      ],
      [
        Feature.types.person,
        [
          ORD_1ST,
          ORD_2ND,
          ORD_3RD
        ]
      ],
      [
        Feature.types.age,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.area,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.source,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.frequency,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.geo,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.pronunciation,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.kind,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.comparison,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.morph,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.stemtype,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ],
      [
        Feature.types.derivtype,
        [
          FeatureType.UNRESTRICTED_VALUE
        ]
      ]
    ])
  }

  /**
   * @deprecated
   * @return {symbol} Returns a language ID
   */
  static get sourceLanguage () {
    console.warn(`Please use languageID directly`);
    return this.languageID
  }

  /**
   * @deprecated
   * @return {symbol} Returns a language ID
   */
  get sourceLanguage () {
    console.warn(`Please use languageID directly`);
    return this.constructor.languageID
  }

  static getFeatureType (name) {
    let featureValues = this.featureValues;
    if (featureValues.has(name)) {
      return new FeatureType(name, featureValues.get(name), this.languageID)
    } else {
      throw new Error(`Feature "${name}" is not defined`)
    }
  }

  _initializeFeatures () {
    let features = {};
    for (const featureName of this.constructor.featureValues.keys()) {
      features[featureName] = this.constructor.getFeatureType(featureName);
    }
    return features
  }

  /**
   * @deprecated
   */
  grammarFeatures () {
    console.warn(`Please use a static version of "grammarFeatures" instead`);
    return this.constructor.grammarFeatures()
  }

  /**
   * Identify the morphological features which should be linked to a grammar.
   * @returns {String[]} Array of Feature types
   */
  static grammarFeatures () {
    return []
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   * @param {string} code the language code
   * @returns true if supported false if not
   * @type Boolean
   */
  static supportsLanguage (code) {
    return this.languageCodes.includes[code]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {string} word the source word
   * @returns the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type String
   */
  static normalizeWord (word) {
    return word
  }

  /**
   * Returns alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns {Array} an array of alternate encodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    return []
  }

  alternateWordEncodings (word, preceding, following, encoding) {
    console.warn(`Please use static "alternateWordEncodings" instead`);
    return this.constructor.alternateWordEncodings(word, preceding, following, encoding)
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return '.,;:!?\'"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r'
  }

  /**
   * @deprecated
   * @return {String}
   */
  getPunctuation () {
    console.warn(`Please use a static version of "getPunctuation"`);
    return this.constructor.getPunctuation()
  }

  toString () {
    return String(this.constructor.languageCode)
  }

  isEqual (model) {
    return LanguageModelFactory.compareLanguages(this.languageID, model.languageID)
  }

  /*
  There are two types of language identificators: language IDs and language code. Language ID is a symbol constant
  defined in constants.js, such as LANG_LATIN or LANG_GREEK. Language code is a string containing (usually)
  a three-letter language codes such as 'lat' or 'la' for latin. There can be multiple language codes that identify
  the same language, but there is only one unique language ID for each language.
   */

  /**
   * Checks whether a language has a particular language code in its list of codes
   * @param {String} languageCode - A language code to check
   * @return {boolean} Whether this language code exists in a language code list
   */
  static hasCode (languageCode) {
    if (this.isLanguageCode(languageCode)) {
      return this.languageCodes.includes(languageCode)
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
   * @deprecated
   * @param node
   */
  canInflect (node) {
    console.warn(`Please use a static version of "canInflect" instead`);
    return this.constructor.canInflect(node)
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
  static groupInflectionsForDisplay (inflections) {
    let grouped = new Map();

    // group inflections by part of speech
    for (let infl of inflections) {
      let groupingKey = new InflectionGroupingKey(infl,
        [Feature.types.part, Feature.types.dialect, Feature.types.comparison],
        {
          prefix: infl.prefix,
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

  /**
   * @deprecated
   * @param inflections
   * @return {*}
   */
  groupInflectionsForDisplay (inflections) {
    console.warn(`Please use a static version of "groupInflectionsForDisplay" instead`);
    return this.constructor.groupInflectionsForDisplay(inflections)
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends LanguageModel {
  static get languageID () { return LANG_LATIN }
  static get languageCode () { return STR_LANG_CODE_LAT }
  static get languageCodes () { return [STR_LANG_CODE_LA, STR_LANG_CODE_LAT] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return LANG_DIR_LTR }
  static get baseUnit () { return LANG_UNIT_WORD }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.grmClass,
        [
          CLASS_PERSONAL,
          CLASS_REFLEXIVE,
          CLASS_POSSESSIVE,
          CLASS_DEMONSTRATIVE,
          CLASS_RELATIVE,
          CLASS_INTERROGATIVE
        ]
      ],
      [
        Feature.types.number,
        [
          NUM_SINGULAR,
          NUM_PLURAL
        ]
      ],
      [
        Feature.types.grmCase,
        [
          CASE_NOMINATIVE,
          CASE_GENITIVE,
          CASE_DATIVE,
          CASE_ACCUSATIVE,
          CASE_ABLATIVE,
          CASE_LOCATIVE,
          CASE_VOCATIVE
        ]
      ],
      [
        Feature.types.declension,
        [
          ORD_1ST,
          ORD_2ND,
          ORD_3RD,
          ORD_4TH,
          ORD_5TH
        ]
      ],
      [
        Feature.types.tense,
        [
          TENSE_PRESENT,
          TENSE_IMPERFECT,
          TENSE_FUTURE,
          TENSE_PERFECT,
          TENSE_PLUPERFECT,
          TENSE_FUTURE_PERFECT
        ]
      ],
      [
        Feature.types.voice,
        [
          VOICE_ACTIVE,
          VOICE_PASSIVE
        ]
      ],
      [
        Feature.types.mood,
        [
          MOOD_INDICATIVE,
          MOOD_SUBJUNCTIVE,
          MOOD_IMPERATIVE,
          MOOD_PARTICIPLE,
          MOOD_SUPINE,
          MOOD_GERUNDIVE,
          MOOD_PARTICIPLE,
          MOOD_INFINITIVE
        ]
      ],
      [
        Feature.types.conjugation,
        [
          ORD_1ST,
          ORD_2ND,
          ORD_3RD,
          ORD_4TH
        ]
      ]
    ])
  }

  /**
   * @override LanguageModel#grammarFeatures
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense]
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {String} word the source word
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  static normalizeWord (word) {
    if (word) {
      word = word.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, 'A');
      word = word.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, 'E');
      word = word.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, 'I');
      word = word.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, 'O');
      word = word.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, 'U');
      word = word.replace(/[\u00c6\u01e2]/g, 'AE');
      word = word.replace(/[\u0152]/g, 'OE');
      word = word.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, 'a');
      word = word.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, 'e');
      word = word.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, 'i');
      word = word.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, 'o');
      word = word.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, 'u');
      word = word.replace(/[\u00e6\u01e3]/g, 'ae');
      word = word.replace(/[\u0153]/g, 'oe');
    }
    return word
  }

  /**
   * Returns alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns {Array} an array of alternate encodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // Not implemented yet
    return []
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   * @param {Inflection} inflection - An inflection object
   * @return {Object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    let grammar = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    };
    if (inflection.hasOwnProperty(Feature.types.part) &&
      Array.isArray(inflection[Feature.types.part]) &&
      inflection[Feature.types.part].length === 1) {
      let partOfSpeech = inflection[Feature.types.part][0];
      if (partOfSpeech.value === POFS_PRONOUN) {
        grammar.fullFormBased = true;
      } else {
        grammar.suffixBased = true;
      }
    } else {
      console.warn(`Unable to set grammar: part of speech data is missing or is incorrect`, inflection[Feature.types.part]);
    }

    return grammar
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends LanguageModel {
  static get languageID () { return LANG_GREEK }
  static get languageCode () { return STR_LANG_CODE_GRC }
  static get languageCodes () { return [STR_LANG_CODE_GRC] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return LANG_DIR_LTR }
  static get baseUnit () { return LANG_UNIT_WORD }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.grmClass,
        [
          CLASS_DEMONSTRATIVE,
          CLASS_GENERAL_RELATIVE,
          CLASS_INDEFINITE,
          CLASS_INTENSIVE,
          CLASS_INTERROGATIVE,
          CLASS_PERSONAL,
          CLASS_POSSESSIVE,
          CLASS_RECIPROCAL,
          CLASS_REFLEXIVE,
          CLASS_RELATIVE
        ]
      ],
      [
        Feature.types.number,
        [
          NUM_SINGULAR,
          NUM_PLURAL,
          NUM_DUAL
        ]
      ],
      [
        Feature.types.grmCase,
        [
          CASE_NOMINATIVE,
          CASE_GENITIVE,
          CASE_DATIVE,
          CASE_ACCUSATIVE,
          CASE_VOCATIVE
        ]
      ],
      [
        Feature.types.declension,
        [
          ORD_1ST,
          ORD_2ND,
          ORD_3RD
        ]
      ],
      [
        Feature.types.tense,
        [
          TENSE_PRESENT,
          TENSE_IMPERFECT,
          TENSE_FUTURE,
          TENSE_PERFECT,
          TENSE_PLUPERFECT,
          TENSE_FUTURE_PERFECT,
          TENSE_AORIST
        ]
      ],
      [
        Feature.types.voice,
        [
          VOICE_PASSIVE,
          VOICE_ACTIVE,
          VOICE_MEDIOPASSIVE,
          VOICE_MIDDLE
        ]
      ],
      [
        Feature.types.mood,
        [
          MOOD_INDICATIVE,
          MOOD_SUBJUNCTIVE,
          MOOD_OPTATIVE,
          MOOD_IMPERATIVE
        ]
      ],
      [
        // TODO full list of greek dialects
        Feature.types.dialect,
        [
          'attic',
          'epic',
          'doric'
        ]
      ]
    ])
  }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return true
  }

  /**
   * @override LanguageModel#grammarFeatures
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.voice]
  }

  /**
   * Return a normalized version of a word which can be used to compare the word for equality
   * @param {string} word the source word
   * @returns {string} the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type string
   */
  static normalizeWord (word) {
    // we normalize greek to NFC - Normalization Form Canonical Composition
    if (word) {
      return word.normalize('NFC')
    } else {
      return word
    }
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
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
    let normalized = GreekLanguageModel.normalizeWord(word).toLocaleLowerCase();
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
  static getPunctuation () {
    return '.,;:!?\'"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r'
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   * @param {Inflection} inflection - An inflection object
   * @return {Object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    let constraints = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    };
    if (inflection.hasOwnProperty(Feature.types.part) &&
      Array.isArray(inflection[Feature.types.part]) &&
      inflection[Feature.types.part].length === 1) {
      let partOfSpeech = inflection[Feature.types.part][0];
      if (partOfSpeech.value === POFS_PRONOUN) {
        constraints.fullFormBased = true;
      } else {
        constraints.suffixBased = true;
      }
    } else {
      console.warn(`Unable to set grammar: part of speech data is missing or is incorrect`, inflection[Feature.types.part]);
    }

    constraints.pronounClassRequired =
      LanguageModelFactory.compareLanguages(GreekLanguageModel.languageID, inflection.languageID) &&
      inflection.hasOwnProperty(Feature.types.part) &&
      Array.isArray(inflection[Feature.types.part]) &&
      inflection[Feature.types.part].length >= 1 &&
      inflection[Feature.types.part][0].value === POFS_PRONOUN;

    return constraints
  }

  /**
   * Determines a class of a given word (pronoun) by finding a matching word entry(ies)
   * in a pronoun source info (`forms`) and getting a single or multiple classes of those entries.
   * Some morphological analyzers provide class information that is unreliable or do not
   * provide class information at all. However, class information is essential in
   * deciding in what table should pronouns be grouped. For this, we have to
   * determine pronoun classes using this method.
   * @param {Form[]} forms - An array of known forms of pronouns.
   * @param {string} word - A word we need to find a matching class for.
   * @param {boolean} normalize - Whether normalized forms of words shall be used for comparison.
   * @return {Feature[]} Matching classes found in an array of Feature objects. If no matching classes found,
   * returns an empty array.
   */
  static getPronounClasses (forms, word, normalize = true) {
    let classes = [];
    let matchingValues = new Set(); // Will eliminate duplicated values
    let matchingForms = forms.filter(
      form => {
        let match = false;
        if (form.value) {
          match = normalize
            ? GreekLanguageModel.normalizeWord(form.value) === GreekLanguageModel.normalizeWord(word)
            : form.value === word;
        }
        return match
      }
    );
    for (const matchingForm of matchingForms) {
      if (matchingForm.features.hasOwnProperty(Feature.types.grmClass)) {
        matchingValues.add(matchingForm.features[Feature.types.grmClass]);
      }
    }
    for (const matchingValue of matchingValues) {
      classes.push(new Feature(matchingValue, Feature.types.grmClass, GreekLanguageModel.languageID));
    }
    return classes
  }
}

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ArabicLanguageModel extends LanguageModel {
  static get languageID () { return LANG_ARABIC }
  static get languageCode () { return STR_LANG_CODE_ARA }
  static get languageCodes () { return [STR_LANG_CODE_ARA, STR_LANG_CODE_AR] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return LANG_DIR_RTL }
  static get baseUnit () { return LANG_UNIT_WORD }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return false
  }

  /**
   * @override LanguageModel#alternateWordEncodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
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
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r"
  }
}

/**
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
class PersianLanguageModel extends LanguageModel {
  static get languageID () { return LANG_PERSIAN }

  static get languageCode () { return STR_LANG_CODE_PER }

  static get languageCodes () { return [STR_LANG_CODE_PER, STR_LANG_CODE_FAS, STR_LANG_CODE_FA, STR_LANG_CODE_FA_IR] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return LANG_DIR_RTL }

  static get baseUnit () { return LANG_UNIT_WORD }

  /**
   * Check to see if this language tool can produce an inflection table display
   * for the current node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Returns alternate encodings for a word
   * @param {string} word the word
   * @param {string} preceding optional preceding word
   * @param {string} following optional following word
   * @param {string} encoding optional encoding name to filter the response to
   * @returns {Array} an array of alternate encodings
   */
  static alternateWordEncodings (word, preceding = null, following = null, encoding = null) {
    // Not implemented yet
    return []
  }

  /**
   * Get a list of valid puncutation for this language
   * @returns {String} a string containing valid puncutation symbols
   */
  static getPunctuation () {
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
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @return {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    language = (typeof language === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(language) : language;
    return MODELS.has(language)
  }

  /**
   * Returns a constructor of language model for a specific language ID.
   * @param {symbol} languageID - A language ID of a desired language model.
   * @return {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel (languageID) {
    let languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID);
    if (MODELS.has(languageCode)) {
      return MODELS.get(languageCode)
    } else {
      // A default value
      return LanguageModel
    }
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
   * @param {string} languageCode - An ISO 639-3 language code
   * @return {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.languageID
      }
    }
    // Noting found, return a Symbol with an undefined value (to keep return value type the same)
    return LANG_UNDEFINED
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   * @param {symbol} languageID - A language ID
   * @return {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.languageID === languageID) {
        return languageModel.languageCode
      }
    }
    // Noting found, return a string with an undefined value (to keep return value type the same)
    return STR_LANG_CODE_UNDEFINED
  }

  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   * @param {string | symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @return {object} An object with the following properties:
   *    {symbol} languageID
   *    {string} languageCode
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
   * @param {string | symbol} languageA - Either a language ID (a symbol) or a language code (a string).
   * @param {string | symbol} languageB - Either a language ID (a symbol) or a language code (a string).
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
     * Multiple values do not allow to use a sort order. Because of this, it's better to use
     * array of multiple Feature objects with single value each instead of a single Feature object
     * with multiple values.
     * Multiple values are left for backward compatibility only. Please do not use them as they
     * will be removed in the future.
     * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
     * @param {string | symbol} language - A language of a feature, allowed values are specified in 'languages' object.
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
      // `feature` is a single object with multiple `value` properties. This feature will be sunset
      // as it does not allow to use sort order on Feature objects.
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && LanguageModelFactory.compareLanguages(this.languageID, feature.languageID);
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      });
      return equal
    } else {
      return LanguageModelFactory.compareLanguages(this.languageID, feature.languageID) && this.type === feature.type && this.value === feature.value
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
  dialect: 'dialect', // a dialect identifier
  note: 'note', // a general note
  pronunciation: 'pronunciation',
  age: 'age',
  area: 'area',
  geo: 'geo', // geographical data
  kind: 'kind', // verb kind information
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
 * Lemma, a canonical form of a word.
 */
class Lemma {
  /**
   * Initializes a Lemma object.
   * @param {string} word - A word.
   * @param {symbol | string} languageID - A language ID (symbol, please use this) or a language code of a word.
   * @param {string[]} principalParts - the principalParts of a lemma.
   * @param {Object} features - the grammatical features of a lemma.
   */
  constructor (word, languageID, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!languageID) {
      throw new Error('Language should not be empty.')
    }

    this.languageID = undefined;
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LanguageModelFactory.getLanguageAttrs(languageID));

    this.word = word;
    this.principalParts = principalParts;
    this.features = {};
  }

  get language () {
    console.warn(`Please use "languageID" instead of "language"`);
    return this.languageCode
  }

  static readObject (jsonObject) {
    return new Lemma(jsonObject.word, jsonObject.language, jsonObject.principalParts, jsonObject.pronunciation)
  }

  /**
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    if (!data) {
      throw new Error('feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data];
    }

    let type = data[0].type;
    this.features[type] = [];
    for (let element of data) {
      if (!(element instanceof Feature)) {
        throw new Error('feature data must be a Feature object.')
      }

      if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
        throw new Error('Language "' + element.languageID.toString() + '" of a feature does not match a language "' +
                this.languageID.toString() + '" of a Lemma object.')
      }

      this.features[type].push(element);
    }
  }

  /**
   * Get a string which can be used as a unique key to identify this lemma
   * @return {string} the key
   */
  get key () {
    return [this.word, this.languageCode, ...Object.values(this.features)].join('-')
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
     * @param {string | symbol} language - A word's language.
     * @param {string} suffix - a suffix of a word
     * @param {prefix} prefix - a prefix of a word
     * @param {example} example - example
     */
  constructor (stem, language, suffix = null, prefix = null, example = null) {
    if (!stem) {
      throw new Error('Stem should not be empty.')
    }

    if (!language) {
      throw new Error('Language should not be empty.')
    }

    if (!LanguageModelFactory.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem;
    this.languageID = undefined;
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = LanguageModelFactory.getLanguageAttrs(language));
    this.model = LanguageModelFactory.getLanguageModel(this.languageID);

    // A grammar constraints object
    this.constraints = {
      fullFormBased: false,  // True this inflection stores and requires to use a full form of a word
      suffixBased: false,    // True if only suffix is enough to identify this inflection
      obligatoryMatches: [], // Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: []    // Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
    };

    // Suffix may not be present in every word. If missing, it will be set to null.
    this.suffix = suffix;

    // Prefix may not be present in every word. If missing, it will be set to null.
    this.prefix = prefix;

    // Example may not be provided
    this.example = example;
  }

  get form () {
    let form = this.prefix ? this.prefix : '';
    form = form + this.stem;
    form = this.suffix ? form + this.suffix : form;
    return form
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
   * Sets grammar properties based on inflection info
   */
  setConstraints () {
    if (this.model.hasOwnProperty('getInflectionConstraints')) {
      let constraintData = this.model.getInflectionConstraints(this);
      this.constraints = Object.assign(this.constraints, constraintData);
    }
  }

  compareWithWord (word, normalize = true) {
    const model = LanguageModelFactory.getLanguageModel(this.languageID);
    const value = this.constraints.suffixBased ? this.suffix : this.form;
    return normalize
      ? model.normalizeWord(value) === model.normalizeWord(word)
      : value === word
  }

  static readObject (jsonObject) {
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example);
    inflection.languageID = LanguageModelFactory.getLanguageIdFromCode(inflection.languageCode);
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

      if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
        throw new Error(`Language "${element.languageID.toString()}" of a feature does not match 
          a language "${this.languageID.toString()}" of an Inflection object.`)
      }

      this[type].push(element);
    }
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @return {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName) && Array.isArray(this[featureName]) && this[featureName].length > 0) {
      for (let feature of this[featureName]) {
        if (feature.hasValue(featureValue)) {
          return true
        }
      }
    }
    return false
  }
}

/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and a DefinitionSet
 */
class Lexeme {
    /**
     * Initializes a Lexeme object.
     * @param {Lemma} lemma - A lemma object.
     * @param {Inflection[]} inflections - An array of inflections.
     * @param {DefinitionSet} meaning - A set of definitions.

     */
  constructor (lemma, inflections, meaning = null) {
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
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID);
  }

  /**
   * test to see if a lexeme is populated with meaningful data
   * Returns true if any of these are true:
   *   its lemma has morphological features defined
   *   it has one ore more definitions supplied in the meaning
   *   it has one ore more inflections
   * @return {boolean}
   */
  isPopulated () {
    return Object.entries(this.lemma.features).length > 0 ||
      !this.meaning.isEmpty() ||
      this.inflections.length > 0
  }

  getGroupedInflections () {
    let lm = LanguageModelFactory.getLanguageModel(this.lemma.languageID);
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma);
    let inflections = [];
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection));
    }

    let lexeme = new Lexeme(lemma, inflections);
    lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning);
    return lexeme
  }

  /**
   * Get a sort function for an array of lexemes which applies a primary and secondary
   * sort logic using the sort order specified for each feature. Sorts in descending order -
   * higher sort order means it should come first
   * @param {string} primary feature name to use as primary sort key
   * @param {string} secondary feature name to use as secondary sort key
   * @returns {Function} function which can be passed to Array.sort
   */
  static getSortByTwoLemmaFeatures (primary, secondary) {
    return (a, b) => {
      if (a.lemma.features[primary] && b.lemma.features[primary]) {
        if (a.lemma.features[primary][0].sortOrder < b.lemma.features[primary][0].sortOrder) {
          return 1
        } else if (a.lemma.features[primary][0].sortOrder > b.lemma.features[primary][0].sortOrder) {
          return -1
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          if (a.lemma.features[secondary][0].sortOrder < b.lemma.features[secondary][0].sortOrder) {
            return 1
          } else if (a.lemma.features[secondary][0].sortOrder > b.lemma.features[secondary][0].sortOrder) {
            return -1
          } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
            return -1
          } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
            return 1
          } else {
            return 0
          }
        }
      } else if (a.lemma.features[primary] && !b.lemma.features[primary]) {
        return -1
      } else if (!a.lemma.features[primary] && b.lemma.features[primary]) {
        return 1
      } else {
        return 0
      }
    }
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
     * Returns a language code of a homonym (ISO 639-3).
     * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
     * and inflections within the same homonym will have the same language, and we can determine a language
     * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
     * @returns {string} A language code, as defined in the `languages` object.
     */
  get language () {
    console.warn(`Please use languageID instead`);
    return LanguageModelFactory.getLanguageCodeFromId(this.languageID)
  }

  /**
   * Returns a language ID of a homonym.
   * Homonym does not have a languageID property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using languageID property of the first lemma. We chan change this logic in the future if we'll need to.
   * @returns {Symbol} A language ID, as defined in the `LANG_` constants.
   */
  get languageID () {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.languageID) {
      return this.lexemes[0].lemma.languageID
    } else {
      throw new Error('Homonym has not been initialized properly. Unable to obtain language ID information.')
    }
  }

  /**
   * Returns a list of all inflections within all lexemes of a homonym
   * @return {Inflection[]} An array of inflections
   */
  get inflections () {
    let inflections = [];
    for (const lexeme of this.lexemes) {
      inflections = inflections.concat(lexeme.inflections);
    }
    return inflections
  }
}

/**
 * An abstraction of an Alpheios resource provider
 */
class ResourceProvider {
  /**
   * @constructor
   * @param {string} uri - a unique resource identifier for this provider
   * @param {string} rights - rights text
   * @param {Map} rightsTranslations - optional map of translated rights text - keys should be language of text, values the text
   */
  constructor (uri = '', rights = '', rightsTranslations = new Map([['default', rights]])) {
    this.uri = uri;
    this.rights = rightsTranslations;
    if (!this.rights.has('default')) {
      this.rights.set('default', rights);
    }
  }

  /**
   * @return a string representation of the resource provider, in the default language
   */
  toString () {
    return this.rights.get('default')
  }

  /**
   * Produce a string representation of the resource provider, in the requested locale if available
   * @param {string} languageCode
   * @return a string representation of the resource provider, in the requested locale if available
   */
  toLocaleString (languageCode) {
    return this.rights.get(languageCode) || this.rights.get('default')
  }

  static getProxy (provider = null, target = {}) {
    return new Proxy(target, {
      get: function (target, name) {
        return name === 'provider' ? provider : target[name]
      }
    })
  }
}

export { constants as Constants, Definition, DefinitionSet, Feature, FeatureType, FeatureList, FeatureImporter, Inflection, LanguageModelFactory, Homonym, Lexeme, Lemma, LatinLanguageModel, GreekLanguageModel, ArabicLanguageModel, PersianLanguageModel, ResourceProvider };
//# sourceMappingURL=alpheios-data-models.js.map
