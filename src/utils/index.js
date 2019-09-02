import _ from 'lodash'


export function resetForm(obj) {
  return _.reduce({...obj}, (result, value, key) => {
    result[key] = _.isArray(value) ? [] : null;
    return result
  }, {});
}

export function getIdFormArray(val, field = 'id') {
  let result = [];
  if (val && val.length) {
    for (const v of val) {
      result.push(v[field])
    }
  }
  return result
}


export function dateFormat(fmt, date = null) {
  let _this = date ? new Date(date) : new Date();
  const o = {
    "M+": _this.getMonth() + 1, "d+": _this.getDate(),
    "h+": _this.getHours(),
    "m+": _this.getMinutes(),
    "s+": _this.getSeconds(),
    "q+": Math.floor((_this.getMonth() + 3) / 3),
    "S": _this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


export const pickerOptions = {
  // disabledDate: (time) => {
  //   return time.getTime() > new Date()
  // },
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        const end = new Date();
        const start = new Date(new Date().toDateString());
        end.setTime(start.getTime());
        picker.$emit('pick', [start, end])
      }
    },
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
};

// 重置 filter 按钮
export function transformFilter(argsQuery, time_field_range = null) {
  const filters = {...argsQuery};

  // extra 处理时间
  if (time_field_range) {
    if (filters[time_field_range] && _.isArray(filters[time_field_range])) {
      const start_time = {};
      start_time[time_field_range] = `>='${filters[time_field_range][0]}'`;

      const end_time = {};
      end_time[time_field_range] = `<='${filters[time_field_range][1]}'`;

      filters['and_'] = [start_time, end_time]
    }
    delete filters[time_field_range]
  }

  for (const [key, val] of Object.entries(filters)) {
    if (_.trim(val) === '' || _.trim(val) === null) {
      delete filters[key]
    }
  }
  return filters
}


export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null
    }

    return result
  }
}


export function getEnumName(value) {
  let all_ = [];
  if (!all_.length) return '';

  let result = {};
  for (const info of all_) {
    result[info.value] = info.label
  }

  return result[value] || ''
}


export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  });
  return targetObj
}


export const pickerOptions2 = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      picker.$emit('pick', new Date());
    }
  }, {
    text: '昨天',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  }, {
    text: '一周前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }]
}
