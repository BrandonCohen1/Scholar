const tabId = tab.id;
const button = document.getElementById('openSidePanel');
button.addEventListener('click', async () => {
  await chrome.sidePanel.open({ tabId });
  await chrome.sidePanel.setOptions({
    tabId,
    path: 'sidepanel.html',
    enabled: true
  });
});