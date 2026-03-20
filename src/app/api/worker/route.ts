import { NextResponse } from "next/server";

const workers = [
  {
    worker_id: "SWG1024",
    name: "Ravi Kumar",
    platform: "swiggy",
    city: "Mumbai",
    pincode: "400001",
    coverage_tier: "Silver",
  },
  {
    worker_id: "ZMT7712",
    name: "Imran Shaikh",
    platform: "zomato",
    city: "Delhi",
    pincode: "110001",
    coverage_tier: "Bronze",
  },
];

export async function GET() {
  return NextResponse.json({ data: workers, count: workers.length });
}
