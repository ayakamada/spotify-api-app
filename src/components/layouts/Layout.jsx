import { useSession } from "next-auth/react";

import Footer from "./Footer";

import Login from "@/components/Login";
import Loading from "@/components/Loading";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      {!session && <Login />}

      {status === "authenticated" && (
        <div className="bg-black text-white h-full tracking-normal">
          <Header profileImage={imageUrl} userName={userName} />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
}
