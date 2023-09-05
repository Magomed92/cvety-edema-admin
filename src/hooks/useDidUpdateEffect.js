import { useRef, useEffect } from 'react';

const useDidUpdateEffect = (fn, deps) => {
  const didMountRef = useRef(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    } else {
      didMountRef.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidUpdateEffect;
