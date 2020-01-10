const componentsContext = require.context("./global", true, /\.js$/);
const params = {};
const paramsEn = {};
componentsContext.keys().forEach(component => {
    const key = component.replace(/\.\//g, "").replace(/\.js/, "");
    const componentConfig = componentsContext(component);
    //兼容export 和module两种导出方式
    const ctrl = componentConfig.default || componentConfig;
    params[key] = ctrl.zh;
    paramsEn[key] = ctrl.en;
});
module.exports.zh = params;
module.exports.en = paramsEn;