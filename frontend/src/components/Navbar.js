
function Navbar (){

const links = [{href:"/" , name : "home"},{href:"/map" , name : "map"},
    {href:"/review" , name : "review"},{href:"/profile" , name : "profile"}];
    return (
        <nav>
            <ul>
                {links.map(link =>(
                    <li>
                        <a href = {link.href}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>

    );


}

export default Navbar;
