/*
 * Author: Dinul Liyanage
 * File: IReservationStoreDatabaseSetting.cs
 * Description: This file defines the IReservationStoreDatabaseSetting interface, which specifies the database settings for storing reservations in the application.
 */

using System;
namespace WebApplication1.Models
{
	public interface IReservationStoreDatabaseSetting
	{
        string MobileresCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

