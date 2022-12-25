let activeTab;

const addButton = document.querySelector('#add-button')
const delButton = document.querySelector('#del-button')
const textarea = document.querySelector('#textarea') as HTMLTextAreaElement

const insertCSS = async () => {
  try {
    await chrome.scripting.insertCSS({ target: { tabId: activeTab.id }, css: textarea.value });
  } catch (err) {
    console.error(`Failed to insert CSS: ${err}`);
  }
}

const removeCSS = async () => {
  try {
    await chrome.scripting.removeCSS({ target: { tabId: activeTab.id }, css: textarea.value });
  } catch (err) {
    console.error(`Failed to remove CSS: ${err}`);
  }
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  activeTab = tabs[0];
  console.log('%c Popup. active tab: ', 'background: #000; color: #bada55; font-size: 16px', activeTab);
});

addButton.addEventListener('click', insertCSS)
delButton.addEventListener('click', removeCSS)
