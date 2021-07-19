import Cookies from "cookies";
import { v4 as uuidv4 } from "uuid";
import App from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Labs Poker</title>
      </Head>
      <main className="">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req, res } = appContext.ctx;
  const cookies = new Cookies(req, res);

  let playerId = cookies.get("playerId");
  if (!playerId) {
    playerId = uuidv4();
    cookies.set("playerId", playerId);
  }
  return { ...appProps, playerId };
};

export default MyApp;
