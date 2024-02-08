import { useEffect, useState } from "react"
import Card from "../components/card"
import '../styles/main.css'
import { BaseUrl, theme } from "../fixedData"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Todo from "../components/todo"



const Todos = () => {

    const [todo, settodo] = useState('')
    const [search, setsearch] = useState('')

    const [todos, settodos] = useState([])
    const [filtered, setfiltered] = useState([])
    const [btns, setbtns] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')))

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('user') == undefined || localStorage.getItem('user') == 'null') {
            alert('login first!')
            navigate('/')
        }
        else
            fetchTodo()
    }, [])

    useEffect(() => {
        const temp = todos.filter(todo => todo.todotext.includes(search))
        setfiltered(temp.slice(pageNumber, pageNumber + 3))

        if (search == "") {
            setfiltered(todos.slice(pageNumber, pageNumber + 3))
        }

    }, [search])


    const submitTodo = () => {
        axios.post(BaseUrl + 'todo', { todo, userid: user.userid })
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    fetchTodo()
                    alert('todo Submitted!')
                }
            })
            .catch(err => {
                console.log(err, 'error')
            })
    }
    const fetchTodo = () => {
        axios.get(BaseUrl + 'todo?userid=' + user.userid)
            .then(res => {
                setsearch('')
                console.log(res)
                settodos(res.data)
                setfiltered(res.data.slice(pageNumber, pageNumber + 3))
                setbtns(res.data.length / 3)

            })
            .catch(err => {
                console.log(err, 'error')
            })
    }
    useEffect(() => {
        // if(pageNumber<=todos.length/3)

        setfiltered(todos.slice(pageNumber, pageNumber + 3))


    }, [pageNumber])

    const Logout = () => {
        localStorage.setItem('user', "null")
        navigate('/')
    }
    const handlePrev = () => {
        if (pageNumber === 0) return
        else
            setPageNumber(pageNumber - 3)
    }
    const handleNext = () => {
        setPageNumber(pageNumber + 3)
    }
    return (
        <div className="container" style={{ backgroundColor: theme.bg }}>


            <Card>
                <h3 className="heading">Todos</h3>
                <input className="textinp" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search" />

                {filtered.length > 0 ? filtered.map(todo => <Todo>{todo.todotext}</Todo>)
                    :
                    <h4 style={{ color: '#fff' }}>No todo's to show</h4>
                }
                <div>
                    <label className="link">pageNumber :{pageNumber / 3}</label>
                    <button className="btngreen" onClick={() => handlePrev()} >prev</button>
                    <button className="btngreen" onClick={() => handleNext()}>next</button>
                </div>

                <input className="textinp" value={todo} onChange={(e) => settodo(e.target.value)} placeholder="Write Todo" />
                <button className="btngreen" type="button" onClick={() => submitTodo()} >Create Todo</button>
                <button className="btnred" onClick={() => Logout()}>Logout</button>
                {/* <Link className="link" to="/">Already have an account? Login!</Link> */}
            </Card> </div>

    )
}

export default Todos;
