import Image from "next/image";
import { SiNextdotjs, SiSupabase, SiCloudflare, SiTypescript } from
  'react-icons/si';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="/profilepic.jpg"
                alt="Profile Photo"
                fill
                className="object-cover object-top brightness-80 scale-120"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Nathan Mitchell</h1>
              <p className="text-xl text-gray-600 mb-4">Tech Property Investor</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://github.com/mitch478" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourusername" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-600 leading-relaxed">
            I&apos;m Nathan Mitchell, from South Wales, United Kingdom. I love all things technology,finance & property. Currently a freelance Tech support engineer. Here I share all things I build and lessons I learn.
          </p>
        </div>

        {/* Companies Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Card 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MPS LTD</h3>
              <p className="text-gray-600 mb-4">
                A property development company that I started in 2019. We buy and renovate properties to a high standard. Based in South Wales. 
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Est 2019</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Property Investment</span>
              </div>
            </div>

            {/* Company Card 2 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MCS</h3>
              <p className="text-gray-600 mb-4">
                A IT Service Provider that I started in 2023. Providing IT solutions to small and medium sized businesses. Based in South Wales.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Est 2023</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Technology</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Failed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Projects Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Project Card 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Portfolio</h3>
              <p className="text-gray-600 mb-4">
                This website built with Next.js and deployed on Cloudflare Workers. Features a clean, responsive design showcasing my professional background.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Cloudflare</span>
              </div>
            </div>

            {/* Personal Project Card 2 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow h-full">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">Sharesecure.ly</h3>
                <a href="https://sharesecure.ly" className="text-blue-600 hover:text-blue-900 text-sm">Check it out</a>
              </div>
              <p className="text-gray-600 mb-4">
                A secure file sharing platform that I built for my company. It allows my clients to share secure passwords, api keys, and other sensitive information.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Live</span>
              </div>
            </div>

            {/* Personal Project Card 3 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trading Desk</h3>
              <p className="text-gray-600 mb-4">
                Crypto management platform I&apos;ve built for myself to manage my crypto portfolio &amp; family members.
                Connecting to Crypto Exchanges & Web 3 Wallets. Creating the all in one platform to manage your crypto portfolio.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">In Development</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Currently Learning</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2"><SiNextdotjs className="text-black-500"/></div>
              <span className="text-sm font-medium text-gray-700">Next.js</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2"><SiSupabase className="text-green-500"/></div>
              <span className="text-sm font-medium text-gray-700">Supabase</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2"><SiCloudflare className="text-orange-500"/></div>
              <span className="text-sm font-medium text-gray-700">Cloudflare</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2"><SiTypescript className="text-blue-500"/></div>
              <span className="text-sm font-medium text-gray-700">TypeScript</span>
            </div>
          </div>
        </div>

        {/* GitHub Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">GitHub Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub Repo Card 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">mitch478.xyz</h3>
                <a href="https://github.com/mitch478/mitch478.xyz" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 mb-4">
                Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Deployed on Cloudflare Pages.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Next.js</span>
              </div>
            </div>

            {/* GitHub Repo Card 2 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">Other Projects</h3>
                <a href="https://github.com/mitch478" className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 mb-4">
                Check out my GitHub profile for more projects and contributions. Always working on something new!
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">View Profile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="text-center text-gray-600">
          Mitch478.xyz - 2025
        </div>
      </div>
    </main>
  );
}
