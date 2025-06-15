'use client';

import { useState } from 'react';

type AsyncCallback<Args extends unknown[] = [], Return = void> = (
  ...args: Args
) => Promise<Return>;

type UseAsyncRunnerParams<Args extends unknown[], Return> = {
  action: AsyncCallback<Args, Return>;
};

function useAsyncRunner<Args extends unknown[], Return>({
  action,
}: UseAsyncRunnerParams<Args, Return>) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [data, setData] = useState<Return | null>(null);
  const [error, setError] = useState<unknown>(null);

  const run = async (...args: Args): Promise<Return | undefined> => {
    setIsPending(true);
    setIsSuccess(false);
    setIsFailure(false);
    setData(null);
    setError(null);

    try {
      const result = await action(...args);
      setData(result);
      setIsSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      setIsFailure(true);
      return undefined;
    } finally {
      setIsPending(false);
    }
  };

  return {
    run,
    isPending,
    isSuccess,
    isFailure,
    data,
    error,
  };
}

export { useAsyncRunner };
