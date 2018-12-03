'use strict';

(function () {

  window.setup.setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var setupPopupHeight = window.setup.setupPopup.offsetHeight;
    var setupPopupWidth = window.setup.setupPopup.offsetWidth;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.setupPopup.style.top = (window.setup.setupPopup.offsetTop - shift.y) + 'px';
      window.setup.setupPopup.style.left = (window.setup.setupPopup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (window.setup.setupPopup.offsetLeft < setupPopupWidth / 2) {
        window.setup.setupPopup.style.left = setupPopupWidth / 2 + 'px';
      } else if (window.setup.setupPopup.offsetLeft > windowWidth - setupPopupWidth / 2) {
        window.setup.setupPopup.style.left = (windowWidth - setupPopupWidth / 2) + 'px';
      }
      if (window.setup.setupPopup.offsetTop < 0) {
        window.setup.setupPopup.style.top = 0 + 'px';
      } else if (window.setup.setupPopup.offsetTop > windowHeight - setupPopupHeight) {
        window.setup.setupPopup.style.top = (windowHeight - setupPopupHeight) + 'px';
      }

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.setup.setupUserPic.removeEventListener('click', onClickPreventDefault);
        };
        window.setup.setupUserPic.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
