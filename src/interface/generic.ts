import { Dispatch, SetStateAction} from 'react'


 export interface createcompanymodalProps {
    modalstatus: Dispatch<SetStateAction<boolean>>;
};

export interface createteammodalEmployee {
    _id: string;
    Name: string;
    email: string;
    position: string;
  }
  
  export interface createteammodalProps {
    id: string;
    modal:any
  }

  export interface editeventmodalIProp {
    closemodal: Dispatch<SetStateAction<boolean>>;
    id?:string
    refresh?:any
    val?:Boolean
}

export interface editprofilemodalProps {
    modal: Dispatch<SetStateAction<any>>;
}

export interface edittaskmodalIProp {
    displayModal?:boolean
    setDisplayModal: Dispatch<SetStateAction<boolean>>
    taskInfo:any
}

export interface eventclosemodaliCloseProp{
    closemodal:any
    refresh:any
    val:any
    id:string
}
export interface muiconfirmationmodaliprop{
    id?:string
    refresh?:boolean
    setrefresh?:any
}
export interface muiconfirmationmodalforprojectsiprop {
    id?: string
    refresh?: boolean
    setrefresh?: any
    confetti:any
}
export interface tasksubmitmodalIProp {
    display: boolean
    setdisplayModal: any
    id?:string
    handleSelect?:any
    deadline?:any
    index?:any
}
