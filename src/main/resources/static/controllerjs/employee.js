window.addEventListener('load', () => {

    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/employee")

    //call refresh table function
    refreshEmployeeTable();

    //call refresh employee form
    refreshEmployeeForm();

    //call refresh designation for validation and refresh purpose
    refreshDesignationForm();

});
//define function for refresh employee table
const refreshEmployeeTable = () => {
    employees = ajaxGetRequest("/employee/findall")


    const displayProperty = [
        {dataType: 'text', propertyName: 'fullname'},
        {dataType: 'text', propertyName: 'callingname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'text', propertyName: 'nic'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'text', propertyName: 'landno'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'addeddate'},
        {dataType: 'photoarray', propertyName: 'emp_photo'},
        {dataType: 'function', propertyName: getEmployeeStatus},
        {dataType: 'function', propertyName: getDesignation},
        {dataType: 'text', propertyName: 'civilstatus'}

    ];


    fillDataIntoTable(tableEmployee, employees, displayProperty,checkPrivilege ,true);



    $('#tableEmployee').dataTable();

};

const checkPrivilege =(innerob)=>{
    if (innerob.employeestatus_id.name != 'delete'){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed'
    }

}

//define function for refresh employee form
const refreshEmployeeForm = () => {

    //create object
    employee = new Object();    //create employee object
    employeeForm.reset();

    designations = ajaxGetRequest("/designation/findall")
    fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name');


    genders = ajaxGetRequest("/gender/findall")
    fillDataIntoSelect(selectGender, 'select gender', genders, 'name');


    textFullName.style.border = '1px solid #ced4da';
    textCallingName.style.border = '1px solid #ced4da';
    selectDOB.style.border = '1px solid #ced4da';
    textNic.style.border = '1px solid #ced4da';
    selectGender.style.border = '1px solid #ced4da';
    textMobile.style.border = '1px solid #ced4da';
    textLand.style.border = '1px solid #ced4da';
    textEmail.style.border = '1px solid #ced4da';
    textAddress.style.border = '1px solid #ced4da';
    // selectDateTime.style.border = '1px solid #ced4da';
    selectStatus.style.border = '1px solid #ced4da';
    selectDesignation.style.border = '1px solid #ced4da';
    selectCivilStatus.style.border = '1px solid #ced4da';


    employeestatuses = ajaxGetRequest("/employeestatus/findall")
    fillDataIntoSelect(selectStatus, 'select status', employeestatuses, 'name','working');
    employee.employeestatus_id = JSON.parse(selectStatus.value);
    selectStatus.style.border="2px solid green";
    selectDOB.disabled=true;
    selectGender.disabled=true;


    employee.emp_photo=null;    //employee obkect eke emp_photo kiyana property eka null karala danwa ai ee null karanne refresh ekedi mukuth value thiyenna bari nisa
    imgEmpPhoto.files=null; //files array eka empty karanawa
    imgEmpPhoto.src="/icons/no-photo.png";
    textEmpPhoto.value=""


    ////need to disable update button when form is refreshing
    btnEmployeeUpdate.disabled=true     //
    btnEmployeeUpdate.style.cursor="not-allowed";       //ethakota cursor eka me symbol eken 🚫 pennnawa


    btnEmployeeAdd.disabled=false;  //disable false ee kiyanne visible venna hadanawa
    btnEmployeeAdd.style.cursor="pointer";      ////refill ekedi pointer not allowed dunna nisa thama methana pointer dunne ethakota cursor eka 👆 mehema pennanawa


    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnEmployeeUpdate.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnEmployeeUpdate.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }

    if (!userPrivilege.insert){ //insert eke privilege thiyeawada da nadda baluwa
        btnEmployeeAdd.disabled=true;   //privilege naththam button eka disable
        btnEmployeeAdd.style.cursor="not-allowed";  //pointer eka not allowed
    }


}


//define function for refresh designation form
const refreshDesignationForm = ()=>{
    designationob=new Object()//define new object
    // designationob=null

    textDesignationName.value="";
    textDesignationName.style.border="2px solid #ced4da";
}



