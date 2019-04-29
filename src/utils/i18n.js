import i18n from '@/lang'
import selfish from './class'

class Utilil8n {
  constructor() {
    this.i18n_t = (key, value) => i18n.t(key, value)
  }

  static generateRouteTitle(title) {
    const hasKey = this.$te('route.' + title);
    const translatedTitle = this.$t('route.' + title);// $t :this method from vue-i18n, inject in @/lang/index.js

    if (hasKey) {
      return translatedTitle
    }
    return title
  }

  trans(type, title) {
    const hasKey = this.i18n_t(type + '.' + title);
    const translatedTitle = this.i18n_t(type + '.' + title);

    if (hasKey) {
      return translatedTitle
    }
    return title
  }
}

const util_il8n = selfish(new Utilil8n());

const generateTitle = Utilil8n.generateRouteTitle;
const trans = util_il8n.trans;

export {generateTitle, trans}
