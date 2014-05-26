'use strict';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.message){
      var source = request.message + " / " + request.title + " " + request.url;
    }else{
      var source = request.title + " " + request.url;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", decodeURIComponent(request.hook_url), true);
    xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
    xhr.send('source=' + encodeURIComponent(source));
});
