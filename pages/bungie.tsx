import { useRouter } from "next/router";
import React from "react";

interface BungieProps {}

const Bungie: React.FC<BungieProps> = () => {
  const { query } = useRouter();
  console.log(query.code);

  return <>test</>;
};

export default Bungie;
