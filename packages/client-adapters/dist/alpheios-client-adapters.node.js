(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("alpheios-data-models"));
	else if(typeof define === 'function' && define.amd)
		define(["alpheios-data-models"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("alpheios-data-models")) : factory(root["alpheios-data-models"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE_alpheios_data_models__) {
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

/***/ "../node_modules/axios/lib/adapters/http.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/adapters/http.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "../node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = new Buffer(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = new Buffer(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttps ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};


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
    if (true &&
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
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/http.js");
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

/***/ "../node_modules/axios/package.json":
/*!******************************************!*\
  !*** ../node_modules/axios/package.json ***!
  \******************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, bundlesize, dependencies, deprecated, description, devDependencies, homepage, keywords, license, main, name, repository, scripts, typings, version, default */
/***/ (function(module) {

module.exports = {"_from":"axios@*","_id":"axios@0.18.0","_inBundle":false,"_integrity":"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=","_location":"/axios","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"axios@*","name":"axios","escapedName":"axios","rawSpec":"*","saveSpec":null,"fetchSpec":"*"},"_requiredBy":["#DEV:/"],"_resolved":"http://registry.npmjs.org/axios/-/axios-0.18.0.tgz","_shasum":"32d53e4851efdc0a11993b6cd000789d70c05102","_spec":"axios@*","_where":"C:\\_Irina\\_clients\\_Alpheios Project\\git\\client-adapters","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"bundlesize":"^0.5.7","coveralls":"^2.11.9","es6-promise":"^4.0.5","grunt":"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","sinon":"^1.17.4","typescript":"^2.0.3","url-search-params":"^0.6.1","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"homepage":"https://github.com/axios/axios","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test && bundlesize","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","version":"0.18.0"};

/***/ }),

/***/ "../node_modules/follow-redirects/index.js":
/*!*************************************************!*\
  !*** ../node_modules/follow-redirects/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var assert = __webpack_require__(/*! assert */ "assert");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var debug = __webpack_require__(/*! debug */ "../node_modules/follow-redirects/node_modules/debug/src/index.js")("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data and end
  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;
    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "../node_modules/follow-redirects/node_modules/debug/src/browser.js":
/*!**************************************************************************!*\
  !*** ../node_modules/follow-redirects/node_modules/debug/src/browser.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/follow-redirects/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "../node_modules/follow-redirects/node_modules/debug/src/debug.js":
/*!************************************************************************!*\
  !*** ../node_modules/follow-redirects/node_modules/debug/src/debug.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "../node_modules/follow-redirects/node_modules/debug/src/index.js":
/*!************************************************************************!*\
  !*** ../node_modules/follow-redirects/node_modules/debug/src/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "../node_modules/follow-redirects/node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "../node_modules/follow-redirects/node_modules/debug/src/node.js");
}


/***/ }),

/***/ "../node_modules/follow-redirects/node_modules/debug/src/node.js":
/*!***********************************************************************!*\
  !*** ../node_modules/follow-redirects/node_modules/debug/src/node.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/follow-redirects/node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(/*! supports-color */ "../node_modules/supports-color/index.js");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


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

/***/ "../node_modules/ms/index.js":
/*!***********************************!*\
  !*** ../node_modules/ms/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "../node_modules/supports-color/index.js":
/*!***********************************************!*\
  !*** ../node_modules/supports-color/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "../node_modules/xmltojson/lib/xmlToJSON.js":
/*!**************************************************!*\
  !*** ../node_modules/xmltojson/lib/xmlToJSON.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/* Copyright 2015 William Summers, MetaTribal LLC
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

if (true && module !== null && module.exports) module.exports = xmlToJSON;
else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return xmlToJSON }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./alpheiostb/adapter.js":
/*!*******************************!*\
  !*** ./alpheiostb/adapter.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/base-adapter */ "./base-adapter.js");
/* harmony import */ var _alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/alpheiostb/config.json */ "./alpheiostb/config.json");
var _alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/alpheiostb/config.json */ "./alpheiostb/config.json", 1);
/* harmony import */ var _config_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/config-data */ "./config-data.js");
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xmltojson */ "../node_modules/xmltojson/lib/xmlToJSON.js");
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xmltojson__WEBPACK_IMPORTED_MODULE_4__);







