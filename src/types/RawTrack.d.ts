import { Scores } from "./Scores";

export interface RawTrack {
  id: string;
  trackId: string;
  description: string;
  scores: Scores;
}
