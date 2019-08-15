//服务器域名
const url = 'http://192.168.50.207:8087/';
//公司名称模糊查询
const supcust = url + 'rest/supcust/like/info';
//验证码接口
const mobile=url +'mobile/ssm';
//注册接口
const register = url+ 'employee';
//个人中心接口
const openId=url + 'employee/openId';
//code换
const code=url+"wx/login";
//本日销售汇总
const day=url+"rest/sales/day";
//本周销售汇总
const week=url+"rest/sales/week";
//本月销售汇总
const month=url+"rest/sales/month";
//本季度销售汇总
const quarter=url+"rest/sales/quarter";
//自定义销售汇总
const stom=url+"rest/sales/custom";
//本日门店汇总
const branch=url+"rest/sales/branch/day";
//本周门店汇总
const sales=url+'rest/sales/branch/week'
//本月门店汇总
const rest=url+'rest/sales/branch/month'
//本季度门店汇总
const quarterly=url+'rest/sales/branch/quarter'
//自定义门店汇总
const userDefined=url+'rest/sales/branch/custom'
//本日产品汇总
const item=url+'rest/sales/item/day'
//本周产品汇总
const weekend=url+'rest/sales/item/week'
//本月产品汇总
const moon=url+'rest/sales/item/month'
//本季度产品汇总
const account=url+'rest/sales/item/quarter'
//自定义产品汇总
const custom=url+'rest/sales/item/custom'


module.exports={
   supcust:supcust,
   mobile:mobile,
   register:register,
   openId:openId,
   code:code,
   day: day,
   week:week,
   month:month,
   quarter:quarter,
  branch: branch,
  sales: sales,
  rest: rest,
  item: item,
  weekend: weekend,
  moon: moon,
  quarterly: quarterly,
  account: account,
  userDefined: userDefined,
  custom: custom,
  stom: stom
}
