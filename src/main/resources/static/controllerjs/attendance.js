window.addEventListener('load', () => {

    //get user privileges for check privileges on buttons
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/attendance");

    //call refresh attendance form
    refreshAttendanceForm()


    //refresh attendance table call;
    refreshAttendanceTable();
});


//define refresh attendance form
const refreshAttendanceForm = () => {
    AttendanceForm.reset();
    attendance = new Object();
    oldAttendance = null;

    textStudent.style.border="2px solid #ced4da";
    selectClassOffering.style.border="2px solid #ced4da";
    selectAttendanceStatus.style.border="2px solid #ced4da";
    textNote.style.border="2px solid #ced4da";

    textNote.value="";

    students = ajaxGetRequest("/student/findall")
    fillDataIntoDataList(dataListStudent, students, 'stunum', 'firstname');


    classOfferings = ajaxGetRequest("/classoffering/findall")
    fillDataIntoSelect(selectClassOffering, "Select Class Offerings", classOfferings, 'classname');

    attendanceStatuses = ajaxGetRequest("/attendancestatus/findall")
    fillDataIntoSelect(selectAttendanceStatus, "Select Attendance status", attendanceStatuses, 'name');

//update button eka disable karala danawa
    btnAttendanceUpdate.disabled=true;
    btnAttendanceUpdate.style.cursor="not-allowed";

//submit eka disable false kara mokada refiill ekedi eka disable karapu nisa methanadi enable karanawa
    btnStudentSubmit.disabled=false;
    btnStudentSubmit.style.cursor="pointer";


    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnAttendanceUpdate.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnAttendanceUpdate.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }

    if (!userPrivilege.insert){ //insert eke privilege thiyeawada da nadda baluwa
        btnStudentSubmit.disabled=true;   //privilege naththam button eka disable
        btnStudentSubmit.style.cursor="not-allowed";  //pointer eka not allowed
    }


}

//define refresh attendance table
const refreshAttendanceTable = () => {

    attendancesList = ajaxGetRequest("/attendance/findall");

    displayProperty = [
        {dataType: 'function', propertyName: getStudentName},
        {dataType: 'text', propertyName: 'addeddate'},
        {dataType: 'function', propertyName: getClassOffering},
        {dataType: 'function', propertyName: getAttendanceStatus},
    ];

    fillDataIntoTable(tableAttendance,attendancesList,displayProperty,checkPrivileges,true)
    $('#tableAttendance').dataTable();
}



const checkPrivileges = (innerOb)=>{
    if (innerOb.attendancestatus_id.name!="delete"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}

const getStudentName = (ob) => {
    return ob.student_id.firstname + " " + ob.student_id.lastname
}

const getClassOffering = (ob) => {
    return ob.classoffering_id.classname;
}

const getAttendanceStatus = (ob) => {
    return ob.attendancestatus_id.name;
}


const printAttendance=(ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let attendancesList = new Array(ob);


    displayProperty = [
        {dataType: 'function', propertyName: getStudentName},
        {dataType: 'text', propertyName: 'addeddate'},
        {dataType: 'function', propertyName: getClassOffering},
        {dataType: 'function', propertyName: getAttendanceStatus},
    ];

    fillDataIntoTable(printAttendanceTable,attendancesList,displayProperty,checkPrivileges,false)

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printAttendanceTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500);

    divModifyButton.className="d-none";
}


const refillAttendanceForm = (ob, rowIndex) => {

    attendance = JSON.parse(JSON.stringify(ob));
    oldAttendance = JSON.parse(JSON.stringify(ob));

    $('#modalAttendanceAdd').modal('show');

    textStudent.value = attendance.student_id.stunum + " " + attendance.student_id.firstname

    fillDataIntoSelect(selectClassOffering, "Select Class Offerings", classOfferings, 'classname', attendance.classoffering_id.classname);

    fillDataIntoSelect(selectAttendanceStatus, "Select Attendance status", attendanceStatuses, 'name', attendance.attendancestatus_id.name);

    //update button eka enale karanawa in other words disable ayin karanawa
    btnAttendanceUpdate.disabled=false;
    btnAttendanceUpdate.style.cursor="pointer";

    //add button eka disable karanawa
    btnStudentSubmit.disabled=true;
    btnStudentSubmit.style.cursor="not-allowed";

    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnAttendanceUpdate.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnAttendanceUpdate.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }


}

