import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head lang="en">
        <title>TLMB | Test out your Math Skills</title>
        <meta
          name="Description"
          content="TLMB is a simple fun quiz game that tests out your math skils. Try iy out"
        ></meta>
      </Head>
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
