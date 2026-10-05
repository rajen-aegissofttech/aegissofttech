/*=========== Chate JS =============*/
var timerUndo;
//var groupid = 0;
//var visitorid = 0;
//var isneedtoSendMessage = 1;
var connection;
var companyID = "4aea9f2a-aa86-4114-a3ab-88c05224314c";
var apiUrl = "https://chatbot.aegisisc.in/";
var host = "wss://chatbot.aegisisc.in/ChatBox.ashx?userId=";




$(document).ready(function () {
    
    var groupid = sessionStorage.getItem("groupid");
    var visitorid = sessionStorage.getItem("visitorid");
    var isneedtoSendMessage = sessionStorage.getItem("isneedtoSendMessage");
    if (groupid == null || visitorid == null || isneedtoSendMessage == null) {
        sessionStorage.setItem("groupid", 0);
        sessionStorage.setItem("visitorid", 0);
        sessionStorage.setItem("isneedtoSendMessage", 1);
    }
    //$('#ProductType').multiselect({
    //    includeSelectAllOption: true,
    //    maxHeight: '300',
    //    buttonWidth: '288',
    //    nonSelectedText: 'Product Type'
    //});
    groupid = sessionStorage.getItem("groupid");
    visitorid = sessionStorage.getItem("visitorid");

    $.ajax({
        type: "GET",
        //headers: {
        //    'Access-Control-Allow-Origin': '*'
        //},
        //url:"@Url.Action("GetVisitorDetails", "Home")",
        url: apiUrl + "Home/GetVisitorDetailsCompany",//?CompanyID=" + companyID,
        data: { gid: groupid, vid: visitorid, CompanyID: companyID },
        success: function (response) {
            //alert(response);
            if (response.Item1 > 0 && response.Item2 > 0) {
                sessionStorage.setItem("groupid", response.Item1);
                sessionStorage.setItem("visitorid", response.Item2);
                //groupid = response.Item1;
                //visitorid = response.Item2;
                //isneedtoSendMessage = 0;
                sessionStorage.setItem("isneedtoSendMessage", 0);
                $('.chat-mail').addClass('hide');
                $('.chat-body').removeClass('hide');
                $('.chat-input').removeClass('hide');
                $('.chat-header-option').removeClass('hide');
                $('#inqformdiv').removeClass('inq');
                $('#inqformdiv').removeClass('info-box1');
                $('#conversationdiv').addClass('inq');
                $(".chat-box1 .inq").removeClass("active");
                $("#chat_form1").removeClass("contact");
                if (response.Item3) {
                    $('.chat-input').hide();
                    $('#close').show();
                    $('#leave').hide();
                } else {
                    $('.chat-input').show();
                    $('#close').hide();
                    $('#leave').show();
                    WebSocketInit();
                }

            } 
            //GetProducts();
        },
        failure: function (response) {
            alert(response.d);

        }
    });
    //var host = "wss://supportchat.aegisisc.in/ChatBox.ashx?userId=";
    $('#btnStartChat').click(function () {

        if ($.as_VerifyEmptyChat($('#txtChatName')) &
            $.as_VerifyEmptyChat($('#txtChatMobile')) &
            //$.as_VerifyEmptyChat($('#ChatProductType')) &
            checkChatEmail() &
            checkChatMobile() &
            $.as_VerifyEmptyChat($('#txtChatProblemStatement'))) {

            $('#inqformdiv').removeClass('inq');
            $('#inqformdiv').removeClass('info-box1');
            $('#conversationdiv').addClass('inq');
            $('#conversationdiv').addClass('info-box1');


            var datatoSend =
            {
                Name: $('#txtChatName').val(),
                Email: $('#txtChatEmail').val(),
                Mobile: $('#txtChatMobile').val(),
                ProductType: 'N/A',//$('#ChatProductType').val(), //.toString(),
                ProblemStatement: $('#txtChatProblemStatement').val()
            };
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: apiUrl + "Home/CreateGroupCompany",
                data: { model: datatoSend, CompanyID: companyID },
                success: function (response) {
                    if (response.Item1) {
                        sessionStorage.setItem("groupid", response.Item2);
                        sessionStorage.setItem("visitorid", response.Item3);
                        //groupid = response.Item2;
                        //visitorid = response.Item3;
                        $('.chat-mail').addClass('hide');
                        $('.chat-body').removeClass('hide');
                        $('.chat-input').removeClass('hide');
                        $('.chat-header-option').removeClass('hide');
                        $('#txtChatName').val('');
                        $('#txtChatName').addClass('removered-border');
                        $('#txtChatEmail').val('');
                        $('#txtChatEmail').addClass('removered-border');
                        $('#txtChatMobile').val('');
                        $('#txtChatMobile').addClass('removered-border');
                        $('#ChatProductType').val('');
                        $('#ChatProductType').addClass('removered-border');
                        //$('#ProductType').multiselect("deselectAll", false);
                        $('#txtChatProblemStatement').val('');
                        $('#txtChatProblemStatement').addClass('removered-border');
                        WebSocketInit();

                    } else {
                        alert(response.Item4);
                    }

                },
                failure: function (response) {
                    alert(response.d);
                }
            });
        }
        else {
            //return false;
        }
    });


    //Toggle fullscreen
    $(".chat-bot-icon").click(function (e) {
        
        // $(this).children('img').toggleClass('hide');
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');
        //$('.emoji-wysiwyg-editor').prop('contenteditable', 'true');
        //$('.emoji-wysiwyg-editor').height('45px');
        
        
    });
    //$('.chat-mail button').click(function () {
    //    $('.chat-mail').addClass('hide');
    //    $('.chat-body').removeClass('hide');
    //    $('.chat-input').removeClass('hide');
    //    $('.chat-header-option').removeClass('hide');
    //});
    //$('.end-chat').click(function () {
    //    $('.chat-body').addClass('hide');
    //    $('.chat-input').addClass('hide');
    //    $('.chat-session-end').removeClass('hide');
    //    $('.chat-header-option').addClass('hide');
    //});

});

