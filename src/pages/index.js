// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import SelectTerm from "@/components/SelectTerm";
import Loading from "@/components/Loading";
import Login from "@/components/Login";

import UserSummary from "@/components/page/index/UserSummary";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Home = ({ topTracks, topArtists, User }) => {
  const { data: session } = useSession();
  const imageUrl = User?.image;
  const userName = User?.name;

  const [tracks, setTracks] = useState(topTracks);
  const [artists, setArtists] = useState(topArtists);

  useEffect(() => {
    setTracks(topTracks);
    setArtists(topArtists);
  }, [topTracks, topArtists]);

  return (
    <>
      <Layout>
        <Header profileImage={imageUrl} userName={userName} />

        <section className="w-[90%] mx-auto">
          <div className="align-right text-right">
            <div></div>
            <SelectTerm />
          </div>
          <UserSummary tracks={tracks?.items} artists={artists?.items} />
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
