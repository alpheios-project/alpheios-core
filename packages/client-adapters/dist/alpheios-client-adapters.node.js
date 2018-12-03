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

/***/ "../node_modules/intl-messageformat-parser/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/intl-messageformat-parser/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__(/*! ./lib/parser */ "../node_modules/intl-messageformat-parser/lib/parser.js")['default'];
exports['default'] = exports;


/***/ }),

/***/ "../node_modules/intl-messageformat-parser/lib/parser.js":
/*!***************************************************************!*\
  !*** ../node_modules/intl-messageformat-parser/lib/parser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = (function() {
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

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
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



/***/ }),

/***/ "../node_modules/intl-messageformat/index.js":
/*!***************************************************!*\
  !*** ../node_modules/intl-messageformat/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlMessageFormat = __webpack_require__(/*! ./lib/main */ "../node_modules/intl-messageformat/lib/main.js")['default'];

// Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(/*! ./lib/locales */ "../node_modules/intl-messageformat/lib/locales.js");

// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlMessageFormat;
exports['default'] = exports;


/***/ }),

/***/ "../node_modules/intl-messageformat/lib/compiler.js":
/*!**********************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/compiler.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
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

Compiler.prototype.compileMessageText = function (element) {
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

Compiler.prototype.compileArgument = function (element) {
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

Compiler.prototype.compileOptions = function (element) {
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



/***/ }),

/***/ "../node_modules/intl-messageformat/lib/core.js":
/*!******************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/core.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(/*! ./utils */ "../node_modules/intl-messageformat/lib/utils.js"), src$es5$$ = __webpack_require__(/*! ./es5 */ "../node_modules/intl-messageformat/lib/es5.js"), src$compiler$$ = __webpack_require__(/*! ./compiler */ "../node_modules/intl-messageformat/lib/compiler.js"), intl$messageformat$parser$$ = __webpack_require__(/*! intl-messageformat-parser */ "../node_modules/intl-messageformat-parser/index.js");
exports["default"] = MessageFormat;

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
    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

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
src$es5$$.defineProperty(MessageFormat, 'formats', {
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
src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
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
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
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
        if (!(values && src$utils$$.hop.call(values, id))) {
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
        if (!src$utils$$.hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

        if (formats && src$utils$$.hop.call(formats, type)) {
            src$utils$$.extend(mergedType, formats[type]);
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



/***/ }),

/***/ "../node_modules/intl-messageformat/lib/en.js":
/*!****************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/en.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};



/***/ }),

/***/ "../node_modules/intl-messageformat/lib/es5.js":
/*!*****************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/es5.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__(/*! ./utils */ "../node_modules/intl-messageformat/lib/utils.js");

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (src$utils$$.hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate;



/***/ }),

/***/ "../node_modules/intl-messageformat/lib/locales.js":
/*!*********************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/locales.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// GENERATED FILE
var IntlMessageFormat = __webpack_require__(/*! ./core */ "../node_modules/intl-messageformat/lib/core.js")["default"];

