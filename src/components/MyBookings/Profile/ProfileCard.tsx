import React from "react";
import { FaUserCircle, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import Image from "next/image";

type Profile = {
  name: string;
  email: string;
  password: string;
  profilePic: string;
};

type ProfileCardProps = {
  profile: Profile;
  editing: boolean;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onForgotPasswordClick: () => void;
};

export default function ProfileCard({
  profile,
  editing,
  setProfile,
  setEditing,
  onForgotPasswordClick,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative">
      <div className="relative mb-4">
        <Image
          src={profile.profilePic}
          alt="Profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow"
        />
        <button
          className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full p-2 shadow hover:bg-orange-600 transition-colors"
          title="Change Profile Picture"
        >
          <FaCamera className="w-4 h-4" />
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
      <p className="text-sm text-gray-500 mb-2">ID: HM-2025-0501</p>
      <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mb-4">
        HiMambo User since: May 2025
      </span>
      <form className="w-full space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <div
            className={`flex items-center ${
              editing ? "bg-white" : "bg-gray-50"
            } rounded-lg px-3 py-2 border ${
              editing ? "border-purple-200" : "border-gray-200"
            }`}
          >
            <FaUserCircle
              className={`mr-2 ${editing ? "text-purple-400" : "text-gray-400"}`}
            />
            <input
              type="text"
              value={profile.name}
              disabled={!editing}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className={`w-full focus:outline-none ${
                editing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <div
            className={`flex items-center ${
              editing ? "bg-white" : "bg-gray-50"
            } rounded-lg px-3 py-2 border ${
              editing ? "border-purple-200" : "border-gray-200"
            }`}
          >
            <FaEnvelope
              className={`mr-2 ${editing ? "text-purple-400" : "text-gray-400"}`}
            />
            <input
              type="email"
              value={profile.email}
              disabled={!editing}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className={`w-full focus:outline-none ${
                editing ? "bg-white" : "bg-gray-50"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Password</label>
          <div
            className={`flex items-center ${
              editing ? "bg-white" : "bg-gray-50"
            } rounded-lg px-3 py-2 border ${
              editing ? "border-purple-200" : "border-gray-200"
            }`}
          >
            <FaLock
              className={`mr-2 ${editing ? "text-purple-400" : "text-gray-400"}`}
            />
            <input
              type="password"
              value={profile.password}
              disabled={!editing}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              className={`w-full focus:outline-none ${
                editing ? "bg-white" : "bg-gray-50"
              }`}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-xs text-blue-600 hover:text-blue-700 mt-1"
          >
            Forgot Password?
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-orange-400 text-white rounded-lg hover:bg-orange-300 transition-colors"
          >
            <span>{editing ? "Save Changes" : "Edit Profile"}</span>
            {editing ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
