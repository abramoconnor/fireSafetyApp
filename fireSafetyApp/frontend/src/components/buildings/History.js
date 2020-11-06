import { useHistory } from "react-router-dom";

// use destructuring to access the history property of the ReactComponentProps type
function MyComponent( { history }: ReactComponentProps) {

    // use useEffect to access lifecycle methods, as componentDidMount etc. are not available on function components.
    useEffect(() => {

        return () => {
            if (history.action === "POP") {
                // Code here will run when back button fires. Note that it's after the `return` for useEffect's callback; code before the return will fire after the page mounts, code after when it is about to unmount.
                }
           }
    })
}