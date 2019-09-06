const NPM_RUN_TARGET = process.env.npm_lifecycle_event;

const COMMON_CONFIG = {
  verbose: true,
};

// AVA configurations keyed by the `npm run` target
const AVA_CONFIGS = {
  'test-functional': {
    ...COMMON_CONFIG,
    files: [
      'test/functional/**',
    ],
  },
  'test-integration': {
    ...COMMON_CONFIG,
    files: [
      'test/integration/**',
    ],
  },
  'test-unit': {
    ...COMMON_CONFIG,
    files: [
      'test/unit/**',
    ],
  },
};

const defaultConfig = {
  ...COMMON_CONFIG,
  files: [
    'test/unit/**',
  ],
};

export default AVA_CONFIGS[NPM_RUN_TARGET] || defaultConfig;
