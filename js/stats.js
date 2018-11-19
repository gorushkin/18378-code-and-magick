'use strict';

var CLOYD_X = 110;
var CLOYD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var ClOUD_OFFSET = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var YGAP = 10;
var XGAP = 30;
var TEXT_HEIGHT = 16;
var TEXT_COLOR = '#000000';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_MARGIN = 50;
var PLAYER_NAME = 'Вы';

var renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTime = function (arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var selectColor = function(player) {
  if (player === PLAYER_NAME) {
    return PLAYER_BAR_COLOR
  }
  return 'hsl(228, ' + Math.floor(Math.random() * 101) + '%' + ', 37%)';
}

// var drawBar = function (ctx, x, y, height, name) {
//   ctx.fillStyle = selectColor(name);
//   ctx.fillRect(x, y, BAR_WIDTH, height);
// };

var drawHist = function(ctx, name, time, n, maxTime) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(name, CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - YGAP);
  ctx.fillText(Math.floor(time), CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 3 - BAR_HEIGHT * Math.floor(time) / maxTime);
  ctx.fillStyle = selectColor(name);
  ctx.fillRect(CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, -BAR_HEIGHT * Math.floor(time) / maxTime);
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_SHADOW_COLOR, CLOYD_X + ClOUD_OFFSET, CLOYD_Y + ClOUD_OFFSET);
  renderCloud(ctx, CLOUD_COLOR, CLOYD_X, CLOYD_Y);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_HEIGHT + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOYD_X + XGAP, CLOYD_Y + YGAP);
  ctx.fillText('Список результатов:', CLOYD_X + XGAP, CLOYD_Y + TEXT_HEIGHT + YGAP);

  var maxTime = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    drawHist(ctx, names[i], times[i], i, maxTime);
  }
};
