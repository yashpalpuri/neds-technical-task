import { Race } from "./entity";

type RaceMap = Record<string, Race>;
export type NextToGoRacesState = {
  races: RaceMap;
  raceList: string[];
  displayingRaceList: string[];
  loading: boolean;
  selectedCategory: string;
  filteredRaceList: string[];
  startIndex: number;
};
