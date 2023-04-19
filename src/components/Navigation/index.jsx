import { cloneElement } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ href, children }) {
  const router = useRouter();
  const commonClass = " py-2 px-4 rounded-full inline-block cursor-pointer mr-2 hover:opacity-80 ";

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${commonClass} bg-white text-black`;
  } else {
    className = `${commonClass} bg-gray-900 hover:text-white`;
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>;
}

export default function Nav() {
  return (
    <>
      <nav className="py-16">
        <ul className="w-[90%] mx-auto flex items-center">
          <li>
            <ActiveLink href="/">
              <div>TOP</div>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/playlist">
              <div>PlayList</div>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
