"use client";

import { Button } from "@ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="mt-4 w-full flex items-center justify-center gap-2 cursor-pointer"
    >
      <LogOut className="w-5 h-5" /> Log Out
    </Button>
  );
}
