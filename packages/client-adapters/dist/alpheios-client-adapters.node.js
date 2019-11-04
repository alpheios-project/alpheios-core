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

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var timer;
    var resolve = function resolve(value) {
      clearTimeout(timer);
      resolvePromise(value);
    };
    var reject = function reject(value) {
      clearTimeout(timer);
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

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
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
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

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
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
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement &&
                proxyElement.match(/\./g).length === parsed.hostname.match(/\./g).length) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
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
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

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
            stream.destroy();
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
            responseData = responseData.toString(config.responseEncoding);
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
    if (config.timeout) {
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
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
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

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

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
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
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
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
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


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");

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
  config.method = config.method ? config.method.toLowerCase() : 'get';

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

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

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

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
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

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
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
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/http.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
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
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

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
var isBuffer = __webpack_require__(/*! is-buffer */ "../node_modules/axios/node_modules/is-buffer/index.js");

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

/***/ "../node_modules/axios/node_modules/is-buffer/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/axios/node_modules/is-buffer/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "../node_modules/axios/package.json":
/*!******************************************!*\
  !*** ../node_modules/axios/package.json ***!
  \******************************************/
/*! exports provided: _args, _development, _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _spec, _where, author, browser, bugs, bundlesize, dependencies, description, devDependencies, homepage, keywords, license, main, name, repository, scripts, typings, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"axios@0.19.0\",\"/home/balmas/workspace/client-adapters\"]],\"_development\":true,\"_from\":\"axios@0.19.0\",\"_id\":\"axios@0.19.0\",\"_inBundle\":false,\"_integrity\":\"sha512-1uvKqKQta3KBxIz14F2v06AEHZ/dIoeKfbTRkK1E5oqjDnuEerLmYTgJB5AiQZHJcljpg1TuRzdjDR06qNk0DQ==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"axios@0.19.0\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"0.19.0\",\"saveSpec\":null,\"fetchSpec\":\"0.19.0\"},\"_requiredBy\":[\"#DEV:/\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.19.0.tgz\",\"_spec\":\"0.19.0\",\"_where\":\"/home/balmas/workspace/client-adapters\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"1.5.10\",\"is-buffer\":\"^2.0.2\"},\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"homepage\":\"https://github.com/axios/axios\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test && bundlesize\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"version\":\"0.19.0\"}");

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

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

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
v4.6.3
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

		var quoteCharRegex = new RegExp(escapeRegExp(_quoteChar), 'g');

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
						fieldCountPrevRow = 0;
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

				if ((typeof bestDelta === 'undefined' || delta > bestDelta)
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
			var quoteCharRegex = new RegExp(escapeRegExp(escapeChar) + escapeRegExp(quoteChar), 'g');
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
/*! exports provided: morphology, lexicon, lemmatranslation, wordusageExamples, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"morphology\":{\"alpheiosTreebank\":{\"adapter\":\"tbAdapter\",\"methods\":[\"getHomonym\"],\"params\":{\"getHomonym\":[\"languageID\",\"wordref\"]}},\"tufts\":{\"adapter\":\"maAdapter\",\"methods\":[\"getHomonym\"],\"params\":{\"getHomonym\":[\"languageID\",\"word\"]}}},\"lexicon\":{\"alpheios\":{\"adapter\":\"lexicons\",\"methods\":[\"fetchShortDefs\",\"fetchFullDefs\"],\"params\":{\"fetchShortDefs\":[\"homonym\",\"opts\"],\"fetchFullDefs\":[\"homonym\",\"opts\"]}}},\"lemmatranslation\":{\"alpheios\":{\"adapter\":\"lemmaTranslations\",\"methods\":\"fetchTranslations\",\"params\":{\"fetchTranslations\":[\"homonym\",\"browserLang\"]}}},\"wordusageExamples\":{\"concordance\":{\"adapter\":\"wordUsageExamples\",\"methods\":[\"getAuthorsWorks\",\"getWordUsageExamples\"],\"params\":{\"getAuthorsWorks\":[],\"getWordUsageExamples\":[\"homonym\"]}}}}");

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
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_alpheiostb_config_json__WEBPACK_IMPORTED_MODULE_2__)
    this.models = { 'lat': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LatinLanguageModel"], 'grc': alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["GreekLanguageModel"] }
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
    let server = this.prepareRequest(wordref)
    if (!server.url) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_NO_URL'].get(wordref))
      return
    }
    try {
      let res = await this.fetch(server.url, { type: 'xml' })

      if (res.constructor.name === 'AdapterError') {
        return
      }

      if (res) {
        let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)

        let jsonObj = xmltojson__WEBPACK_IMPORTED_MODULE_3___default.a.parseString(res)
        jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } }

        let homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text, server.config)
        return homonym
      } else {
        this.addError(this.l10n.messages['MORPH_TREEBANK_NO_ANSWER_FOR_WORD'].get(wordref))
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TREEBANK_UNKNOWN_ERROR'].get(error.mesage))
    }
  }

  /**
   * This method prepares the request from the config
   * @param {String} wordref - a word reference for getting homonym
   * @return {String} - constructed url for getting data from Treebank
  */
  prepareRequest (wordref) {
    let [text, fragment] = wordref.split(/#/)
    let requestServer = {}
    if (text && fragment) {
      for (let serverConfig of this.config.servers) {
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
    let providerUri = config.providerUri
    let providerRights = config.providerRights
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

    let features = config.featuresArray
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
/*! exports provided: servers, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"servers\":[{\"texts\":[],\"isDefault\":true,\"url\":\"https://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq?f=r_TEXT&w=r_WORD&clientId=r_CLIENT\",\"providerUri\":\"https://alpheios.net\",\"providerRights\":\"The Alpheios Treebank data is licenced under the Creative Commons 3.0 Share-Alike license.\",\"allowUnknownValues\":true,\"featuresArray\":[[\"pofs\",\"part\",true],[\"case\",\"grmCase\",false],[\"num\",\"number\",false],[\"gend\",\"gender\",false],[\"voice\",\"voice\",false],[\"mood\",\"mood\",false],[\"pers\",\"person\",false],[\"comp\",\"comparison\",false]]}]}");

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
  /**
   * Every adapter has errors array and L10n property for localizing messages
  */
  constructor () {
    this.errors = []
    this.l10n = new _l10n_l10n__WEBPACK_IMPORTED_MODULE_2__["default"]()
      .addMessages(_locales_en_us_messages_json__WEBPACK_IMPORTED_MODULE_4__, _locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_US)
      .addMessages(_locales_en_gb_messages_json__WEBPACK_IMPORTED_MODULE_5__, _locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_GB)
      .setLocale(_locales_locales_js__WEBPACK_IMPORTED_MODULE_3__["default"].en_US)
  }

  /**
   * This method is used for adding error meassage with additional data
   * @param {String} message  - message text for the error
  */
  addError (message) {
    let error = new _errors_adapter_error__WEBPACK_IMPORTED_MODULE_1__["default"](this.config.category, this.config.adapterName, this.config.method, message)
    this.errors.push(error)
  }

  /**
   * This method is used for uploding config property from current properties and default properties
   * @param {Object} config - properties with higher priority
   * @param {Object} defaultConfig - default properties
   * @return {Object} - configuration data
  */
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

        window.fetch(url)
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
            this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
            if (didTimeOut) return
            reject(err)
          })
      })
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
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
      try {
        let res
        if (options && options.timeout > 0) {
          res = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(encodeURI(decodeURI(url)), { timeout: options.timeout })
        } else {
          res = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(encodeURI(decodeURI(url)))
        }
        return res.data
      } catch (error) {
        this.addError(this.l10n.messages['BASIC_ADAPTER_NO_DATA_FROM_URL'].get(url))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }

  printError (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Alpheios error: unexpected response retrieving data from service', error)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Alpheios error: no response from service', error)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Alpheios error: unexpected error requesting data from service', error.message)
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
  async fetch (url, options) {
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
        this.addError(this.l10n.messages['BASIC_ADAPTER_UNKNOWN_ERROR'].get(error.message))
      }
    } else {
      this.addError(this.l10n.messages['BASIC_ADAPTER_EMPTY_URL'])
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BaseAdapter);


/***/ }),

/***/ "./adapters/concordance/adapter.js":
/*!*****************************************!*\
  !*** ./adapters/concordance/adapter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adapters_concordance_config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapters/concordance/config.json */ "./adapters/concordance/config.json");
var _adapters_concordance_config_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/concordance/config.json */ "./adapters/concordance/config.json", 1);
/* harmony import */ var _adapters_concordance_author_work_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/adapters/concordance/author-work.json */ "./adapters/concordance/author-work.json");
var _adapters_concordance_author_work_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/concordance/author-work.json */ "./adapters/concordance/author-work.json", 1);
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! alpheios-data-models */ "alpheios-data-models");
/* harmony import */ var alpheios_data_models__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/adapters/base-adapter */ "./adapters/base-adapter.js");






