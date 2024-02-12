/*
Side note
State vs Props
Both cause a re-render

State - input passed to a component
similar to functional args
immutable, read-only

Props - data managed by a component
similar to local variables
mutable, change over time

Key note - Using functional programming principles
React Tutorial for Beginners
https://www.youtube.com/watch?v=SqcY0GlETPk
Programming with Mosh

*/
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

const Alert = ( {children, onClose}: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">
      {children}
      <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert;