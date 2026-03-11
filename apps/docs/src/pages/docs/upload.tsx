import * as React from 'react'
import { Container, FileUpload, PageHeader } from '@aplo/ui'

export default function UploadDocs() {
  return (
    <Container className="py-16 space-y-16">

      <PageHeader
        id="upload"
        title="File Upload"
        description={<>A drag-and-drop zone with a marching ant dashed border. Supports click-to-browse, drag-over, and paste-from-clipboard. Built with an SVG border that animates on interaction using <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">stroke-dashoffset</code>.</>}
      />

      <hr className="border-border" />

      <section id="default" className="space-y-6">
        <SectionLabel>Default</SectionLabel>
        <div className="max-w-lg">
          <FileUpload />
        </div>
      </section>

      <section id="custom-copy" className="space-y-6">
        <SectionLabel>Custom label &amp; hint</SectionLabel>
        <div className="max-w-lg">
          <FileUpload
            label="Upload your document"
            hint="PDF or DOCX · Max 25 MB"
            accept={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
            maxSizeMb={25}
          />
        </div>
      </section>

      <section id="error" className="space-y-6">
        <SectionLabel>With error</SectionLabel>
        <div className="max-w-lg">
          <FileUpload error="Please upload a JPG or PNG image." />
        </div>
      </section>

      <section id="full-width" className="space-y-6">
        <SectionLabel>Full width</SectionLabel>
        <FileUpload />
      </section>

      <hr className="border-border" />

      <section id="usage" className="space-y-4">
        <SectionLabel>Usage</SectionLabel>
        <pre className="rounded-lg bg-card border border-border px-6 py-5 text-sm text-muted-foreground overflow-x-auto leading-relaxed">
          {`import { FileUpload } from '@aplo/ui'

// Minimal — uses default accept (JPEG/PNG/WebP) and 10 MB cap
<FileUpload onFileSelect={(file) => console.log(file)} />

// Custom file types and size limit
<FileUpload
  accept={['application/pdf']}
  maxSizeMb={25}
  label="Upload your document"
  hint="PDF only · Max 25 MB"
  onFileSelect={(file) => handleFile(file)}
/>

// Show a validation error externally
<FileUpload error="That file is too large." />`}
        </pre>
      </section>

    </Container>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </h2>
  )
}