IntlMessageFormat.__addLocaleData({"locale":"af","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"af-NA","parentLocale":"af"});
IntlMessageFormat.__addLocaleData({"locale":"agq","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ak","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"am","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ar","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n100=t0&&s[0].slice(-2);if(ord)return"other";return n==0?"zero":n==1?"one":n==2?"two":n100>=3&&n100<=10?"few":n100>=11&&n100<=99?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ar-AE","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-BH","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-DJ","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-DZ","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-EG","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-EH","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-ER","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-IL","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-IQ","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-JO","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-KM","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-KW","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-LB","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-LY","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-MA","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-MR","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-OM","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-PS","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-QA","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-SA","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-SD","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-SO","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-SS","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-SY","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-TD","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-TN","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"ar-YE","parentLocale":"ar"});
IntlMessageFormat.__addLocaleData({"locale":"as","pluralRuleFunction":function (n,ord){if(ord)return n==1||n==5||n==7||n==8||n==9||n==10?"one":n==2||n==3?"two":n==4?"few":n==6?"many":"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"asa","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ast","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"az","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],i10=i.slice(-1),i100=i.slice(-2),i1000=i.slice(-3);if(ord)return i10==1||i10==2||i10==5||i10==7||i10==8||(i100==20||i100==50||i100==70||i100==80)?"one":i10==3||i10==4||(i1000==100||i1000==200||i1000==300||i1000==400||i1000==500||i1000==600||i1000==700||i1000==800||i1000==900)?"few":i==0||i10==6||(i100==40||i100==60||i100==90)?"many":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"az-Arab","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"az-Cyrl","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"az-Latn","parentLocale":"az"});
IntlMessageFormat.__addLocaleData({"locale":"bas","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"be","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return(n10==2||n10==3)&&n100!=12&&n100!=13?"few":"other";return n10==1&&n100!=11?"one":n10>=2&&n10<=4&&(n100<12||n100>14)?"few":t0&&n10==0||n10>=5&&n10<=9||n100>=11&&n100<=14?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bem","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bez","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bg","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bm","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bm-Nkoo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bn","pluralRuleFunction":function (n,ord){if(ord)return n==1||n==5||n==7||n==8||n==9||n==10?"one":n==2||n==3?"two":n==4?"few":n==6?"many":"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bn-IN","parentLocale":"bn"});
IntlMessageFormat.__addLocaleData({"locale":"bo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bo-IN","parentLocale":"bo"});
IntlMessageFormat.__addLocaleData({"locale":"br","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),n1000000=t0&&s[0].slice(-6);if(ord)return"other";return n10==1&&n100!=11&&n100!=71&&n100!=91?"one":n10==2&&n100!=12&&n100!=72&&n100!=92?"two":(n10==3||n10==4||n10==9)&&(n100<10||n100>19)&&(n100<70||n100>79)&&(n100<90||n100>99)?"few":n!=0&&t0&&n1000000==0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"brx","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bs","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11||f10==1&&f100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)||f10>=2&&f10<=4&&(f100<12||f100>14)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bs-Cyrl","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"bs-Latn","parentLocale":"bs"});
IntlMessageFormat.__addLocaleData({"locale":"ca","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return n==1||n==3?"one":n==2?"two":n==4?"few":"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ca-AD","parentLocale":"ca"});
IntlMessageFormat.__addLocaleData({"locale":"ca-ES-VALENCIA","parentLocale":"ca-ES"});
IntlMessageFormat.__addLocaleData({"locale":"ca-ES","parentLocale":"ca"});
IntlMessageFormat.__addLocaleData({"locale":"ca-FR","parentLocale":"ca"});
IntlMessageFormat.__addLocaleData({"locale":"ca-IT","parentLocale":"ca"});
IntlMessageFormat.__addLocaleData({"locale":"ce","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"cgg","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"chr","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ckb","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ckb-IR","parentLocale":"ckb"});
IntlMessageFormat.__addLocaleData({"locale":"cs","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1];if(ord)return"other";return n==1&&v0?"one":i>=2&&i<=4&&v0?"few":!v0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"cu","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"cy","pluralRuleFunction":function (n,ord){if(ord)return n==0||n==7||n==8||n==9?"zero":n==1?"one":n==2?"two":n==3||n==4?"few":n==5||n==6?"many":"other";return n==0?"zero":n==1?"one":n==2?"two":n==3?"few":n==6?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"da","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],t0=Number(s[0])==n;if(ord)return"other";return n==1||!t0&&(i==0||i==1)?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"da-GL","parentLocale":"da"});
IntlMessageFormat.__addLocaleData({"locale":"dav","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"de","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"de-AT","parentLocale":"de"});
IntlMessageFormat.__addLocaleData({"locale":"de-BE","parentLocale":"de"});
IntlMessageFormat.__addLocaleData({"locale":"de-CH","parentLocale":"de"});
IntlMessageFormat.__addLocaleData({"locale":"de-LI","parentLocale":"de"});
IntlMessageFormat.__addLocaleData({"locale":"de-LU","parentLocale":"de"});
IntlMessageFormat.__addLocaleData({"locale":"dje","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"dsb","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return"other";return v0&&i100==1||f100==1?"one":v0&&i100==2||f100==2?"two":v0&&(i100==3||i100==4)||(f100==3||f100==4)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"dua","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"dv","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"dyo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"dz","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ebu","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ee","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ee-TG","parentLocale":"ee"});
IntlMessageFormat.__addLocaleData({"locale":"el","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"el-CY","parentLocale":"el"});
IntlMessageFormat.__addLocaleData({"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"en-001","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-150","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-AG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-AI","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-AS","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-AT","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-AU","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BB","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BE","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BI","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-BM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BS","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BW","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-BZ","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CA","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CC","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CH","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-CK","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CX","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-CY","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-DE","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-DG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-DK","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-DM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-Dsrt","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"en-ER","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-FI","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-FJ","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-FK","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-FM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GB","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GD","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GH","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GI","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-GU","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-GY","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-HK","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-IE","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-IL","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-IM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-IN","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-IO","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-JE","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-JM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-KE","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-KI","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-KN","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-KY","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-LC","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-LR","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-LS","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MH","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-MO","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MP","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-MS","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MT","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MU","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MW","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-MY","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NA","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NF","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NL","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-NR","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NU","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-NZ","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-PG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-PH","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-PK","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-PN","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-PR","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-PW","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-RW","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SB","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SC","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SD","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SE","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-SG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SH","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SI","parentLocale":"en-150"});
IntlMessageFormat.__addLocaleData({"locale":"en-SL","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SS","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SX","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-SZ","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-Shaw","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"en-TC","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-TK","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-TO","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-TT","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-TV","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-TZ","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-UG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-UM","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-US","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-VC","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-VG","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-VI","parentLocale":"en"});
IntlMessageFormat.__addLocaleData({"locale":"en-VU","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-WS","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-ZA","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-ZM","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"en-ZW","parentLocale":"en-001"});
IntlMessageFormat.__addLocaleData({"locale":"eo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"es","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"es-419","parentLocale":"es"});
IntlMessageFormat.__addLocaleData({"locale":"es-AR","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-BO","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-CL","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-CO","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-CR","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-CU","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-DO","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-EA","parentLocale":"es"});
IntlMessageFormat.__addLocaleData({"locale":"es-EC","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-GQ","parentLocale":"es"});
IntlMessageFormat.__addLocaleData({"locale":"es-GT","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-HN","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-IC","parentLocale":"es"});
IntlMessageFormat.__addLocaleData({"locale":"es-MX","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-NI","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-PA","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-PE","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-PH","parentLocale":"es"});
IntlMessageFormat.__addLocaleData({"locale":"es-PR","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-PY","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-SV","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-US","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-UY","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"es-VE","parentLocale":"es-419"});
IntlMessageFormat.__addLocaleData({"locale":"et","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"eu","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ewo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fa","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fa-AF","parentLocale":"fa"});
IntlMessageFormat.__addLocaleData({"locale":"ff","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<2?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ff-CM","parentLocale":"ff"});
IntlMessageFormat.__addLocaleData({"locale":"ff-GN","parentLocale":"ff"});
IntlMessageFormat.__addLocaleData({"locale":"ff-MR","parentLocale":"ff"});
IntlMessageFormat.__addLocaleData({"locale":"fi","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fil","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return n==1?"one":"other";return v0&&(i==1||i==2||i==3)||v0&&i10!=4&&i10!=6&&i10!=9||!v0&&f10!=4&&f10!=6&&f10!=9?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fo-DK","parentLocale":"fo"});
IntlMessageFormat.__addLocaleData({"locale":"fr","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":"other";return n>=0&&n<2?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fr-BE","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-BF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-BI","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-BJ","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-BL","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CA","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CD","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CG","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CH","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CI","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-CM","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-DJ","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-DZ","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-GA","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-GF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-GN","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-GP","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-GQ","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-HT","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-KM","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-LU","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MA","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MC","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MG","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-ML","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MQ","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MR","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-MU","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-NC","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-NE","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-PF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-PM","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-RE","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-RW","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-SC","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-SN","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-SY","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-TD","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-TG","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-TN","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-VU","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-WF","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fr-YT","parentLocale":"fr"});
IntlMessageFormat.__addLocaleData({"locale":"fur","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"fy","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ga","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return n==1?"one":"other";return n==1?"one":n==2?"two":t0&&n>=3&&n<=6?"few":t0&&n>=7&&n<=10?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"gd","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return"other";return n==1||n==11?"one":n==2||n==12?"two":t0&&n>=3&&n<=10||t0&&n>=13&&n<=19?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"gl","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"gsw","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"gsw-FR","parentLocale":"gsw"});
IntlMessageFormat.__addLocaleData({"locale":"gsw-LI","parentLocale":"gsw"});
IntlMessageFormat.__addLocaleData({"locale":"gu","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":n==2||n==3?"two":n==4?"few":n==6?"many":"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"guw","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"guz","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"gv","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return v0&&i10==1?"one":v0&&i10==2?"two":v0&&(i100==0||i100==20||i100==40||i100==60||i100==80)?"few":!v0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ha","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ha-Arab","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ha-GH","parentLocale":"ha"});
IntlMessageFormat.__addLocaleData({"locale":"ha-NE","parentLocale":"ha"});
IntlMessageFormat.__addLocaleData({"locale":"haw","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"he","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1);if(ord)return"other";return n==1&&v0?"one":i==2&&v0?"two":v0&&(n<0||n>10)&&t0&&n10==0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"hi","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":n==2||n==3?"two":n==4?"few":n==6?"many":"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"hr","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11||f10==1&&f100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)||f10>=2&&f10<=4&&(f100<12||f100>14)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"hr-BA","parentLocale":"hr"});
IntlMessageFormat.__addLocaleData({"locale":"hsb","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i100=i.slice(-2),f100=f.slice(-2);if(ord)return"other";return v0&&i100==1||f100==1?"one":v0&&i100==2||f100==2?"two":v0&&(i100==3||i100==4)||(f100==3||f100==4)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"hu","pluralRuleFunction":function (n,ord){if(ord)return n==1||n==5?"one":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"hy","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":"other";return n>=0&&n<2?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"id","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ig","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ii","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"in","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"is","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],t0=Number(s[0])==n,i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return t0&&i10==1&&i100!=11||!t0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"it","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return n==11||n==8||n==80||n==800?"many":"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"it-CH","parentLocale":"it"});
IntlMessageFormat.__addLocaleData({"locale":"it-SM","parentLocale":"it"});
IntlMessageFormat.__addLocaleData({"locale":"iu","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"iu-Latn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"iw","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1);if(ord)return"other";return n==1&&v0?"one":i==2&&v0?"two":v0&&(n<0||n>10)&&t0&&n10==0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ja","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"jbo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"jgo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ji","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"jmc","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"jv","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"jw","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ka","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],i100=i.slice(-2);if(ord)return i==1?"one":i==0||(i100>=2&&i100<=20||i100==40||i100==60||i100==80)?"many":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kab","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<2?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kaj","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kam","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kcg","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kde","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kea","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"khq","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ki","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kk","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n10=t0&&s[0].slice(-1);if(ord)return n10==6||n10==9||t0&&n10==0&&n!=0?"many":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kkj","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kl","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kln","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"km","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ko","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ko-KP","parentLocale":"ko"});
IntlMessageFormat.__addLocaleData({"locale":"kok","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ks","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ksb","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ksf","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ksh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0?"zero":n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ku","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"kw","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ky","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lag","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0];if(ord)return"other";return n==0?"zero":(i==0||i==1)&&n!=0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lb","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lg","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lkt","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ln","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ln-AO","parentLocale":"ln"});
IntlMessageFormat.__addLocaleData({"locale":"ln-CF","parentLocale":"ln"});
IntlMessageFormat.__addLocaleData({"locale":"ln-CG","parentLocale":"ln"});
IntlMessageFormat.__addLocaleData({"locale":"lo","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lrc","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lrc-IQ","parentLocale":"lrc"});
IntlMessageFormat.__addLocaleData({"locale":"lt","pluralRuleFunction":function (n,ord){var s=String(n).split("."),f=s[1]||"",t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return"other";return n10==1&&(n100<11||n100>19)?"one":n10>=2&&n10<=9&&(n100<11||n100>19)?"few":f!=0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lu","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"luo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"luy","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"lv","pluralRuleFunction":function (n,ord){var s=String(n).split("."),f=s[1]||"",v=f.length,t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return"other";return t0&&n10==0||n100>=11&&n100<=19||v==2&&(f100>=11&&f100<=19)?"zero":n10==1&&n100!=11||v==2&&f10==1&&f100!=11||v!=2&&f10==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mas","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mas-TZ","parentLocale":"mas"});
IntlMessageFormat.__addLocaleData({"locale":"mer","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mfe","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mg","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mgh","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mgo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mk","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1);if(ord)return i10==1&&i100!=11?"one":i10==2&&i100!=12?"two":(i10==7||i10==8)&&i100!=17&&i100!=18?"many":"other";return v0&&i10==1||f10==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ml","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mn-Mong","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mo","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n100=t0&&s[0].slice(-2);if(ord)return n==1?"one":"other";return n==1&&v0?"one":!v0||n==0||n!=1&&(n100>=1&&n100<=19)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mr","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":n==2||n==3?"two":n==4?"few":"other";return n>=0&&n<=1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ms","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ms-Arab","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ms-BN","parentLocale":"ms"});
IntlMessageFormat.__addLocaleData({"locale":"ms-SG","parentLocale":"ms"});
IntlMessageFormat.__addLocaleData({"locale":"mt","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n100=t0&&s[0].slice(-2);if(ord)return"other";return n==1?"one":n==0||n100>=2&&n100<=10?"few":n100>=11&&n100<=19?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mua","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"my","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"mzn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nah","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"naq","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nb","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nb-SJ","parentLocale":"nb"});
IntlMessageFormat.__addLocaleData({"locale":"nd","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ne","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return t0&&n>=1&&n<=4?"one":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ne-IN","parentLocale":"ne"});
IntlMessageFormat.__addLocaleData({"locale":"nl","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nl-AW","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nl-BE","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nl-BQ","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nl-CW","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nl-SR","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nl-SX","parentLocale":"nl"});
IntlMessageFormat.__addLocaleData({"locale":"nmg","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nnh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"no","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nqo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nr","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nso","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nus","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ny","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"nyn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"om","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"om-KE","parentLocale":"om"});
IntlMessageFormat.__addLocaleData({"locale":"or","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"os","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"os-RU","parentLocale":"os"});
IntlMessageFormat.__addLocaleData({"locale":"pa","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pa-Arab","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pa-Guru","parentLocale":"pa"});
IntlMessageFormat.__addLocaleData({"locale":"pap","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pl","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return n==1&&v0?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)?"few":v0&&i!=1&&(i10==0||i10==1)||v0&&(i10>=5&&i10<=9)||v0&&(i100>=12&&i100<=14)?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"prg","pluralRuleFunction":function (n,ord){var s=String(n).split("."),f=s[1]||"",v=f.length,t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),f100=f.slice(-2),f10=f.slice(-1);if(ord)return"other";return t0&&n10==0||n100>=11&&n100<=19||v==2&&(f100>=11&&f100<=19)?"zero":n10==1&&n100!=11||v==2&&f10==1&&f100!=11||v!=2&&f10==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ps","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pt","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return"other";return t0&&n>=0&&n<=2&&n!=2?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pt-AO","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-PT","parentLocale":"pt","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"pt-CV","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-GW","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-MO","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-MZ","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-ST","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"pt-TL","parentLocale":"pt-PT"});
IntlMessageFormat.__addLocaleData({"locale":"qu","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"qu-BO","parentLocale":"qu"});
IntlMessageFormat.__addLocaleData({"locale":"qu-EC","parentLocale":"qu"});
IntlMessageFormat.__addLocaleData({"locale":"rm","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"rn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ro","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n100=t0&&s[0].slice(-2);if(ord)return n==1?"one":"other";return n==1&&v0?"one":!v0||n==0||n!=1&&(n100>=1&&n100<=19)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ro-MD","parentLocale":"ro"});
IntlMessageFormat.__addLocaleData({"locale":"rof","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ru","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)?"few":v0&&i10==0||v0&&(i10>=5&&i10<=9)||v0&&(i100>=11&&i100<=14)?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ru-BY","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-KG","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-KZ","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-MD","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-UA","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"rw","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"rwk","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sah","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"saq","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sbp","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sdh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"se","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"se-FI","parentLocale":"se"});
IntlMessageFormat.__addLocaleData({"locale":"se-SE","parentLocale":"se"});
IntlMessageFormat.__addLocaleData({"locale":"seh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ses","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sg","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sh","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11||f10==1&&f100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)||f10>=2&&f10<=4&&(f100<12||f100>14)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"shi","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return"other";return n>=0&&n<=1?"one":t0&&n>=2&&n<=10?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"shi-Latn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"shi-Tfng","parentLocale":"shi"});
IntlMessageFormat.__addLocaleData({"locale":"si","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"";if(ord)return"other";return n==0||n==1||i==0&&f==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sk","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1];if(ord)return"other";return n==1&&v0?"one":i>=2&&i<=4&&v0?"few":!v0?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sl","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i100=i.slice(-2);if(ord)return"other";return v0&&i100==1?"one":v0&&i100==2?"two":v0&&(i100==3||i100==4)||!v0?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sma","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"smi","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"smj","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"smn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sms","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":n==2?"two":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"so","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"so-DJ","parentLocale":"so"});
IntlMessageFormat.__addLocaleData({"locale":"so-ET","parentLocale":"so"});
IntlMessageFormat.__addLocaleData({"locale":"so-KE","parentLocale":"so"});
IntlMessageFormat.__addLocaleData({"locale":"sq","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n==1?"one":n10==4&&n100!=14?"many":"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sq-MK","parentLocale":"sq"});
IntlMessageFormat.__addLocaleData({"locale":"sq-XK","parentLocale":"sq"});
IntlMessageFormat.__addLocaleData({"locale":"sr","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),i100=i.slice(-2),f10=f.slice(-1),f100=f.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11||f10==1&&f100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)||f10>=2&&f10<=4&&(f100<12||f100>14)?"few":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sr-Cyrl","parentLocale":"sr"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Cyrl-BA","parentLocale":"sr-Cyrl"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Cyrl-ME","parentLocale":"sr-Cyrl"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Cyrl-XK","parentLocale":"sr-Cyrl"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Latn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sr-Latn-BA","parentLocale":"sr-Latn"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Latn-ME","parentLocale":"sr-Latn"});
IntlMessageFormat.__addLocaleData({"locale":"sr-Latn-XK","parentLocale":"sr-Latn"});
IntlMessageFormat.__addLocaleData({"locale":"ss","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ssy","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"st","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sv","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return(n10==1||n10==2)&&n100!=11&&n100!=12?"one":"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sv-AX","parentLocale":"sv"});
IntlMessageFormat.__addLocaleData({"locale":"sv-FI","parentLocale":"sv"});
IntlMessageFormat.__addLocaleData({"locale":"sw","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"sw-CD","parentLocale":"sw"});
IntlMessageFormat.__addLocaleData({"locale":"sw-KE","parentLocale":"sw"});
IntlMessageFormat.__addLocaleData({"locale":"sw-UG","parentLocale":"sw"});
IntlMessageFormat.__addLocaleData({"locale":"syr","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ta","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ta-LK","parentLocale":"ta"});
IntlMessageFormat.__addLocaleData({"locale":"ta-MY","parentLocale":"ta"});
IntlMessageFormat.__addLocaleData({"locale":"ta-SG","parentLocale":"ta"});
IntlMessageFormat.__addLocaleData({"locale":"te","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"teo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"teo-KE","parentLocale":"teo"});
IntlMessageFormat.__addLocaleData({"locale":"th","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ti","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ti-ER","parentLocale":"ti"});
IntlMessageFormat.__addLocaleData({"locale":"tig","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tk","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tl","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],f=s[1]||"",v0=!s[1],i10=i.slice(-1),f10=f.slice(-1);if(ord)return n==1?"one":"other";return v0&&(i==1||i==2||i==3)||v0&&i10!=4&&i10!=6&&i10!=9||!v0&&f10!=4&&f10!=6&&f10!=9?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tn","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"to","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tr","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tr-CY","parentLocale":"tr"});
IntlMessageFormat.__addLocaleData({"locale":"ts","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"twq","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"tzm","pluralRuleFunction":function (n,ord){var s=String(n).split("."),t0=Number(s[0])==n;if(ord)return"other";return n==0||n==1||t0&&n>=11&&n<=99?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ug","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"uk","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2),i10=i.slice(-1),i100=i.slice(-2);if(ord)return n10==3&&n100!=13?"few":"other";return v0&&i10==1&&i100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)?"few":v0&&i10==0||v0&&(i10>=5&&i10<=9)||v0&&(i100>=11&&i100<=14)?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ur","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ur-IN","parentLocale":"ur"});
IntlMessageFormat.__addLocaleData({"locale":"uz","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"uz-Arab","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"uz-Cyrl","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"uz-Latn","parentLocale":"uz"});
IntlMessageFormat.__addLocaleData({"locale":"vai","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"vai-Latn","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"vai-Vaii","parentLocale":"vai"});
IntlMessageFormat.__addLocaleData({"locale":"ve","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"vi","pluralRuleFunction":function (n,ord){if(ord)return n==1?"one":"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"vo","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"vun","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"wa","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==0||n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"wae","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"wo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"xh","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"xog","pluralRuleFunction":function (n,ord){if(ord)return"other";return n==1?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"yav","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"yi","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1];if(ord)return"other";return n==1&&v0?"one":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"yo","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"yo-BJ","parentLocale":"yo"});
IntlMessageFormat.__addLocaleData({"locale":"zgh","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"zh","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hans","parentLocale":"zh"});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hans-HK","parentLocale":"zh-Hans"});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hans-MO","parentLocale":"zh-Hans"});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hans-SG","parentLocale":"zh-Hans"});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hant","pluralRuleFunction":function (n,ord){if(ord)return"other";return"other"}});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hant-HK","parentLocale":"zh-Hant"});
IntlMessageFormat.__addLocaleData({"locale":"zh-Hant-MO","parentLocale":"zh-Hant-HK"});
IntlMessageFormat.__addLocaleData({"locale":"zu","pluralRuleFunction":function (n,ord){if(ord)return"other";return n>=0&&n<=1?"one":"other"}});


/***/ }),

/***/ "../node_modules/intl-messageformat/lib/main.js":
/*!******************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/main.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__(/*! ./core */ "../node_modules/intl-messageformat/lib/core.js"), src$en$$ = __webpack_require__(/*! ./en */ "../node_modules/intl-messageformat/lib/en.js");

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];



/***/ }),

/***/ "../node_modules/intl-messageformat/lib/utils.js":
/*!*******************************************************!*\
  !*** ../node_modules/intl-messageformat/lib/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports.extend = extend;
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
exports.hop = hop;



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

/***/ "../node_modules/papaparse/papaparse.js":
/*!**********************************************!*\
  !*** ../node_modules/papaparse/papaparse.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v4.6.2
https://github.com/mholt/PapaParse
License: MIT
*/

// Polyfills
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
if (!Array.isArray)
{
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

(function(root, factory)
{
	/* globals define */
	if (true)
	{
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
}(this, function()
{
	'use strict';

	var global = (function() {
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
	Papa.NODE_STREAM_INPUT = 1;

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
	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
		Papa.DuplexStreamStreamer = DuplexStreamStreamer;
	}

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
			document.addEventListener('DOMContentLoaded', function() {
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

		_config.transform = isFunction(_config.transform) ? _config.transform : false;

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
		if (_input === Papa.NODE_STREAM_INPUT && typeof PAPA_BROWSER_CONTEXT === 'undefined')
		{
			// create a node Duplex stream for use
			// with .pipe
			streamer = new DuplexStreamStreamer(_config);
			return streamer.getStream();
		}
		else if (typeof _input === 'string')
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
		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** whether to write headers */
		var _writeHeader = true;

		/** delimiting character(s) */
		var _delimiter = ',';

		/** newline character(s) */
		var _newline = '\r\n';

		/** quote character */
		var _quoteChar = '"';

		/** whether to skip empty lines */
		var _skipEmptyLines = false;

		unpackConfig();

		var quoteCharRegex = new RegExp(_quoteChar, 'g');

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (Array.isArray(_input))
		{
			if (!_input.length || Array.isArray(_input[0]))
				return serialize(null, _input, _skipEmptyLines);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input, _skipEmptyLines);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (Array.isArray(_input.data))
			{
				if (!_input.fields)
					_input.fields =  _input.meta && _input.meta.fields;

				if (!_input.fields)
					_input.fields =  Array.isArray(_input.data[0])
						? _input.fields
						: objectKeys(_input.data[0]);

				if (!(Array.isArray(_input.data[0])) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
			}

			return serialize(_input.fields || [], _input.data || [], _skipEmptyLines);
		}

		// Default (any valid paths should return before this)
		throw 'exception: Unable to serialize unrecognized input';


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
                && !Papa.BAD_DELIMITERS.filter(function(value) { return _config.delimiter.indexOf(value) !== -1; }).length)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| Array.isArray(_config.quotes))
				_quotes = _config.quotes;

			if (typeof _config.skipEmptyLines === 'boolean'
				|| typeof _config.skipEmptyLines === 'string')
				_skipEmptyLines = _config.skipEmptyLines;

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
		function serialize(fields, data, skipEmptyLines)
		{
			var csv = '';

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = Array.isArray(fields) && fields.length > 0;
			var dataKeyedByField = !(Array.isArray(data[0]));

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

				var emptyLine = false;
				var nullLine = hasHeader ? Object.keys(data[row]).length === 0 : data[row].length === 0;
				if (skipEmptyLines && !hasHeader)
				{
					emptyLine = skipEmptyLines === 'greedy' ? data[row].join('').trim() === '' : data[row].length === 1 && data[row][0].length === 0;
				}
				if (skipEmptyLines === 'greedy' && hasHeader) {
					var line = [];
					for (var c = 0; c < maxCol; c++) {
						var cx = dataKeyedByField ? fields[c] : c;
						line.push(data[row][cx]);
					}
					emptyLine = line.join('').trim() === '';
				}
				if (!emptyLine)
				{
					for (var col = 0; col < maxCol; col++)
					{
						if (col > 0 && !nullLine)
							csv += _delimiter;
						var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
						csv += safe(data[row][colIdx], col);
					}
					if (row < data.length - 1 && (!skipEmptyLines || (maxCol > 0 && !nullLine)))
					{
						csv += _newline;
					}
				}
			}
			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === 'undefined' || str === null)
				return '';

			if (str.constructor === Date)
				return JSON.stringify(str).slice(1, 25);

			str = str.toString().replace(quoteCharRegex, _quoteChar + _quoteChar);

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (Array.isArray(_quotes) && _quotes[col])
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
		this._finished = false;
		this._completed = false;
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

		this.parseChunk = function(chunk, isFakeChunk)
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
			else if (isFunction(this._config.chunk) && !isFakeChunk)
			{
				this._config.chunk(results, this._handle);
				if (this._handle.paused() || this._handle.aborted())
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
				this._config.complete(this._completeResults, this._input);
				this._completed = true;
			}

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
				xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
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
			if (xhr.readyState !== 4)
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
			this._sendError(new Error(errorText));
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

		var remaining;
		this.stream = function(s)
		{
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
		var streamHasEnded = false;

		this.pause = function()
		{
			ChunkStreamer.prototype.pause.apply(this, arguments);
			this._input.pause();
		};

		this.resume = function()
		{
			ChunkStreamer.prototype.resume.apply(this, arguments);
			this._input.resume();
		};

		this.stream = function(stream)
		{
			this._input = stream;

			this._input.on('data', this._streamData);
			this._input.on('end', this._streamEnd);
			this._input.on('error', this._streamError);
		};

		this._checkIsFinished = function()
		{
			if (streamHasEnded && queue.length === 1) {
				this._finished = true;
			}
		};

		this._nextChunk = function()
		{
			this._checkIsFinished();
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
					this._checkIsFinished();
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
			this._sendError(error);
		}, this);

		this._streamEnd = bindFunction(function()
		{
			this._streamCleanUp();
			streamHasEnded = true;
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


	function DuplexStreamStreamer(_config) {
		var Duplex = __webpack_require__(/*! stream */ "stream").Duplex;
		var config = copy(_config);
		var parseOnWrite = true;
		var writeStreamHasFinished = false;
		var parseCallbackQueue = [];
		var stream = null;

		this._onCsvData = function(results)
		{
			var data = results.data;
			for (var i = 0; i < data.length; i++) {
				if (!stream.push(data[i]) && !this._handle.paused()) {
					// the writeable consumer buffer has filled up
					// so we need to pause until more items
					// can be processed
					this._handle.pause();
				}
			}
		};

		this._onCsvComplete = function()
		{
			// node will finish the read stream when
			// null is pushed
			stream.push(null);
		};

		config.step = bindFunction(this._onCsvData, this);
		config.complete = bindFunction(this._onCsvComplete, this);
		ChunkStreamer.call(this, config);

		this._nextChunk = function()
		{
			if (writeStreamHasFinished && parseCallbackQueue.length === 1) {
				this._finished = true;
			}
			if (parseCallbackQueue.length) {
				parseCallbackQueue.shift()();
			} else {
				parseOnWrite = true;
			}
		};

		this._addToParseQueue = function(chunk, callback)
		{
			// add to queue so that we can indicate
			// completion via callback
			// node will automatically pause the incoming stream
			// when too many items have been added without their
			// callback being invoked
			parseCallbackQueue.push(bindFunction(function() {
				this.parseChunk(typeof chunk === 'string' ? chunk : chunk.toString(config.encoding));
				if (isFunction(callback)) {
					return callback();
				}
			}, this));
			if (parseOnWrite) {
				parseOnWrite = false;
				this._nextChunk();
			}
		};

		this._onRead = function()
		{
			if (this._handle.paused()) {
				// the writeable consumer can handle more data
				// so resume the chunk parsing
				this._handle.resume();
			}
		};

		this._onWrite = function(chunk, encoding, callback)
		{
			this._addToParseQueue(chunk, callback);
		};

		this._onWriteComplete = function()
		{
			writeStreamHasFinished = true;
			// have to write empty string
			// so parser knows its done
			this._addToParseQueue('');
		};

		this.getStream = function()
		{
			return stream;
		};
		stream = new Duplex({
			readableObjectMode: true,
			decodeStrings: false,
			read: bindFunction(this._onRead, this),
			write: bindFunction(this._onWrite, this)
		});
		stream.once('finish', bindFunction(this._onWriteComplete, this));
	}
	if (typeof PAPA_BROWSER_CONTEXT === 'undefined') {
		DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
		DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;
	}


	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
		var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _rowCounter = 0;	// Number of rows that have been parsed so far
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
			var quoteChar = _config.quoteChar || '"';
			if (!_config.newline)
				_config.newline = guessLineEndings(input, quoteChar);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments);
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
			self.streamer.parseChunk(_input, true);
		};

		this.aborted = function()
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

		function testEmptyLine(s) {
			return _config.skipEmptyLines === 'greedy' ? s.join('').trim() === '' : s.length === 1 && s[0].length === 0;
		}

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (testEmptyLine(_results.data[i]))
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTypingAndTransformation();
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
				{
					var header = _results.data[i][j];

					if (_config.trimHeaders) {
						header = header.trim();
					}

					_fields.push(header);
				}
			_results.data.splice(0, 1);
		}

		function shouldApplyDynamicTyping(field) {
			// Cache function values to avoid calling it for each row
			if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
				_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
			}
			return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
		}

		function parseDynamic(field, value)
		{
			if (shouldApplyDynamicTyping(field))
			{
				if (value === 'true' || value === 'TRUE')
					return true;
				else if (value === 'false' || value === 'FALSE')
					return false;
				else if (FLOAT.test(value))
					return parseFloat(value);
				else if (ISO_DATE.test(value))
					return new Date(value);
				else
					return (value === '' ? null : value);
			}
			return value;
		}

		function applyHeaderAndDynamicTypingAndTransformation()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping && !_config.transform))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = _config.header ? {} : [];

				var j;
				for (j = 0; j < _results.data[i].length; j++)
				{
					var field = j;
					var value = _results.data[i][j];

					if (_config.header)
						field = j >= _fields.length ? '__parsed_extra' : _fields[j];

					if (_config.transform)
						value = _config.transform(value,field);

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
						addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
					else if (j < _fields.length)
						addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;

			_rowCounter += _results.data.length;
			return _results;
		}

		function guessDelimiter(input, newline, skipEmptyLines, comments)
		{
			var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					comments: comments,
					delimiter: delim,
					newline: newline,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					if (skipEmptyLines && testEmptyLine(preview.data[j]))
					{
						emptyLinesCount++;
						continue;
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
			};
		}

		function guessLineEndings(input, quoteChar)
		{
			input = input.substr(0, 1024 * 1024);	// max length 1 MB
			// Replace all the text inside quotes
			var re = new RegExp(escapeRegExp(quoteChar) + '([^]*?)' + escapeRegExp(quoteChar), 'gm');
			input = input.replace(re, '');

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

	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
	function escapeRegExp(string)
	{
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
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
		var quoteChar;
		/** Allows for no quoteChar by setting quoteChar to undefined in config */
		if (config.quoteChar === undefined) {
			quoteChar = '"';
		} else {
			quoteChar = config.quoteChar;
		}
		var escapeChar = quoteChar;
		if (config.escapeChar !== undefined) {
			escapeChar = config.escapeChar;
		}

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
		if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
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
					row = rows[i];
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
			var quoteCharRegex = new RegExp(escapeChar.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') + quoteChar, 'g');
			var quoteSearch;

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] === quoteChar)
				{
					// Start our search for the closing quote where the cursor is
					quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

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
						if (quoteSearch === inputLen - 1)
						{
							var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						// If the quote character is the escape character, then check if the next character is the escape character
						if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
						{
							quoteSearch++;
							continue;
						}

						// If the quote character is not the escape character, then check if the previous character was the escape character
						if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
						{
							continue;
						}

						// Check up to nextDelim or nextNewline, whichever is closest
						var checkUpTo = nextNewline === -1 ? nextDelim : Math.min(nextDelim, nextNewline);
						var spacesBetweenQuoteAndDelimiter = extraSpaces(checkUpTo);

						// Closing quote followed by delimiter or 'unnecessary spaces + delimiter'
						if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

						// Closing quote followed by newline or 'unnecessary spaces + newLine'
						if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, newlineLen) === newline)
						{
							row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
							saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
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
             * checks if there are extra spaces after closing quote and given index without any text
             * if Yes, returns the number of spaces
             */
			function extraSpaces(index) {
				var spaceLength = 0;
				if (index !== -1) {
					var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
					if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
						spaceLength = textBetweenClosingQuoteAndIndex.length;
					}
				}
				return spaceLength;
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
				data = [];
				errors = [];
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
		if (typeof obj !== 'object' || obj === null)
			return obj;
		var cpy = Array.isArray(obj) ? [] : {};
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

if ( true && module !== null && module.exports) module.exports = xmlToJSON;
else if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return xmlToJSON }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./adapters/adapters-config.json":
/*!***************************************!*\
  !*** ./adapters/adapters-config.json ***!
  \***************************************/
/*! exports provided: morphology, lexicon, lemmatranslation, default */
/***/ (function(module) {

module.exports = {"morphology":{"alpheiosTreebank":{"adapter":"tbAdapter","methods":["getHomonym"],"params":{"getHomonym":["languageID","wordref"]}},"tufts":{"adapter":"maAdapter","methods":["getHomonym"],"params":{"getHomonym":["languageID","word"]}}},"lexicon":{"alpheios":{"adapter":"lexicons","methods":["fetchShortDefs","fetchFullDefs"],"params":{"fetchShortDefs":["homonym","opts"],"fetchFullDefs":["homonym","opts"]}}},"lemmatranslation":{"alpheios":{"adapter":"lemmaTranslations","methods":"fetchTranslations","params":{"fetchTranslations":["homonym","browserLang"]}}}};

/***/ }),

/***/ "./adapters/alpheiostb/adapter.js":
/*!****************************************!*\
  !*** ./adapters/alpheiostb/adapter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/alpheiostb/config.json */ "./adapters/alpheiostb/config.json");
var _adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/alpheiostb/config.json */ "./adapters/alpheiostb/config.json", 1);
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! xmltojson */ "../node_modules/xmltojson/lib/xmlToJSON.js");
/* harmony import */ var xmltojson__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xmltojson__WEBPACK_IMPORTED_MODULE_3__);






class AlpheiosTreebankAdapter extends _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__)
    this.models = { 'lat': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LatinLanguageModel"], 'grc': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["GreekLanguageModel"] }
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(word)
    if (!url) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_NO_URL'].get(word))
      return
    }
    try {
      if (url) {
        let res = await this.fetch(url, { type: 'xml' })

        if (res.constructor.name === 'AdapterError') {
          return
        }

        if (res) {
          let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)

          let jsonObj = xmltojson__WEBPACK_IMPORTED_MODULE_3___default.a.parseString(res)
          jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } }

          let homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text)
          return homonym
        } else {
          this.addError(this.l10n.messages['MORPH_TREEBANK_NO_ANSWER_FOR_WORD'].get(word))
        }
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
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

    let features = this.config.featuresArray
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

/***/ "./adapters/alpheiostb/config.json":
/*!*****************************************!*\
  !*** ./adapters/alpheiostb/config.json ***!
  \*****************************************/
/*! exports provided: texts, url, providerUri, providerRights, allowUnknownValues, featuresArray, default */
/***/ (function(module) {

module.exports = {"texts":["1999.01.0021","1999.01.0135","1999.02.0066","phi0959.phi006.alpheios-text-lat1","tlg0011.tlg003.alpheios-text-grc1","tlg0012.tlg001.alpheios-text-grc1","tlg0012.tlg002.alpheios-text-grc1","tlg0020.tlg001.alpheios-text-grc1","tlg0020.tlg002.alpheios-text-grc1","tlg0020.tlg003.alpheios-text-grc1","tlg0085.tlg001.alpheios-text-grc1","tlg0085.tlg002.alpheios-text-grc1","tlg0085.tlg003.alpheios-text-grc1","tlg0085.tlg004.alpheios-text-grc1","tlg0085.tlg005.alpheios-text-grc1","tlg0085.tlg006.alpheios-text-grc1","tlg0085.tlg007.alpheios-text-grc1","tlg0086.tlg034.alpheios-text-ara2"],"url":"http://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq?f=r_TEXT&w=r_WORD&clientId=r_CLIENT","providerUri":"https://alpheios.net","providerRights":"The Alpheios Treebank data is licenced under the Creative Commons 3.0 Share-Alike license.","allowUnknownValues":true,"featuresArray":[["pofs","part",true],["case","grmCase",false],["num","number",false],["gend","gender",false],["voice","voice",false],["mood","mood",false],["pers","person",false],["comp","comparison",false]]};

/***/ }),

/***/ "./adapters/base-adapter.js":
/*!**********************************!*\
  !*** ./adapters/base-adapter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _errors_adapter_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/errors/adapter-error */ "./errors/adapter-error.js");
/* harmony import */ var _l10n_l10n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/l10n/l10n */ "./l10n/l10n.js");
/* harmony import */ var _locales_locales_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/locales/locales.js */ "./locales/locales.js");
/* harmony import */ var _locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/locales/en-us/messages.json */ "./locales/en-us/messages.json");
var _locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/locales/en-us/messages.json */ "./locales/en-us/messages.json", 1);
/* harmony import */ var _locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/locales/en-gb/messages.json */ "./locales/en-gb/messages.json");
var _locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/locales/en-gb/messages.json */ "./locales/en-gb/messages.json", 1);








class BaseAdapter {
  constructor () {
    this.errors = []
    this.l10n = new _l10n_l10n__WEBPACK_IMPORTED_MODULE_2__["default"]()
      .addMessages(_locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_4__, _locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_US)
      .addMessages(_locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_5__, _locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_GB)
      .setLocale(_locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_US)
  }

  addError (message) {
    let error = new _errors_adapter_error__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.category, this.config.adapterName, this.config.method, message)
    this.errors.push(error)
  }

  uploadConfig (config, defaultConfig) {
    let configRes = {}
    Object.keys(config).forEach(configKey => {
      configRes[configKey] = config[configKey]
    })

    Object.keys(defaultConfig).forEach(configKey => {
      if (configRes[configKey] === undefined) {
        configRes[configKey] = defaultConfig[configKey]
      }
    })

    return configRes
  }

  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async fetchWindow (url, options = { type: 'json' }) {
    if (url) {
      try {
        let response = await window.fetch(url)
        if (!response.ok) {
          this.addError(this.l10n.messages['BASIC_ADAPTER_URL_RESPONSE_FAILED'].get(response.status, response.statusText))
          return
        }
        if (options.type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }

  fetchWindowTimeout (url, options) {
    if (url) {
      let didTimeOut = false
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          didTimeOut = true
          reject(new Error('Request timed out', url))
        }, options.timeout)

        window.fetch(url)
          .then((response) => {
            clearTimeout(timeout)
            if (!didTimeOut) {
              console.log('fetch good! ', response)
              resolve(response)
            }
          })
          .catch((err) => {
            console.log('fetch failed! ', err)
            // Rejection already happened with setTimeout
            if (didTimeOut) return
            // Reject with error
            reject(err)
          })
      })
    }
  }

  async fetchAxios (url, options) {
    try {
      let res
      if (options && options.timeout > 0) {
        res = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(encodeURI(url), { timeout: options.timeout })
      } else {
        res = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(encodeURI(url))
      }
      return res.data
    } catch (error) {
      this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
    }
  }

  async fetch (url, options) {
    let res

    try {
      if (typeof window !== 'undefined') {
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
      this.addError(this.l10n.messages['BASIC_ADAPTER_UNKNOWN_ERROR'].get(error.message))
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BaseAdapter);


/***/ }),

/***/ "./adapters/lexicons/adapter.js":
/*!**************************************!*\
  !*** ./adapters/lexicons/adapter.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! papaparse */ "../node_modules/papaparse/papaparse.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/adapters/lexicons/config.json */ "./adapters/lexicons/config.json");
var _adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/lexicons/config.json */ "./adapters/lexicons/config.json", 1);






let cachedDefinitions = new Map()

class AlpheiosLexiconsAdapter extends _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
    this.data = null
  }

  async fetchShortDefs (homonym, options = {}) {
    let res = await this.fetchDefinitions(homonym, options, 'short')
    return res
  }

  async fetchFullDefs (homonym, options = {}) {
    let res = await this.fetchDefinitions(homonym, options, 'full')
    return res
  }

  async fetchDefinitions (homonym, options, lookupFunction) {
    Object.assign(this.options, options)
    if (!this.options.allow || this.options.allow.length === 0) {
      this.addError(this.l10n.messages['LEXICONS_NO_ALLOWED_URL'])
      return
    }
    let languageID = homonym.lexemes[0].lemma.languageID
    let urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    let defRes = false
    for (let urlKey of urlKeys) {
      if (lookupFunction === 'short') {
        let url = this.config[urlKey].urls.short
        let res = await this.checkCachedData(url)
        if (!res) {
          continue
        }
        res = await this.updateShortDefs(languageID, cachedDefinitions.get(url), homonym, this.config[urlKey])

        defRes = defRes || res
      }
      if (lookupFunction === 'full') {
        let url = this.config[urlKey].urls.index
        await this.checkCachedData(url)
        let fullDefsRequests = this.collectFullDefURLs(languageID, cachedDefinitions.get(url), homonym, this.config[urlKey])
        if (fullDefsRequests) {
          let res = await this.updateFullDefs(fullDefsRequests, this.config[urlKey])
          defRes = defRes || res
        }
      }
    }
    return defRes
  }

  async checkCachedData (url) {
    if (!cachedDefinitions.has(url)) {
      try {
        let unparsed = await this.fetch(url, { type: 'xml', timeout: this.options.timeout })
        let parsed = papaparse__WEBPACK_IMPORTED_MODULE_1___default.a.parse(unparsed, { quoteChar: '\u{0000}', delimiter: '|' })
        let data = this.fillMap(parsed.data)
        cachedDefinitions.set(url, data)
      } catch (error) {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
        return false
      }
    }
    return true
  }

  async updateShortDefs (languageID, data, homonym, config) {
    let model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageModel(languageID)
    let finalRes = false

    for (let lexeme of homonym.lexemes) {
      let deftexts = this.lookupInDataIndex(data, lexeme.lemma, model)

      if (deftexts) {
        for (let d of deftexts) {
          try {
            let def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](d, config.langs.target, 'text/plain', lexeme.lemma.word)
            let definition = await alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(this.provider, def)
            lexeme.meaning['appendShortDefs'](definition)
            finalRes = true
          } catch (error) {
            this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
            continue
          }
        }
      }
    }

    return finalRes
  }

  collectFullDefURLs (languageID, data, homonym, config) {
    let model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageModel(languageID)
    let urlFull = config.urls.full

    if (!urlFull) {
      this.addError(this.l10n.messages['LEXICONS_NO_FULL_URL'])
      return
    }

    let requests = []
    for (let lexeme of homonym.lexemes) {
      let ids = this.lookupInDataIndex(data, lexeme.lemma, model)
      if (urlFull && ids) {
        for (let id of ids) {
          requests.push({ url: `${urlFull}&n=${id}`, lexeme: lexeme })
        }
      } else if (urlFull) {
        requests.push({ url: `${urlFull}&l=${lexeme.lemma.word}`, lexeme: lexeme })
      }
    }
    return requests
  }

  async updateFullDefs (fullDefsRequests, config) {
    let finalRes = false

    for (let request of fullDefsRequests) {
      let fullDefData = await this.fetch(request.url, { type: 'xml' })
      if (!fullDefData) {
        this.addError(this.l10n.messages['LEXICONS_NO_DATA_FROM_URL'].get(request.url))
        continue
      }
      try {
        let def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
        let definition = await alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(this.provider, def)
        request.lexeme.meaning['appendFullDefs'](definition)
        finalRes = true
      } catch (error) {
        this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
        continue
      }
    }

    return finalRes
  }

  getRequests (languageID) {
    let languageCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
    return Object.keys(this.config).filter(url => this.config[url].langs && this.config[url].langs.source === languageCode)
  }

  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  fillMap (rows) {
    let data = new Map()
    for (let row of rows) {
      if (data.has(row[0])) {
        data.get(row[0]).push(row[1])
      } else {
        data.set(row[0], [ row[1] ])
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
    let altEncodings = []
    for (let l of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l)
      for (let a of model.alternateWordEncodings(l)) {
        // we gather altEncodings separately because they should
        // be tried last after the lemma and principalParts in their
        // original form
        altEncodings.push(a)
      }
      let nosense = l.replace(/_?\d+$/, '')
      if (l !== nosense) {
        alternatives.push(nosense)
      }
    }
    alternatives = [...alternatives, ...altEncodings]

    for (let lookup of alternatives) {
      found = data.get(lookup.toLocaleLowerCase())
      if (found && found.length === 1 && found[0] === '@') {
        found = data.get(`@${lookup}`)
      }
      if (found) {
        break
      }
    }
    return found
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AlpheiosLexiconsAdapter);


/***/ }),

/***/ "./adapters/lexicons/config.json":
/*!***************************************!*\
  !*** ./adapters/lexicons/config.json ***!
  \***************************************/
/*! exports provided: https://github.com/alpheios-project/lsj, https://github.com/alpheios-project/aut, https://github.com/alpheios-project/ml, https://github.com/alpheios-project/as, https://github.com/alpheios-project/dod, https://github.com/alpheios-project/ls, https://github.com/alpheios-project/lan, https://github.com/alpheios-project/sal, https://github.com/alpheios-project/stg, default */
/***/ (function(module) {

module.exports = {"https://github.com/alpheios-project/lsj":{"urls":{"short":"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat","index":"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html"},"langs":{"source":"grc","target":"en"},"description":"\"A Greek-English Lexicon\" (Henry George Liddell, Robert Scott)","rights":"\"A Greek-English Lexicon\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University."},"https://github.com/alpheios-project/aut":{"urls":{"short":"https://repos1.alpheios.net/lexdata/aut/dat/grc-aut-defs.dat","index":"https://repos1.alpheios.net/lexdata/aut//dat/grc-aut-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=aut&lg=grc&out=html"},"langs":{"source":"grc","target":"en"},"description":"\"Autenrieth Homeric Dictionary\" (Geoerge Autenrieth)","rights":"\"Autenrieth Homeric Dictionary\" (Geoerge Autenrieth). Provided by the Perseus Digital Library at Tufts University"},"https://github.com/alpheios-project/ml":{"urls":{"short":"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-defs.dat","index":"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ml&lg=grc&out=html"},"langs":{"source":"grc","target":"en"},"description":"\"Middle Liddell\"","rights":"\"An Intermediate Greek-English Lexicon\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University"},"https://github.com/alpheios-project/as":{"urls":{"short":"https://repos1.alpheios.net/lexdata/as/dat/grc-as-defs.dat","index":"https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=as&lg=grc&out=html"},"langs":{"source":"grc","target":"en"},"description":"\"A Manual Greek Lexicon of the New Testament\"","rights":"\"A Manual Greek Lexicon of the New Testament\" (G. Abbott-Smith). Provided by biblicalhumanities.org."},"https://github.com/alpheios-project/dod":{"urls":{"short":"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-defs.dat","index":"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-ids.dat","full":null},"langs":{"source":"grc","target":"en"},"description":"\"Dodson\"","rights":"\"A Public Domain lexicon by John Jeffrey Dodson (2010)\". Provided by biblicalhumanities.org."},"https://github.com/alpheios-project/ls":{"urls":{"short":null,"index":"https://repos1.alpheios.net/lexdata/ls/dat/lat-ls-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html"},"langs":{"source":"lat","target":"en"},"description":"\"A Latin Dictionary\" (Charlton T. Lewis, Charles Short)","rights":"\"A Latin Dictionary\" (Charlton T. Lewis, Charles Short). Provided by the Perseus Digital Library at Tufts University."},"https://github.com/alpheios-project/lan":{"urls":{"short":null,"index":"https://repos1.alpheios.net/lexdata/lan/dat/ara-lan-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lan&lg=ara&out=html"},"langs":{"source":"ara","target":"en"},"description":"\"The Arabic-English Lexicon\" (Edward Lane)","rights":"\"The Arabic-English Lexicon\" (Edward Lane). Provided by the Perseus Digital Library at Tufts University."},"https://github.com/alpheios-project/sal":{"urls":{"short":null,"index":"https://repos1.alpheios.net/lexdata/sal/dat/ara-sal-ids.dat","full":"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=html"},"langs":{"source":"ara","target":"en"},"description":"\"An Advanced Learner's Arabic Dictionary\" (H. Anthony Salmone)","rights":"\"An Advanced Learner's Arabic Dictionary\" (H. Anthony Salmone). Provided by the Perseus Digital Library at Tufts University."},"https://github.com/alpheios-project/stg":{"urls":{"short":"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-defs.dat","index":"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-ids.dat","full":null},"langs":{"source":"per","target":"en"},"description":"\"A Comprehensive Persian-English Dictionary\" (Francis Joseph Steingass)","rights":"\"A Comprehensive Persian-English Dictionary\" (Francis Joseph Steingass). Provided by the Center for Advanced Study of Language (CASL) at the University of Maryland, College Park."}};

/***/ }),

/***/ "./adapters/translations/adapter.js":
/*!******************************************!*\
  !*** ./adapters/translations/adapter.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapters/translations/config.json */ "./adapters/translations/config.json");
var _adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/translations/config.json */ "./adapters/translations/config.json", 1);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/base-adapter */ "./adapters/base-adapter.js");





class AlpheiosLemmaTranslationsAdapter extends _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.mapLangUri = {}
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["ResourceProvider"](this.config.url, this.config.rights)
  }

  async getTranslationsList (homonym, browserLang) {
    let lemmaList = []
    for (let lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma)
    }

    const inLang = alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["LanguageModelFactory"].getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID)
    let outLang = this.config.langMap[browserLang] || this.config.defaultLang

    let input = this.prepareInput(lemmaList)
    if (!input) {
      this.addError(this.l10n.messages['TRANSLATION_INPUT_PREPARE_ERROR'].get(input.toString()))
      return
    }

    try {
      let urlLang = await this.getAvailableResLang(inLang, outLang)

      if (urlLang && urlLang.constructor.name === 'AdapterError') {
        return
      }

      if (input && urlLang) {
        try {
          let url = urlLang + '?input=' + input
          let translationsList = await this.fetch(url)

          if (translationsList && translationsList.constructor.name === 'AdapterError') {
            return
          }

          for (let lemma of lemmaList) {
            alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["Translation"].loadTranslations(lemma, outLang, translationsList, this.provider)
          }
        } catch (error) {
          this.addError(this.l10n.messages['TRANSLATION_UNKNOWN_ERROR'].get(error.message))
        }
      }
    } catch (error) {
      this.addError(this.l10n.messages['TRANSLATION_UNKNOWN_ERROR'].get(error.message))
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

      if (unparsed && unparsed.constructor.name === 'AdapterError') {
        return unparsed
      }

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

/***/ "./adapters/translations/config.json":
/*!*******************************************!*\
  !*** ./adapters/translations/config.json ***!
  \*******************************************/
/*! exports provided: url, availableLangSource, rights, deafultLang, langMap, default */
/***/ (function(module) {

module.exports = {"url":"https://ats.alpheios.net","availableLangSource":["lat"],"rights":"Lemma translatins are extracted from data provided under the GNU GPL v3 license by the Collatinus Project (https://github.com/biblissima/collatinus), which is developed and maintained by Yves Ouvrard and Philippe Verkerk.","deafultLang":"eng","langMap":{"en-US":"eng","it":"ita","pt":"por","ca":"cat","fr":"fre","de":"ger","es":"spa"}};

/***/ }),

/***/ "./adapters/tufts/adapter.js":
/*!***********************************!*\
  !*** ./adapters/tufts/adapter.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/adapters/base-adapter */ "./adapters/base-adapter.js");
/* harmony import */ var _adapters_tufts_transform_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/tufts/transform-adapter */ "./adapters/tufts/transform-adapter.js");
/* harmony import */ var _adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/adapters/tufts/config.json */ "./adapters/tufts/config.json");
var _adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/tufts/config.json */ "./adapters/tufts/config.json", 1);
/* harmony import */ var _adapters_tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/adapters/tufts/engines-set */ "./adapters/tufts/engines-set.js");








class AlpheiosTuftsAdapter extends _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.uploadEngines(this.config.engine)
    this.engineSet = new _adapters_tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__["default"](this.engines)
  }

  uploadEngines (engineConfig) {
    if (this.engine === undefined) {
      this.engines = {}
    }
    Object.keys(engineConfig).forEach(langCode => {
      let langID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageIdFromCode(langCode)

      if (langID !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_UNDEFINED && this.engines[langID] === undefined) {
        this.engines[langID] = engineConfig[langCode]
      }
    })
  }

  async getHomonym (languageID, word) {
    let url = this.prepareRequestUrl(languageID, word)
    if (!url) {
      this.addError(this.l10n.messages['MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE'].get(languageID.toString()))
      return
    }
    try {
      let res = await this.fetch(url)
      if (res.constructor.name === 'AdapterError') {
        return
      }
      if (res) {
        let transformAdapter = new _adapters_tufts_transform_adapter__WEBPACK_IMPORTED_MODULE_2__["default"](this.engineSet, this.config)

        let homonym = transformAdapter.transformData(res, word)

        if (!homonym) {
          this.addError(this.l10n.messages['MORPH_TUFTS_NO_HOMONYM'].get(word, languageID.toString()))
          return
        }

        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"].getSortByTwoLemmaFeatures(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.frequency, alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part))
        }

        return homonym
      } else {
        return
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TUFTS_UNKNOWN_ERROR'].get(error.mesage))
    }
  }

  prepareRequestUrl (languageID, word) {
    let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
    let engine = this.engineSet.getEngineByCode(languageID)

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

/***/ "./adapters/tufts/config.json":
/*!************************************!*\
  !*** ./adapters/tufts/config.json ***!
  \************************************/
/*! exports provided: engine, url, allowUnknownValues, featuresArray, featuresArrayAll, default */
/***/ (function(module) {

module.exports = {"engine":{"lat":["whitakerLat"],"grc":["morpheusgrc"],"ara":["aramorph"],"per":["hazm"],"gez":["traces"]},"url":"https://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG&clientId=r_CLIENT","allowUnknownValues":true,"featuresArray":[["pofs","part"],["case","grmCase"],["gend","gender"],["decl","declension"],["conj","conjugation"],["area","area"],["age","age"],["geo","geo"],["freq","frequency"],["note","note"],["pron","pronunciation"],["kind","kind"],["src","source"]],"featuresArrayAll":[["pofs","part"],["case","grmCase"],["gend","gender"],["decl","declension"],["conj","conjugation"],["num","number"],["tense","tense"],["voice","voice"],["mood","mood"],["pers","person"],["comp","comparison"],["stemtype","stemtype"],["derivtype","derivtype"],["dial","dialect"],["morph","morph"]]};

/***/ }),

/***/ "./adapters/tufts/engine/aramorph.js":
/*!*******************************************!*\
  !*** ./adapters/tufts/engine/aramorph.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./adapters/tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["ArabicLanguageModel"], 'aramorph')

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./adapters/tufts/engine/hazm.js":
/*!***************************************!*\
  !*** ./adapters/tufts/engine/hazm.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./adapters/tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["PersianLanguageModel"], 'hazm')

// hazm allow all lemmas in without respect features as all we use it for is lemmatizing
data.setLexemeFilter(function (lexeme) { return Boolean(lexeme.lemma.word) })

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./adapters/tufts/engine/morpheusgrc.js":
/*!**********************************************!*\
  !*** ./adapters/tufts/engine/morpheusgrc.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./adapters/tufts/lib.js");
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

/***/ "./adapters/tufts/engine/traces.js":
/*!*****************************************!*\
  !*** ./adapters/tufts/engine/traces.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./adapters/tufts/lib.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__);



let data = new _lib__WEBPACK_IMPORTED_MODULE_0__["default"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["GeezLanguageModel"], 'traces')

/* harmony default export */ __webpack_exports__["default"] = (data);


/***/ }),

/***/ "./adapters/tufts/engine/whitakers.js":
/*!********************************************!*\
  !*** ./adapters/tufts/engine/whitakers.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./adapters/tufts/lib.js");
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

/***/ "./adapters/tufts/engines-set.js":
/*!***************************************!*\
  !*** ./adapters/tufts/engines-set.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapters_tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapters/tufts/engine/whitakers */ "./adapters/tufts/engine/whitakers.js");
/* harmony import */ var _adapters_tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/adapters/tufts/engine/morpheusgrc */ "./adapters/tufts/engine/morpheusgrc.js");
/* harmony import */ var _adapters_tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/tufts/engine/aramorph */ "./adapters/tufts/engine/aramorph.js");
/* harmony import */ var _adapters_tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/adapters/tufts/engine/hazm */ "./adapters/tufts/engine/hazm.js");
/* harmony import */ var _adapters_tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/adapters/tufts/engine/traces */ "./adapters/tufts/engine/traces.js");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_5__);








class EnginesSet {
  constructor (adapterConfigEngines) {
    this.engine = adapterConfigEngines
  }

  getEngineByCode (languageID) {
    if (this.engine[languageID]) {
      let engineCode = this.engine[languageID][0]
      let allEngines = new Map(([ _adapters_tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__["default"], _adapters_tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__["default"], _adapters_tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__["default"], _adapters_tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__["default"], _adapters_tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__["default"] ]).map((e) => { return [ e.engine, e ] }))
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

/***/ "./adapters/tufts/lib.js":
/*!*******************************!*\
  !*** ./adapters/tufts/lib.js ***!
  \*******************************/
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

/***/ "./adapters/tufts/transform-adapter.js":
/*!*********************************************!*\
  !*** ./adapters/tufts/transform-adapter.js ***!
  \*********************************************/
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

  extractData (source, nameParam) {
    let schema = {
      'providerUri': [ 'RDF', 'Annotation', 'creator', 'Agent', 'about' ],
      'providerRights': [ 'RDF', 'Annotation', 'rights', '$' ],
      'inflections': [ 'rest', 'entry', 'infl' ],
      'dictData': [ 'rest', 'entry', 'dict' ]
    }
    let res

    if (schema[nameParam]) {
      res = source
      for (let pathPart of schema[nameParam]) {
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

  collectHdwdArray (data, term, direction) {
    let hdwd = []

    if (data && !Array.isArray(data) && !data.hdwd && term) {
      hdwd.push(term.prefix ? term.prefix.$ : '')
      hdwd.push(term.stem ? term.stem.$ : '')
      hdwd.push(term.suff ? term.suff.$ : '')

      if (direction === alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_DIR_RTL) {
        hdwd.reverse()
      }
    }

    return hdwd
  }

  defineLanguage (data, term) {
    let lemmaData = Array.isArray(data) ? data[0] : data
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {}
      lemmaData.hdwd.lang = term.lang
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang
  }

  transformData (jsonObj, targetWord) {
    let lexemes = []
    let annotationBody = this.checkToBeArray(jsonObj.RDF.Annotation.Body)

    let providerUri = this.extractData(jsonObj, 'providerUri')
    let providerRights = this.extractData(jsonObj, 'providerRights')

    let provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](providerUri, providerRights)

    for (let lexeme of annotationBody) {
      let inflectionsJSON = this.checkToBeArray(this.extractData(lexeme, 'inflections'))
      let inflectionsJSONTerm = inflectionsJSON.length > 0 ? inflectionsJSON[0].term : undefined

      let dictData = this.extractData(lexeme, 'dictData')

      let lemmaElements = this.checkToBeArray(dictData, inflectionsJSONTerm ? [ inflectionsJSONTerm ] : [])
      let language = this.defineLanguage(dictData, inflectionsJSONTerm)
      if (!language) {
        console.log(`************************No language found`)
        continue
      }

      // Get importer based on the language
      let mappingData = this.engineSet.getEngineByCodeFromLangCode(language)
      if (!mappingData) {
        console.log(`************************No mapping data found for ${language}`)
        continue
      }

      let reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, mappingData.model.direction)
      if (reconstructHdwd.length > 0) {
        lemmaElements[0].hdwd.$ = reconstructHdwd.join('')
      }

      let lemmas = []
      let lexemeSet = []

      for (let entry of lemmaElements.entries()) {
        let index = entry[0]
        let elem = entry[1]

        let lemmaText = elem.hdwd ? elem.hdwd.$ : undefined
        if (!lemmaText) {
          console.log('************************No lemma or language found')
          continue
        }
        let lemma = mappingData.parseLemma(lemmaText, language)
        lemmas.push(lemma)

        let features = this.config.featuresArray
        for (let feature of features) {
          mappingData.mapFeature(lemma, elem, ...feature, this.config.allowUnknownValues)
        }

        let shortdefs = []
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
      let aggregated = mappingData.aggregateLexemes(lexemeSet, inflections)
      lexemes.push(...aggregated)
    }
    if (lexemes.length > 0) {
      return new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Homonym"](lexemes, targetWord)
    } else {
      return undefined
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TransformAdapter);


/***/ }),

/***/ "./client-adapters.js":
/*!****************************!*\
  !*** ./client-adapters.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapters_tufts_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapters/tufts/adapter */ "./adapters/tufts/adapter.js");
/* harmony import */ var _adapters_alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/adapters/alpheiostb/adapter */ "./adapters/alpheiostb/adapter.js");
/* harmony import */ var _adapters_translations_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/adapters/translations/adapter */ "./adapters/translations/adapter.js");
/* harmony import */ var _adapters_lexicons_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/adapters/lexicons/adapter */ "./adapters/lexicons/adapter.js");
/* harmony import */ var _errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/errors/wrong-method-error */ "./errors/wrong-method-error.js");
/* harmony import */ var _errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/errors/no-required-param-error */ "./errors/no-required-param-error.js");
/* harmony import */ var _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/adapters/adapters-config.json */ "./adapters/adapters-config.json");
var _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/adapters-config.json */ "./adapters/adapters-config.json", 1);










let cachedConfig = new Map()
let cachedAdaptersList = new Map()

class ClientAdapters {
  static init () {
    if (cachedConfig.size === 0) {
      for (let category in _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_6__) {
        let adapters = {}
        for (let adapterKey in _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_6__[category]) {
          let adapterData = _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_6__[category][adapterKey]

          adapters[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods,
            params: adapterData.params
          }
        }
        cachedConfig.set(category, adapters)
      }

      for (let key of cachedConfig.keys()) {
        let res = {}
        Object.keys(cachedConfig.get(key)).forEach(typeAdapter => {
          res[typeAdapter] = cachedConfig.get(key)[typeAdapter].adapter
        })

        cachedAdaptersList.set(key, res)
      }
    }
  }
  /*
  *  Additional abstraction layer for structuring adapters
  */
  static get morphology () {
    ClientAdapters.init()
    return cachedAdaptersList.get('morphology')
  }

  static get lexicon () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lexicon')
  }

  static get lemmatranslation () {
    ClientAdapters.init()
    return cachedAdaptersList.get('lemmatranslation')
  }

  static checkMethod (category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new _errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_4__["default"](category, adapterName, methodName)
    }
  }

  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        if (!params[paramName]) {
          throw new _errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_5__["default"](category, adapterName, methodName, paramName)
        }
      })
    }
  }

  static checkMethodParam (category, adapterName, options) {
    ClientAdapters.checkMethod(category, adapterName, options.method)
    ClientAdapters.checkParam(options.params, category, adapterName, options.method)
  }

  /*
   * it is used for getting data from morph adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.params.languageID Symbol - languageID value for the word
   * options.params.word String - target word for what we will receive morph data
*/

  static async maAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'tufts', options)

    let localMaAdapter = new _adapters_tufts_adapter__WEBPACK_IMPORTED_MODULE_0__["default"]({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method
    })

    if (options.method === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
    }
    return null
  }

  /*
   * it is used for getting data from treebank adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "getHomonym" - action that should be done wth the help of adapter
   * options.params.languageID Symbol - languageID value for the word
   * options.params.word String - target word for what we will receive morph data
*/

  static async tbAdapter (options) {
    ClientAdapters.checkMethodParam('morphology', 'alpheiosTreebank', options)

    let localTbAdapter = new _adapters_alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_1__["default"]({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method
    })
    if (options.method === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
    }
    return null
  }

  /*
   * it is used for getting data from translations adapter
   * @param {options} Object - object contains parametes:
   * options.method String - for now one value - "fetchTranslations" - action that should be done wth the help of adapter
   * options.params.lemmaList [Lemma] - languageID value for the word
   * options.params.inLang String - language code of the target word
   * options.params.browserLang - language for translations
*/
  static async lemmaTranslations (options) {
    ClientAdapters.checkMethodParam('lemmatranslation', 'alpheios', options)

    let localLemmasAdapter = new _adapters_translations_adapter__WEBPACK_IMPORTED_MODULE_2__["default"]({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
    }
    return null
  }

  /*
   * it is used for getting data from lexicons adapter
   * @param {options} Object - object contains parametes:
   * options.method String - action that should be done wth the help of adapter
   *      variants: fetchShortDefs
   * options.params.lemmaList [Lemma] - languageID value for the word
   * options.params.inLang String - language code of the target word
   * options.params.browserLang - language for translations
*/
  static async lexicons (options) {
    ClientAdapters.checkMethodParam('lexicon', 'alpheios', options)

    let localLexiconsAdapter = new _adapters_lexicons_adapter__WEBPACK_IMPORTED_MODULE_3__["default"]({
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method
    })

    if (options.method === 'fetchShortDefs') {
      let res = await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return { result: res, errors: localLexiconsAdapter.errors }
    }
    if (options.method === 'fetchFullDefs') {
      let res = await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return { result: res, errors: localLexiconsAdapter.errors }
    }
    return null
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ClientAdapters);


/***/ }),

/***/ "./errors/adapter-error.js":
/*!*********************************!*\
  !*** ./errors/adapter-error.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class AdapterError extends Error {
  constructor (category, adapterName, methodName, messageError) {
    let message = messageError
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName

    if (this.adapter && this.methodName) {
      this.message = `${this.message} (${this.adapter}.${this.methodName})`
    }
    Error.captureStackTrace(this, AdapterError)
  }

  update (config) {
    this.adapter = `${config.category}.${config.adapterName}`
    this.methodName = config.method

    this.message = `${this.message} (${this.adapter}.${this.methodName})`
    return this
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AdapterError);


/***/ }),

