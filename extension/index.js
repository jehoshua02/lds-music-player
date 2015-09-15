chrome.browserAction.onClicked.addListener(function(tab) {
  var url = 'build/index.html';
  var win = window.open(url, '_blank');
  win.focus();
});
