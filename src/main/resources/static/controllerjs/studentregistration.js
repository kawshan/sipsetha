window.addEventListener('load',function (){
    //get user privileges for check privileges on buttons
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/studentregistration");


    //call refresh student registration form function
    refreshStudentRegistrationForm();

    //call refresh student registration table
    refreshStudentRegistrationTable()

});

//define student registration table function
const refreshStudentRegistrationTable = ()=>{

    StudentRegistrations = ajaxGetRequest("/studentregistration/findall")

    displayProperty=[
        {dataType:"text",propertyName:"fee"},
        {dataType:"function",propertyName:getStudentName},
        {dataType:"function",propertyName:getClassOffering},
        {dataType:"function",propertyName:getRegistardType},
        {dataType:"function",propertyName:getRegistrationStatus}
    ]

    fillDataIntoTable(tableStudentRegistration,StudentRegistrations,displayProperty,checkPrivileges,true)

}

const checkPrivileges = (innerOb)=>{
    if (innerOb.registrationstatus_id.name!="in-active"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}


const getStudentName = (ob)=>{
    return ob.student_id.firstname;
}
const getClassOffering = (ob)=>{
    return ob.classoffering_id.classname
}
const getRegistrationStatus = (ob)=>{
    return ob.registrationstatus_id.name;
}
const getRegistardType = (ob)=>{
    return ob.registerdtype_id.name;
}
//define print student registration
const printStudentRegistration = (ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let StudentRegistrations = new Array(ob);

    displayProperty=[
        {dataType:"text",propertyName:"fee"},
        {dataType:"function",propertyName:getStudentName},
        {dataType:"function",propertyName:getClassOffering},
        {dataType:"function",propertyName:getRegistardType},
        {dataType:"function",propertyName:getRegistrationStatus}
    ]

    fillDataIntoTable(printStudentRegistrationTable,StudentRegistrations,displayProperty,"",false)

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printStudentRegistrationTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)



}


//define refresh student registration form
const refreshStudentRegistrationForm = ()=>{
    studentRegistrationForm.reset();
    studentRegistration = new Object();

    students = ajaxGetRequest("/student/findall");
    // fillDataIntoSelectWithTwoAttributes(selectStudent,'select student',students,'stunum','lastname');
    fillDataIntoDataList(datalistStudent,students,'stunum','lastname');


    classOfferings = ajaxGetRequest("/classoffering/findall");
    // fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname');
    fillDataIntoSelectWithTwoAttributes(selectClassOffering,'select class offering',classOfferings,'id','classname')



    selectClassOffering.addEventListener('change',function (event){// select class offering kiyana drop down ekata event listner ekek livva  //Event: The listener waits for the change event, which triggers when a user selects a new option.
        const selectedValue = event.target.value;   //selected value eka gaththa event.target value eken
        const selectedObject = JSON.parse(selectedValue);   //json parse use karanne JSON string convert into javaScript object
        const fees=selectedObject.fees; //json string eka js object ekakta awama ee object eken ona eka apita access karanna puluwan
        console.log(fees);

        textFee.value=parseFloat(fees).toFixed(2);//flote ekakata convert kata dashama thith 2 k thibba
        studentRegistration.fee=textFee.value;//student registration object ekata bind kara
        textFee.style.border="2px solid green"; //green colour kara

    });


    textFee.disabled=true;
    // textFee.value=//class fee eka genna ganna one class offering eka select karahama
    selectClassOffering.style.border="2px solid #ced4da";
    selectRegisteredType.style.border="2px solid #ced4da";
    textNote.style.border="2px solid #ced4da";

    if (!userPrivilege.update){
        btnStudentRegUpdate.disabled=true;
        btnStudentRegUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.delete){
        btnStudentRegDelete.disabled=true;
        btnStudentRegDelete.style.cursor='not-allowed';
    }



    registrationstatues = ajaxGetRequest("/registrationstatus/findall");
    fillDataIntoSelect(selectRegistrationStatus,'select registration statues',registrationstatues,'name','active');
    studentRegistration.registrationstatus_id=JSON.parse(selectRegistrationStatus.value);//json string ekak JS object ekata convert karala asiign karanawa
    selectRegistrationStatus.disabled=true;
    selectRegistrationStatus.style.border="2px solid green";


    registerdTypes = ajaxGetRequest("/registeredtype/findall");
    fillDataIntoSelect(selectRegisteredType,'select registered type',registerdTypes,'name','normal');
    studentRegistration.registerdtype_id=JSON.parse(selectRegisteredType.value);
    selectRegisteredType.style.border="2px solid green";

}

//define function for refill student registration form
const refillStudentRegistrationForm = (ob,rowIndex)=>{
    studentRegistration = JSON.parse(JSON.stringify(ob));
    oldStudentRegistration = JSON.parse(JSON.stringify(ob));
    console.log("refill")
    $('#modalStudentRegistration').modal('show');

    textFee.value = studentRegistration.fee;


    textStudent.value=studentRegistration.student_id.stunum+" "+studentRegistration.student_id.firstname;



    fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname',studentRegistration.classoffering_id.classname);

    fillDataIntoSelect(selectRegistrationStatus,'select registration statues',registrationstatues,'name',studentRegistration.registrationstatus_id.name);

    fillDataIntoSelect(selectRegisteredType,'select registered type',registerdTypes,'name',studentRegistration.registerdtype_id.name);


    if (studentRegistration.note != null){
        textNote.value = studentRegistration.note;
    }else {
        textNote.value = "";
    }

}




