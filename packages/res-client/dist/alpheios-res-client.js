class ja {
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
function Na(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var gt = { exports: {} };
/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/
var Ua = gt.exports, kr;
function Ma() {
  return kr || (kr = 1, (function(s, e) {
    ((t, r) => {
      s.exports = r();
    })(Ua, function t() {
      var r = typeof self < "u" ? self : typeof window < "u" ? window : r !== void 0 ? r : {}, n, a = !r.document && !!r.postMessage, i = r.IS_PAPA_WORKER || !1, l = {}, p = 0, u = {};
      function f(c) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(d) {
          var b = he(d);
          b.chunkSize = parseInt(b.chunkSize), d.step || d.chunk || (b.chunkSize = null), this._handle = new v(b), (this._handle.streamer = this)._config = b;
        }).call(this, c), this.parseChunk = function(d, b) {
          var E = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < E) {
            let L = this._config.newline;
            L || (S = this._config.quoteChar || '"', L = this._handle.guessLineEndings(d, S)), d = [...d.split(L).slice(E)].join(L);
          }
          this.isFirstChunk && M(this._config.beforeFirstChunk) && (S = this._config.beforeFirstChunk(d)) !== void 0 && (d = S), this.isFirstChunk = !1, this._halted = !1;
          var E = this._partialLine + d, S = (this._partialLine = "", this._handle.parse(E, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            if (d = S.meta.cursor, E = (this._finished || (this._partialLine = E.substring(d - this._baseIndex), this._baseIndex = d), S && S.data && (this._rowCount += S.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), i) r.postMessage({ results: S, workerId: u.WORKER_ID, finished: E });
            else if (M(this._config.chunk) && !b) {
              if (this._config.chunk(S, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              this._completeResults = S = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(S.data), this._completeResults.errors = this._completeResults.errors.concat(S.errors), this._completeResults.meta = S.meta), this._completed || !E || !M(this._config.complete) || S && S.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), E || S && S.meta.paused || this._nextChunk(), S;
          }
          this._halted = !0;
        }, this._sendError = function(d) {
          M(this._config.error) ? this._config.error(d) : i && this._config.error && r.postMessage({ workerId: u.WORKER_ID, error: d, finished: !1 });
        };
      }
      function y(c) {
        var d;
        (c = c || {}).chunkSize || (c.chunkSize = u.RemoteChunkSize), f.call(this, c), this._nextChunk = a ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(b) {
          this._input = b, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (d = new XMLHttpRequest(), this._config.withCredentials && (d.withCredentials = this._config.withCredentials), a || (d.onload = ie(this._chunkLoaded, this), d.onerror = ie(this._chunkError, this)), d.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !a), this._config.downloadRequestHeaders) {
              var b, E = this._config.downloadRequestHeaders;
              for (b in E) d.setRequestHeader(b, E[b]);
            }
            var S;
            this._config.chunkSize && (S = this._start + this._config.chunkSize - 1, d.setRequestHeader("Range", "bytes=" + this._start + "-" + S));
            try {
              d.send(this._config.downloadRequestBody);
            } catch (L) {
              this._chunkError(L.message);
            }
            a && d.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          d.readyState === 4 && (d.status < 200 || 400 <= d.status ? this._chunkError() : (this._start += this._config.chunkSize || d.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((b) => (b = b.getResponseHeader("Content-Range")) !== null ? parseInt(b.substring(b.lastIndexOf("/") + 1)) : -1)(d), this.parseChunk(d.responseText)));
        }, this._chunkError = function(b) {
          b = d.statusText || b, this._sendError(new Error(b));
        };
      }
      function w(c) {
        (c = c || {}).chunkSize || (c.chunkSize = u.LocalChunkSize), f.call(this, c);
        var d, b, E = typeof FileReader < "u";
        this.stream = function(S) {
          this._input = S, b = S.slice || S.webkitSlice || S.mozSlice, E ? ((d = new FileReader()).onload = ie(this._chunkLoaded, this), d.onerror = ie(this._chunkError, this)) : d = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var S = this._input, L = (this._config.chunkSize && (L = Math.min(this._start + this._config.chunkSize, this._input.size), S = b.call(S, this._start, L)), d.readAsText(S, this._config.encoding));
          E || this._chunkLoaded({ target: { result: L } });
        }, this._chunkLoaded = function(S) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(S.target.result);
        }, this._chunkError = function() {
          this._sendError(d.error);
        };
      }
      function m(c) {
        var d;
        f.call(this, c = c || {}), this.stream = function(b) {
          return d = b, this._nextChunk();
        }, this._nextChunk = function() {
          var b, E;
          if (!this._finished) return b = this._config.chunkSize, d = b ? (E = d.substring(0, b), d.substring(b)) : (E = d, ""), this._finished = !d, this.parseChunk(E);
        };
      }
      function x(c) {
        f.call(this, c = c || {});
        var d = [], b = !0, E = !1;
        this.pause = function() {
          f.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          f.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(S) {
          this._input = S, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          E && d.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), d.length ? this.parseChunk(d.shift()) : b = !0;
        }, this._streamData = ie(function(S) {
          try {
            d.push(typeof S == "string" ? S : S.toString(this._config.encoding)), b && (b = !1, this._checkIsFinished(), this.parseChunk(d.shift()));
          } catch (L) {
            this._streamError(L);
          }
        }, this), this._streamError = ie(function(S) {
          this._streamCleanUp(), this._sendError(S);
        }, this), this._streamEnd = ie(function() {
          this._streamCleanUp(), E = !0, this._streamData("");
        }, this), this._streamCleanUp = ie(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function v(c) {
        var d, b, E, S, L = Math.pow(2, 53), X = -L, de = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, fe = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, k = this, J = 0, D = 0, se = !1, _ = !1, P = [], I = { data: [], errors: [], meta: {} };
        function Y(j) {
          return c.skipEmptyLines === "greedy" ? j.join("").trim() === "" : j.length === 1 && j[0].length === 0;
        }
        function Q() {
          if (I && E && (pe("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + u.DefaultDelimiter + "'"), E = !1), c.skipEmptyLines && (I.data = I.data.filter(function(C) {
            return !Y(C);
          })), te()) {
            let C = function(K, Z) {
              M(c.transformHeader) && (K = c.transformHeader(K, Z)), P.push(K);
            };
            if (I) if (Array.isArray(I.data[0])) {
              for (var j = 0; te() && j < I.data.length; j++) I.data[j].forEach(C);
              I.data.splice(0, 1);
            } else I.data.forEach(C);
          }
          function U(C, K) {
            for (var Z = c.header ? {} : [], V = 0; V < C.length; V++) {
              var B = V, N = C[V], N = ((me, T) => ((z) => (c.dynamicTypingFunction && c.dynamicTyping[z] === void 0 && (c.dynamicTyping[z] = c.dynamicTypingFunction(z)), (c.dynamicTyping[z] || c.dynamicTyping) === !0))(me) ? T === "true" || T === "TRUE" || T !== "false" && T !== "FALSE" && (((z) => {
                if (de.test(z) && (z = parseFloat(z), X < z && z < L))
                  return 1;
              })(T) ? parseFloat(T) : fe.test(T) ? new Date(T) : T === "" ? null : T) : T)(B = c.header ? V >= P.length ? "__parsed_extra" : P[V] : B, N = c.transform ? c.transform(N, B) : N);
              B === "__parsed_extra" ? (Z[B] = Z[B] || [], Z[B].push(N)) : Z[B] = N;
            }
            return c.header && (V > P.length ? pe("FieldMismatch", "TooManyFields", "Too many fields: expected " + P.length + " fields but parsed " + V, D + K) : V < P.length && pe("FieldMismatch", "TooFewFields", "Too few fields: expected " + P.length + " fields but parsed " + V, D + K)), Z;
          }
          var H;
          I && (c.header || c.dynamicTyping || c.transform) && (H = 1, !I.data.length || Array.isArray(I.data[0]) ? (I.data = I.data.map(U), H = I.data.length) : I.data = U(I.data, 0), c.header && I.meta && (I.meta.fields = P), D += H);
        }
        function te() {
          return c.header && P.length === 0;
        }
        function pe(j, U, H, C) {
          j = { type: j, code: U, message: H }, C !== void 0 && (j.row = C), I.errors.push(j);
        }
        M(c.step) && (S = c.step, c.step = function(j) {
          I = j, te() ? Q() : (Q(), I.data.length !== 0 && (J += j.data.length, c.preview && J > c.preview ? b.abort() : (I.data = I.data[0], S(I, k))));
        }), this.parse = function(j, U, H) {
          var C = c.quoteChar || '"', C = (c.newline || (c.newline = this.guessLineEndings(j, C)), E = !1, c.delimiter ? M(c.delimiter) && (c.delimiter = c.delimiter(j), I.meta.delimiter = c.delimiter) : ((C = ((K, Z, V, B, N) => {
            var me, T, z, Ae;
            N = N || [",", "	", "|", ";", u.RECORD_SEP, u.UNIT_SEP];
            for (var Ve = 0; Ve < N.length; Ve++) {
              for (var we, Ye = N[Ve], ne = 0, ve = 0, ee = 0, oe = (z = void 0, new W({ comments: B, delimiter: Ye, newline: Z, preview: 10 }).parse(K)), xe = 0; xe < oe.data.length; xe++) V && Y(oe.data[xe]) ? ee++ : (we = oe.data[xe].length, ve += we, z === void 0 ? z = we : 0 < we && (ne += Math.abs(we - z), z = we));
              0 < oe.data.length && (ve /= oe.data.length - ee), (T === void 0 || ne <= T) && (Ae === void 0 || Ae < ve) && 1.99 < ve && (T = ne, me = Ye, Ae = ve);
            }
            return { successful: !!(c.delimiter = me), bestDelimiter: me };
          })(j, c.newline, c.skipEmptyLines, c.comments, c.delimitersToGuess)).successful ? c.delimiter = C.bestDelimiter : (E = !0, c.delimiter = u.DefaultDelimiter), I.meta.delimiter = c.delimiter), he(c));
          return c.preview && c.header && C.preview++, d = j, b = new W(C), I = b.parse(d, U, H), Q(), se ? { meta: { paused: !0 } } : I || { meta: { paused: !1 } };
        }, this.paused = function() {
          return se;
        }, this.pause = function() {
          se = !0, b.abort(), d = M(c.chunk) ? "" : d.substring(b.getCharIndex());
        }, this.resume = function() {
          k.streamer._halted ? (se = !1, k.streamer.parseChunk(d, !0)) : setTimeout(k.resume, 3);
        }, this.aborted = function() {
          return _;
        }, this.abort = function() {
          _ = !0, b.abort(), I.meta.aborted = !0, M(c.complete) && c.complete(I), d = "";
        }, this.guessLineEndings = function(K, C) {
          K = K.substring(0, 1048576);
          var C = new RegExp(G(C) + "([^]*?)" + G(C), "gm"), H = (K = K.replace(C, "")).split("\r"), C = K.split(`
`), K = 1 < C.length && C[0].length < H[0].length;
          if (H.length === 1 || K) return `
`;
          for (var Z = 0, V = 0; V < H.length; V++) H[V][0] === `
` && Z++;
          return Z >= H.length / 2 ? `\r
` : "\r";
        };
      }
      function G(c) {
        return c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function W(c) {
        var d = (c = c || {}).delimiter, b = c.newline, E = c.comments, S = c.step, L = c.preview, X = c.fastMode, de = null, fe = !1, k = c.quoteChar == null ? '"' : c.quoteChar, J = k;
        if (c.escapeChar !== void 0 && (J = c.escapeChar), (typeof d != "string" || -1 < u.BAD_DELIMITERS.indexOf(d)) && (d = ","), E === d) throw new Error("Comment character same as delimiter");
        E === !0 ? E = "#" : (typeof E != "string" || -1 < u.BAD_DELIMITERS.indexOf(E)) && (E = !1), b !== `
` && b !== "\r" && b !== `\r
` && (b = `
`);
        var D = 0, se = !1;
        this.parse = function(_, P, I) {
          if (typeof _ != "string") throw new Error("Input must be a string");
          var Y = _.length, Q = d.length, te = b.length, pe = E.length, j = M(S), U = [], H = [], C = [], K = D = 0;
          if (!_) return ne();
          if (X || X !== !1 && _.indexOf(k) === -1) {
            for (var Z = _.split(b), V = 0; V < Z.length; V++) {
              if (C = Z[V], D += C.length, V !== Z.length - 1) D += b.length;
              else if (I) return ne();
              if (!E || C.substring(0, pe) !== E) {
                if (j) {
                  if (U = [], Ae(C.split(d)), ve(), se) return ne();
                } else Ae(C.split(d));
                if (L && L <= V) return U = U.slice(0, L), ne(!0);
              }
            }
            return ne();
          }
          for (var B = _.indexOf(d, D), N = _.indexOf(b, D), me = new RegExp(G(J) + G(k), "g"), T = _.indexOf(k, D); ; ) if (_[D] === k) for (T = D, D++; ; ) {
            if ((T = _.indexOf(k, T + 1)) === -1) return I || H.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: U.length, index: D }), we();
            if (T === Y - 1) return we(_.substring(D, T).replace(me, k));
            if (k === J && _[T + 1] === J) T++;
            else if (k === J || T === 0 || _[T - 1] !== J) {
              B !== -1 && B < T + 1 && (B = _.indexOf(d, T + 1));
              var z = Ve((N = N !== -1 && N < T + 1 ? _.indexOf(b, T + 1) : N) === -1 ? B : Math.min(B, N));
              if (_.substr(T + 1 + z, Q) === d) {
                C.push(_.substring(D, T).replace(me, k)), _[D = T + 1 + z + Q] !== k && (T = _.indexOf(k, D)), B = _.indexOf(d, D), N = _.indexOf(b, D);
                break;
              }
              if (z = Ve(N), _.substring(T + 1 + z, T + 1 + z + te) === b) {
                if (C.push(_.substring(D, T).replace(me, k)), Ye(T + 1 + z + te), B = _.indexOf(d, D), T = _.indexOf(k, D), j && (ve(), se)) return ne();
                if (L && U.length >= L) return ne(!0);
                break;
              }
              H.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: U.length, index: D }), T++;
            }
          }
          else if (E && C.length === 0 && _.substring(D, D + pe) === E) {
            if (N === -1) return ne();
            D = N + te, N = _.indexOf(b, D), B = _.indexOf(d, D);
          } else if (B !== -1 && (B < N || N === -1)) C.push(_.substring(D, B)), D = B + Q, B = _.indexOf(d, D);
          else {
            if (N === -1) break;
            if (C.push(_.substring(D, N)), Ye(N + te), j && (ve(), se)) return ne();
            if (L && U.length >= L) return ne(!0);
          }
          return we();
          function Ae(ee) {
            U.push(ee), K = D;
          }
          function Ve(ee) {
            var oe = 0;
            return oe = ee !== -1 && (ee = _.substring(T + 1, ee)) && ee.trim() === "" ? ee.length : oe;
          }
          function we(ee) {
            return I || (ee === void 0 && (ee = _.substring(D)), C.push(ee), D = Y, Ae(C), j && ve()), ne();
          }
          function Ye(ee) {
            D = ee, Ae(C), C = [], N = _.indexOf(b, D);
          }
          function ne(ee) {
            if (c.header && !P && U.length && !fe) {
              var oe = U[0], xe = /* @__PURE__ */ Object.create(null), Bt = new Set(oe);
              let Lr = !1;
              for (let Be = 0; Be < oe.length; Be++) {
                let Se = oe[Be];
                if (xe[Se = M(c.transformHeader) ? c.transformHeader(Se, Be) : Se]) {
                  let Ze, Rr = xe[Se];
                  for (; Ze = Se + "_" + Rr, Rr++, Bt.has(Ze); ) ;
                  Bt.add(Ze), oe[Be] = Ze, xe[Se]++, Lr = !0, (de = de === null ? {} : de)[Ze] = Se;
                } else xe[Se] = 1, oe[Be] = Se;
                Bt.add(Se);
              }
              Lr && console.warn("Duplicate headers found and renamed."), fe = !0;
            }
            return { data: U, errors: H, meta: { delimiter: d, linebreak: b, aborted: se, truncated: !!ee, cursor: K + (P || 0), renamedHeaders: de } };
          }
          function ve() {
            S(ne()), U = [], H = [];
          }
        }, this.abort = function() {
          se = !0;
        }, this.getCharIndex = function() {
          return D;
        };
      }
      function $(c) {
        var d = c.data, b = l[d.workerId], E = !1;
        if (d.error) b.userError(d.error, d.file);
        else if (d.results && d.results.data) {
          var S = { abort: function() {
            E = !0, ge(d.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: Ce, resume: Ce };
          if (M(b.userStep)) {
            for (var L = 0; L < d.results.data.length && (b.userStep({ data: d.results.data[L], errors: d.results.errors, meta: d.results.meta }, S), !E); L++) ;
            delete d.results;
          } else M(b.userChunk) && (b.userChunk(d.results, S, d.file), delete d.results);
        }
        d.finished && !E && ge(d.workerId, d.results);
      }
      function ge(c, d) {
        var b = l[c];
        M(b.userComplete) && b.userComplete(d), b.terminate(), delete l[c];
      }
      function Ce() {
        throw new Error("Not implemented.");
      }
      function he(c) {
        if (typeof c != "object" || c === null) return c;
        var d, b = Array.isArray(c) ? [] : {};
        for (d in c) b[d] = he(c[d]);
        return b;
      }
      function ie(c, d) {
        return function() {
          c.apply(d, arguments);
        };
      }
      function M(c) {
        return typeof c == "function";
      }
      return u.parse = function(c, d) {
        var b = (d = d || {}).dynamicTyping || !1;
        if (M(b) && (d.dynamicTypingFunction = b, b = {}), d.dynamicTyping = b, d.transform = !!M(d.transform) && d.transform, !d.worker || !u.WORKERS_SUPPORTED) return b = null, u.NODE_STREAM_INPUT, typeof c == "string" ? (c = ((E) => E.charCodeAt(0) !== 65279 ? E : E.slice(1))(c), b = new (d.download ? y : m)(d)) : c.readable === !0 && M(c.read) && M(c.on) ? b = new x(d) : (r.File && c instanceof File || c instanceof Object) && (b = new w(d)), b.stream(c);
        (b = (() => {
          var E;
          return !!u.WORKERS_SUPPORTED && (E = (() => {
            var S = r.URL || r.webkitURL || null, L = t.toString();
            return u.BLOB_URL || (u.BLOB_URL = S.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", L, ")();"], { type: "text/javascript" })));
          })(), (E = new r.Worker(E)).onmessage = $, E.id = p++, l[E.id] = E);
        })()).userStep = d.step, b.userChunk = d.chunk, b.userComplete = d.complete, b.userError = d.error, d.step = M(d.step), d.chunk = M(d.chunk), d.complete = M(d.complete), d.error = M(d.error), delete d.worker, b.postMessage({ input: c, config: d, workerId: b.id });
      }, u.unparse = function(c, d) {
        var b = !1, E = !0, S = ",", L = `\r
`, X = '"', de = X + X, fe = !1, k = null, J = !1, D = ((() => {
          if (typeof d == "object") {
            if (typeof d.delimiter != "string" || u.BAD_DELIMITERS.filter(function(P) {
              return d.delimiter.indexOf(P) !== -1;
            }).length || (S = d.delimiter), typeof d.quotes != "boolean" && typeof d.quotes != "function" && !Array.isArray(d.quotes) || (b = d.quotes), typeof d.skipEmptyLines != "boolean" && typeof d.skipEmptyLines != "string" || (fe = d.skipEmptyLines), typeof d.newline == "string" && (L = d.newline), typeof d.quoteChar == "string" && (X = d.quoteChar), typeof d.header == "boolean" && (E = d.header), Array.isArray(d.columns)) {
              if (d.columns.length === 0) throw new Error("Option columns is empty");
              k = d.columns;
            }
            d.escapeChar !== void 0 && (de = d.escapeChar + X), d.escapeFormulae instanceof RegExp ? J = d.escapeFormulae : typeof d.escapeFormulae == "boolean" && d.escapeFormulae && (J = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(G(X), "g"));
        if (typeof c == "string" && (c = JSON.parse(c)), Array.isArray(c)) {
          if (!c.length || Array.isArray(c[0])) return se(null, c, fe);
          if (typeof c[0] == "object") return se(k || Object.keys(c[0]), c, fe);
        } else if (typeof c == "object") return typeof c.data == "string" && (c.data = JSON.parse(c.data)), Array.isArray(c.data) && (c.fields || (c.fields = c.meta && c.meta.fields || k), c.fields || (c.fields = Array.isArray(c.data[0]) ? c.fields : typeof c.data[0] == "object" ? Object.keys(c.data[0]) : []), Array.isArray(c.data[0]) || typeof c.data[0] == "object" || (c.data = [c.data])), se(c.fields || [], c.data || [], fe);
        throw new Error("Unable to serialize unrecognized input");
        function se(P, I, Y) {
          var Q = "", te = (typeof P == "string" && (P = JSON.parse(P)), typeof I == "string" && (I = JSON.parse(I)), Array.isArray(P) && 0 < P.length), pe = !Array.isArray(I[0]);
          if (te && E) {
            for (var j = 0; j < P.length; j++) 0 < j && (Q += S), Q += _(P[j], j);
            0 < I.length && (Q += L);
          }
          for (var U = 0; U < I.length; U++) {
            var H = (te ? P : I[U]).length, C = !1, K = te ? Object.keys(I[U]).length === 0 : I[U].length === 0;
            if (Y && !te && (C = Y === "greedy" ? I[U].join("").trim() === "" : I[U].length === 1 && I[U][0].length === 0), Y === "greedy" && te) {
              for (var Z = [], V = 0; V < H; V++) {
                var B = pe ? P[V] : V;
                Z.push(I[U][B]);
              }
              C = Z.join("").trim() === "";
            }
            if (!C) {
              for (var N = 0; N < H; N++) {
                0 < N && !K && (Q += S);
                var me = te && pe ? P[N] : N;
                Q += _(I[U][me], N);
              }
              U < I.length - 1 && (!Y || 0 < H && !K) && (Q += L);
            }
          }
          return Q;
        }
        function _(P, I) {
          var Y, Q;
          return P == null ? "" : P.constructor === Date ? JSON.stringify(P).slice(1, 25) : (Q = !1, J && typeof P == "string" && J.test(P) && (P = "'" + P, Q = !0), Y = P.toString().replace(D, de), (Q = Q || b === !0 || typeof b == "function" && b(P, I) || Array.isArray(b) && b[I] || ((te, pe) => {
            for (var j = 0; j < pe.length; j++) if (-1 < te.indexOf(pe[j])) return !0;
            return !1;
          })(Y, u.BAD_DELIMITERS) || -1 < Y.indexOf(S) || Y.charAt(0) === " " || Y.charAt(Y.length - 1) === " ") ? X + Y + X : Y);
        }
      }, u.RECORD_SEP = "", u.UNIT_SEP = "", u.BYTE_ORDER_MARK = "\uFEFF", u.BAD_DELIMITERS = ["\r", `
`, '"', u.BYTE_ORDER_MARK], u.WORKERS_SUPPORTED = !a && !!r.Worker, u.NODE_STREAM_INPUT = 1, u.LocalChunkSize = 10485760, u.RemoteChunkSize = 5242880, u.DefaultDelimiter = ",", u.Parser = W, u.ParserHandle = v, u.NetworkStreamer = y, u.FileStreamer = w, u.StringStreamer = m, u.ReadableStreamStreamer = x, r.jQuery && ((n = r.jQuery).fn.parse = function(c) {
        var d = c.config || {}, b = [];
        return this.each(function(L) {
          if (!(n(this).prop("tagName").toUpperCase() === "INPUT" && n(this).attr("type").toLowerCase() === "file" && r.FileReader) || !this.files || this.files.length === 0) return !0;
          for (var X = 0; X < this.files.length; X++) b.push({ file: this.files[X], inputElem: this, instanceConfig: n.extend({}, d) });
        }), E(), this;
        function E() {
          if (b.length === 0) M(c.complete) && c.complete();
          else {
            var L, X, de, fe, k = b[0];
            if (M(c.before)) {
              var J = c.before(k.file, k.inputElem);
              if (typeof J == "object") {
                if (J.action === "abort") return L = "AbortError", X = k.file, de = k.inputElem, fe = J.reason, void (M(c.error) && c.error({ name: L }, X, de, fe));
                if (J.action === "skip") return void S();
                typeof J.config == "object" && (k.instanceConfig = n.extend(k.instanceConfig, J.config));
              } else if (J === "skip") return void S();
            }
            var D = k.instanceConfig.complete;
            k.instanceConfig.complete = function(se) {
              M(D) && D(se, k.file, k.inputElem), S();
            }, u.parse(k.file, k.instanceConfig);
          }
        }
        function S() {
          b.splice(0, 1), E();
        }
      }), i && (r.onmessage = function(c) {
        c = c.data, u.WORKER_ID === void 0 && c && (u.WORKER_ID = c.workerId), typeof c.input == "string" ? r.postMessage({ workerId: u.WORKER_ID, results: u.parse(c.input, c.config), finished: !0 }) : (r.File && c.input instanceof File || c.input instanceof Object) && (c = u.parse(c.input, c.config)) && r.postMessage({ workerId: u.WORKER_ID, results: c, finished: !0 });
      }), (y.prototype = Object.create(f.prototype)).constructor = y, (w.prototype = Object.create(f.prototype)).constructor = w, (m.prototype = Object.create(m.prototype)).constructor = m, (x.prototype = Object.create(f.prototype)).constructor = x, u;
    });
  })(gt)), gt.exports;
}
var Va = Ma();
const Ba = /* @__PURE__ */ Na(Va);
var bs = Object.defineProperty, $a = Object.defineProperties, za = Object.getOwnPropertyDescriptors, Pr = Object.getOwnPropertySymbols, qa = Object.prototype.hasOwnProperty, Wa = Object.prototype.propertyIsEnumerable, qe = (s, e) => (e = Symbol[s]) ? e : Symbol.for("Symbol." + s), Ja = (s) => {
  throw TypeError(s);
}, jr = (s, e, t) => e in s ? bs(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Ne = (s, e) => {
  for (var t in e || (e = {}))
    qa.call(e, t) && jr(s, t, e[t]);
  if (Pr)
    for (var t of Pr(e))
      Wa.call(e, t) && jr(s, t, e[t]);
  return s;
}, Ha = (s, e) => $a(s, za(e)), o = (s, e) => bs(s, "name", { value: e, configurable: !0 }), ye = (s, e, t) => new Promise((r, n) => {
  var a = (p) => {
    try {
      l(t.next(p));
    } catch (u) {
      n(u);
    }
  }, i = (p) => {
    try {
      l(t.throw(p));
    } catch (u) {
      n(u);
    }
  }, l = (p) => p.done ? r(p.value) : Promise.resolve(p.value).then(a, i);
  l((t = t.apply(s, e)).next());
}), We = function(s, e) {
  this[0] = s, this[1] = e;
}, ws = (s, e, t) => {
  var r = (i, l, p, u) => {
    try {
      var f = t[i](l), y = (l = f.value) instanceof We, w = f.done;
      Promise.resolve(y ? l[0] : l).then((m) => y ? r(i === "return" ? i : "next", l[1] ? { done: m.done, value: m.value } : m, p, u) : p({ value: m, done: w })).catch((m) => r("throw", m, p, u));
    } catch (m) {
      u(m);
    }
  }, n = (i) => a[i] = (l) => new Promise((p, u) => r(i, l, p, u)), a = {};
  return t = t.apply(s, e), a[qe("asyncIterator")] = () => a, n("next"), n("throw"), n("return"), a;
}, vs = (s) => {
  var e = s[qe("asyncIterator")], t = !1, r, n = {};
  return e == null ? (e = s[qe("iterator")](), r = (a) => n[a] = (i) => e[a](i)) : (e = e.call(s), r = (a) => n[a] = (i) => {
    if (t) {
      if (t = !1, a === "throw") throw i;
      return i;
    }
    return t = !0, {
      done: !1,
      value: new We(new Promise((l) => {
        var p = e[a](i);
        p instanceof Object || Ja("Object expected"), l(p);
      }), 1)
    };
  }), n[qe("iterator")] = () => n, r("next"), "throw" in e ? r("throw") : n.throw = (a) => {
    throw a;
  }, "return" in e && r("return"), n;
}, Ka = (s, e, t) => (e = s[qe("asyncIterator")]) ? e.call(s) : (s = s[qe("iterator")](), e = {}, t = (r, n) => (n = s[r]) && (e[r] = (a) => new Promise((i, l, p) => (a = n.call(s, a), p = a.done, Promise.resolve(a.value).then((u) => i({ value: u, done: p }), l)))), t("next"), t("return"), e);
const Ue = Symbol("word"), Ga = Symbol("char"), ut = Symbol("ltr"), Rt = Symbol("rtl"), Ss = Symbol("undefined"), Qa = Symbol("latin"), Xa = Symbol("greek"), Ya = Symbol("arabic"), Za = Symbol("persian"), Es = Symbol("ge'ez"), Is = Symbol("chinese"), Os = Symbol("syriac"), xs = "undefined", Gt = "lat", Ds = "la", Qt = "grc", Xt = "ara", Cs = "ar", ei = "fas", Yt = "per", ti = "fa-IR", ri = "fa", Zt = "gez", er = "zho", si = "zh", ni = "zh-Hant", ai = "zh-Hans", As = "syc", tr = "syr", _s = "syr-Syrj", Et = "adjective", Je = "adverb", Ts = "adverbial", gr = "article", Fs = "conjunction", He = "exclamation", Ke = "interjection", It = "noun", Nr = "proper noun", mr = "numeral", Ot = "particle", Ls = "prefix", Rs = "preposition", at = "pronoun", ks = "suffix", ii = "gerundive", yr = "supine", it = "verb", br = "verb participle", oi = "denominative", ui = "masculine", li = "feminine", ci = "neuter", hi = "ablative", Ps = "accusative", js = "dative", Ns = "genitive", di = "locative", Us = "nominative", Ms = "vocative", Ur = "gerundive", Vs = "imperative", Bs = "indicative", fi = "infinitive", pi = "optative", $t = "participle", $s = "subjunctive", gi = "supine", wr = "singular", vr = "plural", mi = "dual", xt = "1st", Dt = "2nd", Ct = "3rd", Mr = "4th", yi = "5th", bi = "aorist", zs = "future", qs = "future perfect", Ws = "imperfect", Js = "perfect", Hs = "pluperfect", Ks = "present", Gs = "active", Qs = "passive", wi = "mediopassive", vi = "middle", Si = "irregular", Ei = "regular", Xs = "personal", Ys = "reflexive", Zs = "possessive", en = "demonstrative", tn = "relative", rn = "interrogative", Ii = "general relative", Oi = "indefinite", xi = "intensive", Di = "reciprocal", re = [];
for (let s = 0; s < 256; ++s)
  re.push((s + 256).toString(16).slice(1));
function sn(s, e = 0) {
  return (re[s[e + 0]] + re[s[e + 1]] + re[s[e + 2]] + re[s[e + 3]] + "-" + re[s[e + 4]] + re[s[e + 5]] + "-" + re[s[e + 6]] + re[s[e + 7]] + "-" + re[s[e + 8]] + re[s[e + 9]] + "-" + re[s[e + 10]] + re[s[e + 11]] + re[s[e + 12]] + re[s[e + 13]] + re[s[e + 14]] + re[s[e + 15]]).toLowerCase();
}
o(sn, "unsafeStringify");
let zt;
const Ci = new Uint8Array(16);
function nn() {
  if (!zt) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    zt = crypto.getRandomValues.bind(crypto);
  }
  return zt(Ci);
}
o(nn, "rng");
const Ai = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Vr = { randomUUID: Ai };
function lt(s, e, t) {
  var r, n, a;
  if (Vr.randomUUID && !s)
    return Vr.randomUUID();
  s = s || {};
  const i = (a = (n = s.random) != null ? n : (r = s.rng) == null ? void 0 : r.call(s)) != null ? a : nn();
  if (i.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, sn(i);
}
o(lt, "v4");
const an = class on {
  /**
   * @param {string} uri - a unique resource identifier for this provider
   * @param {string} rights - rights text
   * @param {Map} rightsTranslations - optional map of translated rights text - keys should be language of text, values the text
   */
  constructor(e = "", t = "", r = /* @__PURE__ */ new Map([["default", t]])) {
    this.uri = e, this.rights = r, this.rights.has("default") || this.rights.set("default", t);
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
      get: /* @__PURE__ */ o(function(r, n) {
        return n === "provider" ? e : r[n];
      }, "get")
    });
  }
  convertToJSONObject() {
    let e = {};
    for (const [t, r] of this.rights.entries())
      e[t] = r;
    return {
      uri: this.uri,
      rights: e
    };
  }
  static readObject(e) {
    const t = /* @__PURE__ */ new Map();
    return e.rights && Object.keys(e.rights).forEach((r) => {
      t.set(r, e.rights[r]);
    }), new on(e.uri, "", t);
  }
};
o(an, "ResourceProvider");
let De = an;
const un = class ln {
  constructor(e, t, r, n) {
    this.text = e, this.language = t, this.format = r, this.lemmaText = n, this.ID = lt();
  }
  static readObject(e) {
    let t = new ln(e.text, e.language, e.format, e.lemmaText);
    if (e.ID && (t.ID = e.ID), e.provider) {
      const r = De.readObject(e.provider);
      return De.getProxy(r, t);
    } else
      return t;
  }
  convertToJSONObject() {
    let e = {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    };
    return this.provider && (e.provider = this.provider.convertToJSONObject()), e;
  }
};
o(un, "Definition");
let Br = un;
const cn = class {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @returns {FeatureImporter}
   */
  constructor(e = [], t = !1) {
    this.hash = {};
    for (const r of e)
      this.map(r, r);
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
};
o(cn, "FeatureImporter");
let hn = cn, $e;
const dn = class fn {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor({ verbose: e = !1, prepend: t = !0, trace: r = !1 } = {}) {
    this._verboseMode = e, this._prependMode = t, this._traceMode = r;
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
    return $e ? (typeof e.verbose < "u" && (console.info("Setting a verbose mode"), $e.setVerboseMode(e.verbose)), typeof e.prepend < "u" && (console.info("Setting a prepend mode"), $e.setVerboseMode(e.prepend)), typeof e.trace < "u" && (console.info("Setting a trace mode"), $e.setTraceMode(e.trace))) : $e = new fn(e), $e;
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
};
o(dn, "Logger");
let F = dn;
const pn = class Ie {
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
  constructor(e, t, r, n = 1, a = []) {
    if (!Ie.isAllowedType(e))
      throw new Error('Features of "' + e + '" type are not supported.');
    if (!t)
      throw new Error("Feature should have a non-empty value(s).");
    if (!r)
      throw new Error("No language ID is provided");
    this.type = e, this.languageID = r, this.sortOrder = n, this.allowedValues = a, this._data = Ie.dataValuesFromInput(t), this.sort();
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
    return Array.isArray(e) ? Array.isArray(e[0]) ? t = e : t = e.map((r, n) => [r, e.length - n]) : t = [[e, this.defaultSortOrder]], t.map((r) => ({ value: r[0], sortOrder: Number.parseInt(r[1]) }));
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
      if (this._data.length > 1) throw new Error(Ie.errMsgs.NO_SINGLE_VALUE);
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
    for (const r of e)
      t = t && this.hasValue(r);
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
    for (const r of e)
      t = t || this.hasValue(r);
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
    return e && this.type === e.type && R.compareLanguages(this.languageID, e.languageID) && this.value === e.value;
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
    return this.hasValue(e) ? F.getInstance().warn(`Value "${e}" already exists. If you want to change it, use "getValue" to access it directly.`) : (this._data.push({
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
    const t = this.constructor.dataValuesFromInput(e), r = t.map((n) => n.value);
    return this.hasSomeValues(r) ? F.getInstance().warn(`One or several values from "${r}" already exist. If you want to change it, use "getValue" to access a value directly.`) : (this._data = this._data.concat(t), this.sort()), this;
  }
  /**
   * Removes a single value from the existing feature object.
   *
   * @param value
   */
  removeValue(e) {
    F.getInstance().warn("This feature is not implemented yet");
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
    return new Ie(this.type, [[e, t]], this.languageID, this.sortOrder, this.allowedValues);
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
    return new Ie(this.type, e, this.languageID, this.sortOrder, this.allowedValues);
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
    return this.values.map((e) => new Ie(this.type, e, this.languageID, 1, this.allowedValues));
  }
  /**
   * Create a copy of the feature object.
   */
  getCopy() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return new Ie(this.type, e, this.languageID, this.sortOrder, this.allowedValues.slice());
  }
  /**
   * Adds an importer to the internal list.
   *
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter(e = new hn(), t = this.constructor.defaultImporterName) {
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
    const r = this.importers.get(t);
    return e = this.constructor.dataValuesFromInput(e), this._data.push(...e.map((n) => ({ value: r.get(n.value), sortOrder: n.sortOrder }))), this.sort(), this;
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
    const r = this.importers.get(t);
    Array.isArray(e) || (e = [e]);
    let n = e.map((a) => r.get(a));
    return n = n.reduce((a, i) => a.concat(i), []), new Ie(this.type, n, this.languageID, this.sortOrder, this.allowedValues);
  }
  convertToJSONObject() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return {
      type: this.type,
      languageCode: R.getLanguageCodeFromId(this.languageID),
      sortOrder: this.sortOrder,
      allowedValues: this.allowedValues,
      data: e
    };
  }
  static readObject(e) {
    const t = R.getLanguageIdFromCode(e.languageCode);
    return new Ie(e.type, e.data, t, e.sortOrder, e.allowedValues);
  }
};
o(pn, "Feature");
let h = pn;
h.errMsgs = {
  NO_SINGLE_VALUE: "More than one value stored"
};
const gn = class mn {
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
  constructor(e, t, r) {
    if (!t || !Array.isArray(t))
      throw new Error("Values should be an array (or an empty array) of values.");
    if (!r)
      throw new Error("FeatureType constructor requires a language");
    this.type = e, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = R.getLanguageAttrs(r), this._orderIndex = [], this._orderLookup = {};
    for (const [n, a] of t.entries())
      if (this._orderIndex.push(a), Array.isArray(a))
        for (const i of a)
          this[i] = new h(this.type, i, this.languageID), this._orderLookup[i] = n;
      else
        this[a] = new h(this.type, a, this.languageID), this._orderLookup[a] = n;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return F.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  /**
   * test to see if this FeatureType allows unrestricted values
   *
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue() {
    return this.orderedValues.length === 1 && this.orderedValues[0] === mn.UNRESTRICTED_VALUE;
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
      return new h(this.type, [[e, t]], this.languageID);
    throw new Error("A non-empty value should be provided.");
  }
  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues(e) {
    return new h(this.type, e, this.languageID);
  }
  getFromImporter(e, t) {
    let r;
    try {
      r = this.importer[e].get(t);
    } catch {
      r = this.get(t);
    }
    return r;
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
    return this.importer = this.importer || {}, this.importer[e] = this.importer[e] || new hn(), this.importer[e];
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
    return this.orderedValues.map((e) => new h(this.type, e, this.languageID));
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
        for (const r of t) {
          if (!this.hasOwnProperty(r.value))
            throw new Error('Trying to order an element with "' + r.value + '" value that is not stored in a "' + this.type + '" type.');
          if (r.type !== this.type)
            throw new Error('Trying to order an element with type "' + r.type + '" that is different from "' + this.type + '".');
          if (!R.compareLanguages(r.languageID, this.languageID))
            throw new Error(`Trying to order an element with language "${r.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
        }
      else {
        if (!this.hasOwnProperty(t.value))
          throw new Error('Trying to order an element with "' + t.value + '" value that is not stored in a "' + this.type + '" type.');
        if (t.type !== this.type)
          throw new Error('Trying to order an element with type "' + t.type + '" that is different from "' + this.type + '".');
        if (!R.compareLanguages(t.languageID, this.languageID))
          throw new Error(`Trying to order an element with language "${t.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
      }
    this._orderLookup = {}, this._orderIndex = [];
    for (const [t, r] of e.entries())
      if (Array.isArray(r)) {
        let n = [];
        for (const a of r)
          this._orderLookup[a.value] = t, n.push(a.value);
        this._orderIndex[t] = n;
      } else
        this._orderLookup[r.value] = t, this._orderIndex[t] = r.value;
  }
};
o(gn, "FeatureType");
let yn = gn;
yn.UNRESTRICTED_VALUE = Symbol("unrestricted");
const bn = class {
  /**
   * @class
   * @param {Inflection} infl inflection with features which are used as a grouping key
   * @param {string[]} features array of feature names which are used as the key
   * @param {object} extras extra property name and value pairs used in the key
   */
  constructor(e, t, r = {}) {
    for (const n of t)
      this[n] = e[n];
    Object.assign(this, r);
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
      const r = this[t] instanceof h ? this[t].values.sort().join(",") : this[t];
      e.push(r);
    }
    return e.join(" ");
  }
};
o(bn, "InflectionGroupingKey");
let Te = bn;
const wn = class {
  /**
   * A group of inflections or groups of inflections
   *
   * @param {InflectionGroupingKey} groupingKey features of the inflections in the group
   * @param {Inflection[]|InflectionGroup[]} inflections array of Inflections or InflectionGroups in this group
   * @param sortKey
   */
  constructor(e, t = [], r = null) {
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
};
o(wn, "InflectionGroup");
let Fe = wn;
const vn = class rr {
  constructor() {
    this.context_backward = rr.contextBackward;
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ut;
  }
  static get baseUnit() {
    return Ue;
  }
  /**
   * @deprecated
   */
  get contextForward() {
    return F.getInstance().warn('Please use static "contextForward" instead'), this.constructor.contextForward;
  }
  /**
   * @deprecated
   */
  get contextBackward() {
    return F.getInstance().warn('Please use static "contextBackward" instead'), this.constructor.contextBackward;
  }
  /**
   * @deprecated
   */
  get direction() {
    return F.getInstance().warn('Please use static "direction" instead'), this.constructor.direction;
  }
  /**
   * @deprecated
   */
  get baseUnit() {
    return F.getInstance().warn('Please use static "baseUnit" instead'), this.constructor.baseUnit;
  }
  /**
   * @deprecated
   */
  get features() {
    return F.getInstance().warn('Please use individual "getFeatureType" or static "features" instead'), this.constructor.features;
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
    F.getInstance().warn("This getter must be defined in a descendant class");
  }
  static get features() {
    let e = {};
    for (const t of this.featureNames)
      e[t] = this.getFeature(t);
    return e;
  }
  static get languageID() {
    return Ss;
  }
  static get languageCode() {
    return xs;
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
    return F.getInstance().warn('Use static "languageCodes" instead'), this.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes() {
    return F.getInstance().warn('Please use a static version of "codes" instead'), this.constructor.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  toCode() {
    return F.getInstance().warn('Please use a static "languageCode" instead'), this.constructor.languageCode;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  static toCode() {
    return F.getInstance().warn('Please use a static "languageCode" instead'), this.languageCode;
  }
  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        h.types.part,
        [
          Je,
          Ts,
          Et,
          gr,
          Fs,
          He,
          Ke,
          It,
          mr,
          Ot,
          Ls,
          Rs,
          at,
          ks,
          yr,
          it,
          br
        ]
      ],
      [
        h.types.gender,
        [
          ui,
          li,
          ci
        ]
      ],
      [
        h.types.type,
        [
          Ei,
          Si
        ]
      ],
      [
        h.types.person,
        [
          xt,
          Dt,
          Ct
        ]
      ],
      [
        h.types.number,
        [
          wr,
          vr
        ]
      ],
      [
        h.types.age,
        []
      ],
      [
        h.types.area,
        []
      ],
      [
        h.types.source,
        []
      ],
      [
        h.types.frequency,
        []
      ],
      [
        h.types.geo,
        []
      ],
      [
        h.types.pronunciation,
        []
      ],
      [
        h.types.kind,
        []
      ],
      [
        h.types.comparison,
        []
      ],
      [
        h.types.morph,
        []
      ],
      [
        h.types.stemtype,
        []
      ],
      [
        h.types.derivtype,
        []
      ]
    ]);
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage() {
    return F.getInstance().warn("Please use languageID directly"), this.languageID;
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage() {
    return F.getInstance().warn("Please use languageID directly"), this.constructor.languageID;
  }
  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType(e) {
    F.getInstance().warn("Please use getFeature instead");
    const t = this.featureValues;
    if (t.has(e))
      return new yn(e, t.get(e), this.languageID);
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
      const r = t.get(e);
      return new h(e, r, this.languageID, 1, r);
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
    return F.getInstance().warn('Please use a static version of "grammarFeatures" instead'), this.constructor.grammarFeatures();
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
    return e.lemma.features[h.types.part] ? e.lemma.features[h.types.part].value : null;
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
    following: r = null,
    encoding: n = null,
    preserveCase: a = !1,
    includeOriginal: i = !1
  } = {}) {
    return i ? [e] : [];
  }
  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords(e, t, r = !0, n = {}) {
    return r ? (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t), this.normalizeText(e) === this.normalizeText(t)) : e === t;
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
  static compareFeatureValue(e, t, r, { normalize: n = !0 } = {}) {
    return n && (t = this.normalizeFeatureValue(e, t), r = this.normalizeFeatureValue(e, r)), t === r;
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
    return F.getInstance().warn('Please use a static version of "getPunctuation"'), this.constructor.getPunctuation();
  }
  toString() {
    return String(this.constructor.languageCode);
  }
  isEqual(e) {
    return R.compareLanguages(this.languageID, e.languageID);
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
    return !rr.isLanguageID(e);
  }
  /**
   * @deprecated
   * @param node
   */
  canInflect(e) {
    return F.getInstance().warn('Please use a static version of "canInflect" instead'), this.constructor.canInflect(e);
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
    const r = this.aggregateInflectionsForDisplay(e);
    for (const n of r) {
      const a = new Te(
        n,
        [h.types.part, h.types.declension, h.types.dialect, h.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i = a.toString();
      t.has(i) ? t.get(i).append(n) : t.set(i, new Fe(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i of n[1].inflections) {
        let l, p = !1;
        i[h.types.grmCase] ? (l = h.types.number, p = !0) : i[h.types.tense] ? l = h.types.tense : i[h.types.part] === it || i[h.types.part] === Je ? l = h.types.part : l = "misc";
        const u = new Te(i, [l], { isCaseInflectionSet: p }), f = u.toString();
        a.has(f) ? a.get(f).append(i) : a.set(f, new Fe(u, [i]));
      }
      for (const i of a) {
        const l = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
        for (const f of i[1].inflections) {
          const y = f[h.types.grmCase] ? Math.max(f[h.types.grmCase].items.map((x) => x.sortOrder)) : 1, w = new Te(f, [h.types.tense, h.types.voice]), m = w.toString();
          l.has(m) ? l.get(m).append(f) : (l.set(m, new Fe(w, [f], y)), p.set(m, y));
        }
        i[1].inflections = [];
        const u = Array.from(l.keys()).sort(
          (f, y) => {
            const w = p.get(f), m = p.get(y);
            return w > m ? -1 : m > w ? 1 : 0;
          }
        );
        for (const f of u)
          i[1].inflections.push(l.get(f));
      }
      for (const i of a) {
        const l = i[1];
        for (const p of l.inflections) {
          let u = /* @__PURE__ */ new Map();
          for (const f of p.inflections) {
            const y = new Te(
              f,
              [
                h.types.grmCase,
                h.types.comparison,
                h.types.gender,
                h.types.number,
                h.types.person,
                h.types.tense,
                h.types.mood,
                h.types.voice
              ]
            ), w = y.toString();
            u.has(w) ? u.get(w).append(f) : u.set(w, new Fe(y, [f]));
          }
          p.inflections = Array.from(u.values());
        }
      }
      n[1].inflections = Array.from(a.values());
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
    return F.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead'), this.constructor.groupInflectionsForDisplay(e);
  }
};
o(vn, "LanguageModel");
let ce = vn, $r = /* @__PURE__ */ new Map(), zr = !1;
const Sn = class extends ce {
  static get languageID() {
    return Qa;
  }
  static get languageCode() {
    return Gt;
  }
  static get languageCodes() {
    return [Ds, Gt];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ut;
  }
  static get baseUnit() {
    return Ue;
  }
  static get featureValues() {
    return new Map([
      ...ce.featureValues,
      [
        h.types.grmClass,
        [
          Xs,
          Ys,
          Zs,
          en,
          tn,
          rn
        ]
      ],
      [
        h.types.number,
        [
          wr,
          vr
        ]
      ],
      [
        h.types.grmCase,
        [
          Us,
          Ns,
          js,
          Ps,
          hi,
          di,
          Ms
        ]
      ],
      [
        h.types.declension,
        [
          xt,
          Dt,
          Ct,
          Mr,
          yi
        ]
      ],
      [
        h.types.tense,
        [
          Ks,
          Ws,
          zs,
          Js,
          Hs,
          qs
        ]
      ],
      [
        h.types.voice,
        [
          Gs,
          Qs
        ]
      ],
      [
        h.types.mood,
        [
          Bs,
          $s,
          Vs,
          $t,
          gi,
          Ur,
          $t,
          fi
        ]
      ],
      [
        h.types.conjugation,
        [
          xt,
          Dt,
          Ct,
          Mr
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return zr || this.initTypeFeatures(), $r;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      $r.set(e, this.getFeature(e));
    zr = !0;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [h.types.part, h.types.grmCase, h.types.mood, h.types.declension, h.types.tense, h.types.conjugation];
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
    return e === h.types.mood && t === Ur ? $t : e === h.types.part && t === He ? Ke : t;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[h.types.part] ? e.lemma.features[h.types.part].value === He ? Ke : e.lemma.features[h.types.part].value : null;
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
    return e.hasOwnProperty(h.types.part) ? [it, br, yr, ii].includes(e[h.types.part].value) ? (t.fullFormBased = !0, t.suffixBased = !0) : e[h.types.part].value === at ? t.fullFormBased = !0 : t.suffixBased = !0 : F.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[h.types.part]), t;
  }
};
o(Sn, "LatinLanguageModel");
let qr = Sn;
const En = class {
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
};
o(En, "GreekChars");
let _i = En, Wr = /* @__PURE__ */ new Map(), Jr = !1;
const In = class Oe extends ce {
  static get languageID() {
    return Xa;
  }
  static get languageCode() {
    return Qt;
  }
  static get languageCodes() {
    return [Qt];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ut;
  }
  static get baseUnit() {
    return Ue;
  }
  static get featureValues() {
    return new Map([
      ...ce.featureValues,
      [
        h.types.grmClass,
        [
          en,
          Ii,
          Oi,
          xi,
          rn,
          Xs,
          Zs,
          Di,
          Ys,
          tn
        ]
      ],
      [
        h.types.number,
        [
          wr,
          vr,
          mi
        ]
      ],
      [
        h.types.grmCase,
        [
          Us,
          Ns,
          js,
          Ps,
          Ms
        ]
      ],
      [
        h.types.declension,
        [
          xt,
          Dt,
          Ct
        ]
      ],
      [
        h.types.tense,
        [
          Ks,
          Ws,
          zs,
          Js,
          Hs,
          qs,
          bi
        ]
      ],
      [
        h.types.voice,
        [
          Qs,
          Gs,
          wi,
          vi
        ]
      ],
      [
        h.types.mood,
        [
          Bs,
          $s,
          pi,
          Vs
        ]
      ],
      [
        // TODO full list of greek dialects
        h.types.dialect,
        [
          "attic",
          "epic",
          "doric"
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return Jr || this.initTypeFeatures(), Wr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Wr.set(e, this.getFeature(e));
    Jr = !0;
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
    return [h.types.part, h.types.grmCase, h.types.mood, h.types.declension, h.types.tense, h.types.voice];
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
    return e.lemma.features[h.types.part] ? e.lemma.features[h.types.part].value === Ot ? Je : e.lemma.features[h.types.part].value === He ? Ke : e.lemma.features[h.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return e === h.types.part && t === Ot ? Je : e === h.types.part && t === He ? Ke : t;
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
    following: r = null,
    encoding: n = null,
    preserveCase: a = !1,
    includeOriginal: i = !1
  } = {}) {
    if (!e)
      return [];
    let l = Oe.normalizeText(e);
    a || (l = l.toLocaleLowerCase());
    const p = l.replace(
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
    ), u = Oe._tonosToOxia(l), f = l.replace(
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
    ), y = l.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug,
      ""
    ).normalize("NFC");
    let w = [];
    return n === "strippedDiaeresis" ? w.push(f) : n === "strippedDiacritics" ? w.push(y) : n === "strippedAll" ? w.push(f.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug,
      ""
    ).normalize("NFC")) : (w.push(p), u !== p && w.push(u)), i || (w = w.filter((m) => m !== e)), w;
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
    }, r = [at, mr, gr];
    return e.hasOwnProperty(h.types.part) ? r.includes(e[h.types.part].value) ? t.fullFormBased = !0 : t.suffixBased = !0 : F.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[h.types.part]), t.pronounClassRequired = R.compareLanguages(Oe.languageID, e.languageID) && e.hasOwnProperty(h.types.part) && // eslint-disable-line no-prototype-builtins
    e[h.types.part].value === at, t;
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
  static getPronounClasses(e, t, r, n = !0) {
    let a = /* @__PURE__ */ new Set();
    const i = e.filter(
      (l) => {
        let p = !1;
        return l.value && (!l.features[h.types.hdwd] || l.features[h.types.hdwd].value === r) && (p = Oe.compareWords(l.value, t, n)), p;
      }
    );
    for (const l of i)
      if (l.features.hasOwnProperty(h.types.grmClass))
        for (const p of l.features[h.types.grmClass].values)
          a.add(p);
    if (a.size > 0)
      return new h(h.types.grmClass, Array.from(a), Oe.languageID);
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
  static compareWords(e, t, r = !0, { normalizeTrailingDigit: n = !1 } = {}) {
    let a = !1;
    if (r) {
      n && (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t));
      const i = Oe.alternateWordEncodings({
        word: e,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      }), l = Oe.alternateWordEncodings({
        word: t,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      });
      for (let p = 0; p < i.length && (a = i[p] === l[p], !a); p++)
        ;
      a || (a = Oe.normalizeText(e) === Oe.normalizeText(t));
    } else
      a = e === t;
    return a;
  }
  static isValidUnicode(e) {
    return _i.chars.some((t) => e.includes(t));
  }
};
o(In, "GreekLanguageModel");
let Ti = In;
const Hr = /* @__PURE__ */ new Map();
let Kr = !1;
const On = class extends ce {
  static get languageID() {
    return Ya;
  }
  static get languageCode() {
    return Xt;
  }
  static get languageCodes() {
    return [Xt, Cs];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Rt;
  }
  static get baseUnit() {
    return Ue;
  }
  static get typeFeatures() {
    return Kr || this.initTypeFeatures(), Hr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Hr.set(e, this.getFeature(e));
    Kr = !0;
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
    following: r = null,
    encoding: n = null,
    preserveCase: a = !1,
    includeOriginal: i = !1
  } = {}) {
    const l = e.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, ""), p = l.replace(/[\u{0622}\u{0623}\u{0625}]/ug, "ا"), u = p.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, ""), f = u.replace(/\u{0651}/ug, ""), y = f.replace(/\u{0652}/ug, ""), w = y.replace(/\u{0627}/ug, ""), m = /* @__PURE__ */ new Map([
      ["tanwin", l],
      ["hamza", p],
      ["harakat", u],
      ["shadda", f],
      ["sukun", y],
      ["alef", w]
    ]);
    let x = [];
    return n !== null && m.has(n) ? x = [m.get(n)] : x = Array.from(m.values()), i || (x = x.filter((v) => v !== e)), x;
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
    let t = [], r = { [It]: [], [Et]: [], [Nr]: [] };
    for (const n of e)
      n[h.types.morph] && n[h.types.morph].value.match(/ADJ[uaiNK]/) ? r[Et].push(n) : n[h.types.morph] && n[h.types.morph].value.match(/NOUN[uaiNK]/) ? r[It].push(n) : n[h.types.morph] && n[h.types.morph].value.match(/NOUN_PROP[uaiNK]/) ? r[Nr].push(n) : (n.example = null, t.push(n));
    for (const n of Object.keys(r))
      t.filter((a) => a[h.types.part].value === n).length !== 1 && t.push(...r[n]);
    return t;
  }
};
o(On, "ArabicLanguageModel");
let Gr = On, Qr = /* @__PURE__ */ new Map(), Xr = !1;
const xn = class extends ce {
  static get languageID() {
    return Za;
  }
  static get languageCode() {
    return Yt;
  }
  static get languageCodes() {
    return [Yt, ei, ri, ti];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Rt;
  }
  static get baseUnit() {
    return Ue;
  }
  static get typeFeatures() {
    return Xr || this.initTypeFeatures(), Qr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Qr.set(e, this.getFeature(e));
    Xr = !0;
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
};
o(xn, "PersianLanguageModel");
let Fi = xn;
const Yr = /* @__PURE__ */ new Map();
let Zr = !1;
const Dn = class extends ce {
  static get languageID() {
    return Es;
  }
  static get languageCode() {
    return Zt;
  }
  static get languageCodes() {
    return [Zt];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ut;
  }
  static get baseUnit() {
    return Ue;
  }
  static get featureValues() {
    return new Map([
      ...ce.featureValues,
      [
        h.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        h.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        h.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        h.types.mood,
        [
          // TODO Valid Values for mood for gez
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return Zr || this.initTypeFeatures(), Yr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Yr.set(e, this.getFeature(e));
    Zr = !0;
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
};
o(Dn, "GeezLanguageModel");
let Li = Dn, es = /* @__PURE__ */ new Map(), ts = !1;
const Cn = class extends ce {
  static get languageID() {
    return Is;
  }
  static get languageCode() {
    return er;
  }
  static get languageCodes() {
    return [
      si,
      er,
      ni,
      ai
    ];
  }
  static get contextForward() {
    return 5;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ut;
  }
  static get baseUnit() {
    return Ga;
  }
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        h.types.fullForm,
        []
      ],
      [
        h.types.frequency,
        []
      ],
      [
        h.types.pronunciation,
        []
      ],
      [
        h.types.radical,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return ts || this.initTypeFeatures(), es;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      es.set(e, this.getFeature(e));
    ts = !0;
  }
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\
\r，、。「」《》‌‍†‡`;
  }
  static _isVowel(e) {
    return ["a", "e", "i", "o", "u"].includes(e);
  }
  static formatPinyin(e) {
    const t = ["ā", "á", "ǎ", "à", "a"], r = ["ē", "é", "ě", "è", "e"], n = ["ī", "í", "ǐ", "ì", "i"], a = ["ō", "ó", "ǒ", "ò", "o"], i = ["ū", "ú", "ǔ", "ù", "u"], l = ["ǖ", "ǘ", "ǚ", "ǜ", "ü"];
    e = e.split(/(\d)/).map((f) => f.trim()).filter((f) => !!f);
    let p = [];
    const u = {
      1: 0,
      2: 1,
      3: 2,
      4: 3
    };
    for (let f = 0; f < e.length; f++)
      if (f % 2 === 0) {
        let y = e[f];
        const w = u[e[f + 1]] !== void 0 ? u[e[f + 1]] : 4;
        if (y.indexOf("a") !== -1)
          y = y.replace("a", t[w]);
        else if (y.indexOf("e") !== -1)
          y = y.replace("e", r[w]);
        else if (y.indexOf("ou") !== -1)
          y = y.replace("o", a[w]);
        else
          for (let m = y.length - 1; m >= 0; m--)
            if (this._isVowel(y[m])) {
              switch (y[m]) {
                case "i":
                  y = y.replace("i", n[w]);
                  break;
                case "o":
                  y = y.replace("o", a[w]);
                  break;
                case "u":
                  m + 1 < y.length - 1 && y[m + 1] === ":" ? y = y.replace("u:", l[w]) : y = y.replace("u", i[w]);
                  break;
                default:
                  F.getInstance().warn("some kind of weird vowel", y[m]);
              }
              break;
            }
        p.push(y);
      }
    return p.join(" ").trim();
  }
};
o(Cn, "ChineseLanguageModel");
let Ri = Cn;
const rs = /* @__PURE__ */ new Map();
let ss = !1;
const An = class extends ce {
  static get languageID() {
    return Os;
  }
  static get languageCode() {
    return tr;
  }
  static get languageCodes() {
    return [tr, As, _s];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Rt;
  }
  static get baseUnit() {
    return Ue;
  }
  static get featureValues() {
    return new Map([
      ...ce.featureValues,
      [
        h.types.part,
        [
          Je,
          Ts,
          Et,
          gr,
          Fs,
          He,
          Ke,
          It,
          mr,
          Ot,
          Ls,
          Rs,
          at,
          ks,
          yr,
          it,
          br,
          oi
        ]
      ],
      [
        h.types.kaylo,
        []
      ],
      [
        h.types.state,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return ss || this.initTypeFeatures(), rs;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      rs.set(e, this.getFeature(e));
    ss = !0;
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
    const t = /* @__PURE__ */ new Map(), r = this.aggregateInflectionsForDisplay(e);
    for (const n of r) {
      const a = new Te(
        n,
        [h.types.part, h.types.declension, h.types.kaylo, h.types.state, h.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i = a.toString();
      t.has(i) ? t.get(i).append(n) : t.set(i, new Fe(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i of n[1].inflections) {
        let l, p = !1;
        i[h.types.grmCase] ? (l = h.types.number, p = !0) : i[h.types.tense] ? l = h.types.tense : i[h.types.part] === it || i[h.types.part] === Je ? l = h.types.part : l = "misc";
        const u = new Te(i, [l], { isCaseInflectionSet: p }), f = u.toString();
        a.has(f) ? a.get(f).append(i) : a.set(f, new Fe(u, [i]));
      }
      for (const i of a) {
        const l = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
        for (const f of i[1].inflections) {
          const y = f[h.types.grmCase] ? Math.max(f[h.types.grmCase].items.map((x) => x.sortOrder)) : 1, w = new Te(f, [h.types.tense, h.types.voice]), m = w.toString();
          l.has(m) ? l.get(m).append(f) : (l.set(m, new Fe(w, [f], y)), p.set(m, y));
        }
        i[1].inflections = [];
        const u = Array.from(l.keys()).sort(
          (f, y) => {
            const w = p.get(f), m = p.get(y);
            return w > m ? -1 : m > w ? 1 : 0;
          }
        );
        for (const f of u)
          i[1].inflections.push(l.get(f));
      }
      for (const i of a) {
        const l = i[1];
        for (const p of l.inflections) {
          const u = /* @__PURE__ */ new Map();
          for (const f of p.inflections) {
            const y = new Te(
              f,
              [
                h.types.grmCase,
                h.types.comparison,
                h.types.gender,
                h.types.number,
                h.types.person,
                h.types.tense,
                h.types.mood,
                h.types.voice
              ]
            ), w = y.toString();
            u.has(w) ? u.get(w).append(f) : u.set(w, new Fe(y, [f]));
          }
          p.inflections = Array.from(u.values());
        }
      }
      n[1].inflections = Array.from(a.values());
    }
    return Array.from(t.values());
  }
};
o(An, "SyriacLanguageModel");
let qt = An;
const Re = /* @__PURE__ */ new Map([
  [Ds, qr],
  [Gt, qr],
  [Qt, Ti],
  [Xt, Gr],
  [Cs, Gr],
  [Yt, Fi],
  [Zt, Li],
  [er, Ri],
  [tr, qt],
  [As, qt],
  [_s, qt]
]), _n = class _e {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage(e) {
    return e = typeof e == "symbol" ? _e.getLanguageCodeFromId(e) : e, Re.has(e);
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
    const t = _e.getLanguageCodeFromId(e);
    return _e.getLanguageModelFromCode(t);
  }
  static getLanguageModelFromCode(e) {
    return Re.has(e) ? Re.get(e) : ce;
  }
  static getLanguageForCode(e = null) {
    const t = Re.get(e);
    return t ? new t() : new ce();
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
    return Ss;
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
    return xs;
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
      languageCode: _e.getLanguageCodeFromId(e)
    } : {
      languageID: _e.getLanguageIdFromCode(e),
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
    return e = typeof e == "symbol" ? _e.getLanguageCodeFromId(e) : e, t = typeof t == "symbol" ? _e.getLanguageCodeFromId(t) : t, e === t;
  }
  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage(e) {
    return [Es, Os, Is].includes(e);
  }
};
o(_n, "LanguageModelFactory");
let R = _n;
const Tn = class Fn {
  constructor(e, t) {
    this.lemmaWord = e, this.languageID = t, this.shortDefs = [], this.fullDefs = [];
  }
  /**
   * A function that is used to instantiate a DefinitionSet object from a JSON object.
   *
   * @param {object} jsonObject - A JSON object representing DefinitionSet data.
   * @returns {DefinitionSet} A DefinitionSet object populated with data from JSON object.
   */
  static readObject(e) {
    const t = R.getLanguageIdFromCode(e.languageCode);
    let r = new Fn(e.lemmaWord, t);
    for (const n of e.shortDefs)
      r.shortDefs.push(Br.readObject(n));
    for (const n of e.fullDefs)
      r.fullDefs.push(Br.readObject(n));
    return r;
  }
  /**
   * Checks if any short definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return this.shortDefs.length > 0;
  }
  /**
   * Checks if any full definitions are stored within this object.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return this.fullDefs.length > 0;
  }
  /**
   * Check to see if the DefinitionSet is empty
   *
   * @returns {boolean} true if empty false if there is at least one definition
   */
  isEmpty() {
    return this.shortDefs.length === 0 && this.fullDefs.length === 0;
  }
  /**
   * Appends one or more definitions to a list of short definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of short definitions this object has.
   */
  appendShortDefs(e) {
    return e && (Array.isArray(e) || (e = [e]), this.shortDefs = this.shortDefs.concat(e)), this.shortDefs;
  }
  /**
   * clear accumulated short definitions
   */
  clearShortDefs() {
    this.shortDefs = [];
  }
  /**
   * Appends one or more definitions to a list of full definitions.
   *
   * @param {Definition | Definition[]} definitions - One or more definition objects to add.
   * @returns {Definition[]} A list of full definitions this object has.
   */
  appendFullDefs(e) {
    return e && (Array.isArray(e) || (e = [e]), this.fullDefs = this.fullDefs.concat(e)), this.fullDefs;
  }
  /**
   * clear accumulated full definitions
   */
  clearFullDefs() {
    this.fullDefs = [];
  }
  convertToJSONObject() {
    const e = R.getLanguageCodeFromId(this.languageID);
    return {
      lemmaWord: this.lemmaWord,
      languageCode: e,
      shortDefs: this.shortDefs.map((t) => t.convertToJSONObject()),
      fullDefs: this.fullDefs.map((t) => t.convertToJSONObject())
    };
  }
};
o(Tn, "DefinitionSet");
let Wt = Tn;
const Ln = class Rn {
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
  constructor(e, t, r, n = 1) {
    if (!Rn.types.isAllowed(t))
      throw new Error('Features of "' + t + '" type are not supported.');
    if (!e)
      throw new Error("Feature should have a non-empty value.");
    if (!t)
      throw new Error("Feature should have a non-empty type.");
    if (!r)
      throw new Error("Feature constructor requires a language");
    this.value = e, this.type = t, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = R.getLanguageAttrs(r), this.sortOrder = n;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return F.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  isEqual(e) {
    if (Array.isArray(e.value)) {
      if (!Array.isArray(this.value) || this.value.length !== e.value.length)
        return !1;
      let t = this.type === e.type && R.compareLanguages(this.languageID, e.languageID);
      return t = t && this.value.every(function(r, n) {
        return r === e.value[n];
      }), t;
    } else
      return R.compareLanguages(this.languageID, e.languageID) && this.type === e.type && this.value === e.value;
  }
  isSubsetof(e) {
    Array.isArray(e) || (e = [e]);
    const t = e[0].languageID, r = e[0].type, n = e.map((a) => a.value);
    return !!(R.compareLanguages(this.languageID, t) && this.type === r && n.includes(this.value));
  }
  /**
   * examine the feature for a specific value
   *
   * @param {string} value
   * @returns {boolean} true if the value is included in the feature's values
   */
  hasValue(e) {
    return Array.isArray(this.value) ? this.value.includes(e) : this.value === e;
  }
  /**
   * string representation of a feature
   *
   * @returns {string}
   */
  toString() {
    return Array.isArray(this.value) ? this.value.join(",") : this.value;
  }
  static toFeature(e) {
    if (Array.isArray(e)) {
      if (!(e[0] instanceof h)) {
        const t = e[0].type, r = e[0].languageID, n = e.map((a) => a.value);
        return new h(t, n, r);
      }
    } else if (!(e instanceof h))
      return new h(e.type, e.value, e.languageID);
    return e;
  }
};
o(Ln, "GrmFeature");
let ki = Ln;
ki.types = {
  word: "word",
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
  isAllowed(s) {
    const e = `${s}`;
    return Object.values(this).includes(e);
  }
};
const Pi = class {
  /**
   * Initializes a feature list.
   *
   * @param {Feature[]} features - Features that build the list (optional, can be set later).
   */
  constructor(e = []) {
    this._features = [], this._types = {}, this.add(e);
  }
  add(e) {
    if (!e || !Array.isArray(e))
      throw new Error("Features must be defined and must come in an array.");
    for (const t of e)
      this._features.push(t), this._types[t.type] = t;
  }
  /**
   * Returns an array of grouping features.
   *
   * @returns {FeatureType[]} - An array of grouping features.
   */
  get items() {
    return this._features;
  }
  forEach(e) {
    this._features.forEach(e);
  }
  /**
   * Returns a feature of a particular type. If such feature does not exist in a list, returns undefined.
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {FeatureType | undefined} A feature if a particular type if contains it. Undefined otherwise.
   */
  ofType(e) {
    if (this.hasType(e))
      return this._types[e];
  }
  /**
   * Checks whether a feature list has a feature of a specific type.
   *
   * @param {string} type - Feature type as defined in `types` object.
   * @returns {boolean} Whether a feature list has a feature of a particular type.
   */
  hasType(e) {
    return this._types.hasOwnProperty(e);
  }
};
o(Pi, "FeatureList");
const kn = class sr {
  /**
   * Initializes a Translation object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param languageCode
   * @param translations
   */
  constructor(e, t, r = []) {
    if (!e)
      throw new Error("Lemma should not be empty.");
    this.lemmaWord = e.word, this.languageCode = t, this.glosses = r;
  }
  static readTranslationFromJSONList(e, t, r, n) {
    if (!r || !Array.isArray(r))
      throw new Error("Recieved not proper translation list", r);
    const a = r.find(function(l) {
      return l.in === e.word;
    }), i = new sr(e, t, a.translations);
    return n ? De.getProxy(n, i) : i;
  }
  static loadTranslations(e, t, r, n) {
    e.addTranslation(this.readTranslationFromJSONList(e, t, r, n));
  }
  convertToJSONObject() {
    let e = {
      languageCode: this.languageCode,
      translations: this.glosses
    };
    return this.provider && (e.provider = this.provider.convertToJSONObject()), e;
  }
  static readObject(e, t) {
    const r = new sr(t, e.languageCode, e.translations);
    if (e.provider) {
      const n = De.readObject(e.provider);
      return De.getProxy(n, r);
    } else
      return r;
  }
};
o(kn, "Translation");
let ji = kn;
const Pn = class jn {
  /**
   * Initializes a Lemma object.
   *
   * @param {string} word - A word.
   * @param {symbol | string} languageID - A language ID (symbol, please use this) or a language code of a word.
   * @param {string[]} principalParts - the principalParts of a lemma.
   * @param {object} features - the grammatical features of a lemma.
   * @param {Translation} transaltions - translations from python service
   */
  constructor(e, t, r = [], n = {}) {
    if (!e)
      throw new Error("Word should not be empty.");
    if (!t)
      throw new Error("Language should not be empty.");
    this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = R.getLanguageAttrs(t), this.word = e, this.principalParts = r, this.features = {}, this.ID = lt();
  }
  get language() {
    return F.getInstance().warn('Please use "languageID" instead of "language"'), this.languageCode;
  }
  get displayWord() {
    return this.word.replace(/\d+$/, "");
  }
  static readObject(e) {
    const t = e.language ? e.language : e.languageCode;
    let r = new jn(e.word, t, e.principalParts, e.pronunciation);
    return e.features && e.features.length > 0 && e.features.forEach((n) => {
      r.addFeature(h.readObject(n));
    }), e.translation && (r.translation = ji.readObject(e.translation, r)), r;
  }
  convertToJSONObject() {
    let e = [];
    for (const r of Object.values(this.features))
      e.push(r.convertToJSONObject());
    let t = {
      word: this.word,
      language: this.languageCode,
      principalParts: this.principalParts,
      features: e
    };
    return this.translation && (t.translation = this.translation.convertToJSONObject()), t;
  }
  /**
   * @deprecated Please use `addFeature` instead.
   * Sets a grammatical feature for a lemma. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature(e) {
    if (F.getInstance().warn('Please use "addFeature" instead'), !e)
      throw new Error("feature data cannot be empty.");
    Array.isArray(e) || (e = [e]);
    const t = e[0].type;
    this.features[t] = [];
    for (const r of e) {
      if (!(r instanceof h))
        throw new Error("feature data must be a Feature object.");
      if (!R.compareLanguages(r.languageID, this.languageID))
        throw new Error('Language "' + r.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
      this.features[t].push(r);
    }
  }
  /**
   * Sets a grammatical feature of a lemma. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature(e) {
    if (!e)
      throw new Error("feature data cannot be empty.");
    if (!(e instanceof h) && e.constructor.name !== "Feature")
      throw new Error("feature data must be a Feature object.");
    if (!R.compareLanguages(e.languageID, this.languageID))
      throw new Error('Language "' + e.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
    this.features[e.type] = e;
  }
  /**
   * Sets multiple grammatical features of a lemma.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures(e) {
    if (!Array.isArray(e))
      throw new Error("Features must be in an array");
    for (const t of e)
      this.addFeature(t);
  }
  /**
   * Sets a translation from python service.
   *
   * @param {Translation} translation - A translation object
   */
  addTranslation(e) {
    if (!e)
      throw new Error("translation data cannot be empty.");
    if (e.constructor.name.indexOf("Translation") === -1)
      throw new Error("translation data must be a Translation object.");
    this.translation = e;
  }
  /**
   * Test to see if two lemmas are full homonyms.
   *
   * @param {Lemma} lemma - the lemma to compare.
   * @param {object} options - Additional comparison options.
   * @param {boolean} options.normalize - Whether to normalize words before comparison.
   * @param {boolean} options.ignorePofs - Whether to ignore the part of speech in comparison.
   *                                       (use if the lexeme data is needed
   *                                        for a part of speech comparison)
   * @returns {boolean} true or false.
   */
  isFullHomonym(e, { normalize: t = !1, ignorePofs: r = !1 } = {}) {
    if (!r && (!this.features[h.types.part] || !e.features[h.types.part] || !this.features[h.types.part].isEqual(e.features[h.types.part])))
      return !1;
    const n = R.getLanguageModel(this.languageID), a = t ? n.compareWords(
      this.word,
      e.word,
      !0,
      { normalizeTrailingDigit: !0 }
    ) : this.word === e.word, i = n.hasTrailingDigit(this.word), l = n.hasTrailingDigit(e.word);
    if (i && l) {
      const p = this.word.match(/\d+$/)[0], u = e.word.match(/\d+$/)[0];
      if (p !== u)
        return !1;
    }
    return a;
  }
  /**
   * Disambiguate between this and the other lemma.
   *
   * @param {string} otherLemma - The other lemma for disambiguation.
   * @returns {string} - A disambiguated word.
   */
  disambiguate(e) {
    const t = R.getLanguageModel(this.languageID);
    if (!t.compareWords(this.word, e.word, !0, { normalizeTrailingDigit: !0 }))
      throw new Error("Words that differ cannot be disambiguated");
    const r = t.hasUpperCase(this.word);
    if (t.hasUpperCase(e.word))
      return e.word;
    if (r)
      return this.word;
    const n = t.needsNormalization(this.word);
    if (t.needsNormalization(e.word))
      return t.normalizeText(e.word);
    if (n)
      return t.normalizeText(this.word);
    const a = t.hasTrailingDigit(this.word);
    return t.hasTrailingDigit(e.word) ? e.word : a ? this.word : this.word;
  }
  /**
   * extracts lemma.word and all principal parts for flashcards export
   *
   */
  get wordPrincipalParts() {
    const e = [...this.principalParts];
    return this.principalParts.includes(this.word) || e.push(this.word), e.join(", ");
  }
};
o(Pn, "Lemma");
let At = Pn;
const Nn = class nr {
  /**
   * Initializes an Inflection object.
   *
   * @param {string} stem - A stem of a word.
   * @param {string | symbol} language - A word's language.
   * @param {string} suffix - a suffix of a word
   * @param {prefix} prefix - a prefix of a word
   * @param {example} example - example
   */
  constructor(e = null, t, r = null, n = null, a = null) {
    if (!e && !r)
      throw new Error("At least stem or suffix must be defined");
    if (!t)
      throw new Error("Language should not be empty.");
    if (!R.supportsLanguage(t))
      throw new Error(`language ${t} not supported.`);
    this.stem = e, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = R.getLanguageAttrs(t), this.model = R.getLanguageModel(this.languageID), this.features = /* @__PURE__ */ new Set(), this.constraints = {
      fullFormBased: !1,
      // True this inflection stores and requires to use a full form of a word
      suffixBased: !1,
      // True if only suffix is enough to identify this inflection
      irregular: !1,
      // Whether this word is an irregular one
      obligatoryMatches: [],
      // {string[]} Names of features that should be matched in order to include a form or suffix to an inflection table
      optionalMatches: [],
      // {string[]} Names of features that will be recorded but are not important for inclusion of a form or suffix to an inflection table
      morphologyMatches: []
      // {string[]} These features should match for a morphology match
    }, this.suffix = r, this.prefix = n, this.example = a, this.lemma = null;
  }
  clone() {
    let e = new nr(this.stem, this.languageID, this.suffix, this.prefix, this.example);
    return e.addFeatures(Array.from(this.features).map((t) => this[t])), e.constraints = {
      fullFormBased: this.constraints.fullFormBased,
      suffixBased: this.constraints.suffixBased,
      irregular: this.constraints.irregular,
      obligatoryMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      optionalMatches: this.constraints.obligatoryMatches ? Array.from(this.constraints.obligatoryMatches) : [],
      morphologyMatches: this.constraints.morphologyMatches ? Array.from(this.constraints.morphologyMatches) : []
    }, e.lemma = this.lemma, e;
  }
  /**
   * Returns a full form of a word using ' - ' as a divider for suffix-based inflections.
   *
   * @returns {string} A word form.
   */
  get form() {
    const e = this.stem ? " - " : "";
    return this.getForm(e);
  }
  /**
   * Returns a full form of a word using user specified divider for suffix-based inflections.
   *
   * @param {string} divider - A divider to use between stem and suffix.
   * @returns {string} A word form.
   */
  getForm(e = "") {
    let t, r, n;
    const a = this.stem ? this.stem : "";
    return this.model.direction === Rt ? (r = this.prefix ? e + this.prefix : "", n = this.suffix ? this.suffix + e : "", t = n + a + r) : (r = this.prefix ? this.prefix + e : "", n = this.suffix ? e + this.suffix : "", t = r + a + n), t;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return F.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  /**
   * Sets grammar properties based on inflection info
   */
  setConstraints() {
    if (this.model.hasOwnProperty("getInflectionConstraints")) {
      const e = this.model.getInflectionConstraints(this);
      this.constraints = Object.assign(this.constraints, e);
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
  smartWordCompare(e, t, r = {}) {
    r.hasOwnProperty("normalize") || (r.normalize = !0), r.hasOwnProperty("fuzzySuffix") || (r.fuzzySuffix = !1);
    let n;
    this.constraints.irregular ? t === "Suffix" ? n = this.suffix : n = this[h.types.fullForm] ? this[h.types.fullForm].value : this.form : n = this.constraints.suffixBased ? this.suffix : this.form;
    let a = this.modelCompareWords(e, n, r.normalize);
    if (!a && t === "Suffix" && r.fuzzySuffix) {
      const i = this.getForm();
      if (i && e && i.length >= e.length) {
        const l = i.substring(i.length - e.length);
        a = this.modelCompareWords(e, l, r.normalize);
      }
    }
    return a;
  }
  compareWithWord(e, t = !0) {
    const r = this.constraints.suffixBased ? this.suffix : this.form;
    return this.modelCompareWords(e, r, t);
  }
  /**
   * Compare to words (or partial words) delegating to the language model
   * rules for normalization
   *
   * @param {string} wordA the first word
   * @param {string} wordB the second word
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareWords(e, t, r = !0) {
    return R.getLanguageModel(this.languageID).compareWords(e, t, r);
  }
  /**
   * Compare single feature values delegating to the language model
   * rules for normalization
   *
   * @param {string} featureType the feature type
   * @param {string} valueA the first value
   * @param {string} valueB the secon value
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareFeatureValue(e, t, r, n = !0) {
    return R.getLanguageModel(this.languageID).compareFeatureValue(e, t, r, { normalize: n });
  }
  /**
   * Check to see if the supplied inflection can disambiguate this one
   *
   * @param {Inflection} infl Inflection object to be used for disambiguation
   * @param {object} options disambiguation options
   * @param {boolean} options.ignorePofs flag to ignore the inflection's part of speech
   *                                    (use if lexeme pofs is more relevant)
   * @returns {object} object { {Boolean} match, {Boolean} exactMatch }
   *                   a match means the inflection was disamibugated
   *                   an exactMatch means the disamibugator matched all
   *                   values of all features
   */
  disambiguatedBy(e, { ignorePofs: t = !1 } = {}) {
    let r = !0, n = !0;
    (this.features.size === 0 || e.features.size === 0) && (r = !1), e.features.size > this.features.size && (r = !1);
    for (const a of e.features)
      if (!(t && a === h.types.part))
        for (const i of e[a].values) {
          if (!this.hasFeatureValue(a, i, { normalize: !0 })) {
            r = !1;
            break;
          }
          this[a].values.length !== e[a].values.length && (n = !1);
        }
    return { match: r, exactMatch: n };
  }
  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature(e) {
    if (F.getInstance().warn('Please use "addFeature" instead.'), !e)
      throw new Error("Inflection feature data cannot be empty.");
    Array.isArray(e) || (e = [e]);
    const t = e[0].type;
    this[t] = [];
    for (const r of e) {
      if (!(r instanceof h))
        throw new Error("Inflection feature data must be a Feature object.");
      if (!R.compareLanguages(r.languageID, this.languageID))
        throw new Error(`Language "${r.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`);
      this[t].push(r), this.features.add(t);
    }
  }
  /**
   * Sets a grammatical feature of an inflection. Feature is stored in a `feature.type` property.
   *
   * @param {Feature} feature - A feature object with one or multiple values.
   */
  addFeature(e) {
    if (!e)
      throw new Error("feature data cannot be empty.");
    if (!(e instanceof h) && e.constructor.name !== "Feature")
      throw new Error("feature data must be a Feature object.");
    if (!R.compareLanguages(e.languageID, this.languageID))
      throw new Error('Language "' + e.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
    this[e.type] = e, this.features.add(e.type);
  }
  /**
   * Sets multiple grammatical features of an inflection.
   *
   * @param {Feature[]} features - Features to be added.
   */
  addFeatures(e) {
    if (!Array.isArray(e))
      throw new Error("Features must be in an array");
    for (const t of e)
      this.addFeature(t);
  }
  /**
   * Checks whether an inflection has a feature with `featureName` name and `featureValue` value
   *
   * @param {string} featureName - A name of a feature
   * @param {string} featureValue - A value of a feature
   * @param {object} options
   * @param {boolean} options.normalize - whether or not to normalize the feature values
   * @returns {boolean} True if an inflection contains a feature, false otherwise
   */
  hasFeatureValue(e, t, { normalize: r = !1 } = {}) {
    return this.hasOwnProperty(e) ? this[e].values.some((n) => this.modelCompareFeatureValue(e, n, t)) : !1;
  }
  toString() {
    let e = `Inflection stem: ${this.stem}, prefix: ${this.prefix}, suffix: ${this.suffix}, langID: ${this.languageID.toString()}
  features:  `;
    for (const t of this.features.values())
      e += `${t}: ${this[t].value}, `;
    e += `
  constraints:  `;
    for (const [t, r] of Object.entries(this.constraints))
      Array.isArray(r) ? e += `${t}: [${r}], ` : e += `${t}: ${r}, `;
    return e += `
  example: ${this.example}`, e;
  }
  static readObject(e, t) {
    let r = new nr(
      e.stem,
      e.languageCode,
      e.suffix,
      e.prefix,
      e.example
    );
    return r.languageID = R.getLanguageIdFromCode(r.languageCode), e.features && e.features.length > 0 && e.features.forEach((n) => {
      r.addFeature(h.readObject(n));
    }), t && (r.lemma = t), r;
  }
  convertToJSONObject() {
    let e = [];
    for (const r of this.features.keys())
      e.push(this[r].convertToJSONObject());
    const t = R.getLanguageCodeFromId(this.languageID);
    return {
      stem: this.stem,
      languageCode: t,
      suffix: this.suffix,
      prefix: this.prefix,
      example: this.example,
      features: e
    };
  }
};
o(Nn, "Inflection");
let ns = Nn;
const Un = class ar {
  /**
   * Initializes a Lexeme object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.
   */
  constructor(e, t, r = null) {
    if (!e)
      throw new Error("Lemma should not be empty.");
    if (!(e instanceof At))
      throw new Error("Lemma should be of Lemma object type.");
    if (!t)
      throw new Error("Inflections data should not be empty.");
    if (!Array.isArray(t))
      throw new Error("Inflection data should be provided in an array.");
    for (const n of t)
      if (!(n instanceof ns))
        throw new Error("All inflection data should be of Inflection object type.");
    if (r !== null && !(r instanceof Wt))
      throw new Error("Meaning should be of DefinitionSet object type.");
    this.lemma = e, this.altLemmas = [], this.inflections = [], this.addInflections(t), this.meaning = r || new Wt(this.lemma.word, this.lemma.languageID), this.disambiguated = !1, this.selectedInflection = null;
  }
  /**
   * Set the selected inflection for a lexeme which has had its
   * inflections disambiguated
   *
   * @param {Inflection} inflection the selected inflection
   */
  setSelectedInflection(e) {
    this.selectedInflection = e;
  }
  /**
   * Get the selected inflection for a lexeme which has had its
   * inflections disambiguated
   *
   * @returns {Inflection} (or null if none is selected)
   */
  getSelectedInflection() {
    return this.selectedInflection;
  }
  /**
   * Gets the selected inflection formatted for display
   * (returns an array because the display is grouped by feature
   * but there should only be one inflection in the array)
   *
   * @returns {Array} if no selected inflection the array will be empty
   */
  getGroupedSelectedInflection() {
    return this.selectedInflection ? R.getLanguageModel(this.lemma.languageID).groupInflectionsForDisplay([this.selectedInflection]) : [];
  }
  /**
   * add an inflection to the lexeme
   *
   * @param {Inflection} inflection
   */
  addInflection(e) {
    e.lemma = this.lemma, e.lexeme = this, this.inflections.push(e);
  }
  /**
   * Adds one or several inflections to a Lexeme object.
   *
   * @param {Inflection | Inflection[]} inflections - a single Inflection object or an array of Inflection
   *        objects to add to a lexeme.
   */
  addInflections(e) {
    Array.isArray(e) || (e = [e]), e.forEach((t) => this.addInflection(t));
  }
  /**
   * add an alternative lemma to the lexeme
   *
   * @param {Lemma} lemma
   */
  addAltLemma(e) {
    this.altLemmas.push(e);
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
  isPopulated() {
    return Object.entries(this.lemma.features).length > 0 || !this.meaning.isEmpty() || this.inflections.length > 0;
  }
  /**
   * Checks if any short definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return !!(this.meaning && this.meaning.hasShortDefs);
  }
  /**
   * Checks if any full definitions are stored within this lexeme.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return !!(this.meaning && this.meaning.hasFullDefs);
  }
  /**
   * Checks whether a lemma of a current lexeme is a full homonym of the lemma of the other lexeme.
   *
   * @param {Lexeme} otherLexeme - a lexeme whose lemma will be compared with the lemma of a current lexeme.
   * @param {boolean} normalize - whether to use normalization for word comparison.
   * @returns {boolean} - true if two aforementioned lemmas are full homonyms, false otherwise.
   */
  isFullHomonym(e, { normalize: t = !1 } = {}) {
    const r = R.getLanguageModel(this.lemma.languageID), n = r.normalizePartOfSpeechValue(this);
    if (n === r.normalizePartOfSpeechValue(e)) {
      const a = n !== this.lemma.features[h.types.part];
      return this.lemma.isFullHomonym(e.lemma, { normalize: t, ignorePofs: a });
    } else
      return !1;
  }
  /**
   * Determines whether a lexeme can be disambiguated with the other disambiguator lexeme.
   *
   * @param {Lexeme} disambiguator - A possible disambiguator; a lexeme that is checked
   *         whether it can disambiguate a current lexeme.
   * @returns {boolean} - True if a current lexeme can be disambiguated with a disambiguator, false otherwise.
   */
  canBeDisambiguatedWith(e) {
    const t = e.inflections.length || ce.hasTrailingDigit(e.lemma.word);
    return this.isFullHomonym(e, { normalize: !0 }) && t;
  }
  /**
   * disambiguate the inflections in this lexeme with those in another lexeme
   *
   * @param {Lexeme} lexeme the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use to disambiguate
   * @returns {Lexeme} a new lexeme, if disambiguation was successful the
   * disambiguated inflection will be selected
   */
  static disambiguateInflections(e, t) {
    let r = new ar(e.lemma, e.inflections, e.meaning);
    const n = R.getLanguageModel(e.lemma.languageID);
    if (e.canBeDisambiguatedWith(t))
      for (const a of r.inflections)
        for (const i of t.inflections) {
          const l = n.normalizePartOfSpeechValue(t) !== t.lemma.features[h.types.part], p = a.disambiguatedBy(i, { ignorePofs: l });
          p.match && (p.exactMatch ? r.setSelectedInflection(a) : r.setSelectedInflection(i));
        }
    return r;
  }
  /**
   * Set the disambiguation flag of this lexeme
   * if a disambiguator lexeme is provided, it's lemma word will be used
   * to update the word of this lexeme's lemma
   *
   * @param {Lexeme} disambiguator
   */
  setDisambiguation(e = null) {
    this.disambiguated = !0, e && (this.lemma.word = this.lemma.disambiguate(e.lemma));
  }
  getGroupedInflections() {
    return R.getLanguageModel(this.lemma.languageID).groupInflectionsForDisplay(this.inflections);
  }
  static readObject(e) {
    const t = At.readObject(e.lemma);
    let r = [];
    for (const a of e.inflections)
      r.push(ns.readObject(a));
    const n = new ar(t, r);
    if (e.meaning && (n.meaning = Wt.readObject(e.meaning)), e.provider) {
      const a = De.readObject(e.provider);
      return De.getProxy(a, n);
    } else
      return n;
  }
  convertToJSONObject(e = !1) {
    let t = [];
    this.inflections.forEach((n) => {
      t.push(n.convertToJSONObject());
    });
    const r = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: t
    };
    return e && (r.meaning = this.meaning.convertToJSONObject()), this.provider && (r.provider = this.provider.convertToJSONObject()), r;
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
  static getSortByTwoLemmaFeatures(e, t) {
    return (r, n) => {
      if (r.lemma.features[e] && n.lemma.features[e] || !r.lemma.features[e] && !n.lemma.features[[e]]) {
        let a;
        return r.lemma.features[e] && n.lemma.features[e] ? a = r.lemma.features[e].compareTo(n.lemma.features[e]) : a = 0, a !== 0 ? a : r.lemma.features[t] && n.lemma.features[t] ? r.lemma.features[t].compareTo(n.lemma.features[t]) : r.lemma.features[t] && !n.lemma.features[t] ? -1 : !r.lemma.features[t] && n.lemma.features[t] ? 1 : 0;
      } else return r.lemma.features[e] && !n.lemma.features[e] ? -1 : !r.lemma.features[e] && n.lemma.features[e] ? 1 : 0;
    };
  }
};
o(Un, "Lexeme");
let et = Un;
const Mn = class tt {
  /**
   * Initializes a Homonym object.
   *
   * @param {Lexeme[]} lexemes - An array of Lexeme objects.
   * @param {string} form - the form which produces the homonyms
   */
  constructor(e, t) {
    if (!e || Array.isArray(e) && e.length === 0)
      throw new Error("Lexemes data should not be empty.");
    if (!Array.isArray(e))
      throw new Error("Lexeme data should be provided in an array.");
    for (const r of e)
      if (!(r instanceof et))
        throw new Error("All lexeme data should be of Lexeme object type.");
    this.lexemes = e, this.targetWord = t;
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
  static createSimpleForm(e, t, r = []) {
    const n = new At(e, t), a = new et(n, r);
    return new tt([a], e);
  }
  /**
   * Checks if any of the lexemes of this homonym has short definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasShortDefs() {
    return !!(this.lexemes && this.lexemes.some((e) => e.hasShortDefs));
  }
  /**
   * Checks if any of the lexemes of this homonym has full definitions stored.
   *
   * @returns {boolean} - true if any definitions are stored, false otherwise.
   */
  get hasFullDefs() {
    return !!(this.lexemes && this.lexemes.some((e) => e.hasFullDefs));
  }
  static readObject(e) {
    let t = [];
    if (e.lexemes)
      for (const n of e.lexemes)
        t.push(et.readObject(n));
    else {
      const n = R.getLanguageIdFromCode(e.languageCode);
      t = [new et(new At(e.targetWord, n), [])];
    }
    const r = new tt(t, e.form || e.targetWord);
    return r.lemmasList = e.lemmasList, r;
  }
  convertToJSONObject(e = !1) {
    let t = { lexemes: [], form: this.targetWord };
    for (const r of this.lexemes)
      t.lexemes.push(r.convertToJSONObject(e));
    return t;
  }
  /**
   * Returns a language code of a homonym (ISO 639-3).
   * Homonym does not have a language property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using language property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {string} A language code, as defined in the `languages` object.
   */
  get language() {
    return F.getInstance().warn("Please use languageID instead"), R.getLanguageCodeFromId(this.languageID);
  }
  /**
   * Returns a language ID of a homonym.
   * Homonym does not have a languageID property, only lemmas and inflections do. We assume that all lemmas
   * and inflections within the same homonym will have the same language, and we can determine a language
   * by using languageID property of the first lemma. We chan change this logic in the future if we'll need to.
   *
   * @returns {symbol} A language ID, as defined in the `LANG_` constants.
   */
  get languageID() {
    if (this.lexemes && this.lexemes[0] && this.lexemes[0].lemma && this.lexemes[0].lemma.languageID)
      return this.lexemes[0].lemma.languageID;
    throw new Error("Homonym has not been initialized properly. Unable to obtain language ID information.");
  }
  /**
   * Returns a list of all inflections within all lexemes of a homonym
   *
   * @returns {Inflection[]} An array of inflections
   */
  get inflections() {
    let e = [];
    for (const t of this.lexemes)
      e = e.concat(t.inflections);
    return e;
  }
  isDisambiguated() {
    return this.lexemes.filter((e) => e.disambiguated).length > 0;
  }
  /**
   * Disambiguate homymyn objects with another
   *
   * @param {Homonym} base the homonym to use to disambiguate
   * @param {Homonym[]} disambiguators the homonyms to use to disambiguate
   */
  static disambiguate(e, t) {
    if (t.length === 0)
      return e;
    const r = t.shift();
    let n = [], a = [], i = [], l = [];
    for (const u of r.lexemes) {
      for (const f of e.lexemes) {
        const y = f.canBeDisambiguatedWith(u) ? et.disambiguateInflections(f, u) : f;
        f.isFullHomonym(u, { normalize: !0 }) ? y.getSelectedInflection() !== null ? (y.setDisambiguation(u), n.push(y)) : i.push(y) : l.push(y);
      }
      if (n.length === 0)
        if (i.length > 0)
          for (const f of i) {
            f.setDisambiguation(u);
            for (const y of r.inflections)
              f.addInflection(y), f.setSelectedInflection(y);
          }
        else {
          u.setDisambiguation();
          for (const f of u.inflections)
            u.setSelectedInflection(f);
          a.push(u);
        }
    }
    const p = new tt([...a, ...n, ...i, ...l], e.targetWord);
    return tt.disambiguate(p, t);
  }
};
o(Mn, "Homonym");
let Vn = Mn;
const Bn = class $n {
  constructor(e = []) {
    this._homonyms = e;
  }
  get homonyms() {
    return this._homonyms;
  }
  get hasHomonyms() {
    return this._homonyms.length > 0;
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
  toHomonym(e, { disambiguated: t = !1 } = {}) {
    if (!e)
      throw new Error($n.errors.NO_TARGET_WORD);
    const r = this._homonyms.map((n) => n.lexemes).flat();
    return t && r.forEach((n) => {
      n.disambiguated = !0;
    }), new Vn(r, e);
  }
};
o(Bn, "HomonymGroup");
let Ni = Bn;
Ni.errors = {
  NO_TARGET_WORD: "Target word is not provided"
};
const zn = class {
  /**
   * @param {PsEvent} event - An event that is being published.
   * @param {string} [caller=''] - The name of the function from where an event was published.
   */
  constructor(e, t = "") {
    this.name = e.name, this.publisher = e.publisher, this.caller = t;
  }
  /**
   * Returns a description of an event data in a printable form. Example:
   *     LexicalQuery.finalize -> [Lexical Query Complete]
   * If caller function is not specified during a `pub()` call, description will be:
   *     LexicalQuery -> [Lexical Query Complete]
   *
   * @returns {string} - An event data description.
   */
  get description() {
    return this.caller ? `${this.publisher}.${this.caller} -> [${this.name}]` : `${this.publisher} -> [${this.name}]`;
  }
};
o(zn, "PsEventData");
let Ui = zn;
const Mi = class {
  /**
   * @param {string} name - A name of the event.
   * @param {Function} publisher - A constructor function of a publisher.
   *        PsEvent uses its `name` property to set its publisher name field.
   */
  constructor(e, t) {
    this.name = e, this.publisher = t.name, this._subscribers = /* @__PURE__ */ new Map();
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
  get subscribers() {
    return Array.from(this._subscribers.values());
  }
  /**
   * Subscribes a function to the published event.
   * When event is published, a @type {Event~subscriber} function is called.
   *
   * @param {EventSubscriber} subscriber - A subscriber function.
   * @returns {Function} - An function that, when called, will unsubscribe the current subscriber from an event.
   */
  sub(e) {
    const t = lt();
    return this._subscribers.set(t, e), () => {
      this._subscribers.delete(t);
    };
  }
  /**
   * Publishes an event with data related to it. All subscribers will receive an
   * event notification along with event data.
   *
   * @param {object} [data={}] - An event-specific data associated with the event.
   * @param {string} [caller=''] - The name of the function that called `pub`.
   */
  pub(e = {}, t = "") {
    this._subscribers.forEach((r) => r(e, new Ui(this, t)));
  }
  /**
   * Unsubscribes all subscribers from an event.
   */
  unsubAll() {
    this._subscribers.clear();
  }
};
o(Mi, "PsEvent");
const qn = class Wn {
  constructor(e, t, r = null, n = null, a = null) {
    this.languageCode = e, this.normalizedText = t, this.contextForward = 6, this.contextBackward = 6, this.text = this.normalizedText, this.prefix = r, this.suffix = n, this.source = a, this.ID = lt();
  }
  get contextHTML() {
    const e = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`, t = this.prefix.replace(this.text, e), r = this.suffix.replace(this.text, e);
    return `${t} <span class="alpheios_worditem_incontext">${this.text}</span> ${r}`;
  }
  static readObject(e) {
    let t = new Wn(e.languageCode, e.target.selector.exact);
    return t.prefix = e.target.selector.prefix, t.suffix = e.target.selector.suffix, t.text = e.targetWord, t.source = e.target.source, t;
  }
  isEqual(e) {
    let t = `${this.prefix}${this.text}${this.suffix}`;
    t = t.trim();
    let r = `${e.prefix}${e.text}${e.suffix}`;
    return r = r.trim(), this.text === e.text && this.source === e.source && this.languageCode === e.languageCode && t === r;
  }
  updateLanguage(e) {
    this.languageCode = e;
  }
};
o(qn, "TextQuoteSelector");
let Jn = qn;
const Vi = class extends Jn {
  constructor(e, t, r, n, a, i) {
    super(e, t), this.prefix = r, this.suffix = n, this.source = a, this.cit = i, this.author = null, this.textWork = null, this.passage = null;
  }
  createContext() {
    return null;
  }
  /**
   * Creates a full text of example prefix + word + suffix
   *
   * @returns {string}
   */
  get htmlExample() {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`;
  }
  /**
   * Creates a full description - author + textWork + cit number
   *
   * @param {string} lang - language for getting text
   * @returns {string}
   */
  fullCit(e) {
    if (!this.author && !this.textWork && !this.passage)
      return this.cit;
    let t = "";
    return e ? (t = this.author ? this.author.title(e) : ".", t = t + " " + (this.textWork ? this.textWork.title(e) : "."), t = t + " " + this.formattedPassage) : t = this.formattedAuthor + " " + this.formattedTextWork + " " + this.formattedPassage, t.trim();
  }
  get formattedAuthor() {
    return this.author ? this.author.title() : "";
  }
  get formattedTextWork() {
    return this.textWork ? this.textWork.title() : "";
  }
  get formattedPassage() {
    return this.passage;
  }
  authorForSort(e) {
    return this.author ? this.author.title(e).toUpperCase() : this.fullCit(e).toUpperCase();
  }
  textWorkForSort(e) {
    return this.textWork ? this.textWork.title(e).toUpperCase() : this.fullCit(e).toUpperCase();
  }
  get prefixForSort() {
    const e = R.getLanguageModelFromCode(this.languageCode), t = this.prefix.replace(new RegExp("[" + e.getPunctuation() + " ]", "g"), " ").toUpperCase().split(" ").filter((r) => r.length > 0);
    return t[t.length - 1];
  }
  get suffixForSort() {
    const e = R.getLanguageModelFromCode(this.languageCode);
    return this.suffix.replace(new RegExp("[" + e.getPunctuation() + " ]", "g"), "").toUpperCase();
  }
};
o(Vi, "WordUsageExample");
const Bi = class rt {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {Author}
   */
  constructor(e, t, r) {
    this.urn = e, this.titles = t, this.abbreviations = r;
  }
  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang() {
    return "eng";
  }
  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title(e) {
    return this.titles[e] ? this.titles[e] : this.titles[rt.defaultLang] ? this.titles[rt.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[rt.defaultLang] ? this.abbreviations[rt.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o(Bi, "Author");
const $i = class st {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {Author} author - author of the textWork
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {TextWork}
   */
  constructor(e, t, r, n) {
    this.urn = t, this.titles = r, this.author = e, this.abbreviations = n;
  }
  /**
   * This property is used to define title for panel
   *
   * @returns {string}
   */
  static get defaultLang() {
    return "eng";
  }
  /**
   * This property is used to define prefix fr extract ID
   *
   * @returns {string}
   */
  static get defaultIDPrefix() {
    return "phi";
  }
  /**
   * Method returns title in the lang from arguments, otherwise in default language or (if not exists) it returns first available title
   *
   * @param {string} lang - language for getting title
   * @returns {string}
   */
  title(e) {
    return this.titles[e] ? this.titles[e] : this.titles[st.defaultLang] ? this.titles[st.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[st.defaultLang] ? this.abbreviations[st.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o($i, "TextWork");
const Hn = class mt {
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
  constructor(e = { targetWord: null, languageCode: null, important: !1, currentSession: !0, context: [], homonym: {}, createdDT: null, updatedDT: null, frequency: null }) {
    if (this.version = 1, this.targetWord = e.targetWord, this.languageCode = e.languageCode, !this.targetWord || !this.languageCode)
      throw new Error("Unable to construct a worditem without at least a targetWord and a languageCode");
    this.important = e.important === void 0 ? !1 : e.important, this.currentSession = e.currentSession === void 0 ? !0 : e.currentSession, this.context = e.context || [], this.homonym = e.homonym || {}, this.createdDT = e.createdDT, this.updatedDT = e.updatedDT, this.frequency = e.frequency;
  }
  /**
   * Construct a WordItem from JSON
   *
   * @param jsonObject
   */
  static readObject(e) {
    let t = {}, r = [];
    return e.homonym && (t = mt.readHomonym(e)), e.context && (r = mt.readContext(e)), new mt({
      targetWord: e.targetWord,
      languageCode: e.languageCode,
      important: e.important,
      currentSession: e.currentSession,
      context: r,
      homonym: t
    });
  }
  /**
   * Construct the homonym portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readHomonym(e) {
    return Vn.readObject(e.homonym);
  }
  get hasTextQuoteSelectors() {
    return this.context.length > 0;
  }
  /**
   * Construct the context portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readContext(e) {
    let t = [];
    for (const r of e) {
      const n = Jn.readObject(r);
      t.push(n);
    }
    return t;
  }
  /**
   * add one or more context selectors
   *
   * @param {TextQuoteSelector[]} selectors
   */
  addContext(e) {
    for (const t of e)
      this.context.filter((r) => r.isEqual(t)).length === 0 && this.context.push(t);
  }
  /**
   * getter for the lemmas in this WordItem
   */
  get lemmasList() {
    return this.homonym && this.homonym.lexemes ? this.homonym.lexemes.map((e) => e.lemma.word).filter((e, t, r) => r.indexOf(e) === t).join(", ") : "";
  }
  /**
   * updates empty properties of this wordItem with those of the supplied worditem if also non-empty
   *
   * @param prevWordItem
   */
  merge(e) {
    const t = ["homonym", "important", "currentSession"];
    for (const r of t)
      this._emptyProp(r) && !e._emptyProp(r) && (this[r] = e[r]);
  }
  /**
   * private method to detect an empty property
   *
   * @param propName
   */
  _emptyProp(e) {
    return !this[e] || typeof this[e] == "object" && Object.keys(this[e]).length === 0;
  }
  get formattedContext() {
    let e = {};
    for (const t of this.context)
      e[t.source] || (e[t.source] = []), e[t.source].push(t);
    return e;
  }
};
o(Hn, "WordItem");
let zi = Hn;
const qi = class {
  /**
   * @class
   * @param {string} languageCode the language code of the list
   * @param {WordItem[]} worditems an optional array of WordItems with which to initialize the list
   */
  constructor(e, t = []) {
    if (!e)
      throw new Error("Unable to construct a wordlist without a languagecode");
    this.languageCode = e, this.items = {}, t.forEach((r) => {
      this.addWordItem(r);
    });
  }
  get size() {
    return Object.keys(this.items).length;
  }
  /**
   * get the items of the list
   */
  get values() {
    return Object.values(this.items);
  }
  /**
   * checks to see if the list is empty
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return Object.values(this.items).length === 0;
  }
  addWordItem(e) {
    if (e.languageCode !== this.languageCode)
      throw new Error(`Language Code mismatch ${e.languageCode} !=== ${this.languageCode}`);
    const t = this.getWordItem(e.targetWord, !1);
    t && e.merge(t);
    const r = this._makeItemKey(this.languageCode, e.targetWord);
    this.items[r] = e;
  }
  /**
   * delete an individual word item from the list
   *
   * @param {string} targetWord the word to delete
   * @returns {WordItem} the deleted item
   */
  deleteWordItem(e) {
    const t = this._makeItemKey(this.languageCode, e), r = this.items[t];
    return r && delete this.items[t], r;
  }
  /**
   * delete all items from a list
   */
  removeAllWordItems() {
    this.items = {};
  }
  /**
   * get an item from a list
   *
   * @param targetWord the word to get
   * @param {boolean} create true to create the item if it doesn't exist
   * @param eventWordItemUpdated
   * @returns {WordItem} the retrieved item
   */
  getWordItem(e, t = !0, r = null) {
    const n = this._makeItemKey(this.languageCode, e);
    if (t && !this.items[n]) {
      const a = new zi({ targetWord: e, languageCode: this.languageCode });
      r && r.pub({ dataObj: a, params: { segment: "common" } }), this.items[n] = a;
    }
    return this.items[n];
  }
  /**
   * make a key for a word item
   *
   * @param {string} languageCode
   * @param {string} targetWord
   */
  _makeItemKey(e, t) {
    return `${e}:${t.toLowerCase()}`;
  }
};
o(qi, "WordList");
const Wi = class ir {
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
  constructor(e = null) {
    this.version = 0, this.app = null, this.sourceUrl = null, this.wordIds = [], this.sentenceId = null, this.doc = null, this.suppressTree = !1;
    const t = e ? e.closest("[data-alpheios_tb_app]") : document.querySelector("[data-alpheios_tb_app]");
    if (t) {
      if (this.app = t.dataset.alpheios_tb_app, this.app !== "perseids-treebank-template")
        throw new Error("Unsupported treebank application. This version of Alpheios only supports the perseids-treebank-template viewer app.");
      if (t.dataset.alpheios_tb_app_version && (this.version = Number.parseInt(t.dataset.alpheios_tb_app_version, 10), !Number.isInteger(this.version)))
        throw new Error(`Treebank version is incorrect in: ${t.outerHTML}`);
      if (!t.dataset.alpheios_tb_app_url)
        throw new Error(`Missing treebank source URL in: ${t.outerHTML}`);
      this.sourceUrl = t.dataset.alpheios_tb_app_url, t.dataset.alpheios_tb_morph_only && (this.suppressTree = t.dataset.alpheios_tb_morph_only !== "false");
      const r = e ? e.closest("[data-alpheios_tb_ref]") : document.querySelector("[data-alpheios_tb_ref]");
      let n = null, a;
      if (e ? (n = e.closest("[data-alpheios_tb_word]"), a = n ? n.closest("[data-alpheios_tb_sent]") : e.closest("[data-alpheios_tb_sent]")) : a = document.querySelector("[data-alpheios_tb_sent]"), !r && !(n || a))
        throw new Error("An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes");
      if (n || a) {
        if (!a)
          throw new Error("Sentence ID is undefined: there is no parent element with data-alpheios_tb_sent attribute");
        const i = n ? n.closest("[data-alpheios_tb_doc]") : a.closest("[data-alpheios_tb_doc]");
        if (!i)
          throw new Error("Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute");
        n && (this.wordIds = n.dataset.alpheios_tb_word.split(" ")), this.sentenceId = a.dataset.alpheios_tb_sent, this.doc = i.dataset.alpheios_tb_doc;
      } else {
        const i = r.dataset.alpheios_tb_ref;
        let l;
        try {
          l = i.split(" ").map((p) => ir.parseReference(p));
        } catch (p) {
          throw new Error(`${p.message} in: ${t.outerHTML}`);
        }
        l = l.filter((p) => p.doc === l[0].doc && p.sent === l[0].sent), this.doc = l[0].doc, this.sentenceId = l[0].sent, this.wordIds = l.map((p) => p.word);
      }
    }
    if (!this.doc)
      throw new Error("Document data is missing");
    if (!this.sentenceId)
      throw new Error("Sentence data is missing");
  }
  static getTreebankData(e = null) {
    try {
      return new ir(e);
    } catch {
      return null;
    }
  }
  /**
   * Parse a reference in a "phi0959.phi006.alpheios-text-lat1#2-13" format to document, sentence ID, and word ID.
   *
   * @param {string} reference - A reference value to parse.
   * @returns {{doc: string, sent: string, word: string}} - An object containing parsed values.
   */
  static parseReference(e) {
    const [t, r] = e.split(/#/);
    if (!t || !r)
      throw new Error("Invalid treebank reference");
    const [n, a] = r.split(/-/);
    if (!n)
      throw new Error("Invalid treebank sent ID");
    if (!a)
      throw new Error("Invalid treebank word ID");
    return { doc: t, sent: n, word: a };
  }
  setWordData(e) {
    this.wordIds = e;
  }
  removeWordData() {
    this.wordIds = [];
  }
  get fullUrl() {
    return this.sourceUrl.replace("DOC", this.doc).replace("SENTENCE", this.sentenceId);
  }
  get docUrl() {
    return this.sourceUrl.replace("DOC", this.doc);
  }
  get provider() {
    return new URL(this.fullUrl).origin;
  }
  get hasWordData() {
    return this.wordIds.length > 0;
  }
  get hasSentenceData() {
    return !!this.sentenceId;
  }
};
o(Wi, "TreebankDataItem");
const Kn = class {
  constructor(e, t, r) {
    if (!e)
      throw new Error("Item cannot be empty");
    if (!t)
      throw new Error("Key cannot be empty");
    if (!r)
      throw new Error("Storage adapter object should be provided");
    for (const n of Object.keys(e))
      this[n] = e[n];
    this.currentValue = this.defaultValue, this.name = t, this.storageAdapter = r;
  }
  textValues() {
    return this.values.map((e) => e.text);
  }
  /**
   * If `prop` is not specified, returns a value object of a current item.
   * Otherwise, returns a value of a property specified by `prop`.
   *
   * @param {string} prop - A name of a property of a current items that must be returned.
   *        Values currently supported are: `text`, `value`, undefined.
   * @returns {* | Array<*>} - A single item or an array of items. Item type depends
   * on the value of the `prop` or the lack of it.
   */
  currentItem(e = void 0) {
    let t = [];
    for (const r of this.values)
      if (this.multiValue) {
        if (this.currentValue.includes(r.value)) {
          const n = e ? r[e] : r;
          t.push(n);
        }
      } else
        r.value === this.currentValue && (t = e ? r[e] : r);
    return t;
  }
  currentTextValue() {
    return this.currentItem("text");
  }
  addValue(e, t) {
    return this.values.push({ value: e, text: t }), this;
  }
  setValue(e) {
    return this.currentValue = e, this.save(), this;
  }
  setTextValue(e) {
    this.currentValue = this.multiValue ? [] : "";
    for (const t of this.values)
      if (this.multiValue)
        for (const r of e)
          t.text === r && this.currentValue.push(t.value);
      else
        t.text === e && (this.currentValue = t.value);
    return this.save(), this;
  }
  removeItem() {
    this.currentValue = null, this.storageAdapter.remove(this.name).then(
      () => {
      },
      (e) => {
        F.getInstance().error(`Unexpected error resetting Alpheios option ${this.name}: ${e}`);
      }
    );
  }
  /**
   * Saves an option value to the local storage.
   */
  save() {
    let e = {};
    e[this.name] = JSON.stringify(this.currentValue), this.storageAdapter.set(e).then(
      () => {
      },
      (t) => {
        F.getInstance().error(`Unexpected error storing Alpheios option ${this.name}: ${t}`);
      }
    );
  }
  /**
   *
   * @param {Array[Object]} valuesArr - Array[option's values]
   */
  uploadValuesFromArray(e) {
    this.values = [...e], this.defaultValue = this.values[0].value;
  }
};
o(Kn, "OptionItem");
let as = Kn;
const Ji = class ke {
  /**
   * Options is a class which encapsulates defaults and user preferences
   *
   * @param {object} defaults - defaults for the instance of the class.
   * Use DefaultsLoader class to convert defaults data from different sources.
   * Mandatory fields:
   *    {string} domain - A domain name that defines options context
   *    {Object} items - An object that represents options that are exposed to the user. Each property is an option name.
   * @param {StorageAdapter} storageAdapter - A storage adapter implementation
   */
  constructor(e, t) {
    if (!e || !e.domain || !e.items || !e.version)
      throw new Error('Defaults have no obligatory "domain", "version" and "items" properties');
    if (!t)
      throw new Error("No storage adapter implementation provided");
    this.defaults = e, this.domain = e.domain, this.version = e.version.toString(), this.storageAdapter = t, this.items = ke.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
  }
  static initItems(e, t, r, n) {
    let a = {};
    for (const [i, l] of Object.entries(e))
      if (l.group) {
        a[i] = [];
        for (const [p, u] of Object.entries(l.group)) {
          const f = ke.constructKey(r, n, i, p);
          a[i].push(new as(u, f, t));
        }
      } else {
        const p = ke.constructKey(r, n, i);
        a[i] = new as(l, p, t);
      }
    return a;
  }
  /**
   * Reset all options to default values
   */
  reset() {
    return ye(this, null, function* () {
      yield this.storageAdapter.clearAll(), this.items = ke.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
    });
  }
  get names() {
    return Object.keys(this.items);
  }
  /**
   * Loads options from the storage. Returns a promise that is resolved if options are loaded
   * successfully and that is rejectd if there was an error retrieving them.
   *
   * @returns {Promise<Options>}
   */
  load() {
    return ye(this, null, function* () {
      try {
        const e = yield this.storageAdapter.get();
        for (const t in e) {
          const r = ke.parseKey(t);
          if (this.items.hasOwnProperty(r.name) && this.version === r.version)
            if (r.group)
              this.items[r.name].forEach((n) => {
                if (n.name === t)
                  try {
                    n.currentValue = JSON.parse(e[t]);
                  } catch (a) {
                    F.getInstance().warn(`Unable to parse Alpheios option value for  ${r.name} from ${e[r.name]}`, a);
                  }
              });
            else
              try {
                this.items[r.name].currentValue = JSON.parse(e[t]);
              } catch (n) {
                F.getInstance().warn(`Unable to parse Alpheios option value for  ${r.name} from ${e[r.name]}`, n);
              }
        }
        return this;
      } catch (e) {
        const t = `Unexpected error retrieving options for Alpheios from local storage: ${e}. Default values will be used instead`;
        F.getInstance().error(t);
      }
    });
  }
  /**
   * Construct a key for a stored setting
   * To future proof the stored settings, we include domain and version
   * in the key name. Grouped settings are also flattened.
   *
   * @param {string} domain - the setting domain
   * @param {string} version - the setting version
   * @param {string} name - the setting name
   * @param {string} group - optional setting group
   */
  static constructKey(e, t, r, n = null) {
    let a = `${e}__${t}__${r}`;
    return n && (a = `${a}__${n}`), a;
  }
  /**
   * Parse a stored setting name into a semantically meaningful object
   *
   * @param key
   */
  static parseKey(e) {
    const [t, r, n, a] = e.split("__", 4);
    let i;
    try {
      i = {
        domain: t,
        version: r,
        name: n,
        group: a
      };
    } catch {
      F.getInstance().warn(`Failed to parse stored Alpheios options key ${e}`);
    }
    return i;
  }
  /**
   * Converts optionItems to the object: { name of the option: currentValue }
   *
   * @returns {object}
   */
  get formatLabelValueList() {
    let e = {};
    return Object.keys(this.items).forEach((t) => {
      this.items[t].currentValue !== void 0 && (e[t] = this.items[t].currentValue);
    }), e;
  }
  /**
   * Uploads values list from array if an option has valuesArray feature
   *
   * @param {object} valuesArrayList - with format nameValuesArray: Array[option's values]
   */
  checkAndUploadValuesFromArray(e) {
    Object.values(this.items).forEach((t) => {
      t.valuesArray && !t.values && e[t.valuesArray] && t.uploadValuesFromArray(e[t.valuesArray]);
    });
  }
  /**
   *
   * @param {string} domainPostfix - additional string for creating unique domain name
   * @param {StorageAdapter} storageAdapter - class of the storage adapter
   */
  clone(e, t) {
    let r = Object.assign({}, this.defaults);
    r.domain = `${r.domain}-${e}`;
    const n = new ke(r, new t(r.domain));
    return Object.keys(n.items).forEach((a) => {
      let i = n.items[a];
      this.items[a].values && i.uploadValuesFromArray(this.items[a].values);
    }), n;
  }
};
o(Ji, "Options");
const Hi = class {
  static fromJSON(e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      return F.getInstance().error("Unable to parse Alpheios JSON options string:", t), {};
    }
  }
};
o(Hi, "DefaultsLoader");
const Gn = class {
  constructor(e = "alpheios-storage-domain") {
    this.domain = e;
  }
  /**
   * Stores one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(e) {
    return new Promise((t, r) => r(new Error("Set method should be implemented in a subclass")));
  }
  /**
   * Retrieves one or several values from local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(e) {
    return new Promise((t, r) => r(new Error("Get method should be implemented in a subclass")));
  }
  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from local storage.
   *
   * @param {string} key - key of the item to be removed.
   * If a particular item exists, it will be removed.
   * @returns {Promise} - A promise that is resolved with with true if a key was removed
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  remove(e) {
    return new Promise((t, r) => r(new Error("Remove method should be implemented in a subclass")));
  }
  /**
   * clear all items in the storage
   */
  clearAll() {
    return new Promise((e, t) => t(new Error("clearAll method should be implemented in a subclass")));
  }
};
o(Gn, "StorageAdapter");
let kt = Gn;
const Ki = class extends kt {
  /**
   * A wrapper around a `browser.storage.sync.set()` of webextension.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(e) {
    return browser.storage.sync.set(e);
  }
  /**
   * A wrapper around a `browser.storage.sync.get()` of webextension. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(e = void 0) {
    return browser.storage.sync.get(e);
  }
  clearAll() {
    return browser.storage.sync.clear();
  }
};
o(Ki, "ExtensionSyncStorage");
const Gi = class extends kt {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(e) {
    return new Promise((t, r) => {
      try {
        let n = window.localStorage.getItem(`${this.domain}-keys`);
        n ? n = JSON.parse(n) : n = [];
        for (const [a, i] of Object.entries(e))
          window.localStorage.setItem(a, i), n.includes(a) || n.push(a);
        window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(n));
      } catch (n) {
        r(n);
      }
      t();
    });
  }
  /**
   * A wrapper around a local storage `removeItem()` function.
   * It allows to remove one key-value pair from the local storage.
   *
   * @param {string} key - a key of the item to be removed.
   * If a pair with the key specified exists, it will be removed.
   * @returns {Promise} - A promise that is resolved with with `true` if a key-value pair was removed
   * successfully. If the pair for removal is not in the storage, a promise is resolved with the `null` value.
   * If a removal operation fails for any reason, a promise is rejected with the error.
   */
  remove(e) {
    return new Promise((t, r) => {
      try {
        if (e) {
          let n = window.localStorage.getItem(`${this.domain}-keys`);
          if (n) {
            n = JSON.parse(n);
            const a = n.indexOf(e);
            a !== -1 && n.splice(a, 1), window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(n)), window.localStorage.removeItem(e), t(!0);
          } else
            t(null);
        }
      } catch (n) {
        r(n);
      }
    });
  }
  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(e = void 0) {
    return new Promise((t, r) => {
      try {
        e ? Array.isArray(e) && e.length === 0 ? e = [] : typeof e == "string" ? e = [e] : typeof e == "object" ? e = Object.keys(e) : e = [] : e = [];
        let n = {};
        e.length === 0 && (e = window.localStorage.getItem(`${this.domain}-keys`), e ? e = JSON.parse(e) : t(n));
        for (const a of e)
          n[a] = window.localStorage.getItem(a);
        t(n);
      } catch (n) {
        r(n);
      }
    });
  }
  clearAll() {
    return new Promise((e, t) => {
      try {
        let r = null, n = window.localStorage.getItem(`${this.domain}-keys`);
        if (n) {
          n = JSON.parse(n);
          for (const a of n)
            window.localStorage.removeItem(a);
          window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify([])), e(!0);
        } else
          e(r);
      } catch (r) {
        t(r);
      }
    });
  }
};
o(Gi, "LocalStorageArea");
function Sr(s, e) {
  return /* @__PURE__ */ o(function() {
    return s.apply(e, arguments);
  }, "wrap");
}
o(Sr, "bind");
const { toString: Qi } = Object.prototype, { getPrototypeOf: Er } = Object, { iterator: Pt, toStringTag: Qn } = Symbol, jt = /* @__PURE__ */ ((s) => (e) => {
  const t = Qi.call(e);
  return s[t] || (s[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), be = /* @__PURE__ */ o((s) => (s = s.toLowerCase(), (e) => jt(e) === s), "kindOfTest"), Nt = /* @__PURE__ */ o((s) => (e) => typeof e === s, "typeOfTest"), { isArray: Ge } = Array, ot = Nt("undefined");
function Qe(s) {
  return s !== null && !ot(s) && s.constructor !== null && !ot(s.constructor) && ue(s.constructor.isBuffer) && s.constructor.isBuffer(s);
}
o(Qe, "isBuffer");
const Xn = be("ArrayBuffer");
function Yn(s) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(s) : e = s && s.buffer && Xn(s.buffer), e;
}
o(Yn, "isArrayBufferView");
const Xi = Nt("string"), ue = Nt("function"), Zn = Nt("number"), ct = /* @__PURE__ */ o((s) => s !== null && typeof s == "object", "isObject"), Yi = /* @__PURE__ */ o((s) => s === !0 || s === !1, "isBoolean"), yt = /* @__PURE__ */ o((s) => {
  if (jt(s) !== "object")
    return !1;
  const e = Er(s);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Qn in s) && !(Pt in s);
}, "isPlainObject"), Zi = /* @__PURE__ */ o((s) => {
  if (!ct(s) || Qe(s))
    return !1;
  try {
    return Object.keys(s).length === 0 && Object.getPrototypeOf(s) === Object.prototype;
  } catch {
    return !1;
  }
}, "isEmptyObject"), eo = be("Date"), to = be("File"), ro = be("Blob"), so = be("FileList"), no = /* @__PURE__ */ o((s) => ct(s) && ue(s.pipe), "isStream"), ao = /* @__PURE__ */ o((s) => {
  let e;
  return s && (typeof FormData == "function" && s instanceof FormData || ue(s.append) && ((e = jt(s)) === "formdata" || // detect form-data instance
  e === "object" && ue(s.toString) && s.toString() === "[object FormData]"));
}, "isFormData"), io = be("URLSearchParams"), [oo, uo, lo, co] = ["ReadableStream", "Request", "Response", "Headers"].map(be), ho = /* @__PURE__ */ o((s) => s.trim ? s.trim() : s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), "trim");
function Xe(s, e, { allOwnKeys: t = !1 } = {}) {
  if (s === null || typeof s > "u")
    return;
  let r, n;
  if (typeof s != "object" && (s = [s]), Ge(s))
    for (r = 0, n = s.length; r < n; r++)
      e.call(null, s[r], r, s);
  else {
    if (Qe(s))
      return;
    const a = t ? Object.getOwnPropertyNames(s) : Object.keys(s), i = a.length;
    let l;
    for (r = 0; r < i; r++)
      l = a[r], e.call(null, s[l], l, s);
  }
}
o(Xe, "forEach");
function Ir(s, e) {
  if (Qe(s))
    return null;
  e = e.toLowerCase();
  const t = Object.keys(s);
  let r = t.length, n;
  for (; r-- > 0; )
    if (n = t[r], e === n.toLowerCase())
      return n;
  return null;
}
o(Ir, "findKey");
const Pe = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ea = /* @__PURE__ */ o((s) => !ot(s) && s !== Pe, "isContextDefined");
function _t() {
  const { caseless: s } = ea(this) && this || {}, e = {}, t = /* @__PURE__ */ o((r, n) => {
    const a = s && Ir(e, n) || n;
    yt(e[a]) && yt(r) ? e[a] = _t(e[a], r) : yt(r) ? e[a] = _t({}, r) : Ge(r) ? e[a] = r.slice() : e[a] = r;
  }, "assignValue");
  for (let r = 0, n = arguments.length; r < n; r++)
    arguments[r] && Xe(arguments[r], t);
  return e;
}
o(_t, "merge");
const fo = /* @__PURE__ */ o((s, e, t, { allOwnKeys: r } = {}) => (Xe(e, (n, a) => {
  t && ue(n) ? s[a] = Sr(n, t) : s[a] = n;
}, { allOwnKeys: r }), s), "extend"), po = /* @__PURE__ */ o((s) => (s.charCodeAt(0) === 65279 && (s = s.slice(1)), s), "stripBOM"), go = /* @__PURE__ */ o((s, e, t, r) => {
  s.prototype = Object.create(e.prototype, r), s.prototype.constructor = s, Object.defineProperty(s, "super", {
    value: e.prototype
  }), t && Object.assign(s.prototype, t);
}, "inherits"), mo = /* @__PURE__ */ o((s, e, t, r) => {
  let n, a, i;
  const l = {};
  if (e = e || {}, s == null) return e;
  do {
    for (n = Object.getOwnPropertyNames(s), a = n.length; a-- > 0; )
      i = n[a], (!r || r(i, s, e)) && !l[i] && (e[i] = s[i], l[i] = !0);
    s = t !== !1 && Er(s);
  } while (s && (!t || t(s, e)) && s !== Object.prototype);
  return e;
}, "toFlatObject"), yo = /* @__PURE__ */ o((s, e, t) => {
  s = String(s), (t === void 0 || t > s.length) && (t = s.length), t -= e.length;
  const r = s.indexOf(e, t);
  return r !== -1 && r === t;
}, "endsWith"), bo = /* @__PURE__ */ o((s) => {
  if (!s) return null;
  if (Ge(s)) return s;
  let e = s.length;
  if (!Zn(e)) return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = s[e];
  return t;
}, "toArray"), wo = /* @__PURE__ */ ((s) => (e) => s && e instanceof s)(typeof Uint8Array < "u" && Er(Uint8Array)), vo = /* @__PURE__ */ o((s, e) => {
  const t = (s && s[Pt]).call(s);
  let r;
  for (; (r = t.next()) && !r.done; ) {
    const n = r.value;
    e.call(s, n[0], n[1]);
  }
}, "forEachEntry"), So = /* @__PURE__ */ o((s, e) => {
  let t;
  const r = [];
  for (; (t = s.exec(e)) !== null; )
    r.push(t);
  return r;
}, "matchAll"), Eo = be("HTMLFormElement"), Io = /* @__PURE__ */ o((s) => s.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  /* @__PURE__ */ o(function(e, t, r) {
    return t.toUpperCase() + r;
  }, "replacer")
), "toCamelCase"), is = (({ hasOwnProperty: s }) => (e, t) => s.call(e, t))(Object.prototype), Oo = be("RegExp"), ta = /* @__PURE__ */ o((s, e) => {
  const t = Object.getOwnPropertyDescriptors(s), r = {};
  Xe(t, (n, a) => {
    let i;
    (i = e(n, a, s)) !== !1 && (r[a] = i || n);
  }), Object.defineProperties(s, r);
}, "reduceDescriptors"), xo = /* @__PURE__ */ o((s) => {
  ta(s, (e, t) => {
    if (ue(s) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const r = s[t];
    if (ue(r)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, "freezeMethods"), Do = /* @__PURE__ */ o((s, e) => {
  const t = {}, r = /* @__PURE__ */ o((n) => {
    n.forEach((a) => {
      t[a] = !0;
    });
  }, "define");
  return Ge(s) ? r(s) : r(String(s).split(e)), t;
}, "toObjectSet"), Co = /* @__PURE__ */ o(() => {
}, "noop"), Ao = /* @__PURE__ */ o((s, e) => s != null && Number.isFinite(s = +s) ? s : e, "toFiniteNumber");
function ra(s) {
  return !!(s && ue(s.append) && s[Qn] === "FormData" && s[Pt]);
}
o(ra, "isSpecCompliantForm");
const _o = /* @__PURE__ */ o((s) => {
  const e = new Array(10), t = /* @__PURE__ */ o((r, n) => {
    if (ct(r)) {
      if (e.indexOf(r) >= 0)
        return;
      if (Qe(r))
        return r;
      if (!("toJSON" in r)) {
        e[n] = r;
        const a = Ge(r) ? [] : {};
        return Xe(r, (i, l) => {
          const p = t(i, n + 1);
          !ot(p) && (a[l] = p);
        }), e[n] = void 0, a;
      }
    }
    return r;
  }, "visit");
  return t(s, 0);
}, "toJSONObject"), To = be("AsyncFunction"), Fo = /* @__PURE__ */ o((s) => s && (ct(s) || ue(s)) && ue(s.then) && ue(s.catch), "isThenable"), sa = ((s, e) => s ? setImmediate : e ? ((t, r) => (Pe.addEventListener("message", ({ source: n, data: a }) => {
  n === Pe && a === t && r.length && r.shift()();
}, !1), (n) => {
  r.push(n), Pe.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  ue(Pe.postMessage)
), Lo = typeof queueMicrotask < "u" ? queueMicrotask.bind(Pe) : typeof process < "u" && process.nextTick || sa, Ro = /* @__PURE__ */ o((s) => s != null && ue(s[Pt]), "isIterable"), g = {
  isArray: Ge,
  isArrayBuffer: Xn,
  isBuffer: Qe,
  isFormData: ao,
  isArrayBufferView: Yn,
  isString: Xi,
  isNumber: Zn,
  isBoolean: Yi,
  isObject: ct,
  isPlainObject: yt,
  isEmptyObject: Zi,
  isReadableStream: oo,
  isRequest: uo,
  isResponse: lo,
  isHeaders: co,
  isUndefined: ot,
  isDate: eo,
  isFile: to,
  isBlob: ro,
  isRegExp: Oo,
  isFunction: ue,
  isStream: no,
  isURLSearchParams: io,
  isTypedArray: wo,
  isFileList: so,
  forEach: Xe,
  merge: _t,
  extend: fo,
  trim: ho,
  stripBOM: po,
  inherits: go,
  toFlatObject: mo,
  kindOf: jt,
  kindOfTest: be,
  endsWith: yo,
  toArray: bo,
  forEachEntry: vo,
  matchAll: So,
  isHTMLForm: Eo,
  hasOwnProperty: is,
  hasOwnProp: is,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ta,
  freezeMethods: xo,
  toObjectSet: Do,
  toCamelCase: Io,
  noop: Co,
  toFiniteNumber: Ao,
  findKey: Ir,
  global: Pe,
  isContextDefined: ea,
  isSpecCompliantForm: ra,
  toJSONObject: _o,
  isAsyncFn: To,
  isThenable: Fo,
  setImmediate: sa,
  asap: Lo,
  isIterable: Ro
};
function A(s, e, t, r, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = s, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), r && (this.request = r), n && (this.response = n, this.status = n.status ? n.status : null);
}
o(A, "AxiosError$1");
g.inherits(A, Error, {
  toJSON: /* @__PURE__ */ o(function() {
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
      config: g.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }, "toJSON")
});
const na = A.prototype, aa = {};
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
].forEach((s) => {
  aa[s] = { value: s };
});
Object.defineProperties(A, aa);
Object.defineProperty(na, "isAxiosError", { value: !0 });
A.from = (s, e, t, r, n, a) => {
  const i = Object.create(na);
  return g.toFlatObject(s, i, /* @__PURE__ */ o(function(l) {
    return l !== Error.prototype;
  }, "filter"), (l) => l !== "isAxiosError"), A.call(i, s.message, e, t, r, n), i.cause = s, i.name = s.name, a && Object.assign(i, a), i;
};
const ko = null;
function Tt(s) {
  return g.isPlainObject(s) || g.isArray(s);
}
o(Tt, "isVisitable");
function Or(s) {
  return g.endsWith(s, "[]") ? s.slice(0, -2) : s;
}
o(Or, "removeBrackets");
function or(s, e, t) {
  return s ? s.concat(e).map(/* @__PURE__ */ o(function(r, n) {
    return r = Or(r), !t && n ? "[" + r + "]" : r;
  }, "each")).join(t ? "." : "") : e;
}
o(or, "renderKey");
function ia(s) {
  return g.isArray(s) && !s.some(Tt);
}
o(ia, "isFlatArray");
const Po = g.toFlatObject(g, {}, null, /* @__PURE__ */ o(function(s) {
  return /^is[A-Z]/.test(s);
}, "filter"));
function ht(s, e, t) {
  if (!g.isObject(s))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = g.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, /* @__PURE__ */ o(function(m, x) {
    return !g.isUndefined(x[m]);
  }, "defined"));
  const r = t.metaTokens, n = t.visitor || u, a = t.dots, i = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && g.isSpecCompliantForm(e);
  if (!g.isFunction(n))
    throw new TypeError("visitor must be a function");
  function p(m) {
    if (m === null) return "";
    if (g.isDate(m))
      return m.toISOString();
    if (g.isBoolean(m))
      return m.toString();
    if (!l && g.isBlob(m))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return g.isArrayBuffer(m) || g.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  o(p, "convertValue");
  function u(m, x, v) {
    let G = m;
    if (m && !v && typeof m == "object") {
      if (g.endsWith(x, "{}"))
        x = r ? x : x.slice(0, -2), m = JSON.stringify(m);
      else if (g.isArray(m) && ia(m) || (g.isFileList(m) || g.endsWith(x, "[]")) && (G = g.toArray(m)))
        return x = Or(x), G.forEach(/* @__PURE__ */ o(function(W, $) {
          !(g.isUndefined(W) || W === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? or([x], $, a) : i === null ? x : x + "[]",
            p(W)
          );
        }, "each")), !1;
    }
    return Tt(m) ? !0 : (e.append(or(v, x, a), p(m)), !1);
  }
  o(u, "defaultVisitor");
  const f = [], y = Object.assign(Po, {
    defaultVisitor: u,
    convertValue: p,
    isVisitable: Tt
  });
  function w(m, x) {
    if (!g.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + x.join("."));
      f.push(m), g.forEach(m, /* @__PURE__ */ o(function(v, G) {
        (!(g.isUndefined(v) || v === null) && n.call(
          e,
          v,
          g.isString(G) ? G.trim() : G,
          x,
          y
        )) === !0 && w(v, x ? x.concat(G) : [G]);
      }, "each")), f.pop();
    }
  }
  if (o(w, "build"), !g.isObject(s))
    throw new TypeError("data must be an object");
  return w(s), e;
}
o(ht, "toFormData$1");
function ur(s) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(s).replace(/[!'()~]|%20|%00/g, /* @__PURE__ */ o(function(t) {
    return e[t];
  }, "replacer"));
}
o(ur, "encode$1");
function Ut(s, e) {
  this._pairs = [], s && ht(s, this, e);
}
o(Ut, "AxiosURLSearchParams");
const oa = Ut.prototype;
oa.append = /* @__PURE__ */ o(function(s, e) {
  this._pairs.push([s, e]);
}, "append");
oa.toString = /* @__PURE__ */ o(function(s) {
  const e = s ? function(t) {
    return s.call(this, t, ur);
  } : ur;
  return this._pairs.map(/* @__PURE__ */ o(function(t) {
    return e(t[0]) + "=" + e(t[1]);
  }, "each"), "").join("&");
}, "toString");
function ua(s) {
  return encodeURIComponent(s).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
o(ua, "encode");
function xr(s, e, t) {
  if (!e)
    return s;
  const r = t && t.encode || ua;
  g.isFunction(t) && (t = {
    serialize: t
  });
  const n = t && t.serialize;
  let a;
  if (n ? a = n(e, t) : a = g.isURLSearchParams(e) ? e.toString() : new Ut(e, t).toString(r), a) {
    const i = s.indexOf("#");
    i !== -1 && (s = s.slice(0, i)), s += (s.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return s;
}
o(xr, "buildURL");
const la = class {
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
  use(e, t, r) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
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
    g.forEach(this.handlers, /* @__PURE__ */ o(function(t) {
      t !== null && e(t);
    }, "forEachHandler"));
  }
};
o(la, "InterceptorManager");
let os = la;
const ca = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, jo = typeof URLSearchParams < "u" ? URLSearchParams : Ut, No = typeof FormData < "u" ? FormData : null, Uo = typeof Blob < "u" ? Blob : null, Mo = {
  isBrowser: !0,
  classes: {
    URLSearchParams: jo,
    FormData: No,
    Blob: Uo
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Dr = typeof window < "u" && typeof document < "u", lr = typeof navigator == "object" && navigator || void 0, Vo = Dr && (!lr || ["ReactNative", "NativeScript", "NS"].indexOf(lr.product) < 0), Bo = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", $o = Dr && window.location.href || "http://localhost", zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Dr,
  hasStandardBrowserEnv: Vo,
  hasStandardBrowserWebWorkerEnv: Bo,
  navigator: lr,
  origin: $o
}, Symbol.toStringTag, { value: "Module" })), ae = Ne(Ne({}, zo), Mo);
function ha(s, e) {
  return ht(s, new ae.classes.URLSearchParams(), Ne({
    visitor: /* @__PURE__ */ o(function(t, r, n, a) {
      return ae.isNode && g.isBuffer(t) ? (this.append(r, t.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }, "visitor")
  }, e));
}
o(ha, "toURLEncodedForm");
function da(s) {
  return g.matchAll(/\w+|\[(\w*)]/g, s).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
o(da, "parsePropPath");
function fa(s) {
  const e = {}, t = Object.keys(s);
  let r;
  const n = t.length;
  let a;
  for (r = 0; r < n; r++)
    a = t[r], e[a] = s[a];
  return e;
}
o(fa, "arrayToObject");
function Cr(s) {
  function e(t, r, n, a) {
    let i = t[a++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i), p = a >= t.length;
    return i = !i && g.isArray(n) ? n.length : i, p ? (g.hasOwnProp(n, i) ? n[i] = [n[i], r] : n[i] = r, !l) : ((!n[i] || !g.isObject(n[i])) && (n[i] = []), e(t, r, n[i], a) && g.isArray(n[i]) && (n[i] = fa(n[i])), !l);
  }
  if (o(e, "buildPath"), g.isFormData(s) && g.isFunction(s.entries)) {
    const t = {};
    return g.forEachEntry(s, (r, n) => {
      e(da(r), n, t, 0);
    }), t;
  }
  return null;
}
o(Cr, "formDataToJSON");
function pa(s, e, t) {
  if (g.isString(s))
    try {
      return (e || JSON.parse)(s), g.trim(s);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (t || JSON.stringify)(s);
}
o(pa, "stringifySafely");
const dt = {
  transitional: ca,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [/* @__PURE__ */ o(function(s, e) {
    const t = e.getContentType() || "", r = t.indexOf("application/json") > -1, n = g.isObject(s);
    if (n && g.isHTMLForm(s) && (s = new FormData(s)), g.isFormData(s))
      return r ? JSON.stringify(Cr(s)) : s;
    if (g.isArrayBuffer(s) || g.isBuffer(s) || g.isStream(s) || g.isFile(s) || g.isBlob(s) || g.isReadableStream(s))
      return s;
    if (g.isArrayBufferView(s))
      return s.buffer;
    if (g.isURLSearchParams(s))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), s.toString();
    let a;
    if (n) {
      if (t.indexOf("application/x-www-form-urlencoded") > -1)
        return ha(s, this.formSerializer).toString();
      if ((a = g.isFileList(s)) || t.indexOf("multipart/form-data") > -1) {
        const i = this.env && this.env.FormData;
        return ht(
          a ? { "files[]": s } : s,
          i && new i(),
          this.formSerializer
        );
      }
    }
    return n || r ? (e.setContentType("application/json", !1), pa(s)) : s;
  }, "transformRequest")],
  transformResponse: [/* @__PURE__ */ o(function(s) {
    const e = this.transitional || dt.transitional, t = e && e.forcedJSONParsing, r = this.responseType === "json";
    if (g.isResponse(s) || g.isReadableStream(s))
      return s;
    if (s && g.isString(s) && (t && !this.responseType || r)) {
      const n = !(e && e.silentJSONParsing) && r;
      try {
        return JSON.parse(s);
      } catch (a) {
        if (n)
          throw a.name === "SyntaxError" ? A.from(a, A.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return s;
  }, "transformResponse")],
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
    FormData: ae.classes.FormData,
    Blob: ae.classes.Blob
  },
  validateStatus: /* @__PURE__ */ o(function(s) {
    return s >= 200 && s < 300;
  }, "validateStatus"),
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
g.forEach(["delete", "get", "head", "post", "put", "patch"], (s) => {
  dt.headers[s] = {};
});
const qo = g.toObjectSet([
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
]), Wo = /* @__PURE__ */ o((s) => {
  const e = {};
  let t, r, n;
  return s && s.split(`
`).forEach(/* @__PURE__ */ o(function(a) {
    n = a.indexOf(":"), t = a.substring(0, n).trim().toLowerCase(), r = a.substring(n + 1).trim(), !(!t || e[t] && qo[t]) && (t === "set-cookie" ? e[t] ? e[t].push(r) : e[t] = [r] : e[t] = e[t] ? e[t] + ", " + r : r);
  }, "parser")), e;
}, "parseHeaders"), us = Symbol("internals");
function ze(s) {
  return s && String(s).trim().toLowerCase();
}
o(ze, "normalizeHeader");
function nt(s) {
  return s === !1 || s == null ? s : g.isArray(s) ? s.map(nt) : String(s);
}
o(nt, "normalizeValue");
function ga(s) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = t.exec(s); )
    e[r[1]] = r[2];
  return e;
}
o(ga, "parseTokens");
const Jo = /* @__PURE__ */ o((s) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(s.trim()), "isValidHeaderName");
function bt(s, e, t, r, n) {
  if (g.isFunction(r))
    return r.call(this, e, t);
  if (n && (e = t), !!g.isString(e)) {
    if (g.isString(r))
      return e.indexOf(r) !== -1;
    if (g.isRegExp(r))
      return r.test(e);
  }
}
o(bt, "matchHeaderValue");
function ma(s) {
  return s.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, r) => t.toUpperCase() + r);
}
o(ma, "formatHeader");
function ya(s, e) {
  const t = g.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(s, r + t, {
      value: /* @__PURE__ */ o(function(n, a, i) {
        return this[r].call(this, e, n, a, i);
      }, "value"),
      configurable: !0
    });
  });
}
o(ya, "buildAccessors");
var Jt;
let le = (Jt = class {
  constructor(s) {
    s && this.set(s);
  }
  set(s, e, t) {
    const r = this;
    function n(i, l, p) {
      const u = ze(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const f = g.findKey(r, u);
      (!f || r[f] === void 0 || p === !0 || p === void 0 && r[f] !== !1) && (r[f || l] = nt(i));
    }
    o(n, "setHeader");
    const a = /* @__PURE__ */ o((i, l) => g.forEach(i, (p, u) => n(p, u, l)), "setHeaders");
    if (g.isPlainObject(s) || s instanceof this.constructor)
      a(s, e);
    else if (g.isString(s) && (s = s.trim()) && !Jo(s))
      a(Wo(s), e);
    else if (g.isObject(s) && g.isIterable(s)) {
      let i = {}, l, p;
      for (const u of s) {
        if (!g.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        i[p = u[0]] = (l = i[p]) ? g.isArray(l) ? [...l, u[1]] : [l, u[1]] : u[1];
      }
      a(i, e);
    } else
      s != null && n(e, s, t);
    return this;
  }
  get(s, e) {
    if (s = ze(s), s) {
      const t = g.findKey(this, s);
      if (t) {
        const r = this[t];
        if (!e)
          return r;
        if (e === !0)
          return ga(r);
        if (g.isFunction(e))
          return e.call(this, r, t);
        if (g.isRegExp(e))
          return e.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(s, e) {
    if (s = ze(s), s) {
      const t = g.findKey(this, s);
      return !!(t && this[t] !== void 0 && (!e || bt(this, this[t], t, e)));
    }
    return !1;
  }
  delete(s, e) {
    const t = this;
    let r = !1;
    function n(a) {
      if (a = ze(a), a) {
        const i = g.findKey(t, a);
        i && (!e || bt(t, t[i], i, e)) && (delete t[i], r = !0);
      }
    }
    return o(n, "deleteHeader"), g.isArray(s) ? s.forEach(n) : n(s), r;
  }
  clear(s) {
    const e = Object.keys(this);
    let t = e.length, r = !1;
    for (; t--; ) {
      const n = e[t];
      (!s || bt(this, this[n], n, s, !0)) && (delete this[n], r = !0);
    }
    return r;
  }
  normalize(s) {
    const e = this, t = {};
    return g.forEach(this, (r, n) => {
      const a = g.findKey(t, n);
      if (a) {
        e[a] = nt(r), delete e[n];
        return;
      }
      const i = s ? ma(n) : String(n).trim();
      i !== n && delete e[n], e[i] = nt(r), t[i] = !0;
    }), this;
  }
  concat(...s) {
    return this.constructor.concat(this, ...s);
  }
  toJSON(s) {
    const e = /* @__PURE__ */ Object.create(null);
    return g.forEach(this, (t, r) => {
      t != null && t !== !1 && (e[r] = s && g.isArray(t) ? t.join(", ") : t);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([s, e]) => s + ": " + e).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(s) {
    return s instanceof this ? s : new this(s);
  }
  static concat(s, ...e) {
    const t = new this(s);
    return e.forEach((r) => t.set(r)), t;
  }
  static accessor(s) {
    const e = (this[us] = this[us] = {
      accessors: {}
    }).accessors, t = this.prototype;
    function r(n) {
      const a = ze(n);
      e[a] || (ya(t, n), e[a] = !0);
    }
    return o(r, "defineAccessor"), g.isArray(s) ? s.forEach(r) : r(s), this;
  }
}, o(Jt, "AxiosHeaders"), Jt);
le.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
g.reduceDescriptors(le.prototype, ({ value: s }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: /* @__PURE__ */ o(() => s, "get"),
    set(r) {
      this[t] = r;
    }
  };
});
g.freezeMethods(le);
function wt(s, e) {
  const t = this || dt, r = e || t, n = le.from(r.headers);
  let a = r.data;
  return g.forEach(s, /* @__PURE__ */ o(function(i) {
    a = i.call(t, a, n.normalize(), e ? e.status : void 0);
  }, "transform")), n.normalize(), a;
}
o(wt, "transformData");
function Ar(s) {
  return !!(s && s.__CANCEL__);
}
o(Ar, "isCancel$1");
function Me(s, e, t) {
  A.call(this, s ?? "canceled", A.ERR_CANCELED, e, t), this.name = "CanceledError";
}
o(Me, "CanceledError$1");
g.inherits(Me, A, {
  __CANCEL__: !0
});
function _r(s, e, t) {
  const r = t.config.validateStatus;
  !t.status || !r || r(t.status) ? s(t) : e(new A(
    "Request failed with status code " + t.status,
    [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
o(_r, "settle");
function ba(s) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(s);
  return e && e[1] || "";
}
o(ba, "parseProtocol");
function wa(s, e) {
  s = s || 10;
  const t = new Array(s), r = new Array(s);
  let n = 0, a = 0, i;
  return e = e !== void 0 ? e : 1e3, /* @__PURE__ */ o(function(l) {
    const p = Date.now(), u = r[a];
    i || (i = p), t[n] = l, r[n] = p;
    let f = a, y = 0;
    for (; f !== n; )
      y += t[f++], f = f % s;
    if (n = (n + 1) % s, n === a && (a = (a + 1) % s), p - i < e)
      return;
    const w = u && p - u;
    return w ? Math.round(y * 1e3 / w) : void 0;
  }, "push");
}
o(wa, "speedometer");
function va(s, e) {
  let t = 0, r = 1e3 / e, n, a;
  const i = /* @__PURE__ */ o((l, p = Date.now()) => {
    t = p, n = null, a && (clearTimeout(a), a = null), s(...l);
  }, "invoke");
  return [/* @__PURE__ */ o((...l) => {
    const p = Date.now(), u = p - t;
    u >= r ? i(l, p) : (n = l, a || (a = setTimeout(() => {
      a = null, i(n);
    }, r - u)));
  }, "throttled"), /* @__PURE__ */ o(() => n && i(n), "flush")];
}
o(va, "throttle");
const Ft = /* @__PURE__ */ o((s, e, t = 3) => {
  let r = 0;
  const n = wa(50, 250);
  return va((a) => {
    const i = a.loaded, l = a.lengthComputable ? a.total : void 0, p = i - r, u = n(p), f = i <= l;
    r = i;
    const y = {
      loaded: i,
      total: l,
      progress: l ? i / l : void 0,
      bytes: p,
      rate: u || void 0,
      estimated: u && l && f ? (l - i) / u : void 0,
      event: a,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    s(y);
  }, t);
}, "progressEventReducer"), ls = /* @__PURE__ */ o((s, e) => {
  const t = s != null;
  return [(r) => e[0]({
    lengthComputable: t,
    total: s,
    loaded: r
  }), e[1]];
}, "progressEventDecorator"), cs = /* @__PURE__ */ o((s) => (...e) => g.asap(() => s(...e)), "asyncDecorator"), Ho = ae.hasStandardBrowserEnv ? /* @__PURE__ */ ((s, e) => (t) => (t = new URL(t, ae.origin), s.protocol === t.protocol && s.host === t.host && (e || s.port === t.port)))(
  new URL(ae.origin),
  ae.navigator && /(msie|trident)/i.test(ae.navigator.userAgent)
) : () => !0, Ko = ae.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(s, e, t, r, n, a) {
      const i = [s + "=" + encodeURIComponent(e)];
      g.isNumber(t) && i.push("expires=" + new Date(t).toGMTString()), g.isString(r) && i.push("path=" + r), g.isString(n) && i.push("domain=" + n), a === !0 && i.push("secure"), document.cookie = i.join("; ");
    },
    read(s) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + s + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(s) {
      this.write(s, "", Date.now() - 864e5);
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
function Sa(s) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(s);
}
o(Sa, "isAbsoluteURL");
function Ea(s, e) {
  return e ? s.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : s;
}
o(Ea, "combineURLs");
function Tr(s, e, t) {
  let r = !Sa(e);
  return s && (r || t == !1) ? Ea(s, e) : e;
}
o(Tr, "buildFullPath");
const hs = /* @__PURE__ */ o((s) => s instanceof le ? Ne({}, s) : s, "headersToObject");
function Le(s, e) {
  e = e || {};
  const t = {};
  function r(u, f, y, w) {
    return g.isPlainObject(u) && g.isPlainObject(f) ? g.merge.call({ caseless: w }, u, f) : g.isPlainObject(f) ? g.merge({}, f) : g.isArray(f) ? f.slice() : f;
  }
  o(r, "getMergedValue");
  function n(u, f, y, w) {
    if (g.isUndefined(f)) {
      if (!g.isUndefined(u))
        return r(void 0, u, y, w);
    } else return r(u, f, y, w);
  }
  o(n, "mergeDeepProperties");
  function a(u, f) {
    if (!g.isUndefined(f))
      return r(void 0, f);
  }
  o(a, "valueFromConfig2");
  function i(u, f) {
    if (g.isUndefined(f)) {
      if (!g.isUndefined(u))
        return r(void 0, u);
    } else return r(void 0, f);
  }
  o(i, "defaultToConfig2");
  function l(u, f, y) {
    if (y in e)
      return r(u, f);
    if (y in s)
      return r(void 0, u);
  }
  o(l, "mergeDirectKeys");
  const p = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: /* @__PURE__ */ o((u, f, y) => n(hs(u), hs(f), y, !0), "headers")
  };
  return g.forEach(Object.keys(Ne(Ne({}, s), e)), /* @__PURE__ */ o(function(u) {
    const f = p[u] || n, y = f(s[u], e[u], u);
    g.isUndefined(y) && f !== l || (t[u] = y);
  }, "computeConfigValue")), t;
}
o(Le, "mergeConfig$1");
const Ia = /* @__PURE__ */ o((s) => {
  const e = Le({}, s);
  let { data: t, withXSRFToken: r, xsrfHeaderName: n, xsrfCookieName: a, headers: i, auth: l } = e;
  e.headers = i = le.from(i), e.url = xr(Tr(e.baseURL, e.url, e.allowAbsoluteUrls), s.params, s.paramsSerializer), l && i.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let p;
  if (g.isFormData(t)) {
    if (ae.hasStandardBrowserEnv || ae.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((p = i.getContentType()) !== !1) {
      const [u, ...f] = p ? p.split(";").map((y) => y.trim()).filter(Boolean) : [];
      i.setContentType([u || "multipart/form-data", ...f].join("; "));
    }
  }
  if (ae.hasStandardBrowserEnv && (r && g.isFunction(r) && (r = r(e)), r || r !== !1 && Ho(e.url))) {
    const u = n && a && Ko.read(a);
    u && i.set(n, u);
  }
  return e;
}, "resolveConfig"), Go = typeof XMLHttpRequest < "u", Qo = Go && function(s) {
  return new Promise(/* @__PURE__ */ o(function(e, t) {
    const r = Ia(s);
    let n = r.data;
    const a = le.from(r.headers).normalize();
    let { responseType: i, onUploadProgress: l, onDownloadProgress: p } = r, u, f, y, w, m;
    function x() {
      w && w(), m && m(), r.cancelToken && r.cancelToken.unsubscribe(u), r.signal && r.signal.removeEventListener("abort", u);
    }
    o(x, "done");
    let v = new XMLHttpRequest();
    v.open(r.method.toUpperCase(), r.url, !0), v.timeout = r.timeout;
    function G() {
      if (!v)
        return;
      const $ = le.from(
        "getAllResponseHeaders" in v && v.getAllResponseHeaders()
      ), ge = {
        data: !i || i === "text" || i === "json" ? v.responseText : v.response,
        status: v.status,
        statusText: v.statusText,
        headers: $,
        config: s,
        request: v
      };
      _r(/* @__PURE__ */ o(function(Ce) {
        e(Ce), x();
      }, "_resolve"), /* @__PURE__ */ o(function(Ce) {
        t(Ce), x();
      }, "_reject"), ge), v = null;
    }
    o(G, "onloadend"), "onloadend" in v ? v.onloadend = G : v.onreadystatechange = /* @__PURE__ */ o(function() {
      !v || v.readyState !== 4 || v.status === 0 && !(v.responseURL && v.responseURL.indexOf("file:") === 0) || setTimeout(G);
    }, "handleLoad"), v.onabort = /* @__PURE__ */ o(function() {
      v && (t(new A("Request aborted", A.ECONNABORTED, s, v)), v = null);
    }, "handleAbort"), v.onerror = /* @__PURE__ */ o(function() {
      t(new A("Network Error", A.ERR_NETWORK, s, v)), v = null;
    }, "handleError"), v.ontimeout = /* @__PURE__ */ o(function() {
      let $ = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const ge = r.transitional || ca;
      r.timeoutErrorMessage && ($ = r.timeoutErrorMessage), t(new A(
        $,
        ge.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
        s,
        v
      )), v = null;
    }, "handleTimeout"), n === void 0 && a.setContentType(null), "setRequestHeader" in v && g.forEach(a.toJSON(), /* @__PURE__ */ o(function($, ge) {
      v.setRequestHeader(ge, $);
    }, "setRequestHeader")), g.isUndefined(r.withCredentials) || (v.withCredentials = !!r.withCredentials), i && i !== "json" && (v.responseType = r.responseType), p && ([y, m] = Ft(p, !0), v.addEventListener("progress", y)), l && v.upload && ([f, w] = Ft(l), v.upload.addEventListener("progress", f), v.upload.addEventListener("loadend", w)), (r.cancelToken || r.signal) && (u = /* @__PURE__ */ o(($) => {
      v && (t(!$ || $.type ? new Me(null, s, v) : $), v.abort(), v = null);
    }, "onCanceled"), r.cancelToken && r.cancelToken.subscribe(u), r.signal && (r.signal.aborted ? u() : r.signal.addEventListener("abort", u)));
    const W = ba(r.url);
    if (W && ae.protocols.indexOf(W) === -1) {
      t(new A("Unsupported protocol " + W + ":", A.ERR_BAD_REQUEST, s));
      return;
    }
    v.send(n || null);
  }, "dispatchXhrRequest"));
}, Xo = /* @__PURE__ */ o((s, e) => {
  const { length: t } = s = s ? s.filter(Boolean) : [];
  if (e || t) {
    let r = new AbortController(), n;
    const a = /* @__PURE__ */ o(function(u) {
      if (!n) {
        n = !0, l();
        const f = u instanceof Error ? u : this.reason;
        r.abort(f instanceof A ? f : new Me(f instanceof Error ? f.message : f));
      }
    }, "onabort");
    let i = e && setTimeout(() => {
      i = null, a(new A(`timeout ${e} of ms exceeded`, A.ETIMEDOUT));
    }, e);
    const l = /* @__PURE__ */ o(() => {
      s && (i && clearTimeout(i), i = null, s.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(a) : u.removeEventListener("abort", a);
      }), s = null);
    }, "unsubscribe");
    s.forEach((u) => u.addEventListener("abort", a));
    const { signal: p } = r;
    return p.unsubscribe = () => g.asap(l), p;
  }
}, "composeSignals"), Yo = /* @__PURE__ */ o(function* (s, e) {
  let t = s.byteLength;
  if (t < e) {
    yield s;
    return;
  }
  let r = 0, n;
  for (; r < t; )
    n = r + e, yield s.slice(r, n), r = n;
}, "streamChunk"), Zo = /* @__PURE__ */ o(function(s, e) {
  return ws(this, null, function* () {
    try {
      for (var t = Ka(eu(s)), r, n, a; r = !(n = yield new We(t.next())).done; r = !1) {
        const i = n.value;
        yield* vs(Yo(i, e));
      }
    } catch (i) {
      a = [i];
    } finally {
      try {
        r && (n = t.return) && (yield new We(n.call(t)));
      } finally {
        if (a)
          throw a[0];
      }
    }
  });
}, "readBytes"), eu = /* @__PURE__ */ o(function(s) {
  return ws(this, null, function* () {
    if (s[Symbol.asyncIterator]) {
      yield* vs(s);
      return;
    }
    const e = s.getReader();
    try {
      for (; ; ) {
        const { done: t, value: r } = yield new We(e.read());
        if (t)
          break;
        yield r;
      }
    } finally {
      yield new We(e.cancel());
    }
  });
}, "readStream"), ds = /* @__PURE__ */ o((s, e, t, r) => {
  const n = Zo(s, e);
  let a = 0, i, l = /* @__PURE__ */ o((p) => {
    i || (i = !0, r && r(p));
  }, "_onFinish");
  return new ReadableStream({
    pull(p) {
      return ye(this, null, function* () {
        try {
          const { done: u, value: f } = yield n.next();
          if (u) {
            l(), p.close();
            return;
          }
          let y = f.byteLength;
          if (t) {
            let w = a += y;
            t(w);
          }
          p.enqueue(new Uint8Array(f));
        } catch (u) {
          throw l(u), u;
        }
      });
    },
    cancel(p) {
      return l(p), n.return();
    }
  }, {
    highWaterMark: 2
  });
}, "trackStream"), Mt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Oa = Mt && typeof ReadableStream == "function", tu = Mt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((s) => (e) => s.encode(e))(new TextEncoder()) : (s) => ye(null, null, function* () {
  return new Uint8Array(yield new Response(s).arrayBuffer());
})), xa = /* @__PURE__ */ o((s, ...e) => {
  try {
    return !!s(...e);
  } catch {
    return !1;
  }
}, "test"), ru = Oa && xa(() => {
  let s = !1;
  const e = new Request(ae.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return s = !0, "half";
    }
  }).headers.has("Content-Type");
  return s && !e;
}), fs = 64 * 1024, cr = Oa && xa(() => g.isReadableStream(new Response("").body)), Lt = {
  stream: cr && ((s) => s.body)
};
Mt && ((s) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !Lt[e] && (Lt[e] = g.isFunction(s[e]) ? (t) => t[e]() : (t, r) => {
      throw new A(`Response type '${e}' is not supported`, A.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const su = /* @__PURE__ */ o((s) => ye(null, null, function* () {
  if (s == null)
    return 0;
  if (g.isBlob(s))
    return s.size;
  if (g.isSpecCompliantForm(s))
    return (yield new Request(ae.origin, {
      method: "POST",
      body: s
    }).arrayBuffer()).byteLength;
  if (g.isArrayBufferView(s) || g.isArrayBuffer(s))
    return s.byteLength;
  if (g.isURLSearchParams(s) && (s = s + ""), g.isString(s))
    return (yield tu(s)).byteLength;
}), "getBodyLength"), nu = /* @__PURE__ */ o((s, e) => ye(null, null, function* () {
  const t = g.toFiniteNumber(s.getContentLength());
  return t ?? su(e);
}), "resolveBodyLength"), au = Mt && ((s) => ye(null, null, function* () {
  let {
    url: e,
    method: t,
    data: r,
    signal: n,
    cancelToken: a,
    timeout: i,
    onDownloadProgress: l,
    onUploadProgress: p,
    responseType: u,
    headers: f,
    withCredentials: y = "same-origin",
    fetchOptions: w
  } = Ia(s);
  u = u ? (u + "").toLowerCase() : "text";
  let m = Xo([n, a && a.toAbortSignal()], i), x;
  const v = m && m.unsubscribe && (() => {
    m.unsubscribe();
  });
  let G;
  try {
    if (p && ru && t !== "get" && t !== "head" && (G = yield nu(f, r)) !== 0) {
      let he = new Request(e, {
        method: "POST",
        body: r,
        duplex: "half"
      }), ie;
      if (g.isFormData(r) && (ie = he.headers.get("content-type")) && f.setContentType(ie), he.body) {
        const [M, c] = ls(
          G,
          Ft(cs(p))
        );
        r = ds(he.body, fs, M, c);
      }
    }
    g.isString(y) || (y = y ? "include" : "omit");
    const W = "credentials" in Request.prototype;
    x = new Request(e, Ha(Ne({}, w), {
      signal: m,
      method: t.toUpperCase(),
      headers: f.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: W ? y : void 0
    }));
    let $ = yield fetch(x, w);
    const ge = cr && (u === "stream" || u === "response");
    if (cr && (l || ge && v)) {
      const he = {};
      ["status", "statusText", "headers"].forEach((d) => {
        he[d] = $[d];
      });
      const ie = g.toFiniteNumber($.headers.get("content-length")), [M, c] = l && ls(
        ie,
        Ft(cs(l), !0)
      ) || [];
      $ = new Response(
        ds($.body, fs, M, () => {
          c && c(), v && v();
        }),
        he
      );
    }
    u = u || "text";
    let Ce = yield Lt[g.findKey(Lt, u) || "text"]($, s);
    return !ge && v && v(), yield new Promise((he, ie) => {
      _r(he, ie, {
        data: Ce,
        headers: le.from($.headers),
        status: $.status,
        statusText: $.statusText,
        config: s,
        request: x
      });
    });
  } catch (W) {
    throw v && v(), W && W.name === "TypeError" && /Load failed|fetch/i.test(W.message) ? Object.assign(
      new A("Network Error", A.ERR_NETWORK, s, x),
      {
        cause: W.cause || W
      }
    ) : A.from(W, W && W.code, s, x);
  }
})), hr = {
  http: ko,
  xhr: Qo,
  fetch: au
};
g.forEach(hr, (s, e) => {
  if (s) {
    try {
      Object.defineProperty(s, "name", { value: e });
    } catch {
    }
    Object.defineProperty(s, "adapterName", { value: e });
  }
});
const ps = /* @__PURE__ */ o((s) => `- ${s}`, "renderReason"), iu = /* @__PURE__ */ o((s) => g.isFunction(s) || s === null || s === !1, "isResolvedHandle"), Da = {
  getAdapter: /* @__PURE__ */ o((s) => {
    s = g.isArray(s) ? s : [s];
    const { length: e } = s;
    let t, r;
    const n = {};
    for (let a = 0; a < e; a++) {
      t = s[a];
      let i;
      if (r = t, !iu(t) && (r = hr[(i = String(t)).toLowerCase()], r === void 0))
        throw new A(`Unknown adapter '${i}'`);
      if (r)
        break;
      n[i || "#" + a] = r;
    }
    if (!r) {
      const a = Object.entries(n).map(
        ([l, p]) => `adapter ${l} ` + (p === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = e ? a.length > 1 ? `since :
` + a.map(ps).join(`
`) : " " + ps(a[0]) : "as no adapter specified";
      throw new A(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  }, "getAdapter"),
  adapters: hr
};
function vt(s) {
  if (s.cancelToken && s.cancelToken.throwIfRequested(), s.signal && s.signal.aborted)
    throw new Me(null, s);
}
o(vt, "throwIfCancellationRequested");
function dr(s) {
  return vt(s), s.headers = le.from(s.headers), s.data = wt.call(
    s,
    s.transformRequest
  ), ["post", "put", "patch"].indexOf(s.method) !== -1 && s.headers.setContentType("application/x-www-form-urlencoded", !1), Da.getAdapter(s.adapter || dt.adapter)(s).then(/* @__PURE__ */ o(function(e) {
    return vt(s), e.data = wt.call(
      s,
      s.transformResponse,
      e
    ), e.headers = le.from(e.headers), e;
  }, "onAdapterResolution"), /* @__PURE__ */ o(function(e) {
    return Ar(e) || (vt(s), e && e.response && (e.response.data = wt.call(
      s,
      s.transformResponse,
      e.response
    ), e.response.headers = le.from(e.response.headers))), Promise.reject(e);
  }, "onAdapterRejection"));
}
o(dr, "dispatchRequest");
const Ca = "1.11.0", Vt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((s, e) => {
  Vt[s] = /* @__PURE__ */ o(function(t) {
    return typeof t === s || "a" + (e < 1 ? "n " : " ") + s;
  }, "validator");
});
const gs = {};
Vt.transitional = /* @__PURE__ */ o(function(s, e, t) {
  function r(n, a) {
    return "[Axios v" + Ca + "] Transitional option '" + n + "'" + a + (t ? ". " + t : "");
  }
  return o(r, "formatMessage"), (n, a, i) => {
    if (s === !1)
      throw new A(
        r(a, " has been removed" + (e ? " in " + e : "")),
        A.ERR_DEPRECATED
      );
    return e && !gs[a] && (gs[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), s ? s(n, a, i) : !0;
  };
}, "transitional");
Vt.spelling = /* @__PURE__ */ o(function(s) {
  return (e, t) => (console.warn(`${t} is likely a misspelling of ${s}`), !0);
}, "spelling");
function Aa(s, e, t) {
  if (typeof s != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(s);
  let n = r.length;
  for (; n-- > 0; ) {
    const a = r[n], i = e[a];
    if (i) {
      const l = s[a], p = l === void 0 || i(l, a, s);
      if (p !== !0)
        throw new A("option " + a + " must be " + p, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new A("Unknown option " + a, A.ERR_BAD_OPTION);
  }
}
o(Aa, "assertOptions");
const St = {
  assertOptions: Aa,
  validators: Vt
}, Ee = St.validators;
var Ht;
let je = (Ht = class {
  constructor(s) {
    this.defaults = s || {}, this.interceptors = {
      request: new os(),
      response: new os()
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
  request(s, e) {
    return ye(this, null, function* () {
      try {
        return yield this._request(s, e);
      } catch (t) {
        if (t instanceof Error) {
          let r = {};
          Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
          const n = r.stack ? r.stack.replace(/^.+\n/, "") : "";
          try {
            t.stack ? n && !String(t.stack).endsWith(n.replace(/^.+\n.+\n/, "")) && (t.stack += `
` + n) : t.stack = n;
          } catch {
          }
        }
        throw t;
      }
    });
  }
  _request(s, e) {
    typeof s == "string" ? (e = e || {}, e.url = s) : e = s || {}, e = Le(this.defaults, e);
    const { transitional: t, paramsSerializer: r, headers: n } = e;
    t !== void 0 && St.assertOptions(t, {
      silentJSONParsing: Ee.transitional(Ee.boolean),
      forcedJSONParsing: Ee.transitional(Ee.boolean),
      clarifyTimeoutError: Ee.transitional(Ee.boolean)
    }, !1), r != null && (g.isFunction(r) ? e.paramsSerializer = {
      serialize: r
    } : St.assertOptions(r, {
      encode: Ee.function,
      serialize: Ee.function
    }, !0)), e.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0), St.assertOptions(e, {
      baseUrl: Ee.spelling("baseURL"),
      withXsrfToken: Ee.spelling("withXSRFToken")
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let a = n && g.merge(
      n.common,
      n[e.method]
    );
    n && g.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete n[m];
      }
    ), e.headers = le.concat(a, n);
    const i = [];
    let l = !0;
    this.interceptors.request.forEach(/* @__PURE__ */ o(function(m) {
      typeof m.runWhen == "function" && m.runWhen(e) === !1 || (l = l && m.synchronous, i.unshift(m.fulfilled, m.rejected));
    }, "unshiftRequestInterceptors"));
    const p = [];
    this.interceptors.response.forEach(/* @__PURE__ */ o(function(m) {
      p.push(m.fulfilled, m.rejected);
    }, "pushResponseInterceptors"));
    let u, f = 0, y;
    if (!l) {
      const m = [dr.bind(this), void 0];
      for (m.unshift(...i), m.push(...p), y = m.length, u = Promise.resolve(e); f < y; )
        u = u.then(m[f++], m[f++]);
      return u;
    }
    y = i.length;
    let w = e;
    for (f = 0; f < y; ) {
      const m = i[f++], x = i[f++];
      try {
        w = m(w);
      } catch (v) {
        x.call(this, v);
        break;
      }
    }
    try {
      u = dr.call(this, w);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, y = p.length; f < y; )
      u = u.then(p[f++], p[f++]);
    return u;
  }
  getUri(s) {
    s = Le(this.defaults, s);
    const e = Tr(s.baseURL, s.url, s.allowAbsoluteUrls);
    return xr(e, s.params, s.paramsSerializer);
  }
}, o(Ht, "Axios"), Ht);
g.forEach(["delete", "get", "head", "options"], /* @__PURE__ */ o(function(s) {
  je.prototype[s] = function(e, t) {
    return this.request(Le(t || {}, {
      method: s,
      url: e,
      data: (t || {}).data
    }));
  };
}, "forEachMethodNoData"));
g.forEach(["post", "put", "patch"], /* @__PURE__ */ o(function(s) {
  function e(t) {
    return /* @__PURE__ */ o(function(r, n, a) {
      return this.request(Le(a || {}, {
        method: s,
        headers: t ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: n
      }));
    }, "httpMethod");
  }
  o(e, "generateHTTPMethod"), je.prototype[s] = e(), je.prototype[s + "Form"] = e(!0);
}, "forEachMethodWithData"));
var ft;
let ou = (ft = class {
  constructor(s) {
    if (typeof s != "function")
      throw new TypeError("executor must be a function.");
    let e;
    this.promise = new Promise(/* @__PURE__ */ o(function(r) {
      e = r;
    }, "promiseExecutor"));
    const t = this;
    this.promise.then((r) => {
      if (!t._listeners) return;
      let n = t._listeners.length;
      for (; n-- > 0; )
        t._listeners[n](r);
      t._listeners = null;
    }), this.promise.then = (r) => {
      let n;
      const a = new Promise((i) => {
        t.subscribe(i), n = i;
      }).then(r);
      return a.cancel = /* @__PURE__ */ o(function() {
        t.unsubscribe(n);
      }, "reject"), a;
    }, s(/* @__PURE__ */ o(function(r, n, a) {
      t.reason || (t.reason = new Me(r, n, a), e(t.reason));
    }, "cancel"));
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
  subscribe(s) {
    if (this.reason) {
      s(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(s) : this._listeners = [s];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(s) {
    if (!this._listeners)
      return;
    const e = this._listeners.indexOf(s);
    e !== -1 && this._listeners.splice(e, 1);
  }
  toAbortSignal() {
    const s = new AbortController(), e = /* @__PURE__ */ o((t) => {
      s.abort(t);
    }, "abort");
    return this.subscribe(e), s.signal.unsubscribe = () => this.unsubscribe(e), s.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let s;
    return {
      token: new ft(/* @__PURE__ */ o(function(e) {
        s = e;
      }, "executor")),
      cancel: s
    };
  }
}, o(ft, "CancelToken"), ft);
function _a(s) {
  return /* @__PURE__ */ o(function(e) {
    return s.apply(null, e);
  }, "wrap");
}
o(_a, "spread$1");
function Ta(s) {
  return g.isObject(s) && s.isAxiosError === !0;
}
o(Ta, "isAxiosError$1");
const fr = {
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
Object.entries(fr).forEach(([s, e]) => {
  fr[e] = s;
});
function Fr(s) {
  const e = new je(s), t = Sr(je.prototype.request, e);
  return g.extend(t, je.prototype, e, { allOwnKeys: !0 }), g.extend(t, e, null, { allOwnKeys: !0 }), t.create = /* @__PURE__ */ o(function(r) {
    return Fr(Le(s, r));
  }, "create"), t;
}
o(Fr, "createInstance");
const q = Fr(dt);
q.Axios = je;
q.CanceledError = Me;
q.CancelToken = ou;
q.isCancel = Ar;
q.VERSION = Ca;
q.toFormData = ht;
q.AxiosError = A;
q.Cancel = q.CanceledError;
q.all = /* @__PURE__ */ o(function(s) {
  return Promise.all(s);
}, "all");
q.spread = _a;
q.isAxiosError = Ta;
q.mergeConfig = Le;
q.AxiosHeaders = le;
q.formToJSON = (s) => Cr(g.isHTMLForm(s) ? new FormData(s) : s);
q.getAdapter = Da.getAdapter;
q.HttpStatusCode = fr;
q.default = q;
const {
  Axios: Pu,
  AxiosError: ju,
  CanceledError: Nu,
  isCancel: Uu,
  CancelToken: Mu,
  VERSION: Vu,
  all: Bu,
  Cancel: $u,
  isAxiosError: zu,
  spread: qu,
  toFormData: Wu,
  AxiosHeaders: Ju,
  HttpStatusCode: Hu,
  formToJSON: Ku,
  getAdapter: Gu,
  mergeConfig: Qu
} = q, uu = class extends kt {
  constructor(e = "alpheios-storage-domain", t = null) {
    if (super(e), !t || !t.endpoints || !t.endpoints.settings.match(/^https:\/\//) || !t.accessToken)
      throw new Error("Authentication details missing or invalid");
    this.baseURL = t.endpoints.settings, this.requestContext = {
      headers: {
        common: {
          Authorization: "bearer " + t.accessToken,
          "Content-Type": "application/json"
        }
      }
    };
  }
  /**
   * A proxy for the Alpheios user-settings-api
   * It allows for storing key/value pairs to the api with an authorized user account
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(e) {
    return ye(this, null, function* () {
      for (const [t, r] of Object.entries(e)) {
        const n = `${this.baseURL}/${t}`, a = yield q.post(n, r, this.requestContext);
        if (a.status !== 201)
          throw new Error(`Unexpected result status from settings api: ${a.status}`);
      }
    });
  }
  /**
   * proxy for the Alpheios user-settings-api LIST operation
   * Retrieves all data for the storage domain.
   *
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get() {
    return ye(this, null, function* () {
      const e = `${this.baseURL}?domain=${this.domain}`, t = yield q.get(e, this.requestContext);
      if (t.status === 200)
        return t.data;
      throw new Error(`Unexpected result status from settings api: ${t.status}`);
    });
  }
  /**
   * proxy for the Alpheios user-settings DELETE LIST operation
   * deletes all settings for the domain from storage
   *
   * @returns {Promise} A Promise that executes the operation.
   */
  clearAll() {
    return ye(this, null, function* () {
      const e = `${this.baseURL}?domain=${this.domain}`, t = yield q.delete(e, this.requestContext);
      if (t.status !== 200)
        throw new Error(`Unexpected result status from settings api: ${t.status}`);
    });
  }
};
o(uu, "RemoteAuthStorageArea");
const lu = class extends kt {
  /**
   * A wrapper around a local storage `setItem()` function.
   * It allows to store one or several key-value pairs to local storage.
   *
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @returns {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  set(e) {
    return new Promise((t) => {
      t("TempStorageArea does not store any values permanently");
    });
  }
  /**
   * A wrapper around a local storage `getItem()` function. It retrieves one or several values from
   * local storage.
   *
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @returns {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  get(e = void 0) {
    return new Promise((t) => {
      t("TempStorageArea does not have any stored values");
    });
  }
};
o(lu, "TempStorageArea");
const Fa = class {
  /**
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ title: e, id: t, baseUrl: r, description: n } = {}) {
    this.title = e, this.id = t, this.baseUrl = r, this.description = n;
  }
  /**
   *
   * @param {Array[String]} refs - a list of refs to passages
   * @param {string} passage - a url template for getting XML document
   */
  uploadRefs({ refs: e, passage: t } = {}) {
    this.passage = t, this.refs = e;
  }
  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData() {
    return {
      baseUrl: this.baseUrl,
      title: this.title,
      id: this.id,
      description: this.description,
      type: "resource",
      resource: this
    };
  }
  get refsLinks() {
    return this.refs.map((e) => ({
      baseUrl: this.baseUrl,
      id: this.id,
      ref: e,
      type: "document"
    }));
  }
};
o(Fa, "Resource");
let cu = Fa;
const hu = class La {
  /**
   * Created from DTS API Json
   *
   * @param {number} totalItems - amount of items in a collection
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ totalItems: e, title: t, id: r, baseUrl: n, description: a, pagination: i } = {}) {
    this.totalItems = e, this.title = t, this.id = r, this.baseUrl = n, this.description = a, this.members = [], this.resources = [], i && (this.pagination = this.definePagination(i));
  }
  /**
   * Adds level - membered collection or resource
   *
   * @param {JSON Object} jsonObj  - described in Collection/Resource constructors
   */
  addMember(e) {
    e.type === "Collection" && this.members.push(new La(e)), e.type === "Resource" && this.resources.push(new cu(e));
  }
  /**
   * @returns {string} - title with totalItems in brackets
   */
  get formattedTitle() {
    const e = this.totalItems ? ` (${this.totalItems})` : "";
    return `${this.title}${e}`;
  }
  /**
   * @returns {object} - data for creating link for next step retrieval (descendant)
   */
  get linkData() {
    return {
      baseUrl: this.baseUrl,
      totalItems: this.totalItems,
      formattedTitle: this.formattedTitle,
      title: this.title,
      id: this.id,
      type: "collection"
    };
  }
  /**
   * @returns {Array[Object]} - array of links from membered collections
   */
  get membersLinks() {
    return this.members.map((e) => e.linkData);
  }
  /**
   * @returns {Array[Object]} - array of links from membered resources
   */
  get resourcesLinks() {
    return this.resources.map((e) => e.linkData);
  }
  /**
   * @returns {Array[Object]} - array of links - collections or resources
   */
  get links() {
    return this.members.length > 0 ? this.membersLinks : this.resources.length > 0 ? this.resourcesLinks : [];
  }
  extractPageNum(e) {
    if (e) {
      const t = e.match(/page=(\d+)$/);
      return t ? parseInt(t[1]) : null;
    }
    return null;
  }
  definePagination(e) {
    const t = {
      first: this.extractPageNum(e.first),
      next: this.extractPageNum(e.next),
      last: this.extractPageNum(e.last),
      previous: this.extractPageNum(e.previous)
    };
    return t.current = t.next ? t.next - 1 : t.previous ? t.previous + 1 : 1, t;
  }
};
o(hu, "Collection");
const Ra = class ka {
  constructor(e, t, r) {
    this.tabId = e, this.windowId = t, this.status = "attached";
  }
  get uniqueId() {
    return this.constructor.createUniqueId(this.tabId, this.windowId);
  }
  get uniqueIdNew() {
    return this.constructor.createUniqueIdNew(this.tabId, this.windowId);
  }
  get isDeattached() {
    return this.status === "deattached";
  }
  deattach() {
    this.status = "deattached";
  }
  attach(e) {
    this.windowId = e, this.status = "attached";
  }
  clone() {
    return new ka(this.tabId, this.windowId);
  }
  compareWithTab(e) {
    return this.tabId === e.tabId && this.windowId === e.windowId;
  }
  static createUniqueId(e, t) {
    return Symbol.for(`Alpheios_tabId:${e.toString()},windowId:${t.toString()}`);
  }
  static createUniqueIdNew(e, t) {
    return `Alpheios_tabId:${e.toString()},windowId:${t.toString()}`;
  }
};
o(Ra, "Tab");
let ms = Ra;
const Pa = class {
  constructor() {
    this.selectionLang = void 0, this.watchers = /* @__PURE__ */ new Map();
  }
  static get statuses() {
    return {
      script: {
        PENDING: Symbol.for("Alpheios_Status_Pending"),
        // Script has not been fully initialized yet
        ACTIVE: Symbol.for("Alpheios_Status_Active"),
        // Script is loaded and active
        DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
        // Script has been loaded, but is deactivated
        DISABLED: Symbol.for("Alpheios_Status_Disabled")
        // Content script has been disabled on a page and cannot be activated (due to incompatibility with a page content)
      },
      panel: {
        OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
        // Panel is open
        CLOSED: Symbol.for("Alpheios_Status_PanelClosed")
        // Panel is closed
      }
    };
  }
  /**
   * SetItem provides a monitored way to change a TabScript state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {UIStateAPI}
   */
  setItem(e, t) {
    return this[e] = t, this.watchers && this.watchers.has(e) && this.watchers.get(e)(e, this), this;
  }
  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {UIStateAPI} Reference to self for chaining
   */
  setWatcher(e, t) {
    return this.watchers.set(e, t), this;
  }
  /**
   * Check if the state of the panel is open
   * @return {boolean} true if open false if closed
   */
  isPanelOpen() {
    return !1;
  }
  /**
   * Check if the state of the panel is closed
   * @return {boolean} true if closed false if open
   */
  isPanelClosed() {
    return !1;
  }
  /**
   * Set the state of the panel to open
   * @return {UIStateAPI} the updated state object
   */
  setPanelOpen() {
    return this;
  }
  /**
   * Set the state of the panel to closed
   * @return {UIStateAPI} the updated state object
   */
  setPanelClosed() {
    return this;
  }
  /**
   * Check if the state of the UI is active (i.e. fully loaded and ready to use)
   * @return {boolean} true if active false if not
   */
  uiIsActive() {
    return !1;
  }
  /**
   * Set the state of the UI to active (i.e. fully loaded and ready to use)
   * @return {IState} the updated state object
   */
  activateUI() {
    return this;
  }
  /**
   * Set the currently active panel tab
   * @param {String} tabName name of the tab
   * @return {UIStateAPI} the updated state object
   */
  changeTab(e) {
    return this;
  }
};
o(Pa, "UIStateAPI");
let du = Pa;
const fu = class O extends du {
  constructor(e) {
    super(), this.tabID = e ? e.uniqueId : void 0, this.tabObj = e, this.status = void 0, this.panelStatus = void 0, this.tab = void 0, this.embedLibStatus = void 0, this.uiActive = !1, this.watchers = /* @__PURE__ */ new Map();
  }
  updateTabObject(e, t) {
    return this.tabObj = new ms(e, t), this.tabID = this.tabObj.uniqueId, this;
  }
  deattach() {
    this.tabObj.deattach();
  }
  attach(e) {
    this.tabObj.attach(e);
  }
  get isDeattached() {
    return this.tabObj.isDeattached;
  }
  static get propTypes() {
    return {
      NUMERIC: Symbol("Numeric"),
      STRING: Symbol("String"),
      SYMBOL: Symbol("Symbol")
    };
  }
  static get props() {
    return {
      status: {
        name: "status",
        valueType: O.propTypes.SYMBOL,
        values: {
          PENDING: Symbol.for("Alpheios_Status_Pending"),
          // Content script has not been fully initialized yet
          ACTIVE: Symbol.for("Alpheios_Status_Active"),
          // Content script is loaded and active
          DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
          // Content script has been loaded, but is deactivated
          DISABLED: Symbol.for("Alpheios_Status_Disabled")
          // Content script has been loaded, but it is disabled
        },
        defaultValueIndex: 0
      },
      embedLibStatus: {
        name: "embedLibStatus",
        valueType: O.propTypes.SYMBOL,
        values: this.statuses.embedLib,
        defaultValueIndex: 1
      },
      panelStatus: {
        name: "panelStatus",
        valueType: O.propTypes.SYMBOL,
        values: {
          OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
          // Panel is open
          CLOSED: Symbol.for("Alpheios_Status_PanelClosed"),
          // Panel is closed
          DEFAULT: Symbol.for("Alpheios_Status_PanelDefault")
          // Panel should set its state according to default values
        },
        defaultValueIndex: 1
      },
      tab: {
        name: "tab",
        valueType: O.propTypes.STRING,
        values: {
          INFO: "info",
          DEFAULT: "default"
          // A tab should be set according to default values
        },
        defaultValueIndex: 0
      },
      uiActive: {
        name: "uiActive",
        valueType: Boolean
      }
    };
  }
  static get symbolProps() {
    return [O.props.status.name, O.props.embedLibStatus.name, O.props.panelStatus.name];
  }
  static get stringProps() {
    return [O.props.tab.name];
  }
  static get booleanProps() {
    return [];
  }
  /**
   * Only certain features will be stored within a serialized version of a TabScript. This is done
   * to prevent context-specific features (such as local event handlers) to be passed over the network
   * to a different context where they would make no sense. This getter returns a list of such fields.
   * @return {String[]}
   */
  static get dataProps() {
    return O.symbolProps.concat(O.stringProps).concat(O.booleanProps);
  }
  /**
   * A copy constructor.
   * @param {TabScript} source - An instance of TabScript object we need to copy.
   * @return {TabScript} A copy of a source object.
   */
  static create(e) {
    let t = new O();
    for (const r of Object.keys(e))
      t[r] = e[r];
    return t;
  }
  static get defaults() {
    return {
      status: O.statuses.script.ACTIVE,
      panelStatus: O.statuses.panel.OPEN
    };
  }
  static get statuses() {
    return {
      script: {
        PENDING: Symbol.for("Alpheios_Status_Pending"),
        // Content script has not been fully initialized yet
        ACTIVE: Symbol.for("Alpheios_Status_Active"),
        // Content script is loaded and active
        DEACTIVATED: Symbol.for("Alpheios_Status_Deactivated"),
        // Content script has been loaded, but is deactivated
        DISABLED: Symbol.for("Alpheios_Status_Disabled")
        // Content script has been disabled on a page and cannot be activated (due to incompatibility with a page content)
      },
      embedLib: {
        ACTIVE: Symbol.for("Embedded_Lib_Status_Active"),
        // Embedded Lib is present on a page and is activated
        INACTIVE: Symbol.for("Embedded_Lib_Status_Inactive")
        // Embedded Lib not loaded or is inactive
      },
      panel: {
        OPEN: Symbol.for("Alpheios_Status_PanelOpen"),
        // Panel is open
        CLOSED: Symbol.for("Alpheios_Status_PanelClosed"),
        // Panel is closed
        DEFAULT: Symbol.for("Alpheios_Status_PanelDefault")
        // Panel should set its state according to default values
      }
    };
  }
  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {TabScript} Reference to self for chaining
   */
  setWatcher(e, t) {
    return this.watchers.set(e, t), this;
  }
  /**
   * SetItem provides a monitored way to change a TabScript state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {TabScript}
   */
  setItem(e, t) {
    return this[e] = t, this.watchers && this.watchers.has(e) && this.watchers.get(e)(e, this), this;
  }
  isEmbedLibActive() {
    return this.embedLibStatus === O.statuses.embedLib.ACTIVE;
  }
  setEmbedLibActiveStatus() {
    return this.setItem("embedLibStatus", O.statuses.embedLib.ACTIVE), this;
  }
  setEmbedLibInactiveStatus() {
    return this.setItem("embedLibStatus", O.statuses.embedLib.INACTIVE), this;
  }
  setEmbedLibStatus(e) {
    e ? this.setItem("embedLibStatus", O.statuses.embedLib.ACTIVE) : this.setItem("embedLibStatus", O.statuses.embedLib.INACTIVE);
  }
  isPanelOpen() {
    return this.panelStatus === O.statuses.panel.OPEN;
  }
  isPanelClosed() {
    return this.panelStatus === O.statuses.panel.CLOSED;
  }
  setPanelOpen() {
    return this.setItem("panelStatus", O.statuses.panel.OPEN), this;
  }
  setPanelClosed() {
    return this.setItem("panelStatus", O.statuses.panel.CLOSED), this;
  }
  setPanelDefault() {
    return this.setItem("panelStatus", O.statuses.panel.DEFAULT), this;
  }
  isPanelStateDefault() {
    return this.panelStatus === O.statuses.panel.DEFAULT;
  }
  isPanelStateValid() {
    return this.panelStatus === O.statuses.panel.OPEN || this.panelStatus === O.statuses.panel.CLOSED;
  }
  setTabDefault() {
    return this.setItem("tab", O.props.tab.values.DEFAULT), this;
  }
  isTabStateDefault() {
    return this.tab === O.props.tab.values.DEFAULT;
  }
  hasSameID(e) {
    return Symbol.keyFor(this.tabID) === Symbol.keyFor(e);
  }
  isActive() {
    return this.status === O.statuses.script.ACTIVE;
  }
  isDeactivated() {
    return this.status === O.statuses.script.DEACTIVATED;
  }
  isDisabled() {
    return this.status === O.statuses.script.DISABLED;
  }
  isPending() {
    return this.status === O.statuses.script.PENDING;
  }
  uiIsActive() {
    return this[O.props.uiActive.name];
  }
  activate() {
    return this.status = O.statuses.script.ACTIVE, this;
  }
  deactivate() {
    return this.status = O.statuses.script.DEACTIVATED, this;
  }
  disable() {
    return this.status = O.statuses.script.DISABLED, this;
  }
  activateUI() {
    return this.setItem(O.props.uiActive.name, !0), this;
  }
  changeTab(e) {
    return this.setItem(O.props.tab.name, e), this;
  }
  update(e) {
    for (const t of Object.keys(e))
      e[t] && (this[t] = e[t]);
    return this;
  }
  /**
   * Compares the current state with a targetState. A targetState is a state to where the current state should transform.
   * If any field value in the state is undefined, it means that there is no transformation goal for this field
   * (i.e we don't care about it value). Because of this, we will not include such fields into a diff result.
   * @param targetState
   * @return {{_changedKeys: Array, _changedEntries: Array}}
   */
  diff(e) {
    let t = {
      // eslint-disable-line prefer-const
      _changedKeys: [],
      _changedEntries: []
    };
    this.tabID !== e.tabID && (t.tabID = e.tabID, t._changedKeys.push("tabID"), t._changedEntries.push(["tabID", e.tabID]));
    for (const r of Object.keys(e))
      O.dataProps.includes(r) && this.hasOwnProperty(r) && this[r] && e[r] && this[r] !== e[r] && (t[r] = e[r], t._changedKeys.push(r), t._changedEntries.push([r, e[r]]));
    return t.keys = function() {
      return t._changedKeys;
    }, t.entries = function() {
      return t._changedEntries;
    }, t.has = function(r) {
      return t._changedKeys.includes(r);
    }, t.isEmpty = function() {
      return !t._changedKeys.length;
    }, t;
  }
  /**
   * Creates a serializable copy of a source object. Firefox uses the structured clone algorithm
   * (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) to serialize objects.
   * Requirements of this algorithm are that a serializable object to have no Function or Error properties,
   * neither any DOM Nodes. That's why an empty serializable object is created and only
   * selected properties are copied into it.
   * @param {TabScript} source - An object to be serialized.
   * @return {Object} A serializable copy of a source.
   */
  static serializable(e) {
    let t = {};
    t.tabID = typeof e.tabID == "symbol" ? Symbol.keyFor(e.tabID) : e.tabID, t.tabObj = e.tabObj ? e.tabObj.clone() : void 0;
    for (const r of Object.keys(e))
      if (O.dataProps.includes(r)) {
        const n = e[r];
        t[r] = typeof n == "symbol" ? Symbol.keyFor(n) : n;
      }
    return t;
  }
  static readObject(e) {
    const t = e.tabObj && e.tabObj.tabId && e.tabObj.windowId ? new ms(e.tabObj.tabId, e.tabObj.windowId, e.tabObj.status) : void 0;
    let r = new O(t);
    for (const n of O.symbolProps)
      e[n] && (r[n] = Symbol.for(e[n]));
    for (const n of O.stringProps)
      e[n] && (r[n] = e[n]);
    for (const n of O.booleanProps)
      e.hasOwnProperty(n) && (r[n] = e[n]);
    return r;
  }
};
o(fu, "TabScript");
const pt = {
  "https://github.com/alpheios-project/grammar-bennett": { base_url: "https://grammars.alpheios.net/bennett/", index_url: "https://grammars.alpheios.net/bennett/index/alph-index-bennett", description: "New Latin Grammar, by Charles E. Bennett", rights: "New Latin Grammar, by Charles E. Bennett. Copyright 1895; 1908; 1918.", langs: { source: "lat", target: "en" } },
  "https://github.com/alpheios-project/grammar-allen-greenough": { base_url: "https://grammars.alpheios.net/allen-greenough/", index_url: "https://grammars.alpheios.net/allen-greenough/index/alph-index-allen-greenough", description: "Allen and Greenough’s New Latin Grammar for Schools and Colleges", rights: "Allen and Greenough’s New Latin Grammar for Schools and Colleges, edited by J.B. Greenough, G.L. Kittredge, A.A. Howard, and Benjamin L. D’Ooge. Boston: Ginn &amp; Company, 1903.", langs: { source: "lat", target: "en" } },
  "https://github.com/alpheios-project/grammar-smyth": { base_url: "https://grammars.alpheios.net/smyth/xhtml/", index_url: "https://grammars.alpheios.net/smyth/index/alph-index-smyth", description: "Smyth's Greek Grammar For Colleges", rights: "Smyth's Greek Grammar for Colleges, by Herbert Weir Smyth.", langs: { source: "grc", target: "en" } }
};
class ys extends ja {
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
        let r = JSON.parse(pt);
        this.config = r[e];
      } catch {
        this.config = pt[e];
      }
    else
      this.config = t;
    this.provider = new De(this.resid, this.config.rights);
  }
  /**
   * @override BaseResourceAdapter#getResources
   * @param {Feature} keyObj - receives a feature and returns a list of resources
   */
  async getResources(e) {
    if (this.index === null && this.getConfig("index_url")) {
      let l = this.getConfig("index_url"), p = await this._loadData(l), u = Ba.parse(p, {});
      this.index = this._fillMap(u.data);
    }
    let t = [], r = e.type;
    e.value && (r = `${r}-${e.value}`), this.index && (t = this._lookupInDataIndex(this.index, r));
    let n = this.getConfig("base_url"), a = (/* @__PURE__ */ new Date()).getTime(), i = [];
    for (let l of t)
      for (let p of l) {
        let [u, f] = p.split("#");
        u && f && (p = `${u}?ts=${a}#${f}`);
        let y = {};
        n ? y.url = `${n}${p}` : y.url = p, i.push(De.getProxy(this.provider, y));
      }
    return i;
  }
  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data index
   * @param {string} key the key  to lookup
   * @return {string} the index entry as a text string
   */
  _lookupInDataIndex(e, t) {
    let r = e.get(t);
    return r || (t = `alph-${t}`, r = e.get(t)), r || (t = "alph-general-index", r = e.get(t)), r ? [r] : [];
  }
  /**
   * Loads a data file from a URL
   * @param {string} url - the url of the file
   * @returns {Promise} a Promise that resolves to the text contents of the loaded file
   */
  _loadData(e) {
    return new Promise((t, r) => {
      window.fetch(e).then(
        function(n) {
          let a = n.text();
          t(a);
        }
      ).catch((n) => {
        r(n);
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
    for (let r of e)
      t.has(r[0]) ? t.get(r[0]).push(r[1]) : t.set(r[0], [r[1]]);
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
    let t, r = /* @__PURE__ */ new Map();
    try {
      t = JSON.parse(pt);
    } catch {
      t = pt;
    }
    for (let n of Object.keys(t))
      t[n].langs.source === e && r.set(n, t[n].description);
    return r;
  }
}
let Kt = /* @__PURE__ */ new Map();
class pr {
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
    let r = Object.assign(pr.defaults, t), n = [];
    try {
      let a = pr.getGrammarAdapters(e.languageID, r);
      return !a || a.length === 0 ? [] : (n = a.map((i) => new Promise((l, p) => {
        let u = 0;
        r.timeout > 0 && (u = window.setTimeout(() => {
          p(new Error(`Timeout of ${r.timeout} ms has been expired for a request to "${i.config.description}"`));
        }, r.timeout));
        try {
          i.getResources(e).then((f) => {
            u && window.clearTimeout(u), l(f);
          }).catch((f) => {
            u && window.clearTimeout(u), p(f);
          });
        } catch (f) {
          p(f);
        }
      })), n);
    } catch (a) {
      return F.getInstance().error(`Alpheios error: unable to fetch resources due to ${a}`), [];
    }
  }
  /**
   * Returns a list of suitable lexicon adapters for a given language ID.
   * @param {Symbol} languageID - A language ID of adapters returned.
   * @param {Object} options - request options
   * @return {BaseLexiconAdapter[]} An array of lexicon adapters for a given language.
   */
  static getGrammarAdapters(e, t) {
    if (!Kt.has(e)) {
      let n = R.getLanguageCodeFromId(e), a = ys.getProviders(n);
      Kt.set(e, Array.from(a.keys()).map((i) => new ys(i)));
    }
    const r = Kt.get(e);
    return t.prefer ? r.filter((n) => n.resid === t.prefer) : r;
  }
}
export {
  ys as GrammarResAdapter,
  pr as Grammars
};
