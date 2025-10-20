window["AlpheiosMessagingService"] =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tests/browser/messaging-service/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

/* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var i;
  var x;
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  var hex;

  for (i = 0; i < length32; i += 8) {
    x = input[i >> 5] >>> i % 32 & 0xff;
    hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;

  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }

  var length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var i = 0; i < N; i++) {
    M[i] = new Array(16);

    for (var j = 0; j < 16; j++) {
      M[i][j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var i = 0; i < N; i++) {
    var W = new Array(80);

    for (var t = 0; t < 16; t++) {
      W[t] = M[i][t];
    }

    for (var t = 16; t < 80; t++) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var t = 0; t < 80; t++) {
      var s = Math.floor(t / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = new Array(str.length);

  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  var generateUUID = function generateUUID(value, namespace, buf, offset) {
    var off = buf && offset || 0;
    if (typeof value == 'string') value = stringToBytes(value);
    if (typeof namespace == 'string') namespace = uuidToBytes(namespace);
    if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
    if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values'); // Per 4.3

    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off + idx] = bytes[idx];
      }
    }

    return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  }; // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name;
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");



function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./src/configurations/destinations.js":
/*!********************************************!*\
  !*** ./src/configurations/destinations.js ***!
  \********************************************/
/*! exports provided: CedictDestinationConfig, CedictDestinationDevConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CedictDestinationConfig", function() { return CedictDestinationConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CedictDestinationDevConfig", function() { return CedictDestinationDevConfig; });
/**
 * This is a configuration of a WindowsIframeDestination that can be used to connect to CEDICT client service.
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
const CedictDestinationConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net',
  targetIframeID: 'alpheios-lexis-cs'
}
/**
 * This is a development version of the above configuration
 *
 * @type {{targetIframeID: string, name: string, targetURL: string}}
 */
const CedictDestinationDevConfig = {
  name: 'cedict',
  targetURL: 'https://lexis-dev.alpheios.net/index-dev.html',
  targetIframeID: 'alpheios-lexis-cs'
}


/***/ }),

/***/ "./src/core/messaging-service.js":
/*!***************************************!*\
  !*** ./src/core/messaging-service.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MessagingService; });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/messages/response-message.js */ "./src/messages/response-message.js");
/* harmony import */ var _messServ_core_stored_request_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @messServ/core/stored-request.js */ "./src/core/stored-request.js");
/**
 * @module MessagingService
 */




/**
 * A map to keep "single" instances of MessagingService objects.
 *
 * @type {Map<string, MessagingService>}
 */
let services = new Map() // eslint-disable-line prefer-const

/** A messaging for sending and receiving messages to and from various destinations */
class MessagingService {
  /**
   * Creates an instance of a messaging service.
   *
   * @param {string} name - A name of a messaging service. Useful in identifying the service when
   *        several clients need to share the same instance of a service.
   * @param {Destination || Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   */
  constructor (name, destinations = []) {
    if (!name) throw new Error(MessagingService.errMsgs.NO_NAME)
    this.name = name
    /**
     * A map object where outgoing messages will be stored. The key is the message ID and the value is an object
     * that stores details about the message being sent.
     *
     * @type {Map<string, StoredRequest>}
     */
    this._messages = new Map()

    /**
     * A map object where outgoing messages will be stored. The key is a destination name and the value is
     * the Destination object.
     *
     * @type {Map<string, Destination>}
     */
    this._destinations = new Map()

    // If provided as a singular value convert destination into an array
    if (!Array.isArray(destinations)) { destinations = [destinations] }
    destinations.forEach(destination => this.registerDestination(destination))
  }

  /**
   * Check if service with a given name has already been created.
   *
   * @param {string} name - A name of a service.
   * @returns {boolean} Returns true if service has already been created or false otherwise.
   */
  static hasService (name) {
    return services.has(name)
  }

  /**
   * Returns an instance of a service or `undefined` if service does not exist.
   *
   * @param {string} name - A name of a service.
   * @returns {MessagingService|undefined} If service exists, returns an instance of a service.
   *          If it does not, returns `undefined`.
   */
  static getService (name) {
    return services.get(name)
  }

  /**
   * Creates an instance of a MessagingService and adds it to the map of instances.
   *
   * @param {string} name - A map of messaging service to create.
   * @param {Destination|Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   * @returns {MessagingService} An instance of a newly created messaging service.
   */
  static createService (name, destinations = []) {
    const service = new MessagingService(name, destinations)
    services.set(name, service)
    return service
  }