function GetProducts() {
    debugger;
    $("#ChatProductType").empty();
    var trrow = '';
    trrow = trrow + "<option value=''>Select Services/Products</option>";
    $.ajax({
        type: 'POST',
        url: apiUrl + 'Home/GetProducts',
        dataType: 'json',
        data: { CompanyID: companyID },
        success: function (data) {
            $.each(data, function (i, item) {
                trrow = trrow + "<option value='" + item.Id.toString() + "'>" + item.TypeName + "</option>";
            });
            $('#ChatProductType').append(trrow);
        },
        error: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
            alert("StackTrace: " + r.StackTrace);
            alert("ExceptionType: " + r.ExceptionType);
            $('#ChatProductType').append(trrow);
        }

    });
}

function checkChatEmail() {
    var myemail = $.trim($('#txtChatEmail').val());
    if (myemail.length != 0) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(myemail)) {
            $('#txtChatEmail').addClass('red-border');
            $('#txtChatEmail').removeClass('removered-border');
            return false;
        } else {
            $('#txtChatEmail').removeClass('red-border');
            $('#txtChatEmail').addClass('removered-border');
            return true;
        }
    } else {
        $('#txtChatEmail').addClass('red-border');
        $('#txtChatEmail').removeClass('removered-border');
        return false;
    }
}

function checkProductType() {
    var selval = $('#ChatProductType').val();
    if (selval.length === 0) {
        $('.btn-group button').addClass('red-border');
        return false;
    } else {
        $('.btn-group button').removeClass('red-border');
        return true;
    }
}

function checkChatMobile() {
    var selval = $('#txtChatMobile').val();
    if (selval.length === 10) {
        $('#txtChatMobile').removeClass('red-border');
        $('#txtChatMobile').addClass('removered-border');
        return true;
    } else {
        $('#txtChatMobile').addClass('red-border');
        $('#txtChatMobile').removeClass('removered-border');
        return false;
    }
}

