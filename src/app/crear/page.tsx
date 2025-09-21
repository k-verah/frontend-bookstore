"use client";
import { useState } from "react"; //guarda lo que el usuario escribe en cada input

export default function CrearAutorPage() {
    //variables para guardar lo que el usuario escribe en el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //armo un objeto con los datos que escribio el usuario
    const nuevoAutor = { name, description, birthDate, image };

    try {
        //envio los datos al backend con un POST
      const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoAutor), //convierto mi objeto en texto para enviarlo
      });

      if (!res.ok) throw new Error("Error al crear autor");

      alert("Autor creado con éxito");
      //limpio el formulario
      setName("");
      setDescription("");
      setBirthDate("");
      setImage("");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema creando el autor");
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Autor</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Fecha de nacimiento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">URL de Imagen</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>
    </main>
  );
}