  /**
   * Removes an instance of a MessagingService form the map of instances.
   *
   * @param {string} name - A name of a service to remove.
   * @returns {boolean} True if a service in the map existed and has been removed,
   *          or false if the service does not exist.
   */
  static deleteService (name) {
    return services.delete(name)
  }

  /**
   * Registers a new destination by adding it to the destinations map and setting a response callback.
   *
   * @param {Destination} destination - A destination object to register.
   */
  registerDestination (destination) {
    if (this._destinations.has(destination.name)) {
      throw new Error('Destination already exists')
    }
    this._destinations.set(destination.name, destination)
    if (destination.ableToSend) { destination.registerResponseCallback(this.dispatchMessage.bind(this)) }
  }

  /**
   * Updates a destinations that is already registered.
   *
   * @param {Destination} destination - A destination object to register.
   */
  updateDestination (destination) {
    if (!this._destinations.has(destination.name)) {
      throw new Error('Cannot update a destination that does not exist')
    }
    // Call `deregister` on the destination in order to let it clean the things up
    this._destinations.get(destination.name).deregister()
    this._destinations.set(destination.name, destination)
    // Register a response callback only if destination supports a SEND mode
    if (destination.ableToSend) { destination.registerResponseCallback(this.dispatchMessage.bind(this)) }
  }

  /**
   * A function to handle incoming messages.
   *
   * @param {ResponseMessage} message - An incoming response message.
   */
  dispatchMessage (message) {
    if (!_messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].isKnownType(message.type)) {
      // Ignore messages that we do not support
      return
    }
    if (!_messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__["default"].isResponse(message)) {
      console.error('A message not following a response format will be ignored:', message)
      return
    }

    if (!this._messages.has(message.requestID)) {
      /*
      Silently ignore a message with request ID not registered in the map.
      It may be a message that is handled by the other messaging service.
      */
      return
    }
    const requestInfo = this._messages.get(message.requestID)
    window.clearTimeout(requestInfo.timeoutID) // Clear a timeout
    const responseCode = message.responseCode

    if (responseCode === _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_1__["default"].responseCodes.ERROR) {
      // The message returned an error. The message body may contain additional information about an error.
      requestInfo.reject(message)
    } else {
      // Request was processed without errors
      requestInfo.resolve(message)
    }
    this._messages.delete(message.requestID) // Remove request info from the map
  }

  /**
   * Registers an outgoing request within a request map. Returns a promise that will be fulfilled when
   * a response will be received or rejected when a timeout will expire.
   *
   * @param {RequestMessage} request - An outgoing request.
   * @param {number} timeout - A number of milliseconds we'll wait for response before rejecting a promise.
   * @returns {Promise} - A promise that will be resolved with the message response or rejected with an error info.
   */
  registerRequest (request, timeout = 10000) {
    if (this._messages.has(request.ID)) throw new Error(`Request with ${request.ID} ID is already registered`)
    let storedRequest = new _messServ_core_stored_request_js__WEBPACK_IMPORTED_MODULE_2__["default"](request) // eslint-disable-line prefer-const
    this._messages.set(request.ID, storedRequest)
    storedRequest.timeoutID = window.setTimeout((requestID) => {
      storedRequest.reject(new Error(`Timeout has been expired for a message with request ID ${request.ID}`))
      this._messages.delete(requestID) // Remove request record from the map
    }, timeout)
    return storedRequest.promise
  }

  /**
   * Sends a request message to a specific destination.
   *
   * @param {string} destName - A name of a destination where request will be sent to.
   * @param {RequestMessage} request - A request message to be sent.
   * @param {number} timeout - How many milliseconds to wait for a response.
   * @returns {Promise<ResponseMessage> | Promise<Error> | Promise<object>} - A promise either resolved
   *          with response message or rejected with the error info.
   */
  sendRequestTo (destName, request, timeout = 10000) {
    if (!destName) {
      throw new Error('Destination name is not provided')
    }

    if (!this._destinations.has(destName)) {
      throw new Error(`Unknown destination ${destName}`)
    }

    try {
      this._destinations.get(destName).sendRequest(request)
    } catch (err) {
      throw new Error(`Request to ${destName} failed: ${err.message}`)
    }
    // Do not register request before we're sure that the message is sent successfully.
    return this.registerRequest(request, timeout)
  }
}

