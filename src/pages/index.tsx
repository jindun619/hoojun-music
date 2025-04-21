import { GetStaticProps } from "next";
import RankingList from "@/components/RankList";
import { RankedTrack } from "@/types/RankedTrack";
import { convertRawTrackToTrack } from "@/utils/convert";
import { rankTracksByScore } from "@/utils/rankTracksByScore";
import { getTracks } from "@/lib/redis/getTracks";

interface Props {
  rankedTracks: RankedTrack[];
}

const Home = ({ rankedTracks }: Props) => {
  return <RankingList data={rankedTracks} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const rawTracks = await getTracks();

  const convertedTracks = await Promise.all(
    rawTracks.map((raw) => convertRawTrackToTrack(raw))
  );

  const rankedTracks = rankTracksByScore(convertedTracks);

  return {
    props: {
      rankedTracks,
    },
    revalidate: 60,
  };
};

export default Home;