class AlpheiosConcordanceAdapter extends _adapters_base_adapter__WEBPACK_IMPORTED_MODULE_3__["default"] {
  /**
   * Adapter uploads config data and creates provider
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_concordance_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["ResourceProvider"](this.config.url, this.config.rights)
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
        this.authorWorkData = await this.uploadConfig({}, _adapters_concordance_author_work_json__WEBPACK_IMPORTED_MODULE_1__)

        this.authors = []
        for (let authorWorkDataItem of Object.values(this.authorWorkData.authors)) {
          let author = this.createAuthor(authorWorkDataItem)
          this.authors.push(author)
        }
      }
      return this.authors
    } catch (error) {
      this.addError(this.l10n.messages['CONCORDANCE_AUTHOR_UPLOAD_ERROR'].get(error.message))
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
      let url = this.createFetchURL(homonym, filters, pagination, sort)
      let wordUsageListRes = await this.fetch(url)
      if (Array.isArray(wordUsageListRes)) {
        let parsedWordUsageList = await this.parseWordUsageResult(wordUsageListRes, homonym)
        return {
          wordUsageExamples: parsedWordUsageList,
          targetWord: homonym.targetWord,
          language: alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["LanguageModelFactory"].getLanguageCodeFromId(homonym.languageID),
          provider: this.provider
        }
      } else {
        return []
      }
    } catch (error) {
      this.addError(this.l10n.messages['CONCORDANCE_WORD_USAGE_FETCH_ERROR'].get(error.message))
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
    let filterFormatted = this.formatFilter(filters)
    let paginationFormatted = this.formatPagination(pagination)
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
    let wordUsageExamples = []
    let author, textWork, passage

    if (this.authors.length === 0) {
      await this.getAuthorsWorks()
    }

    for (let jsonObjItem of jsonObj) {
      author = this.getAuthorByAbbr(jsonObjItem)
      if (author) {
        textWork = this.getTextWorkByAbbr(author, jsonObjItem)
        if (textWork) {
          passage = this.getPassage(jsonObjItem)

          let wordUsageExample = this.createWordUsageExample(jsonObjItem, homonym, author, textWork, passage)
          wordUsageExamples.push(wordUsageExample)
        }
      }
    }
    return wordUsageExamples
  }

  getAuthorByAbbr (jsonObj) {
    if (jsonObj.cit && this.authors.length > 0) {
      let authorAbbr = jsonObj.cit.split('.')[0]
      return this.authors.find(author => Object.values(author.abbreviations).includes(authorAbbr))
    }
    return null
  }

  getTextWorkByAbbr (author, jsonObj) {
    if (jsonObj.cit && author && author.works.length > 0) {
      let parts = jsonObj.cit.split('.')
      // if we have only 2 parts in the citation, it's probably an author without a work
      // which in the phi data is really when the author and work are referenced as the same thing
      // as in an anonymous work
      if (parts.length > 2) {
        let textWorkAbbr = parts[1]
        return author.works.find(textWork => Object.values(textWork.abbreviations).includes(textWorkAbbr))
      }
    }
    return null
  }

  getPassage (jsonObj) {
    let passage = null
    if (jsonObj.cit) {
      let parts = jsonObj.cit.split('.')
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
    let titles = {}
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    let abbreviations = {}
    jsonObj.abbreviations.forEach(abbrItem => {
      abbreviations[abbrItem['@lang']] = abbrItem['@value'].replace('.', '')
    })

    let author = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["Author"](jsonObj.urn, titles, abbreviations)
    author.ID = this.extractIDFromURNAuthor(author.urn)
    let works = []

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
    let partsUrn = urn.split(':')
    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      let workIDPart = partsUrn[3].indexOf('.') === -1 ? partsUrn[3] : partsUrn[3].substr(0, partsUrn[3].indexOf('.'))
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
    let titles = {}
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    let abbreviations = {}
    jsonObj.abbreviations.forEach(abbrItem => {
      abbreviations[abbrItem['@lang']] = abbrItem['@value'].replace('.', '')
    })

    let textWork = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["TextWork"](author, jsonObj.urn, titles, abbreviations)
    textWork.ID = this.extractIDFromURNTextWork(textWork.urn)
    return textWork
  }

  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURNTextWork (urn) {
    let partsUrn = urn.split(':')

    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      let workIDPart = partsUrn[3].indexOf('.') === -1 ? null : partsUrn[3].substr(partsUrn[3].indexOf('.') + 1)

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
    let source = this.config.sourceTextUrl + jsonObj.link
    let wordUsageExample = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["WordUsageExample"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_2__["LanguageModelFactory"].getLanguageCodeFromId(homonym.languageID), jsonObj.target, jsonObj.left, jsonObj.right, source, jsonObj.cit)
    wordUsageExample.author = author
    wordUsageExample.textWork = textWork
    wordUsageExample.passage = passage
    wordUsageExample.homonym = homonym
    wordUsageExample.provider = this.provider

    return wordUsageExample
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AlpheiosConcordanceAdapter);


/***/ }),

/***/ "./adapters/concordance/author-work.json":
/*!***********************************************!*\
  !*** ./adapters/concordance/author-work.json ***!
  \***********************************************/
