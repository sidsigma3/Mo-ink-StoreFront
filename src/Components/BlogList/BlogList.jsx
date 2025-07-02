import React ,{ useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BlogBox1 from './BlogBox1'
import BlogBox2 from "./BloxBox2";
import BlogBox3 from "./BloxBox3";
import BlogBox4 from "./BloxBox4";



const BlogList = () => {

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Check if scrolling is possible
    useEffect(() => {
        const checkScroll = () => {
            if (scrollRef.current) {
                setCanScrollLeft(scrollRef.current.scrollLeft > 0);
                setCanScrollRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
            }
        };

        checkScroll(); // Ensure state updates on mount
        window.addEventListener("resize", checkScroll);
        scrollRef.current?.addEventListener("scroll", checkScroll);

        return () => {
            window.removeEventListener("resize", checkScroll);
            scrollRef.current?.removeEventListener("scroll", checkScroll);
        };
    }, []);

    // Scroll left & right
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

  return (
    <div className="relative flex items-center">
            {canScrollLeft && (
                <button
                    className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-all"
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft size={20} />
                </button>
            )}

            <div className="w-full overflow-hidden">
                <h3 className="text-2xl font-semibold md:text-5xl text-center text-gray-900 mb-12">Tips, Tricks & Guides Blog</h3>
                <ul ref={scrollRef} className="flex overflow-x-auto gap-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-3 scrollbar-hide">
                    <li><BlogBox1 /></li>
                    <li><BlogBox2 /></li>
                    <li><BlogBox3 /></li>
                    <li><BlogBox4 /></li>
                </ul>
            </div>

            {canScrollRight && (
                <button
                    className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-all"
                    onClick={() => scroll("right")}
                >
                    <FaChevronRight size={20} />
                </button>
            )}
        </div>
  )
}

export default BlogList