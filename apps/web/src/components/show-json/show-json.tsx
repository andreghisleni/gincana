'use client'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

export default function SJ({ data }: { data: any }) { // eslint-disable-line
  const [code, setCode] = useState('')

  useEffect(() => {
    ;(async () => {
      const c = await codeToHtml(JSON.stringify(data, null, 2), {
        lang: 'json',
        themes: {
          light: 'min-light',
          dark: 'nord',
        },
      })

      setCode(c)
    })()
  }, [data])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: code,
      }}
    />
  )
}
