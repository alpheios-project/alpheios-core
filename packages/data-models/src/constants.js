/* eslint-disable no-unused-vars */
export const LANG_UNIT_WORD = Symbol('word')
export const LANG_UNIT_CHAR = Symbol('char')
export const LANG_DIR_LTR = Symbol('ltr')
export const LANG_DIR_RTL = Symbol('rtl')
export const LANG_UNDEFINED = Symbol('undefined')
export const LANG_LATIN = Symbol('latin')
export const LANG_GREEK = Symbol('greek')
export const LANG_ARABIC = Symbol('arabic')
export const LANG_PERSIAN = Symbol('persian')
export const LANG_GEEZ = Symbol('ge\'ez')
export const LANG_CHINESE = Symbol('chinese')
export const LANG_SYRIAC = Symbol('syriac')

export const STR_LANG_CODE_UNDEFINED = 'undefined'
export const STR_LANG_CODE_LAT = 'lat'
export const STR_LANG_CODE_LA = 'la'
export const STR_LANG_CODE_GRC = 'grc'
export const STR_LANG_CODE_ARA = 'ara'
export const STR_LANG_CODE_AR = 'ar'
export const STR_LANG_CODE_FAS = 'fas'
export const STR_LANG_CODE_PER = 'per'
export const STR_LANG_CODE_FA_IR = 'fa-IR'
export const STR_LANG_CODE_FA = 'fa'
export const STR_LANG_CODE_GEZ = 'gez'
export const STR_LANG_CODE_ZHO = 'zho'
export const STR_LANG_CODE_ZH = 'zh'
export const STR_LANG_CODE_ZH_HANT = 'zh-Hant' // Traditional Chinese
export const STR_LANG_CODE_ZH_HANS = 'zh-Hans' // Simplified Chinese
export const STR_LANG_CODE_SYC = 'syc'
export const STR_LANG_CODE_SYR = 'syr'
export const STR_LANG_CODE_SYR_SYRJ = 'syr-Syrj'
export const STR_LANG_CODE_ENG = 'eng'

