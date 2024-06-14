"use client"
import Hero from '@/components/Hero';

import { useEffect } from 'react';

import AOS from "aos";
import "aos/dist/aos.css";
import Slider from '@/components/SliderCard';
import Home from '@/components/Home';

export default function Index() {
  useEffect(() => {
    AOS.init({ once: true, easing: "ease-in-sine", delay: 50 });
    AOS.refresh();

  }, []);


  return (
    <>
      <Home />
    </>
  );
}