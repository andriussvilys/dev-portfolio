"use client"

import { Box, Card, Divider, List, ListItem, ListItemIcon, Stack, Typography, useTheme } from "@mui/material";
import { SectionName } from "../constants";
import Section from "./section";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Adjust the delay between animations of each child
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -80, filter: 'blur(1px)' },
    visible: { 
        opacity: 1, 
        x: 0, 
        filter: 'blur(0)',     
        transition: {
        duration: 0.3,
        ease: "easeOut",
      }, 
    },
  };

export default function About(){
    const theme = useTheme()

    const controls = useAnimation();
    const ref = useRef(null)
    const isInView = useInView(ref)

      useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);
    
    const paragraphs = [
        `I'm a web developer with a knack for creating beautiful, intuitive applications that work seamlessly from front to back.`,
        `My journey into web development began in 2018, mastering the fundamentals of HTML, CSS, and JavaScript before diving into React to build more consistent, reusable code. `,
        `In 2020, I pursued a Bachelor's degree in Computer Science at Vilnius University, where I honed my skills in web technologies and computer graphics.`,
        `Most recently, I gained hands-on experience as a front-end intern at Wix.com, contributing to their events management application with TypeScript, React.js, and end-to-end testing.`
    ]
    return(
        <Section headline={SectionName.about} id={SectionName.about} style={{gap:4}}>
            <Stack gap={2} alignItems="center">
                    <List 
                        ref={ref}
                        sx={{maxWidth:"80ch"}} 
                        component={motion.div} 
                        variants={containerVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        {
                            paragraphs.map((paragraph, index) => (
                                <ListItem key={index} component={motion.div} variants={itemVariants}>
                                    <ListItemIcon>
                                        <TaskAltIcon/>
                                    </ListItemIcon>
                                    <Typography fontSize={18} fontWeight={500}   textAlign="justify"  variant="body1">
                                        {paragraph}
                                    </Typography>
                                </ListItem>
                            ))
                        }
                    </List>
            </Stack>
        </Section>
    )
}