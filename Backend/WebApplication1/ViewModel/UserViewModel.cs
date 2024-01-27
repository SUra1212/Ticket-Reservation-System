/*
 * Author: Priyankara Athapaththu
 * File: UserViewModel.cs
 * Description: This class defines a view model for user information, including NIC, name, email, gender, password, and role properties.
 */


using System;
namespace WebApplication1.ViewModel
{
	public class UserViewModel
	{
        // User's NIC (National Identity Card) number.
        public string NIC { get; set; }

        // User's first name.
        public string FirstName { get; set; }

        // User's last name.
        public string LastName { get; set; }

        // User's email address.
        public string Email { get; set; }

        // User's gender.
        public string Gender { get; set; }

        // User's password for authentication.
        public string Password { get; set; }

        // User's role or permission level.
        public string Role { get; set; }
    }
}

