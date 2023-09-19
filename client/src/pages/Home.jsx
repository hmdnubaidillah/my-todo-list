import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import { MakeTodo, CardTodo } from "../components";

export default function Home() {
  const [cookies] = useCookies(["jwt"]);

  const [showMakeTodo, setShowMakeTodo] = useState(false);
  const [posts, setPosts] = useState([]);

  const username = localStorage.getItem("user");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("http://localhost:5000/api/post");

        const post = await data.json();

        setPosts(post.post);
        console.log(post.post);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {showMakeTodo && <MakeTodo setShowMakeTodo={setShowMakeTodo} />}
      <main className="w-[90%] pt-20 m-auto h-screen">
        <div>
          {cookies.jwt ? (
            <>
              <h1 className="font-semibold text-2xl">Welcome To Homepage {username}</h1>
              <div>
                <button
                  onClick={() => setShowMakeTodo((prev) => !prev)}
                  className="bg-blue-500 p-2 rounded-md text-white font-semibold hover:bg-blue-400 mt-5"
                >
                  Create Todo
                </button>
                <CardTodo posts={posts} />
              </div>
            </>
          ) : (
            <h1 className="font-bold text-2xl">You need to login first!</h1>
          )}
        </div>
      </main>
    </>
  );
}
