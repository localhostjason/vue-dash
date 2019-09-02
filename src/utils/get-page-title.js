import defaultSettings from '@/settings'

const title = defaultSettings.title || 'iGuard6';

export default function getPageTitle(key) {
  if (key) {
    return `${key} - ${title}`
  }
  return `${title}`
}
