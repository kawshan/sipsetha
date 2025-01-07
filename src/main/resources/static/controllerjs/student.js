window.addEventListener('load', () => {
    // student = new Object();
    userPrivilege = ajaxGetRequest("/privilege/byloggeduser/student")


    refreshStudentTable();

    refreshStudentForm();

});
//define function for refresh student table
const refreshStudentTable = () => {
    students = ajaxGetRequest("/student/findall");

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

    fillDataIntoTable(tableStudent, students, displayProperty, checkPrivilege, true)

}

const checkPrivilege = (innerOb) => {
    if (innerOb.status != "0") {
        if (!userPrivilege.delete) {
            divModifyButtonDelete.className = 'd-none';
        }
    } else {
        divModifyButtonDelete.disabled = true;
        divModifyButtonDelete.style.cursor = 'not-allowed';
    }
}


//define function for refresh student form
const refreshStudentForm = () => {
    console.log('refresh success');
    studentForm.reset();
    student = new Object(); //create new student object this use for front end binding
    oldStudent = null;


    // fillDataIntoSelect(selectGuardian,'select guardian',guardians,'firstname')
    // fillDataIntoSelectWithTwoAttributes(selectGuardian,'select guardian',guardians,'nic','firstname')

    grades = ajaxGetRequest("/grade/findall")
    fillDataIntoSelect(selectGrade, 'select grade', grades, 'name');

    guardians = ajaxGetRequest("/guardian/findall")
    fillDataIntoDataList(dataListItems, guardians, 'nic', 'firstname');

    textGuardianName.style.border = '1px solid #ced4da';
    textFirstName.style.border = '1px solid #ced4da';
    textLastName.style.border = '1px solid #ced4da';
    textDOB.style.border = '1px solid #ced4da';
    selectGender.style.border = '1px solid #ced4da';
    textAddress.style.border = '1px solid #ced4da';
    textMobile.style.border = '1px solid #ced4da';
    selectGrade.style.border = '1px solid #ced4da';
    selectStatus.style.border = '1px solid #ced4da';
    textNote.style.border = '1px solid #ced4da';

    //start of student dob value set to grade 3-> age 8 to grade 13 age 19,20,21
    let maxDate = new Date();   //new date object ekak aran eka max date kiyana ekata assign karagannawa

    let maxMonth = maxDate.getMonth(); //max date eken month eka aragena eka max month ekata assign karagannawa
    if (maxMonth < 10) { //eka 10 ta aduda balanne get month eken enne 0-11 (0-> january 11->december) th athara value ekek eeka api set karanna one yyyy-mm-dd format ekata
        maxMonth = '0' + maxMonth;//eka methana karala thiyenawa
    }

    maxday = maxDate.getDate();
    if (maxday < 10) {//uda reason ekama thama methana enne 1 th 31 th athara value ekek
        maxday = '0' + maxday;  //iita passe 0 wak concatinate karagannawa
    }

    maxDate.setFullYear(maxDate.getFullYear() - 8);   //full year eka set kara gannawa awrudu 8 ta wada aya enna bari venna
    textDOB.max = maxDate.getFullYear() + '-' + maxMonth + '-' + maxday;

    //end of student dob value set to grade 3 to grade 13

    //start of selecting student grade based on dob
    textDOB.addEventListener('change', function () {
        let selectedValue = new Date(textDOB.value)
        let year = selectedValue.getFullYear();
        console.log(year)

        let todayDate = new Date();
        let todayYear = todayDate.getFullYear();
        console.log(todayYear)
        let balanceYear = todayYear - year
        console.log(balanceYear);

        switch (balanceYear) {
            case 8:
                console.log("grade is 8");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradethree');
                break;
            case 9:
                console.log("grade is 9");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradefour');
                break;
            case 10:
                console.log("grade is 10");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradefive');
                break;
            case 11:
                console.log("grade is 11");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradesix');
                break;
            case 12:
                console.log("grade is 12");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradeseven');
                break;
            case 13:
                console.log("grade is 13");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradeeight');
                break;
            case 14:
                console.log("grade is 14");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradenine');
                break;
            case 15:
                console.log("grade is 15");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradeten');
                break;
            case 16:
                console.log("grade is 16");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradeeleven');
                break;
            case 17:
                console.log("grader is 17");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradetwevel');
                break;
            case 18:
                console.log("grade is 18");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','gradethirteen');
                break;
            default:
                console.log("more than 19");
                fillDataIntoSelect(selectGrade, 'select grade', grades, 'name','');

        }
        student.grade_id=JSON.parse(selectGrade.value); //json parse convert json string into js object
        selectGrade.style.border="2px solid green";//border ekata colour ekk danawa
        selectGrade.disabled=true;  //disable karanawa
    })
    //end of selecting student grade based on dob


    if (!userPrivilege.update) {
        btnStudentUpdate.disabled = true;
        btnStudentUpdate.style.cursor = 'not-allowed';
    } else {
        btnStudentUpdate.disabled = true;
        btnStudentUpdate.style.cursor = 'not-allowed';
    }

    if (!userPrivilege.insert) {
        btnStudentSubmit.disabled = true;
        btnStudentSubmit.style.cursor = 'not-allowed';
    }

    selectStatus.value = true;
    student.status = selectStatus.value;
    selectStatus.style.border = "2px solid green";

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


    student = JSON.parse(JSON.stringify(ob));
    oldStudent = JSON.parse(JSON.stringify(ob));


    console.log('refill');
    $('#modalStudentAdd').modal('show');


    textFirstName.value = student.firstname;
    textLastName.value = student.lastname;
    textDOB.value = student.dob;
    textAddress.value = student.address;
    textMobile.value = student.mobile;
    textNote.value = student.note;
    selectGender.value = student.gender;
    selectStatus.value = student.status;

    // fillDataIntoSelect(selectGuardian,'select guardian',guardians,'firstname',student.guardian_id.firstname);
    // fillDataIntoDataList(dataListItems, guardians,'nic','firstname',student.guardian_id.nic);
    textGuardianName.value = student.guardian_id.nic + " " + student.guardian_id.firstname;

    // selectGuardian
    fillDataIntoSelect(selectGrade, 'select grade', grades, 'name', student.grade_id.name);
    // selectGrade

    if (!userPrivilege.update) {
        btnStudentUpdate.disabled = true;
        btnStudentUpdate.style.cursor = 'not-allowed';
    } else {
        btnStudentUpdate.disabled = false;
        btnStudentUpdate.style.cursor = 'pointer';
    }

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
    console.log('delete');

    tableStudent.children[1].children[rowIndex].style.backgroundColor = 'pink';
    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following student \n'
            + '\n first name is ' + ob.firstname
            + '\n last name is ' + ob.lastname
            + '\n guardian is ' + ob.guardian_id.firstname
            + '\n dob is ' + ob.dob
            + '\n gender is ' + ob.gender
            + '\n address is ' + ob.address
            + '\n grade is ' + ob.grade_id.name
            + '\n student status is' + ob.status
        );
        if (userConfirm) {
            const deleteServerResponse = ajaxDeleteRequest('/student', ob);
            if (deleteServerResponse == 'ok') {
                alert('delete successful')
            } else {
                alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
            }
        }
        refreshStudentTable();
    }, 500)
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

