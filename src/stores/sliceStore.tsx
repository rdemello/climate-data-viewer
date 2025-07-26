import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ImmerStateCreator<T> = StateCreator<
    T,
    [['zustand/immer', never], never],
    [],
    T
>;

export interface SliceStore {
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    baselineChange: string;
    setBaselineChange: (change: string) => void;
    metric: string;
    setMetric: (metric: string) => void;
}

export const sliceStore: ImmerStateCreator<SliceStore> = (set) => ({
    selectedYear: 2080,
    setSelectedYear: (year) => set({ selectedYear: year }),
    baselineChange: 'Absolute',
    setBaselineChange: (change) => set({ baselineChange: change }),
    metric: 'MaxPR',
    setMetric: (metric) => set({ metric }),
});
