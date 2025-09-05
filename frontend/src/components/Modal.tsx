"use client";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Затемнення */}
      <div
        className={`absolute inset-0 bg-black  opacity-20 `}
        onClick={onClose}
      ></div>

      {/* Вміст */}
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg z-10">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
        ✕
       </button>

        {children}
      </div>
    </div>
  );
}
