import * as React from 'react'
import { Code, FileUpload, PageHeader } from '@aplo/ui'
import { DocPage, DocSection } from '@/components/doc-page'
import { PropsTable } from '@/components/props-table'

const TOC = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'default', label: 'Default' },
  { id: 'custom-copy', label: 'Custom Label' },
  { id: 'error', label: 'With Error' },
  { id: 'full-width', label: 'Full Width' },
  { id: 'api', label: 'API Reference' },
]

export default function UploadDocs() {
  return (
    <DocPage toc={TOC}>

      <PageHeader
        title="File Upload"
        description="A drag-and-drop zone with a marching ant dashed border. Supports click-to-browse, drag-over, and paste-from-clipboard."
      />

      <DocSection id="installation" title="Installation">
        <Code language="ts">{`import { FileUpload } from '@aplo/ui'`}</Code>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <Code>{`// Minimal — uses default accept (JPEG/PNG/WebP) and 10 MB cap
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
<FileUpload error="That file is too large." />`}</Code>
      </DocSection>

      <DocSection id="default" title="Default">
        <div className="max-w-lg">
          <FileUpload />
        </div>
      </DocSection>

      <DocSection id="custom-copy" title="Custom Label &amp; Hint">
        <div className="max-w-lg">
          <FileUpload
            label="Upload your document"
            hint="PDF or DOCX · Max 25 MB"
            accept={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
            maxSizeMb={25}
          />
        </div>
      </DocSection>

      <DocSection id="error" title="With Error">
        <div className="max-w-lg">
          <FileUpload error="Please upload a JPG or PNG image." />
        </div>
      </DocSection>

      <DocSection id="full-width" title="Full Width">
        <FileUpload />
      </DocSection>

      <DocSection id="api" title="API Reference">
        <PropsTable props={[
          { name: 'onFileSelect', type: '(file: File) => void', default: '—' },
          { name: 'accept', type: 'string[]', default: "['image/jpeg', 'image/png', 'image/webp']" },
          { name: 'maxSizeMb', type: 'number', default: '10' },
          { name: 'label', type: 'string', default: "'Click to upload or drag and drop'" },
          { name: 'hint', type: 'string', default: "'PNG, JPG, WebP up to 10 MB'" },
          { name: 'error', type: 'string', default: '—' },
        ]} />
      </DocSection>

    </DocPage>
  )
}
