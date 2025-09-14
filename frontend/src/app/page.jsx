import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import Link from "next/link";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiTypescript, SiPython, SiVuedotjs } from "react-icons/si";


const techTags = [
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-sky-500" /> },
  { name: "Python", icon: <SiPython className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Vue.js", icon: <SiVuedotjs className="text-emerald-400" /> },
  { name: "Java", icon: <FaJava className="text-orange-500" /> },
];



export default function HomePage() {
  // Sample tech stacks (preview only, full list on /tech)
  const techStacks = [
  { name: "React", count: "15,210", growth: "+12%", color: "text-blue-400", icon: <FaReact className="text-blue-400 w-6 h-6" /> },
  { name: "TypeScript", count: "12,380", growth: "+18%", color: "text-sky-500", icon: <SiTypescript className="text-sky-500 w-6 h-6" /> },
  { name: "Python", count: "18,630", growth: "+10%", color: "text-yellow-400", icon: <SiPython className="text-yellow-400 w-6 h-6" /> },
  { name: "Node.js", count: "11,240", growth: "+15%", color: "text-green-500", icon: <FaNodeJs className="text-green-500 w-6 h-6" /> },
  { name: "Vue.js", count: "7,890", growth: "+22%", color: "text-emerald-400", icon: <SiVuedotjs className="text-emerald-400 w-6 h-6" /> },
  { name: "Java", count: "16,750", growth: "+15%", color: "text-orange-500", icon: <FaJava className="text-orange-500 w-6 h-6" /> },
];

  // Sample top developers (preview only)
  const topDevs = [
    {
      rank: 1,
      name: "Sarah Chen",
      username: "sarahdev",
      location: "San Francisco, CA",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      tags: ["React", "TypeScript", "Node.js"],
      stars: 45280,
      forks: 12450,
      followers: 8920,
      contributions: 2847,
      repo: "awesome-react-components",
    },
    {
      rank: 2,
      name: "Alex Rodriguez",
      username: "alexcode",
      location: "Austin, TX",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      tags: ["Python", "Django", "React"],
      stars: 38940,
      forks: 9230,
      followers: 7450,
      contributions: 2134,
      repo: "ml-toolkit",
    },
    {
      rank: 3,
      name: "Emma Wilson",
      username: "emmawilson",
      location: "London, UK",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      tags: ["Vue.js", "TypeScript", "Java"],
      stars: 32150,
      forks: 7890,
      followers: 6780,
      contributions: 1923,
      repo: "vue-enterprise-kit",
    },
  ];

  return (
    <div className="space-y-20 bg-black text-white">
      {/* Hero Section */}

<section className="text-center py-24 bg-gradient-to-b from-gray-900 to-black">
  <h1 className="text-5xl font-extrabold mb-6 text-green-500">Gitlytics</h1>
  <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
    Discover top developers ranked by GitHub contributions, expertise, and impact across different technologies.
  </p>
  <p className="text-sm text-gray-400 mb-8">
    Tracking <span className="text-green-400 font-semibold">250,000+</span> developers across <span className="text-green-400 font-semibold">10+</span> technologies
  </p>
  <div className="flex flex-col md:flex-row justify-center  items-center gap-4 w-full max-w-3xl mx-auto">
    <div className="w-full md:w-auto flex-1">
      <SearchBar />
    </div>
    <Link
      href="/leaderboard"
      className="px-6 py-4  bg-green-600 hover:bg-green-700 text-white rounded-lg transition whitespace-nowrap w-full md:w-auto"
    >
      Explore Rankings
    </Link>
  </div>
  {/* Tech Tags */}
  <div className="flex flex-wrap justify-center gap-3 mt-10">
    {techTags.map((tech, idx) => (
      <span
        key={idx}
        className="flex items-center gap-3
         px-6 py-2 bg-gray-800 rounded-lg text-gray-200 hover:bg-gray-700 cursor-pointer"
      >
        {tech.icon}
        {tech.name}
      </span>
    ))}
  </div>
</section>

      {/* Browse by Technology */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Browse by Technology</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {techStacks.map((stack, idx) => (
    <div
      key={idx}
      className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition"
    >
      <div className="flex items-center gap-3 mb-2">
        {stack.icon}
        <h3 className={`text-xl font-bold ${stack.color}`}>{stack.name}</h3>
      </div>
      <p className="text-gray-400">{stack.count} devs</p>
      <p className="text-green-400 text-sm">{stack.growth} this month</p>
      <Link href={`/tech/${stack.name.toLowerCase()}`} className="mt-4 inline-block text-green-500">
        View Experts →
      </Link>
    </div>
  ))}
</div>
      </section>

      {/* Top Developers (Preview) */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Top Developers</h2>
        <div className="space-y-6">
          {topDevs.map((dev) => (
            <ProfileCard key={dev.rank} {...dev} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/leaderboard"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white"
          >
            View Full Leaderboard
          </Link>
        </div>
      </section>

      {/* Why Gitlytics Section */}
      <section className="max-w-6xl mx-auto px-6 text-center py-16">
        <h2 className="text-3xl font-semibold mb-12">Why Gitlytics?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">🚀 Discover Experts</h3>
            <p className="text-gray-300">Find top developers ranked by real GitHub contributions and activity.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">📊 Data-Driven Insights</h3>
            <p className="text-gray-300">Track developer performance with transparent metrics and growth trends.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-green-400 mb-4">🤝 Connect & Collaborate</h3>
            <p className="text-gray-300">Reach out to top talent for projects, hiring, or open-source contributions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
