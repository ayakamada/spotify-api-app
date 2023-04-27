// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React, { useEffect, useState, useCallback } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import Header from "@/components/layouts/Header";
import SelectTerm from "@/components/SelectTerm";
import Loading from "@/components/Loading";
import Login from "@/components/Login";

import UserSummary from "@/components/page/index/UserSummary";

import { getTopTracksShort, getTopArtistsShort, fetchTracks, fetchArtists } from "@/lib/spotify";

const Home = ({ topTracks, topArtists, User }) => {
  const { data: session } = useSession();
  const imageUrl = User?.image;
  const userName = User?.name;

  const [tracks, setTracks] = useState(topTracks);
  const [artists, setArtists] = useState(topArtists);
  const [activeTerm, setActiveTerm] = useState("short");

  const changeTerm = async (term) => {
    setActiveTerm(term);
    changeTracksData(term);
    changeArtistsData(term);
  };

  const changeTracksData = async (term) => {
    const data = await fetchTracks(session, term);
    setTracks(data);
  };

  const changeArtistsData = async (term) => {
    const data = await fetchArtists(session, term);
    setArtists(data);
  };

  const handleClick = (term) => changeTerm(term);

  useEffect(() => {
    setTracks(topTracks);
    setArtists(topArtists);
  }, [topTracks, topArtists]);

  useEffect(() => {
    if (!session) return;
  }, [session]);

  return (
    <>
      <Layout>
        <Header profileImage={imageUrl} userName={userName} />
        <section className="w-[90%] mx-auto">
          <div className="align-right text-right">
            <div></div>
            <SelectTerm activeTerm={activeTerm} handleClick={handleClick} />
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
