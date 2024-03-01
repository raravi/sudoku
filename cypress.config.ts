import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'sbm9u6',
  e2e: {
    baseUrl: 'https://DanMBonneville.github.io/sudoku',
    // baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
