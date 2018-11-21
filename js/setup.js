'use strict';

var FIRST_NAMES_LIST = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES_LIST = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR_LIST = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_LIST_SIZE = 4;
var EYES_COLOR_LIST = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NAME_CLASS = '.setup-similar-label';
var WIZARD_COAT_COLOR_CLASS = '.wizard-coat';
var WIZARD_EYES_COLOR_CLASS = '.wizard-eyes';
var SETUP_WINDOW_CLASS = '.setup';
var HIDDEN_CLASS = 'hidden';
var SIMILAR_WIZARD_TEMPLATE_CLASS = '#similar-wizard-template';
var SIMILAR_LIST_WRAPPER_CLASS = '.setup-similar';
var SIMILAR_LIST_CLASS = '.setup-similar-list';
var SIMILAR_LIST_ITEM_CLASS = '.setup-similar-item';

var setupWindow = document.querySelector(SETUP_WINDOW_CLASS);
setupWindow.classList.remove(HIDDEN_CLASS);
var similarListElement = setupWindow.querySelector(SIMILAR_LIST_CLASS);
var similarWizardTemplate = document.querySelector(SIMILAR_WIZARD_TEMPLATE_CLASS).content.querySelector(SIMILAR_LIST_ITEM_CLASS);

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizard = function () {
  var newWizard = {};
  newWizard.name = getRandomElement(FIRST_NAMES_LIST) + ' ' + getRandomElement(LAST_NAMES_LIST);
  newWizard.coatColor = getRandomElement(COAT_COLOR_LIST);
  newWizard.eyesColor = getRandomElement(EYES_COLOR_LIST);
  return newWizard;
};

var renderWizard = function (name, coatColor, eyesColor) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(WIZARD_NAME_CLASS).textContent = name;
  wizardElement.querySelector(WIZARD_COAT_COLOR_CLASS).style.fill = coatColor;
  wizardElement.querySelector(WIZARD_EYES_COLOR_CLASS).style.fill = eyesColor;
  return wizardElement;
};

var wizardList = [];
var fragment = document.createDocumentFragment();

for (var i = 0; i < WIZARD_LIST_SIZE; i++) {
  wizardList.push(generateWizard());
  fragment.appendChild(renderWizard(wizardList[i].name, wizardList[i].coatColor, wizardList[i].eyesColor));
}

similarListElement.appendChild(fragment);

setupWindow.querySelector(SIMILAR_LIST_WRAPPER_CLASS).classList.remove(HIDDEN_CLASS);
