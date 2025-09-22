"use client";

import { useAuthors } from "../../hooks/useAuthors";
import { useFavorites } from "../../context/Favorites";

export default function FavoritosPage() {
  const { authors, loading } = useAuthors();
  const { favorites } = useFavorites();

  if (loading) return <p className="p-6">Cargando autores favoritos...</p>;

  //  unicamehnte los autores que están en favoritos
  const favoritos = authors.filter((author) => favorites.includes(author.id));

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Autores Favoritos</h1>

      {favoritos.length === 0 ? (
        <p>No hay autores marcados como favoritos.</p>
      ) : (
        <ul className="space-y-2">
          {favoritos.map((author) => (
            <li
              key={author.id}
              className="border p-3 rounded shadow bg-yellow-50"
            >
              <h2 className="font-semibold">{author.name}</h2>
              <p className="text-sm">{author.description}</p>
              <p className="text-xs text-gray-500">
                Nació: {author.birthDate}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}