//create function for get gender
const getGender = (ob) => {
    if (ob.gender_id.name = 'male') {
        return 'male'
    } else {
        return 'female'

    }
}


//create  function for getEmployeeStatus
const getEmployeeStatus = (ob) => {
    if (ob.employeestatus_id.name == 'working') {
        return '<p class="status-working">' + ob.employeestatus_id.name + '</p>';
    }
    if (ob.employeestatus_id.name == 'resign') {
        return '<p class="status-resign">' + ob.employeestatus_id.name + '</p>';
    }
    if (ob.employeestatus_id.name == 'delete') {
        return '<p class="status-delete">' + ob.employeestatus_id.name + '</p>';
    }
}

// create function for get designation
const getDesignation = (ob) => {
    return ob.designation_id.name;
}


//create function for employee refill
const employeeFormRefill = (ob, rowIndex) => {
    employee=JSON.parse(JSON.stringify(ob));
    oldEmployee=JSON.parse(JSON.stringify(ob));

    console.log('refill');
    $('#modalEmployeeAdd').modal('show');



    textFullName.value = employee.fullname;
    textCallingName.value = employee.callingname;
    selectDOB.value = employee.dob;
    textNic.value = employee.nic;

    fillDataIntoSelect(selectGender, 'select gender', genders, 'name',employee.gender_id.name);


    textMobile.value = employee.mobile;


    if (employee.landno != null){
        textLand.value = employee.landno;
    }else {
        textLand.value="";
    }

    if (employee.email != null){
        textEmail.value = employee.email;
    }else {
        textEmail.value="";
    }

    textAddress.value = employee.address;
    // selectDateTime.value=employee.addeddate

    fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name',employee.designation_id.name);

    fillDataIntoSelect(selectStatus, 'select status', employeestatuses, 'name',employee.employeestatus_id.name);


    selectCivilStatus.value=employee.civilstatus;

    if (employee.emp_photo==null){
        imgEmpPhoto.src="/icons/no-photo.png";
        textEmpPhoto.value="";
    }else {
        imgEmpPhoto.src=atob(employee.emp_photo);//btoa eken encrypt karanawa meken decrypt karanawa ai decrypt karala ganne normal ganna bari nisa
        textEmpPhoto.value=employee.emp_photo_name
    }


    //enable btn update because we disabled that in refresh
    btnEmployeeUpdate.disabled=false
    btnEmployeeUpdate.style.cursor="pointer";
    //need to disable add button
    btnEmployeeAdd.disabled=true;
    btnEmployeeAdd.style.cursor="not-allowed";


    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnEmployeeUpdate.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnEmployeeUpdate.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }

}


//create function for delete employee
const deleteEmployee = (ob, rowIndex) => {
    console.log('delete');

    tableEmployee.children[1].children[rowIndex].style.backgroundColor = 'pink'

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following employee \n'
            + '\n full name is ' + ob.fullname
            + '\n calling name is ' + ob.callingname
            + '\n nic is ' + ob.nic
            + '\n status is' + ob.employeestatus_id.name
        );
        if (userConfirm) {

           const deleteServerResponse = ajaxDeleteRequest("/employee",ob)

            if (deleteServerResponse == 'ok') {
                alert("delete successful");
                divModifyButton.className="d-none";
            } else {
                alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
            }
        }
        refreshEmployeeTable();
    }, 500)

}

//create function for print employee
const printEmployee = (ob, rowIndex) => {
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let employees = new Array(ob);

    let displayProperty = [
        {dataType: 'text', propertyName: 'fullname'},
        {dataType: 'text', propertyName: 'callingname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'text', propertyName: 'nic'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'text', propertyName: 'landno'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'addeddate'},
        // {dataType: 'function', propertyName: getHasUserAccount},
        {dataType: 'function', propertyName: getEmployeeStatus},
        {dataType: 'function', propertyName: getDesignation},
        {dataType: 'text', propertyName: 'civilstatus'}

    ];

    fillDataIntoTable(printEmployeeTable,employees,displayProperty,"",false);


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printEmployeeTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)





}