//define function for check errors
const checkErrors = ()=>{
    let errors="";

    if (studentRegistration.fee == null){
        errors = errors+"fee cannot be empty \n";
    }
    if (studentRegistration.student_id == null){
        errors = errors+"student cannot be empty \n";
    }
    if (studentRegistration.classoffering_id == null){
        errors = errors+"class offering cannot be empty \n";
    }
    if (studentRegistration.registrationstatus_id == null){
        errors = errors+"registration status cannot be empty \n";
    }
    if (studentRegistration.registerdtype_id == null){
        errors=errors+"registerd type cannot be empty \n"
    }

    return errors;
}


//define function for student registration add button
const addStudentRegistration = ()=>{
    let errors = checkErrors();
    if (errors == ""){
        const userConfirm = confirm("are you sure to add following registration \n"+
        "\n fee is"+studentRegistration.fee
        +"\n student is"+studentRegistration.student_id.firstname
        +"\n class offering is"+studentRegistration.classoffering_id.classname
        +"\n registration status is"+studentRegistration.registrationstatus_id.name
        +"\n registration type is"+studentRegistration.registerdtype_id.name
        )
        if (userConfirm){
            let postServiceResponse = ajaxPostRequest("/studentregistration",studentRegistration);
            if (postServiceResponse == "ok"){
                alert("save successful"+postServiceResponse);
                $('#modalStudentRegistration').modal('hide');
                refreshStudentRegistrationForm();
                refreshStudentRegistrationTable();

            }else {
                alert("save unsuccessful"+postServiceResponse);
            }
        }
    }
}

const checkUpdate = ()=>{
    let updates = "";

    if (studentRegistration.fee != oldStudentRegistration.fee){
        updates=updates+"fee is changed \n";
    }
    if (studentRegistration.student_id.firstname != oldStudentRegistration.student_id.firstname){
        updates=updates+"student is changed \n";
    }
    if (studentRegistration.classoffering_id.classname != oldStudentRegistration.classoffering_id.classname){
        updates=updates+"class offering is changed \n";
    }
    if (studentRegistration.registrationstatus_id.name !=  oldStudentRegistration.registrationstatus_id.name){
        updates=updates+"registration status is changed \n";
    }
    if (studentRegistration.registerdtype_id.name != oldStudentRegistration.registerdtype_id.name){
        updates=updates+"registration type is changed \n";
    }


    return updates;
}


const btnStudentRegistrationUpdate = ()=>{
    let errors = checkErrors();
    if (errors == ""){
        let updates = checkUpdate();
        if (updates==""){
            alert("nothing to update");
        }else {
            const userConfirm = confirm("are you sure to update following changes \n"+updates);
            if (userConfirm){
                let postServiceResponse=ajaxPostRequest("/studentregistration",studentRegistration);
                if (postServiceResponse=="ok"){
                    alert("update successful "+postServiceResponse);
                    $('#modalStudentRegistration').modal('hide');
                    refreshStudentRegistrationForm();
                    refreshStudentRegistrationTable();
                }else {
                    alert("update not successful "+postServiceResponse);
                }
            }
        }
    }
}

//define function for delete student registration
const btnDeleteStudentRegistration = (ob,rowIndex)=>{
    console.log("Delete"+ob+" "+rowIndex);
    tableStudentRegistration.children[1].children[rowIndex].style.backgroundColor="pink";
    setTimeout(function (){
        const userConfirm = confirm("are you sure to delete following student registration \n"
        +"\n fee is "+ob.fee
        +"\n student name is "+ob.student_id.firstname
        +"\n class offering is "+ob.classoffering_id.classname
        +"\n registration status is "+ob.registrationstatus_id.name
        +"\n registration type is "+ob.registerdtype_id.name
        );
        if (userConfirm){
            let deleteServerResponse = ajaxDeleteRequest("/studentregistration",ob);
            if (deleteServerResponse=="ok"){
                alert("delete successful "+deleteServerResponse);
                refreshStudentRegistrationTable();
            }else {
                alert("delete not successful "+deleteServerResponse);
                refreshStudentRegistrationTable();
            }
        }
    },500)


}


const printStudentRegistrationFullTable = ()=>{
    $("#printStudentRegistrationModel").modal('show');
    StudentRegistrations = ajaxGetRequest("/studentregistration/findall")

    displayProperty=[
        {dataType:"text",propertyName:"fee"},
        {dataType:"function",propertyName:getStudentName},
        {dataType:"function",propertyName:getClassOffering},
        {dataType:"function",propertyName:getRegistardType},
        {dataType:"function",propertyName:getRegistrationStatus}
    ]

    fillDataIntoTable(printStudentRegistrationTable,StudentRegistrations,displayProperty,"",false)


}



const modalPrintButton = ()=>{
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
        "<body>"+printStudentRegistrationTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}





















































