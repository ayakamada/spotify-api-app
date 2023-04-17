// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import TrackList from "@/components/TrackList";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Tracks = ({ topTracks }) => {
  const { data: session } = useSession();

  return (
    <>
      <Layout>
        <TrackList tracks={topTracks.items} />
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

  return {
    props: {
      topTracks,
    },
  };
}

export default Tracks;
