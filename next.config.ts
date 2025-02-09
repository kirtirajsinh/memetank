// webpack.config.js
module.exports = {
  //...
  externals: {
    ['@solana/web3.js']: 'commonjs @solana/web3.js',
  },
};

// next.config.js
module.exports = {
  webpack: (config: { externals: { [x: string]: string; }; }) => {
    // ...
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js';
    return config;
  },
};