class AlpheiosTreebankAdapter extends _base_adapter__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (config = {}) {
    super()
    this.config = new _config_data__WEBPACK_IMPORTED_MODULE_3__["default"](config, _alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__)
    this.models = { 'lat': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LatinLanguageModel"], 'grc': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["GreekLanguageModel"] }
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(word)

    if (url) {
      let xmlString = await this.fetch(url, 'xml')
      if (xmlString) {
        let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
        console.log(`LangCode ${langCode}`)
        let jsonObj = xmltojson__WEBPACK_IMPORTED_MODULE_4___default.a.parseString(xmlString)
        jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } }

        let homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text)
        return homonym
      } else {
      // No data found for this word
        return undefined
      }
    }
  }

  prepareRequestUrl (word) {
    let [text, fragment] = word.split(/#/)
    let url

    if (this.config.texts.includes(text)) {
      url = this.config.url.replace('r_TEXT', text)
      url = url.replace('r_WORD', fragment).replace('r_CLIENT', this.config.clientId)
    }
    return url
  }

  transform (jsonObj, targetWord) {
    'use strict'
    let providerUri = this.config.providerUri
    let providerRights = this.config.providerRights
    let provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](providerUri, providerRights)
    let hdwd = jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]
    let lemmaText = hdwd._text
    // the Alpheios v1 treebank data kept trailing digits on the lemmas
    // these won't match morphology service lemmas which have them stripped
    lemmaText = lemmaText.replace(/\d+$/, '')
    let model = this.models[hdwd._attr.lang._value]
    let lemma = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lemma"](lemmaText, model.languageCode)
    let lexmodel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"](lemma, [])
    let inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Inflection"](lemmaText, model.languageID, null, null, null)
    let infl = jsonObj.words[0].word[0].entry[0].infl[0]
    inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.fullForm, targetWord, model.languageID))
    let features = [
      ['pofs', 'part', true],
      ['case', 'grmCase', false],
      ['num', 'number', false],
      ['gend', 'gender', false],
      ['voice', 'voice', false],
      ['mood', 'mood', false],
      ['pers', 'person', false],
      ['comp', 'comparison', false]
    ]
    for (let feature of features) {
      let localName = feature[0]
      let featureType = feature[1]
      let addToLemma = feature[2]
      if (infl[localName]) {
        let obj = model.typeFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types[featureType]).createFeatures(infl[localName][0]._text, 1)
        inflection.addFeature(obj)
        if (addToLemma) {
          lemma.addFeature(obj)
        }
      }
    }
    lexmodel.inflections = [ inflection ]
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"]([alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, lexmodel)], targetWord)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AlpheiosTreebankAdapter);


/***/ }),

/***/ "./alpheiostb/config.json":
/*!********************************!*\
  !*** ./alpheiostb/config.json ***!
  \********************************/
/*! exports provided: texts, url, providerUri, providerRights, allowUnknownValues, default */
/***/ (function(module) {

module.exports = {"texts":["1999.01.0021","1999.01.0135","1999.02.0066","phi0959.phi006.alpheios-text-lat1","tlg0011.tlg003.alpheios-text-grc1","tlg0012.tlg001.alpheios-text-grc1","tlg0012.tlg002.alpheios-text-grc1","tlg0020.tlg001.alpheios-text-grc1","tlg0020.tlg002.alpheios-text-grc1","tlg0020.tlg003.alpheios-text-grc1","tlg0085.tlg001.alpheios-text-grc1","tlg0085.tlg002.alpheios-text-grc1","tlg0085.tlg003.alpheios-text-grc1","tlg0085.tlg004.alpheios-text-grc1","tlg0085.tlg005.alpheios-text-grc1","tlg0085.tlg006.alpheios-text-grc1","tlg0085.tlg007.alpheios-text-grc1","tlg0086.tlg034.alpheios-text-ara2"],"url":"http://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq?f=r_TEXT&w=r_WORD&clientId=r_CLIENT","providerUri":"https://alpheios.net","providerRights":"The Alpheios Treebank data is licenced under the Creative Commons 3.0 Share-Alike license.","allowUnknownValues":true};

/***/ }),

/***/ "./base-adapter.js":
/*!*************************!*\
  !*** ./base-adapter.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


class BaseAdapter {
  async fetchWindow (url, type = 'json') {
    if (url) {
      try {
        console.info('****************inside fetchWindow 1', url)
        let response = await window.fetch(url)
        console.info('****************inside fetchWindow 2', response)
        if (type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        console.error(`Unable to get data from url ${url}`)
      }
    } else {
      console.error(`Unable to prepare parser request url`)
    }
  }

  async fetchAxios (url) {
    try {
      let res = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(encodeURI(url))
      return res.data
    } catch (error) {
      console.error(`Unable to prepare parser request url`, url, error.message)
    }
  }

  async fetch (url, type) {
    let res

    if (typeof window !== 'undefined') {
      res = await this.fetchWindow(url, type)
    } else {
      res = await this.fetchAxios(url)
    }

    return res
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BaseAdapter);


/***/ }),

/***/ "./client-adapters.js":
/*!****************************!*\
  !*** ./client-adapters.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tufts_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/tufts/adapter */ "./tufts/adapter.js");
/* harmony import */ var _translations_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/translations/adapter */ "./translations/adapter.js");



class ClientAdapters {
/*
   * it is used for getting data from morph adapter
   * @param {options} Object - object contains parametes:
   * options.type String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.languageID Symbol - languageID value for the word
   * options.word String - target word for what we will receive morph data
*/

  static async maAdapter (options) {
    let localMaAdapter = new _tufts_adapter__WEBPACK_IMPORTED_MODULE_0__["default"]()
    console.info('********************options', options)
    if (options.type === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.languageID, options.word)
      console.info('*******************maAdapter homonym', homonym)
      return homonym
    }
    return null
  }

  /*
   * it is used for getting data from translations adapter
   * @param {options} Object - object contains parametes:
   * options.type String - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   * options.lemmaList [Lemma] - languageID value for the word
   * options.inLang String - language code of the target word
   * options.browserLang - language for translations
*/
  static async lemmaTranslations (options) {
    let localLemmasAdapter = new _translations_adapter__WEBPACK_IMPORTED_MODULE_1__["default"]()

    if (options.type === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.lemmaList, options.inLang, options.browserLang)
      return true
    }
    return null
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ClientAdapters);


