import React from 'react'
import newsbg from "/title.background.png";
import bluebg from "/crew.png";


function Crew() {
    return (
        <div>
            <div className="h-24 md:h-28 w-full flex items-center justify-center relative" style={{ backgroundImage: `url(${bluebg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "contain" }}>
                <div
                    className="h-24 md:h-28 w-full flex items-center justify-center relative"
                    style={{ backgroundImage: `url(${newsbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                    <h2 className="text-white text-2xl sm:text-2xl md:text-3xl font-semibold drop-shadow-lg z-[3]">
                        Gallery
                    </h2>
                </div>
                
            </div>
        </div>
    )
}

export default Crew
