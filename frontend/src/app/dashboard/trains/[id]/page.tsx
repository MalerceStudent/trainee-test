"use client";
import { use, useState } from "react";
import Modal from "@/components/Modal";
import TrainForm from "@/components/TrainForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTrainById, updateTrain, deleteTrain } from "@/util/train-requests";
import { Train } from "@/types/train";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/util/format-date-time";

interface TrainDetailsPageProps {
  params: Promise<{ id: string }>; 
}

export default function TrainDetailsPage({ params }: TrainDetailsPageProps) {
  const { id } = use(params);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["train", id],
    queryFn: async () => {
        const token = localStorage.getItem("token"); // дістаємо токен прямо тут
        if (!token) throw new Error("No token");
        return fetchTrainById({id, token});
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTrain: Train) => {
      const token = localStorage.getItem("token"); // дістаємо токен прямо тут
      if (!token) throw new Error("No token");
      return updateTrain(id, updatedTrain, token);
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["train", id] });
      setIsEditOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token"); // дістаємо токен прямо тут
      if (!token) throw new Error("No token");
      return deleteTrain(id, token);
    },
    onSuccess: () => {
        console.log("yeess")
        queryClient.invalidateQueries({ queryKey: ["trains"] });
        router.push("/dashboard"); 
    },
  });

  const handleSave = (updatedTrain: Train) => {
    updateMutation.mutate(updatedTrain);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <p className="text-red-500">Error: {String(error)}</p>;

  const train = data;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Train Details</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p><span className="font-semibold">Train Number:</span> {train.number}</p>
        <p><span className="font-semibold">Train Name:</span> {train.name}</p>
        <p><span className="font-semibold">From:</span> {train.from}</p>
        <p><span className="font-semibold">To:</span> {train.to}</p>
        <p>
          <span className="font-semibold">Departure:</span>{" "}
          {formatDateTime(train.departure)}
        </p>
        <p>
          <span className="font-semibold">Arrival:</span>{" "}
          {formatDateTime(train.arrival)}
        </p>
      </div>


      {/*Edit modal*/}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Train</h2>
        <TrainForm train={train} onSave={handleSave} />
      </Modal>

      {/* Delete confirm modal*/}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-red-600">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete train <b>{train.number} - {train.name}</b>?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteOpen(false)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
        {deleteMutation.isError && (
          <p className="text-red-500 mt-2">Error: {String(deleteMutation.error)}</p>
        )}
      </Modal>
    </div>
  );
}
