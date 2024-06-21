import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    roots: ["<rootDir>/src/", "<rootDir>/tests/"],
    verbose: true,
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};

export default config;