/***/ }),

/***/ "./config-data.js":
/*!************************!*\
  !*** ./config-data.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ConfigData {
  constructor (config, defaultConfig) {
    Object.keys(config).forEach(configKey => {
      this[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (this[configKey] === undefined) {
        this[configKey] = defaultConfig[configKey]
      }
    })
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ConfigData);


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: AlpheiosTuftsAdapter, AlpheiosTreebankAdapter, ClientAdapters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tufts_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/tufts/adapter */ "./tufts/adapter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlpheiosTuftsAdapter", function() { return _tufts_adapter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/alpheiostb/adapter */ "./alpheiostb/adapter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlpheiosTreebankAdapter", function() { return _alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _client_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/client-adapters */ "./client-adapters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientAdapters", function() { return _client_adapters__WEBPACK_IMPORTED_MODULE_2__["default"]; });









/***/ }),

/***/ "./translations/adapter.js":
/*!*********************************!*\
  !*** ./translations/adapter.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translations_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/translations/config.json */ "./translations/config.json");
var _translations_config_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/translations/config.json */ "./translations/config.json", 1);
/* harmony import */ var _translations_config_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/translations/config-data */ "./translations/config-data.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _base_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/base-adapter */ "./base-adapter.js");






class AlpheiosLemmaTranslationsAdapter extends _base_adapter__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor (config = {}) {
    super()
    this.config = new _translations_config_data__WEBPACK_IMPORTED_MODULE_1__["default"](config, _translations_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.mapLangUri = {}
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["ResourceProvider"](this.config.url, this.config.rights)
  }

  async getTranslationsList (lemmaList, inLang, browserLang) {
    let outLang = this.config.defineOutLang(browserLang)

    let input = this.prepareInput(lemmaList)
    let urlLang = this.getAvailableResLang(inLang, outLang)

    if (input && urlLang) {
      try {
        let translationsList = await this.fetch(urlLang + '?input=' + input)
        for (let lemma of lemmaList) {
          alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["Translation"].loadTranslations(lemma, outLang, translationsList, this.provider)
        }
      } catch (error) {
        console.error(`Some problems with translations from ${inLang} to ${outLang}`, error)
      }
    }
  }

  prepareInput (lemmaList) {
    let input = ''

    for (let lemma of lemmaList) {
      input += lemma.word + ','
    }
    if (input.length > 0) {
      input = input.substr(0, input.length - 1)
    }
    return input.length > 0 ? input : undefined
  }

  async getAvailableResLang (inLang, outLang) {
    if (this.mapLangUri[inLang] === undefined) {
      let urlAvaLangsRes = this.config.url + '/' + inLang + '/'
      let unparsed = await this.fetch(urlAvaLangsRes)

      let mapLangUri = {}
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

/* harmony default export */ __webpack_exports__["default"] = (AlpheiosLemmaTranslationsAdapter);


/***/ }),

/***/ "./translations/config-data.js":
/*!*************************************!*\
  !*** ./translations/config-data.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config-data */ "./config-data.js");


class TranslationsConfigData extends _config_data__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get defaultLang () {
    return 'eng'
  }

  defineOutLang (browserLang) {
    let langMap = {
      'en-US': 'eng',
      'it': 'ita',
      'pt': 'por',
      'ca': 'cat',
      'fr': 'fre',
      'de': 'ger',
      'es': 'spa'
    }
    return langMap[browserLang] || this.defaultLang
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TranslationsConfigData);


/***/ }),

/***/ "./translations/config.json":
/*!**********************************!*\
  !*** ./translations/config.json ***!
  \**********************************/
/*! exports provided: url, availableLangSource, rights, default */
/***/ (function(module) {

module.exports = {"url":"https://ats.alpheios.net","availableLangSource":["lat"],"rights":"Lemma translations are extracted from data provided under the GNU GPL v3 license by the Collatinus Project (https://github.com/biblissima/collatinus), which is developed and maintained by Yves Ouvrard and Philippe Verkerk."};

/***/ }),

/***/ "./tufts/adapter.js":
/*!**************************!*\
  !*** ./tufts/adapter.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/base-adapter */ "./base-adapter.js");
/* harmony import */ var _tufts_transform_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/tufts/transform-adapter */ "./tufts/transform-adapter.js");
/* harmony import */ var _tufts_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/tufts/config.json */ "./tufts/config.json");
var _tufts_config_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/tufts/config.json */ "./tufts/config.json", 1);
/* harmony import */ var _tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/tufts/engines-set */ "./tufts/engines-set.js");
/* harmony import */ var _tufts_config_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/tufts/config-data */ "./tufts/config-data.js");









