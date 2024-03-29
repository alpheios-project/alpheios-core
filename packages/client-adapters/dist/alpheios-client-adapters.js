(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("alpheios-data-models"), require("alpheios-l10n"), require("alpheios-messaging"), require("papaparse"));
	else if(typeof define === 'function' && define.amd)
		define(["alpheios-data-models", "alpheios-l10n", "alpheios-messaging", "papaparse"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("alpheios-data-models"), require("alpheios-l10n"), require("alpheios-messaging"), require("papaparse")) : factory(root["alpheios-data-models"], root["alpheios-l10n"], root["alpheios-messaging"], root["papaparse"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function(__WEBPACK_EXTERNAL_MODULE_alpheios_data_models__, __WEBPACK_EXTERNAL_MODULE_alpheios_l10n__, __WEBPACK_EXTERNAL_MODULE_alpheios_messaging__, __WEBPACK_EXTERNAL_MODULE_papaparse__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/axios/index.js":
/*!********************************************!*\
  !*** ../../../node_modules/axios/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "../../../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../../../node_modules/axios/lib/adapters/xhr.js":
/*!*******************************************************!*\
  !*** ../../../node_modules/axios/lib/adapters/xhr.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../../../node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../../../node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../../../node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../../../node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../../../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../../../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../../../node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
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
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

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
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
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
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
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

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../../../node_modules/axios/lib/axios.js":
/*!************************************************!*\
  !*** ../../../node_modules/axios/lib/axios.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../../../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../../../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../../../node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../../../node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "../../../node_modules/axios/lib/defaults.js");

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
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../../../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../../../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../../../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../../../node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "../../../node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../../../node_modules/axios/lib/cancel/Cancel.js":
/*!********************************************************!*\
  !*** ../../../node_modules/axios/lib/cancel/Cancel.js ***!
  \********************************************************/
/***/ ((module) => {

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

/***/ "../../../node_modules/axios/lib/cancel/CancelToken.js":
/*!*************************************************************!*\
  !*** ../../../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../../../node_modules/axios/lib/cancel/Cancel.js");

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

/***/ "../../../node_modules/axios/lib/cancel/isCancel.js":
/*!**********************************************************!*\
  !*** ../../../node_modules/axios/lib/cancel/isCancel.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../../../node_modules/axios/lib/core/Axios.js":
/*!*****************************************************!*\
  !*** ../../../node_modules/axios/lib/core/Axios.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../../../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../../../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../../../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../../../node_modules/axios/lib/core/mergeConfig.js");

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
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

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

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../../../node_modules/axios/lib/core/InterceptorManager.js":
/*!******************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/InterceptorManager.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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

/***/ "../../../node_modules/axios/lib/core/buildFullPath.js":
/*!*************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/buildFullPath.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../../../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../../../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "../../../node_modules/axios/lib/core/createError.js":
/*!***********************************************************!*\
  !*** ../../../node_modules/axios/lib/core/createError.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../../../node_modules/axios/lib/core/enhanceError.js");

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

/***/ "../../../node_modules/axios/lib/core/dispatchRequest.js":
/*!***************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/dispatchRequest.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../../../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../../../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../../../node_modules/axios/lib/defaults.js");

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
    config.headers
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

/***/ "../../../node_modules/axios/lib/core/enhanceError.js":
/*!************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/enhanceError.js ***!
  \************************************************************/
/***/ ((module) => {

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
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
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
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "../../../node_modules/axios/lib/core/mergeConfig.js":
/*!***********************************************************!*\
  !*** ../../../node_modules/axios/lib/core/mergeConfig.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../../node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "../../../node_modules/axios/lib/core/settle.js":
/*!******************************************************!*\
  !*** ../../../node_modules/axios/lib/core/settle.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../../../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
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

/***/ "../../../node_modules/axios/lib/core/transformData.js":
/*!*************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/transformData.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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

/***/ "../../../node_modules/axios/lib/defaults.js":
/*!***************************************************!*\
  !*** ../../../node_modules/axios/lib/defaults.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../../../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../../../node_modules/axios/lib/helpers/normalizeHeaderName.js");

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
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../../../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../../../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
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
  maxBodyLength: -1,

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


/***/ }),

/***/ "../../../node_modules/axios/lib/helpers/bind.js":
/*!*******************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/bind.js ***!
  \*******************************************************/
/***/ ((module) => {

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

/***/ "../../../node_modules/axios/lib/helpers/buildURL.js":
/*!***********************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/buildURL.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
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
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../../../node_modules/axios/lib/helpers/combineURLs.js":
/*!**************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/combineURLs.js ***!
  \**************************************************************/
/***/ ((module) => {

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

/***/ "../../../node_modules/axios/lib/helpers/cookies.js":
/*!**********************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/cookies.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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

/***/ "../../../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!****************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \****************************************************************/
/***/ ((module) => {

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

/***/ "../../../node_modules/axios/lib/helpers/isAxiosError.js":
/*!***************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/isAxiosError.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "../../../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!******************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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

/***/ "../../../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!**********************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../../../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../../../node_modules/axios/lib/helpers/parseHeaders.js":
/*!***************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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

/***/ "../../../node_modules/axios/lib/helpers/spread.js":
/*!*********************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/spread.js ***!
  \*********************************************************/
/***/ ((module) => {

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

/***/ "../../../node_modules/axios/lib/utils.js":
/*!************************************************!*\
  !*** ../../../node_modules/axios/lib/utils.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../../../node_modules/axios/lib/helpers/bind.js");

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
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
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
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
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
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
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

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
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
  isPlainObject: isPlainObject,
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
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "../../../node_modules/xmltojson/lib/xmlToJSON.js":
/*!********************************************************!*\
  !*** ../../../node_modules/xmltojson/lib/xmlToJSON.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/* Copyright 2015 William Summers, MetaTribal LLC
 * adapted from https://developer.mozilla.org/en-US/docs/JXON
 *
 * Licensed under the MIT License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author William Summers
 *
 */

var xmlToJSON = (function () {

    this.version = "1.3.5";

    var options = { // set up the default options
        mergeCDATA: true, // extract cdata and merge with text
        grokAttr: true, // convert truthy attributes to boolean, etc
        grokText: true, // convert truthy text/attr to boolean, etc
        normalize: true, // collapse multiple spaces to single space
        xmlns: true, // include namespaces as attribute in output
        namespaceKey: '_ns', // tag name for namespace objects
        textKey: '_text', // tag name for text nodes
        valueKey: '_value', // tag name for attribute values
        attrKey: '_attr', // tag for attr groups
        cdataKey: '_cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
        attrsAsObject: true, // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
        stripAttrPrefix: true, // remove namespace prefixes from attributes
        stripElemPrefix: true, // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
        childrenAsArray: true // force children into arrays
    };

    var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
    var trimMatch = new RegExp(/^\s+|\s+$/g);

    this.grokType = function (sValue) {
        if (/^\s*$/.test(sValue)) {
            return null;
        }
        if (/^(?:true|false)$/i.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        return sValue;
    };

    this.parseString = function (xmlString, opt) {
        return this.parseXML(this.stringToXML(xmlString), opt);
    }

    this.parseXML = function (oXMLParent, opt) {

        // initialize options
        for (var key in opt) {
            options[key] = opt[key];
        }

        var vResult = {},
            nLength = 0,
            sCollectedTxt = "";

        // parse namespace information
        if (options.xmlns && oXMLParent.namespaceURI) {
            vResult[options.namespaceKey] = oXMLParent.namespaceURI;
        }

        // parse attributes
        // using attributes property instead of hasAttributes method to support older browsers
        if (oXMLParent.attributes && oXMLParent.attributes.length > 0) {
            var vAttribs = {};

            for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
                var oAttrib = oXMLParent.attributes.item(nLength);
                vContent = {};
                var attribName = '';

                if (options.stripAttrPrefix) {
                    attribName = oAttrib.name.replace(prefixMatch, '');

                } else {
                    attribName = oAttrib.name;
                }

                if (options.grokAttr) {
                    vContent[options.valueKey] = this.grokType(oAttrib.value.replace(trimMatch, ''));
                } else {
                    vContent[options.valueKey] = oAttrib.value.replace(trimMatch, '');
                }

                if (options.xmlns && oAttrib.namespaceURI) {
                    vContent[options.namespaceKey] = oAttrib.namespaceURI;
                }

                if (options.attrsAsObject) { // attributes with same local name must enable prefixes
                    vAttribs[attribName] = vContent;
                } else {
                    vResult[options.attrKey + attribName] = vContent;
                }
            }

            if (options.attrsAsObject) {
                vResult[options.attrKey] = vAttribs;
            } else { }
        }

        // iterate over the children
        if (oXMLParent.hasChildNodes()) {
            for (var oNode, sProp, vContent, nItem = 0; nItem < oXMLParent.childNodes.length; nItem++) {
                oNode = oXMLParent.childNodes.item(nItem);

                if (oNode.nodeType === 4) {
                    if (options.mergeCDATA) {
                        sCollectedTxt += oNode.nodeValue;
                    } else {
                        if (vResult.hasOwnProperty(options.cdataKey)) {
                            if (vResult[options.cdataKey].constructor !== Array) {
                                vResult[options.cdataKey] = [vResult[options.cdataKey]];
                            }
                            vResult[options.cdataKey].push(oNode.nodeValue);

                        } else {
                            if (options.childrenAsArray) {
                                vResult[options.cdataKey] = [];
                                vResult[options.cdataKey].push(oNode.nodeValue);
                            } else {
                                vResult[options.cdataKey] = oNode.nodeValue;
                            }
                        }
                    }
                } /* nodeType is "CDATASection" (4) */
                else if (oNode.nodeType === 3) {
                    sCollectedTxt += oNode.nodeValue;
                } /* nodeType is "Text" (3) */
                else if (oNode.nodeType === 1) { /* nodeType is "Element" (1) */

                    if (nLength === 0) {
                        vResult = {};
                    }

                    // using nodeName to support browser (IE) implementation with no 'localName' property
                    if (options.stripElemPrefix) {
                        sProp = oNode.nodeName.replace(prefixMatch, '');
                    } else {
                        sProp = oNode.nodeName;
                    }

                    vContent = xmlToJSON.parseXML(oNode);

                    if (vResult.hasOwnProperty(sProp)) {
                        if (vResult[sProp].constructor !== Array) {
                            vResult[sProp] = [vResult[sProp]];
                        }
                        vResult[sProp].push(vContent);

                    } else {
                        if (options.childrenAsArray) {
                            vResult[sProp] = [];
                            vResult[sProp].push(vContent);
                        } else {
                            vResult[sProp] = vContent;
                        }
                        nLength++;
                    }
                }
            }
        } else if (!sCollectedTxt) { // no children and no text, return null
            if (options.childrenAsArray) {
                vResult[options.textKey] = [];
                vResult[options.textKey].push(null);
            } else {
                vResult[options.textKey] = null;
            }
        }

        if (sCollectedTxt) {
            if (options.grokText) {
                var value = this.grokType(sCollectedTxt.replace(trimMatch, ''));
                if (value !== null && value !== undefined) {
                    vResult[options.textKey] = value;
                }
            } else if (options.normalize) {
                vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '').replace(/\s+/g, " ");
            } else {
                vResult[options.textKey] = sCollectedTxt.replace(trimMatch, '');
            }
        }

        return vResult;
    }


    // Convert xmlDocument to a string
    // Returns null on failure
    this.xmlToString = function (xmlDoc) {
        try {
            var xmlString = xmlDoc.xml ? xmlDoc.xml : (new XMLSerializer()).serializeToString(xmlDoc);
            return xmlString;
        } catch (err) {
            return null;
        }
    }

    // Convert a string to XML Node Structure
    // Returns null on failure
    this.stringToXML = function (xmlString) {
        try {
            var xmlDoc = null;

            if (window.DOMParser) {

                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlString, "text/xml");

                return xmlDoc;
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString);

                return xmlDoc;
            }
        } catch (e) {
            return null;
        }
    }

    return this;
}).call({});

if ( true && module !== null && module.exports) module.exports = xmlToJSON;
else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return xmlToJSON }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./adapters/alpheiostb/adapter.js":
/*!****************************************!*\
  !*** ./adapters/alpheiostb/adapter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _clAdapters_adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/adapters/alpheiostb/config.json */ "./adapters/alpheiostb/config.json");
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xmltojson */ "../../../node_modules/xmltojson/lib/xmlToJSON.js");
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xmltojson__WEBPACK_IMPORTED_MODULE_3__);






class AlpheiosTreebankAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__.default {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__)
    this.models = { lat: alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LatinLanguageModel, grc: alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.GreekLanguageModel }
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} wordref - a word reference for getting homonym from Treebank
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, wordref) {
    const server = this.prepareRequest(wordref)
    if (!server.url) {
      this.addError(this.l10n.getMsg('MORPH_TREEBANK_NO_URL', { word: wordref }))
      return
    }
    try {
      const res = await this.fetch(server.url, { type: 'xml' })

      if (res.constructor.name === 'AdapterError') {
        return
      }

      if (res) {
        const langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(languageID)

        const jsonObj = xmltojson__WEBPACK_IMPORTED_MODULE_3___default().parseString(res)
        jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } }

        const homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text, server.config)
        return homonym
      } else {
        this.addError(this.l10n.getMsg('MORPH_TREEBANK_NO_ANSWER_FOR_WORD', { word: wordref }))
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('MORPH_TREEBANK_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  /**
   * This method prepares the request from the config
   * @param {String} wordref - a word reference for getting homonym
   * @return {String} - constructed url for getting data from Treebank
  */
  prepareRequest (wordref) {
    const [text, fragment] = wordref.split(/#/)
    let requestServer = {} // eslint-disable-line prefer-const
    if (text && fragment) {
      for (const serverConfig of this.config.servers) {
        if (serverConfig.isDefault || serverConfig.texts.includes(text)) {
          requestServer.config = serverConfig
          requestServer.url = serverConfig.url.replace('r_TEXT', text)
          requestServer.url = requestServer.url.replace('r_WORD', fragment).replace('r_CLIENT', serverConfig.clientId)
          break
        }
      }
    }
    return requestServer
  }

  /**
   * This method transform data from adapter to Homonym
   * @param {Object} jsonObj - data from adapter
   * @param {String} targetWord - word
   * @param {String} config - server config
   * @return {Homonym}
  */
  transform (jsonObj, targetWord, config) {
    'use strict'
    const providerUri = config.providerUri
    const providerRights = config.providerRights
    const provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider(providerUri, providerRights)

    const hdwd = jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]
    let lemmaText = hdwd._text
    // the Alpheios v1 treebank data kept trailing digits on the lemmas
    // these won't match morphology service lemmas which have them stripped
    lemmaText = lemmaText.replace(/\d+$/, '')

    const model = this.models[hdwd._attr.lang._value]
    let lemma = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lemma(lemmaText, model.languageCode) // eslint-disable-line prefer-const
    const lexmodel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lexeme(lemma, [])
    let inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Inflection(lemmaText, model.languageID, null, null, null) // eslint-disable-line prefer-const
    const infl = jsonObj.words[0].word[0].entry[0].infl[0]
    inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.fullForm, targetWord, model.languageID))

    const features = config.featuresArray
    for (const feature of features) {
      const localName = feature[0]
      const featureType = feature[1]
      const addToLemma = feature[2]
      if (infl[localName]) {
        const obj = model.typeFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types[featureType]).createFeatures(infl[localName][0]._text, 1)
        inflection.addFeature(obj)
        if (addToLemma) {
          lemma.addFeature(obj)
        }
      }
    }
    lexmodel.inflections = [inflection]
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Homonym([alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider, lexmodel)], targetWord)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosTreebankAdapter);


/***/ }),

/***/ "./adapters/arethusa/adapter.js":
/*!**************************************!*\
  !*** ./adapters/arethusa/adapter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _clAdapters_transformers_alpheios_lexicon_transformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/transformers/alpheios-lexicon-transformer */ "./transformers/alpheios-lexicon-transformer.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var _clAdapters_adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clAdapters/adapters/alpheiostb/config.json */ "./adapters/alpheiostb/config.json");
/* harmony import */ var alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! alpheios-messaging */ "alpheios-messaging");
/* harmony import */ var alpheios_messaging__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__);








class ArethusaTreebankAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__.default {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.engineSet = null
    this.config = this.uploadConfig(config, _clAdapters_adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_4__)
  }

  getMessagingService (config) {
    if (!alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.MessagingService.hasService(config.name)) {
      alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.MessagingService.createService(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.WindowIframeDestination(config))
    }
    return alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.MessagingService.getService(config.name)
  }

  async _fetchArethusaData (targetURL, sentenceId, wordId) {
    const config = this._getMessageConfig(targetURL)
    const svc = this.getMessagingService(config)
    const requestBodyNav = {
      gotoSentence: { sentenceId: sentenceId }
    }
    const message = new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(requestBodyNav)
    await svc.sendRequestTo(config.name, message)
    const requestBodyMorph = {
      getMorph: {
        sentenceId: sentenceId,
        wordId: wordId
      }
    }
    const responseMessage = await svc.sendRequestTo(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(requestBodyMorph))
    return responseMessage.body
  }

  _getMessageConfig (targetURL) {
    return {
      name: targetURL,
      targetURL: targetURL,
      targetIframeID: 'alpheios-treebank-frame'
    }
  }

  /**
   * This method refreshes the view of the Arethusa application
   */
  async refreshView (provider) {
    const config = this._getMessageConfig(provider)
    const svc = this.getMessagingService(config)
    const requestBody = { refreshView: { } }
    let response
    try {
      response = await svc.sendRequestTo(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(requestBody))
    } catch (response) {
      if (response instanceof alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
      return
    }
    return response.body
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - the target word
   * @param {String} provider - the domain which provides Arethusa
   * @param {String} sentenceId - the identifier for the sentence
   * @param {String} wordId - the identifier for the word
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, word, provider, sentenceId, wordId) {
    try {
      if (typeof sentenceId !== 'undefined' && typeof wordId !== 'undefined') {
        const tbRes = await this._fetchArethusaData(provider, sentenceId, wordId)
        if (!tbRes || Object.keys(tbRes).length === 0) {
          this.addError(this.l10n.getMsg('MORPH_TREEBANK_NO_ANSWER_FOR_WORD', { word: word }))
          return
        }
        const languageModel = alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.LanguageModelFactory.getLanguageModel(languageID)
        if (!languageModel) {
          this.addError(this.l10n.getMsg('MORPH_TREEBANK_UNSUPPORTED_LANGUAGE', { languageId: languageID.toString() }))
          return
        }
        let mapper = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_3__.default(languageModel, 'arethusa') // eslint-disable-line prefer-const
        mapper.setPropertyParser(function (propertyName, propertyValue, inputElem) {
          if (propertyName === 'pers') {
            propertyValue = propertyValue.replace('first person', alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.ORD_1ST)
            propertyValue = propertyValue.replace('second person', alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.ORD_2ND)
            propertyValue = propertyValue.replace('third person', alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.ORD_3RD)
          }
          return [propertyValue]
        })
        const transformAdapter = new _clAdapters_transformers_alpheios_lexicon_transformer__WEBPACK_IMPORTED_MODULE_1__.default(this, mapper, 'arethusa')
        const homonym = transformAdapter.transformData(tbRes, word)
        // handle verb participles in a way consistent with the morpheus parser
        // which reports the pofs of the lemma as verb and pofs of the inflection as verb participle
        if (homonym && homonym.lexemes && homonym.lexemes.length === 1 &&
           homonym.lexemes[0].lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Feature.types.part].value === alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.POFS_VERB &&
           homonym.lexemes[0].inflections.length === 1 &&
           languageModel.normalizeFeatureValue(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Feature.types.mood, homonym.lexemes[0].inflections[0][alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Feature.types.mood].value) === alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.MOOD_PARTICIPLE) {
          homonym.lexemes[0].inflections[0].addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Feature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Feature.types.part, alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.POFS_VERB_PARTICIPLE, languageModel.languageID))
        }
        return homonym
      } else {
        this.addError(this.l10n.getMsg('MORPH_TREEBANK_MISSING_REF', { request: word }))
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('MORPH_TREEBANK_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  async findWord (provider, word, prefix, suffix, sentenceId) {
    const config = this._getMessageConfig(provider)
    const svc = this.getMessagingService(config)
    const gotoSentenceBody = {
      gotoSentence: { sentenceId }
    }
    try {
      await svc.sendRequestTo(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(gotoSentenceBody))
      const findWordBody = { findWord: { sentenceId, word, prefix, suffix } }
      const response = await svc.sendRequestTo(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(findWordBody))
      return response.body
    } catch (response) {
      if (response instanceof alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
    }
  }

  async gotoSentence (provider, sentenceId, wordIds = []) {
    const config = this._getMessageConfig(provider)
    const svc = this.getMessagingService(config)
    const gotoSentenceBody = {
      gotoSentence: { sentenceId, wordIds }
    }
    try {
      const response = await svc.sendRequestTo(config.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.RequestMessage(gotoSentenceBody))
      return response.body
    } catch (response) {
      if (response instanceof alpheios_messaging__WEBPACK_IMPORTED_MODULE_5__.ResponseMessage) {
        // This is an error from a treebank template app
        this.addRemoteError(response.errorCode, response.body.message)
      } else {
        // This is some other error
        this.addError(response.message)
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArethusaTreebankAdapter);


/***/ }),

/***/ "./adapters/base-adapter.js":
/*!**********************************!*\
  !*** ./adapters/base-adapter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../../../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var alpheios_l10n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-l10n */ "alpheios-l10n");
/* harmony import */ var alpheios_l10n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_l10n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _clAdapters_errors_adapter_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/errors/adapter-error */ "./errors/adapter-error.js");
/* harmony import */ var _clAdapters_errors_adapter_warning_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clAdapters/errors/adapter-warning.js */ "./errors/adapter-warning.js");
/* harmony import */ var _clAdapters_errors_remote_error_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clAdapters/errors/remote-error.js */ "./errors/remote-error.js");
/* harmony import */ var _clAdapters_locales_locales_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @clAdapters/locales/locales.js */ "./locales/locales.js");
/* harmony import */ var _clAdapters_locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @clAdapters/locales/en-us/messages.json */ "./locales/en-us/messages.json");
/* harmony import */ var _clAdapters_locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @clAdapters/locales/en-gb/messages.json */ "./locales/en-gb/messages.json");











