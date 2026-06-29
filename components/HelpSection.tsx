"use client";

import { MessageCircle, BookOpen, Mail } from "lucide-react";

export function HelpSection() {
  return (
    <div className="help-card flex flex-col gap-5 rounded-3xl p-6 surface-gradient border border-subtle relative overflow-hidden">
      <div className="ambient-glow-purple h-24 w-24 top-0 right-0 translate-x-1/3 -translate-y-1/3"></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="help-icon-container flex h-12 w-12 items-center justify-center rounded-xl">
          <MessageCircle className="help-icon h-6 w-6" />
        </div>
        <div>
          <h3 className="help-title text-base font-black">
            Resources
          </h3>
          <p className="help-description text-sm font-medium">
            Explore guides and documentation
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <a href="https://github.com/satgunsodhi/iqilo" target="_blank" rel="noopener noreferrer" className="interactive help-button flex items-center gap-3 rounded-2xl px-5 py-4 text-left text-sm font-bold shadow-sm">
          <BookOpen className="help-button-icon-purple h-4 w-4" />
          <span>Explore Source Code</span>
        </a>
        <div className="flex items-center gap-2 px-2 mt-1 text-sm font-medium">
          <Mail className="h-4 w-4 flex-shrink-0 text-foreground/60" />
          <span className="text-foreground/80">Email:</span>
          <a href="mailto:satgunsodhi@gmail.com" className="text-blue-500 hover:text-blue-400 hover:underline transition-colors select-text">
            satgunsodhi@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
