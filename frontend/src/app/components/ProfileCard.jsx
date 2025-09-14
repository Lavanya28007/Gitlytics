import Link from "next/link";

export default function ProfileCard({
  rank,
  name,
  username,
  location,
  avatar,
  tags,
  stars,
  forks,
  followers,
  contributions,
  repo,
}) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 flex items-center gap-6 hover:border-green-500 transition">
      {/* Rank Badge */}
      <div className="flex-shrink-0 text-center">
        <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">
          #{rank}
        </span>
      </div>

      {/* Avatar + Info */}
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full border-2 border-gray-600"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-gray-400">@{username} • {location}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-gray-300">
          <p>⭐ Stars: <span className="text-white">{stars}</span></p>
          <p>🍴 Forks: <span className="text-white">{forks}</span></p>
          <p>👥 Followers: <span className="text-white">{followers}</span></p>
          <p>📈 Contributions: <span className="text-white">{contributions}</span></p>
        </div>

        {/* Repo Link */}
        <p className="mt-3 text-gray-400 text-sm">
          Top Repository: <span className="text-green-400">{repo}</span>
        </p>
      </div>

      {/* View Profile */}
      <div>
        <Link
          href={`/developer/${username}`}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
