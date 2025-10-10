import React from "react";
import { User } from "../../../lib/types";

type Props = {
  user: User;
};
function Profile({ user }: Props) {
  return (
    <div className="flex items-center gap-5 shadow-md rounded-lg bg-white p-5 ">
      <div className="w-16 h-16 rounded-full">
        <img
          src={"/avatar.png"}
          className="w-full h-full bg-cover rounded-full"
        />
      </div>
      <div className="flex flex-col font-light">
        <p className="font-bold">{user.first_name}</p>
        <p>Agent Code: {user.code}</p>
        <p>Commission:35%</p>
      </div>
    </div>
  );
}

export default Profile;
