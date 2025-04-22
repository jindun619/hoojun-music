import { Scores } from "../Scores";

export interface TrackPatchDTO {
  scores?: Scores;
  trackId?: string;
}
