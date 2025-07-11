import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

interface Props {
  user?: {
    name: string;
    email: string;
  };
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user?.name || "Loading..."}</h2>
          <p className="text-sm text-gray-500">{user?.email || ""}</p>
        </div>
      </div>

      <button className="flex items-center space-x-1 text-red-500 hover:underline">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileHeader;
