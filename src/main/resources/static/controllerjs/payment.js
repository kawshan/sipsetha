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
//define function for student payment refill
const refillPaymentForm = (ob,rowIndex)=>{
    payment=JSON.parse(JSON.stringify(ob));
    oldPayment=JSON.parse(JSON.stringify(ob));

    console.log("refill "+ob+" "+rowIndex);
    $('#modalStudentPayment').modal('show');

    textFee.value = payment.fees
    textMonth.value = payment.month
    textPayedAmount.value = payment.payedamount
    textBalanceAmount.value = payment.balanceamount

    if (payment.referencenumber != null){
        textReferenceNumber.value = payment.referencenumber
    }else {
        textReferenceNumber.value="";
    }

    if (payment.cardno != null){
        textCardNumber.value = payment.cardno
    }else {
        textCardNumber.value = "";
    }


    payTypes = ajaxGetRequest("/paytype/findall");
    fillDataIntoSelect(selectPayType,'select pay type',payTypes,'name',payment.paytype_id.name);

    students = ajaxGetRequest("/student/findall");
    fillDataIntoSelect(selectStudent,'select student',students,'firstname',payment.student_id.firstname);



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


//define function for check updates
const checkUpdates = ()=>{
    let updates = "";

    if (payment.fees != oldPayment.fees){
        updates=updates+"fees is updated \n";
    }
    if (payment.month != oldPayment.month){
        updates=updates+"payment is updated \n"
    }
    if (payment.payedamount != oldPayment.payedamount){
        updates=updates+"payed amount is updated \n";
    }
    if (payment.balanceamount != oldPayment.balanceamount){
        updates=updates+"balance amount is updated \n"
    }
    if (payment.referencenumber != oldPayment.referencenumber){
        updates=updates+"reference number is updated \n";
    }
    if (payment.cardno != oldPayment.cardno){
        updates=updates+"card no is updated \n"
    }
    if (payment.paytype_id.name != oldPayment.paytype_id.name){
        updates=updates+"paytype is updated \n"
    }
    if (payment.student_id.firstname != oldPayment.student_id.firstname){
        updates=updates+"studnet is updated \n"
    }


    return updates;
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

//define function for button form update
const buttonFormUpdate = ()=>{
    console.log("update called");
    let errors = checkErrors();
    if (errors==""){
        let updates = checkUpdates();
        if (updates==""){
            alert("nothing to update");
        }else {
            let userConfirm=confirm("are you sure to add following updates \n"+updates);

            if (userConfirm){
                let putServerResponse = ajaxPutRequest("/payment",payment);
                if (putServerResponse=="ok"){
                    alert("modify is successful \n"+putServerResponse);
                    $('#modalStudentPayment').modal('hide');
                    refreshPaymentForm();
                    refreshPaymentTable();
                }else {
                    alert("modify was not successful \n"+putServerResponse);
                }
            }
        }
    }
}

//define function for delete payment
const deletePaymentButton = (ob,rowIndex)=>{
    console.log("delete "+ob+" "+rowIndex)
    tableStudentPayment.children[1].children[rowIndex].style.backgroundColor="orange";
    setTimeout(function (){
        userConfirm =confirm("are you sure to delete following payment \n"
            +"fees is \n"+ob.fees
            +"month is \n"+ob.month
            +"payed amount is \n"+ob.payedamount
            +"balance amount is \n"+ob.balanceamount
            +"reference number is \n"+ob.referencenumber
            +"card number is \n"+ob.cardno
            +"pay type is \n"+ob.paytype_id.name
            +"student is \n"+ob.student_id.firstname
        );
        if (userConfirm){
            let deleteServerResponse = ajaxDeleteRequest("/payment",ob);
            if (deleteServerResponse=="ok"){
                alert("delete successful \n"+deleteServerResponse)
                refreshPaymentTable();
            }else {
                alert("delete unsuccessful \n"+deleteServerResponse);
                refreshPaymentTable();
            }
        }
    },500)

}







































