const zh = require("./index").zh;

const params = {
    progress: {
        already: "已挖矿",
        total: "可挖矿总量60亿 BHB"
    },
    description: {
        // message1: 'SSL、动态身份验证等银行级别安全技术，\n保障交易安全；支持多种数字货币交易',
        // message2: '严格的项目准入门槛，确保平台用户利益；\n100%保证金，钱包冷热隔离，确保用户资金安全',
        // message3: 'XX网数字资产交易平台支持每秒1000笔交易，给用户带来酣畅淋漓\n的交易体验',

    },
    financeNav: {
        wdzc: '我的资产'
    },
    index: {
        circulation: "BHB 安全与发展基金流通量",
        hourEth: '今日待分配收入累计折合',
        yesterdayEth: '昨日分配收入累计折合',
        yesterday: '昨日挖矿产出',
        bhbTotal: "BHB 总流通量",
        bhbSecond: "BHB二级市场流通量",
        checkMineprinciple: "查看挖矿原理",
        checkFlowVolum: '检查流通量说明',
        checkLockPosition: '查看锁仓情况',
        BHBregister: "XX网网账户注册",
        tibi: "提币到账时间及限额",
        line_plane: "BHB上线计划、流通量及手续费返还公告",
        fenpeijizhi: '关于XX网收入分配机制的说明',
        jiangli_jihua: "邀请挖矿奖励计划",
        friend_fanhuan: "邀请好友、赚取额外手续费返还"
    },
    plate: {
        title: "平台收入分配方案 (BHB 持有者权益)",
        content1: "正如白皮书所描述的，XX网会拿出平台的80% (扣除税费后) 的收入分配给XX网持有者，20%的收入用来支持平台的研发及运营。",
        content2: "收入分配以日为一个分配周期，2018年6月6日为首个分配日。之后的每一天，会将前一天累积的所有待分配收入，一次性的按比例分给BHB持有者",
        content3: "（注：1.此处的BHB仅指已经释放的/可流通的BHB，具体请参见【",
        content3_1: '关于BHB流通量/参与收入分配比例的说明',
        content3_2: "2.每小时（整点）快照并计算一次，收入分配执行为每天一次）。",
        hourFenpei: "今日分配收入折合",
        hourTotal: '今日平台总收入折合',
        xiangqing: '今日收入分配详情',
        yesterdaytit: "昨日天分配收入折合",
        yesterdaytotal: "昨日平台总收入折合",
        yesterdayxiangqing: "昨日收入分配详情",
        /*yesterday:{
          total:"平台总手续费",
          allocated:"待分配收入",
        }*/
    },
    feereturn: {
        ruletitle: "返还规则",
        rulecontent: "白皮书里已经对BHB的分配比例有详细的说明。51%比例的BHB通过“交易即挖矿”的方式逐步回馈给交易用户。一旦51%的BHB全部回馈完成，“挖矿”即自动终止。",
        recordtitle: '返还记录',
        recordcontent: '每日（UTC+8，以下同）都会将前一日的用户所产生交易手续费，100%折算成BHB返还给用户，折算价格按前一交易日BHB的均价（均价计算方式为总成交金额/总成交量）。我们将于每日上午11点，开始发放前一日交易手续费折合BHB的返还。',
        /*time:"日期",
        todaycharge:"当日XX网均价(ETH)",
        totalChange:'当日总手续费折合(ETH)',
        returnCharge:"当日挖矿手续费返还(BHB)",
        todayChargeReturn:"当日挖矿收入倍增计划返还（BHB）"*/
    },
    aboutUs: {
        c1: "XX网（币火）国际数字加密资产交易平台是一个综合数字资产交易平台,我们拥有领先的技术实力、优质的客户服务和良好的用户体验,为广大数字货币爱好者提供一个自由的网上交换的平台。",
        c2: "XX网（币火）国际数字加密资产交易平台同时还提供数字货币白皮书规划、加密算法调整、数字货币研发、交易平台上架一条龙的区块链服务。",
        c3: "XX网（币火）国际数字加密资产交易平台海外运营中心分别设立在新加坡，柬埔寨，马绍尔。国内北京，郑州，深圳三大办事处；中国总部设立在海南陵水清水湾国际信息产业园。"
    }
}

module.exports = Object.assign({}, params, zh)