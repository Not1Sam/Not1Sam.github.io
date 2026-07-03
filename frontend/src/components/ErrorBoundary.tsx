import { Component, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) { console.error("ErrorBoundary caught:", error, errorInfo); }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      const isDev = import.meta.env.DEV;
      return (
        <div className="flex flex-col items-center justify-center py-16 md:py-20 px-6 text-center">
          <div className="font-mono text-fluo text-[2rem] mb-4 animate-text-glow">⚠ SYSTEM ERROR</div>
          <h2 className="text-primary text-[1.2rem] md:text-[1.4rem] font-semibold mb-2 brand-font">CRITICAL FAILURE</h2>
          <p className="text-secondary text-[0.85rem] md:text-[0.9rem] mb-6 max-w-[400px]">
            An unexpected error occurred. Attempting system recovery...
          </p>
          {isDev && this.state.error && (
            <pre className="text-red-400 text-[0.75rem] text-left bg-surface border border-border p-4 mb-6 max-w-[600px] overflow-auto w-full font-mono rounded">
              {this.state.error.message}{"\n"}{this.state.error.stack}
            </pre>
          )}
          <button onClick={() => window.location.reload()} className="btn-primary">
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
