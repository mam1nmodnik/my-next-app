"use client";
import { useState, useEffect } from "react";

export function useIsTouchDevice(): boolean {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        const hasTouchScreen =
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(hover: none)").matches;
        setIsTouch(() => hasTouchScreen);
    }, []);

    return isTouch;
}
