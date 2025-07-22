import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import WebpackRemoteTypesPlugin from 'webpack-remote-types-plugin';

export default defineConfig({
    moduleFederation: {
        options: {
            name: 'devteam_tool',
            shared: [
                'react',
                'react-dom',
                '@emotion/react',
                '@emotion/styled',
                'framer-motion',
                '@chakra-ui/react',
            ],
            remotes: {
                de_common_ui:
                    'de_common_ui@https://dev.originaec.app/common/remoteEntry.js',
                de_origin: 'de_origin@https://dev.originaec.app/remoteEntry.js',
            },
        },
    },
    plugins: [pluginReact(), pluginSass()],
    tools: {
        rspack: {
            plugins: [
                new WebpackRemoteTypesPlugin({
                    remotes: {
                        // Required. !! Note: underscores for `name_space` and hyphens for `app-name` !!
                        de_common_ui:
                            'de-common-ui@https://dev.originaec.app/common/remoteEntry.js',
                        de_origin:
                            'de-origin@https://dev.originaec.app/remoteEntry.js',
                    },
                    outputDir: 'remote-types',
                    remoteFileName: '[name]-dts.tgz',
                }),
            ],
        },
    },
    html: {
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/app/index.tsx',
        },
        define: {
            'process.env.API_ADDRESS': JSON.stringify(process.env.API_ADDRESS),
        },
    },
});
