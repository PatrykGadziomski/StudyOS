"use client";

import { NextPage } from 'next';
import { format } from 'date-fns';
import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link'
import { Home, Book, User, Menu } from "lucide-react";
import { quest1, quest2, quest3, ziel1, ziel2, ziel3, typ1, typ2, typ3 } from '@/app/data/quest_titles';



// Types
interface QuestItem {
  id: string;
  letter: string;
  title: string;
  subhead: string;
  typeQ: string;
  icon: string;
  shapes: string[];
}

interface CommunityPost {
  id: string;
  name: string;
  text: string;
  duration: string;
  avatar: string;
}

interface RankingUser {
  id: string;
  name: string;
  score: number;
  rank: number;
}

const Dashboard: NextPage = () => {
  const [currentMonth] = useState(new Date());
  
  // Sample data
  const quests: QuestItem[] = [
    { 
      id: '1', 
      letter: 'A', 
      title: quest1, 
      subhead: ziel1,
      typeQ: typ1,
      icon: '/quest.png',
      shapes: ['/shapes/triangle.png', '/shapes/square.png', '/shapes/circle.png']
    },
    { 
      id: '2', 
      letter: 'A', 
      title: quest2, 
      subhead: ziel2,
      typeQ: typ2,
      icon: '/quest.png',
      shapes: ['/shapes/triangle.png', '/shapes/square.png', '/shapes/circle.png']
    },
    { 
      id: '3', 
      letter: 'A', 
      title: quest3, 
      subhead: ziel3,
      typeQ: typ3,
      icon: '/quest.png',
      shapes: ['/shapes/triangle.png', '/shapes/square.png', '/shapes/circle.png']
    },
  ];

  const communityPosts: CommunityPost[] = [
    { 
      id: '1', 
      name: 'Emma Thompson', 
      text: 'Wieder erster Platz! Hura!', 
      duration: '1 min', 
      avatar: '/avatar1.png'
    },
    { 
      id: '2', 
      name: 'James Wilson', 
      text: 'Dich kriege ich Emma...', 
      duration: '5 min', 
      avatar: '/avatar2.png'
    },
    { 
      id: '3', 
      name: 'Lisa Anderson', 
      text: 'Manchmal ist bestehen genug', 
      duration: '10 min', 
      avatar: '/avatar3.png'
    },
  ];

  const rankings: RankingUser[] = [
    { id: '1', name: 'Emma Thompson', score: 100, rank: 1 },
    { id: '2', name: 'James Wilson', score: 85, rank: 2 },
    { id: '3', name: 'Sarah Parker', score: 75, rank: 3 },
    { id: '4', name: 'Michael Chen', score: 70, rank: 4 },
    { id: '5', name: 'Lisa Anderson', score: 65, rank: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Navigation Header */}
      <nav className="bg-black text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">StudyOS</div>
          <div className="flex space-x-6">
            <Link href="/" className="flex items-center space-x-2 hover:text-purple-400">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link href="/dashboard" className="flex items-center space-x-2 text-purple-400">
              <Book size={20} />
              <span>Study</span>
            </Link>
            <Link href="/userprofile" className="flex items-center space-x-2 hover:text-purple-400">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
          <button className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <button className="p-1 hover:bg-gray-100 rounded">&lt;</button>
              <span className="font-medium text-black">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button className="p-1 hover:bg-gray-100 rounded">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {['SAN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="text-black">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 35 }).map((_, i) => (
                <button
                  key={i}
                  className={`p-2 rounded-lg hover:bg-gray-100 text-black
                    ${i === 16 ? 'bg-green-100' : ''}
                    ${i === 18 ? 'bg-red-100' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Quest List */}
          <div className="space-y-3">
            {quests.map(quest => (
              <div key={quest.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src={quest.icon}
                      alt={`Quest ${quest.letter}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-black"><b>{quest.title}</b></h3>
                    <p className="text-sm text-black">{quest.subhead}</p>
                    <p className="text-sm text-black">{quest.typeQ}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-6 space-y-6">
          {/* Greeting Card */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
            <h2 className="text-4xl font-bold text-black">Hallo, Ben!</h2>
            <div className="relative w-32 h-32">
              <Image
                src="/gamemaster.png"
                alt="Wise magician"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Course Cards - Updated Add New Course button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4 text-black">Arbeits- und Organisationspsychologie</h3>
              <p className="text-black mb-4">Ellen braucht deine Hilfe um seine Prüfung zu bestehen...</p>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-black">
                <Link href="/lectures">Weiter</Link>
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
              <button className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded text-black flex items-center space-x-2">
                <FiPlus className="w-5 h-5" />
                <span>Neuen Kurs hinzufügen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Rangliste */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-4 text-black">Rangliste</h3>
            <div className="space-y-3">
              {rankings.map(user => (
                <div key={user.id} className="relative">
                  <div className="flex items-center mb-1">
                    <span className="text-black font-medium w-6">{user.rank}.</span>
                    <span className="text-black">{user.name}</span>
                    <span className="text-black ml-auto">{user.score}%</span>
                  </div>
                  <div 
                    className="bg-blue-500 h-6 rounded transition-all duration-300"
                    style={{
                      width: `${user.score}%`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-4 text-black">Community</h3>
            <div className="space-y-4">
              {communityPosts.map(post => (
                <div key={post.id} className="flex items-start space-x-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src={post.avatar}
                      alt={`${post.name}'s avatar`}
                      layout="fill"
                      className="rounded-full"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-black">{post.name}</h4>
                      <span className="text-sm text-black">{post.duration}</span>
                    </div>
                    <p className="text-sm text-black">{post.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;