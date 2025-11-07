'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger
} from '@/registry/new-york-v4/ui/dialog';
import { Input } from '@/registry/new-york-v4/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/registry/new-york-v4/ui/sheet';

import { TextAnimate } from './bgComponents/text-animate';
import HamburgerToggle from './hambruger';
import { ThemeToggleButton } from './ui/themeButton';
import { VercelCMDK } from './vercelCMDK';

function NavBar() {
    const { theme, resolvedTheme, setTheme } = useTheme();

    // ✅ all hooks must be declared before any conditional return
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close on resize/orientation
    useEffect(() => {
        const close = () => setIsOpen(false);
        window.addEventListener('resize', close);
        window.addEventListener('orientationchange', close);

        return () => {
            window.removeEventListener('resize', close);
            window.removeEventListener('orientationchange', close);
        };
    }, []);

    const isDark = resolvedTheme === 'dark';

    // ✅ render a lightweight placeholder until mounted
    if (!mounted) {
        return <div className='h-12 w-full' />;
    }

    return (
        <div className='flex h-auto min-h-12 w-full items-center'>
            <div className='flex h-full min-h-12 w-1/6 items-center justify-center py-2'>
                <Link href={'/'}>
                    <img
                        src={isDark ? '/fav-white.png' : '/fav-black.png'}
                        alt='logo'
                        width={100}
                        height={100}
                        className='h-12 w-12 rounded-full transition-all hover:scale-110'
                    />
                </Link>
            </div>

            <div className='flex h-full min-h-12 w-3/6 items-center justify-center'>
                <Dialog>
                    <DialogTrigger>
                        <Input placeholder='Search...' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <VercelCMDK />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='flex h-full min-h-12 w-1/6 items-center justify-center'>
                <span className='scale-75'>
                    <ThemeToggleButton variant='polygon' blur={true} start='bottom-center' />
                </span>
            </div>

            <div className='relative flex h-full min-h-12 w-1/6 items-center justify-center'>
                <Sheet>
                    <SheetTrigger>
                        <HamburgerToggle isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)} />
                    </SheetTrigger>
                    <SheetContent side='right' ref={sheetRef}>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription>
                                <Link href={'/'}>
                                    <TextAnimate className='py-1 text-2xl' animation='slideRight'>
                                        HOME
                                    </TextAnimate>
                                </Link>
                                <Link href={'/about'}>
                                    <TextAnimate className='py-1 text-2xl' animation='slideRight'>
                                        ABOUT
                                    </TextAnimate>
                                </Link>
                                <Link href={'/contact'}>
                                    <TextAnimate className='py-1 text-2xl' animation='slideRight'>
                                        CONTACT
                                    </TextAnimate>
                                </Link>
                                <Link href={'https://search.abhyudaya.space/'}>
                                    <TextAnimate className='py-1 text-2xl' animation='slideRight'>
                                        SERVICES
                                    </TextAnimate>
                                </Link>
                                <Link href={'https://github.com/deepabhyudaya'}>
                                    <TextAnimate className='py-1 text-2xl' animation='slideRight'>
                                        GITHUB
                                    </TextAnimate>
                                </Link>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default NavBar;
