"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/adminUi/avatar";
import { Badge } from "@/components/ui/adminUi/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/adminUi/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/adminUi/table";
import { SectionHeader } from "./section-header";
import { useUser } from "@/hooks/auth/useUser";
import { useGetAllUsers } from "@/hooks/panel/users/useGetAllUsers";
import { User } from "@/lib/mock-data";
import { UserDTO } from "@/types";

const roleStyles: Record<string, string> = {
  Admin: "border-primary/40 bg-primary/15 text-primary-foreground",
  Moderator: "border-accent/30 bg-accent/10 text-accent",
  Member: "border-border bg-secondary/60 text-muted-foreground",
};

export function UsersSection() {
  const { data } = useGetAllUsers();

  const users: UserDTO[] = data?.data ?? [];
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Community"
        title="Users"
        description="The people replaying their childhoods. Manage roles, permissions, and account status."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass overflow-hidden rounded-2xl"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="pl-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-border transition-colors hover:bg-secondary/40"
                >
                  <TableCell className="py-3 pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        {user.fotoPerfil ? (
                          <img
                            src={
                              user.fotoPerfil
                                ? String(user.fotoPerfil)
                                : undefined
                            }
                          />
                        ) : (
                          <AvatarFallback className="bg-primary/20 text-xs font-bold text-foreground">
                            {user?.nombre?.substring(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium">{user.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-2.5 ${roleStyles[user.role]}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-sm capitalize">
                      <span
                        // className={  'size-2 rounded-full bg-accent' : 'size-2 rounded-full bg-destructive'}
                        aria-hidden="true"
                      />
                      {"active"}
                    </span>
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                            aria-label={`Actions for ${user.nombre}`}
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="glass rounded-xl border-glass-border"
                      >
                        <DropdownMenuItem className="rounded-lg">
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg">
                          Change role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg text-destructive">
                          {/* {user.status === 'active' ? 'Suspend' : 'Reactivate'} */}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
