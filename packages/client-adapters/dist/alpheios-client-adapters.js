var br$1 = Object.defineProperty, ga$1 = Object.defineProperties;
var ma = Object.getOwnPropertyDescriptors;
var wr = Object.getOwnPropertySymbols;
var ya = Object.prototype.hasOwnProperty, Ea = Object.prototype.propertyIsEnumerable;
var ue = (r, e) => (e = Symbol[r]) ? e : Symbol.for("Symbol." + r), wa = (r) => {
  throw TypeError(r);
};
var Ir = (r, e, t) => e in r ? br$1(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, G = (r, e) => {
  for (var t in e || (e = {}))
    ya.call(e, t) && Ir(r, t, e[t]);
  if (wr)
    for (var t of wr(e))
      Ea.call(e, t) && Ir(r, t, e[t]);
  return r;
}, Sr = (r, e) => ga$1(r, ma(e)), o$1 = (r, e) => br$1(r, "name", { value: e, configurable: true });
var L = (r, e, t) => new Promise((s, n) => {
  var a = (d2) => {
    try {
      u2(t.next(d2));
    } catch (h2) {
      n(h2);
    }
  }, i2 = (d2) => {
    try {
      u2(t.throw(d2));
    } catch (h2) {
      n(h2);
    }
  }, u2 = (d2) => d2.done ? s(d2.value) : Promise.resolve(d2.value).then(a, i2);
  u2((t = t.apply(r, e)).next());
}), j = function(r, e) {
  this[0] = r, this[1] = e;
}, Pt = (r, e, t) => {
  var s = (i2, u2, d2, h2) => {
    try {
      var c2 = t[i2](u2), p2 = (u2 = c2.value) instanceof j, g2 = c2.done;
      Promise.resolve(p2 ? u2[0] : u2).then((y) => p2 ? s(i2 === "return" ? i2 : "next", u2[1] ? { done: y.done, value: y.value } : y, d2, h2) : d2({ value: y, done: g2 })).catch((y) => s("throw", y, d2, h2));
    } catch (y) {
      h2(y);
    }
  }, n = (i2) => a[i2] = (u2) => new Promise((d2, h2) => s(i2, u2, d2, h2)), a = {};
  return t = t.apply(r, e), a[ue("asyncIterator")] = () => a, n("next"), n("throw"), n("return"), a;
}, Vt = (r) => {
  var e = r[ue("asyncIterator")], t = false, s, n = {};
  return e == null ? (e = r[ue("iterator")](), s = (a) => n[a] = (i2) => e[a](i2)) : (e = e.call(r), s = (a) => n[a] = (i2) => {
    if (t) {
      if (t = false, a === "throw") throw i2;
      return i2;
    }
    return t = true, {
      done: false,
      value: new j(new Promise((u2) => {
        var d2 = e[a](i2);
        d2 instanceof Object || wa("Object expected"), u2(d2);
      }), 1)
    };
  }), n[ue("iterator")] = () => n, s("next"), "throw" in e ? s("throw") : n.throw = (a) => {
    throw a;
  }, "return" in e && s("return"), n;
}, Ar = (r, e, t) => (e = r[ue("asyncIterator")]) ? e.call(r) : (r = r[ue("iterator")](), e = {}, t = (s, n) => (n = r[s]) && (e[s] = (a) => new Promise((i2, u2, d2) => (a = n.call(r, a), d2 = a.done, Promise.resolve(a.value).then((h2) => i2({ value: h2, done: d2 }), u2)))), t("next"), t("return"), e);
const J = Symbol("word"), dn = Symbol("char"), ye = Symbol("ltr"), Pe = Symbol("rtl"), us = Symbol("undefined"), pn = Symbol("latin"), gn$1 = Symbol("greek"), mn$1 = Symbol("arabic"), yn = Symbol("persian"), ls = Symbol("ge'ez"), cs$1 = Symbol("chinese"), hs = Symbol("syriac"), fs = "undefined", He = "lat", ds = "la", Ge = "grc", Je = "ara", ps$1 = "ar", En = "fas", Ke = "per", wn = "fa-IR", In = "fa", je = "gez", Xe = "zho", bn$1 = "zh", Sn = "zh-Hant", An = "zh-Hans", gs = "syc", Ye = "syr", ms$1 = "syr-Syrj", Ia = "eng", Oe = "adjective", ne$1 = "adverb", ys = "adverbial", St = "article", Es = "conjunction", ae = "exclamation", ie$1 = "interjection", ve$1 = "noun", $t = "proper noun", At = "numeral", _e = "particle", ws = "prefix", Is = "preposition", de$1 = "pronoun", bs$1 = "suffix", Fn = "gerundive", Ft = "supine", pe = "verb", Ct = "verb participle", Cn = "denominative", Dn = "masculine", Tn = "feminine", On = "neuter", ba$1 = "common", Sa = "animate", Aa = "inanimate", Fa = "personal masculine", Ca = "animate masculine", Da = "inanimate masculine", Ta = "positive", Oa = "comparative", va = "superlative", _a$1 = "abessive", vn = "ablative", Na = "absolutive", Ss = "accusative", xa = "addirective", Ra = "adelative", La = "adessive", Pa = "adverbial", Va = "allative", Ua = "antessive", Ba = "apudessive", Ma = "aversive", ka$1 = "benefactive", $a = "caritive", za$1 = "causal", qa = "causal-final", Wa = "comitative", As = "dative", Ha = "delative", Ga = "direct", Ja = "distributive", Ka = "distributive-temporal", ja$1 = "elative", Xa = "ergative", Ya = "essive", Za = "essive-formal", Qa = "essive-modal", ei = "equative", ti$1 = "evitative", si$1 = "exessive", ri = "final", ni = "formal", Fs = "genitive", ai = "illative", ii = "inelative", oi = "inessive", ui = "instructive", li$1 = "instrumental", ci = "instrumental-comitative", hi$1 = "intransitive", fi$1 = "lative", _n = "locative", di = "modal", pi = "multiplicative", Cs = "nominative", gi = "partitive", mi$1 = "pegative", yi$1 = "perlative", Ei = "possessive", wi = "postelative", Ii = "postdirective", bi$1 = "postessive", Si = "postpositional", Ai = "prepositional", Fi = "privative", Ci = "prolative", Di = "prosecutive", Ti = "proximative", Oi = "separative", vi$1 = "sociative", _i = "subdirective", Ni = "subessive", xi = "subelative", Ri = "sublative", Li = "superdirective", Pi = "superessive", Vi = "superlative", Ui = "suppressive", Bi = "temporal", Mi = "terminative", ki = "translative", $i = "vialis", Ds = "vocative", zi = "admirative", qi = "cohortative", Wi = "conditional", Hi = "declarative", Gi = "dubitative", Ji = "energetic", Ki = "eventive", ji = "generic", zt = "gerundive", Xi = "hypothetical", Ts = "imperative", Os = "indicative", Yi = "inferential", Nn = "infinitive", Zi = "interrogative", Qi = "jussive", eo$1 = "negative", xn = "optative", $e = "participle", to$1 = "presumptive", so$1 = "renarrative", vs = "subjunctive", Rn = "supine", Dt = "singular", Tt = "plural", Ln = "dual", ro$1 = "trial", no$1 = "paucal", ao = "singulative", io = "collective", oo = "distributive plural", uo = "cardinal", lo$1 = "ordinal", co$1 = "distributive", ho = "numeral adverb", Ne = "1st", xe = "2nd", Re = "3rd", qt = "4th", Pn = "5th", fo$1 = "6th", po = "7th", go = "8th", mo = "9th", Vn = "aorist", _s = "future", Ns = "future perfect", xs = "imperfect", yo$1 = "past absolute", Rs = "perfect", Ls = "pluperfect", Ps = "present", Eo = "to be", wo$1 = "compounds of to be", Io = "taking ablative", bo$1 = "taking dative", So = "taking genitive", Ao = "transitive", Fo = "intransitive", Co = "impersonal", Do = "deponent", To = "semideponent", Oo = "perfect definite", Vs = "active", Us = "passive", Un = "mediopassive", vo$1 = "impersonal passive", Bn = "middle", _o = "antipassive", No = "reflexive", xo = "reciprocal", Ro = "causative", Lo = "adjutative", Po = "applicative", Vo = "circumstantial", Uo = "deponent", Mn = "irregular", kn$1 = "regular", Bs = "personal", Ms = "reflexive", ks$1 = "possessive", $s = "demonstrative", zs = "relative", qs = "interrogative", $n = "general relative", zn = "indefinite", qn = "intensive", Wn = "reciprocal", Bo = "kaylo", Mo = "state", bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CASE_ABESSIVE: _a$1,
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
  CASE_BENEFACTIVE: ka$1,
  CASE_CARITIVE: $a,
  CASE_CAUSAL: za$1,
  CASE_CAUSAL_FINAL: qa,
  CASE_COMITATIVE: Wa,
  CASE_DATIVE: As,
  CASE_DELATIVE: Ha,
  CASE_DIRECT: Ga,
  CASE_DISTRIBUTIVE: Ja,
  CASE_DISTRIBUTIVE_TEMPORAL: Ka,
  CASE_ELATIVE: ja$1,
  CASE_EQUATIVE: ei,
  CASE_ERGATIVE: Xa,
  CASE_ESSIVE: Ya,
  CASE_ESSIVE_FORMAL: Za,
  CASE_ESSIVE_MODAL: Qa,
  CASE_EVITATIVE: ti$1,
  CASE_EXESSIVE: si$1,
  CASE_FINAL: ri,
  CASE_FORMAL: ni,
  CASE_GENITIVE: Fs,
  CASE_ILLATIVE: ai,
  CASE_INELATIVE: ii,
  CASE_INESSIVE: oi,
  CASE_INSTRUCTIVE: ui,
  CASE_INSTRUMENTAL: li$1,
  CASE_INSTRUMENTAL_COMITATIVE: ci,
  CASE_INTRANSITIVE: hi$1,
  CASE_LATIVE: fi$1,
  CASE_LOCATIVE: _n,
  CASE_MODAL: di,
  CASE_MULTIPLICATIVE: pi,
  CASE_NOMINATIVE: Cs,
  CASE_PARTITIVE: gi,
  CASE_PEGATIVE: mi$1,
  CASE_PERLATIVE: yi$1,
  CASE_POSSESSIVE: Ei,
  CASE_POSTDIRECTIVE: Ii,
  CASE_POSTELATIVE: wi,
  CASE_POSTESSIVE: bi$1,
  CASE_POSTPOSITIONAL: Si,
  CASE_PREPOSITIONAL: Ai,
  CASE_PRIVATIVE: Fi,
  CASE_PROLATIVE: Ci,
  CASE_PROSECUTIVE: Di,
  CASE_PROXIMATIVE: Ti,
  CASE_SEPARATIVE: Oi,
  CASE_SOCIATIVE: vi$1,
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
  CLASS_POSSESSIVE: ks$1,
  CLASS_RECIPROCAL: Wn,
  CLASS_REFLEXIVE: Ms,
  CLASS_RELATIVE: zs,
  COMP_COMPARITIVE: Oa,
  COMP_POSITIVE: Ta,
  COMP_SUPERLATIVE: va,
  GEND_ANIMATE: Sa,
  GEND_ANIMATE_MASCULINE: Ca,
  GEND_COMMON: ba$1,
  GEND_FEMININE: Tn,
  GEND_INANIMATE: Aa,
  GEND_INANIMATE_MASCULINE: Da,
  GEND_MASCULINE: Dn,
  GEND_NEUTER: On,
  GEND_PERSONAL_MASCULINE: Fa,
  LANG_ARABIC: mn$1,
  LANG_CHINESE: cs$1,
  LANG_DIR_LTR: ye,
  LANG_DIR_RTL: Pe,
  LANG_GEEZ: ls,
  LANG_GREEK: gn$1,
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
  MOOD_NEGATIVE: eo$1,
  MOOD_OPTATIVE: xn,
  MOOD_PARTICIPLE: $e,
  MOOD_PRESUMPTIVE: to$1,
  MOOD_RENARRATIVE: so$1,
  MOOD_SUBJUNCTIVE: vs,
  MOOD_SUPINE: Rn,
  NRL_CARDINAL: uo,
  NRL_DISTRIBUTIVE: co$1,
  NRL_ORDINAL: lo$1,
  NUM_COLLECTIVE: io,
  NUM_DISTRIBUTIVE_PLURAL: oo,
  NUM_DUAL: Ln,
  NUM_PAUCAL: no$1,
  NUM_PLURAL: Tt,
  NUM_SINGULAR: Dt,
  NUM_SINGULATIVE: ao,
  NUM_TRIAL: ro$1,
  NURL_NUMERAL_ADVERB: ho,
  ORD_1ST: Ne,
  ORD_2ND: xe,
  ORD_3RD: Re,
  ORD_4TH: qt,
  ORD_5TH: Pn,
  ORD_6TH: fo$1,
  ORD_7TH: po,
  ORD_8TH: go,
  ORD_9TH: mo,
  PARADIGM_CAT_KAYLO: Bo,
  PARADIGM_CAT_STATE: Mo,
  POFS_ADJECTIVE: Oe,
  POFS_ADVERB: ne$1,
  POFS_ADVERBIAL: ys,
  POFS_ARTICLE: St,
  POFS_CONJUNCTION: Es,
  POFS_DENOMINATIVE: Cn,
  POFS_EXCLAMATION: ae,
  POFS_GERUNDIVE: Fn,
  POFS_INTERJECTION: ie$1,
  POFS_NOUN: ve$1,
  POFS_NOUN_PROPER: $t,
  POFS_NUMERAL: At,
  POFS_PARTICLE: _e,
  POFS_PREFIX: ws,
  POFS_PREPOSITION: Is,
  POFS_PRONOUN: de$1,
  POFS_SUFFIX: bs$1,
  POFS_SUPINE: Ft,
  POFS_VERB: pe,
  POFS_VERB_PARTICIPLE: Ct,
  STR_LANG_CODE_AR: ps$1,
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
  STR_LANG_CODE_SYR_SYRJ: ms$1,
  STR_LANG_CODE_UNDEFINED: fs,
  STR_LANG_CODE_ZH: bn$1,
  STR_LANG_CODE_ZHO: Xe,
  STR_LANG_CODE_ZH_HANS: An,
  STR_LANG_CODE_ZH_HANT: Sn,
  TENSE_AORIST: Vn,
  TENSE_FUTURE: _s,
  TENSE_FUTURE_PERFECT: Ns,
  TENSE_IMPERFECT: xs,
  TENSE_PAST_ABSOLUTE: yo$1,
  TENSE_PERFECT: Rs,
  TENSE_PLUPERFECT: Ls,
  TENSE_PRESENT: Ps,
  TYPE_IRREGULAR: Mn,
  TYPE_REGULAR: kn$1,
  VKIND_COMPOUNDS_OF_TO_BE: wo$1,
  VKIND_DEPONENT: Do,
  VKIND_IMPERSONAL: Co,
  VKIND_INTRANSITIVE: Fo,
  VKIND_PERFECT_DEFINITE: Oo,
  VKIND_SEMIDEPONENT: To,
  VKIND_TAKING_ABLATIVE: Io,
  VKIND_TAKING_DATIVE: bo$1,
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
  VOICE_IMPERSONAL_PASSIVE: vo$1,
  VOICE_MEDIOPASSIVE: Un,
  VOICE_MIDDLE: Bn,
  VOICE_PASSIVE: Us,
  VOICE_RECIPROCAL: xo,
  VOICE_REFLEXIVE: No
}, Symbol.toStringTag, { value: "Module" })), O = [];
for (let r = 0; r < 256; ++r)
  O.push((r + 256).toString(16).slice(1));
function ko$1(r, e = 0) {
  return (O[r[e + 0]] + O[r[e + 1]] + O[r[e + 2]] + O[r[e + 3]] + "-" + O[r[e + 4]] + O[r[e + 5]] + "-" + O[r[e + 6]] + O[r[e + 7]] + "-" + O[r[e + 8]] + O[r[e + 9]] + "-" + O[r[e + 10]] + O[r[e + 11]] + O[r[e + 12]] + O[r[e + 13]] + O[r[e + 14]] + O[r[e + 15]]).toLowerCase();
}
o$1(ko$1, "unsafeStringify");
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
o$1(zo, "rng");
const qo = typeof crypto != "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Fr = { randomUUID: qo };
function Ot(r, e, t) {
  var n, a, i2;
  if (Fr.randomUUID && !r)
    return Fr.randomUUID();
  r = r || {};
  const s = (i2 = (a = r.random) != null ? a : (n = r.rng) == null ? void 0 : n.call(r)) != null ? i2 : zo();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, ko$1(s);
}
o$1(Ot, "v4");
const ht$1 = class ht {
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
      get: /* @__PURE__ */ o$1(function(s, n) {
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
o$1(ht$1, "ResourceProvider");
let W = ht$1;
const ft = class ft2 {
  constructor(e, t, s, n) {
    this.text = e, this.language = t, this.format = s, this.lemmaText = n, this.ID = Ot();
  }
  static readObject(e) {
    let t = new ft2(e.text, e.language, e.format, e.lemmaText);
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
o$1(ft, "Definition");
let Ze = ft;
const Js = class Js2 {
  /**
   * @param defaults
   * @param {boolean} returnUnknown - If true, and a source value is not found in the importer,
   * a source value will be returned without any change (a passthrough). If false, an Error
   * will be thrown for unknown source values.
   * @returns {FeatureImporter}
   */
  constructor(e = [], t = false) {
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
o$1(Js, "FeatureImporter");
let Qe = Js, le;
const dt = class dt2 {
  /**
   * Creates an instance of the Logger class with the parameters specified.
   *
   * @param {boolean} verbose - In verbose mode, messages will be printed on all levels (err, warn. log, info).
   *                            In non-verbose mode, only error messages will be displayed.
   * @param {boolean} prepend - Whether to prepend text messages with the alpheios message.
   * @param {boolean} trace - Whether to print a call stack.
   */
  constructor({ verbose: e = false, prepend: t = true, trace: s = false } = {}) {
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
    return le ? (typeof e.verbose != "undefined" && (console.info("Setting a verbose mode"), le.setVerboseMode(e.verbose)), typeof e.prepend != "undefined" && (console.info("Setting a prepend mode"), le.setVerboseMode(e.prepend)), typeof e.trace != "undefined" && (console.info("Setting a trace mode"), le.setTraceMode(e.trace))) : le = new dt2(e), le;
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
    return this.setVerboseMode(true), this;
  }
  verboseModeOff() {
    return this.setVerboseMode(false), this;
  }
  prependModeOn() {
    return this.setPrependMode(true), this;
  }
  prependModeOff() {
    return this.setPrependMode(false), this;
  }
  traceModeOn() {
    return this.setTraceMode(true), this;
  }
  traceModeOff() {
    return this.setTraceMode(false), this;
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
o$1(dt, "Logger");
let S = dt;
const P = class P2 {
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
    if (!P2.isAllowedType(e))
      throw new Error('Features of "' + e + '" type are not supported.');
    if (!t)
      throw new Error("Feature should have a non-empty value(s).");
    if (!s)
      throw new Error("No language ID is provided");
    this.type = e, this.languageID = s, this.sortOrder = n, this.allowedValues = a, this._data = P2.dataValuesFromInput(t), this.sort();
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
      if (this._data.length > 1) throw new Error(P2.errMsgs.NO_SINGLE_VALUE);
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
    let t = true;
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
    let t = false;
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
    return new P2(this.type, [[e, t]], this.languageID, this.sortOrder, this.allowedValues);
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
    return new P2(this.type, e, this.languageID, this.sortOrder, this.allowedValues);
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
    return this.values.map((e) => new P2(this.type, e, this.languageID, 1, this.allowedValues));
  }
  /**
   * Create a copy of the feature object.
   */
  getCopy() {
    const e = this._data.map((t) => [t.value, t.sortOrder]);
    return new P2(this.type, e, this.languageID, this.sortOrder, this.allowedValues.slice());
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
    return n = n.reduce((a, i2) => a.concat(i2), []), new P2(this.type, n, this.languageID, this.sortOrder, this.allowedValues);
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
    return new P2(e.type, e.data, t, e.sortOrder, e.allowedValues);
  }
};
o$1(P, "Feature");
let l$1 = P;
l$1.errMsgs = {
  NO_SINGLE_VALUE: "More than one value stored"
};
const pt$1 = class pt {
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
        for (const i2 of a)
          this[i2] = new l$1(this.type, i2, this.languageID), this._orderLookup[i2] = n;
      else
        this[a] = new l$1(this.type, a, this.languageID), this._orderLookup[a] = n;
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
      return new l$1(this.type, [[e, t]], this.languageID);
    throw new Error("A non-empty value should be provided.");
  }
  /**
   *
   * @param {string[][]} data - An array of value arrays as: [[value1, sortOrder1], [value2, sortOrder2]]
   * @returns {Feature}
   */
  getValues(e) {
    return new l$1(this.type, e, this.languageID);
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
    return this.orderedValues.map((e) => new l$1(this.type, e, this.languageID));
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
o$1(pt$1, "FeatureType");
let et$1 = pt$1;
et$1.UNRESTRICTED_VALUE = Symbol("unrestricted");
const Ks = class Ks2 {
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
    return this.hasOwnProperty(e) ? this[e].values.includes(t) : false;
  }
  /**
   * Return this key as a string
   *
   * @returns {string} string representation of the key
   */
  toString() {
    let e = [];
    for (const t of Object.getOwnPropertyNames(this).sort()) {
      const s = this[t] instanceof l$1 ? this[t].values.sort().join(",") : this[t];
      e.push(s);
    }
    return e.join(" ");
  }
};
o$1(Ks, "InflectionGroupingKey");
let k = Ks;
const js = class js2 {
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
o$1(js, "InflectionGroup");
let $ = js;
const Ae = class Ae2 {
  constructor() {
    this.context_backward = Ae2.contextBackward;
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
        l$1.types.part,
        [
          ne$1,
          ys,
          Oe,
          St,
          Es,
          ae,
          ie$1,
          ve$1,
          At,
          _e,
          ws,
          Is,
          de$1,
          bs$1,
          Ft,
          pe,
          Ct
        ]
      ],
      [
        l$1.types.gender,
        [
          Dn,
          Tn,
          On
        ]
      ],
      [
        l$1.types.type,
        [
          kn$1,
          Mn
        ]
      ],
      [
        l$1.types.person,
        [
          Ne,
          xe,
          Re
        ]
      ],
      [
        l$1.types.number,
        [
          Dt,
          Tt
        ]
      ],
      [
        l$1.types.age,
        []
      ],
      [
        l$1.types.area,
        []
      ],
      [
        l$1.types.source,
        []
      ],
      [
        l$1.types.frequency,
        []
      ],
      [
        l$1.types.geo,
        []
      ],
      [
        l$1.types.pronunciation,
        []
      ],
      [
        l$1.types.kind,
        []
      ],
      [
        l$1.types.comparison,
        []
      ],
      [
        l$1.types.morph,
        []
      ],
      [
        l$1.types.stemtype,
        []
      ],
      [
        l$1.types.derivtype,
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
      return new et$1(e, t.get(e), this.languageID);
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
      return new l$1(e, s, this.languageID, 1, s);
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
    return false;
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
    return e.lemma.features[l$1.types.part] ? e.lemma.features[l$1.types.part].value : null;
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
    preserveCase: a = false,
    includeOriginal: i2 = false
  } = {}) {
    return i2 ? [e] : [];
  }
  /**
   * Compare two words with language specific logic
   *
   * @param {string} wordA - a first word for comparison.
   * @param {string} wordB - a second word for comparison.
   * @param {boolean} normalize - whether or not to apply normalization algorithms
   * @param {object} options - Additional comparison criteria.
   */
  static compareWords(e, t, s = true, n = {}) {
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
  static compareFeatureValue(e, t, s, { normalize: n = true } = {}) {
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
    return !Ae2.isLanguageID(e);
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
        [l$1.types.part, l$1.types.declension, l$1.types.dialect, l$1.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i2 = a.toString();
      t.has(i2) ? t.get(i2).append(n) : t.set(i2, new $(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i2 of n[1].inflections) {
        let u2, d2 = false;
        i2[l$1.types.grmCase] ? (u2 = l$1.types.number, d2 = true) : i2[l$1.types.tense] ? u2 = l$1.types.tense : i2[l$1.types.part] === pe || i2[l$1.types.part] === ne$1 ? u2 = l$1.types.part : u2 = "misc";
        const h2 = new k(i2, [u2], { isCaseInflectionSet: d2 }), c2 = h2.toString();
        a.has(c2) ? a.get(c2).append(i2) : a.set(c2, new $(h2, [i2]));
      }
      for (const i2 of a) {
        const u2 = /* @__PURE__ */ new Map(), d2 = /* @__PURE__ */ new Map();
        for (const c2 of i2[1].inflections) {
          const p2 = c2[l$1.types.grmCase] ? Math.max(c2[l$1.types.grmCase].items.map((m2) => m2.sortOrder)) : 1, g2 = new k(c2, [l$1.types.tense, l$1.types.voice]), y = g2.toString();
          u2.has(y) ? u2.get(y).append(c2) : (u2.set(y, new $(g2, [c2], p2)), d2.set(y, p2));
        }
        i2[1].inflections = [];
        const h2 = Array.from(u2.keys()).sort(
          (c2, p2) => {
            const g2 = d2.get(c2), y = d2.get(p2);
            return g2 > y ? -1 : y > g2 ? 1 : 0;
          }
        );
        for (const c2 of h2)
          i2[1].inflections.push(u2.get(c2));
      }
      for (const i2 of a) {
        const u2 = i2[1];
        for (const d2 of u2.inflections) {
          let h2 = /* @__PURE__ */ new Map();
          for (const c2 of d2.inflections) {
            const p2 = new k(
              c2,
              [
                l$1.types.grmCase,
                l$1.types.comparison,
                l$1.types.gender,
                l$1.types.number,
                l$1.types.person,
                l$1.types.tense,
                l$1.types.mood,
                l$1.types.voice
              ]
            ), g2 = p2.toString();
            h2.has(g2) ? h2.get(g2).append(c2) : h2.set(g2, new $(p2, [c2]));
          }
          d2.inflections = Array.from(h2.values());
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
o$1(Ae, "LanguageModel");
let _$1 = Ae, Cr = /* @__PURE__ */ new Map(), Dr = false;
const Xs = class Xs2 extends _$1 {
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
      ..._$1.featureValues,
      [
        l$1.types.grmClass,
        [
          Bs,
          Ms,
          ks$1,
          $s,
          zs,
          qs
        ]
      ],
      [
        l$1.types.number,
        [
          Dt,
          Tt
        ]
      ],
      [
        l$1.types.grmCase,
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
        l$1.types.declension,
        [
          Ne,
          xe,
          Re,
          qt,
          Pn
        ]
      ],
      [
        l$1.types.tense,
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
        l$1.types.voice,
        [
          Vs,
          Us
        ]
      ],
      [
        l$1.types.mood,
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
        l$1.types.conjugation,
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
    Dr = true;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [l$1.types.part, l$1.types.grmCase, l$1.types.mood, l$1.types.declension, l$1.types.tense, l$1.types.conjugation];
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(e) {
    return true;
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
    return e === l$1.types.mood && t === zt ? $e : e === l$1.types.part && t === ae ? ie$1 : t;
  }
  /**
   * Return a normalized part of speech for a lexeme based upon the lemma and inflection data
   *
   * @param {Lexeme} lexeme the lexeme to normalize
   * @returns {string} the alpheios-normalized part of speech value
   */
  static normalizePartOfSpeechValue(e) {
    return e.lemma.features[l$1.types.part] ? e.lemma.features[l$1.types.part].value === ae ? ie$1 : e.lemma.features[l$1.types.part].value : null;
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
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    };
    return e.hasOwnProperty(l$1.types.part) ? [pe, Ct, Ft, Fn].includes(e[l$1.types.part].value) ? (t.fullFormBased = true, t.suffixBased = true) : e[l$1.types.part].value === de$1 ? t.fullFormBased = true : t.suffixBased = true : S.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[l$1.types.part]), t;
  }
};
o$1(Xs, "LatinLanguageModel");
let tt$1 = Xs;
const Ys = class Ys2 {
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
o$1(Ys, "GreekChars");
let Wt = Ys, Tr = /* @__PURE__ */ new Map(), Or = false;
const V = class V2 extends _$1 {
  static get languageID() {
    return gn$1;
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
      ..._$1.featureValues,
      [
        l$1.types.grmClass,
        [
          $s,
          $n,
          zn,
          qn,
          qs,
          Bs,
          ks$1,
          Wn,
          Ms,
          zs
        ]
      ],
      [
        l$1.types.number,
        [
          Dt,
          Tt,
          Ln
        ]
      ],
      [
        l$1.types.grmCase,
        [
          Cs,
          Fs,
          As,
          Ss,
          Ds
        ]
      ],
      [
        l$1.types.declension,
        [
          Ne,
          xe,
          Re
        ]
      ],
      [
        l$1.types.tense,
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
        l$1.types.voice,
        [
          Us,
          Vs,
          Un,
          Bn
        ]
      ],
      [
        l$1.types.mood,
        [
          Os,
          vs,
          xn,
          Ts
        ]
      ],
      [
        // TODO full list of greek dialects
        l$1.types.dialect,
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
    Or = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return true;
  }
  /**
   * @override
   */
  static grammarFeatures() {
    return [l$1.types.part, l$1.types.grmCase, l$1.types.mood, l$1.types.declension, l$1.types.tense, l$1.types.voice];
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
    return e.lemma.features[l$1.types.part] ? e.lemma.features[l$1.types.part].value === _e ? ne$1 : e.lemma.features[l$1.types.part].value === ae ? ie$1 : e.lemma.features[l$1.types.part].value : null;
  }
  /**
   * Return a normalized feature value, based upon the feature type  and supplied value
   *
   * @param {string} featureType the feature type
   * @param {string} featureValue the feature value
   * @returns {string} the alpheios-normalized feature value
   */
  static normalizeFeatureValue(e, t) {
    return e === l$1.types.part && t === _e ? ne$1 : e === l$1.types.part && t === ae ? ie$1 : t;
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
    preserveCase: a = false,
    includeOriginal: i2 = false
  } = {}) {
    if (!e)
      return [];
    let u2 = V2.normalizeText(e);
    a || (u2 = u2.toLocaleLowerCase());
    const d2 = u2.replace(
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
    ), h2 = V2._tonosToOxia(u2), c2 = u2.replace(
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
    ), p2 = u2.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}]/ug,
      ""
    ).normalize("NFC");
    let g2 = [];
    return n === "strippedDiaeresis" ? g2.push(c2) : n === "strippedDiacritics" ? g2.push(p2) : n === "strippedAll" ? g2.push(c2.normalize("NFD").replace(
      /[\u{300}\u{0301}\u{0304}\u{0306},\u{342}\u{314}\u{313}\u{345}]/ug,
      ""
    ).normalize("NFC")) : (g2.push(d2), h2 !== d2 && g2.push(h2)), i2 || (g2 = g2.filter((y) => y !== e)), g2;
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
      fullFormBased: false,
      suffixBased: false,
      pronounClassRequired: false
    }, s = [de$1, At, St];
    return e.hasOwnProperty(l$1.types.part) ? s.includes(e[l$1.types.part].value) ? t.fullFormBased = true : t.suffixBased = true : S.getInstance().warn("Unable to set grammar: part of speech data is missing or is incorrect", e[l$1.types.part]), t.pronounClassRequired = A.compareLanguages(V2.languageID, e.languageID) && e.hasOwnProperty(l$1.types.part) && // eslint-disable-line no-prototype-builtins
    e[l$1.types.part].value === de$1, t;
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
  static getPronounClasses(e, t, s, n = true) {
    let a = /* @__PURE__ */ new Set();
    const i2 = e.filter(
      (u2) => {
        let d2 = false;
        return u2.value && (!u2.features[l$1.types.hdwd] || u2.features[l$1.types.hdwd].value === s) && (d2 = V2.compareWords(u2.value, t, n)), d2;
      }
    );
    for (const u2 of i2)
      if (u2.features.hasOwnProperty(l$1.types.grmClass))
        for (const d2 of u2.features[l$1.types.grmClass].values)
          a.add(d2);
    if (a.size > 0)
      return new l$1(l$1.types.grmClass, Array.from(a), V2.languageID);
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
  static compareWords(e, t, s = true, { normalizeTrailingDigit: n = false } = {}) {
    let a = false;
    if (s) {
      n && (e = this.normalizeTrailingDigit(e), t = this.normalizeTrailingDigit(t));
      const i2 = V2.alternateWordEncodings({
        word: e,
        encoding: "strippedDiacritics",
        includeOriginal: true
      }), u2 = V2.alternateWordEncodings({
        word: t,
        encoding: "strippedDiacritics",
        includeOriginal: true
      });
      for (let d2 = 0; d2 < i2.length && (a = i2[d2] === u2[d2], !a); d2++)
        ;
      a || (a = V2.normalizeText(e) === V2.normalizeText(t));
    } else
      a = e === t;
    return a;
  }
  static isValidUnicode(e) {
    return Wt.chars.some((t) => e.includes(t));
  }
};
o$1(V, "GreekLanguageModel");
let Ht = V;
const vr = /* @__PURE__ */ new Map();
let _r = false;
const Zs = class Zs2 extends _$1 {
  static get languageID() {
    return mn$1;
  }
  static get languageCode() {
    return Je;
  }
  static get languageCodes() {
    return [Je, ps$1];
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
    _r = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return false;
  }
  /**
   * @override
   */
  static alternateWordEncodings({
    word: e = null,
    preceding: t = null,
    following: s = null,
    encoding: n = null,
    preserveCase: a = false,
    includeOriginal: i2 = false
  } = {}) {
    const u2 = e.replace(/[\u{064B}\u{064C}\u{064D}\u{0640}]/ug, ""), d2 = u2.replace(/[\u{0622}\u{0623}\u{0625}]/ug, "ا"), h2 = d2.replace(/[\u{064E}\u{064F}\u{0650}\u{0670}\u{0671}]/ug, ""), c2 = h2.replace(/\u{0651}/ug, ""), p2 = c2.replace(/\u{0652}/ug, ""), g2 = p2.replace(/\u{0627}/ug, ""), y = /* @__PURE__ */ new Map([
      ["tanwin", u2],
      ["hamza", d2],
      ["harakat", h2],
      ["shadda", c2],
      ["sukun", p2],
      ["alef", g2]
    ]);
    let m2 = [];
    return n !== null && y.has(n) ? m2 = [y.get(n)] : m2 = Array.from(y.values()), i2 || (m2 = m2.filter((I2) => I2 !== e)), m2;
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
    let t = [], s = { [ve$1]: [], [Oe]: [], [$t]: [] };
    for (const n of e)
      n[l$1.types.morph] && n[l$1.types.morph].value.match(/ADJ[uaiNK]/) ? s[Oe].push(n) : n[l$1.types.morph] && n[l$1.types.morph].value.match(/NOUN[uaiNK]/) ? s[ve$1].push(n) : n[l$1.types.morph] && n[l$1.types.morph].value.match(/NOUN_PROP[uaiNK]/) ? s[$t].push(n) : (n.example = null, t.push(n));
    for (const n of Object.keys(s))
      t.filter((i2) => i2[l$1.types.part].value === n).length !== 1 && t.push(...s[n]);
    return t;
  }
};
o$1(Zs, "ArabicLanguageModel");
let st$1 = Zs, Nr = /* @__PURE__ */ new Map(), xr = false;
const Qs = class Qs2 extends _$1 {
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
    xr = true;
  }
  /**
   * Check to see if this language tool can produce an inflection table display for the current node
   *
   * @param node
   */
  static canInflect(e) {
    return false;
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
o$1(Qs, "PersianLanguageModel");
let Gt = Qs;
const Rr = /* @__PURE__ */ new Map();
let Lr = false;
const er = class er2 extends _$1 {
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
      ..._$1.featureValues,
      [
        l$1.types.grmCase,
        [
          // TODO Valid Values for case for gez
        ]
      ],
      [
        l$1.types.number,
        [
          // TODO Valid Values for number for gez
        ]
      ],
      [
        l$1.types.gender,
        [
          // TODO Valid Values for gender for gez
        ]
      ],
      [
        l$1.types.mood,
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
    Lr = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return false;
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
o$1(er, "GeezLanguageModel");
let Jt = er, Pr = /* @__PURE__ */ new Map(), Vr = false;
const tr$1 = class tr extends _$1 {
  static get languageID() {
    return cs$1;
  }
  static get languageCode() {
    return Xe;
  }
  static get languageCodes() {
    return [
      bn$1,
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
        l$1.types.fullForm,
        []
      ],
      [
        l$1.types.frequency,
        []
      ],
      [
        l$1.types.pronunciation,
        []
      ],
      [
        l$1.types.radical,
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
    Vr = true;
  }
  static getPunctuation() {
    return `.,;:!?'"(){}\\[\\]<>\\
\r，、。「」《》‌‍†‡`;
  }
  static _isVowel(e) {
    return ["a", "e", "i", "o", "u"].includes(e);
  }
  static formatPinyin(e) {
    const t = ["ā", "á", "ǎ", "à", "a"], s = ["ē", "é", "ě", "è", "e"], n = ["ī", "í", "ǐ", "ì", "i"], a = ["ō", "ó", "ǒ", "ò", "o"], i2 = ["ū", "ú", "ǔ", "ù", "u"], u2 = ["ǖ", "ǘ", "ǚ", "ǜ", "ü"];
    e = e.split(/(\d)/).map((c2) => c2.trim()).filter((c2) => !!c2);
    let d2 = [];
    const h2 = {
      1: 0,
      2: 1,
      3: 2,
      4: 3
    };
    for (let c2 = 0; c2 < e.length; c2++)
      if (c2 % 2 === 0) {
        let p2 = e[c2];
        const g2 = h2[e[c2 + 1]] !== void 0 ? h2[e[c2 + 1]] : 4;
        if (p2.indexOf("a") !== -1)
          p2 = p2.replace("a", t[g2]);
        else if (p2.indexOf("e") !== -1)
          p2 = p2.replace("e", s[g2]);
        else if (p2.indexOf("ou") !== -1)
          p2 = p2.replace("o", a[g2]);
        else
          for (let y = p2.length - 1; y >= 0; y--)
            if (this._isVowel(p2[y])) {
              switch (p2[y]) {
                case "i":
                  p2 = p2.replace("i", n[g2]);
                  break;
                case "o":
                  p2 = p2.replace("o", a[g2]);
                  break;
                case "u":
                  y + 1 < p2.length - 1 && p2[y + 1] === ":" ? p2 = p2.replace("u:", u2[g2]) : p2 = p2.replace("u", i2[g2]);
                  break;
                default:
                  S.getInstance().warn("some kind of weird vowel", p2[y]);
              }
              break;
            }
        d2.push(p2);
      }
    return d2.join(" ").trim();
  }
};
o$1(tr$1, "ChineseLanguageModel");
let Kt = tr$1;
const Ur = /* @__PURE__ */ new Map();
let Br = false;
const sr$1 = class sr extends _$1 {
  static get languageID() {
    return hs;
  }
  static get languageCode() {
    return Ye;
  }
  static get languageCodes() {
    return [Ye, gs, ms$1];
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
      ..._$1.featureValues,
      [
        l$1.types.part,
        [
          ne$1,
          ys,
          Oe,
          St,
          Es,
          ae,
          ie$1,
          ve$1,
          At,
          _e,
          ws,
          Is,
          de$1,
          bs$1,
          Ft,
          pe,
          Ct,
          Cn
        ]
      ],
      [
        l$1.types.kaylo,
        []
      ],
      [
        l$1.types.state,
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
    Br = true;
  }
  /**
     * Check to see if this language tool can produce an inflection table display
  for the current node
     *
     * @param node
     */
  static canInflect(e) {
    return false;
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
        [l$1.types.part, l$1.types.declension, l$1.types.kaylo, l$1.types.state, l$1.types.comparison],
        {
          prefix: n.prefix,
          suffix: n.suffix,
          stem: n.stem
        }
      ), i2 = a.toString();
      t.has(i2) ? t.get(i2).append(n) : t.set(i2, new $(a, [n]));
    }
    for (const n of t) {
      const a = /* @__PURE__ */ new Map();
      for (const i2 of n[1].inflections) {
        let u2, d2 = false;
        i2[l$1.types.grmCase] ? (u2 = l$1.types.number, d2 = true) : i2[l$1.types.tense] ? u2 = l$1.types.tense : i2[l$1.types.part] === pe || i2[l$1.types.part] === ne$1 ? u2 = l$1.types.part : u2 = "misc";
        const h2 = new k(i2, [u2], { isCaseInflectionSet: d2 }), c2 = h2.toString();
        a.has(c2) ? a.get(c2).append(i2) : a.set(c2, new $(h2, [i2]));
      }
      for (const i2 of a) {
        const u2 = /* @__PURE__ */ new Map(), d2 = /* @__PURE__ */ new Map();
        for (const c2 of i2[1].inflections) {
          const p2 = c2[l$1.types.grmCase] ? Math.max(c2[l$1.types.grmCase].items.map((m2) => m2.sortOrder)) : 1, g2 = new k(c2, [l$1.types.tense, l$1.types.voice]), y = g2.toString();
          u2.has(y) ? u2.get(y).append(c2) : (u2.set(y, new $(g2, [c2], p2)), d2.set(y, p2));
        }
        i2[1].inflections = [];
        const h2 = Array.from(u2.keys()).sort(
          (c2, p2) => {
            const g2 = d2.get(c2), y = d2.get(p2);
            return g2 > y ? -1 : y > g2 ? 1 : 0;
          }
        );
        for (const c2 of h2)
          i2[1].inflections.push(u2.get(c2));
      }
      for (const i2 of a) {
        const u2 = i2[1];
        for (const d2 of u2.inflections) {
          const h2 = /* @__PURE__ */ new Map();
          for (const c2 of d2.inflections) {
            const p2 = new k(
              c2,
              [
                l$1.types.grmCase,
                l$1.types.comparison,
                l$1.types.gender,
                l$1.types.number,
                l$1.types.person,
                l$1.types.tense,
                l$1.types.mood,
                l$1.types.voice
              ]
            ), g2 = p2.toString();
            h2.has(g2) ? h2.get(g2).append(c2) : h2.set(g2, new $(p2, [c2]));
          }
          d2.inflections = Array.from(h2.values());
        }
      }
      n[1].inflections = Array.from(a.values());
    }
    return Array.from(t.values());
  }
};
o$1(sr$1, "SyriacLanguageModel");
let be$1 = sr$1;
const X = /* @__PURE__ */ new Map([
  [ds, tt$1],
  [He, tt$1],
  [Ge, Ht],
  [Je, st$1],
  [ps$1, st$1],
  [Ke, Gt],
  [je, Jt],
  [Xe, Kt],
  [Ye, be$1],
  [gs, be$1],
  [ms$1, be$1]
]), M = class M2 {
  /**
   * Checks whether a language is supported
   *
   * @param {string | symbol} language - Language as a language ID (symbol) or a language code (string)
   * @returns {boolean} True if language is supported, false otherwise
   */
  static supportsLanguage(e) {
    return e = typeof e == "symbol" ? M2.getLanguageCodeFromId(e) : e, X.has(e);
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
    const t = M2.getLanguageCodeFromId(e);
    return M2.getLanguageModelFromCode(t);
  }
  static getLanguageModelFromCode(e) {
    return X.has(e) ? X.get(e) : _$1;
  }
  static getLanguageForCode(e = null) {
    const t = X.get(e);
    return t ? new t() : new _$1();
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
      languageCode: M2.getLanguageCodeFromId(e)
    } : {
      languageID: M2.getLanguageIdFromCode(e),
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
    return e = typeof e == "symbol" ? M2.getLanguageCodeFromId(e) : e, t = typeof t == "symbol" ? M2.getLanguageCodeFromId(t) : t, e === t;
  }
  /**
   * returns true if support for the requested language id is in an experimental state
   *
   * @param {symbol} languageID - Language as a language ID (symbol)
   * @returns {boolean}
   */
  static isExperimentalLanguage(e) {
    return [ls, hs, cs$1].includes(e);
  }
};
o$1(M, "LanguageModelFactory");
let A = M;
const gt = class gt2 {
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
    let s = new gt2(e.lemmaWord, t);
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
o$1(gt, "DefinitionSet");
let Se = gt;
const mt$1 = class mt {
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
        return false;
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
      if (!(e[0] instanceof l$1)) {
        const t = e[0].type, s = e[0].languageID, n = e.map((a) => a.value);
        return new l$1(t, n, s);
      }
    } else if (!(e instanceof l$1))
      return new l$1(e.type, e.value, e.languageID);
    return e;
  }
};
o$1(mt$1, "GrmFeature");
let jt = mt$1;
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
const rr = class rr2 {
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
o$1(rr, "FeatureList");
const Fe = class Fe2 {
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
    const a = s.find(function(u2) {
      return u2.in === e.word;
    }), i2 = new Fe2(e, t, a.translations);
    return n ? W.getProxy(n, i2) : i2;
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
    const s = new Fe2(t, e.languageCode, e.translations);
    if (e.provider) {
      const n = W.readObject(e.provider);
      return W.getProxy(n, s);
    } else
      return s;
  }
};
o$1(Fe, "Translation");
let Xt = Fe;
const yt = class yt2 {
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
    let s = new yt2(e.word, t, e.principalParts, e.pronunciation);
    return e.features && e.features.length > 0 && e.features.forEach((n) => {
      s.addFeature(l$1.readObject(n));
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
      if (!(s instanceof l$1))
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
    if (!(e instanceof l$1) && e.constructor.name !== "Feature")
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
  isFullHomonym(e, { normalize: t = false, ignorePofs: s = false } = {}) {
    if (!s && (!this.features[l$1.types.part] || !e.features[l$1.types.part] || !this.features[l$1.types.part].isEqual(e.features[l$1.types.part])))
      return false;
    const n = A.getLanguageModel(this.languageID), a = t ? n.compareWords(
      this.word,
      e.word,
      true,
      { normalizeTrailingDigit: true }
    ) : this.word === e.word, i2 = n.hasTrailingDigit(this.word), u2 = n.hasTrailingDigit(e.word);
    if (i2 && u2) {
      const d2 = this.word.match(/\d+$/)[0], h2 = e.word.match(/\d+$/)[0];
      if (d2 !== h2)
        return false;
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
    if (!t.compareWords(this.word, e.word, true, { normalizeTrailingDigit: true }))
      throw new Error("Words that differ cannot be disambiguated");
    const n = t.hasUpperCase(this.word);
    if (t.hasUpperCase(e.word))
      return e.word;
    if (n)
      return this.word;
    const i2 = t.needsNormalization(this.word);
    if (t.needsNormalization(e.word))
      return t.normalizeText(e.word);
    if (i2)
      return t.normalizeText(this.word);
    const d2 = t.hasTrailingDigit(this.word);
    return t.hasTrailingDigit(e.word) ? e.word : d2 ? this.word : this.word;
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
o$1(yt, "Lemma");
let ge = yt;
const Ce = class Ce2 {
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
      fullFormBased: false,
      // True this inflection stores and requires to use a full form of a word
      suffixBased: false,
      // True if only suffix is enough to identify this inflection
      irregular: false,
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
    let e = new Ce2(this.stem, this.languageID, this.suffix, this.prefix, this.example);
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
    s.hasOwnProperty("normalize") || (s.normalize = true), s.hasOwnProperty("fuzzySuffix") || (s.fuzzySuffix = false);
    let n;
    this.constraints.irregular ? t === "Suffix" ? n = this.suffix : n = this[l$1.types.fullForm] ? this[l$1.types.fullForm].value : this.form : n = this.constraints.suffixBased ? this.suffix : this.form;
    let a = this.modelCompareWords(e, n, s.normalize);
    if (!a && t === "Suffix" && s.fuzzySuffix) {
      const i2 = this.getForm();
      if (i2 && e && i2.length >= e.length) {
        const u2 = i2.substring(i2.length - e.length);
        a = this.modelCompareWords(e, u2, s.normalize);
      }
    }
    return a;
  }
  compareWithWord(e, t = true) {
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
  modelCompareWords(e, t, s = true) {
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
  modelCompareFeatureValue(e, t, s, n = true) {
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
  disambiguatedBy(e, { ignorePofs: t = false } = {}) {
    let s = true, n = true;
    (this.features.size === 0 || e.features.size === 0) && (s = false), e.features.size > this.features.size && (s = false);
    for (const a of e.features)
      if (!(t && a === l$1.types.part))
        for (const i2 of e[a].values) {
          if (!this.hasFeatureValue(a, i2, { normalize: true })) {
            s = false;
            break;
          }
          this[a].values.length !== e[a].values.length && (n = false);
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
      if (!(s instanceof l$1))
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
    if (!(e instanceof l$1) && e.constructor.name !== "Feature")
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
  hasFeatureValue(e, t, { normalize: s = false } = {}) {
    return this.hasOwnProperty(e) ? this[e].values.some((n) => this.modelCompareFeatureValue(e, n, t)) : false;
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
    let s = new Ce2(
      e.stem,
      e.languageCode,
      e.suffix,
      e.prefix,
      e.example
    );
    return s.languageID = A.getLanguageIdFromCode(s.languageCode), e.features && e.features.length > 0 && e.features.forEach((n) => {
      s.addFeature(l$1.readObject(n));
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
o$1(Ce, "Inflection");
let rt = Ce;
const De = class De2 {
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
    this.lemma = e, this.altLemmas = [], this.inflections = [], this.addInflections(t), this.meaning = s || new Se(this.lemma.word, this.lemma.languageID), this.disambiguated = false, this.selectedInflection = null;
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
  isFullHomonym(e, { normalize: t = false } = {}) {
    const s = A.getLanguageModel(this.lemma.languageID), n = s.normalizePartOfSpeechValue(this);
    if (n === s.normalizePartOfSpeechValue(e)) {
      const a = n !== this.lemma.features[l$1.types.part];
      return this.lemma.isFullHomonym(e.lemma, { normalize: t, ignorePofs: a });
    } else
      return false;
  }
  /**
   * Determines whether a lexeme can be disambiguated with the other disambiguator lexeme.
   *
   * @param {Lexeme} disambiguator - A possible disambiguator; a lexeme that is checked
   *         whether it can disambiguate a current lexeme.
   * @returns {boolean} - True if a current lexeme can be disambiguated with a disambiguator, false otherwise.
   */
  canBeDisambiguatedWith(e) {
    const t = e.inflections.length || _$1.hasTrailingDigit(e.lemma.word);
    return this.isFullHomonym(e, { normalize: true }) && t;
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
    let s = new De2(e.lemma, e.inflections, e.meaning);
    const n = A.getLanguageModel(e.lemma.languageID);
    if (e.canBeDisambiguatedWith(t))
      for (const a of s.inflections)
        for (const i2 of t.inflections) {
          const d2 = n.normalizePartOfSpeechValue(t) !== t.lemma.features[l$1.types.part], h2 = a.disambiguatedBy(i2, { ignorePofs: d2 });
          h2.match && (h2.exactMatch ? s.setSelectedInflection(a) : s.setSelectedInflection(i2));
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
    this.disambiguated = true, e && (this.lemma.word = this.lemma.disambiguate(e.lemma));
  }
  getGroupedInflections() {
    return A.getLanguageModel(this.lemma.languageID).groupInflectionsForDisplay(this.inflections);
  }
  static readObject(e) {
    const t = ge.readObject(e.lemma);
    let s = [];
    for (const a of e.inflections)
      s.push(rt.readObject(a));
    const n = new De2(t, s);
    if (e.meaning && (n.meaning = Se.readObject(e.meaning)), e.provider) {
      const a = W.readObject(e.provider);
      return W.getProxy(a, n);
    } else
      return n;
  }
  convertToJSONObject(e = false) {
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
o$1(De, "Lexeme");
let Y = De;
const Z = class Z2 {
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
    return new Z2([a], e);
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
    const s = new Z2(t, e.form || e.targetWord);
    return s.lemmasList = e.lemmasList, s;
  }
  convertToJSONObject(e = false) {
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
    let n = [], a = [], i2 = [], u2 = [];
    for (const h2 of s.lexemes) {
      for (const c2 of e.lexemes) {
        const p2 = c2.canBeDisambiguatedWith(h2) ? Y.disambiguateInflections(c2, h2) : c2;
        c2.isFullHomonym(h2, { normalize: true }) ? p2.getSelectedInflection() !== null ? (p2.setDisambiguation(h2), n.push(p2)) : i2.push(p2) : u2.push(p2);
      }
      if (n.length === 0)
        if (i2.length > 0)
          for (const c2 of i2) {
            c2.setDisambiguation(h2);
            for (const p2 of s.inflections)
              c2.addInflection(p2), c2.setSelectedInflection(p2);
          }
        else {
          h2.setDisambiguation();
          for (const c2 of h2.inflections)
            h2.setSelectedInflection(c2);
          a.push(h2);
        }
    }
    const d2 = new Z2([...a, ...n, ...i2, ...u2], e.targetWord);
    return Z2.disambiguate(d2, t);
  }
};
o$1(Z, "Homonym");
let nt = Z;
const Et = class Et2 {
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
  toHomonym(e, { disambiguated: t = false } = {}) {
    if (!e)
      throw new Error(Et2.errors.NO_TARGET_WORD);
    const s = this._homonyms.map((n) => n.lexemes).flat();
    return t && s.forEach((n) => {
      n.disambiguated = true;
    }), new nt(s, e);
  }
};
o$1(Et, "HomonymGroup");
let Yt = Et;
Yt.errors = {
  NO_TARGET_WORD: "Target word is not provided"
};
const nr$1 = class nr {
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
o$1(nr$1, "PsEventData");
let Zt = nr$1;
const ar$1 = class ar {
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
o$1(ar$1, "PsEvent");
const wt = class wt2 {
  constructor(e, t, s = null, n = null, a = null) {
    this.languageCode = e, this.normalizedText = t, this.contextForward = 6, this.contextBackward = 6, this.text = this.normalizedText, this.prefix = s, this.suffix = n, this.source = a, this.ID = Ot();
  }
  get contextHTML() {
    const e = `<span class="alpheios_worditem_incontext_add">${this.text}</span>`, t = this.prefix.replace(this.text, e), s = this.suffix.replace(this.text, e);
    return `${t} <span class="alpheios_worditem_incontext">${this.text}</span> ${s}`;
  }
  static readObject(e) {
    let t = new wt2(e.languageCode, e.target.selector.exact);
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
o$1(wt, "TextQuoteSelector");
let at = wt;
const ir = class ir2 extends at {
  constructor(e, t, s, n, a, i2) {
    super(e, t), this.prefix = s, this.suffix = n, this.source = a, this.cit = i2, this.author = null, this.textWork = null, this.passage = null;
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
o$1(ir, "WordUsageExample");
let $r = ir;
const Q = class Q2 {
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
    return this.titles[e] ? this.titles[e] : this.titles[Q2.defaultLang] ? this.titles[Q2.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[Q2.defaultLang] ? this.abbreviations[Q2.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o$1(Q, "Author");
let zr = Q;
const ee = class ee2 {
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
    return this.titles[e] ? this.titles[e] : this.titles[ee2.defaultLang] ? this.titles[ee2.defaultLang] : Object.values(this.titles).length > 0 ? Object.values(this.titles)[0] : null;
  }
  /**
   * Method returns abbreviation in the lang from arguments, otherwise in default language or (if not exists) it returns first available abbreviation
   *
   * @param {string} lang - language for getting abbreviation
   * @returns {string}
   */
  abbreviation(e) {
    return this.abbreviations[e] ? this.abbreviations[e] : this.abbreviations[ee2.defaultLang] ? this.abbreviations[ee2.defaultLang] : Object.values(this.abbreviations).length > 0 ? Object.values(this.abbreviations)[0] : null;
  }
};
o$1(ee, "TextWork");
let qr = ee;
const ce = class ce2 {
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
  constructor(e = { targetWord: null, languageCode: null, important: false, currentSession: true, context: [], homonym: {}, createdDT: null, updatedDT: null, frequency: null }) {
    if (this.version = 1, this.targetWord = e.targetWord, this.languageCode = e.languageCode, !this.targetWord || !this.languageCode)
      throw new Error("Unable to construct a worditem without at least a targetWord and a languageCode");
    this.important = e.important === void 0 ? false : e.important, this.currentSession = e.currentSession === void 0 ? true : e.currentSession, this.context = e.context || [], this.homonym = e.homonym || {}, this.createdDT = e.createdDT, this.updatedDT = e.updatedDT, this.frequency = e.frequency;
  }
  /**
   * Construct a WordItem from JSON
   *
   * @param jsonObject
   */
  static readObject(e) {
    let t = {}, s = [];
    return e.homonym && (t = ce2.readHomonym(e)), e.context && (s = ce2.readContext(e)), new ce2({
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
o$1(ce, "WordItem");
let Qt = ce;
const or$1 = class or {
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
    const t = this.getWordItem(e.targetWord, false);
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
  getWordItem(e, t = true, s = null) {
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
o$1(or$1, "WordList");
const Te = class Te2 {
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
    this.version = 0, this.app = null, this.sourceUrl = null, this.wordIds = [], this.sentenceId = null, this.doc = null, this.suppressTree = false;
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
        const i2 = n ? n.closest("[data-alpheios_tb_doc]") : a.closest("[data-alpheios_tb_doc]");
        if (!i2)
          throw new Error("Document ID is undefined: there is no parent element with data-alpheios_tb_doc attribute");
        n && (this.wordIds = n.dataset.alpheios_tb_word.split(" ")), this.sentenceId = a.dataset.alpheios_tb_sent, this.doc = i2.dataset.alpheios_tb_doc;
      } else {
        const i2 = s.dataset.alpheios_tb_ref;
        let u2;
        try {
          u2 = i2.split(" ").map((d2) => Te2.parseReference(d2));
        } catch (d2) {
          throw new Error(`${d2.message} in: ${t.outerHTML}`);
        }
        u2 = u2.filter((d2) => d2.doc === u2[0].doc && d2.sent === u2[0].sent), this.doc = u2[0].doc, this.sentenceId = u2[0].sent, this.wordIds = u2.map((d2) => d2.word);
      }
    }
    if (!this.doc)
      throw new Error("Document data is missing");
    if (!this.sentenceId)
      throw new Error("Sentence data is missing");
  }
  static getTreebankData(e = null) {
    try {
      return new Te2(e);
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
o$1(Te, "TreebankDataItem");
const ur$1 = class ur {
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
o$1(ur$1, "OptionItem");
let it$1 = ur$1;
const q = class q2 {
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
    this.defaults = e, this.domain = e.domain, this.version = e.version.toString(), this.storageAdapter = t, this.items = q2.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
  }
  static initItems(e, t, s, n) {
    let a = {};
    for (const [i2, u2] of Object.entries(e))
      if (u2.group) {
        a[i2] = [];
        for (const [d2, h2] of Object.entries(u2.group)) {
          const c2 = q2.constructKey(s, n, i2, d2);
          a[i2].push(new it$1(h2, c2, t));
        }
      } else {
        const d2 = q2.constructKey(s, n, i2);
        a[i2] = new it$1(u2, d2, t);
      }
    return a;
  }
  /**
   * Reset all options to default values
   */
  reset() {
    return L(this, null, function* () {
      yield this.storageAdapter.clearAll(), this.items = q2.initItems(this.defaults.items, this.storageAdapter, this.domain, this.version);
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
          const s = q2.parseKey(t);
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
    let i2;
    try {
      i2 = {
        domain: t,
        version: s,
        name: n,
        group: a
      };
    } catch (u2) {
      S.getInstance().warn(`Failed to parse stored Alpheios options key ${e}`);
    }
    return i2;
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
    const n = new q2(s, new t(s.domain));
    return Object.keys(n.items).forEach((a) => {
      let i2 = n.items[a];
      this.items[a].values && i2.uploadValuesFromArray(this.items[a].values);
    }), n;
  }
};
o$1(q, "Options");
let Gr = q;
const lr = class lr2 {
  static fromJSON(e) {
    try {
      return JSON.parse(e);
    } catch (t) {
      return S.getInstance().error("Unable to parse Alpheios JSON options string:", t), {};
    }
  }
};
o$1(lr, "DefaultsLoader");
const cr = class cr2 {
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
o$1(cr, "StorageAdapter");
let me = cr;
const hr$1 = class hr extends me {
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
o$1(hr$1, "ExtensionSyncStorage");
const fr$1 = class fr extends me {
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
        for (const [a, i2] of Object.entries(e))
          window.localStorage.setItem(a, i2), n.includes(a) || n.push(a);
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
            a !== -1 && n.splice(a, 1), window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify(n)), window.localStorage.removeItem(e), t(true);
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
          window.localStorage.setItem(`${this.domain}-keys`, JSON.stringify([])), e(true);
        } else
          e(s);
      } catch (s) {
        t(s);
      }
    });
  }
};
o$1(fr$1, "LocalStorageArea");
function Hn(r, e) {
  return /* @__PURE__ */ o$1(function() {
    return r.apply(e, arguments);
  }, "wrap");
}
o$1(Hn, "bind");
const { toString: Wo } = Object.prototype, { getPrototypeOf: Ws } = Object, { iterator: vt, toStringTag: Gn } = Symbol, _t = /* @__PURE__ */ ((r) => (e) => {
  const t = Wo.call(e);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), U = /* @__PURE__ */ o$1((r) => (r = r.toLowerCase(), (e) => _t(e) === r), "kindOfTest"), Nt = /* @__PURE__ */ o$1((r) => (e) => typeof e === r, "typeOfTest"), { isArray: Ee } = Array, Le = Nt("undefined");
function Ve(r) {
  return r !== null && !Le(r) && r.constructor !== null && !Le(r.constructor) && x(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
o$1(Ve, "isBuffer");
const Jn = U("ArrayBuffer");
function Ho(r) {
  let e;
  return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? e = ArrayBuffer.isView(r) : e = r && r.buffer && Jn(r.buffer), e;
}
o$1(Ho, "isArrayBufferView");
const Go = Nt("string"), x = Nt("function"), Kn = Nt("number"), Ue = /* @__PURE__ */ o$1((r) => r !== null && typeof r == "object", "isObject"), Jo = /* @__PURE__ */ o$1((r) => r === true || r === false, "isBoolean"), ze = /* @__PURE__ */ o$1((r) => {
  if (_t(r) !== "object")
    return false;
  const e = Ws(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Gn in r) && !(vt in r);
}, "isPlainObject"), Ko = /* @__PURE__ */ o$1((r) => {
  if (!Ue(r) || Ve(r))
    return false;
  try {
    return Object.keys(r).length === 0 && Object.getPrototypeOf(r) === Object.prototype;
  } catch (e) {
    return false;
  }
}, "isEmptyObject"), jo = U("Date"), Xo = U("File"), Yo = U("Blob"), Zo = U("FileList"), Qo = /* @__PURE__ */ o$1((r) => Ue(r) && x(r.pipe), "isStream"), eu$1 = /* @__PURE__ */ o$1((r) => {
  let e;
  return r && (typeof FormData == "function" && r instanceof FormData || x(r.append) && ((e = _t(r)) === "formdata" || // detect form-data instance
  e === "object" && x(r.toString) && r.toString() === "[object FormData]"));
}, "isFormData"), tu = U("URLSearchParams"), [su$1, ru$1, nu, au] = ["ReadableStream", "Request", "Response", "Headers"].map(U), iu$1 = /* @__PURE__ */ o$1((r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), "trim");
function Be(r, e, { allOwnKeys: t = false } = {}) {
  if (r === null || typeof r == "undefined")
    return;
  let s, n;
  if (typeof r != "object" && (r = [r]), Ee(r))
    for (s = 0, n = r.length; s < n; s++)
      e.call(null, r[s], s, r);
  else {
    if (Ve(r))
      return;
    const a = t ? Object.getOwnPropertyNames(r) : Object.keys(r), i2 = a.length;
    let u2;
    for (s = 0; s < i2; s++)
      u2 = a[s], e.call(null, r[u2], u2, r);
  }
}
o$1(Be, "forEach");
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
o$1(jn, "findKey");
const te$1 = typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : typeof window != "undefined" ? window : global, Xn = /* @__PURE__ */ o$1((r) => !Le(r) && r !== te$1, "isContextDefined");
function es$1() {
  const { caseless: r } = Xn(this) && this || {}, e = {}, t = /* @__PURE__ */ o$1((s, n) => {
    const a = r && jn(e, n) || n;
    ze(e[a]) && ze(s) ? e[a] = es$1(e[a], s) : ze(s) ? e[a] = es$1({}, s) : Ee(s) ? e[a] = s.slice() : e[a] = s;
  }, "assignValue");
  for (let s = 0, n = arguments.length; s < n; s++)
    arguments[s] && Be(arguments[s], t);
  return e;
}
o$1(es$1, "merge");
const ou = /* @__PURE__ */ o$1((r, e, t, { allOwnKeys: s } = {}) => (Be(e, (n, a) => {
  t && x(n) ? r[a] = Hn(n, t) : r[a] = n;
}, { allOwnKeys: s }), r), "extend"), uu = /* @__PURE__ */ o$1((r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), "stripBOM"), lu = /* @__PURE__ */ o$1((r, e, t, s) => {
  r.prototype = Object.create(e.prototype, s), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: e.prototype
  }), t && Object.assign(r.prototype, t);
}, "inherits"), cu = /* @__PURE__ */ o$1((r, e, t, s) => {
  let n, a, i2;
  const u2 = {};
  if (e = e || {}, r == null) return e;
  do {
    for (n = Object.getOwnPropertyNames(r), a = n.length; a-- > 0; )
      i2 = n[a], (!s || s(i2, r, e)) && !u2[i2] && (e[i2] = r[i2], u2[i2] = true);
    r = t !== false && Ws(r);
  } while (r && (!t || t(r, e)) && r !== Object.prototype);
  return e;
}, "toFlatObject"), hu$1 = /* @__PURE__ */ o$1((r, e, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= e.length;
  const s = r.indexOf(e, t);
  return s !== -1 && s === t;
}, "endsWith"), fu = /* @__PURE__ */ o$1((r) => {
  if (!r) return null;
  if (Ee(r)) return r;
  let e = r.length;
  if (!Kn(e)) return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = r[e];
  return t;
}, "toArray"), du = /* @__PURE__ */ ((r) => (e) => r && e instanceof r)(typeof Uint8Array != "undefined" && Ws(Uint8Array)), pu = /* @__PURE__ */ o$1((r, e) => {
  const s = (r && r[vt]).call(r);
  let n;
  for (; (n = s.next()) && !n.done; ) {
    const a = n.value;
    e.call(r, a[0], a[1]);
  }
}, "forEachEntry"), gu$1 = /* @__PURE__ */ o$1((r, e) => {
  let t;
  const s = [];
  for (; (t = r.exec(e)) !== null; )
    s.push(t);
  return s;
}, "matchAll"), mu = U("HTMLFormElement"), yu = /* @__PURE__ */ o$1((r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  /* @__PURE__ */ o$1(function(t, s, n) {
    return s.toUpperCase() + n;
  }, "replacer")
), "toCamelCase"), Xr = (({ hasOwnProperty: r }) => (e, t) => r.call(e, t))(Object.prototype), Eu = U("RegExp"), Yn = /* @__PURE__ */ o$1((r, e) => {
  const t = Object.getOwnPropertyDescriptors(r), s = {};
  Be(t, (n, a) => {
    let i2;
    (i2 = e(n, a, r)) !== false && (s[a] = i2 || n);
  }), Object.defineProperties(r, s);
}, "reduceDescriptors"), wu = /* @__PURE__ */ o$1((r) => {
  Yn(r, (e, t) => {
    if (x(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return false;
    const s = r[t];
    if (x(s)) {
      if (e.enumerable = false, "writable" in e) {
        e.writable = false;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, "freezeMethods"), Iu = /* @__PURE__ */ o$1((r, e) => {
  const t = {}, s = /* @__PURE__ */ o$1((n) => {
    n.forEach((a) => {
      t[a] = true;
    });
  }, "define");
  return Ee(r) ? s(r) : s(String(r).split(e)), t;
}, "toObjectSet"), bu = /* @__PURE__ */ o$1(() => {
}, "noop"), Su = /* @__PURE__ */ o$1((r, e) => r != null && Number.isFinite(r = +r) ? r : e, "toFiniteNumber");
function Au(r) {
  return !!(r && x(r.append) && r[Gn] === "FormData" && r[vt]);
}
o$1(Au, "isSpecCompliantForm");
const Fu = /* @__PURE__ */ o$1((r) => {
  const e = new Array(10), t = /* @__PURE__ */ o$1((s, n) => {
    if (Ue(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (Ve(s))
        return s;
      if (!("toJSON" in s)) {
        e[n] = s;
        const a = Ee(s) ? [] : {};
        return Be(s, (i2, u2) => {
          const d2 = t(i2, n + 1);
          !Le(d2) && (a[u2] = d2);
        }), e[n] = void 0, a;
      }
    }
    return s;
  }, "visit");
  return t(r, 0);
}, "toJSONObject"), Cu = U("AsyncFunction"), Du = /* @__PURE__ */ o$1((r) => r && (Ue(r) || x(r)) && x(r.then) && x(r.catch), "isThenable"), Zn = ((r, e) => r ? setImmediate : e ? ((t, s) => (te$1.addEventListener("message", ({ source: n, data: a }) => {
  n === te$1 && a === t && s.length && s.shift()();
}, false), (n) => {
  s.push(n), te$1.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  x(te$1.postMessage)
), Tu = typeof queueMicrotask != "undefined" ? queueMicrotask.bind(te$1) : typeof process != "undefined" && process.nextTick || Zn, Ou = /* @__PURE__ */ o$1((r) => r != null && x(r[vt]), "isIterable"), f$1 = {
  isArray: Ee,
  isArrayBuffer: Jn,
  isBuffer: Ve,
  isFormData: eu$1,
  isArrayBufferView: Ho,
  isString: Go,
  isNumber: Kn,
  isBoolean: Jo,
  isObject: Ue,
  isPlainObject: ze,
  isEmptyObject: Ko,
  isReadableStream: su$1,
  isRequest: ru$1,
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
  merge: es$1,
  extend: ou,
  trim: iu$1,
  stripBOM: uu,
  inherits: lu,
  toFlatObject: cu,
  kindOf: _t,
  kindOfTest: U,
  endsWith: hu$1,
  toArray: fu,
  forEachEntry: pu,
  matchAll: gu$1,
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
  global: te$1,
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
o$1(b, "AxiosError$1");
f$1.inherits(b, Error, {
  toJSON: /* @__PURE__ */ o$1(function() {
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
      config: f$1.toJSONObject(this.config),
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
Object.defineProperty(Qn, "isAxiosError", { value: true });
b.from = (r, e, t, s, n, a) => {
  const i2 = Object.create(Qn);
  return f$1.toFlatObject(r, i2, /* @__PURE__ */ o$1(function(d2) {
    return d2 !== Error.prototype;
  }, "filter"), (u2) => u2 !== "isAxiosError"), b.call(i2, r.message, e, t, s, n), i2.cause = r, i2.name = r.name, a && Object.assign(i2, a), i2;
};
const vu = null;
function ts$1(r) {
  return f$1.isPlainObject(r) || f$1.isArray(r);
}
o$1(ts$1, "isVisitable");
function ta$1(r) {
  return f$1.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
o$1(ta$1, "removeBrackets");
function Yr(r, e, t) {
  return r ? r.concat(e).map(/* @__PURE__ */ o$1(function(n, a) {
    return n = ta$1(n), !t && a ? "[" + n + "]" : n;
  }, "each")).join(t ? "." : "") : e;
}
o$1(Yr, "renderKey");
function _u(r) {
  return f$1.isArray(r) && !r.some(ts$1);
}
o$1(_u, "isFlatArray");
const Nu = f$1.toFlatObject(f$1, {}, null, /* @__PURE__ */ o$1(function(e) {
  return /^is[A-Z]/.test(e);
}, "filter"));
function xt(r, e, t) {
  if (!f$1.isObject(r))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = f$1.toFlatObject(t, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, /* @__PURE__ */ o$1(function(I2, E2) {
    return !f$1.isUndefined(E2[I2]);
  }, "defined"));
  const s = t.metaTokens, n = t.visitor || c2, a = t.dots, i2 = t.indexes, d2 = (t.Blob || typeof Blob != "undefined" && Blob) && f$1.isSpecCompliantForm(e);
  if (!f$1.isFunction(n))
    throw new TypeError("visitor must be a function");
  function h2(m2) {
    if (m2 === null) return "";
    if (f$1.isDate(m2))
      return m2.toISOString();
    if (f$1.isBoolean(m2))
      return m2.toString();
    if (!d2 && f$1.isBlob(m2))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return f$1.isArrayBuffer(m2) || f$1.isTypedArray(m2) ? d2 && typeof Blob == "function" ? new Blob([m2]) : Buffer.from(m2) : m2;
  }
  o$1(h2, "convertValue");
  function c2(m2, I2, E2) {
    let C = m2;
    if (m2 && !E2 && typeof m2 == "object") {
      if (f$1.endsWith(I2, "{}"))
        I2 = s ? I2 : I2.slice(0, -2), m2 = JSON.stringify(m2);
      else if (f$1.isArray(m2) && _u(m2) || (f$1.isFileList(m2) || f$1.endsWith(I2, "[]")) && (C = f$1.toArray(m2)))
        return I2 = ta$1(I2), C.forEach(/* @__PURE__ */ o$1(function(T, z) {
          !(f$1.isUndefined(T) || T === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            i2 === true ? Yr([I2], z, a) : i2 === null ? I2 : I2 + "[]",
            h2(T)
          );
        }, "each")), false;
    }
    return ts$1(m2) ? true : (e.append(Yr(E2, I2, a), h2(m2)), false);
  }
  o$1(c2, "defaultVisitor");
  const p2 = [], g2 = Object.assign(Nu, {
    defaultVisitor: c2,
    convertValue: h2,
    isVisitable: ts$1
  });
  function y(m2, I2) {
    if (!f$1.isUndefined(m2)) {
      if (p2.indexOf(m2) !== -1)
        throw Error("Circular reference detected in " + I2.join("."));
      p2.push(m2), f$1.forEach(m2, /* @__PURE__ */ o$1(function(C, D2) {
        (!(f$1.isUndefined(C) || C === null) && n.call(
          e,
          C,
          f$1.isString(D2) ? D2.trim() : D2,
          I2,
          g2
        )) === true && y(C, I2 ? I2.concat(D2) : [D2]);
      }, "each")), p2.pop();
    }
  }
  if (o$1(y, "build"), !f$1.isObject(r))
    throw new TypeError("data must be an object");
  return y(r), e;
}
o$1(xt, "toFormData$1");
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
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, /* @__PURE__ */ o$1(function(s) {
    return e[s];
  }, "replacer"));
}
o$1(Zr, "encode$1");
function Hs(r, e) {
  this._pairs = [], r && xt(r, this, e);
}
o$1(Hs, "AxiosURLSearchParams");
const sa$1 = Hs.prototype;
sa$1.append = /* @__PURE__ */ o$1(function(e, t) {
  this._pairs.push([e, t]);
}, "append");
sa$1.toString = /* @__PURE__ */ o$1(function(e) {
  const t = e ? function(s) {
    return e.call(this, s, Zr);
  } : Zr;
  return this._pairs.map(/* @__PURE__ */ o$1(function(n) {
    return t(n[0]) + "=" + t(n[1]);
  }, "each"), "").join("&");
}, "toString");
function xu(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
o$1(xu, "encode");
function ra(r, e, t) {
  if (!e)
    return r;
  const s = t && t.encode || xu;
  f$1.isFunction(t) && (t = {
    serialize: t
  });
  const n = t && t.serialize;
  let a;
  if (n ? a = n(e, t) : a = f$1.isURLSearchParams(e) ? e.toString() : new Hs(e, t).toString(s), a) {
    const i2 = r.indexOf("#");
    i2 !== -1 && (r = r.slice(0, i2)), r += (r.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return r;
}
o$1(ra, "buildURL");
const dr = class dr2 {
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
      synchronous: s ? s.synchronous : false,
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
    f$1.forEach(this.handlers, /* @__PURE__ */ o$1(function(s) {
      s !== null && e(s);
    }, "forEachHandler"));
  }
};
o$1(dr, "InterceptorManager");
let ot = dr;
const na$1 = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
}, Ru = typeof URLSearchParams != "undefined" ? URLSearchParams : Hs, Lu = typeof FormData != "undefined" ? FormData : null, Pu = typeof Blob != "undefined" ? Blob : null, Vu = {
  isBrowser: true,
  classes: {
    URLSearchParams: Ru,
    FormData: Lu,
    Blob: Pu
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Gs = typeof window != "undefined" && typeof document != "undefined", ss$1 = typeof navigator == "object" && navigator || void 0, Uu = Gs && (!ss$1 || ["ReactNative", "NativeScript", "NS"].indexOf(ss$1.product) < 0), Bu = typeof WorkerGlobalScope != "undefined" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Mu = Gs && window.location.href || "http://localhost", ku$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Gs,
  hasStandardBrowserEnv: Uu,
  hasStandardBrowserWebWorkerEnv: Bu,
  navigator: ss$1,
  origin: Mu
}, Symbol.toStringTag, { value: "Module" })), v = G(G({}, ku$1), Vu);
function $u(r, e) {
  return xt(r, new v.classes.URLSearchParams(), G({
    visitor: /* @__PURE__ */ o$1(function(t, s, n, a) {
      return v.isNode && f$1.isBuffer(t) ? (this.append(s, t.toString("base64")), false) : a.defaultVisitor.apply(this, arguments);
    }, "visitor")
  }, e));
}
o$1($u, "toURLEncodedForm");
function zu$1(r) {
  return f$1.matchAll(/\w+|\[(\w*)]/g, r).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
o$1(zu$1, "parsePropPath");
function qu$1(r) {
  const e = {}, t = Object.keys(r);
  let s;
  const n = t.length;
  let a;
  for (s = 0; s < n; s++)
    a = t[s], e[a] = r[a];
  return e;
}
o$1(qu$1, "arrayToObject");
function aa$1(r) {
  function e(t, s, n, a) {
    let i2 = t[a++];
    if (i2 === "__proto__") return true;
    const u2 = Number.isFinite(+i2), d2 = a >= t.length;
    return i2 = !i2 && f$1.isArray(n) ? n.length : i2, d2 ? (f$1.hasOwnProp(n, i2) ? n[i2] = [n[i2], s] : n[i2] = s, !u2) : ((!n[i2] || !f$1.isObject(n[i2])) && (n[i2] = []), e(t, s, n[i2], a) && f$1.isArray(n[i2]) && (n[i2] = qu$1(n[i2])), !u2);
  }
  if (o$1(e, "buildPath"), f$1.isFormData(r) && f$1.isFunction(r.entries)) {
    const t = {};
    return f$1.forEachEntry(r, (s, n) => {
      e(zu$1(s), n, t, 0);
    }), t;
  }
  return null;
}
o$1(aa$1, "formDataToJSON");
function Wu(r, e, t) {
  if (f$1.isString(r))
    try {
      return (e || JSON.parse)(r), f$1.trim(r);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (t || JSON.stringify)(r);
}
o$1(Wu, "stringifySafely");
const Me = {
  transitional: na$1,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [/* @__PURE__ */ o$1(function(e, t) {
    const s = t.getContentType() || "", n = s.indexOf("application/json") > -1, a = f$1.isObject(e);
    if (a && f$1.isHTMLForm(e) && (e = new FormData(e)), f$1.isFormData(e))
      return n ? JSON.stringify(aa$1(e)) : e;
    if (f$1.isArrayBuffer(e) || f$1.isBuffer(e) || f$1.isStream(e) || f$1.isFile(e) || f$1.isBlob(e) || f$1.isReadableStream(e))
      return e;
    if (f$1.isArrayBufferView(e))
      return e.buffer;
    if (f$1.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
    let u2;
    if (a) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return $u(e, this.formSerializer).toString();
      if ((u2 = f$1.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
        const d2 = this.env && this.env.FormData;
        return xt(
          u2 ? { "files[]": e } : e,
          d2 && new d2(),
          this.formSerializer
        );
      }
    }
    return a || n ? (t.setContentType("application/json", false), Wu(e)) : e;
  }, "transformRequest")],
  transformResponse: [/* @__PURE__ */ o$1(function(e) {
    const t = this.transitional || Me.transitional, s = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (f$1.isResponse(e) || f$1.isReadableStream(e))
      return e;
    if (e && f$1.isString(e) && (s && !this.responseType || n)) {
      const i2 = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(e);
      } catch (u2) {
        if (i2)
          throw u2.name === "SyntaxError" ? b.from(u2, b.ERR_BAD_RESPONSE, this, null, this.response) : u2;
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
  validateStatus: /* @__PURE__ */ o$1(function(e) {
    return e >= 200 && e < 300;
  }, "validateStatus"),
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
f$1.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  Me.headers[r] = {};
});
const Hu = f$1.toObjectSet([
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
]), Gu = /* @__PURE__ */ o$1((r) => {
  const e = {};
  let t, s, n;
  return r && r.split(`
`).forEach(/* @__PURE__ */ o$1(function(i2) {
    n = i2.indexOf(":"), t = i2.substring(0, n).trim().toLowerCase(), s = i2.substring(n + 1).trim(), !(!t || e[t] && Hu[t]) && (t === "set-cookie" ? e[t] ? e[t].push(s) : e[t] = [s] : e[t] = e[t] ? e[t] + ", " + s : s);
  }, "parser")), e;
}, "parseHeaders"), Qr = Symbol("internals");
function Ie(r) {
  return r && String(r).trim().toLowerCase();
}
o$1(Ie, "normalizeHeader");
function qe(r) {
  return r === false || r == null ? r : f$1.isArray(r) ? r.map(qe) : String(r);
}
o$1(qe, "normalizeValue");
function Ju(r) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = t.exec(r); )
    e[s[1]] = s[2];
  return e;
}
o$1(Ju, "parseTokens");
const Ku = /* @__PURE__ */ o$1((r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim()), "isValidHeaderName");
function Bt(r, e, t, s, n) {
  if (f$1.isFunction(s))
    return s.call(this, e, t);
  if (n && (e = t), !!f$1.isString(e)) {
    if (f$1.isString(s))
      return e.indexOf(s) !== -1;
    if (f$1.isRegExp(s))
      return s.test(e);
  }
}
o$1(Bt, "matchHeaderValue");
function ju(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, s) => t.toUpperCase() + s);
}
o$1(ju, "formatHeader");
function Xu(r, e) {
  const t = f$1.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(r, s + t, {
      value: /* @__PURE__ */ o$1(function(n, a, i2) {
        return this[s].call(this, e, n, a, i2);
      }, "value"),
      configurable: true
    });
  });
}
o$1(Xu, "buildAccessors");
var he;
let R$1 = (he = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, s) {
    const n = this;
    function a(u2, d2, h2) {
      const c2 = Ie(d2);
      if (!c2)
        throw new Error("header name must be a non-empty string");
      const p2 = f$1.findKey(n, c2);
      (!p2 || n[p2] === void 0 || h2 === true || h2 === void 0 && n[p2] !== false) && (n[p2 || d2] = qe(u2));
    }
    o$1(a, "setHeader");
    const i2 = /* @__PURE__ */ o$1((u2, d2) => f$1.forEach(u2, (h2, c2) => a(h2, c2, d2)), "setHeaders");
    if (f$1.isPlainObject(e) || e instanceof this.constructor)
      i2(e, t);
    else if (f$1.isString(e) && (e = e.trim()) && !Ku(e))
      i2(Gu(e), t);
    else if (f$1.isObject(e) && f$1.isIterable(e)) {
      let u2 = {}, d2, h2;
      for (const c2 of e) {
        if (!f$1.isArray(c2))
          throw TypeError("Object iterator must return a key-value pair");
        u2[h2 = c2[0]] = (d2 = u2[h2]) ? f$1.isArray(d2) ? [...d2, c2[1]] : [d2, c2[1]] : c2[1];
      }
      i2(u2, t);
    } else
      e != null && a(t, e, s);
    return this;
  }
  get(e, t) {
    if (e = Ie(e), e) {
      const s = f$1.findKey(this, e);
      if (s) {
        const n = this[s];
        if (!t)
          return n;
        if (t === true)
          return Ju(n);
        if (f$1.isFunction(t))
          return t.call(this, n, s);
        if (f$1.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = Ie(e), e) {
      const s = f$1.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!t || Bt(this, this[s], s, t)));
    }
    return false;
  }
  delete(e, t) {
    const s = this;
    let n = false;
    function a(i2) {
      if (i2 = Ie(i2), i2) {
        const u2 = f$1.findKey(s, i2);
        u2 && (!t || Bt(s, s[u2], u2, t)) && (delete s[u2], n = true);
      }
    }
    return o$1(a, "deleteHeader"), f$1.isArray(e) ? e.forEach(a) : a(e), n;
  }
  clear(e) {
    const t = Object.keys(this);
    let s = t.length, n = false;
    for (; s--; ) {
      const a = t[s];
      (!e || Bt(this, this[a], a, e, true)) && (delete this[a], n = true);
    }
    return n;
  }
  normalize(e) {
    const t = this, s = {};
    return f$1.forEach(this, (n, a) => {
      const i2 = f$1.findKey(s, a);
      if (i2) {
        t[i2] = qe(n), delete t[a];
        return;
      }
      const u2 = e ? ju(a) : String(a).trim();
      u2 !== a && delete t[a], t[u2] = qe(n), s[u2] = true;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return f$1.forEach(this, (s, n) => {
      s != null && s !== false && (t[n] = e && f$1.isArray(s) ? s.join(", ") : s);
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
    function a(i2) {
      const u2 = Ie(i2);
      s[u2] || (Xu(n, i2), s[u2] = true);
    }
    return o$1(a, "defineAccessor"), f$1.isArray(e) ? e.forEach(a) : a(e), this;
  }
}, o$1(he, "AxiosHeaders"), he);
R$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
f$1.reduceDescriptors(R$1.prototype, ({ value: r }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: /* @__PURE__ */ o$1(() => r, "get"),
    set(s) {
      this[t] = s;
    }
  };
});
f$1.freezeMethods(R$1);
function Mt(r, e) {
  const t = this || Me, s = e || t, n = R$1.from(s.headers);
  let a = s.data;
  return f$1.forEach(r, /* @__PURE__ */ o$1(function(u2) {
    a = u2.call(t, a, n.normalize(), e ? e.status : void 0);
  }, "transform")), n.normalize(), a;
}
o$1(Mt, "transformData");
function ia$1(r) {
  return !!(r && r.__CANCEL__);
}
o$1(ia$1, "isCancel$1");
function we(r, e, t) {
  b.call(this, r == null ? "canceled" : r, b.ERR_CANCELED, e, t), this.name = "CanceledError";
}
o$1(we, "CanceledError$1");
f$1.inherits(we, b, {
  __CANCEL__: true
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
o$1(oa, "settle");
function Yu(r) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return e && e[1] || "";
}
o$1(Yu, "parseProtocol");
function Zu(r, e) {
  r = r || 10;
  const t = new Array(r), s = new Array(r);
  let n = 0, a = 0, i2;
  return e = e !== void 0 ? e : 1e3, /* @__PURE__ */ o$1(function(d2) {
    const h2 = Date.now(), c2 = s[a];
    i2 || (i2 = h2), t[n] = d2, s[n] = h2;
    let p2 = a, g2 = 0;
    for (; p2 !== n; )
      g2 += t[p2++], p2 = p2 % r;
    if (n = (n + 1) % r, n === a && (a = (a + 1) % r), h2 - i2 < e)
      return;
    const y = c2 && h2 - c2;
    return y ? Math.round(g2 * 1e3 / y) : void 0;
  }, "push");
}
o$1(Zu, "speedometer");
function Qu(r, e) {
  let t = 0, s = 1e3 / e, n, a;
  const i2 = /* @__PURE__ */ o$1((h2, c2 = Date.now()) => {
    t = c2, n = null, a && (clearTimeout(a), a = null), r(...h2);
  }, "invoke");
  return [/* @__PURE__ */ o$1((...h2) => {
    const c2 = Date.now(), p2 = c2 - t;
    p2 >= s ? i2(h2, c2) : (n = h2, a || (a = setTimeout(() => {
      a = null, i2(n);
    }, s - p2)));
  }, "throttled"), /* @__PURE__ */ o$1(() => n && i2(n), "flush")];
}
o$1(Qu, "throttle");
const ut = /* @__PURE__ */ o$1((r, e, t = 3) => {
  let s = 0;
  const n = Zu(50, 250);
  return Qu((a) => {
    const i2 = a.loaded, u2 = a.lengthComputable ? a.total : void 0, d2 = i2 - s, h2 = n(d2), c2 = i2 <= u2;
    s = i2;
    const p2 = {
      loaded: i2,
      total: u2,
      progress: u2 ? i2 / u2 : void 0,
      bytes: d2,
      rate: h2 || void 0,
      estimated: h2 && u2 && c2 ? (u2 - i2) / h2 : void 0,
      event: a,
      lengthComputable: u2 != null,
      [e ? "download" : "upload"]: true
    };
    r(p2);
  }, t);
}, "progressEventReducer"), en$1 = /* @__PURE__ */ o$1((r, e) => {
  const t = r != null;
  return [(s) => e[0]({
    lengthComputable: t,
    total: r,
    loaded: s
  }), e[1]];
}, "progressEventDecorator"), tn$1 = /* @__PURE__ */ o$1((r) => (...e) => f$1.asap(() => r(...e)), "asyncDecorator"), el$1 = v.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, e) => (t) => (t = new URL(t, v.origin), r.protocol === t.protocol && r.host === t.host && (e || r.port === t.port)))(
  new URL(v.origin),
  v.navigator && /(msie|trident)/i.test(v.navigator.userAgent)
) : () => true, tl$1 = v.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, e, t, s, n, a) {
      const i2 = [r + "=" + encodeURIComponent(e)];
      f$1.isNumber(t) && i2.push("expires=" + new Date(t).toGMTString()), f$1.isString(s) && i2.push("path=" + s), f$1.isString(n) && i2.push("domain=" + n), a === true && i2.push("secure"), document.cookie = i2.join("; ");
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
function sl$1(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
o$1(sl$1, "isAbsoluteURL");
function rl(r, e) {
  return e ? r.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : r;
}
o$1(rl, "combineURLs");
function ua(r, e, t) {
  let s = !sl$1(e);
  return r && (s || t == false) ? rl(r, e) : e;
}
o$1(ua, "buildFullPath");
const sn$1 = /* @__PURE__ */ o$1((r) => r instanceof R$1 ? G({}, r) : r, "headersToObject");
function oe(r, e) {
  e = e || {};
  const t = {};
  function s(h2, c2, p2, g2) {
    return f$1.isPlainObject(h2) && f$1.isPlainObject(c2) ? f$1.merge.call({ caseless: g2 }, h2, c2) : f$1.isPlainObject(c2) ? f$1.merge({}, c2) : f$1.isArray(c2) ? c2.slice() : c2;
  }
  o$1(s, "getMergedValue");
  function n(h2, c2, p2, g2) {
    if (f$1.isUndefined(c2)) {
      if (!f$1.isUndefined(h2))
        return s(void 0, h2, p2, g2);
    } else return s(h2, c2, p2, g2);
  }
  o$1(n, "mergeDeepProperties");
  function a(h2, c2) {
    if (!f$1.isUndefined(c2))
      return s(void 0, c2);
  }
  o$1(a, "valueFromConfig2");
  function i2(h2, c2) {
    if (f$1.isUndefined(c2)) {
      if (!f$1.isUndefined(h2))
        return s(void 0, h2);
    } else return s(void 0, c2);
  }
  o$1(i2, "defaultToConfig2");
  function u2(h2, c2, p2) {
    if (p2 in e)
      return s(h2, c2);
    if (p2 in r)
      return s(void 0, h2);
  }
  o$1(u2, "mergeDirectKeys");
  const d2 = {
    url: a,
    method: a,
    data: a,
    baseURL: i2,
    transformRequest: i2,
    transformResponse: i2,
    paramsSerializer: i2,
    timeout: i2,
    timeoutMessage: i2,
    withCredentials: i2,
    withXSRFToken: i2,
    adapter: i2,
    responseType: i2,
    xsrfCookieName: i2,
    xsrfHeaderName: i2,
    onUploadProgress: i2,
    onDownloadProgress: i2,
    decompress: i2,
    maxContentLength: i2,
    maxBodyLength: i2,
    beforeRedirect: i2,
    transport: i2,
    httpAgent: i2,
    httpsAgent: i2,
    cancelToken: i2,
    socketPath: i2,
    responseEncoding: i2,
    validateStatus: u2,
    headers: /* @__PURE__ */ o$1((h2, c2, p2) => n(sn$1(h2), sn$1(c2), p2, true), "headers")
  };
  return f$1.forEach(Object.keys(G(G({}, r), e)), /* @__PURE__ */ o$1(function(c2) {
    const p2 = d2[c2] || n, g2 = p2(r[c2], e[c2], c2);
    f$1.isUndefined(g2) && p2 !== u2 || (t[c2] = g2);
  }, "computeConfigValue")), t;
}
o$1(oe, "mergeConfig$1");
const la$1 = /* @__PURE__ */ o$1((r) => {
  const e = oe({}, r);
  let { data: t, withXSRFToken: s, xsrfHeaderName: n, xsrfCookieName: a, headers: i2, auth: u2 } = e;
  e.headers = i2 = R$1.from(i2), e.url = ra(ua(e.baseURL, e.url, e.allowAbsoluteUrls), r.params, r.paramsSerializer), u2 && i2.set(
    "Authorization",
    "Basic " + btoa((u2.username || "") + ":" + (u2.password ? unescape(encodeURIComponent(u2.password)) : ""))
  );
  let d2;
  if (f$1.isFormData(t)) {
    if (v.hasStandardBrowserEnv || v.hasStandardBrowserWebWorkerEnv)
      i2.setContentType(void 0);
    else if ((d2 = i2.getContentType()) !== false) {
      const [h2, ...c2] = d2 ? d2.split(";").map((p2) => p2.trim()).filter(Boolean) : [];
      i2.setContentType([h2 || "multipart/form-data", ...c2].join("; "));
    }
  }
  if (v.hasStandardBrowserEnv && (s && f$1.isFunction(s) && (s = s(e)), s || s !== false && el$1(e.url))) {
    const h2 = n && a && tl$1.read(a);
    h2 && i2.set(n, h2);
  }
  return e;
}, "resolveConfig"), nl$1 = typeof XMLHttpRequest != "undefined", al = nl$1 && function(r) {
  return new Promise(/* @__PURE__ */ o$1(function(t, s) {
    const n = la$1(r);
    let a = n.data;
    const i2 = R$1.from(n.headers).normalize();
    let { responseType: u2, onUploadProgress: d2, onDownloadProgress: h2 } = n, c2, p2, g2, y, m2;
    function I2() {
      y && y(), m2 && m2(), n.cancelToken && n.cancelToken.unsubscribe(c2), n.signal && n.signal.removeEventListener("abort", c2);
    }
    o$1(I2, "done");
    let E2 = new XMLHttpRequest();
    E2.open(n.method.toUpperCase(), n.url, true), E2.timeout = n.timeout;
    function C() {
      if (!E2)
        return;
      const T = R$1.from(
        "getAllResponseHeaders" in E2 && E2.getAllResponseHeaders()
      ), N = {
        data: !u2 || u2 === "text" || u2 === "json" ? E2.responseText : E2.response,
        status: E2.status,
        statusText: E2.statusText,
        headers: T,
        config: r,
        request: E2
      };
      oa(/* @__PURE__ */ o$1(function(K) {
        t(K), I2();
      }, "_resolve"), /* @__PURE__ */ o$1(function(K) {
        s(K), I2();
      }, "_reject"), N), E2 = null;
    }
    o$1(C, "onloadend"), "onloadend" in E2 ? E2.onloadend = C : E2.onreadystatechange = /* @__PURE__ */ o$1(function() {
      !E2 || E2.readyState !== 4 || E2.status === 0 && !(E2.responseURL && E2.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, "handleLoad"), E2.onabort = /* @__PURE__ */ o$1(function() {
      E2 && (s(new b("Request aborted", b.ECONNABORTED, r, E2)), E2 = null);
    }, "handleAbort"), E2.onerror = /* @__PURE__ */ o$1(function() {
      s(new b("Network Error", b.ERR_NETWORK, r, E2)), E2 = null;
    }, "handleError"), E2.ontimeout = /* @__PURE__ */ o$1(function() {
      let z = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
      const N = n.transitional || na$1;
      n.timeoutErrorMessage && (z = n.timeoutErrorMessage), s(new b(
        z,
        N.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
        r,
        E2
      )), E2 = null;
    }, "handleTimeout"), a === void 0 && i2.setContentType(null), "setRequestHeader" in E2 && f$1.forEach(i2.toJSON(), /* @__PURE__ */ o$1(function(z, N) {
      E2.setRequestHeader(N, z);
    }, "setRequestHeader")), f$1.isUndefined(n.withCredentials) || (E2.withCredentials = !!n.withCredentials), u2 && u2 !== "json" && (E2.responseType = n.responseType), h2 && ([g2, m2] = ut(h2, true), E2.addEventListener("progress", g2)), d2 && E2.upload && ([p2, y] = ut(d2), E2.upload.addEventListener("progress", p2), E2.upload.addEventListener("loadend", y)), (n.cancelToken || n.signal) && (c2 = /* @__PURE__ */ o$1((T) => {
      E2 && (s(!T || T.type ? new we(null, r, E2) : T), E2.abort(), E2 = null);
    }, "onCanceled"), n.cancelToken && n.cancelToken.subscribe(c2), n.signal && (n.signal.aborted ? c2() : n.signal.addEventListener("abort", c2)));
    const D2 = Yu(n.url);
    if (D2 && v.protocols.indexOf(D2) === -1) {
      s(new b("Unsupported protocol " + D2 + ":", b.ERR_BAD_REQUEST, r));
      return;
    }
    E2.send(a || null);
  }, "dispatchXhrRequest"));
}, il = /* @__PURE__ */ o$1((r, e) => {
  const { length: t } = r = r ? r.filter(Boolean) : [];
  if (e || t) {
    let s = new AbortController(), n;
    const a = /* @__PURE__ */ o$1(function(h2) {
      if (!n) {
        n = true, u2();
        const c2 = h2 instanceof Error ? h2 : this.reason;
        s.abort(c2 instanceof b ? c2 : new we(c2 instanceof Error ? c2.message : c2));
      }
    }, "onabort");
    let i2 = e && setTimeout(() => {
      i2 = null, a(new b(`timeout ${e} of ms exceeded`, b.ETIMEDOUT));
    }, e);
    const u2 = /* @__PURE__ */ o$1(() => {
      r && (i2 && clearTimeout(i2), i2 = null, r.forEach((h2) => {
        h2.unsubscribe ? h2.unsubscribe(a) : h2.removeEventListener("abort", a);
      }), r = null);
    }, "unsubscribe");
    r.forEach((h2) => h2.addEventListener("abort", a));
    const { signal: d2 } = s;
    return d2.unsubscribe = () => f$1.asap(u2), d2;
  }
}, "composeSignals"), ol = /* @__PURE__ */ o$1(function* (r, e) {
  let t = r.byteLength;
  if (t < e) {
    yield r;
    return;
  }
  let s = 0, n;
  for (; s < t; )
    n = s + e, yield r.slice(s, n), s = n;
}, "streamChunk"), ul = /* @__PURE__ */ o$1(function(r, e) {
  return Pt(this, null, function* () {
    try {
      for (var t = Ar(ll(r)), s, n, a; s = !(n = yield new j(t.next())).done; s = false) {
        const i2 = n.value;
        yield* Vt(ol(i2, e));
      }
    } catch (n2) {
      a = [n2];
    } finally {
      try {
        s && (n = t.return) && (yield new j(n.call(t)));
      } finally {
        if (a)
          throw a[0];
      }
    }
  });
}, "readBytes"), ll = /* @__PURE__ */ o$1(function(r) {
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
}, "readStream"), rn$1 = /* @__PURE__ */ o$1((r, e, t, s) => {
  const n = ul(r, e);
  let a = 0, i2, u2 = /* @__PURE__ */ o$1((h2) => {
    i2 || (i2 = true, s && s(h2));
  }, "_onFinish");
  return new ReadableStream({
    pull(h2) {
      return L(this, null, function* () {
        try {
          const { done: c2, value: p2 } = yield n.next();
          if (c2) {
            u2(), h2.close();
            return;
          }
          let g2 = p2.byteLength;
          if (t) {
            let y = a += g2;
            t(y);
          }
          h2.enqueue(new Uint8Array(p2));
        } catch (c2) {
          throw u2(c2), c2;
        }
      });
    },
    cancel(h2) {
      return u2(h2), n.return();
    }
  }, {
    highWaterMark: 2
  });
}, "trackStream"), Rt = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ca$1 = Rt && typeof ReadableStream == "function", cl = Rt && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (e) => r.encode(e))(new TextEncoder()) : (r) => L(null, null, function* () {
  return new Uint8Array(yield new Response(r).arrayBuffer());
})), ha$1 = /* @__PURE__ */ o$1((r, ...e) => {
  try {
    return !!r(...e);
  } catch (t) {
    return false;
  }
}, "test"), hl = ca$1 && ha$1(() => {
  let r = false;
  const e = new Request(v.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = true, "half";
    }
  }).headers.has("Content-Type");
  return r && !e;
}), nn = 64 * 1024, rs = ca$1 && ha$1(() => f$1.isReadableStream(new Response("").body)), lt$1 = {
  stream: rs && ((r) => r.body)
};
Rt && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !lt$1[e] && (lt$1[e] = f$1.isFunction(r[e]) ? (t) => t[e]() : (t, s) => {
      throw new b(`Response type '${e}' is not supported`, b.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const fl = /* @__PURE__ */ o$1((r) => L(null, null, function* () {
  if (r == null)
    return 0;
  if (f$1.isBlob(r))
    return r.size;
  if (f$1.isSpecCompliantForm(r))
    return (yield new Request(v.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (f$1.isArrayBufferView(r) || f$1.isArrayBuffer(r))
    return r.byteLength;
  if (f$1.isURLSearchParams(r) && (r = r + ""), f$1.isString(r))
    return (yield cl(r)).byteLength;
}), "getBodyLength"), dl = /* @__PURE__ */ o$1((r, e) => L(null, null, function* () {
  const t = f$1.toFiniteNumber(r.getContentLength());
  return t == null ? fl(e) : t;
}), "resolveBodyLength"), pl$1 = Rt && ((r) => L(null, null, function* () {
  let {
    url: e,
    method: t,
    data: s,
    signal: n,
    cancelToken: a,
    timeout: i2,
    onDownloadProgress: u2,
    onUploadProgress: d2,
    responseType: h2,
    headers: c2,
    withCredentials: p2 = "same-origin",
    fetchOptions: g2
  } = la$1(r);
  h2 = h2 ? (h2 + "").toLowerCase() : "text";
  let y = il([n, a && a.toAbortSignal()], i2), m2;
  const I2 = y && y.unsubscribe && (() => {
    y.unsubscribe();
  });
  let E2;
  try {
    if (d2 && hl && t !== "get" && t !== "head" && (E2 = yield dl(c2, s)) !== 0) {
      let N = new Request(e, {
        method: "POST",
        body: s,
        duplex: "half"
      }), H;
      if (f$1.isFormData(s) && (H = N.headers.get("content-type")) && c2.setContentType(H), N.body) {
        const [K, ke] = en$1(
          E2,
          ut(tn$1(d2))
        );
        s = rn$1(N.body, nn, K, ke);
      }
    }
    f$1.isString(p2) || (p2 = p2 ? "include" : "omit");
    const C = "credentials" in Request.prototype;
    m2 = new Request(e, Sr(G({}, g2), {
      signal: y,
      method: t.toUpperCase(),
      headers: c2.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: C ? p2 : void 0
    }));
    let D2 = yield fetch(m2, g2);
    const T = rs && (h2 === "stream" || h2 === "response");
    if (rs && (u2 || T && I2)) {
      const N = {};
      ["status", "statusText", "headers"].forEach((Er) => {
        N[Er] = D2[Er];
      });
      const H = f$1.toFiniteNumber(D2.headers.get("content-length")), [K, ke] = u2 && en$1(
        H,
        ut(tn$1(u2), true)
      ) || [];
      D2 = new Response(
        rn$1(D2.body, nn, K, () => {
          ke && ke(), I2 && I2();
        }),
        N
      );
    }
    h2 = h2 || "text";
    let z = yield lt$1[f$1.findKey(lt$1, h2) || "text"](D2, r);
    return !T && I2 && I2(), yield new Promise((N, H) => {
      oa(N, H, {
        data: z,
        headers: R$1.from(D2.headers),
        status: D2.status,
        statusText: D2.statusText,
        config: r,
        request: m2
      });
    });
  } catch (C) {
    throw I2 && I2(), C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message) ? Object.assign(
      new b("Network Error", b.ERR_NETWORK, r, m2),
      {
        cause: C.cause || C
      }
    ) : b.from(C, C && C.code, r, m2);
  }
})), ns = {
  http: vu,
  xhr: al,
  fetch: pl$1
};
f$1.forEach(ns, (r, e) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: e });
    } catch (t) {
    }
    Object.defineProperty(r, "adapterName", { value: e });
  }
});
const an = /* @__PURE__ */ o$1((r) => `- ${r}`, "renderReason"), gl$1 = /* @__PURE__ */ o$1((r) => f$1.isFunction(r) || r === null || r === false, "isResolvedHandle"), fa$1 = {
  getAdapter: /* @__PURE__ */ o$1((r) => {
    r = f$1.isArray(r) ? r : [r];
    const { length: e } = r;
    let t, s;
    const n = {};
    for (let a = 0; a < e; a++) {
      t = r[a];
      let i2;
      if (s = t, !gl$1(t) && (s = ns[(i2 = String(t)).toLowerCase()], s === void 0))
        throw new b(`Unknown adapter '${i2}'`);
      if (s)
        break;
      n[i2 || "#" + a] = s;
    }
    if (!s) {
      const a = Object.entries(n).map(
        ([u2, d2]) => `adapter ${u2} ` + (d2 === false ? "is not supported by the environment" : "is not available in the build")
      );
      let i2 = e ? a.length > 1 ? `since :
` + a.map(an).join(`
`) : " " + an(a[0]) : "as no adapter specified";
      throw new b(
        "There is no suitable adapter to dispatch the request " + i2,
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
o$1(kt, "throwIfCancellationRequested");
function on(r) {
  return kt(r), r.headers = R$1.from(r.headers), r.data = Mt.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", false), fa$1.getAdapter(r.adapter || Me.adapter)(r).then(/* @__PURE__ */ o$1(function(s) {
    return kt(r), s.data = Mt.call(
      r,
      r.transformResponse,
      s
    ), s.headers = R$1.from(s.headers), s;
  }, "onAdapterResolution"), /* @__PURE__ */ o$1(function(s) {
    return ia$1(s) || (kt(r), s && s.response && (s.response.data = Mt.call(
      r,
      r.transformResponse,
      s.response
    ), s.response.headers = R$1.from(s.response.headers))), Promise.reject(s);
  }, "onAdapterRejection"));
}
o$1(on, "dispatchRequest");
const da$1 = "1.11.0", Lt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, e) => {
  Lt[r] = /* @__PURE__ */ o$1(function(s) {
    return typeof s === r || "a" + (e < 1 ? "n " : " ") + r;
  }, "validator");
});
const un = {};
Lt.transitional = /* @__PURE__ */ o$1(function(e, t, s) {
  function n(a, i2) {
    return "[Axios v" + da$1 + "] Transitional option '" + a + "'" + i2 + (s ? ". " + s : "");
  }
  return o$1(n, "formatMessage"), (a, i2, u2) => {
    if (e === false)
      throw new b(
        n(i2, " has been removed" + (t ? " in " + t : "")),
        b.ERR_DEPRECATED
      );
    return t && !un[i2] && (un[i2] = true, console.warn(
      n(
        i2,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(a, i2, u2) : true;
  };
}, "transitional");
Lt.spelling = /* @__PURE__ */ o$1(function(e) {
  return (t, s) => (console.warn(`${s} is likely a misspelling of ${e}`), true);
}, "spelling");
function ml$1(r, e, t) {
  if (typeof r != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(r);
  let n = s.length;
  for (; n-- > 0; ) {
    const a = s[n], i2 = e[a];
    if (i2) {
      const u2 = r[a], d2 = u2 === void 0 || i2(u2, a, r);
      if (d2 !== true)
        throw new b("option " + a + " must be " + d2, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== true)
      throw new b("Unknown option " + a, b.ERR_BAD_OPTION);
  }
}
o$1(ml$1, "assertOptions");
const We = {
  assertOptions: ml$1,
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
          } catch (i2) {
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
    }, false), n != null && (f$1.isFunction(n) ? t.paramsSerializer = {
      serialize: n
    } : We.assertOptions(n, {
      encode: B.function,
      serialize: B.function
    }, true)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = true), We.assertOptions(t, {
      baseUrl: B.spelling("baseURL"),
      withXsrfToken: B.spelling("withXSRFToken")
    }, true), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let i2 = a && f$1.merge(
      a.common,
      a[t.method]
    );
    a && f$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m2) => {
        delete a[m2];
      }
    ), t.headers = R$1.concat(i2, a);
    const u2 = [];
    let d2 = true;
    this.interceptors.request.forEach(/* @__PURE__ */ o$1(function(I2) {
      typeof I2.runWhen == "function" && I2.runWhen(t) === false || (d2 = d2 && I2.synchronous, u2.unshift(I2.fulfilled, I2.rejected));
    }, "unshiftRequestInterceptors"));
    const h2 = [];
    this.interceptors.response.forEach(/* @__PURE__ */ o$1(function(I2) {
      h2.push(I2.fulfilled, I2.rejected);
    }, "pushResponseInterceptors"));
    let c2, p2 = 0, g2;
    if (!d2) {
      const m2 = [on.bind(this), void 0];
      for (m2.unshift(...u2), m2.push(...h2), g2 = m2.length, c2 = Promise.resolve(t); p2 < g2; )
        c2 = c2.then(m2[p2++], m2[p2++]);
      return c2;
    }
    g2 = u2.length;
    let y = t;
    for (p2 = 0; p2 < g2; ) {
      const m2 = u2[p2++], I2 = u2[p2++];
      try {
        y = m2(y);
      } catch (E2) {
        I2.call(this, E2);
        break;
      }
    }
    try {
      c2 = on.call(this, y);
    } catch (m2) {
      return Promise.reject(m2);
    }
    for (p2 = 0, g2 = h2.length; p2 < g2; )
      c2 = c2.then(h2[p2++], h2[p2++]);
    return c2;
  }
  getUri(e) {
    e = oe(this.defaults, e);
    const t = ua(e.baseURL, e.url, e.allowAbsoluteUrls);
    return ra(t, e.params, e.paramsSerializer);
  }
}, o$1(fe, "Axios"), fe);
f$1.forEach(["delete", "get", "head", "options"], /* @__PURE__ */ o$1(function(e) {
  se.prototype[e] = function(t, s) {
    return this.request(oe(s || {}, {
      method: e,
      url: t,
      data: (s || {}).data
    }));
  };
}, "forEachMethodNoData"));
f$1.forEach(["post", "put", "patch"], /* @__PURE__ */ o$1(function(e) {
  function t(s) {
    return /* @__PURE__ */ o$1(function(a, i2, u2) {
      return this.request(oe(u2 || {}, {
        method: e,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i2
      }));
    }, "httpMethod");
  }
  o$1(t, "generateHTTPMethod"), se.prototype[e] = t(), se.prototype[e + "Form"] = t(true);
}, "forEachMethodWithData"));
var re$1;
let yl = (re$1 = class {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(/* @__PURE__ */ o$1(function(a) {
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
      const i2 = new Promise((u2) => {
        s.subscribe(u2), a = u2;
      }).then(n);
      return i2.cancel = /* @__PURE__ */ o$1(function() {
        s.unsubscribe(a);
      }, "reject"), i2;
    }, e(/* @__PURE__ */ o$1(function(a, i2, u2) {
      s.reason || (s.reason = new we(a, i2, u2), t(s.reason));
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
    const e = new AbortController(), t = /* @__PURE__ */ o$1((s) => {
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
      token: new re$1(/* @__PURE__ */ o$1(function(n) {
        e = n;
      }, "executor")),
      cancel: e
    };
  }
}, o$1(re$1, "CancelToken"), re$1);
function El(r) {
  return /* @__PURE__ */ o$1(function(t) {
    return r.apply(null, t);
  }, "wrap");
}
o$1(El, "spread$1");
function wl(r) {
  return f$1.isObject(r) && r.isAxiosError === true;
}
o$1(wl, "isAxiosError$1");
const as$1 = {
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
Object.entries(as$1).forEach(([r, e]) => {
  as$1[e] = r;
});
function pa$1(r) {
  const e = new se(r), t = Hn(se.prototype.request, e);
  return f$1.extend(t, se.prototype, e, { allOwnKeys: true }), f$1.extend(t, e, null, { allOwnKeys: true }), t.create = /* @__PURE__ */ o$1(function(n) {
    return pa$1(oe(r, n));
  }, "create"), t;
}
o$1(pa$1, "createInstance");
const F = pa$1(Me);
F.Axios = se;
F.CanceledError = we;
F.CancelToken = yl;
F.isCancel = ia$1;
F.VERSION = da$1;
F.toFormData = xt;
F.AxiosError = b;
F.Cancel = F.CanceledError;
F.all = /* @__PURE__ */ o$1(function(e) {
  return Promise.all(e);
}, "all");
F.spread = El;
F.isAxiosError = wl;
F.mergeConfig = oe;
F.AxiosHeaders = R$1;
F.formToJSON = (r) => aa$1(f$1.isHTMLForm(r) ? new FormData(r) : r);
F.getAdapter = fa$1.getAdapter;
F.HttpStatusCode = as$1;
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
} = F, pr = class pr2 extends me {
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
o$1(pr, "RemoteAuthStorageArea");
const gr = class gr2 extends me {
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
o$1(gr, "TempStorageArea");
const mr$1 = class mr {
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
o$1(mr$1, "Resource");
let is$1 = mr$1;
const It = class It2 {
  /**
   * Created from DTS API Json
   *
   * @param {number} totalItems - amount of items in a collection
   * @param {string} title
   * @param {string} id
   * @param {string} baseUrl - baseURL for DTS API
   * @param {string} description
   */
  constructor({ totalItems: e, title: t, id: s, baseUrl: n, description: a, pagination: i2 } = {}) {
    this.totalItems = e, this.title = t, this.id = s, this.baseUrl = n, this.description = a, this.members = [], this.resources = [], i2 && (this.pagination = this.definePagination(i2));
  }
  /**
   * Adds level - membered collection or resource
   *
   * @param {JSON Object} jsonObj  - described in Collection/Resource constructors
   */
  addMember(e) {
    e.type === "Collection" && this.members.push(new It2(e)), e.type === "Resource" && this.resources.push(new is$1(e));
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
o$1(It, "Collection");
let hn = It;
const bt = class bt2 {
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
    return new bt2(this.tabId, this.windowId);
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
o$1(bt, "Tab");
let ct = bt;
const yr = class yr2 {
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
    return false;
  }
  /**
   * Check if the state of the panel is closed
   * @return {boolean} true if closed false if open
   */
  isPanelClosed() {
    return false;
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
    return false;
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
o$1(yr, "UIStateAPI");
let os = yr;
const w$1 = class w extends os {
  constructor(e) {
    super(), this.tabID = e ? e.uniqueId : void 0, this.tabObj = e, this.status = void 0, this.panelStatus = void 0, this.tab = void 0, this.embedLibStatus = void 0, this.uiActive = false, this.watchers = /* @__PURE__ */ new Map();
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
    return this.setItem(w.props.uiActive.name, true), this;
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
o$1(w$1, "TabScript");
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
    arguments[i2] && forEach(arguments[i2], assignValue);
  }
  return result;
}
const extend = (a, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i2) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i2] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i2 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i2] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data: data2 }) => {
      if (source === _global && data2 === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
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
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
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
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el2, index) {
          !(utils$1.isUndefined(el2) || el2 === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el2)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el2, key) {
      const result = !(utils$1.isUndefined(el2) || el2 === null) && visitor.call(
        formData,
        el2,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el2, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}
class InterceptorManager {
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
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
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
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data2, options) {
  return toFormData$1(data2, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len = keys.length;
  let key;
  for (i2 = 0; i2 < len; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data2, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data2);
    if (isObjectPayload && utils$1.isHTMLForm(data2)) {
      data2 = new FormData(data2);
    }
    const isFormData2 = utils$1.isFormData(data2);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data2)) : data2;
    }
    if (utils$1.isArrayBuffer(data2) || utils$1.isBuffer(data2) || utils$1.isStream(data2) || utils$1.isFile(data2) || utils$1.isBlob(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (utils$1.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$1.isURLSearchParams(data2)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data2.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data2, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data2 } : data2,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils$1.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
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
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
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
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w3, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data2 = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data2 = fn.call(config, data2, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data2;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data2 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data2);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url2) => {
  url2 = new URL(url2, platform.origin);
  return origin2.protocol === url2.protocol && origin2.host === url2.host && (isMSIE || origin2.port === url2.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
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
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$2(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b2, prop, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a, b2, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b2, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b2), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$2({}, config);
  let { data: data2, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data2)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_2, config) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url: url2,
    method,
    data: data2,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions: fetchOptions2
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data2)) !== 0) {
      let _request = new Request(url2, {
        method: "POST",
        body: data2,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data2) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data2 = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url2, {
      ...fetchOptions2,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data2,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request, fetchOptions2);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i2 = 0; i2 < length; i2++) {
      nameOrAdapter = adapters2[i2];
      let id2;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id2 = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id2}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id2 || "#" + i2] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id2, state]) => `adapter ${id2} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.11.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
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
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$2(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i2 < len) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i2 = 0;
    while (i2 < len) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i2 = 0;
    len = responseInterceptorChain.length;
    while (i2 < len) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$2(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url2, config) {
    return this.request(mergeConfig$2(config || {}, {
      method,
      url: url2,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data2, config) {
      return this.request(mergeConfig$2(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: url2,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
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
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig$2(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$2;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig: mergeConfig$1
} = axios;
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d22, b22) {
    d22.__proto__ = b22;
  } || function(d22, b22) {
    for (var p2 in b22) if (Object.prototype.hasOwnProperty.call(b22, p2)) d22[p2] = b22[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p2 in s) if (Object.prototype.hasOwnProperty.call(s, p2)) t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p2 in s) if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
    t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s); i2 < p2.length; i2++) {
      if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i2]))
        t[p2[i2]] = s[p2[i2]];
    }
  return t;
}
function __spreadArray(to2, from, pack) {
  if (arguments.length === 2) for (var i2 = 0, l2 = from.length, ar3; i2 < l2; i2++) {
    if (ar3 || !(i2 in from)) {
      if (!ar3) ar3 = Array.prototype.slice.call(from, 0, i2);
      ar3[i2] = from[i2];
    }
  }
  return to2.concat(ar3 || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function memoize(fn, options) {
  var cache = options && options.cache ? options.cache : cacheDefault;
  var serializer = options && options.serializer ? options.serializer : serializerDefault;
  var strategy = options && options.strategy ? options.strategy : strategyDefault;
  return strategy(fn, {
    cache,
    serializer
  });
}
function isPrimitive(value) {
  return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
  var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.call(this, arg);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function variadic(fn, cache, serializer) {
  var args = Array.prototype.slice.call(arguments, 3);
  var cacheKey = serializer(args);
  var computedValue = cache.get(cacheKey);
  if (typeof computedValue === "undefined") {
    computedValue = fn.apply(this, args);
    cache.set(cacheKey, computedValue);
  }
  return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
  return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
  var strategy = fn.length === 1 ? monadic : variadic;
  return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
  return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
var serializerDefault = function() {
  return JSON.stringify(arguments);
};
var ObjectWithoutPrototypeCache = (
  /** @class */
  (function() {
    function ObjectWithoutPrototypeCache2() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    ObjectWithoutPrototypeCache2.prototype.get = function(key) {
      return this.cache[key];
    };
    ObjectWithoutPrototypeCache2.prototype.set = function(key, value) {
      this.cache[key] = value;
    };
    return ObjectWithoutPrototypeCache2;
  })()
);
var cacheDefault = {
  create: function create() {
    return new ObjectWithoutPrototypeCache();
  }
};
var strategies = {
  variadic: strategyVariadic
};
var ErrorKind;
(function(ErrorKind2) {
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
  ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
  ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
  ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
  ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
  ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
  ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
  ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
  ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
  ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
  ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
  ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
})(ErrorKind || (ErrorKind = {}));
var TYPE;
(function(TYPE2) {
  TYPE2[TYPE2["literal"] = 0] = "literal";
  TYPE2[TYPE2["argument"] = 1] = "argument";
  TYPE2[TYPE2["number"] = 2] = "number";
  TYPE2[TYPE2["date"] = 3] = "date";
  TYPE2[TYPE2["time"] = 4] = "time";
  TYPE2[TYPE2["select"] = 5] = "select";
  TYPE2[TYPE2["plural"] = 6] = "plural";
  TYPE2[TYPE2["pound"] = 7] = "pound";
  TYPE2[TYPE2["tag"] = 8] = "tag";
})(TYPE || (TYPE = {}));
var SKELETON_TYPE;
(function(SKELETON_TYPE2) {
  SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
  SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
})(SKELETON_TYPE || (SKELETON_TYPE = {}));
function isLiteralElement(el2) {
  return el2.type === TYPE.literal;
}
function isArgumentElement(el2) {
  return el2.type === TYPE.argument;
}
function isNumberElement(el2) {
  return el2.type === TYPE.number;
}
function isDateElement(el2) {
  return el2.type === TYPE.date;
}
function isTimeElement(el2) {
  return el2.type === TYPE.time;
}
function isSelectElement(el2) {
  return el2.type === TYPE.select;
}
function isPluralElement(el2) {
  return el2.type === TYPE.plural;
}
function isPoundElement(el2) {
  return el2.type === TYPE.pound;
}
function isTagElement(el2) {
  return el2.type === TYPE.tag;
}
function isNumberSkeleton(el2) {
  return !!(el2 && typeof el2 === "object" && el2.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el2) {
  return !!(el2 && typeof el2 === "object" && el2.type === SKELETON_TYPE.dateTime);
}
var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
  var result = {};
  skeleton.replace(DATE_TIME_REGEX, function(match) {
    var len = match.length;
    switch (match[0]) {
      // Era
      case "G":
        result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        result.year = len === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      // Quarter
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      // Month
      case "M":
      case "L":
        result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        result.day = ["numeric", "2-digit"][len - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
        break;
      case "e":
        if (len < 4) {
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      case "c":
        if (len < 4) {
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        }
        result.weekday = ["short", "long", "narrow", "short"][len - 4];
        break;
      // Period
      case "a":
        result.hour12 = true;
        break;
      case "b":
      // am, pm, noon, midnight
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      // Hour
      case "h":
        result.hourCycle = "h12";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "H":
        result.hourCycle = "h23";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "K":
        result.hourCycle = "h11";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "k":
        result.hourCycle = "h24";
        result.hour = ["numeric", "2-digit"][len - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        result.minute = ["numeric", "2-digit"][len - 1];
        break;
      // Second
      case "s":
        result.second = ["numeric", "2-digit"][len - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        result.timeZoneName = len < 4 ? "short" : "long";
        break;
      case "Z":
      // 1..3, 4, 5: The ISO8601 varios formats
      case "O":
      // 1, 4: milliseconds in day short, long
      case "v":
      // 1, 4: generic non-location format
      case "V":
      // 1, 2, 3, 4: time zone ID or city
      case "X":
      // 1, 2, 3, 4: The ISO8601 varios formats
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  });
  return result;
}
var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function parseNumberSkeletonFromString(skeleton) {
  if (skeleton.length === 0) {
    throw new Error("Number skeleton cannot be empty");
  }
  var stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter(function(x2) {
    return x2.length > 0;
  });
  var tokens = [];
  for (var _i2 = 0, stringTokens_1 = stringTokens; _i2 < stringTokens_1.length; _i2++) {
    var stringToken = stringTokens_1[_i2];
    var stemAndOptions = stringToken.split("/");
    if (stemAndOptions.length === 0) {
      throw new Error("Invalid number skeleton");
    }
    var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
    for (var _a2 = 0, options_1 = options; _a2 < options_1.length; _a2++) {
      var option = options_1[_a2];
      if (option.length === 0) {
        throw new Error("Invalid number skeleton");
      }
    }
    tokens.push({ stem, options });
  }
  return tokens;
}
function icuUnitToEcma(unit) {
  return unit.replace(/^(.*?)-/, "");
}
var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
  var result = {};
  if (str[str.length - 1] === "r") {
    result.roundingPriority = "morePrecision";
  } else if (str[str.length - 1] === "s") {
    result.roundingPriority = "lessPrecision";
  }
  str.replace(SIGNIFICANT_PRECISION_REGEX, function(_2, g1, g2) {
    if (typeof g2 !== "string") {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length;
    } else if (g2 === "+") {
      result.minimumSignificantDigits = g1.length;
    } else if (g1[0] === "#") {
      result.maximumSignificantDigits = g1.length;
    } else {
      result.minimumSignificantDigits = g1.length;
      result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
    }
    return "";
  });
  return result;
}
function parseSign(str) {
  switch (str) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function parseConciseScientificAndEngineeringStem(stem) {
  var result;
  if (stem[0] === "E" && stem[1] === "E") {
    result = {
      notation: "engineering"
    };
    stem = stem.slice(2);
  } else if (stem[0] === "E") {
    result = {
      notation: "scientific"
    };
    stem = stem.slice(1);
  }
  if (result) {
    var signDisplay = stem.slice(0, 2);
    if (signDisplay === "+!") {
      result.signDisplay = "always";
      stem = stem.slice(2);
    } else if (signDisplay === "+?") {
      result.signDisplay = "exceptZero";
      stem = stem.slice(2);
    }
    if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
      throw new Error("Malformed concise eng/scientific notation");
    }
    result.minimumIntegerDigits = stem.length;
  }
  return result;
}
function parseNotationOptions(opt) {
  var result = {};
  var signOpts = parseSign(opt);
  if (signOpts) {
    return signOpts;
  }
  return result;
}
function parseNumberSkeleton(tokens) {
  var result = {};
  for (var _i2 = 0, tokens_1 = tokens; _i2 < tokens_1.length; _i2++) {
    var token = tokens_1[_i2];
    switch (token.stem) {
      case "percent":
      case "%":
        result.style = "percent";
        continue;
      case "%x100":
        result.style = "percent";
        result.scale = 100;
        continue;
      case "currency":
        result.style = "currency";
        result.currency = token.options[0];
        continue;
      case "group-off":
      case ",_":
        result.useGrouping = false;
        continue;
      case "precision-integer":
      case ".":
        result.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        result.style = "unit";
        result.unit = icuUnitToEcma(token.options[0]);
        continue;
      case "compact-short":
      case "K":
        result.notation = "compact";
        result.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        result.notation = "compact";
        result.compactDisplay = "long";
        continue;
      case "scientific":
        result = __assign(__assign(__assign({}, result), { notation: "scientific" }), token.options.reduce(function(all3, opt2) {
          return __assign(__assign({}, all3), parseNotationOptions(opt2));
        }, {}));
        continue;
      case "engineering":
        result = __assign(__assign(__assign({}, result), { notation: "engineering" }), token.options.reduce(function(all3, opt2) {
          return __assign(__assign({}, all3), parseNotationOptions(opt2));
        }, {}));
        continue;
      case "notation-simple":
        result.notation = "standard";
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
      case "unit-width-narrow":
        result.currencyDisplay = "narrowSymbol";
        result.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        result.currencyDisplay = "code";
        result.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        result.currencyDisplay = "name";
        result.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        result.currencyDisplay = "symbol";
        continue;
      case "scale":
        result.scale = parseFloat(token.options[0]);
        continue;
      case "rounding-mode-floor":
        result.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        result.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        result.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        result.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        result.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        result.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        result.roundingMode = "halfExpand";
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
      case "integer-width":
        if (token.options.length > 1) {
          throw new RangeError("integer-width stems only accept a single optional option");
        }
        token.options[0].replace(INTEGER_WIDTH_REGEX, function(_2, g1, g2, g3, g4, g5) {
          if (g1) {
            result.minimumIntegerDigits = g2.length;
          } else if (g3 && g4) {
            throw new Error("We currently do not support maximum integer digits");
          } else if (g5) {
            throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
      result.minimumIntegerDigits = token.stem.length;
      continue;
    }
    if (FRACTION_PRECISION_REGEX.test(token.stem)) {
      if (token.options.length > 1) {
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      }
      token.stem.replace(FRACTION_PRECISION_REGEX, function(_2, g1, g2, g3, g4, g5) {
        if (g2 === "*") {
          result.minimumFractionDigits = g1.length;
        } else if (g3 && g3[0] === "#") {
          result.maximumFractionDigits = g3.length;
        } else if (g4 && g5) {
          result.minimumFractionDigits = g4.length;
          result.maximumFractionDigits = g4.length + g5.length;
        } else {
          result.minimumFractionDigits = g1.length;
          result.maximumFractionDigits = g1.length;
        }
        return "";
      });
      var opt = token.options[0];
      if (opt === "w") {
        result = __assign(__assign({}, result), { trailingZeroDisplay: "stripIfInteger" });
      } else if (opt) {
        result = __assign(__assign({}, result), parseSignificantPrecision(opt));
      }
      continue;
    }
    if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
      result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
      continue;
    }
    var signOpts = parseSign(token.stem);
    if (signOpts) {
      result = __assign(__assign({}, result), signOpts);
    }
    var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
    if (conciseScientificAndEngineeringOpts) {
      result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
    }
  }
  return result;
}
var timeData = {
  "001": [
    "H",
    "h"
  ],
  "419": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "AC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "AD": [
    "H",
    "hB"
  ],
  "AE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "AF": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "AG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "AI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "AL": [
    "h",
    "H",
    "hB"
  ],
  "AM": [
    "H",
    "hB"
  ],
  "AO": [
    "H",
    "hB"
  ],
  "AR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "AS": [
    "h",
    "H"
  ],
  "AT": [
    "H",
    "hB"
  ],
  "AU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "AW": [
    "H",
    "hB"
  ],
  "AX": [
    "H"
  ],
  "AZ": [
    "H",
    "hB",
    "h"
  ],
  "BA": [
    "H",
    "hB",
    "h"
  ],
  "BB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BD": [
    "h",
    "hB",
    "H"
  ],
  "BE": [
    "H",
    "hB"
  ],
  "BF": [
    "H",
    "hB"
  ],
  "BG": [
    "H",
    "hB",
    "h"
  ],
  "BH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "BI": [
    "H",
    "h"
  ],
  "BJ": [
    "H",
    "hB"
  ],
  "BL": [
    "H",
    "hB"
  ],
  "BM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BN": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "BO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "BQ": [
    "H"
  ],
  "BR": [
    "H",
    "hB"
  ],
  "BS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "BT": [
    "h",
    "H"
  ],
  "BW": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "BY": [
    "H",
    "h"
  ],
  "BZ": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CA": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "CC": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CD": [
    "hB",
    "H"
  ],
  "CF": [
    "H",
    "h",
    "hB"
  ],
  "CG": [
    "H",
    "hB"
  ],
  "CH": [
    "H",
    "hB",
    "h"
  ],
  "CI": [
    "H",
    "hB"
  ],
  "CK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CL": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CM": [
    "H",
    "h",
    "hB"
  ],
  "CN": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "CO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CP": [
    "H"
  ],
  "CR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CU": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "CV": [
    "H",
    "hB"
  ],
  "CW": [
    "H",
    "hB"
  ],
  "CX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "CY": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "CZ": [
    "H"
  ],
  "DE": [
    "H",
    "hB"
  ],
  "DG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "DJ": [
    "h",
    "H"
  ],
  "DK": [
    "H"
  ],
  "DM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "DO": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "DZ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "EC": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "EE": [
    "H",
    "hB"
  ],
  "EG": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "EH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ER": [
    "h",
    "H"
  ],
  "ES": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "ET": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "FI": [
    "H"
  ],
  "FJ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "FM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "FO": [
    "H",
    "h"
  ],
  "FR": [
    "H",
    "hB"
  ],
  "GA": [
    "H",
    "hB"
  ],
  "GB": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GD": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GE": [
    "H",
    "hB",
    "h"
  ],
  "GF": [
    "H",
    "hB"
  ],
  "GG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GH": [
    "h",
    "H"
  ],
  "GI": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "GL": [
    "H",
    "h"
  ],
  "GM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GN": [
    "H",
    "hB"
  ],
  "GP": [
    "H",
    "hB"
  ],
  "GQ": [
    "H",
    "hB",
    "h",
    "hb"
  ],
  "GR": [
    "h",
    "H",
    "hb",
    "hB"
  ],
  "GT": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "GU": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "GW": [
    "H",
    "hB"
  ],
  "GY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "HK": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "HN": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "HR": [
    "H",
    "hB"
  ],
  "HU": [
    "H",
    "h"
  ],
  "IC": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ID": [
    "H"
  ],
  "IE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IL": [
    "H",
    "hB"
  ],
  "IM": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IN": [
    "h",
    "H"
  ],
  "IO": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "IQ": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "IR": [
    "hB",
    "H"
  ],
  "IS": [
    "H"
  ],
  "IT": [
    "H",
    "hB"
  ],
  "JE": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "JM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "JO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "JP": [
    "H",
    "K",
    "h"
  ],
  "KE": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "KG": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KH": [
    "hB",
    "h",
    "H",
    "hb"
  ],
  "KI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KM": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "KN": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KP": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "KW": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "KY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "KZ": [
    "H",
    "hB"
  ],
  "LA": [
    "H",
    "hb",
    "hB",
    "h"
  ],
  "LB": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "LC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LI": [
    "H",
    "hB",
    "h"
  ],
  "LK": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "LR": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "LS": [
    "h",
    "H"
  ],
  "LT": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "LU": [
    "H",
    "h",
    "hB"
  ],
  "LV": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "LY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "MC": [
    "H",
    "hB"
  ],
  "MD": [
    "H",
    "hB"
  ],
  "ME": [
    "H",
    "hB",
    "h"
  ],
  "MF": [
    "H",
    "hB"
  ],
  "MG": [
    "H",
    "h"
  ],
  "MH": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MK": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "ML": [
    "H"
  ],
  "MM": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "MN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MO": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MP": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MQ": [
    "H",
    "hB"
  ],
  "MR": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "MS": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "MT": [
    "H",
    "h"
  ],
  "MU": [
    "H",
    "h"
  ],
  "MV": [
    "H",
    "h"
  ],
  "MW": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "MX": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "MY": [
    "hb",
    "hB",
    "h",
    "H"
  ],
  "MZ": [
    "H",
    "hB"
  ],
  "NA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "NC": [
    "H",
    "hB"
  ],
  "NE": [
    "H"
  ],
  "NF": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NG": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NI": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "NL": [
    "H",
    "hB"
  ],
  "NO": [
    "H",
    "h"
  ],
  "NP": [
    "H",
    "h",
    "hB"
  ],
  "NR": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NU": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "NZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "OM": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PA": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PE": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PF": [
    "H",
    "h",
    "hB"
  ],
  "PG": [
    "h",
    "H"
  ],
  "PH": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PK": [
    "h",
    "hB",
    "H"
  ],
  "PL": [
    "H",
    "h"
  ],
  "PM": [
    "H",
    "hB"
  ],
  "PN": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "PR": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "PS": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "PT": [
    "H",
    "hB"
  ],
  "PW": [
    "h",
    "H"
  ],
  "PY": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "QA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "RE": [
    "H",
    "hB"
  ],
  "RO": [
    "H",
    "hB"
  ],
  "RS": [
    "H",
    "hB",
    "h"
  ],
  "RU": [
    "H"
  ],
  "RW": [
    "H",
    "h"
  ],
  "SA": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SB": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SC": [
    "H",
    "h",
    "hB"
  ],
  "SD": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SE": [
    "H"
  ],
  "SG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SH": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SI": [
    "H",
    "hB"
  ],
  "SJ": [
    "H"
  ],
  "SK": [
    "H"
  ],
  "SL": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "SM": [
    "H",
    "h",
    "hB"
  ],
  "SN": [
    "H",
    "h",
    "hB"
  ],
  "SO": [
    "h",
    "H"
  ],
  "SR": [
    "H",
    "hB"
  ],
  "SS": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "ST": [
    "H",
    "hB"
  ],
  "SV": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "SX": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "SY": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "SZ": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "TC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TD": [
    "h",
    "H",
    "hB"
  ],
  "TF": [
    "H",
    "h",
    "hB"
  ],
  "TG": [
    "H",
    "hB"
  ],
  "TH": [
    "H",
    "h"
  ],
  "TJ": [
    "H",
    "h"
  ],
  "TL": [
    "H",
    "hB",
    "hb",
    "h"
  ],
  "TM": [
    "H",
    "h"
  ],
  "TN": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "TO": [
    "h",
    "H"
  ],
  "TR": [
    "H",
    "hB"
  ],
  "TT": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "TW": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "TZ": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "UA": [
    "H",
    "hB",
    "h"
  ],
  "UG": [
    "hB",
    "hb",
    "H",
    "h"
  ],
  "UM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "US": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "UY": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "UZ": [
    "H",
    "hB",
    "h"
  ],
  "VA": [
    "H",
    "h",
    "hB"
  ],
  "VC": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VE": [
    "h",
    "H",
    "hB",
    "hb"
  ],
  "VG": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VI": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "VN": [
    "H",
    "h"
  ],
  "VU": [
    "h",
    "H"
  ],
  "WF": [
    "H",
    "hB"
  ],
  "WS": [
    "h",
    "H"
  ],
  "XK": [
    "H",
    "hB",
    "h"
  ],
  "YE": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "YT": [
    "H",
    "hB"
  ],
  "ZA": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "ZM": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "ZW": [
    "H",
    "h"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-HK": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-IL": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "en-MY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function getBestPattern(skeleton, locale) {
  var skeletonCopy = "";
  for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
    var patternChar = skeleton.charAt(patternPos);
    if (patternChar === "j") {
      var extraLength = 0;
      while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
        extraLength++;
        patternPos++;
      }
      var hourLen = 1 + (extraLength & 1);
      var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
      var dayPeriodChar = "a";
      var hourChar = getDefaultHourSymbolFromLocale(locale);
      if (hourChar == "H" || hourChar == "k") {
        dayPeriodLen = 0;
      }
      while (dayPeriodLen-- > 0) {
        skeletonCopy += dayPeriodChar;
      }
      while (hourLen-- > 0) {
        skeletonCopy = hourChar + skeletonCopy;
      }
    } else if (patternChar === "J") {
      skeletonCopy += "H";
    } else {
      skeletonCopy += patternChar;
    }
  }
  return skeletonCopy;
}
function getDefaultHourSymbolFromLocale(locale) {
  var hourCycle = locale.hourCycle;
  if (hourCycle === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  locale.hourCycles && // @ts-ignore
  locale.hourCycles.length) {
    hourCycle = locale.hourCycles[0];
  }
  if (hourCycle) {
    switch (hourCycle) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  }
  var languageTag = locale.language;
  var regionTag;
  if (languageTag !== "root") {
    regionTag = locale.maximize().region;
  }
  var hourCycles = timeData[regionTag || ""] || timeData[languageTag || ""] || timeData["".concat(languageTag, "-001")] || timeData["001"];
  return hourCycles[0];
}
var _a;
var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
function createLocation(start, end) {
  return { start, end };
}
var hasNativeStartsWith = !!String.prototype.startsWith && "_a".startsWith("a", 1);
var hasNativeFromCodePoint = !!String.fromCodePoint;
var hasNativeFromEntries = !!Object.fromEntries;
var hasNativeCodePointAt = !!String.prototype.codePointAt;
var hasTrimStart = !!String.prototype.trimStart;
var hasTrimEnd = !!String.prototype.trimEnd;
var hasNativeIsSafeInteger = !!Number.isSafeInteger;
var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n) {
  return typeof n === "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
};
var REGEX_SUPPORTS_U_AND_Y = true;
try {
  var re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
} catch (_2) {
  REGEX_SUPPORTS_U_AND_Y = false;
}
var startsWith = hasNativeStartsWith ? (
  // Native
  (function startsWith2(s, search, position) {
    return s.startsWith(search, position);
  })
) : (
  // For IE11
  (function startsWith3(s, search, position) {
    return s.slice(position, position + search.length) === search;
  })
);
var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : (
  // IE11
  (function fromCodePoint2() {
    var codePoints = [];
    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
      codePoints[_i2] = arguments[_i2];
    }
    var elements = "";
    var length = codePoints.length;
    var i2 = 0;
    var code;
    while (length > i2) {
      code = codePoints[i2++];
      if (code > 1114111)
        throw RangeError(code + " is not a valid code point");
      elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
    }
    return elements;
  })
);
var fromEntries = (
  // native
  hasNativeFromEntries ? Object.fromEntries : (
    // Ponyfill
    (function fromEntries2(entries) {
      var obj = {};
      for (var _i2 = 0, entries_1 = entries; _i2 < entries_1.length; _i2++) {
        var _a2 = entries_1[_i2], k2 = _a2[0], v2 = _a2[1];
        obj[k2] = v2;
      }
      return obj;
    })
  )
);
var codePointAt = hasNativeCodePointAt ? (
  // Native
  (function codePointAt2(s, index) {
    return s.codePointAt(index);
  })
) : (
  // IE 11
  (function codePointAt3(s, index) {
    var size = s.length;
    if (index < 0 || index >= size) {
      return void 0;
    }
    var first = s.charCodeAt(index);
    var second;
    return first < 55296 || first > 56319 || index + 1 === size || (second = s.charCodeAt(index + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
  })
);
var trimStart = hasTrimStart ? (
  // Native
  (function trimStart2(s) {
    return s.trimStart();
  })
) : (
  // Ponyfill
  (function trimStart3(s) {
    return s.replace(SPACE_SEPARATOR_START_REGEX, "");
  })
);
var trimEnd = hasTrimEnd ? (
  // Native
  (function trimEnd2(s) {
    return s.trimEnd();
  })
) : (
  // Ponyfill
  (function trimEnd3(s) {
    return s.replace(SPACE_SEPARATOR_END_REGEX, "");
  })
);
function RE(s, flag) {
  return new RegExp(s, flag);
}
var matchIdentifierAtIndex;
if (REGEX_SUPPORTS_U_AND_Y) {
  var IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s, index) {
    var _a2;
    IDENTIFIER_PREFIX_RE_1.lastIndex = index;
    var match = IDENTIFIER_PREFIX_RE_1.exec(s);
    return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
  };
} else {
  matchIdentifierAtIndex = function matchIdentifierAtIndex2(s, index) {
    var match = [];
    while (true) {
      var c2 = codePointAt(s, index);
      if (c2 === void 0 || _isWhiteSpace(c2) || _isPatternSyntax(c2)) {
        break;
      }
      match.push(c2);
      index += c2 >= 65536 ? 2 : 1;
    }
    return fromCodePoint.apply(void 0, match);
  };
}
var Parser = (
  /** @class */
  (function() {
    function Parser2(message, options) {
      if (options === void 0) {
        options = {};
      }
      this.message = message;
      this.position = { offset: 0, line: 1, column: 1 };
      this.ignoreTag = !!options.ignoreTag;
      this.locale = options.locale;
      this.requiresOtherClause = !!options.requiresOtherClause;
      this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    Parser2.prototype.parse = function() {
      if (this.offset() !== 0) {
        throw Error("parser can only be used once");
      }
      return this.parseMessage(0, "", false);
    };
    Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
      var elements = [];
      while (!this.isEOF()) {
        var char = this.char();
        if (char === 123) {
          var result = this.parseArgument(nestingLevel, expectingCloseTag);
          if (result.err) {
            return result;
          }
          elements.push(result.val);
        } else if (char === 125 && nestingLevel > 0) {
          break;
        } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
          var position = this.clonePosition();
          this.bump();
          elements.push({
            type: TYPE.pound,
            location: createLocation(position, this.clonePosition())
          });
        } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
          if (expectingCloseTag) {
            break;
          } else {
            return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
          }
        } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
          var result = this.parseTag(nestingLevel, parentArgType);
          if (result.err) {
            return result;
          }
          elements.push(result.val);
        } else {
          var result = this.parseLiteral(nestingLevel, parentArgType);
          if (result.err) {
            return result;
          }
          elements.push(result.val);
        }
      }
      return { val: elements, err: null };
    };
    Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
      var startPosition = this.clonePosition();
      this.bump();
      var tagName = this.parseTagName();
      this.bumpSpace();
      if (this.bumpIf("/>")) {
        return {
          val: {
            type: TYPE.literal,
            value: "<".concat(tagName, "/>"),
            location: createLocation(startPosition, this.clonePosition())
          },
          err: null
        };
      } else if (this.bumpIf(">")) {
        var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
        if (childrenResult.err) {
          return childrenResult;
        }
        var children = childrenResult.val;
        var endTagStartPosition = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !_isAlpha(this.char())) {
            return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
          }
          var closingTagNameStartPosition = this.clonePosition();
          var closingTagName = this.parseTagName();
          if (tagName !== closingTagName) {
            return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
          }
          this.bumpSpace();
          if (!this.bumpIf(">")) {
            return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
          }
          return {
            val: {
              type: TYPE.tag,
              value: tagName,
              children,
              location: createLocation(startPosition, this.clonePosition())
            },
            err: null
          };
        } else {
          return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
        }
      } else {
        return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
      }
    };
    Parser2.prototype.parseTagName = function() {
      var startOffset = this.offset();
      this.bump();
      while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
        this.bump();
      }
      return this.message.slice(startOffset, this.offset());
    };
    Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
      var start = this.clonePosition();
      var value = "";
      while (true) {
        var parseQuoteResult = this.tryParseQuote(parentArgType);
        if (parseQuoteResult) {
          value += parseQuoteResult;
          continue;
        }
        var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
        if (parseUnquotedResult) {
          value += parseUnquotedResult;
          continue;
        }
        var parseLeftAngleResult = this.tryParseLeftAngleBracket();
        if (parseLeftAngleResult) {
          value += parseLeftAngleResult;
          continue;
        }
        break;
      }
      var location = createLocation(start, this.clonePosition());
      return {
        val: { type: TYPE.literal, value, location },
        err: null
      };
    };
    Parser2.prototype.tryParseLeftAngleBracket = function() {
      if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !_isAlphaOrSlash(this.peek() || 0))) {
        this.bump();
        return "<";
      }
      return null;
    };
    Parser2.prototype.tryParseQuote = function(parentArgType) {
      if (this.isEOF() || this.char() !== 39) {
        return null;
      }
      switch (this.peek()) {
        case 39:
          this.bump();
          this.bump();
          return "'";
        // '{', '<', '>', '}'
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (parentArgType === "plural" || parentArgType === "selectordinal") {
            break;
          }
          return null;
        default:
          return null;
      }
      this.bump();
      var codePoints = [this.char()];
      this.bump();
      while (!this.isEOF()) {
        var ch = this.char();
        if (ch === 39) {
          if (this.peek() === 39) {
            codePoints.push(39);
            this.bump();
          } else {
            this.bump();
            break;
          }
        } else {
          codePoints.push(ch);
        }
        this.bump();
      }
      return fromCodePoint.apply(void 0, codePoints);
    };
    Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
      if (this.isEOF()) {
        return null;
      }
      var ch = this.char();
      if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
        return null;
      } else {
        this.bump();
        return fromCodePoint(ch);
      }
    };
    Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
      var openingBracePosition = this.clonePosition();
      this.bump();
      this.bumpSpace();
      if (this.isEOF()) {
        return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
      }
      if (this.char() === 125) {
        this.bump();
        return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
      }
      var value = this.parseIdentifierIfPossible().value;
      if (!value) {
        return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
      }
      this.bumpSpace();
      if (this.isEOF()) {
        return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
      }
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125: {
          this.bump();
          return {
            val: {
              type: TYPE.argument,
              // value does not include the opening and closing braces.
              value,
              location: createLocation(openingBracePosition, this.clonePosition())
            },
            err: null
          };
        }
        // Argument with options: `{name, format, ...}`
        case 44: {
          this.bump();
          this.bumpSpace();
          if (this.isEOF()) {
            return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
          }
          return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
        }
        default:
          return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
      }
    };
    Parser2.prototype.parseIdentifierIfPossible = function() {
      var startingPosition = this.clonePosition();
      var startOffset = this.offset();
      var value = matchIdentifierAtIndex(this.message, startOffset);
      var endOffset = startOffset + value.length;
      this.bumpTo(endOffset);
      var endPosition = this.clonePosition();
      var location = createLocation(startingPosition, endPosition);
      return { value, location };
    };
    Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
      var _a2;
      var typeStartPosition = this.clonePosition();
      var argType = this.parseIdentifierIfPossible().value;
      var typeEndPosition = this.clonePosition();
      switch (argType) {
        case "":
          return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var styleAndLocation = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var styleStartPosition = this.clonePosition();
            var result = this.parseSimpleArgStyleIfPossible();
            if (result.err) {
              return result;
            }
            var style = trimEnd(result.val);
            if (style.length === 0) {
              return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var styleLocation = createLocation(styleStartPosition, this.clonePosition());
            styleAndLocation = { style, styleLocation };
          }
          var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
          if (argCloseResult.err) {
            return argCloseResult;
          }
          var location_1 = createLocation(openingBracePosition, this.clonePosition());
          if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
            var skeleton = trimStart(styleAndLocation.style.slice(2));
            if (argType === "number") {
              var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
              if (result.err) {
                return result;
              }
              return {
                val: { type: TYPE.number, value, location: location_1, style: result.val },
                err: null
              };
            } else {
              if (skeleton.length === 0) {
                return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
              }
              var dateTimePattern = skeleton;
              if (this.locale) {
                dateTimePattern = getBestPattern(skeleton, this.locale);
              }
              var style = {
                type: SKELETON_TYPE.dateTime,
                pattern: dateTimePattern,
                location: styleAndLocation.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
              };
              var type = argType === "date" ? TYPE.date : TYPE.time;
              return {
                val: { type, value, location: location_1, style },
                err: null
              };
            }
          }
          return {
            val: {
              type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
              value,
              location: location_1,
              style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var typeEndPosition_1 = this.clonePosition();
          this.bumpSpace();
          if (!this.bumpIf(",")) {
            return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
          }
          this.bumpSpace();
          var identifierAndLocation = this.parseIdentifierIfPossible();
          var pluralOffset = 0;
          if (argType !== "select" && identifierAndLocation.value === "offset") {
            if (!this.bumpIf(":")) {
              return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
            }
            this.bumpSpace();
            var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (result.err) {
              return result;
            }
            this.bumpSpace();
            identifierAndLocation = this.parseIdentifierIfPossible();
            pluralOffset = result.val;
          }
          var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
          if (optionsResult.err) {
            return optionsResult;
          }
          var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
          if (argCloseResult.err) {
            return argCloseResult;
          }
          var location_2 = createLocation(openingBracePosition, this.clonePosition());
          if (argType === "select") {
            return {
              val: {
                type: TYPE.select,
                value,
                options: fromEntries(optionsResult.val),
                location: location_2
              },
              err: null
            };
          } else {
            return {
              val: {
                type: TYPE.plural,
                value,
                options: fromEntries(optionsResult.val),
                offset: pluralOffset,
                pluralType: argType === "plural" ? "cardinal" : "ordinal",
                location: location_2
              },
              err: null
            };
          }
        }
        default:
          return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
      }
    };
    Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
      if (this.isEOF() || this.char() !== 125) {
        return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
      }
      this.bump();
      return { val: true, err: null };
    };
    Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
      var nestedBraces = 0;
      var startPosition = this.clonePosition();
      while (!this.isEOF()) {
        var ch = this.char();
        switch (ch) {
          case 39: {
            this.bump();
            var apostrophePosition = this.clonePosition();
            if (!this.bumpUntil("'")) {
              return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
            }
            this.bump();
            break;
          }
          case 123: {
            nestedBraces += 1;
            this.bump();
            break;
          }
          case 125: {
            if (nestedBraces > 0) {
              nestedBraces -= 1;
            } else {
              return {
                val: this.message.slice(startPosition.offset, this.offset()),
                err: null
              };
            }
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(startPosition.offset, this.offset()),
        err: null
      };
    };
    Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
      var tokens = [];
      try {
        tokens = parseNumberSkeletonFromString(skeleton);
      } catch (e) {
        return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
      }
      return {
        val: {
          type: SKELETON_TYPE.number,
          tokens,
          location,
          parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
        },
        err: null
      };
    };
    Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
      var _a2;
      var hasOtherClause = false;
      var options = [];
      var parsedSelectors = /* @__PURE__ */ new Set();
      var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
      while (true) {
        if (selector.length === 0) {
          var startPosition = this.clonePosition();
          if (parentArgType !== "select" && this.bumpIf("=")) {
            var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (result.err) {
              return result;
            }
            selectorLocation = createLocation(startPosition, this.clonePosition());
            selector = this.message.slice(startPosition.offset, this.offset());
          } else {
            break;
          }
        }
        if (parsedSelectors.has(selector)) {
          return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
        }
        if (selector === "other") {
          hasOtherClause = true;
        }
        this.bumpSpace();
        var openingBracePosition = this.clonePosition();
        if (!this.bumpIf("{")) {
          return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
        }
        var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
        if (fragmentResult.err) {
          return fragmentResult;
        }
        var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
        if (argCloseResult.err) {
          return argCloseResult;
        }
        options.push([
          selector,
          {
            value: fragmentResult.val,
            location: createLocation(openingBracePosition, this.clonePosition())
          }
        ]);
        parsedSelectors.add(selector);
        this.bumpSpace();
        _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
      }
      if (options.length === 0) {
        return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
      }
      if (this.requiresOtherClause && !hasOtherClause) {
        return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
      }
      return { val: options, err: null };
    };
    Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
      var sign = 1;
      var startingPosition = this.clonePosition();
      if (this.bumpIf("+")) ;
      else if (this.bumpIf("-")) {
        sign = -1;
      }
      var hasDigits = false;
      var decimal = 0;
      while (!this.isEOF()) {
        var ch = this.char();
        if (ch >= 48 && ch <= 57) {
          hasDigits = true;
          decimal = decimal * 10 + (ch - 48);
          this.bump();
        } else {
          break;
        }
      }
      var location = createLocation(startingPosition, this.clonePosition());
      if (!hasDigits) {
        return this.error(expectNumberError, location);
      }
      decimal *= sign;
      if (!isSafeInteger(decimal)) {
        return this.error(invalidNumberError, location);
      }
      return { val: decimal, err: null };
    };
    Parser2.prototype.offset = function() {
      return this.position.offset;
    };
    Parser2.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    };
    Parser2.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    };
    Parser2.prototype.char = function() {
      var offset = this.position.offset;
      if (offset >= this.message.length) {
        throw Error("out of bound");
      }
      var code = codePointAt(this.message, offset);
      if (code === void 0) {
        throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
      }
      return code;
    };
    Parser2.prototype.error = function(kind, location) {
      return {
        val: null,
        err: {
          kind,
          message: this.message,
          location
        }
      };
    };
    Parser2.prototype.bump = function() {
      if (this.isEOF()) {
        return;
      }
      var code = this.char();
      if (code === 10) {
        this.position.line += 1;
        this.position.column = 1;
        this.position.offset += 1;
      } else {
        this.position.column += 1;
        this.position.offset += code < 65536 ? 1 : 2;
      }
    };
    Parser2.prototype.bumpIf = function(prefix) {
      if (startsWith(this.message, prefix, this.offset())) {
        for (var i2 = 0; i2 < prefix.length; i2++) {
          this.bump();
        }
        return true;
      }
      return false;
    };
    Parser2.prototype.bumpUntil = function(pattern) {
      var currentOffset = this.offset();
      var index = this.message.indexOf(pattern, currentOffset);
      if (index >= 0) {
        this.bumpTo(index);
        return true;
      } else {
        this.bumpTo(this.message.length);
        return false;
      }
    };
    Parser2.prototype.bumpTo = function(targetOffset) {
      if (this.offset() > targetOffset) {
        throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
      }
      targetOffset = Math.min(targetOffset, this.message.length);
      while (true) {
        var offset = this.offset();
        if (offset === targetOffset) {
          break;
        }
        if (offset > targetOffset) {
          throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
        }
        this.bump();
        if (this.isEOF()) {
          break;
        }
      }
    };
    Parser2.prototype.bumpSpace = function() {
      while (!this.isEOF() && _isWhiteSpace(this.char())) {
        this.bump();
      }
    };
    Parser2.prototype.peek = function() {
      if (this.isEOF()) {
        return null;
      }
      var code = this.char();
      var offset = this.offset();
      var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
      return nextCode !== null && nextCode !== void 0 ? nextCode : null;
    };
    return Parser2;
  })()
);
function _isAlpha(codepoint) {
  return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
  return _isAlpha(codepoint) || codepoint === 47;
}
function _isPotentialElementNameChar(c2) {
  return c2 === 45 || c2 === 46 || c2 >= 48 && c2 <= 57 || c2 === 95 || c2 >= 97 && c2 <= 122 || c2 >= 65 && c2 <= 90 || c2 == 183 || c2 >= 192 && c2 <= 214 || c2 >= 216 && c2 <= 246 || c2 >= 248 && c2 <= 893 || c2 >= 895 && c2 <= 8191 || c2 >= 8204 && c2 <= 8205 || c2 >= 8255 && c2 <= 8256 || c2 >= 8304 && c2 <= 8591 || c2 >= 11264 && c2 <= 12271 || c2 >= 12289 && c2 <= 55295 || c2 >= 63744 && c2 <= 64975 || c2 >= 65008 && c2 <= 65533 || c2 >= 65536 && c2 <= 983039;
}
function _isWhiteSpace(c2) {
  return c2 >= 9 && c2 <= 13 || c2 === 32 || c2 === 133 || c2 >= 8206 && c2 <= 8207 || c2 === 8232 || c2 === 8233;
}
function _isPatternSyntax(c2) {
  return c2 >= 33 && c2 <= 35 || c2 === 36 || c2 >= 37 && c2 <= 39 || c2 === 40 || c2 === 41 || c2 === 42 || c2 === 43 || c2 === 44 || c2 === 45 || c2 >= 46 && c2 <= 47 || c2 >= 58 && c2 <= 59 || c2 >= 60 && c2 <= 62 || c2 >= 63 && c2 <= 64 || c2 === 91 || c2 === 92 || c2 === 93 || c2 === 94 || c2 === 96 || c2 === 123 || c2 === 124 || c2 === 125 || c2 === 126 || c2 === 161 || c2 >= 162 && c2 <= 165 || c2 === 166 || c2 === 167 || c2 === 169 || c2 === 171 || c2 === 172 || c2 === 174 || c2 === 176 || c2 === 177 || c2 === 182 || c2 === 187 || c2 === 191 || c2 === 215 || c2 === 247 || c2 >= 8208 && c2 <= 8213 || c2 >= 8214 && c2 <= 8215 || c2 === 8216 || c2 === 8217 || c2 === 8218 || c2 >= 8219 && c2 <= 8220 || c2 === 8221 || c2 === 8222 || c2 === 8223 || c2 >= 8224 && c2 <= 8231 || c2 >= 8240 && c2 <= 8248 || c2 === 8249 || c2 === 8250 || c2 >= 8251 && c2 <= 8254 || c2 >= 8257 && c2 <= 8259 || c2 === 8260 || c2 === 8261 || c2 === 8262 || c2 >= 8263 && c2 <= 8273 || c2 === 8274 || c2 === 8275 || c2 >= 8277 && c2 <= 8286 || c2 >= 8592 && c2 <= 8596 || c2 >= 8597 && c2 <= 8601 || c2 >= 8602 && c2 <= 8603 || c2 >= 8604 && c2 <= 8607 || c2 === 8608 || c2 >= 8609 && c2 <= 8610 || c2 === 8611 || c2 >= 8612 && c2 <= 8613 || c2 === 8614 || c2 >= 8615 && c2 <= 8621 || c2 === 8622 || c2 >= 8623 && c2 <= 8653 || c2 >= 8654 && c2 <= 8655 || c2 >= 8656 && c2 <= 8657 || c2 === 8658 || c2 === 8659 || c2 === 8660 || c2 >= 8661 && c2 <= 8691 || c2 >= 8692 && c2 <= 8959 || c2 >= 8960 && c2 <= 8967 || c2 === 8968 || c2 === 8969 || c2 === 8970 || c2 === 8971 || c2 >= 8972 && c2 <= 8991 || c2 >= 8992 && c2 <= 8993 || c2 >= 8994 && c2 <= 9e3 || c2 === 9001 || c2 === 9002 || c2 >= 9003 && c2 <= 9083 || c2 === 9084 || c2 >= 9085 && c2 <= 9114 || c2 >= 9115 && c2 <= 9139 || c2 >= 9140 && c2 <= 9179 || c2 >= 9180 && c2 <= 9185 || c2 >= 9186 && c2 <= 9254 || c2 >= 9255 && c2 <= 9279 || c2 >= 9280 && c2 <= 9290 || c2 >= 9291 && c2 <= 9311 || c2 >= 9472 && c2 <= 9654 || c2 === 9655 || c2 >= 9656 && c2 <= 9664 || c2 === 9665 || c2 >= 9666 && c2 <= 9719 || c2 >= 9720 && c2 <= 9727 || c2 >= 9728 && c2 <= 9838 || c2 === 9839 || c2 >= 9840 && c2 <= 10087 || c2 === 10088 || c2 === 10089 || c2 === 10090 || c2 === 10091 || c2 === 10092 || c2 === 10093 || c2 === 10094 || c2 === 10095 || c2 === 10096 || c2 === 10097 || c2 === 10098 || c2 === 10099 || c2 === 10100 || c2 === 10101 || c2 >= 10132 && c2 <= 10175 || c2 >= 10176 && c2 <= 10180 || c2 === 10181 || c2 === 10182 || c2 >= 10183 && c2 <= 10213 || c2 === 10214 || c2 === 10215 || c2 === 10216 || c2 === 10217 || c2 === 10218 || c2 === 10219 || c2 === 10220 || c2 === 10221 || c2 === 10222 || c2 === 10223 || c2 >= 10224 && c2 <= 10239 || c2 >= 10240 && c2 <= 10495 || c2 >= 10496 && c2 <= 10626 || c2 === 10627 || c2 === 10628 || c2 === 10629 || c2 === 10630 || c2 === 10631 || c2 === 10632 || c2 === 10633 || c2 === 10634 || c2 === 10635 || c2 === 10636 || c2 === 10637 || c2 === 10638 || c2 === 10639 || c2 === 10640 || c2 === 10641 || c2 === 10642 || c2 === 10643 || c2 === 10644 || c2 === 10645 || c2 === 10646 || c2 === 10647 || c2 === 10648 || c2 >= 10649 && c2 <= 10711 || c2 === 10712 || c2 === 10713 || c2 === 10714 || c2 === 10715 || c2 >= 10716 && c2 <= 10747 || c2 === 10748 || c2 === 10749 || c2 >= 10750 && c2 <= 11007 || c2 >= 11008 && c2 <= 11055 || c2 >= 11056 && c2 <= 11076 || c2 >= 11077 && c2 <= 11078 || c2 >= 11079 && c2 <= 11084 || c2 >= 11085 && c2 <= 11123 || c2 >= 11124 && c2 <= 11125 || c2 >= 11126 && c2 <= 11157 || c2 === 11158 || c2 >= 11159 && c2 <= 11263 || c2 >= 11776 && c2 <= 11777 || c2 === 11778 || c2 === 11779 || c2 === 11780 || c2 === 11781 || c2 >= 11782 && c2 <= 11784 || c2 === 11785 || c2 === 11786 || c2 === 11787 || c2 === 11788 || c2 === 11789 || c2 >= 11790 && c2 <= 11798 || c2 === 11799 || c2 >= 11800 && c2 <= 11801 || c2 === 11802 || c2 === 11803 || c2 === 11804 || c2 === 11805 || c2 >= 11806 && c2 <= 11807 || c2 === 11808 || c2 === 11809 || c2 === 11810 || c2 === 11811 || c2 === 11812 || c2 === 11813 || c2 === 11814 || c2 === 11815 || c2 === 11816 || c2 === 11817 || c2 >= 11818 && c2 <= 11822 || c2 === 11823 || c2 >= 11824 && c2 <= 11833 || c2 >= 11834 && c2 <= 11835 || c2 >= 11836 && c2 <= 11839 || c2 === 11840 || c2 === 11841 || c2 === 11842 || c2 >= 11843 && c2 <= 11855 || c2 >= 11856 && c2 <= 11857 || c2 === 11858 || c2 >= 11859 && c2 <= 11903 || c2 >= 12289 && c2 <= 12291 || c2 === 12296 || c2 === 12297 || c2 === 12298 || c2 === 12299 || c2 === 12300 || c2 === 12301 || c2 === 12302 || c2 === 12303 || c2 === 12304 || c2 === 12305 || c2 >= 12306 && c2 <= 12307 || c2 === 12308 || c2 === 12309 || c2 === 12310 || c2 === 12311 || c2 === 12312 || c2 === 12313 || c2 === 12314 || c2 === 12315 || c2 === 12316 || c2 === 12317 || c2 >= 12318 && c2 <= 12319 || c2 === 12320 || c2 === 12336 || c2 === 64830 || c2 === 64831 || c2 >= 65093 && c2 <= 65094;
}
function pruneLocation(els) {
  els.forEach(function(el2) {
    delete el2.location;
    if (isSelectElement(el2) || isPluralElement(el2)) {
      for (var k2 in el2.options) {
        delete el2.options[k2].location;
        pruneLocation(el2.options[k2].value);
      }
    } else if (isNumberElement(el2) && isNumberSkeleton(el2.style)) {
      delete el2.style.location;
    } else if ((isDateElement(el2) || isTimeElement(el2)) && isDateTimeSkeleton(el2.style)) {
      delete el2.style.location;
    } else if (isTagElement(el2)) {
      pruneLocation(el2.children);
    }
  });
}
function parse(message, opts) {
  if (opts === void 0) {
    opts = {};
  }
  opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
  var result = new Parser(message, opts).parse();
  if (result.err) {
    var error = SyntaxError(ErrorKind[result.err.kind]);
    error.location = result.err.location;
    error.originalMessage = result.err.message;
    throw error;
  }
  if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
    pruneLocation(result.val);
  }
  return result.val;
}
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
  ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
  ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
})(ErrorCode || (ErrorCode = {}));
var FormatError = (
  /** @class */
  (function(_super) {
    __extends(FormatError2, _super);
    function FormatError2(msg, code, originalMessage) {
      var _this = _super.call(this, msg) || this;
      _this.code = code;
      _this.originalMessage = originalMessage;
      return _this;
    }
    FormatError2.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    };
    return FormatError2;
  })(Error)
);
var InvalidValueError = (
  /** @class */
  (function(_super) {
    __extends(InvalidValueError2, _super);
    function InvalidValueError2(variableId, value, options, originalMessage) {
      return _super.call(this, 'Invalid values for "'.concat(variableId, '": "').concat(value, '". Options are "').concat(Object.keys(options).join('", "'), '"'), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueError2;
  })(FormatError)
);
var InvalidValueTypeError = (
  /** @class */
  (function(_super) {
    __extends(InvalidValueTypeError2, _super);
    function InvalidValueTypeError2(value, type, originalMessage) {
      return _super.call(this, 'Value for "'.concat(value, '" must be of type ').concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
    }
    return InvalidValueTypeError2;
  })(FormatError)
);
var MissingValueError = (
  /** @class */
  (function(_super) {
    __extends(MissingValueError2, _super);
    function MissingValueError2(variableId, originalMessage) {
      return _super.call(this, 'The intl string context variable "'.concat(variableId, '" was not provided to the string "').concat(originalMessage, '"'), ErrorCode.MISSING_VALUE, originalMessage) || this;
    }
    return MissingValueError2;
  })(FormatError)
);
var PART_TYPE;
(function(PART_TYPE2) {
  PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
  PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
})(PART_TYPE || (PART_TYPE = {}));
function mergeLiteral(parts) {
  if (parts.length < 2) {
    return parts;
  }
  return parts.reduce(function(all3, part) {
    var lastPart = all3[all3.length - 1];
    if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
      all3.push(part);
    } else {
      lastPart.value += part.value;
    }
    return all3;
  }, []);
}
function isFormatXMLElementFn(el2) {
  return typeof el2 === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
  if (els.length === 1 && isLiteralElement(els[0])) {
    return [
      {
        type: PART_TYPE.literal,
        value: els[0].value
      }
    ];
  }
  var result = [];
  for (var _i2 = 0, els_1 = els; _i2 < els_1.length; _i2++) {
    var el2 = els_1[_i2];
    if (isLiteralElement(el2)) {
      result.push({
        type: PART_TYPE.literal,
        value: el2.value
      });
      continue;
    }
    if (isPoundElement(el2)) {
      if (typeof currentPluralValue === "number") {
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getNumberFormat(locales).format(currentPluralValue)
        });
      }
      continue;
    }
    var varName = el2.value;
    if (!(values && varName in values)) {
      throw new MissingValueError(varName, originalMessage);
    }
    var value = values[varName];
    if (isArgumentElement(el2)) {
      if (!value || typeof value === "string" || typeof value === "number") {
        value = typeof value === "string" || typeof value === "number" ? String(value) : "";
      }
      result.push({
        type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
        value
      });
      continue;
    }
    if (isDateElement(el2)) {
      var style = typeof el2.style === "string" ? formats.date[el2.style] : isDateTimeSkeleton(el2.style) ? el2.style.parsedOptions : void 0;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTimeElement(el2)) {
      var style = typeof el2.style === "string" ? formats.time[el2.style] : isDateTimeSkeleton(el2.style) ? el2.style.parsedOptions : formats.time.medium;
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getDateTimeFormat(locales, style).format(value)
      });
      continue;
    }
    if (isNumberElement(el2)) {
      var style = typeof el2.style === "string" ? formats.number[el2.style] : isNumberSkeleton(el2.style) ? el2.style.parsedOptions : void 0;
      if (style && style.scale) {
        value = value * (style.scale || 1);
      }
      result.push({
        type: PART_TYPE.literal,
        value: formatters.getNumberFormat(locales, style).format(value)
      });
      continue;
    }
    if (isTagElement(el2)) {
      var children = el2.children, value_1 = el2.value;
      var formatFn = values[value_1];
      if (!isFormatXMLElementFn(formatFn)) {
        throw new InvalidValueTypeError(value_1, "function", originalMessage);
      }
      var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
      var chunks = formatFn(parts.map(function(p2) {
        return p2.value;
      }));
      if (!Array.isArray(chunks)) {
        chunks = [chunks];
      }
      result.push.apply(result, chunks.map(function(c2) {
        return {
          type: typeof c2 === "string" ? PART_TYPE.literal : PART_TYPE.object,
          value: c2
        };
      }));
    }
    if (isSelectElement(el2)) {
      var opt = el2.options[value] || el2.options.other;
      if (!opt) {
        throw new InvalidValueError(el2.value, value, Object.keys(el2.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
      continue;
    }
    if (isPluralElement(el2)) {
      var opt = el2.options["=".concat(value)];
      if (!opt) {
        if (!Intl.PluralRules) {
          throw new FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', ErrorCode.MISSING_INTL_API, originalMessage);
        }
        var rule = formatters.getPluralRules(locales, { type: el2.pluralType }).select(value - (el2.offset || 0));
        opt = el2.options[rule] || el2.options.other;
      }
      if (!opt) {
        throw new InvalidValueError(el2.value, value, Object.keys(el2.options), originalMessage);
      }
      result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el2.offset || 0)));
      continue;
    }
  }
  return mergeLiteral(result);
}
function mergeConfig(c1, c2) {
  if (!c2) {
    return c1;
  }
  return __assign(__assign(__assign({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all3, k2) {
    all3[k2] = __assign(__assign({}, c1[k2]), c2[k2] || {});
    return all3;
  }, {}));
}
function mergeConfigs(defaultConfig, configs) {
  if (!configs) {
    return defaultConfig;
  }
  return Object.keys(defaultConfig).reduce(function(all3, k2) {
    all3[k2] = mergeConfig(defaultConfig[k2], configs[k2]);
    return all3;
  }, __assign({}, defaultConfig));
}
function createFastMemoizeCache(store) {
  return {
    create: function() {
      return {
        get: function(key) {
          return store[key];
        },
        set: function(key, value) {
          store[key] = value;
        }
      };
    }
  };
}
function createDefaultFormatters(cache) {
  if (cache === void 0) {
    cache = {
      number: {},
      dateTime: {},
      pluralRules: {}
    };
  }
  return {
    getNumberFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
        args[_i2] = arguments[_i2];
      }
      return new ((_a2 = Intl.NumberFormat).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.number),
      strategy: strategies.variadic
    }),
    getDateTimeFormat: memoize(function() {
      var _a2;
      var args = [];
      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
        args[_i2] = arguments[_i2];
      }
      return new ((_a2 = Intl.DateTimeFormat).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.dateTime),
      strategy: strategies.variadic
    }),
    getPluralRules: memoize(function() {
      var _a2;
      var args = [];
      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
        args[_i2] = arguments[_i2];
      }
      return new ((_a2 = Intl.PluralRules).bind.apply(_a2, __spreadArray([void 0], args, false)))();
    }, {
      cache: createFastMemoizeCache(cache.pluralRules),
      strategy: strategies.variadic
    })
  };
}
var IntlMessageFormat = (
  /** @class */
  (function() {
    function IntlMessageFormat2(message, locales, overrideFormats, opts) {
      if (locales === void 0) {
        locales = IntlMessageFormat2.defaultLocale;
      }
      var _this = this;
      this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      };
      this.format = function(values) {
        var parts = _this.formatToParts(values);
        if (parts.length === 1) {
          return parts[0].value;
        }
        var result = parts.reduce(function(all3, part) {
          if (!all3.length || part.type !== PART_TYPE.literal || typeof all3[all3.length - 1] !== "string") {
            all3.push(part.value);
          } else {
            all3[all3.length - 1] += part.value;
          }
          return all3;
        }, []);
        if (result.length <= 1) {
          return result[0] || "";
        }
        return result;
      };
      this.formatToParts = function(values) {
        return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
      };
      this.resolvedOptions = function() {
        var _a3;
        return {
          locale: ((_a3 = _this.resolvedLocale) === null || _a3 === void 0 ? void 0 : _a3.toString()) || Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
        };
      };
      this.getAst = function() {
        return _this.ast;
      };
      this.locales = locales;
      this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales);
      if (typeof message === "string") {
        this.message = message;
        if (!IntlMessageFormat2.__parse) {
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        }
        var _a2 = opts || {};
        _a2.formatters;
        var parseOpts = __rest(_a2, ["formatters"]);
        this.ast = IntlMessageFormat2.__parse(message, __assign(__assign({}, parseOpts), { locale: this.resolvedLocale }));
      } else {
        this.ast = message;
      }
      if (!Array.isArray(this.ast)) {
        throw new TypeError("A message must be provided as a String or AST.");
      }
      this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
      this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
    }
    Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
      get: function() {
        if (!IntlMessageFormat2.memoizedDefaultLocale) {
          IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
        }
        return IntlMessageFormat2.memoizedDefaultLocale;
      },
      enumerable: false,
      configurable: true
    });
    IntlMessageFormat2.memoizedDefaultLocale = null;
    IntlMessageFormat2.resolveLocale = function(locales) {
      if (typeof Intl.Locale === "undefined") {
        return;
      }
      var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
      if (supportedLocales.length > 0) {
        return new Intl.Locale(supportedLocales[0]);
      }
      return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
    };
    IntlMessageFormat2.__parse = parse;
    IntlMessageFormat2.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    };
    return IntlMessageFormat2;
  })()
);
class Message {
  /**
   * Creates a new Message object.
   *
   * @param {object} message - A message object as read from JSON file.
   * @param {string} message.name - A message string.
   * @param {string[]} [message.params] - A list of message parameters (optional).
   * @param {string} [message.abbr] - Message abbreviation (optional).
   * @param {string} locale - A message's locale.
   */
  constructor(message, locale) {
    if (!locale) {
      throw new Error("Locale data is missing");
    }
    if (!message) {
      throw new Error("Message data is missing");
    }
    this.message = "Message text is not defined in translation data";
    this.params = [];
    this.locale = locale;
    for (const key of Object.keys(message)) {
      this[key] = message[key];
    }
    this.formatFunc = new IntlMessageFormat(this.message, this.locale);
    this.abbrFunc = new IntlMessageFormat(this.abbr || this.message, this.locale);
  }
  /**
   * Whether this message has any parameters or not.
   *
   * @returns {boolean} True if message has any parameters, false otherwise.
   */
  get hasParameters() {
    return Boolean(this.params.length > 0);
  }
  /**
   * Returns a formatted version of a message (if message has parameters) or
   * a message text (if parameters do not exist for a message).
   *
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @returns {string} A formatted message text
   */
  getMsg(formatOptions) {
    if (this.hasParameters && !this.formatFunc) {
      throw new Error(`A message with parameters ${this.message} requires a format function`);
    }
    return !this.hasParameters ? this.message : this.formatFunc.format(formatOptions);
  }
  /**
   * Returns an abbreviated version of a message (if defined) or a message itself otherwise.
   *
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @returns {string} Abbreviated or full message text.
   */
  getAbbr(formatOptions) {
    return !this.hasParameters ? this.abbrFunc.format() : this.abbrFunc.format(formatOptions);
  }
}
class MessageBundle {
  /**
   * Creates a message bundle (a list of messages) for a locale.
   *
   * @param {string | object} messagesJSONorObj - Messages for a locale as a JSON string or as an object.
   * @param {string} locale - A locale code for a message group. IETF language tag format is recommended.
   * @param {Function} missingTranslationMsgFn - A placeholder message that will be shown if translation is not found.
   */
  constructor(messagesJSONorObj, locale, missingTranslationMsgFn = (msgID, locale2) => `Missing translation: ${msgID} [${locale2}]`) {
    if (!locale) {
      throw new Error("Locale data is missing");
    }
    if (!messagesJSONorObj) {
      throw new Error("Message data is missing");
    }
    this._locale = locale;
    this._messages = /* @__PURE__ */ new Map();
    this._missingTranslationMsgFn = missingTranslationMsgFn;
    const messages = typeof messagesJSONorObj === "string" ? JSON.parse(messagesJSONorObj) : messagesJSONorObj;
    this.append(messages);
  }
  /**
   * Appends messages from another bundle to the current message bundle.
   * If message has the same messageID that already exists in the
   * current bundle, it will be overwritten.
   *
   * @param {MessageBundle} messageBundle - A bundle of messages.
   */
  appendFromBundle(messageBundle) {
    for (const key of messageBundle.messageIds) {
      this._messages.set(key, messageBundle.getMessageObject(key));
    }
  }
  /**
   * Appends a series of messages to the bundle
   *
   * @param {string} messagesJSON - Messages as a JSON string or as a parsed JSON object
   */
  appendFromJSON(messagesJSON) {
    const messages = typeof messagesJSON === "string" ? JSON.parse(messagesJSON) : messagesJSON;
    this.append(messages);
  }
  /**
   * Appends a series of messages from an object. Object properties are message names, and
   * values are message objects. If appended message has the same key as en existing one,
   * an existing message will be overwritten.
   *
   * @param {object} messages - An object containing messages.
   */
  append(messages) {
    for (const [key, messageObj] of Object.entries(messages)) {
      const message = new Message(messageObj, this._locale);
      this._messages.set(key, message);
    }
  }
  /**
   * Returns a list of message IDs that exist in a bundle.
   *
   * @returns {string[]}
   */
  get messageIds() {
    return Array.from(this._messages.keys());
  }
  /**
   * Checks if message with a given message ID exists among the translated messages.
   *
   * @param {string} messageID - A message ID of a message to be checked
   * @returns {boolean} True if message is present, false otherwise
   */
  hasMsg(messageID) {
    return this._messages.has(messageID);
  }
  /**
   * Returns a (formatted) message for a message ID provided.
   *
   * @see {@link Message#getMsg}
   * @param {string} messageID - An ID of a message.
   * @param {object} formatOptions - Options that can be used for message formatting in the following format:
   * {
   *     paramOneName: paramOneValue,
   *     paramTwoName: paramTwoValue
   * }.
   * @param {object} options - An object with the following possible options:
   *     {boolean} passthrough - If true and a translation for a given message ID is not found, will return
   *                             an original `messageID` string. Otherwise will return an error message if
   *                             a translation is missing.
   * @returns {string} A formatted message. If message not found, returns a message that contains an error text.
   */
  getMsg(messageID, formatOptions = void 0, options = {}) {
    const defaultOptions = {
      passthrough: false
    };
    options = Object.assign(defaultOptions, options);
    if (this.hasMsg(messageID)) {
      return this._messages.get(messageID).getMsg(formatOptions);
    } else {
      return options.passthrough ? messageID : `"${messageID}" is not in translation data for ${this._locale}`;
    }
  }
  /**
   * A wrapper around `get()` with a `passthrough` parameter set to `true`.
   *
   * @see {@link MessageBundle#getMsg} for more information.
   * @param messageID
   * @param formatOptions
   * @param options
   * @returns {string}
   */
  getText(messageID, formatOptions, options = {}) {
    options.passthrough = true;
    return this.getMsg(messageID, formatOptions, options);
  }
  /**
   * Returns an abbreviated version of a message for a message ID provided.
   *
   * @see {@link Message#getAbbr}
   * @param messageID - An ID of a message.
   * @param formatOptions - Options that can be used for message formatting in the same order
   * as they are defined in a translation source file.
   * @returns {string} An abbreviated, and possibly formatted, message. If abbreviated message not found,
   *          returns an original message text.
   */
  getAbbr(messageID, formatOptions = void 0) {
    if (this.hasMsg(messageID)) {
      return this._messages.get(messageID).getAbbr(formatOptions);
    } else {
      return this._missingTranslationMsgFn(messageID, this._locale);
    }
  }
  /**
   * Returns a Message object for a given message ID.
   *
   * @param {string} messageID - A message ID of a message object to be retrieved..
   * @returns {Message} A message object.
   */
  getMessageObject(messageID) {
    return this.hasMsg(messageID) ? this._messages.get(messageID) : null;
  }
  /**
   * Returns a locale of a current message bundle.
   *
   * @returns {string} A locale of this message bundle.
   */
  get locale() {
    return this._locale;
  }
}
class L10n {
  constructor() {
    this.selectedLocale = void 0;
    this.bundles = /* @__PURE__ */ new Map();
    return this;
  }
  /**
   * Adds, or appends, one or several messages for a locale specified.
   * This method is chainable.
   *
   * @param {string} messageJSON - Messages in a JSON string
   * @param {string} locale - A locale of the messages
   * @param {Function} missingTranslationMsgFn - A placeholder message that will be shown if translation is not found.
   * @returns {L10n} - Self reference (for chaining)
   */
  addMessages(messageJSON, locale, missingTranslationMsgFn) {
    let messageBundle;
    if (this.bundles.has(locale)) {
      messageBundle = this.bundles.get(locale);
      messageBundle.appendFromJSON(messageJSON);
    } else {
      messageBundle = new MessageBundle(messageJSON, locale, missingTranslationMsgFn);
      this.addMessageBundle(messageBundle);
      if (!this.selectedLocale) {
        this.setLocale(locale);
      }
    }
    return this;
  }
  /**
   * Adds a message bundle to a L10n object. If selected locale is not set, sets it to the locale of the message bundle.
   * This function is chainable.
   *
   * @param {MessageBundle} messageBundle - A message bundle that will be stored within an L10n object.
   * @returns {L10n} - Returns self for chaining.
   */
  addMessageBundle(messageBundle) {
    const locale = messageBundle.locale;
    if (this.bundles.has(locale)) {
      this.bundles.get(locale).appendFromBundle(messageBundle);
    } else {
      this.bundles.set(messageBundle.locale, messageBundle);
      if (!this.selectedLocale) {
        this.setLocale(messageBundle.locale);
      }
    }
    return this;
  }
  /**
   * Returns an array of locales supported by the L10n object.
   *
   * @returns {string[]}
   */
  get locales() {
    return Array.from(this.bundles.keys());
  }
  /**
   * Returns a message bundle for a currently selected locale
   *
   * @returns {MessageBundle | undefined} A message bundle object or undefined if selectedLocale is not set
   */
  get bundle() {
    return this.bundles.get(this.selectedLocale);
  }
  /**
   * Returns a message from a bundle for a current locale.
   * A wrapper for {@link MessageBundle#getMsg}
   *
   * @param {...any} params
   */
  getMsg(...params) {
    return this.bundles.has(this.selectedLocale) ? this.bundles.get(this.selectedLocale).getMsg(...params) : {};
  }
  /**
   * Sets, or switches a locale that is currently selected. If message bundle for such locale
   * does not exist, does nothing.
   * This method is chainable.
   *
   * @param {string} locale - A locale to be set as currently selected.
   * @returns {L10n} Reference to self for chaining
   */
  setLocale(locale) {
    if (this.bundles.has(locale)) {
      this.selectedLocale = locale;
    }
    return this;
  }
}
class AdapterError extends Error {
  constructor(category, adapterName, methodName, messageError, statusCode) {
    super(messageError);
    this.adapter = `${category}.${adapterName}`;
    this.methodName = methodName;
    this.statusCode = statusCode;
    if (this.adapter && this.methodName) {
      this.message = `${this.message} (${this.adapter}.${this.methodName})`;
    }
    try {
      Error.captureStackTrace(this, AdapterError);
    } catch (e) {
    }
  }
  /**
   * @deprecated
   * This method is obsolete. It will be removed in future versions.
   * No replacement for its functionality has been provided as it is not used anywhere.
   */
  update(config) {
    this.adapter = `${config.category}.${config.adapterName}`;
    this.methodName = config.method;
    this.message = `${this.message} (${this.adapter}.${this.methodName})`;
    return this;
  }
}
class AdapterWarning extends Error {
  /**
   * @param {string} category
   * @param {string} adapterName - The name of the client adapter where the warning was originated.
   * @param {string} methodName - The name of the method from where the warning came from.
   * @param {string} errorCode - A short string representing the alphanumeric error code, such as `SOME_DATA_MISSING`
   * @param errorMessage
   */
  constructor(category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage);
    this.adapter = `${category}.${adapterName}`;
    this.methodName = methodName;
    this.errorCode = errorCode;
  }
}
class RemoteError extends Error {
  constructor(category, adapterName, methodName, errorCode, errorMessage) {
    super(errorMessage);
    this.adapter = `${category}.${adapterName}`;
    this.methodName = methodName;
    this.errorCode = errorCode;
  }
  update(config) {
    this.adapter = `${config.category}.${config.adapterName}`;
    this.methodName = config.method;
    this.message = `${this.errorCode}: ${this.message} (${this.adapter}.${this.methodName})`;
    return this;
  }
}
const COOKIE_TEST_MESSAGE$1 = { "message": "This is a test message about a cookie.", "description": "A test message that is shown in a panel", "component": "Panel" };
const NUM_LINES_TEST_MESSAGE$1 = { "message": "There {numLines, plural, =0 {are no lines} =1 {is one line} other {are # lines}}.", "description": "A test message that is shown in a panel", "component": "Panel", "params": ["numLines"] };
const MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE = { "message": "There is no engine for the given languageID {languageID}", "description": "Error message for morphology.tufts adapter - when no engine is found for given languageID", "component": "morphology.tufts", "params": ["languageID"] };
const MORPH_NO_HOMONYM = { "message": "There is no homonym for the given word - {word} and languageID {languageID}", "description": "Error message for morphology.tufts adapter - when no homonym was returned from the source", "component": "morphology.tufts", "params": ["word", "languageID"] };
const MORPH_TUFTS_NO_ANSWER_FOR_WORD = { "message": "There is no data from the source for the given word - {word} and languageID {languageID}", "description": "Error message for morphology.tufts adapter - when no data was returned from the source", "component": "morphology.tufts", "params": ["word", "languageID"] };
const MORPH_UNKNOWN_ERROR = { "message": "Unknown error - {message}", "description": "Error message for morph.tufts adapter - unknown", "component": "morphology.tufts", "params": ["message"] };
const MORPH_TRANSFORM_NO_LANGUAGE = { "message": "No Language was defined from json object", "description": "Error message for morph.tufts adapter - transform problem", "component": "morphology.tufts" };
const MORPH_TRANSFORM_NO_LEMMA = { "message": "No Lemma was defined from json object", "description": "Error message for morph.tufts adapter - transform problem", "component": "morphology.tufts" };
const MORPH_TRANSFORM_NO_MAPPING_DATA = { "message": "No mapping data found for {language}", "description": "Error message for morph.tufts adapter - transform problem", "component": "morphology.tufts", "params": ["language"] };
const MORPH_TRANSFORM_INFLECTION_ERROR = { "message": "Error parsing inflection: {error}", "description": "Error message for morph.tufts adapter - transform problem", "component": "morphology.tufts", "params": ["error"] };
const BASIC_ADAPTER_NO_DATA_FROM_URL = { "message": "Remote service is unavailable - {url}", "description": "Error message for basic adapter - when no data was returned from the url", "component": "basic_adapter", "params": ["url"] };
const BASIC_ADAPTER_EMPTY_URL = { "message": "Unable to get data from empty url", "description": "Error message for basic adapter - when empty url was given", "component": "basic_adapter" };
const BASIC_ADAPTER_UNKNOWN_ERROR = { "message": "Unknown error - {message}", "description": "Error message for basic adapter - unknown", "component": "basic_adapter", "params": ["message"] };
const BASIC_ADAPTER_URL_RESPONSE_FAILED = { "message": "Request doesn't return data - {statusCode}: {statusText}", "description": "Error message for basic adapter - unknown", "component": "basic_adapter", "params": ["statusCode", "statusText"] };
const MORPH_TREEBANK_MISSING_REF = { "message": "Reference is missing from treebank request = {request}", "description": "Missing reference in treebank request", "component": "morph.treebank", "params": ["request"] };
const MORPH_TREEBANK_UNSUPPORTED_LANGUAGE = { "message": "Unsupported treebank language ${languageId}", "description": "Unsupported treebank language", "component": "morph.treebank", "params": ["languageId"] };
const MORPH_TREEBANK_NO_URL = { "message": "There is a problem with creating url for the given word - {word}", "description": "Error message for morph.treebank - no url for fetching data from treebank", "component": "morph.treebank", "params": ["word"] };
const MORPH_TREEBANK_NO_ANSWER_FOR_WORD = { "message": "There is no data from the source for the given word - {word}", "description": "Error message for morphology.treebank adapter - when no data was returned from the source", "component": "morphology.treebank", "params": ["word"] };
const MORPH_TREEBANK_UNKNOWN_ERROR = { "message": "Unknown error - {message}", "description": "Error message for morph.treebank adapter - unknown", "component": "morphology.treebank", "params": ["message"] };
const TRANSLATION_INPUT_PREPARE_ERROR = { "message": "Some problems with preparing input for geting translations - {input}", "description": "Error message for lemmatranslation.alpheios adapter - problems with input", "component": "lemmatranslation.alpheios", "params": ["input"] };
const TRANSLATION_UNKNOWN_ERROR = { "message": "Unknown error - {message}", "description": "Error message for lemmatranslation.alpheios adapter - unknown", "component": "lemmatranslation.alpheios", "params": ["message"] };
const TRANSLATION_INCORRECT_LEXEMES = { "message": "There is no correct homonym in input", "description": "Error message for lemmatranslation.alpheios adapter - no lexemes", "component": "lemmatranslation.alpheios" };
const LEXICONS_NO_ALLOWED_URL = { "message": "There are no allowed urls in the options", "description": "Error message for lexicon.alpheios adapter - no urls were found in options", "component": "lexicon.alpheios" };
const LEXICONS_FAILED_CACHED_DATA = { "message": "There is a problem with catching data from lexicon source - {message}", "description": "Error message for lexicon.alpheios adapter - some problems with getting cached data", "component": "lexicon.alpheios", "params": ["message"] };
const LEXICONS_FAILED_APPEND_DEFS = { "message": "There is a problem with updating definitions - {message}", "description": "Error message for lexicon.alpheios adapter - some problems with updating definitions", "component": "lexicon.alpheios", "params": ["message"] };
const LEXICONS_NO_FULL_URL = { "message": "No full url is defined for definitions", "description": "Error message for lexicon.alpheios adapter - no full url is defined", "component": "lexicon.alpheios" };
const LEXICONS_NO_DATA_FROM_URL = { "message": "No data recieved from url - {url}", "description": "Error message for lexicon.alpheios adapter - no data from url", "component": "lexicon.alpheios", "params": ["url"] };
const CONCORDANCE_AUTHOR_UPLOAD_ERROR = { "message": "Some problems with retrieving from author/textWork config file - {message}", "description": "Error message for wordusageExamples.concordance adapter - problems with uploading data from author-work config file", "component": "wordusageExamples.concordance", "params": ["message"] };
const CONCORDANCE_WORD_USAGE_FETCH_ERROR = { "message": "Some problems with fetching word usage examples from concordance api - {message}", "description": "Error message for wordusageExamples.concordance adapter - problems with fetching word usage examples from concordance api", "component": "wordusageExamples.concordance", "params": ["message"] };
const LOGEION_FETCH_ERROR = { "message": "Some problems with fetching words from logeion api - {message}", "description": "Error message for autoCompleteWords.logeion adapter - problems with fetching words from logeion api", "component": "autoCompleteWords.logeion", "params": ["message"] };
const LOGEION_FETCH_OPTIONS_ERROR = { "message": "There are no fetch options for Logeion API request", "description": "Error message for autoCompleteWords.logeion adapter - no apikey and baseurl for Logeion API", "component": "autoCompleteWords.logeion" };
const TOKENIZATION_FETCH_ERROR = { "message": "Some problems with fetching words from Alpheios Tokenization API - {message}", "description": "Error message for Alpheios Tokenization adapter - problems with fetching words from api", "component": "tokenizationGroup.alpheios", "params": ["message"] };
const TOKENIZATION_FETCH_OPTIONS_ERROR = { "message": "There are no fetch options for Alpheios Tokenization API request", "description": "Error message - no apikey and baseurl for Alpheios Tokenization API", "component": "tokenizationGroup.alpheios" };
const TOKENIZATION_AVAILABILITY_ERROR = { "message": "Tokenization service is not available for passed fetch parameters (language)", "description": "Error message - tokenization service doesn't support passed language", "component": "tokenizationGroup.alpheios" };
const DTSAPI_FETCH_ERROR = { "message": "Some problems with fetching words from DTS API - {message}", "description": "Error message for DTS API adapter - problems with fetching words from api", "component": "dtsapiGroup.general", "params": ["message"] };
const DTSAPI_NO_OBLIGATORY_PROPS = { "message": "Not all obligatory parameters are defined for the method - {message}", "description": "Error message for DTS API adapter - problems with fetching words from api", "component": "dtsapiGroup.general", "params": ["message"] };
const DETECT_LANG_URL_ERROR = { "message": "There are not enough parameters for detect language request", "description": "Error message - no apikey and baseurl for Alpheios Tokenization API", "component": "detectlangGroup.detectlang" };
const DETECT_LANG_FETCH_ERROR = { "message": "Some problems with detection language request API - {message}", "description": "Error message for DetectLang adapter", "component": "detectlangGroup.detectlang", "params": ["message"] };
const enUS = {
  COOKIE_TEST_MESSAGE: COOKIE_TEST_MESSAGE$1,
  NUM_LINES_TEST_MESSAGE: NUM_LINES_TEST_MESSAGE$1,
  MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE,
  MORPH_NO_HOMONYM,
  MORPH_TUFTS_NO_ANSWER_FOR_WORD,
  MORPH_UNKNOWN_ERROR,
  MORPH_TRANSFORM_NO_LANGUAGE,
  MORPH_TRANSFORM_NO_LEMMA,
  MORPH_TRANSFORM_NO_MAPPING_DATA,
  MORPH_TRANSFORM_INFLECTION_ERROR,
  BASIC_ADAPTER_NO_DATA_FROM_URL,
  BASIC_ADAPTER_EMPTY_URL,
  BASIC_ADAPTER_UNKNOWN_ERROR,
  BASIC_ADAPTER_URL_RESPONSE_FAILED,
  MORPH_TREEBANK_MISSING_REF,
  MORPH_TREEBANK_UNSUPPORTED_LANGUAGE,
  MORPH_TREEBANK_NO_URL,
  MORPH_TREEBANK_NO_ANSWER_FOR_WORD,
  MORPH_TREEBANK_UNKNOWN_ERROR,
  TRANSLATION_INPUT_PREPARE_ERROR,
  TRANSLATION_UNKNOWN_ERROR,
  TRANSLATION_INCORRECT_LEXEMES,
  LEXICONS_NO_ALLOWED_URL,
  LEXICONS_FAILED_CACHED_DATA,
  LEXICONS_FAILED_APPEND_DEFS,
  LEXICONS_NO_FULL_URL,
  LEXICONS_NO_DATA_FROM_URL,
  CONCORDANCE_AUTHOR_UPLOAD_ERROR,
  CONCORDANCE_WORD_USAGE_FETCH_ERROR,
  LOGEION_FETCH_ERROR,
  LOGEION_FETCH_OPTIONS_ERROR,
  TOKENIZATION_FETCH_ERROR,
  TOKENIZATION_FETCH_OPTIONS_ERROR,
  TOKENIZATION_AVAILABILITY_ERROR,
  DTSAPI_FETCH_ERROR,
  DTSAPI_NO_OBLIGATORY_PROPS,
  DETECT_LANG_URL_ERROR,
  DETECT_LANG_FETCH_ERROR
};
const COOKIE_TEST_MESSAGE = { "message": "This is a test message about a biscuit.", "description": "A test message that is shown in a panel", "component": "Panel" };
const NUM_LINES_TEST_MESSAGE = { "message": "There {numLines, plural, =0 {are no queues} =1 {is one queue} other {are # queues}}.", "description": "A test message that is shown in a panel", "component": "Panel", "params": ["numLines"] };
const enGB = {
  COOKIE_TEST_MESSAGE,
  NUM_LINES_TEST_MESSAGE
};
const Locales = {
  en_US: "en-US",
  en_GB: "en-GB"
};
class BaseAdapter {
  /**
   * Every adapter has errors array and L10n property for localizing messages
  */
  constructor() {
    this.errors = [];
    this.l10n = new L10n().addMessages(enUS, Locales.en_US).addMessages(enGB, Locales.en_GB).setLocale(Locales.en_US);
  }
  /**
   * This method is used for adding error meassage with additional data
   * @param {String} message  - message text for the error
  */
  addError(message, statusCode) {
    const error = new AdapterError(this.config.category, this.config.adapterName, this.config.method, message, statusCode);
    this.errors.push(error);
  }
  addRemoteError(errorCode, message) {
    const error = new RemoteError(this.config.category, this.config.adapterName, this.config.method, errorCode, message);
    this.errors.push(error);
  }
  addWarning(errorCode, message) {
    const warning = new AdapterWarning(this.config.category, this.config.adapterName, this.config.method, errorCode, message);
    this.errors.push(warning);
  }
  /**
   * This method is used for uploding config property from current properties and default properties
   * @param {Object} config - properties with higher priority
   * @param {Object} defaultConfig - default properties
   * @return {Object} - configuration data
  */
  uploadConfig(config, defaultConfig) {
    let configRes = {};
    Object.keys(config).forEach((configKey) => {
      configRes[configKey] = config[configKey];
    });
    Object.keys(defaultConfig).forEach((configKey) => {
      if (!configRes[configKey]) {
        configRes[configKey] = defaultConfig[configKey];
      } else if (Array.isArray(configRes[configKey])) {
        configRes[configKey] = configRes[configKey].map((item, index) => {
          return { ...defaultConfig[configKey][index], ...item };
        });
      } else if (configRes[configKey] instanceof Object) {
        configRes[configKey] = { ...defaultConfig[configKey], ...configRes[configKey] };
      }
    });
    return configRes;
  }
  /**
   * This method is used for creating timeout Promise
   * @param {Number} ms - amount of ms for creation timeout
   * @return {Promise}
  */
  timeout(ms2) {
    return new Promise((resolve) => setTimeout(resolve, ms2));
  }
  /**
   * This method is used for fetching data using window.fetch
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {String} options.type - json is default, also it could be xml. This property defines output format.
   *                                    xml - response.text(), otherwise - response.json()
   * @return {Object|String}
  */
  async fetchWindow(url2, options = { type: "json" }) {
    if (url2) {
      try {
        const response = await window.fetch(url2, options.requestParams);
        if (!response.ok) {
          let statusText;
          if (response.status === 400) {
            const resultResponse = await response.json();
            statusText = resultResponse && resultResponse.message ? resultResponse.message : response.statusText;
          }
          this.addError(this.l10n.getMsg("BASIC_ADAPTER_URL_RESPONSE_FAILED", { statusCode: response.status, statusText }), response.status);
          return;
        }
        if (options.type === "xml") {
          return response.text();
        } else {
          return response.json();
        }
      } catch (error) {
        this.addError(this.l10n.getMsg("BASIC_ADAPTER_NO_DATA_FROM_URL", { url: url2 }));
      }
    } else {
      this.addError(this.l10n.getMsg("BASIC_ADAPTER_EMPTY_URL"));
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
  fetchWindowTimeout(url2, options) {
    if (url2) {
      let didTimeOut = false;
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          didTimeOut = true;
          reject(new Error("Request timed out", url2));
        }, options.timeout);
        window.fetch(url2, options.requestParams).then((response) => {
          clearTimeout(timeout);
          if (!didTimeOut) {
            if (options.type === "xml") {
              resolve(response.text());
            } else {
              resolve(response.json());
            }
          }
        }).catch((err) => {
          this.addError(this.l10n.getMsg("BASIC_ADAPTER_NO_DATA_FROM_URL", { url: url2 }));
          if (didTimeOut) return;
          reject(err);
        });
      });
    } else {
      this.addError(this.l10n.getMsg("BASIC_ADAPTER_EMPTY_URL"));
    }
  }
  /**
   * This method is used for fetching data using axios
   * @param {String} url - url for fetching data
   * @param {Object} options
   *     @param {Number} options.timeout - timeout ms amount
   * @return {Object|String}
  */
  async fetchAxios(url2, options) {
    if (url2) {
      const finalOptions = Object.assign({ url: encodeURI(decodeURI(url2)) }, options);
      try {
        const res = await axios(finalOptions);
        return res.data;
      } catch (error) {
        this.addError(this.l10n.getMsg("BASIC_ADAPTER_NO_DATA_FROM_URL", { url: url2 }));
      }
    } else {
      this.addError(this.l10n.getMsg("BASIC_ADAPTER_EMPTY_URL"));
    }
  }
  printError(error) {
    if (error.response) {
      S.getInstance().error("Alpheios error: unexpected response retrieving data from service", error);
    } else if (error.request) {
      S.getInstance().error("Alpheios error: no response from service", error);
    } else {
      S.getInstance().error("Alpheios error: unexpected error requesting data from service", error.message);
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
  async fetch(url2, options = {}) {
    let res;
    if (url2) {
      try {
        if (typeof window !== "undefined" && typeof window.fetch !== "undefined") {
          if (options && options.timeout > 0) {
            res = await this.fetchWindowTimeout(url2, options);
          } else {
            res = await this.fetchWindow(url2, options);
          }
        } else {
          res = await this.fetchAxios(url2, options);
        }
        return res;
      } catch (error) {
        this.addError(this.l10n.getMsg("BASIC_ADAPTER_UNKNOWN_ERROR", { message: error.message }));
      }
    } else {
      this.addError(this.l10n.getMsg("BASIC_ADAPTER_EMPTY_URL"));
    }
  }
}
const featuresArray$1 = [
  ["pofs", "part"],
  ["case", "grmCase"],
  ["gend", "gender"],
  ["decl", "declension"],
  ["conj", "conjugation"],
  ["area", "area"],
  ["age", "age"],
  ["geo", "geo"],
  ["freq", "frequency"],
  ["note", "note"],
  ["pron", "pronunciation"],
  ["kind", "kind"],
  ["src", "source"]
];
const featuresArrayAll$1 = [
  ["morph", "morph"],
  // morph is first because it may have data that overrides other features
  ["pofs", "part"],
  ["case", "grmCase"],
  ["gend", "gender"],
  ["decl", "declension"],
  ["conj", "conjugation"],
  ["num", "number"],
  ["tense", "tense"],
  ["voice", "voice"],
  ["mood", "mood"],
  ["pers", "person"],
  ["comp", "comparison"],
  ["stemtype", "stemtype"],
  ["derivtype", "derivtype"],
  ["dial", "dialect"]
];
const attributeBasedFeatures$1 = [
  ["paradigm", "cat"]
];
class AlpheiosLexiconTransformer {
  constructor(adapter, mappingData) {
    this.adapter = adapter;
    this.mappingData = mappingData;
    this.allowUnknownValues = true;
  }
  /**
   * This method extract parameter by defined path
   * @param {Object} source - json object to retrieve data from
   * @param {String} nameParam - parameter name that should be retrieved
   * @return {String|Object} - extracted data
  */
  extractData(source, nameParam) {
    const schema = {
      providerUri: ["RDF", "Annotation", "creator", "Agent", "about"],
      providerRights: ["RDF", "Annotation", "rights", "$"],
      inflections: ["rest", "entry", "infl"],
      dictData: ["rest", "entry", "dict"]
    };
    let res;
    if (schema[nameParam]) {
      res = source;
      for (const pathPart of schema[nameParam]) {
        if (res[pathPart]) {
          res = res[pathPart];
        } else {
          res = void 0;
          break;
        }
      }
    }
    return res;
  }
  /**
   * This method checks if data is array, if not - converts to array
   * @param {?} data - value that should be checked
   * @param {?} defaultData - default value, if data is null
   * @return {Array}
  */
  checkToBeArray(data2, defaultData = []) {
    let resData = data2;
    if (!Array.isArray(data2)) {
      if (data2) {
        resData = [data2];
      } else {
        resData = defaultData;
      }
    }
    return resData;
  }
  /**
   * This method creates hdwd from source json object
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @param {Symbol} direction - define the word direction
   * @return {Array} - array with parts for hdwr
  */
  collectHdwdArray(data2, term, direction) {
    let hdwd = [];
    if (data2 && !Array.isArray(data2) && (!data2.hdwd || !data2.hdwd.$) && term) {
      hdwd.push(term.prefix ? term.prefix.$ : "");
      hdwd.push(term.stem ? term.stem.$ : "");
      hdwd.push(term.suff ? term.suff.$ : "");
      if (direction === bl.LANG_DIR_RTL) {
        hdwd.reverse();
      }
    }
    return hdwd;
  }
  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * @return {String}  - language code
  */
  defineLanguage(data2, term) {
    let lemmaData = Array.isArray(data2) ? data2[0] : data2;
    if (!lemmaData.hdwd && term) {
      lemmaData.hdwd = {};
      lemmaData.hdwd.lang = term.lang;
    }
    return lemmaData.hdwd ? lemmaData.hdwd.lang : lemmaData.lang;
  }
  /**
   * This method defines language from dictData nd inflections data
   * @param {Object} data - jsonObj from adapter
   * @param {Object} term - data from inflections
   * Returned values:
   *     - {Homonym}
   *     - {undefined}
  */
  transformData(jsonObj, targetWord) {
    let lexemes = [];
    const annotationBody = this.checkToBeArray(jsonObj.RDF.Annotation.Body);
    const providerUri = this.extractData(jsonObj, "providerUri");
    const providerRights = this.extractData(jsonObj, "providerRights");
    const provider = new W(providerUri, providerRights);
    for (const lexeme of annotationBody) {
      const inflectionsJSON = this.checkToBeArray(this.extractData(lexeme, "inflections"));
      const inflectionsJSONTerm = inflectionsJSON.length > 0 ? inflectionsJSON[0].term : void 0;
      const dictData = this.extractData(lexeme, "dictData");
      const lemmaElements = this.checkToBeArray(dictData, inflectionsJSONTerm ? [inflectionsJSONTerm] : []);
      const language = this.defineLanguage(lemmaElements, inflectionsJSONTerm);
      if (!language) {
        this.adapter.addError(this.adapter.l10n.getMsg("MORPH_TRANSFORM_NO_LANGUAGE"));
        continue;
      }
      const reconstructHdwd = this.collectHdwdArray(dictData, inflectionsJSONTerm, this.mappingData.model.direction);
      if (reconstructHdwd.length > 0) {
        lemmaElements[0].hdwd.$ = reconstructHdwd.join("");
      }
      let lemmas = [];
      let lexemeSet = [];
      for (const entry of lemmaElements.entries()) {
        const index = entry[0];
        const elem = entry[1];
        const lemmaText = elem.hdwd && elem.hdwd.$ ? `${elem.hdwd.$}` : "";
        if (!lemmaText) {
          this.adapter.addError(this.adapter.l10n.getMsg("MORPH_TRANSFORM_NO_LEMMA"));
          continue;
        }
        const lemma = this.mappingData.parseLemma(lemmaText, language);
        lemmas.push(lemma);
        const features = featuresArray$1;
        for (const feature of features) {
          this.mappingData.mapFeature(lemma, elem, ...feature, this.allowUnknownValues);
        }
        let shortdefs = [];
        let meanings = lexeme.rest.entry.mean;
        if (!Array.isArray(meanings)) {
          meanings = [meanings];
        }
        meanings = meanings.filter((m2) => m2);
        if (lemmaElements.length > 1) {
          if (meanings && meanings[index] && meanings[index].$) {
            const meaning = meanings[index];
            shortdefs.push(W.getProxy(
              provider,
              this.mappingData.parseMeaning(meaning, lemmas[index].word)
            ));
          }
        } else {
          const sDefs = meanings.filter((m2) => m2.$).map((meaning) => {
            return W.getProxy(
              provider,
              this.mappingData.parseMeaning(meaning, lemma.word)
            );
          });
          shortdefs.push(...sDefs);
        }
        let lexmodel = new Y(lemma, []);
        lexmodel.meaning.appendShortDefs(shortdefs);
        lexemeSet.push(W.getProxy(provider, lexmodel));
      }
      if (lemmas.length === 0) {
        continue;
      }
      const inflections = [];
      for (const inflectionJSON of inflectionsJSON) {
        const stem = inflectionJSON.term && inflectionJSON.term.stem ? inflectionJSON.term.stem.$ : null;
        const form = inflectionJSON.term && inflectionJSON.term.form ? inflectionJSON.term.form.$ : null;
        const suffix = inflectionJSON.term && inflectionJSON.term.suff ? inflectionJSON.term.suff.$ : null;
        const prefix = inflectionJSON.term && inflectionJSON.term.pref ? inflectionJSON.term.pref.$ : null;
        const xmpl = inflectionJSON.xmpl ? inflectionJSON.xmpl.$ : null;
        const inflWord = stem || form;
        let inflection;
        try {
          inflection = new rt(inflWord, this.mappingData.model.languageID, suffix, prefix, xmpl);
        } catch (e) {
          this.adapter.addError(this.adapter.l10n.getMsg("MORPH_TRANSFORM_INFLECTION_ERROR", { error: e.message }));
          continue;
        }
        if (targetWord) {
          inflection.addFeature(new l$1(l$1.types.fullForm, targetWord, this.mappingData.model.languageID));
        }
        for (const f2 of featuresArrayAll$1) {
          try {
            this.mappingData.mapFeature(inflection, inflectionJSON, ...f2, this.allowUnknownValues);
            this.mappingData.overrideInflectionFeatureIfRequired(l$1.types[f2[1]], inflection, lemmas);
          } catch (e) {
          }
        }
        for (const f2 of attributeBasedFeatures$1) {
          try {
            this.mappingData.mapFeatureByAttribute(inflection, inflectionJSON, ...f2, this.allowUnknownValues);
            this.mappingData.overrideInflectionFeatureIfRequired(l$1.types[f2[1]], inflection, lemmas);
          } catch (e) {
          }
        }
        if (inflection[l$1.types.grmCase] || inflection[l$1.types.tense] || inflection[l$1.types.mood] || inflection[l$1.types.voice] || inflection[l$1.types.person] || inflection[l$1.types.comparison] || inflection[l$1.types.stemtype] || /** greek - morpheus **/
        inflection[l$1.types.derivtype] || /** greek - morpheus **/
        inflection[l$1.types.dialect] || /** greek **/
        inflection[l$1.types.morph] || /** arabic - aramorph **/
        inflection[l$1.types.kaylo] || /** syriac - sedra **/
        inflection[l$1.types.state] || /** syriac - sedra **/
        inflection[l$1.types.example]) {
          inflections.push(inflection);
        }
        for (const lemma of lemmas) {
          if (!lemma.features[l$1.types.part]) {
            this.mappingData.mapFeature(lemma, inflectionJSON, "pofs", "part", this.allowUnknownValues);
          }
          if (!lemma.features[l$1.types.declension] && (!lemma.features[l$1.types.part] || lemma.features[l$1.types.part].isEqual(inflection[l$1.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, "decl", "declension", this.allowUnknownValues);
          }
          if (!lemma.features[l$1.types.conjugation] && (!lemma.features[l$1.types.part] || lemma.features[l$1.types.part].isEqual(inflection[l$1.types.part]))) {
            this.mappingData.mapFeature(lemma, inflectionJSON, "conj", "conjugation", this.allowUnknownValues);
          }
        }
      }
      const aggregated = this.mappingData.aggregateLexemes(lexemeSet, inflections);
      lexemes.push(...aggregated);
    }
    if (lexemes.length > 0) {
      return new nt(lexemes, targetWord);
    } else {
      return void 0;
    }
  }
}
const engine = { "lat": ["whitakerLat"], "grc": ["morpheusgrc"], "ara": ["aramorph"], "per": ["hazm"], "gez": ["traces"], "syr": ["sedra"] };
const url$3 = "https://morph.alpheios.net/api/v1/analysis/word?word=r_WORD&engine=r_ENGINE&lang=r_LANG&clientId=r_CLIENT";
const allowUnknownValues = true;
const featuresArray = [["pofs", "part"], ["case", "grmCase"], ["gend", "gender"], ["decl", "declension"], ["conj", "conjugation"], ["area", "area"], ["age", "age"], ["geo", "geo"], ["freq", "frequency"], ["note", "note"], ["pron", "pronunciation"], ["kind", "kind"], ["src", "source"]];
const featuresArrayAll = [["pofs", "part"], ["case", "grmCase"], ["gend", "gender"], ["decl", "declension"], ["conj", "conjugation"], ["num", "number"], ["tense", "tense"], ["voice", "voice"], ["mood", "mood"], ["pers", "person"], ["comp", "comparison"], ["stemtype", "stemtype"], ["derivtype", "derivtype"], ["dial", "dialect"], ["morph", "morph"]];
const attributeBasedFeatures = [["paradigm", "cat"]];
const DefaultConfig$7 = {
  engine,
  url: url$3,
  allowUnknownValues,
  featuresArray,
  featuresArrayAll,
  attributeBasedFeatures
};
class ImportMorphData {
  /**
     * Creates an ImportMorphData object for the language provided.
     * @param {Function<LanguageModel>} model - A language model of the import data.
     * @param {String} engine - a code for the engine that is using this mapping model
     */
  constructor(model, engine2) {
    this.model = model;
    this.engine = engine2;
    for (const featureName of Object.keys(this.model.features)) {
      this.addFeature(featureName);
    }
    this.aggregateLexemes = function(lexemeSet, inflections) {
      let lexemes = [];
      for (const lex of lexemeSet) {
        if (this.reportLexeme(lex)) {
          lex.inflections = inflections.map((inflection) => inflection.clone());
          lexemes.push(lex);
        }
      }
      return lexemes;
    };
    this.parseLemma = function(lemma) {
      return new ge(lemma, this.model.languageID);
    };
    this.parseMeaning = function(meaning, targetWord) {
      const lang = meaning.lang ? meaning.lang : bl.STR_LANG_CODE_ENG;
      return new Ze(meaning.$, lang, "text/plain", targetWord);
    };
    this.parseProperty = function(propertyName, propertyValue, inputElem) {
      let propertyValues = [];
      if (propertyName === "decl") {
        propertyValues = propertyValue.split("&").map((p2) => p2.trim());
      } else if (propertyName === "comp" && propertyValue === "positive") {
        propertyValues = [];
      } else {
        propertyValues = [propertyValue];
      }
      return propertyValues;
    };
    this.reportLexeme = function(lexeme) {
      return lexeme.lemma.features[l$1.types.part];
    };
    this.inflectionOverrides = {};
  }
  /**
     * Adds a grammatical feature whose values to be mapped.
     * @param {string} featureName - A name of a grammatical feature (i.e. declension, number, etc.)
     * @return {Object} An object that represent a newly created grammatical feature.
     */
  addFeature(featureName) {
    this[featureName] = {};
    const model = this.model;
    this[featureName].add = function add(providerValue, alpheiosValue) {
      this[providerValue] = alpheiosValue;
      return this;
    };
    this[featureName].get = function get(providerValue, sortOrder = 1, allowUnknownValues2 = false) {
      let mappedValue = [];
      if (!this.importer.has(providerValue)) {
        if (model.typeFeature(featureName).hasValue(providerValue) || model.typeFeature(featureName).valuesUnrestricted) {
          mappedValue = model.typeFeature(featureName).createFeature(providerValue, sortOrder);
        } else {
          const message = `Unknown value "${providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues2})`;
          if (allowUnknownValues2) {
            mappedValue = model.typeFeature(featureName).createFeature(providerValue, sortOrder);
          } else {
            throw new Error(message);
          }
        }
      } else {
        const tempValue = this.importer.get(providerValue);
        if (Array.isArray(tempValue)) {
          mappedValue = model.typeFeature(featureName).createFeatures(tempValue, sortOrder);
        } else {
          mappedValue = model.typeFeature(featureName).createFeature(tempValue, sortOrder);
        }
      }
      return mappedValue;
    };
    this[featureName].getMultiple = function get(data2, allowUnknownValues2 = false) {
      let values = [];
      for (const item of data2) {
        if (this.importer.has(item.providerValue)) {
          const value = this.importer.get(item.providerValue);
          if (Array.isArray(value)) {
            values = value;
          } else {
            values = [[value, item.sortOrder]];
          }
        } else if (model.typeFeature(featureName).hasValue(item.providerValue) || model.typeFeature(featureName).valuesUnrestricted) {
          values.push([item.providerValue, item.sortOrder]);
        } else {
          const message = `Unknown value "${item.providerValue}" of feature "${featureName}" for ${model.languageCode} (allowed = ${allowUnknownValues2})`;
          if (allowUnknownValues2) {
            values.push([item.providerValue, item.sortOrder]);
          } else {
            throw new Error(message);
          }
        }
      }
      return model.typeFeature(featureName).createFeatures(values);
    };
    this[featureName].importer = new Qe();
    return this[featureName];
  }
  /**
   * Add an engine-specific lexeme aggregator
   */
  setLexemeAggregator(callback) {
    this.aggregateLexemes = callback;
  }
  /**
  /**
   * Add an engine-specific lemma parser
   */
  setLemmaParser(callback) {
    this.parseLemma = callback;
  }
  setMeaningParser(callback) {
    this.parseMeaning = callback;
  }
  /**
   * Add an engine-specific property parser
   */
  setPropertyParser(callback) {
    this.parseProperty = callback;
  }
  /**
   * Add an engine-specific lexeme filter
   */
  setLexemeFilter(callback) {
    this.reportLexeme = callback;
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
  mapFeature(model, inputElem, inputName, featureName, allowUnknownValues2) {
    const inputItem = inputElem[inputName];
    if (inputItem && (Array.isArray(inputItem) || inputItem.$)) {
      let values = [];
      if (Array.isArray(inputItem)) {
        for (const e of inputItem) {
          values.push(...this.parseProperty(inputName, e.$, inputElem));
        }
      } else {
        values = this.parseProperty(inputName, inputItem.$, inputElem);
      }
      if (values.length > 0) {
        values = values.map((v2) => {
          return { providerValue: v2, sortOrder: inputItem.order ? inputItem.order : 1 };
        });
        const feature = this[l$1.types[featureName]].getMultiple(values, allowUnknownValues2);
        model.addFeature(feature);
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
  mapFeatureByAttribute(model, inputElem, inputName, attributeName, allowUnknownValues2) {
    const inputItem = inputElem[inputName];
    let featureName;
    if (inputItem && (Array.isArray(inputItem) || inputItem.$)) {
      let values = [];
      if (Array.isArray(inputItem)) {
        for (const e of inputItem) {
          if (featureName && featureName !== e[attributeName]) {
            S.getInstance().warn("Mutiple feature values with mismatching attribute value", inputElem);
          }
          featureName = e[attributeName];
          values.push(...this.parseProperty(inputName, e.$, inputElem));
        }
      } else {
        featureName = inputItem[attributeName];
        values = this.parseProperty(inputName, inputItem.$, inputElem);
      }
      if (values.length > 0) {
        values = values.map((v2) => {
          return { providerValue: v2, sortOrder: inputItem.order ? inputItem.order : 1 };
        });
        const feature = this[l$1.types[featureName]].getMultiple(values, allowUnknownValues2, inputItem.cat);
        model.addFeature(feature);
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
  overrideInflectionFeatureIfRequired(featureType, inflection, lemmas) {
    if (this.inflectionOverrides[featureType]) {
      const override = this.inflectionOverrides[featureType](inflection, lemmas);
      if (override.withLemma) {
        for (const lemma of lemmas.filter((l2) => l2.features[featureType])) {
          inflection.addFeature(lemma.features[featureType]);
        }
      } else if (override.withFeature !== null) {
        inflection.addFeature(override.withFeature);
      }
    }
  }
}
const data$5 = new ImportMorphData(tt$1, "whitakerLat");
data$5.inflectionOverrides = {
  [l$1.types.conjugation]: (i2, ls2) => {
    return {
      withLemma: true,
      withFeature: null
    };
  }
};
data$5.addFeature(l$1.types.gender).importer.map("common", [[bl.GEND_MASCULINE, 1], [bl.GEND_FEMININE, 2]]).map("all", [[bl.GEND_MASCULINE, 1], [bl.GEND_FEMININE, 2], [bl.GEND_NEUTER, 3]]);
data$5.addFeature(l$1.types.tense).importer.map("future_perfect", bl.TENSE_FUTURE_PERFECT);
data$5.setPropertyParser(function(propertyName, propertyValue, inputElem) {
  let propertyValues = [];
  if (propertyName === "decl") {
    propertyValues = propertyValue.split("&").map((p2) => p2.trim());
  } else if (propertyName === "comp" && propertyValue === "positive") {
    propertyValues = [];
  } else if (propertyName === "conj" && propertyValue.match(/5th|6th|7th|8th/)) {
    propertyValues = [bl.TYPE_IRREGULAR];
  } else {
    propertyValues = [propertyValue];
  }
  return propertyValues;
});
data$5.setLexemeAggregator(
  function(lexemeSet, inflections) {
    let lexemes = [];
    for (let lex of lexemeSet) {
      if (this.reportLexeme(lex)) {
        if (lex.meaning.shortDefs.length === 0 && lexemeSet.length > 1) {
          for (let otherLex of lexemeSet) {
            if (otherLex.meaning.shortDefs.length > 0 && otherLex.lemma.isFullHomonym(lex.lemma)) {
              let featuresMatch = true;
              for (const feature of Object.entries(lex.lemma.features)) {
                if (feature[0] !== l$1.types.frequency && feature[0] !== l$1.types.source && feature[0] !== l$1.types.age && !feature[1].isEqual(otherLex.lemma.features[feature[0]])) {
                  featuresMatch = false;
                  break;
                }
              }
              if (featuresMatch) {
                if (lex.lemma.features[l$1.types.frequency].compareTo(otherLex.lemma.features[l$1.types.frequency]) < 1) {
                  otherLex.addAltLemma(otherLex.lemma);
                  otherLex.lemma = lex.lemma;
                } else {
                  otherLex.addAltLemma(lex.lemma);
                }
              } else {
                lex.inflections = inflections.map((inflection) => inflection.clone());
                lexemes.push(lex);
              }
            }
          }
        } else {
          lex.inflections = inflections.map((inflection) => inflection.clone());
          lexemes.push(lex);
        }
      }
    }
    return lexemes;
  }
);
data$5.setLemmaParser(function(lemma) {
  let parsed, primary;
  let parts = [];
  const lemmas = lemma.split(", ");
  for (const [index, l2] of lemmas.entries()) {
    const normalized = l2.split(" ")[0];
    if (index === 0) {
      primary = normalized;
    }
    parts.push(normalized);
  }
  if (primary) {
    parsed = new ge(primary, this.model.languageCode, parts);
  }
  return parsed;
});
let data$4 = new ImportMorphData(Ht, "morpheusgrc");
data$4.inflectionOverrides = {
  // Morpheus uses 'irregular' as pofs for some pronouns, override with lemma
  // the dictionary entry's conjugation if it's available
  [l$1.types.part]: (i2, ls2) => {
    return {
      withLemma: i2[l$1.types.part].value === bl.TYPE_IRREGULAR && ls2.some((l2) => l2.features[l$1.types.part].value === bl.POFS_PRONOUN),
      withFeature: null
    };
  },
  // for some irregular adjectives, the compartive is only specified in the morph flags
  [l$1.types.comparison]: (i2, ls2) => {
    const retVal = {
      withLemma: false,
      withFeature: null
    };
    if (i2[l$1.types.morph].value === "irreg_comp" && ls2.some((l2) => l2.features[l$1.types.part].value === bl.POFS_ADJECTIVE)) {
      retVal.withFeature = new l$1(l$1.types.comparison, bl.COMP_COMPARITIVE, Ht.languageID);
    } else if (i2[l$1.types.morph].value === "irreg_superl" && ls2.some((l2) => l2.features[l$1.types.part].value === bl.POFS_ADJECTIVE)) {
      retVal.withFeature = new l$1(l$1.types.comparison, bl.COMP_SUPERLATIVE, Ht.languageID);
    }
    return retVal;
  }
};
data$4.addFeature(l$1.types.gender).importer.map("masculine feminine", [[bl.GEND_MASCULINE, 1], [bl.GEND_FEMININE, 2]]);
data$4.addFeature(l$1.types.declension).importer.map("1st & 2nd", [[bl.ORD_1ST, 1], [bl.ORD_2ND, 2]]);
data$4.setPropertyParser(function(propertyName, propertyValue, inputElem) {
  let propertyValues = [];
  if (propertyName === "decl") {
    propertyValues = propertyValue.split("&").map((p2) => p2.trim());
  } else if (propertyName === "comp" && propertyValue === "positive") {
    propertyValues = [];
  } else if (propertyName === "pofs" && propertyValue === "irregular" && inputElem.hdwd && inputElem.hdwd.$ === "τίς") {
    propertyValues = [bl.POFS_PRONOUN];
  } else {
    propertyValues = [propertyValue];
  }
  return propertyValues;
});
const data$3 = new ImportMorphData(st$1, "aramorph");
let data$2 = new ImportMorphData(Gt, "hazm");
data$2.setLexemeFilter(function(lexeme) {
  return Boolean(lexeme.lemma.word);
});
const data$1 = new ImportMorphData(Jt, "traces");
const data = new ImportMorphData(be$1, "sedra");
data.setLexemeFilter(function(lexeme) {
  return Boolean(lexeme.meaning.shortDefs.length > 0 || lexeme.lemma.features[l$1.types.part]);
});
data.setMeaningParser(function(meaning, targetWord) {
  const lang = meaning.lang ? meaning.lang : bl.STR_LANG_CODE_ENG;
  const meaningText = meaning.$ || "";
  return new Ze(meaningText, lang, "text/html", targetWord);
});
data.setPropertyParser(function(propertyName, propertyValue, inputElem) {
  let propertyValues = [];
  if (propertyName === "paradigm") {
    propertyValues = [propertyValue.replace(/"/g, "")];
  } else if (propertyName === "src") {
    propertyValues = [propertyValue.replace(/\[from sedra.bethmardutho.org, .*?\]/g, "")];
  } else {
    propertyValues = [propertyValue];
  }
  return propertyValues;
});
class EnginesSet {
  /**
   * @param {Object} adapterConfigEngines - it is the following format - Symbol(Latin): ["whitakerLat"]
  */
  constructor(adapterConfigEngines) {
    this.engine = adapterConfigEngines;
  }
  /**
   * This method returns engine class by languageID
   * @param {Symbol} languageID
   * @return {Engine Class}
  */
  getEngineByCode(languageID) {
    const langCode = A.getLanguageCodeFromId(languageID);
    if (this.engine[languageID] || this.engine[langCode]) {
      const engineCode = (this.engine[languageID] ?? this.engine[langCode])[0];
      const allEngines = new Map([data$5, data$4, data$3, data$2, data$1, data].map((e) => {
        return [e.engine, e];
      }));
      return allEngines.get(engineCode);
    }
  }
  /**
   * This method returns engine class by languageCode
   * @param {String} languageCode
   * @return {Engine Class}
  */
  getEngineByCodeFromLangCode(languageCode) {
    const languageID = A.getLanguageIdFromCode(languageCode);
    return this.getEngineByCode(languageID);
  }
}
class AlpheiosTuftsAdapter extends BaseAdapter {
  /**
   * Tufts adapter uploads config data, uploads available engines and creates EnginesSet from them
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$7);
    this.uploadEngines(this.config.engine);
    this.engineSet = new EnginesSet(this.engines);
    this.sourceData = config.sourceData;
  }
  /**
   * This method creates engines object with the following format:
   * LanguageID: array of available engines from config files, for example Symbol(Latin): ["whitakerLat"]
   * @param {Object} engineConfig - engines config data
  */
  uploadEngines(engineConfig) {
    if (this.engine === void 0) {
      this.engines = {};
    }
    Object.keys(engineConfig).forEach((langCode) => {
      const langID = A.getLanguageIdFromCode(langCode);
      if (langID !== bl.LANG_UNDEFINED && this.engines[langID] === void 0) {
        this.engines[langID] = engineConfig[langCode];
      }
      this.engines[langCode] = engineConfig[langCode];
    });
  }
  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} word - a word for getting homonym
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym(languageID, word) {
    let res;
    try {
      if (this.sourceData) {
        res = this.sourceData;
      } else {
        const url2 = this.prepareRequestUrl(languageID, word);
        if (!url2) {
          this.addError(this.l10n.getMsg("MORPH_TUFTS_NO_ENGINE_FOR_LANGUAGE", { languageID: languageID.toString() }));
          return;
        }
        res = await this.fetch(url2);
        if (res.constructor.name === "AdapterError") {
          return;
        }
      }
      if (res) {
        const mappingData = this.engineSet.getEngineByCode(languageID);
        if (!mappingData) {
          this.addError(this.l10n.getMsg("MORPH_TRANSFORM_NO_MAPPING_DATA", { language: languageID.toString() }));
          return;
        }
        const transformAdapter = new AlpheiosLexiconTransformer(this, mappingData, this);
        let homonym = transformAdapter.transformData(res, word);
        if (!homonym) {
          this.addError(this.l10n.getMsg("MORPH_NO_HOMONYM", { word, languageID: languageID.toString() }));
          return;
        }
        if (homonym && homonym.lexemes) {
          homonym.lexemes.sort(Y.getSortByTwoLemmaFeatures(l$1.types.frequency, l$1.types.part));
        }
        return homonym;
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("MORPH_UNKNOWN_ERROR", { message: error.message }));
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
  prepareRequestUrl(languageID, word) {
    const langCode = A.getLanguageCodeFromId(languageID);
    const engine2 = this.engineSet.getEngineByCode(languageID);
    if (engine2) {
      const code = engine2.engine;
      return this.config.url.replace("r_WORD", encodeURIComponent(word)).replace("r_ENGINE", code).replace("r_LANG", langCode).replace("r_CLIENT", this.config.clientId);
    } else {
      return null;
    }
  }
}
const o = [];
for (let s = 0; s < 256; ++s)
  o.push((s + 256).toString(16).slice(1));
function p(s, e = 0) {
  return (o[s[e + 0]] + o[s[e + 1]] + o[s[e + 2]] + o[s[e + 3]] + "-" + o[s[e + 4]] + o[s[e + 5]] + "-" + o[s[e + 6]] + o[s[e + 7]] + "-" + o[s[e + 8]] + o[s[e + 9]] + "-" + o[s[e + 10]] + o[s[e + 11]] + o[s[e + 12]] + o[s[e + 13]] + o[s[e + 14]] + o[s[e + 15]]).toLowerCase();
}
let E;
const g = new Uint8Array(16);
function w2() {
  if (!E) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    E = crypto.getRandomValues.bind(crypto);
  }
  return E(g);
}
const m = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), R = { randomUUID: m };
function I(s, e, t) {
  if (R.randomUUID && !s)
    return R.randomUUID();
  s = s || {};
  const r = s.random ?? s.rng?.() ?? w2();
  if (r.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, p(r);
}
class i {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor(e = {}) {
    this.role = void 0, this.type = i.types.GENERIC, this.ID = I(), this.body = e;
  }
  static isKnownType(e) {
    return Object.values(i.types).includes(e);
  }
}
i.roles = {
  REQUEST: "Request",
  RESPONSE: "Response"
};
i.types = {
  GENERIC: "ALPHEIOS_MESSAGE"
  // A generic message of general purpose
};
class f extends i {
  /**
   * @param {object} [body={}] - A plain JS object (with no methods) representing a body of the message.
   */
  constructor(e = {}) {
    super(e), this.role = i.roles.REQUEST, this.header = {};
  }
}
class l extends i {
  /**
   * @param {RequestMessage} request - A request that initiated this response. Used to copy routing information mostly.
   * @param {object} [body={}] - A body of the response, a plain JS object with no methods.
   * @param {string} responseCode - A code to indicate results of the request handling: Success, Failure, etc.
   * @param {object} options - Additional non-obligatory parameters:
   * @param {number} options.errorCode - An error code indicating why request has failed.
   */
  constructor(e, t = {}, r = l.responseCodes.UNDEFINED, { errorCode: n } = {}) {
    if (super(t), !e) throw new Error("Request is not provided");
    if (!e.ID) throw new Error("Request has no ID");
    if (this.role = i.roles.RESPONSE, this.requestHeader = e.header || {}, this.requestID = e.ID, this.responseCode = r, this.errorCode = 0, r === l.responseCodes.ERROR) {
      if (!n)
        throw new Error("An error code must be provided for failed requests");
      this.errorCode = n;
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
  static Success(e, t = {}) {
    return new this(e, t, l.responseCodes.SUCCESS);
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
  static Error(e, t, r) {
    return new this(e, t, l.responseCodes.ERROR, { errorCode: r });
  }
  /**
   * Checks if this message is a response (i.e. if it follows a response message format and conventions).
   *
   * @param {RequestMessage | ResponseMessage} message - A request or response message to be tested.
   * @returns {boolean} - True if the message is a response, false otherwise.
   */
  static isResponse(e) {
    return e.role && e.role === i.roles.RESPONSE && e.requestHeader && e.requestID;
  }
}
l.responseCodes = {
  // Request was processed successfully.
  // In this case a message body may contain a response data object or be empty.
  SUCCESS: "Success",
  // There is no information about what was the outcome of a request.
  UNDEFINED: "Undefined",
  // Request failed. A message will contain information about an error.
  ERROR: "Error"
};
l.errorCodes = {
  // A remote service has not been initialized yet
  SERVICE_UNINITIALIZED: 1,
  // An error occurred during initialization of a remote service
  INITIALIZATION_ERROR: 2,
  // Request of unknown type is received by a remote service
  UNKNOWN_REQUEST: 3,
  // An unspecified error has occurred inside a remote service
  INTERNAL_ERROR: 4
};
class _ {
  constructor() {
    this.resolve = null, this.reject = null, this.promise = new Promise(this.executor.bind(this));
  }
  executor(e, t) {
    this.resolve = e, this.reject = t;
  }
}
let h = /* @__PURE__ */ new Map();
class u {
  /**
   * Creates an instance of a messaging service.
   *
   * @param {string} name - A name of a messaging service. Useful in identifying the service when
   *        several clients need to share the same instance of a service.
   * @param {Destination || Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   */
  constructor(e, t = []) {
    if (!e) throw new Error(u.errMsgs.NO_NAME);
    this.name = e, this._messages = /* @__PURE__ */ new Map(), this._destinations = /* @__PURE__ */ new Map(), Array.isArray(t) || (t = [t]), t.forEach((r) => this.registerDestination(r));
  }
  /**
   * Check if service with a given name has already been created.
   *
   * @param {string} name - A name of a service.
   * @returns {boolean} Returns true if service has already been created or false otherwise.
   */
  static hasService(e) {
    return h.has(e);
  }
  /**
   * Returns an instance of a service or `undefined` if service does not exist.
   *
   * @param {string} name - A name of a service.
   * @returns {MessagingService|undefined} If service exists, returns an instance of a service.
   *          If it does not, returns `undefined`.
   */
  static getService(e) {
    return h.get(e);
  }
  /**
   * Creates an instance of a MessagingService and adds it to the map of instances.
   *
   * @param {string} name - A map of messaging service to create.
   * @param {Destination|Destination[]} destinations - One or several
   *        destination objects to be used with the messaging service.
   * @returns {MessagingService} An instance of a newly created messaging service.
   */
  static createService(e, t = []) {
    const r = new u(e, t);
    return h.set(e, r), r;
  }
  /**
   * Removes an instance of a MessagingService form the map of instances.
   *
   * @param {string} name - A name of a service to remove.
   * @returns {boolean} True if a service in the map existed and has been removed,
   *          or false if the service does not exist.
   */
  static deleteService(e) {
    return h.delete(e);
  }
  /**
   * Registers a new destination by adding it to the destinations map and setting a response callback.
   *
   * @param {Destination} destination - A destination object to register.
   */
  registerDestination(e) {
    if (this._destinations.has(e.name))
      throw new Error("Destination already exists");
    this._destinations.set(e.name, e), e.ableToSend && e.registerResponseCallback(this.dispatchMessage.bind(this));
  }
  /**
   * Updates a destinations that is already registered.
   *
   * @param {Destination} destination - A destination object to register.
   */
  updateDestination(e) {
    if (!this._destinations.has(e.name))
      throw new Error("Cannot update a destination that does not exist");
    this._destinations.get(e.name).deregister(), this._destinations.set(e.name, e), e.ableToSend && e.registerResponseCallback(this.dispatchMessage.bind(this));
  }
  /**
   * A function to handle incoming messages.
   *
   * @param {ResponseMessage} message - An incoming response message.
   */
  dispatchMessage(e) {
    if (!i.isKnownType(e.type))
      return;
    if (!l.isResponse(e)) {
      console.error("A message not following a response format will be ignored:", e);
      return;
    }
    if (!this._messages.has(e.requestID))
      return;
    const t = this._messages.get(e.requestID);
    clearTimeout(t.timeoutID), e.responseCode === l.responseCodes.ERROR ? t.reject(e) : t.resolve(e), this._messages.delete(e.requestID);
  }
  /**
   * Registers an outgoing request within a request map. Returns a promise that will be fulfilled when
   * a response will be received or rejected when a timeout will expire.
   *
   * @param {RequestMessage} request - An outgoing request.
   * @param {number} timeout - A number of milliseconds we'll wait for response before rejecting a promise.
   * @returns {Promise} - A promise that will be resolved with the message response or rejected with an error info.
   */
  registerRequest(e, t = 1e4) {
    if (this._messages.has(e.ID)) throw new Error(`Request with ${e.ID} ID is already registered`);
    let r = new _(e);
    return this._messages.set(e.ID, r), r.timeoutID = setTimeout((n) => {
      r.reject(new Error(`Timeout has been expired for a message with request ID ${e.ID}`)), this._messages.delete(n);
    }, t), r.promise;
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
  sendRequestTo(e, t, r = 1e4) {
    if (!e)
      throw new Error("Destination name is not provided");
    if (!this._destinations.has(e))
      throw new Error(`Unknown destination ${e}`);
    try {
      this._destinations.get(e).sendRequest(t);
    } catch (n) {
      throw new Error(`Request to ${e} failed: ${n.message}`);
    }
    return this.registerRequest(t, r);
  }
}
u.errMsgs = {
  NO_NAME: "MessagingService must be created with a name"
};
class c {
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
  constructor({ name: e, commModes: t = [c.commModes.SEND] } = {}) {
    if (!e)
      throw new Error(c.errMsgs.NO_DESTINATION);
    this.name = e, this.commModes = t, this._responseCallback = null;
  }
  /**
   * Checks if a SEND communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the SEND mode.
   */
  get ableToSend() {
    return this.commModes.includes(c.commModes.SEND);
  }
  /**
   * Checks if a RECEIVE communication mode is enabled for this destination.
   *
   * @returns {boolean} True if destination is in the RECEIVE mode.
   */
  get ableToReceive() {
    return this.commModes.includes(c.commModes.RECEIVE);
  }
  /**
   * This function will be called by the messaging service when a destination is deregistered or deleted.
   * It must do a cleanup necessary for a destination object. Its functionality should be defined within a subclass.
   */
  deregister() {
    throw new Error(c.errMsgs.DEREGISTER_NOT_DEFINED);
  }
}
c.commModes = {
  /*
  If a SEND mode is enabled, this destination can send messages to other destinations of the same type.
   */
  SEND: "Send",
  /*
  A RECEIVE mode enables destination to receive messages from other destinations of the same type.
   */
  RECEIVE: "Receive"
};
c.errMsgs = {
  NO_DESTINATION: "Destination name is missing",
  DEREGISTER_NOT_DEFINED: "Deregister method must be defined in a subclass"
};
class d extends c {
  /**
   * @param {object} [configuration={}] - An object containing configuration parameters.
   * @param {string} configuration.name - A name of a destination (for addressing a destination in a messaging service).
   * @param {string[]} configuration.commModes - A list of communication modes that should be enabled for
   *        a destination. A list of available modes is defined in Destination.commModes.
   * @param {string} configuration.targetURL - A URL of a document within an iframe where messages will be sent.
   * @param {string} configuration.targetIframeID - An ID of an iframe element (without `#`).
   * @param {Function} configuration.receiverCB - A function that will be called when destination is in the
   *        RECEIVE mode and the incoming request has arrived. This function will receive two parameters:
   *        the message object and the function that will need to be called in order to send a response back.
   */
  constructor({ name: e, commModes: t, targetURL: r, targetIframeID: n, receiverCB: a } = {}) {
    if (super({ name: e, commModes: t }), this._targetURL = null, this._targetIframeID = null, this._registeredRequestHandler = null, this._registeredResponseHandler = null, this.ableToSend) {
      if (!r)
        throw new Error(d.errMsgs.NO_TARGET_URL);
      if (!n)
        throw new Error(d.errMsgs.NO_TARGET_IFRAME_ID);
      this._targetURL = r, this._targetIframeID = n;
    }
    if (this.ableToReceive) {
      if (!a)
        throw new Error(d.errMsgs.NO_RECEIVER_CB);
      this._registeredRequestHandler = this._requestHandler.bind(this, a), window.addEventListener("message", this._registeredRequestHandler, false);
    }
  }
  /**
   * Registers a function to call when a response from destination is received.
   *
   * @param {Function} callbackFn - A function to be called when response is received.
   */
  registerResponseCallback(e) {
    this._registeredResponseHandler = this._responseHandler.bind(this), window.addEventListener("message", this._registeredResponseHandler, false), this._responseCallback = e;
  }
  /**
   * A function that will be called to send a request from origin to destination.
   *
   * @param {RequestMessage} requestMessage - A request message object.
   */
  sendRequest(e) {
    const t = document.querySelector(`#${this._targetIframeID}`);
    if (!t)
      throw new Error(`An #${this._targetIframeID} iframe does not exist in the document`);
    const r = t.contentWindow;
    let n = false;
    try {
      n = r.location.href === "about:blank";
    } catch (a) {
      if (!(a instanceof DOMException)) throw a;
    }
    if (n)
      throw new Error(`Target document ${this._targetURL} is not loaded yet`);
    try {
      r.postMessage(e, this._targetURL);
    } catch (a) {
      if (a instanceof DOMException && a.name === "DataCloneError")
        console.warn("Request that does not confirm to the structured clone algorithm cannot be sent, will try to convert it to a plain object and send again"), e.body = d._toPostable(e.body), r.postMessage(e, this._targetURL);
      else
        throw a;
    }
  }
  /**
   * A function that is used to send a response from destination to origin.
   *
   * @param {ResponseMessage} responseMessage - A response message object.
   */
  sendResponse(e) {
    try {
      window.parent.postMessage(e, e.requestHeader.origin);
    } catch (t) {
      if (t instanceof DOMException && t.name === "DataCloneError")
        console.warn("Response that does not confirm to the structured clone algorithm cannot be sent, will try to convert it to a plain object and send again"), e.body = d._toPostable(e.body), window.parent.postMessage(e, e.requestHeader.origin);
      else
        throw t;
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
  _requestHandler(e, t) {
    if (!d._isSupportedEvent(t))
      return;
    let r = t.data;
    r.header.origin = t.origin, e(r, this.sendResponse.bind(this));
  }
  /**
   * An internal handler that is called when response arrives from destination to origin.
   *
   * @param {Event} event - A browser's event object.
   * @private
   */
  _responseHandler(e) {
    if (!d._isSupportedEvent(e))
      return;
    const t = e.data;
    this._responseCallback && this._responseCallback(t);
  }
  /**
   * Checks whether an event contains a well-formed Alpheios message object.
   *
   * @param {Event} event - An event that may contain a message object in a `data` field.
   * @returns {boolean} - True if an event contains a well-formed Alpheios message object, false otherwise.
   * @private
   */
  static _isSupportedEvent(e) {
    return !!(e && e.data && e.data.type && i.isKnownType(e.data.type));
  }
  /**
   * This function will be called by the messaging service when destination is deregistered or deleted.
   * It must do a cleanup for a destination object.
   */
  deregister() {
    this._registeredResponseHandler && (window.removeEventListener("message", this._registeredResponseHandler, false), this._registeredResponseHandler = null), this._registeredRequestHandler || (window.removeEventListener("message", this._registeredRequestHandler, false), this._registeredRequestHandler = null);
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
  static _toPostable(e) {
    let t;
    return e instanceof Error ? t = {
      name: e.name,
      message: e.message
    } : t = JSON.parse(JSON.stringify(e)), t;
  }
}
d.errMsgs = {
  NO_TARGET_URL: "Target URL is not provided",
  NO_TARGET_IFRAME_ID: "Target iframe ID is not provided",
  NO_RECEIVER_CB: "A receiver callback must be provided for a destination in the RECEIVE communication mode"
};
const D = {
  name: "cedict",
  targetURL: "https://lexis-dev.alpheios.net",
  targetIframeID: "alpheios-lexis-cs"
};
const CedictCharacterForms = {
  SIMPLIFIED: "simplified",
  TRADITIONAL: "traditional"
};
const msgServiceName = "AdaptersLexisService";
class AlpheiosChineseLocAdapter extends BaseAdapter {
  constructor(config = {}) {
    super();
    this.config = config;
    this.cedictConfig = D;
    if (!this.config.serviceUrl) {
      throw new Error("An obligatory serviceUrl parameter is missing");
    }
    this.cedictConfig.targetURL = this.config.serviceUrl;
    if (!u.hasService(msgServiceName)) {
      u.createService(msgServiceName, new d({
        name: this.cedictConfig.name,
        targetURL: this.cedictConfig.targetURL,
        targetIframeID: this.cedictConfig.targetIframeID,
        commModes: [d.commModes.SEND]
      }));
    }
    this._messagingService = u.getService(msgServiceName);
  }
  get languageID() {
    return Kt.languageID;
  }
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
  static _buildWordList(targetWord, contextForward) {
    const wordList = [targetWord];
    if (contextForward) {
      for (let i2 = 0; i2 < contextForward.length; i2++) {
        wordList.push(`${targetWord}${contextForward.slice(0, i2 + 1)}`);
      }
    }
    return wordList;
  }
  async getHomonym(targetWord, contextForward) {
    try {
      const requestBody = {
        getWords: {
          words: this.constructor._buildWordList(targetWord, contextForward)
        }
      };
      let response;
      try {
        response = await this._messagingService.sendRequestTo(this.cedictConfig.name, new f(requestBody));
      } catch (response2) {
        this.addRemoteError(response2.errorCode, response2.body.message);
        return;
      }
      if (Object.keys(response.body).length === 0) {
        this.addError(this.l10n.getMsg("MORPH_NO_HOMONYM", { word: targetWord, languageId: this.languageID.toString() }));
        return;
      }
      const homonym = this._transformData(response.body, targetWord);
      if (!homonym) {
        this.addError(this.l10n.getMsg("MORPH_NO_HOMONYM", { word: targetWord, languageId: this.languageID.toString() }));
        return;
      }
      return homonym;
    } catch (error) {
      this.addError(this.l10n.getMsg("MORPH_UNKNOWN_ERROR", { message: error.message }));
    }
  }
  async loadData(timeout) {
    try {
      const requestBody = {
        loadData: {}
      };
      let response;
      try {
        response = await this._messagingService.sendRequestTo(this.cedictConfig.name, new f(requestBody), timeout);
      } catch (response2) {
        this.addRemoteError(response2.errorCode, response2.body.message);
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("MORPH_UNKNOWN_ERROR", { message: error.message }));
    }
  }
  _transformData(cedictEntries, targetWord) {
    const characterForm = cedictEntries.hasOwnProperty(CedictCharacterForms.SIMPLIFIED) ? CedictCharacterForms.SIMPLIFIED : CedictCharacterForms.TRADITIONAL;
    let lexemes = [];
    const wordEntries = Object.values(cedictEntries[characterForm]).flat();
    wordEntries.forEach((entry) => {
      const cfData = entry[characterForm];
      const headword = cfData.headword;
      let lemma = new ge(headword, this.languageID, []);
      let pronunciationValues = entry.pinyin ? [Kt.formatPinyin(entry.pinyin)] : [];
      pronunciationValues = ["mandarin", "cantonese", "tang"].reduce((arr, i2) => {
        if (cfData[i2]) arr.push(`${i2} - ${cfData[i2]}`);
        return arr;
      }, pronunciationValues);
      lemma.addFeature(this._createFeature(l$1.types.pronunciation, pronunciationValues));
      lemma.addFeature(this._createFeature(l$1.types.note, characterForm));
      if (cfData.radical && cfData.radical.character) lemma.addFeature(this._createFeature(l$1.types.radical, cfData.radical.character));
      if (cfData.frequency) lemma.addFeature(this._createFeature(l$1.types.frequency, cfData.frequency, 10));
      let lexModel = new Y(lemma, []);
      const shortDefs = entry.definitions.map((entry2) => new Ze(entry2, "eng", "text/plain", headword));
      lexModel.meaning.appendShortDefs(shortDefs);
      lexemes.push(lexModel);
    });
    let homonym = new nt(lexemes, targetWord);
    homonym.isMultiHomonym = AlpheiosChineseLocAdapter._wordsFound(cedictEntries[characterForm]) > 1;
    return homonym;
  }
  /**
   * Returns the number of words that has some matching CEDICT entries.
   *
   * @param {object} result - Data returned from CEDICT, an object whose keys are words and values are arrays
   *        either empty (if no entries in CEDICT are found for a word) or containing CEDICT records.
   * @returns {number} A number of words that has some matching CECIDT records.
   * @private
   */
  static _wordsFound(result) {
    return Object.keys(result).filter((key) => result[key].length > 0).length;
  }
  _createFeature(featureType, values) {
    return new l$1(featureType, values, this.languageID);
  }
}
const servers = [{ "texts": [], "isDefault": true, "url": "https://tools.alpheios.net/exist/rest/db/xq/treebank-getmorph.xq?f=r_TEXT&w=r_WORD&clientId=r_CLIENT", "providerUri": "https://alpheios.net", "providerRights": "The Alpheios Treebank data is licenced under the Creative Commons 3.0 Share-Alike license.", "allowUnknownValues": true, "featuresArray": [["pofs", "part", true], ["case", "grmCase", false], ["num", "number", false], ["gend", "gender", false], ["voice", "voice", false], ["mood", "mood", false], ["pers", "person", false], ["comp", "comparison", false]] }];
const DefaultConfig$6 = {
  servers
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var xmlToJSON$1 = { exports: {} };
var hasRequiredXmlToJSON;
function requireXmlToJSON() {
  if (hasRequiredXmlToJSON) return xmlToJSON$1.exports;
  hasRequiredXmlToJSON = 1;
  (function(module) {
    var xmlToJSON2 = (function() {
      this.version = "1.3.5";
      var options = {
        // set up the default options
        mergeCDATA: true,
        // extract cdata and merge with text
        grokAttr: true,
        // convert truthy attributes to boolean, etc
        grokText: true,
        // convert truthy text/attr to boolean, etc
        normalize: true,
        // collapse multiple spaces to single space
        xmlns: true,
        // include namespaces as attribute in output
        namespaceKey: "_ns",
        // tag name for namespace objects
        textKey: "_text",
        // tag name for text nodes
        valueKey: "_value",
        // tag name for attribute values
        attrKey: "_attr",
        // tag for attr groups
        cdataKey: "_cdata",
        // tag for cdata nodes (ignored if mergeCDATA is true)
        attrsAsObject: true,
        // if false, key is used as prefix to name, set prefix to '' to merge children and attrs.
        stripAttrPrefix: true,
        // remove namespace prefixes from attributes
        stripElemPrefix: true,
        // for elements of same name in diff namespaces, you can enable namespaces and access the nskey property
        childrenAsArray: true
        // force children into arrays
      };
      var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
      var trimMatch = new RegExp(/^\s+|\s+$/g);
      this.grokType = function(sValue) {
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
      this.parseString = function(xmlString, opt) {
        return this.parseXML(this.stringToXML(xmlString), opt);
      };
      this.parseXML = function(oXMLParent, opt) {
        for (var key in opt) {
          options[key] = opt[key];
        }
        var vResult = {}, nLength = 0, sCollectedTxt = "";
        if (options.xmlns && oXMLParent.namespaceURI) {
          vResult[options.namespaceKey] = oXMLParent.namespaceURI;
        }
        if (oXMLParent.attributes && oXMLParent.attributes.length > 0) {
          var vAttribs = {};
          for (nLength; nLength < oXMLParent.attributes.length; nLength++) {
            var oAttrib = oXMLParent.attributes.item(nLength);
            vContent = {};
            var attribName = "";
            if (options.stripAttrPrefix) {
              attribName = oAttrib.name.replace(prefixMatch, "");
            } else {
              attribName = oAttrib.name;
            }
            if (options.grokAttr) {
              vContent[options.valueKey] = this.grokType(oAttrib.value.replace(trimMatch, ""));
            } else {
              vContent[options.valueKey] = oAttrib.value.replace(trimMatch, "");
            }
            if (options.xmlns && oAttrib.namespaceURI) {
              vContent[options.namespaceKey] = oAttrib.namespaceURI;
            }
            if (options.attrsAsObject) {
              vAttribs[attribName] = vContent;
            } else {
              vResult[options.attrKey + attribName] = vContent;
            }
          }
          if (options.attrsAsObject) {
            vResult[options.attrKey] = vAttribs;
          }
        }
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
            } else if (oNode.nodeType === 3) {
              sCollectedTxt += oNode.nodeValue;
            } else if (oNode.nodeType === 1) {
              if (nLength === 0) {
                vResult = {};
              }
              if (options.stripElemPrefix) {
                sProp = oNode.nodeName.replace(prefixMatch, "");
              } else {
                sProp = oNode.nodeName;
              }
              vContent = xmlToJSON2.parseXML(oNode);
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
        } else if (!sCollectedTxt) {
          if (options.childrenAsArray) {
            vResult[options.textKey] = [];
            vResult[options.textKey].push(null);
          } else {
            vResult[options.textKey] = null;
          }
        }
        if (sCollectedTxt) {
          if (options.grokText) {
            var value = this.grokType(sCollectedTxt.replace(trimMatch, ""));
            if (value !== null && value !== void 0) {
              vResult[options.textKey] = value;
            }
          } else if (options.normalize) {
            vResult[options.textKey] = sCollectedTxt.replace(trimMatch, "").replace(/\s+/g, " ");
          } else {
            vResult[options.textKey] = sCollectedTxt.replace(trimMatch, "");
          }
        }
        return vResult;
      };
      this.xmlToString = function(xmlDoc) {
        try {
          var xmlString = xmlDoc.xml ? xmlDoc.xml : new XMLSerializer().serializeToString(xmlDoc);
          return xmlString;
        } catch (err) {
          return null;
        }
      };
      this.stringToXML = function(xmlString) {
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
      };
      return this;
    }).call({});
    if (module !== null && module.exports) module.exports = xmlToJSON2;
  })(xmlToJSON$1);
  return xmlToJSON$1.exports;
}
var xmlToJSONExports = requireXmlToJSON();
const xmlToJSON = /* @__PURE__ */ getDefaultExportFromCjs(xmlToJSONExports);
class AlpheiosTreebankAdapter extends BaseAdapter {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$6);
    this.models = { lat: tt$1, grc: Ht };
  }
  /**
   * This method gets data from adapter's engine. All errors are added to adapter.errors
   * @param {Symbol} languageID - languageID for getting homonym
   * @param {String} wordref - a word reference for getting homonym from Treebank
   * Returned values:
   *      - {Homonym} - if successed
   *      - {undefined} - if failed
  */
  async getHomonym(languageID, wordref) {
    const server = this.prepareRequest(wordref);
    if (!server.url) {
      this.addError(this.l10n.getMsg("MORPH_TREEBANK_NO_URL", { word: wordref }));
      return;
    }
    try {
      const res = await this.fetch(server.url, { type: "xml" });
      if (res.constructor.name === "AdapterError") {
        return;
      }
      if (res) {
        const langCode = A.getLanguageCodeFromId(languageID);
        const jsonObj = xmlToJSON.parseString(res);
        jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0]._attr = { lang: { _value: langCode } };
        const homonym = this.transform(jsonObj, jsonObj.words[0].word[0].form[0]._text, server.config);
        return homonym;
      } else {
        this.addError(this.l10n.getMsg("MORPH_TREEBANK_NO_ANSWER_FOR_WORD", { word: wordref }));
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("MORPH_TREEBANK_UNKNOWN_ERROR", { message: error.message }));
    }
  }
  /**
   * This method prepares the request from the config
   * @param {String} wordref - a word reference for getting homonym
   * @return {String} - constructed url for getting data from Treebank
  */
  prepareRequest(wordref) {
    const [text, fragment] = wordref.split(/#/);
    let requestServer = {};
    if (text && fragment) {
      for (const serverConfig of this.config.servers) {
        if (serverConfig.isDefault || serverConfig.texts.includes(text)) {
          requestServer.config = serverConfig;
          requestServer.url = serverConfig.url.replace("r_TEXT", text);
          requestServer.url = requestServer.url.replace("r_WORD", fragment).replace("r_CLIENT", serverConfig.clientId);
          break;
        }
      }
    }
    return requestServer;
  }
  /**
   * This method transform data from adapter to Homonym
   * @param {Object} jsonObj - data from adapter
   * @param {String} targetWord - word
   * @param {String} config - server config
   * @return {Homonym}
  */
  transform(jsonObj, targetWord, config) {
    const providerUri = config.providerUri;
    const providerRights = config.providerRights;
    const provider = new W(providerUri, providerRights);
    const hdwd = jsonObj.words[0].word[0].entry[0].dict[0].hdwd[0];
    let lemmaText = hdwd._text;
    lemmaText = lemmaText.replace(/\d+$/, "");
    const model = this.models[hdwd._attr.lang._value];
    let lemma = new ge(lemmaText, model.languageCode);
    const lexmodel = new Y(lemma, []);
    let inflection = new rt(lemmaText, model.languageID, null, null, null);
    const infl = jsonObj.words[0].word[0].entry[0].infl[0];
    inflection.addFeature(new l$1(l$1.types.fullForm, targetWord, model.languageID));
    const features = config.featuresArray;
    for (const feature of features) {
      const localName = feature[0];
      const featureType = feature[1];
      const addToLemma = feature[2];
      if (infl[localName]) {
        const obj = model.typeFeature(l$1.types[featureType]).createFeatures(infl[localName][0]._text, 1);
        inflection.addFeature(obj);
        if (addToLemma) {
          lemma.addFeature(obj);
        }
      }
    }
    lexmodel.inflections = [inflection];
    return new nt([W.getProxy(provider, lexmodel)], targetWord);
  }
}
const url$2 = "https://ats.alpheios.net";
const availableLangSource = ["lat"];
const rights$1 = "Lemma translatins are extracted from data provided under the GNU GPL v3 license by the Collatinus Project (https://github.com/biblissima/collatinus), which is developed and maintained by Yves Ouvrard and Philippe Verkerk.";
const deafultLang = "eng";
const langMap = { "en-US": "eng", "it": "ita", "pt": "por", "ca": "cat", "fr": "fre", "de": "ger", "es": "spa" };
const DefaultConfig$5 = {
  url: url$2,
  availableLangSource,
  rights: rights$1,
  deafultLang,
  langMap
};
class AlpheiosLemmaTranslationsAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data, creates provider and inits mapLangUri (Object for storing data for available languages)
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$5);
    this.mapLangUri = {};
    this.provider = new W(this.config.url, this.config.rights);
    this.sourceData = config.sourceData;
  }
  /**
   * This method updates homonym with retrieved translations, if an error occurs it will be added to errors property of an adapter
   * @param {Homonym} homonym
   * @param {String} browserLang - language of the translation (for example its, spa)
  */
  async getTranslationsList(homonym, browserLang) {
    let lemmaList = [];
    if (!homonym || !homonym.lexemes) {
      this.addError(this.l10n.getMsg("TRANSLATION_INCORRECT_LEXEMES"));
      return;
    }
    for (const lexeme of homonym.lexemes) {
      lemmaList.push(lexeme.lemma);
    }
    const inLang = A.getLanguageCodeFromId(homonym.lexemes[0].lemma.languageID);
    const outLang = this.config.langMap[browserLang] || this.config.defaultLang;
    const input = this.prepareInput(lemmaList);
    if (!input) {
      this.addError(this.l10n.getMsg("TRANSLATION_INPUT_PREPARE_ERROR", { input: input.toString() }));
      return;
    }
    try {
      const urlLang = await this.getAvailableResLang(inLang, outLang);
      if (urlLang && urlLang.constructor.name === "AdapterError") {
        return;
      }
      if (input && urlLang) {
        try {
          const url2 = urlLang + "?input=" + input;
          let translationsList;
          if (this.sourceData && this.sourceData.translations) {
            translationsList = this.sourceData.translations;
          } else {
            translationsList = await this.fetch(url2);
          }
          if (translationsList && translationsList.constructor.name === "AdapterError") {
            return;
          }
          for (const lemma of lemmaList) {
            Xt.loadTranslations(lemma, outLang, translationsList, this.provider);
          }
        } catch (error) {
          this.addError(this.l10n.getMsg("TRANSLATION_UNKNOWN_ERROR", { message: error.message }));
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("TRANSLATION_UNKNOWN_ERROR", { message: error.message }));
    }
  }
  /**
   * This method creates a string with unique lemma's words form lemmas list
   * @param {[Lemma]} lemmaList
  */
  prepareInput(lemmaList) {
    const inputList = lemmaList.map((lemma) => encodeURIComponent(lemma.word)).filter((item, index, self2) => self2.indexOf(item) === index);
    return inputList.length > 0 ? inputList.join(",") : void 0;
  }
  /**
   * This method fetches an url for translation
   * @param {String} inLang  - translate from language  (for example, lat)
   * @param {String} outLang  - translate to language  (for example, es, it)
  */
  async getAvailableResLang(inLang, outLang) {
    if (this.mapLangUri[inLang] === void 0) {
      const urlAvaLangsRes = this.config.url + "/" + inLang + "/";
      let unparsed;
      if (!this.sourceData || !this.sourceData.langs) {
        unparsed = await this.fetch(urlAvaLangsRes);
      } else {
        unparsed = this.sourceData.langs;
      }
      if (unparsed && unparsed.constructor.name === "AdapterError") {
        return unparsed;
      }
      let mapLangUri = {};
      unparsed.forEach(function(langItem) {
        mapLangUri[langItem.lang] = langItem.uri;
      });
      if (Object.keys(mapLangUri).length > 0) {
        this.mapLangUri[inLang] = mapLangUri;
      }
    }
    return this.mapLangUri[inLang] ? this.mapLangUri[inLang][outLang] : void 0;
  }
}
var papaparse_min$1 = { exports: {} };
/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/
var papaparse_min = papaparse_min$1.exports;
var hasRequiredPapaparse_min;
function requirePapaparse_min() {
  if (hasRequiredPapaparse_min) return papaparse_min$1.exports;
  hasRequiredPapaparse_min = 1;
  (function(module, exports) {
    ((e, t) => {
      module.exports = t();
    })(papaparse_min, function r() {
      var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
      var d2, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || false, o2 = {}, h2 = 0, v2 = {};
      function u2(e) {
        this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, (function(e2) {
          var t = b2(e2);
          t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
          this._handle = new i2(t), (this._handle.streamer = this)._config = t;
        }).call(this, e), this.parseChunk = function(t, e2) {
          var i3 = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < i3) {
            let e3 = this._config.newline;
            e3 || (r2 = this._config.quoteChar || '"', e3 = this._handle.guessLineEndings(t, r2)), t = [...t.split(e3).slice(i3)].join(e3);
          }
          this.isFirstChunk && U2(this._config.beforeFirstChunk) && void 0 !== (r2 = this._config.beforeFirstChunk(t)) && (t = r2), this.isFirstChunk = false, this._halted = false;
          var i3 = this._partialLine + t, r2 = (this._partialLine = "", this._handle.parse(i3, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            t = r2.meta.cursor, i3 = (this._finished || (this._partialLine = i3.substring(t - this._baseIndex), this._baseIndex = t), r2 && r2.data && (this._rowCount += r2.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
            if (a) n.postMessage({ results: r2, workerId: v2.WORKER_ID, finished: i3 });
            else if (U2(this._config.chunk) && !e2) {
              if (this._config.chunk(r2, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = true);
              this._completeResults = r2 = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r2.data), this._completeResults.errors = this._completeResults.errors.concat(r2.errors), this._completeResults.meta = r2.meta), this._completed || !i3 || !U2(this._config.complete) || r2 && r2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), i3 || r2 && r2.meta.paused || this._nextChunk(), r2;
          }
          this._halted = true;
        }, this._sendError = function(e2) {
          U2(this._config.error) ? this._config.error(e2) : a && this._config.error && n.postMessage({ workerId: v2.WORKER_ID, error: e2, finished: false });
        };
      }
      function f2(e) {
        var r2;
        (e = e || {}).chunkSize || (e.chunkSize = v2.RemoteChunkSize), u2.call(this, e), this._nextChunk = s ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(e2) {
          this._input = e2, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (r2 = new XMLHttpRequest(), this._config.withCredentials && (r2.withCredentials = this._config.withCredentials), s || (r2.onload = y(this._chunkLoaded, this), r2.onerror = y(this._chunkError, this)), r2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
              var e2, t = this._config.downloadRequestHeaders;
              for (e2 in t) r2.setRequestHeader(e2, t[e2]);
            }
            var i3;
            this._config.chunkSize && (i3 = this._start + this._config.chunkSize - 1, r2.setRequestHeader("Range", "bytes=" + this._start + "-" + i3));
            try {
              r2.send(this._config.downloadRequestBody);
            } catch (e3) {
              this._chunkError(e3.message);
            }
            s && 0 === r2.status && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          4 === r2.readyState && (r2.status < 200 || 400 <= r2.status ? this._chunkError() : (this._start += this._config.chunkSize || r2.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e2) => null !== (e2 = e2.getResponseHeader("Content-Range")) ? parseInt(e2.substring(e2.lastIndexOf("/") + 1)) : -1)(r2), this.parseChunk(r2.responseText)));
        }, this._chunkError = function(e2) {
          e2 = r2.statusText || e2;
          this._sendError(new Error(e2));
        };
      }
      function l2(e) {
        (e = e || {}).chunkSize || (e.chunkSize = v2.LocalChunkSize), u2.call(this, e);
        var i3, r2, n2 = "undefined" != typeof FileReader;
        this.stream = function(e2) {
          this._input = e2, r2 = e2.slice || e2.webkitSlice || e2.mozSlice, n2 ? ((i3 = new FileReader()).onload = y(this._chunkLoaded, this), i3.onerror = y(this._chunkError, this)) : i3 = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var e2 = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e2 = r2.call(e2, this._start, t)), i3.readAsText(e2, this._config.encoding));
          n2 || this._chunkLoaded({ target: { result: t } });
        }, this._chunkLoaded = function(e2) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
        }, this._chunkError = function() {
          this._sendError(i3.error);
        };
      }
      function c2(e) {
        var i3;
        u2.call(this, e = e || {}), this.stream = function(e2) {
          return i3 = e2, this._nextChunk();
        }, this._nextChunk = function() {
          var e2, t;
          if (!this._finished) return e2 = this._config.chunkSize, i3 = e2 ? (t = i3.substring(0, e2), i3.substring(e2)) : (t = i3, ""), this._finished = !i3, this.parseChunk(t);
        };
      }
      function p2(e) {
        u2.call(this, e = e || {});
        var t = [], i3 = true, r2 = false;
        this.pause = function() {
          u2.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          u2.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e2) {
          this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          r2 && 1 === t.length && (this._finished = true);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i3 = true;
        }, this._streamData = y(function(e2) {
          try {
            t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), i3 && (i3 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e3) {
            this._streamError(e3);
          }
        }, this), this._streamError = y(function(e2) {
          this._streamCleanUp(), this._sendError(e2);
        }, this), this._streamEnd = y(function() {
          this._streamCleanUp(), r2 = true, this._streamData("");
        }, this), this._streamCleanUp = y(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function i2(m3) {
        var n2, s2, a2, t, o3 = Math.pow(2, 53), h3 = -o3, u3 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d3 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i3 = this, r2 = 0, f3 = 0, l3 = false, e = false, c3 = [], p3 = { data: [], errors: [], meta: {} };
        function y2(e2) {
          return "greedy" === m3.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
        }
        function g3() {
          if (p3 && a2 && (k2("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v2.DefaultDelimiter + "'"), a2 = false), m3.skipEmptyLines && (p3.data = p3.data.filter(function(e3) {
            return !y2(e3);
          })), _3()) {
            let t2 = function(e3, t3) {
              U2(m3.transformHeader) && (e3 = m3.transformHeader(e3, t3)), c3.push(e3);
            };
            if (p3) if (Array.isArray(p3.data[0])) {
              for (var e2 = 0; _3() && e2 < p3.data.length; e2++) p3.data[e2].forEach(t2);
              p3.data.splice(0, 1);
            } else p3.data.forEach(t2);
          }
          function i4(e3, t2) {
            for (var i5 = m3.header ? {} : [], r4 = 0; r4 < e3.length; r4++) {
              var n3 = r4, s3 = e3[r4], s3 = ((e4, t3) => ((e5) => (m3.dynamicTypingFunction && void 0 === m3.dynamicTyping[e5] && (m3.dynamicTyping[e5] = m3.dynamicTypingFunction(e5)), true === (m3.dynamicTyping[e5] || m3.dynamicTyping)))(e4) ? "true" === t3 || "TRUE" === t3 || "false" !== t3 && "FALSE" !== t3 && (((e5) => {
                if (u3.test(e5)) {
                  e5 = parseFloat(e5);
                  if (h3 < e5 && e5 < o3) return 1;
                }
              })(t3) ? parseFloat(t3) : d3.test(t3) ? new Date(t3) : "" === t3 ? null : t3) : t3)(n3 = m3.header ? r4 >= c3.length ? "__parsed_extra" : c3[r4] : n3, s3 = m3.transform ? m3.transform(s3, n3) : s3);
              "__parsed_extra" === n3 ? (i5[n3] = i5[n3] || [], i5[n3].push(s3)) : i5[n3] = s3;
            }
            return m3.header && (r4 > c3.length ? k2("FieldMismatch", "TooManyFields", "Too many fields: expected " + c3.length + " fields but parsed " + r4, f3 + t2) : r4 < c3.length && k2("FieldMismatch", "TooFewFields", "Too few fields: expected " + c3.length + " fields but parsed " + r4, f3 + t2)), i5;
          }
          var r3;
          p3 && (m3.header || m3.dynamicTyping || m3.transform) && (r3 = 1, !p3.data.length || Array.isArray(p3.data[0]) ? (p3.data = p3.data.map(i4), r3 = p3.data.length) : p3.data = i4(p3.data, 0), m3.header && p3.meta && (p3.meta.fields = c3), f3 += r3);
        }
        function _3() {
          return m3.header && 0 === c3.length;
        }
        function k2(e2, t2, i4, r3) {
          e2 = { type: e2, code: t2, message: i4 };
          void 0 !== r3 && (e2.row = r3), p3.errors.push(e2);
        }
        U2(m3.step) && (t = m3.step, m3.step = function(e2) {
          p3 = e2, _3() ? g3() : (g3(), 0 !== p3.data.length && (r2 += e2.data.length, m3.preview && r2 > m3.preview ? s2.abort() : (p3.data = p3.data[0], t(p3, i3))));
        }), this.parse = function(e2, t2, i4) {
          var r3 = m3.quoteChar || '"', r3 = (m3.newline || (m3.newline = this.guessLineEndings(e2, r3)), a2 = false, m3.delimiter ? U2(m3.delimiter) && (m3.delimiter = m3.delimiter(e2), p3.meta.delimiter = m3.delimiter) : ((r3 = ((e3, t3, i5, r4, n3) => {
            var s3, a3, o4, h4;
            n3 = n3 || [",", "	", "|", ";", v2.RECORD_SEP, v2.UNIT_SEP];
            for (var u4 = 0; u4 < n3.length; u4++) {
              for (var d4, f4 = n3[u4], l4 = 0, c4 = 0, p4 = 0, g4 = (o4 = void 0, new E2({ comments: r4, delimiter: f4, newline: t3, preview: 10 }).parse(e3)), _4 = 0; _4 < g4.data.length; _4++) i5 && y2(g4.data[_4]) ? p4++ : (d4 = g4.data[_4].length, c4 += d4, void 0 === o4 ? o4 = d4 : 0 < d4 && (l4 += Math.abs(d4 - o4), o4 = d4));
              0 < g4.data.length && (c4 /= g4.data.length - p4), (void 0 === a3 || l4 <= a3) && (void 0 === h4 || h4 < c4) && 1.99 < c4 && (a3 = l4, s3 = f4, h4 = c4);
            }
            return { successful: !!(m3.delimiter = s3), bestDelimiter: s3 };
          })(e2, m3.newline, m3.skipEmptyLines, m3.comments, m3.delimitersToGuess)).successful ? m3.delimiter = r3.bestDelimiter : (a2 = true, m3.delimiter = v2.DefaultDelimiter), p3.meta.delimiter = m3.delimiter), b2(m3));
          return m3.preview && m3.header && r3.preview++, n2 = e2, s2 = new E2(r3), p3 = s2.parse(n2, t2, i4), g3(), l3 ? { meta: { paused: true } } : p3 || { meta: { paused: false } };
        }, this.paused = function() {
          return l3;
        }, this.pause = function() {
          l3 = true, s2.abort(), n2 = U2(m3.chunk) ? "" : n2.substring(s2.getCharIndex());
        }, this.resume = function() {
          i3.streamer._halted ? (l3 = false, i3.streamer.parseChunk(n2, true)) : setTimeout(i3.resume, 3);
        }, this.aborted = function() {
          return e;
        }, this.abort = function() {
          e = true, s2.abort(), p3.meta.aborted = true, U2(m3.complete) && m3.complete(p3), n2 = "";
        }, this.guessLineEndings = function(e2, t2) {
          e2 = e2.substring(0, 1048576);
          var t2 = new RegExp(P3(t2) + "([^]*?)" + P3(t2), "gm"), i4 = (e2 = e2.replace(t2, "")).split("\r"), t2 = e2.split("\n"), e2 = 1 < t2.length && t2[0].length < i4[0].length;
          if (1 === i4.length || e2) return "\n";
          for (var r3 = 0, n3 = 0; n3 < i4.length; n3++) "\n" === i4[n3][0] && r3++;
          return r3 >= i4.length / 2 ? "\r\n" : "\r";
        };
      }
      function P3(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function E2(C) {
        var S2 = (C = C || {}).delimiter, O2 = C.newline, x2 = C.comments, I2 = C.step, A2 = C.preview, T = C.fastMode, D2 = null, L2 = false, F2 = null == C.quoteChar ? '"' : C.quoteChar, j2 = F2;
        if (void 0 !== C.escapeChar && (j2 = C.escapeChar), ("string" != typeof S2 || -1 < v2.BAD_DELIMITERS.indexOf(S2)) && (S2 = ","), x2 === S2) throw new Error("Comment character same as delimiter");
        true === x2 ? x2 = "#" : ("string" != typeof x2 || -1 < v2.BAD_DELIMITERS.indexOf(x2)) && (x2 = false), "\n" !== O2 && "\r" !== O2 && "\r\n" !== O2 && (O2 = "\n");
        var z = 0, M3 = false;
        this.parse = function(i3, t, r2) {
          if ("string" != typeof i3) throw new Error("Input must be a string");
          var n2 = i3.length, e = S2.length, s2 = O2.length, a2 = x2.length, o3 = U2(I2), h3 = [], u3 = [], d3 = [], f3 = z = 0;
          if (!i3) return w3();
          if (T || false !== T && -1 === i3.indexOf(F2)) {
            for (var l3 = i3.split(O2), c3 = 0; c3 < l3.length; c3++) {
              if (d3 = l3[c3], z += d3.length, c3 !== l3.length - 1) z += O2.length;
              else if (r2) return w3();
              if (!x2 || d3.substring(0, a2) !== x2) {
                if (o3) {
                  if (h3 = [], k2(d3.split(S2)), R2(), M3) return w3();
                } else k2(d3.split(S2));
                if (A2 && A2 <= c3) return h3 = h3.slice(0, A2), w3(true);
              }
            }
            return w3();
          }
          for (var p3 = i3.indexOf(S2, z), g3 = i3.indexOf(O2, z), _3 = new RegExp(P3(j2) + P3(F2), "g"), m3 = i3.indexOf(F2, z); ; ) if (i3[z] === F2) for (m3 = z, z++; ; ) {
            if (-1 === (m3 = i3.indexOf(F2, m3 + 1))) return r2 || u3.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h3.length, index: z }), E3();
            if (m3 === n2 - 1) return E3(i3.substring(z, m3).replace(_3, F2));
            if (F2 === j2 && i3[m3 + 1] === j2) m3++;
            else if (F2 === j2 || 0 === m3 || i3[m3 - 1] !== j2) {
              -1 !== p3 && p3 < m3 + 1 && (p3 = i3.indexOf(S2, m3 + 1));
              var y2 = v3(-1 === (g3 = -1 !== g3 && g3 < m3 + 1 ? i3.indexOf(O2, m3 + 1) : g3) ? p3 : Math.min(p3, g3));
              if (i3.substr(m3 + 1 + y2, e) === S2) {
                d3.push(i3.substring(z, m3).replace(_3, F2)), i3[z = m3 + 1 + y2 + e] !== F2 && (m3 = i3.indexOf(F2, z)), p3 = i3.indexOf(S2, z), g3 = i3.indexOf(O2, z);
                break;
              }
              y2 = v3(g3);
              if (i3.substring(m3 + 1 + y2, m3 + 1 + y2 + s2) === O2) {
                if (d3.push(i3.substring(z, m3).replace(_3, F2)), b3(m3 + 1 + y2 + s2), p3 = i3.indexOf(S2, z), m3 = i3.indexOf(F2, z), o3 && (R2(), M3)) return w3();
                if (A2 && h3.length >= A2) return w3(true);
                break;
              }
              u3.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h3.length, index: z }), m3++;
            }
          }
          else if (x2 && 0 === d3.length && i3.substring(z, z + a2) === x2) {
            if (-1 === g3) return w3();
            z = g3 + s2, g3 = i3.indexOf(O2, z), p3 = i3.indexOf(S2, z);
          } else if (-1 !== p3 && (p3 < g3 || -1 === g3)) d3.push(i3.substring(z, p3)), z = p3 + e, p3 = i3.indexOf(S2, z);
          else {
            if (-1 === g3) break;
            if (d3.push(i3.substring(z, g3)), b3(g3 + s2), o3 && (R2(), M3)) return w3();
            if (A2 && h3.length >= A2) return w3(true);
          }
          return E3();
          function k2(e2) {
            h3.push(e2), f3 = z;
          }
          function v3(e2) {
            var t2 = 0;
            return t2 = -1 !== e2 && (e2 = i3.substring(m3 + 1, e2)) && "" === e2.trim() ? e2.length : t2;
          }
          function E3(e2) {
            return r2 || (void 0 === e2 && (e2 = i3.substring(z)), d3.push(e2), z = n2, k2(d3), o3 && R2()), w3();
          }
          function b3(e2) {
            z = e2, k2(d3), d3 = [], g3 = i3.indexOf(O2, z);
          }
          function w3(e2) {
            if (C.header && !t && h3.length && !L2) {
              var s3 = h3[0], a3 = /* @__PURE__ */ Object.create(null), o4 = new Set(s3);
              let n3 = false;
              for (let r3 = 0; r3 < s3.length; r3++) {
                let i4 = s3[r3];
                if (a3[i4 = U2(C.transformHeader) ? C.transformHeader(i4, r3) : i4]) {
                  let e3, t2 = a3[i4];
                  for (; e3 = i4 + "_" + t2, t2++, o4.has(e3); ) ;
                  o4.add(e3), s3[r3] = e3, a3[i4]++, n3 = true, (D2 = null === D2 ? {} : D2)[e3] = i4;
                } else a3[i4] = 1, s3[r3] = i4;
                o4.add(i4);
              }
              n3 && console.warn("Duplicate headers found and renamed."), L2 = true;
            }
            return { data: h3, errors: u3, meta: { delimiter: S2, linebreak: O2, aborted: M3, truncated: !!e2, cursor: f3 + (t || 0), renamedHeaders: D2 } };
          }
          function R2() {
            I2(w3()), h3 = [], u3 = [];
          }
        }, this.abort = function() {
          M3 = true;
        }, this.getCharIndex = function() {
          return z;
        };
      }
      function g2(e) {
        var t = e.data, i3 = o2[t.workerId], r2 = false;
        if (t.error) i3.userError(t.error, t.file);
        else if (t.results && t.results.data) {
          var n2 = { abort: function() {
            r2 = true, _2(t.workerId, { data: [], errors: [], meta: { aborted: true } });
          }, pause: m2, resume: m2 };
          if (U2(i3.userStep)) {
            for (var s2 = 0; s2 < t.results.data.length && (i3.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r2); s2++) ;
            delete t.results;
          } else U2(i3.userChunk) && (i3.userChunk(t.results, n2, t.file), delete t.results);
        }
        t.finished && !r2 && _2(t.workerId, t.results);
      }
      function _2(e, t) {
        var i3 = o2[e];
        U2(i3.userComplete) && i3.userComplete(t), i3.terminate(), delete o2[e];
      }
      function m2() {
        throw new Error("Not implemented.");
      }
      function b2(e) {
        if ("object" != typeof e || null === e) return e;
        var t, i3 = Array.isArray(e) ? [] : {};
        for (t in e) i3[t] = b2(e[t]);
        return i3;
      }
      function y(e, t) {
        return function() {
          e.apply(t, arguments);
        };
      }
      function U2(e) {
        return "function" == typeof e;
      }
      return v2.parse = function(e, t) {
        var i3 = (t = t || {}).dynamicTyping || false;
        U2(i3) && (t.dynamicTypingFunction = i3, i3 = {});
        if (t.dynamicTyping = i3, t.transform = !!U2(t.transform) && t.transform, !t.worker || !v2.WORKERS_SUPPORTED) return i3 = null, v2.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e2) => 65279 !== e2.charCodeAt(0) ? e2 : e2.slice(1))(e), i3 = new (t.download ? f2 : c2)(t)) : true === e.readable && U2(e.read) && U2(e.on) ? i3 = new p2(t) : (n.File && e instanceof File || e instanceof Object) && (i3 = new l2(t)), i3.stream(e);
        (i3 = (() => {
          var e2;
          return !!v2.WORKERS_SUPPORTED && (e2 = (() => {
            var e3 = n.URL || n.webkitURL || null, t2 = r.toString();
            return v2.BLOB_URL || (v2.BLOB_URL = e3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", t2, ")();"], { type: "text/javascript" })));
          })(), (e2 = new n.Worker(e2)).onmessage = g2, e2.id = h2++, o2[e2.id] = e2);
        })()).userStep = t.step, i3.userChunk = t.chunk, i3.userComplete = t.complete, i3.userError = t.error, t.step = U2(t.step), t.chunk = U2(t.chunk), t.complete = U2(t.complete), t.error = U2(t.error), delete t.worker, i3.postMessage({ input: e, config: t, workerId: i3.id });
      }, v2.unparse = function(e, t) {
        var n2 = false, _3 = true, m3 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i3 = false, r2 = null, o3 = false, h3 = ((() => {
          if ("object" == typeof t) {
            if ("string" != typeof t.delimiter || v2.BAD_DELIMITERS.filter(function(e2) {
              return -1 !== t.delimiter.indexOf(e2);
            }).length || (m3 = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n2 = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i3 = t.skipEmptyLines), "string" == typeof t.newline && (y2 = t.newline), "string" == typeof t.quoteChar && (s2 = t.quoteChar), "boolean" == typeof t.header && (_3 = t.header), Array.isArray(t.columns)) {
              if (0 === t.columns.length) throw new Error("Option columns is empty");
              r2 = t.columns;
            }
            void 0 !== t.escapeChar && (a2 = t.escapeChar + s2), t.escapeFormulae instanceof RegExp ? o3 = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o3 = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(P3(s2), "g"));
        "string" == typeof e && (e = JSON.parse(e));
        if (Array.isArray(e)) {
          if (!e.length || Array.isArray(e[0])) return u3(null, e, i3);
          if ("object" == typeof e[0]) return u3(r2 || Object.keys(e[0]), e, i3);
        } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r2), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u3(e.fields || [], e.data || [], i3);
        throw new Error("Unable to serialize unrecognized input");
        function u3(e2, t2, i4) {
          var r3 = "", n3 = ("string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2) && 0 < e2.length), s3 = !Array.isArray(t2[0]);
          if (n3 && _3) {
            for (var a3 = 0; a3 < e2.length; a3++) 0 < a3 && (r3 += m3), r3 += k2(e2[a3], a3);
            0 < t2.length && (r3 += y2);
          }
          for (var o4 = 0; o4 < t2.length; o4++) {
            var h4 = (n3 ? e2 : t2[o4]).length, u4 = false, d3 = n3 ? 0 === Object.keys(t2[o4]).length : 0 === t2[o4].length;
            if (i4 && !n3 && (u4 = "greedy" === i4 ? "" === t2[o4].join("").trim() : 1 === t2[o4].length && 0 === t2[o4][0].length), "greedy" === i4 && n3) {
              for (var f3 = [], l3 = 0; l3 < h4; l3++) {
                var c3 = s3 ? e2[l3] : l3;
                f3.push(t2[o4][c3]);
              }
              u4 = "" === f3.join("").trim();
            }
            if (!u4) {
              for (var p3 = 0; p3 < h4; p3++) {
                0 < p3 && !d3 && (r3 += m3);
                var g3 = n3 && s3 ? e2[p3] : p3;
                r3 += k2(t2[o4][g3], p3);
              }
              o4 < t2.length - 1 && (!i4 || 0 < h4 && !d3) && (r3 += y2);
            }
          }
          return r3;
        }
        function k2(e2, t2) {
          var i4, r3;
          return null == e2 ? "" : e2.constructor === Date ? JSON.stringify(e2).slice(1, 25) : (r3 = false, o3 && "string" == typeof e2 && o3.test(e2) && (e2 = "'" + e2, r3 = true), i4 = e2.toString().replace(h3, a2), (r3 = r3 || true === n2 || "function" == typeof n2 && n2(e2, t2) || Array.isArray(n2) && n2[t2] || ((e3, t3) => {
            for (var i5 = 0; i5 < t3.length; i5++) if (-1 < e3.indexOf(t3[i5])) return true;
            return false;
          })(i4, v2.BAD_DELIMITERS) || -1 < i4.indexOf(m3) || " " === i4.charAt(0) || " " === i4.charAt(i4.length - 1)) ? s2 + i4 + s2 : i4);
        }
      }, v2.RECORD_SEP = String.fromCharCode(30), v2.UNIT_SEP = String.fromCharCode(31), v2.BYTE_ORDER_MARK = "\uFEFF", v2.BAD_DELIMITERS = ["\r", "\n", '"', v2.BYTE_ORDER_MARK], v2.WORKERS_SUPPORTED = !s && !!n.Worker, v2.NODE_STREAM_INPUT = 1, v2.LocalChunkSize = 10485760, v2.RemoteChunkSize = 5242880, v2.DefaultDelimiter = ",", v2.Parser = E2, v2.ParserHandle = i2, v2.NetworkStreamer = f2, v2.FileStreamer = l2, v2.StringStreamer = c2, v2.ReadableStreamStreamer = p2, n.jQuery && ((d2 = n.jQuery).fn.parse = function(o3) {
        var i3 = o3.config || {}, h3 = [];
        return this.each(function(e2) {
          if (!("INPUT" === d2(this).prop("tagName").toUpperCase() && "file" === d2(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return true;
          for (var t = 0; t < this.files.length; t++) h3.push({ file: this.files[t], inputElem: this, instanceConfig: d2.extend({}, i3) });
        }), e(), this;
        function e() {
          if (0 === h3.length) U2(o3.complete) && o3.complete();
          else {
            var e2, t, i4, r2, n2 = h3[0];
            if (U2(o3.before)) {
              var s2 = o3.before(n2.file, n2.inputElem);
              if ("object" == typeof s2) {
                if ("abort" === s2.action) return e2 = "AbortError", t = n2.file, i4 = n2.inputElem, r2 = s2.reason, void (U2(o3.error) && o3.error({ name: e2 }, t, i4, r2));
                if ("skip" === s2.action) return void u3();
                "object" == typeof s2.config && (n2.instanceConfig = d2.extend(n2.instanceConfig, s2.config));
              } else if ("skip" === s2) return void u3();
            }
            var a2 = n2.instanceConfig.complete;
            n2.instanceConfig.complete = function(e3) {
              U2(a2) && a2(e3, n2.file, n2.inputElem), u3();
            }, v2.parse(n2.file, n2.instanceConfig);
          }
        }
        function u3() {
          h3.splice(0, 1), e();
        }
      }), a && (n.onmessage = function(e) {
        e = e.data;
        void 0 === v2.WORKER_ID && e && (v2.WORKER_ID = e.workerId);
        "string" == typeof e.input ? n.postMessage({ workerId: v2.WORKER_ID, results: v2.parse(e.input, e.config), finished: true }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v2.parse(e.input, e.config)) && n.postMessage({ workerId: v2.WORKER_ID, results: e, finished: true });
      }), (f2.prototype = Object.create(u2.prototype)).constructor = f2, (l2.prototype = Object.create(u2.prototype)).constructor = l2, (c2.prototype = Object.create(c2.prototype)).constructor = c2, (p2.prototype = Object.create(u2.prototype)).constructor = p2, v2;
    });
  })(papaparse_min$1);
  return papaparse_min$1.exports;
}
var papaparse_minExports = requirePapaparse_min();
const papaparse = /* @__PURE__ */ getDefaultExportFromCjs(papaparse_minExports);
const DefaultConfig$4 = {
  "https://github.com/alpheios-project/mjm": { "urls": { "short": "https://repos1.alpheios.net/lexdata/mjm/dat/grc-mjm-defs.dat" }, "langs": { "source": "grc", "target": "en" }, "format": { "short": "text/html" }, "description": "Definitions derived from Wilfred E. Major's Core Greek Vocabulary, extended with definitions from the Middle Liddell.", "rights_keys": { "ML": ' "An Intermediate Greek-English Lexicon" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University. Edits and additions provided by Vanessa Gorman, University of Nebraska.', "Major": " Wilfred E. Major, Core Greek Vocabulary for the First Two Years of Greek. CPL Online, Winter 2008. Edits and additions provided by Vanessa Gorman, University of Nebraska." } },
  "https://github.com/alpheios-project/majorplus": { "urls": { "short": "https://repos1.alpheios.net/lexdata/majorplus/dat/grc-mjp-defs.dat" }, "langs": { "source": "grc", "target": "en" }, "format": { "short": "text/html" }, "description": "Definitions derived from Wilfred E. Major's Core Greek Vocabulary, extended with definitions from the LSJ.", "rights_keys": { "LSJ": ' "A Greek-English Lexicon" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University. Edits and additions provided by Vanessa Gorman, University of Nebraska.', "Major": " Wilfred E. Major, Core Greek Vocabulary for the First Two Years of Greek. CPL Online, Winter 2008. Edits and additions provided by Vanessa Gorman, University of Nebraska." } },
  "https://github.com/alpheios-project/lsj": { "urls": { "short": "https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-defs.dat", "index": "https://repos1.alpheios.net/lexdata/lsj/dat/grc-lsj-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lsj&lg=grc&out=html" }, "langs": { "source": "grc", "target": "en" }, "description": '"A Greek-English Lexicon" (Henry George Liddell, Robert Scott)', "rights": ' "A Greek-English Lexicon" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University.' },
  "https://github.com/alpheios-project/aut": { "urls": { "short": "https://repos1.alpheios.net/lexdata/aut/dat/grc-aut-defs.dat", "index": "https://repos1.alpheios.net/lexdata/aut//dat/grc-aut-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=aut&lg=grc&out=html" }, "langs": { "source": "grc", "target": "en" }, "description": '"Autenrieth Homeric Dictionary" (Geoerge Autenrieth)', "rights": ' "Autenrieth Homeric Dictionary" (Geoerge Autenrieth). Provided by the Perseus Digital Library at Tufts University' },
  "https://github.com/alpheios-project/ml": { "urls": { "short": "https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-defs.dat", "index": "https://repos1.alpheios.net/lexdata/ml/dat/grc-ml-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ml&lg=grc&out=html" }, "langs": { "source": "grc", "target": "en" }, "description": '"Middle Liddell"', "rights": ' "An Intermediate Greek-English Lexicon" (Henry George Liddell, Robert Scott). Provided by the Perseus Digital Library at Tufts University' },
  "https://github.com/alpheios-project/as": { "urls": { "short": "https://repos1.alpheios.net/lexdata/as/dat/grc-as-defs.dat", "index": "https://repos1.alpheios.net/lexdata/as/dat/grc-as-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=as&lg=grc&out=html" }, "langs": { "source": "grc", "target": "en" }, "description": '"A Manual Greek Lexicon of the New Testament"', "rights": ' "A Manual Greek Lexicon of the New Testament" (G. Abbott-Smith). Provided by biblicalhumanities.org.' },
  "https://github.com/alpheios-project/dod": { "urls": { "short": "https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-defs.dat", "index": "https://repos1.alpheios.net/lexdata/dod/dat/grc-dod-ids.dat", "full": null }, "langs": { "source": "grc", "target": "en" }, "description": '"Dodson"', "rights": ' "A Public Domain lexicon by John Jeffrey Dodson (2010)". Provided by biblicalhumanities.org.' },
  "https://github.com/alpheios-project/ls": { "urls": { "short": null, "index": "https://repos1.alpheios.net/lexdata/ls/dat/lat-ls-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=ls&lg=lat&out=html" }, "langs": { "source": "lat", "target": "en" }, "description": '"A Latin Dictionary" (Charlton T. Lewis, Charles Short)', "rights": '"A Latin Dictionary" (Charlton T. Lewis, Charles Short). Provided by the Perseus Digital Library at Tufts University.' },
  "https://github.com/alpheios-project/lan": { "urls": { "short": null, "index": "https://repos1.alpheios.net/lexdata/lan/dat/ara-lan-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=lan&lg=ara&out=html" }, "langs": { "source": "ara", "target": "en" }, "description": '"The Arabic-English Lexicon" (Edward Lane)', "rights": '"The Arabic-English Lexicon" (Edward Lane). Provided by the Perseus Digital Library at Tufts University.' },
  "https://github.com/alpheios-project/sal": { "urls": { "short": null, "index": "https://repos1.alpheios.net/lexdata/sal/dat/ara-sal-ids.dat", "full": "https://repos1.alpheios.net/exist/rest/db/xq/lexi-get.xq?lx=sal&lg=ara&out=html" }, "langs": { "source": "ara", "target": "en" }, "description": `"An Advanced Learner's Arabic Dictionary" (H. Anthony Salmone)`, "rights": `"An Advanced Learner's Arabic Dictionary" (H. Anthony Salmone). Provided by the Perseus Digital Library at Tufts University.` },
  "https://github.com/alpheios-project/stg": { "urls": { "short": "https://repos1.alpheios.net/lexdata/stg/dat/per-stg-defs.dat", "index": "https://repos1.alpheios.net/lexdata/stg/dat/per-stg-ids.dat", "full": null }, "langs": { "source": "per", "target": "en" }, "description": '"A Comprehensive Persian-English Dictionary" (Francis Joseph Steingass)', "rights": '"A Comprehensive Persian-English Dictionary" (Francis Joseph Steingass). Provided by the Center for Advanced Study of Language (CASL) at the University of Maryland, College Park.' },
  "https://github.com/alpheios-project/paidea-glossary": { "urls": { "short": "https://repos1.alpheios.net/lexdata/paideia/dat/lat-1a-reader.dat" }, "langs": { "source": "lat", "target": "en" }, "format": { "short": "text/html" }, "description": "Definitions derived from Paidea Glossary.", "rights": "Definitions from Living Latin- The Paideia Institute." }
};
let cachedDefinitions = /* @__PURE__ */ new Map();
let uploadStarted = /* @__PURE__ */ new Map();
class AlpheiosLexiconsAdapter extends BaseAdapter {
  /**
  * Lexicons adapter uploads config data, defines default options and inits data
  * @param {Object} config - lexicon adapter properties
  * @param {Object} remoteConfig - remote lexicon service configuration
  *                                merges with and overrides the lexicon
  *                                settings in the local config.json,
  *                                if present and populated. An empty object
  *                                signifies that there are no overrides
  */
  constructor(config = {}, remoteConfig = {}) {
    super();
    this.config = config;
    this.config.lexicons = this.uploadConfig(remoteConfig, DefaultConfig$4);
    this.options = { timeout: this.config.timeout ? this.config.timeout : 0 };
    this.async = Boolean(this.config.callBackEvtSuccess);
  }
  /**
  * This method retrieves short definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchShortDefs(homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, "short");
  }
  /**
  * This method retrieves full definitions for given homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  */
  async fetchFullDefs(homonym, options = {}) {
    await this.fetchDefinitions(homonym, options, "full");
  }
  /**
  * This method creates Promise for getting short definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareShortDefPromise(homonym, urlKey) {
    const url2 = this.config.lexicons[urlKey].urls.short;
    const requestType = "shortDefs";
    const resCheckCached = this.checkCachedData(url2);
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const res = cachedDefinitions.get(url2);
          await this.updateShortDefs(res, homonym, this.config.lexicons[urlKey]);
          this.prepareSuccessCallback(requestType, homonym);
        }
      },
      (error) => {
        this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error.message }));
        this.prepareFailedCallback(requestType, homonym);
      }
    );
  }
  /**
  * This method creates Promise for getting full definitions, for being able to parallel requests
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {String} urlKey - urlIndex for geting data from config
  */
  prepareFullDefPromise(homonym, urlKey) {
    const url2 = this.config.lexicons[urlKey].urls.index;
    const requestType = "fullDefs";
    const resCheckCached = this.checkCachedData(url2);
    return resCheckCached.then(
      async (result) => {
        if (result) {
          const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url2), homonym, this.config.lexicons[urlKey]);
          const resFullDefs = this.updateFullDefsAsync(fullDefsRequests, this.config.lexicons[urlKey], homonym);
          resFullDefs.catch((error) => {
            this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error.message }));
            this.prepareFailedCallback(requestType, homonym);
          });
        }
      },
      (error) => {
        this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error.message }));
        this.prepareFailedCallback(requestType, homonym);
      }
    );
  }
  /**
  * This method checks if there is a callBackEvtSuccess defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareSuccessCallback(requestType, homonym) {
    if (this.config.callBackEvtSuccess) {
      this.config.callBackEvtSuccess.pub({
        requestType,
        homonym
      });
    }
  }
  /**
  * This method checks if there is a callBackEvtFailed defined and publish it if exists
  * @param {String} requestType - name of the request - shortDef and fullDef
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  prepareFailedCallback(requestType, homonym) {
    if (this.config.callBackEvtFailed) {
      this.config.callBackEvtFailed.pub({
        requestType,
        homonym
      });
    }
  }
  /**
  * This is a generic method that retrieves definitions for homonym
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} options - options
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */
  async fetchDefinitions(homonym, options, lookupFunction) {
    Object.assign(this.options, options);
    if (!this.options.allow || this.options.allow.length === 0) {
      this.addError(this.l10n.getMsg("LEXICONS_NO_ALLOWED_URL"));
      return;
    }
    if (this.async) {
      return this.fetchDefsAsync(homonym, lookupFunction);
    } else {
      if (lookupFunction === "short") {
        return this.fetchShortDefsSync(homonym);
      } else if (lookupFunction === "full") {
        return this.fetchFullDefsSync(homonym);
      }
    }
  }
  /**
  * This is a sync method that retrieves short definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchShortDefsSync(homonym) {
    try {
      const languageID = homonym.lexemes[0].lemma.languageID;
      const urlKeys = this.getRequests(languageID).filter((url2) => this.options.allow.includes(url2));
      for (const urlKey of urlKeys) {
        const url2 = this.config.lexicons[urlKey].urls.short;
        const result = await this.checkCachedData(url2);
        if (result) {
          const res = cachedDefinitions.get(url2);
          await this.updateShortDefs(res, homonym, this.config.lexicons[urlKey]);
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error.message }));
    }
  }
  /**
  * This is a sync method that retrieves full definitions for homonym synchronously
  * @param {Homonym} homonym - homonym for retrieving definitions
  */
  async fetchFullDefsSync(homonym) {
    const languageID = homonym.lexemes[0].lemma.languageID;
    const urlKeys = this.getRequests(languageID).filter((url2) => this.options.allow.includes(url2));
    for (const urlKey of urlKeys) {
      const url2 = this.config.lexicons[urlKey].urls.index;
      const result = await this.checkCachedData(url2);
      if (result) {
        const fullDefsRequests = this.collectFullDefURLs(cachedDefinitions.get(url2), homonym, this.config.lexicons[urlKey]);
        await this.updateFullDefs(fullDefsRequests, this.config.lexicons[urlKey], homonym);
      }
    }
  }
  /**
  * This is an async method that retrieves definitions for homonym with getting result inside callbacks
  * @param {Homonym} homonym - homonym for retrieving definitions
  * @param {Object} lookupFunction - type of definitions - short, full
  * @return {Boolean} - result of fetching
  */
  fetchDefsAsync(homonym, lookupFunction) {
    const languageID = homonym.lexemes[0].lemma.languageID;
    const urlKeys = this.getRequests(languageID).filter((url2) => this.options.allow.includes(url2));
    for (const urlKey of urlKeys) {
      if (lookupFunction === "short") {
        this.prepareShortDefPromise(homonym, urlKey, lookupFunction);
      }
      if (lookupFunction === "full") {
        this.prepareFullDefPromise(homonym, urlKey, lookupFunction);
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
  async checkCachedData(url2, externalData = null, skipFetch = false) {
    if (!externalData && skipFetch) {
      return false;
    }
    if (!cachedDefinitions.has(url2) && !uploadStarted.has(url2)) {
      try {
        uploadStarted.set(url2, true);
        let data2 = externalData;
        if (!externalData) {
          const unparsed = await this.fetch(url2, { type: "xml", timeout: this.options.timeout });
          const parsed = papaparse.parse(unparsed, { quoteChar: "\0", delimiter: "|" });
          data2 = this.fillMap(parsed.data);
        }
        cachedDefinitions.set(url2, data2);
        uploadStarted.set(url2, false);
      } catch (error) {
        this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error.message }));
        uploadStarted.set(url2, false);
        return false;
      }
    } else if (uploadStarted.has(url2) && uploadStarted.get(url2)) {
      setTimeout(() => {
        this.checkCachedData(url2);
      }, this.options.timeout);
    }
    return true;
  }
  /**
  * This method searches for definitions in cached text, creates definitions and updates lexemes
  * @param {Map} data - cached data from definition's url
  * @param {Homonym} homonym - homonym we search definitions for
  * @param {Object} config - config data for url
  */
  async updateShortDefs(data2, homonym, config) {
    const languageID = homonym.lexemes[0].lemma.languageID;
    const model = A.getLanguageModel(languageID);
    for (let lexeme of homonym.lexemes) {
      const deftexts = this.lookupInDataIndex(data2, lexeme.lemma, model);
      if (deftexts) {
        for (const d2 of deftexts) {
          const text = d2.field1;
          const providerCode = d2.field2;
          const format = config.format && config.format.short ? config.format.short : "text/plain";
          try {
            let rightsText = config.rights;
            let rightsUri = config.urls.short;
            if (providerCode && config.rights_keys && config.rights_keys[providerCode]) {
              rightsUri = rightsUri + `#${providerCode}`;
              rightsText = config.rights_keys[providerCode];
            }
            const provider = new W(rightsUri, rightsText);
            const def = new Ze(text, config.langs.target, format, lexeme.lemma.word);
            const definition = W.getProxy(provider, def);
            lexeme.meaning.appendShortDefs(definition);
          } catch (error) {
            this.addError(this.l10n.getMsg("LEXICONS_FAILED_APPEND_DEFS", { message: error.message }));
            continue;
          }
        }
      } else {
        const url2 = config.urls.short;
        this.addError(this.l10n.getMsg("LEXICONS_NO_DATA_FROM_URL", { url: url2 }));
        this.prepareFailedCallback("shortDefs", homonym);
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
  collectFullDefURLs(data2, homonym, config) {
    const languageID = homonym.lexemes[0].lemma.languageID;
    const model = A.getLanguageModel(languageID);
    const urlFull = config.urls.full;
    if (!urlFull) {
      this.addError(this.l10n.getMsg("LEXICONS_NO_FULL_URL"));
      return;
    }
    let requests = [];
    for (const lexeme of homonym.lexemes) {
      const ids = this.lookupInDataIndex(data2, lexeme.lemma, model);
      if (urlFull && ids) {
        for (const id2 of ids) {
          requests.push({ url: `${urlFull}&n=${id2.field1}`, lexeme });
        }
      } else if (urlFull) {
        requests.push({ url: `${urlFull}&l=${encodeURIComponent(lexeme.lemma.word)}`, lexeme });
      }
    }
    return requests;
  }
  /**
  * This method fetches data from request and update homonym with full definition - it is made as Promises with calback to make it parallel
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefsAsync(fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) {
      let fullDefDataRes;
      if (cachedDefinitions.has(request.url)) {
        fullDefDataRes = new Promise((resolve, reject) => resolve(cachedDefinitions.get(request.url)));
      } else {
        fullDefDataRes = this.fetch(request.url, { type: "xml" });
      }
      fullDefDataRes.then(
        async (fullDefData) => {
          if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
            const error = fullDefData.match(/no entries found/i) ? "No entries found." : fullDefData;
            this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error }));
            this.prepareFailedCallback("fullDefs", homonym);
          } else {
            const provider = new W(config.urls.full, config.rights);
            const def = new Ze(fullDefData, config.langs.target, "text/plain", request.lexeme.lemma.word);
            const definition = W.getProxy(provider, def);
            request.lexeme.meaning.appendFullDefs(definition);
            this.prepareSuccessCallback("fullDefs", homonym);
          }
        },
        (error) => {
          this.addError(this.l10n.getMsg("LEXICONS_FAILED_APPEND_DEFS", { message: error.message }));
        }
      );
    }
  }
  /**
  * This method fetches data from request and update homonym with full definition synchronously
  * @param {[String]} fullDefsRequests - array of full definitions url
  * @param {Object} config - config data for url
  * @param {Homonym} homonym - homonym we search definitions for
  */
  async updateFullDefs(fullDefsRequests, config, homonym) {
    for (let request of fullDefsRequests) {
      let fullDefData;
      if (cachedDefinitions.has(request.url)) {
        fullDefData = cachedDefinitions.get(request.url);
      } else {
        fullDefData = await this.fetch(request.url, { type: "xml" });
      }
      try {
        if (fullDefData && fullDefData.match(/alph:error|alpheios-lex-error/)) {
          const error = fullDefData.match(/no entries found/i) ? "No entries found." : fullDefData;
          this.addError(this.l10n.getMsg("LEXICONS_FAILED_CACHED_DATA", { message: error }));
        } else {
          const provider = new W(config.urls.full, config.rights);
          const def = new Ze(fullDefData, config.langs.target, "text/plain", request.lexeme.lemma.word);
          const definition = W.getProxy(provider, def);
          request.lexeme.meaning.appendFullDefs(definition);
        }
      } catch (error) {
        this.addError(this.l10n.getMsg("LEXICONS_FAILED_APPEND_DEFS", { message: error.message }));
      }
    }
  }
  /*
  * This method retrieves urls from config for given languageCode
  * @param {Symbol} languageID
  */
  getRequests(languageID) {
    const languageCode = A.getLanguageCodeFromId(languageID);
    return Object.keys(this.config.lexicons).filter((url2) => this.config.lexicons[url2] && this.config.lexicons[url2].langs && this.config.lexicons[url2].langs.source === languageCode);
  }
  /**
   * fills the data map with the rows from the parsed file
   * we need a method to do this because there may be homonyms in
   * the files
   * @param {string[]} rows
   * @return {Map} the filled map
   */
  fillMap(rows) {
    let data2 = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const def = { field1: row[1], field2: null };
      if (row.length > 2) {
        def.field2 = row[2];
      }
      if (data2.has(row[0])) {
        data2.get(row[0]).push(def);
      } else {
        data2.set(row[0], [def]);
      }
    }
    return data2;
  }
  /**
   * Lookup a Lemma object in an Alpheios v1 data index
   * @param {Map} data the data inddex
   * @param {Lemma} lemma the lemma to lookupInDataIndex
   * @param {LanguageModel} model a language model for language specific methods
   * @return {string} the index entry as a text string
   */
  lookupInDataIndex(data2, lemma, model) {
    let found;
    let alternatives = [];
    let altEncodings = [];
    for (const l2 of [lemma.word, ...lemma.principalParts]) {
      alternatives.push(l2);
      for (const a of model.alternateWordEncodings({ word: l2, preserveCase: true })) {
        altEncodings.push(a);
      }
      const nosense = l2.replace(/_?\d+$/, "");
      if (l2 !== nosense) {
        alternatives.push(nosense);
      }
    }
    alternatives = [...alternatives, ...altEncodings];
    for (const lookup of alternatives) {
      found = false;
      if (data2 && lookup) {
        found = data2.get(lookup);
        if (!found) {
          found = data2.get(lookup.toLocaleLowerCase());
        }
        if (found) {
          found = this._lookupSpecial(data2, lookup, found);
        }
        if (found) {
          break;
        }
      }
    }
    if (!found) {
      let lastAlt = [];
      for (const l2 of [lemma.word, ...lemma.principalParts]) {
        const strippedAll = model.alternateWordEncodings({
          word: l2,
          encoding: "strippedAll",
          preserveCase: true
        });
        if (strippedAll.length > 0) {
          lastAlt.push(strippedAll[0]);
        }
      }
      if (data2 && lastAlt.length > 0) {
        for (const l2 of lastAlt) {
          for (let entry of data2.entries()) {
            const originalKey = entry[0].replace(/^@/, "");
            const value = entry[1];
            const strippedKey = model.alternateWordEncodings({
              word: originalKey,
              encoding: "strippedAll",
              preserveCase: true
            });
            if (strippedKey.length > 0 && strippedKey[0] === l2) {
              found = this._lookupSpecial(data2, originalKey, value);
              if (found) {
                break;
              }
            }
          }
          if (found) {
            break;
          }
        }
      }
    }
    return found;
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
  _lookupSpecial(data2, lookup, lemmas) {
    if (lemmas.length === 1 && lemmas[0].field1 === "@") {
      return data2.get(`@${lookup}`);
    } else {
      return lemmas;
    }
  }
}
const url$1 = "https://latin.packhum.org/rst/concordance/";
const sourceTextUrl = "https://latin.packhum.org";
const rights = "Word usage examples are provided by The Packard Humanities Institute (https://packhum.org/). They are to be used only for personal study and are subject to the “Fair Use” principles of U.S. Copyright law.";
const maxResultsOverride = 1e7;
const DefaultConfig$3 = {
  url: url$1,
  sourceTextUrl,
  rights,
  maxResultsOverride
};
const authors = /* @__PURE__ */ JSON.parse(`[{"urn":"urn:cts:latinLit:phi2456","title":[{"@lang":"lat","@value":"Parthenius, of Constantinople"}],"abbreviations":[{"@lang":"lat","@value":"Parth"}],"works":[{"urn":"urn:cts:latinLit:phi2456.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0119","title":[{"@lang":"lat","@value":"Plautus, Titus Maccius"}],"abbreviations":[{"@lang":"lat","@value":"Pl"}],"works":[{"urn":"urn:cts:latinLit:phi0119.phi0001","title":[{"@lang":"lat","@value":"Amphitruo"}],"abbreviations":[{"@lang":"lat","@value":"Am"}]},{"urn":"urn:cts:latinLit:phi0119.phi0002","title":[{"@lang":"lat","@value":"Asinaria"}],"abbreviations":[{"@lang":"lat","@value":"As"}]},{"urn":"urn:cts:latinLit:phi0119.phi0003","title":[{"@lang":"lat","@value":"Aulularia"}],"abbreviations":[{"@lang":"lat","@value":"Aul"}]},{"urn":"urn:cts:latinLit:phi0119.phi0004","title":[{"@lang":"lat","@value":"Bacchides"}],"abbreviations":[{"@lang":"lat","@value":"Bac"}]},{"urn":"urn:cts:latinLit:phi0119.phi0005","title":[{"@lang":"lat","@value":"Captivi"}],"abbreviations":[{"@lang":"lat","@value":"Capt"}]},{"urn":"urn:cts:latinLit:phi0119.phi0006","title":[{"@lang":"lat","@value":"Casina"}],"abbreviations":[{"@lang":"lat","@value":"Cas"}]},{"urn":"urn:cts:latinLit:phi0119.phi0007","title":[{"@lang":"lat","@value":"Cistellaria"}],"abbreviations":[{"@lang":"lat","@value":"Cist"}]},{"urn":"urn:cts:latinLit:phi0119.phi0008","title":[{"@lang":"lat","@value":"Curculio"}],"abbreviations":[{"@lang":"lat","@value":"Cur"}]},{"urn":"urn:cts:latinLit:phi0119.phi0009","title":[{"@lang":"lat","@value":"Epidicus"}],"abbreviations":[{"@lang":"lat","@value":"Epid"}]},{"urn":"urn:cts:latinLit:phi0119.phi0010","title":[{"@lang":"lat","@value":"Menaechmi"}],"abbreviations":[{"@lang":"lat","@value":"Men"}]},{"urn":"urn:cts:latinLit:phi0119.phi0011","title":[{"@lang":"lat","@value":"Mercator"}],"abbreviations":[{"@lang":"lat","@value":"Mer"}]},{"urn":"urn:cts:latinLit:phi0119.phi0012","title":[{"@lang":"lat","@value":"Miles Gloriosus"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]},{"urn":"urn:cts:latinLit:phi0119.phi0013","title":[{"@lang":"lat","@value":"Mostellaria"}],"abbreviations":[{"@lang":"lat","@value":"Mos"}]},{"urn":"urn:cts:latinLit:phi0119.phi0014","title":[{"@lang":"lat","@value":"Persa"}],"abbreviations":[{"@lang":"lat","@value":"Per"}]},{"urn":"urn:cts:latinLit:phi0119.phi0015","title":[{"@lang":"lat","@value":"Poenulus"}],"abbreviations":[{"@lang":"lat","@value":"Poen"}]},{"urn":"urn:cts:latinLit:phi0119.phi0016","title":[{"@lang":"lat","@value":"Pseudolus"}],"abbreviations":[{"@lang":"lat","@value":"Ps"}]},{"urn":"urn:cts:latinLit:phi0119.phi0017","title":[{"@lang":"lat","@value":"Rudens"}],"abbreviations":[{"@lang":"lat","@value":"Rud"}]},{"urn":"urn:cts:latinLit:phi0119.phi0018","title":[{"@lang":"lat","@value":"Stichus"}],"abbreviations":[{"@lang":"lat","@value":"St"}]},{"urn":"urn:cts:latinLit:phi0119.phi0019","title":[{"@lang":"lat","@value":"Trinummus"}],"abbreviations":[{"@lang":"lat","@value":"Trin"}]},{"urn":"urn:cts:latinLit:phi0119.phi0020","title":[{"@lang":"lat","@value":"Truculentus"}],"abbreviations":[{"@lang":"lat","@value":"Truc"}]},{"urn":"urn:cts:latinLit:phi0119.phi0021","title":[{"@lang":"lat","@value":"Vidularia"}],"abbreviations":[{"@lang":"lat","@value":"Vid"}]},{"urn":"urn:cts:latinLit:phi0119.phi0022","title":[{"@lang":"lat","@value":"Fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"Fr"}]}]},{"urn":"urn:cts:latinLit:phi0881","title":[{"@lang":"lat","@value":"Germanicus, Claudius Caesar"}],"abbreviations":[{"@lang":"lat","@value":"Germ"}],"works":[{"urn":"urn:cts:latinLit:phi0881.phi0001","title":[{"@lang":"lat","@value":"Aratea"}],"abbreviations":[{"@lang":"lat","@value":"Arat"}]},{"urn":"urn:cts:latinLit:phi0881.phi0002","title":[{"@lang":"lat","@value":"fragmenta Aratea"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi0881.phi0003","title":[{"@lang":"lat","@value":"epigrammata"}],"abbreviations":[{"@lang":"lat","@value":"Epig"}]}]},{"urn":"urn:cts:latinLit:phi0821","title":[{"@lang":"lat","@value":"Anonymous (Bucolica Einsidlensia)"}],"abbreviations":[{"@lang":"lat","@value":"BucEins"}],"works":[{"urn":"urn:cts:latinLit:phi0821.phi0001","title":[{"@lang":"lat","@value":"Bucolica Einsidlensia"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0845","title":[{"@lang":"lat","@value":"Columella, L. Iunius Moderatus"}],"abbreviations":[{"@lang":"lat","@value":"Col"}],"works":[{"urn":"urn:cts:latinLit:phi0845.phi0001","title":[{"@lang":"lat","@value":"De Arboribus"}],"abbreviations":[{"@lang":"lat","@value":"Arb"}]},{"urn":"urn:cts:latinLit:phi0845.phi0002","title":[{"@lang":"lat","@value":"De Re Rustica"}],"abbreviations":[{"@lang":"lat","@value":"RR"}]}]},{"urn":"urn:cts:latinLit:phi0984","title":[{"@lang":"lat","@value":"Trogus, Pompeius"}],"abbreviations":[{"@lang":"lat","@value":"Trog"}],"works":[{"urn":"urn:cts:latinLit:phi0984.phi0001","title":[{"@lang":"lat","@value":"De Animalibus"}],"abbreviations":[{"@lang":"lat","@value":"Anim"}]},{"urn":"urn:cts:latinLit:phi0984.phi0002","title":[{"@lang":"lat","@value":"Historiae Philippicae"}],"abbreviations":[{"@lang":"lat","@value":"Hist"}]}]},{"urn":"urn:cts:latinLit:phi0558","title":[{"@lang":"lat","@value":"Maecenas, Gaius Cilnius"}],"abbreviations":[{"@lang":"lat","@value":"Maec"}],"works":[{"urn":"urn:cts:latinLit:phi0558.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0558.phi0002","title":[{"@lang":"lat","@value":"fragmentum a Morel omissum"}],"abbreviations":[{"@lang":"lat","@value":"poetB"}]}]},{"urn":"urn:cts:latinLit:phi1297","title":[{"@lang":"lat","@value":"Marullus"}],"abbreviations":[{"@lang":"lat","@value":"Marull"}],"works":[{"urn":"urn:cts:latinLit:phi1297.phi0001","title":[{"@lang":"lat","@value":"mimi"}],"abbreviations":[{"@lang":"lat","@value":"mim"}]}]},{"urn":"urn:cts:latinLit:phi1251","title":[{"@lang":"lat","@value":"Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Gaius"}],"works":[{"urn":"urn:cts:latinLit:phi1251.phi0001","title":[{"@lang":"lat","@value":"Institutiones"}],"abbreviations":[{"@lang":"lat","@value":"Inst"}]},{"urn":"urn:cts:latinLit:phi1251.phi0002","title":[{"@lang":"lat","@value":"Institut., frr. Aeg. et Oxyrh."}],"abbreviations":[{"@lang":"lat","@value":"Instfrg"}]},{"urn":"urn:cts:latinLit:phi1251.phi0004","title":[{"@lang":"lat","@value":"Gai Institutionum epitome"}],"abbreviations":[{"@lang":"lat","@value":"Epit"}]}]},{"urn":"urn:cts:latinLit:phi0412","title":[{"@lang":"lat","@value":"Aquilius Gallus, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"AquilGall"}],"works":[{"urn":"urn:cts:latinLit:phi0412.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi1282","title":[{"@lang":"lat","@value":"Lentulus"}],"abbreviations":[{"@lang":"lat","@value":"Lentul"}],"works":[{"urn":"urn:cts:latinLit:phi1282.phi0001","title":[{"@lang":"lat","@value":"mimus"}],"abbreviations":[{"@lang":"lat","@value":"mim"}]}]},{"urn":"urn:cts:latinLit:phi0863","title":[{"@lang":"lat","@value":"Dorcatius"}],"abbreviations":[{"@lang":"lat","@value":"Dorc"}],"works":[{"urn":"urn:cts:latinLit:phi0863.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0028","title":[{"@lang":"lat","@value":"Coelius Antipater, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Coel"}],"works":[{"urn":"urn:cts:latinLit:phi0028.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0500","title":[{"@lang":"lat","@value":"Crassus, Lucius Licinius"}],"abbreviations":[{"@lang":"lat","@value":"Cras"}],"works":[{"urn":"urn:cts:latinLit:phi0500.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0706","title":[{"@lang":"lat","@value":"Anonymous (Carmen de Bello Aegyptiaco)"}],"abbreviations":[{"@lang":"lat","@value":"CarmBellAeg"}],"works":[{"urn":"urn:cts:latinLit:phi0706.phi0001","title":[{"@lang":"lat","@value":"Carmen de Bello Aegyptiaco"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0037","title":[{"@lang":"lat","@value":"Curio, Gaius Scribonius (pater)"}],"abbreviations":[{"@lang":"lat","@value":"CurPat"}],"works":[{"urn":"urn:cts:latinLit:phi0037.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0917","title":[{"@lang":"lat","@value":"Lucanus, Marcus Annaeus"}],"abbreviations":[{"@lang":"lat","@value":"Luc"}],"works":[{"urn":"urn:cts:latinLit:phi0917.phi0001","title":[{"@lang":"lat","@value":"Bellum Civile"}],"abbreviations":[{"@lang":"lat","@value":"BC"}]},{"urn":"urn:cts:latinLit:phi0917.phi0002","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0590","title":[{"@lang":"lat","@value":"Nigidius Figulus, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Nigid"}],"works":[{"urn":"urn:cts:latinLit:phi0590.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0662","title":[{"@lang":"lat","@value":"Tiro, Marcus Tullius"}],"abbreviations":[{"@lang":"lat","@value":"Tiro"}],"works":[{"urn":"urn:cts:latinLit:phi0662.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi2003","title":[{"@lang":"lat","@value":"Apicius, Caelius"}],"abbreviations":[{"@lang":"lat","@value":"Apic"}],"works":[{"urn":"urn:cts:latinLit:phi2003.phi0001","title":[{"@lang":"lat","@value":"De Re Coquinaria"}],"abbreviations":[{"@lang":"lat","@value":"Coqu"}]},{"urn":"urn:cts:latinLit:phi2003.phi0002","title":[{"@lang":"lat","@value":"Brevis Ciborum, excerpta"}],"abbreviations":[{"@lang":"lat","@value":"ExcCib"}]},{"urn":"urn:cts:latinLit:phi2003.phi0003","title":[{"@lang":"lat","@value":"Brevis Pimentorum, excerpta"}],"abbreviations":[{"@lang":"lat","@value":"ExcPim"}]}]},{"urn":"urn:cts:latinLit:phi0911","title":[{"@lang":"lat","@value":"Anonymous (Laus Pisonis)"}],"abbreviations":[{"@lang":"lat","@value":"LausPis"}],"works":[{"urn":"urn:cts:latinLit:phi0911.phi0001","title":[{"@lang":"lat","@value":"Laus Pisonis"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0678","title":[{"@lang":"lat","@value":"Valerius Soranus, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"VSor"}],"works":[{"urn":"urn:cts:latinLit:phi0678.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1050","title":[{"@lang":"lat","@value":"Verginius Rufus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Vergin"}],"works":[{"urn":"urn:cts:latinLit:phi1050.phi0001","title":[{"@lang":"lat","@value":"epigramma"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0524","title":[{"@lang":"lat","@value":"Gallus, Gaius Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"CGal"}],"works":[{"urn":"urn:cts:latinLit:phi0524.phi0001","title":[{"@lang":"lat","@value":"elegia"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0524.phi0002","title":[{"@lang":"lat","@value":"elegia in pap. Qas1r Ibrîm"}],"abbreviations":[{"@lang":"lat","@value":"CarmPap"}]}]},{"urn":"urn:cts:latinLit:phi0301","title":[{"@lang":"lat","@value":"Domitius Ahenobarbus, Gnaeus"}],"abbreviations":[{"@lang":"lat","@value":"Ahenobarbus"}],"works":[{"urn":"urn:cts:latinLit:phi0301.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1370","title":[{"@lang":"lat","@value":"Terentius Scaurus, Qunitus"}],"abbreviations":[{"@lang":"lat","@value":"TerScaur"}],"works":[{"urn":"urn:cts:latinLit:phi1370.phi0001","title":[{"@lang":"lat","@value":"De Orthographia"}],"abbreviations":[{"@lang":"lat","@value":"Orth"}]},{"urn":"urn:cts:latinLit:phi1370.phi0002","title":[{"@lang":"lat","@value":"De Adverbio et Praeposit."}],"abbreviations":[{"@lang":"lat","@value":"AdPr"}]},{"urn":"urn:cts:latinLit:phi1370.phi0003","title":[{"@lang":"lat","@value":"fr. in codice Parisino 7520"}],"abbreviations":[{"@lang":"lat","@value":"frgParis"}]},{"urn":"urn:cts:latinLit:phi1370.phi0004","title":[{"@lang":"lat","@value":"De ordinat. part. orat. [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"frgOrd"}]}]},{"urn":"urn:cts:latinLit:phi1260","title":[{"@lang":"lat","@value":"Hadrianus"}],"abbreviations":[{"@lang":"lat","@value":"Hadr"}],"works":[{"urn":"urn:cts:latinLit:phi1260.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi1260.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0474","title":[{"@lang":"lat","@value":"Cicero, Marcus Tullius"}],"abbreviations":[{"@lang":"lat","@value":"Cic"}],"works":[{"urn":"urn:cts:latinLit:phi0474.phi0001","title":[{"@lang":"lat","@value":"Pro Quinctio"}],"abbreviations":[{"@lang":"lat","@value":"Quinct"}]},{"urn":"urn:cts:latinLit:phi0474.phi0002","title":[{"@lang":"lat","@value":"Pro S. Roscio Amerino"}],"abbreviations":[{"@lang":"lat","@value":"SRosc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0003","title":[{"@lang":"lat","@value":"Pro Q. Roscio Comoedo"}],"abbreviations":[{"@lang":"lat","@value":"QRosc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0004","title":[{"@lang":"lat","@value":"In Q. Caecilium"}],"abbreviations":[{"@lang":"lat","@value":"DivCaec"}]},{"urn":"urn:cts:latinLit:phi0474.phi0005","title":[{"@lang":"lat","@value":"In Verrem"}],"abbreviations":[{"@lang":"lat","@value":"Ver"}]},{"urn":"urn:cts:latinLit:phi0474.phi0006","title":[{"@lang":"lat","@value":"Pro Tullio"}],"abbreviations":[{"@lang":"lat","@value":"Tul"}]},{"urn":"urn:cts:latinLit:phi0474.phi0007","title":[{"@lang":"lat","@value":"Pro Fonteio"}],"abbreviations":[{"@lang":"lat","@value":"Font"}]},{"urn":"urn:cts:latinLit:phi0474.phi0008","title":[{"@lang":"lat","@value":"Pro Caecina"}],"abbreviations":[{"@lang":"lat","@value":"Caec"}]},{"urn":"urn:cts:latinLit:phi0474.phi0009","title":[{"@lang":"lat","@value":"Pro Lege Manilia"}],"abbreviations":[{"@lang":"lat","@value":"Man"}]},{"urn":"urn:cts:latinLit:phi0474.phi0010","title":[{"@lang":"lat","@value":"Pro Cluentio"}],"abbreviations":[{"@lang":"lat","@value":"Clu"}]},{"urn":"urn:cts:latinLit:phi0474.phi0011","title":[{"@lang":"lat","@value":"De Lege Agraria"}],"abbreviations":[{"@lang":"lat","@value":"Agr"}]},{"urn":"urn:cts:latinLit:phi0474.phi0012","title":[{"@lang":"lat","@value":"Pro Rabirio Perduellionis Reo"}],"abbreviations":[{"@lang":"lat","@value":"RabPerd"}]},{"urn":"urn:cts:latinLit:phi0474.phi0013","title":[{"@lang":"lat","@value":"In Catilinam"}],"abbreviations":[{"@lang":"lat","@value":"Catil"}]},{"urn":"urn:cts:latinLit:phi0474.phi0014","title":[{"@lang":"lat","@value":"Pro Murena"}],"abbreviations":[{"@lang":"lat","@value":"Mur"}]},{"urn":"urn:cts:latinLit:phi0474.phi0015","title":[{"@lang":"lat","@value":"Pro Sulla"}],"abbreviations":[{"@lang":"lat","@value":"Sul"}]},{"urn":"urn:cts:latinLit:phi0474.phi0016","title":[{"@lang":"lat","@value":"Pro Archia"}],"abbreviations":[{"@lang":"lat","@value":"Arch"}]},{"urn":"urn:cts:latinLit:phi0474.phi0017","title":[{"@lang":"lat","@value":"Pro Flacco"}],"abbreviations":[{"@lang":"lat","@value":"Flac"}]},{"urn":"urn:cts:latinLit:phi0474.phi0018","title":[{"@lang":"lat","@value":"Post Reditum ad Populum"}],"abbreviations":[{"@lang":"lat","@value":"RedPop"}]},{"urn":"urn:cts:latinLit:phi0474.phi0019","title":[{"@lang":"lat","@value":"Post Reditum in Senatu"}],"abbreviations":[{"@lang":"lat","@value":"RedSen"}]},{"urn":"urn:cts:latinLit:phi0474.phi0020","title":[{"@lang":"lat","@value":"De Domo Sua"}],"abbreviations":[{"@lang":"lat","@value":"Dom"}]},{"urn":"urn:cts:latinLit:phi0474.phi0021","title":[{"@lang":"lat","@value":"De Haruspicum Responso"}],"abbreviations":[{"@lang":"lat","@value":"Har"}]},{"urn":"urn:cts:latinLit:phi0474.phi0022","title":[{"@lang":"lat","@value":"Pro Sestio"}],"abbreviations":[{"@lang":"lat","@value":"Sest"}]},{"urn":"urn:cts:latinLit:phi0474.phi0023","title":[{"@lang":"lat","@value":"In Vatinium"}],"abbreviations":[{"@lang":"lat","@value":"Vat"}]},{"urn":"urn:cts:latinLit:phi0474.phi0024","title":[{"@lang":"lat","@value":"Pro Caelio"}],"abbreviations":[{"@lang":"lat","@value":"Cael"}]},{"urn":"urn:cts:latinLit:phi0474.phi0025","title":[{"@lang":"lat","@value":"De Provinciis Consularibus"}],"abbreviations":[{"@lang":"lat","@value":"Prov"}]},{"urn":"urn:cts:latinLit:phi0474.phi0026","title":[{"@lang":"lat","@value":"Pro Balbo"}],"abbreviations":[{"@lang":"lat","@value":"Balb"}]},{"urn":"urn:cts:latinLit:phi0474.phi0027","title":[{"@lang":"lat","@value":"In Pisonem"}],"abbreviations":[{"@lang":"lat","@value":"Pis"}]},{"urn":"urn:cts:latinLit:phi0474.phi0028","title":[{"@lang":"lat","@value":"Pro Plancio"}],"abbreviations":[{"@lang":"lat","@value":"Planc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0029","title":[{"@lang":"lat","@value":"Pro Scauro"}],"abbreviations":[{"@lang":"lat","@value":"Scaur"}]},{"urn":"urn:cts:latinLit:phi0474.phi0030","title":[{"@lang":"lat","@value":"Pro Rabirio Postumo"}],"abbreviations":[{"@lang":"lat","@value":"RabPost"}]},{"urn":"urn:cts:latinLit:phi0474.phi0031","title":[{"@lang":"lat","@value":"Pro Milone"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]},{"urn":"urn:cts:latinLit:phi0474.phi0032","title":[{"@lang":"lat","@value":"Pro Marcello"}],"abbreviations":[{"@lang":"lat","@value":"Marc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0033","title":[{"@lang":"lat","@value":"Pro Ligario"}],"abbreviations":[{"@lang":"lat","@value":"Lig"}]},{"urn":"urn:cts:latinLit:phi0474.phi0034","title":[{"@lang":"lat","@value":"Pro Rege Deiotaro"}],"abbreviations":[{"@lang":"lat","@value":"Deiot"}]},{"urn":"urn:cts:latinLit:phi0474.phi0035","title":[{"@lang":"lat","@value":"Philippicae"}],"abbreviations":[{"@lang":"lat","@value":"Phil"}]},{"urn":"urn:cts:latinLit:phi0474.phi0036","title":[{"@lang":"lat","@value":"De Inventione"}],"abbreviations":[{"@lang":"lat","@value":"Inv"}]},{"urn":"urn:cts:latinLit:phi0474.phi0037","title":[{"@lang":"lat","@value":"De Oratore"}],"abbreviations":[{"@lang":"lat","@value":"deOrat"}]},{"urn":"urn:cts:latinLit:phi0474.phi0038","title":[{"@lang":"lat","@value":"De Partitione Oratoria"}],"abbreviations":[{"@lang":"lat","@value":"Part"}]},{"urn":"urn:cts:latinLit:phi0474.phi0039","title":[{"@lang":"lat","@value":"Brutus"}],"abbreviations":[{"@lang":"lat","@value":"Brut"}]},{"urn":"urn:cts:latinLit:phi0474.phi0040","title":[{"@lang":"lat","@value":"Orator"}],"abbreviations":[{"@lang":"lat","@value":"Orat"}]},{"urn":"urn:cts:latinLit:phi0474.phi0041","title":[{"@lang":"lat","@value":"De Optimo Genere Oratorum"}],"abbreviations":[{"@lang":"lat","@value":"OptGen"}]},{"urn":"urn:cts:latinLit:phi0474.phi0042","title":[{"@lang":"lat","@value":"Topica"}],"abbreviations":[{"@lang":"lat","@value":"Top"}]},{"urn":"urn:cts:latinLit:phi0474.phi0043","title":[{"@lang":"lat","@value":"De Republica"}],"abbreviations":[{"@lang":"lat","@value":"Rep"}]},{"urn":"urn:cts:latinLit:phi0474.phi0044","title":[{"@lang":"lat","@value":"De Legibus"}],"abbreviations":[{"@lang":"lat","@value":"Leg"}]},{"urn":"urn:cts:latinLit:phi0474.phi0045","title":[{"@lang":"lat","@value":"Academica"}],"abbreviations":[{"@lang":"lat","@value":"Ac"}]},{"urn":"urn:cts:latinLit:phi0474.phi0046","title":[{"@lang":"lat","@value":"Lucullus"}],"abbreviations":[{"@lang":"lat","@value":"Luc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0047","title":[{"@lang":"lat","@value":"Paradoxa Stoicorum"}],"abbreviations":[{"@lang":"lat","@value":"Parad"}]},{"urn":"urn:cts:latinLit:phi0474.phi0048","title":[{"@lang":"lat","@value":"De Finibus"}],"abbreviations":[{"@lang":"lat","@value":"Fin"}]},{"urn":"urn:cts:latinLit:phi0474.phi0049","title":[{"@lang":"lat","@value":"Tusculanae Disputationes"}],"abbreviations":[{"@lang":"lat","@value":"Tusc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0050","title":[{"@lang":"lat","@value":"De Natura Deorum"}],"abbreviations":[{"@lang":"lat","@value":"ND"}]},{"urn":"urn:cts:latinLit:phi0474.phi0051","title":[{"@lang":"lat","@value":"Cato Maior de Senectute"}],"abbreviations":[{"@lang":"lat","@value":"Sen"}]},{"urn":"urn:cts:latinLit:phi0474.phi0052","title":[{"@lang":"lat","@value":"Laelius de Amicitia"}],"abbreviations":[{"@lang":"lat","@value":"Amic"}]},{"urn":"urn:cts:latinLit:phi0474.phi0053","title":[{"@lang":"lat","@value":"De Divinatione"}],"abbreviations":[{"@lang":"lat","@value":"Div"}]},{"urn":"urn:cts:latinLit:phi0474.phi0054","title":[{"@lang":"lat","@value":"De Fato"}],"abbreviations":[{"@lang":"lat","@value":"Fat"}]},{"urn":"urn:cts:latinLit:phi0474.phi0055","title":[{"@lang":"lat","@value":"De Officiis"}],"abbreviations":[{"@lang":"lat","@value":"Off"}]},{"urn":"urn:cts:latinLit:phi0474.phi0056","title":[{"@lang":"lat","@value":"Epistulae ad Familiares"}],"abbreviations":[{"@lang":"lat","@value":"Fam"}]},{"urn":"urn:cts:latinLit:phi0474.phi0057","title":[{"@lang":"lat","@value":"Epistulae ad Atticum"}],"abbreviations":[{"@lang":"lat","@value":"Att"}]},{"urn":"urn:cts:latinLit:phi0474.phi0058","title":[{"@lang":"lat","@value":"Epistulae ad Quintum Fratrem"}],"abbreviations":[{"@lang":"lat","@value":"Qfr"}]},{"urn":"urn:cts:latinLit:phi0474.phi0059","title":[{"@lang":"lat","@value":"Epistulae ad Brutum"}],"abbreviations":[{"@lang":"lat","@value":"adBrut"}]},{"urn":"urn:cts:latinLit:phi0474.phi0060","title":[{"@lang":"lat","@value":"Arati Phaenomena"}],"abbreviations":[{"@lang":"lat","@value":"AratPhaen"}]},{"urn":"urn:cts:latinLit:phi0474.phi0061","title":[{"@lang":"lat","@value":"Facete Dicta"}],"abbreviations":[{"@lang":"lat","@value":"Facet"}]},{"urn":"urn:cts:latinLit:phi0474.phi0062","title":[{"@lang":"lat","@value":"carmina, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0474.phi0063","title":[{"@lang":"lat","@value":"Commentarii Causarum"}],"abbreviations":[{"@lang":"lat","@value":"CommCaus"}]},{"urn":"urn:cts:latinLit:phi0474.phi0064","title":[{"@lang":"lat","@value":"epistulae, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"epfrg"}]},{"urn":"urn:cts:latinLit:phi0474.phi0065","title":[{"@lang":"lat","@value":"Hortensius"}],"abbreviations":[{"@lang":"lat","@value":"Hort"}]},{"urn":"urn:cts:latinLit:phi0474.phi0066","title":[{"@lang":"lat","@value":"incertorum librorum fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"libinc"}]},{"urn":"urn:cts:latinLit:phi0474.phi0067","title":[{"@lang":"lat","@value":"De Iure Civ. in Artem Redig."}],"abbreviations":[{"@lang":"lat","@value":"IurCiv"}]},{"urn":"urn:cts:latinLit:phi0474.phi0068","title":[{"@lang":"lat","@value":"orationum deperditarum frr."}],"abbreviations":[{"@lang":"lat","@value":"oratdep"}]},{"urn":"urn:cts:latinLit:phi0474.phi0069","title":[{"@lang":"lat","@value":"orationum incertarum frr."}],"abbreviations":[{"@lang":"lat","@value":"incorat"}]},{"urn":"urn:cts:latinLit:phi0474.phi0070","title":[{"@lang":"lat","@value":"philosophicorum librorum frr."}],"abbreviations":[{"@lang":"lat","@value":"philfrg"}]},{"urn":"urn:cts:latinLit:phi0474.phi0071","title":[{"@lang":"lat","@value":"Arati Prognostica"}],"abbreviations":[{"@lang":"lat","@value":"AratProgn"}]},{"urn":"urn:cts:latinLit:phi0474.phi0072","title":[{"@lang":"lat","@value":"Timaeus"}],"abbreviations":[{"@lang":"lat","@value":"Tim"}]},{"urn":"urn:cts:latinLit:phi0474.phi0073","title":[{"@lang":"lat","@value":"Rhetorica ad Herennium [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"RhetHer"}]},{"urn":"urn:cts:latinLit:phi0474.phi0074","title":[{"@lang":"lat","@value":"In Sallustium [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Sal"}]},{"urn":"urn:cts:latinLit:phi0474.phi0075","title":[{"@lang":"lat","@value":"epistula ad Octavianum [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"EpOct"}]}]},{"urn":"urn:cts:latinLit:phi0535","title":[{"@lang":"lat","@value":"Iuventius Laterensis, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Iuventius"}],"works":[{"urn":"urn:cts:latinLit:phi0535.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0721","title":[{"@lang":"lat","@value":"Panurgus, Antonius"}],"abbreviations":[{"@lang":"lat","@value":"AntPan"}],"works":[{"urn":"urn:cts:latinLit:phi0721.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1263","title":[{"@lang":"lat","@value":"Hyginus"}],"abbreviations":[{"@lang":"lat","@value":"HygFab"}],"works":[{"urn":"urn:cts:latinLit:phi1263.phi0001","title":[{"@lang":"lat","@value":"Fabulae"}],"abbreviations":[{"@lang":"lat","@value":"Fab"}]}]},{"urn":"urn:cts:latinLit:phi2468","title":[{"@lang":"lat","@value":"Augustinus, Aurelius"}],"abbreviations":[{"@lang":"lat","@value":"August"}],"works":[{"urn":"urn:cts:latinLit:phi2468.phi0001","title":[{"@lang":"lat","@value":"Laus Cerei"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1257","title":[{"@lang":"lat","@value":"Licinianus, Granius"}],"abbreviations":[{"@lang":"lat","@value":"GranLic"}],"works":[{"urn":"urn:cts:latinLit:phi1257.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"Ann"}]}]},{"urn":"urn:cts:latinLit:phi0944","title":[{"@lang":"lat","@value":"Nero, Imperator"}],"abbreviations":[{"@lang":"lat","@value":"Nero"}],"works":[{"urn":"urn:cts:latinLit:phi0944.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1242","title":[{"@lang":"lat","@value":"Florus, Annius"}],"abbreviations":[{"@lang":"lat","@value":"Flor"}],"works":[{"urn":"urn:cts:latinLit:phi1242.phi0001","title":[{"@lang":"lat","@value":"Epitome Bell. Omn. Ann. DCC"}],"abbreviations":[{"@lang":"lat","@value":"Epit"}]},{"urn":"urn:cts:latinLit:phi1242.phi0002","title":[{"@lang":"lat","@value":"Vergilius Orator an Poeta"}],"abbreviations":[{"@lang":"lat","@value":"Verg"}]},{"urn":"urn:cts:latinLit:phi1242.phi0003","title":[{"@lang":"lat","@value":"carmina in Anthologia Latina"}],"abbreviations":[{"@lang":"lat","@value":"anth"}]},{"urn":"urn:cts:latinLit:phi1242.phi0004","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi1242.phi0005","title":[{"@lang":"lat","@value":"epist. ad imperat. Hadrianum"}],"abbreviations":[{"@lang":"lat","@value":"Epist"}]}]},{"urn":"urn:cts:latinLit:phi0634","title":[{"@lang":"lat","@value":"Santra"}],"abbreviations":[{"@lang":"lat","@value":"San"}],"works":[{"urn":"urn:cts:latinLit:phi0634.phi0001","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]},{"urn":"urn:cts:latinLit:phi0634.phi0002","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0143","title":[{"@lang":"lat","@value":"Trabea"}],"abbreviations":[{"@lang":"lat","@value":"Trab"}],"works":[{"urn":"urn:cts:latinLit:phi0143.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0546","title":[{"@lang":"lat","@value":"Mucianus, Gaius Licinius"}],"abbreviations":[{"@lang":"lat","@value":"Muc"}],"works":[{"urn":"urn:cts:latinLit:phi0546.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1908","title":[{"@lang":"lat","@value":"Antipater, Gallus"}],"abbreviations":[{"@lang":"lat","@value":"GalAnt"}],"works":[{"urn":"urn:cts:latinLit:phi1908.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0694","title":[{"@lang":"lat","@value":"Volumnius"}],"abbreviations":[{"@lang":"lat","@value":"Vol"}],"works":[{"urn":"urn:cts:latinLit:phi0694.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0827","title":[{"@lang":"lat","@value":"Caesellius Vindex"}],"abbreviations":[{"@lang":"lat","@value":"Caesel"}],"works":[{"urn":"urn:cts:latinLit:phi0827.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1224","title":[{"@lang":"lat","@value":"Aurelius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Aur"}],"works":[{"urn":"urn:cts:latinLit:phi1224.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0692","title":[{"@lang":"lat","@value":"Appendix Vergiliana"}],"abbreviations":[{"@lang":"lat","@value":"AppVerg"}],"works":[{"urn":"urn:cts:latinLit:phi0692.phi0001","title":[{"@lang":"lat","@value":"Dirae"}],"abbreviations":[{"@lang":"lat","@value":"Dirae"}]},{"urn":"urn:cts:latinLit:phi0692.phi0002","title":[{"@lang":"lat","@value":"Lydia"}],"abbreviations":[{"@lang":"lat","@value":"Lydia"}]},{"urn":"urn:cts:latinLit:phi0692.phi0003","title":[{"@lang":"lat","@value":"Culex"}],"abbreviations":[{"@lang":"lat","@value":"Culex"}]},{"urn":"urn:cts:latinLit:phi0692.phi0004","title":[{"@lang":"lat","@value":"Aetna"}],"abbreviations":[{"@lang":"lat","@value":"Aetna"}]},{"urn":"urn:cts:latinLit:phi0692.phi0005","title":[{"@lang":"lat","@value":"Copa"}],"abbreviations":[{"@lang":"lat","@value":"Copa"}]},{"urn":"urn:cts:latinLit:phi0692.phi0006","title":[{"@lang":"lat","@value":"Elegiae in Maecenatem"}],"abbreviations":[{"@lang":"lat","@value":"ElegMaec"}]},{"urn":"urn:cts:latinLit:phi0692.phi0007","title":[{"@lang":"lat","@value":"Ciris"}],"abbreviations":[{"@lang":"lat","@value":"Ciris"}]},{"urn":"urn:cts:latinLit:phi0692.phi0008","title":[{"@lang":"lat","@value":"Priapea"}],"abbreviations":[{"@lang":"lat","@value":"Priapea"}]},{"urn":"urn:cts:latinLit:phi0692.phi0009","title":[{"@lang":"lat","@value":"Catalepton"}],"abbreviations":[{"@lang":"lat","@value":"Catal"}]},{"urn":"urn:cts:latinLit:phi0692.phi0010","title":[{"@lang":"lat","@value":"Priapeum 'Quid Hoc Novi Est?'"}],"abbreviations":[{"@lang":"lat","@value":"Priapeum"}]},{"urn":"urn:cts:latinLit:phi0692.phi0011","title":[{"@lang":"lat","@value":"Moretum"}],"abbreviations":[{"@lang":"lat","@value":"Mor"}]},{"urn":"urn:cts:latinLit:phi0692.phi0012","title":[{"@lang":"lat","@value":"De Institutione Viri Boni"}],"abbreviations":[{"@lang":"lat","@value":"InstVir"}]},{"urn":"urn:cts:latinLit:phi0692.phi0013","title":[{"@lang":"lat","@value":"De Est et Non"}],"abbreviations":[{"@lang":"lat","@value":"DeEst"}]},{"urn":"urn:cts:latinLit:phi0692.phi0014","title":[{"@lang":"lat","@value":"De Rosis Nascentibus"}],"abbreviations":[{"@lang":"lat","@value":"Rosis"}]}]},{"urn":"urn:cts:latinLit:phi1306","title":[{"@lang":"lat","@value":"Lucius Neratius Priscus"}],"abbreviations":[{"@lang":"lat","@value":"Nerat"}],"works":[{"urn":"urn:cts:latinLit:phi1306.phi0002","title":[{"@lang":"lat","@value":"fr. in fragmentis Vaticanis"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0636","title":[{"@lang":"lat","@value":"Quintus Mucius Scaevola"}],"abbreviations":[{"@lang":"lat","@value":"Scaev"}],"works":[{"urn":"urn:cts:latinLit:phi0636.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0648","title":[{"@lang":"lat","@value":"Staberius Eros"}],"abbreviations":[{"@lang":"lat","@value":"Staber"}],"works":[{"urn":"urn:cts:latinLit:phi0648.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0442","title":[{"@lang":"lat","@value":"Aulus Caecina"}],"abbreviations":[{"@lang":"lat","@value":"Caecin"}],"works":[{"urn":"urn:cts:latinLit:phi0442.phi0002","title":[{"@lang":"lat","@value":"fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0658","title":[{"@lang":"lat","@value":"Tabulae Censoriae"}],"abbreviations":[{"@lang":"lat","@value":"TabCens"}],"works":[{"urn":"urn:cts:latinLit:phi0658.phi0001","title":[{"@lang":"lat","@value":"Tabulae Censoriae"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0987","title":[{"@lang":"lat","@value":"Pomponius Secundus, Publius"}],"abbreviations":[{"@lang":"lat","@value":"PPompon"}],"works":[{"urn":"urn:cts:latinLit:phi0987.phi0001","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]},{"urn":"urn:cts:latinLit:phi0987.phi0002","title":[{"@lang":"lat","@value":"praetextae"}],"abbreviations":[{"@lang":"lat","@value":"praet"}]}]},{"urn":"urn:cts:latinLit:phi1203","title":[{"@lang":"lat","@value":"Alfius Avitus"}],"abbreviations":[{"@lang":"lat","@value":"Avit"}],"works":[{"urn":"urn:cts:latinLit:phi1203.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0664","title":[{"@lang":"lat","@value":"Trebatius Testa, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Treb"}],"works":[{"urn":"urn:cts:latinLit:phi0664.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia et al."}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0302","title":[{"@lang":"lat","@value":"Antonius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Antonius"}],"works":[{"urn":"urn:cts:latinLit:phi0302.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0022","title":[{"@lang":"lat","@value":"Cato, Marcus Porcius"}],"abbreviations":[{"@lang":"lat","@value":"CatoCens"}],"works":[{"urn":"urn:cts:latinLit:phi0022.phi0001","title":[{"@lang":"lat","@value":"De Agri Cultura"}],"abbreviations":[{"@lang":"lat","@value":"Agr"}]},{"urn":"urn:cts:latinLit:phi0022.phi0002","title":[{"@lang":"lat","@value":"De Agri Cultura, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"Agrfr"}]},{"urn":"urn:cts:latinLit:phi0022.phi0003","title":[{"@lang":"lat","@value":"Dicta Memorabilia"}],"abbreviations":[{"@lang":"lat","@value":"Dict"}]},{"urn":"urn:cts:latinLit:phi0022.phi0004","title":[{"@lang":"lat","@value":"epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]},{"urn":"urn:cts:latinLit:phi0022.phi0005","title":[{"@lang":"lat","@value":"De Medicina"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]},{"urn":"urn:cts:latinLit:phi0022.phi0006","title":[{"@lang":"lat","@value":"incertorum librorum fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"inc"}]},{"urn":"urn:cts:latinLit:phi0022.phi0007","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]},{"urn":"urn:cts:latinLit:phi0022.phi0008","title":[{"@lang":"lat","@value":"De Re Militari"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]},{"urn":"urn:cts:latinLit:phi0022.phi0009","title":[{"@lang":"lat","@value":"Carmen De Moribus"}],"abbreviations":[{"@lang":"lat","@value":"Mor"}]},{"urn":"urn:cts:latinLit:phi0022.phi0010","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]},{"urn":"urn:cts:latinLit:phi0022.phi0011","title":[{"@lang":"lat","@value":"Origines"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0022.phi0012","title":[{"@lang":"lat","@value":"De Rhetorica"}],"abbreviations":[{"@lang":"lat","@value":"Rhet"}]}]},{"urn":"urn:cts:latinLit:phi0518","title":[{"@lang":"lat","@value":"Furius Antias, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"FurAnt"}],"works":[{"urn":"urn:cts:latinLit:phi0518.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2150","title":[{"@lang":"lat","@value":"Zeno of Verona"}],"abbreviations":[{"@lang":"lat","@value":"Zeno"}],"works":[{"urn":"urn:cts:latinLit:phi2150.phi0001","title":[{"@lang":"lat","@value":"Tractatus"}],"abbreviations":[{"@lang":"lat","@value":"Tract"}]}]},{"urn":"urn:cts:latinLit:phi0684","title":[{"@lang":"lat","@value":"Varro, Marcus Terentius"}],"abbreviations":[{"@lang":"lat","@value":"Var"}],"works":[{"urn":"urn:cts:latinLit:phi0684.phi0001","title":[{"@lang":"lat","@value":"De Lingua Latina"}],"abbreviations":[{"@lang":"lat","@value":"L"}]},{"urn":"urn:cts:latinLit:phi0684.phi0002","title":[{"@lang":"lat","@value":"Res Rusticae"}],"abbreviations":[{"@lang":"lat","@value":"R"}]},{"urn":"urn:cts:latinLit:phi0684.phi0003","title":[{"@lang":"lat","@value":"Antiquitates Rerum Humanarum"}],"abbreviations":[{"@lang":"lat","@value":"AntiqHum"}]},{"urn":"urn:cts:latinLit:phi0684.phi0004","title":[{"@lang":"lat","@value":"Antiquitates Rerum Divinarum"}],"abbreviations":[{"@lang":"lat","@value":"AntiqDiv"}]},{"urn":"urn:cts:latinLit:phi0684.phi0005","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"Ann"}]},{"urn":"urn:cts:latinLit:phi0684.phi0006","title":[{"@lang":"lat","@value":"De Gente Populi Romani"}],"abbreviations":[{"@lang":"lat","@value":"GentPopRom"}]},{"urn":"urn:cts:latinLit:phi0684.phi0007","title":[{"@lang":"lat","@value":"De Vita Populi Romani"}],"abbreviations":[{"@lang":"lat","@value":"VitaPopRom"}]},{"urn":"urn:cts:latinLit:phi0684.phi0008","title":[{"@lang":"lat","@value":"Res Urbanae"}],"abbreviations":[{"@lang":"lat","@value":"ResUrb"}]},{"urn":"urn:cts:latinLit:phi0684.phi0009","title":[{"@lang":"lat","@value":"Logistorici"}],"abbreviations":[{"@lang":"lat","@value":"Log"}]},{"urn":"urn:cts:latinLit:phi0684.phi0010","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"carm"}]},{"urn":"urn:cts:latinLit:phi0684.phi0011","title":[{"@lang":"lat","@value":"Menippeae"}],"abbreviations":[{"@lang":"lat","@value":"Men"}]},{"urn":"urn:cts:latinLit:phi0684.phi0012","title":[{"@lang":"lat","@value":"epistulae"}],"abbreviations":[{"@lang":"lat","@value":"epist"}]},{"urn":"urn:cts:latinLit:phi0684.phi0013","title":[{"@lang":"lat","@value":"epistulae Latinae"}],"abbreviations":[{"@lang":"lat","@value":"epistLat"}]},{"urn":"urn:cts:latinLit:phi0684.phi0014","title":[{"@lang":"lat","@value":"fragmenta grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0684.phi0015","title":[{"@lang":"lat","@value":"frr. de historia litterarum"}],"abbreviations":[{"@lang":"lat","@value":"litt"}]},{"urn":"urn:cts:latinLit:phi0684.phi0016","title":[{"@lang":"lat","@value":"fragmenta varia"}],"abbreviations":[{"@lang":"lat","@value":"var"}]},{"urn":"urn:cts:latinLit:phi0684.phi0017","title":[{"@lang":"lat","@value":"incertae sedis fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"inc"}]}]},{"urn":"urn:cts:latinLit:phi0680","title":[{"@lang":"lat","@value":"Valgius Rufus, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Valg"}],"works":[{"urn":"urn:cts:latinLit:phi0680.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0884","title":[{"@lang":"lat","@value":"Gracchus"}],"abbreviations":[{"@lang":"lat","@value":"GracchTrag"}],"works":[{"urn":"urn:cts:latinLit:phi0884.phi0001","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi2302","title":[{"@lang":"lat","@value":"Symmachus, L. Aurel. Avianius"}],"abbreviations":[{"@lang":"lat","@value":"LSymm"}],"works":[{"urn":"urn:cts:latinLit:phi2302.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0966","title":[{"@lang":"lat","@value":"Passienus Crispus"}],"abbreviations":[{"@lang":"lat","@value":"Passien"}],"works":[{"urn":"urn:cts:latinLit:phi0966.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0016","title":[{"@lang":"lat","@value":"Piso Frugi, Lucius Calpurnius"}],"abbreviations":[{"@lang":"lat","@value":"CalpPis"}],"works":[{"urn":"urn:cts:latinLit:phi0016.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0097","title":[{"@lang":"lat","@value":"Lucilius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Lucil"}],"works":[{"urn":"urn:cts:latinLit:phi0097.phi0001","title":[{"@lang":"lat","@value":"Saturae, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"Sat"}]}]},{"urn":"urn:cts:latinLit:phi2301","title":[{"@lang":"lat","@value":"Symmachus, Q. Aurelius"}],"abbreviations":[{"@lang":"lat","@value":"QSymm"}],"works":[{"urn":"urn:cts:latinLit:phi2301.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0908","title":[{"@lang":"lat","@value":"Labeo, Attius"}],"abbreviations":[{"@lang":"lat","@value":"AttLabeo"}],"works":[{"urn":"urn:cts:latinLit:phi0908.phi0001","title":[{"@lang":"lat","@value":"versio Latina Iliados"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0460","title":[{"@lang":"lat","@value":"Carbo Arvina, Gaius Papirius"}],"abbreviations":[{"@lang":"lat","@value":"CarboArv"}],"works":[{"urn":"urn:cts:latinLit:phi0460.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0975","title":[{"@lang":"lat","@value":"Phaedrus"}],"abbreviations":[{"@lang":"lat","@value":"Phaed"}],"works":[{"urn":"urn:cts:latinLit:phi0975.phi0001","title":[{"@lang":"lat","@value":"Fabulae Aesopiae"}],"abbreviations":[{"@lang":"lat","@value":"Fab"}]},{"urn":"urn:cts:latinLit:phi0975.phi0002","title":[{"@lang":"lat","@value":"Fabularum Appendix"}],"abbreviations":[{"@lang":"lat","@value":"App"}]}]},{"urn":"urn:cts:latinLit:phi1500","title":[{"@lang":"lat","@value":"Altercatio Hadr. et Epicteti"}],"abbreviations":[{"@lang":"lat","@value":"Altercat"}],"works":[{"urn":"urn:cts:latinLit:phi1500.phi0001","title":[{"@lang":"lat","@value":"Altercatio Hadr. et Epicteti"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0824","title":[{"@lang":"lat","@value":"Caelius Sabinus, Cn. Arulenus"}],"abbreviations":[{"@lang":"lat","@value":"CaelSab"}],"works":[{"urn":"urn:cts:latinLit:phi0824.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0854","title":[{"@lang":"lat","@value":"Cornificius Gallus"}],"abbreviations":[{"@lang":"lat","@value":"CornifGal"}],"works":[{"urn":"urn:cts:latinLit:phi0854.phi0001","title":[{"@lang":"lat","@value":"versus in Vergilium"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0140","title":[{"@lang":"lat","@value":"Titius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Tit"}],"works":[{"urn":"urn:cts:latinLit:phi0140.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0592","title":[{"@lang":"lat","@value":"Novius"}],"abbreviations":[{"@lang":"lat","@value":"Nov"}],"works":[{"urn":"urn:cts:latinLit:phi0592.phi0001","title":[{"@lang":"lat","@value":"Atellanae"}],"abbreviations":[{"@lang":"lat","@value":"atell"}]}]},{"urn":"urn:cts:latinLit:phi0842","title":[{"@lang":"lat","@value":"Clodius Licinus, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"ClodLic"}],"works":[{"urn":"urn:cts:latinLit:phi0842.phi0001","title":[{"@lang":"lat","@value":"Libri Rerum Romanarum"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0446","title":[{"@lang":"lat","@value":"Caepio, Quintus Servilius"}],"abbreviations":[{"@lang":"lat","@value":"Caep"}],"works":[{"urn":"urn:cts:latinLit:phi0446.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0620","title":[{"@lang":"lat","@value":"Propertius, Sextus"}],"abbreviations":[{"@lang":"lat","@value":"Prop"}],"works":[{"urn":"urn:cts:latinLit:phi0620.phi0001","title":[{"@lang":"lat","@value":"Elegiae"}],"abbreviations":[{"@lang":"lat","@value":"Eleg"}]}]},{"urn":"urn:cts:latinLit:phi0515","title":[{"@lang":"lat","@value":"Ennius, Sextus (vel Spurius)"}],"abbreviations":[{"@lang":"lat","@value":"SexEnn"}],"works":[{"urn":"urn:cts:latinLit:phi0515.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0116","title":[{"@lang":"lat","@value":"Pacuvius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Pac"}],"works":[{"urn":"urn:cts:latinLit:phi0116.phi0001","title":[{"@lang":"lat","@value":"praetextae"}],"abbreviations":[{"@lang":"lat","@value":"praet"}]},{"urn":"urn:cts:latinLit:phi0116.phi0002","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0502","title":[{"@lang":"lat","@value":"Cremutius Cordus, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"Crem"}],"works":[{"urn":"urn:cts:latinLit:phi0502.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0122","title":[{"@lang":"lat","@value":"Postumius Albinus, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"Post"}],"works":[{"urn":"urn:cts:latinLit:phi0122.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi2349","title":[{"@lang":"lat","@value":"Servius, active 4th century"}],"abbreviations":[{"@lang":"lat","@value":"Serv"}],"works":[{"urn":"urn:cts:latinLit:phi2349.phi0001","title":[{"@lang":"lat","@value":"De Centum Metris"}],"abbreviations":[{"@lang":"lat","@value":"CentMetr"}]},{"urn":"urn:cts:latinLit:phi2349.phi0002","title":[{"@lang":"lat","@value":"Commentarius in Artem Donati"}],"abbreviations":[{"@lang":"lat","@value":"CommDon"}]},{"urn":"urn:cts:latinLit:phi2349.phi0003","title":[{"@lang":"lat","@value":"De Finalibus"}],"abbreviations":[{"@lang":"lat","@value":"Final"}]},{"urn":"urn:cts:latinLit:phi2349.phi0004","title":[{"@lang":"lat","@value":"De Metris Horatianis"}],"abbreviations":[{"@lang":"lat","@value":"MetrHor"}]},{"urn":"urn:cts:latinLit:phi2349.phi0005","title":[{"@lang":"lat","@value":"In Vergilii Aeneidos Libros"}],"abbreviations":[{"@lang":"lat","@value":"A"}]},{"urn":"urn:cts:latinLit:phi2349.phi0006","title":[{"@lang":"lat","@value":"In Vergilii Bucolicon Librum"}],"abbreviations":[{"@lang":"lat","@value":"Ecl"}]},{"urn":"urn:cts:latinLit:phi2349.phi0007","title":[{"@lang":"lat","@value":"In Vergilii Georgicon Libros"}],"abbreviations":[{"@lang":"lat","@value":"G"}]}]},{"urn":"urn:cts:latinLit:phi0472","title":[{"@lang":"lat","@value":"Catullus, Gaius Valerius"}],"abbreviations":[{"@lang":"lat","@value":"Catul"}],"works":[{"urn":"urn:cts:latinLit:phi0472.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"Carm"}]},{"urn":"urn:cts:latinLit:phi0472.phi0002","title":[{"@lang":"lat","@value":"carminum fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi1351","title":[{"@lang":"lat","@value":"Tacitus, Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Tac"}],"works":[{"urn":"urn:cts:latinLit:phi1351.phi0001","title":[{"@lang":"lat","@value":"De Vita Iulii Agricolae"}],"abbreviations":[{"@lang":"lat","@value":"Ag"}]},{"urn":"urn:cts:latinLit:phi1351.phi0002","title":[{"@lang":"lat","@value":"De Origine et Situ Germanorum"}],"abbreviations":[{"@lang":"lat","@value":"Ger"}]},{"urn":"urn:cts:latinLit:phi1351.phi0003","title":[{"@lang":"lat","@value":"Dialogus de Oratoribus"}],"abbreviations":[{"@lang":"lat","@value":"Dial"}]},{"urn":"urn:cts:latinLit:phi1351.phi0004","title":[{"@lang":"lat","@value":"Historiae"}],"abbreviations":[{"@lang":"lat","@value":"Hist"}]},{"urn":"urn:cts:latinLit:phi1351.phi0005","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"Ann"}]}]},{"urn":"urn:cts:latinLit:phi1672","title":[{"@lang":"lat","@value":"Valerius, Iulius"}],"abbreviations":[{"@lang":"lat","@value":"IulVal"}],"works":[{"urn":"urn:cts:latinLit:phi1672.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2028","title":[{"@lang":"lat","@value":"Chalcidius"}],"abbreviations":[{"@lang":"lat","@value":"Chalc"}],"works":[{"urn":"urn:cts:latinLit:phi2028.phi0001","title":[{"@lang":"lat","@value":"Ex Graecis Conversiones"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2097","title":[{"@lang":"lat","@value":"Paconianus, Sextus"}],"abbreviations":[{"@lang":"lat","@value":"Pacon"}],"works":[{"urn":"urn:cts:latinLit:phi2097.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0512","title":[{"@lang":"lat","@value":"Duronius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Duron"}],"works":[{"urn":"urn:cts:latinLit:phi0512.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi2000","title":[{"@lang":"lat","@value":"Ablabius"}],"abbreviations":[{"@lang":"lat","@value":"Ablab"}],"works":[{"urn":"urn:cts:latinLit:phi2000.phi0001","title":[{"@lang":"lat","@value":"epigramma"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2335","title":[{"@lang":"lat","@value":"Anonymi de Differentiis [Fronto]"}],"abbreviations":[{"@lang":"lat","@value":"Diff"}],"works":[{"urn":"urn:cts:latinLit:phi2335.phi0001","title":[{"@lang":"lat","@value":"De Differentiis"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0426","title":[{"@lang":"lat","@value":"Pseudo-Caesar (Bellum Africum)"}],"abbreviations":[{"@lang":"lat","@value":"BAfr"}],"works":[{"urn":"urn:cts:latinLit:phi0426.phi0001","title":[{"@lang":"lat","@value":"Bellum Africum"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0514","title":[{"@lang":"lat","@value":"Egnatius"}],"abbreviations":[{"@lang":"lat","@value":"Egn"}],"works":[{"urn":"urn:cts:latinLit:phi0514.phi0001","title":[{"@lang":"lat","@value":"De Rerum Natura"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0815","title":[{"@lang":"lat","@value":"Niger, Bruttedius"}],"abbreviations":[{"@lang":"lat","@value":"Brutted"}],"works":[{"urn":"urn:cts:latinLit:phi0815.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1348","title":[{"@lang":"lat","@value":"Suetonius Tranquillus, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Suet"}],"works":[{"urn":"urn:cts:latinLit:phi1348.phi0001","title":[{"@lang":"lat","@value":"De Vita Caesarum"}],"abbreviations":[{"@lang":"lat","@value":"VC"}]},{"urn":"urn:cts:latinLit:phi1348.phi0002","title":[{"@lang":"lat","@value":"De Poetis"}],"abbreviations":[{"@lang":"lat","@value":"Poet"}]},{"urn":"urn:cts:latinLit:phi1348.phi0003","title":[{"@lang":"lat","@value":"De Historicis"}],"abbreviations":[{"@lang":"lat","@value":"Hist"}]},{"urn":"urn:cts:latinLit:phi1348.phi0004","title":[{"@lang":"lat","@value":"De Grammaticis et Rhetoribus"}],"abbreviations":[{"@lang":"lat","@value":"GramRhet"}]},{"urn":"urn:cts:latinLit:phi1348.phi0005","title":[{"@lang":"lat","@value":"Prata"}],"abbreviations":[{"@lang":"lat","@value":"Prat"}]},{"urn":"urn:cts:latinLit:phi1348.phi0006","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0402","title":[{"@lang":"lat","@value":"Aedituus, Valerius"}],"abbreviations":[{"@lang":"lat","@value":"Aed"}],"works":[{"urn":"urn:cts:latinLit:phi0402.phi0001","title":[{"@lang":"lat","@value":"epigrammata"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0025","title":[{"@lang":"lat","@value":"Cato Salonianus, Marcus Portius M.f.M.n."}],"abbreviations":[{"@lang":"lat","@value":"CatoNep"}],"works":[{"urn":"urn:cts:latinLit:phi0025.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1515","title":[{"@lang":"lat","@value":"Serenus Sammonicus, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"SerSamm"}],"works":[{"urn":"urn:cts:latinLit:phi1515.phi0001","title":[{"@lang":"lat","@value":"Liber Medicinalis"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]},{"urn":"urn:cts:latinLit:phi1515.phi0002","title":[{"@lang":"lat","@value":"Liber Medicinalis, capitula"}],"abbreviations":[{"@lang":"lat","@value":"MedCap"}]}]},{"urn":"urn:cts:latinLit:phi1518","title":[{"@lang":"lat","@value":"Terentianus Maurus"}],"abbreviations":[{"@lang":"lat","@value":"Maur"}],"works":[{"urn":"urn:cts:latinLit:phi1518.phi0001","title":[{"@lang":"lat","@value":"De Litt., De Syll., De Metr."}],"abbreviations":[{"@lang":"lat","@value":"LittSyllMetr"}]}]},{"urn":"urn:cts:latinLit:phi9254","title":[{"@lang":"lat","@value":"Titius"}],"abbreviations":[{"@lang":"lat","@value":"Titius"}],"works":[{"urn":"urn:cts:latinLit:phi9254.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0409","title":[{"@lang":"lat","@value":"Cornificius, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"QCornif"}],"works":[{"urn":"urn:cts:latinLit:phi0409.phi0001","title":[{"@lang":"lat","@value":"carmina, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0857","title":[{"@lang":"lat","@value":"Cornutus, Lucius Annaeus"}],"abbreviations":[{"@lang":"lat","@value":"Cornut"}],"works":[{"urn":"urn:cts:latinLit:phi0857.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0309","title":[{"@lang":"lat","@value":"Anonymous (Carmen Evocationis)"}],"abbreviations":[{"@lang":"lat","@value":"CarmEvoc"}],"works":[{"urn":"urn:cts:latinLit:phi0309.phi0001","title":[{"@lang":"lat","@value":"Carmen Evocationis"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi1380","title":[{"@lang":"lat","@value":"Philumenus medicus"}],"abbreviations":[{"@lang":"lat","@value":"Philum"}],"works":[{"urn":"urn:cts:latinLit:phi1380.phi0001","title":[{"@lang":"lat","@value":"De medicina, versio Latina"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]}]},{"urn":"urn:cts:latinLit:phi0564","title":[{"@lang":"lat","@value":"Manilius, Manius"}],"abbreviations":[{"@lang":"lat","@value":"ManIur"}],"works":[{"urn":"urn:cts:latinLit:phi0564.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0963","title":[{"@lang":"lat","@value":"Palaemon, Quintus Remmius"}],"abbreviations":[{"@lang":"lat","@value":"Palaem"}],"works":[{"urn":"urn:cts:latinLit:phi0963.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0963.phi0002","title":[{"@lang":"lat","@value":"Ars [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Ars"}]}]},{"urn":"urn:cts:latinLit:phi0537","title":[{"@lang":"lat","@value":"Labienus, Titus"}],"abbreviations":[{"@lang":"lat","@value":"Labienus"}],"works":[{"urn":"urn:cts:latinLit:phi0537.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0470","title":[{"@lang":"lat","@value":"Cato Uticensis, Marcus Porcius"}],"abbreviations":[{"@lang":"lat","@value":"CatoUtic"}],"works":[{"urn":"urn:cts:latinLit:phi0470.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0806","title":[{"@lang":"lat","@value":"Capito, Gaius Ateius"}],"abbreviations":[{"@lang":"lat","@value":"Cap"}],"works":[{"urn":"urn:cts:latinLit:phi0806.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0616","title":[{"@lang":"lat","@value":"Pompilius"}],"abbreviations":[{"@lang":"lat","@value":"Pompil"}],"works":[{"urn":"urn:cts:latinLit:phi0616.phi0001","title":[{"@lang":"lat","@value":"epigramma"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0616.phi0002","title":[{"@lang":"lat","@value":"tragoedia"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0878","title":[{"@lang":"lat","@value":"Gallus, Gaius Asinius"}],"abbreviations":[{"@lang":"lat","@value":"AsGal"}],"works":[{"urn":"urn:cts:latinLit:phi0878.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0878.phi0002","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1345","title":[{"@lang":"lat","@value":"Silius Italicus"}],"abbreviations":[{"@lang":"lat","@value":"Sil"}],"works":[{"urn":"urn:cts:latinLit:phi1345.phi0001","title":[{"@lang":"lat","@value":"Punica"}],"abbreviations":[{"@lang":"lat","@value":"Pun"}]}]},{"urn":"urn:cts:latinLit:phi0404","title":[{"@lang":"lat","@value":"Afranius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Afran"}],"works":[{"urn":"urn:cts:latinLit:phi0404.phi0001","title":[{"@lang":"lat","@value":"togatae"}],"abbreviations":[{"@lang":"lat","@value":"tog"}]}]},{"urn":"urn:cts:latinLit:phi0914","title":[{"@lang":"lat","@value":"Livius, Titus"}],"abbreviations":[{"@lang":"lat","@value":"Liv"}],"works":[{"urn":"urn:cts:latinLit:phi0914.phi0001","title":[{"@lang":"lat","@value":"Ab Urbe Condita"}],"abbreviations":[{"@lang":"lat","@value":"AUC"}]},{"urn":"urn:cts:latinLit:phi0914.phi0002","title":[{"@lang":"lat","@value":"Periochae Librorum A. U. C."}],"abbreviations":[{"@lang":"lat","@value":"Perioch"}]},{"urn":"urn:cts:latinLit:phi0914.phi0003","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi0914.phi0004","title":[{"@lang":"lat","@value":"A.U.C. Perioch. ex P.Oxy.668"}],"abbreviations":[{"@lang":"lat","@value":"PeriochOxy"}]}]},{"urn":"urn:cts:latinLit:phi1011","title":[{"@lang":"lat","@value":"Scribonius Largus"}],"abbreviations":[{"@lang":"lat","@value":"Larg"}],"works":[{"urn":"urn:cts:latinLit:phi1011.phi0001","title":[{"@lang":"lat","@value":"Compositiones"}],"abbreviations":[{"@lang":"lat","@value":"Comp"}]}]},{"urn":"urn:cts:latinLit:phi0469","title":[{"@lang":"lat","@value":"Cassius Longinus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"LCassius"}],"works":[{"urn":"urn:cts:latinLit:phi0469.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0800","title":[{"@lang":"lat","@value":"Albinovanus Pedo"}],"abbreviations":[{"@lang":"lat","@value":"Pedo"}],"works":[{"urn":"urn:cts:latinLit:phi0800.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0875","title":[{"@lang":"lat","@value":"Lentulus Gaetulicus, Cn. Cornel."}],"abbreviations":[{"@lang":"lat","@value":"Gaet"}],"works":[{"urn":"urn:cts:latinLit:phi0875.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0106","title":[{"@lang":"lat","@value":"Metellus, Caecilius"}],"abbreviations":[{"@lang":"lat","@value":"Met"}],"works":[{"urn":"urn:cts:latinLit:phi0106.phi0001","title":[{"@lang":"lat","@value":"versus in Naevium"}],"abbreviations":[{"@lang":"lat","@value":"MetVers"}]}]},{"urn":"urn:cts:latinLit:phi2305","title":[{"@lang":"lat","@value":"Aurelianus, Caelius"}],"abbreviations":[{"@lang":"lat","@value":"CaelAur"}],"works":[{"urn":"urn:cts:latinLit:phi2305.phi0001","title":[{"@lang":"lat","@value":"E Parmenide de natura"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1245","title":[{"@lang":"lat","@value":"Frontinus, Sextus Iulius"}],"abbreviations":[{"@lang":"lat","@value":"Fron"}],"works":[{"urn":"urn:cts:latinLit:phi1245.phi0001","title":[{"@lang":"lat","@value":"Strategemata"}],"abbreviations":[{"@lang":"lat","@value":"Str"}]},{"urn":"urn:cts:latinLit:phi1245.phi0002","title":[{"@lang":"lat","@value":"De Aquis Urbis Romae"}],"abbreviations":[{"@lang":"lat","@value":"Aq"}]},{"urn":"urn:cts:latinLit:phi1245.phi0003","title":[{"@lang":"lat","@value":"De Agrorum Qualitate"}],"abbreviations":[{"@lang":"lat","@value":"Agr"}]},{"urn":"urn:cts:latinLit:phi1245.phi0004","title":[{"@lang":"lat","@value":"De Controversiis"}],"abbreviations":[{"@lang":"lat","@value":"Contr"}]},{"urn":"urn:cts:latinLit:phi1245.phi0005","title":[{"@lang":"lat","@value":"De Limitibus"}],"abbreviations":[{"@lang":"lat","@value":"Lim"}]},{"urn":"urn:cts:latinLit:phi1245.phi0006","title":[{"@lang":"lat","@value":"De Arte Mensoria"}],"abbreviations":[{"@lang":"lat","@value":"Men"}]}]},{"urn":"urn:cts:latinLit:phi0430","title":[{"@lang":"lat","@value":"Pseudo-Caesar (Bellum Hispaniense)"}],"abbreviations":[{"@lang":"lat","@value":"BHisp"}],"works":[{"urn":"urn:cts:latinLit:phi0430.phi0001","title":[{"@lang":"lat","@value":"Bellum Hispaniense"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0413","title":[{"@lang":"lat","@value":"Gavius Bassus"}],"abbreviations":[{"@lang":"lat","@value":"GavBas"}],"works":[{"urn":"urn:cts:latinLit:phi0413.phi0001","title":[{"@lang":"lat","@value":"De Origine Vocabulorum, frr."}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0413.phi0002","title":[{"@lang":"lat","@value":"fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0070","title":[{"@lang":"lat","@value":"Gellius, Gnaeus"}],"abbreviations":[{"@lang":"lat","@value":"CnGel"}],"works":[{"urn":"urn:cts:latinLit:phi0070.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0628","title":[{"@lang":"lat","@value":"Rutilius Rufus, Publius"}],"abbreviations":[{"@lang":"lat","@value":"RutRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0628.phi0001","title":[{"@lang":"lat","@value":"De Vita Sua"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0562","title":[{"@lang":"lat","@value":"Manilius"}],"abbreviations":[{"@lang":"lat","@value":"ManPoet"}],"works":[{"urn":"urn:cts:latinLit:phi0562.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0100","title":[{"@lang":"lat","@value":"Luscius Lanuvinus"}],"abbreviations":[{"@lang":"lat","@value":"Lanuv"}],"works":[{"urn":"urn:cts:latinLit:phi0100.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0969","title":[{"@lang":"lat","@value":"Persius"}],"abbreviations":[{"@lang":"lat","@value":"Pers"}],"works":[{"urn":"urn:cts:latinLit:phi0969.phi0001","title":[{"@lang":"lat","@value":"Saturae"}],"abbreviations":[{"@lang":"lat","@value":"S"}]}]},{"urn":"urn:cts:latinLit:phi0625","title":[{"@lang":"lat","@value":"Quinctius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Quinctius"}],"works":[{"urn":"urn:cts:latinLit:phi0625.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0568","title":[{"@lang":"lat","@value":"Matius, Gnaeus"}],"abbreviations":[{"@lang":"lat","@value":"CnMat"}],"works":[{"urn":"urn:cts:latinLit:phi0568.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0576","title":[{"@lang":"lat","@value":"Messalla Rufus, M. Valerius"}],"abbreviations":[{"@lang":"lat","@value":"MesRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0576.phi0001","title":[{"@lang":"lat","@value":"De Familiis Romanis"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0576.phi0002","title":[{"@lang":"lat","@value":"De Auspiciis"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0428","title":[{"@lang":"lat","@value":"Pseudo-Caesar (Bellum Alexandrinum)"}],"abbreviations":[{"@lang":"lat","@value":"BAlex"}],"works":[{"urn":"urn:cts:latinLit:phi0428.phi0001","title":[{"@lang":"lat","@value":"Bellum Alexandrinum"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi1023","title":[{"@lang":"lat","@value":"Sulpicia"}],"abbreviations":[{"@lang":"lat","@value":"Sulpicia"}],"works":[{"urn":"urn:cts:latinLit:phi1023.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi1023.phi0002","title":[{"@lang":"lat","@value":"De Statu Rei Publicae [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Conquaest"}]}]},{"urn":"urn:cts:latinLit:phi0088","title":[{"@lang":"lat","@value":"Lepidus Porcina, M. Aemilius"}],"abbreviations":[{"@lang":"lat","@value":"Lep"}],"works":[{"urn":"urn:cts:latinLit:phi0088.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0993","title":[{"@lang":"lat","@value":"Anonymous (Precatio Terrae)"}],"abbreviations":[{"@lang":"lat","@value":"PrecTer"}],"works":[{"urn":"urn:cts:latinLit:phi0993.phi0001","title":[{"@lang":"lat","@value":"Precatio Terrae"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0300","title":[{"@lang":"lat","@value":"Asellio, Sempronius"}],"abbreviations":[{"@lang":"lat","@value":"Asel"}],"works":[{"urn":"urn:cts:latinLit:phi0300.phi0001","title":[{"@lang":"lat","@value":"Rerum Gestarum Libri"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1506","title":[{"@lang":"lat","@value":"Anonymi Fragmenta de Iure Fisci"}],"abbreviations":[{"@lang":"lat","@value":"FrIurFisc"}],"works":[{"urn":"urn:cts:latinLit:phi1506.phi0001","title":[{"@lang":"lat","@value":"fragmenta de iure fisci"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi1014","title":[{"@lang":"lat","@value":"Seneca, Lucius Annaeus (senior)"}],"abbreviations":[{"@lang":"lat","@value":"SenRhet"}],"works":[{"urn":"urn:cts:latinLit:phi1014.phi0001","title":[{"@lang":"lat","@value":"Controversiae"}],"abbreviations":[{"@lang":"lat","@value":"Con"}]},{"urn":"urn:cts:latinLit:phi1014.phi0002","title":[{"@lang":"lat","@value":"Controversiae, excerpta"}],"abbreviations":[{"@lang":"lat","@value":"ConExc"}]},{"urn":"urn:cts:latinLit:phi1014.phi0003","title":[{"@lang":"lat","@value":"Suasoriae"}],"abbreviations":[{"@lang":"lat","@value":"Suas"}]},{"urn":"urn:cts:latinLit:phi1014.phi0004","title":[{"@lang":"lat","@value":"Fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0128","title":[{"@lang":"lat","@value":"Scipio Aemilianus, P. Cornelius, Africanus minor"}],"abbreviations":[{"@lang":"lat","@value":"ScipMin"}],"works":[{"urn":"urn:cts:latinLit:phi0128.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1047","title":[{"@lang":"lat","@value":"Veranius"}],"abbreviations":[{"@lang":"lat","@value":"Veran"}],"works":[{"urn":"urn:cts:latinLit:phi1047.phi0001","title":[{"@lang":"lat","@value":"libri de rebus sacris"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0614","title":[{"@lang":"lat","@value":"Pompeius Q.f.A.n. Rufus, Q."}],"abbreviations":[{"@lang":"lat","@value":"PompRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0614.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0007","title":[{"@lang":"lat","@value":"Atilius"}],"abbreviations":[{"@lang":"lat","@value":"Atil"}],"works":[{"urn":"urn:cts:latinLit:phi0007.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0303","title":[{"@lang":"lat","@value":"Opillus, Aurelius"}],"abbreviations":[{"@lang":"lat","@value":"AurOp"}],"works":[{"urn":"urn:cts:latinLit:phi0303.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0137","title":[{"@lang":"lat","@value":"Titinius"}],"abbreviations":[{"@lang":"lat","@value":"Titin"}],"works":[{"urn":"urn:cts:latinLit:phi0137.phi0001","title":[{"@lang":"lat","@value":"togatae"}],"abbreviations":[{"@lang":"lat","@value":"tog"}]}]},{"urn":"urn:cts:latinLit:phi9510","title":[{"@lang":"lat","@value":"Anonymi Grammatici"}],"abbreviations":[{"@lang":"lat","@value":"AnonGram"}],"works":[{"urn":"urn:cts:latinLit:phi9510.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"inc"}]}]},{"urn":"urn:cts:latinLit:phi0635","title":[{"@lang":"lat","@value":"Saturius, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Saturius"}],"works":[{"urn":"urn:cts:latinLit:phi0635.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0031","title":[{"@lang":"lat","@value":"Cornelia"}],"abbreviations":[{"@lang":"lat","@value":"Cornelia"}],"works":[{"urn":"urn:cts:latinLit:phi0031.phi0001","title":[{"@lang":"lat","@value":"epistula, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"Epist"}]}]},{"urn":"urn:cts:latinLit:phi0419","title":[{"@lang":"lat","@value":"Orbilius Pupillus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Orb"}],"works":[{"urn":"urn:cts:latinLit:phi0419.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0103","title":[{"@lang":"lat","@value":"Marcius, Gnaeus vates"}],"abbreviations":[{"@lang":"lat","@value":"Marcius"}],"works":[{"urn":"urn:cts:latinLit:phi0103.phi0001","title":[{"@lang":"lat","@value":"praecepta"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0932","title":[{"@lang":"lat","@value":"Messalla Corvinus, M. Valerius"}],"abbreviations":[{"@lang":"lat","@value":"MesCor"}],"works":[{"urn":"urn:cts:latinLit:phi0932.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]},{"urn":"urn:cts:latinLit:phi0932.phi0002","title":[{"@lang":"lat","@value":"Commentarii de Bello Civili"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1236","title":[{"@lang":"lat","@value":"Festus, Sextus Pompeius"}],"abbreviations":[{"@lang":"lat","@value":"Fest"}],"works":[{"urn":"urn:cts:latinLit:phi1236.phi0001","title":[{"@lang":"lat","@value":"De Verborum Significatione"}],"abbreviations":[{"@lang":"lat","@value":"Verb"}]}]},{"urn":"urn:cts:latinLit:phi0400","title":[{"@lang":"lat","@value":"Accius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Acc"}],"works":[{"urn":"urn:cts:latinLit:phi0400.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0400.phi0002","title":[{"@lang":"lat","@value":"praetextae"}],"abbreviations":[{"@lang":"lat","@value":"praet"}]},{"urn":"urn:cts:latinLit:phi0400.phi0003","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0674","title":[{"@lang":"lat","@value":"Valerius"}],"abbreviations":[{"@lang":"lat","@value":"Val"}],"works":[{"urn":"urn:cts:latinLit:phi0674.phi0001","title":[{"@lang":"lat","@value":"comoedia"}],"abbreviations":[{"@lang":"lat","@value":"mim"}]}]},{"urn":"urn:cts:latinLit:phi0536","title":[{"@lang":"lat","@value":"Laberius, Decimus"}],"abbreviations":[{"@lang":"lat","@value":"Laber"}],"works":[{"urn":"urn:cts:latinLit:phi0536.phi0001","title":[{"@lang":"lat","@value":"mimi"}],"abbreviations":[{"@lang":"lat","@value":"mim"}]}]},{"urn":"urn:cts:latinLit:phi0091","title":[{"@lang":"lat","@value":"Licinius Imbrex"}],"abbreviations":[{"@lang":"lat","@value":"Imbr"}],"works":[{"urn":"urn:cts:latinLit:phi0091.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0730","title":[{"@lang":"lat","@value":"Tarquitius Priscus"}],"abbreviations":[{"@lang":"lat","@value":"Tarquit"}],"works":[{"urn":"urn:cts:latinLit:phi0730.phi0001","title":[{"@lang":"lat","@value":"De Disciplina Etrusca, frr."}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0990","title":[{"@lang":"lat","@value":"Anonymous (Precatio Omnium Herbarum)"}],"abbreviations":[{"@lang":"lat","@value":"PrecHerb"}],"works":[{"urn":"urn:cts:latinLit:phi0990.phi0001","title":[{"@lang":"lat","@value":"Precatio Omnium Herbarum"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0458","title":[{"@lang":"lat","@value":"Cannutius, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Can"}],"works":[{"urn":"urn:cts:latinLit:phi0458.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1604","title":[{"@lang":"lat","@value":"Atherianus, Iulius"}],"abbreviations":[{"@lang":"lat","@value":"IulAth"}],"works":[{"urn":"urn:cts:latinLit:phi1604.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1103","title":[{"@lang":"lat","@value":"Priapea"}],"abbreviations":[{"@lang":"lat","@value":"Priap"}],"works":[{"urn":"urn:cts:latinLit:phi1103.phi0001","title":[{"@lang":"lat","@value":"Priapea"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0456","title":[{"@lang":"lat","@value":"Calvus, Gaius Licinius Macer"}],"abbreviations":[{"@lang":"lat","@value":"Calv"}],"works":[{"urn":"urn:cts:latinLit:phi0456.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0456.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1000","title":[{"@lang":"lat","@value":"Pupius 1st century B.C."}],"abbreviations":[{"@lang":"lat","@value":"Pup"}],"works":[{"urn":"urn:cts:latinLit:phi1000.phi0001","title":[{"@lang":"lat","@value":"versus Pupio attributi"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2331","title":[{"@lang":"lat","@value":"Scriptores Historiae Augustae"}],"abbreviations":[{"@lang":"lat","@value":"SHA"}],"works":[{"urn":"urn:cts:latinLit:phi2331.phi0001","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Hadr"}]},{"urn":"urn:cts:latinLit:phi2331.phi0002","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Ael"}]},{"urn":"urn:cts:latinLit:phi2331.phi0003","title":[{"@lang":"lat","@value":"Iuli Capitolini Antoninus Pius"}],"abbreviations":[{"@lang":"lat","@value":"Pius"}]},{"urn":"urn:cts:latinLit:phi2331.phi0004","title":[{"@lang":"lat","@value":"Vita Marci Antonini Philosophi Iuli Capitolini"}],"abbreviations":[{"@lang":"lat","@value":"AntPhil"}]},{"urn":"urn:cts:latinLit:phi2331.phi0005","title":[{"@lang":"lat","@value":"Iuli Capitolini Verus"}],"abbreviations":[{"@lang":"lat","@value":"Ver"}]},{"urn":"urn:cts:latinLit:phi2331.phi0006","title":[{"@lang":"lat","@value":"Avidius "}],"abbreviations":[{"@lang":"lat","@value":"Avid"}]},{"urn":"urn:cts:latinLit:phi2331.phi0007","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"CommAnt"}]},{"urn":"urn:cts:latinLit:phi2331.phi0008","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Pert"}]},{"urn":"urn:cts:latinLit:phi2331.phi0009","title":[{"@lang":"lat","@value":"Didius Iulianus Aeli Spartiani"}],"abbreviations":[{"@lang":"lat","@value":"DidIul"}]},{"urn":"urn:cts:latinLit:phi2331.phi0010","title":[{"@lang":"lat","@value":"Aeli Spartiani Severus"}],"abbreviations":[{"@lang":"lat","@value":"Sev"}]},{"urn":"urn:cts:latinLit:phi2331.phi0011","title":[{"@lang":"lat","@value":"Pescennius Niger "}],"abbreviations":[{"@lang":"lat","@value":"PescNig"}]},{"urn":"urn:cts:latinLit:phi2331.phi0012","title":[{"@lang":"lat","@value":"Vita Clodii Albini Iulii Capitolini"}],"abbreviations":[{"@lang":"lat","@value":"ClodAlb"}]},{"urn":"urn:cts:latinLit:phi2331.phi0013","title":[{"@lang":"lat","@value":"Antoninus Caracallus "}],"abbreviations":[{"@lang":"lat","@value":"AntCar"}]},{"urn":"urn:cts:latinLit:phi2331.phi0014","title":[{"@lang":"lat","@value":"Antoninus Geta "}],"abbreviations":[{"@lang":"lat","@value":"AntGeta"}]},{"urn":"urn:cts:latinLit:phi2331.phi0015","title":[{"@lang":"lat","@value":"Opilius Macrinus Iuli Capitolini"}],"abbreviations":[{"@lang":"lat","@value":"OpilMacr"}]},{"urn":"urn:cts:latinLit:phi2331.phi0016","title":[{"@lang":"lat","@value":"Diadumenus Antoninus "}],"abbreviations":[{"@lang":"lat","@value":"AntDiad"}]},{"urn":"urn:cts:latinLit:phi2331.phi0017","title":[{"@lang":"lat","@value":"Aeli Lampridii Antoninus Heliogabalus"}],"abbreviations":[{"@lang":"lat","@value":"AntHeliog"}]},{"urn":"urn:cts:latinLit:phi2331.phi0018","title":[{"@lang":"lat","@value":"Alexander Severus Aeli Lampridii"}],"abbreviations":[{"@lang":"lat","@value":"AlexSev"}]},{"urn":"urn:cts:latinLit:phi2331.phi0019","title":[{"@lang":"lat","@value":"Maximini Duo Iuli Capitolini"}],"abbreviations":[{"@lang":"lat","@value":"Maxim"}]},{"urn":"urn:cts:latinLit:phi2331.phi0020","title":[{"@lang":"lat","@value":"Gordian"}],"abbreviations":[{"@lang":"lat","@value":"Gord"}]},{"urn":"urn:cts:latinLit:phi2331.phi0021","title":[{"@lang":"lat","@value":"Maximus "}],"abbreviations":[{"@lang":"lat","@value":"MaxBalb"}]},{"urn":"urn:cts:latinLit:phi2331.phi0022","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Valer"}]},{"urn":"urn:cts:latinLit:phi2331.phi0023","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Gall"}]},{"urn":"urn:cts:latinLit:phi2331.phi0024","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"TyrTrig"}]},{"urn":"urn:cts:latinLit:phi2331.phi0025","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Claud"}]},{"urn":"urn:cts:latinLit:phi2331.phi0026","title":[{"@lang":"lat","@value":"Flavi Vopisci Syracusii Divus Aurelianus"}],"abbreviations":[{"@lang":"lat","@value":"Aurel"}]},{"urn":"urn:cts:latinLit:phi2331.phi0027","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Tac"}]},{"urn":"urn:cts:latinLit:phi2331.phi0028","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Prob"}]},{"urn":"urn:cts:latinLit:phi2331.phi0029","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"QuadTyr"}]},{"urn":"urn:cts:latinLit:phi2331.phi0030","title":[{"@lang":"lat","@value":""}],"abbreviations":[{"@lang":"lat","@value":"Car"}]}]},{"urn":"urn:cts:latinLit:phi0929","title":[{"@lang":"lat","@value":"Mela, Pomponius"}],"abbreviations":[{"@lang":"lat","@value":"Mela"}],"works":[{"urn":"urn:cts:latinLit:phi0929.phi0001","title":[{"@lang":"lat","@value":"De Chorographia"}],"abbreviations":[{"@lang":"lat","@value":"Chor"}]}]},{"urn":"urn:cts:latinLit:phi0724","title":[{"@lang":"lat","@value":"Cloatius Verus"}],"abbreviations":[{"@lang":"lat","@value":"Cloat"}],"works":[{"urn":"urn:cts:latinLit:phi0724.phi0001","title":[{"@lang":"lat","@value":"grammatica fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0487","title":[{"@lang":"lat","@value":"Clodius Pulcher, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Clodius"}],"works":[{"urn":"urn:cts:latinLit:phi0487.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0064","title":[{"@lang":"lat","@value":"Fannius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Fan"}],"works":[{"urn":"urn:cts:latinLit:phi0064.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0064.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0010","title":[{"@lang":"lat","@value":"Brutus, Marcus Iunius [iur.]"}],"abbreviations":[{"@lang":"lat","@value":"BrutIur"}],"works":[{"urn":"urn:cts:latinLit:phi0010.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0532","title":[{"@lang":"lat","@value":"Hortensius Hortalus, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"Hort"}],"works":[{"urn":"urn:cts:latinLit:phi0532.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0532.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0528","title":[{"@lang":"lat","@value":"Granius Flaccus"}],"abbreviations":[{"@lang":"lat","@value":"GranFl"}],"works":[{"urn":"urn:cts:latinLit:phi0528.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0690","title":[{"@lang":"lat","@value":"Virgil"}],"abbreviations":[{"@lang":"lat","@value":"Verg"}],"works":[{"urn":"urn:cts:latinLit:phi0690.phi0001","title":[{"@lang":"lat","@value":"Eclogae"}],"abbreviations":[{"@lang":"lat","@value":"Ecl"}]},{"urn":"urn:cts:latinLit:phi0690.phi0002","title":[{"@lang":"lat","@value":"Georgica"}],"abbreviations":[{"@lang":"lat","@value":"G"}]},{"urn":"urn:cts:latinLit:phi0690.phi0003","title":[{"@lang":"lat","@value":"Aeneis"}],"abbreviations":[{"@lang":"lat","@value":"A"}]}]},{"urn":"urn:cts:latinLit:phi0672","title":[{"@lang":"lat","@value":"Turranius Niger"}],"abbreviations":[{"@lang":"lat","@value":"Turran"}],"works":[{"urn":"urn:cts:latinLit:phi0672.phi0001","title":[{"@lang":"lat","@value":"de re rustica scripta"}],"abbreviations":[{"@lang":"lat","@value":"agr"}]}]},{"urn":"urn:cts:latinLit:phi1209","title":[{"@lang":"lat","@value":"Annianus"}],"abbreviations":[{"@lang":"lat","@value":"Annian"}],"works":[{"urn":"urn:cts:latinLit:phi1209.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0312","title":[{"@lang":"lat","@value":"Fabius Dossennus"}],"abbreviations":[{"@lang":"lat","@value":"Dossenn"}],"works":[{"urn":"urn:cts:latinLit:phi0312.phi0001","title":[{"@lang":"lat","@value":"carmina, fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"Carm"}]}]},{"urn":"urn:cts:latinLit:phi1248","title":[{"@lang":"lat","@value":"Fronto, Marcus Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Fro"}],"works":[{"urn":"urn:cts:latinLit:phi1248.phi0001","title":[{"@lang":"lat","@value":"Ad M. Caesarem et Invicem"}],"abbreviations":[{"@lang":"lat","@value":"AurCaes"}]},{"urn":"urn:cts:latinLit:phi1248.phi0002","title":[{"@lang":"lat","@value":"Ad M. Antoninum Imp. Epist."}],"abbreviations":[{"@lang":"lat","@value":"AurImp"}]},{"urn":"urn:cts:latinLit:phi1248.phi0003","title":[{"@lang":"lat","@value":"Ad Verum Imp. Epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Ver"}]},{"urn":"urn:cts:latinLit:phi1248.phi0004","title":[{"@lang":"lat","@value":"De Eloquentia"}],"abbreviations":[{"@lang":"lat","@value":"AurEloq"}]},{"urn":"urn:cts:latinLit:phi1248.phi0005","title":[{"@lang":"lat","@value":"De Orationibus"}],"abbreviations":[{"@lang":"lat","@value":"AurOrat"}]},{"urn":"urn:cts:latinLit:phi1248.phi0006","title":[{"@lang":"lat","@value":"Ad Antoninum Pium Epistulae"}],"abbreviations":[{"@lang":"lat","@value":"AdPium"}]},{"urn":"urn:cts:latinLit:phi1248.phi0007","title":[{"@lang":"lat","@value":"Ad Amicos Epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Amic"}]},{"urn":"urn:cts:latinLit:phi1248.phi0008","title":[{"@lang":"lat","@value":"Principia Historiae"}],"abbreviations":[{"@lang":"lat","@value":"Princ"}]},{"urn":"urn:cts:latinLit:phi1248.phi0009","title":[{"@lang":"lat","@value":"Laudes Fumi et Pulveris"}],"abbreviations":[{"@lang":"lat","@value":"LaudFumPulv"}]},{"urn":"urn:cts:latinLit:phi1248.phi0010","title":[{"@lang":"lat","@value":"Laudes Neglegentiae"}],"abbreviations":[{"@lang":"lat","@value":"LaudNegl"}]},{"urn":"urn:cts:latinLit:phi1248.phi0011","title":[{"@lang":"lat","@value":"De Bello Parthico"}],"abbreviations":[{"@lang":"lat","@value":"Parth"}]},{"urn":"urn:cts:latinLit:phi1248.phi0012","title":[{"@lang":"lat","@value":"De Feriis Alsiensibus"}],"abbreviations":[{"@lang":"lat","@value":"FerAls"}]},{"urn":"urn:cts:latinLit:phi1248.phi0013","title":[{"@lang":"lat","@value":"De Nepote Amisso"}],"abbreviations":[{"@lang":"lat","@value":"Nep"}]},{"urn":"urn:cts:latinLit:phi1248.phi0014","title":[{"@lang":"lat","@value":"Arion"}],"abbreviations":[{"@lang":"lat","@value":"Ar"}]},{"urn":"urn:cts:latinLit:phi1248.phi0015","title":[{"@lang":"lat","@value":"Additamentum Epist. Aceph."}],"abbreviations":[{"@lang":"lat","@value":"Add"}]},{"urn":"urn:cts:latinLit:phi1248.phi0016","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi1248.phi0017","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi9969","title":[{"@lang":"lat","@value":"Anonymous (Vita Iuvenalis)"}],"abbreviations":[{"@lang":"lat","@value":"VitIuv"}],"works":[{"urn":"urn:cts:latinLit:phi9969.phi0001","title":[{"@lang":"lat","@value":"Vita Iuvenalis"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0887","title":[{"@lang":"lat","@value":"Grattius"}],"abbreviations":[{"@lang":"lat","@value":"Grat"}],"works":[{"urn":"urn:cts:latinLit:phi0887.phi0001","title":[{"@lang":"lat","@value":"Cynegetica"}],"abbreviations":[{"@lang":"lat","@value":"Cyneg"}]}]},{"urn":"urn:cts:latinLit:phi0104","title":[{"@lang":"lat","@value":"Memmius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Memmius"}],"works":[{"urn":"urn:cts:latinLit:phi0104.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0606","title":[{"@lang":"lat","@value":"Marcius Philippus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Philipp"}],"works":[{"urn":"urn:cts:latinLit:phi0606.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0631","title":[{"@lang":"lat","@value":"Sallust"}],"abbreviations":[{"@lang":"lat","@value":"Sal"}],"works":[{"urn":"urn:cts:latinLit:phi0631.phi0001","title":[{"@lang":"lat","@value":"Catilinae Coniuratio"}],"abbreviations":[{"@lang":"lat","@value":"Cat"}]},{"urn":"urn:cts:latinLit:phi0631.phi0002","title":[{"@lang":"lat","@value":"Bellum Iugurthinum"}],"abbreviations":[{"@lang":"lat","@value":"Iug"}]},{"urn":"urn:cts:latinLit:phi0631.phi0003","title":[{"@lang":"lat","@value":"Historiae"}],"abbreviations":[{"@lang":"lat","@value":"HistFr"}]},{"urn":"urn:cts:latinLit:phi0631.phi0004","title":[{"@lang":"lat","@value":"Historiarum frr. ampliora"}],"abbreviations":[{"@lang":"lat","@value":"HistFrAmp"}]},{"urn":"urn:cts:latinLit:phi0631.phi0005","title":[{"@lang":"lat","@value":"Historiarum frr. e codicibus"}],"abbreviations":[{"@lang":"lat","@value":"HistFrCod"}]},{"urn":"urn:cts:latinLit:phi0631.phi0006","title":[{"@lang":"lat","@value":"Historiarum frr. e papyris"}],"abbreviations":[{"@lang":"lat","@value":"HistFrPap"}]},{"urn":"urn:cts:latinLit:phi0631.phi0007","title":[{"@lang":"lat","@value":"Ad Caesarem de Re Publ. [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Rep"}]},{"urn":"urn:cts:latinLit:phi0631.phi0008","title":[{"@lang":"lat","@value":"In M. Tullium Ciceronem [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Cic"}]}]},{"urn":"urn:cts:latinLit:phi1041","title":[{"@lang":"lat","@value":"Pseudo-Varro"}],"abbreviations":[{"@lang":"lat","@value":"PsVar"}],"works":[{"urn":"urn:cts:latinLit:phi1041.phi0001","title":[{"@lang":"lat","@value":"Sententiae"}],"abbreviations":[{"@lang":"lat","@value":"Sent"}]}]},{"urn":"urn:cts:latinLit:phi1020","title":[{"@lang":"lat","@value":"Statius, Publius Papinius"}],"abbreviations":[{"@lang":"lat","@value":"Stat"}],"works":[{"urn":"urn:cts:latinLit:phi1020.phi0001","title":[{"@lang":"lat","@value":"Thebais"}],"abbreviations":[{"@lang":"lat","@value":"Theb"}]},{"urn":"urn:cts:latinLit:phi1020.phi0002","title":[{"@lang":"lat","@value":"Silvae"}],"abbreviations":[{"@lang":"lat","@value":"Silv"}]},{"urn":"urn:cts:latinLit:phi1020.phi0003","title":[{"@lang":"lat","@value":"Achilleis"}],"abbreviations":[{"@lang":"lat","@value":"Ach"}]},{"urn":"urn:cts:latinLit:phi1020.phi0004","title":[{"@lang":"lat","@value":"De Bello Germanico (fragment)"}],"abbreviations":[{"@lang":"lat","@value":"Germ"}]}]},{"urn":"urn:cts:latinLit:phi0004","title":[{"@lang":"lat","@value":"Claudius Caecus, Appius"}],"abbreviations":[{"@lang":"lat","@value":"App"}],"works":[{"urn":"urn:cts:latinLit:phi0004.phi0001","title":[{"@lang":"lat","@value":"sententiae"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1212","title":[{"@lang":"lat","@value":"Apuleius"}],"abbreviations":[{"@lang":"lat","@value":"Apul"}],"works":[{"urn":"urn:cts:latinLit:phi1212.phi0001","title":[{"@lang":"lat","@value":"Apologia"}],"abbreviations":[{"@lang":"lat","@value":"Apol"}]},{"urn":"urn:cts:latinLit:phi1212.phi0002","title":[{"@lang":"lat","@value":"Metamorphoses"}],"abbreviations":[{"@lang":"lat","@value":"Met"}]},{"urn":"urn:cts:latinLit:phi1212.phi0003","title":[{"@lang":"lat","@value":"Florida"}],"abbreviations":[{"@lang":"lat","@value":"Fl"}]},{"urn":"urn:cts:latinLit:phi1212.phi0004","title":[{"@lang":"lat","@value":"De Deo Socratis"}],"abbreviations":[{"@lang":"lat","@value":"Soc"}]},{"urn":"urn:cts:latinLit:phi1212.phi0005","title":[{"@lang":"lat","@value":"Anechomenos"}],"abbreviations":[{"@lang":"lat","@value":"Anech"}]},{"urn":"urn:cts:latinLit:phi1212.phi0006","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi1212.phi0007","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi1212.phi0008","title":[{"@lang":"lat","@value":"De Mundo"}],"abbreviations":[{"@lang":"lat","@value":"Mun"}]},{"urn":"urn:cts:latinLit:phi1212.phi0009","title":[{"@lang":"lat","@value":"De Platone et Eius Dogmate"}],"abbreviations":[{"@lang":"lat","@value":"Pl"}]},{"urn":"urn:cts:latinLit:phi1212.phi0010","title":[{"@lang":"lat","@value":"De Deo Socratis, Praef. [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"SocPr"}]}]},{"urn":"urn:cts:latinLit:phi1029","title":[{"@lang":"lat","@value":"Turnus"}],"abbreviations":[{"@lang":"lat","@value":"Turn"}],"works":[{"urn":"urn:cts:latinLit:phi1029.phi0001","title":[{"@lang":"lat","@value":"satura"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1100","title":[{"@lang":"lat","@value":"Calpurnius Flaccus"}],"abbreviations":[{"@lang":"lat","@value":"CalpFlac"}],"works":[{"urn":"urn:cts:latinLit:phi1100.phi0001","title":[{"@lang":"lat","@value":"Declamationes, excerpta"}],"abbreviations":[{"@lang":"lat","@value":"Decl"}]}]},{"urn":"urn:cts:latinLit:phi0452","title":[{"@lang":"lat","@value":"Caesar Strabo, Gaius Iulius"}],"abbreviations":[{"@lang":"lat","@value":"Strab"}],"works":[{"urn":"urn:cts:latinLit:phi0452.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]},{"urn":"urn:cts:latinLit:phi0452.phi0002","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0416","title":[{"@lang":"lat","@value":"Ateius Praetextatus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Ateius"}],"works":[{"urn":"urn:cts:latinLit:phi0416.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1294","title":[{"@lang":"lat","@value":"Martial"}],"abbreviations":[{"@lang":"lat","@value":"Mart"}],"works":[{"urn":"urn:cts:latinLit:phi1294.phi0001","title":[{"@lang":"lat","@value":"Spectacula"}],"abbreviations":[{"@lang":"lat","@value":"Sp"}]},{"urn":"urn:cts:latinLit:phi1294.phi0002","title":[{"@lang":"lat","@value":"Epigrammata"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]}]},{"urn":"urn:cts:latinLit:phi0466","title":[{"@lang":"lat","@value":"Cascellius, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"Casc"}],"works":[{"urn":"urn:cts:latinLit:phi0466.phi0001","title":[{"@lang":"lat","@value":"Liber Bene Dictorum, frr. duo"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0486","title":[{"@lang":"lat","@value":"Cinna, Gaius Helvius"}],"abbreviations":[{"@lang":"lat","@value":"Cinna"}],"works":[{"urn":"urn:cts:latinLit:phi0486.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1336","title":[{"@lang":"lat","@value":"Scaevus Memor"}],"abbreviations":[{"@lang":"lat","@value":"ScaevMem"}],"works":[{"urn":"urn:cts:latinLit:phi1336.phi0001","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0109","title":[{"@lang":"lat","@value":"Metellus Macedonicus, Q. Caecilius"}],"abbreviations":[{"@lang":"lat","@value":"MetMac"}],"works":[{"urn":"urn:cts:latinLit:phi0109.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1374","title":[{"@lang":"lat","@value":"Velius Longus"}],"abbreviations":[{"@lang":"lat","@value":"Vel"}],"works":[{"urn":"urn:cts:latinLit:phi1374.phi0001","title":[{"@lang":"lat","@value":"De Orthographia"}],"abbreviations":[{"@lang":"lat","@value":"Orth"}]}]},{"urn":"urn:cts:latinLit:phi0586","title":[{"@lang":"lat","@value":"Mummius"}],"abbreviations":[{"@lang":"lat","@value":"Mum"}],"works":[{"urn":"urn:cts:latinLit:phi0586.phi0001","title":[{"@lang":"lat","@value":"Atellanae"}],"abbreviations":[{"@lang":"lat","@value":"atell"}]}]},{"urn":"urn:cts:latinLit:phi0149","title":[{"@lang":"lat","@value":"Arvales, Fratres"}],"abbreviations":[{"@lang":"lat","@value":"CarmArv"}],"works":[{"urn":"urn:cts:latinLit:phi0149.phi0001","title":[{"@lang":"lat","@value":"Carmen Arvale"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0410","title":[{"@lang":"lat","@value":"Aprissius"}],"abbreviations":[{"@lang":"lat","@value":"Apris"}],"works":[{"urn":"urn:cts:latinLit:phi0410.phi0001","title":[{"@lang":"lat","@value":"Fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"atell"}]}]},{"urn":"urn:cts:latinLit:phi0420","title":[{"@lang":"lat","@value":"Namusa, Publius Aufidius"}],"abbreviations":[{"@lang":"lat","@value":"Nam"}],"works":[{"urn":"urn:cts:latinLit:phi0420.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0058","title":[{"@lang":"lat","@value":"Fabius Maximus Servilianus, Q."}],"abbreviations":[{"@lang":"lat","@value":"FabMax"}],"works":[{"urn":"urn:cts:latinLit:phi0058.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1235","title":[{"@lang":"lat","@value":"Sulpicius Apollinaris, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"DPTer"}],"works":[{"urn":"urn:cts:latinLit:phi1235.phi0001","title":[{"@lang":"lat","@value":"Andria"}],"abbreviations":[{"@lang":"lat","@value":"An"}]},{"urn":"urn:cts:latinLit:phi1235.phi0002","title":[{"@lang":"lat","@value":"Heauton Timorumenos"}],"abbreviations":[{"@lang":"lat","@value":"Hau"}]},{"urn":"urn:cts:latinLit:phi1235.phi0003","title":[{"@lang":"lat","@value":"Eunuchus"}],"abbreviations":[{"@lang":"lat","@value":"Eu"}]},{"urn":"urn:cts:latinLit:phi1235.phi0004","title":[{"@lang":"lat","@value":"Phormio"}],"abbreviations":[{"@lang":"lat","@value":"Ph"}]},{"urn":"urn:cts:latinLit:phi1235.phi0005","title":[{"@lang":"lat","@value":"Hecyra"}],"abbreviations":[{"@lang":"lat","@value":"Hec"}]},{"urn":"urn:cts:latinLit:phi1235.phi0006","title":[{"@lang":"lat","@value":"Adelphoe"}],"abbreviations":[{"@lang":"lat","@value":"Ad"}]}]},{"urn":"urn:cts:latinLit:phi0432","title":[{"@lang":"lat","@value":"Bibaculus, Marcus Furius"}],"abbreviations":[{"@lang":"lat","@value":"Bib"}],"works":[{"urn":"urn:cts:latinLit:phi0432.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0686","title":[{"@lang":"lat","@value":"Varro Atacinus, P. Terentius"}],"abbreviations":[{"@lang":"lat","@value":"VarAt"}],"works":[{"urn":"urn:cts:latinLit:phi0686.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1512","title":[{"@lang":"lat","@value":"Pomponius Porphyrio"}],"abbreviations":[{"@lang":"lat","@value":"Porph"}],"works":[{"urn":"urn:cts:latinLit:phi1512.phi0001","title":[{"@lang":"lat","@value":"Commentum in Horati Carmina"}],"abbreviations":[{"@lang":"lat","@value":"Carm"}]},{"urn":"urn:cts:latinLit:phi1512.phi0002","title":[{"@lang":"lat","@value":"Comment. in Hor. Artem Poet."}],"abbreviations":[{"@lang":"lat","@value":"Ars"}]},{"urn":"urn:cts:latinLit:phi1512.phi0003","title":[{"@lang":"lat","@value":"Comment. in Hor. Carm. Saec."}],"abbreviations":[{"@lang":"lat","@value":"Saec"}]},{"urn":"urn:cts:latinLit:phi1512.phi0004","title":[{"@lang":"lat","@value":"Commentum in Horati Epodos"}],"abbreviations":[{"@lang":"lat","@value":"Epod"}]},{"urn":"urn:cts:latinLit:phi1512.phi0005","title":[{"@lang":"lat","@value":"Commentum in Horati Sermones"}],"abbreviations":[{"@lang":"lat","@value":"S"}]},{"urn":"urn:cts:latinLit:phi1512.phi0006","title":[{"@lang":"lat","@value":"Commentum in Horati Epistulas"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]},{"urn":"urn:cts:latinLit:phi1512.phi0007","title":[{"@lang":"lat","@value":"Vita Horati"}],"abbreviations":[{"@lang":"lat","@value":"VitHor"}]}]},{"urn":"urn:cts:latinLit:phi0510","title":[{"@lang":"lat","@value":"Dolabella, Publius Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Dolab"}],"works":[{"urn":"urn:cts:latinLit:phi0510.phi0002","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0935","title":[{"@lang":"lat","@value":"Iulius Modestus"}],"abbreviations":[{"@lang":"lat","@value":"Modest"}],"works":[{"urn":"urn:cts:latinLit:phi0935.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1291","title":[{"@lang":"lat","@value":"Marianus"}],"abbreviations":[{"@lang":"lat","@value":"Marian"}],"works":[{"urn":"urn:cts:latinLit:phi1291.phi0001","title":[{"@lang":"lat","@value":"Lupercalia"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1234","title":[{"@lang":"lat","@value":"Didascaliae et Argum. in Plautum"}],"abbreviations":[{"@lang":"lat","@value":"DAPl"}],"works":[{"urn":"urn:cts:latinLit:phi1234.phi0001","title":[{"@lang":"lat","@value":"Amphitruo"}],"abbreviations":[{"@lang":"lat","@value":"Am"}]},{"urn":"urn:cts:latinLit:phi1234.phi0002","title":[{"@lang":"lat","@value":"Asinaria"}],"abbreviations":[{"@lang":"lat","@value":"As"}]},{"urn":"urn:cts:latinLit:phi1234.phi0003","title":[{"@lang":"lat","@value":"Aulularia"}],"abbreviations":[{"@lang":"lat","@value":"Aul"}]},{"urn":"urn:cts:latinLit:phi1234.phi0004","title":[{"@lang":"lat","@value":"Captivi"}],"abbreviations":[{"@lang":"lat","@value":"Capt"}]},{"urn":"urn:cts:latinLit:phi1234.phi0005","title":[{"@lang":"lat","@value":"Casina"}],"abbreviations":[{"@lang":"lat","@value":"Cas"}]},{"urn":"urn:cts:latinLit:phi1234.phi0006","title":[{"@lang":"lat","@value":"Cistellaria"}],"abbreviations":[{"@lang":"lat","@value":"Cist"}]},{"urn":"urn:cts:latinLit:phi1234.phi0007","title":[{"@lang":"lat","@value":"Curculio"}],"abbreviations":[{"@lang":"lat","@value":"Cur"}]},{"urn":"urn:cts:latinLit:phi1234.phi0008","title":[{"@lang":"lat","@value":"Epidicus"}],"abbreviations":[{"@lang":"lat","@value":"Epid"}]},{"urn":"urn:cts:latinLit:phi1234.phi0009","title":[{"@lang":"lat","@value":"Menaechmi"}],"abbreviations":[{"@lang":"lat","@value":"Men"}]},{"urn":"urn:cts:latinLit:phi1234.phi0010","title":[{"@lang":"lat","@value":"Mercator"}],"abbreviations":[{"@lang":"lat","@value":"Mer"}]},{"urn":"urn:cts:latinLit:phi1234.phi0011","title":[{"@lang":"lat","@value":"Miles Gloriosus"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]},{"urn":"urn:cts:latinLit:phi1234.phi0012","title":[{"@lang":"lat","@value":"Mostellaria"}],"abbreviations":[{"@lang":"lat","@value":"Mos"}]},{"urn":"urn:cts:latinLit:phi1234.phi0013","title":[{"@lang":"lat","@value":"Persa"}],"abbreviations":[{"@lang":"lat","@value":"Per"}]},{"urn":"urn:cts:latinLit:phi1234.phi0014","title":[{"@lang":"lat","@value":"Poenulus"}],"abbreviations":[{"@lang":"lat","@value":"Poen"}]},{"urn":"urn:cts:latinLit:phi1234.phi0015","title":[{"@lang":"lat","@value":"Pseudolus"}],"abbreviations":[{"@lang":"lat","@value":"Ps"}]},{"urn":"urn:cts:latinLit:phi1234.phi0016","title":[{"@lang":"lat","@value":"Rudens"}],"abbreviations":[{"@lang":"lat","@value":"Rud"}]},{"urn":"urn:cts:latinLit:phi1234.phi0017","title":[{"@lang":"lat","@value":"Stichus"}],"abbreviations":[{"@lang":"lat","@value":"St"}]},{"urn":"urn:cts:latinLit:phi1234.phi0018","title":[{"@lang":"lat","@value":"Trinummus"}],"abbreviations":[{"@lang":"lat","@value":"Trin"}]},{"urn":"urn:cts:latinLit:phi1234.phi0019","title":[{"@lang":"lat","@value":"Truculentus"}],"abbreviations":[{"@lang":"lat","@value":"Truc"}]}]},{"urn":"urn:cts:latinLit:phi0591","title":[{"@lang":"lat","@value":"Ninnius, Crassus"}],"abbreviations":[{"@lang":"lat","@value":"Nin"}],"works":[{"urn":"urn:cts:latinLit:phi0591.phi0001","title":[{"@lang":"lat","@value":"Ilias"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0414","title":[{"@lang":"lat","@value":"Arruntius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Arr"}],"works":[{"urn":"urn:cts:latinLit:phi0414.phi0001","title":[{"@lang":"lat","@value":"Historiae Belli Punici"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0902","title":[{"@lang":"lat","@value":"Africanus, Sextus Iulius"}],"abbreviations":[{"@lang":"lat","@value":"IulAfr"}],"works":[{"urn":"urn:cts:latinLit:phi0902.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0541","title":[{"@lang":"lat","@value":"Lentulus Marcellinus, Cn. Cornel."}],"abbreviations":[{"@lang":"lat","@value":"LentMarc"}],"works":[{"urn":"urn:cts:latinLit:phi0541.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0527","title":[{"@lang":"lat","@value":"Gannius"}],"abbreviations":[{"@lang":"lat","@value":"Gan"}],"works":[{"urn":"urn:cts:latinLit:phi0527.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0830","title":[{"@lang":"lat","@value":"Calpurnius Siculus, Titus"}],"abbreviations":[{"@lang":"lat","@value":"CalpSic"}],"works":[{"urn":"urn:cts:latinLit:phi0830.phi0001","title":[{"@lang":"lat","@value":"Eclogae"}],"abbreviations":[{"@lang":"lat","@value":"Ecl"}]}]},{"urn":"urn:cts:latinLit:phi0034","title":[{"@lang":"lat","@value":"Curio, Gaius Scribonius"}],"abbreviations":[{"@lang":"lat","@value":"CurioAv"}],"works":[{"urn":"urn:cts:latinLit:phi0034.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0526","title":[{"@lang":"lat","@value":"Glaucia, Gaius Servilius"}],"abbreviations":[{"@lang":"lat","@value":"Glauc"}],"works":[{"urn":"urn:cts:latinLit:phi0526.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1221","title":[{"@lang":"lat","@value":"Augustus, Emperor of Rome"}],"abbreviations":[{"@lang":"lat","@value":"Aug"}],"works":[{"urn":"urn:cts:latinLit:phi1221.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"carm"}]},{"urn":"urn:cts:latinLit:phi1221.phi0002","title":[{"@lang":"lat","@value":"dicta et apophthegmata"}],"abbreviations":[{"@lang":"lat","@value":"Dict"}]},{"urn":"urn:cts:latinLit:phi1221.phi0003","title":[{"@lang":"lat","@value":"edicta"}],"abbreviations":[{"@lang":"lat","@value":"edicta"}]},{"urn":"urn:cts:latinLit:phi1221.phi0004","title":[{"@lang":"lat","@value":"epistulae"}],"abbreviations":[{"@lang":"lat","@value":"epist"}]},{"urn":"urn:cts:latinLit:phi1221.phi0005","title":[{"@lang":"lat","@value":"fragmenta incertae sedis"}],"abbreviations":[{"@lang":"lat","@value":"frginc"}]},{"urn":"urn:cts:latinLit:phi1221.phi0006","title":[{"@lang":"lat","@value":"opera historica"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi1221.phi0007","title":[{"@lang":"lat","@value":"Res Gestae"}],"abbreviations":[{"@lang":"lat","@value":"Anc"}]},{"urn":"urn:cts:latinLit:phi1221.phi0008","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1254","title":[{"@lang":"lat","@value":"Gellius, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"AulGel"}],"works":[{"urn":"urn:cts:latinLit:phi1254.phi0001","title":[{"@lang":"lat","@value":"Noctes Atticae"}],"abbreviations":[{"@lang":"lat","@value":"NA"}]}]},{"urn":"urn:cts:latinLit:phi0455","title":[{"@lang":"lat","@value":"Piso, Gaius Calpurnius"}],"abbreviations":[{"@lang":"lat","@value":"Piso"}],"works":[{"urn":"urn:cts:latinLit:phi0455.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0703","title":[{"@lang":"lat","@value":"Arbonius Silo"}],"abbreviations":[{"@lang":"lat","@value":"Arb"}],"works":[{"urn":"urn:cts:latinLit:phi0703.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0494","title":[{"@lang":"lat","@value":"Commentarii Consulares"}],"abbreviations":[{"@lang":"lat","@value":"CommentCons"}],"works":[{"urn":"urn:cts:latinLit:phi0494.phi0001","title":[{"@lang":"lat","@value":"Commentarii Consulares"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0556","title":[{"@lang":"lat","@value":"Macer, Gaius Licinius"}],"abbreviations":[{"@lang":"lat","@value":"LicMacer"}],"works":[{"urn":"urn:cts:latinLit:phi0556.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0556.phi0002","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0812","title":[{"@lang":"lat","@value":"Caesius Bassus"}],"abbreviations":[{"@lang":"lat","@value":"CBas"}],"works":[{"urn":"urn:cts:latinLit:phi0812.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0812.phi0002","title":[{"@lang":"lat","@value":"De Metris, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"Metr"}]},{"urn":"urn:cts:latinLit:phi0812.phi0003","title":[{"@lang":"lat","@value":"De Metris Horatii [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"MetHor"}]},{"urn":"urn:cts:latinLit:phi0812.phi0004","title":[{"@lang":"lat","@value":"Breviatio Pedum [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"BrevPed"}]},{"urn":"urn:cts:latinLit:phi0812.phi0005","title":[{"@lang":"lat","@value":"De Compositionibus [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Comp"}]},{"urn":"urn:cts:latinLit:phi0812.phi0006","title":[{"@lang":"lat","@value":"Genera Versuum [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Vers"}]},{"urn":"urn:cts:latinLit:phi0812.phi0007","title":[{"@lang":"lat","@value":"Poeticae Species Lat. [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Poet"}]}]},{"urn":"urn:cts:latinLit:phi0640","title":[{"@lang":"lat","@value":"Scarus, Marcus Aemilius"}],"abbreviations":[{"@lang":"lat","@value":"AemScaur"}],"works":[{"urn":"urn:cts:latinLit:phi0640.phi0001","title":[{"@lang":"lat","@value":"De Vita Sua"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0640.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0893","title":[{"@lang":"lat","@value":"Horace"}],"abbreviations":[{"@lang":"lat","@value":"Hor"}],"works":[{"urn":"urn:cts:latinLit:phi0893.phi0001","title":[{"@lang":"lat","@value":"Carmina"}],"abbreviations":[{"@lang":"lat","@value":"Carm"}]},{"urn":"urn:cts:latinLit:phi0893.phi0002","title":[{"@lang":"lat","@value":"Carmen Saeculare"}],"abbreviations":[{"@lang":"lat","@value":"Saec"}]},{"urn":"urn:cts:latinLit:phi0893.phi0003","title":[{"@lang":"lat","@value":"Epodi"}],"abbreviations":[{"@lang":"lat","@value":"Epod"}]},{"urn":"urn:cts:latinLit:phi0893.phi0004","title":[{"@lang":"lat","@value":"Sermones"}],"abbreviations":[{"@lang":"lat","@value":"S"}]},{"urn":"urn:cts:latinLit:phi0893.phi0005","title":[{"@lang":"lat","@value":"Epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]},{"urn":"urn:cts:latinLit:phi0893.phi0006","title":[{"@lang":"lat","@value":"Ars Poetica"}],"abbreviations":[{"@lang":"lat","@value":"Ars"}]}]},{"urn":"urn:cts:latinLit:phi0405","title":[{"@lang":"lat","@value":"Clodius Tuscus"}],"abbreviations":[{"@lang":"lat","@value":"ClodTusc"}],"works":[{"urn":"urn:cts:latinLit:phi0405.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0652","title":[{"@lang":"lat","@value":"Sulla, Lucius Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Sulla"}],"works":[{"urn":"urn:cts:latinLit:phi0652.phi0001","title":[{"@lang":"lat","@value":"Commentarii Rerum Gestarum"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0418","title":[{"@lang":"lat","@value":"Atta, Titus Quinctius"}],"abbreviations":[{"@lang":"lat","@value":"Atta"}],"works":[{"urn":"urn:cts:latinLit:phi0418.phi0001","title":[{"@lang":"lat","@value":"epigramma"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0418.phi0002","title":[{"@lang":"lat","@value":"togatae"}],"abbreviations":[{"@lang":"lat","@value":"tog"}]}]},{"urn":"urn:cts:latinLit:phi1044","title":[{"@lang":"lat","@value":"Velleius Paterculus"}],"abbreviations":[{"@lang":"lat","@value":"Vell"}],"works":[{"urn":"urn:cts:latinLit:phi1044.phi0001","title":[{"@lang":"lat","@value":"Historia Romana"}],"abbreviations":[{"@lang":"lat","@value":"Hist"}]}]},{"urn":"urn:cts:latinLit:phi0996","title":[{"@lang":"lat","@value":"Probus, Marcus Valerius"}],"abbreviations":[{"@lang":"lat","@value":"Prob"}],"works":[{"urn":"urn:cts:latinLit:phi0996.phi0001","title":[{"@lang":"lat","@value":"Vita Persii"}],"abbreviations":[{"@lang":"lat","@value":"VitPers"}]},{"urn":"urn:cts:latinLit:phi0996.phi0002","title":[{"@lang":"lat","@value":"De Notis Iuris"}],"abbreviations":[{"@lang":"lat","@value":"IurNot"}]},{"urn":"urn:cts:latinLit:phi0996.phi0003","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0600","title":[{"@lang":"lat","@value":"Oppius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Opp"}],"works":[{"urn":"urn:cts:latinLit:phi0600.phi0001","title":[{"@lang":"lat","@value":"De Silvestribus Arboribus"}],"abbreviations":[{"@lang":"lat","@value":"agr"}]},{"urn":"urn:cts:latinLit:phi0600.phi0002","title":[{"@lang":"lat","@value":"vitae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi2806","title":[{"@lang":"lat","@value":"Justinian I, Emperor of the East"}],"abbreviations":[{"@lang":"lat","@value":"Just"}],"works":[{"urn":"urn:cts:latinLit:phi2806.phi0002","title":[{"@lang":"lat","@value":"Digesta Iustiniani"}],"abbreviations":[{"@lang":"lat","@value":"Dig"}]}]},{"urn":"urn:cts:latinLit:phi0082","title":[{"@lang":"lat","@value":"Silanus, Decimus Iunius"}],"abbreviations":[{"@lang":"lat","@value":"IunSil"}],"works":[{"urn":"urn:cts:latinLit:phi0082.phi0001","title":[{"@lang":"lat","@value":"versio Latina Magonis"}],"abbreviations":[{"@lang":"lat","@value":"agr"}]}]},{"urn":"urn:cts:latinLit:phi0644","title":[{"@lang":"lat","@value":"Ena, Sextilius"}],"abbreviations":[{"@lang":"lat","@value":"Sextil"}],"works":[{"urn":"urn:cts:latinLit:phi0644.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1279","title":[{"@lang":"lat","@value":"Laelius Felix"}],"abbreviations":[{"@lang":"lat","@value":"LaelFel"}],"works":[{"urn":"urn:cts:latinLit:phi1279.phi0001","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0596","title":[{"@lang":"lat","@value":"Numitorius"}],"abbreviations":[{"@lang":"lat","@value":"Num"}],"works":[{"urn":"urn:cts:latinLit:phi0596.phi0001","title":[{"@lang":"lat","@value":"Antibucolica"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1357","title":[{"@lang":"lat","@value":"Trajan, Emperor of Rome"}],"abbreviations":[{"@lang":"lat","@value":"Tra"}],"works":[{"urn":"urn:cts:latinLit:phi1357.phi0002","title":[{"@lang":"lat","@value":"Dacica"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0484","title":[{"@lang":"lat","@value":"Cincius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Cinc"}],"works":[{"urn":"urn:cts:latinLit:phi0484.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0484.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0656","title":[{"@lang":"lat","@value":"Sulpicius Rufus, Servius"}],"abbreviations":[{"@lang":"lat","@value":"SulpRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0656.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]},{"urn":"urn:cts:latinLit:phi0656.phi0003","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0005","title":[{"@lang":"lat","@value":"Aquilius"}],"abbreviations":[{"@lang":"lat","@value":"Aquil"}],"works":[{"urn":"urn:cts:latinLit:phi0005.phi0001","title":[{"@lang":"lat","@value":"palliata, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi1339","title":[{"@lang":"lat","@value":"Septimius Serenus"}],"abbreviations":[{"@lang":"lat","@value":"Sept"}],"works":[{"urn":"urn:cts:latinLit:phi1339.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0615","title":[{"@lang":"lat","@value":"Pompeius Rufus, Q."}],"abbreviations":[{"@lang":"lat","@value":"QPompeius"}],"works":[{"urn":"urn:cts:latinLit:phi0615.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0327","title":[{"@lang":"lat","@value":"Praeconinus Stilo, L. Aelius"}],"abbreviations":[{"@lang":"lat","@value":"Stilo"}],"works":[{"urn":"urn:cts:latinLit:phi0327.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0117","title":[{"@lang":"lat","@value":"Papinius"}],"abbreviations":[{"@lang":"lat","@value":"Pap"}],"works":[{"urn":"urn:cts:latinLit:phi0117.phi0001","title":[{"@lang":"lat","@value":"epigrammation"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0436","title":[{"@lang":"lat","@value":"Brutus, Marcus Iunius [tyr.]"}],"abbreviations":[{"@lang":"lat","@value":"Brutus"}],"works":[{"urn":"urn:cts:latinLit:phi0436.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0516","title":[{"@lang":"lat","@value":"Erucius, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Erucius"}],"works":[{"urn":"urn:cts:latinLit:phi0516.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0450","title":[{"@lang":"lat","@value":"Caesar, Lucius Iulius"}],"abbreviations":[{"@lang":"lat","@value":"LCaes"}],"works":[{"urn":"urn:cts:latinLit:phi0450.phi0001","title":[{"@lang":"lat","@value":"Auspiciorum Liber, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0860","title":[{"@lang":"lat","@value":"Curtius Rufus, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"Curt"}],"works":[{"urn":"urn:cts:latinLit:phi0860.phi0001","title":[{"@lang":"lat","@value":"Historiae Alexandri Magni"}],"abbreviations":[{"@lang":"lat","@value":"Alex"}]}]},{"urn":"urn:cts:latinLit:phi0552","title":[{"@lang":"lat","@value":"Lutatius Catulus, Qunitus"}],"abbreviations":[{"@lang":"lat","@value":"Lutat"}],"works":[{"urn":"urn:cts:latinLit:phi0552.phi0001","title":[{"@lang":"lat","@value":"epigrammata"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0552.phi0002","title":[{"@lang":"lat","@value":"Communes Historiae"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1327","title":[{"@lang":"lat","@value":"Sabidius"}],"abbreviations":[{"@lang":"lat","@value":"Sabid"}],"works":[{"urn":"urn:cts:latinLit:phi1327.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0401","title":[{"@lang":"lat","@value":"Aufustius"}],"abbreviations":[{"@lang":"lat","@value":"Aufust"}],"works":[{"urn":"urn:cts:latinLit:phi0401.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0043","title":[{"@lang":"lat","@value":"Ennius, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"Enn"}],"works":[{"urn":"urn:cts:latinLit:phi0043.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"Ann"}]},{"urn":"urn:cts:latinLit:phi0043.phi0002","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]},{"urn":"urn:cts:latinLit:phi0043.phi0003","title":[{"@lang":"lat","@value":"praetextae"}],"abbreviations":[{"@lang":"lat","@value":"praet"}]},{"urn":"urn:cts:latinLit:phi0043.phi0004","title":[{"@lang":"lat","@value":"Saturae"}],"abbreviations":[{"@lang":"lat","@value":"Sat"}]},{"urn":"urn:cts:latinLit:phi0043.phi0005","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]},{"urn":"urn:cts:latinLit:phi0043.phi0006","title":[{"@lang":"lat","@value":"varia"}],"abbreviations":[{"@lang":"lat","@value":"var"}]},{"urn":"urn:cts:latinLit:phi0043.phi0007","title":[{"@lang":"lat","@value":"incerta"}],"abbreviations":[{"@lang":"lat","@value":"inc"}]}]},{"urn":"urn:cts:latinLit:phi0851","title":[{"@lang":"lat","@value":"Severus, Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"CornSev"}],"works":[{"urn":"urn:cts:latinLit:phi0851.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0851.phi0002","title":[{"@lang":"lat","@value":"fragmenta a Morel omissa"}],"abbreviations":[{"@lang":"lat","@value":"poetB"}]}]},{"urn":"urn:cts:latinLit:phi0836","title":[{"@lang":"lat","@value":"Celsus, Aulus Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Cels"}],"works":[{"urn":"urn:cts:latinLit:phi0836.phi0001","title":[{"@lang":"lat","@value":"De Agricultura"}],"abbreviations":[{"@lang":"lat","@value":"Agr"}]},{"urn":"urn:cts:latinLit:phi0836.phi0002","title":[{"@lang":"lat","@value":"De Medicina"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]},{"urn":"urn:cts:latinLit:phi0836.phi0003","title":[{"@lang":"lat","@value":"De Rhetorica"}],"abbreviations":[{"@lang":"lat","@value":"Rhet"}]}]},{"urn":"urn:cts:latinLit:phi1318","title":[{"@lang":"lat","@value":"Pliny, the Younger"}],"abbreviations":[{"@lang":"lat","@value":"PlinIun"}],"works":[{"urn":"urn:cts:latinLit:phi1318.phi0001","title":[{"@lang":"lat","@value":"Epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]},{"urn":"urn:cts:latinLit:phi1318.phi0002","title":[{"@lang":"lat","@value":"Panegyricus"}],"abbreviations":[{"@lang":"lat","@value":"Pan"}]},{"urn":"urn:cts:latinLit:phi1318.phi0003","title":[{"@lang":"lat","@value":"versus"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0978","title":[{"@lang":"lat","@value":"Pliny, the Elder"}],"abbreviations":[{"@lang":"lat","@value":"PlinSen"}],"works":[{"urn":"urn:cts:latinLit:phi0978.phi0001","title":[{"@lang":"lat","@value":"Naturalis Historia"}],"abbreviations":[{"@lang":"lat","@value":"Nat"}]},{"urn":"urn:cts:latinLit:phi0978.phi0002","title":[{"@lang":"lat","@value":"Dubius Sermo"}],"abbreviations":[{"@lang":"lat","@value":"DubSerm"}]}]},{"urn":"urn:cts:latinLit:phi0425","title":[{"@lang":"lat","@value":"Rutilius Lupus, Publius"}],"abbreviations":[{"@lang":"lat","@value":"RutLup"}],"works":[{"urn":"urn:cts:latinLit:phi0425.phi0001","title":[{"@lang":"lat","@value":"Schemata Lexeos"}],"abbreviations":[{"@lang":"lat","@value":"Schem"}]}]},{"urn":"urn:cts:latinLit:phi0134","title":[{"@lang":"lat","@value":"Terence"}],"abbreviations":[{"@lang":"lat","@value":"Ter"}],"works":[{"urn":"urn:cts:latinLit:phi0134.phi0001","title":[{"@lang":"lat","@value":"Andria"}],"abbreviations":[{"@lang":"lat","@value":"An"}]},{"urn":"urn:cts:latinLit:phi0134.phi0002","title":[{"@lang":"lat","@value":"Heauton Timorumenos"}],"abbreviations":[{"@lang":"lat","@value":"Hau"}]},{"urn":"urn:cts:latinLit:phi0134.phi0003","title":[{"@lang":"lat","@value":"Eunuchus"}],"abbreviations":[{"@lang":"lat","@value":"Eu"}]},{"urn":"urn:cts:latinLit:phi0134.phi0004","title":[{"@lang":"lat","@value":"Phormio"}],"abbreviations":[{"@lang":"lat","@value":"Ph"}]},{"urn":"urn:cts:latinLit:phi0134.phi0005","title":[{"@lang":"lat","@value":"Hecyra"}],"abbreviations":[{"@lang":"lat","@value":"Hec"}]},{"urn":"urn:cts:latinLit:phi0134.phi0006","title":[{"@lang":"lat","@value":"Adelphoe"}],"abbreviations":[{"@lang":"lat","@value":"Ad"}]}]},{"urn":"urn:cts:latinLit:phi0002","title":[{"@lang":"lat","@value":"Annius Luscus, Titus"}],"abbreviations":[{"@lang":"lat","@value":"Annius"}],"works":[{"urn":"urn:cts:latinLit:phi0002.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0315","title":[{"@lang":"lat","@value":"Gracchanus, Marcus Iunius"}],"abbreviations":[{"@lang":"lat","@value":"Gracchan"}],"works":[{"urn":"urn:cts:latinLit:phi0315.phi0001","title":[{"@lang":"lat","@value":"commentarii"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0972","title":[{"@lang":"lat","@value":"Petronius"}],"abbreviations":[{"@lang":"lat","@value":"Petr"}],"works":[{"urn":"urn:cts:latinLit:phi0972.phi0001","title":[{"@lang":"lat","@value":"Satyrica"}],"abbreviations":[{"@lang":"lat","@value":"Sat"}]},{"urn":"urn:cts:latinLit:phi0972.phi0002","title":[{"@lang":"lat","@value":"Satyrica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0905","title":[{"@lang":"lat","@value":"Labeo, Marcus Antistius"}],"abbreviations":[{"@lang":"lat","@value":"AntLabeo"}],"works":[{"urn":"urn:cts:latinLit:phi0905.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0488","title":[{"@lang":"lat","@value":"Clodius, Servius"}],"abbreviations":[{"@lang":"lat","@value":"SerClod"}],"works":[{"urn":"urn:cts:latinLit:phi0488.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1032","title":[{"@lang":"lat","@value":"Vagellius"}],"abbreviations":[{"@lang":"lat","@value":"Vag"}],"works":[{"urn":"urn:cts:latinLit:phi1032.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0496","title":[{"@lang":"lat","@value":"Commentarius Anquisit. Sergii"}],"abbreviations":[{"@lang":"lat","@value":"CommentQuaestor"}],"works":[{"urn":"urn:cts:latinLit:phi0496.phi0001","title":[{"@lang":"lat","@value":"Comment. Anquisit. Sergii"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0899","title":[{"@lang":"lat","@value":"Hyginus Astronomus"}],"abbreviations":[{"@lang":"lat","@value":"HygAstr"}],"works":[{"urn":"urn:cts:latinLit:phi0899.phi0001","title":[{"@lang":"lat","@value":"Astronomica"}],"abbreviations":[{"@lang":"lat","@value":"Astr"}]}]},{"urn":"urn:cts:latinLit:phi2123","title":[{"@lang":"lat","@value":"Porfyrius, Publilius Optatianus"}],"abbreviations":[{"@lang":"lat","@value":"POptat"}],"works":[{"urn":"urn:cts:latinLit:phi2123.phi0003","title":[{"@lang":"lat","@value":"Epigrammata"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0530","title":[{"@lang":"lat","@value":"Hirtius, Aulus"}],"abbreviations":[{"@lang":"lat","@value":"Hirt"}],"works":[{"urn":"urn:cts:latinLit:phi0530.phi0001","title":[{"@lang":"lat","@value":"De Bello Gallico Liber VIII"}],"abbreviations":[{"@lang":"lat","@value":"Gal"}]},{"urn":"urn:cts:latinLit:phi0530.phi0002","title":[{"@lang":"lat","@value":"epistulae"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]}]},{"urn":"urn:cts:latinLit:phi0094","title":[{"@lang":"lat","@value":"Andronicus, Lucius Livius"}],"abbreviations":[{"@lang":"lat","@value":"Andr"}],"works":[{"urn":"urn:cts:latinLit:phi0094.phi0001","title":[{"@lang":"lat","@value":"Odyssia"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0094.phi0002","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]},{"urn":"urn:cts:latinLit:phi0094.phi0003","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0866","title":[{"@lang":"lat","@value":"Fenestella"}],"abbreviations":[{"@lang":"lat","@value":"Fen"}],"works":[{"urn":"urn:cts:latinLit:phi0866.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0727","title":[{"@lang":"lat","@value":"Cornificius Longus"}],"abbreviations":[{"@lang":"lat","@value":"CornifLong"}],"works":[{"urn":"urn:cts:latinLit:phi0727.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0618","title":[{"@lang":"lat","@value":"Pomponius, Lucius, Bononiensis"}],"abbreviations":[{"@lang":"lat","@value":"PomponBon"}],"works":[{"urn":"urn:cts:latinLit:phi0618.phi0001","title":[{"@lang":"lat","@value":"Atellanae"}],"abbreviations":[{"@lang":"lat","@value":"atell"}]}]},{"urn":"urn:cts:latinLit:phi0118","title":[{"@lang":"lat","@value":"Paullus, Lucius Aemilius"}],"abbreviations":[{"@lang":"lat","@value":"AemPaul"}],"works":[{"urn":"urn:cts:latinLit:phi0118.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi2002","title":[{"@lang":"lat","@value":"Albinus"}],"abbreviations":[{"@lang":"lat","@value":"Alb"}],"works":[{"urn":"urn:cts:latinLit:phi2002.phi0001","title":[{"@lang":"lat","@value":"Rerum Romanarum Liber I"}],"abbreviations":[{"@lang":"lat","@value":"ResRom"}]},{"urn":"urn:cts:latinLit:phi2002.phi0002","title":[{"@lang":"lat","@value":"De Metris"}],"abbreviations":[{"@lang":"lat","@value":"DeMetr"}]}]},{"urn":"urn:cts:latinLit:phi0408","title":[{"@lang":"lat","@value":"Antonius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Ant"}],"works":[{"urn":"urn:cts:latinLit:phi0408.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0959","title":[{"@lang":"lat","@value":"Ovid"}],"abbreviations":[{"@lang":"lat","@value":"Ov"}],"works":[{"urn":"urn:cts:latinLit:phi0959.phi0001","title":[{"@lang":"lat","@value":"Amores"}],"abbreviations":[{"@lang":"lat","@value":"Am"}]},{"urn":"urn:cts:latinLit:phi0959.phi0002","title":[{"@lang":"lat","@value":"Epistulae (vel Heroides)"}],"abbreviations":[{"@lang":"lat","@value":"Her"}]},{"urn":"urn:cts:latinLit:phi0959.phi0003","title":[{"@lang":"lat","@value":"Medicamina Faciei Femineae"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]},{"urn":"urn:cts:latinLit:phi0959.phi0004","title":[{"@lang":"lat","@value":"Ars Amatoria"}],"abbreviations":[{"@lang":"lat","@value":"Ars"}]},{"urn":"urn:cts:latinLit:phi0959.phi0005","title":[{"@lang":"lat","@value":"Remedia Amoris"}],"abbreviations":[{"@lang":"lat","@value":"Rem"}]},{"urn":"urn:cts:latinLit:phi0959.phi0006","title":[{"@lang":"lat","@value":"Metamorphoses"}],"abbreviations":[{"@lang":"lat","@value":"Met"}]},{"urn":"urn:cts:latinLit:phi0959.phi0007","title":[{"@lang":"lat","@value":"Fasti"}],"abbreviations":[{"@lang":"lat","@value":"Fast"}]},{"urn":"urn:cts:latinLit:phi0959.phi0008","title":[{"@lang":"lat","@value":"Tristia"}],"abbreviations":[{"@lang":"lat","@value":"Tr"}]},{"urn":"urn:cts:latinLit:phi0959.phi0009","title":[{"@lang":"lat","@value":"Epistulae ex Ponto"}],"abbreviations":[{"@lang":"lat","@value":"Pont"}]},{"urn":"urn:cts:latinLit:phi0959.phi0010","title":[{"@lang":"lat","@value":"Ibis"}],"abbreviations":[{"@lang":"lat","@value":"Ib"}]},{"urn":"urn:cts:latinLit:phi0959.phi0011","title":[{"@lang":"lat","@value":"Medea"}],"abbreviations":[{"@lang":"lat","@value":"Medea"}]},{"urn":"urn:cts:latinLit:phi0959.phi0012","title":[{"@lang":"lat","@value":"carmina, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0959.phi0013","title":[{"@lang":"lat","@value":"Nux [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Nux"}]},{"urn":"urn:cts:latinLit:phi0959.phi0014","title":[{"@lang":"lat","@value":"Halieutica [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Hal"}]},{"urn":"urn:cts:latinLit:phi0959.phi0015","title":[{"@lang":"lat","@value":"Epicedion Drusi [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"EpicDrusi"}]}]},{"urn":"urn:cts:latinLit:phi1276","title":[{"@lang":"lat","@value":"Juvenal"}],"abbreviations":[{"@lang":"lat","@value":"Juv"}],"works":[{"urn":"urn:cts:latinLit:phi1276.phi0001","title":[{"@lang":"lat","@value":"Saturae"}],"abbreviations":[{"@lang":"lat","@value":"S"}]}]},{"urn":"urn:cts:latinLit:phi0146","title":[{"@lang":"lat","@value":"Turpilius, Sextus"}],"abbreviations":[{"@lang":"lat","@value":"Turp"}],"works":[{"urn":"urn:cts:latinLit:phi0146.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi1285","title":[{"@lang":"lat","@value":"Maecianus, Lucius Volusius"}],"abbreviations":[{"@lang":"lat","@value":"Maecian"}],"works":[{"urn":"urn:cts:latinLit:phi1285.phi0001","title":[{"@lang":"lat","@value":"Assis Distributio ..."}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0490","title":[{"@lang":"lat","@value":"Cominius, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Comin"}],"works":[{"urn":"urn:cts:latinLit:phi0490.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0650","title":[{"@lang":"lat","@value":"Sueius"}],"abbreviations":[{"@lang":"lat","@value":"Sueius"}],"works":[{"urn":"urn:cts:latinLit:phi0650.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0533","title":[{"@lang":"lat","@value":"Hyginus, Gaius Iulius"}],"abbreviations":[{"@lang":"lat","@value":"HygGram"}],"works":[{"urn":"urn:cts:latinLit:phi0533.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0533.phi0002","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1056","title":[{"@lang":"lat","@value":"Vitruvius"}],"abbreviations":[{"@lang":"lat","@value":"Vitr"}],"works":[{"urn":"urn:cts:latinLit:phi1056.phi0001","title":[{"@lang":"lat","@value":"De Architectura"}],"abbreviations":[{"@lang":"lat","@value":"Arch"}]}]},{"urn":"urn:cts:latinLit:phi0594","title":[{"@lang":"lat","@value":"Novius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"LNov"}],"works":[{"urn":"urn:cts:latinLit:phi0594.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0646","title":[{"@lang":"lat","@value":"Sisenna, Lucius Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Sis"}],"works":[{"urn":"urn:cts:latinLit:phi0646.phi0001","title":[{"@lang":"lat","@value":"Historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0646.phi0002","title":[{"@lang":"lat","@value":"Milesiae"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]}]},{"urn":"urn:cts:latinLit:phi0112","title":[{"@lang":"lat","@value":"Naevius, Gnaeus"}],"abbreviations":[{"@lang":"lat","@value":"CnNaev"}],"works":[{"urn":"urn:cts:latinLit:phi0112.phi0001","title":[{"@lang":"lat","@value":"Bellum Punicum"}],"abbreviations":[{"@lang":"lat","@value":"Pun"}]},{"urn":"urn:cts:latinLit:phi0112.phi0002","title":[{"@lang":"lat","@value":"alia carmina epica"}],"abbreviations":[{"@lang":"lat","@value":"carm"}]},{"urn":"urn:cts:latinLit:phi0112.phi0003","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]},{"urn":"urn:cts:latinLit:phi0112.phi0004","title":[{"@lang":"lat","@value":"praetextae"}],"abbreviations":[{"@lang":"lat","@value":"praet"}]},{"urn":"urn:cts:latinLit:phi0112.phi0005","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]},{"urn":"urn:cts:latinLit:phi0112.phi0006","title":[{"@lang":"lat","@value":"carmina, frr. a Morel omissa"}],"abbreviations":[{"@lang":"lat","@value":"poetB"}]},{"urn":"urn:cts:latinLit:phi0112.phi0007","title":[{"@lang":"lat","@value":"versus in Metellos [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"InMet"}]}]},{"urn":"urn:cts:latinLit:phi1266","title":[{"@lang":"lat","@value":"Hyginus Gromaticus"}],"abbreviations":[{"@lang":"lat","@value":"HygGr"}],"works":[{"urn":"urn:cts:latinLit:phi1266.phi0001","title":[{"@lang":"lat","@value":"De Limitibus"}],"abbreviations":[{"@lang":"lat","@value":"Lim"}]},{"urn":"urn:cts:latinLit:phi1266.phi0002","title":[{"@lang":"lat","@value":"De Condicionibus Agrorum"}],"abbreviations":[{"@lang":"lat","@value":"Agr"}]},{"urn":"urn:cts:latinLit:phi1266.phi0003","title":[{"@lang":"lat","@value":"De Generibus Controversiarum"}],"abbreviations":[{"@lang":"lat","@value":"Contr"}]},{"urn":"urn:cts:latinLit:phi1266.phi0004","title":[{"@lang":"lat","@value":"Constitutio Limitum [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Const"}]},{"urn":"urn:cts:latinLit:phi1266.phi0005","title":[{"@lang":"lat","@value":"De Munition. Castrorum [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Munit"}]}]},{"urn":"urn:cts:latinLit:phi0076","title":[{"@lang":"lat","@value":"Cassius Hemina, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Hem"}],"works":[{"urn":"urn:cts:latinLit:phi0076.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0478","title":[{"@lang":"lat","@value":"Cicero, Quintus Tullius"}],"abbreviations":[{"@lang":"lat","@value":"QCic"}],"works":[{"urn":"urn:cts:latinLit:phi0478.phi0002","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0478.phi0003","title":[{"@lang":"lat","@value":"Commentar. Petitionis [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Pet"}]}]},{"urn":"urn:cts:latinLit:phi0624","title":[{"@lang":"lat","@value":"Claudius Quadrigarius, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"Quad"}],"works":[{"urn":"urn:cts:latinLit:phi0624.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0085","title":[{"@lang":"lat","@value":"Laelius, Gaius, Sapiens"}],"abbreviations":[{"@lang":"lat","@value":"Lael"}],"works":[{"urn":"urn:cts:latinLit:phi0085.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0938","title":[{"@lang":"lat","@value":"Montanus, Iulius"}],"abbreviations":[{"@lang":"lat","@value":"Mont"}],"works":[{"urn":"urn:cts:latinLit:phi0938.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0926","title":[{"@lang":"lat","@value":"Manilius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"ManAstr"}],"works":[{"urn":"urn:cts:latinLit:phi0926.phi0001","title":[{"@lang":"lat","@value":"Astronomica"}],"abbreviations":[{"@lang":"lat","@value":"Astr"}]}]},{"urn":"urn:cts:latinLit:phi0522","title":[{"@lang":"lat","@value":"Gallus, Gaius Aelius"}],"abbreviations":[{"@lang":"lat","@value":"AelGal"}],"works":[{"urn":"urn:cts:latinLit:phi0522.phi0001","title":[{"@lang":"lat","@value":"De Verbis ad Ius Civile"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]},{"urn":"urn:cts:latinLit:phi0522.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iurfrg"}]}]},{"urn":"urn:cts:latinLit:phi0582","title":[{"@lang":"lat","@value":"Metellus Numidicus, Q. Caecilius"}],"abbreviations":[{"@lang":"lat","@value":"MetNum"}],"works":[{"urn":"urn:cts:latinLit:phi0582.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0451","title":[{"@lang":"lat","@value":"Sinnius Capito"}],"abbreviations":[{"@lang":"lat","@value":"Sinn"}],"works":[{"urn":"urn:cts:latinLit:phi0451.phi0001","title":[{"@lang":"lat","@value":"grammatica, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0638","title":[{"@lang":"lat","@value":"Scaevola, Q. Mucius [pontifex]"}],"abbreviations":[{"@lang":"lat","@value":"QScaev"}],"works":[{"urn":"urn:cts:latinLit:phi0638.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0560","title":[{"@lang":"lat","@value":"Helvius Mancia"}],"abbreviations":[{"@lang":"lat","@value":"Manc"}],"works":[{"urn":"urn:cts:latinLit:phi0560.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1227","title":[{"@lang":"lat","@value":"Balbus"}],"abbreviations":[{"@lang":"lat","@value":"Balb"}],"works":[{"urn":"urn:cts:latinLit:phi1227.phi0001","title":[{"@lang":"lat","@value":"Expos. et Ratio Omn. Formarum"}],"abbreviations":[{"@lang":"lat","@value":"grom"}]}]},{"urn":"urn:cts:latinLit:phi1363","title":[{"@lang":"lat","@value":"Aemilius Asper"}],"abbreviations":[{"@lang":"lat","@value":"Asper"}],"works":[{"urn":"urn:cts:latinLit:phi1363.phi0001","title":[{"@lang":"lat","@value":"comment. in Ter. Sall. Verg."}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi1363.phi0002","title":[{"@lang":"lat","@value":"Vergilius"}],"abbreviations":[{"@lang":"lat","@value":"Verg"}]}]},{"urn":"urn:cts:latinLit:phi0809","title":[{"@lang":"lat","@value":"Aufidius Bassus"}],"abbreviations":[{"@lang":"lat","@value":"Aufid"}],"works":[{"urn":"urn:cts:latinLit:phi0809.phi0001","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1038","title":[{"@lang":"lat","@value":"Valerius Maximus"}],"abbreviations":[{"@lang":"lat","@value":"VMax"}],"works":[{"urn":"urn:cts:latinLit:phi1038.phi0001","title":[{"@lang":"lat","@value":"Facta et Dicta Memorabilia"}],"abbreviations":[{"@lang":"lat","@value":"Mem"}]}]},{"urn":"urn:cts:latinLit:phi0661","title":[{"@lang":"lat","@value":"Ticidas"}],"abbreviations":[{"@lang":"lat","@value":"Tic"}],"works":[{"urn":"urn:cts:latinLit:phi0661.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0538","title":[{"@lang":"lat","@value":"Laevius"}],"abbreviations":[{"@lang":"lat","@value":"Laev"}],"works":[{"urn":"urn:cts:latinLit:phi0538.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0538.phi0002","title":[{"@lang":"lat","@value":"fr. dubium a Morel omissum"}],"abbreviations":[{"@lang":"lat","@value":"poetB"}]}]},{"urn":"urn:cts:latinLit:phi0660","title":[{"@lang":"lat","@value":"Tibullus, Albius"}],"abbreviations":[{"@lang":"lat","@value":"Tib"}],"works":[{"urn":"urn:cts:latinLit:phi0660.phi0001","title":[{"@lang":"lat","@value":"Elegiae"}],"abbreviations":[{"@lang":"lat","@value":"Eleg"}]},{"urn":"urn:cts:latinLit:phi0660.phi0002","title":[{"@lang":"lat","@value":"carmina Tibulliana [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"CarmTib"}]}]},{"urn":"urn:cts:latinLit:phi0670","title":[{"@lang":"lat","@value":"Aelius Tubero, Qunitus"}],"abbreviations":[{"@lang":"lat","@value":"Tub"}],"works":[{"urn":"urn:cts:latinLit:phi0670.phi0001","title":[{"@lang":"lat","@value":"Historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0670.phi0002","title":[{"@lang":"lat","@value":"liber ad C. Oppium, fr."}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0127","title":[{"@lang":"lat","@value":"Scipio, Africanus"}],"abbreviations":[{"@lang":"lat","@value":"ScipioMaior"}],"works":[{"urn":"urn:cts:latinLit:phi0127.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0330","title":[{"@lang":"lat","@value":"Volcacius Sedigitus"}],"abbreviations":[{"@lang":"lat","@value":"Volc"}],"works":[{"urn":"urn:cts:latinLit:phi0330.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0027","title":[{"@lang":"lat","@value":"Cincius Alimentus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Cincius"}],"works":[{"urn":"urn:cts:latinLit:phi0027.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi0306","title":[{"@lang":"lat","@value":"Anonymous (Carmen Devotionis)"}],"abbreviations":[{"@lang":"lat","@value":"CarmDevot"}],"works":[{"urn":"urn:cts:latinLit:phi0306.phi0001","title":[{"@lang":"lat","@value":"Carmen Devotionis"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0454","title":[{"@lang":"lat","@value":"Calidius, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"Calid"}],"works":[{"urn":"urn:cts:latinLit:phi0454.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0869","title":[{"@lang":"lat","@value":"Verrius Flaccus, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"VerFl"}],"works":[{"urn":"urn:cts:latinLit:phi0869.phi0001","title":[{"@lang":"lat","@value":"Etruscarum Rerum Libri"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0869.phi0002","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi9505","title":[{"@lang":"lat","@value":"Anonymi Comici et Tragici"}],"abbreviations":[{"@lang":"lat","@value":"AnonComTrag"}],"works":[{"urn":"urn:cts:latinLit:phi9505.phi0001","title":[{"@lang":"lat","@value":"Togatae Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":"tog"}]},{"urn":"urn:cts:latinLit:phi9505.phi0002","title":[{"@lang":"lat","@value":"Atellanae Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":"atell"}]},{"urn":"urn:cts:latinLit:phi9505.phi0003","title":[{"@lang":"lat","@value":"Palliatae Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]},{"urn":"urn:cts:latinLit:phi9505.phi0004","title":[{"@lang":"lat","@value":"Tragoediae Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi0534","title":[{"@lang":"lat","@value":"Iuventius, comicus"}],"abbreviations":[{"@lang":"lat","@value":"Iuvent"}],"works":[{"urn":"urn:cts:latinLit:phi0534.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi0423","title":[{"@lang":"lat","@value":"Herennius Balbus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Balbus"}],"works":[{"urn":"urn:cts:latinLit:phi0423.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0890","title":[{"@lang":"lat","@value":"Homerus Latinus"}],"abbreviations":[{"@lang":"lat","@value":"HomLat"}],"works":[{"urn":"urn:cts:latinLit:phi0890.phi0001","title":[{"@lang":"lat","@value":"Ilias Latina"}],"abbreviations":[{"@lang":"lat","@value":"Ilias"}]}]},{"urn":"urn:cts:latinLit:phi0574","title":[{"@lang":"lat","@value":"Memmius L. f., Gaius"}],"abbreviations":[{"@lang":"lat","@value":"Mem"}],"works":[{"urn":"urn:cts:latinLit:phi0574.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0574.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1229","title":[{"@lang":"lat","@value":"Caper, Flavius"}],"abbreviations":[{"@lang":"lat","@value":"Caper"}],"works":[{"urn":"urn:cts:latinLit:phi1229.phi0001","title":[{"@lang":"lat","@value":"De Orthographia"}],"abbreviations":[{"@lang":"lat","@value":"Orth"}]},{"urn":"urn:cts:latinLit:phi1229.phi0002","title":[{"@lang":"lat","@value":"De Verbis Dubiis"}],"abbreviations":[{"@lang":"lat","@value":"VerbDub"}]}]},{"urn":"urn:cts:latinLit:phi0587","title":[{"@lang":"lat","@value":"Naevius"}],"abbreviations":[{"@lang":"lat","@value":"NaevIun"}],"works":[{"urn":"urn:cts:latinLit:phi0587.phi0001","title":[{"@lang":"lat","@value":"Ilias"}],"abbreviations":[{"@lang":"lat","@value":"CypIl"}]}]},{"urn":"urn:cts:latinLit:phi0019","title":[{"@lang":"lat","@value":"Carbo, Gaius Papirius"}],"abbreviations":[{"@lang":"lat","@value":"Carbo"}],"works":[{"urn":"urn:cts:latinLit:phi0019.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0622","title":[{"@lang":"lat","@value":"Publilius, Syrus"}],"abbreviations":[{"@lang":"lat","@value":"Pub"}],"works":[{"urn":"urn:cts:latinLit:phi0622.phi0001","title":[{"@lang":"lat","@value":"Sententiae"}],"abbreviations":[{"@lang":"lat","@value":"Sent"}]},{"urn":"urn:cts:latinLit:phi0622.phi0002","title":[{"@lang":"lat","@value":"mimi"}],"abbreviations":[{"@lang":"lat","@value":"mim"}]}]},{"urn":"urn:cts:latinLit:phi0923","title":[{"@lang":"lat","@value":"Macer, Aemilius"}],"abbreviations":[{"@lang":"lat","@value":"AemMacer"}],"works":[{"urn":"urn:cts:latinLit:phi0923.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0923.phi0002","title":[{"@lang":"lat","@value":"fragmentum a Morel omissum"}],"abbreviations":[{"@lang":"lat","@value":"poetB"}]}]},{"urn":"urn:cts:latinLit:phi0073","title":[{"@lang":"lat","@value":"Gracchus, Gaius Sempronius"}],"abbreviations":[{"@lang":"lat","@value":"CGracch"}],"works":[{"urn":"urn:cts:latinLit:phi0073.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0803","title":[{"@lang":"lat","@value":"Asconius Pedianus, Quintus"}],"abbreviations":[{"@lang":"lat","@value":"Asc"}],"works":[{"urn":"urn:cts:latinLit:phi0803.phi0001","title":[{"@lang":"lat","@value":"In Senatu Contra L. Pisonem"}],"abbreviations":[{"@lang":"lat","@value":"Pis"}]},{"urn":"urn:cts:latinLit:phi0803.phi0002","title":[{"@lang":"lat","@value":"Pro Scauro"}],"abbreviations":[{"@lang":"lat","@value":"Scaur"}]},{"urn":"urn:cts:latinLit:phi0803.phi0003","title":[{"@lang":"lat","@value":"Pro Milone"}],"abbreviations":[{"@lang":"lat","@value":"Mil"}]},{"urn":"urn:cts:latinLit:phi0803.phi0004","title":[{"@lang":"lat","@value":"Pro Cornelio"}],"abbreviations":[{"@lang":"lat","@value":"Corn"}]},{"urn":"urn:cts:latinLit:phi0803.phi0005","title":[{"@lang":"lat","@value":"In Toga Candida"}],"abbreviations":[{"@lang":"lat","@value":"TogCand"}]}]},{"urn":"urn:cts:latinLit:phi0444","title":[{"@lang":"lat","@value":"Caelius Rufus, Marcus"}],"abbreviations":[{"@lang":"lat","@value":"CaelRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0444.phi0002","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1206","title":[{"@lang":"lat","@value":"Ampelius, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Amp"}],"works":[{"urn":"urn:cts:latinLit:phi1206.phi0001","title":[{"@lang":"lat","@value":"Liber Memorialis"}],"abbreviations":[{"@lang":"lat","@value":"Mem"}]}]},{"urn":"urn:cts:latinLit:phi0448","title":[{"@lang":"lat","@value":"Caesar, Julius"}],"abbreviations":[{"@lang":"lat","@value":"Caes"}],"works":[{"urn":"urn:cts:latinLit:phi0448.phi0001","title":[{"@lang":"lat","@value":"De Bello Gallico"}],"abbreviations":[{"@lang":"lat","@value":"Gal"}]},{"urn":"urn:cts:latinLit:phi0448.phi0002","title":[{"@lang":"lat","@value":"Bellum Civile"}],"abbreviations":[{"@lang":"lat","@value":"Civ"}]},{"urn":"urn:cts:latinLit:phi0448.phi0003","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]},{"urn":"urn:cts:latinLit:phi0448.phi0004","title":[{"@lang":"lat","@value":"De Analogia"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0448.phi0005","title":[{"@lang":"lat","@value":"Anticato"}],"abbreviations":[{"@lang":"lat","@value":"Anticat"}]},{"urn":"urn:cts:latinLit:phi0448.phi0006","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"carm"}]},{"urn":"urn:cts:latinLit:phi0448.phi0007","title":[{"@lang":"lat","@value":"epistulae ad Ciceronem"}],"abbreviations":[{"@lang":"lat","@value":"EpCic"}]},{"urn":"urn:cts:latinLit:phi0448.phi0008","title":[{"@lang":"lat","@value":"epistulae ad familiares"}],"abbreviations":[{"@lang":"lat","@value":"EpFam"}]}]},{"urn":"urn:cts:latinLit:phi1218","title":[{"@lang":"lat","@value":"Augurinus, Sentius"}],"abbreviations":[{"@lang":"lat","@value":"Augur"}],"works":[{"urn":"urn:cts:latinLit:phi1218.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0492","title":[{"@lang":"lat","@value":"Commentarii Augurum"}],"abbreviations":[{"@lang":"lat","@value":"CommentAugur"}],"works":[{"urn":"urn:cts:latinLit:phi0492.phi0001","title":[{"@lang":"lat","@value":"Commentarii Augurum"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0709","title":[{"@lang":"lat","@value":"Marsus, Domitius"}],"abbreviations":[{"@lang":"lat","@value":"DomMars"}],"works":[{"urn":"urn:cts:latinLit:phi0709.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0709.phi0002","title":[{"@lang":"lat","@value":"epigrammata ex Bobiensibus"}],"abbreviations":[{"@lang":"lat","@value":"EpigrBob"}]}]},{"urn":"urn:cts:latinLit:phi1053","title":[{"@lang":"lat","@value":"Vibius Crispus"}],"abbreviations":[{"@lang":"lat","@value":"VibCrisp"}],"works":[{"urn":"urn:cts:latinLit:phi1053.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi1005","title":[{"@lang":"lat","@value":"Rabirius"}],"abbreviations":[{"@lang":"lat","@value":"Rab"}],"works":[{"urn":"urn:cts:latinLit:phi1005.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0324","title":[{"@lang":"lat","@value":"Saserna"}],"abbreviations":[{"@lang":"lat","@value":"Saserna"}],"works":[{"urn":"urn:cts:latinLit:phi0324.phi0001","title":[{"@lang":"lat","@value":"De Agri Cultura"}],"abbreviations":[{"@lang":"lat","@value":"agr"}]}]},{"urn":"urn:cts:latinLit:phi0445","title":[{"@lang":"lat","@value":"Caepasius, Gaius vel Lucius"}],"abbreviations":[{"@lang":"lat","@value":"Caepasius"}],"works":[{"urn":"urn:cts:latinLit:phi0445.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0981","title":[{"@lang":"lat","@value":"Pollio, Gaius Asinius"}],"abbreviations":[{"@lang":"lat","@value":"Pol"}],"works":[{"urn":"urn:cts:latinLit:phi0981.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0981.phi0003","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]},{"urn":"urn:cts:latinLit:phi0981.phi0004","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]},{"urn":"urn:cts:latinLit:phi0981.phi0005","title":[{"@lang":"lat","@value":"historiae"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi0046","title":[{"@lang":"lat","@value":"Cornelius Epicadus"}],"abbreviations":[{"@lang":"lat","@value":"Epicad"}],"works":[{"urn":"urn:cts:latinLit:phi0046.phi0001","title":[{"@lang":"lat","@value":"grammatica"}],"abbreviations":[{"@lang":"lat","@value":"gram"}]}]},{"urn":"urn:cts:latinLit:phi1035","title":[{"@lang":"lat","@value":"Valerius Flaccus, Gaius"}],"abbreviations":[{"@lang":"lat","@value":"VFl"}],"works":[{"urn":"urn:cts:latinLit:phi1035.phi0001","title":[{"@lang":"lat","@value":"Argonautica"}],"abbreviations":[{"@lang":"lat","@value":"Arg"}]}]},{"urn":"urn:cts:latinLit:phi2300","title":[{"@lang":"lat","@value":"Aemilius Sura"}],"abbreviations":[{"@lang":"lat","@value":"AemSura"}],"works":[{"urn":"urn:cts:latinLit:phi2300.phi0001","title":[{"@lang":"lat","@value":"De Annis Populi Romani"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi9221","title":[{"@lang":"lat","@value":"Paulus, Quaestor"}],"abbreviations":[{"@lang":"lat","@value":"PaulQuaest"}],"works":[{"urn":"urn:cts:latinLit:phi9221.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0682","title":[{"@lang":"lat","@value":"Varius Rufus, Lucius"}],"abbreviations":[{"@lang":"lat","@value":"VRuf"}],"works":[{"urn":"urn:cts:latinLit:phi0682.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi0682.phi0002","title":[{"@lang":"lat","@value":"tragoediae"}],"abbreviations":[{"@lang":"lat","@value":"trag"}]}]},{"urn":"urn:cts:latinLit:phi1342","title":[{"@lang":"lat","@value":"Siculus Flaccus"}],"abbreviations":[{"@lang":"lat","@value":"SicFl"}],"works":[{"urn":"urn:cts:latinLit:phi1342.phi0001","title":[{"@lang":"lat","@value":"De Condicionibus Agrorum"}],"abbreviations":[{"@lang":"lat","@value":"CondAgr"}]}]},{"urn":"urn:cts:latinLit:phi0920","title":[{"@lang":"lat","@value":"Lucilius Iunior"}],"abbreviations":[{"@lang":"lat","@value":"LucilIun"}],"works":[{"urn":"urn:cts:latinLit:phi0920.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1017","title":[{"@lang":"lat","@value":"Seneca, Lucius Annaeus (the younger)"}],"abbreviations":[{"@lang":"lat","@value":"SenPhil"}],"works":[{"urn":"urn:cts:latinLit:phi1017.phi0001","title":[{"@lang":"lat","@value":"Hercules Furens"}],"abbreviations":[{"@lang":"lat","@value":"HerF"}]},{"urn":"urn:cts:latinLit:phi1017.phi0002","title":[{"@lang":"lat","@value":"Troades"}],"abbreviations":[{"@lang":"lat","@value":"Tro"}]},{"urn":"urn:cts:latinLit:phi1017.phi0003","title":[{"@lang":"lat","@value":"Phoenissae"}],"abbreviations":[{"@lang":"lat","@value":"Phoen"}]},{"urn":"urn:cts:latinLit:phi1017.phi0004","title":[{"@lang":"lat","@value":"Medea"}],"abbreviations":[{"@lang":"lat","@value":"Med"}]},{"urn":"urn:cts:latinLit:phi1017.phi0005","title":[{"@lang":"lat","@value":"Phaedra"}],"abbreviations":[{"@lang":"lat","@value":"Phaed"}]},{"urn":"urn:cts:latinLit:phi1017.phi0006","title":[{"@lang":"lat","@value":"Oedipus"}],"abbreviations":[{"@lang":"lat","@value":"Oed"}]},{"urn":"urn:cts:latinLit:phi1017.phi0007","title":[{"@lang":"lat","@value":"Agamemnon"}],"abbreviations":[{"@lang":"lat","@value":"Ag"}]},{"urn":"urn:cts:latinLit:phi1017.phi0008","title":[{"@lang":"lat","@value":"Thyestes"}],"abbreviations":[{"@lang":"lat","@value":"Thy"}]},{"urn":"urn:cts:latinLit:phi1017.phi0009","title":[{"@lang":"lat","@value":"Hercules Oetaeus"}],"abbreviations":[{"@lang":"lat","@value":"HerO"}]},{"urn":"urn:cts:latinLit:phi1017.phi0010","title":[{"@lang":"lat","@value":"Octavia [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"Oct"}]},{"urn":"urn:cts:latinLit:phi1017.phi0011","title":[{"@lang":"lat","@value":"Apocolocyntosis"}],"abbreviations":[{"@lang":"lat","@value":"Apoc"}]},{"urn":"urn:cts:latinLit:phi1017.phi0012","title":[{"@lang":"lat","@value":"Dialogi"}],"abbreviations":[{"@lang":"lat","@value":"Dial"}]},{"urn":"urn:cts:latinLit:phi1017.phi0013","title":[{"@lang":"lat","@value":"De Beneficiis"}],"abbreviations":[{"@lang":"lat","@value":"Ben"}]},{"urn":"urn:cts:latinLit:phi1017.phi0014","title":[{"@lang":"lat","@value":"De Clementia"}],"abbreviations":[{"@lang":"lat","@value":"Cl"}]},{"urn":"urn:cts:latinLit:phi1017.phi0015","title":[{"@lang":"lat","@value":"Epistulae Morales ad Lucilium"}],"abbreviations":[{"@lang":"lat","@value":"Ep"}]},{"urn":"urn:cts:latinLit:phi1017.phi0016","title":[{"@lang":"lat","@value":"Naturales Quaestiones"}],"abbreviations":[{"@lang":"lat","@value":"Nat"}]},{"urn":"urn:cts:latinLit:phi1017.phi0017","title":[{"@lang":"lat","@value":"e Cleanthe versus"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]},{"urn":"urn:cts:latinLit:phi1017.phi0018","title":[{"@lang":"lat","@value":"De Vita Patris"}],"abbreviations":[{"@lang":"lat","@value":"VitPatr"}]}]},{"urn":"urn:cts:latinLit:phi0125","title":[{"@lang":"lat","@value":"Scaevola, Publius Mucius"}],"abbreviations":[{"@lang":"lat","@value":"PScaev"}],"works":[{"urn":"urn:cts:latinLit:phi0125.phi0001","title":[{"@lang":"lat","@value":"fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0642","title":[{"@lang":"lat","@value":"Sevius Nicanor"}],"abbreviations":[{"@lang":"lat","@value":"Sev"}],"works":[{"urn":"urn:cts:latinLit:phi0642.phi0001","title":[{"@lang":"lat","@value":"carmen"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi1377","title":[{"@lang":"lat","@value":"Fragmenta Bobiensia"}],"abbreviations":[{"@lang":"lat","@value":"FrgBob"}],"works":[{"urn":"urn:cts:latinLit:phi1377.phi0001","title":[{"@lang":"lat","@value":"De Littera"}],"abbreviations":[{"@lang":"lat","@value":"Litt"}]},{"urn":"urn:cts:latinLit:phi1377.phi0002","title":[{"@lang":"lat","@value":"De Accentibus"}],"abbreviations":[{"@lang":"lat","@value":"Acc"}]},{"urn":"urn:cts:latinLit:phi1377.phi0003","title":[{"@lang":"lat","@value":"De Propriis Nominibus"}],"abbreviations":[{"@lang":"lat","@value":"PropNom"}]},{"urn":"urn:cts:latinLit:phi1377.phi0004","title":[{"@lang":"lat","@value":"De Nomine"}],"abbreviations":[{"@lang":"lat","@value":"Nom"}]},{"urn":"urn:cts:latinLit:phi1377.phi0005","title":[{"@lang":"lat","@value":"De Versibus"}],"abbreviations":[{"@lang":"lat","@value":"Vers"}]},{"urn":"urn:cts:latinLit:phi1377.phi0006","title":[{"@lang":"lat","@value":"De Finalibus Syllabis"}],"abbreviations":[{"@lang":"lat","@value":"FinSyll"}]},{"urn":"urn:cts:latinLit:phi1377.phi0007","title":[{"@lang":"lat","@value":"De Structuris"}],"abbreviations":[{"@lang":"lat","@value":"Struct"}]},{"urn":"urn:cts:latinLit:phi1377.phi0008","title":[{"@lang":"lat","@value":"De Metris"}],"abbreviations":[{"@lang":"lat","@value":"Metr"}]}]},{"urn":"urn:cts:latinLit:phi3211","title":[{"@lang":"lat","@value":"Argum. Aen. et Tetrast."}],"abbreviations":[{"@lang":"lat","@value":"Arg"}],"works":[{"urn":"urn:cts:latinLit:phi3211.phi0001","title":[{"@lang":"lat","@value":"Argumenta Aeneidis, Decasticha"}],"abbreviations":[{"@lang":"lat","@value":"Deca"}]},{"urn":"urn:cts:latinLit:phi3211.phi0002","title":[{"@lang":"lat","@value":"Argumenta Aeneidis, Monosticha"}],"abbreviations":[{"@lang":"lat","@value":"Mono"}]},{"urn":"urn:cts:latinLit:phi3211.phi0003","title":[{"@lang":"lat","@value":"Tetrasticha in Vergilii Bucolica et Georgica"}],"abbreviations":[{"@lang":"lat","@value":"Tetr"}]},{"urn":"urn:cts:latinLit:phi3211.phi0004","title":[{"@lang":"lat","@value":"Tetrasticha in Vergilii Aeneida"}],"abbreviations":[{"@lang":"lat","@value":"TetrAen"}]}]},{"urn":"urn:cts:latinLit:phi0630","title":[{"@lang":"lat","@value":"Sacra Argeorum"}],"abbreviations":[{"@lang":"lat","@value":"SacrArg"}],"works":[{"urn":"urn:cts:latinLit:phi0630.phi0001","title":[{"@lang":"lat","@value":"Sacra Argeorum"}],"abbreviations":[{"@lang":"lat","@value":""}]}]},{"urn":"urn:cts:latinLit:phi0588","title":[{"@lang":"lat","@value":"Nepos, Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Nep"}],"works":[{"urn":"urn:cts:latinLit:phi0588.phi0001","title":[{"@lang":"lat","@value":"Vitae"}],"abbreviations":[{"@lang":"lat","@value":"Vit"}]},{"urn":"urn:cts:latinLit:phi0588.phi0002","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]}]},{"urn":"urn:cts:latinLit:phi0676","title":[{"@lang":"lat","@value":"Valerius Antias"}],"abbreviations":[{"@lang":"lat","@value":"ValAnt"}],"works":[{"urn":"urn:cts:latinLit:phi0676.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]}]},{"urn":"urn:cts:latinLit:phi1002","title":[{"@lang":"lat","@value":"Quintillian"}],"abbreviations":[{"@lang":"lat","@value":"Quint"}],"works":[{"urn":"urn:cts:latinLit:phi1002.phi0001","title":[{"@lang":"lat","@value":"Institutio Oratoria"}],"abbreviations":[{"@lang":"lat","@value":"Inst"}]},{"urn":"urn:cts:latinLit:phi1002.phi0002","title":[{"@lang":"lat","@value":"Declamationes Minores"}],"abbreviations":[{"@lang":"lat","@value":"Decl"}]},{"urn":"urn:cts:latinLit:phi1002.phi0003","title":[{"@lang":"lat","@value":"Declamationes Maiores [sp.]"}],"abbreviations":[{"@lang":"lat","@value":"DeclMaior"}]}]},{"urn":"urn:cts:latinLit:phi0540","title":[{"@lang":"lat","@value":"Laurea, Tullius"}],"abbreviations":[{"@lang":"lat","@value":"Laurea"}],"works":[{"urn":"urn:cts:latinLit:phi0540.phi0001","title":[{"@lang":"lat","@value":"epigramma in Ciceronis obitum"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0013","title":[{"@lang":"lat","@value":"Caecilius Statius"}],"abbreviations":[{"@lang":"lat","@value":"Caecil"}],"works":[{"urn":"urn:cts:latinLit:phi0013.phi0001","title":[{"@lang":"lat","@value":"palliatae"}],"abbreviations":[{"@lang":"lat","@value":"pall"}]}]},{"urn":"urn:cts:latinLit:phi9500","title":[{"@lang":"lat","@value":"Anonymi Epici et Lyrici"}],"abbreviations":[{"@lang":"lat","@value":"AnonEpLyr"}],"works":[{"urn":"urn:cts:latinLit:phi9500.phi0001","title":[{"@lang":"lat","@value":"carmen Saliare"}],"abbreviations":[{"@lang":"lat","@value":"CarmSal"}]},{"urn":"urn:cts:latinLit:phi9500.phi0002","title":[{"@lang":"lat","@value":"versus sacrorum"}],"abbreviations":[{"@lang":"lat","@value":"VersSacr"}]},{"urn":"urn:cts:latinLit:phi9500.phi0003","title":[{"@lang":"lat","@value":"sententia"}],"abbreviations":[{"@lang":"lat","@value":"Sent"}]},{"urn":"urn:cts:latinLit:phi9500.phi0004","title":[{"@lang":"lat","@value":"A. Atilii Calatini elogium"}],"abbreviations":[{"@lang":"lat","@value":"CalElog"}]},{"urn":"urn:cts:latinLit:phi9500.phi0005","title":[{"@lang":"lat","@value":"carmen Priami"}],"abbreviations":[{"@lang":"lat","@value":"CarmPriam"}]},{"urn":"urn:cts:latinLit:phi9500.phi0006","title":[{"@lang":"lat","@value":"saturnius(?)"}],"abbreviations":[{"@lang":"lat","@value":"IncSat"}]},{"urn":"urn:cts:latinLit:phi9500.phi0007","title":[{"@lang":"lat","@value":"Acilii Glabrionis tabula"}],"abbreviations":[{"@lang":"lat","@value":"GlabTab"}]},{"urn":"urn:cts:latinLit:phi9500.phi0008","title":[{"@lang":"lat","@value":"M. Aemilii cos. a. 179 tabula"}],"abbreviations":[{"@lang":"lat","@value":"AemTab"}]},{"urn":"urn:cts:latinLit:phi9500.phi0009","title":[{"@lang":"lat","@value":"versiculi populares et pueriles"}],"abbreviations":[{"@lang":"lat","@value":"VersicPop"}]},{"urn":"urn:cts:latinLit:phi9500.phi0010","title":[{"@lang":"lat","@value":"praecepta rustica et medica"}],"abbreviations":[{"@lang":"lat","@value":"Praec"}]},{"urn":"urn:cts:latinLit:phi9500.phi0011","title":[{"@lang":"lat","@value":"epigramma a Varrone Plauto attributum"}],"abbreviations":[{"@lang":"lat","@value":"EpigrPlaut"}]},{"urn":"urn:cts:latinLit:phi9500.phi0012","title":[{"@lang":"lat","@value":"epigramma Pacuvi"}],"abbreviations":[{"@lang":"lat","@value":"EpigrPac"}]},{"urn":"urn:cts:latinLit:phi9500.phi0013","title":[{"@lang":"lat","@value":"Ardeatis templi inscriptio"}],"abbreviations":[{"@lang":"lat","@value":"ArdInscr"}]},{"urn":"urn:cts:latinLit:phi9500.phi0014","title":[{"@lang":"lat","@value":"templi Tarracinensis inscriptio"}],"abbreviations":[{"@lang":"lat","@value":"TarInscr"}]},{"urn":"urn:cts:latinLit:phi9500.phi0015","title":[{"@lang":"lat","@value":"in Carbonem versus popularis"}],"abbreviations":[{"@lang":"lat","@value":"CarbVers"}]},{"urn":"urn:cts:latinLit:phi9500.phi0016","title":[{"@lang":"lat","@value":"carmina Marciana et similia"}],"abbreviations":[{"@lang":"lat","@value":"CarmMarc"}]},{"urn":"urn:cts:latinLit:phi9500.phi0017","title":[{"@lang":"lat","@value":"versus populares in Caesarem et similia"}],"abbreviations":[{"@lang":"lat","@value":"InCaes"}]},{"urn":"urn:cts:latinLit:phi9500.phi0018","title":[{"@lang":"lat","@value":"epigrammata et populares versus in Augustum"}],"abbreviations":[{"@lang":"lat","@value":"InAug"}]},{"urn":"urn:cts:latinLit:phi9500.phi0019","title":[{"@lang":"lat","@value":"obtrectatoris Vergilii versiculus"}],"abbreviations":[{"@lang":"lat","@value":"ObtrVerg"}]},{"urn":"urn:cts:latinLit:phi9500.phi0020","title":[{"@lang":"lat","@value":"de Crassitio epigramma"}],"abbreviations":[{"@lang":"lat","@value":"CrassEpigr"}]},{"urn":"urn:cts:latinLit:phi9500.phi0021","title":[{"@lang":"lat","@value":"populares versus in Sarmentum"}],"abbreviations":[{"@lang":"lat","@value":"InSarm"}]},{"urn":"urn:cts:latinLit:phi9500.phi0022","title":[{"@lang":"lat","@value":"versus populares in Tiberium et Germanicum"}],"abbreviations":[{"@lang":"lat","@value":"InTib"}]},{"urn":"urn:cts:latinLit:phi9500.phi0023","title":[{"@lang":"lat","@value":"populares versus in Caligulam"}],"abbreviations":[{"@lang":"lat","@value":"InCal"}]},{"urn":"urn:cts:latinLit:phi9500.phi0024","title":[{"@lang":"lat","@value":"artificia metrica"}],"abbreviations":[{"@lang":"lat","@value":"Artif"}]},{"urn":"urn:cts:latinLit:phi9500.phi0025","title":[{"@lang":"lat","@value":"versus populares in Neronem et eiusque successores"}],"abbreviations":[{"@lang":"lat","@value":"InNer"}]},{"urn":"urn:cts:latinLit:phi9500.phi0026","title":[{"@lang":"lat","@value":"versus Hor. Sat. I 10 praemissi"}],"abbreviations":[{"@lang":"lat","@value":"VersHor"}]},{"urn":"urn:cts:latinLit:phi9500.phi0027","title":[{"@lang":"lat","@value":"versus de VII sapientibus"}],"abbreviations":[{"@lang":"lat","@value":"VersSap"}]},{"urn":"urn:cts:latinLit:phi9500.phi0028","title":[{"@lang":"lat","@value":"odarium"}],"abbreviations":[{"@lang":"lat","@value":"Odar"}]},{"urn":"urn:cts:latinLit:phi9500.phi0029","title":[{"@lang":"lat","@value":"versus fortasse Clementis(?)"}],"abbreviations":[{"@lang":"lat","@value":"PoetEp"}]},{"urn":"urn:cts:latinLit:phi9500.phi0030","title":[{"@lang":"lat","@value":"versus in Caesares Romanos ex Historia Augusta"}],"abbreviations":[{"@lang":"lat","@value":"HistAug"}]},{"urn":"urn:cts:latinLit:phi9500.phi0031","title":[{"@lang":"lat","@value":"versus Orphici ab Arnobio conversi"}],"abbreviations":[{"@lang":"lat","@value":"VersOrph"}]},{"urn":"urn:cts:latinLit:phi9500.phi0032","title":[{"@lang":"lat","@value":"Tarentinus senarius"}],"abbreviations":[{"@lang":"lat","@value":"TarSen"}]},{"urn":"urn:cts:latinLit:phi9500.phi0033","title":[{"@lang":"lat","@value":"De Venere et Amoribus"}],"abbreviations":[{"@lang":"lat","@value":"VenAmor"}]},{"urn":"urn:cts:latinLit:phi9500.phi0034","title":[{"@lang":"lat","@value":"De Metris"}],"abbreviations":[{"@lang":"lat","@value":"Metr"}]},{"urn":"urn:cts:latinLit:phi9500.phi0035","title":[{"@lang":"lat","@value":"versus fortasse Enniani"}],"abbreviations":[{"@lang":"lat","@value":"VersEnn"}]},{"urn":"urn:cts:latinLit:phi9500.phi0036","title":[{"@lang":"lat","@value":"versus fortasse Luciliani"}],"abbreviations":[{"@lang":"lat","@value":"VersLucil"}]},{"urn":"urn:cts:latinLit:phi9500.phi0037","title":[{"@lang":"lat","@value":"versus aevi Catulliani"}],"abbreviations":[{"@lang":"lat","@value":"AevCatul"}]},{"urn":"urn:cts:latinLit:phi9500.phi0038","title":[{"@lang":"lat","@value":"versus aevi Catulliani a Morel omissi"}],"abbreviations":[{"@lang":"lat","@value":"AevCatul2"}]},{"urn":"urn:cts:latinLit:phi9500.phi0039","title":[{"@lang":"lat","@value":"versus aevi Augustei"}],"abbreviations":[{"@lang":"lat","@value":"AevAug"}]},{"urn":"urn:cts:latinLit:phi9500.phi0040","title":[{"@lang":"lat","@value":"serioris aetatis versus"}],"abbreviations":[{"@lang":"lat","@value":"SerAet"}]},{"urn":"urn:cts:latinLit:phi9500.phi0041","title":[{"@lang":"lat","@value":"versus reciproci"}],"abbreviations":[{"@lang":"lat","@value":"VersRecip"}]}]},{"urn":"urn:cts:latinLit:phi0584","title":[{"@lang":"lat","@value":"Mimi Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":"MimInc"}],"works":[{"urn":"urn:cts:latinLit:phi0584.phi0001","title":[{"@lang":"lat","@value":"Mimi Poetarum Incertorum"}],"abbreviations":[{"@lang":"lat","@value":""}]},{"urn":"urn:cts:latinLit:phi0584.phi0002","title":[{"@lang":"lat","@value":"fragmenta dubia"}],"abbreviations":[{"@lang":"lat","@value":"dub"}]}]},{"urn":"urn:cts:latinLit:phi0067","title":[{"@lang":"lat","@value":"Favorinus"}],"abbreviations":[{"@lang":"lat","@value":"Fav"}],"works":[{"urn":"urn:cts:latinLit:phi0067.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0498","title":[{"@lang":"lat","@value":"Cotta, Gaius Aurelius"}],"abbreviations":[{"@lang":"lat","@value":"Cotta"}],"works":[{"urn":"urn:cts:latinLit:phi0498.phi0001","title":[{"@lang":"lat","@value":"oratio"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0321","title":[{"@lang":"lat","@value":"Porcius Licinus"}],"abbreviations":[{"@lang":"lat","@value":"Porc"}],"works":[{"urn":"urn:cts:latinLit:phi0321.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0130","title":[{"@lang":"lat","@value":"Scipio Nascia Serapio, P. Cornelius"}],"abbreviations":[{"@lang":"lat","@value":"Nasica"}],"works":[{"urn":"urn:cts:latinLit:phi0130.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0406","title":[{"@lang":"lat","@value":"Alfenus Varus, Publius"}],"abbreviations":[{"@lang":"lat","@value":"Alf"}],"works":[{"urn":"urn:cts:latinLit:phi0406.phi0002","title":[{"@lang":"lat","@value":"iurisprudentia, fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi1321","title":[{"@lang":"lat","@value":"Pomponius, Sextus"}],"abbreviations":[{"@lang":"lat","@value":"Pompon"}],"works":[{"urn":"urn:cts:latinLit:phi1321.phi0002","title":[{"@lang":"lat","@value":"Liber Regularum, fragmentum"}],"abbreviations":[{"@lang":"lat","@value":"Reg"}]}]},{"urn":"urn:cts:latinLit:phi0668","title":[{"@lang":"lat","@value":"Scrofa, Gnaeus Tremelius"}],"abbreviations":[{"@lang":"lat","@value":"Tremel"}],"works":[{"urn":"urn:cts:latinLit:phi0668.phi0001","title":[{"@lang":"lat","@value":"de re rustica"}],"abbreviations":[{"@lang":"lat","@value":"agr"}]}]},{"urn":"urn:cts:latinLit:phi0079","title":[{"@lang":"lat","@value":"Hostius"}],"abbreviations":[{"@lang":"lat","@value":"Host"}],"works":[{"urn":"urn:cts:latinLit:phi0079.phi0001","title":[{"@lang":"lat","@value":"Bellum Histricum"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi2434","title":[{"@lang":"lat","@value":"Hilary, Saint, Archbishop of Arles"}],"abbreviations":[{"@lang":"lat","@value":"Hil"}],"works":[{"urn":"urn:cts:latinLit:phi2434.phi0001","title":[{"@lang":"lat","@value":"carmina"}],"abbreviations":[{"@lang":"lat","@value":"poet"}]}]},{"urn":"urn:cts:latinLit:phi0473","title":[{"@lang":"lat","@value":"Lutatius Catulus, Q., Iunior"}],"abbreviations":[{"@lang":"lat","@value":"LutatIun"}],"works":[{"urn":"urn:cts:latinLit:phi0473.phi0001","title":[{"@lang":"lat","@value":"orationes"}],"abbreviations":[{"@lang":"lat","@value":"orat"}]}]},{"urn":"urn:cts:latinLit:phi0061","title":[{"@lang":"lat","@value":"Fabius Pictor"}],"abbreviations":[{"@lang":"lat","@value":"FabPict"}],"works":[{"urn":"urn:cts:latinLit:phi0061.phi0001","title":[{"@lang":"lat","@value":"Annales"}],"abbreviations":[{"@lang":"lat","@value":"hist"}]},{"urn":"urn:cts:latinLit:phi0061.phi0002","title":[{"@lang":"lat","@value":"Iuris Pontificis Libri"}],"abbreviations":[{"@lang":"lat","@value":"iur"}]}]},{"urn":"urn:cts:latinLit:phi0550","title":[{"@lang":"lat","@value":"Lucretius Carus, Titus"}],"abbreviations":[{"@lang":"lat","@value":"Lucr"}],"works":[{"urn":"urn:cts:latinLit:phi0550.phi0001","title":[{"@lang":"lat","@value":"De Rerum Natura"}],"abbreviations":[{"@lang":"lat","@value":"DRN"}]},{"urn":"urn:cts:latinLit:phi0550.phi0002","title":[{"@lang":"lat","@value":"fragmenta"}],"abbreviations":[{"@lang":"lat","@value":"frg"}]},{"urn":"urn:cts:latinLit:phi0550.phi0003","title":[{"@lang":"lat","@value":"Capitula"}],"abbreviations":[{"@lang":"lat","@value":"Cap"}]}]}]`);
const AuthorWorkConfigConfig = {
  authors
};
class AlpheiosConcordanceAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data and creates provider
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$3);
    this.provider = new W(this.config.url, this.config.rights);
    this.authors = [];
  }
  /**
  * This method retrieves a list of available authors and textWorks.
  * For now it uploads data from json file, but later it will fetch data from cordance api
  * @param {Boolean} reload - if true - data will be forced to reload from source
  * @return {Author[]]}
  */
  async getAuthorsWorks(reload = false) {
    try {
      if (reload || this.authors.length === 0) {
        this.authorWorkData = await this.uploadConfig({}, AuthorWorkConfigConfig);
        this.authors = [];
        for (const authorWorkDataItem of Object.values(this.authorWorkData.authors)) {
          const author = this.createAuthor(authorWorkDataItem);
          this.authors.push(author);
        }
      }
      return this.authors;
    } catch (error) {
      this.addError(this.l10n.getMsg("CONCORDANCE_AUTHOR_UPLOAD_ERROR", { message: error.message }));
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
  async getWordUsageExamples(homonym, filters = {}, pagination = {}, sort = {}) {
    try {
      const url2 = this.createFetchURL(homonym, filters, pagination, sort);
      const wordUsageListRes = await this.fetch(url2);
      if (Array.isArray(wordUsageListRes)) {
        const parsedWordUsageList = await this.parseWordUsageResult(wordUsageListRes, homonym);
        return {
          wordUsageExamples: parsedWordUsageList,
          targetWord: homonym.targetWord,
          language: A.getLanguageCodeFromId(homonym.languageID),
          provider: this.provider
        };
      } else {
        return [];
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("CONCORDANCE_WORD_USAGE_FETCH_ERROR", { message: error.message }));
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
  createFetchURL(homonym, filters, pagination, sort) {
    const filterFormatted = this.formatFilter(filters);
    const paginationFormatted = this.formatPagination(pagination);
    return `${this.config.url}${encodeURIComponent(homonym.targetWord)}${filterFormatted}${paginationFormatted}`;
  }
  /**
  * This method formats filters property for fetch url.
  * @param {Object} filters - { author: {Author}, textWork: {TextWork} } - filter's property for getting data,
  *                           it could be filtered: no filter, by author, by author and textWork
  * @return {String}
  */
  formatFilter(filters) {
    if (filters && filters.author) {
      if (filters.textWork) {
        return `[${filters.author.ID}:${filters.textWork.ID}]`;
      }
      return `[${filters.author.ID}]`;
    }
    return "";
  }
  /**
  * This method formats pagination property for fetch url.
  * @param {Object} pagination - { property: 'max', value: {Integer} } - property for setting max limit for the result
  * @return {String}
  */
  formatPagination(pagination) {
    if (pagination && pagination.property && pagination.property === "authmax" && pagination.value) {
      return `?${pagination.property}=${parseInt(pagination.value)}&max=${this.config.maxResultsOverride}`;
    } else if (pagination && pagination.property && pagination.property === "max" && pagination.value) {
      return `?${pagination.property}=${parseInt(pagination.value)}`;
    }
    return "";
  }
  /**
  * This method parses json result from concordance source for word usage examples.
  * @param {Object} jsonObj - json response from url
  * @param {Homonym} homonym - homonym for retrieving word usage examples
  * @param {Author} author - author from filter
  * @param {TextWork} textWork - textWork from filter
  * @return {WordUsageExample[]}
  */
  async parseWordUsageResult(jsonObj, homonym) {
    let wordUsageExamples = [];
    let author, textWork, passage;
    if (this.authors.length === 0) {
      await this.getAuthorsWorks();
    }
    for (const jsonObjItem of jsonObj) {
      author = this.getAuthorByAbbr(jsonObjItem);
      if (author) {
        textWork = this.getTextWorkByAbbr(author, jsonObjItem);
        if (textWork) {
          passage = this.getPassage(jsonObjItem);
          let wordUsageExample = this.createWordUsageExample(jsonObjItem, homonym, author, textWork, passage);
          wordUsageExamples.push(wordUsageExample);
        }
      }
    }
    return wordUsageExamples;
  }
  getAuthorByAbbr(jsonObj) {
    if (jsonObj.cit && this.authors.length > 0) {
      const authorAbbr = jsonObj.cit.split(".")[0];
      return this.authors.find((author) => Object.values(author.abbreviations).includes(authorAbbr));
    }
    return null;
  }
  getTextWorkByAbbr(author, jsonObj) {
    if (jsonObj.cit && author && author.works.length > 0) {
      const parts = jsonObj.cit.split(".");
      if (parts.length > 2) {
        const textWorkAbbr = parts[1];
        return author.works.find((textWork) => Object.values(textWork.abbreviations).includes(textWorkAbbr));
      }
    }
    return null;
  }
  getPassage(jsonObj) {
    let passage = null;
    if (jsonObj.cit) {
      const parts = jsonObj.cit.split(".");
      if (parts.length === 2) {
        passage = parts.slice(1).join(".");
      } else if (parts.length > 2) {
        passage = parts.slice(2).join(".");
      }
    }
    return passage;
  }
  /**
  * This property is used to define prefix fr extract ID
  * @returns {String}
  */
  get defaultIDPrefix() {
    return "phi";
  }
  /**
  * Method returns Author for given jsonObj (from concordance API)
  * @param {Object} jsonObj - json object with data of the Author
  * @returns {Author}
  */
  createAuthor(jsonObj) {
    let titles = {};
    jsonObj.title.forEach((titleItem) => {
      titles[titleItem["@lang"]] = titleItem["@value"];
    });
    let abbreviations = {};
    jsonObj.abbreviations.forEach((abbrItem) => {
      abbreviations[abbrItem["@lang"]] = abbrItem["@value"].replace(".", "");
    });
    let author = new zr(jsonObj.urn, titles, abbreviations);
    author.ID = this.extractIDFromURNAuthor(author.urn);
    let works = [];
    jsonObj.works.forEach((workItem) => {
      works.push(this.createTextWork(author, workItem));
    });
    author.works = works;
    return author;
  }
  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURNAuthor(urn) {
    const partsUrn = urn.split(":");
    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      const workIDPart = partsUrn[3].indexOf(".") === -1 ? partsUrn[3] : partsUrn[3].substr(0, partsUrn[3].indexOf("."));
      return parseInt(workIDPart.replace(this.defaultIDPrefix, ""));
    }
    return null;
  }
  /**
  * Method returns TextWork for given jsonObj (from concordance API)
  * @param {Author} author - author of the textWork
  * @param {Object} jsonObj - json object with data of the TextWork
  * @returns {TextWork}
  */
  createTextWork(author, jsonObj) {
    let titles = {};
    jsonObj.title.forEach((titleItem) => {
      titles[titleItem["@lang"]] = titleItem["@value"];
    });
    let abbreviations = {};
    jsonObj.abbreviations.forEach((abbrItem) => {
      abbreviations[abbrItem["@lang"]] = abbrItem["@value"].replace(".", "");
    });
    let textWork = new qr(author, jsonObj.urn, titles, abbreviations);
    textWork.ID = this.extractIDFromURNTextWork(textWork.urn);
    return textWork;
  }
  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURNTextWork(urn) {
    const partsUrn = urn.split(":");
    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      const workIDPart = partsUrn[3].indexOf(".") === -1 ? null : partsUrn[3].substr(partsUrn[3].indexOf(".") + 1);
      return parseInt(workIDPart.replace(this.defaultIDPrefix, ""));
    }
    return null;
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
  createWordUsageExample(jsonObj, homonym, author, textWork, passage) {
    const source = this.config.sourceTextUrl + jsonObj.link;
    let wordUsageExample = new $r(
      // eslint-disable-line prefer-const
      A.getLanguageCodeFromId(homonym.languageID),
      jsonObj.target,
      jsonObj.left,
      jsonObj.right,
      source,
      jsonObj.cit
    );
    wordUsageExample.author = author;
    wordUsageExample.textWork = textWork;
    wordUsageExample.passage = passage;
    wordUsageExample.homonym = homonym;
    wordUsageExample.provider = this.provider;
    return wordUsageExample;
  }
}
class ArethusaTreebankAdapter extends BaseAdapter {
  /**
   * Treebank adapter uploads config data and fills model property
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.engineSet = null;
    this.config = this.uploadConfig(config, DefaultConfig$6);
  }
  getMessagingService(config) {
    if (!u.hasService(config.name)) {
      u.createService(config.name, new d(config));
    }
    return u.getService(config.name);
  }
  async _fetchArethusaData(targetURL, sentenceId, wordId) {
    const config = this._getMessageConfig(targetURL);
    const svc = this.getMessagingService(config);
    const requestBodyNav = {
      gotoSentence: { sentenceId }
    };
    const message = new f(requestBodyNav);
    await svc.sendRequestTo(config.name, message);
    const requestBodyMorph = {
      getMorph: {
        sentenceId,
        wordId
      }
    };
    const responseMessage = await svc.sendRequestTo(config.name, new f(requestBodyMorph));
    return responseMessage.body;
  }
  _getMessageConfig(targetURL) {
    return {
      name: targetURL,
      targetURL,
      targetIframeID: "alpheios-treebank-frame"
    };
  }
  /**
   * This method refreshes the view of the Arethusa application
   */
  async refreshView(provider) {
    const config = this._getMessageConfig(provider);
    const svc = this.getMessagingService(config);
    const requestBody = { refreshView: {} };
    let response;
    try {
      response = await svc.sendRequestTo(config.name, new f(requestBody));
    } catch (response2) {
      if (response2 instanceof l) {
        this.addRemoteError(response2.errorCode, response2.body.message);
      } else {
        this.addError(response2.message);
      }
      return;
    }
    return response.body;
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
  async getHomonym(languageID, word, provider, sentenceId, wordId) {
    try {
      if (typeof sentenceId !== "undefined" && typeof wordId !== "undefined") {
        const tbRes = await this._fetchArethusaData(provider, sentenceId, wordId);
        if (!tbRes || Object.keys(tbRes).length === 0) {
          this.addError(this.l10n.getMsg("MORPH_TREEBANK_NO_ANSWER_FOR_WORD", { word }));
          return;
        }
        const languageModel = A.getLanguageModel(languageID);
        if (!languageModel) {
          this.addError(this.l10n.getMsg("MORPH_TREEBANK_UNSUPPORTED_LANGUAGE", { languageId: languageID.toString() }));
          return;
        }
        let mapper = new ImportMorphData(languageModel, "arethusa");
        mapper.setPropertyParser(function(propertyName, propertyValue, inputElem) {
          if (propertyName === "pers") {
            propertyValue = propertyValue.replace("first person", bl.ORD_1ST);
            propertyValue = propertyValue.replace("second person", bl.ORD_2ND);
            propertyValue = propertyValue.replace("third person", bl.ORD_3RD);
          }
          return [propertyValue];
        });
        const transformAdapter = new AlpheiosLexiconTransformer(this, mapper, "arethusa");
        const homonym = transformAdapter.transformData(tbRes, word);
        if (homonym && homonym.lexemes && homonym.lexemes.length === 1 && homonym.lexemes[0].lemma.features[l$1.types.part].value === bl.POFS_VERB && homonym.lexemes[0].inflections.length === 1 && languageModel.normalizeFeatureValue(l$1.types.mood, homonym.lexemes[0].inflections[0][l$1.types.mood].value) === bl.MOOD_PARTICIPLE) {
          homonym.lexemes[0].inflections[0].addFeature(new l$1(l$1.types.part, bl.POFS_VERB_PARTICIPLE, languageModel.languageID));
        }
        return homonym;
      } else {
        this.addError(this.l10n.getMsg("MORPH_TREEBANK_MISSING_REF", { request: word }));
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("MORPH_TREEBANK_UNKNOWN_ERROR", { message: error.message }));
    }
  }
  async findWord(provider, word, prefix, suffix, sentenceId) {
    const config = this._getMessageConfig(provider);
    const svc = this.getMessagingService(config);
    const gotoSentenceBody = {
      gotoSentence: { sentenceId }
    };
    try {
      await svc.sendRequestTo(config.name, new f(gotoSentenceBody));
      const findWordBody = { findWord: { sentenceId, word, prefix, suffix } };
      const response = await svc.sendRequestTo(config.name, new f(findWordBody));
      return response.body;
    } catch (response) {
      if (response instanceof l) {
        this.addRemoteError(response.errorCode, response.body.message);
      } else {
        this.addError(response.message);
      }
    }
  }
  async gotoSentence(provider, sentenceId, wordIds = []) {
    const config = this._getMessageConfig(provider);
    const svc = this.getMessagingService(config);
    const gotoSentenceBody = {
      gotoSentence: { sentenceId, wordIds }
    };
    try {
      const response = await svc.sendRequestTo(config.name, new f(gotoSentenceBody));
      return response.body;
    } catch (response) {
      if (response instanceof l) {
        this.addRemoteError(response.errorCode, response.body.message);
      } else {
        this.addError(response.message);
      }
    }
  }
}
const url = "https://api-v2.logeion.org/search?q=";
const limit = 10;
const availableLangs = ["lat", "grc"];
const DefaultConfig$2 = {
  url,
  limit,
  availableLangs
};
class AlpheiosLogeionAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$2);
    this.limit = parseInt(this.config.limit);
    this.available = this.config.availableLangs.includes(this.config.lang);
    this.sourceData = config.sourceData;
    this.fetchOptions = config.fetchOptions;
  }
  /**
  * This method retrieves a list of words for lookup autocomplete
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of words
  */
  async getWords(text) {
    try {
      const url2 = this.createFetchURL(text);
      if (!url2) {
        this.addError(this.l10n.getMsg("LOGEION_FETCH_OPTIONS_ERROR"));
        return;
      }
      if (this.sourceData) {
        return this.sourceData;
      } else {
        const wordsVariants = await this.fetch(url2);
        if (wordsVariants.words && Array.isArray(wordsVariants.words)) {
          return this.filterAndLimitWords(wordsVariants.words);
        } else {
          return [];
        }
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("LOGEION_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
  * This method constructs full url for getting words
  * @param {String} text - text for retrieving variants
  * @return {String}
  */
  createFetchURL(text) {
    if (this.fetchOptions) {
      return `${this.fetchOptions.baseurl}?key=${this.fetchOptions.apikey}&q=${text}&lang=${this.logeionLangCode}`;
    }
  }
  get logeionLangCode() {
    if (this.config.lang === bl.STR_LANG_CODE_GRC) {
      return "greek";
    } else if ([bl.STR_LANG_CODE_LAT, bl.STR_LANG_CODE_LA].includes(this.config.lang)) {
      return "latin";
    }
  }
  /**
  * This method removes words from the other language - checks two variants - greek and the other
  * @param {[Array]} words - list of words that should be checked and filtered
  * @return {Array}
  */
  filterAndLimitWords(words) {
    const finalWords = [];
    const model = A.getLanguageModelFromCode(this.config.lang);
    const otherModels = [];
    this.config.availableLangs.forEach((lang) => {
      const modelLang = A.getLanguageModelFromCode(lang);
      if (lang !== this.config.lang && modelLang.isValidUnicode) {
        otherModels.push(modelLang);
      }
    });
    for (let i2 = 0; i2 < words.length; i2++) {
      if (model.isValidUnicode && model.isValidUnicode(words[i2]) || !model.isValidUnicode && otherModels.every((modelLang) => !modelLang.isValidUnicode(words[i2]))) {
        finalWords.push(words[i2]);
      }
      if (finalWords.length === this.limit) {
        break;
      }
    }
    return finalWords;
  }
}
const fetchOptions = { "baseUrl": "https://tools.alpheios.net/tokenizer/", "sourceType": "text" };
const DefaultConfig$1 = {
  fetchOptions
};
class AlpheiosTokenizationAdapter extends BaseAdapter {
  /**
   * Adapter uploads config data
   * @param {Object} config - properties with higher priority
  */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig$1);
    this.available = true;
    this.sourceData = config.sourceData;
    this.fetchOptions = this.config.fetchOptions;
    this.storage = this.config.storage;
  }
  /**
  * This method uploads segments data with tokens from tokenization service
  * @param {String} text - text for retrieving variants
  * @return {Array} - array of segments
  */
  async getTokens(text) {
    try {
      const requestParams = {
        method: "POST",
        headers: this.defineContentType(),
        body: text
      };
      const url2 = this.createTokenizeFetchURL();
      if (!url2) {
        this.addError(this.l10n.getMsg("TOKENIZATION_FETCH_OPTIONS_ERROR"));
        return;
      }
      if (this.sourceData) {
        return this.sourceData;
      } else {
        const segments = await this.fetch(url2, { requestParams });
        return segments;
      }
    } catch (error) {
      this.addError(this.l10n.getMsg("TOKENIZATION_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
  * This method uploads default config data from tokenization service
  * @return {Array} - array of settings
  */
  async getConfig() {
    try {
      const url2 = this.createConfigFetchURL();
      if (!url2) {
        this.addError(this.l10n.getMsg("TOKENIZATION_FETCH_OPTIONS_ERROR"));
        return;
      }
      let configData;
      if (this.sourceData) {
        configData = this.sourceData;
      } else {
        configData = await this.fetch(url2);
      }
      return this.formatSettings(configData);
    } catch (error) {
      this.addError(this.l10n.getMsg("TOKENIZATION_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
   * Converts JSON response to Options for text and tei
   * @param {Object} configData - Response from config fetch request
   */
  formatSettings(configData) {
    return {
      tei: this.convertToOptions(configData, "tei"),
      text: this.convertToOptions(configData, "text")
    };
  }
  /**
   *
   * @param {Object} configData Response from config fetch request
   * @param {String} textType - tei/text
   */
  convertToOptions(configData, textType) {
    const configDataPath = configData.paths[`/tokenize/${textType}`].post;
    const exludeParameters = ["lang", "direction"];
    const dataFormatted = {
      domain: `alpheios-remote-tokenization-${textType}`,
      version: configData.info.version,
      description: configDataPath.description,
      items: {}
    };
    configDataPath.parameters.filter((param) => param.in === "query" && !exludeParameters.includes(param.name)).forEach((param) => {
      const result = {
        defaultValue: param.schema.default,
        labelText: param.description,
        select: Boolean(param.schema.enum),
        boolean: param.schema.type === "boolean"
      };
      if (result.select) {
        result.values = param.schema.enum.map((val) => {
          return { value: val, text: val };
        });
      }
      dataFormatted.items[param.name] = result;
    });
    return new Gr(dataFormatted, new this.storage(dataFormatted.domain));
  }
  /**
  * This method constructs full url for getting tokenize data
  * @return {String}
  */
  createTokenizeFetchURL() {
    if (this.fetchOptions) {
      if (!this.fetchOptions.lang || !this.fetchOptions.sourceType) {
        return;
      }
      const exclude = ["baseUrl", "sourceType", "tokenizer"];
      let url2 = `${this.fetchOptions.baseUrl}tokenize/${this.fetchOptions.sourceType}`;
      let wasFirst = false;
      Object.keys(this.fetchOptions).forEach((option) => {
        if (exclude.indexOf(option) === -1 && this.fetchOptions[option] !== void 0) {
          let sign = "&";
          if (!wasFirst) {
            sign = "?";
            wasFirst = true;
          }
          url2 = `${url2}${sign}${option}=${this.fetchOptions[option]}`;
        }
      });
      return url2;
    }
  }
  /**
  * This method constructs full url for getting config data
  * @return {String}
  */
  createConfigFetchURL() {
    return this.fetchOptions.baseUrl;
  }
  /**
   * This method defines type of Content-Type based on the source text type
   * @returns {Object} - { 'Content-Type':  <mime type> }
   */
  defineContentType() {
    if (this.fetchOptions.sourceType === "tei") {
      return { "Content-Type": "application/xml" };
    }
    return { "Content-Type": "text/plain" };
  }
}
class DTSAPIAdapter extends BaseAdapter {
  /**
   *
   * @param {Object} config - properties for the adapter
   */
  constructor(config = {}) {
    super();
    this.config = {
      baseUrl: config.baseUrl
    };
  }
  /**
   * Retrieves collection
   * @param {String} id - @id for the collection for example urn:alpheios:latinLit, if it is null would be retrieved the root collections
   * @return {Collection}
   */
  async getCollection(id2, page) {
    try {
      const url2 = this.getCollectionUrl(id2, page);
      const collections = await this.fetch(url2);
      if (collections) {
        return this.convertToCollections(collections);
      }
      return false;
    } catch (error) {
      this.addError(this.l10n.getMsg("DTSAPI_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
   * Retrieves refs
   * @param {String} id - @id for the Resource for example urn:cts:latinLit:phi0472.phi001.alpheios-text-lat1
   * @param {Resource} resource - would be updated with retrieve data
   *
   */
  async getNavigation(id2, resource) {
    try {
      const url2 = this.getNavigationUrl(id2);
      const refs = await this.fetch(url2);
      if (refs) {
        this.convertToRefs(refs, resource);
        return resource;
      }
      return false;
    } catch (error) {
      this.addError(this.l10n.getMsg("DTSAPI_FETCH_ERROR", { message: error.message }));
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
  async getDocument(id2, refParams) {
    try {
      const url2 = this.getDocumentUrl(id2, refParams);
      if (!url2) {
        return;
      }
      const document2 = await this.fetch(url2, { type: "xml" });
      return document2;
    } catch (error) {
      this.addError(this.l10n.getMsg("DTSAPI_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting collections
   */
  getCollectionUrl(id2, page) {
    let url2 = `${this.config.baseUrl}collections`;
    if (id2) {
      url2 = `${url2}?id=${id2}`;
    }
    if (page) {
      url2 = `${url2}&page=${page}`;
    }
    return url2;
  }
  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting resources
   */
  getNavigationUrl(id2) {
    let url2 = `${this.config.baseUrl}navigation`;
    if (id2) {
      url2 = `${url2}?id=${id2}`;
    }
    return url2;
  }
  /**
   *
   * @param {String} id - @id
   * @returns {string} - url for getting document
   */
  getDocumentUrl(id2, refParams) {
    let url2 = `${this.config.baseUrl}document`;
    if (!id2) {
      const message = "getDocumentUrl - not defined id";
      this.addError(this.l10n.getMsg("DTSAPI_NO_OBLIGATORY_PROPS", { message }));
      return;
    }
    url2 = `${url2}?id=${id2}`;
    if (refParams) {
      const { ref, start, end } = refParams;
      if (ref) {
        return `${url2}&ref=${ref}`;
      }
      url2 = `${url2}&start=${start}`;
      if (end) {
        return `${url2}&end=${end}`;
      }
    }
    return url2;
  }
  /**
   * Converts JSON object to Collection with members
   * @param {Object} collectionsJSON - JSON object retrieved from the remote
   * @returns {Collection}
   */
  convertToCollections(collectionsJSON) {
    const rootCollection = new hn({
      totalItems: collectionsJSON.totalItems,
      title: collectionsJSON.title !== "None" ? collectionsJSON.title : "Alpheios",
      id: collectionsJSON["@id"] !== "default" ? collectionsJSON["@id"] : null,
      baseUrl: this.config.baseUrl,
      description: collectionsJSON.description,
      pagination: collectionsJSON.view
    });
    if (collectionsJSON.member) {
      collectionsJSON.member.forEach((collJson) => {
        rootCollection.addMember({
          totalItems: collJson.totalItems,
          title: collJson.title,
          id: collJson["@id"],
          type: collJson["@type"],
          description: collJson.description,
          baseUrl: this.config.baseUrl,
          pagination: collectionsJSON.view
        });
      });
    }
    return rootCollection;
  }
  /**
   * Converts and uploads passage's refs to collection
   * @param {Array[Object]} refs - array of passage's refs - [ { ref: '1' }, { ref: '1a' } .. ]
   * @param {Collection} collection
   */
  convertToRefs(refs, resource) {
    let finalRefs;
    if (refs["hydra:member"] && refs["hydra:member"].length > 0) {
      finalRefs = refs["hydra:member"].map((refObj) => refObj.ref);
    } else if (refs.member && refs.member.length > 0) {
      finalRefs = refs.member.map((refObj) => refObj["dts:ref"]);
    }
    if (finalRefs) {
      resource.uploadRefs({
        refs: finalRefs,
        passage: refs.passage ? refs.passage : refs["dts:passage"]
      });
    }
    return true;
  }
}
const baseurl = "https://ws.detectlanguage.com/0.2/detect";
const DefaultConfig = {
  baseurl
};
const aa = { "label": "Afar", "langCode": "aar" };
const ab = { "label": "Abkhazian", "langCode": "abk" };
const af = { "label": "Afrikaans", "langCode": "afr" };
const ak = { "label": "Akan", "langCode": "aka" };
const am = { "label": "Amharic", "langCode": "amh" };
const ar2 = { "label": "Arabic", "langCode": "ara" };
const as = { "label": "Assamese", "langCode": "asm" };
const ay = { "label": "Aymara", "langCode": "aym" };
const az = { "label": "Azerbaijani", "langCode": "aze" };
const ba = { "label": "Bashkir", "langCode": "bak" };
const be = { "label": "Belarusian", "langCode": "bel" };
const bg = { "label": "Bulgarian", "langCode": "bul" };
const bh = { "label": "Bihari", "langCode": "bih" };
const bi = { "label": "Bislama", "langCode": "bis" };
const bn = { "label": "Bengali", "langCode": "ben" };
const bo = { "label": "Tibetan", "langCode": "bod" };
const br = { "label": "Breton", "langCode": "bre" };
const bs = { "label": "Bosnian", "langCode": "bos" };
const bug = { "label": "Buginese", "langCode": "bug" };
const ca = { "label": "Catalan", "langCode": "cat" };
const ceb = { "label": "Cebuano", "langCode": "ceb" };
const chr = { "label": "Cherokee", "langCode": "chr" };
const co = { "label": "Corsican", "langCode": "cos" };
const crs = { "label": "Seselwa", "langCode": "crs" };
const cs = { "label": "Czech", "langCode": "ces" };
const cy = { "label": "Welsh", "langCode": "cym" };
const da = { "label": "Danish", "langCode": "dan" };
const de = { "label": "German", "langCode": "deu" };
const dv = { "label": "Dhivehi", "langCode": "div" };
const dz = { "label": "Dzongkha", "langCode": "dzo" };
const egy = { "label": "Egyptian", "langCode": "egy" };
const el = { "label": "Greek", "langCode": "grc" };
const en = { "label": "English", "langCode": "eng" };
const eo = { "label": "Esperanto", "langCode": "epo" };
const es = { "label": "Spanish", "langCode": "spa" };
const et = { "label": "Estonian", "langCode": "est" };
const eu = { "label": "Basque", "langCode": "eus" };
const fa = { "label": "Persian", "langCode": "per" };
const fi = { "label": "Finnish", "langCode": "fin" };
const fj = { "label": "Fijian", "langCode": "fij" };
const fo = { "label": "Faroese", "langCode": "fao" };
const fr2 = { "label": "French", "langCode": "fra" };
const fy = { "label": "Frisian", "langCode": "frr" };
const ga = { "label": "Irish", "langCode": "gle" };
const gd = { "label": "Scots Gaelic", "langCode": "gla" };
const gl = { "label": "Galician", "langCode": "glg" };
const gn = { "label": "Guarani", "langCode": "grn" };
const got = { "label": "Gothic", "langCode": "got" };
const gu = { "label": "Gujarati", "langCode": "guj" };
const gv = { "label": "Manx", "langCode": "glv" };
const ha = { "label": "Hausa", "langCode": "hau" };
const haw = { "label": "Hawaiian", "langCode": "haw" };
const hi = { "label": "Hindi", "langCode": "hin" };
const hmn = { "label": "Hmong", "langCode": "hmn" };
const hr2 = { "label": "Croatian", "langCode": "hrv" };
const ht2 = { "label": "Haitian Creole", "langCode": "hat" };
const hu = { "label": "Hungarian", "langCode": "hun" };
const hy = { "label": "Armenian", "langCode": "hye" };
const ia = { "label": "Interlingua", "langCode": "ina" };
const id = { "label": "Indonesian", "langCode": "ind" };
const ie = { "label": "Interlingue", "langCode": "ile" };
const ig = { "label": "Igbo", "langCode": "ibo" };
const ik = { "label": "Inupiaq", "langCode": "ipk" };
const is = { "label": "Icelandic", "langCode": "isl" };
const it = { "label": "Italian", "langCode": "ita" };
const iu = { "label": "Inuktitut", "langCode": "iku" };
const iw = { "label": "Hebrew", "langCode": "heb" };
const ja = { "label": "Japanese", "langCode": "jpn" };
const jw = { "label": "Javanese", "langCode": "jav" };
const ka = { "label": "Georgian", "langCode": "kat" };
const kha = { "label": "Khasi", "langCode": "kha" };
const kk = { "label": "Kazakh", "langCode": "kaz" };
const kl = { "label": "Greenlandic", "langCode": "kal" };
const km = { "label": "Khmer", "langCode": "khm" };
const kn = { "label": "Kannada", "langCode": "kan" };
const ko = { "label": "Korean", "langCode": "kor" };
const ks = { "label": "Kashmiri", "langCode": "kas" };
const ku = { "label": "Kurdish", "langCode": "kur" };
const ky = { "label": "Kyrgyz", "langCode": "kir" };
const la = { "label": "Latin", "langCode": "lat" };
const lb = { "label": "Luxembourgish", "langCode": "ltz" };
const lg = { "label": "Ganda", "langCode": "lug" };
const li = { "label": "Limbu", "langCode": "lim" };
const ln = { "label": "Lingala", "langCode": "lin" };
const lo = { "label": "Laothian", "langCode": "lao" };
const lt = { "label": "Lithuanian", "langCode": "lit" };
const lv = { "label": "Latvian", "langCode": "lav" };
const mfe = { "label": "Mauritian Creole", "langCode": "mfe" };
const mg = { "label": "Malagasy", "langCode": "mlg" };
const mi = { "label": "Maori", "langCode": "mao" };
const mk = { "label": "Macedonian", "langCode": "mac" };
const ml = { "label": "Malayalam", "langCode": "mal" };
const mn = { "label": "Mongolian", "langCode": "mon" };
const mr2 = { "label": "Marathi", "langCode": "mar" };
const ms = { "label": "Malay", "langCode": "msa" };
const mt2 = { "label": "Maltese", "langCode": "mlt" };
const my = { "label": "Burmese", "langCode": "mya" };
const na = { "label": "Nauru", "langCode": "nau" };
const ne = { "label": "Nepali", "langCode": "nep" };
const nl = { "label": "Dutch", "langCode": "nld" };
const no = { "label": "Norwegian", "langCode": "nor" };
const nr2 = { "label": "Ndebele", "langCode": "nbl" };
const nso = { "label": "Pedi", "langCode": "nso" };
const ny = { "label": "Nyanja", "langCode": "nya" };
const oc = { "label": "Occitan", "langCode": "oci" };
const om = { "label": "Oromo", "langCode": "orm" };
const or2 = { "label": "Oriya", "langCode": "ori" };
const pa = { "label": "Punjabi", "langCode": "pan" };
const pl = { "label": "Polish", "langCode": "pol" };
const ps = { "label": "Pashto", "langCode": "pus" };
const pt2 = { "label": "Portuguese", "langCode": "por" };
const qu = { "label": "Quechua", "langCode": "que" };
const rm = { "label": "Rhaeto Romance", "langCode": "roh" };
const rn = { "label": "Rundi", "langCode": "run" };
const ro = { "label": "Romanian", "langCode": "ron" };
const ru = { "label": "Russian", "langCode": "rus" };
const rw = { "label": "Kinyarwanda", "langCode": "kin" };
const sa = { "label": "Sanskrit", "langCode": "san" };
const sco = { "label": "Scots", "langCode": "sco" };
const sd = { "label": "Sindhi", "langCode": "snd" };
const sg = { "label": "Sango", "langCode": "sag" };
const si = { "label": "Sinhalese", "langCode": "sin" };
const sk = { "label": "Slovak", "langCode": "slk" };
const sl = { "label": "Slovenian", "langCode": "slv" };
const sm = { "label": "Samoan", "langCode": "smo" };
const sn = { "label": "Shona", "langCode": "sna" };
const so = { "label": "Somali", "langCode": "som" };
const sq = { "label": "Albanian", "langCode": "sqi" };
const sr2 = { "label": "Serbian", "langCode": "srp" };
const ss = { "label": "Siswant", "langCode": "ssw" };
const st = { "label": "Sesotho", "langCode": "sot" };
const su = { "label": "Sundanese", "langCode": "sun" };
const sv = { "label": "Swedish", "langCode": "swe" };
const sw = { "label": "Swahili", "langCode": "swa" };
const syr = { "label": "Syriac", "langCode": "syr" };
const ta = { "label": "Tamil", "langCode": "tam" };
const te = { "label": "Telugu", "langCode": "tel" };
const tg = { "label": "Tajik", "langCode": "tgk" };
const th = { "label": "Thai", "langCode": "tha" };
const ti = { "label": "Tigrinya", "langCode": "tir" };
const tk = { "label": "Turkmen", "langCode": "tuk" };
const tl = { "label": "Tagalog", "langCode": "tgl" };
const tlh = { "label": "Klingon", "langCode": "tlh" };
const tn = { "label": "Tswana", "langCode": "tsn" };
const to = { "label": "Tonga", "langCode": "tog" };
const tr2 = { "label": "Turkish", "langCode": "tur" };
const ts = { "label": "Tsonga", "langCode": "tso" };
const tt = { "label": "Tatar", "langCode": "tat" };
const ug = { "label": "Uighur", "langCode": "uig" };
const uk = { "label": "Ukrainian", "langCode": "ukr" };
const ur2 = { "label": "Urdu", "langCode": "urd" };
const uz = { "label": "Uzbek", "langCode": "uzb" };
const ve = { "label": "Venda", "langCode": "ven" };
const vi = { "label": "Vietnamese", "langCode": "vie" };
const vo = { "label": "Volapuk", "langCode": "vol" };
const war = { "label": "Waray Philippines", "langCode": "war" };
const wo = { "label": "Wolof", "langCode": "wol" };
const xh = { "label": "Xhosa", "langCode": "xho" };
const yi = { "label": "Yiddish", "langCode": "yid" };
const yo = { "label": "Yoruba", "langCode": "yor" };
const za = { "label": "Zhuang", "langCode": "zha" };
const zh = { "label": "Chinese Simplified", "langCode": "zho" };
const zu = { "label": "Zulu", "langCode": "zul" };
const LangsList = {
  aa,
  ab,
  af,
  ak,
  am,
  ar: ar2,
  as,
  ay,
  az,
  ba,
  be,
  bg,
  bh,
  bi,
  bn,
  bo,
  br,
  bs,
  bug,
  ca,
  ceb,
  chr,
  co,
  crs,
  cs,
  cy,
  da,
  de,
  dv,
  dz,
  egy,
  el,
  en,
  eo,
  es,
  et,
  eu,
  fa,
  fi,
  fj,
  fo,
  fr: fr2,
  fy,
  ga,
  gd,
  gl,
  gn,
  got,
  gu,
  gv,
  ha,
  haw,
  hi,
  hmn,
  hr: hr2,
  ht: ht2,
  hu,
  hy,
  ia,
  id,
  ie,
  ig,
  ik,
  is,
  it,
  iu,
  iw,
  ja,
  jw,
  ka,
  kha,
  kk,
  kl,
  km,
  kn,
  ko,
  ks,
  ku,
  ky,
  la,
  lb,
  lg,
  li,
  ln,
  lo,
  lt,
  lv,
  mfe,
  mg,
  mi,
  mk,
  ml,
  mn,
  mr: mr2,
  ms,
  mt: mt2,
  my,
  na,
  ne,
  nl,
  no,
  nr: nr2,
  nso,
  ny,
  oc,
  om,
  or: or2,
  pa,
  pl,
  ps,
  pt: pt2,
  qu,
  rm,
  rn,
  ro,
  ru,
  rw,
  sa,
  sco,
  sd,
  sg,
  si,
  sk,
  sl,
  sm,
  sn,
  so,
  sq,
  sr: sr2,
  ss,
  st,
  su,
  sv,
  sw,
  syr,
  ta,
  te,
  tg,
  th,
  ti,
  tk,
  tl,
  tlh,
  tn,
  to,
  tr: tr2,
  ts,
  tt,
  ug,
  uk,
  ur: ur2,
  uz,
  ve,
  vi,
  vo,
  war,
  wo,
  xh,
  yi,
  yo,
  za,
  zh,
  "zh-Hant": { "label": "Chinese Traditional", "langCode": "zho" },
  zu
};
class DetectLangAdapter extends BaseAdapter {
  /**
   *
   * @param {Object} config - properties for the adapter
   */
  constructor(config = {}) {
    super();
    this.config = this.uploadConfig(config, DefaultConfig);
    this.sourceData = config.sourceData;
  }
  /**
   *
   * @param {String} text - text for analysis
   * @returns {String} - langCode ISO 639-3 - a detected language
   */
  async getDetectedLangsList(text) {
    try {
      const requestParams = {
        method: "POST",
        headers: { Authorization: `Bearer ${this.config.api}` }
      };
      const url2 = this.getUrl(text);
      if (!url2) {
        this.addError(this.l10n.getMsg("DETECT_LANG_URL_ERROR"));
        return;
      }
      let langsData;
      if (this.sourceData) {
        langsData = this.sourceData;
      } else {
        langsData = await this.fetch(url2, { requestParams });
      }
      return this.chooseOneLanguage(langsData);
    } catch (error) {
      this.addError(this.l10n.getMsg("DETECT_LANG_FETCH_ERROR", { message: error.message }));
    }
  }
  /**
   *
   * @param {String} text - text for analysis
   * @returns {String} - constructed URL
   */
  getUrl(text) {
    if (text) {
      return `${this.config.baseurl}?q=${encodeURIComponent(text)}`;
    }
    return null;
  }
  /**
   * The remote service returns the following format
   * { data: {
        detections: [
          { language: 'en', isReliable: true, confidence: 3.36 },
          { language: 'pt', isReliable: false, confidence: 3.36 },
          { language: 'eu', isReliable: false, confidence: 3.36 }
        ]
      }}
   * We need return only one the most reliable languageCode in ISO 639-3 format
   * @param {Object} langsData
   * @returns {String|null} lang code in ISO 639-3
   */
  chooseOneLanguage(langsData) {
    if (langsData && langsData.data && langsData.data.detections && langsData.data.detections.length > 0) {
      let finalLangs = langsData.data.detections.filter((langItem) => langItem.isReliable);
      if (finalLangs.length === 0) {
        finalLangs = langsData.data.detections;
      }
      if (finalLangs && finalLangs.length > 0) {
        const lang = finalLangs.sort((a, b2) => a.confidence - b2.confidence).reverse()[0].language;
        return LangsList[lang] ? LangsList[lang].langCode : lang;
      }
    }
    return null;
  }
}
class WrongMethodError extends Error {
  constructor(category, adapterName, methodName) {
    const message = `Wrong method for ${category}.${adapterName} - ${methodName}`;
    super(message);
    this.adapter = `${category}.${adapterName}`;
    this.method = methodName;
    Error.captureStackTrace(this, WrongMethodError);
  }
}
class NoRequiredParamError extends Error {
  constructor(category, adapterName, methodName, paramName) {
    const message = `There is no required parameter - ${paramName} for ${category}.${adapterName} - ${methodName}`;
    super(message);
    this.adapter = `${category}.${adapterName}`;
    this.methodName = methodName;
    this.paramName = paramName;
    Error.captureStackTrace(this, NoRequiredParamError);
  }
}
const morphology = { "alpheiosTreebank": { "adapter": "tbAdapter", "methods": ["getHomonym"], "params": { "getHomonym": ["languageID", "wordref"] } }, "arethusaTreebank": { "adapter": "arethusaAdapter", "methods": ["getHomonym", "refreshView", "gotoSentence", "findWord"], "params": { "getHomonym": ["languageID", "word", "provider", "sentenceId", "wordId"], "refreshView": ["provider"], "gotoSentence": ["provider", "sentenceId", "wordIds"], "findWord": ["provider", "word", "prefix", "suffix", "sentenceId"] } }, "tufts": { "adapter": "maAdapter", "methods": ["getHomonym"], "params": { "getHomonym": ["languageID", "word"] } }, "chineseloc": { "adapter": "chineseAdapter", "methods": ["getHomonym", "loadData"], "params": { "getHomonym": ["languageID", "word"], "loadData": ["timeout"] } } };
const lexicon = { "alpheios": { "adapter": "lexicons", "methods": ["fetchShortDefs", "fetchFullDefs", "checkCachedData", "getConfig"], "params": { "fetchShortDefs": ["homonym", "opts"], "fetchFullDefs": ["homonym", "opts"], "checkCachedData": ["url", "externalData"], "getConfig": [] } } };
const lemmatranslation = { "alpheios": { "adapter": "lemmaTranslations", "methods": "fetchTranslations", "params": { "fetchTranslations": ["homonym", "browserLang"] } } };
const wordusageExamples = { "concordance": { "adapter": "wordUsageExamples", "methods": ["getAuthorsWorks", "getWordUsageExamples"], "params": { "getAuthorsWorks": [], "getWordUsageExamples": ["homonym"] } } };
const autocompleteWords = { "logeion": { "adapter": "autoCompleteWords", "methods": "getWords", "params": { "getWords": ["text", "lang", "fetchOptions"] } } };
const tokenizationGroup = { "alpheios": { "adapter": "tokenizationMethod", "methods": ["getTokens", "getConfig"], "params": { "getTokens": ["text"], "getConfig": ["storage"] } } };
const dtsapiGroup = { "dtsapi": { "adapter": "dtsApiMethod", "methods": ["getCollection", "getNavigation", "getDocument"], "params": { "getCollection": ["baseUrl"], "getNavigation": ["baseUrl", "id", "resource"], "getDocument": ["baseUrl", "id"] } } };
const detectlangGroup = { "detectlang": { "adapter": "detectLangMethod", "methods": ["getDetectedLangsList"], "params": { "getDetectedLangsList": ["text"] } } };
const AdaptersConfig = {
  morphology,
  lexicon,
  lemmatranslation,
  wordusageExamples,
  autocompleteWords,
  tokenizationGroup,
  dtsapiGroup,
  detectlangGroup
};
let cachedConfig = /* @__PURE__ */ new Map();
let cachedAdaptersList = /* @__PURE__ */ new Map();
class ClientAdapters {
  /**
   * it is used for uploading data from AdaptersConfig to cachedConfig and CachedAdaptersList
  */
  static init() {
    if (cachedConfig.size === 0) {
      for (const category in AdaptersConfig) {
        let adapters2 = {};
        for (const adapterKey in AdaptersConfig[category]) {
          const adapterData = AdaptersConfig[category][adapterKey];
          adapters2[adapterKey] = {
            adapter: ClientAdapters[adapterData.adapter],
            methods: adapterData.methods,
            params: adapterData.params
          };
        }
        cachedConfig.set(category, adapters2);
      }
      for (const key of cachedConfig.keys()) {
        const res = {};
        Object.keys(cachedConfig.get(key)).forEach((typeAdapter) => {
          res[typeAdapter] = cachedConfig.get(key)[typeAdapter].adapter;
        });
        cachedAdaptersList.set(key, res);
      }
    }
  }
  /**
  *  Additional abstraction layer for structuring adapters
  *  it is used for retrieving data from morphology category
  */
  static get morphology() {
    ClientAdapters.init();
    return cachedAdaptersList.get("morphology");
  }
  /**
  * it is used for retrieving data from lexicon category
  */
  static get lexicon() {
    ClientAdapters.init();
    return cachedAdaptersList.get("lexicon");
  }
  /**
  * it is used for retrieving data from lemmatranslation category
  */
  static get lemmatranslation() {
    ClientAdapters.init();
    return cachedAdaptersList.get("lemmatranslation");
  }
  static get wordusageExamples() {
    ClientAdapters.init();
    return cachedAdaptersList.get("wordusageExamples");
  }
  static get autocompleteWords() {
    ClientAdapters.init();
    return cachedAdaptersList.get("autocompleteWords");
  }
  static get tokenizationGroup() {
    ClientAdapters.init();
    return cachedAdaptersList.get("tokenizationGroup");
  }
  static get dtsapiGroup() {
    ClientAdapters.init();
    return cachedAdaptersList.get("dtsapiGroup");
  }
  static get detectlangGroup() {
    ClientAdapters.init();
    return cachedAdaptersList.get("detectlangGroup");
  }
  /**
  * This method checks if given method is registered in config for category.adapterName
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethod(category, adapterName, methodName) {
    if (!cachedConfig.get(category)[adapterName].methods.includes(methodName)) {
      throw new WrongMethodError(category, adapterName, methodName);
    }
  }
  /**
  * This method checks if given array with parameteres doesn't have required parameters, registered in config file
  * @param {[String]} params - array of parameter's names for being checked
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {String} methodName - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkParam(params, category, adapterName, methodName) {
    if (cachedConfig.get(category)[adapterName].params) {
      cachedConfig.get(category)[adapterName].params[methodName].forEach((paramName) => {
        if (params && typeof params[paramName] === "undefined") {
          throw new NoRequiredParamError(category, adapterName, methodName, paramName);
        }
      });
    }
  }
  /*
  * This method executes both checks for given options - checks method and given parameters from options
  * @param {String} category - category name - morphology, lemmatranslation, lexicon
  * @param {String} adapterName - adapter name - tufts, treebankAdapter, alpheios
  * @param {Object} options - method name - method name that should be checked, for example getHomonym, fetchTranslations and etc.
  */
  static checkMethodParam(category, adapterName, options) {
    ClientAdapters.checkMethod(category, adapterName, options.method);
    ClientAdapters.checkParam(options.params, category, adapterName, options.method);
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
  static async maAdapter(options) {
    ClientAdapters.checkMethodParam("morphology", "tufts", options);
    const localMaAdapter = new AlpheiosTuftsAdapter({
      category: "morphology",
      adapterName: "tufts",
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    });
    if (options.method === "getHomonym") {
      const homonym = await localMaAdapter.getHomonym(options.params.languageID, options.params.word);
      return { result: homonym, errors: localMaAdapter.errors };
    }
    return null;
  }
  static async chineseAdapter(options) {
    ClientAdapters.checkMethodParam("morphology", "chineseloc", options);
    const localChineseAdapter = new AlpheiosChineseLocAdapter({
      category: "morphology",
      adapterName: "chineseloc",
      method: options.method,
      // A URL of a CEDICT service
      serviceUrl: options.serviceUrl
    });
    if (options.method === "getHomonym") {
      const homonym = await localChineseAdapter.getHomonym(options.params.word, options.params.checkContextForward);
      return { result: homonym, errors: localChineseAdapter.errors };
    }
    if (options.method === "loadData") {
      const result = await localChineseAdapter.loadData(options.params.timeout);
      return { result, errors: localChineseAdapter.errors };
    }
    return null;
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
  static async tbAdapter(options) {
    ClientAdapters.checkMethodParam("morphology", "alpheiosTreebank", options);
    const localTbAdapter = new AlpheiosTreebankAdapter({
      category: "morphology",
      adapterName: "alpheiosTreebank",
      method: options.method,
      clientId: options.clientId
    });
    if (options.method === "getHomonym") {
      const homonym = await localTbAdapter.getHomonym(options.params.languageID, options.params.wordref);
      return { result: homonym, errors: localTbAdapter.errors };
    }
    return null;
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
  static async arethusaAdapter(options) {
    ClientAdapters.checkMethodParam("morphology", "arethusaTreebank", options);
    const localAdapter = new ArethusaTreebankAdapter({
      category: "morphology",
      adapterName: "arethusaTreebank",
      method: options.method,
      clientId: options.clientId
    });
    if (options.method === "getHomonym") {
      const homonym = await localAdapter.getHomonym(
        options.params.languageID,
        options.params.word,
        options.params.provider,
        options.params.sentenceId,
        options.params.wordId
      );
      return { result: homonym, errors: localAdapter.errors };
    }
    if (options.method === "refreshView") {
      const resp = await localAdapter.refreshView(options.params.provider);
      return { result: resp, errors: localAdapter.errors };
    }
    if (options.method === "gotoSentence") {
      const resp = await localAdapter.gotoSentence(
        options.params.provider,
        options.params.sentenceId,
        options.params.wordIds
      );
      return { result: resp, errors: localAdapter.errors };
    }
    if (options.method === "findWord") {
      const resp = await localAdapter.findWord(
        options.params.provider,
        options.params.word,
        options.params.prefix,
        options.params.suffix,
        options.params.sentenceId
      );
      return { result: resp, errors: localAdapter.errors };
    }
    return null;
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
  static async lemmaTranslations(options) {
    ClientAdapters.checkMethodParam("lemmatranslation", "alpheios", options);
    const localLemmasAdapter = new AlpheiosLemmaTranslationsAdapter({
      category: "lemmatranslation",
      adapterName: "alpheios",
      method: options.method,
      clientId: options.clientId,
      sourceData: options.sourceData
    });
    if (options.method === "fetchTranslations") {
      await localLemmasAdapter.getTranslationsList(options.params.homonym, options.params.browserLang);
      return { errors: localLemmasAdapter.errors };
    }
    return null;
  }
  static async wordUsageExamples(options) {
    ClientAdapters.checkMethodParam("wordusageExamples", "concordance", options);
    const localLemmasAdapter = new AlpheiosConcordanceAdapter({
      category: "wordUsage",
      adapterName: "concordance",
      method: options.method,
      clientId: options.clientId
    });
    if (options.method === "getAuthorsWorks") {
      const res = await localLemmasAdapter.getAuthorsWorks();
      return { result: res, errors: localLemmasAdapter.errors };
    }
    if (options.method === "getWordUsageExamples") {
      const res = await localLemmasAdapter.getWordUsageExamples(options.params.homonym, options.params.filters, options.params.pagination, options.params.sort);
      return { result: res, errors: localLemmasAdapter.errors };
    }
    return null;
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
  static async lexicons(options) {
    ClientAdapters.checkMethodParam("lexicon", "alpheios", options);
    const adapterParams = {
      category: "lexicon",
      adapterName: "alpheios",
      method: options.method,
      clientId: options.clientId,
      timeout: options.params && options.params.timeout ? options.params.timeout : 3e3,
      callBackEvtSuccess: options.params ? options.params.callBackEvtSuccess : null,
      callBackEvtFailed: options.params ? options.params.callBackEvtFailed : null
    };
    const localLexiconsAdapter = new AlpheiosLexiconsAdapter(adapterParams, options.config);
    if (options.method === "fetchShortDefs") {
      await localLexiconsAdapter.fetchShortDefs(options.params.homonym, options.params.opts);
      return { errors: localLexiconsAdapter.errors };
    }
    if (options.method === "fetchFullDefs") {
      await localLexiconsAdapter.fetchFullDefs(options.params.homonym, options.params.opts);
      return { errors: localLexiconsAdapter.errors };
    }
    if (options.method === "checkCachedData") {
      await localLexiconsAdapter.checkCachedData(options.params.url, options.params.externalData, options.params.skipFetch);
      return { errors: localLexiconsAdapter.errors };
    }
    if (options.method === "getConfig") {
      return localLexiconsAdapter.config.lexicons;
    }
    return null;
  }
  static async autoCompleteWords(options) {
    ClientAdapters.checkMethodParam("autocompleteWords", "logeion", options);
    const localLogeionAdapter = new AlpheiosLogeionAdapter({
      category: "autocompleteWords",
      adapterName: "logeion",
      method: options.method,
      clientId: options.clientId,
      limit: options.params.limit,
      lang: options.params.lang,
      sourceData: options.params.sourceData,
      fetchOptions: options.params.fetchOptions
    });
    if (localLogeionAdapter.available && options.method === "getWords") {
      const res = await localLogeionAdapter.getWords(options.params.text);
      return { result: res, errors: localLogeionAdapter.errors };
    }
    return null;
  }
  /**
   * It is used for getting segments and tokens from Alpheios Tokenization Service
   * @param {Object} options
   */
  static async tokenizationMethod(options) {
    ClientAdapters.checkMethodParam("tokenizationGroup", "alpheios", options);
    const localTokenizationAdapter = new AlpheiosTokenizationAdapter({
      category: "tokenizationGroup",
      adapterName: "alpheios",
      method: options.method,
      clientId: options.clientId,
      fetchOptions: options.params.fetchOptions,
      storage: options.params.storage,
      sourceData: options.params.sourceData
    });
    if (!localTokenizationAdapter.available) {
      localTokenizationAdapter.addError(localTokenizationAdapter.l10n.getMsg("TOKENIZATION_AVAILABILITY_ERROR"));
      return {
        errors: localTokenizationAdapter.errors
      };
    }
    if (options.method === "getTokens") {
      const res = await localTokenizationAdapter.getTokens(options.params.text);
      return { result: res, errors: localTokenizationAdapter.errors };
    }
    if (options.method === "getConfig") {
      const res = await localTokenizationAdapter.getConfig();
      return { result: res, errors: localTokenizationAdapter.errors };
    }
    return null;
  }
  /**
   * It is used for getting TEI texts from DTS API
   * @param {Object} options
   */
  static async dtsApiMethod(options) {
    ClientAdapters.checkMethodParam("dtsapiGroup", "dtsapi", options);
    const localDTSAPIAdapter = new DTSAPIAdapter({
      category: "dtsapiGroup",
      adapterName: "dtsapi",
      method: options.method,
      clientId: options.clientId,
      baseUrl: options.params.baseUrl
    });
    if (options.method === "getCollection") {
      const res = await localDTSAPIAdapter.getCollection(options.params.id, options.params.page);
      return { result: res, errors: localDTSAPIAdapter.errors };
    }
    if (options.method === "getNavigation") {
      const res = await localDTSAPIAdapter.getNavigation(options.params.id, options.params.resource);
      return { result: res, errors: localDTSAPIAdapter.errors };
    }
    if (options.method === "getDocument") {
      const res = await localDTSAPIAdapter.getDocument(options.params.id, options.params.refParams);
      return { result: res, errors: localDTSAPIAdapter.errors };
    }
  }
  /**
   * It is used for detecting language by text
   * @param {Object} options
   */
  static async detectLangMethod(options) {
    ClientAdapters.checkMethodParam("detectlangGroup", "detectlang", options);
    const localDetectLangAdapter = new DetectLangAdapter({
      category: "detectlangGroup",
      adapterName: "detectlang",
      method: options.method,
      clientId: options.clientId,
      sourceData: options.params.sourceData,
      api: options.params.api
    });
    if (options.method === "getDetectedLangsList") {
      const res = await localDetectLangAdapter.getDetectedLangsList(options.params.text);
      return { result: res, errors: localDetectLangAdapter.errors };
    }
  }
}
export {
  AdapterError,
  ClientAdapters,
  RemoteError
};