class BaseAdapter {
  /**
   * Every adapter has errors array and L10n property for localizing messages
  */
  constructor () {
    this.errors = []
    this.l10n = new alpheios_l10n__WEBPACK_IMPORTED_MODULE_2__.L10n()
      .addMessages(_clAdapters_locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_7__, _clAdapters_locales_locales_js__WEBPACK_IMPORTED_MODULE_6__.default.en_US)
      .addMessages(_clAdapters_locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_8__, _clAdapters_locales_locales_js__WEBPACK_IMPORTED_MODULE_6__.default.en_GB)
      .setLocale(_clAdapters_locales_locales_js__WEBPACK_IMPORTED_MODULE_6__.default.en_US)
  }

  /**
   * This method is used for adding error meassage with additional data
   * @param {String} message  - message text for the error
  */
  addError (message, statusCode) {
    const error = new _clAdapters_errors_adapter_error__WEBPACK_IMPORTED_MODULE_3__.default(this.config.category, this.config.adapterName, this.config.method, message, statusCode)
    this.errors.push(error)
  }

  addRemoteError (errorCode, message) {
    const error = new _clAdapters_errors_remote_error_js__WEBPACK_IMPORTED_MODULE_5__.default(this.config.category, this.config.adapterName, this.config.method, errorCode, message)
    this.errors.push(error)
  }

  addWarning (errorCode, message) {
    const warning = new _clAdapters_errors_adapter_warning_js__WEBPACK_IMPORTED_MODULE_4__.default(this.config.category, this.config.adapterName, this.config.method, errorCode, message)
    this.errors.push(warning)
  }

  /**
   * This method is used for uploding config property from current properties and default properties
   * @param {Object} config - properties with higher priority
   * @param {Object} defaultConfig - default properties
   * @return {Object} - configuration data
  */
  uploadConfig (config, defaultConfig) {
    let configRes = {} // eslint-disable-line prefer-const
    Object.keys(config).forEach(configKey => {
      configRes[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (!configRes[configKey]) {
        configRes[configKey] = defaultConfig[configKey]
      } else if (Array.isArray(configRes[configKey])) {
        configRes[configKey] = configRes[configKey].map((item, index) => {
          return { ...defaultConfig[configKey][index], ...item }
        })
      } else if (configRes[configKey] instanceof Object) {
        configRes[configKey] = { ...defaultConfig[configKey], ...configRes[configKey] }
      }
    })

    return configRes
  }

  /**
   * This method is used for creating timeout Promise
   * @param {Number} ms - amount of ms for creation timeout
   * @return {Promise}
  */
  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * This method is used for fetching data using window.fetch
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   * @return {Object|String}
  */
  async fetchWindow (url, options = { type: 'json' }) {
    if (url) {
      try {
        const response = await window.fetch(url, options.requestParams)
        if (!response.ok) {
          let statusText

          if (response.status === 400) {
            const resultResponse = await response.json()
            statusText = (resultResponse && resultResponse.message) ? resultResponse.message : response.statusText
          }

          this.addError(this.l10n.getMsg('BASIC_ADAPTER_URL_RESPONSE_FAILED', { statusCode: response.status, statusText }), response.status)
          return
        }
        if (options.type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }

  /**
   * This method is used for fetching data using window.fetch with timeout reject
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Promise}
  */
  fetchWindowTimeout (url, options) {
    if (url) {
      let didTimeOut = false
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          didTimeOut = true
          reject(new Error('Request timed out', url))
        }, options.timeout)

        window.fetch(url, options.requestParams)
          .then((response) => {
            clearTimeout(timeout)
            if (!didTimeOut) {
              if (options.type === 'xml') {
                resolve(response.text())
              } else {
                resolve(response.json())
              }
            }
          })
          .catch((err) => {
            this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
            if (didTimeOut) return
            reject(err)
          })
      })
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }

  /**
   * This method is used for fetching data using axios
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Object|String}
  */
  async fetchAxios (url, options) {
    if (url) {
      const finalOptions = Object.assign({ url: encodeURI(decodeURI(url)) }, options)
      try {
        const res = await axios__WEBPACK_IMPORTED_MODULE_0___default()(finalOptions)
        return res.data
      } catch (error) {
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_NO_DATA_FROM_URL', { url: url }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }

  printError (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Logger.getInstance().error('Alpheios error: unexpected response retrieving data from service', error)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Logger.getInstance().error('Alpheios error: no response from service', error)
    } else {
      // Something happened in setting up the request that triggered an Error
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Logger.getInstance().error('Alpheios error: unexpected error requesting data from service', error.message)
    }
  }

  /**
   * This method is used for fetching data using different methods. If window is defined - than it would be used window.fetch.
   * Otherwise axios would be used.
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Object|String}
  */
  async fetch (url, options = {}) {
    let res

    if (url) {
      try {
        if (typeof window !== 'undefined' && typeof window.fetch !== 'undefined') {
          if (options && options.timeout > 0) {
            res = await this.fetchWindowTimeout(url, options)
          } else {
            res = await this.fetchWindow(url, options)
          }
        } else {
          res = await this.fetchAxios(url, options)
        }

        return res
      } catch (error) {
        this.addError(this.l10n.getMsg('BASIC_ADAPTER_UNKNOWN_ERROR', { message: error.message }))
      }
    } else {
      this.addError(this.l10n.getMsg('BASIC_ADAPTER_EMPTY_URL'))
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseAdapter);


/***/ }),

/***/ "./adapters/chineseloc/adapter.js":
/*!****************************************!*\
  !*** ./adapters/chineseloc/adapter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CedictCharacterForms": () => (/* binding */ CedictCharacterForms),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-messaging */ "alpheios-messaging");
/* harmony import */ var alpheios_messaging__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable no-unused-vars */




const CedictCharacterForms = {
  SIMPLIFIED: 'simplified',
  TRADITIONAL: 'traditional'
}

const msgServiceName = 'AdaptersLexisService'

class AlpheiosChineseLocAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor (config = {}) {
    super()
    this.config = config
    this.cedictConfig = alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.CedictDestinationConfig
    if (!this.config.serviceUrl) {
      throw new Error('An obligatory serviceUrl parameter is missing')
    }
    this.cedictConfig.targetURL = this.config.serviceUrl

    /*
    AlpheiosChineseLocAdapter is created every time when a new lexical request for Chinese data comes in.
    We do not want to create a new instance of a messaging service with that. Thus, we'll use a single
    instance of the service that will be created once and reused across consecutive constructor invocations.
     */
    if (!alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.MessagingService.hasService(msgServiceName)) {
      alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.MessagingService.createService(msgServiceName, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.WindowIframeDestination({
        name: this.cedictConfig.name,
        targetURL: this.cedictConfig.targetURL,
        targetIframeID: this.cedictConfig.targetIframeID,
        commModes: [alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.WindowIframeDestination.commModes.SEND]
      }))
    }
    this._messagingService = alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.MessagingService.getService(msgServiceName)
  }

  get languageID () { return alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.ChineseLanguageModel.languageID }

  /**
   * Creates a list of words that will be requested from a CEDICT service.
   * This method builds a list of words that would make sense in a context of a Chinese language
   * out of the word selected by user and its surrounding texts (context forward represents
   * the text that is located at the right of the selected word.
   *
   * @param {string} targetWord - A word that was selected by the user.
   * @param {string} contextForward - A piece of text that follows the selected word in a text.
   * @returns {[string]} An array of words that will be requested from a CEDICT service.
   * @private
   */
  static _buildWordList (targetWord, contextForward) {
    const wordList = [targetWord]
    if (contextForward) {
      for (let i = 0; i < contextForward.length; i++) {
        wordList.push(`${targetWord}${contextForward.slice(0, i + 1)}`)
      }
    }
    return wordList
  }

  async getHomonym (targetWord, contextForward) {
    try {
      const requestBody = {
        getWords: {
          words: this.constructor._buildWordList(targetWord, contextForward)
        }
      }
      let response
      try {
        response = await this._messagingService.sendRequestTo(this.cedictConfig.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.RequestMessage(requestBody))
      } catch (response) {
        this.addRemoteError(response.errorCode, response.body.message)
        return
      }

      if (Object.keys(response.body).length === 0) {
        this.addError(this.l10n.getMsg('MORPH_NO_HOMONYM', { word: targetWord, languageId: this.languageID.toString() }))
        return
      }
      const homonym = this._transformData(response.body, targetWord)
      if (!homonym) {
        this.addError(this.l10n.getMsg('MORPH_NO_HOMONYM', { word: targetWord, languageId: this.languageID.toString() }))
        return
      }
      return homonym
    } catch (error) {
      this.addError(this.l10n.getMsg('MORPH_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  async loadData (timeout) {
    try {
      const requestBody = {
        loadData: {}
      }
      let response
      try {
        response = await this._messagingService.sendRequestTo(this.cedictConfig.name, new alpheios_messaging__WEBPACK_IMPORTED_MODULE_2__.RequestMessage(requestBody), timeout)
      } catch (response) {
        this.addRemoteError(response.errorCode, response.body.message)
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('MORPH_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  _transformData (cedictEntries, targetWord) {
    // eslint-disable-next-line no-prototype-builtins
    const characterForm = cedictEntries.hasOwnProperty(CedictCharacterForms.SIMPLIFIED)
      ? CedictCharacterForms.SIMPLIFIED
      : CedictCharacterForms.TRADITIONAL
    let lexemes = [] // eslint-disable-line prefer-const
    const wordEntries = Object.values(cedictEntries[characterForm]).flat()
    wordEntries.forEach(entry => {
      const cfData = entry[characterForm]
      const headword = cfData.headword
      let lemma = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Lemma(headword, this.languageID, []) // eslint-disable-line prefer-const

      // eslint-disable-next-line prefer-const
      let pronunciationValues = entry.pinyin ? [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.ChineseLanguageModel.formatPinyin(entry.pinyin)] : []
      pronunciationValues = ['mandarin', 'cantonese', 'tang'].reduce((arr, i) => {
        // Add all of the values listed above to an array or pronunciation feature. Each feature value will be preceded with its name.
        // TODO: Update once we decide on a better format of storing pronunciation in a Feature object.
        if (cfData[i]) arr.push(`${i} - ${cfData[i]}`); return arr
      }, pronunciationValues)
      lemma.addFeature(this._createFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.pronunciation, pronunciationValues))
      lemma.addFeature(this._createFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.note, characterForm))
      if (cfData.radical && cfData.radical.character) lemma.addFeature(this._createFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.radical, cfData.radical.character))
      if (cfData.frequency) lemma.addFeature(this._createFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.frequency, cfData.frequency, 10))

      let lexModel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Lexeme(lemma, []) // eslint-disable-line prefer-const
      const shortDefs = entry.definitions.map(entry => new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Definition(entry, 'eng', 'text/plain', headword))
      lexModel.meaning.appendShortDefs(shortDefs)
      lexemes.push(lexModel)
    })
    let homonym = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Homonym(lexemes, targetWord) // eslint-disable-line prefer-const
    /*
    As a temporary measure, until HomonymSet is introduced, we will place several Chinese homonyms
    into the single Homonym object as individual lexemes. We will use an `isMultiHomonym` prop set to true
    to mark Homonym objects like this.
     */
    homonym.isMultiHomonym = AlpheiosChineseLocAdapter._wordsFound(cedictEntries[characterForm]) > 1
    return homonym
  }

  /**
   * Returns the number of words that has some matching CEDICT entries.
   *
   * @param {object} result - Data returned from CEDICT, an object whose keys are words and values are arrays
   *        either empty (if no entries in CEDICT are found for a word) or containing CEDICT records.
   * @returns {number} A number of words that has some matching CECIDT records.
   * @private
   */
  static _wordsFound (result) {
    return Object.keys(result).filter(key => result[key].length > 0).length
  }

  _createFeature (featureType, values) {
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature(featureType, values, this.languageID)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosChineseLocAdapter);


/***/ }),

/***/ "./adapters/concordance/adapter.js":
/*!*****************************************!*\
  !*** ./adapters/concordance/adapter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_concordance_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/concordance/config.json */ "./adapters/concordance/config.json");
/* harmony import */ var _clAdapters_adapters_concordance_author_work_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/concordance/author-work.json */ "./adapters/concordance/author-work.json");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");






class AlpheiosConcordanceAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_3__.default {
  /**
   * Adapter uploads config data and creates provider
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_concordance_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.ResourceProvider(this.config.url, this.config.rights)
    this.authors = []
  }

  /**
  * This method retrieves a list of available authors and textWorks.
  * For now it uploads data from json file, but later it will fetch data from cordance api
  * @param {Boolean} reload - if true - data will be forced to reload from source
  * @return {Author[]]}
  */
  async getAuthorsWorks (reload = false) {
    try {
      if (reload || this.authors.length === 0) {
        this.authorWorkData = await this.uploadConfig({}, _clAdapters_adapters_concordance_author_work_json__WEBPACK_IMPORTED_MODULE_1__)

        this.authors = []
        for (const authorWorkDataItem of Object.values(this.authorWorkData.authors)) {
          const author = this.createAuthor(authorWorkDataItem)
          this.authors.push(author)
        }
      }
      return this.authors
    } catch (error) {
      this.addError(this.l10n.getMsg('CONCORDANCE_AUTHOR_UPLOAD_ERROR', { message: error.message }))
    }
  }

  /**
  * This method retrieves a list of word usage examples from corcondance api and creates WordUsageExample-s.
  * @param {Homonym} homonym - homonym for retrieving word usage examples
  * @param {Object} filters - { author: {Author}, textWork: {TextWork} } - filter's property for getting data,
  *                           it could be filtered: no filter, by author, by author and textWork
  * @param {Object} pagination - { property: 'max', value: {Integer} } - property for setting max limit for the result
  * @param {Object} sort - { } - it is an empty property for future sort feature
  * @return {Object} - with the following format
  *         {
  *           {WordUsageExample[]} wordUsageExamples - result wordUsageExamples
  *           {String} targetWord - source targetWord
  *           {String} language - source languageCode
  *           {ResourceProvider} provider - provider data
  *         }
  */
  async getWordUsageExamples (homonym, filters = {}, pagination = {}, sort = {}) {
    try {
      const url = this.createFetchURL(homonym, filters, pagination, sort)
      const wordUsageListRes = await this.fetch(url)
      if (Array.isArray(wordUsageListRes)) {
        const parsedWordUsageList = await this.parseWordUsageResult(wordUsageListRes, homonym)
        return {
          wordUsageExamples: parsedWordUsageList,
          targetWord: homonym.targetWord,
          language: alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.LanguageModelFactory.getLanguageCodeFromId(homonym.languageID),
          provider: this.provider
        }
      } else {
        return []
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('CONCORDANCE_WORD_USAGE_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method constructs full url for getting data for getWordUsageExamples method using properties.
  * @param {Homonym} homonym - homonym for retrieving word usage examples
  * @param {Object} filters - { author: {Author}, textWork: {TextWork} } - filter's property for getting data,
  *                           it could be filtered: no filter, by author, by author and textWork
  * @param {Object} pagination - { property: 'max', value: {Integer} } - property for setting max limit for the result
  * @param {Object} sort - { } - it is an empty property for future sort feature
  * @return {String}
  */
  createFetchURL (homonym, filters, pagination, sort) {
    const filterFormatted = this.formatFilter(filters)
    const paginationFormatted = this.formatPagination(pagination)
    return `${this.config.url}${encodeURIComponent(homonym.targetWord)}${filterFormatted}${paginationFormatted}`
  }

  /**
  * This method formats filters property for fetch url.
  * @param {Object} filters - { author: {Author}, textWork: {TextWork} } - filter's property for getting data,
  *                           it could be filtered: no filter, by author, by author and textWork
  * @return {String}
  */
  formatFilter (filters) {
    if (filters && filters.author) {
      if (filters.textWork) {
        return `[${filters.author.ID}:${filters.textWork.ID}]`
      }
      return `[${filters.author.ID}]`
    }
    return ''
  }

  /**
  * This method formats pagination property for fetch url.
  * @param {Object} pagination - { property: 'max', value: {Integer} } - property for setting max limit for the result
  * @return {String}
  */
  formatPagination (pagination) {
    // the PHI service supports two pagination parameters: authmax and max
    // authmax sets the max hits to return per author and max sets the max hits to return over alpheios-data-models
    // max trumps authmax - i.e. only the max number of hits will be returned, and authmax applies after that
    // given that there a finite number of authors, we want to set the values for these differently depending upon whether
    // the request is filtered by author or not - and allowing user specification of the max across all authors probably
    // isn't a good idea, because what we really want in this case is no overall max applied, but that option is not
    // avaliable from the service at the moment
    if (pagination && pagination.property && (pagination.property === 'authmax') && pagination.value) {
      return `?${pagination.property}=${parseInt(pagination.value)}&max=${this.config.maxResultsOverride}`
    } else if (pagination && pagination.property && (pagination.property === 'max') && pagination.value) {
      return `?${pagination.property}=${parseInt(pagination.value)}`
    }
    return ''
  }

  /**
  * This method parses json result from concordance source for word usage examples.
  * @param {Object} jsonObj - json response from url
  * @param {Homonym} homonym - homonym for retrieving word usage examples
  * @param {Author} author - author from filter
  * @param {TextWork} textWork - textWork from filter
  * @return {WordUsageExample[]}
  */
  async parseWordUsageResult (jsonObj, homonym) {
    let wordUsageExamples = [] // eslint-disable-line prefer-const
    let author, textWork, passage

    if (this.authors.length === 0) {
      await this.getAuthorsWorks()
    }

    for (const jsonObjItem of jsonObj) {
      author = this.getAuthorByAbbr(jsonObjItem)
      if (author) {
        textWork = this.getTextWorkByAbbr(author, jsonObjItem)
        if (textWork) {
          passage = this.getPassage(jsonObjItem)

          let wordUsageExample = this.createWordUsageExample(jsonObjItem, homonym, author, textWork, passage) // eslint-disable-line prefer-const
          wordUsageExamples.push(wordUsageExample)
        }
      }
    }
    return wordUsageExamples
  }

  getAuthorByAbbr (jsonObj) {
    if (jsonObj.cit && this.authors.length > 0) {
      const authorAbbr = jsonObj.cit.split('.')[0]
      return this.authors.find(author => Object.values(author.abbreviations).includes(authorAbbr))
    }
    return null
  }

  getTextWorkByAbbr (author, jsonObj) {
    if (jsonObj.cit && author && author.works.length > 0) {
      const parts = jsonObj.cit.split('.')
      // if we have only 2 parts in the citation, it's probably an author without a work
      // which in the phi data is really when the author and work are referenced as the same thing
      // as in an anonymous work
      if (parts.length > 2) {
        const textWorkAbbr = parts[1]
        return author.works.find(textWork => Object.values(textWork.abbreviations).includes(textWorkAbbr))
      }
    }
    return null
  }

  getPassage (jsonObj) {
    let passage = null
    if (jsonObj.cit) {
      const parts = jsonObj.cit.split('.')
      // if we have only 2 parts in the citation, it's probably an author without a work
      // which in the phi data is really when the author and work are referenced as the same thing
      // as in an anonymous work
      if (parts.length === 2) {
        passage = parts.slice(1).join('.')
      } else if (parts.length > 2) {
        passage = parts.slice(2).join('.')
      }
    }
    return passage
  }

  /**
  * This property is used to define prefix fr extract ID
  * @returns {String}
  */
  get defaultIDPrefix () {
    return 'phi'
  }

  /**
  * Method returns Author for given jsonObj (from concordance API)
  * @param {Object} jsonObj - json object with data of the Author
  * @returns {Author}
  */
  createAuthor (jsonObj) {
    let titles = {} // eslint-disable-line prefer-const
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    let abbreviations = {} // eslint-disable-line prefer-const
    jsonObj.abbreviations.forEach(abbrItem => {
      abbreviations[abbrItem['@lang']] = abbrItem['@value'].replace('.', '')
    })

    let author = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Author(jsonObj.urn, titles, abbreviations) // eslint-disable-line prefer-const
    author.ID = this.extractIDFromURNAuthor(author.urn)
    let works = [] // eslint-disable-line prefer-const

    jsonObj.works.forEach(workItem => {
      works.push(this.createTextWork(author, workItem))
    })

    author.works = works
    return author
  }

  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURNAuthor (urn) {
    const partsUrn = urn.split(':')
    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      const workIDPart = partsUrn[3].indexOf('.') === -1 ? partsUrn[3] : partsUrn[3].substr(0, partsUrn[3].indexOf('.'))
      return parseInt(workIDPart.replace(this.defaultIDPrefix, ''))
    }
    return null
  }

  /**
  * Method returns TextWork for given jsonObj (from concordance API)
  * @param {Author} author - author of the textWork
  * @param {Object} jsonObj - json object with data of the TextWork
  * @returns {TextWork}
  */
  createTextWork (author, jsonObj) {
    let titles = {} // eslint-disable-line prefer-const
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    let abbreviations = {} // eslint-disable-line prefer-const
    jsonObj.abbreviations.forEach(abbrItem => {
      abbreviations[abbrItem['@lang']] = abbrItem['@value'].replace('.', '')
    })

    let textWork = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.TextWork(author, jsonObj.urn, titles, abbreviations) // eslint-disable-line prefer-const
    textWork.ID = this.extractIDFromURNTextWork(textWork.urn)
    return textWork
  }

  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURNTextWork (urn) {
    const partsUrn = urn.split(':')

    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      const workIDPart = partsUrn[3].indexOf('.') === -1 ? null : partsUrn[3].substr(partsUrn[3].indexOf('.') + 1)

      return parseInt(workIDPart.replace(this.defaultIDPrefix, ''))
    }
    return null
  }

  /**
  * Creates WordUsageExample object from jsonObj, homonym, author, textWork and link from the adapter config
  * @param {Object} jsonObj - json object from concordance api
  * @param {Homonym} homonym - source homonym object
  * @param {Author} author - source author object, could be undefined
  * @param {TextWork} textWork - source textWork object, could be undefined
  * @param {String} passage - passage string, could be null
  * @returns {WordUsageExample}
  */
  createWordUsageExample (jsonObj, homonym, author, textWork, passage) {
    const source = this.config.sourceTextUrl + jsonObj.link
    let wordUsageExample = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.WordUsageExample( // eslint-disable-line prefer-const
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.LanguageModelFactory.getLanguageCodeFromId(homonym.languageID), jsonObj.target, jsonObj.left, jsonObj.right, source, jsonObj.cit
    )
    wordUsageExample.author = author
    wordUsageExample.textWork = textWork
    wordUsageExample.passage = passage
    wordUsageExample.homonym = homonym
    wordUsageExample.provider = this.provider

    return wordUsageExample
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosConcordanceAdapter);


/***/ }),

/***/ "./adapters/dtsapi/adapter.js":
/*!************************************!*\
  !*** ./adapters/dtsapi/adapter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DTSAPIAdapter)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);




class DTSAPIAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_0__.default {
  /**
   *
   * @param {Object} config - properties for the adapter
   */
  constructor (config = {}) {
    super()
    this.config = {
      baseUrl: config.baseUrl
    }
  }

