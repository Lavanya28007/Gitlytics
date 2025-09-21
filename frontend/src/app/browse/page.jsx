'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiTypescript, SiPython, SiVuedotjs } from "react-icons/si";
import { techQueryMap } from '../utils/techMap';

const techTags = [
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-500" /> },
  { name: "Python", icon: <SiPython className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Vue.js", icon: <SiVuedotjs className="text-emerald-400" /> },
  { name: "Java", icon: <FaJava className="text-orange-500" /> },
];


const Browse = () => {

    const searchParams = useSearchParams();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedTech, setSelectedTech] = useState(""); 
    const perPage = 12;

    const fetchDevelopers = async (location, language, query, perPage = 12, pageNum = 1) => {
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

    const handleNext = () => {
    if (page * perPage < totalCount) {
      fetchDevelopers("", selectedTech, "", perPage, page + 1);
    }
  };

   const handlePrev = () => {
    if (page > 1) {
      fetchDevelopers("", selectedTech, "", perPage, page - 1);
    }
  };
    useEffect(() => {
        const location = searchParams.get('location') || '';
        const language = searchParams.get('language') || '';
        const query = searchParams.get('q') || '';
        console.log("Search Params:", { location, language, query });
        // You can trigger a search or API call here based on the params
        fetchDevelopers(location, language, query);
    }, [])
       
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
     {/* Tech Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {techTags.map((tech, idx) => {
          const isActive = selectedTech === tech.name;
          return (
            <button
              key={idx}
              onClick={() => {
                if (isActive) {
                  // Toggle off
                  setSelectedTech("");
                  fetchDevelopers("", "", "");
                } else {
                  setSelectedTech(tech.name);
                  fetchDevelopers("", techQueryMap[tech.name] || tech.name, "");
                }
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm
                ${
                  isActive
                    ? "bg-green-600 text-white border border-green-400"
                    : "bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-green-500"
                }`}
            >
              {tech.icon}
              <span>{tech.name}</span>
            </button>
          );
        })}
      </div>
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
                                    className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow-md transition"
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
                <div className="flex justify-center items-center gap-6 mt-12">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page === 1
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-900 border border-gray-700 text-gray-200 hover:bg-gray-800"
                            }`}
                    >
                        ← Previous
                    </button>
                    <span className="text-gray-400">
                        Page <span className='text-green-400 font-semibold'>{page}</span>  of {Math.ceil(totalCount / perPage)}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={page * perPage >= totalCount}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${page * perPage >= totalCount
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gray-900 border border-gray-700 text-gray-200 hover:bg-gray-800"
                            }`}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>

    )
}

export default Browse