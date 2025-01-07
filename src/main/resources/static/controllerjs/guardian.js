window.addEventListener('load',()=>{
    //get privileges to check privileges on buttons
    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/guardian")


    //call refresh table function
    refreshGuardianTable();

    //call refresh guardian form
    refreshGuardianForm();
});


//define function for refresh table function
const refreshGuardianTable = ()=>{
    guardians=ajaxGetRequest("/guardian/findall")

    const displayProperty=[
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getGuardianStatus},
        {dataType:'function',propertyName:getGuardianType},
    ];

    fillDataIntoTable(tableGuardian,guardians,displayProperty,checkPrivileges,true)

}

const checkPrivileges = (innerOB)=>{
    if (innerOB.status!="0"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed'
    }
}

//define function for refresh guardian form
const refreshGuardianForm = ()=>{
    guardian = new Object();
    guardianForm.reset();

    guardianTypes=ajaxGetRequest("/guardiantype/findall")
    fillDataIntoSelect(selectGuardianType,'select guardian type',guardianTypes,'name');


    textFirstName.style.border='1px solid #ced4da';
    textLastName.style.border='1px solid #ced4da';
    textNic.style.border='1px solid #ced4da';
    textMobile.style.border='1px solid #ced4da';
    textLand.style.border='1px solid #ced4da';
    textAddress.style.border='1px solid #ced4da';
    selectGuardianType.style.border='1px solid #ced4da';
    selectGender.style.border='1px solid #ced4da';
    textWPAddress.style.border='1px solid #ced4da';
    textWPLandno.style.border='1px solid #ced4da';
    textPosition.style.border='1px solid #ced4da';
    selectStatus.style.border='1px solid #ced4da';
    textNote.style.border='1px solid #ced4da';


    selectStatus.value=true
    guardian.status=selectStatus.value;
    selectStatus.disabled=true;
    selectStatus.style.border="2px solid green";


    selectGender.disabled=true;

    if (!userPrivilege.update){
        btnGuardUpdate.disabled=true;
        btnGuardUpdate.style.cursor='not-allowed';
    }

    if (!userPrivilege.insert){
        btnGuardAdd.disabled=true
        btnGuardAdd.style.cursor='not-allowed';
    }


}

//define get guardian function
const getGuardianType = (ob)=>{
    if (ob.guardiantype_id.name=='father'){
        return '<p>father</p>';
    }else if (ob.guardiantype_id.name=='mother'){
        return '<p>mother</p>';
    }else {
        return '<p>other</p>';
    }
}

//define get guardian status
const getGuardianStatus = (ob)=>{
    if (ob.status){
        return '<p class="status-working">active</p>';
    }else {
        return '<p class="status-delete">delete</p>';
    }
}


//define function for guardian print
const printGuardian=(ob,rowIndex)=>{
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let guardians = new Array(ob);


    const displayProperty=[
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getGuardianStatus},
        {dataType:'function',propertyName:getGuardianType},
    ];

    fillDataIntoTable(printGuardianTable,guardians,displayProperty,'',false)

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printGuardianTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)

}


//define function for refill
const GuardianFormRefill = (ob,rowIndex)=>{
    guardian=JSON.parse(JSON.stringify(ob));
    oldGuardian=JSON.parse(JSON.stringify(ob));

    console.log("refill");
    $('#modalGuardianAdd').modal('show');




    textFirstName.value=guardian.firstname;
    textLastName.value=guardian.lastname;
    textNic.value=guardian.nic;
    textMobile.value=guardian.mobile;
    textLand.value=guardian.landno;
    textAddress.value=guardian.address;
    selectGender.value=guardian.gender;
    textWPAddress.value=guardian.wpaddress;
    textWPLandno.value=guardian.wplandno;
    textPosition.value=guardian.position;
    selectStatus.value=guardian.status;
    textNote.value=guardian.note;

    fillDataIntoSelect(selectGuardianType,'select guardian type',guardianTypes,'name',guardian.guardiantype_id.name)


}

//define function for check guardian update form
const checkGuardianUpdateForm = ()=>{
    let updates = '';

    if (guardian.firstname != oldGuardian.firstname){
        updates=updates+"first name is changed \n";
    }
    if (guardian.lastname != oldGuardian.lastname){
        updates=updates+"last name is changed \n";
    }
    if (guardian.nic != oldGuardian.nic){
        updates=updates+"nic is changed \n";
    }
    if (guardian.mobile != oldGuardian.mobile){
        updates=updates+"mobile is changed \n";
    }
    if (guardian.landno != oldGuardian.landno){
        updates=updates+"land number is changed \n"
    }
    if (guardian.address != oldGuardian.address){
        updates=updates+"address is changed \n";
    }
    if (guardian.guardiantype_id.name != oldGuardian.guardiantype_id.name){
        updates=updates+"guardian type is changed \n";
    }
    if (guardian.gender != oldGuardian.gender){
        updates=updates+"guardian's gender is changed \n";
    }
    if (guardian.wpaddress != oldGuardian.wpaddress){
        updates=updates+"workplace address is changed \n";
    }
    if (guardian.wplandno != oldGuardian.wplandno){
        updates=updates+"workplace land number is changed \n";
    }
    if (guardian.position != oldGuardian.position){
        updates=updates+"position is changed \n"
    }
    if (guardian.status != oldGuardian.status){
        updates=updates+"status is changed \n";
    }
    if (guardian.note != oldGuardian.note){
        updates=updates+"note is changed \n"
    }

    return updates;
}

