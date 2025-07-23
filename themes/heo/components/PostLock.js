import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * 加密文章校验组件
 * @param {password, validPassword} props
 * @param password 正确的密码
 * @param validPassword(bool) 回调函数，校验正确回调入参为true
 * @returns
 */
export const PostLock = props => {
  const { validPassword } = props
  const { locale } = useGlobal()
  const submitPassword = () => {
    const p = document.getElementById('password')
    if (!validPassword(p?.value)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = ''
        tips.innerHTML = `<div class='text-red-500 animate__shakeX animate__animated'>${locale.COMMON.PASSWORD_ERROR}</div>`
      }
    }
  }
  const passwordInputRef = useRef(null)
  useEffect(() => {
    // 选中密码输入框并将其聚焦
    passwordInputRef.current.focus()
  }, [])

  return (
    <div
      id='container'
      className='w-full flex justify-center items-center min-h-96 py-12 px-4'>
      <div className='text-center space-y-6 max-w-md w-full'>
        <div className='space-y-2'>
          <div className='text-6xl mb-4'>🔒</div>
          <h2 className='text-2xl font-bold dark:text-gray-200 text-gray-800'>
            Protected Content
          </h2>
          <p className='text-gray-600 dark:text-gray-400'>
            {locale.COMMON.ARTICLE_LOCK_TIPS}
          </p>
        </div>
        <div className='flex mx-4 max-w-md'>
          <input
            id='password'
            type='password'
            placeholder='Enter password...'
            onKeyDown={e => {
              if (e.key === 'Enter') {
                submitPassword()
              }
            }}
            ref={passwordInputRef} // 绑定ref到passwordInputRef变量
            className='outline-none w-full text-sm px-4 py-3 rounded-l-lg transition focus:shadow-lg focus:ring-2 focus:ring-indigo-500 font-light bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white'></input>
          <button
            onClick={submitPassword}
            className='px-6 py-3 whitespace-nowrap cursor-pointer flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-r-lg duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl transition-all'>
            <i className='fas fa-key mr-2'></i>
            <span className='font-medium'>{locale.COMMON.SUBMIT}</span>
          </button>
        </div>
        <div id='tips' className='text-sm'></div>
      </div>
    </div>
  )
}
