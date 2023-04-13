// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React from "react";
import { getSession, signOut } from "next-auth/react";

import Layout from "@/components/layouts/Layout";

import UserSummary from "@/components/page/index/UserSummary";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Home = ({ topTracks, topArtists }) => {
  return (
    <>
      <Layout>
        <section className="">
          <UserSummary tracks={topTracks.items} artists={topArtists.items} />
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return { props: {} };
  }

  const topTracks = await getTopTracksShort(session);
  const topArtists = await getTopArtistsShort(session);

  return {
    props: {
      topTracks,
      topArtists,
    },
  };
}

export default Home;
