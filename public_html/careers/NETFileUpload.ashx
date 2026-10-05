<%@ WebHandler Language="C#" Class="NETFileUpload" %>

using System;
using System.Web;

public class NETFileUpload : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    HttpFileCollection files;
    public void ProcessRequest(HttpContext context)
    {
        HttpPostedFile file = null;
        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                file = files[i];
                string fname;
                if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                    fname = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fname = file.FileName;
                }
                //fname = System.IO.Path.Combine(context.Server.MapPath("~/uploads/"), fname);
                //file.SaveAs(fname);
            }
        }

        string name = context.Request.Form["name"];
        //string designation = context.Request.Form["designation"];
        string Email = context.Request.Form["Email"];
        string Phone = context.Request.Form["Phone"];
        //string otherdesignation = context.Request.Form["otherdesignation"];
        string msg = context.Request.Form["msg"];
        string other = context.Request.Form["other"];
        string designation = context.Request.Form["designation"];
        string captcha = context.Request.Form["captcha"];

        int res = 0;
        if (name != null)
        {
            if (string.IsNullOrEmpty(designation))
                designation = other;
            res = SendQuote(name, Email, Phone, msg, designation, captcha, file);
        }
        context.Response.ContentType = "text/plain";
        context.Response.Write(res);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    //[WebMethod]
    public static int SendQuote(string name, string email, string phone, string message, string captchaText, HttpPostedFile file)
    {

        int r = 0;
        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (Email.SendToAdmin1(@"Inquiry from aegissofttech.com", string.Format("<div style='font-family:Arial; font-size:10pt;'>" +
                                                                                                "<p>{0}</p>" +
                                                                                                "<strong>From:</strong><em>{1}</em><br/>" +
                                                                                                "<strong>Email:</strong> {2}<br/>" +
                                                                                                "<strong>Phone:</strong> {3}<br/>", message, name, email, phone), file))

                r = 1;
        }
        else
            r = 2;

        return r;
    }

    //[WebMethod]
    public static int SendQuote(string name, string email, string phone, string message, string designation, string captchaText, HttpPostedFile file)
    {

        int r = 0;
        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (Email.SendToAdmin1(@"CV from AST .NET", string.Format("<div style='font-family:Arial; font-size:10pt;'>" +

                                                                                    "<p>{0}</p>" +
                                                                                    "<strong>From:</strong><em>{1}</em><br/>" +
                                                                                    "<strong>Email:</strong> {2}<br/>" +
                                                                                    "<strong>Phone:</strong> {3}<br/>" +
                                                                                    "<strong>Designation:</strong> {4}<br/>"
                                                                                    , message, name, email, phone, designation), file))

                r = 1;
        }
        else
            r = 2;

        return r;
    }

}