/***/ "./errors/no-required-param-error.js":
/*!*******************************************!*\
  !*** ./errors/no-required-param-error.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class NoRequiredParamError extends Error {
  constructor (category, adapterName, methodName, paramName) {
    let message = `There is no required parameter - ${paramName} for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.methodName = methodName
    this.paramName = paramName
    Error.captureStackTrace(this, NoRequiredParamError)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (NoRequiredParamError);


/***/ }),

/***/ "./errors/wrong-method-error.js":
/*!**************************************!*\
  !*** ./errors/wrong-method-error.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class WrongMethodError extends Error {
  constructor (category, adapterName, methodName) {
    let message = `Wrong method for ${category}.${adapterName} - ${methodName}`
    super(message)
    this.adapter = `${category}.${adapterName}`
    this.method = methodName
    Error.captureStackTrace(this, WrongMethodError)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (WrongMethodError);


/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: ClientAdapters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/client-adapters */ "./client-adapters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientAdapters", function() { return _client_adapters__WEBPACK_IMPORTED_MODULE_0__["default"]; });






/***/ }),

/***/ "./l10n/l10n.js":
/*!**********************!*\
  !*** ./l10n/l10n.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return L10n; });
/* harmony import */ var _message_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message-bundle */ "./l10n/message-bundle.js");


