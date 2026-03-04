import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Hae käyttäjän tiedot
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

    // Hae käyttäjän postaukset
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => res.json())
      .then(data => setPosts(data));

  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Käyttäjän tiedot</h1>

      <button onClick={() => setUserId(prev => prev > 1 ? prev - 1 : 1)}>
        Edellinen
      </button>

      <button onClick={() => setUserId(prev => prev + 1)}>
        Seuraava
      </button>

      <p><strong>User ID:</strong> {userId}</p>

      {user && (
        <div>
          <p><strong>Nimi:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Puhelin:</strong> {user.phone}</p>
        </div>
      )}

      <h2>Postaukset</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;