  /**
   * Retrieves collection
   * @param {String} id - @id for the collection for example urn:alpheios:latinLit, if it is null would be retrieved the root collections
   * @return {Collection}
   */
  async getCollection (id) {
    try {
      const url = this.getCollectionUrl(id)
      const collections = await this.fetch(url)
      if (collections) {
        return this.convertToCollections(collections)
      }
      return false
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Retrieves refs
   * @param {String} id - @id for the Resource for example urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1
   * @param {Collection} collection - would be updated with retrieve data
   *
   */
  async getNavigation (id, resource) {
    try {
      const url = this.getNavigationUrl(id)
      const refs = await this.fetch(url)
      if (refs) {
        this.convertToRefs(refs, resource)
        return resource
      }
      return false
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Retrieves TEI document - by setting ref, start, end
   * @param {String} id - @id for the document for example urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1
   * @param {Object} refParams
   *        {String} ref - a ref for the passage (if defined start and end are ignored)
   *        {String} start - a starting ref from it the text would be retrieved
   *        {String} end - an ending ref till it the text would be retrieved (if it is not defined - would be retrieved till the end of the text)
   * @retunrs {String} - TEI xml document
   */
  async getDocument (id, refParams = {}) {
    try {
      const url = this.getDocumentUrl(id, refParams)
      if (!url) { return }

      const document = await this.fetch(url, { type: 'xml' })
      return document
    } catch (error) {
      this.addError(this.l10n.getMsg('DTSAPI_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting collections
   */
  getCollectionUrl (id) {
    let url = `${this.config.baseUrl}collections`
    if (id) {
      url = `${url}?id=${id}`
    }
    return url
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting resources
   */
  getNavigationUrl (id) {
    let url = `${this.config.baseUrl}navigation`
    if (id) {
      url = `${url}?id=${id}`
    }
    return url
  }

  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting document
   */
  getDocumentUrl (id, refParams) {
    const { ref, start, end } = refParams
    let url = `${this.config.baseUrl}document`
    if (!id || (!ref && !start)) {
      const message = 'getDocumentUrl - not defined id or ref/start'
      this.addError(this.l10n.getMsg('DTSAPI_NO_OBLIGATORY_PROPS', { message }))
      return
    }

    url = `${url}?id=${id}`

    if (ref) { return `${url}&ref=${ref}` }

    url = `${url}&start=${start}`
    if (end) { return `${url}&end=${end}` }

    return url
  }

  /**
   * Converts JSON object to Collection with members
   * @param {Object} collectionsJSON - JSON object retrieved from the remote
   * @returns {Collection}
   */
  convertToCollections (collectionsJSON) {
    const rootCollection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Collection({
      totalItems: collectionsJSON.totalItems,
      title: collectionsJSON.title !== 'None' ? collectionsJSON.title : 'Alpheios',
      id: collectionsJSON['@id'] !== 'default' ? collectionsJSON['@id'] : null,
      baseUrl: this.config.baseUrl,
      description: collectionsJSON.description
    })

    if (collectionsJSON.member) {
      collectionsJSON.member.forEach(collJson => {
        rootCollection.addMember({
          totalItems: collJson.totalItems,
          title: collJson.title,
          id: collJson['@id'],
          type: collJson['@type'],
          description: collJson.description,
          baseUrl: this.config.baseUrl
        })
      })
    }
    return rootCollection
  }

  /**
   * Converts and uploads passage's refs to collection
   * @param {Array[Object]} refs - array of passage's refs - [ { ref: '1' }, { ref: '1a' } .. ]
   * @param {Collection} collection
   */
  convertToRefs (refs, resource) {
    let finalRefs

    if (refs['hydra:member'] && refs['hydra:member'].length > 0) {
      finalRefs = refs['hydra:member'].map(refObj => refObj.ref)
    } else if (refs.member && refs.member.length > 0) {
      finalRefs = refs.member.map(refObj => refObj['dts:ref'])
    }

    if (finalRefs) {
      resource.uploadRefs({
        refs: finalRefs,
        passage: refs.passage ? refs.passage : refs['dts:passage']
      })
    }
    return true
  }
}


/***/ }),

/***/ "./adapters/lexicons/adapter.js":
/*!**************************************!*\
  !*** ./adapters/lexicons/adapter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! papaparse */ "papaparse");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _clAdapters_adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/adapters/lexicons/config.json */ "./adapters/lexicons/config.json");






let cachedDefinitions = new Map() // eslint-disable-line prefer-const
let uploadStarted = new Map() // eslint-disable-line prefer-const

class AlpheiosLexiconsAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__.default {
  /**
  * Lexicons adapter uploads config data, defines default options and inits data
  * @param {Object} config - lexicon adapter properties
  * @param {Object} remoteConfig - remote lexicon service configuration
  *                                merges with and overrides the lexicon
  *                                settings in the local config.json,
  *                                if present and populated. An empty object
  *                                signifies that there are no overrides
  */
  constructor (config = {}, remoteConfig = {}) {
    super()
    this.config = config
    this.config.lexicons = this.uploadConfig(remoteConfig, _clAdapters_adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
    this.async = Boolean(this.config.callBackEvtSuccess)
  }

  /**
  * This method retrieves short definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchShortDefs (homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, 'short')
  }

  /**
  * This method retrieves full definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchFullDefs (homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, 'full')
  }

  /**
  * This method creates Promise for getting short definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareShortDefPromise (homonym, urlKey) {
    const url = this.config.lexicons[urlKey].urls.short
    const requestType = 'shortDefs'

    const resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const res = cachedDefinitions.get(url)
          await this.updateShortDefs(res, homonym, this.config.lexicons[urlKey])
          this.prepareSuccessCallback(requestType, homonym)
        }
      },
      error => {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
        this.prepareFailedCallback(requestType, homonym)
      }
    )
  }

  /**
  * This method creates Promise for getting full definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareFullDefPromise (homonym, urlKey) {
    const url = this.config.lexicons[urlKey].urls.index
    const requestType = 'fullDefs'

    const resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config.lexicons[urlKey])
          const resFullDefs = this.updateFullDefsAsync(fullDefsRequests, this.config.lexicons[urlKey], homonym)
          resFullDefs.catch(error => {
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
            this.prepareFailedCallback(requestType, homonym)
          })
        }
      },
      error => {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
        this.prepareFailedCallback(requestType, homonym)
      }
    )
  }

  /**
  * This method checks if there is a callBackEvtSuccess defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareSuccessCallback (requestType, homonym) {
    if (this.config.callBackEvtSuccess) {
      this.config.callBackEvtSuccess.pub({
        requestType: requestType,
        homonym: homonym
      })
    }
  }

  /**
  * This method checks if there is a callBackEvtFailed defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareFailedCallback (requestType, homonym) {
    if (this.config.callBackEvtFailed) {
      this.config.callBackEvtFailed.pub({
        requestType: requestType,
        homonym: homonym
      })
    }
  }

  /**
  * This is a generic method that retrieves definitions for homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */
  async fetchDefinitions (homonym, options, lookupFunction) {
    Object.assign(this.options, options)
    if (!this.options.allow || this.options.allow.length === 0) {
      this.addError(this.l10n.getMsg('LEXICONS_NO_ALLOWED_URL'))
      return
    }

    if (this.async) {
      return this.fetchDefsAsync(homonym, lookupFunction)
    } else {
      if (lookupFunction === 'short') {
        return this.fetchShortDefsSync(homonym)
      } else if (lookupFunction === 'full') {
        return this.fetchFullDefsSync(homonym)
      }
    }
  }

  /**
  * This is a sync method that retrieves short definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchShortDefsSync (homonym) {
    try {
      const languageID = homonym.lexemes[0].lemma.languageID
      const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

      for (const urlKey of urlKeys) {
        const url = this.config.lexicons[urlKey].urls.short
        const result = await this.checkCachedData(url)

        if (result) {
          const res = cachedDefinitions.get(url)
          await this.updateShortDefs(res, homonym, this.config.lexicons[urlKey])
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
    }
  }

  /**
  * This is a sync method that retrieves full definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchFullDefsSync (homonym) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (const urlKey of urlKeys) {
      const url = this.config.lexicons[urlKey].urls.index
      const result = await this.checkCachedData(url)

      if (result) {
        const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config.lexicons[urlKey])
        await this.updateFullDefs(fullDefsRequests, this.config.lexicons[urlKey], homonym)
      }
    }
  }

  /**
  * This is an async method that retrieves definitions for homonym with getting result inside callbacks
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */

  fetchDefsAsync (homonym, lookupFunction) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (const urlKey of urlKeys) {
      if (lookupFunction === 'short') {
        this.prepareShortDefPromise(homonym, urlKey, lookupFunction)
      }
      if (lookupFunction === 'full') {
        this.prepareFullDefPromise(homonym, urlKey, lookupFunction)
      }
    }
  }

  /**
  * This method checks if data from url is already cached and if not - it uploads data from url to cache
  * @param {String} url - url from what we need to cache data
  * @param {Null|Map|String} externalData - data that would be used as fixture for the url
  * @param {Boolean} skipFetch - when this check is true, then fetch would not be execute in any case, it is used for Full Definitions
  * @return {Boolean} - true - if cached is successed
  */
  async checkCachedData (url, externalData = null, skipFetch = false) {
    if (!externalData && skipFetch) {
      return false
    }
    if (!cachedDefinitions.has(url) && !uploadStarted.has(url)) {
      try {
        uploadStarted.set(url, true)

        let data = externalData
        if (!externalData) {
          const unparsed = await this.fetch(url, { type: 'xml', timeout: this.options.timeout })
          const parsed = papaparse__WEBPACK_IMPORTED_MODULE_1___default().parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
          data = this.fillMap(parsed.data)
        }

        cachedDefinitions.set(url, data)
        uploadStarted.set(url, false)
      } catch (error) {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error.message }))
        uploadStarted.set(url, false)
        return false
      }
    } else if (uploadStarted.has(url) && uploadStarted.get(url)) {
      setTimeout(() => {
        this.checkCachedData(url)
      }, this.options.timeout)
    }
    return true
  }

  /**
  * This method searches for definitions in cached text, creates definitions and updates lexemes
  * @param {Map} data - cached data from definition's url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  */
  async updateShortDefs (data, homonym, config) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageModel(languageID)

    for (let lexeme of homonym.lexemes) { // eslint-disable-line prefer-const
      const deftexts = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (deftexts) {
        for (const d of deftexts) {
          const text = d.field1
          const providerCode = d.field2
          const format = config.format && config.format.short ? config.format.short : 'text/plain'
          try {
            let rightsText = config.rights
            let rightsUri = config.urls.short
            if (providerCode && config.rights_keys && config.rights_keys[providerCode]) {
              rightsUri = rightsUri + `#${providerCode}`
              rightsText = config.rights_keys[providerCode]
            }
            const provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider(rightsUri, rightsText)
            const def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Definition(text, config.langs.target, format, lexeme.lemma.word)
            const definition = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider, def)
            lexeme.meaning.appendShortDefs(definition)
          } catch (error) {
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
            continue
          }
        }
      } else {
        const url = config.urls.short
        this.addError(this.l10n.getMsg('LEXICONS_NO_DATA_FROM_URL', { url: url }))
        this.prepareFailedCallback('shortDefs', homonym)
      }
    }
  }

  /**
  * This method creates requests to full definitions url for each lexeme and given config
  * @param {Map} data - cached data from definition's index url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  * @return {[String]} - array of urls for retrieving data
  */
  collectFullDefURLs (data, homonym, config) {
    const languageID = homonym.lexemes[0].lemma.languageID
    const model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageModel(languageID)
    const urlFull = config.urls.full

    if (!urlFull) {
      this.addError(this.l10n.getMsg('LEXICONS_NO_FULL_URL'))
      return
    }

    let requests = [] // eslint-disable-line prefer-const
    for (const lexeme of homonym.lexemes) {
      const ids = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (urlFull && ids) {
        for (const id of ids) {
          requests.push({ url: `${urlFull}&n=${id.field1}`, lexeme: lexeme })
        }
      } else if (urlFull) {
        requests.push({ url: `${urlFull}&l=${encodeURIComponent(lexeme.lemma.word)}`, lexeme: lexeme })
      }
    }
    return requests
  }

  /**
  * This method fetches data from request and update homonym with full definition - it is made as Promises with calback to make it parallel
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefsAsync (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) { // eslint-disable-line prefer-const
      let fullDefDataRes
      if (cachedDefinitions.has(request.url)) {
        fullDefDataRes = new Promise((resolve, reject) => resolve(cachedDefinitions.get(request.url)))
      } else {
        fullDefDataRes = this.fetch(request.url, { type: 'xml' })
      }

      fullDefDataRes.then(
        async (fullDefData) => {
          if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
            const error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
            this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error }))
            this.prepareFailedCallback('fullDefs', homonym)
          } else {
            const provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider(config.urls.full, config.rights)
            const def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Definition(fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
            const definition = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider, def)
            request.lexeme.meaning.appendFullDefs(definition)
            this.prepareSuccessCallback('fullDefs', homonym)
          }
        },
        error => {
          this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
        }
      )
    }
  }

  /**
  * This method fetches data from request and update homonym with full definition synchronously
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefs (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) { // eslint-disable-line prefer-const
      let fullDefData
      if (cachedDefinitions.has(request.url)) {
        fullDefData = cachedDefinitions.get(request.url)
      } else {
        fullDefData = await this.fetch(request.url, { type: 'xml' })
      }

      try {
        if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
          const error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
          this.addError(this.l10n.getMsg('LEXICONS_FAILED_CACHED_DATA', { message: error }))
        } else {
          const provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider(config.urls.full, config.rights)
          const def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Definition(fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
          const definition = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider, def)
          request.lexeme.meaning.appendFullDefs(definition)
        }
      } catch (error) {
        this.addError(this.l10n.getMsg('LEXICONS_FAILED_APPEND_DEFS', { message: error.message }))
      }
    }
  }

  /*
  * This method retrieves urls from config for given languageCode
  * @param {Symbol} languageID
  */
  getRequests (languageID) {
    const languageCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(languageID)
    return Object.keys(this.config.lexicons).filter(url =>
      this.config.lexicons[url] && this.config.lexicons[url].langs &&
      this.config.lexicons[url].langs.source === languageCode)
  }

  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  fillMap (rows) {
    let data = new Map() // eslint-disable-line prefer-const
    for (const row of rows) {
      const def = { field1: row[1], field2: null }
      if (row.length > 2) {
        def.field2 = row[2]
      }
      if (data.has(row[0])) {
        data.get(row[0]).push(def)
      } else {
        data.set(row[0], [def])
      }
    }
    return data
  }

  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data inddex
   * @param {Lemma} lemma the lemma to lookupInDataIndex
   * @param {LanguageModel} model a language model for language specific methods
   * @return {string} the index entry as a text string
   */
  lookupInDataIndex (data, lemma, model) {
    // legacy behavior from Alpheios lemma data file indices
    // first look to see if we explicitly have an instance of this lemma
    // with capitalization retained
    let found

    let alternatives = []
    let altEncodings = [] // eslint-disable-line prefer-const
    for (const l of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l)
      for (const a of model.alternateWordEncodings({ word: l, preserveCase: true })) {
        // we gather altEncodings separately because they should
        // be tried last after the lemma and principalParts in their
        // original form
        altEncodings.push(a)
      }
      const nosense = l.replace(/_?\d+$/, '')
      if (l !== nosense) {
        alternatives.push(nosense)
      }
    }
    alternatives = [...alternatives, ...altEncodings]
    for (const lookup of alternatives) {
      // let's first just look for the word in its supplied case
      found = false
      if (data && lookup) {
        found = data.get(lookup)

        // and if we don't find it, then try lower case
        if (!found) {
          found = data.get(lookup.toLocaleLowerCase())
        }

        if (found) {
          found = this._lookupSpecial(data, lookup, found)
        }
        if (found) {
          break
        }
      }
    }

    // if we still don't have a match, we can do a last ditch check without
    // any diacritics at all in those languages that support it
    if (!found) {
      let lastAlt = [] // eslint-disable-line prefer-const
      for (const l of [lemma.word, ...lemma.principalParts]) {
        const strippedAll = model.alternateWordEncodings({
          word: l,
          encoding: 'strippedAll',
          preserveCase: true
        })
        if (strippedAll.length > 0) {
          lastAlt.push(strippedAll[0])
        }
      }
      if (lastAlt.length > 0) {
        for (const l of lastAlt) {
          for (let entry of data.entries()) { // eslint-disable-line prefer-const
            // a normal lookup in the dataset map would only return
            // an entry preceding with '@' as a result of the _lookupSpecial
            // test but because we are looping through and testing each entry
            // the test on case without any diacritics will find those matches
            // and we need to remove the @ flag to make sure it doesn't fail them
            const originalKey = entry[0].replace(/^@/, '')
            const value = entry[1]
            const strippedKey = model.alternateWordEncodings({
              word: originalKey,
              encoding: 'strippedAll',
              preserveCase: true
            })
            if (strippedKey.length > 0 && strippedKey[0] === l) {
              found = this._lookupSpecial(data, originalKey, value)
              if (found) {
                break
              }
            }
          }
          if (found) {
            break
          }
        }
      }
    }
    return found
  }

  /**
   * When we created the lexicon indices we normalized the lemmas
   * as all lower case and applied some additional character normalizations
   * in the case of homonyms however, sometimes the normalization meant 1
   * index entry for two distinct words. In these cases, we created a "special"
   * syntax, whereby we set the value of the normalized index entry to '@'
   * which mean to look for the word under it's pre-normalized entry,
   * which was kept and made available in an entry prefixed with '@'
   * @param {Map} data the dataset to search in
   * @param {lookup} lookup the original pre-normalized lemma
   * @param {lemmas} the value returned by the lookup on the normalized lemma
   **/
  _lookupSpecial (data, lookup, lemmas) {
    if (lemmas.length === 1 && lemmas[0].field1 === '@') {
      return data.get(`@${lookup}`)
    } else {
      return lemmas
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosLexiconsAdapter);


/***/ }),

/***/ "./adapters/logeion/adapter.js":
/*!*************************************!*\
  !*** ./adapters/logeion/adapter.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_logeion_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/logeion/config.json */ "./adapters/logeion/config.json");
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);





class AlpheiosLogeionAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__.default {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_logeion_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.limit = parseInt(this.config.limit)
    this.available = this.config.availableLangs.includes(this.config.lang)
    this.sourceData = config.sourceData
    this.fetchOptions = config.fetchOptions
  }

  /**
  * This method retrieves a list of words for lookup autocomplete
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of words
  */
  async getWords (text) {
    try {
      const url = this.createFetchURL(text)
      if (!url) {
        this.addError(this.l10n.getMsg('LOGEION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const wordsVariants = await this.fetch(url)

        if (wordsVariants.words && Array.isArray(wordsVariants.words)) {
          return this.filterAndLimitWords(wordsVariants.words)
        } else {
          return []
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('LOGEION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method constructs full url for getting words
  * @param {String} text - text for retrieving variants
  * @return {String}
  */
  createFetchURL (text) {
    if (this.fetchOptions) {
      return `${this.fetchOptions.baseurl}?key=${this.fetchOptions.apikey}&q=${text}&lang=${this.logeionLangCode}`
    }
  }

  get logeionLangCode () {
    if (this.config.lang === alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.STR_LANG_CODE_GRC) {
      return 'greek'
    } else if ([alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.STR_LANG_CODE_LAT, alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Constants.STR_LANG_CODE_LA].includes(this.config.lang)) {
      return 'latin'
    }
  }

  /**
  * This method removes words from the other language - checks two variants - greek and the other
  * @param {[Array]} words - list of words that should be checked and filtered
  * @return {Array}
  */
  filterAndLimitWords (words) {
    const finalWords = []
    const model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.LanguageModelFactory.getLanguageModelFromCode(this.config.lang)
    const otherModels = []
    this.config.availableLangs.forEach(lang => {
      const modelLang = alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.LanguageModelFactory.getLanguageModelFromCode(lang)
      if (lang !== this.config.lang && modelLang.isValidUnicode) {
        otherModels.push(modelLang)
      }
    })

    for (let i = 0; i < words.length; i++) {
      if ((model.isValidUnicode && model.isValidUnicode(words[i])) ||
          (!model.isValidUnicode && otherModels.every(modelLang => !modelLang.isValidUnicode(words[i])))) {
        finalWords.push(words[i])
      }

      if (finalWords.length === this.limit) {
        break
      }
    }
    return finalWords
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosLogeionAdapter);


/***/ }),

/***/ "./adapters/tokenization/adapter.js":
/*!******************************************!*\
  !*** ./adapters/tokenization/adapter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_tokenization_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/tokenization/config.json */ "./adapters/tokenization/config.json");
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);





class AlpheiosTokenizationAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__.default {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_tokenization_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.available = true
    this.sourceData = config.sourceData
    this.fetchOptions = this.config.fetchOptions
    this.storage = this.config.storage
  }

  /**
  * This method uploads segments data with tokens from tokenization service
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of segments
  */
  async getTokens (text) {
    try {
      const requestParams = {
        method: 'POST',
        headers: this.defineContentType(),
        body: text
      }

      const url = this.createTokenizeFetchURL()
      if (!url) {
        this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_OPTIONS_ERROR'))
        return
      }

      if (this.sourceData) {
        return this.sourceData
      } else {
        const segments = await this.fetch(url, { requestParams })
        return segments
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
  * This method uploads default config data from tokenization service
  * @return {Array} - array of settings
  */
  async getConfig () {
    try {
      const url = this.createConfigFetchURL()
      if (!url) {
        this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_OPTIONS_ERROR'))
        return
      }

      let configData
      if (this.sourceData) {
        configData = this.sourceData
      } else {
        configData = await this.fetch(url)
      }
      return this.formatSettings(configData)
    } catch (error) {
      this.addError(this.l10n.getMsg('TOKENIZATION_FETCH_ERROR', { message: error.message }))
    }
  }

  /**
   * Converts JSON response to Options for text and tei
   * @param {Object} configData - Response from config fetch request
   */
  formatSettings (configData) {
    return {
      tei: this.convertToOptions(configData, 'tei'),
      text: this.convertToOptions(configData, 'text')
    }
  }

  /**
   *
   * @param {Object} configData Response from config fetch request
   * @param {String} textType - tei/text
   */
  convertToOptions (configData, textType) {
    const configDataPath = configData.paths[`/tokenize/${textType}`].post

    const exludeParameters = ['lang', 'direction']
    const dataFormatted = {
      domain: `alpheios-remote-tokenization-${textType}`,
      version: configData.info.version,
      description: configDataPath.description,
      items: {}
    }
    configDataPath.parameters.filter(param => (param.in === 'query') && !exludeParameters.includes(param.name)).forEach(param => {
      const result = {
        defaultValue: param.schema.default,
        labelText: param.description,
        select: Boolean(param.schema.enum),
        boolean: param.schema.type === 'boolean'
      }
      if (result.select) {
        result.values = param.schema.enum.map(val => { return { value: val, text: val } })
      }

      dataFormatted.items[param.name] = result
    })
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__.Options(dataFormatted, new this.storage(dataFormatted.domain)) // eslint-disable-line new-cap
  }

  /**
  * This method constructs full url for getting tokenize data
  * @return {String}
  */
  createTokenizeFetchURL () {
    if (this.fetchOptions) {
      if (!this.fetchOptions.lang || !this.fetchOptions.sourceType) {
        return
      }
      const exclude = ['baseUrl', 'sourceType', 'tokenizer']

      let url = `${this.fetchOptions.baseUrl}tokenize/${this.fetchOptions.sourceType}`
      let wasFirst = false

      Object.keys(this.fetchOptions).forEach(option => {
        if ((exclude.indexOf(option) === -1) && (this.fetchOptions[option] !== undefined)) {
          let sign = '&'
          if (!wasFirst) {
            sign = '?'
            wasFirst = true
          }
          url = `${url}${sign}${option}=${this.fetchOptions[option]}`
        }
      })

      return url
    }
  }

  /**
  * This method constructs full url for getting config data
  * @return {String}
  */
  createConfigFetchURL () {
    return this.fetchOptions.baseUrl
  }

  /**
   * This method defines type of Content-Type based on the source text type
   * @returns {Object} - { 'Content-Type':  <mime type> }
   */
  defineContentType () {
    if (this.fetchOptions.sourceType === 'tei') {
      return { 'Content-Type': 'application/xml' }
    }
    return { 'Content-Type': 'text/plain' }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosTokenizationAdapter);


/***/ }),

/***/ "./adapters/translations/adapter.js":
/*!******************************************!*\
  !*** ./adapters/translations/adapter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/translations/config.json */ "./adapters/translations/config.json");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");





class AlpheiosLemmaTranslationsAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__.default {
  /**
   * Adapter uploads config data, creates provider and inits mapLangUri (Object for storing data for available languages)
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.mapLangUri = {}
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.ResourceProvider(this.config.url, this.config.rights)
    this.sourceData = config.sourceData
  }

  /**
   * This method updates homonym with retrieved translations, if an error occurs it will be added to errors property of an adapter
   * @param {Homonym} homonym
   * @param {String} browserLang - language of the translation (for example its, spa)
  */
  async getTranslationsList (homonym, browserLang) {
    let lemmaList = [] // eslint-disable-line prefer-const
    if (!homonym || !homonym.lexemes) {
      this.addError(this.l10n.getMsg('TRANSLATION_INCORRECT_LEXEMES'))
      return
    }

    for (const lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    const inLang = alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.LanguageModelFactory.getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID)
    const outLang = this.config.langMap[browserLang] || this.config.defaultLang

    const input = this.prepareInput(lemmaList)

    if (!input) {
      this.addError(this.l10n.getMsg('TRANSLATION_INPUT_PREPARE_ERROR', { input: input.toString() }))
      return
    }

    try {
      const urlLang = await this.getAvailableResLang(inLang, outLang)
      if (urlLang && urlLang.constructor.name === 'AdapterError') {
        return
      }

      if (input && urlLang) {
        try {
          const url = urlLang + '?input=' + input
          let translationsList
          if (this.sourceData && this.sourceData.translations) {
            translationsList = this.sourceData.translations
          } else {
            translationsList = await this.fetch(url)
          }
          if (translationsList && translationsList.constructor.name === 'AdapterError') {
            return
          }

          for (const lemma of lemmaList) {
            alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Translation.loadTranslations(lemma, outLang, translationsList, this.provider)
          }
        } catch (error) {
          this.addError(this.l10n.getMsg('TRANSLATION_UNKNOWN_ERROR', { message: error.message }))
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('TRANSLATION_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  /**
   * This method creates a string with unique lemma's words form lemmas list
   * @param {[Lemma]} lemmaList
  */
  prepareInput (lemmaList) {
    const inputList = lemmaList.map(lemma => encodeURIComponent(lemma.word)).filter((item, index, self) => self.indexOf(item) === index)
    return inputList.length > 0 ? inputList.join(',') : undefined
  }

  /**
   * This method fetches an url for translation
   * @param {String} inLang  - translate from language  (for example, lat)
   * @param {String} outLang  - translate to language  (for example, es, it)
  */
  async getAvailableResLang (inLang, outLang) {
    if (this.mapLangUri[inLang] === undefined) {
      const urlAvaLangsRes = this.config.url + '/' + inLang + '/'

      let unparsed

      if (!this.sourceData || !this.sourceData.langs) {
        unparsed = await this.fetch(urlAvaLangsRes)
      } else {
        unparsed = this.sourceData.langs
      }

      if (unparsed && unparsed.constructor.name === 'AdapterError') {
        return unparsed
      }

      let mapLangUri = {} // eslint-disable-line prefer-const
      unparsed.forEach(function (langItem) {
        mapLangUri[langItem.lang] = langItem.uri
      })

      if (Object.keys(mapLangUri).length > 0) {
        this.mapLangUri[inLang] = mapLangUri
      }
    }

    return this.mapLangUri[inLang] ? this.mapLangUri[inLang][outLang] : undefined
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosLemmaTranslationsAdapter);


/***/ }),

/***/ "./adapters/tufts/adapter.js":
/*!***********************************!*\
  !*** ./adapters/tufts/adapter.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _clAdapters_transformers_alpheios_lexicon_transformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/transformers/alpheios-lexicon-transformer */ "./transformers/alpheios-lexicon-transformer.js");
/* harmony import */ var _clAdapters_adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/adapters/tufts/config.json */ "./adapters/tufts/config.json");
/* harmony import */ var _clAdapters_adapters_tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engines-set */ "./adapters/tufts/engines-set.js");








class AlpheiosTuftsAdapter extends _clAdapters_adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__.default {
  /**
   * Tufts adapter uploads config data, uploads available engines and creates EnginesSet from them
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _clAdapters_adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.uploadEngines(this.config.engine)
    this.engineSet = new _clAdapters_adapters_tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__.default(this.engines)
    this.sourceData = config.sourceData
  }

  /**
   * This method creates engines object with the following format:
   * LanguageID: array of available engines from config files, for example Symbol(Latin): ["whitakerLat"]
   * @param {Object} engineConfig - engines config data
  */
  uploadEngines (engineConfig) {
    if (this.engine === undefined) {
      this.engines = {}
    }
    Object.keys(engineConfig).forEach(langCode => {
      const langID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageIdFromCode(langCode)

      if (langID !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Constants.LANG_UNDEFINED && this.engines[langID] === undefined) {
        this.engines[langID] = engineConfig[langCode]
      }
    })
  }

  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - a word for getting homonym
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym (languageID, word) {
    let res
    try {
      if (this.sourceData) {
        res = this.sourceData
      } else {
        const url = this.prepareRequestUrl(languageID, word)
        if (!url) {
          this.addError(this.l10n.getMsg('MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE', { languageID: languageID.toString() }))
          return
        }
        res = await this.fetch(url)
        if (res.constructor.name === 'AdapterError') {
          return
        }
      }

      if (res) {
        const mappingData = this.engineSet.getEngineByCode(languageID)
        if (!mappingData) {
          this.addError(this.l10n.getMsg('MORPH_TRANSFORM_NO_MAPPING_DATA', { language: languageID.toString() }))
          return
        }
        const transformAdapter = new _clAdapters_transformers_alpheios_lexicon_transformer__WEBPACK_IMPORTED_MODULE_2__.default(this, mappingData, this)
        let homonym = transformAdapter.transformData(res, word) // eslint-disable-line prefer-const

        if (!homonym) {
          this.addError(this.l10n.getMsg('MORPH_NO_HOMONYM', { word: word, languageID: languageID.toString() }))
          return
        }

        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lexeme.getSortByTwoLemmaFeatures(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.frequency, alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part))
        }

        return homonym
      }
    } catch (error) {
      this.addError(this.l10n.getMsg('MORPH_UNKNOWN_ERROR', { message: error.message }))
    }
  }

  /**
   * This method creates url with url from config and chosen engine
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - a word for getting homonym
   * Returned url:
   *     - {String} - constructed url for getting data from Tufts if engine is correct
   *     - {null} - if engine is not correct
  */
  prepareRequestUrl (languageID, word) {
    const langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(languageID)
    const engine = this.engineSet.getEngineByCode(languageID)

    if (engine) {
      const code = engine.engine
      return this.config.url.replace('r_WORD', encodeURIComponent(word)).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosTuftsAdapter);


/***/ }),

/***/ "./adapters/tufts/engine/aramorph.js":
/*!*******************************************!*\
  !*** ./adapters/tufts/engine/aramorph.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



const data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.ArabicLanguageModel, 'aramorph')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engine/hazm.js":
/*!***************************************!*\
  !*** ./adapters/tufts/engine/hazm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.PersianLanguageModel, 'hazm') // eslint-disable-line prefer-const

// hazm allow all lemmas in without respect features as all we use it for is lemmatizing
data.setLexemeFilter(function (lexeme) { return Boolean(lexeme.lemma.word) })

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engine/morpheusgrc.js":
/*!**********************************************!*\
  !*** ./adapters/tufts/engine/morpheusgrc.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.GreekLanguageModel, 'morpheusgrc') // eslint-disable-line prefer-const

data.inflectionOverrides = {
  // Morpheus uses 'irregular' as pofs for some pronouns, override with lemma
  // the dictionary entry's conjugation if it's available
  [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part]: (i, ls) => {
    return {
      withLemma: i[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part].value === alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.TYPE_IRREGULAR && ls.some(l => l.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part].value === alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.POFS_PRONOUN),
      withFeature: null
    }
  },
  // for some irregular adjectives, the compartive is only specified in the morph flags
  [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.comparison]: (i, ls) => {
    const retVal = {
      withLemma: false,
      withFeature: null
    }
    if (i[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.morph].value === 'irreg_comp' &&
      ls.some(l => l.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part].value === alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.POFS_ADJECTIVE)) {
      retVal.withFeature = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.comparison, alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.COMP_COMPARITIVE, alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.GreekLanguageModel.languageID)
    } else if (i[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.morph].value === 'irreg_superl' &&
      ls.some(l => l.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part].value === alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.POFS_ADJECTIVE)) {
      retVal.withFeature = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.comparison, alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.COMP_SUPERLATIVE, alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.GreekLanguageModel.languageID)
    }
    return retVal
  }
}
/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.gender).importer
  .map('masculine feminine', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_FEMININE, 2]])

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.declension).importer
  .map('1st & 2nd', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.ORD_1ST, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.ORD_2ND, 2]])

data.setPropertyParser(function (propertyName, propertyValue, inputElem) {
  let propertyValues = []
  if (propertyName === 'decl') {
    propertyValues = propertyValue.split('&').map((p) => p.trim())
  } else if (propertyName === 'comp' && propertyValue === 'positive') {
    propertyValues = []
  } else if (propertyName === 'pofs' && propertyValue === 'irregular' &&
    inputElem.hdwd && inputElem.hdwd.$ === 'τίς') {
    propertyValues = [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.POFS_PRONOUN]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engine/sedra.js":
/*!****************************************!*\
  !*** ./adapters/tufts/engine/sedra.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



const data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.SyriacLanguageModel, 'sedra')

// allow lexemes  if they have at least a meaning or a part of speech
data.setLexemeFilter(function (lexeme) {
  return Boolean(lexeme.meaning.shortDefs.length > 0 ||
    lexeme.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.part])
})

//
data.setMeaningParser(function (meaning, targetWord) {
  const lang = meaning.lang ? meaning.lang : alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.STR_LANG_CODE_ENG
  const meaningText = meaning.$ || ''
  return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Definition(meaningText, lang, 'text/html', targetWord)
})

data.setPropertyParser(function (propertyName, propertyValue, inputElem) {
  let propertyValues = []
  if (propertyName === 'paradigm') {
    // state has some extra "" around values
    propertyValues = [propertyValue.replace(/"/g, '')]
  } else if (propertyName === 'src') {
    // replace the '[from sedra.bethmardutho.org, accessed on XXXXX]' as duplicative
    // with rights
    propertyValues = [propertyValue.replace(/\[from sedra.bethmardutho.org, .*?\]/g, '')]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engine/traces.js":
/*!*****************************************!*\
  !*** ./adapters/tufts/engine/traces.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



const data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.GeezLanguageModel, 'traces')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engine/whitakers.js":
/*!********************************************!*\
  !*** ./adapters/tufts/engine/whitakers.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/transformers/import-morph-data.js */ "./transformers/import-morph-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



const data = new _clAdapters_transformers_import_morph_data_js__WEBPACK_IMPORTED_MODULE_0__.default(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.LatinLanguageModel, 'whitakerLat')

// Whitaker's has weird inflection data for conjugation, we prefer
// the dictionary entry's conjugation if it's available
data.inflectionOverrides = {
  [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.conjugation]: (i, ls) => {
    return {
      withLemma: true,
      withFeature: null
    }
  }
}

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */

// TODO  - per inflections.xsd
// Whitakers Words uses packon and tackon in POFS, not sure how

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.gender).importer
  .map('common', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_FEMININE, 2]])
  .map('all', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_FEMININE, 2], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.GEND_NEUTER, 3]])

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.tense).importer
  .map('future_perfect', alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.TENSE_FUTURE_PERFECT)

data.setPropertyParser(function (propertyName, propertyValue, inputElem) {
  let propertyValues = []
  if (propertyName === 'decl') {
    propertyValues = propertyValue.split('&').map((p) => p.trim())
  } else if (propertyName === 'comp' && propertyValue === 'positive') {
    propertyValues = []
  } else if (propertyName === 'conj' && propertyValue.match(/5th|6th|7th|8th/)) {
    // these are irregular verbs
    propertyValues = [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Constants.TYPE_IRREGULAR]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

data.setLexemeAggregator(function (lexemeSet, inflections) {
  let lexemes = [] // eslint-disable-line prefer-const
  for (let lex of lexemeSet) { // eslint-disable-line prefer-const
    if (this.reportLexeme(lex)) {
      if (lex.meaning.shortDefs.length === 0 && lexemeSet.length > 1) {
        for (let otherLex of lexemeSet) { // eslint-disable-line prefer-const
          // same headword and same part of speech
          if (otherLex.meaning.shortDefs.length > 0 && otherLex.lemma.isFullHomonym(lex.lemma)) {
            let featuresMatch = true
            for (const feature of Object.entries(lex.lemma.features)) {
              // check the other features excluding frequency, source and age
              if ((feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.frequency) &&
                   (feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.source) &&
                   (feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.age) &&
                   !(feature[1].isEqual(otherLex.lemma.features[feature[0]]))) {
                featuresMatch = false
                break
              }
            }
            // same lemma, same features, must be principal parts mismatch
            if (featuresMatch) {
              // if this lemma has a higher frequency, make it the main lemma of the Lexeme and the existing one an alternative
              if (lex.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.frequency].compareTo(otherLex.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Feature.types.frequency]) < 1) {
                otherLex.addAltLemma(otherLex.lemma)
                otherLex.lemma = lex.lemma
              } else {
                // otherwise just add it to the alternative lemmas
                otherLex.addAltLemma(lex.lemma)
              }
            } else {
              lex.inflections = inflections.map(inflection => inflection.clone())
              lexemes.push(lex)
            }
          }
        }
      } else {
        lex.inflections = inflections.map(inflection => inflection.clone())
        lexemes.push(lex)
      }
    }
  }
  return lexemes
}
)

data.setLemmaParser(function (lemma) {
  // Whitaker's Words returns principal parts for some words
  // and sometimes has a space separted stem and suffix
  let parsed, primary
  let parts = [] // eslint-disable-line prefer-const
  const lemmas = lemma.split(', ')
  for (const [index, l] of lemmas.entries()) {
    const normalized = l.split(' ')[0]
    if (index === 0) {
      primary = normalized
    }
    parts.push(normalized)
  }
  if (primary) {
    parsed = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__.Lemma(primary, this.model.languageCode, parts)
  }

  return parsed
})

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);


/***/ }),

/***/ "./adapters/tufts/engines-set.js":
/*!***************************************!*\
  !*** ./adapters/tufts/engines-set.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/whitakers */ "./adapters/tufts/engine/whitakers.js");
/* harmony import */ var _clAdapters_adapters_tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/morpheusgrc */ "./adapters/tufts/engine/morpheusgrc.js");
/* harmony import */ var _clAdapters_adapters_tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/aramorph */ "./adapters/tufts/engine/aramorph.js");
/* harmony import */ var _clAdapters_adapters_tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/hazm */ "./adapters/tufts/engine/hazm.js");
/* harmony import */ var _clAdapters_adapters_tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/traces */ "./adapters/tufts/engine/traces.js");
/* harmony import */ var _clAdapters_adapters_tufts_engine_sedra__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clAdapters/adapters/tufts/engine/sedra */ "./adapters/tufts/engine/sedra.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_6__);









class EnginesSet {
  /**
   * @param {Object} adapterConfigEngines - it is the following format - Symbol(Latin): ["whitakerLat"]
  */
  constructor (adapterConfigEngines) {
    this.engine = adapterConfigEngines
  }

  /**
   * This method returns engine class by languageID
   * @param {Symbol} languageID
   * @return {Engine Class}
  */
  getEngineByCode (languageID) {
    if (this.engine[languageID]) {
      const engineCode = this.engine[languageID][0]
      const allEngines = new Map(([_clAdapters_adapters_tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__.default, _clAdapters_adapters_tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__.default, _clAdapters_adapters_tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__.default, _clAdapters_adapters_tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__.default, _clAdapters_adapters_tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__.default, _clAdapters_adapters_tufts_engine_sedra__WEBPACK_IMPORTED_MODULE_5__.default]).map((e) => { return [e.engine, e] }))
      return allEngines.get(engineCode)
    }
  }

  /**
   * This method returns engine class by languageCode
   * @param {String} languageCode
   * @return {Engine Class}
  */
  getEngineByCodeFromLangCode (languageCode) {
    const languageID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_6__.LanguageModelFactory.getLanguageIdFromCode(languageCode)
    return this.getEngineByCode(languageID)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EnginesSet);


/***/ }),

/***/ "./client-adapters.js":
/*!****************************!*\
  !*** ./client-adapters.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clAdapters_adapters_tufts_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/adapters/tufts/adapter */ "./adapters/tufts/adapter.js");
/* harmony import */ var _clAdapters_adapters_chineseloc_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/adapters/chineseloc/adapter */ "./adapters/chineseloc/adapter.js");
/* harmony import */ var _clAdapters_adapters_alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/adapters/alpheiostb/adapter */ "./adapters/alpheiostb/adapter.js");
/* harmony import */ var _clAdapters_adapters_translations_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clAdapters/adapters/translations/adapter */ "./adapters/translations/adapter.js");
/* harmony import */ var _clAdapters_adapters_lexicons_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clAdapters/adapters/lexicons/adapter */ "./adapters/lexicons/adapter.js");
/* harmony import */ var _clAdapters_adapters_concordance_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clAdapters/adapters/concordance/adapter */ "./adapters/concordance/adapter.js");
/* harmony import */ var _clAdapters_adapters_arethusa_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @clAdapters/adapters/arethusa/adapter */ "./adapters/arethusa/adapter.js");
/* harmony import */ var _clAdapters_adapters_logeion_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @clAdapters/adapters/logeion/adapter */ "./adapters/logeion/adapter.js");
/* harmony import */ var _clAdapters_adapters_tokenization_adapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @clAdapters/adapters/tokenization/adapter */ "./adapters/tokenization/adapter.js");
/* harmony import */ var _clAdapters_adapters_dtsapi_adapter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @clAdapters/adapters/dtsapi/adapter */ "./adapters/dtsapi/adapter.js");
/* harmony import */ var _clAdapters_errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @clAdapters/errors/wrong-method-error */ "./errors/wrong-method-error.js");
/* harmony import */ var _clAdapters_errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @clAdapters/errors/no-required-param-error */ "./errors/no-required-param-error.js");
/* harmony import */ var _clAdapters_adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @clAdapters/adapters/adapters-config.json */ "./adapters/adapters-config.json");
















let cachedConfig = new Map() // eslint-disable-line prefer-const
let cachedAdaptersList = new Map() // eslint-disable-line prefer-const

class ClientAdapters {
  /**
   * it is used for uploading data from AdaptersConfig to cachedConfig and CachedAdaptersList
  */
  static init () {
    if (cachedConfig.size === 0) {
      for (const category in _clAdapters_adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_12__) {
        let adapters = {} // eslint-disable-line prefer-const
        for (const adapterKey in _clAdapters_adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_12__[category]) {
          const adapterData = _clAdapters_adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_12__[category][adapterKey]

          adapters[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods,
            params: adapterData.params
          }
        }
        cachedConfig.set(category, adapters)
      }

      for (const key of cachedConfig.keys()) {
        const res = {}
        Object.keys(cachedConfig.get(key)).forEach(typeAdapter => {
          res[typeAdapter] = cachedConfig.get(key)[typeAdapter].adapter
        })

        cachedAdaptersList.set(key, res)
      }
    }
  }