// parts of speech
export const POFS_ADJECTIVE = 'adjective'
export const POFS_ADVERB = 'adverb'
export const POFS_ADVERBIAL = 'adverbial'
export const POFS_ARTICLE = 'article'
export const POFS_CONJUNCTION = 'conjunction'
export const POFS_EXCLAMATION = 'exclamation'
export const POFS_INTERJECTION = 'interjection'
export const POFS_NOUN = 'noun'
export const POFS_NOUN_PROPER = 'proper noun'
export const POFS_NUMERAL = 'numeral'
export const POFS_PARTICLE = 'particle'
export const POFS_PREFIX = 'prefix'
export const POFS_PREPOSITION = 'preposition'
export const POFS_PRONOUN = 'pronoun'
export const POFS_SUFFIX = 'suffix'
export const POFS_GERUNDIVE = 'gerundive'
export const POFS_SUPINE = 'supine'
export const POFS_VERB = 'verb'
export const POFS_VERB_PARTICIPLE = 'verb participle'
export const POFS_DENOMINATIVE = 'denominative'
// gender
export const GEND_MASCULINE = 'masculine'
export const GEND_FEMININE = 'feminine'
export const GEND_NEUTER = 'neuter'
export const GEND_COMMON = 'common'
export const GEND_ANIMATE = 'animate'
export const GEND_INANIMATE = 'inanimate'
// Polish gender types
export const GEND_PERSONAL_MASCULINE = 'personal masculine'
export const GEND_ANIMATE_MASCULINE = 'animate masculine'
export const GEND_INANIMATE_MASCULINE = 'inanimate masculine'
// comparative
export const COMP_POSITIVE = 'positive'
export const COMP_COMPARITIVE = 'comparative'
export const COMP_SUPERLATIVE = 'superlative'
// case
export const CASE_ABESSIVE = 'abessive'
export const CASE_ABLATIVE = 'ablative'
export const CASE_ABSOLUTIVE = 'absolutive'
export const CASE_ACCUSATIVE = 'accusative'
export const CASE_ADDIRECTIVE = 'addirective'
export const CASE_ADELATIVE = 'adelative'
export const CASE_ADESSIVE = 'adessive'
export const CASE_ADVERBIAL = 'adverbial'
export const CASE_ALLATIVE = 'allative'
export const CASE_ANTESSIVE = 'antessive'
export const CASE_APUDESSIVE = 'apudessive'
export const CASE_AVERSIVE = 'aversive'
export const CASE_BENEFACTIVE = 'benefactive'
export const CASE_CARITIVE = 'caritive'
export const CASE_CAUSAL = 'causal'
export const CASE_CAUSAL_FINAL = 'causal-final'
export const CASE_COMITATIVE = 'comitative'
export const CASE_DATIVE = 'dative'
export const CASE_DELATIVE = 'delative'
export const CASE_DIRECT = 'direct'
export const CASE_DISTRIBUTIVE = 'distributive'
export const CASE_DISTRIBUTIVE_TEMPORAL = 'distributive-temporal'
export const CASE_ELATIVE = 'elative'
export const CASE_ERGATIVE = 'ergative'
export const CASE_ESSIVE = 'essive'
export const CASE_ESSIVE_FORMAL = 'essive-formal'
export const CASE_ESSIVE_MODAL = 'essive-modal'
export const CASE_EQUATIVE = 'equative'
export const CASE_EVITATIVE = 'evitative'
export const CASE_EXESSIVE = 'exessive'
export const CASE_FINAL = 'final'
export const CASE_FORMAL = 'formal'
export const CASE_GENITIVE = 'genitive'
export const CASE_ILLATIVE = 'illative'
export const CASE_INELATIVE = 'inelative'
export const CASE_INESSIVE = 'inessive'
export const CASE_INSTRUCTIVE = 'instructive'
export const CASE_INSTRUMENTAL = 'instrumental'
export const CASE_INSTRUMENTAL_COMITATIVE = 'instrumental-comitative'
export const CASE_INTRANSITIVE = 'intransitive'
export const CASE_LATIVE = 'lative'
export const CASE_LOCATIVE = 'locative'
export const CASE_MODAL = 'modal'
export const CASE_MULTIPLICATIVE = 'multiplicative'
export const CASE_NOMINATIVE = 'nominative'
export const CASE_PARTITIVE = 'partitive'
export const CASE_PEGATIVE = 'pegative'
export const CASE_PERLATIVE = 'perlative'
export const CASE_POSSESSIVE = 'possessive'
export const CASE_POSTELATIVE = 'postelative'
export const CASE_POSTDIRECTIVE = 'postdirective'
export const CASE_POSTESSIVE = 'postessive'
export const CASE_POSTPOSITIONAL = 'postpositional'
export const CASE_PREPOSITIONAL = 'prepositional'
export const CASE_PRIVATIVE = 'privative'
export const CASE_PROLATIVE = 'prolative'
export const CASE_PROSECUTIVE = 'prosecutive'
export const CASE_PROXIMATIVE = 'proximative'
export const CASE_SEPARATIVE = 'separative'
export const CASE_SOCIATIVE = 'sociative'
export const CASE_SUBDIRECTIVE = 'subdirective'
export const CASE_SUBESSIVE = 'subessive'
export const CASE_SUBELATIVE = 'subelative'
export const CASE_SUBLATIVE = 'sublative'
export const CASE_SUPERDIRECTIVE = 'superdirective'
export const CASE_SUPERESSIVE = 'superessive'
export const CASE_SUPERLATIVE = 'superlative'
export const CASE_SUPPRESSIVE = 'suppressive'
export const CASE_TEMPORAL = 'temporal'
export const CASE_TERMINATIVE = 'terminative'
export const CASE_TRANSLATIVE = 'translative'
export const CASE_VIALIS = 'vialis'
export const CASE_VOCATIVE = 'vocative'
export const MOOD_ADMIRATIVE = 'admirative'
export const MOOD_COHORTATIVE = 'cohortative'
export const MOOD_CONDITIONAL = 'conditional'
export const MOOD_DECLARATIVE = 'declarative'
export const MOOD_DUBITATIVE = 'dubitative'
export const MOOD_ENERGETIC = 'energetic'
export const MOOD_EVENTIVE = 'eventive'
export const MOOD_GENERIC = 'generic'
export const MOOD_GERUNDIVE = 'gerundive'
export const MOOD_HYPOTHETICAL = 'hypothetical'
export const MOOD_IMPERATIVE = 'imperative'
export const MOOD_INDICATIVE = 'indicative'
export const MOOD_INFERENTIAL = 'inferential'
export const MOOD_INFINITIVE = 'infinitive'
export const MOOD_INTERROGATIVE = 'interrogative'
export const MOOD_JUSSIVE = 'jussive'
export const MOOD_NEGATIVE = 'negative'
export const MOOD_OPTATIVE = 'optative'
export const MOOD_PARTICIPLE = 'participle'
export const MOOD_PRESUMPTIVE = 'presumptive'
export const MOOD_RENARRATIVE = 'renarrative'
export const MOOD_SUBJUNCTIVE = 'subjunctive'
export const MOOD_SUPINE = 'supine'
export const NUM_SINGULAR = 'singular'
export const NUM_PLURAL = 'plural'
export const NUM_DUAL = 'dual'
export const NUM_TRIAL = 'trial'
export const NUM_PAUCAL = 'paucal'
export const NUM_SINGULATIVE = 'singulative'
export const NUM_COLLECTIVE = 'collective'
export const NUM_DISTRIBUTIVE_PLURAL = 'distributive plural'
export const NRL_CARDINAL = 'cardinal'
export const NRL_ORDINAL = 'ordinal'
export const NRL_DISTRIBUTIVE = 'distributive'
export const NURL_NUMERAL_ADVERB = 'numeral adverb'
export const ORD_1ST = '1st'
export const ORD_2ND = '2nd'
export const ORD_3RD = '3rd'
export const ORD_4TH = '4th'
export const ORD_5TH = '5th'
export const ORD_6TH = '6th'
export const ORD_7TH = '7th'
export const ORD_8TH = '8th'
export const ORD_9TH = '9th'
export const TENSE_AORIST = 'aorist'
export const TENSE_FUTURE = 'future'
export const TENSE_FUTURE_PERFECT = 'future perfect'
export const TENSE_IMPERFECT = 'imperfect'
export const TENSE_PAST_ABSOLUTE = 'past absolute'
export const TENSE_PERFECT = 'perfect'
export const TENSE_PLUPERFECT = 'pluperfect'
export const TENSE_PRESENT = 'present'
export const VKIND_TO_BE = 'to be'
export const VKIND_COMPOUNDS_OF_TO_BE = 'compounds of to be'
export const VKIND_TAKING_ABLATIVE = 'taking ablative'
export const VKIND_TAKING_DATIVE = 'taking dative'
export const VKIND_TAKING_GENITIVE = 'taking genitive'
export const VKIND_TRANSITIVE = 'transitive'
export const VKIND_INTRANSITIVE = 'intransitive'
export const VKIND_IMPERSONAL = 'impersonal'
export const VKIND_DEPONENT = 'deponent'
export const VKIND_SEMIDEPONENT = 'semideponent'
export const VKIND_PERFECT_DEFINITE = 'perfect definite'
export const VOICE_ACTIVE = 'active'
export const VOICE_PASSIVE = 'passive'
export const VOICE_MEDIOPASSIVE = 'mediopassive'
export const VOICE_IMPERSONAL_PASSIVE = 'impersonal passive'
export const VOICE_MIDDLE = 'middle'
export const VOICE_ANTIPASSIVE = 'antipassive'
export const VOICE_REFLEXIVE = 'reflexive'
export const VOICE_RECIPROCAL = 'reciprocal'
export const VOICE_CAUSATIVE = 'causative'
export const VOICE_ADJUTATIVE = 'adjutative'
export const VOICE_APPLICATIVE = 'applicative'
export const VOICE_CIRCUMSTANTIAL = 'circumstantial'
export const VOICE_DEPONENT = 'deponent'
export const TYPE_IRREGULAR = 'irregular'
export const TYPE_REGULAR = 'regular'
// Classes
export const CLASS_PERSONAL = 'personal'
export const CLASS_REFLEXIVE = 'reflexive'
export const CLASS_POSSESSIVE = 'possessive'
export const CLASS_DEMONSTRATIVE = 'demonstrative'
export const CLASS_RELATIVE = 'relative'
export const CLASS_INTERROGATIVE = 'interrogative'
export const CLASS_GENERAL_RELATIVE = 'general relative'
export const CLASS_INDEFINITE = 'indefinite'
export const CLASS_INTENSIVE = 'intensive'
export const CLASS_RECIPROCAL = 'reciprocal'
// Paradigms
export const PARADIGM_CAT_KAYLO = 'kaylo'
export const PARADIGM_CAT_STATE = 'state'

/**
 * Constants that define MIME Types used in Alpheios.
 *
 * @enum {string} */
export const MIMETypes = {
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html'
}
