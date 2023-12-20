import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";



export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const { mode, paths } = options

    const isDev = mode === 'development';
    return {

        mode: options.mode ?? 'development',
        // entry: path.resolve(__dirname, 'src', 'index.tsx'),
        entry: paths.entry,
        output: {
            // path: path.resolve(__dirname, 'build'),
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },

        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined,


    }
}