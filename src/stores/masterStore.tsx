import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, useStore } from 'zustand';
import { sliceStore } from './sliceStore';

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
    ? F extends (...args: any) => object
        ? StateFromFunctions<R> & ReturnType<F>
        : unknown
    : unknown;

const createSelectors = <S extends StoreApi<object>>(_store: S) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (const k of Object.keys(store.getState())) {
        (store.use as any)[k] = () =>
            useStore(_store, (s) => s[k as keyof typeof s]);
    }
    return store;
};

type MasterState = StateFromFunctions<[typeof sliceStore]>;

export const masterStore = create<MasterState>()(
    immer((...a) => ({
        ...sliceStore(...a),
    })),
);

export const MS = createSelectors(masterStore);
