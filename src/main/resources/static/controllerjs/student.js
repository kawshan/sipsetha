window.addEventListener('load',()=>{
    // student = new Object();
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/student")


    refreshStudentTable();

    refreshStudentForm();

});
//define function for refresh student table
const refreshStudentTable = ()=>{
    students=ajaxGetRequest("/student/findall");

    const displayProperty=[

        {dataType:'text',propertyName:'stunum'},
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'age'},
        {dataType:'function',propertyName:getGender},
        {dataType:'text',propertyName:'address'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'function',propertyName:getStatus},

    ];

    fillDataIntoTable(tableStudent,students,displayProperty,checkPrivilege,true)

}

const checkPrivilege=(innerOb)=>{
    if (innerOb.status!="0"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}


//define function for refresh student form
const refreshStudentForm = ()=>{
    console.log('refresh success');

    student = new Object(); //create new student object this use for front end binding
    oldStudent=null;


    // fillDataIntoSelect(selectGuardian,'select guardian',guardians,'firstname')
    // fillDataIntoSelectWithTwoAttributes(selectGuardian,'select guardian',guardians,'nic','firstname')

    grades=ajaxGetRequest("/grade/findall")
    fillDataIntoSelect(selectGrade,'select grade',grades,'name');

    guardians=ajaxGetRequest("/guardian/findall")
    fillDataIntoDataList(dataListItems, guardians,'nic','firstname');

    textGuardianName.style.border='1px solid #ced4da';
    textFirstName.style.border='1px solid #ced4da';
    textLastName.style.border='1px solid #ced4da';
    textAge.style.border='1px solid #ced4da';
    selectGender.style.border='1px solid #ced4da';
    textAddress.style.border='1px solid #ced4da';
    textMobile.style.border='1px solid #ced4da';
    selectGrade.style.border='1px solid #ced4da';
    selectStatus.style.border='1px solid #ced4da';
    textNote.style.border='1px solid #ced4da';

    if (!userPrivilege.update){
        btnStudentUpdate.disabled=true;
        btnStudentUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.insert){
        btnStudentSubmit.disabled=true;
        btnStudentSubmit.style.cursor='not-allowed';
    }

    guardians=ajaxGetRequest("/guardian/findall");
    fillDataIntoDataList(textGuardianName, guardians,'nic','firstname');

    selectStatus.value=true;
    student.status=selectStatus.value;
    selectStatus.style.border="2px solid green";

}

//define function for get student status
const getStatus=(ob)=>{
    if (ob.status==true){
        return '<p class="status-working">present</p>';
    }else {
        return '<p class="status-delete">delete</p>';
    }
}

//create function for student refill
const studentFormRefill = (ob,rowIndex) =>{
    student=JSON.parse(JSON.stringify(ob));
    oldStudent=JSON.parse(JSON.stringify(ob));


    console.log('refill');
    $('#modalStudentAdd').modal('show');


    textFirstName.value=student.firstname;
    textLastName.value=student.lastname;
    textAge.value=student.age;
    textAddress.value=student.address;
    textMobile.value=student.mobile;
    textNote.value=student.note;
    selectGender.value=student.gender;
    selectStatus.value=student.status;

    // fillDataIntoSelect(selectGuardian,'select guardian',guardians,'firstname',student.guardian_id.firstname);
    // fillDataIntoDataList(dataListItems, guardians,'nic','firstname',student.guardian_id.nic);
    textGuardianName.value=student.guardian_id.nic+" "+student.guardian_id.firstname;

    // selectGuardian
    fillDataIntoSelect(selectGrade,'select grade',grades,'name',student.grade_id.name);
    // selectGrade



}

// define function for get student gender
const getGender=(ob)=>{
    if (ob.gender==true){
        return '<p>male</p>';
    }else {
        return '<p>female</p>';
    }
}

//create function for student delete
const deleteStudent = (ob,rowIndex)=>{
    console.log('delete');

    tableStudent.children[1].children[rowIndex].style.backgroundColor='pink';
    setTimeout(function (){
        const userConfirm =confirm('are you sure to delete following student \n'
            +'\n first name is '+ob.firstname
            +'\n last name is '+ob.lastname
            +'\n guardian is '+ob.guardian_id.firstname
            +'\n age is '+ob.age
            +'\n gender is '+ob.gender
            +'\n address is '+ob.address
            +'\n grade is'+ob.grade_id.name
            +'\n student status is'+ob.status
        );
        if (userConfirm){
            const deleteServerResponse = ajaxDeleteRequest('/student',ob);
            if (deleteServerResponse=='ok'){
                alert('delete successful')
                // Swal.fire({ title:'delete successful', icon:'success'});
            }else {
                alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                // Swal.fire({ title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse, icon: 'error'});
            }
        }
        refreshStudentTable();
    },500)
}

//create function for print student
const printStudent = (ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let students = new Array(ob);

    let displayProperty=[

        {dataType:'text',propertyName:'stunum'},
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'age'},
        {dataType:'function',propertyName:getGender},
        {dataType:'text',propertyName:'address'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'function',propertyName:getStatus},

    ];


    fillDataIntoTable(printStudentTable,students,displayProperty,"",false)


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printStudentTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)





}

