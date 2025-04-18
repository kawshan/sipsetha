window.addEventListener('load', () => {

    userPrivilege =ajaxGetRequest("/privilege/byloggeduser/user")

    //call refresh user form function
    refreshUserForm();

    //call refresh user table function
    refreshUserTable();

});
//define function for refresh user table
const refreshUserTable = () => {
    users = ajaxGetRequest("/user/findall");


    const displayProperty = [   //create array to display property and dataType to generate column in table
        {dataType: 'function', propertyName: getEmployee},
        {dataType: 'text', propertyName: 'username'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getUserRole},
        {dataType: 'function', propertyName: getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(tableUser, users, displayProperty, checkPrivilege,true);
    $('#tableUser').dataTable();


}

const checkPrivilege = (innerOb)=>{
    if (innerOb.status != "0"){
        if (!userPrivilege.delete){
            divModifyButtonDelete.className='d-none';
        }
    }else {
        divModifyButtonDelete.disabled=true;
        divModifyButtonDelete.style.cursor='not-allowed';
    }
}


//define function for refresh user form
const refreshUserForm = () => {

    user = new Object();    //define new object reason is for this to help with binding with front end
    user.roles = new Array(); //define empty array to store user roles
    formUser.reset();       //reset user form using reset function

    employeeWithoutUserAccount = ajaxGetRequest("/employee/withoutuseraccount")
    fillDataIntoSelect(selectEmployee, 'select employee', employeeWithoutUserAccount, 'fullname')

    // roles=ajaxGetRequest("/role/findall")
    // fillDataIntoSelect(selectRole,'select role',roles,'name');

    roleWithoutAdmin = ajaxGetRequest("/role/rolelistwithoutadmin");
    divRoles.innerHTML="";

    roleWithoutAdmin.forEach(role => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');

        div.className = 'form-check form-check-inline';
        input.type = 'checkbox';

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(role);
            } else {
                user.roles.pop(role);
            }
        }

        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);

    });


    // statuses = [
    //     {id: 1, name: 'active'},
    //     {id: 2, name: 'not-active'},
    // ];
    //
    // fillDataIntoSelect(selectStatus, 'select status', statuses, 'name');


    selectEmployee.style.border = '2px solid #ced4da';
    textUserName.style.border = '2px solid #ced4da';
    textPassword.style.border = '2px solid #ced4da';
    textRePassword.style.border = '2px solid #ced4da';
    textEmail.style.border = '2px solid #ced4da';
    // selectRole.style.border = '2px solid #ced4da';
    selectStatus.style.border = '2px solid #ced4da';


    ////need to disable update button when form is refreshing
    btnUpdateUser.disabled=true     //
    btnUpdateUser.style.cursor="not-allowed";       //ethakota cursor eka me symbol eken 🚫 pennnawa


    btnAddUser.disabled=false;  //disable false ee kiyanne visible venna hadanawa
    btnAddUser.style.cursor="pointer";      ////refill ekedi pointer not allowed dunna nisa thama methana pointer dunne ethakota cursor eka 👆 mehema pennanawa



    console.log(userPrivilege)  //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnUpdateUser.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnUpdateUser.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }
    if (!userPrivilege.insert){//insert eke privilege thiyeawada da nadda baluwa
        btnAddUser.disabled=true;//privilege naththam button eka disable
        btnAddUser.style.cursor="not-allowed";//pointer eka not allowed
    }


}

//create function for get user status
const getUserStatus = (ob) => {
    if (ob.status == '1') {
        return '<p class="status-working">' + 'active' + '</p>';
    } else {
        return '<p class="status-delete">' + 'not-active' + '</p>';
    }
}

//define function for get employee
const getEmployee = (ob) => {
    // return ob.employee_id.fullname;
    // return "employee";
    // return ob.employee_id.fullname;
    if (ob.employee_id != null){
        return ob.employee_id.fullname;
    }else {
        return "----";
    }
}

//create function for get user role
const getUserRole = (ob) => {
    // return 'role';
    let userRoles='';
    ob.roles.forEach(element=>{
        userRoles=userRoles+element.name+','// element kiyanne ekak eke name eka .name ekan gannawa
    });
    return userRoles;
}

//create function for user form refill