/*! exports provided: authors, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"authors\":[{\"urn\":\"urn:cts:latinLit:phi2456\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Parthenius, of Constantinople\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parth\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2456.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0119\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Plautus, Titus Maccius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0119.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amphitruo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"As\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aul\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bacchides\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Bac\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Captivi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Capt\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Casina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cas\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cistellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cist\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curculio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cur\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epidicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epid\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menaechmi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mercator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mer\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Miles Gloriosus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mostellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mos\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Per\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poenulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poen\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudolus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ps\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rudens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rud\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Stichus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"St\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trinummus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trin\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Truculentus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Truc\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vidularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vid\"}]},{\"urn\":\"urn:cts:latinLit:phi0119.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0881\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Germanicus, Claudius Caesar\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Germ\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0881.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aratea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arat\"}]},{\"urn\":\"urn:cts:latinLit:phi0881.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta Aratea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0881.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epig\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0821\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Bucolica Einsidlensia)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BucEins\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0821.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bucolica Einsidlensia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0845\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Columella, L. Iunius Moderatus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Col\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0845.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Arboribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arb\"}]},{\"urn\":\"urn:cts:latinLit:phi0845.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Rustica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RR\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0984\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trogus, Pompeius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trog\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0984.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Animalibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anim\"}]},{\"urn\":\"urn:cts:latinLit:phi0984.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Philippicae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0558\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maecenas, Gaius Cilnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maec\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0558.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0558.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1297\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marullus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marull\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1297.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1251\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gaius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1251.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institutiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inst\"}]},{\"urn\":\"urn:cts:latinLit:phi1251.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institut., frr. Aeg. et Oxyrh.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Instfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi1251.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gai Institutionum epitome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epit\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0412\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aquilius Gallus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AquilGall\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0412.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1282\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lentul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1282.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0863\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dorcatius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dorc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0863.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Coelius Antipater, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Coel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0028.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Crassus, Lucius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cras\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0706\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen de Bello Aegyptiaco)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmBellAeg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0706.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen de Bello Aegyptiaco\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curio, Gaius Scribonius (pater)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CurPat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0037.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0917\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucanus, Marcus Annaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Luc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0917.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BC\"}]},{\"urn\":\"urn:cts:latinLit:phi0917.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0590\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nigidius Figulus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nigid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0590.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0662\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tiro, Marcus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tiro\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0662.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apicius, Caelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2003.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Coquinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Coqu\"}]},{\"urn\":\"urn:cts:latinLit:phi2003.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brevis Ciborum, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ExcCib\"}]},{\"urn\":\"urn:cts:latinLit:phi2003.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brevis Pimentorum, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ExcPim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0911\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Laus Pisonis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LausPis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0911.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laus Pisonis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0678\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Soranus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VSor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0678.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1050\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Verginius Rufus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vergin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1050.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0524\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0524.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"elegia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0524.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"elegia in pap. Qas1r Ibrîm\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmPap\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0301\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Domitius Ahenobarbus, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ahenobarbus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0301.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1370\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terentius Scaurus, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TerScaur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1370.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Adverbio et Praeposit.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AdPr\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. in codice Parisino 7520\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frgParis\"}]},{\"urn\":\"urn:cts:latinLit:phi1370.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De ordinat. part. orat. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frgOrd\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1260\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hadrianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hadr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1260.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1260.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0474\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cicero, Marcus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0474.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Quinctio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quinct\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro S. Roscio Amerino\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SRosc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Q. Roscio Comoedo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QRosc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Q. Caecilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DivCaec\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Verrem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Tullio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tul\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Fonteio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Font\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Caecina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caec\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Lege Manilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Man\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Cluentio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Clu\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Lege Agraria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rabirio Perduellionis Reo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RabPerd\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Catilinam\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Murena\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mur\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Sulla\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sul\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Archia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arch\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Flacco\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Flac\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Post Reditum ad Populum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RedPop\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Post Reditum in Senatu\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RedSen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Domo Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dom\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Haruspicum Responso\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Har\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Sestio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sest\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vatinium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Caelio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cael\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Provinciis Consularibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prov\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Balbo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balb\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Pisonem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pis\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Plancio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Planc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Scauro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaur\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rabirio Postumo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RabPost\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Milone\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Marcello\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0033\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Ligario\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lig\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Rege Deiotaro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Deiot\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Philippicae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phil\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0036\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Inventione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inv\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Oratore\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"deOrat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Partitione Oratoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Part\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0039\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brut\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0040\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Orator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Optimo Genere Oratorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"OptGen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0042\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Topica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Top\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0043\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Republica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rep\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0044\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Legibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Leg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0045\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Academica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ac\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0046\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucullus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Luc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0047\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paradoxa Stoicorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parad\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0048\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fin\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0049\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tusculanae Disputationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tusc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0050\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Natura Deorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ND\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0051\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Maior de Senectute\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0052\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius de Amicitia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amic\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0053\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Divinatione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Div\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0054\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Fato\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0055\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Officiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Off\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0056\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Familiares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fam\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0057\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Atticum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Att\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0058\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Quintum Fratrem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Qfr\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0059\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ad Brutum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"adBrut\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0060\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arati Phaenomena\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AratPhaen\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0061\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Facete Dicta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Facet\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0062\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0063\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Causarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommCaus\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0064\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0065\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hortensius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hort\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0066\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertorum librorum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"libinc\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0067\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Iure Civ. in Artem Redig.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IurCiv\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0068\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationum deperditarum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"oratdep\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0069\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationum incertarum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"incorat\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0070\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"philosophicorum librorum frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"philfrg\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0071\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arati Prognostica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AratProgn\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0072\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Timaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tim\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0073\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rhetorica ad Herennium [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RhetHer\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0074\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Sallustium [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sal\"}]},{\"urn\":\"urn:cts:latinLit:phi0474.phi0075\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistula ad Octavianum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpOct\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0535\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius Laterensis, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0535.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0721\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Panurgus, Antonius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntPan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0721.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1263\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygFab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1263.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fab\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2468\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augustinus, Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"August\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2468.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laus Cerei\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1257\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Licinianus, Granius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GranLic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1257.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0944\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nero, Imperator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nero\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0944.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1242\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Florus, Annius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Flor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1242.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epitome Bell. Omn. Ann. DCC\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epit\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vergilius Orator an Poeta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina in Anthologia Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"anth\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1242.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epist. ad imperat. Hadrianum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0634\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Santra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"San\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0634.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0634.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0143\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trabea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0143.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0546\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mucianus, Gaius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Muc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0546.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1908\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antipater, Gallus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GalAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1908.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0694\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Volumnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vol\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0694.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0827\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesellius Vindex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caesel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0827.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1224\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aurelius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1224.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0692\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Appendix Vergiliana\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AppVerg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0692.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dirae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dirae\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lydia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lydia\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Culex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Culex\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aetna\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aetna\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Copa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Copa\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae in Maecenatem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ElegMaec\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ciris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ciris\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catalepton\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catal\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapeum 'Quid Hoc Novi Est?'\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priapeum\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Moretum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mor\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Institutione Viri Boni\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InstVir\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Est et Non\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeEst\"}]},{\"urn\":\"urn:cts:latinLit:phi0692.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rosis Nascentibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rosis\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1306\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucius Neratius Priscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nerat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1306.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. in fragmentis Vaticanis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0636\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quintus Mucius Scaevola\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0636.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0648\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Staberius Eros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Staber\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0648.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0442\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulus Caecina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caecin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0442.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0658\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tabulae Censoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TabCens\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0658.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tabulae Censoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0987\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius Secundus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PPompon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0987.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0987.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1203\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alfius Avitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Avit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1203.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0664\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trebatius Testa, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Treb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0664.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia et al.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0302\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antonius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Antonius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0302.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato, Marcus Porcius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoCens\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0022.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agrfr\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dicta Memorabilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dict\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Medicina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertorum librorum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Re Militari\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen De Moribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mor\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Origines\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0022.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rhetorica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rhet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0518\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Furius Antias, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FurAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0518.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2150\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Zeno of Verona\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Zeno\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2150.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tractatus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tract\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0684\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varro, Marcus Terentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Var\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0684.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Lingua Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"L\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Rusticae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"R\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antiquitates Rerum Humanarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntiqHum\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antiquitates Rerum Divinarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntiqDiv\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Gente Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GentPopRom\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitaPopRom\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Urbanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ResUrb\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Logistorici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Log\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menippeae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epist\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae Latinae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epistLat\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"frr. de historia litterarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"litt\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta varia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"var\"}]},{\"urn\":\"urn:cts:latinLit:phi0684.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incertae sedis fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0680\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valgius Rufus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Valg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0680.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0884\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GracchTrag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0884.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2302\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Symmachus, L. Aurel. Avianius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LSymm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2302.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0966\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Passienus Crispus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Passien\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0966.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Piso Frugi, Lucius Calpurnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpPis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0016.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0097\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucilius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lucil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0097.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2301\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Symmachus, Q. Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QSymm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2301.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0908\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labeo, Attius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AttLabeo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0908.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versio Latina Iliados\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0460\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carbo Arvina, Gaius Papirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarboArv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0460.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0975\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phaedrus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phaed\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0975.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabulae Aesopiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fab\"}]},{\"urn\":\"urn:cts:latinLit:phi0975.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabularum Appendix\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"App\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Altercatio Hadr. et Epicteti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Altercat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Altercatio Hadr. et Epicteti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0824\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caelius Sabinus, Cn. Arulenus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelSab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0824.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0854\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius Gallus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornifGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0854.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Vergilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0140\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0140.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0592\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Novius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0592.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0842\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Licinus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodLic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0842.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Libri Rerum Romanarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0446\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caepio, Quintus Servilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0446.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0620\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Propertius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prop\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0620.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eleg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0515\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ennius, Sextus (vel Spurius)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SexEnn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0515.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0116\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pacuvius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0116.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0116.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0502\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cremutius Cordus, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Crem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0502.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0122\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Postumius Albinus, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Post\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0122.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2349\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Servius, active 4th century\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Serv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2349.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Centum Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CentMetr\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarius in Artem Donati\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommDon\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finalibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Final\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris Horatianis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetrHor\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Aeneidos Libros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"A\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Bucolicon Librum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]},{\"urn\":\"urn:cts:latinLit:phi2349.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Vergilii Georgicon Libros\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"G\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0472\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catullus, Gaius Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Catul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0472.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0472.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carminum fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1351\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tacitus, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1351.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Iulii Agricolae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ag\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Origine et Situ Germanorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ger\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dialogus de Oratoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dial\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1351.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1672\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulVal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1672.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Chalcidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Chalc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2028.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ex Graecis Conversiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2097\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paconianus, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pacon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2097.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0512\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Duronius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Duron\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0512.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2000\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ablabius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ablab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2000.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2335\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi de Differentiis [Fronto]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Diff\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2335.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Differentiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0426\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Africum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BAfr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0426.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Africum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0514\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Egnatius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Egn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0514.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rerum Natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0815\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Niger, Bruttedius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brutted\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0815.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1348\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Suetonius Tranquillus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Suet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1348.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Caesarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VC\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Poetis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Historicis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Grammaticis et Rhetoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GramRhet\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Prata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prat\"}]},{\"urn\":\"urn:cts:latinLit:phi1348.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0402\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aedituus, Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aed\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0402.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Salonianus, Marcus Portius M.f.M.n.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoNep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0025.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1515\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Serenus Sammonicus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerSamm\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1515.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Medicinalis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi1515.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Medicinalis, capitula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MedCap\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1518\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terentianus Maurus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1518.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Litt., De Syll., De Metr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LittSyllMetr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9254\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Titius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9254.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0409\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QCornif\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0409.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0857\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornutus, Lucius Annaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cornut\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0857.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0309\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen Evocationis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmEvoc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0309.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Evocationis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1380\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Philumenus medicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Philum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1380.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De medicina, versio Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0564\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius, Manius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManIur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0564.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0963\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Palaemon, Quintus Remmius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Palaem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0963.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0963.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0537\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labienus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Labienus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0537.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0470\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cato Uticensis, Marcus Porcius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CatoUtic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0470.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0806\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Capito, Gaius Ateius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0806.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0616\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pompil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0616.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0616.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoedia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0878\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Asinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AsGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0878.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0878.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1345\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silius Italicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1345.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Punica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pun\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0404\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Afranius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Afran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0404.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0914\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Livius, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Liv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0914.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ab Urbe Condita\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AUC\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Periochae Librorum A. U. C.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Perioch\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0914.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"A.U.C. Perioch. ex P.Oxy.668\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PeriochOxy\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scribonius Largus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Larg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1011.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Compositiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comp\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0469\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cassius Longinus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LCassius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0469.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0800\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Albinovanus Pedo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pedo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0800.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0875\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus Gaetulicus, Cn. Cornel.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gaet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0875.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0106\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus, Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0106.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Naevium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetVers\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2305\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aurelianus, Caelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelAur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2305.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"E Parmenide de natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1245\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Frontinus, Sextus Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fron\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1245.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Strategemata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Str\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Aquis Urbis Romae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aq\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agrorum Qualitate\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Controversiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Contr\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Limitibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lim\"}]},{\"urn\":\"urn:cts:latinLit:phi1245.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Arte Mensoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0430\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Hispaniense)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BHisp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0430.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Hispaniense\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0413\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gavius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GavBas\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0413.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Origine Vocabulorum, frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0413.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0070\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gellius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnGel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0070.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0628\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rutilius Rufus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RutRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0628.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0562\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManPoet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0562.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0100\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Luscius Lanuvinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lanuv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0100.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0969\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pers\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0969.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0625\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quinctius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quinctius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0625.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0568\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Matius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnMat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0568.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0576\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Messalla Rufus, M. Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MesRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0576.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Familiis Romanis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0576.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Auspiciis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0428\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Caesar (Bellum Alexandrinum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BAlex\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0428.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Alexandrinum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicia\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1023.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1023.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Statu Rei Publicae [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Conquaest\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0088\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lepidus Porcina, M. Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0088.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0993\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Precatio Terrae)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PrecTer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0993.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Precatio Terrae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0300\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asellio, Sempronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0300.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rerum Gestarum Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1506\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Fragmenta de Iure Fisci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FrIurFisc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1506.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta de iure fisci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Seneca, Lucius Annaeus (senior)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SenRhet\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1014.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Controversiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Con\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Controversiae, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ConExc\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Suasoriae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Suas\"}]},{\"urn\":\"urn:cts:latinLit:phi1014.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0128\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio Aemilianus, P. Cornelius, Africanus minor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScipMin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0128.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1047\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Veranius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Veran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1047.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"libri de rebus sacris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0614\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompeius Q.f.A.n. Rufus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PompRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0614.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Atil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0007.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0303\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Opillus, Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurOp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0303.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0137\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Titinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Titin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0137.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9510\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Grammatici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonGram\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9510.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0635\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saturius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0635.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornelia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cornelia\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0031.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistula, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0419\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Orbilius Pupillus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0419.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0103\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marcius, Gnaeus vates\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marcius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0103.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praecepta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0932\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Messalla Corvinus, M. Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MesCor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0932.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0932.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii de Bello Civili\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1236\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Festus, Sextus Pompeius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1236.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verborum Significatione\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verb\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0400\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Accius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Acc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0400.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0400.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0400.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0674\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Val\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0674.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"comoedia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0536\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laberius, Decimus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laber\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0536.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0091\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Licinius Imbrex\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Imbr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0091.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0730\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tarquitius Priscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tarquit\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0730.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Disciplina Etrusca, frr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0990\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Precatio Omnium Herbarum)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PrecHerb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0990.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Precatio Omnium Herbarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0458\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cannutius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Can\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0458.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1604\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atherianus, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulAth\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1604.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1103\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Priap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1103.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Priapea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0456\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calvus, Gaius Licinius Macer\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Calv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0456.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0456.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1000\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pupius 1st century B.C.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pup\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1000.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Pupio attributi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2331\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scriptores Historiae Augustae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SHA\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2331.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hadr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ael\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuli Capitolini Antoninus Pius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pius\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Marci Antonini Philosophi Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntPhil\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuli Capitolini Verus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Avidius \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Avid\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommAnt\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pert\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Didius Iulianus Aeli Spartiani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DidIul\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeli Spartiani Severus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sev\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pescennius Niger \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PescNig\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Clodii Albini Iulii Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodAlb\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antoninus Caracallus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntCar\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antoninus Geta \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntGeta\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Opilius Macrinus Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"OpilMacr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Diadumenus Antoninus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntDiad\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeli Lampridii Antoninus Heliogabalus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntHeliog\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alexander Severus Aeli Lampridii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AlexSev\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maximini Duo Iuli Capitolini\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maxim\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gordian\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gord\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maximus \"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MaxBalb\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Valer\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gall\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TyrTrig\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Claud\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Flavi Vopisci Syracusii Divus Aurelianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aurel\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tac\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prob\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QuadTyr\"}]},{\"urn\":\"urn:cts:latinLit:phi2331.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Car\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0929\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mela, Pomponius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mela\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0929.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Chorographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Chor\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0724\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cloatius Verus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cloat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0724.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0487\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Pulcher, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Clodius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0487.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0064\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fannius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0064.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0064.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus, Marcus Iunius [iur.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BrutIur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0010.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0532\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hortensius Hortalus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hort\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0532.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0532.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0528\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Granius Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GranFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0528.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0690\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Virgil\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0690.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eclogae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]},{\"urn\":\"urn:cts:latinLit:phi0690.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Georgica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"G\"}]},{\"urn\":\"urn:cts:latinLit:phi0690.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aeneis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"A\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0672\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turranius Niger\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turran\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0672.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de re rustica scripta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1209\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Annian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1209.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0312\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Dossennus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dossenn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0312.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1248\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fronto, Marcus Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fro\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1248.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad M. Caesarem et Invicem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurCaes\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad M. Antoninum Imp. Epist.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurImp\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Verum Imp. Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ver\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Eloquentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurEloq\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orationibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AurOrat\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Antoninum Pium Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AdPium\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Amicos Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amic\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Principia Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Princ\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laudes Fumi et Pulveris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaudFumPulv\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laudes Neglegentiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaudNegl\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Parthico\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Parth\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Feriis Alsiensibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FerAls\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Nepote Amisso\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nep\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arion\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ar\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Additamentum Epist. Aceph.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Add\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1248.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9969\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Vita Iuvenalis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitIuv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9969.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Iuvenalis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0887\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Grattius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Grat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0887.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cynegetica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cyneg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0104\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Memmius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Memmius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0104.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0606\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marcius Philippus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Philipp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0606.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0631\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sallust\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0631.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Catilinae Coniuratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cat\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Iugurthinum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iug\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFr\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. ampliora\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrAmp\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. e codicibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrCod\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiarum frr. e papyris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistFrPap\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ad Caesarem de Re Publ. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rep\"}]},{\"urn\":\"urn:cts:latinLit:phi0631.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In M. Tullium Ciceronem [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cic\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudo-Varro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PsVar\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1041.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Statius, Publius Papinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Stat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1020.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Thebais\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Theb\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silvae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Silv\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Achilleis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ach\"}]},{\"urn\":\"urn:cts:latinLit:phi1020.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Germanico (fragment)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Germ\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Claudius Caecus, Appius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"App\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0004.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1212\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apuleius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1212.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apologia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apol\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metamorphoses\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Florida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fl\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Deo Socratis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Soc\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anechomenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anech\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Mundo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mun\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Platone et Eius Dogmate\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pl\"}]},{\"urn\":\"urn:cts:latinLit:phi1212.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Deo Socratis, Praef. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SocPr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turnus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1029.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"satura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1100\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calpurnius Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpFlac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1100.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes, excerpta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Decl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0452\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar Strabo, Gaius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Strab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0452.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0452.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0416\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ateius Praetextatus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ateius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0416.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1294\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Martial\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mart\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1294.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Spectacula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sp\"}]},{\"urn\":\"urn:cts:latinLit:phi1294.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0466\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cascellius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Casc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0466.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Bene Dictorum, frr. duo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0486\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cinna, Gaius Helvius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cinna\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0486.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1336\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevus Memor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScaevMem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1336.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0109\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus Macedonicus, Q. Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetMac\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0109.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1374\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Velius Longus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1374.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0586\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mummius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0586.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0149\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arvales, Fratres\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmArv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0149.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Arvale\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0410\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aprissius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apris\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0410.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0420\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Namusa, Publius Aufidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nam\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0420.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0058\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Maximus Servilianus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FabMax\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0058.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1235\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicius Apollinaris, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DPTer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1235.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"An\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Heauton Timorumenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hau\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eunuchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eu\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phormio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ph\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hecyra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hec\"}]},{\"urn\":\"urn:cts:latinLit:phi1235.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Adelphoe\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ad\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0432\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bibaculus, Marcus Furius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Bib\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0432.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0686\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varro Atacinus, P. Terentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VarAt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0686.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1512\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius Porphyrio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Porph\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1512.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. in Hor. Artem Poet.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. in Hor. Carm. Saec.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saec\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Epodos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epod\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Sermones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentum in Horati Epistulas\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1512.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Horati\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitHor\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0510\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dolabella, Publius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dolab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0510.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0935\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iulius Modestus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Modest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0935.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1291\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Marian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1291.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lupercalia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1234\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Didascaliae et Argum. in Plautum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DAPl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1234.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amphitruo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asinaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"As\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aulularia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aul\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Captivi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Capt\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Casina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cas\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cistellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cist\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curculio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cur\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epidicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epid\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Menaechmi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Men\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mercator\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mer\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Miles Gloriosus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mostellaria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mos\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Persa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Per\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poenulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poen\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pseudolus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ps\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rudens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rud\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Stichus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"St\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trinummus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Trin\"}]},{\"urn\":\"urn:cts:latinLit:phi1234.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Truculentus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Truc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0591\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ninnius, Crassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0591.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0414\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arruntius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0414.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Belli Punici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0902\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Africanus, Sextus Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IulAfr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0902.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0541\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lentulus Marcellinus, Cn. Cornel.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LentMarc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0541.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0527\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gannius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0527.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0830\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calpurnius Siculus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalpSic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0830.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eclogae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ecl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curio, Gaius Scribonius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CurioAv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0034.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0526\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Glaucia, Gaius Servilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Glauc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0526.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1221\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augustus, Emperor of Rome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aug\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1221.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"dicta et apophthegmata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dict\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"edicta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"edicta\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"epist\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta incertae sedis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frginc\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"opera historica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Res Gestae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anc\"}]},{\"urn\":\"urn:cts:latinLit:phi1221.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1254\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gellius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AulGel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1254.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Noctes Atticae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"NA\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0455\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Piso, Gaius Calpurnius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Piso\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0455.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0703\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Arbonius Silo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0703.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0494\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Consulares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentCons\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0494.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Consulares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0556\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Macer, Gaius Licinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LicMacer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0556.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0556.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0812\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CBas\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0812.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris Horatii [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetHor\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Breviatio Pedum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"BrevPed\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Compositionibus [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comp\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Genera Versuum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vers\"}]},{\"urn\":\"urn:cts:latinLit:phi0812.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Poeticae Species Lat. [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0640\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scarus, Marcus Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemScaur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0640.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Sua\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0640.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0893\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Horace\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0893.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Saeculare\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saec\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epodi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epod\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sermones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi0893.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars Poetica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0405\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius Tuscus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ClodTusc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0405.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0652\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulla, Lucius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sulla\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0652.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Rerum Gestarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0418\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atta, Titus Quinctius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Atta\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0418.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0418.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"togatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1044\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Velleius Paterculus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vell\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1044.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historia Romana\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0996\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Probus, Marcus Valerius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Prob\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0996.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vita Persii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitPers\"}]},{\"urn\":\"urn:cts:latinLit:phi0996.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Notis Iuris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IurNot\"}]},{\"urn\":\"urn:cts:latinLit:phi0996.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0600\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Oppius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Opp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0600.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Silvestribus Arboribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0600.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"vitae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2806\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Justinian I, Emperor of the East\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Just\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2806.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Digesta Iustiniani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dig\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0082\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Silanus, Decimus Iunius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IunSil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0082.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versio Latina Magonis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0644\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ena, Sextilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sextil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0644.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1279\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius Felix\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LaelFel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1279.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0596\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Numitorius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Num\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0596.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antibucolica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1357\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Trajan, Emperor of Rome\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tra\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1357.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dacica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0484\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cincius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cinc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0484.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0484.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0656\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sulpicius Rufus, Servius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SulpRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0656.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0656.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aquilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aquil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0005.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliata, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1339\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Septimius Serenus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sept\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1339.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0615\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pompeius Rufus, Q.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QPompeius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0615.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0327\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Praeconinus Stilo, L. Aelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Stilo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0327.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0117\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Papinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pap\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0117.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammation\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0436\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Brutus, Marcus Iunius [tyr.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Brutus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0436.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0516\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Erucius, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Erucius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0516.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0450\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar, Lucius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LCaes\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0450.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Auspiciorum Liber, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0860\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Curtius Rufus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Curt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0860.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae Alexandri Magni\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alex\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0552\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lutatius Catulus, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lutat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0552.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0552.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Communes Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1327\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sabidius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sabid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1327.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0401\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aufustius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aufust\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0401.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0043\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ennius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Enn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0043.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ann\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"varia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"var\"}]},{\"urn\":\"urn:cts:latinLit:phi0043.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"incerta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"inc\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0851\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Severus, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornSev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0851.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0851.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta a Morel omissa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0836\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Celsus, Aulus Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cels\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0836.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agricultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi0836.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Medicina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0836.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rhetorica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rhet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1318\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pliny, the Younger\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PlinIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1318.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1318.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Panegyricus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pan\"}]},{\"urn\":\"urn:cts:latinLit:phi1318.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0978\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pliny, the Elder\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PlinSen\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0978.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naturalis Historia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nat\"}]},{\"urn\":\"urn:cts:latinLit:phi0978.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dubius Sermo\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DubSerm\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0425\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rutilius Lupus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"RutLup\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0425.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Schemata Lexeos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Schem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0134\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Terence\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ter\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0134.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"An\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Heauton Timorumenos\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hau\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Eunuchus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eu\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phormio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ph\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hecyra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hec\"}]},{\"urn\":\"urn:cts:latinLit:phi0134.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Adelphoe\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ad\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annius Luscus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Annius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0315\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchanus, Marcus Iunius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gracchan\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0315.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"commentarii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0972\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Petronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Petr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0972.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Satyrica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sat\"}]},{\"urn\":\"urn:cts:latinLit:phi0972.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Satyrica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0905\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Labeo, Marcus Antistius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AntLabeo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0905.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0488\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Clodius, Servius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerClod\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0488.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vagellius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1032.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0496\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarius Anquisit. Sergii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentQuaestor\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0496.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Comment. Anquisit. Sergii\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0899\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus Astronomus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygAstr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0899.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Astronomica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Astr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2123\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Porfyrius, Publilius Optatianus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"POptat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2123.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epigrammata\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0530\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hirtius, Aulus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hirt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0530.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Gallico Liber VIII\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gal\"}]},{\"urn\":\"urn:cts:latinLit:phi0530.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0094\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Andronicus, Lucius Livius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Andr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0094.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Odyssia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0094.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0094.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0866\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fenestella\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fen\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0866.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0727\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornificius Longus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CornifLong\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0727.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0618\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius, Lucius, Bononiensis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PomponBon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0618.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0118\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paullus, Lucius Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemPaul\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0118.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Albinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rerum Romanarum Liber I\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ResRom\"}]},{\"urn\":\"urn:cts:latinLit:phi2002.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeMetr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0408\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Antonius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ant\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0408.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0959\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ovid\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0959.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Amores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Am\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae (vel Heroides)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Her\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medicamina Faciei Femineae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ars Amatoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ars\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Remedia Amoris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rem\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metamorphoses\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Met\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fasti\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fast\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tristia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tr\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae ex Ponto\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pont\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ibis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ib\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nux [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nux\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Halieutica [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hal\"}]},{\"urn\":\"urn:cts:latinLit:phi0959.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epicedion Drusi [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpicDrusi\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1276\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Juvenal\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Juv\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1276.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saturae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"S\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0146\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Turpilius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Turp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0146.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1285\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Maecianus, Lucius Volusius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Maecian\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1285.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Assis Distributio ...\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0490\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cominius, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Comin\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0490.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0650\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sueius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sueius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0650.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0533\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus, Gaius Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygGram\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0533.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0533.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1056\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vitruvius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vitr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1056.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Architectura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arch\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0594\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Novius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LNov\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0594.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0646\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sisenna, Lucius Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sis\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0646.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0646.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Milesiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0112\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naevius, Gnaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CnNaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0112.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Punicum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pun\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"alia carmina epica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praetextae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"praet\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina, frr. a Morel omissa\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]},{\"urn\":\"urn:cts:latinLit:phi0112.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Metellos [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InMet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1266\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hyginus Gromaticus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HygGr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1266.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Limitibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lim\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Condicionibus Agrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Agr\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Generibus Controversiarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Contr\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Constitutio Limitum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Const\"}]},{\"urn\":\"urn:cts:latinLit:phi1266.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Munition. Castrorum [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Munit\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0076\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cassius Hemina, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0076.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0478\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cicero, Quintus Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QCic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0478.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0478.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentar. Petitionis [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0624\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Claudius Quadrigarius, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quad\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0624.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0085\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laelius, Gaius, Sapiens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lael\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0085.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0938\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Montanus, Iulius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mont\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0938.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0926\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Manilius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ManAstr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0926.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Astronomica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Astr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0522\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gallus, Gaius Aelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AelGal\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0522.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verbis ad Ius Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]},{\"urn\":\"urn:cts:latinLit:phi0522.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iurfrg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0582\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Metellus Numidicus, Q. Caecilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MetNum\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0582.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0451\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sinnius Capito\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sinn\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0451.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0638\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevola, Q. Mucius [pontifex]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"QScaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0638.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0560\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Helvius Mancia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Manc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0560.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1227\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Balbus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balb\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1227.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Expos. et Ratio Omn. Formarum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"grom\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1363\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aemilius Asper\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asper\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1363.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"comment. in Ter. Sall. Verg.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi1363.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vergilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Verg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0809\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aufidius Bassus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Aufid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0809.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Maximus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VMax\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1038.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Facta et Dicta Memorabilia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0661\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ticidas\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tic\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0661.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0538\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laevius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0538.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0538.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fr. dubium a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0660\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tibullus, Albius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tib\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0660.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Elegiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Eleg\"}]},{\"urn\":\"urn:cts:latinLit:phi0660.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina Tibulliana [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmTib\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0670\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aelius Tubero, Qunitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tub\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0670.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0670.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"liber ad C. Oppium, fr.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0127\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio, Africanus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ScipioMaior\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0127.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0330\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Volcacius Sedigitus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Volc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0330.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cincius Alimentus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cincius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0027.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0306\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymous (Carmen Devotionis)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmDevot\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0306.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carmen Devotionis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0454\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Calidius, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Calid\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0454.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0869\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Verrius Flaccus, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VerFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0869.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Etruscarum Rerum Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0869.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9505\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Comici et Tragici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonComTrag\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9505.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Togatae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"tog\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Atellanae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"atell\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Palliatae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]},{\"urn\":\"urn:cts:latinLit:phi9505.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tragoediae Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0534\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuventius, comicus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Iuvent\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0534.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0423\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Herennius Balbus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Balbus\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0423.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0890\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Homerus Latinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HomLat\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0890.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias Latina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0574\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Memmius L. f., Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0574.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0574.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1229\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caper, Flavius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caper\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1229.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Orthographia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Orth\"}]},{\"urn\":\"urn:cts:latinLit:phi1229.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Verbis Dubiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VerbDub\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0587\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naevius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"NaevIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0587.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ilias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CypIl\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Carbo, Gaius Papirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Carbo\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0019.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0622\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Publilius, Syrus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pub\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0622.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sententiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]},{\"urn\":\"urn:cts:latinLit:phi0622.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"mimi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"mim\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0923\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Macer, Aemilius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemMacer\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0923.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0923.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum a Morel omissum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poetB\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0073\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Gracchus, Gaius Sempronius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CGracch\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0073.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0803\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Asconius Pedianus, Quintus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Asc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0803.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Senatu Contra L. Pisonem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pis\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Scauro\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Scaur\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Milone\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mil\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pro Cornelio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Corn\"}]},{\"urn\":\"urn:cts:latinLit:phi0803.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"In Toga Candida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TogCand\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0444\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caelius Rufus, Marcus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CaelRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0444.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1206\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ampelius, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Amp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1206.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Memorialis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mem\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0448\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caesar, Julius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caes\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0448.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Bello Gallico\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Gal\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Civile\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Civ\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Analogia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anticato\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Anticat\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"carm\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae ad Ciceronem\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpCic\"}]},{\"urn\":\"urn:cts:latinLit:phi0448.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epistulae ad familiares\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpFam\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1218\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Augurinus, Sentius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Augur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1218.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0492\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Augurum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CommentAugur\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0492.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Commentarii Augurum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0709\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Marsus, Domitius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DomMars\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0709.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0709.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata ex Bobiensibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrBob\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1053\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vibius Crispus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VibCrisp\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1053.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Rabirius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Rab\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1005.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0324\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Saserna\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Saserna\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0324.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Agri Cultura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0445\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caepasius, Gaius vel Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caepasius\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0445.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0981\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pollio, Gaius Asinius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pol\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0981.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]},{\"urn\":\"urn:cts:latinLit:phi0981.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"historiae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0046\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cornelius Epicadus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Epicad\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0046.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"grammatica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"gram\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Flaccus, Gaius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1035.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argonautica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2300\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Aemilius Sura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemSura\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2300.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Annis Populi Romani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9221\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Paulus, Quaestor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PaulQuaest\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9221.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0682\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Varius Rufus, Lucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VRuf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0682.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi0682.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"tragoediae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"trag\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1342\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Siculus Flaccus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SicFl\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1342.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Condicionibus Agrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CondAgr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0920\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucilius Iunior\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LucilIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0920.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Seneca, Lucius Annaeus (the younger)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SenPhil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1017.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hercules Furens\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HerF\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Troades\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tro\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phoenissae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phoen\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Medea\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Med\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Phaedra\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Phaed\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Oedipus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Oed\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Agamemnon\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ag\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Thyestes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Thy\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hercules Oetaeus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HerO\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Octavia [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Oct\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Apocolocyntosis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Apoc\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Dialogi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Dial\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Beneficiis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ben\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Clementia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cl\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Epistulae Morales ad Lucilium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Ep\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Naturales Quaestiones\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nat\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"e Cleanthe versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]},{\"urn\":\"urn:cts:latinLit:phi1017.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Vita Patris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VitPatr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0125\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scaevola, Publius Mucius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PScaev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0125.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0642\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sevius Nicanor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sev\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0642.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1377\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fragmenta Bobiensia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FrgBob\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1377.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Littera\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Litt\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Accentibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Acc\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Propriis Nominibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PropNom\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Nomine\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nom\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Versibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vers\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Finalibus Syllabis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FinSyll\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Structuris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Struct\"}]},{\"urn\":\"urn:cts:latinLit:phi1377.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi3211\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argum. Aen. et Tetrast.\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Arg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi3211.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argumenta Aeneidis, Decasticha\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Deca\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Argumenta Aeneidis, Monosticha\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Mono\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tetrasticha in Vergilii Bucolica et Georgica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tetr\"}]},{\"urn\":\"urn:cts:latinLit:phi3211.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tetrasticha in Vergilii Aeneida\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TetrAen\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0630\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sacra Argeorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SacrArg\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0630.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Sacra Argeorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0588\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Nepos, Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nep\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0588.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Vitae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Vit\"}]},{\"urn\":\"urn:cts:latinLit:phi0588.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0676\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Valerius Antias\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ValAnt\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0676.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Quintillian\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Quint\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1002.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Institutio Oratoria\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Inst\"}]},{\"urn\":\"urn:cts:latinLit:phi1002.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes Minores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Decl\"}]},{\"urn\":\"urn:cts:latinLit:phi1002.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Declamationes Maiores [sp.]\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DeclMaior\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0540\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Laurea, Tullius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Laurea\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0540.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma in Ciceronis obitum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Caecilius Statius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Caecil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0013.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"palliatae\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"pall\"}]}]},{\"urn\":\"urn:cts:latinLit:phi9500\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Anonymi Epici et Lyrici\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AnonEpLyr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi9500.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen Saliare\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmSal\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus sacrorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersSacr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"sententia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Sent\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0004\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"A. Atilii Calatini elogium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CalElog\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0005\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmen Priami\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmPriam\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0006\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"saturnius(?)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"IncSat\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0007\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Acilii Glabrionis tabula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"GlabTab\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0008\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"M. Aemilii cos. a. 179 tabula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AemTab\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0009\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versiculi populares et pueriles\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersicPop\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0010\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"praecepta rustica et medica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Praec\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0011\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma a Varrone Plauto attributum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrPlaut\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0012\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigramma Pacuvi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"EpigrPac\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0013\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Ardeatis templi inscriptio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ArdInscr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0014\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"templi Tarracinensis inscriptio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TarInscr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0015\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"in Carbonem versus popularis\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarbVers\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0016\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina Marciana et similia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CarmMarc\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0017\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Caesarem et similia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InCaes\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0018\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"epigrammata et populares versus in Augustum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0019\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"obtrectatoris Vergilii versiculus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"ObtrVerg\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0020\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de Crassitio epigramma\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"CrassEpigr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0021\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"populares versus in Sarmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InSarm\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0022\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Tiberium et Germanicum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InTib\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0023\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"populares versus in Caligulam\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InCal\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0024\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"artificia metrica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Artif\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0025\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus populares in Neronem et eiusque successores\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"InNer\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0026\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Hor. Sat. I 10 praemissi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersHor\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0027\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus de VII sapientibus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersSap\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0028\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"odarium\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Odar\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0029\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Clementis(?)\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"PoetEp\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0030\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus in Caesares Romanos ex Historia Augusta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"HistAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0031\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus Orphici ab Arnobio conversi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersOrph\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0032\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Tarentinus senarius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"TarSen\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0033\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Venere et Amoribus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VenAmor\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0034\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Metris\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Metr\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0035\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Enniani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersEnn\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0036\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus fortasse Luciliani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersLucil\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0037\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Catulliani\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevCatul\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0038\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Catulliani a Morel omissi\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevCatul2\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0039\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus aevi Augustei\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"AevAug\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0040\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"serioris aetatis versus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"SerAet\"}]},{\"urn\":\"urn:cts:latinLit:phi9500.phi0041\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"versus reciproci\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"VersRecip\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0584\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mimi Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"MimInc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0584.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Mimi Poetarum Incertorum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"\"}]},{\"urn\":\"urn:cts:latinLit:phi0584.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta dubia\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"dub\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0067\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Favorinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Fav\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0067.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0498\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Cotta, Gaius Aurelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cotta\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0498.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"oratio\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0321\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Porcius Licinus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Porc\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0321.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0130\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scipio Nascia Serapio, P. Cornelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Nasica\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0130.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0406\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Alfenus Varus, Publius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Alf\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0406.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"iurisprudentia, fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi1321\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Pomponius, Sextus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Pompon\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi1321.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Liber Regularum, fragmentum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Reg\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0668\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Scrofa, Gnaeus Tremelius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Tremel\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0668.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"de re rustica\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"agr\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0079\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hostius\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Host\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0079.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Bellum Histricum\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi2434\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Hilary, Saint, Archbishop of Arles\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Hil\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi2434.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"carmina\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"poet\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0473\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lutatius Catulus, Q., Iunior\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"LutatIun\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0473.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"orationes\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"orat\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0061\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Fabius Pictor\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"FabPict\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0061.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Annales\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"hist\"}]},{\"urn\":\"urn:cts:latinLit:phi0061.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Iuris Pontificis Libri\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"iur\"}]}]},{\"urn\":\"urn:cts:latinLit:phi0550\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Lucretius Carus, Titus\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Lucr\"}],\"works\":[{\"urn\":\"urn:cts:latinLit:phi0550.phi0001\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"De Rerum Natura\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"DRN\"}]},{\"urn\":\"urn:cts:latinLit:phi0550.phi0002\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"fragmenta\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"frg\"}]},{\"urn\":\"urn:cts:latinLit:phi0550.phi0003\",\"title\":[{\"@lang\":\"lat\",\"@value\":\"Capitula\"}],\"abbreviations\":[{\"@lang\":\"lat\",\"@value\":\"Cap\"}]}]}]}");

/***/ }),

