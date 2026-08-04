'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/adminUi/button'
import { Input } from '@/components/ui/adminUi/input'
import { Label } from '@/components/ui/adminUi/label'
import { Separator } from '@/components/ui/adminUi/separator'
import { Switch } from '@/components/ui/adminUi/switch'
import { Textarea } from '@/components/ui/adminUi/textarea'
import { SectionHeader } from './section-header'

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Configuration"
        title="Settings"
        description="Fine-tune how NostalgiaSongs works for the whole community."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-heading text-lg font-bold">General</h3>
          <p className="mb-5 text-sm text-muted-foreground">Basic information about the platform.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site name</Label>
              <Input
                id="site-name"
                defaultValue="NostalgiaSongs"
                className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                defaultValue="Every channel had a sound"
                className="h-10 rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Description</Label>
              <Textarea
                id="site-description"
                rows={3}
                defaultValue="Jump back into the worlds you grew up in. Hundreds of themes waiting to be remembered."
                className="rounded-xl border-glass-border bg-secondary/50 focus-visible:ring-primary/50"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: 'easeOut' }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-heading text-lg font-bold">Community</h3>
          <p className="mb-5 text-sm text-muted-foreground">Moderation and community behavior.</p>
          <div className="space-y-1">
            {[
              { id: 'auto-approve', label: 'Auto-approve comments', desc: 'Skip the moderation queue for trusted members.', on: false },
              { id: 'new-signups', label: 'Allow new sign-ups', desc: 'Let new listeners create accounts.', on: true },
              { id: 'weekly-digest', label: 'Weekly digest email', desc: 'Send trending songs to subscribers every Friday.', on: true },
              { id: 'explicit-filter', label: 'Content filter', desc: 'Automatically flag comments with restricted words.', on: true },
            ].map((setting, i, arr) => (
              <div key={setting.id}>
                <div className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <Label htmlFor={setting.id} className="text-sm font-medium">
                      {setting.label}
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">{setting.desc}</p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.on} className="data-[state=checked]:bg-primary" />
                </div>
                {i < arr.length - 1 && <Separator className="bg-border" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.45, ease: 'easeOut' }}
        className="flex justify-end"
      >
        <Button className="glow-primary rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
          Save changes
        </Button>
      </motion.div>
    </div>
  )
}
