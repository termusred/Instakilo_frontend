import { GrLike } from "react-icons/gr";
import { LiaReplySolid } from "react-icons/lia";


const Comment = ({data}) =>{
    return(
        <div className="flex flex-col gap-4">
            {data.map((el)=>{
                return (
                    <div key={el._id} className="p-4 bg-blue-gray-100 flex justify-between">
                        <h3 className="">{el.content}</h3>
                        <div className="flex gap-2 items-center w-1/4">
                            Likes:
                            <h4>{el.likes}</h4>
                            <button><GrLike/></button>
                            Replys : 
                            <h4>{el.replysCount}</h4>
                            <button><LiaReplySolid/></button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}   

export default Comment