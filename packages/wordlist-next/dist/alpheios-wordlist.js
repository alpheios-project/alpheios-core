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
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/axios/index.js":
/*!********************************************!*\
  !*** ../../../node_modules/axios/index.js ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "../../../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../../../node_modules/axios/lib/adapters/xhr.js":
/*!*******************************************************!*\
  !*** ../../../node_modules/axios/lib/adapters/xhr.js ***!
  \*******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../../../node_modules/axios/lib/core/settle.js");
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
      var password = config.auth.password || '';
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
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../../../node_modules/axios/lib/helpers/cookies.js");

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

    if (requestData === undefined) {
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../../../node_modules/axios/lib/cancel/Cancel.js":
/*!********************************************************!*\
  !*** ../../../node_modules/axios/lib/cancel/Cancel.js ***!
  \********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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

/***/ "../../../node_modules/axios/lib/core/InterceptorManager.js":
/*!******************************************************************!*\
  !*** ../../../node_modules/axios/lib/core/InterceptorManager.js ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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

  error.toJSON = function() {
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "../../../node_modules/axios/lib/core/settle.js":
/*!******************************************************!*\
  !*** ../../../node_modules/axios/lib/core/settle.js ***!
  \******************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
  if (!validateStatus || validateStatus(response.status)) {
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../../../node_modules/axios/lib/utils.js");

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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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

/***/ "../../../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!******************************************************************!*\
  !*** ../../../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
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
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
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
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "../node_modules/@apollo/client/cache/core/cache.js":
/*!**********************************************************!*\
  !*** ../node_modules/@apollo/client/cache/core/cache.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export ApolloCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApolloCache": () => /* binding */ ApolloCache
/* harmony export */ });
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");


var ApolloCache = (function () {
    function ApolloCache() {
        this.getFragmentDoc = (0,optimism__WEBPACK_IMPORTED_MODULE_0__.wrap)(_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentQueryDocument);
    }
    ApolloCache.prototype.recordOptimisticTransaction = function (transaction, optimisticId) {
        this.performTransaction(transaction, optimisticId);
    };
    ApolloCache.prototype.transformDocument = function (document) {
        return document;
    };
    ApolloCache.prototype.identify = function (object) {
        return;
    };
    ApolloCache.prototype.gc = function () {
        return [];
    };
    ApolloCache.prototype.modify = function (options) {
        return false;
    };
    ApolloCache.prototype.transformForLink = function (document) {
        return document;
    };
    ApolloCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            rootId: options.id || 'ROOT_QUERY',
            query: options.query,
            variables: options.variables,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.read({
            query: this.getFragmentDoc(options.fragment, options.fragmentName),
            variables: options.variables,
            rootId: options.id,
            optimistic: optimistic,
        });
    };
    ApolloCache.prototype.writeQuery = function (options) {
        return this.write({
            dataId: options.id || 'ROOT_QUERY',
            result: options.data,
            query: options.query,
            variables: options.variables,
            broadcast: options.broadcast,
        });
    };
    ApolloCache.prototype.writeFragment = function (options) {
        return this.write({
            dataId: options.id,
            result: options.data,
            variables: options.variables,
            query: this.getFragmentDoc(options.fragment, options.fragmentName),
            broadcast: options.broadcast,
        });
    };
    return ApolloCache;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/cache/core/types/Cache.js":
/*!****************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/core/types/Cache.js ***!
  \****************************************************************/
/*! namespace exports */
/*! export Cache [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": () => /* binding */ Cache
/* harmony export */ });
var Cache;
(function (Cache) {
})(Cache || (Cache = {}));


/***/ }),

/***/ "../node_modules/@apollo/client/cache/core/types/common.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/core/types/common.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export MissingFieldError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MissingFieldError": () => /* binding */ MissingFieldError
/* harmony export */ });
var MissingFieldError = (function () {
    function MissingFieldError(message, path, query, variables) {
        this.message = message;
        this.path = path;
        this.query = query;
        this.variables = variables;
    }
    return MissingFieldError;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/cache/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/@apollo/client/cache/index.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export ApolloCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Cache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InMemoryCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MissingFieldError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cacheSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [not provided] [no usage info] [missing usage info prevents renaming] */
/*! export defaultDataIdFromObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeVar [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.n, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApolloCache": () => /* reexport safe */ _core_cache_js__WEBPACK_IMPORTED_MODULE_0__.ApolloCache,
/* harmony export */   "Cache": () => /* reexport safe */ _core_types_Cache_js__WEBPACK_IMPORTED_MODULE_1__.Cache,
/* harmony export */   "MissingFieldError": () => /* reexport safe */ _core_types_common_js__WEBPACK_IMPORTED_MODULE_2__.MissingFieldError,
/* harmony export */   "isReference": () => /* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isReference,
/* harmony export */   "makeReference": () => /* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.makeReference,
/* harmony export */   "InMemoryCache": () => /* reexport safe */ _inmemory_inMemoryCache_js__WEBPACK_IMPORTED_MODULE_4__.InMemoryCache,
/* harmony export */   "makeVar": () => /* reexport safe */ _inmemory_reactiveVars_js__WEBPACK_IMPORTED_MODULE_5__.makeVar,
/* harmony export */   "cacheSlot": () => /* reexport safe */ _inmemory_reactiveVars_js__WEBPACK_IMPORTED_MODULE_5__.cacheSlot,
/* harmony export */   "defaultDataIdFromObject": () => /* reexport safe */ _inmemory_policies_js__WEBPACK_IMPORTED_MODULE_6__.defaultDataIdFromObject
/* harmony export */ });
/* harmony import */ var _core_cache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/cache.js */ "../node_modules/@apollo/client/cache/core/cache.js");
/* harmony import */ var _core_types_Cache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/types/Cache.js */ "../node_modules/@apollo/client/cache/core/types/Cache.js");
/* harmony import */ var _core_types_common_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/types/common.js */ "../node_modules/@apollo/client/cache/core/types/common.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _inmemory_inMemoryCache_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inmemory/inMemoryCache.js */ "../node_modules/@apollo/client/cache/inmemory/inMemoryCache.js");
/* harmony import */ var _inmemory_reactiveVars_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inmemory/reactiveVars.js */ "../node_modules/@apollo/client/cache/inmemory/reactiveVars.js");
/* harmony import */ var _inmemory_policies_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inmemory/policies.js */ "../node_modules/@apollo/client/cache/inmemory/policies.js");
/* harmony import */ var _inmemory_types_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inmemory/types.js */ "../node_modules/@apollo/client/cache/inmemory/types.js");
/* harmony import */ var _inmemory_types_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_inmemory_types_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _inmemory_types_js__WEBPACK_IMPORTED_MODULE_7__) if(["default","ApolloCache","Cache","MissingFieldError","isReference","makeReference","InMemoryCache","makeVar","cacheSlot","defaultDataIdFromObject"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _inmemory_types_js__WEBPACK_IMPORTED_MODULE_7__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);










/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/entityStore.js":
/*!********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/entityStore.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export EntityStore [provided] [no usage info] [missing usage info prevents renaming] */
/*! export supportsResultCaching [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityStore": () => /* binding */ EntityStore,
/* harmony export */   "supportsResultCaching": () => /* binding */ supportsResultCaching
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "../node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ "../node_modules/@apollo/client/cache/inmemory/helpers.js");





var DELETE = Object.create(null);
var delModifier = function () { return DELETE; };
var EntityStore = (function () {
    function EntityStore(policies, group) {
        var _this = this;
        this.policies = policies;
        this.group = group;
        this.data = Object.create(null);
        this.rootIds = Object.create(null);
        this.refs = Object.create(null);
        this.getFieldValue = function (objectOrReference, storeFieldName) { return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.maybeDeepFreeze)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objectOrReference)
            ? _this.get(objectOrReference.__ref, storeFieldName)
            : objectOrReference && objectOrReference[storeFieldName]); };
        this.canRead = function (objOrRef) {
            return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objOrRef)
                ? _this.has(objOrRef.__ref)
                : typeof objOrRef === "object";
        };
        this.toReference = function (objOrIdOrRef, mergeIntoStore) {
            if (typeof objOrIdOrRef === "string") {
                return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(objOrIdOrRef);
            }
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objOrIdOrRef)) {
                return objOrIdOrRef;
            }
            var id = _this.policies.identify(objOrIdOrRef)[0];
            if (id) {
                var ref = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(id);
                if (mergeIntoStore) {
                    _this.merge(id, objOrIdOrRef);
                }
                return ref;
            }
        };
    }
    EntityStore.prototype.toObject = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, this.data);
    };
    EntityStore.prototype.has = function (dataId) {
        return this.lookup(dataId, true) !== void 0;
    };
    EntityStore.prototype.get = function (dataId, fieldName) {
        this.group.depend(dataId, fieldName);
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.data, dataId)) {
            var storeObject = this.data[dataId];
            if (storeObject && _helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(storeObject, fieldName)) {
                return storeObject[fieldName];
            }
        }
        if (fieldName === "__typename" &&
            _helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.policies.rootTypenamesById, dataId)) {
            return this.policies.rootTypenamesById[dataId];
        }
        if (this instanceof Layer) {
            return this.parent.get(dataId, fieldName);
        }
    };
    EntityStore.prototype.lookup = function (dataId, dependOnExistence) {
        if (dependOnExistence)
            this.group.depend(dataId, "__exists");
        return _helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.data, dataId) ? this.data[dataId] :
            this instanceof Layer ? this.parent.lookup(dataId, dependOnExistence) : void 0;
    };
    EntityStore.prototype.merge = function (dataId, incoming) {
        var _this = this;
        var existing = this.lookup(dataId);
        var merged = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.DeepMerger(storeObjectReconciler).merge(existing, incoming);
        this.data[dataId] = merged;
        if (merged !== existing) {
            delete this.refs[dataId];
            if (this.group.caching) {
                var fieldsToDirty_1 = Object.create(null);
                if (!existing)
                    fieldsToDirty_1.__exists = 1;
                Object.keys(incoming).forEach(function (storeFieldName) {
                    if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
                        fieldsToDirty_1[(0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName)] = 1;
                        if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                            delete merged[storeFieldName];
                        }
                    }
                });
                Object.keys(fieldsToDirty_1).forEach(function (fieldName) { return _this.group.dirty(dataId, fieldName); });
            }
        }
    };
    EntityStore.prototype.modify = function (dataId, fields) {
        var _this = this;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
            var changedFields_1 = Object.create(null);
            var needToMerge_1 = false;
            var allDeleted_1 = true;
            var readField_1 = function (fieldNameOrOptions, from) { return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
                fieldName: fieldNameOrOptions,
                from: from || (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(dataId),
            } : fieldNameOrOptions, { store: _this }); };
            Object.keys(storeObject).forEach(function (storeFieldName) {
                var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
                var fieldValue = storeObject[storeFieldName];
                if (fieldValue === void 0)
                    return;
                var modify = typeof fields === "function"
                    ? fields
                    : fields[storeFieldName] || fields[fieldName];
                if (modify) {
                    var newValue = modify === delModifier ? DELETE :
                        modify((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.maybeDeepFreeze)(fieldValue), {
                            DELETE: DELETE,
                            fieldName: fieldName,
                            storeFieldName: storeFieldName,
                            isReference: _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference,
                            toReference: _this.toReference,
                            canRead: _this.canRead,
                            readField: readField_1,
                        });
                    if (newValue === DELETE)
                        newValue = void 0;
                    if (newValue !== fieldValue) {
                        changedFields_1[storeFieldName] = newValue;
                        needToMerge_1 = true;
                        fieldValue = newValue;
                    }
                }
                if (fieldValue !== void 0) {
                    allDeleted_1 = false;
                }
            });
            if (needToMerge_1) {
                this.merge(dataId, changedFields_1);
                if (allDeleted_1) {
                    if (this instanceof Layer) {
                        this.data[dataId] = void 0;
                    }
                    else {
                        delete this.data[dataId];
                    }
                    this.group.dirty(dataId, "__exists");
                }
                return true;
            }
        }
        return false;
    };
    EntityStore.prototype.delete = function (dataId, fieldName, args) {
        var _a;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
            var typename = this.getFieldValue(storeObject, "__typename");
            var storeFieldName = fieldName && args
                ? this.policies.getStoreFieldName({ typename: typename, fieldName: fieldName, args: args })
                : fieldName;
            return this.modify(dataId, storeFieldName ? (_a = {},
                _a[storeFieldName] = delModifier,
                _a) : delModifier);
        }
        return false;
    };
    EntityStore.prototype.evict = function (options) {
        var evicted = false;
        if (options.id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.data, options.id)) {
                evicted = this.delete(options.id, options.fieldName, options.args);
            }
            if (this instanceof Layer) {
                evicted = this.parent.evict(options) || evicted;
            }
            if (options.fieldName || evicted) {
                this.group.dirty(options.id, options.fieldName || "__exists");
            }
        }
        return evicted;
    };
    EntityStore.prototype.clear = function () {
        this.replace(null);
    };
    EntityStore.prototype.replace = function (newData) {
        var _this = this;
        Object.keys(this.data).forEach(function (dataId) {
            if (!(newData && _helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(newData, dataId))) {
                _this.delete(dataId);
            }
        });
        if (newData) {
            Object.keys(newData).forEach(function (dataId) {
                _this.merge(dataId, newData[dataId]);
            });
        }
    };
    EntityStore.prototype.retain = function (rootId) {
        return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
    };
    EntityStore.prototype.release = function (rootId) {
        if (this.rootIds[rootId] > 0) {
            var count = --this.rootIds[rootId];
            if (!count)
                delete this.rootIds[rootId];
            return count;
        }
        return 0;
    };
    EntityStore.prototype.getRootIdSet = function (ids) {
        if (ids === void 0) { ids = new Set(); }
        Object.keys(this.rootIds).forEach(ids.add, ids);
        if (this instanceof Layer) {
            this.parent.getRootIdSet(ids);
        }
        return ids;
    };
    EntityStore.prototype.gc = function () {
        var _this = this;
        var ids = this.getRootIdSet();
        var snapshot = this.toObject();
        ids.forEach(function (id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(snapshot, id)) {
                Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
                delete snapshot[id];
            }
        });
        var idsToRemove = Object.keys(snapshot);
        if (idsToRemove.length) {
            var root_1 = this;
            while (root_1 instanceof Layer)
                root_1 = root_1.parent;
            idsToRemove.forEach(function (id) { return root_1.delete(id); });
        }
        return idsToRemove;
    };
    EntityStore.prototype.findChildRefIds = function (dataId) {
        if (!_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.refs, dataId)) {
            var found_1 = this.refs[dataId] = Object.create(null);
            var workSet_1 = new Set([this.data[dataId]]);
            var canTraverse_1 = function (obj) { return obj !== null && typeof obj === 'object'; };
            workSet_1.forEach(function (obj) {
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(obj)) {
                    found_1[obj.__ref] = true;
                }
                else if (canTraverse_1(obj)) {
                    Object.values(obj)
                        .filter(canTraverse_1)
                        .forEach(workSet_1.add, workSet_1);
                }
            });
        }
        return this.refs[dataId];
    };
    EntityStore.prototype.makeCacheKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.group.keyMaker.lookupArray(args);
    };
    return EntityStore;
}());

var CacheGroup = (function () {
    function CacheGroup(caching) {
        this.caching = caching;
        this.d = null;
        this.keyMaker = new optimism__WEBPACK_IMPORTED_MODULE_0__.KeyTrie(_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.canUseWeakMap);
        this.d = caching ? (0,optimism__WEBPACK_IMPORTED_MODULE_0__.dep)() : null;
    }
    CacheGroup.prototype.depend = function (dataId, storeFieldName) {
        if (this.d) {
            this.d(makeDepKey(dataId, storeFieldName));
        }
    };
    CacheGroup.prototype.dirty = function (dataId, storeFieldName) {
        if (this.d) {
            this.d.dirty(makeDepKey(dataId, storeFieldName));
        }
    };
    return CacheGroup;
}());
function makeDepKey(dataId, storeFieldName) {
    return (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName) + '#' + dataId;
}
(function (EntityStore) {
    var Root = (function (_super) {
        (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__extends)(Root, _super);
        function Root(_a) {
            var policies = _a.policies, _b = _a.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a.seed;
            var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
            _this.sharedLayerGroup = new CacheGroup(resultCaching);
            if (seed)
                _this.replace(seed);
            return _this;
        }
        Root.prototype.addLayer = function (layerId, replay) {
            return new Layer(layerId, this, replay, this.sharedLayerGroup);
        };
        Root.prototype.removeLayer = function () {
            return this;
        };
        return Root;
    }(EntityStore));
    EntityStore.Root = Root;
})(EntityStore || (EntityStore = {}));
var Layer = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__extends)(Layer, _super);
    function Layer(id, parent, replay, group) {
        var _this = _super.call(this, parent.policies, group) || this;
        _this.id = id;
        _this.parent = parent;
        _this.replay = replay;
        _this.group = group;
        replay(_this);
        return _this;
    }
    Layer.prototype.addLayer = function (layerId, replay) {
        return new Layer(layerId, this, replay, this.group);
    };
    Layer.prototype.removeLayer = function (layerId) {
        var _this = this;
        var parent = this.parent.removeLayer(layerId);
        if (layerId === this.id) {
            if (this.group.caching) {
                Object.keys(this.data).forEach(function (dataId) {
                    if (_this.data[dataId] !== parent.lookup(dataId)) {
                        _this.delete(dataId);
                    }
                });
            }
            return parent;
        }
        if (parent === this.parent)
            return this;
        return parent.addLayer(this.id, this.replay);
    };
    Layer.prototype.toObject = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, this.parent.toObject()), this.data);
    };
    Layer.prototype.findChildRefIds = function (dataId) {
        var fromParent = this.parent.findChildRefIds(dataId);
        return _helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.data, dataId) ? (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
    };
    return Layer;
}(EntityStore));
function storeObjectReconciler(existingObject, incomingObject, property) {
    var existingValue = existingObject[property];
    var incomingValue = incomingObject[property];
    return (0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store) {
    return !!(store instanceof EntityStore && store.group.caching);
}


/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/fixPolyfills.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/fixPolyfills.js ***!
  \*********************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {



/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/helpers.js":
/*!****************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/helpers.js ***!
  \****************************************************************/
/*! namespace exports */
/*! export fieldNameFromStoreName [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTypenameFromStoreObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hasOwn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isFieldValueToBeMerged [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeProcessedFieldsMerger [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storeValueIsStoreObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasOwn": () => /* binding */ hasOwn,
/* harmony export */   "getTypenameFromStoreObject": () => /* binding */ getTypenameFromStoreObject,
/* harmony export */   "fieldNameFromStoreName": () => /* binding */ fieldNameFromStoreName,
/* harmony export */   "storeValueIsStoreObject": () => /* binding */ storeValueIsStoreObject,
/* harmony export */   "isFieldValueToBeMerged": () => /* binding */ isFieldValueToBeMerged,
/* harmony export */   "makeProcessedFieldsMerger": () => /* binding */ makeProcessedFieldsMerger
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");

var hasOwn = Object.prototype.hasOwnProperty;
function getTypenameFromStoreObject(store, objectOrReference) {
    return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isReference)(objectOrReference)
        ? store.get(objectOrReference.__ref, "__typename")
        : objectOrReference && objectOrReference.__typename;
}
var FieldNamePattern = /^[_A-Za-z0-9]+/;
function fieldNameFromStoreName(storeFieldName) {
    var match = storeFieldName.match(FieldNamePattern);
    return match ? match[0] : storeFieldName;
}
function storeValueIsStoreObject(value) {
    return value !== null &&
        typeof value === "object" &&
        !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isReference)(value) &&
        !Array.isArray(value);
}
function isFieldValueToBeMerged(value) {
    var field = value && value.__field;
    return field && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isField)(field);
}
function makeProcessedFieldsMerger() {
    return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.DeepMerger(reconcileProcessedFields);
}
var reconcileProcessedFields = function (existingObject, incomingObject, property) {
    var existing = existingObject[property];
    var incoming = incomingObject[property];
    if (isFieldValueToBeMerged(existing)) {
        existing.__value = this.merge(existing.__value, isFieldValueToBeMerged(incoming)
            ? incoming.__value
            : incoming);
        return existing;
    }
    if (isFieldValueToBeMerged(incoming)) {
        incoming.__value = this.merge(existing, incoming.__value);
        return incoming;
    }
    return this.merge(existing, incoming);
};


/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/inMemoryCache.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/inMemoryCache.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export InMemoryCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InMemoryCache": () => /* binding */ InMemoryCache
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _fixPolyfills_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixPolyfills.js */ "../node_modules/@apollo/client/cache/inmemory/fixPolyfills.js");
/* harmony import */ var _fixPolyfills_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fixPolyfills_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var _core_cache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/cache.js */ "../node_modules/@apollo/client/cache/core/cache.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _readFromStore_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./readFromStore.js */ "../node_modules/@apollo/client/cache/inmemory/readFromStore.js");
/* harmony import */ var _writeToStore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./writeToStore.js */ "../node_modules/@apollo/client/cache/inmemory/writeToStore.js");
/* harmony import */ var _entityStore_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./entityStore.js */ "../node_modules/@apollo/client/cache/inmemory/entityStore.js");
/* harmony import */ var _reactiveVars_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reactiveVars.js */ "../node_modules/@apollo/client/cache/inmemory/reactiveVars.js");
/* harmony import */ var _policies_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./policies.js */ "../node_modules/@apollo/client/cache/inmemory/policies.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers.js */ "../node_modules/@apollo/client/cache/inmemory/helpers.js");











var defaultConfig = {
    dataIdFromObject: _policies_js__WEBPACK_IMPORTED_MODULE_8__.defaultDataIdFromObject,
    addTypename: true,
    resultCaching: true,
    typePolicies: {},
};
var InMemoryCache = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__extends)(InMemoryCache, _super);
    function InMemoryCache(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.watches = new Set();
        _this.typenameDocumentCache = new Map();
        _this.makeVar = _reactiveVars_js__WEBPACK_IMPORTED_MODULE_7__.makeVar;
        _this.txCount = 0;
        _this.maybeBroadcastWatch = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.wrap)(function (c) {
            return _this.broadcastWatch.call(_this, c);
        }, {
            makeCacheKey: function (c) {
                var store = c.optimistic ? _this.optimisticData : _this.data;
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_6__.supportsResultCaching)(store)) {
                    var optimistic = c.optimistic, rootId = c.rootId, variables = c.variables;
                    return store.makeCacheKey(c.query, c.callback, JSON.stringify({ optimistic: optimistic, rootId: rootId, variables: variables }));
                }
            }
        });
        _this.watchDep = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.dep)();
        _this.config = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, defaultConfig), config);
        _this.addTypename = !!_this.config.addTypename;
        _this.policies = new _policies_js__WEBPACK_IMPORTED_MODULE_8__.Policies({
            cache: _this,
            dataIdFromObject: _this.config.dataIdFromObject,
            possibleTypes: _this.config.possibleTypes,
            typePolicies: _this.config.typePolicies,
        });
        _this.data = new _entityStore_js__WEBPACK_IMPORTED_MODULE_6__.EntityStore.Root({
            policies: _this.policies,
            resultCaching: _this.config.resultCaching,
        });
        _this.optimisticData = _this.data;
        _this.storeWriter = new _writeToStore_js__WEBPACK_IMPORTED_MODULE_5__.StoreWriter(_this, _this.storeReader = new _readFromStore_js__WEBPACK_IMPORTED_MODULE_4__.StoreReader({
            cache: _this,
            addTypename: _this.addTypename,
        }));
        return _this;
    }
    InMemoryCache.prototype.restore = function (data) {
        if (data)
            this.data.replace(data);
        return this;
    };
    InMemoryCache.prototype.extract = function (optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return (optimistic ? this.optimisticData : this.data).toObject();
    };
    InMemoryCache.prototype.read = function (options) {
        var store = options.optimistic ? this.optimisticData : this.data;
        if (typeof options.rootId === 'string' && !store.has(options.rootId)) {
            return null;
        }
        return this.storeReader.readQueryFromStore({
            store: store,
            query: options.query,
            variables: options.variables,
            rootId: options.rootId,
            config: this.config,
        }) || null;
    };
    InMemoryCache.prototype.write = function (options) {
        try {
            ++this.txCount;
            return this.storeWriter.writeToStore({
                store: this.data,
                query: options.query,
                result: options.result,
                dataId: options.dataId,
                variables: options.variables,
            });
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.modify = function (options) {
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_9__.hasOwn.call(options, "id") && !options.id) {
            return false;
        }
        var store = options.optimistic
            ? this.optimisticData
            : this.data;
        try {
            ++this.txCount;
            return store.modify(options.id || "ROOT_QUERY", options.fields);
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.diff = function (options) {
        return this.storeReader.diffQueryAgainstStore({
            store: options.optimistic ? this.optimisticData : this.data,
            rootId: options.id || "ROOT_QUERY",
            query: options.query,
            variables: options.variables,
            returnPartialData: options.returnPartialData,
            config: this.config,
        });
    };
    InMemoryCache.prototype.watch = function (watch) {
        var _this = this;
        this.watches.add(watch);
        if (watch.immediate) {
            this.maybeBroadcastWatch(watch);
        }
        return function () {
            _this.watches.delete(watch);
        };
    };
    InMemoryCache.prototype.gc = function () {
        return this.optimisticData.gc();
    };
    InMemoryCache.prototype.retain = function (rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).retain(rootId);
    };
    InMemoryCache.prototype.release = function (rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).release(rootId);
    };
    InMemoryCache.prototype.identify = function (object) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isReference)(object) ? object.__ref :
            this.policies.identify(object)[0];
    };
    InMemoryCache.prototype.evict = function (options) {
        if (!options.id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_9__.hasOwn.call(options, "id")) {
                return false;
            }
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, options), { id: "ROOT_QUERY" });
        }
        try {
            ++this.txCount;
            return this.optimisticData.evict(options);
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.reset = function () {
        this.data.clear();
        this.optimisticData = this.data;
        this.broadcastWatches();
        return Promise.resolve();
    };
    InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
        var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
        if (newOptimisticData !== this.optimisticData) {
            this.optimisticData = newOptimisticData;
            this.broadcastWatches();
        }
    };
    InMemoryCache.prototype.performTransaction = function (transaction, optimisticId) {
        var _this = this;
        var perform = function (layer) {
            var _a = _this, data = _a.data, optimisticData = _a.optimisticData;
            ++_this.txCount;
            if (layer) {
                _this.data = _this.optimisticData = layer;
            }
            try {
                transaction(_this);
            }
            finally {
                --_this.txCount;
                _this.data = data;
                _this.optimisticData = optimisticData;
            }
        };
        if (typeof optimisticId === 'string') {
            this.optimisticData = this.optimisticData.addLayer(optimisticId, perform);
        }
        else if (optimisticId === null) {
            perform(this.data);
        }
        else {
            perform();
        }
        this.broadcastWatches();
    };
    InMemoryCache.prototype.transformDocument = function (document) {
        if (this.addTypename) {
            var result = this.typenameDocumentCache.get(document);
            if (!result) {
                result = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.addTypenameToDocument)(document);
                this.typenameDocumentCache.set(document, result);
                this.typenameDocumentCache.set(result, result);
            }
            return result;
        }
        return document;
    };
    InMemoryCache.prototype.broadcastWatches = function () {
        var _this = this;
        if (!this.txCount) {
            this.watches.forEach(function (c) { return _this.maybeBroadcastWatch(c); });
        }
    };
    InMemoryCache.prototype.broadcastWatch = function (c) {
        this.watchDep.dirty(c);
        this.watchDep(c);
        c.callback(this.diff({
            query: c.query,
            variables: c.variables,
            optimistic: c.optimistic,
        }));
    };
    return InMemoryCache;
}(_core_cache_js__WEBPACK_IMPORTED_MODULE_2__.ApolloCache));



/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/policies.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/policies.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export Policies [provided] [no usage info] [missing usage info prevents renaming] */
/*! export defaultDataIdFromObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultDataIdFromObject": () => /* binding */ defaultDataIdFromObject,
/* harmony export */   "Policies": () => /* binding */ Policies
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ "../node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _reactiveVars_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reactiveVars.js */ "../node_modules/@apollo/client/cache/inmemory/reactiveVars.js");






function argsFromFieldSpecifier(spec) {
    return spec.args !== void 0 ? spec.args :
        spec.field ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.argumentsObjectFromField)(spec.field, spec.variables) : null;
}
var defaultDataIdFromObject = function (_a, context) {
    var __typename = _a.__typename, id = _a.id, _id = _a._id;
    if (typeof __typename === "string") {
        if (context) {
            context.keyObject =
                id !== void 0 ? { id: id } :
                    _id !== void 0 ? { _id: _id } :
                        void 0;
        }
        if (id === void 0)
            id = _id;
        if (id !== void 0) {
            return __typename + ":" + ((typeof id === "number" ||
                typeof id === "string") ? id : JSON.stringify(id));
        }
    }
};
var nullKeyFieldsFn = function () { return void 0; };
var simpleKeyArgsFn = function (_args, context) { return context.fieldName; };
var mergeTrueFn = function (existing, incoming, _a) {
    var mergeObjects = _a.mergeObjects;
    return mergeObjects(existing, incoming);
};
var mergeFalseFn = function (_, incoming) { return incoming; };
var Policies = (function () {
    function Policies(config) {
        this.config = config;
        this.typePolicies = Object.create(null);
        this.rootIdsByTypename = Object.create(null);
        this.rootTypenamesById = Object.create(null);
        this.usingPossibleTypes = false;
        this.storageTrie = new optimism__WEBPACK_IMPORTED_MODULE_0__.KeyTrie(true);
        this.config = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({ dataIdFromObject: defaultDataIdFromObject }, config);
        this.cache = this.config.cache;
        this.setRootTypename("Query");
        this.setRootTypename("Mutation");
        this.setRootTypename("Subscription");
        if (config.possibleTypes) {
            this.addPossibleTypes(config.possibleTypes);
        }
        if (config.typePolicies) {
            this.addTypePolicies(config.typePolicies);
        }
    }
    Policies.prototype.identify = function (object, selectionSet, fragmentMap) {
        var typename = selectionSet && fragmentMap
            ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getTypenameFromResult)(object, selectionSet, fragmentMap)
            : object.__typename;
        if (typename) {
            var rootId = this.rootIdsByTypename[typename];
            if ("string" === typeof rootId)
                return [rootId];
        }
        var context = {
            typename: typename,
            selectionSet: selectionSet,
            fragmentMap: fragmentMap,
        };
        var id;
        var policy = this.getTypePolicy(typename, false);
        var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
        while (keyFn) {
            var specifierOrId = keyFn(object, context);
            if (Array.isArray(specifierOrId)) {
                keyFn = keyFieldsFnFromSpecifier(specifierOrId);
            }
            else {
                id = specifierOrId;
                break;
            }
        }
        id = id && String(id);
        return context.keyObject ? [id, context.keyObject] : [id];
    };
    Policies.prototype.addTypePolicies = function (typePolicies) {
        var _this = this;
        Object.keys(typePolicies).forEach(function (typename) {
            var existing = _this.getTypePolicy(typename, true);
            var incoming = typePolicies[typename];
            var keyFields = incoming.keyFields, fields = incoming.fields;
            if (incoming.queryType)
                _this.setRootTypename("Query", typename);
            if (incoming.mutationType)
                _this.setRootTypename("Mutation", typename);
            if (incoming.subscriptionType)
                _this.setRootTypename("Subscription", typename);
            existing.keyFn =
                keyFields === false ? nullKeyFieldsFn :
                    Array.isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) :
                        typeof keyFields === "function" ? keyFields :
                            existing.keyFn;
            if (fields) {
                Object.keys(fields).forEach(function (fieldName) {
                    var existing = _this.getFieldPolicy(typename, fieldName, true);
                    var incoming = fields[fieldName];
                    if (typeof incoming === "function") {
                        existing.read = incoming;
                    }
                    else {
                        var keyArgs = incoming.keyArgs, read = incoming.read, merge = incoming.merge;
                        existing.keyFn =
                            keyArgs === false ? simpleKeyArgsFn :
                                Array.isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) :
                                    typeof keyArgs === "function" ? keyArgs :
                                        existing.keyFn;
                        if (typeof read === "function")
                            existing.read = read;
                        existing.merge =
                            typeof merge === "function" ? merge :
                                merge === true ? mergeTrueFn :
                                    merge === false ? mergeFalseFn :
                                        existing.merge;
                    }
                    if (existing.read && existing.merge) {
                        existing.keyFn = existing.keyFn || simpleKeyArgsFn;
                    }
                });
            }
        });
    };
    Policies.prototype.setRootTypename = function (which, typename) {
        if (typename === void 0) { typename = which; }
        var rootId = "ROOT_" + which.toUpperCase();
        var old = this.rootTypenamesById[rootId];
        if (typename !== old) {
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(!old || old === which, "Cannot change root " + which + " __typename more than once");
            if (old)
                delete this.rootIdsByTypename[old];
            this.rootIdsByTypename[typename] = rootId;
            this.rootTypenamesById[rootId] = typename;
        }
    };
    Policies.prototype.addPossibleTypes = function (possibleTypes) {
        var _this = this;
        this.usingPossibleTypes = true;
        Object.keys(possibleTypes).forEach(function (supertype) {
            var subtypeSet = _this.getSubtypeSet(supertype, true);
            possibleTypes[supertype].forEach(subtypeSet.add, subtypeSet);
        });
    };
    Policies.prototype.getTypePolicy = function (typename, createIfMissing) {
        if (typename) {
            return this.typePolicies[typename] || (createIfMissing && (this.typePolicies[typename] = Object.create(null)));
        }
    };
    Policies.prototype.getSubtypeSet = function (supertype, createIfMissing) {
        var policy = this.getTypePolicy(supertype, createIfMissing);
        if (policy) {
            return policy.subtypes || (createIfMissing ? policy.subtypes = new Set() : void 0);
        }
    };
    Policies.prototype.getFieldPolicy = function (typename, fieldName, createIfMissing) {
        var typePolicy = this.getTypePolicy(typename, createIfMissing);
        if (typePolicy) {
            var fieldPolicies = typePolicy.fields || (createIfMissing && (typePolicy.fields = Object.create(null)));
            if (fieldPolicies) {
                return fieldPolicies[fieldName] || (createIfMissing && (fieldPolicies[fieldName] = Object.create(null)));
            }
        }
    };
    Policies.prototype.fragmentMatches = function (fragment, typename) {
        var _this = this;
        if (!fragment.typeCondition)
            return true;
        if (!typename)
            return false;
        var supertype = fragment.typeCondition.name.value;
        if (typename === supertype)
            return true;
        if (this.usingPossibleTypes) {
            var workQueue_1 = [this.getSubtypeSet(supertype, false)];
            for (var i = 0; i < workQueue_1.length; ++i) {
                var subtypes = workQueue_1[i];
                if (subtypes) {
                    if (subtypes.has(typename))
                        return true;
                    subtypes.forEach(function (subtype) {
                        var subsubtypes = _this.getSubtypeSet(subtype, false);
                        if (subsubtypes && workQueue_1.indexOf(subsubtypes) < 0) {
                            workQueue_1.push(subsubtypes);
                        }
                    });
                }
            }
        }
        return false;
    };
    Policies.prototype.getStoreFieldName = function (fieldSpec) {
        var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
        var policy = this.getFieldPolicy(typename, fieldName, false);
        var storeFieldName;
        var keyFn = policy && policy.keyFn;
        if (keyFn && typename) {
            var context = {
                typename: typename,
                fieldName: fieldName,
                field: fieldSpec.field || null,
                variables: fieldSpec.variables,
            };
            var args = argsFromFieldSpecifier(fieldSpec);
            while (keyFn) {
                var specifierOrString = keyFn(args, context);
                if (Array.isArray(specifierOrString)) {
                    keyFn = keyArgsFnFromSpecifier(specifierOrString);
                }
                else {
                    storeFieldName = specifierOrString || fieldName;
                    break;
                }
            }
        }
        if (storeFieldName === void 0) {
            storeFieldName = fieldSpec.field
                ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.storeKeyNameFromField)(fieldSpec.field, fieldSpec.variables)
                : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getStoreKeyName)(fieldName, argsFromFieldSpecifier(fieldSpec));
        }
        return fieldName === (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName)
            ? storeFieldName
            : fieldName + ":" + storeFieldName;
    };
    Policies.prototype.readField = function (options, context) {
        var objectOrReference = options.from;
        if (!objectOrReference)
            return;
        var nameOrField = options.field || options.fieldName;
        if (!nameOrField)
            return;
        if (options.typename === void 0) {
            var typename = context.store.getFieldValue(objectOrReference, "__typename");
            if (typename)
                options.typename = typename;
        }
        var storeFieldName = this.getStoreFieldName(options);
        var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
        var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
        var policy = this.getFieldPolicy(options.typename, fieldName, false);
        var read = policy && policy.read;
        if (read) {
            var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, this.storageTrie.lookup((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objectOrReference)
                ? objectOrReference.__ref
                : objectOrReference, storeFieldName));
            return _reactiveVars_js__WEBPACK_IMPORTED_MODULE_4__.cacheSlot.withValue(this.cache, read, [existing, readOptions]);
        }
        return existing;
    };
    Policies.prototype.hasMergeFunction = function (typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName, false);
        return !!(policy && policy.merge);
    };
    Policies.prototype.applyMerges = function (existing, incoming, context, storageKeys) {
        var _this = this;
        if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.isFieldValueToBeMerged)(incoming)) {
            var field = incoming.__field;
            var fieldName = field.name.value;
            var merge = this.getFieldPolicy(incoming.__typename, fieldName, false).merge;
            var storage = storageKeys
                ? this.storageTrie.lookupArray(storageKeys)
                : null;
            incoming = merge(existing, incoming.__value, makeFieldFunctionOptions(this, void 0, { typename: incoming.__typename, fieldName: fieldName,
                field: field, variables: context.variables }, context, storage));
        }
        if (Array.isArray(incoming)) {
            return incoming.map(function (item) { return _this.applyMerges(void 0, item, context); });
        }
        if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(incoming)) {
            var e_1 = existing;
            var i_1 = incoming;
            var firstStorageKey_1 = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(e_1)
                ? e_1.__ref
                : typeof e_1 === "object" && e_1;
            var newFields_1;
            Object.keys(i_1).forEach(function (storeFieldName) {
                var incomingValue = i_1[storeFieldName];
                var appliedValue = _this.applyMerges(context.store.getFieldValue(e_1, storeFieldName), incomingValue, context, firstStorageKey_1 ? [firstStorageKey_1, storeFieldName] : void 0);
                if (appliedValue !== incomingValue) {
                    newFields_1 = newFields_1 || Object.create(null);
                    newFields_1[storeFieldName] = appliedValue;
                }
            });
            if (newFields_1) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, i_1), newFields_1);
            }
        }
        return incoming;
    };
    return Policies;
}());

