import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { Children, cloneElement, ReactElement } from "react";


interface ActiveLinkProps extends LinkProps {
  activeCLass: string;
  children: ReactElement
}

export function ActiveLink({children, activeCLass, ...rest}: ActiveLinkProps){
  const { asPath } = useRouter();

  const className = asPath === rest.href
    ? activeCLass 
    : ''

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}