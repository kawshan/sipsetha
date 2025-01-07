window.addEventListener('load', () => {


    grades = ajaxGetRequest("/grade/findall")
    fillDataIntoSelect(selectGrade, 'select grade', grades, 'name');


    students = ajaxGetRequest("/reportpresentstudent");

    refreshStudentTable();
});
//define function for refresh student table
const refreshStudentTable = () => {


    const displayProperty = [

        {dataType: 'text', propertyName: 'stunum'},
        {dataType: 'text', propertyName: 'firstname'},
        {dataType: 'text', propertyName: 'lastname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'function', propertyName: getStatus},

    ];

    fillDataIntoTable(tableReportStudent, students, displayProperty, checkPrivilege, false)

}

const checkPrivilege = (innerOb) => {
}


//define function for get student status
const getStatus = (ob) => {
    if (ob.status == true) {
        return '<p class="status-working">present</p>';
    } else {
        return '<p class="status-delete">delete</p>';
    }
}

//create function for student refill
const studentFormRefill = (ob, rowIndex) => {

}

// define function for get student gender
const getGender = (ob) => {
    if (ob.gender == true) {
        return '<p>male</p>';
    } else {
        return '<p>female</p>';
    }
}

//create function for student delete
const deleteStudent = (ob, rowIndex) => {

}

//create function for print student
const printStudent = (ob, rowIndex) => {
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let students = new Array(ob);

    let displayProperty = [

        {dataType: 'text', propertyName: 'stunum'},
        {dataType: 'text', propertyName: 'firstname'},
        {dataType: 'text', propertyName: 'lastname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'function', propertyName: getStatus},

    ];


    fillDataIntoTable(printStudentTable, students, displayProperty, "", false)


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>" + printStudentTable.outerHTML + "</body> "
    );
    setTimeout(function () { //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    }, 500)


}

const generateReportBYSelectValues = ()=>{
    console.log(selectStatus.value);
    //reportdatastudent?status=1&grade=1 //meka thama api request karana value eka meka thiynenne report data controller eke
    students=ajaxGetRequest("reportdatastudent?status="+selectStatus.value+"&grade="+JSON.parse(selectGrade.value).id);
    refreshStudentTable();
}



const printStudentFullTable = () => {
    $("#printStudentModel").modal('show');

    let displayProperty = [

        {dataType: 'text', propertyName: 'stunum'},
        {dataType: 'text', propertyName: 'firstname'},
        {dataType: 'text', propertyName: 'lastname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'function', propertyName: getStatus},

    ];


    fillDataIntoTable(printStudentTable, students, displayProperty, "", false)


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
        "<body>" + printStudentTable.outerHTML + "</body> "
    );
    setTimeout(function () { //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    }, 500)


}














