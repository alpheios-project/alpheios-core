module.exports = {
  presets: [['@babel/preset-env', {
    targets: {
      node: 'current',
      chrome: '64',
      edge: '79',
      firefox: '67',
      safari: '11.1'
    }
  }]],
};