import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import TextField from "../../components/TextField"

const Addedit = () => {

  const EditUser = () => {
    let  {taskid} = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(true);
    const [error, setError] = useState(false);
  
    const getData = async () => {
      const response = await fetch(`http://46.100.46.149:8069/api/tasks/${taskid}`)
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
     if (id == 0) {
       setError("invalid Form Id cannot be empty")
       return false;
     }
  
     if (title.length == 0) {
      setError("invalid Form Title cannot be empty")
      return false;
     }
  
     if (description.length == 0) {
      setError("invalid Form Description cannot be empty")
      return false;
    }
  
    if (completed.length == 0) {
      setError("invalid Form Completed cannot be empty")
      return false;
    }
  
    return true;
      
   }
    
    const handleUpdate = async () => {
      const isValid = validation();
      if (isValid == true) {
        const data = {id: id, title: title, description: description, completed: completed}
        await fetch(`http://46.100.46.149:8069/tasks/api/tasks/`, {
          method: "put",
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"}
        })
        navigate('/');
      }   
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

    const handleSave = async () => {
      if (taskid !== "new") {
          handleUpdate()
      }

      else {
          handleAddTask()
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
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}}

export default Addedit