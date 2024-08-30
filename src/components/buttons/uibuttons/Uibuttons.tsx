import "./uibtn.css"
import { Ibtn } from "@/interface/uibuttons"



function Uibuttons({btnname}:Ibtn) {
    return (
        <button className="animated-button">
        
                <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
            
            <div className="text text-sm flex justify-center items-center w-32"><div className='w-full'>{btnname}</div></div>
            <span className="circle"></span>
        
                <path
                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
            
        </button>
    )
}

export default Uibuttons
