var $ = require('jquery');
var bars = [];
var WebsockFeed = function(url, coin, stompClient, scale) {
    this._datafeedURL = url;
    this.coin = coin;
    this.stompClient = stompClient;
    this.lastBar = null;
    this.currentBar = null;
    this.subscribe = true;
    this.scale = scale;
};
WebsockFeed.prototype.onReady = function(callback) {
    var config = {};
    config.exchanges = [];
    config.supported_resolutions = ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"];
    config.supports_group_request = false;
    config.supports_marks = true;
    config.supports_search = false;
    config.supports_time = true;
    config.supports_timescale_marks = false;

    $("#" + window.tvWidget.id).contents().on("click", ".date-range-list>a", function() {
        if (window.tvWidget) {
            if ($(this).html() == "分时") {
                $(this).parent().addClass("real-op").removeClass("common-op");
                window.tvWidget.chart().setChartType(3);
            } else {
                $(this).parent().addClass("common-op").removeClass("real-op");
                window.tvWidget.chart().setChartType(1);
            }
        }
    });

    setTimeout(function() {
        callback(config);
    }, 0);
};
WebsockFeed.prototype.getNewData = function() {
    return $.ajax({
        type: 'GET',
        url: this._datafeedURL + "/history",

        dataType: 'json'
    });
};
WebsockFeed.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
    var that = this;

    // this.stompClient.subscribe('/topic/market/kline/' + symbolInfo.name, function(msg) {
    //     if (resolution != "1") return;
    //     if (that.currentBar != null) onRealtimeCallback(that.currentBar);
    //     var resp = JSON.parse(msg.body);
    //     that.lastBar = { time: resp.time, open: resp.openPrice, high: resp.highestPrice, low: resp.lowestPrice, close: resp.closePrice, volume: resp.volume };
    //     that.currentBar = that.lastBar;
    //     onRealtimeCallback(that.lastBar);
    // });
};

WebsockFeed.prototype.unsubscribeBars = function(subscriberUID) {
    this.subscribe = false;
}

WebsockFeed.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

    // var data = {"name":this.coin.symbol,"exchange-traded":"","exchange-listed":"","minmov":1,"minmov2":0,"pointvalue":1,"has_intraday":true,"has_no_volume":false,"description":this.coin.symbol,"type":"bitcoin","session":"24x7","supported_resolutions":["1","5","15","30","60","240","1D","1W","1M"],"pricescale":500,"ticker":"","timezone":"Asia/Shanghai"};
    // var data = {"name":this.coin.symbol,"exchange-traded":"","exchange-listed":"","minmov":1,"volumescale":10000,"has_daily":true,"has_weekly_and_monthly":true,"has_intraday":true,"description":this.coin.symbol,"type":"bitcoin","session":"24x7","supported_resolutions":["1","5","15","30","60","240","1D","1W","1M"],"pricescale":100,"ticker":"","timezone":"Asia/Shanghai"};
    var data = {
        "name": this.coin.symbol,
        "exchange-traded": "",
        "exchange-listed": "",
        "minmov": 1,
        "volumescale": 10000,
        "has_daily": true,
        "has_weekly_and_monthly": true,
        "has_intraday": true,
        "description": this.coin.symbol,
        "type": "bitcoin",
        "session": "24x7",
        "supported_resolutions": ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
        "pricescale": Math.pow(10, this.scale || 2),
        "ticker": "",
        "timezone": "Asia/Shanghai"
    };
    setTimeout(function() {
        onSymbolResolvedCallback(data);
    }, 0);
};

WebsockFeed.prototype._send = function(url, params) {
    var request = url;
    if (params) {
        for (var i = 0; i < Object.keys(params).length; ++i) {
            var key = Object.keys(params)[i];
            var value = encodeURIComponent(params[key]);
            request += (i === 0 ? '?' : '&') + key + '=' + value;
        }
    }

    return $.ajax({
        type: 'GET',
        url: request,
        dataType: 'json'
    });
};

WebsockFeed.prototype.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {

    var that = this;
    this._send(this._datafeedURL + '/history', {
            symbol: symbolInfo.name,
            from: from * 1000,
            to: firstDataRequest ? new Date().getTime() : to * 1000,
            resolution: resolution,
            page: 1,
            pageSize: 1000
        })
        .done(function(response) {
            var data = response;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                bars.push({
                    time: item[0],
                    open: item[1],
                    high: item[2],
                    low: item[3],
                    close: item[4],
                    volume: item[5]
                })
            }
            that.lastBar = bars.length > 0 ? bars[bars.length - 1] : null;
            that.currentBar = that.lastBar;
            var noData = bars.length == 0;
            var retBars = onHistoryCallback(bars, {
                noData: noData
            });
        })
        .fail(function(reason) {
            onErrorCallback(reason);
        });
};
// WebsockFeed.prototype.calculateHistoryDepth = function(period, resolutionBack, intervalBack) {
//     if (period == "1D") {
//         return {
//             resolutionBack: 'M',
//             intervalBack: 12
//         };
//     }

// };
WebsockFeed.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {

    var daysCount = 0;
    if (resolution === 'D') {
        daysCount = requiredPeriodsCount;
    } else if (resolution === 'M') {
        daysCount = 31 * requiredPeriodsCount;
    } else if (resolution === 'W') {
        daysCount = 7 * requiredPeriodsCount;
    } else if (resolution === 'H') {
        daysCount = requiredPeriodsCount * resolution / 24;
    } else {
        daysCount = requiredPeriodsCount * resolution / (24 * 60);
    }

    return daysCount * 24 * 60 * 60;
};

WebsockFeed.prototype.getMarksFun = function() {
    var that = this;
    var id = 1;
    var color = {
        border: '#103bff',
        background: '#ff00e9'
    };
    var text = '这是标记: ';
    var label = 'S';
    var labelFontColor = '#ff8e53';
    var minSize = 5;
    var marks = [];
    console.log(bars);
    var list = bars.map((ele, index) => ({
        id: index,
        time: ele.time / 1000,
        color,
        text: text + (index - 1),
        label,
        labelFontColor,
        minSize
    }))
    return list;
}
let marksList = [];
WebsockFeed.prototype.getMarks = function(symbolInfo, rangeStart, rangeEnd, onDataCallback, resolution) {
    // console.log(this);
    // console.log("🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎");
    // this._send(this._datafeedURL + '/marks', {
    //         symbol: symbolInfo.type.toUpperCase(),
    //         from: rangeStart,
    //         to: rangeEnd,
    //         resolution: resolution
    //     })
    //     .done(function(response) {
    //         onDataCallback(parseJSONorNot(response));
    //     })
    //     .fail(function() {
    //         onDataCallback([]);
    //     });
    var marks = this.getMarksFun();
    setTimeout(function() {
        Array.prototype.push.apply(marksList, marks);
        console.log(marksList);
        onDataCallback(marksList);
    }, 0);
    // if (this._configuration.supports_marks) {
    //     

    // }
}
export default {
    WebsockFeed
}