/**
 * Combines several message bundles of different locales.
 */
class L10n {
  constructor () {
    this.selectedLocale = undefined // A locale that currently selected
    this.bundles = new Map() // Maps message bundles to their locales
    return this
  }

  /**
   * Adds, or appends, one or several messages for a locale specified.
   * This method is chainable.
   * @param {string} messageJSON - Messages in a JSON string
   * @param {string} locale - A locale of the messages
   * @return {L10n} - Self reference (for chaining)
   */
  addMessages (messageJSON, locale) {
    let messageBundle
    if (this.bundles.has(locale)) {
      messageBundle = this.bundles.get(locale)
      messageBundle.appendFromJSON(messageJSON)
    } else {
      messageBundle = new _message_bundle__WEBPACK_IMPORTED_MODULE_0__["default"](messageJSON, locale)
      this.addMessageBundle(messageBundle)
    }
    return this
  }

  /**
   * Adds a message bundle to a L10n object. If selected locale is not set, sets it to the locale of the message bundle.
   * This function is chainable.
   * @param {MessageBundle} messageBundle - A message bundle that will be stored within an L10n object.
   * @return {L10n} - Returns self for chaining.
   */
  addMessageBundle (messageBundle) {
    this.bundles.set(messageBundle.locale, messageBundle)
    if (!this.selectedLocale) {
      this.setLocale(messageBundle.locale)
    }
    return this
  }

