const menuList = [
    {
        title:'登录注册',
        key:'/doLogin',
        children: [
          {
            title: '登录',
            key: '/doLogin/login'
          },
          {
            title: "注册",
            key: '/doLogin/register'
          }
        ]
    },
    {
        title: '用户管理',
        key: '/user'
    },
    {
        title: '订单管理',
        key: '/order',
        children: [
            {
                title: '未付款',
                key: '/order/nopay',
            },
            {
                title: '已付款',
                key: '/order/pay',
            },
            {
                title: '已经结束',
                key: '/order/finish',
            }
        ]
    },
    {
        title: '员工系统',
        key: '/employee',
        children: [
            {
                title: '工作人员',
                key: '/employee/common',
            },
            {
                title: '管理员',
                key: '/employee/root',
            }
        ]
    },
    {
        title: '商品管理',
        key: '/commodity', 
    },
    {
        title: '账单记录',
        key: '/profit'
    },
];
export default menuList;