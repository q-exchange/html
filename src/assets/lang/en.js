const en = require("./index").en;


const params = {
    progress: {
        already: "Have to dig",
        total: "Amount of excavable ore 6 billion BHB"
    },
    index: {
        circulation: 'Safety and development fund circulation',
        hourEth: 'Cumulative revenue to be distributed in today',
        yesterdayEth: 'Cumulative revenue to be distributed in yesterday',
        yesterday: 'Mining output of the previous day:',
        bhbTotal: "BHB Total flux",
        bhbSecond: "BHB Two level market circulation",
        checkMineprinciple: "View the principle of mining",
        checkFlowVolum: 'Inspection of circulation',
        checkLockPosition: 'Check the lock situation',
        BHBregister: "XX网 account registration",
        tibi: "The time and limit of the payment of the money to the bill",
        line_plane: "Announcement on BHB's on-line plan, circulation and service fee return",
        fenpeijizhi: 'A description of the XX网 income distribution mechanism',
        jiangli_jihua: "Inviting the mining Award Scheme",
        friend_fanhuan: "Invite friends, earn extra fee and return"
    },
    plate: {
        title: "Platform income distribution scheme（BHB Holder's equity）",
        content1: "As described in the white paper, XX网 will take up 80% of the platform (after deduct Taxes and fees )The income is allocated to BHB holders, and 20% of revenue is used to support R & D and operation of the platform.",
        content2: "The distribution of income takes days as a distribution cycle, and June 6, 2018 as the first distribution day. Every day after that, the total income to be distributed on the previous day will be allocated to BHB holders in proportion.",
        content3: "（notice：1. the BHB here only refers to the BHB that has been released / circulated. See also【",
        content3_1: 'Note on the ratio of BHB circulation / participation in income distribution',
        content3_2: "2. the hourly (whole point) snapshot is calculated once and the income distribution is executed once a day.",
        hourFenpei: "Distribution of income today",
        hourTotal: "Total income of today's platform",
        xiangqing: "Details of today's income distribution",
        yesterdaytit: "Distribution of income yesterday",
        yesterdaytotal: "Total income of yesterday's platform",
        yesterdayxiangqing: "Details of yesterday's income distribution",
        yesterday: {
            total: "Total Revenues",
            allocated: "Undistributed Revenues",
        }
    },
    feereturn: {
        ruletitle: "Note",
        rulecontent: 'Our White Paper has a detailed explanation of Reimbursement of Transaction Fees. Overall, 51% of the platform' + 's total BHB base (referred to as "community reward portion" from now on) will be reimbursed to users over time via our "Trans-Fee Mining" mechanism. However once this 51% of the total BHBs has been fully released via reimbursement, the "Trans-Fee Mining" mechanism will automatically end. ',
        recordtitle: 'List',
        recordcontent: 'Everyday (UTC+8, same as below) BHB will reimburse 100% of the users' + 'transaction fees incurred from the previous day in the form of BHB. This will be done by using the average BHB price of the previous day (this average price is calculated as total value transacted/total volume transacted). We will complete this reimbursement of transaction fees from the previous day in the form of BHBs, at 11am everyday.',
        time: "Date",
        todaycharge: "Average price (ETH)",
        totalChange: 'Total (ETH)',
        returnCharge: "Trans-Fee Mining reimbursement(BHB)",
        todayChargeReturn: "Incentive Program for FCoin reimbursement（BHB）"
    },
    aboutUs: {
        c1: "XX网 international digital encryption asset trading platform is a comprehensive digital asset trading platform. We have the leading technology strength, the excellent customer service and a good user experience, and provide a free online exchange platform for the majority of digital currency enthusiasts.",
        c2: "XX网 international digital encryption asset trading platform also provides one-stop blockchain service, including planning of digital currency white paper , adjustment of encryption algorithm, research and development of digital currency, launched of trading platform.",
        c3: "XX网 international digital encrypted asset trading platform overseas operation centers are set up in Singapore, Cambodia and Marshall respectively. There are three offices in Beijing, Zhengzhou and Shenzhen. The Chinese headquarters is set up in Qingshuiwan international information industrial park in Lingshui, Hainan province."
    }
}

module.exports = Object.assign({}, params, en);