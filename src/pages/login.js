import { useEffect, useState } from "react"
import Card from "../components/card"
import { Link } from "react-router-dom"
import { BaseUrl, theme } from "../fixedData"
import '../styles/main.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login =()=>{

    const [username, setusername] = useState('')
    const [pass, setpass] = useState('')
    const navigate =useNavigate()
    useEffect(() => {
        if (localStorage.getItem('user') != undefined && localStorage.getItem('user') != 'null') {
            // alert('already login, logout first to login back!')
            navigate('/todos')
        }
    }, [])
    
    const login=()=>{
        // axios.get(`${BaseUrl}login?user=${username}&pass=${pass}`)

        axios.post(`${BaseUrl}login`, {username, pass})
        .then(res=>{
            console.log(res)
            if(res.data.length>0){
                alert('login Successfull!')
                localStorage.setItem('user',JSON.stringify(res.data[0]))
                navigate('/todos')
            }
            else{
                alert('Wrong ID or Password!')
            }
        })
        .catch(err=>{
            console.log(err,'error')
        })
    }

    return(
        <div className="container" style={{backgroundColor:theme.bg}}>

        
       <Card>
        <h3 className="heading">Login</h3>
        <label className="headtext">Email/Mobile</label>
        <input className="textinp" value={username} placeholder="John@gmail.com" type="text" onChange={(e)=>setusername(e.target.value)} />
        <label className="headtext">Password</label>

        <input className="textinp" value={pass} placeholder="12345" type ="password"  onChange={(e)=>setpass(e.target.value)} />
        <button className="btngreen" onClick={()=>login()} type="button" >Login</button>
        <Link className="link" to ="/signup">Don't have an accout? Create one!</Link>
       </Card> 
       </div>
    )
}

export default Login;