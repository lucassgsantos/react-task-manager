import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const dadosSalvos = localStorage.getItem('minhas-tarefas')
    return dadosSalvos ? JSON.parse(dadosSalvos) : []
  })
  const [texto, setTexto] = useState("")

  useEffect(() => {
    localStorage.setItem('minhas-tarefas', JSON.stringify(tarefas))
  }, [tarefas])

  function adicionarTarefa() {
    if (!texto.trim()) return
    const novaTarefa = {
      id: Date.now(),
      texto: texto,
      isCompleted: false
    }
    setTarefas([...tarefas, novaTarefa])
    setTexto("")
  }

  function toggleTarefa(id) {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, isCompleted: !tarefa.isCompleted } : tarefa
    ))
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }

  const tarefasConcluidas = tarefas.filter(t => t.isCompleted).length

  return (
    <div className="container">
      <h1>Minhas Metas 🚀</h1>

      <div className="input-group">
        <input 
          type="text" 
          placeholder="Adicionar nova tarefa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
        />
        <button className="btn-add" onClick={adicionarTarefa}>
          +
        </button>
      </div>

      <ul className="task-list">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.isCompleted ? "task-item completed" : "task-item"}>
            <div className="task-content" onClick={() => toggleTarefa(tarefa.id)}>
              <div className="check-circle"></div>
              <span>{tarefa.texto}</span>
            </div>
            <button className="btn-delete" onClick={() => removerTarefa(tarefa.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tarefas.length > 0 && (
        <div className="status-bar">
          <p>{tarefasConcluidas} de {tarefas.length} concluídas</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${(tarefasConcluidas / tarefas.length) * 100}%`}}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App