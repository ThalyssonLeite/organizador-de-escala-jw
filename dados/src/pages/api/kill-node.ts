import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  exec('taskkill /im node.exe -f')
}