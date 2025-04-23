import { GetStaticProps } from "next";
import RankList from "@/components/RankList";
import { RankedTrack } from "@/types/RankedTrack";
import { getRankedTracks } from "@/utils/getRankedTracks";

interface Props {
  rankedTracks: RankedTrack[];
}

const Home = ({ rankedTracks }: Props) => {
  return <RankList data={rankedTracks} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const rankedTracks = await getRankedTracks();

  return {
    props: {
      rankedTracks,
    },
    revalidate: 60,
  };
};

export default Home;
