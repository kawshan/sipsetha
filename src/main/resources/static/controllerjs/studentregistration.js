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



//define refresh student registration form
const refreshStudentRegistrationForm = ()=>{
    studentRegistrationForm.reset();
    studentRegistration = new Object();

    students = ajaxGetRequest("/student/findall");
    fillDataIntoSelect(selectStudent,'select student',students,'firstname');

    classOfferings = ajaxGetRequest("/classoffering/findall");
    fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname');

    registrationstatues = ajaxGetRequest("/registrationstatus/findall");
    fillDataIntoSelect(selectRegistrationStatus,'select registration statues',registrationstatues,'name');

    registerdTypes = ajaxGetRequest("/registeredtype/findall");
    fillDataIntoSelect(selectRegisteredType,'select registered type',registerdTypes,'name');


    textFee.style.border="2px solid #ced4da";
    selectStudent.style.border="2px solid #ced4da";
    selectClassOffering.style.border="2px solid #ced4da";
    selectRegistrationStatus.style.border="2px solid #ced4da";
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

}

//define function for refill student registration form
const refillStudentRegistrationForm = (ob,rowIndex)=>{
    studentRegistration = JSON.parse(JSON.stringify(ob));
    oldStudentRegistration = JSON.parse(JSON.stringify(ob));
    console.log("refill")
    $('#modalStudentRegistration').modal('show');

    textFee.value = studentRegistration.fee;


    fillDataIntoSelect(selectStudent,'select student',students,'firstname',studentRegistration.student_id.firstname);

    fillDataIntoSelect(selectClassOffering,'select class offering',classOfferings,'classname',studentRegistration.classoffering_id.classname);

    fillDataIntoSelect(selectRegistrationStatus,'select registration statues',registrationstatues,'name',studentRegistration.registrationstatus_id.name);

    fillDataIntoSelect(selectRegisteredType,'select registered type',registerdTypes,'name',studentRegistration.registerdtype_id.name);


    if (studentRegistration.note != null){
        textNote.value = studentRegistration.note
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
























































