"use client";

import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Home, Book, User } from "lucide-react";
import Link from 'next/link'
import { quest1, quest2, quest3, ziel1, ziel2, ziel3, typ1, typ2, typ3 } from '@/app/data/quest_titles';
import { lectures_number } from '@/app/data/milestones';


interface Milestone {
  id: string;
  title: string;
  type: 'main' | 'sub';
  position: number;
  subMilestones?: string[];
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'system';
  loading?: boolean;
}

export default function HomeA() {
  const [selectedMilestone] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Wilkommen zur deiner epischen Resie der Arbeits- und Organisationspsychologie. Weißt du noch was letztens passiert ist, oder soll ich dich erinnern?',
      timestamp: new Date(),
      sender: 'system'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const centerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const quests = [
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

  const generateMilestones = (lectureCount: number): Record<string, Milestone> => {
    const milestones: Record<string, Milestone> = {
      start: { id: 'start', title: 'Start', type: 'main', position: 0 },
      end: { id: 'end', title: 'Ende', type: 'main', position: lectureCount + 1 }
    };
  
    for (let i = 1; i <= lectureCount; i++) {
      // Main milestone
      milestones[`m${i}`] = { 
        id: `m${i}`, 
        title: `Lektion ${i}`, 
        type: 'main', 
        position: i,
        subMilestones: [`m${i}s1`]
      };
  
      // Sub milestone
      milestones[`m${i}s1`] = { 
        id: `m${i}s1`, 
        title: `Test ${i}.1`, 
        type: 'sub', 
        position: i 
      };
    }
  
    return milestones;
  };
  
  const milestones = generateMilestones(lectures_number);

  useEffect(() => {
    if (centerRef.current) {
      centerRef.current.scrollTop = centerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToGPT = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          userId // Include userId in the request
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  };

  const [userId] = useState(`user-${Date.now()}`);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
  
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date(),
      sender: 'user'
    };
  
    // Add loading message for system
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '...',
      timestamp: new Date(),
      sender: 'system',
      loading: true
    };
  
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setNewMessage('');
  
    // Get GPT response
    const gptResponse = await sendMessageToGPT(newMessage);
  
    // Replace loading message with actual response
    setMessages(prev => prev.map(msg => 
      msg.loading ? {
        id: msg.id,
        text: gptResponse,
        timestamp: new Date(),
        sender: 'system'
      } : msg
    ));
  };

  const mainMilestones = Object.values(milestones)
    .filter(m => m.type === 'main')
    .sort((a, b) => a.position - b.position);

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Left Sidebar - Quests */}
      <div className="w-1/4 bg-white p-6 shadow-lg overflow-y-auto">

          {/* Navigation Header */}
          <nav className="bg-black text-white p-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">StudyOS</h2>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex space-x-6">
                <Link href="/" className="flex items-center space-x-2 hover:text-purple-400">
                  <Home size={20} />
                  <span>Home</span>
                </Link>
                <Link href="/dashboard" className="flex items-center space-x-2 hover:text-purple-400">
                  <Book size={20} />
                  <span>Study</span>
                </Link>
                <Link href="/userprofile" className="flex items-center space-x-2 hover:text-purple-400">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </div>
            </div>
          </nav>

          {quests.map(quest => (
          <div key={quest.id} className="bg-grey rounded-lg shadow p-4 flex justify-between items-center">
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
                <h3 className="font-bold text-black">{quest.title}</h3>
                <p className="text-sm text-black">{quest.subhead}</p>
                <p className="text-sm text-black">{quest.typeQ}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center - Learning Path */}
      <div ref={centerRef} className="flex-1 p-6 relative overflow-y-auto">
        <div className="min-h-full flex flex-col-reverse items-center">
          {mainMilestones.map((milestone, index) => (
            <div key={milestone.id} className="relative mb-8 w-full flex justify-center items-center">
              {/* Left sub-milestones */}
              {milestone.subMilestones?.slice(0, 1).map((subId) => (
                <button
                  key={subId}
                  className={`absolute left-1/4 w-16 h-16 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow
                    ${selectedMilestone === subId ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <span className="text-xs">{milestones[subId].title}</span>
                </button>
              ))}

              {/* Main milestone */}
              <button
                className={`w-20 h-20 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow
                  ${selectedMilestone === milestone.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <span className="text-sm"><a href='/lecture1'>{milestone.title}</a></span>
              </button>

              {/* Right sub-milestones */}
              {milestone.subMilestones?.slice(1).map((subId) => (
                <button
                  key={subId}
                  className={`absolute right-1/4 w-16 h-16 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow
                    ${selectedMilestone === subId ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <span className="text-xs">{milestones[subId].title}</span>
                </button>
              ))}

              {/* Connection lines */}
              {index < mainMilestones.length - 1 && (
                <div className="absolute w-px h-8 bg-gray-300" style={{ top: '-2rem' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Chat */}
      <div className="w-1/4 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b">
          {/* Added Gamemaster Image and Header */}
          <div className="flex items-center space-x-4 mb-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/gamemaster.png"
                alt="Gamemaster"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Gamemaster</h2>
              <p className="text-sm text-gray-500">Ihr Führer durch das Reich des Wissens</p>
            </div>
          </div>
        </div>
        
        {/* Messages Area */}
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.sender === 'system' && (
            <div className="relative w-8 h-8 mr-2 flex-shrink-0">
              <Image
                src="/gamemaster.png"
                alt="Gamemaster"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="text-sm">
              {message.loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                message.text
              )}
            </p>
            <p className="text-xs mt-1 opacity-70">
              {format(message.timestamp, 'HH:mm')}
            </p>
          </div>
        </div>
      ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Nachricht eingeben..."
              className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}