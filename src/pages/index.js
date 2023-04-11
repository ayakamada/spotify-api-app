// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import React from "react";
import { getSession, useSession, signOut } from "next-auth/react";

import Layout from "@/components/layouts/layout";
import Login from "@/components/Login";
import UserSummary from "@/components/page/index/UserSummary";

import { getTopTracksShort, getTopArtistsShort } from "@/lib/spotify";

const Home = ({ topTracks, topArtists }) => {
  const { data: session, status } = useSession();
  const image_url = session?.user?.image;

  // console.log(topTracks);

  return (
    <>
      {!session && <Login />}

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
              <UserSummary tracks={topTracks.items} artists={topArtists.items} />
            </section>
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
