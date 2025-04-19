import RankingList from "@/components/RankingList";
import { createSpotifySdk } from "@/utils/spotify";
import { useEffect } from "react";

const Home = () => {
  const songList = [
    {
      id: "1",
      ranking: 1,
      albumImage: "https://placehold.co/400",
      songName: "Bohemian Rhapsody",
      overallScore: 9.8,
    },
    {
      id: "2",
      ranking: 2,
      albumImage: "https://placehold.co/400",
      songName: "Stairway to Heaven",
      overallScore: 9.6,
    },
    {
      id: "3",
      ranking: 3,
      albumImage: "https://placehold.co/400",
      songName: "Hotel California",
      overallScore: 9.5,
    },
    {
      id: "4",
      ranking: 4,
      albumImage: "https://placehold.co/400",
      songName: "Sweet Child O' Mine",
      overallScore: 9.4,
    },
    {
      id: "5",
      ranking: 5,
      albumImage: "https://placehold.co/400",
      songName: "Imagine",
      overallScore: 9.2,
    },
    {
      id: "6",
      ranking: 6,
      albumImage: "https://placehold.co/400",
      songName: "Smells Like Teen Spirit",
      overallScore: 9.1,
    },
    {
      id: "7",
      ranking: 7,
      albumImage: "https://placehold.co/400",
      songName: "Back in Black",
      overallScore: 8.9,
    },
    {
      id: "8",
      ranking: 8,
      albumImage: "https://placehold.co/400",
      songName: "Comfortably Numb",
      overallScore: 8.8,
    },
    {
      id: "9",
      ranking: 9,
      albumImage: "https://placehold.co/400",
      songName: "November Rain",
      overallScore: 8.7,
    },
    {
      id: "10",
      ranking: 10,
      albumImage: "https://placehold.co/400",
      songName: "Wonderwall",
      overallScore: 8.5,
    },
  ];

  useEffect(() => {
    const sdk = createSpotifySdk();
    console.log(sdk);
    (async () => {
      const items = await sdk.search("The Beatles", ["artist"]);

      console.table(
        items.artists.items.map((item) => ({
          name: item.name,
          followers: item.followers.total,
          popularity: item.popularity,
        }))
      );
    })();
  }, []);

  return <RankingList songs={songList} />;
};

export default Home;
