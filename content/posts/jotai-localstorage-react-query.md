---
title: "Combining Jotai, LocalStorage, and React Query: A Powerful State Management Pattern"
keywords:
- Jotai
- React Query
- LocalStorage
- State Management
date: 2025-01-15
categories:
- Technical
tags:
- react
- typescript
- localstorage
- state-management
- jotai
- react-query
- tanstack-query
description: "Learn how to create a powerful state management pattern by combining Jotai, LocalStorage, and React Query for efficient data caching and management in React applications."
---

I've been working with React applications for quite some time now, and state management has always been an interesting challenge. While there are many great solutions out there, I recently discovered a powerful pattern by combining three of my favorite tools: Jotai, LocalStorage, and React Query.

> Why these three? Well, each solves a specific problem really well, but together they create something even more powerful.

Let me explain what brought me to this pattern. I was working on an application that needed to:
- Load data from an API
- Cache it locally for offline use
- Keep the UI in sync with the latest data
- Handle loading and error states gracefully

Sure, I could use Redux or Context API, but that felt like bringing a sledgehammer to crack a nut. That's when I started playing with these tools.

## The Problem

While [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) provides excellent data fetching and caching capabilities, and does support some persistence options, we're looking for a more flexible atom-based solution that provides simpler state management. Here's what we typically do with React Query:

```tsx
function UserSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchUserSettings
  });

  // Basic caching but no flexible atom-based state management
  // Limited control over persistence
  // Less granular control over state updates
  
  return (
    <div>
      {isLoading ? <Loading /> : <SettingsForm data={data} />}
    </div>
  );
}
```

