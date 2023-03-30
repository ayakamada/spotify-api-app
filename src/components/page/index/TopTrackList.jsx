import Image from "next/image";
import TrackList from "@/components/track/TrackList";

export default function TopTrackList({ tracks }) {
  return (
    <section className="grid gap-4 grid-cols-4 ">
      <TrackList tracks={tracks} />
    </section>
  );
}
