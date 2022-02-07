import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface HomeProps {
  results: { Response: any };
}

const Home: NextPage<HomeProps> = ({ results }) => {
  const { query } = useRouter();

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
        {JSON.stringify(results["Response"], null, 2)}
      </pre>
      <pre className="text-sm">Authorization Code: {query.code}</pre>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await fetch("https://localhost:3000/api/bungie", {
    method: "POST",
    body: JSON.stringify({ id: "test" }),
  }).then((res) => res.json());

  return {
    props: {
      results,
    },
  };
};

// const Home: NextPage<HomeProps> = () => {
//   return (
//     <SWRConfig value={{ revalidateOnFocus: false }}>
//       <Stats />
//     </SWRConfig>
//   );
// };

export default Home;
