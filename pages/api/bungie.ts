import { api_root_path } from "@utils/api";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id } = JSON.parse(req.body);
      const hashtag = id.indexOf("#");
      const displayName = id.slice(0, hashtag);
      const rawDisplayNameCode = id.slice(hashtag + 1);
      const displayNameCode =
        rawDisplayNameCode[0] === "0"
          ? rawDisplayNameCode.substr(1)
          : rawDisplayNameCode;

      const result = await fetch(
        `${api_root_path}/Destiny2/SearchDestinyPlayerByBungieName/All`,
        {
          method: "POST",
          headers: {
            "X-API-Key": process.env.NEXT_PUBLIC_X_API_KEY!,
          },
          body: JSON.stringify({
            displayName: displayName,
            displayNameCode: displayNameCode,
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

      res.status(200).json(stat_json);
    } catch (e) {
      res.status(400).json({ error: "No Bungie user with that name." });
    }
  }
};

export default handler;
