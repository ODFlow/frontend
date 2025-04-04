// src/components/city/CityHeader.jsx
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';

export default function CityHeader() {
    return (
        <header className="page-header">
            <Link href="/" data-testid="navigation-button" className="nav-link">
                <HomeIcon />
                Home
            </Link>
            <Link href="/" data-testid="navigation-button" className="nav-link">
                <LockIcon/>
                <span>Privacy policy</span>
            </Link>
            <div className="search-container">
                <input
                    type="search"
                    placeholder="Search"
                    className="search-input"
                />
                <span className="search-icon">🔍</span>
            </div>
        </header>
    );
}