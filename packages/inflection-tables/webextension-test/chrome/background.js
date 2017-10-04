const TITLE_APPLY = "Show Vue";
const TITLE_REMOVE = "Hide Vue";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function toggleVue(tab) {

    function gotTitle(title) {
        if (title === TITLE_APPLY) {
            chrome.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
            chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
            chrome.tabs.insertCSS({file: '/styles/style.css'});
            chrome.tabs.executeScript({file: '/extension-bundle.js'});
        } else {
            chrome.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
            chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
            chrome.tabs.executeScript({file: '/cleanup.js'});
        }
    }

    console.log('Toggle');

    let gettingTitle = chrome.pageAction.getTitle({tabId: tab.id}, function(title) {
        "use strict";
        gotTitle(title);
    });
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
    let anchor =  document.createElement('a');
    anchor.href = url;
    return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
    if (protocolIsApplicable(tab.url)) {
        chrome.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
        chrome.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
        chrome.pageAction.show(tab.id);
    }
}

/*
When first loaded, initialize the page action for all tabs.
*/
let gettingAllTabs = chrome.tabs.query({}, function(tabs) {
    "use strict";
    for (let tab of tabs) {
        initializePageAction(tab);
    }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
chrome.pageAction.onClicked.addListener(toggleVue);