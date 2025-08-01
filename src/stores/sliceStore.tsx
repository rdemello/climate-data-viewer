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
    metric: string;
    setMetric: (metric: string) => void;
    selectedCoordinates: string | null;
    setSelectedCoordinates: (coordinates: string | null) => void;
}

export const sliceStore: ImmerStateCreator<SliceStore> = (set) => ({
    selectedYear: 2080,
    setSelectedYear: (year) => set({ selectedYear: year }),
    metric: 'MaxPR',
    setMetric: (metric) => set({ metric }),
    selectedCoordinates: null,
    setSelectedCoordinates: (coordinates) => set({ selectedCoordinates: coordinates }),
});
