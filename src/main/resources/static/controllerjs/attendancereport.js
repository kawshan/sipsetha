window.addEventListener('load', () => {

    //get user privileges for check privileges on buttons
    attendancesList = ajaxGetRequest("/attendance/findall");


    //refresh attendance table call;
    refreshAttendanceTable();
});


//define refresh attendance table
const refreshAttendanceTable = () => {

    displayProperty = [
        {dataType: 'function', propertyName: getStudentName},
        {dataType: 'text', propertyName: 'addeddate'},
        {dataType: 'function', propertyName: getClassOffering},
        {dataType: 'function', propertyName: getAttendanceStatus},
    ];

    fillDataIntoTable(tableAttendance,attendancesList,displayProperty,checkPrivileges,false)
}

const checkPrivileges = (innerOb)=>{
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


const getAttendanceReportsBetweenDates=()=>{
    let startDate = textStartDate.value;
    let endDate = textEndDate.value;
    console.log(startDate+" "+endDate);
    // /reportdataattendance/{startdate}/{enddate}  //api request karana
    attendancesList=ajaxGetRequest("/reportdataattendance/"+startDate+"/"+endDate);
    refreshAttendanceTable();
}