  /**
  *  Additional abstraction layer for structuring adapters
  *  it is used for retrieving data from morphology category
  */
  static get morphology () {
    ClientAdapters.init()
    return cachedAdaptersList.get('morphology')
  }

  /**
  * it is used for retrieving data from lexicon category
  */
  static get lexicon () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lexicon')
  }

  /**
  * it is used for retrieving data from lemmatranslation category
  */
  static get lemmatranslation () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lemmatranslation')
  }

  static get wordusageExamples () {
    ClientAdapters.init()
    return cachedAdaptersList.get('wordusageExamples')
  }

  static get autocompleteWords () {
    ClientAdapters.init()
    return cachedAdaptersList.get('autocompleteWords')
  }

  static get tokenizationGroup () {
    ClientAdapters.init()
    return cachedAdaptersList.get('tokenizationGroup')
  }

  static get dtsapiGroup () {
    ClientAdapters.init()
    return cachedAdaptersList.get('dtsapiGroup')
  }

  /**
  * This method checks if given method is registered in config for category.adapterName
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethod (category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new _clAdapters_errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_10__.default(category, adapterName, methodName)
    }
  }

  /**
  * This method checks if given array with parameteres doesn't have required parameters, registered in config file
  * @param {[String]} params - array of parameter's names for being checked
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        // Param values other than `undefined` such as `null` or empty strings could be valid values
        if (params && typeof params[paramName] === 'undefined') {
          throw new _clAdapters_errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_11__.default(category, adapterName, methodName, paramName)
        }
      })
    }
  }

  /*
  * This method executes both checks for given options - checks method and given parameters from options
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {Object} options - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethodParam (category, adapterName, options) {
    ClientAdapters.checkMethod(category, adapterName, options.method)
    ClientAdapters.checkParam(options.params, category, adapterName, options.method)
  }

  /**
   * it is used for getting data from morph adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {String} options.params.word - target word for what we will receive morph data
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
  */
  static async maAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'tufts', options)

    const localMaAdapter = new _clAdapters_adapters_tufts_adapter__WEBPACK_IMPORTED_MODULE_0__.default({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    })

    if (options.method === 'getHomonym') {
      const homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
    }
    return null
  }

  static async chineseAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'chineseloc', options)

    const localChineseAdapter = new _clAdapters_adapters_chineseloc_adapter__WEBPACK_IMPORTED_MODULE_1__.default({
      category: 'morphology',
      adapterName: 'chineseloc',
      method: options.method,
      // A URL of a CEDICT service
      serviceUrl: options.serviceUrl
    })

    if (options.method === 'getHomonym') {
      const homonym = await localChineseAdapter.getHomonym(options.params.word, options.params.checkContextForward)
      return { result: homonym, errors: localChineseAdapter.errors }
    }
    if (options.method === 'loadData') {
      const result = await localChineseAdapter.loadData(options.params.timeout)
      return { result, errors: localChineseAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from treebank adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {String} options.params.wordref - target wordref for getting data from treebank adapter
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
*/

  static async tbAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'alpheiosTreebank', options)

    const localTbAdapter = new _clAdapters_adapters_alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_2__.default({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      const homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from arethusa
   * @param {Object} options - object contains parameters:
   *    @param {String} options.method - for now one value - "getHomonym" - action that should be done wth the help of adapter
   *    @param {Symbol} options.params.languageID - languageID value for the word
   *    @param {Symbol} options.params.word - target word
   *    @param {String} options.params.provider - the provider url for Arethusa
   *    @param {String} options.params.sentenceId - the sentence identifier
   *    @param {String} options.params.wordId - the word identifier
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Homonym, errors: [AdapterError] }
*/

  static async arethusaAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'arethusaTreebank', options)

    const localAdapter = new _clAdapters_adapters_arethusa_adapter__WEBPACK_IMPORTED_MODULE_6__.default({
      category: 'morphology',
      adapterName: 'arethusaTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      const homonym = await localAdapter.getHomonym(options.params.languageID,
        options.params.word,
        options.params.provider,
        options.params.sentenceId,
        options.params.wordId)
      return { result: homonym, errors: localAdapter.errors }
    }
    if (options.method === 'refreshView') {
      const resp = await localAdapter.refreshView(options.params.provider)
      return { result: resp, errors: localAdapter.errors }
    }
    if (options.method === 'gotoSentence') {
      const resp = await localAdapter.gotoSentence(
        options.params.provider,
        options.params.sentenceId,
        options.params.wordIds
      )
      return { result: resp, errors: localAdapter.errors }
    }
    if (options.method === 'findWord') {
      const resp = await localAdapter.findWord(
        options.params.provider,
        options.params.word,
        options.params.prefix,
        options.params.suffix,
        options.params.sentenceId
      )
      return { result: resp, errors: localAdapter.errors }
    }
    return null
  }

  /**
   * it is used for getting data from translations adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   *    @param {Homonym} options.params.homonym - homonym for retrieving translations
   *    @param {String} options.params.browserLang - language for translations
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Boolean, errors: [AdapterError] }
*/
  static async lemmaTranslations (options) {
    ClientAdapters.checkMethodParam('lemmatranslation', 'alpheios', options)

    const localLemmasAdapter = new _clAdapters_adapters_translations_adapter__WEBPACK_IMPORTED_MODULE_3__.default({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
    }
    return null
  }

  static async wordUsageExamples (options) {
    ClientAdapters.checkMethodParam('wordusageExamples', 'concordance', options)

    const localLemmasAdapter = new _clAdapters_adapters_concordance_adapter__WEBPACK_IMPORTED_MODULE_5__.default({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getAuthorsWorks') {
      const res = await localLemmasAdapter.getAuthorsWorks()
      return { result: res, errors: localLemmasAdapter.errors }
    }

    if (options.method === 'getWordUsageExamples') {
      const res = await localLemmasAdapter.getWordUsageExamples(options.params.homonym, options.params.filters, options.params.pagination, options.params.sort)
      return { result: res, errors: localLemmasAdapter.errors }
    }

    return null
  }

  /**
   * it is used for getting data from lexicons adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - action that should be done wth the help of adapter - fetchShortDefs and fetchFullDefs
   *    @param {Object} options.config - lexicon configuration supplied by client
   *    @param {Homonym} options.params.homonym - homonym for retrieving translations
   *    @param {Object(allow: [String])} options.params.opts - an object with array of urls for dictionaries
   *    @param {PSEvent} options.params.callBackEvtSuccess - an event that should be published on success result
   *    @param {PSEvent} options.params.callBackEvtFailed - an event that should be published on failed result
   * Returned values:
   *    - throw an Error if there is used a wrong metod or not enough required parameters
   *    - null, method is registered in configuration file but not implemented here
   *    - { result: Boolean, errors: [AdapterError] }
*/
  static async lexicons (options) {
    ClientAdapters.checkMethodParam('lexicon', 'alpheios', options)

    const adapterParams = {
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      timeout: options.params && options.params.timeout ? options.params.timeout : 3000,
      callBackEvtSuccess: options.params ? options.params.callBackEvtSuccess : null,
      callBackEvtFailed: options.params ? options.params.callBackEvtFailed : null
    }

    const localLexiconsAdapter = new _clAdapters_adapters_lexicons_adapter__WEBPACK_IMPORTED_MODULE_4__.default(adapterParams, options.config)

    if (options.method === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }
    if (options.method === 'fetchFullDefs') {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }

    if (options.method === 'checkCachedData') {
      await localLexiconsAdapter.checkCachedData(options.params.url, options.params.externalData, options.params.skipFetch)
      return { errors: localLexiconsAdapter.errors }
    }

    if (options.method === 'getConfig') {
      return localLexiconsAdapter.config.lexicons
    }
    return null
  }

  /**
   * It is used for getting segments and tokens from Alpheios Tokenization Service
   * @param {Object} options
   */
  static async autoCompleteWords (options) {
    ClientAdapters.checkMethodParam('autocompleteWords', 'logeion', options)

    const localLogeionAdapter = new _clAdapters_adapters_logeion_adapter__WEBPACK_IMPORTED_MODULE_7__.default({
      category: 'autocompleteWords',
      adapterName: 'logeion',
      method: options.method,
      clientId: options.clientId,
      limit: options.params.limit,
      lang: options.params.lang,
      sourceData: options.params.sourceData,
      fetchOptions: options.params.fetchOptions
    })

    if (localLogeionAdapter.available && options.method === 'getWords') {
      const res = await localLogeionAdapter.getWords(options.params.text)
      return { result: res, errors: localLogeionAdapter.errors }
    }
    return null
  }

  /**
   * It is used for getting segments and tokens from Alpheios Tokenization Service
   * @param {Object} options
   */
  static async tokenizationMethod (options) {
    ClientAdapters.checkMethodParam('tokenizationGroup', 'alpheios', options)

    const localTokenizationAdapter = new _clAdapters_adapters_tokenization_adapter__WEBPACK_IMPORTED_MODULE_8__.default({
      category: 'tokenizationGroup',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      fetchOptions: options.params.fetchOptions,
      storage: options.params.storage,
      sourceData: options.params.sourceData
    })

    if (!localTokenizationAdapter.available) {
      localTokenizationAdapter.addError(localTokenizationAdapter.l10n.getMsg('TOKENIZATION_AVAILABILITY_ERROR'))
      return {
        errors: localTokenizationAdapter.errors
      }
    }

    if (options.method === 'getTokens') {
      const res = await localTokenizationAdapter.getTokens(options.params.text)
      return { result: res, errors: localTokenizationAdapter.errors }
    }
    if (options.method === 'getConfig') {
      const res = await localTokenizationAdapter.getConfig()
      return { result: res, errors: localTokenizationAdapter.errors }
    }
    return null
  }

  static async dtsApiMethod (options) {
    ClientAdapters.checkMethodParam('dtsapiGroup', 'dtsapi', options)

    const localDTSAPIAdapter = new _clAdapters_adapters_dtsapi_adapter__WEBPACK_IMPORTED_MODULE_9__.default({
      category: 'dtsapiGroup',
      adapterName: 'dtsapi',
      method: options.method,
      clientId: options.clientId,
      baseUrl: options.params.baseUrl
    })

    if (options.method === 'getCollection') {
      const res = await localDTSAPIAdapter.getCollection(options.params.id)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }

    if (options.method === 'getNavigation') {
      const res = await localDTSAPIAdapter.getNavigation(options.params.id, options.params.resource)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }

    if (options.method === 'getDocument') {
      const res = await localDTSAPIAdapter.getDocument(options.params.id, options.params.refParams)
      return { result: res, errors: localDTSAPIAdapter.errors }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientAdapters);


/***/ }),

/***/ "./errors/adapter-error.js":
/*!*********************************!*\
  !*** ./errors/adapter-error.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class AdapterError extends Error {
  constructor (category, adapterName, methodName, messageError, statusCode) {
    super(messageError)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.statusCode = statusCode

    if (this.adapter && this.methodName) {
      this.message = `${this.message} (${this.adapter}.${this.methodName})`
    }
    try {
      Error.captureStackTrace(this, AdapterError)
    } catch (e) {
      // Continue if environment does not support captureStackTrace.
    }
  }

  /**
   * @deprecated
   * This method is obsolete. It will be removed in future versions.
   * No replacement for its functionality has been provided as it is not used anywhere.
   */
  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdapterError);


/***/ }),

/***/ "./errors/adapter-warning.js":
/*!***********************************!*\
  !*** ./errors/adapter-warning.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdapterWarning)
/* harmony export */ });
/**
 A warning represents a problem that is less severe than an error.
 In case of an error the problem that caused it cannot be ignored and,
 because of that, the normal execution of the workflow is impossible.
 The warning, in contrast, represents a issue that is important enough to be noticed,
 but that does not, on itself, prevent the code from being executed normally.
 */
class AdapterWarning extends Error {
  /**
   * @param {string} category
   * @param {string} adapterName - The name of the client adapter where the warning was originated.
   * @param {string} methodName - The name of the method from where the warning came from.
   * @param {string} errorCode - A short string representing the alphanumeric error code, such as `SOME_DATA_MISSING`
   * @param errorMessage
   */
  constructor (category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.errorCode = errorCode
  }
}


/***/ }),

/***/ "./errors/no-required-param-error.js":
/*!*******************************************!*\
  !*** ./errors/no-required-param-error.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class NoRequiredParamError extends Error {
  constructor (category, adapterName, methodName, paramName) {
    const message = `There is no required parameter - ${paramName} for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.paramName = paramName
    Error.captureStackTrace(this, NoRequiredParamError)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoRequiredParamError);


/***/ }),

/***/ "./errors/remote-error.js":
/*!********************************!*\
  !*** ./errors/remote-error.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RemoteError)
/* harmony export */ });
class RemoteError extends Error {
  constructor (category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.errorCode = errorCode
  }

  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.errorCode}: ${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}


/***/ }),

/***/ "./errors/warning-codes.js":
/*!*********************************!*\
  !*** ./errors/warning-codes.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @enum {string} */
const WarningCodes = {
  /*
  `hdwd` field of the response of the morphological adapter contains a number, not a string
   */
  NO_LEMMA_IN_HDWD: 'NO_LEMMA_IN_HDWD'
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WarningCodes);


/***/ }),

/***/ "./errors/wrong-method-error.js":
/*!**************************************!*\
  !*** ./errors/wrong-method-error.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class WrongMethodError extends Error {
  constructor (category, adapterName, methodName) {
    const message = `Wrong method for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.method = methodName
    Error.captureStackTrace(this, WrongMethodError)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WrongMethodError);


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientAdapters": () => (/* reexport safe */ _clAdapters_client_adapters_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "AdapterError": () => (/* reexport safe */ _clAdapters_errors_adapter_error_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "RemoteError": () => (/* reexport safe */ _clAdapters_errors_remote_error_js__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _clAdapters_client_adapters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clAdapters/client-adapters.js */ "./client-adapters.js");
/* harmony import */ var _clAdapters_errors_adapter_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/errors/adapter-error.js */ "./errors/adapter-error.js");
/* harmony import */ var _clAdapters_errors_remote_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clAdapters/errors/remote-error.js */ "./errors/remote-error.js");







/***/ }),

/***/ "./locales/locales.js":
/*!****************************!*\
  !*** ./locales/locales.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _en_us_messages_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en-us/messages.json */ "./locales/en-us/messages.json");
/* harmony import */ var _en_gb_messages_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en-gb/messages.json */ "./locales/en-gb/messages.json");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  en_US: 'en-US',
  en_GB: 'en-GB',
  messages: {
    en_US: _en_us_messages_json__WEBPACK_IMPORTED_MODULE_0__,
    en_GB: _en_gb_messages_json__WEBPACK_IMPORTED_MODULE_1__
  }
});


/***/ }),

/***/ "./transformers/alpheios-lexicon-transformer.js":
/*!******************************************************!*\
  !*** ./transformers/alpheios-lexicon-transformer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _clAdapters_errors_warning_codes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clAdapters/errors/warning-codes.js */ "./errors/warning-codes.js");



/**
 Transforms morphological output adhering to the Alpheios lexicon
 schema to an Alpheios Homonym data model object
*/

const featuresArray = [
  ['pofs', 'part'],
  ['case', 'grmCase'],
  ['gend', 'gender'],
  ['decl', 'declension'],
  ['conj', 'conjugation'],
  ['area', 'area'],
  ['age', 'age'],
  ['geo', 'geo'],
  ['freq', 'frequency'],
  ['note', 'note'],
  ['pron', 'pronunciation'],
  ['kind', 'kind'],
  ['src', 'source']
]

const featuresArrayAll = [
  ['morph', 'morph'], // morph is first because it may have data that overrides other features
  ['pofs', 'part'],
  ['case', 'grmCase'],
  ['gend', 'gender'],
  ['decl', 'declension'],
  ['conj', 'conjugation'],
  ['num', 'number'],
  ['tense', 'tense'],
  ['voice', 'voice'],
  ['mood', 'mood'],
  ['pers', 'person'],
  ['comp', 'comparison'],
  ['stemtype', 'stemtype'],
  ['derivtype', 'derivtype'],
  ['dial', 'dialect']
]

const attributeBasedFeatures = [
  ['paradigm', 'cat']
]

class AlpheiosLexiconTransformer {
  constructor (adapter, mappingData) {
    this.adapter = adapter
    this.mappingData = mappingData
    this.allowUnknownValues = true
  }

  /**
   * This method extract parameter by defined path
   * @param {Object} source - json object to retrieve data from
   * @param {String} nameParam - parameter name that should be retrieved
   * @return {String|Object} - extracted data
  */
  extractData (source, nameParam) {
    const schema = {
      providerUri: ['RDF', 'Annotation', 'creator', 'Agent', 'about'],
      providerRights: ['RDF', 'Annotation', 'rights', '$'],
      inflections: ['rest', 'entry', 'infl'],
      dictData: ['rest', 'entry', 'dict']
    }
    let res

    if (schema[nameParam]) {
      res = source
      for (const pathPart of schema[nameParam]) {
        if (res[pathPart]) {
          res = res[pathPart]
        } else {
          res = undefined
          break
        }
      }
    }
    return res
  }

  /**
   * This method checks if data is array, if not - converts to array
   * @param {?} data - value that should be checked
   * @param {?} defaultData - default value, if data is null
   * @return {Array}
  */
  checkToBeArray (data, defaultData = []) {
    let resData = data
    if (!Array.isArray(data)) {
      if (data) {
        resData = [data]
      } else {
        resData = defaultData
      }
    }
    return resData
  }

  /**
   * This method creates hdwd from source json object
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @param {Symbol} direction - define the word direction
   * @return {Array} - array with parts for hdwr
  */
  collectHdwdArray (data, term, direction) {
    let hdwd = [] // eslint-disable-line prefer-const

    if (data && !Array.isArray(data) && (!data.hdwd || !data.hdwd.$) && term) {
      hdwd.push(term.prefix ? term.prefix.$ : '')
      hdwd.push(term.stem ? term.stem.$ : '')
      hdwd.push(term.suff ? term.suff.$ : '')

      if (direction === alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Constants.LANG_DIR_RTL) {
        hdwd.reverse()
      }
    }

    return hdwd
  }

  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @return {String}  - language code
  */
  defineLanguage (data, term) {
    let lemmaData = Array.isArray(data) ? data[0] : data // eslint-disable-line prefer-const
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {}
      lemmaData.hdwd.lang = term.lang
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang
  }

  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} jsonObj - jsonObj from adapter
   * @param {string} targetWord - a word for which a request is made
   * Returned values:
   *     - {Homonym}
   *     - {undefined}
  */
  transformData (jsonObj, targetWord) {
    let lexemes = [] // eslint-disable-line prefer-const
    const annotationBody = this.checkToBeArray(jsonObj.RDF.Annotation.Body)

    const providerUri = this.extractData(jsonObj, 'providerUri')
    const providerRights = this.extractData(jsonObj, 'providerRights')

    const provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider(providerUri, providerRights)

    for (const lexeme of annotationBody) {
      const inflectionsJSON = this.checkToBeArray(this.extractData(lexeme, 'inflections'))
      const inflectionsJSONTerm = inflectionsJSON.length > 0 ? inflectionsJSON[0].term : undefined

      const dictData = this.extractData(lexeme, 'dictData')

      const lemmaElements = this.checkToBeArray(dictData, inflectionsJSONTerm ? [inflectionsJSONTerm] : [])
      const language = this.defineLanguage(lemmaElements, inflectionsJSONTerm)
      if (!language) {
        this.adapter.addError(this.adapter.l10n.getMsg('MORPH_TRANSFORM_NO_LANGUAGE'))
        continue
      }

      const reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, this.mappingData.model.direction)
      if (reconstructHdwd.length > 0) {
        lemmaElements[0].hdwd.$ = reconstructHdwd.join('')
      }

      let lemmas = [] // eslint-disable-line prefer-const
      let lexemeSet = [] // eslint-disable-line prefer-const

      for (const entry of lemmaElements.entries()) {
        const index = entry[0]
        const elem = entry[1]

        // if the parser has a number in the hdwd the JSON will have it as a number
        // and not a String
        const lemmaText = elem.hdwd && elem.hdwd.$ ? `${elem.hdwd.$}` : ''
        if (!lemmaText) {
          this.adapter.addWarning(_clAdapters_errors_warning_codes_js__WEBPACK_IMPORTED_MODULE_1__.default.NO_LEMMA_IN_HDWD, this.adapter.l10n.getMsg('MORPH_TRANSFORM_NO_LEMMA'))
          continue
        }
        const lemma = this.mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)

        for (const feature of featuresArray) {
          this.mappingData.mapFeature(lemma, elem, ...feature, this.allowUnknownValues)
        }

        let shortdefs = [] // eslint-disable-line prefer-const
        let meanings = lexeme.rest.entry.mean
        if (!Array.isArray(meanings)) {
          meanings = [meanings]
        }
        meanings = meanings.filter((m) => m)

        // if we have multiple dictionary elements, take the meaning with the matching index
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index] && meanings[index].$) {
            const meaning = meanings[index]
            shortdefs.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider,
              this.mappingData.parseMeaning(meaning, lemmas[index].word)))
          }
        } else {
          // Changed to prevent some weird "Array Iterator.prototype.next called on incompatible receiver [object Unknown]" error
          const sDefs = meanings.filter((m) => m.$).map(meaning => {
            return alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider,
              this.mappingData.parseMeaning(meaning, lemma.word))
          })
          shortdefs.push(...sDefs)
        }
        let lexmodel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lexeme(lemma, []) // eslint-disable-line prefer-const

        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.ResourceProvider.getProxy(provider, lexmodel))
      }

      if (lemmas.length === 0) {
        continue
      }

      const inflections = []
      for (const inflectionJSON of inflectionsJSON) {
        const stem = inflectionJSON.term && inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
        const form = inflectionJSON.term && inflectionJSON.term.form ? inflectionJSON.term.form.$ : null
        const suffix = inflectionJSON.term && inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
        const prefix = inflectionJSON.term && inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
        const xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
        const inflWord = stem || form
        let inflection
        try {
          inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Inflection(inflWord, this.mappingData.model.languageID, suffix, prefix, xmpl)
        } catch (e) {
          this.adapter.addError(this.adapter.l10n.getMsg('MORPH_TRANSFORM_INFLECTION_ERROR', { error: e.message }))
          continue
        }
        if (targetWord) {
          inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.fullForm, targetWord, this.mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (const f of featuresArrayAll) {
          try {
            this.mappingData.mapFeature(inflection, inflectionJSON, ...f, this.allowUnknownValues)
            this.mappingData.overrideInflectionFeatureIfRequired(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types[f[1]], inflection, lemmas)
          } catch (e) {
            // quietly continue
          }
        }

        // Parse attribute based features
        for (const f of attributeBasedFeatures) {
          try {
            this.mappingData.mapFeatureByAttribute(inflection, inflectionJSON, ...f, this.allowUnknownValues)
            this.mappingData.overrideInflectionFeatureIfRequired(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types[f[1]], inflection, lemmas)
          } catch (e) {
            // quietly continue
          }
        }

        // we only use the inflection if it tells us something the dictionary details do not
        if (inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.grmCase] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.tense] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.mood] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.voice] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.person] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.comparison] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.stemtype] || /** greek - morpheus **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.derivtype] || /** greek - morpheus **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.dialect] || /** greek **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.morph] || /** arabic - aramorph **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.kaylo] || /** syriac - sedra **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.state] || /** syriac - sedra **/
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.example]) {
          inflections.push(inflection)
        }
        // inflection can provide lemma decl, pofs, conj
        for (const lemma of lemmas) {
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part]) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'pofs', 'part', this.allowUnknownValues)
          }
          // only take declension from inflection if lemma has no part of speech or its the same as the inflection
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.declension] &&
            (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'decl', 'declension', this.allowUnknownValues)
          }
          // only take conjugation from inflection if lemma has a part of speech and its the same as the inflection
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.conjugation] &&
            (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, 'conj', 'conjugation', this.allowUnknownValues)
          }
        }
      }
      const aggregated = this.mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }
    if (lexemes.length > 0) {
      return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Homonym(lexemes, targetWord)
    } else {
      return undefined
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlpheiosLexiconTransformer);


