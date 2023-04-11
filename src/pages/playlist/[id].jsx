import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/layout";
import Login from "@/components/Login";
import PlayListHeader from "@/components/page/playlist/PlaylistHeader";
import PlaylistItems from "@/components/page/playlist/PlaylistItems";
import ListAnalyze from "@/components/Analyze/ListAnalyze";
import FeatureChart from "@/components/Chart/FeatureChart";
import KeyChart from "@/components/Chart/KeyChart";
import ModeChart from "@/components/Chart/ModeChart";

import { getPlayList, getPlayListItems, getAudioFeaturesForTracks } from "@/lib/spotify";

const PlayList = ({ playlistId, PlayList, PlayListItems, AudioFeatures }) => {
  const { data: session, status } = useSession();
  const [audioFeatures, setAudioFeatures] = useState(AudioFeatures);

  // console.log(audioFeatures);

  return (
    <>
      {!session && <Login />}

      {status === "authenticated" && (
        <>
          <Layout>
            <PlayListHeader playlist={PlayList} />
            <div className="flex">
              <div className="flex items-center flex-col justify-start">
                <FeatureChart features={audioFeatures.audio_features} />
                <KeyChart features={audioFeatures.audio_features} />
                <ModeChart features={audioFeatures.audio_features} />
              </div>
              <div className="grid grid-cols-2">
                <PlaylistItems tracks={PlayList.tracks} />
              </div>
            </div>
          </Layout>
        </>
      )}
    </>
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
  const AudioFeatures = await getAudioFeaturesForTracks(PlayListItems, session);

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
