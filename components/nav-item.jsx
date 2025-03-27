import React from "react";

const NavItem = ({ active, href, num, name, onClick, onKeyDown }) => {
    const style = active ? "flex items-center py-2 text-blue-500" : "flex items-center py-2 text-surface-600"
  return (
    <a
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="text-surface-600"
      role="link"
      tabIndex={0} 
      aria-current={active ? "page" : undefined} 
    >
      <span className="mr-2 text-sm">{num}</span>
      {active? <span>- {name}</span>:<span>{name}</span>}
    </a>
  );
};

export default NavItem;