const LANG_UNIT_WORD = Symbol("word");
const LANG_UNIT_CHAR = Symbol("char");
const LANG_DIR_LTR = Symbol("ltr");
const LANG_DIR_RTL = Symbol("rtl");
const LANG_UNDEFINED = Symbol("undefined");
const LANG_LATIN = Symbol("latin");
const LANG_GREEK = Symbol("greek");
const LANG_ARABIC = Symbol("arabic");
const LANG_PERSIAN = Symbol("persian");
const LANG_GEEZ = Symbol("ge'ez");
const LANG_CHINESE = Symbol("chinese");
const LANG_SYRIAC = Symbol("syriac");
const STR_LANG_CODE_UNDEFINED = "undefined";
const STR_LANG_CODE_LAT = "lat";
const STR_LANG_CODE_LA = "la";
const STR_LANG_CODE_GRC = "grc";
const STR_LANG_CODE_ARA = "ara";
const STR_LANG_CODE_AR = "ar";
const STR_LANG_CODE_FAS = "fas";
const STR_LANG_CODE_PER = "per";
const STR_LANG_CODE_FA_IR = "fa-IR";
const STR_LANG_CODE_FA = "fa";
const STR_LANG_CODE_GEZ = "gez";
const STR_LANG_CODE_ZHO = "zho";
const STR_LANG_CODE_ZH = "zh";
const STR_LANG_CODE_ZH_HANT = "zh-Hant";
const STR_LANG_CODE_ZH_HANS = "zh-Hans";
const STR_LANG_CODE_SYC = "syc";
const STR_LANG_CODE_SYR = "syr";
const STR_LANG_CODE_SYR_SYRJ = "syr-Syrj";
const STR_LANG_CODE_ENG = "eng";
const POFS_ADJECTIVE = "adjective";
const POFS_ADVERB = "adverb";
const POFS_ADVERBIAL = "adverbial";
const POFS_ARTICLE = "article";
const POFS_CONJUNCTION = "conjunction";
const POFS_EXCLAMATION = "exclamation";
const POFS_INTERJECTION = "interjection";
const POFS_NOUN = "noun";
const POFS_NOUN_PROPER = "proper noun";
const POFS_NUMERAL = "numeral";
const POFS_PARTICLE = "particle";
const POFS_PREFIX = "prefix";
const POFS_PREPOSITION = "preposition";
const POFS_PRONOUN = "pronoun";
const POFS_SUFFIX = "suffix";
const POFS_GERUNDIVE = "gerundive";
const POFS_SUPINE = "supine";
const POFS_VERB = "verb";
const POFS_VERB_PARTICIPLE = "verb participle";
const POFS_DENOMINATIVE = "denominative";
const GEND_MASCULINE = "masculine";
const GEND_FEMININE = "feminine";
const GEND_NEUTER = "neuter";
const GEND_COMMON = "common";
const GEND_ANIMATE = "animate";
const GEND_INANIMATE = "inanimate";
const GEND_PERSONAL_MASCULINE = "personal masculine";
const GEND_ANIMATE_MASCULINE = "animate masculine";
const GEND_INANIMATE_MASCULINE = "inanimate masculine";
const COMP_POSITIVE = "positive";
const COMP_COMPARITIVE = "comparative";
const COMP_SUPERLATIVE = "superlative";
const CASE_ABESSIVE = "abessive";
const CASE_ABLATIVE = "ablative";
const CASE_ABSOLUTIVE = "absolutive";
const CASE_ACCUSATIVE = "accusative";
const CASE_ADDIRECTIVE = "addirective";
const CASE_ADELATIVE = "adelative";
const CASE_ADESSIVE = "adessive";
const CASE_ADVERBIAL = "adverbial";
const CASE_ALLATIVE = "allative";
const CASE_ANTESSIVE = "antessive";
const CASE_APUDESSIVE = "apudessive";
const CASE_AVERSIVE = "aversive";
const CASE_BENEFACTIVE = "benefactive";
const CASE_CARITIVE = "caritive";
const CASE_CAUSAL = "causal";
const CASE_CAUSAL_FINAL = "causal-final";
const CASE_COMITATIVE = "comitative";
const CASE_DATIVE = "dative";
const CASE_DELATIVE = "delative";
const CASE_DIRECT = "direct";
const CASE_DISTRIBUTIVE = "distributive";
const CASE_DISTRIBUTIVE_TEMPORAL = "distributive-temporal";
const CASE_ELATIVE = "elative";
const CASE_ERGATIVE = "ergative";
const CASE_ESSIVE = "essive";
const CASE_ESSIVE_FORMAL = "essive-formal";
const CASE_ESSIVE_MODAL = "essive-modal";
const CASE_EQUATIVE = "equative";
const CASE_EVITATIVE = "evitative";
const CASE_EXESSIVE = "exessive";
const CASE_FINAL = "final";
const CASE_FORMAL = "formal";
const CASE_GENITIVE = "genitive";
const CASE_ILLATIVE = "illative";
const CASE_INELATIVE = "inelative";
const CASE_INESSIVE = "inessive";
const CASE_INSTRUCTIVE = "instructive";
const CASE_INSTRUMENTAL = "instrumental";
const CASE_INSTRUMENTAL_COMITATIVE = "instrumental-comitative";
const CASE_INTRANSITIVE = "intransitive";
const CASE_LATIVE = "lative";
const CASE_LOCATIVE = "locative";
const CASE_MODAL = "modal";
const CASE_MULTIPLICATIVE = "multiplicative";
const CASE_NOMINATIVE = "nominative";
const CASE_PARTITIVE = "partitive";
const CASE_PEGATIVE = "pegative";
const CASE_PERLATIVE = "perlative";
const CASE_POSSESSIVE = "possessive";
const CASE_POSTELATIVE = "postelative";
const CASE_POSTDIRECTIVE = "postdirective";
const CASE_POSTESSIVE = "postessive";
const CASE_POSTPOSITIONAL = "postpositional";
const CASE_PREPOSITIONAL = "prepositional";
const CASE_PRIVATIVE = "privative";
const CASE_PROLATIVE = "prolative";
const CASE_PROSECUTIVE = "prosecutive";
const CASE_PROXIMATIVE = "proximative";
const CASE_SEPARATIVE = "separative";
const CASE_SOCIATIVE = "sociative";
const CASE_SUBDIRECTIVE = "subdirective";
const CASE_SUBESSIVE = "subessive";
const CASE_SUBELATIVE = "subelative";
const CASE_SUBLATIVE = "sublative";
const CASE_SUPERDIRECTIVE = "superdirective";
const CASE_SUPERESSIVE = "superessive";
const CASE_SUPERLATIVE = "superlative";
const CASE_SUPPRESSIVE = "suppressive";
const CASE_TEMPORAL = "temporal";
const CASE_TERMINATIVE = "terminative";
const CASE_TRANSLATIVE = "translative";
const CASE_VIALIS = "vialis";
const CASE_VOCATIVE = "vocative";
const MOOD_ADMIRATIVE = "admirative";
const MOOD_COHORTATIVE = "cohortative";
const MOOD_CONDITIONAL = "conditional";
const MOOD_DECLARATIVE = "declarative";
const MOOD_DUBITATIVE = "dubitative";
const MOOD_ENERGETIC = "energetic";
const MOOD_EVENTIVE = "eventive";
const MOOD_GENERIC = "generic";
const MOOD_GERUNDIVE = "gerundive";
const MOOD_HYPOTHETICAL = "hypothetical";
const MOOD_IMPERATIVE = "imperative";
const MOOD_INDICATIVE = "indicative";
const MOOD_INFERENTIAL = "inferential";
const MOOD_INFINITIVE = "infinitive";
const MOOD_INTERROGATIVE = "interrogative";
const MOOD_JUSSIVE = "jussive";
const MOOD_NEGATIVE = "negative";
const MOOD_OPTATIVE = "optative";
const MOOD_PARTICIPLE = "participle";
const MOOD_PRESUMPTIVE = "presumptive";
const MOOD_RENARRATIVE = "renarrative";
const MOOD_SUBJUNCTIVE = "subjunctive";
const MOOD_SUPINE = "supine";
const NUM_SINGULAR = "singular";
const NUM_PLURAL = "plural";
const NUM_DUAL = "dual";
const NUM_TRIAL = "trial";
const NUM_PAUCAL = "paucal";
const NUM_SINGULATIVE = "singulative";
const NUM_COLLECTIVE = "collective";
const NUM_DISTRIBUTIVE_PLURAL = "distributive plural";
const NRL_CARDINAL = "cardinal";
const NRL_ORDINAL = "ordinal";
const NRL_DISTRIBUTIVE = "distributive";
const NURL_NUMERAL_ADVERB = "numeral adverb";
const ORD_1ST = "1st";
const ORD_2ND = "2nd";
const ORD_3RD = "3rd";
const ORD_4TH = "4th";
const ORD_5TH = "5th";
const ORD_6TH = "6th";
const ORD_7TH = "7th";
const ORD_8TH = "8th";
const ORD_9TH = "9th";
const TENSE_AORIST = "aorist";
const TENSE_FUTURE = "future";
const TENSE_FUTURE_PERFECT = "future perfect";
const TENSE_IMPERFECT = "imperfect";
const TENSE_PAST_ABSOLUTE = "past absolute";
const TENSE_PERFECT = "perfect";
const TENSE_PLUPERFECT = "pluperfect";
const TENSE_PRESENT = "present";
const VKIND_TO_BE = "to be";
const VKIND_COMPOUNDS_OF_TO_BE = "compounds of to be";
const VKIND_TAKING_ABLATIVE = "taking ablative";
const VKIND_TAKING_DATIVE = "taking dative";
const VKIND_TAKING_GENITIVE = "taking genitive";
const VKIND_TRANSITIVE = "transitive";
const VKIND_INTRANSITIVE = "intransitive";
const VKIND_IMPERSONAL = "impersonal";
const VKIND_DEPONENT = "deponent";
const VKIND_SEMIDEPONENT = "semideponent";
const VKIND_PERFECT_DEFINITE = "perfect definite";
const VOICE_ACTIVE = "active";
const VOICE_PASSIVE = "passive";
const VOICE_MEDIOPASSIVE = "mediopassive";
const VOICE_IMPERSONAL_PASSIVE = "impersonal passive";
const VOICE_MIDDLE = "middle";
const VOICE_ANTIPASSIVE = "antipassive";
const VOICE_REFLEXIVE = "reflexive";
const VOICE_RECIPROCAL = "reciprocal";
const VOICE_CAUSATIVE = "causative";
const VOICE_ADJUTATIVE = "adjutative";
const VOICE_APPLICATIVE = "applicative";
const VOICE_CIRCUMSTANTIAL = "circumstantial";
const VOICE_DEPONENT = "deponent";
const TYPE_IRREGULAR = "irregular";
const TYPE_REGULAR = "regular";
const CLASS_PERSONAL = "personal";
const CLASS_REFLEXIVE = "reflexive";
const CLASS_POSSESSIVE = "possessive";
const CLASS_DEMONSTRATIVE = "demonstrative";
const CLASS_RELATIVE = "relative";
const CLASS_INTERROGATIVE = "interrogative";
const CLASS_GENERAL_RELATIVE = "general relative";
const CLASS_INDEFINITE = "indefinite";
const CLASS_INTENSIVE = "intensive";
const CLASS_RECIPROCAL = "reciprocal";
const PARADIGM_CAT_KAYLO = "kaylo";
const PARADIGM_CAT_STATE = "state";
const constants = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CASE_ABESSIVE,
  CASE_ABLATIVE,
  CASE_ABSOLUTIVE,
  CASE_ACCUSATIVE,
  CASE_ADDIRECTIVE,
  CASE_ADELATIVE,
  CASE_ADESSIVE,
  CASE_ADVERBIAL,
  CASE_ALLATIVE,
  CASE_ANTESSIVE,
  CASE_APUDESSIVE,
  CASE_AVERSIVE,
  CASE_BENEFACTIVE,
  CASE_CARITIVE,
  CASE_CAUSAL,
  CASE_CAUSAL_FINAL,
  CASE_COMITATIVE,
  CASE_DATIVE,
  CASE_DELATIVE,
  CASE_DIRECT,
  CASE_DISTRIBUTIVE,
  CASE_DISTRIBUTIVE_TEMPORAL,
  CASE_ELATIVE,
  CASE_EQUATIVE,
  CASE_ERGATIVE,
  CASE_ESSIVE,
  CASE_ESSIVE_FORMAL,
  CASE_ESSIVE_MODAL,
  CASE_EVITATIVE,
  CASE_EXESSIVE,
  CASE_FINAL,
  CASE_FORMAL,
  CASE_GENITIVE,
  CASE_ILLATIVE,
  CASE_INELATIVE,
  CASE_INESSIVE,
  CASE_INSTRUCTIVE,
  CASE_INSTRUMENTAL,
  CASE_INSTRUMENTAL_COMITATIVE,
  CASE_INTRANSITIVE,
  CASE_LATIVE,
  CASE_LOCATIVE,
  CASE_MODAL,
  CASE_MULTIPLICATIVE,
  CASE_NOMINATIVE,
  CASE_PARTITIVE,
  CASE_PEGATIVE,
  CASE_PERLATIVE,
  CASE_POSSESSIVE,
  CASE_POSTDIRECTIVE,
  CASE_POSTELATIVE,
  CASE_POSTESSIVE,
  CASE_POSTPOSITIONAL,
  CASE_PREPOSITIONAL,
  CASE_PRIVATIVE,
  CASE_PROLATIVE,
  CASE_PROSECUTIVE,
  CASE_PROXIMATIVE,
  CASE_SEPARATIVE,
  CASE_SOCIATIVE,
  CASE_SUBDIRECTIVE,
  CASE_SUBELATIVE,
  CASE_SUBESSIVE,
  CASE_SUBLATIVE,
  CASE_SUPERDIRECTIVE,
  CASE_SUPERESSIVE,
  CASE_SUPERLATIVE,
  CASE_SUPPRESSIVE,
  CASE_TEMPORAL,
  CASE_TERMINATIVE,
  CASE_TRANSLATIVE,
  CASE_VIALIS,
  CASE_VOCATIVE,
  CLASS_DEMONSTRATIVE,
  CLASS_GENERAL_RELATIVE,
  CLASS_INDEFINITE,
  CLASS_INTENSIVE,
  CLASS_INTERROGATIVE,
  CLASS_PERSONAL,
  CLASS_POSSESSIVE,
  CLASS_RECIPROCAL,
  CLASS_REFLEXIVE,
  CLASS_RELATIVE,
  COMP_COMPARITIVE,
  COMP_POSITIVE,
  COMP_SUPERLATIVE,
  GEND_ANIMATE,
  GEND_ANIMATE_MASCULINE,
  GEND_COMMON,
  GEND_FEMININE,
  GEND_INANIMATE,
  GEND_INANIMATE_MASCULINE,
  GEND_MASCULINE,
  GEND_NEUTER,
  GEND_PERSONAL_MASCULINE,
  LANG_ARABIC,
  LANG_CHINESE,
  LANG_DIR_LTR,
  LANG_DIR_RTL,
  LANG_GEEZ,
  LANG_GREEK,
  LANG_LATIN,
  LANG_PERSIAN,
  LANG_SYRIAC,
  LANG_UNDEFINED,
  LANG_UNIT_CHAR,
  LANG_UNIT_WORD,
  MOOD_ADMIRATIVE,
  MOOD_COHORTATIVE,
  MOOD_CONDITIONAL,
  MOOD_DECLARATIVE,
  MOOD_DUBITATIVE,
  MOOD_ENERGETIC,
  MOOD_EVENTIVE,
  MOOD_GENERIC,
  MOOD_GERUNDIVE,
  MOOD_HYPOTHETICAL,
  MOOD_IMPERATIVE,
  MOOD_INDICATIVE,
  MOOD_INFERENTIAL,
  MOOD_INFINITIVE,
  MOOD_INTERROGATIVE,
  MOOD_JUSSIVE,
  MOOD_NEGATIVE,
  MOOD_OPTATIVE,
  MOOD_PARTICIPLE,
  MOOD_PRESUMPTIVE,
  MOOD_RENARRATIVE,
  MOOD_SUBJUNCTIVE,
  MOOD_SUPINE,
  NRL_CARDINAL,
  NRL_DISTRIBUTIVE,
  NRL_ORDINAL,
  NUM_COLLECTIVE,
  NUM_DISTRIBUTIVE_PLURAL,
  NUM_DUAL,
  NUM_PAUCAL,
  NUM_PLURAL,
  NUM_SINGULAR,
  NUM_SINGULATIVE,
  NUM_TRIAL,
  NURL_NUMERAL_ADVERB,
  ORD_1ST,
  ORD_2ND,
  ORD_3RD,
  ORD_4TH,
  ORD_5TH,
  ORD_6TH,
  ORD_7TH,
  ORD_8TH,
  ORD_9TH,
  PARADIGM_CAT_KAYLO,
  PARADIGM_CAT_STATE,
  POFS_ADJECTIVE,
  POFS_ADVERB,
  POFS_ADVERBIAL,
  POFS_ARTICLE,
  POFS_CONJUNCTION,
  POFS_DENOMINATIVE,
  POFS_EXCLAMATION,
  POFS_GERUNDIVE,
  POFS_INTERJECTION,
  POFS_NOUN,
  POFS_NOUN_PROPER,
  POFS_NUMERAL,
  POFS_PARTICLE,
  POFS_PREFIX,
  POFS_PREPOSITION,
  POFS_PRONOUN,
  POFS_SUFFIX,
  POFS_SUPINE,
  POFS_VERB,
  POFS_VERB_PARTICIPLE,
  STR_LANG_CODE_AR,
  STR_LANG_CODE_ARA,
  STR_LANG_CODE_ENG,
  STR_LANG_CODE_FA,
  STR_LANG_CODE_FAS,
  STR_LANG_CODE_FA_IR,
  STR_LANG_CODE_GEZ,
  STR_LANG_CODE_GRC,
  STR_LANG_CODE_LA,
  STR_LANG_CODE_LAT,
  STR_LANG_CODE_PER,
  STR_LANG_CODE_SYC,
  STR_LANG_CODE_SYR,
  STR_LANG_CODE_SYR_SYRJ,
  STR_LANG_CODE_UNDEFINED,
  STR_LANG_CODE_ZH,
  STR_LANG_CODE_ZHO,
  STR_LANG_CODE_ZH_HANS,
  STR_LANG_CODE_ZH_HANT,
  TENSE_AORIST,
  TENSE_FUTURE,
  TENSE_FUTURE_PERFECT,
  TENSE_IMPERFECT,
  TENSE_PAST_ABSOLUTE,
  TENSE_PERFECT,
  TENSE_PLUPERFECT,
  TENSE_PRESENT,
  TYPE_IRREGULAR,
  TYPE_REGULAR,
  VKIND_COMPOUNDS_OF_TO_BE,
  VKIND_DEPONENT,
  VKIND_IMPERSONAL,
  VKIND_INTRANSITIVE,
  VKIND_PERFECT_DEFINITE,
  VKIND_SEMIDEPONENT,
  VKIND_TAKING_ABLATIVE,
  VKIND_TAKING_DATIVE,
  VKIND_TAKING_GENITIVE,
  VKIND_TO_BE,
  VKIND_TRANSITIVE,
  VOICE_ACTIVE,
  VOICE_ADJUTATIVE,
  VOICE_ANTIPASSIVE,
  VOICE_APPLICATIVE,
  VOICE_CAUSATIVE,
  VOICE_CIRCUMSTANTIAL,
  VOICE_DEPONENT,
  VOICE_IMPERSONAL_PASSIVE,
  VOICE_MEDIOPASSIVE,
  VOICE_MIDDLE,
  VOICE_PASSIVE,
  VOICE_RECIPROCAL,
  VOICE_REFLEXIVE
}, Symbol.toStringTag, { value: "Module" }));
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
class ResourceProvider {
  /**
   * @param {string} uri - a unique resource identifier for this provider
   * @param {string} rights - rights text
   * @param {Map} rightsTranslations - optional map of translated rights text - keys should be language of text, values the text
   */
  constructor(uri = "", rights = "", rightsTranslations = /* @__PURE__ */ new Map([["default", rights]])) {
    this.uri = uri;
    this.rights = rightsTranslations;
    if (!this.rights.has("default")) {
      this.rights.set("default", rights);
    }
  }
  /**
   * @returns a string representation of the resource provider, in the default language
   */
  toString() {
    return this.rights.get("default");
  }
  /**
   * Produce a string representation of the resource provider, in the requested locale if available
   *
   * @param {string} languageCode
   * @returns a string representation of the resource provider, in the requested locale if available
   */
  toLocaleString(languageCode) {
    return this.rights.get(languageCode) || this.rights.get("default");
  }
  static getProxy(provider = null, target = {}) {
    return new Proxy(target, {
      get: function(target2, name) {
        return name === "provider" ? provider : target2[name];
      }
    });
  }
  convertToJSONObject() {
    let rights = {};
    for (const [key, value] of this.rights.entries()) {
      rights[key] = value;
    }
    const resultProvider = {
      uri: this.uri,
      rights
    };
    return resultProvider;
  }
  static readObject(jsonObject) {
    const rights = /* @__PURE__ */ new Map();
    if (jsonObject.rights) {
      Object.keys(jsonObject.rights).forEach((key) => {
        rights.set(key, jsonObject.rights[key]);
      });
    }
    return new ResourceProvider(jsonObject.uri, "", rights);
  }
}
class Definition {
  constructor(text, language, format, lemmaText) {
    this.text = text;
    this.language = language;
    this.format = format;
    this.lemmaText = lemmaText;
    this.ID = v4();
  }
  static readObject(jsonObject) {
    let definition = new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText);
    if (jsonObject.ID) {
      definition.ID = jsonObject.ID;
    }
    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider);
      return ResourceProvider.getProxy(provider, definition);
    } else {
      return definition;
    }
  }
  convertToJSONObject() {
    let result = {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    };
    if (this.provider) {
      result.provider = this.provider.convertToJSONObject();
    }
    return result;
  }
}
class FeatureImporter {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @returns {FeatureImporter}
   */
  constructor(defaults2 = [], returnUnknown = false) {
    this.hash = {};
    for (const value of defaults2) {
      this.map(value, value);
    }
    this.returnUnknown = returnUnknown;
    return this;
  }
  /**
   * Sets mapping between external imported value and one or more library standard values. If an importedValue
   * is already in a hash table, old libraryValue will be overwritten with the new one.
   *
   * @param {string} importedValue - External value
   * @param {object|object[]|string|string[]} libraryValue - Library standard value
   */
  map(importedValue, libraryValue) {
    if (!importedValue) {
      throw new Error("Imported value should not be empty.");
    }
    if (!libraryValue) {
      throw new Error("Library value should not be empty.");
    }
    this.hash[importedValue] = libraryValue;
    return this;
  }
  /**
   * Checks if value is in a map.
   *
   * @param {string} importedValue - A value to test.
   * @returns {boolean} - Tru if value is in a map, false otherwise.
   */
  has(importedValue) {
    return this.hash.hasOwnProperty(importedValue);
  }
  /**
   * Returns one or more library standard values that match an external value
   *
   * @param {string} sourceValue - External value
   * @returns {object|string} One or more of library standard values
   */
  get(sourceValue) {
    if (this.has(sourceValue)) {
      return this.hash[sourceValue];
    } else if (this.returnUnknown) {
      return sourceValue;
    } else {
      throw new Error('A value "' + sourceValue + '" is not found in the importer.');
    }
  }
}
let singleInstance;
class Logger {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor({ verbose = false, prepend = true, trace = false } = {}) {
    this._verboseMode = verbose;
    this._prependMode = prepend;
    this._traceMode = trace;
  }
  /**
   * Returns a single instance of the Logger object. If one does not exist, it will be created
   * with the options specified. If the Logger instance is already created, but there are some
   * options provided, options of the existing Logger object will be changed to match the ones supplied.
   *
   * @param {object} options - Options of the Logger constructor {@see Logger#constructor}.
   * @returns {Logger} - An instance of existing or newly created Logger object.
   */
  static getInstance(options = {}) {
    if (!singleInstance) {
      singleInstance = new Logger(options);
    } else {
      if (typeof options.verbose !== "undefined") {
        console.info("Setting a verbose mode");
        singleInstance.setVerboseMode(options.verbose);
      }
      if (typeof options.prepend !== "undefined") {
        console.info("Setting a prepend mode");
        singleInstance.setVerboseMode(options.prepend);
      }
      if (typeof options.trace !== "undefined") {
        console.info("Setting a trace mode");
        singleInstance.setTraceMode(options.trace);
      }
    }
    return singleInstance;
  }
  setVerboseMode(mode) {
    this._verboseMode = mode;
    return this;
  }
  setPrependMode(mode) {
    this._prependMode = mode;
    return this;
  }
  setTraceMode(mode) {
    this._traceMode = mode;
    return this;
  }
  verboseModeOn() {
    this.setVerboseMode(true);
    return this;
  }
  verboseModeOff() {
    this.setVerboseMode(false);
    return this;
  }
  prependModeOn() {
    this.setPrependMode(true);
    return this;
  }
  prependModeOff() {
    this.setPrependMode(false);
    return this;
  }
  traceModeOn() {
    this.setTraceMode(true);
    return this;
  }
  traceModeOff() {
    this.setTraceMode(false);
    return this;
  }
  error(...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === "string") {
      data[0] = `Alpheios error: ${data[0]}`;
    }
    console.error(...data);
    if (this._traceMode) {
      console.trace();
    }
  }
  warn(...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === "string") {
        data[0] = `Alpheios warn: ${data[0]}`;
      }
      console.warn(...data);
      if (this._traceMode) {
        console.trace();
      }
    }
  }
  log(...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === "string") {
        data[0] = `Alpheios log: ${data[0]}`;
      }
      console.log(...data);
      if (this._traceMode) {
        console.trace();
      }
    }
  }
  info(...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === "string") {
        data[0] = `Alpheios info: ${data[0]}`;
      }
      console.info(...data);
      if (this._traceMode) {
        console.trace();
      }
    }
  }
}
class Feature {
  /**
   *
   * @param {string} type - A type of the feature, allowed values are specified in 'type' getter.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   *
   * If a single value with no sort order is provided, data format will be:
   *  value
   *  This value will be assigned a default sort order.
   *
   * If a single value with sort order is provided, data format will be:
   *  [[value, sortOrder]]
   *
   * If multiple values without sort order are provided, data format will be:
   *  [value1, value2, value3, ...]
   * Items will be assigned a sort order according to their order in an array.
   * The first item will receive a highest sort order, the last one will receive the lowest, one.
   *
   * If multiple values with sort order are provided, data format will be:
   *  [[value1, sortOrder1], [value2, sortOrder2], [value3, sortOrder3], ...]
   * If a sort order is omitted anywhere, it will be set to a default sort order.
   *
   * Each value of a feature has its `sortOrder` property. This value is used to soft values of a feature
   * between themselves. Feature object has a `sortOrder` property of its own, too. It is used
   * to compare two Feature objects between themselves.
   * @param {symbol} languageID - A language ID of a feature
   * @param {number} sortOrder - A sort order of a feature when multiple features are compared.
   * @param allowedValues - If feature has a restricted set of allowed values, here will be a list of those
   * values. An order of those values can define a sort order.
   */
  constructor(type, data, languageID, sortOrder = 1, allowedValues = []) {
    if (!Feature.isAllowedType(type)) {
      throw new Error('Features of "' + type + '" type are not supported.');
    }
    if (!data) {
      throw new Error("Feature should have a non-empty value(s).");
    }
    if (!languageID) {
      throw new Error("No language ID is provided");
    }
    this.type = type;
    this.languageID = languageID;
    this.sortOrder = sortOrder;
    this.allowedValues = allowedValues;
    this._data = Feature.dataValuesFromInput(data);
    this.sort();
  }
  /**
   *
   * @param {string | string[] | string[][]} data - Feature values with, possibly, their sort order.
   *        @see {@link Feature#constructor} for more details about possible values of `data` parameter.
   * @returns {{sortOrder: number, value: *}[]} Array of object in a format that will be used to store
   *          data values along with their sort order within a Feature object
   */
  static dataValuesFromInput(data) {
    let normalized;
    if (!Array.isArray(data)) {
      normalized = [[data, this.defaultSortOrder]];
    } else if (!Array.isArray(data[0])) {
      normalized = data.map((v, i) => [v, data.length - i]);
    } else {
      normalized = data;
    }
    return normalized.map((d) => {
      return { value: d[0], sortOrder: Number.parseInt(d[1]) };
    });
  }
  /**
   *
   * @param featureData
   */
  static newFromFtr(featureData) {
  }
  static get types() {
    return {
      /**
       * @deprecated : Use `fullForm` where appropriate instead
       */
      word: "word",
      fullForm: "full form",
      hdwd: "headword",
      part: "part of speech",
      // Part of speech
      number: "number",
      case: "case",
      grmCase: "case",
      // A synonym of `case`
      declension: "declension",
      gender: "gender",
      type: "type",
      class: "class",
      grmClass: "class",
      // A synonym of `class`
      conjugation: "conjugation",
      comparison: "comparison",
      tense: "tense",
      voice: "voice",
      mood: "mood",
      person: "person",
      frequency: "frequency",
      // How frequent this word is
      meaning: "meaning",
      // Meaning of a word
      source: "source",
      // Source of word definition
      footnote: "footnote",
      // A footnote for a word's ending
      dialect: "dialect",
      // a dialect identifier
      note: "note",
      // a general note
      pronunciation: "pronunciation",
      age: "age",
      area: "area",
      geo: "geo",
      // geographical data
      kind: "kind",
      // verb kind information
      derivtype: "derivtype",
      stemtype: "stemtype",
      morph: "morph",
      // general morphological information
      var: "var",
      // variance?
      /** for CJK languages only */
      radical: "radical",
      /** used for Syriac */
      kaylo: "kaylo",
      state: "state"
    };
  }
  static isAllowedType(value) {
    return Object.values(this.types).includes(`${value}`);
  }
  static get defaultSortOrder() {
    return 1;
  }
  static get joinSeparator() {
    return " ";
  }
  static get defaultImporterName() {
    return "default";
  }
  /**
   * Test to see if this feature allows unrestricted values.
   *
   * @returns {boolean} true if unrestricted false if not.
   */
  get allowsUnrestrictedValues() {
    return this.allowedValues.length === 0;
  }
  /**
   * Defines a sort order of feature values. Values are sorted according to their sort order
   * (a number starting from one). If several values have the same sort order, they will be
   * sorted alphabetically according to their values.
   * Sort order is deterministic.
   */
  sort() {
    this._data.sort((a, b) => a.sortOrder !== b.sortOrder ? b.sortOrder - a.sortOrder : a.value.localeCompare(b.value));
  }
  /**
   * Compares a feature's values to another feature's values for sorting
   *
   * @param {Feature} otherFeature the feature to compare this feature's values to
   * @returns {number} < 1 if this feature should be sorted first, 0 if they are equal and -1 if this feature should be sorted second
   */
  compareTo(otherFeature) {
    if (otherFeature) {
      return otherFeature._data[0].sortOrder - this._data[0].sortOrder;
    } else {
      return -1;
    }
  }
  get items() {
    return this._data;
  }
  /**
   * Returns a single value string. If feature has a single value, this value will be returned.
   * If it has multiple values, those values will be concatenated with a default separator and
   * returned in a single string. Values composing this string are sorted according
   * to each value's sort order.
   * NOTE: If object contains a single value and it is a number, it will be converted to a string.
   *
   * @returns {string} A single value string.
   */
  get value() {
    return this.values.join(this.constructor.joinSeparator);
  }
  /**
   * Returns a feature value, if Feature object contains a single value. If no value is stored,
   * returns `undefined`. If feature has more than one value, throws an error.
   * This method allows to avoid conversion of a value to the string type as is the case
   * with other methods.
   *
   * @returns {undefined|*} - A single value in a format in which it is stored or `undefined`
   *          if feature has no value.
   */
  get singleValue() {
    if (this._data.length === 0) return;
    if (this._data.length > 1) throw new Error(Feature.errMsgs.NO_SINGLE_VALUE);
    return this._data[0].value;
  }
  /**
   * Returns an array of string values of a feature, sorted according to each item's sort order.
   * If a feature contains a single feature, an array with one value will be returned.
   *
   * @returns {*[]} An array of values in a format in which they are stored in the Feature object.
   */
  get values() {
    return this._data.map((v) => v.value);
  }
  /**
   * Retrieves a value object by name. Can be used to update a value object directly.
   *
   * @param {string} featureValue - A feature value of an object to retrieve.
   */
  getValue(featureValue) {
    return this._data.find((v) => v.value === featureValue);
  }
  /**
   * Returns a number of feature values.
   *
   * @retrun {number] A quantity of feature values
   */
  get valQty() {
    return this._data.length;
  }
  get isEmpty() {
    return this.valQty === 0;
  }
  get isSingle() {
    return this.valQty === 1;
  }
  get isMultiple() {
    return this.valQty > 1;
  }
  /**
   * A string representation of a feature.
   *
   * @returns {string}
   */
  toString() {
    return this.value;
  }
  /**
   * Examines the feature for a specific value.
   *
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValue(value) {
    return this.values.includes(value);
  }
  /**
   * Checks if this feature has all value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValues(values) {
    let hasValues = true;
    for (const value of values) {
      hasValues = hasValues && this.hasValue(value);
    }
    return hasValues;
  }
  /**
   * Checks if this feature has some value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasSomeValues(values) {
    let hasValues = false;
    for (const value of values) {
      hasValues = hasValues || this.hasValue(value);
    }
    return hasValues;
  }
  get valuesUnrestricted() {
    return this.allowedValues.length === 0;
  }
  /**
   * Two features are considered fully equal if they are of the same type, have the same language,
   * and the same set of feature values in the same order.
   *
   * @param {Feature} feature - A GrmFtr object this feature should be compared with.
   * @returns {boolean} True if features are equal, false otherwise.
   */
  isEqual(feature) {
    return feature && this.type === feature.type && LanguageModelFactory.compareLanguages(this.languageID, feature.languageID) && this.value === feature.value;
  }
  /**
   * Adds a single new value to the existing feature object.
   * This function is chainable.
   *
   * @param {string} value - A feature value.
   * @param {number} sortOrder - A sort order.
   * @returns {Feature} - Self reference for chaining.
   */
  addValue(value, sortOrder = this.constructor.defaultSortOrder) {
    if (!this.hasValue(value)) {
      this._data.push({
        value,
        sortOrder
      });
      this.sort();
    } else {
      Logger.getInstance().warn(`Value "${value}" already exists. If you want to change it, use "getValue" to access it directly.`);
    }
    return this;
  }
  /**
   * Adds multiple new values to the existing feature object.
   * This function is chainable.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   * @returns {Feature} - Self reference for chaining.
   */
  addValues(data) {
    const normalizedData = this.constructor.dataValuesFromInput(data);
    const values = normalizedData.map((v) => v.value);
    if (!this.hasSomeValues(values)) {
      this._data = this._data.concat(normalizedData);
      this.sort();
    } else {
      Logger.getInstance().warn(`One or several values from "${values}" already exist. If you want to change it, use "getValue" to access a value directly.`);
    }
    return this;
  }
  /**
   * Removes a single value from the existing feature object.
   *
   * @param value
   */
  removeValue(value) {
    Logger.getInstance().warn("This feature is not implemented yet");
  }
  /**
     * Creates a new single value Feature object of the same type and same language,
  but with a different feature value.
  This can be used when one feature defines a type and it is necessary
  to create other items of the same type.
     *
     * @param {string} value - A value of a feature.
     * @param sortOrder
     * @param {number} sortOrder.
     * @returns {Feature} A new Ftr object.
     */
  createFeature(value, sortOrder = this.constructor.defaultSortOrder) {
    return new Feature(this.type, [[value, sortOrder]], this.languageID, this.sortOrder, this.allowedValues);
  }
  /**
   * Creates a multiple value Feature object of the same type and same language,
   * but with a different feature values.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations,
   * formatted according to rules described in a Ftr constructor.
   * @returns {Feature} A new Ftr object.
   */
  createFeatures(data) {
    return new Feature(this.type, data, this.languageID, this.sortOrder, this.allowedValues);
  }
  /**
   * Creates an array of Feature objects where each Feature object is matching one feature value
   * form the values of this object.
   * Useful when the current objects is a type feature and it is necessary to create an array
   * of Feature objects for the type from it.
   *
   * @returns {Feature[]} - An array of Feature objects. Each object represents one feature value
   * from the current object.
   */
  get ownFeatures() {
    return this.values.map((v) => new Feature(this.type, v, this.languageID, 1, this.allowedValues));
  }
  /**
   * Create a copy of the feature object.
   */
  getCopy() {
    const values = this._data.map((item) => [item.value, item.sortOrder]);
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues.slice());
  }
  /**
   * Adds an importer to the internal list.
   *
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter(importer = new FeatureImporter(), name = this.constructor.defaultImporterName) {
    if (!this.importers) {
      this.importers = /* @__PURE__ */ new Map();
    }
    this.importers.set(name, importer);
    return importer;
  }
  getImporter(name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`);
    }
    return this.importers.get(name);
  }
  /**
   * Adds feature values from the imported values.
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
   */
  addFromImporter(foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`);
    }
    const importer = this.importers.get(name);
    foreignData = this.constructor.dataValuesFromInput(foreignData);
    this._data.push(...foreignData.map((fv) => {
      return { value: importer.get(fv.value), sortOrder: fv.sortOrder };
    }));
    this.sort();
    return this;
  }
  /**
   * Creates a new feature of the same type and with the same language from the imported values.
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
   */
  createFromImporter(foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`);
    }
    const importer = this.importers.get(name);
    if (!Array.isArray(foreignData)) {
      foreignData = [foreignData];
    }
    let values = foreignData.map((fv) => importer.get(fv));
    values = values.reduce((acc, cv) => acc.concat(cv), []);
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues);
  }
  convertToJSONObject() {
    const data = this._data.map((dataItem) => [dataItem.value, dataItem.sortOrder]);
    return {
      type: this.type,
      languageCode: LanguageModelFactory.getLanguageCodeFromId(this.languageID),
      sortOrder: this.sortOrder,
      allowedValues: this.allowedValues,
      data
    };
  }
  static readObject(jsonObject) {
    const languageID = LanguageModelFactory.getLanguageIdFromCode(jsonObject.languageCode);
    return new Feature(jsonObject.type, jsonObject.data, languageID, jsonObject.sortOrder, jsonObject.allowedValues);
  }
}
Feature.errMsgs = {
  NO_SINGLE_VALUE: "More than one value stored"
};
class FeatureType {
  // TODO: value checking
  /**
   * Creates and initializes a Feature Type object.
   *
   * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
   * @param {string[] | string[][]} values - A list of allowed values for this feature type.
   * If an empty array is provided, there will be no
   * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
   * such as footnotes).
   * @param {string|symbol} language - A language of a feature type.
   */
  constructor(type, values, language) {
    if (!values || !Array.isArray(values)) {
      throw new Error("Values should be an array (or an empty array) of values.");
    }
    if (!language) {
      throw new Error("FeatureType constructor requires a language");
    }
    this.type = type;
    this.languageID = void 0;
    this.languageCode = void 0;
    ({ languageID: this.languageID, languageCode: this.languageCode } = LanguageModelFactory.getLanguageAttrs(language));
    this._orderIndex = [];
    this._orderLookup = {};
    for (const [index, value] of values.entries()) {
      this._orderIndex.push(value);
      if (Array.isArray(value)) {
        for (const element of value) {
          this[element] = new Feature(this.type, element, this.languageID);
          this._orderLookup[element] = index;
        }
      } else {
        this[value] = new Feature(this.type, value, this.languageID);
        this._orderLookup[value] = index;
      }
    }
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    Logger.getInstance().warn('Please use a "languageID" instead of a "language"');
    return this.languageCode;
  }
  /**
   * test to see if this FeatureType allows unrestricted values
   *
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue() {
    return this.orderedValues.length === 1 && this.orderedValues[0] === FeatureType.UNRESTRICTED_VALUE;
  }
  /**
   * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
   * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
   *
   * @param value
   * @param {int} sortOrder
   * @returns {Feature}
   */
  get(value, sortOrder = 1) {
    if (value) {
      return new Feature(this.type, [[value, sortOrder]], this.languageID);
    } else {
      throw new Error("A non-empty value should be provided.");
    }
  }
  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues(data) {
    return new Feature(this.type, data, this.languageID);
  }
  getFromImporter(importerName, value) {
    let mapped;
    try {
      mapped = this.importer[importerName].get(value);
    } catch (e) {
      mapped = this.get(value);
    }
    return mapped;
  }
  /**
   * Creates and returns a new importer with a specific name. If an importer with this name already exists,
   * an existing Importer object will be returned.
   *
   * @param {string} name - A name of an importer object
   * @returns {Importer} A new or existing Importer object that matches a name provided
   */
  addImporter(name) {
    if (!name) {
      throw new Error("Importer should have a non-empty name.");
    }
    this.importer = this.importer || {};
    this.importer[name] = this.importer[name] || new FeatureImporter();
    return this.importer[name];
  }
  /**
   * Return copies of all feature values as Feature objects in a sorted array, according to feature type's sort order.
   * For a similar function that returns strings instead of Feature objects see orderedValues().
   *
   * @returns {Feature[] | Feature[][]} Array of feature values sorted according to orderIndex.
   * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
   * an array of Feature objects will be returned instead of a single Feature object, as for single feature values.
   */
  get orderedFeatures() {
    return this.orderedValues.map((value) => new Feature(this.type, value, this.languageID));
  }
  /**
   * Return all feature values as strings in a sorted array, according to feature type's sort order.
   * This is a main method that specifies a sort order of the feature type. orderedFeatures() relies
   * on this method in providing a sorted array of feature values. If you want to create
   * a custom sort order for a particular feature type that will depend on some options that are not type-related,
   * create a wrapper around this function providing it with options arguments so it will be able to decide
   * in what order those features will be based on those arguments.
   * For a similar function that returns Feature objects instead of strings see orderedValues().
   *
   * @returns {string[]} Array of feature values sorted according to orderIndex.
   * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
   * an array of strings will be returned instead of a single strings, as for single feature values.
   */
  get orderedValues() {
    return this._orderIndex;
  }
  /**
   * Returns a lookup table for type values as:
   *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
   *  their order value will be the same.
   *
   * @returns {object}
   */
  get orderLookup() {
    return this._orderLookup;
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
   */
  set order(values) {
    if (!values || Array.isArray(values) && values.length === 0) {
      throw new Error("A non-empty list of values should be provided.");
    }
    if (!Array.isArray(values)) {
      values = [values];
    }
    for (const value of values) {
      if (Array.isArray(value)) {
        for (const element of value) {
          if (!this.hasOwnProperty(element.value)) {
            throw new Error('Trying to order an element with "' + element.value + '" value that is not stored in a "' + this.type + '" type.');
          }
          if (element.type !== this.type) {
            throw new Error('Trying to order an element with type "' + element.type + '" that is different from "' + this.type + '".');
          }
          if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
            throw new Error(`Trying to order an element with language "${element.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
          }
        }
      } else {
        if (!this.hasOwnProperty(value.value)) {
          throw new Error('Trying to order an element with "' + value.value + '" value that is not stored in a "' + this.type + '" type.');
        }
        if (value.type !== this.type) {
          throw new Error('Trying to order an element with type "' + value.type + '" that is different from "' + this.type + '".');
        }
        if (!LanguageModelFactory.compareLanguages(value.languageID, this.languageID)) {
          throw new Error(`Trying to order an element with language "${value.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
        }
      }
    }
    this._orderLookup = {};
    this._orderIndex = [];
    for (const [index, element] of values.entries()) {
      if (Array.isArray(element)) {
        let elements = [];
        for (const subElement of element) {
          this._orderLookup[subElement.value] = index;
          elements.push(subElement.value);
        }
        this._orderIndex[index] = elements;
      } else {
        this._orderLookup[element.value] = index;
        this._orderIndex[index] = element.value;
      }
    }
  }
}
FeatureType.UNRESTRICTED_VALUE = Symbol("unrestricted");
class InflectionGroupingKey {
  /**
   * @class
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {object} extras extra property name and value pairs used in the key
   */
  constructor(infl, features, extras = {}) {
    for (const feature of features) {
      this[feature] = infl[feature];
    }
    Object.assign(this, extras);
  }
  /**
     * checks if a feature with a specific value
  is included in the grouping key
     *
     * @returns {boolean} true if found, false if not
     * @param feature
     * @param value
     */
  hasFeatureValue(feature, value) {
    if (this.hasOwnProperty(feature)) {
      return this[feature].values.includes(value);
    }
    return false;
  }
  /**
   * Return this key as a string
   *
   * @returns {string} string representation of the key
   */
  toString() {
    let values = [];
    for (const prop of Object.getOwnPropertyNames(this).sort()) {
      const value = this[prop] instanceof Feature ? this[prop].values.sort().join(",") : this[prop];
      values.push(value);
    }
    return values.join(" ");
  }
}
class InflectionGroup {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   * @param sortKey
   */
  constructor(groupingKey, inflections = [], sortKey = null) {
    this.groupingKey = groupingKey;
    this.inflections = inflections;
  }
  /**
   * Add an Inflection or InflectionGroup to the group
   *
   * @param {Inflection|InflectionGroup} inflection
   */
  append(inflection) {
    this.inflections.push(inflection);
  }
}
class LanguageModel {
  constructor() {
    this.context_backward = LanguageModel.contextBackward;
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_LTR;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  /**
   * @deprecated
   */
  get contextForward() {
    Logger.getInstance().warn('Please use static "contextForward" instead');
    return this.constructor.contextForward;
  }
  /**
   * @deprecated
   */
  get contextBackward() {
    Logger.getInstance().warn('Please use static "contextBackward" instead');
    return this.constructor.contextBackward;
  }
  /**
   * @deprecated
   */
  get direction() {
    Logger.getInstance().warn('Please use static "direction" instead');
    return this.constructor.direction;
  }
  /**
   * @deprecated
   */
  get baseUnit() {
    Logger.getInstance().warn('Please use static "baseUnit" instead');
    return this.constructor.baseUnit;
  }
  /**
   * @deprecated
   */
  get features() {
    Logger.getInstance().warn('Please use individual "getFeatureType" or static "features" instead');
    return this.constructor.features;
  }
  /**
   * Returns a list of names of feature types that are defined in a language model.
   *
   * @returns {string[]} Names of features that are defined in a model.
   */
  static get featureNames() {
    return this.featureValues.keys();
  }
  /**
   * Returns a feature a `featureType` name that is defined for a language. It does not create a new Feature
   * object instance. It returns the one defined in a language model. To get a new instance of a Feature
   * object, use `getFeature` instead.
   * If no feature of `featureType` is defined in a language model, throws an error.
   *
   * @param {string} featureType - A feature type name.
   * @returns {Feature} A feature object of requested type.
   */
  static typeFeature(featureType) {
    if (this.typeFeatures.has(featureType)) {
      return this.typeFeatures.get(featureType);
    } else {
      throw new Error(`Type feature "${featureType}" is not defined within "${this}"`);
    }
  }
  /**
   * Returns a map with Feature objects of all features defined in a language. Use this method to get all
   * Feature objects defined in a language model.
   *
   * @returns {Map} Feature objects for all features defined within a language in a Map object. The key is
   * a feature type (a string), and the value is a Feature object.
   */
  static get typeFeatures() {
    Logger.getInstance().warn("This getter must be defined in a descendant class");
  }
  static get features() {
    let features = {};
    for (const featureName of this.featureNames) {
      features[featureName] = this.getFeature(featureName);
    }
    return features;
  }
  static get languageID() {
    return LANG_UNDEFINED;
  }
  static get languageCode() {
    return STR_LANG_CODE_UNDEFINED;
  }
  /**
   * Returns an array of language codes that represents the language.
   *
   * @returns {string[]} An array of language codes that matches the language.
   */
  static get languageCodes() {
    return [];
  }
  static get codes() {
    Logger.getInstance().warn('Use static "languageCodes" instead');
    return this.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes() {
    Logger.getInstance().warn('Please use a static version of "codes" instead');
    return this.constructor.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  toCode() {
    Logger.getInstance().warn('Please use a static "languageCode" instead');
    return this.constructor.languageCode;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  static toCode() {
    Logger.getInstance().warn('Please use a static "languageCode" instead');
    return this.languageCode;
  }
  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues() {
    return /* @__PURE__ */ new Map([
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
        Feature.types.number,
        [
          NUM_SINGULAR,
          NUM_PLURAL
        ]
      ],
      [
        Feature.types.age,
        []
      ],
      [
        Feature.types.area,
        []
      ],
      [
        Feature.types.source,
        []
      ],
      [
        Feature.types.frequency,
        []
      ],
      [
        Feature.types.geo,
        []
      ],
      [
        Feature.types.pronunciation,
        []
      ],
      [
        Feature.types.kind,
        []
      ],
      [
        Feature.types.comparison,
        []
      ],
      [
        Feature.types.morph,
        []
      ],
      [
        Feature.types.stemtype,
        []
      ],
      [
        Feature.types.derivtype,
        []
      ]
    ]);
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage() {
    Logger.getInstance().warn("Please use languageID directly");
    return this.languageID;
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage() {
    Logger.getInstance().warn("Please use languageID directly");
    return this.constructor.languageID;
  }
  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType(name) {
    Logger.getInstance().warn("Please use getFeature instead");
    const featureValues = this.featureValues;
    if (featureValues.has(name)) {
      return new FeatureType(name, featureValues.get(name), this.languageID);
    } else {
      throw new Error(`Feature "${name}" is not defined`);
    }
  }
  /**
   * Returns a new instance of a feature with `featureType`. It uses a feature defined in a language model
   * as a master.
   *
   * @param {string} featureType - A name of a feature type.
   * @returns {Feature} - A newly created Feature object.
   */
  static getFeature(featureType) {
    const featureValues = this.featureValues;
    if (featureValues.has(featureType)) {
      const allowedValues = featureValues.get(featureType);
      return new Feature(featureType, allowedValues, this.languageID, 1, allowedValues);
    } else {
      throw new Error(`Feature "${featureType}" is not defined`);
    }
  }
  _initializeFeatures() {
    const features = {};
    for (const featureName of this.constructor.featureValues.keys()) {
      features[featureName] = this.constructor.getFeature(featureName);
    }
    return features;
  }
  /**
   * @deprecated
   */
  grammarFeatures() {
    Logger.getInstance().warn('Please use a static version of "grammarFeatures" instead');
    return this.constructor.grammarFeatures();
  }
  /**
   * Identify the morphological features which should be linked to a grammar.
   *
   * @returns {string[]} Array of Feature types
   */
  static grammarFeatures() {
    return [];
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   * @returns {boolean}
   */
  static canInflect(node) {
    return false;
  }
  /**
   * Check to see if the supplied language code is supported by this tool
   *
   * @param {string} code - The language code
   * @returns {boolean} - True if supported, false if not
   */
  static supportsLanguage(code) {
    return this.languageCodes.includes[code];
  }
  /**
   * Checks if the word provided has a trailing digit (e.g. αἴγυπτος1 in Greek).
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word has a trailing digit, false otherwise.
   */
  static hasTrailingDigit(word) {
    return /^.+\d$/.test(word);
  }
  /**
   * Morphological parsers and dictionary indexes may add a trailing digit to disambiguate homonyms.
   * These can be ignored for purposes of string comparison.
   *
   * @param {string} word - A word to normalize.
   * @returns {string} A normalized word.
   */
  static normalizeTrailingDigit(word) {
    return /^.+\d$/.test(word) ? word.substring(0, word.length - 1) : word;
  }
  /**
   * Checks if the word provided is in a normalized form.
   * It also checks if the word has the right single quotation (elision).
   *
   * @see {@link GreekLanguageModel#normalizeText}
   * @param {string} text - A word or a text string to be checked.
   * @returns {boolean} - True if at least one character of the word
   * is NOT in an Unicode Normalization Form, false otherwise.
   */
  static needsNormalization(text) {
    return Boolean(text.localeCompare(this.normalizeText(text)));
  }
  /**
   * Checks if the word provided has any letters in an upper case.
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word at least one letter in upper case, false if all letters are lower case.
   */
  static hasUpperCase(word) {
    return Boolean(word.localeCompare(word.toLocaleLowerCase()));
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} word the source word
   * @returns {string} Normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   */
  static normalizeText(word) {
    return word;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(lexeme) {
    return lexeme.lemma.features[Feature.types.part] ? lexeme.lemma.features[Feature.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(featureType, featureValue) {
    return featureValue;
  }
  /**
   * Returns alternate encodings for a word
   *
   * @param {object} params - A parameters object.
   * @param {string} params.word - The word.
   * @param {string} [params.preceding=null] - A preceding word (optional).
   * @param {string} [params.following=null] - A following word (optional).
   * @param {string} [params.encoding=null] - Encoding name to filter the response to (optional).
   * @param {boolean} [params.preserveCase=false] - If true will preserve the case (default is false).
   * @param {boolean} [params.includeOriginal=false] - If true will include the original word even if it is unchanged (default is false).
   * @returns {Array} an array of alternate encodings if they differ from the original
   */
  static alternateWordEncodings({
    word = null,
    preceding = null,
    following = null,
    encoding = null,
    preserveCase = false,
    includeOriginal = false
  } = {}) {
    return includeOriginal ? [word] : [];
  }
  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords(wordA, wordB, normalize = true, options = {}) {
    if (normalize) {
      wordA = this.normalizeTrailingDigit(wordA);
      wordB = this.normalizeTrailingDigit(wordB);
      return this.normalizeText(wordA) === this.normalizeText(wordB);
    } else {
      return wordA === wordB;
    }
  }
  /**
   * Compare two feature values with language specific logic
   *
   * @param {string} featureType - the feature type being compared
   * @param {string} valueA - the first value for comparison
   * @param {string} valueB - the second value for comparison
   * @param {object} options
   * @param {boolean} options.normalize - whether or not to apply normalization
   */
  static compareFeatureValue(featureType, valueA, valueB, { normalize = true } = {}) {
    if (normalize) {
      valueA = this.normalizeFeatureValue(featureType, valueA);
      valueB = this.normalizeFeatureValue(featureType, valueB);
    }
    return valueA === valueB;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `\\-\\.,;:!?'"(){}\\[\\]<>\\ ‐‑‒–—―‘’†‡“”··
\r`;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  getPunctuation() {
    Logger.getInstance().warn('Please use a static version of "getPunctuation"');
    return this.constructor.getPunctuation();
  }
  toString() {
    return String(this.constructor.languageCode);
  }
  isEqual(model) {
    return LanguageModelFactory.compareLanguages(this.languageID, model.languageID);
  }
  /*
  There are two types of language identificators: language IDs and language code. Language ID is a symbol constant
  defined in constants.js, such as LANG_LATIN or LANG_GREEK. Language code is a string containing (usually)
  a three-letter language codes such as 'lat' or 'la' for latin. There can be multiple language codes that identify
  the same language, but there is only one unique language ID for each language.
   */
  /**
   * Checks whether a language has a particular language code in its list of codes
   *
   * @param {string} languageCode - A language code to check
   * @returns {boolean} Whether this language code exists in a language code list
   */
  static hasCode(languageCode) {
    if (this.isLanguageCode(languageCode)) {
      return this.languageCodes.includes(languageCode);
    } else {
      throw new Error(`Format of a "${languageCode}" is incorrect`);
    }
  }
  /**
   * Tests wither a provided language identificator is a language ID.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID(language) {
    return typeof language === "symbol";
  }
  /**
   * Tests wither a provided language identificator is a language code.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode(language) {
    return !LanguageModel.isLanguageID(language);
  }
  /**
   * @deprecated
   * @param node
   */
  canInflect(node) {
    Logger.getInstance().warn('Please use a static version of "canInflect" instead');
    return this.constructor.canInflect(node);
  }
  /**
   * Groups a set of inflections according to a language-specific display paradigm
     The default groups according to the following logic:
     1. groups of groups with unique stem, prefix, suffix, part of speech, declension, dialect and comparison
     2. groups of those groups with unique
     number, if it's an inflection with a grammatical case
     tense, if it's an inflection with tense but no case (i.e. a verb)
     verbs without tense or case
     adverbs
     everything else
     3. groups of those groups with unique voice and tense
     4. groups of inflections with unique gender, person, mood, and sort
   *
   * @param inflections
   */
  static groupInflectionsForDisplay(inflections) {
    let grouped = /* @__PURE__ */ new Map();
    const aggregated = this.aggregateInflectionsForDisplay(inflections);
    for (const infl of aggregated) {
      const groupingKey = new InflectionGroupingKey(
        infl,
        [Feature.types.part, Feature.types.declension, Feature.types.dialect, Feature.types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      );
      const groupingKeyStr = groupingKey.toString();
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl);
      } else {
        grouped.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
      }
    }
    for (const kv of grouped) {
      const inflgrp = /* @__PURE__ */ new Map();
      for (const infl of kv[1].inflections) {
        let keyprop;
        let isCaseInflectionSet = false;
        if (infl[Feature.types.grmCase]) {
          keyprop = Feature.types.number;
          isCaseInflectionSet = true;
        } else if (infl[Feature.types.tense]) {
          keyprop = Feature.types.tense;
        } else if (infl[Feature.types.part] === POFS_VERB) {
          keyprop = Feature.types.part;
        } else if (infl[Feature.types.part] === POFS_ADVERB) {
          keyprop = Feature.types.part;
        } else {
          keyprop = "misc";
        }
        const groupingKey = new InflectionGroupingKey(infl, [keyprop], { isCaseInflectionSet });
        const groupingKeyStr = groupingKey.toString();
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl);
        } else {
          inflgrp.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
        }
      }
      for (const kv2 of inflgrp) {
        const nextGroup = /* @__PURE__ */ new Map();
        const sortOrder = /* @__PURE__ */ new Map();
        for (const infl of kv2[1].inflections) {
          const sortkey = infl[Feature.types.grmCase] ? Math.max(infl[Feature.types.grmCase].items.map((f) => f.sortOrder)) : 1;
          const groupingKey = new InflectionGroupingKey(infl, [Feature.types.tense, Feature.types.voice]);
          const groupingKeyStr = groupingKey.toString();
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl);
          } else {
            nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl], sortkey));
            sortOrder.set(groupingKeyStr, sortkey);
          }
        }
        kv2[1].inflections = [];
        const sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            const orderA = sortOrder.get(a);
            const orderB = sortOrder.get(b);
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0;
          }
        );
        for (const groupkey of sortedKeys) {
          kv2[1].inflections.push(nextGroup.get(groupkey));
        }
      }
      for (const kv2 of inflgrp) {
        const groups = kv2[1];
        for (const group of groups.inflections) {
          let nextGroup = /* @__PURE__ */ new Map();
          for (const infl of group.inflections) {
            const groupingKey = new InflectionGroupingKey(
              infl,
              [
                Feature.types.grmCase,
                Feature.types.comparison,
                Feature.types.gender,
                Feature.types.number,
                Feature.types.person,
                Feature.types.tense,
                Feature.types.mood,
                Feature.types.voice
              ]
            );
            const groupingKeyStr = groupingKey.toString();
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl);
            } else {
              nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
            }
          }
          group.inflections = Array.from(nextGroup.values());
        }
      }
      kv[1].inflections = Array.from(inflgrp.values());
    }
    return Array.from(grouped.values());
  }
  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param {Inflection[]} inflections an array of inflections
   * @returns Inflection[] the aggregated inflections
   */
  static aggregateInflectionsForDisplay(inflections) {
    return inflections;
  }
  /**
   * @deprecated
   * @param inflections
   * @returns {*}
   */
  groupInflectionsForDisplay(inflections) {
    Logger.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead');
    return this.constructor.groupInflectionsForDisplay(inflections);
  }
}
let typeFeatures$6 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$6 = false;
class LatinLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_LATIN;
  }
  static get languageCode() {
    return STR_LANG_CODE_LAT;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_LA, STR_LANG_CODE_LAT];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_LTR;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get featureValues() {
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
    ]);
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$6) {
      this.initTypeFeatures();
    }
    return typeFeatures$6;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$6.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$6 = true;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.conjugation];
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(node) {
    return true;
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or a text string
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  static normalizeText(text) {
    if (text) {
      text = text.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, "A");
      text = text.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, "E");
      text = text.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, "I");
      text = text.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, "O");
      text = text.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, "U");
      text = text.replace(/[\u00c6\u01e2]/g, "AE");
      text = text.replace(/[\u0152]/g, "OE");
      text = text.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, "a");
      text = text.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, "e");
      text = text.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, "i");
      text = text.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, "o");
      text = text.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, "u");
      text = text.replace(/[\u00e6\u01e3]/g, "ae");
      text = text.replace(/[\u0153]/g, "oe");
    }
    return text;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(featureType, featureValue) {
    if (featureType === Feature.types.mood && featureValue === MOOD_GERUNDIVE) {
      return MOOD_PARTICIPLE;
    } else if (featureType === Feature.types.part && featureValue === POFS_EXCLAMATION) {
      return POFS_INTERJECTION;
    } else {
      return featureValue;
    }
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(lexeme) {
    if (lexeme.lemma.features[Feature.types.part]) {
      if (lexeme.lemma.features[Feature.types.part].value === POFS_EXCLAMATION) {
        return POFS_INTERJECTION;
      } else {
        return lexeme.lemma.features[Feature.types.part].value;
      }
    } else {
      return null;
    }
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\ ‐‑‒–—―‘’†‡“”··
\r‌‍`;
  }
  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints(inflection) {
    let grammar = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    };
    if (inflection.hasOwnProperty(Feature.types.part)) {
      if ([POFS_VERB, POFS_VERB_PARTICIPLE, POFS_SUPINE, POFS_GERUNDIVE].includes(inflection[Feature.types.part].value)) {
        grammar.fullFormBased = true;
        grammar.suffixBased = true;
      } else if (inflection[Feature.types.part].value === POFS_PRONOUN) {
        grammar.fullFormBased = true;
      } else {
        grammar.suffixBased = true;
      }
    } else {
      Logger.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", inflection[Feature.types.part]);
    }
    return grammar;
  }
}
class GreekChars {
  static get chars() {
    return [
      "`",
      "¨",
      "¯",
      "´",
      "ʼ",
      "ʽ",
      "˘",
      "ͅ",
      "Ά",
      "Έ",
      "Ή",
      "Ί",
      "Ό",
      "Ύ",
      "Ώ",
      "ΐ",
      "Α",
      "Β",
      "Γ",
      "Δ",
      "Ε",
      "Ζ",
      "Η",
      "Θ",
      "Ι",
      "Κ",
      "Λ",
      "Μ",
      "Ν",
      "Ξ",
      "Ο",
      "Π",
      "Ρ",
      "Σ",
      "Τ",
      "Υ",
      "Φ",
      "Χ",
      "Ψ",
      "Ω",
      "Ϊ",
      "Ϋ",
      "ά",
      "έ",
      "ή",
      "ί",
      "ΰ",
      "α",
      "β",
      "γ",
      "δ",
      "ε",
      "ζ",
      "η",
      "θ",
      "ι",
      "κ",
      "λ",
      "μ",
      "ν",
      "ξ",
      "ο",
      "π",
      "ρ",
      "ς",
      "σ",
      "τ",
      "υ",
      "φ",
      "χ",
      "ψ",
      "ω",
      "ϊ",
      "ϋ",
      "ό",
      "ύ",
      "ώ",
      "Ϝ",
      "ϝ",
      "ἀ",
      "ἁ",
      "ἂ",
      "ἃ",
      "ἄ",
      "ἅ",
      "ἆ",
      "ἇ",
      "Ἀ",
      "Ἁ",
      "Ἂ",
      "Ἃ",
      "Ἄ",
      "Ἅ",
      "Ἆ",
      "Ἇ",
      "ἐ",
      "ἑ",
      "ἒ",
      "ἓ",
      "ἔ",
      "ἕ",
      "Ἐ",
      "Ἑ",
      "Ἒ",
      "Ἓ",
      "Ἔ",
      "Ἕ",
      "ἠ",
      "ἡ",
      "ἢ",
      "ἣ",
      "ἤ",
      "ἥ",
      "ἦ",
      "ἧ",
      "Ἠ",
      "Ἡ",
      "Ἢ",
      "Ἣ",
      "Ἤ",
      "Ἥ",
      "Ἦ",
      "Ἧ",
      "ἰ",
      "ἱ",
      "ἲ",
      "ἳ",
      "ἴ",
      "ἵ",
      "ἶ",
      "ἷ",
      "Ἰ",
      "Ἱ",
      "Ἲ",
      "Ἳ",
      "Ἴ",
      "Ἵ",
      "Ἶ",
      "Ἷ",
      "ὀ",
      "ὁ",
      "ὂ",
      "ὃ",
      "ὄ",
      "ὅ",
      "Ὀ",
      "Ὁ",
      "Ὂ",
      "Ὃ",
      "Ὄ",
      "Ὅ",
      "ὐ",
      "ὑ",
      "ὒ",
      "ὓ",
      "ὔ",
      "ὕ",
      "ὖ",
      "ὗ",
      "Ὑ",
      "Ὓ",
      "Ὕ",
      "Ὗ",
      "ὠ",
      "ὡ",
      "ὢ",
      "ὣ",
      "ὤ",
      "ὥ",
      "ὦ",
      "ὧ",
      "Ὠ",
      "Ὡ",
      "Ὢ",
      "Ὣ",
      "Ὤ",
      "Ὥ",
      "Ὦ",
      "Ὧ",
      "ὰ",
      "ά",
      "ὲ",
      "έ",
      "ὴ",
      "ή",
      "ὶ",
      "ί",
      "ὸ",
      "ό",
      "ὺ",
      "ύ",
      "ὼ",
      "ώ",
      "ᾀ",
      "ᾁ",
      "ᾂ",
      "ᾃ",
      "ᾄ",
      "ᾅ",
      "ᾆ",
      "ᾇ",
      "ᾈ",
      "ᾉ",
      "ᾊ",
      "ᾋ",
      "ᾌ",
      "ᾍ",
      "ᾎ",
      "ᾏ",
      "ᾐ",
      "ᾑ",
      "ᾒ",
      "ᾓ",
      "ᾔ",
      "ᾕ",
      "ᾖ",
      "ᾗ",
      "ᾘ",
      "ᾙ",
      "ᾚ",
      "ᾛ",
      "ᾜ",
      "ᾝ",
      "ᾞ",
      "ᾟ",
      "ᾠ",
      "ᾡ",
      "ᾢ",
      "ᾣ",
      "ᾤ",
      "ᾥ",
      "ᾦ",
      "ᾧ",
      "ᾨ",
      "ᾩ",
      "ᾪ",
      "ᾫ",
      "ᾬ",
      "ᾭ",
      "ᾮ",
      "ᾯ",
      "ᾰ",
      "ᾱ",
      "ᾲ",
      "ᾳ",
      "ᾴ",
      "ᾶ",
      "ᾷ",
      "Ᾰ",
      "Ᾱ",
      "Ὰ",
      "Ά",
      "ᾼ",
      "᾽",
      "ι",
      "῀",
      "῁",
      "ῂ",
      "ῃ",
      "ῄ",
      "ῆ",
      "ῇ",
      "Ὲ",
      "Έ",
      "Ὴ",
      "Ή",
      "ῌ",
      "῍",
      "῎",
      "῏",
      "ῐ",
      "ῑ",
      "ῒ",
      "ΐ",
      "ῖ",
      "ῗ",
      "Ῐ",
      "Ῑ",
      "Ὶ",
      "Ί",
      "῝",
      "῞",
      "῟",
      "ῠ",
      "ῡ",
      "ῢ",
      "ΰ",
      "ῤ",
      "ῥ",
      "ῦ",
      "ῧ",
      "Ῠ",
      "Ῡ",
      "Ὺ",
      "Ύ",
      "Ῥ",
      "῭",
      "΅",
      "ῲ",
      "ῳ",
      "ῴ",
      "ῶ",
      "ῷ",
      "Ὸ",
      "Ό",
      "Ὼ",
      "Ώ",
      "ῼ"
    ];
  }
}
let typeFeatures$5 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$5 = false;
class GreekLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_GREEK;
  }
  static get languageCode() {
    return STR_LANG_CODE_GRC;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_GRC];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_LTR;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get featureValues() {
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
          "attic",
          "epic",
          "doric"
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$5) {
      this.initTypeFeatures();
    }
    return typeFeatures$5;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$5.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$5 = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(node) {
    return true;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [Feature.types.part, Feature.types.grmCase, Feature.types.mood, Feature.types.declension, Feature.types.tense, Feature.types.voice];
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or the source text
   * @returns {string} the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type string
   */
  static normalizeText(text) {
    if (text) {
      text = text.normalize("NFC");
      text = text.replace(/\u2019$/, "᾽");
    }
    return text;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   *                   or null if no part of speech data is present on the lexeme
   */
  static normalizePartOfSpeechValue(lexeme) {
    if (lexeme.lemma.features[Feature.types.part]) {
      if (lexeme.lemma.features[Feature.types.part].value === POFS_PARTICLE) {
        return POFS_ADVERB;
      } else if (lexeme.lemma.features[Feature.types.part].value === POFS_EXCLAMATION) {
        return POFS_INTERJECTION;
      } else {
        return lexeme.lemma.features[Feature.types.part].value;
      }
    } else {
      return null;
    }
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(featureType, featureValue) {
    if (featureType === Feature.types.part && featureValue === POFS_PARTICLE) {
      return POFS_ADVERB;
    } else if (featureType === Feature.types.part && featureValue === POFS_EXCLAMATION) {
      return POFS_INTERJECTION;
    } else {
      return featureValue;
    }
  }
  static _tonosToOxia(word) {
    return word.replace(
      /\u{03AC}/ug,
      "ά"
    ).replace(
      // alpha
      /\u{03AD}/ug,
      "έ"
    ).replace(
      // epsilon
      /\u{03AE}/ug,
      "ή"
    ).replace(
      // eta
      /\u{03AF}/ug,
      "ί"
    ).replace(
      // iota
      /\u{03CC}/ug,
      "ό"
    ).replace(
      // omicron
      /\u{03CD}/ug,
      "ύ"
    ).replace(
      // upsilon
      /\u{03CE}/ug,
      "ώ"
    ).replace(
      // omega
      /\u{0390}/ug,
      "ΐ"
    ).replace(
      // iota with dialytika and tonos
      /\u{03B0}/ug,
      "ΰ"
    );
  }
  /**
   * @override
   */
  static alternateWordEncodings({
    word = null,
    preceding = null,
    following = null,
    encoding = null,
    preserveCase = false,
    includeOriginal = false
  } = {}) {
    if (!word) {
      return [];
    }
    let normalized = GreekLanguageModel.normalizeText(word);
    if (!preserveCase) {
      normalized = normalized.toLocaleLowerCase();
    }
    const strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug,
      "α"
    ).replace(
      /[\u{1FB8}\u{1FB9}]/ug,
      "Α"
    ).replace(
      /[\u{1FD0}\u{1FD1}]/ug,
      "ι"
    ).replace(
      /[\u{1FD8}\u{1FD9}]/ug,
      "Ι"
    ).replace(
      /[\u{1FE0}\u{1FE1}]/ug,
      "υ"
    ).replace(
      /[\u{1FE8}\u{1FE9}]/ug,
      "Υ"
    ).replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug,
      ""
    );
    const tonosToOxia = GreekLanguageModel._tonosToOxia(normalized);
    const strippedDiaeresis = normalized.replace(
      /\u{0390}/ug,
      "ί"
    ).replace(
      /\u{03AA}/ug,
      "Ι"
    ).replace(
      /\u{03AB}/ug,
      "Υ"
    ).replace(
      /\u{03B0}/ug,
      "ύ"
    ).replace(
      /\u{03CA}/ug,
      "ι"
    ).replace(
      /\u{03CB}/ug,
      "υ"
    ).replace(
      /\u{1FD2}/ug,
      "ὶ"
    ).replace(
      /\u{1FD3}/ug,
      "ί"
    ).replace(
      /\u{1FD7}/ug,
      "ῖ"
    ).replace(
      /\u{1FE2}/ug,
      "ὺ"
    ).replace(
      /\u{1FE3}/ug,
      "ύ"
    ).replace(
      /\u{1FE7}/ug,
      "ῦ"
    ).replace(
      /\u{1FC1}/ug,
      "῀"
    ).replace(
      /\u{1FED}/ug,
      "`"
    ).replace(
      /\u{1FEE}/ug,
      "´"
    ).replace(
      /[\u{00A8}\u{0308}]/ug,
      ""
    );
    const strippedDiacritics = normalized.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug,
      ""
    ).normalize("NFC");
    let alternates = [];
    if (encoding === "strippedDiaeresis") {
      alternates.push(strippedDiaeresis);
    } else if (encoding === "strippedDiacritics") {
      alternates.push(strippedDiacritics);
    } else if (encoding === "strippedAll") {
      alternates.push(strippedDiaeresis.normalize("NFD").replace(
        /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug,
        ""
      ).normalize("NFC"));
    } else {
      alternates.push(strippedVowelLength);
      if (tonosToOxia !== strippedVowelLength) {
        alternates.push(tonosToOxia);
      }
    }
    if (!includeOriginal) {
      alternates = alternates.filter((w) => w !== word);
    }
    return alternates;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return '.,;:!?"(){}\\[\\]<>\\ ‐‑‒–—―‘†‡“”··\n\r‌‍';
  }
  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints(inflection) {
    const constraints = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    };
    const formBasedList = [POFS_PRONOUN, POFS_NUMERAL, POFS_ARTICLE];
    if (inflection.hasOwnProperty(Feature.types.part)) {
      if (formBasedList.includes(inflection[Feature.types.part].value)) {
        constraints.fullFormBased = true;
      } else {
        constraints.suffixBased = true;
      }
    } else {
      Logger.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", inflection[Feature.types.part]);
    }
    constraints.pronounClassRequired = LanguageModelFactory.compareLanguages(GreekLanguageModel.languageID, inflection.languageID) && inflection.hasOwnProperty(Feature.types.part) && // eslint-disable-line no-prototype-builtins
    inflection[Feature.types.part].value === POFS_PRONOUN;
    return constraints;
  }
  /**
   * Determines a class of a given word (pronoun) by finding a matching word entry(ies)
   * in a pronoun source info (`forms`) and getting a single or multiple classes of those entries.
   * Some morphological analyzers provide class information that is unreliable or do not
   * provide class information at all. However, class information is essential in
   * deciding in what table should pronouns be grouped. For this, we have to
   * determine pronoun classes using this method.
   *
   * @param {Form[]} forms - An array of known forms of pronouns.
   * @param {string} word - A word we need to find a matching class for.
   * @param hdwd
   * @param {boolean} normalize - Whether normalized forms of words shall be used for comparison.
   * @returns {Feature} Matching classes found within a Feature objects. If no matching classes found,
   * returns undefined.
   */
  static getPronounClasses(forms, word, hdwd, normalize = true) {
    let matchingValues = /* @__PURE__ */ new Set();
    const matchingForms = forms.filter(
      (form) => {
        let match = false;
        if (form.value && (!form.features[Feature.types.hdwd] || form.features[Feature.types.hdwd].value === hdwd)) {
          match = GreekLanguageModel.compareWords(form.value, word, normalize);
        }
        return match;
      }
    );
    for (const matchingForm of matchingForms) {
      if (matchingForm.features.hasOwnProperty(Feature.types.grmClass)) {
        for (const value of matchingForm.features[Feature.types.grmClass].values) {
          matchingValues.add(value);
        }
      }
    }
    if (matchingValues.size > 0) {
      return new Feature(Feature.types.grmClass, Array.from(matchingValues), GreekLanguageModel.languageID);
    }
  }
  /**
   * Checks if two words are equivalent.
   *
   * @override
   * @param {string} wordA - a first word to be compared.
   * @param {string} wordB - a second word to be compared.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * with an `alternateWordEncodings()` function.
   * @param {object} options - Additional comparison criteria.
   * @param {boolean} options.normalizeTrailingDigit - whether to consider the form
   * of a trailing digit during comparison.
   */
  static compareWords(wordA, wordB, normalize = true, { normalizeTrailingDigit = false } = {}) {
    let matched = false;
    if (normalize) {
      if (normalizeTrailingDigit) {
        wordA = this.normalizeTrailingDigit(wordA);
        wordB = this.normalizeTrailingDigit(wordB);
      }
      const altWordA = GreekLanguageModel.alternateWordEncodings({
        word: wordA,
        encoding: "strippedDiacritics",
        includeOriginal: true
      });
      const altWordB = GreekLanguageModel.alternateWordEncodings({
        word: wordB,
        encoding: "strippedDiacritics",
        includeOriginal: true
      });
      for (let i = 0; i < altWordA.length; i++) {
        matched = altWordA[i] === altWordB[i];
        if (matched) {
          break;
        }
      }
      if (!matched) {
        matched = GreekLanguageModel.normalizeText(wordA) === GreekLanguageModel.normalizeText(wordB);
      }
    } else {
      matched = wordA === wordB;
    }
    return matched;
  }
  static isValidUnicode(word) {
    return GreekChars.chars.some((char) => word.includes(char));
  }
}
const typeFeatures$4 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$4 = false;
class ArabicLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_ARABIC;
  }
  static get languageCode() {
    return STR_LANG_CODE_ARA;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_ARA, STR_LANG_CODE_AR];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_RTL;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$4) {
      this.initTypeFeatures();
    }
    return typeFeatures$4;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$4.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$4 = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(node) {
    return false;
  }
  /**
   * @override
   */
  static alternateWordEncodings({
    word = null,
    preceding = null,
    following = null,
    encoding = null,
    preserveCase = false,
    includeOriginal = false
  } = {}) {
    const tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, "");
    const hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, "ا");
    const harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, "");
    const shadda = harakat.replace(/\u{0651}/ug, "");
    const sukun = shadda.replace(/\u{0652}/ug, "");
    const alef = sukun.replace(/\u{0627}/ug, "");
    const alternates = /* @__PURE__ */ new Map([
      ["tanwin", tanwin],
      ["hamza", hamza],
      ["harakat", harakat],
      ["shadda", shadda],
      ["sukun", sukun],
      ["alef", alef]
    ]);
    let fullList = [];
    if (encoding !== null && alternates.has(encoding)) {
      fullList = [alternates.get(encoding)];
    } else {
      fullList = Array.from(alternates.values());
    }
    if (!includeOriginal) {
      fullList = fullList.filter((w) => w !== word);
    }
    return fullList;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\ ‐‑‒–—―‘’†‡“”··