  /**
   * Returns an array of locales supported by the L10n object.
   * @return {string[]}
   */
  get locales () {
    return Array.from(this.bundles.keys())
  }

  /**
   * Returns a message bundle for a currently selected locale
   * @return {MessageBundle | undefined} A message bundle object or undefined if selectedLocale is not set
   */
  get bundle () {
    return this.bundles.get(this.selectedLocale)
  }

  /**
   *
   * @return {Object} - An object containing message objects as property values.
   * The name of the property is a message key.
   */
  get messages () {
    return this.bundles.has(this.selectedLocale) ? this.bundles.get(this.selectedLocale).messages : {}
  }

  /**
   * Sets, or switches a locale that is currently selected. If message bundle for such locale
   * does not exist, does nothing.
   * This method is chainable.
   * @param {string} locale - A locale to be set as currently selected.
   * @return {L10n} Reference to self for chaining
   */
  setLocale (locale) {
    if (this.bundles.has(locale)) {
      this.selectedLocale = locale
    } else {
      console.error(`Cannot set locale to "${locale}" because there is no message bundle for it`)
    }
    return this
  }
}


/***/ }),

/***/ "./l10n/message-bundle.js":
/*!********************************!*\
  !*** ./l10n/message-bundle.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MessageBundle; });
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message.js */ "./l10n/message.js");

