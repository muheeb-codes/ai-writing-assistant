import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AI Writing Assistant. Powered by Datamuse API.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Terms of Service
            </a>
            <a 
              href="https://www.datamuse.com/api/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              API Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};