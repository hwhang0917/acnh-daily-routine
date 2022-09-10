import type { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_LAT, DEFAULT_LON, OPENWEATHER_API } from "@constants";
import type { IOpenWeatherResponse } from "@interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Parse API Key
  const apiKey = process.env.OPENWEATHER_APIKEY;
  if (!apiKey)
    res.status(401).json({
      statusCode: 401,
      message: "Open Weather API Key is required.",
      error: "Unauthorized",
    });

  // Parse Coordiates
  const lat = req.query["lat"] ?? DEFAULT_LAT;
  const lon = req.query["lon"] ?? DEFAULT_LON;
  const parsedLat = parseFloat(lat as string);
  const parsedLon = parseFloat(lon as string);
  if (!parsedLat || !parsedLon) {
    res.status(400).json({
      statusCode: 400,
      message: "Invalid latitude or longitude.",
      error: "Bad Request",
    });
  }

  try {
    // Request Open Weatehr API
    const response = await new Promise<IOpenWeatherResponse>(
      (resolve, reject) => {
        fetch(
          OPENWEATHER_API +
            `?lat=${parsedLat}&lon=${parsedLon}&appId=${apiKey}&units=metric`
        )
          .then((resp) => resp.json())
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    );

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
