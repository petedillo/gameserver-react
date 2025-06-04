import { useState, useEffect } from 'react'
import { Button } from "/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Input } from "/src/components/ui/input"
import { Calendar } from "/src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "/src/components/ui/popover"
import { CalendarIcon, Download, Plus, Minus } from '/src/components/icons'
import { format } from 'date-fns'

export default function IntegratedGanttWbs() {
  // Initialize with sample WBS structure
  const [wbs, setWbs] = useState([
    {
      id: '1',
      name: 'Project',
      level: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      progress: 0,
      children: []
    }
  ])

  // Add new WBS item
  const addWbsItem = (parentId, level) => {
    const newId = Date.now().toString()
    const newItem = { 
      id: newId, 
      name: '', 
      level,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 0,
      children: [] 
    }

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

  // Update WBS item property
  const updateWbsItem = (id, field, value) => {
    const updateWbs = (items) => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value }
        }
        if (item.children.length > 0) {
          return { ...item, children: updateWbs(item.children) }
        }
        return item
      })
    }

    setWbs(updateWbs(wbs))
  }

  // Flatten WBS for Gantt chart
  const flattenWbs = (items) => {
    return items.reduce((acc, item) => {
      return [...acc, item, ...flattenWbs(item.children)]
    }, [])
  }

  // Get Gantt chart data
  const ganttData = flattenWbs(wbs).filter(item => item.startDate && item.endDate)

  // Update parent dates when children change
  useEffect(() => {
    const updateParentDates = (items) => {
      return items.map(item => {
        if (item.children.length > 0) {
          const updatedChildren = updateParentDates(item.children)
          const childDates = updatedChildren
            .filter(child => child.startDate && child.endDate)
            .map(child => ({
              start: child.startDate.getTime(),
              end: child.endDate.getTime()
            }))

          if (childDates.length > 0) {
            const minStart = Math.min(...childDates.map(d => d.start))
            const maxEnd = Math.max(...childDates.map(d => d.end))

            return {
              ...item,
              startDate: new Date(minStart),
              endDate: new Date(maxEnd),
              children: updatedChildren
            }
          }
          return { ...item, children: updatedChildren }
        }
        return item
      })
    }

    setWbs(prevWbs => updateParentDates(prevWbs))
  }, [wbs])

  // Render WBS items recursively
  const renderWbsItems = (items) => {
    return items.map(item => (
      <div key={item.id} style={{ marginLeft: `${item.level}rem` }}>
        <div className="flex items-start gap-2 mb-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              value={item.name}
              onChange={(e) => updateWbsItem(item.id, 'name', e.target.value)}
              placeholder={`Level ${item.level} item`}
              className="w-full"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.startDate ? format(item.startDate, 'MMM dd') : 'Start'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={item.startDate}
                  onSelect={(date) => date && updateWbsItem(item.id, 'startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.endDate ? format(item.endDate, 'MMM dd') : 'End'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={item.endDate}
                  onSelect={(date) => date && updateWbsItem(item.id, 'endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={item.progress || 0}
                onChange={(e) => updateWbsItem(item.id, 'progress', parseInt(e.target.value))}
                className="w-20"
              />
              <span>%</span>
            </div>
          </div>

          <div className="flex gap-1">
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
        </div>

        {item.children.length > 0 && (
          <div className="ml-4 border-l-2 border-gray-200 pl-4">
            {renderWbsItems(item.children)}
          </div>
        )}
      </div>
    ))
  }

  // Generate gantt chart visualization
  const renderGanttChart = () => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000

    // Find earliest and latest dates
    if (ganttData.length === 0) return <div>No tasks with dates available</div>

    const allDates = ganttData.flatMap(task => [task.startDate, task.endDate])
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))

    // Add padding
    const startDate = new Date(minDate.getTime() - (3 * oneDay))
    const endDate = new Date(maxDate.getTime() + (3 * oneDay))

    // Calculate total days to show
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / oneDay)

    // Generate array of dates for header
    const dateArray = Array.from({ length: totalDays }, (_, i) => {
      return new Date(startDate.getTime() + (i * oneDay))
    })

    return (
      <div className="border rounded overflow-x-auto">
        <div style={{ minWidth: `${dateArray.length * 40}px` }}>
          {/* Date Headers */}
          <div className="flex border-b">
            <div className="w-40 shrink-0 border-r p-2 font-bold">Task</div>
            {dateArray.map((date, i) => (
              <div key={i} className="w-10 shrink-0 text-center text-xs border-r">
                <div className={`${isToday(date) ? 'bg-blue-100' : ''}`}>
                  {format(date, 'd')}
                </div>
                <div className="text-xs">
                  {format(date, 'E')}
                </div>
              </div>
            ))}
          </div>

          {/* Tasks with Gantt bars */}
          {ganttData.map(task => {
            const taskStart = task.startDate.getTime()
            const taskEnd = task.endDate.getTime()
            const startPosition = Math.max(0, Math.floor((taskStart - startDate.getTime()) / oneDay))
            const duration = Math.max(1, Math.ceil((taskEnd - taskStart) / oneDay))
            const indentation = task.level * 8

            return (
              <div key={task.id} className="flex hover:bg-gray-50 border-b">
                <div 
                  className="w-40 shrink-0 border-r p-2 truncate"
                  style={{ paddingLeft: `${indentation + 8}px` }}
                >
                  {task.name}
                </div>
                <div className="flex-grow relative h-10">
                  <div
                    className="absolute h-6 top-2 rounded-sm bg-blue-500 flex items-center justify-center text-xs text-white"
                    style={{
                      left: `${startPosition * 40}px`,
                      width: `${duration * 40}px`,
                    }}
                  >
                    {task.progress}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Download chart as text
  const downloadGanttChart = () => {
    const formatWbs = (items, level = 0) => {
      return items.map(item => {
        const indent = '  '.repeat(level)
        const dates = item.startDate && item.endDate ? 
          `\n${indent}  Start: ${format(item.startDate, 'PPP')}\n${indent}  End: ${format(item.endDate, 'PPP')}\n${indent}  Progress: ${item.progress}%` : ''

        const childrenText = item.children.length > 0 ? 
          `\n${formatWbs(item.children, level + 1)}` : ''

        return `${indent}${item.name}${dates}${childrenText}`
      }).join('\n\n')
    }

    const content = `Integrated WBS & Gantt Chart\n==========================\n\n${formatWbs(wbs)}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'integrated-wbs-gantt.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* WBS Structure Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Work Breakdown Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Build your hierarchical WBS with tasks, dates, and progress tracking
            </p>
          </div>
          {renderWbsItems(wbs)}
        </CardContent>
      </Card>

      {/* Gantt Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gantt Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] overflow-y-auto">
            {renderGanttChart()}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={downloadGanttChart}>
              <Download className="mr-2 h-4 w-4" />
              Export Chart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function isToday(date) {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}