/***/ }),

/***/ "./transformers/import-morph-data.js":
/*!*******************************************!*\
  !*** ./transformers/import-morph-data.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/*
Objects of a morphology analyzer's library
 */


/**
 * Holds all information required to transform from morphological analyzer's grammatical feature values to the
 * library standards. There is one ImportMorphData object per language.
 */
class ImportMorphData {
  /**
     * Creates an ImportMorphData object for the language provided.
     * @param {Function<LanguageModel>} model - A language model of the import data.
     * @param {String} engine - a code for the engine that is using this mapping model
     */
  constructor (model, engine) {
    'use strict'
    this.model = model
    this.engine = engine
    // add all the features that the language supports so that we
    // can return the default values if we don't need to import a mapping
    for (const featureName of Object.keys(this.model.features)) {
      this.addFeature(featureName)
    }
    // may be overridden by specific engine to handle vagaries in reporting of dictionary entries
    // default just returns them as provided
    this.aggregateLexemes = function (lexemeSet, inflections) {
      let lexemes = [] // eslint-disable-line prefer-const
      for (const lex of lexemeSet) {
        // only process if we have a lemma that differs from the target
        // word or if we have at least a part of speech
        if (this.reportLexeme(lex)) {
          lex.inflections = inflections.map(inflection => inflection.clone())
          lexemes.push(lex)
        }
      }
      return lexemes
    }
    // may be overridden by specific engine use via setLemmaParser
    this.parseLemma = function (lemma) { return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lemma(lemma, this.model.languageID) }

    // may be overridden by specific engine use via setMeaningParser
    this.parseMeaning = function (meaning, targetWord) {
      const lang = meaning.lang ? meaning.lang : alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Constants.STR_LANG_CODE_ENG
      return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Definition(meaning.$, lang, 'text/plain', targetWord)
    }

    // may be overridden by specific engine use via setPropertyParser - default just returns the property value
    // as a list
    this.parseProperty = function (propertyName, propertyValue, inputElem) {
      let propertyValues = []
      if (propertyName === 'decl') {
        propertyValues = propertyValue.split('&').map((p) => p.trim())
      } else if (propertyName === 'comp' && propertyValue === 'positive') {
        propertyValues = []
      } else {
        propertyValues = [propertyValue]
      }
      return propertyValues
    }

    // may be overridden by specifc engine use via setLexemeFilter - default assumes we will have a part of speech
    this.reportLexeme = function (lexeme) {
      return lexeme.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types.part]
    }

    // may be overriden by specific engine use to a list of of featureTypes which
    // should be overridden in the inflection data from the lemma data
    // for any featureType that can be overridden, it should map that featureType
    // name to a callback with the signature
    // callback(featureType,inflection,lemmas): { <boolean> withLemma,
    //                                            <Feature> withFeature
    //                                           }
    // if withLemma is false, and withFeature is null, no override will be used
    // if withLemma is true, the feature from the lemma, if present, will be used
    // if withLemma is false and withFeature is not null, the feature value of
    //   withFeature will be used
    this.inflectionOverrides = {}
  }

  /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
  addFeature (featureName) {
    this[featureName] = {}
    const model = this.model

    this[featureName].add = function add (providerValue, alpheiosValue) {
      this[providerValue] = alpheiosValue
      return this
    }

    this[featureName].get = function get (providerValue, sortOrder = 1, allowUnknownValues = false) {
      let mappedValue = []
      if (!this.importer.has(providerValue)) {
        // if the providerValue matches the model value or the model value
        // is unrestricted, return a feature with the providerValue and order
        if (model.typeFeature(featureName).hasValue(providerValue) ||
            model.typeFeature(featureName).valuesUnrestricted) {
          mappedValue = model.typeFeature(featureName).createFeature(providerValue, sortOrder)
        } else {
          const message = `Unknown value "${providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues})`
          if (allowUnknownValues) {
            mappedValue = model.typeFeature(featureName).createFeature(providerValue, sortOrder)
          } else {
            throw new Error(message)
          }
        }
      } else {
        const tempValue = this.importer.get(providerValue)
        if (Array.isArray(tempValue)) {
          mappedValue = model.typeFeature(featureName).createFeatures(tempValue, sortOrder)
        } else {
          mappedValue = model.typeFeature(featureName).createFeature(tempValue, sortOrder)
        }
      }
      return mappedValue
    }

    /**
     * @param {Object[]} data - An array of objects with `providerData` (an item value) and `sortOrder` fields
     * @param allowUnknownValues
     * @return {Feature}
     */
    this[featureName].getMultiple = function get (data, allowUnknownValues = false) {
      let values = [] // Converts values from `data` into `values` array
      for (const item of data) {
        if (this.importer.has(item.providerValue)) {
          const value = this.importer.get(item.providerValue)
          if (Array.isArray(value)) {
            // if the import returns an array, it should already have the sortOrder
            values = value
          } else {
            values = [[value, item.sortOrder]]
          }
        } else if (model.typeFeature(featureName).hasValue(item.providerValue) ||
          model.typeFeature(featureName).valuesUnrestricted) {
          values.push([item.providerValue, item.sortOrder])
        } else {
          const message = `Unknown value "${item.providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues})`
          if (allowUnknownValues) {
            values.push([item.providerValue, item.sortOrder])
          } else {
            throw new Error(message)
          }
        }
      }
      return model.typeFeature(featureName).createFeatures(values)
    }

    this[featureName].importer = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.FeatureImporter()

    return this[featureName]
  }

  /**
   * Add an engine-specific lexeme aggregator
   */
  setLexemeAggregator (callback) {
    this.aggregateLexemes = callback
  }

  /**
  /**
   * Add an engine-specific lemma parser
   */
  setLemmaParser (callback) {
    this.parseLemma = callback
  }

  setMeaningParser (callback) {
    this.parseMeaning = callback
  }

  /**
   * Add an engine-specific property parser
   */
  setPropertyParser (callback) {
    this.parseProperty = callback
  }

  /**
   * Add an engine-specific lexeme filter
   */
  setLexemeFilter (callback) {
    this.reportLexeme = callback
  }

  /**
   * Maps property of a single feature type to a single Feature object with one or more values
   * (if this feature has multiple values). Feature is stored as a property of the supplied model object.
   * @param {object} model the model object to which the feature will be added
   * @param {object} inputElem the input data element
   * @param {object} inputName the  property name in the input data
   * @param {string} featureName the name of the feature it will be mapped to
   * @param {boolean} allowUnknownValues flag to indicate if unknown values are allowed
   */
  mapFeature (model, inputElem, inputName, featureName, allowUnknownValues) {
    const inputItem = inputElem[inputName]
    if (inputItem && (Array.isArray(inputItem) || inputItem.$)) {
      let values = []
      if (Array.isArray(inputItem)) {
        // There are multiple values of this feature
        for (const e of inputItem) {
          values.push(...this.parseProperty(inputName, e.$, inputElem))
        }
      } else {
        values = this.parseProperty(inputName, inputItem.$, inputElem)
      }
      // `values` is always an array as an array is a return value of `parseProperty`
      if (values.length > 0) {
        // There are some values found
        values = values.map(v => { return { providerValue: v, sortOrder: inputItem.order ? inputItem.order : 1 } })
        const feature = this[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types[featureName]].getMultiple(values, allowUnknownValues)
        model.addFeature(feature)
      }
    }
  }

  /**
   * Maps property of a single feature type to a single Feature object with one
   * or more values, using an attribute to determine the mapped-to feature name
   * (if this feature has multiple values). Feature is stored as a property of
   * the supplied model object.
   * @param {object} model the model object to which the feature will be added
   * @param {object} inputElem the input data element
   * @param {object} inputName the  property name in the input data
   * @param {string} attributeName the attribute to use to get the feature name
   * @param {boolean} allowUnknownValues flag to indicate if unknown values are allowed
   */
  mapFeatureByAttribute (model, inputElem, inputName, attributeName, allowUnknownValues) {
    const inputItem = inputElem[inputName]
    let featureName
    if (inputItem && (Array.isArray(inputItem) || inputItem.$)) {
      let values = []
      if (Array.isArray(inputItem)) {
        // There are multiple values of this feature
        for (const e of inputItem) {
          if (featureName && featureName !== e[attributeName]) {
            alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().warn('Mutiple feature values with mismatching attribute value', inputElem)
          }
          featureName = e[attributeName]
          values.push(...this.parseProperty(inputName, e.$, inputElem))
        }
      } else {
        featureName = inputItem[attributeName]
        values = this.parseProperty(inputName, inputItem.$, inputElem)
      }
      // `values` is always an array as an array is a return value of `parseProperty`
      if (values.length > 0) {
        // There are some values found
        values = values.map(v => { return { providerValue: v, sortOrder: inputItem.order ? inputItem.order : 1 } })
        const feature = this[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Feature.types[featureName]].getMultiple(values, allowUnknownValues, inputItem.cat)
        model.addFeature(feature)
      }
    }
  }

  /**
   * Overrides feature data from an inflection with feature data from the lemma
   * or other data
   * as defined by the engine-specific inflectionOverrides property
   * @param {String} featureType the feature type name
   * @param {Inflection} inflection the inflection object
   * @param {Lemma[]} lemmas the lemma objects
   */
  overrideInflectionFeatureIfRequired (featureType, inflection, lemmas) {
    if (this.inflectionOverrides[featureType]) {
      const override = this.inflectionOverrides[featureType](inflection, lemmas)
      if (override.withLemma) {
        for (const lemma of lemmas.filter(l => l.features[featureType])) {
          inflection.addFeature(lemma.features[featureType])
        }
      } else if (override.withFeature !== null) {
        inflection.addFeature(override.withFeature)
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImportMorphData);


/***/ }),

/***/ "./adapters/adapters-config.json":
/*!***************************************!*\
  !*** ./adapters/adapters-config.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"morphology\":{\"alpheiosTreebank\":{\"adapter\":\"tbAdapter\",\"methods\":[\"getHomonym\"],\"params\":{\"getHomonym\":[\"languageID\",\"wordref\"]}},\"arethusaTreebank\":{\"adapter\":\"arethusaAdapter\",\"methods\":[\"getHomonym\",\"refreshView\",\"gotoSentence\",\"findWord\"],\"params\":{\"getHomonym\":[\"languageID\",\"word\",\"provider\",\"sentenceId\",\"wordId\"],\"refreshView\":[\"provider\"],\"gotoSentence\":[\"provider\",\"sentenceId\",\"wordIds\"],\"findWord\":[\"provider\",\"word\",\"prefix\",\"suffix\",\"sentenceId\"]}},\"tufts\":{\"adapter\":\"maAdapter\",\"methods\":[\"getHomonym\"],\"params\":{\"getHomonym\":[\"languageID\",\"word\"]}},\"chineseloc\":{\"adapter\":\"chineseAdapter\",\"methods\":[\"getHomonym\",\"loadData\"],\"params\":{\"getHomonym\":[\"languageID\",\"word\"],\"loadData\":[\"timeout\"]}}},\"lexicon\":{\"alpheios\":{\"adapter\":\"lexicons\",\"methods\":[\"fetchShortDefs\",\"fetchFullDefs\",\"checkCachedData\",\"getConfig\"],\"params\":{\"fetchShortDefs\":[\"homonym\",\"opts\"],\"fetchFullDefs\":[\"homonym\",\"opts\"],\"checkCachedData\":[\"url\",\"externalData\"],\"getConfig\":[]}}},\"lemmatranslation\":{\"alpheios\":{\"adapter\":\"lemmaTranslations\",\"methods\":\"fetchTranslations\",\"params\":{\"fetchTranslations\":[\"homonym\",\"browserLang\"]}}},\"wordusageExamples\":{\"concordance\":{\"adapter\":\"wordUsageExamples\",\"methods\":[\"getAuthorsWorks\",\"getWordUsageExamples\"],\"params\":{\"getAuthorsWorks\":[],\"getWordUsageExamples\":[\"homonym\"]}}},\"autocompleteWords\":{\"logeion\":{\"adapter\":\"autoCompleteWords\",\"methods\":\"getWords\",\"params\":{\"getWords\":[\"text\",\"lang\",\"fetchOptions\"]}}},\"tokenizationGroup\":{\"alpheios\":{\"adapter\":\"tokenizationMethod\",\"methods\":[\"getTokens\",\"getConfig\"],\"params\":{\"getTokens\":[\"text\"],\"getConfig\":[\"storage\"]}}},\"dtsapiGroup\":{\"dtsapi\":{\"adapter\":\"dtsApiMethod\",\"methods\":[\"getCollection\",\"getNavigation\",\"getDocument\"],\"params\":{\"getCollection\":[\"baseUrl\"],\"getNavigation\":[\"baseUrl\",\"id\",\"resource\"],\"getDocument\":[\"baseUrl\",\"id\",\"refParams\"]}}}}");

/***/ }),

/***/ "./adapters/alpheiostb/config.json":
/*!*****************************************!*\
  !*** ./adapters/alpheiostb/config.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"servers\":[{\"texts\":[],\"isDefault\":true,\"url\":\"https://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq?f=r_TEXT&w=r_WORD&clientId=r_CLIENT\",\"providerUri\":\"https://alpheios.net\",\"providerRights\":\"The Alpheios Treebank data is licenced under the Creative Commons 3.0 Share-Alike license.\",\"allowUnknownValues\":true,\"featuresArray\":[[\"pofs\",\"part\",true],[\"case\",\"grmCase\",false],[\"num\",\"number\",false],[\"gend\",\"gender\",false],[\"voice\",\"voice\",false],[\"mood\",\"mood\",false],[\"pers\",\"person\",false],[\"comp\",\"comparison\",false]]}]}");

/***/ }),

