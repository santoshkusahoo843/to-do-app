import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"



function TodoDelete(){

    let params = useParams();
    let navigate = useNavigate();

    const[apoint,SetApoint] = useState({id:'',title:'',description:'',dueDate:'',status:''});
    
    function getDataToDelete(){
       axios.get(`http://localhost:3000/appointment/${params.id}`)
       .then(response=>{
            SetApoint(response.data);
       })
    }

    function onDeleteClick(){
        const result = confirm("Delete confirm...");
        if(result===true){
            axios.delete(`http://localhost:3000/appointment/${params.id}`)
            navigate("/dashboard");
        }
        else{
            navigate("/dashboard");
        }
    }
    
    

    useEffect(()=>{
        getDataToDelete();        
    },[])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card w-50 bg-white border-0 shadow p-3 rounded-3">
                <div className="row my-2">
                    <div className="col-4 fs-5 fw-bold d-flex justify-content-between align-items-center"><span>Title</span><span>:</span></div>
                    <div className="col-8 fs-5 d-flex justify-content-start align-items-center"> {apoint.title}</div>
                </div>
                <div className="row my-2">
                    <div className="col-4 fs-5 fw-bold d-flex justify-content-between align-items-center"><span>Description</span><span>:</span></div>
                    <div className="col-8 fs-5 d-flex justify-content-start align-items-center"> {apoint.description}</div>
                </div>
                <div className="row my-2">
                    <div className="col-4 fs-5 fw-bold d-flex justify-content-between align-items-center"><span>Date</span><span>:</span></div>
                    <div className="col-8 fs-5 d-flex justify-content-start align-items-center"> {apoint.dueDate}</div>
                </div>
                <div className="row my-2">
                    <div className="col-4 fs-5 fw-bold d-flex justify-content-between align-items-center"><span>Status</span><span>:</span></div>
                    <div className="col-8 fs-5 d-flex justify-content-start align-items-center"> {apoint.status}</div>
                </div>
                <div className="card-footer bg-white d-flex align-items-center border-0 pt-3">
                    <Link to="/dashboard"><button className="btn btn-primary me-2">Cancel</button></Link>
                    <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default TodoDelete