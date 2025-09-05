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
import { matchesSearchTerm } from "@/util/matches-search ";

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
  const filteredTrains = data?.filter((train: Train) => matchesSearchTerm(train, searchTerm));

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
