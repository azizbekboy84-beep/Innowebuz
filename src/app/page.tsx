export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Innoweb.uz
        </h1>
        <p className="text-2xl text-gray-600">
          Bosqich 1 - Loyiha Setup ✓
        </p>
        <div className="flex gap-4 mt-8 justify-center">
          <div className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg">
            Next.js 14 ✓
          </div>
          <div className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg">
            Tailwind CSS ✓
          </div>
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg">
            TypeScript ✓
          </div>
        </div>
      </div>
    </main>
  );
}