/***/ "./adapters/concordance/config.json":
/*!******************************************!*\
  !*** ./adapters/concordance/config.json ***!
  \******************************************/
/*! exports provided: url, sourceTextUrl, rights, maxResultsOverride, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"url\":\"https://latin.packhum.org/rst/concordance/\",\"sourceTextUrl\":\"https://latin.packhum.org\",\"rights\":\"Word usage examples are provided by The Packard Humanities Institute (https://packhum.org/). They are to be used only for personal study and are subject to the “Fair Use” principles of U.S. Copyright law.\",\"maxResultsOverride\":10000000}");

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
  /**
  * Lexicons adapter uploads config data, defines default options and inits data
  * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_lexicons_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 }
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
    let url = this.config[urlKey].urls.short
    let requestType = 'shortDefs'

    let resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          await this.updateShortDefs(cachedDefinitions.get(url), homonym, this.config[urlKey])
          this.prepareSuccessCallback(requestType, homonym)
        }
      },
      error => {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
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
    let url = this.config[urlKey].urls.index
    let requestType = 'fullDefs'

    let resCheckCached = this.checkCachedData(url)
    return resCheckCached.then(
      async (result) => {
        if (result) {
          let fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url), homonym, this.config[urlKey])
          let resFullDefs = this.updateFullDefs(fullDefsRequests, this.config[urlKey], homonym)
          resFullDefs.catch(error => {
            this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
            this.prepareFailedCallback(requestType, homonym)
          })
        }
      },
      error => {
        this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error.message))
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
      this.addError(this.l10n.messages['LEXICONS_NO_ALLOWED_URL'])
      return
    }
    let languageID = homonym.lexemes[0].lemma.languageID
    let urlKeys = this.getRequests(languageID).filter(url => this.options.allow.includes(url))

    for (let urlKey of urlKeys) {
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
  * @return {Boolean} - true - if cached is successed
  */
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

  /**
  * This method searches for definitions in cached text, creates definitions and updates lexemes
  * @param {Map} data - cached data from definition's url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  */
  async updateShortDefs (data, homonym, config) {
    let languageID = homonym.lexemes[0].lemma.languageID
    let model = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageModel(languageID)

    for (let lexeme of homonym.lexemes) {
      let deftexts = this.lookupInDataIndex(data, lexeme.lemma, model)

      if (deftexts) {
        for (let d of deftexts) {
          try {
            let provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](config.urls.short, config.rights)
            let def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](d, config.langs.target, 'text/plain', lexeme.lemma.word)
            let definition = await alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, def)
            lexeme.meaning['appendShortDefs'](definition)
          } catch (error) {
            this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
            continue
          }
        }
      } else {
        let url = config.urls.short
        this.addError(this.l10n.messages['LEXICONS_NO_DATA_FROM_URL'].get(url))
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
    let languageID = homonym.lexemes[0].lemma.languageID
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
  async updateFullDefs (fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) {
      let fullDefDataRes = this.fetch(request.url, { type: 'xml' })

      fullDefDataRes.then(
        async (fullDefData) => {
          if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
            let error = fullDefData.match(/no entries found/i) ? 'No entries found.' : fullDefData
            this.addError(this.l10n.messages['LEXICONS_FAILED_CACHED_DATA'].get(error))
            this.prepareFailedCallback('fullDefs', homonym)
          } else {
            let provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"](config.urls.full, config.rights)
            let def = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Definition"](fullDefData, config.langs.target, 'text/plain', request.lexeme.lemma.word)
            let definition = await alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["ResourceProvider"].getProxy(provider, def)
            request.lexeme.meaning['appendFullDefs'](definition)
            this.prepareSuccessCallback('fullDefs', homonym)
          }
        },
        error => {
          this.addError(this.l10n.messages['LEXICONS_FAILED_APPEND_DEFS'].get(error.message))
        }
      )
    }
  }

  /*
  * This method retrieves urls from config for given languageCode
  * @param {Symbol} languageID
  */
  getRequests (languageID) {
    let languageCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
    return Object.keys(this.config).filter(url => this.config[url] && this.config[url].langs && this.config[url].langs.source === languageCode)
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

module.exports = JSON.parse("{\"https://github.com/alpheios-project/lsj\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"A Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott)\",\"rights\":\"\\\"A Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/aut\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/aut/dat/grc-aut-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/aut//dat/grc-aut-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=aut&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Autenrieth Homeric Dictionary\\\" (Geoerge Autenrieth)\",\"rights\":\"\\\"Autenrieth Homeric Dictionary\\\" (Geoerge Autenrieth). Provided by the Perseus Digital Library at Tufts University\"},\"https://github.com/alpheios-project/ml\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ml&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Middle Liddell\\\"\",\"rights\":\"\\\"An Intermediate Greek-English Lexicon\\\" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University\"},\"https://github.com/alpheios-project/as\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/as/dat/grc-as-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=as&lg=grc&out=html\"},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"A Manual Greek Lexicon of the New Testament\\\"\",\"rights\":\"\\\"A Manual Greek Lexicon of the New Testament\\\" (G. Abbott-Smith). Provided by biblicalhumanities.org.\"},\"https://github.com/alpheios-project/dod\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-ids.dat\",\"full\":null},\"langs\":{\"source\":\"grc\",\"target\":\"en\"},\"description\":\"\\\"Dodson\\\"\",\"rights\":\"\\\"A Public Domain lexicon by John Jeffrey Dodson (2010)\\\". Provided by biblicalhumanities.org.\"},\"https://github.com/alpheios-project/ls\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/ls/dat/lat-ls-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html\"},\"langs\":{\"source\":\"lat\",\"target\":\"en\"},\"description\":\"\\\"A Latin Dictionary\\\" (Charlton T. Lewis, Charles Short)\",\"rights\":\"\\\"A Latin Dictionary\\\" (Charlton T. Lewis, Charles Short). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/lan\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/lan/dat/ara-lan-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lan&lg=ara&out=html\"},\"langs\":{\"source\":\"ara\",\"target\":\"en\"},\"description\":\"\\\"The Arabic-English Lexicon\\\" (Edward Lane)\",\"rights\":\"\\\"The Arabic-English Lexicon\\\" (Edward Lane). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/sal\":{\"urls\":{\"short\":null,\"index\":\"https://repos1.alpheios.net/lexdata/sal/dat/ara-sal-ids.dat\",\"full\":\"https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=html\"},\"langs\":{\"source\":\"ara\",\"target\":\"en\"},\"description\":\"\\\"An Advanced Learner's Arabic Dictionary\\\" (H. Anthony Salmone)\",\"rights\":\"\\\"An Advanced Learner's Arabic Dictionary\\\" (H. Anthony Salmone). Provided by the Perseus Digital Library at Tufts University.\"},\"https://github.com/alpheios-project/stg\":{\"urls\":{\"short\":\"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-defs.dat\",\"index\":\"https://repos1.alpheios.net/lexdata/stg/dat/per-stg-ids.dat\",\"full\":null},\"langs\":{\"source\":\"per\",\"target\":\"en\"},\"description\":\"\\\"A Comprehensive Persian-English Dictionary\\\" (Francis Joseph Steingass)\",\"rights\":\"\\\"A Comprehensive Persian-English Dictionary\\\" (Francis Joseph Steingass). Provided by the Center for Advanced Study of Language (CASL) at the University of Maryland, College Park.\"}}");

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
  /**
   * Adapter uploads config data, creates provider and inits mapLangUri (Object for storing data for available languages)
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_translations_config_json__WEBPACK_IMPORTED_MODULE_0__)
    this.mapLangUri = {}
    this.provider = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_1__["ResourceProvider"](this.config.url, this.config.rights)
  }
  /**
   * This method updates homonym with retrieved translations, if an error occurs it will be added to errors property of an adapter
   * @param {Homonym} homonym
   * @param {String} browserLang - language of the translation (for example its, spa)
  */
  async getTranslationsList (homonym, browserLang) {
    let lemmaList = []
    if (!homonym || !homonym.lexemes) {
      this.addError(this.l10n.messages['TRANSLATION_INCORRECT_LEXEMES'])
      return
    }

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
  /**
   * This method creates a string with unique lemma's words form lemmas list
   * @param {[Lemma]} lemmaList
  */
  prepareInput (lemmaList) {
    let inputList = lemmaList.map(lemma => encodeURIComponent(lemma.word)).filter((item, index, self) => self.indexOf(item) === index)
    return inputList.length > 0 ? inputList.join(',') : undefined
  }
  /**
   * This method fetches an url for translation
   * @param {String} inLang  - translate from language  (for example, lat)
   * @param {String} outLang  - translate to language  (for example, es, it)
  */
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

module.exports = JSON.parse("{\"url\":\"https://ats.alpheios.net\",\"availableLangSource\":[\"lat\"],\"rights\":\"Lemma translatins are extracted from data provided under the GNU GPL v3 license by the Collatinus Project (https://github.com/biblissima/collatinus), which is developed and maintained by Yves Ouvrard and Philippe Verkerk.\",\"deafultLang\":\"eng\",\"langMap\":{\"en-US\":\"eng\",\"it\":\"ita\",\"pt\":\"por\",\"ca\":\"cat\",\"fr\":\"fre\",\"de\":\"ger\",\"es\":\"spa\"}}");

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
  /**
   * Tufts adapter uploads config data, uploads available engines and creates EnginesSet from them
   * @param {Object} config - properties with higher priority
  */
  constructor (config = {}) {
    super()
    this.config = this.uploadConfig(config, _adapters_tufts_config_json__WEBPACK_IMPORTED_MODULE_3__)
    this.uploadEngines(this.config.engine)
    this.engineSet = new _adapters_tufts_engines_set__WEBPACK_IMPORTED_MODULE_4__["default"](this.engines)
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
      let langID = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageIdFromCode(langCode)

      if (langID !== alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_UNDEFINED && this.engines[langID] === undefined) {
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
        let transformAdapter = new _adapters_tufts_transform_adapter__WEBPACK_IMPORTED_MODULE_2__["default"](this)

        let homonym = transformAdapter.transformData(res, word)

        if (!homonym) {
          this.addError(this.l10n.messages['MORPH_TUFTS_NO_HOMONYM'].get(word, languageID.toString()))
          return
        }

        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Lexeme"].getSortByTwoLemmaFeatures(alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.frequency, alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.part))
        }

        return homonym
      }
    } catch (error) {
      this.addError(this.l10n.messages['MORPH_TUFTS_UNKNOWN_ERROR'].get(error.mesage))
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
    let langCode = alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["LanguageModelFactory"].getLanguageCodeFromId(languageID)
    let engine = this.engineSet.getEngineByCode(languageID)

    if (engine) {
      let code = engine.engine
      return this.config.url.replace('r_WORD', encodeURIComponent(word)).replace('r_ENGINE', code).replace('r_LANG', langCode).replace('r_CLIENT', this.config.clientId)
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

module.exports = JSON.parse("{\"engine\":{\"lat\":[\"whitakerLat\"],\"grc\":[\"morpheusgrc\"],\"ara\":[\"aramorph\"],\"per\":[\"hazm\"],\"gez\":[\"traces\"]},\"url\":\"https://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG&clientId=r_CLIENT\",\"allowUnknownValues\":true,\"featuresArray\":[[\"pofs\",\"part\"],[\"case\",\"grmCase\"],[\"gend\",\"gender\"],[\"decl\",\"declension\"],[\"conj\",\"conjugation\"],[\"area\",\"area\"],[\"age\",\"age\"],[\"geo\",\"geo\"],[\"freq\",\"frequency\"],[\"note\",\"note\"],[\"pron\",\"pronunciation\"],[\"kind\",\"kind\"],[\"src\",\"source\"]],\"featuresArrayAll\":[[\"pofs\",\"part\"],[\"case\",\"grmCase\"],[\"gend\",\"gender\"],[\"decl\",\"declension\"],[\"conj\",\"conjugation\"],[\"num\",\"number\"],[\"tense\",\"tense\"],[\"voice\",\"voice\"],[\"mood\",\"mood\"],[\"pers\",\"person\"],[\"comp\",\"comparison\"],[\"stemtype\",\"stemtype\"],[\"derivtype\",\"derivtype\"],[\"dial\",\"dialect\"],[\"morph\",\"morph\"]]}");

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
      let engineCode = this.engine[languageID][0]
      let allEngines = new Map(([ _adapters_tufts_engine_whitakers__WEBPACK_IMPORTED_MODULE_0__["default"], _adapters_tufts_engine_morpheusgrc__WEBPACK_IMPORTED_MODULE_1__["default"], _adapters_tufts_engine_aramorph__WEBPACK_IMPORTED_MODULE_2__["default"], _adapters_tufts_engine_hazm__WEBPACK_IMPORTED_MODULE_3__["default"], _adapters_tufts_engine_traces__WEBPACK_IMPORTED_MODULE_4__["default"] ]).map((e) => { return [ e.engine, e ] }))
      return allEngines.get(engineCode)
    }
  }

  /**
   * This method returns engine class by languageCode
   * @param {String} languageCode
   * @return {Engine Class}
  */
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
  constructor (adapter) {
    this.engineSet = adapter.engineSet
    this.config = adapter.config
    this.adapter = adapter
  }

  /**
   * This method extract parameter by defined path
   * @param {Object} source - json object to retrieve data from
   * @param {String} nameParam - parameter name that should be retrieved
   * @return {String|Object} - extracted data
  */
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
    let hdwd = []

    if (data && !Array.isArray(data) && (!data.hdwd || !data.hdwd.$) && term) {
      hdwd.push(term.prefix ? term.prefix.$ : '')
      hdwd.push(term.stem ? term.stem.$ : '')
      hdwd.push(term.suff ? term.suff.$ : '')

      if (direction === alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Constants"].LANG_DIR_RTL) {
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
    let lemmaData = Array.isArray(data) ? data[0] : data
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {}
      lemmaData.hdwd.lang = term.lang
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang
  }

  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * Returned values:
   *     - {Homonym}
   *     - {undefined}
  */
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
      let language = this.defineLanguage(lemmaElements, inflectionsJSONTerm)
      if (!language) {
        this.adapter.addError(this.adapter.l10n.messages['MORPH_TRANSFORM_NO_LANGUAGE'])
        continue
      }

      // Get importer based on the language
      let mappingData = this.engineSet.getEngineByCodeFromLangCode(language)
      if (!mappingData) {
        this.adapter.addError(this.adapter.l10n.messages['MORPH_TRANSFORM_NO_MAPPING_DATA'].get(language))
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
          this.adapter.addError(this.adapter.l10n.messages['MORPH_TRANSFORM_NO_LEMMA'])
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
        let inflection
        try {
          inflection = new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Inflection"](stem, mappingData.model.languageID, suffix, prefix, xmpl)
        } catch (e) {
          this.adapter.addError(this.adapter.l10n.messages['MORPH_TRANSFORM_INFLECTION_ERROR'].get(e.message))
          continue
        }
        if (targetWord) {
          inflection.addFeature(new alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"](alpheios_data_models__WEBPACK_IMPORTED_MODULE_0__["Feature"].types.fullForm, targetWord, mappingData.model.languageID))
        }
        // Parse whatever grammatical features we're interested in and are provided
        for (let f of this.config.featuresArrayAll) {
          try {
            mappingData.mapFeature(inflection, inflectionJSON, ...f, this.config.allowUnknownValues)
            mappingData.overrideInflectionFeatureIfRequired(f[1], inflection, lemmas)
          } catch (e) {
            // quietly continue
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
/* harmony import */ var _adapters_concordance_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/adapters/concordance/adapter */ "./adapters/concordance/adapter.js");
/* harmony import */ var _errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/errors/wrong-method-error */ "./errors/wrong-method-error.js");
/* harmony import */ var _errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/errors/no-required-param-error */ "./errors/no-required-param-error.js");
/* harmony import */ var _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/adapters/adapters-config.json */ "./adapters/adapters-config.json");
var _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/adapters/adapters-config.json */ "./adapters/adapters-config.json", 1);











