import './Home.css';
import React  from 'react';

const Home = () => { 
    
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className="home-background">
            <h1 className="text-center fw-bold text-uppercase" style={{color: '#ffffff'}}>Welcome to your tasks Management</h1>
        </div>
    );
}

export default Home;