// TODO: Deal with situations when message is not available, but is requested

/**
 * Combines messages with the same locale code into a single message bundle.
 */
class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   * @param {String} messagesJSON - Messages for a locale as a JSON string or as an object.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   */
  constructor (messagesJSON, locale) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!messagesJSON) {
      throw new Error('Message data is missing')
    }

    this._locale = locale
    /**
     * An object whose properties are messages. Each message has a get() method and,
     * if a message has any parameters, a format() method.
     * @type {{get: Function, [format]: Function}}
     */
    this.messages = {}

    let messages = (typeof messagesJSON === 'string') ? JSON.parse(messagesJSON) : messagesJSON
    this.append(messages)
  }

  /**
   * Appends a series of messages from a JSON string
   * @param {string} messagesJSON - A JSON string
   */
  appendFromJSON (messagesJSON) {
    let messages = JSON.parse(messagesJSON)
    this.append(messages)
  }

  /**
   * Appends a series of messages from an object. Object properties are message names, and
   * values are message objects.
   * @param {object} messages - An object containing messages.
   */
  append (messages) {
    for (const [key, messageObj] of Object.entries(messages)) {
      if (!this.hasOwnProperty(key)) {
        let message = new _message_js__WEBPACK_IMPORTED_MODULE_0__["default"](messageObj, this._locale)
        this[key] = message
        message.defineProperties(this.messages, key)
      } else {
        console.warn(`A key name "${key}" is reserved or already used. A message will be ignored"`)
      }
    }
  }

  /**
   * Returns a (formatted) message for a message ID provided.
   * @param messageID - An ID of a message.
   * @param options - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
   */
  get (messageID, options = undefined) {
    if (this[messageID]) {
      if (typeof this[messageID].format === 'function') {
        return this[messageID].format(options)
      } else {
        return this[messageID]
      }
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


/***/ }),

