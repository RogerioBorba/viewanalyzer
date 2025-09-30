import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
    host: '0.0.0.0',
    port: 5173
  },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
};

export default config;
