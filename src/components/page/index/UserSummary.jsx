import Image from "next/image";
import TrackList from "@/components/TrackList";
import ArtistList from "@/components/ArtistList";


export default function UserSummary({ tracks, artists }) {
  return (
    <div className="grid grid-cols-2">
      <section className=" ">
        <h2>Top Tracks of Short Term</h2>
        <TrackList tracks={tracks} />
      </section>

      <section className=" ">
        <h2>Top artists of Short Term</h2>
        <ArtistList artists={artists} />
      </section>
    </div>
  );
}
