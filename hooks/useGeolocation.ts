import { useCallback, useEffect, useState } from "react";
import { DEFAULT_LAT, DEFAULT_LON } from "@constants";

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

/**
 * Seoul, South Korea coordinates
 */
const initialState: IGeolocation = {
  latitude: DEFAULT_LAT,
  longitude: DEFAULT_LON,
};

/**
 * Get coordinates using Geolocation API
 */
export const useGeolocation = () => {
  const [coords, setCoords] = useState<IGeolocation>(initialState);

  const positionCallback = useCallback<PositionCallback>(
    ({ coords: { latitude, longitude } }) => {
      setCoords({ latitude, longitude });
    },
    []
  );
  const positionErrorCallback = useCallback<PositionErrorCallback>(
    ({ code, message }) => console.error(`[${code}] ${message}`),
    []
  );

  const fetchGeolocation = useCallback(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        positionCallback,
        positionErrorCallback
      );
    }
  }, []);

  // Get geolocation on load
  useEffect(() => {
    fetchGeolocation();
  }, []);

  return { coords, fetchGeolocation };
};
