import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbMenu } from "react-icons/tb";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = (props: Props) => {
  return (
    <div>
      <header className="fixed top-0 left-0 z-50 w-[100%]">
        <div className="relative flex items-center justify-center bg-white py-6">
          <h1 className="">
            <Link href="/">
              <a className="block">
                <Image
                  src={"/logo.png"}
                  width={336}
                  height={51}
                  alt="Mayonaka.me"
                />
              </a>
            </Link>
          </h1>
          <div className="absolute top-[50%] right-12 -translate-y-1/2">
            <TbMenu className="h-10 w-10 cursor-pointer" />
          </div>
        </div>
      </header>
      <main className="bg-gray-100 pt-32">
        <div className="mx-auto max-w-5xl px-3 py-10">{props.children}</div>
      </main>
      <footer>
        <p className="py-10 text-center">Copyrights 2023 Mayonaka.me</p>
      </footer>
    </div>
  );
};
