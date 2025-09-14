import React from 'react'

const Contact_Us = () => {
  return (
    <div>{/* Contact Us */}
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-xl mx-auto">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-green-400 sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-1 text-gray-300">
        We'd love to talk about how we can help you.
      </p>
    </div>
  </div>

  <div className="mt-12 max-w-lg mx-auto">
    {/* Card */}
    <div className="flex flex-col border border-green-300 rounded-xl p-4 sm:p-6 lg:p-8">
      <h2 className="mb-8 text-xl text-center font-semibold text-gray-300">
        Fill in the form
      </h2>

      <form>
        <div className="grid gap-4 lg:gap-6">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label htmlFor="hs-firstname-contacts-1" className="block mb-2 text-sm text-white font-medium">First Name</label>
              <input type="text" name="hs-firstname-contacts-1" id="hs-firstname-contacts-1" className="py-2.5 sm:py-3 px-4 block w-full border-2 border-neutral-700  rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none" />
            </div>

            <div>
              <label htmlFor="hs-lastname-contacts-1" className="block mb-2 text-sm text-white font-medium">Last Name</label>
              <input type="text" name="hs-lastname-contacts-1" id="hs-lastname-contacts-1" className="py-2.5 sm:py-3 px-4 block w-full border-2 border-neutral-700 rounded-lg sm:text-sm focus:border-green-500  focus:ring-green-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none" />
            </div>
          </div>
          {/* End Grid */}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label htmlFor="hs-email-contacts-1" className="block mb-2 text-sm text-white font-medium">Email</label>
              <input type="email" name="hs-email-contacts-1" id="hs-email-contacts-1" className="py-2.5 sm:py-3 px-4 block w-full border-2 border-neutral-700  rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none" />
            </div>

            <div>
              <label htmlFor="hs-phone-number-1" className="block mb-2 text-sm text-white font-medium">Phone Number</label>
              <input type="text" name="hs-phone-number-1" id="hs-phone-number-1" className="py-2.5 sm:py-3 px-4 block w-full border-2 border-neutral-700  rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none" />
            </div>
          </div>
          {/* End Grid */}

          <div>
            <label htmlFor="hs-about-contacts-1" className="block mb-2 text-sm text-white font-medium">Details</label>
            <textarea id="hs-about-contacts-1" name="hs-about-contacts-1" rows="4" className="py-2.5 sm:py-3 px-4 block w-full border-2 border-neutral-700  rounded-lg sm:text-sm focus:border-green-500 focus:ring-green-500 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none"></textarea>
          </div>
        </div>
        {/* End Grid */}

        <div className="mt-6 grid">
          <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-m font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-hidden focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none">Send inquiry</button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-sm text-white">
            We'll get back to you in 1-2 business days.
          </p>
        </div>
      </form>
    </div>
    {/* End Card */}
  </div>

 
</div>
{/* End Contact Us */}</div>
  )
}

export default Contact_Us;