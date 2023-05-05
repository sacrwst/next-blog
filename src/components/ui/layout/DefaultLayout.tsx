import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = (props: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <header className="align-center flex justify-between px-2 py-10">
        <h1>
          <Link href="/">
            <a className="block w-40">
              <Image
                src={"/logo.png"}
                width={400}
                height={60}
                layout="responsive"
                alt="Mayonaka.me"
              />
            </a>
          </Link>
        </h1>
        <nav>
          <ul className="flex">
            <li>
              <Link href="/">
                <a className="block px-3">HOME</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="block px-3">BLOG</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="block px-3">CONTACT</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="px-3">{props.children}</main>
      <footer>
        <p className="py-10 text-center">Copyrights 2023 Mayonaka.me</p>
      </footer>
    </div>
  );
};
