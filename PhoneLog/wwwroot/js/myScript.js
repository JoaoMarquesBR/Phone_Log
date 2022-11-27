



$(() => { // main jQuery routine - executes every on page load, $ is short for jquery

    $("#loginButton").click(async (e) => {
        var username = $("#usernameTF").val();
        var password = $("#passwordTF").val();

        //check if its valid
        try {
            let testBody
            let response = await fetch(`api/login/${username},${password}`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(testBody),
            });


            let myData = await response.json();
            myData = JSON.stringify(myData);
            
         if (myData >=0) {
             sessionStorage.setItem("accountID", myData)
             $("#loginContainer").hide();
             $("#userList").show(); 
             getAll("");
          } else {
              console.log("username or password is wrong!")
          }
        } catch (error) {
            // catastrophic
            console.log("error "+ error )
            console.log("DID NOT OCCUR ")
        }


    });


    $("#CreateForm").click(() => {
        console.log("creating log?")
      
        $("#myModal").modal("toggle");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log("Teste date as " + today)

    });


    $("#AddUser").click( () => {
        $("#addModal").modal("toggle");
    });

    $("#addUsername").click(async (e) => {
        console.log("adding")
        var username = $("#TextBoxUsername").val();
        var password = $("#TextBoxUserPassword").val();

        //check if its valid
        try {
            let testBody
            let response = await fetch(`api/login/${username},${password}`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(testBody),
            });


            let myData = await response.json();
            myData = JSON.stringify(myData);

           







        } catch (error) {
            // catastrophic
            console.log("error " + error)
            console.log("DID NOT OCCUR ")
        }


    });


    $("#SubmitForm").click(async (e) => {

        let accountID = sessionStorage.getItem("accountID");

        myForm = new Object();
        myForm.accountID = accountID;
        myForm.formID = -1;
        myForm.companyName = $("#TextBoxCompany").val();
        myForm.repName = $("#TextBoxRep").val();
        myForm.callLength = $("#TextBoxLength").val();
        myForm.callDesc = $("#TextBoxNote").val();

   
        let checkBoxNotMaked = true;


        

        if (document.getElementById('issueSolved').checked) {

            myForm.issueSolved = "Yes";
        } else if (document.getElementById('issueNotSolved').checked) {
            myForm.issueSolved = "No";
        } else {
            checkBoxNotMaked = false;
        }


        if (document.getElementById('NeedFollowUp').checked) {
            myForm.followUp = "Yes";
        } else if (document.getElementById('NoNeedFollowUp').checked) {
            myForm.followUp = "No";
        } else {
            checkBoxNotMaked = false;
        }



        myForm.callDate = new Date().toJSON;

        //console.log("Sending " + JSON.stringify(myForm))

        console.log(checkBoxNotMaked)

        if (checkBoxNotMaked==false) {
            console.log("Needs to mark checkboxes")
        } else {


          let response = await fetch("api/form", {
                    method: "post",
                    headers: {
                        "content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(myForm)
          });
            console.log("added")
           $("#myModal").modal("toggle");
            getAll("");

        }
    });

    $("#NeedFollowUp").click(() => {
        $("#NoNeedFollowUp").prop("checked", false);
    });

    $("#NoNeedFollowUp").click(() => {
        $("#NeedFollowUp").prop("checked", false);
    })


    $("#issueSolved").click(() => {
        $("#issueNotSolved").prop("checked", false);

    });

    $("#issueNotSolved").click(() => {
        $("#issueSolved").prop("checked", false);
    })


    const getAll = async (msg) => {
        console.log("getAll()")
        try {
            //$("#studentList").text("Finding Student Information...");
            let accountID = sessionStorage.getItem("accountID")
            let response = await fetch(`api/form/${accountID}`);
            if (response.ok) {
                let payload = await response.json(); // this returns a promise, so we await it
                buildStudentList(payload);
                //msg === "" ? // are we appending to an existing message
                //    $("#status").text("Students Loaded") : $("#status").text(`${msg} - Students Loaded`);
            } else if (response.status !== 404) { // probably some other client side error
                let problemJson = await response.json();
                errorRtn(problemJson, response.status);
            } else { // else 404 not found
            } // else
        } catch (error) {
            console.log("error in getall")
            $("#status").text(error.message);
        }
    }; // getAll




    

    const buildStudentList = (data) => {
        $("#logsList").empty();
        console.log("start build")

        let accountID = (sessionStorage.getItem("accountID"))
        //if (accountID == 1) {
        //    adm = $(`<button id="AddAccount" >Add new User</button>`);
        //    adm.appendTo($("#logsList"));   
        //} 
            //< button id = "CreateForm2" > Add User</button>
//        div = $(`<div class="list-group-item text-white bg-secondary row d-flex" id="status">Student Info</div>
// <div class= "list-group-item row d-flex text-center" id="heading">
// <div class="col-4 h4">Title</div>
//<div class="col-4 h4">First</div>
//<div class="col-4 h4">Last</div>
// </div>`);
        div = $(`

<div   class="list-group-item text-white bg-secondary row d-flex" id="status">Your Call Logs</div>
                <div class= "list-group-item row d-flex text-center" id="heading">
                <div class="col-2 h6">Company</div>
                <div class="col-2 h6">Date</div>
                <div class="col-2 h6">Call Length</div>
                <div class="col-2 h6">Needs follow up</div>
                <div class="col-2 h6">Solved</div>
`);
        div.appendTo($("#logsList"));

        sessionStorage.setItem("allLogs", JSON.stringify(data));
        data.forEach(form => {
 
            var formatDate = new Date((form.callDate)); 
            var dd = String(formatDate.getDate()).padStart(2, '0');
            var mm = String(formatDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = formatDate.getFullYear();
            formatDate = mm + '/' + dd + '/' + yyyy;
            console.log(formatDate)

            btn = $(`<button class="list-group-item row d-flex" id="${form.id}">`);
            btn.html(`<div class="col-2" id="logCompany${form.companyName}">${form.companyName}</div>
                        <div class="col-2" id="logDate${formatDate}">${formatDate}</div>
                        <div class="col-2" id="logLength${form.callLength}">${form.callLength}</div>
                        <div class="col-2" id="logFollowUp${form.followUp}">${form.followUp}</div>
                        <div class="col-2" id="logIssue${form.issueSolved}">${form.issueSolved}</div>
                `
            );
            btn.appendTo($("#logsList"));
        }); // forEach


        //<div class="col-4 h4">Call Time</div>

        //<div class="col-5" id="logTime${form.timeOfCall}">${form.timeOfCall}</div>

    }; // buildStudefirstntList
}); // jQuery re