MessagingService.errMsgs = {
  NO_NAME: 'MessagingService must be created with a name'
}


/***/ }),

/***/ "./src/core/stored-request.js":
/*!************************************!*\
  !*** ./src/core/stored-request.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StoredRequest; });
/**
 * @module StoredRequest
 */

/** Stores information about request being sent via the messaging service */
class StoredRequest {
  constructor () {
    /**
     * A function to resolve the request's promise.
     *
     * @type {Function}
     */
    this.resolve = null

    /**
     * A function to reject the request's promise.
     *
     * @type {Function}
     */
    this.reject = null

    // A promise that will be resolved or rejected when the response will arrive or the timeout will expire
    this.promise = new Promise(this.executor.bind(this))
  }

  executor (resolve, reject) {
    this.resolve = resolve
    this.reject = reject
  }
}


/***/ }),

/***/ "./src/destinations/destination.js":
/*!*****************************************!*\
  !*** ./src/destinations/destination.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Destination; });
/**
 * @module Destination
 */

/** Destination represents a place where messages are sent to and are received from (e.g. a windows) */
class Destination {
  /**
   * Creates an instance of a Destination object. Descendants may take configuration parameters through
   * a second argument that they can define.
   *
   * @param {object} [configuration={}] - A configuration object for a destination.
   * @param {string} configuration.name - A name of a particular destination.
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   *        Defaults to a SEND mode.
   */
  constructor ({ name, commModes = [Destination.commModes.SEND] } = {}) {
    if (!name) {
      throw new Error('Destination name is missing')
    }

    /**
     * A name of a destination. Used to refer to it within a messaging service.
     *
     * @type {string}
     * @public
     */
    this.name = name

    /**
     * An array of communication modes that are enabled for a destination.
     *
     * @type {string[]}
     * @public
     */
    this.commModes = commModes

    /**
     * A function that will be called when a response from destination is received.
     *
     * @type {Function}
     * @private
     */
    this._responseCallback = null
  }

  /**
   * Checks if a SEND communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the SEND mode.
   */
  get ableToSend () {
    return this.commModes.includes(Destination.commModes.SEND)
  }

  /**
   * Checks if a RECEIVE communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the RECEIVE mode.
   */
  get ableToReceive () {
    return this.commModes.includes(Destination.commModes.RECEIVE)
  }

  /**
   * This function will be called by the messaging service when a destination is deregistered or deleted.
   * It must do a cleanup necessary for a destination object. Its functionality should be defined within a subclass.
   */
  deregister () {
    throw new Error('Deregister method must be defined in a subclass')
  }
}

/*
A list of communication modes that a destination can support.
 */
Destination.commModes = {
  /*
  If a SEND mode is enabled, this destination can send messages to other destinations of the same type.
   */
  SEND: 'Send',

  /*
  A RECEIVE mode enables destination to receive messages from other destinations of the same type.
   */
  RECEIVE: 'Receive'
}


/***/ }),

/***/ "./src/destinations/window-iframe-destination.js":
/*!*******************************************************!*\
  !*** ./src/destinations/window-iframe-destination.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowIframeDestination; });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_destinations_destination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/destinations/destination.js */ "./src/destinations/destination.js");
/**
 * @module WindowIframeDestination
 */



