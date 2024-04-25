import { useState } from "react";

export default function useDataClient() {
  const [dataClient, setDataClient] = useState(null);

  return {
    dataClient,
    setDataClient,
  };
}