function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
    var storeFieldName = policies.getStoreFieldName(fieldSpec);
    var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
    var variables = fieldSpec.variables || context.variables;
    var _a = context.store, getFieldValue = _a.getFieldValue, toReference = _a.toReference, canRead = _a.canRead;
    return {
        args: argsFromFieldSpecifier(fieldSpec),
        field: fieldSpec.field || null,
        fieldName: fieldName,
        storeFieldName: storeFieldName,
        variables: variables,
        isReference: _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference,
        toReference: toReference,
        storage: storage,
        cache: policies.cache,
        canRead: canRead,
        readField: function (fieldNameOrOptions, from) {
            var options = typeof fieldNameOrOptions === "string" ? {
                fieldName: fieldNameOrOptions,
                from: from,
            } : (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, fieldNameOrOptions);
            if (void 0 === options.from) {
                options.from = objectOrReference;
            }
            if (void 0 === options.variables) {
                options.variables = variables;
            }
            return policies.readField(options, context);
        },
        mergeObjects: function (existing, incoming) {
            if (Array.isArray(existing) || Array.isArray(incoming)) {
                throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__.InvariantError("Cannot automatically merge arrays");
            }
            if (existing && typeof existing === "object" &&
                incoming && typeof incoming === "object") {
                var eType = getFieldValue(existing, "__typename");
                var iType = getFieldValue(incoming, "__typename");
                var typesDiffer = eType && iType && eType !== iType;
                var applied = policies.applyMerges(typesDiffer ? void 0 : existing, incoming, context);
                if (typesDiffer ||
                    !(0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(existing) ||
                    !(0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(applied)) {
                    return applied;
                }
                return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, existing), applied);
            }
            return incoming;
        }
    };
}
function keyArgsFnFromSpecifier(specifier) {
    return function (args, context) {
        return args ? context.fieldName + ":" + JSON.stringify(computeKeyObject(args, specifier)) : context.fieldName;
    };
}
function keyFieldsFnFromSpecifier(specifier) {
    var trie = new optimism__WEBPACK_IMPORTED_MODULE_0__.KeyTrie(_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.canUseWeakMap);
    return function (object, context) {
        var aliasMap;
        if (context.selectionSet && context.fragmentMap) {
            var info = trie.lookupArray([
                context.selectionSet,
                context.fragmentMap,
            ]);
            aliasMap = info.aliasMap || (info.aliasMap = makeAliasMap(context.selectionSet, context.fragmentMap));
        }
        var keyObject = context.keyObject =
            computeKeyObject(object, specifier, aliasMap);
        return context.typename + ":" + JSON.stringify(keyObject);
    };
}
function makeAliasMap(selectionSet, fragmentMap) {
    var map = Object.create(null);
    var workQueue = new Set([selectionSet]);
    workQueue.forEach(function (selectionSet) {
        selectionSet.selections.forEach(function (selection) {
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isField)(selection)) {
                if (selection.alias) {
                    var responseKey = selection.alias.value;
                    var storeKey = selection.name.value;
                    if (storeKey !== responseKey) {
                        var aliases = map.aliases || (map.aliases = Object.create(null));
                        aliases[storeKey] = responseKey;
                    }
                }
                if (selection.selectionSet) {
                    var subsets = map.subsets || (map.subsets = Object.create(null));
                    subsets[selection.name.value] =
                        makeAliasMap(selection.selectionSet, fragmentMap);
                }
            }
            else {
                var fragment = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentFromSelection)(selection, fragmentMap);
                if (fragment) {
                    workQueue.add(fragment.selectionSet);
                }
            }
        });
    });
    return map;
}
function computeKeyObject(response, specifier, aliasMap) {
    var keyObj = Object.create(null);
    var prevKey;
    specifier.forEach(function (s) {
        if (Array.isArray(s)) {
            if (typeof prevKey === "string") {
                var subsets = aliasMap && aliasMap.subsets;
                var subset = subsets && subsets[prevKey];
                keyObj[prevKey] = computeKeyObject(response[prevKey], s, subset);
            }
        }
        else {
            var aliases = aliasMap && aliasMap.aliases;
            var responseName = aliases && aliases[s] || s;
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(response, responseName), "Missing field '" + responseName + "' while computing key fields");
            keyObj[prevKey = s] = response[responseName];
        }
    });
    return keyObj;
}


/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/reactiveVars.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/reactiveVars.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export cacheSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeVar [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheSlot": () => /* binding */ cacheSlot,
/* harmony export */   "makeVar": () => /* binding */ makeVar
/* harmony export */ });
/* harmony import */ var _wry_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/context */ "../node_modules/@wry/context/lib/context.esm.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");


var varDep = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.dep)();
var cacheSlot = new _wry_context__WEBPACK_IMPORTED_MODULE_0__.Slot();
function makeVar(value) {
    var caches = new Set();
    return function rv(newValue) {
        if (arguments.length > 0) {
            if (value !== newValue) {
                value = newValue;
                varDep.dirty(rv);
                caches.forEach(broadcast);
            }
        }
        else {
            var cache = cacheSlot.getValue();
            if (cache)
                caches.add(cache);
            varDep(rv);
        }
        return value;
    };
}
function broadcast(cache) {
    if (cache.broadcastWatches) {
        cache.broadcastWatches();
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/readFromStore.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/readFromStore.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export StoreReader [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoreReader": () => /* binding */ StoreReader
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "../node_modules/optimism/lib/bundle.esm.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _entityStore_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entityStore.js */ "../node_modules/@apollo/client/cache/inmemory/entityStore.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers.js */ "../node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _core_types_common_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/types/common.js */ "../node_modules/@apollo/client/cache/core/types/common.js");







;
function missingFromInvariant(err, context) {
    return new _core_types_common_js__WEBPACK_IMPORTED_MODULE_5__.MissingFieldError(err.message, context.path.slice(), context.query, context.variables);
}
var StoreReader = (function () {
    function StoreReader(config) {
        var _this = this;
        this.config = config;
        this.executeSelectionSet = (0,optimism__WEBPACK_IMPORTED_MODULE_0__.wrap)(function (options) { return _this.execSelectionSetImpl(options); }, {
            keyArgs: function (options) {
                return [
                    options.selectionSet,
                    options.objectOrReference,
                    options.context,
                ];
            },
            makeCacheKey: function (selectionSet, parent, context) {
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_3__.supportsResultCaching)(context.store)) {
                    return context.store.makeCacheKey(selectionSet, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(parent) ? parent.__ref : parent, context.varString);
                }
            }
        });
        this.knownResults = new WeakMap();
        this.executeSubSelectedArray = (0,optimism__WEBPACK_IMPORTED_MODULE_0__.wrap)(function (options) {
            return _this.execSubSelectedArrayImpl(options);
        }, {
            makeCacheKey: function (_a) {
                var field = _a.field, array = _a.array, context = _a.context;
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_3__.supportsResultCaching)(context.store)) {
                    return context.store.makeCacheKey(field, array, context.varString);
                }
            }
        });
        this.config = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({ addTypename: true }, config);
    }
    StoreReader.prototype.readQueryFromStore = function (options) {
        return this.diffQueryAgainstStore((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, options), { returnPartialData: false })).result;
    };
    StoreReader.prototype.diffQueryAgainstStore = function (_a) {
        var store = _a.store, query = _a.query, _b = _a.rootId, rootId = _b === void 0 ? 'ROOT_QUERY' : _b, variables = _a.variables, _c = _a.returnPartialData, returnPartialData = _c === void 0 ? true : _c;
        var policies = this.config.cache.policies;
        variables = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultValues)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getQueryDefinition)(query))), variables);
        var execResult = this.executeSelectionSet({
            selectionSet: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getMainDefinition)(query).selectionSet,
            objectOrReference: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(rootId),
            context: {
                store: store,
                query: query,
                policies: policies,
                variables: variables,
                varString: JSON.stringify(variables),
                fragmentMap: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.createFragmentMap)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinitions)(query)),
                path: [],
            },
        });
        var hasMissingFields = execResult.missing && execResult.missing.length > 0;
        if (hasMissingFields && !returnPartialData) {
            throw execResult.missing[0];
        }
        return {
            result: execResult.result,
            missing: execResult.missing,
            complete: !hasMissingFields,
        };
    };
    StoreReader.prototype.isFresh = function (result, parent, selectionSet, context) {
        if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_3__.supportsResultCaching)(context.store) &&
            this.knownResults.get(result) === selectionSet) {
            var latest = this.executeSelectionSet.peek(selectionSet, parent, context);
            if (latest && result === latest.result) {
                return true;
            }
        }
        return false;
    };
    StoreReader.prototype.execSelectionSetImpl = function (_a) {
        var _this = this;
        var selectionSet = _a.selectionSet, objectOrReference = _a.objectOrReference, context = _a.context;
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objectOrReference) &&
            !context.policies.rootTypenamesById[objectOrReference.__ref] &&
            !context.store.has(objectOrReference.__ref)) {
            return {
                result: {},
                missing: [missingFromInvariant( false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__.InvariantError("Dangling reference to missing " + objectOrReference.__ref + " object"), context)],
            };
        }
        var fragmentMap = context.fragmentMap, variables = context.variables, policies = context.policies, store = context.store;
        var objectsToMerge = [];
        var finalResult = { result: null };
        var typename = store.getFieldValue(objectOrReference, "__typename");
        if (this.config.addTypename &&
            typeof typename === "string" &&
            !policies.rootIdsByTypename[typename]) {
            objectsToMerge.push({ __typename: typename });
        }
        function getMissing() {
            return finalResult.missing || (finalResult.missing = []);
        }
        function handleMissing(result) {
            var _a;
            if (result.missing)
                (_a = getMissing()).push.apply(_a, result.missing);
            return result.result;
        }
        var workSet = new Set(selectionSet.selections);
        workSet.forEach(function (selection) {
            var _a;
            if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.shouldInclude)(selection, variables))
                return;
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isField)(selection)) {
                var fieldValue = policies.readField({
                    fieldName: selection.name.value,
                    field: selection,
                    variables: context.variables,
                    from: objectOrReference,
                }, context);
                var resultName = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.resultKeyNameFromField)(selection);
                context.path.push(resultName);
                if (fieldValue === void 0) {
                    if (!_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.addTypenameToDocument.added(selection)) {
                        getMissing().push(missingFromInvariant( false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__.InvariantError("Can't find field '" + selection.name.value + "' on " + ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objectOrReference)
                            ? objectOrReference.__ref + " object"
                            : "object " + JSON.stringify(objectOrReference, null, 2))), context));
                    }
                }
                else if (Array.isArray(fieldValue)) {
                    fieldValue = handleMissing(_this.executeSubSelectedArray({
                        field: selection,
                        array: fieldValue,
                        context: context,
                    }));
                }
                else if (!selection.selectionSet) {
                    if (true) {
                        assertSelectionSetForIdValue(context.store, selection, fieldValue);
                        (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.maybeDeepFreeze)(fieldValue);
                    }
                }
                else if (fieldValue != null) {
                    fieldValue = handleMissing(_this.executeSelectionSet({
                        selectionSet: selection.selectionSet,
                        objectOrReference: fieldValue,
                        context: context,
                    }));
                }
                if (fieldValue !== void 0) {
                    objectsToMerge.push((_a = {}, _a[resultName] = fieldValue, _a));
                }
                (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(context.path.pop() === resultName);
            }
            else {
                var fragment = void 0;
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isInlineFragment)(selection)) {
                    fragment = selection;
                }
                else {
                     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(fragment = fragmentMap[selection.name.value], "No fragment named " + selection.name.value);
                }
                if (policies.fragmentMatches(fragment, typename)) {
                    fragment.selectionSet.selections.forEach(workSet.add, workSet);
                }
            }
        });
        finalResult.result = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.mergeDeepArray)(objectsToMerge);
        if (true) {
            Object.freeze(finalResult.result);
        }
        this.knownResults.set(finalResult.result, selectionSet);
        return finalResult;
    };
    StoreReader.prototype.execSubSelectedArrayImpl = function (_a) {
        var _this = this;
        var field = _a.field, array = _a.array, context = _a.context;
        var missing;
        function handleMissing(childResult, i) {
            if (childResult.missing) {
                missing = missing || [];
                missing.push.apply(missing, childResult.missing);
            }
            (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(context.path.pop() === i);
            return childResult.result;
        }
        if (field.selectionSet) {
            array = array.filter(context.store.canRead);
        }
        array = array.map(function (item, i) {
            if (item === null) {
                return null;
            }
            context.path.push(i);
            if (Array.isArray(item)) {
                return handleMissing(_this.executeSubSelectedArray({
                    field: field,
                    array: item,
                    context: context,
                }), i);
            }
            if (field.selectionSet) {
                return handleMissing(_this.executeSelectionSet({
                    selectionSet: field.selectionSet,
                    objectOrReference: item,
                    context: context,
                }), i);
            }
            if (true) {
                assertSelectionSetForIdValue(context.store, field, item);
            }
            (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(context.path.pop() === i);
            return item;
        });
        if (true) {
            Object.freeze(array);
        }
        return { result: array, missing: missing };
    };
    return StoreReader;
}());

function assertSelectionSetForIdValue(store, field, fieldValue) {
    if (!field.selectionSet) {
        var workSet_1 = new Set([fieldValue]);
        workSet_1.forEach(function (value) {
            if (value && typeof value === "object") {
                 false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_1__.invariant)(!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(value), "Missing selection set for object of type " + (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.getTypenameFromStoreObject)(store, value) + " returned for query field " + field.name.value);
                Object.values(value).forEach(workSet_1.add, workSet_1);
            }
        });
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/types.js":
/*!**************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/types.js ***!
  \**************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {



/***/ }),

/***/ "../node_modules/@apollo/client/cache/inmemory/writeToStore.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/cache/inmemory/writeToStore.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export StoreWriter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StoreWriter": () => /* binding */ StoreWriter
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "../node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ "../node_modules/@apollo/client/cache/inmemory/helpers.js");





;
var StoreWriter = (function () {
    function StoreWriter(cache, reader) {
        this.cache = cache;
        this.reader = reader;
    }
    StoreWriter.prototype.writeToStore = function (_a) {
        var query = _a.query, result = _a.result, dataId = _a.dataId, store = _a.store, variables = _a.variables;
        var operationDefinition = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getOperationDefinition)(query);
        var merger = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.makeProcessedFieldsMerger)();
        variables = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultValues)(operationDefinition)), variables);
        var objOrRef = this.processSelectionSet({
            result: result || Object.create(null),
            dataId: dataId,
            selectionSet: operationDefinition.selectionSet,
            context: {
                store: store,
                written: Object.create(null),
                merge: function (existing, incoming) {
                    return merger.merge(existing, incoming);
                },
                variables: variables,
                varString: JSON.stringify(variables),
                fragmentMap: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.createFragmentMap)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinitions)(query)),
            },
        });
        var ref = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objOrRef) ? objOrRef :
            dataId && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(dataId) || void 0;
        if (ref) {
            store.retain(ref.__ref);
        }
        return ref;
    };
    StoreWriter.prototype.processSelectionSet = function (_a) {
        var _this = this;
        var dataId = _a.dataId, result = _a.result, selectionSet = _a.selectionSet, context = _a.context, _b = _a.out, out = _b === void 0 ? {
            shouldApplyMerges: false,
        } : _b;
        var policies = this.cache.policies;
        var _c = policies.identify(result, selectionSet, context.fragmentMap), id = _c[0], keyObject = _c[1];
        dataId = dataId || id;
        if ("string" === typeof dataId) {
            var sets = context.written[dataId] || (context.written[dataId] = []);
            var ref = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(dataId);
            if (sets.indexOf(selectionSet) >= 0)
                return ref;
            sets.push(selectionSet);
            if (this.reader && this.reader.isFresh(result, ref, selectionSet, context)) {
                return ref;
            }
        }
        var mergedFields = Object.create(null);
        if (keyObject) {
            mergedFields = context.merge(mergedFields, keyObject);
        }
        var typename = (dataId && policies.rootTypenamesById[dataId]) ||
            (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getTypenameFromResult)(result, selectionSet, context.fragmentMap) ||
            (dataId && context.store.get(dataId, "__typename"));
        if ("string" === typeof typename) {
            mergedFields.__typename = typename;
        }
        var workSet = new Set(selectionSet.selections);
        workSet.forEach(function (selection) {
            var _a;
            if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.shouldInclude)(selection, context.variables))
                return;
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isField)(selection)) {
                var resultFieldKey = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.resultKeyNameFromField)(selection);
                var value = result[resultFieldKey];
                if (typeof value !== 'undefined') {
                    var storeFieldName = policies.getStoreFieldName({
                        typename: typename,
                        fieldName: selection.name.value,
                        field: selection,
                        variables: context.variables,
                    });
                    var incomingValue = _this.processFieldValue(value, selection, context, out);
                    if (policies.hasMergeFunction(typename, selection.name.value)) {
                        incomingValue = {
                            __field: selection,
                            __typename: typename,
                            __value: incomingValue,
                        };
                        out.shouldApplyMerges = true;
                    }
                    mergedFields = context.merge(mergedFields, (_a = {},
                        _a[storeFieldName] = incomingValue,
                        _a));
                }
                else if (policies.usingPossibleTypes &&
                    !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.hasDirectives)(["defer", "client"], selection)) {
                    throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("Missing field '" + resultFieldKey + "' in " + JSON.stringify(result, null, 2).substring(0, 100));
                }
            }
            else {
                var fragment = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentFromSelection)(selection, context.fragmentMap);
                if (fragment && policies.fragmentMatches(fragment, typename)) {
                    fragment.selectionSet.selections.forEach(workSet.add, workSet);
                }
            }
        });
        if ("string" === typeof dataId) {
            var entityRef_1 = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.makeReference)(dataId);
            if (out.shouldApplyMerges) {
                mergedFields = policies.applyMerges(entityRef_1, mergedFields, context);
            }
            if (true) {
                Object.keys(mergedFields).forEach(function (storeFieldName) {
                    var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
                    if (!policies.hasMergeFunction(typename, fieldName)) {
                        warnAboutDataLoss(entityRef_1, mergedFields, storeFieldName, context.store);
                    }
                });
            }
            context.store.merge(dataId, mergedFields);
            return entityRef_1;
        }
        return mergedFields;
    };
    StoreWriter.prototype.processFieldValue = function (value, field, context, out) {
        var _this = this;
        if (!field.selectionSet || value === null) {
            return  false ? 0 : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.cloneDeep)(value);
        }
        if (Array.isArray(value)) {
            return value.map(function (item) { return _this.processFieldValue(item, field, context, out); });
        }
        return this.processSelectionSet({
            result: value,
            selectionSet: field.selectionSet,
            context: context,
            out: out,
        });
    };
    return StoreWriter;
}());

var warnings = new Set();
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
    var getChild = function (objOrRef) {
        var child = store.getFieldValue(objOrRef, storeFieldName);
        return typeof child === "object" && child;
    };
    var existing = getChild(existingRef);
    if (!existing)
        return;
    var incoming = getChild(incomingObj);
    if (!incoming)
        return;
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(existing))
        return;
    if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(existing, incoming))
        return;
    if (Object.keys(existing).every(function (key) { return store.getFieldValue(incoming, key) !== void 0; })) {
        return;
    }
    var parentType = store.getFieldValue(existingRef, "__typename") ||
        store.getFieldValue(incomingObj, "__typename");
    var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
    var typeDotName = parentType + "." + fieldName;
    if (warnings.has(typeDotName))
        return;
    warnings.add(typeDotName);
    var childTypenames = [];
    if (!Array.isArray(existing) &&
        !Array.isArray(incoming)) {
        [existing, incoming].forEach(function (child) {
            var typename = store.getFieldValue(child, "__typename");
            if (typeof typename === "string" &&
                !childTypenames.includes(typename)) {
                childTypenames.push(typename);
            }
        });
    }
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn("Cache data may be lost when replacing the " + fieldName + " field of a " + parentType + " object.\n\nTo address this problem (which is not a bug in Apollo Client), " + (childTypenames.length
        ? "either ensure all objects of type " +
            childTypenames.join(" and ") + " have IDs, or "
        : "") + "define a custom merge function for the " + typeDotName + " field, so InMemoryCache can safely merge these objects:\n\n  existing: " + JSON.stringify(existing).slice(0, 1000) + "\n  incoming: " + JSON.stringify(incoming).slice(0, 1000) + "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n");
}


/***/ }),

/***/ "../node_modules/@apollo/client/core/ApolloClient.js":
/*!***********************************************************!*\
  !*** ../node_modules/@apollo/client/core/ApolloClient.js ***!
  \***********************************************************/
/*! namespace exports */
/*! export ApolloClient [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApolloClient": () => /* binding */ ApolloClient
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../link/core/index.js */ "../node_modules/@apollo/client/link/core/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../version.js */ "../node_modules/@apollo/client/version.js");
/* harmony import */ var _link_http_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../link/http/index.js */ "../node_modules/@apollo/client/link/http/index.js");
/* harmony import */ var _QueryManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./QueryManager.js */ "../node_modules/@apollo/client/core/QueryManager.js");
/* harmony import */ var _LocalState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LocalState.js */ "../node_modules/@apollo/client/core/LocalState.js");








var hasSuggestedDevtools = false;
var ApolloClient = (function () {
    function ApolloClient(options) {
        var _this = this;
        this.defaultOptions = {};
        this.resetStoreCallbacks = [];
        this.clearStoreCallbacks = [];
        var uri = options.uri, credentials = options.credentials, headers = options.headers, cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions, _d = options.assumeImmutableResults, assumeImmutableResults = _d === void 0 ? false : _d, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
        var link = options.link;
        if (!link) {
            link = uri
                ? new _link_http_index_js__WEBPACK_IMPORTED_MODULE_3__.HttpLink({ uri: uri, credentials: credentials, headers: headers })
                : _link_core_index_js__WEBPACK_IMPORTED_MODULE_1__.ApolloLink.empty();
        }
        if (!cache) {
            throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("To initialize Apollo Client, you must specify a 'cache' property " +
                "in the options object. \n" +
                "For more information, please visit: https://go.apollo.dev/c/docs");
        }
        this.link = link;
        this.cache = cache;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.defaultOptions = defaultOptions || {};
        this.typeDefs = typeDefs;
        if (ssrForceFetchDelay) {
            setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        var defaultConnectToDevTools =  true &&
            typeof window !== 'undefined' &&
            !window.__APOLLO_CLIENT__;
        if (typeof connectToDevTools === 'undefined'
            ? defaultConnectToDevTools
            : connectToDevTools && typeof window !== 'undefined') {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && "development" !== 'production') {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' &&
                window.document &&
                window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (window.navigator &&
                        window.navigator.userAgent &&
                        window.navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = _version_js__WEBPACK_IMPORTED_MODULE_6__.version;
        this.localState = new _LocalState_js__WEBPACK_IMPORTED_MODULE_5__.LocalState({
            cache: cache,
            client: this,
            resolvers: resolvers,
            fragmentMatcher: fragmentMatcher,
        });
        this.queryManager = new _QueryManager_js__WEBPACK_IMPORTED_MODULE_4__.QueryManager({
            cache: this.cache,
            link: this.link,
            queryDeduplication: queryDeduplication,
            ssrMode: ssrMode,
            clientAwareness: {
                name: clientAwarenessName,
                version: clientAwarenessVersion,
            },
            localState: this.localState,
            assumeImmutableResults: assumeImmutableResults,
            onBroadcast: function () {
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: {},
                        state: {
                            queries: _this.queryManager.getQueryStore(),
                            mutations: _this.queryManager.mutationStore.getStore(),
                        },
                        dataWithOptimisticResults: _this.cache.extract(true),
                    });
                }
            },
        });
    }
    ApolloClient.prototype.stop = function () {
        this.queryManager.stop();
    };
    ApolloClient.prototype.watchQuery = function (options) {
        if (this.defaultOptions.watchQuery) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.compact)(this.defaultOptions.watchQuery, options);
        }
        if (this.disableNetworkFetches &&
            (options.fetchPolicy === 'network-only' ||
                options.fetchPolicy === 'cache-and-network')) {
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_7__.__assign)({}, options), { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        if (this.defaultOptions.query) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.compact)(this.defaultOptions.query, options);
        }
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' +
            'client.query can only return a single result. Please use client.watchQuery ' +
            'to receive multiple results from the cache and the network, or consider ' +
            'using a different fetchPolicy, such as cache-first or network-only.');
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_7__.__assign)({}, options), { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        if (this.defaultOptions.mutate) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.compact)(this.defaultOptions.mutate, options);
        }
        return this.queryManager.mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readQuery(options, optimistic);
    };
    ApolloClient.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readFragment(options, optimistic);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        this.cache.writeQuery(options);
        this.queryManager.broadcastQueries();
    };
    ApolloClient.prototype.writeFragment = function (options) {
        this.cache.writeFragment(options);
        this.queryManager.broadcastQueries();
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.__requestRaw = function (payload) {
        return (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_1__.execute)(this.link, payload);
    };
    ApolloClient.prototype.resetStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this.queryManager.clearStore(); })
            .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
            .then(function () { return _this.reFetchObservableQueries(); });
    };
    ApolloClient.prototype.clearStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this.queryManager.clearStore(); })
            .then(function () { return Promise.all(_this.clearStoreCallbacks.map(function (fn) { return fn(); })); });
    };
    ApolloClient.prototype.onResetStore = function (cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function () {
            _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    ApolloClient.prototype.onClearStore = function (cb) {
        var _this = this;
        this.clearStoreCallbacks.push(cb);
        return function () {
            _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
        return this.queryManager.reFetchObservableQueries(includeStandby);
    };
    ApolloClient.prototype.extract = function (optimistic) {
        return this.cache.extract(optimistic);
    };
    ApolloClient.prototype.restore = function (serializedState) {
        return this.cache.restore(serializedState);
    };
    ApolloClient.prototype.addResolvers = function (resolvers) {
        this.localState.addResolvers(resolvers);
    };
    ApolloClient.prototype.setResolvers = function (resolvers) {
        this.localState.setResolvers(resolvers);
    };
    ApolloClient.prototype.getResolvers = function () {
        return this.localState.getResolvers();
    };
    ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
        this.localState.setFragmentMatcher(fragmentMatcher);
    };
    ApolloClient.prototype.setLink = function (newLink) {
        this.link = this.queryManager.link = newLink;
    };
    return ApolloClient;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/core/LocalState.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/core/LocalState.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export LocalState [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalState": () => /* binding */ LocalState
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql/language/visitor */ "../node_modules/graphql/language/visitor.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _cache_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cache/index.js */ "../node_modules/@apollo/client/cache/index.js");





var LocalState = (function () {
    function LocalState(_a) {
        var cache = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
        this.cache = cache;
        if (client) {
            this.client = client;
        }
        if (resolvers) {
            this.addResolvers(resolvers);
        }
        if (fragmentMatcher) {
            this.setFragmentMatcher(fragmentMatcher);
        }
    }
    LocalState.prototype.addResolvers = function (resolvers) {
        var _this = this;
        this.resolvers = this.resolvers || {};
        if (Array.isArray(resolvers)) {
            resolvers.forEach(function (resolverGroup) {
                _this.resolvers = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(_this.resolvers, resolverGroup);
            });
        }
        else {
            this.resolvers = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(this.resolvers, resolvers);
        }
    };
    LocalState.prototype.setResolvers = function (resolvers) {
        this.resolvers = {};
        this.addResolvers(resolvers);
    };
    LocalState.prototype.getResolvers = function () {
        return this.resolvers || {};
    };
    LocalState.prototype.runResolvers = function (_a) {
        var document = _a.document, remoteResult = _a.remoteResult, context = _a.context, variables = _a.variables, _b = _a.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_c) {
                if (document) {
                    return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, remoteResult), { data: localResult.result })); })];
                }
                return [2, remoteResult];
            });
        });
    };
    LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
        this.fragmentMatcher = fragmentMatcher;
    };
    LocalState.prototype.getFragmentMatcher = function () {
        return this.fragmentMatcher;
    };
    LocalState.prototype.clientQuery = function (document) {
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.hasDirectives)(['client'], document)) {
            if (this.resolvers) {
                return document;
            }
        }
        return null;
    };
    LocalState.prototype.serverQuery = function (document) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.removeClientSetsFromDocument)(document);
    };
    LocalState.prototype.prepareContext = function (context) {
        var cache = this.cache;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, context), { cache: cache,
            getCacheKey: function (obj) {
                return cache.identify(obj);
            } });
    };
    LocalState.prototype.addExportedVariables = function (document, variables, context) {
        if (variables === void 0) { variables = {}; }
        if (context === void 0) { context = {}; }
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_a) {
                if (document) {
                    return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, variables), data.exportedVariables)); })];
                }
                return [2, (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, variables)];
            });
        });
    };
    LocalState.prototype.shouldForceResolvers = function (document) {
        var forceResolvers = false;
        (0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_4__.visit)(document, {
            Directive: {
                enter: function (node) {
                    if (node.name.value === 'client' && node.arguments) {
                        forceResolvers = node.arguments.some(function (arg) {
                            return arg.name.value === 'always' &&
                                arg.value.kind === 'BooleanValue' &&
                                arg.value.value === true;
                        });
                        if (forceResolvers) {
                            return graphql_language_visitor__WEBPACK_IMPORTED_MODULE_4__.BREAK;
                        }
                    }
                },
            },
        });
        return forceResolvers;
    };
    LocalState.prototype.buildRootValueFromCache = function (document, variables) {
        return this.cache.diff({
            query: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.buildQueryFromSelectionSet)(document),
            variables: variables,
            returnPartialData: true,
            optimistic: false,
        }).result;
    };
    LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
        if (context === void 0) { context = {}; }
        if (variables === void 0) { variables = {}; }
        if (fragmentMatcher === void 0) { fragmentMatcher = function () { return true; }; }
        if (onlyRunForcedResolvers === void 0) { onlyRunForcedResolvers = false; }
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_b) {
                mainDefinition = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.getMainDefinition)(document);
                fragments = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentDefinitions)(document);
                fragmentMap = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.createFragmentMap)(fragments);
                definitionOperation = mainDefinition
                    .operation;
                defaultOperationType = definitionOperation
                    ? definitionOperation.charAt(0).toUpperCase() +
                        definitionOperation.slice(1)
                    : 'Query';
                _a = this, cache = _a.cache, client = _a.client;
                execContext = {
                    fragmentMap: fragmentMap,
                    context: (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, context), { cache: cache,
                        client: client }),
                    variables: variables,
                    fragmentMatcher: fragmentMatcher,
                    defaultOperationType: defaultOperationType,
                    exportedVariables: {},
                    onlyRunForcedResolvers: onlyRunForcedResolvers,
                };
                return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) { return ({
                        result: result,
                        exportedVariables: execContext.exportedVariables,
                    }); })];
            });
        });
    };
    LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            var fragmentMap, context, variables, resultsToMerge, execute;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_a) {
                fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
                resultsToMerge = [rootValue];
                execute = function (selection) { return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(_this, void 0, void 0, function () {
                    var fragment, typeCondition;
                    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_a) {
                        if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.shouldInclude)(selection, variables)) {
                            return [2];
                        }
                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isField)(selection)) {
                            return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                                    var _a;
                                    if (typeof fieldResult !== 'undefined') {
                                        resultsToMerge.push((_a = {},
                                            _a[(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.resultKeyNameFromField)(selection)] = fieldResult,
                                            _a));
                                    }
                                })];
                        }
                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isInlineFragment)(selection)) {
                            fragment = selection;
                        }
                        else {
                            fragment = fragmentMap[selection.name.value];
                             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragment, "No fragment named " + selection.name.value);
                        }
                        if (fragment && fragment.typeCondition) {
                            typeCondition = fragment.typeCondition.name.value;
                            if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                                return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                                        resultsToMerge.push(fragmentResult);
                                    })];
                            }
                        }
                        return [2];
                    });
                }); };
                return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
                        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeepArray)(resultsToMerge);
                    })];
            });
        });
    };
    LocalState.prototype.resolveField = function (field, rootValue, execContext) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_a) {
                variables = execContext.variables;
                fieldName = field.name.value;
                aliasedFieldName = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.resultKeyNameFromField)(field);
                aliasUsed = fieldName !== aliasedFieldName;
                defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
                resultPromise = Promise.resolve(defaultResult);
                if (!execContext.onlyRunForcedResolvers ||
                    this.shouldForceResolvers(field)) {
                    resolverType = rootValue.__typename || execContext.defaultOperationType;
                    resolverMap = this.resolvers && this.resolvers[resolverType];
                    if (resolverMap) {
                        resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                        if (resolve) {
                            resultPromise = Promise.resolve(_cache_index_js__WEBPACK_IMPORTED_MODULE_2__.cacheSlot.withValue(this.cache, resolve, [
                                rootValue,
                                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.argumentsObjectFromField)(field, variables),
                                execContext.context,
                                { field: field, fragmentMap: execContext.fragmentMap },
                            ]));
                        }
                    }
                }
                return [2, resultPromise.then(function (result) {
                        if (result === void 0) { result = defaultResult; }
                        if (field.directives) {
                            field.directives.forEach(function (directive) {
                                if (directive.name.value === 'export' && directive.arguments) {
                                    directive.arguments.forEach(function (arg) {
                                        if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                                            execContext.exportedVariables[arg.value.value] = result;
                                        }
                                    });
                                }
                            });
                        }
                        if (!field.selectionSet) {
                            return result;
                        }
                        if (result == null) {
                            return result;
                        }
                        if (Array.isArray(result)) {
                            return _this.resolveSubSelectedArray(field, result, execContext);
                        }
                        if (field.selectionSet) {
                            return _this.resolveSelectionSet(field.selectionSet, result, execContext);
                        }
                    })];
            });
        });
    };
    LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
        var _this = this;
        return Promise.all(result.map(function (item) {
            if (item === null) {
                return null;
            }
            if (Array.isArray(item)) {
                return _this.resolveSubSelectedArray(field, item, execContext);
            }
            if (field.selectionSet) {
                return _this.resolveSelectionSet(field.selectionSet, item, execContext);
            }
        }));
    };
    return LocalState;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/core/MutationStore.js":
