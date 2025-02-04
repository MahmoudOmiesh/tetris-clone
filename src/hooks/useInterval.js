import { useRef, useEffect } from 'react';

export function useInterval(callback, delay) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    if (delay == 0) {
      callbackRef.current();
      return;
    }

    const intervalID = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(intervalID);
  }, [delay]);
}
