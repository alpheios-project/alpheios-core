var br = Object.defineProperty, ga = Object.defineProperties;
var ma = Object.getOwnPropertyDescriptors;
var wr = Object.getOwnPropertySymbols;
var ya = Object.prototype.hasOwnProperty, Ea = Object.prototype.propertyIsEnumerable;
var ue = (r, e) => (e = Symbol[r]) ? e : Symbol.for("Symbol." + r), wa = (r) => {
  throw TypeError(r);
};
var Ir = (r, e, t) => e in r ? br(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, G = (r, e) => {
  for (var t in e || (e = {}))
    ya.call(e, t) && Ir(r, t, e[t]);
  if (wr)
    for (var t of wr(e))
      Ea.call(e, t) && Ir(r, t, e[t]);
  return r;
}, Sr = (r, e) => ga(r, ma(e)), o = (r, e) => br(r, "name", { value: e, configurable: !0 });
var L = (r, e, t) => new Promise((s, n) => {
  var a = (d) => {
    try {
      u(t.next(d));
    } catch (h) {
      n(h);
    }
  }, i = (d) => {
    try {
      u(t.throw(d));
    } catch (h) {
      n(h);
    }
  }, u = (d) => d.done ? s(d.value) : Promise.resolve(d.value).then(a, i);
  u((t = t.apply(r, e)).next());
}), j = function(r, e) {
  this[0] = r, this[1] = e;
}, Pt = (r, e, t) => {
  var s = (i, u, d, h) => {
    try {
      var c = t[i](u), p = (u = c.value) instanceof j, g = c.done;
      Promise.resolve(p ? u[0] : u).then((y) => p ? s(i === "return" ? i : "next", u[1] ? { done: y.done, value: y.value } : y, d, h) : d({ value: y, done: g })).catch((y) => s("throw", y, d, h));
    } catch (y) {
      h(y);
    }
  }, n = (i) => a[i] = (u) => new Promise((d, h) => s(i, u, d, h)), a = {};
  return t = t.apply(r, e), a[ue("asyncIterator")] = () => a, n("next"), n("throw"), n("return"), a;
}, Vt = (r) => {
  var e = r[ue("asyncIterator")], t = !1, s, n = {};
  return e == null ? (e = r[ue("iterator")](), s = (a) => n[a] = (i) => e[a](i)) : (e = e.call(r), s = (a) => n[a] = (i) => {
    if (t) {
      if (t = !1, a === "throw") throw i;
      return i;
    }
    return t = !0, {
      done: !1,
      value: new j(new Promise((u) => {
        var d = e[a](i);
        d instanceof Object || wa("Object expected"), u(d);
      }), 1)
    };
  }), n[ue("iterator")] = () => n, s("next"), "throw" in e ? s("throw") : n.throw = (a) => {
    throw a;
  }, "return" in e && s("return"), n;
}, Ar = (r, e, t) => (e = r[ue("asyncIterator")]) ? e.call(r) : (r = r[ue("iterator")](), e = {}, t = (s, n) => (n = r[s]) && (e[s] = (a) => new Promise((i, u, d) => (a = n.call(r, a), d = a.done, Promise.resolve(a.value).then((h) => i({ value: h, done: d }), u)))), t("next"), t("return"), e);
const J = Symbol("word"), dn = Symbol("char"), ye = Symbol("ltr"), Pe = Symbol("rtl"), us = Symbol("undefined"), pn = Symbol("latin"), gn = Symbol("greek"), mn = Symbol("arabic"), yn = Symbol("persian"), ls = Symbol("ge'ez"), cs = Symbol("chinese"), hs = Symbol("syriac"), fs = "undefined", He = "lat", ds = "la", Ge = "grc", Je = "ara", ps = "ar", En = "fas", Ke = "per", wn = "fa-IR", In = "fa", je = "gez", Xe = "zho", bn = "zh", Sn = "zh-Hant", An = "zh-Hans", gs = "syc", Ye = "syr", ms = "syr-Syrj", Ia = "eng", Oe = "adjective", ne = "adverb", ys = "adverbial", St = "article", Es = "conjunction", ae = "exclamation", ie = "interjection", ve = "noun", $t = "proper noun", At = "numeral", _e = "particle", ws = "prefix", Is = "preposition", de = "pronoun", bs = "suffix", Fn = "gerundive", Ft = "supine", pe = "verb", Ct = "verb participle", Cn = "denominative", Dn = "masculine", Tn = "feminine", On = "neuter", ba = "common", Sa = "animate", Aa = "inanimate", Fa = "personal masculine", Ca = "animate masculine", Da = "inanimate masculine", Ta = "positive", Oa = "comparative", va = "superlative", _a = "abessive", vn = "ablative", Na = "absolutive", Ss = "accusative", xa = "addirective", Ra = "adelative", La = "adessive", Pa = "adverbial", Va = "allative", Ua = "antessive", Ba = "apudessive", Ma = "aversive", ka = "benefactive", $a = "caritive", za = "causal", qa = "causal-final", Wa = "comitative", As = "dative", Ha = "delative", Ga = "direct", Ja = "distributive", Ka = "distributive-temporal", ja = "elative", Xa = "ergative", Ya = "essive", Za = "essive-formal", Qa = "essive-modal", ei = "equative", ti = "evitative", si = "exessive", ri = "final", ni = "formal", Fs = "genitive", ai = "illative", ii = "inelative", oi = "inessive", ui = "instructive", li = "instrumental", ci = "instrumental-comitative", hi = "intransitive", fi = "lative", _n = "locative", di = "modal", pi = "multiplicative", Cs = "nominative", gi = "partitive", mi = "pegative", yi = "perlative", Ei = "possessive", wi = "postelative", Ii = "postdirective", bi = "postessive", Si = "postpositional", Ai = "prepositional", Fi = "privative", Ci = "prolative", Di = "prosecutive", Ti = "proximative", Oi = "separative", vi = "sociative", _i = "subdirective", Ni = "subessive", xi = "subelative", Ri = "sublative", Li = "superdirective", Pi = "superessive", Vi = "superlative", Ui = "suppressive", Bi = "temporal", Mi = "terminative", ki = "translative", $i = "vialis", Ds = "vocative", zi = "admirative", qi = "cohortative", Wi = "conditional", Hi = "declarative", Gi = "dubitative", Ji = "energetic", Ki = "eventive", ji = "generic", zt = "gerundive", Xi = "hypothetical", Ts = "imperative", Os = "indicative", Yi = "inferential", Nn = "infinitive", Zi = "interrogative", Qi = "jussive", eo = "negative", xn = "optative", $e = "participle", to = "presumptive", so = "renarrative", vs = "subjunctive", Rn = "supine", Dt = "singular", Tt = "plural", Ln = "dual", ro = "trial", no = "paucal", ao = "singulative", io = "collective", oo = "distributive plural", uo = "cardinal", lo = "ordinal", co = "distributive", ho = "numeral adverb", Ne = "1st", xe = "2nd", Re = "3rd", qt = "4th", Pn = "5th", fo = "6th", po = "7th", go = "8th", mo = "9th", Vn = "aorist", _s = "future", Ns = "future perfect", xs = "imperfect", yo = "past absolute", Rs = "perfect", Ls = "pluperfect", Ps = "present", Eo = "to be", wo = "compounds of to be", Io = "taking ablative", bo = "taking dative", So = "taking genitive", Ao = "transitive", Fo = "intransitive", Co = "impersonal", Do = "deponent", To = "semideponent", Oo = "perfect definite", Vs = "active", Us = "passive", Un = "mediopassive", vo = "impersonal passive", Bn = "middle", _o = "antipassive", No = "reflexive", xo = "reciprocal", Ro = "causative", Lo = "adjutative", Po = "applicative", Vo = "circumstantial", Uo = "deponent", Mn = "irregular", kn = "regular", Bs = "personal", Ms = "reflexive", ks = "possessive", $s = "demonstrative", zs = "relative", qs = "interrogative", $n = "general relative", zn = "indefinite", qn = "intensive", Wn = "reciprocal", Bo = "kaylo", Mo = "state", bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CASE_ABESSIVE: _a,
  CASE_ABLATIVE: vn,
  CASE_ABSOLUTIVE: Na,
  CASE_ACCUSATIVE: Ss,
  CASE_ADDIRECTIVE: xa,
  CASE_ADELATIVE: Ra,
  CASE_ADESSIVE: La,
  CASE_ADVERBIAL: Pa,
  CASE_ALLATIVE: Va,
  CASE_ANTESSIVE: Ua,
  CASE_APUDESSIVE: Ba,
  CASE_AVERSIVE: Ma,
  CASE_BENEFACTIVE: ka,
  CASE_CARITIVE: $a,
  CASE_CAUSAL: za,
  CASE_CAUSAL_FINAL: qa,
  CASE_COMITATIVE: Wa,
  CASE_DATIVE: As,
  CASE_DELATIVE: Ha,
  CASE_DIRECT: Ga,
  CASE_DISTRIBUTIVE: Ja,
  CASE_DISTRIBUTIVE_TEMPORAL: Ka,
  CASE_ELATIVE: ja,
  CASE_EQUATIVE: ei,
  CASE_ERGATIVE: Xa,
  CASE_ESSIVE: Ya,
  CASE_ESSIVE_FORMAL: Za,
  CASE_ESSIVE_MODAL: Qa,
  CASE_EVITATIVE: ti,
  CASE_EXESSIVE: si,
  CASE_FINAL: ri,
  CASE_FORMAL: ni,
  CASE_GENITIVE: Fs,
  CASE_ILLATIVE: ai,
  CASE_INELATIVE: ii,
  CASE_INESSIVE: oi,
  CASE_INSTRUCTIVE: ui,
  CASE_INSTRUMENTAL: li,
  CASE_INSTRUMENTAL_COMITATIVE: ci,
  CASE_INTRANSITIVE: hi,
  CASE_LATIVE: fi,
  CASE_LOCATIVE: _n,
  CASE_MODAL: di,
  CASE_MULTIPLICATIVE: pi,
  CASE_NOMINATIVE: Cs,
  CASE_PARTITIVE: gi,
  CASE_PEGATIVE: mi,
  CASE_PERLATIVE: yi,
  CASE_POSSESSIVE: Ei,
  CASE_POSTDIRECTIVE: Ii,
  CASE_POSTELATIVE: wi,
  CASE_POSTESSIVE: bi,
  CASE_POSTPOSITIONAL: Si,
  CASE_PREPOSITIONAL: Ai,
  CASE_PRIVATIVE: Fi,
  CASE_PROLATIVE: Ci,
  CASE_PROSECUTIVE: Di,
  CASE_PROXIMATIVE: Ti,
  CASE_SEPARATIVE: Oi,
  CASE_SOCIATIVE: vi,
  CASE_SUBDIRECTIVE: _i,
  CASE_SUBELATIVE: xi,
  CASE_SUBESSIVE: Ni,
  CASE_SUBLATIVE: Ri,
  CASE_SUPERDIRECTIVE: Li,
  CASE_SUPERESSIVE: Pi,
  CASE_SUPERLATIVE: Vi,
  CASE_SUPPRESSIVE: Ui,
  CASE_TEMPORAL: Bi,
  CASE_TERMINATIVE: Mi,
  CASE_TRANSLATIVE: ki,
  CASE_VIALIS: $i,
  CASE_VOCATIVE: Ds,
  CLASS_DEMONSTRATIVE: $s,
  CLASS_GENERAL_RELATIVE: $n,
  CLASS_INDEFINITE: zn,
  CLASS_INTENSIVE: qn,
  CLASS_INTERROGATIVE: qs,
  CLASS_PERSONAL: Bs,
  CLASS_POSSESSIVE: ks,
  CLASS_RECIPROCAL: Wn,
  CLASS_REFLEXIVE: Ms,
  CLASS_RELATIVE: zs,
  COMP_COMPARITIVE: Oa,
  COMP_POSITIVE: Ta,
  COMP_SUPERLATIVE: va,
  GEND_ANIMATE: Sa,
  GEND_ANIMATE_MASCULINE: Ca,
  GEND_COMMON: ba,
  GEND_FEMININE: Tn,
  GEND_INANIMATE: Aa,
  GEND_INANIMATE_MASCULINE: Da,
  GEND_MASCULINE: Dn,
  GEND_NEUTER: On,
  GEND_PERSONAL_MASCULINE: Fa,
  LANG_ARABIC: mn,
  LANG_CHINESE: cs,
  LANG_DIR_LTR: ye,
  LANG_DIR_RTL: Pe,
  LANG_GEEZ: ls,
  LANG_GREEK: gn,
  LANG_LATIN: pn,
  LANG_PERSIAN: yn,
  LANG_SYRIAC: hs,
  LANG_UNDEFINED: us,
  LANG_UNIT_CHAR: dn,
  LANG_UNIT_WORD: J,
  MOOD_ADMIRATIVE: zi,
  MOOD_COHORTATIVE: qi,
  MOOD_CONDITIONAL: Wi,
  MOOD_DECLARATIVE: Hi,
  MOOD_DUBITATIVE: Gi,
  MOOD_ENERGETIC: Ji,
  MOOD_EVENTIVE: Ki,
  MOOD_GENERIC: ji,
  MOOD_GERUNDIVE: zt,
  MOOD_HYPOTHETICAL: Xi,
  MOOD_IMPERATIVE: Ts,
  MOOD_INDICATIVE: Os,
  MOOD_INFERENTIAL: Yi,
  MOOD_INFINITIVE: Nn,
  MOOD_INTERROGATIVE: Zi,
  MOOD_JUSSIVE: Qi,
  MOOD_NEGATIVE: eo,
  MOOD_OPTATIVE: xn,
  MOOD_PARTICIPLE: $e,
  MOOD_PRESUMPTIVE: to,
  MOOD_RENARRATIVE: so,
  MOOD_SUBJUNCTIVE: vs,
  MOOD_SUPINE: Rn,
  NRL_CARDINAL: uo,
  NRL_DISTRIBUTIVE: co,
  NRL_ORDINAL: lo,
  NUM_COLLECTIVE: io,
  NUM_DISTRIBUTIVE_PLURAL: oo,
  NUM_DUAL: Ln,
  NUM_PAUCAL: no,
  NUM_PLURAL: Tt,
  NUM_SINGULAR: Dt,
  NUM_SINGULATIVE: ao,
  NUM_TRIAL: ro,
  NURL_NUMERAL_ADVERB: ho,
  ORD_1ST: Ne,
  ORD_2ND: xe,
  ORD_3RD: Re,
  ORD_4TH: qt,
  ORD_5TH: Pn,
  ORD_6TH: fo,
  ORD_7TH: po,
  ORD_8TH: go,
  ORD_9TH: mo,
  PARADIGM_CAT_KAYLO: Bo,
  PARADIGM_CAT_STATE: Mo,
  POFS_ADJECTIVE: Oe,
  POFS_ADVERB: ne,
  POFS_ADVERBIAL: ys,
  POFS_ARTICLE: St,
  POFS_CONJUNCTION: Es,
  POFS_DENOMINATIVE: Cn,
  POFS_EXCLAMATION: ae,
  POFS_GERUNDIVE: Fn,
  POFS_INTERJECTION: ie,
  POFS_NOUN: ve,
  POFS_NOUN_PROPER: $t,
  POFS_NUMERAL: At,
  POFS_PARTICLE: _e,
  POFS_PREFIX: ws,
  POFS_PREPOSITION: Is,
  POFS_PRONOUN: de,
  POFS_SUFFIX: bs,
  POFS_SUPINE: Ft,
  POFS_VERB: pe,
  POFS_VERB_PARTICIPLE: Ct,
  STR_LANG_CODE_AR: ps,
  STR_LANG_CODE_ARA: Je,
  STR_LANG_CODE_ENG: Ia,
  STR_LANG_CODE_FA: In,
  STR_LANG_CODE_FAS: En,
  STR_LANG_CODE_FA_IR: wn,
  STR_LANG_CODE_GEZ: je,
  STR_LANG_CODE_GRC: Ge,
  STR_LANG_CODE_LA: ds,
  STR_LANG_CODE_LAT: He,
  STR_LANG_CODE_PER: Ke,
  STR_LANG_CODE_SYC: gs,
  STR_LANG_CODE_SYR: Ye,
  STR_LANG_CODE_SYR_SYRJ: ms,
  STR_LANG_CODE_UNDEFINED: fs,
  STR_LANG_CODE_ZH: bn,
  STR_LANG_CODE_ZHO: Xe,
  STR_LANG_CODE_ZH_HANS: An,
  STR_LANG_CODE_ZH_HANT: Sn,
  TENSE_AORIST: Vn,
  TENSE_FUTURE: _s,
  TENSE_FUTURE_PERFECT: Ns,
  TENSE_IMPERFECT: xs,
  TENSE_PAST_ABSOLUTE: yo,
  TENSE_PERFECT: Rs,
  TENSE_PLUPERFECT: Ls,
  TENSE_PRESENT: Ps,
  TYPE_IRREGULAR: Mn,
  TYPE_REGULAR: kn,
  VKIND_COMPOUNDS_OF_TO_BE: wo,
  VKIND_DEPONENT: Do,
  VKIND_IMPERSONAL: Co,
  VKIND_INTRANSITIVE: Fo,
  VKIND_PERFECT_DEFINITE: Oo,
  VKIND_SEMIDEPONENT: To,
  VKIND_TAKING_ABLATIVE: Io,
  VKIND_TAKING_DATIVE: bo,
  VKIND_TAKING_GENITIVE: So,
  VKIND_TO_BE: Eo,
  VKIND_TRANSITIVE: Ao,
  VOICE_ACTIVE: Vs,
  VOICE_ADJUTATIVE: Lo,
  VOICE_ANTIPASSIVE: _o,
  VOICE_APPLICATIVE: Po,
  VOICE_CAUSATIVE: Ro,
  VOICE_CIRCUMSTANTIAL: Vo,
  VOICE_DEPONENT: Uo,
  VOICE_IMPERSONAL_PASSIVE: vo,
  VOICE_MEDIOPASSIVE: Un,
  VOICE_MIDDLE: Bn,
  VOICE_PASSIVE: Us,
  VOICE_RECIPROCAL: xo,
  VOICE_REFLEXIVE: No
}, Symbol.toStringTag, { value: "Module" })), O = [];
for (let r = 0; r < 256; ++r)
  O.push((r + 256).toString(16).slice(1));