/***/ "./adapters/concordance/author-work.json":
/*!***********************************************!*\
  !*** ./adapters/concordance/author-work.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"authors\":[{\"urn\":\"urn:cts:latinLit:phi2456\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Parthenius, of Constantinople\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parth\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2456.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0119\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Plautus, Titus Maccius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0119.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amphitruo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"As\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aul\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bacchides\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Bac\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Captivi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Capt\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Casina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cas\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cistellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cist\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curculio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cur\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epidicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epid\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menaechmi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mercator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mer\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Miles Gloriosus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mostellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mos\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Per\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poenulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poen\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudolus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ps\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rudens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rud\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Stichus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"St\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trinummus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trin\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Truculentus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Truc\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vidularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vid\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0881\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Germanicus, Claudius Caesar\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Germ\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0881.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aratea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arat\"}]},{\"urn\":\"urn:cts:latinLit:phi0881.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta Aratea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0881.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epig\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0821\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Bucolica Einsidlensia)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BucEins\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0821.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bucolica Einsidlensia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0845\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Columella, L. Iunius Moderatus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Col\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0845.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Arboribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arb\"}]},{\"urn\":\"urn:cts:latinLit:phi0845.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Rustica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RR\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0984\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trogus, Pompeius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trog\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0984.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Animalibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anim\"}]},{\"urn\":\"urn:cts:latinLit:phi0984.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Philippicae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0558\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maecenas, Gaius Cilnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maec\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0558.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0558.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1297\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marullus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marull\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1297.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1251\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gaius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1251.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institutiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inst\"}]},{\"urn\":\"urn:cts:latinLit:phi1251.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institut., frr. Aeg. et Oxyrh.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Instfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi1251.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gai Institutionum epitome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epit\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0412\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aquilius Gallus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AquilGall\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0412.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1282\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lentul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1282.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0863\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dorcatius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dorc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0863.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Coelius Antipater, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Coel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0028.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Crassus, Lucius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cras\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0706\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen de Bello Aegyptiaco)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmBellAeg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0706.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen de Bello Aegyptiaco\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curio, Gaius Scribonius (pater)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CurPat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0037.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0917\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucanus, Marcus Annaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Luc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0917.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BC\"}]},{\"urn\":\"urn:cts:latinLit:phi0917.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0590\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nigidius Figulus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nigid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0590.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0662\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tiro, Marcus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tiro\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0662.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apicius, Caelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2003.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Coquinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Coqu\"}]},{\"urn\":\"urn:cts:latinLit:phi2003.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brevis Ciborum, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ExcCib\"}]},{\"urn\":\"urn:cts:latinLit:phi2003.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brevis Pimentorum, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ExcPim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0911\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Laus Pisonis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LausPis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0911.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laus Pisonis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0678\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Soranus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VSor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0678.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1050\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Verginius Rufus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vergin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1050.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0524\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0524.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"elegia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0524.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"elegia in pap. Qas1r Ibrîm\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmPap\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0301\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Domitius Ahenobarbus, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ahenobarbus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0301.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1370\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terentius Scaurus, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TerScaur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1370.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Adverbio et Praeposit.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AdPr\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. in codice Parisino 7520\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frgParis\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De ordinat. part. orat. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frgOrd\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1260\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hadrianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hadr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1260.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1260.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0474\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cicero, Marcus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0474.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Quinctio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quinct\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro S. Roscio Amerino\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SRosc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Q. Roscio Comoedo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QRosc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Q. Caecilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DivCaec\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Verrem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Tullio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tul\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Fonteio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Font\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Caecina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caec\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Lege Manilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Man\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Cluentio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Clu\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Lege Agraria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rabirio Perduellionis Reo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RabPerd\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Catilinam\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Murena\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mur\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Sulla\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sul\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Archia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arch\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Flacco\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Flac\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Post Reditum ad Populum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RedPop\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Post Reditum in Senatu\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RedSen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Domo Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dom\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Haruspicum Responso\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Har\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Sestio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sest\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vatinium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Caelio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cael\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Provinciis Consularibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prov\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Balbo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balb\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Pisonem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pis\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Plancio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Planc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Scauro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaur\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rabirio Postumo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RabPost\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Milone\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Marcello\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0033\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Ligario\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lig\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rege Deiotaro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Deiot\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Philippicae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0036\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Inventione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inv\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Oratore\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"deOrat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Partitione Oratoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Part\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0039\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brut\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0040\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Orator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Optimo Genere Oratorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"OptGen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0042\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Topica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Top\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0043\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Republica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rep\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0044\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Legibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Leg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0045\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Academica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ac\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0046\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucullus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Luc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0047\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paradoxa Stoicorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parad\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0048\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fin\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0049\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tusculanae Disputationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tusc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0050\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Natura Deorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ND\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0051\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Maior de Senectute\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0052\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius de Amicitia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amic\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0053\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Divinatione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Div\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0054\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Fato\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0055\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Officiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Off\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0056\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Familiares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fam\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0057\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Atticum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Att\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0058\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Quintum Fratrem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Qfr\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0059\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Brutum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"adBrut\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0060\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arati Phaenomena\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AratPhaen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0061\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Facete Dicta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Facet\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0062\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0063\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Causarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommCaus\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0064\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0065\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hortensius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hort\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0066\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertorum librorum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"libinc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0067\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Iure Civ. in Artem Redig.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IurCiv\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0068\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationum deperditarum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"oratdep\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0069\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationum incertarum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"incorat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0070\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"philosophicorum librorum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"philfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0071\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arati Prognostica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AratProgn\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0072\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Timaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tim\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0073\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rhetorica ad Herennium [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RhetHer\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0074\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Sallustium [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sal\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0075\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistula ad Octavianum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpOct\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0535\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius Laterensis, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0535.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0721\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Panurgus, Antonius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntPan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0721.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1263\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygFab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1263.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fab\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2468\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augustinus, Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"August\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2468.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laus Cerei\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1257\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Licinianus, Granius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GranLic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1257.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0944\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nero, Imperator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nero\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0944.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1242\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Florus, Annius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Flor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1242.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epitome Bell. Omn. Ann. DCC\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epit\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vergilius Orator an Poeta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina in Anthologia Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"anth\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epist. ad imperat. Hadrianum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0634\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Santra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"San\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0634.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0634.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0143\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trabea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0143.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0546\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mucianus, Gaius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Muc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0546.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1908\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antipater, Gallus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GalAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1908.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0694\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Volumnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vol\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0694.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0827\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesellius Vindex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caesel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0827.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1224\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aurelius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1224.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0692\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Appendix Vergiliana\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AppVerg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0692.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dirae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dirae\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lydia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lydia\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Culex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Culex\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aetna\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aetna\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Copa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Copa\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae in Maecenatem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ElegMaec\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ciris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ciris\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catalepton\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catal\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapeum 'Quid Hoc Novi Est?'\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priapeum\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Moretum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mor\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Institutione Viri Boni\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InstVir\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Est et Non\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeEst\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rosis Nascentibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rosis\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1306\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucius Neratius Priscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nerat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1306.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. in fragmentis Vaticanis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0636\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quintus Mucius Scaevola\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0636.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0648\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Staberius Eros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Staber\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0648.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0442\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulus Caecina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caecin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0442.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0658\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tabulae Censoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TabCens\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0658.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tabulae Censoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0987\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius Secundus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PPompon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0987.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0987.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1203\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alfius Avitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Avit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1203.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0664\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trebatius Testa, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Treb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0664.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia et al.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0302\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antonius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Antonius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0302.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato, Marcus Porcius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoCens\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0022.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agrfr\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dicta Memorabilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dict\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Medicina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertorum librorum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Militari\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen De Moribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mor\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Origines\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rhetorica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rhet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0518\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Furius Antias, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FurAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0518.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2150\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Zeno of Verona\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Zeno\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2150.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tractatus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tract\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0684\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varro, Marcus Terentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Var\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0684.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Lingua Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"L\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Rusticae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"R\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antiquitates Rerum Humanarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntiqHum\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antiquitates Rerum Divinarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntiqDiv\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Gente Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GentPopRom\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitaPopRom\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Urbanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ResUrb\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Logistorici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Log\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menippeae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epist\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae Latinae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epistLat\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"frr. de historia litterarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"litt\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta varia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"var\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertae sedis fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0680\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valgius Rufus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Valg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0680.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0884\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GracchTrag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0884.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2302\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Symmachus, L. Aurel. Avianius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LSymm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2302.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0966\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Passienus Crispus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Passien\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0966.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Piso Frugi, Lucius Calpurnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpPis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0016.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0097\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucilius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lucil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0097.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2301\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Symmachus, Q. Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QSymm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2301.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0908\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labeo, Attius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AttLabeo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0908.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versio Latina Iliados\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0460\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carbo Arvina, Gaius Papirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarboArv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0460.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0975\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phaedrus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phaed\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0975.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabulae Aesopiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fab\"}]},{\"urn\":\"urn:cts:latinLit:phi0975.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabularum Appendix\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"App\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Altercatio Hadr. et Epicteti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Altercat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Altercatio Hadr. et Epicteti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0824\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caelius Sabinus, Cn. Arulenus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelSab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0824.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0854\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius Gallus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornifGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0854.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Vergilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0140\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0140.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0592\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Novius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0592.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0842\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Licinus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodLic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0842.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Libri Rerum Romanarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0446\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caepio, Quintus Servilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0446.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0620\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Propertius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prop\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0620.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eleg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0515\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ennius, Sextus (vel Spurius)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SexEnn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0515.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0116\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pacuvius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0116.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0116.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0502\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cremutius Cordus, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Crem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0502.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0122\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Postumius Albinus, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Post\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0122.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2349\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Servius, active 4th century\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Serv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2349.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Centum Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CentMetr\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarius in Artem Donati\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommDon\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finalibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Final\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris Horatianis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetrHor\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Aeneidos Libros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"A\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Bucolicon Librum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Georgicon Libros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"G\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0472\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catullus, Gaius Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0472.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0472.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carminum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1351\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tacitus, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1351.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Iulii Agricolae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ag\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Origine et Situ Germanorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ger\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dialogus de Oratoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dial\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1672\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulVal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1672.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Chalcidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Chalc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2028.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ex Graecis Conversiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2097\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paconianus, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pacon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2097.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0512\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Duronius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Duron\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0512.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2000\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ablabius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ablab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2000.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2335\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi de Differentiis [Fronto]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Diff\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2335.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Differentiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0426\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Africum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BAfr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0426.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Africum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0514\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Egnatius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Egn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0514.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rerum Natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0815\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Niger, Bruttedius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brutted\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0815.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1348\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Suetonius Tranquillus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Suet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1348.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Caesarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VC\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Poetis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Historicis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Grammaticis et Rhetoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GramRhet\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Prata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prat\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0402\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aedituus, Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aed\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0402.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Salonianus, Marcus Portius M.f.M.n.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoNep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0025.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1515\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Serenus Sammonicus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerSamm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1515.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Medicinalis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi1515.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Medicinalis, capitula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MedCap\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1518\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terentianus Maurus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1518.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Litt., De Syll., De Metr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LittSyllMetr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9254\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Titius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9254.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0409\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QCornif\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0409.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0857\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornutus, Lucius Annaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cornut\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0857.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0309\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen Evocationis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmEvoc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0309.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Evocationis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1380\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Philumenus medicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Philum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1380.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De medicina, versio Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0564\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius, Manius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManIur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0564.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0963\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Palaemon, Quintus Remmius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Palaem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0963.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0963.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0537\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labienus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Labienus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0537.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0470\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Uticensis, Marcus Porcius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoUtic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0470.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0806\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Capito, Gaius Ateius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0806.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0616\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pompil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0616.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0616.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoedia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0878\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Asinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AsGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0878.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0878.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1345\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silius Italicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1345.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Punica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pun\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0404\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Afranius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Afran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0404.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0914\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Livius, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Liv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0914.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ab Urbe Condita\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AUC\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Periochae Librorum A. U. C.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Perioch\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"A.U.C. Perioch. ex P.Oxy.668\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PeriochOxy\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scribonius Largus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Larg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1011.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Compositiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comp\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0469\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cassius Longinus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LCassius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0469.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0800\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Albinovanus Pedo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pedo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0800.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0875\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus Gaetulicus, Cn. Cornel.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gaet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0875.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0106\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus, Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0106.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Naevium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetVers\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2305\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aurelianus, Caelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelAur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2305.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"E Parmenide de natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1245\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Frontinus, Sextus Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fron\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1245.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Strategemata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Str\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Aquis Urbis Romae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aq\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agrorum Qualitate\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Controversiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Contr\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Limitibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lim\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Arte Mensoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0430\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Hispaniense)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BHisp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0430.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Hispaniense\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0413\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gavius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GavBas\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0413.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Origine Vocabulorum, frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0413.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0070\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gellius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnGel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0070.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0628\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rutilius Rufus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RutRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0628.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0562\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManPoet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0562.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0100\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Luscius Lanuvinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lanuv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0100.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0969\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pers\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0969.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0625\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quinctius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quinctius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0625.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0568\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Matius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnMat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0568.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0576\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Messalla Rufus, M. Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MesRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0576.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Familiis Romanis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0576.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Auspiciis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0428\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Alexandrinum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BAlex\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0428.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Alexandrinum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicia\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1023.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1023.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Statu Rei Publicae [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Conquaest\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0088\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lepidus Porcina, M. Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0088.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0993\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Precatio Terrae)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PrecTer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0993.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Precatio Terrae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0300\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asellio, Sempronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0300.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rerum Gestarum Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1506\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Fragmenta de Iure Fisci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FrIurFisc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1506.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta de iure fisci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Seneca, Lucius Annaeus (senior)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SenRhet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1014.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Controversiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Con\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Controversiae, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ConExc\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Suasoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Suas\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0128\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio Aemilianus, P. Cornelius, Africanus minor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScipMin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0128.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1047\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Veranius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Veran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1047.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"libri de rebus sacris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0614\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompeius Q.f.A.n. Rufus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PompRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0614.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Atil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0007.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0303\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Opillus, Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurOp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0303.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0137\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Titin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0137.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9510\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Grammatici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonGram\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9510.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0635\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saturius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0635.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornelia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cornelia\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0031.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistula, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0419\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Orbilius Pupillus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0419.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0103\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marcius, Gnaeus vates\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marcius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0103.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praecepta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0932\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Messalla Corvinus, M. Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MesCor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0932.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0932.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii de Bello Civili\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1236\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Festus, Sextus Pompeius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1236.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verborum Significatione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verb\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0400\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Accius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Acc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0400.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0400.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0400.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0674\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Val\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0674.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"comoedia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0536\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laberius, Decimus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laber\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0536.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0091\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Licinius Imbrex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Imbr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0091.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0730\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tarquitius Priscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tarquit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0730.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Disciplina Etrusca, frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0990\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Precatio Omnium Herbarum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PrecHerb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0990.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Precatio Omnium Herbarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0458\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cannutius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Can\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0458.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1604\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atherianus, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulAth\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1604.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1103\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1103.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0456\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calvus, Gaius Licinius Macer\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Calv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0456.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0456.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1000\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pupius 1st century B.C.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pup\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1000.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Pupio attributi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2331\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scriptores Historiae Augustae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SHA\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2331.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hadr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ael\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuli Capitolini Antoninus Pius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pius\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Marci Antonini Philosophi Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntPhil\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuli Capitolini Verus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Avidius \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Avid\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommAnt\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pert\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Didius Iulianus Aeli Spartiani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DidIul\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeli Spartiani Severus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sev\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pescennius Niger \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PescNig\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Clodii Albini Iulii Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodAlb\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antoninus Caracallus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntCar\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antoninus Geta \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntGeta\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Opilius Macrinus Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"OpilMacr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Diadumenus Antoninus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntDiad\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeli Lampridii Antoninus Heliogabalus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntHeliog\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alexander Severus Aeli Lampridii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AlexSev\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maximini Duo Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maxim\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gordian\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gord\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maximus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MaxBalb\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Valer\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gall\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TyrTrig\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Claud\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Flavi Vopisci Syracusii Divus Aurelianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aurel\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tac\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prob\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QuadTyr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Car\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0929\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mela, Pomponius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mela\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0929.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Chorographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Chor\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0724\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cloatius Verus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cloat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0724.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0487\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Pulcher, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Clodius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0487.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0064\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fannius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0064.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0064.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus, Marcus Iunius [iur.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BrutIur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0010.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0532\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hortensius Hortalus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hort\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0532.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0532.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0528\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Granius Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GranFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0528.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0690\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Virgil\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0690.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eclogae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]},{\"urn\":\"urn:cts:latinLit:phi0690.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Georgica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"G\"}]},{\"urn\":\"urn:cts:latinLit:phi0690.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeneis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"A\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0672\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turranius Niger\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0672.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de re rustica scripta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1209\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Annian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1209.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0312\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Dossennus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dossenn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0312.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1248\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fronto, Marcus Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fro\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1248.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad M. Caesarem et Invicem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurCaes\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad M. Antoninum Imp. Epist.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurImp\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Verum Imp. Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Eloquentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurEloq\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orationibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurOrat\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Antoninum Pium Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AdPium\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Amicos Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amic\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Principia Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Princ\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laudes Fumi et Pulveris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaudFumPulv\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laudes Neglegentiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaudNegl\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Parthico\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parth\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Feriis Alsiensibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FerAls\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Nepote Amisso\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nep\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arion\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ar\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Additamentum Epist. Aceph.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Add\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9969\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Vita Iuvenalis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitIuv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9969.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Iuvenalis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0887\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Grattius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Grat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0887.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cynegetica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cyneg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0104\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Memmius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Memmius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0104.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0606\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marcius Philippus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Philipp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0606.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0631\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sallust\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0631.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catilinae Coniuratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cat\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Iugurthinum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iug\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFr\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. ampliora\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrAmp\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. e codicibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrCod\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. e papyris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrPap\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Caesarem de Re Publ. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rep\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In M. Tullium Ciceronem [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cic\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Varro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PsVar\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1041.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Statius, Publius Papinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Stat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1020.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Thebais\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Theb\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silvae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Silv\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Achilleis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ach\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Germanico (fragment)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Germ\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Claudius Caecus, Appius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"App\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0004.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1212\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apuleius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1212.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apologia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apol\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metamorphoses\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Florida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fl\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Deo Socratis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Soc\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anechomenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anech\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Mundo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mun\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Platone et Eius Dogmate\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pl\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Deo Socratis, Praef. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SocPr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turnus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1029.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"satura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1100\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calpurnius Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpFlac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1100.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Decl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0452\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar Strabo, Gaius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Strab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0452.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0452.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0416\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ateius Praetextatus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ateius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0416.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1294\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Martial\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mart\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1294.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Spectacula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sp\"}]},{\"urn\":\"urn:cts:latinLit:phi1294.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0466\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cascellius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Casc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0466.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Bene Dictorum, frr. duo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0486\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cinna, Gaius Helvius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cinna\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0486.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1336\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevus Memor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScaevMem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1336.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0109\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus Macedonicus, Q. Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetMac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0109.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1374\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Velius Longus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1374.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0586\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mummius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0586.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0149\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arvales, Fratres\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmArv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0149.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Arvale\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0410\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aprissius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apris\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0410.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0420\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Namusa, Publius Aufidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nam\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0420.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0058\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Maximus Servilianus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FabMax\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0058.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1235\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicius Apollinaris, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DPTer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1235.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"An\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Heauton Timorumenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hau\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eunuchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eu\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phormio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ph\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hecyra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hec\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Adelphoe\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ad\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0432\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bibaculus, Marcus Furius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Bib\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0432.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0686\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varro Atacinus, P. Terentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VarAt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0686.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1512\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius Porphyrio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Porph\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1512.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. in Hor. Artem Poet.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. in Hor. Carm. Saec.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saec\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Epodos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epod\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Sermones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Epistulas\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Horati\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitHor\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0510\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dolabella, Publius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dolab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0510.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0935\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iulius Modestus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Modest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0935.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1291\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1291.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lupercalia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1234\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Didascaliae et Argum. in Plautum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DAPl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1234.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amphitruo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"As\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aul\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Captivi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Capt\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Casina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cas\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cistellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cist\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curculio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cur\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epidicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epid\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menaechmi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mercator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mer\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Miles Gloriosus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mostellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mos\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Per\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poenulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poen\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudolus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ps\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rudens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rud\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Stichus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"St\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trinummus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trin\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Truculentus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Truc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0591\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ninnius, Crassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0591.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0414\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arruntius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0414.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Belli Punici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0902\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Africanus, Sextus Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulAfr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0902.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0541\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus Marcellinus, Cn. Cornel.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LentMarc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0541.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0527\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gannius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0527.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0830\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calpurnius Siculus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpSic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0830.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eclogae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curio, Gaius Scribonius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CurioAv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0034.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0526\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Glaucia, Gaius Servilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Glauc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0526.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1221\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augustus, Emperor of Rome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aug\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1221.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"dicta et apophthegmata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dict\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"edicta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"edicta\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epist\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta incertae sedis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frginc\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"opera historica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Gestae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anc\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1254\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gellius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AulGel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1254.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Noctes Atticae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"NA\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0455\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Piso, Gaius Calpurnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Piso\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0455.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0703\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arbonius Silo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0703.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0494\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Consulares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentCons\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0494.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Consulares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0556\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Macer, Gaius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LicMacer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0556.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0556.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0812\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CBas\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0812.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris Horatii [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetHor\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Breviatio Pedum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BrevPed\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Compositionibus [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comp\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Genera Versuum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vers\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poeticae Species Lat. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0640\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scarus, Marcus Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemScaur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0640.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0640.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0893\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Horace\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0893.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Saeculare\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saec\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epodi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epod\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sermones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars Poetica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0405\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Tuscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodTusc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0405.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0652\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulla, Lucius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sulla\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0652.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Rerum Gestarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0418\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atta, Titus Quinctius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Atta\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0418.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0418.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1044\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Velleius Paterculus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vell\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1044.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historia Romana\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0996\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Probus, Marcus Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prob\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0996.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Persii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitPers\"}]},{\"urn\":\"urn:cts:latinLit:phi0996.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Notis Iuris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IurNot\"}]},{\"urn\":\"urn:cts:latinLit:phi0996.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0600\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Oppius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Opp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0600.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Silvestribus Arboribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0600.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"vitae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2806\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Justinian I, Emperor of the East\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Just\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2806.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Digesta Iustiniani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dig\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0082\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silanus, Decimus Iunius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IunSil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0082.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versio Latina Magonis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0644\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ena, Sextilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sextil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0644.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1279\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius Felix\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaelFel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1279.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0596\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Numitorius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Num\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0596.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antibucolica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1357\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trajan, Emperor of Rome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tra\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1357.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dacica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0484\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cincius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cinc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0484.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0484.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0656\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicius Rufus, Servius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SulpRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0656.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0656.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aquilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aquil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0005.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliata, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1339\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Septimius Serenus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sept\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1339.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0615\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompeius Rufus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QPompeius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0615.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0327\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Praeconinus Stilo, L. Aelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Stilo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0327.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0117\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Papinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0117.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammation\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0436\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus, Marcus Iunius [tyr.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brutus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0436.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0516\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Erucius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Erucius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0516.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0450\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar, Lucius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LCaes\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0450.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Auspiciorum Liber, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0860\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curtius Rufus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Curt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0860.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Alexandri Magni\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alex\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0552\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lutatius Catulus, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lutat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0552.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0552.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Communes Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1327\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sabidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sabid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1327.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0401\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aufustius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aufust\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0401.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0043\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ennius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Enn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0043.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"varia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"var\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incerta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0851\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Severus, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornSev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0851.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0851.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta a Morel omissa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0836\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Celsus, Aulus Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cels\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0836.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agricultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0836.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Medicina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0836.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rhetorica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rhet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1318\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pliny, the Younger\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PlinIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1318.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1318.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Panegyricus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pan\"}]},{\"urn\":\"urn:cts:latinLit:phi1318.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0978\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pliny, the Elder\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PlinSen\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0978.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naturalis Historia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nat\"}]},{\"urn\":\"urn:cts:latinLit:phi0978.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dubius Sermo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DubSerm\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0425\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rutilius Lupus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RutLup\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0425.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Schemata Lexeos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Schem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0134\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terence\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ter\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0134.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"An\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Heauton Timorumenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hau\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eunuchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eu\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phormio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ph\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hecyra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hec\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Adelphoe\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ad\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annius Luscus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Annius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0315\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchanus, Marcus Iunius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gracchan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0315.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"commentarii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0972\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Petronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Petr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0972.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Satyrica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]},{\"urn\":\"urn:cts:latinLit:phi0972.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Satyrica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0905\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labeo, Marcus Antistius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntLabeo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0905.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0488\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius, Servius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerClod\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0488.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vagellius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1032.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0496\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarius Anquisit. Sergii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentQuaestor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0496.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. Anquisit. Sergii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0899\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus Astronomus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygAstr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0899.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Astronomica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Astr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2123\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Porfyrius, Publilius Optatianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"POptat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2123.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0530\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hirtius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hirt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0530.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Gallico Liber VIII\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gal\"}]},{\"urn\":\"urn:cts:latinLit:phi0530.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0094\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andronicus, Lucius Livius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Andr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0094.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Odyssia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0094.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0094.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0866\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fenestella\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fen\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0866.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0727\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius Longus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornifLong\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0727.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0618\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius, Lucius, Bononiensis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PomponBon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0618.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0118\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paullus, Lucius Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemPaul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0118.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Albinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rerum Romanarum Liber I\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ResRom\"}]},{\"urn\":\"urn:cts:latinLit:phi2002.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeMetr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0408\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antonius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ant\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0408.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0959\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ovid\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0959.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae (vel Heroides)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Her\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medicamina Faciei Femineae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars Amatoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Remedia Amoris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rem\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metamorphoses\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fasti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fast\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tristia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tr\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ex Ponto\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pont\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ibis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ib\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nux [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nux\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Halieutica [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hal\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epicedion Drusi [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpicDrusi\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1276\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Juvenal\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Juv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1276.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0146\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turpilius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0146.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1285\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maecianus, Lucius Volusius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maecian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1285.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Assis Distributio ...\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0490\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cominius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0490.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0650\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sueius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sueius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0650.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0533\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus, Gaius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygGram\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0533.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0533.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1056\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vitruvius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vitr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1056.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Architectura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arch\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0594\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Novius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LNov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0594.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0646\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sisenna, Lucius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0646.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0646.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Milesiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0112\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naevius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnNaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0112.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Punicum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pun\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"alia carmina epica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, frr. a Morel omissa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Metellos [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InMet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1266\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus Gromaticus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygGr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1266.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Limitibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lim\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Condicionibus Agrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Generibus Controversiarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Contr\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Constitutio Limitum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Const\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Munition. Castrorum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Munit\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0076\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cassius Hemina, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0076.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0478\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cicero, Quintus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QCic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0478.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0478.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentar. Petitionis [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0624\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Claudius Quadrigarius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quad\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0624.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0085\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius, Gaius, Sapiens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lael\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0085.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0938\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Montanus, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mont\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0938.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0926\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManAstr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0926.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Astronomica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Astr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0522\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Aelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AelGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0522.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verbis ad Ius Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0522.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iurfrg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0582\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus Numidicus, Q. Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetNum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0582.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0451\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sinnius Capito\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sinn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0451.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0638\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevola, Q. Mucius [pontifex]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QScaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0638.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0560\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Helvius Mancia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Manc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0560.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1227\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Balbus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1227.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Expos. et Ratio Omn. Formarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"grom\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1363\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aemilius Asper\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asper\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1363.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"comment. in Ter. Sall. Verg.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1363.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vergilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0809\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aufidius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aufid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0809.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Maximus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VMax\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1038.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Facta et Dicta Memorabilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0661\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ticidas\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0661.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0538\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laevius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0538.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0538.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. dubium a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0660\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tibullus, Albius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tib\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0660.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eleg\"}]},{\"urn\":\"urn:cts:latinLit:phi0660.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina Tibulliana [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmTib\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0670\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aelius Tubero, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tub\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0670.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0670.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"liber ad C. Oppium, fr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0127\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio, Africanus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScipioMaior\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0127.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0330\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Volcacius Sedigitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Volc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0330.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cincius Alimentus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cincius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0027.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0306\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen Devotionis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmDevot\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0306.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Devotionis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0454\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calidius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Calid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0454.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0869\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Verrius Flaccus, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VerFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0869.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Etruscarum Rerum Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0869.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9505\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Comici et Tragici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonComTrag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9505.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Togatae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Palliatae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tragoediae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0534\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius, comicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iuvent\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0534.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0423\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Herennius Balbus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balbus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0423.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0890\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Homerus Latinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HomLat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0890.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0574\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Memmius L. f., Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0574.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0574.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1229\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caper, Flavius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caper\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1229.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]},{\"urn\":\"urn:cts:latinLit:phi1229.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verbis Dubiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VerbDub\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0587\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naevius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"NaevIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0587.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CypIl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carbo, Gaius Papirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carbo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0019.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0622\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Publilius, Syrus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pub\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0622.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]},{\"urn\":\"urn:cts:latinLit:phi0622.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0923\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Macer, Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemMacer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0923.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0923.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0073\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchus, Gaius Sempronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CGracch\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0073.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0803\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asconius Pedianus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0803.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Senatu Contra L. Pisonem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pis\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Scauro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaur\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Milone\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Cornelio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Corn\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Toga Candida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TogCand\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0444\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caelius Rufus, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0444.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1206\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ampelius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1206.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Memorialis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0448\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar, Julius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caes\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0448.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Gallico\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gal\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Civ\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Analogia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anticato\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anticat\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae ad Ciceronem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpCic\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae ad familiares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpFam\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1218\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augurinus, Sentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Augur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1218.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0492\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Augurum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentAugur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0492.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Augurum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0709\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marsus, Domitius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DomMars\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0709.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0709.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata ex Bobiensibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrBob\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1053\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vibius Crispus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VibCrisp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1053.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rabirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1005.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0324\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saserna\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saserna\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0324.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0445\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caepasius, Gaius vel Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caepasius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0445.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0981\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pollio, Gaius Asinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pol\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0981.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0046\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornelius Epicadus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epicad\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0046.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Flaccus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1035.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argonautica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2300\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aemilius Sura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemSura\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2300.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Annis Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9221\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paulus, Quaestor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PaulQuaest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9221.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0682\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varius Rufus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0682.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0682.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1342\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Siculus Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SicFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1342.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Condicionibus Agrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CondAgr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0920\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucilius Iunior\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LucilIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0920.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Seneca, Lucius Annaeus (the younger)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SenPhil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1017.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hercules Furens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HerF\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Troades\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tro\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phoenissae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phoen\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phaedra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phaed\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Oedipus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Oed\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Agamemnon\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ag\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Thyestes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Thy\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hercules Oetaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HerO\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Octavia [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Oct\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apocolocyntosis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apoc\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dialogi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dial\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Beneficiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ben\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Clementia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cl\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae Morales ad Lucilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naturales Quaestiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nat\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"e Cleanthe versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Patris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitPatr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0125\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevola, Publius Mucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PScaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0125.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0642\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sevius Nicanor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0642.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1377\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta Bobiensia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FrgBob\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1377.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Littera\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Litt\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Accentibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Acc\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Propriis Nominibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PropNom\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Nomine\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nom\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Versibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vers\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finalibus Syllabis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FinSyll\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Structuris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Struct\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi3211\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argum. Aen. et Tetrast.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi3211.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argumenta Aeneidis, Decasticha\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Deca\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argumenta Aeneidis, Monosticha\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mono\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tetrasticha in Vergilii Bucolica et Georgica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tetr\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tetrasticha in Vergilii Aeneida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TetrAen\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0630\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sacra Argeorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SacrArg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0630.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sacra Argeorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0588\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nepos, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0588.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vitae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vit\"}]},{\"urn\":\"urn:cts:latinLit:phi0588.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0676\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Antias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ValAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0676.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quintillian\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quint\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institutio Oratoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inst\"}]},{\"urn\":\"urn:cts:latinLit:phi1002.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes Minores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Decl\"}]},{\"urn\":\"urn:cts:latinLit:phi1002.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes Maiores [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeclMaior\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0540\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laurea, Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laurea\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0540.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma in Ciceronis obitum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caecilius Statius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caecil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0013.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Epici et Lyrici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonEpLyr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen Saliare\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmSal\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus sacrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersSacr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"sententia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"A. Atilii Calatini elogium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalElog\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen Priami\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmPriam\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"saturnius(?)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IncSat\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Acilii Glabrionis tabula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GlabTab\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"M. Aemilii cos. a. 179 tabula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemTab\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versiculi populares et pueriles\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersicPop\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praecepta rustica et medica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Praec\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma a Varrone Plauto attributum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrPlaut\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma Pacuvi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrPac\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ardeatis templi inscriptio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ArdInscr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"templi Tarracinensis inscriptio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TarInscr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"in Carbonem versus popularis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarbVers\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina Marciana et similia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmMarc\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Caesarem et similia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InCaes\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata et populares versus in Augustum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"obtrectatoris Vergilii versiculus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ObtrVerg\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de Crassitio epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CrassEpigr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"populares versus in Sarmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InSarm\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Tiberium et Germanicum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InTib\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"populares versus in Caligulam\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InCal\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"artificia metrica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Artif\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Neronem et eiusque successores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InNer\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Hor. Sat. I 10 praemissi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersHor\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus de VII sapientibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersSap\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"odarium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Odar\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Clementis(?)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PoetEp\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Caesares Romanos ex Historia Augusta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Orphici ab Arnobio conversi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersOrph\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tarentinus senarius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TarSen\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0033\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Venere et Amoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VenAmor\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Enniani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersEnn\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0036\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Luciliani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersLucil\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Catulliani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevCatul\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Catulliani a Morel omissi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevCatul2\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0039\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Augustei\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0040\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"serioris aetatis versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerAet\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus reciproci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersRecip\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0584\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mimi Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MimInc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0584.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mimi Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]},{\"urn\":\"urn:cts:latinLit:phi0584.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta dubia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"dub\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0067\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Favorinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fav\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0067.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0498\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cotta, Gaius Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cotta\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0498.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0321\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Porcius Licinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Porc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0321.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0130\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio Nascia Serapio, P. Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nasica\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0130.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0406\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alfenus Varus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0406.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1321\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pompon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1321.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Regularum, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Reg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0668\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scrofa, Gnaeus Tremelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tremel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0668.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de re rustica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0079\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hostius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Host\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0079.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Histricum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2434\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hilary, Saint, Archbishop of Arles\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2434.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0473\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lutatius Catulus, Q., Iunior\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LutatIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0473.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0061\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Pictor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FabPict\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0061.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0061.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuris Pontificis Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0550\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucretius Carus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lucr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0550.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rerum Natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DRN\"}]},{\"urn\":\"urn:cts:latinLit:phi0550.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0550.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Capitula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cap\"}]}]}]}");

/***/ }),

