import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import WavesArea from './WavesArea'

/**
 * 文章页头
 * @param {*} param0
 * @returns
 */
export default function PostHeader({ post, siteInfo, isDarkMode }) {
  if (!post) {
    return <></>
  }
  // 文章头图
  const headerImage = post?.pageCover ? post.pageCover : siteInfo?.pageCover
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  return (
    <div
      id='post-bg'
      className='md:mb-0 -mb-5 w-full h-[30rem] relative md:flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat z-10'>
      
      {/* Background image with opacity */}
      <div className='absolute inset-0 w-full h-full'>
        <LazyImage
          id='post-cover'
          className={`w-full h-full object-cover ${isDarkMode ? 'opacity-20' : 'opacity-50'}`}
          src={headerImage}
        />
        {/* Overlay for better text readability */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black bg-opacity-40' : 'bg-white bg-opacity-60'}`}></div>
      </div>

      <div className='absolute top-0 w-full h-full py-10 flex justify-center items-center'>
        {/* 文章文字描述 */}
        <div
          id='post-info'
          className='absolute top-48 z-10 flex flex-col space-y-4 lg:-mt-12 w-full max-w-[86rem] px-5'>
          {/* 分类+标签 */}
          <div className='flex justify-center md:justify-start items-center gap-4'>
            {post.category && (
              <>
                <Link
                  href={`/category/${post.category}`}
                  className='mr-4'
                  passHref
                  legacyBehavior>
                  <div className='cursor-pointer font-sm font-bold px-3 py-1 rounded-lg hover:bg-white text-white bg-blue-500 dark:bg-yellow-500 hover:text-blue-500 dark:hover:text-yellow-500 duration-200 '>
                    {post.category}
                  </div>
                </Link>
              </>
            )}

            {post.tagItems && (
              <div className='hidden md:flex justify-center flex-nowrap overflow-x-auto'>
                {post.tagItems.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${encodeURIComponent(tag.name)}`}
                    passHref
                    className={
                      'cursor-pointer inline-block text-gray-800 dark:text-gray-50 hover:text-gray-900 dark:hover:text-white duration-200 py-0.5 px-1 whitespace-nowrap '
                    }>
                    <div className='font-light flex items-center'>
                      <HashTag className='text-gray-700 dark:text-gray-200 stroke-2 mr-0.5 w-3 h-3' />{' '}
                      {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 文章Title */}
          <div className={`max-w-5xl font-bold text-3xl lg:text-5xl md:leading-snug shadow-text-md flex justify-center md:justify-start ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}
            {post.title}
          </div>

          {/* 标题底部补充信息 */}
          <section className={`flex-wrap shadow-text-md flex text-sm justify-center md:justify-start mt-4 font-normal leading-8 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            <div className='flex flex-wrap justify-center md:justify-start items-center gap-4'>
              <div className='flex items-center bg-black bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm'>
                <WordCount
                  wordCount={post.wordCount}
                  readTime={post.readTime}
                />
              </div>
              
              {post?.type !== 'Page' && (
                <Link
                  href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                  passHref
                  className={`flex items-center bg-black bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm cursor-pointer hover:bg-opacity-30 transition-all duration-200 ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                  <i className='fa-regular fa-calendar mr-2'></i>
                  <span>Created {post?.publishDay}</span>
                </Link>
              )}

              <div className={`flex items-center bg-black bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                <i className='fa-regular fa-calendar-check mr-2'></i>
                <span>Updated {post.lastEditedDay}</span>
              </div>

              {/* 阅读统计 */}
              {ANALYTICS_BUSUANZI_ENABLE && (
                <div className={`busuanzi_container_page_pv flex items-center bg-black bg-opacity-20 px-3 py-1 rounded-full backdrop-blur-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  <i className='fa-solid fa-fire-flame-curved mr-2'></i>
                  <span className='busuanzi_value_page_pv' />
                  <span className='ml-1'>views</span>
                </div>
              )}
            </div>
          </section>
        </div>

        <WavesArea />
      </div>
    </div>
  )
}
