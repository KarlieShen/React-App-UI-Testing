import { createGlobalState } from "react-hooks-global-state";

export interface CardData {
  id: string;
  title: string;
  linkTitle: string;
  link: string;
}
const initialState: {
  cards: CardData[]
} = {
  cards: [],
};

export const { useGlobalState } = createGlobalState(initialState);