'use strict';

var CLOYD_X = 110;
var CLOYD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var YGAP = 10;
var XGAP = 30;
var TEXT_HEIGHT = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_MARGIN = 50;


var renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTime = function (arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var drawBar = function (ctx, x, y, height, name) {
  ctx.fillStyle = name === 'Вы' ? 'red' : 'hsl(228, ' + Math.floor(Math.random() * 101) + '%' + ', 37%)';
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOYD_X + 10, CLOYD_Y + 10);
  renderCloud(ctx, '#fff', CLOYD_X, CLOYD_Y);

  ctx.fillStyle = '#000000';
  ctx.font = TEXT_HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOYD_X + XGAP, CLOYD_Y + YGAP);
  ctx.fillText('Список результатов:', CLOYD_X + XGAP, CLOYD_Y + TEXT_HEIGHT + YGAP);

  var maxTime = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * i, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - YGAP);
    ctx.fillText(Math.floor(times[i]), CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * i, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 3 - BAR_HEIGHT * Math.floor(times[i]) / maxTime);
    drawBar(ctx, CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * i, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 2, -BAR_HEIGHT * Math.floor(times[i]) / maxTime, names[i]);
  }
};