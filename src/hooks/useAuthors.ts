"use client";
import { useState, useEffect } from "react";

// Interfaz de como luce un Autor
export interface Author {
  id: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
}
// Custom Hook, funcion para organizar la logica
export function useAuthors() {
  // Aqui guardo la lista de autores
  const [authors, setAuthors] = useState<Author[]>([]);
  // Aqui se guarda si todavia estoy cargando datos del back
  const [loading, setLoading] = useState(true);

  // Obtener lista inicial de autorees del backend
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/authors")
      .then((res) => res.json())  // convierto la respuesta en algo que JS entiedne 
      .then((data) => setAuthors(data))
      .catch((err) => console.error("Error cargando autores:", err))
      .finally(() => setLoading(false));
  }, []);

  // Funcion crear autor
  const createAuthor = async (author: Omit<Author, "id">) => {
    const res = await fetch("http://127.0.0.1:8080/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author), // mando los datos del nuevo autor 
    });
    if (!res.ok) throw new Error("Error creando autor");
    const data = await res.json();
    setAuthors((prev) => [...prev, data]); // Actualizo la lista con el nuevo autor 
  };

  // Eliminar autor
  const deleteAuthor = async (id: number) => {
    const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error eliminando autor");
    setAuthors((prev) => prev.filter((a) => a.id !== id)); //elimino el autor de la lista local 
  };

  return { authors, loading, createAuthor, deleteAuthor };
}