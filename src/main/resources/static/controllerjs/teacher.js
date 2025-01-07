window.addEventListener('load',()=>{
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/teacher")

    refreshTeacherForm()

    //call refresh table for teacher ui
    refreshTeacherTable();

    refreshBranchCollapseForm();


});

//define function for refresh teacher form
const refreshTeacherForm = ()=>{
    teacher = new Object();

    qualifications=ajaxGetRequest("/qualifications/findall");
    fillDataIntoSelect(selectQualification,'select qualification',qualifications,'name');

    branches=ajaxGetRequest("/branch/findall");
    fillDataIntoSelectObjectArrayWithTwoValues(selectBranch,'select branch',branches,'name','bank_id.name');

    teacherStatues=ajaxGetRequest("/teacherstatus/findall");
    fillDataIntoSelect(selectStatus,'select status',teacherStatues,'name');


    textFullName.style.border='2px solid #ced4da';
    textCallingName.style.border='2px solid #ced4da';
    textNic.style.border='2px solid #ced4da';
    textMobile.style.border='2px solid #ced4da';
    textLandNo.style.border='2px solid #ced4da';
    textEmail.style.border='2px solid #ced4da';
    textAddress.style.border='2px solid #ced4da';
    textSchool.style.border='2px solid #ced4da';
    selectDOB.style.border='2px solid #ced4da';
    textAccountName.style.border='2px solid #ced4da';
    textAccountNo.style.border='2px solid #ced4da';
    selectQualification.style.border='2px solid #ced4da';
    selectBranch.style.border='2px solid #ced4da';
    selectStatus.style.border='2px solid #ced4da';

    if (!userPrivilege.update){
        btnTeacherUpdate.disabled=true;
        btnTeacherUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.delete){
        btnTeacherAdd.disabled=true;
        btnTeacherAdd.style.cursor='not-allowed';
    }

    fillDataIntoSelect(selectStatus,'select status',teacherStatues,'name','working');
    selectStatus.disabled=true;
    teacher.teacherstatus_id=JSON.parse(selectStatus.value);
    selectStatus.style.border='2px solid green';

}


//define function for refresh branch collapse form
const refreshBranchCollapseForm=()=>{
    branchOB=new Object();

    textBranchCode.value=""
    textBranchCode.style.border="2px solid #ced4da";

    textBranchName.value=""
    textBranchName.style.border="2px solid #ced4da";

    banks=ajaxGetRequest("/bank/findall")
    fillDataIntoSelect(selectBank,"select bank",banks,'name')
    selectBank.style.border="2px solid #ced4da"
}


//define refresh teacher table
const refreshTeacherTable = ()=>{
    teachers=ajaxGetRequest("/teacher/findall")

    const displayProperty=[
        {dataType:'text',propertyName:'fullname'},
        {dataType:'text',propertyName:'callingname'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getTeacherStatus},
    ];

    fillDataIntoTable(tableTeacher,teachers,displayProperty,checkPrivilege,true)

};

