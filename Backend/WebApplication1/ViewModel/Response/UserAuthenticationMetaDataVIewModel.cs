/*
 * Author: Priyankara Athapaththu
 * File: UserAuthenticationMetaDataViewModel.cs
 * Description: This class defines a view model for user authentication metadata, including user information, token, and role properties.
 */

using System;
namespace WebApplication1.ViewModel.Response
{
	public class UserAuthenticationMetaDataViewModel : ResponseViewModel
	{
        // User's unique identifier.
        public string Id { get; set; }

        // User's full name (combination of first name and last name).
        public string FullName { get; set; }

        // JWT token for user authentication.
        public string Token { get; set; }

        // User's role or permission level.
        public string Role { get; set; }

        // User's NIC (National Identity Card) number.
        public string NIC { get; set; }

    }
}

