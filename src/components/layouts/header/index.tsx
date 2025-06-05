import { Logo } from "@/components/ui/logo"
import { HEADER_LINKS } from "@/constants/links-config"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Link } from "@tanstack/react-router"

export function Header() {
  return (
    <header className="container flex w-full items-center gap-x-8 py-[32px] font-heading">
      <div className="flex gap-16">
        <Link to="/" className=" mt-1.5">
          <Logo />
        </Link>

        <div className="flex items-center gap-x-10">
          {HEADER_LINKS.map((link) => (
            <Link
              to={link.to}
              className="font-semibold opacity-50 [&.active]:opacity-100"
              key={link.to}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  )
}