/*!************************************************************!*\
  !*** ../node_modules/@apollo/client/core/MutationStore.js ***!
  \************************************************************/
/*! namespace exports */
/*! export MutationStore [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MutationStore": () => /* binding */ MutationStore
/* harmony export */ });
var MutationStore = (function () {
    function MutationStore() {
        this.store = {};
    }
    MutationStore.prototype.getStore = function () {
        return this.store;
    };
    MutationStore.prototype.get = function (mutationId) {
        return this.store[mutationId];
    };
    MutationStore.prototype.initMutation = function (mutationId, mutation, variables) {
        this.store[mutationId] = {
            mutation: mutation,
            variables: variables || {},
            loading: true,
            error: null,
        };
    };
    MutationStore.prototype.markMutationError = function (mutationId, error) {
        var mutation = this.store[mutationId];
        if (mutation) {
            mutation.loading = false;
            mutation.error = error;
        }
    };
    MutationStore.prototype.markMutationResult = function (mutationId) {
        var mutation = this.store[mutationId];
        if (mutation) {
            mutation.loading = false;
            mutation.error = null;
        }
    };
    MutationStore.prototype.reset = function () {
        this.store = {};
    };
    return MutationStore;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/core/ObservableQuery.js":
/*!**************************************************************!*\
  !*** ../node_modules/@apollo/client/core/ObservableQuery.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export ObservableQuery [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservableQuery": () => /* binding */ ObservableQuery
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "../node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./networkStatus.js */ "../node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _Reobserver_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Reobserver.js */ "../node_modules/@apollo/client/core/Reobserver.js");






var warnedAboutUpdateQuery = false;
var ObservableQuery = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__extends)(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var queryManager = _a.queryManager, queryInfo = _a.queryInfo, options = _a.options;
        var _this = _super.call(this, function (observer) {
            return _this.onSubscribe(observer);
        }) || this;
        _this.observers = new Set();
        _this.subscriptions = new Set();
        _this.observer = {
            next: function (result) {
                if (_this.lastError || _this.isDifferentFromLastResult(result)) {
                    _this.updateLastResult(result);
                    (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.iterateObserversSafely)(_this.observers, 'next', result);
                }
            },
            error: function (error) {
                _this.updateLastResult((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, _this.lastResult), { errors: error.graphQLErrors, networkStatus: _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.error, loading: false }));
                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.iterateObserversSafely)(_this.observers, 'error', _this.lastError = error);
            },
        };
        _this.isTornDown = false;
        _this.options = options;
        _this.queryId = queryManager.generateQueryId();
        var opDef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getOperationDefinition)(options.query);
        _this.queryName = opDef && opDef.name && opDef.name.value;
        _this.queryManager = queryManager;
        _this.queryInfo = queryInfo;
        return _this;
    }
    Object.defineProperty(ObservableQuery.prototype, "variables", {
        get: function () {
            return this.options.variables;
        },
        enumerable: false,
        configurable: true
    });
    ObservableQuery.prototype.result = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var observer = {
                next: function (result) {
                    resolve(result);
                    _this.observers.delete(observer);
                    if (!_this.observers.size) {
                        _this.queryManager.removeQuery(_this.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: reject,
            };
            var subscription = _this.subscribe(observer);
        });
    };
    ObservableQuery.prototype.getCurrentResult = function () {
        var _a = this, lastResult = _a.lastResult, lastError = _a.lastError;
        var networkStatus = this.queryInfo.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.ready;
        var result = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, (lastError ? { error: lastError } : lastResult)), { loading: (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.isNetworkRequestInFlight)(networkStatus), networkStatus: networkStatus });
        if (this.isTornDown) {
            return result;
        }
        var _b = this.options.fetchPolicy, fetchPolicy = _b === void 0 ? 'cache-first' : _b;
        if (fetchPolicy === 'no-cache' ||
            fetchPolicy === 'network-only') {
            result.partial = false;
        }
        else if (!result.data ||
            !this.queryManager.transform(this.options.query).hasForcedResolvers) {
            var diff = this.queryInfo.getDiff();
            result.partial = !diff.complete;
            result.data = (diff.complete ||
                this.options.returnPartialData) ? diff.result : void 0;
            if (diff.complete &&
                result.networkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.loading &&
                (fetchPolicy === 'cache-first' ||
                    fetchPolicy === 'cache-only')) {
                result.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.ready;
                result.loading = false;
            }
        }
        this.updateLastResult(result);
        return result;
    };
    ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
        return !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.lastResultSnapshot, newResult);
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.getLastError = function () {
        return this.lastError;
    };
    ObservableQuery.prototype.resetLastResults = function () {
        delete this.lastResult;
        delete this.lastResultSnapshot;
        delete this.lastError;
        this.isTornDown = false;
    };
    ObservableQuery.prototype.resetQueryStoreErrors = function () {
        this.queryManager.resetErrors(this.queryId);
    };
    ObservableQuery.prototype.refetch = function (variables) {
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === 'cache-only') {
            return Promise.reject( false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        var reobserveOptions = {
            pollInterval: 0,
        };
        if (fetchPolicy !== 'no-cache' &&
            fetchPolicy !== 'cache-and-network') {
            reobserveOptions.fetchPolicy = 'network-only';
            reobserveOptions.nextFetchPolicy = fetchPolicy;
        }
        if (variables && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.options.variables, variables)) {
            reobserveOptions.variables = this.options.variables = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, this.options.variables), variables);
        }
        return this.newReobserver(false).reobserve(reobserveOptions, _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.refetch);
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        var combinedOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, (fetchMoreOptions.query ? fetchMoreOptions : (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, this.options), fetchMoreOptions), { variables: (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, this.options.variables), fetchMoreOptions.variables) }))), { fetchPolicy: "no-cache" });
        var qid = this.queryManager.generateQueryId();
        if (combinedOptions.notifyOnNetworkStatusChange) {
            var currentResult = this.getCurrentResult();
            this.queryInfo.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.fetchMore;
            this.observer.next((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, currentResult), { loading: true, networkStatus: _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.fetchMore }));
        }
        return this.queryManager.fetchQuery(qid, combinedOptions, _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.fetchMore).then(function (fetchMoreResult) {
            var data = fetchMoreResult.data;
            var updateQuery = fetchMoreOptions.updateQuery;
            if (updateQuery) {
                if ( true &&
                    !warnedAboutUpdateQuery) {
                     false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn("The updateQuery callback for fetchMore is deprecated, and will be removed\nin the next major version of Apollo Client.\n\nPlease convert updateQuery functions to field policies with appropriate\nread and merge functions, or use/adapt a helper function (such as\nconcatPagination, offsetLimitPagination, or relayStylePagination) from\n@apollo/client/utilities.\n\nThe field policy system handles pagination more effectively than a\nhand-written updateQuery function, and you only need to define the policy\nonce, rather than every time you call fetchMore.");
                    warnedAboutUpdateQuery = true;
                }
                _this.updateQuery(function (previous) { return updateQuery(previous, {
                    fetchMoreResult: data,
                    variables: combinedOptions.variables,
                }); });
            }
            else {
                _this.queryManager.cache.writeQuery({
                    query: combinedOptions.query,
                    variables: combinedOptions.variables,
                    data: data,
                });
            }
            return fetchMoreResult;
        }).finally(function () {
            _this.queryManager.stopQuery(qid);
            _this.reobserve();
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var subscription = this.queryManager
            .startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
            context: options.context,
        })
            .subscribe({
            next: function (subscriptionData) {
                var updateQuery = options.updateQuery;
                if (updateQuery) {
                    _this.updateQuery(function (previous, _a) {
                        var variables = _a.variables;
                        return updateQuery(previous, {
                            subscriptionData: subscriptionData,
                            variables: variables,
                        });
                    });
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                    return;
                }
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.error('Unhandled GraphQL subscription error', err);
            },
        });
        this.subscriptions.add(subscription);
        return function () {
            if (_this.subscriptions.delete(subscription)) {
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (newOptions) {
        return this.reobserve(newOptions);
    };
    ObservableQuery.prototype.setVariables = function (variables) {
        if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.variables, variables)) {
            return this.observers.size
                ? this.result()
                : Promise.resolve();
        }
        this.options.variables = variables;
        if (!this.observers.size) {
            return Promise.resolve();
        }
        var _a = this.options.fetchPolicy, fetchPolicy = _a === void 0 ? 'cache-first' : _a;
        if (fetchPolicy !== 'cache-first' &&
            fetchPolicy !== 'no-cache' &&
            fetchPolicy !== 'network-only') {
            fetchPolicy = 'cache-and-network';
        }
        return this.reobserve({
            fetchPolicy: fetchPolicy,
            variables: variables,
        }, _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.setVariables);
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a;
        var queryManager = this.queryManager;
        var result = queryManager.cache.diff({
            query: this.options.query,
            variables: this.variables,
            previousResult: (_a = this.lastResult) === null || _a === void 0 ? void 0 : _a.data,
            returnPartialData: true,
            optimistic: false,
        }).result;
        var newResult = mapFn(result, {
            variables: this.variables,
        });
        if (newResult) {
            queryManager.cache.writeQuery({
                query: this.options.query,
                data: newResult,
                variables: this.variables,
            });
            queryManager.broadcastQueries();
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        this.getReobserver().updateOptions({ pollInterval: pollInterval });
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.reobserver) {
            this.reobserver.updateOptions({ pollInterval: 0 });
        }
    };
    ObservableQuery.prototype.updateLastResult = function (newResult) {
        var previousResult = this.lastResult;
        this.lastResult = newResult;
        this.lastResultSnapshot = this.queryManager.assumeImmutableResults
            ? newResult
            : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.cloneDeep)(newResult);
        if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonEmptyArray)(newResult.errors)) {
            delete this.lastError;
        }
        return previousResult;
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        if (observer === this.observer) {
            return function () { };
        }
        try {
            var subObserver = observer._subscription._observer;
            if (subObserver && !subObserver.error) {
                subObserver.error = defaultSubscriptionObserverErrorCallback;
            }
        }
        catch (_a) { }
        var first = !this.observers.size;
        this.observers.add(observer);
        if (this.lastError) {
            observer.error && observer.error(this.lastError);
        }
        else if (this.lastResult) {
            observer.next && observer.next(this.lastResult);
        }
        if (first) {
            this.reobserve().catch(function (_) {
            });
        }
        return function () {
            if (_this.observers.delete(observer) && !_this.observers.size) {
                _this.tearDownQuery();
            }
        };
    };
    ObservableQuery.prototype.getReobserver = function () {
        return this.reobserver || (this.reobserver = this.newReobserver(true));
    };
    ObservableQuery.prototype.newReobserver = function (shareOptions) {
        var _this = this;
        var _a = this, queryManager = _a.queryManager, queryId = _a.queryId;
        queryManager.setObservableQuery(this);
        return new _Reobserver_js__WEBPACK_IMPORTED_MODULE_4__.Reobserver(this.observer, shareOptions ? this.options : (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, this.options), function (currentOptions, newNetworkStatus) {
            queryManager.setObservableQuery(_this);
            return queryManager.fetchQueryObservable(queryId, currentOptions, newNetworkStatus);
        }, !queryManager.ssrMode && (function () { return !(0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.isNetworkRequestInFlight)(_this.queryInfo.networkStatus); }));
    };
    ObservableQuery.prototype.reobserve = function (newOptions, newNetworkStatus) {
        this.isTornDown = false;
        return this.getReobserver().reobserve(newOptions, newNetworkStatus);
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        var queryManager = this.queryManager;
        if (this.reobserver) {
            this.reobserver.stop();
            delete this.reobserver;
        }
        this.isTornDown = true;
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptions.clear();
        queryManager.stopQuery(this.queryId);
        this.observers.clear();
    };
    return ObservableQuery;
}(_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Observable));

function defaultSubscriptionObserverErrorCallback(error) {
     false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.error('Unhandled error', error.message, error.stack);
}


/***/ }),

/***/ "../node_modules/@apollo/client/core/QueryInfo.js":
/*!********************************************************!*\
  !*** ../node_modules/@apollo/client/core/QueryInfo.js ***!
  \********************************************************/
/*! namespace exports */
/*! export QueryInfo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryInfo": () => /* binding */ QueryInfo
/* harmony export */ });
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/equality */ "../node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./networkStatus.js */ "../node_modules/@apollo/client/core/networkStatus.js");



var QueryInfo = (function () {
    function QueryInfo(cache) {
        this.cache = cache;
        this.listeners = new Set();
        this.document = null;
        this.lastRequestId = 1;
        this.subscriptions = new Set();
        this.dirty = false;
        this.diff = null;
        this.observableQuery = null;
    }
    QueryInfo.prototype.init = function (query) {
        var networkStatus = query.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.loading;
        if (this.variables &&
            this.networkStatus !== _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.loading &&
            !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(this.variables, query.variables)) {
            networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.setVariables;
        }
        if (!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(query.variables, this.variables)) {
            this.diff = null;
        }
        Object.assign(this, {
            document: query.document,
            variables: query.variables,
            networkError: null,
            graphQLErrors: this.graphQLErrors || [],
            networkStatus: networkStatus,
        });
        if (query.observableQuery) {
            this.setObservableQuery(query.observableQuery);
        }
        if (query.lastRequestId) {
            this.lastRequestId = query.lastRequestId;
        }
        return this;
    };
    QueryInfo.prototype.getDiff = function (variables) {
        if (variables === void 0) { variables = this.variables; }
        if (this.diff && (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(variables, this.variables)) {
            return this.diff;
        }
        this.updateWatch(this.variables = variables);
        return this.diff = this.cache.diff({
            query: this.document,
            variables: variables,
            returnPartialData: true,
            optimistic: true,
        });
    };
    QueryInfo.prototype.setDiff = function (diff) {
        var _this = this;
        var oldDiff = this.diff;
        this.diff = diff;
        if (!this.dirty && (diff === null || diff === void 0 ? void 0 : diff.result) !== (oldDiff === null || oldDiff === void 0 ? void 0 : oldDiff.result)) {
            this.dirty = true;
            if (!this.notifyTimeout) {
                this.notifyTimeout = setTimeout(function () { return _this.notify(); }, 0);
            }
        }
    };
    QueryInfo.prototype.setObservableQuery = function (oq) {
        if (oq === this.observableQuery)
            return;
        if (this.oqListener) {
            this.listeners.delete(this.oqListener);
        }
        this.observableQuery = oq;
        if (oq) {
            oq["queryInfo"] = this;
            this.listeners.add(this.oqListener = function () { return oq.reobserve(); });
        }
        else {
            delete this.oqListener;
        }
    };
    QueryInfo.prototype.notify = function () {
        var _this = this;
        if (this.notifyTimeout) {
            clearTimeout(this.notifyTimeout);
            this.notifyTimeout = void 0;
        }
        if (this.shouldNotify()) {
            this.listeners.forEach(function (listener) { return listener(_this); });
        }
        this.dirty = false;
    };
    QueryInfo.prototype.shouldNotify = function () {
        if (!this.dirty || !this.listeners.size) {
            return false;
        }
        if ((0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.isNetworkRequestInFlight)(this.networkStatus) &&
            this.observableQuery) {
            var fetchPolicy = this.observableQuery.options.fetchPolicy;
            if (fetchPolicy !== "cache-only" &&
                fetchPolicy !== "cache-and-network") {
                return false;
            }
        }
        return true;
    };
    QueryInfo.prototype.stop = function () {
        this.cancel();
        delete this.cancel;
        var oq = this.observableQuery;
        if (oq)
            oq.stopPolling();
    };
    QueryInfo.prototype.cancel = function () { };
    QueryInfo.prototype.updateWatch = function (variables) {
        var _this = this;
        if (variables === void 0) { variables = this.variables; }
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
            return;
        }
        if (!this.lastWatch ||
            this.lastWatch.query !== this.document ||
            !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(variables, this.lastWatch.variables)) {
            this.cancel();
            this.cancel = this.cache.watch(this.lastWatch = {
                query: this.document,
                variables: variables,
                optimistic: true,
                callback: function (diff) { return _this.setDiff(diff); },
            });
        }
    };
    QueryInfo.prototype.markResult = function (result, options, allowCacheWrite) {
        var _this = this;
        this.graphQLErrors = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isNonEmptyArray)(result.errors) ? result.errors : [];
        if (options.fetchPolicy === 'no-cache') {
            this.diff = { result: result.data, complete: true };
        }
        else if (allowCacheWrite) {
            var ignoreErrors = options.errorPolicy === 'ignore' ||
                options.errorPolicy === 'all';
            var writeWithErrors = !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.graphQLResultHasError)(result);
            if (!writeWithErrors && ignoreErrors && result.data) {
                writeWithErrors = true;
            }
            if (writeWithErrors) {
                this.cache.performTransaction(function (cache) {
                    if (_this.lastWrittenResult &&
                        (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(result.data, _this.lastWrittenResult.data) &&
                        (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(options.variables, _this.lastWrittenVars)) {
                        if (_this.diff && _this.diff.complete) {
                            result.data = _this.diff.result;
                            return;
                        }
                    }
                    else {
                        cache.writeQuery({
                            query: _this.document,
                            data: result.data,
                            variables: options.variables,
                        });
                        _this.lastWrittenResult = result;
                        _this.lastWrittenVars = options.variables;
                    }
                    var diff = cache.diff({
                        query: _this.document,
                        variables: options.variables,
                        returnPartialData: true,
                        optimistic: true,
                    });
                    _this.updateWatch(options.variables);
                    _this.diff = diff;
                    if (diff.complete) {
                        result.data = diff.result;
                    }
                });
            }
            else {
                this.lastWrittenResult = this.lastWrittenVars = void 0;
            }
        }
    };
    QueryInfo.prototype.markReady = function () {
        this.networkError = null;
        return this.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.ready;
    };
    QueryInfo.prototype.markError = function (error) {
        this.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.error;
        this.lastWrittenResult = this.lastWrittenVars = void 0;
        if (error.graphQLErrors) {
            this.graphQLErrors = error.graphQLErrors;
        }
        if (error.networkError) {
            this.networkError = error.networkError;
        }
        return error;
    };
    return QueryInfo;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/core/QueryManager.js":
/*!***********************************************************!*\
  !*** ../node_modules/@apollo/client/core/QueryManager.js ***!
  \***********************************************************/
/*! namespace exports */
/*! export QueryManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QueryManager": () => /* binding */ QueryManager
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "../node_modules/@wry/equality/lib/equality.esm.js");
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../link/core/index.js */ "../node_modules/@apollo/client/link/core/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors/index.js */ "../node_modules/@apollo/client/errors/index.js");
/* harmony import */ var _MutationStore_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MutationStore.js */ "../node_modules/@apollo/client/core/MutationStore.js");
/* harmony import */ var _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ObservableQuery.js */ "../node_modules/@apollo/client/core/ObservableQuery.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./networkStatus.js */ "../node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _LocalState_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LocalState.js */ "../node_modules/@apollo/client/core/LocalState.js");
/* harmony import */ var _QueryInfo_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./QueryInfo.js */ "../node_modules/@apollo/client/core/QueryInfo.js");











var hasOwnProperty = Object.prototype.hasOwnProperty;
var QueryManager = (function () {
    function QueryManager(_a) {
        var cache = _a.cache, link = _a.link, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, _c = _a.onBroadcast, onBroadcast = _c === void 0 ? function () { return undefined; } : _c, _d = _a.ssrMode, ssrMode = _d === void 0 ? false : _d, _e = _a.clientAwareness, clientAwareness = _e === void 0 ? {} : _e, localState = _a.localState, assumeImmutableResults = _a.assumeImmutableResults;
        this.mutationStore = new _MutationStore_js__WEBPACK_IMPORTED_MODULE_5__.MutationStore();
        this.clientAwareness = {};
        this.queries = new Map();
        this.fetchCancelFns = new Map();
        this.transformCache = new (_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.canUseWeakMap ? WeakMap : Map)();
        this.queryIdCounter = 1;
        this.requestIdCounter = 1;
        this.mutationIdCounter = 1;
        this.inFlightLinkObservables = new Map();
        this.cache = cache;
        this.link = link;
        this.queryDeduplication = queryDeduplication;
        this.onBroadcast = onBroadcast;
        this.clientAwareness = clientAwareness;
        this.localState = localState || new _LocalState_js__WEBPACK_IMPORTED_MODULE_8__.LocalState({ cache: cache });
        this.ssrMode = ssrMode;
        this.assumeImmutableResults = !!assumeImmutableResults;
    }
    QueryManager.prototype.stop = function () {
        var _this = this;
        this.queries.forEach(function (_info, queryId) {
            _this.stopQueryNoBroadcast(queryId);
        });
        this.cancelPendingFetches( false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError('QueryManager stopped while query was in flight'));
    };
    QueryManager.prototype.cancelPendingFetches = function (error) {
        this.fetchCancelFns.forEach(function (cancel) { return cancel(error); });
        this.fetchCancelFns.clear();
    };
    QueryManager.prototype.mutate = function (_a) {
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, _c = _a.awaitRefetchQueries, awaitRefetchQueries = _c === void 0 ? false : _c, updateWithProxyFn = _a.update, _d = _a.errorPolicy, errorPolicy = _d === void 0 ? 'none' : _d, fetchPolicy = _a.fetchPolicy, _e = _a.context, context = _e === void 0 ? {} : _e;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function () {
            var mutationId, generateUpdateQueriesInfo, optimistic_1, self;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__generator)(this, function (_f) {
                switch (_f.label) {
                    case 0:
                         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.');
                         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(!fetchPolicy || fetchPolicy === 'no-cache', "Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.");
                        mutationId = this.generateMutationId();
                        mutation = this.transform(mutation).document;
                        variables = this.getVariables(mutation, variables);
                        if (!this.transform(mutation).hasClientExports) return [3, 2];
                        return [4, this.localState.addExportedVariables(mutation, variables, context)];
                    case 1:
                        variables = _f.sent();
                        _f.label = 2;
                    case 2:
                        generateUpdateQueriesInfo = function () {
                            var ret = {};
                            if (updateQueriesByName) {
                                _this.queries.forEach(function (_a, queryId) {
                                    var observableQuery = _a.observableQuery;
                                    if (observableQuery) {
                                        var queryName = observableQuery.queryName;
                                        if (queryName &&
                                            hasOwnProperty.call(updateQueriesByName, queryName)) {
                                            ret[queryId] = {
                                                updater: updateQueriesByName[queryName],
                                                queryInfo: _this.queries.get(queryId),
                                            };
                                        }
                                    }
                                });
                            }
                            return ret;
                        };
                        this.mutationStore.initMutation(mutationId, mutation, variables);
                        if (optimisticResponse) {
                            optimistic_1 = typeof optimisticResponse === 'function'
                                ? optimisticResponse(variables)
                                : optimisticResponse;
                            this.cache.recordOptimisticTransaction(function (cache) {
                                try {
                                    markMutationResult({
                                        mutationId: mutationId,
                                        result: { data: optimistic_1 },
                                        document: mutation,
                                        variables: variables,
                                        queryUpdatersById: generateUpdateQueriesInfo(),
                                        update: updateWithProxyFn,
                                    }, cache);
                                }
                                catch (error) {
                                     false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.error(error);
                                }
                            }, mutationId);
                        }
                        this.broadcastQueries();
                        self = this;
                        return [2, new Promise(function (resolve, reject) {
                                var storeResult;
                                var error;
                                self.getObservableFromLink(mutation, (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, context), { optimisticResponse: optimisticResponse }), variables, false).subscribe({
                                    next: function (result) {
                                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.graphQLResultHasError)(result) && errorPolicy === 'none') {
                                            error = new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({
                                                graphQLErrors: result.errors,
                                            });
                                            return;
                                        }
                                        self.mutationStore.markMutationResult(mutationId);
                                        if (fetchPolicy !== 'no-cache') {
                                            try {
                                                markMutationResult({
                                                    mutationId: mutationId,
                                                    result: result,
                                                    document: mutation,
                                                    variables: variables,
                                                    queryUpdatersById: generateUpdateQueriesInfo(),
                                                    update: updateWithProxyFn,
                                                }, self.cache);
                                            }
                                            catch (e) {
                                                error = new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({
                                                    networkError: e,
                                                });
                                                return;
                                            }
                                        }
                                        storeResult = result;
                                    },
                                    error: function (err) {
                                        self.mutationStore.markMutationError(mutationId, err);
                                        if (optimisticResponse) {
                                            self.cache.removeOptimistic(mutationId);
                                        }
                                        self.broadcastQueries();
                                        reject(new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({
                                            networkError: err,
                                        }));
                                    },
                                    complete: function () {
                                        if (error) {
                                            self.mutationStore.markMutationError(mutationId, error);
                                        }
                                        if (optimisticResponse) {
                                            self.cache.removeOptimistic(mutationId);
                                        }
                                        self.broadcastQueries();
                                        if (error) {
                                            reject(error);
                                            return;
                                        }
                                        if (typeof refetchQueries === 'function') {
                                            refetchQueries = refetchQueries(storeResult);
                                        }
                                        var refetchQueryPromises = [];
                                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonEmptyArray)(refetchQueries)) {
                                            refetchQueries.forEach(function (refetchQuery) {
                                                if (typeof refetchQuery === 'string') {
                                                    self.queries.forEach(function (_a) {
                                                        var observableQuery = _a.observableQuery;
                                                        if (observableQuery &&
                                                            observableQuery.queryName === refetchQuery) {
                                                            refetchQueryPromises.push(observableQuery.refetch());
                                                        }
                                                    });
                                                }
                                                else {
                                                    var queryOptions = {
                                                        query: refetchQuery.query,
                                                        variables: refetchQuery.variables,
                                                        fetchPolicy: 'network-only',
                                                    };
                                                    if (refetchQuery.context) {
                                                        queryOptions.context = refetchQuery.context;
                                                    }
                                                    refetchQueryPromises.push(self.query(queryOptions));
                                                }
                                            });
                                        }
                                        Promise.all(awaitRefetchQueries ? refetchQueryPromises : []).then(function () {
                                            if (errorPolicy === 'ignore' &&
                                                storeResult &&
                                                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.graphQLResultHasError)(storeResult)) {
                                                delete storeResult.errors;
                                            }
                                            resolve(storeResult);
                                        }, reject);
                                    },
                                });
                            })];
                }
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, networkStatus) {
        return this.fetchQueryObservable(queryId, options, networkStatus).promise;
    };
    QueryManager.prototype.getQueryStore = function () {
        var store = Object.create(null);
        this.queries.forEach(function (info, queryId) {
            store[queryId] = {
                variables: info.variables,
                networkStatus: info.networkStatus,
                networkError: info.networkError,
                graphQLErrors: info.graphQLErrors,
            };
        });
        return store;
    };
    QueryManager.prototype.resetErrors = function (queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo) {
            queryInfo.networkError = undefined;
            queryInfo.graphQLErrors = [];
        }
    };
    QueryManager.prototype.transform = function (document) {
        var transformCache = this.transformCache;
        if (!transformCache.has(document)) {
            var transformed = this.cache.transformDocument(document);
            var forLink = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.removeConnectionDirectiveFromDocument)(this.cache.transformForLink(transformed));
            var clientQuery = this.localState.clientQuery(transformed);
            var serverQuery = forLink && this.localState.serverQuery(forLink);
            var cacheEntry_1 = {
                document: transformed,
                hasClientExports: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.hasClientExports)(transformed),
                hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
                clientQuery: clientQuery,
                serverQuery: serverQuery,
                defaultVars: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getDefaultValues)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getOperationDefinition)(transformed)),
            };
            var add = function (doc) {
                if (doc && !transformCache.has(doc)) {
                    transformCache.set(doc, cacheEntry_1);
                }
            };
            add(document);
            add(transformed);
            add(clientQuery);
            add(serverQuery);
        }
        return transformCache.get(document);
    };
    QueryManager.prototype.getVariables = function (document, variables) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, this.transform(document).defaultVars), variables);
    };
    QueryManager.prototype.watchQuery = function (options) {
        options = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, options), { variables: this.getVariables(options.query, options.variables) });
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var queryInfo = new _QueryInfo_js__WEBPACK_IMPORTED_MODULE_9__.QueryInfo(this.cache);
        var observable = new _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_6__.ObservableQuery({
            queryManager: this,
            queryInfo: queryInfo,
            options: options,
        });
        this.queries.set(observable.queryId, queryInfo);
        queryInfo.init({
            document: options.query,
            observableQuery: observable,
            variables: options.variables,
        });
        return observable;
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.query, 'query option is required. You must specify your GraphQL document ' +
            'in the query option.');
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.');
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.');
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(!options.pollInterval, 'pollInterval option only supported on watchQuery.');
        var queryId = this.generateQueryId();
        return this.fetchQuery(queryId, options).finally(function () { return _this.stopQuery(queryId); });
    };
    QueryManager.prototype.generateQueryId = function () {
        return String(this.queryIdCounter++);
    };
    QueryManager.prototype.generateRequestId = function () {
        return this.requestIdCounter++;
    };
    QueryManager.prototype.generateMutationId = function () {
        return String(this.mutationIdCounter++);
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo)
            queryInfo.stop();
    };
    QueryManager.prototype.clearStore = function () {
        this.cancelPendingFetches( false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError('Store reset while query was in flight (not completed in link chain)'));
        this.queries.forEach(function (queryInfo) {
            if (queryInfo.observableQuery) {
                queryInfo.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.NetworkStatus.loading;
            }
            else {
                queryInfo.stop();
            }
        });
        this.mutationStore.reset();
        return this.cache.reset();
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        return this.clearStore().then(function () {
            return _this.reFetchObservableQueries();
        });
    };
    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
        var _this = this;
        if (includeStandby === void 0) { includeStandby = false; }
        var observableQueryPromises = [];
        this.queries.forEach(function (_a, queryId) {
            var observableQuery = _a.observableQuery;
            if (observableQuery) {
                var fetchPolicy = observableQuery.options.fetchPolicy;
                observableQuery.resetLastResults();
                if (fetchPolicy !== 'cache-only' &&
                    (includeStandby || fetchPolicy !== 'standby')) {
                    observableQueryPromises.push(observableQuery.refetch());
                }
                _this.getQuery(queryId).setDiff(null);
            }
        });
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.setObservableQuery = function (observableQuery) {
        this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
    };
    QueryManager.prototype.startGraphQLSubscription = function (_a) {
        var _this = this;
        var query = _a.query, fetchPolicy = _a.fetchPolicy, variables = _a.variables, _b = _a.context, context = _b === void 0 ? {} : _b;
        query = this.transform(query).document;
        variables = this.getVariables(query, variables);
        var makeObservable = function (variables) {
            return _this.getObservableFromLink(query, context, variables, false).map(function (result) {
                if (!fetchPolicy || fetchPolicy !== 'no-cache') {
                    if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.graphQLResultHasError)(result)) {
                        _this.cache.write({
                            query: query,
                            result: result.data,
                            dataId: 'ROOT_SUBSCRIPTION',
                            variables: variables,
                        });
                    }
                    _this.broadcastQueries();
                }
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.graphQLResultHasError)(result)) {
                    throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({
                        graphQLErrors: result.errors,
                    });
                }
                return result;
            });
        };
        if (this.transform(query).hasClientExports) {
            var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
            return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Observable(function (observer) {
                var sub = null;
                observablePromise_1.then(function (observable) { return sub = observable.subscribe(observer); }, observer.error);
                return function () { return sub && sub.unsubscribe(); };
            });
        }
        return makeObservable(variables);
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.stopQueryNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.removeQuery(queryId);
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        this.fetchCancelFns.delete(queryId);
        this.getQuery(queryId).subscriptions.forEach(function (x) { return x.unsubscribe(); });
        this.queries.delete(queryId);
    };
    QueryManager.prototype.broadcastQueries = function () {
        this.onBroadcast();
        this.queries.forEach(function (info) { return info.notify(); });
    };
    QueryManager.prototype.getLocalState = function () {
        return this.localState;
    };
    QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
        var _this = this;
        var _a;
        if (deduplication === void 0) { deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication; }
        var observable;
        var serverQuery = this.transform(query).serverQuery;
        if (serverQuery) {
            var _b = this, inFlightLinkObservables_1 = _b.inFlightLinkObservables, link = _b.link;
            var operation = {
                query: serverQuery,
                variables: variables,
                operationName: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getOperationName)(serverQuery) || void 0,
                context: this.prepareContext((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, context), { forceFetch: !deduplication })),
            };
            context = operation.context;
            if (deduplication) {
                var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
                inFlightLinkObservables_1.set(serverQuery, byVariables_1);
                var varJson_1 = JSON.stringify(variables);
                observable = byVariables_1.get(varJson_1);
                if (!observable) {
                    var concast = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Concast([
                        (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_2__.execute)(link, operation)
                    ]);
                    byVariables_1.set(varJson_1, observable = concast);
                    concast.cleanup(function () {
                        if (byVariables_1.delete(varJson_1) &&
                            byVariables_1.size < 1) {
                            inFlightLinkObservables_1.delete(serverQuery);
                        }
                    });
                }
            }
            else {
                observable = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Concast([
                    (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_2__.execute)(link, operation)
                ]);
            }
        }
        else {
            observable = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Concast([
                _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Observable.of({ data: {} })
            ]);
            context = this.prepareContext(context);
        }
        var clientQuery = this.transform(query).clientQuery;
        if (clientQuery) {
            observable = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.asyncMap)(observable, function (result) {
                return _this.localState.runResolvers({
                    document: clientQuery,
                    remoteResult: result,
                    context: context,
                    variables: variables,
                });
            });
        }
        return observable;
    };
    QueryManager.prototype.getResultsFromLink = function (queryInfo, allowCacheWrite, options) {
        var lastRequestId = queryInfo.lastRequestId;
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.asyncMap)(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function (result) {
            var hasErrors = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonEmptyArray)(result.errors);
            if (lastRequestId >= queryInfo.lastRequestId) {
                if (hasErrors && options.errorPolicy === "none") {
                    throw queryInfo.markError(new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({
                        graphQLErrors: result.errors,
                    }));
                }
                queryInfo.markResult(result, options, allowCacheWrite);
                queryInfo.markReady();
            }
            var aqr = {
                data: result.data,
                loading: false,
                networkStatus: queryInfo.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.NetworkStatus.ready,
            };
            if (hasErrors && options.errorPolicy !== "ignore") {
                aqr.errors = result.errors;
            }
            return aqr;
        }, function (networkError) {
            var error = (0,_errors_index_js__WEBPACK_IMPORTED_MODULE_4__.isApolloError)(networkError)
                ? networkError
                : new _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError({ networkError: networkError });
            if (lastRequestId >= queryInfo.lastRequestId) {
                queryInfo.markError(error);
            }
            throw error;
        });
    };
    QueryManager.prototype.fetchQueryObservable = function (queryId, options, networkStatus) {
        var _this = this;
        if (networkStatus === void 0) { networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.NetworkStatus.loading; }
        var query = this.transform(options.query).document;
        var variables = this.getVariables(query, options.variables);
        var queryInfo = this.getQuery(queryId);
        var oldNetworkStatus = queryInfo.networkStatus;
        var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a, _b = options.errorPolicy, errorPolicy = _b === void 0 ? "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
        var mightUseNetwork = fetchPolicy === "cache-first" ||
            fetchPolicy === "cache-and-network" ||
            fetchPolicy === "network-only" ||
            fetchPolicy === "no-cache";
        if (mightUseNetwork &&
            notifyOnNetworkStatusChange &&
            typeof oldNetworkStatus === "number" &&
            oldNetworkStatus !== networkStatus &&
            (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.isNetworkRequestInFlight)(networkStatus)) {
            if (fetchPolicy !== "cache-first") {
                fetchPolicy = "cache-and-network";
            }
            returnPartialData = true;
        }
        var normalized = Object.assign({}, options, {
            query: query,
            variables: variables,
            fetchPolicy: fetchPolicy,
            errorPolicy: errorPolicy,
            returnPartialData: returnPartialData,
            notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
            context: context,
        });
        var fromVariables = function (variables) {
            normalized.variables = variables;
            return _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
        };
        this.fetchCancelFns.set(queryId, function (reason) {
            Promise.resolve().then(function () { return concast.cancel(reason); });
        });
        var concast = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Concast(this.transform(normalized.query).hasClientExports
            ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables)
            : fromVariables(normalized.variables));
        concast.cleanup(function () {
            _this.fetchCancelFns.delete(queryId);
            if (options.nextFetchPolicy) {
                options.fetchPolicy = options.nextFetchPolicy;
                options.nextFetchPolicy = void 0;
            }
        });
        return concast;
    };
    QueryManager.prototype.fetchQueryByPolicy = function (queryInfo, options, networkStatus) {
        var _this = this;
        var query = options.query, variables = options.variables, fetchPolicy = options.fetchPolicy, errorPolicy = options.errorPolicy, returnPartialData = options.returnPartialData, context = options.context;
        queryInfo.init({
            document: query,
            variables: variables,
            lastRequestId: this.generateRequestId(),
            networkStatus: networkStatus,
        });
        var readCache = function () { return queryInfo.getDiff(variables); };
        var resultsFromCache = function (diff, networkStatus) {
            if (networkStatus === void 0) { networkStatus = queryInfo.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.NetworkStatus.loading; }
            var data = diff.result;
            if ( true &&
                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonEmptyArray)(diff.missing) &&
                !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(data, {})) {
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn("Missing cache result fields: " + diff.missing.map(function (m) { return m.path.join('.'); }).join(', '), diff.missing);
            }
            var fromData = function (data) { return _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.Observable.of((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({ data: data, loading: (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_7__.isNetworkRequestInFlight)(networkStatus), networkStatus: networkStatus }, (diff.complete ? null : { partial: true }))); };
            if (_this.transform(query).hasForcedResolvers) {
                return _this.localState.runResolvers({
                    document: query,
                    remoteResult: { data: data },
                    context: context,
                    variables: variables,
                    onlyRunForcedResolvers: true,
                }).then(function (resolved) { return fromData(resolved.data); });
            }
            return fromData(data);
        };
        var resultsFromLink = function (allowCacheWrite) {
            return _this.getResultsFromLink(queryInfo, allowCacheWrite, {
                variables: variables,
                context: context,
                fetchPolicy: fetchPolicy,
                errorPolicy: errorPolicy,
            });
        };
        switch (fetchPolicy) {
            default:
            case "cache-first": {
                var diff = readCache();
                if (diff.complete) {
                    return [
                        resultsFromCache(diff, queryInfo.markReady()),
                    ];
                }
                if (returnPartialData) {
                    return [
                        resultsFromCache(diff),
                        resultsFromLink(true),
                    ];
                }
                return [
                    resultsFromLink(true),
                ];
            }
            case "cache-and-network": {
                var diff = readCache();
                if (diff.complete || returnPartialData) {
                    return [
                        resultsFromCache(diff),
                        resultsFromLink(true),
                    ];
                }
                return [
                    resultsFromLink(true),
                ];
            }
            case "cache-only":
                return [
                    resultsFromCache(readCache(), queryInfo.markReady()),
                ];
            case "network-only":
                return [resultsFromLink(true)];
            case "no-cache":
                return [resultsFromLink(false)];
            case "standby":
                return [];
        }
    };
    QueryManager.prototype.getQuery = function (queryId) {
        if (queryId && !this.queries.has(queryId)) {
            this.queries.set(queryId, new _QueryInfo_js__WEBPACK_IMPORTED_MODULE_9__.QueryInfo(this.cache));
        }
        return this.queries.get(queryId);
    };
    QueryManager.prototype.prepareContext = function (context) {
        if (context === void 0) { context = {}; }
        var newContext = this.localState.prepareContext(context);
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, newContext), { clientAwareness: this.clientAwareness });
    };
    return QueryManager;
}());

