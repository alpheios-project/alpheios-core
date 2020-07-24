(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/uuid/index.js":
/*!*******************************************!*\
  !*** ../../../node_modules/uuid/index.js ***!
  \*******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(/*! ./v1 */ "../../../node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "../../../node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "../../../node_modules/uuid/lib/bytesToUuid.js":
/*!*****************************************************!*\
  !*** ../../../node_modules/uuid/lib/bytesToUuid.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

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
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "../../../node_modules/uuid/lib/rng.js":
/*!*********************************************!*\
  !*** ../../../node_modules/uuid/lib/rng.js ***!
  \*********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__(/*! crypto */ "crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ "../../../node_modules/uuid/v1.js":
/*!****************************************!*\
  !*** ../../../node_modules/uuid/v1.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../../node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../../node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "../../../node_modules/uuid/v4.js":
/*!****************************************!*\
  !*** ../../../node_modules/uuid/v4.js ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "../../../node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "../../../node_modules/uuid/lib/bytesToUuid.js");

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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ArabicLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature.js */ "./feature.js");




const typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ArabicLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_ARABIC }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_ARA }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_ARA, _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_AR] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_DIR_RTL }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_UNIT_WORD }

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
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * @override
   */
  static alternateWordEncodings ({
    word = null, preceding = null, following = null, encoding = null,
    preserveCase = false, includeOriginal = false
  } = {}) {
    // tanwin (& tatweel) - drop FATHATAN, DAMMATAN, KASRATAN, TATWEEL
    const tanwin = word.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, '')
    // hamzas - replace ALEF WITH MADDA ABOVE, ALEF WITH HAMZA ABOVE/BELOW with ALEF
    const hamza = tanwin.replace(/[\u{0622}\u{0623}\u{0625}]/ug, '\u{0627}')
    // harakat - drop FATHA, DAMMA, KASRA, SUPERSCRIPT ALEF, ALEF WASLA
    const harakat = hamza.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, '')
    // shadda
    const shadda = harakat.replace(/\u{0651}/ug, '')
    // sukun
    const sukun = shadda.replace(/\u{0652}/ug, '')
    // alef
    const alef = sukun.replace(/\u{0627}/ug, '')
    const alternates = new Map([
      ['tanwin', tanwin],
      ['hamza', hamza],
      ['harakat', harakat],
      ['shadda', shadda],
      ['sukun', sukun],
      ['alef', alef]
    ])
    let fullList = [] // eslint-disable-line prefer-const
    if (encoding !== null && alternates.has(encoding)) {
      fullList = [alternates.get(encoding)]
    } else {
      fullList = Array.from(alternates.values())
    }
    if (!includeOriginal) {
      fullList = fullList.filter(w => w !== word)
    }
    return fullList
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }

  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param inflections
   */
  static aggregateInflectionsForDisplay (inflections) {
    // TODO at some point we might want to be able to check the provider in here
    // because this really only applies to the specifics of the Aramorph parser
    let aggregated = [] // eslint-disable-line prefer-const
    // eslint-disable-next-line prefer-const
    let aggregates = { [_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_NOUN]: [], [_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_ADJECTIVE]: [], [_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_NOUN_PROPER]: [] }
    for (const infl of inflections) {
      if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph].value.match(/ADJ[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_ADJECTIVE].push(infl)
      } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph].value.match(/NOUN[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_NOUN].push(infl)
      } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph] && infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph].value.match(/NOUN_PROP[uaiNK]/)) {
        aggregates[_constants_js__WEBPACK_IMPORTED_MODULE_1__.POFS_NOUN_PROPER].push(infl)
      } else {
        // we are also going to keep the examples out of the display for now
        infl.example = null
        aggregated.push(infl)
      }
    }
    for (const type of Object.keys(aggregates)) {
      const base = aggregated.filter((i) => i[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part].value === type)
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

/***/ "./chinese_language_model.js":
/*!***********************************!*\
  !*** ./chinese_language_model.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ChineseLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");





let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class ChineseLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_CHINESE }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_ZHO }
  static get languageCodes () {
    return [
      _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_ZH,
      _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_ZHO,
      _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_ZH_HANT,
      _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_ZH_HANS
    ]
  }

  static get contextForward () { return 5 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_LTR }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_UNIT_CHAR }

  static get featureValues () {
    return new Map([
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.fullForm,
        []
      ],

      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.frequency,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.pronunciation,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.radical,
        []
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

  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>\\\n\r\uFF0C\u3001\u3002\u300C\u300D\u300A\u300B\u200C\u200D"
  }

  static _isVowel (aLetter) {
    return ['a', 'e', 'i', 'o', 'u'].includes(aLetter)
  }

  static formatPinyin (aPinyin) {
    const _a = ['\u0101', '\u00E1', '\u01CE', '\u00E0', 'a']
    const _e = ['\u0113', '\u00E9', '\u011B', '\u00E8', 'e']
    const _i = ['\u012B', '\u00ED', '\u01D0', '\u00EC', 'i']
    const _o = ['\u014D', '\u00F3', '\u01D2', '\u00F2', 'o']
    const _u = ['\u016B', '\u00FA', '\u01D4', '\u00F9', 'u']
    const _v = ['\u01D6', '\u01D8', '\u01DA', '\u01DC', '\u00FC']

    // Remove spaces before and after split parts; eliminate empty split parts
    aPinyin = aPinyin.split(/(\d)/).map(el => el.trim()).filter(el => Boolean(el))

    let formatedPinyin = [] // eslint-disable-line prefer-const
    const toneFormat = {
      1: 0, 2: 1, 3: 2, 4: 3
    }

    for (let j = 0; j < aPinyin.length; j++) {
      if (j % 2 === 0) {
        let pin = aPinyin[j]
        const tone = toneFormat[aPinyin[j + 1]] !== undefined ? toneFormat[aPinyin[j + 1]] : 4

        if (pin.indexOf('a') !== -1) {
          pin = pin.replace('a', _a[tone])
        } else if (pin.indexOf('e') !== -1) {
          pin = pin.replace('e', _e[tone])
        } else if (pin.indexOf('ou') !== -1) {
          pin = pin.replace('o', _o[tone])
        } else {
          for (let k = pin.length - 1; k >= 0; k--) {
            if (this._isVowel(pin[k])) {
              switch (pin[k]) {
                case 'i':
                  pin = pin.replace('i', _i[tone])
                  break
                case 'o':
                  pin = pin.replace('o', _o[tone])
                  break
                case 'u':
                  if (k + 1 < pin.length - 1 && pin[k + 1] === ':') { pin = pin.replace('u:', _v[tone]) } else { pin = pin.replace('u', _u[tone]) }
                  break
                default:
                  _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('some kind of weird vowel', pin[k])
              }
              break
            }
          }
        }
        formatedPinyin.push(pin)
      }
    }
    return formatedPinyin.join(' ').trim()
  }
}


/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! namespace exports */
/*! export CASE_ABESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ABLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ABSOLUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ACCUSATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ADDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ADELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ADESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ADVERBIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ALLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ANTESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_APUDESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_AVERSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_BENEFACTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_CARITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_CAUSAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_CAUSAL_FINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_COMITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_DATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_DELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_DIRECT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_DISTRIBUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_DISTRIBUTIVE_TEMPORAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_EQUATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ERGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ESSIVE_FORMAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ESSIVE_MODAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_EVITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_EXESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_FINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_FORMAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_GENITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_ILLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INSTRUCTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INSTRUMENTAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INSTRUMENTAL_COMITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_INTRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_LATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_LOCATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_MODAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_MULTIPLICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_NOMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PARTITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PEGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_POSSESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_POSTDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_POSTELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_POSTESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_POSTPOSITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PREPOSITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PRIVATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PROLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PROSECUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_PROXIMATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SEPARATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SOCIATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUBDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUBELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUBESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUBLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUPERDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUPERESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUPERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_SUPPRESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_TEMPORAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_TERMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_TRANSLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_VIALIS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CASE_VOCATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_DEMONSTRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_GENERAL_RELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_INDEFINITE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_INTENSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_INTERROGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_PERSONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_POSSESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_RECIPROCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_REFLEXIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CLASS_RELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export COMP_COMPARITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export COMP_POSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export COMP_SUPERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_ANIMATE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_ANIMATE_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_COMMON [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_FEMININE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_INANIMATE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_INANIMATE_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_NEUTER [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GEND_PERSONAL_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_ARABIC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_CHINESE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_DIR_LTR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_DIR_RTL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_GEEZ [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_GREEK [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_LATIN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_PERSIAN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_SYRIAC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_UNDEFINED [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_UNIT_CHAR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LANG_UNIT_WORD [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_ADMIRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_COHORTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_CONDITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_DECLARATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_DUBITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_ENERGETIC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_EVENTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_GENERIC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_GERUNDIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_HYPOTHETICAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_IMPERATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_INDICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_INFERENTIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_INFINITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_INTERROGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_JUSSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_NEGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_OPTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_PARTICIPLE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_PRESUMPTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_RENARRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_SUBJUNCTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOOD_SUPINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NRL_CARDINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NRL_DISTRIBUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NRL_ORDINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_COLLECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_DISTRIBUTIVE_PLURAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_DUAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_PAUCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_PLURAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_SINGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_SINGULATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NUM_TRIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NURL_NUMERAL_ADVERB [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_1ST [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_2ND [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_3RD [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_4TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_5TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_6TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_7TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_8TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ORD_9TH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PARADIGM_CAT_KAYLO [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PARADIGM_CAT_STATE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_ADJECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_ADVERB [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_ADVERBIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_ARTICLE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_CONJUNCTION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_DENOMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_EXCLAMATION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_GERUNDIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_INTERJECTION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_NOUN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_NOUN_PROPER [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_NUMERAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_PARTICLE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_PREFIX [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_PREPOSITION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_PRONOUN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_SUFFIX [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_SUPINE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_VERB [provided] [no usage info] [missing usage info prevents renaming] */
/*! export POFS_VERB_PARTICIPLE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_AR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ARA [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ENG [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_FA [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_FAS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_FA_IR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_GEZ [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_GRC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_LA [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_LAT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_PER [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_SYC [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_SYR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_SYR_SYRJ [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_UNDEFINED [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ZH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ZHO [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ZH_HANS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STR_LANG_CODE_ZH_HANT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_AORIST [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_FUTURE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_FUTURE_PERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_IMPERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_PAST_ABSOLUTE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_PERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_PLUPERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TENSE_PRESENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TYPE_IRREGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TYPE_REGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_COMPOUNDS_OF_TO_BE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_DEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_IMPERSONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_INTRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_PERFECT_DEFINITE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_SEMIDEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_TAKING_ABLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_TAKING_DATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_TAKING_GENITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_TO_BE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VKIND_TRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_ACTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_ADJUTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_ANTIPASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_APPLICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_CAUSATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_CIRCUMSTANTIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_DEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_IMPERSONAL_PASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_MEDIOPASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_MIDDLE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_PASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_RECIPROCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VOICE_REFLEXIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LANG_UNIT_WORD": () => /* binding */ LANG_UNIT_WORD,
/* harmony export */   "LANG_UNIT_CHAR": () => /* binding */ LANG_UNIT_CHAR,
/* harmony export */   "LANG_DIR_LTR": () => /* binding */ LANG_DIR_LTR,
/* harmony export */   "LANG_DIR_RTL": () => /* binding */ LANG_DIR_RTL,
/* harmony export */   "LANG_UNDEFINED": () => /* binding */ LANG_UNDEFINED,
/* harmony export */   "LANG_LATIN": () => /* binding */ LANG_LATIN,
/* harmony export */   "LANG_GREEK": () => /* binding */ LANG_GREEK,
/* harmony export */   "LANG_ARABIC": () => /* binding */ LANG_ARABIC,
/* harmony export */   "LANG_PERSIAN": () => /* binding */ LANG_PERSIAN,
/* harmony export */   "LANG_GEEZ": () => /* binding */ LANG_GEEZ,
/* harmony export */   "LANG_CHINESE": () => /* binding */ LANG_CHINESE,
/* harmony export */   "LANG_SYRIAC": () => /* binding */ LANG_SYRIAC,
/* harmony export */   "STR_LANG_CODE_UNDEFINED": () => /* binding */ STR_LANG_CODE_UNDEFINED,
/* harmony export */   "STR_LANG_CODE_LAT": () => /* binding */ STR_LANG_CODE_LAT,
/* harmony export */   "STR_LANG_CODE_LA": () => /* binding */ STR_LANG_CODE_LA,
/* harmony export */   "STR_LANG_CODE_GRC": () => /* binding */ STR_LANG_CODE_GRC,
/* harmony export */   "STR_LANG_CODE_ARA": () => /* binding */ STR_LANG_CODE_ARA,
/* harmony export */   "STR_LANG_CODE_AR": () => /* binding */ STR_LANG_CODE_AR,
/* harmony export */   "STR_LANG_CODE_FAS": () => /* binding */ STR_LANG_CODE_FAS,
/* harmony export */   "STR_LANG_CODE_PER": () => /* binding */ STR_LANG_CODE_PER,
/* harmony export */   "STR_LANG_CODE_FA_IR": () => /* binding */ STR_LANG_CODE_FA_IR,
/* harmony export */   "STR_LANG_CODE_FA": () => /* binding */ STR_LANG_CODE_FA,
/* harmony export */   "STR_LANG_CODE_GEZ": () => /* binding */ STR_LANG_CODE_GEZ,
/* harmony export */   "STR_LANG_CODE_ZHO": () => /* binding */ STR_LANG_CODE_ZHO,
/* harmony export */   "STR_LANG_CODE_ZH": () => /* binding */ STR_LANG_CODE_ZH,
/* harmony export */   "STR_LANG_CODE_ZH_HANT": () => /* binding */ STR_LANG_CODE_ZH_HANT,
/* harmony export */   "STR_LANG_CODE_ZH_HANS": () => /* binding */ STR_LANG_CODE_ZH_HANS,
/* harmony export */   "STR_LANG_CODE_SYC": () => /* binding */ STR_LANG_CODE_SYC,
/* harmony export */   "STR_LANG_CODE_SYR": () => /* binding */ STR_LANG_CODE_SYR,
/* harmony export */   "STR_LANG_CODE_SYR_SYRJ": () => /* binding */ STR_LANG_CODE_SYR_SYRJ,
/* harmony export */   "STR_LANG_CODE_ENG": () => /* binding */ STR_LANG_CODE_ENG,
/* harmony export */   "POFS_ADJECTIVE": () => /* binding */ POFS_ADJECTIVE,
/* harmony export */   "POFS_ADVERB": () => /* binding */ POFS_ADVERB,
/* harmony export */   "POFS_ADVERBIAL": () => /* binding */ POFS_ADVERBIAL,
/* harmony export */   "POFS_ARTICLE": () => /* binding */ POFS_ARTICLE,
/* harmony export */   "POFS_CONJUNCTION": () => /* binding */ POFS_CONJUNCTION,
/* harmony export */   "POFS_EXCLAMATION": () => /* binding */ POFS_EXCLAMATION,
/* harmony export */   "POFS_INTERJECTION": () => /* binding */ POFS_INTERJECTION,
/* harmony export */   "POFS_NOUN": () => /* binding */ POFS_NOUN,
/* harmony export */   "POFS_NOUN_PROPER": () => /* binding */ POFS_NOUN_PROPER,
/* harmony export */   "POFS_NUMERAL": () => /* binding */ POFS_NUMERAL,
/* harmony export */   "POFS_PARTICLE": () => /* binding */ POFS_PARTICLE,
/* harmony export */   "POFS_PREFIX": () => /* binding */ POFS_PREFIX,
/* harmony export */   "POFS_PREPOSITION": () => /* binding */ POFS_PREPOSITION,
/* harmony export */   "POFS_PRONOUN": () => /* binding */ POFS_PRONOUN,
/* harmony export */   "POFS_SUFFIX": () => /* binding */ POFS_SUFFIX,
/* harmony export */   "POFS_GERUNDIVE": () => /* binding */ POFS_GERUNDIVE,
/* harmony export */   "POFS_SUPINE": () => /* binding */ POFS_SUPINE,
/* harmony export */   "POFS_VERB": () => /* binding */ POFS_VERB,
/* harmony export */   "POFS_VERB_PARTICIPLE": () => /* binding */ POFS_VERB_PARTICIPLE,
/* harmony export */   "POFS_DENOMINATIVE": () => /* binding */ POFS_DENOMINATIVE,
/* harmony export */   "GEND_MASCULINE": () => /* binding */ GEND_MASCULINE,
/* harmony export */   "GEND_FEMININE": () => /* binding */ GEND_FEMININE,
/* harmony export */   "GEND_NEUTER": () => /* binding */ GEND_NEUTER,
/* harmony export */   "GEND_COMMON": () => /* binding */ GEND_COMMON,
/* harmony export */   "GEND_ANIMATE": () => /* binding */ GEND_ANIMATE,
/* harmony export */   "GEND_INANIMATE": () => /* binding */ GEND_INANIMATE,
/* harmony export */   "GEND_PERSONAL_MASCULINE": () => /* binding */ GEND_PERSONAL_MASCULINE,
/* harmony export */   "GEND_ANIMATE_MASCULINE": () => /* binding */ GEND_ANIMATE_MASCULINE,
/* harmony export */   "GEND_INANIMATE_MASCULINE": () => /* binding */ GEND_INANIMATE_MASCULINE,
/* harmony export */   "COMP_POSITIVE": () => /* binding */ COMP_POSITIVE,
/* harmony export */   "COMP_COMPARITIVE": () => /* binding */ COMP_COMPARITIVE,
/* harmony export */   "COMP_SUPERLATIVE": () => /* binding */ COMP_SUPERLATIVE,
/* harmony export */   "CASE_ABESSIVE": () => /* binding */ CASE_ABESSIVE,
/* harmony export */   "CASE_ABLATIVE": () => /* binding */ CASE_ABLATIVE,
/* harmony export */   "CASE_ABSOLUTIVE": () => /* binding */ CASE_ABSOLUTIVE,
/* harmony export */   "CASE_ACCUSATIVE": () => /* binding */ CASE_ACCUSATIVE,
/* harmony export */   "CASE_ADDIRECTIVE": () => /* binding */ CASE_ADDIRECTIVE,
/* harmony export */   "CASE_ADELATIVE": () => /* binding */ CASE_ADELATIVE,
/* harmony export */   "CASE_ADESSIVE": () => /* binding */ CASE_ADESSIVE,
/* harmony export */   "CASE_ADVERBIAL": () => /* binding */ CASE_ADVERBIAL,
/* harmony export */   "CASE_ALLATIVE": () => /* binding */ CASE_ALLATIVE,
/* harmony export */   "CASE_ANTESSIVE": () => /* binding */ CASE_ANTESSIVE,
/* harmony export */   "CASE_APUDESSIVE": () => /* binding */ CASE_APUDESSIVE,
/* harmony export */   "CASE_AVERSIVE": () => /* binding */ CASE_AVERSIVE,
/* harmony export */   "CASE_BENEFACTIVE": () => /* binding */ CASE_BENEFACTIVE,
/* harmony export */   "CASE_CARITIVE": () => /* binding */ CASE_CARITIVE,
/* harmony export */   "CASE_CAUSAL": () => /* binding */ CASE_CAUSAL,
/* harmony export */   "CASE_CAUSAL_FINAL": () => /* binding */ CASE_CAUSAL_FINAL,
/* harmony export */   "CASE_COMITATIVE": () => /* binding */ CASE_COMITATIVE,
/* harmony export */   "CASE_DATIVE": () => /* binding */ CASE_DATIVE,
/* harmony export */   "CASE_DELATIVE": () => /* binding */ CASE_DELATIVE,
/* harmony export */   "CASE_DIRECT": () => /* binding */ CASE_DIRECT,
/* harmony export */   "CASE_DISTRIBUTIVE": () => /* binding */ CASE_DISTRIBUTIVE,
/* harmony export */   "CASE_DISTRIBUTIVE_TEMPORAL": () => /* binding */ CASE_DISTRIBUTIVE_TEMPORAL,
/* harmony export */   "CASE_ELATIVE": () => /* binding */ CASE_ELATIVE,
/* harmony export */   "CASE_ERGATIVE": () => /* binding */ CASE_ERGATIVE,
/* harmony export */   "CASE_ESSIVE": () => /* binding */ CASE_ESSIVE,
/* harmony export */   "CASE_ESSIVE_FORMAL": () => /* binding */ CASE_ESSIVE_FORMAL,
/* harmony export */   "CASE_ESSIVE_MODAL": () => /* binding */ CASE_ESSIVE_MODAL,
/* harmony export */   "CASE_EQUATIVE": () => /* binding */ CASE_EQUATIVE,
/* harmony export */   "CASE_EVITATIVE": () => /* binding */ CASE_EVITATIVE,
/* harmony export */   "CASE_EXESSIVE": () => /* binding */ CASE_EXESSIVE,
/* harmony export */   "CASE_FINAL": () => /* binding */ CASE_FINAL,
/* harmony export */   "CASE_FORMAL": () => /* binding */ CASE_FORMAL,
/* harmony export */   "CASE_GENITIVE": () => /* binding */ CASE_GENITIVE,
/* harmony export */   "CASE_ILLATIVE": () => /* binding */ CASE_ILLATIVE,
/* harmony export */   "CASE_INELATIVE": () => /* binding */ CASE_INELATIVE,
/* harmony export */   "CASE_INESSIVE": () => /* binding */ CASE_INESSIVE,
/* harmony export */   "CASE_INSTRUCTIVE": () => /* binding */ CASE_INSTRUCTIVE,
/* harmony export */   "CASE_INSTRUMENTAL": () => /* binding */ CASE_INSTRUMENTAL,
/* harmony export */   "CASE_INSTRUMENTAL_COMITATIVE": () => /* binding */ CASE_INSTRUMENTAL_COMITATIVE,
/* harmony export */   "CASE_INTRANSITIVE": () => /* binding */ CASE_INTRANSITIVE,
/* harmony export */   "CASE_LATIVE": () => /* binding */ CASE_LATIVE,
/* harmony export */   "CASE_LOCATIVE": () => /* binding */ CASE_LOCATIVE,
/* harmony export */   "CASE_MODAL": () => /* binding */ CASE_MODAL,
/* harmony export */   "CASE_MULTIPLICATIVE": () => /* binding */ CASE_MULTIPLICATIVE,
/* harmony export */   "CASE_NOMINATIVE": () => /* binding */ CASE_NOMINATIVE,
/* harmony export */   "CASE_PARTITIVE": () => /* binding */ CASE_PARTITIVE,
/* harmony export */   "CASE_PEGATIVE": () => /* binding */ CASE_PEGATIVE,
/* harmony export */   "CASE_PERLATIVE": () => /* binding */ CASE_PERLATIVE,
/* harmony export */   "CASE_POSSESSIVE": () => /* binding */ CASE_POSSESSIVE,
/* harmony export */   "CASE_POSTELATIVE": () => /* binding */ CASE_POSTELATIVE,
/* harmony export */   "CASE_POSTDIRECTIVE": () => /* binding */ CASE_POSTDIRECTIVE,
/* harmony export */   "CASE_POSTESSIVE": () => /* binding */ CASE_POSTESSIVE,
/* harmony export */   "CASE_POSTPOSITIONAL": () => /* binding */ CASE_POSTPOSITIONAL,
/* harmony export */   "CASE_PREPOSITIONAL": () => /* binding */ CASE_PREPOSITIONAL,
/* harmony export */   "CASE_PRIVATIVE": () => /* binding */ CASE_PRIVATIVE,
/* harmony export */   "CASE_PROLATIVE": () => /* binding */ CASE_PROLATIVE,
/* harmony export */   "CASE_PROSECUTIVE": () => /* binding */ CASE_PROSECUTIVE,
/* harmony export */   "CASE_PROXIMATIVE": () => /* binding */ CASE_PROXIMATIVE,
/* harmony export */   "CASE_SEPARATIVE": () => /* binding */ CASE_SEPARATIVE,
/* harmony export */   "CASE_SOCIATIVE": () => /* binding */ CASE_SOCIATIVE,
/* harmony export */   "CASE_SUBDIRECTIVE": () => /* binding */ CASE_SUBDIRECTIVE,
/* harmony export */   "CASE_SUBESSIVE": () => /* binding */ CASE_SUBESSIVE,
/* harmony export */   "CASE_SUBELATIVE": () => /* binding */ CASE_SUBELATIVE,
/* harmony export */   "CASE_SUBLATIVE": () => /* binding */ CASE_SUBLATIVE,
/* harmony export */   "CASE_SUPERDIRECTIVE": () => /* binding */ CASE_SUPERDIRECTIVE,
/* harmony export */   "CASE_SUPERESSIVE": () => /* binding */ CASE_SUPERESSIVE,
/* harmony export */   "CASE_SUPERLATIVE": () => /* binding */ CASE_SUPERLATIVE,
/* harmony export */   "CASE_SUPPRESSIVE": () => /* binding */ CASE_SUPPRESSIVE,
/* harmony export */   "CASE_TEMPORAL": () => /* binding */ CASE_TEMPORAL,
/* harmony export */   "CASE_TERMINATIVE": () => /* binding */ CASE_TERMINATIVE,
/* harmony export */   "CASE_TRANSLATIVE": () => /* binding */ CASE_TRANSLATIVE,
/* harmony export */   "CASE_VIALIS": () => /* binding */ CASE_VIALIS,
/* harmony export */   "CASE_VOCATIVE": () => /* binding */ CASE_VOCATIVE,
/* harmony export */   "MOOD_ADMIRATIVE": () => /* binding */ MOOD_ADMIRATIVE,
/* harmony export */   "MOOD_COHORTATIVE": () => /* binding */ MOOD_COHORTATIVE,
/* harmony export */   "MOOD_CONDITIONAL": () => /* binding */ MOOD_CONDITIONAL,
/* harmony export */   "MOOD_DECLARATIVE": () => /* binding */ MOOD_DECLARATIVE,
/* harmony export */   "MOOD_DUBITATIVE": () => /* binding */ MOOD_DUBITATIVE,
/* harmony export */   "MOOD_ENERGETIC": () => /* binding */ MOOD_ENERGETIC,
/* harmony export */   "MOOD_EVENTIVE": () => /* binding */ MOOD_EVENTIVE,
/* harmony export */   "MOOD_GENERIC": () => /* binding */ MOOD_GENERIC,
/* harmony export */   "MOOD_GERUNDIVE": () => /* binding */ MOOD_GERUNDIVE,
/* harmony export */   "MOOD_HYPOTHETICAL": () => /* binding */ MOOD_HYPOTHETICAL,
/* harmony export */   "MOOD_IMPERATIVE": () => /* binding */ MOOD_IMPERATIVE,
/* harmony export */   "MOOD_INDICATIVE": () => /* binding */ MOOD_INDICATIVE,
/* harmony export */   "MOOD_INFERENTIAL": () => /* binding */ MOOD_INFERENTIAL,
/* harmony export */   "MOOD_INFINITIVE": () => /* binding */ MOOD_INFINITIVE,
/* harmony export */   "MOOD_INTERROGATIVE": () => /* binding */ MOOD_INTERROGATIVE,
/* harmony export */   "MOOD_JUSSIVE": () => /* binding */ MOOD_JUSSIVE,
/* harmony export */   "MOOD_NEGATIVE": () => /* binding */ MOOD_NEGATIVE,
/* harmony export */   "MOOD_OPTATIVE": () => /* binding */ MOOD_OPTATIVE,
/* harmony export */   "MOOD_PARTICIPLE": () => /* binding */ MOOD_PARTICIPLE,
/* harmony export */   "MOOD_PRESUMPTIVE": () => /* binding */ MOOD_PRESUMPTIVE,
/* harmony export */   "MOOD_RENARRATIVE": () => /* binding */ MOOD_RENARRATIVE,
/* harmony export */   "MOOD_SUBJUNCTIVE": () => /* binding */ MOOD_SUBJUNCTIVE,
/* harmony export */   "MOOD_SUPINE": () => /* binding */ MOOD_SUPINE,
/* harmony export */   "NUM_SINGULAR": () => /* binding */ NUM_SINGULAR,
/* harmony export */   "NUM_PLURAL": () => /* binding */ NUM_PLURAL,
/* harmony export */   "NUM_DUAL": () => /* binding */ NUM_DUAL,
/* harmony export */   "NUM_TRIAL": () => /* binding */ NUM_TRIAL,
/* harmony export */   "NUM_PAUCAL": () => /* binding */ NUM_PAUCAL,
/* harmony export */   "NUM_SINGULATIVE": () => /* binding */ NUM_SINGULATIVE,
/* harmony export */   "NUM_COLLECTIVE": () => /* binding */ NUM_COLLECTIVE,
/* harmony export */   "NUM_DISTRIBUTIVE_PLURAL": () => /* binding */ NUM_DISTRIBUTIVE_PLURAL,
/* harmony export */   "NRL_CARDINAL": () => /* binding */ NRL_CARDINAL,
/* harmony export */   "NRL_ORDINAL": () => /* binding */ NRL_ORDINAL,
/* harmony export */   "NRL_DISTRIBUTIVE": () => /* binding */ NRL_DISTRIBUTIVE,
/* harmony export */   "NURL_NUMERAL_ADVERB": () => /* binding */ NURL_NUMERAL_ADVERB,
/* harmony export */   "ORD_1ST": () => /* binding */ ORD_1ST,
/* harmony export */   "ORD_2ND": () => /* binding */ ORD_2ND,
/* harmony export */   "ORD_3RD": () => /* binding */ ORD_3RD,
/* harmony export */   "ORD_4TH": () => /* binding */ ORD_4TH,
/* harmony export */   "ORD_5TH": () => /* binding */ ORD_5TH,
/* harmony export */   "ORD_6TH": () => /* binding */ ORD_6TH,
/* harmony export */   "ORD_7TH": () => /* binding */ ORD_7TH,
/* harmony export */   "ORD_8TH": () => /* binding */ ORD_8TH,
/* harmony export */   "ORD_9TH": () => /* binding */ ORD_9TH,
/* harmony export */   "TENSE_AORIST": () => /* binding */ TENSE_AORIST,
/* harmony export */   "TENSE_FUTURE": () => /* binding */ TENSE_FUTURE,
/* harmony export */   "TENSE_FUTURE_PERFECT": () => /* binding */ TENSE_FUTURE_PERFECT,
/* harmony export */   "TENSE_IMPERFECT": () => /* binding */ TENSE_IMPERFECT,
/* harmony export */   "TENSE_PAST_ABSOLUTE": () => /* binding */ TENSE_PAST_ABSOLUTE,
/* harmony export */   "TENSE_PERFECT": () => /* binding */ TENSE_PERFECT,
/* harmony export */   "TENSE_PLUPERFECT": () => /* binding */ TENSE_PLUPERFECT,
/* harmony export */   "TENSE_PRESENT": () => /* binding */ TENSE_PRESENT,
/* harmony export */   "VKIND_TO_BE": () => /* binding */ VKIND_TO_BE,
/* harmony export */   "VKIND_COMPOUNDS_OF_TO_BE": () => /* binding */ VKIND_COMPOUNDS_OF_TO_BE,
/* harmony export */   "VKIND_TAKING_ABLATIVE": () => /* binding */ VKIND_TAKING_ABLATIVE,
/* harmony export */   "VKIND_TAKING_DATIVE": () => /* binding */ VKIND_TAKING_DATIVE,
/* harmony export */   "VKIND_TAKING_GENITIVE": () => /* binding */ VKIND_TAKING_GENITIVE,
/* harmony export */   "VKIND_TRANSITIVE": () => /* binding */ VKIND_TRANSITIVE,
/* harmony export */   "VKIND_INTRANSITIVE": () => /* binding */ VKIND_INTRANSITIVE,
/* harmony export */   "VKIND_IMPERSONAL": () => /* binding */ VKIND_IMPERSONAL,
/* harmony export */   "VKIND_DEPONENT": () => /* binding */ VKIND_DEPONENT,
/* harmony export */   "VKIND_SEMIDEPONENT": () => /* binding */ VKIND_SEMIDEPONENT,
/* harmony export */   "VKIND_PERFECT_DEFINITE": () => /* binding */ VKIND_PERFECT_DEFINITE,
/* harmony export */   "VOICE_ACTIVE": () => /* binding */ VOICE_ACTIVE,
/* harmony export */   "VOICE_PASSIVE": () => /* binding */ VOICE_PASSIVE,
/* harmony export */   "VOICE_MEDIOPASSIVE": () => /* binding */ VOICE_MEDIOPASSIVE,
/* harmony export */   "VOICE_IMPERSONAL_PASSIVE": () => /* binding */ VOICE_IMPERSONAL_PASSIVE,
/* harmony export */   "VOICE_MIDDLE": () => /* binding */ VOICE_MIDDLE,
/* harmony export */   "VOICE_ANTIPASSIVE": () => /* binding */ VOICE_ANTIPASSIVE,
/* harmony export */   "VOICE_REFLEXIVE": () => /* binding */ VOICE_REFLEXIVE,
/* harmony export */   "VOICE_RECIPROCAL": () => /* binding */ VOICE_RECIPROCAL,
/* harmony export */   "VOICE_CAUSATIVE": () => /* binding */ VOICE_CAUSATIVE,
/* harmony export */   "VOICE_ADJUTATIVE": () => /* binding */ VOICE_ADJUTATIVE,
/* harmony export */   "VOICE_APPLICATIVE": () => /* binding */ VOICE_APPLICATIVE,
/* harmony export */   "VOICE_CIRCUMSTANTIAL": () => /* binding */ VOICE_CIRCUMSTANTIAL,
/* harmony export */   "VOICE_DEPONENT": () => /* binding */ VOICE_DEPONENT,
/* harmony export */   "TYPE_IRREGULAR": () => /* binding */ TYPE_IRREGULAR,
/* harmony export */   "TYPE_REGULAR": () => /* binding */ TYPE_REGULAR,
/* harmony export */   "CLASS_PERSONAL": () => /* binding */ CLASS_PERSONAL,
/* harmony export */   "CLASS_REFLEXIVE": () => /* binding */ CLASS_REFLEXIVE,
/* harmony export */   "CLASS_POSSESSIVE": () => /* binding */ CLASS_POSSESSIVE,
/* harmony export */   "CLASS_DEMONSTRATIVE": () => /* binding */ CLASS_DEMONSTRATIVE,
/* harmony export */   "CLASS_RELATIVE": () => /* binding */ CLASS_RELATIVE,
/* harmony export */   "CLASS_INTERROGATIVE": () => /* binding */ CLASS_INTERROGATIVE,
/* harmony export */   "CLASS_GENERAL_RELATIVE": () => /* binding */ CLASS_GENERAL_RELATIVE,
/* harmony export */   "CLASS_INDEFINITE": () => /* binding */ CLASS_INDEFINITE,
/* harmony export */   "CLASS_INTENSIVE": () => /* binding */ CLASS_INTENSIVE,
/* harmony export */   "CLASS_RECIPROCAL": () => /* binding */ CLASS_RECIPROCAL,
/* harmony export */   "PARADIGM_CAT_KAYLO": () => /* binding */ PARADIGM_CAT_KAYLO,
/* harmony export */   "PARADIGM_CAT_STATE": () => /* binding */ PARADIGM_CAT_STATE
/* harmony export */ });
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
const LANG_GEEZ = Symbol('ge\'ez')
const LANG_CHINESE = Symbol('chinese')
const LANG_SYRIAC = Symbol('syriac')

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
const STR_LANG_CODE_GEZ = 'gez'
const STR_LANG_CODE_ZHO = 'zho'
const STR_LANG_CODE_ZH = 'zh'
const STR_LANG_CODE_ZH_HANT = 'zh-Hant' // Traditional Chinese
const STR_LANG_CODE_ZH_HANS = 'zh-Hans' // Simplified Chinese
const STR_LANG_CODE_SYC = 'syc'
const STR_LANG_CODE_SYR = 'syr'
const STR_LANG_CODE_SYR_SYRJ = 'syr-Syrj'
const STR_LANG_CODE_ENG = 'eng'

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
const POFS_GERUNDIVE = 'gerundive'
const POFS_SUPINE = 'supine'
const POFS_VERB = 'verb'
const POFS_VERB_PARTICIPLE = 'verb participle'
const POFS_DENOMINATIVE = 'denominative'
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
// Paradigms
const PARADIGM_CAT_KAYLO = 'kaylo'
const PARADIGM_CAT_STATE = 'state'