/** WindowIframeDestination represents a content window within an iframe */
class WindowIframeDestination extends _messServ_destinations_destination_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {object} [configuration={}] - An object containing configuration parameters.
   * @param {string} configuration.name - A name of a destination (for addressing a destination in a messaging service).
   * @param {string} configuration.targetURL - A URL of a document within an iframe where messages will be sent.
   * @param {string} configuration.targetIframeID - An ID of an iframe element (without `#`).
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   * @param {Function} configuration.receiverCB - A function that will be called when destination is in the
   *        RECEIVE mode and the incoming request has arrived. This function will receive two parameters:
   *        the message object and the function that will need to be called in order to send a response back.
   */
  constructor ({ name, targetURL, targetIframeID, commModes, receiverCB } = {}) {
    super({ name, commModes })

    if (!targetURL) {
      throw new Error('Target URL is not provided')
    }

    if (!targetIframeID) {
      throw new Error('Target iframe ID is not provided')
    }

    /**
     * A URL of a document within an iframe where messages will be sent.
     *
     * @type {string}
     * @private
     */
    this._targetURL = targetURL

    /**
     * An ID of an iframe element (without `#`).
     *
     * @type {string}
     * @private
     */
    this._targetIframeID = targetIframeID

    if (this.ableToReceive) {
      // Destination is initialized in the receive mode
      if (!receiverCB) {
        throw new Error('A receiver callback must be provided for a destination in the RECEIVE communication mode')
      }
      this._registeredRequestHandler = this._requestHandler.bind(this, receiverCB)
      window.addEventListener('message', this._registeredRequestHandler, false)
    }

    // The following two props will keep track of request and response handlers registered for this destination.
    this._registeredRequestHandler = null
    this._registeredResponseHandler = null
  }

  /**
   * Registers a function to call when a response from destination is received.
   *
   * @param {Function} callbackFn - A function to be called when response is received.
   */
  registerResponseCallback (callbackFn) {
    this._registeredResponseHandler = this._responseHandler.bind(this)
    window.addEventListener('message', this._registeredResponseHandler, false)
    this._responseCallback = callbackFn
  }

  /**
   * A function that will be called to send a request from origin to destination.
   *
   * @param {RequestMessage} requestMessage - A request message object.
   */
  sendRequest (requestMessage) {
    const iframe = document.querySelector(`#${this._targetIframeID}`)
    if (!iframe) {
      throw new Error(`An #${this._targetIframeID} iframe does not exist in the document`)
    }
    const iframeWindow = iframe.contentWindow

    /*
    If we'll try to send a message to an iframe which content would not been loaded yet,
    `postMessage` will throw an error. It will be impossible, however, to catch this error here because `postMessage`
    executes asynchronously (please see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
    Once the cross-origin iframe content became available, it will throw a DOM security exception
    if we try to access its `location` prop. We can use that to check whether an iframe content is loaded
    before trying to send a message to it.
     */
    let contentNotLoaded = false
    try {
      contentNotLoaded = iframeWindow.location.href === 'about:blank'
    } catch (err) {
      if (err instanceof DOMException) {
        // Do nothing. This error usually means that a cross-origin iframe content has become available.
      } else {
        // Re-throw an error
        throw err
      }
    }

    if (contentNotLoaded) {
      // If we can access a target iframe location and its URL is blank it means an iframe content is not loaded yet.
      throw new Error(`Target document ${this._targetURL} is not loaded yet`)
    }
    try {
      iframeWindow.postMessage(requestMessage, this._targetURL)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Request that does not confirm to the structured clone algorithm cannot be sent, ' +
          'will try to convert it to a plain object and send again')
        requestMessage.body = WindowIframeDestination._toPostable(requestMessage.body)
        // Try to resend a message
        iframeWindow.postMessage(requestMessage, this._targetURL)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * A function that is used to send a response from destination to origin.
   *
   * @param {ResponseMessage} responseMessage - A response message object.
   */
  sendResponse (responseMessage) {
    try {
      window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'DataCloneError') {
        /*
        A message body does not confirm the structured clone algorithm and thus cannot be send via `postMessage`.
        See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        for more details.
        We'll try to convert it to a plain object.
         */
        console.warn('Response that does not confirm to the structured clone algorithm cannot be sent, ' +
                     'will try to convert it to a plain object and send again')
        responseMessage.body = WindowIframeDestination._toPostable(responseMessage.body)
        // Try to resend a message
        window.parent.postMessage(responseMessage, responseMessage.requestHeader.origin)
      } else {
        // Some other error occurred, rethrow it
        throw err
      }
    }
  }

  /**
   * An internal handler that is called when request arrives to its destination.
   *
   * @param {Function} callbackFn - A client's callback function that will be called and
   *                                passed a request (a `RequestMessage` object).
   * @param {Event} event - A browser's event object.
   * @private
   */
  _requestHandler (callbackFn, event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a request message object
    let request = event.data // eslint-disable-line prefer-const
    request.header.origin = event.origin
    callbackFn(request, this.sendResponse.bind(this))
  }

  /**
   * An internal handler that is called when response arrives from destination to origin.
   *
   * @param {Event} event - A browser's event object.
   * @private
   */
  _responseHandler (event) {
    // Check if an event contains a valid Alpheios message object.
    if (!WindowIframeDestination._isSupportedEvent(event)) { return }

    // `data` prop of an event contains a response message object
    const responseMessage = event.data
    if (this._responseCallback) {
      this._responseCallback(responseMessage)
    }
  }

  /**
   * Checks whether an event contains a well-formed Alpheios message object.
   *
   * @param {Event} event - An event that may contain a message object in a `data` field.
   * @returns {boolean} - True if an event contains a well-formed Alpheios message object, false otherwise.
   * @private
   */
  static _isSupportedEvent (event) {
    return Boolean(event && event.data && event.data.type && _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].isKnownType(event.data.type))
  }

  /**
   * This function will be called by the messaging service when destination is deregistered or deleted.
   * It must do a cleanup for a destination object.
   */
  deregister () {
    // Remove event listeners for registered request and response handlers
    if (this._registeredResponseHandler) {
      window.removeEventListener('message', this._registeredResponseHandler, false)
      this._registeredResponseHandler = null
    }
    if (!this._registeredRequestHandler) {
      window.removeEventListener('message', this._registeredRequestHandler, false)
      this._registeredRequestHandler = null
    }
  }

  /**
   * Converts an object to the one that is conforms the structured clone algorithm.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
   * for more details.
   *
   * @param {object} message - An object to convert.
   * @returns {object} - An object that conforms to the structured clone algorithm.
   * @private
   */
  static _toPostable (message) {
    let postable
    if (message instanceof Error) {
      /*
      Due to the bug in FF, Errors cannot be sent via postMessage yet.
      Please see https://bugzilla.mozilla.org/show_bug.cgi?id=1556604 for more details.
      This code can be removed once the bug is fixed.
       */
      postable = {
        name: message.name,
        message: message.message
      }
    } else {
      postable = JSON.parse(JSON.stringify(message))
    }
    return postable
  }
}


