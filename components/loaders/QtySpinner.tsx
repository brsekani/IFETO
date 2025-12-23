import React from "react";

export default function QtySpinner() {
  return (
    <div className="w-7 h-7 flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
    </div>
  );
}
