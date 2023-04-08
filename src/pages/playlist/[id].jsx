import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/layout";
import Login from "@/components/Login";
import PlayListHeader from "@/components/page/playlist/PlaylistHeader";
import PlaylistItems from "@/components/page/playlist/PlaylistItems";
import ListAnalyze from "@/components/Analyze/ListAnalyze";

import { getPlayList, getPlayListItems } from "@/lib/spotify";

const PlayList = ({ PlayList, PlayListItems }) => {
  const { data: session, status } = useSession();
    console.log(PlayList);

  return (
    <>
      {!session && <Login />}

      {status === "authenticated" && (
        <>
          <Layout>
            <PlayListHeader playlist={PlayList} />
            <div className="grid grid-cols-2">
              <PlaylistItems tracks={PlayList.tracks} />
              <ListAnalyze tracks={PlayListItems} />
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

  return {
    props: {
      PlayList,
      PlayListItems,
    },
  };
}

export default PlayList;
