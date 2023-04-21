import Image from "next/image";
import Link from "next/link";

import { formatDuration } from "@/lib/utils/index";

export default function PlayListItems({ tracks }) {
  //
  return (
    <div className="w-full">
      {tracks.items.map((item) => (
        <div key={item.track.id} className=" flex items-center mb-2">
          <div className="mr-6 relative w-12 h-12 shrink-0">
            <Image src={item.track.album.images[0].url} alt="" fill className="object-contain mx-auto " />
          </div>
          <div className="mr-3">
            <h3 className="font-bold">{item.track.name}</h3>
            <div className="text-gray-300">{item.track.artists[0].name}</div>
          </div>
          <div className="text-xs text-gray-400 ml-auto">{formatDuration(item.track.duration_ms)}</div>
        </div>
      ))}
    </div>
  );
}
