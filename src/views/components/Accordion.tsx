'use client'

import { useState, useEffect } from 'react'

type AccordionProps = {
    id: string;
    title: string;
    text?: string;
    active?: boolean;
  }

export default function Accordion({
    id,
    title,
    text,
    active = false
}: AccordionProps) {

    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

    const [accordionVisible, setAccordionVisibility] = useState<boolean>(false);
  
    useEffect(() => {
      setAccordionOpen(active)
      setAccordionVisibility(typeof text !== 'undefined' && text !== null && text.length > 0)
    }, [])
  
    if(accordionVisible){
        return (
            <div className="mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div className="py-2">
                <h2>
                    <button 
                        className="flex items-center justify-between w-full text-left font-semibold py-2"
                        onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
                        aria-expanded={accordionOpen}
                        aria-controls={"accordion-text-" + id}
                    >
                        <span>{title}</span>
                        <svg className="fill-gray-500 shrink-0 ml-8" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`} />
                            <rect y="7" width="16" height="2" rx="1" className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && '!rotate-180'}`} />
                    </svg>
                    </button>
                </h2>
                <div 
                    id={"accordion-text-" + id} 
                    role="region"
                    aria-labelledby={"accordion-title-" + id}
                    className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <p className="pb-3">
                            {text}
                        </p>
                    </div>
                </div>
            </div>  
            </div>
        );
        };
}