import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    ".(ts|tsx)": "@swc/jest",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
