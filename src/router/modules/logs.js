import Layout from '@/components/Layout'

const logsRouter = {
  path: '/logs',
  component: Layout,
  redirect: '/logs/security',
  name: 'Logs',
  meta: {
    title: 'logs',
    icon: 'layers'
  },
  children: [
    {
      path: 'security',
      component: () => import('@/views/logs/security'),
      name: 'SecurityLog',
      meta: {
        title: 'securityLog',
        icon: 'file'
      }
    },
    {
      path: 'run',
      component: () => import('@/views/logs/run'),
      name: 'RunLog',
      meta: {
        title: 'runLog',
        icon: 'international'
      }
    }
  ]
};
export default logsRouter
