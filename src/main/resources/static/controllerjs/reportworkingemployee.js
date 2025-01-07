window.addEventListener('load', () => {

    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/employee")


    designations = ajaxGetRequest("/designation/findall")
    fillDataIntoSelect(selectDesignation, 'select designation', designations, 'name');

    employeestatuses = ajaxGetRequest("/employeestatus/findall")
    fillDataIntoSelect(selectStatus, 'select status', employeestatuses, 'name','working');


    //get data using get request
    employees = ajaxGetRequest("/reportdataemployee")

    //call refresh table function
    refreshEmployeeTable();

});
//define function for refresh employee table
const refreshEmployeeTable = () => {



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


    fillDataIntoTable(tableReportEmployee, employees, displayProperty,checkPrivilege ,false);



    $('#tableReportEmployee').dataTable();

};

const checkPrivilege =(innerob)=>{

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

}


//create function for delete employee
const deleteEmployee = (ob, rowIndex) => {

}

//create function for print employee
const printEmployee = (ob, rowIndex) => {


}

const generateReportBYSelectValues = ()=>{
    employees=ajaxGetRequest("reportdataemployee?status="+JSON.parse(selectStatus.value).id+"&designation="+JSON.parse(selectDesignation.value).id);
    refreshEmployeeTable();
}
































