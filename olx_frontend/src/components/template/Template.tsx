export const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full max-w-[1024px] mx-auto">
      <main>
        {children}
      </main>
    </div>
  )
}