class AlpheiosTuftsAdapter extends _base_adapter__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (config = {}) {
    super()
    this.config = new _tufts_config_data__WEBPACK_IMPORTED_MODULE_5__["default"](config, _tufts_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.engineSet = new _tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__["default"](this.config.engine)
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    console.info('***************async getHomonym1', languageID, word, url)
    let jsonObj = await this.fetch(url)
    console.info('***************async getHomonym2', jsonObj)

    if (jsonObj) {
      let transformAdapter = new _tufts_transform_adapter__WEBPACK_IMPORTED_MODULE_2__["default"](this.engineSet, this.config)

      console.info('***************async getHomonym3', jsonObj.RDF.Annotation, word)

      let homonym = transformAdapter.transformData(jsonObj, word)
      if (homonym && homonym.lexemes) {
        homonym.lexemes.sort(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"].getSortByTwoLemmaFeatures(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.frequency, alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part))
      }
      console.info('***************async getHomonym4', homonym)
      return homonym
    } else {
      // No data found for this word
      return undefined
    }
  }

  prepareRequestUrl (languageID, word) {
    let engine = this.engineSet.getEngineByCode(languageID)
    let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
    if (engine) {
      let code = engine.engine
      return this.config.url.replace('r_WORD', word).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
    } else {
      return null
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AlpheiosTuftsAdapter);


/***/ }),

/***/ "./tufts/config-data.js":
/*!******************************!*\
  !*** ./tufts/config-data.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/config-data */ "./config-data.js");



class TuftsConfigData extends _config_data__WEBPACK_IMPORTED_MODULE_1__["default"] {
  uploadEngines (enginesConfig) {
    if (this.engine === undefined) {
      this.engine = {}
    }
    Object.keys(enginesConfig).forEach(langCode => {
      let langID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageIdFromCode(langCode)

      if (langID !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_UNDEFINED && this.engine[langID] === undefined) {
        this.engine[langID] = enginesConfig[langCode]
      }
    })
  }

  get featuresArray () {
    return [
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
  }

  get featuresArrayAll () {
    return [
      ['pofs', 'part'],
      ['case', 'grmCase'],
      ['decl', 'declension'],
      ['num', 'number'],
      ['gend', 'gender'],
      ['conj', 'conjugation'],
      ['tense', 'tense'],
      ['voice', 'voice'],
      ['mood', 'mood'],
      ['pers', 'person'],
      ['comp', 'comparison'],
      ['stemtype', 'stemtype'],
      ['derivtype', 'derivtype'],
      ['dial', 'dialect'],
      ['morph', 'morph']
    ]
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TuftsConfigData);


/***/ }),

/***/ "./tufts/config.json":
/*!***************************!*\
  !*** ./tufts/config.json ***!
  \***************************/
/*! exports provided: engine, url, allowUnknownValues, default */
/***/ (function(module) {

module.exports = {"engine":{"lat":["whitakerLat"],"grc":["morpheusgrc"],"ara":["aramorph"],"per":["hazm"],"gez":["traces"]},"url":"https://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG&clientId=r_CLIENT","allowUnknownValues":true};

/***/ }),

/***/ "./tufts/engine/aramorph.js":
/*!**********************************!*\
  !*** ./tufts/engine/aramorph.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["ArabicLanguageModel"], 'aramorph')

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./tufts/engine/hazm.js":
/*!******************************!*\
  !*** ./tufts/engine/hazm.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["PersianLanguageModel"], 'hazm')

// hazm allow all lemmas in without respect features as all we use it for is lemmatizing
data.setLexemeFilter(function (lexeme) { return Boolean(lexeme.lemma.word) })

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./tufts/engine/morpheusgrc.js":
/*!*************************************!*\
  !*** ./tufts/engine/morpheusgrc.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["GreekLanguageModel"], 'morpheusgrc')

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.gender).importer
  .map('masculine feminine', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_FEMININE, 2]])

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.declension).importer
  .map('1st & 2nd', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].ORD_1ST, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].ORD_2ND, 2]])

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./tufts/engine/traces.js":
/*!********************************!*\
  !*** ./tufts/engine/traces.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["GeezLanguageModel"], 'traces')

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./tufts/engine/whitakers.js":
/*!***********************************!*\
  !*** ./tufts/engine/whitakers.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["LatinLanguageModel"], 'whitakerLat')

// Whitaker's has weird inflection data for conjugation, we prefer
// the dictionary entry's conjugation if it's available
data.inflectionOverrides = [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.conjugation]

/*
Below are value conversion maps for each grammatical feature to be parsed.
Format:
data.addFeature(typeName).add(providerValueName, LibValueName);
(functions are chainable)
Types and values that are unknown (undefined) will be skipped during parsing.
 */

// TODO  - per inflections.xsd
// Whitakers Words uses packon and tackon in POFS, not sure how

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.gender).importer
  .map('common', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_FEMININE, 2]])
  .map('all', [[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_MASCULINE, 1], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_FEMININE, 2], [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].GEND_NEUTER, 3]])

data.addFeature(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.tense).importer
  .map('future_perfect', alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].TENSE_FUTURE_PERFECT)

