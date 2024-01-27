/*
 * Author: Priyankara Athapaththu
 * File: UpdateUser.cs
 * Description: This class defines a data model for updating user information.
 */

namespace WebApplication1.Data
{
    public class UpdateUser
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

        // User's role or permission level.
        public string Role { get; set; }
    }
}
