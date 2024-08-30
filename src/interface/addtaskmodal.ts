import  { Dispatch, SetStateAction} from 'react'


export  interface IProp {
    display: Dispatch<SetStateAction<boolean>>
    empid?: string
    dptid?: string
}
