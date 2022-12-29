using DAL;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection;


namespace DatabaseDAL
{
    public class PurchaseDAO
    {
        private readonly IRepository<Purchase> _repo;

        public PurchaseDAO()
        {
            _repo = new TheFactory_Repository<Purchase>();
        }



        public async Task<int> addPurchase(Purchase newForm)
        {
            try
            {
                //selectedAcc = await _db.accounts.FirstOrDefaultAsync(acc => acc.accountName == username && acc.accountPassword == password);
                TheFactory_Context _db = new();
                newForm = await _repo.Add(newForm);

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\n\nProblem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                throw;
            }

            return newForm.Purchase_ID;
        }


        public async Task<List<Purchase>> GetAll()
        {
            List<Purchase> purchases;
            try
            {
                purchases = await _repo.GetAll();
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                throw;
            }

            return purchases;
        }

    }





}
    
    
