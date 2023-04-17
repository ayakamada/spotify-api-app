import Image from "next/image";

export default function TrackList({ tracks }) {
  // console.log(tracks);
  return (
    <>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} className=" flex mx-auto mb-4">
            <div className="mr-6">
              <Image
                src={track.album.images[0].url}
                alt=""
                responsive
                className="object-cover mx-auto w-24 h-24 "
                width={track.album.images[0].width}
                height={track.album.images[0].height}
              />
            </div>
            <div>
              <h3 className="font-bold tracking-wider">{track.name}</h3>
              <p className="text-gray-500 font-light">{track.artists[0].name}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No tracks found.</p>
      )}
    </>
  );
}
