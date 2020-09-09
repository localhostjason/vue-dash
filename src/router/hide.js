import Layout from '@/components/Layout'

const hideRouter = [
  // 用户信息
  {
    path: '/user',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'info',
        component: () => import('@/views/userInfo'),
        name: 'SelfUserInfo',
        meta: {
          title: '个人信息',
          icon: 'list',
        }
      }
    ]
  },
];
export default hideRouter