data.setPropertyParser(function (propertyName, propertyValue) {
  let propertyValues = []
  if (propertyName === 'decl') {
    propertyValues = propertyValue.split('&').map((p) => p.trim())
  } else if (propertyName === 'comp' && propertyValue === 'positive') {
    propertyValues = []
  } else if (propertyName === 'conj' && propertyValue.match(/5th|6th|7th|8th/)) {
    // these are irregular verbs
    propertyValues = [alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Constants"].TYPE_IRREGULAR]
  } else {
    propertyValues = [propertyValue]
  }
  return propertyValues
})

data.setLexemeAggregator(function (lexemeSet, inflections) {
  let lexemes = []
  for (let lex of lexemeSet) {
    if (this.reportLexeme(lex)) {
      if (lex.meaning.shortDefs.length === 0 && lexemeSet.length > 1) {
        for (let otherLex of lexemeSet) {
          // same headword and same part of speech
          if (otherLex.meaning.shortDefs.length > 0 && otherLex.lemma.isFullHomonym(lex.lemma)) {
            let featuresMatch = true
            for (let feature of Object.entries(lex.lemma.features)) {
              // check the other features excluding frequency, source and age
              if ((feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.frequency) &&
                   (feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.source) &&
                   (feature[0] !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.age) &&
                   !(feature[1].isEqual(otherLex.lemma.features[feature[0]]))) {
                featuresMatch = false
                break
              }
            }
            // same lemma, same features, must be principal parts mismatch
            if (featuresMatch) {
              // if this lemma has a higher frequency, make it the main lemma of the Lexeme and the existing one an alternative
              if (lex.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.frequency].compareTo(otherLex.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Feature"].types.frequency]) < 1) {
                otherLex.addAltLemma(otherLex.lemma)
                otherLex.lemma = lex.lemma
              } else {
                // otherwise just add it to the alternative lemmas
                otherLex.addAltLemma(lex.lemma)
              }
            } else {
              lex.inflections = inflections
              lexemes.push(lex)
            }
          }
        }
      } else {
        lex.inflections = inflections
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
  let parts = []
  let lemmas = lemma.split(', ')
  for (let [index, l] of lemmas.entries()) {
    let normalized = l.split(' ')[0]
    if (index === 0) {
      primary = normalized
    }
    parts.push(normalized)
  }
  if (primary) {
    parsed = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Lemma"](primary, this.model.languageCode, parts)
  }

  return parsed
})

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./tufts/engines-set.js":
/*!******************************!*\
  !*** ./tufts/engines-set.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/tufts/engine/whitakers */ "./tufts/engine/whitakers.js");
/* harmony import */ var _tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/tufts/engine/morpheusgrc */ "./tufts/engine/morpheusgrc.js");
/* harmony import */ var _tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/tufts/engine/aramorph */ "./tufts/engine/aramorph.js");
/* harmony import */ var _tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/tufts/engine/hazm */ "./tufts/engine/hazm.js");
/* harmony import */ var _tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/tufts/engine/traces */ "./tufts/engine/traces.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_5__);








class EnginesSet {
  constructor (adapterConfigEngines) {
    this.engine = adapterConfigEngines
  }

  getEngineByCode (languageID) {
    if (this.engine[languageID]) {
      let engineCode = this.engine[languageID][0]
      let allEngines = new Map(([ _tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__["default"], _tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__["default"], _tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__["default"], _tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__["default"], _tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__["default"] ]).map((e) => { return [ e.engine, e ] }))
      return allEngines.get(engineCode)
    }
  }

  getEngineByCodeFromLangCode (languageCode) {
    let languageID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_5__["LanguageModelFactory"].getLanguageIdFromCode(languageCode)
    return this.getEngineByCode(languageID)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (EnginesSet);


/***/ }),

/***/ "./tufts/lib.js":
/*!**********************!*\
  !*** ./tufts/lib.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/*
Objects of a morphology analyzer's library
 */


/**
 * Holds all information required to transform from morphological analyzer's grammatical feature values to the
 * library standards. There is one ImportData object per language.
 */
class ImportData {
  /**
     * Creates an ImportData object for the language provided.
     * @param {Function<LanguageModel>} model - A language model of the import data.
     * @param {string} engine - engine code
     */
  constructor (model, engine) {
    'use strict'
    this.model = model
    this.engine = engine
    // add all the features that the language supports so that we
    // can return the default values if we don't need to import a mapping
    for (let featureName of Object.keys(this.model.features)) {
      this.addFeature(featureName)
    }
    // may be overridden by specific engine to handle vagaries in reporting of dictionary entries
    // default just returns them as provided
    this.aggregateLexemes = function (lexemeSet, inflections) {
      let lexemes = []
      for (let lex of lexemeSet) {
        // only process if we have a lemma that differs from the target
        // word or if we have at least a part of speech
        if (this.reportLexeme(lex)) {
          lex.inflections = inflections
          lexemes.push(lex)
        }
      }
      return lexemes
    }
    // may be overridden by specific engine use via setLemmaParser
    this.parseLemma = function (lemma) { return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lemma"](lemma, this.model.languageID) }
    // may be overridden by specific engine use via setPropertyParser - default just returns the property value
    // as a list
    this.parseProperty = function (propertyName, propertyValue) {
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
      return lexeme.lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]
    }

    // may be overriden by specific engine use to a list of of featureTypes which
    // should be overridden in the inflection data from the lemma data
    this.inflectionOverrides = []
  }

