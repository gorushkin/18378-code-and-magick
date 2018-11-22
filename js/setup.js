'use strict';

var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var NUMBER_OF_WIZARDS = 4;
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var HIDE_SELECTOR = 'hidden';

var Selectors = {
  wizardName: '.setup-similar-label',
  coatColor: '.wizard-coat',
  eyesColor: '.wizard-eyes',
  setupPopup: '.setup',
  similarWizardTemplate: '#similar-wizard-template',
  similarListWrapper: '.setup-similar',
  similarList: '.setup-similar-list',
  similarListItem: '.setup-similar-item'
};


var setupPopup = document.querySelector(Selectors.setupPopup);
setupPopup.classList.remove(HIDE_SELECTOR);
var similarListElement = setupPopup.querySelector(Selectors.similarList);
var similarWizardTemplate = document.querySelector(Selectors.similarWizardTemplate).content.querySelector(Selectors.similarListItem);

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
  wizardElement.querySelector(Selectors.wizardName).textContent = wizard.name;
  wizardElement.querySelector(Selectors.coatColor).style.fill = wizard.coatColor;
  wizardElement.querySelector(Selectors.eyesColor).style.fill = wizard.eyesColor;
  return wizardElement;
};

var wizardList = [];
var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
  wizardList.push(generateWizard());
  fragment.appendChild(renderWizard(wizardList[i]));
}

similarListElement.appendChild(fragment);

setupPopup.querySelector(Selectors.similarListWrapper).classList.remove(HIDE_SELECTOR);
