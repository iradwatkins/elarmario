export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="text-center p-8 max-w-2xl">
        <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-white text-sm mb-8">
          🚀 SaaS Platform
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">El Armario</h1>
        <p className="text-xl text-white/90 mb-4">
          We're building something amazing!
        </p>
        <p className="text-lg text-white/90 mb-8">
          Our platform is currently under development.
        </p>
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
          <p className="text-white/80 text-sm">
            Powered by Clerk Authentication & Resend Email
            <br />
            Secure, Fast, Scalable
          </p>
        </div>
      </div>
    </div>
  );
}
