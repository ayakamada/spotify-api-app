// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import React from "react";

import Layout from "@/components/layouts/layout";
import Login from "@/components/Login";

import { getUserPlayList } from "@/lib/spotify";

import PlayListIndex from "@/components/page/playlist/Index";

const PlayList = ({ UserPlayList }) => {
  const { data: session, status } = useSession();

  // console.log(topTracks);

  return (
    <>
      {!session && <Login />}

      {status === "authenticated" && (
        <>
          <Layout>
            <PlayListIndex playlists={UserPlayList.items} />
          </Layout>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return { props: {} };
  }

  const UserPlayList = await getUserPlayList(session);

  return {
    props: {
      UserPlayList,
    },
  };
}

export default PlayList;