/***/ }),

/***/ "./src/messages/message.js":
/*!*********************************!*\
  !*** ./src/messages/message.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/**
 * @module Message
 */


/** A base class for all types of messages */
class Message {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    /**
     * A message's role (@see {@link Message.roles}). Will be defined in descendants.
     *
     * @type {string | undefined}
     */
    this.role = undefined

    /**
     * A type of the message. Used to distinguish one kind of message from the other (@see {@link Message.types}).
     *
     * @type {string | undefined}
     */
    this.type = Message.types.GENERIC

    /**
     * A unique identifier of the message.
     *
     * @type {string}
     */
    this.ID = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])()

    /**
     * An object with no methods representing a message body.
     *
     * @type {object}
     */
    this.body = body
  }

  static isKnownType (typeValue) {
    return Object.values(Message.types).includes(typeValue)
  }
}

/**
 * Specifies whether a message is request or response.
 */
Message.roles = {
  REQUEST: 'Request',
  RESPONSE: 'Response'
}

/**
 * Specifies a message type: what kind of message it is and what purpose it serves.
 * Message types are used to distinguish different types of messages from each other
 * and to distinguish Alpheios from non-Alpheios messages. All Alpheios messages
 * must start from an `ALPHEIOS_` prefix.
 */
Message.types = {
  GENERIC: 'ALPHEIOS_MESSAGE' // A generic message of general purpose
}


/***/ }),

/***/ "./src/messages/request-message.js":
/*!*****************************************!*\
  !*** ./src/messages/request-message.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequestMessage; });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/**
 * @module RequestMessage
 */


/** A request message */
class RequestMessage extends _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor (body = {}) {
    super(body)
    this.role = _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.REQUEST

    /**
     * A message header. Will contain routing information usually.
     *
     * @type {object}
     */
    this.header = {}
  }
}


/***/ }),

/***/ "./src/messages/response-message.js":
/*!******************************************!*\
  !*** ./src/messages/response-message.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponseMessage; });
/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony import */ var _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/messages/request-message.js */ "./src/messages/request-message.js");
/**
 * @module ResponseMessage
 */



