import Layout from '@/components/Layout'

const userRouter = [{
  path: '/user',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'info',
      component: () => import('@/views/userInfo'),
      name: 'SelfUserInfo',
      meta: {
        title: 'userInfo',
        icon: 'cloud-download',
      }
    }
  ]
}
];

export default userRouter
