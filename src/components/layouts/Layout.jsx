import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-black text-white h-full">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
