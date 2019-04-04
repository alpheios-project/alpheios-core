(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("alpheios-data-models"));
	else if(typeof define === 'function' && define.amd)
		define(["alpheios-data-models"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("alpheios-data-models")) : factory(root["alpheios-data-models"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_alpheios_data_models__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "../node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "../node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/defaults.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/btoa.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/btoa.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "../node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "../node_modules/is-buffer/index.js":
/*!******************************************!*\
  !*** ../node_modules/is-buffer/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./controllers/user-data-manager.js":
/*!******************************************!*\
  !*** ./controllers/user-data-manager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserDataManager; });
/* harmony import */ var _storage_worditem_indexeddb_driver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/storage/worditem-indexeddb-driver.js */ "./storage/worditem-indexeddb-driver.js");
/* harmony import */ var _storage_worditem_remotedb_driver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/storage/worditem-remotedb-driver.js */ "./storage/worditem-remotedb-driver.js");
/* harmony import */ var _storage_indexed_db_adapter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/storage/indexed-db-adapter.js */ "./storage/indexed-db-adapter.js");
/* harmony import */ var _storage_remote_db_adapter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/storage/remote-db-adapter.js */ "./storage/remote-db-adapter.js");





class UserDataManager {

  /**
   * Creates with auth argument, subscribe to WordItem and WorList events, inits blocked property and request queue
   * @param {AuthModule} auth - auth object with userId and accessToken properties
   * @param {String} events - events object of the WordlistController, passed in UIController
   */
  constructor (auth, events) {
    this.auth = auth
    if (events) {
      events.WORDITEM_UPDATED.sub(this.update.bind(this))
      events.WORDITEM_DELETED.sub(this.delete.bind(this))
      events.WORDLIST_DELETED.sub(this.deleteMany.bind(this))
    }
    this.blocked = false
    this.requestsQueue = []
  }

  /**
   * Initializes IndexedDBAdapter with appropriate local dbDriver (WordItemIndexedDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {IndexedDBAdapter}
   */
  _localStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.LOCAL_DRIVER_CLASSES[dataType](this.auth.userId)
    return new _storage_indexed_db_adapter_js__WEBPACK_IMPORTED_MODULE_2__["default"](dbDriver)
  }

  /**
   * Initializes RemoteDBAdapter with appropriate remote dbDriver (WordItemRemoteDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {RemoteDBAdapter}
   */
  _remoteStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.REMOTE_DRIVER_CLASSES[dataType](this.auth)
    return new _storage_remote_db_adapter_js__WEBPACK_IMPORTED_MODULE_3__["default"](dbDriver)
  }

  /**
   * Checks availability of remote and local adapter according to params.source value
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {RemoteDBAdapter}
   */
  checkAdapters (localAdapter, remoteAdapter, params) {
    let localCheck = false
    let remoteCheck = false

    if (params.source === 'remote') {
      localCheck = true
      remoteCheck = remoteAdapter.available
    } else if (params.source === 'local') {
      localCheck = localAdapter.available
      remoteCheck = true
    } else {
      localCheck = localAdapter.available
      remoteCheck = remoteAdapter.available
      if (!localAdapter.available) {
        this.printErrorAdapterUnvailable(localAdapter)
      }
      if (!remoteAdapter.available) {
        this.printErrorAdapterUnvailable(remoteAdapter)
      }
    }

    return localCheck && remoteCheck
  }

  printErrorAdapterUnvailable(adapter) {
    console.error(`Adapter is not available - ${adapter.constructor.name}`)
  }

  /**
   * Promise-based method - updates object in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {WordItem} data.dataObj - object for saving to local/remote storage
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={}] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if updated successful, false if not
   */
  async update(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'update',
        data, params
      })
      return
    }
    try {
      params.source = params.source||'both'
      let finalConstrName = this.defineConstructorName(data.dataObj.constructor.name)

      let localAdapter = this._localStorageAdapter(finalConstrName)
      let remoteAdapter = this._remoteStorageAdapter(finalConstrName)

      let result = false
      let segment = data.params && data.params.segment ? data.params.segment : localAdapter.dbDriver.segments

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        this.blocked = true
        if (params.source === 'local') {
          result = await localAdapter.update(data.dataObj, data.params)
        } else if (params.source === 'remote') {
          result = await remoteAdapter.update(data.dataObj, data.params)
        } else {
          let currentRemoteItems = await remoteAdapter.checkAndUpdate(data.dataObj, segment)
          result = await localAdapter.checkAndUpdate(data.dataObj, segment, currentRemoteItems)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        this.blocked = false
        this.checkRequestQueue()
      }
      return result
    } catch (error) {
      console.error('Some errors happen on updating data in IndexedDB or RemoteDBAdapter', error)
    }
  }

  /**
   * Promise-based method - deletes single object in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {WordItem} data.dataObj - object for saving to local/remote storage
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={}] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if deleted successful, false if not
   */
  async delete(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'delete',
        data, params
      })
      return
    }
    try {
      this.blocked = true
      let finalConstrName = this.defineConstructorName(data.dataObj.constructor.name)

      let localAdapter = this._localStorageAdapter(finalConstrName)
      let remoteAdapter = this._remoteStorageAdapter(finalConstrName)

      let remoteResult = false
      let localResult = false

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        this.blocked = true

        remoteResult = true
        localResult = true

        if (params.source !== 'local') {
          remoteResult = await remoteAdapter.deleteOne(data.dataObj)
        }
        if (params.source !== 'remote') {
          localResult = await localAdapter.deleteOne(data.dataObj)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        this.blocked = false
        this.checkRequestQueue()
      }
      return remoteResult && localResult
    } catch (error) {
      console.error('Some errors happen on deleting item from IndexedDB or RemoteDBAdapter', error.message)
    }
  }

  /**
   * Promise-based method - deletes all objects from the wordlist by languageCode in local/remote storage
   * uses blocking workflow:
   * @param {Object} data
   * @param {String} data.languageCode - languageCode of Wordlist to be deleted
   * @param {WordItem} data.params - could have segment property to define exact segment for updating
   * @param {Object} [params={ source: both }] - additional parameters for updating, now it is only params.source = [local, remote, both]
   * @return {Boolean} true if deleted successful, false if not
   */
  async deleteMany(data, params = {}) {
    if (this.blocked) {
      this.requestsQueue.push({
        method: 'deleteMany',
        data, params
      })
      return
    }
    try {

      let remoteAdapter =  this._remoteStorageAdapter(data.dataType)
      let localAdapter = this._localStorageAdapter(data.dataType)

      let deletedLocal = false
      let deletedRemote = false

      if (this.checkAdapters(localAdapter, remoteAdapter, params)) {
        deletedLocal = true
        deletedRemote = true

        this.blocked = true
        if (params.source !== 'local') {
          deletedRemote = await remoteAdapter.deleteMany(data.params)
        }
        if (params.source !== 'remote') {
          deletedLocal = await localAdapter.deleteMany(data.params)
        }

        this.printErrors(remoteAdapter)
        this.printErrors(localAdapter)

        console.warn('Result of deleted many from IndexedDB', deletedLocal)

        this.blocked = false
        this.checkRequestQueue()
      }

      return deletedLocal && deletedRemote
    } catch (error) {
      console.error('Some errors happen on deleting data from IndexedDB or RemoteDBAdapter', error.message)
    }
  }

  /**
   * Promise-based method - queries all objects from the wordlist by languageCode , only for only one wordItem
   * or one wordItem from local/remote storage
   * @param {Object} data
   *                 data.languageCode - for quering all wordItems from wordList by languageCode
   *                 data.wordItem - for quering one wordItem
   *                 data.params - type specific query parameters
   * @param {Object} [params={ source: both, type: short, syncDelete: false }] - additional parameters for updating, now there are the following:
   *                  params.source = [local, remote, both]
   *                  params.type = [short, full] - short - short data for homonym, full - homonym with definitions data
   *                  params.syncDelete = [true, false] - if true (and params.source = both, and languageCode is defined in params),
   *                                      than localItems would be compared with remoteItems, items that are existed only in local would be removed
   * @return {WordItem[]}
   */
  async query (data, params = {}) {
    try {
      params.type = params.type||'short'
      params.source = params.source||'both'
      params.syncDelete = params.syncDelete||false

      let remoteAdapter =  this._remoteStorageAdapter(data.dataType)
      let localAdapter = this._localStorageAdapter(data.dataType)

      let finalItems = []
      let remoteItems

      if (params.source === 'local') {
        finalItems = await localAdapter.query(data.params)
      } else if (params.source === 'remote') {
        remoteItems = await remoteAdapter.query(data.params)
        for(let remoteItem of remoteItems) {
          finalItems.push(localAdapter.dbDriver.createFromRemoteData(remoteItem))
        }
      } else {
        remoteItems = await remoteAdapter.query(data.params)
        if (params.type === 'full') {
          for (let remoteItem of remoteItems) {
            await localAdapter.checkAndUpdate(remoteItem, data.params.segment, [remoteItem])
          }
          let localItems = await localAdapter.query(data.params)
          finalItems = localItems
        } else {
          remoteItems = await remoteAdapter.query(data.params)
          for(let remoteItem of remoteItems) {
            let wordItem = localAdapter.dbDriver.createFromRemoteData(remoteItem)
            finalItems.push(wordItem)
            localAdapter.checkAndUpdate(wordItem, null, [remoteItem])
          }
        }
        if (params.syncDelete && data.params.languageCode) {
          this.deleteAbsentInRemote(localAdapter, remoteItems, data.params.languageCode)
        }
      }

      this.printErrors(remoteAdapter)
      this.printErrors(localAdapter)
      return finalItems
    } catch (error) {
      console.error('Some errors happen on quiring data from IndexedDB or RemoteDBAdapter', error.message)
    }
  }

  async deleteAbsentInRemote (localAdapter, remoteItems, languageCode) {
    let localItems = await localAdapter.query({ languageCode })
    for (let localItem of localItems) {
      let checkID  = localAdapter.dbDriver.makeIDCompareWithRemote(localItem)
      if (!remoteItems.find(remoteItem => remoteItem.ID === checkID)) {
        console.warn('Need to delete from local', checkID)
        this.delete({ dataObj: localItem})
      }
    }
  }

  /**
   * Method prints errors from the errors property of the given adapter
   */
  printErrors (adapter) {
    if (adapter.errors && adapter.errors.length > 0) {
      adapter.errors.forEach(error => console.error(`Print error - ${error}`))
    }
  }

  /**
   * Method checks request queue, and if it is not empty executes the first in the queue
   */
  checkRequestQueue () {
    if (this.requestsQueue.length > 0) {
      let curRequest = this.requestsQueue.shift()
      this[curRequest.method](curRequest.data, curRequest.params)
    }
  }

  /**
   * Checks and formats Class name (if neccessary) to a normal state (after uglifying pugins)
   * @param {String} sourceConstrName recieved class name
   * @return {String} formatted class name
   */
  defineConstructorName (sourceConstrName) {
    let firstLetter = sourceConstrName.substr(0,1)
    let finalConstrName

    if (firstLetter == firstLetter.toUpperCase()) {
      finalConstrName = sourceConstrName
    } else {
      let removed = sourceConstrName.split('_').length-1
      let classNameStart = sourceConstrName.replace('_', '').toLowerCase().length/2
      finalConstrName = sourceConstrName.substr(-(classNameStart+removed-2))
    }
    return finalConstrName
  }
}

