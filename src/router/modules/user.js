import Layout from '@/components/Layout'

const userRouter = {
  path: '/user',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/user'),
      name: 'User',
      meta: {
        title: '用户信息',
        icon: 'list',
      }
    }
  ]
};

export default userRouter
