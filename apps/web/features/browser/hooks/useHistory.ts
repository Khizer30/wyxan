import { browserApi } from "@features/browser/api/browser.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useHistory(personId: string | null, enabled: boolean) {
  const query = useInfiniteQuery({
    queryKey: ["history", personId],
    queryFn: ({ pageParam }) => browserApi.history(personId!, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextBefore ?? undefined,
    enabled: enabled && personId !== null,
    staleTime: 0
  });

  return {
    items: query.data?.pages.flatMap((page) => page.items) ?? [],
    hasMore: query.hasNextPage,
    loadMore: () => void query.fetchNextPage(),
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage
  };
}
