import { Scores } from "./Scores";

export interface Track {
  id: string;
  trackId: string;
  trackName: string;
  artistName: string;
  albumImgUrl: string;
  overallScore: number;
  description: string;
  scores: Scores;
}
