module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [["nativewind/babel"],
            [
               'module-resolver',
               {
                 root: ['./src'],
                 extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json','.jsx'],
                 alias: {
                   tests: ['./tests/'],
                   "@components": "./src/components",
                 }
               }
            ]
          ]
        
    };
  };