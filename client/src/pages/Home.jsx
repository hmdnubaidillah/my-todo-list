export default function Home() {
  const username = localStorage.getItem("user");

  return (
    <main className="w-[90%] m-auto grid place-content-center h-screen">
      <div>
        <div>
          {" "}
          <h1>Welcome To Homepage {username}</h1>
        </div>
      </div>
    </main>
  );
}
