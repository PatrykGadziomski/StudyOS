"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Book, User, Menu } from "lucide-react";

interface ProcessStep {
  label: string;
  completed: boolean;
}

export default function HomeA() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: ProcessStep[] = [
    { label: 'Skript wird gelesen...', completed: false },
    { label: 'Skript wird analysiert...', completed: false },
    { label: 'Lernpfad wird erstellt...', completed: false },
    { label: 'Quests werden erstellt...', completed: false },
    { label: 'Fertig!', completed: false },
  ];

  const isComplete = currentStepIndex >= steps.length;

  useEffect(() => {
    if (isProcessing && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 5;
          if (newProgress == 100) {
            setCurrentStepIndex((prev) => prev + 1);
            return 0;
          }
          return newProgress;
        });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isProcessing, progress, currentStepIndex, steps.length]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setIsProcessing(true);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setIsProcessing(true);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">        
        {!isProcessing ? (
          <div
            className="bg-black rounded-lg p-12 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-white mb-2">
              Lade dein Skript hoch, welches du während deiner Reise bearbeiten würdest.
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-white underline"
            >
              Datei auswählen
            </label>
          </div>
        ) : (
          <div className="bg-black rounded-lg p-12 text-center relative">
            <div className="relative inline-block">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle
                  className="text-gray-700"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-purple-500"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (progress * 264) / 100}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="mt-4 space-y-2">
              {steps.map((step, index) => (
                <div
                  key={step.label}
                  className={`text-white flex items-center justify-center space-x-2 ${
                    index === currentStepIndex ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <span>{step.label}</span>
                  {index < currentStepIndex && (
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* New button that appears and changes color when complete */}
            {isComplete && (
              <button 
                className={`mt-8 px-6 py-2 rounded-lg transition-colors duration-300 ${
                  isComplete ? 'bg-purple-600 text-white' : 'bg-gray-400 text-gray-100'
                }`}
              >
                <Link href="/dashboard">Weiter</Link>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}