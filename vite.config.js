import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig(({ mode }) => {
    if (mode === 'development') {
        return {
            plugins: [
                react({
                    babel: {
                        plugins: ['babel-plugin-styled-components'],
                    },
                }),
            ],
        };
    }

    return {
        plugins: [react()],
    };
});
