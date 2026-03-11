import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import { Check, Copy } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useTheme } from '../../lib/theme'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('sh', bash)

// ─── Themes ──────────────────────────────────────────────────────────────────

const darkTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: '#cdd5e0',
    background: 'none',
    fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.75',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
  },
  'pre[class*="language-"]': {
    color: '#cdd5e0',
    background: 'none',
    margin: 0,
    padding: 0,
    overflow: 'auto',
  },
  comment: { color: '#4d5a6a', fontStyle: 'italic' },
  prolog: { color: '#4d5a6a' },
  keyword: { color: '#37beb7' },
  'control-flow': { color: '#37beb7' },
  builtin: { color: '#37beb7' },
  changed: { color: '#37beb7' },
  'keyword.module': { color: '#37beb7' },
  'class-name': { color: '#60a5fa' },
  function: { color: '#a78bfa' },
  'function-variable': { color: '#a78bfa' },
  string: { color: '#f9a96a' },
  'attr-value': { color: '#f9a96a' },
  'template-string': { color: '#f9a96a' },
  number: { color: '#fb923c' },
  boolean: { color: '#37beb7' },
  'attr-name': { color: '#a78bfa' },
  tag: { color: '#60a5fa' },
  operator: { color: '#8892a8' },
  punctuation: { color: '#6b7b8d' },
  'maybe-class-name': { color: '#60a5fa' },
  property: { color: '#cdd5e0' },
  parameter: { color: '#cdd5e0' },
  constant: { color: '#37beb7' },
  symbol: { color: '#37beb7' },
  deleted: { color: '#f87171' },
  inserted: { color: '#4ade80' },
  regex: { color: '#f9a96a' },
  important: { color: '#f9a96a', fontWeight: 'bold' },
  selector: { color: '#a78bfa' },
  variable: { color: '#cdd5e0' },
  namespace: { color: '#60a5fa' },
  imports: { color: '#cdd5e0' },
  exports: { color: '#cdd5e0' },
  spread: { color: '#8892a8' },
  'arrow': { color: '#37beb7' },
  italic: { fontStyle: 'italic' },
  bold: { fontWeight: 'bold' },
}

const lightTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: '#1f2937',
    background: 'none',
    fontFamily: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    fontSize: '0.8125rem',
    lineHeight: '1.75',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
  },
  'pre[class*="language-"]': {
    color: '#1f2937',
    background: 'none',
    margin: 0,
    padding: 0,
    overflow: 'auto',
  },
  comment: { color: '#9ca3af', fontStyle: 'italic' },
  prolog: { color: '#9ca3af' },
  keyword: { color: '#006b69' },
  'control-flow': { color: '#006b69' },
  builtin: { color: '#006b69' },
  'keyword.module': { color: '#006b69' },
  'class-name': { color: '#1d4ed8' },
  function: { color: '#7c3aed' },
  'function-variable': { color: '#7c3aed' },
  string: { color: '#c2410c' },
  'attr-value': { color: '#c2410c' },
  'template-string': { color: '#c2410c' },
  number: { color: '#ea580c' },
  boolean: { color: '#006b69' },
  'attr-name': { color: '#7c3aed' },
  tag: { color: '#1d4ed8' },
  operator: { color: '#4b5563' },
  punctuation: { color: '#6b7280' },
  'maybe-class-name': { color: '#1d4ed8' },
  property: { color: '#1f2937' },
  parameter: { color: '#1f2937' },
  constant: { color: '#006b69' },
  symbol: { color: '#006b69' },
  deleted: { color: '#b91c1c' },
  inserted: { color: '#15803d' },
  regex: { color: '#c2410c' },
  important: { color: '#c2410c', fontWeight: 'bold' },
  selector: { color: '#7c3aed' },
  variable: { color: '#1f2937' },
  namespace: { color: '#1d4ed8' },
  italic: { fontStyle: 'italic' },
  bold: { fontWeight: 'bold' },
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface CodeProps {
  children: string
  language?: string
  showCopy?: boolean
  className?: string
}

export function Code({ children, language = 'tsx', showCopy = true, className }: CodeProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className={cn('relative group rounded-lg border border-border bg-card overflow-hidden', className)}>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? darkTheme : lightTheme}
        customStyle={{
          margin: 0,
          padding: '1.25rem 1.5rem',
          background: 'transparent',
          fontSize: '0.8125rem',
          lineHeight: '1.75',
        }}
        codeTagProps={{ style: { fontFamily: 'inherit' } }}
      >
        {children}
      </SyntaxHighlighter>

      {showCopy && (
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy to clipboard'}
          className={cn(
            'absolute top-3 right-3 p-1.5 rounded-md transition-all duration-150',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            copied && 'text-primary opacity-100',
          )}
        >
          {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
        </button>
      )}
    </div>
  )
}
