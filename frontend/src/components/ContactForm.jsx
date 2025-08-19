'use client';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    enquiries: '',
    companyName: '',
    email: '',
    country: '',
    agreeToCommunications: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) return "Name is required";
    if (!formData.email.includes('@')) return "Enter a valid email";
    if (!/^\d{7,15}$/.test(formData.phone)) return "Enter a valid phone number";
    if (!formData.enquiries) return "Enquiry cannot be empty";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const error = validateForm();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setLoading(true);

    try {
      // Example API endpoint — replace with your backend
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: '✅ Message sent successfully!' });
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          enquiries: '',
          companyName: '',
          email: '',
          country: '',
          agreeToCommunications: false,
        });
      } else {
        setStatus({ type: 'error', message: '❌ Something went wrong. Try again.' });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: '❌ Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto" id="contact">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2 text-center">
          Talk To An Expert
        </h1>
        <p className="text-gray-600 mb-8 text-center text-sm sm:text-base">
          Feel free to contact us. Our experts are happy to assist you with your doubts and enquiries.
        </p>

        {/* Status Message */}
        {status.message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              status.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Enquiries */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Give a simple brief about your enquiries
            </label>
            <textarea
              name="enquiries"
              value={formData.enquiries}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-xs text-gray-600 mb-3">
              Bainthatech will only use your information to provide the products and services you
              requested from us. We may also send you other offerings that may be of interest to you.
            </p>
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToCommunications"
                checked={formData.agreeToCommunications}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-xs text-gray-700">
                I agree to receive other communications from Bainthatech.
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Get Started'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
