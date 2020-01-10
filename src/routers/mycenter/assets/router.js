/*
 * @Descripttion: 资产管理的路由
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-06 10:47:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-06 19:55:03
 */
export default [{
    path: 'money',
    name: "money",
    meta: {
        title: "个人资产"
    },
    component: resolve => require(['@components/uc/MoneyIndex'], resolve),
}, {
    path: 'record',
    name: "record",
    meta: {
        title: "资产流水"
    },
    component: resolve => require(['@components/uc/Record'], resolve),
}, {
    path: 'recharge',
    name: "recharge",
    meta: {
        title: "充币"
    },
    component: resolve => require(['@components/uc/Recharge'], resolve),
}, {
    path: 'withdraw',
    name: "withdraw",
    meta: {
        title: "提币"
    },
    component: resolve => require(['@components/uc/Withdraw'], resolve),
}, {
    path: 'withdraw/address',
    name: "withdrawAddress",
    meta: {
        title: "提币地址管理"
    },
    component: resolve => require(['@components/uc/WithdrawAddress'], resolve),
}, {
    path: 'bjc',
    name: "bjc",
    meta: {
        title: "积分管理"
    },
    component: resolve => require(['@components/uc/Bjc'], resolve),
}, {
    path: 'giveRecord',
    name: "giveRecord",
    meta: {
        title: "糖果赠送记录"
    },
    component: resolve => require(['@components/uc/giveRecord'], resolve),
}, {
    path: 'coin',
    name: "coins",
    meta: {
        title: "币币账户"
    },
    component: resolve => require(['@components/splitaccount/coin'], resolve),
}, {
    path: "currency",
    name: "currency",
    meta: {
        title: "法币账户"
    },
    component: resolve => require(['@components/splitaccount/currency'], resolve),
}, {
    path: "fince",
    name: "fince",
    meta: {
        title: "财务记录"
    },
    component: resolve => require(['@components/uc/fince'], resolve),
}]