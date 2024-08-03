"use client" 

import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemIds = [
  {label:"Dashboard",link:"/",} , 
  {label:"Patients",link:"/patients",},
  {label:"Doctors",link:"/doctors",},
  {label:"Hospital",link:"/hospital",},
];

export const Navigation: React.FC = () => (
  <motion.ul variants={variants}>
    {itemIds.map((item, i) => (
      <MenuItem item={item} key={i} />
    ))}
  </motion.ul>
);