// Constants (could be done better, dynamically, etc.)
UserDataManager.LOCAL_DRIVER_CLASSES = {
  WordItem: _storage_worditem_indexeddb_driver_js__WEBPACK_IMPORTED_MODULE_0__["default"]
}
UserDataManager.REMOTE_DRIVER_CLASSES = {
  WordItem: _storage_worditem_remotedb_driver_js__WEBPACK_IMPORTED_MODULE_1__["default"]
}


/***/ }),

/***/ "./controllers/wordlist-controller.js":
/*!********************************************!*\
  !*** ./controllers/wordlist-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WordlistController; });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);


class WordlistController {
  /**
   * @constructor
   * @param {String[]} availableLangs language codes
   * @param {PSEvent[]} events events that the controller can subscribe to
   */
  constructor (availableLangs, events) {
    this.wordLists = {}
    this.availableLangs = availableLangs
    events.TEXT_QUOTE_SELECTOR_RECEIVED.sub(this.onTextQuoteSelectorReceived.bind(this))
    events.HOMONYM_READY.sub(this.onHomonymReady.bind(this))
    events.DEFS_READY.sub(this.onDefinitionsReady.bind(this))
    events.LEMMA_TRANSL_READY.sub(this.onLemmaTranslationsReady.bind(this))
  }

  /**
   * Asynchronously initialize the word lists managed by this controller
   * @param {UserDataManager} dataManager a user data manager to retrieve initial wordlist data from
   * Emits a WORDLIST_UPDATED event when the wordlists are available
   */
  async initLists (dataManager) {
    if (! dataManager) {
      // if we don't have a data manager we don't need to preserve any existing data, just clear it out
      this.wordLists = {} // clear out any existing lists
    } else {
      for (let languageCode of this.availableLangs) {
        let cachedList = this.wordLists[languageCode]
        delete this.wordLists[languageCode]
        let wordItems = await dataManager.query({dataType: 'WordItem', params: {languageCode: languageCode}}, { syncDelete: true })
        if (wordItems.length > 0) {
          this.wordLists[languageCode] = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordList"](languageCode,wordItems)
          WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
        }
        if (cachedList) {
          for (let cachedItem of cachedList.values) {
            try {
              // replay the word selection events for the cached list
              let cachedTqs = cachedItem.context.map(c => new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["TextQuoteSelector"](c.languageCode,c.normalizedText,c.prefix,c.suffix,c.source))
              for (let tq of cachedTqs) {
                this.onTextQuoteSelectorReceived(tq)
              }
              if (cachedItem.homonym) {
                this.onHomonymReady(cachedItem.homonym)
              }
            } catch (e) {
              console.error("Error replaying cached wordlist item",e)
            }
          }
        }
      }
    }
    return this.wordLists
  }

  getWordListItemCount() {
    let count = 0
    for (let languageCode of this.availableLangs) {
      if (this.wordLists[languageCode]) {
        count = count + this.wordLists[languageCode].size
      }
    }
    return count
  }

  /**
   * Get the wordlist for a specific language code
   * @param {String} languageCode the language for the list
   * @param {Boolean} create set to true to create the list of it doesn't exist
   * Emits a WORDLIST_CREATED event if a new list is created
   * @return {WordList} the wordlist
   */
  getWordList (languageCode, create=true) {
    if (create && ! this._wordListExist(languageCode)) {
      let wordList = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordList"](languageCode,[])
      this.wordLists[languageCode] = wordList
      WordlistController.evt.WORDLIST_CREATED.pub(wordList)
    }
    return this.wordLists[languageCode]
  }

  /**
   * Remove a wordlist for a specific language code and all if its items
   * @param {String} languageCode the language for the list
   * Emits a WORDLIST_DELETED event
   */
  removeWordList (languageCode) {
    delete this.wordLists[languageCode]
    WordlistController.evt.WORDLIST_DELETED.pub({dataType: 'WordItem', params: {languageCode: languageCode}})
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
   * Remove a WordItem from a WordList
   * @param {String} languageCode the language of the item to be removed
   * @param {String} targetWord the word to be removed
   * Emits a WORDITEM_DELETED event for for the item that was deleted
   */
  removeWordListItem (languageCode, targetWord) {
    let wordList = this.getWordList(languageCode, false)
    if (wordList) {
      let deleted = wordList.deleteWordItem(targetWord)
      if (deleted) {
        WordlistController.evt.WORDITEM_DELETED.pub({dataObj: deleted})
        if (wordList.isEmpty) {
          this.removeWordList(languageCode)
        }
      } else {
        console.error('Trying to delete an absent element')
      }
    }
  }

  /**
   * get an item from a word list
   * @param {String} languageCode the language code of the item
   * @param {String} targetWord the word of the item
   * @param {Boolean} create true to create the item if it doesn't exist
   * @return {WordItem} the retrieved or created WordItem
   */
  getWordListItem (languageCode, targetWord, create=false) {
    let wordList = this.getWordList(languageCode, create)
    let wordItem
    if (wordList) {
      wordItem = wordList.getWordItem(targetWord, create, WordlistController.evt.WORDITEM_UPDATED)
    }
    if (!wordItem) {
      console.error(`There are no items for these parameters ${languageCode} ${targetWord}`)
    }
    return wordItem
  }

  /**
   * Responds to a HOMONYM_READY event by creating or updating a wordlist item for a retrieved Homonym
   * @param {Homonym} data
   * Emits WORDITEM_UPDATED and WORDLIST_UPDATED events
   */
   onHomonymReady (data) {
    // when receiving this event, it's possible this is the first time we are seeing the word so
    // create the item in the word list if it doesn't exist
    let wordItem = this.getWordListItem(data.language, data.targetWord, true)
    wordItem.homonym = data
    WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'shortHomonym'}})
    // emit a wordlist updated event too in case the wordlist was updated
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
  * Responds to a DEFINITIONS_READY event by updating a wordlist item for retrieved Definitions
  * @param {Object} data {requestType: 'fullDefs',homonym: {Homonym}}
  * Emits a WORDITEM_UPDATED event
  */
  onDefinitionsReady (data) {
    let wordItem = this.getWordListItem(data.homonym.language,data.homonym.targetWord)
    if (wordItem) {
      wordItem.homonym = data.homonym
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      // TODO error handling
      console.error("Something went wrong: request to add definitions to non-existent item")
    }
  }

  /**
  * Responds to a LEMMA_TRANSLATIONS_READY event by updating a wordlist item for retrieved translations
  * (because lemma translations could come much later we need to resave homonym with translations data to database)
  * @param {Homonym} data
  * Emits a WORDITEM_UPDATED event
  */
  onLemmaTranslationsReady (data) {
    let wordItem = this.getWordListItem(data.language, data.targetWord)
    if (wordItem) {
      wordItem.homonym = data
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      console.error("Something went wrong: request to add translations to non-existent item")
    }
  }

  /**
  * Responds to a TextQuoteSelectorReceived  event by creating or updating a wordlist item for a retrieved Homonym
  * @param {TextQuoteSelector} data
  * Emits a WORDITEM_UPDATED and WORDLIST_UPDATED events
  */
  onTextQuoteSelectorReceived (data) {
    // when receiving this event, it's possible this is the first time we are seeing the word so
    // create the item in the word list if it doesn't exist
    let wordItem = this.getWordListItem(data.languageCode, data.normalizedText, true)
    if (wordItem) {
      wordItem.addContext([data])
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'context'}})
      // emit a wordlist updated event too in case the wordlist was updated
      WordlistController.evt.WORDLIST_UPDATED.pub(this.getWordList(wordItem.languageCode))
    } else {
      console.error("Unable to create or retrieve worditem")
    }

  }

  /**
  * Update a wordlist item's important flag
  * @param {String} languageCode  the language of the item
  * @param {String} targetWord the word of the item
  * @param {Boolean} important true or false
  * Emits a WORDITEM_UPDATED event
  */
  updateWordItemImportant (languageCode, targetWord, important) {
    let wordItem = this.getWordListItem(languageCode, targetWord,false)
    if (wordItem) {
      wordItem.important = important
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    } else {
      console.error("Something went wrong: request to set important flag on non-existent item")
    }
  }

  /**
  * Update the important flag of all the items in a WordList
  * @param {String} languageCode  the language of the list
  * @param {Boolean} important true or false
  * Emits a WORDITEM_UPDATED event for each updated item
  */
  updateAllImportant (languageCode, important) {
    let wordList = this.getWordList(languageCode, false)
    wordList.values.forEach(wordItem => {
      wordItem.important = important
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    })
  }

  /**
  * Select an item in a word list
  * @param {String} languageCode  the language of the item
  * @param {String} targetWord the word of the item
  * Emits a WORDITEM_SELECTED event for the selected item
  */
  async selectWordItem (languageCode, targetWord) {
    let wordItem = this.getWordListItem(languageCode, targetWord, false)
    WordlistController.evt.WORDITEM_SELECTED.pub(wordItem)
  }

  /**
   * Private method - check to see if we have a wordlist for a specific language code
   * @param {String} languageCode the language code
   * @return {Boolean} true if the wordlist exists otherwise false
   */
  _wordListExist (languageCode) {
    return Object.keys(this.wordLists).includes(languageCode)
  }

}

