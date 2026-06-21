"use client";

import { MessageCircle, BookOpen, Mail } from "lucide-react";

export function HelpSection() {
  return (
    <div className="help-card flex flex-col gap-5 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="help-icon-container flex h-12 w-12 items-center justify-center rounded-xl">
          <MessageCircle className="help-icon h-6 w-6" />
        </div>
        <div>
          <h3 className="help-title text-base font-black">
            Need a hand?
          </h3>
          <p className="help-description text-sm font-medium">
            We're here to help you succeed
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="help-button flex items-center gap-3 rounded-xl px-5 py-3.5 text-left text-sm font-medium transition hover:opacity-80 active:scale-95">
          <BookOpen className="help-button-icon-purple h-4 w-4" />
          <span>Browse documentation</span>
        </button>
        <button className="help-button flex items-center gap-3 rounded-xl px-5 py-3.5 text-left text-sm font-medium transition hover:opacity-80 active:scale-95">
          <Mail className="help-button-icon-green h-4 w-4" />
          <span>Contact support</span>
        </button>
      </div>
    </div>
  );
}