  /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
  addFeature (featureName) {
    this[featureName] = {}
    let model = this.model

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
          let message = `Unknown value "${providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues})`
          if (allowUnknownValues) {
            console.log(message)
            mappedValue = model.typeFeature(featureName).createFeature(providerValue, sortOrder)
          } else {
            throw new Error(message)
          }
        }
      } else {
        let tempValue = this.importer.get(providerValue)
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
          let value = this.importer.get(item.providerValue)
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
          let message = `Unknown value "${item.providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues})`
          if (allowUnknownValues) {
            console.log(message)
            values.push([item.providerValue, item.sortOrder])
          } else {
            throw new Error(message)
          }
        }
      }
      return model.typeFeature(featureName).createFeatures(values)
    }

    this[featureName].importer = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["FeatureImporter"]()

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
    let inputItem = inputElem[inputName]
    if (inputItem && (Array.isArray(inputItem) || inputItem.$)) {
      let values = []
      if (Array.isArray(inputItem)) {
        // There are multiple values of this feature
        for (let e of inputItem) {
          values.push(...this.parseProperty(inputName, e.$))
        }
      } else {
        values = this.parseProperty(inputName, inputItem.$)
      }
      // `values` is always an array as an array is a return value of `parseProperty`
      if (values.length > 0) {
        // There are some values found
        values = values.map(v => { return { providerValue: v, sortOrder: inputItem.order ? inputItem.order : 1 } })
        let feature = this[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types[featureName]].getMultiple(values, allowUnknownValues)
        model.addFeature(feature)
      }
    }
  }

  /**
   * Overrides feature data from an inflection with feature data from the lemma
   * if required by an engine-specific list of featureTypes
   * @param {String} featureType the feature type name
   * @param {Inflection} inflection the inflection object
   * @param {Lemma[]} lemmas the lemma objects
   */
  overrideInflectionFeatureIfRequired (featureType, inflection, lemmas) {
    if (this.inflectionOverrides.includes(featureType)) {
      for (let lemma of lemmas.filter(l => l.features[featureType])) {
        inflection.addFeature(lemma.features[featureType])
      }
    }
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ImportData);


/***/ }),

