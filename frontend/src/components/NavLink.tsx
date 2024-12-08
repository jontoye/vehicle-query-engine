import React from 'react'
import { NavLink as RouterNavLink } from 'react-router'

interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const NavLink = ({to, label, icon}: NavLinkProps) => {
  return (
    <RouterNavLink to={to} className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-red-500' : ''}`}>
      {icon}
      {label}
    </RouterNavLink>
  )
}
