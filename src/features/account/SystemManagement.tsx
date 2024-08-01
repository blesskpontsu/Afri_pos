import { IonIcon, IonRouterLink } from "@ionic/react";
import { contrast, logOut } from "ionicons/icons";
import { MdModeEdit } from "react-icons/md";
import React from "react";
import { useAuth } from "../auth/hooks/useAuth";

function SystemManagement() {
  const { user, balance } = useAuth().state;
  return (
    <div className="flex h-screen flex-col gap-3 border-b-2 border-gray-200">
      <div className="w-full px-8 items-center flex gap-4 mt-8 py-5 bg-white text-black">
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="/avatar.png"
            alt=""
            className="w-full bg-cover object-center rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="font-bold">{user.first_name}</p>
          <p>{user.code}</p>
        </div>
      </div>
      <div className="flex px-8 bg-white">
        <IonRouterLink routerLink="/" className="text-black">
          <div className="flex gap-3 items-center mb-auto py-5">
            <IonIcon className="text-2xl" aria-hidden="true" icon={logOut} />
            <p>Log Out</p>
          </div>
        </IonRouterLink>
      </div>
    </div>
  );
}

export default SystemManagement;