/***/ "./tufts/transform-adapter.js":
/*!************************************!*\
  !*** ./tufts/transform-adapter.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);


class TransformAdapter {
  constructor (engineSet, config) {
    this.engineSet = engineSet
    this.config = config
  }

  transformData (jsonObj, targetWord) {
    let lexemes = []
    let annotationBody = jsonObj.RDF.Annotation.Body
    if (!Array.isArray(annotationBody)) {
      /*
      If only one lexeme is returned, Annotation Body will not be an array but rather a single object.
      Let's convert it to an array so we can work with it in the same way no matter what format it is.
      */
      if (annotationBody) {
        annotationBody = [annotationBody]
      } else {
        annotationBody = []
      }
    }
    let providerUri = jsonObj.RDF.Annotation.creator.Agent.about
    let providerRights = ''
    if (jsonObj.RDF.Annotation.rights) {
      providerRights = jsonObj.RDF.Annotation.rights.$
    }
    let provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](providerUri, providerRights)
    for (let lexeme of annotationBody) {
      let inflectionsJSON = lexeme.rest.entry.infl
      if (!inflectionsJSON) {
        inflectionsJSON = []
      } else if (!Array.isArray(inflectionsJSON)) {
        // If only one inflection returned, it is a single object, not an array of objects.
        // Convert it to an array for uniformity.
        inflectionsJSON = [inflectionsJSON]
      }
      let lemmaElements
      let features = [
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
      let reconstructHdwd = []
      if (lexeme.rest.entry.dict) {
        if (Array.isArray(lexeme.rest.entry.dict)) {
          lemmaElements = lexeme.rest.entry.dict
        } else {
          if (!lexeme.rest.entry.dict.hdwd && inflectionsJSON[0].term) {
            lexeme.rest.entry.dict.hdwd = {}
            lexeme.rest.entry.dict.hdwd.lang = inflectionsJSON[0].term.lang
            reconstructHdwd.push(inflectionsJSON[0].term.prefix ? inflectionsJSON[0].term.prefix.$ : '')
            reconstructHdwd.push(inflectionsJSON[0].term.stem ? inflectionsJSON[0].term.stem.$ : '')
            reconstructHdwd.push(inflectionsJSON[0].term.suff ? inflectionsJSON[0].term.suff.$ : '')
          }
          lemmaElements = [lexeme.rest.entry.dict]
        }
      } else if (inflectionsJSON.length > 0 && inflectionsJSON[0].term) {
        lemmaElements = [ inflectionsJSON[0].term ]
      }
      // in rare cases (e.g. conditum in Whitakers) multiple dict entries
      // exist - always use the lemma and language from the first
      let language = lemmaElements[0].hdwd ? lemmaElements[0].hdwd.lang : lemmaElements[0].lang
      // Get importer based on the language
      let mappingData = this.engineSet.getEngineByCodeFromLangCode(language)
      if (!mappingData) {
        console.log(`No mapping data found for ${language}`)
        continue
      }
      if (reconstructHdwd.length > 0) {
        if (mappingData.model.direction === alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_DIR_RTL) {
          reconstructHdwd.reverse()
        }
        lexeme.rest.entry.dict.hdwd.$ = reconstructHdwd.join('')
      }
      let lemmas = []
      let lexemeSet = []
      for (let entry of lemmaElements.entries()) {
        let shortdefs = []
        let index = entry[0]
        let elem = entry[1]
        let lemmaText
        if (elem.hdwd) {
          lemmaText = elem.hdwd.$
        }
        if (!lemmaText || !language) {
          console.log('No lemma or language found')
          continue
        }
        let lemma = mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)
        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }
        let meanings = lexeme.rest.entry.mean
        if (!Array.isArray(meanings)) {
          meanings = [meanings]
        }
        meanings = meanings.filter((m) => m)
        // if we have multiple dictionary elements, take the meaning with the matching index
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index]) {
            let meaning = meanings[index]
            // TODO: convert a source-specific language code to ISO 639-3 if don't match
            let lang = meaning.lang ? meaning.lang : 'eng'
            shortdefs.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider,
              new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](meaning.$, lang, 'text/plain', lemmas[index].word)))
          }
        } else {
          // Changed to prevent some weird "Array Iterator.prototype.next called on incompatible receiver [object Unknown]" error
          let sDefs = meanings.map(meaning => {
            let lang = meaning.lang ? meaning.lang : 'eng'
            return alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider,
              new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](meaning.$, lang, 'text/plain', lemma.word))
          })
          shortdefs.push(...sDefs)
        }
        let lexmodel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"](lemma, [])

        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, lexmodel))
      }
      if (lemmas.length === 0) {
        continue
      }
      let inflections = []
      for (let inflectionJSON of inflectionsJSON) {
        let stem = inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
        let suffix = inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
        let prefix = inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
        let xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
        let inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Inflection"](stem, mappingData.model.languageID, suffix, prefix, xmpl)
        if (targetWord) {
          inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.fullForm, targetWord, mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (let f of [
          ['pofs', 'part'],
          ['case', 'grmCase'],
          ['decl', 'declension'],
          ['num', 'number'],
          ['gend', 'gender'],
          ['conj', 'conjugation'],
          ['tense', 'tense'],
          ['voice', 'voice'],
          ['mood', 'mood'],
          ['pers', 'person'],
          ['comp', 'comparison'],
          ['stemtype', 'stemtype'],
          ['derivtype', 'derivtype'],
          ['dial', 'dialect'],
          ['morph', 'morph']
        ]) {
          try {
            mappingData.mapFeature(inflection, inflectionJSON, ...f, this.config.allowUnknownValues)
            mappingData.overrideInflectionFeatureIfRequired(f[1], inflection, lemmas)
          } catch (e) {
            console.log(`Unable to map ${f[0]}`, e)
          }
        }
        // we only use the inflection if it tells us something the dictionary details do not
        if (inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.grmCase] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.tense] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.mood] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.voice] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.person] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.comparison] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.stemtype] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.derivtype] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.dialect] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.morph] ||
          inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.example]) {
          inflections.push(inflection)
        }
        // inflection can provide lemma decl, pofs, conj
        for (let lemma of lemmas) {
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]) {
            mappingData.mapFeature(lemma, inflectionJSON, 'pofs', 'part', this.config.allowUnknownValues)
          }
          // only take declension from inflection if lemma has no part of speech or its the same as the inflection
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.declension] &&
            (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]))) {
            mappingData.mapFeature(lemma, inflectionJSON, 'decl', 'declension', this.config.allowUnknownValues)
          }
          // only take conjugation from inflection if lemma has a part of speech and its the same as the inflection
          if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.conjugation] &&
            (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]))) {
            mappingData.mapFeature(lemma, inflectionJSON, 'conj', 'conjugation', this.config.allowUnknownValues)
          }
        }
      }
      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }
    if (lexemes.length > 0) {
      return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"](lexemes, targetWord)
    } else {
      return undefined
    }
  }

  transformDataBackup (annotation, targetWord) {
    let lexemes = []
    let provider = this.getProviderFromAnnotation(annotation)
    let annotationBody = this.checkAndConvertToArray(annotation.Body)

    let features = this.config.featuresArray

    for (let lexeme of annotationBody) {
      console.info('*********************lexeme.rest', annotationBody, lexeme, lexeme.rest)
      let shortdefs = []
      let inflectionsJSON = this.checkAndConvertToArray(lexeme.rest.entry.infl)
      let lemmaElements = this.getLemmasFromEntryDict(lexeme.rest.entry.dict, inflectionsJSON)

      let meanings = this.checkAndConvertToArray(lexeme.rest.entry.mean).filter((m) => m)

      let languageCode = lemmaElements[0].hdwd ? lemmaElements[0].hdwd.lang : lemmaElements[0].lang

      let mappingData = this.engineSet.getEngineByCodeFromLangCode(languageCode)
      if (!mappingData) {
        console.log(`No mapping data found for ${languageCode}`)
        continue
      }

      this.updateReconstructHdwdFromDict(lexeme.rest.entry.dict, inflectionsJSON)

      let lemmas = []
      let lexemeSet = []

      for (const [index, elem] of lemmaElements.entries()) {
        let lemmaText = elem.hdwd ? elem.hdwd.$ : undefined

        if (!lemmaText || !languageCode) {
          console.log('No lemma or language found')
          continue
        }

        let lemma = mappingData.parseLemma(lemmaText, languageCode)
        lemmas.push(lemma)

        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }

        if (lemmaElements.length > 1) {
          if (meanings && meanings[index]) {
            shortdefs.push(this.getDefinitionFromProvider(provider, meanings[index], lemmas[index].word))
          }
        } else {
          let sDefs = meanings.map(meaning => this.getDefinitionFromProvider(provider, meaning, lemma.word))
          shortdefs.push(...sDefs)
        }

        let lexmodel = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"](lemma, [])
        lexmodel.meaning.appendShortDefs(shortdefs)
        lexemeSet.push(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, lexmodel))
      }

      if (lemmas.length === 0) {
        continue
      }

      let inflections = this.getInflections(inflectionsJSON, mappingData, lemmas, targetWord)
      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }

    if (lexemes.length > 0) {
      return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"](lexemes, targetWord)
    } else {
      return undefined
    }
  }

  getDefinitionFromProvider (provider, meaning, word) {
    let lang = meaning.lang ? meaning.lang : 'eng'
    return alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](meaning.$, lang, 'text/plain', word))
  }

  getProviderFromAnnotation (annotation) {
    let providerUri = annotation.creator.Agent.about

    let providerRights = annotation.rights ? annotation.rights.$ : ''
    return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](providerUri, providerRights)
  }

  checkAndConvertToArray (value) {
    if (Array.isArrayvalue) {
      return value
    }
    if (value) {
      return [value]
    }
    return []
  }

  getLemmasFromEntryDict (entryDict, inflectionsJSON) {
    if (entryDict) {
      return this.checkAndConvertToArray(entryDict)
    } else if (inflectionsJSON.length > 0 && inflectionsJSON[0].term) {
      return [ inflectionsJSON[0].term ]
    } else {
      return undefined
    }
  }

  updateReconstructHdwdFromDict (entryDict, inflectionsJSON, mappingData) {
    let reconstructHdwd = []
    if (entryDict && !Array.isArray(entryDict) && !entryDict.hdwd && inflectionsJSON[0].term) {
      entryDict.hdwd = {}
      entryDict.hdwd.lang = inflectionsJSON[0].term.lang
      reconstructHdwd.push(inflectionsJSON[0].term.prefix ? inflectionsJSON[0].term.prefix.$ : '')
      reconstructHdwd.push(inflectionsJSON[0].term.stem ? inflectionsJSON[0].term.stem.$ : '')
      reconstructHdwd.push(inflectionsJSON[0].term.suff ? inflectionsJSON[0].term.suff.$ : '')
    }
    if (reconstructHdwd.length > 0) {
      if (mappingData.model.direction === alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_DIR_RTL) {
        reconstructHdwd.reverse()
      }
      entryDict.hdwd.$ = reconstructHdwd.join('')
    }
  }

  getInflections (inflectionsJSON, mappingData, lemmas, targetWord) {
    let inflections = []
    for (let inflectionJSON of inflectionsJSON) {
      let stem = inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null
      let suffix = inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null
      let prefix = inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null
      let xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null
      let inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Inflection"](stem, mappingData.model.languageID, suffix, prefix, xmpl)

      if (targetWord) {
        inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.fullForm, targetWord, mappingData.model.languageID))
      }
      // Parse whatever grammatical features we're interested in and are provided
      for (let f of this.config.featuresArrayAll) {
        try {
          mappingData.mapFeature(inflection, inflectionJSON, ...f, this.config.allowUnknownValues)
          mappingData.overrideInflectionFeatureIfRequired(f[1], inflection, lemmas)
        } catch (e) {
          console.log(`Unable to map ${f[0]}`, e)
        }
      }

      // we only use the inflection if it tells us something the dictionary details do not
      if (inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.grmCase] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.tense] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.mood] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.voice] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.person] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.comparison] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.stemtype] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.derivtype] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.dialect] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.morph] ||
        inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.example]) {
        inflections.push(inflection)
      }
      // inflection can provide lemma decl, pofs, conj
      for (let lemma of lemmas) {
        if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]) {
          mappingData.mapFeature(lemma, inflectionJSON, 'pofs', 'part', this.config.allowUnknownValues)
        }
        // only take declension from inflection if lemma has no part of speech or its the same as the inflection
        if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.declension] &&
          (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]))) {
          mappingData.mapFeature(lemma, inflectionJSON, 'decl', 'declension', this.config.allowUnknownValues)
        }
        // only take conjugation from inflection if lemma has a part of speech and its the same as the inflection
        if (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.conjugation] &&
          (!lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part] || lemma.features[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part].isEqual(inflection[alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part]))) {
          mappingData.mapFeature(lemma, inflectionJSON, 'conj', 'conjugation', this.config.allowUnknownValues)
        }
      }
    }

    return inflections
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TransformAdapter);


/***/ }),

/***/ "alpheios-data-models":
/*!***************************************!*\
  !*** external "alpheios-data-models" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_alpheios_data_models__;

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
});
//# sourceMappingURL=alpheios-client-adapters.node.js.map