WordlistController.evt = {
  /**
   * Published when a WordList was updated.
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_UPDATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('Wordlist updated', WordlistController),

  /**
   * Published when a WordList was created
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_CREATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('Wordlist created', WordlistController),


  /**
   * Published when a WordList was deleted
   * Data: {
   *  dataType: constructor name for the contained word list items
   *  params: parameters to identify the items to be deleted
   * }
   */
  WORDLIST_DELETED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('Wordlist deleted', WordlistController),

  /**
   * Published when a WordItem was selected.
   * Data: {
   *  dataObj: the selected WordItem
   * }
   */
  WORDITEM_SELECTED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('WordItem selected', WordlistController),

  /**
   * Published when a WordItem was updated
   * Data: {
   *   dataObj: the selected WordItem
   *   params: additional update parameters
   * }
   */
  WORDITEM_UPDATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('WordItem updated', WordlistController),

  /**
   * Published when a WordItem was deleted
   * Data: {
   *   dataObj: the deleted WordItem
   * }
   */
  WORDITEM_DELETED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["PsEvent"]('WordItem deleted', WordlistController)

}


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: WordlistController, UserDataManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_wordlist_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/controllers/wordlist-controller.js */ "./controllers/wordlist-controller.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WordlistController", function() { return _controllers_wordlist_controller_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _controllers_user_data_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/controllers/user-data-manager.js */ "./controllers/user-data-manager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserDataManager", function() { return _controllers_user_data_manager_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });







/***/ }),

/***/ "./storage/indexed-db-adapter.js":
/*!***************************************!*\
  !*** ./storage/indexed-db-adapter.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndexedDBAdapter; });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);


/**
 * An interface to IndexedDB Storage
 */
class IndexedDBAdapter {

  /**
   * @param {String} domain the storage domain
   * @param {Object} dbDriver a driver for a specific data type
   */
  constructor (dbDriver) {
    this.available = this._initIndexedDBNamespaces()
    this.dbDriver = dbDriver
    this.errors = []
  }

  async checkAndUpdate (wordItem, segment, currentRemoteItems) {  
    if (segment === 'context' || !segment)  {
      if (currentRemoteItems.length > 0 && currentRemoteItems[0].context && Array.isArray(currentRemoteItems[0].context)) {
        wordItem.context = []
        for(let contextItem of currentRemoteItems[0].context) {
          wordItem.context.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordItem"].readContext([contextItem])[0])
        }
      }
    }

    if (!segment) {
      segment = this.dbDriver.segmentsSync
    }
    
    let currentLocalItems = await this.query({ wordItem })
    if (currentLocalItems.length === 0 && segment && segment !== 'common') {
      await this.update(wordItem, { segment: 'common' })  
    }

    let result = await this.update(wordItem, { segment })

    return result
  }

