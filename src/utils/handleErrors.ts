export const handleErrors=(error:any)=>{
    if (error.response && error.response.data) {
        const err = error.response.data;
        return { message: err.message };
    } else {
        return { message: error.message };
    }
}