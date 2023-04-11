import Image from "next/image";

export default function TrackList({ tracks }) {
  // console.log(tracks);
  return (
    <>
      {tracks.map((track) => (
        <div key={track.id} className=" flex">
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
            <h3>{track.name}</h3>
            <p>{track.artists[0].name}</p>
          </div>
        </div>
      ))}
    </>
  );
}
