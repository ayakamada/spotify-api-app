import Image from "next/image";
import Link from "next/link";

export default function PlayListIndex({ playlists }) {
  // console.log(playlists);
  return (
    <div className="grid grid-cols-5">
      {playlists.map((list) => (
        <div key={list.id} className=" flex items-center">
          <Link href={`/playlist/${list.id}`}>
            <div className="mr-6 relative w-24 h-24">
              <Image src={list.images[0].url} alt="" fill className="object-contain mx-auto w-24 h-24 " />
            </div>
          </Link>
          <div>
            <h3>{list.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
