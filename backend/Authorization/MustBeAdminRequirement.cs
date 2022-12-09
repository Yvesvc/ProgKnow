using Microsoft.AspNetCore.Authorization;

namespace ProgKnow.Authorization
{
    public class MustBeAdminRequirement : IAuthorizationRequirement
    {
        public MustBeAdminRequirement()
        {
        }
    }
}
