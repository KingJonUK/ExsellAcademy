import { Link as WouterLink } from "wouter";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

/**
 * Drop-in replacement for `next/link` backed by wouter.
 * Internal absolute paths route via wouter; external / hash / protocol links
 * fall back to a plain anchor.
 */
const Link = forwardRef<HTMLAnchorElement, NextLinkProps>(function Link(
  { href, prefetch: _prefetch, replace, scroll: _scroll, children, ...rest },
  ref,
) {
  const isInternal =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    // @ts-ignore - wouter forwards className/ref/props to the rendered anchor
    <WouterLink href={href} replace={replace} ref={ref} {...rest}>
      {children}
    </WouterLink>
  );
});

export default Link;