/***/ }),

/***/ "./definition-set.js":
/*!***************************!*\
  !*** ./definition-set.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DefinitionSet
/* harmony export */ });
/* harmony import */ var _definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definition */ "./definition.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");



class DefinitionSet {
  constructor (lemmaWord, languageID) {
    this.lemmaWord = lemmaWord
    this.languageID = languageID

    this.shortDefs = []
    this.fullDefs = []
  }

  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   *
   * @param {object} jsonObject - A JSON object representing DefinitionSet data.
   * @returns {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject (jsonObject) {
    const languageID = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageIdFromCode(jsonObject.languageCode)

    let definitionSet = new DefinitionSet(jsonObject.lemmaWord, languageID) // eslint-disable-line prefer-const

    for (const shortDef of jsonObject.shortDefs) {
      definitionSet.shortDefs.push(_definition__WEBPACK_IMPORTED_MODULE_0__.default.readObject(shortDef))
    }
    for (const fullDef of jsonObject.fullDefs) {
      definitionSet.fullDefs.push(_definition__WEBPACK_IMPORTED_MODULE_0__.default.readObject(fullDef))
    }

    return definitionSet
  }

  /**
   * Checks if any short definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return this.shortDefs.length > 0
  }

  /**
   * Checks if any full definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return this.fullDefs.length > 0
  }

  /**
   * Check to see if the DefinitionSet is empty
   *
   * @returns {boolean} true if empty false if there is at least one definition
   */
  isEmpty () {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0
  }

  /**
   * Appends one or more definitions to a list of short definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of short definitions this object has.
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
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of full definitions this object has.
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

  convertToJSONObject () {
    const languageCode = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageCodeFromId(this.languageID)
    return {
      lemmaWord: this.lemmaWord,
      languageCode: languageCode,
      shortDefs: this.shortDefs.map(def => def.convertToJSONObject()),
      fullDefs: this.fullDefs.map(def => def.convertToJSONObject())
    }
  }
}


/***/ }),

/***/ "./definition.js":
/*!***********************!*\
  !*** ./definition.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../../node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resource_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resource_provider.js */ "./resource_provider.js");



class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText

    this.ID = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
  }

  static readObject (jsonObject) {
    // eslint-disable-next-line prefer-const
    let definition = new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)

    if (jsonObject.ID) {
      definition.ID = jsonObject.ID
    }

    if (jsonObject.provider) {
      const provider = _resource_provider_js__WEBPACK_IMPORTED_MODULE_1__.default.readObject(jsonObject.provider)
      return _resource_provider_js__WEBPACK_IMPORTED_MODULE_1__.default.getProxy(provider, definition)
    } else {
      return definition
    }
  }

  convertToJSONObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Definition);


/***/ }),

/***/ "./driver.js":
/*!*******************!*\
  !*** ./driver.js ***!
  \*******************/
