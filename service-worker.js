chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel_window',
    title: 'Open Side Panel Window',
    contexts: ['all']
  });
  chrome.contextMenus.create({
    id: 'openSidePanel_tab',
    title: 'Open Side Panel Tab',
    contexts: ['all']
  })
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel_window') {
    // open side panel on the current window
    chrome.sidePanel.open({ windowId: tab.windowId });
    console.log('Button clicked')
  }
});

chrome.contextMenus.onClicked.addListener((message, sender) => {
  if (message.menuItemId === 'openSidePanel_tab') {
    // Open side panel for the current tab
    chrome.sidePanel.open({tabId: sender.tabId },
      // Set options for the side panel once opened
      chrome.sidePanel.setOptions({
        tabId: sender.tabId,
        path: 'sidepanel.html',
        enabled: true
      })
    );
  }
});