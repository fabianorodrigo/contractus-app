const path = require('path');
const visualizer = require('webpack-visualizer-plugin');

module.exports = {
    mode: 'production',
    entry: ['./src/client/index.tsx'],
    output: {
        path: __dirname + '/public/js/',
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.js',
    },
    // Enable sourcemaps for debugging webpack's output.
    //devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [new visualizer()],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: [path.resolve(__dirname, 'src/client'), path.resolve(__dirname, 'src/commonLib')],
                exclude: /(node_modules|repositories|datasources|controllers|dist|__tests__)/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            /*{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },*/
        ],
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    target: 'web',
    externals: [
        {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
        //externalForMaterialUi,
    ],
};

//TODO: A inclusão da função abaixo foi suficiente para remover as bibliotecas da material-ui do bundle
// mas tem que copiar todos os JS's dentro de node_modules/@material-ui/***  e referenciá-los no HTML
// Pensar depois como que utilizamos a importação dinâmica pois fica automatizado:  https://mariusschulz.com/blog/dynamic-import-expressions-in-typescript
// Enquanto isso, nosso bundle fica com quase 1 MB
/*
function externalForMaterialUi(context, request, callback) {
    if (/@material-ui.+/.test(request)) {
        const name = request.replace(/^.*[\\\/]/, '');
        return callback(null, 'root MaterialUI.' + name);
    }
    callback();
}
*/
