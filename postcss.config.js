module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ["*", "!font-size"]
      // 对font-size不转化为rem
    }
  }
}
