



$(() => { // main jQuery routine - executes every on page load, $ is short for jquery

    $("#loginButton").click(async (e) => {
        console.log("loggiiiin");
        var username = $("#usernameTF").val();
        var password = $("#passwordTF").val();
        //check if its validloglist
        try {
            let testBody;            
            let response = await fetch(`api/login/${username},${password}`, {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(testBody),
            });

            console.log(testBody)

            let myData = await response.json();
            myData = JSON.stringify(myData);
            $("#searchNav").show()


         if (myData >=0) {
             sessionStorage.setItem("accountID", myData)
             $("#loginContainer").hide();
             $("#userList").show(); 
             getAll("");
          } else {
             $("#LoginStatus").text("Credentials are not valid.")
         }
        } catch (error) {
            // catastrophic
            
            console.log("error " + error)
        }


    });

    $("#buttonDiv").click((e) => {
        let buttonClicked = e.target.id
        console.log(buttonClicked)
        if (buttonClicked==="AddUser") {
            $("#addModal").modal("toggle");
        } else if (buttonClicked === "UpdateAccount") {
            clearUpdateModal();
            $("#updateModal").modal("toggle");

        }
        else if (buttonClicked === "CreateForm") {
            $("#myModal").modal("toggle");
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            
        }

    });

    $("#addUsername").click(async (e) => {
        var username = $("#TextBoxUsername").val();
        var password = $("#TextBoxUserPassword").val();

        //check if its valid
        try {

            //check if username is in use
            console.log("check username use ffirst")
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

                if (responseID >=0) {
                    //username is already in use
                    //status username in use.
                    $("#addUserStatus").text("Username already in use");

                } else if (password.length < 4) {
                    $("#addUserStatus").text("password needs more then 4 characters");
                } else {
                    //username can be used ;) 
                    console.log("trying to POST")
                    let testBody
                    let response = await fetch(`api/login/${username},${password}`, {
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
        }catch (error) {
                // catastrophic
                console.log("error " + error)
                console.log("DID NOT OCCUR ")
         }

    });

    $("#recoverUser").click(async (e) => {


        var username = $("#Recover_TextBoxUsername").val();
        var password = $("#Recover_TextBoxUserPassword").val();
        var password_confirm = $("#Recover_TextBoxUserPassword_confirm").val();

        try {

            //check if username exists
            let responseID
            let response = await fetch(`api/login/checkUsername/${username}`, {
                method: "GET",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(responseID),
            });

            responseID = await response.json();
            responseID = JSON.stringify(responseID);

            console.log("usernameID = " + responseID)


            if (responseID < 0) {
                //notify account doesnt exist 
                $("#updateStatus").text("Username does not exist.")
            } else {
                //confirms if both passwords matches

             
                if (password !== password_confirm) {
                    $("#updateStatus").text("Both passwords must match.");

                    
                } else if (password.length <= 3) {
                    console.log("password is too short")
                    $("#updateStatus").text("username needs more then 4 characters");

                } else {
                   //if matches, update password using fetch,display success message and toggle it off
                    console.log("responseRecover...")
                    
                    let responseRecover = await fetch(`api/login/${username},${password}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                        body: JSON.stringify(responseID),
                    });
                    console.log("id the PUT")
                    responseID = await responseRecover.json();
                    responseID = JSON.stringify(responseID);
                    console.log("responseID = " + responseID)
                    if (responseID >= 1) {
                        $("#status").text("Account  " + username + " had password updated")
                        $("#updateModal").modal("toggle");

       

                    } else {
                        //probably the password is the same as previously
                        $("#updateStatus").text("username already has that password");

                    }


                }


            }

        } catch (error) {
            console.log("error??")

        }
    });


    $("#SubmitForm").click(async (e) => {

        let accountID = sessionStorage.getItem("accountID");

        myPurchase = new Object();
        myPurchase.accountID = accountID;

        myPurchase.supplier = $("#TextBoxSupplier").val();
        myPurchase.quantity = $("#TextBoxQuantity").val();
        myPurchase.productPrice = $("#TextBoxPrice").val();
        myPurchase.reference = $("#TextBoxReference").val();
        myPurchase.net = myPurchase.productPrice * myPurchase.quantity;       
   
        let checkBoxNotMaked = true;

     
        if (document.getElementById('includeTax').checked) {
            myPurchase.tax = 1.13
            myPurchase.totalAfterTax = myPurchase.tax * myPurchase.net
        } else if (document.getElementById('noTax').checked) {
            myPurchase.tax = 0
            myPurchase.totalAfterTax = myPurchase.net

        } else {
            checkBoxNotMaked = false;
        }

    


        myPurchase.purchaseDate = new Date();

        //console.log("Sending " + JSON.stringify(myForm))


        //if (checkBoxNotMaked==false) {
        //    console.log("Needs to mark checkboxes")
        //} else {
        
          let response = await fetch("api/purchase", {
                    method: "post",
                    headers: {
                        "content-type": "application/json; charset=utf-8"
                    },
              body: JSON.stringify(myPurchase)
          });
           $("#myModal").modal("toggle");
            getAll("");

        //}
    });



    $("#includeTax").click(() => {
        $("#noTax").prop("checked", false);
        updateTotal()
    });

    $("#noTax").click(() => {
        $("#includeTax").prop("checked", false);
        updateTotal()
    })


    const getAll = async (msg) => {
        try {
            //$("#studentList").text("Finding Student Information...");
            let accountID = sessionStorage.getItem("accountID")
            let response = await fetch(`api/purchase/${accountID}`);
            if (response.ok) {
                let payload = await response.json(); // this returns a promise, so we await it
                buildPurchasesForm(payload);
                //msg === "" ? // are we appending to an existing message
                //    $("#status").text("Students Loaded") : $("#status").text(`${msg} - Students Loaded`);
            } else if (response.status !== 404) { // probably some other client side error
                let problemJson = await response.json();
                errorRtn(problemJson, response.status);S
            } else { // else 404 not found
            } // else
        } catch (error) {
            console.log("error in getall")
            $("#status").text(error.message);
        }
    }; // getAll

    const buildPurchasesForm = (data, usealldata = true) => {

        $("#logsList").empty();
        let accountID = (sessionStorage.getItem("accountID"))

        $("#buttonDiv").empty();
        if (accountID == 1) {
            buttonDiv = $(`<button id="AddUser" data-toggle="addModal" data-target="addModal">Add Account</button>
                            <button id="UpdateAccount" data-toggle="myUpdateModal" data-target="myUpdateModal">Recover Account</button>`)
            //buttonDiv = $(`<button id="UpdateAccount" data-toggle="updateModal" data-target="updateModal">Recover Account</button>`)
            buttonDiv.appendTo("#buttonDiv")
        }
            

        buttonDiv = $(`
        <button id="CreateForm" data-toggle="myModal" data-target="myModal">Add Purchase</button>
        `)
        buttonDiv.appendTo("#buttonDiv")

        div = $(`

<div   class="list-group-item text-white bg-secondary row d-flex" id="status">Purchases</div>
              
<div class= "list-group-item row d-flex text-center" id="heading">
                <div class="col-3 h6">Supplier</div>
                <div class="col-3 h6">Buyer</div>
                <div class="col-3 h6">Net</div>
                <div class="col-3 h6">Date</div>
`);
        div.appendTo($("#logsList"));

        console.log(usealldata)
        usealldata ? sessionStorage.setItem("allLogs", JSON.stringify(data)) : console.log("null??");

        //sessionStorage.setItem("allLogs", JSON.stringify(data));
        data.forEach(async form => {

            let username
            let response = await fetch(`api/login/getUserByID/${form.accountID}`)
            if (response.ok) {
                let payload = await response.json(); // th
                username = payload.username
            }




            var formatDate = new Date((form.purchaseDate)); 
            var dd = String(formatDate.getDate()).padStart(2, '0');
            var mm = String(formatDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = formatDate.getFullYear();
            formatDate = mm + '/' + dd + '/' + yyyy;
           

            btn = $(`<button class="list-group-item row d-flex" id="${form.purchase_ID}">`);
            btn.html(`<div class="col-3" id="logCompany${form.supplier}">${form.supplier}</div>
                        <div class="col-3" id="logDate${username}">${username}</div>
                        <div class="col-3" id="logLength${form.net}">$${form.net}</div>
                        <div class="col-3" id="logLength${formatDate}">${formatDate}</div>
                `
            );
            btn.appendTo($("#logsList"));
        }); // forEach



        //<div class="col-4 h4">Call Time</div>

        //<div class="col-5" id="logTime${form.timeOfCall}">${form.timeOfCall}</div>

    }; // buildStudefirstntList


    $("#srch").keyup(() => {
        let alldata = JSON.parse(sessionStorage.getItem("allLogs"));
        let filtereddata = alldata.filter((stu) => stu.supplier.match(new RegExp($("#srch").val(), 'i')));
        buildPurchasesForm(filtereddata, false);
    }); 
    
    //$("#buyersrch").keyup(() => {
    //    let alldata = JSON.parse(sessionStorage.getItem("allLogs"));
    //    let filtereddata = alldata.filter((stu) => stu.supplier.match(new RegExp($("#srch").val(), 'i')));
    //    buildPurchasesForm(filtereddata, false);
    //}); 

    $("#userList").keyup(() => {
        updateTotal();

    }); // srch keyup

    const updateTotal = () =>{
        let quantity = $("#TextBoxQuantity").val();
        let productPrice = $("#TextBoxPrice").val();
        let tax = 1
        if (document.getElementById('includeTax').checked) {
            tax = 1.13
        }

        let totalValue = (quantity * productPrice) * tax
        $("#TextBoxTotalAfterTax").val(totalValue);

    }


    $("#userList").click(async (e) => {
       // clearModalFields();
        
        if (!e) e = window.event;
        let formID = e.target.parentNode.id;

        if (formID !== "status") {
            //formID = e.target.id;
        } // clicked on row somewhere else

        //$("#logModal").modal("toggle");

        let data = JSON.parse(sessionStorage.getItem("allLogs"))
        data.forEach(async (log) => {
            //console.log("comparing " + log.formID +" and "+formID)
            let username;
            if (log.purchase_ID === parseInt(formID)) {
                console.log("SAME")
                $("#logModal").modal("toggle");
                //let response = await fetch(`api/form/${accountID}`);
                let response = await fetch(`api/login/getUserByID/${log.accountID}`)
                if (response.ok) {
                    let payload = await response.json(); // th
                    console.log("response is " + payload.username)
                    username = payload.username
                }

                let date = log.purchaseDate
                date = date.substr(0,10)

                $("#view_supplier").val(log.supplier)
                $("#view_buyer").val(username);
                $("#view_reference").val(log.reference);
                $("#view_quantity").val(log.quantity);
                $("#view_productPrice").val("$"+log.productPrice);
                $("#view_tax").val(log.tax);
                $("#view_net").val("$" +log.net);
                $("#view_total").val("$" +log.totalAfterTax);

                $("#view_supplier").attr('readonly', true);
                $("#view_buyer").attr('readonly', true);
                $("#view_reference").attr('readonly', true);
                $("#view_quantity").attr('readonly', true);
                $("#view_productPrice").attr('readonly', true);
                $("#view_tax").attr('readonly', true);
                $("#view_net").attr('readonly', true);
                $("#view_total").attr('readonly', true);


            } else {
                //console.log(".")
            }

            //console.log(log)
        })


    }); 

    const clearUpdateModal = () => {

      $("#Recover_TextBoxUsername").val("");
      $("#Recover_TextBoxUserPassword").val("");
      $("#Recover_TextBoxUserPassword_confirm").val("");
      $("#addUserStatus").text("");

    }








}); // jQuery re


