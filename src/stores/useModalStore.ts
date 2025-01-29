import { create } from "zustand";

type State = {
  isOpen: boolean;
  content: React.ReactNode | null;
  open: (view: () => React.ReactNode) => void;
  close: () => void;
};

export const useModalStore = create<State>((set) => ({
  isOpen: false,
  content: null,
  open: (view) => set({ isOpen: true, content: view() }),
  close: () => set({ isOpen: false, content: null }),
}));
