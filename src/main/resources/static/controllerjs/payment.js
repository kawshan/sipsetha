window.addEventListener('load', function () {

    userPrivilege = ajaxGetRequest("/privilege/byloggeduser/studentpayment")


    //refresh payment form
    refreshPaymentForm()

    //call refresh payment table
    refreshPaymentTable();
});

const refreshPaymentTable = () => {

    studentPayments = ajaxGetRequest("/payment/findall");


    const displayProperty = [
        {dataType: 'text', propertyName: 'fees'},
        {dataType: 'function', propertyName: getmonth},
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getPayType},
        {dataType: 'function', propertyName: getStudentname}
    ];

    fillDataIntoPaymentTable(tableStudentPayment, studentPayments, displayProperty, true);


}


const getPayType = (rowOb) => {
    return rowOb.paytype_id.name;
}
const getStudentname = (rowOb) => {
    return rowOb.student_id.firstname;
}

const getmonth = (rowOb) => {
    return "<p>" + rowOb.month + "</p>";

}


const refreshPaymentForm = () => {
    studentPaymentForm.reset();
    payment = new Object();

    paymentcategories=ajaxGetRequest("/paymentcategory/findall")
    fillDataIntoSelect(selectPaymentCategory,'select payment category',paymentcategories,'name');

    studentRegistrations=ajaxGetRequest("/studentregistration/findall")
    fillDataIntoSelect(selectStudentRegistration,'select student registrations',studentRegistrations,'indexnumber');


    payTypes = ajaxGetRequest("/paytype/findall");
    fillDataIntoSelect(selectPayType, 'select pay type', payTypes, 'name');

    students = ajaxGetRequest("/student/findall");
    // fillDataIntoSelect(selectStudent,'select student',students,'firstname');
    fillDataIntoDataList(studentList, students, 'stunum', 'firstname')

    textFee.style.border = "2px solid #ced4da";
    textMonth.style.border = "2px solid #ced4da";
    textPayedAmount.style.border = "2px solid #ced4da";
    textBalanceAmount.style.border = "2px solid #ced4da";
    textReferenceNumber.style.border = "2px solid #ced4da";
    textCardNumber.style.border = "2px solid #ced4da";
    selectPayType.style.border = "2px solid #ced4da";
    textStudent.style.border = "2px solid #ced4da";

    btnStudentUpdate.className = 'd-none';

    if (!userPrivilege.insert) {
        btnStudentPayment.disabled = true;
        btnStudentPayment.style.cursor = 'not-allowed';
    }

    //the reason behind this disabaling is to generate fee and balance amount
    textFee.disabled=true;
    textBalanceAmount.disabled=true


    //start of get current month and yar
    let currentDate=new Date();

    let currentMonth=currentDate.getMonth()+1;//adding one to get correct month // bcz get month returns 0-11 values 0-> jan 11->dec
    if (currentMonth<10){
        currentMonth="0"+currentMonth;
    }
    let currentMonthAndYearValue=currentDate.getFullYear()+"-"+currentMonth;
    console.log(currentMonthAndYearValue)
    textMonth.value=currentMonthAndYearValue;
    payment.month=textMonth.value;
    textMonth.style.border="2px solid green";




    //end of get current month and yar


}
//define function for student payment refill
const refillPaymentForm = (ob, rowIndex) => {
    payment = JSON.parse(JSON.stringify(ob));
    oldPayment = JSON.parse(JSON.stringify(ob));

    console.log("refill " + ob + " " + rowIndex);
    $('#modalStudentPayment').modal('show');

    textFee.value = payment.fees
    textMonth.value = payment.month
    textPayedAmount.value = payment.payedamount
    textBalanceAmount.value = payment.balanceamount

    if (payment.referencenumber != null) {
        textReferenceNumber.value = payment.referencenumber
    } else {
        textReferenceNumber.value = "";
    }

    if (payment.cardno != null) {
        textCardNumber.value = payment.cardno
    } else {
        textCardNumber.value = "";
    }


    payTypes = ajaxGetRequest("/paytype/findall");
    fillDataIntoSelect(selectPayType, 'select pay type', payTypes, 'name', payment.paytype_id.name);

    textStudent.value = payment.student_id.stunum + " " + payment.student_id.firstname;
    console.log(JSON.stringify(textStudent.value));

    fillDataIntoSelect(studentregistration_id,'select student registration',studentRegistrations,'indexnumber',ob.studentregistration_id.indexnumber);


    fillDataIntoSelect(selectPaymentCategory,'select payment category',paymentcategories,'name',ob.paymentcategory_id.name)

}