//create function for check updates
const checkEmployeeFormUpdate = ()=>{
    let updates = "";
    if (employee.fullname != oldEmployee.fullname){
        updates = updates+"fullname is changed \n";
    }
    if (employee.callingname != oldEmployee.callingname){
        updates =updates+"calling name is changed \n";
    }
    if (employee.dob != oldEmployee.dob){
        updates = updates+"date of birth is changed \n ";
    }
    if (employee.nic != oldEmployee.nic){
        updates=updates+"nic is changed \n";
    }
    if (employee.gender_id.name != oldEmployee.gender_id.name){
        updates=updates+"gender is changed \n";
    }
    if (employee.landno != oldEmployee.landno){
        updates=updates+"land no is changed \n";
    }
    if (employee.email != oldEmployee.email){
        updates= updates+"email is changed \n";
    }
    if (employee.address != oldEmployee.address){
        updates=updates+"address is changed \n"
    }
    // if (employee.addeddate != oldEmployee.addeddate){
    //     updates= updates+"added date is changed \n"
    // }
    if (employee.employeestatus_id.name != oldEmployee.employeestatus_id.name){
        updates=updates+"employee status is changed";
    }
    if (employee.designation_id.name != oldEmployee.designation_id.name){
        updates=updates+"designation is changed \n";
    }
    if (employee.civilstatus != oldEmployee.civilstatus){
    updates=updates+"civil status is changed \n"
    }
    return updates;
}


//define function for button from update
const buttonFormUpdate = ()=>{
    console.log("update");
    console.log(employee);
    console.log(oldEmployee);

    //need to check form errors
    let errors=checkFormErrors();
    if (errors==""){
        let updates = checkEmployeeFormUpdate();
        if (updates ==""){
            alert("nothing changed");
        }else {
            const userConfirm = confirm("are you sure to update this employee \n"+updates);
            if (userConfirm){
                putServiceResponce=ajaxPutRequest("/employee",employee)
                if (putServiceResponce == "ok"){
                    alert("update successful ");
                    refreshEmployeeTable();
                    employeeForm.reset();
                    refreshEmployeeForm();
                    $("#modalEmployeeAdd").modal("hide");
                    refreshEmployeeTable();
                    divModifyButton.className="d-none";
                }else {
                    alert("fail to update have following error \n "+putServiceResponce);
                }
            }
        }
    }else {
        alert("form has following errors \n "+errors);
    }

}


//create function for check error
const checkFormErrors = () => {
    let errors = '';

    if (employee.fullname == null) {
        errors = errors + 'full name cannot be empty \n';
        textFullName.classList.add('is-invalid');
    }
    if (employee.callingname == null) {
        errors = errors + 'calling name cannot be empty \n';
        textCallingName.classList.add('is-invalid');
    }
    if (employee.dob == null) {
        errors = errors + 'date of birth cannot be empty \n';
        selectDOB.classList.add('is-invalid');
    }
    if (employee.nic == null) {
        errors = errors + 'nic cannot be empty \n';
        textNic.classList.add('is-invalid');
    }
    if (employee.gender_id == null) {
        errors = errors + 'gender cannot be empty \n';
        selectGender.classList.add('is-invalid');
    }
    if (employee.mobile == null) {
        errors = errors + 'mobile cannot be empty \n';
        textMobile.classList.add('is-invalid');
    }
    if (employee.address == null) {
        errors = errors + 'address cannot be empty \n';
        textAddress.classList.add('is-invalid');
    }
    // if (employee.addeddate == null) {
    //     errors = errors + 'added date cannot be empty \n'
    //     selectDateTime.classList.add('is-invalid');
    // }
    if (employee.employeestatus_id == null) {
        errors = errors + 'employee status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    if (employee.designation_id == null) {
        errors = errors + 'designation cannot be empty \n'
        selectDesignation.classList.add('is-invalid');
    }
    if (employee.civilstatus == null) {
        errors = errors + 'civil status cannot be empty \n'
        selectCivilStatus.classList.add('is-invalid');
    }
    return errors
}


