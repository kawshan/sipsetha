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
    $('#tableStudentPayment').dataTable();


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

    paymentcategories = ajaxGetRequest("/paymentcategory/findall")
    fillDataIntoSelect(selectPaymentCategory, 'select payment category', paymentcategories, 'name');

    studentRegistrations = ajaxGetRequest("/studentregistration/findall")
    fillDataIntoSelect(selectStudentRegistration, 'select student registrations', studentRegistrations, 'indexnumber');


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
    textFee.disabled = true;
    textBalanceAmount.disabled = true

//call get current month function
    getCurrentMonth();

}


//define function for get current month
const getCurrentMonth = () => {
    //start of get current month and yar
    let currentDate = new Date();

    let currentMonth = currentDate.getMonth() + 1;//adding one to get correct month // bcz get month returns 0-11 values 0-> jan 11->dec
    if (currentMonth < 10) {
        currentMonth = "0" + currentMonth;
    }
    let currentMonthAndYearValue = currentDate.getFullYear() + "-" + currentMonth;
    console.log(currentMonthAndYearValue)
    textMonth.value = currentMonthAndYearValue;
    payment.month = textMonth.value;
    textMonth.style.border = "2px solid green";


    //end of get current month and year
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

    fillDataIntoSelect(studentregistration_id, 'select student registration', studentRegistrations, 'indexnumber', ob.studentregistration_id.indexnumber);


    fillDataIntoSelect(selectPaymentCategory, 'select payment category', paymentcategories, 'name', ob.paymentcategory_id.name)

}