/***/ "./adapters/concordance/config.json":
/*!******************************************!*\
  !*** ./adapters/concordance/config.json ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"url\":\"https://latin.packhum.org/rst/concordance/\",\"sourceTextUrl\":\"https://latin.packhum.org\",\"rights\":\"Word usage examples are provided by The Packard Humanities Institute (https://packhum.org/). They are to be used only for personal study and are subject to the “Fair Use” principles of U.S. Copyright law.\",\"maxResultsOverride\":10000000}");

/***/ }),

/***/ "./adapters/lexicons/config.json":
/*!***************************************!*\
  !*** ./adapters/lexicons/config.json ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"https://github.com/alpheios-project/mjm\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/mjm/dat/grc-mjm-defs.dat\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"format\":{\"short\":\"text/html\"},\"description\":\"Definitions derived from Wilfred E. Major's Core Greek Vocabulary, extended with definitions from the Middle Liddell.\",\"rights_keys\":{\"ML\":\" \\\"An Intermediate Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University. Edits and additions provided by Vanessa Gorman, University of Nebraska.\",\"Major\":\" Wilfred E. Major, Core Greek Vocabulary for the First Two Years of Greek. CPL Online, Winter 2008. Edits and additions provided by Vanessa Gorman, University of Nebraska.\"}},\"https://github.com/alpheios-project/majorplus\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/majorplus/dat/grc-mjp-defs.dat\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"format\":{\"short\":\"text/html\"},\"description\":\"Definitions derived from Wilfred E. Major's Core Greek Vocabulary, extended with definitions from the LSJ.\",\"rights_keys\":{\"LSJ\":\" \\\"A Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University. Edits and additions provided by Vanessa Gorman, University of Nebraska.\",\"Major\":\" Wilfred E. Major, Core Greek Vocabulary for the First Two Years of Greek. CPL Online, Winter 2008. Edits and additions provided by Vanessa Gorman, University of Nebraska.\"}},\"https://github.com/alpheios-project/lsj\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"A Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott)\",\"rights\":\" \\\"A Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/aut\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/aut/dat/grc-aut-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/aut//dat/grc-aut-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=aut&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Autenrieth Homeric Dictionary\\\" (Geoerge Autenrieth)\",\"rights\":\" \\\"Autenrieth Homeric Dictionary\\\" (Geoerge Autenrieth). Provided by the Perseus Digital Library at Tufts University\"},\"https://github.com/alpheios-project/ml\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ml&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Middle Liddell\\\"\",\"rights\":\" \\\"An Intermediate Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University\"},\"https://github.com/alpheios-project/as\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/as/dat/grc-as-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=as&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"A Manual Greek Lexicon of the New Testament\\\"\",\"rights\":\" \\\"A Manual Greek Lexicon of the New Testament\\\" (G. Abbott-Smith). Provided by biblicalhumanities.org.\"},\"https://github.com/alpheios-project/dod\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-ids.dat\",\"full\":null},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Dodson\\\"\",\"rights\":\" \\\"A Public Domain lexicon by John Jeffrey Dodson (2010)\\\". Provided by biblicalhumanities.org.\"},\"https://github.com/alpheios-project/ls\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/ls/dat/lat-ls-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html\"},\"langs\":{\"source\":\"lat\",\"target\":\"en\"},\"description\":\"\\\"A Latin Dictionary\\\" (Charlton T. Lewis, Charles Short)\",\"rights\":\"\\\"A Latin Dictionary\\\" (Charlton T. Lewis, Charles Short). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/lan\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/lan/dat/ara-lan-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lan&lg=ara&out=html\"},\"langs\":{\"source\":\"ara\",\"target\":\"en\"},\"description\":\"\\\"The Arabic-English Lexicon\\\" (Edward Lane)\",\"rights\":\"\\\"The Arabic-English Lexicon\\\" (Edward Lane). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/sal\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/sal/dat/ara-sal-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=html\"},\"langs\":{\"source\":\"ara\",\"target\":\"en\"},\"description\":\"\\\"An Advanced Learner's Arabic Dictionary\\\" (H. Anthony Salmone)\",\"rights\":\"\\\"An Advanced Learner's Arabic Dictionary\\\" (H. Anthony Salmone). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/stg\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-ids.dat\",\"full\":null},\"langs\":{\"source\":\"per\",\"target\":\"en\"},\"description\":\"\\\"A Comprehensive Persian-English Dictionary\\\" (Francis Joseph Steingass)\",\"rights\":\"\\\"A Comprehensive Persian-English Dictionary\\\" (Francis Joseph Steingass). Provided by the Center for Advanced Study of Language (CASL) at the University of Maryland, College Park.\"}}");

/***/ }),

/***/ "./adapters/logeion/config.json":
/*!**************************************!*\
  !*** ./adapters/logeion/config.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"url\":\"https://api-v2.logeion.org/search?q=\",\"limit\":10,\"availableLangs\":[\"lat\",\"grc\"]}");

/***/ }),

/***/ "./adapters/tokenization/config.json":
/*!*******************************************!*\
  !*** ./adapters/tokenization/config.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"fetchOptions\":{\"baseUrl\":\"https://tools.alpheios.net/tokenizer/\",\"sourceType\":\"text\"}}");

/***/ }),

/***/ "./adapters/translations/config.json":
/*!*******************************************!*\
  !*** ./adapters/translations/config.json ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"url\":\"https://ats.alpheios.net\",\"availableLangSource\":[\"lat\"],\"rights\":\"Lemma translatins are extracted from data provided under the GNU GPL v3 license by the Collatinus Project (https://github.com/biblissima/collatinus), which is developed and maintained by Yves Ouvrard and Philippe Verkerk.\",\"deafultLang\":\"eng\",\"langMap\":{\"en-US\":\"eng\",\"it\":\"ita\",\"pt\":\"por\",\"ca\":\"cat\",\"fr\":\"fre\",\"de\":\"ger\",\"es\":\"spa\"}}");

/***/ }),

/***/ "./adapters/tufts/config.json":
/*!************************************!*\
  !*** ./adapters/tufts/config.json ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"engine\":{\"lat\":[\"whitakerLat\"],\"grc\":[\"morpheusgrc\"],\"ara\":[\"aramorph\"],\"per\":[\"hazm\"],\"gez\":[\"traces\"],\"syr\":[\"sedra\"]},\"url\":\"https://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG&clientId=r_CLIENT\",\"allowUnknownValues\":true,\"featuresArray\":[[\"pofs\",\"part\"],[\"case\",\"grmCase\"],[\"gend\",\"gender\"],[\"decl\",\"declension\"],[\"conj\",\"conjugation\"],[\"area\",\"area\"],[\"age\",\"age\"],[\"geo\",\"geo\"],[\"freq\",\"frequency\"],[\"note\",\"note\"],[\"pron\",\"pronunciation\"],[\"kind\",\"kind\"],[\"src\",\"source\"]],\"featuresArrayAll\":[[\"pofs\",\"part\"],[\"case\",\"grmCase\"],[\"gend\",\"gender\"],[\"decl\",\"declension\"],[\"conj\",\"conjugation\"],[\"num\",\"number\"],[\"tense\",\"tense\"],[\"voice\",\"voice\"],[\"mood\",\"mood\"],[\"pers\",\"person\"],[\"comp\",\"comparison\"],[\"stemtype\",\"stemtype\"],[\"derivtype\",\"derivtype\"],[\"dial\",\"dialect\"],[\"morph\",\"morph\"]],\"attributeBasedFeatures\":[[\"paradigm\",\"cat\"]]}");

/***/ }),

/***/ "./locales/en-gb/messages.json":
/*!*************************************!*\
  !*** ./locales/en-gb/messages.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"COOKIE_TEST_MESSAGE\":{\"message\":\"This is a test message about a biscuit.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\"},\"NUM_LINES_TEST_MESSAGE\":{\"message\":\"There {numLines, plural, =0 {are no queues} =1 {is one queue} other {are # queues}}.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\",\"params\":[\"numLines\"]}}");

/***/ }),

/***/ "./locales/en-us/messages.json":
/*!*************************************!*\
  !*** ./locales/en-us/messages.json ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"COOKIE_TEST_MESSAGE\":{\"message\":\"This is a test message about a cookie.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\"},\"NUM_LINES_TEST_MESSAGE\":{\"message\":\"There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\",\"params\":[\"numLines\"]},\"MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE\":{\"message\":\"There is no engine for the given languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no engine is found for given languageID\",\"component\":\"morphology.tufts\",\"params\":[\"languageID\"]},\"MORPH_NO_HOMONYM\":{\"message\":\"There is no homonym for the given word - {word} and languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no homonym was returned from the source\",\"component\":\"morphology.tufts\",\"params\":[\"word\",\"languageID\"]},\"MORPH_TUFTS_NO_ANSWER_FOR_WORD\":{\"message\":\"There is no data from the source for the given word - {word} and languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no data was returned from the source\",\"component\":\"morphology.tufts\",\"params\":[\"word\",\"languageID\"]},\"MORPH_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for morph.tufts adapter - unknown\",\"component\":\"morphology.tufts\",\"params\":[\"message\"]},\"MORPH_TRANSFORM_NO_LANGUAGE\":{\"message\":\"No Language was defined from json object\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\"},\"MORPH_TRANSFORM_NO_LEMMA\":{\"message\":\"No Lemma was defined from json object\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\"},\"MORPH_TRANSFORM_NO_MAPPING_DATA\":{\"message\":\"No mapping data found for {language}\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\",\"params\":[\"language\"]},\"MORPH_TRANSFORM_INFLECTION_ERROR\":{\"message\":\"Error parsing inflection: {error}\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\",\"params\":[\"error\"]},\"BASIC_ADAPTER_NO_DATA_FROM_URL\":{\"message\":\"Remote service is unavailable - {url}\",\"description\":\"Error message for basic adapter - when no data was returned from the url\",\"component\":\"basic_adapter\",\"params\":[\"url\"]},\"BASIC_ADAPTER_EMPTY_URL\":{\"message\":\"Unable to get data from empty url\",\"description\":\"Error message for basic adapter - when empty url was given\",\"component\":\"basic_adapter\"},\"BASIC_ADAPTER_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for basic adapter - unknown\",\"component\":\"basic_adapter\",\"params\":[\"message\"]},\"BASIC_ADAPTER_URL_RESPONSE_FAILED\":{\"message\":\"Request doesn't return data - {statusCode}: {statusText}\",\"description\":\"Error message for basic adapter - unknown\",\"component\":\"basic_adapter\",\"params\":[\"statusCode\",\"statusText\"]},\"MORPH_TREEBANK_MISSING_REF\":{\"message\":\"Reference is missing from treebank request = {request}\",\"description\":\"Missing reference in treebank request\",\"component\":\"morph.treebank\",\"params\":[\"request\"]},\"MORPH_TREEBANK_UNSUPPORTED_LANGUAGE\":{\"message\":\"Unsupported treebank language ${languageId}\",\"description\":\"Unsupported treebank language\",\"component\":\"morph.treebank\",\"params\":[\"languageId\"]},\"MORPH_TREEBANK_NO_URL\":{\"message\":\"There is a problem with creating url for the given word - {word}\",\"description\":\"Error message for morph.treebank - no url for fetching data from treebank\",\"component\":\"morph.treebank\",\"params\":[\"word\"]},\"MORPH_TREEBANK_NO_ANSWER_FOR_WORD\":{\"message\":\"There is no data from the source for the given word - {word}\",\"description\":\"Error message for morphology.treebank adapter - when no data was returned from the source\",\"component\":\"morphology.treebank\",\"params\":[\"word\"]},\"MORPH_TREEBANK_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for morph.treebank adapter - unknown\",\"component\":\"morphology.treebank\",\"params\":[\"message\"]},\"TRANSLATION_INPUT_PREPARE_ERROR\":{\"message\":\"Some problems with preparing input for geting translations - {input}\",\"description\":\"Error message for lemmatranslation.alpheios adapter - problems with input\",\"component\":\"lemmatranslation.alpheios\",\"params\":[\"input\"]},\"TRANSLATION_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for lemmatranslation.alpheios adapter - unknown\",\"component\":\"lemmatranslation.alpheios\",\"params\":[\"message\"]},\"TRANSLATION_INCORRECT_LEXEMES\":{\"message\":\"There is no correct homonym in input\",\"description\":\"Error message for lemmatranslation.alpheios adapter - no lexemes\",\"component\":\"lemmatranslation.alpheios\"},\"LEXICONS_NO_ALLOWED_URL\":{\"message\":\"There are no allowed urls in the options\",\"description\":\"Error message for lexicon.alpheios adapter - no urls were found in options\",\"component\":\"lexicon.alpheios\"},\"LEXICONS_FAILED_CACHED_DATA\":{\"message\":\"There is a problem with catching data from lexicon source - {message}\",\"description\":\"Error message for lexicon.alpheios adapter - some problems with getting cached data\",\"component\":\"lexicon.alpheios\",\"params\":[\"message\"]},\"LEXICONS_FAILED_APPEND_DEFS\":{\"message\":\"There is a problem with updating definitions - {message}\",\"description\":\"Error message for lexicon.alpheios adapter - some problems with updating definitions\",\"component\":\"lexicon.alpheios\",\"params\":[\"message\"]},\"LEXICONS_NO_FULL_URL\":{\"message\":\"No full url is defined for definitions\",\"description\":\"Error message for lexicon.alpheios adapter - no full url is defined\",\"component\":\"lexicon.alpheios\"},\"LEXICONS_NO_DATA_FROM_URL\":{\"message\":\"No data recieved from url - {url}\",\"description\":\"Error message for lexicon.alpheios adapter - no data from url\",\"component\":\"lexicon.alpheios\",\"params\":[\"url\"]},\"CONCORDANCE_AUTHOR_UPLOAD_ERROR\":{\"message\":\"Some problems with retrieving from author/textWork config file - {message}\",\"description\":\"Error message for wordusageExamples.concordance adapter - problems with uploading data from author-work config file\",\"component\":\"wordusageExamples.concordance\",\"params\":[\"message\"]},\"CONCORDANCE_WORD_USAGE_FETCH_ERROR\":{\"message\":\"Some problems with fetching word usage examples from concordance api - {message}\",\"description\":\"Error message for wordusageExamples.concordance adapter - problems with fetching word usage examples from concordance api\",\"component\":\"wordusageExamples.concordance\",\"params\":[\"message\"]},\"LOGEION_FETCH_ERROR\":{\"message\":\"Some problems with fetching words from logeion api - {message}\",\"description\":\"Error message for autoCompleteWords.logeion adapter - problems with fetching words from logeion api\",\"component\":\"autoCompleteWords.logeion\",\"params\":[\"message\"]},\"LOGEION_FETCH_OPTIONS_ERROR\":{\"message\":\"There are no fetch options for Logeion API request\",\"description\":\"Error message for autoCompleteWords.logeion adapter - no apikey and baseurl for Logeion API\",\"component\":\"autoCompleteWords.logeion\"},\"TOKENIZATION_FETCH_ERROR\":{\"message\":\"Some problems with fetching words from Alpheios Tokenization API - {message}\",\"description\":\"Error message for Alpheios Tokenization adapter - problems with fetching words from api\",\"component\":\"tokenizationGroup.alpheios\",\"params\":[\"message\"]},\"TOKENIZATION_FETCH_OPTIONS_ERROR\":{\"message\":\"There are no fetch options for Alpheios Tokenization API request\",\"description\":\"Error message - no apikey and baseurl for Alpheios Tokenization API\",\"component\":\"tokenizationGroup.alpheios\"},\"TOKENIZATION_AVAILABILITY_ERROR\":{\"message\":\"Tokenization service is not available for passed fetch parameters (language)\",\"description\":\"Error message - tokenization service doesn't support passed language\",\"component\":\"tokenizationGroup.alpheios\"},\"DTSAPI_FETCH_ERROR\":{\"message\":\"Some problems with fetching words from DTS API - {message}\",\"description\":\"Error message for DTS API adapter - problems with fetching words from api\",\"component\":\"dtsapiGroup.general\",\"params\":[\"message\"]},\"DTSAPI_NO_OBLIGATORY_PROPS\":{\"message\":\"Not all obligatory parameters are defined for the method - {message}\",\"description\":\"Error message for DTS API adapter - problems with fetching words from api\",\"component\":\"dtsapiGroup.general\",\"params\":[\"message\"]}}");

/***/ }),

/***/ "alpheios-data-models":
/*!***************************************!*\
  !*** external "alpheios-data-models" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_data_models__;

/***/ }),

/***/ "alpheios-l10n":
/*!********************************!*\
  !*** external "alpheios-l10n" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_l10n__;

/***/ }),

/***/ "alpheios-messaging":
/*!*************************************!*\
  !*** external "alpheios-messaging" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_messaging__;

/***/ }),

/***/ "papaparse":
/*!****************************!*\
  !*** external "papaparse" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_papaparse__;

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;
});
//# sourceMappingURL=alpheios-client-adapters.js.map