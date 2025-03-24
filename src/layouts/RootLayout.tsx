import { Outlet, Link } from "@tanstack/react-router";

export default function RootLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Outlet /> {/* This is where child pages render */}
    </div>
  );
}