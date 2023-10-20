using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Views;

namespace TRQN.Backend.Controllers.Extentions
{
    public static class ProductsControllerExtension
    {
        public static IActionResult ToResponse<TResult>(this Result<TResult> res, Func<ACustomException, StatusCodeMessage> errorMapper)
        {
            return res.Match<IActionResult>(f =>
            {
                return new OkObjectResult(f);
            }, exception =>
            {
                if (exception is ProductNotFoundException)
                {
                    return new NotFoundObjectResult(errorMapper((ProductNotFoundException)exception));
                }
                else
                    return new StatusCodeResult(500);
            });
        }
    }
}
