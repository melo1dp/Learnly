import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { api } from './api';

/**
 * GET `path`, re-fetching every time the screen regains focus.
 *
 * The web app re-fetched on mount, which was enough because navigating always
 * remounted the page. Screens in a native stack stay mounted underneath, so
 * popping back from a quiz would otherwise show stale mastery/progress.
 *
 * `data` is deliberately kept when a refetch fails, so a screen that already has
 * content can show it with an error banner instead of throwing the content away.
 */
export function useApi(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Bumped on every new request; a response whose id no longer matches is stale
  // (the screen was popped, or `path` changed mid-flight) and must not be
  // applied. Previously two separate fetch paths each managed this differently.
  const requestId = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Drop data belonging to the previous path, otherwise a screen pointed at a
  // new URL renders the old response until the new one lands.
  useEffect(() => {
    setData(null);
    setError('');
  }, [path]);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const next = await api(path);
      if (mounted.current && id === requestId.current) {
        setData(next);
        setError('');
      }
    } catch (e) {
      if (mounted.current && id === requestId.current) setError(e.message);
    }
  }, [path]);

  useFocusEffect(
    useCallback(() => {
      load();
      // Invalidate the in-flight request when the screen loses focus.
      return () => {
        requestId.current += 1;
      };
    }, [load]),
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } finally {
      if (mounted.current) setRefreshing(false);
    }
  }, [load]);

  return { data, error, refreshing, refresh, reload: load };
}
