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

```
webpack // 웹팩 코어
webpack-cli // 웹팩을 커맨드라인에서 사용 가능하게 함
webpack-dev-server // 웹팩을 개발 서버에서 구동 가능하게 함
```

로더(Loader)는 웹팩이 자바스크립트가 아닌 파일(HTML, CSS, Image 등..)을 변환할 수 있게 돕는다.

```
// 기본적인 로더 설치
npm i -D babel-loader css-loader file-loader
```

웹팩을 번들링 한 후에 적용할 플러그인 설치

```
html-webpack-plugin // 웹팩으로 빌드한 결과물로 HTML 파일을 생성
clean-webpack-plugin // 번들링 할때마다 이전 번들링 결과를 제거
```

webpack.config.js 파일에 설정을 추가할 수 있다.

예시를 통해 webpack 주요 설정들을 알아보자

```js
module.exports = {
  // 번들링 될 진입점을 설정 => SPA일 경우 하나의 진입점
  entry: './src/index.js',

  // 모듈이 처리되는 방식을 설정
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 프로젝트 내의 다양한 유형의 모듈이 처리(해석, 변환 등)되는 방식을 설정
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader', // 로더가 1개 이상이라면 use 프로퍼티에 배열로 추가
        options: { presets: ['@babel-preset-env'] },
      },
    ],
  },

  // 번들링 결과물에 대한 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // 웹팩의 기본 동작에 추가적인 기능을 제공하는 설정 => 생성자 함수 형태로 배열에 추가한다.
  plugins: [
    // 번들링 할때마다 이전 번들링 결과를 제거 해주는 플러그인
    new CleanWebpackPlugin(),
    // 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
    new HtmlWebpackPlugin({
      template: `./public/index.html`, // 번들링 파일을 주입하고 번들링 폴더로 복사할 대상 HTML 파일
    }),
  ]

  // webpack-dev-server에 대한 설정
  devServer: {
    port: 3000,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
```
