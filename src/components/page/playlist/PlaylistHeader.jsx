import Image from "next/image";
import Link from "next/link";

export default function PlayListHeader({ playlist }) {
  // console.log(playlists);
  return (
    <div className=" flex items-center">
      <div className="mr-6 relative w-24 h-24">
        <Image src={playlist.images[0].url} alt="" fill className="object-contain mx-auto w-24 h-24 " />
      </div>
      <div>
        <h3>{playlist.name}</h3>
        <div>{playlist.owner.display_name}</div>
      </div>
    </div>
  );
}