function markMutationResult(mutation, cache) {
    if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.graphQLResultHasError)(mutation.result)) {
        var cacheWrites_1 = [{
                result: mutation.result.data,
                dataId: 'ROOT_MUTATION',
                query: mutation.document,
                variables: mutation.variables,
            }];
        var queryUpdatersById_1 = mutation.queryUpdatersById;
        if (queryUpdatersById_1) {
            Object.keys(queryUpdatersById_1).forEach(function (id) {
                var _a = queryUpdatersById_1[id], updater = _a.updater, _b = _a.queryInfo, document = _b.document, variables = _b.variables;
                var _c = cache.diff({
                    query: document,
                    variables: variables,
                    returnPartialData: true,
                    optimistic: false,
                }), currentQueryResult = _c.result, complete = _c.complete;
                if (complete && currentQueryResult) {
                    var nextQueryResult = updater(currentQueryResult, {
                        mutationResult: mutation.result,
                        queryName: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getOperationName)(document) || undefined,
                        queryVariables: variables,
                    });
                    if (nextQueryResult) {
                        cacheWrites_1.push({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            query: document,
                            variables: variables,
                        });
                    }
                }
            });
        }
        cache.performTransaction(function (c) {
            cacheWrites_1.forEach(function (write) { return c.write(write); });
            var update = mutation.update;
            if (update) {
                update(c, mutation.result);
            }
        }, null);
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/core/Reobserver.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/core/Reobserver.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export Reobserver [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Reobserver": () => /* binding */ Reobserver
/* harmony export */ });
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./networkStatus.js */ "../node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");



var Reobserver = (function () {
    function Reobserver(observer, options, fetch, shouldFetch) {
        this.observer = observer;
        this.options = options;
        this.fetch = fetch;
        this.shouldFetch = shouldFetch;
    }
    Reobserver.prototype.reobserve = function (newOptions, newNetworkStatus) {
        if (newOptions) {
            this.updateOptions(newOptions);
        }
        else {
            this.updatePolling();
        }
        var concast = this.fetch(this.options, newNetworkStatus);
        if (this.concast) {
            this.concast.removeObserver(this.observer, true);
        }
        concast.addObserver(this.observer);
        return (this.concast = concast).promise;
    };
    Reobserver.prototype.updateOptions = function (newOptions) {
        Object.assign(this.options, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.compact)(newOptions));
        this.updatePolling();
        return this;
    };
    Reobserver.prototype.stop = function () {
        if (this.concast) {
            this.concast.removeObserver(this.observer);
            delete this.concast;
        }
        if (this.pollingInfo) {
            clearTimeout(this.pollingInfo.timeout);
            this.options.pollInterval = 0;
            this.updatePolling();
        }
    };
    Reobserver.prototype.updatePolling = function () {
        var _this = this;
        var _a = this, pollingInfo = _a.pollingInfo, pollInterval = _a.options.pollInterval;
        if (!pollInterval) {
            if (pollingInfo) {
                clearTimeout(pollingInfo.timeout);
                delete this.pollingInfo;
            }
            return;
        }
        if (pollingInfo &&
            pollingInfo.interval === pollInterval) {
            return;
        }
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_2__.invariant)(pollInterval, 'Attempted to start a polling query without a polling interval.');
        if (this.shouldFetch === false) {
            return;
        }
        var info = pollingInfo || (this.pollingInfo = {});
        info.interval = pollInterval;
        var maybeFetch = function () {
            if (_this.pollingInfo) {
                if (_this.shouldFetch && _this.shouldFetch()) {
                    _this.reobserve({
                        fetchPolicy: "network-only",
                    }, _networkStatus_js__WEBPACK_IMPORTED_MODULE_0__.NetworkStatus.poll).then(poll, poll);
                }
                else {
                    poll();
                }
            }
            ;
        };
        var poll = function () {
            var info = _this.pollingInfo;
            if (info) {
                clearTimeout(info.timeout);
                info.timeout = setTimeout(maybeFetch, info.interval);
            }
        };
        poll();
    };
    return Reobserver;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/core/index.js":
/*!****************************************************!*\
  !*** ../node_modules/@apollo/client/core/index.js ***!
  \****************************************************/
/*! namespace exports */
/*! export ApolloCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ApolloClient [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ApolloError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ApolloLink [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export Cache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HttpLink [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export InMemoryCache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MissingFieldError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NetworkStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Observable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ObservableQuery [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkFetcher [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export concat [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export createHttpLink [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export createSignalIfSupported [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export default [not provided] [no usage info] [missing usage info prevents renaming] */
/*! export defaultDataIdFromObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export disableExperimentalFragmentVariables [provided] [no usage info] [missing usage info prevents renaming] */
/*! export disableFragmentWarnings [provided] [no usage info] [missing usage info prevents renaming] */
/*! export empty [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export enableExperimentalFragmentVariables [provided] [no usage info] [missing usage info prevents renaming] */
/*! export execute [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export fallbackHttpConfig [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export from [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export fromError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! export gql [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isApolloError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeVar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parseAndCheckHttpResponse [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export resetCaches [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rewriteURIForGET [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export selectHttpOptionsAndBody [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export selectURI [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export serializeFetchParameter [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export split [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! export throwServerError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export toPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.n, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApolloClient": () => /* reexport safe */ _ApolloClient_js__WEBPACK_IMPORTED_MODULE_0__.ApolloClient,
/* harmony export */   "ObservableQuery": () => /* reexport safe */ _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_1__.ObservableQuery,
/* harmony export */   "NetworkStatus": () => /* reexport safe */ _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus,
/* harmony export */   "isApolloError": () => /* reexport safe */ _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.isApolloError,
/* harmony export */   "ApolloError": () => /* reexport safe */ _errors_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloError,
/* harmony export */   "Cache": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.Cache,
/* harmony export */   "ApolloCache": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.ApolloCache,
/* harmony export */   "InMemoryCache": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.InMemoryCache,
/* harmony export */   "MissingFieldError": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.MissingFieldError,
/* harmony export */   "defaultDataIdFromObject": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.defaultDataIdFromObject,
/* harmony export */   "makeVar": () => /* reexport safe */ _cache_index_js__WEBPACK_IMPORTED_MODULE_5__.makeVar,
/* harmony export */   "HttpLink": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.HttpLink,
/* harmony export */   "checkFetcher": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.checkFetcher,
/* harmony export */   "createHttpLink": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.createHttpLink,
/* harmony export */   "createSignalIfSupported": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.createSignalIfSupported,
/* harmony export */   "fallbackHttpConfig": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.fallbackHttpConfig,
/* harmony export */   "parseAndCheckHttpResponse": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.parseAndCheckHttpResponse,
/* harmony export */   "rewriteURIForGET": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.rewriteURIForGET,
/* harmony export */   "selectHttpOptionsAndBody": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.selectHttpOptionsAndBody,
/* harmony export */   "selectURI": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.selectURI,
/* harmony export */   "serializeFetchParameter": () => /* reexport safe */ _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__.serializeFetchParameter,
/* harmony export */   "fromError": () => /* reexport safe */ _link_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.fromError,
/* harmony export */   "toPromise": () => /* reexport safe */ _link_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.toPromise,
/* harmony export */   "fromPromise": () => /* reexport safe */ _link_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.fromPromise,
/* harmony export */   "throwServerError": () => /* reexport safe */ _link_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.throwServerError,
/* harmony export */   "Observable": () => /* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.Observable,
/* harmony export */   "isReference": () => /* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.isReference,
/* harmony export */   "makeReference": () => /* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.makeReference,
/* harmony export */   "resetCaches": () => /* binding */ resetCaches,
/* harmony export */   "disableFragmentWarnings": () => /* binding */ disableFragmentWarnings,
/* harmony export */   "enableExperimentalFragmentVariables": () => /* binding */ enableExperimentalFragmentVariables,
/* harmony export */   "disableExperimentalFragmentVariables": () => /* binding */ disableExperimentalFragmentVariables,
/* harmony export */   "gql": () => /* reexport default from dynamic */ graphql_tag__WEBPACK_IMPORTED_MODULE_11___default.a
/* harmony export */ });
/* harmony import */ var _ApolloClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloClient.js */ "../node_modules/@apollo/client/core/ApolloClient.js");
/* harmony import */ var _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObservableQuery.js */ "../node_modules/@apollo/client/core/ObservableQuery.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./networkStatus.js */ "../node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "../node_modules/@apollo/client/core/types.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_types_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _types_js__WEBPACK_IMPORTED_MODULE_3__) if(["default","ApolloClient","ObservableQuery","NetworkStatus","isApolloError","ApolloError","Cache","ApolloCache","InMemoryCache","MissingFieldError","defaultDataIdFromObject","makeVar","fromError","toPromise","fromPromise","throwServerError","Observable","isReference","makeReference","resetCaches","disableFragmentWarnings","enableExperimentalFragmentVariables","disableExperimentalFragmentVariables","gql"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _types_js__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../errors/index.js */ "../node_modules/@apollo/client/errors/index.js");
/* harmony import */ var _cache_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cache/index.js */ "../node_modules/@apollo/client/cache/index.js");
/* harmony import */ var _cache_inmemory_types_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cache/inmemory/types.js */ "../node_modules/@apollo/client/cache/inmemory/types.js");
/* harmony import */ var _cache_inmemory_types_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cache_inmemory_types_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _cache_inmemory_types_js__WEBPACK_IMPORTED_MODULE_6__) if(["default","ApolloClient","ObservableQuery","NetworkStatus","isApolloError","ApolloError","Cache","ApolloCache","InMemoryCache","MissingFieldError","defaultDataIdFromObject","makeVar","fromError","toPromise","fromPromise","throwServerError","Observable","isReference","makeReference","resetCaches","disableFragmentWarnings","enableExperimentalFragmentVariables","disableExperimentalFragmentVariables","gql"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _cache_inmemory_types_js__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../link/core/index.js */ "../node_modules/@apollo/client/link/core/index.js");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _link_core_index_js__WEBPACK_IMPORTED_MODULE_7__) if(["default","ApolloClient","ObservableQuery","NetworkStatus","isApolloError","ApolloError","Cache","ApolloCache","InMemoryCache","MissingFieldError","defaultDataIdFromObject","makeVar","fromError","toPromise","fromPromise","throwServerError","Observable","isReference","makeReference","resetCaches","disableFragmentWarnings","enableExperimentalFragmentVariables","disableExperimentalFragmentVariables","gql"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _link_core_index_js__WEBPACK_IMPORTED_MODULE_7__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _link_http_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../link/http/index.js */ "../node_modules/@apollo/client/link/http/index.js");
/* harmony import */ var _link_utils_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../link/utils/index.js */ "../node_modules/@apollo/client/link/utils/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! graphql-tag */ "../node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_11__);












var resetCaches = (graphql_tag__WEBPACK_IMPORTED_MODULE_11___default().resetCaches), disableFragmentWarnings = (graphql_tag__WEBPACK_IMPORTED_MODULE_11___default().disableFragmentWarnings), enableExperimentalFragmentVariables = (graphql_tag__WEBPACK_IMPORTED_MODULE_11___default().enableExperimentalFragmentVariables), disableExperimentalFragmentVariables = (graphql_tag__WEBPACK_IMPORTED_MODULE_11___default().disableExperimentalFragmentVariables);



/***/ }),

/***/ "../node_modules/@apollo/client/core/networkStatus.js":
/*!************************************************************!*\
  !*** ../node_modules/@apollo/client/core/networkStatus.js ***!
  \************************************************************/
/*! namespace exports */
/*! export NetworkStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNetworkRequestInFlight [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetworkStatus": () => /* binding */ NetworkStatus,
/* harmony export */   "isNetworkRequestInFlight": () => /* binding */ isNetworkRequestInFlight
/* harmony export */ });
var NetworkStatus;
(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus ? networkStatus < 7 : false;
}


/***/ }),

/***/ "../node_modules/@apollo/client/core/types.js":
/*!****************************************************!*\
  !*** ../node_modules/@apollo/client/core/types.js ***!
  \****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {



/***/ }),

/***/ "../node_modules/@apollo/client/errors/index.js":
/*!******************************************************!*\
  !*** ../node_modules/@apollo/client/errors/index.js ***!
  \******************************************************/
/*! namespace exports */
/*! export ApolloError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isApolloError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isApolloError": () => /* binding */ isApolloError,
/* harmony export */   "ApolloError": () => /* binding */ ApolloError
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");


function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyArray)(err.graphQLErrors)) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError
                ? graphQLError.message
                : 'Error message not found.';
            message += errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += err.networkError.message + "\n";
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        _this.message = errorMessage || generateErrorMessage(_this);
        _this.extraInfo = extraInfo;
        _this.__proto__ = ApolloError.prototype;
        return _this;
    }
    return ApolloError;
}(Error));



/***/ }),

/***/ "../node_modules/@apollo/client/link/core/ApolloLink.js":
/*!**************************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/ApolloLink.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export ApolloLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApolloLink": () => /* binding */ ApolloLink
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index.js */ "../node_modules/@apollo/client/link/utils/index.js");




function passthrough(op, forward) {
    return (forward ? forward(op) : _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
}
function toLink(handler) {
    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}
function isTerminating(link) {
    return link.request.length <= 1;
}
var LinkError = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(LinkError, _super);
    function LinkError(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
    }
    return LinkError;
}(Error));
var ApolloLink = (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.empty = function () {
        return new ApolloLink(function () { return _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of(); });
    };
    ApolloLink.from = function (links) {
        if (links.length === 0)
            return ApolloLink.empty();
        return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
    };
    ApolloLink.split = function (test, left, right) {
        var leftLink = toLink(left);
        var rightLink = toLink(right || new ApolloLink(passthrough));
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
            return new ApolloLink(function (operation) {
                return test(operation)
                    ? leftLink.request(operation) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of()
                    : rightLink.request(operation) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
        else {
            return new ApolloLink(function (operation, forward) {
                return test(operation)
                    ? leftLink.request(operation, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of()
                    : rightLink.request(operation, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
    };
    ApolloLink.execute = function (link, operation) {
        return (link.request((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.createOperation)(operation.context, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.transformOperation)((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.validateOperation)(operation)))) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
    };
    ApolloLink.concat = function (first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
             false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
            return firstLink;
        }
        var nextLink = toLink(second);
        if (isTerminating(nextLink)) {
            return new ApolloLink(function (operation) {
                return firstLink.request(operation, function (op) { return nextLink.request(op) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of(); }) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
        else {
            return new ApolloLink(function (operation, forward) {
                return (firstLink.request(operation, function (op) {
                    return nextLink.request(op, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
                }) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
            });
        }
    };
    ApolloLink.prototype.split = function (test, left, right) {
        return this.concat(ApolloLink.split(test, left, right || new ApolloLink(passthrough)));
    };
    ApolloLink.prototype.concat = function (next) {
        return ApolloLink.concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError('request is not implemented');
    };
    ApolloLink.prototype.onError = function (reason) {
        throw reason;
    };
    ApolloLink.prototype.setOnError = function (fn) {
        this.onError = fn;
        return this;
    };
    return ApolloLink;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/link/core/concat.js":
/*!**********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/concat.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export concat [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concat": () => /* binding */ concat
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");

var concat = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.concat;


/***/ }),

/***/ "../node_modules/@apollo/client/link/core/empty.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/empty.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export empty [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "empty": () => /* binding */ empty
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");

var empty = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.empty;


/***/ }),

/***/ "../node_modules/@apollo/client/link/core/execute.js":
/*!***********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/execute.js ***!
  \***********************************************************/
/*! namespace exports */
/*! export execute [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "execute": () => /* binding */ execute
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");

var execute = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.execute;


/***/ }),

/***/ "../node_modules/@apollo/client/link/core/from.js":
/*!********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/from.js ***!
  \********************************************************/
/*! namespace exports */
/*! export from [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "from": () => /* binding */ from
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");

var from = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.from;


/***/ }),

/***/ "../node_modules/@apollo/client/link/core/index.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/index.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export ApolloLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! export concat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [not provided] [no usage info] [missing usage info prevents renaming] */
/*! export empty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export execute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export from [provided] [no usage info] [missing usage info prevents renaming] */
/*! export split [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.n, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "empty": () => /* reexport safe */ _empty_js__WEBPACK_IMPORTED_MODULE_0__.empty,
/* harmony export */   "from": () => /* reexport safe */ _from_js__WEBPACK_IMPORTED_MODULE_1__.from,
/* harmony export */   "split": () => /* reexport safe */ _split_js__WEBPACK_IMPORTED_MODULE_2__.split,
/* harmony export */   "concat": () => /* reexport safe */ _concat_js__WEBPACK_IMPORTED_MODULE_3__.concat,
/* harmony export */   "execute": () => /* reexport safe */ _execute_js__WEBPACK_IMPORTED_MODULE_4__.execute,
/* harmony export */   "ApolloLink": () => /* reexport safe */ _ApolloLink_js__WEBPACK_IMPORTED_MODULE_5__.ApolloLink
/* harmony export */ });
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./empty.js */ "../node_modules/@apollo/client/link/core/empty.js");
/* harmony import */ var _from_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from.js */ "../node_modules/@apollo/client/link/core/from.js");
/* harmony import */ var _split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./split.js */ "../node_modules/@apollo/client/link/core/split.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./concat.js */ "../node_modules/@apollo/client/link/core/concat.js");
/* harmony import */ var _execute_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./execute.js */ "../node_modules/@apollo/client/link/core/execute.js");
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types.js */ "../node_modules/@apollo/client/link/core/types.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_types_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _types_js__WEBPACK_IMPORTED_MODULE_6__) if(["default","empty","from","split","concat","execute","ApolloLink"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _types_js__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);









/***/ }),

/***/ "../node_modules/@apollo/client/link/core/split.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/split.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export split [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "split": () => /* binding */ split
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "../node_modules/@apollo/client/link/core/ApolloLink.js");

var split = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.split;


/***/ }),

/***/ "../node_modules/@apollo/client/link/core/types.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/link/core/types.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

;


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/HttpLink.js":
/*!************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/HttpLink.js ***!
  \************************************************************/
/*! namespace exports */
/*! export HttpLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpLink": () => /* binding */ HttpLink
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "../node_modules/@apollo/client/link/core/index.js");
/* harmony import */ var _createHttpLink_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHttpLink.js */ "../node_modules/@apollo/client/link/http/createHttpLink.js");



var HttpLink = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(HttpLink, _super);
    function HttpLink(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, (0,_createHttpLink_js__WEBPACK_IMPORTED_MODULE_1__.createHttpLink)(options).request) || this;
        _this.options = options;
        return _this;
    }
    return HttpLink;
}(_core_index_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink));



/***/ }),

/***/ "../node_modules/@apollo/client/link/http/checkFetcher.js":
/*!****************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/checkFetcher.js ***!
  \****************************************************************/
/*! namespace exports */
/*! export checkFetcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkFetcher": () => /* binding */ checkFetcher
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");

var checkFetcher = function (fetcher) {
    if (!fetcher && typeof fetch === 'undefined') {
        throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("\n\"fetch\" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:\n\nimport fetch from 'cross-fetch';\nimport { ApolloClient, HttpLink } from '@apollo/client';\nconst client = new ApolloClient({\n  link: new HttpLink({ uri: '/graphql', fetch })\n});\n    ");
    }
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/createHttpLink.js":
/*!******************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/createHttpLink.js ***!
  \******************************************************************/
/*! namespace exports */
/*! export createHttpLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHttpLink": () => /* binding */ createHttpLink
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "../node_modules/@apollo/client/link/core/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");
/* harmony import */ var _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serializeFetchParameter.js */ "../node_modules/@apollo/client/link/http/serializeFetchParameter.js");
/* harmony import */ var _selectURI_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectURI.js */ "../node_modules/@apollo/client/link/http/selectURI.js");
/* harmony import */ var _parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseAndCheckHttpResponse.js */ "../node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js");
/* harmony import */ var _checkFetcher_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkFetcher.js */ "../node_modules/@apollo/client/link/http/checkFetcher.js");
/* harmony import */ var _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./selectHttpOptionsAndBody.js */ "../node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js");
/* harmony import */ var _createSignalIfSupported_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createSignalIfSupported.js */ "../node_modules/@apollo/client/link/http/createSignalIfSupported.js");
/* harmony import */ var _rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rewriteURIForGET.js */ "../node_modules/@apollo/client/link/http/rewriteURIForGET.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/index.js */ "../node_modules/@apollo/client/link/utils/index.js");











var createHttpLink = function (linkOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, fetcher = linkOptions.fetch, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, requestOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__rest)(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);
    (0,_checkFetcher_js__WEBPACK_IMPORTED_MODULE_5__.checkFetcher)(fetcher);
    if (!fetcher) {
        fetcher = fetch;
    }
    var linkConfig = {
        http: { includeExtensions: includeExtensions },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers,
    };
    return new _core_index_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink(function (operation) {
        var chosenURI = (0,_selectURI_js__WEBPACK_IMPORTED_MODULE_3__.selectURI)(operation, uri);
        var context = operation.getContext();
        var clientAwarenessHeaders = {};
        if (context.clientAwareness) {
            var _a = context.clientAwareness, name_1 = _a.name, version = _a.version;
            if (name_1) {
                clientAwarenessHeaders['apollographql-client-name'] = name_1;
            }
            if (version) {
                clientAwarenessHeaders['apollographql-client-version'] = version;
            }
        }
        var contextHeaders = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_10__.__assign)({}, clientAwarenessHeaders), context.headers);
        var contextConfig = {
            http: context.http,
            options: context.fetchOptions,
            credentials: context.credentials,
            headers: contextHeaders,
        };
        var _b = (0,_selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_6__.selectHttpOptionsAndBody)(operation, _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_6__.fallbackHttpConfig, linkConfig, contextConfig), options = _b.options, body = _b.body;
        var controller;
        if (!options.signal) {
            var _c = (0,_createSignalIfSupported_js__WEBPACK_IMPORTED_MODULE_7__.createSignalIfSupported)(), _controller = _c.controller, signal = _c.signal;
            controller = _controller;
            if (controller)
                options.signal = signal;
        }
        var definitionIsMutation = function (d) {
            return d.kind === 'OperationDefinition' && d.operation === 'mutation';
        };
        if (useGETForQueries &&
            !operation.query.definitions.some(definitionIsMutation)) {
            options.method = 'GET';
        }
        if (options.method === 'GET') {
            var _d = (0,_rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_8__.rewriteURIForGET)(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
            if (parseError) {
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.fromError)(parseError);
            }
            chosenURI = newURI;
        }
        else {
            try {
                options.body = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_2__.serializeFetchParameter)(body, 'Payload');
            }
            catch (parseError) {
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.fromError)(parseError);
            }
        }
        return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable(function (observer) {
            fetcher(chosenURI, options)
                .then(function (response) {
                operation.setContext({ response: response });
                return response;
            })
                .then((0,_parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_4__.parseAndCheckHttpResponse)(operation))
                .then(function (result) {
                observer.next(result);
                observer.complete();
                return result;
            })
                .catch(function (err) {
                if (err.name === 'AbortError')
                    return;
                if (err.result && err.result.errors && err.result.data) {
                    observer.next(err.result);
                }
                observer.error(err);
            });
            return function () {
                if (controller)
                    controller.abort();
            };
        });
    });
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/createSignalIfSupported.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/createSignalIfSupported.js ***!
  \***************************************************************************/
/*! namespace exports */
/*! export createSignalIfSupported [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSignalIfSupported": () => /* binding */ createSignalIfSupported
/* harmony export */ });
var createSignalIfSupported = function () {
    if (typeof AbortController === 'undefined')
        return { controller: false, signal: false };
    var controller = new AbortController();
    var signal = controller.signal;
    return { controller: controller, signal: signal };
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/index.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/index.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export HttpLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkFetcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createHttpLink [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createSignalIfSupported [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fallbackHttpConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parseAndCheckHttpResponse [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rewriteURIForGET [provided] [no usage info] [missing usage info prevents renaming] */
/*! export selectHttpOptionsAndBody [provided] [no usage info] [missing usage info prevents renaming] */
/*! export selectURI [provided] [no usage info] [missing usage info prevents renaming] */
/*! export serializeFetchParameter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseAndCheckHttpResponse": () => /* reexport safe */ _parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_0__.parseAndCheckHttpResponse,
/* harmony export */   "serializeFetchParameter": () => /* reexport safe */ _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_1__.serializeFetchParameter,
/* harmony export */   "fallbackHttpConfig": () => /* reexport safe */ _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_2__.fallbackHttpConfig,
/* harmony export */   "selectHttpOptionsAndBody": () => /* reexport safe */ _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_2__.selectHttpOptionsAndBody,
/* harmony export */   "checkFetcher": () => /* reexport safe */ _checkFetcher_js__WEBPACK_IMPORTED_MODULE_3__.checkFetcher,
/* harmony export */   "createSignalIfSupported": () => /* reexport safe */ _createSignalIfSupported_js__WEBPACK_IMPORTED_MODULE_4__.createSignalIfSupported,
/* harmony export */   "selectURI": () => /* reexport safe */ _selectURI_js__WEBPACK_IMPORTED_MODULE_5__.selectURI,
/* harmony export */   "createHttpLink": () => /* reexport safe */ _createHttpLink_js__WEBPACK_IMPORTED_MODULE_6__.createHttpLink,
/* harmony export */   "HttpLink": () => /* reexport safe */ _HttpLink_js__WEBPACK_IMPORTED_MODULE_7__.HttpLink,
/* harmony export */   "rewriteURIForGET": () => /* reexport safe */ _rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_8__.rewriteURIForGET
/* harmony export */ });
/* harmony import */ var _parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseAndCheckHttpResponse.js */ "../node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js");
/* harmony import */ var _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serializeFetchParameter.js */ "../node_modules/@apollo/client/link/http/serializeFetchParameter.js");
/* harmony import */ var _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectHttpOptionsAndBody.js */ "../node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js");
/* harmony import */ var _checkFetcher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkFetcher.js */ "../node_modules/@apollo/client/link/http/checkFetcher.js");
/* harmony import */ var _createSignalIfSupported_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createSignalIfSupported.js */ "../node_modules/@apollo/client/link/http/createSignalIfSupported.js");
/* harmony import */ var _selectURI_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectURI.js */ "../node_modules/@apollo/client/link/http/selectURI.js");
/* harmony import */ var _createHttpLink_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createHttpLink.js */ "../node_modules/@apollo/client/link/http/createHttpLink.js");
/* harmony import */ var _HttpLink_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HttpLink.js */ "../node_modules/@apollo/client/link/http/HttpLink.js");
/* harmony import */ var _rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rewriteURIForGET.js */ "../node_modules/@apollo/client/link/http/rewriteURIForGET.js");











/***/ }),

/***/ "../node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js ***!
  \*****************************************************************************/
/*! namespace exports */
/*! export parseAndCheckHttpResponse [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseAndCheckHttpResponse": () => /* binding */ parseAndCheckHttpResponse
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/index.js */ "../node_modules/@apollo/client/link/utils/index.js");

var hasOwnProperty = Object.prototype.hasOwnProperty;
function parseAndCheckHttpResponse(operations) {
    return function (response) { return response
        .text()
        .then(function (bodyText) {
        try {
            return JSON.parse(bodyText);
        }
        catch (err) {
            var parseError = err;
            parseError.name = 'ServerParseError';
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            throw parseError;
        }
    })
        .then(function (result) {
        if (response.status >= 300) {
            (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.throwServerError)(response, result, "Response not successful: Received status code " + response.status);
        }
        if (!Array.isArray(result) &&
            !hasOwnProperty.call(result, 'data') &&
            !hasOwnProperty.call(result, 'errors')) {
            (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_0__.throwServerError)(response, result, "Server response was missing for query '" + (Array.isArray(operations)
                ? operations.map(function (op) { return op.operationName; })
                : operations.operationName) + "'.");
        }
        return result;
    }); };
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/rewriteURIForGET.js":
/*!********************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/rewriteURIForGET.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export rewriteURIForGET [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rewriteURIForGET": () => /* binding */ rewriteURIForGET
/* harmony export */ });
/* harmony import */ var _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serializeFetchParameter.js */ "../node_modules/@apollo/client/link/http/serializeFetchParameter.js");

function rewriteURIForGET(chosenURI, body) {
    var queryParams = [];
    var addQueryParam = function (key, value) {
        queryParams.push(key + "=" + encodeURIComponent(value));
    };
    if ('query' in body) {
        addQueryParam('query', body.query);
    }
    if (body.operationName) {
        addQueryParam('operationName', body.operationName);
    }
    if (body.variables) {
        var serializedVariables = void 0;
        try {
            serializedVariables = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__.serializeFetchParameter)(body.variables, 'Variables map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('variables', serializedVariables);
    }
    if (body.extensions) {
        var serializedExtensions = void 0;
        try {
            serializedExtensions = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__.serializeFetchParameter)(body.extensions, 'Extensions map');
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam('extensions', serializedExtensions);
    }
    var fragment = '', preFragment = chosenURI;
    var fragmentStart = chosenURI.indexOf('#');
    if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
    }
    var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
    var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
    return { newURI: newURI };
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js":
/*!****************************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js ***!
  \****************************************************************************/
/*! namespace exports */
/*! export fallbackHttpConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! export selectHttpOptionsAndBody [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fallbackHttpConfig": () => /* binding */ fallbackHttpConfig,
/* harmony export */   "selectHttpOptionsAndBody": () => /* binding */ selectHttpOptionsAndBody
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_language_printer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql/language/printer */ "../node_modules/graphql/language/printer.js");


var defaultHttpOptions = {
    includeQuery: true,
    includeExtensions: false,
};
var defaultHeaders = {
    accept: '*/*',
    'content-type': 'application/json',
};
var defaultOptions = {
    method: 'POST',
};
var fallbackHttpConfig = {
    http: defaultHttpOptions,
    headers: defaultHeaders,
    options: defaultOptions,
};
var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    var options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, fallbackConfig.options), { headers: fallbackConfig.headers, credentials: fallbackConfig.credentials });
    var http = fallbackConfig.http || {};
    configs.forEach(function (config) {
        options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, options), config.options), { headers: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, options.headers), config.headers) });
        if (config.credentials)
            options.credentials = config.credentials;
        http = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, http), config.http);
    });
    var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
    var body = { operationName: operationName, variables: variables };
    if (http.includeExtensions)
        body.extensions = extensions;
    if (http.includeQuery)
        body.query = (0,graphql_language_printer__WEBPACK_IMPORTED_MODULE_1__.print)(query);
    return {
        options: options,
        body: body,
    };
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/selectURI.js":
/*!*************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/selectURI.js ***!
  \*************************************************************/
