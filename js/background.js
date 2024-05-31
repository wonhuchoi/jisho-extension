chrome.contextMenus.create ({
    "id": 'jisho',
    "title": "Japanese learning tool - translates japanese text",
    "contexts": ["selection"]
});


const openTab = (info, tab) => {
    let text = info.selectionText;
    let jishoLink = "https://jisho.org/search/" + text
    chrome.tabs.create ({index: tab.index + 1, url: jishoLink, 
    selected: true});
};

chrome.contextMenus.onClicked.addListener(openTab);