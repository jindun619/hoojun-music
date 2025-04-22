import { useEffect, useState } from "react";
import axios from "axios";
import { convertRawTrackToTrack } from "@/utils/convert";
import { RawTrack } from "@/types/RawTrack";
import { Track } from "@/types/Track";
import TrackForm from "@/components/TrackForm";
import SearchFilter from "@/components/SearchFilter";
import SortFilter from "@/components/SortFilter";
import TrackList from "@/components/TrackList";
import { Scores } from "@/types/Scores";

const emptyScores: Scores = {
  structure: 0,
  lyrics: 0,
  production: 0,
  performance: 0,
  originality: 0,
  melody_rhythm: 0,
  emotion: 0,
};

export default function AdminPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [trackId, setTrackId] = useState("");
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "trackName" | "artistName" | "overallScore"
  >("trackName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // 로그인 페이지로 리디렉트
    }

    axios
      .get("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchTracks(); // 인증 성공 후 트랙을 가져옴
      })
      .catch(() => {
        localStorage.removeItem("token"); // 토큰이 유효하지 않으면 로그아웃 처리
        window.location.href = "/login"; // 로그인 페이지로 리디렉트
      });
  }, []);

  // Spotify track URL에서 trackId만 추출하는 함수
  function extractTrackId(url: string) {
    const regex = /track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  async function fetchTracks() {
    const res = await fetch("/api/tracks");
    const rawData: RawTrack[] = await res.json();
    const converted = await Promise.all(rawData.map(convertRawTrackToTrack));
    setTracks(converted);
    setFilteredTracks(converted);
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = tracks.filter(
        (track) =>
          track.trackName.toLowerCase().includes(lowerCaseQuery) ||
          track.artistName.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredTracks(filtered);
    } else {
      setFilteredTracks(tracks);
    }
  }

  function sortTracks(tracks: Track[]): Track[] {
    return [...tracks].sort((a, b) => {
      if (sortOption === "overallScore") {
        return sortOrder === "asc"
          ? a.overallScore - b.overallScore
          : b.overallScore - a.overallScore;
      }
      if (sortOption === "trackName") {
        return sortOrder === "asc"
          ? a.trackName.localeCompare(b.trackName)
          : b.trackName.localeCompare(a.trackName);
      }
      if (sortOption === "artistName") {
        return sortOrder === "asc"
          ? a.artistName.localeCompare(b.artistName)
          : b.artistName.localeCompare(a.artistName);
      }
      return 0;
    });
  }

  async function handleAddTrack() {
    const id = extractTrackId(trackId);
    if (id) {
      await axios.post("/api/tracks", { trackId: id, scores });
      await fetchTracks();
      setTrackId("");
      setScores(emptyScores);
    } else {
      console.error("Invalid track ID or URL");
    }
  }

  function handleDelete(id: string) {
    axios.delete(`/api/tracks/${id}`);
    fetchTracks();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">
        🎧 Admin - Track Manager
      </h1>

      <TrackForm
        trackId={trackId}
        scores={scores}
        setTrackId={setTrackId}
        setScores={setScores}
        handleAddTrack={handleAddTrack}
        handleScoreChange={(key, value) =>
          setScores({ ...scores, [key]: value })
        }
      />

      <SearchFilter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <SortFilter
        sortOption={sortOption}
        sortOrder={sortOrder}
        setSortOption={setSortOption}
        setSortOrder={setSortOrder}
      />

      <TrackList
        tracks={sortTracks(filteredTracks)}
        handleDelete={handleDelete}
      />
    </div>
  );
}
