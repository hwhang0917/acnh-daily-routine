import { useState, useEffect, useCallback } from "react";

interface IGeoState {
  coords?: GeolocationCoordinates;
  error?: string | null;
}

export const useGeolocation = () => {
  const [geoState, setGeoState] = useState<IGeoState>({});

  const setGeolocation: PositionCallback = useCallback(({ coords }) => {
    setGeoState({
      coords,
    });
  }, []);
  const setError: PositionErrorCallback = useCallback(({ code, message }) => {
    setGeoState({ error: `ERROR: (${code}) => ${message}` });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setGeolocation, setError);
    } else {
      const notSupportedErr =
        "Geolocation is not supported for this type of browser.";
      console.error(notSupportedErr);
      setGeoState({
        error: notSupportedErr,
      });
    }
  }, [geoState]);

  return geoState;
};
