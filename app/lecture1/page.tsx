"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { format } from 'date-fns';
import {lektion_1} from '@/app/data/lectures';


interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'system';
  loading?: boolean;
}

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset states when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete(); // No error now
    }
  }, [currentIndex, text, onComplete]);

  return <p className="text-lg">{displayedText}</p>;
};


const LearningPlatform = () => {
  const [textSection, setTextSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRandomQuest, setShowRandomQuest] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState('');
  const [userId] = useState(`user-${Date.now()}`);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo Abenteurer, kannst du mir helfen?',
      timestamp: new Date(),
      sender: 'system'
    }
  ]);

  const textSections = lektion_1

  const quizQuestions = [
    {
      question: "Was gehört nicht zu den Prinzipien der Arbeits- und Organisationspsychologie?",
      options: [
        "Motivation",
        "Arbeitsgestaltung",
        "Kooperation",
        "Gruppen- und Teamarbeit",
        "Kommunikation"
      ]
    }
  ];

  const handleNextSection = () => {
    setCompletedSections([...completedSections, textSection]);
    setIsTypingComplete(false);
    if (textSection < textSections.length - 1) {
      setTextSection(textSection + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = () => {
    setShowRandomQuest(true);
  };

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

  const sendMessageToGPT = async (message: string) => {
    try {
      const response = await fetch('/api/chatnpc', {
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

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" className="p-2">
            <a href='/lectures'><ChevronLeft className="h-6 w-6" /></a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Completed Sections */}
            {completedSections.map((sectionIndex) => (
              <Card key={sectionIndex} className="bg-gray-100">
                <CardContent className="p-4">
                  <p className="text-gray-500 font-medium">Abschnitt {sectionIndex + 1} - Bearbeitet</p>
                </CardContent>
              </Card>
            ))}

            {/* Current Text Section */}
            {!showQuiz && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <TypewriterText 
                    key={textSection} // Add key prop to force re-render
                    text={textSections[textSection]} 
                    onComplete={() => setIsTypingComplete(true)}
                  />
                  {isTypingComplete && (
                    <Button 
                      className="mt-4"
                      onClick={handleNextSection}
                    >
                      Weiter
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Completed Quiz Placeholder */}
            {showRandomQuest && (
              <Card className="bg-gray-100 mb-4">
                <CardContent className="p-4">
                  <p className="text-gray-500 font-medium">Quiz - Bearbeitet</p>
                </CardContent>
              </Card>
            )}

            {/* Quiz Section */}
            {showQuiz && !showRandomQuest && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Quiz</h2>
                  {quizQuestions.map((q, i) => (
                    <div key={i} className="space-y-4">
                      <p className="font-medium">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, j) => (
                          <div key={j} className="flex items-center">
                            <input
                              type="radio"
                              name={`question-${i}`}
                              id={`option-${j}`}
                              className="mr-2"
                            />
                            <label htmlFor={`option-${j}`}>{option}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button 
                    className="mt-6"
                    onClick={handleQuizComplete}
                  >
                    Quiz beenden
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Random Quest Section */}
            {showRandomQuest && (
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold mb-4">Offene Quest</h2>
                  <p className="mb-4">Helfe Elian dabei sein Team auf die Expedition vorzubereiten. Erkläre ihm wieso Qualifizierung, Eignungsdiagnostik und die Bedeutung von Kommunikation wichtig sind.</p>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image 
                      src="/randomlecture.webp"
                      alt="Quest scene"
                      width="1000"
                      height="1000"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Chat Windows */}
          <div className="space-y4">
            <div className="bg-white shadow-lg flex rounded-lg">
              <div className="p-4 border-b">
                {/* Messages Area - NPC*/}
                <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                {message.sender === 'system' && (
                <div className="relative w-8 h-8 mr-2 flex-shrink-0">
                  <Image
                    src="/elian.webp"
                    alt="Elian"
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
          </div>
          </div>
          </div>
        </div>
  );
};

export default LearningPlatform;