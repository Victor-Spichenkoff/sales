export default function ({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen bg-sky-600 flex justify-center items-center "> 
            <div className="max-w-[800px] mx-auto bg-white px-12 py-8 rounded-lg shadow-md">
                {children}
            </div>
        </div>

    )
} 