/*! namespace exports */
/*! export ArabicLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Author [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export ChineseLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Constants [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*!   export CASE_ABESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ABLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ABSOLUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ACCUSATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ADDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ADELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ADESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ADVERBIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ALLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ANTESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_APUDESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_AVERSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_BENEFACTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_CARITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_CAUSAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_CAUSAL_FINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_COMITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_DATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_DELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_DIRECT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_DISTRIBUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_DISTRIBUTIVE_TEMPORAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_EQUATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ERGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ESSIVE_FORMAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ESSIVE_MODAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_EVITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_EXESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_FINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_FORMAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_GENITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_ILLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INSTRUCTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INSTRUMENTAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INSTRUMENTAL_COMITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_INTRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_LATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_LOCATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_MODAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_MULTIPLICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_NOMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PARTITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PEGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_POSSESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_POSTDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_POSTELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_POSTESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_POSTPOSITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PREPOSITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PRIVATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PROLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PROSECUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_PROXIMATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SEPARATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SOCIATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUBDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUBELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUBESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUBLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUPERDIRECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUPERESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUPERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_SUPPRESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_TEMPORAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_TERMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_TRANSLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_VIALIS [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CASE_VOCATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_DEMONSTRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_GENERAL_RELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_INDEFINITE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_INTENSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_INTERROGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_PERSONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_POSSESSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_RECIPROCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_REFLEXIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export CLASS_RELATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export COMP_COMPARITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export COMP_POSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export COMP_SUPERLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_ANIMATE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_ANIMATE_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_COMMON [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_FEMININE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_INANIMATE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_INANIMATE_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_NEUTER [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export GEND_PERSONAL_MASCULINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_ARABIC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_CHINESE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_DIR_LTR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_DIR_RTL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_GEEZ [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_GREEK [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_LATIN [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_PERSIAN [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_SYRIAC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_UNDEFINED [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_UNIT_CHAR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export LANG_UNIT_WORD [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_ADMIRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_COHORTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_CONDITIONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_DECLARATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_DUBITATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_ENERGETIC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_EVENTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_GENERIC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_GERUNDIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_HYPOTHETICAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_IMPERATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_INDICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_INFERENTIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_INFINITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_INTERROGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_JUSSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_NEGATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_OPTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_PARTICIPLE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_PRESUMPTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_RENARRATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_SUBJUNCTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export MOOD_SUPINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NRL_CARDINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NRL_DISTRIBUTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NRL_ORDINAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_COLLECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_DISTRIBUTIVE_PLURAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_DUAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_PAUCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_PLURAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_SINGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_SINGULATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NUM_TRIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export NURL_NUMERAL_ADVERB [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_1ST [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_2ND [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_3RD [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_4TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_5TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_6TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_7TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_8TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export ORD_9TH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export PARADIGM_CAT_KAYLO [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export PARADIGM_CAT_STATE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_ADJECTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_ADVERB [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_ADVERBIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_ARTICLE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_CONJUNCTION [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_DENOMINATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_EXCLAMATION [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_GERUNDIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_INTERJECTION [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_NOUN [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_NOUN_PROPER [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_NUMERAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_PARTICLE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_PREFIX [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_PREPOSITION [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_PRONOUN [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_SUFFIX [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_SUPINE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_VERB [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export POFS_VERB_PARTICIPLE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_AR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ARA [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ENG [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_FA [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_FAS [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_FA_IR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_GEZ [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_GRC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_LA [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_LAT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_PER [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_SYC [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_SYR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_SYR_SYRJ [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_UNDEFINED [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ZH [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ZHO [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ZH_HANS [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export STR_LANG_CODE_ZH_HANT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_AORIST [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_FUTURE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_FUTURE_PERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_IMPERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_PAST_ABSOLUTE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_PERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_PLUPERFECT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TENSE_PRESENT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TYPE_IRREGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export TYPE_REGULAR [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_COMPOUNDS_OF_TO_BE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_DEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_IMPERSONAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_INTRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_PERFECT_DEFINITE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_SEMIDEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_TAKING_ABLATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_TAKING_DATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_TAKING_GENITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_TO_BE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VKIND_TRANSITIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_ACTIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_ADJUTATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_ANTIPASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_APPLICATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_CAUSATIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_CIRCUMSTANTIAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_DEPONENT [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_IMPERSONAL_PASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_MEDIOPASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_MIDDLE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_PASSIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_RECIPROCAL [provided] [no usage info] [missing usage info prevents renaming] */
/*!   export VOICE_REFLEXIVE [provided] [no usage info] [missing usage info prevents renaming] */
/*!   other exports [not provided] [no usage info] */
/*! export Definition [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export DefinitionSet [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Feature [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export FeatureImporter [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export FeatureList [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export FeatureType [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export GeezLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export GreekLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export GrmFeature [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Homonym [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export HomonymGroup [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Inflection [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export LanguageModelFactory [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export LatinLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Lemma [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Lexeme [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Logger [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export PersianLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export PsEvent [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export PsEventData [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export ResourceProvider [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export SyriacLanguageModel [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export TextQuoteSelector [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export TextWork [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export Translation [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export TreebankDataItem [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export WordItem [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export WordList [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! export WordUsageExample [provided] [maybe used (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Constants": () => /* reexport module object */ _constants_js__WEBPACK_IMPORTED_MODULE_0__,
/* harmony export */   "Definition": () => /* reexport safe */ _definition_js__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "DefinitionSet": () => /* reexport safe */ _definition_set__WEBPACK_IMPORTED_MODULE_2__.default,
/* harmony export */   "Feature": () => /* reexport safe */ _feature_js__WEBPACK_IMPORTED_MODULE_3__.default,
/* harmony export */   "GrmFeature": () => /* reexport safe */ _grm_feature_js__WEBPACK_IMPORTED_MODULE_4__.default,
/* harmony export */   "FeatureType": () => /* reexport safe */ _feature_type_js__WEBPACK_IMPORTED_MODULE_5__.default,
/* harmony export */   "FeatureList": () => /* reexport safe */ _feature_list_js__WEBPACK_IMPORTED_MODULE_6__.default,
/* harmony export */   "FeatureImporter": () => /* reexport safe */ _feature_importer_js__WEBPACK_IMPORTED_MODULE_7__.default,
/* harmony export */   "Inflection": () => /* reexport safe */ _inflection_js__WEBPACK_IMPORTED_MODULE_13__.default,
/* harmony export */   "LanguageModelFactory": () => /* reexport safe */ _language_model_factory_js__WEBPACK_IMPORTED_MODULE_8__.default,
/* harmony export */   "HomonymGroup": () => /* reexport safe */ _homonym_group_js__WEBPACK_IMPORTED_MODULE_9__.default,
/* harmony export */   "Homonym": () => /* reexport safe */ _homonym_js__WEBPACK_IMPORTED_MODULE_10__.default,
/* harmony export */   "Lexeme": () => /* reexport safe */ _lexeme_js__WEBPACK_IMPORTED_MODULE_11__.default,
/* harmony export */   "Lemma": () => /* reexport safe */ _lemma_js__WEBPACK_IMPORTED_MODULE_12__.default,
/* harmony export */   "LatinLanguageModel": () => /* reexport safe */ _latin_language_model_js__WEBPACK_IMPORTED_MODULE_14__.default,
/* harmony export */   "GreekLanguageModel": () => /* reexport safe */ _greek_language_model_js__WEBPACK_IMPORTED_MODULE_15__.default,
/* harmony export */   "ArabicLanguageModel": () => /* reexport safe */ _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_16__.default,
/* harmony export */   "PersianLanguageModel": () => /* reexport safe */ _persian_language_model_js__WEBPACK_IMPORTED_MODULE_17__.default,
/* harmony export */   "GeezLanguageModel": () => /* reexport safe */ _geez_language_model_js__WEBPACK_IMPORTED_MODULE_18__.default,
/* harmony export */   "ChineseLanguageModel": () => /* reexport safe */ _chinese_language_model_js__WEBPACK_IMPORTED_MODULE_19__.default,
/* harmony export */   "SyriacLanguageModel": () => /* reexport safe */ _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_20__.default,
/* harmony export */   "ResourceProvider": () => /* reexport safe */ _resource_provider_js__WEBPACK_IMPORTED_MODULE_21__.default,
/* harmony export */   "Translation": () => /* reexport safe */ _translation_js__WEBPACK_IMPORTED_MODULE_24__.default,
/* harmony export */   "PsEvent": () => /* reexport safe */ _ps_events_ps_event_js__WEBPACK_IMPORTED_MODULE_22__.default,
/* harmony export */   "PsEventData": () => /* reexport safe */ _ps_events_ps_event_data_js__WEBPACK_IMPORTED_MODULE_23__.default,
/* harmony export */   "TextQuoteSelector": () => /* reexport safe */ _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_25__.default,
/* harmony export */   "WordUsageExample": () => /* reexport safe */ _texts_word_usage_example_js__WEBPACK_IMPORTED_MODULE_26__.default,
/* harmony export */   "Author": () => /* reexport safe */ _texts_author_js__WEBPACK_IMPORTED_MODULE_27__.default,
/* harmony export */   "TextWork": () => /* reexport safe */ _texts_text_work_js__WEBPACK_IMPORTED_MODULE_28__.default,
/* harmony export */   "WordItem": () => /* reexport safe */ _word_item_js__WEBPACK_IMPORTED_MODULE_29__.default,
/* harmony export */   "WordList": () => /* reexport safe */ _word_list_js__WEBPACK_IMPORTED_MODULE_30__.default,
/* harmony export */   "TreebankDataItem": () => /* reexport safe */ _treebank_data_item_js__WEBPACK_IMPORTED_MODULE_31__.default,
/* harmony export */   "Logger": () => /* reexport safe */ _logging_logger_js__WEBPACK_IMPORTED_MODULE_32__.default
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _definition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./definition.js */ "./definition.js");
/* harmony import */ var _definition_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definition-set */ "./definition-set.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _grm_feature_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./grm-feature.js */ "./grm-feature.js");
/* harmony import */ var _feature_type_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./feature_type.js */ "./feature_type.js");
/* harmony import */ var _feature_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./feature_list.js */ "./feature_list.js");
/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _homonym_group_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./homonym-group.js */ "./homonym-group.js");
/* harmony import */ var _homonym_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./homonym.js */ "./homonym.js");
/* harmony import */ var _lexeme_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lexeme.js */ "./lexeme.js");
/* harmony import */ var _lemma_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lemma.js */ "./lemma.js");
/* harmony import */ var _inflection_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./inflection.js */ "./inflection.js");
/* harmony import */ var _latin_language_model_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./latin_language_model.js */ "./latin_language_model.js");
/* harmony import */ var _greek_language_model_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./greek_language_model.js */ "./greek_language_model.js");
/* harmony import */ var _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./arabic_language_model.js */ "./arabic_language_model.js");
/* harmony import */ var _persian_language_model_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./persian_language_model.js */ "./persian_language_model.js");
/* harmony import */ var _geez_language_model_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./geez_language_model.js */ "./geez_language_model.js");
/* harmony import */ var _chinese_language_model_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./chinese_language_model.js */ "./chinese_language_model.js");
/* harmony import */ var _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./syriac_language_model.js */ "./syriac_language_model.js");
/* harmony import */ var _resource_provider_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./resource_provider.js */ "./resource_provider.js");
/* harmony import */ var _ps_events_ps_event_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ps-events/ps-event.js */ "./ps-events/ps-event.js");
/* harmony import */ var _ps_events_ps_event_data_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ps-events/ps-event-data.js */ "./ps-events/ps-event-data.js");
/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./translation.js */ "./translation.js");
/* harmony import */ var _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./w3c/text-quote-selector.js */ "./w3c/text-quote-selector.js");
/* harmony import */ var _texts_word_usage_example_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./texts/word-usage-example.js */ "./texts/word-usage-example.js");
/* harmony import */ var _texts_author_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./texts/author.js */ "./texts/author.js");
/* harmony import */ var _texts_text_work_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./texts/text-work.js */ "./texts/text-work.js");
/* harmony import */ var _word_item_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./word-item.js */ "./word-item.js");
/* harmony import */ var _word_list_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./word-list.js */ "./word-list.js");
/* harmony import */ var _treebank_data_item_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./treebank_data_item.js */ "./treebank_data_item.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");









































/***/ }),

/***/ "./feature.js":
/*!********************!*\
  !*** ./feature.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Feature
/* harmony export */ });
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");




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

    /**
     * Keeps feature values along with their sort order.
     * Items with higher sort order usually have more importance,
     * but how to interpret the sortOrder value is ultimately implementation-dependent.
     *
     * @type {{sortOrder: number, value: *}[]}
     * @private
     */
    this._data = Feature.dataValuesFromInput(data)
    this.sort()
  }

  /**
   *
   * @param {string | string[] | string[][]} data - Feature values with, possibly, their sort order.
   *        @see {@link Feature#constructor} for more details about possible values of `data` parameter.
   * @returns {{sortOrder: number, value: *}[]} Array of object in a format that will be used to store
   *          data values along with their sort order within a Feature object
   */
  static dataValuesFromInput (data) {
    let normalized
    if (!Array.isArray(data)) {
      // Single value with no sort order
      normalized = [[data, this.defaultSortOrder]]
    } else if (!Array.isArray(data[0])) {
      /*
      If several values are provided without any explicit sort order, they will be
      assigned a sort order automatically, according to their array index number.
      The first value item in an array will receive the highest sort order equal
      to the length of the array. The last item will have the lowest sort order, one.
       */
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
      case: 'case',
      grmCase: 'case', // A synonym of `case`
      declension: 'declension',
      gender: 'gender',
      type: 'type',
      class: 'class',
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
      /** for CJK languages only **/
      radical: 'radical',
      /** used for Syriac **/
      kaylo: 'kaylo',
      state: 'state'

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
   *
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
   *
   * @param {Feature} otherFeature the feature to compare this feature's values to
   * @returns {number} < 1 if this feature should be sorted first, 0 if they are equal and -1 if this feature should be sorted second
   */
  compareTo (otherFeature) {
    // the data values are sorted upon construction and insertion so we only should need to look at the first values
    // feature sortOrders are descending (i.e. 5 sorts higher than 1)
    if (otherFeature) {
      return otherFeature._data[0].sortOrder - this._data[0].sortOrder
    } else {
      // if the other feature isn't defined, this one sorts first
      return -1
    }
  }

  get items () {
    return this._data
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
  get value () {
    return this.values.join(this.constructor.joinSeparator)
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
  get singleValue () {
    if (this._data.length === 0) return
    if (this._data.length > 1) throw new Error(Feature.errMsgs.NO_SINGLE_VALUE)
    return this._data[0].value
  }

  /**
   * Returns an array of string values of a feature, sorted according to each item's sort order.
   * If a feature contains a single feature, an array with one value will be returned.
   *
   * @returns {*[]} An array of values in a format in which they are stored in the Feature object.
   */
  get values () {
    return this._data.map(v => v.value)
  }

  /**
   * Retrieves a value object by name. Can be used to update a value object directly.
   *
   * @param {string} featureValue - A feature value of an object to retrieve.
   */
  getValue (featureValue) {
    return this._data.find(v => v.value === featureValue)
  }

  /**
   * Returns a number of feature values.
   *
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
   *
   * @returns {string}
   */
  toString () {
    return this.value
  }

  /**
   * Examines the feature for a specific value.
   *
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValue (value) {
    return this.values.includes(value)
  }

  /**
   * Checks if this feature has all value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValues (values) {
    let hasValues = true
    for (const value of values) {
      hasValues = hasValues && this.hasValue(value)
    }
    return hasValues
  }

  /**
   * Checks if this feature has some value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasSomeValues (values) {
    let hasValues = false
    for (const value of values) {
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
   *
   * @param {Feature} feature - A GrmFtr object this feature should be compared with.
   * @returns {boolean} True if features are equal, false otherwise.
   */
  isEqual (feature) {
    return feature &&
      this.type === feature.type &&
      _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(this.languageID, feature.languageID) &&
      this.value === feature.value
  }

  /**
   * Adds a single new value to the existing feature object.
   * This function is chainable.
   *
   * @param {string} value - A feature value.
   * @param {number} sortOrder - A sort order.
   * @returns {Feature} - Self reference for chaining.
   */
  addValue (value, sortOrder = this.constructor.defaultSortOrder) {
    if (!this.hasValue(value)) {
      this._data.push({
        value: value,
        sortOrder: sortOrder
      })
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.getInstance().warn(`Value "${value}" already exists. If you want to change it, use "getValue" to access it directly.`)
    }
    return this
  }

  /**
   * Adds multiple new values to the existing feature object.
   * This function is chainable.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   * @returns {Feature} - Self reference for chaining.
   */
  addValues (data) {
    const normalizedData = this.constructor.dataValuesFromInput(data)
    const values = normalizedData.map(v => v.value)
    if (!this.hasSomeValues(values)) {
      this._data = this._data.concat(normalizedData)
      this.sort() // Resort an array to place an inserted value to the proper place
    } else {
      _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.getInstance().warn(`One or several values from "${values}" already exist. If you want to change it, use "getValue" to access a value directly.`)
    }
    return this
  }

  /**
   * Removes a single value from the existing feature object.
   *
   * @param value
   */
  removeValue (value) {
    // TODO: Do we need it?
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.getInstance().warn('This feature is not implemented yet')
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
  createFeature (value, sortOrder = this.constructor.defaultSortOrder) {
    // TODO: Add a check of if the value exists in a source Feature object
    return new Feature(this.type, [[value, sortOrder]], this.languageID, this.sortOrder, this.allowedValues)
  }

  /**
   * Creates a multiple value Feature object of the same type and same language,
   * but with a different feature values.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations,
   * formatted according to rules described in a Ftr constructor.
   * @returns {Feature} A new Ftr object.
   */
  createFeatures (data) {
    return new Feature(this.type, data, this.languageID, this.sortOrder, this.allowedValues)
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
  get ownFeatures () {
    return this.values.map(v => new Feature(this.type, v, this.languageID, 1, this.allowedValues))
  }

  /**
   * Create a copy of the feature object.
   */
  getCopy () {
    const values = this._data.map(item => [item.value, item.sortOrder])
    return new Feature(this.type, values, this.languageID, this.sortOrder, this.allowedValues.slice())
  }

  /**
   * Adds an importer to the internal list.
   *
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter (importer = new _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__.default(), name = this.constructor.defaultImporterName) {
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
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
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
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
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

  convertToJSONObject () {
    const data = this._data.map(dataItem => [dataItem.value, dataItem.sortOrder])
    return {
      type: this.type,
      languageCode: _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageCodeFromId(this.languageID),
      sortOrder: this.sortOrder,
      allowedValues: this.allowedValues,
      data: data
    }
  }

  static readObject (jsonObject) {
    const languageID = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageIdFromCode(jsonObject.languageCode)
    return new Feature(jsonObject.type, jsonObject.data, languageID, jsonObject.sortOrder, jsonObject.allowedValues)
  }
}

Feature.errMsgs = {
  NO_SINGLE_VALUE: 'More than one value stored'
}


/***/ }),

/***/ "./feature_importer.js":
/*!*****************************!*\
  !*** ./feature_importer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class FeatureImporter {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @returns {FeatureImporter}
   */
  constructor (defaults = [], returnUnknown = false) {
    this.hash = {}
    for (const value of defaults) {
      this.map(value, value)
    }
    this.returnUnknown = returnUnknown
    return this
  }

  /**
   * Sets mapping between external imported value and one or more library standard values. If an importedValue
   * is already in a hash table, old libraryValue will be overwritten with the new one.
   *
   * @param {string} importedValue - External value
   * @param {object|object[]|string|string[]} libraryValue - Library standard value
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
   *
   * @param {string} importedValue - A value to test.
   * @returns {boolean} - Tru if value is in a map, false otherwise.
   */
  has (importedValue) {
    return this.hash.hasOwnProperty(importedValue)
  }

  /**
   * Returns one or more library standard values that match an external value
   *
   * @param {string} sourceValue - External value
   * @returns {object|string} One or more of library standard values
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureImporter);


/***/ }),

/***/ "./feature_list.js":
/*!*************************!*\
  !*** ./feature_list.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/**
 * A list of grammatical features that characterizes a language unit. Has some additional service methods,
 * compared with standard storage objects.
 */
class FeatureList {
  /**
   * Initializes a feature list.
   *
   * @param {Feature[]} features - Features that build the list (optional, can be set later).
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

    for (const feature of features) {
      this._features.push(feature)
      this._types[feature.type] = feature
    }
  }

  /**
   * Returns an array of grouping features.
   *
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
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
   */
  ofType (type) {
    if (this.hasType(type)) {
      return this._types[type]
    }
  }

  /**
   * Checks whether a feature list has a feature of a specific type.
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {boolean} Whether a feature list has a feature of a particular type.
   */
  hasType (type) {
    return this._types.hasOwnProperty(type)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureList);


/***/ }),

/***/ "./feature_type.js":
/*!*************************!*\
  !*** ./feature_type.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature_importer.js */ "./feature_importer.js");
/* harmony import */ var _language_model_factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./language_model_factory */ "./language_model_factory.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");





/**
 * @deprecated Use Feature instead
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
   *
   * @param {string} type - A type of the feature, allowed values are specified in 'types' object.
   * @param {string[] | string[][]} values - A list of allowed values for this feature type.
   * If an empty array is provided, there will be no
   * allowed values as well as no ordering (can be used for items that do not need or have a simple order,
   * such as footnotes).
   * @param {string|symbol} language - A language of a feature type.
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
    ;({ languageID: this.languageID, languageCode: this.languageCode } = _language_model_factory__WEBPACK_IMPORTED_MODULE_2__.default.getLanguageAttrs(language))

    /*
     This is a sort order index for a grammatical feature values. It is determined by the order of values in
     a 'values' array.
     */
    this._orderIndex = []
    this._orderLookup = {}

    for (const [index, value] of values.entries()) {
      this._orderIndex.push(value)
      if (Array.isArray(value)) {
        for (const element of value) {
          this[element] = new _feature_js__WEBPACK_IMPORTED_MODULE_0__.default(this.type, element, this.languageID)
          this._orderLookup[element] = index
        }
      } else {
        this[value] = new _feature_js__WEBPACK_IMPORTED_MODULE_0__.default(this.type, value, this.languageID)
        this._orderLookup[value] = index
      }
    }
  }

  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('Please use a "languageID" instead of a "language"')
    return this.languageCode
  }

  /**
   * test to see if this FeatureType allows unrestricted values
   *
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue () {
    return this.orderedValues.length === 1 && this.orderedValues[0] === FeatureType.UNRESTRICTED_VALUE
  }

  /**
   * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
   * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
   *
   * @param value
   * @param {int} sortOrder
   * @returns {Feature}
   */
  get (value, sortOrder = 1) {
    if (value) {
      return new _feature_js__WEBPACK_IMPORTED_MODULE_0__.default(this.type, [[value, sortOrder]], this.languageID)
    } else {
      throw new Error('A non-empty value should be provided.')
    }
  }

  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues (data) {
    return new _feature_js__WEBPACK_IMPORTED_MODULE_0__.default(this.type, data, this.languageID)
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
   *
   * @param {string} name - A name of an importer object
   * @returns {Importer} A new or existing Importer object that matches a name provided
   */
  addImporter (name) {
    if (!name) {
      throw new Error('Importer should have a non-empty name.')
    }
    this.importer = this.importer || {}
    this.importer[name] = this.importer[name] || new _feature_importer_js__WEBPACK_IMPORTED_MODULE_1__.default()
    return this.importer[name]
  }

  /**
   * Return copies of all feature values as Feature objects in a sorted array, according to feature type's sort order.
   * For a similar function that returns strings instead of Feature objects see orderedValues().
   *
   * @returns {Feature[] | Feature[][]} Array of feature values sorted according to orderIndex.
   * If particular feature contains multiple feature values (i.e. `masculine` and `feminine` values combined),
   * an array of Feature objects will be returned instead of a single Feature object, as for single feature values.
   */
  get orderedFeatures () {
    return this.orderedValues.map((value) => new _feature_js__WEBPACK_IMPORTED_MODULE_0__.default(this.type, value, this.languageID))
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
  get orderedValues () {
    return this._orderIndex
  }

  /**
   * Returns a lookup table for type values as:
   *  {value1: order1, value2: order2}, where order is a sort order of an item. If two items have the same sort order,
   *  their order value will be the same.
   *
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

    for (const value of values) {
      if (Array.isArray(value)) {
        for (const element of value) {
          if (!this.hasOwnProperty(element.value)) {
            throw new Error('Trying to order an element with "' + element.value + '" value that is not stored in a "' + this.type + '" type.')
          }

          if (element.type !== this.type) {
            throw new Error('Trying to order an element with type "' + element.type + '" that is different from "' + this.type + '".')
          }

          if (!_language_model_factory__WEBPACK_IMPORTED_MODULE_2__.default.compareLanguages(element.languageID, this.languageID)) {
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

        if (!_language_model_factory__WEBPACK_IMPORTED_MODULE_2__.default.compareLanguages(value.languageID, this.languageID)) {
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
        let elements = [] // eslint-disable-line prefer-const
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureType);


/***/ }),