// define function for update guardian
const buttonGuardianUpdate = ()=>{
    let updates = checkGuardianUpdateForm();
    if (updates == ""){
        alert("nothing to update")
    }else {
        //get user confirmation
        const userConfirm =confirm("are you sure to update this guardian \n"+updates);
        if (userConfirm){
            //call put service
            let putServiceResponse=ajaxPutRequest("/guardian",guardian);
            if (putServiceResponse == "ok"){
                alert("updated successfully");
                guardianForm.reset();
                refreshGuardianForm();
                $('#modalGuardianAdd').modal('hide');
                refreshGuardianTable();
            }else {
                alert("error happened please retry"+putServiceResponse);
            }
        }
    }
}

//define function for delete guardian
const buttonGuardianDelete = (ob,rowIndex)=>{
    console.log('delete');

    tableGuardian.children[1].children[rowIndex].style.backgroundColor='pink';
    setTimeout(function (){
        const userConfirm=confirm('are you sure to delete this following guardian \n'
        +"\n firstname is "+ob.firstname
        +"\n lastname is "+ob.lastname
        +"\n nic is "+ob.nic
        );
        if (userConfirm){
            //call delete service
            let deleteServiceResponse=ajaxDeleteRequest("/guardian",ob);
            if (deleteServiceResponse=="ok"){
                alert("delete successful")
            }else {
                alert("delete unsuccessful error happened"+deleteServiceResponse);
            }
        }
        refreshGuardianTable();
    },500)


}

//define function for guardian check errors
const guardianCheckErrors = ()=>{
    let errors="";

    if (guardian.firstname == null){
        errors=errors+'please enter first name \n';
    }

    if (guardian.lastname == null){
        errors=errors+'please enter last name \n';
    }


    return errors;
}


//define function for guardian submit
const buttonGuardianAdd = ()=>{
    let errors = guardianCheckErrors();
    if (errors == ""){
        let userConfirm =confirm("are you sure to add this guardian"
        +'\n first name is'+guardian.firstname
        +'\n last name is'+guardian.lastname
        +'\n nic is'+guardian.nic
        +'\n mobile is'+guardian.mobile
        +'\n address is'+guardian.address
        +'\n guardian type is'+guardian.guardiantype_id.name
        +'\n gender is'+guardian.gender
        +'\n status is'+guardian.status
        );
        if (userConfirm){
            let serverResponse=ajaxPostRequest("/guardian",guardian)
            if (serverResponse=="ok"){
                alert("save success "+serverResponse);
                refreshGuardianTable();
                guardianForm.reset();
                refreshGuardianForm();
                $('#modalGuardianAdd').modal('hide');

            }else {
                alert("save not success"+serverResponse);
            }
        }
    }else {
        alert("you might have following errors "+errors);
    }
}

const printGuardianFullTable = ()=>{
    $("#printGuardianModel").modal('show');
    guardians=ajaxGetRequest("/guardian/findall")

    const displayProperty=[
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getGuardianStatus},
        {dataType:'function',propertyName:getGuardianType},
    ];

    fillDataIntoTable(printGuardianTable,guardians,displayProperty,'',false)


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
        "<body>"+printGuardianTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)

}


//define function for generate gender in guardian form using nic
const generateGuardianGender = (fieldId)=>{
    let  nicValue =  fieldId.value;
    let days;
    if (new RegExp('^(([0-9]{9}[VvXxSs])|([0-9]{12}))$').test(nicValue)){
        console.log("yes");

        if (nicValue.length==10){
            console.log("old");
            days=nicValue.substring(2, 5);
            console.log(days+"old");
        }
        if (nicValue.length==12){
            console.log("new");
            days = nicValue.substring(4, 7);
            console.log(days+"new")
        }
        if (days<500){
            console.log("male");
            selectGender.value=true
            guardian.gender=selectGender.value;
            selectGender.style.border="2px solid green";
        }else if (days>500){
            console.log("female");
            selectGender.value=false
            guardian.gender=selectGender.value;
            selectGender.style.border="2px solid green";
        }

    }
}