const userFormRefill = (ob, rowIndex) => {
    console.log('refill');
    user = JSON.parse(JSON.stringify(ob));
    oldUser = JSON.parse(JSON.stringify(ob));

    //open user model
    $('#modalUserAdd').modal('show');

    //set values into elements
    let employeeWithoutUserAccount=ajaxGetRequest("/employee/withoutuseraccount")
    employeeWithoutUserAccount.push(user.employee_id);
    fillDataIntoSelect(selectEmployee,'select employee',employeeWithoutUserAccount,'fullname',user.employee_id.fullname)
    selectEmployee.disabled=true;

    textUserName.value = user.username;

    textPassword.value=""
    // textPassword.disabled=true;

    textRePassword.value="";
    // textRePassword.disabled=true;

    textEmail.value=user.email;
    selectStatus.value=user.status;


    roleWithoutAdmin = ajaxGetRequest("/role/rolelistwithoutadmin");
    divRoles.innerHTML="";

    roleWithoutAdmin.forEach(role => {
        let div = document.createElement('div');
        let input = document.createElement('input');
        let label = document.createElement('label');

        div.className = 'form-check form-check-inline';
        input.type = 'checkbox';

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(role);
            } else {
                // user.roles.pop(role);
                let extIndex = user.roles.map(item => item.name).indexOf(role.name);
                if (extIndex != -1){
                    user.roles.splice(extIndex,1)
                }
            }
        }

        let extIndex = user.roles.map(item => item.name).indexOf(role.name);
        if (extIndex != -1){
           input.checked = true;
        }



        input.className = 'form-check-input';
        label.className = 'form-check-label fw-bold';
        label.innerText=role.name;

        div.appendChild(input);
        div.appendChild(label);
        divRoles.appendChild(div);

    });

    //enable btn update because we disabled that in refresh
    btnUpdateUser.disabled=false
    btnUpdateUser.style.cursor="pointer";
    //need to disable add button
    btnAddUser.disabled=true;
    btnAddUser.style.cursor="not-allowed";


    console.log(userPrivilege); //log ekak dala balanawa privilege monada kiyala
    if (!userPrivilege.update){ //privilege baluwa update eka karanna puluwan da ba da kiyala
        btnUpdateUser.disabled=true;    //update privilege eka naththam diable karala danawa button eke
        btnUpdateUser.style.cursor="not-allowed";   // pointer eka not allowed kiyala danawa
    }


}

// create function for delete user
const deleteUser = (ob, rowIndex) => {
    console.log('delete '+" object is "+ob+" row index is"+rowIndex);

    tableUser.children[1].children[rowIndex].style.backgroundColor = 'pink';

    setTimeout(function () {
        const userConfirm = confirm('are you sure to delete following user \n'
            + '\n employee is ' + ob.employee_id.fullname
            + '\n user name is ' + ob.username
            + '\n status is ' + ob.status
        );
        if (userConfirm) {
            const deleteServerResponse = ajaxDeleteRequest("/user",ob);
            if (deleteServerResponse == 'ok') {
                alert('delete successful');
                divModifyButton.className="d-none";
            } else {
                alert('delete was unsuccessful you might have following errors \n'+deleteServerResponse)
            }
        }
        refreshUserTable();
    }, 500)
};

