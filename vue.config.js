module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(options => {
        // Terser 1.x hard-codes MD4 for its disk cache; Node 22 disables MD4.
        // Keep minification enabled without requiring OpenSSL's legacy provider.
        options[0].cache = false
        return options
      })
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
}
