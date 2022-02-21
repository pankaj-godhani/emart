module.exports = {
  devServer: {
    proxy: 'https://api.trevy.ai/nichesuite-webservices/service/user/accounts/getChoiceListForCountry',
  },
  lintOnSave: true,
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },

}
