import { Heading } from "@ui/Heading";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@ui/Card";
import { Paragraph } from "@ui/Paragraph";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { User, BarChart2 } from "lucide-react";
import { LogoutButton } from "./logout-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  console.log("Current logged user:", user);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Heading level={1} className="mb-8 flex items-center gap-2">
          <User className="w-8 h-8 text-blue-600" /> Dashboard
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <BarChart2 className="w-6 h-6 text-green-600" />
              <Heading level={3}>Stats</Heading>
            </div>
            <Paragraph className="mb-2">
              Welcome to your dashboard! Here are some quick stats:
            </Paragraph>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Active users: 1,234</li>
              <li>Revenue: $12,345</li>
              <li>Growth: 12% this month</li>
            </ul>
          </Card>
          <Card>
            <Heading level={3} className="mb-2">
              Quick Actions
            </Heading>
            <form className="flex flex-col gap-3">
              <Input label="Search" placeholder="Search..." />
              <Button type="submit" variant="filled">
                Search
              </Button>
            </form>
            <LogoutButton />
          </Card>
        </div>
        <Card>
          <Heading level={3} className="mb-2">
            Recent Activity
          </Heading>
          <Paragraph>
            No recent activity yet. Start using the app to see updates here!
          </Paragraph>
        </Card>
      </div>
    </div>
  );
}
