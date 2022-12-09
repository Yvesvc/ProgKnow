using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Security.Claims;

namespace ProgKnow.Authorization
{
    public class MustBeAdminHandler : AuthorizationHandler<MustBeAdminRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MustBeAdminHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, MustBeAdminRequirement requirement)
        {
            if(!context.User.Identity.IsAuthenticated)
            {
                context.Fail();
                return;
            }

            if(!await UserIsAdmin(context.User))
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }

        private async Task<bool> UserIsAdmin(ClaimsPrincipal user)
        {
            var userId = (from claim in user.Claims
                       where claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                       select claim.Value).First();

            var accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");

            var request = new HttpRequestMessage(HttpMethod.Get, $"{System.Configuration.ConfigurationManager.AppSettings["Auth0Domain"]}api/v2/users/{userId}/roles");
            request.Headers.Add("Authorization", "Bearer " + accessToken);
            request.Headers.Add("Accept", "application/json");
            var content = await (await new HttpClient().SendAsync(request)).Content.ReadAsStringAsync();

            var roles = JsonConvert.DeserializeObject<IEnumerable<Role>>(content);
            var adminRole = (from ja in roles
                       where ja.Name == "Admin"
                       select ja).First();

            return adminRole != null;
        }
    }
}
