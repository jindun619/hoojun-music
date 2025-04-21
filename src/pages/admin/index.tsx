import { useEffect, useState } from "react";

import { Track } from "@/types/Track";
import { RawTrack } from "@/types/RawTrack";
import { convertRawTrackToTrack } from "@/utils/convert";

export default function AdminTracks() {
  const [rawTracks, setRawTracks] = useState<RawTrack[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const fetchTracks = async () => {
    const res = await fetch("/api/tracks");
    const data = await res.json();
    setRawTracks(Object.values(data[0]) as RawTrack[]);
  };

  const addTrack = async () => {
    await fetch("/api/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, artist }),
    });
    setTitle("");
    setArtist("");
    fetchTracks();
  };

  const deleteTrack = async (id: string) => {
    await fetch(`/api/tracks/${id}`, {
      method: "DELETE",
    });
    fetchTracks();
  };

  //   useEffect(() => {
  //     fetchTracks();
  //   }, []);

  useEffect(() => {
    (async () => {
      const convertedTracks = await Promise.all(
        rawTracks.map((raw) => convertRawTrackToTrack(raw))
      );
      setTracks(convertedTracks);
    })();
  }, [rawTracks]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎵 Track Admin</h1>

      <div className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          className="input input-bordered w-full"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTrack}>
          Add Track
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks
              ? tracks.map((track) => (
                  <tr key={track.trackId}>
                    <td>{track.trackName}</td>
                    <td>{track.artistName}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => deleteTrack(track.trackId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
            {tracks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center text-gray-400">
                  No tracks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
