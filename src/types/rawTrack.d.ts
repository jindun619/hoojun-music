export interface RawTrack {
  id: string;
  trackId: string;
  scores: {
    structure: number;
    lyrics: number;
    production: number;
    performance: number;
    originality: number;
    melody_rhythm: number;
    emotion: number;
  };
}
