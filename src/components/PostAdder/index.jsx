import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


function Adder() {
    const navigate = useNavigate()
    return(
        <button className="w-20 h-20 bg-blue-gray-200 fixed z-50 bottom-10 right-10 rounded-3xl flex justify-center items-center" onClick={() => {navigate("/post-blog")}}>
            <FaPlus size={32}/>
        </button>
    )
}



export default Adder