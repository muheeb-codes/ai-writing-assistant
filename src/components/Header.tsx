import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-80">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            AI Writing Assistant
          </h1>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a 
            href="#" 
            className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:block"
          >
            How It Works
          </a>
          <a 
            href="#" 
            className="hidden text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:block"
          >
            Examples
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};