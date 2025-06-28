import { useAuthStore } from "../store";
const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div>
      <h1>Profile</h1>
      <h2>{user?.username}</h2>
      <h2>{user?.email}</h2>
    </div>
  );
};

export default Profile;
