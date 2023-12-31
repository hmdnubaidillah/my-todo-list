import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [viewPasword, setViewPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await fetch("http://localhost:5000/api/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const res = await data.json();
      console.log(res);

      alert("Sukses sign in");
      localStorage.setItem("user", res.user.username);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-[90%] m-auto">
      <div className="grid place-content-center h-screen">
        <h1 className="font-semibold text-2xl mb-[20px] text-center">Signup</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <label>
            <input
              className="border-gray-500 border rounded-lg py-1 px-2 outline-none"
              type="text"
              placeholder="Username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              value={form.username}
            />
            {/* error */}
            <p></p>
          </label>
          <label>
            <input
              className="border-gray-500 border rounded-lg py-1 px-2 outline-none"
              type={viewPasword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            />
            {/* error */}
            <p></p>
          </label>
          <label className="flex gap-2">
            <input onClick={() => setViewPassword((prev) => !prev)} type="checkbox" />
            <p>See password</p>
          </label>

          <button className="bg-color bg-purple-500 text-white font-semibold p-2 rounded-lg text-xl hover:bg-purple-400 cursor-pointer">
            Signup
          </button>
        </form>
      </div>
    </main>
  );
}
