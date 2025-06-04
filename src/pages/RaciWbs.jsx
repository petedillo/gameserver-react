import { useState } from 'react'
import { Button } from "/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Input } from "/src/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "/src/components/ui/table"
import { Plus, Minus, Download } from '/src/components/icons'

const RaciWbs = () => {
  // RACI Matrix state
  const [raciEntries, setRaciEntries] = useState([
    { task: '', responsible: '', accountable: '', consulted: '', informed: '' }
  ])
  const [roles, setRoles] = useState(['Team Member', 'Project Manager', 'Stakeholder'])

  // WBS state
  const [wbs, setWbs] = useState([
    { id: '1', name: 'Project', level: 0, children: [] }
  ])

  // Add new RACI row
  const addRaciRow = () => {
    setRaciEntries([...raciEntries, { task: '', responsible: '', accountable: '', consulted: '', informed: '' }])
  }

  // Remove RACI row
  const removeRaciRow = (index) => {
    if (raciEntries.length <= 1) return
    const newEntries = [...raciEntries]
    newEntries.splice(index, 1)
    setRaciEntries(newEntries)
  }

  // Update RACI cell
  const updateRaciCell = (index, field, value) => {
    const newEntries = [...raciEntries]
    newEntries[index][field] = value
    setRaciEntries(newEntries)
  }

  // Add WBS item
  const addWbsItem = (parentId, level) => {
    const newId = Date.now().toString()
    const newItem = { id: newId, name: '', level, children: [] }

    const updateWbs = (items) => {
      return items.map(item => {
        if (item.id === parentId) {
          return { ...item, children: [...item.children, newItem] }
        }
        if (item.children.length > 0) {
          return { ...item, children: updateWbs(item.children) }
        }
        return item
      })
    }

    setWbs(updateWbs(wbs))
  }

  // Remove WBS item
  const removeWbsItem = (id) => {
    const updateWbs = (items) => {
      return items.filter(item => {
        if (item.id === id) return false
        if (item.children.length > 0) {
          item.children = updateWbs(item.children)
        }
        return true
      })
    }

    setWbs(updateWbs(wbs))
  }

  // Update WBS item name
  const updateWbsItem = (id, newName) => {
    const updateWbs = (items) => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, name: newName }
        }
        if (item.children.length > 0) {
          return { ...item, children: updateWbs(item.children) }
        }
        return item
      })
    }

    setWbs(updateWbs(wbs))
  }

  // Render WBS items recursively
  const renderWbsItems = (items) => {
    return items.map(item => (
      <div key={item.id} style={{ marginLeft: `${item.level * 1}rem`, marginBottom: "0.5rem" }}>
        <div className="flex items-center gap-2">
          <Input
            value={item.name}
            onChange={(e) => updateWbsItem(item.id, e.target.value)}
            placeholder={`Level ${item.level} item`}
            className="w-64"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => addWbsItem(item.id, item.level + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {item.level > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWbsItem(item.id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
        {item.children.length > 0 && (
          <div className="mt-2">
            {renderWbsItems(item.children)}
          </div>
        )}
      </div>
    ))
  }

  // Download RACI as CSV
  const downloadRaciCsv = () => {
    const headers = ['Task', 'Responsible', 'Accountable', 'Consulted', 'Informed']
    const csvContent = [
      headers.join(','),
      ...raciEntries.map(e => [e.task, e.responsible, e.accountable, e.consulted, e.informed].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'raci-matrix.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  // Download WBS as text
  const downloadWbsText = () => {
    const formatWbs = (items, level = 0) => {
      return items.map(item => {
        const indent = '  '.repeat(level)
        const childrenText = item.children.length > 0 ? `\n${formatWbs(item.children, level + 1)}` : ''
        return `${indent}- ${item.name}${childrenText}`
      }).join('\n')
    }

    const content = `Work Breakdown Structure\n=======================\n\n${formatWbs(wbs)}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wbs-structure.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* RACI Matrix Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">RACI Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task/Activity</TableHead>
                  <TableHead>Responsible (R)</TableHead>
                  <TableHead>Accountable (A)</TableHead>
                  <TableHead>Consulted (C)</TableHead>
                  <TableHead>Informed (I)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {raciEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.task}
                        onChange={(e) => updateRaciCell(index, 'task', e.target.value)}
                        placeholder="Task description"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.responsible}
                        onChange={(e) => updateRaciCell(index, 'responsible', e.target.value)}
                        placeholder="R"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.accountable}
                        onChange={(e) => updateRaciCell(index, 'accountable', e.target.value)}
                        placeholder="A"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.consulted}
                        onChange={(e) => updateRaciCell(index, 'consulted', e.target.value)}
                        placeholder="C"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.informed}
                        onChange={(e) => updateRaciCell(index, 'informed', e.target.value)}
                        placeholder="I"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRaciRow(index)}
                        disabled={raciEntries.length <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-between">
            <Button onClick={addRaciRow}>
              <Plus className="mr-2 h-4 w-4" />
              Add Row
            </Button>
            <Button onClick={downloadRaciCsv}>
              <Download className="mr-2 h-4 w-4" />
              Export RACI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* WBS Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Work Breakdown Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Build your WBS hierarchy by adding child items to each level
            </p>
          </div>
          <div className="border-l-2 border-gray-200 pl-4">
            {renderWbsItems(wbs)}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={downloadWbsText}>
              <Download className="mr-2 h-4 w-4" />
              Export WBS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RaciWbs;
