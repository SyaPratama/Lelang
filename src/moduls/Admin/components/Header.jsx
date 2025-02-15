import Logout from "./Logout";

const Header = ({ title, name }) => {
  return (
    <div className="grid grid-cols-12 gap-2 w-full">
      <div className="col-span-10">
        <h1 className="text-3xl text-gray-600 font-semibold">
          {title}
        </h1>
      </div>
      <div className="order-2 col-span-2 lg:order-2 flex justify-end items-start">
        <p className="text-sm text-gray-900 mr-4">{name}</p>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
