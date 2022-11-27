global using Xunit;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;
using DAL;
using DatabaseDAL;
using Microsoft.SqlServer.Server;


public class ProfilesViewModels
{
    readonly private AccountDAO _dao;
    public int accountID { get; set; }

    public string? accountName { get; set; }

    public string? accountPassword { get; set; }


    public ProfilesViewModels()
    {
        _dao = new AccountDAO();
    }

    public async Task<int> checkUsernameUse()
    {
        int value = -1;
        try
        {
            Account acc = await _dao.checkUsernameUse(accountName);


            if ( acc == null)
            {
                return -2; //username is in use
            }
            else
            {
                value = acc.accountID;
            }
        }
        catch (NullReferenceException nex)
        {
            Debug.WriteLine(nex.Message);
        }
        catch (Exception ex)
        {
            Debug.WriteLine("Problem in " + GetType().Name + " " +
             MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
            throw;
        }

        return value;

    }


    public async Task<int> checkAccount()
    {
        int value = -1 ;
        try
        {
            Account acc = await _dao.accountDAO_CheckAccount(accountName, accountPassword);

            
            if(acc.accountID <0)
            {
                return -2; //username is in use
            }
            else
            {
                value = acc.accountID;
            }
        }
        catch (NullReferenceException nex)
        {
            Debug.WriteLine(nex.Message);
        }
        catch (Exception ex)
        {
            Debug.WriteLine("Problem in " + GetType().Name + " " +
             MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
            throw;
        }
        
        return value;

    }
  
   





    public async Task<int> AddAccount()
    {

        try
        {
            Account newAccount = new()
            {
                username = accountName,
                password = accountPassword  
            };
            accountID = await _dao.addAccount(newAccount);
            return accountID;
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            throw;
        }

    }




}