window.addEventListener('load',()=>{

    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/enrolment")


    refreshEnrolmentForm();

    refreshEnrolmentTable();
})

//define refresh Enrolment Table
const refreshEnrolmentTable = ()=>{
    enrolments=ajaxGetRequest("/enrolment/findall");
    displayProperty=[
        {dataType:'text',propertyName:'enrolmentnum'},
        {dataType:'function',propertyName:getTotalClassIncome},
        {dataType:'function',propertyName:getTotalServiceCharge},
        {dataType:'function',propertyName:getTotalAdditionalCharge},
        {dataType:'function',propertyName:getTotalToBePayed},
        {dataType:'function',propertyName:getPayedAmount},
        {dataType:'function',propertyName:getEnrolmentStatusId},
    ];
    fillDataIntoTable(tableEnrolment,enrolments,displayProperty,checkPrivilege,true)

    $('#tableEnrolment').dataTable();

}

const checkPrivilege = (innerOb)=>{
    if (innerOb.enrolmentstatus_id.name != 'not-active') {
        if (!userPrivilege.delete) {
            divModifyButtonDelete.className = 'd-none';
        }
    }
        else {
            divModifyButtonDelete.disabled=true;
            divModifyButtonDelete.style.cursor='not-allowed'

    }
}

const getTotalClassIncome = (ob)=>{
    return parseFloat(ob.totalclassincome).toFixed(2);
}

const getTotalServiceCharge = (ob)=>{
    return parseFloat(ob.totalservicecharge).toFixed(2);
}

const getTotalAdditionalCharge = (ob)=>{
    return parseFloat(ob.totaladditionalcharge).toFixed(2);
}

const getTotalToBePayed = (ob)=>{
return parseFloat(ob.totaltobepayed).toFixed(2);
}

const getPayedAmount = (ob)=>{
return parseFloat(ob.payedamount).toFixed(2);
}

const getEnrolmentStatusId = (ob)=>{
return ob.enrolmentstatus_id.name;
}



//define refresh enrolment form
const refreshEnrolmentForm = ()=>{
    formEnrolment.reset();
    enrolment= new Object();
    oldEnrolment = null;
    enrolment.classOfferings = new Array(); //define array for enrolment has class offerings

    teachers=ajaxGetRequest("/teacher/findall");
    fillDataIntoSelect(selectTeacher,'select teacher',teachers,'fullname');

    enrolmentStatuses=ajaxGetRequest("/enrolmentstatus/findall");
    fillDataIntoSelect(selectEnrolmentStatus,'select enrolment status',enrolmentStatuses,'name');

    //to set current month to month tag in html page - start

    const currentDate  = new Date();
    let currentMonth=currentDate.getMonth()+1;//because js give months starting from 0 january is 0 december is 11
    // if (currentMonth<10){
    //     currentMonth='0'+currentMonth
    // }
    const formattedMonth= currentMonth<10 ? `0${currentMonth}` : currentMonth; //format as MM format using ternary operator
    const currentYear = currentDate.getFullYear();
    const monthInput = document.getElementById('txtMonth');
    monthInput.value=`${currentYear}-${formattedMonth}`;
    monthInput.style.border='2px solid green';


    txtMonth.addEventListener('keydown', function(event) {
        event.preventDefault(); // Prevent typing
    });
    txtMonth.disabled=true;
    enrolment.month=txtMonth.value;
    //to set current month to month tag in html page - end

    textTotalIncome.value="";
    textTotalServiceCharge.value="";
    textTotalAdditionalCharge.value="";
    textToBePayed.value="";
    textPayedAmount.value="";
    selectEnrolmentStatus.value="";
    selectTeacher.value="";


    textTotalIncome.style.border="2px solid #ced4da"
    textTotalServiceCharge.style.border="2px solid #ced4da"
    textTotalAdditionalCharge.style.border="2px solid #ced4da"
    textToBePayed.style.border="2px solid #ced4da"
    textPayedAmount.style.border="2px solid #ced4da"
    selectEnrolmentStatus.style.border="2px solid #ced4da"
    selectTeacher.style.border="2px solid #ced4da"


    // call refresh inner item and table function
    refreshInnerFormAndTable();


    ////need to disable update button when form is refreshing
    btnUpdateEnrolment.disabled=true;
    btnUpdateEnrolment.style.cursor="not-allowed";       //ethakota cursor eka me symbol eken 🚫 pennnawa


    btnAddEnrolment.disabled=false;  //disable false ee kiyanne visible venna hadanawa
    btnAddEnrolment.style.cursor="pointer";      ////refill ekedi pointer not allowed dunna nisa thama methana pointer dunne ethakota cursor eka 👆 mehema pennanawa


    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnUpdateEnrolment.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnUpdateEnrolment.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }

    if (!userPrivilege.insert){ //insert eke privilege thiyeawada da nadda baluwa
        btnAddEnrolment.disabled=true;   //privilege naththam button eka disable
        btnAddEnrolment.style.cursor="not-allowed";  //pointer eka not allowed
    }


}
// define refresh inner form and table
const refreshInnerFormAndTable = ()=>{
    enrolmentHasClassOffering=new Object();
    oldenrolmentHasClassOffering=null;

    classOfferings=ajaxGetRequest("/classoffering/findall");
    fillDataIntoSelect(selectClassOffering,'select class offerings',classOfferings,'id');


    textClassFee.value="";
    textClassIncome.value="";
    textRegisteredStudentCount.value="";
    textPayedCount.value="";
    textFreeStudentCount.value="";
    textServiceCharge.value="";
    textAdditionalCharge.value="";


    selectClassOffering.style.border="2px solid #ced4da";
    textClassFee.style.border="2px solid #ced4da";
    textClassIncome.style.border="2px solid #ced4da";
    textRegisteredStudentCount.style.border="2px solid #ced4da";
    textPayedCount.style.border="2px solid #ced4da";
    textFreeStudentCount.style.border="2px solid #ced4da";
    textServiceCharge.style.border="2px solid #ced4da";
    textAdditionalCharge.style.border="2px solid #ced4da";

    let displayProperty=[
        {dataType:'function',propertyName:getClassOfferings},
        {dataType:'function',propertyName:getClassFee},
        {dataType:'function',propertyName:getClassIncome},
        {dataType:'function',propertyName:getRegisteredStudentCount},
        {dataType:'function',propertyName:getPayedStudentCount},
        {dataType:'function',propertyName:getFreeStudentCount},
        {dataType:'function',propertyName:getServiceCharge},
        {dataType:'function',propertyName:getAdditionalCharge},
    ]
    fillDataIntoTableInnerTable(tableClassOfferings,enrolment.classOfferings,displayProperty,refillInnerForm,deleteInnerRow);

}

