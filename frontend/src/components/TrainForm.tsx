import { useState } from "react";
import Button from "./Button";
import { Train } from "@/types/train";

interface TrainFormProps {
  train?: Train | null;
  onSave?: (train: Train) => void;
}

export default function TrainForm({ train, onSave }: TrainFormProps) {
  const [formData, setFormData] = useState({
    number: train?.number || "",
    name: train?.name || "",
    from: train?.from || "",
    to: train?.to || "",
    departure: train?.departure || "",
    arrival: train?.arrival || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const fields = ["number", "name", "from", "to", "departure", "arrival"];
  
    // Базова перевірка на порожні значення
    fields.forEach((field) => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = `${field} cannot be empty or spaces only`;
      }
    });
  
    // Перевірка From != To
    if (formData.from.trim() && formData.to.trim() && formData.from === formData.to) {
      newErrors.to = `"To" station must be different from "From" station`;
    }
  
    // Перевірка Departure < Arrival
    if (formData.departure && formData.arrival) {
      const depTime = new Date(formData.departure);
      const arrTime = new Date(formData.arrival);
      if (depTime >= arrTime) {
        newErrors.arrival = `"Arrival" must be later than "Departure"`;
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="number"
        placeholder="Train Number"
        value={formData.number}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

      <input
        type="text"
        name="name"
        placeholder="Train Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="text"
        name="from"
        placeholder="From"
        value={formData.from}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}

      <input
        type="text"
        name="to"
        placeholder="To"
        value={formData.to}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="datetime-local"
            name="departure"
            placeholder="Departure"
            value={formData.departure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.departure && <p className="text-red-500 text-sm">{errors.departure}</p>}
        </div>

        <div>
          <input
            type="datetime-local"
            name="arrival"
            placeholder="Arrival"
            value={formData.arrival}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.arrival && <p className="text-red-500 text-sm">{errors.arrival}</p>}
        </div>
      </div>

      <Button type="submit" full>
        Save
      </Button>
    </form>
  );
}
