import { Link } from 'react-router-dom';

const Header = () => {
return (
    <div className="w-full md:w-[350px] flex-shrink-0 p-4 md:p-6 md:sticky top-0">
        <Link className="flex items-center font-medium mb-6" to="/">
            <img src="/occtoo.webp" className="mr-2 w-5 h-5" />
            <div>Occtoo Demo</div>
        </Link>
    </div>
  );
};
export default Header;
