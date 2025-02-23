import MainNav from "./MainNav";
import TopNav from "./TopNav";

const Header = () => {
  return (
    <div className="nc-Header sticky inset-x-0 top-0 z-50 w-full border-b border-neutral-300 bg-white">
      <TopNav />
      <MainNav />
    </div>
  );
};

export default Header;
