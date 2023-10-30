import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import TextField from "../../components/TextField"

const AddUser = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(true);
  const [error, setError] = useState(false);

  const validation = () => {
    if (id == 0) {
      return ('Invalid Form, Id can not be empty')
    }
 
    if (title.length == 0) {
      return ('Invalid Form, Title can not be empty')
    }
 
    if (description.length == 0) {
      return ('Invalid Form, Description can not be empty')
   }
 
   if (completed.length == 0) {
      return ('Invalid Form, Completed can not be empty')
   }

   return true;
     
  }

  const handleAddTask= async () => {

    const isValid = validation();
    if (isValid == true) {
        const data = {id: id, title: title, description: description, completed: completed}
        await fetch("http://46.100.46.149:8069/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      navigate('/');
    }
  }
  

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        inputProps={{ type: 'number'}}
      />
      <br />
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ type: 'string'}}
      />
      <br />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{ type: 'string'}}
      />
      <br />
      <TextField
        label="Completed"
        value={completed}
        onChange={(e) => setCompleted(e.target.value)}
        inputProps={{ type: 'string'}}
      />
      <Button onClick={handleAddTask}>Submit</Button>
    </div>
  )
}

export default AddUser