import { create } from "zustand";

import type { NetworkErrorStoreInterface } from "@/interfaces";

export const useNetworkErrorStore = create<NetworkErrorStoreInterface>((set) => ({
    hasNetworkError: false,
    onClearNetworkError: () => set({ hasNetworkError: false }),
    onSetNetworkError: () => set({ hasNetworkError: true }),
}));