/*! namespace exports */
/*! export selectURI [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectURI": () => /* binding */ selectURI
/* harmony export */ });
var selectURI = function (operation, fallbackURI) {
    var context = operation.getContext();
    var contextURI = context.uri;
    if (contextURI) {
        return contextURI;
    }
    else if (typeof fallbackURI === 'function') {
        return fallbackURI(operation);
    }
    else {
        return fallbackURI || '/graphql';
    }
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/http/serializeFetchParameter.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@apollo/client/link/http/serializeFetchParameter.js ***!
  \***************************************************************************/
/*! namespace exports */
/*! export serializeFetchParameter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "serializeFetchParameter": () => /* binding */ serializeFetchParameter
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");

var serializeFetchParameter = function (p, label) {
    var serialized;
    try {
        serialized = JSON.stringify(p);
    }
    catch (e) {
        var parseError =  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("Network request failed. " + label + " is not serializable: " + e.message);
        parseError.parseError = e;
        throw parseError;
    }
    return serialized;
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/createOperation.js":
/*!********************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/createOperation.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export createOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOperation": () => /* binding */ createOperation
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

function createOperation(starting, operation) {
    var context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, starting);
    var setContext = function (next) {
        if (typeof next === 'function') {
            context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context), next(context));
        }
        else {
            context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context), next);
        }
    };
    var getContext = function () { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context)); };
    Object.defineProperty(operation, 'setContext', {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, 'getContext', {
        enumerable: false,
        value: getContext,
    });
    return operation;
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/fromError.js":
/*!**************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/fromError.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export fromError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromError": () => /* binding */ fromError
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");

function fromError(errorValue) {
    return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        observer.error(errorValue);
    });
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/fromPromise.js":
/*!****************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/fromPromise.js ***!
  \****************************************************************/
/*! namespace exports */
/*! export fromPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromPromise": () => /* binding */ fromPromise
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");

function fromPromise(promise) {
    return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        promise
            .then(function (value) {
            observer.next(value);
            observer.complete();
        })
            .catch(observer.error.bind(observer));
    });
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/index.js ***!
  \**********************************************************/
/*! namespace exports */
/*! export createOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! export throwServerError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export toPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! export transformOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export validateOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromError": () => /* reexport safe */ _fromError_js__WEBPACK_IMPORTED_MODULE_0__.fromError,
/* harmony export */   "toPromise": () => /* reexport safe */ _toPromise_js__WEBPACK_IMPORTED_MODULE_1__.toPromise,
/* harmony export */   "fromPromise": () => /* reexport safe */ _fromPromise_js__WEBPACK_IMPORTED_MODULE_2__.fromPromise,
/* harmony export */   "throwServerError": () => /* reexport safe */ _throwServerError_js__WEBPACK_IMPORTED_MODULE_3__.throwServerError,
/* harmony export */   "validateOperation": () => /* reexport safe */ _validateOperation_js__WEBPACK_IMPORTED_MODULE_4__.validateOperation,
/* harmony export */   "createOperation": () => /* reexport safe */ _createOperation_js__WEBPACK_IMPORTED_MODULE_5__.createOperation,
/* harmony export */   "transformOperation": () => /* reexport safe */ _transformOperation_js__WEBPACK_IMPORTED_MODULE_6__.transformOperation
/* harmony export */ });
/* harmony import */ var _fromError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromError.js */ "../node_modules/@apollo/client/link/utils/fromError.js");
/* harmony import */ var _toPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPromise.js */ "../node_modules/@apollo/client/link/utils/toPromise.js");
/* harmony import */ var _fromPromise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fromPromise.js */ "../node_modules/@apollo/client/link/utils/fromPromise.js");
/* harmony import */ var _throwServerError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./throwServerError.js */ "../node_modules/@apollo/client/link/utils/throwServerError.js");
/* harmony import */ var _validateOperation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validateOperation.js */ "../node_modules/@apollo/client/link/utils/validateOperation.js");
/* harmony import */ var _createOperation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createOperation.js */ "../node_modules/@apollo/client/link/utils/createOperation.js");
/* harmony import */ var _transformOperation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transformOperation.js */ "../node_modules/@apollo/client/link/utils/transformOperation.js");









/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/throwServerError.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/throwServerError.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export throwServerError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throwServerError": () => /* binding */ throwServerError
/* harmony export */ });
var throwServerError = function (response, result, message) {
    var error = new Error(message);
    error.name = 'ServerError';
    error.response = response;
    error.statusCode = response.status;
    error.result = result;
    throw error;
};


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/toPromise.js":
/*!**************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/toPromise.js ***!
  \**************************************************************/
/*! namespace exports */
/*! export toPromise [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toPromise": () => /* binding */ toPromise
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");

function toPromise(observable) {
    var completed = false;
    return new Promise(function (resolve, reject) {
        observable.subscribe({
            next: function (data) {
                if (completed) {
                     false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn("Promise Wrapper does not support multiple results from Observable");
                }
                else {
                    completed = true;
                    resolve(data);
                }
            },
            error: reject,
        });
    });
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/transformOperation.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/transformOperation.js ***!
  \***********************************************************************/
/*! namespace exports */
/*! export transformOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transformOperation": () => /* binding */ transformOperation
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "../node_modules/@apollo/client/utilities/index.js");

function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== 'string'
                ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.getOperationName)(transformedOperation.query) || undefined
                : '';
    }
    return transformedOperation;
}


/***/ }),

/***/ "../node_modules/@apollo/client/link/utils/validateOperation.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/link/utils/validateOperation.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export validateOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateOperation": () => /* binding */ validateOperation
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");

function validateOperation(operation) {
    var OPERATION_FIELDS = [
        'query',
        'operationName',
        'variables',
        'extensions',
        'context',
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("illegal argument: " + key);
        }
    }
    return operation;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/arrays.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/arrays.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export isNonEmptyArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNonEmptyArray": () => /* binding */ isNonEmptyArray
/* harmony export */ });
function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/canUse.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/canUse.js ***!
  \*****************************************************************/
/*! namespace exports */
/*! export canUseWeakMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canUseWeakMap": () => /* binding */ canUseWeakMap
/* harmony export */ });
var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' &&
    navigator.product === 'ReactNative');


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/cloneDeep.js":
/*!********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/cloneDeep.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export cloneDeep [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cloneDeep": () => /* binding */ cloneDeep
/* harmony export */ });
var toString = Object.prototype.toString;
function cloneDeep(value) {
    return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
    switch (toString.call(val)) {
        case "[object Array]": {
            seen = seen || new Map;
            if (seen.has(val))
                return seen.get(val);
            var copy_1 = val.slice(0);
            seen.set(val, copy_1);
            copy_1.forEach(function (child, i) {
                copy_1[i] = cloneDeepHelper(child, seen);
            });
            return copy_1;
        }
        case "[object Object]": {
            seen = seen || new Map;
            if (seen.has(val))
                return seen.get(val);
            var copy_2 = Object.create(Object.getPrototypeOf(val));
            seen.set(val, copy_2);
            Object.keys(val).forEach(function (key) {
                copy_2[key] = cloneDeepHelper(val[key], seen);
            });
            return copy_2;
        }
        default:
            return val;
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/compact.js":
/*!******************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/compact.js ***!
  \******************************************************************/
/*! namespace exports */
/*! export compact [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compact": () => /* binding */ compact
/* harmony export */ });
function compact() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var result = Object.create(null);
    objects.forEach(function (obj) {
        if (!obj)
            return;
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            if (value !== void 0) {
                result[key] = value;
            }
        });
    });
    return result;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/environment.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/environment.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export getEnv [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isDevelopment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isEnv [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isTest [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEnv": () => /* binding */ getEnv,
/* harmony export */   "isEnv": () => /* binding */ isEnv,
/* harmony export */   "isDevelopment": () => /* binding */ isDevelopment,
/* harmony export */   "isTest": () => /* binding */ isTest
/* harmony export */ });
function getEnv() {
    if (typeof process !== 'undefined' && "development") {
        return "development";
    }
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isDevelopment() {
    return isEnv('development') === true;
}
function isTest() {
    return isEnv('test') === true;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/errorHandling.js":
/*!************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/errorHandling.js ***!
  \************************************************************************/
/*! namespace exports */
/*! export graphQLResultHasError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "graphQLResultHasError": () => /* binding */ graphQLResultHasError
/* harmony export */ });
function graphQLResultHasError(result) {
    return (result.errors && result.errors.length > 0) || false;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/filterInPlace.js":
/*!************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/filterInPlace.js ***!
  \************************************************************************/
/*! namespace exports */
/*! export filterInPlace [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filterInPlace": () => /* binding */ filterInPlace
/* harmony export */ });
function filterInPlace(array, test, context) {
    var target = 0;
    array.forEach(function (elem, i) {
        if (test.call(this, elem, i, array)) {
            array[target++] = elem;
        }
    }, context);
    array.length = target;
    return array;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js ***!
  \**************************************************************************/
/*! namespace exports */
/*! export maybeDeepFreeze [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maybeDeepFreeze": () => /* binding */ maybeDeepFreeze
/* harmony export */ });
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.js */ "../node_modules/@apollo/client/utilities/common/environment.js");

function isObject(value) {
    return value !== null && typeof value === "object";
}
function deepFreeze(value) {
    var workSet = new Set([value]);
    workSet.forEach(function (obj) {
        if (isObject(obj)) {
            if (!Object.isFrozen(obj))
                Object.freeze(obj);
            Object.getOwnPropertyNames(obj).forEach(function (name) {
                if (isObject(obj[name]))
                    workSet.add(obj[name]);
            });
        }
    });
    return value;
}
function maybeDeepFreeze(obj) {
    if ( true && ((0,_environment_js__WEBPACK_IMPORTED_MODULE_0__.isDevelopment)() || (0,_environment_js__WEBPACK_IMPORTED_MODULE_0__.isTest)())) {
        deepFreeze(obj);
    }
    return obj;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/common/mergeDeep.js":
/*!********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/common/mergeDeep.js ***!
  \********************************************************************/
/*! namespace exports */
/*! export DeepMerger [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeDeep [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeDeepArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mergeDeep": () => /* binding */ mergeDeep,
/* harmony export */   "mergeDeepArray": () => /* binding */ mergeDeepArray,
/* harmony export */   "DeepMerger": () => /* binding */ DeepMerger
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
    var target = sources[0] || {};
    var count = sources.length;
    if (count > 1) {
        var merger = new DeepMerger();
        for (var i = 1; i < count; ++i) {
            target = merger.merge(target, sources[i]);
        }
    }
    return target;
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
var defaultReconciler = function (target, source, property) {
    return this.merge(target[property], source[property]);
};
var DeepMerger = (function () {
    function DeepMerger(reconciler) {
        if (reconciler === void 0) { reconciler = defaultReconciler; }
        this.reconciler = reconciler;
        this.isObject = isObject;
        this.pastCopies = new Set();
    }
    DeepMerger.prototype.merge = function (target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            context[_i - 2] = arguments[_i];
        }
        if (isObject(source) && isObject(target)) {
            Object.keys(source).forEach(function (sourceKey) {
                if (hasOwnProperty.call(target, sourceKey)) {
                    var targetValue = target[sourceKey];
                    if (source[sourceKey] !== targetValue) {
                        var result = _this.reconciler.apply(_this, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArrays)([target, source, sourceKey], context));
                        if (result !== targetValue) {
                            target = _this.shallowCopyForMerge(target);
                            target[sourceKey] = result;
                        }
                    }
                }
                else {
                    target = _this.shallowCopyForMerge(target);
                    target[sourceKey] = source[sourceKey];
                }
            });
            return target;
        }
        return source;
    };
    DeepMerger.prototype.shallowCopyForMerge = function (value) {
        if (isObject(value) && !this.pastCopies.has(value)) {
            if (Array.isArray(value)) {
                value = value.slice(0);
            }
            else {
                value = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({ __proto__: Object.getPrototypeOf(value) }, value);
            }
            this.pastCopies.add(value);
        }
        return value;
    };
    return DeepMerger;
}());



/***/ }),

/***/ "../node_modules/@apollo/client/utilities/graphql/directives.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/graphql/directives.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export getDirectiveNames [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getInclusionDirectives [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hasClientExports [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hasDirectives [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shouldInclude [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouldInclude": () => /* binding */ shouldInclude,
/* harmony export */   "getDirectiveNames": () => /* binding */ getDirectiveNames,
/* harmony export */   "hasDirectives": () => /* binding */ hasDirectives,
/* harmony export */   "hasClientExports": () => /* binding */ hasClientExports,
/* harmony export */   "getInclusionDirectives": () => /* binding */ getInclusionDirectives
/* harmony export */ });
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql/language/visitor */ "../node_modules/graphql/language/visitor.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");


function shouldInclude(_a, variables) {
    var directives = _a.directives;
    if (!directives || !directives.length) {
        return true;
    }
    return getInclusionDirectives(directives).every(function (_a) {
        var directive = _a.directive, ifArgument = _a.ifArgument;
        var evaledValue = false;
        if (ifArgument.value.kind === 'Variable') {
            evaledValue = variables && variables[ifArgument.value.name.value];
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(evaledValue !== void 0, "Invalid variable referenced in @" + directive.name.value + " directive.");
        }
        else {
            evaledValue = ifArgument.value.value;
        }
        return directive.name.value === 'skip' ? !evaledValue : evaledValue;
    });
}
function getDirectiveNames(root) {
    var names = [];
    (0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_1__.visit)(root, {
        Directive: function (node) {
            names.push(node.name.value);
        },
    });
    return names;
}
function hasDirectives(names, root) {
    return getDirectiveNames(root).some(function (name) { return names.indexOf(name) > -1; });
}
function hasClientExports(document) {
    return (document &&
        hasDirectives(['client'], document) &&
        hasDirectives(['export'], document));
}
function isInclusionDirective(_a) {
    var value = _a.name.value;
    return value === 'skip' || value === 'include';
}
function getInclusionDirectives(directives) {
    var result = [];
    if (directives && directives.length) {
        directives.forEach(function (directive) {
            if (!isInclusionDirective(directive))
                return;
            var directiveArguments = directive.arguments;
            var directiveName = directive.name.value;
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
            var ifArgument = directiveArguments[0];
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
            var ifValue = ifArgument.value;
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(ifValue &&
                (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
            result.push({ directive: directive, ifArgument: ifArgument });
        });
    }
    return result;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/graphql/fragments.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/graphql/fragments.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export createFragmentMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentFromSelection [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentQueryDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFragmentQueryDocument": () => /* binding */ getFragmentQueryDocument,
/* harmony export */   "createFragmentMap": () => /* binding */ createFragmentMap,
/* harmony export */   "getFragmentFromSelection": () => /* binding */ getFragmentFromSelection
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");


function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
         false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        actualFragmentName = fragments[0].name.value;
    }
    var query = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, document), { definitions: (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArrays)([
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ], document.definitions) });
    return query;
}
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getFragmentFromSelection(selection, fragmentMap) {
    switch (selection.kind) {
        case 'InlineFragment':
            return selection;
        case 'FragmentSpread': {
            var fragment = fragmentMap && fragmentMap[selection.name.value];
             false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragment, "No fragment named " + selection.name.value + ".");
            return fragment;
        }
        default:
            return null;
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/graphql/getFromAST.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/graphql/getFromAST.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export checkDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDefaultValues [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentDefinitions [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMainDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getOperationDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getOperationName [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getQueryDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkDocument": () => /* binding */ checkDocument,
/* harmony export */   "getOperationDefinition": () => /* binding */ getOperationDefinition,
/* harmony export */   "getOperationName": () => /* binding */ getOperationName,
/* harmony export */   "getFragmentDefinitions": () => /* binding */ getFragmentDefinitions,
/* harmony export */   "getQueryDefinition": () => /* binding */ getQueryDefinition,
/* harmony export */   "getFragmentDefinition": () => /* binding */ getFragmentDefinition,
/* harmony export */   "getMainDefinition": () => /* binding */ getMainDefinition,
/* harmony export */   "getDefaultValues": () => /* binding */ getDefaultValues
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _storeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storeUtils.js */ "../node_modules/@apollo/client/utilities/graphql/storeUtils.js");


function checkDocument(doc) {
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
        .map(function (definition) {
        if (definition.kind !== 'OperationDefinition') {
            throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
        return definition;
    });
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
    return doc;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
}
function getOperationName(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === 'OperationDefinition' && definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
function getFragmentDefinitions(doc) {
    return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
}
function getQueryDefinition(doc) {
    var queryDef = getOperationDefinition(doc);
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
    return queryDef;
}
function getFragmentDefinition(doc) {
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc.definitions.length <= 1, 'Fragment must have exactly one definition.');
    var fragmentDef = doc.definitions[0];
     false ? 0 : (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.');
    return fragmentDef;
}
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' ||
                operation === 'mutation' ||
                operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
function getDefaultValues(definition) {
    var defaultValues = Object.create(null);
    var defs = definition && definition.variableDefinitions;
    if (defs && defs.length) {
        defs.forEach(function (def) {
            if (def.defaultValue) {
                (0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_1__.valueToObjectRepresentation)(defaultValues, def.variable.name, def.defaultValue);
            }
        });
    }
    return defaultValues;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/graphql/storeUtils.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/graphql/storeUtils.js ***!
  \**********************************************************************/
/*! namespace exports */
/*! export argumentsObjectFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getStoreKeyName [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTypenameFromResult [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isInlineFragment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resultKeyNameFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storeKeyNameFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export valueToObjectRepresentation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeReference": () => /* binding */ makeReference,
/* harmony export */   "isReference": () => /* binding */ isReference,
/* harmony export */   "valueToObjectRepresentation": () => /* binding */ valueToObjectRepresentation,
/* harmony export */   "storeKeyNameFromField": () => /* binding */ storeKeyNameFromField,
/* harmony export */   "getStoreKeyName": () => /* binding */ getStoreKeyName,
/* harmony export */   "argumentsObjectFromField": () => /* binding */ argumentsObjectFromField,
/* harmony export */   "resultKeyNameFromField": () => /* binding */ resultKeyNameFromField,
/* harmony export */   "getTypenameFromResult": () => /* binding */ getTypenameFromResult,
/* harmony export */   "isField": () => /* binding */ isField,
/* harmony export */   "isInlineFragment": () => /* binding */ isInlineFragment
/* harmony export */ });
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-json-stable-stringify */ "../node_modules/fast-json-stable-stringify/index.js");
/* harmony import */ var fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _fragments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fragments.js */ "../node_modules/@apollo/client/utilities/graphql/fragments.js");



function makeReference(id) {
    return { __ref: String(id) };
}
function isReference(obj) {
    return Boolean(obj && typeof obj === 'object' && typeof obj.__ref === 'string');
}
function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function isNullValue(value) {
    return value.kind === 'NullValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue(value)) {
        argObj[name.value] = null;
    }
    else {
        throw  false ? 0 : new ts_invariant__WEBPACK_IMPORTED_MODULE_1__.InvariantError("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" +
            'is not supported. Use variables instead of inline arguments to ' +
            'overcome this limitation.');
    }
}
function storeKeyNameFromField(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach(function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                });
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj, name, value, variables);
        });
    }
    return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
    'connection',
    'include',
    'skip',
    'client',
    'rest',
    'export',
];
function getStoreKeyName(fieldName, args, directives) {
    if (args &&
        directives &&
        directives['connection'] &&
        directives['connection']['key']) {
        if (directives['connection']['filter'] &&
            directives['connection']['filter'].length > 0) {
            var filterKeys = directives['connection']['filter']
                ? directives['connection']['filter']
                : [];
            filterKeys.sort();
            var filteredArgs_1 = {};
            filterKeys.forEach(function (key) {
                filteredArgs_1[key] = args[key];
            });
            return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
        }
        else {
            return directives['connection']['key'];
        }
    }
    var completeFieldName = fieldName;
    if (args) {
        var stringifiedArgs = fast_json_stable_stringify__WEBPACK_IMPORTED_MODULE_0___default()(args);
        completeFieldName += "(" + stringifiedArgs + ")";
    }
    if (directives) {
        Object.keys(directives).forEach(function (key) {
            if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                return;
            if (directives[key] && Object.keys(directives[key]).length) {
                completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
            }
            else {
                completeFieldName += "@" + key;
            }
        });
    }
    return completeFieldName;
}
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
function resultKeyNameFromField(field) {
    return field.alias ? field.alias.value : field.name.value;
}
function getTypenameFromResult(result, selectionSet, fragmentMap) {
    if (typeof result.__typename === 'string') {
        return result.__typename;
    }
    for (var _i = 0, _a = selectionSet.selections; _i < _a.length; _i++) {
        var selection = _a[_i];
        if (isField(selection)) {
            if (selection.name.value === '__typename') {
                return result[resultKeyNameFromField(selection)];
            }
        }
        else {
            var typename = getTypenameFromResult(result, (0,_fragments_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentFromSelection)(selection, fragmentMap).selectionSet, fragmentMap);
            if (typeof typename === 'string') {
                return typename;
            }
        }
    }
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/graphql/transform.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/graphql/transform.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export addTypenameToDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export buildQueryFromSelectionSet [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeArgumentsFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeClientSetsFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeConnectionDirectiveFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeDirectivesFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeFragmentSpreadFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeDirectivesFromDocument": () => /* binding */ removeDirectivesFromDocument,
/* harmony export */   "addTypenameToDocument": () => /* binding */ addTypenameToDocument,
/* harmony export */   "removeConnectionDirectiveFromDocument": () => /* binding */ removeConnectionDirectiveFromDocument,
/* harmony export */   "removeArgumentsFromDocument": () => /* binding */ removeArgumentsFromDocument,
/* harmony export */   "removeFragmentSpreadFromDocument": () => /* binding */ removeFragmentSpreadFromDocument,
/* harmony export */   "buildQueryFromSelectionSet": () => /* binding */ buildQueryFromSelectionSet,
/* harmony export */   "removeClientSetsFromDocument": () => /* binding */ removeClientSetsFromDocument
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql/language/visitor */ "../node_modules/graphql/language/visitor.js");
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "../node_modules/ts-invariant/lib/invariant.esm.js");
/* harmony import */ var _getFromAST_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getFromAST.js */ "../node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _common_filterInPlace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/filterInPlace.js */ "../node_modules/@apollo/client/utilities/common/filterInPlace.js");
/* harmony import */ var _storeUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storeUtils.js */ "../node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _fragments_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fragments.js */ "../node_modules/@apollo/client/utilities/graphql/fragments.js");







var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function isEmpty(op, fragments) {
    return op.selectionSet.selections.every(function (selection) {
        return selection.kind === 'FragmentSpread' &&
            isEmpty(fragments[selection.name.value], fragments);
    });
}
function nullIfDocIsEmpty(doc) {
    return isEmpty((0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.getOperationDefinition)(doc) || (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentDefinition)(doc), (0,_fragments_js__WEBPACK_IMPORTED_MODULE_4__.createFragmentMap)((0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentDefinitions)(doc)))
        ? null
        : doc;
}
function getDirectiveMatcher(directives) {
    return function directiveMatcher(directive) {
        return directives.some(function (dir) {
            return (dir.name && dir.name === directive.name.value) ||
                (dir.test && dir.test(directive));
        });
    };
}
function removeDirectivesFromDocument(directives, doc) {
    var variablesInUse = Object.create(null);
    var variablesToRemove = [];
    var fragmentSpreadsInUse = Object.create(null);
    var fragmentSpreadsToRemove = [];
    var modifiedDoc = nullIfDocIsEmpty((0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        Variable: {
            enter: function (node, _key, parent) {
                if (parent.kind !== 'VariableDefinition') {
                    variablesInUse[node.name.value] = true;
                }
            },
        },
        Field: {
            enter: function (node) {
                if (directives && node.directives) {
                    var shouldRemoveField = directives.some(function (directive) { return directive.remove; });
                    if (shouldRemoveField &&
                        node.directives &&
                        node.directives.some(getDirectiveMatcher(directives))) {
                        if (node.arguments) {
                            node.arguments.forEach(function (arg) {
                                if (arg.value.kind === 'Variable') {
                                    variablesToRemove.push({
                                        name: arg.value.name.value,
                                    });
                                }
                            });
                        }
                        if (node.selectionSet) {
                            getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                                fragmentSpreadsToRemove.push({
                                    name: frag.name.value,
                                });
                            });
                        }
                        return null;
                    }
                }
            },
        },
        FragmentSpread: {
            enter: function (node) {
                fragmentSpreadsInUse[node.name.value] = true;
            },
        },
        Directive: {
            enter: function (node) {
                if (getDirectiveMatcher(directives)(node)) {
                    return null;
                }
            },
        },
    }));
    if (modifiedDoc &&
        (0,_common_filterInPlace_js__WEBPACK_IMPORTED_MODULE_2__.filterInPlace)(variablesToRemove, function (v) { return !!v.name && !variablesInUse[v.name]; }).length) {
        modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
    }
    if (modifiedDoc &&
        (0,_common_filterInPlace_js__WEBPACK_IMPORTED_MODULE_2__.filterInPlace)(fragmentSpreadsToRemove, function (fs) { return !!fs.name && !fragmentSpreadsInUse[fs.name]; })
            .length) {
        modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
    }
    return modifiedDoc;
}
function addTypenameToDocument(doc) {
    return (0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)((0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.checkDocument)(doc), {
        SelectionSet: {
            enter: function (node, _key, parent) {
                if (parent &&
                    parent.kind === 'OperationDefinition') {
                    return;
                }
                var selections = node.selections;
                if (!selections) {
                    return;
                }
                var skip = selections.some(function (selection) {
                    return ((0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField)(selection) &&
                        (selection.name.value === '__typename' ||
                            selection.name.value.lastIndexOf('__', 0) === 0));
                });
                if (skip) {
                    return;
                }
                var field = parent;
                if ((0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField)(field) &&
                    field.directives &&
                    field.directives.some(function (d) { return d.name.value === 'export'; })) {
                    return;
                }
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { selections: (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArrays)(selections, [TYPENAME_FIELD]) });
            },
        },
    });
}
addTypenameToDocument.added = function (field) {
    return field === TYPENAME_FIELD;
};
var connectionRemoveConfig = {
    test: function (directive) {
        var willRemove = directive.name.value === 'connection';
        if (willRemove) {
            if (!directive.arguments ||
                !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                 false || ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn('Removing an @connection directive even though it does not have a key. ' +
                    'You may want to use the key parameter to specify a store key.');
            }
        }
        return willRemove;
    },
};
function removeConnectionDirectiveFromDocument(doc) {
    return removeDirectivesFromDocument([connectionRemoveConfig], (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.checkDocument)(doc));
}
function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    return (!!selectionSet &&
        selectionSet.selections &&
        selectionSet.selections.some(function (selection) {
            return hasDirectivesInSelection(directives, selection, nestedCheck);
        }));
}
function hasDirectivesInSelection(directives, selection, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    if (!(0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField)(selection)) {
        return true;
    }
    if (!selection.directives) {
        return false;
    }
    return (selection.directives.some(getDirectiveMatcher(directives)) ||
        (nestedCheck &&
            hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck)));
}
function getArgumentMatcher(config) {
    return function argumentMatcher(argument) {
        return config.some(function (aConfig) {
            return argument.value &&
                argument.value.kind === 'Variable' &&
                argument.value.name &&
                (aConfig.name === argument.value.name.value ||
                    (aConfig.test && aConfig.test(argument)));
        });
    };
}
function removeArgumentsFromDocument(config, doc) {
    var argMatcher = getArgumentMatcher(config);
    return nullIfDocIsEmpty((0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        OperationDefinition: {
            enter: function (node) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function (varDef) {
                        return !config.some(function (arg) { return arg.name === varDef.variable.name.value; });
                    }) : [] });
            },
        },
        Field: {
            enter: function (node) {
                var shouldRemoveField = config.some(function (argConfig) { return argConfig.remove; });
                if (shouldRemoveField) {
                    var argMatchCount_1 = 0;
                    if (node.arguments) {
                        node.arguments.forEach(function (arg) {
                            if (argMatcher(arg)) {
                                argMatchCount_1 += 1;
                            }
                        });
                    }
                    if (argMatchCount_1 === 1) {
                        return null;
                    }
                }
            },
        },
        Argument: {
            enter: function (node) {
                if (argMatcher(node)) {
                    return null;
                }
            },
        },
    }));
}
function removeFragmentSpreadFromDocument(config, doc) {
    function enter(node) {
        if (config.some(function (def) { return def.name === node.name.value; })) {
            return null;
        }
    }
    return nullIfDocIsEmpty((0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        FragmentSpread: { enter: enter },
        FragmentDefinition: { enter: enter },
    }));
}
function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
    var allFragments = [];
    selectionSet.selections.forEach(function (selection) {
        if (((0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField)(selection) || (0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isInlineFragment)(selection)) &&
            selection.selectionSet) {
            getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) { return allFragments.push(frag); });
        }
        else if (selection.kind === 'FragmentSpread') {
            allFragments.push(selection);
        }
    });
    return allFragments;
}
function buildQueryFromSelectionSet(document) {
    var definition = (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.getMainDefinition)(document);
    var definitionOperation = definition.operation;
    if (definitionOperation === 'query') {
        return document;
    }
    var modifiedDoc = (0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)(document, {
        OperationDefinition: {
            enter: function (node) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { operation: 'query' });
            },
        },
    });
    return modifiedDoc;
}
function removeClientSetsFromDocument(document) {
    (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_1__.checkDocument)(document);
    var modifiedDoc = removeDirectivesFromDocument([
        {
            test: function (directive) { return directive.name.value === 'client'; },
            remove: true,
        },
    ], document);
    if (modifiedDoc) {
        modifiedDoc = (0,graphql_language_visitor__WEBPACK_IMPORTED_MODULE_5__.visit)(modifiedDoc, {
            FragmentDefinition: {
                enter: function (node) {
                    if (node.selectionSet) {
                        var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
                            return (0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField)(selection) && selection.name.value === '__typename';
                        });
                        if (isTypenameOnly) {
                            return null;
                        }
                    }
                },
            },
        });
    }
    return modifiedDoc;
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/index.js":
/*!*********************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/index.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export Concast [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DeepMerger [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Observable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addTypenameToDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export argumentsObjectFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export asyncMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export buildQueryFromSelectionSet [provided] [no usage info] [missing usage info prevents renaming] */
/*! export canUseWeakMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export checkDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cloneDeep [provided] [no usage info] [missing usage info prevents renaming] */
/*! export compact [provided] [no usage info] [missing usage info prevents renaming] */
/*! export concatPagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createFragmentMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDefaultValues [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDirectiveNames [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentDefinitions [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentFromSelection [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFragmentQueryDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getInclusionDirectives [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMainDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getOperationDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getOperationName [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getQueryDefinition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getStoreKeyName [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTypenameFromResult [provided] [no usage info] [missing usage info prevents renaming] */
/*! export graphQLResultHasError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hasClientExports [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hasDirectives [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isInlineFragment [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNonEmptyArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export iterateObserversSafely [provided] [no usage info] [missing usage info prevents renaming] */
/*! export makeReference [provided] [no usage info] [missing usage info prevents renaming] */
/*! export maybeDeepFreeze [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeDeep [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mergeDeepArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! export offsetLimitPagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! export relayStylePagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeArgumentsFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeClientSetsFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeConnectionDirectiveFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeDirectivesFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeFragmentSpreadFromDocument [provided] [no usage info] [missing usage info prevents renaming] */
/*! export resultKeyNameFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shouldInclude [provided] [no usage info] [missing usage info prevents renaming] */
/*! export storeKeyNameFromField [provided] [no usage info] [missing usage info prevents renaming] */
/*! export valueToObjectRepresentation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shouldInclude": () => /* reexport safe */ _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__.shouldInclude,
/* harmony export */   "hasDirectives": () => /* reexport safe */ _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__.hasDirectives,
/* harmony export */   "hasClientExports": () => /* reexport safe */ _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__.hasClientExports,
/* harmony export */   "getDirectiveNames": () => /* reexport safe */ _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__.getDirectiveNames,
/* harmony export */   "getInclusionDirectives": () => /* reexport safe */ _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__.getInclusionDirectives,
/* harmony export */   "createFragmentMap": () => /* reexport safe */ _graphql_fragments_js__WEBPACK_IMPORTED_MODULE_1__.createFragmentMap,
/* harmony export */   "getFragmentQueryDocument": () => /* reexport safe */ _graphql_fragments_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentQueryDocument,
/* harmony export */   "getFragmentFromSelection": () => /* reexport safe */ _graphql_fragments_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentFromSelection,
/* harmony export */   "checkDocument": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.checkDocument,
/* harmony export */   "getOperationDefinition": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getOperationDefinition,
/* harmony export */   "getOperationName": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getOperationName,
/* harmony export */   "getFragmentDefinitions": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinitions,
/* harmony export */   "getQueryDefinition": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getQueryDefinition,
/* harmony export */   "getFragmentDefinition": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinition,
/* harmony export */   "getMainDefinition": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getMainDefinition,
/* harmony export */   "getDefaultValues": () => /* reexport safe */ _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getDefaultValues,
/* harmony export */   "makeReference": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.makeReference,
/* harmony export */   "isReference": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isReference,
/* harmony export */   "isField": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isField,
/* harmony export */   "isInlineFragment": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.isInlineFragment,
/* harmony export */   "valueToObjectRepresentation": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.valueToObjectRepresentation,
/* harmony export */   "storeKeyNameFromField": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.storeKeyNameFromField,
/* harmony export */   "argumentsObjectFromField": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.argumentsObjectFromField,
/* harmony export */   "resultKeyNameFromField": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.resultKeyNameFromField,
/* harmony export */   "getStoreKeyName": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.getStoreKeyName,
/* harmony export */   "getTypenameFromResult": () => /* reexport safe */ _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__.getTypenameFromResult,
/* harmony export */   "addTypenameToDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.addTypenameToDocument,
/* harmony export */   "buildQueryFromSelectionSet": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.buildQueryFromSelectionSet,
/* harmony export */   "removeDirectivesFromDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.removeDirectivesFromDocument,
/* harmony export */   "removeConnectionDirectiveFromDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.removeConnectionDirectiveFromDocument,
/* harmony export */   "removeArgumentsFromDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.removeArgumentsFromDocument,
/* harmony export */   "removeFragmentSpreadFromDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.removeFragmentSpreadFromDocument,
/* harmony export */   "removeClientSetsFromDocument": () => /* reexport safe */ _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__.removeClientSetsFromDocument,
/* harmony export */   "concatPagination": () => /* reexport safe */ _policies_pagination_js__WEBPACK_IMPORTED_MODULE_5__.concatPagination,
/* harmony export */   "offsetLimitPagination": () => /* reexport safe */ _policies_pagination_js__WEBPACK_IMPORTED_MODULE_5__.offsetLimitPagination,
/* harmony export */   "relayStylePagination": () => /* reexport safe */ _policies_pagination_js__WEBPACK_IMPORTED_MODULE_5__.relayStylePagination,
/* harmony export */   "Observable": () => /* reexport safe */ _observables_Observable_js__WEBPACK_IMPORTED_MODULE_6__.Observable,
/* harmony export */   "DeepMerger": () => /* reexport safe */ _common_mergeDeep_js__WEBPACK_IMPORTED_MODULE_7__.DeepMerger,
/* harmony export */   "mergeDeep": () => /* reexport safe */ _common_mergeDeep_js__WEBPACK_IMPORTED_MODULE_7__.mergeDeep,
/* harmony export */   "mergeDeepArray": () => /* reexport safe */ _common_mergeDeep_js__WEBPACK_IMPORTED_MODULE_7__.mergeDeepArray,
/* harmony export */   "cloneDeep": () => /* reexport safe */ _common_cloneDeep_js__WEBPACK_IMPORTED_MODULE_8__.cloneDeep,
/* harmony export */   "maybeDeepFreeze": () => /* reexport safe */ _common_maybeDeepFreeze_js__WEBPACK_IMPORTED_MODULE_9__.maybeDeepFreeze,
/* harmony export */   "iterateObserversSafely": () => /* reexport safe */ _observables_iteration_js__WEBPACK_IMPORTED_MODULE_10__.iterateObserversSafely,
/* harmony export */   "asyncMap": () => /* reexport safe */ _observables_asyncMap_js__WEBPACK_IMPORTED_MODULE_11__.asyncMap,
/* harmony export */   "Concast": () => /* reexport safe */ _observables_Concast_js__WEBPACK_IMPORTED_MODULE_12__.Concast,
/* harmony export */   "isNonEmptyArray": () => /* reexport safe */ _common_arrays_js__WEBPACK_IMPORTED_MODULE_13__.isNonEmptyArray,
/* harmony export */   "graphQLResultHasError": () => /* reexport safe */ _common_errorHandling_js__WEBPACK_IMPORTED_MODULE_14__.graphQLResultHasError,
/* harmony export */   "canUseWeakMap": () => /* reexport safe */ _common_canUse_js__WEBPACK_IMPORTED_MODULE_15__.canUseWeakMap,
/* harmony export */   "compact": () => /* reexport safe */ _common_compact_js__WEBPACK_IMPORTED_MODULE_16__.compact
/* harmony export */ });
/* harmony import */ var _graphql_directives_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphql/directives.js */ "../node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _graphql_fragments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql/fragments.js */ "../node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _graphql_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphql/getFromAST.js */ "../node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _graphql_storeUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphql/storeUtils.js */ "../node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _graphql_transform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphql/transform.js */ "../node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _policies_pagination_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./policies/pagination.js */ "../node_modules/@apollo/client/utilities/policies/pagination.js");
/* harmony import */ var _observables_Observable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./observables/Observable.js */ "../node_modules/@apollo/client/utilities/observables/Observable.js");
/* harmony import */ var _common_mergeDeep_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/mergeDeep.js */ "../node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _common_cloneDeep_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cloneDeep.js */ "../node_modules/@apollo/client/utilities/common/cloneDeep.js");
/* harmony import */ var _common_maybeDeepFreeze_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/maybeDeepFreeze.js */ "../node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js");
/* harmony import */ var _observables_iteration_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./observables/iteration.js */ "../node_modules/@apollo/client/utilities/observables/iteration.js");
/* harmony import */ var _observables_asyncMap_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./observables/asyncMap.js */ "../node_modules/@apollo/client/utilities/observables/asyncMap.js");
/* harmony import */ var _observables_Concast_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./observables/Concast.js */ "../node_modules/@apollo/client/utilities/observables/Concast.js");
/* harmony import */ var _common_arrays_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common/arrays.js */ "../node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _common_errorHandling_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./common/errorHandling.js */ "../node_modules/@apollo/client/utilities/common/errorHandling.js");
/* harmony import */ var _common_canUse_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./common/canUse.js */ "../node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _common_compact_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./common/compact.js */ "../node_modules/@apollo/client/utilities/common/compact.js");



















