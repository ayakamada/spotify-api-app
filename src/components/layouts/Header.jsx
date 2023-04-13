export default function Header({ profileImage, userName }) {
  return (
    <>
      <header className="pt-16 text-center mb-20">
        <img src={profileImage} className="mx-auto h-32 w-32 rounded-full object-cover" alt="profil" />
        <h1 className="py-5 text-5xl">{userName} </h1>
        <div className="">
          <button
            className="block  mx-auto bg-black-700 hover:bg-black-700 focus:ring-black-500 focus:ring-offset-black-200 rounded-full border-2 border-white py-2 px-4 text-center text-sm text-white transition duration-200 ease-in hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => signOut()}
          >
            LOGOUT
          </button>
        </div>
      </header>
    </>
  );
}
