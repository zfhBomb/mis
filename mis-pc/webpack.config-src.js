var webpack=require('webpack');
var path = require('path');
//强制不加载第三方库配置
//var node_modules_dir = path.join(__dirname, 'node_modules');
//var deps = [
//				'react/dist/react.min.js',
//				'react-dom/dist/react-dom.min.js',
//				'redux/dist/redux.min.js',
//				'react-redux/dist/react-redux.min.js'
//			];

var config = {
    //entry: "./js/entry.js",
    entry: {
   		bundle: "./js/index.js",
   		//抽取第三方库出来
      	vendor: ['react','react-dom','react-router','reflux']
  	},
  	//强制不加载第三方库配置
//	resolve: {
//      alias: {}
//  },
    output: {
        path: "./html",
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    plugins:[
    	//抽取多个入口文件的公共文件
    	//new webpack.optimize.CommonsChunkPlugin("common.js")
    	//抽取第三方库生成一个文件
    	new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    	//生产环境使用
//  	new webpack.optimize.UglifyJsPlugin({
//    		compress: {
//      		warnings: false
//    		}
//  	})
    ],
    //从HTML读取第三方库
//  externals: {
//   'react': 'React',
//   'react-dom':'ReactDOM'
//	},
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            //{ test: /\.js$/, loader: "jsx-loader"},
            //{ test: /\.js$/, loader:'jsx!babel' }
            { test: /\.(js|jsx)$/, loaders: ['babel?presets[]=react,presets[]=es2015'] }
        ],
        //强制不加载第三方库配置
//      noParse: []
    }
   
};
//循环强制不加载库的列表
//deps.forEach(function (dep) {
//var depPath = path.resolve(node_modules_dir, dep);
//config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//config.module.noParse.push(depPath);
//});

module.exports = config;


/* var webpack=require('webpack');
 * module.exports = {
    entry: {
    	app:"./js/entry.js",
    	app2:"./js/entry2.js"
    }
    output: {
        path: __dirname,
        filename: "[name].js"   输出文件名称和入口一样
    },
    //把多个文件的共同重复部分抽出来放在common.js里
    plugins:[
    	new webpack.optimize.CommonsChunkPlugin("common.js")
    ]
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};*/