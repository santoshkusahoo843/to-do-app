import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"



function TodoHeader(props){


    const[cookies,deleteCookies]=useCookies(["userId","userName"]);
    const navigate = useNavigate();

    function handleSignOut(e){
        if(e.target.value === cookies["userId"]){
            deleteCookies("userId");
            deleteCookies('userName');
            navigate("/");
        }
    }

    function getSearch(e){
        let value = e.target.value.toLowerCase();
        props.getSearchStr(value);
    }

    return (

        <div>
            <header className={`p-2 d-flex justify-content-between align-items-center border ${props.bg}`}>
                <div className="fs-4">
                    <span className="bi bi-signal me-2 text-black"></span>
                    <Link to="/" className=" text-decoration-none text-black"><span className="fw-bold">TaskFlow</span></Link>
                </div>
                <div className="">
                    <button className="btn">Features</button>
                    <button className="btn mx-5">Pricing</button>
                    <button className="btn">About</button>
                </div>
                <div className={`${props.visible} d-flex align-items-center ${props.width}`}>
                    <div className={`${props.search} w-50`}>
                        <div className="m-1 border border-secondary-subtle rounded rounded-3">
                            <input type="text"  className="form-control bg-transparent" onChange={getSearch} placeholder="Search tasks..." style={{border:'none'}}/>
                        </div>
                    </div>
                    <Link to={`/${props.link}`} className=""><button className={`btn ${props.btnClass}`} onClick={handleSignOut} value={props.btnTxt}><span className={`${props.exit}`}></span>{props.btnTxt}</button></Link>
                </div>
            </header>
        </div>
    )

}
export default TodoHeader