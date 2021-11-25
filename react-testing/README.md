# Testing

## Jest

Jest는 JavaScript 테스트를 위한 프레임워크로써 단위 테스트 또는 통합 테스트에 적합하며 테스트에 필요한 기능을 제공하기 때문에 별다른 추가 패키지 설치가 필요 없고 비교적 쉬운 사용법을 갖는다는 장점이 있다.

CRA로 생성된 React 프로젝트는 자동으로 Jest가 설치되며, 스냅샷 테스트를 위한 `react-test-renderer` 패키지만을 필요에 따라 추가하면 된다.

기본적으로 아래와 같은 파일들을 테스트 파일로 인식하고 실행한다.

- `__tests__` 디렉토리 내부의 파일
- `.test.js` 으로 끝나는 파일
- `.spec.js` 으로 끝나는 파일

jest.conf.js 파일을 생성해 추가 옵션을 설정할 수 있다.

`@types/jest` 패키지를 설치하거나 jsconfig.json 파일에 다음과 같은 설정을 추가하여 Jest 자동완성 기능을 사용할 수 있다.

```
"typeAcquisition": { "include": ["jest"] },
```

### Jest Basic

test 또는 it 메서드는 테스트를 실행하는 메서드로서 첫번째 인수로 테스트 이름을 갖고 두번째 인수로 테스트 할 함수를 갖는다.

expect 메서드는 값을 테스트할 때 사용하며 toXXX 메서드는 matcher 함수로서 기댓값을 갖는다.

matcher 함수앞에 not 프로퍼티를 사용하면 실패 결과를 테스트할 수 있다.

```js
test('1 더하기 2는 3이다.', () => {
  expect(1 + 2).toBe(3);
});

test('1 더하기 1은 3이 아닙니다.', () => {
  expect(1, 1).not.toBe(3);
});
```

## React Testing Library

React Testing Library는 React 컴포넌트를 테스트하기 위해 만들어진 라이브러리이다.

테스트를 렌더링할 때 React 컴포넌트의 인스턴스가 아닌 실제 DOM을 사용한다. 따라서 사용자가 애플리케이션을 실행하는 실제 환경과 유사하게 테스트 케이스가 실행되기 때문에 신뢰할 수 있다.

React Testing Library는 다음 사항을 테스트하지 않도록 권장한다.

- 컴포넌트 내부의 상태
- 컴포넌트 내부의 메서드
- 컴포넌트의 생명주기 메서드
- 자식 컴포넌트
