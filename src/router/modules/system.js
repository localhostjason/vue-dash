import Layout from '@/components/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/export_or_import',
  name: 'System',
  meta: {
    title: 'system',
    icon: 'nested',
  },
  children: [
    {
      path: 'export_or_import',
      component: () => import('@/views/system/export_or_import'),
      name: 'EI',
      meta: {
        title: 'export_or_import',
        icon: 'link'
      }
    },
    {
      path: 'license',
      component: () => import('@/views/system/license/license'),
      name: 'License',
      meta: {
        title: 'license',
        icon: 'lock'
      }
    }
  ]
};

export default systemRouter
