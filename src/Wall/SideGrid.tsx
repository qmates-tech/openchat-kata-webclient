import React from "react";
import "./SideGrid.css";

type SideGridProps = {
  sideBar: React.ReactNode;
  children: React.ReactNode;
}

export function SideGrid({ sideBar, children }: SideGridProps) {
  return (
    <div className="side-grid">
      <aside>
        <article>{sideBar}</article>
      </aside>
      <div>{children}</div>
    </div>
  );
}