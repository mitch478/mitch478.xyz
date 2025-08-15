import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden">
              <Image
                src="/profile-photo.jpg"
                alt="Profile Photo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Nathan Mitchell</h1>
              <p className="text-xl text-gray-600 mb-4">IT Systems Engineer</p>
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
            I&apos;m Nathan Mitchell, from South Wales, United Kingdom. I&apos;ve worked in technology since I was 16 years old. I&apos;m currently running a company called MCS providing IT services to small medium businesses. 
          </p>
        </div>

        {/* Companies Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Card 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mitchell Property Solutions LTD</h3>
              <p className="text-gray-600 mb-4">
                A property management company that I started in 2019. We buy run down properties and renovate them to a high standard. Based in South Wales. 
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
                A IT Service Provider that I started in 2023. We provide IT services to small and medium sized businesses. Based in South Wales.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Est 2023</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Technology</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Projects Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Side Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Side Project Card 1 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Portfolio</h3>
              <p className="text-gray-600 mb-4">
                This website built with Next.js and deployed on Cloudflare Pages. Features a clean, responsive design showcasing my professional background.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Cloudflare</span>
              </div>
            </div>

            {/* Side Project Card 2 */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-4">
                More exciting projects are in development. Stay tuned for updates on my latest technical endeavors and experiments.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">In Development</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-8">
          <Link 
            href="/contact" 
            className="text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
