import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import userData from "../services/userServices";
import toast from "react-hot-toast";

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);

    // Loading user from navigation or localStorage
    useEffect(() => {
        if (location.state?.user) {
            setUser(location.state.user)
            setBio(location.state.user.bio || "");
        } else if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            setBio(JSON.parse(localStorage.getItem("user")).bio || "");
        } else {
            navigate("/");
        }
    }, [location.state, navigate]);

    let avatarSrc = "";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (user && user.avatar)
        avatarSrc = backendUrl + user.avatar;
    else if (user) {
        avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent( // encodeURIComponent is used to encode special characters such as spaces in the username which could break the URL
            user.username || "User"
        )}&background=0D8ABC&color=fff&size=128`;
    }
    console.log(avatarSrc);


    const handleUserData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(); // FormData is a built-in class in JavaScript that allows you to send form data in HTTP requests
            formData.append("_id", user._id);
            formData.append("bio", bio);
            if (avatar)
                formData.append("avatar", avatar);
            const res = await userData(formData);
            toast.success(res.data.message);
            if (res.data.user) {
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message);
        }
    };


    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700">
                <p>Loading User...</p>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                    alt=""
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-100 to-white p-6">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">

                    <div className="flex items-center gap-6 relative">

                        {/* Avatar Display */}
                        <img
                            src={avatarSrc}
                            alt="avatar"
                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                        />

                        {/* Avatar Upload */}
                        <form encType="multipart/form-data" className="absolute top-20 left-20">
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-sky-100 hover:bg-sky-200 px-2 py-1 rounded"
                            >
                                <i className="bx bx-image-landscape"></i>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                name="avatar"
                                accept="image/jpg, image/jpeg, image/png"
                                className="hidden"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </form>

                        {/* User Info */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {user.username}
                            </h1>
                            <p className="text-sm text-gray-500">{user.email}</p>

                            <button
                                onClick={() => navigate(-1)}
                                className="cursor-pointer mt-3 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                            >
                                Back
                            </button>
                        </div>

                    </div>

                    {/* Bio Section */}
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Bio</label>

                            <textarea
                                className="mt-2 w-full min-h-[120px] p-3 border border-neutral-500 rounded-lg text-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                                placeholder="Tell us about yourself..."
                                value={bio}
                                maxLength={200}
                                onChange={(e) => setBio(e.target.value)}
                            />

                            <div className={`text-right text-xs ${ bio.length === 200 ? 'text-red-500' : 'text-gray-500'} mt-1`}>
                                {200 - bio.length} { bio.length === 199 ? "character" : " characters"} left
                            </div>

                            <button
                                onClick={() => setUser((prev) => ({ ...prev, bio }))}
                                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                            >
                                Save
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="sm:col-span-1 bg-sky-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700">Profile Summary</h3>

                            <p className="mt-3 w-full text-sm text-gray-500 truncate text-ellipsis">
                                {user.bio || "No bio yet!"}
                            </p>

                            <div className="mt-5">
                                <h4 className="text-xs font-medium text-gray-700 uppercase">Contact</h4>
                                <p className="mt-1 text-sm text-gray-500 wrap-break-word">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Submit All Changes */}
                    <button
                        onClick={handleUserData}
                        className="mt-6 w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                    >
                        Update Profile
                    </button>

                </div>
            </div>
        </div>
    );
}
