import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
    plugins: [pluginReact(), pluginSass()],
    html: {
        template: './index.html',
    },
    source: {
        entry: {
            index: './src/index.tsx',
        },
        define: {
            'process.env.API_ADDRESS': JSON.stringify(process.env.API_ADDRESS),
        },
    },
});
