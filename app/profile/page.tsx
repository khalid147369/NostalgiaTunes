import Profile from "@/components/profile/profile";
import AuthGuard from "../authGuard/authGuard";


export default function ProfilePage() {
  return (
    <AuthGuard>
      <Profile/>
    </AuthGuard>
   
  );
}
