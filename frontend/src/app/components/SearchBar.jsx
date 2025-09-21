'use client';
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [framework, setFramework] = useState("");
  

  const router = useRouter();



  const handleSearch = (e) => {
    e.preventDefault();
    // fetchDevelopers(1); // reset to first page
    router.push(`/browse?location=${location}&language=${language}&q=${query}`);
  };

 

  return (
    <div className="w-full mx-auto justify-center">
      {/* 🔍 Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 w-full bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800"
      >
        {/* Free text search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search developers..."
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Language dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full md:w-40 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="ruby">Ruby</option>
          <option value="c++">C++</option>
        </select>

        {/* Framework dropdown */}
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}  
          className="w-full md:w-40 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">All Frameworks</option>    
          <option value="react">React</option>    
          <option value="vue">Vue.js</option>
          <option value="angular">Angular</option>
          <option value="django">Django</option>
          <option value="flask">Flask</option>
          <option value="spring">Spring</option>
          <option value="express">Express</option>
        </select>

        {/* Location input */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., India, USA)"
          className="w-full md:w-48 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"/>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold transition">
          Search
        </button>
      </form>

      
    </div>
  );
}
