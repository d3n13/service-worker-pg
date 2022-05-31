import { render } from "preact";
import { useCallback, useState } from "preact/hooks";

import { API_ROUTE_REGEX } from "./regex";
import swURL from "sw:./sw.js";

window.navigator.serviceWorker.register(swURL);

export function App() {
  const [route, setRoute] = useState("api");
  const [isInvalidRoute, setIsInvalidRoute] = useState(false);

  const onFetchClick = useCallback(() => {
    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestTime: Date.now(),
      }),
    });
  }, [route]);

  const onRouteChange = useCallback((e) => {
    const value = e.target.value;
    const valid = API_ROUTE_REGEX.test(value);
    setIsInvalidRoute(!valid);
    setRoute(value);
  }, []);

  return (
    <>
      <input
        value={route}
        onChange={onRouteChange}
        title="URL to perform POST request against"
        placeholder="URL"
      />

      {isInvalidRoute && (
        <p style={{ color: "red" }}>URL must match /api/ regex</p>
      )}

      <button onClick={onFetchClick} disabled={isInvalidRoute}>
        Fetch
      </button>
    </>
  );
}

render(<App />, document.body);
