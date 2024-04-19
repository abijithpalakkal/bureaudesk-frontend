import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { BsArrowRight } from 'react-icons/bs';
import fetchData from '../../utils/fetchdata';
import { DispatchProp } from 'react-redux';
import { toast } from 'react-toastify';

interface iprop{
    id?:string
    refresh?:boolean
    setrefresh?:any
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({id,refresh,setrefresh}:iprop) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleaction = async () => {
    const response=await fetchData(`/company/deleteteam/${id}`)
    if(response.data){
        console.log(refresh,setrefresh)
        console.log("yappie")
        setrefresh(!refresh)
        setOpen(false);
       
    }else{
        toast.error("failed to disperse team")
    }
   
  };




  return (
    <React.Fragment>
       <p className='text-red-700 flex justify-between items-center gap-1 font-bold cursor-pointer hover:text-red-400 duration-200' onClick={handleClickOpen}><span>disperse team</span> <span><BsArrowRight/></span></p>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Disperse team?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this group
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='bg-red-700'>cancel</Button>
          <Button onClick={handleaction}>yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}