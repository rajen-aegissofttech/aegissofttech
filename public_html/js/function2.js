function checkIt(t) {
    t = t ? t : window.event;
    var e = t.which ? t.which : t.keyCode;
    return e > 31 && (48 > e || e > 57) ? ((status = "This field accepts numbers only."), !1) : ((status = ""), !0);
}
!(function (t) {
    "use strict";
    t(document).ready(function (t) {
        function e() {
            t("#imgCaptcha").attr("src", "/Captcha.ashx?" + new Date().getTime()),
            t("#footer_imgCaptcha").attr("src", "/Captcha.ashx?" + new Date().getTime()),
                t("#imgCaptchaTrial").attr("src", t("#imgCaptcha").attr("src")),
                t("#imgCaptchaUpload").attr("src", t("#imgCaptcha").attr("src")),
                t("#imgSCaptcha").attr("src", t("#imgCaptcha").attr("src"));
            t("#imgConCaptcha").attr("src", t("#imgCaptcha").attr("src"));
        }

        function a() {
            t("#txtcomments").val("").removeClass("red-border").focus(),
                t("#txtcompany").val("").removeClass("red-border"),
                t("#txtfullname").val("").removeClass("red-border"),
                t("#txtphone").val("").removeClass("red-border"),
                t("#txtemail").val("").removeClass("red-border"),
                t("#txtskype").val("").removeClass("red-border"),
                t("#txtCaptcha").val("").removeClass("red-border"),
                e();
        }

        function aclear() {
            t("#footer_txtfullname").val("").removeClass("red-border").focus(),
                t("#footer_txtemail").val("").removeClass("red-border"),
                t("#footer_txtphone").val("").removeClass("red-border"),
                t("#footer_txtcompany").val("").removeClass("red-border"),
                t("#footer_txtcomments").val("").removeClass("red-border"),
                t("#footer_txtCaptcha").val("").removeClass("red-border"),
                e();
        }

        function a1() {
            t("#SEmail").val("").removeClass("red-border"),
                t("#SName").val("").removeClass("red-border"),
                t(".SAge").val("Under 18"),
                t(".SGender:checked").prop("checked", false),
                t("#SSubject").val("").removeClass("red-border"),
                t(".SApp:checked").prop("checked", false),
                t(".SKnowledge:checked").prop("checked", false),
                t("#SRelatedApp").val("").removeClass("red-border"),
                t("#SFeature").val("").removeClass("red-border"),
                t("#SMissFeature").val("").removeClass("red-border"),
                t("#txtSCaptcha").val("").removeClass("red-border"),
                e();
        }

        function r() {
            t("#contactfname").val("").removeClass("red-border").focus(),
                t("#contactlname").val("").removeClass("red-border"),
                t("#contactemail").val("").removeClass("red-border"),
                t("#contactsubject").val("").removeClass("red-border"),
                t("#contactcomments").val("").removeClass("red-border");
        }

        function n() {
            t("#txt2Name").val("").removeClass("red-border").focus(),
                t("#txt2Phone").val("").removeClass("red-border"),
                t("#txt2Email").val("").removeClass("red-border"),
                t("#txt2Subject").val("").removeClass("red-border"),
                t("#txt2Message").val("").removeClass("red-border"),
                t("#txt2Captcha").val("").removeClass("red-border"),
                e();
        }

        function conReset() {
            t("#txtConName").val("").removeClass("red-border").focus(),
                t("#txtConPhone").val("").removeClass("red-border"),
                t("#txtConEmail").val("").removeClass("red-border"),
                t("#txtConMessage").val("").removeClass("red-border"),
                t("#txtConCaptcha").val("").removeClass("red-border"),
                e();
        }

        function upsert(array, element) { // (1)
            const i = array.findIndex(_element => _element.page === element.page);
            if (i > -1) array[i] = element; // (2)
            else array.push(element);
        }

        function setpage() {
            var pagename = window.location.pathname;
            var dt = new Date();
            dt.setHours(dt.getHours() + 2);
            //dt.setMinutes(dt.getMinutes() + 2);
            var time = dt.getTime();
            var array = [];
            var datatoStore = {
                page: pagename,
                expiretime: time
            };
            array[0] = datatoStore;
            var storage = localStorage.getItem('pages');
            if (storage) {
                var storedarray = [];
                storedarray = JSON.parse(storage);               
                upsert(storedarray, datatoStore);               
                localStorage.setItem('pages', JSON.stringify(storedarray));
            }
            else {
                localStorage.setItem('pages', JSON.stringify(array));
            }
        }


        function o() {
            var e = t.trim(t("#contactemail").val());
            if (0 != e.length) {
                var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                return a.test(e) ? (t("#contactemail").removeClass("red-border"), !0) : (t("#contactemail").addClass("red-border"), !1);
            }
            return t("#contactemail").addClass("red-border"), !1;
        }

        function r1() {
            var e = t.trim(t("#SEmail").val());
            if (0 != e.length) {
                var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                return a.test(e) ? (t("#SEmail").removeClass("red-border"), !0) : (t("#SEmail").addClass("red-border"), !1);
            }
            return t("#SEmail").addClass("red-border"), !1;
        }
        function l() {
            var e = t.trim(t("#txtemail").val());
            if (0 != e.length) {
                var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                return a.test(e) ? (t("#txtemail").removeClass("red-border"), !0) : (t("#txtemail").addClass("red-border"), !1);
            }
            return t("#txtemail").addClass("red-border"), !1;
        }

        function c() {
            var e = t.trim(t("#txt2Email").val());
            if (0 != e.length) {
                var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                return a.test(e) ? (t("#txt2Email").removeClass("red-border"), !0) : (t("#txt2Email").addClass("red-border"), !1);
            }
            return t("#txt2Email").addClass("red-border"), !1;
        }
        function conEmail() {
            var e = t.trim(t("#txtConEmail").val());
            if (0 != e.length) {
                var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
                return a.test(e) ? (t("#txtConEmail").removeClass("red-border"), !0) : (t("#txtConEmail").addClass("red-border"), !1);
            }
            return t("#txtConEmail").addClass("red-border"), !1;
        }
        e(),
            t("#txtcomments, #txtphone, #txtskype, #txtCaptcha, #txtConName, #txtConPhone, #txtConMessage, #txtConCaptcha, #txtConEmail, #contactfname, #contactlname, #contactemail, #contactsubject, #contactcomments, #SEmail, #SName, #SSubject, #SRelatedApp, #SFeature, #SMissFeature, #txtSCaptcha").focusout(
                function () {
                    t.as_VerifyEmpty(t(this));
                }
            ),
            t("#txtEmail").blur(function () {
                l();
            }),
            t("#txtConEmail").blur(function () {
                conEmail();
            }),
            t("#SEmail").blur(function () {
                r1();
            }),
            (t.as_VerifyGenderCheck = function (t1) {
                var a = !1;
                return t1 && ((a = t.trim(t(".SGender:checked").val()).length > 0) ? t("#genderError").html("") : t("#genderError").html("please select Gender").focus()), a;
            }),
            (t.as_VerifyAppCheck = function (t1) {
                var a = !1;
                return t1 && ((a = t.trim(t(".SApp:checked").val()).length > 0) ? t("#appError").html("") : t("#appError").html("please select at least one option").focus()), a;
            }),
            (t.as_VerifyKnowledgeCheck = function (t1) {
                var a = !1;
                return t1 && ((a = t.trim(t(".SKnowledge:checked").val()).length > 0) ? t("#knowledgeError").html("") : t("#knowledgeError").html("please select at least one option").focus()), a;
            }),
            (t.as_2WeekSendQuote = function (e, a, r, n, o, l, c, oc, s, m) {
                var i = JSON.stringify({
                    name: e,
                    email: a,
                    phone: r,
                    subject: n,
                    message: o,
                    page: l,
                    captchaText: c,
                    originalCaptch : oc
                });
                t.as_CallService("Send2WeekInquiry", i, s, m);
            }),
            (t.as_SendConQuote = function (pname, pemail, pphone, pmessage, pcaptcha, oc, s, m) {
                var i = JSON.stringify({
                    name: pname,
                    email: pemail,
                    phone: pphone,
                    message: pmessage,
                    captchaText: pcaptcha,
                    originalCaptch : oc
                });
            t.as_CallService("SendConQuote", i, s, m);
            }),
            (t.as_SendSrvQuote = function (email, name, age, gender, subject, app, knowledge, relatedApp, feature, missFeature, captcha, o, l) {
                var i = JSON.stringify({
                    email: email,
                    name: name,
                    age: age,
                    gender: gender,
                    subject: subject,
                    app: app,
                    knowledge: knowledge,
                    relatedApp: relatedApp,
                    feature: feature,
                    missFeature: missFeature,
                    captchaText: captcha,
                });
                t.as_CallService("SendSrvQuotes", i, o, l);
            }),
            (t.as_SendQuote = function (fn, e, a, r, cn, o, co, l, c) {
                var s = JSON.stringify({
                    full_name: fn,
                    message: e,
                    email: r,
                    phone: a,
                    company_name: cn,
                    captchaText: o,
                    originalCaptch : co
                });
            t.as_CallService("SendQuote", s, l, c);
            }),
            (t.as_FooterSendQuote = function (fn, e, a, r, cn, o, co, l, c) {
                var s = JSON.stringify({
                    full_name: fn,
                    message: e,
                    email: r,
                    phone: a,
                    company_name: cn,
                    captchaText: o,
                    originalCaptch : co
                });
                t.as_CallService("FooterSendQuote", s, l, c);
            }),
            (t.as_SendContactQuote = function (e, a, r, n, o, l, c) {
                var s = JSON.stringify({
                    "comment": e,
                    "fname": a,
                    "lname": r,
                    "subject": n,
                    "email": o,
                });
                t.as_CallService("SendContactQuote", s, l, c);
            }),
            (t.as_CallService = function (e, a, r, n) {
                console.log("a",a)
                t.ajax({
                    type: "POST",
                    url: "/includes/forms.php?type=" + e,
                    // contentType: "application/json; charset=utf-8",
                    data: $.parseJSON(a),
                    // beforeSend: function (t) {
                    //     t.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    // },
                    dataType: "json",
                    success: r,
                    error: n,
                });
            }),
            (t.as_VerifyEmpty = function (e) {
                var a = !1;
                return e && ((a = t.trim(e.val()).length > 0), a ? e.removeClass("red-border") : e.addClass("red-border").val("")), a;
            }),
            t("#btnContactSubmit").click(function () {
                return (
                    t("#lblContactInfo").empty(),
                    t.as_VerifyEmpty(t("#contactcomments")) & o() & t.as_VerifyEmpty(t("#contactfname")) & t.as_VerifyEmpty(t("#contactlname")) & t.as_VerifyEmpty(t("#contactsubject")) &&
                    t.as_SendContactQuote(
                        t("#contactcomments").val(),
                        t("#contactfname").val(),
                        t("#contactlname").val(),
                        t("#contactsubject").val(),
                        t("#contactemail").val(),
                        function (e, a) {
                            "1" == e.d ? (r(), (window.location.href = "/thankyou.html")) : (r(), t("#lblContactInfo").html("Unexpected Error... Please try again later!"));
                        },
                        function (e, a, n) {
                            r(), t("#lblContactInfo").html("Unexpected Error... Please try again later!");
                        }
                    ),
                    !1
                );
            }),
            t("#btnSubmit").click(function () {
                var thisObj = $(this);
                return (
                    t("#lblInfo").empty(),
                    thisObj.prop("disabled", true),
                    t.as_VerifyEmpty(t("#txtcomments")) & t.as_VerifyEmpty(t("#txtemail")) & t.as_VerifyEmpty(t("#txtphone")) & t.as_VerifyEmpty(t("#txtCaptcha")) & t.as_VerifyEmpty(t("#txtfullname")) &&
                    t.as_SendQuote(
                        t("#txtfullname").val(),
                        t("#txtcomments").val(),
                        t("#txtphone").val(),
                        t("#txtemail").val(),
                        t("#txtcompany").val(),
                        t("#txtCaptcha").val(),
                        t("#imgCaptcha").text(),
                        function (r, n) {
                            "1" == r.d
                                // ? (a(), (window.location.href = "/thankyou.html"))
                                ? (a(), $("#lblInfo").css("display", "block"),$("#lblInfo").css("color", "green"),t("#lblInfo").html("Your enquiry has been received successfully. Our team will connect with you within 24 hours"), setTimeout(function() { t("#lblInfo").html(""); }, 5000))
                                : "2" == r.d
                                    ? (t("#txtCaptcha").addClass("red-border"), t("#txtCaptcha").focus())
                                    : (a(), $("#lblInfo").css("color", "red"), t("#lblInfo").html("Unexpected Error... Please try again later!"));
                                thisObj.prop("disabled", false);
                        },
                        function (e, r, n) {
                            a(), t("#lblInfo").html("Unexpected Error... Please try again later!");
                            thisObj.prop("disabled", false);
                        }
                    ),
                    !1
                );
            }),
            t("#footer_btnSubmit").click(function () {
                var thisObj = $(this);
                return (
                    t("#footer_lblInfo").empty(),
                        thisObj.prop("disabled", true),
                    t.as_VerifyEmpty(t("#footer_txtcomments")) & t.as_VerifyEmpty(t("#footer_txtemail")) & t.as_VerifyEmpty(t("#footer_txtphone")) & t.as_VerifyEmpty(t("#footer_txtCaptcha")) & t.as_VerifyEmpty(t("#footer_txtfullname")) &&
                    t.as_FooterSendQuote(
                        t("#footer_txtfullname").val(),
                        t("#footer_txtcomments").val(),
                        t("#footer_txtphone").val(),
                        t("#footer_txtemail").val(),
                        t("#footer_txtcompany").val(),
                        t("#footer_txtCaptcha").val(),
                        t("#footer_imgCaptcha").text(),
                        function (r, n) {
                            "1" == r.d
                                // ? (a(), (window.location.href = "/thankyou.html"))
                                ? (aclear(), $("#footer_lblInfo").css("display", "block"),$("#footer_lblInfo").css("color", "green"),t("#footer_lblInfo").html("Your enquiry has been received successfully. Our team will connect with you within 24 hours"), setTimeout(function() { t("#footer_lblInfo").html(""); }, 5000))
                                : "2" == r.d
                                    ? (t("#footer_txtCaptcha").addClass("red-border"), t("#footer_txtCaptcha").focus())
                                    : (aclear(), $("#footer_lblInfo").css("color", "red"), t("#footer_lblInfo").html("Unexpected Error... Please try again later!"));
                            thisObj.prop("disabled", false);
                        },
                        function (e, r, n) {
                            t("#footer_lblInfo").html("Unexpected Error... Please try again later!");
                            thisObj.prop("disabled", false);
                        }
                    ),
                    thisObj.prop("disabled", false),
                        !1
                );
            }),
            t("#btnConSubmit").click(function () {
                return (
                    t("#lblConInfo").empty(),
                    t.as_VerifyEmpty(t("#txtConName")) & conEmail() & t.as_VerifyEmpty(t("#txtConPhone")) & t.as_VerifyEmpty(t('#txtConMessage')) & t.as_VerifyEmpty(t("#txtConCaptcha")) &&
                        t.as_SendConQuote(
                            t("#txtConName").val(),
                            t("#txtConEmail").val(),
                            t("#txtConPhone").val(),
                            t("#txtConMessage").val(),
                            t("#txtConCaptcha").val(),
                            t("#imgFormCaptcha").text(),
                            function (r, n) {
                                "1" == r.d
                                    ? (conReset(), (window.location.href = "/thankyou.html"))
                                    : "2" == r.d
                                        ? (e(), t("#txtConCaptcha").addClass("red-border"), t("#txtCaptcha").focus())
                                        : (conReset(), t("#lblConInfo").html("Unexpected Error... Please try again later!"));
                            },
                            function (e, r, n) {
                                conReset(), t("#lblConInfo").html("Unexpected Error... Please try again later!");
                            }
                        ),
                    !1
                );
            }),
            t("#btn2WeekSubmit").click(function () {
                return (
                    t("#lbl2WeekInfo").empty(),
                    c() & t.as_VerifyEmpty(t("#txt2Phone")) & t.as_VerifyEmpty(t("#txt2Message")) & t.as_VerifyEmpty(t("#txt2Captcha")) &&
                    t.as_2WeekSendQuote(
                        "",
                        t("#txt2Email").val(),
                        t("#txt2Phone").val(),
                        "",
                        t("#txt2Message").val(),
                        "",
                        t("#txt2Captcha").val(),
                        t("#imgCaptchaTrial").text(),
                        function (a, r) {
                            if (a.status =="success") {
                                window.location.href = "/thankyou.html";
                            } else {
                                t("#txt2Captcha").addClass("red-border");
                                t("#txt2Captcha").focus();
                                t("#lbl2WeekInfo").html(a.message);
                            }
                            // console.log("a", a);
                            // console.log("r", r);
                            // "1" == a.d
                            //     ? (n(), (window.location.href = "/thankyou.html"), setpage())
                            //     : "2" == a.d
                            //         ? (e(), t("#txt2Captcha").addClass("red-border"), t("#txt2Captcha").focus())
                            //         : (n(), t("#lbl2WeekInfo").html("Unexpected Error... Please try again later!"));
                        },
                        function (e, a, r) {
                            n(), t("#lbl2WeekInfo").html("Unexpected Error... Please try again later!");
                        }
                    ),
                    !1
                );
            }),
            t("#btnSSubmit").click(function () {
                return (
                    t("#lblInfo").empty(),
                    r1() &
                    t.as_VerifyEmpty(t("#SName")) &
                    t.as_VerifyGenderCheck(t(".SGender")) &
                    t.as_VerifyAppCheck(t(".SApp")) &
                    t.as_VerifyKnowledgeCheck(t(".SKnowledge")) &
                    t.as_VerifyEmpty(t("#SSubject")) &
                    t.as_VerifyEmpty(t("#SRelatedApp")) &
                    t.as_VerifyEmpty(t("#SFeature")) &
                    t.as_VerifyEmpty(t("#SMissFeature")) &
                    t.as_VerifyEmpty(t("#txtSCaptcha")) &&
                    t.as_SendSrvQuote(
                        t("#SEmail").val(),
                        t("#SName").val(),
                        t(".SAge:checked").val(),
                        t(".SGender:checked").val(),
                        t("#SSubject").val(),
                        t(".SApp:checked").val(),
                        t(".SKnowledge:checked").val(),
                        t("#SRelatedApp").val(),
                        t("#SFeature").val(),
                        t("#SMissFeature").val(),
                        t("#txtSCaptcha").val(),
                        function (r, n) {
                            debugger;
                            1 == r.d
                                ? (a1(), t("#modelSuccess").css("display", "flex"))
                                : 2 == r.d
                                    ? (e(), t("#txtSCaptcha").addClass("red-border"), t("#txtSCaptcha").focus())
                                    : (t("#srvError").html("Unexpected Error... Please try again later!"), a1());
                        },
                        function (t, r, n) {
                            t("#srvError").html("Unexpected Error... Please try again later!"), a1();
                        }
                    ),
                    !1
                );
            }),
            t(".successModel").click(function () {
                t("#modelSuccess").css("display", "none");
            });
    });
})(jQuery);