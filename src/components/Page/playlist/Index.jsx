import Image from "next/image";
import Link from "next/link";

export default function PlayListIndex({ playlists }) {
  // console.log(playlists);
  return (
    <div className="pb-32">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 w-[90%] mx-auto">
        {playlists.map((list) => (
          <div key={list.id} className="w-full h-full">
            <Link href={`/playlist/${list.id}`}>
              <div className="sm:mr-6 relative w-full">
                <Image
                  src={list.images[0].url}
                  alt=""
                  responsive
                  width={list.images[0]?.width || 640}
                  height={list.images[0]?.height || 640}
                  className=" mx-auto"
                />
              </div>
            </Link>
            <div>
              <h3 className="text-sm tracking-wide font-bold my-4 text-center">{list.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
