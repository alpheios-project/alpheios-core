class Us {
  /**
   * get resources from the provider
   * @param {Object} keyObj the object containing the data for lookup
   * @return {Object[]} an array of results
   */
  async getResources(e) {
    return [];
  }
  static getProviders(e) {
    return /* @__PURE__ */ new Map();
  }
}
function Ms(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Xe = { exports: {} };
/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/
var Bs = Xe.exports, Wt;
function Vs() {
  return Wt || (Wt = 1, (function(r, e) {
    ((t, s) => {
      r.exports = s();
    })(Bs, function t() {
      var s = typeof self < "u" ? self : typeof window < "u" ? window : s !== void 0 ? s : {}, n, i = !s.document && !!s.postMessage, o = s.IS_PAPA_WORKER || !1, l = {}, h = 0, u = {};
      function d(a) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(c) {
          var m = Z(c);
          m.chunkSize = parseInt(m.chunkSize), c.step || c.chunk || (m.chunkSize = null), this._handle = new C(m), (this._handle.streamer = this)._config = m;
        }).call(this, a), this.parseChunk = function(c, m) {
          var _ = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < _) {
            let v = this._config.newline;
            v || (E = this._config.quoteChar || '"', v = this._handle.guessLineEndings(c, E)), c = [...c.split(v).slice(_)].join(v);
          }
          this.isFirstChunk && k(this._config.beforeFirstChunk) && (E = this._config.beforeFirstChunk(c)) !== void 0 && (c = E), this.isFirstChunk = !1, this._halted = !1;
          var _ = this._partialLine + c, E = (this._partialLine = "", this._handle.parse(_, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            if (c = E.meta.cursor, _ = (this._finished || (this._partialLine = _.substring(c - this._baseIndex), this._baseIndex = c), E && E.data && (this._rowCount += E.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), o) s.postMessage({ results: E, workerId: u.WORKER_ID, finished: _ });
            else if (k(this._config.chunk) && !m) {
              if (this._config.chunk(E, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              this._completeResults = E = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(E.data), this._completeResults.errors = this._completeResults.errors.concat(E.errors), this._completeResults.meta = E.meta), this._completed || !_ || !k(this._config.complete) || E && E.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), _ || E && E.meta.paused || this._nextChunk(), E;
          }
          this._halted = !0;
        }, this._sendError = function(c) {
          k(this._config.error) ? this._config.error(c) : o && this._config.error && s.postMessage({ workerId: u.WORKER_ID, error: c, finished: !1 });
        };
      }
      function g(a) {
        var c;
        (a = a || {}).chunkSize || (a.chunkSize = u.RemoteChunkSize), d.call(this, a), this._nextChunk = i ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(m) {
          this._input = m, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (c = new XMLHttpRequest(), this._config.withCredentials && (c.withCredentials = this._config.withCredentials), i || (c.onload = ee(this._chunkLoaded, this), c.onerror = ee(this._chunkError, this)), c.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !i), this._config.downloadRequestHeaders) {
              var m, _ = this._config.downloadRequestHeaders;
              for (m in _) c.setRequestHeader(m, _[m]);
            }
            var E;
            this._config.chunkSize && (E = this._start + this._config.chunkSize - 1, c.setRequestHeader("Range", "bytes=" + this._start + "-" + E));
            try {
              c.send(this._config.downloadRequestBody);
            } catch (v) {
              this._chunkError(v.message);
            }
            i && c.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          c.readyState === 4 && (c.status < 200 || 400 <= c.status ? this._chunkError() : (this._start += this._config.chunkSize || c.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((m) => (m = m.getResponseHeader("Content-Range")) !== null ? parseInt(m.substring(m.lastIndexOf("/") + 1)) : -1)(c), this.parseChunk(c.responseText)));
        }, this._chunkError = function(m) {
          m = c.statusText || m, this._sendError(new Error(m));
        };
      }
      function y(a) {
        (a = a || {}).chunkSize || (a.chunkSize = u.LocalChunkSize), d.call(this, a);
        var c, m, _ = typeof FileReader < "u";
        this.stream = function(E) {
          this._input = E, m = E.slice || E.webkitSlice || E.mozSlice, _ ? ((c = new FileReader()).onload = ee(this._chunkLoaded, this), c.onerror = ee(this._chunkError, this)) : c = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var E = this._input, v = (this._config.chunkSize && (v = Math.min(this._start + this._config.chunkSize, this._input.size), E = m.call(E, this._start, v)), c.readAsText(E, this._config.encoding));
          _ || this._chunkLoaded({ target: { result: v } });
        }, this._chunkLoaded = function(E) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(E.target.result);
        }, this._chunkError = function() {
          this._sendError(c.error);
        };
      }
      function S(a) {
        var c;
        d.call(this, a = a || {}), this.stream = function(m) {
          return c = m, this._nextChunk();
        }, this._nextChunk = function() {
          var m, _;
          if (!this._finished) return m = this._config.chunkSize, c = m ? (_ = c.substring(0, m), c.substring(m)) : (_ = c, ""), this._finished = !c, this.parseChunk(_);
        };
      }
      function w(a) {
        d.call(this, a = a || {});
        var c = [], m = !0, _ = !1;
        this.pause = function() {
          d.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          d.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(E) {
          this._input = E, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          _ && c.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), c.length ? this.parseChunk(c.shift()) : m = !0;
        }, this._streamData = ee(function(E) {
          try {
            c.push(typeof E == "string" ? E : E.toString(this._config.encoding)), m && (m = !1, this._checkIsFinished(), this.parseChunk(c.shift()));
          } catch (v) {
            this._streamError(v);
          }
        }, this), this._streamError = ee(function(E) {
          this._streamCleanUp(), this._sendError(E);
        }, this), this._streamEnd = ee(function() {
          this._streamCleanUp(), _ = !0, this._streamData("");
        }, this), this._streamCleanUp = ee(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function C(a) {
        var c, m, _, E, v = Math.pow(2, 53), W = -v, fe = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, de = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, D = this, j = 0, R = 0, se = !1, T = !1, N = [], O = { data: [], errors: [], meta: {} };
        function X(L) {
          return a.skipEmptyLines === "greedy" ? L.join("").trim() === "" : L.length === 1 && L[0].length === 0;
        }
        function K() {
          if (O && _ && (pe("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + u.DefaultDelimiter + "'"), _ = !1), a.skipEmptyLines && (O.data = O.data.filter(function(A) {
            return !X(A);
          })), te()) {
            let A = function($, Q) {
              k(a.transformHeader) && ($ = a.transformHeader($, Q)), N.push($);
            };
            if (O) if (Array.isArray(O.data[0])) {
              for (var L = 0; te() && L < O.data.length; L++) O.data[L].forEach(A);
              O.data.splice(0, 1);
            } else O.data.forEach(A);
          }
          function P(A, $) {
            for (var Q = a.header ? {} : [], U = 0; U < A.length; U++) {
              var B = U, x = A[U], x = ((he, F) => ((z) => (a.dynamicTypingFunction && a.dynamicTyping[z] === void 0 && (a.dynamicTyping[z] = a.dynamicTypingFunction(z)), (a.dynamicTyping[z] || a.dynamicTyping) === !0))(he) ? F === "true" || F === "TRUE" || F !== "false" && F !== "FALSE" && (((z) => {
                if (fe.test(z) && (z = parseFloat(z), W < z && z < v))
                  return 1;
              })(F) ? parseFloat(F) : de.test(F) ? new Date(F) : F === "" ? null : F) : F)(B = a.header ? U >= N.length ? "__parsed_extra" : N[U] : B, x = a.transform ? a.transform(x, B) : x);
              B === "__parsed_extra" ? (Q[B] = Q[B] || [], Q[B].push(x)) : Q[B] = x;
            }
            return a.header && (U > N.length ? pe("FieldMismatch", "TooManyFields", "Too many fields: expected " + N.length + " fields but parsed " + U, R + $) : U < N.length && pe("FieldMismatch", "TooFewFields", "Too few fields: expected " + N.length + " fields but parsed " + U, R + $)), Q;
          }
          var q;
          O && (a.header || a.dynamicTyping || a.transform) && (q = 1, !O.data.length || Array.isArray(O.data[0]) ? (O.data = O.data.map(P), q = O.data.length) : O.data = P(O.data, 0), a.header && O.meta && (O.meta.fields = N), R += q);
        }
        function te() {
          return a.header && N.length === 0;
        }
        function pe(L, P, q, A) {
          L = { type: L, code: P, message: q }, A !== void 0 && (L.row = A), O.errors.push(L);
        }
        k(a.step) && (E = a.step, a.step = function(L) {
          O = L, te() ? K() : (K(), O.data.length !== 0 && (j += L.data.length, a.preview && j > a.preview ? m.abort() : (O.data = O.data[0], E(O, D))));
        }), this.parse = function(L, P, q) {
          var A = a.quoteChar || '"', A = (a.newline || (a.newline = this.guessLineEndings(L, A)), _ = !1, a.delimiter ? k(a.delimiter) && (a.delimiter = a.delimiter(L), O.meta.delimiter = a.delimiter) : ((A = (($, Q, U, B, x) => {
            var he, F, z, Se;
            x = x || [",", "	", "|", ";", u.RECORD_SEP, u.UNIT_SEP];
            for (var ve = 0; ve < x.length; ve++) {
              for (var ye, Me = x[ve], ne = 0, we = 0, Y = 0, ae = (z = void 0, new V({ comments: B, delimiter: Me, newline: Q, preview: 10 }).parse($)), be = 0; be < ae.data.length; be++) U && X(ae.data[be]) ? Y++ : (ye = ae.data[be].length, we += ye, z === void 0 ? z = ye : 0 < ye && (ne += Math.abs(ye - z), z = ye));
              0 < ae.data.length && (we /= ae.data.length - Y), (F === void 0 || ne <= F) && (Se === void 0 || Se < we) && 1.99 < we && (F = ne, he = Me, Se = we);
            }
            return { successful: !!(a.delimiter = he), bestDelimiter: he };
          })(L, a.newline, a.skipEmptyLines, a.comments, a.delimitersToGuess)).successful ? a.delimiter = A.bestDelimiter : (_ = !0, a.delimiter = u.DefaultDelimiter), O.meta.delimiter = a.delimiter), Z(a));
          return a.preview && a.header && A.preview++, c = L, m = new V(A), O = m.parse(c, P, q), K(), se ? { meta: { paused: !0 } } : O || { meta: { paused: !1 } };
        }, this.paused = function() {
          return se;
        }, this.pause = function() {
          se = !0, m.abort(), c = k(a.chunk) ? "" : c.substring(m.getCharIndex());
        }, this.resume = function() {
          D.streamer._halted ? (se = !1, D.streamer.parseChunk(c, !0)) : setTimeout(D.resume, 3);
        }, this.aborted = function() {
          return T;
        }, this.abort = function() {
          T = !0, m.abort(), O.meta.aborted = !0, k(a.complete) && a.complete(O), c = "";
        }, this.guessLineEndings = function($, A) {
          $ = $.substring(0, 1048576);
          var A = new RegExp(b(A) + "([^]*?)" + b(A), "gm"), q = ($ = $.replace(A, "")).split("\r"), A = $.split(`
`), $ = 1 < A.length && A[0].length < q[0].length;
          if (q.length === 1 || $) return `
`;
          for (var Q = 0, U = 0; U < q.length; U++) q[U][0] === `
` && Q++;
          return Q >= q.length / 2 ? `\r
` : "\r";
        };
      }
      function b(a) {
        return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function V(a) {
        var c = (a = a || {}).delimiter, m = a.newline, _ = a.comments, E = a.step, v = a.preview, W = a.fastMode, fe = null, de = !1, D = a.quoteChar == null ? '"' : a.quoteChar, j = D;
        if (a.escapeChar !== void 0 && (j = a.escapeChar), (typeof c != "string" || -1 < u.BAD_DELIMITERS.indexOf(c)) && (c = ","), _ === c) throw new Error("Comment character same as delimiter");
        _ === !0 ? _ = "#" : (typeof _ != "string" || -1 < u.BAD_DELIMITERS.indexOf(_)) && (_ = !1), m !== `
` && m !== "\r" && m !== `\r
` && (m = `
`);
        var R = 0, se = !1;
        this.parse = function(T, N, O) {
          if (typeof T != "string") throw new Error("Input must be a string");
          var X = T.length, K = c.length, te = m.length, pe = _.length, L = k(E), P = [], q = [], A = [], $ = R = 0;
          if (!T) return ne();
          if (W || W !== !1 && T.indexOf(D) === -1) {
            for (var Q = T.split(m), U = 0; U < Q.length; U++) {
              if (A = Q[U], R += A.length, U !== Q.length - 1) R += m.length;
              else if (O) return ne();
              if (!_ || A.substring(0, pe) !== _) {
                if (L) {
                  if (P = [], Se(A.split(c)), we(), se) return ne();
                } else Se(A.split(c));
                if (v && v <= U) return P = P.slice(0, v), ne(!0);
              }
            }
            return ne();
          }
          for (var B = T.indexOf(c, R), x = T.indexOf(m, R), he = new RegExp(b(j) + b(D), "g"), F = T.indexOf(D, R); ; ) if (T[R] === D) for (F = R, R++; ; ) {
            if ((F = T.indexOf(D, F + 1)) === -1) return O || q.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: P.length, index: R }), ye();
            if (F === X - 1) return ye(T.substring(R, F).replace(he, D));
            if (D === j && T[F + 1] === j) F++;
            else if (D === j || F === 0 || T[F - 1] !== j) {
              B !== -1 && B < F + 1 && (B = T.indexOf(c, F + 1));
              var z = ve((x = x !== -1 && x < F + 1 ? T.indexOf(m, F + 1) : x) === -1 ? B : Math.min(B, x));
              if (T.substr(F + 1 + z, K) === c) {
                A.push(T.substring(R, F).replace(he, D)), T[R = F + 1 + z + K] !== D && (F = T.indexOf(D, R)), B = T.indexOf(c, R), x = T.indexOf(m, R);
                break;
              }
              if (z = ve(x), T.substring(F + 1 + z, F + 1 + z + te) === m) {
                if (A.push(T.substring(R, F).replace(he, D)), Me(F + 1 + z + te), B = T.indexOf(c, R), F = T.indexOf(D, R), L && (we(), se)) return ne();
                if (v && P.length >= v) return ne(!0);
                break;
              }
              q.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: P.length, index: R }), F++;
            }
          }
          else if (_ && A.length === 0 && T.substring(R, R + pe) === _) {
            if (x === -1) return ne();
            R = x + te, x = T.indexOf(m, R), B = T.indexOf(c, R);
          } else if (B !== -1 && (B < x || x === -1)) A.push(T.substring(R, B)), R = B + K, B = T.indexOf(c, R);
          else {
            if (x === -1) break;
            if (A.push(T.substring(R, x)), Me(x + te), L && (we(), se)) return ne();
            if (v && P.length >= v) return ne(!0);
          }
          return ye();
          function Se(Y) {
            P.push(Y), $ = R;
          }
          function ve(Y) {
            var ae = 0;
            return ae = Y !== -1 && (Y = T.substring(F + 1, Y)) && Y.trim() === "" ? Y.length : ae;
          }
          function ye(Y) {
            return O || (Y === void 0 && (Y = T.substring(R)), A.push(Y), R = X, Se(A), L && we()), ne();
          }
          function Me(Y) {
            R = Y, Se(A), A = [], x = T.indexOf(m, R);
          }
          function ne(Y) {
            if (a.header && !N && P.length && !de) {
              var ae = P[0], be = /* @__PURE__ */ Object.create(null), mt = new Set(ae);
              let Kt = !1;
              for (let De = 0; De < ae.length; De++) {
                let Ee = ae[De];
                if (be[Ee = k(a.transformHeader) ? a.transformHeader(Ee, De) : Ee]) {
                  let Be, Jt = be[Ee];
                  for (; Be = Ee + "_" + Jt, Jt++, mt.has(Be); ) ;
                  mt.add(Be), ae[De] = Be, be[Ee]++, Kt = !0, (fe = fe === null ? {} : fe)[Be] = Ee;
                } else be[Ee] = 1, ae[De] = Ee;
                mt.add(Ee);
              }
              Kt && console.warn("Duplicate headers found and renamed."), de = !0;
            }
            return { data: P, errors: q, meta: { delimiter: c, linebreak: m, aborted: se, truncated: !!Y, cursor: $ + (N || 0), renamedHeaders: fe } };
          }
          function we() {
            E(ne()), P = [], q = [];
          }
        }, this.abort = function() {
          se = !0;
        }, this.getCharIndex = function() {
          return R;
        };
      }
      function H(a) {
        var c = a.data, m = l[c.workerId], _ = !1;
        if (c.error) m.userError(c.error, c.file);
        else if (c.results && c.results.data) {
          var E = { abort: function() {
            _ = !0, G(c.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: ce, resume: ce };
          if (k(m.userStep)) {
            for (var v = 0; v < c.results.data.length && (m.userStep({ data: c.results.data[v], errors: c.results.errors, meta: c.results.meta }, E), !_); v++) ;
            delete c.results;
          } else k(m.userChunk) && (m.userChunk(c.results, E, c.file), delete c.results);
        }
        c.finished && !_ && G(c.workerId, c.results);
      }
      function G(a, c) {
        var m = l[a];
        k(m.userComplete) && m.userComplete(c), m.terminate(), delete l[a];
      }
      function ce() {
        throw new Error("Not implemented.");
      }
      function Z(a) {
        if (typeof a != "object" || a === null) return a;
        var c, m = Array.isArray(a) ? [] : {};
        for (c in a) m[c] = Z(a[c]);
        return m;
      }
      function ee(a, c) {
        return function() {
          a.apply(c, arguments);
        };
      }
      function k(a) {
        return typeof a == "function";
      }
      return u.parse = function(a, c) {
        var m = (c = c || {}).dynamicTyping || !1;
        if (k(m) && (c.dynamicTypingFunction = m, m = {}), c.dynamicTyping = m, c.transform = !!k(c.transform) && c.transform, !c.worker || !u.WORKERS_SUPPORTED) return m = null, u.NODE_STREAM_INPUT, typeof a == "string" ? (a = ((_) => _.charCodeAt(0) !== 65279 ? _ : _.slice(1))(a), m = new (c.download ? g : S)(c)) : a.readable === !0 && k(a.read) && k(a.on) ? m = new w(c) : (s.File && a instanceof File || a instanceof Object) && (m = new y(c)), m.stream(a);
        (m = (() => {
          var _;
          return !!u.WORKERS_SUPPORTED && (_ = (() => {
            var E = s.URL || s.webkitURL || null, v = t.toString();
            return u.BLOB_URL || (u.BLOB_URL = E.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", v, ")();"], { type: "text/javascript" })));
          })(), (_ = new s.Worker(_)).onmessage = H, _.id = h++, l[_.id] = _);
        })()).userStep = c.step, m.userChunk = c.chunk, m.userComplete = c.complete, m.userError = c.error, c.step = k(c.step), c.chunk = k(c.chunk), c.complete = k(c.complete), c.error = k(c.error), delete c.worker, m.postMessage({ input: a, config: c, workerId: m.id });
      }, u.unparse = function(a, c) {
        var m = !1, _ = !0, E = ",", v = `\r
`, W = '"', fe = W + W, de = !1, D = null, j = !1, R = ((() => {
          if (typeof c == "object") {
            if (typeof c.delimiter != "string" || u.BAD_DELIMITERS.filter(function(N) {
              return c.delimiter.indexOf(N) !== -1;
            }).length || (E = c.delimiter), typeof c.quotes != "boolean" && typeof c.quotes != "function" && !Array.isArray(c.quotes) || (m = c.quotes), typeof c.skipEmptyLines != "boolean" && typeof c.skipEmptyLines != "string" || (de = c.skipEmptyLines), typeof c.newline == "string" && (v = c.newline), typeof c.quoteChar == "string" && (W = c.quoteChar), typeof c.header == "boolean" && (_ = c.header), Array.isArray(c.columns)) {
              if (c.columns.length === 0) throw new Error("Option columns is empty");
              D = c.columns;
            }
            c.escapeChar !== void 0 && (fe = c.escapeChar + W), c.escapeFormulae instanceof RegExp ? j = c.escapeFormulae : typeof c.escapeFormulae == "boolean" && c.escapeFormulae && (j = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(b(W), "g"));
        if (typeof a == "string" && (a = JSON.parse(a)), Array.isArray(a)) {
          if (!a.length || Array.isArray(a[0])) return se(null, a, de);
          if (typeof a[0] == "object") return se(D || Object.keys(a[0]), a, de);
        } else if (typeof a == "object") return typeof a.data == "string" && (a.data = JSON.parse(a.data)), Array.isArray(a.data) && (a.fields || (a.fields = a.meta && a.meta.fields || D), a.fields || (a.fields = Array.isArray(a.data[0]) ? a.fields : typeof a.data[0] == "object" ? Object.keys(a.data[0]) : []), Array.isArray(a.data[0]) || typeof a.data[0] == "object" || (a.data = [a.data])), se(a.fields || [], a.data || [], de);
        throw new Error("Unable to serialize unrecognized input");
        function se(N, O, X) {
          var K = "", te = (typeof N == "string" && (N = JSON.parse(N)), typeof O == "string" && (O = JSON.parse(O)), Array.isArray(N) && 0 < N.length), pe = !Array.isArray(O[0]);
          if (te && _) {
            for (var L = 0; L < N.length; L++) 0 < L && (K += E), K += T(N[L], L);
            0 < O.length && (K += v);
          }
          for (var P = 0; P < O.length; P++) {
            var q = (te ? N : O[P]).length, A = !1, $ = te ? Object.keys(O[P]).length === 0 : O[P].length === 0;
            if (X && !te && (A = X === "greedy" ? O[P].join("").trim() === "" : O[P].length === 1 && O[P][0].length === 0), X === "greedy" && te) {
              for (var Q = [], U = 0; U < q; U++) {
                var B = pe ? N[U] : U;
                Q.push(O[P][B]);
              }
              A = Q.join("").trim() === "";
            }
            if (!A) {
              for (var x = 0; x < q; x++) {
                0 < x && !$ && (K += E);
                var he = te && pe ? N[x] : x;
                K += T(O[P][he], x);
              }
              P < O.length - 1 && (!X || 0 < q && !$) && (K += v);
            }
          }
          return K;
        }
        function T(N, O) {
          var X, K;
          return N == null ? "" : N.constructor === Date ? JSON.stringify(N).slice(1, 25) : (K = !1, j && typeof N == "string" && j.test(N) && (N = "'" + N, K = !0), X = N.toString().replace(R, fe), (K = K || m === !0 || typeof m == "function" && m(N, O) || Array.isArray(m) && m[O] || ((te, pe) => {
            for (var L = 0; L < pe.length; L++) if (-1 < te.indexOf(pe[L])) return !0;
            return !1;
          })(X, u.BAD_DELIMITERS) || -1 < X.indexOf(E) || X.charAt(0) === " " || X.charAt(X.length - 1) === " ") ? W + X + W : X);
        }
      }, u.RECORD_SEP = "", u.UNIT_SEP = "", u.BYTE_ORDER_MARK = "\uFEFF", u.BAD_DELIMITERS = ["\r", `
`, '"', u.BYTE_ORDER_MARK], u.WORKERS_SUPPORTED = !i && !!s.Worker, u.NODE_STREAM_INPUT = 1, u.LocalChunkSize = 10485760, u.RemoteChunkSize = 5242880, u.DefaultDelimiter = ",", u.Parser = V, u.ParserHandle = C, u.NetworkStreamer = g, u.FileStreamer = y, u.StringStreamer = S, u.ReadableStreamStreamer = w, s.jQuery && ((n = s.jQuery).fn.parse = function(a) {
        var c = a.config || {}, m = [];
        return this.each(function(v) {
          if (!(n(this).prop("tagName").toUpperCase() === "INPUT" && n(this).attr("type").toLowerCase() === "file" && s.FileReader) || !this.files || this.files.length === 0) return !0;
          for (var W = 0; W < this.files.length; W++) m.push({ file: this.files[W], inputElem: this, instanceConfig: n.extend({}, c) });
        }), _(), this;
        function _() {
          if (m.length === 0) k(a.complete) && a.complete();
          else {
            var v, W, fe, de, D = m[0];
            if (k(a.before)) {
              var j = a.before(D.file, D.inputElem);
              if (typeof j == "object") {
                if (j.action === "abort") return v = "AbortError", W = D.file, fe = D.inputElem, de = j.reason, void (k(a.error) && a.error({ name: v }, W, fe, de));
                if (j.action === "skip") return void E();
                typeof j.config == "object" && (D.instanceConfig = n.extend(D.instanceConfig, j.config));
              } else if (j === "skip") return void E();
            }
            var R = D.instanceConfig.complete;
            D.instanceConfig.complete = function(se) {
              k(R) && R(se, D.file, D.inputElem), E();
            }, u.parse(D.file, D.instanceConfig);
          }
        }
        function E() {
          m.splice(0, 1), _();
        }
      }), o && (s.onmessage = function(a) {
        a = a.data, u.WORKER_ID === void 0 && a && (u.WORKER_ID = a.workerId), typeof a.input == "string" ? s.postMessage({ workerId: u.WORKER_ID, results: u.parse(a.input, a.config), finished: !0 }) : (s.File && a.input instanceof File || a.input instanceof Object) && (a = u.parse(a.input, a.config)) && s.postMessage({ workerId: u.WORKER_ID, results: a, finished: !0 });
      }), (g.prototype = Object.create(d.prototype)).constructor = g, (y.prototype = Object.create(d.prototype)).constructor = y, (S.prototype = Object.create(S.prototype)).constructor = S, (w.prototype = Object.create(d.prototype)).constructor = w, u;
    });
  })(Xe)), Xe.exports;
}
var zs = Vs();
const js = /* @__PURE__ */ Ms(zs), Fe = Symbol("word"), qs = Symbol("char"), $e = Symbol("ltr"), Ut = Symbol("rtl"), Fr = Symbol("undefined"), $s = Symbol("latin"), Hs = Symbol("greek"), Gs = Symbol("arabic"), Ks = Symbol("persian"), vr = Symbol("ge'ez"), Dr = Symbol("chinese"), Nr = Symbol("syriac"), Lr = "undefined", Ot = "lat", xr = "la", Ct = "grc", Rt = "ara", kr = "ar", Js = "fas", At = "per", Ws = "fa-IR", Xs = "fa", It = "gez", Tt = "zho", Qs = "zh", Zs = "zh-Hant", Ys = "zh-Hans", Pr = "syc", Ft = "syr", Ur = "syr-Syrj", et = "adjective", Le = "adverb", Mr = "adverbial", Mt = "article", Br = "conjunction", xe = "exclamation", ke = "interjection", tt = "noun", Xt = "proper noun", Bt = "numeral", rt = "particle", Vr = "prefix", zr = "preposition", ze = "pronoun", jr = "suffix", en = "gerundive", Vt = "supine", je = "verb", zt = "verb participle", tn = "denominative", rn = "masculine", sn = "feminine", nn = "neuter", on = "ablative", qr = "accusative", $r = "dative", Hr = "genitive", an = "locative", Gr = "nominative", Kr = "vocative", Qt = "gerundive", Jr = "imperative", Wr = "indicative", un = "infinitive", ln = "optative", yt = "participle", Xr = "subjunctive", cn = "supine", jt = "singular", qt = "plural", fn = "dual", st = "1st", nt = "2nd", it = "3rd", Zt = "4th", dn = "5th", pn = "aorist", Qr = "future", Zr = "future perfect", Yr = "imperfect", es = "perfect", ts = "pluperfect", rs = "present", ss = "active", ns = "passive", hn = "mediopassive", gn = "middle", mn = "irregular", yn = "regular", is = "personal", os = "reflexive", as = "possessive", us = "demonstrative", ls = "relative", cs = "interrogative", wn = "general relative", En = "indefinite", _n = "intensive", bn = "reciprocal", Sn = [];
for (let r = 0; r < 256; ++r)
  Sn.push((r + 256).toString(16).slice(1));
typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
class ot {
  /**
   * @param {string} uri - a unique resource identifier for this provider
   * @param {string} rights - rights text
   * @param {Map} rightsTranslations - optional map of translated rights text - keys should be language of text, values the text
   */
  constructor(e = "", t = "", s = /* @__PURE__ */ new Map([["default", t]])) {
    this.uri = e, this.rights = s, this.rights.has("default") || this.rights.set("default", t);
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
  toLocaleString(e) {
    return this.rights.get(e) || this.rights.get("default");
  }
  static getProxy(e = null, t = {}) {
    return new Proxy(t, {
      get: function(s, n) {
        return n === "provider" ? e : s[n];
      }
    });
  }
  convertToJSONObject() {
    let e = {};
    for (const [s, n] of this.rights.entries())
      e[s] = n;
    return {
      uri: this.uri,
      rights: e
    };
  }
  static readObject(e) {
    const t = /* @__PURE__ */ new Map();
    return e.rights && Object.keys(e.rights).forEach((s) => {
      t.set(s, e.rights[s]);
    }), new ot(e.uri, "", t);
  }
}
class fs {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @returns {FeatureImporter}
   */
  constructor(e = [], t = !1) {
    this.hash = {};
    for (const s of e)
      this.map(s, s);
    return this.returnUnknown = t, this;
  }
  /**
   * Sets mapping between external imported value and one or more library standard values. If an importedValue
   * is already in a hash table, old libraryValue will be overwritten with the new one.
   *
   * @param {string} importedValue - External value
   * @param {object|object[]|string|string[]} libraryValue - Library standard value
   */
  map(e, t) {
    if (!e)
      throw new Error("Imported value should not be empty.");
    if (!t)
      throw new Error("Library value should not be empty.");
    return this.hash[e] = t, this;
  }
  /**
   * Checks if value is in a map.
   *
   * @param {string} importedValue - A value to test.
   * @returns {boolean} - Tru if value is in a map, false otherwise.
   */
  has(e) {
    return this.hash.hasOwnProperty(e);
  }
  /**
   * Returns one or more library standard values that match an external value
   *
   * @param {string} sourceValue - External value
   * @returns {object|string} One or more of library standard values
   */
  get(e) {
    if (this.has(e))
      return this.hash[e];
    if (this.returnUnknown)
      return e;
    throw new Error('A value "' + e + '" is not found in the importer.');
  }
}
let Ne;
class M {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor({ verbose: e = !1, prepend: t = !0, trace: s = !1 } = {}) {
    this._verboseMode = e, this._prependMode = t, this._traceMode = s;
  }
  /**
   * Returns a single instance of the Logger object. If one does not exist, it will be created
   * with the options specified. If the Logger instance is already created, but there are some
   * options provided, options of the existing Logger object will be changed to match the ones supplied.
   *
   * @param {object} options - Options of the Logger constructor {@see Logger#constructor}.
   * @returns {Logger} - An instance of existing or newly created Logger object.
   */
  static getInstance(e = {}) {
    return Ne ? (typeof e.verbose < "u" && (console.info("Setting a verbose mode"), Ne.setVerboseMode(e.verbose)), typeof e.prepend < "u" && (console.info("Setting a prepend mode"), Ne.setVerboseMode(e.prepend)), typeof e.trace < "u" && (console.info("Setting a trace mode"), Ne.setTraceMode(e.trace))) : Ne = new M(e), Ne;
  }
  setVerboseMode(e) {
    return this._verboseMode = e, this;
  }
  setPrependMode(e) {
    return this._prependMode = e, this;
  }
  setTraceMode(e) {
    return this._traceMode = e, this;
  }
  verboseModeOn() {
    return this.setVerboseMode(!0), this;
  }
  verboseModeOff() {
    return this.setVerboseMode(!1), this;
  }
  prependModeOn() {
    return this.setPrependMode(!0), this;
  }
  prependModeOff() {
    return this.setPrependMode(!1), this;
  }
  traceModeOn() {
    return this.setTraceMode(!0), this;
  }
  traceModeOff() {
    return this.setTraceMode(!1), this;
  }
  error(...e) {
    this._prependMode && e && e.length > 0 && typeof e[0] == "string" && (e[0] = `Alpheios error: ${e[0]}`), console.error(...e), this._traceMode && console.trace();
  }
  warn(...e) {
    this._verboseMode && (this._prependMode && e && e.length > 0 && typeof e[0] == "string" && (e[0] = `Alpheios warn: ${e[0]}`), console.warn(...e), this._traceMode && console.trace());
  }
  log(...e) {
    this._verboseMode && (this._prependMode && e && e.length > 0 && typeof e[0] == "string" && (e[0] = `Alpheios log: ${e[0]}`), console.log(...e), this._traceMode && console.trace());
  }
  info(...e) {
    this._verboseMode && (this._prependMode && e && e.length > 0 && typeof e[0] == "string" && (e[0] = `Alpheios info: ${e[0]}`), console.info(...e), this._traceMode && console.trace());
  }
}
class f {
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
  constructor(e, t, s, n = 1, i = []) {
    if (!f.isAllowedType(e))
      throw new Error('Features of "' + e + '" type are not supported.');
    if (!t)
      throw new Error("Feature should have a non-empty value(s).");
    if (!s)
      throw new Error("No language ID is provided");
    this.type = e, this.languageID = s, this.sortOrder = n, this.allowedValues = i, this._data = f.dataValuesFromInput(t), this.sort();
  }
  /**
   *
   * @param {string | string[] | string[][]} data - Feature values with, possibly, their sort order.
   *        @see {@link Feature#constructor} for more details about possible values of `data` parameter.
   * @returns {{sortOrder: number, value: *}[]} Array of object in a format that will be used to store
   *          data values along with their sort order within a Feature object
   */
  static dataValuesFromInput(e) {
    let t;
    return Array.isArray(e) ? Array.isArray(e[0]) ? t = e : t = e.map((s, n) => [s, e.length - n]) : t = [[e, this.defaultSortOrder]], t.map((s) => ({ value: s[0], sortOrder: Number.parseInt(s[1]) }));
  }
  /**
   *
   * @param featureData
   */
  static newFromFtr(e) {
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
  static isAllowedType(e) {
    return Object.values(this.types).includes(`${e}`);
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
    this._data.sort((e, t) => e.sortOrder !== t.sortOrder ? t.sortOrder - e.sortOrder : e.value.localeCompare(t.value));
  }
  /**
   * Compares a feature's values to another feature's values for sorting
   *
   * @param {Feature} otherFeature the feature to compare this feature's values to
   * @returns {number} < 1 if this feature should be sorted first, 0 if they are equal and -1 if this feature should be sorted second
   */
  compareTo(e) {
    return e ? e._data[0].sortOrder - this._data[0].sortOrder : -1;
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
    if (this._data.length !== 0) {
      if (this._data.length > 1) throw new Error(f.errMsgs.NO_SINGLE_VALUE);
      return this._data[0].value;
    }
  }
  /**
   * Returns an array of string values of a feature, sorted according to each item's sort order.
   * If a feature contains a single feature, an array with one value will be returned.
   *
   * @returns {*[]} An array of values in a format in which they are stored in the Feature object.
   */
  get values() {
    return this._data.map((e) => e.value);
  }
  /**
   * Retrieves a value object by name. Can be used to update a value object directly.
   *
   * @param {string} featureValue - A feature value of an object to retrieve.
   */
  getValue(e) {
    return this._data.find((t) => t.value === e);
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
  hasValue(e) {
    return this.values.includes(e);
  }
  /**
   * Checks if this feature has all value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasValues(e) {
    let t = !0;
    for (const s of e)
      t = t && this.hasValue(s);
    return t;
  }
  /**
   * Checks if this feature has some value from an array.
   *
   * @param {string[]} values - An array of values to check for.
   * @returns {boolean} true if the value is included in the feature's values.
   */
  hasSomeValues(e) {
    let t = !1;
    for (const s of e)
      t = t || this.hasValue(s);
    return t;
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
  isEqual(e) {
    return e && this.type === e.type && re.compareLanguages(this.languageID, e.languageID) && this.value === e.value;
  }
  /**
   * Adds a single new value to the existing feature object.
   * This function is chainable.
   *
   * @param {string} value - A feature value.
   * @param {number} sortOrder - A sort order.
   * @returns {Feature} - Self reference for chaining.
   */
  addValue(e, t = this.constructor.defaultSortOrder) {
    return this.hasValue(e) ? M.getInstance().warn(`Value "${e}" already exists. If you want to change it, use "getValue" to access it directly.`) : (this._data.push({
      value: e,
      sortOrder: t
    }), this.sort()), this;
  }
  /**
   * Adds multiple new values to the existing feature object.
   * This function is chainable.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations.
   * @returns {Feature} - Self reference for chaining.
   */
  addValues(e) {
    const t = this.constructor.dataValuesFromInput(e), s = t.map((n) => n.value);
    return this.hasSomeValues(s) ? M.getInstance().warn(`One or several values from "${s}" already exist. If you want to change it, use "getValue" to access a value directly.`) : (this._data = this._data.concat(t), this.sort()), this;
  }
  /**
   * Removes a single value from the existing feature object.
   *
   * @param value
   */
  removeValue(e) {
    M.getInstance().warn("This feature is not implemented yet");
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
  createFeature(e, t = this.constructor.defaultSortOrder) {
    return new f(this.type, [[e, t]], this.languageID, this.sortOrder, this.allowedValues);
  }
  /**
   * Creates a multiple value Feature object of the same type and same language,
   * but with a different feature values.
   *
   * @param {string | string[] | string[][]} data - Single or multiple values, in different combinations,
   * formatted according to rules described in a Ftr constructor.
   * @returns {Feature} A new Ftr object.
   */
  createFeatures(e) {
    return new f(this.type, e, this.languageID, this.sortOrder, this.allowedValues);
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
    return this.values.map((e) => new f(this.type, e, this.languageID, 1, this.allowedValues));
  }
  /**
   * Create a copy of the feature object.
   */
  getCopy() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return new f(this.type, e, this.languageID, this.sortOrder, this.allowedValues.slice());
  }
  /**
   * Adds an importer to the internal list.
   *
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter(e = new fs(), t = this.constructor.defaultImporterName) {
    return this.importers || (this.importers = /* @__PURE__ */ new Map()), this.importers.set(t, e), e;
  }
  getImporter(e = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(e))
      throw new Error(`Importer "${e}" does not exist`);
    return this.importers.get(e);
  }
  /**
   * Adds feature values from the imported values.
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
   */
  addFromImporter(e, t = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(t))
      throw new Error(`Importer "${t}" does not exist`);
    const s = this.importers.get(t);
    return e = this.constructor.dataValuesFromInput(e), this._data.push(...e.map((n) => ({ value: s.get(n.value), sortOrder: n.sortOrder }))), this.sort(), this;
  }
  /**
   * Creates a new feature of the same type and with the same language from the imported values.
   *
   * @param {string | string[]} foreignData - A single value or an array of values from a third-party source.
   * @param {string} name - A name of an importer.
   * @returns {Feature} - A new Ftr object.
   */
  createFromImporter(e, t = this.constructor.defaultImporterName) {
    if (!this.importers || !this.importers.has(t))
      throw new Error(`Importer "${t}" does not exist`);
    const s = this.importers.get(t);
    Array.isArray(e) || (e = [e]);
    let n = e.map((i) => s.get(i));
    return n = n.reduce((i, o) => i.concat(o), []), new f(this.type, n, this.languageID, this.sortOrder, this.allowedValues);
  }
  convertToJSONObject() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return {
      type: this.type,
      languageCode: re.getLanguageCodeFromId(this.languageID),
      sortOrder: this.sortOrder,
      allowedValues: this.allowedValues,
      data: e
    };
  }
  static readObject(e) {
    const t = re.getLanguageIdFromCode(e.languageCode);
    return new f(e.type, e.data, t, e.sortOrder, e.allowedValues);
  }
}
f.errMsgs = {
  NO_SINGLE_VALUE: "More than one value stored"
};
class lt {
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
  constructor(e, t, s) {
    if (!t || !Array.isArray(t))
      throw new Error("Values should be an array (or an empty array) of values.");
    if (!s)
      throw new Error("FeatureType constructor requires a language");
    this.type = e, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = re.getLanguageAttrs(s), this._orderIndex = [], this._orderLookup = {};
    for (const [n, i] of t.entries())
      if (this._orderIndex.push(i), Array.isArray(i))
        for (const o of i)
          this[o] = new f(this.type, o, this.languageID), this._orderLookup[o] = n;
      else
        this[i] = new f(this.type, i, this.languageID), this._orderLookup[i] = n;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return M.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  /**
   * test to see if this FeatureType allows unrestricted values
   *
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue() {
    return this.orderedValues.length === 1 && this.orderedValues[0] === lt.UNRESTRICTED_VALUE;
  }
  /**
   * Return a Feature with an arbitrary value. This value would not be necessarily present among FeatureType values.
   * This can be especially useful for features that do not set: a list of predefined values, such as footnotes.
   *
   * @param value
   * @param {int} sortOrder
   * @returns {Feature}
   */
  get(e, t = 1) {
    if (e)
      return new f(this.type, [[e, t]], this.languageID);
    throw new Error("A non-empty value should be provided.");
  }
  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues(e) {
    return new f(this.type, e, this.languageID);
  }
  getFromImporter(e, t) {
    let s;
    try {
      s = this.importer[e].get(t);
    } catch {
      s = this.get(t);
    }
    return s;
  }
  /**
   * Creates and returns a new importer with a specific name. If an importer with this name already exists,
   * an existing Importer object will be returned.
   *
   * @param {string} name - A name of an importer object
   * @returns {Importer} A new or existing Importer object that matches a name provided
   */
  addImporter(e) {
    if (!e)
      throw new Error("Importer should have a non-empty name.");
    return this.importer = this.importer || {}, this.importer[e] = this.importer[e] || new fs(), this.importer[e];
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
    return this.orderedValues.map((e) => new f(this.type, e, this.languageID));
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
  set order(e) {
    if (!e || Array.isArray(e) && e.length === 0)
      throw new Error("A non-empty list of values should be provided.");
    Array.isArray(e) || (e = [e]);
    for (const t of e)
      if (Array.isArray(t))
        for (const s of t) {
          if (!this.hasOwnProperty(s.value))
            throw new Error('Trying to order an element with "' + s.value + '" value that is not stored in a "' + this.type + '" type.');
          if (s.type !== this.type)
            throw new Error('Trying to order an element with type "' + s.type + '" that is different from "' + this.type + '".');
          if (!re.compareLanguages(s.languageID, this.languageID))
            throw new Error(`Trying to order an element with language "${s.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
        }
      else {
        if (!this.hasOwnProperty(t.value))
          throw new Error('Trying to order an element with "' + t.value + '" value that is not stored in a "' + this.type + '" type.');
        if (t.type !== this.type)
          throw new Error('Trying to order an element with type "' + t.type + '" that is different from "' + this.type + '".');
        if (!re.compareLanguages(t.languageID, this.languageID))
          throw new Error(`Trying to order an element with language "${t.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
      }
    this._orderLookup = {}, this._orderIndex = [];
    for (const [t, s] of e.entries())
      if (Array.isArray(s)) {
        let n = [];
        for (const i of s)
          this._orderLookup[i.value] = t, n.push(i.value);
        this._orderIndex[t] = n;
      } else
        this._orderLookup[s.value] = t, this._orderIndex[t] = s.value;
  }
}
lt.UNRESTRICTED_VALUE = Symbol("unrestricted");
class Oe {
  /**
   * @class
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {object} extras extra property name and value pairs used in the key
   */
  constructor(e, t, s = {}) {
    for (const n of t)
      this[n] = e[n];
    Object.assign(this, s);
  }
  /**
     * checks if a feature with a specific value
  is included in the grouping key
     *
     * @returns {boolean} true if found, false if not
     * @param feature
     * @param value
     */
  hasFeatureValue(e, t) {
    return this.hasOwnProperty(e) ? this[e].values.includes(t) : !1;
  }
  /**
   * Return this key as a string
   *
   * @returns {string} string representation of the key
   */
  toString() {
    let e = [];
    for (const t of Object.getOwnPropertyNames(this).sort()) {
      const s = this[t] instanceof f ? this[t].values.sort().join(",") : this[t];
      e.push(s);
    }
    return e.join(" ");
  }
}
class Ce {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   * @param sortKey
   */
  constructor(e, t = [], s = null) {
    this.groupingKey = e, this.inflections = t;
  }
  /**
   * Add an Inflection or InflectionGroup to the group
   *
   * @param {Inflection|InflectionGroup} inflection
   */
  append(e) {
    this.inflections.push(e);
  }
}
class oe {
  constructor() {
    this.context_backward = oe.contextBackward;
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return $e;
  }
  static get baseUnit() {
    return Fe;
  }
  /**
   * @deprecated
   */
  get contextForward() {
    return M.getInstance().warn('Please use static "contextForward" instead'), this.constructor.contextForward;
  }
  /**
   * @deprecated
   */
  get contextBackward() {
    return M.getInstance().warn('Please use static "contextBackward" instead'), this.constructor.contextBackward;
  }
  /**
   * @deprecated
   */
  get direction() {
    return M.getInstance().warn('Please use static "direction" instead'), this.constructor.direction;
  }
  /**
   * @deprecated
   */
  get baseUnit() {
    return M.getInstance().warn('Please use static "baseUnit" instead'), this.constructor.baseUnit;
  }
  /**
   * @deprecated
   */
  get features() {
    return M.getInstance().warn('Please use individual "getFeatureType" or static "features" instead'), this.constructor.features;
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
  static typeFeature(e) {
    if (this.typeFeatures.has(e))
      return this.typeFeatures.get(e);
    throw new Error(`Type feature "${e}" is not defined within "${this}"`);
  }
  /**
   * Returns a map with Feature objects of all features defined in a language. Use this method to get all
   * Feature objects defined in a language model.
   *
   * @returns {Map} Feature objects for all features defined within a language in a Map object. The key is
   * a feature type (a string), and the value is a Feature object.
   */
  static get typeFeatures() {
    M.getInstance().warn("This getter must be defined in a descendant class");
  }
  static get features() {
    let e = {};
    for (const t of this.featureNames)
      e[t] = this.getFeature(t);
    return e;
  }
  static get languageID() {
    return Fr;
  }
  static get languageCode() {
    return Lr;
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
    return M.getInstance().warn('Use static "languageCodes" instead'), this.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes() {
    return M.getInstance().warn('Please use a static version of "codes" instead'), this.constructor.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  toCode() {
    return M.getInstance().warn('Please use a static "languageCode" instead'), this.constructor.languageCode;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  static toCode() {
    return M.getInstance().warn('Please use a static "languageCode" instead'), this.languageCode;
  }
  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        f.types.part,
        [
          Le,
          Mr,
          et,
          Mt,
          Br,
          xe,
          ke,
          tt,
          Bt,
          rt,
          Vr,
          zr,
          ze,
          jr,
          Vt,
          je,
          zt
        ]
      ],
      [
        f.types.gender,
        [
          rn,
          sn,
          nn
        ]
      ],
      [
        f.types.type,
        [
          yn,
          mn
        ]
      ],
      [
        f.types.person,
        [
          st,
          nt,
          it
        ]
      ],
      [
        f.types.number,
        [
          jt,
          qt
        ]
      ],
      [
        f.types.age,
        []
      ],
      [
        f.types.area,
        []
      ],
      [
        f.types.source,
        []
      ],
      [
        f.types.frequency,
        []
      ],
      [
        f.types.geo,
        []
      ],
      [
        f.types.pronunciation,
        []
      ],
      [
        f.types.kind,
        []
      ],
      [
        f.types.comparison,
        []
      ],
      [
        f.types.morph,
        []
      ],
      [
        f.types.stemtype,
        []
      ],
      [
        f.types.derivtype,
        []
      ]
    ]);
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage() {
    return M.getInstance().warn("Please use languageID directly"), this.languageID;
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage() {
    return M.getInstance().warn("Please use languageID directly"), this.constructor.languageID;
  }
  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType(e) {
    M.getInstance().warn("Please use getFeature instead");
    const t = this.featureValues;
    if (t.has(e))
      return new lt(e, t.get(e), this.languageID);
    throw new Error(`Feature "${e}" is not defined`);
  }
  /**
   * Returns a new instance of a feature with `featureType`. It uses a feature defined in a language model
   * as a master.
   *
   * @param {string} featureType - A name of a feature type.
   * @returns {Feature} - A newly created Feature object.
   */
  static getFeature(e) {
    const t = this.featureValues;
    if (t.has(e)) {
      const s = t.get(e);
      return new f(e, s, this.languageID, 1, s);
    } else
      throw new Error(`Feature "${e}" is not defined`);
  }
  _initializeFeatures() {
    const e = {};
    for (const t of this.constructor.featureValues.keys())
      e[t] = this.constructor.getFeature(t);
    return e;
  }
  /**
   * @deprecated
   */
  grammarFeatures() {
    return M.getInstance().warn('Please use a static version of "grammarFeatures" instead'), this.constructor.grammarFeatures();
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
  static canInflect(e) {
    return !1;
  }
  /**
   * Check to see if the supplied language code is supported by this tool
   *
   * @param {string} code - The language code
   * @returns {boolean} - True if supported, false if not
   */
  static supportsLanguage(e) {
    return this.languageCodes.includes[e];
  }
  /**
   * Checks if the word provided has a trailing digit (e.g. αἴγυπτος1 in Greek).
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word has a trailing digit, false otherwise.
   */
  static hasTrailingDigit(e) {
    return /^.+\d$/.test(e);
  }
  /**
   * Morphological parsers and dictionary indexes may add a trailing digit to disambiguate homonyms.
   * These can be ignored for purposes of string comparison.
   *
   * @param {string} word - A word to normalize.
   * @returns {string} A normalized word.
   */
  static normalizeTrailingDigit(e) {
    return /^.+\d$/.test(e) ? e.substring(0, e.length - 1) : e;
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
  static needsNormalization(e) {
    return !!e.localeCompare(this.normalizeText(e));
  }
  /**
   * Checks if the word provided has any letters in an upper case.
   *
   * @param {string} word - A word to be checked.
   * @returns {boolean} - True if the word at least one letter in upper case, false if all letters are lower case.
   */
  static hasUpperCase(e) {
    return !!e.localeCompare(e.toLocaleLowerCase());
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} word the source word
   * @returns {string} Normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   */
  static normalizeText(e) {
    return e;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[f.types.part] ? e.lemma.features[f.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return t;
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
    word: e = null,
    preceding: t = null,
    following: s = null,
    encoding: n = null,
    preserveCase: i = !1,
    includeOriginal: o = !1
  } = {}) {
    return o ? [e] : [];
  }
  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords(e, t, s = !0, n = {}) {
    return s ? (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t), this.normalizeText(e) === this.normalizeText(t)) : e === t;
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
  static compareFeatureValue(e, t, s, { normalize: n = !0 } = {}) {
    return n && (t = this.normalizeFeatureValue(e, t), s = this.normalizeFeatureValue(e, s)), t === s;
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
    return M.getInstance().warn('Please use a static version of "getPunctuation"'), this.constructor.getPunctuation();
  }
  toString() {
    return String(this.constructor.languageCode);
  }
  isEqual(e) {
    return re.compareLanguages(this.languageID, e.languageID);
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
  static hasCode(e) {
    if (this.isLanguageCode(e))
      return this.languageCodes.includes(e);
    throw new Error(`Format of a "${e}" is incorrect`);
  }
  /**
   * Tests wither a provided language identificator is a language ID.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} True if language identificator provided is a language ID.
   */
  static isLanguageID(e) {
    return typeof e == "symbol";
  }
  /**
   * Tests wither a provided language identificator is a language code.
   *
   * @param {symbol|string} language - A language identificator, either a Symbol or a string language code.
   * @returns {boolean} - True if language identificator provided is a language code.
   */
  static isLanguageCode(e) {
    return !oe.isLanguageID(e);
  }
  /**
   * @deprecated
   * @param node
   */
  canInflect(e) {
    return M.getInstance().warn('Please use a static version of "canInflect" instead'), this.constructor.canInflect(e);
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
  static groupInflectionsForDisplay(e) {
    let t = /* @__PURE__ */ new Map();
    const s = this.aggregateInflectionsForDisplay(e);
    for (const n of s) {
      const i = new Oe(
        n,
        [f.types.part, f.types.declension, f.types.dialect, f.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), o = i.toString();
      t.has(o) ? t.get(o).append(n) : t.set(o, new Ce(i, [n]));
    }
    for (const n of t) {
      const i = /* @__PURE__ */ new Map();
      for (const o of n[1].inflections) {
        let l, h = !1;
        o[f.types.grmCase] ? (l = f.types.number, h = !0) : o[f.types.tense] ? l = f.types.tense : o[f.types.part] === je || o[f.types.part] === Le ? l = f.types.part : l = "misc";
        const u = new Oe(o, [l], { isCaseInflectionSet: h }), d = u.toString();
        i.has(d) ? i.get(d).append(o) : i.set(d, new Ce(u, [o]));
      }
      for (const o of i) {
        const l = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
        for (const d of o[1].inflections) {
          const g = d[f.types.grmCase] ? Math.max(d[f.types.grmCase].items.map((w) => w.sortOrder)) : 1, y = new Oe(d, [f.types.tense, f.types.voice]), S = y.toString();
          l.has(S) ? l.get(S).append(d) : (l.set(S, new Ce(y, [d], g)), h.set(S, g));
        }
        o[1].inflections = [];
        const u = Array.from(l.keys()).sort(
          (d, g) => {
            const y = h.get(d), S = h.get(g);
            return y > S ? -1 : S > y ? 1 : 0;
          }
        );
        for (const d of u)
          o[1].inflections.push(l.get(d));
      }
      for (const o of i) {
        const l = o[1];
        for (const h of l.inflections) {
          let u = /* @__PURE__ */ new Map();
          for (const d of h.inflections) {
            const g = new Oe(
              d,
              [
                f.types.grmCase,
                f.types.comparison,
                f.types.gender,
                f.types.number,
                f.types.person,
                f.types.tense,
                f.types.mood,
                f.types.voice
              ]
            ), y = g.toString();
            u.has(y) ? u.get(y).append(d) : u.set(y, new Ce(g, [d]));
          }
          h.inflections = Array.from(u.values());
        }
      }
      n[1].inflections = Array.from(i.values());
    }
    return Array.from(t.values());
  }
  /**
   * Aggregate inflections for display according to language model characteristics
   *
   * @param {Inflection[]} inflections an array of inflections
   * @returns Inflection[] the aggregated inflections
   */
  static aggregateInflectionsForDisplay(e) {
    return e;
  }
  /**
   * @deprecated
   * @param inflections
   * @returns {*}
   */
  groupInflectionsForDisplay(e) {
    return M.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead'), this.constructor.groupInflectionsForDisplay(e);
  }
}
let Yt = /* @__PURE__ */ new Map(), er = !1;
class tr extends oe {
  static get languageID() {
    return $s;
  }
  static get languageCode() {
    return Ot;
  }
  static get languageCodes() {
    return [xr, Ot];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return $e;
  }
  static get baseUnit() {
    return Fe;
  }
  static get featureValues() {
    return new Map([
      ...oe.featureValues,
      [
        f.types.grmClass,
        [
          is,
          os,
          as,
          us,
          ls,
          cs
        ]
      ],
      [
        f.types.number,
        [
          jt,
          qt
        ]
      ],
      [
        f.types.grmCase,
        [
          Gr,
          Hr,
          $r,
          qr,
          on,
          an,
          Kr
        ]
      ],
      [
        f.types.declension,
        [
          st,
          nt,
          it,
          Zt,
          dn
        ]
      ],
      [
        f.types.tense,
        [
          rs,
          Yr,
          Qr,
          es,
          ts,
          Zr
        ]
      ],
      [
        f.types.voice,
        [
          ss,
          ns
        ]
      ],
      [
        f.types.mood,
        [
          Wr,
          Xr,
          Jr,
          yt,
          cn,
          Qt,
          yt,
          un
        ]
      ],
      [
        f.types.conjugation,
        [
          st,
          nt,
          it,
          Zt
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return er || this.initTypeFeatures(), Yt;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Yt.set(e, this.getFeature(e));
    er = !0;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [f.types.part, f.types.grmCase, f.types.mood, f.types.declension, f.types.tense, f.types.conjugation];
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(e) {
    return !0;
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or a text string
   * @returns the normalized form of the word (Latin replaces accents and special chars)
   * @type String
   */
  static normalizeText(e) {
    return e && (e = e.replace(/[\u00c0\u00c1\u00c2\u00c3\u00c4\u0100\u0102]/g, "A"), e = e.replace(/[\u00c8\u00c9\u00ca\u00cb\u0112\u0114]/g, "E"), e = e.replace(/[\u00cc\u00cd\u00ce\u00cf\u012a\u012c]/g, "I"), e = e.replace(/[\u00d2\u00d3\u00d4\u00df\u00d6\u014c\u014e]/g, "O"), e = e.replace(/[\u00d9\u00da\u00db\u00dc\u016a\u016c]/g, "U"), e = e.replace(/[\u00c6\u01e2]/g, "AE"), e = e.replace(/[\u0152]/g, "OE"), e = e.replace(/[\u00e0\u00e1\u00e2\u00e3\u00e4\u0101\u0103]/g, "a"), e = e.replace(/[\u00e8\u00e9\u00ea\u00eb\u0113\u0115]/g, "e"), e = e.replace(/[\u00ec\u00ed\u00ee\u00ef\u012b\u012d\u0129]/g, "i"), e = e.replace(/[\u00f2\u00f3\u00f4\u00f5\u00f6\u014d\u014f]/g, "o"), e = e.replace(/[\u00f9\u00fa\u00fb\u00fc\u016b\u016d]/g, "u"), e = e.replace(/[\u00e6\u01e3]/g, "ae"), e = e.replace(/[\u0153]/g, "oe")), e;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return e === f.types.mood && t === Qt ? yt : e === f.types.part && t === xe ? ke : t;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[f.types.part] ? e.lemma.features[f.types.part].value === xe ? ke : e.lemma.features[f.types.part].value : null;
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
  static getInflectionConstraints(e) {
    let t = {
      fullFormBased: !1,
      suffixBased: !1,
      pronounClassRequired: !1
    };
    return e.hasOwnProperty(f.types.part) ? [je, zt, Vt, en].includes(e[f.types.part].value) ? (t.fullFormBased = !0, t.suffixBased = !0) : e[f.types.part].value === ze ? t.fullFormBased = !0 : t.suffixBased = !0 : M.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[f.types.part]), t;
  }
}
class On {
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
let rr = /* @__PURE__ */ new Map(), sr = !1;
class ge extends oe {
  static get languageID() {
    return Hs;
  }
  static get languageCode() {
    return Ct;
  }
  static get languageCodes() {
    return [Ct];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return $e;
  }
  static get baseUnit() {
    return Fe;
  }
  static get featureValues() {
    return new Map([
      ...oe.featureValues,
      [
        f.types.grmClass,
        [
          us,
          wn,
          En,
          _n,
          cs,
          is,
          as,
          bn,
          os,
          ls
        ]
      ],
      [
        f.types.number,
        [
          jt,
          qt,
          fn
        ]
      ],
      [
        f.types.grmCase,
        [
          Gr,
          Hr,
          $r,
          qr,
          Kr
        ]
      ],
      [
        f.types.declension,
        [
          st,
          nt,
          it
        ]
      ],
      [
        f.types.tense,
        [
          rs,
          Yr,
          Qr,
          es,
          ts,
          Zr,
          pn
        ]
      ],
      [
        f.types.voice,
        [
          ns,
          ss,
          hn,
          gn
        ]
      ],
      [
        f.types.mood,
        [
          Wr,
          Xr,
          ln,
          Jr
        ]
      ],
      [
        // TODO full list of greek dialects
        f.types.dialect,
        [
          "attic",
          "epic",
          "doric"
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return sr || this.initTypeFeatures(), rr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      rr.set(e, this.getFeature(e));
    sr = !0;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return !0;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [f.types.part, f.types.grmCase, f.types.mood, f.types.declension, f.types.tense, f.types.voice];
  }
  /**
   * Return a normalized version of a text string which can be used to compare the word for equality
   *
   * @param {string} text the source word or the source text
   * @returns {string} the normalized form of the word (default version just returns the same word,
   *          override in language-specific subclass)
   * @type string
   */
  static normalizeText(e) {
    return e && (e = e.normalize("NFC"), e = e.replace(/\u2019$/, "᾽")), e;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   *                   or null if no part of speech data is present on the lexeme
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[f.types.part] ? e.lemma.features[f.types.part].value === rt ? Le : e.lemma.features[f.types.part].value === xe ? ke : e.lemma.features[f.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return e === f.types.part && t === rt ? Le : e === f.types.part && t === xe ? ke : t;
  }
  static _tonosToOxia(e) {
    return e.replace(
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
    word: e = null,
    preceding: t = null,
    following: s = null,
    encoding: n = null,
    preserveCase: i = !1,
    includeOriginal: o = !1
  } = {}) {
    if (!e)
      return [];
    let l = ge.normalizeText(e);
    i || (l = l.toLocaleLowerCase());
    const h = l.replace(
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
    ), u = ge._tonosToOxia(l), d = l.replace(
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
    ), g = l.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug,
      ""
    ).normalize("NFC");
    let y = [];
    return n === "strippedDiaeresis" ? y.push(d) : n === "strippedDiacritics" ? y.push(g) : n === "strippedAll" ? y.push(d.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug,
      ""
    ).normalize("NFC")) : (y.push(h), u !== h && y.push(u)), o || (y = y.filter((S) => S !== e)), y;
  }
  /**
   * Get a list of valid punctuation for this language
   *
   * @returns {string} a string containing valid punctuation symbols
   */
  static getPunctuation() {
    return `.,;:!?"(){}\\[\\]<>\\ ‐‑‒–—―‘†‡“”··
\r‌‍`;
  }
  /**
   * Sets inflection grammar properties based on its characteristics
   *
   * @param {Inflection} inflection - An inflection object
   * @returns {object} Inflection properties
   */
  static getInflectionConstraints(e) {
    const t = {
      fullFormBased: !1,
      suffixBased: !1,
      pronounClassRequired: !1
    }, s = [ze, Bt, Mt];
    return e.hasOwnProperty(f.types.part) ? s.includes(e[f.types.part].value) ? t.fullFormBased = !0 : t.suffixBased = !0 : M.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[f.types.part]), t.pronounClassRequired = re.compareLanguages(ge.languageID, e.languageID) && e.hasOwnProperty(f.types.part) && // eslint-disable-line no-prototype-builtins
    e[f.types.part].value === ze, t;
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
  static getPronounClasses(e, t, s, n = !0) {
    let i = /* @__PURE__ */ new Set();
    const o = e.filter(
      (l) => {
        let h = !1;
        return l.value && (!l.features[f.types.hdwd] || l.features[f.types.hdwd].value === s) && (h = ge.compareWords(l.value, t, n)), h;
      }
    );
    for (const l of o)
      if (l.features.hasOwnProperty(f.types.grmClass))
        for (const h of l.features[f.types.grmClass].values)
          i.add(h);
    if (i.size > 0)
      return new f(f.types.grmClass, Array.from(i), ge.languageID);
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
  static compareWords(e, t, s = !0, { normalizeTrailingDigit: n = !1 } = {}) {
    let i = !1;
    if (s) {
      n && (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t));
      const o = ge.alternateWordEncodings({
        word: e,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      }), l = ge.alternateWordEncodings({
        word: t,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      });
      for (let h = 0; h < o.length && (i = o[h] === l[h], !i); h++)
        ;
      i || (i = ge.normalizeText(e) === ge.normalizeText(t));
    } else
      i = e === t;
    return i;
  }
  static isValidUnicode(e) {
    return On.chars.some((t) => e.includes(t));
  }
}
const nr = /* @__PURE__ */ new Map();
let ir = !1;
class or extends oe {
  static get languageID() {
    return Gs;
  }
  static get languageCode() {
    return Rt;
  }
  static get languageCodes() {
    return [Rt, kr];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Ut;
  }
  static get baseUnit() {
    return Fe;
  }
  static get typeFeatures() {
    return ir || this.initTypeFeatures(), nr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      nr.set(e, this.getFeature(e));
    ir = !0;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return !1;
  }
  /**
   * @override
   */
  static alternateWordEncodings({
    word: e = null,
    preceding: t = null,
    following: s = null,
    encoding: n = null,
    preserveCase: i = !1,
    includeOriginal: o = !1
  } = {}) {
    const l = e.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, ""), h = l.replace(/[\u{0622}\u{0623}\u{0625}]/ug, "ا"), u = h.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, ""), d = u.replace(/\u{0651}/ug, ""), g = d.replace(/\u{0652}/ug, ""), y = g.replace(/\u{0627}/ug, ""), S = /* @__PURE__ */ new Map([
      ["tanwin", l],
      ["hamza", h],
      ["harakat", u],
      ["shadda", d],
      ["sukun", g],
      ["alef", y]
    ]);
    let w = [];
    return n !== null && S.has(n) ? w = [S.get(n)] : w = Array.from(S.values()), o || (w = w.filter((C) => C !== e)), w;
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
  static aggregateInflectionsForDisplay(e) {
    let t = [], s = { [tt]: [], [et]: [], [Xt]: [] };
    for (const n of e)
      n[f.types.morph] && n[f.types.morph].value.match(/ADJ[uaiNK]/) ? s[et].push(n) : n[f.types.morph] && n[f.types.morph].value.match(/NOUN[uaiNK]/) ? s[tt].push(n) : n[f.types.morph] && n[f.types.morph].value.match(/NOUN_PROP[uaiNK]/) ? s[Xt].push(n) : (n.example = null, t.push(n));
    for (const n of Object.keys(s))
      t.filter((o) => o[f.types.part].value === n).length !== 1 && t.push(...s[n]);
    return t;
  }
}
let ar = /* @__PURE__ */ new Map(), ur = !1;
class Cn extends oe {
  static get languageID() {
    return Ks;
  }
  static get languageCode() {
    return At;
  }
  static get languageCodes() {
    return [At, Js, Xs, Ws];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Ut;
  }
  static get baseUnit() {
    return Fe;
  }
  static get typeFeatures() {
    return ur || this.initTypeFeatures(), ar;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      ar.set(e, this.getFeature(e));
    ur = !0;
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(e) {
    return !1;
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
const lr = /* @__PURE__ */ new Map();
let cr = !1;
class Rn extends oe {
  static get languageID() {
    return vr;
  }
  static get languageCode() {
    return It;
  }
  static get languageCodes() {
    return [It];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return $e;
  }
  static get baseUnit() {
    return Fe;
  }
  static get featureValues() {
    return new Map([
      ...oe.featureValues,
      [
        f.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        f.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        f.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        f.types.mood,
        [
          // TODO Valid Values for mood for gez
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return cr || this.initTypeFeatures(), lr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      lr.set(e, this.getFeature(e));
    cr = !0;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return !1;
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
let fr = /* @__PURE__ */ new Map(), dr = !1;
class An extends oe {
  static get languageID() {
    return Dr;
  }
  static get languageCode() {
    return Tt;
  }
  static get languageCodes() {
    return [
      Qs,
      Tt,
      Zs,
      Ys
    ];
  }
  static get contextForward() {
    return 5;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return $e;
  }
  static get baseUnit() {
    return qs;
  }
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        f.types.fullForm,
        []
      ],
      [
        f.types.frequency,
        []
      ],
      [
        f.types.pronunciation,
        []
      ],
      [
        f.types.radical,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return dr || this.initTypeFeatures(), fr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      fr.set(e, this.getFeature(e));
    dr = !0;
  }
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\
\r，、。「」《》‌‍†‡`;
  }
  static _isVowel(e) {
    return ["a", "e", "i", "o", "u"].includes(e);
  }
  static formatPinyin(e) {
    const t = ["ā", "á", "ǎ", "à", "a"], s = ["ē", "é", "ě", "è", "e"], n = ["ī", "í", "ǐ", "ì", "i"], i = ["ō", "ó", "ǒ", "ò", "o"], o = ["ū", "ú", "ǔ", "ù", "u"], l = ["ǖ", "ǘ", "ǚ", "ǜ", "ü"];
    e = e.split(/(\d)/).map((d) => d.trim()).filter((d) => !!d);
    let h = [];
    const u = {
      1: 0,
      2: 1,
      3: 2,
      4: 3
    };
    for (let d = 0; d < e.length; d++)
      if (d % 2 === 0) {
        let g = e[d];
        const y = u[e[d + 1]] !== void 0 ? u[e[d + 1]] : 4;
        if (g.indexOf("a") !== -1)
          g = g.replace("a", t[y]);
        else if (g.indexOf("e") !== -1)
          g = g.replace("e", s[y]);
        else if (g.indexOf("ou") !== -1)
          g = g.replace("o", i[y]);
        else
          for (let S = g.length - 1; S >= 0; S--)
            if (this._isVowel(g[S])) {
              switch (g[S]) {
                case "i":
                  g = g.replace("i", n[y]);
                  break;
                case "o":
                  g = g.replace("o", i[y]);
                  break;
                case "u":
                  S + 1 < g.length - 1 && g[S + 1] === ":" ? g = g.replace("u:", l[y]) : g = g.replace("u", o[y]);
                  break;
                default:
                  M.getInstance().warn("some kind of weird vowel", g[S]);
              }
              break;
            }
        h.push(g);
      }
    return h.join(" ").trim();
  }
}
const pr = /* @__PURE__ */ new Map();
let hr = !1;
class wt extends oe {
  static get languageID() {
    return Nr;
  }
  static get languageCode() {
    return Ft;
  }
  static get languageCodes() {
    return [Ft, Pr, Ur];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Ut;
  }
  static get baseUnit() {
    return Fe;
  }
  static get featureValues() {
    return new Map([
      ...oe.featureValues,
      [
        f.types.part,
        [
          Le,
          Mr,
          et,
          Mt,
          Br,
          xe,
          ke,
          tt,
          Bt,
          rt,
          Vr,
          zr,
          ze,
          jr,
          Vt,
          je,
          zt,
          tn
        ]
      ],
      [
        f.types.kaylo,
        []
      ],
      [
        f.types.state,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return hr || this.initTypeFeatures(), pr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      pr.set(e, this.getFeature(e));
    hr = !0;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return !1;
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
  static groupInflectionsForDisplay(e) {
    const t = /* @__PURE__ */ new Map(), s = this.aggregateInflectionsForDisplay(e);
    for (const n of s) {
      const i = new Oe(
        n,
        [f.types.part, f.types.declension, f.types.kaylo, f.types.state, f.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), o = i.toString();
      t.has(o) ? t.get(o).append(n) : t.set(o, new Ce(i, [n]));
    }
    for (const n of t) {
      const i = /* @__PURE__ */ new Map();
      for (const o of n[1].inflections) {
        let l, h = !1;
        o[f.types.grmCase] ? (l = f.types.number, h = !0) : o[f.types.tense] ? l = f.types.tense : o[f.types.part] === je || o[f.types.part] === Le ? l = f.types.part : l = "misc";
        const u = new Oe(o, [l], { isCaseInflectionSet: h }), d = u.toString();
        i.has(d) ? i.get(d).append(o) : i.set(d, new Ce(u, [o]));
      }
      for (const o of i) {
        const l = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
        for (const d of o[1].inflections) {
          const g = d[f.types.grmCase] ? Math.max(d[f.types.grmCase].items.map((w) => w.sortOrder)) : 1, y = new Oe(d, [f.types.tense, f.types.voice]), S = y.toString();
          l.has(S) ? l.get(S).append(d) : (l.set(S, new Ce(y, [d], g)), h.set(S, g));
        }
        o[1].inflections = [];
        const u = Array.from(l.keys()).sort(
          (d, g) => {
            const y = h.get(d), S = h.get(g);
            return y > S ? -1 : S > y ? 1 : 0;
          }
        );
        for (const d of u)
          o[1].inflections.push(l.get(d));
      }
      for (const o of i) {
        const l = o[1];
        for (const h of l.inflections) {
          const u = /* @__PURE__ */ new Map();
          for (const d of h.inflections) {
            const g = new Oe(
              d,
              [
                f.types.grmCase,
                f.types.comparison,
                f.types.gender,
                f.types.number,
                f.types.person,
                f.types.tense,
                f.types.mood,
                f.types.voice
              ]
            ), y = g.toString();
            u.has(y) ? u.get(y).append(d) : u.set(y, new Ce(g, [d]));
          }
          h.inflections = Array.from(u.values());
        }
      }
      n[1].inflections = Array.from(i.values());
    }
    return Array.from(t.values());
  }
}
const Re = /* @__PURE__ */ new Map([
  [xr, tr],
  [Ot, tr],
  [Ct, ge],
  [Rt, or],
  [kr, or],
  [At, Cn],
  [It, Rn],
  [Tt, An],
  [Ft, wt],
  [Pr, wt],
  [Ur, wt]
]);
class re {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage(e) {
    return e = typeof e == "symbol" ? re.getLanguageCodeFromId(e) : e, Re.has(e);
  }
  static availableLanguages() {
    let e = /* @__PURE__ */ new Set();
    for (const t of Re.values())
      e.add(t.languageCode);
    return Array.from(e);
  }
  /**
   * Returns a constructor of language model for a specific language ID.
   *
   * @param {symbol} languageID - A language ID of a desired language model.
   * @returns {LanguageModel} A language model for a given language ID.
   */
  static getLanguageModel(e) {
    const t = re.getLanguageCodeFromId(e);
    return re.getLanguageModelFromCode(t);
  }
  static getLanguageModelFromCode(e) {
    return Re.has(e) ? Re.get(e) : oe;
  }
  static getLanguageForCode(e = null) {
    const t = Re.get(e);
    return t ? new t() : new oe();
  }
  /**
   * Converts an ISO 639-3 language code to a language ID
   *
   * @param {string} languageCode - An ISO 639-3 language code
   * @returns {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode(e) {
    for (const t of Re.values())
      if (t.hasCode(e))
        return t.languageID;
    return Fr;
  }
  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   *
   * @param {symbol} languageID - A language ID
   * @returns {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId(e) {
    for (const t of Re.values())
      if (t.languageID.toString() === e.toString())
        return t.languageCode;
    return Lr;
  }
  /**
   * Takes either a language ID or a language code and returns an object with both an ID and a code.
   *
   * @param {string | symbol} language - Either a language ID (a Symbol) or a language code (a String).
   * @returns {object} An object with the following properties:
   *    {symbol} languageID
   *    {string} languageCode
   */
  static getLanguageAttrs(e) {
    return typeof e == "symbol" ? {
      languageID: e,
      languageCode: re.getLanguageCodeFromId(e)
    } : {
      languageID: re.getLanguageIdFromCode(e),
      languageCode: e
    };
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
  static compareLanguages(e, t) {
    return e = typeof e == "symbol" ? re.getLanguageCodeFromId(e) : e, t = typeof t == "symbol" ? re.getLanguageCodeFromId(t) : t, e === t;
  }
  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage(e) {
    return [vr, Nr, Dr].includes(e);
  }
}
function ds(r, e) {
  return function() {
    return r.apply(e, arguments);
  };
}
const { toString: In } = Object.prototype, { getPrototypeOf: $t } = Object, { iterator: ct, toStringTag: ps } = Symbol, ft = /* @__PURE__ */ ((r) => (e) => {
  const t = In.call(e);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), me = (r) => (r = r.toLowerCase(), (e) => ft(e) === r), dt = (r) => (e) => typeof e === r, { isArray: Pe } = Array, qe = dt("undefined");
function He(r) {
  return r !== null && !qe(r) && r.constructor !== null && !qe(r.constructor) && ue(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
const hs = me("ArrayBuffer");
function Tn(r) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && hs(r.buffer), e;
}
const Fn = dt("string"), ue = dt("function"), gs = dt("number"), Ge = (r) => r !== null && typeof r == "object", vn = (r) => r === !0 || r === !1, Qe = (r) => {
  if (ft(r) !== "object")
    return !1;
  const e = $t(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(ps in r) && !(ct in r);
}, Dn = (r) => {
  if (!Ge(r) || He(r))
    return !1;
  try {
    return Object.keys(r).length === 0 && Object.getPrototypeOf(r) === Object.prototype;
  } catch {
    return !1;
  }
}, Nn = me("Date"), Ln = me("File"), xn = me("Blob"), kn = me("FileList"), Pn = (r) => Ge(r) && ue(r.pipe), Un = (r) => {
  let e;
  return r && (typeof FormData == "function" && r instanceof FormData || ue(r.append) && ((e = ft(r)) === "formdata" || // detect form-data instance
  e === "object" && ue(r.toString) && r.toString() === "[object FormData]"));
}, Mn = me("URLSearchParams"), [Bn, Vn, zn, jn] = ["ReadableStream", "Request", "Response", "Headers"].map(me), qn = (r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ke(r, e, { allOwnKeys: t = !1 } = {}) {
  if (r === null || typeof r > "u")
    return;
  let s, n;
  if (typeof r != "object" && (r = [r]), Pe(r))
    for (s = 0, n = r.length; s < n; s++)
      e.call(null, r[s], s, r);
  else {
    if (He(r))
      return;
    const i = t ? Object.getOwnPropertyNames(r) : Object.keys(r), o = i.length;
    let l;
    for (s = 0; s < o; s++)
      l = i[s], e.call(null, r[l], l, r);
  }
}
function ms(r, e) {
  if (He(r))
    return null;
  e = e.toLowerCase();
  const t = Object.keys(r);
  let s = t.length, n;
  for (; s-- > 0; )
    if (n = t[s], e === n.toLowerCase())
      return n;
  return null;
}
const Ae = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ys = (r) => !qe(r) && r !== Ae;
function vt() {
  const { caseless: r } = ys(this) && this || {}, e = {}, t = (s, n) => {
    const i = r && ms(e, n) || n;
    Qe(e[i]) && Qe(s) ? e[i] = vt(e[i], s) : Qe(s) ? e[i] = vt({}, s) : Pe(s) ? e[i] = s.slice() : e[i] = s;
  };
  for (let s = 0, n = arguments.length; s < n; s++)
    arguments[s] && Ke(arguments[s], t);
  return e;
}
const $n = (r, e, t, { allOwnKeys: s } = {}) => (Ke(e, (n, i) => {
  t && ue(n) ? r[i] = ds(n, t) : r[i] = n;
}, { allOwnKeys: s }), r), Hn = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), Gn = (r, e, t, s) => {
  r.prototype = Object.create(e.prototype, s), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: e.prototype
  }), t && Object.assign(r.prototype, t);
}, Kn = (r, e, t, s) => {
  let n, i, o;
  const l = {};
  if (e = e || {}, r == null) return e;
  do {
    for (n = Object.getOwnPropertyNames(r), i = n.length; i-- > 0; )
      o = n[i], (!s || s(o, r, e)) && !l[o] && (e[o] = r[o], l[o] = !0);
    r = t !== !1 && $t(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}, Jn = (r, e, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  const s = r.indexOf(e, t);
  return s !== -1 && s === t;
}, Wn = (r) => {
  if (!r) return null;
  if (Pe(r)) return r;
  let e = r.length;
  if (!gs(e)) return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = r[e];
  return t;
}, Xn = /* @__PURE__ */ ((r) => (e) => r && e instanceof r)(typeof Uint8Array < "u" && $t(Uint8Array)), Qn = (r, e) => {
  const s = (r && r[ct]).call(r);
  let n;
  for (; (n = s.next()) && !n.done; ) {
    const i = n.value;
    e.call(r, i[0], i[1]);
  }
}, Zn = (r, e) => {
  let t;
  const s = [];
  for (; (t = r.exec(e)) !== null; )
    s.push(t);
  return s;
}, Yn = me("HTMLFormElement"), ei = (r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, s, n) {
    return s.toUpperCase() + n;
  }
), gr = (({ hasOwnProperty: r }) => (e, t) => r.call(e, t))(Object.prototype), ti = me("RegExp"), ws = (r, e) => {
  const t = Object.getOwnPropertyDescriptors(r), s = {};
  Ke(t, (n, i) => {
    let o;
    (o = e(n, i, r)) !== !1 && (s[i] = o || n);
  }), Object.defineProperties(r, s);
}, ri = (r) => {
  ws(r, (e, t) => {
    if (ue(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const s = r[t];
    if (ue(s)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, si = (r, e) => {
  const t = {}, s = (n) => {
    n.forEach((i) => {
      t[i] = !0;
    });
  };
  return Pe(r) ? s(r) : s(String(r).split(e)), t;
}, ni = () => {
}, ii = (r, e) => r != null && Number.isFinite(r = +r) ? r : e;
function oi(r) {
  return !!(r && ue(r.append) && r[ps] === "FormData" && r[ct]);
}
const ai = (r) => {
  const e = new Array(10), t = (s, n) => {
    if (Ge(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (He(s))
        return s;
      if (!("toJSON" in s)) {
        e[n] = s;
        const i = Pe(s) ? [] : {};
        return Ke(s, (o, l) => {
          const h = t(o, n + 1);
          !qe(h) && (i[l] = h);
        }), e[n] = void 0, i;
      }
    }
    return s;
  };
  return t(r, 0);
}, ui = me("AsyncFunction"), li = (r) => r && (Ge(r) || ue(r)) && ue(r.then) && ue(r.catch), Es = ((r, e) => r ? setImmediate : e ? ((t, s) => (Ae.addEventListener("message", ({ source: n, data: i }) => {
  n === Ae && i === t && s.length && s.shift()();
}, !1), (n) => {
  s.push(n), Ae.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  ue(Ae.postMessage)
), ci = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ae) : typeof process < "u" && process.nextTick || Es, fi = (r) => r != null && ue(r[ct]), p = {
  isArray: Pe,
  isArrayBuffer: hs,
  isBuffer: He,
  isFormData: Un,
  isArrayBufferView: Tn,
  isString: Fn,
  isNumber: gs,
  isBoolean: vn,
  isObject: Ge,
  isPlainObject: Qe,
  isEmptyObject: Dn,
  isReadableStream: Bn,
  isRequest: Vn,
  isResponse: zn,
  isHeaders: jn,
  isUndefined: qe,
  isDate: Nn,
  isFile: Ln,
  isBlob: xn,
  isRegExp: ti,
  isFunction: ue,
  isStream: Pn,
  isURLSearchParams: Mn,
  isTypedArray: Xn,
  isFileList: kn,
  forEach: Ke,
  merge: vt,
  extend: $n,
  trim: qn,
  stripBOM: Hn,
  inherits: Gn,
  toFlatObject: Kn,
  kindOf: ft,
  kindOfTest: me,
  endsWith: Jn,
  toArray: Wn,
  forEachEntry: Qn,
  matchAll: Zn,
  isHTMLForm: Yn,
  hasOwnProperty: gr,
  hasOwnProp: gr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ws,
  freezeMethods: ri,
  toObjectSet: si,
  toCamelCase: ei,
  noop: ni,
  toFiniteNumber: ii,
  findKey: ms,
  global: Ae,
  isContextDefined: ys,
  isSpecCompliantForm: oi,
  toJSONObject: ai,
  isAsyncFn: ui,
  isThenable: li,
  setImmediate: Es,
  asap: ci,
  isIterable: fi
};
function I(r, e, t, s, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), s && (this.request = s), n && (this.response = n, this.status = n.status ? n.status : null);
}
p.inherits(I, Error, {
  toJSON: function() {
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
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const _s = I.prototype, bs = {};
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
].forEach((r) => {
  bs[r] = { value: r };
});
Object.defineProperties(I, bs);
Object.defineProperty(_s, "isAxiosError", { value: !0 });
I.from = (r, e, t, s, n, i) => {
  const o = Object.create(_s);
  return p.toFlatObject(r, o, function(h) {
    return h !== Error.prototype;
  }, (l) => l !== "isAxiosError"), I.call(o, r.message, e, t, s, n), o.cause = r, o.name = r.name, i && Object.assign(o, i), o;
};
const di = null;
function Dt(r) {
  return p.isPlainObject(r) || p.isArray(r);
}
function Ss(r) {
  return p.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
function mr(r, e, t) {
  return r ? r.concat(e).map(function(n, i) {
    return n = Ss(n), !t && i ? "[" + n + "]" : n;
  }).join(t ? "." : "") : e;
}
function pi(r) {
  return p.isArray(r) && !r.some(Dt);
}
const hi = p.toFlatObject(p, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function pt(r, e, t) {
  if (!p.isObject(r))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = p.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(C, b) {
    return !p.isUndefined(b[C]);
  });
  const s = t.metaTokens, n = t.visitor || d, i = t.dots, o = t.indexes, h = (t.Blob || typeof Blob < "u" && Blob) && p.isSpecCompliantForm(e);
  if (!p.isFunction(n))
    throw new TypeError("visitor must be a function");
  function u(w) {
    if (w === null) return "";
    if (p.isDate(w))
      return w.toISOString();
    if (p.isBoolean(w))
      return w.toString();
    if (!h && p.isBlob(w))
      throw new I("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(w) || p.isTypedArray(w) ? h && typeof Blob == "function" ? new Blob([w]) : Buffer.from(w) : w;
  }
  function d(w, C, b) {
    let V = w;
    if (w && !b && typeof w == "object") {
      if (p.endsWith(C, "{}"))
        C = s ? C : C.slice(0, -2), w = JSON.stringify(w);
      else if (p.isArray(w) && pi(w) || (p.isFileList(w) || p.endsWith(C, "[]")) && (V = p.toArray(w)))
        return C = Ss(C), V.forEach(function(G, ce) {
          !(p.isUndefined(G) || G === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? mr([C], ce, i) : o === null ? C : C + "[]",
            u(G)
          );
        }), !1;
    }
    return Dt(w) ? !0 : (e.append(mr(b, C, i), u(w)), !1);
  }
  const g = [], y = Object.assign(hi, {
    defaultVisitor: d,
    convertValue: u,
    isVisitable: Dt
  });
  function S(w, C) {
    if (!p.isUndefined(w)) {
      if (g.indexOf(w) !== -1)
        throw Error("Circular reference detected in " + C.join("."));
      g.push(w), p.forEach(w, function(V, H) {
        (!(p.isUndefined(V) || V === null) && n.call(
          e,
          V,
          p.isString(H) ? H.trim() : H,
          C,
          y
        )) === !0 && S(V, C ? C.concat(H) : [H]);
      }), g.pop();
    }
  }
  if (!p.isObject(r))
    throw new TypeError("data must be an object");
  return S(r), e;
}
function yr(r) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, function(s) {
    return e[s];
  });
}
function Ht(r, e) {
  this._pairs = [], r && pt(r, this, e);
}
const Os = Ht.prototype;
Os.append = function(e, t) {
  this._pairs.push([e, t]);
};
Os.toString = function(e) {
  const t = e ? function(s) {
    return e.call(this, s, yr);
  } : yr;
  return this._pairs.map(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "").join("&");
};
function gi(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Cs(r, e, t) {
  if (!e)
    return r;
  const s = t && t.encode || gi;
  p.isFunction(t) && (t = {
    serialize: t
  });
  const n = t && t.serialize;
  let i;
  if (n ? i = n(e, t) : i = p.isURLSearchParams(e) ? e.toString() : new Ht(e, t).toString(s), i) {
    const o = r.indexOf("#");
    o !== -1 && (r = r.slice(0, o)), r += (r.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return r;
}
class wr {
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
  use(e, t, s) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
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
  forEach(e) {
    p.forEach(this.handlers, function(s) {
      s !== null && e(s);
    });
  }
}
const Rs = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, mi = typeof URLSearchParams < "u" ? URLSearchParams : Ht, yi = typeof FormData < "u" ? FormData : null, wi = typeof Blob < "u" ? Blob : null, Ei = {
  isBrowser: !0,
  classes: {
    URLSearchParams: mi,
    FormData: yi,
    Blob: wi
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Gt = typeof window < "u" && typeof document < "u", Nt = typeof navigator == "object" && navigator || void 0, _i = Gt && (!Nt || ["ReactNative", "NativeScript", "NS"].indexOf(Nt.product) < 0), bi = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Si = Gt && window.location.href || "http://localhost", Oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Gt,
  hasStandardBrowserEnv: _i,
  hasStandardBrowserWebWorkerEnv: bi,
  navigator: Nt,
  origin: Si
}, Symbol.toStringTag, { value: "Module" })), ie = {
  ...Oi,
  ...Ei
};
function Ci(r, e) {
  return pt(r, new ie.classes.URLSearchParams(), {
    visitor: function(t, s, n, i) {
      return ie.isNode && p.isBuffer(t) ? (this.append(s, t.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...e
  });
}
function Ri(r) {
  return p.matchAll(/\w+|\[(\w*)]/g, r).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Ai(r) {
  const e = {}, t = Object.keys(r);
  let s;
  const n = t.length;
  let i;
  for (s = 0; s < n; s++)
    i = t[s], e[i] = r[i];
  return e;
}
function As(r) {
  function e(t, s, n, i) {
    let o = t[i++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), h = i >= t.length;
    return o = !o && p.isArray(n) ? n.length : o, h ? (p.hasOwnProp(n, o) ? n[o] = [n[o], s] : n[o] = s, !l) : ((!n[o] || !p.isObject(n[o])) && (n[o] = []), e(t, s, n[o], i) && p.isArray(n[o]) && (n[o] = Ai(n[o])), !l);
  }
  if (p.isFormData(r) && p.isFunction(r.entries)) {
    const t = {};
    return p.forEachEntry(r, (s, n) => {
      e(Ri(s), n, t, 0);
    }), t;
  }
  return null;
}
function Ii(r, e, t) {
  if (p.isString(r))
    try {
      return (e || JSON.parse)(r), p.trim(r);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (t || JSON.stringify)(r);
}
const Je = {
  transitional: Rs,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, t) {
    const s = t.getContentType() || "", n = s.indexOf("application/json") > -1, i = p.isObject(e);
    if (i && p.isHTMLForm(e) && (e = new FormData(e)), p.isFormData(e))
      return n ? JSON.stringify(As(e)) : e;
    if (p.isArrayBuffer(e) || p.isBuffer(e) || p.isStream(e) || p.isFile(e) || p.isBlob(e) || p.isReadableStream(e))
      return e;
    if (p.isArrayBufferView(e))
      return e.buffer;
    if (p.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (i) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Ci(e, this.formSerializer).toString();
      if ((l = p.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
        const h = this.env && this.env.FormData;
        return pt(
          l ? { "files[]": e } : e,
          h && new h(),
          this.formSerializer
        );
      }
    }
    return i || n ? (t.setContentType("application/json", !1), Ii(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || Je.transitional, s = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (p.isResponse(e) || p.isReadableStream(e))
      return e;
    if (e && p.isString(e) && (s && !this.responseType || n)) {
      const o = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(e);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? I.from(l, I.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return e;
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
    FormData: ie.classes.FormData,
    Blob: ie.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
p.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  Je.headers[r] = {};
});
const Ti = p.toObjectSet([
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
]), Fi = (r) => {
  const e = {};
  let t, s, n;
  return r && r.split(`
`).forEach(function(o) {
    n = o.indexOf(":"), t = o.substring(0, n).trim().toLowerCase(), s = o.substring(n + 1).trim(), !(!t || e[t] && Ti[t]) && (t === "set-cookie" ? e[t] ? e[t].push(s) : e[t] = [s] : e[t] = e[t] ? e[t] + ", " + s : s);
  }), e;
}, Er = Symbol("internals");
function Ve(r) {
  return r && String(r).trim().toLowerCase();
}
function Ze(r) {
  return r === !1 || r == null ? r : p.isArray(r) ? r.map(Ze) : String(r);
}
function vi(r) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = t.exec(r); )
    e[s[1]] = s[2];
  return e;
}
const Di = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());
function Et(r, e, t, s, n) {
  if (p.isFunction(s))
    return s.call(this, e, t);
  if (n && (e = t), !!p.isString(e)) {
    if (p.isString(s))
      return e.indexOf(s) !== -1;
    if (p.isRegExp(s))
      return s.test(e);
  }
}
function Ni(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, s) => t.toUpperCase() + s);
}
function Li(r, e) {
  const t = p.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(r, s + t, {
      value: function(n, i, o) {
        return this[s].call(this, e, n, i, o);
      },
      configurable: !0
    });
  });
}
let le = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, s) {
    const n = this;
    function i(l, h, u) {
      const d = Ve(h);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const g = p.findKey(n, d);
      (!g || n[g] === void 0 || u === !0 || u === void 0 && n[g] !== !1) && (n[g || h] = Ze(l));
    }
    const o = (l, h) => p.forEach(l, (u, d) => i(u, d, h));
    if (p.isPlainObject(e) || e instanceof this.constructor)
      o(e, t);
    else if (p.isString(e) && (e = e.trim()) && !Di(e))
      o(Fi(e), t);
    else if (p.isObject(e) && p.isIterable(e)) {
      let l = {}, h, u;
      for (const d of e) {
        if (!p.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        l[u = d[0]] = (h = l[u]) ? p.isArray(h) ? [...h, d[1]] : [h, d[1]] : d[1];
      }
      o(l, t);
    } else
      e != null && i(t, e, s);
    return this;
  }
  get(e, t) {
    if (e = Ve(e), e) {
      const s = p.findKey(this, e);
      if (s) {
        const n = this[s];
        if (!t)
          return n;
        if (t === !0)
          return vi(n);
        if (p.isFunction(t))
          return t.call(this, n, s);
        if (p.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = Ve(e), e) {
      const s = p.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!t || Et(this, this[s], s, t)));
    }
    return !1;
  }
  delete(e, t) {
    const s = this;
    let n = !1;
    function i(o) {
      if (o = Ve(o), o) {
        const l = p.findKey(s, o);
        l && (!t || Et(s, s[l], l, t)) && (delete s[l], n = !0);
      }
    }
    return p.isArray(e) ? e.forEach(i) : i(e), n;
  }
  clear(e) {
    const t = Object.keys(this);
    let s = t.length, n = !1;
    for (; s--; ) {
      const i = t[s];
      (!e || Et(this, this[i], i, e, !0)) && (delete this[i], n = !0);
    }
    return n;
  }
  normalize(e) {
    const t = this, s = {};
    return p.forEach(this, (n, i) => {
      const o = p.findKey(s, i);
      if (o) {
        t[o] = Ze(n), delete t[i];
        return;
      }
      const l = e ? Ni(i) : String(i).trim();
      l !== i && delete t[i], t[l] = Ze(n), s[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (s, n) => {
      s != null && s !== !1 && (t[n] = e && p.isArray(s) ? s.join(", ") : s);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const s = new this(e);
    return t.forEach((n) => s.set(n)), s;
  }
  static accessor(e) {
    const s = (this[Er] = this[Er] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function i(o) {
      const l = Ve(o);
      s[l] || (Li(n, o), s[l] = !0);
    }
    return p.isArray(e) ? e.forEach(i) : i(e), this;
  }
};
le.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
p.reduceDescriptors(le.prototype, ({ value: r }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => r,
    set(s) {
      this[t] = s;
    }
  };
});
p.freezeMethods(le);
function _t(r, e) {
  const t = this || Je, s = e || t, n = le.from(s.headers);
  let i = s.data;
  return p.forEach(r, function(l) {
    i = l.call(t, i, n.normalize(), e ? e.status : void 0);
  }), n.normalize(), i;
}
function Is(r) {
  return !!(r && r.__CANCEL__);
}
function Ue(r, e, t) {
  I.call(this, r ?? "canceled", I.ERR_CANCELED, e, t), this.name = "CanceledError";
}
p.inherits(Ue, I, {
  __CANCEL__: !0
});
function Ts(r, e, t) {
  const s = t.config.validateStatus;
  !t.status || !s || s(t.status) ? r(t) : e(new I(
    "Request failed with status code " + t.status,
    [I.ERR_BAD_REQUEST, I.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function xi(r) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return e && e[1] || "";
}
function ki(r, e) {
  r = r || 10;
  const t = new Array(r), s = new Array(r);
  let n = 0, i = 0, o;
  return e = e !== void 0 ? e : 1e3, function(h) {
    const u = Date.now(), d = s[i];
    o || (o = u), t[n] = h, s[n] = u;
    let g = i, y = 0;
    for (; g !== n; )
      y += t[g++], g = g % r;
    if (n = (n + 1) % r, n === i && (i = (i + 1) % r), u - o < e)
      return;
    const S = d && u - d;
    return S ? Math.round(y * 1e3 / S) : void 0;
  };
}
function Pi(r, e) {
  let t = 0, s = 1e3 / e, n, i;
  const o = (u, d = Date.now()) => {
    t = d, n = null, i && (clearTimeout(i), i = null), r(...u);
  };
  return [(...u) => {
    const d = Date.now(), g = d - t;
    g >= s ? o(u, d) : (n = u, i || (i = setTimeout(() => {
      i = null, o(n);
    }, s - g)));
  }, () => n && o(n)];
}
const at = (r, e, t = 3) => {
  let s = 0;
  const n = ki(50, 250);
  return Pi((i) => {
    const o = i.loaded, l = i.lengthComputable ? i.total : void 0, h = o - s, u = n(h), d = o <= l;
    s = o;
    const g = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: h,
      rate: u || void 0,
      estimated: u && l && d ? (l - o) / u : void 0,
      event: i,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    r(g);
  }, t);
}, _r = (r, e) => {
  const t = r != null;
  return [(s) => e[0]({
    lengthComputable: t,
    total: r,
    loaded: s
  }), e[1]];
}, br = (r) => (...e) => p.asap(() => r(...e)), Ui = ie.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, e) => (t) => (t = new URL(t, ie.origin), r.protocol === t.protocol && r.host === t.host && (e || r.port === t.port)))(
  new URL(ie.origin),
  ie.navigator && /(msie|trident)/i.test(ie.navigator.userAgent)
) : () => !0, Mi = ie.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, e, t, s, n, i) {
      const o = [r + "=" + encodeURIComponent(e)];
      p.isNumber(t) && o.push("expires=" + new Date(t).toGMTString()), p.isString(s) && o.push("path=" + s), p.isString(n) && o.push("domain=" + n), i === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(r) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(r) {
      this.write(r, "", Date.now() - 864e5);
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
function Bi(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function Vi(r, e) {
  return e ? r.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r;
}
function Fs(r, e, t) {
  let s = !Bi(e);
  return r && (s || t == !1) ? Vi(r, e) : e;
}
const Sr = (r) => r instanceof le ? { ...r } : r;
function Te(r, e) {
  e = e || {};
  const t = {};
  function s(u, d, g, y) {
    return p.isPlainObject(u) && p.isPlainObject(d) ? p.merge.call({ caseless: y }, u, d) : p.isPlainObject(d) ? p.merge({}, d) : p.isArray(d) ? d.slice() : d;
  }
  function n(u, d, g, y) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(u))
        return s(void 0, u, g, y);
    } else return s(u, d, g, y);
  }
  function i(u, d) {
    if (!p.isUndefined(d))
      return s(void 0, d);
  }
  function o(u, d) {
    if (p.isUndefined(d)) {
      if (!p.isUndefined(u))
        return s(void 0, u);
    } else return s(void 0, d);
  }
  function l(u, d, g) {
    if (g in e)
      return s(u, d);
    if (g in r)
      return s(void 0, u);
  }
  const h = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (u, d, g) => n(Sr(u), Sr(d), g, !0)
  };
  return p.forEach(Object.keys({ ...r, ...e }), function(d) {
    const g = h[d] || n, y = g(r[d], e[d], d);
    p.isUndefined(y) && g !== l || (t[d] = y);
  }), t;
}
const vs = (r) => {
  const e = Te({}, r);
  let { data: t, withXSRFToken: s, xsrfHeaderName: n, xsrfCookieName: i, headers: o, auth: l } = e;
  e.headers = o = le.from(o), e.url = Cs(Fs(e.baseURL, e.url, e.allowAbsoluteUrls), r.params, r.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let h;
  if (p.isFormData(t)) {
    if (ie.hasStandardBrowserEnv || ie.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((h = o.getContentType()) !== !1) {
      const [u, ...d] = h ? h.split(";").map((g) => g.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...d].join("; "));
    }
  }
  if (ie.hasStandardBrowserEnv && (s && p.isFunction(s) && (s = s(e)), s || s !== !1 && Ui(e.url))) {
    const u = n && i && Mi.read(i);
    u && o.set(n, u);
  }
  return e;
}, zi = typeof XMLHttpRequest < "u", ji = zi && function(r) {
  return new Promise(function(t, s) {
    const n = vs(r);
    let i = n.data;
    const o = le.from(n.headers).normalize();
    let { responseType: l, onUploadProgress: h, onDownloadProgress: u } = n, d, g, y, S, w;
    function C() {
      S && S(), w && w(), n.cancelToken && n.cancelToken.unsubscribe(d), n.signal && n.signal.removeEventListener("abort", d);
    }
    let b = new XMLHttpRequest();
    b.open(n.method.toUpperCase(), n.url, !0), b.timeout = n.timeout;
    function V() {
      if (!b)
        return;
      const G = le.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), Z = {
        data: !l || l === "text" || l === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: G,
        config: r,
        request: b
      };
      Ts(function(k) {
        t(k), C();
      }, function(k) {
        s(k), C();
      }, Z), b = null;
    }
    "onloadend" in b ? b.onloadend = V : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(V);
    }, b.onabort = function() {
      b && (s(new I("Request aborted", I.ECONNABORTED, r, b)), b = null);
    }, b.onerror = function() {
      s(new I("Network Error", I.ERR_NETWORK, r, b)), b = null;
    }, b.ontimeout = function() {
      let ce = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
      const Z = n.transitional || Rs;
      n.timeoutErrorMessage && (ce = n.timeoutErrorMessage), s(new I(
        ce,
        Z.clarifyTimeoutError ? I.ETIMEDOUT : I.ECONNABORTED,
        r,
        b
      )), b = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in b && p.forEach(o.toJSON(), function(ce, Z) {
      b.setRequestHeader(Z, ce);
    }), p.isUndefined(n.withCredentials) || (b.withCredentials = !!n.withCredentials), l && l !== "json" && (b.responseType = n.responseType), u && ([y, w] = at(u, !0), b.addEventListener("progress", y)), h && b.upload && ([g, S] = at(h), b.upload.addEventListener("progress", g), b.upload.addEventListener("loadend", S)), (n.cancelToken || n.signal) && (d = (G) => {
      b && (s(!G || G.type ? new Ue(null, r, b) : G), b.abort(), b = null);
    }, n.cancelToken && n.cancelToken.subscribe(d), n.signal && (n.signal.aborted ? d() : n.signal.addEventListener("abort", d)));
    const H = xi(n.url);
    if (H && ie.protocols.indexOf(H) === -1) {
      s(new I("Unsupported protocol " + H + ":", I.ERR_BAD_REQUEST, r));
      return;
    }
    b.send(i || null);
  });
}, qi = (r, e) => {
  const { length: t } = r = r ? r.filter(Boolean) : [];
  if (e || t) {
    let s = new AbortController(), n;
    const i = function(u) {
      if (!n) {
        n = !0, l();
        const d = u instanceof Error ? u : this.reason;
        s.abort(d instanceof I ? d : new Ue(d instanceof Error ? d.message : d));
      }
    };
    let o = e && setTimeout(() => {
      o = null, i(new I(`timeout ${e} of ms exceeded`, I.ETIMEDOUT));
    }, e);
    const l = () => {
      r && (o && clearTimeout(o), o = null, r.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener("abort", i);
      }), r = null);
    };
    r.forEach((u) => u.addEventListener("abort", i));
    const { signal: h } = s;
    return h.unsubscribe = () => p.asap(l), h;
  }
}, $i = function* (r, e) {
  let t = r.byteLength;
  if (t < e) {
    yield r;
    return;
  }
  let s = 0, n;
  for (; s < t; )
    n = s + e, yield r.slice(s, n), s = n;
}, Hi = async function* (r, e) {
  for await (const t of Gi(r))
    yield* $i(t, e);
}, Gi = async function* (r) {
  if (r[Symbol.asyncIterator]) {
    yield* r;
    return;
  }
  const e = r.getReader();
  try {
    for (; ; ) {
      const { done: t, value: s } = await e.read();
      if (t)
        break;
      yield s;
    }
  } finally {
    await e.cancel();
  }
}, Or = (r, e, t, s) => {
  const n = Hi(r, e);
  let i = 0, o, l = (h) => {
    o || (o = !0, s && s(h));
  };
  return new ReadableStream({
    async pull(h) {
      try {
        const { done: u, value: d } = await n.next();
        if (u) {
          l(), h.close();
          return;
        }
        let g = d.byteLength;
        if (t) {
          let y = i += g;
          t(y);
        }
        h.enqueue(new Uint8Array(d));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(h) {
      return l(h), n.return();
    }
  }, {
    highWaterMark: 2
  });
}, ht = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ds = ht && typeof ReadableStream == "function", Ki = ht && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (e) => r.encode(e))(new TextEncoder()) : async (r) => new Uint8Array(await new Response(r).arrayBuffer())), Ns = (r, ...e) => {
  try {
    return !!r(...e);
  } catch {
    return !1;
  }
}, Ji = Ds && Ns(() => {
  let r = !1;
  const e = new Request(ie.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = !0, "half";
    }
  }).headers.has("Content-Type");
  return r && !e;
}), Cr = 64 * 1024, Lt = Ds && Ns(() => p.isReadableStream(new Response("").body)), ut = {
  stream: Lt && ((r) => r.body)
};
ht && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !ut[e] && (ut[e] = p.isFunction(r[e]) ? (t) => t[e]() : (t, s) => {
      throw new I(`Response type '${e}' is not supported`, I.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const Wi = async (r) => {
  if (r == null)
    return 0;
  if (p.isBlob(r))
    return r.size;
  if (p.isSpecCompliantForm(r))
    return (await new Request(ie.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (p.isArrayBufferView(r) || p.isArrayBuffer(r))
    return r.byteLength;
  if (p.isURLSearchParams(r) && (r = r + ""), p.isString(r))
    return (await Ki(r)).byteLength;
}, Xi = async (r, e) => {
  const t = p.toFiniteNumber(r.getContentLength());
  return t ?? Wi(e);
}, Qi = ht && (async (r) => {
  let {
    url: e,
    method: t,
    data: s,
    signal: n,
    cancelToken: i,
    timeout: o,
    onDownloadProgress: l,
    onUploadProgress: h,
    responseType: u,
    headers: d,
    withCredentials: g = "same-origin",
    fetchOptions: y
  } = vs(r);
  u = u ? (u + "").toLowerCase() : "text";
  let S = qi([n, i && i.toAbortSignal()], o), w;
  const C = S && S.unsubscribe && (() => {
    S.unsubscribe();
  });
  let b;
  try {
    if (h && Ji && t !== "get" && t !== "head" && (b = await Xi(d, s)) !== 0) {
      let Z = new Request(e, {
        method: "POST",
        body: s,
        duplex: "half"
      }), ee;
      if (p.isFormData(s) && (ee = Z.headers.get("content-type")) && d.setContentType(ee), Z.body) {
        const [k, a] = _r(
          b,
          at(br(h))
        );
        s = Or(Z.body, Cr, k, a);
      }
    }
    p.isString(g) || (g = g ? "include" : "omit");
    const V = "credentials" in Request.prototype;
    w = new Request(e, {
      ...y,
      signal: S,
      method: t.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: V ? g : void 0
    });
    let H = await fetch(w, y);
    const G = Lt && (u === "stream" || u === "response");
    if (Lt && (l || G && C)) {
      const Z = {};
      ["status", "statusText", "headers"].forEach((c) => {
        Z[c] = H[c];
      });
      const ee = p.toFiniteNumber(H.headers.get("content-length")), [k, a] = l && _r(
        ee,
        at(br(l), !0)
      ) || [];
      H = new Response(
        Or(H.body, Cr, k, () => {
          a && a(), C && C();
        }),
        Z
      );
    }
    u = u || "text";
    let ce = await ut[p.findKey(ut, u) || "text"](H, r);
    return !G && C && C(), await new Promise((Z, ee) => {
      Ts(Z, ee, {
        data: ce,
        headers: le.from(H.headers),
        status: H.status,
        statusText: H.statusText,
        config: r,
        request: w
      });
    });
  } catch (V) {
    throw C && C(), V && V.name === "TypeError" && /Load failed|fetch/i.test(V.message) ? Object.assign(
      new I("Network Error", I.ERR_NETWORK, r, w),
      {
        cause: V.cause || V
      }
    ) : I.from(V, V && V.code, r, w);
  }
}), xt = {
  http: di,
  xhr: ji,
  fetch: Qi
};
p.forEach(xt, (r, e) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: e });
    } catch {
    }
    Object.defineProperty(r, "adapterName", { value: e });
  }
});
const Rr = (r) => `- ${r}`, Zi = (r) => p.isFunction(r) || r === null || r === !1, Ls = {
  getAdapter: (r) => {
    r = p.isArray(r) ? r : [r];
    const { length: e } = r;
    let t, s;
    const n = {};
    for (let i = 0; i < e; i++) {
      t = r[i];
      let o;
      if (s = t, !Zi(t) && (s = xt[(o = String(t)).toLowerCase()], s === void 0))
        throw new I(`Unknown adapter '${o}'`);
      if (s)
        break;
      n[o || "#" + i] = s;
    }
    if (!s) {
      const i = Object.entries(n).map(
        ([l, h]) => `adapter ${l} ` + (h === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? i.length > 1 ? `since :
` + i.map(Rr).join(`
`) : " " + Rr(i[0]) : "as no adapter specified";
      throw new I(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: xt
};
function bt(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Ue(null, r);
}
function Ar(r) {
  return bt(r), r.headers = le.from(r.headers), r.data = _t.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), Ls.getAdapter(r.adapter || Je.adapter)(r).then(function(s) {
    return bt(r), s.data = _t.call(
      r,
      r.transformResponse,
      s
    ), s.headers = le.from(s.headers), s;
  }, function(s) {
    return Is(s) || (bt(r), s && s.response && (s.response.data = _t.call(
      r,
      r.transformResponse,
      s.response
    ), s.response.headers = le.from(s.response.headers))), Promise.reject(s);
  });
}
const xs = "1.11.0", gt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, e) => {
  gt[r] = function(s) {
    return typeof s === r || "a" + (e < 1 ? "n " : " ") + r;
  };
});
const Ir = {};
gt.transitional = function(e, t, s) {
  function n(i, o) {
    return "[Axios v" + xs + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "");
  }
  return (i, o, l) => {
    if (e === !1)
      throw new I(
        n(o, " has been removed" + (t ? " in " + t : "")),
        I.ERR_DEPRECATED
      );
    return t && !Ir[o] && (Ir[o] = !0, console.warn(
      n(
        o,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(i, o, l) : !0;
  };
};
gt.spelling = function(e) {
  return (t, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
};
function Yi(r, e, t) {
  if (typeof r != "object")
    throw new I("options must be an object", I.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(r);
  let n = s.length;
  for (; n-- > 0; ) {
    const i = s[n], o = e[i];
    if (o) {
      const l = r[i], h = l === void 0 || o(l, i, r);
      if (h !== !0)
        throw new I("option " + i + " must be " + h, I.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new I("Unknown option " + i, I.ERR_BAD_OPTION);
  }
}
const Ye = {
  assertOptions: Yi,
  validators: gt
}, _e = Ye.validators;
let Ie = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new wr(),
      response: new wr()
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
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (s) {
      if (s instanceof Error) {
        let n = {};
        Error.captureStackTrace ? Error.captureStackTrace(n) : n = new Error();
        const i = n.stack ? n.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? i && !String(s.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + i) : s.stack = i;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = Te(this.defaults, t);
    const { transitional: s, paramsSerializer: n, headers: i } = t;
    s !== void 0 && Ye.assertOptions(s, {
      silentJSONParsing: _e.transitional(_e.boolean),
      forcedJSONParsing: _e.transitional(_e.boolean),
      clarifyTimeoutError: _e.transitional(_e.boolean)
    }, !1), n != null && (p.isFunction(n) ? t.paramsSerializer = {
      serialize: n
    } : Ye.assertOptions(n, {
      encode: _e.function,
      serialize: _e.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), Ye.assertOptions(t, {
      baseUrl: _e.spelling("baseURL"),
      withXsrfToken: _e.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let o = i && p.merge(
      i.common,
      i[t.method]
    );
    i && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (w) => {
        delete i[w];
      }
    ), t.headers = le.concat(o, i);
    const l = [];
    let h = !0;
    this.interceptors.request.forEach(function(C) {
      typeof C.runWhen == "function" && C.runWhen(t) === !1 || (h = h && C.synchronous, l.unshift(C.fulfilled, C.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(C) {
      u.push(C.fulfilled, C.rejected);
    });
    let d, g = 0, y;
    if (!h) {
      const w = [Ar.bind(this), void 0];
      for (w.unshift(...l), w.push(...u), y = w.length, d = Promise.resolve(t); g < y; )
        d = d.then(w[g++], w[g++]);
      return d;
    }
    y = l.length;
    let S = t;
    for (g = 0; g < y; ) {
      const w = l[g++], C = l[g++];
      try {
        S = w(S);
      } catch (b) {
        C.call(this, b);
        break;
      }
    }
    try {
      d = Ar.call(this, S);
    } catch (w) {
      return Promise.reject(w);
    }
    for (g = 0, y = u.length; g < y; )
      d = d.then(u[g++], u[g++]);
    return d;
  }
  getUri(e) {
    e = Te(this.defaults, e);
    const t = Fs(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Cs(t, e.params, e.paramsSerializer);
  }
};
p.forEach(["delete", "get", "head", "options"], function(e) {
  Ie.prototype[e] = function(t, s) {
    return this.request(Te(s || {}, {
      method: e,
      url: t,
      data: (s || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(e) {
  function t(s) {
    return function(i, o, l) {
      return this.request(Te(l || {}, {
        method: e,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  Ie.prototype[e] = t(), Ie.prototype[e + "Form"] = t(!0);
});
let eo = class ks {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(i) {
      t = i;
    });
    const s = this;
    this.promise.then((n) => {
      if (!s._listeners) return;
      let i = s._listeners.length;
      for (; i-- > 0; )
        s._listeners[i](n);
      s._listeners = null;
    }), this.promise.then = (n) => {
      let i;
      const o = new Promise((l) => {
        s.subscribe(l), i = l;
      }).then(n);
      return o.cancel = function() {
        s.unsubscribe(i);
      }, o;
    }, e(function(i, o, l) {
      s.reason || (s.reason = new Ue(i, o, l), t(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), t = (s) => {
      e.abort(s);
    };
    return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new ks(function(n) {
        e = n;
      }),
      cancel: e
    };
  }
};
function to(r) {
  return function(t) {
    return r.apply(null, t);
  };
}
function ro(r) {
  return p.isObject(r) && r.isAxiosError === !0;
}
const kt = {
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
Object.entries(kt).forEach(([r, e]) => {
  kt[e] = r;
});
function Ps(r) {
  const e = new Ie(r), t = ds(Ie.prototype.request, e);
  return p.extend(t, Ie.prototype, e, { allOwnKeys: !0 }), p.extend(t, e, null, { allOwnKeys: !0 }), t.create = function(n) {
    return Ps(Te(r, n));
  }, t;
}
const J = Ps(Je);
J.Axios = Ie;
J.CanceledError = Ue;
J.CancelToken = eo;
J.isCancel = Is;
J.VERSION = xs;
J.toFormData = pt;
J.AxiosError = I;
J.Cancel = J.CanceledError;
J.all = function(e) {
  return Promise.all(e);
};
J.spread = to;
J.isAxiosError = ro;
J.mergeConfig = Te;
J.AxiosHeaders = le;
J.formToJSON = (r) => As(p.isHTMLForm(r) ? new FormData(r) : r);
J.getAdapter = Ls.getAdapter;
J.HttpStatusCode = kt;
J.default = J;
const {
  Axios: io,
  AxiosError: oo,
  CanceledError: ao,
  isCancel: uo,
  CancelToken: lo,
  VERSION: co,
  all: fo,
  Cancel: po,
  isAxiosError: ho,
  spread: go,
  toFormData: mo,
  AxiosHeaders: yo,
  HttpStatusCode: wo,
  formToJSON: Eo,
  getAdapter: _o,
  mergeConfig: bo
} = J, We = {
  "https://github.com/alpheios-project/grammar-bennett": { base_url: "https://grammars.alpheios.net/bennett/", index_url: "https://grammars.alpheios.net/bennett/index/alph-index-bennett", description: "New Latin Grammar, by Charles E. Bennett", rights: "New Latin Grammar, by Charles E. Bennett. Copyright 1895; 1908; 1918.", langs: { source: "lat", target: "en" } },
  "https://github.com/alpheios-project/grammar-allen-greenough": { base_url: "https://grammars.alpheios.net/allen-greenough/", index_url: "https://grammars.alpheios.net/allen-greenough/index/alph-index-allen-greenough", description: "Allen and Greenough’s New Latin Grammar for Schools and Colleges", rights: "Allen and Greenough’s New Latin Grammar for Schools and Colleges, edited by J.B. Greenough, G.L. Kittredge, A.A. Howard, and Benjamin L. D’Ooge. Boston: Ginn &amp; Company, 1903.", langs: { source: "lat", target: "en" } },
  "https://github.com/alpheios-project/grammar-smyth": { base_url: "https://grammars.alpheios.net/smyth/xhtml/", index_url: "https://grammars.alpheios.net/smyth/index/alph-index-smyth", description: "Smyth's Greek Grammar For Colleges", rights: "Smyth's Greek Grammar for Colleges, by Herbert Weir Smyth.", langs: { source: "grc", target: "en" } }
};
class Tr extends Us {
  /**
   * A Client Adapter for the Alpheios V1 Lexicon service
   * @constructor
   * @param {string} resid - the idenitifer code for the grammar this instance
   *                         provides access to
   * @param {Object} config - JSON configuration object override
   */
  constructor(e = null, t = null) {
    if (super(), this.resid = e, this.index = null, t == null)
      try {
        let s = JSON.parse(We);
        this.config = s[e];
      } catch {
        this.config = We[e];
      }
    else
      this.config = t;
    this.provider = new ot(this.resid, this.config.rights);
  }
  /**
   * @override BaseResourceAdapter#getResources
   * @param {Feature} keyObj - receives a feature and returns a list of resources
   */
  async getResources(e) {
    if (this.index === null && this.getConfig("index_url")) {
      let l = this.getConfig("index_url"), h = await this._loadData(l), u = js.parse(h, {});
      this.index = this._fillMap(u.data);
    }
    let t = [], s = e.type;
    e.value && (s = `${s}-${e.value}`), this.index && (t = this._lookupInDataIndex(this.index, s));
    let n = this.getConfig("base_url"), i = (/* @__PURE__ */ new Date()).getTime(), o = [];
    for (let l of t)
      for (let h of l) {
        let [u, d] = h.split("#");
        u && d && (h = `${u}?ts=${i}#${d}`);
        let g = {};
        n ? g.url = `${n}${h}` : g.url = h, o.push(ot.getProxy(this.provider, g));
      }
    return o;
  }
  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data index
   * @param {string} key the key  to lookup
   * @return {string} the index entry as a text string
   */
  _lookupInDataIndex(e, t) {
    let s = e.get(t);
    return s || (t = `alph-${t}`, s = e.get(t)), s || (t = "alph-general-index", s = e.get(t)), s ? [s] : [];
  }
  /**
   * Loads a data file from a URL
   * @param {string} url - the url of the file
   * @returns {Promise} a Promise that resolves to the text contents of the loaded file
   */
  _loadData(e) {
    return new Promise((t, s) => {
      window.fetch(e).then(
        function(n) {
          let i = n.text();
          t(i);
        }
      ).catch((n) => {
        s(n);
      });
    });
  }
  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  _fillMap(e) {
    let t = /* @__PURE__ */ new Map();
    for (let s of e)
      t.has(s[0]) ? t.get(s[0]).push(s[1]) : t.set(s[0], [s[1]]);
    return t;
  }
  /**
   * Get a configuration setting for this lexicon client instance
   * @param {string} property
   * @returns {string} the value of the property
   */
  getConfig(e) {
    return this.config[e];
  }
  /**
   * @override BaseAdapter#getProviders
   */
  static getProviders(e) {
    let t, s = /* @__PURE__ */ new Map();
    try {
      t = JSON.parse(We);
    } catch {
      t = We;
    }
    for (let n of Object.keys(t))
      t[n].langs.source === e && s.set(n, t[n].description);
    return s;
  }
}
let St = /* @__PURE__ */ new Map();
class Pt {
  /**
   * Default request parameters
   * @return {{timeout: number}}
   */
  static get defaults() {
    return {
      timeout: 0
      // If zero, no timeout will be used
    };
  }
  /**
   * Send request to a grammar index
   * @param {Feature} feature - A feature to lookup
   * @param {Object} requestOptions - With what options run a request.
   * @return {Promise[]} Array of Promises, one for each request. They will be either fulfilled with
   * a Definition object or resolved with an error if request cannot be made/failed/timeout expired.
   */
  static fetchResources(e, t) {
    let s = Object.assign(Pt.defaults, t), n = [];
    try {
      let i = Pt.getGrammarAdapters(e.languageID, s);
      return !i || i.length === 0 ? [] : (n = i.map((o) => new Promise((l, h) => {
        let u = 0;
        s.timeout > 0 && (u = window.setTimeout(() => {
          h(new Error(`Timeout of ${s.timeout} ms has been expired for a request to "${o.config.description}"`));
        }, s.timeout));
        try {
          o.getResources(e).then((d) => {
            u && window.clearTimeout(u), l(d);
          }).catch((d) => {
            u && window.clearTimeout(u), h(d);
          });
        } catch (d) {
          h(d);
        }
      })), n);
    } catch (i) {
      return M.getInstance().error(`Alpheios error: unable to fetch resources due to ${i}`), [];
    }
  }
  /**
   * Returns a list of suitable lexicon adapters for a given language ID.
   * @param {Symbol} languageID - A language ID of adapters returned.
   * @param {Object} options - request options
   * @return {BaseLexiconAdapter[]} An array of lexicon adapters for a given language.
   */
  static getGrammarAdapters(e, t) {
    if (!St.has(e)) {
      let n = re.getLanguageCodeFromId(e), i = Tr.getProviders(n);
      St.set(e, Array.from(i.keys()).map((o) => new Tr(o)));
    }
    const s = St.get(e);
    return t.prefer ? s.filter((n) => n.resid === t.prefer) : s;
  }
}
export {
  Tr as GrammarResAdapter,
  Pt as Grammars
};
