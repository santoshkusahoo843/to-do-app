import { useCookies } from "react-cookie"
import TodoHeader from "./todoHeader"
import { useEffect, useState } from "react";
import { useNavigate , Outlet,Link } from "react-router-dom";
import axios from "axios";




function TodoDashboard(){

    const[user,setUser]=useState([{}]);

    const[cookies] = useCookies(["userId","userName"]);
    const navigate = useNavigate();

    function getData(){
        axios.get("http://localhost:3000/appointment")
        .then(response=>{
           const filterUser= response.data.filter(filterUser=>(
                filterUser.userId === cookies["userId"]
           ))
            setUser(filterUser);
        })
    }

    useEffect(()=>{
        if(cookies.userId===undefined){
            navigate("/");
        }
        getData();
    },[cookies,user])

    return(
        <div className="bg-light" style={{height:'100vh'}}>
            <div>
                <TodoHeader link="login" btnClass="text-danger fw-bold" exit="bi bi-box-arrow-left pe-1" btnTxt={cookies.userId} visible="justify-content-between" width="w-50" />
            </div>
            <div>
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center ">
                        <div>
                            <div className="fs-3 fw-bold">Task Overview</div>
                            <div className=" text-secondary">Manage and track your task progress.</div>
                        </div>
                        <div>
                            <button className="btn btn-white shadow mx-2"><span className="bi bi-funnel pe-1"></span>Filter</button>
                            <Link to={`:${cookies["userId"]}/add`}><button className="btn btn-primary shadow"><span className="bi bi-plus pe-2"></span>New Task</button></Link>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-between align-items-center py-4">
                        <div className="card bg-white shadow p-3" style={{width:'200px',border:'none'}}>
                            <div className="text-secondary">TOTAL TASKS</div>
                            <div className="fw-bold fs-3">{user.length}</div>
                        </div>
                        <div className="card bg-white shadow p-3" style={{width:'200px',border:'none'}}>
                            <div className="text-secondary">PENDING</div>
                            <div className="fw-bold text-danger fs-3">
                                {
                                    user.filter(user=>(user.status === "pending")).length
                                }
                            </div>
                        </div>
                        <div className="card bg-white shadow p-3" style={{width:'200px',border:'none'}}>
                            <div className="text-secondary">IN PROGRESS</div>
                            <div className="fw-bold text-warning fs-3">
                                {
                                    user.filter(user=>(user.status ==="in progress")).length
                                }
                            </div>
                        </div>
                        <div className="card bg-white shadow p-3" style={{width:'200px',border:'none'}}>
                            <div className="text-secondary">COMPLETED</div>
                            <div className="fw-bold text-success fs-3">
                                {
                                    user.filter(user=>(user.status ==="completed")).length
                                }
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default TodoDashboard