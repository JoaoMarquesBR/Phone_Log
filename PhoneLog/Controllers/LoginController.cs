
using DAL;
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
                Account acc = await viewmodel.checkUsernameUse();

                if (acc.accountID >= 0)
                {
                    return Ok(acc);
                }
                else
                {
                    return Ok(-1); 
                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }

        }

        [HttpDelete("{accountID}")]
        public async Task<IActionResult> Delete(int accountID)
        {
            try
            {
                ProfilesViewModels viewmodel = new() { accountID = accountID };
                return await viewmodel.Delete() == 1
                ? Ok(new { msg = "Account " + viewmodel.accountName + " deleted!" })
               : Ok(new { msg = "Account " + viewmodel.accountID + " not deleted!" });
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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                ProfilesViewModels viewmodel = new();
                List<ProfilesViewModels> allStudents = await viewmodel.GetAll();
                return Ok(allStudents);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }


        [HttpPut("{username},{password}")]
        public async Task<ActionResult> updatePasword(string username,string password)
        {
            try
            {
                ProfilesViewModels viewmodel = new() { accountName = username };
                Account acc = await viewmodel.checkUsernameUse();

                if (acc!=null)
                {

                    viewmodel.accountName = acc.username;
                    viewmodel.accountPassword = acc.password;
                    viewmodel.accountID = acc.accountID;


                int result  = await viewmodel.Update();

                return Ok(result);

                }



            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
            }

            return Ok(-1);
        }


    }
}
