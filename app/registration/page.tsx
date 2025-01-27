"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Book, User, Menu } from "lucide-react";

interface FormData {
  name: string;
  surname: string;
  age: string;
  major: string;
  email: string;
  hobbies: string;
}

interface FormErrors {
  [key: string]: string;
}

const RegistrationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    age: '',
    major: '',
    email: '',
    hobbies: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Check each field
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData].trim()) {
        newErrors[key] = 'Das Feld ist verpflichtend';
      }
    });

    // Additional email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Bitte gebe eine gültige E-Mail Adresse an';
    }

    // Additional age validation
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) <= 0)) {
      newErrors.age = 'Bitte gebe ein gültiges Alter an';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission
      console.log('Form submitted:', formData);
      // You can add your API call or navigation logic here
    }
  };

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
      <main className="flex justify-center p-6">
        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">Vorname</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.name ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Max"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Surname Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">Nachname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.surname ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Mustermann"
                />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
              </div>

              {/* Age Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">Alter</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.age ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="25"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Major Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">Studienfach</label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.major ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Psychologie"
                />
                {errors.major && <p className="text-red-500 text-sm mt-1">{errors.major}</p>}
              </div>

              {/* Email Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">E-Mail Adresse</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="max.mustermann@web.de"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Hobbies Input */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <label className="block text-gray-700 mb-2">Hobbies</label>
                <input
                  type="text"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  className={`w-full p-2 rounded border ${errors.hobbies ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Sport, Serien, Lernen"
                />
                {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
              <Link href="/fileupload">Weiter</Link>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
