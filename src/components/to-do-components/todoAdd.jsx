import axios from "axios";
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";
import * as yup from "yup";


function TodoAdd(){

    const[cookies] = useCookies("userId","userName");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            userId: cookies["userId"],
            title:'',
            description:'',
            dueDate:'',
            status:''
        },
        validationSchema: yup.object({
            title:yup.string().required("You have to put the title"),
            description:yup.string().required("Description required"),
            dueDate:yup.date().required("date required"),
            status:yup.string().required("status required")
        }),
        validateOnChange:true,
        validateOnBlur:true,
        onSubmit:(user)=>{
            axios.post("http://localhost:3000/appointment",user)
            navigate("/dashboard");
        }
    })

    return (
        <div className="d-flex justify-content-center align-items-center">
            <form onSubmit={formik.handleSubmit} className="w-50 p-3 shadow rounded rounded-3">
                <h2 className="text-center">Add new Tasks</h2>
                <div className="my-2">
                    <label htmlFor="title" className=" form-label fw-bold">Title</label>
                    <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="title" className=" form-control"/>
                    <span className="text-danger">{formik.touched.title && formik.errors.title}</span>
                </div>
                <div className="my-2">
                    <label htmlFor="description" className=" form-label fw-bold">Description</label>
                    <textarea name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} rows="5" cols="20" className=" form-control"></textarea>
                    <span className="text-danger">{formik.touched.description && formik.errors.description}</span>
                </div>
                <div className="my-2 w-100 d-flex justify-content-between align-items-center">
                    <div>
                        <label htmlFor="dueDate" className=" form-label fw-bold">Date</label>
                        <input type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} name="dueDate" className="form-control"/>
                        <span className="text-danger">{formik.touched.dueDate && formik.errors.dueDate}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="status" className=" form-label fw-bold">Status</label>
                    <select name="status" onChange={formik.handleChange} onBlur={formik.handleBlur} className="d-block form-select mb-3">
                        <option value="pending" className=" dropdown-item">Pending</option>
                        <option value="completed" className=" dropdown-item">Completed</option>
                        <option value="in progress" className=" dropdown-item">In Progress</option>
                    </select>
                    <span className="text-danger">{formik.touched.status && formik.errors.status}</span>
                </div>
                <div className="w-100 d-flex justify-content-end align-items-center mb-2">
                    <button type="submit" className="btn btn-primary">Save Your Task</button>
                    <Link to="/dashboard"><button className="btn btn-danger mx-2">Cancel</button></Link>
                </div>
            </form>
        </div>
    )



}
export default TodoAdd