import React, { useState, useEffect }from "react";

//create your first component
const Home = () => {

    const [inputValue, setInputValue] = useState("");
    const [tareas, setTareas] = useState([]); // [{},{},{},{},{}]
    const [username, setUsername] = useState("xXcarlos117Xx2");
    // https://playground.4geeks.com/todo/docs API DOCS
    // https://playground.4geeks.com/todo/users/xXcarlos117Xx2 POST Create user
    // Crear tareas y mandarlas a la api
    // 
    // Conseguir las tareas de la api
    // Crear un usuario y mandarlas a la api
    async function createUser() {
        fetch('https://playground.4geeks.com/todo/users/' + username, {method: 'POST'});
    }

    async function getTareas() {
        const response = await fetch('https://playground.4geeks.com/todo/users/' + username);
        const data = await response.json();
        setTareas(data.todos);
    }

    async function createTarea(e) {
        e.preventDefault(); // para evitar que se recargue la página al enviar el formulario
        const tareaAEnviar = {"label": inputValue, "is_done": false}

        fetch('https://playground.4geeks.com/todo/todos/' + username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tareaAEnviar),
        });

        setInputValue('');
        getTareas();
    }

    useEffect(() => {
        createUser().then(() => getTareas()); // Ejecutar la función al cargar el componente
    }, []); // [] para que se ejecute solo una vez al montar el componente

    return (
        <>
            <form onSubmit={(e) => createTarea(e)}>
                <input value={inputValue}
                       onChange={(event) => setInputValue(event.target.value)} /> {/* Asignamos el valor del propio input al input */}
            </form>
            <ul>
                {tareas.map(
                    (valor, indice) => (
                    <li key={indice}>{valor.label} - {valor.is_done? "Completada" : "Pendiente"}</li>
                ))}
            </ul>

        </>
    );
};

export default Home;