//create function for submit employee form
const employeeSubmit = () => {
    console.log(employee);

    const errors = checkFormErrors();
    if (errors == '') {
        //if errors not available
        //get user confirmation

        const userConfirm = confirm('are you sure to add this employee \n'
            + '\n full name is ' + employee.fullname
            + '\n calling name is ' + employee.callingname
            + '\n nic is ' + employee.nic
            // + '\n gender is ' + employee.gender_id.name
        );

        if (userConfirm){
           let serverResponse=ajaxPostRequest("/employee/employeeform",employee)
            if (serverResponse=="ok"){
                alert("employee added successfully ")
                $('#modalEmployeeAdd').modal('hide');
                refreshEmployeeForm()
                employeeForm.reset();
                refreshEmployeeTable()
            }else {
                alert("something happened during employee add please recheck again"+serverResponse);
            }
        }


    } else {
        alert('you might have some errors \n'+errors);
    }
}

// define function for get full name validator
const textFullNameValidator = (fieldId, pattern) => {
    const regPattern = new RegExp(pattern);
    if (fieldId.value != "") {
        if (regPattern.test(fieldId.value)) {
            //set green color and log
            fieldId.style.border = '2px solid green'
            console.log('ok');
            employee.fullname = fieldId.value;
            //need to generate calling names
            fullNameValuePartList = fieldId.value.split(' ');
            dlNameParts.innerHTML = '';
            fullNameValuePartList.forEach(element => {
                const option = document.createElement('option');
                option.value = element;
                dlNameParts.appendChild(option);
            });


        } else {
            fieldId.style.border = '2px solid red';
            console.log('error');
            employee.fullname = null
        }
    } else {
        employee.fullname = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '1px solid #ced4da';
        }
    }
}

//define function for get calling name validator
const textCallingNameValidator = (fieldId) => {
    const callingNameValue = fieldId.value;

    const index = fullNameValuePartList.map(element => element).indexOf(callingNameValue);
    console.log(index)
    if (index != -1) {
        //valid
        fieldId.style.border = '2px solid green';
        employee.callingname = callingNameValue;
    } else {
        //invalid
        fieldId.style.border = '2px solid red';
        employee.callingname = null;
    }
}

const generateGenderAndDOB = (element)=>{
    let nicValue = element.value;
    let year,month,date
    let days;
    let dob;

    if (new RegExp("^(([0-9]{9}[VvXxSs])|([0-9]{12}))$").test(nicValue)){
        if (nicValue.length==10){//for old nic type
            year="19"+nicValue.substring(0,2);//ekdaas namasiya kiyanna thama meka ganne udaharanayak vidihata 19+67 1967
            days=nicValue.substring(2,5);
        }

        if (nicValue.length==12){ //for to check new nic
            year=nicValue.substring(0,4);
            days=nicValue.substring(4,7)
        }
        console.log(year);
        console.log(days);
    }
    genders = ajaxGetRequest("/gender/findall")
    let empgender= "";
    if (days<500){
        empgender = 'male';
    }else {
        empgender = 'female';
    }
    fillDataIntoSelect(selectGender,'select gender',genders,'name',empgender);
    employee.gender_id = JSON.parse(selectGender.value);
    selectGender.style.border="2px solid green";

    console.log(days);
    let DOBDate = new Date(year);
    console.log(DOBDate)
    if (year%4 !=0){
        DOBDate.setDate(parseInt(days)-1);
    }else {
        DOBDate.setDate(parseInt(days));
    }
    console.log(DOBDate);

    month=DOBDate.getMonth()+1;
    if (month<10){
        month="0"+month;
    }
    date=DOBDate.getDate();
    if (date<10){
        date="0"+date;
    }
    dob=year+"-"+month+"-"+date;
    selectDOB.value=dob;
    employee.dob=JSON.parse(JSON.stringify(selectDOB.value));
    selectDOB.style.border="2px solid green";

}
//define function for button designation submit for to add additional items to select field
const buttonDesignationSubmit = ()=>{
    console.log("designation submit function");

    if (designationob.name!=null){
        let userConfirm = confirm("Are you sure to add "+designationob.name+"designation value");
        if (userConfirm){
            let postServerResponse=ajaxPostRequest("/designation",designationob);
            if (postServerResponse=="ok"){
                alert("save successful ");

                designations = ajaxGetRequest("/designation/findall")
                fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name',textDesignationName.value);

                selectDesignation.style.border="2px solid green";
                employee.designation_id=JSON.parse(selectDesignation.value);

                refreshDesignationForm();
                $('#collapseExample').collapse('hide');
            }else {
                alert("save not success"+postServerResponse)
            }
        }
    }





}

