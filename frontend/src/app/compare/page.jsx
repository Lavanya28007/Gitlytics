'use client';
import { useState, useEffect } from "react";
import api from "../utils/api";
import { Star, Users, BookOpen } from "lucide-react";

export default function ComparePage({ userId }) {
  const [dev1, setDev1] = useState("");
  const [dev2, setDev2] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount (for SSR/Next.js safety)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  async function handleCompare(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (!user) {
      alert("Please log in to compare developers.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(
        "/comparison/compare",
        {
          dev1Username: dev1,
          dev2Username: dev2,
          userId: userId || user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to compare. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <div className="text-center mt-10">Please log in to compare developers.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-10 text-green-400 text-center">Compare GitHub Developers ⚔️</h1>

      {/* Form */}
      <form onSubmit={handleCompare} className="space-y-4 ">
        <input
          type="text"
          placeholder="First GitHub username"
          value={dev1}
          onChange={(e) => setDev1(e.target.value)}
          className="w-full p-3 border rounded-xl  focus:border-green-500 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="Second GitHub username"
          value={dev2}
          onChange={(e) => setDev2(e.target.value)}
          className="w-full p-3 border rounded-xl  focus:border-green-500  focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-8 p-6  shadow rounded-2xl">
          <h2 className="text-2xl text-red-400 font-semibold mb-4">Result:</h2>
          <div className="flex items-center justify-around">
            <div className="flex flex-row gap-10 ml-15 items-center">
              {/* Dev1 */}
              <div className="flex flex-col items-center border border-green-800 rounded-xl p-4 shadow-sm">
                <img
                  src={`https://github.com/${result.dev1.username}.png`}
                  alt={result.dev1.username}
                  className="w-24 h-24 rounded-full border-4 border-green-200 shadow-md"
                />
                <p className="mt-3 font-medium text-lg">{result.dev1.username}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-green-400">
                      <BookOpen size={16} /> Repos
                    </span>
                    <span>{result.dev1.publicRepos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-pink-400">
                      <Users size={16} /> Followers
                    </span>
                    <span>{result.dev1.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-blue-600">
                      <Users size={16} /> Following
                    </span>
                    <span>{result.dev1.following}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-amber-200">
                      <Star size={16} /> Stars
                    </span>
                    <span>{result.dev1.stars}</span>
                  </div>
                </div>
              </div>

              <span className="text-teal-500 text-center font-extrabold">VS</span>

              {/* Dev2 */}
              <div className="flex flex-col items-center border border-green-800 rounded-xl p-4 shadow-sm">
                <img
                  src={`https://github.com/${result.dev2.username}.png`}
                  alt={result.dev2.username}
                  className="w-24 h-24 rounded-full border-4 border-green-200 shadow-md"
                />
                <p className="mt-3 font-medium text-lg">{result.dev2.username}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600 w-full">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-green-400">
                      <BookOpen size={16} /> Repos
                    </span>
                    <span>{result.dev2.publicRepos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-pink-400">
                      <Users size={16} /> Followers
                    </span>
                    <span>{result.dev2.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-blue-600">
                      <Users size={16} /> Following
                    </span>
                    <span>{result.dev2.following}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-amber-200">
                      <Star size={16} /> Stars
                    </span>
                    <span>{result.dev2.stars}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Winner */}
          <div className="p-10 text-center font-bold">
            {result.winner === "tie" ? (
              <span className="px-4 py-2 bg-yellow-500 text-center rounded-full">
                It’s a tie!
              </span>
            ) : (
              <span className="px-4 py-2 bg-green-500 text-white rounded-full">
                Winner:{" "}
                {result.winner === "dev1"
                  ? result.dev1.username
                  : result.dev2.username}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}