import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar'


const App = () => {
    const [scroll, setScroll] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            
            // Prevent division by zero if content isn't scrollable
            if (scrollHeight <= 0) {
                setScroll(0);
                return;
            }

            const scrolled = (scrollTop / scrollHeight) * 100;
            setScroll(scrolled);
        };

        // Calculate initial state on mount
        handleScroll();

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="">
            {/* Scrollable Container Wrapper */}
            <div className="relative w-full max-w-3xl shadow-lg rounded-lg overflow-hidden bg-white">
                {/* Scroll Progress Bar (Scoped to container width) */}
                <div 
                    className="absolute top-0 left-0 h-1 z-50 bg-indigo-600 transition-all duration-200 ease-out"
                    style={{ width: `${scroll}%` }}
                />

                {/* Scrollable Container */}
                <div 
                    ref={containerRef}
                    className="overflow-y-auto h-[500px] p-6 space-y-6"
                >
                    
                  <Navbar/>
                    
                </div>
            </div>
        </div>
    );
};

export default App;