import React, { useState, useRef, useEffect } from 'react';

export function Popover({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverRef]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {React.Children.map(children, child => {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        if (child.type === PopoverContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function PopoverTrigger({ asChild, children, ...props }) {
  if (asChild) {
    return React.cloneElement(children, { ...props });
  }

  return (
    <button {...props}>
      {children}
    </button>
  );
}

export function PopoverContent({ className = '', ...props }) {
  return (
    <div
      className={`z-50 absolute top-full left-0 mt-2 bg-white border rounded-md shadow-md ${className}`}
      {...props}
    />
  );
}