/***/ "./geez_language_model.js":
/*!********************************!*\
  !*** ./geez_language_model.js ***!
  \********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GeezLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");




const typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  GezLanguageModel is the lass for Ge'ez specific behavior
 */
class GeezLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_GEEZ }

  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_GEZ }

  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_GEZ] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_LTR }

  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_UNIT_WORD }
  static get featureValues () {
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__.default.featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mood,
        [
          // TODO Valid Values for mood for gez
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
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return "፡፨።፣፤፥፦፧፠,;:!?'\"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }
}


/***/ }),

/***/ "./greek_language_model.js":
/*!*********************************!*\
  !*** ./greek_language_model.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GreekLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");
/* harmony import */ var _languages_greek_chars_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/greek-chars.js */ "./languages/greek-chars.js");








let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false
/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class GreekLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_GREEK }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_GRC }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_GRC] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_LTR }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_UNIT_WORD }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__.default.featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmClass,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_DEMONSTRATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_GENERAL_RELATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_INDEFINITE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_INTENSIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_INTERROGATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_PERSONAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_POSSESSIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_RECIPROCAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_REFLEXIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_RELATIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.number,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.NUM_SINGULAR,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.NUM_PLURAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.NUM_DUAL
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmCase,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_NOMINATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_GENITIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_DATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_ACCUSATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_VOCATIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.declension,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_1ST,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_2ND,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_3RD
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.tense,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PRESENT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_IMPERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_FUTURE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PLUPERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_FUTURE_PERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_AORIST
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.voice,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_PASSIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_ACTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_MEDIOPASSIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_MIDDLE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.mood,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_INDICATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_SUBJUNCTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_OPTATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_IMPERATIVE
        ]
      ],
      [
        // TODO full list of greek dialects
        _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.dialect,
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
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return true
  }

  /**
   * @override
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part, _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.voice]
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or the source text
   * @returns {string} the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type string
   */
  static normalizeText (text) {
    // we normalize greek to NFC - Normalization Form Canonical Composition
    if (text) {
      text = text.normalize('NFC')
      // normalize the right single quotation at the end (elision) to Greek Koronois \u1fbd
      text = text.replace(/\u2019$/, '\u1fbd')
    }
    return text
  }

  static _tonosToOxia (word) {
    return word.replace(
      /\u{03AC}/ug, '\u{1F71}').replace( // alpha
      /\u{03AD}/ug, '\u{1F73}').replace( // epsilon
      /\u{03AE}/ug, '\u{1F75}').replace( // eta
      /\u{03AF}/ug, '\u{1F77}').replace( // iota
      /\u{03CC}/ug, '\u{1F79}').replace( // omicron
      /\u{03CD}/ug, '\u{1F7B}').replace( // upsilon
      /\u{03CE}/ug, '\u{1F7D}').replace( // omega
      /\u{0390}/ug, '\u{1FD3}').replace( // iota with dialytika and tonos
      /\u{03B0}/ug, '\u{1FE3}') // upsilon with dialytika and tonos
  }

  /**
   * @override
   */
  static alternateWordEncodings ({
    word = null, preceding = null, following = null,
    encoding = null, preserveCase = false, includeOriginal = false
  } = {}) {
    // the original alpheios code used the following normalizations
    // 1. When looking up a lemma
    //    stripped vowel length
    //    stripped caps
    //    then if failed, tried again with out these
    // 2. when adding to a word list
    //    precombined unicode (vowel length/diacritics preserved)
    // 2. When looking up a verb in the verb paradigm tables
    //    it set e_normalize to false, otherwise it was true...
    if (!word) {
      return []
    }
    // make sure it's normalized to NFC
    let normalized = GreekLanguageModel.normalizeText(word) // eslint-disable-line prefer-const
    // and in lower case unless explicitly requested otherwise
    if (!preserveCase) {
      normalized = normalized.toLocaleLowerCase()
    }
    const strippedVowelLength = normalized.replace(
      /[\u{1FB0}\u{1FB1}]/ug, '\u{03B1}').replace(
      /[\u{1FB8}\u{1FB9}]/ug, '\u{0391}').replace(
      /[\u{1FD0}\u{1FD1}]/ug, '\u{03B9}').replace(
      /[\u{1FD8}\u{1FD9}]/ug, '\u{0399}').replace(
      /[\u{1FE0}\u{1FE1}]/ug, '\u{03C5}').replace(
      /[\u{1FE8}\u{1FE9}]/ug, '\u{03A5}').replace(
      /[\u{00AF}\u{0304}\u{0306}]/ug, '') // eslint-disable-line no-misleading-character-class

    // Per https://wiki.digitalclassicist.org/Greek_Unicode_duplicated_vowels
    // oxia and tonos are semantically identical and tonos should be preferred over oxia
    // both both should be processed as equivalent. the normalize('NFC') function will
    // normalize oxia to tonos, but some of our dictionary indicies may use oxia so
    // we should allow oxia back in as an alternate encoding
    const tonosToOxia = GreekLanguageModel._tonosToOxia(normalized)

    const strippedDiaeresis = normalized.replace(
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
      /[\u{00A8}\u{0308}]/ug, '') // eslint-disable-line no-misleading-character-class
    // to strip diacritics, rather than list all possible combined vowels with
    // diacritis, decompose, remove the combining accents, and then recompose
    const strippedDiacritics = normalized.normalize('NFD').replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug, '').normalize('NFC') // eslint-disable-line no-misleading-character-class

    let alternates = []
    if (encoding === 'strippedDiaeresis') {
      alternates.push(strippedDiaeresis)
    } else if (encoding === 'strippedDiacritics') {
      alternates.push(strippedDiacritics)
    } else if (encoding === 'strippedAll') {
      alternates.push(strippedDiaeresis.normalize('NFD').replace(
        /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug, '').normalize('NFC')) // eslint-disable-line no-misleading-character-class
    } else {
      // default is to strip vowel lengths and replace tonos with oxia
      alternates.push(strippedVowelLength)
      if (tonosToOxia !== strippedVowelLength) {
        alternates.push(tonosToOxia)
      }
    }
    if (!includeOriginal) {
      alternates = alternates.filter(w => w !== word)
    }
    return alternates
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return '.,;:!?"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u201C\u201D\u0387\u00B7\n\r\u200C\u200D'
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    const constraints = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    }
    const formBasedList = [_constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PRONOUN, _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_NUMERAL, _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ARTICLE]
    if (inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part)) {
      if (formBasedList.includes(inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part].value)) {
        constraints.fullFormBased = true
      } else {
        constraints.suffixBased = true
      }
    } else {
      _logging_logger_js__WEBPACK_IMPORTED_MODULE_4__.default.getInstance().warn('Unable to set grammar: part of speech data is missing or is incorrect', inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part])
    }

    constraints.pronounClassRequired =
      _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.compareLanguages(GreekLanguageModel.languageID, inflection.languageID) &&
      inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part) &&
      inflection[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.part].value === _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PRONOUN

    return constraints
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
  static getPronounClasses (forms, word, hdwd, normalize = true) {
    // eslint-disable-next-line prefer-const
    let matchingValues = new Set() // Will eliminate duplicated values
    const matchingForms = forms.filter(
      form => {
        let match = false
        // the following test intential looks for an exact equality on the headword rather than
        // using compareWord because exact match on diacritics matters -- the interrogative and indefinite
        // pronouns only differ by diacritics
        if (form.value && (!form.features[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.hdwd] || (form.features[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.hdwd].value === hdwd))) {
          match = GreekLanguageModel.compareWords(form.value, word, normalize)
        }
        return match
      }
    )
    for (const matchingForm of matchingForms) {
      if (matchingForm.features.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmClass)) {
        for (const value of matchingForm.features[_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmClass].values) {
          matchingValues.add(value)
        }
      }
    }
    if (matchingValues.size > 0) {
      return new _feature_js__WEBPACK_IMPORTED_MODULE_3__.default(_feature_js__WEBPACK_IMPORTED_MODULE_3__.default.types.grmClass, Array.from(matchingValues), GreekLanguageModel.languageID)
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
  static compareWords (wordA, wordB, normalize = true,
    { normalizeTrailingDigit = false } = {}) {
    let matched = false
    if (normalize) {
      if (normalizeTrailingDigit) {
        /*
        If a trailing digit is `1` (e.g. `αἴγυπτος1`) remove it, because the word with it is an equivalent of
        a word without (e.g. `αἴγυπτος`).
         */
        wordA = this.normalizeTrailingDigit(wordA)
        wordB = this.normalizeTrailingDigit(wordB)
      }

      const altWordA = GreekLanguageModel.alternateWordEncodings({
        word: wordA,
        encoding: 'strippedDiacritics',
        includeOriginal: true
      })
      const altWordB = GreekLanguageModel.alternateWordEncodings({
        word: wordB,
        encoding: 'strippedDiacritics',
        includeOriginal: true
      })
      for (let i = 0; i < altWordA.length; i++) {
        matched = altWordA[i] === altWordB[i]
        if (matched) {
          break
        }
      }
      if (!matched) {
        matched = GreekLanguageModel.normalizeText(wordA) === GreekLanguageModel.normalizeText(wordB)
      }
    } else {
      matched = wordA === wordB
    }
    return matched
  }

  static isValidUnicode (word) {
    return _languages_greek_chars_js__WEBPACK_IMPORTED_MODULE_5__.default.chars.some(char => word.includes(char))
  }
}


/***/ }),

/***/ "./grm-feature.js":
/*!************************!*\
  !*** ./grm-feature.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");




/**
 * Wrapper class for a (grammatical, usually) feature, such as part of speech or declension. Keeps both value and type information.
 */
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
    ;({ languageID: this.languageID, languageCode: this.languageCode } = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageAttrs(language))
    this.sortOrder = sortOrder
  }

  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.getInstance().warn('Please use a "languageID" instead of a "language"')
    return this.languageCode
  }

  isEqual (feature) {
    if (Array.isArray(feature.value)) {
      // `feature` is a single object with multiple `value` properties. This feature will be sunset
      // as it does not allow to use sort order on Feature objects.
      if (!Array.isArray(this.value) || this.value.length !== feature.value.length) {
        return false
      }
      let equal = this.type === feature.type && _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(this.languageID, feature.languageID)
      equal = equal && this.value.every(function (element, index) {
        return element === feature.value[index]
      })
      return equal
    } else {
      return _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(this.languageID, feature.languageID) && this.type === feature.type && this.value === feature.value
    }
  }

  isSubsetof (features) {
    if (!Array.isArray(features)) {
      features = [features] // If `features` is a single value, convert it to an array (a more general case)
    }
    // `feature` is an array of feature objects with (possibly) each having a single feature value.
    const languageID = features[0].languageID // Assume all Feature objects have the same language ID
    const type = features[0].type // Assume all Feature objects have the same type
    const values = features.map(f => f.value)
    if (_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(this.languageID, languageID) && this.type === type && values.includes(this.value)) {
      return true
    }
    return false
  }

  /**
   * examine the feature for a specific value
   *
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
   *
   * @returns {string}
   */
  toString () {
    if (Array.isArray(this.value)) {
      return this.value.join(',')
    } else {
      return this.value
    }
  }

  static toFeature (sourceFeature) {
    if (Array.isArray(sourceFeature)) {
      if (!(sourceFeature[0] instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
        const type = sourceFeature[0].type
        const languageID = sourceFeature[0].languageID
        const values = sourceFeature.map(v => v.value)
        return new _feature_js__WEBPACK_IMPORTED_MODULE_1__.default(type, values, languageID)
      }
    } else {
      if (!(sourceFeature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
        return new _feature_js__WEBPACK_IMPORTED_MODULE_1__.default(sourceFeature.type, sourceFeature.value, sourceFeature.languageID)
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
  case: 'case',
  grmCase: 'case', // A synonym of `case`
  declension: 'declension',
  gender: 'gender',
  type: 'type',
  class: 'class',
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
    const v = `${value}`
    return Object.values(this).includes(v)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrmFeature);


/***/ }),

/***/ "./homonym-group.js":
/*!**************************!*\
  !*** ./homonym-group.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ HomonymGroup
/* harmony export */ });
/* harmony import */ var _homonym_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homonym.js */ "./homonym.js");


class HomonymGroup {
  constructor (homonyms = []) {
    this._homonyms = homonyms
  }

  get homonyms () {
    return this._homonyms
  }

  get hasHomonyms () {
    return this._homonyms.length > 0
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
  toHomonym (targetWord, { disambiguated = false } = {}) {
    if (!targetWord) {
      throw new Error(HomonymGroup.errors.NO_TARGET_WORD)
    }
    const lexemes = this._homonyms.map(homonym => homonym.lexemes).flat()
    if (disambiguated) {
      lexemes.forEach(lexeme => { lexeme.disambiguated = true })
    }
    return new _homonym_js__WEBPACK_IMPORTED_MODULE_0__.default(lexemes, targetWord)
  }
}

HomonymGroup.errors = {
  NO_TARGET_WORD: 'Target word is not provided'
}


/***/ }),

/***/ "./homonym.js":
/*!********************!*\
  !*** ./homonym.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _language_model_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory */ "./language_model_factory.js");
/* harmony import */ var _lexeme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lexeme.js */ "./lexeme.js");
/* harmony import */ var _lemma_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lemma.js */ "./lemma.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");





class Homonym {
  /**
   * Initializes a Homonym object.
   *
   * @param {Lexeme[]} lexemes - An array of Lexeme objects.
   * @param {string} form - the form which produces the homonyms
   */
  constructor (lexemes, form) {
    if (!lexemes || (Array.isArray(lexemes) && lexemes.length === 0)) {
      throw new Error('Lexemes data should not be empty.')
    }

    if (!Array.isArray(lexemes)) {
      throw new Error('Lexeme data should be provided in an array.')
    }

    for (const lexeme of lexemes) {
      if (!(lexeme instanceof _lexeme_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
        throw new Error('All lexeme data should be of Lexeme object type.')
      }
    }

    /** @type {Lexeme[]} */
    this.lexemes = lexemes
    this.targetWord = form
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
  static createSimpleForm (word, languageID, inflections = []) {
    const lemma = new _lemma_js__WEBPACK_IMPORTED_MODULE_2__.default(word, languageID)
    const lexeme = new _lexeme_js__WEBPACK_IMPORTED_MODULE_1__.default(lemma, inflections)
    return new Homonym([lexeme], word)
  }

  /**
   * Checks if any of the lexemes of this homonym has short definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return Boolean(this.lexemes && this.lexemes.some(l => l.hasShortDefs))
  }

  /**
   * Checks if any of the lexemes of this homonym has full definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return Boolean(this.lexemes && this.lexemes.some(l => l.hasFullDefs))
  }

  static readObject (jsonObject) {
    let lexemes = [] // eslint-disable-line prefer-const
    if (jsonObject.lexemes) {
      for (const lexeme of jsonObject.lexemes) {
        lexemes.push(_lexeme_js__WEBPACK_IMPORTED_MODULE_1__.default.readObject(lexeme))
      }
    } else {
      const languageID = _language_model_factory__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageIdFromCode(jsonObject.languageCode)
      lexemes = [new _lexeme_js__WEBPACK_IMPORTED_MODULE_1__.default(new _lemma_js__WEBPACK_IMPORTED_MODULE_2__.default(jsonObject.targetWord, languageID), [])]
    }
    const homonym = new Homonym(lexemes, jsonObject.form || jsonObject.targetWord)
    homonym.lemmasList = jsonObject.lemmasList
    return homonym
  }

  convertToJSONObject (addMeaning = false) {
    let resultHomonym = { lexemes: [], form: this.targetWord } // eslint-disable-line prefer-const
    for (const lexeme of this.lexemes) {
      resultHomonym.lexemes.push(lexeme.convertToJSONObject(addMeaning))
    }
    return resultHomonym
  }

  /**
   * Returns a language code of a homonym (ISO 639-3).
   * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {string} A language code, as defined in the `languages` object.
   */
  get language () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('Please use languageID instead')
    return _language_model_factory__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageCodeFromId(this.languageID)
  }

  /**
   * Returns a language ID of a homonym.
   * Homonym does not have a languageID property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using languageID property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {symbol} A language ID, as defined in the `LANG_` constants.
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
   *
   * @returns {Inflection[]} An array of inflections
   */
  get inflections () {
    let inflections = []
    for (const lexeme of this.lexemes) {
      inflections = inflections.concat(lexeme.inflections)
    }
    return inflections
  }

  isDisambiguated () {
    return this.lexemes.filter(l => l.disambiguated).length > 0
  }

  /**
   * Disambiguate homymyn objects with another
   *
   * @param {Homonym} base the homonym to use to disambiguate
   * @param {Homonym[]} disambiguators the homonyms to use to disambiguate
   */
  static disambiguate (base, disambiguators) {
    if (disambiguators.length === 0) {
      // nothing left to disamibugate with
      return base
    }
    const disambiguator = disambiguators.shift()
    let lexemes = [] // eslint-disable-line prefer-const
    let missedLexemes = [] // eslint-disable-line prefer-const
    // iterate through the lexemes in the disambiguator and try
    // to disambiguate the existing lexemes with each
    for (const otherLexeme of disambiguator.lexemes) {
      let lexemeMatched = false
      for (const lexeme of base.lexemes) {
        // Do not try to disambiguate lexemes that can't: it will erase a `disambiguated` flag
        const newLex = lexeme.canBeDisambiguatedWith(otherLexeme) ? _lexeme_js__WEBPACK_IMPORTED_MODULE_1__.default.disambiguate(lexeme, otherLexeme) : lexeme

        if (lexeme.isFullHomonym(otherLexeme, { normalize: true })) {
          lexemeMatched = true
          // If lexeme is a full homonym with a disambiguator, it should always be marked as disambiguated
          newLex.disambiguated = true
        }
        lexemes.push(newLex)
      }
      // if we couldn't find a matching lexeme, add the disambigutor's lexemes
      // to the list of lexemes for the new Homonym
      if (!lexemeMatched) {
        otherLexeme.disambiguated = true
        missedLexemes.push(otherLexeme)
      }
    }
    // create a new homonym with the disamibugated lexemes
    const newHom = new Homonym([...lexemes, ...missedLexemes], base.targetWord)
    return Homonym.disambiguate(newHom, disambiguators)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Homonym);


/***/ }),

