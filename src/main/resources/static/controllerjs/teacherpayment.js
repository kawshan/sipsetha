window.addEventListener('load', () => {

    userPrivilege = ajaxGetRequest("/privilege/byloggeduser/teacherpayment");

    refreshTeacherPaymentForm();

    refreshTeacherPaymentTable();
});


//define function for refresh teacher payment table
const refreshTeacherPaymentTable = () => {

    teacherPayments = ajaxGetRequest("/teacherpayment/findall")
    displayProperty = [
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getTotalEnrolmentAmount},
        {dataType: 'function', propertyName: getTotalPaymentAmount},
        {dataType: 'function', propertyName: getTotalBalanceAmount},
        {dataType: 'text', propertyName: 'bankname'},
        {dataType: 'text', propertyName: 'branchname'},
        {dataType: 'text', propertyName: 'accountholdername'},
        {dataType: 'text', propertyName: 'accountnumber'},
        {dataType: 'text', propertyName: 'referencenumber'},

    ]
    fillDataIntoPaymentTable(tableTeacherPayment, teacherPayments, displayProperty, true)
    $('#tableEnrolment').dataTable();

}

const getTotalEnrolmentAmount = (ob) => {
    return parseFloat(ob.totalenrolmentamount).toFixed(2);
}

const getTotalPaymentAmount = (ob) => {
    return parseFloat(ob.totalpaymentamount).toFixed(2);
}

const getTotalBalanceAmount = (ob) => {
    return parseFloat(ob.totalbalanceamount).toFixed(2);
}


//define function for refresh payment form
const refreshTeacherPaymentForm = () => {
    formTeacherPayment.reset();
    teacherpayment = new Object();
    oldteacherpayment = null;
    teacherpayment.teacherPaymentHasEnrolment = new Array();


    textTotalEnrolmentAmount.value = "";
    textTotalPaymentAmount.value = "";
    textTotalBalanceAmount.value = "";
    textBankName.value = "";
    textBranchName.value = "";
    textAccountHolderName.value = "";
    textAccountNumber.value = "";


    textTotalEnrolmentAmount.style.border = "2px solid #ced4da";
    textTotalPaymentAmount.style.border = "2px solid #ced4da";
    textTotalBalanceAmount.style.border = "2px solid #ced4da";
    textBankName.style.border = "2px solid #ced4da";
    textBranchName.style.border = "2px solid #ced4da";
    textAccountHolderName.style.border = "2px solid #ced4da";
    textAccountNumber.style.border = "2px solid #ced4da";

    console.log(userPrivilege);

    btnUpdateTeacherPayment.disabled = true;
    $("#btnUpdateTeacherPayment").css("cursor", "not-allowed");

    if (userPrivilege.insert) {
        btnAddTeacherPayment.disabled = "";
        $("#btnAddTeacherPayment").css("cursor", "pointer");
    } else {
        btnAddTeacherPayment.disabled = true;
        $("#btnAddTeacherPayment").css("cursor", "not-allowed");
    }
    refreshInnerFormAndTable()
}
//define refresh inner form and table
const refreshInnerFormAndTable = () => {
    tchPayHsEnrlmt = new Object();
    oldtchPayHsEnrlmt = null;

    enrolments = ajaxGetRequest("/enrolment/findall")
    fillDataIntoSelect(selectEnrolment, 'select enrolment', enrolments, 'enrolmentnum')


    textPayedAmount.value = "";
    textBalanceAmount.value = "";


    textPayedAmount.style.border = "2px solid #ced4da";
    textBalanceAmount.style.border = "2px solid #ced4da";

    let displayProperty = [
        {dataType: 'function', propertyName: getEnrolment},
        {dataType: 'text', propertyName: 'payedamount'},
        {dataType: 'text', propertyName: 'payedamount'}
    ];


    fillDataIntoTableInnerTable(teacherPaymentHasEnrolmentInnerTable, teacherpayment.teacherPaymentHasEnrolment, displayProperty, refillInnerForm, deleteInnerRow);

}

const getEnrolment = (ob)=>{
    return ob.enrolment_id.enrolmentnum;
}



const refillInnerForm = (ob, rowIndex) => {
    enrolments = ajaxGetRequest("/enrolment/findall")
    fillDataIntoSelect(selectEnrolment, 'select enrolment', enrolments, 'enrolmentnum', ob.enrolmentnum);

    textPayedAmount.value =ob.payedamount
    textBalanceAmount.value =ob.balanceamount

}


const deleteInnerRow = (ob,index) => {//need to do this
let userConfirm=confirm('are you sure to remove')
    if (userConfirm){
        let extIndex=teacherpayment.teacherPaymentHasEnrolment.map(enrl=>enrl.enrolment_id).indexOf(ob.enrolment_id);
        if (extIndex!=-1){
            teacherpayment.teacherPaymentHasEnrolment.splice(extIndex,1);
            alert("item removed successfully");
            refreshInnerFormAndTable()
        }
    }
}
const checkInnerFormErrors = ()=>{
    let errors="";

    if (tchPayHsEnrlmt.enrolment_id==null){
        errors=errors+"select enrolment \n";
    }

    return errors;
}

const buttonInnerAdd = ()=>{
    console.log("add inner form");
    let errors = checkInnerFormErrors();
    if (errors==""){
        let userConfirm=confirm("are you sure to add following \n"
            +"\n enrolment is "+tchPayHsEnrlmt.enrolment_id.enrolmentnum
            +"payed amount is "+tchPayHsEnrlmt.payedamount
            +"balance amount"+tchPayHsEnrlmt.balanceamount
        );
        if (userConfirm){
            teacherpayment.teacherPaymentHasEnrolment.push(tchPayHsEnrlmt);
            alert("enrolment added successfully");
            refreshInnerFormAndTable();
        }
    }else {
        alert("form has errors"+errors)
    }
}


















