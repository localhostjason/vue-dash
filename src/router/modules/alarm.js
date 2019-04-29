import Layout from '@/components/Layout'

const alarmRouter = {
  path: '/alarm',
  component: Layout,
  redirect: '/alarm/notification',
  name: 'Alarm',
  meta: {
    title: 'alarm',
    icon: 'list'
  },
  children: [
    {
      path: 'notification',
      component: () => import('@/views/alarm/index'),
      name: 'AlarmNotification',
      meta: {
        title: 'alarmNotification',
        icon: 'email'
      }
    },
    {
      path: 'filter',
      component: () => import('@/views/alarm/filter/index'),
      name: 'AlarmFilter',
      meta: {
        title: 'alarmFilter',
        icon: 'component'
      }
    },
    {
      path: 'alarm_list',
      component: () => import('@/views/alarm/log/index'),
      name: 'AlarmLog',
      meta: {
        title: 'alarmLog',
        icon: 'list-rich'
      }
    },
  ]
};
export default alarmRouter
