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
import updateData from '@/utils/updatedata';


interface iprop {
    id?: string
    refresh?: boolean
    setrefresh?: any
    confetti:any
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Muiconfirmationmodalforproject = ({ id, refresh, setrefresh,confetti}: iprop) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleaction = async () => {
        try {
            const { data } = await updateData(`/company/updateprojects/${id}`, {
                completed: true
            })
            if (data) {
                confetti(true)
                setrefresh(!refresh)
                setOpen(false);
            }

        } catch (e: any) {
            toast(e.message)
        }
    };


    return (
        <React.Fragment>
            <p className='font-medium p-2 bg-green-500 rounded-xl hover:bg-green-400 cursor-pointer' onClick={handleClickOpen}>Declare As completed</p>
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
                        Are you sure you want to declare this project as completed
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

export default Muiconfirmationmodalforproject
