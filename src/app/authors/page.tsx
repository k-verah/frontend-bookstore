"use client";
import Link from "next/link"; // moverme entre paginas
import { useAuthors } from "../../hooks/useAuthors"; // importo mi hook personalizado, donde tengo la logica de autores
import { useFavorites } from "../../context/Favorites"; // ahora importamos los favs 

export default function AuthorsPage() {
  const { authors, loading, deleteAuthor } = useAuthors();
  const { favorites, toggleFavorite } = useFavorites(); 

  if (loading) return <p className="p-6">Cargando autores...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Autores</h1>
      {authors.length === 0 ? (
        <p>No hay autores aún.</p>
      ) : (
        // Si hay, los recorre uno por uno
        <ul className="space-y-2">
          {authors.map((author) => (
            <li key={author.id} className="border p-3 rounded shadow">
              <h2 className="font-semibold">{author.name}</h2>
              <p className="text-sm">{author.description}</p>
              <p className="text-xs text-gray-500">Nació: {author.birthDate}</p>

              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => toggleFavorite(author.id)}
                  aria-pressed={favorites.includes(author.id)}
                  aria-label={
                    favorites.includes(author.id)
                      ? 'quitar ${author.name} de favortos'
                      : 'agregar ${author.name} a favoritos'
                  }
                  className={`px-3 py-1 rounded ${
                    favorites.includes(author.id)
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  {favorites.includes(author.id) ? "Favorito" : "Favorito"}
                </button>

                <Link
                  href={`/authors/${author.id}/edit`}
                  aria-label={`Editar autor ${author.name}`}
                  className="text-blue-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Editar
                </Link>

                <button
                  onClick={() => deleteAuthor(author.id)}
                  aria-label={`Eliminar autor ${author.name}`}
                  className="text-red-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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