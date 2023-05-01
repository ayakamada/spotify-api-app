// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import React from "react";

import Layout from "@/components/Layouts/Layout";
import Nav from "@/components/Navigation";

import Login from "@/components/Login";

import { getUserPlayList } from "@/lib/spotify";

import PlayListIndex from "@/components/Page/playlist/Index";

const Index = ({ UserPlayList }) => {
  return (
    <Layout>
      <Nav />
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
