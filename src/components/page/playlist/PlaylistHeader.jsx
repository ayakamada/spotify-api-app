import Image from "next/image";
import Link from "next/link";

export default function PlayListHeader({ playlist }) {
  return (
    <div className=" flex items-center tracking-wide">
      <div className="mr-6 relative w-60 h-60">
        <Image src={playlist.images[0].url} alt="" fill className="object-contain mx-auto w-24 h-24 " />
      </div>
      <div>
        <h3 className="font-bold text-2xl">{playlist.name}</h3>
        <div className="text-gray-400 mb-2">BY {playlist.owner.display_name}</div>
        <div className="text-gray-200 text-sm">{playlist.tracks.total} tracks</div>
      </div>
    </div>
  );
}
