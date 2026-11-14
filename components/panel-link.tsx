"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

function closeOwningPanel(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
}

export function PanelLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props} onClick={closeOwningPanel}>
      {children}
    </Link>
  );
}
