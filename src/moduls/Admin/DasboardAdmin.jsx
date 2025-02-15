import Header from "./components/Header";
import { useAuth } from "../../Auth/AuthContext"; // Sesuaikan dengan path yang benar

function DasboardAdmin() {
  const { name } = useAuth();

  return (
    <>
      <Header title="Dashboard Admin" name={name} />
      <div>DasboardAdmin</div>
    </>
  );
}

export default DasboardAdmin;
