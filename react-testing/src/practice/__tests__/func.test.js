import func from 'practice/func';

test('1 더하기 1은 2입니다.', () => {
  expect(func.sum(1, 1)).toBe(2);
});

test('1 더하기 1은 3이 아닙니다.', () => {
  expect(func.sum(1, 1)).not.toBe(3);
});

test('성과 이름을 갖는 객체를 비교합니다.', () => {
  expect(func.makeUser('dongchan', 'kim')).toEqual({
    firstName: 'dongchan',
    lastName: 'kim',
  }); // toEqual 메서드는 객체나 배열을 재귀적으로 테스트한다.
});