\r‌‍`;
  }
  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param inflections
   */
  static aggregateInflectionsForDisplay(inflections) {
    let aggregated = [];
    let aggregates = { [POFS_NOUN]: [], [POFS_ADJECTIVE]: [], [POFS_NOUN_PROPER]: [] };
    for (const infl of inflections) {
      if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/ADJ[uaiNK]/)) {
        aggregates[POFS_ADJECTIVE].push(infl);
      } else if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/NOUN[uaiNK]/)) {
        aggregates[POFS_NOUN].push(infl);
      } else if (infl[Feature.types.morph] && infl[Feature.types.morph].value.match(/NOUN_PROP[uaiNK]/)) {
        aggregates[POFS_NOUN_PROPER].push(infl);
      } else {
        infl.example = null;
        aggregated.push(infl);
      }
    }
    for (const type of Object.keys(aggregates)) {
      const base = aggregated.filter((i) => i[Feature.types.part].value === type);
      if (base.length !== 1) {
        aggregated.push(...aggregates[type]);
      }
    }
    return aggregated;
  }
}
let typeFeatures$3 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$3 = false;
class PersianLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_PERSIAN;
  }
  static get languageCode() {
    return STR_LANG_CODE_PER;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_PER, STR_LANG_CODE_FAS, STR_LANG_CODE_FA, STR_LANG_CODE_FA_IR];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_RTL;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$3) {
      this.initTypeFeatures();
    }
    return typeFeatures$3;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$3.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$3 = true;
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(node) {
    return false;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `\\-\\.,;:!?'"(){}\\[\\]<>\\ ‐‑‒–—―‘’†‡“”··
