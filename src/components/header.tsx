"use client"
import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header() {
    const isMobile = useIsMobile()
    return (
        <header className={`flex items-center justify-between ${isMobile ? 'mr-4': 'mr-12'} mt-4`}>
            <SidebarTrigger className="cursor-pointer" />
            <h1 className="text-4xl font-bold text-center">🕵️‍♂️ AI OSINT Toolkit</h1>
            <div className='flex gap-2'>
                <ThemeToggle />
            </div>
        </header>
    )
}