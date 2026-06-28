import type { Metadata } from "next"
import { LoginForm } from "@/components/login-form"

// SEO Best Practice: Add unique descriptive titles and meta descriptions for search engines.
export const metadata: Metadata = {
  title: "Sign In - Vitals",
  description: "Log in to your Vitals account to track, monitor, and stay on top of your health indications.",
}

export default function LoginPage() {
  return <LoginForm />
}
