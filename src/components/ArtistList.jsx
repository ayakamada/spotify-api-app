import Image from "next/image";

export default function ArtistList({ artists }) {
  return (
    <>
      {artists.map((artist) => (
        <div key={artist.id} className=" flex items-center">
          <div className="mr-6 ">
            <Image
              src={artist.images[0].url}
              alt=""
              responsive
              className="object-cover mx-auto rounded-full w-24 h-24 "
              width={artist.images[0].width}
              height={artist.images[0].height}
            />
          </div>
          <div>
            <h3>{artist.name}</h3>
          </div>
        </div>
      ))}
    </>
  );
}
