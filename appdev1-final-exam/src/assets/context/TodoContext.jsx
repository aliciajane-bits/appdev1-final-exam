import React, { createContext, useState, useEffect } from "react";

const TodoContext = createContext();

const fetchTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await response.json();
    return data;
};

export const TodoProvider = ({ children }) => {

    const [todo, setTodos] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            const fetchedTodos = await fetchTodos();
            setTodos(fetchedTodos);
            setLoading(false); 
        };

        loadTodos();   
    }, []);

    const addTodo = (title) => {
        const newTodo = {id: Date.now(), title, completed: false};
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };
    
    const deleteTodo = (id) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const toggleComplete = (id) => {
        setTodos((prevTodos) => 
            prevTodos.map((todo) => 
                todo.id === id? { ...todo, completed: !todo.completed } : todo 
            )
        );
    };

    return (
        <TodoContext.Provider
        value={{ todos, loading, addTodo, deleteTodo, toggleComplete }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos should be in the TodoProvider")
    }
    return context;
};
  