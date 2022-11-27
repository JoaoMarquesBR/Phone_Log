
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System.Diagnostics;
using System.Reflection;
using ViewModels;

namespace TheFactory_PhoneForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //[HttpOptions("{username}")]
        [Route("[action]/{username}")]
        [HttpGet]
        public async Task<ActionResult> checkUsername(string username)
        {
            try
            {
                ProfilesViewModels viewmodel = new() { accountName = username};
                int retVal = await viewmodel.checkUsernameUse();

                if (retVal >= 0)
                {
                    return Ok(retVal);
                }
                else
                {
                    return Ok(-1); // something went wrong
                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }

        }








        [HttpGet("{username},{password}")]
        public async Task<ActionResult> checkAccount(string username, string password)
        {
            try
            {
                ProfilesViewModels viewmodel = new() { accountName = username, accountPassword = password };
                int retVal = await viewmodel.checkAccount();

                if (retVal >= 0)
                {
                    return Ok(retVal);
                }
                else
                {
                    return Ok(-1); // something went wrong
                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }

        }

        [HttpPost("{username},{password}")]
        public async Task<ActionResult> addAcount(string username, string password)
        {
            try
            {
                ProfilesViewModels viewmodel = new() { accountName = username, accountPassword = password };
                int retVal = await viewmodel.AddAccount();

                if (retVal >= 0)
                {
                    return Ok(retVal);
                }
                else
                {
                    return Ok(-1); // something went wrong
                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }

        }



    }
}