$.as_VerifyEmptyChat = function (elem) {
    var r = false;
    if (elem) {
        r = $.trim(elem.val()).length > 0;
        if (!r) {
            elem.addClass('red-border').val('');
            elem.removeClass('removered-border');
        } else {
            elem.removeClass('red-border');
            elem.addClass('removered-border');
        }
    }

    return r;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$('#txtChatName, #txtChatMobile, #txtChatProblemStatement').//, #ChatProductType').
    focusout(function () { $.as_VerifyEmptyChat($(this)); });

$('#txtChatEmail').blur(function () { checkChatEmail(); });
$('#txtChatMobile').blur(function () { checkChatMobile(); });


function WebSocketInit() {
    var groupid = sessionStorage.getItem("groupid");
    var visitorid = sessionStorage.getItem("visitorid");

    connection = new WebSocket(host + visitorid + "&isVisitor=true&CompanyID=" + companyID);
    connection.onopen = function () {
        var isneedtoSendMessage = sessionStorage.getItem("isneedtoSendMessage");
        if (isneedtoSendMessage == 1) {
            SendFirstMessage(visitorid);
        } else {
            LoadAllMessages();
        }
    }
    connection.onmessage = function (message) {
        var data = window.JSON.parse(message.data);
        if (data.Type == 2) {
            return;
        }
        if (data.Type == 5) {
            clearInterval(timerUndo);
        }
        if (data.Type == 4) {
            var mdata1 = window.JSON.parse(data.Message);
            connection.close();
            //isneedtoSendMessage = 1;
            sessionStorage.setItem("isneedtoSendMessage", 1);

            //$('#inqformdiv').addClass('inq');
            //$('#inqformdiv').addClass('info-box1');
            //$('#conversationdiv').removeClass('inq');
            //$('#conversationdiv').removeClass('info-box1');
            $('#txtChatName').val('');
            $('#txtChatName').removeClass('red-border');
            $('#txtChatName').addClass('removered-border');
            $('#txtChatEmail').val('');
            $('#txtChatEmail').removeClass('red-border');
            $('#txtChatEmail').addClass('removered-border');
            $('#txtChatMobile').val('');
            $('#txtChatMobile').removeClass('red-border');
            $('#txtChatMobile').addClass('removered-border');
            $('#ChatProductType').val('');
            $('#ChatProductType').removeClass('red-border');
            $('#ChatProductType').addClass('removered-border');
            //$('#ProductType').multiselect("deselectAll", false);
            $('#txtChatProblemStatement').val('');
            $('#txtChatProblemStatement').removeClass('red-border');
            $('#txtChatProblemStatement').addClass('removered-border');
            $('#msg').val('');
            $('.emoji-wysiwyg-editor').html('');
            if (mdata1.IsMessageFromVisitor) {
                $('#inqformdiv').addClass('inq');
                $('#inqformdiv').addClass('info-box1');
                $('#conversationdiv').removeClass('inq');
                $('#conversationdiv').removeClass('info-box1');
                $('.chat-input').show();
                $('#close').hide();
                $('#conversationdiv').css({ "top": "" });
                $('#leave').show();
                $('#messages').html('');
                $("#chat_form1").trigger('click');
            } else {
                $('.chat-input').hide();
                $('#close').show();
                $('#conversationdiv').css({ "top": "-340px" });
                $('#leave').hide();
            }
            return;
        }
        var mdata = window.JSON.parse(data.Message);
        var msg = mdata.Message.replace(/(?:\r\n|\r|\n)/g, '<br>');;
        if (mdata.IsMessageFromVisitor) {
            var message = ' <div class="message-box-holder me">' +
                '<div class="message-box">' +
                '<h5>' +
                mdata.VisitorUserName +
                '</h5>' +
                '<p>' +
                msg +
                '</p>' +
                '</div>' +
                '<div class="message-sender">' +
                '<span class="timer">' +
                mdata.CreatedOnWeb +
                ' </span>' +
                '</div></div>';
            $("#messages").append(message);
        } else {
            var message = '<div class="message-box-holder you">' +
                '<div class="message-box message-partner">' +
                '<h5>' +
                mdata.SupportUserName +
                '</h5>' +
                '<p>' +
                msg +
                '</p>' +
                '</div>' +
                '<div class="message-sender">' +
                '<span class="timer">' +
                mdata.CreatedOnWeb +
                ' </span>' +
                '</div></div>';
            $("#messages").append(message);
        }
        gotoLast();
    };


    clearInterval(timerUndo);
    timerUndo = setInterval(function () {


        $.ajax({
            type: "GET",
            //url: "@Url.Action("CheckMessage", "Chat")",
            url: apiUrl + "Chat/CheckMessage",
            data: { CompanyID: companyID },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response) {
                    clearInterval(timerUndo);
                } else {
                    var groupid = sessionStorage.getItem("groupid");
                    var visitorid = sessionStorage.getItem("visitorid");

                    var dataToSend = {
                        Id: 0,
                        GroupId: groupid,
                        GroupName: "",
                        SupportUserName: "",
                        VisitorUserName: "",
                        Message: "",
                        IsMessageFromVisitor: "true",
                        LocalId: "0",
                        CreatedOn: "",
                        SupportUserId: "",
                        VisitorUserId: visitorid,
                        CompanyId: companyID,
                    };
                    connection.send(window.JSON.stringify({
                        type: 5,
                        Message: dataToSend,
                        UserId: visitorid
                    }));
                }
            },
            failure: function (response) {

            }
        });
    },
        120000);
    // Connection opened
}

