// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import React from "react";

import Layout from "@/components/layouts/Layout";
import Login from "@/components/Login";

import { getUserPlayList } from "@/lib/spotify";

import PlayListIndex from "@/components/page/playlist/Index";

const Index = ({ UserPlayList }) => {
  return (
    <Layout>
      <PlayListIndex playlists={UserPlayList.items} />
    </Layout>
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

export default Index;
