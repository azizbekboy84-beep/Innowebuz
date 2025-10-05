export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">
          Innoweb.uz
        </h1>
        <p className="text-2xl text-gray-700">
          Bosqich 1 - Loyiha Setup ✓
        </p>
        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          <div className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg">
            Next.js 15 ✓
          </div>
          <div className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg">
            Tailwind CSS ✓
          </div>
          <div className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg">
            TypeScript ✓
          </div>
        </div>
      </div>
    </div>
  );
}
