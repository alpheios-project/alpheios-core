(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./driver.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/uuid/lib/bytesToUuid.js":
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/bytesToUuid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "../node_modules/uuid/lib/rng-browser.js":
/*!***********************************************!*\
  !*** ../node_modules/uuid/lib/rng-browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "../node_modules/uuid/v4.js":
/*!**********************************!*\
  !*** ../node_modules/uuid/v4.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "../node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./arabic_language_model.js":
/*!**********************************!*\
  !*** ./arabic_language_model.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArabicLanguageModel; });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature.js */ "./feature.js");




let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ArabicLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_ARABIC"] }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_ARA"] }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_ARA"], _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_AR"]] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_DIR_RTL"] }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_UNIT_WORD"] }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

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
    let tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, '')
    // hamzas - replace ALEF WITH MADDA ABOVE, ALEF WITH HAMZA ABOVE/BELOW with ALEF
    let hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, '\u{0627}')
    // harakat - drop FATHA, DAMMA, KASRA, SUPERSCRIPT ALEF, ALEF WASLA
    let harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, '')
    // shadda
    let shadda = harakat.replace(/\u{0651}/ug, '')
    // sukun
    let sukun = shadda.replace(/\u{0652}/ug, '')
    // alef
    let alef = sukun.replace(/\u{0627}/ug, '')
    let alternates = new Map([
      ['tanwin', tanwin],
      ['hamza', hamza],
      ['harakat', harakat],
      ['shadda', shadda],
      ['sukun', sukun],
      ['alef', alef]
    ])
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

  /**
   * Aggregate inflections for display according to language model characteristics
   */
  static aggregateInflectionsForDisplay (inflections) {
    // TODO at some point we might want to be able to check the provider in here
    // because this really only applies to the specifics of the Aramorph parser
    let aggregated = []
    let aggregates = { [_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_NOUN"]]: [], [_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_ADJECTIVE"]]: [], [_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_NOUN_PROPER"]]: [] }
    for (let infl of inflections) {
      if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph].value.match(/ADJ[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_ADJECTIVE"]].push(infl)
      } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph].value.match(/NOUN[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_NOUN"]].push(infl)
      } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph].value.match(/NOUN_PROP[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__["POFS_NOUN_PROPER"]].push(infl)
      } else {
        // we are also going to keep the examples out of the display for now
        infl.example = null
        aggregated.push(infl)
      }
    }
    for (let type of Object.keys(aggregates)) {
      let base = aggregated.filter((i) => i[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part].value === type)
      if (base.length !== 1) {
        // if we don't have the base form then we don't really know what to do here
        // so just put the inflection back in the ones available for display
        aggregated.push(...aggregates[type])
      }
      // we may decide we want to keep the extra suffix and morph information
      // from the alternate inflections but for now we just will drop it from
      // the inflections that are displayed
    }
    return aggregated
  }
}


