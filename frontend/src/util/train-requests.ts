import { Train } from '@/types/train';
import { QueryClient } from '@tanstack/react-query';

export async function fetchAllTrains({ signal, token }: { signal?: AbortSignal, token: string }) {
    const response = await fetch(`http://localhost:3001/trains`, 
    { 
        headers: { Authorization: `Bearer ${token}` },
        signal 
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching trains') as any;
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const trains = await response.json();
    console.log(trains)
    return trains;
}

export async function fetchTrainById({ signal, id, token }: { signal?: AbortSignal, id: string, token: string }) {
    const response = await fetch(`http://localhost:3001/trains/${id}`, { 
        headers: { Authorization: `Bearer ${token}` },
        signal 
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching train') as any;
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const train = await response.json();
    console.log(train)
    return train;
}

export async function createTrain(train: Train, token: string) {
    const response = await fetch("http://localhost:3001/trains", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(train),
    });
    if (!response.ok) throw new Error("Failed to create train");
    return response.json();
}

export async function updateTrain(id: string, train: Train, token: string) {
    const res = await fetch(`http://localhost:3001/trains/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(train),
    });
  
    if (!res.ok) throw new Error("Failed to update train");
    return res.json();
}

export async function deleteTrain(id: string, token: string) {
    const res = await fetch(`http://localhost:3001/trains/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete train");
    return true;
}