  /**
   * Create a new data item in the data base
   * @param {Object} data the data model item to be created
   * @return {Boolean} true if create succeeded false if not
   */
  async create(data) {
    try {
      let segments = this.dbDriver.segments
      let updated
      // iterate through the declared segmentation of the object
      // and store accordingly
      // TODO we need transaction handling here
      for (let segment of segments) {
        updated = await this.update(data, {segment: segment})
        if (!updated) {
          throw new Error(`Unknown problems with updating segment ${segment}`)
        }
      }
      return updated > 0
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Clear the datastore of many items of a given type
   * @param {Object} params data type specific parameters for identifying the items
   *                        to be deleted
   * @return {int} number of items deleted
   *
   */
  async deleteMany(params) {
    try {
      let deletedResult = {}
      for (let segment of this.dbDriver.segments) {
        let q = this.dbDriver.segmentDeleteManyQuery(segment,params)
        let deletedItems = await this._deleteFromStore(q)
        deletedResult[segment] = deletedItems
      }
      return deletedResult
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Remove a single item from the data store
   * @param {Object} data the deta model object to be deleted
   * @return {int} number of items deleted
   *
   */
  async deleteOne(data) {
    try {
      for (let segment of this.dbDriver.segments) {
        let q = this.dbDriver.segmentDeleteQuery(segment,data)
        await this._deleteFromStore(q)
      }
      return true
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Update a data item, creating it if it doesn't exist
   * @param {Object} data the data model object to update
   * @param {Object} params update params
   *                  { segment: name of segment needing update }
   * @return {Boolean} true if update succeeded false if not
   */
  async update (data, params) {
    try {
      let segments = params && params.segment ? (Array.isArray(params.segment) ? params.segment : [params.segment]) : []

      let result
      if (segments.length === 0)  {
        segments = this.dbDriver.segments
      }

      for (let segment of segments) {
        let query = this.dbDriver.updateSegmentQuery(segment, data)

        if (query.dataItems && query.dataItems.length > 0) {
          result = await this._set(query)
        } else {
          result = true
        }
      }
      return result
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return
    }
  }

  /**
   * Query for a set of data items
   * @param {Object} params datatype specific query parameters
   * @return Object[] array of data model items
   */
  async query(params) {
    try {
      let listItemsQuery = this.dbDriver.listItemsQuery(params)
      let listItemsQueryResult = await this._getFromStore(listItemsQuery)
      
      let items = []

      for (let itemQuery of listItemsQueryResult) {
        let resultObject = this.dbDriver.loadFirst(itemQuery)

        for (let segment of this.dbDriver.segmentsNotFirst) {
          let query = this.dbDriver.segmentSelectQuery(segment, resultObject)
          let result = await this._getFromStore(query)

          if (result.length > 0) {           
            this.dbDriver.loadSegment(segment, result, resultObject)
          }
        }
        items.push(resultObject)
      }

      return items
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Clear all the object stores
   * Used primarily for testing right now
   * TODO needs to be enhanced to support async removal of old database versions
   */
  async clear () {
    let idba = this

    let promiseDB = await new Promise((resolve, reject) => {
      let request = idba.indexedDB.open(idba.dbDriver.dbName, idba.dbDriver.dbVersion)
      request.onsuccess = (event) => {
        try {
          let db = event.target.result
          let objectStores = idba.dbDriver.objectStores
          let objectStoresRemaining = objectStores.length

          for (let store of objectStores) {
            // open a read/write db transaction, ready for clearing the data
            let transaction = db.transaction([store], 'readwrite')
            // create an object store on the transaction
            let objectStore = transaction.objectStore(store)
            // Make a request to clear all the data out of the object store
            let objectStoreRequest = objectStore.clear()
            objectStoreRequest.onsuccess = function(event) {
              console.warn(`store ${store} cleared`)
              objectStoresRemaining = objectStoresRemaining - 1
              if (objectStoresRemaining === 0) {
                resolve(true)
              }
            }
            objectStoreRequest.onerror = function(event) {
              idba.errors.push(event.target)
              reject(event.target)
            }
          }
        } catch (error) {
          idba.errors.push(error)
          reject(error)
        }
      }
      request.onerror = (event) => {
        idba.errors.push(event.target)
        reject(event.target)
      }
    })
    return promiseDB
  }



  /**
   * This method checks if IndexedDB is used in the current browser
   */
  _initIndexedDBNamespaces () {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!this.indexedDB) {
      console.warn("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return false
    }
    return true
  }


  /**
   * utility method ot open a database. Sets a callback which causes the database to be created if it doesn't exist
   */
  _openDatabaseRequest () {
    let request = this.indexedDB.open(this.dbDriver.dbName, this.dbDriver.dbVersion)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      const upgradeTransaction = event.target.transaction
      this._createObjectStores(db, upgradeTransaction)
    }
    return request
  }

  /**
   * Iniitalize the object store(s) for for an IndexedDb adapter
   */
  _createObjectStores (db, upgradeTransaction) {
    try {
      for (let objectStoreData of this.dbDriver.allObjectStoreData) {
        let objectStore

        if (!db.objectStoreNames.contains(objectStoreData.name)) {
          objectStore = db.createObjectStore(objectStoreData.name, { keyPath: objectStoreData.structure.keyPath })
        } else {
          objectStore = upgradeTransaction.objectStore(objectStoreData.name)
        }

        objectStoreData.structure.indexes.forEach(index => {
          if (!objectStore.indexNames.contains(index.indexName)) {
            objectStore.createIndex(index.indexName, index.keyPath, { unique: index.unique })
          }
        })
      }
    
    } catch (error) {
      this.errors.push(error)
    }
  }

  /**
   * Internal method to open a database and update one or items in a specific store
   * @param {Object} data data item to be updated  in the format
   *                      { objectStoreName: name of the object store,
   *                        dataItems: array of data items to be updated }
   * @return {Promise} resolves to true on success
   */
  async _set (data) {
    let idba = this

    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = async (event) => {
        const db = event.target.result
        let rv = await this._putItem(db, data)
        resolve(rv)
      }
      request.onerror = (event) => {
        idba.errors.push(event.target)
        reject()
      }
    })
    return promiseOpenDB
  }

  /**
   * Internal method to put an item into a database
   * @param {} db the database handle
   * @param {Object} data data item to be updated  in the format
   *                      { objectStoreName: name of the object store,
   *                        dataItems: array of data items to be updated }
   * @return {Promise} resolves to true on success
   */
  async _putItem (db, data) {
    let idba = this

    let promisePut = await new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([data.objectStoreName], 'readwrite')
        transaction.onerror = (event) => {
          idba.errors.push(event.target)
          reject()
        }
        const objectStore = transaction.objectStore(data.objectStoreName)
        let objectsDone = data.dataItems.length
        for (let dataItem of data.dataItems) {
          const requestPut = objectStore.put(dataItem)
          requestPut.onsuccess = () => {
            objectsDone = objectsDone - 1
            if (objectsDone === 0) {
              resolve(true)
            }
          }
          requestPut.onerror = () => {
            idba.errors.push(event.target)
            reject()
          }
        }
        if (objectsDone === 0) {
          resolve(true)
        }
      } catch (error) {
        if (error) {
          idba.errors.push(error)
          return
        }
      }
    })
    return promisePut
  }

  /**
   * Internal method to get an item from a database store
   * @param {Object} data data item to be retrieved  in the format
   *                      { objectStoreName: name of the object store,
   *                        condition: query parameters }
   * @return {Promise} resolves to the retrieved items
   */
  async _getFromStore (data) {
    let idba = this
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = (event) => {
        try {
          const db = event.target.result
          const transaction = db.transaction([data.objectStoreName])
          const objectStore = transaction.objectStore(data.objectStoreName)

          const index = objectStore.index(data.condition.indexName)
          const keyRange = this.IDBKeyRange[data.condition.type](data.condition.value)
          
          const requestOpenCursor = index.getAll(keyRange, 0)
          requestOpenCursor.onsuccess = (event) => {
            resolve(event.target.result)
          }

          requestOpenCursor.onerror = (event) => {
            idba.errors.push(event.target)
            reject()
          }
        } catch (error) {
          idba.errors.push(error)
          reject()
        }
      }
      request.onerror = (event) => {
        reject(event.target)
      }
    })
    return promiseOpenDB
    
  }

