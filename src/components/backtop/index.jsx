import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {show && (
        <nav
          onClick={scrollToTop}
          className="fixed bg-[#7d7d7d] hover:bg-[#888787] z-10 bottom-[40px] shadow-md right-[30px] cursor-pointer border p-2 rounded"
        >
          <ExpandLessIcon className="text-white" />
        </nav>
      )}
    </>
  );
}
