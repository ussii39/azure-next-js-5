// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
//   },
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    // モジュールの名前置換を設定（必要に応じて）
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json", // TypeScriptのコンパイラオプションを設定
    },
  },
};
