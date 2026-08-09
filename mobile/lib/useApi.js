import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { api } from './api';

/**
 * GET `path`, re-fetching every time the screen regains focus.
 *
 * The web app re-fetched on mount, which was enough because navigating always
 * remounted the page. Screens in a native stack stay mounted underneath, so
 * popping back from a quiz would otherwise show stale mastery/progress.
 */
export function useApi(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api(path));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }, [path]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      // Guard against a response landing after the screen has been popped.
      (async () => {
        try {
          const next = await api(path);
          if (active) {
            setData(next);
            setError('');
          }
        } catch (e) {
          if (active) setError(e.message);
        }
      })();
      return () => {
        active = false;
      };
    }, [path])
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return { data, error, refreshing, refresh, reload: load };
}