const checkPrivilege = (innerOB)=>{
    if (innerOB.teacherstatus_id.name!='delete'){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}



//define function for get teacher status
const getTeacherStatus = (ob)=>{
    if (ob.teacherstatus_id.name=="working"){
        return "active";
    }else if (ob.teacherstatus_id.name=="resign"){
        return "resign"
    }else {
        return "delete"
    }
}

//define function for teacher refill
const teacherFormRefill = (ob,rowIndex)=>{
    console.log('refill '+ob+''+rowIndex)

    teacher=JSON.parse(JSON.stringify(ob));
    oldTeacher=JSON.parse(JSON.stringify(ob));

    $('#modalTeacherAdd').modal('show')

    selectStatus.disabled=false;    //refersh eke di disable karapu nisa methanadi disable false karala danawa

    qualifications=ajaxGetRequest("/qualifications/findall");
    fillDataIntoSelect(selectQualification,'select qualification',qualifications,'name',teacher.qualifications_id.name);

    branches=ajaxGetRequest("/branch/findall");
    fillDataIntoSelect(selectBranch,'select branch',branches,'name',teacher.branch_id.name);

    teacherStatues=ajaxGetRequest("/teacherstatus/findall");
    fillDataIntoSelect(selectStatus,'select status',teacherStatues,'name',teacher.teacherstatus_id.name);


    textFullName.value=teacher.fullname;
    textCallingName.value=teacher.callingname;
    textNic.value=teacher.nic;
    textMobile.value=teacher.mobile;
    textAddress.value=teacher.address;
    textSchool.value=teacher.teacherschool;
    selectDOB.value=teacher.birthdate;
    textAccountName.value=teacher.accountname;
    textAccountNo.value=teacher.accountnumber;

    if (teacher.email != null){
        textEmail.value=teacher.email
    }else {
        textEmail.value="";
    }

    if (teacher.landno!=null){
        textLandNo.value=teacher.landno
    }else {
        textLandNo.value="";
    }


    if (teacher.gender=="male"){
        radioMale.checked=true;
    }else {
        radioFemale.checked=true;
    }


};


const deleteTeacher = (ob,rowIndex)=>{
    console.log('delete'+ob+''+rowIndex);

    tableTeacher.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
        const userConfirm = confirm('are you sure to delete following teacher \n'
        + '\n full name is '+ob.fullname
        + '\n calling name is '+ ob.callingname
        + '\n nic  is '+ ob.nic
        + '\n mobile is '+ ob.mobile
        + '\n address is '+ ob.address
        );
        if (userConfirm){
            const deleteServerResponse = ajaxDeleteRequest("/teacher",ob);
            if (deleteServerResponse == 'ok'){
                alert('delete successful')
            }else {
                alert('delete unsuccessful you might have following errors \n'+deleteServerResponse)
            }
        }
        refreshTeacherTable();
    },500)

};

//define function for print teacher
const printTeacher=(ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let teachers = new Array(ob);

    const displayProperty=[
        {dataType:'text',propertyName:'fullname'},
        {dataType:'text',propertyName:'callingname'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getTeacherStatus},
    ];

    fillDataIntoTable(printTeacherTable,teachers,displayProperty,"",false);


    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printTeacherTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)



};

