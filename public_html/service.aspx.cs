using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Services;

public partial class Service : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod()]
    public static int Send2WeekInquiry(string name, string email, string phone, string subject, string message, string page, string captchaText)
    {
        int r = 0;

        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (IsValidEmail(email) && Email.SendToAdmin("Inquiry from AST 2 Week Trial", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>{0}</p><br/><strong>Subject:</strong> {1}<br/><strong>Page:</strong> {2}<br/><strong>Name:</strong> {3}<br/><strong>Email:</strong> {4}<br/><strong>Phone:</strong> {5}</div>", message, subject, page, name, email, phone)))
                r = 1;
        }
        else
            r = 2;

        return r;
    }

    [WebMethod()]
    public static int SendQuote(string email, string phone, string message, string captchaText)
    {
        int r = 0;

        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (IsValidEmail(email) && SaveDataToInquiryTextFile(message, email, phone) && Email.SendToAdmin("Inquiry from AST", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>{0}</p><br/><br/><strong>Email:</strong> {1}<br/><strong>Phone:</strong> {2}</div>", message, email, phone)))
                r = 1;
        }
        else
            r = 2;

        return r;
    }

    [WebMethod()]
    public static int SendConQuote(string name, string email, string phone, string message, string captchaText)
    {
        int r = 0;

        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (IsValidEmail(email) && SaveDataToConInquiryTextFile(name, email, phone, message) && Email.SendToAdminCon("Enquiry from AegisSofttech", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>{0}</p><br/><strong><em>{1}</em></strong><br/><strong>Email:</strong> {2}<br/><strong>Phone:</strong> {3}</div>", message, name, email, phone)))
                r = 1;
        }
        else
            r = 2;

        return r;
    }

    [WebMethod()]
    public static int SendContactQuote(string comment, string fname, string lname, string subject, string email)
    {
        int r = 0;

        if (IsValidEmail(email) && Email.SendToAdmin("Inquiry from AST", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>Subject : {0}</p><br/><p>Message: {1}</p><br/><strong>First Name: <em>{2}</em></strong><br/><strong>Last Name: <em>{3}</em></strong><br/><strong>Email:</strong> {4}<br/></div>", subject, comment, fname, lname, email)))
            r = 1;

        return r;
    }
    [WebMethod()]
    public static int SendCQuote(string fname, string lname, string email, string phone, string company, string message, string captchaText)
    {
        int r = 0;

        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (IsValidEmail(email) && Email.SendToAdmin("Inquiry from AST", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>{0}</p><br/><strong><em>{1} {2}</em></strong><br/><strong>Email:</strong> {3}<br/><strong>Phone:</strong> {4}<br/><strong>Company:</strong> {5}</div>", message, fname, lname, email, phone, company)))
                r = 1;
        }
        else
            r = 2;

        return r;
    }

    //[WebMethod()]
    //public static int SendInquiry(string comment, string email, string phone, string skype, string captchaText)
    //{
    //    int r = 0;

    //    string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
    //    if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
    //    {
    //        if (IsValidEmail(email) && SaveDataToInquiryTextFile(comment, email, phone, skype) && Email.SendToAdmin("Inquiry from AST", string.Format("<div style='font-family:Arial; font-size:10pt;'><p>{0}</p><br/><strong>Skype:</strong> {1}<br/><strong>Email:</strong> {2}<br/><strong>Phone:</strong> {3}</div>", comment, skype, email, phone)))
    //            r = 1;
    //    }
    //    else
    //        r = 2;

    //    return r;
    //}

    [WebMethod()]
    public static int SendSrvQuotes(string email, string name, string age, string gender, string subject, string app, string knowledge, string relatedApp, string feature, string missFeature, string captchaText)
    {
        int r = 0;

        string sessionText = (HttpContext.Current.Session["CaptchaImageText"] != null) ? HttpContext.Current.Session["CaptchaImageText"].ToString() : string.Empty;
        if (string.Compare(captchaText, sessionText, StringComparison.InvariantCultureIgnoreCase) == 0)
        {
            if (IsValidEmail(email) && Email.SendSurveyToAdmin("App View Information", string.Format("<div style='font-family:Arial; font-size:10pt;'><br/>" +
                "<strong>Email:</strong> {0}<br/>" +
                "<strong>Name:</strong> {1}<br/>" +
                "<strong>Age:</strong> {2}<br/>" +
                "<strong>Gender:</strong> {3}<br/>" +
                "<strong>Subject:</strong> {4}<br/>" +
                "<strong>Most Interested App:</strong> {5}<br/>" +
                "<strong>Most Usage App:</strong> {6}<br/>" +
                "<strong>App Usage:</strong> {7}<br/>" +
                "<strong>Feature:</strong> {8}<br/>" +
                "<strong>Missed Feature:</strong> {9}<br/>" +
                "</div>", email, name, age, gender, subject, app, knowledge, relatedApp, feature, missFeature)))
                r = 1;
        }
        else
            r = 2;

        return r;
    }

    public static bool IsValidEmail(string email)
    {
        return Regex.IsMatch(email, @"^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
    }

    public static bool SaveDataToInquiryTextFile(string comment, string email, string phone)
    {
        string filemessage = "Message : " + comment + "\n" + "Email : " + email + "\n" + "Phone : " + phone + "\n";
        EmailFileWriteHandler.WriteDetailsInFile(filemessage);

        return true;

    }

    public static bool SaveDataToConInquiryTextFile(string name, string email, string phone, string message)
    {
        string filemessage = "Name : " + name + "\n" + "Email : " + email + "\n" + "Phone : " + phone + "\n" + "Message : " + message;
        EmailFileWriteHandler.WriteConDetailsInFile(filemessage);

        return true;

    }

    public static bool SaveDataToRInquiryTextFile(string comment, string email, string phone)
    {
        string filemessage = "Comment : " + comment + "\n" + "Email : " + email + "\n" + "Phone : " + phone + "\n";
        EmailFileWriteHandler.WriteDetailsInFile(filemessage);

        return true;

    }
}


