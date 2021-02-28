import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import abc from "./images/abc.jpg";

function App() {
  const { register, handleSubmit } = useForm();
const [data, setData] = useState({});
console.log(data)
  useEffect( () => {
    async function getdata(){
      const res = await fetch("http://localhost:4000/get");
      setData(res);
    }
    getdata()
    
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);

    const res = await fetch("http://localhost:4000/picture", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(res));
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} type="file" name="picture" />
        <br />
        <button>Submit</button>
      </form>
      <br />
      <br />
      <br />

      <img src={abc} alt="logo" width="300px" height="400px" />
    </div>
  );
}

export default App;
