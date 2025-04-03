'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer as FooterType, Media } from '../../../../payload/payload-types'
import { inclusions, noHeaderFooterUrls } from '../../../constants'
import { Button } from '../../Button'
import { Gutter } from '../../Gutter'

import styles from './index.module.scss'

const Footer = ({ footer }: { footer: FooterType }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? styles.hide : styles.footer}>
      <Gutter>
        {/* Footer Wrapper */}
        <div className={styles.footerWrap}>
          {/* Footer Left Section */}
          <div className={styles.footerLeft}>
            <Link href="/">
              <Image src="/logo-white.png" alt="logo" width={170} height={50} />
            </Link>
            <p>Best information about the company goes here, but now lorem ipsum is used.</p>

            <div className={styles.socialLinks}>
              {navItems.map(item => {
                const icon = item?.link?.icon as Media
                return (
                  <Button
                    key={item.link.label}
                    el="link"
                    href={item.link.url}
                    newTab={true}
                    className={styles.socialLinkItem}
                  >
                    <Image
                      src={icon?.url}
                      alt={item.link.label}
                      width={24}
                      height={24}
                      className={styles.socialIcon}
                    />
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Footer Right Section */}
          <div className={styles.footerRight}>
            {/* COMPANY Section */}
            <div className={styles.footerColumn}>
              <h1 className={styles.footerTitle}>About</h1>
              <div className={styles.footerLinks}>
                <Link href="">About Us</Link>
                <Link href="">Find store</Link>
                <Link href="">Categories</Link>
                <Link href="">Blog</Link>
              </div>
            </div>

            {/* PARTNERSHIP Section */}
            <div className={styles.footerColumn}>
              <h1 className={styles.footerTitle}>Partnership</h1>
              <div className={styles.footerLinks}>
                <Link href="">About Us</Link>
                <Link href="">Find store</Link>
                <Link href="">Categories</Link>
                <Link href="">Blog</Link>
              </div>
            </div>

            {/* INFORMATION Section */}
            <div className={styles.footerColumn}>
              <h1 className={styles.footerTitle}>Information</h1>
              <div className={styles.footerLinks}>
                <Link href="">Help Center</Link>
                <Link href="">Money Refund</Link>
                <Link href="">Shipping</Link>
                <Link href="">Contact us</Link>
              </div>
            </div>

            {/* USER Section */}
            <div className={styles.footerColumn}>
              <h1 className={styles.footerTitle}>For Users</h1>
              <div className={styles.footerLinks}>
                <Link href="">Login</Link>
                <Link href="">Register</Link>
                <Link href="">Settings</Link>
                <Link href="">My Orders</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.footerColumn}>
              <h1 className={styles.footerTitle}>Get the App</h1>
              <div className={styles.footerLinks}>
                <Link href="https://www.apple.com/app-store/">
                  <Image
                    src="/AppS.png"
                    alt="Download on the App Store"
                    width={160} // Adjust the width as needed
                    height={50} // Adjust the height as needed
                    className={styles.appImage}
                  />
                </Link>
                <Link href="https://play.google.com/store">
                  <Image
                    src="/GppgleP.png"
                    alt="Get it on Google Play"
                    width={160} // Adjust the width as needed
                    height={50} // Adjust the height as needed
                    className={styles.appImage}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Gutter>

      {/* Copyright */}
      <p className={styles.footerCopyright}>{footer?.copyright}</p>
    </footer>
  )
}

export default Footer
