import type { Metadata } from 'next'
import { AuthShell } from '../../components/auth/auth-shell'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Sign in — NostalgiaSongs',
  description: 'Sign in to relive the soundtrack of your childhood.',
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      titleAccent="to the memory..."
      subtitle="Sign in to pick up right where your Saturday mornings left off."
    >
      <LoginForm />
    </AuthShell>
  )
}