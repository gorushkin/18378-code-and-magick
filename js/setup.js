'use strict';

var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var NUMBER_OF_WIZARDS = 4;
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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
  SETUP_OPEN_ICON: '.setup-open',
  SETUP_CLOSE_BUTTON: '.setup-close'
};


var setupPopup = document.querySelector(Selectors.SETUP_POPUP);
// setupPopup.classList.remove(HIDE_CLASS);
var similarListElement = setupPopup.querySelector(Selectors.SIMILAR_LIST);
var setupCloseButton = setupPopup.querySelector(Selectors.SETUP_CLOSE_BUTTON);
var similarOpenIcon = document.querySelector(Selectors.SETUP_OPEN_ICON);
var similarWizardTemplate = document.querySelector(Selectors.SIMILAR_WIZARD_TEMPLATE).content.querySelector(Selectors.SIMILAR_LIST_ITEM);


similarOpenIcon.addEventListener('click', function () {
  setupPopup.classList.remove(HIDE_CLASS);
});

setupCloseButton.addEventListener('click', function () {
  setupPopup.classList.add(HIDE_CLASS);
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
