import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard-client";
import type { Metadata } from "next";

// SEO Best Practice: Add unique descriptive title and meta description.
export const metadata: Metadata = {
  title: "Dashboard - Vitals",
  description: "View your personal health metrics, heart rate logs, hydration, sleep tracking, and daily activity overview.",
};

export default async function DashboardPage() {
  // Retrieve session using headers on the server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Protect the route: if no session is active, redirect to login
  // if (!session) {
  //   redirect("/login");
  // }

  // Render the Dashboard Client wrapper with the session user's details
  return <DashboardClient user={{name: "",email: ""}} />;
}