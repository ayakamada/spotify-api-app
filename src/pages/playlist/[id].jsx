import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import Nav from "@/components/Navigation";

import Login from "@/components/Login";
import PlayListHeader from "@/components/page/playlist/PlaylistHeader";
import PlaylistItems from "@/components/page/playlist/PlaylistItems";
import ListAnalyze from "@/components/Analyze/ListAnalyze";
import FeatureChart from "@/components/Chart/FeatureChart";
import KeyChart from "@/components/Chart/KeyChart";
import ModeChart from "@/components/Chart/ModeChart";
import TempoChart from "@/components/Chart/TempoChart";

import { getPlayList, getPlayListItems, getAudioFeaturesForTracks } from "@/lib/spotify";

const PlayList = ({ playlistId, PlayList, PlayListItems, AudioFeatures }) => {
  const [audioFeatures, setAudioFeatures] = useState(AudioFeatures);

  // console.log(PlayListItems);

  return (
    <Layout>
      <Nav />
      <div className="w-[90%] mx-auto">
        <div className="flex-col grid-cols-1 items-start gap-8 grid sm:grid-cols-2">
          <div className="w-full grow self-stretch max-h-80 h-80">
            <PlayListHeader playlist={PlayList} audioFeatures={audioFeatures} />
          </div>
          <div className="grow self-stretch max-h-80 ">
            <FeatureChart features={audioFeatures} />
          </div>
        </div>
        <div className="flex-col grid-cols-1 items-start gap-8 grid sm:grid-cols-2 py-12">
          <div className="grow w-full order-2 sm:order-1 shrink-0">
            <PlaylistItems tracks={PlayList.tracks} />
          </div>
          <div className="shrink w-full order-1 sm:order-2">
            <TempoChart features={audioFeatures} />
          </div>
        </div>
        {/* <div>
            <KeyChart features={audioFeatures} />
            <ModeChart features={audioFeatures} />
          </div> */}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const playlistId = context.params.id;

  if (!session) {
    return { props: {} };
  }

  const PlayList = await getPlayList(playlistId, session);
  const PlayListItems = await getPlayListItems(playlistId, session);
  const AudioFeaturesArr = await getAudioFeaturesForTracks(PlayListItems, session);
  const AudioFeatures = [].concat(...AudioFeaturesArr);

  return {
    props: {
      playlistId,
      PlayList,
      PlayListItems,
      AudioFeatures,
    },
  };
}

export default PlayList;