//define function for check errors
const checkErrors = () => {
    let errors = "";

    if (payment.studentregistration_id== null) {
        errors = errors + "registration cannot be empty \n";
    }

    if (payment.paymentcategory_id== null) {
        errors = errors + "payment category cannot be empty \n";
    }

    if (payment.fees == null) {
        errors = errors + "fees cannot be empty \n";
    }
    if (payment.month == null) {
        errors + "month cannot be empty \n";
    }
    if (payment.payedamount == null) {
        errors + "payed amount cannot be empty \n";
    }
    if (payment.balanceamount == null) {
        errors = errors + "balance amount cannot be empty \n";
    }
    if (payment.paytype_id == null) {
        errors = errors + "paytype cannot be empty \n";
    }
    if (payment.student_id == null) {
        errors = errors + "studnet cannot be empty \n";
    }


    return errors;
}


//define function for check updates
const checkUpdates = () => {
    let updates = "";

    if (payment.studentregistration_id.indexnumber != payment.studentregistration_id.indexnumber) {
        errors = errors + "registration is changed \n";
    }

    if (payment.paymentcategory_id.name != payment.paymentcategory_id.name) {
        errors = errors + "payment is changed \n";
    }


    if (payment.fees != oldPayment.fees) {
        updates = updates + "fees is updated \n";
    }
    if (payment.month != oldPayment.month) {
        updates = updates + "payment is updated \n"
    }
    if (payment.payedamount != oldPayment.payedamount) {
        updates = updates + "payed amount is updated \n";
    }
    if (payment.balanceamount != oldPayment.balanceamount) {
        updates = updates + "balance amount is updated \n"
    }
    if (payment.referencenumber != oldPayment.referencenumber) {
        updates = updates + "reference number is updated \n";
    }
    if (payment.cardno != oldPayment.cardno) {
        updates = updates + "card no is updated \n"
    }
    if (payment.paytype_id.name != oldPayment.paytype_id.name) {
        updates = updates + "paytype is updated \n"
    }
    if (payment.student_id.firstname != oldPayment.student_id.firstname) {
        updates = updates + "studnet is updated \n"
    }


    return updates;
}


const btnStudentRegistrationSubmit = () => {
    let errors = checkErrors();
    if (errors == "") {
        let userConfirm = confirm("Are you sure to add this following student registration \n"
            + "\n student registration is " + payment.studentregistration_id.indexnumber
            + "\n payment category is " + payment.paymentcategory_id.name
            + "\n paytype is " + payment.paytype_id.name
            + "\n student is " + payment.student_id.firstname
            + "\n fees is " + payment.fees
            + "\n month is" + payment.month
            + "\n payed amount is " + payment.payedamount
            + "\n balance amount is " + payment.balanceamount
        );
        if (userConfirm) {
            let postServerResponse = ajaxPostRequest("/payment", payment)
            if (postServerResponse == "ok") {
                alert("save successful " + postServerResponse);
                $('#modalStudentPayment').modal('hide');
                refreshPaymentForm();
                refreshPaymentTable();
            } else {
                alert("save not complete you might have some errors \n " + postServerResponse);
            }
        }
    }
}

//define function for button form update
const buttonFormUpdate = () => {
    console.log("update called");
    let errors = checkErrors();
    if (errors == "") {
        let updates = checkUpdates();
        if (updates == "") {
            alert("nothing to update");
        } else {
            let userConfirm = confirm("are you sure to add following updates \n" + updates);

            if (userConfirm) {
                let putServerResponse = ajaxPutRequest("/payment", payment);
                if (putServerResponse == "ok") {
                    alert("modify is successful \n" + putServerResponse);
                    $('#modalStudentPayment').modal('hide');
                    refreshPaymentForm();
                    refreshPaymentTable();
                } else {
                    alert("modify was not successful \n" + putServerResponse);
                }
            }
        }
    }
}

