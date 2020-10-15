using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System.ServiceModel;

namespace Microsoft.Crm.Sdk.Samples
{
    class EmailSender : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                IOrganizationServiceFactory serviceFactory =
                    (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                try
                {
                    Entity _Contact = service.Retrieve("contact", new Guid(context.PrimaryEntityName), new ColumnSet(new string[] { "fullname", "new_regionfield", "new_cityfield", "emailaddress1" }));
                    string Name = _Contact["fullname"].ToString();
                    string Region = _Contact["new_regionfield"].ToString();
                    string City = _Contact["new_cityfield"].ToString();
                    string Email = _Contact["emailaddress1"].ToString();
                    Entity fromActivityParty = new Entity("activityparty");
                    Entity toActivityParty = new Entity("activityparty");
                    Guid userId = context.UserId;
                    Guid contactId = (Guid)_Contact.Attributes["contactid"];
                    fromActivityParty["partyid"] = new EntityReference("systemuser", userId);
                    toActivityParty["partyid"] = new EntityReference("contact", contactId);
                    Entity email = new Entity("email");
                    email["from"] = new Entity[] { fromActivityParty };
                    email["to"] = new Entity[] { toActivityParty };
                    email["regardingobjectid"] = new EntityReference("contact", contactId);
                    email["subject"] = "This is the subject";
                    email["description"] = $"Hello: {Name}, {Region}, {City}, {Email}";
                    email["directioncode"] = true;
                    Guid emailId = service.Create(email);
                    SendEmailRequest sendEmailRequest = new SendEmailRequest
                    {
                        EmailId = emailId,
                        TrackingToken = "",
                        IssueSend = true
                    };
                    SendEmailResponse sendEmailresp = (SendEmailResponse)service.Execute(sendEmailRequest);
                }
                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in FollowUpPlugin.", ex);
                }
                catch (Exception ex)
                {
                    tracingService.Trace("FollowUpPlugin: {0}", ex.ToString());
                    throw;
                }
            }
        }
    }
}