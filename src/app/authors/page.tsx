"use client"; 
import Link from "next/link"; //moverme entre paginas 
import { useAuthors } from "../../hooks/useAuthors"; //importo mi hook personalizado, donde tengo la logica de autores 

export default function AuthorsPage() {
  const { authors, loading, deleteAuthor } = useAuthors();

  if (loading) return <p className="p-6">Cargando autores...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Autores</h1>
      {authors.length === 0 ? (
        <p>No hay autores aún.</p>
      ) : (
        // si hay, los recorre uno por uno
        <ul className="space-y-2">
          {authors.map((author) => (
            <li key={author.id} className="border p-3 rounded shadow">
              <h2 className="font-semibold">{author.name}</h2>
              <p className="text-sm">{author.description}</p>
              <p className="text-xs text-gray-500">Nació: {author.birthDate}</p>
              <div className="mt-2 flex gap-4">
                <Link
                  href={`/authors/${author.id}/edit`}
                  className="text-blue-600 hover:underline text-sm"
                >
                   Editar
                </Link>
                <button
                  onClick={() => deleteAuthor(author.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                   Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}