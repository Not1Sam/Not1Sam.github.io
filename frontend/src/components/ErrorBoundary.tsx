import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = import.meta.env.DEV;

      return (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="text-fluo text-[3rem] mb-4">⚠</div>
          <h2 className="text-primary text-[1.5rem] font-semibold mb-2 brand-font">
            Something went wrong
          </h2>
          <p className="text-secondary text-[0.95rem] mb-6 max-w-[400px]">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {isDev && this.state.error && (
            <pre className="text-red-500 text-[0.8rem] text-left bg-[#1a1a1a] p-4 rounded mb-6 max-w-[600px] overflow-auto w-full">
              {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-bg font-semibold rounded hover:opacity-80 transition-opacity"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