function ko(r, e = 0) {
  return (O[r[e + 0]] + O[r[e + 1]] + O[r[e + 2]] + O[r[e + 3]] + "-" + O[r[e + 4]] + O[r[e + 5]] + "-" + O[r[e + 6]] + O[r[e + 7]] + "-" + O[r[e + 8]] + O[r[e + 9]] + "-" + O[r[e + 10]] + O[r[e + 11]] + O[r[e + 12]] + O[r[e + 13]] + O[r[e + 14]] + O[r[e + 15]]).toLowerCase();
}
o(ko, "unsafeStringify");
let Ut;
const $o = new Uint8Array(16);
function zo() {
  if (!Ut) {
    if (typeof crypto == "undefined" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Ut = crypto.getRandomValues.bind(crypto);
  }
  return Ut($o);
}
o(zo, "rng");
const qo = typeof crypto != "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Fr = { randomUUID: qo };
function Ot(r, e, t) {
  var n, a, i;
  if (Fr.randomUUID && !r)
    return Fr.randomUUID();
  r = r || {};
  const s = (i = (a = r.random) != null ? a : (n = r.rng) == null ? void 0 : n.call(r)) != null ? i : zo();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, ko(s);
}
o(Ot, "v4");
const ht = class ht {
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
      get: /* @__PURE__ */ o(function(s, n) {
        return n === "provider" ? e : s[n];
      }, "get")
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
    }), new ht(e.uri, "", t);
  }
};
o(ht, "ResourceProvider");
let W = ht;
const ft = class ft {
  constructor(e, t, s, n) {
    this.text = e, this.language = t, this.format = s, this.lemmaText = n, this.ID = Ot();
  }
  static readObject(e) {
    let t = new ft(e.text, e.language, e.format, e.lemmaText);
    if (e.ID && (t.ID = e.ID), e.provider) {
      const s = W.readObject(e.provider);
      return W.getProxy(s, t);
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
o(ft, "Definition");
let Ze = ft;
const Js = class Js {
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
};
o(Js, "FeatureImporter");
let Qe = Js, le;
const dt = class dt {
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
    return le ? (typeof e.verbose != "undefined" && (console.info("Setting a verbose mode"), le.setVerboseMode(e.verbose)), typeof e.prepend != "undefined" && (console.info("Setting a prepend mode"), le.setVerboseMode(e.prepend)), typeof e.trace != "undefined" && (console.info("Setting a trace mode"), le.setTraceMode(e.trace))) : le = new dt(e), le;
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
o(dt, "Logger");
let S = dt;
const P = class P {
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
  constructor(e, t, s, n = 1, a = []) {
    if (!P.isAllowedType(e))
      throw new Error('Features of "' + e + '" type are not supported.');
    if (!t)
      throw new Error("Feature should have a non-empty value(s).");
    if (!s)
      throw new Error("No language ID is provided");
    this.type = e, this.languageID = s, this.sortOrder = n, this.allowedValues = a, this._data = P.dataValuesFromInput(t), this.sort();
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
      if (this._data.length > 1) throw new Error(P.errMsgs.NO_SINGLE_VALUE);
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
    return e && this.type === e.type && A.compareLanguages(this.languageID, e.languageID) && this.value === e.value;
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
    return this.hasValue(e) ? S.getInstance().warn(`Value "${e}" already exists. If you want to change it, use "getValue" to access it directly.`) : (this._data.push({
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
    return this.hasSomeValues(s) ? S.getInstance().warn(`One or several values from "${s}" already exist. If you want to change it, use "getValue" to access a value directly.`) : (this._data = this._data.concat(t), this.sort()), this;
  }
  /**
   * Removes a single value from the existing feature object.
   *
   * @param value
   */
  removeValue(e) {
    S.getInstance().warn("This feature is not implemented yet");
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
    return new P(this.type, [[e, t]], this.languageID, this.sortOrder, this.allowedValues);
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
    return new P(this.type, e, this.languageID, this.sortOrder, this.allowedValues);
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
    return this.values.map((e) => new P(this.type, e, this.languageID, 1, this.allowedValues));
  }
  /**
   * Create a copy of the feature object.
   */
  getCopy() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return new P(this.type, e, this.languageID, this.sortOrder, this.allowedValues.slice());
  }
  /**
   * Adds an importer to the internal list.
   *
   * @param {string} name - A name of an importer.
   * @param {FeatureImporter} importer - A `FeatureImporter` object.
   */
  addImporter(e = new Qe(), t = this.constructor.defaultImporterName) {
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
    let n = e.map((a) => s.get(a));
    return n = n.reduce((a, i) => a.concat(i), []), new P(this.type, n, this.languageID, this.sortOrder, this.allowedValues);
  }
  convertToJSONObject() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return {
      type: this.type,
      languageCode: A.getLanguageCodeFromId(this.languageID),
      sortOrder: this.sortOrder,
      allowedValues: this.allowedValues,
      data: e
    };
  }
  static readObject(e) {
    const t = A.getLanguageIdFromCode(e.languageCode);
    return new P(e.type, e.data, t, e.sortOrder, e.allowedValues);
  }
};
o(P, "Feature");
let l = P;
l.errMsgs = {
  NO_SINGLE_VALUE: "More than one value stored"
};
const pt = class pt {
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
    this.type = e, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = A.getLanguageAttrs(s), this._orderIndex = [], this._orderLookup = {};
    for (const [n, a] of t.entries())
      if (this._orderIndex.push(a), Array.isArray(a))
        for (const i of a)
          this[i] = new l(this.type, i, this.languageID), this._orderLookup[i] = n;
      else
        this[a] = new l(this.type, a, this.languageID), this._orderLookup[a] = n;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return S.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  /**
   * test to see if this FeatureType allows unrestricted values
   *
   * @returns {boolean} true if unrestricted false if not
   */
  hasUnrestrictedValue() {
    return this.orderedValues.length === 1 && this.orderedValues[0] === pt.UNRESTRICTED_VALUE;
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
      return new l(this.type, [[e, t]], this.languageID);
    throw new Error("A non-empty value should be provided.");
  }
  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues(e) {
    return new l(this.type, e, this.languageID);
  }
  getFromImporter(e, t) {
    let s;
    try {
      s = this.importer[e].get(t);
    } catch (n) {
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
    return this.importer = this.importer || {}, this.importer[e] = this.importer[e] || new Qe(), this.importer[e];
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
    return this.orderedValues.map((e) => new l(this.type, e, this.languageID));
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
          if (!A.compareLanguages(s.languageID, this.languageID))
            throw new Error(`Trying to order an element with language "${s.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
        }
      else {
        if (!this.hasOwnProperty(t.value))
          throw new Error('Trying to order an element with "' + t.value + '" value that is not stored in a "' + this.type + '" type.');
        if (t.type !== this.type)
          throw new Error('Trying to order an element with type "' + t.type + '" that is different from "' + this.type + '".');
        if (!A.compareLanguages(t.languageID, this.languageID))
          throw new Error(`Trying to order an element with language "${t.languageID.toString()}" that is different from "${this.languageID.toString()}"`);
      }
    this._orderLookup = {}, this._orderIndex = [];
    for (const [t, s] of e.entries())
      if (Array.isArray(s)) {
        let n = [];
        for (const a of s)
          this._orderLookup[a.value] = t, n.push(a.value);
        this._orderIndex[t] = n;
      } else
        this._orderLookup[s.value] = t, this._orderIndex[t] = s.value;
  }
};
o(pt, "FeatureType");
let et = pt;
et.UNRESTRICTED_VALUE = Symbol("unrestricted");
const Ks = class Ks {
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
      const s = this[t] instanceof l ? this[t].values.sort().join(",") : this[t];
      e.push(s);
    }
    return e.join(" ");
  }
};
o(Ks, "InflectionGroupingKey");
let k = Ks;
const js = class js {
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
};
o(js, "InflectionGroup");
let $ = js;
const Ae = class Ae {
  constructor() {
    this.context_backward = Ae.contextBackward;
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ye;
  }
  static get baseUnit() {
    return J;
  }
  /**
   * @deprecated
   */
  get contextForward() {
    return S.getInstance().warn('Please use static "contextForward" instead'), this.constructor.contextForward;
  }
  /**
   * @deprecated
   */
  get contextBackward() {
    return S.getInstance().warn('Please use static "contextBackward" instead'), this.constructor.contextBackward;
  }
  /**
   * @deprecated
   */
  get direction() {
    return S.getInstance().warn('Please use static "direction" instead'), this.constructor.direction;
  }
  /**
   * @deprecated
   */
  get baseUnit() {
    return S.getInstance().warn('Please use static "baseUnit" instead'), this.constructor.baseUnit;
  }
  /**
   * @deprecated
   */
  get features() {
    return S.getInstance().warn('Please use individual "getFeatureType" or static "features" instead'), this.constructor.features;
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
    S.getInstance().warn("This getter must be defined in a descendant class");
  }
  static get features() {
    let e = {};
    for (const t of this.featureNames)
      e[t] = this.getFeature(t);
    return e;
  }
  static get languageID() {
    return us;
  }
  static get languageCode() {
    return fs;
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
    return S.getInstance().warn('Use static "languageCodes" instead'), this.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string[]}
   */
  get codes() {
    return S.getInstance().warn('Please use a static version of "codes" instead'), this.constructor.languageCodes;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  toCode() {
    return S.getInstance().warn('Please use a static "languageCode" instead'), this.constructor.languageCode;
  }
  /**
   * @deprecated
   * @returns {string}
   */
  static toCode() {
    return S.getInstance().warn('Please use a static "languageCode" instead'), this.languageCode;
  }
  /**
   * Return a list of feature values that are allowed for each feature type
   *
   * @returns {Map<string, string[]>}
   */
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        l.types.part,
        [
          ne,
          ys,
          Oe,
          St,
          Es,
          ae,
          ie,
          ve,
          At,
          _e,
          ws,
          Is,
          de,
          bs,
          Ft,
          pe,
          Ct
        ]
      ],
      [
        l.types.gender,
        [
          Dn,
          Tn,
          On
        ]
      ],
      [
        l.types.type,
        [
          kn,
          Mn
        ]
      ],
      [
        l.types.person,
        [
          Ne,
          xe,
          Re
        ]
      ],
      [
        l.types.number,
        [
          Dt,
          Tt
        ]
      ],
      [
        l.types.age,
        []
      ],
      [
        l.types.area,
        []
      ],
      [
        l.types.source,
        []
      ],
      [
        l.types.frequency,
        []
      ],
      [
        l.types.geo,
        []
      ],
      [
        l.types.pronunciation,
        []
      ],
      [
        l.types.kind,
        []
      ],
      [
        l.types.comparison,
        []
      ],
      [
        l.types.morph,
        []
      ],
      [
        l.types.stemtype,
        []
      ],
      [
        l.types.derivtype,
        []
      ]
    ]);
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  static get sourceLanguage() {
    return S.getInstance().warn("Please use languageID directly"), this.languageID;
  }
  /**
   * @deprecated
   * @returns {symbol} Returns a language ID
   */
  get sourceLanguage() {
    return S.getInstance().warn("Please use languageID directly"), this.constructor.languageID;
  }
  /**
   * @deprecated
   * @param name
   * @returns {FeatureType}
   */
  static getFeatureType(e) {
    S.getInstance().warn("Please use getFeature instead");
    const t = this.featureValues;
    if (t.has(e))
      return new et(e, t.get(e), this.languageID);
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
      return new l(e, s, this.languageID, 1, s);
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
    return S.getInstance().warn('Please use a static version of "grammarFeatures" instead'), this.constructor.grammarFeatures();
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
    return e.lemma.features[l.types.part] ? e.lemma.features[l.types.part].value : null;
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
    return S.getInstance().warn('Please use a static version of "getPunctuation"'), this.constructor.getPunctuation();
  }
  toString() {
    return String(this.constructor.languageCode);
  }
  isEqual(e) {
    return A.compareLanguages(this.languageID, e.languageID);
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
    return !Ae.isLanguageID(e);
  }
  /**
   * @deprecated
   * @param node
   */
  canInflect(e) {
    return S.getInstance().warn('Please use a static version of "canInflect" instead'), this.constructor.canInflect(e);
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
      const a = new k(
        n,
        [l.types.part, l.types.declension, l.types.dialect, l.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i = a.toString();
      t.has(i) ? t.get(i).append(n) : t.set(i, new $(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i of n[1].inflections) {
        let u, d = !1;
        i[l.types.grmCase] ? (u = l.types.number, d = !0) : i[l.types.tense] ? u = l.types.tense : i[l.types.part] === pe || i[l.types.part] === ne ? u = l.types.part : u = "misc";
        const h = new k(i, [u], { isCaseInflectionSet: d }), c = h.toString();
        a.has(c) ? a.get(c).append(i) : a.set(c, new $(h, [i]));
      }
      for (const i of a) {
        const u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
        for (const c of i[1].inflections) {
          const p = c[l.types.grmCase] ? Math.max(c[l.types.grmCase].items.map((m) => m.sortOrder)) : 1, g = new k(c, [l.types.tense, l.types.voice]), y = g.toString();
          u.has(y) ? u.get(y).append(c) : (u.set(y, new $(g, [c], p)), d.set(y, p));
        }
        i[1].inflections = [];
        const h = Array.from(u.keys()).sort(
          (c, p) => {
            const g = d.get(c), y = d.get(p);
            return g > y ? -1 : y > g ? 1 : 0;
          }
        );
        for (const c of h)
          i[1].inflections.push(u.get(c));
      }
      for (const i of a) {
        const u = i[1];
        for (const d of u.inflections) {
          let h = /* @__PURE__ */ new Map();
          for (const c of d.inflections) {
            const p = new k(
              c,
              [
                l.types.grmCase,
                l.types.comparison,
                l.types.gender,
                l.types.number,
                l.types.person,
                l.types.tense,
                l.types.mood,
                l.types.voice
              ]
            ), g = p.toString();
            h.has(g) ? h.get(g).append(c) : h.set(g, new $(p, [c]));
          }
          d.inflections = Array.from(h.values());
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
    return S.getInstance().warn('Please use a static version of "groupInflectionsForDisplay" instead'), this.constructor.groupInflectionsForDisplay(e);
  }
};
o(Ae, "LanguageModel");
let _ = Ae, Cr = /* @__PURE__ */ new Map(), Dr = !1;
const Xs = class Xs extends _ {
  static get languageID() {
    return pn;
  }
  static get languageCode() {
    return He;
  }
  static get languageCodes() {
    return [ds, He];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ye;
  }
  static get baseUnit() {
    return J;
  }
  static get featureValues() {
    return new Map([
      ..._.featureValues,
      [
        l.types.grmClass,
        [
          Bs,
          Ms,
          ks,
          $s,
          zs,
          qs
        ]
      ],
      [
        l.types.number,
        [
          Dt,
          Tt
        ]
      ],
      [
        l.types.grmCase,
        [
          Cs,
          Fs,
          As,
          Ss,
          vn,
          _n,
          Ds
        ]
      ],
      [
        l.types.declension,
        [
          Ne,
          xe,
          Re,
          qt,
          Pn
        ]
      ],
      [
        l.types.tense,
        [
          Ps,
          xs,
          _s,
          Rs,
          Ls,
          Ns
        ]
      ],
      [
        l.types.voice,
        [
          Vs,
          Us
        ]
      ],
      [
        l.types.mood,
        [
          Os,
          vs,
          Ts,
          $e,
          Rn,
          zt,
          $e,
          Nn
        ]
      ],
      [
        l.types.conjugation,
        [
          Ne,
          xe,
          Re,
          qt
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return Dr || this.initTypeFeatures(), Cr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Cr.set(e, this.getFeature(e));
    Dr = !0;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [l.types.part, l.types.grmCase, l.types.mood, l.types.declension, l.types.tense, l.types.conjugation];
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
    return e === l.types.mood && t === zt ? $e : e === l.types.part && t === ae ? ie : t;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[l.types.part] ? e.lemma.features[l.types.part].value === ae ? ie : e.lemma.features[l.types.part].value : null;
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
    return e.hasOwnProperty(l.types.part) ? [pe, Ct, Ft, Fn].includes(e[l.types.part].value) ? (t.fullFormBased = !0, t.suffixBased = !0) : e[l.types.part].value === de ? t.fullFormBased = !0 : t.suffixBased = !0 : S.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[l.types.part]), t;
  }
};
o(Xs, "LatinLanguageModel");
let tt = Xs;
const Ys = class Ys {
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
o(Ys, "GreekChars");
let Wt = Ys, Tr = /* @__PURE__ */ new Map(), Or = !1;
const V = class V extends _ {
  static get languageID() {
    return gn;
  }
  static get languageCode() {
    return Ge;
  }
  static get languageCodes() {
    return [Ge];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ye;
  }
  static get baseUnit() {
    return J;
  }
  static get featureValues() {
    return new Map([
      ..._.featureValues,
      [
        l.types.grmClass,
        [
          $s,
          $n,
          zn,
          qn,
          qs,
          Bs,
          ks,
          Wn,
          Ms,
          zs
        ]
      ],
      [
        l.types.number,
        [
          Dt,
          Tt,
          Ln
        ]
      ],
      [
        l.types.grmCase,
        [
          Cs,
          Fs,
          As,
          Ss,
          Ds
        ]
      ],
      [
        l.types.declension,
        [
          Ne,
          xe,
          Re
        ]
      ],
      [
        l.types.tense,
        [
          Ps,
          xs,
          _s,
          Rs,
          Ls,
          Ns,
          Vn
        ]
      ],
      [
        l.types.voice,
        [
          Us,
          Vs,
          Un,
          Bn
        ]
      ],
      [
        l.types.mood,
        [
          Os,
          vs,
          xn,
          Ts
        ]
      ],
      [
        // TODO full list of greek dialects
        l.types.dialect,
        [
          "attic",
          "epic",
          "doric"
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return Or || this.initTypeFeatures(), Tr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Tr.set(e, this.getFeature(e));
    Or = !0;
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
    return [l.types.part, l.types.grmCase, l.types.mood, l.types.declension, l.types.tense, l.types.voice];
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
    return e.lemma.features[l.types.part] ? e.lemma.features[l.types.part].value === _e ? ne : e.lemma.features[l.types.part].value === ae ? ie : e.lemma.features[l.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return e === l.types.part && t === _e ? ne : e === l.types.part && t === ae ? ie : t;
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
    preserveCase: a = !1,
    includeOriginal: i = !1
  } = {}) {
    if (!e)
      return [];
    let u = V.normalizeText(e);
    a || (u = u.toLocaleLowerCase());
    const d = u.replace(
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
    ), h = V._tonosToOxia(u), c = u.replace(
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
    ), p = u.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug,
      ""
    ).normalize("NFC");
    let g = [];
    return n === "strippedDiaeresis" ? g.push(c) : n === "strippedDiacritics" ? g.push(p) : n === "strippedAll" ? g.push(c.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug,
      ""
    ).normalize("NFC")) : (g.push(d), h !== d && g.push(h)), i || (g = g.filter((y) => y !== e)), g;
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
    }, s = [de, At, St];
    return e.hasOwnProperty(l.types.part) ? s.includes(e[l.types.part].value) ? t.fullFormBased = !0 : t.suffixBased = !0 : S.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[l.types.part]), t.pronounClassRequired = A.compareLanguages(V.languageID, e.languageID) && e.hasOwnProperty(l.types.part) && // eslint-disable-line no-prototype-builtins
    e[l.types.part].value === de, t;
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
    let a = /* @__PURE__ */ new Set();
    const i = e.filter(
      (u) => {
        let d = !1;
        return u.value && (!u.features[l.types.hdwd] || u.features[l.types.hdwd].value === s) && (d = V.compareWords(u.value, t, n)), d;
      }
    );
    for (const u of i)
      if (u.features.hasOwnProperty(l.types.grmClass))
        for (const d of u.features[l.types.grmClass].values)
          a.add(d);
    if (a.size > 0)
      return new l(l.types.grmClass, Array.from(a), V.languageID);
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
    let a = !1;
    if (s) {
      n && (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t));
      const i = V.alternateWordEncodings({
        word: e,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      }), u = V.alternateWordEncodings({
        word: t,
        encoding: "strippedDiacritics",
        includeOriginal: !0
      });
      for (let d = 0; d < i.length && (a = i[d] === u[d], !a); d++)
        ;
      a || (a = V.normalizeText(e) === V.normalizeText(t));
    } else
      a = e === t;
    return a;
  }
  static isValidUnicode(e) {
    return Wt.chars.some((t) => e.includes(t));
  }
};
o(V, "GreekLanguageModel");
let Ht = V;
const vr = /* @__PURE__ */ new Map();
let _r = !1;
const Zs = class Zs extends _ {
  static get languageID() {
    return mn;
  }
  static get languageCode() {
    return Je;
  }
  static get languageCodes() {
    return [Je, ps];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Pe;
  }
  static get baseUnit() {
    return J;
  }
  static get typeFeatures() {
    return _r || this.initTypeFeatures(), vr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      vr.set(e, this.getFeature(e));
    _r = !0;
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
    preserveCase: a = !1,
    includeOriginal: i = !1
  } = {}) {
    const u = e.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, ""), d = u.replace(/[\u{0622}\u{0623}\u{0625}]/ug, "ا"), h = d.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, ""), c = h.replace(/\u{0651}/ug, ""), p = c.replace(/\u{0652}/ug, ""), g = p.replace(/\u{0627}/ug, ""), y = /* @__PURE__ */ new Map([
      ["tanwin", u],
      ["hamza", d],
      ["harakat", h],
      ["shadda", c],
      ["sukun", p],
      ["alef", g]
    ]);
    let m = [];
    return n !== null && y.has(n) ? m = [y.get(n)] : m = Array.from(y.values()), i || (m = m.filter((I) => I !== e)), m;
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
    let t = [], s = { [ve]: [], [Oe]: [], [$t]: [] };
    for (const n of e)
      n[l.types.morph] && n[l.types.morph].value.match(/ADJ[uaiNK]/) ? s[Oe].push(n) : n[l.types.morph] && n[l.types.morph].value.match(/NOUN[uaiNK]/) ? s[ve].push(n) : n[l.types.morph] && n[l.types.morph].value.match(/NOUN_PROP[uaiNK]/) ? s[$t].push(n) : (n.example = null, t.push(n));
    for (const n of Object.keys(s))
      t.filter((i) => i[l.types.part].value === n).length !== 1 && t.push(...s[n]);
    return t;
  }
};
o(Zs, "ArabicLanguageModel");
let st = Zs, Nr = /* @__PURE__ */ new Map(), xr = !1;
const Qs = class Qs extends _ {
  static get languageID() {
    return yn;
  }
  static get languageCode() {
    return Ke;
  }
  static get languageCodes() {
    return [Ke, En, In, wn];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Pe;
  }
  static get baseUnit() {
    return J;
  }
  static get typeFeatures() {
    return xr || this.initTypeFeatures(), Nr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Nr.set(e, this.getFeature(e));
    xr = !0;
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
o(Qs, "PersianLanguageModel");
let Gt = Qs;
const Rr = /* @__PURE__ */ new Map();
let Lr = !1;
const er = class er extends _ {
  static get languageID() {
    return ls;
  }
  static get languageCode() {
    return je;
  }
  static get languageCodes() {
    return [je];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ye;
  }
  static get baseUnit() {
    return J;
  }
  static get featureValues() {
    return new Map([
      ..._.featureValues,
      [
        l.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        l.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        l.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        l.types.mood,
        [
          // TODO Valid Values for mood for gez
        ]
      ]
    ]);
  }
  static get typeFeatures() {
    return Lr || this.initTypeFeatures(), Rr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Rr.set(e, this.getFeature(e));
    Lr = !0;
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
o(er, "GeezLanguageModel");
let Jt = er, Pr = /* @__PURE__ */ new Map(), Vr = !1;
const tr = class tr extends _ {
  static get languageID() {
    return cs;
  }
  static get languageCode() {
    return Xe;
  }
  static get languageCodes() {
    return [
      bn,
      Xe,
      Sn,
      An
    ];
  }
  static get contextForward() {
    return 5;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return ye;
  }
  static get baseUnit() {
    return dn;
  }
  static get featureValues() {
    return /* @__PURE__ */ new Map([
      [
        l.types.fullForm,
        []
      ],
      [
        l.types.frequency,
        []
      ],
      [
        l.types.pronunciation,
        []
      ],
      [
        l.types.radical,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return Vr || this.initTypeFeatures(), Pr;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Pr.set(e, this.getFeature(e));
    Vr = !0;
  }
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\
\r，、。「」《》‌‍†‡`;
  }
  static _isVowel(e) {
    return ["a", "e", "i", "o", "u"].includes(e);
  }
  static formatPinyin(e) {
    const t = ["ā", "á", "ǎ", "à", "a"], s = ["ē", "é", "ě", "è", "e"], n = ["ī", "í", "ǐ", "ì", "i"], a = ["ō", "ó", "ǒ", "ò", "o"], i = ["ū", "ú", "ǔ", "ù", "u"], u = ["ǖ", "ǘ", "ǚ", "ǜ", "ü"];
    e = e.split(/(\d)/).map((c) => c.trim()).filter((c) => !!c);
    let d = [];
    const h = {
      1: 0,
      2: 1,
      3: 2,
      4: 3
    };
    for (let c = 0; c < e.length; c++)
      if (c % 2 === 0) {
        let p = e[c];
        const g = h[e[c + 1]] !== void 0 ? h[e[c + 1]] : 4;
        if (p.indexOf("a") !== -1)
          p = p.replace("a", t[g]);
        else if (p.indexOf("e") !== -1)
          p = p.replace("e", s[g]);
        else if (p.indexOf("ou") !== -1)
          p = p.replace("o", a[g]);
        else
          for (let y = p.length - 1; y >= 0; y--)
            if (this._isVowel(p[y])) {
              switch (p[y]) {
                case "i":
                  p = p.replace("i", n[g]);
                  break;
                case "o":
                  p = p.replace("o", a[g]);
                  break;
                case "u":
                  y + 1 < p.length - 1 && p[y + 1] === ":" ? p = p.replace("u:", u[g]) : p = p.replace("u", i[g]);
                  break;
                default:
                  S.getInstance().warn("some kind of weird vowel", p[y]);
              }
              break;
            }
        d.push(p);
      }
    return d.join(" ").trim();
  }
};
o(tr, "ChineseLanguageModel");
let Kt = tr;
const Ur = /* @__PURE__ */ new Map();
let Br = !1;
const sr = class sr extends _ {
  static get languageID() {
    return hs;
  }
  static get languageCode() {
    return Ye;
  }
  static get languageCodes() {
    return [Ye, gs, ms];
  }
  static get contextForward() {
    return 0;
  }
  static get contextBackward() {
    return 0;
  }
  static get direction() {
    return Pe;
  }
  static get baseUnit() {
    return J;
  }
  static get featureValues() {
    return new Map([
      ..._.featureValues,
      [
        l.types.part,
        [
          ne,
          ys,
          Oe,
          St,
          Es,
          ae,
          ie,
          ve,
          At,
          _e,
          ws,
          Is,
          de,
          bs,
          Ft,
          pe,
          Ct,
          Cn
        ]
      ],
      [
        l.types.kaylo,
        []
      ],
      [
        l.types.state,
        []
      ]
    ]);
  }
  static get typeFeatures() {
    return Br || this.initTypeFeatures(), Ur;
  }
  static initTypeFeatures() {
    for (const e of this.featureNames)
      Ur.set(e, this.getFeature(e));
    Br = !0;
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
      const a = new k(
        n,
        [l.types.part, l.types.declension, l.types.kaylo, l.types.state, l.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i = a.toString();
      t.has(i) ? t.get(i).append(n) : t.set(i, new $(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i of n[1].inflections) {
        let u, d = !1;
        i[l.types.grmCase] ? (u = l.types.number, d = !0) : i[l.types.tense] ? u = l.types.tense : i[l.types.part] === pe || i[l.types.part] === ne ? u = l.types.part : u = "misc";
        const h = new k(i, [u], { isCaseInflectionSet: d }), c = h.toString();
        a.has(c) ? a.get(c).append(i) : a.set(c, new $(h, [i]));
      }
      for (const i of a) {
        const u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
        for (const c of i[1].inflections) {
          const p = c[l.types.grmCase] ? Math.max(c[l.types.grmCase].items.map((m) => m.sortOrder)) : 1, g = new k(c, [l.types.tense, l.types.voice]), y = g.toString();
          u.has(y) ? u.get(y).append(c) : (u.set(y, new $(g, [c], p)), d.set(y, p));
        }
        i[1].inflections = [];
        const h = Array.from(u.keys()).sort(
          (c, p) => {
            const g = d.get(c), y = d.get(p);
            return g > y ? -1 : y > g ? 1 : 0;
          }
        );
        for (const c of h)
          i[1].inflections.push(u.get(c));
      }
      for (const i of a) {
        const u = i[1];
        for (const d of u.inflections) {
          const h = /* @__PURE__ */ new Map();
          for (const c of d.inflections) {
            const p = new k(
              c,
              [
                l.types.grmCase,
                l.types.comparison,
                l.types.gender,
                l.types.number,
                l.types.person,
                l.types.tense,
                l.types.mood,
                l.types.voice
              ]
            ), g = p.toString();
            h.has(g) ? h.get(g).append(c) : h.set(g, new $(p, [c]));
          }
          d.inflections = Array.from(h.values());
        }
      }
      n[1].inflections = Array.from(a.values());
    }
    return Array.from(t.values());
  }
};
o(sr, "SyriacLanguageModel");
let be = sr;
const X = /* @__PURE__ */ new Map([
  [ds, tt],
  [He, tt],
  [Ge, Ht],
  [Je, st],
  [ps, st],
  [Ke, Gt],
  [je, Jt],
  [Xe, Kt],
  [Ye, be],
  [gs, be],
  [ms, be]
]), M = class M {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage(e) {
    return e = typeof e == "symbol" ? M.getLanguageCodeFromId(e) : e, X.has(e);
  }
  static availableLanguages() {
    let e = /* @__PURE__ */ new Set();
    for (const t of X.values())
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
    const t = M.getLanguageCodeFromId(e);
    return M.getLanguageModelFromCode(t);
  }
  static getLanguageModelFromCode(e) {
    return X.has(e) ? X.get(e) : _;
  }
  static getLanguageForCode(e = null) {
    const t = X.get(e);
    return t ? new t() : new _();
  }
  /**
   * Converts an ISO 639-3 language code to a language ID
   *
   * @param {string} languageCode - An ISO 639-3 language code
   * @returns {symbol | undefined} A language ID or undefined if language ID is not found
   */
  static getLanguageIdFromCode(e) {
    for (const t of X.values())
      if (t.hasCode(e))
        return t.languageID;
    return us;
  }
  /**
   * Converts a language ID to an default ISO 639-3 language code for that language
   *
   * @param {symbol} languageID - A language ID
   * @returns {string | undefined} An ISO 639-3 language code or undefined if language code is not found
   */
  static getLanguageCodeFromId(e) {
    for (const t of X.values())
      if (t.languageID.toString() === e.toString())
        return t.languageCode;
    return fs;
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
      languageCode: M.getLanguageCodeFromId(e)
    } : {
      languageID: M.getLanguageIdFromCode(e),
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
    return e = typeof e == "symbol" ? M.getLanguageCodeFromId(e) : e, t = typeof t == "symbol" ? M.getLanguageCodeFromId(t) : t, e === t;
  }
  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage(e) {
    return [ls, hs, cs].includes(e);
  }
};
o(M, "LanguageModelFactory");
let A = M;
const gt = class gt {
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
    const t = A.getLanguageIdFromCode(e.languageCode);
    let s = new gt(e.lemmaWord, t);
    for (const n of e.shortDefs)
      s.shortDefs.push(Ze.readObject(n));
    for (const n of e.fullDefs)
      s.fullDefs.push(Ze.readObject(n));
    return s;
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
    const e = A.getLanguageCodeFromId(this.languageID);
    return {
      lemmaWord: this.lemmaWord,
      languageCode: e,
      shortDefs: this.shortDefs.map((t) => t.convertToJSONObject()),
      fullDefs: this.fullDefs.map((t) => t.convertToJSONObject())
    };
  }
};
o(gt, "DefinitionSet");
let Se = gt;
const mt = class mt {
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
  constructor(e, t, s, n = 1) {
    if (!mt.types.isAllowed(t))
      throw new Error('Features of "' + t + '" type are not supported.');
    if (!e)
      throw new Error("Feature should have a non-empty value.");
    if (!t)
      throw new Error("Feature should have a non-empty type.");
    if (!s)
      throw new Error("Feature constructor requires a language");
    this.value = e, this.type = t, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = A.getLanguageAttrs(s), this.sortOrder = n;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return S.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
  }
  isEqual(e) {
    if (Array.isArray(e.value)) {
      if (!Array.isArray(this.value) || this.value.length !== e.value.length)
        return !1;
      let t = this.type === e.type && A.compareLanguages(this.languageID, e.languageID);
      return t = t && this.value.every(function(s, n) {
        return s === e.value[n];
      }), t;
    } else
      return A.compareLanguages(this.languageID, e.languageID) && this.type === e.type && this.value === e.value;
  }
  isSubsetof(e) {
    Array.isArray(e) || (e = [e]);
    const t = e[0].languageID, s = e[0].type, n = e.map((a) => a.value);
    return !!(A.compareLanguages(this.languageID, t) && this.type === s && n.includes(this.value));
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
      if (!(e[0] instanceof l)) {
        const t = e[0].type, s = e[0].languageID, n = e.map((a) => a.value);
        return new l(t, n, s);
      }
    } else if (!(e instanceof l))
      return new l(e.type, e.value, e.languageID);
    return e;
  }
};
o(mt, "GrmFeature");
let jt = mt;
jt.types = {
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
  isAllowed(r) {
    const e = `${r}`;
    return Object.values(this).includes(e);
  }
};
const rr = class rr {
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
o(rr, "FeatureList");
let Mr = rr;
const Fe = class Fe {
  /**
   * Initializes a Translation object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param languageCode
   * @param translations
   */
  constructor(e, t, s = []) {
    if (!e)
      throw new Error("Lemma should not be empty.");
    this.lemmaWord = e.word, this.languageCode = t, this.glosses = s;
  }
  static readTranslationFromJSONList(e, t, s, n) {
    if (!s || !Array.isArray(s))
      throw new Error("Recieved not proper translation list", s);
    const a = s.find(function(u) {
      return u.in === e.word;
    }), i = new Fe(e, t, a.translations);
    return n ? W.getProxy(n, i) : i;
  }
  static loadTranslations(e, t, s, n) {
    e.addTranslation(this.readTranslationFromJSONList(e, t, s, n));
  }
  convertToJSONObject() {
    let e = {
      languageCode: this.languageCode,
      translations: this.glosses
    };
    return this.provider && (e.provider = this.provider.convertToJSONObject()), e;
  }
  static readObject(e, t) {
    const s = new Fe(t, e.languageCode, e.translations);
    if (e.provider) {
      const n = W.readObject(e.provider);
      return W.getProxy(n, s);
    } else
      return s;
  }
};
o(Fe, "Translation");
let Xt = Fe;
const yt = class yt {
  /**
   * Initializes a Lemma object.
   *
   * @param {string} word - A word.
   * @param {symbol | string} languageID - A language ID (symbol, please use this) or a language code of a word.
   * @param {string[]} principalParts - the principalParts of a lemma.
   * @param {object} features - the grammatical features of a lemma.
   * @param {Translation} transaltions - translations from python service
   */
  constructor(e, t, s = [], n = {}) {
    if (!e)
      throw new Error("Word should not be empty.");
    if (!t)
      throw new Error("Language should not be empty.");
    this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = A.getLanguageAttrs(t), this.word = e, this.principalParts = s, this.features = {}, this.ID = Ot();
  }
  get language() {
    return S.getInstance().warn('Please use "languageID" instead of "language"'), this.languageCode;
  }
  get displayWord() {
    return this.word.replace(/\d+$/, "");
  }
  static readObject(e) {
    const t = e.language ? e.language : e.languageCode;
    let s = new yt(e.word, t, e.principalParts, e.pronunciation);
    return e.features && e.features.length > 0 && e.features.forEach((n) => {
      s.addFeature(l.readObject(n));
    }), e.translation && (s.translation = Xt.readObject(e.translation, s)), s;
  }
  convertToJSONObject() {
    let e = [];
    for (const s of Object.values(this.features))
      e.push(s.convertToJSONObject());
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
    if (S.getInstance().warn('Please use "addFeature" instead'), !e)
      throw new Error("feature data cannot be empty.");
    Array.isArray(e) || (e = [e]);
    const t = e[0].type;
    this.features[t] = [];
    for (const s of e) {
      if (!(s instanceof l))
        throw new Error("feature data must be a Feature object.");
      if (!A.compareLanguages(s.languageID, this.languageID))
        throw new Error('Language "' + s.languageID.toString() + '" of a feature does not match a language "' + this.languageID.toString() + '" of a Lemma object.');
      this.features[t].push(s);
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
    if (!(e instanceof l) && e.constructor.name !== "Feature")
      throw new Error("feature data must be a Feature object.");
    if (!A.compareLanguages(e.languageID, this.languageID))
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
  isFullHomonym(e, { normalize: t = !1, ignorePofs: s = !1 } = {}) {
    if (!s && (!this.features[l.types.part] || !e.features[l.types.part] || !this.features[l.types.part].isEqual(e.features[l.types.part])))
      return !1;
    const n = A.getLanguageModel(this.languageID), a = t ? n.compareWords(
      this.word,
      e.word,
      !0,
      { normalizeTrailingDigit: !0 }
    ) : this.word === e.word, i = n.hasTrailingDigit(this.word), u = n.hasTrailingDigit(e.word);
    if (i && u) {
      const d = this.word.match(/\d+$/)[0], h = e.word.match(/\d+$/)[0];
      if (d !== h)
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
    const t = A.getLanguageModel(this.languageID);
    if (!t.compareWords(this.word, e.word, !0, { normalizeTrailingDigit: !0 }))
      throw new Error("Words that differ cannot be disambiguated");
    const n = t.hasUpperCase(this.word);
    if (t.hasUpperCase(e.word))
      return e.word;
    if (n)
      return this.word;
    const i = t.needsNormalization(this.word);
    if (t.needsNormalization(e.word))
      return t.normalizeText(e.word);
    if (i)
      return t.normalizeText(this.word);
    const d = t.hasTrailingDigit(this.word);
    return t.hasTrailingDigit(e.word) ? e.word : d ? this.word : this.word;
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
o(yt, "Lemma");
let ge = yt;
const Ce = class Ce {
  /**
   * Initializes an Inflection object.
   *
   * @param {string} stem - A stem of a word.
   * @param {string | symbol} language - A word's language.
   * @param {string} suffix - a suffix of a word
   * @param {prefix} prefix - a prefix of a word
   * @param {example} example - example
   */
  constructor(e = null, t, s = null, n = null, a = null) {
    if (!e && !s)
      throw new Error("At least stem or suffix must be defined");
    if (!t)
      throw new Error("Language should not be empty.");
    if (!A.supportsLanguage(t))
      throw new Error(`language ${t} not supported.`);
    this.stem = e, this.languageID = void 0, this.languageCode = void 0, { languageID: this.languageID, languageCode: this.languageCode } = A.getLanguageAttrs(t), this.model = A.getLanguageModel(this.languageID), this.features = /* @__PURE__ */ new Set(), this.constraints = {
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
    }, this.suffix = s, this.prefix = n, this.example = a, this.lemma = null;
  }
  clone() {
    let e = new Ce(this.stem, this.languageID, this.suffix, this.prefix, this.example);
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
    let t, s, n;
    const a = this.stem ? this.stem : "";
    return this.model.direction === Pe ? (s = this.prefix ? e + this.prefix : "", n = this.suffix ? this.suffix + e : "", t = n + a + s) : (s = this.prefix ? this.prefix + e : "", n = this.suffix ? e + this.suffix : "", t = s + a + n), t;
  }
  /**
   * This is a compatibility function for legacy code.
   *
   * @returns {string} A language code.
   */
  get language() {
    return S.getInstance().warn('Please use a "languageID" instead of a "language"'), this.languageCode;
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
  smartWordCompare(e, t, s = {}) {
    s.hasOwnProperty("normalize") || (s.normalize = !0), s.hasOwnProperty("fuzzySuffix") || (s.fuzzySuffix = !1);
    let n;
    this.constraints.irregular ? t === "Suffix" ? n = this.suffix : n = this[l.types.fullForm] ? this[l.types.fullForm].value : this.form : n = this.constraints.suffixBased ? this.suffix : this.form;
    let a = this.modelCompareWords(e, n, s.normalize);
    if (!a && t === "Suffix" && s.fuzzySuffix) {
      const i = this.getForm();
      if (i && e && i.length >= e.length) {
        const u = i.substring(i.length - e.length);
        a = this.modelCompareWords(e, u, s.normalize);
      }
    }
    return a;
  }
  compareWithWord(e, t = !0) {
    const s = this.constraints.suffixBased ? this.suffix : this.form;
    return this.modelCompareWords(e, s, t);
  }
  /**
   * Compare to words (or partial words) delegating to the language model
   * rules for normalization
   *
   * @param {string} wordA the first word
   * @param {string} wordB the second word
   * @param {boolean} normalize whether or not to apply normalization
   */
  modelCompareWords(e, t, s = !0) {
    return A.getLanguageModel(this.languageID).compareWords(e, t, s);
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
  modelCompareFeatureValue(e, t, s, n = !0) {
    return A.getLanguageModel(this.languageID).compareFeatureValue(e, t, s, { normalize: n });
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
    let s = !0, n = !0;
    (this.features.size === 0 || e.features.size === 0) && (s = !1), e.features.size > this.features.size && (s = !1);
    for (const a of e.features)
      if (!(t && a === l.types.part))
        for (const i of e[a].values) {
          if (!this.hasFeatureValue(a, i, { normalize: !0 })) {
            s = !1;
            break;
          }
          this[a].values.length !== e[a].values.length && (n = !1);
        }
    return { match: s, exactMatch: n };
  }
  /**
   * @deprecated Use `addFeature` instead
   * Sets a grammatical feature in an inflection. Some features can have multiple values, In this case
   * an array of Feature objects will be provided.
   * Values are taken from features and stored in a 'feature.type' property as an array of values.
   * @param {Feature | Feature[]} data
   */
  set feature(e) {
    if (S.getInstance().warn('Please use "addFeature" instead.'), !e)
      throw new Error("Inflection feature data cannot be empty.");
    Array.isArray(e) || (e = [e]);
    const t = e[0].type;
    this[t] = [];
    for (const s of e) {
      if (!(s instanceof l))
        throw new Error("Inflection feature data must be a Feature object.");
      if (!A.compareLanguages(s.languageID, this.languageID))
        throw new Error(`Language "${s.languageID.toString()}" of a feature does not match
          a language "${this.languageID.toString()}" of an Inflection object.`);
      this[t].push(s), this.features.add(t);
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
    if (!(e instanceof l) && e.constructor.name !== "Feature")
      throw new Error("feature data must be a Feature object.");
    if (!A.compareLanguages(e.languageID, this.languageID))
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
  hasFeatureValue(e, t, { normalize: s = !1 } = {}) {
    return this.hasOwnProperty(e) ? this[e].values.some((n) => this.modelCompareFeatureValue(e, n, t)) : !1;
  }
  toString() {
    let e = `Inflection stem: ${this.stem}, prefix: ${this.prefix}, suffix: ${this.suffix}, langID: ${this.languageID.toString()}
  features:  `;
    for (const t of this.features.values())
      e += `${t}: ${this[t].value}, `;
    e += `
  constraints:  `;
    for (const [t, s] of Object.entries(this.constraints))
      Array.isArray(s) ? e += `${t}: [${s}], ` : e += `${t}: ${s}, `;
    return e += `
  example: ${this.example}`, e;
  }
  static readObject(e, t) {
    let s = new Ce(
      e.stem,
      e.languageCode,
      e.suffix,
      e.prefix,
      e.example
    );
    return s.languageID = A.getLanguageIdFromCode(s.languageCode), e.features && e.features.length > 0 && e.features.forEach((n) => {
      s.addFeature(l.readObject(n));
    }), t && (s.lemma = t), s;
  }
  convertToJSONObject() {
    let e = [];
    for (const s of this.features.keys())
      e.push(this[s].convertToJSONObject());
    const t = A.getLanguageCodeFromId(this.languageID);
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
o(Ce, "Inflection");
let rt = Ce;
const De = class De {
  /**
   * Initializes a Lexeme object.
   *
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.
   */
  constructor(e, t, s = null) {
    if (!e)
      throw new Error("Lemma should not be empty.");
    if (!(e instanceof ge))
      throw new Error("Lemma should be of Lemma object type.");
    if (!t)
      throw new Error("Inflections data should not be empty.");
    if (!Array.isArray(t))
      throw new Error("Inflection data should be provided in an array.");
    for (const n of t)
      if (!(n instanceof rt))
        throw new Error("All inflection data should be of Inflection object type.");
    if (s !== null && !(s instanceof Se))
      throw new Error("Meaning should be of DefinitionSet object type.");
    this.lemma = e, this.altLemmas = [], this.inflections = [], this.addInflections(t), this.meaning = s || new Se(this.lemma.word, this.lemma.languageID), this.disambiguated = !1, this.selectedInflection = null;
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
    return this.selectedInflection ? A.getLanguageModel(this.lemma.languageID).groupInflectionsForDisplay([this.selectedInflection]) : [];
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
    const s = A.getLanguageModel(this.lemma.languageID), n = s.normalizePartOfSpeechValue(this);
    if (n === s.normalizePartOfSpeechValue(e)) {
      const a = n !== this.lemma.features[l.types.part];
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
    const t = e.inflections.length || _.hasTrailingDigit(e.lemma.word);
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
    let s = new De(e.lemma, e.inflections, e.meaning);
    const n = A.getLanguageModel(e.lemma.languageID);
    if (e.canBeDisambiguatedWith(t))
      for (const a of s.inflections)
        for (const i of t.inflections) {
          const d = n.normalizePartOfSpeechValue(t) !== t.lemma.features[l.types.part], h = a.disambiguatedBy(i, { ignorePofs: d });
          h.match && (h.exactMatch ? s.setSelectedInflection(a) : s.setSelectedInflection(i));
        }
    return s;
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
    return A.getLanguageModel(this.lemma.languageID).groupInflectionsForDisplay(this.inflections);
  }
  static readObject(e) {
    const t = ge.readObject(e.lemma);
    let s = [];
    for (const a of e.inflections)
      s.push(rt.readObject(a));
    const n = new De(t, s);
    if (e.meaning && (n.meaning = Se.readObject(e.meaning)), e.provider) {
      const a = W.readObject(e.provider);
      return W.getProxy(a, n);
    } else
      return n;
  }
  convertToJSONObject(e = !1) {
    let t = [];
    this.inflections.forEach((n) => {
      t.push(n.convertToJSONObject());
    });
    const s = {
      lemma: this.lemma.convertToJSONObject(),
      inflections: t
    };
    return e && (s.meaning = this.meaning.convertToJSONObject()), this.provider && (s.provider = this.provider.convertToJSONObject()), s;
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
    return (s, n) => {
      if (s.lemma.features[e] && n.lemma.features[e] || !s.lemma.features[e] && !n.lemma.features[[e]]) {
        let a;
        return s.lemma.features[e] && n.lemma.features[e] ? a = s.lemma.features[e].compareTo(n.lemma.features[e]) : a = 0, a !== 0 ? a : s.lemma.features[t] && n.lemma.features[t] ? s.lemma.features[t].compareTo(n.lemma.features[t]) : s.lemma.features[t] && !n.lemma.features[t] ? -1 : !s.lemma.features[t] && n.lemma.features[t] ? 1 : 0;
      } else return s.lemma.features[e] && !n.lemma.features[e] ? -1 : !s.lemma.features[e] && n.lemma.features[e] ? 1 : 0;
    };
  }
};
o(De, "Lexeme");
let Y = De;
const Z = class Z {
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
    for (const s of e)
      if (!(s instanceof Y))
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
  static createSimpleForm(e, t, s = []) {
    const n = new ge(e, t), a = new Y(n, s);
    return new Z([a], e);
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
        t.push(Y.readObject(n));
    else {
      const n = A.getLanguageIdFromCode(e.languageCode);
      t = [new Y(new ge(e.targetWord, n), [])];
    }
    const s = new Z(t, e.form || e.targetWord);
    return s.lemmasList = e.lemmasList, s;
  }
  convertToJSONObject(e = !1) {
    let t = { lexemes: [], form: this.targetWord };
    for (const s of this.lexemes)
      t.lexemes.push(s.convertToJSONObject(e));
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
    return S.getInstance().warn("Please use languageID instead"), A.getLanguageCodeFromId(this.languageID);
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
    const s = t.shift();
    let n = [], a = [], i = [], u = [];
    for (const h of s.lexemes) {
      for (const c of e.lexemes) {
        const p = c.canBeDisambiguatedWith(h) ? Y.disambiguateInflections(c, h) : c;
        c.isFullHomonym(h, { normalize: !0 }) ? p.getSelectedInflection() !== null ? (p.setDisambiguation(h), n.push(p)) : i.push(p) : u.push(p);
      }
      if (n.length === 0)
        if (i.length > 0)
          for (const c of i) {
            c.setDisambiguation(h);
            for (const p of s.inflections)
              c.addInflection(p), c.setSelectedInflection(p);
          }
        else {
          h.setDisambiguation();
          for (const c of h.inflections)
            h.setSelectedInflection(c);
          a.push(h);
        }
    }
    const d = new Z([...a, ...n, ...i, ...u], e.targetWord);
    return Z.disambiguate(d, t);
  }
};
o(Z, "Homonym");
let nt = Z;
const Et = class Et {
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
      throw new Error(Et.errors.NO_TARGET_WORD);
    const s = this._homonyms.map((n) => n.lexemes).flat();
    return t && s.forEach((n) => {
      n.disambiguated = !0;
    }), new nt(s, e);
  }
};
o(Et, "HomonymGroup");
let Yt = Et;
Yt.errors = {
  NO_TARGET_WORD: "Target word is not provided"
};
const nr = class nr {
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
o(nr, "PsEventData");
let Zt = nr;
const ar = class ar {
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
    const t = Ot();
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
    this._subscribers.forEach((s) => s(e, new Zt(this, t)));
  }
  /**
   * Unsubscribes all subscribers from an event.
   */
  unsubAll() {
    this._subscribers.clear();
  }
};
o(ar, "PsEvent");
let kr = ar;
const wt = class wt {
  constructor(e, t, s = null, n = null, a = null) {
    this.languageCode = e, this.normalizedText = t, this.contextForward = 6, this.contextBackward = 6, this.text = this.normalizedText, this.prefix = s, this.suffix = n, this.source = a, this.ID = Ot();
  }
  get contextHTML() {
    const e = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`, t = this.prefix.replace(this.text, e), s = this.suffix.replace(this.text, e);
    return `${t} <span class="alpheios_worditem_incontext">${this.text}</span> ${s}`;
  }
  static readObject(e) {
    let t = new wt(e.languageCode, e.target.selector.exact);
    return t.prefix = e.target.selector.prefix, t.suffix = e.target.selector.suffix, t.text = e.targetWord, t.source = e.target.source, t;
  }
  isEqual(e) {
    let t = `${this.prefix}${this.text}${this.suffix}`;
    t = t.trim();
    let s = `${e.prefix}${e.text}${e.suffix}`;
    return s = s.trim(), this.text === e.text && this.source === e.source && this.languageCode === e.languageCode && t === s;
  }
  updateLanguage(e) {
    this.languageCode = e;
  }
};
o(wt, "TextQuoteSelector");
let at = wt;
const ir = class ir extends at {
  constructor(e, t, s, n, a, i) {
    super(e, t), this.prefix = s, this.suffix = n, this.source = a, this.cit = i, this.author = null, this.textWork = null, this.passage = null;
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
    const e = A.getLanguageModelFromCode(this.languageCode), t = this.prefix.replace(new RegExp("[" + e.getPunctuation() + " ]", "g"), " ").toUpperCase().split(" ").filter((s) => s.length > 0);
    return t[t.length - 1];
  }
  get suffixForSort() {
    const e = A.getLanguageModelFromCode(this.languageCode);
    return this.suffix.replace(new RegExp("[" + e.getPunctuation() + " ]", "g"), "").toUpperCase();
  }
};
o(ir, "WordUsageExample");
let $r = ir;
const Q = class Q {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {Author}
   */
  constructor(e, t, s) {
    this.urn = e, this.titles = t, this.abbreviations = s;
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
    return this.titles[e] ? this.titles[e] : this.titles[Q.defaultLang] ? this.titles[Q.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[Q.defaultLang] ? this.abbreviations[Q.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o(Q, "Author");
let zr = Q;
const ee = class ee {
  /**
   * Constructor, extracts ID from urn
   *
   * @param {Author} author - author of the textWork
   * @param {string} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
   * @param {object} titles - has the following format { languageCode: title }
   * @param {object} abbreviations - has the following format { languageCode: abbreviation }
   * @returns {TextWork}
   */
  constructor(e, t, s, n) {
    this.urn = t, this.titles = s, this.author = e, this.abbreviations = n;
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
    return this.titles[e] ? this.titles[e] : this.titles[ee.defaultLang] ? this.titles[ee.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[ee.defaultLang] ? this.abbreviations[ee.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o(ee, "TextWork");
let qr = ee;
const ce = class ce {
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
    let t = {}, s = [];
    return e.homonym && (t = ce.readHomonym(e)), e.context && (s = ce.readContext(e)), new ce({
      targetWord: e.targetWord,
      languageCode: e.languageCode,
      important: e.important,
      currentSession: e.currentSession,
      context: s,
      homonym: t
    });
  }
  /**
   * Construct the homonym portion of a WordItem from JSON
   *
   * @param jsonObject
   */
  static readHomonym(e) {
    return nt.readObject(e.homonym);
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
    for (const s of e) {
      const n = at.readObject(s);
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
      this.context.filter((n) => n.isEqual(t)).length === 0 && this.context.push(t);
  }
  /**
   * getter for the lemmas in this WordItem
   */
  get lemmasList() {
    return this.homonym && this.homonym.lexemes ? this.homonym.lexemes.map((e) => e.lemma.word).filter((e, t, s) => s.indexOf(e) === t).join(", ") : "";
  }
  /**
   * updates empty properties of this wordItem with those of the supplied worditem if also non-empty
   *
   * @param prevWordItem
   */
  merge(e) {
    const t = ["homonym", "important", "currentSession"];
    for (const s of t)
      this._emptyProp(s) && !e._emptyProp(s) && (this[s] = e[s]);
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
o(ce, "WordItem");
let Qt = ce;
const or = class or {
  /**
   * @class
   * @param {string} languageCode the language code of the list
   * @param {WordItem[]} worditems an optional array of WordItems with which to initialize the list
   */
  constructor(e, t = []) {
    if (!e)
      throw new Error("Unable to construct a wordlist without a languagecode");
    this.languageCode = e, this.items = {}, t.forEach((s) => {
      this.addWordItem(s);
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
    const s = this._makeItemKey(this.languageCode, e.targetWord);
    this.items[s] = e;
  }
  /**
   * delete an individual word item from the list
   *
   * @param {string} targetWord the word to delete
   * @returns {WordItem} the deleted item
   */
  deleteWordItem(e) {
    const t = this._makeItemKey(this.languageCode, e), s = this.items[t];
    return s && delete this.items[t], s;
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
  getWordItem(e, t = !0, s = null) {
    const n = this._makeItemKey(this.languageCode, e);
    if (t && !this.items[n]) {
      const a = new Qt({ targetWord: e, languageCode: this.languageCode });
      s && s.pub({ dataObj: a, params: { segment: "common" } }), this.items[n] = a;
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
o(or, "WordList");
let Wr = or;
const Te = class Te {
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
      const s = e ? e.closest("[data-alpheios_tb_ref]") : document.querySelector("[data-alpheios_tb_ref]");
      let n = null, a;
      if (e ? (n = e.closest("[data-alpheios_tb_word]"), a = n ? n.closest("[data-alpheios_tb_sent]") : e.closest("[data-alpheios_tb_sent]")) : a = document.querySelector("[data-alpheios_tb_sent]"), !s && !(n || a))
        throw new Error("An element does not have data-alpheios_tb_ref, data-alpheios_tb_word or data-alpheios_tb_sent attributes");
      if (n || a) {
        if (!a)
          throw new Error("Sentence ID is undefined: there is no parent element with data-alpheios_tb_sent attribute");
        const i = n ? n.closest("[data-alpheios_tb_doc]") : a.closest("[data-alpheios_tb_doc]");
        if (!i)
          throw new Error("Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute");
        n && (this.wordIds = n.dataset.alpheios_tb_word.split(" ")), this.sentenceId = a.dataset.alpheios_tb_sent, this.doc = i.dataset.alpheios_tb_doc;
      } else {
        const i = s.dataset.alpheios_tb_ref;
        let u;
        try {
          u = i.split(" ").map((d) => Te.parseReference(d));
        } catch (d) {
          throw new Error(`${d.message} in: ${t.outerHTML}`);
        }
        u = u.filter((d) => d.doc === u[0].doc && d.sent === u[0].sent), this.doc = u[0].doc, this.sentenceId = u[0].sent, this.wordIds = u.map((d) => d.word);
      }
    }
    if (!this.doc)
      throw new Error("Document data is missing");
    if (!this.sentenceId)
      throw new Error("Sentence data is missing");
  }
  static getTreebankData(e = null) {
    try {
      return new Te(e);
    } catch (t) {
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
    const [t, s] = e.split(/#/);
    if (!t || !s)
      throw new Error("Invalid treebank reference");
    const [n, a] = s.split(/-/);
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
o(Te, "TreebankDataItem");
let Hr = Te;
const ur = class ur {
  constructor(e, t, s) {
    if (!e)
      throw new Error("Item cannot be empty");
    if (!t)
      throw new Error("Key cannot be empty");
    if (!s)
      throw new Error("Storage adapter object should be provided");
    for (const n of Object.keys(e))
      this[n] = e[n];
    this.currentValue = this.defaultValue, this.name = t, this.storageAdapter = s;
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
    for (const s of this.values)
      if (this.multiValue) {
        if (this.currentValue.includes(s.value)) {
          const n = e ? s[e] : s;
          t.push(n);
        }
      } else
        s.value === this.currentValue && (t = e ? s[e] : s);
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
        for (const s of e)
          t.text === s && this.currentValue.push(t.value);
      else
        t.text === e && (this.currentValue = t.value);
    return this.save(), this;
  }
  removeItem() {
    this.currentValue = null, this.storageAdapter.remove(this.name).then(
      () => {
      },
      (e) => {
        S.getInstance().error(`Unexpected error resetting Alpheios option ${this.name}: ${e}`);
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
        S.getInstance().error(`Unexpected error storing Alpheios option ${this.name}: ${t}`);
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
o(ur, "OptionItem");
let it = ur;
const q = class q {
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
    this.defaults = e, this.domain = e.domain, this.version = e.version.toString(), this.storageAdapter = t, this.items = q.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
  }
  static initItems(e, t, s, n) {
    let a = {};
    for (const [i, u] of Object.entries(e))
      if (u.group) {
        a[i] = [];
        for (const [d, h] of Object.entries(u.group)) {
          const c = q.constructKey(s, n, i, d);
          a[i].push(new it(h, c, t));
        }
      } else {
        const d = q.constructKey(s, n, i);
        a[i] = new it(u, d, t);
      }
    return a;
  }
  /**
   * Reset all options to default values
   */
  reset() {
    return L(this, null, function* () {
      yield this.storageAdapter.clearAll(), this.items = q.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
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
    return L(this, null, function* () {
      try {
        const e = yield this.storageAdapter.get();
        for (const t in e) {
          const s = q.parseKey(t);
          if (this.items.hasOwnProperty(s.name) && this.version === s.version)
            if (s.group)
              this.items[s.name].forEach((n) => {
                if (n.name === t)
                  try {
                    n.currentValue = JSON.parse(e[t]);
                  } catch (a) {
                    S.getInstance().warn(`Unable to parse Alpheios option value for  ${s.name} from ${e[s.name]}`, a);
                  }
              });
            else
              try {
                this.items[s.name].currentValue = JSON.parse(e[t]);
              } catch (n) {
                S.getInstance().warn(`Unable to parse Alpheios option value for  ${s.name} from ${e[s.name]}`, n);
              }
        }
        return this;
      } catch (e) {
        const t = `Unexpected error retrieving options for Alpheios from local storage: ${e}. Default values will be used instead`;
        S.getInstance().error(t);
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
  static constructKey(e, t, s, n = null) {
    let a = `${e}__${t}__${s}`;
    return n && (a = `${a}__${n}`), a;
  }
  /**
   * Parse a stored setting name into a semantically meaningful object
   *
   * @param key
   */
  static parseKey(e) {
    const [t, s, n, a] = e.split("__", 4);
    let i;
    try {
      i = {
        domain: t,
        version: s,
        name: n,
        group: a
      };
    } catch (u) {
      S.getInstance().warn(`Failed to parse stored Alpheios options key ${e}`);
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
    let s = Object.assign({}, this.defaults);
    s.domain = `${s.domain}-${e}`;
    const n = new q(s, new t(s.domain));
    return Object.keys(n.items).forEach((a) => {
      let i = n.items[a];
      this.items[a].values && i.uploadValuesFromArray(this.items[a].values);
    }), n;
  }
};
o(q, "Options");
let Gr = q;
const lr = class lr {
  static fromJSON(e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      return S.getInstance().error("Unable to parse Alpheios JSON options string:", t), {};
    }
  }
};
o(lr, "DefaultsLoader");
let Jr = lr;
const cr = class cr {
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
    return new Promise((t, s) => s(new Error("Set method should be implemented in a subclass")));
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
    return new Promise((t, s) => s(new Error("Get method should be implemented in a subclass")));
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
    return new Promise((t, s) => s(new Error("Remove method should be implemented in a subclass")));
  }
  /**
   * clear all items in the storage
   */
  clearAll() {
    return new Promise((e, t) => t(new Error("clearAll method should be implemented in a subclass")));
  }
};
o(cr, "StorageAdapter");
let me = cr;
const hr = class hr extends me {
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
o(hr, "ExtensionSyncStorage");
let Kr = hr;
const fr = class fr extends me {
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
    return new Promise((t, s) => {
      try {
        let n = window.localStorage.getItem(`${this.domain}-keys`);
        n ? n = JSON.parse(n) : n = [];
        for (const [a, i] of Object.entries(e))
          window.localStorage.setItem(a, i), n.includes(a) || n.push(a);
        window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(n));
      } catch (n) {
        s(n);
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
    return new Promise((t, s) => {
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
        s(n);
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
    return new Promise((t, s) => {
      try {
        e ? Array.isArray(e) && e.length === 0 ? e = [] : typeof e == "string" ? e = [e] : typeof e == "object" ? e = Object.keys(e) : e = [] : e = [];
        let n = {};
        e.length === 0 && (e = window.localStorage.getItem(`${this.domain}-keys`), e ? e = JSON.parse(e) : t(n));
        for (const a of e)
          n[a] = window.localStorage.getItem(a);
        t(n);
      } catch (n) {
        s(n);
      }
    });
  }
  clearAll() {
    return new Promise((e, t) => {
      try {
        let s = null, n = window.localStorage.getItem(`${this.domain}-keys`);
        if (n) {
          n = JSON.parse(n);
          for (const a of n)
            window.localStorage.removeItem(a);
          window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify([])), e(!0);
        } else
          e(s);
      } catch (s) {
        t(s);
      }
    });
  }
};
o(fr, "LocalStorageArea");
let jr = fr;
function Hn(r, e) {
  return /* @__PURE__ */ o(function() {
    return r.apply(e, arguments);
  }, "wrap");
}
o(Hn, "bind");
const { toString: Wo } = Object.prototype, { getPrototypeOf: Ws } = Object, { iterator: vt, toStringTag: Gn } = Symbol, _t = /* @__PURE__ */ ((r) => (e) => {
  const t = Wo.call(e);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), U = /* @__PURE__ */ o((r) => (r = r.toLowerCase(), (e) => _t(e) === r), "kindOfTest"), Nt = /* @__PURE__ */ o((r) => (e) => typeof e === r, "typeOfTest"), { isArray: Ee } = Array, Le = Nt("undefined");
function Ve(r) {
  return r !== null && !Le(r) && r.constructor !== null && !Le(r.constructor) && x(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
o(Ve, "isBuffer");
const Jn = U("ArrayBuffer");
function Ho(r) {
  let e;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Jn(r.buffer), e;
}
o(Ho, "isArrayBufferView");
const Go = Nt("string"), x = Nt("function"), Kn = Nt("number"), Ue = /* @__PURE__ */ o((r) => r !== null && typeof r == "object", "isObject"), Jo = /* @__PURE__ */ o((r) => r === !0 || r === !1, "isBoolean"), ze = /* @__PURE__ */ o((r) => {
  if (_t(r) !== "object")
    return !1;
  const e = Ws(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Gn in r) && !(vt in r);
}, "isPlainObject"), Ko = /* @__PURE__ */ o((r) => {
  if (!Ue(r) || Ve(r))
    return !1;
  try {
    return Object.keys(r).length === 0 && Object.getPrototypeOf(r) === Object.prototype;
  } catch (e) {
    return !1;
  }
}, "isEmptyObject"), jo = U("Date"), Xo = U("File"), Yo = U("Blob"), Zo = U("FileList"), Qo = /* @__PURE__ */ o((r) => Ue(r) && x(r.pipe), "isStream"), eu = /* @__PURE__ */ o((r) => {
  let e;
  return r && (typeof FormData == "function" && r instanceof FormData || x(r.append) && ((e = _t(r)) === "formdata" || // detect form-data instance
  e === "object" && x(r.toString) && r.toString() === "[object FormData]"));
}, "isFormData"), tu = U("URLSearchParams"), [su, ru, nu, au] = ["ReadableStream", "Request", "Response", "Headers"].map(U), iu = /* @__PURE__ */ o((r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), "trim");
function Be(r, e, { allOwnKeys: t = !1 } = {}) {
  if (r === null || typeof r == "undefined")
    return;
  let s, n;
  if (typeof r != "object" && (r = [r]), Ee(r))
    for (s = 0, n = r.length; s < n; s++)
      e.call(null, r[s], s, r);
  else {
    if (Ve(r))
      return;
    const a = t ? Object.getOwnPropertyNames(r) : Object.keys(r), i = a.length;
    let u;
    for (s = 0; s < i; s++)
      u = a[s], e.call(null, r[u], u, r);
  }
}
o(Be, "forEach");
function jn(r, e) {
  if (Ve(r))
    return null;
  e = e.toLowerCase();
  const t = Object.keys(r);
  let s = t.length, n;
  for (; s-- > 0; )
    if (n = t[s], e === n.toLowerCase())
      return n;
  return null;
}
o(jn, "findKey");
const te = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, Xn = /* @__PURE__ */ o((r) => !Le(r) && r !== te, "isContextDefined");
function es() {
  const { caseless: r } = Xn(this) && this || {}, e = {}, t = /* @__PURE__ */ o((s, n) => {
    const a = r && jn(e, n) || n;
    ze(e[a]) && ze(s) ? e[a] = es(e[a], s) : ze(s) ? e[a] = es({}, s) : Ee(s) ? e[a] = s.slice() : e[a] = s;
  }, "assignValue");
  for (let s = 0, n = arguments.length; s < n; s++)
    arguments[s] && Be(arguments[s], t);
  return e;
}
o(es, "merge");
const ou = /* @__PURE__ */ o((r, e, t, { allOwnKeys: s } = {}) => (Be(e, (n, a) => {
  t && x(n) ? r[a] = Hn(n, t) : r[a] = n;
}, { allOwnKeys: s }), r), "extend"), uu = /* @__PURE__ */ o((r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), "stripBOM"), lu = /* @__PURE__ */ o((r, e, t, s) => {
  r.prototype = Object.create(e.prototype, s), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: e.prototype
  }), t && Object.assign(r.prototype, t);
}, "inherits"), cu = /* @__PURE__ */ o((r, e, t, s) => {
  let n, a, i;
  const u = {};
  if (e = e || {}, r == null) return e;
  do {
    for (n = Object.getOwnPropertyNames(r), a = n.length; a-- > 0; )
      i = n[a], (!s || s(i, r, e)) && !u[i] && (e[i] = r[i], u[i] = !0);
    r = t !== !1 && Ws(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}, "toFlatObject"), hu = /* @__PURE__ */ o((r, e, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  const s = r.indexOf(e, t);
  return s !== -1 && s === t;
}, "endsWith"), fu = /* @__PURE__ */ o((r) => {
  if (!r) return null;
  if (Ee(r)) return r;
  let e = r.length;
  if (!Kn(e)) return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = r[e];
  return t;
}, "toArray"), du = /* @__PURE__ */ ((r) => (e) => r && e instanceof r)(typeof Uint8Array != "undefined" && Ws(Uint8Array)), pu = /* @__PURE__ */ o((r, e) => {
  const s = (r && r[vt]).call(r);
  let n;
  for (; (n = s.next()) && !n.done; ) {
    const a = n.value;
    e.call(r, a[0], a[1]);
  }
}, "forEachEntry"), gu = /* @__PURE__ */ o((r, e) => {
  let t;
  const s = [];
  for (; (t = r.exec(e)) !== null; )
    s.push(t);
  return s;
}, "matchAll"), mu = U("HTMLFormElement"), yu = /* @__PURE__ */ o((r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  /* @__PURE__ */ o(function(t, s, n) {
    return s.toUpperCase() + n;
  }, "replacer")
), "toCamelCase"), Xr = (({ hasOwnProperty: r }) => (e, t) => r.call(e, t))(Object.prototype), Eu = U("RegExp"), Yn = /* @__PURE__ */ o((r, e) => {
  const t = Object.getOwnPropertyDescriptors(r), s = {};
  Be(t, (n, a) => {
    let i;
    (i = e(n, a, r)) !== !1 && (s[a] = i || n);
  }), Object.defineProperties(r, s);
}, "reduceDescriptors"), wu = /* @__PURE__ */ o((r) => {
  Yn(r, (e, t) => {
    if (x(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const s = r[t];
    if (x(s)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, "freezeMethods"), Iu = /* @__PURE__ */ o((r, e) => {
  const t = {}, s = /* @__PURE__ */ o((n) => {
    n.forEach((a) => {
      t[a] = !0;
    });
  }, "define");
  return Ee(r) ? s(r) : s(String(r).split(e)), t;
}, "toObjectSet"), bu = /* @__PURE__ */ o(() => {
}, "noop"), Su = /* @__PURE__ */ o((r, e) => r != null && Number.isFinite(r = +r) ? r : e, "toFiniteNumber");
function Au(r) {
  return !!(r && x(r.append) && r[Gn] === "FormData" && r[vt]);
}
o(Au, "isSpecCompliantForm");
const Fu = /* @__PURE__ */ o((r) => {
  const e = new Array(10), t = /* @__PURE__ */ o((s, n) => {
    if (Ue(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (Ve(s))
        return s;
      if (!("toJSON" in s)) {
        e[n] = s;
        const a = Ee(s) ? [] : {};
        return Be(s, (i, u) => {
          const d = t(i, n + 1);
          !Le(d) && (a[u] = d);
        }), e[n] = void 0, a;
      }
    }
    return s;
  }, "visit");
  return t(r, 0);
}, "toJSONObject"), Cu = U("AsyncFunction"), Du = /* @__PURE__ */ o((r) => r && (Ue(r) || x(r)) && x(r.then) && x(r.catch), "isThenable"), Zn = ((r, e) => r ? setImmediate : e ? ((t, s) => (te.addEventListener("message", ({ source: n, data: a }) => {
  n === te && a === t && s.length && s.shift()();
}, !1), (n) => {
  s.push(n), te.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  x(te.postMessage)
), Tu = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(te) : typeof process != "undefined" && process.nextTick || Zn, Ou = /* @__PURE__ */ o((r) => r != null && x(r[vt]), "isIterable"), f = {
  isArray: Ee,
  isArrayBuffer: Jn,
  isBuffer: Ve,
  isFormData: eu,
  isArrayBufferView: Ho,
  isString: Go,
  isNumber: Kn,
  isBoolean: Jo,
  isObject: Ue,
  isPlainObject: ze,
  isEmptyObject: Ko,
  isReadableStream: su,
  isRequest: ru,
  isResponse: nu,
  isHeaders: au,
  isUndefined: Le,
  isDate: jo,
  isFile: Xo,
  isBlob: Yo,
  isRegExp: Eu,
  isFunction: x,
  isStream: Qo,
  isURLSearchParams: tu,
  isTypedArray: du,
  isFileList: Zo,
  forEach: Be,
  merge: es,
  extend: ou,
  trim: iu,
  stripBOM: uu,
  inherits: lu,
  toFlatObject: cu,
  kindOf: _t,
  kindOfTest: U,
  endsWith: hu,
  toArray: fu,
  forEachEntry: pu,
  matchAll: gu,
  isHTMLForm: mu,
  hasOwnProperty: Xr,
  hasOwnProp: Xr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Yn,
  freezeMethods: wu,
  toObjectSet: Iu,
  toCamelCase: yu,
  noop: bu,
  toFiniteNumber: Su,
  findKey: jn,
  global: te,
  isContextDefined: Xn,
  isSpecCompliantForm: Au,
  toJSONObject: Fu,
  isAsyncFn: Cu,
  isThenable: Du,
  setImmediate: Zn,
  asap: Tu,
  isIterable: Ou
};
function b(r, e, t, s, n) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), s && (this.request = s), n && (this.response = n, this.status = n.status ? n.status : null);
}
o(b, "AxiosError$1");
f.inherits(b, Error, {
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
      config: f.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }, "toJSON")
});
const Qn = b.prototype, ea = {};
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
  ea[r] = { value: r };
});
Object.defineProperties(b, ea);
Object.defineProperty(Qn, "isAxiosError", { value: !0 });
b.from = (r, e, t, s, n, a) => {
  const i = Object.create(Qn);
  return f.toFlatObject(r, i, /* @__PURE__ */ o(function(d) {
    return d !== Error.prototype;
  }, "filter"), (u) => u !== "isAxiosError"), b.call(i, r.message, e, t, s, n), i.cause = r, i.name = r.name, a && Object.assign(i, a), i;
};
const vu = null;
function ts(r) {
  return f.isPlainObject(r) || f.isArray(r);
}
o(ts, "isVisitable");
function ta(r) {
  return f.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
o(ta, "removeBrackets");
function Yr(r, e, t) {
  return r ? r.concat(e).map(/* @__PURE__ */ o(function(n, a) {
    return n = ta(n), !t && a ? "[" + n + "]" : n;
  }, "each")).join(t ? "." : "") : e;
}
o(Yr, "renderKey");
function _u(r) {
  return f.isArray(r) && !r.some(ts);
}
o(_u, "isFlatArray");
const Nu = f.toFlatObject(f, {}, null, /* @__PURE__ */ o(function(e) {
  return /^is[A-Z]/.test(e);
}, "filter"));
function xt(r, e, t) {
  if (!f.isObject(r))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = f.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, /* @__PURE__ */ o(function(I, E) {
    return !f.isUndefined(E[I]);
  }, "defined"));
  const s = t.metaTokens, n = t.visitor || c, a = t.dots, i = t.indexes, d = (t.Blob || typeof Blob != "undefined" && Blob) && f.isSpecCompliantForm(e);
  if (!f.isFunction(n))
    throw new TypeError("visitor must be a function");
  function h(m) {
    if (m === null) return "";
    if (f.isDate(m))
      return m.toISOString();
    if (f.isBoolean(m))
      return m.toString();
    if (!d && f.isBlob(m))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return f.isArrayBuffer(m) || f.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  o(h, "convertValue");
  function c(m, I, E) {
    let C = m;
    if (m && !E && typeof m == "object") {
      if (f.endsWith(I, "{}"))
        I = s ? I : I.slice(0, -2), m = JSON.stringify(m);
      else if (f.isArray(m) && _u(m) || (f.isFileList(m) || f.endsWith(I, "[]")) && (C = f.toArray(m)))
        return I = ta(I), C.forEach(/* @__PURE__ */ o(function(T, z) {
          !(f.isUndefined(T) || T === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            i === !0 ? Yr([I], z, a) : i === null ? I : I + "[]",
            h(T)
          );
        }, "each")), !1;
    }
    return ts(m) ? !0 : (e.append(Yr(E, I, a), h(m)), !1);
  }
  o(c, "defaultVisitor");
  const p = [], g = Object.assign(Nu, {
    defaultVisitor: c,
    convertValue: h,
    isVisitable: ts
  });
  function y(m, I) {
    if (!f.isUndefined(m)) {
      if (p.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + I.join("."));
      p.push(m), f.forEach(m, /* @__PURE__ */ o(function(C, D) {
        (!(f.isUndefined(C) || C === null) && n.call(
          e,
          C,
          f.isString(D) ? D.trim() : D,
          I,
          g
        )) === !0 && y(C, I ? I.concat(D) : [D]);
      }, "each")), p.pop();
    }
  }
  if (o(y, "build"), !f.isObject(r))
    throw new TypeError("data must be an object");
  return y(r), e;
}
o(xt, "toFormData$1");
function Zr(r) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, /* @__PURE__ */ o(function(s) {
    return e[s];
  }, "replacer"));
}
o(Zr, "encode$1");
function Hs(r, e) {
  this._pairs = [], r && xt(r, this, e);
}
o(Hs, "AxiosURLSearchParams");
const sa = Hs.prototype;
sa.append = /* @__PURE__ */ o(function(e, t) {
  this._pairs.push([e, t]);
}, "append");
sa.toString = /* @__PURE__ */ o(function(e) {
  const t = e ? function(s) {
    return e.call(this, s, Zr);
  } : Zr;
  return this._pairs.map(/* @__PURE__ */ o(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "each"), "").join("&");
}, "toString");
function xu(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
o(xu, "encode");
function ra(r, e, t) {
  if (!e)
    return r;
  const s = t && t.encode || xu;
  f.isFunction(t) && (t = {
    serialize: t
  });
  const n = t && t.serialize;
  let a;
  if (n ? a = n(e, t) : a = f.isURLSearchParams(e) ? e.toString() : new Hs(e, t).toString(s), a) {
    const i = r.indexOf("#");
    i !== -1 && (r = r.slice(0, i)), r += (r.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return r;
}
o(ra, "buildURL");
const dr = class dr {
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
    f.forEach(this.handlers, /* @__PURE__ */ o(function(s) {
      s !== null && e(s);
    }, "forEachHandler"));
  }
};
o(dr, "InterceptorManager");
let ot = dr;
const na = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ru = typeof URLSearchParams != "undefined" ? URLSearchParams : Hs, Lu = typeof FormData != "undefined" ? FormData : null, Pu = typeof Blob != "undefined" ? Blob : null, Vu = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ru,
    FormData: Lu,
    Blob: Pu
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Gs = typeof window != "undefined" && typeof document != "undefined", ss = typeof navigator == "object" && navigator || void 0, Uu = Gs && (!ss || ["ReactNative", "NativeScript", "NS"].indexOf(ss.product) < 0), Bu = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Mu = Gs && window.location.href || "http://localhost", ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Gs,
  hasStandardBrowserEnv: Uu,
  hasStandardBrowserWebWorkerEnv: Bu,
  navigator: ss,
  origin: Mu
}, Symbol.toStringTag, { value: "Module" })), v = G(G({}, ku), Vu);
function $u(r, e) {
  return xt(r, new v.classes.URLSearchParams(), G({
    visitor: /* @__PURE__ */ o(function(t, s, n, a) {
      return v.isNode && f.isBuffer(t) ? (this.append(s, t.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }, "visitor")
  }, e));
}
o($u, "toURLEncodedForm");
function zu(r) {
  return f.matchAll(/\w+|\[(\w*)]/g, r).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
o(zu, "parsePropPath");
function qu(r) {
  const e = {}, t = Object.keys(r);
  let s;
  const n = t.length;
  let a;
  for (s = 0; s < n; s++)
    a = t[s], e[a] = r[a];
  return e;
}
o(qu, "arrayToObject");
function aa(r) {
  function e(t, s, n, a) {
    let i = t[a++];
    if (i === "__proto__") return !0;
    const u = Number.isFinite(+i), d = a >= t.length;
    return i = !i && f.isArray(n) ? n.length : i, d ? (f.hasOwnProp(n, i) ? n[i] = [n[i], s] : n[i] = s, !u) : ((!n[i] || !f.isObject(n[i])) && (n[i] = []), e(t, s, n[i], a) && f.isArray(n[i]) && (n[i] = qu(n[i])), !u);
  }
  if (o(e, "buildPath"), f.isFormData(r) && f.isFunction(r.entries)) {
    const t = {};
    return f.forEachEntry(r, (s, n) => {
      e(zu(s), n, t, 0);
    }), t;
  }
  return null;
}
o(aa, "formDataToJSON");
function Wu(r, e, t) {
  if (f.isString(r))
    try {
      return (e || JSON.parse)(r), f.trim(r);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (t || JSON.stringify)(r);
}
o(Wu, "stringifySafely");
const Me = {
  transitional: na,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [/* @__PURE__ */ o(function(e, t) {
    const s = t.getContentType() || "", n = s.indexOf("application/json") > -1, a = f.isObject(e);
    if (a && f.isHTMLForm(e) && (e = new FormData(e)), f.isFormData(e))
      return n ? JSON.stringify(aa(e)) : e;
    if (f.isArrayBuffer(e) || f.isBuffer(e) || f.isStream(e) || f.isFile(e) || f.isBlob(e) || f.isReadableStream(e))
      return e;
    if (f.isArrayBufferView(e))
      return e.buffer;
    if (f.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let u;
    if (a) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return $u(e, this.formSerializer).toString();
      if ((u = f.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return xt(
          u ? { "files[]": e } : e,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return a || n ? (t.setContentType("application/json", !1), Wu(e)) : e;
  }, "transformRequest")],
  transformResponse: [/* @__PURE__ */ o(function(e) {
    const t = this.transitional || Me.transitional, s = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (f.isResponse(e) || f.isReadableStream(e))
      return e;
    if (e && f.isString(e) && (s && !this.responseType || n)) {
      const i = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(e);
      } catch (u) {
        if (i)
          throw u.name === "SyntaxError" ? b.from(u, b.ERR_BAD_RESPONSE, this, null, this.response) : u;
      }
    }
    return e;
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
    FormData: v.classes.FormData,
    Blob: v.classes.Blob
  },
  validateStatus: /* @__PURE__ */ o(function(e) {
    return e >= 200 && e < 300;
  }, "validateStatus"),
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
f.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  Me.headers[r] = {};
});
const Hu = f.toObjectSet([
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
]), Gu = /* @__PURE__ */ o((r) => {
  const e = {};
  let t, s, n;
  return r && r.split(`
`).forEach(/* @__PURE__ */ o(function(i) {
    n = i.indexOf(":"), t = i.substring(0, n).trim().toLowerCase(), s = i.substring(n + 1).trim(), !(!t || e[t] && Hu[t]) && (t === "set-cookie" ? e[t] ? e[t].push(s) : e[t] = [s] : e[t] = e[t] ? e[t] + ", " + s : s);
  }, "parser")), e;
}, "parseHeaders"), Qr = Symbol("internals");
function Ie(r) {
  return r && String(r).trim().toLowerCase();
}
o(Ie, "normalizeHeader");
function qe(r) {
  return r === !1 || r == null ? r : f.isArray(r) ? r.map(qe) : String(r);
}
o(qe, "normalizeValue");
function Ju(r) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = t.exec(r); )
    e[s[1]] = s[2];
  return e;
}
o(Ju, "parseTokens");
const Ku = /* @__PURE__ */ o((r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim()), "isValidHeaderName");
function Bt(r, e, t, s, n) {
  if (f.isFunction(s))
    return s.call(this, e, t);
  if (n && (e = t), !!f.isString(e)) {
    if (f.isString(s))
      return e.indexOf(s) !== -1;
    if (f.isRegExp(s))
      return s.test(e);
  }
}
o(Bt, "matchHeaderValue");
function ju(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, s) => t.toUpperCase() + s);
}
o(ju, "formatHeader");
function Xu(r, e) {
  const t = f.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(r, s + t, {
      value: /* @__PURE__ */ o(function(n, a, i) {
        return this[s].call(this, e, n, a, i);
      }, "value"),
      configurable: !0
    });
  });
}
o(Xu, "buildAccessors");
var he;
let R = (he = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, s) {
    const n = this;
    function a(u, d, h) {
      const c = Ie(d);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const p = f.findKey(n, c);
      (!p || n[p] === void 0 || h === !0 || h === void 0 && n[p] !== !1) && (n[p || d] = qe(u));
    }
    o(a, "setHeader");
    const i = /* @__PURE__ */ o((u, d) => f.forEach(u, (h, c) => a(h, c, d)), "setHeaders");
    if (f.isPlainObject(e) || e instanceof this.constructor)
      i(e, t);
    else if (f.isString(e) && (e = e.trim()) && !Ku(e))
      i(Gu(e), t);
    else if (f.isObject(e) && f.isIterable(e)) {
      let u = {}, d, h;
      for (const c of e) {
        if (!f.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        u[h = c[0]] = (d = u[h]) ? f.isArray(d) ? [...d, c[1]] : [d, c[1]] : c[1];
      }
      i(u, t);
    } else
      e != null && a(t, e, s);
    return this;
  }
  get(e, t) {
    if (e = Ie(e), e) {
      const s = f.findKey(this, e);
      if (s) {
        const n = this[s];
        if (!t)
          return n;
        if (t === !0)
          return Ju(n);
        if (f.isFunction(t))
          return t.call(this, n, s);
        if (f.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = Ie(e), e) {
      const s = f.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!t || Bt(this, this[s], s, t)));
    }
    return !1;
  }
  delete(e, t) {
    const s = this;
    let n = !1;
    function a(i) {
      if (i = Ie(i), i) {
        const u = f.findKey(s, i);
        u && (!t || Bt(s, s[u], u, t)) && (delete s[u], n = !0);
      }
    }
    return o(a, "deleteHeader"), f.isArray(e) ? e.forEach(a) : a(e), n;
  }
  clear(e) {
    const t = Object.keys(this);
    let s = t.length, n = !1;
    for (; s--; ) {
      const a = t[s];
      (!e || Bt(this, this[a], a, e, !0)) && (delete this[a], n = !0);
    }
    return n;
  }
  normalize(e) {
    const t = this, s = {};
    return f.forEach(this, (n, a) => {
      const i = f.findKey(s, a);
      if (i) {
        t[i] = qe(n), delete t[a];
        return;
      }
      const u = e ? ju(a) : String(a).trim();
      u !== a && delete t[a], t[u] = qe(n), s[u] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return f.forEach(this, (s, n) => {
      s != null && s !== !1 && (t[n] = e && f.isArray(s) ? s.join(", ") : s);
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
    const s = (this[Qr] = this[Qr] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function a(i) {
      const u = Ie(i);
      s[u] || (Xu(n, i), s[u] = !0);
    }
    return o(a, "defineAccessor"), f.isArray(e) ? e.forEach(a) : a(e), this;
  }
}, o(he, "AxiosHeaders"), he);
R.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
f.reduceDescriptors(R.prototype, ({ value: r }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: /* @__PURE__ */ o(() => r, "get"),
    set(s) {
      this[t] = s;
    }
  };
});
f.freezeMethods(R);
function Mt(r, e) {
  const t = this || Me, s = e || t, n = R.from(s.headers);
  let a = s.data;
  return f.forEach(r, /* @__PURE__ */ o(function(u) {
    a = u.call(t, a, n.normalize(), e ? e.status : void 0);
  }, "transform")), n.normalize(), a;
}
o(Mt, "transformData");
function ia(r) {
  return !!(r && r.__CANCEL__);
}
o(ia, "isCancel$1");
function we(r, e, t) {
  b.call(this, r == null ? "canceled" : r, b.ERR_CANCELED, e, t), this.name = "CanceledError";
}
o(we, "CanceledError$1");
f.inherits(we, b, {
  __CANCEL__: !0
});
function oa(r, e, t) {
  const s = t.config.validateStatus;
  !t.status || !s || s(t.status) ? r(t) : e(new b(
    "Request failed with status code " + t.status,
    [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
o(oa, "settle");
function Yu(r) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return e && e[1] || "";
}
o(Yu, "parseProtocol");
function Zu(r, e) {
  r = r || 10;
  const t = new Array(r), s = new Array(r);
  let n = 0, a = 0, i;
  return e = e !== void 0 ? e : 1e3, /* @__PURE__ */ o(function(d) {
    const h = Date.now(), c = s[a];
    i || (i = h), t[n] = d, s[n] = h;
    let p = a, g = 0;
    for (; p !== n; )
      g += t[p++], p = p % r;
    if (n = (n + 1) % r, n === a && (a = (a + 1) % r), h - i < e)
      return;
    const y = c && h - c;
    return y ? Math.round(g * 1e3 / y) : void 0;
  }, "push");
}
o(Zu, "speedometer");
function Qu(r, e) {
  let t = 0, s = 1e3 / e, n, a;
  const i = /* @__PURE__ */ o((h, c = Date.now()) => {
    t = c, n = null, a && (clearTimeout(a), a = null), r(...h);
  }, "invoke");
  return [/* @__PURE__ */ o((...h) => {
    const c = Date.now(), p = c - t;
    p >= s ? i(h, c) : (n = h, a || (a = setTimeout(() => {
      a = null, i(n);
    }, s - p)));
  }, "throttled"), /* @__PURE__ */ o(() => n && i(n), "flush")];
}
o(Qu, "throttle");
const ut = /* @__PURE__ */ o((r, e, t = 3) => {
  let s = 0;
  const n = Zu(50, 250);
  return Qu((a) => {
    const i = a.loaded, u = a.lengthComputable ? a.total : void 0, d = i - s, h = n(d), c = i <= u;
    s = i;
    const p = {
      loaded: i,
      total: u,
      progress: u ? i / u : void 0,
      bytes: d,
      rate: h || void 0,
      estimated: h && u && c ? (u - i) / h : void 0,
      event: a,
      lengthComputable: u != null,
      [e ? "download" : "upload"]: !0
    };
    r(p);
  }, t);
}, "progressEventReducer"), en = /* @__PURE__ */ o((r, e) => {
  const t = r != null;
  return [(s) => e[0]({
    lengthComputable: t,
    total: r,
    loaded: s
  }), e[1]];
}, "progressEventDecorator"), tn = /* @__PURE__ */ o((r) => (...e) => f.asap(() => r(...e)), "asyncDecorator"), el = v.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, e) => (t) => (t = new URL(t, v.origin), r.protocol === t.protocol && r.host === t.host && (e || r.port === t.port)))(
  new URL(v.origin),
  v.navigator && /(msie|trident)/i.test(v.navigator.userAgent)
) : () => !0, tl = v.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, e, t, s, n, a) {
      const i = [r + "=" + encodeURIComponent(e)];
      f.isNumber(t) && i.push("expires=" + new Date(t).toGMTString()), f.isString(s) && i.push("path=" + s), f.isString(n) && i.push("domain=" + n), a === !0 && i.push("secure"), document.cookie = i.join("; ");
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
function sl(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
o(sl, "isAbsoluteURL");
function rl(r, e) {
  return e ? r.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r;
}
o(rl, "combineURLs");
function ua(r, e, t) {
  let s = !sl(e);
  return r && (s || t == !1) ? rl(r, e) : e;
}
o(ua, "buildFullPath");
const sn = /* @__PURE__ */ o((r) => r instanceof R ? G({}, r) : r, "headersToObject");
function oe(r, e) {
  e = e || {};
  const t = {};
  function s(h, c, p, g) {
    return f.isPlainObject(h) && f.isPlainObject(c) ? f.merge.call({ caseless: g }, h, c) : f.isPlainObject(c) ? f.merge({}, c) : f.isArray(c) ? c.slice() : c;
  }
  o(s, "getMergedValue");
  function n(h, c, p, g) {
    if (f.isUndefined(c)) {
      if (!f.isUndefined(h))
        return s(void 0, h, p, g);
    } else return s(h, c, p, g);
  }
  o(n, "mergeDeepProperties");
  function a(h, c) {
    if (!f.isUndefined(c))
      return s(void 0, c);
  }
  o(a, "valueFromConfig2");
  function i(h, c) {
    if (f.isUndefined(c)) {
      if (!f.isUndefined(h))
        return s(void 0, h);
    } else return s(void 0, c);
  }
  o(i, "defaultToConfig2");
  function u(h, c, p) {
    if (p in e)
      return s(h, c);
    if (p in r)
      return s(void 0, h);
  }
  o(u, "mergeDirectKeys");
  const d = {
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
    validateStatus: u,
    headers: /* @__PURE__ */ o((h, c, p) => n(sn(h), sn(c), p, !0), "headers")
  };
  return f.forEach(Object.keys(G(G({}, r), e)), /* @__PURE__ */ o(function(c) {
    const p = d[c] || n, g = p(r[c], e[c], c);
    f.isUndefined(g) && p !== u || (t[c] = g);
  }, "computeConfigValue")), t;
}
o(oe, "mergeConfig$1");
const la = /* @__PURE__ */ o((r) => {
  const e = oe({}, r);
  let { data: t, withXSRFToken: s, xsrfHeaderName: n, xsrfCookieName: a, headers: i, auth: u } = e;
  e.headers = i = R.from(i), e.url = ra(ua(e.baseURL, e.url, e.allowAbsoluteUrls), r.params, r.paramsSerializer), u && i.set(
    "Authorization",
    "Basic " + btoa((u.username || "") + ":" + (u.password ? unescape(encodeURIComponent(u.password)) : ""))
  );
  let d;
  if (f.isFormData(t)) {
    if (v.hasStandardBrowserEnv || v.hasStandardBrowserWebWorkerEnv)
      i.setContentType(void 0);
    else if ((d = i.getContentType()) !== !1) {
      const [h, ...c] = d ? d.split(";").map((p) => p.trim()).filter(Boolean) : [];
      i.setContentType([h || "multipart/form-data", ...c].join("; "));
    }
  }
  if (v.hasStandardBrowserEnv && (s && f.isFunction(s) && (s = s(e)), s || s !== !1 && el(e.url))) {
    const h = n && a && tl.read(a);
    h && i.set(n, h);
  }
  return e;
}, "resolveConfig"), nl = typeof XMLHttpRequest != "undefined", al = nl && function(r) {
  return new Promise(/* @__PURE__ */ o(function(t, s) {
    const n = la(r);
    let a = n.data;
    const i = R.from(n.headers).normalize();
    let { responseType: u, onUploadProgress: d, onDownloadProgress: h } = n, c, p, g, y, m;
    function I() {
      y && y(), m && m(), n.cancelToken && n.cancelToken.unsubscribe(c), n.signal && n.signal.removeEventListener("abort", c);
    }
    o(I, "done");
    let E = new XMLHttpRequest();
    E.open(n.method.toUpperCase(), n.url, !0), E.timeout = n.timeout;
    function C() {
      if (!E)
        return;
      const T = R.from(
        "getAllResponseHeaders" in E && E.getAllResponseHeaders()
      ), N = {
        data: !u || u === "text" || u === "json" ? E.responseText : E.response,
        status: E.status,
        statusText: E.statusText,
        headers: T,
        config: r,
        request: E
      };
      oa(/* @__PURE__ */ o(function(K) {
        t(K), I();
      }, "_resolve"), /* @__PURE__ */ o(function(K) {
        s(K), I();
      }, "_reject"), N), E = null;
    }
    o(C, "onloadend"), "onloadend" in E ? E.onloadend = C : E.onreadystatechange = /* @__PURE__ */ o(function() {
      !E || E.readyState !== 4 || E.status === 0 && !(E.responseURL && E.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, "handleLoad"), E.onabort = /* @__PURE__ */ o(function() {
      E && (s(new b("Request aborted", b.ECONNABORTED, r, E)), E = null);
    }, "handleAbort"), E.onerror = /* @__PURE__ */ o(function() {
      s(new b("Network Error", b.ERR_NETWORK, r, E)), E = null;
    }, "handleError"), E.ontimeout = /* @__PURE__ */ o(function() {
      let z = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
      const N = n.transitional || na;
      n.timeoutErrorMessage && (z = n.timeoutErrorMessage), s(new b(
        z,
        N.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
        r,
        E
      )), E = null;
    }, "handleTimeout"), a === void 0 && i.setContentType(null), "setRequestHeader" in E && f.forEach(i.toJSON(), /* @__PURE__ */ o(function(z, N) {
      E.setRequestHeader(N, z);
    }, "setRequestHeader")), f.isUndefined(n.withCredentials) || (E.withCredentials = !!n.withCredentials), u && u !== "json" && (E.responseType = n.responseType), h && ([g, m] = ut(h, !0), E.addEventListener("progress", g)), d && E.upload && ([p, y] = ut(d), E.upload.addEventListener("progress", p), E.upload.addEventListener("loadend", y)), (n.cancelToken || n.signal) && (c = /* @__PURE__ */ o((T) => {
      E && (s(!T || T.type ? new we(null, r, E) : T), E.abort(), E = null);
    }, "onCanceled"), n.cancelToken && n.cancelToken.subscribe(c), n.signal && (n.signal.aborted ? c() : n.signal.addEventListener("abort", c)));
    const D = Yu(n.url);
    if (D && v.protocols.indexOf(D) === -1) {
      s(new b("Unsupported protocol " + D + ":", b.ERR_BAD_REQUEST, r));
      return;
    }
    E.send(a || null);
  }, "dispatchXhrRequest"));
}, il = /* @__PURE__ */ o((r, e) => {
  const { length: t } = r = r ? r.filter(Boolean) : [];
  if (e || t) {
    let s = new AbortController(), n;
    const a = /* @__PURE__ */ o(function(h) {
      if (!n) {
        n = !0, u();
        const c = h instanceof Error ? h : this.reason;
        s.abort(c instanceof b ? c : new we(c instanceof Error ? c.message : c));
      }
    }, "onabort");
    let i = e && setTimeout(() => {
      i = null, a(new b(`timeout ${e} of ms exceeded`, b.ETIMEDOUT));
    }, e);
    const u = /* @__PURE__ */ o(() => {
      r && (i && clearTimeout(i), i = null, r.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(a) : h.removeEventListener("abort", a);
      }), r = null);
    }, "unsubscribe");
    r.forEach((h) => h.addEventListener("abort", a));
    const { signal: d } = s;
    return d.unsubscribe = () => f.asap(u), d;
  }
}, "composeSignals"), ol = /* @__PURE__ */ o(function* (r, e) {
  let t = r.byteLength;
  if (t < e) {
    yield r;
    return;
  }
  let s = 0, n;
  for (; s < t; )
    n = s + e, yield r.slice(s, n), s = n;
}, "streamChunk"), ul = /* @__PURE__ */ o(function(r, e) {
  return Pt(this, null, function* () {
    try {
      for (var t = Ar(ll(r)), s, n, a; s = !(n = yield new j(t.next())).done; s = !1) {
        const i = n.value;
        yield* Vt(ol(i, e));
      }
    } catch (n) {
      a = [n];
    } finally {
      try {
        s && (n = t.return) && (yield new j(n.call(t)));
      } finally {
        if (a)
          throw a[0];
      }
    }
  });
}, "readBytes"), ll = /* @__PURE__ */ o(function(r) {
  return Pt(this, null, function* () {
    if (r[Symbol.asyncIterator]) {
      yield* Vt(r);
      return;
    }
    const e = r.getReader();
    try {
      for (; ; ) {
        const { done: t, value: s } = yield new j(e.read());
        if (t)
          break;
        yield s;
      }
    } finally {
      yield new j(e.cancel());
    }
  });
}, "readStream"), rn = /* @__PURE__ */ o((r, e, t, s) => {
  const n = ul(r, e);
  let a = 0, i, u = /* @__PURE__ */ o((h) => {
    i || (i = !0, s && s(h));
  }, "_onFinish");
  return new ReadableStream({
    pull(h) {
      return L(this, null, function* () {
        try {
          const { done: c, value: p } = yield n.next();
          if (c) {
            u(), h.close();
            return;
          }
          let g = p.byteLength;
          if (t) {
            let y = a += g;
            t(y);
          }
          h.enqueue(new Uint8Array(p));
        } catch (c) {
          throw u(c), c;
        }
      });
    },
    cancel(h) {
      return u(h), n.return();
    }
  }, {
    highWaterMark: 2
  });
}, "trackStream"), Rt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ca = Rt && typeof ReadableStream == "function", cl = Rt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (e) => r.encode(e))(new TextEncoder()) : (r) => L(null, null, function* () {
  return new Uint8Array(yield new Response(r).arrayBuffer());
})), ha = /* @__PURE__ */ o((r, ...e) => {
  try {
    return !!r(...e);
  } catch (t) {
    return !1;
  }
}, "test"), hl = ca && ha(() => {
  let r = !1;
  const e = new Request(v.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = !0, "half";
    }
  }).headers.has("Content-Type");
  return r && !e;
}), nn = 64 * 1024, rs = ca && ha(() => f.isReadableStream(new Response("").body)), lt = {
  stream: rs && ((r) => r.body)
};
Rt && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !lt[e] && (lt[e] = f.isFunction(r[e]) ? (t) => t[e]() : (t, s) => {
      throw new b(`Response type '${e}' is not supported`, b.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const fl = /* @__PURE__ */ o((r) => L(null, null, function* () {
  if (r == null)
    return 0;
  if (f.isBlob(r))
    return r.size;
  if (f.isSpecCompliantForm(r))
    return (yield new Request(v.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (f.isArrayBufferView(r) || f.isArrayBuffer(r))
    return r.byteLength;
  if (f.isURLSearchParams(r) && (r = r + ""), f.isString(r))
    return (yield cl(r)).byteLength;
}), "getBodyLength"), dl = /* @__PURE__ */ o((r, e) => L(null, null, function* () {
  const t = f.toFiniteNumber(r.getContentLength());
  return t == null ? fl(e) : t;
}), "resolveBodyLength"), pl = Rt && ((r) => L(null, null, function* () {
  let {
    url: e,
    method: t,
    data: s,
    signal: n,
    cancelToken: a,
    timeout: i,
    onDownloadProgress: u,
    onUploadProgress: d,
    responseType: h,
    headers: c,
    withCredentials: p = "same-origin",
    fetchOptions: g
  } = la(r);
  h = h ? (h + "").toLowerCase() : "text";
  let y = il([n, a && a.toAbortSignal()], i), m;
  const I = y && y.unsubscribe && (() => {
    y.unsubscribe();
  });
  let E;
  try {
    if (d && hl && t !== "get" && t !== "head" && (E = yield dl(c, s)) !== 0) {
      let N = new Request(e, {
        method: "POST",
        body: s,
        duplex: "half"
      }), H;
      if (f.isFormData(s) && (H = N.headers.get("content-type")) && c.setContentType(H), N.body) {
        const [K, ke] = en(
          E,
          ut(tn(d))
        );
        s = rn(N.body, nn, K, ke);
      }
    }
    f.isString(p) || (p = p ? "include" : "omit");
    const C = "credentials" in Request.prototype;
    m = new Request(e, Sr(G({}, g), {
      signal: y,
      method: t.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: C ? p : void 0
    }));
    let D = yield fetch(m, g);
    const T = rs && (h === "stream" || h === "response");
    if (rs && (u || T && I)) {
      const N = {};
      ["status", "statusText", "headers"].forEach((Er) => {
        N[Er] = D[Er];
      });
      const H = f.toFiniteNumber(D.headers.get("content-length")), [K, ke] = u && en(
        H,
        ut(tn(u), !0)
      ) || [];
      D = new Response(
        rn(D.body, nn, K, () => {
          ke && ke(), I && I();
        }),
        N
      );
    }
    h = h || "text";
    let z = yield lt[f.findKey(lt, h) || "text"](D, r);
    return !T && I && I(), yield new Promise((N, H) => {
      oa(N, H, {
        data: z,
        headers: R.from(D.headers),
        status: D.status,
        statusText: D.statusText,
        config: r,
        request: m
      });
    });
  } catch (C) {
    throw I && I(), C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message) ? Object.assign(
      new b("Network Error", b.ERR_NETWORK, r, m),
      {
        cause: C.cause || C
      }
    ) : b.from(C, C && C.code, r, m);
  }
})), ns = {
  http: vu,
  xhr: al,
  fetch: pl
};
f.forEach(ns, (r, e) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: e });
    } catch (t) {
    }
    Object.defineProperty(r, "adapterName", { value: e });
  }
});
const an = /* @__PURE__ */ o((r) => `- ${r}`, "renderReason"), gl = /* @__PURE__ */ o((r) => f.isFunction(r) || r === null || r === !1, "isResolvedHandle"), fa = {
  getAdapter: /* @__PURE__ */ o((r) => {
    r = f.isArray(r) ? r : [r];
    const { length: e } = r;
    let t, s;
    const n = {};
    for (let a = 0; a < e; a++) {
      t = r[a];
      let i;
      if (s = t, !gl(t) && (s = ns[(i = String(t)).toLowerCase()], s === void 0))
        throw new b(`Unknown adapter '${i}'`);
      if (s)
        break;
      n[i || "#" + a] = s;
    }
    if (!s) {
      const a = Object.entries(n).map(
        ([u, d]) => `adapter ${u} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let i = e ? a.length > 1 ? `since :
` + a.map(an).join(`
`) : " " + an(a[0]) : "as no adapter specified";
      throw new b(
        "There is no suitable adapter to dispatch the request " + i,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  }, "getAdapter"),
  adapters: ns
};
function kt(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new we(null, r);
}
o(kt, "throwIfCancellationRequested");
function on(r) {
  return kt(r), r.headers = R.from(r.headers), r.data = Mt.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), fa.getAdapter(r.adapter || Me.adapter)(r).then(/* @__PURE__ */ o(function(s) {
    return kt(r), s.data = Mt.call(
      r,
      r.transformResponse,
      s
    ), s.headers = R.from(s.headers), s;
  }, "onAdapterResolution"), /* @__PURE__ */ o(function(s) {
    return ia(s) || (kt(r), s && s.response && (s.response.data = Mt.call(
      r,
      r.transformResponse,
      s.response
    ), s.response.headers = R.from(s.response.headers))), Promise.reject(s);
  }, "onAdapterRejection"));
}
o(on, "dispatchRequest");
const da = "1.11.0", Lt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, e) => {
  Lt[r] = /* @__PURE__ */ o(function(s) {
    return typeof s === r || "a" + (e < 1 ? "n " : " ") + r;
  }, "validator");
});
const un = {};
Lt.transitional = /* @__PURE__ */ o(function(e, t, s) {
  function n(a, i) {
    return "[Axios v" + da + "] Transitional option '" + a + "'" + i + (s ? ". " + s : "");
  }
  return o(n, "formatMessage"), (a, i, u) => {
    if (e === !1)
      throw new b(
        n(i, " has been removed" + (t ? " in " + t : "")),
        b.ERR_DEPRECATED
      );
    return t && !un[i] && (un[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(a, i, u) : !0;
  };
}, "transitional");
Lt.spelling = /* @__PURE__ */ o(function(e) {
  return (t, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
}, "spelling");
function ml(r, e, t) {
  if (typeof r != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(r);
  let n = s.length;
  for (; n-- > 0; ) {
    const a = s[n], i = e[a];
    if (i) {
      const u = r[a], d = u === void 0 || i(u, a, r);
      if (d !== !0)
        throw new b("option " + a + " must be " + d, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new b("Unknown option " + a, b.ERR_BAD_OPTION);
  }
}
o(ml, "assertOptions");
const We = {
  assertOptions: ml,
  validators: Lt
}, B = We.validators;
var fe;
let se = (fe = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new ot(),
      response: new ot()
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
  request(e, t) {
    return L(this, null, function* () {
      try {
        return yield this._request(e, t);
      } catch (s) {
        if (s instanceof Error) {
          let n = {};
          Error.captureStackTrace ? Error.captureStackTrace(n) : n = new Error();
          const a = n.stack ? n.stack.replace(/^.+\n/, "") : "";
          try {
            s.stack ? a && !String(s.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + a) : s.stack = a;
          } catch (i) {
          }
        }
        throw s;
      }
    });
  }
  _request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = oe(this.defaults, t);
    const { transitional: s, paramsSerializer: n, headers: a } = t;
    s !== void 0 && We.assertOptions(s, {
      silentJSONParsing: B.transitional(B.boolean),
      forcedJSONParsing: B.transitional(B.boolean),
      clarifyTimeoutError: B.transitional(B.boolean)
    }, !1), n != null && (f.isFunction(n) ? t.paramsSerializer = {
      serialize: n
    } : We.assertOptions(n, {
      encode: B.function,
      serialize: B.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), We.assertOptions(t, {
      baseUrl: B.spelling("baseURL"),
      withXsrfToken: B.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let i = a && f.merge(
      a.common,
      a[t.method]
    );
    a && f.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete a[m];
      }
    ), t.headers = R.concat(i, a);
    const u = [];
    let d = !0;
    this.interceptors.request.forEach(/* @__PURE__ */ o(function(I) {
      typeof I.runWhen == "function" && I.runWhen(t) === !1 || (d = d && I.synchronous, u.unshift(I.fulfilled, I.rejected));
    }, "unshiftRequestInterceptors"));
    const h = [];
    this.interceptors.response.forEach(/* @__PURE__ */ o(function(I) {
      h.push(I.fulfilled, I.rejected);
    }, "pushResponseInterceptors"));
    let c, p = 0, g;
    if (!d) {
      const m = [on.bind(this), void 0];
      for (m.unshift(...u), m.push(...h), g = m.length, c = Promise.resolve(t); p < g; )
        c = c.then(m[p++], m[p++]);
      return c;
    }
    g = u.length;
    let y = t;
    for (p = 0; p < g; ) {
      const m = u[p++], I = u[p++];
      try {
        y = m(y);
      } catch (E) {
        I.call(this, E);
        break;
      }
    }
    try {
      c = on.call(this, y);
    } catch (m) {
      return Promise.reject(m);
    }
    for (p = 0, g = h.length; p < g; )
      c = c.then(h[p++], h[p++]);
    return c;
  }
  getUri(e) {
    e = oe(this.defaults, e);
    const t = ua(e.baseURL, e.url, e.allowAbsoluteUrls);
    return ra(t, e.params, e.paramsSerializer);
  }
}, o(fe, "Axios"), fe);
f.forEach(["delete", "get", "head", "options"], /* @__PURE__ */ o(function(e) {
  se.prototype[e] = function(t, s) {
    return this.request(oe(s || {}, {
      method: e,
      url: t,
      data: (s || {}).data
    }));
  };
}, "forEachMethodNoData"));
f.forEach(["post", "put", "patch"], /* @__PURE__ */ o(function(e) {
  function t(s) {
    return /* @__PURE__ */ o(function(a, i, u) {
      return this.request(oe(u || {}, {
        method: e,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    }, "httpMethod");
  }
  o(t, "generateHTTPMethod"), se.prototype[e] = t(), se.prototype[e + "Form"] = t(!0);
}, "forEachMethodWithData"));
var re;
let yl = (re = class {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(/* @__PURE__ */ o(function(a) {
      t = a;
    }, "promiseExecutor"));
    const s = this;
    this.promise.then((n) => {
      if (!s._listeners) return;
      let a = s._listeners.length;
      for (; a-- > 0; )
        s._listeners[a](n);
      s._listeners = null;
    }), this.promise.then = (n) => {
      let a;
      const i = new Promise((u) => {
        s.subscribe(u), a = u;
      }).then(n);
      return i.cancel = /* @__PURE__ */ o(function() {
        s.unsubscribe(a);
      }, "reject"), i;
    }, e(/* @__PURE__ */ o(function(a, i, u) {
      s.reason || (s.reason = new we(a, i, u), t(s.reason));
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
    const e = new AbortController(), t = /* @__PURE__ */ o((s) => {
      e.abort(s);
    }, "abort");
    return this.subscribe(t), e.signal.unsubscribe = () => this.unsubscribe(t), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new re(/* @__PURE__ */ o(function(n) {
        e = n;
      }, "executor")),
      cancel: e
    };
  }
}, o(re, "CancelToken"), re);
function El(r) {
  return /* @__PURE__ */ o(function(t) {
    return r.apply(null, t);
  }, "wrap");
}
o(El, "spread$1");
function wl(r) {
  return f.isObject(r) && r.isAxiosError === !0;
}
o(wl, "isAxiosError$1");
const as = {
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
Object.entries(as).forEach(([r, e]) => {
  as[e] = r;
});
function pa(r) {
  const e = new se(r), t = Hn(se.prototype.request, e);
  return f.extend(t, se.prototype, e, { allOwnKeys: !0 }), f.extend(t, e, null, { allOwnKeys: !0 }), t.create = /* @__PURE__ */ o(function(n) {
    return pa(oe(r, n));
  }, "create"), t;
}
o(pa, "createInstance");
const F = pa(Me);
F.Axios = se;
F.CanceledError = we;
F.CancelToken = yl;
F.isCancel = ia;
F.VERSION = da;
F.toFormData = xt;
F.AxiosError = b;
F.Cancel = F.CanceledError;
F.all = /* @__PURE__ */ o(function(e) {
  return Promise.all(e);
}, "all");
F.spread = El;
F.isAxiosError = wl;
F.mergeConfig = oe;
F.AxiosHeaders = R;
F.formToJSON = (r) => aa(f.isHTMLForm(r) ? new FormData(r) : r);
F.getAdapter = fa.getAdapter;
F.HttpStatusCode = as;
F.default = F;
const {
  Axios: Sl,
  AxiosError: Al,
  CanceledError: Fl,
  isCancel: Cl,
  CancelToken: Dl,
  VERSION: Tl,
  all: Ol,
  Cancel: vl,
  isAxiosError: _l,
  spread: Nl,
  toFormData: xl,
  AxiosHeaders: Rl,
  HttpStatusCode: Ll,
  formToJSON: Pl,
  getAdapter: Vl,
  mergeConfig: Ul
} = F, pr = class pr extends me {
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
    return L(this, null, function* () {
      for (const [t, s] of Object.entries(e)) {
        const n = `${this.baseURL}/${t}`, a = yield F.post(n, s, this.requestContext);
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
    return L(this, null, function* () {
      const e = `${this.baseURL}?domain=${this.domain}`, t = yield F.get(e, this.requestContext);
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
    return L(this, null, function* () {
      const e = `${this.baseURL}?domain=${this.domain}`, t = yield F.delete(e, this.requestContext);
      if (t.status !== 200)
        throw new Error(`Unexpected result status from settings api: ${t.status}`);
    });
  }
};
o(pr, "RemoteAuthStorageArea");
let ln = pr;
const gr = class gr extends me {
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
o(gr, "TempStorageArea");
let cn = gr;
const mr = class mr {
  /**
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ title: e, id: t, baseUrl: s, description: n } = {}) {
    this.title = e, this.id = t, this.baseUrl = s, this.description = n;
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
o(mr, "Resource");
let is = mr;
const It = class It {
  /**
   * Created from DTS API Json
   *
   * @param {number} totalItems - amount of items in a collection
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ totalItems: e, title: t, id: s, baseUrl: n, description: a, pagination: i } = {}) {
    this.totalItems = e, this.title = t, this.id = s, this.baseUrl = n, this.description = a, this.members = [], this.resources = [], i && (this.pagination = this.definePagination(i));
  }
  /**
   * Adds level - membered collection or resource
   *
   * @param {JSON Object} jsonObj  - described in Collection/Resource constructors
   */
  addMember(e) {
    e.type === "Collection" && this.members.push(new It(e)), e.type === "Resource" && this.resources.push(new is(e));
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
o(It, "Collection");
let hn = It;
const bt = class bt {
  constructor(e, t, s) {
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
    return new bt(this.tabId, this.windowId);
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
o(bt, "Tab");
let ct = bt;
const yr = class yr {
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
o(yr, "UIStateAPI");
let os = yr;
const w = class w extends os {
  constructor(e) {
    super(), this.tabID = e ? e.uniqueId : void 0, this.tabObj = e, this.status = void 0, this.panelStatus = void 0, this.tab = void 0, this.embedLibStatus = void 0, this.uiActive = !1, this.watchers = /* @__PURE__ */ new Map();
  }
  updateTabObject(e, t) {
    return this.tabObj = new ct(e, t), this.tabID = this.tabObj.uniqueId, this;
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
        valueType: w.propTypes.SYMBOL,
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
        valueType: w.propTypes.SYMBOL,
        values: this.statuses.embedLib,
        defaultValueIndex: 1
      },
      panelStatus: {
        name: "panelStatus",
        valueType: w.propTypes.SYMBOL,
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
        valueType: w.propTypes.STRING,
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
    return [w.props.status.name, w.props.embedLibStatus.name, w.props.panelStatus.name];
  }
  static get stringProps() {
    return [w.props.tab.name];
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
    return w.symbolProps.concat(w.stringProps).concat(w.booleanProps);
  }
  /**
   * A copy constructor.
   * @param {TabScript} source - An instance of TabScript object we need to copy.
   * @return {TabScript} A copy of a source object.
   */
  static create(e) {
    let t = new w();
    for (const s of Object.keys(e))
      t[s] = e[s];
    return t;
  }
  static get defaults() {
    return {
      status: w.statuses.script.ACTIVE,
      panelStatus: w.statuses.panel.OPEN
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
    return this.embedLibStatus === w.statuses.embedLib.ACTIVE;
  }
  setEmbedLibActiveStatus() {
    return this.setItem("embedLibStatus", w.statuses.embedLib.ACTIVE), this;
  }
  setEmbedLibInactiveStatus() {
    return this.setItem("embedLibStatus", w.statuses.embedLib.INACTIVE), this;
  }
  setEmbedLibStatus(e) {
    e ? this.setItem("embedLibStatus", w.statuses.embedLib.ACTIVE) : this.setItem("embedLibStatus", w.statuses.embedLib.INACTIVE);
  }
  isPanelOpen() {
    return this.panelStatus === w.statuses.panel.OPEN;
  }
  isPanelClosed() {
    return this.panelStatus === w.statuses.panel.CLOSED;
  }
  setPanelOpen() {
    return this.setItem("panelStatus", w.statuses.panel.OPEN), this;
  }
  setPanelClosed() {
    return this.setItem("panelStatus", w.statuses.panel.CLOSED), this;
  }
  setPanelDefault() {
    return this.setItem("panelStatus", w.statuses.panel.DEFAULT), this;
  }
  isPanelStateDefault() {
    return this.panelStatus === w.statuses.panel.DEFAULT;
  }
  isPanelStateValid() {
    return this.panelStatus === w.statuses.panel.OPEN || this.panelStatus === w.statuses.panel.CLOSED;
  }
  setTabDefault() {
    return this.setItem("tab", w.props.tab.values.DEFAULT), this;
  }
  isTabStateDefault() {
    return this.tab === w.props.tab.values.DEFAULT;
  }
  hasSameID(e) {
    return Symbol.keyFor(this.tabID) === Symbol.keyFor(e);
  }
  isActive() {
    return this.status === w.statuses.script.ACTIVE;
  }
  isDeactivated() {
    return this.status === w.statuses.script.DEACTIVATED;
  }
  isDisabled() {
    return this.status === w.statuses.script.DISABLED;
  }
  isPending() {
    return this.status === w.statuses.script.PENDING;
  }
  uiIsActive() {
    return this[w.props.uiActive.name];
  }
  activate() {
    return this.status = w.statuses.script.ACTIVE, this;
  }
  deactivate() {
    return this.status = w.statuses.script.DEACTIVATED, this;
  }
  disable() {
    return this.status = w.statuses.script.DISABLED, this;
  }
  activateUI() {
    return this.setItem(w.props.uiActive.name, !0), this;
  }
  changeTab(e) {
    return this.setItem(w.props.tab.name, e), this;
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
    for (const s of Object.keys(e))
      w.dataProps.includes(s) && this.hasOwnProperty(s) && this[s] && e[s] && this[s] !== e[s] && (t[s] = e[s], t._changedKeys.push(s), t._changedEntries.push([s, e[s]]));
    return t.keys = function() {
      return t._changedKeys;
    }, t.entries = function() {
      return t._changedEntries;
    }, t.has = function(s) {
      return t._changedKeys.includes(s);
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
    for (const s of Object.keys(e))
      if (w.dataProps.includes(s)) {
        const n = e[s];
        t[s] = typeof n == "symbol" ? Symbol.keyFor(n) : n;
      }
    return t;
  }
  static readObject(e) {
    const t = e.tabObj && e.tabObj.tabId && e.tabObj.windowId ? new ct(e.tabObj.tabId, e.tabObj.windowId, e.tabObj.status) : void 0;
    let s = new w(t);
    for (const n of w.symbolProps)
      e[n] && (s[n] = Symbol.for(e[n]));
    for (const n of w.stringProps)
      e[n] && (s[n] = e[n]);
    for (const n of w.booleanProps)
      e.hasOwnProperty(n) && (s[n] = e[n]);
    return s;
  }
};
o(w, "TabScript");
let fn = w;
export {
  st as ArabicLanguageModel,
  zr as Author,
  Kt as ChineseLanguageModel,
  hn as Collection,
  bl as Constants,
  Jr as DefaultsLoader,
  Ze as Definition,
  Se as DefinitionSet,
  Kr as ExtensionSyncStorage,
  l as Feature,
  Qe as FeatureImporter,
  Mr as FeatureList,
  et as FeatureType,
  Jt as GeezLanguageModel,
  Ht as GreekLanguageModel,
  jt as GrmFeature,
  nt as Homonym,
  Yt as HomonymGroup,
  rt as Inflection,
  A as LanguageModelFactory,
  tt as LatinLanguageModel,
  ge as Lemma,
  Y as Lexeme,
  jr as LocalStorageArea,
  S as Logger,
  Gr as Options,
  Gt as PersianLanguageModel,
  kr as PsEvent,
  Zt as PsEventData,
  ln as RemoteAuthStorageArea,
  is as Resource,
  W as ResourceProvider,
  be as SyriacLanguageModel,
  ct as Tab,
  fn as TabScript,
  cn as TempStorageArea,
  at as TextQuoteSelector,
  qr as TextWork,
  Xt as Translation,
  Hr as TreebankDataItem,
  os as UIStateAPI,
  Qt as WordItem,
  Wr as WordList,
  $r as WordUsageExample
};