/***/ }),

/***/ "../node_modules/@apollo/client/utilities/observables/Concast.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/observables/Concast.js ***!
  \***********************************************************************/
/*! namespace exports */
/*! export Concast [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Concast": () => /* binding */ Concast
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable.js */ "../node_modules/@apollo/client/utilities/observables/Observable.js");
/* harmony import */ var _iteration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iteration.js */ "../node_modules/@apollo/client/utilities/observables/iteration.js");



function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
var Concast = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(Concast, _super);
    function Concast(sources) {
        var _this = _super.call(this, function (observer) {
            _this.addObserver(observer);
            return function () { return _this.removeObserver(observer); };
        }) || this;
        _this.observers = new Set();
        _this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        _this.handlers = {
            next: function (result) {
                if (_this.sub !== null) {
                    _this.latest = ["next", result];
                    (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "next", result);
                }
            },
            error: function (error) {
                if (_this.sub !== null) {
                    if (_this.sub)
                        _this.sub.unsubscribe();
                    _this.sub = null;
                    _this.latest = ["error", error];
                    _this.reject(error);
                    (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "error", error);
                }
            },
            complete: function () {
                if (_this.sub !== null) {
                    var value = _this.sources.shift();
                    if (!value) {
                        _this.sub = null;
                        if (_this.latest &&
                            _this.latest[0] === "next") {
                            _this.resolve(_this.latest[1]);
                        }
                        else {
                            _this.resolve();
                        }
                        (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "complete");
                    }
                    else if (isPromiseLike(value)) {
                        value.then(function (obs) { return _this.sub = obs.subscribe(_this.handlers); });
                    }
                    else {
                        _this.sub = value.subscribe(_this.handlers);
                    }
                }
            },
        };
        _this.cancel = function (reason) {
            _this.reject(reason);
            _this.sources = [];
            _this.handlers.complete();
        };
        _this.promise.catch(function (_) { });
        if (isPromiseLike(sources)) {
            sources.then(function (iterable) { return _this.start(iterable); }, _this.handlers.error);
        }
        else {
            _this.start(sources);
        }
        return _this;
    }
    Concast.prototype.start = function (sources) {
        if (this.sub !== void 0)
            return;
        this.sources = Array.from(sources);
        this.handlers.complete();
    };
    Concast.prototype.addObserver = function (observer) {
        if (!this.observers.has(observer)) {
            if (this.latest) {
                var nextOrError = this.latest[0];
                var method = observer[nextOrError];
                if (method) {
                    method.call(observer, this.latest[1]);
                }
                if (this.sub === null &&
                    nextOrError === "next" &&
                    observer.complete) {
                    observer.complete();
                }
            }
            this.observers.add(observer);
        }
    };
    Concast.prototype.removeObserver = function (observer, quietly) {
        if (this.observers.delete(observer) &&
            this.observers.size < 1) {
            if (quietly)
                return;
            if (this.sub) {
                this.sub.unsubscribe();
                this.reject(new Error("Observable cancelled prematurely"));
            }
            this.sub = null;
        }
    };
    Concast.prototype.cleanup = function (callback) {
        var _this = this;
        var called = false;
        var once = function () {
            if (!called) {
                called = true;
                _this.observers.delete(observer);
                callback();
            }
        };
        var observer = {
            next: once,
            error: once,
            complete: once,
        };
        this.addObserver(observer);
    };
    return Concast;
}(_Observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable));

if (typeof Symbol === "function" && Symbol.species) {
    Object.defineProperty(Concast, Symbol.species, {
        value: _Observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable,
    });
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/observables/Observable.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/observables/Observable.js ***!
  \**************************************************************************/
/*! namespace exports */
/*! export Observable [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => /* reexport default from dynamic */ zen_observable__WEBPACK_IMPORTED_MODULE_0___default.a
/* harmony export */ });
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zen-observable */ "../node_modules/zen-observable/index.js");
/* harmony import */ var zen_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zen_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! symbol-observable */ "../node_modules/symbol-observable/es/index.js");


(zen_observable__WEBPACK_IMPORTED_MODULE_0___default().prototype["@@observable"]) = function () { return this; };



/***/ }),

/***/ "../node_modules/@apollo/client/utilities/observables/asyncMap.js":
/*!************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/observables/asyncMap.js ***!
  \************************************************************************/
/*! namespace exports */
/*! export asyncMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "asyncMap": () => /* binding */ asyncMap
/* harmony export */ });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable.js */ "../node_modules/@apollo/client/utilities/observables/Observable.js");

function asyncMap(observable, mapFn, catchFn) {
    return new _Observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        var next = observer.next, error = observer.error, complete = observer.complete;
        var activeCallbackCount = 0;
        var completed = false;
        function makeCallback(examiner, delegate) {
            if (examiner) {
                return function (arg) {
                    ++activeCallbackCount;
                    new Promise(function (resolve) { return resolve(examiner(arg)); }).then(function (result) {
                        --activeCallbackCount;
                        next && next.call(observer, result);
                        if (completed) {
                            handler.complete();
                        }
                    }, function (e) {
                        --activeCallbackCount;
                        error && error.call(observer, e);
                    });
                };
            }
            else {
                return function (arg) { return delegate && delegate.call(observer, arg); };
            }
        }
        var handler = {
            next: makeCallback(mapFn, next),
            error: makeCallback(catchFn, error),
            complete: function () {
                completed = true;
                if (!activeCallbackCount) {
                    complete && complete.call(observer);
                }
            },
        };
        var sub = observable.subscribe(handler);
        return function () { return sub.unsubscribe(); };
    });
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/observables/iteration.js":
/*!*************************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/observables/iteration.js ***!
  \*************************************************************************/
/*! namespace exports */
/*! export iterateObserversSafely [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iterateObserversSafely": () => /* binding */ iterateObserversSafely
/* harmony export */ });
function iterateObserversSafely(observers, method, argument) {
    var observersWithMethod = [];
    observers.forEach(function (obs) { return obs[method] && observersWithMethod.push(obs); });
    observersWithMethod.forEach(function (obs) { return obs[method](argument); });
}


/***/ }),

/***/ "../node_modules/@apollo/client/utilities/policies/pagination.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@apollo/client/utilities/policies/pagination.js ***!
  \***********************************************************************/
/*! namespace exports */
/*! export concatPagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! export offsetLimitPagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! export relayStylePagination [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatPagination": () => /* binding */ concatPagination,
/* harmony export */   "offsetLimitPagination": () => /* binding */ offsetLimitPagination,
/* harmony export */   "relayStylePagination": () => /* binding */ relayStylePagination
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

function concatPagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        merge: function (existing, incoming) {
            return existing ? (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArrays)(existing, incoming) : incoming;
        },
    };
}
function offsetLimitPagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        merge: function (existing, incoming, _a) {
            var args = _a.args;
            var merged = existing ? existing.slice(0) : [];
            var start = args ? args.offset : merged.length;
            var end = start + incoming.length;
            for (var i = start; i < end; ++i) {
                merged[i] = incoming[i - start];
            }
            return merged;
        },
    };
}
function relayStylePagination(keyArgs) {
    if (keyArgs === void 0) { keyArgs = false; }
    return {
        keyArgs: keyArgs,
        read: function (existing, _a) {
            var canRead = _a.canRead;
            if (!existing)
                return;
            var edges = existing.edges.filter(function (edge) { return canRead(edge.node); });
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, existing), { edges: edges, pageInfo: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, existing.pageInfo), { startCursor: cursorFromEdge(edges, 0), endCursor: cursorFromEdge(edges, -1) }) });
        },
        merge: function (existing, incoming, _a) {
            if (existing === void 0) { existing = makeEmptyData(); }
            var args = _a.args;
            if (!args)
                return existing;
            var incomingEdges = incoming.edges.slice(0);
            if (incoming.pageInfo) {
                updateCursor(incomingEdges, 0, incoming.pageInfo.startCursor);
                updateCursor(incomingEdges, -1, incoming.pageInfo.endCursor);
            }
            var prefix = existing.edges;
            var suffix = [];
            if (args.after) {
                var index = prefix.findIndex(function (edge) { return edge.cursor === args.after; });
                if (index >= 0) {
                    prefix = prefix.slice(0, index + 1);
                }
            }
            else if (args.before) {
                var index = prefix.findIndex(function (edge) { return edge.cursor === args.before; });
                suffix = index < 0 ? prefix : prefix.slice(index);
                prefix = [];
            }
            else {
                prefix = [];
            }
            var edges = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArrays)(prefix, incomingEdges, suffix);
            var pageInfo = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, incoming.pageInfo), existing.pageInfo), { startCursor: cursorFromEdge(edges, 0), endCursor: cursorFromEdge(edges, -1) });
            var updatePageInfo = function (name) {
                var value = incoming.pageInfo[name];
                if (value !== void 0) {
                    pageInfo[name] = value;
                }
            };
            if (!prefix.length)
                updatePageInfo("hasPreviousPage");
            if (!suffix.length)
                updatePageInfo("hasNextPage");
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, existing), incoming), { edges: edges,
                pageInfo: pageInfo });
        },
    };
}
function makeEmptyData() {
    return {
        edges: [],
        pageInfo: {
            hasPreviousPage: false,
            hasNextPage: true,
            startCursor: "",
            endCursor: "",
        },
    };
}
function cursorFromEdge(edges, index) {
    if (index < 0)
        index += edges.length;
    var edge = edges[index];
    return edge && edge.cursor || "";
}
function updateCursor(edges, index, cursor) {
    if (index < 0)
        index += edges.length;
    var edge = edges[index];
    if (cursor && cursor !== edge.cursor) {
        edges[index] = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, edge), { cursor: cursor });
    }
}


/***/ }),

/***/ "../node_modules/@apollo/client/version.js":
/*!*************************************************!*\
  !*** ../node_modules/@apollo/client/version.js ***!
  \*************************************************/
/*! namespace exports */
/*! export version [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "version": () => /* binding */ version
/* harmony export */ });
var version = 'local';


/***/ }),

/***/ "../node_modules/@wry/context/lib/context.esm.js":
/*!*******************************************************!*\
  !*** ../node_modules/@wry/context/lib/context.esm.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export Slot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export asyncFromGen [provided] [no usage info] [missing usage info prevents renaming] */
/*! export bind [provided] [no usage info] [missing usage info prevents renaming] */
/*! export noContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setTimeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export wrapYieldingFiberMethods [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slot": () => /* binding */ Slot,
/* harmony export */   "asyncFromGen": () => /* binding */ asyncFromGen,
/* harmony export */   "bind": () => /* binding */ bind,
/* harmony export */   "noContext": () => /* binding */ noContext,
/* harmony export */   "setTimeout": () => /* binding */ setTimeoutWithContext,
/* harmony export */   "wrapYieldingFiberMethods": () => /* binding */ wrapYieldingFiberMethods
/* harmony export */ });
// This currentContext variable will only be used if the makeSlotClass
// function is called, which happens only if this is the first copy of the
// @wry/context package to be imported.
var currentContext = null;
// This unique internal object is used to denote the absence of a value
// for a given Slot, and is never exposed to outside code.
var MISSING_VALUE = {};
var idCounter = 1;
// Although we can't do anything about the cost of duplicated code from
// accidentally bundling multiple copies of the @wry/context package, we can
// avoid creating the Slot class more than once using makeSlotClass.
var makeSlotClass = function () { return /** @class */ (function () {
    function Slot() {
        // If you have a Slot object, you can find out its slot.id, but you cannot
        // guess the slot.id of a Slot you don't have access to, thanks to the
        // randomized suffix.
        this.id = [
            "slot",
            idCounter++,
            Date.now(),
            Math.random().toString(36).slice(2),
        ].join(":");
    }
    Slot.prototype.hasValue = function () {
        for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
            // We use the Slot object iself as a key to its value, which means the
            // value cannot be obtained without a reference to the Slot object.
            if (this.id in context_1.slots) {
                var value = context_1.slots[this.id];
                if (value === MISSING_VALUE)
                    break;
                if (context_1 !== currentContext) {
                    // Cache the value in currentContext.slots so the next lookup will
                    // be faster. This caching is safe because the tree of contexts and
                    // the values of the slots are logically immutable.
                    currentContext.slots[this.id] = value;
                }
                return true;
            }
        }
        if (currentContext) {
            // If a value was not found for this Slot, it's never going to be found
            // no matter how many times we look it up, so we might as well cache
            // the absence of the value, too.
            currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
    };
    Slot.prototype.getValue = function () {
        if (this.hasValue()) {
            return currentContext.slots[this.id];
        }
    };
    Slot.prototype.withValue = function (value, callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        var _a;
        var slots = (_a = {
                __proto__: null
            },
            _a[this.id] = value,
            _a);
        var parent = currentContext;
        currentContext = { parent: parent, slots: slots };
        try {
            // Function.prototype.apply allows the arguments array argument to be
            // omitted or undefined, so args! is fine here.
            return callback.apply(thisArg, args);
        }
        finally {
            currentContext = parent;
        }
    };
    // Capture the current context and wrap a callback function so that it
    // reestablishes the captured context when called.
    Slot.bind = function (callback) {
        var context = currentContext;
        return function () {
            var saved = currentContext;
            try {
                currentContext = context;
                return callback.apply(this, arguments);
            }
            finally {
                currentContext = saved;
            }
        };
    };
    // Immediately run a callback function without any captured context.
    Slot.noContext = function (callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        if (currentContext) {
            var saved = currentContext;
            try {
                currentContext = null;
                // Function.prototype.apply allows the arguments array argument to be
                // omitted or undefined, so args! is fine here.
                return callback.apply(thisArg, args);
            }
            finally {
                currentContext = saved;
            }
        }
        else {
            return callback.apply(thisArg, args);
        }
    };
    return Slot;
}()); };
// We store a single global implementation of the Slot class as a permanent
// non-enumerable symbol property of the Array constructor. This obfuscation
// does nothing to prevent access to the Slot class, but at least it ensures
// the implementation (i.e. currentContext) cannot be tampered with, and all
// copies of the @wry/context package (hopefully just one) will share the
// same Slot implementation. Since the first copy of the @wry/context package
// to be imported wins, this technique imposes a very high cost for any
// future breaking changes to the Slot class.
var globalKey = "@wry/context:Slot";
var host = Array;
var Slot = host[globalKey] || function () {
    var Slot = makeSlotClass();
    try {
        Object.defineProperty(host, globalKey, {
            value: host[globalKey] = Slot,
            enumerable: false,
            writable: false,
            configurable: false,
        });
    }
    finally {
        return Slot;
    }
}();

var bind = Slot.bind, noContext = Slot.noContext;
function setTimeoutWithContext(callback, delay) {
    return setTimeout(bind(callback), delay);
}
// Turn any generator function into an async function (using yield instead
// of await), with context automatically preserved across yields.
function asyncFromGen(genFn) {
    return function () {
        var gen = genFn.apply(this, arguments);
        var boundNext = bind(gen.next);
        var boundThrow = bind(gen.throw);
        return new Promise(function (resolve, reject) {
            function invoke(method, argument) {
                try {
                    var result = method.call(gen, argument);
                }
                catch (error) {
                    return reject(error);
                }
                var next = result.done ? resolve : invokeNext;
                if (isPromiseLike(result.value)) {
                    result.value.then(next, result.done ? reject : invokeThrow);
                }
                else {
                    next(result.value);
                }
            }
            var invokeNext = function (value) { return invoke(boundNext, value); };
            var invokeThrow = function (error) { return invoke(boundThrow, error); };
            invokeNext();
        });
    };
}
function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
// If you use the fibers npm package to implement coroutines in Node.js,
// you should call this function at least once to ensure context management
// remains coherent across any yields.
var wrappedFibers = [];
function wrapYieldingFiberMethods(Fiber) {
    // There can be only one implementation of Fiber per process, so this array
    // should never grow longer than one element.
    if (wrappedFibers.indexOf(Fiber) < 0) {
        var wrap = function (obj, method) {
            var fn = obj[method];
            obj[method] = function () {
                return noContext(fn, arguments, this);
            };
        };
        // These methods can yield, according to
        // https://github.com/laverdet/node-fibers/blob/ddebed9b8ae3883e57f822e2108e6943e5c8d2a8/fibers.js#L97-L100
        wrap(Fiber, "yield");
        wrap(Fiber.prototype, "run");
        wrap(Fiber.prototype, "throwInto");
        wrappedFibers.push(Fiber);
    }
    return Fiber;
}




/***/ }),

/***/ "../node_modules/@wry/equality/lib/equality.esm.js":
/*!*********************************************************!*\
  !*** ../node_modules/@wry/equality/lib/equality.esm.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export equal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "equal": () => /* binding */ equal
/* harmony export */ });
var _a = Object.prototype, toString = _a.toString, hasOwnProperty = _a.hasOwnProperty;
var fnToStr = Function.prototype.toString;
var previousComparisons = new Map();
/**
 * Performs a deep equality check on two JavaScript values, tolerating cycles.
 */
function equal(a, b) {
    try {
        return check(a, b);
    }
    finally {
        previousComparisons.clear();
    }
}
function check(a, b) {
    // If the two values are strictly equal, our job is easy.
    if (a === b) {
        return true;
    }
    // Object.prototype.toString returns a representation of the runtime type of
    // the given value that is considerably more precise than typeof.
    var aTag = toString.call(a);
    var bTag = toString.call(b);
    // If the runtime types of a and b are different, they could maybe be equal
    // under some interpretation of equality, but for simplicity and performance
    // we just return false instead.
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case '[object Array]':
            // Arrays are a lot like other objects, but we can cheaply compare their
            // lengths as a short-cut before comparing their elements.
            if (a.length !== b.length)
                return false;
        // Fall through to object case...
        case '[object Object]': {
            if (previouslyCompared(a, b))
                return true;
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            // If `a` and `b` have a different number of enumerable keys, they
            // must be different.
            var keyCount = aKeys.length;
            if (keyCount !== bKeys.length)
                return false;
            // Now make sure they have the same keys.
            for (var k = 0; k < keyCount; ++k) {
                if (!hasOwnProperty.call(b, aKeys[k])) {
                    return false;
                }
            }
            // Finally, check deep equality of all child properties.
            for (var k = 0; k < keyCount; ++k) {
                var key = aKeys[k];
                if (!check(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        case '[object Error]':
            return a.name === b.name && a.message === b.message;
        case '[object Number]':
            // Handle NaN, which is !== itself.
            if (a !== a)
                return b !== b;
        // Fall through to shared +a === +b case...
        case '[object Boolean]':
        case '[object Date]':
            return +a === +b;
        case '[object RegExp]':
        case '[object String]':
            return a == "" + b;
        case '[object Map]':
        case '[object Set]': {
            if (a.size !== b.size)
                return false;
            if (previouslyCompared(a, b))
                return true;
            var aIterator = a.entries();
            var isMap = aTag === '[object Map]';
            while (true) {
                var info = aIterator.next();
                if (info.done)
                    break;
                // If a instanceof Set, aValue === aKey.
                var _a = info.value, aKey = _a[0], aValue = _a[1];
                // So this works the same way for both Set and Map.
                if (!b.has(aKey)) {
                    return false;
                }
                // However, we care about deep equality of values only when dealing
                // with Map structures.
                if (isMap && !check(aValue, b.get(aKey))) {
                    return false;
                }
            }
            return true;
        }
        case '[object Function]': {
            var aCode = fnToStr.call(a);
            if (aCode !== fnToStr.call(b)) {
                return false;
            }
            // We consider non-native functions equal if they have the same code
            // (native functions require === because their code is censored).
            // Note that this behavior is not entirely sound, since !== function
            // objects with the same code can behave differently depending on
            // their closure scope. However, any function can behave differently
            // depending on the values of its input arguments (including this)
            // and its calling context (including its closure scope), even
            // though the function object is === to itself; and it is entirely
            // possible for functions that are not === to behave exactly the
            // same under all conceivable circumstances. Because none of these
            // factors are statically decidable in JavaScript, JS function
            // equality is not well-defined. This ambiguity allows us to
            // consider the best possible heuristic among various imperfect
            // options, and equating non-native functions that have the same
            // code has enormous practical benefits, such as when comparing
            // functions that are repeatedly passed as fresh function
            // expressions within objects that are otherwise deeply equal. Since
            // any function created from the same syntactic expression (in the
            // same code location) will always stringify to the same code
            // according to fnToStr.call, we can reasonably expect these
            // repeatedly passed function expressions to have the same code, and
            // thus behave "the same" (with all the caveats mentioned above),
            // even though the runtime function objects are !== to one another.
            return !endsWith(aCode, nativeCodeSuffix);
        }
    }
    // Otherwise the values are not equal.
    return false;
}
var nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
    var fromIndex = full.length - suffix.length;
    return fromIndex >= 0 &&
        full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
    // Though cyclic references can make an object graph appear infinite from the
    // perspective of a depth-first traversal, the graph still contains a finite
    // number of distinct object references. We use the previousComparisons cache
    // to avoid comparing the same pair of object references more than once, which
    // guarantees termination (even if we end up comparing every object in one
    // graph to every object in the other graph, which is extremely unlikely),
    // while still allowing weird isomorphic structures (like rings with different
    // lengths) a chance to pass the equality test.
    var bSet = previousComparisons.get(a);
    if (bSet) {
        // Return true here because we can be sure false will be returned somewhere
        // else if the objects are not equivalent.
        if (bSet.has(b))
            return true;
    }
    else {
        previousComparisons.set(a, bSet = new Set);
    }
    bSet.add(b);
    return false;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equal);



/***/ }),

/***/ "../node_modules/fast-json-stable-stringify/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/fast-json-stable-stringify/index.js ***!
  \***********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";


module.exports = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};


/***/ }),

/***/ "../node_modules/graphql-tag/src/index.js":
/*!************************************************!*\
  !*** ../node_modules/graphql-tag/src/index.js ***!
  \************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parser = __webpack_require__(/*! graphql/language/parser */ "../node_modules/graphql/language/parser.js");

var parse = parser.parse;

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map docString -> graphql document
var docCache = {};

// A map fragmentName -> [normalized source]
var fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// For testing.
function resetCaches() {
  docCache = {};
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
var printFragmentWarnings = true;
function processFragments(ast) {
  var astFragmentMap = {};
  var definitions = [];

  for (var i = 0; i < ast.definitions.length; i++) {
    var fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

function stripLoc(doc, removeLocAtThisLevel) {
  var docType = Object.prototype.toString.call(doc);

  if (docType === '[object Array]') {
    return doc.map(function (d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  var keys = Object.keys(doc);
  var key;
  var value;
  var valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

var experimentalFragmentVariables = false;
function parseDocument(doc) {
  var cacheKey = normalize(doc);

  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  var parsed = parse(doc, { experimentalFragmentVariables: experimentalFragmentVariables });
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache[cacheKey] = parsed;

  return parsed;
}

function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}

function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  var args = Array.prototype.slice.call(arguments);

  var literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  var result = (typeof(literals) === "string") ? literals : literals[0];

  for (var i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.disableFragmentWarnings = disableFragmentWarnings;
gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables;
gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;

module.exports = gql;


/***/ }),

/***/ "../node_modules/graphql/error/GraphQLError.js":
/*!*****************************************************!*\
  !*** ../node_modules/graphql/error/GraphQLError.js ***!
  \*****************************************************/
/*! flagged exports */
/*! export GraphQLError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export printError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.printError = printError;
exports.GraphQLError = void 0;

var _isObjectLike = _interopRequireDefault(__webpack_require__(/*! ../jsutils/isObjectLike */ "../node_modules/graphql/jsutils/isObjectLike.js"));

var _symbols = __webpack_require__(/*! ../polyfills/symbols */ "../node_modules/graphql/polyfills/symbols.js");

var _location = __webpack_require__(/*! ../language/location */ "../node_modules/graphql/language/location.js");

var _printLocation = __webpack_require__(/*! ../language/printLocation */ "../node_modules/graphql/language/printLocation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
var GraphQLError = /*#__PURE__*/function (_Error) {
  _inherits(GraphQLError, _Error);

  var _super = _createSuper(GraphQLError);

  /**
   * A message describing the Error for debugging purposes.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   *
   * Note: should be treated as readonly, despite invariant usage.
   */

  /**
   * An array of { line, column } locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */
  function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
    var _locations2, _source2, _positions2, _extensions2;

    var _this;

    _classCallCheck(this, GraphQLError);

    _this = _super.call(this, message); // Compute list of blame nodes.

    var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


    var _source = source;

    if (!_source && _nodes) {
      var _nodes$0$loc;

      _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
    }

    var _positions = positions;

    if (!_positions && _nodes) {
      _positions = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push(node.loc.start);
        }

        return list;
      }, []);
    }

    if (_positions && _positions.length === 0) {
      _positions = undefined;
    }

    var _locations;

    if (positions && source) {
      _locations = positions.map(function (pos) {
        return (0, _location.getLocation)(source, pos);
      });
    } else if (_nodes) {
      _locations = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push((0, _location.getLocation)(node.loc.source, node.loc.start));
        }

        return list;
      }, []);
    }

    var _extensions = extensions;

    if (_extensions == null && originalError != null) {
      var originalExtensions = originalError.extensions;

      if ((0, _isObjectLike.default)(originalExtensions)) {
        _extensions = originalExtensions;
      }
    }

    Object.defineProperties(_assertThisInitialized(_this), {
      name: {
        value: 'GraphQLError'
      },
      message: {
        value: message,
        // By being enumerable, JSON.stringify will include `message` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: true,
        writable: true
      },
      locations: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : undefined,
        // By being enumerable, JSON.stringify will include `locations` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _locations != null
      },
      path: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: path !== null && path !== void 0 ? path : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: path != null
      },
      nodes: {
        value: _nodes !== null && _nodes !== void 0 ? _nodes : undefined
      },
      source: {
        value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : undefined
      },
      positions: {
        value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : undefined
      },
      originalError: {
        value: originalError
      },
      extensions: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _extensions != null
      }
    }); // Include (non-enumerable) stack trace.

    if (originalError === null || originalError === void 0 ? void 0 : originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')


    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }

    return _this;
  }

  _createClass(GraphQLError, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    } // FIXME: workaround to not break chai comparisons, should be remove in v16
    // $FlowFixMe Flow doesn't support computed properties yet

  }, {
    key: _symbols.SYMBOL_TO_STRING_TAG,
    get: function get() {
      return 'Object';
    }
  }]);

  return GraphQLError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */


exports.GraphQLError = GraphQLError;

function printError(error) {
  var output = error.message;

  if (error.nodes) {
    for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
      var node = _error$nodes2[_i2];

      if (node.loc) {
        output += '\n\n' + (0, _printLocation.printLocation)(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
      var location = _error$locations2[_i4];
      output += '\n\n' + (0, _printLocation.printSourceLocation)(error.source, location);
    }
  }

  return output;
}


/***/ }),

/***/ "../node_modules/graphql/error/syntaxError.js":
/*!****************************************************!*\
  !*** ../node_modules/graphql/error/syntaxError.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export syntaxError [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.syntaxError = syntaxError;

var _GraphQLError = __webpack_require__(/*! ./GraphQLError */ "../node_modules/graphql/error/GraphQLError.js");

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */
function syntaxError(source, position, description) {
  return new _GraphQLError.GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/defineInspect.js":
/*!********************************************************!*\
  !*** ../node_modules/graphql/jsutils/defineInspect.js ***!
  \********************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = defineInspect;

var _invariant = _interopRequireDefault(__webpack_require__(/*! ./invariant */ "../node_modules/graphql/jsutils/invariant.js"));

var _nodejsCustomInspectSymbol = _interopRequireDefault(__webpack_require__(/*! ./nodejsCustomInspectSymbol */ "../node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
 */
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === 'function' || (0, _invariant.default)(0);
  classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')

  if (_nodejsCustomInspectSymbol.default) {
    classObject.prototype[_nodejsCustomInspectSymbol.default] = fn;
  }
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/devAssert.js":
/*!****************************************************!*\
  !*** ../node_modules/graphql/jsutils/devAssert.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = devAssert;

function devAssert(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message);
  }
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/inspect.js":
/*!**************************************************!*\
  !*** ../node_modules/graphql/jsutils/inspect.js ***!
  \**************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = inspect;

var _nodejsCustomInspectSymbol = _interopRequireDefault(__webpack_require__(/*! ./nodejsCustomInspectSymbol */ "../node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return '[Circular]';
  }

  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);

  if (customInspectFn !== undefined) {
    // $FlowFixMe(>=0.90.0)
    var customValue = customInspectFn.call(value); // check for infinite recursion

    if (customValue !== value) {
      return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function formatObject(object, seenValues) {
  var keys = Object.keys(object);

  if (keys.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  var properties = keys.map(function (key) {
    var value = formatValue(object[key], seenValues);
    return key + ': ' + value;
  });
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];

  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }

  return '[' + items.join(', ') + ']';
}

function getCustomFn(object) {
  var customInspectFn = object[String(_nodejsCustomInspectSymbol.default)];

  if (typeof customInspectFn === 'function') {
    return customInspectFn;
  }

  if (typeof object.inspect === 'function') {
    return object.inspect;
  }
}

function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    var name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/invariant.js":
/*!****************************************************!*\
  !*** ../node_modules/graphql/jsutils/invariant.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = invariant;

function invariant(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
  }
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/isObjectLike.js":
/*!*******************************************************!*\
  !*** ../node_modules/graphql/jsutils/isObjectLike.js ***!
  \*******************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = isObjectLike;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return _typeof(value) == 'object' && value !== null;
}


/***/ }),

/***/ "../node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js":
/*!********************************************************************!*\
  !*** ../node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js ***!
  \********************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
var _default = nodejsCustomInspectSymbol;
exports.default = _default;


/***/ }),

/***/ "../node_modules/graphql/language/ast.js":
/*!***********************************************!*\
  !*** ../node_modules/graphql/language/ast.js ***!
  \***********************************************/
/*! flagged exports */
/*! export Location [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Token [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isNode = isNode;
exports.Token = exports.Location = void 0;

var _defineInspect = _interopRequireDefault(__webpack_require__(/*! ../jsutils/defineInspect */ "../node_modules/graphql/jsutils/defineInspect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
var Location = /*#__PURE__*/function () {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  function Location(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  var _proto = Location.prototype;

  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };

  return Location;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.


exports.Location = Location;
(0, _defineInspect.default)(Location);
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

var Token = /*#__PURE__*/function () {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  function Token(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }

  var _proto2 = Token.prototype;

  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };

  return Token;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.


exports.Token = Token;
(0, _defineInspect.default)(Token);
/**
 * @internal
 */

function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === 'string';
}
/**
 * The list of all possible AST node types.
 */


/***/ }),

/***/ "../node_modules/graphql/language/blockString.js":
/*!*******************************************************!*\
  !*** ../node_modules/graphql/language/blockString.js ***!
  \*******************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export dedentBlockStringValue [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBlockStringIndentation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export printBlockString [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.dedentBlockStringValue = dedentBlockStringValue;
exports.getBlockStringIndentation = getBlockStringIndentation;
exports.printBlockString = printBlockString;

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */
function dedentBlockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

  var commonIndent = getBlockStringIndentation(lines);

  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  } // Remove leading and trailing blank lines.


  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }

  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  } // Return a string of the lines joined with U+000A.


  return lines.join('\n');
}
/**
 * @internal
 */


function getBlockStringIndentation(lines) {
  var commonIndent = null;

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i];
    var indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    if (commonIndent === null || indent < commonIndent) {
      commonIndent = indent;

      if (commonIndent === 0) {
        break;
      }
    }
  }

  return commonIndent === null ? 0 : commonIndent;
}

function leadingWhitespace(str) {
  var i = 0;

  while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
    i++;
  }

  return i;
}

function isBlank(str) {
  return leadingWhitespace(str) === str.length;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */


function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSingleLine = value.indexOf('\n') === -1;
  var hasLeadingSpace = value[0] === ' ' || value[0] === '\t';
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === '\\';
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = ''; // Format a multi-line block quote to account for leading space.

  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += '\n' + indentation;
  }

  result += indentation ? value.replace(/\n/g, '\n' + indentation) : value;

  if (printAsMultipleLines) {
    result += '\n';
  }

  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}


/***/ }),

/***/ "../node_modules/graphql/language/directiveLocation.js":
/*!*************************************************************!*\
  !*** ../node_modules/graphql/language/directiveLocation.js ***!
  \*************************************************************/
/*! flagged exports */
/*! export DirectiveLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DirectiveLocation = void 0;

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
});
/**
 * The enum type representing the directive location values.
 */

exports.DirectiveLocation = DirectiveLocation;


/***/ }),

/***/ "../node_modules/graphql/language/kinds.js":
/*!*************************************************!*\
  !*** ../node_modules/graphql/language/kinds.js ***!
  \*************************************************/
/*! flagged exports */
/*! export Kind [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Kind = void 0;

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind = Object.freeze({
  // Name
  NAME: 'Name',
  // Document
  DOCUMENT: 'Document',
  OPERATION_DEFINITION: 'OperationDefinition',
  VARIABLE_DEFINITION: 'VariableDefinition',
  SELECTION_SET: 'SelectionSet',
  FIELD: 'Field',
  ARGUMENT: 'Argument',
  // Fragments
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  FRAGMENT_DEFINITION: 'FragmentDefinition',
  // Values
  VARIABLE: 'Variable',
  INT: 'IntValue',
  FLOAT: 'FloatValue',
  STRING: 'StringValue',
  BOOLEAN: 'BooleanValue',
  NULL: 'NullValue',
  ENUM: 'EnumValue',
  LIST: 'ListValue',
  OBJECT: 'ObjectValue',
  OBJECT_FIELD: 'ObjectField',
  // Directives
  DIRECTIVE: 'Directive',
  // Types
  NAMED_TYPE: 'NamedType',
  LIST_TYPE: 'ListType',
  NON_NULL_TYPE: 'NonNullType',
  // Type System Definitions
  SCHEMA_DEFINITION: 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
  // Type Definitions
  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
  FIELD_DEFINITION: 'FieldDefinition',
  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
  // Directive Definitions
  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
  // Type System Extensions
  SCHEMA_EXTENSION: 'SchemaExtension',
  // Type Extensions
  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
});
/**
 * The enum type representing the possible kind values of AST nodes.
 */

