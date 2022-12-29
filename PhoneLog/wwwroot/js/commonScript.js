// Script that's referred from both pages

//LOGIN page.

$(() => {

    $("#addUsername").click(async (e) => {
        var username = $("#TextBoxUsername").val();
        var name = $("#TextBoxName").val();

        var password = $("#TextBoxUserPassword").val();

        var permissionGroup = $("accountAccess").val();


        //check if its valid
        try {

            //check if username is in use
            //console.log("check username use ffirst")
            if (username.length < 4) {
                $("#addUserStatus").text("username needs more then 4 characters");
            } else {
                let responseID
                let response = await fetch(`api/login/checkUsername/${username}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    body: JSON.stringify(responseID),
                });
                responseID = await response.json();
                responseID = JSON.stringify(responseID);

                if (responseID >= 0) {
                    //username is already in use
                    //status username in use.
                    $("#addUserStatus").text("Username already in use");

                } else if (password.length < 4) {
                    $("#addUserStatus").text("password needs more then 4 characters");
                } else {
                    //username can be used ;) 
                    //console.log("trying to POST")
                    let testBody
                    let response = await fetch(`api/login/${username},${password},${name},${permissionGroup}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: JSON.stringify(testBody),
                    });


                    let myData = await response.json();
                    myData = JSON.stringify(myData);
                    $("#status").text("Account  " + username + " was inserted in the system")
                    $("#addModal").modal("toggle");


                }

            }
        } catch (error) {
            // catastrophic
            console.log("error " + error)
            //console.log("DID NOT OCCUR ")
        }

    });


})