const getClassOfferings = (ob)=>{
    return ob.classoffering_id.classname;
}

const getClassFee = (ob)=>{
    return parseFloat(ob.classfee).toFixed(2);
}

const getClassIncome = (ob)=>{
    return parseFloat(ob.classincome).toFixed(2);
}

const getRegisteredStudentCount = (ob)=>{
    return ob.regstudentcount;

}

const getPayedStudentCount = (ob)=>{
    return ob.payedcount;
}

const getFreeStudentCount = (ob)=>{
    return ob.freestudentscount;

}

const getServiceCharge = (ob)=>{
    return parseFloat(ob.servicecharge).toFixed(2);

}

const getAdditionalCharge = (ob)=>{
    return parseFloat(ob.additionalcharge).toFixed(2);

}




const refillInnerForm = (ob,rowIndex)=>{
    classOfferings=ajaxGetRequest("/classoffering/findall");
    fillDataIntoSelect(selectClassOffering,'select class offerings',classOfferings,'classname',ob.classoffering_id.classname);


    textClassFee.value=ob.classfee;
    textClassIncome.value=ob.classincome;
    textRegisteredStudentCount.value=ob.regstudentcount;
    textPayedCount.value=ob.payedcount;
    textFreeStudentCount.value=ob.freestudentscount;
    textServiceCharge.value=ob.servicecharge;
    textAdditionalCharge.value=ob.additionalcharge;

}


const deleteInnerRow = (ob,index)=>{
    let userConfirm=confirm("are you sure to remove class offering \n");
    if (userConfirm){
        let extIndex = enrolment.classOfferings.map(clsof=>clsof.classoffering_id.id).indexOf(ob.classoffering_id.id);
        if (extIndex!=-1){
            enrolment.classOfferings.splice(extIndex,1);
            alert("item removed successfully");
            refreshInnerFormAndTable();
        }
    }
}
//need to review delete inner row and refill



//define inner form check errors
const checkInnerFormErrors=()=>{
    let errors="";
    if (enrolmentHasClassOffering.classoffering_id==null){
    errors=errors+"select class offering \n";
}

    return errors;

}

//define function for button inner form add
const buttonInnerAdd=()=>{
    console.log("add inner form");
    let errors=checkInnerFormErrors();
    if (errors==""){
        let userConfirm=confirm("are you sure to add following\n"
        +"\n class offering is "+enrolmentHasClassOffering.classoffering_id.classname
        );
        if (userConfirm){
            enrolment.classOfferings.push(enrolmentHasClassOffering)
            alert("class offerings added successfully")
            refreshInnerFormAndTable();
        }
    }else {
        alert("form has errors"+errors);
    }
}
//define function for delete enrolment
const deleteEnrolment =(ob,rowInd)=>{
    const userConfirm=confirm("are you sure to delete enrolment");
    if (userConfirm){
        let deleteServerResponse=ajaxDeleteRequest("/enrolment",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful "+deleteServerResponse);
            refreshEnrolmentTable();
            refreshEnrolmentForm();
            divModifyButton.className="d-none";
        }else {
            alert("you might have some errors \n "+deleteServerResponse);
        }
    }
}

const checkEnrolmentErrors= ()=>{
    let errors="";

    if (enrolment.month==null){
        errors=errors+"please select month \n";
    }
    if (enrolment.totalclassincome==null){
        errors=errors+"please add total class income \n";
    }
    if (enrolment.totalservicecharge==null){
        errors=errors+"please add total service charge \n";
    }
    if (enrolment.totaladditionalcharge==null){
        errors=errors+"please add total additional charge \n";
    }
    if (enrolment.totaltobepayed==null){
        errors=errors+"please add total to be payed \n";
    }
    if (enrolment.payedamount==null){
        errors=errors+"please add total payed amount \n"
    }
    if (enrolment.enrolmentstatus_id==null){
        errors=errors+"please select enrolment status \n";
    }
    if (enrolment.teacher_id==null){
        errors=errors+"please select teacher \n"
    }


    return errors;
}

//define function for add enrolment
const AddEnrolment = ()=>{
    console.log("wwwwww")
    console.log(enrolments);
    let errors = checkEnrolmentErrors();
    console.log("ooo")
    if (errors==""){
        let userConfirm=confirm("are you sure to add?")
        if (userConfirm) {
            let postServerResponse = ajaxPostRequest("/enrolment", enrolment);
            if (postServerResponse=="ok"){
                alert("added successfully \n"+postServerResponse);
                $("#modalEnrolmentAdd").modal('hide');
                refreshEnrolmentForm();
                refreshEnrolmentTable();
            }else {
                alert("error occurred \n"+postServerResponse);
            }
        }
    }else {
        alert("errors available"+errors);
    }
}





