//define function for check errors
const checkErrors = () => {
    let errors = "";


    if (payment.paymentcategory_id == null) {
        errors = errors + "payment category cannot be empty \n";
    }

    if (payment.fees == null) {
        errors = errors + "fees cannot be empty \n";
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

    if (payment.paymentcategory_id.name != payment.paymentcategory_id.name) {
        errors = errors + "payment is changed \n";
    }

    if (payment.fees != oldPayment.fees) {
        updates = updates + "fees is updated \n";
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
        updates = updates + "student is updated \n"
    }


    return updates;
}


const btnStudentPaymentSubmit = () => {
    let errors = checkErrors();
    if (errors == "") {
        let userConfirm = confirm("Are you sure to add this following student registration \n"
            + "\n payment category is " + payment.paymentcategory_id.name
            + "\n paytype is " + payment.paytype_id.name
            + "\n student is " + payment.student_id.firstname
            + "\n fees is " + payment.fees
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

                setTimeout(function () {
                    clickRadioButton(); //mili seconds 500 parakku kara ee mokada hariyata refresh payment table eka load vela enna one nisa
                }, 500)
                printBTNPayment.className = 'd-none';
            } else {
                alert("save not complete you might have some errors \n " + postServerResponse);
            }
        }
    } else {
        alert("you have following errors \n" + errors);
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

    let addedUser = ajaxGetRequest("/user/byid/" + ob.addeduser);

    tdAddedUser.innerHTML = addedUser.username
    tdStudentName.innerHTML = ob.student_id.firstname + " " + ob.student_id.lastname
    tdPaymentCategory.innerHTML = ob.paymentcategory_id.name

    if (ob.paymentcategory_id.name == "admission") {
        trRegisteredClass.classList.add('d-none');
    } else {
        tdClassName.innerHTML = ob.studentregistration_id.classoffering_id.classname
    }


    tdPaymentType.innerHTML = ob.paytype_id.name
    tdPayedAmount.innerHTML = ob.payedamount
    tdBalanceAmount.innerHTML = ob.balanceamount

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>" + tableBillPrint.outerHTML + "</body> " +
        "    <script>tableBillPrint.classList.remove('d-none')</script>"
    );

    setTimeout(function () { //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa ee tab eka
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
const generateFees = (fieldId) => {

    let paymentCategory = JSON.parse(selectPaymentCategory.value);    //
    console.log(paymentCategory.name);

    let selectedStu = textStudent.value.split(" ");
    let stunum = selectedStu[0];
    console.log(stunum);

    let selectedStuReg = JSON.parse(selectStudentRegistration.value);
    let regID = selectedStuReg.id;
    console.log(regID)


    if (paymentCategory.name == "monthly") {//payment category eka balanna one monthly da kiyala
        // monthly nam

        //free card da nadda balanna one
        let serverResponse = ajaxGetRequest("/studentregistration/getsturegfromstuidandregstatus/" + stunum + "/" + regID); //free card da nadda balana ajax get request eka meken response ekek thiyenawanam true enawa naththam false enawa
        if (serverResponse) {
            //free card

            //payment type eke karanna thiyena ewa
            console.log("free card");
            payTypes = ajaxGetRequest("/paytype/findall");  //ajax req ekak gahala values tika gennna gannwa
            fillDataIntoSelect(selectPayType, 'select pay type', payTypes, 'name','cash');//eka select field ekata set karanawa display property eka cash denawa
            payment.paytype_id=JSON.parse(selectPayType.value); //object ekata bind karanawa
            selectPayType.style.border="2px solid green";   //border eka kola paata karanawa

            //fees kiyana field eke karanna thiyena dewal tika
            textFee.value="0.00";   //fee eke value eka zero karanwa
            payment.fees=textFee.value; //payment eke fees ekata bind karanwa
            textFee.style.border="2px solid green"; //colour eka green karanwa

            //payed amount eke karanna thiyena dewal
            textPayedAmount.value="0.00";
            payment.payedamount=textPayedAmount.value;
            textPayedAmount.style.border="2px solid green";


            // balance amount eke karanna thiyena dewal
            textBalanceAmount.value="0.00";
            payment.balanceamount=textBalanceAmount.value;
            textBalanceAmount.style.border="2px solid green";


        } else {
            //not free card
            console.log("normal card");
            console.log(fieldId.value); //log ekek daagannawa field id eke value eka
            selectedValue = JSON.parse(fieldId.value);//iita passe json parse karagannawa eekta hethuva convert json string into JS object
            console.log(selectedValue.classoffering_id.fees + " class offering fee")    //class offering eken ena fees eka log ekek daa gannawa
            // console.log(selectedValue.fee+"fee")  //log ekak dagannawa selected value eke fee eka balanna
            feeFromSelectedValue = selectedValue.classoffering_id.fees; //selected value eken fee eka aragen eka varibale ekakata assign kara gannawa
            textFee.value = parseFloat(feeFromSelectedValue).toFixed(2);// iita passe text fee kiyana id eke value ekat assign kara gannawa parse flote karala iita passe to fixed karala dahsma thithi dekak thiya gannawa
            payment.fees = textFee.value; //payment object eke fee ekata textfee kiyana id eka thiyena input field ekan value eka aran assign kara gannawa // in other words bind karagannawa object ekata
            textFee.style.border = "2px solid green";
        }


    } else {//else nam ee kiyanne admission nam

    }


}

//define function for generate balance amount
const generateBalanceAmount = (fieldId) => {
    if (new RegExp("^[1-9][0-9]{3,6}[.][0][0]$").test(fieldId.value)) {//field id eken value eka aran eka regex pattern eken test karanawa eka true nam
        console.log("ok");
        let payedAmount = parseFloat(fieldId.value).toFixed(2);  //payed amount ekata field id eke value eka gaththa
        let feeAmount = parseFloat(textFee.value).toFixed(2);
        let balanceAmount = payedAmount - feeAmount;
        console.log(balanceAmount);

        console.log(typeof (balanceAmount)) //testing vidihata type eka verify kara gaththa string da number da kiyala
        if (balanceAmount < '0') {
            console.log("not good value");
            payment.balanceamount = null;
            textBalanceAmount.style.border = "2px solid red";
        } else {
            console.log("good value");
            textBalanceAmount.value = parseFloat(balanceAmount).toFixed(2);
            payment.balanceamount = textBalanceAmount.value;
            textBalanceAmount.style.border = "2px solid green";
        }

    }
}


const disableReferenceANcardNum = (fieldId) => {
    let selectedValue = JSON.parse(fieldId.value);    //json string ekak JS object ekak bawata convert karanawa
    console.log(selectedValue.name);
    if (selectedValue.name == "card") {
        textReferenceNumber.disabled = false;
        textCardNumber.disabled = false;
        textPayedAmount.value = parseFloat(textFee.value).toFixed(2);
        payment.payedamount = JSON.parse(textPayedAmount.value);
        textPayedAmount.style.border = "2px solid green";


        textBalanceAmount.value = "0.00"
        payment.balanceamount = textBalanceAmount.value;
        textBalanceAmount.style.border = "2px solid green";
    } else if (selectedValue.name == "cash") {

        textPayedAmount.value = ""
        textPayedAmount.style.border = "2px solid #ced4da";

        textBalanceAmount.value = "";
        textBalanceAmount.style.border = "2px solid #ced4da"

        textReferenceNumber.disabled = true;
        textCardNumber.disabled = true;
    }


}
//define function for generate student registration number from student
const generateStudentRegistration = (fieldID) => {//parameter ekak vidihata field id eka gannwa eka enne html eke this eken pass karala
    console.log(fieldID.value);
    let selectedValue = fieldID.value.split(" ");
    let indexNumber = selectedValue[0];
    console.log(indexNumber);
    let studentRegistrationsbystudent = ajaxGetRequest("/studentregistration/" + indexNumber); //student registration eken index number eka genna gannawa
    fillDataIntoSelectNew(selectStudentRegistration, 'select student registrations', studentRegistrationsbystudent, 'classoffering_id', 'classname', '');


}

//define function for generate payment category for student
const getPaymentCategory = (fieldId) => {
    console.log(fieldId.value);
    let selectedValue = fieldId.value.split(" ");
    let indexNumber = selectedValue[0];
    console.log(indexNumber);
    let paymentAmountByStudent = ajaxGetRequest("/payment/payedamountbystudent/" + indexNumber);
    console.log(paymentAmountByStudent + " payment amount")
    if (paymentAmountByStudent != true) {  //me kiyanne mukuth payment ekak naththam
        console.log("empty")
        selectStudentRegistration.disabled = true;
        fillDataIntoSelect(selectPaymentCategory, 'select payment category', paymentcategories, 'name', 'admission');
        let selectedValue = JSON.parse(selectPaymentCategory.value);
        payment.paymentcategory_id = selectedValue    //json parse eken karanne JSON string ekek js object ekata pass karana eka
        selectPaymentCategory.style.border = "2px solid green";

        textFee.value = parseFloat(selectedValue.addmissionfee).toFixed(2);
        textFee.style.border = "2px solid green";
        payment.fees = textFee.value;

        generateBalanceAmount(textPayedAmount); //call function for generate balance amount

        textMonth.value = "";
        payment.month = "";
        textMonth.style.border = "2px solid #ced4da";
        textMonth.disabled = true;


    } else {
        console.log("not empty");
        selectStudentRegistration.disabled = false;
        fillDataIntoSelect(selectPaymentCategory, 'select payment category', paymentcategories, 'name', 'monthly');

        payment.paymentcategory_id = JSON.parse(selectPaymentCategory.value);
        selectPaymentCategory.style.border = "2px solid green";

        textMonth.disabled = false;
        getCurrentMonth();

    }
}


const clickRadioButton = () => {
    tableStudentPayment.children[1].children[0].children[6].children[0].click();    //table eke check box eka eka auto click venna hadanawa
    printBTNPayment.click();    //print button eka click karanwa;
}

const generateMaxMonth = () => {
    let student = textStudent.value.split(" ");//split eken ven karanawa space eken iita passe apita hambenne array ekak
    let stuNumber = student[0];//ee array eke 0 veni index eka gannawa
    console.log(stuNumber)//for testing;

    let selectedValueStuReg = JSON.parse(selectStudentRegistration.value)//json string ekak JS object ekakata convert karagannawa
    console.log(selectedValueStuReg.id + " type of " + typeof (selectedValueStuReg.id))//testing

    console.log(textStudent.value);

    let serverResponse = ajaxGetRequest("/payment/getmaxmonthpayment/" + stuNumber + "/" + selectedValueStuReg.id);
    console.log(serverResponse);

    let maxMonth = serverResponse;

    let currentMonth = new Date().getMonth();
    if (currentMonth < 9) {
        currentMonth = '0' + (currentMonth + 1)
    } else {
        currentMonth = currentMonth + 1;
    }
    console.log(currentMonth + " current month");

    let MMVal = maxMonth.split('-');  //server ekan enne 2024-05 wage format ekekin ena value ekak ekayi meka split kare MM type ekata haro ganna one niss
    if (maxMonth == "") {  //max valu eka empty ekak da kiyala balanawa ee mokada kiyanne meeta kalin student payemnet ekak karala na kiyan eka
        console.log("first monthly payment")
        divMonthText.innerText = "Student's first monthly payment ";
        divMonthText.style.color = "green";
        divMonthText.className = "d-block"
        divMonthText.classList.add("d-block", "text-center", "fw-bold");
    } else {
        if (MMVal[1] < currentMonth) {
            console.log("student last payed month was " + maxMonth);
            divMonthText.innerText = "student last payed month was " + maxMonth;
            divMonthText.style.color = "orange";
            divMonthText.className = "d-block"
            divMonthText.classList.add("d-block", "text-center", "fw-bold");
        }
    }


}






