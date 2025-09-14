"use client";
import { useState } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 12;

  const fetchDevelopers = async (pageNum = 1) => {
    try {
      const res = await axios.get("http://localhost:5000/api/developers", {
  params: {
    location,
    language,
    q: query,  // optional, in case you want free text search
    per_page: perPage,
    page: pageNum,
  },
});
      setResults(res.data.developers);
      setTotalCount(res.data.total_count || 0);
      setPage(pageNum);
    } catch (err) {
      console.error("Search failed:", err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDevelopers(1); // reset to first page
  };

  const handleNext = () => {
    if (page * perPage < totalCount) fetchDevelopers(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) fetchDevelopers(page - 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto justify-center">
      {/* 🔍 Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row  gap-3 w-full bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800"
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

        {/* Location input */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., India, USA)"
          className="w-full md:w-48 px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition"
        >
          Search
        </button>
      </form>

      {/* 🧑‍💻 Results */}
      {results.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((dev) => (
            <div
              key={dev.username}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-md hover:shadow-xl hover:border-green-500 transition"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <img
                  src={dev.avatar}
                  alt={dev.username}
                  className="w-14 h-14 rounded-full border border-gray-700"
                />
                <div>
                  <a
                    href={dev.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-green-400 hover:underline"
                  >
                    {dev.username}
                  </a>
                  <p className="text-sm text-gray-400">Score: {dev.score}</p>
                </div>
              </div>

              {/* View Profile */}
              <div className="mt-4">
                <a
                  href={dev.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
                >
                  View Profile →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📌 Pagination */}
      {results.length > 0 && (
        <div className="flex justify-between items-center mt-8 sticky bottom-0 bg-black py-4 border-t border-gray-800">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            ← Previous
          </button>
          <span className="text-gray-400">
            Page {page} of {Math.ceil(totalCount / perPage)}
          </span>
          <button
            onClick={handleNext}
            disabled={page * perPage >= totalCount}
            className={`px-4 py-2 rounded-lg ${
              page * perPage >= totalCount
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
