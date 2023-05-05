import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = (props: Props) => {
  return (
    <div className="mx-auto max-w-prose">
      <header>
        <h1>
          <Link href="/">Mayonaka.me</Link>
        </h1>
      </header>
      <main>{props.children}</main>
      <footer>FOOTER</footer>
    </div>
  );
};
