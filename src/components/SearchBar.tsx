import React, { useState } from 'react';
import { SearchOption } from '../types/types';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, searchType: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<SearchOption>(searchOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery, selectedOption.apiParam);
  };

  const handleOptionSelect = (option: SearchOption) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onSearch(query, option.apiParam);
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
      <div className="mb-4">
        <label htmlFor="search-query" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          What word are you looking for?
        </label>
        <div className="relative mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="search-query"
            className="block w-full rounded-md border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 sm:text-sm"
            placeholder="Enter a word or phrase..."
            value={query}
            onChange={handleQueryChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            ) : (
              <Search className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <label htmlFor="search-type" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          What type of suggestions?
        </label>
        <button
          type="button"
          className="relative flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-left text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-400"
          id="search-type"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption.label}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg dark:bg-gray-800">
            <ul className="max-h-60 overflow-auto rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchOptions.map((option) => (
                <li
                  key={option.id}
                  className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{option.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Available search options
export const searchOptions: SearchOption[] = [
  {
    id: 'synonyms',
    label: 'Synonyms',
    apiParam: 'ml',
    description: 'Words with a similar meaning'
  },
  {
    id: 'rhymes',
    label: 'Rhymes',
    apiParam: 'rel_rhy',
    description: 'Words that rhyme with your input'
  },
  {
    id: 'sounds-like',
    label: 'Sounds Like',
    apiParam: 'sl',
    description: 'Words that sound similar'
  },
  {
    id: 'means-like',
    label: 'Related Meanings',
    apiParam: 'rel_spc',
    description: 'Words with related meanings'
  },
  {
    id: 'adjectives',
    label: 'Descriptive Words',
    apiParam: 'rel_jjb',
    description: 'Adjectives often used with this noun'
  },
  {
    id: 'nouns',
    label: 'Associated Nouns',
    apiParam: 'rel_jja',
    description: 'Nouns often described by this adjective'
  }
];