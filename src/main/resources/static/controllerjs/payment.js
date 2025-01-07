window.addEventListener('load',function (){
    //refresh payment form
    refreshPaymentForm()

    //call refresh payment table
    refreshPaymentTable();
});

const refreshPaymentTable = ()=>{

    studentPayments=ajaxGetRequest("/payment/findall");


    const displayProperty=[
        {dataType:'text',propertyName:'fees'},
        {dataType:'function',propertyName:getmonth},
        {dataType:'text',propertyName:'billnumber'},
        {dataType:'function',propertyName:getPayType},
        {dataType:'function',propertyName:getStudentname}
    ];

    fillDataIntoTable(tableStudentPayment,studentPayments,displayProperty,true);


}

const getPayType = (rowOb)=>{
    return rowOb.paytype_id.name;
}
const getStudentname = (rowOb)=>{
    return rowOb.student_id.firstname;
}

const getmonth = (rowOb)=>{
    return "<p>"+rowOb.month+"</p>";

}




const refreshPaymentForm = ()=>{
    studentPaymentForm.reset();
    payment = new Object();


    payTypes = ajaxGetRequest("/paytype/findall");
    fillDataIntoSelect(selectPayType,'select pay type',payTypes,'name');

    students = ajaxGetRequest("/student/findall");
    fillDataIntoSelect(selectStudent,'select student',students,'firstname');

    textFee.style.border="2px solid #ced4da";
    textMonth.style.border="2px solid #ced4da";
    textPayedAmount.style.border="2px solid #ced4da";
    textBalanceAmount.style.border="2px solid #ced4da";
    textReferenceNumber.style.border="2px solid #ced4da";
    textCardNumber.style.border="2px solid #ced4da";
    selectPayType.style.border="2px solid #ced4da";
    selectStudent.style.border="2px solid #ced4da";


}

//define function for check errors
const checkErrors = ()=>{
    let errors = "";

    if (payment.fees == null){
        errors= errors +"fees cannot be empty \n";
    }
    if (payment.month == null){
        errors+"month cannot be empty \n";
    }
    if (payment.payedamount == null){
        errors+"payed amount cannot be empty \n";
    }
    if (payment.balanceamount == null){
        errors=errors+"balance amount cannot be empty \n";
    }
    if (payment.paytype_id == null){
        errors=errors+"paytype cannot be empty \n";
    }
    if (payment.student_id == null){
        errors=errors+"studnet cannot be empty \n";
    }


    return errors;
}


const btnStudentRegistrationSubmit = ()=>{
    let errors = checkErrors();
    if (errors == ""){
        let userConfirm =confirm("Are you sure to add this following student registration \n"
        +"\n fees is "+payment.fees
        +"\n month is"+payment.month
        +"\n payed amount is "+payment.payedamount
        +"\n balance amount is "+payment.balanceamount
        +"\n paytype is "+payment.paytype_id
        +"\n student is "+payment.student_id
        );
        if (userConfirm){
            let postServerResponse = ajaxPostRequest("/payment",payment)
            if (postServerResponse=="ok"){
                alert("save successful "+postServerResponse);
                $('#modalStudentPayment').modal('hide');
                refreshPaymentForm();
                refreshPaymentTable();
            }else {
                alert("save not complete you might have some errors \n "+postServerResponse);
            }
        }
    }
}










































