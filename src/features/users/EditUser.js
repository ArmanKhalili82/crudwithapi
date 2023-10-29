import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import TextField from "../../components/TextField"


const EditUser = () => {
  let  {taskid} = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(true);

  const getData = async () => {
    const response = await fetch(`http://46.100.46.149:8069./api/tasks/${taskid}`)
    const data = await response.json();
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setCompleted(data.completed);
  }

  useEffect( () => {
    if (taskid !== "new") {
        
        getData();
    }

},[])
  

 const validation = () => {
   if (id.length == 0) {
     alert('Invalid Form, Id can not be empty')
   }

   if (title.length == 0) {
     alert('Invalid Form, Title can not be empty')
   }

   if (description.length == 0) {
    alert('Invalid Form, Description can not be empty')
  }

  if (completed.length == 0) {
    alert('Invalid Form, Completed can not be empty')
  }
    
 }
  

  const handleUpdate = async () => {
    if (id.length == 0 || title.length == 0 || description.length == 0 || completed.length == 0) {
      validation();
    }

    else {
      const data = {id: id, title: title, description: description, completed: completed}
      await fetch(`http://46.100.46.149:8069./tasks/api/tasks/`, {
        method: "put",
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
      <Button onClick={handleUpdate}>Edit</Button>
    </div>
  )
}

export default EditUser