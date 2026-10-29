import { useEffect, useState } from "react";
import { fetchHandlingRate, FALLBACK_HANDLING_RATE } from "../Services/SettingsService";

/**
 * Handling-charge rates configured in the admin panel, loaded once per mount so a
 * rate change reaches customers without a redeploy. Starts on the fallback rates
 * so totals never render blank while the request is in flight.
 */
const useHandlingRate = () => {
  const [handlingRate, setHandlingRate] = useState(FALLBACK_HANDLING_RATE);

  useEffect(() => {
    let cancelled = false;

    fetchHandlingRate().then((rate) => {
      if (!cancelled) setHandlingRate(rate);
    });

    return () => { cancelled = true; };
  }, []);

  return [handlingRate, setHandlingRate];
};

export default useHandlingRate;