\r‌‍`;
  }
}
const typeFeatures$2 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$2 = false;
class GeezLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_GEEZ;
  }
  static get languageCode() {
    return STR_LANG_CODE_GEZ;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_GEZ];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_LTR;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get featureValues() {
    return new Map([
      ...LanguageModel.featureValues,
      [
        Feature.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        Feature.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        Feature.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        Feature.types.mood,
        [
          // TODO Valid Values for mood for gez
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$2) {
      this.initTypeFeatures();
    }
    return typeFeatures$2;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$2.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$2 = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(node) {
    return false;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `፡፨።፣፤፥፦፧፠,;:!?'"(){}\\[\\]<>\\ ‐‑‒–—―‘’†‡“”··
\r‌‍`;
  }
}
let typeFeatures$1 = /* @__PURE__ */ new Map();
let typeFeaturesInitialized$1 = false;
class ChineseLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_CHINESE;
  }
  static get languageCode() {
    return STR_LANG_CODE_ZHO;
  }
  static get languageCodes() {
    return [
      STR_LANG_CODE_ZH,
      STR_LANG_CODE_ZHO,
      STR_LANG_CODE_ZH_HANT,
      STR_LANG_CODE_ZH_HANS
    ];
  }
  static get contextForward() {
    return 5;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_LTR;
  }
  static get baseUnit() {
    return LANG_UNIT_CHAR;
  }
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        Feature.types.fullForm,
        []
      ],
      [
        Feature.types.frequency,
        []
      ],
      [
        Feature.types.pronunciation,
        []
      ],
      [
        Feature.types.radical,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized$1) {
      this.initTypeFeatures();
    }
    return typeFeatures$1;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures$1.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized$1 = true;
  }
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\
\r，、。「」《》‌‍†‡`;
  }
  static _isVowel(aLetter) {
    return ["a", "e", "i", "o", "u"].includes(aLetter);
  }
  static formatPinyin(aPinyin) {
    const _a = ["ā", "á", "ǎ", "à", "a"];
    const _e = ["ē", "é", "ě", "è", "e"];
    const _i = ["ī", "í", "ǐ", "ì", "i"];
    const _o = ["ō", "ó", "ǒ", "ò", "o"];
    const _u = ["ū", "ú", "ǔ", "ù", "u"];
    const _v = ["ǖ", "ǘ", "ǚ", "ǜ", "ü"];
    aPinyin = aPinyin.split(/(\d)/).map((el) => el.trim()).filter((el) => Boolean(el));
    let formatedPinyin = [];
    const toneFormat = {
      1: 0,
      2: 1,
      3: 2,
      4: 3
    };
    for (let j = 0; j < aPinyin.length; j++) {
      if (j % 2 === 0) {
        let pin = aPinyin[j];
        const tone = toneFormat[aPinyin[j + 1]] !== void 0 ? toneFormat[aPinyin[j + 1]] : 4;
        if (pin.indexOf("a") !== -1) {
          pin = pin.replace("a", _a[tone]);
        } else if (pin.indexOf("e") !== -1) {
          pin = pin.replace("e", _e[tone]);
        } else if (pin.indexOf("ou") !== -1) {
          pin = pin.replace("o", _o[tone]);
        } else {
          for (let k = pin.length - 1; k >= 0; k--) {
            if (this._isVowel(pin[k])) {
              switch (pin[k]) {
                case "i":
                  pin = pin.replace("i", _i[tone]);
                  break;
                case "o":
                  pin = pin.replace("o", _o[tone]);
                  break;
                case "u":
                  if (k + 1 < pin.length - 1 && pin[k + 1] === ":") {
                    pin = pin.replace("u:", _v[tone]);
                  } else {
                    pin = pin.replace("u", _u[tone]);
                  }
                  break;
                default:
                  Logger.getInstance().warn("some kind of weird vowel", pin[k]);
              }
              break;
            }
          }
        }
        formatedPinyin.push(pin);
      }
    }
    return formatedPinyin.join(" ").trim();
  }
}
const typeFeatures = /* @__PURE__ */ new Map();
let typeFeaturesInitialized = false;
class SyriacLanguageModel extends LanguageModel {
  static get languageID() {
    return LANG_SYRIAC;
  }
  static get languageCode() {
    return STR_LANG_CODE_SYR;
  }
  static get languageCodes() {
    return [STR_LANG_CODE_SYR, STR_LANG_CODE_SYC, STR_LANG_CODE_SYR_SYRJ];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return LANG_DIR_RTL;
  }
  static get baseUnit() {
    return LANG_UNIT_WORD;
  }
  static get featureValues() {
    return new Map([
      ...LanguageModel.featureValues,
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
          POFS_VERB_PARTICIPLE,
          POFS_DENOMINATIVE
        ]
      ],
      [
        Feature.types.kaylo,
        []
      ],
      [
        Feature.types.state,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    if (!typeFeaturesInitialized) {
      this.initTypeFeatures();
    }
    return typeFeatures;
  }
  static initTypeFeatures() {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName));
    }
    typeFeaturesInitialized = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(node) {
    return false;
  }
  /**
   * Get a list of valid punctuation for this language
   * Taken from  the list at https://en.wikipedia.org/wiki/Syriac_(Unicode_block)
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `܀܁܂܃܄܅܆܇܈܉܊܋܌܍܏.,;:!?'"(){}\\[\\]<>/\\ ‐‑‒–—―‘’†‡“”
\r‌‍`;
  }
  /**
   * Groups a set of inflections according to a syriac display paradigm
    The default groups according to the following logic:
    1. groups of groups with unique stem, prefix, suffix, part of speech, declension, kaylo or state, and comparison
    2. groups of those groups with unique
    number, if it's an inflection with a grammatical case
    tense, if it's an inflection with tense but no case (i.e. a verb)
    verbs without tense or case
    adverbs
    everything else
    3. groups of those groups with unique voice and tense
    4. groups of inflections with unique gender, person, mood, and sort
   *
   * @param inflections
   */
  static groupInflectionsForDisplay(inflections) {
    const grouped = /* @__PURE__ */ new Map();
    const aggregated = this.aggregateInflectionsForDisplay(inflections);
    for (const infl of aggregated) {
      const groupingKey = new InflectionGroupingKey(
        infl,
        [Feature.types.part, Feature.types.declension, Feature.types.kaylo, Feature.types.state, Feature.types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      );
      const groupingKeyStr = groupingKey.toString();
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl);
      } else {
        grouped.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
      }
    }
    for (const kv of grouped) {
      const inflgrp = /* @__PURE__ */ new Map();
      for (const infl of kv[1].inflections) {
        let keyprop;
        let isCaseInflectionSet = false;
        if (infl[Feature.types.grmCase]) {
          keyprop = Feature.types.number;
          isCaseInflectionSet = true;
        } else if (infl[Feature.types.tense]) {
          keyprop = Feature.types.tense;
        } else if (infl[Feature.types.part] === POFS_VERB) {
          keyprop = Feature.types.part;
        } else if (infl[Feature.types.part] === POFS_ADVERB) {
          keyprop = Feature.types.part;
        } else {
          keyprop = "misc";
        }
        const groupingKey = new InflectionGroupingKey(infl, [keyprop], { isCaseInflectionSet });
        const groupingKeyStr = groupingKey.toString();
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl);
        } else {
          inflgrp.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
        }
      }
      for (const kv2 of inflgrp) {
        const nextGroup = /* @__PURE__ */ new Map();
        const sortOrder = /* @__PURE__ */ new Map();
        for (const infl of kv2[1].inflections) {
          const sortkey = infl[Feature.types.grmCase] ? Math.max(infl[Feature.types.grmCase].items.map((f) => f.sortOrder)) : 1;
          const groupingKey = new InflectionGroupingKey(infl, [Feature.types.tense, Feature.types.voice]);
          const groupingKeyStr = groupingKey.toString();
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl);
          } else {
            nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl], sortkey));
            sortOrder.set(groupingKeyStr, sortkey);
          }
        }
        kv2[1].inflections = [];
        const sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            const orderA = sortOrder.get(a);
            const orderB = sortOrder.get(b);
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0;
          }
        );
        for (const groupkey of sortedKeys) {
          kv2[1].inflections.push(nextGroup.get(groupkey));
        }
      }
      for (const kv2 of inflgrp) {
        const groups = kv2[1];
        for (const group of groups.inflections) {
          const nextGroup = /* @__PURE__ */ new Map();
          for (const infl of group.inflections) {
            const groupingKey = new InflectionGroupingKey(
              infl,
              [
                Feature.types.grmCase,
                Feature.types.comparison,
                Feature.types.gender,
                Feature.types.number,
                Feature.types.person,
                Feature.types.tense,
                Feature.types.mood,
                Feature.types.voice
              ]
            );
            const groupingKeyStr = groupingKey.toString();
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl);
            } else {
              nextGroup.set(groupingKeyStr, new InflectionGroup(groupingKey, [infl]));
            }
          }
          group.inflections = Array.from(nextGroup.values());
        }
      }
      kv[1].inflections = Array.from(inflgrp.values());
    }
    return Array.from(grouped.values());
  }
}
const MODELS = /* @__PURE__ */ new Map([
  [STR_LANG_CODE_LA, LatinLanguageModel],
  [STR_LANG_CODE_LAT, LatinLanguageModel],
  [STR_LANG_CODE_GRC, GreekLanguageModel],
  [STR_LANG_CODE_ARA, ArabicLanguageModel],
  [STR_LANG_CODE_AR, ArabicLanguageModel],
  [STR_LANG_CODE_PER, PersianLanguageModel],
  [STR_LANG_CODE_GEZ, GeezLanguageModel],
  [STR_LANG_CODE_ZHO, ChineseLanguageModel],
  [STR_LANG_CODE_SYR, SyriacLanguageModel],
  [STR_LANG_CODE_SYC, SyriacLanguageModel],
  [STR_LANG_CODE_SYR_SYRJ, SyriacLanguageModel]
]);
class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage(language) {
    language = typeof language === "symbol" ? LanguageModelFactory.getLanguageCodeFromId(language) : language;
    return MODELS.has(language);
  }
  static availableLanguages() {
    let avail = /* @__PURE__ */ new Set();
    for (const model of MODELS.values()) {
      avail.add(model.languageCode);
    }
    return Array.from(avail);
  }
  /**
   * Returns a constructor of language model for a specific language ID.
   *
   * @param {symbol} languageID - A language ID of a desired language model.
   * @returns {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel(languageID) {
    const languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID);
    return LanguageModelFactory.getLanguageModelFromCode(languageCode);
  }
  static getLanguageModelFromCode(languageCode) {
    if (MODELS.has(languageCode)) {
      return MODELS.get(languageCode);
    } else {
      return LanguageModel;
    }
  }
  static getLanguageForCode(code = null) {
    const Model = MODELS.get(code);
    if (Model) {
      return new Model();
    }
    return new LanguageModel();
  }
  /**
   * Converts an ISO 639-3 language code to a language ID
   *
   * @param {string} languageCode - An ISO 639-3 language code
   * @returns {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode(languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.languageID;
      }
    }
    return LANG_UNDEFINED;
  }
  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   *
   * @param {symbol} languageID - A language ID
   * @returns {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId(languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.languageID.toString() === languageID.toString()) {
        return languageModel.languageCode;
      }
    }
    return STR_LANG_CODE_UNDEFINED;
  }
  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   *
   * @param {string | symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @returns {object} An object with the following properties:
   *    {symbol} languageID
   *    {string} languageCode
   */
  static getLanguageAttrs(language) {
    if (typeof language === "symbol") {
      return {
        languageID: language,
        languageCode: LanguageModelFactory.getLanguageCodeFromId(language)
      };
    } else {
      return {
        languageID: LanguageModelFactory.getLanguageIdFromCode(language),
        languageCode: language
      };
    }
  }
  /**
   * Compares two languages in either a language ID or a language code format. For this, does conversion of
   * language IDs to language code. Because fo this, it will work even for language IDs defined in
   * different modules
   *
   * @param {string | symbol} languageA - Either a language ID (a symbol) or a language code (a string).
   * @param {string | symbol} languageB - Either a language ID (a symbol) or a language code (a string).
   * @returns {boolean} True if languages are the same, false otherwise.
   */
  static compareLanguages(languageA, languageB) {
    languageA = typeof languageA === "symbol" ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA;
    languageB = typeof languageB === "symbol" ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB;
    return languageA === languageB;
  }
  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage(languageID) {
    return [LANG_GEEZ, LANG_SYRIAC, LANG_CHINESE].includes(languageID);
  }
}
class DefinitionSet {
  constructor(lemmaWord, languageID) {
    this.lemmaWord = lemmaWord;
    this.languageID = languageID;
    this.shortDefs = [];
    this.fullDefs = [];
  }
  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   *
   * @param {object} jsonObject - A JSON object representing DefinitionSet data.
   * @returns {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject(jsonObject) {
    const languageID = LanguageModelFactory.getLanguageIdFromCode(jsonObject.languageCode);
    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, languageID);
    for (const shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(Definition.readObject(shortDef));
    }
    for (const fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(Definition.readObject(fullDef));
    }
    return definitionSet;
  }
  /**
   * Checks if any short definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return this.shortDefs.length > 0;
  }
  /**
   * Checks if any full definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return this.fullDefs.length > 0;
  }
  /**
   * Check to see if the DefinitionSet is empty
   *
   * @returns {boolean} true if empty false if there is at least one definition
   */
  isEmpty() {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0;
  }
  /**
   * Appends one or more definitions to a list of short definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of short definitions this object has.
   */
  appendShortDefs(definitions) {
    if (definitions) {
      if (!Array.isArray(definitions)) {
        definitions = [definitions];
      }
      this.shortDefs = this.shortDefs.concat(definitions);
    }
    return this.shortDefs;
  }
  /**
   * clear accumulated short definitions
   */
  clearShortDefs() {
    this.shortDefs = [];
  }
  /**
   * Appends one or more definitions to a list of full definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs(definitions) {
    if (definitions) {
      if (!Array.isArray(definitions)) {
        definitions = [definitions];
      }
      this.fullDefs = this.fullDefs.concat(definitions);
    }
    return this.fullDefs;
  }
  /**
   * clear accumulated full definitions
   */
  clearFullDefs() {
    this.fullDefs = [];
  }
  convertToJSONObject() {
    const languageCode = LanguageModelFactory.getLanguageCodeFromId(this.languageID);
    return {
      lemmaWord: this.lemmaWord,
      languageCode,
      shortDefs: this.shortDefs.map((def) => def.convertToJSONObject()),
      fullDefs: this.fullDefs.map((def) => def.convertToJSONObject())
    };
  }
}
class GrmFeature {
  /**
   * @deprecated Use Feature instead
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
  constructor(value, type, language, sortOrder = 1) {
    if (!GrmFeature.types.isAllowed(type)) {
      throw new Error('Features of "' + type + '" type are not supported.');
    }
    if (!value) {
      throw new Error("Feature should have a non-empty value.");
    }
    if (!type) {
      throw new Error("Feature should have a non-empty type.");
    }
    if (!language) {
      throw new Error("Feature constructor requires a language");
    }
    this.value = value;
    this.type = type;
    this.languageID = void 0;
    this.languageCode = void 0;
    ({ languageID: this.languageID, languageCode: this.languageCode } = LanguageModelFactory.getLanguageAttrs(language));
    this.sortOrder = sortOrder;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    Logger.getInstance().warn('Please use a "languageID" instead of a "language"');
    return this.languageCode;
  }
  isEqual(feature) {
    if (Array.isArray(feature.value)) {
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false;
      }
      let equal = this.type === feature.type && LanguageModelFactory.compareLanguages(this.languageID, feature.languageID);
      equal = equal && this.value.every(function(element, index) {
        return element === feature.value[index];
      });
      return equal;
    } else {
      return LanguageModelFactory.compareLanguages(this.languageID, feature.languageID) && this.type === feature.type && this.value === feature.value;
    }
  }
  isSubsetof(features) {
    if (!Array.isArray(features)) {
      features = [features];
    }
    const languageID = features[0].languageID;
    const type = features[0].type;
    const values = features.map((f) => f.value);
    if (LanguageModelFactory.compareLanguages(this.languageID, languageID) && this.type === type && values.includes(this.value)) {
      return true;
    }
    return false;
  }
  /**
   * examine the feature for a specific value
   *
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values
   */
  hasValue(value) {
    if (Array.isArray(this.value)) {
      return this.value.includes(value);
    } else {
      return this.value === value;
    }
  }
  /**
   * string representation of a feature
   *
   * @returns {string}
   */
  toString() {
    if (Array.isArray(this.value)) {
      return this.value.join(",");
    } else {
      return this.value;
    }
  }
  static toFeature(sourceFeature) {
    if (Array.isArray(sourceFeature)) {
      if (!(sourceFeature[0] instanceof Feature)) {
        const type = sourceFeature[0].type;
        const languageID = sourceFeature[0].languageID;
        const values = sourceFeature.map((v) => v.value);
        return new Feature(type, values, languageID);
      }
    } else {
      if (!(sourceFeature instanceof Feature)) {
        return new Feature(sourceFeature.type, sourceFeature.value, sourceFeature.languageID);
      }
    }
    return sourceFeature;
  }
}
GrmFeature.types = {
  word: "word",
  part: "part of speech",
  // Part of speech
  number: "number",
  case: "case",
  grmCase: "case",
  // A synonym of `case`
  declension: "declension",
  gender: "gender",
  type: "type",
  class: "class",
  grmClass: "class",
  // A synonym of `class`
  conjugation: "conjugation",
  comparison: "comparison",
  tense: "tense",
  voice: "voice",
  mood: "mood",
  person: "person",
  frequency: "frequency",
  // How frequent this word is
  meaning: "meaning",
  // Meaning of a word
  source: "source",
  // Source of word definition
  footnote: "footnote",
  // A footnote for a word's ending
  dialect: "dialect",
  // a dialect identifier
  note: "note",
  // a general note
  pronunciation: "pronunciation",
  age: "age",
  area: "area",
  geo: "geo",
  // geographical data
  kind: "kind",
  // verb kind information
  derivtype: "derivtype",
  stemtype: "stemtype",
  morph: "morph",
  // general morphological information
  var: "var",
  // variance?
  isAllowed(value) {
    const v = `${value}`;
    return Object.values(this).includes(v);
  }
};
class FeatureList {
  /**
   * Initializes a feature list.
   *
   * @param {Feature[]} features - Features that build the list (optional, can be set later).
   */
  constructor(features = []) {
    this._features = [];
    this._types = {};
    this.add(features);
  }
  add(features) {
    if (!features || !Array.isArray(features)) {
      throw new Error("Features must be defined and must come in an array.");
    }
    for (const feature of features) {
      this._features.push(feature);
      this._types[feature.type] = feature;
    }
  }
  /**
   * Returns an array of grouping features.
   *
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
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
   */
  ofType(type) {
    if (this.hasType(type)) {
      return this._types[type];
    }
  }
  /**
   * Checks whether a feature list has a feature of a specific type.
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {boolean} Whether a feature list has a feature of a particular type.
   */
  hasType(type) {
    return this._types.hasOwnProperty(type);
  }
}
class Translation {
  /**
   * Initializes a Translation object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param languageCode
   * @param translations
   */
  constructor(lemma, languageCode, translations = []) {
    if (!lemma) {
      throw new Error("Lemma should not be empty.");
    }
    this.lemmaWord = lemma.word;
    this.languageCode = languageCode;
    this.glosses = translations;
  }
  static readTranslationFromJSONList(lemma, languageCode, translationsList, provider) {
    if (!translationsList || !Array.isArray(translationsList)) {
      throw new Error("Recieved not proper translation list", translationsList);
    }
    const curTranslations = translationsList.find(function(element) {
      return element.in === lemma.word;
    });
    const translation = new Translation(lemma, languageCode, curTranslations.translations);
    if (provider) {
      return ResourceProvider.getProxy(provider, translation);
    } else {
      return translation;
    }
  }
  static loadTranslations(lemma, languageCode, translationsList, provider) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, languageCode, translationsList, provider));
  }
  convertToJSONObject() {
    let result = {
      languageCode: this.languageCode,
      translations: this.glosses
    };
    if (this.provider) {
      result.provider = this.provider.convertToJSONObject();
    }
    return result;
  }
  static readObject(jsonObject, lemma) {
    const translation = new Translation(lemma, jsonObject.languageCode, jsonObject.translations);
    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider);
      return ResourceProvider.getProxy(provider, translation);
    } else {
      return translation;
    }
  }
}
class Lemma {
  /**
   * Initializes a Lemma object.
   *
   * @param {string} word - A word.
   * @param {symbol | string} languageID - A language ID (symbol, please use this) or a language code of a word.
   * @param {string[]} principalParts - the principalParts of a lemma.
   * @param {object} features - the grammatical features of a lemma.
   * @param {Translation} transaltions - translations from python service
   */
  constructor(word, languageID, principalParts = [], features = {}) {
    if (!word) {
      throw new Error("Word should not be empty.");
    }
    if (!languageID) {
      throw new Error("Language should not be empty.");
    }
    this.languageID = void 0;
    this.languageCode = void 0;
    ({ languageID: this.languageID, languageCode: this.languageCode } = LanguageModelFactory.getLanguageAttrs(languageID));
    this.word = word;
    this.principalParts = principalParts;
    this.features = {};
    this.ID = v4();
  }
  get language() {
    Logger.getInstance().warn('Please use "languageID" instead of "language"');
    return this.languageCode;
  }
  get displayWord() {
    return this.word.replace(/\d+$/, "");
  }
  static readObject(jsonObject) {
    const language = jsonObject.language ? jsonObject.language : jsonObject.languageCode;
    let resLemma = new Lemma(jsonObject.word, language, jsonObject.principalParts, jsonObject.pronunciation);
    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach((featureSource) => {
        resLemma.addFeature(Feature.readObject(featureSource));
      });
    }
    if (jsonObject.translation) {
      resLemma.translation = Translation.readObject(jsonObject.translation, resLemma);
    }
    return resLemma;
  }
  convertToJSONObject() {
    let resultFeatures = [];
    for (const feature of Object.values(this.features)) {
      resultFeatures.push(feature.convertToJSONObject());
    }
    let resultLemma = {
      word: this.word,
      language: this.languageCode,
      principalParts: this.principalParts,
      features: resultFeatures
    };
    if (this.translation) {
      resultLemma.translation = this.translation.convertToJSONObject();
    }
    return resultLemma;
  }
  /**
   * @deprecated Please use `addFeature` instead.
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature(data) {
    Logger.getInstance().warn('Please use "addFeature" instead');
    if (!data) {
      throw new Error("feature data cannot be empty.");
    }
    if (!Array.isArray(data)) {
      data = [data];
    }
    const type = data[0].type;
    this.features[type] = [];
    for (const element of data) {
      if (!(element instanceof Feature)) {
        throw new Error("feature data must be a Feature object.");
      }
      if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
        throw new Error('Language "' + element.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
      }
      this.features[type].push(element);
    }
  }
  /**
   * Sets a grammatical feature of a lemma. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature(feature) {
    if (!feature) {
      throw new Error("feature data cannot be empty.");
    }
    if (!(feature instanceof Feature) && feature.constructor.name !== "Feature") {
      throw new Error("feature data must be a Feature object.");
    }
    if (!LanguageModelFactory.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
    }
    this.features[feature.type] = feature;
  }
  /**
   * Sets multiple grammatical features of a lemma.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures(features) {
    if (!Array.isArray(features)) {
      throw new Error("Features must be in an array");
    }
    for (const feature of features) {
      this.addFeature(feature);
    }
  }
  /**
   * Sets a translation from python service.
   *
   * @param {Translation} translation - A translation object
   */
  addTranslation(translation) {
    if (!translation) {
      throw new Error("translation data cannot be empty.");
    }
    if (translation.constructor.name.indexOf("Translation") === -1) {
      throw new Error("translation data must be a Translation object.");
    }
    this.translation = translation;
  }
  /**
   * Test to see if two lemmas are full homonyms.
   *
   * @param {Lemma} lemma - the lemma to compare.
   * @param {object} options - Additional comparison options.
   * @param {boolean} options.normalize - Whether to normalize words before comparison.
   * @param {boolean} options.ignorePofs - Whether to ignore the part of speech in comparison.
   *                                       (use if the lexeme data is needed
   *                                        for a part of speech comparison)
   * @returns {boolean} true or false.
   */
  isFullHomonym(lemma, { normalize = false, ignorePofs = false } = {}) {
    if (!ignorePofs && (!this.features[Feature.types.part] || !lemma.features[Feature.types.part] || !this.features[Feature.types.part].isEqual(lemma.features[Feature.types.part]))) {
      return false;
    }
    const lm = LanguageModelFactory.getLanguageModel(this.languageID);
    const areSameWords = normalize ? lm.compareWords(
      this.word,
      lemma.word,
      true,
      { normalizeTrailingDigit: true }
    ) : this.word === lemma.word;
    const thisHasTrailingDigit = lm.hasTrailingDigit(this.word);
    const otherHasTrailingDigit = lm.hasTrailingDigit(lemma.word);
    if (thisHasTrailingDigit && otherHasTrailingDigit) {
      const thisTrailingDigit = this.word.match(/\d+$/)[0];
      const otherTrailingDigit = lemma.word.match(/\d+$/)[0];
      if (thisTrailingDigit !== otherTrailingDigit) {
        return false;
      }
    }
    return areSameWords;
  }
  /**
   * Disambiguate between this and the other lemma.
   *
   * @param {string} otherLemma - The other lemma for disambiguation.
   * @returns {string} - A disambiguated word.
   */
  disambiguate(otherLemma) {
    const langModel = LanguageModelFactory.getLanguageModel(this.languageID);
    const areSameWords = langModel.compareWords(this.word, otherLemma.word, true, { normalizeTrailingDigit: true });
    if (!areSameWords) {
      throw new Error("Words that differ cannot be disambiguated");
    }
    const thisHasMixedCase = langModel.hasUpperCase(this.word);
    const otherHasMixedCase = langModel.hasUpperCase(otherLemma.word);
    if (otherHasMixedCase) {
      return otherLemma.word;
    }
    if (thisHasMixedCase) {
      return this.word;
    }
    const thisNeesNormalization = langModel.needsNormalization(this.word);
    const otherNeesNormalization = langModel.needsNormalization(otherLemma.word);
    if (otherNeesNormalization) {
      return langModel.normalizeText(otherLemma.word);
    }
    if (thisNeesNormalization) {
      return langModel.normalizeText(this.word);
    }
    const thisHasTrailingDigit = langModel.hasTrailingDigit(this.word);
    const otherHasTrailingDigit = langModel.hasTrailingDigit(otherLemma.word);
    if (otherHasTrailingDigit) {
      return otherLemma.word;
    }
    if (thisHasTrailingDigit) {
      return this.word;
    }
    return this.word;
  }
  /**
   * extracts lemma.word and all principal parts for flashcards export
   *
   */
  get wordPrincipalParts() {
    const allParts = [...this.principalParts];
    if (!this.principalParts.includes(this.word)) {
      allParts.push(this.word);
    }
    return allParts.join(", ");
  }
}
class Inflection {
  /**
   * Initializes an Inflection object.
   *
   * @param {string} stem - A stem of a word.
   * @param {string | symbol} language - A word's language.
   * @param {string} suffix - a suffix of a word
   * @param {prefix} prefix - a prefix of a word
   * @param {example} example - example
   */
  constructor(stem = null, language, suffix = null, prefix = null, example = null) {
    if (!stem && !suffix) {
      throw new Error("At least stem or suffix must be defined");
    }
    if (!language) {
      throw new Error("Language should not be empty.");
    }
    if (!LanguageModelFactory.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`);
    }
    this.stem = stem;
    this.languageID = void 0;
    this.languageCode = void 0;
    ({ languageID: this.languageID, languageCode: this.languageCode } = LanguageModelFactory.getLanguageAttrs(language));
    this.model = LanguageModelFactory.getLanguageModel(this.languageID);
    this.features = /* @__PURE__ */ new Set();
    this.constraints = {
      fullFormBased: false,
      // True this inflection stores and requires to use a full form of a word
      suffixBased: false,
      // True if only suffix is enough to identify this inflection
      irregular: false,
      // Whether this word is an irregular one
      obligatoryMatches: [],
      // {string[]} Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [],
      // {string[]} Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
      morphologyMatches: []
      // {string[]} These features should match for a morphology match
    };
    this.suffix = suffix;
    this.prefix = prefix;
    this.example = example;
    this.lemma = null;
  }
  clone() {
    let clone = new Inflection(this.stem, this.languageID, this.suffix, this.prefix, this.example);
    clone.addFeatures(Array.from(this.features).map((f) => this[f]));
    clone.constraints = {
      fullFormBased: this.constraints.fullFormBased,
      suffixBased: this.constraints.suffixBased,
      irregular: this.constraints.irregular,
      obligatoryMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      optionalMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      morphologyMatches: this.constraints.morphologyMatches ? Array.from(this.constraints.morphologyMatches) : []
    };
    clone.lemma = this.lemma;
    return clone;
  }
  /**
   * Returns a full form of a word using ' - ' as a divider for suffix-based inflections.
   *
   * @returns {string} A word form.
   */
  get form() {
    const divider = this.stem ? " - " : "";
    return this.getForm(divider);
  }
  /**
   * Returns a full form of a word using user specified divider for suffix-based inflections.
   *
   * @param {string} divider - A divider to use between stem and suffix.
   * @returns {string} A word form.
   */
  getForm(divider = "") {
    let form, prefix, suffix;
    const stem = this.stem ? this.stem : "";
    if (this.model.direction === LANG_DIR_RTL) {
      prefix = this.prefix ? divider + this.prefix : "";
      suffix = this.suffix ? this.suffix + divider : "";
      form = suffix + stem + prefix;
    } else {
      prefix = this.prefix ? this.prefix + divider : "";
      suffix = this.suffix ? divider + this.suffix : "";
      form = prefix + stem + suffix;
    }
    return form;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    Logger.getInstance().warn('Please use a "languageID" instead of a "language"');
    return this.languageCode;
  }
  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints() {
    if (this.model.hasOwnProperty("getInflectionConstraints")) {
      const constraintData = this.model.getInflectionConstraints(this);
      this.constraints = Object.assign(this.constraints, constraintData);
    }
  }
  /**
   * Compares if two words are the same. Options allows to specify
   * comparison algorithms for cases when word info is not fully correct.
   *
   * @param {string} word - A word or suffix to compare with inflection.
   * @param {string} className - A type of word: 'Suffix' or "Form'.
   * @param {comparison} options - These settings define comparison algorithm:
   *        'normalize' - normalize word and inflection before comparison.
   *        'fuzzySuffix' - if suffix contained in a 'word' does not match our suffix data,
   *                        try to find a match by checking if inflection full form
   *                        ends with this suffix.
   * @returns {boolean} True for match, false otherwise.
   */
  smartWordCompare(word, className, options = {}) {
    if (!options.hasOwnProperty("normalize")) {
      options.normalize = true;
    }
    if (!options.hasOwnProperty("fuzzySuffix")) {
      options.fuzzySuffix = false;
    }
    let value;
    if (!this.constraints.irregular) {
      value = this.constraints.suffixBased ? this.suffix : this.form;
    } else {
      if (className === "Suffix") {
        value = this.suffix;
      } else {
        value = this[Feature.types.fullForm] ? this[Feature.types.fullForm].value : this.form;
      }
    }
    let matchResult = this.modelCompareWords(word, value, options.normalize);
    if (!matchResult && className === "Suffix" && options.fuzzySuffix) {
      const form = this.getForm();
      if (form && word && form.length >= word.length) {
        const altSuffix = form.substring(form.length - word.length);
        matchResult = this.modelCompareWords(word, altSuffix, options.normalize);
      }
    }
    return matchResult;
  }
  compareWithWord(word, normalize = true) {
    const value = this.constraints.suffixBased ? this.suffix : this.form;
    return this.modelCompareWords(word, value, normalize);
  }
  /**
   * Compare to words (or partial words) delegating to the language model
   * rules for normalization
   *
   * @param {string} wordA the first word
   * @param {string} wordB the second word
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareWords(wordA, wordB, normalize = true) {
    const model = LanguageModelFactory.getLanguageModel(this.languageID);
    return model.compareWords(wordA, wordB, normalize);
  }
  /**
   * Compare single feature values delegating to the language model
   * rules for normalization
   *
   * @param {string} featureType the feature type
   * @param {string} valueA the first value
   * @param {string} valueB the secon value
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareFeatureValue(featureType, valueA, valueB, normalize = true) {
    const model = LanguageModelFactory.getLanguageModel(this.languageID);
    return model.compareFeatureValue(featureType, valueA, valueB, { normalize });
  }
  /**
   * Check to see if the supplied inflection can disambiguate this one
   *
   * @param {Inflection} infl Inflection object to be used for disambiguation
   * @param {object} options disambiguation options
   * @param {boolean} options.ignorePofs flag to ignore the inflection's part of speech
   *                                    (use if lexeme pofs is more relevant)
   * @returns {object} object { {Boolean} match, {Boolean} exactMatch }
   *                   a match means the inflection was disamibugated
   *                   an exactMatch means the disamibugator matched all
   *                   values of all features
   */
  disambiguatedBy(infl, { ignorePofs = false } = {}) {
    let matched = true;
    let exactMatch = true;
    if (this.features.size === 0 || infl.features.size === 0) {
      matched = false;
    }
    if (infl.features.size > this.features.size) {
      matched = false;
    }
    for (const feature of infl.features) {
      if (ignorePofs && feature === Feature.types.part) {
        continue;
      }
      for (const value of infl[feature].values) {
        if (!this.hasFeatureValue(feature, value, { normalize: true })) {
          matched = false;
          break;
        }
        if (this[feature].values.length !== infl[feature].values.length) {
          exactMatch = false;
        }
      }
    }
    return { match: matched, exactMatch };
  }
  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature(data) {
    Logger.getInstance().warn('Please use "addFeature" instead.');
    if (!data) {
      throw new Error("Inflection feature data cannot be empty.");
    }
    if (!Array.isArray(data)) {
      data = [data];
    }
    const type = data[0].type;
    this[type] = [];
    for (const element of data) {
      if (!(element instanceof Feature)) {
        throw new Error("Inflection feature data must be a Feature object.");
      }
      if (!LanguageModelFactory.compareLanguages(element.languageID, this.languageID)) {
        throw new Error(`Language "${element.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`);
      }
      this[type].push(element);
      this.features.add(type);
    }
  }
  /**
   * Sets a grammatical feature of an inflection. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature(feature) {
    if (!feature) {
      throw new Error("feature data cannot be empty.");
    }
    if (!(feature instanceof Feature) && feature.constructor.name !== "Feature") {
      throw new Error("feature data must be a Feature object.");
    }
    if (!LanguageModelFactory.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
    }
    this[feature.type] = feature;
    this.features.add(feature.type);
  }
  /**
   * Sets multiple grammatical features of an inflection.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures(features) {
    if (!Array.isArray(features)) {
      throw new Error("Features must be in an array");
    }
    for (const feature of features) {
      this.addFeature(feature);
    }
  }
  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   *
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @param {object} options
   * @param {boolean} options.normalize - whether or not to normalize the feature values
   * @returns {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue(featureName, featureValue, { normalize = false } = {}) {
    if (this.hasOwnProperty(featureName)) {
      return this[featureName].values.some((v) => this.modelCompareFeatureValue(featureName, v, featureValue));
    }
    return false;
  }
  toString() {
    let string = `Inflection stem: ${this.stem}, prefix: ${this.prefix}, suffix: ${this.suffix}, langID: ${this.languageID.toString()}
  features:  `;
    for (const feature of this.features.values()) {
      string += `${feature}: ${this[feature].value}, `;
    }
    string += "\n  constraints:  ";
    for (const [key, value] of Object.entries(this.constraints)) {
      if (Array.isArray(value)) {
        string += `${key}: [${value}], `;
      } else {
        string += `${key}: ${value}, `;
      }
    }
    string += `
  example: ${this.example}`;
    return string;
  }
  static readObject(jsonObject, lemma) {
    let inflection = new Inflection(
      jsonObject.stem,
      jsonObject.languageCode,
      jsonObject.suffix,
      jsonObject.prefix,
      jsonObject.example
    );
    inflection.languageID = LanguageModelFactory.getLanguageIdFromCode(inflection.languageCode);
    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach((featureSource) => {
        inflection.addFeature(Feature.readObject(featureSource));
      });
    }
    if (lemma) {
      inflection.lemma = lemma;
    }
    return inflection;
  }
  convertToJSONObject() {
    let resultFeatures = [];
    for (const key of this.features.keys()) {
      resultFeatures.push(this[key].convertToJSONObject());
    }
    const languageCode = LanguageModelFactory.getLanguageCodeFromId(this.languageID);
    return {
      stem: this.stem,
      languageCode,
      suffix: this.suffix,
      prefix: this.prefix,
      example: this.example,
      features: resultFeatures
    };
  }
}
class Lexeme {
  /**
   * Initializes a Lexeme object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.
   */
  constructor(lemma, inflections, meaning = null) {
    if (!lemma) {
      throw new Error("Lemma should not be empty.");
    }
    if (!(lemma instanceof Lemma)) {
      throw new Error("Lemma should be of Lemma object type.");
    }
    if (!inflections) {
      throw new Error("Inflections data should not be empty.");
    }
    if (!Array.isArray(inflections)) {
      throw new Error("Inflection data should be provided in an array.");
    }
    for (const inflection of inflections) {
      if (!(inflection instanceof Inflection)) {
        throw new Error("All inflection data should be of Inflection object type.");
      }
    }
    if (meaning !== null && !(meaning instanceof DefinitionSet)) {
      throw new Error("Meaning should be of DefinitionSet object type.");
    }
    this.lemma = lemma;
    this.altLemmas = [];
    this.inflections = [];
    this.addInflections(inflections);
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID);
    this.disambiguated = false;
    this.selectedInflection = null;
  }
  /**
   * Set the selected inflection for a lexeme which has had its
   * inflections disambiguated
   *
   * @param {Inflection} inflection the selected inflection
   */
  setSelectedInflection(inflection) {
    this.selectedInflection = inflection;
  }
  /**
   * Get the selected inflection for a lexeme which has had its
   * inflections disambiguated
   *
   * @returns {Inflection} (or null if none is selected)
   */
  getSelectedInflection() {
    return this.selectedInflection;
  }
  /**
   * Gets the selected inflection formatted for display
   * (returns an array because the display is grouped by feature
   * but there should only be one inflection in the array)
   *
   * @returns {Array} if no selected inflection the array will be empty
   */
  getGroupedSelectedInflection() {
    if (this.selectedInflection) {
      const lm = LanguageModelFactory.getLanguageModel(this.lemma.languageID);
      return lm.groupInflectionsForDisplay([this.selectedInflection]);
    } else {
      return [];
    }
  }
  /**
   * add an inflection to the lexeme
   *
   * @param {Inflection} inflection
   */
  addInflection(inflection) {
    inflection.lemma = this.lemma;
    inflection.lexeme = this;
    this.inflections.push(inflection);
  }
  /**
   * Adds one or several inflections to a Lexeme object.
   *
   * @param {Inflection | Inflection[]} inflections - a single Inflection object or an array of Inflection
   *        objects to add to a lexeme.
   */
  addInflections(inflections) {
    if (!Array.isArray(inflections)) {
      inflections = [inflections];
    }
    inflections.forEach((i) => this.addInflection(i));
  }
  /**
   * add an alternative lemma to the lexeme
   *
   * @param {Lemma} lemma
   */
  addAltLemma(lemma) {
    this.altLemmas.push(lemma);
  }
  /**
   * test to see if a lexeme is populated with meaningful data
   * Returns true if any of these are true:
   *   its lemma has morphological features defined
   *   it has one ore more definitions supplied in the meaning
   *   it has one ore more inflections
   *
   * @returns {boolean}
   */
  isPopulated() {
    return Object.entries(this.lemma.features).length > 0 || !this.meaning.isEmpty() || this.inflections.length > 0;
  }
  /**
   * Checks if any short definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return Boolean(this.meaning && this.meaning.hasShortDefs);
  }
  /**
   * Checks if any full definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return Boolean(this.meaning && this.meaning.hasFullDefs);
  }
  /**
   * Checks whether a lemma of a current lexeme is a full homonym of the lemma of the other lexeme.
   *
   * @param {Lexeme} otherLexeme - a lexeme whose lemma will be compared with the lemma of a current lexeme.
   * @param {boolean} normalize - whether to use normalization for word comparison.
   * @returns {boolean} - true if two aforementioned lemmas are full homonyms, false otherwise.
   */
  isFullHomonym(otherLexeme, { normalize = false } = {}) {
    const lm = LanguageModelFactory.getLanguageModel(this.lemma.languageID);
    const normalizedPofs = lm.normalizePartOfSpeechValue(this);
    if (normalizedPofs === lm.normalizePartOfSpeechValue(otherLexeme)) {
      const ignorePofs = Boolean(normalizedPofs !== this.lemma.features[Feature.types.part]);
      return this.lemma.isFullHomonym(otherLexeme.lemma, { normalize, ignorePofs });
    } else {
      return false;
    }
  }
  /**
   * Determines whether a lexeme can be disambiguated with the other disambiguator lexeme.
   *
   * @param {Lexeme} disambiguator - A possible disambiguator; a lexeme that is checked
   *         whether it can disambiguate a current lexeme.
   * @returns {boolean} - True if a current lexeme can be disambiguated with a disambiguator, false otherwise.
   */
  canBeDisambiguatedWith(disambiguator) {
    const hasExtraFeatures = disambiguator.inflections.length || LanguageModel.hasTrailingDigit(disambiguator.lemma.word);
    return this.isFullHomonym(disambiguator, { normalize: true }) && hasExtraFeatures;
  }
  /**
   * disambiguate the inflections in this lexeme with those in another lexeme
   *
   * @param {Lexeme} lexeme the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use to disambiguate
   * @returns {Lexeme} a new lexeme, if disambiguation was successful the
   * disambiguated inflection will be selected
   */
  static disambiguateInflections(lexeme, disambiguator) {
    let newLexeme = new Lexeme(lexeme.lemma, lexeme.inflections, lexeme.meaning);
    const lm = LanguageModelFactory.getLanguageModel(lexeme.lemma.languageID);
    if (lexeme.canBeDisambiguatedWith(disambiguator)) {
      for (const inflection of newLexeme.inflections) {
        for (const disambiguatorInflection of disambiguator.inflections) {
          const normalizedPofs = lm.normalizePartOfSpeechValue(disambiguator);
          const ignorePofs = Boolean(normalizedPofs !== disambiguator.lemma.features[Feature.types.part]);
          const inflMatch = inflection.disambiguatedBy(disambiguatorInflection, { ignorePofs });
          if (inflMatch.match) {
            if (inflMatch.exactMatch) {
              newLexeme.setSelectedInflection(inflection);
            } else {
              newLexeme.setSelectedInflection(disambiguatorInflection);
            }
          }
        }
      }
    }
    return newLexeme;
  }
  /**
   * Set the disambiguation flag of this lexeme
   * if a disambiguator lexeme is provided, it's lemma word will be used
   * to update the word of this lexeme's lemma
   *
   * @param {Lexeme} disambiguator
   */
  setDisambiguation(disambiguator = null) {
    this.disambiguated = true;
    if (disambiguator) {
      this.lemma.word = this.lemma.disambiguate(disambiguator.lemma);
    }
  }
  getGroupedInflections() {
    const lm = LanguageModelFactory.getLanguageModel(this.lemma.languageID);
    return lm.groupInflectionsForDisplay(this.inflections);
  }
  static readObject(jsonObject) {
    const lemma = Lemma.readObject(jsonObject.lemma);
    let inflections = [];
    for (const inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection));
    }
    const lexeme = new Lexeme(lemma, inflections);
    if (jsonObject.meaning) {
      lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning);
    }
    if (jsonObject.provider) {
      const provider = ResourceProvider.readObject(jsonObject.provider);
      return ResourceProvider.getProxy(provider, lexeme);
    } else {
      return lexeme;
    }
  }
  convertToJSONObject(addMeaning = false) {
    let resInflections = [];
    this.inflections.forEach((inflection) => {
      resInflections.push(inflection.convertToJSONObject());
    });
    const resLexeme = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: resInflections
    };
    if (addMeaning) {
      resLexeme.meaning = this.meaning.convertToJSONObject();
    }
    if (this.provider) {
      resLexeme.provider = this.provider.convertToJSONObject();
    }
    return resLexeme;
  }
  /**
   * Get a sort function for an array of lexemes which applies a primary and secondary
   * sort logic using the sort order specified for each feature. Sorts in descending order -
   * higher sort order means it should come first
   *
   * @param {string} primary feature name to use as primary sort key
   * @param {string} secondary feature name to use as secondary sort key
   * @returns {Function} function which can be passed to Array.sort
   */
  static getSortByTwoLemmaFeatures(primary, secondary) {
    return (a, b) => {
      if (a.lemma.features[primary] && b.lemma.features[primary] || !a.lemma.features[primary] && !b.lemma.features[[primary]]) {
        let primarySort;
        if (a.lemma.features[primary] && b.lemma.features[primary]) {
          primarySort = a.lemma.features[primary].compareTo(b.lemma.features[primary]);
        } else {
          primarySort = 0;
        }
        if (primarySort !== 0) {
          return primarySort;
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return a.lemma.features[secondary].compareTo(b.lemma.features[secondary]);
        } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
          return -1;
        } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return 1;
        } else {
          return 0;
        }
      } else if (a.lemma.features[primary] && !b.lemma.features[primary]) {
        return -1;
      } else if (!a.lemma.features[primary] && b.lemma.features[primary]) {
        return 1;
      } else {
        return 0;
      }
    };
  }
}
class Homonym {
  /**
   * Initializes a Homonym object.
   *
   * @param {Lexeme[]} lexemes - An array of Lexeme objects.
   * @param {string} form - the form which produces the homonyms
   */
  constructor(lexemes, form) {
    if (!lexemes || Array.isArray(lexemes) && lexemes.length === 0) {
      throw new Error("Lexemes data should not be empty.");
    }
    if (!Array.isArray(lexemes)) {
      throw new Error("Lexeme data should be provided in an array.");
    }
    for (const lexeme of lexemes) {
      if (!(lexeme instanceof Lexeme)) {
        throw new Error("All lexeme data should be of Lexeme object type.");
      }
    }
    this.lexemes = lexemes;
    this.targetWord = form;
  }
  /**
   * Creates a simple form of inflection with one lexeme and zero or more inflections
   * attached to it. The lexeme will have lemma whose `word` will be set to
   * a homonym's target word.
   *
   * @param {string} word - A word that will populate homonym's `targetWord` prop and lemma `word` one.
   * @param {symbol} languageID - A language identificator as defined in Constants.LANG_XXX.
   * @param {Inflection[]} inflections - Zero or more inflection objects that will be attached to the lexeme
   * @returns {Homonym} A newly created homonym object.
   */
  static createSimpleForm(word, languageID, inflections = []) {
    const lemma = new Lemma(word, languageID);
    const lexeme = new Lexeme(lemma, inflections);
    return new Homonym([lexeme], word);
  }
  /**
   * Checks if any of the lexemes of this homonym has short definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return Boolean(this.lexemes && this.lexemes.some((l) => l.hasShortDefs));
  }
  /**
   * Checks if any of the lexemes of this homonym has full definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return Boolean(this.lexemes && this.lexemes.some((l) => l.hasFullDefs));
  }
  static readObject(jsonObject) {
    let lexemes = [];
    if (jsonObject.lexemes) {
      for (const lexeme of jsonObject.lexemes) {
        lexemes.push(Lexeme.readObject(lexeme));
      }
    } else {
      const languageID = LanguageModelFactory.getLanguageIdFromCode(jsonObject.languageCode);
      lexemes = [new Lexeme(new Lemma(jsonObject.targetWord, languageID), [])];
    }
    const homonym = new Homonym(lexemes, jsonObject.form || jsonObject.targetWord);
    homonym.lemmasList = jsonObject.lemmasList;
    return homonym;
  }
  convertToJSONObject(addMeaning = false) {
    let resultHomonym = { lexemes: [], form: this.targetWord };
    for (const lexeme of this.lexemes) {
      resultHomonym.lexemes.push(lexeme.convertToJSONObject(addMeaning));
    }
    return resultHomonym;
  }
  /**
   * Returns a language code of a homonym (ISO 639-3).
   * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {string} A language code, as defined in the `languages` object.
   */
  get language() {
    Logger.getInstance().warn("Please use languageID instead");
    return LanguageModelFactory.getLanguageCodeFromId(this.languageID);
  }
  /**
   * Returns a language ID of a homonym.
   * Homonym does not have a languageID property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using languageID property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {symbol} A language ID, as defined in the `LANG_` constants.
   */
  get languageID() {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.languageID) {
      return this.lexemes[0].lemma.languageID;
    } else {
      throw new Error("Homonym has not been initialized properly. Unable to obtain language ID information.");
    }
  }
  /**
   * Returns a list of all inflections within all lexemes of a homonym
   *
   * @returns {Inflection[]} An array of inflections
   */
  get inflections() {
    let inflections = [];
    for (const lexeme of this.lexemes) {
      inflections = inflections.concat(lexeme.inflections);
    }
    return inflections;
  }
  isDisambiguated() {
    return this.lexemes.filter((l) => l.disambiguated).length > 0;
  }
  /**
   * Disambiguate homymyn objects with another
   *
   * @param {Homonym} base the homonym to use to disambiguate
   * @param {Homonym[]} disambiguators the homonyms to use to disambiguate
   */
  static disambiguate(base, disambiguators) {
    if (disambiguators.length === 0) {
      return base;
    }
    const disambiguator = disambiguators.shift();
    let matchedLexemes = [];
    let missedLexemes = [];
    let possibleLexemes = [];
    let unmatchedLexemes = [];
    for (const otherLexeme of disambiguator.lexemes) {
      for (const lexeme of base.lexemes) {
        const newLex = lexeme.canBeDisambiguatedWith(otherLexeme) ? Lexeme.disambiguateInflections(lexeme, otherLexeme) : lexeme;
        if (lexeme.isFullHomonym(otherLexeme, { normalize: true })) {
          if (newLex.getSelectedInflection() !== null) {
            newLex.setDisambiguation(otherLexeme);
            matchedLexemes.push(newLex);
          } else {
            possibleLexemes.push(newLex);
          }
        } else {
          unmatchedLexemes.push(newLex);
        }
      }
      if (matchedLexemes.length === 0) {
        if (possibleLexemes.length > 0) {
          for (const lexeme of possibleLexemes) {
            lexeme.setDisambiguation(otherLexeme);
            for (const infl of disambiguator.inflections) {
              lexeme.addInflection(infl);
              lexeme.setSelectedInflection(infl);
            }
          }
        } else {
          otherLexeme.setDisambiguation();
          for (const infl of otherLexeme.inflections) {
            otherLexeme.setSelectedInflection(infl);
          }
          missedLexemes.push(otherLexeme);
        }
      }
    }
    const newHom = new Homonym([...missedLexemes, ...matchedLexemes, ...possibleLexemes, ...unmatchedLexemes], base.targetWord);
    return Homonym.disambiguate(newHom, disambiguators);
  }
}
class HomonymGroup {
  constructor(homonyms = []) {
    this._homonyms = homonyms;
  }
  get homonyms() {
    return this._homonyms;
  }
  get hasHomonyms() {
    return this._homonyms.length > 0;
  }
  /**
   * Converts a homonyms form a HomonymGroup into a single Homonym.
   * This function was created to provide backward compatibility with the code that
   * does not work with homonym groups.
   *
   * @param {string} targetWord - A target word that will be set for all lemmas within a resulting homonym.
   * @param {boolean} disambiguated - Whether lemmas in a resulting homonyms should be disambiguated.
   * @returns {Homonym} - A resulting homonym.
   */
  toHomonym(targetWord, { disambiguated = false } = {}) {
    if (!targetWord) {
      throw new Error(HomonymGroup.errors.NO_TARGET_WORD);
    }
    const lexemes = this._homonyms.map((homonym) => homonym.lexemes).flat();
    if (disambiguated) {
      lexemes.forEach((lexeme) => {
        lexeme.disambiguated = true;
      });
    }
    return new Homonym(lexemes, targetWord);
  }
}
HomonymGroup.errors = {
  NO_TARGET_WORD: "Target word is not provided"
};
class PsEventData {
  /**
   * @param {PsEvent} event - An event that is being published.
   * @param {string} [caller=''] - The name of the function from where an event was published.
   */
  constructor(event, caller = "") {
    this.name = event.name;
    this.publisher = event.publisher;
    this.caller = caller;
  }
  /**
   * Returns a description of an event data in a printable form. Example:
   *     LexicalQuery.finalize -> [Lexical Query Complete]
   * If caller function is not specified during a `pub()` call, description will be:
   *     LexicalQuery -> [Lexical Query Complete]
   *
   * @returns {string} - An event data description.
   */
  get description() {
    return this.caller ? `${this.publisher}.${this.caller} -> [${this.name}]` : `${this.publisher} -> [${this.name}]`;
  }
}
class PsEvent {
  /**
   * @param {string} name - A name of the event.
   * @param {Function} publisher - A constructor function of a publisher.
   *        PsEvent uses its `name` property to set its publisher name field.
   */
  constructor(name, publisher) {
    this.name = name;
    this.publisher = publisher.name;
    this._subscribers = /* @__PURE__ */ new Map();
  }
  /**
   * This function is called when an event is published.
   *
   * @callback EventSubscriber
   * @param {object} data - An event-specific data associated with the event.
   * @param {PsEventData} eventData - A data about the event being published.
   *        PsEvent data allows generic subscribers (i.e. functions that are subscribed to
   *        more than one event) to distinguish between an event being published.
   */
  /**
   * Return a list of subscribers for the current event.
   *
   * @returns {EventSubscriber[]} An array of event subscriber functions.
   */
  get subscribers() {
    return Array.from(this._subscribers.values());
  }
  /**
   * Subscribes a function to the published event.
   * When event is published, a @type {Event~subscriber} function is called.
   *
   * @param {EventSubscriber} subscriber - A subscriber function.
   * @returns {Function} - An function that, when called, will unsubscribe the current subscriber from an event.
   */
  sub(subscriber) {
    const subId = v4();
    this._subscribers.set(subId, subscriber);
    return () => {
      this._subscribers.delete(subId);
    };
  }
  /**
   * Publishes an event with data related to it. All subscribers will receive an
   * event notification along with event data.
   *
   * @param {object} [data={}] - An event-specific data associated with the event.
   * @param {string} [caller=''] - The name of the function that called `pub`.
   */
  pub(data = {}, caller = "") {
    this._subscribers.forEach((l) => l(data, new PsEventData(this, caller)));
  }
  /**
   * Unsubscribes all subscribers from an event.
   */
  unsubAll() {
    this._subscribers.clear();
  }
}
class TextQuoteSelector {
  constructor(languageCode, normalizedText, prefix = null, suffix = null, source = null) {
    this.languageCode = languageCode;
    this.normalizedText = normalizedText;
    this.contextForward = 6;
    this.contextBackward = 6;
    this.text = this.normalizedText;
    this.prefix = prefix;
    this.suffix = suffix;
    this.source = source;
    this.ID = v4();
  }
  get contextHTML() {
    const templateWord = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`;
    const checkPrefix = this.prefix.replace(this.text, templateWord);
    const checkSuffix = this.suffix.replace(this.text, templateWord);
    const fullText = `${checkPrefix} <span class="alpheios_worditem_incontext">${this.text}</span> ${checkSuffix}`;
    return fullText;
  }
  static readObject(jsonObject) {
    let tq = new TextQuoteSelector(jsonObject.languageCode, jsonObject.target.selector.exact);
    tq.prefix = jsonObject.target.selector.prefix;
    tq.suffix = jsonObject.target.selector.suffix;
    tq.text = jsonObject.targetWord;
    tq.source = jsonObject.target.source;
    return tq;
  }
  isEqual(otherTqs) {
    let checkContextThis = `${this.prefix}${this.text}${this.suffix}`;
    checkContextThis = checkContextThis.trim();
    let checkContextOther = `${otherTqs.prefix}${otherTqs.text}${otherTqs.suffix}`;
    checkContextOther = checkContextOther.trim();
    return this.text === otherTqs.text && this.source === otherTqs.source && this.languageCode === otherTqs.languageCode && checkContextThis === checkContextOther;
  }
  updateLanguage(langCode) {
    this.languageCode = langCode;
  }
}
class WordUsageExample extends TextQuoteSelector {
  constructor(language, targetWord, prefix, suffix, source, cit) {
    super(language, targetWord);
    this.prefix = prefix;
    this.suffix = suffix;
    this.source = source;
    this.cit = cit;
    this.author = null;
    this.textWork = null;
    this.passage = null;
  }
  createContext() {
    return null;
  }
  /**
   * Creates a full text of example prefix + word + suffix
   *
   * @returns {string}
   */
  get htmlExample() {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`;
  }
  /**
   * Creates a full description - author + textWork + cit number
   *
   * @param {string} lang - language for getting text
   * @returns {string}
   */
  fullCit(lang) {
    if (!this.author && !this.textWork && !this.passage) {
      return this.cit;
    }
    let finalFullCit = "";
    if (!lang) {
      finalFullCit = this.formattedAuthor + " " + this.formattedTextWork + " " + this.formattedPassage;
    } else {
      finalFullCit = this.author ? this.author.title(lang) : ".";
      finalFullCit = finalFullCit + " " + (this.textWork ? this.textWork.title(lang) : ".");
      finalFullCit = finalFullCit + " " + this.formattedPassage;
    }
    return finalFullCit.trim();
  }
  get formattedAuthor() {
    return this.author ? this.author.title() : "";
  }
  get formattedTextWork() {
    return this.textWork ? this.textWork.title() : "";
  }
  get formattedPassage() {
    return this.passage;
  }
  authorForSort(lang) {
    if (this.author) {
      return this.author.title(lang).toUpperCase();
    } else {
      return this.fullCit(lang).toUpperCase();
    }
  }
  textWorkForSort(lang) {
    if (this.textWork) {
      return this.textWork.title(lang).toUpperCase();
    } else {
      return this.fullCit(lang).toUpperCase();
    }
  }
  get prefixForSort() {
    const model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode);
    const clearPrefix = this.prefix.replace(new RegExp("[" + model.getPunctuation() + " ]", "g"), " ").toUpperCase().split(" ").filter((item) => item.length > 0);
    return clearPrefix[clearPrefix.length - 1];
  }
  get suffixForSort() {
    const model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode);
    return this.suffix.replace(new RegExp("[" + model.getPunctuation() + " ]", "g"), "").toUpperCase();
  }
}
class Author {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {Author}
   */
  constructor(urn, titles, abbreviations) {
    this.urn = urn;
    this.titles = titles;
    this.abbreviations = abbreviations;
  }
  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang() {
    return "eng";
  }
  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title(lang) {
    if (this.titles[lang]) {
      return this.titles[lang];
    } else if (this.titles[Author.defaultLang]) {
      return this.titles[Author.defaultLang];
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0];
    }
    return null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang];
    } else if (this.abbreviations[Author.defaultLang]) {
      return this.abbreviations[Author.defaultLang];
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0];
    }
    return null;
  }
}
class TextWork {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {Author} author - author of the textWork
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {TextWork}
   */
  constructor(author, urn, titles, abbreviations) {
    this.urn = urn;
    this.titles = titles;
    this.author = author;
    this.abbreviations = abbreviations;
  }
  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang() {
    return "eng";
  }
  /**
   * This property is used to define prefix fr extract ID
   *
   * @returns {string}
   */
  static get defaultIDPrefix() {
    return "phi";
  }
  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title(lang) {
    if (this.titles[lang]) {
      return this.titles[lang];
    } else if (this.titles[TextWork.defaultLang]) {
      return this.titles[TextWork.defaultLang];
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0];
    }
    return null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang];
    } else if (this.abbreviations[TextWork.defaultLang]) {
      return this.abbreviations[TextWork.defaultLang];
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0];
    }
    return null;
  }
}
class WordItem {
  /**
   * @class
   * @param data
   * {String} targetWord
   * {String} languageCode
   * {Boolean} important
   * {Boolean} currentSession
   * {TextQuoteSelector[]} context
   * {Homonym} homonym
   */
  constructor(data = { targetWord: null, languageCode: null, important: false, currentSession: true, context: [], homonym: {}, createdDT: null, updatedDT: null, frequency: null }) {
    this.version = 1;
    this.targetWord = data.targetWord;
    this.languageCode = data.languageCode;
    if (!this.targetWord || !this.languageCode) {
      throw new Error("Unable to construct a worditem without at least a targetWord and a languageCode");
    }
    this.important = data.important === void 0 ? false : data.important;
    this.currentSession = data.currentSession === void 0 ? true : data.currentSession;
    this.context = data.context || [];
    this.homonym = data.homonym || {};
    this.createdDT = data.createdDT;
    this.updatedDT = data.updatedDT;
    this.frequency = data.frequency;
  }
  /**
   * Construct a WordItem from JSON
   *
   * @param jsonObject
   */
  static readObject(jsonObject) {
    let homonym = {};
    let context = [];
    if (jsonObject.homonym) {
      homonym = WordItem.readHomonym(jsonObject);
    }
    if (jsonObject.context) {
      context = WordItem.readContext(jsonObject);
    }
    const worditem = new WordItem({
      targetWord: jsonObject.targetWord,
      languageCode: jsonObject.languageCode,
      important: jsonObject.important,
      currentSession: jsonObject.currentSession,
      context,
      homonym
    });
    return worditem;
  }
  /**
   * Construct the homonym portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readHomonym(jsonObject) {
    return Homonym.readObject(jsonObject.homonym);
  }
  get hasTextQuoteSelectors() {
    return this.context.length > 0;
  }
  /**
   * Construct the context portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readContext(jsonObject) {
    let tqs = [];
    for (const jsonObj of jsonObject) {
      const tq = TextQuoteSelector.readObject(jsonObj);
      tqs.push(tq);
    }
    return tqs;
  }
  /**
   * add one or more context selectors
   *
   * @param {TextQuoteSelector[]} selectors
   */
  addContext(selectors) {
    for (const s of selectors) {
      const found = this.context.filter((tqs) => tqs.isEqual(s));
      if (found.length === 0) {
        this.context.push(s);
      }
    }
  }
  /**
   * getter for the lemmas in this WordItem
   */
  get lemmasList() {
    if (this.homonym && this.homonym.lexemes) {
      return this.homonym.lexemes.map((lexeme) => lexeme.lemma.word).filter((value, index, self2) => {
        return self2.indexOf(value) === index;
      }).join(", ");
    }
    return "";
  }
  /**
   * updates empty properties of this wordItem with those of the supplied worditem if also non-empty
   *
   * @param prevWordItem
   */
  merge(prevWordItem) {
    const checkProps = ["homonym", "important", "currentSession"];
    for (const prop of checkProps) {
      if (this._emptyProp(prop) && !prevWordItem._emptyProp(prop)) {
        this[prop] = prevWordItem[prop];
      }
    }
  }
  /**
   * private method to detect an empty property
   *
   * @param propName
   */
  _emptyProp(propName) {
    return !this[propName] || typeof this[propName] === "object" && Object.keys(this[propName]).length === 0;
  }
  get formattedContext() {
    let res = {};
    for (const tq of this.context) {
      if (!res[tq.source]) {
        res[tq.source] = [];
      }
      res[tq.source].push(tq);
    }
    return res;
  }
}
class WordList {
  /**
   * @class
   * @param {string} languageCode the language code of the list
   * @param {WordItem[]} worditems an optional array of WordItems with which to initialize the list
   */
  constructor(languageCode, worditems = []) {
    if (!languageCode) {
      throw new Error("Unable to construct a wordlist without a languagecode");
    }
    this.languageCode = languageCode;
    this.items = {};
    worditems.forEach((item) => {
      this.addWordItem(item);
    });
  }
  get size() {
    return Object.keys(this.items).length;
  }
  /**
   * get the items of the list
   */
  get values() {
    return Object.values(this.items);
  }
  /**
   * checks to see if the list is empty
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return Object.values(this.items).length === 0;
  }
  addWordItem(item) {
    if (item.languageCode !== this.languageCode) {
      throw new Error(`Language Code mismatch ${item.languageCode} !=== ${this.languageCode}`);
    }
    const existingItem = this.getWordItem(item.targetWord, false);
    if (existingItem) {
      item.merge(existingItem);
    }
    const key = this._makeItemKey(this.languageCode, item.targetWord);
    this.items[key] = item;
  }
  /**
   * delete an individual word item from the list
   *
   * @param {string} targetWord the word to delete
   * @returns {WordItem} the deleted item
   */
  deleteWordItem(targetWord) {
    const key = this._makeItemKey(this.languageCode, targetWord);
    const toDelete = this.items[key];
    if (toDelete) {
      delete this.items[key];
    }
    return toDelete;
  }
  /**
   * delete all items from a list
   */
  removeAllWordItems() {
    this.items = {};
  }
  /**
   * get an item from a list
   *
   * @param targetWord the word to get
   * @param {boolean} create true to create the item if it doesn't exist
   * @param eventWordItemUpdated
   * @returns {WordItem} the retrieved item
   */
  getWordItem(targetWord, create = true, eventWordItemUpdated = null) {
    const key = this._makeItemKey(this.languageCode, targetWord);
    if (create && !this.items[key]) {
      const wordItem = new WordItem({ targetWord, languageCode: this.languageCode });
      if (eventWordItemUpdated) {
        eventWordItemUpdated.pub({ dataObj: wordItem, params: { segment: "common" } });
      }
      this.items[key] = wordItem;
    }
    return this.items[key];
  }
  /**
   * make a key for a word item
   *
   * @param {string} languageCode
   * @param {string} targetWord
   */
  _makeItemKey(languageCode, targetWord) {
    return `${languageCode}:${targetWord.toLowerCase()}`;
  }
}
class TreebankDataItem {
  /**
   * Creates a treebank item. It can be created for either a specific text element (i.e. a selected word)
   * or for the document (a web page) that has treebank data.
   * If it is created for a text element, an 'elem' parameter will be provided and it will contain
   * a selected text element.
   * If a treebank item is created for a document (as when a web page with treebank data in it is loaded
   * but a specific word is not selected) an 'elem' parameter will be skipped. In that case constructor
   * will scan document in a search of any document ID and sentence ID that are required to be in a URL
   * to load a treebank diagram.
   *
   * @param {node} [elem=null] - An HTML node that contains a selected word (optional).
   */
  constructor(elem = null) {
    this.version = 0;
    this.app = null;
    this.sourceUrl = null;
    this.wordIds = [];
    this.sentenceId = null;
    this.doc = null;
    this.suppressTree = false;
    const tbSrcElem = elem ? elem.closest("[data-alpheios_tb_app]") : document.querySelector("[data-alpheios_tb_app]");
    if (tbSrcElem) {
      this.app = tbSrcElem.dataset.alpheios_tb_app;
      if (this.app !== "perseids-treebank-template") {
        throw new Error("Unsupported treebank application. This version of Alpheios only supports the perseids-treebank-template viewer app.");
      }
      if (tbSrcElem.dataset.alpheios_tb_app_version) {
        this.version = Number.parseInt(tbSrcElem.dataset.alpheios_tb_app_version, 10);
        if (!Number.isInteger(this.version)) {
          throw new Error(`Treebank version is incorrect in: ${tbSrcElem.outerHTML}`);
        }
      }
      if (!tbSrcElem.dataset.alpheios_tb_app_url) {
        throw new Error(`Missing treebank source URL in: ${tbSrcElem.outerHTML}`);
      }
      this.sourceUrl = tbSrcElem.dataset.alpheios_tb_app_url;
      if (tbSrcElem.dataset.alpheios_tb_morph_only) {
        this.suppressTree = Boolean(tbSrcElem.dataset.alpheios_tb_morph_only !== "false");
      }
      const tbRefElem = elem ? elem.closest("[data-alpheios_tb_ref]") : document.querySelector("[data-alpheios_tb_ref]");
      let wordElem = null;
      let sentElem;
      if (elem) {
        wordElem = elem.closest("[data-alpheios_tb_word]");
        sentElem = wordElem ? wordElem.closest("[data-alpheios_tb_sent]") : elem.closest("[data-alpheios_tb_sent]");
      } else {
        sentElem = document.querySelector("[data-alpheios_tb_sent]");
      }
      if (!tbRefElem && !(wordElem || sentElem)) {
        throw new Error("An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes");
      }
      if (wordElem || sentElem) {
        if (!sentElem) {
          throw new Error("Sentence ID is undefined: there is no parent element with data-alpheios_tb_sent attribute");
        }
        const docElem = wordElem ? wordElem.closest("[data-alpheios_tb_doc]") : sentElem.closest("[data-alpheios_tb_doc]");
        if (!docElem) {
          throw new Error("Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute");
        }
        if (wordElem) {
          this.wordIds = wordElem.dataset.alpheios_tb_word.split(" ");
        }
        this.sentenceId = sentElem.dataset.alpheios_tb_sent;
        this.doc = docElem.dataset.alpheios_tb_doc;
      } else {
        const reference = tbRefElem.dataset.alpheios_tb_ref;
        let refs;
        try {
          refs = reference.split(" ").map((ref) => TreebankDataItem.parseReference(ref));
        } catch (err) {
          throw new Error(`${err.message} in: ${tbSrcElem.outerHTML}`);
        }
        refs = refs.filter((i) => i.doc === refs[0].doc && i.sent === refs[0].sent);
        this.doc = refs[0].doc;
        this.sentenceId = refs[0].sent;
        this.wordIds = refs.map((i) => i.word);
      }
    }
    if (!this.doc) {
      throw new Error("Document data is missing");
    }
    if (!this.sentenceId) {
      throw new Error("Sentence data is missing");
    }
  }
  static getTreebankData(elem = null) {
    try {
      return new TreebankDataItem(elem);
    } catch (err) {
      return null;
    }
  }
  /**
   * Parse a reference in a "phi0959.phi006.alpheios-text-lat1#2-13" format to document, sentence ID, and word ID.
   *
   * @param {string} reference - A reference value to parse.
   * @returns {{doc: string, sent: string, word: string}} - An object containing parsed values.
   */
  static parseReference(reference) {
    const [doc, sentWordRef] = reference.split(/#/);
    if (!doc || !sentWordRef) {
      throw new Error("Invalid treebank reference");
    }
    const [sent, word] = sentWordRef.split(/-/);
    if (!sent) {
      throw new Error("Invalid treebank sent ID");
    }
    if (!word) {
      throw new Error("Invalid treebank word ID");
    }
    return { doc, sent, word };
  }
  setWordData(wordIds) {
    this.wordIds = wordIds;
  }
  removeWordData() {
    this.wordIds = [];
  }
  get fullUrl() {
    return this.sourceUrl.replace("DOC", this.doc).replace("SENTENCE", this.sentenceId);
  }
  get docUrl() {
    return this.sourceUrl.replace("DOC", this.doc);
  }
  get provider() {
    return new URL(this.fullUrl).origin;
  }
  get hasWordData() {
    return this.wordIds.length > 0;
  }
  get hasSentenceData() {
    return Boolean(this.sentenceId);
  }
}
class OptionItem {
  constructor(item, key, storageAdapter) {
    if (!item) {
      throw new Error("Item cannot be empty");
    }
    if (!key) {
      throw new Error("Key cannot be empty");
    }
    if (!storageAdapter) {
      throw new Error("Storage adapter object should be provided");
    }
    for (const key2 of Object.keys(item)) {
      this[key2] = item[key2];
    }
    this.currentValue = this.defaultValue;
    this.name = key;
    this.storageAdapter = storageAdapter;
  }
  textValues() {
    return this.values.map((value) => value.text);
  }
  /**
   * If `prop` is not specified, returns a value object of a current item.
   * Otherwise, returns a value of a property specified by `prop`.
   *
   * @param {string} prop - A name of a property of a current items that must be returned.
   *        Values currently supported are: `text`, `value`, undefined.
   * @returns {* | Array<*>} - A single item or an array of items. Item type depends
   * on the value of the `prop` or the lack of it.
   */
  currentItem(prop = void 0) {
    let item = [];
    for (const value of this.values) {
      if (this.multiValue) {
        if (this.currentValue.includes(value.value)) {
          const itemValue = prop ? value[prop] : value;
          item.push(itemValue);
        }
      } else {
        if (value.value === this.currentValue) {
          item = prop ? value[prop] : value;
        }
      }
    }
    return item;
  }
  currentTextValue() {
    return this.currentItem("text");
  }
  addValue(value, text) {
    this.values.push({ value, text });
    return this;
  }
  setValue(value) {
    this.currentValue = value;
    this.save();
    return this;
  }
  setTextValue(textValue) {
    this.currentValue = this.multiValue ? [] : "";
    for (const value of this.values) {
      if (this.multiValue) {
        for (const tv of textValue) {
          if (value.text === tv) {
            this.currentValue.push(value.value);
          }
        }
      } else {
        if (value.text === textValue) {
          this.currentValue = value.value;
        }
      }
    }
    this.save();
    return this;
  }
  removeItem() {
    this.currentValue = null;
    this.storageAdapter.remove(this.name).then(
      () => {
      },
      (errorMessage) => {
        Logger.getInstance().error(`Unexpected error resetting Alpheios option ${this.name}: ${errorMessage}`);
      }
    );
  }
  /**
   * Saves an option value to the local storage.
   */
  save() {
    let option = {};
    option[this.name] = JSON.stringify(this.currentValue);
    this.storageAdapter.set(option).then(
      () => {
      },
      (errorMessage) => {
        Logger.getInstance().error(`Unexpected error storing Alpheios option ${this.name}: ${errorMessage}`);
      }
    );
  }
  /**
   *
   * @param {Array[Object]} valuesArr - Array[option's values]
   */
  uploadValuesFromArray(valuesArr) {
    this.values = [...valuesArr];
    this.defaultValue = this.values[0].value;
  }
}
class Options {
  /**
   * Options is a class which encapsulates defaults and user preferences
   *
   * @param {object} defaults - defaults for the instance of the class.
   * Use DefaultsLoader class to convert defaults data from different sources.
   * Mandatory fields:
   *    {string} domain - A domain name that defines options context
   *    {Object} items - An object that represents options that are exposed to the user. Each property is an option name.
   * @param {StorageAdapter} storageAdapter - A storage adapter implementation
   */
  constructor(defaults2, storageAdapter) {
    if (!defaults2 || !defaults2.domain || !defaults2.items || !defaults2.version) {
      throw new Error('Defaults have no obligatory "domain", "version" and "items" properties');
    }
    if (!storageAdapter) {
      throw new Error("No storage adapter implementation provided");
    }
    this.defaults = defaults2;
    this.domain = defaults2.domain;
    this.version = defaults2.version.toString();
    this.storageAdapter = storageAdapter;
    this.items = Options.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
  }
  static initItems(defaults2, storageAdapter, domain, version) {
    let items = {};
    for (const [option, value] of Object.entries(defaults2)) {
      if (value.group) {
        items[option] = [];
        for (const [group, item] of Object.entries(value.group)) {
          const key = Options.constructKey(domain, version, option, group);
          items[option].push(new OptionItem(item, key, storageAdapter));
        }
      } else {
        const key = Options.constructKey(domain, version, option);
        items[option] = new OptionItem(value, key, storageAdapter);
      }
    }
    return items;
  }
  /**
   * Reset all options to default values
   */
  async reset() {
    await this.storageAdapter.clearAll();
    this.items = Options.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
  }
  get names() {
    return Object.keys(this.items);
  }
  /**
   * Loads options from the storage. Returns a promise that is resolved if options are loaded
   * successfully and that is rejectd if there was an error retrieving them.
   *
   * @returns {Promise<Options>}
   */
  async load() {
    try {
      const values = await this.storageAdapter.get();
      for (const key in values) {
        const parsedKey = Options.parseKey(key);
        if (this.items.hasOwnProperty(parsedKey.name) && this.version === parsedKey.version) {
          if (parsedKey.group) {
            this.items[parsedKey.name].forEach((f) => {
              if (f.name === key) {
                try {
                  f.currentValue = JSON.parse(values[key]);
                } catch (e) {
                  Logger.getInstance().warn(`Unable to parse Alpheios option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e);
                }
              }
            });
          } else {
            try {
              this.items[parsedKey.name].currentValue = JSON.parse(values[key]);
            } catch (e) {
              Logger.getInstance().warn(`Unable to parse Alpheios option value for  ${parsedKey.name} from ${values[parsedKey.name]}`, e);
            }
          }
        }
      }
      return this;
    } catch (error) {
      const message = `Unexpected error retrieving options for Alpheios from local storage: ${error}. Default values will be used instead`;
      Logger.getInstance().error(message);
    }
  }
  /**
   * Construct a key for a stored setting
   * To future proof the stored settings, we include domain and version
   * in the key name. Grouped settings are also flattened.
   *
   * @param {string} domain - the setting domain
   * @param {string} version - the setting version
   * @param {string} name - the setting name
   * @param {string} group - optional setting group
   */
  static constructKey(domain, version, name, group = null) {
    let key = `${domain}__${version}__${name}`;
    if (group) {
      key = `${key}__${group}`;
    }
    return key;
  }
  /**
   * Parse a stored setting name into a semantically meaningful object
   *
   * @param key
   */
  static parseKey(key) {
    const [domain, version, name, group] = key.split("__", 4);
    let parsed;
    try {
      parsed = {
        domain,
        version,
        name,
        group
      };
    } catch (e) {
      Logger.getInstance().warn(`Failed to parse stored Alpheios options key ${key}`);
    }
    return parsed;
  }
  /**
   * Converts optionItems to the object: { name of the option: currentValue }
   *
   * @returns {object}
   */
  get formatLabelValueList() {
    let result = {};
    Object.keys(this.items).forEach((nameItem) => {
      if (this.items[nameItem].currentValue !== void 0) {
        result[nameItem] = this.items[nameItem].currentValue;
      }
    });
    return result;
  }
  /**
   * Uploads values list from array if an option has valuesArray feature
   *
   * @param {object} valuesArrayList - with format nameValuesArray: Array[option's values]
   */
  checkAndUploadValuesFromArray(valuesArrayList) {
    Object.values(this.items).forEach((optionItem) => {
      if (optionItem.valuesArray && !optionItem.values && valuesArrayList[optionItem.valuesArray]) {
        optionItem.uploadValuesFromArray(valuesArrayList[optionItem.valuesArray]);
      }
    });
  }
  /**
   *
   * @param {string} domainPostfix - additional string for creating unique domain name
   * @param {StorageAdapter} storageAdapter - class of the storage adapter
   */
  clone(domainPostfix, storageAdapter) {
    let defaults2 = Object.assign({}, this.defaults);
    defaults2.domain = `${defaults2.domain}-${domainPostfix}`;
    const newOptions = new Options(defaults2, new storageAdapter(defaults2.domain));
    Object.keys(newOptions.items).forEach((optionKey) => {
      let newOptionItem = newOptions.items[optionKey];
      if (this.items[optionKey].values) {
        newOptionItem.uploadValuesFromArray(this.items[optionKey].values);
      }
    });
    return newOptions;
  }
}
class DefaultsLoader {
  static fromJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      Logger.getInstance().error("Unable to parse Alpheios JSON options string:", err);
      return {};
    }
  }
}
class StorageAdapter {
  constructor(domain = "alpheios-storage-domain") {
    this.domain = domain;
  }
  /**
   * Stores one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(keysObject) {
    return new Promise((resolve, reject) => reject(new Error("Set method should be implemented in a subclass")));
  }
  /**
   * Retrieves one or several values from local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(keys) {
    return new Promise((resolve, reject) => reject(new Error("Get method should be implemented in a subclass")));
  }
  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from local storage.
   *
   * @param {string} key - key of the item to be removed.
   * If a particular item exists, it will be removed.
   * @returns {Promise} - A promise that is resolved with with true if a key was removed
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  remove(key) {
    return new Promise((resolve, reject) => reject(new Error("Remove method should be implemented in a subclass")));
  }
  /**
   * clear all items in the storage
   */
  clearAll() {
    return new Promise((resolve, reject) => reject(new Error("clearAll method should be implemented in a subclass")));
  }
}
class ExtensionSyncStorage extends StorageAdapter {
  /**
   * A wrapper around a `browser.storage.sync.set()` of webextension.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(keysObject) {
    return browser.storage.sync.set(keysObject);
  }
  /**
   * A wrapper around a `browser.storage.sync.get()` of webextension. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(keys = void 0) {
    return browser.storage.sync.get(keys);
  }
  clearAll() {
    return browser.storage.sync.clear();
  }
}
class LocalStorageArea extends StorageAdapter {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(keysObject) {
    return new Promise((resolve, reject) => {
      try {
        let keys = window.localStorage.getItem(`${this.domain}-keys`);
        if (keys) {
          keys = JSON.parse(keys);
        } else {
          keys = [];
        }
        for (const [key, value] of Object.entries(keysObject)) {
          window.localStorage.setItem(key, value);
          if (!keys.includes(key)) {
            keys.push(key);
          }
        }
        window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(keys));
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  }
  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from the local storage.
   *
   * @param {string} key - a key of the item to be removed.
   * If a pair with the key specified exists, it will be removed.
   * @returns {Promise} - A promise that is resolved with with `true` if a key-value pair was removed
   * successfully. If the pair for removal is not in the storage, a promise is resolved with the `null` value.
   * If a removal operation fails for any reason, a promise is rejected with the error.
   */
  remove(key) {
    return new Promise((resolve, reject) => {
      try {
        if (key) {
          let keys = window.localStorage.getItem(`${this.domain}-keys`);
          if (keys) {
            keys = JSON.parse(keys);
            const index = keys.indexOf(key);
            if (index !== -1) {
              keys.splice(index, 1);
            }
            window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(keys));
            window.localStorage.removeItem(key);
            resolve(true);
          } else {
            resolve(null);
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(keys = void 0) {
    return new Promise((resolve, reject) => {
      try {
        if (!keys) {
          keys = [];
        } else if (Array.isArray(keys) && keys.length === 0) {
          keys = [];
        } else if (typeof keys === "string") {
          keys = [keys];
        } else if (typeof keys === "object") {
          keys = Object.keys(keys);
        } else {
          keys = [];
        }
        let result = {};
        if (keys.length === 0) {
          keys = window.localStorage.getItem(`${this.domain}-keys`);
          if (keys) {
            keys = JSON.parse(keys);
          } else {
            resolve(result);
          }
        }
        for (const key of keys) {
          result[key] = window.localStorage.getItem(key);
        }
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  clearAll() {
    return new Promise((resolve, reject) => {
      try {
        let result = null;
        let keys = window.localStorage.getItem(`${this.domain}-keys`);
        if (keys) {
          keys = JSON.parse(keys);
          for (const key of keys) {
            window.localStorage.removeItem(key);
          }
          window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify([]));
          resolve(true);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request, fetchOptions);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.11.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
class RemoteAuthStorageArea extends StorageAdapter {
  constructor(domain = "alpheios-storage-domain", auth = null) {
    super(domain);
    if (!auth || !auth.endpoints || !auth.endpoints.settings.match(/^https:\/\//) || !auth.accessToken) {
      throw new Error("Authentication details missing or invalid");
    }
    this.baseURL = auth.endpoints.settings;
    this.requestContext = {
      headers: {
        common: {
          Authorization: "bearer " + auth.accessToken,
          "Content-Type": "application/json"
        }
      }
    };
  }
  /**
   * A proxy for the Alpheios user-settings-api
   * It allows for storing key/value pairs to the api with an authorized user account
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  async set(keysObject) {
    for (const [key, value] of Object.entries(keysObject)) {
      const url = `${this.baseURL}/${key}`;
      const result = await axios.post(url, value, this.requestContext);
      if (result.status !== 201) {
        throw new Error(`Unexpected result status from settings api: ${result.status}`);
      }
    }
  }
  /**
   * proxy for the Alpheios user-settings-api LIST operation
   * Retrieves all data for the storage domain.
   *
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  async get() {
    const url = `${this.baseURL}?domain=${this.domain}`;
    const result = await axios.get(url, this.requestContext);
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error(`Unexpected result status from settings api: ${result.status}`);
    }
  }
  /**
   * proxy for the Alpheios user-settings DELETE LIST operation
   * deletes all settings for the domain from storage
   *
   * @returns {Promise} A Promise that executes the operation.
   */
  async clearAll() {
    const url = `${this.baseURL}?domain=${this.domain}`;
    const result = await axios.delete(url, this.requestContext);
    if (result.status !== 200) {
      throw new Error(`Unexpected result status from settings api: ${result.status}`);
    }
  }
}
class TempStorageArea extends StorageAdapter {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(keysObject) {
    return new Promise((resolve) => {
      resolve("TempStorageArea does not store any values permanently");
    });
  }
  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(keys = void 0) {
    return new Promise((resolve) => {
      resolve("TempStorageArea does not have any stored values");
    });
  }
}
class Resource {
  /**
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ title, id, baseUrl, description } = {}) {
    this.title = title;
    this.id = id;
    this.baseUrl = baseUrl;
    this.description = description;
  }
  /**
   *
   * @param {Array[String]} refs - a list of refs to passages
   * @param {string} passage - a url template for getting XML document
   */
  uploadRefs({ refs, passage } = {}) {
    this.passage = passage;
    this.refs = refs;
  }
  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData() {
    return {
      baseUrl: this.baseUrl,
      title: this.title,
      id: this.id,
      description: this.description,
      type: "resource",
      resource: this
    };
  }
  get refsLinks() {
    return this.refs.map((ref) => {
      return {
        baseUrl: this.baseUrl,
        id: this.id,
        ref,
        type: "document"
      };
    });
  }
}
class Collection {
  /**
   * Created from DTS API Json
   *
   * @param {number} totalItems - amount of items in a collection
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ totalItems, title, id, baseUrl, description, pagination } = {}) {
    this.totalItems = totalItems;
    this.title = title;
    this.id = id;
    this.baseUrl = baseUrl;
    this.description = description;
    this.members = [];
    this.resources = [];
    if (pagination) {
      this.pagination = this.definePagination(pagination);
    }
  }
  /**
   * Adds level - membered collection or resource
   *
   * @param {JSON Object} jsonObj  - described in Collection/Resource constructors
   */
  addMember(jsonObj) {
    if (jsonObj.type === "Collection") {
      this.members.push(new Collection(jsonObj));
    }
    if (jsonObj.type === "Resource") {
      this.resources.push(new Resource(jsonObj));
    }
  }
  /**
   * @returns {string} - title with totalItems in brackets
   */
  get formattedTitle() {
    const totalItems = this.totalItems ? ` (${this.totalItems})` : "";
    return `${this.title}${totalItems}`;
  }
  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData() {
    return {
      baseUrl: this.baseUrl,
      totalItems: this.totalItems,
      formattedTitle: this.formattedTitle,
      title: this.title,
      id: this.id,
      type: "collection"
    };
  }
  /**
   * @returns {Array[Object]} - array of links from membered collections
   */
  get membersLinks() {
    return this.members.map((memberCollection) => memberCollection.linkData);
  }
  /**
   * @returns {Array[Object]} - array of links from membered resources
   */
  get resourcesLinks() {
    return this.resources.map((resource) => resource.linkData);
  }
  /**
   * @returns {Array[Object]} - array of links - collections or resources
   */
  get links() {
    if (this.members.length > 0) {
      return this.membersLinks;
    } else if (this.resources.length > 0) {
      return this.resourcesLinks;
    }
    return [];
  }
  extractPageNum(link) {
    if (link) {
      const pageData = link.match(/page=(\d+)$/);
      return pageData ? parseInt(pageData[1]) : null;
    }
    return null;
  }
  definePagination(pagination) {
    const pagintaionFinal = {
      first: this.extractPageNum(pagination.first),
      next: this.extractPageNum(pagination.next),
      last: this.extractPageNum(pagination.last),
      previous: this.extractPageNum(pagination.previous)
    };
    pagintaionFinal.current = pagintaionFinal.next ? pagintaionFinal.next - 1 : pagintaionFinal.previous ? pagintaionFinal.previous + 1 : 1;
    return pagintaionFinal;
  }
}
class Tab {
  constructor(tabId, windowId, status) {
    this.tabId = tabId;
    this.windowId = windowId;
    this.status = "attached";
  }
  get uniqueId() {
    return this.constructor.createUniqueId(this.tabId, this.windowId);
  }
  get uniqueIdNew() {
    return this.constructor.createUniqueIdNew(this.tabId, this.windowId);
  }
  get isDeattached() {
    return this.status === "deattached";
  }
  deattach() {
    this.status = "deattached";
  }
  attach(newWinId) {
    this.windowId = newWinId;
    this.status = "attached";
  }
  clone() {
    return new Tab(this.tabId, this.windowId);
  }
  compareWithTab(tabObj) {
    return this.tabId === tabObj.tabId && this.windowId === tabObj.windowId;
  }
  static createUniqueId(tabId, windowId) {
    return Symbol.for(`Alpheios_tabId:${tabId.toString()},windowId:${windowId.toString()}`);
  }
  static createUniqueIdNew(tabId, windowId) {
    return `Alpheios_tabId:${tabId.toString()},windowId:${windowId.toString()}`;
  }
}
class UIStateAPI {
  constructor() {
    this.selectionLang = void 0;
    this.watchers = /* @__PURE__ */ new Map();
  }
  static get statuses() {
    return {
      script: {
        PENDING: Symbol.for("Alpheios_Status_Pending"),
        // Script has not been fully initialized yet
        ACTIVE: Symbol.for("Alpheios_Status_Active"),
        // Script is loaded and active
        DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
        // Script has been loaded, but is deactivated
        DISABLED: Symbol.for("Alpheios_Status_Disabled")
        // Content script has been disabled on a page and cannot be activated (due to incompatibility with a page content)
      },
      panel: {
        OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
        // Panel is open
        CLOSED: Symbol.for("Alpheios_Status_PanelClosed")
        // Panel is closed
      }
    };
  }
  /**
   * SetItem provides a monitored way to change a TabScript state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {UIStateAPI}
   */
  setItem(key, value) {
    this[key] = value;
    if (this.watchers && this.watchers.has(key)) {
      this.watchers.get(key)(key, this);
    }
    return this;
  }
  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {UIStateAPI} Reference to self for chaining
   */
  setWatcher(property, watchFunc) {
    this.watchers.set(property, watchFunc);
    return this;
  }
  /**
   * Check if the state of the panel is open
   * @return {boolean} true if open false if closed
   */
  isPanelOpen() {
    return false;
  }
  /**
   * Check if the state of the panel is closed
   * @return {boolean} true if closed false if open
   */
  isPanelClosed() {
    return false;
  }
  /**
   * Set the state of the panel to open
   * @return {UIStateAPI} the updated state object
   */
  setPanelOpen() {
    return this;
  }
  /**
   * Set the state of the panel to closed
   * @return {UIStateAPI} the updated state object
   */
  setPanelClosed() {
    return this;
  }
  /**
   * Check if the state of the UI is active (i.e. fully loaded and ready to use)
   * @return {boolean} true if active false if not
   */
  uiIsActive() {
    return false;
  }
  /**
   * Set the state of the UI to active (i.e. fully loaded and ready to use)
   * @return {IState} the updated state object
   */
  activateUI() {
    return this;
  }
  /**
   * Set the currently active panel tab
   * @param {String} tabName name of the tab
   * @return {UIStateAPI} the updated state object
   */
  changeTab(tabName) {
    return this;
  }
}
class TabScript extends UIStateAPI {
  constructor(tabObj) {
    super();
    this.tabID = tabObj ? tabObj.uniqueId : void 0;
    this.tabObj = tabObj;
    this.status = void 0;
    this.panelStatus = void 0;
    this.tab = void 0;
    this.embedLibStatus = void 0;
    this.uiActive = false;
    this.watchers = /* @__PURE__ */ new Map();
  }
  updateTabObject(tabId, windowId) {
    this.tabObj = new Tab(tabId, windowId);
    this.tabID = this.tabObj.uniqueId;
    return this;
  }
  deattach() {
    this.tabObj.deattach();
  }
  attach(newWinId) {
    this.tabObj.attach(newWinId);
  }
  get isDeattached() {
    return this.tabObj.isDeattached;
  }
  static get propTypes() {
    return {
      NUMERIC: Symbol("Numeric"),
      STRING: Symbol("String"),
      SYMBOL: Symbol("Symbol")
    };
  }
  static get props() {
    return {
      status: {
        name: "status",
        valueType: TabScript.propTypes.SYMBOL,
        values: {
          PENDING: Symbol.for("Alpheios_Status_Pending"),
          // Content script has not been fully initialized yet
          ACTIVE: Symbol.for("Alpheios_Status_Active"),
          // Content script is loaded and active
          DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
          // Content script has been loaded, but is deactivated
          DISABLED: Symbol.for("Alpheios_Status_Disabled")
          // Content script has been loaded, but it is disabled
        },
        defaultValueIndex: 0
      },
      embedLibStatus: {
        name: "embedLibStatus",
        valueType: TabScript.propTypes.SYMBOL,
        values: this.statuses.embedLib,
        defaultValueIndex: 1
      },
      panelStatus: {
        name: "panelStatus",
        valueType: TabScript.propTypes.SYMBOL,
        values: {
          OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
          // Panel is open
          CLOSED: Symbol.for("Alpheios_Status_PanelClosed"),
          // Panel is closed
          DEFAULT: Symbol.for("Alpheios_Status_PanelDefault")
          // Panel should set its state according to default values
        },
        defaultValueIndex: 1
      },
      tab: {
        name: "tab",
        valueType: TabScript.propTypes.STRING,
        values: {
          INFO: "info",
          DEFAULT: "default"
          // A tab should be set according to default values
        },
        defaultValueIndex: 0
      },
      uiActive: {
        name: "uiActive",
        valueType: Boolean
      }
    };
  }
  static get symbolProps() {
    return [TabScript.props.status.name, TabScript.props.embedLibStatus.name, TabScript.props.panelStatus.name];
  }
  static get stringProps() {
    return [TabScript.props.tab.name];
  }
  static get booleanProps() {
    return [];
  }
  /**
   * Only certain features will be stored within a serialized version of a TabScript. This is done
   * to prevent context-specific features (such as local event handlers) to be passed over the network
   * to a different context where they would make no sense. This getter returns a list of such fields.
   * @return {String[]}
   */
  static get dataProps() {
    return TabScript.symbolProps.concat(TabScript.stringProps).concat(TabScript.booleanProps);
  }
  /**
   * A copy constructor.
   * @param {TabScript} source - An instance of TabScript object we need to copy.
   * @return {TabScript} A copy of a source object.
   */
  static create(source) {
    let copy = new TabScript();
    for (const key of Object.keys(source)) {
      copy[key] = source[key];
    }
    return copy;
  }
  static get defaults() {
    return {
      status: TabScript.statuses.script.ACTIVE,
      panelStatus: TabScript.statuses.panel.OPEN
    };
  }
  static get statuses() {
    return {
      script: {
        PENDING: Symbol.for("Alpheios_Status_Pending"),
        // Content script has not been fully initialized yet
        ACTIVE: Symbol.for("Alpheios_Status_Active"),
        // Content script is loaded and active
        DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
        // Content script has been loaded, but is deactivated
        DISABLED: Symbol.for("Alpheios_Status_Disabled")
        // Content script has been disabled on a page and cannot be activated (due to incompatibility with a page content)
      },
      embedLib: {
        ACTIVE: Symbol.for("Embedded_Lib_Status_Active"),
        // Embedded Lib is present on a page and is activated
        INACTIVE: Symbol.for("Embedded_Lib_Status_Inactive")
        // Embedded Lib not loaded or is inactive
      },
      panel: {
        OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
        // Panel is open
        CLOSED: Symbol.for("Alpheios_Status_PanelClosed"),
        // Panel is closed
        DEFAULT: Symbol.for("Alpheios_Status_PanelDefault")
        // Panel should set its state according to default values
      }
    };
  }
  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {TabScript} Reference to self for chaining
   */
  setWatcher(property, watchFunc) {
    this.watchers.set(property, watchFunc);
    return this;
  }
  /**
   * SetItem provides a monitored way to change a TabScript state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {TabScript}
   */
  setItem(key, value) {
    this[key] = value;
    if (this.watchers && this.watchers.has(key)) {
      this.watchers.get(key)(key, this);
    }
    return this;
  }
  isEmbedLibActive() {
    return this.embedLibStatus === TabScript.statuses.embedLib.ACTIVE;
  }
  setEmbedLibActiveStatus() {
    this.setItem("embedLibStatus", TabScript.statuses.embedLib.ACTIVE);
    return this;
  }
  setEmbedLibInactiveStatus() {
    this.setItem("embedLibStatus", TabScript.statuses.embedLib.INACTIVE);
    return this;
  }
  setEmbedLibStatus(isActive) {
    if (isActive) {
      this.setItem("embedLibStatus", TabScript.statuses.embedLib.ACTIVE);
    } else {
      this.setItem("embedLibStatus", TabScript.statuses.embedLib.INACTIVE);
    }
  }
  isPanelOpen() {
    return this.panelStatus === TabScript.statuses.panel.OPEN;
  }
  isPanelClosed() {
    return this.panelStatus === TabScript.statuses.panel.CLOSED;
  }
  setPanelOpen() {
    this.setItem("panelStatus", TabScript.statuses.panel.OPEN);
    return this;
  }
  setPanelClosed() {
    this.setItem("panelStatus", TabScript.statuses.panel.CLOSED);
    return this;
  }
  setPanelDefault() {
    this.setItem("panelStatus", TabScript.statuses.panel.DEFAULT);
    return this;
  }
  isPanelStateDefault() {
    return this.panelStatus === TabScript.statuses.panel.DEFAULT;
  }
  isPanelStateValid() {
    return this.panelStatus === TabScript.statuses.panel.OPEN || this.panelStatus === TabScript.statuses.panel.CLOSED;
  }
  setTabDefault() {
    this.setItem("tab", TabScript.props.tab.values.DEFAULT);
    return this;
  }
  isTabStateDefault() {
    return this.tab === TabScript.props.tab.values.DEFAULT;
  }
  hasSameID(tabID) {
    return Symbol.keyFor(this.tabID) === Symbol.keyFor(tabID);
  }
  isActive() {
    return this.status === TabScript.statuses.script.ACTIVE;
  }
  isDeactivated() {
    return this.status === TabScript.statuses.script.DEACTIVATED;
  }
  isDisabled() {
    return this.status === TabScript.statuses.script.DISABLED;
  }
  isPending() {
    return this.status === TabScript.statuses.script.PENDING;
  }
  uiIsActive() {
    return this[TabScript.props.uiActive.name];
  }
  activate() {
    this.status = TabScript.statuses.script.ACTIVE;
    return this;
  }
  deactivate() {
    this.status = TabScript.statuses.script.DEACTIVATED;
    return this;
  }
  disable() {
    this.status = TabScript.statuses.script.DISABLED;
    return this;
  }
  activateUI() {
    this.setItem(TabScript.props.uiActive.name, true);
    return this;
  }
  changeTab(tabName) {
    this.setItem(TabScript.props.tab.name, tabName);
    return this;
  }
  update(source) {
    for (const key of Object.keys(source)) {
      if (source[key]) {
        this[key] = source[key];
      }
    }
    return this;
  }
  /**
   * Compares the current state with a targetState. A targetState is a state to where the current state should transform.
   * If any field value in the state is undefined, it means that there is no transformation goal for this field
   * (i.e we don't care about it value). Because of this, we will not include such fields into a diff result.
   * @param targetState
   * @return {{_changedKeys: Array, _changedEntries: Array}}
   */
  diff(targetState) {
    let diff = {
      // eslint-disable-line prefer-const
      _changedKeys: [],
      _changedEntries: []
    };
    if (this.tabID !== targetState.tabID) {
      diff.tabID = targetState.tabID;
      diff._changedKeys.push("tabID");
      diff._changedEntries.push(["tabID", targetState.tabID]);
    }
    for (const key of Object.keys(targetState)) {
      if (TabScript.dataProps.includes(key)) {
        if (this.hasOwnProperty(key)) {
          if (this[key] && targetState[key] && this[key] !== targetState[key]) {
            diff[key] = targetState[key];
            diff._changedKeys.push(key);
            diff._changedEntries.push([key, targetState[key]]);
          }
        }
      }
    }
    diff.keys = function() {
      return diff._changedKeys;
    };
    diff.entries = function() {
      return diff._changedEntries;
    };
    diff.has = function(prop) {
      return diff._changedKeys.includes(prop);
    };
    diff.isEmpty = function() {
      return !diff._changedKeys.length;
    };
    return diff;
  }
  /**
   * Creates a serializable copy of a source object. Firefox uses the structured clone algorithm
   * (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) to serialize objects.
   * Requirements of this algorithm are that a serializable object to have no Function or Error properties,
   * neither any DOM Nodes. That's why an empty serializable object is created and only
   * selected properties are copied into it.
   * @param {TabScript} source - An object to be serialized.
   * @return {Object} A serializable copy of a source.
   */
  static serializable(source) {
    let serializable = {};
    serializable.tabID = typeof source.tabID === "symbol" ? Symbol.keyFor(source.tabID) : source.tabID;
    serializable.tabObj = source.tabObj ? source.tabObj.clone() : void 0;
    for (const key of Object.keys(source)) {
      if (TabScript.dataProps.includes(key)) {
        const value = source[key];
        serializable[key] = typeof value === "symbol" ? Symbol.keyFor(value) : value;
      }
    }
    return serializable;
  }
  static readObject(jsonObject) {
    const tabObj = jsonObject.tabObj && jsonObject.tabObj.tabId && jsonObject.tabObj.windowId ? new Tab(jsonObject.tabObj.tabId, jsonObject.tabObj.windowId, jsonObject.tabObj.status) : void 0;
    let tabScript = new TabScript(tabObj);
    for (const prop of TabScript.symbolProps) {
      if (jsonObject[prop]) {
        tabScript[prop] = Symbol.for(jsonObject[prop]);
      }
    }
    for (const prop of TabScript.stringProps) {
      if (jsonObject[prop]) {
        tabScript[prop] = jsonObject[prop];
      }
    }
    for (const prop of TabScript.booleanProps) {
      if (jsonObject.hasOwnProperty(prop)) {
        tabScript[prop] = jsonObject[prop];
      }
    }
    return tabScript;
  }
}
export {
  ArabicLanguageModel,
  Author,
  ChineseLanguageModel,
  Collection,
  constants as Constants,
  DefaultsLoader,
  Definition,
  DefinitionSet,
  ExtensionSyncStorage,
  Feature,
  FeatureImporter,
  FeatureList,
  FeatureType,
  GeezLanguageModel,
  GreekLanguageModel,
  GrmFeature,
  Homonym,
  HomonymGroup,
  Inflection,
  LanguageModelFactory,
  LatinLanguageModel,
  Lemma,
  Lexeme,
  LocalStorageArea,
  Logger,
  Options,
  PersianLanguageModel,
  PsEvent,
  PsEventData,
  RemoteAuthStorageArea,
  Resource,
  ResourceProvider,
  SyriacLanguageModel,
  Tab,
  TabScript,
  TempStorageArea,
  TextQuoteSelector,
  TextWork,
  Translation,
  TreebankDataItem,
  UIStateAPI,
  WordItem,
  WordList,
  WordUsageExample
};
