import { Scores } from "../Scores";

export interface TrackPatchDTO {
  trackId?: string;
  description?: string;
  scores?: Scores;
}
