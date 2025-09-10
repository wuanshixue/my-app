"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown , Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="border-b bg-white shadow-sm">
            {/* 顶部导航 */}
            <div className="flex justify-between items-center px-4 py-3 md:px-6">
                {/* 网站标题 */}
                <Link href="/" className="text-xl font-serif md:text-2xl">
                    Coffee Wuanshixue
                </Link>

                {/* 桌面导航 */}
                <nav className="hidden md:flex items-center space-x-6 font-medium">
                    <Dropdown label="REVIEWS BY REGION" items={[
                        { href: "/reviews/africa", label: "Africa" },
                        { href: "/reviews/asian", label: "Asian" },
                        { href: "/reviews/latin-america", label: "Latin America" },
                    ]}/>
                    <Dropdown label="REVIEWS BY BREW METHOD" items={[
                        { href: "/brew/pour-over", label: "Pour Over" },
                        { href: "/brew/espresso", label: "Espresso" },
                        { href: "/brew/french-press", label: "French Press" },
                    ]}/>
                    <Dropdown label="ADVICE" items={[
                        { href: "/advice/brewing-tips", label: "Brewing Tips" },
                        { href: "/advice/bean-selection", label: "Bean Selection" },
                        { href: "/advice/storage", label: "Storage" },
                    ]}/>
                    <Link href="/contact" className="hover:text-gray-600">
                        CONTACT
                    </Link>
                </nav>

                {/* 搜索框（桌面端） */}
                <div className="hidden md:flex items-center border rounded px-2 py-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none text-sm w-32"
                    />
                    <Search className="w-4 h-4 text-gray-500 ml-1" />
                </div>

                {/* 汉堡按钮（移动端） */}
                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* 移动端 Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* 遮罩层 */}
                    <div
                        className="flex-1 bg-black/40"
                        onClick={() => setMobileOpen(false)} // 点击遮罩关闭
                    />

                    {/* 左侧菜单 */}
                    <div className="w-3/4 max-w-xs h-full bg-white shadow-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-serif">Menu</span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 rounded hover:bg-gray-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <MobileDropdown label="REVIEWS BY REGION" items={[
                                { href: "/reviews/africa", label: "Africa" },
                                { href: "/reviews/asian", label: "Asian" },
                                { href: "/reviews/latin-america", label: "Latin America" },
                            ]}/>
                            <MobileDropdown label="REVIEWS BY BREW METHOD" items={[
                                { href: "/brew/pour-over", label: "Pour Over" },
                                { href: "/brew/espresso", label: "Espresso" },
                                { href: "/brew/french-press", label: "French Press" },
                            ]}/>
                            <MobileDropdown label="ADVICE" items={[
                                { href: "/advice/brewing-tips", label: "Brewing Tips" },
                                { href: "/advice/bean-selection", label: "Bean Selection" },
                                { href: "/advice/storage", label: "Storage" },
                            ]}/>
                            <Link href="/contact" className="block h-10 px-4 py-2 hover:bg-gray-100">
                                CONTACT
                            </Link>
                        </div>

                        {/* 搜索框（移动端） */}
                        <div className="mt-6 flex items-center border rounded px-2 py-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="outline-none text-sm flex-1"
                            />
                            <Search className="w-4 h-4 text-gray-500 ml-1" />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
/* 桌面端下拉组件 */
function Dropdown({ label, items }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center hover:text-gray-600"
            >
                {label} <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {open && (
                <div className="absolute mt-2 w-48 bg-white border shadow rounded">
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-gray-100">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

/* 移动端下拉组件 */
function MobileDropdown({ label, items }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between w-full h-10 px-4 py-2 hover:bg-gray-100"
            >
                {label}
                <ChevronDown className="w-4 h-4" />
            </button>
            {open && (
                <div className="pl-6">
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className="block h-10 px-2 py-2 hover:bg-gray-50">
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
