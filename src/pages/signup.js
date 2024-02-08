import { useEffect, useState } from "react"
import Card from "../components/card"
import '../styles/main.css'
import { BaseUrl, theme } from "../fixedData"
import {  Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom";



const Signup = () => {
    const { register, handleSubmit, setValue,formState:{errors} } = useForm({
        defaultValues: {
            fullname: null,
            fathername: null,
            email: null,
            phone: null,
            pass: null,
        },
    })
    useEffect(() => {
        if (localStorage.getItem('user') != undefined || localStorage.getItem('user') != 'null') {
            alert('already login, logout first to login back!')
            navigate('/todos')
        }
    }, [])
    const navigate =useNavigate()

    const onSubmit = (data) => {
        axios.post(BaseUrl+'signup',data)
        .then(res=>{
            console.log(res)
            if(res.status==200 ){
                alert('Sign up Successfull!')
                // localStorage.setItem('user',res.data[0])
                navigate('/')
            }
        })
        .catch(err=>{
            console.log(err,'error')
        })
    }
    return (
        <div className="container" style={{ backgroundColor: theme.bg }}>
            <Card>
                <h3 className="heading">Sign Up</h3>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <label className="headtext">Full name</label>
                    <input className="textinp"{...register("fullname",{ required: true, maxLength: 25 })} placeholder="John"/>
                    {errors.fullname? <div className="errmsg">Invalid name</div>:''}

                    <label className="headtext">Fathers name</label>
                    <input className="textinp"{...register("fathername",{ required: true, maxLength: 25 })} placeholder="Father"/>
                    {errors.fathername? <div className="errmsg">Invalid Father's name</div>:''}

                    <label className="headtext">Email</label>
                    <input className="textinp"{...register("email",{ required: true, maxLength: 30 })} placeholder="John@gmail.com"/>
                    {errors.email? <div className="errmsg">Invalid Email</div>:''}

                    <label className="headtext">Phone</label>
                    <input type="number" className="textinp"{...register("phone",{ required: true, maxLength: 30 })} placeholder="9988776655"/>
                    {errors.phone? <div className="errmsg">Invalid Phone</div>:''}

                    <label className="headtext">Password</label>
                    <input className="textinp"{...register("pass",{ required: true, maxLength: 30 })} placeholder="@#$!3234"/>
                    {errors.pass? <div className="errmsg">Invalid Password</div>:''}

                    <button className="btngreen" type="submit" >Sign Up</button>
                </form>
                <Link className="link" to="/">Already have an account? Login!</Link>
            </Card> </div>

    )
}

export default Signup;
