import { Scores } from "./scores";

export interface Track {
  trackId: string;
  trackName: string;
  artistName: string;
  albumImgUrl: string;
  overallScore: number;
  scores: Scores;
}
