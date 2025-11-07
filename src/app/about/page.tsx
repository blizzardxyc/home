import React from 'react';

import { TextAnimate } from '@/components/bgComponents/text-animate';
import FeatureSection from '@/components/features';

function About() {
    return (
        <div className='flex h-auto min-h-screen flex-col items-center justify-center p-12'>
            <h1 className='text-2xl font-bold'></h1>
            <TextAnimate className='text-2xl font-bold' by='word' animation={'slideUp'}>
                I am Abhyudaya, a 1st-year B-Tech student. I like coffee and to code. I enjoy dynamic, and functional programming. Connect with me, if you wanna WebApp with uncommon design.
            </TextAnimate>
            <FeatureSection />
        </div>
    );
}

export default About;
