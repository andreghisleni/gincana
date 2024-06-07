export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-[calc(100vh-56px-16px)] overflow-auto px-8 pb-8">
      {children}
    </div>
  )
}
