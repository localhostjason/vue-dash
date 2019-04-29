import Layout from '@/components/Layout'

const selectRouter = {
  path: '/snapshot',
  component: Layout,
  redirect: '/snapshot/assets',
  name: 'Select',
  meta: {
    title: 'select',
    icon: 'magnifying-glass'
  },
  children: [
    {
      path: 'assets',
      component: () => import('@/views/select/assets'),
      name: 'AssetStatus',
      meta: {
        title: 'assetStatus',
        icon: 'shield'
      }
    },
    {
      path: 'list',
      component: () => import('@/views/select/snapShot/index'),
      name: 'Snapshot',
      meta: {
        title: 'snapShot',
        icon: 'clipboard'
      }
    }
  ]
};
export default selectRouter
