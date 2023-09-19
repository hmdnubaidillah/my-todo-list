import { useState } from "react";

export default function MakeTodo({ setShowMakeTodo }) {
  const [form, setForm] = useState({ todo: "", createdAt: "" });

  async function handlePostTodo(e) {
    e.preventDefault();
    try {
      const data = await fetch("http://localhost:5000/api/post/new", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          todo: form.todo,
        }),
      });

      const newPost = await data.json();

      console.log(newPost);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="bg-[rgba(0,0,0,0.5)] absolute w-[100%] h-[100%] z-10">
      <div className="grid place-content-center h-screen">
        <form
          onSubmit={handlePostTodo}
          className="bg-white w-[400px] py-5 px-3 rounded-md"
        >
          <h1 className="text-center font-semibold text-xl">Make todo</h1>
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="">
              <h1>Enter todo</h1>
              <input
                type="text"
                className="border-[1px] border-black outline-none rounded-md px-2 py-1 w-full"
                onChange={(e) => setForm({ ...form, todo: e.target.value })}
                value={form.todo}
              />
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="bg-purple-500 font-semibold text-white rounded-md py-1 px-2 text-md hover:bg-purple-400 transition-[1s]
                "
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowMakeTodo((prev) => !prev)}
                className="border-[1px] border-black font-semibold  rounded-md py-1 px-2 text-md hover:bg-red-400 hover:border-red-400 hover:text-white transition-[1s]"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
