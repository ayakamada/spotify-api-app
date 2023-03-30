import Image from "next/image";

export default function TrackList({ tracks }) {
  // console.log(tracks);
  return (
    <>
      {tracks.map((track) => (
        <div key={track.id} className="block">
          <div className="mx-auto ">
            <Image
              src={track.album.images[0].url}
              alt=""
              responsive
              className="object-cover mx-auto "
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
