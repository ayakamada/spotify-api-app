// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession, getServerSession, useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, ReactNode } from "react";

import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";

import Layout from "@/components/layouts/layout";
import TopTrackList from "@/components/page/index/TopTrackList";

import { isAuthenticated } from "@/lib/utils/isAuthenticated";
import { getTopTracksShort } from "@/lib/spotify";

const Home = ({ topTracks }) => {
  const { data: session, status } = useSession();
  const image_url = session?.user?.image;

  // console.log(topTracks);

  return (
    <>
      {!session && (
        <>
          <main className="flex h-screen w-screen items-center justify-center bg-black text-center">
            <div>
              <h1 className="font-sans tracking-wide text-white">Spotify App</h1>
              <button
                onClick={() => signIn("spotify", { callbackUrl: "/" })}
                className="mt-5 rounded-full bg-green p-4 font-sans tracking-wide text-white"
              >
                LOGIN TO SPOTIFY
              </button>
            </div>
          </main>
        </>
      )}

      {status === "authenticated" && (
        <>
          <Layout>
            <section className="pt-16 text-center">
              {/* <img src={image_url} className="mx-auto h-32 w-32 rounded-full object-cover" alt="profil" /> */}
              <h1 className="py-5 text-5xl">{session?.user?.name} </h1>
              <div className="py-5">
                <button
                  className="bg-black-700 hover:bg-black-700 focus:ring-black-500 focus:ring-offset-black-200 rounded-full border-2 border-gray-900 py-2 px-4 text-center text-base font-semibold text-black transition duration-200 ease-in hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              </div>
              <TopTrackList tracks={topTracks.items} />
            </section>
          </Layout>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  // const session = await getSession(ctx);
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

export default Home;
