"use client";
import { useState } from "react";

import { Button } from "@ui/Button";
import { Heading } from "@ui/Heading";
import { Card } from "@ui/Card";
import { Input } from "@ui/Input";
import { Paragraph } from "@ui/Paragraph";
import { Mail, Lock, UserPlus } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else if (res?.ok) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <UserPlus className="w-10 h-10 text-blue-600 mb-2" />
          <Heading level={2} className="mb-2 text-center">
            Sign Up
          </Heading>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
            <Mail className="absolute left-3 top-8 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
            <Lock className="absolute left-3 top-8 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          {error && (
            <Paragraph className="text-red-600 text-sm">{error}</Paragraph>
          )}
          <Button type="submit" loading={loading}>
            <UserPlus className="inline w-5 h-5 mr-2 -mt-1" /> Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
}
