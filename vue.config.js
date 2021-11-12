module.exports = {
  lintOnSave: true,
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:9999',
        ws: true,
        changeOrigin: true
      },
  }
};
