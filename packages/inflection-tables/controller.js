'use strict';
// Import shared language data
import * as Lib from "./lib/lib.js";
import * as Tufts from "./analyzer/tufts/adapter.js";
import * as Presenter from "./presenter/presenter.js";

// Export for testing
//export {langData};

let testJSON1 = {
    "RDF": {
        "Annotation": {
            "about": "urn:TuftsMorphologyService:cupidinibus:whitakerLat",
            "creator": {
                "Agent": {
                    "about": "net.alpheios:tools:wordsxml.v1"
                }
            },
            "created": {
                "$": "2017-08-10T23:15:29.185581"
            },
            "hasTarget": {
                "Description": {
                    "about": "urn:word:cupidinibus"
                }
            },
            "title": {},
            "hasBody": [
                {
                    "resource": "urn:uuid:idm140578094883136"
                },
                {
                    "resource": "urn:uuid:idm140578158026160"
                }
            ],
            "Body": [
                {
                    "about": "urn:uuid:idm140578094883136",
                    "type": {
                        "resource": "cnt:ContentAsXML"
                    },
                    "rest": {
                        "entry": {
                            "infl": [
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 2,
                                        "$": "locative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 5,
                                        "$": "dative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 3,
                                        "$": "ablative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "masculine"
                                    }
                                }
                            ],
                            "dict": {
                                "hdwd": {
                                    "lang": "lat",
                                    "$": "Cupido, Cupidinis"
                                },
                                "pofs": {
                                    "order": 5,
                                    "$": "noun"
                                },
                                "decl": {
                                    "$": "3rd"
                                },
                                "gend": {
                                    "$": "masculine"
                                },
                                "area": {
                                    "$": "religion"
                                },
                                "freq": {
                                    "order": 4,
                                    "$": "common"
                                },
                                "src": {
                                    "$": "Ox.Lat.Dict."
                                }
                            },
                            "mean": {
                                "$": "Cupid, son of Venus; personification of carnal desire;"
                            }
                        }
                    }
                },
                {
                    "about": "urn:uuid:idm140578158026160",
                    "type": {
                        "resource": "cnt:ContentAsXML"
                    },
                    "rest": {
                        "entry": {
                            "infl": [
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 2,
                                        "$": "locative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 5,
                                        "$": "dative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                },
                                {
                                    "term": {
                                        "lang": "lat",
                                        "stem": {
                                            "$": "cupidin"
                                        },
                                        "suff": {
                                            "$": "ibus"
                                        }
                                    },
                                    "pofs": {
                                        "order": 5,
                                        "$": "noun"
                                    },
                                    "decl": {
                                        "$": "3rd"
                                    },
                                    "var": {
                                        "$": "1st"
                                    },
                                    "case": {
                                        "order": 3,
                                        "$": "ablative"
                                    },
                                    "num": {
                                        "$": "plural"
                                    },
                                    "gend": {
                                        "$": "common"
                                    }
                                }
                            ],
                            "dict": {
                                "hdwd": {
                                    "lang": "lat",
                                    "$": "cupido, cupidinis"
                                },
                                "pofs": {
                                    "order": 5,
                                    "$": "noun"
                                },
                                "decl": {
                                    "$": "3rd"
                                },
                                "gend": {
                                    "$": "common"
                                },
                                "freq": {
                                    "order": 5,
                                    "$": "frequent"
                                },
                                "src": {
                                    "$": "Ox.Lat.Dict."
                                }
                            },
                            "mean": {
                                "$": "desire/love/wish/longing (passionate); lust; greed, appetite; desire for gain;"
                            }
                        }
                    }
                }
            ]
        }
    }
};

// Inserts rendered view to the specific element of the web page
let show = function show(html, whereSel) {
    "use strict";
    let selector = document.querySelector(whereSel);
    selector.innerHTML = html;
};


console.log('Sequence started');

//import * as PapaParse from './lib/support/papaparse-4.3.2/papaparse.js';
/*PapaParse.Papa.parse(fileInput.files[0], {
    complete: function(results) {
        console.log(results);
    }
});*/

// Transform Morphological Analyzer's response into a library standard Homonym object
let result = Tufts.transform(testJSON1);

// Load Latin language data
import * as ModuleNS from './lib/lang/latin/latin.js';
import {dataSet} from "./lib/lang/latin/latin";

let langData = ModuleNS.dataSet;

dataSet.loadData().then(function() {
    // Get matching suffixes from an inflection library
    let suffixes = langData.getSuffixes(result);

// Make Presenter build a view's HTML
    let html = Presenter.render(suffixes);

// Insert rendered view to a page
    show(html, '#id-inflections-table');

    console.log('Sequence finished');
});



