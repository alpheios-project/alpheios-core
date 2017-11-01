"use strict";
import SourceSelection from '../src/source_selection.js';
import LanguageModel from '../src/language_model.js';
const jsdom = require('jsdom');

let polyfill_closest = function(selector) {
  let self = this;

  var el = this;
  do {
      if (el.matches(selector)) return el;
      el = el.parentElement;
  } while (el !== null);
  return null;
};

describe('SourceSelection object', () => {

    beforeAll(() => {
    });

    test('we find an embedded language properly', () => {
        let doc = new jsdom.jsdom('<!doctype html><html><body><div lang="grc"><div id="closest" lang="lat"><div id="latembed"></div></div></div></body></html>');
        let el = doc.getElementById("latembed");
        el.closest = polyfill_closest;
        let sw = new SourceSelection(el);
        expect(sw.language.source_language).toEqual(LanguageModel.LANG_LATIN);
    });

    test('we find an embedded xml language properly', () => {
        let doc = new jsdom.jsdom('<!doctype html><html><body><div lang="grc"><div id="closest" xml:lang="lat"><div id="latembed"></div></div></div></body></html>');
        let el = doc.getElementById("latembed");
        el.closest = polyfill_closest;
        let sw = new SourceSelection(el);
        expect(sw.language.source_language).toBeNull();
    });
});