  /**
   * Internal method to delete an item from  a specific data store
   * @param {Object} data data item to be retrieved  in the format
   *                      { objectStoreName: name of the object store,
   *                        condition: query parameters }
   * @return {Promise} resolves to the number of deleted items
   */
  async _deleteFromStore (data) {
    let idba = this
    let promiseOpenDB = await new Promise((resolve, reject) => {
      let request = this._openDatabaseRequest()
      request.onsuccess = (event) => {
        try {
          const db = event.target.result
          const transaction = db.transaction([data.objectStoreName], 'readwrite')
          const objectStore = transaction.objectStore(data.objectStoreName)

          const index = objectStore.index(data.condition.indexName)
          const keyRange = this.IDBKeyRange[data.condition.type](data.condition.value)

          let requestOpenCursor = index.openCursor(keyRange)
          let deletedItems = 0
          requestOpenCursor.onsuccess = (event) => {
            const cursor = event.target.result
            if (cursor) {
              const requestDelete = cursor.delete()
              requestDelete.onerror = (event) => {
                idba.errors.push(event.target)
                reject()
              }
              requestDelete.onsuccess = (event) => {
                deletedItems = deletedItems + 1
              }
              cursor.continue()
            } else {
              resolve(deletedItems)
            }
          }
        } catch (error) {
          idba.errors.push(error)
          reject()
        }
      }

      request.onerror = (event) => {
        idba.errors.push(event.target)
        reject()
      }
    })

    return promiseOpenDB
  }

}

/***/ }),

/***/ "./storage/indexeddbDriver/indexed-db-load-process.js":
/*!************************************************************!*\
  !*** ./storage/indexeddbDriver/indexed-db-load-process.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndexedDBLoadProcess; });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);


class IndexedDBLoadProcess {
  /**
   * Creates WordItem with properties from json and sets currentSession = false
   * @param {Object} jsonObj - data from common segment
   * @return {WordItem} 
   */
  static loadBaseObject(jsonObj) {
    // make sure when we create from the database
    // that the currentSession flag is set to false
    jsonObj.currentSession = false
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordItem"](jsonObj)
  }

  /**
   * Creates TextQuoteSelectors from jsonObjs and loads them to context property of wordItem
   * @param {Object[]} jsonObjs - data from context segment
   * @param {WordItem} wordItem
   * @return {WordItem} 
   */
  static loadContext (jsonObjs, wordItem) {
    if (! Array.isArray(jsonObjs)) {
      jsonObjs = [jsonObjs]  
    }
    wordItem.context = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordItem"].readContext(jsonObjs)
    return wordItem
  }

  /**
   * Creates Homonym from jsonObj and loads it to homonym property of wordItem
   *   if jsonObjs[0] has homonym property with full data from local DB, then it uses readHomonym method
   *   if jsonObjs[0] has homonym property with short data from remote DB, 
   *        it creates empty homonym with data for lexemes from lemmasList
   *   if jsonObjs[0] has empty homonym property it creates empty homonym with languageCode and targetWord only
   * @param {Object[]} jsonObjs - data from homonym segment
   * @param {WordItem} wordItem
   * @return {WordItem} 
   */
  static loadHomonym (jsonObjs, wordItem) {
    let jsonHomonym = jsonObjs[0].homonym

    if (jsonHomonym.lexemes && Array.isArray(jsonHomonym.lexemes) && jsonHomonym.lexemes.length >0) {
      wordItem.homonym = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["WordItem"].readHomonym(jsonObjs[0])
    } else {
      let languageID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageIdFromCode(jsonObjs[0].languageCode)
      let lexemes = []

      if (jsonHomonym.lemmasList) {
        let lexemesForms = jsonHomonym.lemmasList.split(', ')
        for (let lexForm of lexemesForms) {
          lexemes.push(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"](new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lemma"](lexForm, languageID), []))
        }
      } else {
        lexemes = [new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"](new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lemma"](jsonObjs[0].targetWord, languageID), [])]
      }
      wordItem.homonym = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"](lexemes, jsonHomonym.targetWord)
    }
    return wordItem
  }
}


/***/ }),

/***/ "./storage/indexeddbDriver/indexed-db-object-stores-structure.js":
/*!***********************************************************************!*\
  !*** ./storage/indexeddbDriver/indexed-db-object-stores-structure.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndexedDBObjectStoresStructure; });
class IndexedDBObjectStoresStructure {
  /**
   * Defines basic template for creating objectStore
   * @return {Object} - objectStore structure
   */
  static _objectStoreTemplate () {
    return {
      keyPath: 'ID',
      indexes: [
        { indexName: 'ID', keyPath: 'ID', unique: true},
        { indexName: 'listID', keyPath: 'listID', unique: false},
        { indexName: 'userID', keyPath: 'userID', unique: false},
        { indexName: 'languageCode', keyPath: 'languageCode', unique: false},
        { indexName: 'targetWord', keyPath: 'targetWord', unique: false}
      ]
    }
  }

  /**
   * Defines objectStore structure for common segment
   * @return {Object} - objectStore structure
   */
  static get WordListsCommon () {
    return IndexedDBObjectStoresStructure._objectStoreTemplate()
  }

  /**
   * Defines objectStore structure for context segment
   * adds additional index
   * @return {Object} - objectStore structure
   */
  static get WordListsContext () {
    let structure = IndexedDBObjectStoresStructure._objectStoreTemplate()
    structure.indexes.push(
      { indexName: 'wordItemID', keyPath: 'wordItemID', unique: false}
    )
    return structure
  }

  /**
   * Defines objectStore structure for short homonym segment
   * @return {Object} - objectStore structure
   */
  static get WordListsHomonym () {
    return IndexedDBObjectStoresStructure._objectStoreTemplate()
  }

  /**
   * Defines objectStore structure for full homonym segment
   * @return {Object} - objectStore structure
   */
  static get WordListsFullHomonym () {
    return IndexedDBObjectStoresStructure._objectStoreTemplate()
  }

}

/***/ }),

