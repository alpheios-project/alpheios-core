'use strict';
// Import shared language data
import * as Lib from "../lib/lib.js";
import * as Tufts from "../analyzer/tufts/adapter.js";

// Reexport items for Jest
exports.languages = Lib.languages;
exports.types = Lib.types;
exports.Feature = Lib.Feature;
exports.FeatureType = Lib.FeatureType;
exports.Importer = Lib.Importer;
exports.LanguageDataset = Lib.LanguageDataset;