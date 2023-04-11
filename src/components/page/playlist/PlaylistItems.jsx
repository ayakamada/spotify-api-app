import Image from "next/image";
import Link from "next/link";

import { formatDuration } from "@/lib/utils/index";

export default function PlayListItems({ tracks }) {
  //
  return (
    <div>
      {tracks.items.map((item) => (
        <div key={item.track.id} className=" flex items-center">
          <div className="mr-6 relative w-24 h-24">
            <Image src={item.track.album.images[0].url} alt="" fill className="object-contain mx-auto w-24 h-24 " />
          </div>
          <div>
            <h3>{item.track.name}</h3>
            <div>{item.track.artists[0].name}</div>
            <div>{formatDuration(item.track.duration_ms)}</div>
          </div>
        </div>
      ))}
      <div>
        {tracks.items.length} / {tracks.total}
      </div>
    </div>
  );
}
