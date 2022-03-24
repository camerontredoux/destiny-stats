import { api } from "@pages/index";

export const characterStats = async (membershipId: string) => {
  const characters = await api.getCharacters(membershipId);
  const res: { type: string; value: number }[] = [];
  for (let c of Object.keys(characters)) {
    // console.log(characters[c].stats);
    const stats = characters[c].stats;
    // console.log(stats);

    for (let s of Object.keys(stats)) {
      const manifest = await api.getManifest("DestinyStatDefinition", s);
      const type = manifest.Response.displayProperties;
      // console.log(type.name, stats[s]);
      const o = { type: type.name, value: stats[s] };
      res.concat(o);
    }
  }

  return res;
};
