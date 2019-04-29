import Layout from '@/components/Layout'

const statusRouter = {
  path: '/status',
  component: Layout,
  name: 'Status',
  redirect: '/status/servers',
  meta: {
    title: 'status',
    icon: 'chart'
  },
  children: [
    {
      path: 'servers',
      component: () => import('@/views/status/serversTopo'),
      name: 'ServerStatus',
      meta: {
        title: 'serverStatus',
        icon: 'monitor'
      }
    },
    {
      path: 'file_assets_count',
      component: () => import('@/views/status/fileAssetCount'),
      name: 'FileAssetStatusCount',
      meta: {
        title: 'fileAssetStatusCount',
        icon: 'documentation'
      }
    },
    {
      path: 'file_assets_topo',
      component: () => import('@/views/status/assetsTopo'),
      name: 'FileAssetStatusToPo',
      meta: {
        title: 'fileAssetStatusToPo',
        icon: 'fork'
      }
    },
    {
      path: 'sync',
      component: () => import('@/views/status/sync'),
      name: 'SyncStatus',
      meta: {
        title: 'syncStatus',
        icon: 'transfer'
      }
    },
  ]
};
export default statusRouter
