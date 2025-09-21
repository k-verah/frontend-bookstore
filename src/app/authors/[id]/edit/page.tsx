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

export default function EditAuthorPage({ params }: { params: { id: string } }) {
  const { id } = params; // Aqui recibo el id del autor que se quiere editar.
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null); //guardo el autor
  const [loading, setLoading] = useState(true);
    // busca el autor en el backend
  useEffect(() => {
    async function fetchAuthor() {
      try {
        const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`);
        const data = await res.json();
        setAuthor({
          ...data,
          // aseguramos formato de fecha YYYY-MM-DD
          birthDate: data.birthDate?.split("T")[0] ?? "",
        });
      } catch (error) {
        console.error("Error cargando autor:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id]);
    // cada vez que escribo un input, actualizo el autor en memoria 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!author) return;
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };
    // cada vez que envio el formulario, hago la actualizacion en el backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });
      if (!res.ok) throw new Error("Error actualizando autor");
      alert(" Autor actualizado con éxito");
      router.push("/authors");
    } catch (error) {
      console.error(error);
      alert(" No se pudo actualizar el autor");
    }
  };
// menjaes de carga o error.
  if (loading) return <p className="p-6">Cargando autor...</p>;
  if (!author) return <p className="p-6">No se encontró el autor</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Autor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={author.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Descripción</label>
            <textarea
              name="description"
              value={author.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Fecha de nacimiento</label>
            <input
              type="date"
              name="birthDate"
              value={author.birthDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">URL de Imagen</label>
            <input
              type="text"
              name="image"
              value={author.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {author.image && (
              <div className="mt-2">
                <img
                  src={author.image}
                  alt={author.name}
                  className="h-24 w-24 object-cover border rounded"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/96x96?text=No+Img";
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/authors")}
              className="w-1/2 border px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}