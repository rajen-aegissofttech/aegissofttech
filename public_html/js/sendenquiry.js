!(function (e) {
    (e.as_CallService = function (t, a, r, s) {
        e.ajax({
            type: "POST",
            dataType: "json",
            url: "/service.aspx/SendQuote",
            contentType: "application/json; charset=utf-8",
            data: a,
            beforeSend: function (e) {
                e.setRequestHeader("Content-type", "application/json; charset=utf-8");
            },
            success: r,
            error: s,
        });
    }),
        (e.as_SendQuote = function (t, a, r, c, s, n, o, l) {
            var i = JSON.stringify({ name: t, email: a, phone: r, company_name: c, message: s, captchaText: n });
            e.as_CallService("SendQuotes", i, o, l);
        }),
        (e.as_VerifyEmpty = function (t) {
            var a = !1;
            return t && ((a = e.trim(t.val()).length > 0) ? t.removeClass("red-border") : t.addClass("red-border").val("")), a;
        });
})(jQuery),
    jQuery(document).ready(function (e) {
        function t() {
            e("#imgCaptcha").attr("src", "/Captcha.ashx?" + new Date().getTime());
        }
        function a() {
            e("#txtName").val("").removeClass("red-border").focus(),
                e("#txtEmail").val("").removeClass("red-border"),
                e("#txtPhone").val("").removeClass("red-border"),
                e("#txtMessage").val("").removeClass("red-border"),
                e("#txtCaptcha").val("").removeClass("red-border"),
                t();
        }
        function r() {
            var t = e.trim(e("#txtEmail").val());
            if (0 != t.length) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(t) ? (e("#txtEmail").removeClass("red-border"), !0) : (e("#txtEmail").addClass("red-border"), !1);
            }
            return e("#txtEmail").addClass("red-border"), !1;
        }
        function s() {
            e("#enquire-form").css({ visibility: "visible" }), e("#enquire").css({ background: "" });
        }
        t(),
            e("#btnReset").click(function () {
                e("#txtName").val("").removeClass("red-border").focus(),
                    e("#txtEmail").val("").removeClass("red-border"),
                    e("#txtPhone").val("").removeClass("red-border"),
                    e("#txtMessage").val("").removeClass("red-border"),
                    e("#txtCaptcha").val("").removeClass("red-border"),
                    t();
            }),
            e("#txtName, #txtPhone, #txtMessage, #txtCaptcha").focusout(function () {
                e.as_VerifyEmpty(e(this));
            }),
            e("#txtEmail").blur(function () {
                r();
            }),
            e("#btnSubmit").click(function () {
                return (
                    e("#lblInfo").empty(),
                    e.as_VerifyEmpty(e("#txtName")) & r() & e.as_VerifyEmpty(e("#txtPhone")) & e.as_VerifyEmpty(e("#txtMessage")) & e.as_VerifyEmpty(e("#txtCaptcha")) &&
                        (e("#enquire-form").css("visibility", "hidden"),
                        e("#enquire").css({ background: "transparent url(/images/loading.gif) no-repeat scroll center center" }),
                        e.as_SendQuote(
                            e("#txtName").val(),
                            e("#txtEmail").val(),
                            e("#txtPhone").val(),
                            e("#txtcompany").val(),
                            e("#txtMessage").val(),
                            e("#txtCaptcha").val(),
                            function (r, n) {
                                1 == r.d
                                    ? (e("#btnReset").click(), a(), e("#lblInfo").html("You will soon hear from us."))
                                    : 2 == r.d
                                    ? (t(), e("#txtCaptcha").addClass("red-border"), e("#txtCaptcha").focus())
                                    : (e("#lblInfo").html("Unexpected Error... Please try again later!"), a()),
                                    s();
                            },
                            function (t, r, n) {
                                s(), e("#lblInfo").html("Unexpected Error... Please try again later!"), a();
                            }
                        )),
                    !1
                );
            });
    });



