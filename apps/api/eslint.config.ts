import path from "path";
import { nestJsConfig } from "@repo/eslint-config/nest-js";
import type { Linter } from "eslint";

const config: Linter.Config[] = [
  ...nestJsConfig,
  {
    ignores: ["eslint.config.ts"]
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.resolve(__dirname)
      }
    }
  }
];

export default config;