const printEmployeeFullTable = ()=>{
    $("#printEmployeeModel").modal('show');
    let displayProperty = [
        {dataType: 'text', propertyName: 'fullname'},
        {dataType: 'text', propertyName: 'callingname'},
        {dataType: 'text', propertyName: 'dob'},
        {dataType: 'text', propertyName: 'nic'},
        {dataType: 'function', propertyName: getGender},
        {dataType: 'text', propertyName: 'mobile'},
        {dataType: 'text', propertyName: 'landno'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'text', propertyName: 'address'},
        {dataType: 'text', propertyName: 'addeddate'},
        // {dataType: 'function', propertyName: getHasUserAccount},
        {dataType: 'function', propertyName: getEmployeeStatus},
        {dataType: 'function', propertyName: getDesignation},
        {dataType: 'text', propertyName: 'civilstatus'}

    ];
    employees = ajaxGetRequest("/employee/findall")
    fillDataIntoTable(printEmployeeTable,employees,displayProperty,"",false);


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
        "<body>"+printEmployeeTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}




//define function for clear button
const btnClearImageFN = ()=>{
    if (employee.emp_photo!=null){
        const userConfirm = confirm("Are you sure to reset employee photo ?")
        if (userConfirm){
            employee.emp_photo=null;
            imgEmpPhoto.files=null;
            imgEmpPhoto.src="/icons/no-photo.png";
            textEmpPhoto.value="";
        }else {
            employee.emp_photo=null;
            imgEmpPhoto.src="/icons/no-photo.png";
            textEmpPhoto.value="";
        }
    }
}



const validateNicExisting = (fieldId)=>{
    let nicValue=fieldId.value
    if (new RegExp('^(([0-9]{9}[VvXxSs])|([0-9]{12}))$').test(nicValue)){
        console.log("good nic to validate existing");

        let getServerResponse=ajaxGetRequest("/employee/getbynic/"+nicValue);
        if (getServerResponse==true){
            divNicText.classList.remove("d-none");
            divNicText.innerText="nic "+nicValue+" is already exists please recheck"
            divNicText.style.color="red";
        }else {
            divNicText.classList.remove("d-none");
            divNicText.innerText="nic "+nicValue+" is good it is not previously enterd";
            divNicText.style.color="green";
        }
    }
}



const validateMobileExisting = (fieldId)=>{
    let mobileValue=fieldId.value
    if (new RegExp('^[0][7][01245678][0-9]{7}$').test(mobileValue)){
        console.log("good mobile to validate existing");

        let getServerResponse=ajaxGetRequest("/employee/getbymobile/"+mobileValue);
        if (getServerResponse==true){
            divMobileText.classList.remove("d-none");
            divMobileText.innerText="mobile "+mobileValue+" is already exists please recheck";
            divMobileText.style.color="red";
        }else {
            divMobileText.classList.remove("d-none");
            divMobileText.innerText="mobile "+mobileValue+" is good it is not previously entered";
            divMobileText.style.color="green";
        }
    }
}


const validateEmailExisting = (fieldId)=>{
    let emailValue=fieldId.value;
    if (new RegExp('^[A-Za-z0-9]{4,30}[@][a-z]{3,10}[.][a-z]{2,3}$').test(emailValue)){
        console.log("good email to validate existing");

        let getServerResponse=ajaxGetRequest("/employee/getbyemployeeemail/"+emailValue);
        if (getServerResponse==true){
            divEmailText.classList.remove("d-none");
            divEmailText.innerText="email "+emailValue+" is already exists please recheck";
            divEmailText.style.color="red";
        }else {
            divEmailText.classList.remove("d-none");
            divEmailText.innerText="email "+emailValue+" is good it is not previously entered";
            divEmailText.style.color="green";
        }
    }
}









