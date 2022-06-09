import { useState, useEffect, useCallback } from "react";

interface IGeoState {
  coords: {
    lat: number | null;
    long: number | null;
  };
  error: string | null;
}

export const useGeolocation = () => {
  const [geoState, setGeoState] = useState<IGeoState>({
    coords: { lat: null, long: null },
    error: null,
  });

  const setGeolocation = useCallback<PositionCallback>(
    ({ coords: { latitude: lat, longitude: long } }) => {
      setGeoState({
        coords: { lat, long },
        error: null,
      });
    },
    [setGeoState]
  );

  const setError = useCallback<PositionErrorCallback>(
    ({ code, message }) => {
      setGeoState({
        coords: { lat: null, long: null },
        error: `ERROR: (${code}) => ${message}`,
      });
    },
    [setGeoState]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setGeolocation, setError);
    } else {
      const notSupportedErr =
        "Geolocation is not supported for this type of browser.";
      console.log(notSupportedErr);
      setGeoState({
        coords: { long: null, lat: null },
        error: notSupportedErr,
      });
    }
  }, [setGeolocation, setError]);

  return geoState;
};
