"use client";

import React, { useState, useEffect, useRef } from "react";
import NavItem from "./nav-item";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);
  const isScrolling = useRef(false); // Track if scrolling is in progress

  // Debounce function to limit the frequency of the observer callback
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    // Intersection Observer setup
    observer.current = new IntersectionObserver(
      debounce((entries) => {
        if (isScrolling.current) return; // Skip if scrolling is in progress

        const visibleSection = entries.find(
          (entry) => entry.isIntersecting
        )?.target;
        if (visibleSection) {
          setActiveSection(visibleSection.id);
        }
      }, 100), // Debounce delay of 100ms
      { threshold: 0.1 } // Adjust threshold as needed
    );

    // Observe all sections with the `data-section` attribute
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observer.current.observe(section);
    });

    // Cleanup observer on unmount
    return () => {
      if (observer.current) {
        sections.forEach((section) => {
          observer.current.unobserve(section);
        });
      }
    };
  }, []);

  // Handle smooth scrolling to a section
  const handleClick = (section) => {
    isScrolling.current = true; // Disable observer during scroll
    setActiveSection(section); // Set active section immediately

    const targetSection = document.getElementById(section);
    if (targetSection) {
      // Calculate scroll duration based on distance
      const scrollDuration = Math.min(
        1000, // Max duration
        Math.max(300, Math.abs(targetSection.offsetTop - window.scrollY) / 2) // Dynamic duration
      );

      // Smooth scroll to the target section
      targetSection.scrollIntoView({ behavior: "smooth" });

      // Re-enable observer after scroll completes
      setTimeout(() => {
        isScrolling.current = false;
      }, scrollDuration);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, section) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(section);
    }
  };

  return (
    <div
      id="navigation"
      className="flex flex-col py-10 font-medium tracking-widest"
      role="navigation"
      aria-label="Main navigation"
    >
      <NavItem
        active={activeSection === "about"}
        href="#about"
        num="01"
        name="ABOUT"
        onClick={() => handleClick("about")}
        onKeyDown={(e) => handleKeyDown(e, "about")}
      />
      <NavItem
        active={activeSection === "experience"}
        href="#experience"
        num="02"
        name="EXPERIENCE"
        onClick={() => handleClick("experience")}
        onKeyDown={(e) => handleKeyDown(e, "experience")}
      />
      <NavItem
        active={activeSection === "education"}
        href="#education"
        num="03"
        name="EDUCATION"
        onClick={() => handleClick("education")}
        onKeyDown={(e) => handleKeyDown(e, "education")}
      />
      <NavItem
        active={activeSection === "projects"}
        href="#projects"
        num="04"
        name="PROJECTS"
        onClick={() => handleClick("projects")}
        onKeyDown={(e) => handleKeyDown(e, "projects")}
      />
    </div>
  );
};

export default Navigation;