import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import Logo from '../logo/logo'

export function AuthShell({
  title,
  titleAccent,
  subtitle,
  children,
}: {
 
  title: string
  titleAccent: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/70"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col px-6 py-8 md:px-12">
        <header>
          <Logo />
        </header>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-6 flex flex-col items-start gap-4">
            
              <h1 className="text-4xl font-bold leading-tight text-balance md:text-5xl">
                {title}{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {subtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-2xl backdrop-blur-md md:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
