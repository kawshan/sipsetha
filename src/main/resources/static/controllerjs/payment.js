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
        {dataType:'text',propertyName:'month'},
        {dataType:'text',propertyName:'billnumber'},
        {dataType:'text',propertyName:'referencenumber'},
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

// const getmonth = (rowOb)=>{
//     return rowOb.month.substring(5,7);
//
// }




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


}