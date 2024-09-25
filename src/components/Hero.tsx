import React from 'react';

interface HeroProps {
    imageURI: string;
}

const Hero: React.FC<HeroProps> = ({ imageURI }) => {
    return (
        <div className="mb-8">
            <img src={imageURI} alt="Hero" className="w-full h-64 object-cover" />
        </div>
    );
};

export default Hero;