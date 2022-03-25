import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import pkg from "./package.json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import copy from "rollup-plugin-copy";
import path from "path";

const extensions = [".js", ".jsx", ".ts", ".tsx"]; // 어떤 확장자를 처리 할 지 정함

// babel-preset-react-app를 사용한다면 BABEL_ENV를 필수로 설정해야함.
process.env.BABEL_ENV = "production";

export default {
  input: "dist/index.js", // 어떤 파일부터 불러올지 정함.
  plugins: [
    peerDepsExternal() /* peerDependencies로 설치한 라이브러리들을 external 모듈로 설정
                               즉, 번들링된 결과에 포함시키지 않음 */,
    nodeResolve({ extensions }), // node_modules 에서 모듈을 불러올 수 있게 해줌. ts/tsx 파일도 불러올 수 있게 해줌
    commonjs(), // CommonJS 형태로 만들어진 모듈도 불러와서 사용 할 수 있게 해줌. 현재 프로젝트 상황에서는 없어도 무방함
    babel({
      extensions,
      include: ["../src/navigation/**/*"],
      runtimeHelpers: true,
    }), // Babel을 사용 할 수 있게 해줌
    url(), // 미디어 파일을 dataURI 형태로 불러와서 사용 할 수 있게 해줌.
    copy({
      targets: [
        { src: path.resolve(__dirname, "../README.md"), dest: "build" },
        { src: path.resolve(__dirname, "../LICENSE"), dest: "build" },
        { src: path.resolve(__dirname, "./package.json"), dest: "build" },
      ],
    }),
  ],
  output: [
    {
      file: `build/${pkg.main}`,
      format: "cjs",
      exports: "named",
      name: "tmmoond8_t-frame",
      sourcemap: true,
    },
    {
      file: `build/${pkg.module}`, // 번들링한 파일을 저장 할 경로
      format: "es", // ES Module 형태로 번들링함
    },
  ],
};
