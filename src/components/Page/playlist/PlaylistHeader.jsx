import Image from "next/image";
import Link from "next/link";

export default function PlayListHeader({ playlist }) {
  return (
    <>
      <div className="tracking-wide bg-gray-900 p-4 rounded-lg h-full ">
        <div className="mr-6 relative w-44 h-44 mb-3">
          <Image src={playlist.images[0].url} alt="" fill className="object-contain mx-auto " />
        </div>
        <div>
          <h3 className="font-bold text-2xl">{playlist.name}</h3>
          <div className="text-gray-400 mb-2">BY {playlist.owner.display_name}</div>
          <div className="text-gray-200 text-sm">{playlist.tracks.total} tracks</div>
        </div>
      </div>
    </>
  );
}
