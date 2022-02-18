import React from "react";

export default function DevLog() {
  const [message, setMessage] = React.useState("");
  console.log("DevLog", message);

  React.useEffect(() => {
    const onMessage = (event: Event) => {
      setMessage((event as CustomEvent).detail.message);
    };
    window.addEventListener("tframe-message", onMessage);
    return () => {
      window.removeEventListener("tframe-message", onMessage);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        width: "200px",
        height: "100px",
        wordWrap: "break-word",
        backgroundColor: "rgba(30, 30, 30, 0.7)",
        color: "white",
        padding: "20px",
        boxSizing: "content-box",
        zIndex: 100,
      }}
    >
      {/* {Object.entries({
        gestureBack: touchs.current.gestureBack,
        path: window.history.state?.path ?? "/",
        stackSize: stack.size,
        location,
        currentPath: stack.current.path,
      })
        .map(([key, value]) => `${key}: ${value}`)
        .join(",")} */}
      {message}
    </div>
  );
}

export function useDevLog() {
  return {
    setLog: (message: string) => {
      const messageEvent = new CustomEvent("tframe-message", {
        detail: {
          message,
        },
      });
      window.dispatchEvent(messageEvent);
    },
  };
}