let cachedConfig = new Map()
let cachedAdaptersList = new Map()

class ClientAdapters {
  /**
   * it is used for uploading data from AdaptersConfig to cachedConfig and CachedAdaptersList
  */
  static init () {
    if (cachedConfig.size === 0) {
      for (let category in _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_7__) {
        let adapters = {}
        for (let adapterKey in _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_7__[category]) {
          let adapterData = _adapters_adapters_config_json__WEBPACK_IMPORTED_MODULE_7__[category][adapterKey]

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

  /**
  * This method checks if given method is registered in config for category.adapterName
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethod (category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new _errors_wrong_method_error__WEBPACK_IMPORTED_MODULE_5__["default"](category, adapterName, methodName)
    }
  }

  /**
  * This method checks if given array with parameteres doesn\'t have required parameters, registered in config file
  * @param {[String]} params - array of parameter\' names for being checked
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkParam (params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach(paramName => {
        if (!params[paramName]) {
          throw new _errors_no_required_param_error__WEBPACK_IMPORTED_MODULE_6__["default"](category, adapterName, methodName, paramName)
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

    let localMaAdapter = new _adapters_tufts_adapter__WEBPACK_IMPORTED_MODULE_0__["default"]({
      category: 'morphology',
      adapterName: 'tufts',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getHomonym') {
      let homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word)
      return { result: homonym, errors: localMaAdapter.errors }
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

    let localTbAdapter = new _adapters_alpheiostb_adapter__WEBPACK_IMPORTED_MODULE_1__["default"]({
      category: 'morphology',
      adapterName: 'alpheiosTreebank',
      method: options.method,
      clientId: options.clientId
    })
    if (options.method === 'getHomonym') {
      let homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref)
      return { result: homonym, errors: localTbAdapter.errors }
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

    let localLemmasAdapter = new _adapters_translations_adapter__WEBPACK_IMPORTED_MODULE_2__["default"]({
      category: 'lemmatranslation',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'fetchTranslations') {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang)
      return { errors: localLemmasAdapter.errors }
    }
    return null
  }

  static async wordUsageExamples (options) {
    ClientAdapters.checkMethodParam('wordusageExamples', 'concordance', options)

    let localLemmasAdapter = new _adapters_concordance_adapter__WEBPACK_IMPORTED_MODULE_4__["default"]({
      category: 'wordUsage',
      adapterName: 'concordance',
      method: options.method,
      clientId: options.clientId
    })

    if (options.method === 'getAuthorsWorks') {
      let res = await localLemmasAdapter.getAuthorsWorks()
      return { result: res, errors: localLemmasAdapter.errors }
    }

    if (options.method === 'getWordUsageExamples') {
      let res = await localLemmasAdapter.getWordUsageExamples(options.params.homonym, options.params.filters, options.params.pagination, options.params.sort)
      return { result: res, errors: localLemmasAdapter.errors }
    }

    return null
  }

  /**
   * it is used for getting data from lexicons adapter
   * @param {Object} options - object contains parametes:
   *    @param {String} options.method - action that should be done wth the help of adapter - fetchShortDefs and fetchFullDefs
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

    let adapterParams = {
      category: 'lexicon',
      adapterName: 'alpheios',
      method: options.method,
      clientId: options.clientId,
      timeout: options.params.timeout ? options.params.timeout : 3000,
      callBackEvtSuccess: options.params.callBackEvtSuccess,
      callBackEvtFailed: options.params.callBackEvtFailed
    }

    let localLexiconsAdapter = new _adapters_lexicons_adapter__WEBPACK_IMPORTED_MODULE_3__["default"](adapterParams)

    if (options.method === 'fetchShortDefs') {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
    }
    if (options.method === 'fetchFullDefs') {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts)
      return { errors: localLexiconsAdapter.errors }
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
    try {
      Error.captureStackTrace(this, AdapterError)
    } catch (e) {
      // quietly continue
    }
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

module.exports = JSON.parse("{\"COOKIE_TEST_MESSAGE\":{\"message\":\"This is a test message about a biscuit.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\"},\"NUM_LINES_TEST_MESSAGE\":{\"message\":\"There {numLines, plural, =0 {are no queues} =1 {is one queue} other {are # queues}}.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\",\"params\":[\"numLines\"]}}");

/***/ }),

/***/ "./locales/en-us/messages.json":
/*!*************************************!*\
  !*** ./locales/en-us/messages.json ***!
  \*************************************/
/*! exports provided: COOKIE_TEST_MESSAGE, NUM_LINES_TEST_MESSAGE, MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE, MORPH_TUFTS_NO_HOMONYM, MORPH_TUFTS_NO_ANSWER_FOR_WORD, MORPH_TUFTS_UNKNOWN_ERROR, MORPH_TRANSFORM_NO_LANGUAGE, MORPH_TRANSFORM_NO_LEMMA, MORPH_TRANSFORM_NO_MAPPING_DATA, MORPH_TRANSFORM_INFLECTION_ERROR, BASIC_ADAPTER_NO_DATA_FROM_URL, BASIC_ADAPTER_EMPTY_URL, BASIC_ADAPTER_UNKNOWN_ERROR, BASIC_ADAPTER_URL_RESPONSE_FAILED, MORPH_TREEBANK_NO_URL, MORPH_TREEBANK_NO_ANSWER_FOR_WORD, MORPH_TREEBANK_UNKNOWN_ERROR, TRANSLATION_INPUT_PREPARE_ERROR, TRANSLATION_UNKNOWN_ERROR, TRANSLATION_INCORRECT_LEXEMES, LEXICONS_NO_ALLOWED_URL, LEXICONS_FAILED_CACHED_DATA, LEXICONS_FAILED_APPEND_DEFS, LEXICONS_NO_FULL_URL, LEXICONS_NO_DATA_FROM_URL, CONCORDANCE_AUTHOR_UPLOAD_ERROR, CONCORDANCE_WORD_USAGE_FETCH_ERROR, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"COOKIE_TEST_MESSAGE\":{\"message\":\"This is a test message about a cookie.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\"},\"NUM_LINES_TEST_MESSAGE\":{\"message\":\"There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.\",\"description\":\"A test message that is shown in a panel\",\"component\":\"Panel\",\"params\":[\"numLines\"]},\"MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE\":{\"message\":\"There is no engine for the given languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no engine is found for given languageID\",\"component\":\"morphology.tufts\",\"params\":[\"languageID\"]},\"MORPH_TUFTS_NO_HOMONYM\":{\"message\":\"There is no homonym for the given word - {word} and languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no homonym was returned from the source\",\"component\":\"morphology.tufts\",\"params\":[\"word\",\"languageID\"]},\"MORPH_TUFTS_NO_ANSWER_FOR_WORD\":{\"message\":\"There is no data from the source for the given word - {word} and languageID {languageID}\",\"description\":\"Error message for morphology.tufts adapter - when no data was returned from the source\",\"component\":\"morphology.tufts\",\"params\":[\"word\",\"languageID\"]},\"MORPH_TUFTS_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for morph.tufts adapter - unknown\",\"component\":\"morphology.tufts\",\"params\":[\"message\"]},\"MORPH_TRANSFORM_NO_LANGUAGE\":{\"message\":\"No Language was defined from json object\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\"},\"MORPH_TRANSFORM_NO_LEMMA\":{\"message\":\"No Lemma was defined from json object\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\"},\"MORPH_TRANSFORM_NO_MAPPING_DATA\":{\"message\":\"No mapping data found for {language}\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\",\"params\":[\"language\"]},\"MORPH_TRANSFORM_INFLECTION_ERROR\":{\"message\":\"Error parsing inflection: {error}\",\"description\":\"Error message for morph.tufts adapter - transform problem\",\"component\":\"morphology.tufts\",\"params\":[\"error\"]},\"BASIC_ADAPTER_NO_DATA_FROM_URL\":{\"message\":\"Unable to get data from url - {url}\",\"description\":\"Error message for basic adapter - when no data was returned from the url\",\"component\":\"basic_adapter\",\"params\":[\"url\"]},\"BASIC_ADAPTER_EMPTY_URL\":{\"message\":\"Unable to get data from empty url\",\"description\":\"Error message for basic adapter - when empty url was given\",\"component\":\"basic_adapter\"},\"BASIC_ADAPTER_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for basic adapter - unknown\",\"component\":\"basic_adapter\",\"params\":[\"message\"]},\"BASIC_ADAPTER_URL_RESPONSE_FAILED\":{\"message\":\"Request doesn't return data - {statusCode}: {statusText}\",\"description\":\"Error message for basic adapter - unknown\",\"component\":\"basic_adapter\",\"params\":[\"statusCode\",\"statusText\"]},\"MORPH_TREEBANK_NO_URL\":{\"message\":\"There is a problem with creating url for the given word - {word}\",\"description\":\"Error message for morph.treebank - no url for fetching data from treebank\",\"component\":\"morph.treebank\",\"params\":[\"word\"]},\"MORPH_TREEBANK_NO_ANSWER_FOR_WORD\":{\"message\":\"There is no data from the source for the given word - {word}\",\"description\":\"Error message for morphology.treebank adapter - when no data was returned from the source\",\"component\":\"morphology.treebank\",\"params\":[\"word\"]},\"MORPH_TREEBANK_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for morph.treebank adapter - unknown\",\"component\":\"morphology.treebank\",\"params\":[\"message\"]},\"TRANSLATION_INPUT_PREPARE_ERROR\":{\"message\":\"Some problems with preparing input for geting translations - {input}\",\"description\":\"Error message for lemmatranslation.alpheios adapter - problems with input\",\"component\":\"lemmatranslation.alpheios\",\"params\":[\"input\"]},\"TRANSLATION_UNKNOWN_ERROR\":{\"message\":\"Unknown error - {message}\",\"description\":\"Error message for lemmatranslation.alpheios adapter - unknown\",\"component\":\"lemmatranslation.alpheios\",\"params\":[\"message\"]},\"TRANSLATION_INCORRECT_LEXEMES\":{\"message\":\"There is no correct homonym in input\",\"description\":\"Error message for lemmatranslation.alpheios adapter - no lexemes\",\"component\":\"lemmatranslation.alpheios\"},\"LEXICONS_NO_ALLOWED_URL\":{\"message\":\"There are no allowed urls in the options\",\"description\":\"Error message for lexicon.alpheios adapter - no urls were found in options\",\"component\":\"lexicon.alpheios\"},\"LEXICONS_FAILED_CACHED_DATA\":{\"message\":\"There is a problem with catching data from lexicon source - {message}\",\"description\":\"Error message for lexicon.alpheios adapter - some problems with getting cached data\",\"component\":\"lexicon.alpheios\",\"params\":[\"message\"]},\"LEXICONS_FAILED_APPEND_DEFS\":{\"message\":\"There is a problem with updating definitions - {message}\",\"description\":\"Error message for lexicon.alpheios adapter - some problems with updating definitions\",\"component\":\"lexicon.alpheios\",\"params\":[\"message\"]},\"LEXICONS_NO_FULL_URL\":{\"message\":\"No full url is defined for definitions\",\"description\":\"Error message for lexicon.alpheios adapter - no full url is defined\",\"component\":\"lexicon.alpheios\"},\"LEXICONS_NO_DATA_FROM_URL\":{\"message\":\"No data recieved from url - {url}\",\"description\":\"Error message for lexicon.alpheios adapter - no data from url\",\"component\":\"lexicon.alpheios\",\"params\":[\"url\"]},\"CONCORDANCE_AUTHOR_UPLOAD_ERROR\":{\"message\":\"Some problems with retrieving from author/textWork config file - {message}\",\"description\":\"Error message for wordusageExamples.concordance adapter - problems with uploading data from author-work config file\",\"component\":\"wordusageExamples.concordance\",\"params\":[\"message\"]},\"CONCORDANCE_WORD_USAGE_FETCH_ERROR\":{\"message\":\"Some problems with fetching word usage examples from concordance api - {message}\",\"description\":\"Error message for wordusageExamples.concordance adapter - problems with fetching word usage examples from concordance api\",\"component\":\"wordusageExamples.concordance\",\"params\":[\"message\"]}}");

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