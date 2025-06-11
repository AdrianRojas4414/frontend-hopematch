import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://hopematch.publicvm.com',
    setupNodeEvents(on, config) {
    },
  },
});
