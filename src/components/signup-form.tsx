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
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, HeartPulse, Loader2 } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({})

  // Form submission handler to sign up with credentials
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")
    setFieldErrors({})

    // Validation
    const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {}
    if (!name) errors.name = "Full name is required"
    if (!email) errors.email = "Email is required"
    if (!password) errors.password = "Password is required"
    else if (password.length < 6) errors.password = "Must be at least 6 characters"
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setIsLoading(false)
      return
    }

    // Better Auth: Sign up with credentials
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => setIsLoading(true),
      onResponse: () => setIsLoading(false),
      onError: (ctx) => {
        setErrorMsg(ctx.error.message || "An error occurred during registration. Please try again.")
      },
      onSuccess: () => {
        router.push("/dashboard")
        router.refresh()
      }
    })
  }

  // Better Auth: Google OAuth Sign-in
  const handleGoogleSignIn = async () => {
    setErrorMsg("")
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    })
  }

  // Better Auth: GitHub OAuth Sign-in
  const handleGitHubSignIn = async () => {
    setErrorMsg("")
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-white text-zinc-950 font-sans">
      
      {/* LEFT PANEL: Vibrant Royal Blue & Clouds Slogan Design (Hidden on Mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between p-12 md:flex bg-blue-600 text-white overflow-hidden">
        
        {/* Decorative cloud-like vector SVG overlays in the background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,450 C300,500 600,300 900,450 C1200,600 1350,480 1440,400 L1440,600 L0,600 Z" fill="white"/>
            <path d="M0,350 C400,400 700,200 1000,350 C1300,500 1380,380 1440,300 L1440,600 L0,600 Z" fill="white" opacity="0.5"/>
          </svg>
        </div>

        {/* Top Logo Section */}
        <div className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide">
          <HeartPulse className="size-4.5" />
          <span>Vitals</span>
        </div>

        {/* Center Section: Hero Heading & Stats */}
        <div className="relative z-10 my-auto flex flex-col gap-6 max-w-md">
          <h1 className="text-3.5xl font-semibold tracking-tight leading-snug">
            Always be in control <br />
            of your health and vitals.
          </h1>
          
          <div className="flex flex-col gap-1.5 text-xs text-blue-100/90 font-medium">
            <p>10,000+ Active health logs logged today</p>
            <p>500,000+ Total healthy days tracked</p>
          </div>
        </div>

        {/* Bottom Section: Footer Credits */}
        <div className="relative z-10 text-[10px] text-blue-200">
          © 2026 Vitals Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL: Authentication Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-[340px]">
          
          {/* Logo & App Name */}
          <div className="flex flex-col items-center gap-1.5 mb-5 text-center">
            <span className="text-[13px] font-semibold text-zinc-900 tracking-tight">Vitals</span>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-950 leading-none">
              Create your account
            </h2>
            <p className="text-[11.5px] text-zinc-500 font-medium">
              Get started with vitals
            </p>
          </div>

          {/* General Server Error Display */}
          {errorMsg && (
            <div className="mb-4 rounded-xl bg-red-50 p-2.5 text-[11.5px] text-red-600 border border-red-100/80 flex items-center gap-2">
              <span className="font-semibold">Error:</span> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FieldGroup className="gap-3.5">

              {/* Full Name Input Field */}
              <Field data-invalid={!!fieldErrors.name}>
                <InputGroup className="bg-zinc-50 border border-zinc-100 rounded-2xl h-[38px]">
                  <InputGroupInput
                    id="name"
                    type="text"
                    placeholder="eg. john doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    aria-invalid={!!fieldErrors.name}
                    className="text-[13px] px-3.5 placeholder:text-zinc-400 placeholder:font-normal"
                  />
                </InputGroup>
                {fieldErrors.name && <FieldError className="text-[11px] mt-1">{fieldErrors.name}</FieldError>}
              </Field>
              
              {/* Email Input Field */}
              <Field data-invalid={!!fieldErrors.email}>
                <InputGroup className="bg-zinc-50 border border-zinc-100 rounded-2xl h-[38px]">
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    aria-invalid={!!fieldErrors.email}
                    className="text-[13px] px-3.5 placeholder:text-zinc-400 placeholder:font-normal"
                  />
                </InputGroup>
                {fieldErrors.email && <FieldError className="text-[11px] mt-1">{fieldErrors.email}</FieldError>}
              </Field>

              {/* Password & Confirm Password side-by-side (2-column layout) */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Password Input */}
                <Field data-invalid={!!fieldErrors.password}>
                  <InputGroup className="bg-zinc-50 border border-zinc-100 rounded-2xl h-[38px]">
                    <InputGroupInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={!!fieldErrors.password}
                      className="text-[13px] px-3.5 placeholder:text-zinc-400 placeholder:font-normal"
                    />
                  </InputGroup>
                  {fieldErrors.password && <FieldError className="text-[11px] mt-1">{fieldErrors.password}</FieldError>}
                </Field>

                {/* Confirm Password Input */}
                <Field data-invalid={!!fieldErrors.confirmPassword}>
                  <InputGroup className="bg-zinc-50 border border-zinc-100 rounded-2xl h-[38px]">
                    <InputGroupInput
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={!!fieldErrors.confirmPassword}
                      className="text-[13px] px-3.5 placeholder:text-zinc-400 placeholder:font-normal"
                    />
                  </InputGroup>
                  {fieldErrors.confirmPassword && <FieldError className="text-[11px] mt-1">{fieldErrors.confirmPassword}</FieldError>}
                </Field>
              </div>

              {/* Master eye toggle to reveal both password inputs */}
              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="size-3" /> Hide passwords
                    </>
                  ) : (
                    <>
                      <Eye className="size-3" /> Show passwords
                    </>
                  )}
                </button>
              </div>
              
            </FieldGroup>

            {/* Charcoal Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#404040] text-white hover:bg-zinc-800 rounded-2xl h-[38px] text-[12.5px] font-medium transition-all shadow-sm hover:shadow cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <span className="text-[14px]">→</span>
                </>
              )}
            </Button>

            {/* Redirection link to Login */}
            <div className="text-center text-[12px] text-zinc-500 mt-1">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-zinc-800 underline underline-offset-3 hover:text-zinc-950 transition-colors"
              >
                sign in
              </Link>
            </div>

            {/* Separator / Divider - OR - */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-zinc-100"></div>
              <span className="flex-shrink mx-2 text-[10px] text-zinc-300 font-bold uppercase tracking-wider">— OR —</span>
              <div className="flex-grow border-t border-zinc-100"></div>
            </div>

            {/* Social Authentication Row: Side-by-Side buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google login */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full rounded-2xl border-zinc-200 hover:bg-zinc-50 text-[11.5px] font-medium h-[38px] cursor-pointer flex items-center justify-center gap-1.5 px-2.5"
              >
                {/* Google Icon */}
                <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Continue with G</span>
              </Button>

              {/* GitHub login */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGitHubSignIn}
                disabled={isLoading}
                className="w-full rounded-2xl border-zinc-200 hover:bg-zinc-50 text-[11.5px] font-medium h-[38px] cursor-pointer flex items-center justify-center gap-1.5 px-2.5"
              >
                {/* GitHub Icon */}
                <svg className="size-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>Continue with Git</span>
              </Button>
            </div>
          </form>

          {/* Terms and conditions tiny footer */}
          <div className="mt-8 text-center text-[10px] text-zinc-400 font-medium leading-relaxed max-w-[280px] mx-auto">
            By creating account, you agree to our{" "}
            <Link
              href="/terms"
              className="font-bold underline hover:text-zinc-600 transition-colors"
            >
              terms & conditions
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
