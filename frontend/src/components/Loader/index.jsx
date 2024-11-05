import { Spinner } from "@material-tailwind/react";

function Loader() {
    return(
        <div className="w-screen h-screen justify-center items-center flex">
            <Spinner/>
        </div>
    )
}

export default Loader