This works for data fetching, but when we need more granular control over our state and persistence, we can leverage [Jotai](https://jotai.org)'s atomic state management approach.

## First Try: Just Jotai with Storage

[Jotai provides built-in storage utilities](https://jotai.org/docs/utilities/storage) that make it easy to persist state:

```tsx
import { atom } from 'jotai'
const settingsAtom = atomWithStorage('settings', null);

function UserSettings() {
  const [settings, setSettings] = useAtom(settingsAtom);
  
  useEffect(() => {
    fetchUserSettings().then(setSettings);
  }, []);

  // No automatic cache invalidation
  // No background updates
  // Manual error handling
  return <SettingsForm data={settings} />;
}
```

Better for local state, but we lose React Query's powerful caching features. There must be a better way!

## The Combined Solution

[Jotai's Query extension](https://jotai.org/docs/extensions/query) provides a powerful integration with TanStack Query, giving us the best of both worlds:

- TanStack Query's powerful data fetching, caching, and synchronization
- Jotai's flexible atomic state management
- Built-in storage persistence
- Granular control over state updates
- Optimized re-renders through atomic updates

Here's how we can combine them:

```tsx
import { atomWithStorage } from "jotai/utils";
import { atomWithQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { QueryFunction, QueryKey } from "@tanstack/query-core";

type AtomWithQueryStorageOptions<T> = {
	key: string; // Unique key for local storage
	queryKey: QueryKey;
	queryFn: QueryFunction<T>;
	staleTimeMs?: number; // Duration after which data is considered stale (default: 1 hour)
};

export type AtomAction<T> =
	| { type: "refresh" }
	| { type: "invalidate" }
	| { type: "resetError" }
	| { type: "update"; newData: T };

/**
 * Creates an atom that combines Tanstack Query with local storage caching.
 *
 * @param options Configuration options
 * @param options.key Unique key for local storage
 * @param options.queryKey Tanstack Query key
 * @param options.queryFn Query function to fetch data
 * @param options.staleTimeMs Duration after which data is considered stale (default: 1 hour)
 *
 * @returns An atom that provides { data, error, loading } and supports actions:
 *          - refresh: Fetches fresh data
 *          - invalidate: Clears cached data
 *          - resetError: Clears error state
 *          - update: Manually updates data
 */
export const atomWithQueryStorage = <T>({
	key,
	queryKey,
	queryFn,
	staleTimeMs = 60 * 60 * 1000, // Default: 1 hour
}: AtomWithQueryStorageOptions<T>) => {
	// Atom for local storage persistence
	const storageAtom = atomWithStorage<{
		data: T | null | undefined;
		timestamp: number | null;
	}>(key, {
		data: null,
		timestamp: null,
	});

	// Atom for query error state
	const errorAtom = atom<Error | null>(null);

	// Atom for managing the query state
	const queryAtom = atomWithQuery((get) => ({
		queryKey,
		queryFn,
		staleTime: staleTimeMs, // Add this to control query staleness
		cacheTime: staleTimeMs * 2, // Optional: add cache time as well
		enabled:
			!get(storageAtom).data ||
			Date.now() - (get(storageAtom).timestamp || 0) > staleTimeMs,
	}));

	// Add a new atom for loading state
	const loadingAtom = atom<boolean>(false);

	// Combined atom for loading, error, and data states
	const combinedAtom = atom(
		(get) => {
			const { data, timestamp } = get(storageAtom);
			const error = get(errorAtom);
			const isLoading = get(loadingAtom);

			const isStale = !timestamp || Date.now() - timestamp > staleTimeMs;
			const queryResult = get(queryAtom);

			return {
				data: !isStale && data ? data : queryResult.data,
				error: error || queryResult.error, // Include both error sources
				loading: isLoading || (!data && isStale && !queryResult.data),
			};
		},
		(get, set, action: AtomAction<T>) => {
			if (action.type === "refresh") {
				set(loadingAtom, true); // Set loading before the query
				try {
					const freshData = get(queryAtom);
					set(storageAtom, { data: freshData.data, timestamp: Date.now() });
					set(errorAtom, freshData.error);
				} catch (error) {
					set(errorAtom, error as Error);
				} finally {
					set(loadingAtom, false); // Ensure loading is set to false after query
				}
			}

			if (action.type === "invalidate") {
				set(storageAtom, { data: null, timestamp: null }); // Clear storage
				set(loadingAtom, false);
				set(errorAtom, null);
			}

			if (action.type === "resetError") {
				set(errorAtom, null); // Reset error state
				set(loadingAtom, false);
			}

			if (action.type === "update") {
				set(storageAtom, { data: action.newData, timestamp: Date.now() }); // Manually update data
				set(loadingAtom, false);
				set(errorAtom, null);
			}
		},
	);

	return combinedAtom;
};

```

> The beauty of this pattern is its simplicity. No complex setup, no boilerplate, just clean, functional code.

Now we can use it like this:

```tsx
// Create the atom
const userSettingsAtom = atomWithQueryStorage({
  key: 'user-settings',
  queryKey: ['settings'],
  queryFn: fetchUserSettings,
  staleTimeMs: 24 * 60 * 60 * 1000 // 24 hours
});

// Use it in components
function UserSettings() {
  const [{ data, error, isLoading }, dispatch] = useAtom(userSettingsAtom);
  
  const handleRefresh = () => dispatch({ type: 'refresh' });
  const handleUpdate = (newData) => dispatch({ 
    type: 'update', 
    data: newData 
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      <SettingsForm 
        data={data} 
        onUpdate={handleUpdate}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
```

## What I Learned

This pattern taught me something important: sometimes the best solutions come from combining specialized tools:
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) excels at data fetching and caching
- [Jotai](https://jotai.org) provides elegant atomic state management
- [Jotai Storage](https://jotai.org/docs/utilities/storage) handles persistence
- [Jotai Query](https://jotai.org/docs/extensions/query) brings them all together

Together, they create a powerful, flexible system that's still easy to understand and use.

Is this pattern perfect for every situation? Of course not. But for many common scenarios - especially when dealing with cached API data - it's become my go-to solution.

**Happy Coding!**
