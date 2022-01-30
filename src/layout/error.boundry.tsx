import React, { ErrorInfo } from "react";

import PuzzleIcon from "../assert/puzzle.svg";

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-wrapper">
          <div className="error-wrapper__img">
            <img src={PuzzleIcon} alt="puzzle lock icon" />
          </div>
          <div className="error-wrapper__title">OH Nooo...</div>
          <div className="error-wrapper__text">
            Sorry, Something went wrong there. Try again
          </div>
          <div className="error-wrapper__cta">
            <a href="/">Go Home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}