/***/ "./storage/remote-db-adapter.js":
/*!**************************************!*\
  !*** ./storage/remote-db-adapter.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteDBAdapter; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


class RemoteDBAdapter {
  /**
   *
   * @param {WordItemRemoteDbDriver} dbDriver
   */
  constructor (dbDriver) {
    this.dbDriver = dbDriver
    this.available = this._checkRemoteDBAvailability()
    this.errors = []
  }

  /**
   * Checks if defined obligatory params - userID and headers for request
   * @return {Boolean} - true - adapter could be used, false - couldn't
   */
  _checkRemoteDBAvailability () {
    return Boolean(this.dbDriver.accessToken) && Boolean(this.dbDriver.userId) && Boolean(this.dbDriver.requestsParams.headers)
  }

  async checkAndUpdate (wordItem, segments) {
    let segmentsForUpdate = this.dbDriver.segmentsForUpdate
    let segmentsForMerge = this.dbDriver.segmentsForMerge
    if (! Array.isArray(segments)) {
      segments = [segments]
    }
    let update = false
    let merge = false
    for (let segment of segments) {
      if (segmentsForUpdate.includes(segment)) {
        update = true
      }
      if (segmentsForMerge.includes(segment)) {
        merge = true
      }
    }
    if (update) {
      let updateWordItem
      // if we are updating a segment which requires merging, then we
      // first query the remote item so that we have the values that need to be merged
      let currentItems = []
      if (merge) {
        currentItems = await this.query({ wordItem })
      }
      if (! currentItems || currentItems.length === 0) {
        // if there isn't anything that needs to be merged then
        // we just replace the old wiht the new
        updateWordItem = wordItem
      } else {
        // otherwise we need to create a merged item for update
        updateWordItem = this.dbDriver.mergeLocalRemote(currentItems[0], wordItem)
      }
      await this.update(updateWordItem)
      return [updateWordItem]
    } else {
      return []
    }
  }

  /**
   * Creates an item in remote storage
   * @param {WordItem} data
   * @return {Boolean} - successful/failed result
   */
  async create(data) {
    try {
      let url = this.dbDriver.storageMap.post.url(data)
      let content = this.dbDriver.storageMap.post.serialize(data)

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, content, this.dbDriver.requestsParams)

      let updated = this.dbDriver.storageMap.post.checkResult(result)

      return updated
    } catch (error) {
      console.error(error)
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Updates an item in remote storage
   * we could receive here data in two formats - wordItem (if updated from selected wordItem) and object (if updated from already serialized when merged)
   * so if it is already an object - we skip serialization
   * @param {WordItem/Object} data
   * @return {Boolean} - successful/failed result
   */
  async update(data) {
    try {
      let url = this.dbDriver.storageMap.put.url(data)
      let skipSerialize = !data.constructor.name.match(/WordItem/)

      let content
      if (skipSerialize) {
        content = data
      } else {
        content = this.dbDriver.storageMap.put.serialize(data)
      }

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(url, content, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.put.checkResult(result)
      return updated
    } catch (error) {
      console.error(error)
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Deletes a single item in remote storage
   * @param {WordItem} data
   * @return {Boolean} - successful/failed result
   */
  async deleteOne(data) {
    try {
      let url = this.dbDriver.storageMap.deleteOne.url(data)
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.deleteOne.checkResult(result)
      return updated
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Deletes all items by languageCode in remote storage
   * @param {Object} data
   * @param {String} data.languageCode
   * @return {Boolean} - successful/failed result
   */
  async deleteMany(data) {
    try {
      let url = this.dbDriver.storageMap.deleteMany.url(data)

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.deleteMany.checkResult(result)
      return updated
    } catch (error) {
      if (error) {
        this.errors.push(error)
      }
      return false
    }
  }

  /**
   * Queries data for one wordItem or wordList by languageID
   * @param {Object} data
   * @param {WordItem} data.wordItem
   * @param {String} data.languageCode
   * @return {WordItem[]}
   */
  async query(data) {
    try {
      let url = this.dbDriver.storageMap.get.url(data)
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, this.dbDriver.requestsParams)
      let final = this.dbDriver.storageMap.get.checkResult(result)
      return final
    } catch (error) {
      let errorFinal = this.dbDriver.storageMap.get.checkErrorResult(error)
      if (!errorFinal && error) {
        if (error) {
          this.errors.push(error)
        }
      }
      return errorFinal
    }
  }
}


/***/ }),

/***/ "./storage/worditem-indexeddb-driver.js":
/*!**********************************************!*\
  !*** ./storage/worditem-indexeddb-driver.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WordItemIndexedDbDriver; });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/storage/indexeddbDriver/indexed-db-object-stores-structure */ "./storage/indexeddbDriver/indexed-db-object-stores-structure.js");
/* harmony import */ var _storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/storage/indexeddbDriver/indexed-db-load-process */ "./storage/indexeddbDriver/indexed-db-load-process.js");





class WordItemIndexedDbDriver {

