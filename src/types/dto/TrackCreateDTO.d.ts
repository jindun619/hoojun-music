import { Scores } from "../Scores";

export interface TrackCreateDTO {
  trackId: string;
  description: string;
  scores: Scores;
}
