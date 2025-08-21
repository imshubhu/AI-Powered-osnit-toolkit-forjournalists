import { useTheme } from "next-themes";
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mount, setMount] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    useEffect(() => {
        setMount(true);
    }, []);

    if (!mount) {
        return null
    }

    return (
        <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md cursor-pointer border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}
