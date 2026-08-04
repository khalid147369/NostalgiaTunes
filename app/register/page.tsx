import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/auth-shell'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Create account — NostalgiaSongs',
  description: 'Join NostalgiaSongs and save the themes that raised you.',
}

export default function RegisterPage() {
  return (
    <AuthShell
      title="Start remembering"
      titleAccent="this song..."
      subtitle="Create your account to save favorites from the cartoons and anime that raised you."
    >
      <RegisterForm />
    </AuthShell>
  )
}
