/*
 * Author: Dinul Liyanage
 * File: ReservationStoreDatabaseSetting.cs
 * Description: This file defines the ReservationStoreDatabaseSetting class, which contains the database settings for storing reservations in the application.
 */

using System;
namespace WebApplication1.Models
{
	public class ReservationStoreDatabaseSetting : IReservationStoreDatabaseSetting

	{
        public string MobileresCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    
	}
}

