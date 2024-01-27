/*
 * Author: Priyankara Athapaththu
 * File: LoginViewModel.cs
 * Description: This class defines a view model for user login, containing NIC and password properties.
 */

using System;
namespace WebApplication1.ViewModel.User
{
	public class LoginViewModel
	{
        // User's NIC (National Identity Card) number.
        public string NIC { get; set; }

        // User's password for authentication.
        public string Password { get; set; }
	}
}

