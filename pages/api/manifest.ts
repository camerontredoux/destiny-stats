import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id }: { id: string } = JSON.parse(req.body);

    const [name, code] = id.split("#");
  } catch (e) {
    console.log(e);
  }
};

export default handler;
