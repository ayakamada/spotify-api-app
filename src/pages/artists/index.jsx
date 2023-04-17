// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

import Layout from "@/components/layouts/Layout";
import ArtistList from "@/components/ArtistList";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Tracks = ({ topArtist }) => {
  const { data: session } = useSession();

  return (
    <>
      <Layout>
        <ArtistList tracks={topArtist.items} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return { props: {} };
  }

  const topArtist = await getTopArtistsShort(session);

  return {
    props: {
      topArtist,
    },
  };
}

export default Tracks;
