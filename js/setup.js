'use strict';

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var firstNamesList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNamesList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var generateWizard = function () {
  var newWizard = {};
  newWizard.name = getRandomElement(firstNamesList) + ' ' + getRandomElement(lastNamesList);
  newWizard.coatColor = getRandomElement(coatColorList);
  newWizard.eyesColor = getRandomElement(eyesColorList);
  return newWizard;
};

var wizardList = [];

for (var i = 0; i < 4; i++) {
  wizardList.push(generateWizard());
}

