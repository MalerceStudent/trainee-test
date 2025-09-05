"use client";
import { useState } from "react";
import TrainTable from "@/components/TrainTable";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TrainForm from "@/components/TrainForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrain, fetchAllTrains } from "@/util/train-requests";
import { Train } from "@/types/train";
import { useAuthContext } from "@/context/AuthContext";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trains"],
    queryFn: async () => {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("No token");
        return fetchAllTrains({ token });
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (formData: Train) => {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("No token");
        return createTrain(formData, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trains"] }); 
      setIsOpen(false); 
    },
  });

  const handleSave = (formData: Train) => {
    mutation.mutate(formData);
  };

  // фільтруємо потяги по пошуковому запиту
  const filteredTrains = data?.filter((train: Train) => {
    const term = searchTerm.toLowerCase();
  
    // функція для форматування дати
    const formatDate = (isoString?: string) => {
      if (!isoString) return "";
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    };
  
    return (
      (train.number?.toLowerCase() ?? "").includes(term) ||
      (train.name?.toLowerCase() ?? "").includes(term) ||
      (train.from?.toLowerCase() ?? "").includes(term) ||
      (train.to?.toLowerCase() ?? "").includes(term) ||
      formatDate(train.departure).toLowerCase().includes(term) ||
      formatDate(train.arrival).toLowerCase().includes(term)
    );
  });
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Train Schedule</h1>
        <Button onClick={() => setIsOpen(true)}>Add Train</Button>
      </div>

      {/* Пошук */}
      <input
        type="text"
        placeholder="Search by number, name, from, or to"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {isLoading && <p>Loading trains...</p>}
      {isError && <p className="text-red-500">Error: {String(error)}</p>}
      {filteredTrains && <TrainTable trains={filteredTrains} />}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add New Train</h2>
        <TrainForm onSave={handleSave} />

        {mutation.isPending && <p className="text-gray-500">Saving...</p>}
        {mutation.isError && (
            <p className="text-red-500">Error: {String(mutation.error)}</p>
        )}
      </Modal>
    </div>
  );
}
