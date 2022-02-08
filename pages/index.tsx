import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

interface HomeProps {}

const BungieNameScheme = yup.object().shape({
  bungieName: yup
    .string()
    .trim()
    .matches(/[a-zA-Z]+#[0-9]+/, "Invalid Bungie Name")
    .required("Required"),
});

const Home: NextPage<HomeProps> = () => {
  const { query } = useRouter();
  const [bungieData, setBungieData] = useState<any | null>(null);

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
          await fetch("https://localhost:3000/api/bungie", {
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
        <pre className="text-center text-sm">
          {bungieData["error"] && <div>{bungieData["error"]}</div>}
          {bungieData["ErrorCode"] && (
            <div>
              {bungieData["ErrorCode"] !== 1 ? bungieData["Message"] : null}
            </div>
          )}
          {JSON.stringify(bungieData["Response"], null, 2)}
        </pre>
      )}
      <pre className="text-sm">Authorization Code: {query.code}</pre>
    </>
  );
};

export default Home;
