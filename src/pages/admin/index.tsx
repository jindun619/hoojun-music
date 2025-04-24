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
import { TrackCreateDTO } from "@/types/dto/TrackCreateDTO";

const emptyScores: Scores = {
  structure: 0,
  lyrics: 0,
  production: 0,
  performance: 0,
  originality: 0,
  melody_rhythm: 0,
  emotion: 0,
};

const AdminPage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [trackId, setTrackId] = useState("");
  const [description, setDescription] = useState("");
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<
    "trackName" | "artistName" | "overallScore"
  >("trackName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios
      .get("/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchTracks();
      })
      .catch(() => {
        localStorage.removeItem("token"); // 토큰이 유효하지 않으면 로그아웃 처리
        window.location.href = "/login";
      });
  }, []);

  const extractTrackId = (url: string) => {
    const regex = /track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const fetchTracks = async () => {
    const res = await fetch("/api/tracks");
    const rawData: RawTrack[] = await res.json();
    const convertedTracks = await Promise.all(
      rawData.map(convertRawTrackToTrack)
    );
    const validTracks = convertedTracks.filter(
      (track): track is Track => track !== null
    );
    setTracks(validTracks);
    setFilteredTracks(validTracks);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const sortTracks = (tracks: Track[]): Track[] => {
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
  };

  const handleAddTrack = async () => {
    const extractedTrackId = extractTrackId(trackId);
    if (!extractedTrackId) {
      console.error("Invalid track ID or URL");
      return;
    }

    const isDuplicate = tracks.some(
      (track) => track.trackId === extractedTrackId
    );
    if (isDuplicate) {
      alert("이미 존재하는 트랙입니다.");
      return;
    }

    const dto: TrackCreateDTO = {
      trackId: extractedTrackId,
      scores,
      description: description || "",
    };

    try {
      await axios.post("/api/tracks", dto);

      await fetchTracks();

      setTrackId("");
      setScores(emptyScores);
      setDescription(""); // 초기화
    } catch (error) {
      console.error("트랙 추가 중 오류 발생:", error);
    }
  };

  const handleDelete = (id: string) => {
    axios.delete(`/api/tracks/${id}`);
    fetchTracks();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">
        🎧 Admin - Track Manager
      </h1>

      <TrackForm
        trackId={trackId}
        description={description}
        scores={scores}
        setTrackId={setTrackId}
        setDescription={setDescription}
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
};

export default AdminPage;
