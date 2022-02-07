import { api_root_path } from "@utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = JSON.parse(req.body);
    console.log(id);

    const result = await fetch(
      // `${api_root_path}/Destiny2/SearchDestinyPlayerByBungieName/-1`,
      `${api_root_path}/Destiny2/SearchDestinyPlayerByBungieName/All`,
      {
        method: "POST",
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_X_API_KEY!,
        },
        body: JSON.stringify({
          displayName: "Cameron",
          displayNameCode: "370",
        }),
      }
    );

    const data = await result.json();

    const membershipId = data["Response"][1].membershipId;
    const stats = await fetch(
      `${api_root_path}/Destiny2/3/Account/${membershipId}/Stats/`,
      {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_X_API_KEY!,
        },
      }
    );
    const stat_json = await stats.json();
    console.log(stat_json["Response"]);

    res.status(200).json(stat_json);
  }
};

export default handler;
