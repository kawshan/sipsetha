const refreshProfileEditForm = ()=>{
    loggeduser=ajaxGetRequest("/loggeduser");
    oldloggeduser=null;

    txtUsrNm.value=loggeduser.username;
    txtEm.value=loggeduser.email;


    if (loggeduser.userphoto==null){//ee kiyanne user ta phooto ekak nathatm
        imgEmpPhoto.src="/icons/no-photo.png";
        textEmpPhoto.value="";
    }else {
        imgEmpPhoto.src=atob(loggeduser.userphoto);//btoa eken encrypt karanawa meken decrypt karanawa
        textEmpPhoto.value=""
    }


}

const submitUserSetting = ()=>{
    console.log(loggeduser)
    let updateServiceResponse=ajaxPutRequest("/changeuser",loggeduser);
    if (updateServiceResponse=="ok"){
    alert("user profile change successfully");
    window.location.replace("/logout");
    }else {
        alert("user profile change not successful have some errors \n"+updateServiceResponse);
    }
}