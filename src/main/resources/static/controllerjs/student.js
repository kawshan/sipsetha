window.addEventListener('load',()=>{
    student = new Object();


refreshStudentTable();

});

const refreshStudentTable = ()=>{
    students=[
        {id:1,regnumber:'000001',firstname:'kawshan',lastname:'virantha',age:12,gender:'male',address:'no55 kiribathgoda',mobile:'0722837355',status:'present'}
    ];

    const displayProperty=[
        // {dataType:'text',propertyName:'id'},
        {dataType:'text',propertyName:'regnumber'},
        {dataType:'text',propertyName:'firstname'},
        {dataType:'text',propertyName:'lastname'},
        {dataType:'text',propertyName:'age'},
        {dataType:'text',propertyName:'gender'},
        {dataType:'text',propertyName:'address'},
        {dataType:'text',propertyName:'mobile'},
        {dataType:'text',propertyName:'status'},

    ];

    fillDataIntoTable(tableStudent,students,displayProperty,true)

}

//create function for student refill
const studentFormRefill = (ob,rowIndex) =>{
    console.log('refill');
}


//create function for student delete
const deleteStudent = (ob,rowIndex)=>{
    console.log('delete');

    tableStudent.children[1].children[rowIndex].style.backgroundColor='pink';
    setTimeout(function (){
        const userConfirm =confirm('are you sure to delete following student \n'
        + '\n first name is' + ob.firstname
        + '\n last name is' + ob.lastname
        + '\n gender is' + ob.gender
        + '\n status is' + ob.status
        );
        if (userConfirm){
            const deleteServerResponse = 'ok';
            if (deleteServerResponse=='ok'){
                // alert('delete successful;')
                Swal.fire({ title:'delete successful', icon:'success'});
            }else {
                // alert('delete was unsuccessful you might have following errors \n' + deleteServerResponse)
                Swal.fire({ title: 'delete unsuccessful you might have following errors \n'+deleteServerResponse, icon: 'error'});
            }
        }
        refreshStudentTable();
    },500)
}

//create function for print student
const printStudent = (ob,rowIndex)=>{
    console.log('print');
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
        //get user confirmation
    }else {
        // alert('you might have some errors \n '+errors);
        swal.fire({title:'you might have some errors \n '+errors, icon:'error'})
    }

}