/***/ "./inflection.js":
/*!***********************!*\
  !*** ./inflection.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");




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
   *
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

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.supportsLanguage(language)) {
      throw new Error(`language ${language} not supported.`)
    }

    this.stem = stem
    this.languageID = undefined
    this.languageCode = undefined
    ;({ languageID: this.languageID, languageCode: this.languageCode } = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageAttrs(language))
    this.model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageModel(this.languageID)
    this.features = new Set() // Stores names of features of this inflection, feature objects themselves are stored as props

    // TODO: Separate constraints to a class of its own to share definition with language model and provide `clone()` method?
    // A grammar constraints object
    this.constraints = {
      fullFormBased: false, // True this inflection stores and requires to use a full form of a word
      suffixBased: false, // True if only suffix is enough to identify this inflection
      irregular: false, // Whether this word is an irregular one
      obligatoryMatches: [], // {string[]} Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [], // {string[]} Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
      morphologyMatches: [] // {string[]} These features should match for a morphology match
    }

    // Suffix may not be present in every word. If missing, it will be set to null.
    this.suffix = suffix

    // Prefix may not be present in every word. If missing, it will be set to null.
    this.prefix = prefix

    // Example may not be provided
    this.example = example

    // A lemma this inflection belongs to. Is set by `Lexeme.addInflection()`
    // TODO: make sure inflections are not set directly or this data will not be set
    this.lemma = null
  }

  clone () {
    // eslint-disable-next-line prefer-const
    let clone = new Inflection(this.stem, this.languageID, this.suffix, this.prefix, this.example)
    // Features are not modified right now so we can share them
    clone.addFeatures(Array.from(this.features).map(f => this[f]))
    clone.constraints = {
      fullFormBased: this.constraints.fullFormBased,
      suffixBased: this.constraints.suffixBased,
      irregular: this.constraints.irregular,
      obligatoryMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      optionalMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      morphologyMatches: this.constraints.morphologyMatches ? Array.from(this.constraints.morphologyMatches) : []
    }
    // A clone will share the same lexeme with an original item
    clone.lemma = this.lemma
    return clone
  }

  /**
   * Returns a full form of a word using ' - ' as a divider for suffix-based inflections.
   *
   * @returns {string} A word form.
   */
  get form () {
    const divider = this.stem ? ' - ' : ''
    return this.getForm(divider)
  }

  /**
   * Returns a full form of a word using user specified divider for suffix-based inflections.
   *
   * @param {string} divider - A divider to use between stem and suffix.
   * @returns {string} A word form.
   */
  getForm (divider = '') {
    let form, prefix, suffix

    const stem = this.stem ? this.stem : ''

    if (this.model.direction === _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_RTL) {
      prefix = this.prefix ? divider + this.prefix : ''
      suffix = this.suffix ? this.suffix + divider : ''

      form = suffix + stem + prefix
    } else {
      prefix = this.prefix ? this.prefix + divider : ''
      suffix = this.suffix ? divider + this.suffix : ''

      form = prefix + stem + suffix
    }

    return form
  }

  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('Please use a "languageID" instead of a "language"')
    return this.languageCode
  }

  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints () {
    if (this.model.hasOwnProperty('getInflectionConstraints')) {
      const constraintData = this.model.getInflectionConstraints(this)
      this.constraints = Object.assign(this.constraints, constraintData)
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
  smartWordCompare (word, className, options = {}) {
    // Default values
    if (!options.hasOwnProperty('normalize')) { options.normalize = true }
    if (!options.hasOwnProperty('fuzzySuffix')) { options.fuzzySuffix = false }

    let value
    if (!this.constraints.irregular) {
      value = this.constraints.suffixBased ? this.suffix : this.form
    } else {
      if (className === 'Suffix') {
        value = this.suffix
      } else {
        value = this[_feature_js__WEBPACK_IMPORTED_MODULE_0__.default.types.fullForm] ? this[_feature_js__WEBPACK_IMPORTED_MODULE_0__.default.types.fullForm].value : this.form
      }
    }

    let matchResult = this.modelCompareWords(word, value, options.normalize)

    if (!matchResult && className === 'Suffix' && options.fuzzySuffix) {
      const form = this.getForm()
      if (form && word && form.length >= word.length) {
        const altSuffix = form.substring(form.length - word.length)
        matchResult = this.modelCompareWords(word, altSuffix, options.normalize)
      }
    }

    return matchResult
  }

  compareWithWord (word, normalize = true) {
    const value = this.constraints.suffixBased ? this.suffix : this.form
    return this.modelCompareWords(word, value, normalize)
  }

  /**
   * Compare to words (or partial words) delegating to the language model
   * rules for normalization
   *
   * @param {string} wordA the first word
   * @param {string} wordB the second word
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareWords (wordA, wordB, normalize = true) {
    const model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageModel(this.languageID)
    return model.compareWords(wordA, wordB, normalize)
  }

  /**
   * Check to see if the supplied inflection can disambiguate this one
   *
   * @param {Inflection} infl Inflection object to be used for disambiguation
   */
  disambiguatedBy (infl) {
    let matched = true
    // an inflection can only be disambiguated by its features
    if (this.features.length === 0 || infl.features.length === 0) {
      matched = false
    }
    // the supplied inflection can be less specific but not more
    if (infl.features.length > this.features.length) {
      matched = false
    }
    for (const feature of infl.features) {
      if (!this[feature] || !this[feature].isEqual(infl[feature])) {
        matched = false
        break
      }
    }
    return matched
  }

  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('Please use "addFeature" instead.')
    if (!data) {
      throw new Error('Inflection feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    const type = data[0].type
    this[type] = []
    for (const element of data) {
      if (!(element instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__.default)) {
        throw new Error('Inflection feature data must be a Feature object.')
      }

      if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.compareLanguages(element.languageID, this.languageID)) {
        throw new Error(`Language "${element.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`)
      }

      this[type].push(element)
      this.features.add(type)
    }
  }

  /**
   * Sets a grammatical feature of an inflection. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature (feature) {
    if (!feature) {
      throw new Error('feature data cannot be empty.')
    }

    if (!(feature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__.default)) {
      throw new Error('feature data must be a Feature object.')
    }

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
    }

    this[feature.type] = feature
    this.features.add(feature.type)
  }

  /**
   * Sets multiple grammatical features of an inflection.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error('Features must be in an array')
    }

    for (const feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   *
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @returns {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue (featureName, featureValue) {
    if (this.hasOwnProperty(featureName)) {
      return this[featureName].values.includes(featureValue)
    }
    return false
  }

  toString () {
    let string = `Inflection stem: ${this.stem}, prefix: ${this.prefix}, suffix: ${this.suffix}, langID: ${this.languageID.toString()}\n  features:  `
    for (const feature of this.features.values()) {
      string += `${feature}: ${this[feature].value}, `
    }
    string += '\n  constraints:  '
    for (const [key, value] of Object.entries(this.constraints)) {
      if (Array.isArray(value)) {
        string += `${key}: [${value}], `
      } else {
        string += `${key}: ${value}, `
      }
    }
    string += `\n  example: ${this.example}`
    return string
  }

  static readObject (jsonObject, lemma) {
    // eslint-disable-next-line prefer-const
    let inflection =
      new Inflection(
        jsonObject.stem, jsonObject.languageCode, jsonObject.suffix, jsonObject.prefix, jsonObject.example)
    inflection.languageID = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageIdFromCode(inflection.languageCode)

    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach(featureSource => {
        inflection.addFeature(_feature_js__WEBPACK_IMPORTED_MODULE_0__.default.readObject(featureSource))
      })
    }
    if (lemma) {
      inflection.lemma = lemma
    }
    return inflection
  }

  convertToJSONObject () {
    let resultFeatures = [] // eslint-disable-line prefer-const
    for (const key of this.features.keys()) {
      resultFeatures.push(this[key].convertToJSONObject())
    }
    const languageCode = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageCodeFromId(this.languageID)
    return {
      stem: this.stem,
      languageCode: languageCode,
      suffix: this.suffix,
      prefix: this.prefix,
      example: this.example,
      features: resultFeatures
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Inflection);


/***/ }),

/***/ "./inflection_group.js":
/*!*****************************!*\
  !*** ./inflection_group.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class InflectionGroup {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   * @param sortKey
   */
  constructor (groupingKey, inflections = [], sortKey = null) {
    this.groupingKey = groupingKey
    this.inflections = inflections
  }

  /**
   * Add an Inflection or InflectionGroup to the group
   *
   * @param {Inflection|InflectionGroup} inflection
   */
  append (inflection) {
    this.inflections.push(inflection)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InflectionGroup);


/***/ }),

/***/ "./inflection_grouping_key.js":
/*!************************************!*\
  !*** ./inflection_grouping_key.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./feature.js");


class InflectionGroupingKey {
  /**
   * @class
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {object} extras extra property name and value pairs used in the key
   */
  constructor (infl, features, extras = {}) {
    for (const feature of features) {
      this[feature] = infl[feature]
    }
    Object.assign(this, extras)
  }

  /**
   * checks if a feature with a specific value
is included in the grouping key
   *
   * @returns {boolean} true if found, false if not
   * @param feature
   * @param value
   */
  hasFeatureValue (feature, value) {
    if (this.hasOwnProperty(feature)) {
      return this[feature].values.includes(value)
    }
    return false
  }

  /**
   * Return this key as a string
   *
   * @returns {string} string representation of the key
   */
  toString () {
    let values = [] // eslint-disable-line prefer-const
    for (const prop of Object.getOwnPropertyNames(this).sort()) {
      // A prop can be either a Feature object, or a one of the extras of a string type
      const value = (this[prop] instanceof _feature_js__WEBPACK_IMPORTED_MODULE_0__.default) ? this[prop].values.sort().join(',') : this[prop]
      values.push(value)
    }
    return values.join(' ')
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InflectionGroupingKey);


/***/ }),

/***/ "./language_model.js":
/*!***************************!*\
  !*** ./language_model.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _feature_type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feature_type.js */ "./feature_type.js");
/* harmony import */ var _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inflection_grouping_key.js */ "./inflection_grouping_key.js");
/* harmony import */ var _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inflection_group.js */ "./inflection_group.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");








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
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_0__.LANG_DIR_LTR }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_0__.LANG_UNIT_WORD }

  /**
   * @deprecated
   */
  get contextForward () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use static "contextForward" instead')
    return this.constructor.contextForward
  }

  /**
   * @deprecated
   */
  get contextBackward () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use static "contextBackward" instead')
    return this.constructor.contextBackward
  }

  /**
   * @deprecated
   */
  get direction () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use static "direction" instead')
    return this.constructor.direction
  }

  /**
   * @deprecated
   */
  get baseUnit () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use static "baseUnit" instead')
    return this.constructor.baseUnit
  }

  /**
   * @deprecated
   */
  get features () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use individual "getFeatureType" or static "features" instead')
    return this.constructor.features
  }

  /**
   * Returns a list of names of feature types that are defined in a language model.
   *
   * @returns {string[]} Names of features that are defined in a model.
   */
  static get featureNames () {
    return this.featureValues.keys()
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
   *
   * @returns {Map} Feature objects for all features defined within a language in a Map object. The key is
   * a feature type (a string), and the value is a Feature object.
   */
  static get typeFeatures () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('This getter must be defined in a descendant class')
  }

  static get features () {
    let features = {} // eslint-disable-line prefer-const
    for (const featureName of this.featureNames) {
      features[featureName] = this.getFeature(featureName)
    }
    return features
  }

  static get languageID () {
    return _constants_js__WEBPACK_IMPORTED_MODULE_0__.LANG_UNDEFINED
  }

  static get languageCode () {
    return _constants_js__WEBPACK_IMPORTED_MODULE_0__.STR_LANG_CODE_UNDEFINED
  }

  /**
   * Returns an array of language codes that represents the language.
   *
   * @returns {string[]} An array of language codes that matches the language.
   */
  static get languageCodes () {
    return []
  }

  static get codes () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Use static "languageCodes" instead')
    return this.languageCodes
  }

  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static version of "codes" instead')
    return this.constructor.languageCodes
  }

  /**
   * @deprecated
   * @returns {string}
   */
  toCode () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static "languageCode" instead')
    return this.constructor.languageCode
  }

  /**
   * @deprecated
   * @returns {string}
   */
  static toCode () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static "languageCode" instead')
    return this.languageCode
  }

  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_ADVERB,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_ADVERBIAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_ADJECTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_ARTICLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_CONJUNCTION,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_EXCLAMATION,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_INTERJECTION,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_NOUN,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_NUMERAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_PARTICLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_PREFIX,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_PREPOSITION,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_PRONOUN,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_SUFFIX,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_SUPINE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_VERB,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_VERB_PARTICIPLE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.gender,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.GEND_MASCULINE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.GEND_FEMININE,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.GEND_NEUTER
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.type,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.TYPE_REGULAR,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.TYPE_IRREGULAR
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.person,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.ORD_1ST,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.ORD_2ND,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.ORD_3RD
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.number,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.NUM_SINGULAR,
          _constants_js__WEBPACK_IMPORTED_MODULE_0__.NUM_PLURAL
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.age,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.area,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.source,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.frequency,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.geo,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.pronunciation,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.kind,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.comparison,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.morph,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.stemtype,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.derivtype,
        []
      ]
    ])
  }

  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use languageID directly')
    return this.languageID
  }

  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use languageID directly')
    return this.constructor.languageID
  }

  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType (name) {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use getFeature instead')
    const featureValues = this.featureValues
    if (featureValues.has(name)) {
      return new _feature_type_js__WEBPACK_IMPORTED_MODULE_3__.default(name, featureValues.get(name), this.languageID)
    } else {
      throw new Error(`Feature "${name}" is not defined`)
    }
  }

  /**
   * Returns a new instance of a feature with `featureType`. It uses a feature defined in a language model
   * as a master.
   *
   * @param {string} featureType - A name of a feature type.
   * @returns {Feature} - A newly created Feature object.
   */
  static getFeature (featureType) {
    const featureValues = this.featureValues // To cache the values
    if (featureValues.has(featureType)) {
      const allowedValues = featureValues.get(featureType)
      return new _feature_js__WEBPACK_IMPORTED_MODULE_2__.default(featureType, allowedValues, this.languageID, 1, allowedValues)
    } else {
      throw new Error(`Feature "${featureType}" is not defined`)
    }
  }

  _initializeFeatures () {
    const features = {}
    for (const featureName of this.constructor.featureValues.keys()) {
      features[featureName] = this.constructor.getFeature(featureName)
    }
    return features
  }

  /**
   * @deprecated
   */
  grammarFeatures () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static version of "grammarFeatures" instead')
    return this.constructor.grammarFeatures()
  }

  /**
   * Identify the morphological features which should be linked to a grammar.
   *
   * @returns {string[]} Array of Feature types
   */
  static grammarFeatures () {
    return []
  }

  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   * @returns {boolean}
   */
  static canInflect (node) {
    return false
  }

  /**
   * Check to see if the supplied language code is supported by this tool
   *
   * @param {string} code - The language code
   * @returns {boolean} - True if supported, false if not
   */
  static supportsLanguage (code) {
    return this.languageCodes.includes[code]
  }

  /**
   * Checks if the word provided has a trailing digit (e.g. αἴγυπτος1 in Greek).
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word has a trailing digit, false otherwise.
   */
  static hasTrailingDigit (word) {
    return /^.+\d$/.test(word)
  }

  /**
   * Morphological parsers and dictionary indexes may add a trailing digit to disambiguate homonyms.
   * These can be ignored for purposes of string comparison.
   *
   * @param {string} word - A word to normalize.
   * @returns {string} A normalized word.
   */
  static normalizeTrailingDigit (word) {
    return /^.+1$/.test(word) ? word.substring(0, word.length - 1) : word
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
  static needsNormalization (text) {
    return Boolean(text.localeCompare(this.normalizeText(text)))
  }

  /**
   * Checks if the word provided has any letters in an upper case.
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word at least one letter in upper case, false if all letters are lower case.
   */
  static hasUpperCase (word) {
    return Boolean(word.localeCompare(word.toLocaleLowerCase()))
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} word the source word
   * @returns {string} Normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   */
  static normalizeText (word) {
    return word
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
  static alternateWordEncodings ({
    word = null, preceding = null, following = null, encoding = null,
    preserveCase = false, includeOriginal = false
  } = {}) {
    return includeOriginal ? [word] : []
  }

  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords (wordA, wordB, normalize = true, options = {}) {
    if (normalize) {
      wordA = this.normalizeTrailingDigit(wordA)
      wordB = this.normalizeTrailingDigit(wordB)
      return this.normalizeText(wordA) === this.normalizeText(wordB)
    } else {
      return wordA === wordB
    }
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return '\\-\\.,;:!?\'"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r'
  }

  /**
   * @deprecated
   * @returns {string}
   */
  getPunctuation () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static version of "getPunctuation"')
    return this.constructor.getPunctuation()
  }

  toString () {
    return String(this.constructor.languageCode)
  }

  isEqual (model) {
    return _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.compareLanguages(this.languageID, model.languageID)
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
  static hasCode (languageCode) {
    if (this.isLanguageCode(languageCode)) {
      return this.languageCodes.includes(languageCode)
    } else {
      throw new Error(`Format of a "${languageCode}" is incorrect`)
    }
  }

  /**
   * Tests wither a provided language identificator is a language ID.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID (language) {
    return (typeof language === 'symbol')
  }

  /**
   * Tests wither a provided language identificator is a language code.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode (language) {
    return !LanguageModel.isLanguageID(language)
  }

  /**
   * @deprecated
   * @param node
   */
  canInflect (node) {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static version of "canInflect" instead')
    return this.constructor.canInflect(node)
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
  static groupInflectionsForDisplay (inflections) {
    let grouped = new Map() // eslint-disable-line prefer-const
    const aggregated = this.aggregateInflectionsForDisplay(inflections)

    // group inflections by part of speech
    for (const infl of aggregated) {
      const groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__.default(infl,
        [_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.dialect, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      )
      const groupingKeyStr = groupingKey.toString()
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl)
      } else {
        grouped.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__.default(groupingKey, [infl]))
      }
    }

    // iterate through each group key to group the inflections in that group
    for (const kv of grouped) {
      const inflgrp = new Map()
      for (const infl of kv[1].inflections) {
        let keyprop
        let isCaseInflectionSet = false
        if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.grmCase]) {
          // grouping on number if case is defined
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.number
          isCaseInflectionSet = true
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.tense]) {
          // grouping on tense if tense is defined but not case
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.tense
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_VERB) {
          // grouping on no case or tense but a verb
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.POFS_ADVERB) {
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.part
          // grouping on adverbs without case or tense
        } else {
          keyprop = 'misc'
          // grouping on adverbs without case or tense
          // everything else
        }
        const groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__.default(infl, [keyprop], { isCaseInflectionSet: isCaseInflectionSet })
        const groupingKeyStr = groupingKey.toString()
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl)
        } else {
          inflgrp.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__.default(groupingKey, [infl]))
        }
      }
      // inflgrp is now a map of groups of inflections grouped by
      //  inflections with number
      //  inflections without number but with tense
      //  inflections of verbs without tense
      //  inflections of adverbs
      //  everything else
      // iterate through each inflection group key to group the inflections in that group by tense and voice
      for (const kv of inflgrp) {
        const nextGroup = new Map()
        const sortOrder = new Map()
        for (const infl of kv[1].inflections) {
          const sortkey = infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.grmCase] ? Math.max(infl[_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.grmCase].items.map(f => f.sortOrder)) : 1
          const groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__.default(infl, [_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.voice])
          const groupingKeyStr = groupingKey.toString()
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl)
          } else {
            nextGroup.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__.default(groupingKey, [infl], sortkey))
            sortOrder.set(groupingKeyStr, sortkey)
          }
        }
        kv[1].inflections = []
        const sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            const orderA = sortOrder.get(a)
            const orderB = sortOrder.get(b)
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        )
        for (const groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey))
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (const kv of inflgrp) {
        const groups = kv[1]
        for (const group of groups.inflections) {
          let nextGroup = new Map() // eslint-disable-line prefer-const
          for (const infl of group.inflections) {
            // set key is case comp gend pers mood sort
            const groupingKey = new _inflection_grouping_key_js__WEBPACK_IMPORTED_MODULE_4__.default(infl,
              [_feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.comparison, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.gender, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.number, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.person,
                _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_2__.default.types.voice])
            const groupingKeyStr = groupingKey.toString()
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl)
            } else {
              nextGroup.set(groupingKeyStr, new _inflection_group_js__WEBPACK_IMPORTED_MODULE_5__.default(groupingKey, [infl]))
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
   *
   * @param {Inflection[]} inflections an array of inflections
   * @returns Inflection[] the aggregated inflections
   */
  static aggregateInflectionsForDisplay (inflections) {
    // default is just to do nothing
    return inflections
  }

  /**
   * @deprecated
   * @param inflections
   * @returns {*}
   */
  groupInflectionsForDisplay (inflections) {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_6__.default.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead')
    return this.constructor.groupInflectionsForDisplay(inflections)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageModel);


/***/ }),

/***/ "./language_model_factory.js":
/*!***********************************!*\
  !*** ./language_model_factory.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./latin_language_model.js */ "./latin_language_model.js");
/* harmony import */ var _greek_language_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./greek_language_model.js */ "./greek_language_model.js");
/* harmony import */ var _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./arabic_language_model.js */ "./arabic_language_model.js");
/* harmony import */ var _persian_language_model_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./persian_language_model.js */ "./persian_language_model.js");
/* harmony import */ var _geez_language_model_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./geez_language_model.js */ "./geez_language_model.js");
/* harmony import */ var _chinese_language_model_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chinese_language_model.js */ "./chinese_language_model.js");
/* harmony import */ var _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./syriac_language_model.js */ "./syriac_language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants.js */ "./constants.js");










const MODELS = new Map([
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_LA, _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_LAT, _latin_language_model_js__WEBPACK_IMPORTED_MODULE_1__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_GRC, _greek_language_model_js__WEBPACK_IMPORTED_MODULE_2__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_ARA, _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_AR, _arabic_language_model_js__WEBPACK_IMPORTED_MODULE_3__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_PER, _persian_language_model_js__WEBPACK_IMPORTED_MODULE_4__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_GEZ, _geez_language_model_js__WEBPACK_IMPORTED_MODULE_5__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_ZHO, _chinese_language_model_js__WEBPACK_IMPORTED_MODULE_6__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_SYR, _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_7__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_SYC, _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_7__.default],
  [_constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_SYR_SYRJ, _syriac_language_model_js__WEBPACK_IMPORTED_MODULE_7__.default]
])

class LanguageModelFactory {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage (language) {
    language = (typeof language === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(language) : language
    return MODELS.has(language)
  }

  static availableLanguages () {
    let avail = new Set() // eslint-disable-line prefer-const
    for (const model of MODELS.values()) {
      avail.add(model.languageCode)
    }
    return Array.from(avail)
  }