function sendMessage() {
    if (!$("#msg").val()) {
        return;
    }
    var groupid = sessionStorage.getItem("groupid");
    var visitorid = sessionStorage.getItem("visitorid");
    var dataToSend = {
        Id: 0,
        GroupId: groupid,
        GroupName: "",
        SupportUserName: "",
        VisitorUserName: "",
        Message: $('#msg').val(),
        IsMessageFromVisitor: "true",
        LocalId: "0",
        CreatedOn: "",
        SupportUserId: "",
        VisitorUserId: visitorid,
        CompanyId: companyID,
    };
    connection.send(window.JSON.stringify({ type: 0, Message: dataToSend, UserId: visitorid }));
    $('#msg').val('');    
}

function leaveChat() {
    if (confirm("Are You Sure you want to leave this conversation?")) {
        var groupid = sessionStorage.getItem("groupid");
        var visitorid = sessionStorage.getItem("visitorid");
        $.ajax({
            type: "GET",
            //url: "@Url.Action("LeaveChat", "Home")",
            url: apiUrl + "Home/LeaveChat",
            /*contentType: "application/json; charset=utf-8",*/
            dataType: "json",
            success: function (response) {
                debugger;
                if (response) {

                    var dataToSend = {
                        Id: 0,
                        GroupId: groupid,
                        GroupName: "",
                        SupportUserName: "",
                        VisitorUserName: "",
                        Message: "",
                        IsMessageFromVisitor: "true",
                        LocalId: "0",
                        CreatedOn: "",
                        SupportUserId: "",
                        VisitorUserId: visitorid,
                        CompanyId: companyID,
                    };
                    connection.send(window.JSON.stringify({
                        type: 4,
                        Message: dataToSend,
                        UserId: visitorid
                    }));
                    sessionStorage.setItem("groupid", 0);
                    sessionStorage.setItem("visitorid", 0);
                }
            },
            failure: function (response) {
            }
        });
    }

    $('#msg').val('');
}

function closeChat() {
    if (confirm("Are You Sure you want to leave this conversation?")) {
        $.ajax({
            type: "GET",
            //url: "@Url.Action("LeaveChat", "Home")",
            url: apiUrl + "Home/LeaveChat",
            /*contentType: "application/json; charset=utf-8",*/
            dataType: "json",
            success: function (response) {
                if (response) {
                    sessionStorage.setItem("groupid", 0);
                    sessionStorage.setItem("visitorid", 0);
                    $('#inqformdiv').addClass('inq');
                    $('#inqformdiv').addClass('info-box1');
                    $('#conversationdiv').removeClass('inq');
                    $('#conversationdiv').removeClass('info-box1');
                    $('.chat-input').show();
                    $('#close').hide();
                    $('#leave').show();
                    $('#messages').html('');
                    $("#chat_form1").trigger('click');
                }
            },
            failure: function (response) {
            }
        });
    }
}

