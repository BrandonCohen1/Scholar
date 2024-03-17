chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel_window',
    title: 'Open Side Panel Window',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel_window') {
    // open side panel on the current window
    chrome.sidePanel.open({ windowId: tab.windowId });
    console.log('Button clicked')
  }
});