using DAL;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Reflection;


namespace DatabaseDAL
{
    public class AccountDAO
    {

        readonly IRepository<Account> _repo;

        public AccountDAO()
        {
            _repo = new TheFactory_Repository<Account>();
        }

        
        public async Task<Account> accountDAO_CheckAccount(string username,string password)
        {

            Account? selectedAcc;
            try
            {

                TheFactory_Context _db = new();



                selectedAcc = await _db.Accounts.FirstOrDefaultAsync(acc => acc.username == username && acc.password == password);
                  
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                throw;
            }
            return selectedAcc!;
        }


        public async Task<int> addAccount(Account acc)
        {
            try
            {
                //selectedAcc = await _db.accounts.FirstOrDefaultAsync(acc => acc.accountName == username && acc.accountPassword == password);
                acc = await _repo.Add(acc);

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\n\nProblem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                throw;
            }

            return acc.accountID;
        }



    }
}
    
    
