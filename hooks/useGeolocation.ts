import { useCallback, useEffect, useState } from "react";

interface ICoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Seoul, South Korea coordinates
 */
const initialState: ICoordinates = {
  latitude: 37.25,
  longitude: 127.06,
};

export const useGeolocation = () => {
  const [coords, setCoords] = useState<ICoordinates>(initialState);

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

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        positionCallback,
        positionErrorCallback
      );
    }
  }, []);

  return coords;
};
