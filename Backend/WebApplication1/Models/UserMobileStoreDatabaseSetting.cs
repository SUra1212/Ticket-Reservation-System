/*
 * Author: Dinul Liyanage
 * File: UserMobileStoreDatabaseSetting.cs
 * Description: This file defines the UserMobileStoreDatabaseSetting class, which contains the database settings for the mobile user data storage.
 */

using System;
namespace WebApplication1.Models
{
	public class UserMobileStoreDatabaseSetting : IUserMobileStoreDatabaseSetting
	{
        public string MobileuserCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}

