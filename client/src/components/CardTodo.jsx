import React from "react";

export default function CardTodo({ posts }) {
  async function deletePost(id) {
    const isDelete = confirm("Wanna delete?");

    if (isDelete) {
      try {
        const deletedPost = await fetch("http://localhost:5000/api/post/delete/" + id, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });
        const res = await deletedPost.json();
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  }

  return (
    <div className="bg-slate-300 px-10 py-5 mt-5 rounded-md flex flex-col flex-wrap w-[100%]">
      {posts.map((post) => (
        <div className="flex justify-between items-center" key={post._id}>
          <p className="font-semibold">{post.todo}</p>
          <div className="flex gap-4 justify-between">
            <button className="bg-orange-500 border-[1px] border-black text-white font-semibold py-1 px-2 rounded-md mb-2">
              {post.inProgres ? "In Progress" : "Done"}
            </button>
            <div>
              <button
                onClick={() => deletePost(post._id)}
                className="bg-red-500 border-[1px] border-black text-white font-semibold w-[70px] py-1 px-2 mr-4 rounded-md"
              >
                Delete
              </button>
              <button className="bg-blue-500 border-[1px] border-black text-white font-semibold w-[70px] py-1 px-2  rounded-md">
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
