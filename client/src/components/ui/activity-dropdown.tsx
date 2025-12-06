"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownItem {
    id: string
    label: string
    icon?: React.ReactNode
    color?: string
}

interface ActivityDropdownProps {
    items: DropdownItem[]
    placeholder?: string
    value?: string
    onChange?: (item: DropdownItem) => void
    className?: string
}

export function ActivityDropdown({
    items,
    placeholder = "Select an option",
    value,
    onChange,
    className
}: ActivityDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(
        value ? items.find(item => item.id === value) || null : null
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const handleItemClick = (item: DropdownItem, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedItem(item)
        setIsOpen(false)
        onChange?.(item)
    }

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    return (
        <div
            ref={dropdownRef}
            className={cn(
                "w-full rounded-xl shadow-lg overflow-hidden cursor-pointer select-none relative z-10",
                "bg-black/50 border-2 border-white/20",
                "transition-all duration-300 ease-out",
                isOpen ? "border-cyan-400 shadow-cyan-400/20" : "",
                className
            )}
            onClick={handleToggle}
        >
            {/* Header */}
            <div className="flex items-center gap-3 p-3 h-12">
                <div className="flex-1 overflow-hidden">
                    <p className={cn(
                        "text-sm transition-colors duration-200",
                        selectedItem ? "text-white" : "text-gray-500"
                    )}>
                        {selectedItem ? selectedItem.label : placeholder}
                    </p>
                </div>
                <div className="flex h-6 w-6 items-center justify-center">
                    <ChevronUp
                        className={cn(
                            "h-4 w-4 text-gray-400 transition-transform duration-300 ease-out",
                            isOpen ? "rotate-0" : "rotate-180",
                        )}
                    />
                </div>
            </div>

            {/* Dropdown List */}
            <div
                className={cn(
                    "grid",
                    "transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
            >
                <div className="overflow-hidden">
                    <div className="px-2 pb-2 max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="space-y-1">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg p-2.5",
                                        "transition-all duration-300 ease-out",
                                        "hover:bg-white/10",
                                        "cursor-pointer",
                                        selectedItem?.id === item.id ? "bg-cyan-400/20 border border-cyan-400/30" : "",
                                        isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                                    )}
                                    style={{
                                        transitionDelay: isOpen ? `${index * 30}ms` : "0ms",
                                    }}
                                    onClick={(e) => handleItemClick(item, e)}
                                >
                                    {item.icon && (
                                        <div
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                                            style={{ backgroundColor: item.color ? `${item.color}20` : 'rgba(255,255,255,0.1)' }}
                                        >
                                            <span style={{ color: item.color || '#fff' }}>{item.icon}</span>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
