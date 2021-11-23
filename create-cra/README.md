# CRA 없이 리액트 환경 세팅

## babel

브라우저 호환성을 위해 트랜스파일링을 해주는 바벨 패키지 설치

```js
// 개발 환경에서만 사용하기 때문에 -D 옵션으로 설치

@babel/core // 바벨 코어
@babel/preset-env // ES6+ => ES5로 트랜스파일링
@babel/preset-react // 리액트의 JSX를 트랜스파일링
```

.babelrc 파일에 설정을 추가할 수 있다.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## webpack

웹팩 핵심 패키지 설치

```json
webpack // 웹팩 코어
webpack-cli // 웹팩을 커맨드라인에서 사용 가능하게 함
webpack-dev-server // 웹팩을 개발 서버에서 구동 가능하게 함
```

로더(Loader)는 웹팩이 자바스크립트가 아닌 파일(HTML, CSS, Image 등..)을 변환할 수 있게 돕는다.

```json
// 기본적인 로더 설치
npm i -D babel-loader css-loader file-loader
```

웹팩을 번들링 한 후에 적용할 플러그인 설치

```json
html-webpack-plugin // 웹팩으로 빌드한 결과물로 HTML 파일을 생성
clean-webpack-plugin // 번들링 할때마다 이전 번들링 결과를 제거
```

webpack.config.js 파일에 설정을 추가할 수 있다.

```js
module.exports = {
  entry: {
    main: './src/index.js',
  },
};
```
