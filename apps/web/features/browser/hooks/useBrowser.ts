import { browserApi } from "@features/browser/api/browser.api";
import type { BrowseView, Transition } from "@features/browser/types/browser.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type BrowseAction =
  | { type: "navigate"; input: string; transition: Transition }
  | { type: "search"; query: string }
  | { type: "back" }
  | { type: "forward" };

export function useBrowser(personId: string | null, readScroll: () => number) {
  const queryClient = useQueryClient();
  const key = ["browse", personId];

  const view = useQuery({
    queryKey: key,
    queryFn: () => browserApi.view(personId!),
    enabled: personId !== null,
    staleTime: 0,
    refetchOnWindowFocus: false
  });

  const action = useMutation({
    mutationFn: (next: BrowseAction): Promise<BrowseView> => {
      const scrollY = readScroll();
      switch (next.type) {
        case "navigate":
          return browserApi.navigate(personId!, next.input, next.transition, scrollY);
        case "search":
          return browserApi.search(personId!, next.query, scrollY);
        case "back":
          return browserApi.move(personId!, "back", scrollY);
        case "forward":
          return browserApi.move(personId!, "forward", scrollY);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(key, data);
      void queryClient.invalidateQueries({ queryKey: ["history", personId] });
    },
    onError: () => void queryClient.invalidateQueries({ queryKey: key })
  });

  return { view: view.data, isLoading: view.isLoading, act: action.mutate, isActing: action.isPending, error: action.error, reset: action.reset };
}
