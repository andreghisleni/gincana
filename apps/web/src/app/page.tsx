import { redirect } from 'next/navigation'

export default function Homepage() {
  redirect('/dashboard')
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium">Gincana aniversario GE Xapecó</h1>
        </div>
      </div>
    </div>
  )
}
