import { useEffect, useState, type DependencyList } from 'react';

interface AsyncDataState<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

export function useAsyncData<T>(loader: () => Promise<T>, fallback: T, dependencies: DependencyList = []) {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: fallback,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    setState((current) => ({ ...current, loading: true, error: null }));

    loader()
      .then((data) => {
        if (active) {
          setState({ data, error: null, loading: false });
        }
      })
      .catch(() => {
        if (active) {
          setState({ data: fallback, error: '远程数据暂时不可用，已切换到本地内容。', loading: false });
        }
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
