import { useState } from 'react'
import { Button } from "/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Input } from "/src/components/ui/input"
import { Textarea } from "/src/components/ui/textarea"
import { Download } from '/src/components/icons'

export default function ProjectCharter() {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectObjectives, setProjectObjectives] = useState('')
  const [stakeholders, setStakeholders] = useState('')
  const [scope, setScope] = useState('')
  const [deliverables, setDeliverables] = useState('')

  const handleDownload = () => {
    const content = `
      Project Charter
      ===============

      Project Title: ${projectTitle}

      Objectives:
      ${projectObjectives}

      Stakeholders:
      ${stakeholders}

      Scope:
      ${scope}

      Deliverables:
      ${deliverables}
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'project-charter.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Project Charter & Scope</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Project Title</label>
          <Input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Project Objectives</label>
          <Textarea
            value={projectObjectives}
            onChange={(e) => setProjectObjectives(e.target.value)}
            placeholder="Describe the project objectives"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Stakeholders</label>
          <Textarea
            value={stakeholders}
            onChange={(e) => setStakeholders(e.target.value)}
            placeholder="List the project stakeholders"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Scope</label>
          <Textarea
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="Describe the project scope"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Deliverables</label>
          <Textarea
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder="List the project deliverables"
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Charter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
