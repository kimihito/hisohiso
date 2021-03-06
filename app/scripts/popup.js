'use strict';

document.addEventListener('DOMContentLoaded', function () {
    function hookElement(hook) {
        var elem = document.createElement('li');
        elem.innerHTML = '<button class="post" data-url="' + encodeURIComponent(hook.url) + '">' + hook.name + '</button>'
        elem.querySelector('.post').addEventListener('click', postCurrentPageToIdobata, false);
        return elem;
    }

    function renderHooks() {
        var hooksList = document.getElementById('hooks-list');
        hooksList.innerHTML = '';
        withHooks(function (hooks) {
            hooks.forEach(function (hook) {
                hooksList.appendChild(hookElement(hook));
            });
        });
    }
    chrome.storage.onChanged.addListener(renderHooks);
    renderHooks();
}, false);

function postCurrentPageToIdobata(event) {
    var hook_url = event.target.dataset.url;
    var message = document.getElementById('message').value;
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs.length === 0) return;
        chrome.runtime.sendMessage({hook_url: hook_url, title: tabs[0].title, url: tabs[0].url, message: message});
    });
}