//define function for delete payment
const deletePaymentButton = (ob, rowIndex) => {
    console.log("delete " + ob + " " + rowIndex)
    tableStudentPayment.children[1].children[rowIndex].style.backgroundColor = "orange";
    setTimeout(function () {
        userConfirm = confirm("are you sure to delete following payment \n"
            + "fees is \n" + ob.fees
            + "month is \n" + ob.month
            + "payed amount is \n" + ob.payedamount
            + "balance amount is \n" + ob.balanceamount
            + "reference number is \n" + ob.referencenumber
            + "card number is \n" + ob.cardno
            + "pay type is \n" + ob.paytype_id.name
            + "student is \n" + ob.student_id.firstname
            + "student registration is \n" + ob.studentregistration_id.indexnumber
            + "payment category is \n" + ob.paymentcategory_id.name
        );
        if (userConfirm) {
            let deleteServerResponse = ajaxDeleteRequest("/payment", ob);
            if (deleteServerResponse == "ok") {
                alert("delete successful \n" + deleteServerResponse)
                refreshPaymentTable();
            } else {
                alert("delete unsuccessful \n" + deleteServerResponse);
                refreshPaymentTable();
            }
        }
    }, 500)

}
//define function for print payment
const printPayment = (ob, rowIndex) => {
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let studentPayments = new Array(ob);


    const displayProperty = [
        {dataType: 'text', propertyName: 'fees'},
        {dataType: 'function', propertyName: getmonth},
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getPayType},
        {dataType: 'function', propertyName: getStudentname}
    ];

    fillDataIntoPaymentTable(printPaymentTable, studentPayments, displayProperty, false,);

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>" + printPaymentTable.outerHTML + "</body> "
    );
    setTimeout(function () { //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    }, 500)


}


const printPaymentFullTable = () => {
    $("#printPaymentModel").modal('show');

    studentPayments = ajaxGetRequest("/payment/findall");


    const displayProperty = [
        {dataType: 'text', propertyName: 'fees'},
        {dataType: 'function', propertyName: getmonth},
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getPayType},
        {dataType: 'function', propertyName: getStudentname}
    ];

    fillDataIntoPaymentTable(printPaymentTable, studentPayments, displayProperty, false,);

}


const modalPrintButton = () => {
    console.log("model print working");
    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>" + printPaymentTable.outerHTML + "</body> "
    );
    setTimeout(function () { //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    }, 500)


}


//define function for generate fee when selecting student registrations
const generateFees = (fieldId)=>{
    console.log(fieldId.value); //log ekek daagannawa field id eke value eka
    selectedValue=JSON.parse(fieldId.value);//iita passe json parse karagannawa eekta hethuva convert json string into JS object
    console.log(selectedValue.classoffering_id.fees+" class offering fee")
    // console.log(selectedValue.fee+"fee")  //log ekak dagannawa selected value eke fee eka balanna
    feeFromSelectedValue=selectedValue.classoffering_id.fees; //selected value eken fee eka aragen eka varibale ekakata assign kara gannawa
    textFee.value=parseFloat(feeFromSelectedValue).toFixed(2);// iita passe text fee kiyana id eke value ekat assign kara gannawa parse flote karala iita passe to fixed karala dahsma thithi dekak thiya gannawa
    payment.fees=textFee.value; //payment object eke fee ekata textfee kiyana id eka thiyena input field ekan value eka aran assign kara gannawa // in other words bind karagannawa object ekata
    textFee.style.border="2px solid green";

}

//define function for generate balance amount
const generateBalanceAmount = (fieldId)=>{
    if (new RegExp("^[1-9][0-9]{3,6}[.][0][0]$").test(fieldId.value)){//field id eken value eka aran eka regex pattern eken test karanawa eka true nam
        console.log("ok");
        let payedAmount=parseFloat(fieldId.value).toFixed(2);  //payed amount ekata field id eke value eka gaththa
        let feeAmount=parseFloat(textFee.value).toFixed(2);
        let balanceAmount=payedAmount-feeAmount;
        console.log(balanceAmount);

        console.log(typeof (balanceAmount)) //testing vidihata type eka verify kara gaththa string da number da kiyala
        if (balanceAmount<'0'){
            console.log("not good value");
            payment.balanceamount=null;
            textBalanceAmount.style.border="2px solid red";
        }else {
            console.log("good value");
            textBalanceAmount.value=parseFloat(balanceAmount).toFixed(2);
            payment.balanceamount=textBalanceAmount.value;
            textBalanceAmount.style.border="2px solid green";
        }

    }
}


const disableReferenceANcardNum = (fieldId)=>{
    let selectedValue=JSON.parse(fieldId.value);    //json string ekak JS object ekak bawata convert karanawa
    console.log(selectedValue.name);
    if (selectedValue.name=="card"){
        textReferenceNumber.disabled=false;
        textCardNumber.disabled=false;
    }else if (selectedValue.name=="cash"){
        textReferenceNumber.disabled=true;
        textCardNumber.disabled=true;
    }




}
//define function for generate student registration number from student
const generateStudentRegistration= (fieldID)=>{//parameter ekak vidihata field id eka gannwa eka enne html eke this eken pass karala
    console.log(fieldID.value);
    let selectedValue=fieldID.value.split(" ");
    let indexNumber=selectedValue[0];
    console.log(indexNumber);
    let studentRegistrationsbystudent=ajaxGetRequest("/studentregistration/"+indexNumber); //student registration eken index number eka genna gannawa
    fillDataIntoSelectNew(selectStudentRegistration,'select student registrations',studentRegistrationsbystudent,'classoffering_id','classname','');


}














