"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  HeartPulse,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  Moon,
  Droplet,
  Plus,
  Flame,
  Search,
  Bell,
} from "lucide-react"

// Define props to receive the user's session data from the server
interface DashboardClientProps {
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Better Auth: Sign out handler
  // documentation: https://better-auth.com/docs/authentication/email-password
  const handleLogout = async () => {
    setIsLoggingOut(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
          router.refresh()
        },
      },
    })
  }

  // Sidebar navigation options
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "metrics", label: "Vitals & Metrics", icon: Activity },
    { id: "settings", label: "Account Settings", icon: Settings },
  ]

  // Mock health logs data for the dashboard demo
  const mockLogs = [
    { id: 1, type: "Heart Rate", value: "72 bpm", time: "Just now", status: "Normal", color: "text-red-500 bg-red-50" },
    { id: 2, type: "Steps", value: "8,432 steps", time: "2 hours ago", status: "84% of goal", color: "text-orange-500 bg-orange-50" },
    { id: 3, type: "Sleep", value: "7h 45m", time: "This morning", status: "Restful", color: "text-indigo-500 bg-indigo-50" },
    { id: 4, type: "Water", value: "1.2 L", time: "4 hours ago", status: "48% of goal", color: "text-blue-500 bg-blue-50" },
  ]

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex min-h-screen w-full bg-zinc-50/50 text-zinc-900 font-sans">
      
      {/* 1. SIDEBAR: Premium Rounded sidebar */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-zinc-100 bg-white p-6">
        <div className="flex flex-col gap-8">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-500/20">
              <HeartPulse className="size-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Vitals</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-2xl transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Icon className="size-4.5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* PROFILE SECTION: Bottom sidebar interactive section */}
        <div className="flex flex-col gap-4">
          <Separator className="bg-zinc-100" />
          
          <DropdownMenu>
            {/* Dropdown Trigger - Displays User Avatar, Name, Email */}
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 p-1.5 rounded-2xl hover:bg-zinc-50 transition-colors text-left outline-none cursor-pointer">
                <Avatar className="size-9 border border-zinc-200">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-orange-50 text-orange-600 text-xs font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 truncate leading-none mb-1">
                    {user.name}
                  </p>
                  <p className="text-xs text-zinc-500 truncate leading-none">
                    {user.email}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent align="end" className="w-56 bg-white border border-zinc-100 shadow-xl rounded-3xl p-1.5">
              <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setActiveTab("settings")} className="cursor-pointer rounded-2xl px-3 py-2 hover:bg-zinc-50">
                  <User className="mr-2 size-4 text-zinc-500" />
                  <span>Profile details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")} className="cursor-pointer rounded-2xl px-3 py-2 hover:bg-zinc-50">
                  <Settings className="mr-2 size-4 text-zinc-500" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-zinc-100" />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="destructive"
                className="cursor-pointer rounded-2xl px-3 py-2 text-red-600 focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-2 size-4" />
                <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Panel */}
        <header className="flex h-16 items-center justify-between border-b border-zinc-100 bg-white px-6 md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Brand View */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                <HeartPulse className="size-4" />
              </div>
              <span className="text-md font-bold tracking-tight">Vitals</span>
            </div>
            
            <h2 className="hidden md:block text-md font-bold text-zinc-900 uppercase tracking-wider text-xs">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "metrics" && "Health Vitals & Logs"}
              {activeTab === "settings" && "Account Preferences"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-1.5 rounded-full hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
              <span className="absolute top-1 right-1 size-2 rounded-full bg-orange-500" />
              <Bell className="size-4.5" />
            </button>
            
            {/* Mobile Logout option direct trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="md:hidden flex items-center gap-2 cursor-pointer outline-none">
                  <Avatar className="size-8">
                    {user.image && <AvatarImage src={user.image} alt={user.name} />}
                    <AvatarFallback className="bg-orange-50 text-orange-600 text-xs font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-50 bg-white border border-zinc-100 shadow-xl rounded-3xl p-1.5">
                <DropdownMenuLabel className="truncate px-3 py-2 text-xs font-semibold text-zinc-900">
                  {user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-100" />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} variant="destructive" className="text-red-600 focus:bg-red-50 focus:text-red-600 rounded-2xl">
                  <LogOut className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-8">
              
              {/* Greeting Section */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-sm text-zinc-500">
                  Here is a snapshot of your vitals and activity details.
                </p>
              </div>

              {/* HEALTH STATS GRID */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Heart Rate Widget */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Heart Rate</span>
                    <div className="flex size-8 items-center justify-center rounded-2xl bg-red-50 text-red-500 animate-pulse">
                      <HeartPulse className="size-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold tracking-tight text-zinc-900">72</span>
                    <span className="text-xs font-semibold text-zinc-500">bpm</span>
                  </div>
                  <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>●</span> Resting heart rate normal
                  </p>
                </div>

                {/* Steps Widget */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Daily Steps</span>
                    <div className="flex size-8 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                      <Flame className="size-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold tracking-tight text-zinc-900">8,432</span>
                    <span className="text-xs font-semibold text-zinc-500">/ 10,000</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: "84%" }} />
                  </div>
                  <p className="mt-2.5 text-xs text-zinc-500 font-medium">
                    84% of daily target reached
                  </p>
                </div>

                {/* Sleep Widget */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sleep Tracker</span>
                    <div className="flex size-8 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                      <Moon className="size-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold tracking-tight text-zinc-900">7.7</span>
                    <span className="text-xs font-semibold text-zinc-500">hours</span>
                  </div>
                  <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>●</span> Rest quality was excellent
                  </p>
                </div>

                {/* Hydration Widget */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm transition-all hover:shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Hydration</span>
                    <div className="flex size-8 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                      <Droplet className="size-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold tracking-tight text-zinc-900">1.2</span>
                    <span className="text-xs font-semibold text-zinc-500">/ 2.5 Liters</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: "48%" }} />
                  </div>
                  <p className="mt-2.5 text-xs text-zinc-500 font-medium">
                    Drink another 1.3L to reach target
                  </p>
                </div>

              </div>

              {/* DETAILED CARDS SECTION */}
              <div className="grid gap-6 lg:grid-cols-3">
                
                {/* Recent Logs Table Card */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Recent Health Logs</h3>
                    <Button variant="ghost" size="sm" className="text-xs text-orange-600 hover:text-orange-500 rounded-2xl cursor-pointer">
                      View all
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {mockLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border border-zinc-50 rounded-2xl hover:bg-zinc-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`flex size-9 items-center justify-center rounded-xl font-semibold text-xs ${log.color}`}>
                            {log.type[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">{log.type}</p>
                            <p className="text-xs text-zinc-400">{log.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-zinc-900">{log.value}</p>
                          <p className="text-xs text-emerald-600 font-medium">{log.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Record Card */}
                <div className="rounded-3xl border border-zinc-100 bg-white p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Quick Action</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Log new health records instantly to keep your vitals indicators updated.
                    </p>
                  </div>
                  
                  <div className="mt-8 flex flex-col gap-2.5">
                    <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-3xl h-10 font-medium transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2">
                      <Plus className="size-4" />
                      Log Heart Rate
                    </Button>
                    <Button variant="outline" className="w-full border-zinc-200 hover:bg-zinc-50 rounded-3xl h-10 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2">
                      Log Water Intake
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: METRICS */}
          {activeTab === "metrics" && (
            <div className="flex flex-col gap-6 bg-white p-6 border border-zinc-100 rounded-3xl shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900">Vitals & Health Metrics</h2>
              <p className="text-sm text-zinc-500">
                Detailed breakdowns of your health data, synced from connected wearable devices.
              </p>
              <div className="h-64 flex items-center justify-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                <p className="text-xs text-zinc-400">Activity and vitals chart visualization placeholder</p>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-6 bg-white p-6 border border-zinc-100 rounded-3xl shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900">Account Preferences</h2>
              <p className="text-sm text-zinc-500">
                Manage your profile settings, security settings, and connected integrations.
              </p>
              <div className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1 p-3 bg-zinc-50 rounded-2xl">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Registered Name</span>
                  <span className="text-sm font-semibold text-zinc-900">{user.name}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-zinc-50 rounded-2xl">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-sm font-semibold text-zinc-900">{user.email}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 bg-zinc-50 rounded-2xl">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Authentication Provider</span>
                  <span className="text-sm font-semibold text-zinc-900 text-orange-600">Email & Credentials</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
