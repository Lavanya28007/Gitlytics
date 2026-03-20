'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api"; 

export default function HistoryPage({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchHistory() {
      try {
        // Check if token exists before making request
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your comparison history');
          setLoading(false);
          return;
        }
        
        const res = await api.get("/comparison/history");
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
        if (err.response?.status === 401) {
          setError('Your session has expired. Please log in again.');
          router.push('/login');
        } else {
          setError('Failed to load comparison history');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [userId, router]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl mt-5 text-green-400 text-center font-extrabold mb-6">Your Comparison History</h1>
        <p className="text-center text-red-500">{error}</p>
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl mt-5 text-green-400 text-center font-extrabold mb-6">Your Comparison History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500">No comparisons yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li
              key={item._id}
              className="p-4 bg-blue-950 shadow rounded-2xl flex justify-between items-center"
            >
              <div className="flex items-center gap-7">
                {/* Developer 1 */}
                <a
                  href={item.dev1.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={`https://github.com/${item.dev1.username}.png`}
                    alt={item.dev1.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-sm font-medium mt-1">
                    {item.dev1.username}
                  </span>
                </a>

                <span className="text-gray-400">vs</span>

                {/* Developer 2 */}
                <a
                  href={item.dev2.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={`https://github.com/${item.dev2.username}.png`}
                    alt={item.dev2.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-sm font-medium mt-1">
                    {item.dev2.username}
                  </span>
                </a>
              </div>

              {/* Winner Badge */}
              <div>
                {item.winner === "tie" ? (
                  <span className="px-3 py-2 bg-yellow-500 rounded-full font-bold text-m">
                     It's a tie 🫱🏻‍🫲🏼
                  </span>
                ) : (
                  <span className="px-3 py-2 bg-green-500 text-white font-bold rounded-full text-m">
                    Winner:{" "}
                    {item.winner === "dev1"
                      ? item.dev1.username
                      : item.dev2.username}👑
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
