import { useState } from 'react'
import { Button } from "/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Input } from "/src/components/ui/input"
import { Calendar } from "/src/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "/src/components/ui/popover"
import { CalendarIcon, Download } from '/src/components/icons'
import { format } from 'date-fns'

export default function GanttChart() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      name: 'Project Initiation',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 30,
      dependencies: []
    }
  ])
  const [selectedTask, setSelectedTask] = useState(null)

  // Add new task
  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      name: `Task ${tasks.length + 1}`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: 0,
      dependencies: []
    }
    setTasks([...tasks, newTask])
  }

  // Update task dates
  const updateTaskDates = (taskId, field, date) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, [field]: date } : task
    ))
  }

  // Update task progress
  const updateTaskProgress = (taskId, progress) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress: Math.min(100, Math.max(0, progress)) } : task
    ))
  }

  // Update task name
  const updateTaskName = (taskId, name) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, name } : task
    ))
  }

  // Generate gantt chart visualization
  const renderGanttChart = () => {
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000
    // Find earliest and latest dates in tasks
    const allDates = tasks.flatMap(task => [task.startDate, task.endDate])
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))

    // Add 3 days padding
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
          {tasks.map(task => {
            const taskStart = task.startDate.getTime()
            const taskEnd = task.endDate.getTime()
            const startPosition = Math.max(0, Math.floor((taskStart - startDate.getTime()) / oneDay))
            const duration = Math.max(1, Math.ceil((taskEnd - taskStart) / oneDay))

            return (
              <div key={task.id} className="flex hover:bg-gray-50 border-b">
                <div className="w-40 shrink-0 border-r p-2 truncate">{task.name}</div>
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

  // Download Gantt chart as text
  const downloadGanttChart = () => {
    const content = `Gantt Chart\n===========\n\n${tasks.map(task => {
      return `Task: ${task.name}\nStart: ${format(task.startDate, 'PPP')}\nEnd: ${format(task.endDate, 'PPP')}\nProgress: ${task.progress}%\n\n`
    }).join('')}`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'gantt-chart.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Task Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Task Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button onClick={addTask}>
                Add New Task
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Task</th>
                    <th className="p-2 text-left">Start Date</th>
                    <th className="p-2 text-left">End Date</th>
                    <th className="p-2 text-left">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <Input
                          value={task.name}
                          onChange={(e) => updateTaskName(task.id, e.target.value)}
                        />
                      </td>
                      <td className="p-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(task.startDate, 'PPP')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={task.startDate}
                              onSelect={(date) => date && updateTaskDates(task.id, 'startDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="p-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(task.endDate, 'PPP')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={task.endDate}
                              onSelect={(date) => date && updateTaskDates(task.id, 'endDate', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={task.progress}
                            onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span>%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gantt Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gantt Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] overflow-x-auto">
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
