import React from 'react';

interface HeroProps {
  imageURI: string;
}

const Hero: React.FC<HeroProps> = ({ imageURI }) => {
  return (
    <div className='mb-8'>
      <img src={imageURI} alt='Hero' className='h-64 w-full object-cover' />
    </div>
  );
};

export default Hero;
