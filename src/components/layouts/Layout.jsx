import Header from "./header";
import Footer from "./footer";

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