/***/ "./l10n/message.js":
/*!*************************!*\
  !*** ./l10n/message.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Message; });
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! intl-messageformat */ "../node_modules/intl-messageformat/index.js");
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(intl_messageformat__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Represents a single message object
 */
class Message {
  /**
   * Creates a new Message object.
   * @param {object} message - A message object as read from JSON file.
   * @param {string} locale - A message's locale.
   */
  constructor (message, locale) {
    if (!locale) {
      throw new Error('Locale data is missing')
    }
    if (!message) {
      throw new Error('Message data is missing')
    }

    this.locale = locale
    for (const key of Object.keys(message)) {
      this[key] = message[key]
    }

    this.formatFunc = new intl_messageformat__WEBPACK_IMPORTED_MODULE_0___default.a(message.message, this.locale)
  }

  /**
   * Whether this message has any parameters or not.
   * @return {boolean} True if message has any parameters, false otherwise.
   */
  get hasParameters () {
    return !!(this.params && Array.isArray(this.params) && this.params.length > 0)
  }

  /**
   * Defines getter methods on an object of messages.
   * @param {object} messages - On object where messages will be stored. Each property corresponds to a message key.
   *        Each property will have a getter function defined (will return a formatted message), and,
   *        for messages with parameters, a format(function).
   *        `messages` object usually comes from a MessageBundle object.
   * @param {string} key - A message key, a name of a message.
   * @return {undefined} Has no return value.
   */
  defineProperties (messages, key) {
    let self = this

    if (this.hasParameters) {
      messages[key] = {
        format (options) {
          return self.formatFunc.format(options)
        },
        get (...options) {
          let params = {}
          // TODO: Add checks
          for (let [index, param] of self.params.entries()) {
            params[param] = options[index]
          }
          return self.formatFunc.format(params)
        }
      }
    } else {
      Object.defineProperty(messages, key, {
        get () {
          return self.formatFunc.format()
        },
        enumerable: true,
        configurable: true // So it can be deleted
      })
    }
  }
}


/***/ }),

