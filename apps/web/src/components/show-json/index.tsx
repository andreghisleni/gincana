import dynamic from 'next/dynamic'

const SJ = dynamic(() => import('./show-json'), { ssr: false })

export function ShowJson({ data }: { data: any }) { // eslint-disable-line
  return <SJ data={data} />
}
