const modules = {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(jpg|jpeg|png|svg)$/,
      use: ['file-loader'],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
  ],
};

module.exports = { modules };