exports.Kind = Kind;


/***/ }),

/***/ "../node_modules/graphql/language/lexer.js":
/*!*************************************************!*\
  !*** ../node_modules/graphql/language/lexer.js ***!
  \*************************************************/
/*! flagged exports */
/*! export Lexer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isPunctuatorTokenKind [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isPunctuatorTokenKind = isPunctuatorTokenKind;
exports.Lexer = void 0;

var _syntaxError = __webpack_require__(/*! ../error/syntaxError */ "../node_modules/graphql/error/syntaxError.js");

var _ast = __webpack_require__(/*! ./ast */ "../node_modules/graphql/language/ast.js");

var _tokenKind = __webpack_require__(/*! ./tokenKind */ "../node_modules/graphql/language/tokenKind.js");

var _blockString = __webpack_require__(/*! ./blockString */ "../node_modules/graphql/language/blockString.js");

/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
var Lexer = /*#__PURE__*/function () {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  function Lexer(source) {
    var startOfFileToken = new _ast.Token(_tokenKind.TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */


  var _proto = Lexer.prototype;

  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  ;

  _proto.lookahead = function lookahead() {
    var token = this.token;

    if (token.kind !== _tokenKind.TokenKind.EOF) {
      do {
        var _token$next;

        // Note: next is only mutable during parsing, so we cast to allow this.
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === _tokenKind.TokenKind.COMMENT);
    }

    return token;
  };

  return Lexer;
}();
/**
 * @internal
 */


exports.Lexer = Lexer;

function isPunctuatorTokenKind(kind) {
  return kind === _tokenKind.TokenKind.BANG || kind === _tokenKind.TokenKind.DOLLAR || kind === _tokenKind.TokenKind.AMP || kind === _tokenKind.TokenKind.PAREN_L || kind === _tokenKind.TokenKind.PAREN_R || kind === _tokenKind.TokenKind.SPREAD || kind === _tokenKind.TokenKind.COLON || kind === _tokenKind.TokenKind.EQUALS || kind === _tokenKind.TokenKind.AT || kind === _tokenKind.TokenKind.BRACKET_L || kind === _tokenKind.TokenKind.BRACKET_R || kind === _tokenKind.TokenKind.BRACE_L || kind === _tokenKind.TokenKind.PIPE || kind === _tokenKind.TokenKind.BRACE_R;
}

function printCharCode(code) {
  return (// NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? _tokenKind.TokenKind.EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
  );
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */


function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;

  if (pos >= bodyLength) {
    return new _ast.Token(_tokenKind.TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = body.charCodeAt(pos); // SourceCharacter

  switch (code) {
    // !
    case 33:
      return new _ast.Token(_tokenKind.TokenKind.BANG, pos, pos + 1, line, col, prev);
    // #

    case 35:
      return readComment(source, pos, line, col, prev);
    // $

    case 36:
      return new _ast.Token(_tokenKind.TokenKind.DOLLAR, pos, pos + 1, line, col, prev);
    // &

    case 38:
      return new _ast.Token(_tokenKind.TokenKind.AMP, pos, pos + 1, line, col, prev);
    // (

    case 40:
      return new _ast.Token(_tokenKind.TokenKind.PAREN_L, pos, pos + 1, line, col, prev);
    // )

    case 41:
      return new _ast.Token(_tokenKind.TokenKind.PAREN_R, pos, pos + 1, line, col, prev);
    // .

    case 46:
      if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
        return new _ast.Token(_tokenKind.TokenKind.SPREAD, pos, pos + 3, line, col, prev);
      }

      break;
    // :

    case 58:
      return new _ast.Token(_tokenKind.TokenKind.COLON, pos, pos + 1, line, col, prev);
    // =

    case 61:
      return new _ast.Token(_tokenKind.TokenKind.EQUALS, pos, pos + 1, line, col, prev);
    // @

    case 64:
      return new _ast.Token(_tokenKind.TokenKind.AT, pos, pos + 1, line, col, prev);
    // [

    case 91:
      return new _ast.Token(_tokenKind.TokenKind.BRACKET_L, pos, pos + 1, line, col, prev);
    // ]

    case 93:
      return new _ast.Token(_tokenKind.TokenKind.BRACKET_R, pos, pos + 1, line, col, prev);
    // {

    case 123:
      return new _ast.Token(_tokenKind.TokenKind.BRACE_L, pos, pos + 1, line, col, prev);
    // |

    case 124:
      return new _ast.Token(_tokenKind.TokenKind.PIPE, pos, pos + 1, line, col, prev);
    // }

    case 125:
      return new _ast.Token(_tokenKind.TokenKind.BRACE_R, pos, pos + 1, line, col, prev);
    // A-Z _ a-z

    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
    case 95:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
      return readName(source, pos, line, col, prev);
    // - 0-9

    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return readNumber(source, pos, code, line, col, prev);
    // "

    case 34:
      if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
        return readBlockString(source, pos, line, col, prev, lexer);
      }

      return readString(source, pos, line, col, prev);
  }

  throw (0, _syntaxError.syntaxError)(source, pos, unexpectedCharacterMessage(code));
}
/**
 * Report a message that an unexpected character was encountered.
 */


function unexpectedCharacterMessage(code) {
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }

  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
  }

  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * character, then returns the position of that character for lexing.
 */


function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;

  while (position < bodyLength) {
    var code = body.charCodeAt(position); // tab | space | comma | BOM

    if (code === 9 || code === 32 || code === 44 || code === 0xfeff) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }

      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }

  return position;
}
/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */


function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;

  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && ( // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new _ast.Token(_tokenKind.TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */


function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = body.charCodeAt(++position);
  }

  if (code === 48) {
    // 0
    code = body.charCodeAt(++position);

    if (code >= 48 && code <= 57) {
      throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 46) {
    // .
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;
    code = body.charCodeAt(++position);

    if (code === 43 || code === 45) {
      // + -
      code = body.charCodeAt(++position);
    }

    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart


  if (code === 46 || isNameStart(code)) {
    throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }

  return new _ast.Token(isFloat ? _tokenKind.TokenKind.FLOAT : _tokenKind.TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading digits.
 */


function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;

  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57); // 0 - 9


    return position;
  }

  throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */


function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new _ast.Token(_tokenKind.TokenKind.STRING, start, position + 1, line, col, prev, value);
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _syntaxError.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    ++position;

    if (code === 92) {
      // \
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);

      switch (code) {
        case 34:
          value += '"';
          break;

        case 47:
          value += '/';
          break;

        case 92:
          value += '\\';
          break;

        case 98:
          value += '\b';
          break;

        case 102:
          value += '\f';
          break;

        case 110:
          value += '\n';
          break;

        case 114:
          value += '\r';
          break;

        case 116:
          value += '\t';
          break;

        case 117:
          {
            // uXXXX
            var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));

            if (charCode < 0) {
              var invalidSequence = body.slice(position + 1, position + 5);
              throw (0, _syntaxError.syntaxError)(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
            }

            value += String.fromCharCode(charCode);
            position += 4;
            break;
          }

        default:
          throw (0, _syntaxError.syntaxError)(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }

      ++position;
      chunkStart = position;
    }
  }

  throw (0, _syntaxError.syntaxError)(source, position, 'Unterminated string.');
}
/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */


function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    // Closing Triple-Quote (""")
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new _ast.Token(_tokenKind.TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, (0, _blockString.dedentBlockStringValue)(rawValue));
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw (0, _syntaxError.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }

      ++lexer.line;
      lexer.lineStart = position;
    } else if ( // Escape Triple-Quote (\""")
    code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw (0, _syntaxError.syntaxError)(source, position, 'Unterminated string.');
}
/**
 * Converts four hexadecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */


function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */


function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */


function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;

  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++position;
  }

  return new _ast.Token(_tokenKind.TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
} // _ A-Z a-z


function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}


/***/ }),

/***/ "../node_modules/graphql/language/location.js":
/*!****************************************************!*\
  !*** ../node_modules/graphql/language/location.js ***!
  \****************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getLocation = getLocation;

/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;

  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }

  return {
    line: line,
    column: column
  };
}


/***/ }),

/***/ "../node_modules/graphql/language/parser.js":
/*!**************************************************!*\
  !*** ../node_modules/graphql/language/parser.js ***!
  \**************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parse [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parseType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export parseValue [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;

var _inspect = _interopRequireDefault(__webpack_require__(/*! ../jsutils/inspect */ "../node_modules/graphql/jsutils/inspect.js"));

var _devAssert = _interopRequireDefault(__webpack_require__(/*! ../jsutils/devAssert */ "../node_modules/graphql/jsutils/devAssert.js"));

var _syntaxError = __webpack_require__(/*! ../error/syntaxError */ "../node_modules/graphql/error/syntaxError.js");

var _kinds = __webpack_require__(/*! ./kinds */ "../node_modules/graphql/language/kinds.js");

var _ast = __webpack_require__(/*! ./ast */ "../node_modules/graphql/language/ast.js");

var _source = __webpack_require__(/*! ./source */ "../node_modules/graphql/language/source.js");

var _tokenKind = __webpack_require__(/*! ./tokenKind */ "../node_modules/graphql/language/tokenKind.js");

var _directiveLocation = __webpack_require__(/*! ./directiveLocation */ "../node_modules/graphql/language/directiveLocation.js");

var _lexer = __webpack_require__(/*! ./lexer */ "../node_modules/graphql/language/lexer.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */


function parseValue(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind.TokenKind.SOF);
  var value = parser.parseValueLiteral(false);
  parser.expectToken(_tokenKind.TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */


function parseType(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(_tokenKind.TokenKind.SOF);
  var type = parser.parseTypeReference();
  parser.expectToken(_tokenKind.TokenKind.EOF);
  return type;
}

var Parser = /*#__PURE__*/function () {
  function Parser(source, options) {
    var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
    sourceObj instanceof _source.Source || (0, _devAssert.default)(0, "Must provide Source. Received: ".concat((0, _inspect.default)(sourceObj), "."));
    this._lexer = new _lexer.Lexer(sourceObj);
    this._options = options;
  }
  /**
   * Converts a name lex token into a name parse node.
   */


  var _proto = Parser.prototype;

  _proto.parseName = function parseName() {
    var token = this.expectToken(_tokenKind.TokenKind.NAME);
    return {
      kind: _kinds.Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */
  ;

  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: _kinds.Kind.DOCUMENT,
      definitions: this.many(_tokenKind.TokenKind.SOF, this.parseDefinition, _tokenKind.TokenKind.EOF),
      loc: this.loc(start)
    };
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   */
  ;

  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(_tokenKind.TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'schema':
        case 'scalar':
        case 'type':
        case 'interface':
        case 'union':
        case 'enum':
        case 'input':
        case 'directive':
          return this.parseTypeSystemDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }

    throw this.unexpected();
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  ;

  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;

    if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
      return {
        kind: _kinds.Kind.OPERATION_DEFINITION,
        operation: 'query',
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    var operation = this.parseOperationType();
    var name;

    if (this.peek(_tokenKind.TokenKind.NAME)) {
      name = this.parseName();
    }

    return {
      kind: _kinds.Kind.OPERATION_DEFINITION,
      operation: operation,
      name: name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * OperationType : one of query mutation subscription
   */
  ;

  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(_tokenKind.TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return 'query';

      case 'mutation':
        return 'mutation';

      case 'subscription':
        return 'subscription';
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  ;

  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseVariableDefinition, _tokenKind.TokenKind.PAREN_R);
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: _kinds.Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.parseValueLiteral(true) : undefined,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  }
  /**
   * Variable : $ Name
   */
  ;

  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(_tokenKind.TokenKind.DOLLAR);
    return {
      kind: _kinds.Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  }
  /**
   * SelectionSet : { Selection+ }
   */
  ;

  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: _kinds.Kind.SELECTION_SET,
      selections: this.many(_tokenKind.TokenKind.BRACE_L, this.parseSelection, _tokenKind.TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  ;

  _proto.parseSelection = function parseSelection() {
    return this.peek(_tokenKind.TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  ;

  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;

    if (this.expectOptionalToken(_tokenKind.TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return {
      kind: _kinds.Kind.FIELD,
      alias: alias,
      name: name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(_tokenKind.TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined,
      loc: this.loc(start)
    };
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  ;

  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_tokenKind.TokenKind.PAREN_L, item, _tokenKind.TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(_tokenKind.TokenKind.COLON);
    return {
      kind: _kinds.Kind.ARGUMENT,
      name: name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };

  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: _kinds.Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  ;

  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(_tokenKind.TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(_tokenKind.TokenKind.NAME)) {
      return {
        kind: _kinds.Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }

    return {
      kind: _kinds.Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  ;

  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;

    var start = this._lexer.token;
    this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: _kinds.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    return {
      kind: _kinds.Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentName : Name but not `on`
   */
  ;

  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  ;

  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;

    switch (token.kind) {
      case _tokenKind.TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case _tokenKind.TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case _tokenKind.TokenKind.INT:
        this._lexer.advance();

        return {
          kind: _kinds.Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };

      case _tokenKind.TokenKind.FLOAT:
        this._lexer.advance();

        return {
          kind: _kinds.Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };

      case _tokenKind.TokenKind.STRING:
      case _tokenKind.TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case _tokenKind.TokenKind.NAME:
        this._lexer.advance();

        switch (token.value) {
          case 'true':
            return {
              kind: _kinds.Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };

          case 'false':
            return {
              kind: _kinds.Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };

          case 'null':
            return {
              kind: _kinds.Kind.NULL,
              loc: this.loc(token)
            };

          default:
            return {
              kind: _kinds.Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }

      case _tokenKind.TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }

        break;
    }

    throw this.unexpected();
  };

  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;

    this._lexer.advance();

    return {
      kind: _kinds.Kind.STRING,
      value: token.value,
      block: token.kind === _tokenKind.TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  ;

  _proto.parseList = function parseList(isConst) {
    var _this = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this.parseValueLiteral(isConst);
    };

    return {
      kind: _kinds.Kind.LIST,
      values: this.any(_tokenKind.TokenKind.BRACKET_L, item, _tokenKind.TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   */
  ;

  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this2.parseObjectField(isConst);
    };

    return {
      kind: _kinds.Kind.OBJECT,
      fields: this.any(_tokenKind.TokenKind.BRACE_L, item, _tokenKind.TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(_tokenKind.TokenKind.COLON);
    return {
      kind: _kinds.Kind.OBJECT_FIELD,
      name: name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */
  ;

  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];

    while (this.peek(_tokenKind.TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }
  /**
   * Directive[Const] : @ Name Arguments[?Const]?
   */
  ;

  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(_tokenKind.TokenKind.AT);
    return {
      kind: _kinds.Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  ;

  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;

    if (this.expectOptionalToken(_tokenKind.TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(_tokenKind.TokenKind.BRACKET_R);
      type = {
        kind: _kinds.Kind.LIST_TYPE,
        type: type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(_tokenKind.TokenKind.BANG)) {
      return {
        kind: _kinds.Kind.NON_NULL_TYPE,
        type: type,
        loc: this.loc(start)
      };
    }

    return type;
  }
  /**
   * NamedType : Name
   */
  ;

  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: _kinds.Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Type Definition section.

  /**
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    // Many definitions begin with a description and require a lookahead.
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;

    if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }
    }

    throw this.unexpected(keywordToken);
  };

  _proto.peekDescription = function peekDescription() {
    return this.peek(_tokenKind.TokenKind.STRING) || this.peek(_tokenKind.TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  ;

  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   */
  ;

  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
    return {
      kind: _kinds.Kind.SCHEMA_DEFINITION,
      description: description,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  ;

  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(_tokenKind.TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
      operation: operation,
      type: type,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  ;

  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  ;

  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var types = [];

    if (this.expectOptionalKeyword('implements')) {
      // Optional leading ampersand
      this.expectOptionalToken(_tokenKind.TokenKind.AMP);

      do {
        var _this$_options2;

        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(_tokenKind.TokenKind.AMP) || // Legacy support for the SDL?
      ((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true && this.peek(_tokenKind.TokenKind.NAME));
    }

    return types;
  }
  /**
   * FieldsDefinition : { FieldDefinition+ }
   */
  ;

  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;

    // Legacy support for the SDL?
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(_tokenKind.TokenKind.BRACE_L) && this._lexer.lookahead().kind === _tokenKind.TokenKind.BRACE_R) {
      this._lexer.advance();

      this._lexer.advance();

      return [];
    }

    return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseFieldDefinition, _tokenKind.TokenKind.BRACE_R);
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  ;

  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(_tokenKind.TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds.Kind.FIELD_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      type: type,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  ;

  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseInputValueDef, _tokenKind.TokenKind.PAREN_R);
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(_tokenKind.TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;

    if (this.expectOptionalToken(_tokenKind.TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }

    var directives = this.parseDirectives(true);
    return {
      kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
      description: description,
      name: name,
      type: type,
      defaultValue: defaultValue,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  ;

  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: _kinds.Kind.UNION_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  ;

  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    var types = [];

    if (this.expectOptionalToken(_tokenKind.TokenKind.EQUALS)) {
      // Optional leading pipe
      this.expectOptionalToken(_tokenKind.TokenKind.PIPE);

      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(_tokenKind.TokenKind.PIPE));
    }

    return types;
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  ;

  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * EnumValuesDefinition : { EnumValueDefinition+ }
   */
  ;

  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseEnumValueDefinition, _tokenKind.TokenKind.BRACE_R);
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   *
   * EnumValue : Name
   */
  ;

  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  ;

  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InputFieldsDefinition : { InputValueDefinition+ }
   */
  ;

  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseInputValueDef, _tokenKind.TokenKind.BRACE_R);
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   */
  ;

  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.SCHEMA_EXTENSION,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  ;

  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  ;

  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  ;

  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  ;

  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.UNION_TYPE_EXTENSION,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  ;

  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  ;

  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   */
  ;

  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(_tokenKind.TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    var locations = this.parseDirectiveLocations();
    return {
      kind: _kinds.Kind.DIRECTIVE_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      repeatable: repeatable,
      locations: locations,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  ;

  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    // Optional leading pipe
    this.expectOptionalToken(_tokenKind.TokenKind.PIPE);
    var locations = [];

    do {
      locations.push(this.parseDirectiveLocation());
    } while (this.expectOptionalToken(_tokenKind.TokenKind.PIPE));

    return locations;
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  ;

  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();

    if (_directiveLocation.DirectiveLocation[name.value] !== undefined) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a location object, used to identify the place in
   * the source that created a given parsed object.
   */
  ;

  _proto.loc = function loc(startToken) {
    var _this$_options4;

    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new _ast.Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  }
  /**
   * Determines if the next token is of a given kind
   */
  ;

  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing
   * the lexer. Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  }
  /**
   * If the next token is of the given kind, return that token after advancing
   * the lexer. Otherwise, do not change the parser state and return undefined.
   */
  ;

  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    return undefined;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing
   * the lexer. Otherwise, do not change the parser state and return "false".
   */
  ;

  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
      this._lexer.advance();

      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token
   * is encountered.
   */
  ;

  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by
   * the parseFn. This list begins with a lex token of openKind
   * and ends with a lex token of closeKind. Advances the parser
   * to the next lex token after the closing token.
   */
  ;

  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always
   * return non-empty list that begins with a lex token of openKind and ends
   * with a lex token of closeKind. Advances the parser to the next lex token
   * after the closing token.
   */
  ;

  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by
   * the parseFn. This list begins with a lex token of openKind
   * and ends with a lex token of closeKind. Advances the parser
   * to the next lex token after the closing token.
   */
  ;

  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  };

  return Parser;
}();
/**
 * A helper function to describe a token as a string for debugging
 */


function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
}
/**
 * A helper function to describe a token kind as a string for debugging
 */


function getTokenKindDesc(kind) {
  return (0, _lexer.isPunctuatorTokenKind)(kind) ? "\"".concat(kind, "\"") : kind;
}


/***/ }),

/***/ "../node_modules/graphql/language/printLocation.js":
/*!*********************************************************!*\
  !*** ../node_modules/graphql/language/printLocation.js ***!
  \*********************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export printLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export printSourceLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.printLocation = printLocation;
exports.printSourceLocation = printSourceLocation;

var _location = __webpack_require__(/*! ./location */ "../node_modules/graphql/language/location.js");

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(location.source, (0, _location.getLocation)(location.source, location.start));
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */


function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];

    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
      return ['', subLine];
    }), [[' ', whitespace(subLineColumnNum - 1) + '^'], ['', subLines[subLineIndex + 1]]]));
  }

  return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    var _ = _ref[0],
        line = _ref[1];
    return line !== undefined;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function (_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function (_ref3) {
    var prefix = _ref3[0],
        line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
  }).join('\n');
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}


/***/ }),

/***/ "../node_modules/graphql/language/printer.js":
/*!***************************************************!*\
  !*** ../node_modules/graphql/language/printer.js ***!
  \***************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export print [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.print = print;

var _visitor = __webpack_require__(/*! ./visitor */ "../node_modules/graphql/language/visitor.js");

var _blockString = __webpack_require__(/*! ./blockString */ "../node_modules/graphql/language/blockString.js");

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, {
    leave: printDocASTReducer
  });
} // TODO: provide better type coverage in future


var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? (0, _blockString.printBlockString)(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function (_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        interfaces = _ref26.interfaces,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        repeatable = _ref31.repeatable,
        locations = _ref31.locations;
    return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        interfaces = _ref35.interfaces,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray) {
  var _maybeArray$filter$jo;

  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */


function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return maybeString ? start + maybeString + end : '';
}

function indent(maybeString) {
  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
}

function isMultiline(string) {
  return string.indexOf('\n') !== -1;
}

function hasMultilineItems(maybeArray) {
  return maybeArray && maybeArray.some(isMultiline);
}


/***/ }),

/***/ "../node_modules/graphql/language/source.js":
/*!**************************************************!*\
  !*** ../node_modules/graphql/language/source.js ***!
  \**************************************************/
/*! flagged exports */
/*! export Source [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Source = void 0;

var _symbols = __webpack_require__(/*! ../polyfills/symbols */ "../node_modules/graphql/polyfills/symbols.js");

var _devAssert = _interopRequireDefault(__webpack_require__(/*! ../jsutils/devAssert */ "../node_modules/graphql/jsutils/devAssert.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
var Source = /*#__PURE__*/function () {
  function Source(body) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
    var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      line: 1,
      column: 1
    };
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || (0, _devAssert.default)(0, 'line in locationOffset is 1-indexed and must be positive.');
    this.locationOffset.column > 0 || (0, _devAssert.default)(0, 'column in locationOffset is 1-indexed and must be positive.');
  } // $FlowFixMe Flow doesn't support computed properties yet


  _createClass(Source, [{
    key: _symbols.SYMBOL_TO_STRING_TAG,
    get: function get() {
      return 'Source';
    }
  }]);

  return Source;
}();

exports.Source = Source;


/***/ }),

/***/ "../node_modules/graphql/language/tokenKind.js":
/*!*****************************************************!*\
  !*** ../node_modules/graphql/language/tokenKind.js ***!
  \*****************************************************/
/*! flagged exports */
/*! export TokenKind [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TokenKind = void 0;

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = Object.freeze({
  SOF: '<SOF>',
  EOF: '<EOF>',
  BANG: '!',
  DOLLAR: '$',
  AMP: '&',
  PAREN_L: '(',
  PAREN_R: ')',
  SPREAD: '...',
  COLON: ':',
  EQUALS: '=',
  AT: '@',
  BRACKET_L: '[',
  BRACKET_R: ']',
  BRACE_L: '{',
  PIPE: '|',
  BRACE_R: '}',
  NAME: 'Name',
  INT: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  BLOCK_STRING: 'BlockString',
  COMMENT: 'Comment'
});
/**
 * The enum type representing the token kinds values.
 */

exports.TokenKind = TokenKind;


/***/ }),

/***/ "../node_modules/graphql/language/visitor.js":
/*!***************************************************!*\
  !*** ../node_modules/graphql/language/visitor.js ***!
  \***************************************************/
/*! flagged exports */
/*! export BREAK [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QueryDocumentKeys [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getVisitFn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export visit [provided] [no usage info] [missing usage info prevents renaming] */
/*! export visitInParallel [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.getVisitFn = getVisitFn;
exports.BREAK = exports.QueryDocumentKeys = void 0;

var _inspect = _interopRequireDefault(__webpack_require__(/*! ../jsutils/inspect */ "../node_modules/graphql/jsutils/inspect.js"));

var _ast = __webpack_require__(/*! ./ast */ "../node_modules/graphql/language/ast.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
exports.QueryDocumentKeys = QueryDocumentKeys;
var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

exports.BREAK = BREAK;

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!(0, _ast.isNode)(node)) {
        throw new Error("Invalid AST Node: ".concat((0, _inspect.default)(node), "."));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if ((0, _ast.isNode)(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */


function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */


function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}


/***/ }),

/***/ "../node_modules/graphql/polyfills/symbols.js":
/*!****************************************************!*\
  !*** ../node_modules/graphql/polyfills/symbols.js ***!
  \****************************************************/
/*! flagged exports */
/*! export SYMBOL_ASYNC_ITERATOR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SYMBOL_ITERATOR [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SYMBOL_TO_STRING_TAG [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SYMBOL_TO_STRING_TAG = exports.SYMBOL_ASYNC_ITERATOR = exports.SYMBOL_ITERATOR = void 0;
// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var SYMBOL_ITERATOR = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'; // In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')

exports.SYMBOL_ITERATOR = SYMBOL_ITERATOR;
var SYMBOL_ASYNC_ITERATOR = // $FlowFixMe Flow doesn't define `Symbol.asyncIterator` yet
typeof Symbol === 'function' ? Symbol.asyncIterator : '@@asyncIterator'; // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')

exports.SYMBOL_ASYNC_ITERATOR = SYMBOL_ASYNC_ITERATOR;
var SYMBOL_TO_STRING_TAG = // $FlowFixMe Flow doesn't define `Symbol.toStringTag` yet
typeof Symbol === 'function' ? Symbol.toStringTag : '@@toStringTag';
exports.SYMBOL_TO_STRING_TAG = SYMBOL_TO_STRING_TAG;


/***/ }),

/***/ "../node_modules/optimism/lib/bundle.esm.js":
/*!**************************************************!*\
  !*** ../node_modules/optimism/lib/bundle.esm.js ***!
  \**************************************************/
/*! namespace exports */
/*! export KeyTrie [provided] [no usage info] [missing usage info prevents renaming] */
/*! export asyncFromGen [provided] [no usage info] [missing usage info prevents renaming] */
/*! export bindContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export defaultMakeCacheKey [provided] [no usage info] [missing usage info prevents renaming] */
/*! export dep [provided] [no usage info] [missing usage info prevents renaming] */
/*! export noContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setTimeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! export wrap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "asyncFromGen": () => /* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.asyncFromGen,
/* harmony export */   "bindContext": () => /* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.bind,
/* harmony export */   "noContext": () => /* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.noContext,
/* harmony export */   "setTimeout": () => /* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.setTimeout,
/* harmony export */   "KeyTrie": () => /* binding */ KeyTrie,
/* harmony export */   "defaultMakeCacheKey": () => /* binding */ defaultMakeCacheKey,
/* harmony export */   "dep": () => /* binding */ dep,
/* harmony export */   "wrap": () => /* binding */ wrap
/* harmony export */ });
/* harmony import */ var _wry_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/context */ "../node_modules/@wry/context/lib/context.esm.js");



function defaultDispose() { }
var Cache = /** @class */ (function () {
    function Cache(max, dispose) {
        if (max === void 0) { max = Infinity; }
        if (dispose === void 0) { dispose = defaultDispose; }
        this.max = max;
        this.dispose = dispose;
        this.map = new Map();
        this.newest = null;
        this.oldest = null;
    }
    Cache.prototype.has = function (key) {
        return this.map.has(key);
    };
    Cache.prototype.get = function (key) {
        var entry = this.getEntry(key);
        return entry && entry.value;
    };
    Cache.prototype.getEntry = function (key) {
        var entry = this.map.get(key);
        if (entry && entry !== this.newest) {
            var older = entry.older, newer = entry.newer;
            if (newer) {
                newer.older = older;
            }
            if (older) {
                older.newer = newer;
            }
            entry.older = this.newest;
            entry.older.newer = entry;
            entry.newer = null;
            this.newest = entry;
            if (entry === this.oldest) {
                this.oldest = newer;
            }
        }
        return entry;
    };
    Cache.prototype.set = function (key, value) {
        var entry = this.getEntry(key);
        if (entry) {
            return entry.value = value;
        }
        entry = {
            key: key,
            value: value,
            newer: null,
            older: this.newest
        };
        if (this.newest) {
            this.newest.newer = entry;
        }
        this.newest = entry;
        this.oldest = this.oldest || entry;
        this.map.set(key, entry);
        return entry.value;
    };
    Cache.prototype.clean = function () {
        while (this.oldest && this.map.size > this.max) {
            this.delete(this.oldest.key);
        }
    };
    Cache.prototype.delete = function (key) {
        var entry = this.map.get(key);
        if (entry) {
            if (entry === this.newest) {
                this.newest = entry.older;
            }
            if (entry === this.oldest) {
                this.oldest = entry.newer;
            }
            if (entry.newer) {
                entry.newer.older = entry.older;
            }
            if (entry.older) {
                entry.older.newer = entry.newer;
            }
            this.map.delete(key);
            this.dispose(entry.value, key);
            return true;
        }
        return false;
    };
    return Cache;
}());

var parentEntrySlot = new _wry_context__WEBPACK_IMPORTED_MODULE_0__.Slot();

function maybeUnsubscribe(entryOrDep) {
    var unsubscribe = entryOrDep.unsubscribe;
    if (typeof unsubscribe === "function") {
        entryOrDep.unsubscribe = void 0;
        unsubscribe();
    }
}

var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
    if (!condition) {
        throw new Error(optionalMessage || "assertion failure");
    }
}
function valueIs(a, b) {
    var len = a.length;
    return (
    // Unknown values are not equal to each other.
    len > 0 &&
        // Both values must be ordinary (or both exceptional) to be equal.
        len === b.length &&
        // The underlying value or exception must be the same.
        a[len - 1] === b[len - 1]);
}
function valueGet(value) {
    switch (value.length) {
        case 0: throw new Error("unknown value");
        case 1: return value[0];
        case 2: throw value[1];
    }
}
function valueCopy(value) {
    return value.slice(0);
}
var Entry = /** @class */ (function () {
    function Entry(fn, args) {
        this.fn = fn;
        this.args = args;
        this.parents = new Set();
        this.childValues = new Map();
        // When this Entry has children that are dirty, this property becomes
        // a Set containing other Entry objects, borrowed from emptySetPool.
        // When the set becomes empty, it gets recycled back to emptySetPool.
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        this.deps = null;
        ++Entry.count;
    }
    Entry.prototype.peek = function () {
        if (this.value.length === 1 && !mightBeDirty(this)) {
            return this.value[0];
        }
    };
    // This is the most important method of the Entry API, because it
    // determines whether the cached this.value can be returned immediately,
    // or must be recomputed. The overall performance of the caching system
    // depends on the truth of the following observations: (1) this.dirty is
    // usually false, (2) this.dirtyChildren is usually null/empty, and thus
    // (3) valueGet(this.value) is usually returned without recomputation.
    Entry.prototype.recompute = function () {
        assert(!this.recomputing, "already recomputing");
        rememberParent(this);
        return mightBeDirty(this)
            ? reallyRecompute(this)
            : valueGet(this.value);
    };
    Entry.prototype.setDirty = function () {
        if (this.dirty)
            return;
        this.dirty = true;
        this.value.length = 0;
        reportDirty(this);
        forgetChildren(this);
        // We can go ahead and unsubscribe here, since any further dirty
        // notifications we receive will be redundant, and unsubscribing may
        // free up some resources, e.g. file watchers.
        maybeUnsubscribe(this);
    };
    Entry.prototype.dispose = function () {
        var _this = this;
        forgetChildren(this);
        maybeUnsubscribe(this);
        // Because this entry has been kicked out of the cache (in index.js),
        // we've lost the ability to find out if/when this entry becomes dirty,
        // whether that happens through a subscription, because of a direct call
        // to entry.setDirty(), or because one of its children becomes dirty.
        // Because of this loss of future information, we have to assume the
        // worst (that this entry might have become dirty very soon), so we must
        // immediately mark this entry's parents as dirty. Normally we could
        // just call entry.setDirty() rather than calling parent.setDirty() for
        // each parent, but that would leave this entry in parent.childValues
        // and parent.dirtyChildren, which would prevent the child from being
        // truly forgotten.
        this.parents.forEach(function (parent) {
            parent.setDirty();
            forgetChild(parent, _this);
        });
    };
    Entry.prototype.dependOn = function (dep) {
        dep.add(this);
        if (!this.deps) {
            this.deps = emptySetPool.pop() || new Set();
        }
        this.deps.add(dep);
    };
    Entry.prototype.forgetDeps = function () {
        var _this = this;
        if (this.deps) {
            this.deps.forEach(function (dep) { return dep.delete(_this); });
            this.deps.clear();
            emptySetPool.push(this.deps);
            this.deps = null;
        }
    };
    Entry.count = 0;
    return Entry;
}());
function rememberParent(child) {
    var parent = parentEntrySlot.getValue();
    if (parent) {
        child.parents.add(parent);
        if (!parent.childValues.has(child)) {
            parent.childValues.set(child, []);
        }
        if (mightBeDirty(child)) {
            reportDirtyChild(parent, child);
        }
        else {
            reportCleanChild(parent, child);
        }
        return parent;
    }
}
function reallyRecompute(entry) {
    forgetChildren(entry);
    // Set entry as the parent entry while calling recomputeNewValue(entry).
    parentEntrySlot.withValue(entry, recomputeNewValue, [entry]);
    if (maybeSubscribe(entry)) {
        // If we successfully recomputed entry.value and did not fail to
        // (re)subscribe, then this Entry is no longer explicitly dirty.
        setClean(entry);
    }
    return valueGet(entry.value);
}
function recomputeNewValue(entry) {
    entry.recomputing = true;
    // Set entry.value as unknown.
    entry.value.length = 0;
    try {
        // If entry.fn succeeds, entry.value will become a normal Value.
        entry.value[0] = entry.fn.apply(null, entry.args);
    }
    catch (e) {
        // If entry.fn throws, entry.value will become exceptional.
        entry.value[1] = e;
    }
    // Either way, this line is always reached.
    entry.recomputing = false;
}
function mightBeDirty(entry) {
    return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
    entry.dirty = false;
    if (mightBeDirty(entry)) {
        // This Entry may still have dirty children, in which case we can't
        // let our parents know we're clean just yet.
        return;
    }
    reportClean(entry);
}
function reportDirty(child) {
    child.parents.forEach(function (parent) { return reportDirtyChild(parent, child); });
}
function reportClean(child) {
    child.parents.forEach(function (parent) { return reportCleanChild(parent, child); });
}
// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(parent, child) {
    // Must have called rememberParent(child) before calling
    // reportDirtyChild(parent, child).
    assert(parent.childValues.has(child));
    assert(mightBeDirty(child));
    if (!parent.dirtyChildren) {
        parent.dirtyChildren = emptySetPool.pop() || new Set;
    }
    else if (parent.dirtyChildren.has(child)) {
        // If we already know this child is dirty, then we must have already
        // informed our own parents that we are dirty, so we can terminate
        // the recursion early.
        return;
    }
    parent.dirtyChildren.add(child);
    reportDirty(parent);
}
// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(parent, child) {
    // Must have called rememberChild(child) before calling
    // reportCleanChild(parent, child).
    assert(parent.childValues.has(child));
    assert(!mightBeDirty(child));
    var childValue = parent.childValues.get(child);
    if (childValue.length === 0) {
        parent.childValues.set(child, valueCopy(child.value));
    }
    else if (!valueIs(childValue, child.value)) {
        parent.setDirty();
    }
    removeDirtyChild(parent, child);
    if (mightBeDirty(parent)) {
        return;
    }
    reportClean(parent);
}
function removeDirtyChild(parent, child) {
    var dc = parent.dirtyChildren;
    if (dc) {
        dc.delete(child);
        if (dc.size === 0) {
            if (emptySetPool.length < POOL_TARGET_SIZE) {
                emptySetPool.push(dc);
            }
            parent.dirtyChildren = null;
        }
    }
}
// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(parent) {
    if (parent.childValues.size > 0) {
        parent.childValues.forEach(function (_value, child) {
            forgetChild(parent, child);
        });
    }
    // Remove this parent Entry from any sets to which it was added by the
    // addToSet method.
    parent.forgetDeps();
    // After we forget all our children, this.dirtyChildren must be empty
    // and therefore must have been reset to null.
    assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
    child.parents.delete(parent);
    parent.childValues.delete(child);
    removeDirtyChild(parent, child);
}
function maybeSubscribe(entry) {
    if (typeof entry.subscribe === "function") {
        try {
            maybeUnsubscribe(entry); // Prevent double subscriptions.
            entry.unsubscribe = entry.subscribe.apply(null, entry.args);
        }
        catch (e) {
            // If this Entry has a subscribe function and it threw an exception
            // (or an unsubscribe function it previously returned now throws),
            // return false to indicate that we were not able to subscribe (or
            // unsubscribe), and this Entry should remain dirty.
            entry.setDirty();
            return false;
        }
    }
    // Returning true indicates either that there was no entry.subscribe
    // function or that it succeeded.
    return true;
}

