// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getSession, getServerSession, useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, ReactNode } from "react";

import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";

import Layout from "@/components/layouts/layout";

import { isAuthenticated } from "@/lib/utils/isAuthenticated";
import { getUserPlayList } from "@/lib/spotify";

import Index from "@/components/page/playlist/Index";

const PlayList = ({ UserPlayList }) => {
  const { data: session, status } = useSession();

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
            <Index playlists={UserPlayList.items} />
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
