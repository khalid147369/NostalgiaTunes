"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/adminUi/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/adminUi/avatar";
import { useUser } from "@/hooks/auth/useUser";
import Link from "next/link";
import { LoadingScreen } from "../loadingScreen/LoadingScreen";

export default function AvatarMenu() {
  const { user, logout, loading } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full border border-glass-border py-1 pl-1 pr-1 transition-colors hover:bg-secondary/60 sm:pr-3">
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
            {user?.nombre.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <span className="hidden text-sm font-medium sm:block">
          {user?.nombre.split(" ")[0]}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="glass w-48 rounded-2xl border-glass-border p-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user?.nombre}</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer  focus:bg-slate-800/60">
              Profile
            </DropdownMenuItem>
          </Link>
          {user?.role == "ADMIN" && (
            <Link href={"/panel"}>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer  focus:bg-slate-800/60">
                Panel
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer  focus:bg-slate-800/60">
            Preferences
          </DropdownMenuItem>

          <DropdownMenuItem
            className=" focus:bg-rose-950/40 cursor-pointer"
            variant="destructive"
            onClick={() => logout()}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
