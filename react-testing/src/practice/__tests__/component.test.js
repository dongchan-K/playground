import React from 'react';

// REST API 목업을 위한 패키지
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Component from 'practice/Component';

// 목업 API 정의
const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello world!' }));
  })
);

// 테스트 시작 전에 목업 API 설정
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

// 테스트가 종료되면 정리
afterAll(() => server.close());

test('hello wolrd!를 표시합니다.', async () => {
  // render 메서드는 리액트 엘리먼트를 DOM에 렌더링
  render(<Component url='/greeting' />);

  // fireEvent 프로퍼티는 이벤트를 사용가능하게 함
  fireEvent.click(screen.getByText('데이터 가져오기'));

  // waitFor 메서드는 콜백이 오류를 던지지 않을때까지 대기
  await waitFor(() => {
    // getByRole 메서드는 요소를 찾지 못하면 오류를 발생시킴
    return screen.getByRole('heading');
  });

  expect(screen.getByRole('heading')).toHaveTextContent('hello world!');
  expect(screen.getByRole('button')).toBeDisabled();
});

test('서버 에러', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Component url='/greeting' />);

  fireEvent.click(screen.getByText('데이터 가져오기'));

  await waitFor(() => {
    return screen.getByRole('alert');
  });

  expect(screen.getByRole('alert')).toHaveTextContent('데이터 요청에 실패했습니다.');
  expect(screen.getByRole('button')).not.toBeDisabled();
});
