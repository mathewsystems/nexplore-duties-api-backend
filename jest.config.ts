import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
      "**/?(*.)+(spec|test).[j]s?(x)"
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};

export default config;