import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-black text-center">
      <div>
        <h1 className="font-sans tracking-wide text-white">Spotify App</h1>
        <button
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
          className="mt-5 rounded-full bg-[#1DB954] p-4 font-sans tracking-wide text-white"
        >
          LOGIN TO SPOTIFY
        </button>
      </div>
    </main>
  );
}
