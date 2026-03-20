import { NextResponse } from "next/server";

import { getAQIData, getIMDForecast, getWeatherData } from "@/lib/mock-apis";

export async function GET() {
  const pincode = "400001";
  const [weather, aqi, forecast] = await Promise.all([
    getWeatherData(pincode),
    getAQIData(pincode),
    getIMDForecast(pincode),
  ]);

  return NextResponse.json({ weather, aqi, forecast });
}
