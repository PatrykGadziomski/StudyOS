import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Book, User, Menu } from "lucide-react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
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
            <Link href="#" className="flex items-center space-x-2 hover:text-purple-400">
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
      <main className="flex items-center justify-center min-h-[calc(100vh-73px)]">
        <div className="max-w-md w-full mx-4 border rounded-lg">
          <div className="bg-grey rounded-lg overflow-hidden shadow-lg">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              <Image
                src="/gamemaster.png"
                alt="Wise magician"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
            </div>

            {/* Text Content */}
            <div className="bg-gray-900 text-white p-6">
              <h2 className="text-xl font-semibold mb-3">
                Willkommen bei StudyOS!
              </h2>
              <p className="text-gray-300 mb-6">
                Bist du bereit deine epische Reise zu starten?
              </p>
              <button className="bg-purple-600 hover:bg-gray-300 px-4 py-2 rounded text-black">
                <Link href="/registration">Weiter</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;