import {
    kinleConfig
} from "./klineConfig/index"
export const klineMinx = {
    data() {
        return {
            datafeed: null,
            custom_css_url: "bundles/common.css",
            overrides: kinleConfig
        }
    },
    methods: {
        getKline() {
            let that = this;
            let config = {
                autosize: true,
                fullscreen: true,
                symbol: this.symbol,
                interval: "5", // K线默认时间传值
                timezone: "Asia/Shanghai",
                toolbar_bg: "#222c41",
                container_id: "kline_container",
                datafeed: this.datafeed,
                library_path: process.env.NODE_ENV === "production" ? "../assets/charting_library/" : "src/assets/js/charting_library/",
                locale: "zh",
                debug: false,
                drawings_access: {
                    type: "black",
                    tools: [{
                        name: "Regression Trend"
                    }]
                },
                disabled_features: [
                    "header_resolutions",
                    "timeframes_toolbar",
                    "header_symbol_search",
                    "header_chart_type",
                    "header_compare",
                    "header_undo_redo",
                    "header_screenshot",
                    "header_saveload",
                    "use_localstorage_for_settings",
                    "volume_force_overlay",
                ],
                enabled_features: [
                    "left_toolbar",
                    "hide_last_na_study_output",
                    "move_logo_to_main_pane",
                ],
                custom_css_url: this.custom_css_url,
                supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
                loading_screen: {
                    backgroundColor: '＃162431',
                    foregroundColor: '＃162431'
                },
                supports_marks: true,
                charts_storage_url: "http://saveload.tradingview.com",
                charts_storage_api_version: "1.1",
                client_id: "tradingview.com",
                user_id: "public_user_id",
                overrides: {
                    "paneProperties.background": "#1f2126",
                    'paneProperties.vertGridProperties.style': 0,
                    "paneProperties.vertGridProperties.color": "rgba(255,255,255,.04)",
                    "paneProperties.horzGridProperties.color": "rgba(255,255,255,.04)",
                    "scalesProperties.textColor": "#61688A",
                    "mainSeriesProperties.candleStyle.upColor": "#05c19e",
                    "mainSeriesProperties.candleStyle.downColor": "#e04545",
                    "mainSeriesProperties.candleStyle.drawBorder": false,
                    "mainSeriesProperties.candleStyle.wickUpColor": "#00b275",
                    "mainSeriesProperties.candleStyle.wickDownColor": "#f15057",
                    "paneProperties.legendProperties.showLegend": true,
                    "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
                    "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
                    "mainSeriesProperties.areaStyle.linecolor": "#9194a4",
                    "scalesProperties.lineColor": "#697080", // xy刻度线色值
                    // "paneProperties.crossHairProperties.color": "#00b275", // 十字光标颜色
                    "mainSeriesProperties.candleStyle.borderUpColor": "#00b275", // 开高低收买入标线
                    "mainSeriesProperties.candleStyle.borderDownColor": "#f15057" // 开高低收卖出标线
                },
                // 柱状图样式
                studies_overrides: {
                    "volume.volume.color.0": "rgba(222, 71, 73, 1)", //第一根的颜色
                    "volume.volume.color.1": "rgba(32, 192, 158, 0.9)", //第二根的颜色
                },
                time_frames: [{
                        text: "1min",
                        resolution: "1",
                        description: "realtime",
                        title: that.$t("exchange.realtime")
                    },
                    {
                        text: "1min",
                        resolution: "1",
                        description: "1min"
                    },
                    {
                        text: "5min",
                        resolution: "5",
                        description: "5min"
                    },
                    {
                        text: "15min",
                        resolution: "15",
                        description: "15min"
                    },
                    {
                        text: "30min",
                        resolution: "30",
                        description: "30min"
                    },
                    {
                        text: "1hour",
                        resolution: "60",
                        description: "1hour",
                        title: "1hour"
                    },
                    {
                        text: "4hour",
                        resolution: "240",
                        description: "4hour",
                        title: "4hour"
                    },
                    {
                        text: "1day",
                        resolution: "1D",
                        description: "1day",
                        title: "1day"
                    },
                    {
                        text: "1week",
                        resolution: "1W",
                        description: "1week",
                        title: "1week"
                    },
                    {
                        text: "1mon",
                        resolution: "1M",
                        description: "1mon"
                    }
                ]
            };
            if (that.skin === "day") {
                config.toolbar_bg = "#fff";
                config.custom_css_url = "bundles/common_day.css";
                config.overrides["paneProperties.background"] = "#fff";
                config.overrides["mainSeriesProperties.candleStyle.upColor"] =
                    "#a6d3a5";
                config.overrides["mainSeriesProperties.candleStyle.downColor"] =
                    "#ffa5a6";
                config.overrides["scalesProperties.lineColor"] = "#aaa"; // xy刻度线色值
                config.overrides["mainSeriesProperties.candleStyle.upColor"] = "#39c595"; // 第一根的颜色
                config.overrides["mainSeriesProperties.candleStyle.downColor"] = "#f96969"; // 第二根的颜色
            }
            require(["@js/charting_library/charting_library.min.js"], function(tv) {
                let widget = (window.tvWidget = new TradingView.widget(config));
                // const wrapper = document.getElementById("kline_container");
                // const frame = wrapper.getElementsByTagName("iframe")[0];
                widget.onChartReady(function() {
                    // frame.style.display = "block";
                    widget.chart().executeActionById("drawingToolbarAction");
                    widget
                        .chart()
                        .createStudy("Moving Average", false, false, [5], null, {
                            "plot.color": "#965FC4"
                        });
                    widget
                        .chart()
                        .createStudy("Moving Average", false, false, [10], null, {
                            "plot.color": "#84AAD5"
                        });
                    widget
                        .chart()
                        .createStudy("Moving Average", false, false, [30], null, {
                            "plot.color": "rgb(85, 178, 99)"
                        });
                    widget
                        .chart()
                        .createStudy("Moving Average", false, false, [60], null, {
                            "plot.color": "rgb(183, 36, 138)"
                        });
                    widget
                        .createButton()
                        .attr("title", "realtime")
                        .attr("class", "moment button")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(3);
                            widget.setSymbol("", "1");
                        })
                        .append("<span>分时</span>");

                    widget
                        .createButton()
                        .attr("title", "M1")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "1");
                        })
                        .append("<span>1min</span>")

                    widget
                        .createButton()
                        .attr("title", "M5")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "5");
                        })
                        .append("<span>5min</span>")
                        .addClass("selected") // 静态默认分时

                    widget
                        .createButton()
                        .attr("title", "M15")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "15");
                        })
                        .append("<span>15min</span>");

                    widget
                        .createButton()
                        .attr("title", "M30")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "30");
                        })
                        .append("<span>30min</span>");

                    widget
                        .createButton()
                        .attr("title", "H1")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "60");
                        })
                        .append("<span>1hour</span>");

                    widget
                        .createButton()
                        .attr("title", "D1")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "1D");
                        })
                        .append("<span>1day</span>");

                    widget
                        .createButton()
                        .attr("title", "W1")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "1W");
                        })
                        .append("<span>1week</span>");

                    widget
                        .createButton()
                        .attr("title", "M1")
                        .on("click", function() {
                            if ($(this).hasClass("selected")) return;
                            $(this)
                                .addClass("selected")
                                .parent(".group")
                                .siblings(".group")
                                .find(".button.selected")
                                .removeClass("selected");
                            widget.chart().setChartType(1);
                            widget.setSymbol("", "1M");
                        })
                        .append("<span>1mon</span>");
                });
            });
        },
    }

}