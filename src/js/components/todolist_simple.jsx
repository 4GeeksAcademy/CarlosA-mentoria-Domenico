import React, { useState, useEffect }from "react";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [tareas, setTareas] = useState([]);

	function addTarea(event) {
		event.preventDefault(); // para evitar que se recargue la página al enviar el formulario
		if (inputValue.trim() === "") { // Validamos que no haya una tarea vacía
            return;
        }
		setTareas([...tareas, inputValue.trim()]); // Añadimos la nueva tarea al array de tareas
		setInputValue("");
	}

	function borrarTarea(indice) {
		setTareas(tareas.filter((_, i) => i!== indice)); // Eliminamos la tarea del índice indicado del array de tareas
	}

	return (
		<>
			<form onSubmit={(e) => addTarea(e)}>
				<input value={inputValue}
					   onChange={(event) => setInputValue(event.target.value)} /> {/* Asignamos el valor del propio input al input */}
			</form>
			<ul>
				{tareas.map(
					(valor, indice) => (
					<li onClick={() => borrarTarea(indice)} key={indice}>{valor}</li>
				))}
			</ul>
		</>
	);
};

export default Home;