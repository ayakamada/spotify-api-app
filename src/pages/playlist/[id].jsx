import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/layout";
import Login from "@/components/Login";
import PlayListHeader from "@/components/page/playlist/PlaylistHeader";
import PlaylistItems from "@/components/page/playlist/PlaylistItems";
import ListAnalyze from "@/components/Analyze/ListAnalyze";

import { getPlayList } from "@/lib/spotify";

const PlayList = ({ PlayList }) => {
  const { data: session, status } = useSession();

  return (
    <>
      {!session && <Login />}

      {status === "authenticated" && (
        <>
          <Layout>
            <PlayListHeader playlist={PlayList} />
            <div className="grid grid-cols-2">
              <PlaylistItems tracks={PlayList.tracks.items} />
              <ListAnalyze tracks={PlayList.tracks.items} />
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

  return {
    props: {
      PlayList,
    },
  };
}

export default PlayList;
