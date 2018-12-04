'use strict';

(function () {

  var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MIN_USERNAME_INPUT_LENGTH = 2;
  var MAX_USERNAME_INPUT_LENGTH = 25;

  var HIDE_CLASS = 'hidden';

  var Selectors = {
    WIZARD_NAME: '.setup-similar-label',
    COAT_COLOR: '.wizard-coat',
    EYSES_COLOR: '.wizard-eyes',
    SETUP_POPUP: '.setup',
    SIMILAR_WIZARD_TEMPLATE: '#similar-wizard-template',
    SIMILAR_LIST_WRAPPER: '.setup-similar',
    SIMILAR_LIST: '.setup-similar-list',
    SIMILAR_LIST_ITEM: '.setup-similar-item',
    SETUP_OPEN: '.setup-open',
    SETUP_CLOSE_BUTTON: '.setup-close',
    USER_NAME_INPUT: '.setup-user-name',
    SETUP_SUBMIT_BUTTON: '.setup-submit',
    SETUP_WIZARD_FORM: '.setup-wizard-form',
    WIZARD_COAT_COLOR: '.wizard-coat',
    WIZARD_EYES_COLOR: '.wizard-eyes',
    WIZARD_FIREBALL_COLOR: '.setup-fireball-wrap',
    SETUP_COAT_COLOR_INPUT: '.coat-color',
    SETUP_EYE_COLOR_INPUT: '.eyes-color',
    SETUP_FIREBALL_COLOR_INPUT: '.fireball-color',
    SETUP_POPUP_USER_PIC: '.upload'
  };


  var setupPopup = document.querySelector(Selectors.SETUP_POPUP);
  var similarListElement = setupPopup.querySelector(Selectors.SIMILAR_LIST);
  var closeSetupFormButton = setupPopup.querySelector(Selectors.SETUP_CLOSE_BUTTON);
  var setupNameInput = setupPopup.querySelector(Selectors.USER_NAME_INPUT);
  var inputCoatColor = setupPopup.querySelector(Selectors.SETUP_COAT_COLOR_INPUT);
  var inputEyesColor = setupPopup.querySelector(Selectors.SETUP_EYE_COLOR_INPUT);
  var inputFireballColor = setupPopup.querySelector(Selectors.SETUP_FIREBALL_COLOR_INPUT);
  var wizardCoatColor = setupPopup.querySelector(Selectors.WIZARD_COAT_COLOR);
  var wizardEyesColor = setupPopup.querySelector(Selectors.WIZARD_EYES_COLOR);
  var wizardFireballColor = setupPopup.querySelector(Selectors.WIZARD_FIREBALL_COLOR);
  var setupUserPic = setupPopup.querySelector(Selectors.SETUP_POPUP_USER_PIC);
  var popupOpenNode = document.querySelector(Selectors.SETUP_OPEN);
  var similarWizardTemplate = document.querySelector(Selectors.SIMILAR_WIZARD_TEMPLATE).content.querySelector(Selectors.SIMILAR_LIST_ITEM);

  window.setup = {
    setupPopup: setupPopup,
    setupUserPic: setupUserPic
  };

  setupNameInput.setAttribute('minlength', MIN_USERNAME_INPUT_LENGTH);
  setupNameInput.setAttribute('maxlength', MAX_USERNAME_INPUT_LENGTH);

  var onPopupKeyPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement.className !== setupNameInput.className)) {
      closePopup();
    }
  };

  var changeWizardCoatColor = function () {
    var tempColor = getRandomElement(COAT_COLORS);
    wizardCoatColor.style.fill = tempColor;
    inputCoatColor.value = tempColor;
  };

  var changeWizardEyesColor = function () {
    var tempColor = getRandomElement(EYES_COLORS);
    wizardEyesColor.style.fill = tempColor;
    inputEyesColor.value = tempColor;
  };

  var changeWizardFireballColor = function () {
    var tempColor = getRandomElement(FIREBALL_COLORS);
    wizardFireballColor.style.backgroundColor = tempColor;
    inputFireballColor.value = tempColor;
  };

  var initialCords = {
    x: setupPopup.offsetLeft,
    y: setupPopup.offsetTop
  };

  var openPopup = function () {
    setupPopup.classList.remove(HIDE_CLASS);
    document.addEventListener('keydown', onPopupKeyPress);
    wizardCoatColor.addEventListener('click', changeWizardCoatColor);
    wizardEyesColor.addEventListener('click', changeWizardEyesColor);
    wizardFireballColor.addEventListener('click', changeWizardFireballColor);
    initialCords = {
      x: setupPopup.offsetLeft,
      y: setupPopup.offsetTop
    };
  };

  var closePopup = function () {
    setupPopup.classList.add(HIDE_CLASS);
    document.removeEventListener('keydown', onPopupKeyPress);
    wizardCoatColor.removeEventListener('click', changeWizardCoatColor);
    wizardEyesColor.removeEventListener('click', changeWizardEyesColor);
    wizardFireballColor.removeEventListener('click', changeWizardFireballColor);
    setupPopup.style.top = initialCords.y + 'px';
    setupPopup.style.left = initialCords.x + 'px';
  };

  popupOpenNode.addEventListener('click', openPopup);

  closeSetupFormButton.addEventListener('click', closePopup);

  closeSetupFormButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  popupOpenNode.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var generateWizard = function () {
    var newWizard = {};
    newWizard.name = getRandomElement(FIRST_NAMES_LIST) + ' ' + getRandomElement(LAST_NAMES_LIST);
    newWizard.coatColor = getRandomElement(COAT_COLORS);
    newWizard.eyesColor = getRandomElement(EYES_COLORS);
    return newWizard;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(Selectors.WIZARD_NAME).textContent = wizard.name;
    wizardElement.querySelector(Selectors.COAT_COLOR).style.fill = wizard.coatColor;
    wizardElement.querySelector(Selectors.EYSES_COLOR).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var wizardList = [];
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizardList.push(generateWizard());
    fragment.appendChild(renderWizard(wizardList[i]));
  }

  similarListElement.appendChild(fragment);

  setupPopup.querySelector(Selectors.SIMILAR_LIST_WRAPPER).classList.remove(HIDE_CLASS);

})();
