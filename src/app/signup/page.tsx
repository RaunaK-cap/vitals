import type { Metadata } from "next"
import { SignupForm } from "@/components/signup-form"

// SEO Best Practice: Add unique descriptive titles and meta descriptions for search engines.
export const metadata: Metadata = {
  title: "Create an Account - Vitals",
  description: "Sign up for a Vitals account to easily track your personal health and vitality indicators.",
}

export default function SignupPage() {
  return <SignupForm />
}
