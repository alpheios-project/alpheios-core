module.exports = {
  ident: 'postcss-loader',
  parser: 'postcss-scss',
  plugins: {
    'postcss-safe-important': {
      decls: ['display', 'grid-template-columns']
    }
  }
}
