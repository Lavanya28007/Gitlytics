'use client';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import SearchBar from "./components/SearchBar";
import Link from "next/link";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiTypescript, SiPython, SiVuedotjs } from "react-icons/si";
import { techQueryMap } from './utils/techMap';
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);


export default function HomePage() {
  const heroRef = useRef(null);
  const techRef = useRef(null);
  const compareRef = useRef(null);
  const whyRef = useRef(null);
  const techStackRefs = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const trackingRef = useRef(null);
  const searchRef = useRef(null);

  const SearchBar = dynamic(() => import("./components/SearchBar"), {
    ssr: false, // Render only on client
  });


  // Sample tech stacks (preview only, full list on /tech)
  const techStacks = [
    { name: "React", count: "15,210", growth: "+12%", color: "text-blue-400", icon: <FaReact className="text-blue-400 w-6 h-6" /> },
    { name: "TypeScript", count: "12,380", growth: "+18%", color: "text-sky-500", icon: <SiTypescript className="text-sky-500 w-6 h-6" /> },
    { name: "Python", count: "18,630", growth: "+10%", color: "text-yellow-400", icon: <SiPython className="text-yellow-400 w-6 h-6" /> },
    { name: "Node.js", count: "11,240", growth: "+15%", color: "text-green-500", icon: <FaNodeJs className="text-green-500 w-6 h-6" /> },
    { name: "Vue.js", count: "7,890", growth: "+22%", color: "text-emerald-400", icon: <SiVuedotjs className="text-emerald-400 w-6 h-6" /> },
    { name: "Java", count: "16,750", growth: "+15%", color: "text-orange-500", icon: <FaJava className="text-orange-500 w-6 h-6" /> },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure code runs only on client side
    // Hero Section fade-in
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: "power2.out",
    });

const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

tl.from(titleRef.current, { opacity: 0, y: -60 })
  .from(subtitleRef.current, { opacity: 0, y: 40 }, "-=0.3")
  .from(trackingRef.current, { opacity: 0, y: 20 }, "-=0.4")
  .from(searchRef.current, { opacity: 0, scale: 0.9 }, "-=0.3");    
    // Tech stacks animations
    techStackRefs.current.forEach((card) => {
      // Scroll-triggered fade-in
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Compare Developers fade-in
    gsap.from(compareRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: compareRef.current,
        start: "top 80%",
      },
    });

    // Why Gitlytics staggered cards animation
    gsap.from(whyRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: whyRef.current,
        start: "top 80%",
      },
    });
  }, []);



  return (
    <div className="space-y-20 bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="text-center py-24 bg-gradient-to-b from-gray-900 to-black opacity-100 visible overflow-hidden">
        <h1 ref={titleRef} className="text-6xl font-extrabold mb-6 text-green-500 tracking-tight">
          Gitlytics
        </h1>
        <p ref={subtitleRef} className="text-lg text-gray-300 max-w-4xl mx-auto mb-4">
          Discover top developers ranked by GitHub contributions, expertise, and impact across different technologies.
        </p>
        <p ref={trackingRef} className="text-sm text-gray-400 mb-8">
          Tracking <span className="text-green-400 font-semibold">250,000+</span> developers across{" "}
          <span className="text-green-400 font-semibold">10+</span> technologies
        </p>

        <div ref={searchRef} className="flex flex-col md:flex-row justify-center items-center gap-4 w-full max-w-3xl mx-auto">
          <div className="w-full md:w-auto flex-1">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Browse by Technology */}
      <section ref={techRef} className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center">Browse by Technology</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {techStacks.map((stack, idx) => (
            <div
              key={idx}
              ref={(el) => (techStackRefs.current[idx] = el)}
              onMouseEnter={() => gsap.to(techStackRefs.current[idx], { y: -10, scale: 1.05, duration: 0.3, ease: "power2.out" })}
              onMouseLeave={() => gsap.to(techStackRefs.current[idx], { y: 0, scale: 1, duration: 0.3, ease: "power2.out" })}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                {stack.icon}
                <h3 className={`text-xl font-bold ${stack.color}`}>{stack.name}</h3>
              </div>
              <p className="text-gray-400">{stack.count} devs</p>
              <p className="text-green-400 text-sm">{stack.growth} this month</p>
              <Link href={`/browse?language=${encodeURIComponent(techQueryMap[stack.name] || stack.name)}`} className="mt-4 inline-block text-green-500 hover:underline">
                View Experts →
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Compare Developers Section */}
      <section ref={compareRef} className="max-w-6xl mx-auto px-6 text-center py-16">
        <h2 className="text-3xl font-semibold mb-10">Compare Developers</h2>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-green-500 transition">
          <h3 className="text-2xl font-bold text-red-400 mb-4">⚔️ Head-to-Head</h3>
          <p className="text-gray-300 mb-6">
            Pick two GitHub developers and see how they stack up against each other in terms of followers, repos, and impact.
          </p>
          <Link
            href="/compare"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Go to Compare Page →
          </Link>
        </div>
      </section>

      {/* Why Gitlytics Section */}
      <section ref={whyRef} className="max-w-6xl mx-auto px-6 text-center py-16">
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

