const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/weather_app.js',
    output:{
        filename:'main.js',
        path: path.resolve(__dirname,'dist'),
        clean:true,
    },
    plugins:[
        new HtmlWebpackPlugin(
            {
                template:'./src/weather_app.html'
            }
        )
    ],
    module:{
        rules:[
            {
                test:/\.html$/i,
                loader:'html-loader'
            },
            {
                test:/\.css$/i,
                use:['style-loader','css-loader'],
            },
            {
                test:/\.(png)$/i,
                type:'asset/resource'
            }
        ]
    }
}

