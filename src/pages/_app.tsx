import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Page Builder is a Next.js app that lets users create custom landing pages by entering JSON, instantly showing sections like images, text, and live data, with TailwindCSS styling.​" />
        <meta name="keywords" content="Next.js, Page builder, App" />
        <meta name="author" content="Page Builder" />
        <title>Page Builder</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}