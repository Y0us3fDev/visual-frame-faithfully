import { useSyncExternalStore } from "react";

/**
 * Tiny external store persisted to localStorage.
 * Server render and first client render use `initial`; `hydrate()` (called once after mount)
 * swaps in the saved browser copy, so SSR and hydration always match.
 */
export function createPersistentStore<T extends object>(key: string, initial: () => T) {
  let state: T = initial();
  let hydrated = false;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  const store = {
    get: () => state,
    isHydrated: () => hydrated,
    subscribe(l: () => void) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    hydrate() {
      if (hydrated || typeof window === "undefined") return;
      hydrated = true;
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) state = { ...state, ...(JSON.parse(raw) as Partial<T>) };
      } catch {
        /* ignore corrupt storage */
      }
      emit();
    },
    set(updater: (prev: T) => T) {
      state = updater(state);
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch {
        /* storage full or unavailable */
      }
      emit();
    },
    reset() {
      state = initial();
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      emit();
    },
  };
  return store;
}

export function useStoreSelector<T extends object, S>(
  store: ReturnType<typeof createPersistentStore<T>>,
  selector: (s: T) => S,
): S {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(store.get()),
  );
}
