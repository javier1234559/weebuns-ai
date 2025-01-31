import React from 'react'
import { Twitter, Github, PawPrint } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

function Footer() {
  const logo = <PawPrint className="size-10" />
  const brandName = "Weebuns AI"
  const socialLinks = [
    {
      icon: <Twitter className="size-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Github className="size-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
  ]
  const mainLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]
  const legalLinks = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ]

  const currentYear = new Date().getFullYear();
  const copyright = {
    text: `© ${currentYear} Weebuns AI Corp`,
    license: "All rights reserved",
  }

  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">

        <div className="mt-6 border-t pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:col-[4/11] lg:mt-0">
            <ul className="-mx-2 -my-1 flex list-none flex-wrap lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="mx-2 my-1 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 lg:col-[4/11] lg:mt-0">

            <ul className="-mx-3 -my-1 flex list-none flex-wrap lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="mx-3 my-1 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 whitespace-nowrap text-sm leading-6 text-muted-foreground lg:col-[1/4] lg:row-[1/3] lg:mt-0">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
        <div className="md:flex md:items-start md:justify-between">
        <ul className="ml-auto mt-6 flex list-none space-x-3 md:mt-2">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
