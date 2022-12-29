create table Account(
 accountID int identity(1,1) primary key ,
 accountName varchar(20),
 username varchar(20),
 password varchar(20)
)


create table Form(
	formID smallint identity(1,1) primary key,
	accountID int,
	companyName varchar(20),
	repName varchar(20),
	callDate date,
	timeLength varchar(20),
	callDesc varchar(200),
	issueSolved varchar(20),
	followUp varchar(20),	
	status varchar(20),
	accountID_approver smallint,
	constraint forms_accountID_approver_FK foreign key(accountID_approver)  references Account(accountID),
	constraint forms_accountID_FK foreign key(accountID)  references Account(accountID)
)

create table Purchase(
	Purchase_ID smallint identity(1,1) primary key ,
	accountID int ,
	purchaseDate date not null,
	supplier nvarchar(20),
	quantity int not null,
	productPrice money,
	tax money,
	net money,
	totalAfterTax money,
	reference nvarchar(20),
	permissionGroup varchar(20),

	constraint Purchase_Buyer_ID foreign key(accountID)  references Account(accountID)

)


create table PermissionGroups()

insert into Account(username,password) values ('admin','admin','123')




