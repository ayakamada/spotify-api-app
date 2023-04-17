import Image from "next/image";
import Link from "next/link";

export default function PlayListIndex({ playlists }) {
  // console.log(playlists);
  return (
    <div className="pb-32">
      <div className="grid grid-cols-5 gap-8 w-[90%] mx-auto">
        {playlists.map((list) => (
          <div key={list.id} className="">
            <Link href={`/playlist/${list.id}`}>
              <div className="mr-6 relative w-48 h-48">
                <Image src={list.images[0].url} alt="" fill className="object-contain mx-auto" />
              </div>
            </Link>
            <div>
              <h3 className="text-sm tracking-wide font-bold my-4">{list.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
