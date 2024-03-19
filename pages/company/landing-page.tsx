import React from 'react'

export default function LandingPage() {
  return (
   <>
   	<div className="min-h-screen bg-gray-100 overflow-auto">
  <div className="container mx-auto max-w-4xl">
    <div className="mt-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Pricing plans</h1>
      <p className="text-lg mt-3 font-semibold">Every plan includes 30 day free trial</p>
    </div>
   
    <hr className="mt-10" />
    <div className="flex space-x-10 pt-10">
    <div className="py-12">
      <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden  transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Hobby</h1>
          </div>
          <h1 className="text-4xl text-center font-bold">$10.00</h1>
          <p className="px-4 text-center text-sm ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
          <ul className="text-center">
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
          </ul>
          <div className="text-center bg-gray-200 ">
        <button className="inline-block my-6 font-bold text-gray-800">Get started today</button>
          </div>
      </div>
    </div>
    <div className="py-12">
      <div className="bg-white  pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 -translate-y-2 scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Professional</h1>
          </div>
          <h1 className="text-4xl text-center font-bold">$30.00</h1>
          <p className="px-4 text-center text-sm ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
          <ul className="text-center">
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
          </ul>
          <div className="text-center bg-pink-600 ">
        <button className="inline-block my-6 font-bold text-white">Get started today</button>
          </div>
      </div>
    </div>
    <div className="py-12">
      <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Business</h1>
          </div>
          <h1 className="text-4xl text-center font-bold">$45.00</h1>
          <p className="px-4 text-center text-sm ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</p>
          <ul className="text-center">
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
            <li><a href="#" className="font-semibold">It is a long established</a></li>
          </ul>
          <div className="text-center bg-gray-200 ">
        <button className="inline-block my-6 font-bold text-gray-800">Get started today</button>
          </div>
      </div>
    </div>
    </div>
  </div>
</div>

   </>
  )
}
