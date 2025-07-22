import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import md5 from 'js-md5'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * Features:
 * - Gravatar support as fallback avatar (uses CONTACT_EMAIL)
 * - Enhanced bio section with BIO config
 * - Optional company and location display (add AUTHOR_COMPANY and AUTHOR_LOCATION to your config)
 * - Improved avatar styling with ring effects and hover transitions
 * 
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  // Support for array-based social links
  const socialLinks = siteConfig('HEO_INFO_CARD_LINKS', [
    {
      url: siteConfig('HEO_INFO_CARD_URL1', null, CONFIG),
      icon: siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
    },
    {
      url: siteConfig('HEO_INFO_CARD_URL2', null, CONFIG),
      icon: siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)
    }
  ], CONFIG).filter(link => link.url && link.icon) // Filter out empty links
  
  // Gravatar support - fallback when no siteInfo icon is available
  const contactEmail = siteConfig('CONTACT_EMAIL', '')
  const emailHash = contactEmail ? md5(contactEmail.toLowerCase().trim()) : ''
  const gravatarUrl = emailHash ? `https://gravatar.com/avatar/${emailHash}?s=200&d=mp&r=g` : ''
  const avatarSrc = gravatarUrl || siteInfo?.icon
  
  // Bio information
  const bio = siteConfig('BIO', '')
  // Optional: Add these to your blog.config.js or environment variables to enable company/location display:
  // AUTHOR_LOCATION: 'Your City, Country'
  // AUTHOR_COMPANY: 'Your Company Name'
  
  return (
    <Card className='wow fadeInUp bg-[#4f65f0] dark:bg-yellow-600 text-white flex flex-col w-72 max-w-sm overflow-hidden relative p-4'>
      {/* Header with greeting */}
      <div className='flex justify-end mb-3'>
        {/* <GreetingsWords /> */}
      </div>

      {/* Large centered avatar */}
      <div className='flex justify-center mb-3'>
        <div className='relative'>
          <LazyImage
            src={avatarSrc}
            className='rounded-full ring-4 ring-white/30 hover:ring-white/50 transition-all duration-300 shadow-xl'
            width={100}
            height={100}
            alt={siteConfig('AUTHOR')}
          />
        </div>
      </div>

      {/* Author name centered */}
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-bold break-words'>{siteConfig('AUTHOR')}</h2>
      </div>
      
      {/* Bio section centered */}
      {bio && (
        <div className='text-center mb-3'>
          <p className='opacity-90 leading-relaxed break-words'>{bio}</p>
        </div>
      )}

      {/* 公告栏 */}
      <Announcement post={notice} style={{ color: 'white !important' }} />

      {/* Social buttons - dynamic array support */}
      {socialLinks.length > 0 && (
        <div className='flex justify-center mt-3 gap-2 flex-wrap'>
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className='w-12 h-12 text-center bg-indigo-400 p-1.5 rounded-full flex items-center justify-center transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white hover:text-black dark:hover:text-white'
            >
              <Link href={link.url}>
                <i className={link.icon} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className=' select-none cursor-pointer py-1 px-2 bg-indigo-400 hover:bg-indigo-50  hover:text-indigo-950 dark:bg-yellow-500 dark:hover:text-white dark:hover:bg-black text-sm rounded-lg  duration-200 transition-colors'>
      {greeting}
    </div>
  )
}
