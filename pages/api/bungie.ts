import { api_root_path, x_api_key } from "@utils/api";
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

      const users = await fetch(`${api_root_path}/User/Search/GlobalName/1/`, {
        method: "POST",
        headers: {
          "X-API-Key": x_api_key!,
        },
        body: JSON.stringify({
          displayNamePrefix: displayName,
        }),
      });
      const users_data = await users.json();
      console.log(users_data["Response"]);
      res.status(200).json(users_data);
      const result = await fetch(
        `${api_root_path}/Destiny2/SearchDestinyPlayerByBungieName/All/`,
        {
          method: "POST",
          headers: {
            "X-API-Key": x_api_key!,
          },
          body: JSON.stringify({
            displayName: displayName,
            displayNameCode: displayNameCode,
          }),
        }
      );

      const data = await result.json();

      const membershipId = data["Response"][0].membershipId;
      const stats = await fetch(
        `${api_root_path}/Destiny2/3/Account/${membershipId}/Stats/`,
        {
          headers: {
            "X-API-Key": x_api_key!,
          },
        }
      );
      const stat_json = await stats.json();

      res.status(200).json(users_data);
    } catch (e) {
      res
        .status(404)
        .json({ error: "Could not find any statistics for this user." });
    }
  }
};

export default handler;
