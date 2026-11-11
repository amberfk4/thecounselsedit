"use client";

import type { ComponentProps, MouseEvent } from "react";

function closeOwningPanel(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
}

export function PanelLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} onClick={closeOwningPanel}>
      {children}
    </a>
  );
}
