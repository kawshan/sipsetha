window.addEventListener('load',()=>{

    //call refresh user form function
    refreshUserForm();

    //call refresh user table function
    refreshUserTable();

});
//define function for refresh user table
const refreshUserTable = ()=>{
    users=ajaxGetRequest("/user/findall");


    const displayProperty=[
        {dataType:'function',propertyName:getEmployee},
        {dataType:'text',propertyName:'username'},
        // {dataType:'text',propertyName:'password'},
        // {dataType:'text',propertyName:'repassword'},
        {dataType:'text',propertyName:'email'},
        {dataType:'function',propertyName:getUserRole},
        {dataType:'function',propertyName:getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(tableUser,users,displayProperty,true)


}



//define function for refresh user form
const refreshUserForm = ()=>{

    user = new Object();
    formUser.reset();

    employeeWithoutUserAccount=ajaxGetRequest("/employee/withoutuseraccount")
    fillDataIntoSelect(selectEmployee,'select employee',employeeWithoutUserAccount,'fullname')

    roles=ajaxGetRequest("/role/findall")
    fillDataIntoSelect(selectRole,'select role',roles,'name');

    statuses=[
        {id:1,name:'active'},
        {id:2,name:'not-active'},
    ];

    fillDataIntoSelect(selectStatus,'select status',statuses,'name');


    selectEmployee.style.border='2px solid #ced4da';
    textUserName.style.border='2px solid #ced4da';
    textPassword.style.border='2px solid #ced4da';
    textRePassword.style.border='2px solid #ced4da';
    textEmail.style.border='2px solid #ced4da';
    selectRole.style.border='2px solid #ced4da';
    selectStatus.style.border='2px solid #ced4da';
}

//create function for get user status
const getUserStatus = (ob)=>{
    if (ob.status == '1'){
        return '<p class="status-working">'+'active'+'</p>';
    }else {
        return '<p class="status-working">'+   'not-active'   +'</p>';
    }
}


//define function for get employee
const getEmployee = (ob)=>{
   return ob.employee_id.fullname;
}

//create function for get user role
const getUserRole =(ob) =>{
    return 'role';
}

//create function for user form refill

const userFormRefill = (ob,rowIndex) =>{
    console.log('refill');
}

// create function for delete user
const deleteUser=(ob,rowIndex)=>{
    console.log('delete');

    tableUser.children[1].children[rowIndex].style.backgroundColor='pink';

    setTimeout(function (){
    const userConfirm = confirm('are you sure to delete following user \n'
    + '\n employee is '+ob.employee
    + '\n user name is '+ob.username
    + '\n status is '+ob.status
    );
    if (userConfirm){
        const deleteServerResponse = 'ok';
        if (deleteServerResponse == 'ok'){
            // alert('delete successful')
            swal.fire({title:'delete successful',icon:'success'});
        }else {
            // alert('delete was unsuccessful you might have following errors \n'+deleteServerResponse)
            swal.fire({title: 'delete was unsuccessful you might have following errors \n',icon: 'error'})
        }
    }
    refreshUserTable();
    },500)
};

//define function for print user
const printUser = ()=>{
    console.log('print');
}

//define function for user form check errors
const checkFormErrors = ()=> {
    let errors = '';
    if (user.employee == null){
        errors=errors+'employee cannot be empty \n'
        selectEmployee.classList.add('is-invalid');
    }
    if (user.username == null){
        errors=errors+'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    if (user.password == null){
        errors=errors+'password cannot be empty \n'
        textPassword.classList.add('is-invalid');
    }
    if (user.repassword == null){
        errors=errors+'re password cannot be empty \n'
        textRePassword.classList.add('is-invalid');
    }
    if (user.email == null){
        errors=errors+'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    // if (user.role_id == null){
    //     errors=errors+'role cannot be empty \n';
    //     selectRole.classList.add('is-invalid');
    // }
    if (user.status == null){
        errors=errors+'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for user form submit
const userSubmit = ()=>{
    console.log(user);
    const errors = checkFormErrors();
    if (errors == ''){
        //if errors not available
        //get user confirmation
    }else {
        swal.fire({
            title:'you might have some errors \n' +errors,
            icon:'error'
        })
    }
}


























































