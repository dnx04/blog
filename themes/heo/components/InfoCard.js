import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import md5 from 'js-md5'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * Features:
 * - Random natural background from Unsplash
 * - Official social media icons
 * - Gravatar support as fallback avatar (uses CONTACT_EMAIL)
 * - Enhanced bio section with BIO config
 * - Improved visual hierarchy with overlay effects
 * 
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  const [backgroundImage, setBackgroundImage] = useState('')
  
  // Generate random natural background from Unsplash
  useEffect(() => {
    const unsplashKeywords = ['nature', 'landscape', 'mountains', 'forest', 'ocean', 'sunset', 'clouds', 'trees', 'lake', 'sky', 'aurora', 'canyon', 'waterfall', 'beach']
    const randomKeyword = unsplashKeywords[Math.floor(Math.random() * unsplashKeywords.length)]
    const randomId = Date.now() + Math.floor(Math.random() * 1000) // Use timestamp for better randomness
    const imageUrl = `https://source.unsplash.com/600x400/?${randomKeyword}&sig=${randomId}`
    setBackgroundImage(imageUrl)
  }, [])
  
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  
  // Enhanced social links with platform detection for official icons
  const getSocialPlatform = (url) => {
    if (!url) return null
    if (url.includes('github.com')) return 'github'
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
    if (url.includes('linkedin.com')) return 'linkedin'
    if (url.includes('instagram.com')) return 'instagram'
    if (url.includes('facebook.com')) return 'facebook'
    if (url.includes('youtube.com')) return 'youtube'
    if (url.includes('telegram') || url.includes('t.me')) return 'telegram'
    if (url.includes('discord')) return 'discord'
    if (url.includes('reddit.com')) return 'reddit'
    if (url.includes('tiktok.com')) return 'tiktok'
    if (url.includes('twitch.tv')) return 'twitch'
    if (url.includes('behance.net')) return 'behance'
    if (url.includes('dribbble.com')) return 'dribbble'
    if (url.includes('mastodon')) return 'mastodon'
    if (url.includes('medium.com')) return 'medium'
    return 'link'
  }
  
  const getPlatformIcon = (platform) => {
    const icons = {
      github: 'fa-brands fa-github',
      twitter: 'fa-brands fa-x-twitter', // Updated for FontAwesome 7
      linkedin: 'fa-brands fa-linkedin',
      instagram: 'fa-brands fa-instagram',
      facebook: 'fa-brands fa-facebook',
      youtube: 'fa-brands fa-youtube',
      telegram: 'fa-brands fa-telegram', // Fixed for FontAwesome 7
      discord: 'fa-brands fa-discord',
      reddit: 'fa-brands fa-reddit',
      tiktok: 'fa-brands fa-tiktok',
      twitch: 'fa-brands fa-twitch',
      behance: 'fa-brands fa-behance',
      dribbble: 'fa-brands fa-dribbble',
      mastodon: 'fa-brands fa-mastodon',
      medium: 'fa-brands fa-medium',
      link: 'fas fa-link'
    }
    return icons[platform] || 'fas fa-link'
  }
  
  const getPlatformColor = (platform) => {
    const colors = {
      github: 'hover:bg-gray-800',
      twitter: 'hover:bg-blue-400',
      linkedin: 'hover:bg-blue-600',
      instagram: 'hover:bg-pink-500',
      facebook: 'hover:bg-blue-700',
      youtube: 'hover:bg-red-600',
      telegram: 'hover:bg-blue-500',
      discord: 'hover:bg-indigo-600',
      reddit: 'hover:bg-orange-600',
      tiktok: 'hover:bg-black',
      twitch: 'hover:bg-purple-600',
      behance: 'hover:bg-blue-600',
      dribbble: 'hover:bg-pink-400',
      mastodon: 'hover:bg-purple-500',
      medium: 'hover:bg-green-600',
      link: 'hover:bg-gray-600'
    }
    return colors[platform] || 'hover:bg-gray-600'
  }
  
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
  ], CONFIG).filter(link => link.url).map(link => {
    const platform = getSocialPlatform(link.url)
    return {
      ...link,
      platform,
      officialIcon: getPlatformIcon(platform),
      platformColor: getPlatformColor(platform)
    }
  })
  
  // Gravatar support - fallback when no siteInfo icon is available
  const contactEmail = siteConfig('CONTACT_EMAIL', '')
  const emailHash = contactEmail ? md5(contactEmail.toLowerCase().trim()) : ''
  const gravatarUrl = emailHash ? `https://gravatar.com/avatar/${emailHash}?s=200&d=mp&r=g` : ''
  const avatarSrc = gravatarUrl || siteInfo?.icon
  
  // Bio information
  const bio = siteConfig('BIO', '')
  
  return (
    <Card className='wow fadeInUp text-white flex flex-col w-72 max-w-sm overflow-hidden relative p-0'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        {/* Fallback gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700'></div>
        {backgroundImage && (
          <LazyImage
            src={backgroundImage}
            className='w-full h-full object-cover'
            width={600}
            height={400}
            alt="Natural background"
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60'></div>
      </div>

      <h2 className='text-3xl font-extrabold mt-3'>{siteConfig('AUTHOR')}</h2>

      {/* 公告栏 */}
      <Announcement post={notice} style={{ color: 'white !important' }} />

      <div className='flex justify-between'>
        <div className='flex space-x-3  hover:text-black dark:hover:text-white'>
          {/* 两个社交按钮 */}
          {url1 && (
            <div className='w-10 text-center bg-indigo-400 p-2 rounded-full  transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white'>
              <SmartLink href={url1}>
                <i className={icon1} />
              </SmartLink>
            </div>
          )}
          {url2 && (
            <div className='bg-indigo-400 p-2 rounded-full w-10 items-center flex justify-center transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white'>
              <SmartLink href={url2}>
                <i className={icon2} />
              </SmartLink>
            </div>
          )}
        </div>

        {/* Large centered avatar */}
        <div className='flex justify-center mb-3'>
          <div className='relative'>
            <LazyImage
              src={avatarSrc}
              className='rounded-full ring-4 ring-white/30 hover:ring-white/50 transition-all duration-300 shadow-xl backdrop-blur-sm'
              width={100}
              height={100}
              alt={siteConfig('AUTHOR')}
            />
          </div>
        </div>

        {/* Author name centered */}
        <div className='text-center mb-2'>
          <h2 className='text-2xl font-bold break-words drop-shadow-lg'>{siteConfig('AUTHOR')}</h2>
        </div>
        
        {/* Bio section centered */}
        {bio && (
          <div className='text-center mb-3'>
            <p className='opacity-90 leading-relaxed break-words drop-shadow-md'>{bio}</p>
          </div>
        )}

        {/* 公告栏 */}
        <Announcement post={notice} style={{ color: 'white !important' }} />

        {/* Social buttons with official icons */}
        {socialLinks.length > 0 && (
          <div className='flex justify-center mt-3 gap-2 flex-wrap'>
            {socialLinks.map((link, index) => (
              <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                <div className={`w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/90 hover:scale-110 hover:shadow-lg group ${link.platformColor}`}>
                  <i className={`${link.officialIcon} text-sm text-white group-hover:text-gray-800 transition-colors duration-300`} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <SmartLink href={url3}>
      <div
        className={
          'group bg-indigo-400 dark:bg-yellow-500 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-full space-x-1'
        }>
        <ArrowRightCircle
          className={
            'group-hover:stroke-black dark:group-hover:stroke-white w-6 h-6 transition-all duration-100'
          }
        />
        <div className='font-bold'>{text3}</div>
      </div>
    </SmartLink>
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
      className='select-none cursor-pointer py-1 px-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-sm rounded-lg duration-200 transition-all'>
      {greeting}
    </div>
  )
}
