import LanguageModelFactory from './language_model_factory.js';
import LanguageModel from './language_model.js';
class SourceSelection {

  constructor(target,default_language) {
    this.target = target;
    let target_lang;
    try {
      target_lang = this.getAttribute("lang") || this.getAttribute("xml:lang");
    } catch(e) {
      // if we don't have an element
      console.log("getAttribute not accessible on target");
    }
    if (! target_lang) {
      let closest_lang_element =target.closest("[lang]") || this.target.closest("[xml\\:lang]");
      if (closest_lang_element) {
        target_lang = closest_lang_element.getAttribute("lang") || closest_lang_element.getAttribute("xml:lang");
      }
    }
    if (! target_lang) {
      target_lang = default_language;
    }
    this.language = LanguageModelFactory.getLanguageForCode(target_lang);
    this.initialize({word:null,normalized_word:null,start:0,end:0,context:null,position:0});
  }

  initialize(word_obj) {
    this.in_margin = this.selectionInMargin();
    if (this.in_margin) {
      this.word_selection = word_obj;
      return;
    }
    try {
      this.original_selection = this.target.ownerDocument.getSelection();
    } catch(e) {
      this.original_selection = null;
      console.log("No selection found in target owner document")
      return;
    }
    let separator = this.language.base_unit;
    switch(separator) {
      case LanguageModel.UNIT_WORD:
          word_obj = this.doSpaceSeparatedWordSelection();
          break;
      case LanguageModel.UNIT_CHAR:
          word_obj = this.doCharacterBasedWordSelection();
          break;
      default:
          throw new Error(`unknown base_unit ${separator.toString()}`)
    }
    this.word_selection = word_obj;
  }

  reset() {
    if (this.word_selection.word) {
      this.word_selection.reset();
    }
  }

  /**
   * Helper function to determine if the user's selection
   * is in the margin of the document
   * @private
   * @returns true if in the margin, false if not
   * @type Boolean
   */
  selectionInMargin()
  {
      // Sometimes mouseover a margin seems to set the range offset
      // greater than the string length, so check that condition,
      // as well as looking for whitepace at the offset with
      // only whitespace to the right or left of the offset
      // TODO - not sure if it's necessary anymore?
      //var inMargin =
       //   this.original_selection.anchorOffset >= this.original_selection.toString().length ||
      //    ( a_rngstr[a_ro].indexOf(" ") == 0 &&
      //          (a_rngstr.slice(0,a_ro).search(/\S/) == -1 ||
      //         a_rngstr.slice(a_ro+1,-1).search(/\S/) == -1)
      //    );
      return false;
  };

  /**
  * Helper method for {@link #findSelection} which
  * identifies target word and surrounding
  * context for languages whose words are
  * space-separated
  * @see #findSelection
  * @private
  */
  doSpaceSeparatedWordSelection() {
    let selection = this.original_selection;
    let anchor = selection.anchorNode;
    let focus = selection.focusNode;
    let anchor_text = anchor.data;
    let ro = selection.anchorOffset;
    // clean string:
    //   convert punctuation to spaces
    anchor_text = anchor_text.replace(new RegExp("[" + this.language.getPunctuation() + "]","g")," ");

    let new_ro = ro;
    while ((new_ro > 0) && (anchor_text[--new_ro] === ' '));
    if (new_ro > 0 && new_ro < ro) {
      // we backed up so position ourselves at the first whitespace before
      // the selected word
      // this is based upon the original Alpheios code before the SelectionAPI
      // was available. It's unclear if it's still needed but we'll keep it in
      // place, modified, for now
      ro = new_ro + 1;
    }

    // remove leading white space
    // find word
    let wordStart = anchor_text.lastIndexOf(" ", ro) + 1;
    let wordEnd = anchor_text.indexOf(" ", wordStart);

    if (wordEnd === -1) {
      wordEnd = anchor_text.length;
    }

    // if empty, nothing to do
    if (wordStart === wordEnd) {
      return {};
    }

    //extract word
    let word = anchor_text.substring(wordStart,wordEnd);

    /* Identify the words preceeding and following the focus word
    * TODO - query the type of node in the selection to see if we are
    * dealing with something other than text nodes
    * We also need to be able to pull surrounding context for text
    * nodes that are broken up by formatting tags (<br/> etc))
    */

    let context_str = null;
    let context_pos = 0;

    if (this.language.context_forward || this.language.context_backward) {
      let startstr = anchor_text.substring(0, wordEnd);
      let endstr = anchor_text.substring(wordEnd+1, anchor_text.length);
      let pre_wordlist = startstr.split(/\s+/);
      let post_wordlist = endstr.split(/\s+/);

      // limit to the requested # of context words
      // prior to the selected word
      // the selected word is the last item in the
      // pre_wordlist array
      if (pre_wordlist.length > this.language.context_backward + 1) {
          pre_wordlist = pre_wordlist.slice(pre_wordlist.length-(this.language.context_backward + 1));
      }
      // limit to the requested # of context words
      // following to the selected word
      if (post_wordlist.length > this.language.context_forward) {
          post_wordlist = post_wordlist.slice(0, this.language.context_forward);
      }

      /* TODO: should we put the punctuation back in to the
      * surrounding context? Might be necessary for syntax parsing.
      */
      context_str =
          pre_wordlist.join(" ") + " " + post_wordlist.join(" ");
      context_pos = pre_wordlist.length - 1;
    }

    let word_obj = { word: word,
        normalized_word: this.language.normalizeWord(word),
        start: wordStart,
        end: wordEnd,
        context: context_str,
        position: context_pos,
        reset: () => { selection.setBaseAndExtent(anchor, wordStart, focus, wordEnd); }
      };
    return word_obj;
  }

  /**
   * Helper method for {@link #findSelection} which identifies
   * target word and surrounding context for languages
   * whose words are character based
   * @see #findSelection
   * @private
   */
  doCharacterBasedWordSelection() {
    // TODO
  }

  toString() {
    return `language:${this.language} word: ${this.word_selection.normalized_word}`;
  }

}
export default SourceSelection;
