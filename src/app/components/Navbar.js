"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isRegionOpen, setRegionOpen] = useState(false);
    const [isBrewOpen, setBrewOpen] = useState(false);
    const [isAdviceOpen, setAdviceOpen] = useState(false);

    return (
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
            {/* 左边 Logo */}
            <Link href="/" className="text-xl font-bold">
                Coffee Blog
            </Link>

            {/* 中间导航 */}
            <nav className="flex items-center space-x-6 font-semibold">
                <Link href="/contact" className="hover:text-gray-600">
                    CONTACT
                </Link>

                {/* 下拉：Reviews by Region */}
                <div className="relative">
                    <button
                        onClick={() => setRegionOpen(!isRegionOpen)}
                        className="flex items-center hover:text-gray-600"
                    >
                        REVIEWS BY REGION <span className="ml-1">▼</span>
                    </button>
                    {isRegionOpen && (
                        <div className="absolute mt-2 w-48 bg-white border shadow rounded">
                            <Link href="/region/asia" className="block px-4 py-2 hover:bg-gray-100">
                                Asia
                            </Link>
                            <Link href="/region/africa" className="block px-4 py-2 hover:bg-gray-100">
                                Africa
                            </Link>
                            <Link href="/region/latin-america" className="block px-4 py-2 hover:bg-gray-100">
                                Latin America
                            </Link>
                        </div>
                    )}
                </div>

                {/* 下拉：Reviews by Brew Method */}
                <div className="relative">
                    <button
                        onClick={() => setBrewOpen(!isBrewOpen)}
                        className="flex items-center hover:text-gray-600"
                    >
                        REVIEWS BY BREW METHOD <span className="ml-1">▼</span>
                    </button>
                    {isBrewOpen && (
                        <div className="absolute mt-2 w-56 bg-white border shadow rounded">
                            <Link href="/brew/pour-over" className="block px-4 py-2 hover:bg-gray-100">
                                Pour Over
                            </Link>
                            <Link href="/brew/espresso" className="block px-4 py-2 hover:bg-gray-100">
                                Espresso
                            </Link>
                            <Link href="/brew/french-press" className="block px-4 py-2 hover:bg-gray-100">
                                French Press
                            </Link>
                        </div>
                    )}
                </div>

                {/* 下拉：Advice */}
                <div className="relative">
                    <button
                        onClick={() => setAdviceOpen(!isAdviceOpen)}
                        className="flex items-center hover:text-gray-600"
                    >
                        ADVICE <span className="ml-1">▼</span>
                    </button>
                    {isAdviceOpen && (
                        <div className="absolute mt-2 w-48 bg-white border shadow rounded">
                            <Link href="/advice/brewing-tips" className="block px-4 py-2 hover:bg-gray-100">
                                Brewing Tips
                            </Link>
                            <Link href="/advice/bean-selection" className="block px-4 py-2 hover:bg-gray-100">
                                Bean Selection
                            </Link>
                            <Link href="/advice/storage" className="block px-4 py-2 hover:bg-gray-100">
                                Storage
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* 右边搜索框 */}
            <div className="flex items-center border rounded px-2 py-1">
                <input
                    type="text"
                    placeholder="Search"
                    className="outline-none text-sm w-32"
                />
                <span className="text-gray-500 ml-1">🔍</span>
            </div>
        </header>
    );
}
