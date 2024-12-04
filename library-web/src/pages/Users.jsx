import UserList from "../components/UserList";
import "../style/Home.css"

const Users = () => {
  return (
    <div>
      <h1 className="generic-h1">Manage Users</h1>
      <UserList />
    </div>
  );
};

export default Users;
