Vue.use(VueI18n);

const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'zh-CN': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
          year: 'numeric', month: 'long', day: '2-digit',
          weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true
    }
  },
  'ja-JP': {
    short: {
      year: '2-digit', month: 'narrow', day: '2-digit'
    },
    long: {
          year: '2-digit', month: 'narrow', day: '2-digit',
          weekday: 'narrow', hour: '2-digit', minute: '2-digit', hour12: false
    }
  }
}

const numberFormats = {
  'en-US': {
    decimal: {
      style: 'decimal'
    },
    currency: {
      style: 'currency', currency: 'USD'
    },
    percent: {
      style: 'percent'
    }
  },
  'zh-CN': {
    decimal: {
      style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 2
    },
    currency: {
      style: 'currency', currency: 'CNY', currencyDisplay: 'name'
    },
    percent: {
      style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2
    }
  },
  'ja-JP': {
    decimal: {
      style: 'decimal', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 4, useGrouping: false
    },
    currency: {
      style: 'currency', currency: 'JPY', currencyDisplay: 'symbol', useGrouping: false
    },
    percent: {
      style: 'percent', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 4, useGrouping: false
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  fallbackLocale: 'en-US',
  dateTimeFormats,
  numberFormats
});


var app = new Vue({
  el: '#app',
  i18n, //In IE, you have to write like this... i18n: i18n
  created: function () {
    var vm = this;
    vm.$i18n.locale = 'zh-CN';
  }
})