"use client";
import { useState } from "react";
import { Train } from "@/types/train";
import Link from "next/link";
import { formatDateTime } from "@/util/format-date-time";

interface TrainTableProps {
  trains: Train[];
  pageSize?: number;
}
export default function TrainTable({ trains, pageSize = 5 }: TrainTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(trains.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentTrains = trains.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Обгортка для горизонтального скролу */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Train Number</th>
              <th className="p-3 text-left">Train</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Departure</th>
              <th className="p-3 text-left">Arrival</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTrains.map((train) => (
              <tr key={train.id} className="border-t">
                <td className="p-3">{train.number}</td>
                <td className="p-3">{train.name}</td>
                <td className="p-3">{train.from}</td>
                <td className="p-3">{train.to}</td>
                <td className="p-3">{formatDateTime(train.departure)}</td>
                <td className="p-3">{formatDateTime(train.arrival)}</td>
                <td className="p-3 text-center">
                  <Link
                    href={`/dashboard/trains/${train.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* пагінація */}
      <div className="flex justify-center items-center gap-2 p-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
