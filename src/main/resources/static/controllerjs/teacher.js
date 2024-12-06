window.addEventListener('load',()=>{
    //create teacher object
    teacher = new Object();
    //call refresh table for teacher ui
    refreshTeacherTable();

    qualifications=[
        {id:1,name:'degree'},
        {id:2,name:'HND'}
    ];
    fillDataIntoSelect(selectQualification,'select qualification',qualifications,'name')


    subjects=[
        {id:1,name:'sinhala'},
        {id:2,name:'IT'}
    ];
    fillDataIntoSelect(selectSubject,'select subject',subjects,'name')


    banks=[
        {id:1,name:'peoples'},
        {id:2,name:'sampath'},
    ];
    fillDataIntoSelect(selectBank,'select bank',banks,'name')
    branchs=[
        {id:1,name:'gampaha'},
        {id:2,name:'nugegoda'}
    ];
    fillDataIntoSelect(selectBranch,'select branch',branchs,'name')
    teacherstatuses=[
        {id:1,name:'working'},
        {id:2,name:'resign'},
        {id:3,name:'deleted'},
    ];
    fillDataIntoSelect(selectStatus,'select status',teacherstatuses,'name')



});

//define refresh teacher table
const refreshTeacherTable = ()=>{
    teachers=[
        {fullname:'kawshan virantha',callingname:'kawshan',nic:'200019502906',mobile:'0789096358',email:'kawshan@gmail.com',address:'no 44 colombo',schoolname:'de la salle colombo',qualification_id:{id:1,name:'degree'},subject_id:{id:1,name:'english'},dob:'1996-04-12',addeddate:'2023-12-12',accountno:'200100908073',accountname:'kawshan',bank_id:{id:1,name:'peoples'},branch_id:{id:1,name:'colombo'},teacherstatus_id:{id:1,name:'working'}}
    ];

    const displayProperty=[
        {dataType:'text',propertyName:'fullname'},
        {dataType:'text',propertyName:'callingname'},
        {dataType:'text',propertyName:'nic'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'email'},
        {dataType:'text',propertyName:'address'},
        {dataType:'function',propertyName:getTeacherStatus},
    ];

    fillDataIntoTable(tableTeacher,teachers,displayProperty,true)

};



//define function for get teacher status
const getTeacherStatus = (ob)=>{
    return ob.teacherstatus_id.name;
}

//define function for teacher refill
const teacherFormRefill = (ob,rowIndex)=>{
    console.log('refill '+ob+''+rowIndex)
};


const deleteTeacher = (ob,rowIndex)=>{
    console.log('delete'+ob+''+rowIndex);

    tableTeacher.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
        const userConfirm = confirm('are you sure to delete following employee \n'
        + '\n full name is '+ob.fullname
        + '\n calling name is '+ ob.callingname
        + '\n nic  is '+ ob.nic
        + '\n mobile is '+ ob.mobile
        + '\n email is '+ ob.email
        + '\n address is '+ ob.address
        );
        if (userConfirm){
            const deleteServerResponse = 'ok';
            if (deleteServerResponse == 'ok'){
                // alert('delete successful')
                swal.fire({title:'delete successful',icon:'success'});
            }else {
                alert('delete unsuccessful you might have following errors \n'+deleteServerResponse)
                swal.fire({title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse,icon: 'error'})
            }
        }
        refreshTeacherTable();
    },500)

};

//define function for print teacher
const printTeacher=(ob,rowIndex)=>{
    console.log('print');
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
    if (teacher.schoolname == null){
        errors =errors+'school cannot be empty \n'
        textSchool.classList.add('is-invalid');
    }
    if (teacher.qualification_id == null){
        errors =errors+ 'qualifications cannot be empty \n'
        selectQualification.classList.add('is-invalid');
    }
    if (teacher.subject_id == null){
        errors=errors+'subject cannot be empty \n'
        selectSubject.classList.add('is-invalid');
    }
    if (teacher.dob == null){
        errors=errors+'dob cannot be empty \n'
        selectDOB.classList.add('is-invalid');
    }
    if (teacher.addeddate == null){
        errors=errors+'added date cannot be empty \n'
        selectDateTime.classList.add('is-invalid');
    }
    if (teacher.accountno == null){
        errors =errors+'account no cannot be empty \n'
        textAccountNo.classList.add('is-invalid');
    }
    if (teacher.accountname == null){
        errors =errors + 'account name cannot be empty \n'
        textAccountName.classList.add('is-invalid');
    }
    if (teacher.bank_id == null){
        errors =errors+'bank cannot be empty \n'
        selectBank.classList.add('is-invalid');
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
    if (errors == ''){
        //if errors not available
        //get user confirmation
    }else {
        // alert('you might have some errors \n'+errors);
        swal.fire({
            title:'you might have some errors \n '+errors,
            icon:'error'
        });
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


