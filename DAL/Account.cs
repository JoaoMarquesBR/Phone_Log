using DatabaseDAL;
using System;
using System.Collections.Generic;

namespace DAL;

public partial class Account : TheFactory_Entity
{
    public int accountID { get; set; }

    public string? username { get; set; }

    public string? password { get; set; }

    public virtual ICollection<Form> Forms { get; } = new List<Form>();
}