  /**
   * Returns a constructor of language model for a specific language ID.
   *
   * @param {symbol} languageID - A language ID of a desired language model.
   * @returns {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel (languageID) {
    const languageCode = LanguageModelFactory.getLanguageCodeFromId(languageID)
    return LanguageModelFactory.getLanguageModelFromCode(languageCode)
  }

  static getLanguageModelFromCode (languageCode) {
    if (MODELS.has(languageCode)) {
      return MODELS.get(languageCode)
    } else {
      // A default value
      return _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default
    }
  }

  static getLanguageForCode (code = null) {
    const Model = MODELS.get(code)
    if (Model) {
      return new Model()
    }
    // for now return a default Model
    // TODO may want to throw an error
    return new _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default()
  }

  /**
   * Converts an ISO 639-3 language code to a language ID
   *
   * @param {string} languageCode - An ISO 639-3 language code
   * @returns {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode (languageCode) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.hasCode(languageCode)) {
        return languageModel.languageID
      }
    }
    // Noting found, return a Symbol with an undefined value (to keep return value type the same)
    return _constants_js__WEBPACK_IMPORTED_MODULE_8__.LANG_UNDEFINED
  }

  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   *
   * @param {symbol} languageID - A language ID
   * @returns {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId (languageID) {
    for (const languageModel of MODELS.values()) {
      if (languageModel.languageID.toString() === languageID.toString()) {
        return languageModel.languageCode
      }
    }
    // Noting found, return a string with an undefined value (to keep return value type the same)
    return _constants_js__WEBPACK_IMPORTED_MODULE_8__.STR_LANG_CODE_UNDEFINED
  }

  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   *
   * @param {string | symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @returns {object} An object with the following properties:
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
   *
   * @param {string | symbol} languageA - Either a language ID (a symbol) or a language code (a string).
   * @param {string | symbol} languageB - Either a language ID (a symbol) or a language code (a string).
   * @returns {boolean} True if languages are the same, false otherwise.
   */
  static compareLanguages (languageA, languageB) {
    languageA = (typeof languageA === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageA) : languageA
    languageB = (typeof languageB === 'symbol') ? LanguageModelFactory.getLanguageCodeFromId(languageB) : languageB
    return languageA === languageB
  }

  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage (languageID) {
    return [_constants_js__WEBPACK_IMPORTED_MODULE_8__.LANG_GEEZ, _constants_js__WEBPACK_IMPORTED_MODULE_8__.LANG_SYRIAC, _constants_js__WEBPACK_IMPORTED_MODULE_8__.LANG_CHINESE].includes(languageID)
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LanguageModelFactory);


/***/ }),

/***/ "./languages/greek-chars.js":
/*!**********************************!*\
  !*** ./languages/greek-chars.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ GreekChars
/* harmony export */ });
class GreekChars {
  static get chars () {
    return [
      '\u0060',
      '\u00A8',
      '\u00AF',
      '\u00B4',
      '\u02BC',
      '\u02BD',
      '\u02D8',
      '\u0345',
      '\u0386',
      '\u0388',
      '\u0389',
      '\u038A',
      '\u038C',
      '\u038E',
      '\u038F',
      '\u0390',
      '\u0391',
      '\u0392',
      '\u0393',
      '\u0394',
      '\u0395',
      '\u0396',
      '\u0397',
      '\u0398',
      '\u0399',
      '\u039A',
      '\u039B',
      '\u039C',
      '\u039D',
      '\u039E',
      '\u039F',
      '\u03A0',
      '\u03A1',
      '\u03A3',
      '\u03A4',
      '\u03A5',
      '\u03A6',
      '\u03A7',
      '\u03A8',
      '\u03A9',
      '\u03AA',
      '\u03AB',
      '\u03AC',
      '\u03AD',
      '\u03AE',
      '\u03AF',
      '\u03B0',
      '\u03B1',
      '\u03B2',
      '\u03B3',
      '\u03B4',
      '\u03B5',
      '\u03B6',
      '\u03B7',
      '\u03B8',
      '\u03B9',
      '\u03BA',
      '\u03BB',
      '\u03BC',
      '\u03BD',
      '\u03BE',
      '\u03BF',
      '\u03C0',
      '\u03C1',
      '\u03C2',
      '\u03C3',
      '\u03C4',
      '\u03C5',
      '\u03C6',
      '\u03C7',
      '\u03C8',
      '\u03C9',
      '\u03CA',
      '\u03CB',
      '\u03CC',
      '\u03CD',
      '\u03CE',
      '\u03DC',
      '\u03DD',
      '\u1F00',
      '\u1F01',
      '\u1F02',
      '\u1F03',
      '\u1F04',
      '\u1F05',
      '\u1F06',
      '\u1F07',
      '\u1F08',
      '\u1F09',
      '\u1F0A',
      '\u1F0B',
      '\u1F0C',
      '\u1F0D',
      '\u1F0E',
      '\u1F0F',
      '\u1F10',
      '\u1F11',
      '\u1F12',
      '\u1F13',
      '\u1F14',
      '\u1F15',
      '\u1F18',
      '\u1F19',
      '\u1F1A',
      '\u1F1B',
      '\u1F1C',
      '\u1F1D',
      '\u1F20',
      '\u1F21',
      '\u1F22',
      '\u1F23',
      '\u1F24',
      '\u1F25',
      '\u1F26',
      '\u1F27',
      '\u1F28',
      '\u1F29',
      '\u1F2A',
      '\u1F2B',
      '\u1F2C',
      '\u1F2D',
      '\u1F2E',
      '\u1F2F',
      '\u1F30',
      '\u1F31',
      '\u1F32',
      '\u1F33',
      '\u1F34',
      '\u1F35',
      '\u1F36',
      '\u1F37',
      '\u1F38',
      '\u1F39',
      '\u1F3A',
      '\u1F3B',
      '\u1F3C',
      '\u1F3D',
      '\u1F3E',
      '\u1F3F',
      '\u1F40',
      '\u1F41',
      '\u1F42',
      '\u1F43',
      '\u1F44',
      '\u1F45',
      '\u1F48',
      '\u1F49',
      '\u1F4A',
      '\u1F4B',
      '\u1F4C',
      '\u1F4D',
      '\u1F50',
      '\u1F51',
      '\u1F52',
      '\u1F53',
      '\u1F54',
      '\u1F55',
      '\u1F56',
      '\u1F57',
      '\u1F59',
      '\u1F5B',
      '\u1F5D',
      '\u1F5F',
      '\u1F60',
      '\u1F61',
      '\u1F62',
      '\u1F63',
      '\u1F64',
      '\u1F65',
      '\u1F66',
      '\u1F67',
      '\u1F68',
      '\u1F69',
      '\u1F6A',
      '\u1F6B',
      '\u1F6C',
      '\u1F6D',
      '\u1F6E',
      '\u1F6F',
      '\u1F70',
      '\u1F71',
      '\u1F72',
      '\u1F73',
      '\u1F74',
      '\u1F75',
      '\u1F76',
      '\u1F77',
      '\u1F78',
      '\u1F79',
      '\u1F7A',
      '\u1F7B',
      '\u1F7C',
      '\u1F7D',
      '\u1F80',
      '\u1F81',
      '\u1F82',
      '\u1F83',
      '\u1F84',
      '\u1F85',
      '\u1F86',
      '\u1F87',
      '\u1F88',
      '\u1F89',
      '\u1F8A',
      '\u1F8B',
      '\u1F8C',
      '\u1F8D',
      '\u1F8E',
      '\u1F8F',
      '\u1F90',
      '\u1F91',
      '\u1F92',
      '\u1F93',
      '\u1F94',
      '\u1F95',
      '\u1F96',
      '\u1F97',
      '\u1F98',
      '\u1F99',
      '\u1F9A',
      '\u1F9B',
      '\u1F9C',
      '\u1F9D',
      '\u1F9E',
      '\u1F9F',
      '\u1FA0',
      '\u1FA1',
      '\u1FA2',
      '\u1FA3',
      '\u1FA4',
      '\u1FA5',
      '\u1FA6',
      '\u1FA7',
      '\u1FA8',
      '\u1FA9',
      '\u1FAA',
      '\u1FAB',
      '\u1FAC',
      '\u1FAD',
      '\u1FAE',
      '\u1FAF',
      '\u1FB0',
      '\u1FB1',
      '\u1FB2',
      '\u1FB3',
      '\u1FB4',
      '\u1FB6',
      '\u1FB7',
      '\u1FB8',
      '\u1FB9',
      '\u1FBA',
      '\u1FBB',
      '\u1FBC',
      '\u1FBD',
      '\u1FBE',
      '\u1FC0',
      '\u1FC1',
      '\u1FC2',
      '\u1FC3',
      '\u1FC4',
      '\u1FC6',
      '\u1FC7',
      '\u1FC8',
      '\u1FC9',
      '\u1FCA',
      '\u1FCB',
      '\u1FCC',
      '\u1FCD',
      '\u1FCE',
      '\u1FCF',
      '\u1FD0',
      '\u1FD1',
      '\u1FD2',
      '\u1FD3',
      '\u1FD6',
      '\u1FD7',
      '\u1FD8',
      '\u1FD9',
      '\u1FDA',
      '\u1FDB',
      '\u1FDD',
      '\u1FDE',
      '\u1FDF',
      '\u1FE0',
      '\u1FE1',
      '\u1FE2',
      '\u1FE3',
      '\u1FE4',
      '\u1FE5',
      '\u1FE6',
      '\u1FE7',
      '\u1FE8',
      '\u1FE9',
      '\u1FEA',
      '\u1FEB',
      '\u1FEC',
      '\u1FED',
      '\u1FEE',
      '\u1FF2',
      '\u1FF3',
      '\u1FF4',
      '\u1FF6',
      '\u1FF7',
      '\u1FF8',
      '\u1FF9',
      '\u1FFA',
      '\u1FFB',
      '\u1FFC'
    ]
  }
}


/***/ }),

/***/ "./latin_language_model.js":
/*!*********************************!*\
  !*** ./latin_language_model.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ LatinLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");





let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false

/**
 * @class  LatinLanguageModel is the lass for Latin specific behavior
 */
class LatinLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_LATIN }
  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_LAT }
  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_LA, _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_LAT] }
  static get contextForward () { return 0 }
  static get contextBackward () { return 0 }
  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_LTR }
  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_UNIT_WORD }

  static get featureValues () {
    /*
    This could be a static variable, but then it will create a circular reference:
    Feature -> LanguageModelFactory -> LanguageModel -> Feature
     */
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__.default.featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmClass,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_PERSONAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_REFLEXIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_POSSESSIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_DEMONSTRATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_RELATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CLASS_INTERROGATIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.number,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.NUM_SINGULAR,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.NUM_PLURAL
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_NOMINATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_GENITIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_DATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_ACCUSATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_ABLATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_LOCATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.CASE_VOCATIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.declension,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_1ST,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_2ND,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_3RD,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_4TH,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_5TH
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PRESENT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_IMPERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_FUTURE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_PLUPERFECT,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.TENSE_FUTURE_PERFECT
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.voice,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_ACTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.VOICE_PASSIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mood,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_INDICATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_SUBJUNCTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_IMPERATIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_PARTICIPLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_SUPINE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_GERUNDIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_PARTICIPLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.MOOD_INFINITIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.conjugation,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_1ST,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_2ND,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_3RD,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.ORD_4TH
        ]
      ]
    ])
  }

  static get typeFeatures () {
    if (!typeFeaturesInitialized) {
      this.initTypeFeatures()
    }
    return typeFeatures
  }

  static initTypeFeatures () {
    for (const featureName of this.featureNames) {
      typeFeatures.set(featureName, this.getFeature(featureName))
    }
    typeFeaturesInitialized = true
  }

  /**
   * @override
   */
  static grammarFeatures () {
    // TODO this ideally might be grammar specific
    return [_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.conjugation]
  }

  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return true
  }

  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or a text string
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  static normalizeText (text) {
    if (text) {
      text = text.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, 'A')
      text = text.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, 'E')
      text = text.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, 'I')
      text = text.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, 'O')
      text = text.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, 'U')
      text = text.replace(/[\u00c6\u01e2]/g, 'AE')
      text = text.replace(/[\u0152]/g, 'OE')
      text = text.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, 'a')
      text = text.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, 'e')
      text = text.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, 'i')
      text = text.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, 'o')
      text = text.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, 'u')
      text = text.replace(/[\u00e6\u01e3]/g, 'ae')
      text = text.replace(/[\u0153]/g, 'oe')
    }
    return text
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return ".,;:!?'\"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }

  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints (inflection) {
    // eslint-disable-next-line prefer-const
    let grammar = {
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    }
    if (inflection.hasOwnProperty(_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part)) {
      if ([_constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_VERB, _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_VERB_PARTICIPLE, _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_SUPINE, _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_GERUNDIVE].includes(inflection[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part].value)) {
        grammar.fullFormBased = true
        grammar.suffixBased = true
      } else if (inflection[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part].value === _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PRONOUN) {
        grammar.fullFormBased = true
      } else {
        grammar.suffixBased = true
      }
    } else {
      _logging_logger_js__WEBPACK_IMPORTED_MODULE_3__.default.getInstance().warn('Unable to set grammar: part of speech data is missing or is incorrect', inflection[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part])
    }

    return grammar
  }
}


/***/ }),

/***/ "./lemma.js":
/*!******************!*\
  !*** ./lemma.js ***!
  \******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _translation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./translation.js */ "./translation.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "../../../node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _logging_logger_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logging/logger.js */ "./logging/logger.js");






/**
 * Lemma, a canonical form of a word.
 */
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
  constructor (word, languageID, principalParts = [], features = {}) {
    if (!word) {
      throw new Error('Word should not be empty.')
    }

    if (!languageID) {
      throw new Error('Language should not be empty.')
    }

    // Compatibility code for something providing languageCode instead of languageID
    this.languageID = undefined
    this.languageCode = undefined
    ;({ languageID: this.languageID, languageCode: this.languageCode } = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageAttrs(languageID))

    this.word = word
    this.principalParts = principalParts
    this.features = {}

    this.ID = (0,uuid__WEBPACK_IMPORTED_MODULE_3__.v4)()
  }

  get language () {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_4__.default.getInstance().warn('Please use "languageID" instead of "language"')
    return this.languageCode
  }

  static readObject (jsonObject) {
    const language = jsonObject.language ? jsonObject.language : jsonObject.languageCode
    // eslint-disable-next-line prefer-const
    let resLemma = new Lemma(jsonObject.word, language, jsonObject.principalParts, jsonObject.pronunciation)

    if (jsonObject.features && jsonObject.features.length > 0) {
      jsonObject.features.forEach(featureSource => {
        resLemma.addFeature(_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.readObject(featureSource))
      })
    }

    if (jsonObject.translation) {
      resLemma.translation = _translation_js__WEBPACK_IMPORTED_MODULE_2__.default.readObject(jsonObject.translation, resLemma)
    }
    return resLemma
  }

  convertToJSONObject () {
    let resultFeatures = [] // eslint-disable-line prefer-const
    for (const feature of Object.values(this.features)) {
      resultFeatures.push(feature.convertToJSONObject())
    }
    // eslint-disable-next-line prefer-const
    let resultLemma = {
      word: this.word,
      language: this.languageCode,
      principalParts: this.principalParts,
      features: resultFeatures
    }

    if (this.translation) {
      resultLemma.translation = this.translation.convertToJSONObject()
    }
    return resultLemma
  }

  /**
   * @deprecated Please use `addFeature` instead.
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature (data) {
    _logging_logger_js__WEBPACK_IMPORTED_MODULE_4__.default.getInstance().warn('Please use "addFeature" instead')
    if (!data) {
      throw new Error('feature data cannot be empty.')
    }
    if (!Array.isArray(data)) {
      data = [data]
    }

    const type = data[0].type
    this.features[type] = []
    for (const element of data) {
      if (!(element instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
        throw new Error('feature data must be a Feature object.')
      }

      if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(element.languageID, this.languageID)) {
        throw new Error('Language "' + element.languageID.toString() + '" of a feature does not match a language "' +
                this.languageID.toString() + '" of a Lemma object.')
      }

      this.features[type].push(element)
    }
  }

  /**
   * Sets a grammatical feature of a lemma. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature (feature) {
    if (!feature) {
      throw new Error('feature data cannot be empty.')
    }

    if (!(feature instanceof _feature_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
      throw new Error('feature data must be a Feature object.')
    }

    if (!_language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.compareLanguages(feature.languageID, this.languageID)) {
      throw new Error('Language "' + feature.languageID.toString() + '" of a feature does not match a language "' +
        this.languageID.toString() + '" of a Lemma object.')
    }

    this.features[feature.type] = feature
  }

  /**
   * Sets multiple grammatical features of a lemma.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures (features) {
    if (!Array.isArray(features)) {
      throw new Error('Features must be in an array')
    }

    for (const feature of features) {
      this.addFeature(feature)
    }
  }

  /**
   * Sets a translation from python service.
   *
   * @param {Translation} translation - A translation object
   */
  addTranslation (translation) {
    if (!translation) {
      throw new Error('translation data cannot be empty.')
    }

    if (translation.constructor.name.indexOf('Translation') === -1) {
      throw new Error('translation data must be a Translation object.')
    }

    this.translation = translation
  }

  /**
   * Test to see if two lemmas are full homonyms.
   *
   * @param {Lemma} lemma - the lemma to compare.
   * @param {object} options - Additional comparison options.
   * @param {boolean} options.normalize - Whether to normalize words before comparison.
   * @returns {boolean} true or false.
   */
  isFullHomonym (lemma, { normalize = false } = {}) {
    // If parts of speech do not match this is not a full homonym
    if (!this.features[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part] ||
      !lemma.features[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part] ||
      !this.features[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part].isEqual(lemma.features[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part])) {
      return false
    }

    // Check if words are the same
    const areSameWords = normalize
      ? _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageModel(this.languageID).compareWords(this.word, lemma.word, true,
        { normalizeTrailingDigit: true })
      : this.word === lemma.word

    return areSameWords
  }

  /**
   * Disambiguate between this and the other lemma.
   *
   * @param {string} otherLemma - The other lemma for disambiguation.
   * @returns {string} - A disambiguated word.
   */
  disambiguate (otherLemma) {
    const langModel = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_0__.default.getLanguageModel(this.languageID)

    // Check if words are the same
    const areSameWords = langModel.compareWords(this.word, otherLemma.word, true, { normalizeTrailingDigit: true })
    if (!areSameWords) {
      throw new Error('Words that differ cannot be disambiguated')
    }

    const thisHasMixedCase = langModel.hasUpperCase(this.word)
    const otherHasMixedCase = langModel.hasUpperCase(otherLemma.word)
    /*
    If one of the words has both upper and lower case letters, it will be returned right away, without
    go through other normalizations.
     */
    if (otherHasMixedCase) {
      return otherLemma.word
    }
    if (thisHasMixedCase) {
      return this.word
    }
    /*
    If one of the word has characters that are not in the NFC Unicode Normalization Form,
    return that word, normalized.
     */
    const thisNeesNormalization = langModel.needsNormalization(this.word)
    const otherNeesNormalization = langModel.needsNormalization(otherLemma.word)
    if (otherNeesNormalization) {
      return langModel.normalizeText(otherLemma.word)
    }
    if (thisNeesNormalization) {
      return langModel.normalizeText(this.word)
    }
    /*
    If one of the words has a trailing digit, return a word with a trailing digit.
     */
    const thisHasTrailingDigit = langModel.hasTrailingDigit(this.word)
    const otherHasTrailingDigit = langModel.hasTrailingDigit(otherLemma.word)
    if (otherHasTrailingDigit) {
      return otherLemma.word
    }
    if (thisHasTrailingDigit) {
      return this.word
    }
    return this.word
  }

  /**
   * extracts lemma.word and all principal parts for flashcards export
   *
   */
  get wordPrincipalParts () {
    const allParts = [...this.principalParts]
    if (!this.principalParts.includes(this.word)) {
      allParts.push(this.word)
    }
    return allParts.join(', ')
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lemma);


/***/ }),

/***/ "./lexeme.js":
/*!*******************!*\
  !*** ./lexeme.js ***!
  \*******************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _lemma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lemma.js */ "./lemma.js");
/* harmony import */ var _inflection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inflection.js */ "./inflection.js");
/* harmony import */ var _definition_set_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definition-set.js */ "./definition-set.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language_model_factory.js */ "./language_model_factory.js");
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _resource_provider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resource_provider.js */ "./resource_provider.js");







/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and a DefinitionSet
 */
class Lexeme {
  /**
   * Initializes a Lexeme object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.
   */
  constructor (lemma, inflections, meaning = null) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    if (!(lemma instanceof _lemma_js__WEBPACK_IMPORTED_MODULE_0__.default)) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (const inflection of inflections) {
      if (!(inflection instanceof _inflection_js__WEBPACK_IMPORTED_MODULE_1__.default)) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    if (meaning !== null && !(meaning instanceof _definition_set_js__WEBPACK_IMPORTED_MODULE_2__.default)) {
      throw new Error('Meaning should be of DefinitionSet object type.')
    }

    this.lemma = lemma
    this.altLemmas = []
    this.inflections = []
    this.addInflections(inflections)
    this.meaning = meaning || new _definition_set_js__WEBPACK_IMPORTED_MODULE_2__.default(this.lemma.word, this.lemma.languageID)
    this.disambiguated = false
  }

  /**
   * add an inflection to the lexeme
   *
   * @param {Inflection} inflection
   */
  addInflection (inflection) {
    inflection.lemma = this.lemma
    inflection.lexeme = this
    this.inflections.push(inflection)
  }

  /**
   * Adds one or several inflections to a Lexeme object.
   *
   * @param {Inflection | Inflection[]} inflections - a single Inflection object or an array of Inflection
   *        objects to add to a lexeme.
   */
  addInflections (inflections) {
    if (!Array.isArray(inflections)) { inflections = [inflections] }
    inflections.forEach(i => this.addInflection(i))
  }

