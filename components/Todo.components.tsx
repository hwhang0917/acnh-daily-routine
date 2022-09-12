import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

interface ITodoItem {
  task: string;
  done: boolean;
}

export const Todo = () => {
  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    setDate(dayjs());
  }, []);

  const [todoInput, setTodoInput] = useState<string>("");
  const [todolist, setTodolist] = useState<ITodoItem[]>([]);
  const [expandTodolist, setExpandTodolist] = useState<boolean>(false);

  const setLocalTodo = useCallback((value: ITodoItem[]) => {
    if (typeof window !== "undefined")
      localStorage.setItem("todo", JSON.stringify(value));
  }, []);

  useEffect(() => {
    setTodolist(JSON.parse(localStorage.getItem("todo") ?? "[]"));
  }, []);

  return (
    <section className="lg:h-fit border border-slate-400 p-5 rounded col-span-2 order-first lg:order-none">
      <h2 className="text-xl py-3 flex items-end gap-2">
        <span>Todo</span>
        <span className="text-xs text-slate-300">
          {date.format("YYYY-MM-DD (ddd)")}
        </span>
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newTodolist = [...todolist, { done: false, task: todoInput }];
          setTodolist(newTodolist);
          setLocalTodo(newTodolist);
          setTodoInput("");
        }}
      >
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Your Email
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <i className="fa-solid fa-list-check w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="todo"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task"
            value={todoInput}
            onChange={(e) => {
              setTodoInput(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </form>
      <ul
        className={`mt-5 divide-y ${
          expandTodolist ? "max-h-fit" : "max-h-96 overflow-y-auto"
        } snap-y`}
      >
        {todolist.map(({ task, done }, idx) => (
          <li
            id={`${idx}`}
            key={idx}
            className="grid grid-cols-6 place-content-center snap-center"
          >
            <span
              className="p-5 col-span-5 cursor-pointer flex gap-5 items-center hover:line-through"
              onClick={(e) => {
                e.preventDefault();
                const newTodolist = todolist.map(({ done, task }, i) => {
                  if (i === idx) return { done: !done, task };
                  return { done, task };
                });
                setTodolist(newTodolist);
                setLocalTodo(newTodolist);
              }}
            >
              <span className="w-5">
                {done && (
                  <i className="fa-solid fa-check no-underline text-green-600" />
                )}
              </span>
              <span className={done ? "line-through" : ""}>{task}</span>
            </span>
            <div
              className="p-5 flex justify-center items-center cursor-pointer dark:hover:text-purple-300 hover:text-violet-500"
              onClick={(e) => {
                e.preventDefault();
                const newTodolist = todolist.filter((_, i) => i !== idx);
                setTodolist(newTodolist);
                setLocalTodo(newTodolist);
              }}
            >
              <i className="fa-solid fa-trash" />
            </div>
          </li>
        ))}
      </ul>
      {todolist.length > 6 && (
        <div className="flex justify-center flex-col items-center text-slate-500">
          <i
            className={`fa-solid fa-angle-${
              expandTodolist ? "up" : "down"
            } cursor-pointer`}
            onClick={() => {
              setExpandTodolist((s) => !s);
            }}
          />
        </div>
      )}
    </section>
  );
};
