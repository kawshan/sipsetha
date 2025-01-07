window.addEventListener('load', () => {


    //call refresh table function
    refreshEmployeeTable();

    //call refresh employee form
    refreshEmployeeForm()


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
        {dataType: 'function', propertyName: getHasUserAccount},
        {dataType: 'function', propertyName: getEmployeeStatus},
        {dataType: 'function', propertyName: getDesignation},
        {dataType: 'text', propertyName: 'civilstatus'}

    ];


    fillDataIntoTable(tableEmployee, employees, displayProperty, true)

};

//define function for refresh employee form
const refreshEmployeeForm = () => {

    //create object
    employee = new Object();    //create employee object
    employeeForm.reset();

    designations = ajaxGetRequest("/designation/findall")

    fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name');

    employeestatuses = ajaxGetRequest("/employeestatus/findall")

    fillDataIntoSelect(selectStatus, 'select status', employeestatuses, 'name');

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
    selectDateTime.style.border = '1px solid #ced4da';
    selectStatus.style.border = '1px solid #ced4da';
    selectDesignation.style.border = '1px solid #ced4da';
    selectCivilStatus.style.border = '1px solid #ced4da';


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


//create function for has user account
const getHasUserAccount = (ob) => {
    if (ob.hasuseraccount) {
        return '<i class="fa-solid fa-circle-check fa-2x text-success"></i>'

    }
    return '<i class="fa-solid fa-circle-xmark fa-2x text-danger"></i>'
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
    selectDateTime.value=employee.addeddate

    fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name',employee.designation_id.name);

    fillDataIntoSelect(selectStatus, 'select status', employeestatuses, 'name',employee.employeestatus_id.name);


    selectCivilStatus.value=employee.civilstatus;


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
            let deleteServerResponse = 'ok'

            deleteServerResponse = ajaxDeleteRequest("/employee",ob)

            if (deleteServerResponse == 'ok') {
                // alert("delete successfull")
                Swal.fire({title: 'delete successful', icon: 'success'});
            } else {
                // alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                Swal.fire({
                    title: 'delete unsuccessful you might have following errors \n' + deleteServerResponse,
                    icon: 'error'
                });
            }
        }
        refreshEmployeeTable();
    }, 500)

}

//create function for print employee
const printEmployee = (ob, rowIndex) => {
    console.log('print');
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
    if (employee.addeddate != oldEmployee.addeddate){
        updates= updates+"added date is changed \n"
    }
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
    if (employee.addeddate == null) {
        errors = errors + 'added date cannot be empty \n'
        selectDateTime.classList.add('is-invalid');
    }
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
        // alert('you might have some errors \n'+errors);
        swal.fire({
            title: 'you might have some errors \n ' + errors,
            icon: 'error'
        });
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