// create function for check error
const checkFormErrors = () => {
    let errors = '';

    if (student.firstname == null) {
        errors = errors + ' first name cannot be empty \n';
        textFirstName.classList.add('is-invalid');
    }
    if (student.lastname == null) {
        errors = errors + 'last name cannot be empty \n';
        textLastName.classList.add('is-invalid');
    }
    if (student.dob == null) {
        errors = errors + 'date of birth cannot be empty \n';
        textDOB.classList.add('is-invalid')
    }
    if (student.gender == null) {
        errors = errors + 'gender cannot be empty \n';
        selectGender.classList.add('is-invalid');
    }
    if (student.address == null) {
        errors = errors + 'address cannot be empty \n';
        textAddress.classList.add('is-invalid');
    }
    if (student.status == null) {
        errors = errors + 'status cannot be empty \n';
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//create function for student submit
const studentSubmit = () => {
    console.log(student);

    const errors = checkFormErrors();
    if (errors == '') {
        //if errors not available
        const userConfirm = confirm('are you sure to add this student \n'
            + '\n first name is ' + student.firstname
            + '\n last name is ' + student.lastname
            + '\n guardian is ' + student.guardian_id.firstname
            + '\n date of birth is ' + student.dob
            + '\n gender is ' + student.gender
            + '\n address is ' + student.address
            + '\n grade is ' + student.grade_id.name
            + '\n student status is' + student.status
        );
        //get user confirmation
        if (userConfirm) {
            //call post service
            let serverResponse = ajaxPostRequest("/student", student);
            if (serverResponse == "ok") {
                alert("student added successfully")
                $('#modalStudentAdd').modal('hide');
                refreshStudentForm();
                refreshStudentTable();
            } else {
                alert('student add unsuccessful please check again' + serverResponse);
            }
        }
    } else {
        alert('you might have some errors \n ' + errors);
        // swal.fire({title:'you might have some errors \n '+errors, icon:'error'})
    }

}

//define function for check form update
const checkStudentFormUpdate = () => {
    console.log('checking update called')
    let updates = '';

    if (student.guardian_id.firstname != oldStudent.guardian_id.firstname) {
        updates = updates + "guardian is changed \n";
    }
    if (student.firstname != oldStudent.firstname) {
        updates = updates + "student's firstname is changed \n";
    }
    if (student.lastname != oldStudent.lastname) {
        updates = updates + "student's last name is changed \n";
    }
    if (student.dob != oldStudent.dob) {
        updates = updates + "date of birth is changed \n"
    }
    if (student.gender != oldStudent.gender) {
        updates = updates + "gender is changed \n"
    }
    if (student.address != oldStudent.address) {
        updates = updates + "address is changed \n";
    }
    if (student.mobile != oldStudent.mobile) {
        updates = updates + "mobile is changed \n"
    }
    if (student.grade_id.name != oldStudent.grade_id.name) {
        updates = updates + "grade is changed \n"
    }
    if (student.status != oldStudent.status) {
        updates = updates + "status is changed \n"
    }
    if (student.note != oldStudent.note) {
        updates = updates + "note is changed \n";
    }

    return updates;
}

//define function for student update
const buttonStudentUpdate = () => {
    console.log('update')
    let updates = checkStudentFormUpdate();
    if (updates == '') {
        alert('nothing to update');
    } else {
        //get user confirmation
        const userConfirm = confirm('are you sure to update this student \n' + updates);
        if (userConfirm) {
            //call put service
            let putServiceResponse = ajaxPutRequest("/student", student);
            if (putServiceResponse == "ok") {
                alert("update successful");
                refreshStudentForm();
                $('#modalStudentAdd').modal('hide');
                refreshStudentTable();
            } else {
                alert("error happened please retry \n" + putServiceResponse);
            }
        }
    }
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

    students = ajaxGetRequest("/student/findall");

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






















