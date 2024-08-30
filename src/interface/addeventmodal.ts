import { SetStateAction, Dispatch } from 'react';


export interface IProp {
    closemodal: Dispatch<SetStateAction<boolean>>;
    refresh:any
    val:Boolean
}