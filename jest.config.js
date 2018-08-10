// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    collectCoverageFrom: [
        "**/*.ts",
    ],
    coverageDirectory: "coverage",
    coverageReporters: [
        "html",
        "text-summary"
    ],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 75,
            functions: 100,
            lines: 100,
        },
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    testEnvironment: "node",
    testMatch: [
        "<rootDir>/test/**/*\\.test\\.ts"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
};