// A trie data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
// If no makeData function is supplied, the looked-up data will be an empty,
// no-prototype Object.
var defaultMakeData = function () { return Object.create(null); };
var KeyTrie = /** @class */ (function () {
    function KeyTrie(weakness, makeData) {
        if (makeData === void 0) { makeData = defaultMakeData; }
        this.weakness = weakness;
        this.makeData = makeData;
    }
    KeyTrie.prototype.lookup = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        return this.lookupArray(array);
    };
    KeyTrie.prototype.lookupArray = function (array) {
        var node = this;
        array.forEach(function (key) { return node = node.getChildTrie(key); });
        return node.data || (node.data = this.makeData(array.slice(0)));
    };
    KeyTrie.prototype.getChildTrie = function (key) {
        var map = this.weakness && isObjRef(key)
            ? this.weak || (this.weak = new WeakMap())
            : this.strong || (this.strong = new Map());
        var child = map.get(key);
        if (!child)
            map.set(key, child = new KeyTrie(this.weakness, this.makeData));
        return child;
    };
    return KeyTrie;
}());
function isObjRef(value) {
    switch (typeof value) {
        case "object":
            if (value === null)
                break;
        // Fall through to return true...
        case "function":
            return true;
    }
    return false;
}

function dep(options) {
    var depsByKey = new Map();
    var subscribe = options && options.subscribe;
    function depend(key) {
        var parent = parentEntrySlot.getValue();
        if (parent) {
            var dep_1 = depsByKey.get(key);
            if (!dep_1) {
                depsByKey.set(key, dep_1 = new Set);
            }
            parent.dependOn(dep_1);
            if (typeof subscribe === "function") {
                maybeUnsubscribe(dep_1);
                dep_1.unsubscribe = subscribe(key);
            }
        }
    }
    depend.dirty = function dirty(key) {
        var dep = depsByKey.get(key);
        if (dep) {
            dep.forEach(function (entry) { return entry.setDirty(); });
            depsByKey.delete(key);
            maybeUnsubscribe(dep);
        }
    };
    return depend;
}

// The defaultMakeCacheKey function is remarkably powerful, because it gives
// a unique object for any shallow-identical list of arguments. If you need
// to implement a custom makeCacheKey function, you may find it helpful to
// delegate the final work to defaultMakeCacheKey, which is why we export it
// here. However, you may want to avoid defaultMakeCacheKey if your runtime
// does not support WeakMap, or you have the ability to return a string key.
// In those cases, just write your own custom makeCacheKey functions.
var keyTrie = new KeyTrie(typeof WeakMap === "function");
function defaultMakeCacheKey() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return keyTrie.lookupArray(args);
}
var caches = new Set();
function wrap(originalFunction, options) {
    if (options === void 0) { options = Object.create(null); }
    var cache = new Cache(options.max || Math.pow(2, 16), function (entry) { return entry.dispose(); });
    var keyArgs = options.keyArgs || (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args;
    });
    var makeCacheKey = options.makeCacheKey || defaultMakeCacheKey;
    function optimistic() {
        var key = makeCacheKey.apply(null, keyArgs.apply(null, arguments));
        if (key === void 0) {
            return originalFunction.apply(null, arguments);
        }
        var args = Array.prototype.slice.call(arguments);
        var entry = cache.get(key);
        if (entry) {
            entry.args = args;
        }
        else {
            entry = new Entry(originalFunction, args);
            cache.set(key, entry);
            entry.subscribe = options.subscribe;
        }
        var value = entry.recompute();
        // Move this entry to the front of the least-recently used queue,
        // since we just finished computing its value.
        cache.set(key, entry);
        caches.add(cache);
        // Clean up any excess entries in the cache, but only if there is no
        // active parent entry, meaning we're not in the middle of a larger
        // computation that might be flummoxed by the cleaning.
        if (!parentEntrySlot.hasValue()) {
            caches.forEach(function (cache) { return cache.clean(); });
            caches.clear();
        }
        return value;
    }
    function lookup() {
        var key = makeCacheKey.apply(null, arguments);
        if (key !== void 0) {
            return cache.get(key);
        }
    }
    optimistic.dirty = function () {
        var entry = lookup.apply(null, arguments);
        if (entry) {
            entry.setDirty();
        }
    };
    optimistic.peek = function () {
        var entry = lookup.apply(null, arguments);
        if (entry) {
            return entry.peek();
        }
    };
    return optimistic;
}




/***/ }),

/***/ "../node_modules/symbol-observable/es/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/symbol-observable/es/index.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, module.loaded, module.id, module, __webpack_require__.hmd, __webpack_exports__, __webpack_require__.r, __webpack_require__.g, __webpack_require__.d, __webpack_require__.* */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "../node_modules/symbol-observable/es/ponyfill.js");
/* module decorator */ module = __webpack_require__.hmd(module);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof __webpack_require__.g !== 'undefined') {
  root = __webpack_require__.g;
} else if (true) {
  root = module;
} else {}

var result = (0,_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__.default)(root);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (result);


/***/ }),

/***/ "../node_modules/symbol-observable/es/ponyfill.js":
/*!********************************************************!*\
  !*** ../node_modules/symbol-observable/es/ponyfill.js ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ symbolObservablePonyfill
/* harmony export */ });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "../node_modules/ts-invariant/lib/invariant.esm.js":
/*!*********************************************************!*\
  !*** ../node_modules/ts-invariant/lib/invariant.esm.js ***!
  \*********************************************************/
/*! namespace exports */
/*! export InvariantError [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export invariant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export process [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "InvariantError": () => /* binding */ InvariantError,
/* harmony export */   "invariant": () => /* binding */ invariant,
/* harmony export */   "process": () => /* binding */ processStub
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");


var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf, setPrototypeOf = _a === void 0 ? function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
} : _a;
var InvariantError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvariantError, _super);
    function InvariantError(message) {
        if (message === void 0) { message = genericMessage; }
        var _this = _super.call(this, typeof message === "number"
            ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)"
            : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError.prototype);
        return _this;
    }
    return InvariantError;
}(Error));
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
function wrapConsoleMethod(method) {
    return function () {
        return console[method].apply(console, arguments);
    };
}
(function (invariant) {
    invariant.warn = wrapConsoleMethod("warn");
    invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
// Code that uses ts-invariant with rollup-plugin-invariant may want to
// import this process stub to avoid errors evaluating process.env.NODE_ENV.
// However, because most ESM-to-CJS compilers will rewrite the process import
// as tsInvariant.process, which prevents proper replacement by minifiers, we
// also attempt to define the stub globally when it is not already defined.
var processStub = { env: {} };
if (typeof process === "object") {
    processStub = process;
}
else
    try {
        // Using Function to evaluate this assignment in global scope also escapes
        // the strict mode of the current module, thereby allowing the assignment.
        // Inspired by https://github.com/facebook/regenerator/pull/369.
        Function("stub", "process = stub")(processStub);
    }
    catch (atLeastWeTried) {
        // The assignment can fail if a Content Security Policy heavy-handedly
        // forbids Function usage. In those environments, developers should take
        // extra care to replace process.env.NODE_ENV in their production builds,
        // or define an appropriate global.process polyfill.
    }
var invariant$1 = invariant;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invariant$1);



/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! namespace exports */
/*! export __assign [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __asyncDelegator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __asyncGenerator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __asyncValues [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __await [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __awaiter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __classPrivateFieldGet [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __classPrivateFieldSet [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __createBinding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __decorate [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __exportStar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __extends [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __generator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __importDefault [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __importStar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __makeTemplateObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __metadata [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __param [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __read [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __rest [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __spread [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __spreadArrays [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __values [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => /* binding */ __extends,
/* harmony export */   "__assign": () => /* binding */ __assign,
/* harmony export */   "__rest": () => /* binding */ __rest,
/* harmony export */   "__decorate": () => /* binding */ __decorate,
/* harmony export */   "__param": () => /* binding */ __param,
/* harmony export */   "__metadata": () => /* binding */ __metadata,
/* harmony export */   "__awaiter": () => /* binding */ __awaiter,
/* harmony export */   "__generator": () => /* binding */ __generator,
/* harmony export */   "__createBinding": () => /* binding */ __createBinding,
/* harmony export */   "__exportStar": () => /* binding */ __exportStar,
/* harmony export */   "__values": () => /* binding */ __values,
/* harmony export */   "__read": () => /* binding */ __read,
/* harmony export */   "__spread": () => /* binding */ __spread,
/* harmony export */   "__spreadArrays": () => /* binding */ __spreadArrays,
/* harmony export */   "__await": () => /* binding */ __await,
/* harmony export */   "__asyncGenerator": () => /* binding */ __asyncGenerator,
/* harmony export */   "__asyncDelegator": () => /* binding */ __asyncDelegator,
/* harmony export */   "__asyncValues": () => /* binding */ __asyncValues,
/* harmony export */   "__makeTemplateObject": () => /* binding */ __makeTemplateObject,
/* harmony export */   "__importStar": () => /* binding */ __importStar,
/* harmony export */   "__importDefault": () => /* binding */ __importDefault,
/* harmony export */   "__classPrivateFieldGet": () => /* binding */ __classPrivateFieldGet,
/* harmony export */   "__classPrivateFieldSet": () => /* binding */ __classPrivateFieldSet
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../node_modules/zen-observable/index.js":
/*!***********************************************!*\
  !*** ../node_modules/zen-observable/index.js ***!
  \***********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/Observable.js */ "../node_modules/zen-observable/lib/Observable.js").Observable;


/***/ }),

/***/ "../node_modules/zen-observable/lib/Observable.js":
/*!********************************************************!*\
  !*** ../node_modules/zen-observable/lib/Observable.js ***!
  \********************************************************/
/*! flagged exports */
/*! export Observable [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// === Symbol Support ===
var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable
    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver =
/*#__PURE__*/
function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: "next",
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: "error",
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: "complete",
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable =
/*#__PURE__*/
function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: "from",
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _item = _step.value;
                  observer.next(_item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}

/***/ }),

/***/ "./common/utility.js":
/*!***************************!*\
  !*** ./common/utility.js ***!
  \***************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Utility
/* harmony export */ });
class Utility {
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
}


/***/ }),

/***/ "./controllers/user-data-manager.js":
/*!******************************************!*\
  !*** ./controllers/user-data-manager.js ***!
  \******************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ UserDataManager
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordlist_storage_worditem_indexeddb_driver_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordlist/storage/worditem-indexeddb-driver.js */ "./storage/worditem-indexeddb-driver.js");
/* harmony import */ var _wordlist_storage_worditem_remotedb_driver_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordlist/storage/worditem-remotedb-driver.js */ "./storage/worditem-remotedb-driver.js");
/* harmony import */ var _wordlist_storage_indexed_db_adapter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordlist/storage/indexed-db-adapter.js */ "./storage/indexed-db-adapter.js");
/* harmony import */ var _wordlist_storage_remote_db_adapter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordlist/storage/remote-db-adapter.js */ "./storage/remote-db-adapter.js");
/* harmony import */ var _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @apollo/client/core */ "../node_modules/@apollo/client/core/index.js");







class UserDataManager {

  /**
   * Creates with auth argument, subscribe to WordItem and WorList events, inits blocked property and request queue
   * @param {AuthModule} auth - auth object with userId and accessToken properties
   * @param {String} events - events object of the WordlistController, passed in AppController
   */
  constructor (auth, events) {
    this.auth = auth
    this.subscriptions = []
    if (events) {
      this.subscriptions.push(events.WORDITEM_UPDATED.sub(this.update.bind(this)))
      this.subscriptions.push(events.WORDITEM_DELETED.sub(this.delete.bind(this)))
      this.subscriptions.push(events.WORDLIST_DELETED.sub(this.deleteMany.bind(this)))
    }
    this.blocked = false
    this.requestsQueue = []

    // Schema is needed only for Apollo DevTools
    const typeDefs = _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__.gql`
      extend type Query {
        lang(langCode: Language, userID: String): WordListLocations
      }
      
      enum Language {
        LAT
        GRC
      }
      
      enum DataLocation {
        LOCAL
        REMOTE
      }
      
      type WordListLocations {
        local: [WordItem]
        remote: [WordItem]
      }
      
      type WordList {
        location: DataLocations
        wordItems: [WordItem]
      }
      
      type WordItem {
        name: String
      }
    `
    const resolvers = {}

    const cache = new _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__.InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            lang: {
              async read(_, { variables }) {
                return new Promise((resolve, reject) => {
                  console.info('Variables are:', variables)
                  let results
                  try {
                    // TODO: Pass user ID in a GraphQL request, or, better yet, use an authentication along the path
                    /*const userID = 'dev|mockUserId'
                    let dbDriver = new UserDataManager.LOCAL_DRIVER_CLASSES.WordItem(userID)
                    const localAdapter = new IndexedDBAdapter(dbDriver)
                    results = localAdapter.query({languageCode: "lat"})*/


                  } catch (err) {
                    alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Cannot retrieve data from a local adapter:', err)
                    // TODO: Return an error message
                    resolve([])
                  }
                  // console.info('Local results:', results)
                  resolve({
                    local: [
                      {
                        propOne: 'one',
                        propTwo: 'two'
                      },
                      {
                        propOne: 'three',
                        propTwo: 'four'
                      }
                    ],
                    remote: [
                      {
                        propOne: 'A',
                        propTwo: 'B'
                      },
                      {
                        propOne: 'C',
                        propTwo: 'D'
                      }
                    ]
                  })
                })
              }
            }
          }
        }
      }
    })

    this.gql = new _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__.ApolloClient({
      cache,
      link: new _apollo_client_core__WEBPACK_IMPORTED_MODULE_5__.HttpLink(),
      typeDefs,
      resolvers
    })
  }

  /**
   * Clear this instance
   * TODO we should make the UserDataManager a singleton so that it can
   * fully accomodate switching users gracefully
   */
  clear() {
    if (this.blocked) {
      // TODO we should wait on the request queue completion
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().warn("Alpheios warn: destroying user data manager with requests pending. Words may not all be deleted.")
    }
    for (let unsub of this.subscriptions) {
      unsub()
    }
    this.subscriptions = []
  }

  /**
   * Initializes IndexedDBAdapter with appropriate local dbDriver (WordItemIndexedDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {IndexedDBAdapter}
   */
  _localStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.LOCAL_DRIVER_CLASSES[dataType](this.auth.userId)
    return new _wordlist_storage_indexed_db_adapter_js__WEBPACK_IMPORTED_MODULE_3__.default(dbDriver)
  }

  /**
   * Initializes RemoteDBAdapter with appropriate remote dbDriver (WordItemRemoteDbDriver)
   * @param {String} dataType - data type for choosing a proper dbDriver (WordItem)
   * @return {RemoteDBAdapter}
   */
  _remoteStorageAdapter(dataType) {
    let dbDriver = new UserDataManager.REMOTE_DRIVER_CLASSES[dataType](this.auth)
    return new _wordlist_storage_remote_db_adapter_js__WEBPACK_IMPORTED_MODULE_4__.default(dbDriver)
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
    alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error(`Alpheios error: user data adapter is not available - ${adapter.constructor.name}`)
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
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Alpheios error: unexpected error updating user data.', error)
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
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Alpheios error: unexpected error deleting user data.', error.message)
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

        this.blocked = false
        this.checkRequestQueue()
      }

      return deletedLocal && deletedRemote
    } catch (error) {
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Alpheios error: unexpected error deleting user data.', error.message)
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
      console.info('UDM: query')
      params.type = params.type||'full'
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
          for(let remoteItem of remoteItems) {
            let wodrItem = localAdapter.dbDriver.createFromRemoteData(remoteItem)
            await localAdapter.checkAndUpdate(wodrItem, data.params.segment, [remoteItem])
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
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Alpheios error: unexpected error querying user data.', error.message)
    }
  }

  async deleteAbsentInRemote (localAdapter, remoteItems, languageCode) {
    let localItems = await localAdapter.query({ languageCode })
    for (let localItem of localItems) {
      let checkID  = localAdapter.dbDriver.makeIDCompareWithRemote(localItem)
      if (!remoteItems.find(remoteItem => remoteItem.ID === checkID)) {
        this.delete({ dataObj: localItem})
      }
    }
  }

  /**
   * Method prints errors from the errors property of the given adapter
   */
  printErrors (adapter) {
    if (adapter.errors && adapter.errors.length > 0) {
      adapter.errors.forEach(error => alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error(`Alpheios error: user data unexpected error - ${error}`))
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
  WordItem: _wordlist_storage_worditem_indexeddb_driver_js__WEBPACK_IMPORTED_MODULE_1__.default
}
UserDataManager.REMOTE_DRIVER_CLASSES = {
  WordItem: _wordlist_storage_worditem_remotedb_driver_js__WEBPACK_IMPORTED_MODULE_2__.default
}


/***/ }),

/***/ "./controllers/wordlist-controller.js":
/*!********************************************!*\
  !*** ./controllers/wordlist-controller.js ***!
  \********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordlistController
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordlist/common/utility.js */ "./common/utility.js");
/* harmony import */ var _apollo_client_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @apollo/client/core */ "../node_modules/@apollo/client/core/index.js");




class WordlistController {
  /**
   * @constructor
   * @param {String[]} availableLangs language codes
   * @param {PSEvent[]} events events that the controller can subscribe to
   */
  constructor (availableLangs, events) {
    console.info('WLC constructor')
    this.wordLists = {}
    this.availableLangs = availableLangs
    events.TEXT_QUOTE_SELECTOR_RECEIVED.sub(this.onTextQuoteSelectorReceived.bind(this))
    events.HOMONYM_READY.sub(this.onHomonymReady.bind(this))
    events.SHORT_DEFS_READY.sub(this.onDefinitionsReady.bind(this))
    events.FULL_DEFS_READY.sub(this.onDefinitionsReady.bind(this))
    events.LEMMA_TRANSL_READY.sub(this.onLemmaTranslationsReady.bind(this))

    events.WORDLIST_UPDATE_HOMONYM_READY.sub(this.onHomonymReadyForWordlistUpdate.bind(this))
    events.WORDLIST_UPDATE_LEMMA_TRANSL_READY.sub(this.onLemmaTranslationsReadyForWordlistUpdate.bind(this))
    events.WORDLIST_UPDATE_SHORT_DEFS_READY.sub(this.onDefinitionsReadyForWordlistUpdate.bind(this))
  }

  /**
   * Asynchronously initialize the word lists managed by this controller
   * @param {UserDataManager} dataManager a user data manager to retrieve initial wordlist data from
   * Emits a WORDLIST_UPDATED event when the wordlists are available
   */
  async initLists (dataManager) {
    console.info('WLC: initLists')
    if (! dataManager) {
      // if we don't have a data manager we don't need to preserve any existing data, just clear it out
      this.wordLists = {} // clear out any existing lists
    } else {
      let results
      try {
        results = await dataManager.gql.query({
          query: _apollo_client_core__WEBPACK_IMPORTED_MODULE_2__.gql`
            query WordItemsQUery($langCode: Language, $userID: String) {
              lang(langCode: $langCode, userID: $userID)
            }
          `,
          variables: {
            userID: 'dev|mockUserId',
            langCode: 'LAT'
          }
        })
      } catch (err) {
        alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('WordList GQL query failed:', err)
      }

      console.info('Test results are:', results)
      for (let languageCode of this.availableLangs) {
        let cachedList = this.wordLists[languageCode]
        delete this.wordLists[languageCode]
        let wordItems = await dataManager.query({dataType: 'WordItem', params: {languageCode: languageCode}}, { syncDelete: true })
        if (wordItems.length > 0) {
          this.wordLists[languageCode] = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordList(languageCode, wordItems)
          WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
        }
        if (cachedList) {
          for (let cachedItem of cachedList.values) {
            try {
              // replay the word selection events for the cached list
              let cachedTqs = cachedItem.context.map(c => new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.TextQuoteSelector(c.languageCode,c.normalizedText,c.prefix,c.suffix,c.source))
              for (let tq of cachedTqs) {
                this.onTextQuoteSelectorReceived(tq)
              }
              if (cachedItem.homonym) {
                this.onHomonymReady(cachedItem.homonym)
              }
            } catch (e) {
              alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error("Alpheios error: unexpected error replaying cached wordlist item",e)
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
      let wordList = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordList(languageCode,[])
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
        alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error('Alpheios error: unexpected error updating user wordlist: trying to delete an absent element')
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
      if (create) {
        wordItem.createdDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
      }
    }
    if (!wordItem) {
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error(`Alpheios error: wordlist item not found: ${languageCode} ${targetWord}`)
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
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.languageID), data.targetWord, true)
    wordItem.homonym = data
    wordItem.currentSession = true
    wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
    wordItem.frequency = wordItem.frequency ? wordItem.frequency + 1 : 1
    WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'shortHomonym'}})
    // emit a wordlist updated event too in case the wordlist was updated
    WordlistController.evt.WORDLIST_UPDATED.pub(this.wordLists)
  }

  /**
   * Responds to a WORDLIST_UPDATE_HOMONYM_READY event by updating a wordlist item for a retrieved Homonym
   * @param {Homonym} data
   * Emits WORDITEM_UPDATED and WORDLIST_UPDATED events
   */
  onHomonymReadyForWordlistUpdate (data) {
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.languageID), data.targetWord, true)
    wordItem.homonym = data
    // we don't update the currentSession, updatedDT or frequency fields
    // with this event, as it's a lookup purely to populate the definition in the item for download
    WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
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
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.homonym.languageID),data.homonym.targetWord)
    if (wordItem) {
      wordItem.currentSession = true
      wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
      wordItem.homonym = data.homonym
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      // TODO error handling
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error("Alpheios error: unexpected error updating user word list: request to add definitions to non-existent item.")
    }
  }

  /**
  * Responds to a WORDLIST_UPDATE_DEFINITIONS_READY event by updating a wordlist item for retrieved Definitions
  * @param {Object} data {requestType: 'fullDefs',homonym: {Homonym}}
  * Emits a WORDITEM_UPDATED event
  */
  onDefinitionsReadyForWordlistUpdate (data) {
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.homonym.languageID),data.homonym.targetWord)
    if (wordItem) {
      wordItem.homonym = data.homonym
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      // TODO error handling
      console.error("Alpheios error: unexpected error updating user word list: request to add definitions to non-existent item.")
    }
  }

  /**
  * Responds to a LEMMA_TRANSLATIONS_READY event by updating a wordlist item for retrieved translations
  * (because lemma translations could come much later we need to resave homonym with translations data to database)
  * @param {Homonym} data
  * Emits a WORDITEM_UPDATED event
  */
  onLemmaTranslationsReady (data) {
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.languageID), data.targetWord)
    if (wordItem) {
      wordItem.currentSession = true
      wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
      wordItem.homonym = data
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error("Alpheios error: unexpected error updating user word list: request to add translations to non-existent item")
    }
  }

  /**
  * Responds to a WORDLIST_UPDATE_LEMMA_TRANSL_READY event by updating a wordlist item for retrieved translations
  * (because lemma translations could come much later we need to resave homonym with translations data to database)
  * @param {Homonym} data
  * Emits a WORDITEM_UPDATED event
  */
 onLemmaTranslationsReadyForWordlistUpdate (data) {
    let wordItem = this.getWordListItem(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageCodeFromId(data.languageID), data.targetWord)
    if (wordItem) {
      wordItem.homonym = data
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'fullHomonym'}})
    } else {
      console.error("Alpheios error: unexpected error updating user word list: request to add translations to non-existent item")
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
      wordItem.currentSession = true
      wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
      wordItem.addContext([data])
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'context'}})
      // emit a wordlist updated event too in case the wordlist was updated
      WordlistController.evt.WORDLIST_UPDATED.pub([this.getWordList(wordItem.languageCode)])
    } else {
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error("Alpheios error: unexpected error updating user word list: unable to create or retrieve worditem")
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
      wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
      WordlistController.evt.WORDITEM_UPDATED.pub({dataObj: wordItem, params: {segment: 'common'}})
    } else {
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().error("Alpheios error: unexpected error updating user word list: request to set important flag on non-existent item")
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
      wordItem.updatedDT = _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
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
  WORDLIST_UPDATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('Wordlist updated', WordlistController),

  /**
   * Published when a WordList was created
   * Data: {
   *  {wordLists} an Array with WordLists object
   * }
   */
  WORDLIST_CREATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('Wordlist created', WordlistController),


  /**
   * Published when a WordList was deleted
   * Data: {
   *  dataType: constructor name for the contained word list items
   *  params: parameters to identify the items to be deleted
   * }
   */
  WORDLIST_DELETED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('Wordlist deleted', WordlistController),

  /**
   * Published when a WordItem was selected.
   * Data: {
   *  dataObj: the selected WordItem
   * }
   */
  WORDITEM_SELECTED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('WordItem selected', WordlistController),

  /**
   * Published when a WordItem was updated
   * Data: {
   *   dataObj: the selected WordItem
   *   params: additional update parameters
   * }
   */
  WORDITEM_UPDATED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('WordItem updated', WordlistController),

  /**
   * Published when a WordItem was deleted
   * Data: {
   *   dataObj: the deleted WordItem
   * }
   */
  WORDITEM_DELETED: new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.PsEvent('WordItem deleted', WordlistController)

}


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! namespace exports */
/*! export UserDataManager [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! export WordlistController [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WordlistController": () => /* reexport safe */ _wordlist_controllers_wordlist_controller_js__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "UserDataManager": () => /* reexport safe */ _wordlist_controllers_user_data_manager_js__WEBPACK_IMPORTED_MODULE_1__.default
/* harmony export */ });
/* harmony import */ var _wordlist_controllers_wordlist_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordlist/controllers/wordlist-controller.js */ "./controllers/wordlist-controller.js");
/* harmony import */ var _wordlist_controllers_user_data_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordlist/controllers/user-data-manager.js */ "./controllers/user-data-manager.js");






/***/ }),

/***/ "./storage/indexed-db-adapter.js":
/*!***************************************!*\
  !*** ./storage/indexed-db-adapter.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ IndexedDBAdapter
/* harmony export */ });
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
          wordItem.context.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordItem.readContext([contextItem])[0])
        }
      }
    }

    if (!segment) {
      segment = this.dbDriver.segmentsSync
    }
    await this.update(wordItem, { segment: 'common' })

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
      alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Logger.getInstance().warn("Alpheios warn: your browser doesn't support IndexedDB. Wordlists will not be available.");
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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ IndexedDBLoadProcess
/* harmony export */ });
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
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordItem(jsonObj)
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
    wordItem.context = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordItem.readContext(jsonObjs)
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
      wordItem.homonym = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.WordItem.readHomonym(jsonObjs[0])
    } else {
      let languageID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.LanguageModelFactory.getLanguageIdFromCode(jsonObjs[0].languageCode)
      let lexemes = []

      if (jsonHomonym.lemmasList) {
        let lexemesForms = jsonHomonym.lemmasList.split(', ')
        for (let lexForm of lexemesForms) {
          lexemes.push(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lexeme(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lemma(lexForm, languageID), []))
        }
      } else {
        lexemes = [new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lexeme(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Lemma(jsonObjs[0].targetWord, languageID), [])]
      }
      wordItem.homonym = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Homonym(lexemes, jsonHomonym.targetWord)
    }
    return wordItem
  }
}


/***/ }),

/***/ "./storage/indexeddbDriver/indexed-db-object-stores-structure.js":
/*!***********************************************************************!*\
  !*** ./storage/indexeddbDriver/indexed-db-object-stores-structure.js ***!
  \***********************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ IndexedDBObjectStoresStructure
/* harmony export */ });
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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RemoteDBAdapter
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../../../node_modules/axios/index.js");
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

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, content, this.dbDriver.requestsParams)

      let updated = this.dbDriver.storageMap.post.checkResult(result)

      return updated
    } catch (error) {
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

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default().put(url, content, this.dbDriver.requestsParams)
      let updated = this.dbDriver.storageMap.put.checkResult(result)
      return updated
    } catch (error) {
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
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default().delete(url, this.dbDriver.requestsParams)
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

      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default().delete(url, this.dbDriver.requestsParams)
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
      let result = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url, this.dbDriver.requestsParams)
      let final = this.dbDriver.storageMap.get.checkResult(result)

      return final
    } catch (error) {
      let errorFinal = this.dbDriver.storageMap.get.checkErrorResult(error)
      if (!errorFinal && error) {
        if (error) {
          this.errors.push(error)
        }
      }
      if (error.message === 'Request failed with status code 401') {
        return []
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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordItemIndexedDbDriver
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordlist_storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordlist/storage/indexeddbDriver/indexed-db-object-stores-structure */ "./storage/indexeddbDriver/indexed-db-object-stores-structure.js");
/* harmony import */ var _wordlist_storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordlist/storage/indexeddbDriver/indexed-db-load-process */ "./storage/indexeddbDriver/indexed-db-load-process.js");
/* harmony import */ var _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordlist/common/utility.js */ "./common/utility.js");






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
          structure: _wordlist_storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__.default.WordListsCommon
        },
        load: _wordlist_storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__.default.loadBaseObject,
        serialize: this._serializeCommon.bind(this),
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      context: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsContext',
          structure: _wordlist_storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__.default.WordListsContext
        },
        serialize: this._serializeContext.bind(this),
        load: _wordlist_storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__.default.loadContext,
        delete: this._segmentSelectQueryByWordItemID.bind(this),
        select: this._segmentSelectQueryByWordItemID.bind(this)
      },
      shortHomonym: {
        type: 'segment',
        sync: true,
        objectStoreData: {
          name: 'WordListsHomonym',
          structure: _wordlist_storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__.default.WordListsHomonym
        },
        serialize: this._serializeHomonym.bind(this),
        load: _wordlist_storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__.default.loadHomonym,
        delete: this._segmentSelectQueryByID.bind(this),
        select: this._segmentSelectQueryByID.bind(this)
      },
      fullHomonym: {
        type: 'segment',
        objectStoreData: {
          name: 'WordListsFullHomonym',
          structure: _wordlist_storage_indexeddbDriver_indexed_db_object_stores_structure__WEBPACK_IMPORTED_MODULE_1__.default.WordListsFullHomonym
        },
        serialize: this._serializeHomonymWithFullDefs.bind(this),
        load: _wordlist_storage_indexeddbDriver_indexed_db_load_process__WEBPACK_IMPORTED_MODULE_2__.default.loadHomonym,
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
  loadSegment(segment, jsonObj, wordItem) {
    if (this.storageMap[segment].load) {
      return this.storageMap[segment].load(jsonObj, wordItem)
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
  segmentSelectQuery(segment, wordItem) {
    if (this.storageMap[segment].select) {
      return this.storageMap[segment].select(segment, wordItem)
    }
  }

  /**
   * Creates query for selecting data from the segment by wordItem
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByWordItemID (segment, wordItem) {
    return this._formatQuery(segment, this._selectByWordItemID(wordItem))
  }

  /**
   * Creates query for selecting data from the segment by ID
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  _segmentSelectQueryByID (segment, wordItem) {
    return this._formatQuery(segment, this._selectByID(wordItem))
  }

  /**
   * Creates query for deleting one item from the segment
   * @param {String} segment - segment name
   * @param {WordItem} worditem - the worditem object
   * @return {Object} - data for creating IndexedDB Request
   */
  segmentDeleteQuery (segment, wordItem) {
    if (this.storageMap[segment].delete) {
      return this.storageMap[segment].delete(segment, wordItem)
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
  _serializeCommon (wordItem) {
    const res = [{
      ID: this._makeStorageID(wordItem),
      listID: this.userId + '-' + wordItem.languageCode,
      userID: this.userId,
      languageCode: wordItem.languageCode,
      targetWord: wordItem.targetWord,
      important: wordItem.important,
      createdDT: wordItem.createdDT ? wordItem.createdDT : _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_3__.default.currentDate,
      updatedDT: wordItem.updatedDT,
      frequency: wordItem.frequency
    }]
    return res
  }

  /**
   * Creates jsonObj for saving to IndexedDB for context segment
   * @param {WordItem} worditem - the worditem object
   * @return {Object[]}
   */
  _serializeContext (wordItem) {
    let result = []
    let index = 0
    let wordItemId = this._makeStorageID(wordItem)
    for (let tq of wordItem.context) {
      index++
      let resultItem = {
        ID: wordItemId + '-' + index,
        listID: this.userId + '-' + wordItem.languageCode,
        userID: this.userId,
        languageCode: wordItem.languageCode,
        targetWord: wordItem.targetWord,
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
  _serializeHomonym (wordItem, addMeaning = false) {
    let resultHomonym = wordItem.homonym && (wordItem.homonym instanceof alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.Homonym) ? wordItem.homonym.convertToJSONObject(addMeaning) : null
    if (resultHomonym) {
      return [{
        ID: this._makeStorageID(wordItem),
        listID: this.userId + '-' + wordItem.languageCode,
        userID: this.userId,
        languageCode: wordItem.languageCode,
        targetWord: wordItem.targetWord,
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
_serializeHomonymWithFullDefs (wordItem) {
  return this._serializeHomonym(wordItem, true)
}

  /**
   * Creates ID for wordItem for saving to IndexedDB
   * @param {WordItem} worditem - the worditem object
   * @return {String}
   */
  _makeStorageID(wordItem) {
    return this.userId + '-' + wordItem.languageCode + '-' + wordItem.targetWord
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
  makeIDCompareWithRemote (wordItem) {
    return wordItem.languageCode + '-' + wordItem.targetWord
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
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ WordItemRemoteDbDriver
/* harmony export */ });
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordlist/common/utility.js */ "./common/utility.js");



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
        serialize: this._serializePut.bind(this),
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
    if (! currentItem.homonym) {
        let homonym = this._serializeHomonym(newItem)
        if (homonym) {
          currentItem.homonym = homonym
        }
    }
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
        return alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__.TextQuoteSelector.readObject(tqCurrent).isEqual(contextItem)
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
      createdDT: wordItem.createdDT ? wordItem.createdDT : _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate,
      updatedDT: wordItem.updatedDT,
      frequency: wordItem.frequency
    }

    let homonym = this._serializeHomonym(wordItem)

    if (homonym !== null) {
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

  _serializePut (wordItem) {
    let result = this._serialize(wordItem)
    result.updatedDT = wordItem.updatedDT
    result.frequency = wordItem.frequency
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
      createdDT: _wordlist_common_utility_js__WEBPACK_IMPORTED_MODULE_1__.default.currentDate
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
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_data_models__;

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	return __webpack_require__("./index.js");
/******/ })()
;
});
//# sourceMappingURL=alpheios-wordlist.js.map