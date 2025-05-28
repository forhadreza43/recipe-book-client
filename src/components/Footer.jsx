import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-8 text-white">
      <div className="grid max-w-7xl grid-cols-1 gap-6 text-center md:grid-cols-3 md:text-left w-11/12 mx-auto">
        {/* Website Name */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400">Recipe Book</h2>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-2 font-semibold">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@recipebook.com"
              className="text-orange-300 hover:underline"
            >
              support@recipebook.com
            </a>
          </p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-2 font-semibold">Follow Us</h3>
          <div className="flex justify-center gap-4 md:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:support@recipebook.com"
              className="hover:text-green-400"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <p className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Recipe Book. All rights reserved.
      </p>
    </footer>
  );
}
