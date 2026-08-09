export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-6 bg-background">
      <header className="pt-6 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Search</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Search functionality is coming soon.
        </p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold">No results found</h2>
        <p className="text-muted-foreground text-center mt-2 max-w-[250px]">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    </div>
  );
}
