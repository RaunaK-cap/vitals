import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check session using Better Auth on the server
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to /dashboard if logged in, otherwise /login
  if (session) {
    redirect("/dashboard");
  } 

  return <div>
    <h1> VItals landing page </h1>
  </div>
}
