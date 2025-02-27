"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaCog } from "react-icons/fa";
import { JSX } from "react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div style={styles.navBar}>
      <NavItem href="/home" icon={<FaHome />} active={pathname === "/home"} />
      <NavItem href="/settings" icon={<FaCog />} active={pathname === "/settings"} />
    </div>
  );
}

function NavItem({ href, icon, active }: { href: string; icon: JSX.Element; active: boolean }) {
  return (
    <Link href={href} style={styles.navItem}>
      <div style={{ 
        ...styles.iconContainer, 
        color: active ? "#ff4757" : "#555", 
        transform: active ? "scale(1.1)" : "scale(1)", 
        transition: "color 0.3s ease, transform 0.3s ease" 
      }}>
        {icon}
      </div>
      <div style={{ 
        ...styles.activeIndicator, 
        opacity: active ? 1 : 0, 
        transform: active ? "scaleX(1)" : "scaleX(0)" 
      }} />
    </Link>
  );
}

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "fixed",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    backgroundColor: "#fff",
    padding: "12px 0",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  } as React.CSSProperties,
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    textDecoration: "none",
  } as React.CSSProperties,
  iconContainer: {
    fontSize: "28px",
    transition: "color 0.3s ease, transform 0.3s ease",
  },
  activeIndicator: {
    position: "absolute",
    bottom: "-8px",
    width: "20px",
    height: "4px",
    backgroundColor: "#ff4757",
    borderRadius: "2px",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  } as React.CSSProperties,
};
