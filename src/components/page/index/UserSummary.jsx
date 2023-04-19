import Link from "next/link";
import Image from "next/image";
import TrackList from "@/components/TrackList";
import ArtistList from "@/components/ArtistList";

function TitleLink({ title, linkUrl }) {
  return (
    <div className="flex justify-between">
      <h2 className="text-center font-bold mb-10 text-xl leading-relaxed tracking-wide">{title}</h2>
      {/* <Link href={linkUrl}>
        <div className="text-sm font-light shrink-0 border rounded-full inline-block px-2 py-1">See More</div>
      </Link> */}
    </div>
  );
}

export default function UserSummary({ tracks, artists }) {
  return (
    <div className="grid grid-cols-2">
      <section className="mx-auto">
        <TitleLink title="Top Tracks" linkUrl="/tracks" />
        <TrackList tracks={tracks} />
      </section>

      <section className=" mx-auto">
        <TitleLink title="Top Artists" linkUrl="/artists" />
        <ArtistList artists={artists} />
      </section>
    </div>
  );
}
