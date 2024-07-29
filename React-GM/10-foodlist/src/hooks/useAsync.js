import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    // ...args 파라미터로 받는 문법
    try {
      setError(null);
      setPending(true);
      // 함수 선언문의 파라미터를 받는 것보다 호출하는 파라미터의 수가 많을 때
      //  ...args(arguments)는 호출된 남는 파라미터가 배열로 나온다.
      //   ex) function *** (a, b, ...args) { }
      return await asyncFunction(...args);
      // ...args 스프레드 연산자
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}
export default useAsync;
