import React from 'react'
import newsbg from '/title.background.png'

export default function Newsletter() {
    return (
        <div className='mb-24'>
                <div className="h-30 flex items-center justify-center" style={{ backgroundImage: `url(${newsbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", }}>
                    <h2 className="text-white text-xl font-bold drop-shadow-lg"  data-aos="zoom-out-down" data-aos-duration="1500">
                        Newsletter
                    </h2>
                </div>
                <div className="subscribe bg-cyan-950 p-10 rounded-xl text-white m-8 shadow-lg">
                    <h3 className='leading-7 text-2xl font-bold text-center'>Join our membership for full access to connect with every member.</h3>
                    <p className='leading-7 text-center pt-2'>Stay airborne on the latest drone innovations, exclusive offers, and industry insights by subscribing to our newsletter.</p>
                    <div className='flex items-center '>
                        <input className='py-4 px-8 w-full text-gray-500 bg-white rounded-xl my-6 ' placeholder='Subscribe to our newsletter' />
                        <button className="outline-none px-8 py-3 bg-gradient-to-b from-cyan-950 to-cyan-700 text-white font-semibold rounded-xl hover:opacity-90 transition duration-200 ml-[-140px]">Subscribe</button>
                    </div>
                </div>
        </div>
    )
}
