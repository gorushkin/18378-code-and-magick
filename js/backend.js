'use strict';

(function () {
  window.load = function (URL, onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      try {
        onLoad(xhr.response);
      } catch (err) {
        onError(err.message);
      }
    });
    xhr.send();
  };
})();
