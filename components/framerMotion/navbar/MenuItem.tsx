

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem: React.FC<{ item: any }> = ({ item }) => {
  // const router = useRouter()
  const style = { border: `2px solid ${colors[item]}` };
  return (
    <li
      // variants={variants}
      // whileHover={{ scale: 1.1 }}
      // whileTap={{ scale: 0.95 }}
     
    > 
    <Link  href={`${item.link}`}>

   
    
      {/* <div className="icon-placeholder" style={style} /> */}
      <div className=" text-lg" style={style}>{item.label}</div>
      </Link>
    </li>
  );
};
