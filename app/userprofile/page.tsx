"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Book, User, Menu } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';



// Mock data - replace with actual data in production
const userData = {
  name: "Ben Johnson",
  major: "Psychologie",
  level: 15,
  xp: 12,
  xpToNextLevel: 100,
  rank: "Silber",
  stats: {
    STR: 14,
    DEX: 16,
    CON: 12,
    INT: 18,
    WIS: 15,
    CHR: 13
  },
  badges: [
    { name: "Erste Quest", icon: "🎯" },
    { name: "Psy Meister", icon: "💻" },
    { name: "Team Player", icon: "🤝" },
    { name: "Problemlöser", icon: "🧩" },
  ],
  activityLog: [
    { time: "14:32", event: "Wöchentliche Quest abgeschlossen: +100 XP" },
    { time: "13:15", event: "Level Up! Aktuell Level 15!" },
    { time: "12:32", event: "+5 INT durch Problemlösung Challange" },
    { time: "11:45", event: "Neues Abzeichen: Problemlöser" },
    { time: "10:20", event: "Tägliche Quest abgeschlossen: +50 XP" },
  ]
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-black text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">StudyOS</div>
          <div className="flex space-x-6">
            <Link href="/" className="flex items-center space-x-2 hover:text-purple-400">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-purple-400">
              <Book size={20} />
              <span>Study</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 text-purple-400">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Main Profile Column - 80% */}
          <div className="w-4/5">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Image
                        src="/avatar2.png"
                        alt="Profile"
                        width="999"
                        height="999"
                        className="w-32 h-32 rounded-full border-4 border-purple-500"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white rounded-full px-3 py-1 text-sm">
                        Lvl {userData.level}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{userData.name}</h2>
                      <p className="text-gray-600">{userData.major}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>XP Fortschritt</span>
                          <span>{userData.xp}/{userData.xpToNextLevel}</span>
                        </div>
                        <Progress value={(userData.xp/userData.xpToNextLevel) * 100} className="h-2"/>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-xs uppercase tracking-wide opacity-90 mb-1">Aktueller Rang</div>
                    <div className="font-semibold">{userData.rank}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(userData.stats).map(([stat, value]) => (
                <Card key={stat}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600">{value}</div>
                      <div className="text-gray-600">{stat}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Abzeichen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.badges.map((badge) => (
                    <Badge key={badge.name} variant="secondary" className="px-3 py-2">
                      <span className="mr-2">{badge.icon}</span>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Log Column - 20% */}
          <Card className="w-1/5">
            <CardHeader>
              <CardTitle>Aktivitäten Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {userData.activityLog.map((activity, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-sm text-gray-500">{activity.time}</div>
                    <div className="text-sm">{activity.event}</div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}