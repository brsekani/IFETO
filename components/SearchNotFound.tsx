// components/SearchNotFound.tsx
import Image from "next/image";
// import notFound from "@/assets/icons/search-not-found.svg"; // use any illustration

type SearchNotFoundProps = {
  search?: string;
  onClear?: () => void;
};

export default function SearchNotFound({
  search,
  onClear,
}: SearchNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* <Image
        src={notFound}
        alt="No results"
        width={220}
        height={220}
        className="mb-6"
      /> */}

      <h2 className="text-[24px] font-semibold text-[#2A2A2A]">
        No results found
      </h2>

      {search && (
        <p className="mt-2 text-[#6F6F6F] max-w-md">
          We couldn’t find any items matching{" "}
          <span className="font-semibold text-[#2A2A2A]">“{search}”</span>
        </p>
      )}

      <p className="mt-2 text-[#6F6F6F]">
        Try adjusting your search or filters.
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="mt-6 px-6 py-3 rounded-lg bg-[#27AE60] text-white font-semibold hover:bg-[#219653] transition"
        >
          Clear search & filters
        </button>
      )}
    </div>
  );
}