  /**
   * add an alternative lemma to the lexeme
   *
   * @param {Lemma} lemma
   */
  addAltLemma (lemma) {
    this.altLemmas.push(lemma)
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
  isPopulated () {
    return Object.entries(this.lemma.features).length > 0 ||
      !this.meaning.isEmpty() ||
      this.inflections.length > 0
  }

  /**
   * Checks if any short definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs () {
    return Boolean(this.meaning && this.meaning.hasShortDefs)
  }

  /**
   * Checks if any full definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs () {
    return Boolean(this.meaning && this.meaning.hasFullDefs)
  }

  /**
   * Checks whether a lemma of a current lexeme is a full homonym of the lemma of the other lexeme.
   *
   * @param {Lexeme} otherLexeme - a lexeme whose lemma will be compared with the lemma of a current lexeme.
   * @param {boolean} normalize - whether to use normalization for word comparison.
   * @returns {boolean} - true if two aforementioned lemmas are full homonyms, false otherwise.
   */
  isFullHomonym (otherLexeme, { normalize = false } = {}) {
    return this.lemma.isFullHomonym(otherLexeme.lemma, { normalize })
  }

  /**
   * Determines whether a lexeme can be disambiguated with the other disambiguator lexeme.
   *
   * @param {Lexeme} disambiguator - A possible disambiguator; a lexeme that is checked
   *         whether it can disambiguate a current lexeme.
   * @returns {boolean} - True if a current lexeme can be disambiguated with a disambiguator, false otherwise.
   */
  canBeDisambiguatedWith (disambiguator) {
    /*
    A Lexeme can be used as an disambiguator if:
    - its lemma is a full homonym of a disambiguator's lemma;
    - disambiguator, comparing to a lexeme, has some extra features worth adding such as:
      - some additional information in a word (e.g. a trailing digit) that lemma has not;
      - at least one inflection.
    */
    const hasExtraFeatures = disambiguator.inflections.length || _language_model_js__WEBPACK_IMPORTED_MODULE_4__.default.hasTrailingDigit(disambiguator.lemma.word)
    return this.isFullHomonym(disambiguator, { normalize: true }) && hasExtraFeatures
  }

  /**
   * disambiguate with another supplied Lexeme
   *
   * @param {Lexeme} lexeme the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use to disambiguate
   * @returns {Lexeme} a new lexeme, if disamibugation was successful disambiguated flag will be set on it
   */
  static disambiguate (lexeme, disambiguator) {
    let newLexeme = new Lexeme(lexeme.lemma, lexeme.inflections, lexeme.meaning) // eslint-disable-line prefer-const
    if (lexeme.canBeDisambiguatedWith(disambiguator)) {
      newLexeme.disambiguated = true
      newLexeme.lemma.word = lexeme.lemma.disambiguate(disambiguator.lemma)
      let keepInflections = [] // eslint-disable-line prefer-const
      // iterate through this lexemes inflections and keep only thoes that are disambiguatedBy by the supplied lexeme's inflection
      // we want to keep the original inflections rather than just replacing them
      // because the original inflections may have more information
      for (const inflection of newLexeme.inflections) {
        for (const disambiguatorInflection of disambiguator.inflections) {
          if (inflection.disambiguatedBy(disambiguatorInflection)) {
            keepInflections.push(inflection)
          }
        }
      }
      // Set greek inflections
      newLexeme.inflections = [] // Remove inflections before adding new ones
      newLexeme.addInflections(keepInflections)
      // if we couldn't match any existing inflections, then add the disambiguated one
      if (newLexeme.inflections.length === 0) {
        for (const infl of disambiguator.inflections) {
          newLexeme.addInflection(infl)
        }
      }
    }
    return newLexeme
  }

  getGroupedInflections () {
    const lm = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_3__.default.getLanguageModel(this.lemma.languageID)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    const lemma = _lemma_js__WEBPACK_IMPORTED_MODULE_0__.default.readObject(jsonObject.lemma)
    let inflections = [] // eslint-disable-line prefer-const
    for (const inflection of jsonObject.inflections) {
      inflections.push(_inflection_js__WEBPACK_IMPORTED_MODULE_1__.default.readObject(inflection))
    }

    const lexeme = new Lexeme(lemma, inflections)
    if (jsonObject.meaning) {
      lexeme.meaning = _definition_set_js__WEBPACK_IMPORTED_MODULE_2__.default.readObject(jsonObject.meaning)
    }

    if (jsonObject.provider) {
      const provider = _resource_provider_js__WEBPACK_IMPORTED_MODULE_5__.default.readObject(jsonObject.provider)
      return _resource_provider_js__WEBPACK_IMPORTED_MODULE_5__.default.getProxy(provider, lexeme)
    } else {
      return lexeme
    }
  }

  convertToJSONObject (addMeaning = false) {
    let resInflections = [] // eslint-disable-line prefer-const
    this.inflections.forEach(inflection => { resInflections.push(inflection.convertToJSONObject()) })

    const resLexeme = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: resInflections
    }

    if (addMeaning) {
      resLexeme.meaning = this.meaning.convertToJSONObject()
    }

    if (this.provider) {
      resLexeme.provider = this.provider.convertToJSONObject()
    }

    return resLexeme
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
  static getSortByTwoLemmaFeatures (primary, secondary) {
    return (a, b) => {
      if ((a.lemma.features[primary] && b.lemma.features[primary]) ||
          (!a.lemma.features[primary] && !b.lemma.features[[primary]])) {
        let primarySort
        if (a.lemma.features[primary] && b.lemma.features[primary]) {
          // if both lemmas have the primary sort key, then sort
          primarySort = a.lemma.features[primary].compareTo(b.lemma.features[primary])
        } else {
          // if neither lemma has the primary sort key, then the primary sort is equal
          primarySort = 0
        }
        if (primarySort !== 0) {
          return primarySort
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return a.lemma.features[secondary].compareTo(b.lemma.features[secondary])
        } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
          return -1
        } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return 1
        } else {
          // neither have the secondary sort key so they are equal
          return 0
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lexeme);


/***/ }),

/***/ "./logging/logger.js":
/*!***************************!*\
  !*** ./logging/logger.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Logger
/* harmony export */ });
let singleInstance

// TODO: We should maybe try to capture the file name and the line number, if possible

/**
 * A simple proxy for the console log functionality
 */
class Logger {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor ({ verbose = false, prepend = true, trace = false } = {}) {
    this._verboseMode = verbose
    this._prependMode = prepend
    this._traceMode = trace
  }

  /**
   * Returns a single instance of the Logger object. If one does not exist, it will be created
   * with the options specified. If the Logger instance is already created, but there are some
   * options provided, options of the existing Logger object will be changed to match the ones supplied.
   *
   * @param {object} options - Options of the Logger constructor {@see Logger#constructor}.
   * @returns {Logger} - An instance of existing or newly created Logger object.
   */
  static getInstance (options = {}) {
    if (!singleInstance) {
      singleInstance = new Logger(options)
    } else {
      // There is an instance of the Logger already created, but we might need to change its parameters
      // It will be done only if the caller provided meaningful values to options' props
      if (typeof options.verbose !== 'undefined') {
        console.info('Setting a verbose mode')
        singleInstance.setVerboseMode(options.verbose)
      }
      if (typeof options.prepend !== 'undefined') {
        console.info('Setting a prepend mode')
        singleInstance.setVerboseMode(options.prepend)
      }
      if (typeof options.trace !== 'undefined') {
        console.info('Setting a trace mode')
        singleInstance.setTraceMode(options.trace)
      }
    }
    return singleInstance
  }

  setVerboseMode (mode) {
    this._verboseMode = mode
    return this
  }

  setPrependMode (mode) {
    this._prependMode = mode
    return this
  }

  setTraceMode (mode) {
    this._traceMode = mode
    return this
  }

  verboseModeOn () {
    this.setVerboseMode(true)
    return this
  }

  verboseModeOff () {
    this.setVerboseMode(false)
    return this
  }

  prependModeOn () {
    this.setPrependMode(true)
    return this
  }

  prependModeOff () {
    this.setPrependMode(false)
    return this
  }

  traceModeOn () {
    this.setTraceMode(true)
    return this
  }

  traceModeOff () {
    this.setTraceMode(false)
    return this
  }

  error (...data) {
    if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
      data[0] = `Alpheios error: ${data[0]}`
    }
    console.error(...data)
    if (this._traceMode) {
      console.trace()
    }
  }

  warn (...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
        data[0] = `Alpheios warn: ${data[0]}`
      }
      console.warn(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }

  log (...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
        data[0] = `Alpheios log: ${data[0]}`
      }
      console.log(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }

  info (...data) {
    if (this._verboseMode) {
      if (this._prependMode && data && data.length > 0 && typeof data[0] === 'string') {
        data[0] = `Alpheios info: ${data[0]}`
      }
      console.info(...data)
      if (this._traceMode) {
        console.trace()
      }
    }
  }
}


/***/ }),

/***/ "./persian_language_model.js":
/*!***********************************!*\
  !*** ./persian_language_model.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ PersianLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./constants.js");



let typeFeatures = new Map() // eslint-disable-line prefer-const
let typeFeaturesInitialized = false

/**
 * @class  PersianLanguageModel is the lass for Persian specific behavior
 */
class PersianLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_PERSIAN }

  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_PER }

  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_PER, _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_FAS, _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_FA, _constants_js__WEBPACK_IMPORTED_MODULE_1__.STR_LANG_CODE_FA_IR] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_DIR_RTL }

  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_1__.LANG_UNIT_WORD }

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
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Get a list of valid puncutation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation () {
    return "\\-\\.,;:!?'\"(){}\\[\\]<>\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\u0387\u00B7\n\r\u200C\u200D"
  }
}


/***/ }),

/***/ "./ps-events/ps-event-data.js":
/*!************************************!*\
  !*** ./ps-events/ps-event-data.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ PsEventData
/* harmony export */ });
/**
 * A public information about published event that is returned to subscriber.
 * It can be used by subscribers that are listening for more than one event
 * to distinguish between different event types.
 * We could pass an PsEvent object to subscribers instead of PsEventData
 * but it's better not to expose some details of PsEvent implementation to the outside.
 * This will help to avoid creating dependencies on PsEvent internals within subscribers functions.
 * Thus an PsEventData object can be considered as a publicly exposed part of PsEvent data.
 * If needed, PsEventData can present PsEvent data to subscriber differently,
 * not in the way PsEvent stores it. This makes sense as subscriber might be interested in
 * a different angle of PsEvent information. PsEventData may add properties or methods
 * that do not needed within an PsEvent, but might be useful to subscribers.
 */
class PsEventData {
  /**
   * @param {PsEvent} event - An event that is being published.
   * @param {string} [caller=''] - The name of the function from where an event was published.
   */
  constructor (event, caller = '') {
    this.name = event.name
    this.publisher = event.publisher
    this.caller = caller
  }

  /**
   * Returns a description of an event data in a printable form. Example:
   *     LexicalQuery.finalize -> [Lexical Query Complete]
   * If caller function is not specified during a `pub()` call, description will be:
   *     LexicalQuery -> [Lexical Query Complete]
   *
   * @returns {string} - An event data description.
   */
  get description () {
    return this.caller ? `${this.publisher}.${this.caller} -> [${this.name}]` : `${this.publisher} -> [${this.name}]`
  }
}


/***/ }),

/***/ "./ps-events/ps-event.js":
/*!*******************************!*\
  !*** ./ps-events/ps-event.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ PsEvent
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../../node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_ps_events_ps_event_data_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/ps-events/ps-event-data.js */ "./ps-events/ps-event-data.js");



/**
 * An event in pub/sub (publish–subscribe) design pattern
 */
class PsEvent {
  /**
   * @param {string} name - A name of the event.
   * @param {Function} publisher - A constructor function of a publisher.
   *        PsEvent uses its `name` property to set its publisher name field.
   */
  constructor (name, publisher) {
    /**
     * A name of the event.
     *
     * @type {string}
     */
    this.name = name

    /**
     * A name of the publisher.
     *
     * @type {string}
     */
    this.publisher = publisher.name

    /**
     * A subscribers that listens to the published event.
     *
     * @type {Map<int, EventSubscriber>} - A map of subscriber's functions
     */
    this._subscribers = new Map()
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
  get subscribers () {
    return Array.from(this._subscribers.values())
  }

  /**
   * Subscribes a function to the published event.
   * When event is published, a @type {Event~subscriber} function is called.
   *
   * @param {EventSubscriber} subscriber - A subscriber function.
   * @returns {Function} - An function that, when called, will unsubscribe the current subscriber from an event.
   */
  sub (subscriber) {
    const subId = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
    this._subscribers.set(subId, subscriber)
    return () => {
      this._subscribers.delete(subId)
    }
  }

  /**
   * Publishes an event with data related to it. All subscribers will receive an
   * event notification along with event data.
   *
   * @param {object} [data={}] - An event-specific data associated with the event.
   * @param {string} [caller=''] - The name of the function that called `pub`.
   */
  pub (data = {}, caller = '') {
    this._subscribers.forEach(l => l(data, new _src_ps_events_ps_event_data_js__WEBPACK_IMPORTED_MODULE_1__.default(this, caller)))
  }

  /**
   * Unsubscribes all subscribers from an event.
   */
  unsubAll () {
    this._subscribers.clear()
  }
}


/***/ }),

/***/ "./resource_provider.js":
/*!******************************!*\
  !*** ./resource_provider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/**
 * An abstraction of an Alpheios resource provider
 */
class ResourceProvider {
  /**
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
   * @returns a string representation of the resource provider, in the default language
   */
  toString () {
    return this.rights.get('default')
  }

  /**
   * Produce a string representation of the resource provider, in the requested locale if available
   *
   * @param {string} languageCode
   * @returns a string representation of the resource provider, in the requested locale if available
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

  convertToJSONObject () {
    let rights = {} // eslint-disable-line prefer-const
    for (const [key, value] of this.rights.entries()) {
      rights[key] = value
    }

    const resultProvider = {
      uri: this.uri,
      rights
    }
    return resultProvider
  }

  static readObject (jsonObject) {
    const rights = new Map() // eslint-disable-line prefer-const
    if (jsonObject.rights) {
      Object.keys(jsonObject.rights).forEach(key => {
        rights.set(key, jsonObject.rights[key])
      })
    }

    return new ResourceProvider(jsonObject.uri, '', rights)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResourceProvider);


/***/ }),

/***/ "./syriac_language_model.js":
/*!**********************************!*\
  !*** ./syriac_language_model.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ SyriacLanguageModel
/* harmony export */ });
/* harmony import */ var _language_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./language_model.js */ "./language_model.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./feature.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./constants.js");
/* harmony import */ var _inflection_grouping_key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inflection_grouping_key */ "./inflection_grouping_key.js");
/* harmony import */ var _inflection_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inflection_group */ "./inflection_group.js");






const typeFeatures = new Map()
let typeFeaturesInitialized = false

/**
 * @class  GezLanguageModel is the lass for Ge'ez specific behavior
 */
class SyriacLanguageModel extends _language_model_js__WEBPACK_IMPORTED_MODULE_0__.default {
  static get languageID () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_SYRIAC }

  static get languageCode () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_SYR }

  static get languageCodes () { return [_constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_SYR, _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_SYC, _constants_js__WEBPACK_IMPORTED_MODULE_2__.STR_LANG_CODE_SYR_SYRJ] }

  static get contextForward () { return 0 }

  static get contextBackward () { return 0 }

  static get direction () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_DIR_RTL }

  static get baseUnit () { return _constants_js__WEBPACK_IMPORTED_MODULE_2__.LANG_UNIT_WORD }
  static get featureValues () {
    return new Map([
      ..._language_model_js__WEBPACK_IMPORTED_MODULE_0__.default.featureValues,
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part,
        [
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ADVERB,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ADVERBIAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ADJECTIVE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ARTICLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_CONJUNCTION,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_EXCLAMATION,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_INTERJECTION,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_NOUN,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_NUMERAL,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PARTICLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PREFIX,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PREPOSITION,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_PRONOUN,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_SUFFIX,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_SUPINE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_VERB,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_VERB_PARTICIPLE,
          _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_DENOMINATIVE
        ]
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.kaylo,
        []
      ],
      [
        _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.state,
        []
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
for the current node
   *
   * @param node
   */
  static canInflect (node) {
    return false
  }

  /**
   * Get a list of valid puncutation for this language
   * Taken from  the list at https://en.wikipedia.org/wiki/Syriac_(Unicode_block)
   *
   * @returns {string} a string containing valid puncutation symbols
   */
  static getPunctuation () {
    return "\u0700\u0701\u0702\u0703\u0704\u0705\u0706\u0707\u0708\u0709\u070A\u070B\u070C\u070D\u070F.,;:!?'\"(){}\\[\\]<>/\\\u00A0\u2010\u2011\u2012\u2013\u2014\u2015\u2018\u2019\u201C\u201D\n\r\u200C\u200D"
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
  static groupInflectionsForDisplay (inflections) {
    const grouped = new Map()
    const aggregated = this.aggregateInflectionsForDisplay(inflections)

    // group inflections by part of speech
    for (const infl of aggregated) {
      const groupingKey = new _inflection_grouping_key__WEBPACK_IMPORTED_MODULE_3__.default(infl,
        [_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.declension, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.kaylo, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.state, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.comparison],
        {
          prefix: infl.prefix,
          suffix: infl.suffix,
          stem: infl.stem
        }
      )
      const groupingKeyStr = groupingKey.toString()
      if (grouped.has(groupingKeyStr)) {
        grouped.get(groupingKeyStr).append(infl)
      } else {
        grouped.set(groupingKeyStr, new _inflection_group__WEBPACK_IMPORTED_MODULE_4__.default(groupingKey, [infl]))
      }
    }

    // iterate through each group key to group the inflections in that group
    for (const kv of grouped) {
      const inflgrp = new Map()
      for (const infl of kv[1].inflections) {
        let keyprop
        let isCaseInflectionSet = false
        if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase]) {
          // grouping on number if case is defined
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.number
          isCaseInflectionSet = true
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense]) {
          // grouping on tense if tense is defined but not case
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_VERB) {
          // grouping on no case or tense but a verb
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part
        } else if (infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part] === _constants_js__WEBPACK_IMPORTED_MODULE_2__.POFS_ADVERB) {
          keyprop = _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.part
          // grouping on adverbs without case or tense
        } else {
          keyprop = 'misc'
          // grouping on adverbs without case or tense
          // everything else
        }
        const groupingKey = new _inflection_grouping_key__WEBPACK_IMPORTED_MODULE_3__.default(infl, [keyprop], { isCaseInflectionSet: isCaseInflectionSet })
        const groupingKeyStr = groupingKey.toString()
        if (inflgrp.has(groupingKeyStr)) {
          inflgrp.get(groupingKeyStr).append(infl)
        } else {
          inflgrp.set(groupingKeyStr, new _inflection_group__WEBPACK_IMPORTED_MODULE_4__.default(groupingKey, [infl]))
        }
      }
      // inflgrp is now a map of groups of inflections grouped by
      //  inflections with number
      //  inflections without number but with tense
      //  inflections of verbs without tense
      //  inflections of adverbs
      //  everything else
      // iterate through each inflection group key to group the inflections in that group by tense and voice
      for (const kv of inflgrp) {
        const nextGroup = new Map()
        const sortOrder = new Map()
        for (const infl of kv[1].inflections) {
          const sortkey = infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase] ? Math.max(infl[_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase].items.map(f => f.sortOrder)) : 1
          const groupingKey = new _inflection_grouping_key__WEBPACK_IMPORTED_MODULE_3__.default(infl, [_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.voice])
          const groupingKeyStr = groupingKey.toString()
          if (nextGroup.has(groupingKeyStr)) {
            nextGroup.get(groupingKeyStr).append(infl)
          } else {
            nextGroup.set(groupingKeyStr, new _inflection_group__WEBPACK_IMPORTED_MODULE_4__.default(groupingKey, [infl], sortkey))
            sortOrder.set(groupingKeyStr, sortkey)
          }
        }
        kv[1].inflections = []
        const sortedKeys = Array.from(nextGroup.keys()).sort(
          (a, b) => {
            const orderA = sortOrder.get(a)
            const orderB = sortOrder.get(b)
            return orderA > orderB ? -1 : orderB > orderA ? 1 : 0
          }
        )
        for (const groupkey of sortedKeys) {
          kv[1].inflections.push(nextGroup.get(groupkey))
        }
      }

      // inflgrp is now a Map of groups of groups of inflections

      for (const kv of inflgrp) {
        const groups = kv[1]
        for (const group of groups.inflections) {
          const nextGroup = new Map()
          for (const infl of group.inflections) {
            // set key is case comp gend pers mood sort
            const groupingKey = new _inflection_grouping_key__WEBPACK_IMPORTED_MODULE_3__.default(infl,
              [_feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.grmCase, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.comparison, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.gender, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.number, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.person,
                _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.tense, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.mood, _feature_js__WEBPACK_IMPORTED_MODULE_1__.default.types.voice])
            const groupingKeyStr = groupingKey.toString()
            if (nextGroup.has(groupingKeyStr)) {
              nextGroup.get(groupingKeyStr).append(infl)
            } else {
              nextGroup.set(groupingKeyStr, new _inflection_group__WEBPACK_IMPORTED_MODULE_4__.default(groupingKey, [infl]))
            }
          }
          group.inflections = Array.from(nextGroup.values()) // now a group of inflection groups
        }
      }
      kv[1].inflections = Array.from(inflgrp.values())
    }
    return Array.from(grouped.values())
  }
}