const deleteAttendance = (ob, rowIndex) => {
    console.log("delete");
    tableAttendance.children[1].children[rowIndex].style.backgroundColor = 'pink';
    setTimeout(function () {
        const userConfirm = confirm("are you sure to delete attendance \n"
            + "\n Student is " + ob.student_id.stunum + " " + ob.student_id.firstname + " " + ob.student_id.lastname
            + "\n Class offering is" + ob.classoffering_id.classname
            + "\n Attendance staus is" + ob.attendancestatus_id.name
        );

        if (userConfirm) {
            let deleteServerResponse = ajaxDeleteRequest("/attendance", ob);
            if (deleteServerResponse == "ok") {
                alert("Delete Successful");
                refreshAttendanceTable();
                divModifyButton.className="d-none";
            } else {
                alert("Error happened please recheck \n" + deleteServerResponse);
            }
        }

    }, 500)
}


const checkFormErrors = () => {
    let errors = "";

    if (attendance.student_id == null) {
        errors = errors + "student cannot be empty \n"
    }
    if (attendance.classoffering_id == null) {
        errors = errors + "Class offering cannot be empty \n"
    }
    if (attendance.attendancestatus_id == null) {
        errors = errors + "attendance status cannot be empty \n"
    }

    return errors;
}

const buttonAttendanceSubmit = () => {
    let errors = checkFormErrors();
    if (errors == "") {
        const userConfirm = confirm("Are you sure to add following attendance \n"
            + "\n student number is " + attendance.student_id.stunum + " student firstname is " + attendance.student_id.firstname + " student last name is " + attendance.student_id.lastname
            + "\n class offering name is"+attendance.classoffering_id.classname
            +"\n attendance status is"+attendance.attendancestatus_id.name
        );
        if (userConfirm){
            let postServiceResponse=ajaxPostRequest("/attendance",attendance);
            if (postServiceResponse=="ok"){
                alert("save successful ")
                $('#modalAttendanceAdd').modal('hide');
                refreshAttendanceForm();
                refreshAttendanceTable();
            }else {
                alert("error happened \n"+postServiceResponse)
            }
        }
    }else {
        alert("you might have some errors \n"+errors);
    }
}

const checkUpdates = ()=>{
    let updates = "";

    if (attendance.student_id.stunum != oldAttendance.student_id.stunum){
        updates=updates+"student is changed \n";
    }
    if (attendance.classoffering_id.classname!=oldAttendance.classoffering_id.classname){
        updates="class offering is changed \n";
    }
    if (attendance.attendancestatus_id.name!=oldAttendance.attendancestatus_id.name){
        updates="attendance status is changed \n";
    }
    return updates;
}


const buttonAttendanceUpdate = ()=>{
    let updates=checkUpdates();
    if (updates==""){
        alert("nothing to update ");
    }else {
        const userConfirm=confirm("Are you sure to update following attendance \n"+updates)
        if (userConfirm){
            let putServiceResponse = ajaxPutRequest("/attendance",attendance)
            if (putServiceResponse=="ok"){
                $('#modalAttendanceAdd').modal('hide');
                refreshAttendanceForm();
                refreshAttendanceTable();
                alert("update successful");
                divModifyButton.className="d-none";
            }else {
                alert("error happened please recheck");
            }
        }
    }
}

// define function for generate student registration number from student
const generateStudentClassOfferings = (fieldID) => {//parameter ekak vidihata field id eka gannwa eka enne html eke this eken pass karala
    console.log(fieldID.value);
    let selectedValue = fieldID.value.split(" ");
    let indexNumber = selectedValue[0];
    console.log(indexNumber);
    let studentClassOfferingByStudentNumber = ajaxGetRequest("/classoffering/bystunum/" + indexNumber); //student registration eken index number eka genna gannawa
    fillDataIntoSelect(selectClassOffering,'select class offerings',studentClassOfferingByStudentNumber,'classname');

}

const attendanceFullTable = ()=>{
    $("#printAttendanceModel").modal('show');


    attendancesList = ajaxGetRequest("/attendance/findall");

    displayProperty = [
        {dataType: 'function', propertyName: getStudentName},
        {dataType: 'text', propertyName: 'addeddate'},
        {dataType: 'function', propertyName: getClassOffering},
        {dataType: 'function', propertyName: getAttendanceStatus},
    ];

    fillDataIntoTable(printAttendanceTable,attendancesList,displayProperty,checkPrivileges,false)

}


const modalPrintButton = ()=>{
    console.log("model print working");
    let newWindow = window.open();  //window open ekan karanne browser window ekak open karana eka iita passe eka varibale ekakata assign karagannawa
    newWindow.document.write(   //meka liyanna hethuwa thama content eka directly write karanna puluwan document ekata
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printAttendanceTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}








