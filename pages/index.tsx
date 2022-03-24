/* eslint-disable @next/next/no-img-element */
import { x_api_key } from "@utils/api";
import { characterStats } from "@utils/character";
import { DestinyAPI } from "@utils/DestinyAPI";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
const formatHighlight = require("json-format-highlight");

interface HomeProps {}

const BungieNameScheme = yup.object().shape({
  bungieName: yup.string().trim().required("Required"),
});

export const api = new DestinyAPI(x_api_key!);

const Home: NextPage<HomeProps> = () => {
  const { query } = useRouter();
  const [bungieData, setBungieData] = useState<any | null>(null);
  const [characters, setCharacters] = useState([]);

  const markup = () => {
    return {
      __html: formatHighlight(JSON.stringify(bungieData, null, 2)),
    };
  };

  useEffect(() => {
    const manifest = async () => {
      const m = await api.getManifest("DestinyStatDefinition", "144602215");

      console.log(m.Response);

      for (let k of Object.keys(m.Response.displayProperties)) {
        console.log(k);
      }

      console.log(m.Response.displayProperties.name);
    };

    manifest();
  });

  const [stats, setCharStats] = useState<any>([]);

  useEffect(() => {
    const t: any[] = [];
    const chars = async () => {
      const id = await api.getSteamMembershipId("Cameron", "0370");
      const res = await characterStats(id!);
      t.concat(res);
    };

    chars();

    setCharStats((c: any) => c.concat(t));
  }, []);

  console.log(stats);

  useEffect(() => {
    setCharacters([]);
    for (let characterId in bungieData) {
      setCharacters((characters) => characters.concat(bungieData[characterId]));
      console.log(bungieData[characterId].minutesPlayedTotal);
    }
  }, [bungieData]);

  return (
    <>
      <Head>
        <title>Destiny Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Formik
        validationSchema={BungieNameScheme}
        initialValues={{ bungieName: "" }}
        onSubmit={async (values) => {
          await fetch("https://destiny-stats.vercel.app/api/bungie", {
            method: "POST",
            body: JSON.stringify({ id: values.bungieName }),
          })
            .then((res) => res.json())
            .then((data) => {
              setBungieData(data);
            });
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <Field
              className="rounded-md bg-transparent bg-neutral-900 p-2 text-center text-neutral-300 transition duration-100 ease-in-out placeholder:text-neutral-600 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none  focus:placeholder:text-transparent"
              autoComplete="off"
              type="text"
              id="bungieName"
              name="bungieName"
              placeholder="Bungie Name"
            />
            {errors.bungieName ? (
              <div className="text-red-400">{errors.bungieName}</div>
            ) : null}
            {isSubmitting ? (
              <div className="animate-pulse">Loading...</div>
            ) : null}
          </Form>
        )}
      </Formik>
      <h1 className="bg-gradient-to-l from-amber-600 to-amber-300/95 bg-clip-text text-3xl font-bold text-transparent">
        Statistics
      </h1>
      {bungieData && (
        <>
          <div className="text-sm">
            {bungieData["error"] && <div>{bungieData["error"]}</div>}
            {bungieData["ErrorCode"] && (
              <div>
                {bungieData["ErrorCode"] !== 1 ? bungieData["Message"] : null}
              </div>
            )}
            <details className="cursor-pointer">
              <summary>Raw Data</summary>
              <pre dangerouslySetInnerHTML={markup()} />
            </details>
          </div>
          <div>
            <div>Profile: </div>
            <div className="flex gap-2">
              {characters.map((c: any) => (
                <div key={c.characterId}>
                  <p>{c.minutesPlayedTotal}</p>
                  <div className="relative">
                    <img
                      src={`https://www.bungie.net${c.emblemPath}`}
                      alt="emblem"
                    />
                    <div className="text-shadow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
                      Test
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>Kills: {bungieData.kills?.basic.value}</div>
            <div>Deaths: {bungieData.deaths?.basic.value}</div>
            <div>Assists: {bungieData.assists?.basic.value}</div>
            <div>Efficiency: {bungieData.efficiency?.basic.value}</div>
            <div>KDA: {bungieData.killsDeathsAssists?.basic.value}</div>
            <div>KDR: {bungieData.killsDeathsRatio?.basic.value}</div>
            <div>{stats}</div>
          </div>
        </>
      )}
      <pre className="text-sm">Authorization Code: {query.code}</pre>
    </>
  );
};

export default Home;
