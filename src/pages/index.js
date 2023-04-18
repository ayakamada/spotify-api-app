// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import Loading from "@/components/Loading";
import Login from "@/components/Login";

import UserSummary from "@/components/page/index/UserSummary";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Home = ({ topTracks, topArtists, User }) => {
  const imageUrl = User?.image;
  const userName = User?.name;

  return (
    <>
      <Layout>
        <Header profileImage={imageUrl} userName={userName} />

        <section className="">
          <UserSummary tracks={topTracks?.items} artists={topArtists?.items} />
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
  const User = session.user;

  return {
    props: {
      topTracks,
      topArtists,
      User,
    },
  };
}

export default Home;
