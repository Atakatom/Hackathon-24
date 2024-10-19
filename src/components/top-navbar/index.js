import './style.css';

const TopNavbar = () => {


    return (
        <nav className="navigation">
            <div className='title-container'>
                <label className='item1'>FastY</label>
            </div>
            <div className='item2' />
            <div className='icon-container item3'>
                <img src='/images/profil.png' className='icon' alt="" />
            </div>
            <div className='icon-container item3'>
                <img src='/images/notification.png' className='icon' alt="" />
            </div>
        </nav>
    );
};

export default TopNavbar;
