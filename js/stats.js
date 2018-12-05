'use strict';

(function () {
  var CLOYD_X = 110;
  var CLOYD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var SHADOW_OFFSET = 10;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var YGAP = 10;
  var XGAP = 30;
  var TEXT_HEIGHT = 16;
  var TEXT_COLOR = '#000000';
  var FONT = 'PT Mono';
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_MARGIN = 50;
  var CURRENT_PLAYER_NAME = 'Вы';
  var CURRENT_PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
  var WIN_MESSAGE = 'Ура вы победили!';
  var LIST_TITLE = 'Список результатов:';
  var BASELINE = 'hanging';

  var renderCloud = function (ctx, color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxValue = function (arr) {
    var max = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  var getColor = function (playerName) {
    if (playerName === CURRENT_PLAYER_NAME) {
      return CURRENT_PLAYER_BAR_COLOR;
    }
    return 'hsl(228, ' + Math.floor(Math.random() * 101) + '%' + ', 37%)';
  };

  var renderHistogram = function (ctx, name, result, n, bestResult) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(name, CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - YGAP);
    ctx.fillText(Math.floor(result), CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 3 - BAR_HEIGHT * Math.floor(result) / bestResult);
    ctx.fillStyle = getColor(name);
    ctx.fillRect(CLOYD_X + XGAP + (BAR_WIDTH + BAR_MARGIN) * n, CLOYD_Y + CLOUD_HEIGHT - TEXT_HEIGHT * 2, BAR_WIDTH, -BAR_HEIGHT * Math.floor(result) / bestResult);
  };

  window.renderStatistics = function (ctx, playersNames, playersResults) {
    renderCloud(ctx, CLOUD_SHADOW_COLOR, CLOYD_X + SHADOW_OFFSET, CLOYD_Y + SHADOW_OFFSET);
    renderCloud(ctx, CLOUD_COLOR, CLOYD_X, CLOYD_Y);

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_HEIGHT + 'px ' + FONT;
    ctx.textBaseline = BASELINE;
    ctx.fillText(WIN_MESSAGE, CLOYD_X + XGAP, CLOYD_Y + YGAP);
    ctx.fillText(LIST_TITLE, CLOYD_X + XGAP, CLOYD_Y + TEXT_HEIGHT + YGAP);

    var bestResult = getMaxValue(playersResults);

    for (var i = 0; i < playersNames.length; i++) {
      renderHistogram(ctx, playersNames[i], playersResults[i], i, bestResult);
    }
  };
})();
