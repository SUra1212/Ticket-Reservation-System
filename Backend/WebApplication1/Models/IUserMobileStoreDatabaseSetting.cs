/*
 * Author: Dinul Liyanage
 * File: IUserMobileStoreDatabaseSetting.cs
 * Description: This file defines the IUserMobileStoreDatabaseSetting interface, which specifies the database settings for mobile user data storage in the application.
 */

using System;
namespace WebApplication1.Models
{
	public interface IUserMobileStoreDatabaseSetting
	{
        string MobileuserCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

