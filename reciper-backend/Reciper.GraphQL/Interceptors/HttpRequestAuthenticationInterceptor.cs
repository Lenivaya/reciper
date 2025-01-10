using System.Security.Claims;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;

namespace Reciper.GraphQL.Interceptors;

public record AppActor<T>(T UserId);

public class HttpRequestAuthenticationInterceptor : DefaultHttpRequestInterceptor
{
    public override ValueTask OnCreateAsync(
        HttpContext context,
        IRequestExecutor requestExecutor,
        OperationRequestBuilder requestBuilder,
        CancellationToken cancellationToken
    )
    {
        SetUsersNull(requestBuilder);
        SetGlobalStateFromUserClaims(context, requestBuilder);

        return base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);
    }

    private static void SetGlobalStateFromUserClaims(
        HttpContext context,
        OperationRequestBuilder requestBuilder
    )
    {
        var userId = context.User.FindFirst(ClaimTypes.PrimarySid)?.Value;

        if (userId != null && Guid.TryParse(userId, out var parsedUserId))
            requestBuilder.SetGlobalState(
                "CurrentUser",
                new AppActor<Guid>(parsedUserId)
            );
    }

    private static void SetUsersNull(OperationRequestBuilder requestBuilder)
    {
        requestBuilder.SetGlobalState("CurrentJobSeeker", null);
        requestBuilder.SetGlobalState("CurrentEmploymentAgency", null);
        requestBuilder.SetGlobalState("CurrentAdmin", null);
    }
}