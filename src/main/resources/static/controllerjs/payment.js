window.addEventListener('load',function (){
    //refresh payment form
    refreshPaymentForm()

    //call refresh payment table
    refreshPaymentTable();
})

const refreshPaymentForm = ()=>{
    studentPaymentForm.reset();
    payment = new Object();
}