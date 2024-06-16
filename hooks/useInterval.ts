import React, {useState, useEffect, useRef} from 'react';

export default function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Запоминаем последний callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Устанавливаем интервал
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
