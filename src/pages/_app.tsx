import type { AppProps } from "next/app";
import { DefaultLayout } from "src/components/ui/layout/DefaultLayout";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