  /**
   * @constructor
   * @param {String} userId user id for the database
   */
  constructor(userId) {
    this.userId = userId
    this.storageMap = {
      _loadFirst: 'common',
      common: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsCommon',
          structure: _storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__["default"].WordListsCommon
        },
        load: _storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__["default"].loadBaseObject,
        serialize: this._serializeCommon.bind(this),
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      context: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsContext',
          structure: _storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__["default"].WordListsContext
        },
        serialize: this._serializeContext.bind(this),
        load: _storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__["default"].loadContext,
        delete: this._segmentSelectQueryByWordItemID.bind(this),
        select: this._segmentSelectQueryByWordItemID.bind(this)
      },
      shortHomonym: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsHomonym',
          structure: _storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__["default"].WordListsHomonym
        },
        serialize: this._serializeHomonym.bind(this),
        load: _storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__["default"].loadHomonym,
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      fullHomonym: {
        type: 'segment',
        objectStoreData: {
          name: 'WordListsFullHomonym',
          structure: _storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__["default"].WordListsFullHomonym
        },
        serialize: this._serializeHomonymWithFullDefs.bind(this),
        load: _storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__["default"].loadHomonym,
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      }
    }
  }

  /**
  * dbName getter
  * @return {String}
  */
  get dbName () {
    return 'AlpheiosWordLists'
  }

  /**
   * dbVersion getter
   * @return {Number}
   */
  get dbVersion () {
    return 3
  }

  /**
   * db segments that we are updating from remote data
   * @return {String[]} - array with segments name
   */
  get segmentsSync() {
    return Object.keys(this.storageMap).filter(key => this.storageMap[key].type === 'segment' && this.storageMap[key].sync)
  }

  /**
   * db segments getter
   * @return {String[]} - array with segments name
   */
  get segments() {
    return Object.keys(this.storageMap).filter(key => this.storageMap[key].type === 'segment')
  }

  /**
   * db segments getter - segments that needs already created wordItem
   * @return {String[]} - array with segment's names
   */
  get segmentsNotFirst () {
    return this.segments.filter(segment => segment !== this.storageMap._loadFirst)
  }

  /**
   * objectStore's names getter
   * @return {String[]} - array with objectStore's names
   */
  get objectStores () {
    return this.allObjectStoreData.map(objectStoreData => objectStoreData.name)
  }

  /**
   * objectStore's full data getter
   * @return {String[]} - array with objectStore's data { name, structure }
   */
  get allObjectStoreData () {
    return this.segments.map(segment => this.storageMap[segment].objectStoreData)
  }

  /**
   * objectStore's data by segment name
   * @param {String} segment - segment name
   * @return {Object} - { name, structure }
   */
  _objectStoreData (segment) {
    return this.storageMap[segment].objectStoreData
  }

  /**
   * Prepares query data for creating IndexedDB Request
   * @param {String} segment
   * @param {Object} indexData - index data for condition
   * @param {String} indexData.name - index name
   * @param {String} indexData.value - index value
   * @param {String} indexData.type - index type (in our queries it is ussually only)
   * @return {Object} - { objectStoreName, condition }
   */
  _formatQuery (segment, indexData) {
    return {
      objectStoreName: this._objectStoreData(segment).name,
      condition: indexData
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by ID from objectStore
   * @param {WordItem} wordItem
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByID(wordItem, type = 'only') {
    return {
      indexName: 'ID',
      value: this._makeStorageID(wordItem),
      type: type
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by wordItemID from objectStore (for example context)
   * @param {WordItem} wordItem
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByWordItemID(wordItem, type = 'only') {
    return {
      indexName: 'wordItemID',
      value: this._makeStorageID(wordItem),
      type: type
    }
  }

  /**
   * Prepares indexData for formatQuery when we select by listID from objectStore (for example all values for languageCode)
   * @param {String} languageCode
   * @param {String} [type=only] - type of index
   * @return {Object} - { indexName, value , type}
   */
  _selectByListID(languageCode, type = 'only') {
    return {
      indexName: 'listID',
      value: this._makeStorageListID(languageCode),
      type: type
    }
  }

  /**
   * Loads a segment that is defined as first
   * @param {Object} jsonObj
   * @return {WordItem}
   */
  loadFirst (jsonObj) {
    return this.loadSegment(this.storageMap._loadFirst, jsonObj)
  }

  /**
   * Loads a segment of a data model object from the database
   * @param {String} segment - segment name
   * @param {Object} jsonObj - json data to load to worditem
   * @param {WordItem} worditem - worditem
   * @return {WordItem}
   */
  loadSegment(segment, jsonObj, worditem) {
    if (this.storageMap[segment].load) {
      return this.storageMap[segment].load(jsonObj, worditem)
    }
  }

  /**
   * Creates query for getting list of wordItems or one wordItem
   * @param {Object} params - stores one of the following properties:
   * @param {String} [params.languageCode] - for selecting all wordItems for the current langugeCode
   * @param {WordItem} [params.worditem] - for selecting one wordItem
   * @return {WordItem}
   */
  listItemsQuery(params) {
    if (params.languageCode) {
      return this._formatQuery('common', this._selectByListID(params.languageCode))
    } else if (params.wordItem) {
      return this._formatQuery('common', this._selectByID(params.wordItem))
    } else {
      throw new Error("Invalid query parameters - missing languageCode")
    }
  }

  /**
   * Creates query for selecting data from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentSelectQuery(segment, worditem) {
    if (this.storageMap[segment].select) {
      return this.storageMap[segment].select(segment, worditem)
    }
  }

  /**
   * Creates query for selecting data from the segment by wordItem
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByWordItemID (segment, worditem) {
    return this._formatQuery(segment, this._selectByWordItemID(worditem))
  }

  /**
   * Creates query for selecting data from the segment by ID
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByID (segment, worditem) {
    return this._formatQuery(segment, this._selectByID(worditem))
  }

  /**
   * Creates query for deleting one item from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentDeleteQuery (segment, worditem) {
    if (this.storageMap[segment].delete) {
      return this.storageMap[segment].delete(segment, worditem)
    }
  }

  /**
   * Creates query for deleting all list items from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentDeleteManyQuery(segment, params) {
    if (params.languageCode) {
      return this._formatQuery(segment, this._selectByListID(params.languageCode))
    } else {
      throw new Error("Invalid query parameters - missing languageCode")
    }
  }

  /**
   * Creates data for updating items in a segment
   * @param {String} segment - segment name
   * @param {Object} data - the worditem object
   * @return {Object} data for creating IndexedDB Request
   */
  updateSegmentQuery(segment, data) {
    return {
      objectStoreName: this._objectStoreData(segment).name,
      dataItems: this.storageMap[segment].serialize(data)
    }
  }

  /**
   * Creates jsonObj for saving to IndexedDB for common segment
   * @param {WordItem} worditem - the worditem object
   * @return {Object[]}
   */
  _serializeCommon (worditem) {
    return [{
      ID: this._makeStorageID(worditem),
      listID: this.userId + '-' + worditem.languageCode,
      userID: this.userId,
      languageCode: worditem.languageCode,
      targetWord: worditem.targetWord,
      important: worditem.important,
      createdDT: WordItemIndexedDbDriver.currentDate
    }]
  }

  /**
   * Creates jsonObj for saving to IndexedDB for context segment
   * @param {WordItem} worditem - the worditem object
   * @return {Object[]}
   */
  _serializeContext (worditem) {
    let result = []
    let index = 0
    let wordItemId = this._makeStorageID(worditem)
    for (let tq of worditem.context) {
      index++
      let resultItem = {
        ID: wordItemId + '-' + index,
        listID: this.userId + '-' + worditem.languageCode,
        userID: this.userId,
        languageCode: worditem.languageCode,
        targetWord: worditem.targetWord,
        wordItemID: wordItemId,
        target: {
          source: tq.source,
          selector: {
            type: 'TextQuoteSelector',
            exact: tq.text,
            prefix: tq.prefix && tq.prefix.length > 0 ? tq.prefix : ' ',
            suffix: tq.suffix && tq.suffix.length > 0 ? tq.suffix : ' ',
            contextHTML: tq.contextHTML,
            languageCode: tq.languageCode
          }
        },
        createdDT: WordItemIndexedDbDriver.currentDate
      }
      result.push(resultItem)
    }
    return result
  }

  /**
   * Creates jsonObj for saving to IndexedDB for homonyms segment
   * @param {WordItem} worditem - the worditem object
   * @param {Boolean} [addMeaning = false] - if true it adds definitions
   * @return {Object[]}
   */
  _serializeHomonym (worditem, addMeaning = false) {
    let resultHomonym = worditem.homonym && (worditem.homonym instanceof alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"]) ? worditem.homonym.convertToJSONObject(addMeaning) : null
    if (resultHomonym) {
      return [{
        ID: this._makeStorageID(worditem),
        listID: this.userId + '-' + worditem.languageCode,
        userID: this.userId,
        languageCode: worditem.languageCode,
        targetWord: worditem.targetWord,
        homonym: resultHomonym
      }]
    }
    return []
  }


/**
 * Creates jsonObj for saving to IndexedDB for full homonym segment
 * @param {WordItem} worditem - the worditem object
 * @return {Object[]}
 */
_serializeHomonymWithFullDefs (worditem) {
  return this._serializeHomonym(worditem, true)
}

/**
 * Returns formatted date/time for saving to IndexedDB
 * @return {String}
 */
static get currentDate () {
  let dt = new Date()
  return dt.getFullYear() + '/'
      + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
      + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
              + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"
              + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":"
              + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

}

  /**
   * Creates ID for wordItem for saving to IndexedDB
   * @param {WordItem} worditem - the worditem object
   * @return {String}
   */
  _makeStorageID(worditem) {
    return this.userId + '-' + worditem.languageCode + '-' + worditem.targetWord
  }

  /**
   * Creates ID for wordList for saving to IndexedDB
   * @param {String} languageCode - languageCode of the wordList
   * @return {String}
   */
  _makeStorageListID(languageCode) {
    return this.userId + '-' + languageCode
  }

  /**
   * Creates ID for wordItem similiar to remote format (without userID)
   * @param {String} languageCode - languageCode of the wordList
   * @return {String}
   */
  makeIDCompareWithRemote (worditem) {
    return worditem.languageCode + '-' + worditem.targetWord
  }

  /**
   * Creates array of IDs for comparing with remote items
   * @param {WordItem[]} wordItems - languageCode of the wordList
   * @return {String[]}
   */
  getCheckArray (wordItems) {
    return wordItems.map(wordItem => this.makeIDCompareWithRemote(wordItem))
  }

  /**
   * Creates wordItem from remote data
   * @param {Object} remoteDataItem - wordItem from remote source in json format
   * @return {WordItem}
   */
  createFromRemoteData (remoteDataItem) {
    let wordItem = this.loadFirst(remoteDataItem)

    if (remoteDataItem.context) {
      this.loadSegment('context', remoteDataItem.context, wordItem)
    }

    if (remoteDataItem.homonym) {
      this.loadSegment('shortHomonym', [ remoteDataItem ], wordItem)
    }
    return wordItem
  }

}


/***/ }),

/***/ "./storage/worditem-remotedb-driver.js":
/*!*********************************************!*\
  !*** ./storage/worditem-remotedb-driver.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WordItemRemoteDbDriver; });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);


class WordItemRemoteDbDriver {
  /**
   * Defines proper headers for access to remote storage, defines storageMap
   * @param {Object} auth object with accessToken and userId
   */
  constructor (auth) {
    this.accessToken = auth.accessToken
    this.userId = auth.userId

    this.requestsParams = {
      baseURL: auth.endpoints.wordlist,
      headers: {
        common: {
          Authorization: 'bearer ' + this.accessToken,
          'Content-Type': 'application/json'
        }
      }
    }

    this.storageMap = {
      post: {
        url: this._constructPostURL.bind(this),
        serialize: this._serialize.bind(this),
        checkResult: this._checkPostResult.bind(this)
      },
      put: {
        url: this._constructPostURL.bind(this),
        serialize: this._serialize.bind(this),
        checkResult: this._checkPutResult.bind(this)
      },
      get: {
        url: this._constructGetURL.bind(this),
        checkResult: this._checkGetResult.bind(this),
        checkErrorResult: this._checkGetErrorResult.bind(this),
      },
      deleteOne: {
        url: this._constructPostURL.bind(this),
        checkResult: this._checkPutResult.bind(this)
      },
      deleteMany: {
        url: this._constructDeleteManyURL.bind(this),
        checkResult: this._checkPutResult.bind(this)
      }
    }
  }

  /**
   * db segments that would be merged
   * @return {String[]} - array with segments name
   */
  get segmentsForUpdate () {
    return ['common', 'context', 'shortHomonym']
  }

 /**
   * db segments that require merging upon update
   */
  get segmentsForMerge () {
    return ['context']
  }

  /**
   * merge current item with new item - common, shortHomonym and context parts
   * @return {WordItem}
   */
  mergeLocalRemote (currentItem, newItem) {
    currentItem = this.mergeCommonPart(currentItem, newItem)
    currentItem = this.mergeHommonymPart(currentItem, newItem)
    currentItem = this.mergeContextPart(currentItem, newItem)
    return currentItem
  }

  /**
   * merge common part to current item from new item
   * @return {WordItem}
   */
  mergeCommonPart  (currentItem, newItem) {
    currentItem.important = currentItem.important || newItem.important
    return currentItem
  }

  /**
   * merge short hommonym part to current item from new item
   * @return {WordItem}
   */
  mergeHommonymPart  (currentItem, newItem) {
    currentItem.homonym = currentItem.homonym || this._serializeHomonym(newItem)
    return currentItem
  }

  /**
   * merge context part to current item from new item
   * @return {WordItem}
   */
  mergeContextPart  (currentItem, newItem) {
    let pushContext = currentItem.context || []
    for (let contextItem of newItem.context) {
      let hasCheck = currentItem.context.some(tqCurrent => {
        return alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["TextQuoteSelector"].readObject(tqCurrent).isEqual(contextItem)
      })
      if (!hasCheck) {
        pushContext.push(this._serializeContextItem(contextItem, currentItem))
      }
    }
    currentItem.context = pushContext
    return currentItem
  }

   /**
   * Defines url for creating item in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructPostURL (wordItem) {
    return `/${this._makeStorageID(wordItem)}`
  }

   /**
   * Defines url for getting wordItem or wordList from remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructGetURL (data) {
    if (data.wordItem) {
      return `/${this._makeStorageID(data.wordItem)}`
    }
    if (data.languageCode) {
      return `/?languageCode=${data.languageCode}`
    }
    return
  }

  /**
   * Defines url for deleting items from wordList from languageCode in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _constructDeleteManyURL (data) {
    return `/?languageCode=${data.languageCode}`
  }

  /**
   * Defines ID to use in remote storage
   * @param {WordItem} wordItem
   * @return {String}
   */
  _makeStorageID (wordItem) {
    return wordItem.languageCode + '-' + wordItem.targetWord
  }

  /**
   * Defines json object from wordItem to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object}
   */
  _serialize (wordItem) {
    let result = {
      ID: this._makeStorageID(wordItem),
      listID: this.userId + '-' + wordItem.languageCode,
      userID: this.userId,
      languageCode: wordItem.languageCode,
      targetWord: wordItem.targetWord,
      important: wordItem.important,
      createdDT: WordItemRemoteDbDriver.currentDate
    }

    let homonym = this._serializeHomonym(wordItem)
    if (homonym) {
      result.homonym = homonym
    }
    let context = this._serializeContext(wordItem)

    if (context && context.length > 0) {
      result.context = context
    } else {
      result.context = []
    }
    return result
  }

  /**
   * Defines json object from homonym to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object}
   */
  _serializeHomonym (wordItem) {
    if (wordItem.homonym && wordItem.homonym.targetWord) {
      return {
        targetWord: wordItem.homonym.targetWord,
        lemmasList: wordItem.lemmasList
      }
    }
    return null
  }

  /**
   * Defines json object from textQuoteSelectors to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object[]}
   */
  _serializeContext (wordItem) {
    let result = []
    for (let tq of wordItem.context) {
      result.push(this._serializeContextItem(tq, wordItem))
    }
    return result
  }


  /**
   * Defines json object from a single textQuoteSelector to save to remote storage
   * @param {WordItem} wordItem
   * @return {Object[]}
   */
  _serializeContextItem (tq, wordItem) {
    return {
      target: {
        source: tq.source,
        selector: {
          type: 'TextQuoteSelector',
          exact: tq.text,
          prefix: tq.prefix && tq.prefix.length > 0 ? tq.prefix : ' ',
          suffix: tq.suffix && tq.suffix.length > 0 ? tq.suffix : ' ',
          languageCode: tq.languageCode
        }
      },
      languageCode: wordItem.languageCode,
      targetWord: wordItem.targetWord,
      createdDT: WordItemRemoteDbDriver.currentDate
    }
  }

  /**
   * Checks status of response (post) from remote storage
   * @param {WordItem} wordItem
   * @return {Boolean}
   */
  _checkPostResult (result) {
    return result.status === 201
  }

  /**
   * Checks status of response (put) from remote storage
   * @param {WordItem} wordItem
   * @return {Boolean}
   */
  _checkPutResult (result) {
    return result.status === 200
  }

  /**
   * Checks status of response (get) from remote storage
   * @param {WordItem} wordItem
   * @return {Object/Object[]}
   */
  _checkGetResult (result) {
    if (result.status !== 200) {
      return []
    }
    if (Array.isArray(result.data)) {
      return result.data.map(item => item.body ? item.body : item)
    } else {
      return [ result.data ]
    }
  }

  /**
   * Checks status of response error (get) from remote storage
   * If error message consists of 'Item not found.' - it is not an error. Return empty error instead of error.
   * @param {Error} error
   * @return {[]/Boolean}
   */
  _checkGetErrorResult (error) {
    if (error.response && error.response.data && (error.response.data.error === 'Item not found.')) {
      return []
    } else {
      return false
    }
  }

  /**
   * Defines date
   */
  static get currentDate () {
    let dt = new Date()
    return dt.getFullYear() + '/'
        + ((dt.getMonth()+1) < 10 ? '0' : '') + (dt.getMonth()+1)  + '/'
        + ((dt.getDate() < 10) ? '0' : '') + dt.getDate() + ' @ '
                + ((dt.getHours() < 10) ? '0' : '') + dt.getHours() + ":"
                + ((dt.getMinutes() < 10) ? '0' : '') + dt.getMinutes() + ":"
                + ((dt.getSeconds() < 10) ? '0' : '') + dt.getSeconds()

  }

  /**
   * Creates array is IDs from wordItems for comparing with remote storage data
   * @param {WordItem[]} wordItems
   * @return {String[]}
   */
  getCheckArray (dataItems) {
    return dataItems.map(item => this._makeStorageID(item))
  }
}


/***/ }),

/***/ "alpheios-data-models":
/*!***************************************!*\
  !*** external "alpheios-data-models" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_data_models__;

/***/ })

/******/ });
});
//# sourceMappingURL=alpheios-wordlist.js.map