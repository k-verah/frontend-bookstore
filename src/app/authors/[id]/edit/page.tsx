"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Author {
  id: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
}

export default function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  // Resolver params.id
  useEffect(() => {
    async function unwrapParams() {
      const resolved = await params;
      setId(resolved.id);
    }
    unwrapParams();
  }, [params]);

  // Cargar datos del autor
  useEffect(() => {
    if (!id) return;

    async function fetchAuthor() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`);
        const data = await res.json();
        setAuthor(data);
      } catch (error) {
        console.error("Error cargando autor:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id]);

  // Manejar cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!author) return;
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });

      if (!res.ok) throw new Error("Error actualizando autor");

      alert("Autor actualizado con éxito");
      router.push("/authors");
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el autor");
    }
  };

  if (loading) return <p className="text-center text-black">Cargando autor...</p>;
  if (!author) return <p className="text-center text-black">No se encontró el autor</p>;

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md w-full bg-white shadow-lg rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold mb-4 text-black">Editar Autor</h1>

        <div>
          <label className="block font-medium text-black">Nombre</label>
          <input
            type="text"
            name="name"
            value={author.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-black">Descripción</label>
          <textarea
            name="description"
            value={author.description}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-black">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthDate"
            value={author.birthDate}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-black">URL de Imagen</label>
          <input
            type="text"
            name="image"
            value={author.image}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}