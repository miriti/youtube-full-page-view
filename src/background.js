chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if((tab.url.indexOf("www.youtube.com/watch?v=") != -1) || (tab.url.indexOf("www.youtube.com/embed/") != -1))  {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  var match = tab.url.match(/watch\?v\=([^\?]+)/);
  if(match) {
    var videoId = match[1];

    chrome.tabs.update(tab.id, {
      url: "https://www.youtube.com/embed/" + videoId + "?autoplay=true"
    });
  } else {
    match = tab.url.match(/embed\/([^\?]+)/);
    if(match) {
      var videoId = match[1];
      chrome.tabs.update(tab.id, {
        url: "https://www.youtube.com/watch?v=" + videoId
      });
    }
  }
});
