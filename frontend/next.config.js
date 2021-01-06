const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  }
})

module.exports = {
  env: {
    key_jwt: 'Y2hhdmFwYXJhY3JpcHRvZ3JhZmlhZG9mbG93cG9kY2FzdA=='
  }
}