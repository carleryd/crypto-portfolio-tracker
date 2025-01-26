"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type WalletStateType = {
  test: string | null;
  createTest: () => void;
};

const WalletStateContext = createContext<WalletStateType | undefined>(
  undefined,
);

export const WalletStateProvider = ({ children }: { children: ReactNode }) => {
  const [test, setTest] = useState<string | null>(null);

  const createTest = useCallback(() => {
    setTest("hello test");
  }, [setTest]);

  return (
    <WalletStateContext.Provider value={{ test, createTest }}>
      {children}
    </WalletStateContext.Provider>
  );
};

export const useWalletState = () => {
  const context = useContext(WalletStateContext);

  if (!context)
    throw new Error("useWalletState must be used within WalletStateProvider");

  return context;
};
