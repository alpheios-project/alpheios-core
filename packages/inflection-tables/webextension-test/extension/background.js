const TITLE_APPLY = "Show Vue";
const TITLE_REMOVE = "Hide Vue";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];

function toggleVue(tab) {

    function gotTitle(title) {
        if (title === TITLE_APPLY) {
            browser.pageAction.setIcon({tabId: tab.id, path: "icons/on.svg"});
            browser.pageAction.setTitle({tabId: tab.id, title: TITLE_REMOVE});
            browser.tabs.insertCSS({file: '/styles/style.css'});
            browser.tabs.executeScript({file: '/extension-bundle.js'});
        } else {
            browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
            browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
            browser.tabs.executeScript({file: '/cleanup.js'});
        }
    }

    let gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
    gettingTitle.then(gotTitle);
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
        browser.pageAction.setIcon({tabId: tab.id, path: "icons/off.svg"});
        browser.pageAction.setTitle({tabId: tab.id, title: TITLE_APPLY});
        browser.pageAction.show(tab.id);
    }
}

/*
When first loaded, initialize the page action for all tabs.
*/
let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
        initializePageAction(tab);
    }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleVue);