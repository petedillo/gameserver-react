import { useState } from 'react'
import { Button } from './components/ui/button'
import ProjectCharter from './pages/ProjectCharter'
import RaciWbs from './pages/RaciWbs'
import GanttChart from './pages/GanttChart'
import IntegratedGanttWbs from './pages/IntegratedGanttWbs'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Render the selected page
  const renderPage = () => {
    switch (currentPage) {
      case 'project-charter':
        return <ProjectCharter />
      case 'raci-wbs':
        return <RaciWbs />
      case 'gantt-chart':
        return <GanttChart />
      case 'integrated':
        return <IntegratedGanttWbs />
      default:
        return (
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-4xl font-bold mb-6">Project Management Tools</h1>
            <p className="text-xl mb-10">Select a tool to get started with your project planning</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'project-charter', title: 'Project Charter', description: 'Define project scope, objectives, and deliverables' },
                { id: 'raci-wbs', title: 'RACI & WBS', description: 'Create responsibility matrix and work breakdown structure' },
                { id: 'gantt-chart', title: 'Gantt Chart', description: 'Visualize project timeline and progress' },
                { id: 'integrated', title: 'Integrated WBS & Gantt', description: 'Combine WBS hierarchy with visual timeline' }
              ].map(tool => (
                <div key={tool.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
                  <p className="mb-4">{tool.description}</p>
                  <Button onClick={() => setCurrentPage(tool.id)}>Open Tool</Button>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <button 
                className="font-bold text-xl"
                onClick={() => setCurrentPage('home')}
              >
                ProjectTools
              </button>
            </div>
            <nav className="hidden md:flex space-x-4">
              {[
                { id: 'project-charter', label: 'Project Charter' },
                { id: 'raci-wbs', label: 'RACI & WBS' },
                { id: 'gantt-chart', label: 'Gantt Chart' },
                { id: 'integrated', label: 'Integrated WBS' }
              ].map(link => (
                <Button
                  key={link.id}
                  variant={currentPage === link.id ? 'default' : 'ghost'}
                  onClick={() => setCurrentPage(link.id)}
                >
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
