import Image from "next/image";
import Link from "next/link";

import { formatDuration } from "@/lib/utils/index";

export default function PlayListItems({ tracks }) {
  //
  return (
    <div>
      {tracks.items.map((item) => (
        <div key={item.track.id} className=" flex items-start">
          <div className="mr-6 relative w-24 h-24 shrink-0">
            <Image src={item.track.album.images[0].url} alt="" fill className="object-contain mx-auto " />
          </div>
          <div>
            <h3 className="font-bold">{item.track.name}</h3>
            <div className="text-gray-300">{item.track.artists[0].name}</div>
            <div className="text-xs text-gray-400">{formatDuration(item.track.duration_ms)}</div>
          </div>
        </div>
      ))}
      <div>
        {tracks.items.length} / {tracks.total}
      </div>
    </div>
  );
}
