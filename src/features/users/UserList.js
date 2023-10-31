import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField"

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")

  const getAll = async () => {
    const response = await fetch("http://46.100.46.149:8069/api/tasks")
    const data = await response.json();
    setUsers(data)
  }

  useEffect(() => {
    getAll()
  }, [])

  const handleRemoveUser = async (id) => {
    await fetch(`http://46.100.46.149:8069/api/tasks/${id}`, {
      method: "DELETE",
    })
  }

  return (
    <div>
      <Link to="/Addedit/new"><Button>Add User1</Button></Link>
      <TextField
        label="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        inputProps={{ type: 'string'}}
        ></TextField>
      <br />

      <div className="grid gap-5 md:grid-cols-2">
        {users.filter(u => u.title.includes(search)).map(user => {
          return (
            <>
              <div className="bg-gray-300 p-5 flex items-center justify-between" key={user.id}>
                <div>
                  <h3 className="font-bold text-lg text-gray-700">{user.title}</h3>
                  <span className="font-normal text-gray-600">{user.description}</span>
                </div>
                <div className="flex gap-4">
                  <Link to={`Addedit/${user.id}`}>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default UserList