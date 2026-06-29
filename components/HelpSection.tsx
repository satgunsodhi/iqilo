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
            Need a hand?
          </h3>
          <p className="help-description text-sm font-medium">
            We&apos;re here to help you succeed
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <button className="interactive help-button flex items-center gap-3 rounded-2xl px-5 py-4 text-left text-sm font-bold shadow-sm">
          <BookOpen className="help-button-icon-purple h-4 w-4" />
          <span>Browse documentation</span>
        </button>
        <button className="interactive help-button flex items-center gap-3 rounded-2xl px-5 py-4 text-left text-sm font-bold shadow-sm">
          <Mail className="help-button-icon-green h-4 w-4" />
          <span>Contact support</span>
        </button>
      </div>
    </div>
  );
}
