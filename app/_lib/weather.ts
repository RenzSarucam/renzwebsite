// Live weather for Davao City from Open-Meteo (free, no API key).
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=7.07&longitude=125.61&current=temperature_2m,weather_code&timezone=Asia%2FManila";

export type Weather = { temp: number; label: string };

/** WMO weather interpretation codes → a short newsroom-style description. */
function describe(code: number): string {
  if (code === 0) return "Clear skies";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Light drizzle";
  if (code >= 61 && code <= 65) return code === 65 ? "Heavy rain" : "Rain showers";
  if (code === 66 || code === 67) return "Freezing rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm, hail";
  return "Fair";
}

/** Refreshed at most every 30 minutes; returns null if the service is unreachable. */
export async function getDavaoWeather(): Promise<Weather | null> {
  try {
    const res = await fetch(URL, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const temp = data?.current?.temperature_2m;
    const code = data?.current?.weather_code;
    if (typeof temp !== "number" || typeof code !== "number") return null;
    return { temp: Math.round(temp), label: describe(code) };
  } catch {
    return null;
  }
}
