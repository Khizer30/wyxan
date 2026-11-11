import type { BrowseView, HistoryPage, Person, PublishInput, Transition } from "@features/browser/types/browser.types";
import { api } from "@shared/lib/axios";
import { isAxiosError } from "axios";

export const browserApi = {
  people: () => api.get<{ people: Person[] }>("/people").then((res) => res.data.people),

  view: (personId: string) => api.get<BrowseView>(`/people/${personId}/browse`).then((res) => res.data),

  navigate: (personId: string, input: string, transition: Transition, scrollY: number) =>
    api.post<BrowseView>(`/people/${personId}/browse/navigate`, { input, transition, scrollY }).then((res) => res.data),

  search: (personId: string, query: string, scrollY: number) =>
    api.post<BrowseView>(`/people/${personId}/browse/search`, { query, scrollY }).then((res) => res.data),

  move: (personId: string, direction: "back" | "forward", scrollY: number) =>
    api.post<BrowseView>(`/people/${personId}/browse/${direction}`, { scrollY }).then((res) => res.data),

  history: (personId: string, before?: string) =>
    api.get<HistoryPage>(`/people/${personId}/history`, { params: { limit: 30, before } }).then((res) => res.data),

  publish: (input: PublishInput) => api.post<{ site: { address: string; version: number } }>("/sites", input).then((res) => res.data.site)
};

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? "The server could not be reached";
  }
  return "Something went wrong";
}
