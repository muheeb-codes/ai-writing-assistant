import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar, searchOptions } from './components/SearchBar';
import { ResultsSection } from './components/ResultsSection';
import { AITipBox } from './components/AITipBox';
import { Footer } from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { fetchWordSuggestions, generateAITip } from './services/datamuseService';
import { WordSuggestion } from './types/types';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState(searchOptions[0].apiParam);
  const [results, setResults] = useState<WordSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiTip, setAiTip] = useState('Start typing to see word suggestions and writing tips.');
  
  // Debounce the search query to prevent excessive API calls
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      
      try {
        const newResults = await fetchWordSuggestions(debouncedQuery, searchType);
        setResults(newResults);
        
        // Generate a new AI tip based on the search results
        const newTip = generateAITip(debouncedQuery, newResults);
        setAiTip(newTip);
      } catch (error) {
        console.error('Error performing search:', error);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery, searchType]);

  const handleSearch = (newQuery: string, newSearchType: string) => {
    setQuery(newQuery);
    setSearchType(newSearchType);
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
        <Header />
        
        <main className="container mx-auto flex-grow px-4 py-8">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              AI Writing Assistant
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Welcome to your AI Writing Assistant powered by Datamuse – helping you find the perfect word, every time.
            </p>
          </section>
          
          {/* Main Content */}
          <section className="mx-auto max-w-4xl">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            <AITipBox tip={aiTip} />
            
            <ResultsSection 
              results={results} 
              searchType={searchType} 
              isLoading={isLoading}
              query={query}
            />
          </section>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;