/***/ }),

/***/ "./texts/author.js":
/*!*************************!*\
  !*** ./texts/author.js ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class Author {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {Author}
   */
  constructor (urn, titles, abbreviations) {
    this.urn = urn
    this.titles = titles
    this.abbreviations = abbreviations
  }

  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang () {
    return 'eng'
  }

  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title (lang) {
    if (this.titles[lang]) {
      return this.titles[lang]
    } else if (this.titles[Author.defaultLang]) {
      return this.titles[Author.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation (lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang]
    } else if (this.abbreviations[Author.defaultLang]) {
      return this.abbreviations[Author.defaultLang]
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0]
    }
    return null
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Author);


/***/ }),

/***/ "./texts/text-work.js":
/*!****************************!*\
  !*** ./texts/text-work.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
  constructor (author, urn, titles, abbreviations) {
    this.urn = urn
    this.titles = titles
    this.author = author
    this.abbreviations = abbreviations
  }

  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang () {
    return 'eng'
  }

  /**
   * This property is used to define prefix fr extract ID
   *
   * @returns {string}
   */
  static get defaultIDPrefix () {
    return 'phi'
  }

  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title (lang) {
    if (this.titles[lang]) {
      return this.titles[lang]
    } else if (this.titles[TextWork.defaultLang]) {
      return this.titles[TextWork.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation (lang) {
    if (this.abbreviations[lang]) {
      return this.abbreviations[lang]
    } else if (this.abbreviations[TextWork.defaultLang]) {
      return this.abbreviations[TextWork.defaultLang]
    } else if (Object.values(this.abbreviations).length > 0) {
      return Object.values(this.abbreviations)[0]
    }
    return null
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextWork);


/***/ }),

/***/ "./texts/word-usage-example.js":
/*!*************************************!*\
  !*** ./texts/word-usage-example.js ***!
  \*************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordUsageExample
/* harmony export */ });
/* harmony import */ var _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../w3c/text-quote-selector.js */ "./w3c/text-quote-selector.js");
/* harmony import */ var _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../language_model_factory.js */ "./language_model_factory.js");



class WordUsageExample extends _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor (language, targetWord, prefix, suffix, source, cit) {
    super(language, targetWord)
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.cit = cit
    this.author = null
    this.textWork = null
    this.passage = null
  }

  createContext () {
    return null // not implemented in the current child-class
  }

  /**
   * Creates a full text of example prefix + word + suffix
   *
   * @returns {string}
   */
  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }

  /**
   * Creates a full description - author + textWork + cit number
   *
   * @param {string} lang - language for getting text
   * @returns {string}
   */
  fullCit (lang) {
    if (!this.author && !this.textWork && !this.passage) {
      return this.cit
    }
    let finalFullCit = ''
    if (!lang) {
      finalFullCit = this.formattedAuthor + ' ' + this.formattedTextWork + ' ' + this.formattedPassage
    } else {
      finalFullCit = this.author ? this.author.title(lang) : '.'
      finalFullCit = finalFullCit + ' ' + (this.textWork ? this.textWork.title(lang) : '.')
      finalFullCit = finalFullCit + ' ' + this.formattedPassage
    }

    return finalFullCit.trim()
  }

  get formattedAuthor () {
    return this.author ? this.author.title() : ''
  }

  get formattedTextWork () {
    return this.textWork ? this.textWork.title() : ''
  }

  get formattedPassage () {
    return this.passage
  }

  authorForSort (lang) {
    if (this.author) {
      return this.author.title(lang).toUpperCase()
    } else {
      return this.fullCit(lang).toUpperCase()
    }
  }

  textWorkForSort (lang) {
    if (this.textWork) {
      return this.textWork.title(lang).toUpperCase()
    } else {
      return this.fullCit(lang).toUpperCase()
    }
  }

  get prefixForSort () {
    const model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageModelFromCode(this.languageCode)
    const clearPrefix = this.prefix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), ' ').toUpperCase().split(' ').filter(item => item.length > 0)
    return clearPrefix[clearPrefix.length - 1]
  }

  get suffixForSort () {
    const model = _language_model_factory_js__WEBPACK_IMPORTED_MODULE_1__.default.getLanguageModelFromCode(this.languageCode)
    return this.suffix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), '').toUpperCase()
  }
}


/***/ }),

/***/ "./translation.js":
/*!************************!*\
  !*** ./translation.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _resource_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resource_provider.js */ "./resource_provider.js");

/**
 * stores a scope of lemma translations from python service
 * Contains a primary Lemma object
 */
class Translation {
  /**
   * Initializes a Translation object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param languageCode
   * @param translations
   */
  constructor (lemma, languageCode, translations = []) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }
    this.lemmaWord = lemma.word
    this.languageCode = languageCode
    this.glosses = translations
  }

  static readTranslationFromJSONList (lemma, languageCode, translationsList, provider) {
    if (!translationsList || !Array.isArray(translationsList)) {
      throw new Error('Recieved not proper translation list', translationsList)
    }
    const curTranslations = translationsList.find(function (element) { return element.in === lemma.word })
    const translation = new Translation(lemma, languageCode, curTranslations.translations)
    if (provider) {
      return _resource_provider_js__WEBPACK_IMPORTED_MODULE_0__.default.getProxy(provider, translation)
    } else {
      return translation
    }
  }

  static loadTranslations (lemma, languageCode, translationsList, provider) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, languageCode, translationsList, provider))
  }

  convertToJSONObject () {
    // eslint-disable-next-line prefer-const
    let result = {
      languageCode: this.languageCode,
      translations: this.glosses
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }

  static readObject (jsonObject, lemma) {
    const translation = new Translation(lemma, jsonObject.languageCode, jsonObject.translations)
    if (jsonObject.provider) {
      const provider = _resource_provider_js__WEBPACK_IMPORTED_MODULE_0__.default.readObject(jsonObject.provider)
      return _resource_provider_js__WEBPACK_IMPORTED_MODULE_0__.default.getProxy(provider, translation)
    } else {
      return translation
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Translation);


/***/ }),

/***/ "./treebank_data_item.js":
/*!*******************************!*\
  !*** ./treebank_data_item.js ***!
  \*******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TreebankDataItem
/* harmony export */ });
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
  constructor (elem = null) {
    this.version = 0
    this.app = null
    this.sourceUrl = null
    this.wordIds = []
    this.sentenceId = null
    this.doc = null

    /*
      Treebank data on a page must have an element with the following obligatory data attributes:
        data-alpheios_tb_app - the only app currently supported is 'perseids-treebank-template'
        data-alpheios_tb_app_version - a version of a data format (the latest version is 1);
        data-alpheios_tb_app_url - a schema of a treebank template URL;
        data-alpheios_tb_ref - a reference that will be used to load data into the iframe initially
      Example:
        data-alpheios_tb_app="perseids-treebank-template"
        data-alpheios_tb_app_version="1"
        data-alpheios_tb_app_url="https://alpheios-project.github.io/treebank-template/embed/DOC/SENTENCE?w=WORD"
        data-alpheios_tb_ref="on-the-murder-of-eratosthenes-1-50#1-1"

      HTML elements that are surrounding words must have a `data-alpheios_tb_ref` ref attribute.
      It will tie a word to its position in a tree.
      */
    const tbSrcElem = elem
      ? elem.closest('[data-alpheios_tb_app]')
      : document.querySelector('[data-alpheios_tb_app]')
    if (tbSrcElem) {
      this.app = tbSrcElem.dataset.alpheios_tb_app
      if (this.app !== 'perseids-treebank-template') {
        throw new Error('Unsupported treebank application. This version of Alpheios only supports the perseids-treebank-template viewer app.')
      }
      if (tbSrcElem.dataset.alpheios_tb_app_version) {
        this.version = Number.parseInt(tbSrcElem.dataset.alpheios_tb_app_version, 10)
        if (!Number.isInteger(this.version)) { throw new Error(`Treebank version is incorrect in: ${tbSrcElem.outerHTML}`) }
      }

      if (!tbSrcElem.dataset.alpheios_tb_app_url) { throw new Error(`Missing treebank source URL in: ${tbSrcElem.outerHTML}`) }
      this.sourceUrl = tbSrcElem.dataset.alpheios_tb_app_url

      // We'll search for any element with the treebank tags if `elem` is not provided.
      const tbRefElem = elem ? elem.closest('[data-alpheios_tb_ref]') : document.querySelector('[data-alpheios_tb_ref]')
      // If TreebankDataItem is created for a page (i.e. `elem` is not provided) we need just a sentence ID, not word ID
      let wordElem = null
      let sentElem
      if (elem) {
        // TreebankDataItem is created for a text element
        wordElem = elem.closest('[data-alpheios_tb_word]')
        sentElem = wordElem ? wordElem.closest('[data-alpheios_tb_sent]') : elem.closest('[data-alpheios_tb_sent]')
      } else {
        // TreebankDataItem is created for a page, we don't need a word ID
        sentElem = document.querySelector('[data-alpheios_tb_sent]')
      }
      if (!tbRefElem && !(wordElem || sentElem)) {
        throw new Error('An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes')
      }

      /*
      If both `data-alpheios_tb_word` and `data-alpheios_tb_ref` data attributes are present, the former will
      have priority because it belongs to a newer tagging schema.
       */
      if (wordElem || sentElem) {
        /*
        Data is using `data-alpheios_tb_sent` and `data-alpheios_tb_word` attributes. There could be multiple
        word combinations specified there. In that case they will be separated by spaces:
        `data-alpheios_tb_word="3 4"`.
         */
        if (!sentElem) {
          throw new Error('Sentence ID is undefined: there is no parent element with data-alpheios_tb_sent attribute')
        }
        const docElem = wordElem ? wordElem.closest('[data-alpheios_tb_doc]') : sentElem.closest('[data-alpheios_tb_doc]')
        if (!docElem) {
          throw new Error('Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute')
        }
        if (wordElem) {
          this.wordIds = wordElem.dataset.alpheios_tb_word.split(' ')
        }
        this.sentenceId = sentElem.dataset.alpheios_tb_sent
        this.doc = docElem.dataset.alpheios_tb_doc
      } else {
        /*
        Data is using `data-alpheios_tb_ref` attributes. There could be multiple
        sentence and word combinations specified there. In that case they will be separated by spaces:
        `data-alpheios_tb_ref="phi0959.phi006.alpheios-text-lat1#2-13 phi0959.phi006.alpheios-text-lat1#2-14"`.
        We, however, do not support multiple references with different sentence ID. In that case the first
        reference will be used and others with sentence IDs not matching the first one will be ignored.
         */
        const reference = tbRefElem.dataset.alpheios_tb_ref
        let refs
        try {
          refs = reference.split(' ').map(ref => TreebankDataItem.parseReference(ref))
        } catch (err) {
          throw new Error(`${err.message} in: ${tbSrcElem.outerHTML}`)
        }
        refs = refs.filter(i => i.doc === refs[0].doc && i.sent === refs[0].sent)
        this.doc = refs[0].doc
        this.sentenceId = refs[0].sent
        this.wordIds = refs.map(i => i.word)
      }
    }

    if (!this.doc) { throw new Error('Document data is missing') }
    if (!this.sentenceId) { throw new Error('Sentence data is missing') }
  }

  static getTreebankData (elem = null) {
    try {
      return new TreebankDataItem(elem)
    } catch (err) {
      return null
    }
  }

  /**
   * Parse a reference in a "phi0959.phi006.alpheios-text-lat1#2-13" format to document, sentence ID, and word ID.
   *
   * @param {string} reference - A reference value to parse.
   * @returns {{doc: string, sent: string, word: string}} - An object containing parsed values.
   */
  static parseReference (reference) {
    const [doc, sentWordRef] = reference.split(/#/)
    if (!doc || !sentWordRef) { throw new Error('Invalid treebank reference') }
    const [sent, word] = sentWordRef.split(/-/)
    if (!sent) { throw new Error('Invalid treebank sent ID') }
    if (!word) { throw new Error('Invalid treebank word ID') }
    return { doc, sent, word }
  }

  setWordData (wordIds) {
    this.wordIds = wordIds
  }

  removeWordData () {
    this.wordIds = []
  }

  get fullUrl () {
    return this.sourceUrl.replace('DOC', this.doc).replace('SENTENCE', this.sentenceId)
  }

  get docUrl () {
    return this.sourceUrl.replace('DOC', this.doc)
  }

  get provider () {
    return new URL(this.fullUrl).origin
  }

  get hasWordData () {
    return this.wordIds.length > 0
  }

  get hasSentenceData () {
    return Boolean(this.sentenceId)
  }
}


/***/ }),

/***/ "./w3c/text-quote-selector.js":
/*!************************************!*\
  !*** ./w3c/text-quote-selector.js ***!
  \************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ TextQuoteSelector
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../../node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Implements a W3C Text Quote Selector (https://www.w3.org/TR/annotation-model/#h-text-quote-selector)
 */


class TextQuoteSelector {
  constructor (languageCode, normalizedText, prefix = null, suffix = null, source = null) {
    this.languageCode = languageCode
    this.normalizedText = normalizedText
    this.contextForward = 6
    this.contextBackward = 6
    this.text = this.normalizedText
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.ID = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
  }

  get contextHTML () {
    const templateWord = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`
    const checkPrefix = this.prefix.replace(this.text, templateWord)
    const checkSuffix = this.suffix.replace(this.text, templateWord)

    const fullText = `${checkPrefix} <span class="alpheios_worditem_incontext">${this.text}</span> ${checkSuffix}`
    return fullText
  }

  static readObject (jsonObject) {
    // eslint-disable-next-line prefer-const
    let tq = new TextQuoteSelector(jsonObject.languageCode, jsonObject.target.selector.exact)
    tq.prefix = jsonObject.target.selector.prefix
    tq.suffix = jsonObject.target.selector.suffix
    tq.text = jsonObject.targetWord
    tq.source = jsonObject.target.source
    return tq
  }

  isEqual (otherTqs) {
    let checkContextThis = `${this.prefix}${this.text}${this.suffix}`
    checkContextThis = checkContextThis.trim()

    let checkContextOther = `${otherTqs.prefix}${otherTqs.text}${otherTqs.suffix}`
    checkContextOther = checkContextOther.trim()

    return this.text === otherTqs.text &&
      this.source === otherTqs.source &&
      this.languageCode === otherTqs.languageCode &&
      checkContextThis === checkContextOther
  }
}


/***/ }),

/***/ "./word-item.js":
/*!**********************!*\
  !*** ./word-item.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordItem
/* harmony export */ });
/* harmony import */ var _homonym_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homonym.js */ "./homonym.js");
/* harmony import */ var _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./w3c/text-quote-selector.js */ "./w3c/text-quote-selector.js");



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
  constructor (data = { targetWord: null, languageCode: null, important: false, currentSession: true, context: [], homonym: {}, createdDT: null, updatedDT: null, frequency: null }) {
    // TODO handling of version
    this.version = 1
    this.targetWord = data.targetWord
    this.languageCode = data.languageCode
    if (!this.targetWord || !this.languageCode) {
      throw new Error('Unable to construct a worditem without at least a targetWord and a languageCode')
    }
    this.important = data.important === undefined ? false : data.important
    this.currentSession = data.currentSession === undefined ? true : data.currentSession
    this.context = data.context || []
    this.homonym = data.homonym || {}

    this.createdDT = data.createdDT
    this.updatedDT = data.updatedDT
    this.frequency = data.frequency
  }

  /**
   * Construct a WordItem from JSON
   *
   * @param jsonObject
   */
  static readObject (jsonObject) {
    let homonym = {}
    let context = []
    if (jsonObject.homonym) {
      homonym = WordItem.readHomonym(jsonObject)
    }
    if (jsonObject.context) {
      context = WordItem.readContext(jsonObject)
    }
    const worditem = new WordItem({
      targetWord: jsonObject.targetWord,
      languageCode: jsonObject.languageCode,
      important: jsonObject.important,
      currentSession: jsonObject.currentSession,
      context: context,
      homonym: homonym
    })
    return worditem
  }

  /**
   * Construct the homonym portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readHomonym (jsonObject) {
    return _homonym_js__WEBPACK_IMPORTED_MODULE_0__.default.readObject(jsonObject.homonym)
  }

  get hasTextQuoteSelectors () {
    return this.context.length > 0
  }

  /**
   * Construct the context portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readContext (jsonObject) {
    let tqs = [] // eslint-disable-line prefer-const
    for (const jsonObj of jsonObject) {
      const tq = _w3c_text_quote_selector_js__WEBPACK_IMPORTED_MODULE_1__.default.readObject(jsonObj)
      tqs.push(tq)
    }
    return tqs
  }

  /**
   * add one or more context selectors
   *
   * @param {TextQuoteSelector[]} selectors
   */
  addContext (selectors) {
    for (const s of selectors) {
      const found = this.context.filter(tqs => tqs.isEqual(s))
      if (found.length === 0) {
        this.context.push(s)
      }
    }
  }

  /**
   * getter for the lemmas in this WordItem
   */
  get lemmasList () {
    if (this.homonym && this.homonym.lexemes) {
      return this.homonym.lexemes.map(lexeme => lexeme.lemma.word).filter((value, index, self) => {
        return self.indexOf(value) === index
      }).join(', ')
    }
    return ''
  }

  /**
   * updates empty properties of this wordItem with those of the supplied worditem if also non-empty
   *
   * @param prevWordItem
   */
  merge (prevWordItem) {
    const checkProps = ['homonym', 'important', 'currentSession']
    for (const prop of checkProps) {
      if (this._emptyProp(prop) && !prevWordItem._emptyProp(prop)) {
        this[prop] = prevWordItem[prop]
      }
    }
  }

  /**
   * private method to detect an empty property
   *
   * @param propName
   */
  _emptyProp (propName) {
    return !this[propName] || (typeof this[propName] === 'object' && Object.keys(this[propName]).length === 0)
  }

  get formattedContext () {
    let res = {} // eslint-disable-line prefer-const
    for (const tq of this.context) {
      if (!res[tq.source]) {
        res[tq.source] = []
      }
      res[tq.source].push(tq)
    }
    return res
  }
}


/***/ }),

/***/ "./word-list.js":
/*!**********************!*\
  !*** ./word-list.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordList
/* harmony export */ });
/* harmony import */ var _word_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./word-item */ "./word-item.js");


class WordList {
  /**
   * @class
   * @param {string} languageCode the language code of the list
   * @param {WordItem[]} worditems an optional array of WordItems with which to initialize the list
   */
  constructor (languageCode, worditems = []) {
    if (!languageCode) {
      throw new Error('Unable to construct a wordlist without a languagecode')
    }
    this.languageCode = languageCode
    this.items = {}
    worditems.forEach(item => {
      this.addWordItem(item)
    })
  }

  get size () {
    return Object.keys(this.items).length
  }

  /**
   * get the items of the list
   */
  get values () {
    return Object.values(this.items)
  }

  /**
   * checks to see if the list is empty
   *
   * @returns {boolean}
   */
  get isEmpty () {
    return Object.values(this.items).length === 0
  }

  addWordItem (item) {
    if (item.languageCode !== this.languageCode) {
      throw new Error(`Language Code mismatch ${item.languageCode} !=== ${this.languageCode}`)
    }
    const existingItem = this.getWordItem(item.targetWord, false)
    if (existingItem) {
      item.merge(existingItem)
    }
    const key = this._makeItemKey(this.languageCode, item.targetWord)
    this.items[key] = item
  }

  /**
   * delete an individual word item from the list
   *
   * @param {string} targetWord the word to delete
   * @returns {WordItem} the deleted item
   */
  deleteWordItem (targetWord) {
    const key = this._makeItemKey(this.languageCode, targetWord)
    const toDelete = this.items[key]
    if (toDelete) {
      delete this.items[key]
    }
    return toDelete
  }

  /**
   * delete all items from a list
   */
  removeAllWordItems () {
    this.items = {}
  }

  /**
   * get an item from a list
   *
   * @param targetWord the word to get
   * @param {boolean} create true to create the item if it doesn't exist
   * @param eventWordItemUpdated
   * @returns {WordItem} the retrieved item
   */
  getWordItem (targetWord, create = true, eventWordItemUpdated = null) {
    const key = this._makeItemKey(this.languageCode, targetWord)
    if (create && !this.items[key]) {
      const wordItem = new _word_item__WEBPACK_IMPORTED_MODULE_0__.default({ targetWord: targetWord, languageCode: this.languageCode })
      if (eventWordItemUpdated) {
        eventWordItemUpdated.pub({ dataObj: wordItem, params: { segment: 'common' } })
      }
      this.items[key] = wordItem
    }
    return this.items[key]
  }

  /**
   * make a key for a word item
   *
   * @param {string} languageCode
   * @param {string} targetWord
   */
  _makeItemKey (languageCode, targetWord) {
    return `${languageCode}:${targetWord.toLowerCase()}`
  }
}


/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./driver.js");
/******/ })()
;
});
//# sourceMappingURL=alpheios-data-models.node.js.map