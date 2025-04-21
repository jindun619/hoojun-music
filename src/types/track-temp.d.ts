import { Scores } from "./Scores";

export interface Track {
  trackId: string;
  trackName: string;
  artistName: string;
  albumImgUrl: string;
  overallScore: number;
  scores: Scores;
}
