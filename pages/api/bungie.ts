import { api_root_path, x_api_key } from "@utils/api";
import { DestinyAPI } from "@utils/DestinyAPI";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id }: { id: string } = JSON.parse(req.body);

      const [name, code] = id.split("#");

      const api = new DestinyAPI(x_api_key!);
      const results = await api.post(
        "Destiny2/SearchDestinyPlayerByBungieName/All/",
        { displayName: name, displayNameCode: code }
      );

      const data: any = await results.json();

      const steamMembershipId = await api.getSteamMembershipId(name, code);
      const characters = await api.getCharacters(steamMembershipId!);
      console.log(characters);
      for (let characterId in characters) {
        console.log(characters[characterId].minutesPlayedTotal);
      }

      const race = await api.getManifest("DestinyRaceDefinition", "2803282938");

      const gender = await api.getManifest(
        "DestinyGenderDefinition",
        "3111576190"
      );

      const classname = await api.getManifest(
        "DestinyClassDefinition",
        "3655393761"
      );

      // console.log(race, gender, classname);

      res.status(200).json(characters);
      return;
      // console.log(data);

      // const users = await fetch(`${api_root_path}/User/Search/GlobalName/1/`, {
      //   method: "POST",
      //   headers: {
      //     "X-API-Key": x_api_key!,
      //   },
      //   body: JSON.stringify({
      //     displayNamePrefix: displayName,
      //   }),
      // });
      // const users_data = await users.json();
      // // console.log(users_data["Response"]);
      // res.status(200).json(users_data);
      // return;

      let membershipId;

      for (let type in data["Response"]) {
        if (data["Response"][type].membershipType === 3) {
          membershipId = data["Response"][type].membershipId;
        }
      }

      const stats = await fetch(
        `${api_root_path}/Destiny2/3/Account/${membershipId}/Stats/`,
        {
          headers: {
            "X-API-Key": x_api_key!,
          },
        }
      );
      const stat_json = await stats.json();
      const stats_response =
        stat_json["Response"]["mergedAllCharacters"].results.allPvP.allTime;

      res.status(200).json(stats_response);
    } catch (e) {
      console.log(e);

      res
        .status(404)
        .json({ error: "Could not find any statistics for this user." });
    }
  }
};

export default handler;
