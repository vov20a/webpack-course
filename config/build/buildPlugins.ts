import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import webpack, { Configuration, DefinePlugin, } from "webpack";
import { BuildOptions } from "./types/types";
import path from "path";

export function buildPlugins({ mode, paths, analyzer, platform }: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            //  template: path.resolve(__dirname, 'public', 'index.html') 
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new DefinePlugin({
            __PLARFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }),
    ]
    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ForkTsCheckerWebpackPlugin());//для ускоренной сборки при ошибке typescript
        plugins.push(new ReactRefreshWebpackPlugin());//для ускоренной сборки при ошибке typescript
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        })),
            plugins.push(new CopyPlugin({
                patterns: [
                    { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') }
                ]
            }))
    }
    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin.BundleAnalyzerPlugin())
    }

    return plugins
}