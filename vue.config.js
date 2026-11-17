module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },

  chainWebpack: config => {
    // Keep CLI 4's internal PostCSS 7 dependencies isolated. Only the application's
    // CSS pipeline uses the Webpack 4-compatible PostCSS 8 loader.
    for (const language of ['css', 'postcss']) {
      for (const variant of ['vue-modules', 'vue', 'normal-modules', 'normal']) {
        config.module.rule(language).oneOf(variant).use('postcss-loader')
          .loader(require.resolve('postcss-loader'))
          .options({
            postcssOptions: {
              config: false,
              plugins: [require('tailwindcss'), require('autoprefixer')]
            }
          })
      }
    }
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
