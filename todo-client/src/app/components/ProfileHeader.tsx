// "use client";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { LogoutUser } from "../services/auth";

// interface Props {
//   user?: {
//     name: string;
//     email: string;
//   };
// }

// const ProfileHeader: React.FC<Props> = ({ user }) => {
//   const router = useRouter();

// const handleLogout = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("No token found!");
//       return;
//     }

//     await LogoutUser(token); // API call with token

//     toast.success("Logged out successfully!");
//     localStorage.removeItem("token");
//     router.push("/login");
//   } catch (err) {
//     console.error("Logout failed", err);
//     toast.error("Failed to logout!");
//   }
// };


//   return (
//     <div className="flex justify-between items-center mb-6">
//       <div className="flex items-center space-x-4">
//         <Avatar>
//           <AvatarFallback>
//             {user?.name?.[0]?.toUpperCase() || "U"}
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <h2 className="text-xl font-semibold">{user?.name || "Loading..."}</h2>
//           <p className="text-sm text-gray-500">{user?.email || ""}</p>
//         </div>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="flex items-center space-x-1 text-red-500 hover:underline"
//       >
//         <LogOut className="w-4 h-4" />
//         <span>Logout</span>
//       </button>
//     </div>
//   );
// };

// export default ProfileHeader;




"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LogoutUser } from "../services/auth";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    if (session?.user?.email && session?.user?.name) {
      setIsGoogleUser(true);
    }
  }, [session]);

  const handleLogout = async () => {
    if (isGoogleUser) {
      // Google logout
      await signOut({ callbackUrl: "/login" });
    } else {
      // Normal logout
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found!");
          return;
        }

        await LogoutUser(token); // API call with token

        toast.success("Logged out successfully!");
        localStorage.removeItem("token");
        router.push("/login");
      } catch (err) {
        console.error("Logout failed", err);
        toast.error("Failed to logout!");
      }
    }
  };

  // Final user data to display
  const displayUser = isGoogleUser
    ? {
        name: session?.user?.name || "Google User",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
      }
    : user;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          {displayUser?.image && <AvatarImage src={displayUser.image} />}
          <AvatarFallback>
            {displayUser?.name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {displayUser?.name || "Loading..."}
          </h2>
          <p className="text-sm text-gray-500">{displayUser?.email || ""}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 text-red-500 hover:underline"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileHeader;
