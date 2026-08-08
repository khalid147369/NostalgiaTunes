'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthDTO } from '@/types'
import { useRegister } from '@/hooks/auth/useRegister'

type Errors = {
  username?: string
  email?: string
  password?: string
}

export function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<string | null>(null)
  const registerMutation = useRegister();

  function validate() {
    const next: Errors = {}
    if (username.trim().length < 3) {
      next.username = 'Username must be at least 3 characters.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      next.username = 'Only letters, numbers, and underscores are allowed.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email address.'
    }
    if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return
    // TODO: wire this up to a real auth backend (e.g. Better Auth + Neon)
    setStatus(
      'Looks good! Connect a database integration to enable real registration.',
    )
        const user:AuthDTO ={
          email:email,
          password:password,
          nombre:username
        }
        const data = await registerMutation.mutateAsync(user) 
        setEmail("")
        setUsername("")
        setPassword("")
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="saturday_morning_kid"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={!!errors.username}
          className="h-11 rounded-lg"
        />
        {errors.username && (
          <p className="text-sm text-destructive">{errors.username}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          className="h-11 rounded-lg"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
            className="h-11 rounded-lg pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      {status && (
        <p
          role="status"
          className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {status}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-full text-base font-semibold shadow-[0_0_24px_rgba(168,85,247,0.4)]"
      >
        <UserPlus className="size-4" aria-hidden="true" />
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link style={{ color: 'oklch(0.85 0.13 200)' }}  href="/login" className="font-medium  hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
