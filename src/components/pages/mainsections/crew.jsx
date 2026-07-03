import newsbg from "/title.background.png";
import bluebg from "/crew.png";
import newbg from '/title.background.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllusers } from "../../redux/userslice";

export default function Crew() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        dispatch(getAllusers());
    }, [dispatch]);

    // Sirf normal users (admins exclude)
    const filteredUsers = users.filter((u) => u.Role === "User");

    // Auto slide every 3 sec
    useEffect(() => {
        if (filteredUsers.length > 4) {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % filteredUsers.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [filteredUsers.length]);

    // Visible users (4 at a time)
    const visibleUsers = [];
    for (let i = 0; i < 4; i++) {
        visibleUsers.push(filteredUsers[(index + i) % filteredUsers.length]);
    }

    return (
        <section
            className="relative z-[3] bg-white my-14"
            style={{
                backgroundImage: `url(${bluebg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundSize: "contain",
            }}>
            <div className="container mx-auto px-4 relative z-10">
                {/* Heading */}
                <div className="h-30 flex items-center justify-center" style={{ backgroundImage: `url(${newbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", }}>
                    <h2 className="text-white text-xl font-bold drop-shadow-lg" data-aos="zoom-out-down" data-aos-duration="1500">
                        Teams
                    </h2>
                </div>
                <div className="relative text-center mt-14">
                    <h2 className="absolute inset-0 flex items-center justify-center text-[146px] italic font-[brush] text-[#B5995A] pointer-events-none select-none">
                        Crew
                    </h2>
                </div>

                {/* Users */}
                <div className="relative w-full z-10">
                    {loading && <p className="text-center text-gray-700">Loading users...</p>}
                    {error && <p className="text-center text-red-500">Error: {error}</p>}
                    {!loading && filteredUsers.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700">
                            {visibleUsers.map((user) => (
                                <div key={user._id} className="flex flex-col items-center text-center px-4" >
                                    {/* Avatar */}
                                    <div className="w-48 h-64 overflow-hidden">
                                        <img
                                            src={`http://localhost:3000${user.Avatar}`}
                                            alt={user.UserName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-full h-2 bg-cyan-950"></div>

                                    {/* Info */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-cyan-950 tracking-widest">
                                            {user.UserName}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
