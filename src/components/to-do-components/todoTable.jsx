import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";



function TodoTable(){

    const[appointments,setAppointments] = useState([{id:'',userId:'',title:'',description:'',dueDate:'',status:''}]);

    const[cookies]=useCookies(["userId"]);

    function dataLoad(){
        axios.get(`http://localhost:3000/appointment`)
        .then(response=>{
            const filterData = response.data.filter(
                newResponse=>newResponse.userId === cookies.userId
            );
            setAppointments(filterData);
        })
        
    }

    useEffect(()=>{
        dataLoad();
    },[appointments,cookies])

    return(
        <div>
            <table className=" table">
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map(appointment=>{
                            return(
                                <tr key={appointment.title}>
                                    <td>{appointment.title}</td>
                                    <td>{appointment.description}</td>
                                    <td>{appointment.status}</td>
                                    <td>{appointment.dueDate}</td>
                                    <td className="position-relative">
                                        <div className="dropdown">
                                            <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="bi bi-three-dots-vertical"></span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-lg-end">
                                                <li><Link className="text-decoration-none" to={`${appointment.id}/edit`}><button className="dropdown-item text-primary">Edit</button></Link></li>
                                                <li><Link className="text-decoration-none" to={`${appointment.id}`}><button className="dropdown-item text-danger">Delete</button></Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TodoTable