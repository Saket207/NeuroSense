import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("RootErrorBoundary caught an error:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#031e26] text-white p-6 flex flex-col items-center justify-center font-sans">
          <div className="w-full max-w-xl bg-rose-950/80 border border-rose-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400 font-bold text-lg">
              <span className="text-2xl">⚠️</span>
              <span>NeuroSense Runtime Error</span>
            </div>
            <p className="text-sm text-rose-200">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            {this.state.error?.stack && (
              <pre className="text-xs bg-black/60 p-3 rounded-xl overflow-x-auto text-rose-300 font-mono max-h-48">
                {this.state.error.stack}
              </pre>
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  try {
                    localStorage.clear()
                    sessionStorage.clear()
                  } catch {}
                  window.location.hash = "home"
                  window.location.reload()
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Cache & Reload
              </button>
              <button
                onClick={() => {
                  window.location.hash = "home"
                  window.location.reload()
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
)
