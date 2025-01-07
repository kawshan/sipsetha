window.addEventListener('load', function () {


    studentPayments = ajaxGetRequest("/payment/findall");


    paymentcategories = ajaxGetRequest("/paymentcategory/findall")
    fillDataIntoSelect(selectPaymentCategory, 'select payment category', paymentcategories, 'name');

    payTypes = ajaxGetRequest("/paytype/findall");
    fillDataIntoSelect(selectPayType, 'select pay type', payTypes, 'name');

    //call refresh payment table
    refreshPaymentTable();
});

const refreshPaymentTable = () => {




    const displayProperty = [
        {dataType: 'text', propertyName: 'fees'},
        {dataType: 'function', propertyName: getmonth},
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getPayType},
        {dataType: 'function', propertyName: getStudentname}
    ];

    fillDataIntoPaymentTable(tableStudentPayment, studentPayments, displayProperty, false);


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


//define function for student payment refill
const refillPaymentForm = (ob, rowIndex) => {

}


//define function for button form update
const buttonFormUpdate = () => {

}

//define function for delete payment
const deletePaymentButton = (ob, rowIndex) => {


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
const generateReportsFromMonth = ()=>{
    //reportdatapayment?month=2024-07
    studentPayments=ajaxGetRequest("reportdatapayment?month="+textReportMonth.value);
    refreshPaymentTable();
}

const generateReportsByPayCatANDType = ()=>{

    //reportdatapayment?paytype=1&paymentcategory=1
    studentPayments=ajaxGetRequest("/reportdatapayment?paytype="+JSON.parse(selectPayType.value).id+"&paymentcategory="+JSON.parse(selectPaymentCategory.value).id);
    refreshPaymentTable();

}


const generateReportsByPaymentCategory = ()=>{
    //reportdatapayment?paymentcategory=1
    studentPayments=ajaxGetRequest("/reportdatapayment?paymentcategory="+JSON.parse(selectPaymentCategory.value).id);
    refreshPaymentTable();
}

const generateReportsByPaymentType = ()=>{
    // reportdatapayment?paytype=1
    studentPayments=ajaxGetRequest("/reportdatapayment?paytype="+JSON.parse(selectPayType.value).id);
    refreshPaymentTable();
}


const generateReportByDate=()=>{
    let paymentDate = textPaymentDate.value;
    console.log(paymentDate+" "+typeof (paymentDate));
    studentPayments=ajaxGetRequest("/reportdatapayment/"+paymentDate);
    refreshPaymentTable();
}




const printPaymentFullTable = () => {
    $("#printPaymentModel").modal('show');



    const displayProperty = [
        {dataType: 'text', propertyName: 'fees'},
        {dataType: 'function', propertyName: getmonth},
        {dataType: 'text', propertyName: 'billnumber'},
        {dataType: 'function', propertyName: getPayType},
        {dataType: 'function', propertyName: getStudentname}
    ];

    fillDataIntoPaymentTable(printPaymentTable, studentPayments, displayProperty, false);

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