//define function for print user
const printUser = (ob,rowIndex) => {
    console.log('print');
    console.log(ob);
    console.log(rowIndex);
    let users = new Array(ob);

    const displayProperty = [   //create array to display property and dataType to generate column in table
        {dataType: 'function', propertyName: getEmployee},
        {dataType: 'text', propertyName: 'username'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getUserRole},
        {dataType: 'function', propertyName: getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(printUserTable, users, displayProperty, "",false)

    let newWindow = window.open();
    newWindow.document.write(
        "<head>\n" +
        "    <link rel=\"stylesheet\" href=\"/bootstrap-5.2.3/css/bootstrap.min.css\">\n" +
        "    <script src=\"/bootstrap-5.2.3/js/bootstrap.bundle.min.js\"></script>\n" +
        "    <link rel=\"stylesheet\" href=\"/style/common.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/button.css\">\n" +
        "    <link rel=\"stylesheet\" href=\"/style/employee.css\">\n" +
        "</head>\n" +
        "<body>"+printUserTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)




}

//define function for user form check errors
const checkFormErrors = () => {
    let errors = '';
    if (user.employee_id == null) {
        errors = errors + 'employee cannot be empty \n'
        selectEmployee.classList.add('is-invalid');
    }
    if (user.username == null) {
        errors = errors + 'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    if (user.password == null) {
        errors = errors + 'password cannot be empty \n'
        textPassword.classList.add('is-invalid');
    }
    if (textRePassword.value == "") {
        errors = errors + 're password cannot be empty \n'
        textRePassword.classList.add('is-invalid');
    }
    if (user.email == null) {
        errors = errors + 'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    if (user.status == null) {
        errors = errors + 'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for check user update form  errors
const checkUserUpdateFormErrors = () => {
    let errors = '';
    // if (user.employee == null) {
    //     errors = errors + 'employee cannot be empty \n'
    //     selectEmployee.classList.add('is-invalid');
    // }
    if (user.username == null) {
        errors = errors + 'user name cannot be empty \n'
        textUserName.classList.add('is-invalid');
    }
    if (user.password == null) {
        errors = errors + 'password cannot be empty \n'
        textPassword.classList.add('is-invalid');
    }
    // if (user.repassword == null) {
    //     errors = errors + 're password cannot be empty \n'
    //     textRePassword.classList.add('is-invalid');
    // }
    if (user.email == null) {
        errors = errors + 'email cannot be empty \n'
        textEmail.classList.add('is-invalid');
    }
    if (user.status == null) {
        errors = errors + 'user status cannot be empty \n'
        selectStatus.classList.add('is-invalid');
    }
    return errors;
}

//define function for user form submit
const userSubmit = () => {
    console.log(user);
    const errors = checkFormErrors();
    //if errors not available
    if (errors == '') {
        //get user confirmation
        let UserConfirm=confirm('are you sure to add this user details \n'
        +'\n user name is'+user.username
        +'\n email is '+user.email
        +'\n status is '+user.status
        );
        if (UserConfirm){
            let serverResponse= ajaxPostRequest("/user",user);
            if (serverResponse=='ok'){
                alert("save successfully ");
                $('#modalUserAdd').modal('hide');
                refreshUserForm();
                formUser.reset();
                refreshUserTable();

            }else {
                alert("fail to add user. error happened \n"+serverResponse);
            }
        }


    } else {
        alert("you might have some errors\n"+errors);
    }
}

//define function for get user form update errors
const checkUserFormUpdate = ()=>{
    let updates = ''

    if (user.employee_id.id != oldUser.employee_id.id){
        updates=updates+'employee is changed \n'
    }

    if (user.username != oldUser.username){
        updates=updates+'username is updated \n'
    }
    if (user.email != oldUser.email){
        updates=updates+'email is updated \n';
    }

    if (user.status != oldUser.status){
        updates=updates+'status is changed \n';
    }


    if (user.password != oldUser.password){
        updates=updates+' password is changed \n';
    }


    if (user.roles.length != oldUser.roles.length){ // user roles kiyana array eke length eka samana nadda balanawa old user object eke thiyene roles array eke length ekata
        updates=updates+'user roles are changed \n';    // ehema nam updates kiyana varibale ekata add karagannawa in other words concat kara gannawa user roles are changed kiyala
    }else {     //length eka samana nam pahala tika wada karanawa
        let equalCount=0;   // equal count eka kiyala varibale eka hadala eka assign kara gannawa 0 kiyala
        for (let i=0; i<user.roles.length; i++){    // iita passe inner loop ekek liyala thiyenawa user roles eke legth ekata anuwa loop venna kiyala
            for (let j = 0; j < oldUser.roles.length; j++) {    //meka inner loop ekak old user ge roles tike length ekata loop venna
                if (user.roles[i].name == oldUser.roles[j].name){   // ee loop ekakadi user ge roles eke name eka samana unoth old user ge roles wala name walata
                    equalCount=equalCount+1;    // equal count eka ekak wadi venawa
                    break;  //eeta passe loop eka break karala nawaththala danawa
                }
            }
        }
        if (equalCount != user.roles.length){   //ee equal count eka user ge roles kiyana array eke length ekata samana naththam
            updates=updates+'user role is changed \n';  // update message ekata concat karanawa user role is changed kiyala
        }
    }


    return updates; //ee ta passe okkoma update tika add vecchcha messaje eka user ta display karanwa
}


//define function for user update
const userUpdate = ()=>{
    console.log('update');

    console.log(user);
    console.log(oldUser);

    //check form errors
    let errors = checkUserUpdateFormErrors();
    if (errors == ""){

        //check form updates
        let updates = checkUserFormUpdate();
        if (updates == ""){
            alert("nothing to update");
        }else {
            let userConfirm = confirm('are you sure to update this user changes \n'+updates);
            if (userConfirm){
                //call put service
                let putServiceResponse=ajaxPutRequest("/user",user);
                if (putServiceResponse=="ok"){
                    alert('update successful');
                    refreshUserTable();
                    formUser.reset();
                    $('#modalUserAdd').modal('hide');
                    refreshUserForm();
                    refreshUserTable();
                    divModifyButton.className="d-none";
                }else {
                    alert("fail to update. you might have some errors \n"+putServiceResponse)
                }
            }
        }


    }else {
        alert('user form has following errors \n'+errors);
    }


}


//define function for password retype validator
const passwordRetypeValidator = ()=>{
    // textPassword
    // textRePassword
    if (textPassword.value == textRePassword.value){
        textRePassword.style.border='2px solid green';
        user.password = textPassword.value;
    }else {
        textRePassword.style.border="2px solid red";
        user.password=null;
    }
}


const printUserFullTable = ()=>{
    $("#printUserModel").modal('show');

    users = ajaxGetRequest("/user/findall");


    const displayProperty = [   //create array to display property and dataType to generate column in table
        {dataType: 'function', propertyName: getEmployee},
        {dataType: 'text', propertyName: 'username'},
        {dataType: 'text', propertyName: 'email'},
        {dataType: 'function', propertyName: getUserRole},
        {dataType: 'function', propertyName: getUserStatus},
    ];

    // call fill data into table common function
    fillDataIntoTable(printUserTable, users, displayProperty, "",false)


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
        "<body>"+printUserTable.outerHTML+"</body> "
    );
    setTimeout(function (){ //settime out ekkk dunne uda table eka naththam print ui ea hariyata load venna one nisa thama minisecond 500 dunna ookooma bootstrap load vela ganata enna one nisa
        newWindow.stop();   //load vena eka nawaththuwa
        newWindow.print();  //print eka call kra
        newWindow.close();  //print rka open vela close krama close venawa
    },500)


}
























































