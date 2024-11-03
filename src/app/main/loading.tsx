export default function Loading() {
   // Create an array of 10 items to represent loading albums
  const skeletonAlbums = Array(10).fill(null);

  return (
    <div className="min-h-screen bg-principal text-sub">
    <div className="container mx-auto">
      <div className="flex-col items-center justify-between grid mobil:grid-cols-[repeat(1,minmax(0,1fr))] grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 p-12 sm:p-24">
        {skeletonAlbums.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-rowList rounded-lg shadow-lg p-4">
              <div className="w-full aspect-square bg-rowListH rounded-md mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-rowListH rounded w-3/4"></div>
                <div className="h-3 bg-rowListH rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
  }