import * as Slider from "@radix-ui/react-slider";
import {useState} from 'react'
import './DoubleSlider.css';

const DoubleSlider = ({minValue, maxValue, value, onChange}) => {
    return (
        <>
            <Slider.Root 
                className="sliderRoot" 
                min={minValue}
                max={maxValue}
                value={value}
                onValueChange={onChange}
                step={1} 
                minStepsBetweenThumbs={1}
            >
                <Slider.Track className="sliderTrack">
                    <Slider.Range className="sliderRange" />
                </Slider.Track>
                <Slider.Thumb className="sliderThumb"/>
                <Slider.Thumb className="sliderThumb"/>
            </Slider.Root>
        </>
    )
}

export default DoubleSlider