const checkFormErrors = ()=>{
    let errors='';
    if (teacher.fullname == null){
        errors = errors+'full name cannot be empty \n'
        textFullName.classList.add('is-invalid');
    }
    if (teacher.callingname == null){
        errors = errors+ 'calling name cannot be empty \n'
        textCallingName.classList.add('is-invalid');
    }
    if (teacher.nic ==  null){
        errors = errors+'nic cannot be empty \n'
        textNic.classList.add('is-invalid');
    }
    if (teacher.mobile == null){
        errors = errors+'mobile cannot be empty \n'
        textMobile.classList.add('is-invalid');
    }

    if (teacher.address == null){
        errors =errors+'address cannot be empty \n'
        textAddress.classList.add('is-invalid');
    }
    if (teacher.teacherschool == null){
        errors =errors+'school cannot be empty \n'
        textSchool.classList.add('is-invalid');
    }

    if (teacher.birthdate == null){
        errors=errors+'dob cannot be empty \n'
        selectDOB.classList.add('is-invalid');
    }

    if (teacher.accountname == null){
        errors =errors + 'account name cannot be empty \n'
        textAccountName.classList.add('is-invalid');
    }

    if (teacher.accountnumber == null){
        errors =errors+'account no cannot be empty \n'
        textAccountNo.classList.add('is-invalid');
    }

    if (teacher.qualifications_id == null){
        errors =errors+ 'qualifications cannot be empty \n'
        selectQualification.classList.add('is-invalid');
    }

    if (teacher.branch_id == null){
        errors =errors+'branch cannot be empty \n'
        selectBranch.classList.add('is-invalid');
    }
    if (teacher.teacherstatus_id == null){
        errors =errors+'status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for submit employee form
const teacherSubmit = ()=>{
    console.log(teacher)

    const errors = checkFormErrors();
    //if errors not available
    if (errors == ''){
        const userConfirm=confirm('are you sure to add this following teacher'
        +'\n fullname is'+teacher.fullname
        +'\n calling name is'+teacher.callingname
        +'\n nic is'+teacher.nic
        +'\n mobile is'+teacher.mobile
        +'\n address is'+teacher.address
        +'\n school is'+teacher.teacherschool
        +'\n birth date is'+teacher.birthdate
        +'\n gender is'+teacher.gender
        +'\n account name'+teacher.accountname
        +'\n account number'+teacher.accountnumber
        +'\n qualifications'+teacher.qualifications_id.name
        +'\n branch is'+teacher.branch_id.name
        +'\n status is'+teacher.teacherstatus_id.name
        )
        //get user confirmation
        if (userConfirm){
            postServiceResponse=ajaxPostRequest("/teacher",teacher)
            if (postServiceResponse=="ok"){
                alert('save success'+postServiceResponse);
                teacherForm.reset();
                refreshTeacherForm();
                $('#modalTeacherAdd').modal('hide');
                refreshTeacherTable();
            }else {
                alert('save not success'+postServiceResponse)
            }
        }
    }else {
        alert('you might have some errors \n'+errors);
    }
}


const checkTeacherUpdate = ()=>{
    let updates="";

    if (teacher.fullname != oldTeacher.fullname){
        updates=updates+"full name is updated \n"
    }
    if (teacher.callingname != oldTeacher.callingname){
        updates=updates+"calling name is updated \n";
    }
    if (teacher.nic != oldTeacher.nic){
        updates=updates+"nic is updated \n";
    }
    if (teacher.mobile != oldTeacher.mobile){
        updates=updates+"mobile number is updated \n";
    }
    if (teacher.landno != oldTeacher.landno){
        updates=updates+"land number is updated \n";
    }
    if (teacher.email != oldTeacher.email){
        updates=updates+"email is updated \n";
    }
    if (teacher.address!= oldTeacher.address){
        updates=updates+"address is changed \n";
    }
    if (teacher.teacherschool != oldTeacher.teacherschool){
        updates=updates+"teacher's school is updated \n"
    }
    if (teacher.birthdate != oldTeacher.birthdate){
        updates=updates+"birth date is updated \n";
    }
    if (teacher.gender != oldTeacher.gender){
        updates=updates+"gender is updated \n";
    }
    if (teacher.accountname != oldTeacher.accountname){
        updates=updates+"account name is changed \n";
    }
    if (teacher.accountnumber != oldTeacher.accountnumber){
        updates=updates+"account number is updated \n";
    }
    if (teacher.qualifications_id.name != oldTeacher.qualifications_id.name){
        updates=updates+"qualifications is updated \n";
    }
    if (teacher.branch_id.name != oldTeacher.branch_id.name){
        updates=updates+"branch name is updated \n";
    }
    if (teacher.teacherstatus_id.name != oldTeacher.teacherstatus_id.name){
        updates=updates+"teacher status is updated \n";
    }

    return updates;
}


//define function for update teacher form
const buttonFormUpdate = ()=>{
    console.log('update');
    let errors = checkFormErrors();
    if (errors==""){ //if errors are empty
        let updates = checkTeacherUpdate();
        if (updates==""){   //if updates are not available
            alert("nothing updated")
        }else {
            const userConfirm = confirm('are you sure to update following changes to teacher \n'+updates);
            if (userConfirm){
                let putServiceResponse=ajaxPutRequest("/teacher",teacher);
                if (putServiceResponse=="ok"){
                    alert("update success "+putServiceResponse);
                    teacherForm.reset();
                    refreshTeacherForm();
                    $('#modalTeacherAdd').modal('hide');
                    refreshTeacherTable();
                }else {
                    alert("update not success "+putServiceResponse);
                }
            }
        }
    }
}




//define function for full name validator
const textFullNameValidator =(fieldId,pattern)=>{
    const regPattern = new RegExp(pattern);
    if (fieldId.value != ""){
        if (regPattern.test(fieldId.value)){
            //set green color and log
            fieldId.style.border='2px solid green'
            console.log('ok');
            teacher.fullname = fieldId.value;
            //need to generate calling names
            fullNameValuePartList= fieldId.value.split(' ');
            dlNameParts.innerHTML='';
            fullNameValuePartList.forEach(element=>{
                const option = document.createElement('option');
                option.value = element;
                dlNameParts.appendChild(option);
            });



        }else {
            fieldId.style.border='2px solid red';
            console.log('error');
            teacher.fullname=null
        }
    }else {
        teacher.fullname=null;
        if (fieldId.required){
            fieldId.style.border='2px solid red';
        }else {
            fieldId.style.border='1px solid #ced4da';
        }
    }
}

//define function for calling name validator
const textCallingNameValidator =(fieldId)=>{
    const callingNameValue = fieldId.value;

    const index = fullNameValuePartList.map(element => element).indexOf(callingNameValue);
    console.log(index)
    if (index != -1){
        //valid
        fieldId.style.border='2px solid green';
        teacher.callingname = callingNameValue;
    }else {
        //invalid
        fieldId.style.border = '2px solid red';
        teacher.callingname = null;
    }
}


const printTeacherFullTable = ()=>{
    $("#printTeacherModel").modal('show');
    teachers=ajaxGetRequest("/teacher/findall")

    const displayProperty=[
        {dataType:'text',propertyName:'fullname'},
        {dataType:'text',propertyName:'callingname'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getTeacherStatus},
    ];

    fillDataIntoTable(printTeacherTable,teachers,displayProperty,"",false);

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
        "<body>"+printTeacherTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}



//define function for generate gender in guardian form using nic
const generateTeacherGender = (fieldId)=>{
    let  nicValue =  fieldId.value;
    let year,month,date
    let days;
    let dob;
    if (new RegExp('^(([0-9]{9}[VvXxSs])|([0-9]{12}))$').test(nicValue)){
        console.log("yes");

        if (nicValue.length==10){
            console.log("old");
            year="19"+nicValue.substring(0,2);
            days=nicValue.substring(2, 5);
            console.log(days+"old");
        }
        if (nicValue.length==12){
            console.log("new");
            year=nicValue.substring(0,4);
            days = nicValue.substring(4, 7);
            console.log(days+"new")
        }
        if (days<500){
            console.log("male");
            radioMale.checked=true
            teacher.gender="male";
            radioMale.style.border="2px solid green"
        }else if (days>500){
            console.log("female");
            radioFemale.checked=true
            teacher.gender="female";
            radioFemale.style.border="2px solid green"
        }


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
        teacher.birthdate=JSON.parse(JSON.stringify(selectDOB.value));
        selectDOB.style.border="2px solid green";

    }
}

const buttonBranchSubmit = ()=>{
    if (branchOB!=null){
        let userConfirm=confirm("are you sure to add branch name "+branchOB.name+" as a new branch ?")
        if (userConfirm){
            let postServerResponse=ajaxPostRequest("/branch",branchOB);
            if (postServerResponse=="ok"){
                alert("save success");

                branches=ajaxGetRequest("/branch/findall");
                fillDataIntoSelect(selectBranch,'select branch',branches,'name',textBranchName.value);
                teacher.branch_id=JSON.parse(selectBranch.value);
                selectBranch.style.border="2px solid green";

                refreshBranchCollapseForm();
                $('#collapseBranch').collapse('hide');
            }else {
                alert("error occured \n"+postServerResponse);
            }
        }
    }else {
        alert("error happened please recheck");
    }
}


const checkExistingByNIC = (fieldId)=>{
    let nicValue=fieldId.value;
    if (new RegExp('^(([0-9]{9}[VvXxSs])|([0-9]{12}))$').test(nicValue)){
        console.log("good nic to validate existing");

        let getServerResponse=ajaxGetRequest("/teacher/toverifyexistence/"+nicValue);
        if (getServerResponse==true){
            divNicText.classList.remove("d-none");
            divNicText.innerText="nic "+nicValue+" is already exists please recheck"
            divNicText.style.color="red";
        }else {
            divNicText.classList.remove("d-none");
            divNicText.innerText="nic "+nicValue+" is good it is not previously entered";
            divNicText.style.color="green";
        }


    }
}










