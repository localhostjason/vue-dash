import Layout from '@/components/Layout'

const userRouter = {
  path: '/user',
  component: Layout,
  name: "User",
  redirect: 'list',
  meta: {
    title: '用户信息',
    icon: 'list'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user'),
      name: 'UserList',
      meta: {
        title: '用户信息',
        icon: 'list'
      }
    },
    {
      path: 'list2',
      component: () => import('@/views/user'),
      name: 'UserList2',
      meta: {
        title: '用户信息2',
        icon: 'list'
      }
    }
  ]
};

export default userRouter
