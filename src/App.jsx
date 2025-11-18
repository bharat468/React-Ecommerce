import React, { useReducer } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function App() {
    const dataStore = {
        input: "",
        task: [],
        isEditing: false,
    }

    const [state, dispatch] = useReducer(reducer, dataStore)
    console.log(state)
    function reducer(state, action) {
        switch (action.type) {
            case "input": {
                return { ...state, input: action.payload }
            }
            case "addtask": {
                if (!state.input.trim()) return state
                return state.isEditing
                    ? {
                        ...state, task: state.task.map((obj) => {
                            return obj.id === state.editId ? { ...obj, task: state.input } : obj
                        }),
                        input: "",
                        isEditing: false,
                        editId: null

                    }
                    : { ...state, task: [...state.task, { id: Date.now(), task: state.input }], input: "" }
            }
            case "delete": {
                return { ...state, task: state.task.filter((obj) => obj.id !== action.payload) }
            }
            case "edit": {
                return {
                    ...state, isEditing: true, editId: action.payload, input: state.task.find((obj) => obj.id === action.payload).task
                }
            }
        }

    }
    


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Todo App</h1>

                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        dispatch({ type: "addtask" })
                    }}
                >
                    <input
                        type="text"
                        placeholder="Add your task"
                        value={state.input}
                        onChange={(e) => dispatch({ type: "input", payload: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400"
                    />

                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                        {state.isEditing ? "Edit" : "Add"}
                    </button>
                </form>

                <ul className="mt-6 space-y-3">
                    {state.task.map((obj) => (
                        <li
                            key={obj.id}
                            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                        >
                            <span className="text-gray-700">{obj.task}</span>
                            <span onClick={() => dispatch({ type: "edit", payload: obj.id })}><FaEdit /></span>
                            <span onClick={() => dispatch({ type: "delete", payload: obj.id })}><MdDeleteForever /></span>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default App
