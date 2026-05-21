/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { bmcElements } from '../data/bmcData'
import { BmcBlockId, BmcElement } from '../types'
import { Icon } from './Icon'
import { BmcCasePractice } from './BmcCasePractice'

interface BmcCanvasProps {
  onBmcCaseCompleted?: (caseTitle: string, score: number) => void
}

export function BmcCanvas({ onBmcCaseCompleted }: BmcCanvasProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<BmcBlockId>('VP') // Default select Value Prop
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0) // 0 for Coffee Shop, 1 for SaaS
  const [activeMode, setActiveMode] = useState<'theory' | 'practice'>('theory')

  const activeElement = bmcElements.find((e) => e.id === selectedBlockId) || bmcElements[3]

  // Color mappings for modern UI accents
  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; hover: string; pulse: string }> = {
    emerald: {
      bg: 'bg-brand-palesage/65',
      border: 'border-brand-sageborder',
      text: 'text-brand-olive',
      badge: 'bg-brand-palesage text-brand-olive',
      hover: 'opacity-95 hover:bg-brand-palesage/85 hover:border-brand-sage',
      pulse: 'bg-brand-olive'
    },
    blue: {
      bg: 'bg-brand-sand/75 border-brand-border',
      border: 'border-brand-border',
      text: 'text-brand-charcoal',
      badge: 'bg-brand-darksand text-brand-charcoal',
      hover: 'hover:bg-brand-sand/90 hover:border-brand-stone',
      pulse: 'bg-brand-stone'
    },
    indigo: {
      bg: 'bg-[#FAF9F6]/85',
      border: 'border-brand-border',
      text: 'text-brand-charcoal',
      badge: 'bg-brand-sand text-brand-olive',
      hover: 'hover:bg-[#FAF9F6]/95 hover:border-brand-sage',
      pulse: 'bg-brand-sage'
    },
    amber: {
      bg: 'bg-[#FAF2E6]/85',
      border: 'border-[#E7D6BE]',
      text: 'text-[#85653C]',
      badge: 'bg-[#FAF2E6] text-[#85653C]',
      hover: 'hover:bg-[#FAF2E6]/95 hover:border-[#D0BA9C]',
      pulse: 'bg-[#D0BA9C]'
    },
    rose: {
      bg: 'bg-[#FAF0ED]/85 border-[#EAD3CE]',
      border: 'border-[#EAD3CE]',
      text: 'text-[#9A5B50]',
      badge: 'bg-[#FAF0ED] text-[#9A5B50]',
      hover: 'hover:bg-[#FAF0ED]/95 hover:border-[#DAB0A9]',
      pulse: 'bg-[#DAB0A9]'
    },
    sky: {
      bg: 'bg-[#EEF4F2]/85 border-brand-sageborder',
      border: 'border-brand-sageborder',
      text: 'text-brand-olive',
      badge: 'bg-brand-palesage text-[#5A6344]',
      hover: 'hover:bg-[#EEF4F2]/95 hover:border-brand-sage',
      pulse: 'bg-brand-sage'
    },
    violet: {
      bg: 'bg-[#FAF7F0]/85 border-brand-border',
      border: 'border-brand-border',
      text: 'text-brand-stone',
      badge: 'bg-brand-sand text-brand-stone',
      hover: 'hover:bg-[#FAF7F0]/95 hover:border-brand-stone',
      pulse: 'bg-brand-stone'
    },
    purple: {
      bg: 'bg-[#FAF6EC]/85 border-brand-border',
      border: 'border-brand-border',
      text: 'text-brand-charcoal',
      badge: 'bg-brand-sand text-brand-charcoal',
      hover: 'hover:bg-[#FAF6EC]/95 hover:border-brand-stone',
      pulse: 'bg-brand-stone'
    },
    teal: {
      bg: 'bg-brand-palesage/60 border-brand-sageborder',
      border: 'border-brand-sageborder',
      text: 'text-brand-olive',
      badge: 'bg-brand-palesage text-brand-olive',
      hover: 'hover:bg-brand-palesage/80 hover:border-brand-sage',
      pulse: 'bg-brand-sage'
    }
  }

  // Helper to render individual canvas blocks
  const renderCanvasBlock = (id: BmcBlockId, spanClass: string) => {
    const el = bmcElements.find((e) => e.id === id)!
    const isSelected = selectedBlockId === id
    const c = colorMap[el.color]

    return (
      <div
        id={`bmc-block-${id}`}
        key={id}
        onClick={() => setSelectedBlockId(id)}
        className={`${spanClass} ${c.bg} ${c.hover} ${
          isSelected 
            ? 'ring-3 ring-brand-olive ring-offset-2 border-transparent scale-[1.01] shadow-md z-10' 
            : 'border shadow-xs'
        } ${c.border} rounded-xl p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer group min-h-[140px] relative overflow-hidden`}
      >
        {/* Pulsing selection indicator */}
        {isSelected && (
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.pulse}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${c.pulse}`}></span>
          </span>
        )}

        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white shadow-xs' : 'bg-white/60'}`}>
              <Icon name={el.iconName} className={`${el.color === 'amber' ? 'text-[#85653C]' : c.text}`} size={18} />
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-stone uppercase leading-none tracking-wider">
              {id}
            </span>
          </div>

          {/* Title & Translation */}
          <div>
            <h4 className="font-display font-extrabold text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-olive transition-colors">
              {el.name}
            </h4>
            <p className="text-[10px] text-brand-stone/80 italic">
              {el.nameEn}
            </p>
          </div>
        </div>

        {/* Short abstract description preview */}
        <p className="text-[10.5px] text-brand-charcoal/80 line-clamp-2 mt-2 leading-relaxed">
          {el.definition}
        </p>

        {/* Click helper badge */}
        <div className="mt-3 flex justify-end">
          <span className="text-[9px] font-semibold text-brand-olive group-hover:underline flex items-center space-x-0.5">
            <span>Detail</span>
            <Icon name="ChevronRight" size={10} />
          </span>
        </div>
      </div>
    )
  }

  const selectedColor = colorMap[activeElement.color]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      id="canvas-view"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-brand-charcoal flex items-center gap-2">
              <Icon name="Layout" className="text-brand-sage" size={26} />
              <span>Interactive Business Model Canvas</span>
            </h2>
            <p className="text-brand-stone text-xs sm:text-sm">
              Pahami teori 9 blok BMC lalu pindah ke latihan studi kasus untuk mengisi kanvas kosong dan dinilai AI.
            </p>
          </div>

          <div className="flex bg-brand-darksand p-1 rounded-xl self-start text-xs font-bold leading-normal w-fit">
            <button
              onClick={() => setActiveMode('theory')}
              className={`px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                activeMode === 'theory'
                  ? 'bg-[#FAF9F6] text-brand-olive shadow-sm font-black'
                  : 'text-brand-stone hover:text-brand-charcoal'
              }`}
            >
              Konsep BMC
            </button>
            <button
              onClick={() => setActiveMode('practice')}
              className={`px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer ${
                activeMode === 'practice'
                  ? 'bg-[#FAF9F6] text-brand-olive shadow-sm font-black'
                  : 'text-brand-stone hover:text-brand-charcoal'
              }`}
            >
              Latihan Studi Kasus
            </button>
          </div>
        </div>

        <div className="bg-brand-sand border border-brand-border rounded-xl px-3 py-2 text-[11px] text-brand-charcoal flex items-center gap-1.5 max-w-sm shadow-xs">
          <Icon name={activeMode === 'theory' ? 'Info' : 'ClipboardList'} className="text-brand-sage shrink-0" size={16} />
          <span>
            {activeMode === 'theory' ? (
              <>
                This view uses the interactive <strong>standard international 5x2 BMC layout</strong>.
              </>
            ) : (
              <>
                Isi blok BMC dengan nama English yang asli, tetapi penjelasan dan jawaban boleh dalam Bahasa Indonesia.
              </>
            )}
          </span>
        </div>
      </div>

      {activeMode === 'practice' ? (
        <BmcCasePractice onCaseCompleted={onBmcCaseCompleted} />
      ) : (
        <div className="space-y-6">
        
        {/* Desktop grid, hidden on small, visible on md+ */}
        <div className="hidden md:grid md:grid-cols-10 md:grid-rows-3 gap-3">
          
          {/* Row 1 & 2 */}
          {renderCanvasBlock('KP', 'md:col-span-2 md:row-span-2')}
          
          <div className="md:col-span-2 md:row-span-2 grid grid-rows-2 gap-3">
            {renderCanvasBlock('KA', 'h-full')}
            {renderCanvasBlock('KR', 'h-full')}
          </div>

          {renderCanvasBlock('VP', 'md:col-span-2 md:row-span-2')}

          <div className="md:col-span-2 md:row-span-2 grid grid-rows-2 gap-3">
            {renderCanvasBlock('CR', 'h-full')}
            {renderCanvasBlock('CH', 'h-full')}
          </div>

          {renderCanvasBlock('CS', 'md:col-span-2 md:row-span-2')}

          {/* Row 3 (Cost Structure & Revenue Streams) */}
          {renderCanvasBlock('C$', 'md:col-span-5')}
          {renderCanvasBlock('R$', 'md:col-span-5')}

        </div>

        {/* Mobile grid, stacked view with compact sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {bmcElements.map((el) => {
            const isSelected = selectedBlockId === el.id
            const c = colorMap[el.color]
            return (
              <button
                key={el.id}
                onClick={() => setSelectedBlockId(el.id)}
                className={`text-left p-4 rounded-xl border transition-all ${c.bg} ${
                  isSelected 
                    ? 'ring-2 ring-brand-olive border-transparent bg-opacity-100' 
                    : 'border-brand-border/60'
                } flex justify-between items-start cursor-pointer`}
              >
                <div className="space-y-1.5 flex-1 pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold text-brand-stone">
                      [{el.id}]
                    </span>
                    <h4 className="font-display font-black text-xs text-brand-charcoal">
                      {el.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-brand-stone/80 line-clamp-1 italic">
                    {el.nameEn}
                  </p>
                </div>
                <div className="bg-[#FAF9F6] p-1.5 rounded-lg shadow-sm border border-brand-border/40">
                  <Icon name={el.iconName} className={`${el.color === 'amber' ? 'text-[#85653C]' : c.text}`} size={16} />
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamically Inspecting detailed panel */}
        <div className="bg-brand-sand rounded-3xl border border-brand-border shadow-md p-6 sm:p-8 space-y-6">
          
          {/* Header specification */}
          <div className={`p-4 rounded-2xl ${selectedColor.bg} border ${selectedColor.border} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#FAF9F6] p-2.5 rounded-xl shadow-sm border border-brand-border/30">
                <Icon name={activeElement.iconName} className={`${activeElement.color === 'amber' ? 'text-[#85653C]' : selectedColor.text}`} size={24} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold text-brand-stone">
                    KODE: {activeElement.id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
                  <span className="text-[10px] text-brand-stone font-bold uppercase tracking-wider">BMC Element</span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-brand-charcoal leading-snug">
                  {activeElement.name} <span className="text-brand-stone font-normal italic text-sm sm:text-base">({activeElement.nameEn})</span>
                </h3>
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-brand-olive bg-[#FAF9F6]/85 px-3 py-1 rounded-full border border-brand-sageborder self-start sm:self-auto uppercase tracking-wide">
              Teori Terstandarisasi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left spec: Definition and Key questions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Definition */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brand-stone uppercase tracking-widest flex items-center gap-1.5">
                  <Icon name="GraduationCap" size={14} className="text-brand-sage" />
                  <span>Definition</span>
                </h4>
                <p className="text-brand-charcoal text-sm leading-relaxed font-sans mt-1">
                  {activeElement.definition}
                </p>
              </div>

              {/* Key questions card */}
              <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-brand-border space-y-3">
                <h4 className="text-xs font-bold text-brand-stone uppercase tracking-widest flex items-center gap-1.5">
                  <Icon name="HelpCircle" size={14} className="text-brand-olive" />
                  <span>Guiding Questions</span>
                </h4>
                <p className="text-xs text-brand-stone leading-snug">
                  Use these prompts when designing or auditing this block for a new or existing business:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {activeElement.keyQuestions.map((q, i) => (
                    <div key={i} className="bg-brand-sand/60 p-3 rounded-xl border border-brand-border flex items-start space-x-2 shadow-2xs">
                      <span className="text-xs font-mono font-bold text-brand-olive bg-brand-palesage border border-brand-sageborder/50 h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-xs text-brand-charcoal font-medium leading-relaxed">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right spec: Dynamic business examples */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-brand-stone uppercase tracking-widest flex items-center gap-1.5">
                  <Icon name="Sparkles" size={14} className="text-brand-sage" />
                  <span>Sample Inputs</span>
                </h4>
                
                {/* Switcher tabs */}
                <div className="bg-brand-darksand p-0.5 rounded-lg flex text-[10px] font-bold">
                  {activeElement.examples.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedExampleIndex(idx)}
                      className={`px-2.5 py-1 rounded-md transition duration-150 cursor-pointer ${
                        selectedExampleIndex === idx 
                          ? 'bg-[#FAF9F6] text-brand-olive shadow-sm font-black' 
                          : 'text-brand-stone hover:text-brand-charcoal'
                      }`}
                    >
                      {idx === 0 ? 'Coffee Shop' : 'SaaS'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Example detail box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExampleIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-olive bg-brand-palesage px-2.5 py-1 rounded-lg border border-brand-sageborder/50">
                      {activeElement.examples[selectedExampleIndex].businessName}
                    </span>
                    <span className="text-[10px] text-brand-stone font-semibold uppercase tracking-wider">
                      {selectedExampleIndex === 0 ? 'Offline retail example' : 'Technology example'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-brand-stone uppercase tracking-wide leading-none">Typical entries for this block:</p>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {activeElement.examples[selectedExampleIndex].items.map((it, i) => (
                        <div key={i} className="flex items-start space-x-2 bg-brand-sand/50 p-2.5 rounded-xl border border-brand-border/60 shadow-2xs">
                          <Icon name="Check" className="text-brand-sage shrink-0 mt-0.5" size={14} />
                          <p className="text-xs text-brand-charcoal font-medium leading-relaxed">{it}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
      )}
    </motion.div>
  )
}
