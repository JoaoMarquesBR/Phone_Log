
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Reflection;
using ViewModels;

namespace TheFactory_PhoneForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {

   
        [HttpPost]
        public async Task<ActionResult> Post(PurchaseViewModel viewmodel)
        {
            try
            {
                Console.WriteLine("Viel model as \n\n\n\n\n\n\n\n\n\n");
                await viewmodel.addPurchase();
                return viewmodel.Purchase_ID >= 0
                ? Ok(new { msg = "Form " + viewmodel.Purchase_ID + " added!" })
                : Ok(new { msg = "Form " + viewmodel.Purchase_ID + " not added!" });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }

        }





        [HttpGet("{accountID}")]
        public async Task<IActionResult> GetAll(int accountID)
        {
            try
            {
                PurchaseViewModel viewmodel = new();
                List<PurchaseViewModel> allForms = await viewmodel.GetAll(accountID);
                Debug.WriteLine("\n\n\n Count is " + allForms.Count);
                return Ok(allForms);
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
