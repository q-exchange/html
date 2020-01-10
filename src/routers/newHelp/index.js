/*
 * @Descripttion:新的帮助
 * @version: 
 * @Author: 张志强
 * @Date: 2019-09-07 09:24:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-07 09:26:11
 */
export default [{
        path: '/newhelp',
        component: resolve => require(['@page/cms/NewHelp'], resolve),
        children: [{
                path: '',
                component: resolve => require(['@components/cms/NoticeDeails'], resolve),
            },
            {
                path: 'index',
                component: resolve => require(['@components/cms/NoticeDeails'], resolve),
            },
            {
                path: 'account',
                component: resolve => require(['@components/uc/Account'], resolve),
            },
        ]
    }, {
        path: '/agreement',
        component: resolve => require(['@page/cms/Agreement'], resolve)
    },
    {
        path: '/rate',
        component: resolve => require(['@page/cms/Rate'], resolve)
    },
    {
        path: '/about-rule',
        component: resolve => require(['@page/cms/ExchargeRule'], resolve)
    },
    {
        path: '/about-protocol',
        component: resolve => require(['@page/cms/UserProtocol'], resolve)
    },
    {
        path: '/about-fee',
        component: resolve => require(['@page/cms/FeeNote'], resolve)
    },
    {
        path: '/about-notice',
        component: resolve => require(['@page/cms/HomeNotice'], resolve)
    },
    {
        path: '/about-us',
        component: resolve => require(['@page/cms/AboutUs'], resolve)
    },
    {
        path: '/join-us',
        component: resolve => require(['@page/cms/JoinUs'], resolve)
    },
    {
        path: '/about-merchant',
        component: resolve => require(['@page/cms/MerchantProtocol'], resolve)
    }
]