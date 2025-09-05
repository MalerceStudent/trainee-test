import { Train } from "@/types/train";

export const matchesSearchTerm = (train: Train, term: string) => {
    const search = term.toLowerCase();
  
    return (
      (train.number?.toLowerCase() ?? "").includes(search) ||
      (train.name?.toLowerCase() ?? "").includes(search) ||
      (train.from?.toLowerCase() ?? "").includes(search) ||
      (train.to?.toLowerCase() ?? "").includes(search) ||
      formatDate(train.departure).toLowerCase().includes(search) ||
      formatDate(train.arrival).toLowerCase().includes(search)
    );
  };
  
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
  