"use client"

import React from 'react'
import { Color, dist, MetaBlob } from './MetaBlob'
import { Theme } from '@mui/material'

interface HeroBackgroundProps{
    width:number,
    height:number,
    theme:Theme
}

export default function HeroBackground(props:HeroBackgroundProps) {

    const {width, height, theme} = props
    const mode = theme.palette.mode
    React.useEffect(() => {
    const canvas:HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    let requestId:number;
    if(ctx){
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data; 
        const radi = [60, 40, 40, 25]
        const colors:Color[] = [
            {r: 12, g: 0, b: 20},
            {r: 0, g: 2, b: 8},
            {r: 0, g: 4, b: 8},
            {r: 6, g: 0, b: 12},
        ]
        const blobs = radi.map((radius,index) => {
            return new MetaBlob(
                {x:width/2, y:height/2}, 
                radius*0.4, 
                {x: Math.random(), y: Math.random()},
                Math.random() + 0.2*(Math.sqrt(width*height))/radius*2,
                colors[index]
            )
        })

        const animate = () => {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let sum:Color = {r:0, g:0, b:0}
                    const index = (x + y * width)*4;
                    for(const blob of blobs){
                        const sigma = 1000 * blob.radius;
                        const d = dist({x,y}, blob.pos)
                        const intensity = 10 * Math.exp(-d * d / sigma);
                        const tempColor = {
                            r: blob.color.r * intensity,
                            g: blob.color.g * intensity,
                            b: blob.color.b * intensity
                        }
                        sum.r += tempColor.r;
                        sum.g += tempColor.g;
                        sum.b += tempColor.b;
                    }

                    sum.r *= 1.3;
                    sum.g *= 1.6;
                    sum.b *= 1.7;

                    data[index] = sum.r;       // Red
                    data[index + 1] = sum.g;   // Green
                    data[index + 2] = sum.b; // Blue
                    data[index + 3] = 255; // Alpha (full opacity)
                }
            }
            for(const blob of blobs){
                blob.move({x:width, y:height})
            }

            ctx.putImageData(imageData, 0, 0);
            requestId = requestAnimationFrame(animate);
        }
        animate()
        return ()=>{cancelAnimationFrame(requestId)}
    }

    }, []);

    return (
        <div 
            style={{
                position:"absolute", 
                // top:0, 
                // left:0,
                top:-height*0.4,
                left:-width*0.2,
                filter: "blur(50px)",
                opacity: 0.6,
                mixBlendMode: mode === "light" ? "difference" : "normal",
                zIndex:-1,
            }}
            >
            <canvas
                id="canvas"
                width={width}
                height={height}
                style={{position:"absolute", top:0, left:0}}
            />
        </div>
    );
}