/***/ "./locales/en-gb/messages.json":
/*!*************************************!*\
  !*** ./locales/en-gb/messages.json ***!
  \*************************************/
/*! exports provided: COOKIE_TEST_MESSAGE, NUM_LINES_TEST_MESSAGE, default */
/***/ (function(module) {

module.exports = {"COOKIE_TEST_MESSAGE":{"message":"This is a test message about a biscuit.","description":"A test message that is shown in a panel","component":"Panel"},"NUM_LINES_TEST_MESSAGE":{"message":"There {numLines, plural, =0 {are no queues} =1 {is one queue} other {are # queues}}.","description":"A test message that is shown in a panel","component":"Panel","params":["numLines"]}};

/***/ }),

/***/ "./locales/en-us/messages.json":
/*!*************************************!*\
  !*** ./locales/en-us/messages.json ***!
  \*************************************/
/*! exports provided: COOKIE_TEST_MESSAGE, NUM_LINES_TEST_MESSAGE, MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE, MORPH_TUFTS_NO_HOMONYM, MORPH_TUFTS_NO_ANSWER_FOR_WORD, MORPH_TUFTS_UNKNOWN_ERROR, BASIC_ADAPTER_NO_DATA_FROM_URL, BASIC_ADAPTER_EMPTY_URL, BASIC_ADAPTER_UNKNOWN_ERROR, BASIC_ADAPTER_URL_RESPONSE_FAILED, MORPH_TREEBANK_NO_URL, MORPH_TREEBANK_NO_ANSWER_FOR_WORD, MORPH_TREEBANK_UNKNOWN_ERROR, TRANSLATION_INPUT_PREPARE_ERROR, TRANSLATION_UNKNOWN_ERROR, LEXICONS_NO_ALLOWED_URL, LEXICONS_FAILED_CACHED_DATA, LEXICONS_FAILED_APPEND_DEFS, LEXICONS_NO_FULL_URL, LEXICONS_NO_DATA_FROM_URL, default */
/***/ (function(module) {

module.exports = {"COOKIE_TEST_MESSAGE":{"message":"This is a test message about a cookie.","description":"A test message that is shown in a panel","component":"Panel"},"NUM_LINES_TEST_MESSAGE":{"message":"There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.","description":"A test message that is shown in a panel","component":"Panel","params":["numLines"]},"MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE":{"message":"There is no engine for the given languageID {languageID}","description":"Error message for morphology.tufts adapter - when no engine is found for given languageID","component":"morphology.tufts","params":["languageID"]},"MORPH_TUFTS_NO_HOMONYM":{"message":"There is no homonym for the given word - {word} and languageID {languageID}","description":"Error message for morphology.tufts adapter - when no homonym was returned from the source","component":"morphology.tufts","params":["word","languageID"]},"MORPH_TUFTS_NO_ANSWER_FOR_WORD":{"message":"There is no data from the source for the given word - {word} and languageID {languageID}","description":"Error message for morphology.tufts adapter - when no data was returned from the source","component":"morphology.tufts","params":["word","languageID"]},"MORPH_TUFTS_UNKNOWN_ERROR":{"message":"Unknown error - {message}","description":"Error message for morph.tufts adapter - unknown","component":"morphology.tufts","params":["message"]},"BASIC_ADAPTER_NO_DATA_FROM_URL":{"message":"Unable to get data from url - {url}","description":"Error message for basic adapter - when no data was returned from the url","component":"basic_adapter","params":["url"]},"BASIC_ADAPTER_EMPTY_URL":{"message":"Unable to get data from empty url","description":"Error message for basic adapter - when empty url was given","component":"basic_adapter"},"BASIC_ADAPTER_UNKNOWN_ERROR":{"message":"Unknown error - {message}","description":"Error message for basic adapter - unknown","component":"basic_adapter","params":["message"]},"BASIC_ADAPTER_URL_RESPONSE_FAILED":{"message":"Request doesn't return data - {statusCode}: {statusText}","description":"Error message for basic adapter - unknown","component":"basic_adapter","params":["statusCode","statusText"]},"MORPH_TREEBANK_NO_URL":{"message":"There is a problem with creating url for the given word - {word}","description":"Error message for morph.treebank - no url for fetching data from treebank","component":"morph.treebank","params":["word"]},"MORPH_TREEBANK_NO_ANSWER_FOR_WORD":{"message":"There is no data from the source for the given word - {word}","description":"Error message for morphology.treebank adapter - when no data was returned from the source","component":"morphology.treebank","params":["word"]},"MORPH_TREEBANK_UNKNOWN_ERROR":{"message":"Unknown error - {message}","description":"Error message for morph.treebank adapter - unknown","component":"morphology.treebank","params":["message"]},"TRANSLATION_INPUT_PREPARE_ERROR":{"message":"Some problems with preparing input for geting translations - {input}","description":"Error message for lemmatranslation.alpheios adapter - problems with input","component":"lemmatranslation.alpheios","params":["input"]},"TRANSLATION_UNKNOWN_ERROR":{"message":"Unknown error - {message}","description":"Error message for lemmatranslation.alpheios adapter - unknown","component":"lemmatranslation.alpheios","params":["message"]},"LEXICONS_NO_ALLOWED_URL":{"message":"There are no allowed urls in the options","description":"Error message for lexicon.alpheios adapter - no urls were found in options","component":"lexicon.alpheios"},"LEXICONS_FAILED_CACHED_DATA":{"message":"There is a problem with catching data from lexicon source - {message}","description":"Error message for lexicon.alpheios adapter - some problems with getting cached data","component":"lexicon.alpheios","params":["message"]},"LEXICONS_FAILED_APPEND_DEFS":{"message":"There is a problem with updating definitions - {message}","description":"Error message for lexicon.alpheios adapter - some problems with updating definitions","component":"lexicon.alpheios","params":["message"]},"LEXICONS_NO_FULL_URL":{"message":"No full url is defined for definitions","description":"Error message for lexicon.alpheios adapter - no full url is defined","component":"lexicon.alpheios"},"LEXICONS_NO_DATA_FROM_URL":{"message":"No data recieved from url - {url}","description":"Error message for lexicon.alpheios adapter - no data from url","component":"lexicon.alpheios","params":["url"]}};

/***/ }),

/***/ "./locales/locales.js":
/*!****************************!*\
  !*** ./locales/locales.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en_us_messages_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en-us/messages.json */ "./locales/en-us/messages.json");
var _en_us_messages_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en-us/messages.json */ "./locales/en-us/messages.json", 1);
/* harmony import */ var _en_gb_messages_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en-gb/messages.json */ "./locales/en-gb/messages.json");
var _en_gb_messages_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./en-gb/messages.json */ "./locales/en-gb/messages.json", 1);



/* harmony default export */ __webpack_exports__["default"] = ({
  en_US: 'en-US',
  en_GB: 'en-GB',
  messages: {
    en_US: _en_us_messages_json__WEBPACK_IMPORTED_MODULE_0__,
    en_GB: _en_gb_messages_json__WEBPACK_IMPORTED_MODULE_1__
  }
});


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