function SendFirstMessage(visitorid) {
    LoadAllMessages();
    $.ajax({
        type: "Post",
        //url: "@Url.Action("GetVisitorFirstMessage", "Home")",
        url: apiUrl + "Home/GetVisitorFirstMessageCompany",
        data: { id: visitorid, CompanyID: companyID },
        success: function (response) {
            if (response) {
                var dataToSend = {
                    Id: response.Id,
                    GroupId: response.GroupId,
                    GroupName: response.GroupName,
                    SupportUserName: "",
                    VisitorUserName: response.VisitorUserName,
                    ProductType: response.ProductType,
                    Message: response.Message,
                    IsMessageFromVisitor: "true",
                    LocalId: "0",
                    CreatedOn: response.CreatedOn,
                    SupportUserId: "",
                    VisitorUserId: visitorid,
                    CompanyId: companyID,
                };

                connection.send(window.JSON.stringify({ type: 6, Message: dataToSend, UserId: visitorid }));


            }
        },
        failure: function (response) {

        }
    });

}

function LoadAllMessages() {
    var groupid = sessionStorage.getItem("groupid");
    var visitorid = sessionStorage.getItem("visitorid");
    $.ajax({
        type: "POST",
        //url: "@Url.Action("GetAllMessages", "Home")",
        url: apiUrl + "Home/GetAllMessagesCompany",
        data: { gid: groupid, vid: visitorid, CompanyID: companyID },//
        /*contentType: "application/json; charset=utf-8",*/
        dataType: "json",
        success: function (response) {
            if (response.length > 0) {
                for (i = 0; i < response.length; i++) {
                    if (response[i].IsMessageFromVisitor) {
                        //var message =
                        //    ' <div class="col-md-6 col-md-offset-6"><div class="sender_box"><p><b>' +
                        //        response[i].VisitorUserName +
                        //        '</b></p><p>' +
                        //        response[i].Message +
                        //        '<span style="float: right;">' +
                        //        response[i].CreatedOnstr +
                        //    '</span></p></div></div>';
                        var message = ' <div class="message-box-holder me">' +
                            '<div class="message-box">' +
                            '<h5>' +
                            response[i].VisitorUserName +
                            '</h5>' +
                            '<p>' +
                            response[i].Message +
                            '</p>' +
                            '</div>' +
                            '<div class="message-sender">' +
                            '<span class="timer">' +
                            response[i].CreatedOnstr +
                            ' </span>' +
                            '</div></div>';
                        $("#messages").append(message);

                    } else {
                        //var message =
                        //    ' <div class="col-md-6 " style="clear:both"><div class="recevier_box"><b>' +
                        //        response[i].SupportUserName +
                        //        '</b><p>' +
                        //        response[i].Message +
                        //        '<span style="float: right;">' +
                        //        response[i].CreatedOnstr +
                        //    '</span></p></div></div>';
                        var message = '<div class="message-box-holder you">' +
                            '<div class="message-box message-partner">' +
                            '<h5>' +
                            response[i].SupportUserName +
                            '</h5>' +
                            '<p>' +
                            response[i].Message +
                            '</p>' +
                            '</div>' +
                            '<div class="message-sender">' +
                            '<span class="timer">' +
                            response[i].CreatedOnstr +
                            ' </span>' +
                            '</div></div>';
                        $("#messages").append(message);

                    }

                }
                gotoLast();
                
                //$('.emoji-wysiwyg-editor').height('35px');
            }
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}

function gotoLast() {
    $('.chat-messages').animate({ scrollTop: $('.chat-messages').prop("scrollHeight") }, 500);
}

$('#msg').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        sendMessage();
    }
});   
$("#chat_form1").click(function () {

    if ($(".chat-box1").hasClass('active')) {
        $(".chat-box1").removeClass("active");
    }
    else {
        $(".chat-box1").addClass("active");
    }
    if ($(".chat-box1 .inq").hasClass('info-box1')) {
        $(".chat-box1 .inq").removeClass("info-box1");
        $("#chat_form1").removeClass("contact");
    } else {
        $(".chat-box1 .inq").addClass("info-box1");
        $("#chat_form1").addClass("contact");
    }
    if ($("#conversationdiv").hasClass('info-box1')) {
        gotoLast();
    }
    $("#rfp_form").removeClass("submitrfp");
    $(".chat-box1 .rfp").removeClass("info-box2");
});
