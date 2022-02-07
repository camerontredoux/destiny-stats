import { PlayerContext } from "@components/Layout";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { query } = useRouter();
  const rawPlayerData = useContext(PlayerContext);
  console.log(rawPlayerData);

  const [playerData, setPlayerData] = useState(rawPlayerData);

  useEffect(() => {
    setPlayerData(rawPlayerData);
    console.log(playerData);
  }, [rawPlayerData, playerData]);

  if (!playerData) {
    return <div>Error</div>;
  }

  return (
    <>
      <Head>
        <title>Destiny Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="bg-gradient-to-l from-amber-600 to-amber-300/95 bg-clip-text text-3xl font-bold text-transparent">
        Statistics
      </h1>
      <pre className="text-center text-sm">
        {JSON.stringify(playerData["Response"], null, 2)}
      </pre>
      <pre className="text-sm">Authorization Code: {query.code}</pre>
    </>
  );
};

export default Home;
