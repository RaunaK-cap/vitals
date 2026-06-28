"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, HeartPulse, Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  // Form submission handler using Better Auth client
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")
    setFieldErrors({})

    // Simple validation before sending request to server
    const errors: { email?: string; password?: string } = {}
    if (!email) errors.email = "Email is required"
    if (!password) errors.password = "Password is required"

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setIsLoading(false)
      return
    }

    // Better Auth: Sign in with credentials
    // documentation: https://better-auth.com/docs/authentication/email-password
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => setIsLoading(true),
      onResponse: () => setIsLoading(false),
      onError: (ctx) => {
        setErrorMsg(ctx.error.message || "Invalid credentials. Please try again.")
      },
      onSuccess: () => {
        router.push("/dashboard")
        router.refresh()
      }
    })
  }

  // Better Auth: Sign in with Social Provider (Google)
  // documentation: https://better-auth.com/docs/authentication/social-providers
  const handleGoogleSignIn = async () => {
    setErrorMsg("")
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-white text-zinc-900">
      
      {/* LEFT PANEL: Premium Slogan & Gradient Design (Hidden on Mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between p-10 md:flex bg-zinc-50 border-r border-zinc-100">
        {/* Soft Radial Gradient Background */}
        <div 
          className="absolute inset-4 rounded-3xl"
          style={{
            background: "radial-gradient(circle at 10% 20%, rgba(254, 215, 170, 0.4) 0%, rgba(255, 237, 213, 0.3) 40%, rgba(255, 255, 255, 0) 100%)",
            border: "1px solid rgba(228, 228, 231, 0.5)",
          }}
        />

        {/* Top Section: Brand Logo */}
        <div className="relative z-10 flex items-center gap-2 font-medium text-zinc-900">
          <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/20">
            <HeartPulse className="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Vitals</span>
        </div>

        {/* Center Section: Marketing Text */}
        <div className="relative z-10 my-auto flex flex-col gap-4 max-w-md">
          <span className="text-sm font-semibold tracking-wider text-orange-600 uppercase">Personal Health Hub</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 leading-none">
            Simplify your health <br />
            and vitality.
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Get access to your personal health hub for clarity and productivity. Monitor indicators, log daily activities, and stay on top of your body's vitals.
          </p>
        </div>

        {/* Bottom Section: Footer Credits */}
        <div className="relative z-10 text-xs text-zinc-400">
          © 2026 Vitals Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-8 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          
          {/* Logo visible only on Mobile */}
          <div className="flex items-center gap-2 mb-8 md:hidden justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
              <HeartPulse className="size-4.5" />
            </div>
            <span className="text-md font-bold tracking-tight">Vitals</span>
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Sign in to Vitals
            </h2>
            <p className="text-sm text-zinc-500">
              Enter your details below to log in to your account
            </p>
          </div>

          {/* General Server Error Display */}
          {errorMsg && (
            <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
              <span className="font-semibold">Error:</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FieldGroup>
              
              {/* Email Input Field */}
              <Field data-invalid={!!fieldErrors.email}>
                <FieldLabel htmlFor="email" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Your email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    aria-invalid={!!fieldErrors.email}
                  />
                </InputGroup>
                {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
              </Field>

              {/* Password Input Field */}
              <Field data-invalid={!!fieldErrors.password}>
                <div className="flex justify-between items-center w-full">
                  <FieldLabel htmlFor="password" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    aria-invalid={!!fieldErrors.password}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-zinc-400" />
                      ) : (
                        <Eye className="size-4 text-zinc-400" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
              </Field>
              
            </FieldGroup>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-zinc-950 text-white hover:bg-zinc-900 rounded-3xl h-10 font-medium transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Separator / Divider */}
            <FieldSeparator>or continue with</FieldSeparator>

            {/* Social Authentication Options */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full rounded-3xl border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 transition-all font-medium h-10 cursor-pointer flex items-center justify-center gap-2"
              >
                {/* Google Icon SVG */}
                <svg className="size-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
            </div>
          </form>

          {/* Bottom redirection message */}
          <div className="mt-8 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
