import RankingList from "@/components/RankList";
import { RankedTrack } from "@/types/rankedTrack";
import { RawTrack } from "@/types/rawTrack";
import { createSpotifySdk } from "@/lib/spotify";
import { useEffect, useState } from "react";
import { convertRawTrackToTrack } from "@/utils/convert";
import { Track } from "@/types/track";
import { rankTracksByScore } from "@/utils/rankTracksByScore";

const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [rankedTracks, setRankedTracks] = useState<RankedTrack[]>([]);
  const rawTracks: RawTrack[] = [
    {
      id: "1",
      trackId: "3z8h0TU7ReDPLIbEnYhWZb",
      scores: JSON.stringify({
        score1: 9.8,
        score2: 9.5,
        score3: 10,
        overallScore: 9.8,
      }),
    },
    {
      id: "2",
      trackId: "0DANcJuMamcL9NyYkEWWTq",
      scores: JSON.stringify({
        score1: 9.6,
        score2: 9.3,
        score3: 9.9,
        overallScore: 9.6,
      }),
    },
    {
      id: "3",
      trackId: "1rh232CwAy3EDEWFJkwH88",
      scores: JSON.stringify({
        score1: 9.5,
        score2: 9.2,
        score3: 9.8,
        overallScore: 9.5,
      }),
    },
    {
      id: "4",
      trackId: "7snQQk1zcKl8gZ92AnueZW",
      scores: JSON.stringify({
        score1: 9.4,
        score2: 9.1,
        score3: 9.7,
        overallScore: 9.4,
      }),
    },
  ];
  // const rankedTracks: RankedTrack[] = [
  //   {
  //     trackId: "1",
  //     rank: 1,
  //     albumImgUrl: "https://placehold.co/400",
  //     trackName: "Bohemian Rhapsody",
  //     artistName: "Queen",
  //     overallScore: 9.8,
  //   },
  //   {
  //     trackId: "2",
  //     rank: 2,
  //     albumImgUrl: "https://placehold.co/400",
  //     trackName: "Stairway to Heaven",
  //     artistName: "Led Zeppelin",
  //     overallScore: 9.6,
  //   },
  //   {
  //     trackId: "3",
  //     rank: 3,
  //     albumImgUrl: "https://placehold.co/400",
  //     trackName: "Hotel California",
  //     artistName: "Eagles",
  //     overallScore: 9.5,
  //   },
  //   {
  //     trackId: "4",
  //     rank: 4,
  //     albumImgUrl: "https://placehold.co/400",
  //     trackName: "Sweet Child O' Mine",
  //     artistName: "Guns N' Roses",
  //     overallScore: 9.4,
  //   },
  // ];

  useEffect(() => {
    const sdk = createSpotifySdk();
    console.log(sdk);

    (async () => {
      const data = await Promise.all(
        rawTracks.map((raw) => convertRawTrackToTrack(raw))
      );
      setTracks(data);
    })();
  }, []);

  useEffect(() => {
    console.log(tracks);
    const data = rankTracksByScore(tracks);
    setRankedTracks(data);
  }, [tracks]);

  useEffect(() => {
    console.log(rankedTracks);
  }, [rankedTracks]);

  return <RankingList data={rankedTracks} />;
};

export default Home;