/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! exports provided: LANG_UNIT_WORD, LANG_UNIT_CHAR, LANG_DIR_LTR, LANG_DIR_RTL, LANG_UNDEFINED, LANG_LATIN, LANG_GREEK, LANG_ARABIC, LANG_PERSIAN, STR_LANG_CODE_UNDEFINED, STR_LANG_CODE_LAT, STR_LANG_CODE_LA, STR_LANG_CODE_GRC, STR_LANG_CODE_ARA, STR_LANG_CODE_AR, STR_LANG_CODE_FAS, STR_LANG_CODE_PER, STR_LANG_CODE_FA_IR, STR_LANG_CODE_FA, POFS_ADJECTIVE, POFS_ADVERB, POFS_ADVERBIAL, POFS_ARTICLE, POFS_CONJUNCTION, POFS_EXCLAMATION, POFS_INTERJECTION, POFS_NOUN, POFS_NOUN_PROPER, POFS_NUMERAL, POFS_PARTICLE, POFS_PREFIX, POFS_PREPOSITION, POFS_PRONOUN, POFS_SUFFIX, POFS_SUPINE, POFS_VERB, POFS_VERB_PARTICIPLE, GEND_MASCULINE, GEND_FEMININE, GEND_NEUTER, GEND_COMMON, GEND_ANIMATE, GEND_INANIMATE, GEND_PERSONAL_MASCULINE, GEND_ANIMATE_MASCULINE, GEND_INANIMATE_MASCULINE, COMP_POSITIVE, COMP_COMPARITIVE, COMP_SUPERLATIVE, CASE_ABESSIVE, CASE_ABLATIVE, CASE_ABSOLUTIVE, CASE_ACCUSATIVE, CASE_ADDIRECTIVE, CASE_ADELATIVE, CASE_ADESSIVE, CASE_ADVERBIAL, CASE_ALLATIVE, CASE_ANTESSIVE, CASE_APUDESSIVE, CASE_AVERSIVE, CASE_BENEFACTIVE, CASE_CARITIVE, CASE_CAUSAL, CASE_CAUSAL_FINAL, CASE_COMITATIVE, CASE_DATIVE, CASE_DELATIVE, CASE_DIRECT, CASE_DISTRIBUTIVE, CASE_DISTRIBUTIVE_TEMPORAL, CASE_ELATIVE, CASE_ERGATIVE, CASE_ESSIVE, CASE_ESSIVE_FORMAL, CASE_ESSIVE_MODAL, CASE_EQUATIVE, CASE_EVITATIVE, CASE_EXESSIVE, CASE_FINAL, CASE_FORMAL, CASE_GENITIVE, CASE_ILLATIVE, CASE_INELATIVE, CASE_INESSIVE, CASE_INSTRUCTIVE, CASE_INSTRUMENTAL, CASE_INSTRUMENTAL_COMITATIVE, CASE_INTRANSITIVE, CASE_LATIVE, CASE_LOCATIVE, CASE_MODAL, CASE_MULTIPLICATIVE, CASE_NOMINATIVE, CASE_PARTITIVE, CASE_PEGATIVE, CASE_PERLATIVE, CASE_POSSESSIVE, CASE_POSTELATIVE, CASE_POSTDIRECTIVE, CASE_POSTESSIVE, CASE_POSTPOSITIONAL, CASE_PREPOSITIONAL, CASE_PRIVATIVE, CASE_PROLATIVE, CASE_PROSECUTIVE, CASE_PROXIMATIVE, CASE_SEPARATIVE, CASE_SOCIATIVE, CASE_SUBDIRECTIVE, CASE_SUBESSIVE, CASE_SUBELATIVE, CASE_SUBLATIVE, CASE_SUPERDIRECTIVE, CASE_SUPERESSIVE, CASE_SUPERLATIVE, CASE_SUPPRESSIVE, CASE_TEMPORAL, CASE_TERMINATIVE, CASE_TRANSLATIVE, CASE_VIALIS, CASE_VOCATIVE, MOOD_ADMIRATIVE, MOOD_COHORTATIVE, MOOD_CONDITIONAL, MOOD_DECLARATIVE, MOOD_DUBITATIVE, MOOD_ENERGETIC, MOOD_EVENTIVE, MOOD_GENERIC, MOOD_GERUNDIVE, MOOD_HYPOTHETICAL, MOOD_IMPERATIVE, MOOD_INDICATIVE, MOOD_INFERENTIAL, MOOD_INFINITIVE, MOOD_INTERROGATIVE, MOOD_JUSSIVE, MOOD_NEGATIVE, MOOD_OPTATIVE, MOOD_PARTICIPLE, MOOD_PRESUMPTIVE, MOOD_RENARRATIVE, MOOD_SUBJUNCTIVE, MOOD_SUPINE, NUM_SINGULAR, NUM_PLURAL, NUM_DUAL, NUM_TRIAL, NUM_PAUCAL, NUM_SINGULATIVE, NUM_COLLECTIVE, NUM_DISTRIBUTIVE_PLURAL, NRL_CARDINAL, NRL_ORDINAL, NRL_DISTRIBUTIVE, NURL_NUMERAL_ADVERB, ORD_1ST, ORD_2ND, ORD_3RD, ORD_4TH, ORD_5TH, ORD_6TH, ORD_7TH, ORD_8TH, ORD_9TH, TENSE_AORIST, TENSE_FUTURE, TENSE_FUTURE_PERFECT, TENSE_IMPERFECT, TENSE_PAST_ABSOLUTE, TENSE_PERFECT, TENSE_PLUPERFECT, TENSE_PRESENT, VKIND_TO_BE, VKIND_COMPOUNDS_OF_TO_BE, VKIND_TAKING_ABLATIVE, VKIND_TAKING_DATIVE, VKIND_TAKING_GENITIVE, VKIND_TRANSITIVE, VKIND_INTRANSITIVE, VKIND_IMPERSONAL, VKIND_DEPONENT, VKIND_SEMIDEPONENT, VKIND_PERFECT_DEFINITE, VOICE_ACTIVE, VOICE_PASSIVE, VOICE_MEDIOPASSIVE, VOICE_IMPERSONAL_PASSIVE, VOICE_MIDDLE, VOICE_ANTIPASSIVE, VOICE_REFLEXIVE, VOICE_RECIPROCAL, VOICE_CAUSATIVE, VOICE_ADJUTATIVE, VOICE_APPLICATIVE, VOICE_CIRCUMSTANTIAL, VOICE_DEPONENT, TYPE_IRREGULAR, TYPE_REGULAR, CLASS_PERSONAL, CLASS_REFLEXIVE, CLASS_POSSESSIVE, CLASS_DEMONSTRATIVE, CLASS_RELATIVE, CLASS_INTERROGATIVE, CLASS_GENERAL_RELATIVE, CLASS_INDEFINITE, CLASS_INTENSIVE, CLASS_RECIPROCAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_UNIT_WORD", function() { return LANG_UNIT_WORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_UNIT_CHAR", function() { return LANG_UNIT_CHAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_DIR_LTR", function() { return LANG_DIR_LTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_DIR_RTL", function() { return LANG_DIR_RTL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_UNDEFINED", function() { return LANG_UNDEFINED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_LATIN", function() { return LANG_LATIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_GREEK", function() { return LANG_GREEK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_ARABIC", function() { return LANG_ARABIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_PERSIAN", function() { return LANG_PERSIAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_UNDEFINED", function() { return STR_LANG_CODE_UNDEFINED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_LAT", function() { return STR_LANG_CODE_LAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_LA", function() { return STR_LANG_CODE_LA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_GRC", function() { return STR_LANG_CODE_GRC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_ARA", function() { return STR_LANG_CODE_ARA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_AR", function() { return STR_LANG_CODE_AR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_FAS", function() { return STR_LANG_CODE_FAS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_PER", function() { return STR_LANG_CODE_PER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_FA_IR", function() { return STR_LANG_CODE_FA_IR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STR_LANG_CODE_FA", function() { return STR_LANG_CODE_FA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_ADJECTIVE", function() { return POFS_ADJECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_ADVERB", function() { return POFS_ADVERB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_ADVERBIAL", function() { return POFS_ADVERBIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_ARTICLE", function() { return POFS_ARTICLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_CONJUNCTION", function() { return POFS_CONJUNCTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_EXCLAMATION", function() { return POFS_EXCLAMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_INTERJECTION", function() { return POFS_INTERJECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_NOUN", function() { return POFS_NOUN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_NOUN_PROPER", function() { return POFS_NOUN_PROPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_NUMERAL", function() { return POFS_NUMERAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_PARTICLE", function() { return POFS_PARTICLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_PREFIX", function() { return POFS_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_PREPOSITION", function() { return POFS_PREPOSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_PRONOUN", function() { return POFS_PRONOUN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_SUFFIX", function() { return POFS_SUFFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_SUPINE", function() { return POFS_SUPINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_VERB", function() { return POFS_VERB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POFS_VERB_PARTICIPLE", function() { return POFS_VERB_PARTICIPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_MASCULINE", function() { return GEND_MASCULINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_FEMININE", function() { return GEND_FEMININE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_NEUTER", function() { return GEND_NEUTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_COMMON", function() { return GEND_COMMON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_ANIMATE", function() { return GEND_ANIMATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_INANIMATE", function() { return GEND_INANIMATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_PERSONAL_MASCULINE", function() { return GEND_PERSONAL_MASCULINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_ANIMATE_MASCULINE", function() { return GEND_ANIMATE_MASCULINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GEND_INANIMATE_MASCULINE", function() { return GEND_INANIMATE_MASCULINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMP_POSITIVE", function() { return COMP_POSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMP_COMPARITIVE", function() { return COMP_COMPARITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMP_SUPERLATIVE", function() { return COMP_SUPERLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ABESSIVE", function() { return CASE_ABESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ABLATIVE", function() { return CASE_ABLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ABSOLUTIVE", function() { return CASE_ABSOLUTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ACCUSATIVE", function() { return CASE_ACCUSATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ADDIRECTIVE", function() { return CASE_ADDIRECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ADELATIVE", function() { return CASE_ADELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ADESSIVE", function() { return CASE_ADESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ADVERBIAL", function() { return CASE_ADVERBIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ALLATIVE", function() { return CASE_ALLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ANTESSIVE", function() { return CASE_ANTESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_APUDESSIVE", function() { return CASE_APUDESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_AVERSIVE", function() { return CASE_AVERSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_BENEFACTIVE", function() { return CASE_BENEFACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_CARITIVE", function() { return CASE_CARITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_CAUSAL", function() { return CASE_CAUSAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_CAUSAL_FINAL", function() { return CASE_CAUSAL_FINAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_COMITATIVE", function() { return CASE_COMITATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_DATIVE", function() { return CASE_DATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_DELATIVE", function() { return CASE_DELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_DIRECT", function() { return CASE_DIRECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_DISTRIBUTIVE", function() { return CASE_DISTRIBUTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_DISTRIBUTIVE_TEMPORAL", function() { return CASE_DISTRIBUTIVE_TEMPORAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ELATIVE", function() { return CASE_ELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ERGATIVE", function() { return CASE_ERGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ESSIVE", function() { return CASE_ESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ESSIVE_FORMAL", function() { return CASE_ESSIVE_FORMAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ESSIVE_MODAL", function() { return CASE_ESSIVE_MODAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_EQUATIVE", function() { return CASE_EQUATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_EVITATIVE", function() { return CASE_EVITATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_EXESSIVE", function() { return CASE_EXESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_FINAL", function() { return CASE_FINAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_FORMAL", function() { return CASE_FORMAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_GENITIVE", function() { return CASE_GENITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_ILLATIVE", function() { return CASE_ILLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INELATIVE", function() { return CASE_INELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INESSIVE", function() { return CASE_INESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INSTRUCTIVE", function() { return CASE_INSTRUCTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INSTRUMENTAL", function() { return CASE_INSTRUMENTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INSTRUMENTAL_COMITATIVE", function() { return CASE_INSTRUMENTAL_COMITATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_INTRANSITIVE", function() { return CASE_INTRANSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_LATIVE", function() { return CASE_LATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_LOCATIVE", function() { return CASE_LOCATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_MODAL", function() { return CASE_MODAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_MULTIPLICATIVE", function() { return CASE_MULTIPLICATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_NOMINATIVE", function() { return CASE_NOMINATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PARTITIVE", function() { return CASE_PARTITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PEGATIVE", function() { return CASE_PEGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PERLATIVE", function() { return CASE_PERLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_POSSESSIVE", function() { return CASE_POSSESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_POSTELATIVE", function() { return CASE_POSTELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_POSTDIRECTIVE", function() { return CASE_POSTDIRECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_POSTESSIVE", function() { return CASE_POSTESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_POSTPOSITIONAL", function() { return CASE_POSTPOSITIONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PREPOSITIONAL", function() { return CASE_PREPOSITIONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PRIVATIVE", function() { return CASE_PRIVATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PROLATIVE", function() { return CASE_PROLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PROSECUTIVE", function() { return CASE_PROSECUTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_PROXIMATIVE", function() { return CASE_PROXIMATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SEPARATIVE", function() { return CASE_SEPARATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SOCIATIVE", function() { return CASE_SOCIATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUBDIRECTIVE", function() { return CASE_SUBDIRECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUBESSIVE", function() { return CASE_SUBESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUBELATIVE", function() { return CASE_SUBELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUBLATIVE", function() { return CASE_SUBLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUPERDIRECTIVE", function() { return CASE_SUPERDIRECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUPERESSIVE", function() { return CASE_SUPERESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUPERLATIVE", function() { return CASE_SUPERLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_SUPPRESSIVE", function() { return CASE_SUPPRESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_TEMPORAL", function() { return CASE_TEMPORAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_TERMINATIVE", function() { return CASE_TERMINATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_TRANSLATIVE", function() { return CASE_TRANSLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_VIALIS", function() { return CASE_VIALIS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CASE_VOCATIVE", function() { return CASE_VOCATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_ADMIRATIVE", function() { return MOOD_ADMIRATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_COHORTATIVE", function() { return MOOD_COHORTATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_CONDITIONAL", function() { return MOOD_CONDITIONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_DECLARATIVE", function() { return MOOD_DECLARATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_DUBITATIVE", function() { return MOOD_DUBITATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_ENERGETIC", function() { return MOOD_ENERGETIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_EVENTIVE", function() { return MOOD_EVENTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_GENERIC", function() { return MOOD_GENERIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_GERUNDIVE", function() { return MOOD_GERUNDIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_HYPOTHETICAL", function() { return MOOD_HYPOTHETICAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_IMPERATIVE", function() { return MOOD_IMPERATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_INDICATIVE", function() { return MOOD_INDICATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_INFERENTIAL", function() { return MOOD_INFERENTIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_INFINITIVE", function() { return MOOD_INFINITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_INTERROGATIVE", function() { return MOOD_INTERROGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_JUSSIVE", function() { return MOOD_JUSSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_NEGATIVE", function() { return MOOD_NEGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_OPTATIVE", function() { return MOOD_OPTATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_PARTICIPLE", function() { return MOOD_PARTICIPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_PRESUMPTIVE", function() { return MOOD_PRESUMPTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_RENARRATIVE", function() { return MOOD_RENARRATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_SUBJUNCTIVE", function() { return MOOD_SUBJUNCTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOOD_SUPINE", function() { return MOOD_SUPINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_SINGULAR", function() { return NUM_SINGULAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_PLURAL", function() { return NUM_PLURAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_DUAL", function() { return NUM_DUAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_TRIAL", function() { return NUM_TRIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_PAUCAL", function() { return NUM_PAUCAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_SINGULATIVE", function() { return NUM_SINGULATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_COLLECTIVE", function() { return NUM_COLLECTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUM_DISTRIBUTIVE_PLURAL", function() { return NUM_DISTRIBUTIVE_PLURAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NRL_CARDINAL", function() { return NRL_CARDINAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NRL_ORDINAL", function() { return NRL_ORDINAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NRL_DISTRIBUTIVE", function() { return NRL_DISTRIBUTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NURL_NUMERAL_ADVERB", function() { return NURL_NUMERAL_ADVERB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_1ST", function() { return ORD_1ST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_2ND", function() { return ORD_2ND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_3RD", function() { return ORD_3RD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_4TH", function() { return ORD_4TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_5TH", function() { return ORD_5TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_6TH", function() { return ORD_6TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_7TH", function() { return ORD_7TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_8TH", function() { return ORD_8TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORD_9TH", function() { return ORD_9TH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_AORIST", function() { return TENSE_AORIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_FUTURE", function() { return TENSE_FUTURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_FUTURE_PERFECT", function() { return TENSE_FUTURE_PERFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_IMPERFECT", function() { return TENSE_IMPERFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_PAST_ABSOLUTE", function() { return TENSE_PAST_ABSOLUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_PERFECT", function() { return TENSE_PERFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_PLUPERFECT", function() { return TENSE_PLUPERFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TENSE_PRESENT", function() { return TENSE_PRESENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_TO_BE", function() { return VKIND_TO_BE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_COMPOUNDS_OF_TO_BE", function() { return VKIND_COMPOUNDS_OF_TO_BE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_TAKING_ABLATIVE", function() { return VKIND_TAKING_ABLATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_TAKING_DATIVE", function() { return VKIND_TAKING_DATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_TAKING_GENITIVE", function() { return VKIND_TAKING_GENITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_TRANSITIVE", function() { return VKIND_TRANSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_INTRANSITIVE", function() { return VKIND_INTRANSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_IMPERSONAL", function() { return VKIND_IMPERSONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_DEPONENT", function() { return VKIND_DEPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_SEMIDEPONENT", function() { return VKIND_SEMIDEPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VKIND_PERFECT_DEFINITE", function() { return VKIND_PERFECT_DEFINITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_ACTIVE", function() { return VOICE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_PASSIVE", function() { return VOICE_PASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_MEDIOPASSIVE", function() { return VOICE_MEDIOPASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_IMPERSONAL_PASSIVE", function() { return VOICE_IMPERSONAL_PASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_MIDDLE", function() { return VOICE_MIDDLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_ANTIPASSIVE", function() { return VOICE_ANTIPASSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_REFLEXIVE", function() { return VOICE_REFLEXIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_RECIPROCAL", function() { return VOICE_RECIPROCAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_CAUSATIVE", function() { return VOICE_CAUSATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_ADJUTATIVE", function() { return VOICE_ADJUTATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_APPLICATIVE", function() { return VOICE_APPLICATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_CIRCUMSTANTIAL", function() { return VOICE_CIRCUMSTANTIAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOICE_DEPONENT", function() { return VOICE_DEPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_IRREGULAR", function() { return TYPE_IRREGULAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_REGULAR", function() { return TYPE_REGULAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_PERSONAL", function() { return CLASS_PERSONAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_REFLEXIVE", function() { return CLASS_REFLEXIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_POSSESSIVE", function() { return CLASS_POSSESSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_DEMONSTRATIVE", function() { return CLASS_DEMONSTRATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_RELATIVE", function() { return CLASS_RELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_INTERROGATIVE", function() { return CLASS_INTERROGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_GENERAL_RELATIVE", function() { return CLASS_GENERAL_RELATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_INDEFINITE", function() { return CLASS_INDEFINITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_INTENSIVE", function() { return CLASS_INTENSIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASS_RECIPROCAL", function() { return CLASS_RECIPROCAL; });
/* eslint-disable no-unused-vars */
const LANG_UNIT_WORD = Symbol('word')
const LANG_UNIT_CHAR = Symbol('char')
const LANG_DIR_LTR = Symbol('ltr')
const LANG_DIR_RTL = Symbol('rtl')
const LANG_UNDEFINED = Symbol('undefined')
const LANG_LATIN = Symbol('latin')
const LANG_GREEK = Symbol('greek')
const LANG_ARABIC = Symbol('arabic')
const LANG_PERSIAN = Symbol('persian')
const STR_LANG_CODE_UNDEFINED = 'undefined'
const STR_LANG_CODE_LAT = 'lat'
const STR_LANG_CODE_LA = 'la'
const STR_LANG_CODE_GRC = 'grc'
const STR_LANG_CODE_ARA = 'ara'
const STR_LANG_CODE_AR = 'ar'
const STR_LANG_CODE_FAS = 'fas'
const STR_LANG_CODE_PER = 'per'
const STR_LANG_CODE_FA_IR = 'fa-IR'
const STR_LANG_CODE_FA = 'fa'
// parts of speech
const POFS_ADJECTIVE = 'adjective'
const POFS_ADVERB = 'adverb'
const POFS_ADVERBIAL = 'adverbial'
const POFS_ARTICLE = 'article'
const POFS_CONJUNCTION = 'conjunction'
const POFS_EXCLAMATION = 'exclamation'
const POFS_INTERJECTION = 'interjection'
const POFS_NOUN = 'noun'
const POFS_NOUN_PROPER = 'proper noun'
const POFS_NUMERAL = 'numeral'
const POFS_PARTICLE = 'particle'
const POFS_PREFIX = 'prefix'
const POFS_PREPOSITION = 'preposition'
const POFS_PRONOUN = 'pronoun'
const POFS_SUFFIX = 'suffix'
const POFS_SUPINE = 'supine'
const POFS_VERB = 'verb'
const POFS_VERB_PARTICIPLE = 'verb participle'
// gender
const GEND_MASCULINE = 'masculine'
const GEND_FEMININE = 'feminine'
const GEND_NEUTER = 'neuter'
const GEND_COMMON = 'common'
const GEND_ANIMATE = 'animate'
const GEND_INANIMATE = 'inanimate'
// Polish gender types
const GEND_PERSONAL_MASCULINE = 'personal masculine'
const GEND_ANIMATE_MASCULINE = 'animate masculine'
const GEND_INANIMATE_MASCULINE = 'inanimate masculine'
// comparative
const COMP_POSITIVE = 'positive'
const COMP_COMPARITIVE = 'comparative'
const COMP_SUPERLATIVE = 'superlative'
// case
const CASE_ABESSIVE = 'abessive'
const CASE_ABLATIVE = 'ablative'
const CASE_ABSOLUTIVE = 'absolutive'
const CASE_ACCUSATIVE = 'accusative'
const CASE_ADDIRECTIVE = 'addirective'
const CASE_ADELATIVE = 'adelative'
const CASE_ADESSIVE = 'adessive'
const CASE_ADVERBIAL = 'adverbial'
const CASE_ALLATIVE = 'allative'
const CASE_ANTESSIVE = 'antessive'
const CASE_APUDESSIVE = 'apudessive'
const CASE_AVERSIVE = 'aversive'
const CASE_BENEFACTIVE = 'benefactive'
const CASE_CARITIVE = 'caritive'
const CASE_CAUSAL = 'causal'
const CASE_CAUSAL_FINAL = 'causal-final'
const CASE_COMITATIVE = 'comitative'
const CASE_DATIVE = 'dative'
const CASE_DELATIVE = 'delative'
const CASE_DIRECT = 'direct'
const CASE_DISTRIBUTIVE = 'distributive'
const CASE_DISTRIBUTIVE_TEMPORAL = 'distributive-temporal'
const CASE_ELATIVE = 'elative'
const CASE_ERGATIVE = 'ergative'
const CASE_ESSIVE = 'essive'
const CASE_ESSIVE_FORMAL = 'essive-formal'
const CASE_ESSIVE_MODAL = 'essive-modal'
const CASE_EQUATIVE = 'equative'
const CASE_EVITATIVE = 'evitative'
const CASE_EXESSIVE = 'exessive'
const CASE_FINAL = 'final'
const CASE_FORMAL = 'formal'
const CASE_GENITIVE = 'genitive'
const CASE_ILLATIVE = 'illative'
const CASE_INELATIVE = 'inelative'
const CASE_INESSIVE = 'inessive'
const CASE_INSTRUCTIVE = 'instructive'
const CASE_INSTRUMENTAL = 'instrumental'
const CASE_INSTRUMENTAL_COMITATIVE = 'instrumental-comitative'
const CASE_INTRANSITIVE = 'intransitive'
const CASE_LATIVE = 'lative'
const CASE_LOCATIVE = 'locative'
const CASE_MODAL = 'modal'
const CASE_MULTIPLICATIVE = 'multiplicative'
const CASE_NOMINATIVE = 'nominative'
const CASE_PARTITIVE = 'partitive'
const CASE_PEGATIVE = 'pegative'
const CASE_PERLATIVE = 'perlative'
const CASE_POSSESSIVE = 'possessive'
const CASE_POSTELATIVE = 'postelative'
const CASE_POSTDIRECTIVE = 'postdirective'
const CASE_POSTESSIVE = 'postessive'
const CASE_POSTPOSITIONAL = 'postpositional'
const CASE_PREPOSITIONAL = 'prepositional'
const CASE_PRIVATIVE = 'privative'
const CASE_PROLATIVE = 'prolative'
const CASE_PROSECUTIVE = 'prosecutive'
const CASE_PROXIMATIVE = 'proximative'
const CASE_SEPARATIVE = 'separative'
const CASE_SOCIATIVE = 'sociative'
const CASE_SUBDIRECTIVE = 'subdirective'
const CASE_SUBESSIVE = 'subessive'
const CASE_SUBELATIVE = 'subelative'
const CASE_SUBLATIVE = 'sublative'
const CASE_SUPERDIRECTIVE = 'superdirective'
const CASE_SUPERESSIVE = 'superessive'
const CASE_SUPERLATIVE = 'superlative'
const CASE_SUPPRESSIVE = 'suppressive'
const CASE_TEMPORAL = 'temporal'
const CASE_TERMINATIVE = 'terminative'
const CASE_TRANSLATIVE = 'translative'
const CASE_VIALIS = 'vialis'
const CASE_VOCATIVE = 'vocative'
const MOOD_ADMIRATIVE = 'admirative'
const MOOD_COHORTATIVE = 'cohortative'
const MOOD_CONDITIONAL = 'conditional'
const MOOD_DECLARATIVE = 'declarative'
const MOOD_DUBITATIVE = 'dubitative'
const MOOD_ENERGETIC = 'energetic'
const MOOD_EVENTIVE = 'eventive'
const MOOD_GENERIC = 'generic'
const MOOD_GERUNDIVE = 'gerundive'
const MOOD_HYPOTHETICAL = 'hypothetical'
const MOOD_IMPERATIVE = 'imperative'
const MOOD_INDICATIVE = 'indicative'
const MOOD_INFERENTIAL = 'inferential'
const MOOD_INFINITIVE = 'infinitive'
const MOOD_INTERROGATIVE = 'interrogative'
const MOOD_JUSSIVE = 'jussive'
const MOOD_NEGATIVE = 'negative'
const MOOD_OPTATIVE = 'optative'
const MOOD_PARTICIPLE = 'participle'
const MOOD_PRESUMPTIVE = 'presumptive'
const MOOD_RENARRATIVE = 'renarrative'
const MOOD_SUBJUNCTIVE = 'subjunctive'
const MOOD_SUPINE = 'supine'
const NUM_SINGULAR = 'singular'
const NUM_PLURAL = 'plural'
const NUM_DUAL = 'dual'
const NUM_TRIAL = 'trial'
const NUM_PAUCAL = 'paucal'
const NUM_SINGULATIVE = 'singulative'
const NUM_COLLECTIVE = 'collective'
const NUM_DISTRIBUTIVE_PLURAL = 'distributive plural'
const NRL_CARDINAL = 'cardinal'
const NRL_ORDINAL = 'ordinal'
const NRL_DISTRIBUTIVE = 'distributive'
const NURL_NUMERAL_ADVERB = 'numeral adverb'
const ORD_1ST = '1st'
const ORD_2ND = '2nd'
const ORD_3RD = '3rd'
const ORD_4TH = '4th'
const ORD_5TH = '5th'
const ORD_6TH = '6th'
const ORD_7TH = '7th'
const ORD_8TH = '8th'
const ORD_9TH = '9th'
const TENSE_AORIST = 'aorist'
const TENSE_FUTURE = 'future'
const TENSE_FUTURE_PERFECT = 'future perfect'
const TENSE_IMPERFECT = 'imperfect'
const TENSE_PAST_ABSOLUTE = 'past absolute'
const TENSE_PERFECT = 'perfect'
const TENSE_PLUPERFECT = 'pluperfect'
const TENSE_PRESENT = 'present'
const VKIND_TO_BE = 'to be'
const VKIND_COMPOUNDS_OF_TO_BE = 'compounds of to be'
const VKIND_TAKING_ABLATIVE = 'taking ablative'
const VKIND_TAKING_DATIVE = 'taking dative'
const VKIND_TAKING_GENITIVE = 'taking genitive'
const VKIND_TRANSITIVE = 'transitive'
const VKIND_INTRANSITIVE = 'intransitive'
const VKIND_IMPERSONAL = 'impersonal'
const VKIND_DEPONENT = 'deponent'
const VKIND_SEMIDEPONENT = 'semideponent'
const VKIND_PERFECT_DEFINITE = 'perfect definite'
const VOICE_ACTIVE = 'active'
const VOICE_PASSIVE = 'passive'
const VOICE_MEDIOPASSIVE = 'mediopassive'
const VOICE_IMPERSONAL_PASSIVE = 'impersonal passive'
const VOICE_MIDDLE = 'middle'
const VOICE_ANTIPASSIVE = 'antipassive'
const VOICE_REFLEXIVE = 'reflexive'
const VOICE_RECIPROCAL = 'reciprocal'
const VOICE_CAUSATIVE = 'causative'
const VOICE_ADJUTATIVE = 'adjutative'
const VOICE_APPLICATIVE = 'applicative'
const VOICE_CIRCUMSTANTIAL = 'circumstantial'
const VOICE_DEPONENT = 'deponent'
const TYPE_IRREGULAR = 'irregular'
const TYPE_REGULAR = 'regular'
// Classes
const CLASS_PERSONAL = 'personal'
const CLASS_REFLEXIVE = 'reflexive'
const CLASS_POSSESSIVE = 'possessive'
const CLASS_DEMONSTRATIVE = 'demonstrative'
const CLASS_RELATIVE = 'relative'
const CLASS_INTERROGATIVE = 'interrogative'
const CLASS_GENERAL_RELATIVE = 'general relative'
const CLASS_INDEFINITE = 'indefinite'
const CLASS_INTENSIVE = 'intensive'
const CLASS_RECIPROCAL = 'reciprocal'
/* eslit-enable no-unused-vars */


/***/ }),

/***/ "./definition-set.js":
/*!***************************!*\
  !*** ./definition-set.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefinitionSet; });
/* harmony import */ var _definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definition */ "./definition.js");


class DefinitionSet {
  constructor (lemmaWord, languageID) {
    this.lemmaWord = lemmaWord
    this.languageID = languageID

    this.shortDefs = []
    this.fullDefs = []
  }

  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   * @param {Object} jsonObject - A JSON object representing DefinitionSet data.
   * @return {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject (jsonObject) {
    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, jsonObject.languageID)

    for (let shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(_definition__WEBPACK_IMPORTED_MODULE_0__["default"].readObject(shortDef))
    }
    for (let fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(_definition__WEBPACK_IMPORTED_MODULE_0__["default"].readObject(fullDef))
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
      if (!Array.isArray(definitions)) { definitions = [definitions] }
      this.shortDefs = this.shortDefs.concat(definitions)
    }
    return this.shortDefs
  }

  /**
   * clear accumulated short definitions
   */
  clearShortDefs () {
    this.shortDefs = []
  }

  /**
   * Appends one or more definitions to a list of full definitions.
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @return {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs (definitions) {
    // TODO: check for duplicates?
    if (definitions) {
      if (!Array.isArray(definitions)) { definitions = [definitions] }
      this.fullDefs = this.fullDefs.concat(definitions)
    }
    return this.fullDefs
  }

  /**
   * clear accumulated full definitions
   */
  clearFullDefs () {
    this.fullDefs = []
  }
}


/***/ }),

/***/ "./definition.js":
/*!***********************!*\
  !*** ./definition.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText
  }

  static readObject (jsonObject) {
    return new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Definition);


/***/ }),

/***/ "./driver.js":
/*!*******************!*\
  !*** ./driver.js ***!
  \*******************/
/*! exports provided: Constants, Definition, DefinitionSet, Feature, GrmFeature, FeatureType, FeatureList, FeatureImporter, Inflection, LanguageModelFactory, Homonym, Lexeme, Lemma, LatinLanguageModel, GreekLanguageModel, ArabicLanguageModel, PersianLanguageModel, ResourceProvider, Translation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _definition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definition.js */ "./definition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Definition", function() { return _definition_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _definition_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definition-set */ "./definition-set.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefinitionSet", function() { return _definition_set__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _grm_feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grm-feature.js */ "./grm-feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GrmFeature", function() { return _grm_feature_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _feature_type_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feature_type.js */ "./feature_type.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureType", function() { return _feature_type_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _feature_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feature_list.js */ "./feature_list.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureList", function() { return _feature_list_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FeatureImporter", function() { return _feature_importer_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LanguageModelFactory", function() { return _language_model_factory_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _homonym_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./homonym.js */ "./homonym.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Homonym", function() { return _homonym_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _lexeme_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lexeme.js */ "./lexeme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lexeme", function() { return _lexeme_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _lemma_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lemma.js */ "./lemma.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lemma", function() { return _lemma_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _inflection_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./inflection.js */ "./inflection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Inflection", function() { return _inflection_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _latin_language_model_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./latin_language_model.js */ "./latin_language_model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LatinLanguageModel", function() { return _latin_language_model_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _greek_language_model_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./greek_language_model.js */ "./greek_language_model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GreekLanguageModel", function() { return _greek_language_model_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./arabic_language_model.js */ "./arabic_language_model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArabicLanguageModel", function() { return _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _persian_language_model_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./persian_language_model.js */ "./persian_language_model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PersianLanguageModel", function() { return _persian_language_model_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _resource_provider_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./resource_provider.js */ "./resource_provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceProvider", function() { return _resource_provider_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./translation.js */ "./translation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Translation", function() { return _translation_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });


























/***/ }),

/***/ "./feature.js":
/*!********************!*\
  !*** ./feature.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Feature; });
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony import */ var _i18n_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n.js */ "./i18n.js");




/**
 * A grammatical feature object, that can replace both Feature and FeatureType objects.
 */
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
   * Items will be assigned a sort order according to their order in an array, starting from one.
   *
   * If multiple values with sort order are provided, data format will be:
   *  [[value1, sortOrder1], [value2, sortOrder2], [value3, sortOrder3], ...]
   * If a sort order is omitted anywhere, it will be set to a default sort order.
   *
   * Each value of a feature has its `sortOrder` property. This value is used to soft values of a feature
   * between themselves. Feature object has a `sortOrder` property of its own, too. It is used
   * to compare two Feature objects between themselves.
   *
   * @param {symbol} languageID - A language ID of a feature
   * @param {number} sortOrder - A sort order of a feature when multiple features are compared.
   * @param allowedValues - If feature has a restricted set of allowed values, here will be a list of those
   * values. An order of those values can define a sort order.
   */
  constructor (type, data, languageID, sortOrder = 1, allowedValues = []) {
    if (!Feature.isAllowedType(type)) {
      throw new Error('Features of "' + type + '" type are not supported.')
    }
    if (!data) {
      throw new Error('Feature should have a non-empty value(s).')
    }
    if (!languageID) {
      throw new Error('No language ID is provided')
    }

    this.type = type
    this.languageID = languageID
    this.sortOrder = sortOrder
    this.allowedValues = allowedValues

    // `_data` is an array
    this._data = Feature.dataValuesFromInput(data)
    this.sort()
  }

  static dataValuesFromInput (data) {
    let normalized
    if (!Array.isArray(data)) {
      // Single value with no sort order
      normalized = [[data, this.defaultSortOrder]]
    } else if (!Array.isArray(data[0])) {
      // Multiple values without any sort order, default sort order will be used
      // we reverse because sortOrder is numeric descending (i.e. 2 is before 1)
      normalized = data.map((v, i) => [v, data.length - i])
    } else {
      // Value has all the data, including a sort order
      normalized = data
    }
    return normalized.map(d => { return { value: d[0], sortOrder: Number.parseInt(d[1]) } })
  }

  /**
   *
   * @param featureData
   */
  static newFromFtr (featureData) {

  }

  static get types () {
    return {
      /**
       * @deprecated : Use `fullForm` where appropriate instead
       */
      word: 'word',
      fullForm: 'full form',
      hdwd: 'headword',
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
      var: 'var' // variance?
    }
  }

  static isAllowedType (value) {
    return Object.values(this.types).includes(`${value}`)
  }

  static get defaultSortOrder () {
    return 1
  }

  static get joinSeparator () {
    return ' '
  }

  static get defaultImporterName () {
    return 'default'
  }

  /**
   * Test to see if this feature allows unrestricted values.
   * @returns {boolean} true if unrestricted false if not.
   */
  get allowsUnrestrictedValues () {
    /*
    If `allowedValues` array is empty then there are no value restrictions
     */
    return this.allowedValues.length === 0
  }

  /**
   * Defines a sort order of feature values. Values are sorted according to their sort order
   * (a number starting from one). If several values have the same sort order, they will be
   * sorted alphabetically according to their values.
   * Sort order is deterministic.
   */
  sort () {
    this._data.sort((a, b) => a.sortOrder !== b.sortOrder ? b.sortOrder - a.sortOrder : a.value.localeCompare(b.value))
  }

  /**
   * Compares a feature's values to another feature's values for sorting
   * @param {Feature} otherFeature the feature to compare this feature's values to
   * @return {integer} >=1 if this feature should be sorted first, 0 if they are equal and -1 if this feature should be sorted second
   */
  compareTo (otherFeature) {
    // the data values are sorted upon construction and insertion so we only should need to look at the first values
    // feature sortOrders are descending (i.e. 5 sorts higher than 1)
    return otherFeature._data[0].sortOrder - this._data[0].sortOrder
  }

  get items () {
    return this._data
  }

  /**
   * Returns a single value string. If feature has a single value, this value will be returned.
   * If it has multiple values, those values will be concatenated with a default separator and
   * returned in a single string. Values composing this string are sorted according
   * to each value's sort order.
   * @return {string} A single value string.
   */
  get value () {
    return this.values.join(this.constructor.joinSeparator)
  }

  /**
   * Returns an array of string values of a feature, sorted according to each item's sort order.
   * If a feature contains a single feature, an array with one value will be returned.
   * @return {string[]} An array of string values.
   */
  get values () {
    return this._data.map(v => v.value)
  }

  /**
   * Retrieves a value object by name. Can be used to update a value object directly.
   * @param {string} featureVale - A feature value of an object to retrieve.
   */
  getValue (featureVale) {
    return this._data.find(v => v.value === featureVale)
  }

  /**
   * Returns a number of feature values.
   * @retrun {number] A quantity of feature values
   */
  get valQty () {
    return this._data.length
  }

  get isEmpty () {
    return this.valQty === 0
  }

  get isSingle () {
    return this.valQty === 1
  }

  get isMultiple () {
    return this.valQty > 1
  }

  /**
   * A string representation of a feature.
   * @return {string}
   */
  toString () {
    return this.value
  }

  /**
   * Examines the feature for a specific value.
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValue (value) {
    return this.values.includes(value)
  }

  /**
   * Checks if this feature has all value from an array.
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValues (values) {
    let hasValues = true
    for (let value of values) {
      hasValues = hasValues && this.hasValue(value)
    }
    return hasValues
  }

  /**
   * Checks if this feature has some value from an array.
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasSomeValues (values) {
    let hasValues = false
    for (let value of values) {
      hasValues = hasValues || this.hasValue(value)
    }
    return hasValues
  }

  get valuesUnrestricted () {
    return this.allowedValues.length === 0
  }

  /**
   * Two features are considered fully equal if they are of the same type, have the same language,
   * and the same set of feature values in the same order.
   * @param {Feature} feature - A GrmFtr object this feature should be compared with.
   * @return {boolean} True if features are equal, false otherwise.
   */
  isEqual (feature) {
    return this.type === feature.type &&
      _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(this.languageID, feature.languageID) &&
      this.value === feature.value
  }

  /**
   * Adds a single new value to the existing feature object.
   * This function is chainable.
   * @param {string} value - A feature value.
   * @param {number} sortOrder - A sort order.
   * @return {Feature} - Self reference for chaining.
   */
  addValue (value, sortOrder = this.constructor.defaultSortOrder) {
    if (!this.hasValue(value)) {
      this._data.push({
        value: value,
        sortOrder: sortOrder
      })
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      console.warn(`Value "${value} already exists. If you want to change it, use "getValue" to access it directly.`)
    }
    return this
  }

  /**
   * Adds multiple new values to the existing feature object.
   * This function is chainable.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   * @return {Feature} - Self reference for chaining.
   */
  addValues (data) {
    let normalizedData = this.constructor.dataValuesFromInput(data)
    let values = normalizedData.map(v => v.value)
    if (!this.hasValue(values)) {
      this._data = this._data.concat(normalizedData)
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      console.warn(`One or several values from "${values} already exist. If you want to change it, use "getValue" to access a value directly.`)
    }
    return this
  }

  /**
   * Removes a single value from the existing feature object.
   * @param value
   */
  removeValue (value) {
    // TODO: Do we need it?
    console.warn(`This feature is not implemented yet`)
  }

  /**
   * Creates a new single value Feature object of the same type and same language,
   * but with a different feature value.
   * This can be used when one feature defines a type and it is necessary
   * to create other items of the same type.
   * @param {string} value - A value of a feature.
   * @param {number} sortOrder.
   * @return {Feature} A new Ftr object.
   */
  createFeature (value, sortOrder = this.constructor.defaultSortOrder) {
    // TODO: Add a check of if the value exists in a source Feature object
    return new Feature(this.type, [[value, sortOrder]], this.languageID, this.sortOrder, this.allowedValues)
  }

  /**
   * Creates a multiple value Feature object of the same type and same language,
   * but with a different feature values.
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations,
   * formatted according to rules described in a Ftr constructor.
   * @return {Feature} A new Ftr object.
   */
  createFeatures (data) {
    return new Feature(this.type, data, this.languageID, this.sortOrder, this.allowedValues)
  }

  /**
   * Create a copy of the feature object.
   */
  getCopy () {
    let values = this._data.map(item => [item.value, item.sortOrder])
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues.slice())
  }

  /**
   * A locale-specific abbreviation for a feature's values.
   * @return {string[]}
   */
  toLocaleStringAbbr (lang = 'en') {
    // TODO: Should it return a string instead of array? This function is used in morph.vue.
    return this.values.map(v => _i18n_js__WEBPACK_IMPORTED_MODULE_2__["i18n"][lang][v].abbr)
  }

  /**
   * Adds an importer to the internal list.
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter (importer = new _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__["default"](), name = this.constructor.defaultImporterName) {
    if (!this.importers) {
      this.importers = new Map()
    }
    this.importers.set(name, importer)
    return importer
  }

  getImporter (name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    return this.importers.get(name)
  }

  /**
   * Adds feature values from the imported values.
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @return {Feature} - A new Ftr object.
   */
  addFromImporter (foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    const importer = this.importers.get(name)
    foreignData = this.constructor.dataValuesFromInput(foreignData)
    this._data.push(...foreignData.map(fv => { return { value: importer.get(fv.value), sortOrder: fv.sortOrder } }))
    this.sort()
    return this
  }

  /**
   * Creates a new feature of the same type and with the same language from the imported values.
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @return {Feature} - A new Ftr object.
   */
  createFromImporter (foreignData, name = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(name)) {
      throw new Error(`Importer "${name}" does not exist`)
    }
    const importer = this.importers.get(name)
    if (!Array.isArray(foreignData)) {
      foreignData = [foreignData]
    }
    let values = foreignData.map(fv => importer.get(fv))
    /*
    Some values may be mapped into multiple values. For them an importer will return an array of values instead of a single value.
    The values will be a multidimensional array that will require flattening.
     */
    values = values.reduce((acc, cv) => acc.concat(cv), [])
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues)
  }
}


/***/ }),

/***/ "./feature_importer.js":
/*!*****************************!*\
  !*** ./feature_importer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class FeatureImporter {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @return {FeatureImporter}
   */
  constructor (defaults = [], returnUnknown = false) {
    this.hash = {}
    for (let value of defaults) {
      this.map(value, value)
    }
    this.returnUnknown = returnUnknown
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

    this.hash[importedValue] = libraryValue
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
   * @param {string} sourceValue - External value
   * @returns {Object | string} One or more of library standard values
   */
  get (sourceValue) {
    if (this.has(sourceValue)) {
      return this.hash[sourceValue]
    } else if (this.returnUnknown) {
      return sourceValue
    } else {
      throw new Error('A value "' + sourceValue + '" is not found in the importer.')
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (FeatureImporter);


/***/ }),

/***/ "./feature_list.js":
/*!*************************!*\
  !*** ./feature_list.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    this._features = []
    this._types = {}
    this.add(features)
  }

  add (features) {
    if (!features || !Array.isArray(features)) {
      throw new Error('Features must be defined and must come in an array.')
    }

    for (let feature of features) {
      this._features.push(feature)
      this._types[feature.type] = feature
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
    this._features.forEach(callback)
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
/* harmony default export */ __webpack_exports__["default"] = (FeatureList);


/***/ }),

/***/ "./feature_type.js":
/*!*************************!*\
  !*** ./feature_type.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony import */ var _language_model_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language_model_factory */ "./language_model_factory.js");




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
    if (!values || !Array.isArray(values)) {
      throw new Error('Values should be an array (or an empty array) of values.')
    }
    if (!language) {
      throw new Error('FeatureType constructor requires a language')
    }

    this.type = type
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = _language_model_factory__WEBPACK_IMPORTED_MODULE_2__["default"].getLanguageAttrs(language))

    /*
     This is a sort order index for a grammatical feature values. It is determined by the order of values in
     a 'values' array.
     */
    this._orderIndex = []
    this._orderLookup = {}

    for (const [index, value] of values.entries()) {
      this._orderIndex.push(value)
      if (Array.isArray(value)) {
        for (let element of value) {
          this[element] = new _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.type, element, this.languageID)
          this._orderLookup[element] = index
        }
      } else {
        this[value] = new _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.type, value, this.languageID)
        this._orderLookup[value] = index
      }
    }
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
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
      return new _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.type, [[value, sortOrder]], this.languageID)
    } else {
      throw new Error('A non-empty value should be provided.')
    }
  }

  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @return {Feature}
   */
  getValues (data) {
    return new _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.type, data, this.languageID)
  }

  getFromImporter (importerName, value) {
    let mapped
    try {
      mapped = this.importer[importerName].get(value)
    } catch (e) {
      // quietly catch not found and replace with default
      mapped = this.get(value)
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
    this.importer = this.importer || {}
    this.importer[name] = this.importer[name] || new _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
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
    return this.orderedValues.map((value) => new _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.type, value, this.languageID))
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
      values = [values]
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

          if (!_language_model_factory__WEBPACK_IMPORTED_MODULE_2__["default"].compareLanguages(element.languageID, this.languageID)) {
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

        if (!_language_model_factory__WEBPACK_IMPORTED_MODULE_2__["default"].compareLanguages(value.languageID, this.languageID)) {
          throw new Error(`Trying to order an element with language "${value.languageID.toString()}" that is different from "${this.languageID.toString()}"`)
        }
      }
    }

    // Erase whatever sort order was set previously
    this._orderLookup = {}
    this._orderIndex = []

    // Define a new sort order
    for (const [index, element] of values.entries()) {
      if (Array.isArray(element)) {
        // If it is an array, all values should have the same order
        let elements = []
        for (const subElement of element) {
          this._orderLookup[subElement.value] = index
          elements.push(subElement.value)
        }
        this._orderIndex[index] = elements
      } else {
        // If is a single value
        this._orderLookup[element.value] = index
        this._orderIndex[index] = element.value
      }
    }
  }
}
FeatureType.UNRESTRICTED_VALUE = Symbol('unrestricted')
/* harmony default export */ __webpack_exports__["default"] = (FeatureType);


/***/ }),

/***/ "./greek_language_model.js":
/*!*********************************!*\
  !*** ./greek_language_model.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GreekLanguageModel; });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature.js */ "./feature.js");





let typeFeatures = new Map()
let typeFeaturesInitialized = false
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_GREEK"] }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["STR_LANG_CODE_GRC"] }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__["STR_LANG_CODE_GRC"]] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_DIR_LTR"] }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_UNIT_WORD"] }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"].featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmClass,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_DEMONSTRATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_GENERAL_RELATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_INDEFINITE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_INTENSIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_INTERROGATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_PERSONAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_POSSESSIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_RECIPROCAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_REFLEXIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_RELATIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.number,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["NUM_SINGULAR"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["NUM_PLURAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["NUM_DUAL"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmCase,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_NOMINATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_GENITIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_DATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_ACCUSATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_VOCATIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.declension,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_1ST"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_2ND"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_3RD"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.tense,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PRESENT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_IMPERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_FUTURE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PLUPERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_FUTURE_PERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_AORIST"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.voice,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_PASSIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_ACTIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_MEDIOPASSIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_MIDDLE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.mood,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_INDICATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_SUBJUNCTIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_OPTATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_IMPERATIVE"]
        ]
      ],
      [
        // TODO full list of greek dialects
        _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.dialect,
        [
          'attic',
          'epic',
          'doric'
        ]
      ]
    ])
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
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
    return [_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part, _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.voice]
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
    let normalized = GreekLanguageModel.normalizeWord(word).toLocaleLowerCase()
    let strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug, '\u{03B1}').replace(
      /[\u{1FB8}\u{1FB9}]/ug, '\u{0391}').replace(
      /[\u{1FD0}\u{1FD1}]/ug, '\u{03B9}').replace(
      /[\u{1FD8}\u{1FD9}]/ug, '\u{0399}').replace(
      /[\u{1FE0}\u{1FE1}]/ug, '\u{03C5}').replace(
      /[\u{1FE8}\u{1FE9}]/ug, '\u{03A5}').replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug, '')
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
      /[\u{00A8}\u{0308}]/ug, '')
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
    }
    if (inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part)) {
      if (inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part].value === _constants_js__WEBPACK_IMPORTED_MODULE_2__["POFS_PRONOUN"]) {
        constraints.fullFormBased = true
      } else {
        constraints.suffixBased = true
      }
    } else {
      console.warn(`Unable to set grammar: part of speech data is missing or is incorrect`, inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part])
    }

    constraints.pronounClassRequired =
      _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].compareLanguages(GreekLanguageModel.languageID, inflection.languageID) &&
      inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part) &&
      inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.part].value === _constants_js__WEBPACK_IMPORTED_MODULE_2__["POFS_PRONOUN"]

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
   * @return {Feature} Matching classes found within a Feature objects. If no matching classes found,
   * returns undefined.
   */
  static getPronounClasses (forms, word, normalize = true) {
    let matchingValues = new Set() // Will eliminate duplicated values
    let matchingForms = forms.filter(
      form => {
        let match = false
        if (form.value) {
          match = normalize
            ? GreekLanguageModel.normalizeWord(form.value) === GreekLanguageModel.normalizeWord(word)
            : form.value === word
        }
        return match
      }
    )
    for (const matchingForm of matchingForms) {
      if (matchingForm.features.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmClass)) {
        for (const value of matchingForm.features[_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmClass].values) {
          matchingValues.add(value)
        }
      }
    }
    if (matchingValues.size > 0) {
      return new _feature_js__WEBPACK_IMPORTED_MODULE_3__["default"](_feature_js__WEBPACK_IMPORTED_MODULE_3__["default"].types.grmClass, Array.from(matchingValues), GreekLanguageModel.languageID)
    }
  }
}


/***/ }),

/***/ "./grm-feature.js":
/*!************************!*\
  !*** ./grm-feature.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _i18n_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n.js */ "./i18n.js");




/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
class GrmFeature {
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
    if (!GrmFeature.types.isAllowed(type)) {
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
    this.value = value
    this.type = type
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].getLanguageAttrs(language))
    this.sortOrder = sortOrder
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
    return this.languageCode
  }

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      // `feature` is a single object with multiple `value` properties. This feature will be sunset
      // as it does not allow to use sort order on Feature objects.
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(this.languageID, feature.languageID)
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      })
      return equal
    } else {
      return _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(this.languageID, feature.languageID) && this.type === feature.type && this.value === feature.value
    }
  }

  isSubsetof (features) {
    if (!Array.isArray(features)) {
      features = [features] // If `features` is a single value, convert it to an array (a more general case)
    }
    // `feature` is an array of feature objects with (possibly) each having a single feature value.
    let languageID = features[0].languageID // Assume all Feature objects have the same language ID
    let type = features[0].type // Assume all Feature objects have the same type
    let values = features.map(f => f.value)
    if (_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(this.languageID, languageID) && this.type === type && values.includes(this.value)) {
      return true
    }
    return false
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
      return _i18n_js__WEBPACK_IMPORTED_MODULE_2__["i18n"][lang][this.value].abbr
    }
  }

  static toFeature (sourceFeature) {
    if (Array.isArray(sourceFeature)) {
      if (!(sourceFeature[0] instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        const type = sourceFeature[0].type
        const languageID = sourceFeature[0].languageID
        const values = sourceFeature.map(v => v.value)
        return new _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"](type, values, languageID)
      }
    } else {
      if (!(sourceFeature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        return new _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"](sourceFeature.type, sourceFeature.value, sourceFeature.languageID)
      }
    }
    return sourceFeature
  }
}
// Should have no spaces in values in order to be used in HTML templates
GrmFeature.types = {
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
    let v = `${value}`
    return Object.values(this).includes(v)
  }
}
/* harmony default export */ __webpack_exports__["default"] = (GrmFeature);


/***/ }),

/***/ "./homonym.js":
/*!********************!*\
  !*** ./homonym.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language_model_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory */ "./language_model_factory.js");
/* harmony import */ var _lexeme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lexeme.js */ "./lexeme.js");



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
      if (!(lexeme instanceof _lexeme_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        throw new Error('All lexeme data should be of Lexeme object type.')
      }
    }

    this.lexemes = lexemes
    this.targetWord = form
  }

  static readObject (jsonObject) {
    let lexemes = []
    if (jsonObject.lexemes) {
      for (let lexeme of jsonObject.lexemes) {
        lexemes.push(_lexeme_js__WEBPACK_IMPORTED_MODULE_1__["default"].readObject(lexeme))
      }
    }
    let homonym = new Homonym(lexemes)
    if (jsonObject.targetWord) {
      homonym.targetWord = jsonObject.targetWord
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
    console.warn(`Please use languageID instead`)
    return _language_model_factory__WEBPACK_IMPORTED_MODULE_0__["default"].getLanguageCodeFromId(this.languageID)
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
    let inflections = []
    for (const lexeme of this.lexemes) {
      inflections = inflections.concat(lexeme.inflections)
    }
    return inflections
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Homonym);


/***/ }),

/***/ "./i18n.js":
/*!*****************!*\
  !*** ./i18n.js ***!
  \*****************/
/*! exports provided: i18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
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
}


/***/ }),

/***/ "./inflection.js":
/*!***********************!*\
  !*** ./inflection.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");


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
  constructor (stem = null, language, suffix = null, prefix = null, example = null) {
    if (!stem && !suffix) {
      throw new Error('At least stem or suffix must be defined')
    }
    if (!language) {
      throw new Error('Language should not be empty.')
    }

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem
    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLanguageAttrs(language))
    this.model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLanguageModel(this.languageID)

    // A grammar constraints object
    this.constraints = {
      fullFormBased: false, // True this inflection stores and requires to use a full form of a word
      suffixBased: false, // True if only suffix is enough to identify this inflection
      obligatoryMatches: [], // Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [] // Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
    }

    // Suffix may not be present in every word. If missing, it will be set to null.
    this.suffix = suffix

    // Prefix may not be present in every word. If missing, it will be set to null.
    this.prefix = prefix

    // Example may not be provided
    this.example = example
  }

  get form () {
    let form = this.prefix ? this.prefix : ''
    form = this.stem ? form + this.stem : form
    form = this.suffix ? form + this.suffix : form
    return form
  }

  /**
   * This is a compatibility function for legacy code.
   * @return {String} A language code.
   */
  get language () {
    console.warn(`Please use a "languageID" instead of a "language"`)
    return this.languageCode
  }

  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints () {
    if (this.model.hasOwnProperty('getInflectionConstraints')) {
      let constraintData = this.model.getInflectionConstraints(this)
      this.constraints = Object.assign(this.constraints, constraintData)
    }
  }

  compareWithWord (word, normalize = true) {
    const model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLanguageModel(this.languageID)
    const value = this.constraints.suffixBased ? this.suffix : this.form
    return normalize
      ? model.normalizeWord(value) === model.normalizeWord(word)
      : value === word
  }

  static readObject (jsonObject) {
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example)
    inflection.languageID = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getLanguageIdFromCode(inflection.languageCode)
    return inflection
  }

  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    console.warn(`Please use "addFeature" instead.`)
    if (!data) {
      throw new Error('Inflection feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    let type = data[0].type
    this[type] = []
    for (let element of data) {
      if (!(element instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
        throw new Error('Inflection feature data must be a Feature object.')
      }

      if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].compareLanguages(element.languageID, this.languageID)) {
        throw new Error(`Language "${element.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`)
      }

      this[type].push(element)
    }
  }

  /**
   * Sets a grammatical feature of an inflection. Feature is stored in a `feature.type` property.
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature (feature) {
    if (!feature) {
      throw new Error('feature data cannot be empty.')
    }

    if (!(feature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error('feature data must be a Feature object.')
    }

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
    }

    this[feature.type] = feature
  }

  /**
   * Sets multiple grammatical features of an inflection.
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error(`Features must be in an array`)
    }

    for (let feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @return {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName)) {
      return this[featureName].values.includes(featureValue)
    }
    return false
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Inflection);


/***/ }),

/***/ "./inflection_group.js":
/*!*****************************!*\
  !*** ./inflection_group.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class InflectionGroup {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   */
  constructor (groupingKey, inflections = [], sortKey = null) {
    this.groupingKey = groupingKey
    this.inflections = inflections
  }

  /**
   * Add an Inflection or InflectionGroup to the group
   * @param {Inflection|InflectionGroup} inflection
   */
  append (inflection) {
    this.inflections.push(inflection)
  }
}
/* harmony default export */ __webpack_exports__["default"] = (InflectionGroup);


/***/ }),

/***/ "./inflection_grouping_key.js":
/*!************************************!*\
  !*** ./inflection_grouping_key.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");


class InflectionGroupingKey {
  /**
   * @constructor
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {Object} extras extra property name and value pairs used in the key
   */
  constructor (infl, features, extras = {}) {
    for (let feature of features) {
      this[feature] = infl[feature]
    }
    Object.assign(this, extras)
  }

  /**
   * checks if a feature with a specific value
   * is included in the grouping key
   * @returns {boolean} true if found, false if not
   */
  hasFeatureValue (feature, value) {
    if (this.hasOwnProperty(feature)) {
      return this[feature].values.includes(value)
    }
    return false
  }

  /**
   * Return this key as a string
   * @returns {string} string representation of the key
   */
  toString () {
    let values = []
    for (let prop of Object.getOwnPropertyNames(this).sort()) {
      // A prop can be either a Feature object, or a one of the extras of a string type
      let value = (this[prop] instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__["default"]) ? this[prop].values.sort().join(',') : this[prop]
      values.push(value)
    }
    return values.join(' ')
  }
}

/* harmony default export */ __webpack_exports__["default"] = (InflectionGroupingKey);


/***/ }),

/***/ "./language_model.js":
/*!***************************!*\
  !*** ./language_model.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _feature_type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature_type.js */ "./feature_type.js");
/* harmony import */ var _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inflection_grouping_key.js */ "./inflection_grouping_key.js");
/* harmony import */ var _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inflection_group.js */ "./inflection_group.js");







/**
 * @class  LanguageModel is the base class for language-specific behavior
 */
class LanguageModel {
  constructor () {
    // This is just to avoid JavaScript Standard error on `context_backward` getter name. Don't need a constructor otherwise
    // TODO: `contextBackward` shall be used instead of `context_backward` wherever it is used
    this.context_backward = LanguageModel.contextBackward
  }

  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_0__["LANG_DIR_LTR"] }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_0__["LANG_UNIT_WORD"] }

  /**
   * @deprecated
   */
  get contextForward () {
    console.warn(`Please use static "contextForward" instead`)
    return this.constructor.contextForward
  }

  /**
   * @deprecated
   */
  get contextBackward () {
    console.warn(`Please use static "contextBackward" instead`)
    return this.constructor.contextBackward
  }

  /**
   * @deprecated
   */
  get direction () {
    console.warn(`Please use static "direction" instead`)
    return this.constructor.direction
  }

  /**
   * @deprecated
   */
  get baseUnit () {
    console.warn(`Please use static "baseUnit" instead`)
    return this.constructor.baseUnit
  }

  /**
   * @deprecated
   */
  get features () {
    console.warn(`Please use individual "getFeatureType" or static "features" instead`)
    return this.constructor.features
  }

  /**
   * Returns a list of names of feature types that are defined in a language model.
   * @return {string[]} Names of features that are defined in a model.
   */
  static get featureNames () {
    return this.featureValues.keys()
  }

  /**
   * Returns a feature a `featureType` name that is defined for a language. It does not create a new Feature
   * object instance. It returns the one defined in a language model. To get a new instance of a Feature
   * object, use `getFeature` instead.
   * If no feature of `featureType` is defined in a language model, throws an error.
   * @param {string} featureType - A feature type name.
   * @return {Feature} A feature object of requested type.
   */
  static typeFeature (featureType) {
    if (this.typeFeatures.has(featureType)) {
      return this.typeFeatures.get(featureType)
    } else {
      throw new Error(`Type feature "${featureType}" is not defined within "${this}"`)
    }
  }

  /**
   * Returns a map with Feature objects of all features defined in a language. Use this method to get all
   * Feature objects defined in a language model.
   * @return {Map} Feature objects for all features defined within a language in a Map object. The key is
   * a feature type (a string), and the value is a Feature object.
   */
  static get typeFeatures () {
    console.warn(`This getter must be defined in a descendant class`)
  }

  static get features () {
    let features = {}
    for (const featureName of this.featureNames) {
      features[featureName] = this.getFeature(featureName)
    }
    return features
  }

  static get languageID () {
    return _constants_js__WEBPACK_IMPORTED_MODULE_0__["LANG_UNDEFINED"]
  }

  static get languageCode () {
    return _constants_js__WEBPACK_IMPORTED_MODULE_0__["STR_LANG_CODE_UNDEFINED"]
  }

  /**
   * Returns an array of language codes that represents the language.
   * @return {String[]} An array of language codes that matches the language.
   */
  static get languageCodes () {
    return []
  }

  static get codes () {
    console.warn(`Use static "languageCodes" instead`)
    return this.languageCodes
  }

  /**
   * @deprecated
   * @return {String[]}
   */
  get codes () {
    console.warn(`Please use a static version of "codes" instead`)
    return this.constructor.languageCodes
  }

  /**
   * @deprecated
   * @return {string}
   */
  toCode () {
    console.warn(`Please use a static "languageCode" instead`)
    return this.constructor.languageCode
  }

  /**
   * @deprecated
   * @return {string}
   */
  static toCode () {
    console.warn(`Please use a static "languageCode" instead`)
    return this.languageCode
  }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_ADVERB"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_ADVERBIAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_ADJECTIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_ARTICLE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_CONJUNCTION"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_EXCLAMATION"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_INTERJECTION"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_NOUN"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_NUMERAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_PARTICLE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_PREFIX"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_PREPOSITION"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_PRONOUN"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_SUFFIX"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_SUPINE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_VERB"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_VERB_PARTICIPLE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.gender,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["GEND_MASCULINE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["GEND_FEMININE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["GEND_NEUTER"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.type,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["TYPE_REGULAR"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["TYPE_IRREGULAR"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.person,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["ORD_1ST"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["ORD_2ND"],
          _constants_js__WEBPACK_IMPORTED_MODULE_0__["ORD_3RD"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.age,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.area,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.source,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.frequency,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.geo,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.pronunciation,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.kind,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.comparison,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.morph,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.stemtype,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.derivtype,
        []
      ]
    ])
  }

  /**
   * @deprecated
   * @return {symbol} Returns a language ID
   */
  static get sourceLanguage () {
    console.warn(`Please use languageID directly`)
    return this.languageID
  }

  /**
   * @deprecated
   * @return {symbol} Returns a language ID
   */
  get sourceLanguage () {
    console.warn(`Please use languageID directly`)
    return this.constructor.languageID
  }

  /**
   * @deprecated
   * @param name
   * @return {FeatureType}
   */
  static getFeatureType (name) {
    console.warn('Please use getFeature instead')
    let featureValues = this.featureValues
    if (featureValues.has(name)) {
      return new _feature_type_js__WEBPACK_IMPORTED_MODULE_3__["default"](name, featureValues.get(name), this.languageID)
    } else {
      throw new Error(`Feature "${name}" is not defined`)
    }
  }

  /**
   * Returns a new instance of a feature with `featureType`. It uses a feature defined in a language model
   * as a master.
   * @param {string} featureType - A name of a feature type.
   * @return {Feature} - A newly created Feature object.
   */
  static getFeature (featureType) {
    let featureValues = this.featureValues // To cache the values
    if (featureValues.has(featureType)) {
      let allowedValues = featureValues.get(featureType)
      return new _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"](featureType, allowedValues, this.languageID, 1, allowedValues)
    } else {
      throw new Error(`Feature "${featureType}" is not defined`)
    }
  }

  _initializeFeatures () {
    let features = {}
    for (const featureName of this.constructor.featureValues.keys()) {
      features[featureName] = this.constructor.getFeature(featureName)
    }
    return features
  }

  /**
   * @deprecated
   */
  grammarFeatures () {
    console.warn(`Please use a static version of "grammarFeatures" instead`)
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
    console.warn(`Please use static "alternateWordEncodings" instead`)
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
    console.warn(`Please use a static version of "getPunctuation"`)
    return this.constructor.getPunctuation()
  }

  toString () {
    return String(this.constructor.languageCode)
  }

  isEqual (model) {
    return _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__["default"].compareLanguages(this.languageID, model.languageID)
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
    console.warn(`Please use a static version of "canInflect" instead`)
    return this.constructor.canInflect(node)
  }

  /**
   * Groups a set of inflections according to a language-specific display paradigm
   * The default groups according to the following logic:
   *   1. groups of groups with unique stem, prefix, suffix, part of speech, declension, dialect and comparison
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
    let grouped = new Map()
    let aggregated = this.aggregateInflectionsForDisplay(inflections)

    // group inflections by part of speech
    for (let infl of aggregated) {
      let groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__["default"](infl,
        [_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.dialect, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      )
      let groupingKeyStr = groupingKey.toString()
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl)
      } else {
        grouped.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__["default"](groupingKey, [infl]))
      }
    }

    // iterate through each group key to group the inflections in that group
    for (let kv of grouped) {
      let inflgrp = new Map()
      for (let infl of kv[1].inflections) {
        let keyprop
        let isCaseInflectionSet = false
        if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.grmCase]) {
          // grouping on number if case is defined
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.number
          isCaseInflectionSet = true
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.tense]) {
          // grouping on tense if tense is defined but not case
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.tense
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_VERB"]) {
          // grouping on no case or tense but a verb
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_0__["POFS_ADVERB"]) {
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.part
          // grouping on adverbs without case or tense
        } else {
          keyprop = 'misc'
          // grouping on adverbs without case or tense
          // everything else
        }
        let groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__["default"](infl, [keyprop], {isCaseInflectionSet: isCaseInflectionSet})
        let groupingKeyStr = groupingKey.toString()
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl)
        } else {
          inflgrp.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__["default"](groupingKey, [infl]))
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
        let nextGroup = new Map()
        let sortOrder = new Map()
        for (let infl of kv[1].inflections) {
          let sortkey = infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.grmCase] ? Math.max(infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.grmCase].items.map(f => f.sortOrder)) : 1
          let groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__["default"](infl, [_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.voice])
          let groupingKeyStr = groupingKey.toString()
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl)
          } else {
            nextGroup.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__["default"](groupingKey, [infl], sortkey))
            sortOrder.set(groupingKeyStr, sortkey)
          }
        }
        kv[1].inflections = []
        let sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            let orderA = sortOrder.get(a)
            let orderB = sortOrder.get(b)
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        )
        for (let groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey))
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (let kv of inflgrp) {
        let groups = kv[1]
        for (let group of groups.inflections) {
          let nextGroup = new Map()
          for (let infl of group.inflections) {
            // set key is case comp gend pers mood sort
            let groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__["default"](infl,
              [_feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.comparison, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.gender, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.number, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.person,
                _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_2__["default"].types.voice])
            let groupingKeyStr = groupingKey.toString()
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl)
            } else {
              nextGroup.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__["default"](groupingKey, [infl]))
            }
          }
          group.inflections = Array.from(nextGroup.values()) // now a group of inflection groups
        }
      }
      kv[1].inflections = Array.from(inflgrp.values())
    }
    return Array.from(grouped.values())
  }

  /**
   * Aggregate inflections for display according to language model characteristics
   * @param {Inflection[]} inflections an array of inflections
   * @return Inflection[] the aggregated inflections
   */
  static aggregateInflectionsForDisplay (inflections) {
    // default is just to do nothing
    return inflections
  }

  /**
   * @deprecated
   * @param inflections
   * @return {*}
   */
  groupInflectionsForDisplay (inflections) {
    console.warn(`Please use a static version of "groupInflectionsForDisplay" instead`)
    return this.constructor.groupInflectionsForDisplay(inflections)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (LanguageModel);


/***/ }),

/***/ "./language_model_factory.js":
/*!***********************************!*\
  !*** ./language_model_factory.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./latin_language_model.js */ "./latin_language_model.js");
/* harmony import */ var _greek_language_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./greek_language_model.js */ "./greek_language_model.js");
/* harmony import */ var _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arabic_language_model.js */ "./arabic_language_model.js");
/* harmony import */ var _persian_language_model_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./persian_language_model.js */ "./persian_language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.js */ "./constants.js");







const MODELS = new Map([
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_LA"], _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__["default"] ],
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_LAT"], _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__["default"] ],
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_GRC"], _greek_language_model_js__WEBPACK_IMPORTED_MODULE_2__["default"] ],
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_ARA"], _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__["default"] ],
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_AR"], _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__["default"] ],
  [ _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_PER"], _persian_language_model_js__WEBPACK_IMPORTED_MODULE_4__["default"] ]
])

class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @return {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    language = (typeof language === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(language) : language
    return MODELS.has(language)
  }

  /**
   * Returns a constructor of language model for a specific language ID.
   * @param {symbol} languageID - A language ID of a desired language model.
   * @return {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel (languageID) {
    let languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID)
    if (MODELS.has(languageCode)) {
      return MODELS.get(languageCode)
    } else {
      // A default value
      return _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]
    }
  }

  static getLanguageForCode (code = null) {
    let Model = MODELS.get(code)
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
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
    return _constants_js__WEBPACK_IMPORTED_MODULE_5__["LANG_UNDEFINED"]
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
    return _constants_js__WEBPACK_IMPORTED_MODULE_5__["STR_LANG_CODE_UNDEFINED"]
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
    languageA = (typeof languageA === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA
    languageB = (typeof languageB === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB
    return languageA === languageB
  }
}
/* harmony default export */ __webpack_exports__["default"] = (LanguageModelFactory);


/***/ }),

/***/ "./latin_language_model.js":
/*!*********************************!*\
  !*** ./latin_language_model.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LatinLanguageModel; });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");




let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_LATIN"] }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["STR_LANG_CODE_LAT"] }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__["STR_LANG_CODE_LA"], _constants_js__WEBPACK_IMPORTED_MODULE_2__["STR_LANG_CODE_LAT"]] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_DIR_LTR"] }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__["LANG_UNIT_WORD"] }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"].featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.grmClass,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_PERSONAL"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_REFLEXIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_POSSESSIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_DEMONSTRATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_RELATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CLASS_INTERROGATIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.number,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["NUM_SINGULAR"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["NUM_PLURAL"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.grmCase,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_NOMINATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_GENITIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_DATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_ACCUSATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_ABLATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_LOCATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["CASE_VOCATIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.declension,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_1ST"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_2ND"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_3RD"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_4TH"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_5TH"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.tense,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PRESENT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_IMPERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_FUTURE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_PLUPERFECT"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["TENSE_FUTURE_PERFECT"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.voice,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_ACTIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["VOICE_PASSIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.mood,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_INDICATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_SUBJUNCTIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_IMPERATIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_PARTICIPLE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_SUPINE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_GERUNDIVE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_PARTICIPLE"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["MOOD_INFINITIVE"]
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.conjugation,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_1ST"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_2ND"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_3RD"],
          _constants_js__WEBPACK_IMPORTED_MODULE_2__["ORD_4TH"]
        ]
      ]
    ])
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  /**
   * @override LanguageModel#grammarFeatures
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [_feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.part, _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.tense]
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
      word = word.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, 'A')
      word = word.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, 'E')
      word = word.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, 'I')
      word = word.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, 'O')
      word = word.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, 'U')
      word = word.replace(/[\u00c6\u01e2]/g, 'AE')
      word = word.replace(/[\u0152]/g, 'OE')
      word = word.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, 'a')
      word = word.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, 'e')
      word = word.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, 'i')
      word = word.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, 'o')
      word = word.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, 'u')
      word = word.replace(/[\u00e6\u01e3]/g, 'ae')
      word = word.replace(/[\u0153]/g, 'oe')
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
    }
    if (inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.part)) {
      if (inflection[_feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.part].value === _constants_js__WEBPACK_IMPORTED_MODULE_2__["POFS_PRONOUN"]) {
        grammar.fullFormBased = true
      } else {
        grammar.suffixBased = true
      }
    } else {
      console.warn(`Unable to set grammar: part of speech data is missing or is incorrect`, inflection[_feature_js__WEBPACK_IMPORTED_MODULE_1__["default"].types.part])
    }

    return grammar
  }
}


/***/ }),

/***/ "./lemma.js":
/*!******************!*\
  !*** ./lemma.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation.js */ "./translation.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid/v4 */ "../node_modules/uuid/v4.js");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_3__);





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

   * @param {Translation} transaltions - translations from python service
   */
  constructor (word, languageID, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!languageID) {
      throw new Error('Language should not be empty.')
    }

    this.languageID = undefined
    this.languageCode = undefined
    ;({languageID: this.languageID, languageCode: this.languageCode} = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].getLanguageAttrs(languageID))

    this.word = word
    this.principalParts = principalParts
    this.features = {}
    this.ID = uuid_v4__WEBPACK_IMPORTED_MODULE_3___default()()
  }

  get language () {
    console.warn(`Please use "languageID" instead of "language"`)
    return this.languageCode
  }

  static readObject (jsonObject) {
    return new Lemma(jsonObject.word, jsonObject.language, jsonObject.principalParts, jsonObject.pronunciation)
  }

  /**
   * @deprecated Please use `addFeature` instead.
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    console.warn(`Please use "addFeature" instead`)
    if (!data) {
      throw new Error('feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    let type = data[0].type
    this.features[type] = []
    for (let element of data) {
      if (!(element instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        throw new Error('feature data must be a Feature object.')
      }

      if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(element.languageID, this.languageID)) {
        throw new Error('Language "' + element.languageID.toString() + '" of a feature does not match a language "' +
                this.languageID.toString() + '" of a Lemma object.')
      }

      this.features[type].push(element)
    }
  }

  /**
   * Sets a grammatical feature of a lemma. Feature is stored in a `feature.type` property.
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature (feature) {
    if (!feature) {
      throw new Error('feature data cannot be empty.')
    }

    if (!(feature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
      throw new Error('feature data must be a Feature object.')
    }

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"].compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
    }

    this.features[feature.type] = feature
  }

  /**
   * Sets multiple grammatical features of a lemma.
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error(`Features must be in an array`)
    }

    for (let feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Sets a translation from python service.
   * @param {Translation} translation - A translation object
   */
  addTranslation (translation) {
    if (!translation) {
      throw new Error('translation data cannot be empty.')
    }

    if (!(translation instanceof _translation_js__WEBPACK_IMPORTED_MODULE_2__["default"])) {
      throw new Error('translation data must be a Translation object.')
    }

    this.translation = translation
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Lemma);


/***/ }),

/***/ "./lexeme.js":
/*!*******************!*\
  !*** ./lexeme.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lemma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lemma.js */ "./lemma.js");
/* harmony import */ var _inflection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inflection.js */ "./inflection.js");
/* harmony import */ var _definition_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definition-set */ "./definition-set.js");
/* harmony import */ var _language_model_factory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language_model_factory */ "./language_model_factory.js");





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

    if (!(lemma instanceof _lemma_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (let inflection of inflections) {
      if (!(inflection instanceof _inflection_js__WEBPACK_IMPORTED_MODULE_1__["default"])) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    this.lemma = lemma
    this.inflections = inflections
    this.meaning = meaning || new _definition_set__WEBPACK_IMPORTED_MODULE_2__["default"](this.lemma.word, this.lemma.languageID)
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
    let lm = _language_model_factory__WEBPACK_IMPORTED_MODULE_3__["default"].getLanguageModel(this.lemma.languageID)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    let lemma = _lemma_js__WEBPACK_IMPORTED_MODULE_0__["default"].readObject(jsonObject.lemma)
    let inflections = []
    for (let inflection of jsonObject.inflections) {
      inflections.push(_inflection_js__WEBPACK_IMPORTED_MODULE_1__["default"].readObject(inflection))
    }

    let lexeme = new Lexeme(lemma, inflections)
    lexeme.meaning = _definition_set__WEBPACK_IMPORTED_MODULE_2__["default"].readObject(jsonObject.meaning)
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
        let primarySort = a.lemma.features[primary].compareTo(b.lemma.features[primary])
        if (primarySort !== 0) {
          return primarySort
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return a.lemma.features[secondary].compareTo(b.lemma.features[secondary])
        } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
          return -1
        } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return 1
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
/* harmony default export */ __webpack_exports__["default"] = (Lexeme);


/***/ }),

/***/ "./persian_language_model.js":
/*!***********************************!*\
  !*** ./persian_language_model.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PersianLanguageModel; });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./constants.js");



let typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
class PersianLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_PERSIAN"] }

  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_PER"] }

  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_PER"], _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_FAS"], _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_FA"], _constants_js__WEBPACK_IMPORTED_MODULE_1__["STR_LANG_CODE_FA_IR"]] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_DIR_RTL"] }

  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__["LANG_UNIT_WORD"] }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) { this.initTypeFeatures() }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

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


/***/ }),

/***/ "./resource_provider.js":
/*!******************************!*\
  !*** ./resource_provider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    this.uri = uri
    this.rights = rightsTranslations
    if (!this.rights.has('default')) {
      this.rights.set('default', rights)
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

/* harmony default export */ __webpack_exports__["default"] = (ResourceProvider);


/***/ }),

/***/ "./translation.js":
/*!************************!*\
  !*** ./translation.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * stores a scope of lemma translations from python service
 * Contains a primary Lemma object
 */
class Translation {
  /**
   * Initializes a Translation object.
   * @param {Lemma} lemma - A lemma object.
   * @param [] meanings - A set of definitions.

   */
  constructor (lemma, languageCode, translations = []) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }
    this.lemmaWord = lemma.word
    this.languageCode = languageCode
    this.glosses = translations
  }

  static readTranslationFromJSONList (lemma, languageCode, translationsList) {
    if (!translationsList || !Array.isArray(translationsList)) {
      throw new Error('Recieved not proper translation list', translationsList)
    }
    let curTranslations = translationsList.find(function (element) { return element.in === lemma.word })
    return new Translation(lemma, languageCode, curTranslations.translations)
  }

  static loadTranslations (lemma, languageCode, translationsList) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, languageCode, translationsList))
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Translation);


/***/ })

/******/ });
});
//# sourceMappingURL=alpheios-data-models.js.map