// create function for check error
const checkFormErrors = ()=>{
    let errors = '';

    if (student.firstname == null){
        errors = errors+' first name cannot be empty \n';
        textFirstName.classList.add('is-invalid');
    }
    if (student.lastname == null){
        errors=errors+'last name cannot be empty \n';
        textLastName.classList.add('is-invalid');
    }
    if (student.age == null){
        errors=errors+'age cannot be empty \n';
        textAge.classList.add('is-invalid')
    }
    if (student.gender == null){
        errors=errors+'gender cannot be empty \n';
        selectGender.classList.add('is-invalid');
    }
    if (student.address == null){
        errors=errors+'address cannot be empty \n';
        textAddress.classList.add('is-invalid');
    }
    if (student.status == null){
        errors=errors+'status cannot be empty \n';
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//create function for student submit
const studentSubmit = ()=>{
    console.log(student);

    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        const userConfirm = confirm('are you sure to add this student \n'
        +'\n first name is '+student.firstname
        +'\n last name is '+student.lastname
        +'\n guardian is '+student.guardian_id.firstname
        +'\n age is '+student.age
        +'\n gender is '+student.gender
        +'\n address is '+student.address
        +'\n grade is'+student.grade_id.name
        +'\n student status is'+student.status
        );
        //get user confirmation
        if (userConfirm){
            //call post service
            let serverResponse=ajaxPostRequest("/student",student);
            if (serverResponse=="ok"){
                alert("student added successfully")
                $('#modalStudentAdd').modal('hide');
                refreshStudentForm();
                studentForm.reset();
                refreshStudentTable();
            }else {
                alert('student add unsuccessful please check again'+serverResponse);
            }
        }
    }else {
        alert('you might have some errors \n '+errors);
        // swal.fire({title:'you might have some errors \n '+errors, icon:'error'})
    }

}

//define function for check form update
const checkStudentFormUpdate = ()=>{
    console.log('checking update called')
    let updates='';

    if (student.guardian_id.firstname != oldStudent.guardian_id.firstname){
        updates=updates+"guardian is changed \n";
    }
    if (student.firstname != oldStudent.firstname){
        updates=updates+"student's firstname is changed \n";
    }
    if (student.lastname != oldStudent.lastname){
        updates=updates+"student's last name is changed \n";
    }
    if (student.age != oldStudent.age){
        updates=updates+"age is changed \n"
    }
    if (student.gender != oldStudent.gender){
        updates=updates+"gender is changed \n"
    }
    if (student.address != oldStudent.address){
        updates=updates+"address is changed \n";
    }
    if (student.mobile != oldStudent.mobile){
        updates=updates+"mobile is changed \n"
    }
    if (student.grade_id.name != oldStudent.grade_id.name){
        updates=updates+"grade is changed \n"
    }
    if (student.status != oldStudent.status){
        updates=updates+"status is changed \n"
    }
    if (student.note != oldStudent.note){
        updates=updates+"note is changed \n";
    }

    return updates;
}

//define function for student update
const buttonStudentUpdate = ()=>{
    console.log('update')
    let updates = checkStudentFormUpdate();
    if (updates == ''){
        alert('nothing to update');
    }else {
        //get user confirmation
        const userConfirm = confirm('are you sure to update this student \n'+updates);
        if (userConfirm){
            //call put service
            let putServiceResponse=ajaxPutRequest("/student",student);
            if (putServiceResponse=="ok"){
                alert("update successful");
                studentForm.reset();
                refreshStudentForm();
                $('#modalStudentAdd').modal('hide');
                refreshStudentTable();
            }else {
                alert("error happened please retry \n"+putServiceResponse);
            }
        }
    }
}




const printStudentFullTable = ()=>{
    $("#printStudentModel").modal('show');

    let displayProperty=[

        {dataType:'text',propertyName:'stunum'},
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'age'},
        {dataType:'function',propertyName:getGender},
        {dataType:'text',propertyName:'address'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'function',propertyName:getStatus},

    ];

    students=ajaxGetRequest("/student/findall");

    fillDataIntoTable(printStudentTable,students,displayProperty,"",false)



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
        "<body>"+printStudentTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}






















