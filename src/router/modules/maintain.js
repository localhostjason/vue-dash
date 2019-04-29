import Layout from '@/components/Layout'

const maintainRouter = {
  path: '/maintain',
  component: Layout,
  redirect: '/maintain/sync',
  name: 'Maintain',
  meta: {
    title: 'maintain',
    icon: 'wrench'
  },
  children: [
    {
      path: 'sync',
      component: () => import('@/views/maintain/sync'),
      name: 'Sync',
      meta: {
        title: 'sync',
        icon: 'loop',
      }
    },
    {
      path: 'bak',
      component: () => import('@/views/maintain/bak'),
      name: 'Bak',
      meta: {
        title: 'bak',
        icon: 'copywriting',
      }
    },
    {
      path: 'water',
      component: () => import('@/views/maintain/water'),
      name: 'Water',
      meta: {
        title: 'water',
        icon: 'key'
      }
    },
  ]
};
export default maintainRouter
