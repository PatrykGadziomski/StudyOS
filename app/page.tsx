import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const MainLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Main Content */}
      <main className="flex h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gray-900 p-8 flex flex-col justify-center items-center">
          <div className="max-w-md w-full space-y-8">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">StudyOS</h1>
              <p className="text-gray-300 text-lg mb-8">
              Willkommen auf Ihrer persönlichen Lernreise! Treten Sie unserer Community bei und beginnen Sie Ihr Bildungsabenteuer noch heute.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-4">
              <Link 
                href="/dashboard"
                className="bg-purple-600 text-white px-8 py-3 rounded-md text-center font-medium hover:bg-purple-700 transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/welcoming"
                className="bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-md text-center font-medium hover:bg-purple-600 hover:text-white transition-colors"
              >
                Registrieren
              </Link>
            </div>

            {/* Footer Links */}
            <div className="pt-8 text-center">
              <div className="flex justify-center space-x-4 text-sm text-gray-400">
                <Link href="#" className="hover:text-white">Privacy</Link>
                <Link href="#" className="hover:text-white">Terms</Link>
                <Link href="#" className="hover:text-white">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 bg-gray-800 relative">
          <Image
            src="/welcome.png"
            alt="Study illustration"
            layout="fill"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
    </div>
  );
};

export default MainLanding;
