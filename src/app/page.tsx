"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  
  // Use client-side Better Auth React hook to get session status
  // documentation: https://better-auth.com/docs/authentication/email-password
  const { data: session, isPending } = authClient.useSession()

  // Redirect to dashboard automatically if user is logged in
  useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard")
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-zinc-950">
        <p className="text-xs text-zinc-400 font-medium animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-zinc-950 font-sans p-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-[280px]">
        <h1 className="text-lg font-bold tracking-tight">Vitals Landing Page</h1>
        <p className="text-xs text-zinc-500">Simplify your health and vitality tracking.</p>
        <Button 
          onClick={() => router.push("/login")} 
          className="w-full bg-zinc-950 text-white rounded-2xl text-xs h-[38px] cursor-pointer hover:bg-zinc-800 transition-colors"
        >
          Login to your account
        </Button>
      </div>
    </div>
  )
}
