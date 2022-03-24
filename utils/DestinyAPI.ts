export class DestinyAPI {
  readonly root: string = "https://www.bungie.net/Platform";

  XAPIKey: string;
  headers: { "X-API-Key": string };

  constructor(XAPIKey: string) {
    this.XAPIKey = XAPIKey;
    this.headers = { "X-API-Key": this.XAPIKey };
  }

  async get(path: string): Promise<Response> {
    return await fetch(`${this.root}/${path}`, {
      headers: this.headers,
    });
  }

  async post(path: string, options: any): Promise<Response> {
    return await fetch(`${this.root}/${path}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(options),
    });
  }

  async searchPlayerByBungieName(
    displayName: string,
    displayNameCode: string
  ): Promise<Response> {
    return await this.post("Destiny2/SearchDestinyPlayerByBungieName/All/", {
      displayName,
      displayNameCode,
    });
  }

  async getSteamMembershipId(
    displayName: string,
    displayNameCode: string
  ): Promise<string | null> {
    const data: any = await this.searchPlayerByBungieName(
      displayName,
      displayNameCode
    ).then((res) => res.json());

    for (let account of data.Response) {
      if (account.membershipType === 3) {
        return account.membershipId;
      }
    }

    return null;
  }

  async getCharacters(membershipId: string): Promise<any> {
    const data: any = await this.get(
      `Destiny2/3/Profile/${membershipId}/?components=200`
    ).then((res) => res.json());
    return data.Response.characters.data;
  }

  async getManifest(entityType: string, hash: string): Promise<any | null> {
    return await this.get(`Destiny2/Manifest/${entityType}/${hash}`).then(
      (res) => res.json()
    );
  }
}
