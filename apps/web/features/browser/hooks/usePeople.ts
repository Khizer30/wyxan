import { browserApi } from "@features/browser/api/browser.api";
import { usePersonStore } from "@shared/stores/personStore";
import { useQuery } from "@tanstack/react-query";

export function usePeople() {
  const storedId = usePersonStore((state) => state.personId);
  const setPersonId = usePersonStore((state) => state.setPersonId);
  const { data: people = [], isLoading, error } = useQuery({ queryKey: ["people"], queryFn: browserApi.people, staleTime: Infinity });

  const person = people.find((candidate) => candidate.id === storedId) ?? people[0] ?? null;
  return { people, person, setPersonId, isLoading, error };
}
