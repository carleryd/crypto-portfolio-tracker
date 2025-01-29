import { create } from "zustand";

type State = {
  isOpen: boolean;
  content: React.ReactNode | null;
  open: (content: React.ReactNode) => void;
  close: () => void;
};

export const useModalStore = create<State>((set) => ({
  isOpen: false,
  content: null,
  open: (content) => set({ isOpen: true, content }),
  close: () => set({ isOpen: false, content: null }),
}));
