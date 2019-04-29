import Layout from '@/components/Layout'

const deployRouter = {
  path: '/deploy',
  component: Layout,
  redirect: '/deploy/servers',
  name: 'Deploy',
  meta: {
    title: 'deploy',
    icon: 'cog'
  },
  children: [
    {
      path: 'servers',
      component: () => import('@/views/deploy/servers'),
      name: 'Servers',
      meta: {
        title: 'servers',
        icon: 'cloudy',
        noCache: true,
      }
    },
    {
      path: 'sites',
      component: () => import('@/views/deploy/sites'),
      name: 'Sites',
      meta: {
        title: 'sites',
        icon: 'tree',
        noCache: true,
      }
    },
    {
      path: 'assets',
      component: () => import('@/views/deploy/assets'),
      name: 'Assets',
      meta: {
        title: 'assets',
        icon: 'grid-four-up',
        noCache: true,
      }
    },
    {
      path: 'protection_parameter',
      component: () => import('@/views/deploy/manageModule'),
      name: 'ProtectionParameter',
      meta: {
        title: 'protection_parameter',
        icon: 'nested',
        noCache: true,
      }
    }
  ]
};
export default deployRouter
