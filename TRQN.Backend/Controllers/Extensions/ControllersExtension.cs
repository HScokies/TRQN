using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;
using TRQN.Backend.Exceptions;
using TRQN.Backend.Views;

namespace TRQN.Backend.Controllers.Extentions
{
    public static class ControllersExtension
    {
        public static IActionResult ToResponse<TResult>(this Result<TResult> res, Func<ACustomException, StatusCodeMessage> errorMapper)
        {
            return res.Match<IActionResult>(f =>
            {
                return new OkObjectResult(f);
            }, exception =>
            {
                if (exception is ProductException)
                {
                    var ex = (ProductException)exception;
                    return new ObjectResult(errorMapper(ex)) { StatusCode = ex.code };
                }
                if (exception is UserException)
                {
                    var ex = (UserException)exception;
                    return new ObjectResult(errorMapper(ex)) { StatusCode = ex.code };
                }
                else
                    return new StatusCodeResult(500);
            });
        }
    }
}
