import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Tab } from "@headlessui/react";

import TrackList from "@/components/TrackList";
import ArtistList from "@/components/ArtistList";

function TitleLink({ title, linkUrl }) {
  return (
    <div className="flex justify-between">
      <h2 className="text-center font-bold mb-10 text-xl leading-relaxed tracking-wide">{title}</h2>
      {/* <Link href={linkUrl}>
        <div className="text-sm font-light shrink-0 border rounded-full inline-block px-2 py-1">See More</div>
      </Link> */}
    </div>
  );
}
//todo: タブ切り替え
export default function UserSummary({ tracks, artists }) {
  return (
    <>
      <div className="sm:block hidden">
        <div className="grid grid-cols-2">
          <section className="mx-auto w-full">
            <TitleLink title="Top Tracks" linkUrl="/tracks" />
            <TrackList tracks={tracks} />
          </section>

          <section className=" mx-auto w-full">
            <TitleLink title="Top Artists" linkUrl="/artists" />
            <ArtistList artists={artists} />
          </section>
        </div>
      </div>
      <div className="sm:hidden block">
        <TabContents tracks={tracks} artists={artists} />
      </div>
    </>
  );
}

export function TabContents({ tracks, artists }) {
  let [tabs] = useState({
    Tracks: [],
    Artists: [],
  });

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
          {Object.keys(tabs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 " +
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 " +
                (selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white")
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"}
          >
            <section className="mx-auto w-full">
              <TitleLink title="Top Tracks" linkUrl="/tracks" />
              <TrackList tracks={tracks} />
            </section>
          </Tab.Panel>
          <Tab.Panel
            className={"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"}
          >
            <section className=" mx-auto w-full">
              <TitleLink title="Top Artists" linkUrl="/artists" />
              <ArtistList artists={artists} />
            </section>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
