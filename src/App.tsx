import React, {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
const Todo = () => {
    const [allTodos, setTodo] = useState([]);
    const [completedTodos, setCompletedTodo] = useState([]);
    const [input, setInput] = useState("");
    const dateRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            text: input,
            deadline: dateRef.current.value,
            completed: false,
        };
        setTodo([...allTodos, newTodo]);
        setInput("");
    };
    const handleDelete = (index) => {
        const old = [...allTodos];
        old.splice(index, 1);
        setTodo(old);
    };

    const setComplete = (index) => {
        const answer = window.confirm("Press ok to set your task as complete");
        if (answer) {
            const updated = [...allTodos];
            updated[index].completed = !allTodos[index].completed;
            setTodo(updated);

            const donetodos = [...completedTodos];
            setCompletedTodo([...completedTodos, updated[index]]);
            handleDelete(allTodos[index]);
        } else {
            return;
        }
    };
    return (
        <>
            <div className="d-flex justify-content-center my-5">
                <div className="card">
                    <div className="card-header">
                        <div className="fs-5">De-normalize your life™</div>
                    </div>
                    <div className="card-body">
                        <div className="fs-4">Set up tasks</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-3">
                                <p>Create a task</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    required
                                />
                                <p className="mt-3">Set a deadline</p>
                                <input type="date" className="form-control" ref={dateRef} required/>
                                <button className="btn btn-lg  btn-outline-primary mt-4">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <div className="card">
                    <div className="card-header">
                        <div className="fs-5">
                            {!allTodos.length > 0 ? <h5>Add a task to begin</h5> : "Tasks"}
                        </div>
                    </div>
                    <div className="card-body px-4">

                        {allTodos.map((item, index, i) => (
                            <div
                                className={`completed mt-2 ${
                                    item.completed ? "bg-success" : ""
                                } ${item.completed ? "text-light" : ""}`}
                                key={index}
                            >
                                <div
                                    className={`card-body d-flex justify-content-between align-items-center`}
                                >
                                    <div className="col-7 d-flex justify-content-between">
                                        <div id="task">
                                            <div>
                                                <small>Task:</small>
                                            </div>
                                            <span className="fs-5">{item.text}</span>
                                        </div>
                                    </div>

                                        <div id="deadline">
                                            <div>
                                                <small>Deadline:</small>
                                            </div>
                                            <span className="fs-5">{item.deadline}</span>
                                    </div>
                                    <div className="col-2 buttons d-flex gap-1 justify-content-end">
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => setComplete(index)}
                                        >
                                            ✓
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <div className="card">
                    <div className="card-header">
                        <div className="fs-5 d-flex justify-content-between">
                            {completedTodos.length > 0
                                ? "Your completed tasks"
                                : "No completed tasks"}
                            {!completedTodos.length <= 0 ? <button className="btn btn-sm btn-outline-danger" onClick={() => setCompletedTodo([])}>Clear</button> : ''}
                        </div>
                    </div>
                    <div className="card-body px-4">
                        {completedTodos.map((item, index, i) => (
                            <div
                                className={`completed mt-2 ${
                                    item.completed ? "bg-success" : ""
                                } ${item.completed ? "text-light" : ""}`}
                                key={index}
                            >
                                <div
                                    className={`card-body d-flex justify-content-between align-items-center`}
                                >
                                    <div className="col-7 d-flex justify-content-between">
                                        <div id="task">
                                            <div>
                                                <small>Task is completed</small>
                                            </div>
                                            <span className="fs-5">{item.text}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
const App = () => {
    return (
        <>
            <Todo />
        </>
    );
};

export default App;