/** A response message that is sent as an answer to the request message. */
class ResponseMessage extends _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {RequestMessage} request - A request that initiated this response. Used to copy routing information mostly.
   * @param {object} [body={}] - A body of the response, a plain JS object with no methods.
   * @param {string} responseCode - A code to indicate results of the request handling: Success, Failure, etc.
   * @param {object} options - Additional non-obligatory parameters:
   * @param {number} options.errorCode - An error code indicating why request has failed.
   */
  constructor (request, body = {}, responseCode = ResponseMessage.responseCodes.UNDEFINED, { errorCode } = {}) {
    super(body)
    if (!request) throw new Error('Request is not provided')
    if (!request.ID) throw new Error('Request has no ID')
    this.role = _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.RESPONSE
    this.requestHeader = request.header || {}
    this.requestID = request.ID // ID of the request to match request and response
    this.responseCode = responseCode

    /**
     * If request failed this prop will contain an error code indicating the reason of the failure.
     *
     * @type {number}
     */
    this.errorCode = 0

    if (responseCode === ResponseMessage.responseCodes.ERROR) {
      // Request has failed. An error code must be provided.
      if (!errorCode) {
        throw new Error('An error code must be provided for failed requests')
      }
      this.errorCode = errorCode
    }
  }

  /**
   * A builder for a response message with a SUCCESS response code.
   *
   * @param {RequestMessage} request - An original request.
   * @param {object} [body={}] - A body of response message.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Success (request, body = {}) {
    return new this(request, body, ResponseMessage.responseCodes.SUCCESS)
  }

  /**
   * A builder for a message with an ERROR response code. Error information will be sent within the message body.
   *
   * @param {RequestMessage} request - An original request.
   * @param {Error} error - An error object containing error information.
   * @param {number} errorCode - An error code indicating why a request failed.
   * @returns {ResponseMessage} - A newly created response message with the SUCCESS return code.
   * @class
   */
  static Error (request, error, errorCode) {
    return new this(request, error, ResponseMessage.responseCodes.ERROR, { errorCode })
  }

  /**
   * Checks if this message is a response (i.e. if it follows a response message format and conventions).
   *
   * @param {RequestMessage | ResponseMessage} message - A request or response message to be tested.
   * @returns {boolean} - True if the message is a response, false otherwise.
   */
  static isResponse (message) {
    return message.role &&
      message.role === _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_0__["default"].roles.RESPONSE &&
      message.requestHeader &&
      message.requestID
  }
}

/**
 * Specifies whether a request was processed successfully or not.
 */
ResponseMessage.responseCodes = {
  // Request was processed successfully.
  // In this case a message body may contain a response data object or be empty.
  SUCCESS: 'Success',

  // There is no information about what was the outcome of a request.
  UNDEFINED: 'Undefined',

  // Request failed. A message will contain information about an error.
  ERROR: 'Error'
}

/**
 * If request failed, the error code will be used to indicate the reason of a failure.
 */
ResponseMessage.errorCodes = {
  // A remote service has not been initialized yet
  SERVICE_UNINITIALIZED: 1,
  // An error occurred during initialization of a remote service
  INITIALIZATION_ERROR: 2,
  // Request of unknown type is received by a remote service
  UNKNOWN_REQUEST: 3,
  // An unspecified error has occurred inside a remote service
  INTERNAL_ERROR: 4
}


/***/ }),

/***/ "./tests/browser/messaging-service/index.js":
/*!**************************************************!*\
  !*** ./tests/browser/messaging-service/index.js ***!
  \**************************************************/
/*! exports provided: MessagingService, WindowIframeDestination, RequestMessage, ResponseMessage, CedictDestinationConfig, CedictDestinationDevConfig, Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messServ_core_messaging_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @messServ/core/messaging-service.js */ "./src/core/messaging-service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessagingService", function() { return _messServ_core_messaging_service_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _messServ_destinations_window_iframe_destination_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @messServ/destinations/window-iframe-destination.js */ "./src/destinations/window-iframe-destination.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WindowIframeDestination", function() { return _messServ_destinations_window_iframe_destination_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @messServ/messages/message.js */ "./src/messages/message.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return _messServ_messages_message_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @messServ/messages/request-message.js */ "./src/messages/request-message.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RequestMessage", function() { return _messServ_messages_request_message_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @messServ/messages/response-message.js */ "./src/messages/response-message.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponseMessage", function() { return _messServ_messages_response_message_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @messServ/configurations/destinations.js */ "./src/configurations/destinations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CedictDestinationConfig", function() { return _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_5__["CedictDestinationConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CedictDestinationDevConfig", function() { return _messServ_configurations_destinations_js__WEBPACK_IMPORTED_MODULE_5__["CedictDestinationDevConfig"]; });











/***/ })

/******/ });
//# sourceMappingURL=alpheios-messaging-test.js.map