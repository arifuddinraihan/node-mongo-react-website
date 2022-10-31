import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }
    console.log(user)

    fetch(`http://localhost:5000/users` , {
      method : "POST",
      headers : {
        'content-type' : 'application/json',
      },
      body : JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data];
      setUsers(newUser)
    })
    .catch(error => console.error(error))

    event.target.reset()
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" required />
        <br></br>
        <input type="email" name="email" required />
        <br></br>
        <button>Add User</button>
      </form>
      <h2>
        Users : {users.length}
      </h2>
      <div>
        {
          users.map(user => <p key={user.id}> {user.name}</p>)
        }
      </div>
    </div>
  );
}

export default App;
