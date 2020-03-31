using System;
using System.Linq;

namespace Backend.WebApi.Utils.Extensions
{
    /// <summary>
    /// LocalizedString extension
    /// </summary>
    public static class StringExtensions
    {
        /// <summary>
        /// Convert Snake case to Pascal case
        /// </summary>
        /// <param name="str">String as Snake case</param>
        /// <returns>String as Pascal case</returns>
        public static string ToPascalCase(this string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return string.Empty;
            }

            var convertedStr = str.Split(new[] { "_" }, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => char.ToUpperInvariant(s[0]) + s.Substring(1, s.Length - 1))
                .Aggregate(string.Empty, (s1, s2) => s1 + s2);

            return convertedStr;
        }

        /// <summary>
        /// Make string first char upper
        /// For example, abc convert to Abc
        /// </summary>
        /// <param name="str">String</param>
        /// <returns>String as first char upper</returns>
        public static string ToFirstCharUpper(this string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return string.Empty;
            }
            else if (!Char.IsLower(str[0]))
            {
                return str;
            }
            

            // Method 1.
            var convertedStr = str.First().ToString().ToUpper() + str.Substring(1);

            // Method 2.
            ////var convertedStr = str.Length > 1 ?
            ////            Char.ToUpperInvariant(str[0]).ToString() + str.Substring(1) :
            ////            Char.ToUpperInvariant(str[0]).ToString();

            return convertedStr;
        }
    }
}
