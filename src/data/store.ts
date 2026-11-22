import { useCallback, useSyncExternalStore } from "react";
import { createPersistentStore, useStoreSelector } from "./persistent";
import { createSeed, type Collections } from "./seed";
import { uid } from "@/utils/id";

export const dataStore = createPersistentStore<Collections>("alshifa:data:v1", createSeed);

type Item<K extends keyof Collections> = Collections[K][number];

/** CRUD access to one demo-data collection, persisted in the browser. */
export function useCollection<K extends keyof Collections>(key: K) {
  const items = useStoreSelector(dataStore, (s) => s[key]) as Collections[K];

  const add = useCallback(
    (item: Omit<Item<K>, "id"> & { id?: string }) => {
      const withId = { ...item, id: item.id ?? uid(String(key).slice(0, 3)) } as Item<K>;
      dataStore.set((s) => ({ ...s, [key]: [withId, ...(s[key] as Item<K>[])] }));
      return withId;
    },
    [key],
  );
  const update = useCallback(
    (id: string, patch: Partial<Item<K>>) => {
      dataStore.set((s) => ({
        ...s,
        [key]: (s[key] as Item<K>[]).map((x) => ((x as { id: string }).id === id ? { ...x, ...patch } : x)),
      }));
    },
    [key],
  );
  const remove = useCallback(
    (id: string) => {
      dataStore.set((s) => ({
        ...s,
        [key]: (s[key] as Item<K>[]).filter((x) => (x as { id: string }).id !== id),
      }));
    },
    [key],
  );
  return { items, add, update, remove };
}

export function useDataHydrated(): boolean {
  return useSyncExternalStore(dataStore.subscribe, dataStore.isHydrated, () => false);
}

export function useRecord<K extends keyof Collections>(key: K, id: string | undefined) {
  const items = useStoreSelector(dataStore, (s) => s[key]) as Item<K>[];
  return items.find((x) => (x as { id: string }).id === id);
}
