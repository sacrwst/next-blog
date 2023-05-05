import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-prose">
      <header>
        <h1>
          <Link href="/">Mayonaka.me</Link>
        </h1>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
